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
/* 0 */
/***/ (function(module, exports) {

class DOMNodes {  
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(string) {
    if (string !== undefined) {
      this.each(node => node.innerHTML = string);
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.each(node => node.innerHTML = '');
  }

  append(els) {
    if (this.nodes.length === 0) return;

    if (typeof els === 'object' && !(els instanceof DOMNodes)) {
      els = $$(els);
    };

    switch (typeof els) {
      case 'object':
        if (els instanceof DOMNodes) {
          this.each(node => {
            els.each(el => (node.appendChild(el.cloneNode(true))))
          });
        };
        return;

      case 'string':
        this.each(node => node.innerHTML += els);
        return;
    }
  }

  attr(name, value) {
    if (value === undefined) {
      return this.nodes[0].getAttribute(name);
    } else {
      this.nodes[0].setAttribute(name, value);
    }
  }

  addClass(className) {
    this.each(node => node.classList.add(className));
  }

  removeClass(className) {
    this.each(node => node.classList.remove(className));
  }

  toggleClass(className) {
    this.each(node => node.classList.toggle(className));
  }

  children() {
    const children = [];

    this.each(node => {
      for (let i = 0; i < node.children.length; i++)
        children.push(node.children[i]);
    });

    return new DOMNodes(children);
  }

  parent() {
    const parents = [];

    this.each(node => {
      const parent = node.parentNode;

      if (!parents.includes(parent))
        parents.push(parent);
    });

    return new DOMNodes(parents);
  }

  find(query) {
    const found = [];

    this.each(node => {
      const els = node.querySelectorAll(query);

      for (let i = 0; i < els.length; i++)
        found.push(els[i]);
    });

    return new DOMNodes(found);
  }

  remove() {
    const removed = this.nodes.slice(0);
    this.each(node => node.remove());
    return removed;
  }

  on(event, cb) {
    this.each(node => {
      node.addEventListener(event, cb);

      const eventEntry = `aqEvents-${event}`;

      if (node[eventEntry] === undefined) {
        node[eventEntry] = [cb];
      } else {
        node[eventEntry].push(cb);
      }
    });

    return this.nodes;
  }

  off(event) {
    this.each(node => {
      const eventEntry = `aqEvents-${event}`;
      let cbs = node[eventEntry];

      if (cbs)
        cbs.forEach(cb => node.removeEventListener(event, cb));

      cbs = [];
    });

    return this.nodes;
  }
}

module.exports = DOMNodes;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodes = __webpack_require__(0);

const _docReadyCBs = [];
let _docReady = false;

window.$$ = function (arg) {
  switch (typeof(arg)) {
    case 'string':
      return _generateNodes(arg);

    case 'function':
      return _registerDocReadyCB(arg);

    case 'object':
      if (arg instanceof HTMLElement)
        return new DOMNodes([arg]);
  }
}

_registerDocReadyCB = cb => {
  _docReady ? cb() : _docReadyCBs.push(cb);
}

_generateNodes = selector => {
  let query = document.querySelectorAll(selector);
  let nodes = Array.from(query);
  return new DOMNodes(nodes);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCBs.forEach(cb => cb());
});


/***/ })
/******/ ]);