import { Component, State } from '@stencil/core';
import phrases from './phrases';
import baffle from 'baffle';

@Component({
    tag: 'home-hero',
    styleUrl: 'hero.scss',
    shadow: true
})
export class HomeHero {

    private baffle: any;
    private phrases = phrases;

    private spanEl: HTMLSpanElement;

    @State() index: number = Math.floor(this.phrases.length * Math.random());

    componentWillLoad() {
        setTimeout(() => {
            setInterval(() => {
                if (this.baffle) {
                    if (this.index < this.phrases.length - 1) this.index++;
                    else this.index = 0;
                    const text = this.phrases[this.index];
                    this.baffle.text(() => text).reveal(1500).stop();
                }
            }, 4000)
        }, 4000)
    }

    componentDidLoad() {
        this.baffle = baffle(this.spanEl).text(() => 'Hello, world!').reveal(1500).stop();
    }

    componentDidUnload() {
        this.spanEl = undefined;
    }

    render() {
        return [
            <h2>
                Web Components for saying
                <span ref={(el) => this.spanEl = el as HTMLSpanElement}>{this.phrases[this.index]}</span>
            </h2>,
            <div class='links'>
                <div class='social'>
                    <a href="https://github.com/intl-wc/intl"><ion-icon name='logo-github'/></a>
                    <a href="https://twitter.com/n_moore"><ion-icon name='logo-twitter' /></a>
                </div>
                <div class='cta'>
                    <stencil-route-link url='/docs'>
                        Read the Docs <ion-icon name='arrow-forward' />
                    </stencil-route-link>
                </div>
            </div>
        ]
    }
}
