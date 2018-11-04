import { Component, Prop, Watch, State } from '@stencil/core';



@Component({
    tag: 'docs-document',
    styleUrl: 'document.scss',
    shadow: true
})
export class Document {

    @State() notFound: boolean = false;
    @State() content: string;

    @Prop() path: string;
    @Watch('path')
    async pathChanged() {
        try {
            const md = await fetch(`/content/${this.path}/en.json`)
                .then(x => {
                    if (x.ok) return x.text();
                    throw new Error(`${x.status}`);
                });
            this.notFound = false;
            this.content = md;
        } catch (e) {
            if (e.message === '404') {
                this.notFound = true;
                this.content = null;
            }
        }
    }

    componentWillLoad() {
        if (this.path) this.pathChanged();
    }

    render() {
        if (this.content) {
            return <div innerHTML={this.content} />
        } else if (this.notFound) {
            return <stencil-router-redirect url='/404'  />
        }
    }
}
