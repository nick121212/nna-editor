"use strict";
var utils_1 = require("../utils");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function () {
    var store = utils_1.default({
        isVisible: false,
    });
    return {
        store: store,
        initialize: function (_a) {
            var getReadOnly = _a.getReadOnly, getEditorState = _a.getEditorState, setEditorState = _a.setEditorState;
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
        }
    };
};
//# sourceMappingURL=index.js.map