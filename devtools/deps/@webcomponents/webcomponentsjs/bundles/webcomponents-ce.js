/// BareSpecifier=@webcomponents/webcomponentsjs/bundles/webcomponents-ce
/**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function () {
  /*
  Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
  Code distributed by Google as part of the polymer project is also
  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */
  'use strict';
  var n = window.Document.prototype.createElement,
      p = window.Document.prototype.createElementNS,
      aa = window.Document.prototype.importNode,
      ba = window.Document.prototype.prepend,
      ca = window.Document.prototype.append,
      da = window.DocumentFragment.prototype.prepend,
      ea = window.DocumentFragment.prototype.append,
      q = window.Node.prototype.cloneNode,
      r = window.Node.prototype.appendChild,
      t = window.Node.prototype.insertBefore,
      u = window.Node.prototype.removeChild,
      v = window.Node.prototype.replaceChild,
      x = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
      y = window.Element.prototype.attachShadow,
      z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
      A = window.Element.prototype.getAttribute,
      B = window.Element.prototype.setAttribute,
      C = window.Element.prototype.removeAttribute,
      D = window.Element.prototype.getAttributeNS,
      E = window.Element.prototype.setAttributeNS,
      F = window.Element.prototype.removeAttributeNS,
      G = window.Element.prototype.insertAdjacentElement,
      fa = window.Element.prototype.insertAdjacentHTML,
      ha = window.Element.prototype.prepend,
      ia = window.Element.prototype.append,
      ja = window.Element.prototype.before,
      ka = window.Element.prototype.after,
      la = window.Element.prototype.replaceWith,
      ma = window.Element.prototype.remove,
      na = window.HTMLElement,
      H = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
      oa = window.HTMLElement.prototype.insertAdjacentElement,
      pa = window.HTMLElement.prototype.insertAdjacentHTML;var qa = new Set();"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function (a) {
    return qa.add(a);
  });function ra(a) {
    var b = qa.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
  }var sa = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
  function I(a) {
    var b = a.isConnected;if (void 0 !== b) return b;if (sa(a)) return !0;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }function J(a) {
    var b = a.children;if (b) return Array.prototype.slice.call(b);b = [];for (a = a.firstChild; a; a = a.nextSibling) a.nodeType === Node.ELEMENT_NODE && b.push(a);return b;
  }
  function K(a, b) {
    for (; b && b !== a && !b.nextSibling;) b = b.parentNode;return b && b !== a ? b.nextSibling : null;
  }
  function L(a, b, c) {
    for (var f = a; f;) {
      if (f.nodeType === Node.ELEMENT_NODE) {
        var d = f;b(d);var e = d.localName;if ("link" === e && "import" === d.getAttribute("rel")) {
          f = d.import;void 0 === c && (c = new Set());if (f instanceof Node && !c.has(f)) for (c.add(f), f = f.firstChild; f; f = f.nextSibling) L(f, b, c);f = K(a, d);continue;
        } else if ("template" === e) {
          f = K(a, d);continue;
        }if (d = d.__CE_shadowRoot) for (d = d.firstChild; d; d = d.nextSibling) L(d, b, c);
      }f = f.firstChild ? f.firstChild : K(a, f);
    }
  }function M(a, b, c) {
    a[b] = c;
  };function ta(a) {
    var b = document;this.c = a;this.a = b;this.b = void 0;N(this.c, this.a);"loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 }));
  }function ua(a) {
    a.b && a.b.disconnect();
  }ta.prototype.f = function (a) {
    var b = this.a.readyState;"interactive" !== b && "complete" !== b || ua(this);for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, f = 0; f < c.length; f++) N(this.c, c[f]);
  };function va() {
    var a = this;this.b = this.a = void 0;this.c = new Promise(function (b) {
      a.b = b;a.a && b(a.a);
    });
  }function wa(a) {
    if (a.a) throw Error("Already resolved.");a.a = void 0;a.b && a.b(void 0);
  };function O(a) {
    this.f = new Map();this.g = new Map();this.l = new Map();this.i = !1;this.b = a;this.j = new Map();this.c = function (b) {
      return b();
    };this.a = !1;this.h = [];this.m = a.f ? new ta(a) : void 0;
  }O.prototype.o = function (a, b) {
    var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");xa(this, a);this.f.set(a, b);this.h.push(a);this.a || (this.a = !0, this.c(function () {
      return ya(c);
    }));
  };
  O.prototype.define = function (a, b) {
    var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");xa(this, a);za(this, a, b);this.h.push(a);this.a || (this.a = !0, this.c(function () {
      return ya(c);
    }));
  };function xa(a, b) {
    if (!ra(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");if (P(a, b)) throw Error("A custom element with name '" + b + "' has already been defined.");if (a.i) throw Error("A custom element is already being defined.");
  }
  function za(a, b, c) {
    a.i = !0;var f;try {
      var d = function (m) {
        var w = e[m];if (void 0 !== w && !(w instanceof Function)) throw Error("The '" + m + "' callback must be a function.");return w;
      },
          e = c.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var g = d("connectedCallback");var h = d("disconnectedCallback");var k = d("adoptedCallback");var l = (f = d("attributeChangedCallback")) && c.observedAttributes || [];
    } catch (m) {
      throw m;
    } finally {
      a.i = !1;
    }c = { localName: b, constructorFunction: c,
      connectedCallback: g, disconnectedCallback: h, adoptedCallback: k, attributeChangedCallback: f, observedAttributes: l, constructionStack: [] };a.g.set(b, c);a.l.set(c.constructorFunction, c);return c;
  }O.prototype.upgrade = function (a) {
    N(this.b, a);
  };
  function ya(a) {
    if (!1 !== a.a) {
      a.a = !1;for (var b = [], c = a.h, f = new Map(), d = 0; d < c.length; d++) f.set(c[d], []);N(a.b, document, { upgrade: function (k) {
          if (void 0 === k.__CE_state) {
            var l = k.localName,
                m = f.get(l);m ? m.push(k) : a.g.has(l) && b.push(k);
          }
        } });for (d = 0; d < b.length; d++) Q(a.b, b[d]);for (d = 0; d < c.length; d++) {
        for (var e = c[d], g = f.get(e), h = 0; h < g.length; h++) Q(a.b, g[h]);(e = a.j.get(e)) && wa(e);
      }c.length = 0;
    }
  }O.prototype.get = function (a) {
    if (a = P(this, a)) return a.constructorFunction;
  };
  O.prototype.whenDefined = function (a) {
    if (!ra(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.j.get(a);if (b) return b.c;b = new va();this.j.set(a, b);var c = this.g.has(a) || this.f.has(a);a = -1 === this.h.indexOf(a);c && a && wa(b);return b.c;
  };O.prototype.polyfillWrapFlushCallback = function (a) {
    this.m && ua(this.m);var b = this.c;this.c = function (c) {
      return a(function () {
        return b(c);
      });
    };
  };
  function P(a, b) {
    var c = a.g.get(b);if (c) return c;if (c = a.f.get(b)) {
      a.f.delete(b);try {
        return za(a, b, c());
      } catch (f) {
        R(f);
      }
    }
  }window.CustomElementRegistry = O;O.prototype.define = O.prototype.define;O.prototype.upgrade = O.prototype.upgrade;O.prototype.get = O.prototype.get;O.prototype.whenDefined = O.prototype.whenDefined;O.prototype.polyfillDefineLazy = O.prototype.o;O.prototype.polyfillWrapFlushCallback = O.prototype.polyfillWrapFlushCallback;function S() {
    var a = T && T.noDocumentConstructionObserver,
        b = T && T.shadyDomFastWalk;this.b = [];this.c = [];this.a = !1;this.shadyDomFastWalk = b;this.f = !a;
  }function U(a, b, c, f) {
    var d = window.ShadyDOM;if (a.shadyDomFastWalk && d && d.inUse) {
      if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll) for (a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) c(a[b]);
    } else L(b, c, f);
  }function Aa(a, b) {
    a.a = !0;a.b.push(b);
  }function Ba(a, b) {
    a.a = !0;a.c.push(b);
  }function V(a, b) {
    a.a && U(a, b, function (c) {
      return W(a, c);
    });
  }
  function W(a, b) {
    if (a.a && !b.__CE_patched) {
      b.__CE_patched = !0;for (var c = 0; c < a.b.length; c++) a.b[c](b);for (c = 0; c < a.c.length; c++) a.c[c](b);
    }
  }function X(a, b) {
    var c = [];U(a, b, function (d) {
      return c.push(d);
    });for (b = 0; b < c.length; b++) {
      var f = c[b];1 === f.__CE_state ? a.connectedCallback(f) : Q(a, f);
    }
  }function Y(a, b) {
    var c = [];U(a, b, function (d) {
      return c.push(d);
    });for (b = 0; b < c.length; b++) {
      var f = c[b];1 === f.__CE_state && a.disconnectedCallback(f);
    }
  }
  function N(a, b, c) {
    c = void 0 === c ? {} : c;var f = c.s,
        d = c.upgrade || function (g) {
      return Q(a, g);
    },
        e = [];U(a, b, function (g) {
      a.a && W(a, g);if ("link" === g.localName && "import" === g.getAttribute("rel")) {
        var h = g.import;h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function () {
          var k = g.import;if (!k.__CE_documentLoadHandled) {
            k.__CE_documentLoadHandled = !0;var l = new Set();f && (f.forEach(function (m) {
              return l.add(m);
            }), l.delete(k));N(a, k, { s: l, upgrade: d });
          }
        });
      } else e.push(g);
    }, f);for (b = 0; b < e.length; b++) d(e[b]);
  }
  function Q(a, b) {
    try {
      var c = b.ownerDocument,
          f = c.__CE_registry;var d = f && (c.defaultView || c.__CE_isImportDocument) ? P(f, b.localName) : void 0;if (d && void 0 === b.__CE_state) {
        d.constructionStack.push(b);try {
          try {
            if (new d.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
          } finally {
            d.constructionStack.pop();
          }
        } catch (k) {
          throw b.__CE_state = 2, k;
        }b.__CE_state = 1;b.__CE_definition = d;if (d.attributeChangedCallback && b.hasAttributes()) {
          var e = d.observedAttributes;
          for (d = 0; d < e.length; d++) {
            var g = e[d],
                h = b.getAttribute(g);null !== h && a.attributeChangedCallback(b, g, null, h, null);
          }
        }I(b) && a.connectedCallback(b);
      }
    } catch (k) {
      R(k);
    }
  }S.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;if (b.connectedCallback) try {
      b.connectedCallback.call(a);
    } catch (c) {
      R(c);
    }
  };S.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;if (b.disconnectedCallback) try {
      b.disconnectedCallback.call(a);
    } catch (c) {
      R(c);
    }
  };
  S.prototype.attributeChangedCallback = function (a, b, c, f, d) {
    var e = a.__CE_definition;if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
      e.attributeChangedCallback.call(a, b, c, f, d);
    } catch (g) {
      R(g);
    }
  };
  function Ca(a, b, c, f) {
    var d = b.__CE_registry;if (d && (null === f || "http://www.w3.org/1999/xhtml" === f) && (d = P(d, c))) try {
      var e = new d.constructorFunction();if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");if (e.hasAttributes()) throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");if (null !== e.firstChild) throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");if (null !== e.parentNode) throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");if (e.ownerDocument !== b) throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");if (e.localName !== c) throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
      return e;
    } catch (g) {
      return R(g), b = null === f ? n.call(b, c) : p.call(b, f, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, W(a, b), b;
    }b = null === f ? n.call(b, c) : p.call(b, f, c);W(a, b);return b;
  }
  function R(a) {
    var b = a.message,
        c = a.sourceURL || a.fileName || "",
        f = a.line || a.lineNumber || 0,
        d = a.column || a.columnNumber || 0,
        e = void 0;void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", { cancelable: !0, message: b, filename: c, lineno: f, colno: d, error: a }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, c, f), e.preventDefault = function () {
      Object.defineProperty(this, "defaultPrevented", { configurable: !0, get: function () {
          return !0;
        } });
    });void 0 === e.error && Object.defineProperty(e, "error", { configurable: !0, enumerable: !0, get: function () {
        return a;
      } });window.dispatchEvent(e);e.defaultPrevented || console.error(a);
  };var Da = new function () {}();function Ea(a) {
    window.HTMLElement = function () {
      function b() {
        var c = this.constructor;var f = document.__CE_registry.l.get(c);if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var d = f.constructionStack;if (0 === d.length) return d = n.call(document, f.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = f, W(a, d), d;var e = d.length - 1,
            g = d[e];if (g === Da) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
        d[e] = Da;Object.setPrototypeOf(g, c.prototype);W(a, g);return g;
      }b.prototype = na.prototype;Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });return b;
    }();
  };function Z(a, b, c) {
    function f(d) {
      return function (e) {
        for (var g = [], h = 0; h < arguments.length; ++h) g[h] = arguments[h];h = [];for (var k = [], l = 0; l < g.length; l++) {
          var m = g[l];m instanceof Element && I(m) && k.push(m);if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) h.push(m);else h.push(m);
        }d.apply(this, g);for (g = 0; g < k.length; g++) Y(a, k[g]);if (I(this)) for (g = 0; g < h.length; g++) k = h[g], k instanceof Element && X(a, k);
      };
    }void 0 !== c.prepend && M(b, "prepend", f(c.prepend));void 0 !== c.append && M(b, "append", f(c.append));
  }
  ;function Fa(a) {
    M(Document.prototype, "createElement", function (b) {
      return Ca(a, this, b, null);
    });M(Document.prototype, "importNode", function (b, c) {
      b = aa.call(this, b, !!c);this.__CE_registry ? N(a, b) : V(a, b);return b;
    });M(Document.prototype, "createElementNS", function (b, c) {
      return Ca(a, this, c, b);
    });Z(a, Document.prototype, { prepend: ba, append: ca });
  };function Ga(a) {
    function b(c, f) {
      Object.defineProperty(c, "textContent", { enumerable: f.enumerable, configurable: !0, get: f.get, set: function (d) {
          if (this.nodeType === Node.TEXT_NODE) f.set.call(this, d);else {
            var e = void 0;if (this.firstChild) {
              var g = this.childNodes,
                  h = g.length;if (0 < h && I(this)) {
                e = Array(h);for (var k = 0; k < h; k++) e[k] = g[k];
              }
            }f.set.call(this, d);if (e) for (d = 0; d < e.length; d++) Y(a, e[d]);
          }
        } });
    }M(Node.prototype, "insertBefore", function (c, f) {
      if (c instanceof DocumentFragment) {
        var d = J(c);c = t.call(this, c, f);if (I(this)) for (f = 0; f < d.length; f++) X(a, d[f]);return c;
      }d = c instanceof Element && I(c);f = t.call(this, c, f);d && Y(a, c);I(this) && X(a, c);return f;
    });M(Node.prototype, "appendChild", function (c) {
      if (c instanceof DocumentFragment) {
        var f = J(c);c = r.call(this, c);if (I(this)) for (var d = 0; d < f.length; d++) X(a, f[d]);return c;
      }f = c instanceof Element && I(c);d = r.call(this, c);f && Y(a, c);I(this) && X(a, c);return d;
    });M(Node.prototype, "cloneNode", function (c) {
      c = q.call(this, !!c);this.ownerDocument.__CE_registry ? N(a, c) : V(a, c);return c;
    });M(Node.prototype, "removeChild", function (c) {
      var f = c instanceof Element && I(c),
          d = u.call(this, c);f && Y(a, c);return d;
    });M(Node.prototype, "replaceChild", function (c, f) {
      if (c instanceof DocumentFragment) {
        var d = J(c);c = v.call(this, c, f);if (I(this)) for (Y(a, f), f = 0; f < d.length; f++) X(a, d[f]);return c;
      }d = c instanceof Element && I(c);var e = v.call(this, c, f),
          g = I(this);g && Y(a, f);d && Y(a, c);g && X(a, c);return e;
    });x && x.get ? b(Node.prototype, x) : Aa(a, function (c) {
      b(c, { enumerable: !0, configurable: !0, get: function () {
          for (var f = [], d = this.firstChild; d; d = d.nextSibling) d.nodeType !== Node.COMMENT_NODE && f.push(d.textContent);return f.join("");
        }, set: function (f) {
          for (; this.firstChild;) u.call(this, this.firstChild);null != f && "" !== f && r.call(this, document.createTextNode(f));
        } });
    });
  };function Ha(a) {
    function b(f) {
      return function (d) {
        for (var e = [], g = 0; g < arguments.length; ++g) e[g] = arguments[g];g = [];for (var h = [], k = 0; k < e.length; k++) {
          var l = e[k];l instanceof Element && I(l) && h.push(l);if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) g.push(l);else g.push(l);
        }f.apply(this, e);for (e = 0; e < h.length; e++) Y(a, h[e]);if (I(this)) for (e = 0; e < g.length; e++) h = g[e], h instanceof Element && X(a, h);
      };
    }var c = Element.prototype;void 0 !== ja && M(c, "before", b(ja));void 0 !== ka && M(c, "after", b(ka));void 0 !== la && M(c, "replaceWith", function (f) {
      for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];e = [];for (var g = [], h = 0; h < d.length; h++) {
        var k = d[h];k instanceof Element && I(k) && g.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) e.push(k);else e.push(k);
      }h = I(this);la.apply(this, d);for (d = 0; d < g.length; d++) Y(a, g[d]);if (h) for (Y(a, this), d = 0; d < e.length; d++) g = e[d], g instanceof Element && X(a, g);
    });void 0 !== ma && M(c, "remove", function () {
      var f = I(this);ma.call(this);f && Y(a, this);
    });
  };function Ia(a) {
    function b(d, e) {
      Object.defineProperty(d, "innerHTML", { enumerable: e.enumerable, configurable: !0, get: e.get, set: function (g) {
          var h = this,
              k = void 0;I(this) && (k = [], U(a, this, function (w) {
            w !== h && k.push(w);
          }));e.set.call(this, g);if (k) for (var l = 0; l < k.length; l++) {
            var m = k[l];1 === m.__CE_state && a.disconnectedCallback(m);
          }this.ownerDocument.__CE_registry ? N(a, this) : V(a, this);return g;
        } });
    }function c(d, e) {
      M(d, "insertAdjacentElement", function (g, h) {
        var k = I(h);g = e.call(this, g, h);k && Y(a, h);I(g) && X(a, h);return g;
      });
    }
    function f(d, e) {
      function g(h, k) {
        for (var l = []; h !== k; h = h.nextSibling) l.push(h);for (k = 0; k < l.length; k++) N(a, l[k]);
      }M(d, "insertAdjacentHTML", function (h, k) {
        h = h.toLowerCase();if ("beforebegin" === h) {
          var l = this.previousSibling;e.call(this, h, k);g(l || this.parentNode.firstChild, this);
        } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      });
    }y && M(Element.prototype, "attachShadow", function (d) {
      d = y.call(this, d);if (a.a && !d.__CE_patched) {
        d.__CE_patched = !0;for (var e = 0; e < a.b.length; e++) a.b[e](d);
      }return this.__CE_shadowRoot = d;
    });z && z.get ? b(Element.prototype, z) : H && H.get ? b(HTMLElement.prototype, H) : Ba(a, function (d) {
      b(d, { enumerable: !0, configurable: !0, get: function () {
          return q.call(this, !0).innerHTML;
        }, set: function (e) {
          var g = "template" === this.localName,
              h = g ? this.content : this,
              k = p.call(document, this.namespaceURI, this.localName);for (k.innerHTML = e; 0 < h.childNodes.length;) u.call(h, h.childNodes[0]);for (e = g ? k.content : k; 0 < e.childNodes.length;) r.call(h, e.childNodes[0]);
        } });
    });M(Element.prototype, "setAttribute", function (d, e) {
      if (1 !== this.__CE_state) return B.call(this, d, e);var g = A.call(this, d);B.call(this, d, e);e = A.call(this, d);a.attributeChangedCallback(this, d, g, e, null);
    });M(Element.prototype, "setAttributeNS", function (d, e, g) {
      if (1 !== this.__CE_state) return E.call(this, d, e, g);var h = D.call(this, d, e);E.call(this, d, e, g);g = D.call(this, d, e);a.attributeChangedCallback(this, e, h, g, d);
    });M(Element.prototype, "removeAttribute", function (d) {
      if (1 !== this.__CE_state) return C.call(this, d);var e = A.call(this, d);C.call(this, d);null !== e && a.attributeChangedCallback(this, d, e, null, null);
    });M(Element.prototype, "removeAttributeNS", function (d, e) {
      if (1 !== this.__CE_state) return F.call(this, d, e);var g = D.call(this, d, e);F.call(this, d, e);var h = D.call(this, d, e);g !== h && a.attributeChangedCallback(this, e, g, h, d);
    });oa ? c(HTMLElement.prototype, oa) : G && c(Element.prototype, G);pa ? f(HTMLElement.prototype, pa) : fa && f(Element.prototype, fa);Z(a, Element.prototype, { prepend: ha, append: ia });Ha(a);
  };var T = window.customElements;function Ja() {
    var a = new S();Ea(a);Fa(a);Z(a, DocumentFragment.prototype, { prepend: da, append: ea });Ga(a);Ia(a);a = new O(a);document.__CE_registry = a;Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: a });
  }T && !T.forcePolyfill && "function" == typeof T.define && "function" == typeof T.get || Ja();window.__CE_installPolyfill = Ja; /*
                                                                                                                                  Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
                                                                                                                                  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
                                                                                                                                  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
                                                                                                                                  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
                                                                                                                                  Code distributed by Google as part of the polymer project is also
                                                                                                                                  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
                                                                                                                                  */
}).call(this);

//# sourceMappingURL=webcomponents-ce.js.map