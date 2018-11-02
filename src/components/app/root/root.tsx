import { Component } from '@stencil/core';
import '@stencil/router';

@Component({
  tag: 'app-root',
  styleUrl: 'root.scss',
  shadow: true
})
export class AppRoot {

  render() {
    return [
        <app-header/>,
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='page-home' exact={true} />
              <stencil-route component='page-not-found' />
            </stencil-route-switch>
          </stencil-router>
        </main>,
        <app-language-controller />
    ];
  }
}
