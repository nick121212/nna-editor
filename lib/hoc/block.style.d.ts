/// <reference types="react" />
import * as React from 'react';
export declare const BlockStyleHoc: (Component: any, {theme, children, style, activeConvert}: {
    theme: {
        wrapper?: string;
    };
    children?: JSX.Element;
    style: string;
    activeConvert?: (active: boolean) => {};
}) => React.ComponentClass<any>;
