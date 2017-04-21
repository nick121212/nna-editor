"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var draft_js_1 = require("draft-js");
var antd_1 = require("antd");
var draftjs_utils_1 = require("draftjs-utils");
var utils_1 = require("../utils");
var LinkForm = (function (_super) {
    __extends(LinkForm, _super);
    function LinkForm(props, context) {
        return _super.call(this, props, context) || this;
    }
    LinkForm.prototype.onSubmit = function (e) {
        var _this = this;
        e.preventDefault();
        this.props.form.validateFields(function (err, values) {
            if (!err) {
                _this.props.onSubmit(values);
            }
        });
    };
    LinkForm.prototype.render = function () {
        var form = this.props.form;
        var getFieldDecorator = this.props.form.getFieldDecorator;
        var data = this.props.data;
        console.log("render", data);
        return (React.createElement(antd_1.Form, { layout: "inline", onSubmit: this.onSubmit.bind(this) },
            React.createElement(antd_1.Form.Item, null, getFieldDecorator('link', {
                initialValue: data.link || "",
                rules: [{
                        type: 'url', message: '格式不正确!',
                    }, {
                        required: true, message: '链接必填!',
                    }],
            })(React.createElement(antd_1.Input, { style: { width: 200 }, placeholder: "链接" }))),
            React.createElement(antd_1.Form.Item, null, getFieldDecorator('title', {
                initialValue: data.title,
                rules: [{
                        required: true, message: '标题必填!',
                    }],
            })(React.createElement(antd_1.Input, { style: { width: 200 }, placeholder: "标题" }))),
            React.createElement(antd_1.Form.Item, { style: { textAlign: "center" } },
                React.createElement(antd_1.Button, { size: "small", type: "ghost", shape: "circle", htmlType: "submit" },
                    React.createElement(antd_1.Icon, { type: "check" })))));
    };
    return LinkForm;
}(React.Component));
var LinkWrapperForm = antd_1.Form.create()(LinkForm);
var LinkComponent = (function (_super) {
    __extends(LinkComponent, _super);
    function LinkComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleVisibleChange = function (visible) {
            _this.setState({ isVisible: visible });
        };
        return _this;
    }
    LinkComponent.prototype.addLink = function (data) {
        var store = this.props.store;
        utils_1.toggleLink(store, data);
        this.handleVisibleChange(false);
    };
    LinkComponent.prototype.removeLink = function (e) {
        var store = this.props.store;
        var editorState = store.getEditorState();
        store.setEditorState(draft_js_1.RichUtils.toggleLink(editorState, editorState.getSelection(), null));
        e.preventDefault();
    };
    LinkComponent.prototype.render = function () {
        var _a = this.props, store = _a.store, linkButtons = _a.linkButtons;
        var _b = (this.state || {}).isVisible, isVisible = _b === void 0 ? false : _b;
        var LinkButton = linkButtons.get("link");
        var UnLinkButton = linkButtons.get("unlink");
        var editorContent = store.getEditorState();
        var entityKey = draftjs_utils_1.getSelectionEntity(editorContent);
        var text = draftjs_utils_1.getSelectionText(editorContent);
        var linkForm = React.createElement(LinkWrapperForm, { key: Date.now(), store: store, data: { title: text, link: "http://www.baidu.com" }, onSubmit: this.addLink.bind(this) });
        return (React.createElement("span", null,
            React.createElement(antd_1.Popover, { content: linkForm, visible: isVisible, trigger: "click", onVisibleChange: this.handleVisibleChange.bind(this), placement: "bottomLeft" },
                React.createElement(LinkButton, { size: "small", onClick: this.handleVisibleChange.bind(this, true), store: store })),
            React.createElement(UnLinkButton, { size: "small", disabled: !!!text || !!!entityKey, onClick: this.removeLink.bind(this), store: store })));
    };
    return LinkComponent;
}(React.Component));
exports.LinkComponent = LinkComponent;
//# sourceMappingURL=index.js.map