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
var draft_js_1 = require("draft-js");
exports.BlockStyleHoc = function (Component, _a) {
    var theme = _a.theme, children = _a.children, style = _a.style, activeConvert = _a.activeConvert;
    return (function (_super) {
        __extends(Hoc, _super);
        function Hoc(props, content) {
            var _this = _super.call(this, props, content) || this;
            _this.toggleStyle = function (event) {
                var store = _this.props.store;
                _this.preventBubblingUp(event);
                store.setEditorState(draft_js_1.RichUtils.toggleBlockType(_this.props.store.getEditorState(), style));
            };
            return _this;
        }
        Hoc.prototype.preventBubblingUp = function (event) {
            event.preventDefault();
        };
        Hoc.prototype.blockTypeIsActive = function () {
            var store = this.props.store;
            if (!store.getEditorState) {
                return false;
            }
            var editorState = store.getEditorState();
            var type = editorState
                .getCurrentContent()
                .getBlockForKey(editorState.getSelection().getStartKey())
                .getType();
            return type === style;
        };
        Hoc.prototype.render = function () {
            var _a = this.props, store = _a.store, extra = __rest(_a, ["store"]);
            var props = Object.assign({}, extra, { onClick: this.toggleStyle.bind(this) }, activeConvert ? activeConvert(this.blockTypeIsActive()) : {});
            return (React.createElement("span", { className: theme.wrapper, onMouseDown: this.preventBubblingUp },
                React.createElement(Component, __assign({}, props), this.props.children || children)));
        };
        return Hoc;
    }(React.Component));
};
//# sourceMappingURL=block.style.js.map