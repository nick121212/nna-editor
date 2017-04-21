/// <reference types="react" />
import * as React from 'react';
export declare const LinkHoc: (Component: any, {theme, type, children}: {
    theme: {
        wrapper?: string;
    };
    children?: JSX.Element;
    type: number;
}) => React.ComponentClass<any>;
