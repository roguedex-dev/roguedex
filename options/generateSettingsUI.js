import settingsTemplate from './settingsTemplate.js';

const generateSettingsUI = () => {
    const container = document.getElementById('input-container');

    for (const key in settingsTemplate) {
        const setting = settingsTemplate[key];
        const inputItem = document.createElement('div');
        inputItem.classList.add('input-item');

        const label = document.createElement('label');
        label.classList.add('setting-label');
        label.textContent = setting.text;

        const settingOptions = document.createElement('span');
        settingOptions.classList.add('setting-options');

        setting.options.forEach(option => {
            const span = document.createElement('span');
            span.classList.add('option');
            let appended = "";
            if(setting.hasOwnProperty("appendText")){
                appended = setting.appendText;
            }
            span.textContent = option+appended;
            span.setAttribute('data-setting', setting.localStorage);
            span.setAttribute('data-value', option);

            if (setting.type === 'Bool') {
                span.setAttribute('data-value', option === "Yes" ? "true" : "false");
                label.classList.add('bool-label');
            } else if (setting.type === 'Float' || setting.type === 'Int') {
                span.setAttribute('data-value', option);
            }

            settingOptions.appendChild(span);
        });

        inputItem.appendChild(label);
        inputItem.appendChild(settingOptions);
        container.appendChild(inputItem);
    }
};

export default generateSettingsUI;
