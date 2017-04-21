import * as React from 'react';
import { RichUtils } from 'draft-js';

/**
 * 包装inline样式的组件
 * @param Component                    {React.Component<any,any>} 需要包装的组件
 * @param settings.theme.wrapper       {string}                   包裹容器的样式
 *        settings.style               {string}                   draft中的样式，Bold、Italic
 *        settings.activeConvert       {function}                 如何控制选中样式
 * @return                             {React.Component<any,any>} 
 */
export const InlineStyleHoc = (Component: any, { theme, style, activeConvert, children }: { theme: { wrapper?: string }, style: string, children?: JSX.Element, activeConvert?: (active: boolean) => {} }) : React.ComponentClass<any>=> {
    return class Hoc extends React.Component<any, any> {

        constructor(props, content) {
            super(props, content);
        }
        /**
         * 单选样式
         */
        toggleStyle = (event: React.MouseEvent<any>) => {
            this.preventBubblingUp(event);
            this.props.store.setEditorState(
                RichUtils.toggleInlineStyle(
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
         * 判断当前inline中的样式是否被选中
         */
        styleIsActive() {
            if (!this.props.store.getEditorState) {
                return false;
            }

            return this.props.store.getEditorState().getCurrentInlineStyle().has(style);
        }

        /**
         * 描绘
         */
        render() {
            const { store, ...extra } = this.props;
            const props = Object.assign({}, extra, { onClick: this.toggleStyle.bind(this) }, activeConvert ? activeConvert(this.styleIsActive()) : {});

            return (
                <span className={theme.wrapper}
                    onMouseDown={this.preventBubblingUp}>
                    <Component {...props}>{props.children || children}</Component>
                </span>
            );
        }
    }
}