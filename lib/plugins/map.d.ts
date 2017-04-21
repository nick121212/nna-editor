/// <reference types="react" />
import * as React from 'react';
declare const INLINE_STYLES: {
    key: string;
    label: string;
    style: string;
    icon: string;
}[];
declare const BLOCK_TYPES_H: {
    key: string;
    label: string;
    style: string;
    icon: string;
}[];
declare const BLOCK_TYPES: {
    key: string;
    label: string;
    style: string;
    icon: string;
}[];
declare const BLOCK_ALIGNMENT_TYPES: {
    key: string;
    label: string;
    alignment: string;
    icon: string;
}[];
export declare const linkComponents: (Component: any) => Map<string, new () => React.Component<any, any>>;
export declare const videoComponents: (Component: any) => Map<string, new () => React.Component<any, any>>;
export declare const ImageComponents: (Component: any) => Map<string, new () => React.Component<any, any>>;
export declare const redoUndoComponents: (Component: any) => Map<string, new () => React.Component<any, any>>;
export declare const inlineComponents: (Component: any) => Map<string, new () => React.Component<any, any>>;
export declare const blockHComponents: (Component: any) => Map<string, new () => React.Component<any, any>>;
export declare const blockComponents: (Component: any) => Map<string, new () => React.Component<any, any>>;
export declare const blockAlignmentComponents: (Component: any) => Map<string, new () => React.Component<any, any>>;
export { INLINE_STYLES, BLOCK_TYPES, BLOCK_TYPES_H, BLOCK_ALIGNMENT_TYPES };
