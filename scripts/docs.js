const { promisify } = require('util');
const { readFile: _readFile, writeFile: _writeFile } = require('fs');
const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);
const { dirname } = require('path');
const globby = require('globby');
const frontmatter = require('front-matter');
const marked = require('marked');
const mkdirp = require('mkdirp');

async function run() {
    const docs = await globby(['src/docs-content/**/*.md']);

    const files = await Promise.all(docs.map(async (path) => {
        const { data, content } = await readFile(path)
            .then(buffer => buffer.toString())
            .then(text => {
                const { body, attributes: data } = frontmatter(text);
                return { data, content: marked(body) };
            });
        return { path, data, content };
    }))

    await Promise.all(files.map(async (file) => {
        let { path, data, content } = file;
        path = path.replace('src/docs-content/', 'www/content/').replace('.md', '.json');
        
        mkdirp(dirname(path), async (err) => {
            if (err) return;

            await writeFile(path, JSON.stringify({ ...data, content }, null, 2));
        });
    }));
}

run()