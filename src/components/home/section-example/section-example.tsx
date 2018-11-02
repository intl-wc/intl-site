import { Component } from '@stencil/core';


@Component({
    tag: 'home-section-example',
    styleUrl: 'section-example.scss',
    shadow: true
})
export class SectionExample {

    examples: any = {
        'basic': `<main class='app'>
    <intl-phrase name='greeting' />
</main>
<intl-dictionary url='/assets/i18n' />`
    }

    render() {
        return (
            <section>
                <h2>How does it work?</h2>
            </section>
        );
    }
}
