/// <reference types="draft-js" />
/// <reference types="react" />
import * as React from 'react';
import { EditorState } from 'draft-js';
export interface IPluginConfig {
    atuoSave?: {
        saveFunction: (editorState: EditorState) => void;
        debounceTime?: number;
        saveAlways?: boolean;
        savingComponent?: new () => React.Component<any, any>;
    };
    image?: {
        upload: (file: File, store: any) => Promise<string>;
        wrapperImage?: new () => React.Component<any, any>;
    };
    Component?: new () => React.Component<any, any>;
}
declare var _default: (config?: IPluginConfig) => {
    EmojiSuggestions: any;
    InlineToolbar: any;
    LinkComponent: any;
    VideoComponent: any;
    ImageComponent: any;
    store: {
        subscribeToItem: (key: any, callback: any) => void;
        unsubscribeFromItem: (key: any, callback: any) => void;
        updateItem: (key: any, item: any) => void;
        getItem: (key: any) => any;
        getEditorState: any;
        setEditorState: any;
    };
    SavingComponent: any;
    decorators: {
        strategy: (contentBlock: any, callback: any, contentState: any) => void;
        component: (props: any) => JSX.Element;
    }[];
    plugins: any[];
};
export default _default;
