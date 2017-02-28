const DOMNodes = require('./dom_nodes.js');

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
