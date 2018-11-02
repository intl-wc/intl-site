import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'app-term',
    styleUrl: 'term.scss',
    shadow: true
})
export class Term {
    
    @Prop() def: string;

    hostData() {
        return {
            tabindex: 0
        }
    }

    render() {
        return (
            <dl>
                <dt> <slot/> </dt>
                <dd>{ this.def }</dd>
            </dl>
        );
    }
}
