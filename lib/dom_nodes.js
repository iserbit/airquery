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
