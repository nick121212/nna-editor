import * as React from 'react';
import { Button, Dropdown, Menu, Badge } from 'antd';

import { inlineComponents, blockComponents, redoUndoComponents, blockHComponents, blockAlignmentComponents } from './plugins/map';
// import createPlugins from "./plugins";
import { Icon } from 'react-fa';

export default ({store, plugins, EmojiSuggestions, InlineToolbar, LinkComponent, VideoComponent, ImageComponent, SavingComponent, decorators}) => {
    // const { store, plugins, EmojiSuggestions, InlineToolbar, LinkComponent, VideoComponent, ImageComponent, SavingComponent, decorators } = createPlugins();
    const getToolbars = () => {
        const toolbars = new Map();
        inlineComponents(Button).forEach((Component, key) => {
            toolbars.set(key, <Component size="small" store={store} key={key} />);
        });
        blockComponents(Button).forEach((Component, key) => {
            toolbars.set(key, <Component size="small" store={store} key={key} />);
        });
        blockAlignmentComponents(Button).forEach((Component, key) => {
            toolbars.set(key, <Component size="small" store={store} key={key} />);
        });
        blockHComponents(Button).forEach((Component, key) => {
            toolbars.set(key, <Component size="small" store={store} key={key} />);
        })
        redoUndoComponents(Button).forEach((Component, key) => {
            toolbars.set(key, <Component size="small" store={store} key={key} />);
        });

        const headComponents = () => {
            let components = [];

            for (let i = 1; i <= 6; i++) {
                let Component = toolbars.get("h" + i);

                components.push(
                    <Menu.Item key={"h" + i}>
                        {Component}
                    </Menu.Item>
                );
            }

            return <Menu>
                {components}
            </Menu>;
        }

        const components = headComponents();
        toolbars.set("head", <Dropdown overlay={components} placement="bottomLeft">
            <Button size="small">
                <Icon name="header" />
                <Badge count={0} status="warning" />
            </Button>
        </Dropdown>);

        toolbars.set("link", <LinkComponent />);
        toolbars.set("video", <VideoComponent />);
        toolbars.set("image", <ImageComponent />);
        toolbars.set("saving", <SavingComponent />);

        return toolbars;
    };
    const pluginComponents = [<EmojiSuggestions />, <InlineToolbar />];
    const getBlockStyle = (block) => {
        const blockAlignment = block.getData() && block.getData().get('text-align');
        const styles = [];

        if (blockAlignment) {
            styles.push(`nna-${blockAlignment}-aligned-block`);
        }

        switch (block.getType()) {
            case 'blockquote':
                styles.push('nna-blockquote');
                break;
        }

        return styles.join(' ');
    }

    return { getToolbars, plugins, pluginComponents, getBlockStyle };
}