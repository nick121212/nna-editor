import * as React from 'react';
import { RichUtils, Modifier, EditorState } from 'draft-js';
import { setBlockData, getSelectedBlock, getSelectedBlocksMetadata, getSelectedBlocksType, getSelectionEntity } from 'draftjs-utils';
/**
 * 包装alignment样式的组件
 * @param Component                    {React.Component<any,any>} 需要包装的组件
 * @param settings.theme.wrapper       {string}                   包裹容器的样式
 *        settings.alignment               {string}                   draft中的排列样式，align，default，left，right
 *        settings.activeConvert       {function}                 如何控制选中样式
 * @return                             {React.Component<any,any>} 
 */
export const TextAlignmentHoc = (Component: any, { theme, alignment, activeConvert, children }: { theme: { wrapper?: string }, alignment: string, children?: JSX.Element, activeConvert?: (active: boolean) => {} }) : React.ComponentClass<any>=> {
    return class Hoc extends React.Component<any, any> {

        constructor(props, content) {
            super(props, content);
        }

        /**
         * 设置排列
         * @param event 
         */
        activate(event: React.MouseEvent<any>): void {
            let editorState = this.props.store.getEditorState();

            this.preventBubblingUp(event);

            // console.log(getSelectedBlock(editorState));
            // console.log(getSelectionEntity(editorState));

            this.props.store.setEditorState(
                setBlockData(editorState, { 'text-align': alignment })
            );
        }

        /**
         * 阻止默认事件
         * @param event 
         */
        preventBubblingUp(event: React.MouseEvent<any>): void {
            event.preventDefault();
        }

        /**
         * 判断是否选中
         */
        isActive() {
            let editorState = this.props.store.getEditorState();
            let block = getSelectedBlock(editorState);
            let data = block.getData() || new Map();

            return data.get("text-align") === alignment;
        }

        /**
         * 描绘
         */
        render() {
            const { store, ...extra } = this.props;
            const props = Object.assign({}, extra, { onClick: this.activate.bind(this) }, activeConvert ? activeConvert(this.isActive()) : {});

            return (
                <span
                    className={theme.wrapper}
                    onMouseDown={this.preventBubblingUp}>
                    <Component {...props}>{props.children || children}</Component>
                </span>
            );
        }
    }
}