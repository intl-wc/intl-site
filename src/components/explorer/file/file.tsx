import { Component, Prop, State, Element, Watch } from '@stencil/core';
import ExplorerTunnel, { File } from '../../../utils/state/explorer';


@Component({
    tag: 'explorer-file',
    styleUrl: 'file.scss',
    shadow: true,
    assetsDir: 'icons'
})
export class ExplorerFile {

    @Element() element: HTMLElement;

    @State() _label: string;
    @State() icon: string = 'json';

    @Prop({ context: 'publicPath' }) private publicPath: string;

    @Prop() label: string;
    @Watch('label')
    labelChanged() {
        this._label = this.label.split('/').pop().trim();
    }

    componentWillLoad() {
        if (this.label) this.labelChanged();
        this.element.closest('explorer-sidebar').addChild(this.label, this.element);
        this.getIcon();
    }

    @Prop() currentFile: File;
    @Prop() openFile: any;

    private getIcon() {
        if (this.label.endsWith('html')) {
            this.icon = 'html';
        } else if (this.label.endsWith('json')) {
            this.icon = 'json';
        } else {
            this.icon = 'json';
        }
    }

    hostData() {
        return {
            class: {
                'is-open': this.currentFile && this.currentFile.filename === this.label
            }
        }
    }

    render() {
        return (
            <li class='label' onClick={() => this.openFile(this.label)}>
                <img class='icon' src={`${this.publicPath}/icons/${this.icon}.svg`} />
                <p>{this._label}</p>
            </li>
        );
    }
}
ExplorerTunnel.injectProps(ExplorerFile, ['openFile', 'currentFile']);