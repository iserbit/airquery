const _docReadyCBs = [];
let _docReady = false;

window.$$ = function (arg) {
  switch (typeof(arg)) {
    case 'string':
      return $$._generateNodes(arg);

    case 'function':
      return $$._registerDocReadyCB(arg);

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
    options.url += '?' + $$._generateQuery(options.data);

  return new Promise((resolve, reject) => {
    req.open(options.method, options.url, true);

    req.onload = event => {
      if (req.status === 200) {
        const res = JSON.parse(req.response);
        options.success(res);
        resolve(res);
      } else {
        const res = JSON.parse(req.response);
        options.error(res);
        reject(res);
      }
    };

    req.send(JSON.stringify(options.data));
  });
};

$$._generateQuery = data => {
  let query = '';

  for (let el in data) {
    if (data.hasOwnProperty(el))
      query += el + '=' + data[el] + '&';
  }

  return query.substring(0, data.length - 1);
};

$$._registerDocReadyCB = cb => {
  _docReady ? cb() : _docReadyCBs.push(cb);
};

$$._generateNodes = selector => {
  let query = document.querySelectorAll(selector);
  let nodes = Array.from(query);
  return new DOMNodes(nodes);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCBs.forEach(cb => cb());
});

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
      return this;
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.each(node => node.innerHTML = '');
    return this;
  }

  remove() {
    const removed = this.nodes.slice(0);
    this.each(node => node.remove());
    return removed;
  }

  append(els) {
    if (this.nodes.length === 0) return;

    if (typeof els === 'object' && !(els instanceof DOMNodes)) {
      els = $$(els);
    }

    switch (typeof els) {
      case 'object':
        if (els instanceof DOMNodes) {
          this.each(node => {
            els.each(el => (node.appendChild(el.cloneNode(true))));
          });
        }
        return;

      case 'string':
        this.each(node => node.innerHTML += els);
        return;
    }
    return this;
  }

  attr(name, value) {
    if (value === undefined) {
      return this.nodes[0].getAttribute(name);
    } else {
      this.nodes[0].setAttribute(name, value);
    }
    return this;
  }

  addClass(className) {
    this.each(node => node.classList.add(className));
    return this;
  }

  removeClass(className) {
    this.each(node => node.classList.remove(className));
    return this;
  }

  toggleClass(className) {
    this.each(node => node.classList.toggle(className));
    return this;
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

    return new DOMNodes(this.nodes);
  }

  off(event) {
    this.each(node => {
      const eventEntry = `aqEvents-${event}`;
      let cbs = node[eventEntry];

      if (cbs)
        cbs.forEach(cb => node.removeEventListener(event, cb));

      cbs = [];
    });

    return new DOMNodes(this.nodes);
  }
}
