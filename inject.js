console.log('content script start');

const browserApi = typeof browser !== "undefined" ? browser : chrome;

// inject injected script
var s = document.createElement('script');
s.src = browserApi.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
 
// receive message from injected script
window.addEventListener('message', function (e) {
    if (e.data.type === 'GET_SAVEDATA') {
        browserApi.runtime.sendMessage({ type: 'GET_SAVEDATA', data: e.data.data }, function(response) {
          if (response && response.success) {
            console.log('Successfully updated game info');
          } else {
            console.error('Failed to update game info');
          }
        });
    }
});