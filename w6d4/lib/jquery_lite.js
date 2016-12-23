/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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

	  on(type, callback) {
	    this.htmlElements.forEach(el => {
	      el.addEventListener(type, callback);
	      el.events = {};
	      el.events[type] = callback;
	    });
	  }

	  off(type) {
	    this.htmlElements.forEach(el => {
	      el.removeEventListener(type, el.events[type]);
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);