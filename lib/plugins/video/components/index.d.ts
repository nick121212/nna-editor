/// <reference types="react" />
import * as React from 'react';
export interface IProps {
    theme: any;
    addVideo: Function;
    videoButtons: Map<string, new () => React.Component<any, any>>;
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
}
export declare class VideoComponent extends React.Component<IProps, IState> {
    constructor(props: any, context: any);
    handleData(data: any): void;
    handleVisibleChange: (visible: any) => void;
    render(): JSX.Element;
}
