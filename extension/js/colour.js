/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./ts/colour.ts ***!
  \**********************/
var getElement = function (document, id) {
    var _a;
    return (_a = document.getElementById(id)) !== null && _a !== void 0 ? _a : Array.from(document.getElementsByTagName("frame"))
        .map(function (frame) { return getElement(frame.contentWindow.document, id); })
        .find(function (masthead) { return !!masthead; });
};
var editElement = function (id, callback) {
    // warning: THIS IS NOT TYPE SAFE. it's LAZY
    var element = getElement(document, id);
    element && callback(element);
};
var setLogo = function (id) {
    return editElement(id, function (logo) { return (logo.src = chrome.runtime.getURL("img/icon128.png")); });
};
var setCSS = function (id, css) {
    return editElement(id, function (element) { return Object.entries(css).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        return (element.style[key] = value);
    }); });
};
var setFavicon = function () {
    var element = Array.from(document.getElementsByTagName("link")).find(function (element) { return element.rel === "icon" && element.type === "image/x-icon"; });
    if (element) {
        element.href = chrome.runtime.getURL("img/favicon.ico");
    }
};
window.addEventListener("load", function () {
    setCSS("masthead", { transition: "500ms", filter: "saturate(1.5)" });
    var background = "url(".concat(chrome.runtime.getURL("img/icon128.png"), ") no-repeat 16px 0");
    setCSS("masthead_logo_wordmark", { background: background });
    setLogo("masthead_lt_logo");
    setFavicon();
});

/******/ })()
;
//# sourceMappingURL=colour.js.map