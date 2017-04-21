import * as React from 'react';
import { getVisibleSelectionRect, Entity, RichUtils, Modifier, EditorState, AtomicBlockUtils } from 'draft-js';
import { Popover, Button, Form, Input, Icon } from 'antd';
import { getSelectionText, getSelectionEntity, addLineBreakRemovingSelection } from 'draftjs-utils';

export interface IProps {
    theme: any;
    addVideo: Function;
    videoButtons: Map<string, new () => React.Component<any, any>>;
    store: {
        subscribeToItem: (key: string, callback: Function) => void;
        unsubscribeFromItem: (key: string, callback: Function) => void;
        getItem: (key: string) => any;
        getEditorState: Function;
        setEditorState: Function;
    };
}

export interface IState {
    isVisible: boolean;
}


interface ILinkFormProps {
    form: any;
    store: any;
    data: any;
    onSubmit: (data) => void;
}

class LinkForm extends React.Component<ILinkFormProps, any>{
    constructor(props, context) {
        super(props, context);
    }

    onSubmit(e: React.MouseEvent<any>) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;

        return (
            <Form layout="inline" onSubmit={this.onSubmit.bind(this)}>
                <Form.Item>
                    {getFieldDecorator('link', {
                        initialValue: "",
                        rules: [{
                            type: 'url', message: '格式不正确!',
                        }, {
                            required: true, message: '链接必填!',
                        }],
                    })(
                        <Input style={{ width: 200 }} placeholder="链接" />
                        )}
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                    <Button size="small" type="ghost" shape="circle" htmlType="submit">
                        <Icon type="check" />
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const LinkWrapperForm = Form.create()(LinkForm);

export class VideoComponent extends React.Component<IProps, IState>{
    constructor(props, context) {
        super(props, context);
    }

    handleData(data) {
        const { store, addVideo } = this.props;
        const editorState = store.getEditorState();

        const urlType = 'video';
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(urlType, 'IMMUTABLE', { src: data.link });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            ' '
        );

        store.setEditorState(newEditorState);

        this.handleVisibleChange(false);
    }

    handleVisibleChange = (visible) => {
        this.setState({ isVisible: visible });
    }

    render() {
        const { store, videoButtons } = this.props;
        const { isVisible = false } = this.state || {};
        const VideoButton = videoButtons.get("video");
        const editorContent = store.getEditorState();
        const entityKey = getSelectionEntity(editorContent);
        const text = getSelectionText(editorContent);
        let linkForm = <LinkWrapperForm key={Date.now()} store={store} data={{}} onSubmit={this.handleData.bind(this)}></LinkWrapperForm>;

        return (
            <span>
                <Popover
                    content={linkForm}
                    visible={isVisible}
                    trigger="click"
                    onVisibleChange={this.handleVisibleChange.bind(this)}
                    placement="bottomLeft">
                    <VideoButton size="small" onClick={this.handleVisibleChange.bind(this, true)} store={store} />
                </Popover>
            </span>
        );
    }

}