import { Component, State, Watch } from '@stencil/core';


@Component({
    tag: 'home-section-explorer',
    styleUrl: 'section-explorer.scss'
})
export class SectionExplorer {

    private cache = new Set<string>();
    @State() openFile: string = 'src/index.html';
    @Watch('openFile')
    openFileChanged() {
        this.fetchFileContents(this.openFile);
        this.fetchAnnotations(this.openFile);
    }
    @State() fileContent: string = '';
    @State() fileAnnotations: { [key: string]: string };

    componentWillLoad() {
        this.openFileChanged();
    }

    private async fetchFileContents(fileName: string) {
        if (this.cache.has(fileName)) {
            this.fileContent = `Oops, something went wrong...`;
            return;
        } else {
            const response = await fetch(`/demo/${fileName}`);
            if (response.ok) {
                this.fileContent = await response.text();
                this.cache.add(fileName);
                return;
            } else {
                this.fileContent = `Unable to load ${fileName}`;
            }
        }
    }

    private async fetchAnnotations(fileName: string) {
        try {
            if (this.cache.has(fileName)) return;
            
            const response = await fetch(`/demo/annotations/${fileName}.json`);
            if (response.ok) {
                this.fileAnnotations = await response.json();
                return;
            } else {
                this.fileAnnotations = null;
            }
        } catch (e) {
            this.fileAnnotations = null;
        }
    }

    private isOpen(file: string): boolean {
        return this.openFile === file;
    }

    private files = {
        root: [
            'intl.config.ts'
        ],
        src: [
            'index.html'
        ],
        i18n: [
            'de.json',
            'en.json',
            'es.json',
            'fr.json',
            'zh-cn.json'
        ]
    }

    private renderFile(dir: string, file: string) {
        const label = `${dir}/${file}`;
        return <explorer-file {...{ label, open: this.isOpen(label) }} />
    }

    render() {
        return (
            <section class='container'>
                <explorer-sidebar onFileOpen={(e) => this.openFile = e.detail} label='@intl/demo'>
                    <explorer-dir label='src'>
                        <explorer-dir label='i18n'>
                            {this.files.i18n.map(file => this.renderFile('src/i18n', file))}
                        </explorer-dir>
                        {this.files.src.map(file => this.renderFile('src', file))}
                    </explorer-dir>
                    {this.files.root.map(file => this.renderFile('', file))}
                </explorer-sidebar>
                <explorer-editor content={this.fileContent} filename={this.openFile} annotations={this.fileAnnotations}></explorer-editor>
            </section>
        );
    }
}
