import * as React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';

import { createStore } from '../utils';
import { linkComponents, ImageComponents } from '../map';
import { ImageComponent } from './components/index';
import { Entity, Modifier } from 'draft-js';
import { getSelectionEntity, getSelectionText, setBlockData } from 'draftjs-utils';
import * as linkifyIt from 'linkify-it';
import * as tlds from 'tlds';
import { parseAddUrl } from './utils';
import { Image } from './components/image';

const linkify = linkifyIt();
linkify.tlds(tlds).add("file:", "http:");

export default (Component, config: any = {}) => {
    const defaultTheme = {};
    const store = createStore({
        isVisible: false,
        process: 0
    });
    const linkButtons = ImageComponents(Component);

    const toolbarProps = {
        store,
        linkButtons,
        theme: defaultTheme
    };
    let WrapperImage = config.decorator ? config.decorator(Image) : Image;
    const ThemedImage = decorateComponentWithProps(WrapperImage, { defaultTheme, store, Upload: config.upload });

    return {
        handlePastedText: (text, html, { getEditorState, setEditorState }) => {
            return true;
        },
        decorators: [{
            strategy: (contentBlock, callback, contentState) => {
                contentBlock.findEntityRanges(
                    (character) => {
                        const entityKey = character.getEntity();

                        return (
                            entityKey !== null &&
                            contentState.getEntity(entityKey).getType() === 'image'
                        );
                    },
                    callback
                );
            },
            component: ThemedImage
        }],
        initialize: ({ getEditorState, setEditorState }) => {
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
        },
        ImageComponent: decorateComponentWithProps(ImageComponent, toolbarProps),
    };
};