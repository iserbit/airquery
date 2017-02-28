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
};

$$.extend = (target, ...objects) => {
  objects.forEach(obj => {
    for (let el in obj)
      target[el] = obj[el];
  });

  return target;
};

$$.ajax = options => {
  const req = new XMLHttpRequest();

  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: '',
    data: {},
    success: () => {},
    error: () => {}
  };

  options = $$.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === 'GET' && Object.keys(options.data).length > 0)
    options.url += '?' + _generateQuery(options.data);

  return new Promise((resolve, reject) => {
    req.open(options.method, options.url, true);

    req.onload = event => {
      if (req.status === 200) {
        options.success(req.response);
        resolve(req.response);
      } else {
        options.error(req.response);
        reject(req.response);
      }
    };

    req.send(JSON.stringify(options.data));
  });
};

_generateQuery = data => {
  let query = '';

  for (let el in data) {
    if (data.hasOwnProperty(el))
      query += el + '=' + data[el] + '&';
  }

  return query.substring(0, data.length - 1);
};

_registerDocReadyCB = cb => {
  _docReady ? cb() : _docReadyCBs.push(cb);
};

_generateNodes = selector => {
  let query = document.querySelectorAll(selector);
  let nodes = Array.from(query);
  return new DOMNodes(nodes);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCBs.forEach(cb => cb());
});
