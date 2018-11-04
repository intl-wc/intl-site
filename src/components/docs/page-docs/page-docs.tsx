import { Component, Prop, State, Watch } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
    tag: 'page-docs',
    styleUrl: 'page-docs.scss',
    shadow: true
})
export class PageDocs {

    @State() docName: string;

    @Prop() match: MatchResults;
    @Watch('match')
    matchChanged() {
        this.docName = this.match.params.doc;
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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque dignissimos non quidem quos cupiditate modi excepturi minus. Velit fugit eos incidunt facere aperiam reiciendis quibusdam suscipit impedit quae officiis.</p>
                </article>
                <aside>
                    <docs-menu />
                </aside>
            </div>
        ];
    }
}
