console.log('content script start');

const browserApi = typeof browser !== "undefined" ? browser : chrome;

// inject injected script
var s = document.createElement('script');
s.src = browserApi.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
 
