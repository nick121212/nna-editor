"use strict";
var decorate_component_with_props_1 = require("decorate-component-with-props");
var video_1 = require("./components/video");
var utils_1 = require("../utils");
var map_1 = require("../map");
var index_1 = require("./components/index");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (Component, config) {
    if (config === void 0) { config = {}; }
    var defaultTheme = {};
    var store = utils_1.createStore({
        isVisible: false
    });
    var videoButtons = map_1.videoComponents(Component);
    var ThemeVideo = config.wrapperComponent || video_1.Video;
    var VideoWrapper = config.decorator ? config.decorator(ThemeVideo) : ThemeVideo;
    var toolbarProps = {
        store: store,
        videoButtons: videoButtons,
        theme: defaultTheme
    };
    return Object.assign({}, {
        blockRendererFn1: function (block, _a) {
            var getEditorState = _a.getEditorState;
            if (block.getType() === 'atomic') {
                var contentState = getEditorState().getCurrentContent();
                var entity = contentState.getEntity(block.getEntityAt(0));
                var type = entity.getType();
                if (type === 'video') {
                    return {
                        component: decorate_component_with_props_1.default(VideoWrapper, {}),
                        editable: false,
                    };
                }
            }
            return null;
        },
        decorators: [{
                strategy: function (contentBlock, callback, contentState) {
                    contentBlock.findEntityRanges(function (character) {
                        var entityKey = character.getEntity();
                        return (entityKey !== null &&
                            contentState.getEntity(entityKey).getType() === 'video');
                    }, callback);
                },
                component: VideoWrapper
            }],
        initialize: function (_a) {
            var getEditorState = _a.getEditorState, setEditorState = _a.setEditorState;
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
        },
        VideoComponent: decorate_component_with_props_1.default(index_1.VideoComponent, toolbarProps),
    });
};
//# sourceMappingURL=index.js.map