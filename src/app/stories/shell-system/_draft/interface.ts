import {
  LuCirclePlus as IconPlusCircle,
  LuStickyNote as IconNote,
  LuCode as IconCode,
  LuFolderTree as IconTreeView,
  LuSquareFunction as IconFunction,
  LuSearch as IconSearch,
  LuSettings as IconSettings,
  LuSquareDashedBottomCode as IconCodeBlock,
  LuHistory as IconHistory,
  LuSparkles as IconAi,
  LuBug as IconDebug,
  LuCircleHelp as IconHelp,
  LuBookOpen as IconBook,
} from "react-icons/lu"
import { PiBoundingBoxLight as IconBoundingBox } from "react-icons/pi"
import { AiOutlineApi as IconApi } from "react-icons/ai"


const dockedLayoutPropsJson = {
  dockedLayoutProps: {
    panels: {
      type: "PanelConfig[]",
      required: true,
      description: "Array of panel configuration objects.",
    },
    children: {
      type: "React.ReactNode",
      description: "The main center content area.",
    },
    layoutState: {
      type: "DockedLayoutState",
      description: "Controlled layout state. Use onChange to keep in sync.",
    },
    onChange: {
      type: "(state: DockedLayoutState) => void",
      description: "Fired on every layout change for persistence.",
    },
    tabMode: {
      type: "'icon' | 'icon-label'",
      default: "'icon'",
      description: "Activity bar display mode.",
    },
    className: {
      type: "string",
      description: "Additional CSS class names.",
    },
    style: {
      type: "React.CSSProperties",
      description: "Inline styles for the outer container.",
    },
  },
  panelConfigProps: {
    id: {
      type: "string",
      required: true,
      description: "Unique panel identifier.",
    },
    title: {
      type: "string",
      required: true,
      description: "Panel display title and activity bar tooltip.",
    },
    icon: {
      type: "SVGIcon",
      required: true,
      description: "Icon rendered in the activity bar. Must be from icons.ts.",
    },
    children: {
      type: "React.ReactNode",
      description: "Panel body content.",
    },
    defaultPosition: {
      type: "'left' | 'right' | 'bottom' | 'float'",
      default: "'left'",
      description: "Initial dock position.",
    },
    defaultState: {
      type: "'pinned' | 'auto-hide'",
      default: "'pinned'",
      description: "Initial pin state.",
    },
    defaultSize: {
      type: "number",
      default: "260",
      description: "Initial size in pixels.",
    },
    minSize: {
      type: "number",
      default: "100",
      description: "Minimum size in pixels during resize.",
    },
    defaultVisible: {
      type: "boolean",
      default: "true",
      description: "Whether visible in activity bar on initial render.",
    },
    defaultFloatPos: {
      type: "FloatPos",
      description: "Initial position/size for floating: { x, y, width, height }.",
    },
    userCanMove: {
      type: "boolean",
      default: "true",
      description: "Whether end user can re-dock the panel.",
    },
    userCanResize: {
      type: "boolean",
      default: "true",
      description: "Whether end user can resize the panel.",
    },
    userCanClose: {
      type: "boolean",
      default: "true",
      description: "Whether end user can close the panel.",
    },
    userCanTogglePin: {
      type: "boolean",
      default: "true",
      description: "Whether end user can toggle pin/auto-hide.",
    },
  },
}

