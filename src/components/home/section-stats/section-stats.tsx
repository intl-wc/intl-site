import { Component, State } from '@stencil/core';

@Component({
    tag: 'home-section-stats',
    styleUrl: 'section-stats.scss',
    shadow: true
})
export class SectionStats {

    @State() downloads: number = 0;
    @State() stars: number = 0;
    @State() issues: number = 0;
    @State() latestRelease: number = 0;

    async componentWillLoad() {
        await fetch('https://api.npms.io/v2/package/%40intl%2Fcore')
            .then(x => x.json())
            .then(x => this.parseStats(x));
    }

    private parseStats(stats: any) {
        const { collected: { github, metadata, npm } } = stats;
        this.stars = github.starsCount;
        this.issues = github.issues.openCount;
        this.latestRelease = metadata.version;
        this.downloads = npm.downloads.slice(0, 7).reduce((a, b) => a + b.count, 0);
        return stats;
    }

    render() {
        return (
            <div class='container'>
                <pre><code>npm i @intl/core</code></pre>
                
                <a href={`https://www.npmjs.com/package/@intl/core/v/${this.latestRelease}`} class='color-blue'><p><ion-icon name='cube'/><span>{this.latestRelease}</span></p></a>
                <a href='https://www.npmjs.com/package/@intl/core' class='color-green'><p><ion-icon name='download' /><span>{this.downloads}</span></p></a>
                <a href='https://github.com/intl-wc/intl/stargazers' class='color-yellow'><p><ion-icon name='star' /><span>{this.stars}</span></p></a>
                <a href='https://github.com/intl-wc/intl/issues' class='color-red'><p><ion-icon name='alert' /><span>{this.issues}</span></p></a>
            </div>
        );
    }
}
