import { Component, State, Method } from '@stencil/core';
import { Language, Close } from '../../icons';

@Component({
    tag: 'app-language-controller',
    styleUrl: 'language-controller.scss',
    shadow: true
})
export class LanguageController {

    private langs = [
        'English',
        'Spanish'
    ]
    
    @State() isOpen: boolean = false;
    @State() isOpening: boolean = false;
    @State() isClosing: boolean = false;
    @State() current: string = 'English';

    @Method()
    changeLanguage(value: string) {
        document.documentElement.setAttribute('lang', value);
        this.toggle();
    }

    @Method()
    toggle() {
        if (!this.isOpen) this.isOpening = true;
        if (this.isOpen) this.isClosing = true;

        setTimeout(() => {
            this.isOpening = false;
            this.isClosing = false;
            this.isOpen = !this.isOpen
        }, 150)
    }

    hostData() {
        return {
            class: {
                'is-opening': this.isOpening,
                'is-open': this.isOpen,
                'is-closing': this.isClosing
            }
        }
    }

    render() {
        return [
            <button class='fab' onClick={() => this.toggle()}>
                { this.isOpen
                    ? <Close />
                    : <Language />
                }
            </button>,
            <ul class={this.isOpen ? 'active' : null}>
                {this.langs.map(item => <li><button onClick={() => this.changeLanguage(item)}>{ item }</button></li>) }
            </ul>,
            <div class='label-current'> Language </div>
        ]
    }
}
