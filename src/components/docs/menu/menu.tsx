import { Component, State } from '@stencil/core';

interface Item {
    url: string,
    name: string;
}

@Component({
    tag: 'docs-menu',
    styleUrl: 'menu.scss',
    shadow: true
})
export class Menu {

    private menu: { [key: string]: Item[] } = {
        'Introduction': [
            { url: 'introduction', name: 'Overview' },
            { url: 'goals', name: 'Goals and Objectives' },
            { url: 'getting-started', name: 'Getting Started' },
            { url: 'example', name: 'Simplest Example' }
        ],
        'Components': [
            { url: 'dictionary', name: 'Dictionary' },
            { url: 'phrase', name: 'Phrase' }
        ],
        'Tooling': [
            { url: 'config', name: 'Config' },
            { url: 'cli', name: 'CLI' }
        ],
        'Guides': [
            { url: 'project-structure', name: 'Project Structure' },
            { url: 'performance', name: 'Performance' }
        ]
    }

    @State() expanded: string;

    componentWillLoad() {
        for (let [title, items] of Object.entries(this.menu)) {
            if (!this.expanded && !!items.find(x => `/docs/${x.url}` === window.location.pathname)) {
                this.expanded = title;
            }
        }
    }

    private expand(event: MouseEvent, title: string) {
        event.preventDefault();
        this.expanded = title;
    }

    renderItem(item: Item) {
        return (
            <li class='submenu-item'> <stencil-route-link url={`/docs/${item.url}`}> { item.name } </stencil-route-link></li>
        )
    }
    
    renderSubmenu(title: string, items: Item[]) {
        return (
            <li class={this.expanded === title ? 'submenu submenu-active' : 'submenu'}>
                <a href='#' class='title' onClick={(event) => this.expand(event, title)}>{ title }</a>
                <ul class={this.expanded === title ? '' : 'collapsed'}>
                    { items.map(item => this.renderItem(item)) }
                </ul>
            </li>
        )
    }

    render() {
        const submenus = [];
        for (let [title, items] of Object.entries(this.menu)) {
            submenus.push(this.renderSubmenu(title, items));
        }
        return [
            <ul class='menu'>
                { submenus }
            </ul>
        ];
    }
}
