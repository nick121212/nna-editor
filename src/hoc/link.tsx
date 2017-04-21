import * as React from 'react';
import { RichUtils, EditorState } from 'draft-js';

/**
 * 包装inline样式的组件
 * @param Component                    {React.Component<any,any>} 需要包装的组件
 * @param settings.theme.wrapper       {string}                   包裹容器的样式
 *        settings.type                {number}                   0:undo,1:redo
 * @return                             {React.Component<any,any>} 
 */
export const LinkHoc = (Component, { theme, type = 0, children }: { theme: { wrapper?: string }, children?: JSX.Element, type: number }) : React.ComponentClass<any>=> {
    return class Hoc extends React.Component<any, any> {

        constructor(props, content) {
            super(props, content);
        }

        /**
         * 取消默认事件
         * @param event 
         */
        preventBubblingUp(event: React.MouseEvent<any>) {
            event.preventDefault();
        }

        /**
         * 描绘
         */
        render() {
            const { store, ...extra } = this.props;
            const props = {
                
            };

            return (
                <span className={theme.wrapper}>
                    <Component {...extra} {...props}>{this.props.children || children}</Component>
                </span>
            );
        }
    }
}