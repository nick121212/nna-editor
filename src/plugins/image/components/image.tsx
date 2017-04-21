import * as React from 'react';
import { Progress, Input } from 'antd';

export class Image extends React.Component<any, any>{
    constructor(props, content) {
        super(props, content);
    }

    onProcessChanged(process) {
        this.setState({
            process: process
        });
    }

    componentWillMount() {
        const { store, contentState, selection, block, entityKey, Upload } = this.props;
        const file = contentState.getEntity(entityKey).getData();

        if (!file.download && !file.downloading) {
            file.downloading = true;

            this.props.store.subscribeToItem('process', this.onProcessChanged.bind(this));

            Upload(file, store).then((src: string) => {
                file.src = src;
                file.download = true;
                this.props.store.unsubscribeFromItem('process', this.onProcessChanged.bind(this));
                this.setState({
                    file: file
                });
            });
        }

        this.setState({
            file: file
        });
    }

    render() {
        const { file = { downloading: true, name: "", download: true, src: "" }, process = 0 } = this.state || {};

        if (file.download) {
            return (
                <div>
                    <img src={file.src} role="presentation" />
                </div>
            );
        } else {
            return (
                <div>
                    <Progress percent={process} status="active" />
                </div>
            );
        }
    }

}