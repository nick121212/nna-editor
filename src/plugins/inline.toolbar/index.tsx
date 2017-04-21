import decorateComponentWithProps from 'decorate-component-with-props';

import { createStore } from '../utils';
import { inlineComponents } from '../map';
import { ToolbarComponent } from './components/toolbar';

export default (Component, config = {}) => {
    const defaultTheme = {};
    const store = createStore({
        isVisible: false
    });
    const inlineButtons = inlineComponents(Component);

    const toolbarProps = {
        store,
        structure: [
            inlineButtons.get("bold"),
            inlineButtons.get("italic"),
            inlineButtons.get("underline"),
            inlineButtons.get("code")
        ],
        theme: defaultTheme
    };

    return {
        initialize: ({ getEditorState, setEditorState }) => {
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
        },
        onChange: (editorState) => {
            const selection = editorState.getSelection();

            store.updateItem('isVisible', selection.getHasFocus() && !selection.isCollapsed());

            return editorState;
        },
        InlineToolbar: decorateComponentWithProps(ToolbarComponent, toolbarProps),
    };
};