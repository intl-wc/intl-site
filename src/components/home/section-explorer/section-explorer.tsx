import { Component } from '@stencil/core';



@Component({
    tag: 'home-section-explorer',
    styleUrl: 'section-explorer.scss'
})
export class SectionExplorer {

    private files = {
        'root': {
            'src': {
                'i18n': {
                    'de.json': true,
                    'en.json': true,
                    'es.json': true,
                    'fr.json': true,
                    'zh-cn.json': true
                },
                'index.html': true
            },
            'intl.config.ts': true
        }
    }

    render() {
        return (
            <section class='container'>
                <explorer-root files={this.files} initial={'src/index.html'}/>
            </section>
        );
    }
}
