import { Component } from '@stencil/core';


@Component({
    tag: 'page-not-found',
    styleUrl: 'page-not-found.scss'
})
export class PageNotFound {

    render() {
        return [
            <app-hero>
                <not-found-hero />
            </app-hero>,
        ]
    }
}
