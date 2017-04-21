"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.createStore = function (initialState) {
    var state = initialState || {};
    var listeners = {};
    var subscribeToItem = function (key, callback) {
        listeners[key] = listeners[key] || [];
        listeners[key].push(callback);
    };
    var unsubscribeFromItem = function (key, callback) {
        listeners[key] = listeners[key].filter(function (listener) { return listener !== callback; });
    };
    var updateItem = function (key, item) {
        state = __assign({}, state, (_a = {}, _a[key] = item, _a));
        if (listeners[key]) {
            listeners[key].forEach(function (listener) { return listener(state[key]); });
        }
        var _a;
    };
    var getItem = function (key) { return state[key]; };
    return {
        subscribeToItem: subscribeToItem,
        unsubscribeFromItem: unsubscribeFromItem,
        updateItem: updateItem,
        getItem: getItem,
        getEditorState: undefined,
        setEditorState: undefined
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.createStore;
//# sourceMappingURL=utils.js.map