const DOMNodes = require('./dom_nodes.js');

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
