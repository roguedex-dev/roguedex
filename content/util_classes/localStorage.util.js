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
                if (data.showEnemeies === undefined) {
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

    // static #init($this) {
    //     // LocalStorageClass.#extensionSettingsListener($this);
    //     $this.dataKey = $this.getDataKey("data_");
    //     //$this.sessionKey = $this.getKey("sessionData");
    //     LocalStorageClass.#getExtensionSettings($this);
    // }
    //
    // getDataKey(matchString) {
    //     const keys = Object.keys(localStorage);
    //     for (let i = 0; i < keys.length; i++) {
    //         const key = keys[i];
    //         if (key.includes(matchString)) {
    //             return key;
    //         }
    //     }
    // }
    //
    // clearLocalSessionData() {
    //     const keys = Object.keys(localStorage);
    //     for (let i = 0; i < keys.length; i++) {
    //         const key = keys[i];
    //         if (key.includes("sessionData")) {
    //             localStorage.removeItem(key);
    //         }
    //     }
    //     console.log("LocalStorage Primed");
    // }
    //
    // determineSession(){
    //     let $this = this;
    //     let slot = $this.tempSaveSlot.slot;
    //     let dataToMatch = $this.tempSaveSlot.slot;
    //     console.log($this.potentialSessions);
    //     for(let sI in $this.potentialSessions) {
    //         let curSessionKey = $this.potentialSessions[sI];
    //         console.log(curSessionKey);
    //         let curSessionData = curSessionKey.data;
    //         if (curSessionData == dataToMatch) {
    //             //return curSessionKey.key;
    //             $this.sessionKey = curSessionKey.key;
    //         }
    //         else{
    //             console.log("NO MATCH WITH SLOT: ", slot)
    //         }
    //     }
    // }
    //
    // getPotentialSessionKeys(){
    //     const keys = Object.keys(localStorage);
    //     let potentialSessions = [];
    //     for (let i = 0; i < keys.length; i++) {
    //         const key = keys[i];
    //         console.log(key);
    //         if (key.includes("sessionData")) {
    //             let data = this.readLocalDataByKey(key);
    //             console.log(data);
    //             let potentialSettingsObject = {key: key, data: data}
    //             potentialSessions.push(potentialSettingsObject);
    //         }
    //     }
    //
    //     this.potentialSessions = potentialSessions
    //     return potentialSessions;
    // }
    //
    //
    // static async #getExtensionSettings($this) {
    //     return new Promise((resolve) => {
    //         browserApi.storage.sync.get(['showMinified', 'scaleFactor', 'showEnemies', 'showParty'], (data) => {
    //             if (data.showMinified === undefined) {
    //                 browserApi.storage.sync.set({ 'showMinified': false });
    //                 data.showMinified = false;
    //             }
    //             if (data.scaleFactor === undefined) {
    //                 browserApi.storage.sync.set({ 'scaleFactor': 1 });
    //                 data.scaleFactor = 1;
    //             }
    //             if (data.showEnemeies === undefined) {
    //                 browserApi.storage.sync.set({ 'showEnemies': true });
    //                 data.showEnemeies = true;
    //             }
    //             if (data.showParty === undefined) {
    //                 browserApi.storage.sync.set({ 'showParty': true });
    //                 data.showParty = true;
    //             }
    //             resolve(data);
    //         });
    //     });
    // }
    //
    //
    //
    // async getExtensionSettings(){
    //     return await LocalStorageClass.#getExtensionSettings(this);
    // }
    //
    // getSessionData(){
    //
    //
    //     let data = this.getPotentialSessionKeys();
    //     this.sessionKey = (data[0]).key;
    //     //console.log(this.sessionKey);
    //     //this.sessionKey = "sessionData2_ProSnow"
    //     const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
    //     let localStorageData = localStorage.getItem(this.sessionKey);
    //     const decryptedString = CryptoJS.AES.decrypt(localStorageData, saveKey).toString(CryptoJS.enc.Utf8);
    //     return JSON.parse(decryptedString);
    // }
    //
    // setSessionData(sessionData) {
    //     //hard set
    //     const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
    //     const jsonString = JSON.stringify(sessionData);
    //     const encryptedString = CryptoJS.AES.encrypt(jsonString, saveKey).toString();
    //     localStorage.setItem(this.sessionKey, encryptedString);
    // }
    //
    // getPlayerData(){
    //     const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
    //     let localStorageData = localStorage.getItem(this.dataKey);
    //     const decryptedString = CryptoJS.AES.decrypt(localStorageData, saveKey).toString(CryptoJS.enc.Utf8);
    //     return JSON.parse(decryptedString);
    // }
    //
    // readLocalDataByKey(key){
    //     const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
    //     let localStorageData = localStorage.getItem(key);
    //     const decryptedString = CryptoJS.AES.decrypt(localStorageData, saveKey).toString(CryptoJS.enc.Utf8);
    //     return JSON.parse(decryptedString);
    // }
    //
    // setPlayerData(playerData) {
    //     const saveKey = 'x0i2O7WRiANTqPmZ'; // Temporary; secure encryption is not yet necessary
    //     const jsonString = JSON.stringify(playerData);
    //     const encryptedString = CryptoJS.AES.encrypt(jsonString, saveKey).toString();
    //     localStorage.setItem(this.dataKey, encryptedString);
    // }
}


