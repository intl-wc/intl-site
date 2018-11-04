import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'app-hero',
    styleUrl: 'hero.scss',
    shadow: true
})
export class Hero {

    @Prop() size: 'small' | 'default' = 'default';
    
    hostData() {
        return {
            class: {
                [`size-${this.size}`]: true
            }
        }
    }

    render() {
        return (
            <div class='container'>
                <slot/>
            </div>
        );
    }
}
