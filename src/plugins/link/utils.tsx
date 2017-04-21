import { AtomicBlockUtils, EditorState, RichUtils, SelectionState, Modifier } from 'draft-js';
import { getSelectionEntity } from 'draftjs-utils';

export const toggleLink = (store, data) => {
    const editorState = store.getEditorState();
    let selection = editorState.getSelection();
    let contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: data.link });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    contentState = Modifier.replaceText(contentState, selection, `${data.title}`, editorState.getCurrentInlineStyle(), entityKey);

    let newState = EditorState.push(editorState, contentState, 'insert-characters');

    //链接后面插入空格
    selection = newState.getSelection().merge({
        anchorOffset: selection.get('anchorOffset') + data.title.length,
        focusOffset: selection.get('anchorOffset') + data.title.length
    });
    newState = EditorState.acceptSelection(newState, selection);
    contentState = Modifier.insertText(newState.getCurrentContent(), selection, ' ', newState.getCurrentInlineStyle(), undefined);
    newState = EditorState.push(newState, contentState, 'insert-characters');

    newState = EditorState.acceptSelection(newState, selection);
    store.setEditorState(RichUtils.toggleLink(newState, selection, entityKey));
}