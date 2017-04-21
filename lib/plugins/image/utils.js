"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var draft_js_1 = require("draft-js");
var draftjs_utils_1 = require("draftjs-utils");
var immutable_1 = require("immutable");
var urlType = 'image';
exports.toggleLink = function (store, data) {
    var editorState = store.getEditorState();
    var contentState = editorState.getCurrentContent();
    var contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', __assign({ src: data.link }, data));
    var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    var selection = editorState.getCurrentContent().getSelectionAfter();
    var newEditorState = draft_js_1.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    newEditorState = draft_js_1.EditorState.acceptSelection(newEditorState, selection);
    contentState = newEditorState.getCurrentContent();
    selection = contentState.getSelectionAfter();
    newEditorState = draft_js_1.EditorState.push(newEditorState, draft_js_1.Modifier.insertText(contentState, selection, '图片简介', immutable_1.OrderedSet.fromKeys({ "UNDERLINE": true }), undefined), 'insert-characters');
    newEditorState = draftjs_utils_1.setBlockData(newEditorState, { 'text-align': "center" });
    store.setEditorState(newEditorState);
};
exports.parseAddUrl = function (stroe, datas) {
    var data = new FileReader();
    var image = new Image();
    image.onload = function (e) {
        console.log(e);
    };
    image.src = datas.url;
};
exports.mutiInsert = function (store, datas) {
    var editorState = store.getEditorState();
    var contentState = editorState.getCurrentContent();
    var newEditorState;
    for (var key in datas) {
        if (datas.hasOwnProperty(key)) {
            var element = datas[key];
            var contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', element);
            var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            newEditorState = (newEditorState || editorState);
            var selection = newEditorState.getCurrentContent().getSelectionAfter();
            newEditorState = draft_js_1.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
            newEditorState = draft_js_1.EditorState.acceptSelection(newEditorState, selection);
            var currentContent = newEditorState.getCurrentContent();
            selection = currentContent.getSelectionAfter();
            currentContent = draft_js_1.Modifier.insertText(currentContent, selection, '图片简介', immutable_1.OrderedSet.fromKeys({ "UNDERLINE": true }), undefined);
            newEditorState = draft_js_1.EditorState.push(newEditorState, currentContent, 'insert-characters');
            newEditorState = draftjs_utils_1.setBlockData(newEditorState, { 'text-align': "center" });
        }
    }
    store.setEditorState(newEditorState);
};
//# sourceMappingURL=utils.js.map