import { Component, Prop, State, Element, Watch } from '@stencil/core';


@Component({
    tag: 'explorer-dir',
    styleUrl: 'dir.scss',
    shadow: true,
    assetsDir: 'icons'
})
export class Dir {

    @Element() element: HTMLElement;

    @State() icon: string = 'routes';
    @State() isOpen: boolean = true;
    @State() hasChildren: boolean = false;
    
    @Prop({ context: 'publicPath' }) private publicPath: string;
    
    @State() _label: string;
    @Prop() label: string;
    @Watch('label')
    labelChanged() {
        this._label = this.label.split('/').pop().trim();
    }

    componentWillLoad() {
        if (this.label) this.labelChanged();
        this.getIcon();
    }

    componentDidLoad() {
        this.hasChildren = !!(this.element.shadowRoot || this.element).children;
    }

    private toggle(event: MouseEvent) {
        this.isOpen = !this.isOpen;
        event.stopPropagation();
    }

    private getIcon() {
        if (this._label === 'src') {
            this.icon = 'src';
        } else if (this._label === 'assets') {
            this.icon = 'resource'
        } else if (this._label === 'i18n') {
            this.icon = 'i18n'
        } else {
            this.icon = 'routes'
        }
    }

    hostData() {
        return {
            role: 'treeitem',
            class: {
                'tree-row': true,
                'is-open': this.isOpen,
                'has-children': this.hasChildren
            }
        }
    }

    render() {
        return (
            <ul>
                <li class='label' onClick={(event) => this.toggle(event)}>
                    <ion-icon class='arrow' name='arrow-dropright'></ion-icon>
                    <img class='icon' src={`${this.publicPath}/icons/folder-${this.icon}${this.isOpen ? '-open' : ''}.svg`}/>
                    <h3>{this._label}</h3>
                </li>
                <slot/>
            </ul>
        );
    }
}