const dockedLayoutPropsMock = {
  panels: [
    {
      id: "default",
      title: "Default",
      icon: "DefaultIcon",
      defaultPosition: "left",
      defaultState: "pinned",
      defaultSize: 260,
      minSize: 100,
      defaultVisible: true,
      defaultFloatPos: {
        x: 0,
        y: 0,
        width: 260,
        height: 200,
      },
      userCanMove: true,
      userCanResize: true,
      userCanClose: true,
      userCanTogglePin: true,
      children: [],
    },
    {
      id: "explorer",
      title: "Explorer",
      icon: "FolderIcon",
      defaultPosition: "left",
      defaultState: "pinned",
      defaultSize: 220,
      children: [],
    },
    {
      id: "search",
      title: "Search",
      icon: "SearchIcon",
      defaultPosition: "left",
      defaultState: "pinned",
      defaultSize: 220,
      children: [],
    },
    {
      id: "properties",
      title: "Properties",
      icon: "SettingsIcon",
      defaultPosition: "right",
      defaultState: "pinned",
      defaultSize: 240,
      children: [],
    },
    {
      id: "filters",
      title: "Filters",
      icon: "FilterIcon",
      defaultPosition: "right",
      defaultState: "auto-hide",
      defaultSize: 240,
      children: [],
    },
    {
      id: "output",
      title: "Output",
      icon: "BarChartIcon",
      defaultPosition: "bottom",
      defaultState: "pinned",
      defaultSize: 150,
      children: [],
    },
  ],
  children: [],
  layoutState: {
    panels: {
      explorer2: {
        id: "explorer2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
      search2: {
        id: "search2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
      settings2: {
        id: "settings2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
    },
    activeTabs: {
      left: "explorer2",
      right: null,
      bottom: null,
    },
  },
  tabMode: "icon",
}

const capture1 = {
  props: {
    panels: [
      {
        id: "explorer2",
        title: "Explorer",
        defaultPosition: "left",
        defaultState: "pinned",
        defaultSize: 180,
        children: [],
      },
      {
        id: "search2",
        title: "Search",
        defaultPosition: "left",
        defaultState: "pinned",
        defaultSize: 180,
        children: [],
      },
      {
        id: "search2",
        title: "Search",
        defaultPosition: "left",
        defaultState: "pinned",
        defaultSize: 180,
        children: [],
      },
    ],
    tabMode: "icon",
  },
  state: {
    panels: {
      explorer2: {
        id: "explorer2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
      search2: {
        id: "search2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
      settings2: {
        id: "settings2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
    },
    activeTabs: {
      left: "explorer2",
      right: null,
      bottom: null,
    },
  },
  panels: [
    {
      config: {
        id: "explorer2",
        title: "Explorer",
        defaultPosition: "left",
        defaultState: "pinned",
        defaultSize: 180,
        children: [],
      },
      runtime: {
        id: "explorer2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
    },
    {
      config: {
        id: "search2",
        title: "Search",
        defaultPosition: "left",
        defaultState: "pinned",
        defaultSize: 180,
        children: [],
      },
      runtime: {
        id: "search2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
    },
    {
      config: {
        id: "settings2",
        title: "Settings",
        defaultPosition: "left",
        defaultState: "pinned",
        defaultSize: 180,
        children: [],
      },
      runtime: {
        id: "settings2",
        position: "left",
        pinState: "pinned",
        size: 180,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
    },
  ],
}

const capture2 = {
  props: {
    layoutState: {
      panels: {
        explorer4: {
          id: "explorer4",
          position: "left",
          pinState: "pinned",
          size: 200,
          floatPos: {
            x: 80,
            y: 80,
            width: 320,
            height: 400,
          },
          visible: true,
        },
        properties4: {
          id: "properties4",
          position: "right",
          pinState: "pinned",
          size: 200,
          floatPos: {
            x: 80,
            y: 80,
            width: 320,
            height: 400,
          },
          visible: true,
        },
        output4: {
          id: "output4",
          position: "bottom",
          pinState: "pinned",
          size: 120,
          floatPos: {
            x: 80,
            y: 80,
            width: 320,
            height: 400,
          },
          visible: true,
        },
      },
      activeTabs: {
        left: "explorer4",
        right: "properties4",
        bottom: "output4",
      },
    },
    panels: [
      {
        id: "explorer4",
        title: "Explorer",
        defaultPosition: "left",
        defaultState: "pinned",
        defaultSize: 200,
        children: {
          type: "div",
          key: null,
          ref: null,
          props: {
            style: {
              padding: 12,
              color: "var(--eui-text)",
              fontSize: 13,
            },
            children: "Explorer content",
          },
        },
      },
      {
        id: "properties4",
        title: "Properties",
        defaultPosition: "right",
        defaultState: "pinned",
        defaultSize: 200,
        children: {
          type: "div",
          key: null,
          ref: null,
          props: {
            style: {
              padding: 12,
              color: "var(--eui-text)",
              fontSize: 13,
            },
            children: "Properties content",
          },
        },
      },
      {
        id: "output4",
        title: "Output",
        defaultPosition: "bottom",
        defaultState: "pinned",
        defaultSize: 120,
        children: {
          type: "div",
          key: null,
          ref: null,
          props: {
            style: {
              padding: 12,
              fontFamily: "monospace",
              fontSize: 12,
              color: "var(--eui-text)",
            },
            children: "Build output…",
          },
        },
      },
    ],
  },
  state: {
    panels: {
      explorer4: {
        id: "explorer4",
        position: "left",
        pinState: "pinned",
        size: 200,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
      properties4: {
        id: "properties4",
        position: "right",
        pinState: "pinned",
        size: 200,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
      output4: {
        id: "output4",
        position: "bottom",
        pinState: "pinned",
        size: 120,
        floatPos: {
          x: 80,
          y: 80,
          width: 320,
          height: 400,
        },
        visible: true,
      },
    },
    activeTabs: {
      left: "explorer4",
      right: "properties4",
      bottom: "output4",
    },
  },
}

const shellSystemState = {
  components: {},
  variables: {},
  global: {},
  queries: {},
  transformers: {}
}

const shellSystemConfig = {
  components: {
    barLeft: {
      root: {},
      start: {
        items: [
          {
            key: "add",
            icon: "IconPlusCircle",
            displayName: "Add UI",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barLeftToggle",
                value: "add",
              },
            ],
          },
          {
            key: "pages",
            icon: "IconNote",
            displayName: "Pages",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barLeftToggle",
                value: "pages",
              },
            ],
          },
          {
            key: "explorer",
            icon: "IconBoundingBox",
            displayName: "Explorer",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barLeftToggle",
                value: "explorer",
              },
            ],
          },
          {
            key: "code",
            icon: "IconCode",
            displayName: "Code",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barLeftToggle",
                value: "code",
              },
            ],
          },
          {
            key: "structure",
            icon: "IconTreeView",
            displayName: "Structure",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barLeftToggle",
                value: "structure",
              },
            ],
          },
          {
            key: "functions",
            icon: "IconFunction",
            displayName: "Functions",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barLeftToggle",
                value: "functions",
              },
            ],
          },
        ],
      },
      center: {
        items: [
          {
            key: "search",
            icon: "IconSearch",
            displayName: "Search",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barLeftToggle",
                value: "search",
              },
            ],
          },
        ],
      },
      end: {
        items: [
          {
            key: "settings",
            icon: "IconSettings",
            displayName: "settings",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barLeftToggle",
                value: "settings",
              },
            ],
          },
        ],
      },
    },
    barRight: {
      root: {},
      start: {
        items: [
          {
            key: "state",
            icon: "IconCodeBlock",
            displayName: "State",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barRightToggle",
                value: "state",
              },
            ],
          },
          {
            key: "history",
            icon: "IconHistory",
            displayName: "History",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barRightToggle",
                value: "history",
              },
            ],
          },
        ],
      },
      center: {},
      end: {
        items: [
          {
            key: "aiAssist",
            icon: "IconAi",
            displayName: "AI Assist",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "barRightToggle",
                value: "aiAssist",
              },
            ],
          },
        ],
      },
    },
    statusBar: {
      root: {},
      start: {
        items: [
          {
            key: "docStatus",
            component: "Menu",
            text: "Status",
            badge: "Draft",
            open: false,
            items: [
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Review",
                value: "review",
              },
              {
                label: "Completed",
                value: "completed",
              },
            ],
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "docStatusToggle",
                value: "!docStatusToggle",
              },
              {
                event: "onValueChange",
                type: "variables",
                method: "setValue",
                target: "docStatusValue",
                value: "event.value",
              },
            ],
          },
        ],
      },
      center: {},
      end: {
        items: [
          {
            key: "debugTools",
            component: "Button",
            icon: "IconDebug",
            text: "Debug",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "debugToolsToggle",
                value: "!debugToolsToggle",
              },
            ],
          },
          {
            key: "history",
            icon: "IconHistory",
            displayName: "History",
            component: "IconButton",
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "historyToggle",
                value: "!historyToggle",
              },
            ],
          },
          {
            key: "help",
            icon: "IconHelp",
            displayName: "Help",
            component: "Menu",
            items: [
              {
                label: "View documentation",
                value: "viewDoc",
                icon: "IconBook",
              },
              {
                label: "API documentation",
                value: "apiDoc",
                icon: "IconApi",
              },
              {
                label: "Component Reference",
                value: "componentReference",
              },
            ],
            events: [
              {
                event: "click",
                type: "variables",
                method: "setValue",
                target: "helpToggle",
                value: "!helpToggle",
              },
            ],
          },
        ],
      },
    },
    panelLeft: {
      root: {},
      header: {},
      footer: {},
      content: {},
    },
    panelRight: {
      root: {},
      header: {},
      footer: {},
      content: {},
    },
    panelBottom: {
      root: {},
      header: {},
      footer: {},
      content: {},
    },
    header: {
      root: {},
      header: {},
      footer: {},
      content: {},
    },
    canvas: {
      root: {},
    },
  },
  variables: {
    barLeftToggle: null,
    docStatusToggle: false,
    debugToolsToggle: false,
    historyToggle: false,
  },
  global: {},
  queries: {},
  transformers: {},
}
