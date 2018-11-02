import { Component } from '@stencil/core';


@Component({
    tag: 'not-found-hero',
    styleUrl: 'hero.scss',
    shadow: true
})
export class Hero {

    render() {
        return [
            <h2>
                Oops.
            </h2>,
            <p>We couldn't find that page</p>
        ]
    }
}
