import { Component } from '@stencil/core';


@Component({
    tag: 'page-contributors',
    styleUrl: 'page-contributors.scss',
    shadow: true
})
export class PageContributors {

    render() {
        return [
            <app-hero>
                <h2>Made Possible by...</h2>
            </app-hero>

        ]
    }
}
