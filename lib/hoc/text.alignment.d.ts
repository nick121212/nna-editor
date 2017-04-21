/// <reference types="react" />
import * as React from 'react';
export declare const TextAlignmentHoc: (Component: any, {theme, alignment, activeConvert, children}: {
    theme: {
        wrapper?: string;
    };
    alignment: string;
    children?: JSX.Element;
    activeConvert?: (active: boolean) => {};
}) => React.ComponentClass<any>;
