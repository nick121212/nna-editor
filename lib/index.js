"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var draft_js_plugins_editor_1 = require("draft-js-plugins-editor");
var draft_js_1 = require("draft-js");
var styles = require("./style.scss");
var NnaEditor = (function (_super) {
    __extends(NnaEditor, _super);
    function NnaEditor(props, content) {
        return _super.call(this, props, content) || this;
    }
    NnaEditor.prototype.componentWillMount = function () {
        var contentState = this.props.contentState;
        this.state = {
            editorState: draft_js_1.EditorState.createWithContent(contentState, new draft_js_1.CompositeDecorator([]))
        };
    };
    NnaEditor.prototype.focus = function () {
        this.editor.focus();
    };
    NnaEditor.prototype.onChange = function (editorState) {
        var _this = this;
        setTimeout(function () {
            _this.setState({ editorState: editorState });
        }, 10);
    };
    NnaEditor.prototype.logState = function () {
        var content = this.state.editorState.getCurrentContent();
        console.log(draft_js_1.convertToRaw(content));
    };
    NnaEditor.prototype.handleKeyCommand = function (command) {
        var editorState = this.state.editorState;
        var newState = draft_js_1.RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    };
    NnaEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, getBlockStyle = _a.getBlockStyle, plugins = _a.plugins, pluginComponents = _a.pluginComponents, getToolbar = _a.getToolbar;
        return (React.createElement("div", { className: styles["nna-editor"] },
            React.createElement("div", { onClick: this.focus.bind(this), className: styles["nna-editor-main"] },
                React.createElement(draft_js_plugins_editor_1.default, { blockStyleFn: getBlockStyle, handleKeyCommand: this.handleKeyCommand.bind(this), editorState: this.state.editorState, onChange: this.onChange.bind(this), plugins: plugins, ref: function (element) { _this.editor = element; } }),
                pluginComponents),
            React.createElement("div", { className: styles["nna-editor-toolbar"] + " nna-button" }, getToolbar())));
    };
    return NnaEditor;
}(React.Component));
exports.NnaEditor = NnaEditor;
//# sourceMappingURL=index.js.map