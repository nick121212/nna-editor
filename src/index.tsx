import * as React from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw, RichUtils, CompositeDecorator, ContentState } from 'draft-js';

import * as styles from './style.scss';

export interface IProps {
    getBlockStyle: Function;
    plugins: Array<any>;
    pluginComponents: Array<JSX.Element>;
    getToolbar: () => Array<JSX.Element>;
    contentState: ContentState;
    onChangeEditorState?: (editorState: EditorState) => void;
}

export class NnaEditor extends React.Component<IProps, any>{
    private editor: Editor;

    constructor(props, content) {
        super(props, content);
    }

    componentWillMount() {
        const { contentState } = this.props;

        this.state = {
            editorState: EditorState.createWithContent(contentState, new CompositeDecorator([]))
        };
    }

    focus() {
        this.editor.focus();
    }

    onChange(editorState) {
        setTimeout(() => {
            this.setState({ editorState })
            if (this.props.onChangeEditorState) {
                this.props.onChangeEditorState(editorState)
            }
        }, 10);
    }

    logState() {
        const content = this.state.editorState.getCurrentContent();
        console.log(convertToRaw(content));
    }

    handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return true;
        }

        return false;
    }

    render() {
        const { getBlockStyle, plugins, pluginComponents, getToolbar } = this.props;

        return (
            <div className={styles["nna-editor"]}>
                <div onClick={this.focus.bind(this)} className={styles["nna-editor-main"]}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        handleKeyCommand={this.handleKeyCommand.bind(this)}
                        editorState={this.state.editorState}
                        onChange={this.onChange.bind(this)}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }} />
                    {pluginComponents}
                </div>
                <div className={styles["nna-editor-toolbar"] + " nna-button"}>
                    {getToolbar()}
                </div>
            </div>
        );
    }

}