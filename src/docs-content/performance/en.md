---
title: Performance
---

# Preloading

It is recommended to preload your global *intl* file (`index.json`) and your app's default locale file (`en.json`) by taking advantage of the `<link>` element's `rel='preload'` attribute. `<intl-dictionary>` is optimized to take advantage of this feature.

You can add the following two elements to the `<head>` of you *.html* file, immediately following the file that loads *@intl/core*.

```html
<link rel="preload" as="fetch" crossorigin href="/assets/i18n/index.json">
<link rel="preload" as="fetch" crossorigin href="/assets/i18n/en.json">
```

Read more about [Preloading Content](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) on MDN.