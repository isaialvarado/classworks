const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function(content) {

  if (content instanceof HTMLElement) {
    return new DOMNodeCollection([content]);
  } else {
    const elements = Array.from(document.querySelectorAll(content));
    return new DOMNodeCollection(elements);
  }
};
