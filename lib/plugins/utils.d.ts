export declare const createStore: (initialState: any) => {
    subscribeToItem: (key: any, callback: any) => void;
    unsubscribeFromItem: (key: any, callback: any) => void;
    updateItem: (key: any, item: any) => void;
    getItem: (key: any) => any;
    getEditorState: any;
    setEditorState: any;
};
export default createStore;
