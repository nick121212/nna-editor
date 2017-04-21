/// <reference types="react" />
import * as React from 'react';
export interface IProps {
    theme: any;
    linkButtons: Map<string, new () => React.Component<any, any>>;
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
export interface ILinkFormProps {
    form: any;
    store: any;
    data: any;
    onSubmit: (data) => void;
}
export declare class LinkComponent extends React.Component<IProps, IState> {
    constructor(props: any, context: any);
    addLink(data: any): void;
    removeLink(e: React.MouseEvent<any>): void;
    handleVisibleChange: (visible: any) => void;
    render(): JSX.Element;
}
