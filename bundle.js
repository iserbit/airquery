/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodes = __webpack_require__(2);

const _documentReadyCallbacks = [];
let _documentReady = false;

// Generator Function

window.$$ = function (arg) {
  switch (typeof(arg)) {
    case 'string':
      return _generateNodeCollection(arg);

    case 'function':
      return;

    case 'object':
      if (arg instanceof HTMLElement)
        return new DOMNodes([arg]);
  }
}

// HELPER METHODS

_generateNodeCollection = selector => {
  let query = document.querySelectorAll(selector);
  let elements = Array.from(query);
  return new DOMNodes(elements);
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  each(cb) {
    this.HTMLElements.forEach(cb);
  }

  html(string) {
    if (string !== undefined) {
      this.each(el => el.innerHTML = string);
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  empty() {
    this.each(el => el.innerHTML = '');
  }

  append(element) {
    this.each(el => el.innerHTML += element);
  }

  attr(name, value) {
    if (value === undefined) {
      return this.HTMLElements[0].getAttribute(name);
    } else {
      this.HTMLElements[0].setAttribute(name, value);
    }
  }

  addClass(className) {
    this.each(el => el.classList.add(className));
  }

  removeClass(className) {
    this.each(el => el.classList.remove(className));
  }

  toggleClass(className) {
    this.each(el => el.classList.toggle(className));
  }

  children() {
    const children = [];

    this.each(el => {
      for (let i = 0; i < el.children.length; i++)
        children.push(el.children[i]);
    });

    return new DOMNodeCollection(children);
  }

  parent() {
    const parents = [];

    this.each(el => {
      const parent = el.parentNode;

      if (!parents.includes(parent))
        parents.push(parent);
    });

    return new DOMNodeCollection(parents);
  }

  find(query) {
    const found = [];

    this.each(el => {
      const els = el.querySelectorAll(query);

      for (let i = 0; i < els.length; i++)
        found.push(els[i]);
    });

    return new DOMNodeCollection(found);
  }

  remove() {
    this.HTMLElements.forEach(el => {
      el.remove();
    });
  }

  on(event, callback) {
    this.HTMLElements.forEach(el => {
      el.addEventListener("click", callback);

      let eventType = event + "-type";

      if (el[eventType] === undefined) {
        el[eventType] = [callback];
      } else {
        el[eventType].push(callback);
      }
    });
  }

  off(event) {
    this.HTMLElements.forEach(el => {
      let eventType = event + "-type";
      let callbacks = el[eventType];

      callbacks.forEach(cb => {
        el.removeEventListener(event, cb);
      });
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);