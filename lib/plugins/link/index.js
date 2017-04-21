"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var React = require("react");
var decorate_component_with_props_1 = require("decorate-component-with-props");
var utils_1 = require("../utils");
var map_1 = require("../map");
var index_1 = require("./components/index");
var linkifyIt = require("linkify-it");
var tlds = require("tlds");
var utils_2 = require("./utils");
var linkify = linkifyIt();
linkify.tlds(tlds);
var linkRegexp = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/i;
var Link = function (props) {
    var _a = props.decoratedText, decoratedText = _a === void 0 ? '' : _a, _b = props.theme, theme = _b === void 0 ? {} : _b, _c = props.target, target = _c === void 0 ? '_self' : _c, className = props.className, children = props.children, component = props.component, dir = props.dir, entityKey = props.entityKey, getEditorState = props.getEditorState, offsetKey = props.offsetKey, setEditorState = props.setEditorState, contentState = props.contentState, otherProps = __rest(props, ["decoratedText", "theme", "target", "className", "children", "component", "dir", "entityKey", "getEditorState", "offsetKey", "setEditorState", "contentState"]);
    var href = entityKey ? contentState.getEntity(entityKey).getData() : decoratedText;
    var newProps = __assign({}, otherProps, { href: href,
        target: target });
    return (React.createElement("a", __assign({ target: "_blank" }, newProps), children));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (Component, config) {
    if (config === void 0) { config = {}; }
    var defaultTheme = {};
    var store = utils_1.createStore({
        isVisible: false
    });
    var linkButtons = map_1.linkComponents(Component);
    var toolbarProps = {
        store: store,
        linkButtons: linkButtons,
        theme: defaultTheme
    };
    return {
        handlePastedText: function (text, html, _a) {
            var getEditorState = _a.getEditorState, setEditorState = _a.setEditorState;
            var links = linkify.match(text);
            if (typeof links !== 'undefined' && links !== null) {
                for (var i = 0; i < links.length; i += 1) {
                    var link = links[i];
                    utils_2.toggleLink(store, { link: link.url, title: link.text, start: link.index, end: link.lastIndex });
                }
                return true;
            }
            return false;
        },
        decorators: [{
                strategy: function (contentBlock, callback, contentState) {
                    contentBlock.findEntityRanges(function (character) {
                        var entityKey = character.getEntity();
                        return (entityKey !== null &&
                            contentState.getEntity(entityKey).getType() === 'LINK');
                    }, callback);
                },
                component: Link
            }],
        initialize: function (_a) {
            var getEditorState = _a.getEditorState, setEditorState = _a.setEditorState;
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
        },
        LinkComponent: decorate_component_with_props_1.default(index_1.LinkComponent, toolbarProps),
    };
};
//# sourceMappingURL=index.js.map