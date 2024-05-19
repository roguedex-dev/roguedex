import settingsTemplate from './settingsTemplate.js';

class OptionsManager {
    constructor() {
        this.browserApi = typeof browser !== "undefined" ? browser : chrome;
    }

    saveOption(setting, value) {
        const settings = {};
        if (setting === 'menuType' || setting === 'scaleFactor') {
            settings[setting] = parseFloat(value);
        } else if (value === 'true' || value === 'false') {
            settings[setting] = value === 'true';
        } else {
            settings[setting] = value;
        }
        this.browserApi.storage.sync.set(settings, () => {
            if (this.browserApi.runtime.lastError) {
                console.error('Error saving option:', this.browserApi.runtime.lastError);
            } else {
                console.log('Option saved successfully');
            }
        });
    }

    restoreOptions(callback) {
        const keys = Object.values(settingsTemplate).map(setting => setting.localStorage);
        this.browserApi.storage.sync.get(keys, (data) => {
            if (this.browserApi.runtime.lastError) {
                console.error('Error retrieving options:', this.browserApi.runtime.lastError);
            } else {
                document.querySelectorAll('.setting-options .option').forEach(option => {
                    const setting = option.getAttribute('data-setting');
                    const value = option.getAttribute('data-value');
                    if (data[setting] === (setting === 'menuType' || setting === 'scaleFactor' ? parseFloat(value) : value === 'true')) {
                        option.classList.add('selected');
                    }
                });

                if (callback) {
                    callback(data.menuType || 1);
                }
            }
        });
    }

    updateScale(value) {
        const scaleFactor = parseFloat(value);
        document.getElementById('scaleValue').textContent = scaleFactor;
        // Update any other necessary elements based on scale factor
    }

    scaleElements() {
        const manualScaleFactor = document.getElementById('scaleSlider').value;
        document.getElementById('scaleValue').textContent = manualScaleFactor;
    }

    saveOptions() {
        const showMin = document.querySelector('.option[data-setting="showMinified"].selected').getAttribute('data-value') === 'true';
        const showEnemy = document.querySelector('.option[data-setting="showEnemies"].selected').getAttribute('data-value') === 'true';
        const showParty = document.querySelector('.option[data-setting="showParty"].selected').getAttribute('data-value') === 'true';
        const scaleFactor = document.getElementById('scaleSlider').value;
        const menuType = parseInt(document.querySelector('.option[data-setting="menuType"].selected').getAttribute('data-value'), 10);

        this.browserApi.storage.sync.set({
            'showMinified': showMin,
            'scaleFactor': scaleFactor,
            'showEnemies': showEnemy,
            'showParty': showParty,
            'menuType': menuType
        }, () => {
            if (this.browserApi.runtime.lastError) {
                console.error('Error saving options:', this.browserApi.runtime.lastError);
            } else {
                console.log('Options saved successfully');
            }
        });
    }
}

export default OptionsManager;
