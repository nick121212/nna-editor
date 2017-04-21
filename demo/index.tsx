import * as React from 'react';
import { render } from 'react-dom';
import { ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { NnaEditor } from '../src/index';
import createToolbar from '../src/toolbar';
import createPlugins from "../src/plugins";


let { getToolbars, plugins, pluginComponents, getBlockStyle } = createToolbar(createPlugins({
    image: {
        upload: (file, store) => {
            let timeid = 0, process = 0;

            return new Promise((resolve, reject) => {
                timeid = setInterval(() => {
                    if (process >= 100) {
                        clearInterval(timeid);
                        return resolve("http://img.blog.csdn.net/20160703034722480");
                    }
                    store.updateItem('process', process++);
                }, 30);
            });
        }
    }
}));

const getToolbar = () => {
    let toolbars = getToolbars();

    return [
        toolbars.get("bold"),
        toolbars.get("italic"),
        toolbars.get("underline"),
        toolbars.get("code"),
        toolbars.get("head"),
        toolbars.get("redo"),
        toolbars.get("undo"),
        toolbars.get("blockquote"),
        toolbars.get("ul"),
        toolbars.get("ol"),
        toolbars.get("codeblock"),
        toolbars.get("align-justify"),
        toolbars.get("align-left"),
        toolbars.get("align-center"),
        toolbars.get("align-right"),
        toolbars.get("link"),
        toolbars.get("image"),
        toolbars.get("video"),
        toolbars.get("saving")
    ];
}

function onChangeEditorState(editorState) {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState, {
        trigger: '#',
        separator: ' ',
    }, true, (a, b, c) => {
        if (a.type === "image") {
            let file = a.data;

            return `<p><img src="${file.src}" /></p>`;
        }
        if (a.type === "video") {
            let data = a.data;

            const getSrc = (src) => {
                const youkuFix = /v.youku.com\/(.*?)\/id_(.*?)\.html/i;
                const tencentFix = /qq.com/i;

                if (youkuFix.test(src)) {
                    let regexId = /id_(.*?).html/i;
                    let id = src.match(regexId);

                    id = id.pop();

                    return `
                       <p><iframe height="498" width="510" src="http://player.youku.com/embed/${id}"></iframe></p>
                    `;
                }
                if (tencentFix.test(src)) {
                    let regexId = /(.+)(\/)(.*?)\.html/i;
                    let id = src.match(regexId);

                    id = id.pop();

                    return `
                        <p><iframe width="640" height="498" src="https://v.qq.com/iframe/player.html?vid=${id}&tiny=0&auto=0"></iframe></p>
                    `;
                }

                return `<p><video controls src="${src}" /></p>`;
            }

            return getSrc(data.src);
        }
    });

    console.log(markup);
}

render(
    <div>
        <NnaEditor getToolbar={getToolbar} onChangeEditorState={onChangeEditorState} contentState={ContentState.createFromText(``)} plugins={plugins} pluginComponents={pluginComponents} getBlockStyle={getBlockStyle} />
    </div>,
    document.getElementById('root'),
    () => { }
);