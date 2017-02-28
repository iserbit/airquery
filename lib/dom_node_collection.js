class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
    this.firstElement = this.HTMLElements[0];
  }

  each(cb) {
    this.HTMLElements.forEach(cb);
  }

  html(string) {
    if (string !== undefined) {
      this.each(el => el.innerHTML = string);
    } else {
      return this.firstElement.innerHTML;
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
      return this.firstElement.getAttribute(name);
    } else {
      this.firstElement.setAttribute(name, value);
    }
  }

  addClass(className) {
    this.HTMLElements.forEach(el => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.HTMLElements.forEach(el => {
      el.classList.remove(className);
    });
  }

  toggleClass(className) {
    this.HTMLElements.forEach(el => {
      el.classList.toggle(className);
    });
  }

  children() {
    let all_children = [];
    this.HTMLElements.forEach(el => {
      for (let i = 0; i < el.children.length; i++) {
        all_children.push(el.children[i]);
      }
    });
    return new DOMNodeCollection(all_children);
  }

  parent() {
    let all_parent = [];
    this.HTMLElements.forEach(el => {
      let parent = el.parentNode;

      if (!all_parent.includes(parent)) {
        all_parent.push(parent);
      }
    });
    return new DOMNodeCollection(all_parent);
  }

  find(query) {
    let found = [];
    this.HTMLElements.forEach(el => {
      let elements = el.querySelectorAll(query);
      for (let i = 0; i < elements.length; i++) {
        found.push(elements[i]);
      }
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
