import { Component, Element, Prop, Method, State } from '@stencil/core';

@Component({
    tag: 'explorer-sidebar',
    styleUrl: 'sidebar.scss',
    shadow: true
})
export class Sidebar {
    
    @Element() element: HTMLElement;
    
    @State() children: any[];
    
    @Prop() label: any;

    @Method()
    addChild(label, element) {
        this.children = Object.assign({}, this.children, { [label]: element });
    }
    
    render() {
        return (
            <div class='container'>
                <div class='label'>
                    <h2>{this.label}</h2>
                </div>
                <slot />
            </div>
        )
    }
}