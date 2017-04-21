import createStore from '../utils';

export default () => {
    const store = createStore({
        isVisible: false,
    });

    return {
        store: store,
        initialize: ({ getReadOnly, getEditorState, setEditorState }) => {
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
        }
    };
};