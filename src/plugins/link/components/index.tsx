import * as React from 'react';
import { getVisibleSelectionRect, Entity, RichUtils, Modifier, EditorState, AtomicBlockUtils } from 'draft-js';
import { Popover, Button, Form, Input, Icon } from 'antd';
import { getSelectionText, getSelectionEntity, addLineBreakRemovingSelection, getSelectedBlock } from 'draftjs-utils';
import { toggleLink } from '../utils';

export interface IProps {
    theme: any;
    linkButtons: Map<string, new () => React.Component<any, any>>;
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


export interface ILinkFormProps {
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

        console.log("render", data);

        return (
            <Form layout="inline" onSubmit={this.onSubmit.bind(this)}>
                <Form.Item>
                    {getFieldDecorator('link', {
                        initialValue: data.link || "",
                        rules: [{
                            type: 'url', message: '格式不正确!',
                        }, {
                            required: true, message: '链接必填!',
                        }],
                    })(
                        <Input style={{ width: 200 }} placeholder="链接" />
                        )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('title', {
                        initialValue: data.title,
                        rules: [{
                            required: true, message: '标题必填!',
                        }],
                    })(
                        <Input style={{ width: 200 }} placeholder="标题" />
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

export class LinkComponent extends React.Component<IProps, IState>{
    constructor(props, context) {
        super(props, context);
    }

    addLink(data) {
        const { store } = this.props;

        toggleLink(store, data);
        this.handleVisibleChange(false);
    }

    removeLink(e: React.MouseEvent<any>) {
        const { store } = this.props;
        const editorState = store.getEditorState();

        store.setEditorState(RichUtils.toggleLink(editorState, editorState.getSelection(), null));
        e.preventDefault();
    }

    handleVisibleChange = (visible) => {
        this.setState({ isVisible: visible });
    }

    render() {
        const { store, linkButtons } = this.props;
        const { isVisible = false } = this.state || {};
        const LinkButton = linkButtons.get("link");
        const UnLinkButton = linkButtons.get("unlink");
        const editorContent = store.getEditorState();
        const entityKey = getSelectionEntity(editorContent);
        const text = getSelectionText(editorContent);
        let linkForm = <LinkWrapperForm key={Date.now()} store={store} data={{ title: text, link: "http://www.baidu.com" }} onSubmit={this.addLink.bind(this)}></LinkWrapperForm>;

        return (
            <span>
                <Popover
                    content={linkForm}
                    visible={isVisible}
                    trigger="click"
                    onVisibleChange={this.handleVisibleChange.bind(this)}
                    placement="bottomLeft">
                    <LinkButton size="small" onClick={this.handleVisibleChange.bind(this, true)} store={store} />
                </Popover>
                <UnLinkButton size="small" disabled={!!!text || !!!entityKey} onClick={this.removeLink.bind(this)} store={store} />
            </span>
        );
    }

}