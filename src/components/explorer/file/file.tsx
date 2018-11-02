import { Component, Prop, State, Event, EventEmitter, Element, Method, Watch } from '@stencil/core';


@Component({
    tag: 'explorer-file',
    styleUrl: 'file.scss',
    shadow: true,
    assetsDir: 'icons'
})
export class File {

    @Element() element: HTMLElement;

    @State() _label: string;
    @State() icon: string = 'json';
    @State() isOpen: boolean = false;

    @Prop({ context: 'publicPath' }) private publicPath: string;

    @Prop() label: string;
    @Watch('label')
    labelChanged() {
        this._label = this.label.split('/').pop().trim();
    }

    @Prop() open: boolean;
    @Watch('open')
    openChanged() {
        this.isOpen = this.open;
    }

    componentWillLoad() {
        if (this.open !== undefined) this.openChanged();
        if (this.label) this.labelChanged();
        this.element.closest('explorer-sidebar').addChild(this.label, this.element);
        this.getIcon();
    }

    @Event({ eventName: 'open' }) onOpen: EventEmitter<string>;

    @Method()
    close() {
        this.isOpen = false;
    }

    private doOpen() {
        if (!this.isOpen) this.isOpen = true;
        if (this.isOpen) this.onOpen.emit(this.label);
    }

    private getIcon() {
        if (this.label.endsWith('html')) {
            this.icon = 'html';
        } else if (this.label.endsWith('json')) {
            this.icon = 'json';
        } else {
            this.icon = 'json';
        }
    }

    hostData() {
        return {
            class: {
                'is-open': this.isOpen
            }
        }
    }

    render() {
        return (
            <li class='label' onClick={() => this.doOpen()}>
                <img class='icon' src={`${this.publicPath}/icons/${this.icon}.svg`} />
                <p>{this._label}</p>
            </li>
        );
    }
}
