import * as React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import { getSelectionEntity, getSelectionText } from 'draftjs-utils';
import { Video } from './components/video';

import { createStore } from '../utils';
import { videoComponents } from '../map';
import { VideoComponent } from './components/index';
import { Entity } from 'draft-js';

export default (Component, config: any = {}) => {
    const defaultTheme = {};
    const store = createStore({
        isVisible: false
    });
    const videoButtons = videoComponents(Component);
    let ThemeVideo = config.wrapperComponent || Video;
    let VideoWrapper = config.decorator ? config.decorator(ThemeVideo) : ThemeVideo;

    const toolbarProps = {
        store,
        videoButtons,
        theme: defaultTheme
    };

    return Object.assign({}, {
        decorators: [{
            strategy: (contentBlock, callback, contentState) => {
                contentBlock.findEntityRanges(
                    (character) => {
                        const entityKey = character.getEntity();

                        return (
                            entityKey !== null &&
                            contentState.getEntity(entityKey).getType() === 'video'
                        );
                    },
                    callback
                );
            },
            component: VideoWrapper
        }],
        initialize: ({ getEditorState, setEditorState }) => {
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
        },
        VideoComponent: decorateComponentWithProps(VideoComponent, toolbarProps),
    });
};