"use strict";
var React = require("react");
var undoredo_1 = require("../hoc/undoredo");
var block_style_1 = require("../hoc/block.style");
var inline_style_1 = require("../hoc/inline.style");
var react_fa_1 = require("react-fa");
var text_alignment_1 = require("../hoc/text.alignment");
var link_1 = require("../hoc/link");
var INLINE_STYLES = [
    { key: "bold", label: 'Bold', style: 'BOLD', icon: 'bold' },
    { key: "italic", label: 'Italic', style: 'ITALIC', icon: 'italic' },
    { key: "underline", label: 'Underline', style: 'UNDERLINE', icon: 'underline' },
    { key: "code", label: 'Monospace', style: 'CODE', icon: 'font' },
];
exports.INLINE_STYLES = INLINE_STYLES;
var BLOCK_TYPES_H = [
    { key: "h1", label: 'H1', style: 'header-one', icon: 'header' },
    { key: "h2", label: 'H2', style: 'header-two', icon: 'header' },
    { key: "h3", label: 'H3', style: 'header-three', icon: 'header' },
    { key: "h4", label: 'H4', style: 'header-four', icon: 'header' },
    { key: "h5", label: 'H5', style: 'header-five', icon: 'header' },
    { key: "h6", label: 'H6', style: 'header-six', icon: 'header' },
];
exports.BLOCK_TYPES_H = BLOCK_TYPES_H;
var BLOCK_TYPES = [
    { key: "blockquote", label: 'Blockquote', style: 'blockquote', icon: 'quote-right' },
    { key: "ul", label: 'UL', style: 'unordered-list-item', icon: 'list-ul' },
    { key: "ol", label: 'OL', style: 'ordered-list-item', icon: 'list-ol' },
    { key: "codeblock", label: 'Code Block', style: 'code-block', icon: 'paragraph' },
];
exports.BLOCK_TYPES = BLOCK_TYPES;
var BLOCK_ALIGNMENT_TYPES = [
    { key: "align-justify", label: 'align-justify', alignment: 'default', icon: 'align-justify' },
    { key: "align-left", label: 'align-left', alignment: 'left', icon: 'align-left' },
    { key: "align-right", label: 'align-right', alignment: 'right', icon: 'align-right' },
    { key: "align-center", label: 'align-center', alignment: 'center', icon: 'align-center' }
];
exports.BLOCK_ALIGNMENT_TYPES = BLOCK_ALIGNMENT_TYPES;
var theme = {
    wrapper: "nna-button"
};
exports.linkComponents = function (Component) {
    var buttons = new Map();
    buttons.set("link", link_1.LinkHoc(Component, {
        theme: theme,
        children: React.createElement(react_fa_1.Icon, { name: "chain" }),
        type: 1
    }));
    buttons.set("unlink", link_1.LinkHoc(Component, {
        theme: theme,
        children: React.createElement(react_fa_1.Icon, { name: "chain-broken" }),
        type: 0
    }));
    return buttons;
};
exports.videoComponents = function (Component) {
    var buttons = new Map();
    buttons.set("video", link_1.LinkHoc(Component, {
        theme: theme,
        children: React.createElement(react_fa_1.Icon, { name: "video-camera" }),
        type: 1
    }));
    return buttons;
};
exports.ImageComponents = function (Component) {
    var buttons = new Map();
    buttons.set("image", link_1.LinkHoc(Component, {
        theme: theme,
        children: React.createElement(react_fa_1.Icon, { name: "image" }),
        type: 1
    }));
    return buttons;
};
exports.redoUndoComponents = function (Component) {
    var buttons = new Map();
    buttons.set("redo", undoredo_1.UndoRedoHoc(Component, {
        theme: theme,
        children: React.createElement(react_fa_1.Icon, { name: "repeat" }),
        type: 1
    }));
    buttons.set("undo", undoredo_1.UndoRedoHoc(Component, {
        theme: theme,
        children: React.createElement(react_fa_1.Icon, { name: "undo" }),
        type: 0
    }));
    return buttons;
};
exports.inlineComponents = function (Component) {
    var inlineButtonMap = new Map();
    INLINE_STYLES.forEach(function (inline) {
        inlineButtonMap.set(inline.key, inline_style_1.InlineStyleHoc(Component, {
            theme: theme,
            style: inline.style,
            children: React.createElement(react_fa_1.Icon, { name: inline.icon }),
            activeConvert: function (active) {
                return { "type": active ? "primary" : "" };
            }
        }));
    });
    return inlineButtonMap;
};
exports.blockHComponents = function (Component) {
    var blockButtonMap = new Map();
    BLOCK_TYPES_H.forEach(function (inline) {
        blockButtonMap.set(inline.key, block_style_1.BlockStyleHoc(Component, {
            theme: theme,
            style: inline.style,
            children: React.createElement("span", null, inline.label),
            activeConvert: function (active) {
                return { "type": active ? "primary" : "" };
            }
        }));
    });
    return blockButtonMap;
};
exports.blockComponents = function (Component) {
    var blockButtonMap = new Map();
    BLOCK_TYPES.forEach(function (inline) {
        blockButtonMap.set(inline.key, block_style_1.BlockStyleHoc(Component, {
            theme: theme,
            style: inline.style,
            children: React.createElement(react_fa_1.Icon, { name: inline.icon }),
            activeConvert: function (active) {
                return { "type": active ? "primary" : "" };
            }
        }));
    });
    return blockButtonMap;
};
exports.blockAlignmentComponents = function (Component) {
    var buttons = new Map();
    BLOCK_ALIGNMENT_TYPES.forEach(function (inline) {
        buttons.set(inline.key, text_alignment_1.TextAlignmentHoc(Component, {
            theme: theme,
            alignment: inline.alignment,
            children: React.createElement(react_fa_1.Icon, { name: inline.icon }),
            activeConvert: function (active) {
                return { "type": active ? "primary" : "" };
            }
        }));
    });
    return buttons;
};
//# sourceMappingURL=map.js.map