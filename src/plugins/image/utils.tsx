import { AtomicBlockUtils, EditorState, RichUtils, SelectionState, Modifier } from 'draft-js';
import { insertNewUnstyledBlock, getSelectionInlineStyle, getSelectionEntity, setBlockData } from 'draftjs-utils';
import { OrderedSet } from "immutable";

const urlType = 'image';

export const toggleLink = (store, data) => {
    const editorState = store.getEditorState();

    let contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { src: data.link, ...data });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let selection = editorState.getCurrentContent().getSelectionAfter();
    let newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
    );
    newEditorState = EditorState.acceptSelection(newEditorState, selection);
    contentState = newEditorState.getCurrentContent();
    selection = contentState.getSelectionAfter();
    newEditorState = EditorState.push(newEditorState, Modifier.insertText(contentState, selection, '图片简介', OrderedSet.fromKeys({ "UNDERLINE": true }), undefined), 'insert-characters');
    newEditorState = setBlockData(newEditorState, { 'text-align': "center" });

    store.setEditorState(newEditorState);
}

export const parseAddUrl = (stroe, datas) => {
    let data = new FileReader();
    // let file = new File()
    let image = new Image();
    
    image.onload = function (e) {
        console.log(e);
    };
    image.src = datas.url;
}

export const mutiInsert = (store, datas) => {

    const editorState = store.getEditorState();
    const contentState = editorState.getCurrentContent();
    let newEditorState;

    for (let key in datas) {
        if (datas.hasOwnProperty(key)) {
            let element = datas[key];
            const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', element);
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            newEditorState = (newEditorState || editorState);
            let selection = newEditorState.getCurrentContent().getSelectionAfter();
            newEditorState = AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            );

            newEditorState = EditorState.acceptSelection(newEditorState, selection);
            let currentContent = newEditorState.getCurrentContent();

            selection = currentContent.getSelectionAfter();
            currentContent = Modifier.insertText(currentContent, selection, '图片简介', OrderedSet.fromKeys({ "UNDERLINE": true }), undefined);
            newEditorState = EditorState.push(newEditorState, currentContent, 'insert-characters');
            newEditorState = setBlockData(newEditorState, { 'text-align': "center" });
            // console.log(getSelectionInlineStyle(newEditorState));
        }
    }

    store.setEditorState(newEditorState);
}