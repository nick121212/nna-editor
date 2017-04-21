"use strict";
var React = require("react");
var YOUTUBE_PREFIX = 'https://www.youtube.com/embed/';
var VIMEO_PREFIX = 'https://player.vimeo.com/video/';
var iframeStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
};
var iframeContainer = {
    width: "100%",
    position: "relative",
};
var invalidVideoSrc = {
    textAlign: "center",
    backgroundColor: "#eaeaea",
    padding: "1em"
};
var youkuFix = /v.youku.com\/(.*?)\/id_(.*?)\.html/i;
var tencentFix = /qq.com/i;
var getSrc = function (src) {
    if (youkuFix.test(src)) {
        var regexId = /id_(.*?).html/i;
        var id = src.match(regexId);
        id = id.pop();
        return (React.createElement("iframe", { height: "498", width: "510", src: "http://player.youku.com/embed/" + id }));
    }
    if (tencentFix.test(src)) {
        var regexId = /(.+)(\/)(.*?)\.html/i;
        var id = src.match(regexId);
        id = id.pop();
        return (React.createElement("iframe", { width: "640", height: "498", src: "https://v.qq.com/iframe/player.html?vid=" + id + "&tiny=0&auto=0" }));
    }
    return React.createElement("video", { controls: true, src: src });
};
exports.Video = function (props) {
    var blockProps = props.blockProps, style = props.style, contentState = props.contentState, entityKey = props.entityKey;
    var src = contentState.getEntity(entityKey).getData().src;
    return (React.createElement("div", { style: style },
        React.createElement("div", { style: iframeContainer }, getSrc(src))));
};
//# sourceMappingURL=video.js.map