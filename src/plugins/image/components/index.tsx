import * as React from 'react';
import { getVisibleSelectionRect, Entity, RichUtils, Modifier, EditorState, AtomicBlockUtils } from 'draft-js';
import { Popover, Button, Form, Input, Icon, Tabs, Upload } from 'antd';
import { getSelectionText, getSelectionEntity, addLineBreakRemovingSelection, getSelectedBlock } from 'draftjs-utils';
import { toggleLink, mutiInsert } from '../utils';

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
    onSubmit: (files, data) => void;
}

class LinkForm extends React.Component<ILinkFormProps, any>{
    constructor(props, context) {
        super(props, context);
    }

    onSubmit(e: React.MouseEvent<any>) {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit(false, values);
            }
        });
    }

    onChangeFile(files) {
        this.props.onSubmit(true, files);
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            multiple: false,
            accept: "image/*",
            beforeUpload: (file, filelist) => {
                this.onChangeFile(filelist);
                return false;
            }
        };
        return (
            <Tabs>
                <Tabs.TabPane tab="网络图片" key="1" style={{padding:5}}>
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
                        <Form.Item style={{ textAlign: "center" }}>
                            <Button size="small" type="ghost" shape="circle" htmlType="submit">
                                <Icon type="check" />
                            </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="本地上传" key="2">
                    <div style={{ marginTop: 16, height: 180 }}>
                        <Upload.Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                        </Upload.Dragger>
                    </div>
                </Tabs.TabPane>
            </Tabs>

        );
    }
}

const LinkWrapperForm = Form.create()(LinkForm);

export class ImageComponent extends React.Component<IProps, IState>{
    constructor(props, context) {
        super(props, context);
    }

    addLink(files, data) {
        const { store } = this.props;

        if (files) {
            setTimeout(() => mutiInsert(store, data), 100)
        } else {
            toggleLink(store, Object.assign({}, data, { download: true }));
        }
        this.handleVisibleChange(false);
    }

    handleVisibleChange = (visible) => {
        this.setState({ isVisible: visible });
    }

    render() {
        const { store, linkButtons } = this.props;
        const { isVisible = false } = this.state || {};
        const LinkButton = linkButtons.get("image");
        const editorContent = store.getEditorState();
        const entityKey = getSelectionEntity(editorContent);
        const text = getSelectionText(editorContent);
        let linkForm = <LinkWrapperForm key={Date.now()} store={store} data={{ title: text, link: "" }} onSubmit={this.addLink.bind(this)}></LinkWrapperForm>;

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
            </span>
        );
    }

}