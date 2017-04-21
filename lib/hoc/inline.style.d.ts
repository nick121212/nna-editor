/// <reference types="react" />
import * as React from 'react';
export declare const InlineStyleHoc: (Component: any, {theme, style, activeConvert, children}: {
    theme: {
        wrapper?: string;
    };
    style: string;
    children?: JSX.Element;
    activeConvert?: (active: boolean) => {};
}) => React.ComponentClass<any>;
