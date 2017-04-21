"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var antd_1 = require("antd");
var Image = (function (_super) {
    __extends(Image, _super);
    function Image(props, content) {
        return _super.call(this, props, content) || this;
    }
    Image.prototype.onProcessChanged = function (process) {
        this.setState({
            process: process
        });
    };
    Image.prototype.componentWillMount = function () {
        var _this = this;
        var _a = this.props, store = _a.store, contentState = _a.contentState, selection = _a.selection, block = _a.block, entityKey = _a.entityKey, Upload = _a.Upload;
        var file = contentState.getEntity(entityKey).getData();
        if (!file.download && !file.downloading) {
            file.downloading = true;
            this.props.store.subscribeToItem('process', this.onProcessChanged.bind(this));
            Upload(file, store).then(function (src) {
                file.src = src;
                file.download = true;
                _this.props.store.unsubscribeFromItem('process', _this.onProcessChanged.bind(_this));
                _this.setState({
                    file: file
                });
            });
        }
        this.setState({
            file: file
        });
    };
    Image.prototype.render = function () {
        var _a = this.state || {}, _b = _a.file, file = _b === void 0 ? { downloading: true, name: "", download: true, src: "" } : _b, _c = _a.process, process = _c === void 0 ? 0 : _c;
        if (file.download) {
            return (React.createElement("div", null,
                React.createElement("img", { src: file.src, role: "presentation" })));
        }
        else {
            return (React.createElement("div", null,
                React.createElement(antd_1.Progress, { percent: process, status: "active" })));
        }
    };
    return Image;
}(React.Component));
exports.Image = Image;
//# sourceMappingURL=image.js.map