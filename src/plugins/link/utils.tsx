import { AtomicBlockUtils, EditorState, RichUtils, SelectionState, Modifier } from 'draft-js';
import { getSelectionEntity } from 'draftjs-utils';

export const toggleLink = (store, data) => {
    const editorState = store.getEditorState();
    let selection = editorState.getSelection();
    let contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', data.link);
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
    // selection = newState.getSelection().merge({
    //     anchorOffset: selection.get('anchorOffset') - data.title.length,
    //     focusOffset: selection.get('anchorOffset')
    // });
    newState = EditorState.acceptSelection(newState, selection);
    store.setEditorState(RichUtils.toggleLink(newState, selection, entityKey));

    console.log(contentState.getEntity(entityKey).getType());


    // const editorState = store.getEditorState();
    // const contentState = editorState.getCurrentContent();
    // const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', data.link);
    // const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    // let selection = editorState.getSelection();

    // // var selectionState = SelectionState.createEmpty(data.title);

    // selection = selection.merge({
    //     anchorOffset: data.start,
    //     focusOffset: data.end
    // });

    // if (selection.isCollapsed()) {
    //     const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    //         editorState,
    //         entityKey,
    //         data.title
    //     );
    //     store.setEditorState(EditorState.forceSelection(
    //         newEditorState,
    //         editorState.getCurrentContent().getSelectionBefore()
    //     ));
    // } else {
    //     store.setEditorState(RichUtils.toggleLink(editorState, selection, entityKey));
    // }

    // this.handleVisibleChange(false);
}