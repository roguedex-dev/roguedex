HttpUtils.createTopBannerDiv()

HttpUtils.createWrapperDivs()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("Got message:", message, "from", sender, "current message:", document.getElementById('touchControls').getAttribute('data-ui-mode'))
	const uiMode = touchControlsElement.getAttribute('data-ui-mode')
	console.log("Current ui mode: ", uiMode)
	if (message.type === 'UPDATE_ENEMIES_DIV' || message.type === 'UPDATE_ALLIES_DIV') {
		LocalStorageUtils.slotId = message.slotId
		if (uiMode === 'TITLE' || uiMode === 'SAVE_SLOT') return sendResponse({ success: true })

		let divId = message.type === 'UPDATE_ENEMIES_DIV' ? 'enemies' : 'allies'
		HttpUtils.updateFromMessage(message)
		HttpUtils.createCardsDiv(divId)
    	sendResponse({ success: true });
	}
});

const touchControlsElement = document.getElementById('touchControls')
if (touchControlsElement) {
	const observer = new MutationObserver((mutations) => {
		mutations.forEach(async (mutation) => {
			if (!(mutation.type === 'attributes' && mutation.attributeName === 'data-ui-mode')) return
			const newValue = touchControlsElement.getAttribute('data-ui-mode');
			console.log('New data-ui-mode:', newValue);
			if(newValue === "MESSAGE" || newValue === "COMMAND" || newValue === "CONFIRM") {
				browserApi.runtime.sendMessage({ 
					type: 'BG_GET_SAVEDATA', 
					data: LocalStorageUtils.getCurrentSessionData(localStorage), 
					slotId: LocalStorageUtils.slotId 
				})
			}
			else if(newValue === "SAVE_SLOT") {
				setTimeout(LocalStorageUtils.cleanSessionData, 1000)
			}
			else {
				HttpUtils.deleteWrapperDivs()
			}
		});
	});

	observer.observe(touchControlsElement, { attributes: true });
}