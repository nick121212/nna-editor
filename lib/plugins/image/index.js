"use strict";
var decorate_component_with_props_1 = require("decorate-component-with-props");
var utils_1 = require("../utils");
var map_1 = require("../map");
var index_1 = require("./components/index");
var linkifyIt = require("linkify-it");
var tlds = require("tlds");
var image_1 = require("./components/image");
var linkify = linkifyIt();
linkify.tlds(tlds).add("file:", "http:");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (Component, config) {
    if (config === void 0) { config = {}; }
    var defaultTheme = {};
    var store = utils_1.createStore({
        isVisible: false,
        process: 0
    });
    var linkButtons = map_1.ImageComponents(Component);
    var toolbarProps = {
        store: store,
        linkButtons: linkButtons,
        theme: defaultTheme
    };
    var WrapperImage = config.decorator ? config.decorator(image_1.Image) : image_1.Image;
    var ThemedImage = decorate_component_with_props_1.default(WrapperImage, { defaultTheme: defaultTheme, store: store, Upload: config.upload });
    return {
        handlePastedText: function (text, html, _a) {
            var getEditorState = _a.getEditorState, setEditorState = _a.setEditorState;
            return true;
        },
        decorators: [{
                strategy: function (contentBlock, callback, contentState) {
                    contentBlock.findEntityRanges(function (character) {
                        var entityKey = character.getEntity();
                        return (entityKey !== null &&
                            contentState.getEntity(entityKey).getType() === 'image');
                    }, callback);
                },
                component: ThemedImage
            }],
        initialize: function (_a) {
            var getEditorState = _a.getEditorState, setEditorState = _a.setEditorState;
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
        },
        ImageComponent: decorate_component_with_props_1.default(index_1.ImageComponent, toolbarProps),
    };
};
//# sourceMappingURL=index.js.map