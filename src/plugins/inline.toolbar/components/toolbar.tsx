import * as React from 'react';
import { getVisibleSelectionRect } from 'draft-js';
import { Popover } from 'antd';

export interface IProps {
    theme: any;
    structure: Array<new () => React.Component<any, any>>;
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
    position: Object;
    isBottom: boolean;
}

const toolbarHeight = 60;

const getRelativeParent = (element) => {
    if (!element) {
        return null;
    }

    const position = window.getComputedStyle(element).getPropertyValue('position');
    if (position !== 'static') {
        return element;
    }

    return getRelativeParent(element.parentElement);
};

export class ToolbarComponent extends React.Component<IProps, IState>{
    private toolbar: any;

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged.bind(this));
    }

    componentWillUnmount() {
        this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged.bind(this));
    }

    onVisibilityChanged(isVisible) {
        setTimeout(() => {
            let position = {};
            let isBottom = true;

            if (isVisible) {
                const relativeParent = getRelativeParent(this.toolbar.parentElement);
                const relativeRect = relativeParent ? relativeParent.getBoundingClientRect() : document.body.getBoundingClientRect();
                const selectionRect = getVisibleSelectionRect(window);
                let top = 0;

                if (window.innerHeight - toolbarHeight > (selectionRect.top - relativeRect.top) + selectionRect.height) {
                    top = (selectionRect.top - relativeRect.top) + selectionRect.height;
                } else {
                    top = (selectionRect.top - relativeRect.top) - selectionRect.height / 2;
                    isBottom = false;
                }

                position = {
                    position: "absolute",
                    top: top,
                    left: (selectionRect.left - relativeRect.left) + (selectionRect.width / 2),
                    transform: 'translate(-50%) scale(1)',
                    transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
                };
            } else {
                position = { transform: 'translate(-50%) scale(0)' };
            }
            this.setState({ position, isBottom, isVisible });
        }, 100);
    }

    render() {
        const { theme, store } = this.props;
        const { position = {}, isVisible = false, isBottom = true } = this.state || {};

        return (
            <div style={position} ref={(toolbar) => { this.toolbar = toolbar; }}>
                <Popover
                    content={
                        this.props.structure.map((Component, index) => (
                            <Component
                                key={index}
                                store={store}
                            />
                        ))
                    }
                    placement={isBottom ? "bottom" : "top"}
                    visible={isVisible}>
                </Popover>
            </div>
        );
    }

}