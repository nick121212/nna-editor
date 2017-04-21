declare var _default: () => {
    store: {
        subscribeToItem: (key: any, callback: any) => void;
        unsubscribeFromItem: (key: any, callback: any) => void;
        updateItem: (key: any, item: any) => void;
        getItem: (key: any) => any;
        getEditorState: any;
        setEditorState: any;
    };
    initialize: ({getReadOnly, getEditorState, setEditorState}: {
        getReadOnly: any;
        getEditorState: any;
        setEditorState: any;
    }) => void;
};
export default _default;
