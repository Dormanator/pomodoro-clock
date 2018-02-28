/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Pomodoro = __webpack_require__(1);

var _Pomodoro2 = _interopRequireDefault(_Pomodoro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Pomodoro2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Pomodoro = function () {

    var timerInput = document.getElementById('clock_input');
    var seconds = 0,
        startTime = void 0,
        timer = void 0;

    events();

    function events() {
        document.getElementById('clock_start').addEventListener('click', function (event) {
            startTimer(timerInput.value);
        });
    }

    function startTimer(value) {
        startTime = new Date().getTime() / 1000;
        seconds = 0;
        timer = window.setInterval(increment, 1000, value);
    }

    function increment(input) {
        updateDisplay(input);
        checkTimer(input);
    }

    function updateDisplay(input) {
        seconds++;
        document.getElementById('clock_display').textContent = seconds;
    }

    function checkTimer(input) {
        if (seconds === Number(input)) {
            timerDone();
        }
    }

    function timerDone() {
        window.clearInterval(timer);
        checkCorrectness();
    }

    function checkCorrectness() {
        var endTime = new Date().getTime() / 1000,
            timePassed = Math.round(endTime - startTime);

        console.log(timePassed + ' seconds passed');
    }
}();

exports.default = Pomodoro;

/***/ })
/******/ ]);