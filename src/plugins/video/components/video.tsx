import * as React from 'react';

const YOUTUBE_PREFIX = 'https://www.youtube.com/embed/';
const VIMEO_PREFIX = 'https://player.vimeo.com/video/';
const iframeStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
};
const iframeContainer = {
    width: "100%",
    // height: 0,
    position: "relative",
    // paddingBottom: "56.25%"
}

const invalidVideoSrc = {
    textAlign: "center",
    backgroundColor: "#eaeaea",
    padding: "1em"
}

const youkuFix = /v.youku.com\/(.*?)\/id_(.*?)\.html/i;
const tencentFix = /qq.com/i;
const getSrc = (src) => {
    if (youkuFix.test(src)) {
        let regexId = /id_(.*?).html/i;
        let id = src.match(regexId);

        id = id.pop();

        return (
            <iframe height="498" width="510" src={`http://player.youku.com/embed/${id}`}></iframe>
        );
    }
    if (tencentFix.test(src)) {
        let regexId = /(.+)(\/)(.*?)\.html/i;
        let id = src.match(regexId);

        id = id.pop();

        return (
            <iframe width="640" height="498" src={`https://v.qq.com/iframe/player.html?vid=${id}&tiny=0&auto=0`}></iframe>
        );
    }

    return <video controls src={src} />;
}

export const Video = (props) => {
    const { blockProps, style, contentState, entityKey } = props;
    const { src } = contentState.getEntity(entityKey).getData();

    return (
        <div style={style} >
            <div style={iframeContainer} >
                {getSrc(src)}
            </div>
        </div>
    );
}