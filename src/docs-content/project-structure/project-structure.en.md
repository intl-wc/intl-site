# Project Structure

There are a few ways you can structure an *intl* project. The recommended method is to create a root folder, where all of your translations will be stored. By default, this is `src/assets/i18n`. 

In the root of that folder, a file should exist for each supported locale, such as `en.json` or `es.json`. Optionally, adding an `index.json` file allows you to share data between all locales. This global file is a good place to define lazy-loaded routes and any shared global phrases (since these remain untranslated, it might make sense to put things like brand or product names here.)

```
src/assets/i18n/
├── index.json
├── de.json
├── en.json
├── es.json
├── ...
└── zh-cn.json
```

## Routes
As your application grows, you may find that the single-file-per-locale structure becomes more difficult to manage. By grouping translations together into *routes*, it becomes easier to reason about individual files. Each route should have a directory containing a json file for each supported locale.

```
src/assets/i18n/
├── index.json
├── de.json
├── en.json
├── es.json
├── ...
├── zh-cn.json
└── profile/
    ├── de.json
    ├── ...
    └── zh-cn.json
```

*intl* can automatically lazy-loads these routes when they are needed. To enable this, simply add a route definition to your global file.

#### index.json
```json
{
    "profile": {
        "lazy": true,
        "url": "/profile/:lang.json"
    }
}
```

## Other structures
Although the reccomended approach is the simplest, fastest, and most well-supported method for using *intl*, it's understandable that every project differs. Thankfully, *intl* should be able to support any sort of project structure that fits your needs.

Here are a few examples

```
src/assets/i18n/
├── index.json
├── de/
│   ├── index.json
│   └── profile.json
├── ...
└── zh-cn/
    ├── index.json
    └── profile.json
```

#### index.json
```json
{
    "profile": {
        "lazy": true,
        "url": "/:lang/profile.json"
    }
}
```