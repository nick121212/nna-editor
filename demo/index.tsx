import * as React from 'react';
import { render } from 'react-dom';
import { ContentState } from 'draft-js';

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
        toolbars.get("daving")
    ];
}

function onChangeEditorState(editorState){
    console.log();
}

render(
    <div>
        <NnaEditor getToolbar={getToolbar} onChangeEditorState={onChangeEditorState} contentState={ContentState.createFromText(``)} plugins={plugins} pluginComponents={pluginComponents} getBlockStyle={getBlockStyle} />
    </div>,
    document.getElementById('root'),
    () => { }
);