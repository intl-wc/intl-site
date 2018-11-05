import { Component, State, Prop, Watch } from '@stencil/core';
import ExplorerTunnel, { State as TunnelState, File, Annotation } from '../../../utils/state/explorer';

@Component({
    tag: 'explorer-root',
    styleUrl: 'explorer.scss',
    shadow: true,
    assetsDir: 'prism'
})
export class Explorer {

    private prism: any;
    private fileCache = new Map<string, File>();

    @State() tree: any;
    @State() currentFile: File;
    @State() gettingFile: boolean = false;

    @Prop() files: any;
    @Watch('files')
    filesChanged() {
        this.tree = this.parseNode(this.files)[0].contents;
    }

    @Prop() initial: string;

    componentWillLoad() {
        if (this.files) this.filesChanged();
        this.initPrism();
        if (this.initial) this.openFile(this.initial);
    }

    openFile = async (filename: string): Promise<void> => {
        const file = await this.getFile(filename);
        this.currentFile = file;
    }
    
    getFile = async (filename: string): Promise<File> => {
        this.gettingFile = true;
        if (this.fileCache.has(filename)) {
            const file = this.fileCache.get(filename);
            this.gettingFile = false;
            return Promise.resolve(file);
        } else {
            try {
                const [content, annotations] = await Promise.all([
                    this.fetchContent(filename),
                    this.fetchAnnotations(filename)
                ])
                const file = await this.createFile(filename, content, annotations);
                return Promise.resolve(file);
            } catch (e) {

            }
        }
    }

    private parseNode(files: { [key: string]: any }) {
        let result = [];
        for (let [key, value] of Object.entries(files)) {
            if (value === true) {
                result = [...result, { type: 'file', name: key }]
            } else {
                result = [...result, { type: 'dir', name: key, contents: this.parseNode(value) }]
            }
        }
        return result;
    }

    private async createFile(filename: string, content: string, annotations: Annotation[]): Promise<File> {
        const file: File = {
            filename,
            content,
            annotations,
            language: this.getLanguage(filename)
        }
        const markup = await this.generateMarkup(file);
        const final = { ...file, markup };
        this.fileCache.set(filename, final);
        return Promise.resolve(final);
    }

    private async fetchContent(filename: string) {
        try {
            const response = await fetch(`/demo/${filename}`);
            if (response.ok) {
                return response.text();
            } else {
                return Promise.resolve(`Unable to load ${filename}`);
            }
        } catch (e) {
            return Promise.resolve(`Unable to load ${filename}`);
        }
    }

    private async fetchAnnotations(filename: string): Promise<Annotation[]> {
        try {
            const response = await fetch(`/demo/annotations/${filename}.json`);
            if (response.ok) {
                const data = await response.json();
                const mapped: Annotation[] = Object.entries(data).map(([key, value]) => {
                    return { line: Number.parseInt(key) - 1, text: value as string }
                })
                return Promise.resolve(mapped);
            } else {
                return Promise.resolve(null);
            }
        } catch (e) {
            return Promise.resolve(null);
        }
    }

    private async generateMarkup(file: File): Promise<string> {
        const { content, annotations, language } = file;
        const prism = await this.getPrism();
        let markup = '';
        switch (language) {
            case 'html':
                markup = /(<html(?:[\s\S]*)<\/html>)/gi.exec(content)[0];
                break;
            case 'ts':
                markup = content.replace(/^\s*\/\/\/\s*.*$/gmi, '').trim()
                break;
            default:
                markup = content;
                break;
        }
        
        if (!annotations) {
            markup = await prism.highlight(markup, prism.languages[language], [language]);
        } else {
            markup = await prism.highlight(markup, prism.languages[language], [language])
                .split('\n')
                .map((ln, i) => {
                    const annotation = this.getAnnotation(annotations, i);
                    if (annotation) {
                        const whitespace = ln.match(/^\s+/)[0];
                        return `<span class='line line-annotated'><span class='annotation'>${whitespace}${annotation.text}</span>${ln}</span>`;
                    } else {
                        return `<span class='line'>${ln}</span>`;
                    }
                })
                .join('\n');
        }
        return Promise.resolve(markup);
    }

    private renderTree(node: { type: 'file' | 'dir', name: string, contents?: any[] }) {
        if (node.type === 'file') {
            return (
                <explorer-file label={node.name} />
            )
        } else if (node.type === 'dir') {
            return (
                <explorer-dir label={node.name}>
                    { node.contents.map(n => ({ ...n, name: `${node.name}/${n.name}`})).map(n => this.renderTree(n)) }
                </explorer-dir>
            )
        }
    }

    private getAnnotation(annotations: Annotation[], index: number) {
        return annotations.find(x => x.line === index);
    }

    private getPrism() {
        return this.prism;
    }

    private getLanguage(filename: string) {
        return filename.split('.').pop().trim();
    }

    private async initPrism() {
        if (!('Prism' in window)) {
            await import('./prism/prism.js');
        }
        this.prism = (window as any).Prism;
    }
    

    render() {
        const { currentFile, getFile, gettingFile, openFile } = this;
        const state: TunnelState = { currentFile, getFile, gettingFile, openFile }
        return (
            <ExplorerTunnel.Provider state={state}>
                <explorer-sidebar label='@intl/demo'>
                    { this.tree.map(node => this.renderTree(node)) }
                </explorer-sidebar>
                <explorer-editor />
            </ExplorerTunnel.Provider>
        );
    }
}
