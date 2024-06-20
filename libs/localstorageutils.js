const saveKey = 'x0i2O7WRiANTqPmZ'
let currentSessionData = {}

class LocalStorageUtils {
	static slotId = -1

	static getCurrentSessionData(localStorage) {
		Object.keys(localStorage).some((key) => {
			if ((this.slotId > 0 && key.includes(`sessionData${this.slotId}`)) || key.includes('sessionData')) {
				currentSessionData = localStorage.getItem(key)
			}
		})
		return JSON.parse(CryptoJS.AES.decrypt(currentSessionData, saveKey).toString(CryptoJS.enc.Utf8))
	}

	static cleanSessionData() {
		let removeKeys = []
		Object.keys(localStorage).some((key) => {
			if (key.includes('sessionData'))
				removeKeys.push(key)
		})
		console.log("Found the following keys in localStorage:", removeKeys)
		Object.keys(removeKeys).some((key) => {
			console.log("Removing key", removeKeys[key])
			localStorage.removeItem(removeKeys[key])
		})
		return removeKeys.length > 0
	}
}