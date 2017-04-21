"use strict";
var draft_js_1 = require("draft-js");
exports.toggleLink = function (store, data) {
    var editorState = store.getEditorState();
    var selection = editorState.getSelection();
    var contentState = editorState.getCurrentContent();
    var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', data.link);
    var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    contentState = draft_js_1.Modifier.replaceText(contentState, selection, "" + data.title, editorState.getCurrentInlineStyle(), entityKey);
    var newState = draft_js_1.EditorState.push(editorState, contentState, 'insert-characters');
    selection = newState.getSelection().merge({
        anchorOffset: selection.get('anchorOffset') + data.title.length,
        focusOffset: selection.get('anchorOffset') + data.title.length
    });
    newState = draft_js_1.EditorState.acceptSelection(newState, selection);
    contentState = draft_js_1.Modifier.insertText(newState.getCurrentContent(), selection, ' ', newState.getCurrentInlineStyle(), undefined);
    newState = draft_js_1.EditorState.push(newState, contentState, 'insert-characters');
    newState = draft_js_1.EditorState.acceptSelection(newState, selection);
    store.setEditorState(draft_js_1.RichUtils.toggleLink(newState, selection, entityKey));
    console.log(contentState.getEntity(entityKey).getType());
};
//# sourceMappingURL=utils.js.map