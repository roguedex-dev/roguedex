export default class ImageInjector {
    constructor() {
        this.browserApi = typeof browser !== "undefined" ? browser : chrome;
        this.extensionId = this.browserApi.runtime.id;
        this.preloadedImages = {};
        this.preloadImages();
    }

    preloadImages() {
        for (let menuType = 1; menuType <= 5; menuType++) {
            this.preloadedImages[menuType] = {};
            const parts = [
                'corner-top-left',
                'corner-top-right',
                'corner-bottom-left',
                'corner-bottom-right',
                'edge-top',
                'edge-bottom',
                'edge-left',
                'edge-right',
                'center'
            ];

            parts.forEach(part => {
                const img = new Image();
                let prefix = (this.browserApi === chrome) ? 'chrome-extension' : 'moz-extension';
                const url = `${prefix}://${this.extensionId}/images/menu/${menuType}/${part}.png`;
                img.src = url;
                this.preloadedImages[menuType][part] = img;
            });
        }
    }

    injectImages(menuType = 1) {
        const parts = [
            { class: 'corner-top-left', part: 'corner-top-left' },
            { class: 'corner-top-right', part: 'corner-top-right' },
            { class: 'corner-bottom-left', part: 'corner-bottom-left' },
            { class: 'corner-bottom-right', part: 'corner-bottom-right' },
            { class: 'edge-top', part: 'edge-top' },
            { class: 'edge-bottom', part: 'edge-bottom' },
            { class: 'edge-left', part: 'edge-left' },
            { class: 'edge-right', part: 'edge-right' },
            { class: 'center', part: 'center' },
        ];

        parts.forEach(part => {
            const element = document.querySelector(`.${part.class}`);
            if (element) {
                const img = this.preloadedImages[menuType][part.part];
                element.style.backgroundImage = `url('${img.src}')`;
            }
        });
    }
}
