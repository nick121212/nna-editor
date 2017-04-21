import * as React from 'react';
import { Button } from 'antd';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createHashtagPLugin from 'draft-js-hashtag-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import { composeDecorators } from 'draft-js-plugins-editor';
import createAutosavePlugin from 'draft-js-autosave-plugin';
import { EditorState } from 'draft-js';

import createInlineToolbarPlugin from './plugins/inline.toolbar';
import createLinkToolbarPlugin from './plugins/link';
import createVideoToolbarPlugin from './plugins/video';
import createImageToolbarPlugin from './plugins/image';
import createButtonsPlugin from './plugins/none';


export interface IPluginConfig {
    atuoSave?: {
        saveFunction: (editorState: EditorState) => void;
        debounceTime?: number;
        saveAlways?: boolean;
        savingComponent?: new () => React.Component<any, any>;
    },
    image?: {
        upload: (file: File, store: any) => Promise<string>;
        wrapperImage?: new () => React.Component<any, any>;
    },
    Component?: new () => React.Component<any, any>;
}

export default (config: IPluginConfig = {}) => {
    const { atuoSave = {}, image = {}, Component } = config;
    const emojiPlugin = createEmojiPlugin();
    const buttonPlugin = createButtonsPlugin();
    const focusPlugin = createFocusPlugin();
    const inlineToolbarPlugin = createInlineToolbarPlugin(Button);
    const linkPlugin = createLinkToolbarPlugin(Button);
    const videoPulgin = createVideoToolbarPlugin(Button, {});
    const imagePlugin = createImageToolbarPlugin(Button, image || {});
    const autosavePlugin = createAutosavePlugin(Object.assign({}, {
        saveFunction: (editorState: EditorState) => {
            return true;
        },
        debounceTime: 3000,
        saveAlways: true
    }, atuoSave));
    const hashtagPlugin = createHashtagPLugin();
    const { LinkComponent, decorators } = linkPlugin;
    const { EmojiSuggestions } = emojiPlugin;
    const { InlineToolbar } = inlineToolbarPlugin;
    const { store } = buttonPlugin;
    const { ImageComponent, } = imagePlugin;
    const { VideoComponent } = videoPulgin;
    const { SavingComponent } = autosavePlugin;
    const plugins = [hashtagPlugin, inlineToolbarPlugin, imagePlugin, focusPlugin, buttonPlugin, emojiPlugin, linkPlugin, videoPulgin, autosavePlugin];

    return {
        EmojiSuggestions,
        InlineToolbar,
        LinkComponent,
        VideoComponent,
        ImageComponent,
        store,
        SavingComponent,
        decorators,
        plugins
    };
}
