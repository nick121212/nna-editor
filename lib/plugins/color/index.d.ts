export declare const createColorBlockPlugin: (config?: {
    decorator?: any;
}) => {
    blockRendererFn: (block: any, {getEditorState}: {
        getEditorState: any;
    }) => {
        component: any;
        editable: boolean;
    };
};
