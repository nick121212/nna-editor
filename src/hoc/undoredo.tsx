import * as React from 'react';
import { RichUtils, EditorState } from 'draft-js';

/**
 * 包装inline样式的组件
 * @param Component                    {React.Component<any,any>} 需要包装的组件
 * @param settings.theme.wrapper       {string}                   包裹容器的样式
 *        settings.type                {number}                   0:undo,1:redo
 * @return                             {React.Component<any,any>} 
 */
export const UndoRedoHoc = (Component, { theme, type = 0, children }: { theme: { wrapper?: string }, children?: JSX.Element, type: number }) : React.ComponentClass<any>=> {
    return class Hoc extends React.Component<any, any> {
        
        constructor(props, content) {
            super(props, content);
        }
        
        /**
         * 重做功能
         * @param e 
         */
        redo(e: React.MouseEvent<any>) {
            const { store } = this.props;

            this.preventBubblingUp(e);
            store.setEditorState(EditorState.redo(store.getEditorState()));
        }

        /**
         * 是否可以重做
         */
        canRedo(): boolean {
            const { store } = this.props;

            if (!store.getEditorState) {
                return false;
            }
            return store.getEditorState().getRedoStack().isEmpty();
        }

        /**
         * 撤销功能
         * @param e 
         */
        undo(e: Event) {
            const { store } = this.props;

            store.setEditorState(EditorState.undo(store.getEditorState()));
            e.preventDefault();
        }

        /**
         * 是否可以撤销
         */
        canUndo() {
            const { store } = this.props;

            if (!store.getEditorState) {
                return false;
            }
            return store.getEditorState().getUndoStack().isEmpty();
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
            let props = {};

            if (type == 0) {
                props = Object.assign({}, extra, { onClick: this.undo.bind(this), disabled: this.canUndo() });
            } else {
                props = Object.assign({}, extra, { onClick: this.redo.bind(this), disabled: this.canRedo() });
            }

            return (
                <span className={theme.wrapper}
                    onMouseDown={this.preventBubblingUp}>
                    <Component {...props}>{this.props.children || children}</Component>
                </span>
            );
        }
    }
}