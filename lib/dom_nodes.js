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

module.exports = DOMNodes;
