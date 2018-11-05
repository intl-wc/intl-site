import { Component } from '@stencil/core';
import phrases from './phrases';

@Component({
    tag: 'home-hero',
    styleUrl: 'hero.scss',
    shadow: true
})
export class HomeHero {

    render() {
        return [
            <h2>
                Web Components for saying
                <span> <x-baffle initial='Hello world!' phrases={phrases.join('|')} /> </span>
            </h2>,
            <div class='links'>
                <div class='social'>
                    <a href="https://npmjs.com/@intl/core"><ion-icon src='/assets/images/npm.svg' /></a>
                    <a href="https://github.com/intl-wc/intl"><ion-icon name='logo-github'/></a>
                    <a href="https://twitter.com/n_moore"><ion-icon name='logo-twitter' /></a>
                </div>
                <div class='cta'>
                    <stencil-route-link url='/docs/introduction'>
                        Read the Docs <ion-icon name='arrow-forward' />
                    </stencil-route-link>
                </div>
            </div>
        ]
    }
}
