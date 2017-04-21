/// <reference types="react" />
/// <reference types="draft-js" />
import * as React from 'react';
import { ContentState } from 'draft-js';
export interface IProps {
    getBlockStyle: Function;
    plugins: Array<any>;
    pluginComponents: Array<JSX.Element>;
    getToolbar: () => Array<JSX.Element>;
    contentState: ContentState;
}
export declare class NnaEditor extends React.Component<IProps, any> {
    private editor;
    constructor(props: any, content: any);
    componentWillMount(): void;
    focus(): void;
    onChange(editorState: any): void;
    logState(): void;
    handleKeyCommand(command: any): boolean;
    render(): JSX.Element;
}
