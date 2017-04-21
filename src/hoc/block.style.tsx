import * as React from 'react';
import { RichUtils } from 'draft-js';

/**
 * 包装inline样式的组件
 * @param Component                    {React.Component<any,any>} 需要包装的组件
 * @param settings.theme.wrapper       {string}                   包裹容器的样式
 *        settings.style               {string}                   draft中的样式，无序，有序列表
 *        settings.activeConvert       {function}                 如何控制选中样式
 * @return                             {React.Component<any,any>} 
 */
export const BlockStyleHoc = (Component: any, { theme, children, style, activeConvert }: { theme: { wrapper?: string }, children?: JSX.Element, style: string, activeConvert?: (active: boolean) => {} }): React.ComponentClass<any> => {
    return class Hoc extends React.Component<any, any> {
        constructor(props, content) {
            super(props, content);
        }
        /**
         * 单选样式
         */
        toggleStyle = (event: React.MouseEvent<any>) => {
            const { store } = this.props;

            this.preventBubblingUp(event);
            store.setEditorState(
                RichUtils.toggleBlockType(
                    this.props.store.getEditorState(),
                    style
                ));
        }

        /**
         * 取消默认事件
         * @param event 
         */
        preventBubblingUp(event: React.MouseEvent<any>) {
            event.preventDefault();
        }

        /**
         * 判断当前type是否选中
         */
        blockTypeIsActive() {
            const { store } = this.props;

            if (!store.getEditorState) {
                return false;
            }

            const editorState = store.getEditorState();
            const type = editorState
                .getCurrentContent()
                .getBlockForKey(editorState.getSelection().getStartKey())
                .getType();

            return type === style;
        }

        /**
         * 描绘
         */
        render() {
            const { store, ...extra } = this.props;
            const props = Object.assign({}, extra, { onClick: this.toggleStyle.bind(this) }, activeConvert ? activeConvert(this.blockTypeIsActive()) : {});

            return (
                <span className={theme.wrapper}
                    onMouseDown={this.preventBubblingUp}>
                    <Component {...props}>{this.props.children || children}</Component>
                </span>
            );
        }
    }
}