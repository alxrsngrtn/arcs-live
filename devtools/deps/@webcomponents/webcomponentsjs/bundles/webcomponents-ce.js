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
  var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function g(a) {
    var b = aa.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
  }function l(a) {
    var b = a.isConnected;if (void 0 !== b) return b;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }
  function p(a, b) {
    for (; b && b !== a && !b.nextSibling;) b = b.parentNode;return b && b !== a ? b.nextSibling : null;
  }
  function q(a, b, d) {
    d = void 0 === d ? new Set() : d;for (var c = a; c;) {
      if (c.nodeType === Node.ELEMENT_NODE) {
        var e = c;b(e);var f = e.localName;if ("link" === f && "import" === e.getAttribute("rel")) {
          c = e.import;if (c instanceof Node && !d.has(c)) for (d.add(c), c = c.firstChild; c; c = c.nextSibling) q(c, b, d);c = p(a, e);continue;
        } else if ("template" === f) {
          c = p(a, e);continue;
        }if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) q(e, b, d);
      }c = c.firstChild ? c.firstChild : p(a, c);
    }
  }function t(a, b, d) {
    a[b] = d;
  };function u() {
    this.a = new Map();this.f = new Map();this.c = [];this.b = !1;
  }function ba(a, b, d) {
    a.a.set(b, d);a.f.set(d.constructorFunction, d);
  }function v(a, b) {
    a.b = !0;a.c.push(b);
  }function w(a, b) {
    a.b && q(b, function (b) {
      return x(a, b);
    });
  }function x(a, b) {
    if (a.b && !b.__CE_patched) {
      b.__CE_patched = !0;for (var d = 0; d < a.c.length; d++) a.c[d](b);
    }
  }function y(a, b) {
    var d = [];q(b, function (b) {
      return d.push(b);
    });for (b = 0; b < d.length; b++) {
      var c = d[b];1 === c.__CE_state ? a.connectedCallback(c) : z(a, c);
    }
  }
  function A(a, b) {
    var d = [];q(b, function (b) {
      return d.push(b);
    });for (b = 0; b < d.length; b++) {
      var c = d[b];1 === c.__CE_state && a.disconnectedCallback(c);
    }
  }
  function B(a, b, d) {
    d = void 0 === d ? {} : d;var c = d.u || new Set(),
        e = d.h || function (b) {
      return z(a, b);
    },
        f = [];q(b, function (b) {
      if ("link" === b.localName && "import" === b.getAttribute("rel")) {
        var d = b.import;d instanceof Node && (d.__CE_isImportDocument = !0, d.__CE_hasRegistry = !0);d && "complete" === d.readyState ? d.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
          var d = b.import;if (!d.__CE_documentLoadHandled) {
            d.__CE_documentLoadHandled = !0;var f = new Set(c);f.delete(d);B(a, d, { u: f, h: e });
          }
        });
      } else f.push(b);
    }, c);if (a.b) for (b = 0; b < f.length; b++) x(a, f[b]);for (b = 0; b < f.length; b++) e(f[b]);
  }
  function z(a, b) {
    if (void 0 === b.__CE_state) {
      var d = b.ownerDocument;if (d.defaultView || d.__CE_isImportDocument && d.__CE_hasRegistry) if (d = a.a.get(b.localName)) {
        d.constructionStack.push(b);var c = d.constructorFunction;try {
          try {
            if (new c() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
          } finally {
            d.constructionStack.pop();
          }
        } catch (m) {
          throw b.__CE_state = 2, m;
        }b.__CE_state = 1;b.__CE_definition = d;if (d.attributeChangedCallback) for (d = d.observedAttributes, c = 0; c < d.length; c++) {
          var e = d[c],
              f = b.getAttribute(e);null !== f && a.attributeChangedCallback(b, e, null, f, null);
        }l(b) && a.connectedCallback(b);
      }
    }
  }u.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;b.connectedCallback && b.connectedCallback.call(a);
  };u.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;b.disconnectedCallback && b.disconnectedCallback.call(a);
  };
  u.prototype.attributeChangedCallback = function (a, b, d, c, e) {
    var f = a.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, d, c, e);
  };function C(a) {
    var b = document;this.c = a;this.a = b;this.b = void 0;B(this.c, this.a);"loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 }));
  }function D(a) {
    a.b && a.b.disconnect();
  }C.prototype.f = function (a) {
    var b = this.a.readyState;"interactive" !== b && "complete" !== b || D(this);for (b = 0; b < a.length; b++) for (var d = a[b].addedNodes, c = 0; c < d.length; c++) B(this.c, d[c]);
  };function ca() {
    var a = this;this.b = this.a = void 0;this.c = new Promise(function (b) {
      a.b = b;a.a && b(a.a);
    });
  }function E(a) {
    if (a.a) throw Error("Already resolved.");a.a = void 0;a.b && a.b(void 0);
  };function F(a) {
    this.c = !1;this.a = a;this.j = new Map();this.f = function (b) {
      return b();
    };this.b = !1;this.i = [];this.o = new C(a);
  }
  F.prototype.l = function (a, b) {
    var d = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");if (!g(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");if (this.a.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");if (this.c) throw Error("A custom element is already being defined.");this.c = !0;try {
      var c = function (b) {
        var a = e[b];if (void 0 !== a && !(a instanceof Function)) throw Error("The '" + b + "' callback must be a function.");
        return a;
      },
          e = b.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var f = c("connectedCallback");var m = c("disconnectedCallback");var k = c("adoptedCallback");var h = c("attributeChangedCallback");var n = b.observedAttributes || [];
    } catch (r) {
      return;
    } finally {
      this.c = !1;
    }b = { localName: a, constructorFunction: b, connectedCallback: f, disconnectedCallback: m, adoptedCallback: k, attributeChangedCallback: h, observedAttributes: n, constructionStack: [] };ba(this.a, a, b);this.i.push(b);this.b || (this.b = !0, this.f(function () {
      return da(d);
    }));
  };F.prototype.h = function (a) {
    B(this.a, a);
  };
  function da(a) {
    if (!1 !== a.b) {
      a.b = !1;for (var b = a.i, d = [], c = new Map(), e = 0; e < b.length; e++) c.set(b[e].localName, []);B(a.a, document, { h: function (b) {
          if (void 0 === b.__CE_state) {
            var e = b.localName,
                f = c.get(e);f ? f.push(b) : a.a.a.get(e) && d.push(b);
          }
        } });for (e = 0; e < d.length; e++) z(a.a, d[e]);for (; 0 < b.length;) {
        var f = b.shift();e = f.localName;f = c.get(f.localName);for (var m = 0; m < f.length; m++) z(a.a, f[m]);(e = a.j.get(e)) && E(e);
      }
    }
  }F.prototype.get = function (a) {
    if (a = this.a.a.get(a)) return a.constructorFunction;
  };
  F.prototype.m = function (a) {
    if (!g(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.j.get(a);if (b) return b.c;b = new ca();this.j.set(a, b);this.a.a.get(a) && !this.i.some(function (b) {
      return b.localName === a;
    }) && E(b);return b.c;
  };F.prototype.s = function (a) {
    D(this.o);var b = this.f;this.f = function (d) {
      return a(function () {
        return b(d);
      });
    };
  };window.CustomElementRegistry = F;F.prototype.define = F.prototype.l;F.prototype.upgrade = F.prototype.h;F.prototype.get = F.prototype.get;
  F.prototype.whenDefined = F.prototype.m;F.prototype.polyfillWrapFlushCallback = F.prototype.s;var G = window.Document.prototype.createElement,
      H = window.Document.prototype.createElementNS,
      ea = window.Document.prototype.importNode,
      fa = window.Document.prototype.prepend,
      ha = window.Document.prototype.append,
      ia = window.DocumentFragment.prototype.prepend,
      ja = window.DocumentFragment.prototype.append,
      I = window.Node.prototype.cloneNode,
      J = window.Node.prototype.appendChild,
      K = window.Node.prototype.insertBefore,
      L = window.Node.prototype.removeChild,
      M = window.Node.prototype.replaceChild,
      N = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
      O = window.Element.prototype.attachShadow,
      P = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
      Q = window.Element.prototype.getAttribute,
      R = window.Element.prototype.setAttribute,
      S = window.Element.prototype.removeAttribute,
      T = window.Element.prototype.getAttributeNS,
      U = window.Element.prototype.setAttributeNS,
      ka = window.Element.prototype.removeAttributeNS,
      la = window.Element.prototype.insertAdjacentElement,
      ma = window.Element.prototype.insertAdjacentHTML,
      na = window.Element.prototype.prepend,
      oa = window.Element.prototype.append,
      V = window.Element.prototype.before,
      pa = window.Element.prototype.after,
      qa = window.Element.prototype.replaceWith,
      ra = window.Element.prototype.remove,
      sa = window.HTMLElement,
      W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
      ta = window.HTMLElement.prototype.insertAdjacentElement,
      ua = window.HTMLElement.prototype.insertAdjacentHTML;var va = new function () {}();function wa() {
    var a = X;window.HTMLElement = function () {
      function b() {
        var b = this.constructor,
            c = a.f.get(b);if (!c) throw Error("The custom element being constructed was not registered with `customElements`.");var e = c.constructionStack;if (0 === e.length) return e = G.call(document, c.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = c, x(a, e), e;c = e.length - 1;var f = e[c];if (f === va) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
        e[c] = va;Object.setPrototypeOf(f, b.prototype);x(a, f);return f;
      }b.prototype = sa.prototype;Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });return b;
    }();
  };function Y(a, b, d) {
    function c(b) {
      return function (d) {
        for (var e = [], c = 0; c < arguments.length; ++c) e[c] = arguments[c];c = [];for (var f = [], n = 0; n < e.length; n++) {
          var r = e[n];r instanceof Element && l(r) && f.push(r);if (r instanceof DocumentFragment) for (r = r.firstChild; r; r = r.nextSibling) c.push(r);else c.push(r);
        }b.apply(this, e);for (e = 0; e < f.length; e++) A(a, f[e]);if (l(this)) for (e = 0; e < c.length; e++) f = c[e], f instanceof Element && y(a, f);
      };
    }void 0 !== d.g && (b.prepend = c(d.g));void 0 !== d.append && (b.append = c(d.append));
  };function xa() {
    var a = X;t(Document.prototype, "createElement", function (b) {
      if (this.__CE_hasRegistry) {
        var d = a.a.get(b);if (d) return new d.constructorFunction();
      }b = G.call(this, b);x(a, b);return b;
    });t(Document.prototype, "importNode", function (b, d) {
      b = ea.call(this, b, !!d);this.__CE_hasRegistry ? B(a, b) : w(a, b);return b;
    });t(Document.prototype, "createElementNS", function (b, d) {
      if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
        var c = a.a.get(d);if (c) return new c.constructorFunction();
      }b = H.call(this, b, d);x(a, b);return b;
    });Y(a, Document.prototype, { g: fa, append: ha });
  };function ya() {
    function a(a, c) {
      Object.defineProperty(a, "textContent", { enumerable: c.enumerable, configurable: !0, get: c.get, set: function (a) {
          if (this.nodeType === Node.TEXT_NODE) c.set.call(this, a);else {
            var d = void 0;if (this.firstChild) {
              var e = this.childNodes,
                  k = e.length;if (0 < k && l(this)) {
                d = Array(k);for (var h = 0; h < k; h++) d[h] = e[h];
              }
            }c.set.call(this, a);if (d) for (a = 0; a < d.length; a++) A(b, d[a]);
          }
        } });
    }var b = X;t(Node.prototype, "insertBefore", function (a, c) {
      if (a instanceof DocumentFragment) {
        var e = Array.prototype.slice.apply(a.childNodes);
        a = K.call(this, a, c);if (l(this)) for (c = 0; c < e.length; c++) y(b, e[c]);return a;
      }e = l(a);c = K.call(this, a, c);e && A(b, a);l(this) && y(b, a);return c;
    });t(Node.prototype, "appendChild", function (a) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);a = J.call(this, a);if (l(this)) for (var e = 0; e < c.length; e++) y(b, c[e]);return a;
      }c = l(a);e = J.call(this, a);c && A(b, a);l(this) && y(b, a);return e;
    });t(Node.prototype, "cloneNode", function (a) {
      a = I.call(this, !!a);this.ownerDocument.__CE_hasRegistry ? B(b, a) : w(b, a);return a;
    });t(Node.prototype, "removeChild", function (a) {
      var c = l(a),
          e = L.call(this, a);c && A(b, a);return e;
    });t(Node.prototype, "replaceChild", function (a, c) {
      if (a instanceof DocumentFragment) {
        var e = Array.prototype.slice.apply(a.childNodes);a = M.call(this, a, c);if (l(this)) for (A(b, c), c = 0; c < e.length; c++) y(b, e[c]);return a;
      }e = l(a);var f = M.call(this, a, c),
          d = l(this);d && A(b, c);e && A(b, a);d && y(b, a);return f;
    });N && N.get ? a(Node.prototype, N) : v(b, function (b) {
      a(b, { enumerable: !0, configurable: !0, get: function () {
          for (var a = [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);return a.join("");
        }, set: function (a) {
          for (; this.firstChild;) L.call(this, this.firstChild);null != a && "" !== a && J.call(this, document.createTextNode(a));
        } });
    });
  };function za(a) {
    function b(b) {
      return function (e) {
        for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];d = [];for (var k = [], h = 0; h < c.length; h++) {
          var n = c[h];n instanceof Element && l(n) && k.push(n);if (n instanceof DocumentFragment) for (n = n.firstChild; n; n = n.nextSibling) d.push(n);else d.push(n);
        }b.apply(this, c);for (c = 0; c < k.length; c++) A(a, k[c]);if (l(this)) for (c = 0; c < d.length; c++) k = d[c], k instanceof Element && y(a, k);
      };
    }var d = Element.prototype;void 0 !== V && (d.before = b(V));void 0 !== V && (d.after = b(pa));void 0 !== qa && t(d, "replaceWith", function (b) {
      for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];d = [];for (var m = [], k = 0; k < c.length; k++) {
        var h = c[k];h instanceof Element && l(h) && m.push(h);if (h instanceof DocumentFragment) for (h = h.firstChild; h; h = h.nextSibling) d.push(h);else d.push(h);
      }k = l(this);qa.apply(this, c);for (c = 0; c < m.length; c++) A(a, m[c]);if (k) for (A(a, this), c = 0; c < d.length; c++) m = d[c], m instanceof Element && y(a, m);
    });void 0 !== ra && t(d, "remove", function () {
      var b = l(this);ra.call(this);b && A(a, this);
    });
  };function Aa() {
    function a(a, b) {
      Object.defineProperty(a, "innerHTML", { enumerable: b.enumerable, configurable: !0, get: b.get, set: function (a) {
          var d = this,
              e = void 0;l(this) && (e = [], q(this, function (a) {
            a !== d && e.push(a);
          }));b.set.call(this, a);if (e) for (var f = 0; f < e.length; f++) {
            var m = e[f];1 === m.__CE_state && c.disconnectedCallback(m);
          }this.ownerDocument.__CE_hasRegistry ? B(c, this) : w(c, this);return a;
        } });
    }function b(a, b) {
      t(a, "insertAdjacentElement", function (a, d) {
        var e = l(d);a = b.call(this, a, d);e && A(c, d);l(a) && y(c, d);return a;
      });
    }
    function d(a, b) {
      function d(a, b) {
        for (var d = []; a !== b; a = a.nextSibling) d.push(a);for (b = 0; b < d.length; b++) B(c, d[b]);
      }t(a, "insertAdjacentHTML", function (a, c) {
        a = a.toLowerCase();if ("beforebegin" === a) {
          var e = this.previousSibling;b.call(this, a, c);d(e || this.parentNode.firstChild, this);
        } else if ("afterbegin" === a) e = this.firstChild, b.call(this, a, c), d(this.firstChild, e);else if ("beforeend" === a) e = this.lastChild, b.call(this, a, c), d(e || this.firstChild, null);else if ("afterend" === a) e = this.nextSibling, b.call(this, a, c), d(this.nextSibling, e);else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      });
    }var c = X;O && t(Element.prototype, "attachShadow", function (a) {
      return this.__CE_shadowRoot = a = O.call(this, a);
    });P && P.get ? a(Element.prototype, P) : W && W.get ? a(HTMLElement.prototype, W) : v(c, function (b) {
      a(b, { enumerable: !0, configurable: !0, get: function () {
          return I.call(this, !0).innerHTML;
        }, set: function (a) {
          var b = "template" === this.localName,
              c = b ? this.content : this,
              d = H.call(document, this.namespaceURI, this.localName);for (d.innerHTML = a; 0 < c.childNodes.length;) L.call(c, c.childNodes[0]);for (a = b ? d.content : d; 0 < a.childNodes.length;) J.call(c, a.childNodes[0]);
        } });
    });t(Element.prototype, "setAttribute", function (a, b) {
      if (1 !== this.__CE_state) return R.call(this, a, b);var d = Q.call(this, a);R.call(this, a, b);b = Q.call(this, a);c.attributeChangedCallback(this, a, d, b, null);
    });t(Element.prototype, "setAttributeNS", function (a, b, d) {
      if (1 !== this.__CE_state) return U.call(this, a, b, d);var e = T.call(this, a, b);U.call(this, a, b, d);d = T.call(this, a, b);c.attributeChangedCallback(this, b, e, d, a);
    });t(Element.prototype, "removeAttribute", function (a) {
      if (1 !== this.__CE_state) return S.call(this, a);var b = Q.call(this, a);S.call(this, a);null !== b && c.attributeChangedCallback(this, a, b, null, null);
    });t(Element.prototype, "removeAttributeNS", function (a, b) {
      if (1 !== this.__CE_state) return ka.call(this, a, b);var d = T.call(this, a, b);ka.call(this, a, b);var e = T.call(this, a, b);d !== e && c.attributeChangedCallback(this, b, d, e, a);
    });ta ? b(HTMLElement.prototype, ta) : la ? b(Element.prototype, la) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");ua ? d(HTMLElement.prototype, ua) : ma ? d(Element.prototype, ma) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Y(c, Element.prototype, { g: na, append: oa });za(c);
  };var Z = window.customElements;if (!Z || Z.forcePolyfill || "function" != typeof Z.define || "function" != typeof Z.get) {
    var X = new u();wa();xa();Y(X, DocumentFragment.prototype, { g: ia, append: ja });ya();Aa();document.__CE_hasRegistry = !0;var customElements = new F(X);Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
  }; /*
     Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
}).call(this);

//# sourceMappingURL=webcomponents-ce.js.map