import { Component } from '@stencil/core';


@Component({
    tag: 'app-hero',
    styleUrl: 'hero.scss',
    shadow: true
})
export class Hero {

    render() {
        return (
            <div class='container'>
                <slot/>
            </div>
        );
    }
}
