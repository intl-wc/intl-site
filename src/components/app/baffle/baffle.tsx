import { Component, State, Prop, Watch } from '@stencil/core';
import baffle from 'baffle';

@Component({
    tag: 'x-baffle',
    styleUrl: 'baffle.scss',
    shadow: true
})
export class Baffle {

    private timeout: any;
    private interval: any;
    private baffle: any;
    private spanEl: HTMLSpanElement;

    @State() _phrases: string[];
    @State() index: number = 0;
    
    @Prop() initial: string;

    @Prop() phrases: string;
    @Watch('phrases')
    phrasesChanged() {
        this._phrases = this.phrases.split('|').map(x => x.trim());
        this.index = Math.floor(this._phrases.length * Math.random());
    }

    componentWillLoad() {
        if (this.phrases) this.phrasesChanged();
        this.timeout = setTimeout(() => {
            this.interval = setInterval(() => {
                if (this.baffle) {
                    if (this.index < this._phrases.length - 1) this.index++;
                    else this.index = 0;
                    const text = this._phrases[this.index];
                    this.baffle.text(() => text).reveal(1500).stop();
                }
            }, 4000)
        }, 4000)
    }

    componentDidLoad() {
        this.baffle = baffle(this.spanEl).text(() => this.initial).reveal(1500).stop();
    }

    componentDidUnload() {
        clearTimeout(this.timeout);
        clearInterval(this.interval);
        this.baffle = undefined;
        this.spanEl = undefined;
    }

    render() {
        return (
            <span ref={(el) => this.spanEl = el as HTMLSpanElement}>{this._phrases[this.index]}</span>
        );
    }
}
