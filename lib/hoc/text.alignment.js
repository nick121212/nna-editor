"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var React = require("react");
var draftjs_utils_1 = require("draftjs-utils");
exports.TextAlignmentHoc = function (Component, _a) {
    var theme = _a.theme, alignment = _a.alignment, activeConvert = _a.activeConvert, children = _a.children;
    return (function (_super) {
        __extends(Hoc, _super);
        function Hoc(props, content) {
            return _super.call(this, props, content) || this;
        }
        Hoc.prototype.activate = function (event) {
            var editorState = this.props.store.getEditorState();
            this.preventBubblingUp(event);
            this.props.store.setEditorState(draftjs_utils_1.setBlockData(editorState, { 'text-align': alignment }));
        };
        Hoc.prototype.preventBubblingUp = function (event) {
            event.preventDefault();
        };
        Hoc.prototype.isActive = function () {
            var editorState = this.props.store.getEditorState();
            var block = draftjs_utils_1.getSelectedBlock(editorState);
            var data = block.getData() || new Map();
            return data.get("text-align") === alignment;
        };
        Hoc.prototype.render = function () {
            var _a = this.props, store = _a.store, extra = __rest(_a, ["store"]);
            var props = Object.assign({}, extra, { onClick: this.activate.bind(this) }, activeConvert ? activeConvert(this.isActive()) : {});
            return (React.createElement("span", { className: theme.wrapper, onMouseDown: this.preventBubblingUp },
                React.createElement(Component, __assign({}, props), props.children || children)));
        };
        return Hoc;
    }(React.Component));
};
//# sourceMappingURL=text.alignment.js.map