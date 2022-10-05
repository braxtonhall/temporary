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
/*!********************!*\
  !*** ./ts/copy.ts ***!
  \********************/

exports.__esModule = true;
var constants_1 = __webpack_require__(/*! ./constants */ "./ts/constants.ts");
var util_1 = __webpack_require__(/*! ./util */ "./ts/util.ts");
var COLLECTIONS_ID_PREFIX = "collection_u_";
var SAVE_DATA_KEY = "_save-data";
var COLLECTIONS_KEY = "___collections_";
var saveData = function (parent) { return function (event) {
    event.preventDefault();
    localStorage.setItem(SAVE_DATA_KEY, JSON.stringify(getSaveData(parent)));
}; };
var loadData = function (parent) { return function (event) {
    var _a;
    event.preventDefault();
    var saveData = JSON.parse((_a = localStorage.getItem(SAVE_DATA_KEY)) !== null && _a !== void 0 ? _a : "{}");
    insertSaveData(parent, saveData);
}; };
var getSaveData = function (parent) {
    var elements = (0, util_1.getElementsByTags)(parent, constants_1.RELEVANT_TAGS);
    return elements.reduce(function (saveData, element) {
        // We can't change hidden elements because LibraryThing relies
        // on hidden form inputs to send additional, form-specific metadata
        // on save
        if (element && element.id && element.type !== "hidden") {
            var value = element.value, checked = element.checked;
            if (element.id.startsWith(COLLECTIONS_ID_PREFIX)) {
                var collections = saveData[COLLECTIONS_KEY] || {};
                var span = element.parentElement.getElementsByTagName("span")[0];
                collections[span.textContent] = { value: value, checked: checked };
                saveData[COLLECTIONS_KEY] = collections;
            }
            else {
                saveData[element.id] = { value: value, checked: checked };
            }
        }
        return saveData;
    }, {});
};
var insertSaveData = function (parent, saveData) {
    var elements = (0, util_1.getElementsByTags)(parent, constants_1.RELEVANT_TAGS);
    return elements.forEach(function (element) {
        // We can't change hidden elements because LibraryThing relies
        // on hidden form inputs to send additional, form-specific metadata
        // on save
        if (element && element.id && element.type !== "hidden") {
            var saveElement = element;
            if (element.id.startsWith(COLLECTIONS_ID_PREFIX)) {
                var span = element.parentElement.getElementsByTagName("span")[0];
                saveElement = saveData[COLLECTIONS_KEY][span.textContent] || element;
            }
            else {
                saveElement = saveData[element.id] || element;
            }
            element.value = saveElement.value;
            element.checked = saveElement.checked;
        }
    });
};
var appendButton = function (element, text, onClick) {
    var button = document.createElement("button");
    button.innerHTML = text;
    button.addEventListener("click", onClick);
    var td = document.createElement("td");
    td.appendChild(button);
    element.appendChild(td);
};
var appendRow = function (editForm) { return function (table) {
    var row = document.createElement("tr");
    appendButton(row, "SAVE", saveData(editForm));
    appendButton(row, "LOAD", loadData(editForm));
    var body = Array.from(table.getElementsByTagName("tbody"))[0];
    body.appendChild(row);
}; };
window.addEventListener(constants_1.FORM_RENDER_EVENT, function () {
    var editForm = document.getElementById("book_editForm");
    Array.from(document.getElementsByClassName("book_bitTable")).forEach(appendRow(editForm));
});

})();

/******/ })()
;
//# sourceMappingURL=copy.js.map