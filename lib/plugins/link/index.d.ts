/// <reference types="react" />
declare var _default: (Component: any, config?: {}) => {
    handlePastedText: (text: any, html: any, {getEditorState, setEditorState}: {
        getEditorState: any;
        setEditorState: any;
    }) => boolean;
    decorators: {
        strategy: (contentBlock: any, callback: any, contentState: any) => void;
        component: (props: any) => JSX.Element;
    }[];
    initialize: ({getEditorState, setEditorState}: {
        getEditorState: any;
        setEditorState: any;
    }) => void;
    LinkComponent: any;
};
export default _default;
