const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function(content) {
  const queue = [];

  if (content instanceof HTMLElement) {
    return new DOMNodeCollection([content]);
  } else if (content instanceof Function) {
    queue.push(content);
  } else {
    const elements = Array.from(document.querySelectorAll(content));
    return new DOMNodeCollection(elements);
  }

  // document.addEventListener("DOMContentLoaded"), function(event) {
  //
  // };
};
