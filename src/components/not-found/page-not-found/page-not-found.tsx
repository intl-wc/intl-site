import { Component } from '@stencil/core';


@Component({
    tag: 'page-not-found',
    styleUrl: 'page-not-found.scss',
    shadow: true
})
export class PageNotFound {

    render() {
        return [
            <app-hero>
                <not-found-hero />
            </app-hero>,
            <div class='container'>
                <div class='buttons'>
                    <stencil-route-link class='home' url='/'>Home</stencil-route-link>
                    <stencil-route-link class='docs' url='/docs/introduction'> Docs </stencil-route-link>
                </div>
            </div>
        ]
    }
}
