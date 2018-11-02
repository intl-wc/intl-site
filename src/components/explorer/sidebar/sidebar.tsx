import { Component, Element, Prop, Method, State, Listen, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'explorer-sidebar',
    styleUrl: 'sidebar.scss',
    shadow: true
})
export class Sidebar {
    
    @Element() element: HTMLElement;
    
    @Event({ eventName: 'fileOpen' }) onFileOpen: EventEmitter<any>;
    @State() children: any[];
    
    @Prop() label: any;

    @Method()
    addChild(label, element) {
        this.children = Object.assign({}, this.children, { [label]: element });
    }

    @Listen('open')
    openHandler(event) {
        const file = event.detail;
        for (let [fileName, el] of Object.entries(this.children)) {
            if (fileName !== file) {
                el.close();
            }
        }
        event.stopPropagation();
        this.onFileOpen.emit(file);
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