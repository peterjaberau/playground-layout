
export default {
    title: "IDE workbench",
    description:
        "A code editor: a file tree in the start border opens files as tabs, modified tabs show a dot and ask before closing, a terminal and problems panel in a bottom border, a context menu per tab, an overflow menu, and the layout saved between visits.",
    category: "apps",
    order: 4,
    features: [
        "Dockable.Borders",
        "typed data",
        "tab.add",
        "tab.select",
        "tab.set-data",
        "model.use veto",
        "model.subscribe",
        "toJSON",
        "LayoutValidationError",
        "Dialog",
        "Menu",
        "localStorage",
    ],
    docs: "/docs/guides/tabs",
};
