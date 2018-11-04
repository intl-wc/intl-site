import { Component } from '@stencil/core';

@Component({
    tag: 'not-found-hero',
    styleUrl: 'hero.scss',
    shadow: true
})
export class Hero {

    private sorry = [
        'Scusi',
        'Lo siento',
        'Pardon',
        'Fyrirgefðu',
        'Sumimasen',
        'Signómi'
    ]

    render() {
        return [
            <h2>
                <x-baffle initial='Sorry!' phrases={this.sorry.join('|')} />
            </h2>,
            <p>We couldn't find the page you were looking for!</p>
        ]
    }
}
