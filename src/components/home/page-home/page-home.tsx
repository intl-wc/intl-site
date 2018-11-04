import { Component } from '@stencil/core';


@Component({
    tag: 'page-home',
    styleUrl: 'page-home.scss'
})
export class PageHome {

    hostData() {
        return {
            class: {
                'page': true
            }
        }
    }

    render() {
        return [
            <app-hero>
                <home-hero/>
            </app-hero>,
            <home-section-stats />,
            <home-section-intro />,
            <home-section-explorer />
        ]
    }
}
