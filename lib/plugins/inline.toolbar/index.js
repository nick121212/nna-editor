"use strict";
var decorate_component_with_props_1 = require("decorate-component-with-props");
var utils_1 = require("../utils");
var map_1 = require("../map");
var toolbar_1 = require("./components/toolbar");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (Component, config) {
    if (config === void 0) { config = {}; }
    var defaultTheme = {};
    var store = utils_1.createStore({
        isVisible: false
    });
    var inlineButtons = map_1.inlineComponents(Component);
    var toolbarProps = {
        store: store,
        structure: [
            inlineButtons.get("bold"),
            inlineButtons.get("italic"),
            inlineButtons.get("underline"),
            inlineButtons.get("code")
        ],
        theme: defaultTheme
    };
    return {
        initialize: function (_a) {
            var getEditorState = _a.getEditorState, setEditorState = _a.setEditorState;
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
        },
        onChange: function (editorState) {
            var selection = editorState.getSelection();
            store.updateItem('isVisible', selection.getHasFocus() && !selection.isCollapsed());
            return editorState;
        },
        InlineToolbar: decorate_component_with_props_1.default(toolbar_1.ToolbarComponent, toolbarProps),
    };
};
//# sourceMappingURL=index.js.map