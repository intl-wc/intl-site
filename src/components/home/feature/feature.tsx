import { Component } from '@stencil/core';


@Component({
    tag: 'home-feature',
    styleUrl: 'feature.css'
})
export class Feature {

    render() {
        return (
            <div>
                <p>Hello Feature!</p>
            </div>
        );
    }
}
