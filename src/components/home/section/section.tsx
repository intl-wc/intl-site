import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'home-section',
    styleUrl: 'section.scss',
    shadow: true
})
export class Section {

    @Prop() center: boolean;
    @Prop() twoUp: boolean;
    @Prop() threeUp: boolean;

    hostData() {
        return {
            class: {
                'is-centered': this.center,
                'is-two-up': this.twoUp,
                'is-three-up': this.threeUp
            }
        }
    }
    
    render() {
        return (
            <section class='container'>
                <slot/>
            </section>
        );
    }
}
