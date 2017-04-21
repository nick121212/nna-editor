"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
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
                _this.props.onSubmit(false, values);
            }
        });
    };
    LinkForm.prototype.onChangeFile = function (files) {
        this.props.onSubmit(true, files);
    };
    LinkForm.prototype.render = function () {
        var _this = this;
        var form = this.props.form;
        var getFieldDecorator = this.props.form.getFieldDecorator;
        var data = this.props.data;
        var props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            multiple: false,
            accept: "image/*",
            beforeUpload: function (file, filelist) {
                _this.onChangeFile(filelist);
                return false;
            }
        };
        return (React.createElement(antd_1.Tabs, null,
            React.createElement(antd_1.Tabs.TabPane, { tab: "网络图片", key: "1" },
                React.createElement(antd_1.Form, { layout: "inline", onSubmit: this.onSubmit.bind(this) },
                    React.createElement(antd_1.Form.Item, null, getFieldDecorator('link', {
                        initialValue: data.link || "",
                        rules: [{
                                type: 'url', message: '格式不正确!',
                            }, {
                                required: true, message: '链接必填!',
                            }],
                    })(React.createElement(antd_1.Input, { style: { width: 200 }, placeholder: "链接" }))),
                    React.createElement(antd_1.Form.Item, { style: { textAlign: "center" } },
                        React.createElement(antd_1.Button, { size: "small", type: "ghost", shape: "circle", htmlType: "submit" },
                            React.createElement(antd_1.Icon, { type: "check" }))))),
            React.createElement(antd_1.Tabs.TabPane, { tab: "本地上传", key: "2" },
                React.createElement("div", { style: { marginTop: 16, height: 180 } },
                    React.createElement(antd_1.Upload.Dragger, __assign({}, props),
                        React.createElement("p", { className: "ant-upload-drag-icon" },
                            React.createElement(antd_1.Icon, { type: "inbox" })),
                        React.createElement("p", { className: "ant-upload-text" }, "Click or drag file to this area to upload"),
                        React.createElement("p", { className: "ant-upload-hint" }, "Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files"))))));
    };
    return LinkForm;
}(React.Component));
var LinkWrapperForm = antd_1.Form.create()(LinkForm);
var ImageComponent = (function (_super) {
    __extends(ImageComponent, _super);
    function ImageComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleVisibleChange = function (visible) {
            _this.setState({ isVisible: visible });
        };
        return _this;
    }
    ImageComponent.prototype.addLink = function (files, data) {
        var store = this.props.store;
        if (files) {
            setTimeout(function () { return utils_1.mutiInsert(store, data); }, 100);
        }
        else {
            utils_1.toggleLink(store, Object.assign({}, data, { download: true }));
        }
        this.handleVisibleChange(false);
    };
    ImageComponent.prototype.render = function () {
        var _a = this.props, store = _a.store, linkButtons = _a.linkButtons;
        var _b = (this.state || {}).isVisible, isVisible = _b === void 0 ? false : _b;
        var LinkButton = linkButtons.get("image");
        var editorContent = store.getEditorState();
        var entityKey = draftjs_utils_1.getSelectionEntity(editorContent);
        var text = draftjs_utils_1.getSelectionText(editorContent);
        var linkForm = React.createElement(LinkWrapperForm, { key: Date.now(), store: store, data: { title: text, link: "" }, onSubmit: this.addLink.bind(this) });
        return (React.createElement("span", null,
            React.createElement(antd_1.Popover, { content: linkForm, visible: isVisible, trigger: "click", onVisibleChange: this.handleVisibleChange.bind(this), placement: "bottomLeft" },
                React.createElement(LinkButton, { size: "small", onClick: this.handleVisibleChange.bind(this, true), store: store }))));
    };
    return ImageComponent;
}(React.Component));
exports.ImageComponent = ImageComponent;
//# sourceMappingURL=index.js.map