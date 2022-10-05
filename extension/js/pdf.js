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

/***/ "./ts/pdf.ts":
/*!*******************!*\
  !*** ./ts/pdf.ts ***!
  \*******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var invoker_1 = __webpack_require__(/*! ./workers/invoker */ "./ts/workers/invoker.ts");
var types_1 = __webpack_require__(/*! ./workers/types */ "./ts/workers/types.ts");
var constants_1 = __webpack_require__(/*! ./constants */ "./ts/constants.ts");
var findTextContent = function (id) {
    return function () { var _a, _b; return (_b = (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : ""; };
};
var findTitle = findTextContent("form_title");
var findAuthor = findTextContent("form_authorunflip");
var onClick = function (comments) { return function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var author, title, links, commentAddition;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                author = findAuthor();
                title = findTitle();
                return [4 /*yield*/, (0, invoker_1.invokeWorker)(types_1.WorkerKind.Finder, { author: author, title: title })];
            case 1:
                links = _a.sent();
                commentAddition = links.map(function (link) { return "PDF: ".concat(link); }).join('\n');
                if (commentAddition) {
                    comments.value += "\n".concat(commentAddition);
                    comments.dispatchEvent(new Event("change"));
                }
                return [2 /*return*/];
        }
    });
}); }; };
var createButton = function (onClick) {
    var button = document.createElement("button");
    button.innerHTML = "Find PDF";
    button.addEventListener("click", onClick);
    return button;
};
window.addEventListener(constants_1.FORM_RENDER_EVENT, function () { return __awaiter(void 0, void 0, void 0, function () {
    var commentsCell, comments;
    return __generator(this, function (_a) {
        commentsCell = document.getElementById("bookedit_comments");
        comments = document.getElementById("form_comments");
        if (commentsCell && comments) {
            commentsCell.appendChild(createButton(onClick(comments)));
        }
        return [2 /*return*/];
    });
}); });


/***/ }),

/***/ "./ts/workers/invoker.ts":
/*!*******************************!*\
  !*** ./ts/workers/invoker.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.invokeWorker = void 0;
var invokeWorker = function (kind, request) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) { return chrome.runtime.sendMessage(__assign({ kind: kind }, request), resolve); })];
    });
}); };
exports.invokeWorker = invokeWorker;


/***/ }),

/***/ "./ts/workers/types.ts":
/*!*****************************!*\
  !*** ./ts/workers/types.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


exports.__esModule = true;
exports.WorkerKind = void 0;
var WorkerKind;
(function (WorkerKind) {
    WorkerKind["Finder"] = "finder";
})(WorkerKind || (WorkerKind = {}));
exports.WorkerKind = WorkerKind;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/pdf.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=pdf.js.map