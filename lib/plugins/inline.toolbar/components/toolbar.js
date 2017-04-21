"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var draft_js_1 = require("draft-js");
var antd_1 = require("antd");
var toolbarHeight = 60;
var getRelativeParent = function (element) {
    if (!element) {
        return null;
    }
    var position = window.getComputedStyle(element).getPropertyValue('position');
    if (position !== 'static') {
        return element;
    }
    return getRelativeParent(element.parentElement);
};
var ToolbarComponent = (function (_super) {
    __extends(ToolbarComponent, _super);
    function ToolbarComponent(props, context) {
        return _super.call(this, props, context) || this;
    }
    ToolbarComponent.prototype.componentWillMount = function () {
        this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged.bind(this));
    };
    ToolbarComponent.prototype.componentWillUnmount = function () {
        this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged.bind(this));
    };
    ToolbarComponent.prototype.onVisibilityChanged = function (isVisible) {
        var _this = this;
        setTimeout(function () {
            var position = {};
            var isBottom = true;
            if (isVisible) {
                var relativeParent = getRelativeParent(_this.toolbar.parentElement);
                var relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : document.body.getBoundingClientRect();
                var selectionRect = draft_js_1.getVisibleSelectionRect(window);
                var top_1 = 0;
                if (window.innerHeight - toolbarHeight > (selectionRect.top - relativeRect.top) + selectionRect.height) {
                    top_1 = (selectionRect.top - relativeRect.top) + selectionRect.height;
                }
                else {
                    top_1 = (selectionRect.top - relativeRect.top) - selectionRect.height / 2;
                    isBottom = false;
                }
                position = {
                    position: "absolute",
                    top: top_1,
                    left: (selectionRect.left - relativeRect.left) + (selectionRect.width / 2),
                    transform: 'translate(-50%) scale(1)',
                    transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
                };
            }
            else {
                position = { transform: 'translate(-50%) scale(0)' };
            }
            _this.setState({ position: position, isBottom: isBottom, isVisible: isVisible });
        }, 100);
    };
    ToolbarComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, theme = _a.theme, store = _a.store;
        var _b = this.state || {}, _c = _b.position, position = _c === void 0 ? {} : _c, _d = _b.isVisible, isVisible = _d === void 0 ? false : _d, _e = _b.isBottom, isBottom = _e === void 0 ? true : _e;
        return (React.createElement("div", { style: position, ref: function (toolbar) { _this.toolbar = toolbar; } },
            React.createElement(antd_1.Popover, { content: this.props.structure.map(function (Component, index) { return (React.createElement(Component, { key: index, store: store })); }), placement: isBottom ? "bottom" : "top", visible: isVisible })));
    };
    return ToolbarComponent;
}(React.Component));
exports.ToolbarComponent = ToolbarComponent;
//# sourceMappingURL=toolbar.js.map