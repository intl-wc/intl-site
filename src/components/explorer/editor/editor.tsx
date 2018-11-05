import { Component, Prop, Element } from '@stencil/core';
import ExplorerTunnel, { File } from '../../../utils/state/explorer';

@Component({
    tag: 'explorer-editor',
    styleUrls: ['editor.scss', 'prism.css', 'theme.scss'],
    shadow: true
})
export class Editor {

    @Element() element: HTMLElement;

    @Prop() gettingFile: boolean;
    @Prop() currentFile: File;

    render() {
        if (this.currentFile && this.currentFile.markup) {
            return (
                <div class='wrapper'>
                    <pre class={`language-${this.currentFile.language}`}><code innerHTML={this.currentFile.markup}></code></pre>
                </div>
            );
        }
    }
}
ExplorerTunnel.injectProps(Editor, ['gettingFile', 'currentFile']);
