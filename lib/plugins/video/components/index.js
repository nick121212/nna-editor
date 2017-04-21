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
        return (React.createElement(antd_1.Form, { layout: "inline", onSubmit: this.onSubmit.bind(this) },
            React.createElement(antd_1.Form.Item, null, getFieldDecorator('link', {
                initialValue: "",
                rules: [{
                        type: 'url', message: '格式不正确!',
                    }, {
                        required: true, message: '链接必填!',
                    }],
            })(React.createElement(antd_1.Input, { style: { width: 200 }, placeholder: "链接" }))),
            React.createElement(antd_1.Form.Item, { style: { textAlign: "center" } },
                React.createElement(antd_1.Button, { size: "small", type: "ghost", shape: "circle", htmlType: "submit" },
                    React.createElement(antd_1.Icon, { type: "check" })))));
    };
    return LinkForm;
}(React.Component));
var LinkWrapperForm = antd_1.Form.create()(LinkForm);
var VideoComponent = (function (_super) {
    __extends(VideoComponent, _super);
    function VideoComponent(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleVisibleChange = function (visible) {
            _this.setState({ isVisible: visible });
        };
        return _this;
    }
    VideoComponent.prototype.handleData = function (data) {
        var _a = this.props, store = _a.store, addVideo = _a.addVideo;
        var editorState = store.getEditorState();
        var urlType = 'video';
        var contentState = editorState.getCurrentContent();
        var contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { src: data.link });
        var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        var newEditorState = draft_js_1.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        store.setEditorState(newEditorState);
        this.handleVisibleChange(false);
    };
    VideoComponent.prototype.render = function () {
        var _a = this.props, store = _a.store, videoButtons = _a.videoButtons;
        var _b = (this.state || {}).isVisible, isVisible = _b === void 0 ? false : _b;
        var VideoButton = videoButtons.get("video");
        var editorContent = store.getEditorState();
        var entityKey = draftjs_utils_1.getSelectionEntity(editorContent);
        var text = draftjs_utils_1.getSelectionText(editorContent);
        var linkForm = React.createElement(LinkWrapperForm, { key: Date.now(), store: store, data: {}, onSubmit: this.handleData.bind(this) });
        return (React.createElement("span", null,
            React.createElement(antd_1.Popover, { content: linkForm, visible: isVisible, trigger: "click", onVisibleChange: this.handleVisibleChange.bind(this), placement: "bottomLeft" },
                React.createElement(VideoButton, { size: "small", onClick: this.handleVisibleChange.bind(this, true), store: store }))));
    };
    return VideoComponent;
}(React.Component));
exports.VideoComponent = VideoComponent;
//# sourceMappingURL=index.js.map