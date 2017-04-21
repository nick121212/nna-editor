/// <reference types="react" />
import * as React from 'react';
export interface IProps {
    theme: any;
    structure: Array<new () => React.Component<any, any>>;
    store: {
        subscribeToItem: (key: string, callback: Function) => void;
        unsubscribeFromItem: (key: string, callback: Function) => void;
        getItem: (key: string) => any;
        getEditorState: Function;
        setEditorState: Function;
    };
}
export interface IState {
    isVisible: boolean;
    position: Object;
    isBottom: boolean;
}
export declare class ToolbarComponent extends React.Component<IProps, IState> {
    private toolbar;
    constructor(props: any, context: any);
    componentWillMount(): void;
    componentWillUnmount(): void;
    onVisibilityChanged(isVisible: any): void;
    render(): JSX.Element;
}
