"use strict";
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
var ColorBlock = function (_a) {
    var block = _a.block, blockProps = _a.blockProps, customStyleMap = _a.customStyleMap, customStyleFn = _a.customStyleFn, decorator = _a.decorator, forceSelection = _a.forceSelection, offsetKey = _a.offsetKey, selection = _a.selection, tree = _a.tree, contentState = _a.contentState, style = _a.style, elementProps = __rest(_a, ["block", "blockProps", "customStyleMap", "customStyleFn", "decorator", "forceSelection", "offsetKey", "selection", "tree", "contentState", "style"]);
    return (React.createElement("div", __assign({}, elementProps, { style: __assign({ width: 200, height: 80, backgroundColor: '#9bc0c7' }, style) })));
};
exports.createColorBlockPlugin = function (config) {
    if (config === void 0) { config = {}; }
    var component = config.decorator ? config.decorator(ColorBlock) : ColorBlock;
    return {
        blockRendererFn: function (block, _a) {
            var getEditorState = _a.getEditorState;
            if (block.getType() === 'atomic') {
                var contentState = getEditorState().getCurrentContent();
                var entity = contentState.getEntity(block.getEntityAt(0));
                var type = entity.getType();
                if (type === 'colorBlock') {
                    return {
                        component: component,
                        editable: false,
                    };
                }
            }
            return null;
        },
    };
};
//# sourceMappingURL=index.js.map