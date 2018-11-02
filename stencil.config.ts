import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  copy: [
    { src: 'demo' }
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/app.scss']
    })
  ]
};
