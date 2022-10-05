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


/***/ }),

/***/ "./ts/util.ts":
/*!********************!*\
  !*** ./ts/util.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.getElementsByTags = exports.getElementsByTag = void 0;
var getElementsByTag = function (parent) { return function (tag) { var _a; return Array.from((_a = parent === null || parent === void 0 ? void 0 : parent.getElementsByTagName(tag)) !== null && _a !== void 0 ? _a : []); }; };
exports.getElementsByTag = getElementsByTag;
var getElementsByTags = function (parent, tags) { return tags.flatMap(getElementsByTag(parent)); };
exports.getElementsByTags = getElementsByTags;


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
/*!***********************!*\
  !*** ./ts/warning.ts ***!
  \***********************/

exports.__esModule = true;
var constants_1 = __webpack_require__(/*! ./constants */ "./ts/constants.ts");
var util_1 = __webpack_require__(/*! ./util */ "./ts/util.ts");
var edited = false;
var onEdit = function () { return (edited = true); };
var undoEdits = function () { return (edited = false); };
var addEditListener = function (parent) {
    return (0, util_1.getElementsByTags)(parent, constants_1.RELEVANT_TAGS).forEach(function (element) {
        element.addEventListener("change", onEdit);
        element.addEventListener("keydown", onEdit);
    });
};
var addUndoEditListener = function () {
    return [
        document.getElementById("book_editTabTextEditCancel1"),
        document.getElementById("book_editTabTextEditCancel2"),
        document.getElementById("book_editTabTextSave1"),
        document.getElementById("book_editTabTextSave2"),
        document.getElementById("book_editTabTextDelete"), // so that it doesn't alert you when you're deleting something (?)
    ].forEach(function (element) { return element === null || element === void 0 ? void 0 : element.addEventListener("click", undoEdits); });
};
window.addEventListener(constants_1.FORM_RENDER_EVENT, function () {
    var editForm = document.getElementById("book_editForm");
    if (editForm) {
        addEditListener(editForm);
        addUndoEditListener();
    }
});
window.addEventListener("beforeunload", function (event) {
    if (edited) {
        var confirmationMessage = "It looks like you have been editing something. " +
            "If you leave before saving, your changes will be lost.";
        (event || window.event).returnValue = confirmationMessage; // Gecko + IE
        return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    }
});

})();

/******/ })()
;
//# sourceMappingURL=warning.js.map