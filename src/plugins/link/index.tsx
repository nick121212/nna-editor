import * as React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';

import { createStore } from '../utils';
import { linkComponents } from '../map';
import { LinkComponent } from './components/index';
import { Entity } from 'draft-js';
import { getSelectionEntity, getSelectionText } from 'draftjs-utils';
import * as linkifyIt from 'linkify-it';
import * as tlds from 'tlds';
import { toggleLink } from './utils';

const linkify = linkifyIt();
linkify.tlds(tlds);

const linkRegexp = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/i;

// Link 组件，读取 entity 中的 url，渲染链接
const Link = (props) => {
    const {
      decoratedText = '',
        theme = {},
        target = '_self',
        className,
        children,
        component,
        dir, // eslint-disable-line no-unused-vars
        entityKey, // eslint-disable-line no-unused-vars
        getEditorState, // eslint-disable-line no-unused-vars
        offsetKey, // eslint-disable-line no-unused-vars
        setEditorState, // eslint-disable-line no-unused-vars
        contentState, // eslint-disable-line no-unused-vars
        ...otherProps
    } = props;

    let data = entityKey ? contentState.getEntity(entityKey).getData() : { url: decoratedText };

    const newProps = {
        ...otherProps,
        href: data.url,
        target
    };

    return (
        <a target="_blank" {...newProps}>
            {children}
        </a>
    )
}

export default (Component, config = {}) => {
    const defaultTheme = {};
    const store = createStore({
        isVisible: false
    });
    const linkButtons = linkComponents(Component);

    const toolbarProps = {
        store,
        linkButtons,
        theme: defaultTheme
    };

    return {
        handlePastedText: (text, html, { getEditorState, setEditorState }) => {
            // const links = linkify.match(text);

            // if (typeof links !== 'undefined' && links !== null) {
            //     for (let i = 0; i < links.length; i += 1) {
            //         let link = links[i];

            //         toggleLink(store, { link: link.url, title: link.text, start: link.index, end: link.lastIndex });
            //     }

            //     return true;
            // }

            return false;
        },
        decorators: [{
            strategy: (contentBlock, callback, contentState) => {
                contentBlock.findEntityRanges(
                    (character) => {
                        const entityKey = character.getEntity();

                        return (
                            entityKey !== null &&
                            contentState.getEntity(entityKey).getType() === 'LINK'
                        );
                    },
                    callback
                );
            },
            component: Link
        }],
        initialize: ({ getEditorState, setEditorState }) => {
            store.getEditorState = getEditorState;
            store.setEditorState = setEditorState;
            store.updateItem('getEditorState', getEditorState);
            store.updateItem('setEditorState', setEditorState);
        },
        LinkComponent: decorateComponentWithProps(LinkComponent, toolbarProps),
    };
};