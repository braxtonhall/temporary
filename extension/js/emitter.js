/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/constants.ts":
/*!*************************!*\
  !*** ./ts/constants.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.RELEVANT_TAGS = exports.FORM_RENDER_EVENT = void 0;
var FORM_RENDER_EVENT = "library-thing-form-rendered";
exports.FORM_RENDER_EVENT = FORM_RENDER_EVENT;
var RELEVANT_TAGS = ["textarea", "input", "select"];
exports.RELEVANT_TAGS = RELEVANT_TAGS;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!******************************************!*\
  !*** ./ts/services/renderFormEmitter.ts ***!
  \******************************************/

exports.__esModule = true;
var constants_1 = __webpack_require__(/*! ../constants */ "./ts/constants.ts");
var tryToEmit = function () {
    // This is relying on the fact that when the edit form is available, the html matches this selector,
    // and fails to match in all other cases. This IS brittle. If LibraryThing changes
    // the markup in any way this will just not work
    if (document.querySelector("#book_editForm > .book_bit")) {
        window.dispatchEvent(new Event(constants_1.FORM_RENDER_EVENT));
    }
};
var observer = new MutationObserver(tryToEmit);
window.addEventListener("load", function () {
    var editForm = document.getElementById("book_editForm");
    if (editForm) {
        observer.observe(editForm, { subtree: false, childList: true });
        tryToEmit();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=emitter.js.map