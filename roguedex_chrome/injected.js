// This is a hack because in background.js we cannot read web request response's body.
// When we need to do that, we intercept the web request here, and send a message to background.js with the response data, elaborate there and send back to content.js
(function (xhr) {

    var XHR = XMLHttpRequest.prototype;

    var open = XHR.open;
    var send = XHR.send;

    XHR.open = function (method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    XHR.send = function (postData) {
        //console.log('injected script xhr request:', this._method, this._url, this.getAllResponseHeaders(), postData);
        this.addEventListener('load', function () {
            //window.postMessage({ type: 'xhr', data: this.response }, '*');  // send to content script
        });
        return send.apply(this, arguments);
    };
})(XMLHttpRequest);

const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    const response = await origFetch(...args);
    if (!response.url.includes('api.pokerogue.net/savedata/session?slot') &&
        !response.url.includes('api.pokerogue.net/savedata/updateall')) return response

    let sessionSlotRegex = /.*\/session\?slot=(\d+).*/ 
    let slotId = -1
    if (sessionSlotRegex.test(response.url)){
        slotId = sessionSlotRegex.exec(response.url)[1]
    } 
    response
        .clone()
        .json() // maybe json(), text(), blob()
        .then(data => {
            window.postMessage({ type: 'GET_SAVEDATA', data: data, slotId: slotId }, '*'); // send to content script
            //window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
        })
        .catch(err => console.error(err));
    return response;
};