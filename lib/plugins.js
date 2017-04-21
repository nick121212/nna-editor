"use strict";
var antd_1 = require("antd");
var draft_js_hashtag_plugin_1 = require("draft-js-hashtag-plugin");
var draft_js_emoji_plugin_1 = require("draft-js-emoji-plugin");
var draft_js_focus_plugin_1 = require("draft-js-focus-plugin");
var draft_js_autosave_plugin_1 = require("draft-js-autosave-plugin");
var inline_toolbar_1 = require("./plugins/inline.toolbar");
var link_1 = require("./plugins/link");
var video_1 = require("./plugins/video");
var image_1 = require("./plugins/image");
var none_1 = require("./plugins/none");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (config) {
    if (config === void 0) { config = {}; }
    var _a = config.atuoSave, atuoSave = _a === void 0 ? {} : _a, _b = config.image, image = _b === void 0 ? {} : _b, Component = config.Component;
    var emojiPlugin = draft_js_emoji_plugin_1.default();
    var buttonPlugin = none_1.default();
    var focusPlugin = draft_js_focus_plugin_1.default();
    var inlineToolbarPlugin = inline_toolbar_1.default(antd_1.Button);
    var linkPlugin = link_1.default(antd_1.Button);
    var videoPulgin = video_1.default(antd_1.Button, {});
    var imagePlugin = image_1.default(antd_1.Button, image || {});
    var autosavePlugin = draft_js_autosave_plugin_1.default(Object.assign({}, {
        saveFunction: function (editorState) {
            return true;
        },
        debounceTime: 3000,
        saveAlways: true
    }, atuoSave));
    var hashtagPlugin = draft_js_hashtag_plugin_1.default();
    var LinkComponent = linkPlugin.LinkComponent, decorators = linkPlugin.decorators;
    var EmojiSuggestions = emojiPlugin.EmojiSuggestions;
    var InlineToolbar = inlineToolbarPlugin.InlineToolbar;
    var store = buttonPlugin.store;
    var ImageComponent = imagePlugin.ImageComponent;
    var VideoComponent = videoPulgin.VideoComponent;
    var SavingComponent = autosavePlugin.SavingComponent;
    var plugins = [hashtagPlugin, inlineToolbarPlugin, imagePlugin, focusPlugin, buttonPlugin, emojiPlugin, linkPlugin, videoPulgin, autosavePlugin];
    return {
        EmojiSuggestions: EmojiSuggestions,
        InlineToolbar: InlineToolbar,
        LinkComponent: LinkComponent,
        VideoComponent: VideoComponent,
        ImageComponent: ImageComponent,
        store: store,
        SavingComponent: SavingComponent,
        decorators: decorators,
        plugins: plugins
    };
};
//# sourceMappingURL=plugins.js.map