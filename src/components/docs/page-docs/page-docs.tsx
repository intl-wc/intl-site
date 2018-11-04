import { Component, Prop, State, Watch } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
    tag: 'page-docs',
    styleUrl: 'page-docs.scss',
    shadow: true
})
export class PageDocs {

    @State() docPath: string;

    @Prop() match: MatchResults;
    @Watch('match')
    matchChanged() {
        this.docPath = this.match.params.doc;
    }

    componentWillLoad() {
        this.matchChanged();
    }

    render() {
        return [
            <app-hero size='small'>
                <div class='hero-container'>
                    <article><h1>Hello world!</h1></article>
                </div>    
            </app-hero>,
            <div class='container'>
                <article>
                    <docs-document path={this.docPath}/>
                </article>
                <aside>
                    <docs-menu />
                </aside>
            </div>
        ];
    }
}
