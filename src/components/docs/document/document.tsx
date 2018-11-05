import { Component, Prop, Watch, State, Event, EventEmitter } from '@stencil/core';



@Component({
    tag: 'docs-document',
    styleUrl: 'document.scss',
    shadow: true
})
export class Document {

    @State() notFound: boolean = false;

    @Event({ eventName: 'docChanged' }) onDocChanged: EventEmitter<{ title: string }>;
    
    @State() title: string;
    @State() content: string;

    @Prop() path: string;
    @Watch('path')
    async pathChanged() {
        try {
            const { title, content, ...other} = await fetch(`/content/${this.path}/en.json`)
                .then(x => {
                    if (x.ok) return x.json();
                    throw new Error(`${x.status}`);
                });
            this.notFound = false;

            this.title = title;
            this.onDocChanged.emit({ title });
            this.content = content;

            if (other) { }

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
