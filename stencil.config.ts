import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

// https://stenciljs.com/docs/config

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        swSrc: 'src/sw.js'
      }
    }
  ],
  globalStyle: 'src/global/app.css',
  copy: [
    { src: 'demo-files', dest: 'demo' }
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/app.scss']
    })
  ]
};
