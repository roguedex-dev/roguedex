// const browserApi = typeof browser !== "undefined" ? browser : chrome;
// import CryptoJS from '../libs/crypto-js.min';

class LocalStorageClass {
    constructor() {
        this.slotId = -1;
        this.saveKey = "x0i2O7WRiANTqPmZ";
        this.sessionData = {};
        // LocalStorageClass.#init(this);
        // this.dataKey;
        // this.sessionKey;
        // this.sessionId;
        //
        // this.potentialSessions = [];
        // this.tempSaveSlot;
        // this.clientSessionId;
    }

    clearAllSessionData(){
        setTimeout(function() {
            for (let key in localStorage) {
                if (key.includes('sessionData')) localStorage.removeItem(key)
            }
        }, 1000)
    }

    saveImageToCache(key, imageData) {
        try {
            localStorage.setItem(`img_cache_${key}`, imageData);
        } catch (e) {
            console.error("Failed to save image to cache", e);
        }
    }

    getImageFromCache(key) {
        return localStorage.getItem(`img_cache_${key}`);
    }

    clearImageCache() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith('img_cache_')) {
                localStorage.removeItem(key);
            }
        });
    }

    setSessionData(){
        let currentSessionData = {}
        for (let key in localStorage) {
            if ((this.slotId > 0 && key.includes(`sessionData${slotId}`)) || key.includes('sessionData')) {
                currentSessionData = localStorage.getItem(key)
                break
            }
        }
        this.sessionData = JSON.parse(CryptoJS.AES.decrypt(currentSessionData, this.saveKey).toString(CryptoJS.enc.Utf8))
        console.log("Got session data", this.sessionData, "for slot id", this.slotId)
        // browserApi.runtime.sendMessage({ type: 'BG_GET_SAVEDATA', data: this.sessionData, slotId: this.slotId })
    }

    getSessionData() {
        return this.sessionData;
    }

    async getExtensionSettings() {
        return new Promise((resolve) => {
            browserApi.storage.sync.get(['showMinified', 'scaleFactor', 'showEnemies', 'showParty'], (data) => {
                if (data.showMinified === undefined) {
                    browserApi.storage.sync.set({ 'showMinified': false });
                    data.showMinified = false;
                }
                if (data.scaleFactor === undefined) {
                    browserApi.storage.sync.set({ 'scaleFactor': 1 });
                    data.scaleFactor = 1;
                }
                if (data.showEnemies === undefined) {
                    browserApi.storage.sync.set({ 'showEnemies': true });
                    data.showEnemeies = true;
                }
                if (data.showParty === undefined) {
                    browserApi.storage.sync.set({ 'showParty': true });
                    data.showParty = true;
                }
                resolve(data);
            });
        });
    }

    getPlayerData(){
        let localStorageData = localStorage.getItem(this.getDataKey('data_'));
        const decryptedString = CryptoJS.AES.decrypt(localStorageData, this.saveKey).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedString);
    }

    getDataKey(matchString) {
        const keys = Object.keys(localStorage);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key.includes(matchString)) {
                return key;
            }
        }
    }

}


