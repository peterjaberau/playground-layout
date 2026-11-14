import {
    createModel,
    type JsonSchema,
    type LayoutJson,
    LayoutValidationError,
    MAIN_LAYOUT,
    type Model,
    type Node,
    type TabInitOf,
    type ValidationIssue,
} from "../components";
import { FILES, fileName } from "./files";

// The workbench's state outside the layout: file contents ("disk" and unsaved buffers), the
// layout JSON with its save/restore, and how a file becomes a tab.

/** What an editor tab keeps in its `data`: the file, and whether it has unsaved changes. */
export interface EditorData {
    path: string;
    dirty?: boolean;
}

export type Types = {
    tabs: {
        editor: EditorData;
        explorer: undefined;
        terminal: undefined;
        problems: undefined;
    };
};

/** The saved files and the unsaved edits, per mount of the example. */
export function createWorkspace() {
    const disk = new Map(Object.entries(FILES));
    const buffers = new Map<string, string>();
    return {
        read: (path: string) => buffers.get(path) ?? disk.get(path) ?? "",
        write: (path: string, text: string) => {
            if (text === disk.get(path)) buffers.delete(path);
            else buffers.set(path, text);
        },
        isDirty: (path: string) => buffers.has(path),
        save: (path: string) => {
            const text = buffers.get(path);
            if (text !== undefined) disk.set(path, text);
            buffers.delete(path);
        },
        discard: (path: string) => buffers.delete(path),
    };
}

export type Workspace = ReturnType<typeof createWorkspace>;

/** The tab id is derived from the path, so "is this file open?" is one `model.get`. */
export function tabId(path: string): string {
    return `file:${path}`;
}

/** An editor tab's data, narrowed by its component (any other node has none). */
export function editorData(
    node: Node<Types> | undefined,
): EditorData | undefined {
    return node?.type === "tab" && node.component === "editor"
        ? node.data
        : undefined;
}

/** The paths of the editors with unsaved changes. */
export function dirtyPaths(model: Model<Types>): ReadonlySet<string> {
    const paths = new Set<string>();
    for (const tab of model.get("all-tabs")) {
        const data = editorData(tab);
        if (data?.dirty) paths.add(data.path);
    }
    return paths;
}

/** The path of the editor the user is looking at. */
export function activePath(model: Model<Types>): string | undefined {
    return editorData(model.get("selected-tab-by", { layoutId: MAIN_LAYOUT }))
        ?.path;
}

export function editorTab(path: string, dirty = false): TabInitOf<Types> {
    return {
        id: tabId(path),
        component: "editor",
        label: fileName(path),
        data: { path, dirty },
    };
}

// Every tab has an explicit id: resetting the layout (`layout.load`) keeps the content of the tabs
// whose ids survive, such as the terminal's history.
export const defaultLayout: LayoutJson<Types> = {
    version: 1,
    defaults: { border: { size: 220 } },
    borders: [
        {
            location: "start",
            selected: 0,
            children: [
                {
                    id: "explorer",
                    component: "explorer",
                    label: "Explorer",
                    closable: true,
                    draggable: true,
                },
            ],
        },
        {
            location: "bottom",
            selected: 0,
            size: 180,
            children: [
                {
                    id: "terminal",
                    component: "terminal",
                    label: "Terminal",
                    closable: true,
                    draggable: true,
                },
                {
                    id: "problems",
                    component: "problems",
                    label: "Problems",
                    closable: true,
                    draggable: true,
                },
            ],
        },
    ],
    root: {
        type: "row",
        children: [
            {
                type: "tabset",
                id: "editors",
                deleteWhenEmpty: false,
                children: [
                    editorTab("src/app.ts"),
                    editorTab("src/store.ts"),
                    editorTab("README.md"),
                ],
            },
        ],
    },
};

/**
 * Opens a file: selects its tab when it is already open (selecting the selected tab changes
 * nothing, even in a border), adds one to the active tabset otherwise (else the first one).
 */
export function openFile(model: Model<Types>, path: string) {
    const id = tabId(path);
    if (model.get("node-by", { id })) {
        model.run("tab.select", { tabId: id });
        return;
    }
    const target = model.get("default-tabset");
    if (target) {
        model.run("tab.add", {
            ...editorTab(path),
            to: target.id,
            select: true,
        });
    }
}

// ── Save and restore ────────────────────────────────────────────────────────

// v3: the layout is JSON v1 (`model.get("layout-json")`); a v2 layout was FlexLayout's format
const STORAGE_KEY = "dockable-docs:ide-workbench:layout:v4";

/**
 * The editor's data schema: loading (and `tab.add`, `tab.set-data`, `tab.set-component`) validates `data` with it, so
 * a stored layout whose editor lost its `path` is reported instead of crashing the editor. The
 * other components have no data, so no schema.
 */
const dataSchemas: { editor: JsonSchema } = {
    editor: {
        type: "object",
        properties: {
            path: { type: "string", minLength: 1 },
            dirty: { type: "boolean" },
        },
        required: ["path"],
    },
};

/** Why the stored layout was not restored: a message and, per problem, its JSON path. */
export interface RestoreProblem {
    message: string;
    issues: readonly ValidationIssue[];
}

/**
 * The model, from the layout saved on the last visit or the default one. A stored layout that is
 * not valid JSON v1 is reported (and the default layout used): `createModel` throws a
 * `LayoutValidationError` listing every problem with its path. Storage may be unavailable.
 */
export function restoreModel(): {
    model: Model<Types>;
    problem: RestoreProblem | undefined;
} {
    let saved: string | null = null;
    try {
        saved = localStorage.getItem(STORAGE_KEY);
    } catch {
        // private mode or blocked storage: nothing was saved
    }
    if (saved) {
        try {
            // unsaved edits are not persisted, so a restored tab is never dirty
            const json = JSON.parse(saved, (key, value) =>
                key === "dirty" ? false : value,
            );
            return {
                model: createModel<Types>(json, { dataSchemas }),
                problem: undefined,
            };
        } catch (error) {
            const problem: RestoreProblem =
                error instanceof LayoutValidationError
                    ? { message: error.message, issues: error.issues }
                    : {
                          message:
                              error instanceof Error
                                  ? error.message
                                  : String(error),
                          issues: [],
                      };
            return {
                model: createModel<Types>(defaultLayout, { dataSchemas }),
                problem,
            };
        }
    }
    return {
        model: createModel<Types>(defaultLayout, { dataSchemas }),
        problem: undefined,
    };
}

export function saveLayout(model: Model<Types>) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(model.get("layout-json")),
        );
    } catch {
        // storage full or blocked: the layout just is not remembered
    }
}

export function forgetLayout() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // nothing to forget
    }
}
