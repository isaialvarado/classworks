class DOMNodeCollection {
  constructor(HTMLelements) {
    this.htmlElements = HTMLelements;
  }

  html(htmlString) {
    if (htmlString) {
      this.htmlElements.forEach(el => {
        el.innerHTML = htmlString;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.htmlElements.forEach(el => {
      el.innerHTML = "";
    });
  }

  append(content) {
    this.htmlElements.forEach(subEl => {
      if (Array.isArray(content)) {
        content.forEach(arg => {
          subEl.append(arg);
        });
      } else {
        subEl.append(content);
      }
    });
  }

  attr(attributeName, value) {
    if (value) {
      this.htmlElements.forEach(el => {
        el.setAttribute(attributeName, value);
      });
    } else {
      return this.htmlElements[0].getAttribute(attributeName);
    }
  }

  addClass(nameOfClass) {
    this.htmlElements.forEach(el => {
      el.classList.add(nameOfClass);
    });
  }

  removeClass(nameOfClass) {
    this.htmlElements.forEach(el => {
      el.classList.remove(nameOfClass);
    });
  }

  // Traversal Methods

  children() {
    const allChildren = [];

    this.htmlElements.forEach(el => {
      Array.from(el.children).forEach(child => {
        allChildren.push(child);
      });
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];

    this.htmlElements.forEach(el => {
      allParents.push(el.parentElement);
    });

    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    const allDescendants = [];

    this.htmlElements.forEach(el => {
      const descendants = el.querySelectorAll(selector);
      descendants.forEach(descendant => {
        allDescendants.push(descendant);
      });
    });

    return new DOMNodeCollection(allDescendants);
  }

  remove(selector) {
    this.htmlElements.forEach(el => {
      el.remove();
    });

    this.htmlElements = [];
  }
}

module.exports = DOMNodeCollection;