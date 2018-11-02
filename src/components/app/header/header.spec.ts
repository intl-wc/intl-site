import { TestWindow } from '@stencil/core/testing';
import { Header } from './header';

describe('header', () => {
  it('should build', () => {
    expect(new Header()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLHeaderElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Header],
        html: '<header></header>'
      });
    });

    // See https://stenciljs.com/docs/unit-testing
    {cursor}

  });
});
