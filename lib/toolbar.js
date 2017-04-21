"use strict";
var React = require("react");
var antd_1 = require("antd");
var map_1 = require("./plugins/map");
var react_fa_1 = require("react-fa");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var store = _a.store, plugins = _a.plugins, EmojiSuggestions = _a.EmojiSuggestions, InlineToolbar = _a.InlineToolbar, LinkComponent = _a.LinkComponent, VideoComponent = _a.VideoComponent, ImageComponent = _a.ImageComponent, SavingComponent = _a.SavingComponent, decorators = _a.decorators;
    var getToolbars = function () {
        var toolbars = new Map();
        map_1.inlineComponents(antd_1.Button).forEach(function (Component, key) {
            toolbars.set(key, React.createElement(Component, { size: "small", store: store, key: key }));
        });
        map_1.blockComponents(antd_1.Button).forEach(function (Component, key) {
            toolbars.set(key, React.createElement(Component, { size: "small", store: store, key: key }));
        });
        map_1.blockAlignmentComponents(antd_1.Button).forEach(function (Component, key) {
            toolbars.set(key, React.createElement(Component, { size: "small", store: store, key: key }));
        });
        map_1.blockHComponents(antd_1.Button).forEach(function (Component, key) {
            toolbars.set(key, React.createElement(Component, { size: "small", store: store, key: key }));
        });
        map_1.redoUndoComponents(antd_1.Button).forEach(function (Component, key) {
            toolbars.set(key, React.createElement(Component, { size: "small", store: store, key: key }));
        });
        var headComponents = function () {
            var components = [];
            for (var i = 1; i <= 6; i++) {
                var Component = toolbars.get("h" + i);
                components.push(React.createElement(antd_1.Menu.Item, { key: "h" + i }, Component));
            }
            return React.createElement(antd_1.Menu, null, components);
        };
        var components = headComponents();
        toolbars.set("head", React.createElement(antd_1.Dropdown, { overlay: components, placement: "bottomLeft" },
            React.createElement(antd_1.Button, { size: "small" },
                React.createElement(react_fa_1.Icon, { name: "header" }),
                React.createElement(antd_1.Badge, { count: 0, status: "warning" }))));
        toolbars.set("link", React.createElement(LinkComponent, null));
        toolbars.set("video", React.createElement(VideoComponent, null));
        toolbars.set("image", React.createElement(ImageComponent, null));
        toolbars.set("saving", React.createElement(SavingComponent, null));
        return toolbars;
    };
    var pluginComponents = [React.createElement(EmojiSuggestions, null), React.createElement(InlineToolbar, null)];
    var getBlockStyle = function (block) {
        var blockAlignment = block.getData() && block.getData().get('text-align');
        var styles = [];
        if (blockAlignment) {
            styles.push("nna-" + blockAlignment + "-aligned-block");
        }
        switch (block.getType()) {
            case 'blockquote':
                styles.push('nna-blockquote');
                break;
        }
        return styles.join(' ');
    };
    return { getToolbars: getToolbars, plugins: plugins, pluginComponents: pluginComponents, getBlockStyle: getBlockStyle };
};
//# sourceMappingURL=toolbar.js.map