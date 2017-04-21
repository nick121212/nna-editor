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
exports.UndoRedoHoc = function (Component, _a) {
    var theme = _a.theme, _b = _a.type, type = _b === void 0 ? 0 : _b, children = _a.children;
    return (function (_super) {
        __extends(Hoc, _super);
        function Hoc(props, content) {
            return _super.call(this, props, content) || this;
        }
        Hoc.prototype.redo = function (e) {
            var store = this.props.store;
            this.preventBubblingUp(e);
            store.setEditorState(draft_js_1.EditorState.redo(store.getEditorState()));
        };
        Hoc.prototype.canRedo = function () {
            var store = this.props.store;
            if (!store.getEditorState) {
                return false;
            }
            return store.getEditorState().getRedoStack().isEmpty();
        };
        Hoc.prototype.undo = function (e) {
            var store = this.props.store;
            store.setEditorState(draft_js_1.EditorState.undo(store.getEditorState()));
            e.preventDefault();
        };
        Hoc.prototype.canUndo = function () {
            var store = this.props.store;
            if (!store.getEditorState) {
                return false;
            }
            return store.getEditorState().getUndoStack().isEmpty();
        };
        Hoc.prototype.preventBubblingUp = function (event) {
            event.preventDefault();
        };
        Hoc.prototype.render = function () {
            var _a = this.props, store = _a.store, extra = __rest(_a, ["store"]);
            var props = {};
            if (type == 0) {
                props = Object.assign({}, extra, { onClick: this.undo.bind(this), disabled: this.canUndo() });
            }
            else {
                props = Object.assign({}, extra, { onClick: this.redo.bind(this), disabled: this.canRedo() });
            }
            return (React.createElement("span", { className: theme.wrapper, onMouseDown: this.preventBubblingUp },
                React.createElement(Component, __assign({}, props), this.props.children || children)));
        };
        return Hoc;
    }(React.Component));
};
//# sourceMappingURL=undoredo.js.map