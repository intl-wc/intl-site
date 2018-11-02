class Sidebar {
    addChild(label, element) {
        this.children = Object.assign({}, this.children, { [label]: element });
    }
    openHandler(event) {
        const file = event.detail;
        for (let [fileName, el] of Object.entries(this.children)) {
            if (fileName !== file) {
                el.close();
            }
        }
        event.stopPropagation();
        this.onFileOpen.emit(file);
    }
    render() {
        return (h("div", { class: 'container' },
            h("div", { class: 'label' },
                h("h2", null, this.label)),
            h("slot", null),
            h("footer", null,
                h("h4", null, "Lazy Loading"))));
    }
    static get is() { return "explorer-sidebar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "addChild": {
            "method": true
        },
        "element": {
            "elementRef": true
        },
        "label": {
            "type": "Any",
            "attr": "label"
        }
    }; }
    static get events() { return [{
            "name": "fileOpen",
            "method": "onFileOpen",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "open",
            "method": "openHandler"
        }]; }
    static get style() { return ":host {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  background-color: var(--c-gray-shade);\n  padding: 12px 0 24px;\n  color: rgba(255, 255, 255, 0.8);\n  overflow: hidden;\n  padding-left: 12px;\n  border-top-left-radius: 8px;\n  border-bottom-left-radius: 8px;\n  -webkit-box-shadow: var(--shadow-3);\n  box-shadow: var(--shadow-3); }\n  \@media (min-width: 768px) {\n    :host {\n      min-height: 360px;\n      height: 100%; } }\n\n.label {\n  height: 32px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin: 0;\n  font-size: 14px;\n  z-index: 1; }\n  .label h2 {\n    margin: 0;\n    font-size: inherit;\n    z-index: 1; }\n  .label::after {\n    visibility: visible;\n    background-color: var(--c-gray-dark);\n    display: block;\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 40px;\n    z-index: 0; }"; }
}