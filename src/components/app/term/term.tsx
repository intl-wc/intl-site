import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'app-term',
    styleUrl: 'term.scss',
    shadow: true
})
export class Term {
    
    @Prop() def: string;

    render() {
        return (
            <dl>
                <dt> <slot/> </dt>
                <dd>{ this.def }</dd>
            </dl>
        );
    }
}
