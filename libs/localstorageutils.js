const saveKey = 'x0i2O7WRiANTqPmZ'
let currentSessionData = {}

class LocalStorageUtils {
	static slotId = -1

	static getCurrentSessionData(localStorage) {
		Object.keys(localStorage).some((key) => {
			if ((this.slotId > 0 && key.includes(`sessionData${this.slotId}`)) || key.includes('sessionData')) {
				currentSessionData = localStorage.getItem(key)
				return true
			}
		})
		return JSON.parse(CryptoJS.AES.decrypt(currentSessionData, saveKey).toString(CryptoJS.enc.Utf8))
	}

	static cleanSessionData() {
		for (key in localStorage) {
          if (key.includes('sessionData')) localStorage.removeItem(key)
        }
	}
}