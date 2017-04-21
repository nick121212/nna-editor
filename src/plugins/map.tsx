import * as React from 'react';
import { UndoRedoHoc } from '../hoc/undoredo';
import { BlockStyleHoc } from '../hoc/block.style';
import { InlineStyleHoc } from "../hoc/inline.style";
import { Icon } from 'react-fa';
import { TextAlignmentHoc } from '../hoc/text.alignment';
import { LinkHoc } from '../hoc/link';

const INLINE_STYLES = [
    { key: "bold", label: 'Bold', style: 'BOLD', icon: 'bold' },
    { key: "italic", label: 'Italic', style: 'ITALIC', icon: 'italic' },
    { key: "underline", label: 'Underline', style: 'UNDERLINE', icon: 'underline' },
    { key: "code", label: 'Monospace', style: 'CODE', icon: 'font' },
];

const BLOCK_TYPES_H = [
    { key: "h1", label: 'H1', style: 'header-one', icon: 'header' },
    { key: "h2", label: 'H2', style: 'header-two', icon: 'header' },
    { key: "h3", label: 'H3', style: 'header-three', icon: 'header' },
    { key: "h4", label: 'H4', style: 'header-four', icon: 'header' },
    { key: "h5", label: 'H5', style: 'header-five', icon: 'header' },
    { key: "h6", label: 'H6', style: 'header-six', icon: 'header' },
];

const BLOCK_TYPES = [
    { key: "blockquote", label: 'Blockquote', style: 'blockquote', icon: 'quote-right' },
    { key: "ul", label: 'UL', style: 'unordered-list-item', icon: 'list-ul' },
    { key: "ol", label: 'OL', style: 'ordered-list-item', icon: 'list-ol' },
    { key: "codeblock", label: 'Code Block', style: 'code-block', icon: 'paragraph' },
];

const BLOCK_ALIGNMENT_TYPES = [
    { key: "align-justify", label: 'align-justify', alignment: 'default', icon: 'align-justify' },
    { key: "align-left", label: 'align-left', alignment: 'left', icon: 'align-left' },
    { key: "align-right", label: 'align-right', alignment: 'right', icon: 'align-right' },
    { key: "align-center", label: 'align-center', alignment: 'center', icon: 'align-center' }
];

const theme = {
    wrapper: "nna-button"
};

export const linkComponents = (Component): Map<string, new () => React.Component<any, any>> => {
    let buttons = new Map();

    buttons.set("link", LinkHoc(Component, {
        theme: theme,
        children: <Icon name="chain" />,
        type: 1
    }));
    buttons.set("unlink", LinkHoc(Component, {
        theme: theme,
        children: <Icon name="chain-broken" />,
        type: 0
    }));

    return buttons;
}

export const videoComponents = (Component): Map<string, new () => React.Component<any, any>> => {
    let buttons = new Map();

    buttons.set("video", LinkHoc(Component, {
        theme: theme,
        children: <Icon name="video-camera" />,
        type: 1
    }));

    return buttons;
}

export const ImageComponents = (Component): Map<string, new () => React.Component<any, any>> => {
    let buttons = new Map();

    buttons.set("image", LinkHoc(Component, {
        theme: theme,
        children: <Icon name="image" />,
        type: 1
    }));

    return buttons;
}

export const redoUndoComponents = (Component): Map<string, new () => React.Component<any, any>> => {
    let buttons = new Map();

    buttons.set("redo", UndoRedoHoc(Component, {
        theme: theme,
        children: <Icon name="repeat" />,
        type: 1
    }));
    buttons.set("undo", UndoRedoHoc(Component, {
        theme: theme,
        children: <Icon name="undo" />,
        type: 0
    }));

    return buttons;
}

export const inlineComponents = (Component): Map<string, new () => React.Component<any, any>> => {
    let inlineButtonMap = new Map();

    INLINE_STYLES.forEach((inline) => {
        inlineButtonMap.set(inline.key, InlineStyleHoc(Component, {
            theme: theme,
            style: inline.style,
            children: <Icon name={inline.icon} />,
            activeConvert: (active: boolean) => {
                return { "type": active ? "primary" : "" }
            }
        }));
    });

    return inlineButtonMap;
}

export const blockHComponents = (Component): Map<string, new () => React.Component<any, any>> => {
    let blockButtonMap = new Map();

    BLOCK_TYPES_H.forEach((inline) => {
        blockButtonMap.set(inline.key, BlockStyleHoc(Component, {
            theme: theme,
            style: inline.style,
            children: <span>{inline.label}</span>,
            activeConvert: (active: boolean) => {
                return { "type": active ? "primary" : "" }
            }
        }));
    });

    return blockButtonMap;
}

export const blockComponents = (Component): Map<string, new () => React.Component<any, any>> => {
    let blockButtonMap = new Map();

    BLOCK_TYPES.forEach((inline) => {
        blockButtonMap.set(inline.key, BlockStyleHoc(Component, {
            theme: theme,
            style: inline.style,
            children: <Icon name={inline.icon} />,
            activeConvert: (active: boolean) => {
                return { "type": active ? "primary" : "" }
            }
        }));
    });

    return blockButtonMap;
}

export const blockAlignmentComponents = (Component): Map<string, new () => React.Component<any, any>> => {
    let buttons = new Map();

    BLOCK_ALIGNMENT_TYPES.forEach((inline) => {
        buttons.set(inline.key, TextAlignmentHoc(Component, {
            theme: theme,
            alignment: inline.alignment,
            children: <Icon name={inline.icon} />,
            activeConvert: (active: boolean) => {
                return { "type": active ? "primary" : "" }
            }
        }));
    });

    return buttons;
}



export { INLINE_STYLES, BLOCK_TYPES, BLOCK_TYPES_H, BLOCK_ALIGNMENT_TYPES };