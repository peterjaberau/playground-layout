// The demo project: a few files, their folders, and the problems a linter found in them.
// Plain data: nothing here knows about Dockable.

export const FILES: Record<string, string> = {
    "src/main.ts": `// The entry point. (The demo files have no import lines: the examples
// browser reads this file's own imports to list its sources.)

const settings = loadSettings();
const app = createApp(settings);

app.mount(document.getElementById("root"));
`,
    "src/app.ts": `export function createApp(settings: Settings) {
    const store = createStore({ count: 0, theme: settings.theme });

    return {
        mount(element: HTMLElement | null) {
            if (!element) throw new Error("no root element");
            element.textContent = \`count: \${store.get().count}\`;
        },
        store,
    };
}
`,
    "src/store.ts": `type Listener = () => void;

export function createStore<T>(initial: T) {
    let state = initial;
    const listeners = new Set<Listener>();

    return {
        get: () => state,
        set(next: Partial<T>) {
            state = { ...state, ...next };
            for (const listener of listeners) listener();
        },
        subscribe(listener: Listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
}
`,
    "src/settings.ts": `export interface Settings {
    theme: "light" | "dark";
    autosave: boolean;
}

export function loadSettings(): Settings {
    const raw = localStorage.getItem("settings");
    return raw ? JSON.parse(raw) : { theme: "light", autosave: false };
}
`,
    "src/styles.css": `:root {
    font-family: system-ui, sans-serif;
}

#root {
    display: grid;
    place-items: center;
    min-height: 100vh;
}
`,
    "package.json": `{
  "name": "counter-app",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest"
  }
}
`,
    "README.md": `# counter-app

A tiny counter, to try the workbench.

- Click a file in the explorer to open it.
- Edit it: the tab shows a dot until you save (Ctrl+S).
- Close a modified tab: you are asked what to do with the changes.
`,
};

export const FILE_PATHS = Object.keys(FILES).sort((a, b) => {
    // folders first, then files, alphabetically
    const depth = b.split("/").length - a.split("/").length;
    return depth !== 0 ? depth : a.localeCompare(b);
});

export function fileName(path: string): string {
    return path.split("/").pop() ?? path;
}

export function folderOf(path: string): string {
    return path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
}

export interface Problem {
    path: string;
    line: number;
    severity: "error" | "warning";
    message: string;
}

export const PROBLEMS: Problem[] = [
    {
        path: "src/main.ts",
        line: 7,
        severity: "warning",
        message:
            "Argument may be null: getElementById returns HTMLElement | null.",
    },
    {
        path: "src/settings.ts",
        line: 8,
        severity: "error",
        message: "Unsafe return of an `any` typed value.",
    },
    {
        path: "src/app.ts",
        line: 2,
        severity: "warning",
        message: "'settings.theme' is stored but never read.",
    },
];
