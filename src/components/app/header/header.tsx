import { Component, State } from '@stencil/core';
import { Logo } from '../../icons';

@Component({
    tag: 'app-header',
    styleUrl: 'header.scss',
    shadow: true
})
export class Header {
    
    private io: IntersectionObserver;
    private sentinelEl: HTMLDivElement;
    
    @State() sticky: boolean = false;

    componentDidLoad() {
        this.addIO();
    }

    componentDidUnload() {
        this.sentinelEl = undefined;
        this.removeIO();
    }

    private addIO() {
        if ('IntersectionObserver' in window) {
            this.io = new IntersectionObserver(([sentinel]) => {
                this.sticky = !sentinel.isIntersecting;
            })

            this.io.observe(this.sentinelEl);
        }
    }

    private removeIO() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }

    hostData() {
        return {
            class: {
                'is-fixed': this.sticky
            }
        }
    }

    render() {
        return [
            <div class='sentinel' ref={(el) => this.sentinelEl = el} />,
            <header>
                <stencil-route-link url='/' onClick={(event: MouseEvent) => {
                    const el = (event.target as any).closest('stencil-route-link');
                    const active = !!el.querySelector('a.link-active');
                    if (active && this.sticky) {
                        window.scrollTo({ 
                            top: 0,
                            behavior: 'smooth'
                        })
                    }
                }}>
                    <Logo collapse={this.sticky} />
                </stencil-route-link>
            </header>
        ]
    }
}
