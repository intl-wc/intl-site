import { Component, Prop, State, Watch } from '@stencil/core';


@Component({
    tag: 'explorer-editor',
    styleUrls: ['editor.scss', 'prism/prism.css', 'theme.scss'],
    shadow: true,
    assetsDir: 'prism'
})
export class Editor {

    private cache = new Map<string, string>();
    private didInit = false;
    private prism: any;
    private codeEl: HTMLElement;

    @State() _content: string;
    @State() language: string;
    
    @Prop() filename: string;
    @Watch('filename')
    async filenameChanged() {
        if (this.didInit && this.cache.has(this.filename)) {
            this.language = this.getLang(this.filename);
            this._content = this.cache.get(this.filename);
        }
    }

    @State() _annotations: Map<number, string>;
    @Prop() annotations: { [key: string]: string };
    @Watch('annotations')
    annotationsChanged() {
        this._annotations = new Map([...Object.entries(this.annotations).map(([key, value]) => ([Number.parseInt(key) - 1, value] as [number, string]))])
    }

    @Prop() content: string;
    @Watch('content')
    async contentChanged() {
        if (this.cache.has(this.filename)) return;
        
        if (this.didInit && this.content) {
            const prism = await this.getPrism();
            this.language = this.getLang(this.filename);
            let content = 'Something went wrong...';
            switch (this.language) {
                case 'html':
                    content = /(<html(?:[\s\S]*)<\/html>)/gi.exec(this.content)[0];
                    break;
                case 'ts':
                    content = this.content.replace(/^\/\/\/.*$/gmi, '').trim()
                    break;
                default:
                    content = this.content;
                    break;
            }
            if (this.annotations) {
                this._content = await prism.highlight(content, prism.languages[this.language], [this.language]).split('\n')
                    .map((x, i) => {
                        if (this._annotations.has(i)) {
                            return `<span class='line line-annotated'><span class='annotation'>${x.match(/^\s+/)[0]}${this._annotations.get(i)}</span>${x}</span>`;
                        } else {
                            return `<span class='line'>${x}</span>`;
                        }
                    })
                    .join('\n');
            } else {
                this._content = await prism.highlight(content, prism.languages[this.language], [this.language]);
            }
            this.cache.set(this.filename, this._content);
        }
    }

    componentWillLoad() {
        this.initPrism();
        if (this.content) this.contentChanged();
    }

    private getLang(filename: string) {
        return filename.split('.').pop().trim();
    }

    private async initPrism() {
        if (!('Prism' in window)) {
            await import('./prism/prism.js');
        }
        this.prism = (window as any).Prism;
        this.didInit = true;
    }

    private getPrism() {
        return this.prism;
    }

    render() {
        return (
            <div class='wrapper'>
                <pre class={`language-${this.language}`}><code ref={(el) => this.codeEl = el} innerHTML={this._content}></code></pre>
            </div>
        );
    }
}
