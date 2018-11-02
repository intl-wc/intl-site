import { Component } from '@stencil/core';


@Component({
    tag: 'home-section-intro',
    styleUrl: 'section-intro.scss',
    shadow: true
})
export class SectionIntro {

    render() {
        return (
            <section class='container'>
                <p>
                    intl is a simple <app-term def='internationalization'>i18n</app-term> and <app-term def='localization'>l10n</app-term> toolchain optimized for the&nbsp;modern&nbsp;web.
                </p>

                <ul>
                    <li>Declarative markup via Web Components</li>
                    <li>Simple, JSON-based translation files</li>
                    <li>Familiar <code>{'{{'} templating {'}}'}</code> syntax</li>
                    <li>Automatic lazy loading</li>
                    <li>Framework compatability</li>
                    <li>Enhanced with optional <code>intl</code> CLI</li>
                </ul>
            </section>
        );
    }
}
