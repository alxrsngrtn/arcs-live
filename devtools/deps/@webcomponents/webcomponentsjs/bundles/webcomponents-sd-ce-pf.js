/// BareSpecifier=@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf
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
  var r,
      t = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
      ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  };function ca() {
    ca = function () {};t.Symbol || (t.Symbol = da);
  }var da = function () {
    var a = 0;return function (b) {
      return "jscomp_symbol_" + (b || "") + a++;
    };
  }();
  function ea() {
    ca();var a = t.Symbol.iterator;a || (a = t.Symbol.iterator = t.Symbol("iterator"));"function" != typeof Array.prototype[a] && ba(Array.prototype, a, { configurable: !0, writable: !0, value: function () {
        return fa(this);
      } });ea = function () {};
  }function fa(a) {
    var b = 0;return ha(function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }function ha(a) {
    ea();a = { next: a };a[t.Symbol.iterator] = function () {
      return this;
    };return a;
  }function ia(a) {
    ea();var b = a[Symbol.iterator];return b ? b.call(a) : fa(a);
  }
  function ja(a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);return c;
  }var ka;if ("function" == typeof Object.setPrototypeOf) ka = Object.setPrototypeOf;else {
    var la;a: {
      var ma = { Ia: !0 },
          na = {};try {
        na.__proto__ = ma;la = na.Ia;break a;
      } catch (a) {}la = !1;
    }ka = la ? function (a, b) {
      a.__proto__ = b;if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");return a;
    } : null;
  }var oa = ka;function pa() {
    this.f = !1;this.b = null;this.da = void 0;this.a = 1;this.F = 0;this.c = null;
  }
  function qa(a) {
    if (a.f) throw new TypeError("Generator is already running");a.f = !0;
  }pa.prototype.u = function (a) {
    this.da = a;
  };function ra(a, b) {
    a.c = { La: b, Pa: !0 };a.a = a.F;
  }pa.prototype.return = function (a) {
    this.c = { return: a };this.a = this.F;
  };function sa(a, b) {
    a.a = 3;return { value: b };
  }function ta(a) {
    this.a = new pa();this.b = a;
  }function ua(a, b) {
    qa(a.a);var c = a.a.b;if (c) return va(a, "return" in c ? c["return"] : function (a) {
      return { value: a, done: !0 };
    }, b, a.a.return);a.a.return(b);return wa(a);
  }
  function va(a, b, c, d) {
    try {
      var e = b.call(a.a.b, c);if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");if (!e.done) return a.a.f = !1, e;var f = e.value;
    } catch (g) {
      return a.a.b = null, ra(a.a, g), wa(a);
    }a.a.b = null;d.call(a.a, f);return wa(a);
  }function wa(a) {
    for (; a.a.a;) try {
      var b = a.b(a.a);if (b) return a.a.f = !1, { value: b.value, done: !1 };
    } catch (c) {
      a.a.da = void 0, ra(a.a, c);
    }a.a.f = !1;if (a.a.c) {
      b = a.a.c;a.a.c = null;if (b.Pa) throw b.La;return { value: b.return, done: !0 };
    }return { value: void 0, done: !0 };
  }
  function xa(a) {
    this.next = function (b) {
      qa(a.a);a.a.b ? b = va(a, a.a.b.next, b, a.a.u) : (a.a.u(b), b = wa(a));return b;
    };this.throw = function (b) {
      qa(a.a);a.a.b ? b = va(a, a.a.b["throw"], b, a.a.u) : (ra(a.a, b), b = wa(a));return b;
    };this.return = function (b) {
      return ua(a, b);
    };ea();this[Symbol.iterator] = function () {
      return this;
    };
  }function Aa(a, b) {
    b = new xa(new ta(b));oa && oa(b, a.prototype);return b;
  }
  (function () {
    if (!function () {
      var a = document.createEvent("Event");a.initEvent("foo", !0, !0);a.preventDefault();return a.defaultPrevented;
    }()) {
      var a = Event.prototype.preventDefault;Event.prototype.preventDefault = function () {
        this.cancelable && (a.call(this), Object.defineProperty(this, "defaultPrevented", { get: function () {
            return !0;
          }, configurable: !0 }));
      };
    }var b = /Trident/.test(navigator.userAgent);if (!window.Event || b && "function" !== typeof window.Event) {
      var c = window.Event;window.Event = function (a, b) {
        b = b || {};var c = document.createEvent("Event");
        c.initEvent(a, !!b.bubbles, !!b.cancelable);return c;
      };if (c) {
        for (var d in c) window.Event[d] = c[d];window.Event.prototype = c.prototype;
      }
    }if (!window.CustomEvent || b && "function" !== typeof window.CustomEvent) window.CustomEvent = function (a, b) {
      b = b || {};var c = document.createEvent("CustomEvent");c.initCustomEvent(a, !!b.bubbles, !!b.cancelable, b.detail);return c;
    }, window.CustomEvent.prototype = window.Event.prototype;if (!window.MouseEvent || b && "function" !== typeof window.MouseEvent) {
      b = window.MouseEvent;window.MouseEvent = function (a, b) {
        b = b || {};var c = document.createEvent("MouseEvent");c.initMouseEvent(a, !!b.bubbles, !!b.cancelable, b.view || window, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);return c;
      };if (b) for (d in b) window.MouseEvent[d] = b[d];window.MouseEvent.prototype = b.prototype;
    }Array.from || (Array.from = function (a) {
      return [].slice.call(a);
    });Object.assign || (Object.assign = function (a, b) {
      for (var c = [].slice.call(arguments, 1), d = 0, e; d < c.length; d++) if (e = c[d]) for (var f = a, n = e, p = Object.getOwnPropertyNames(n), G = 0; G < p.length; G++) e = p[G], f[e] = n[e];return a;
    });
  })();(function () {
    function a() {}function b(a, b) {
      if (!a.childNodes.length) return [];switch (a.nodeType) {case Node.DOCUMENT_NODE:
          return Q.call(a, b);case Node.DOCUMENT_FRAGMENT_NODE:
          return zb.call(a, b);default:
          return x.call(a, b);}
    }var c = "undefined" === typeof HTMLTemplateElement,
        d = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment),
        e = !1;/Trident/.test(navigator.userAgent) && function () {
      function a(a, b) {
        if (a instanceof DocumentFragment) for (var d; d = a.firstChild;) c.call(this, d, b);else c.call(this, a, b);return a;
      }e = !0;var b = Node.prototype.cloneNode;Node.prototype.cloneNode = function (a) {
        a = b.call(this, a);this instanceof DocumentFragment && (a.__proto__ = DocumentFragment.prototype);return a;
      };DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;Object.defineProperties(DocumentFragment.prototype, { nodeType: { get: function () {
            return Node.DOCUMENT_FRAGMENT_NODE;
          }, configurable: !0 }, localName: { get: function () {},
          configurable: !0 }, nodeName: { get: function () {
            return "#document-fragment";
          }, configurable: !0 } });var c = Node.prototype.insertBefore;Node.prototype.insertBefore = a;var d = Node.prototype.appendChild;Node.prototype.appendChild = function (b) {
        b instanceof DocumentFragment ? a.call(this, b, null) : d.call(this, b);return b;
      };var f = Node.prototype.removeChild,
          g = Node.prototype.replaceChild;Node.prototype.replaceChild = function (b, c) {
        b instanceof DocumentFragment ? (a.call(this, b, c), f.call(this, c)) : g.call(this, b, c);return c;
      };Document.prototype.createDocumentFragment = function () {
        var a = this.createElement("df");a.__proto__ = DocumentFragment.prototype;return a;
      };var h = Document.prototype.importNode;Document.prototype.importNode = function (a, b) {
        b = h.call(this, a, b || !1);a instanceof DocumentFragment && (b.__proto__ = DocumentFragment.prototype);return b;
      };
    }();var f = Node.prototype.cloneNode,
        g = Document.prototype.createElement,
        h = Document.prototype.importNode,
        k = Node.prototype.removeChild,
        l = Node.prototype.appendChild,
        n = Node.prototype.replaceChild,
        p = DOMParser.prototype.parseFromString,
        G = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML") || { get: function () {
        return this.innerHTML;
      }, set: function (a) {
        this.innerHTML = a;
      } },
        u = Object.getOwnPropertyDescriptor(window.Node.prototype, "childNodes") || { get: function () {
        return this.childNodes;
      } },
        x = Element.prototype.querySelectorAll,
        Q = Document.prototype.querySelectorAll,
        zb = DocumentFragment.prototype.querySelectorAll,
        Ab = function () {
      if (!c) {
        var a = document.createElement("template"),
            b = document.createElement("template");b.content.appendChild(document.createElement("div"));
        a.content.appendChild(b);a = a.cloneNode(!0);return 0 === a.content.childNodes.length || 0 === a.content.firstChild.content.childNodes.length || d;
      }
    }();if (c) {
      var T = document.implementation.createHTMLDocument("template"),
          Ka = !0,
          q = document.createElement("style");q.textContent = "template{display:none;}";var ya = document.head;ya.insertBefore(q, ya.firstElementChild);a.prototype = Object.create(HTMLElement.prototype);var Z = !document.createElement("div").hasOwnProperty("innerHTML");a.R = function (b) {
        if (!b.content && b.namespaceURI === document.documentElement.namespaceURI) {
          b.content = T.createDocumentFragment();for (var c; c = b.firstChild;) l.call(b.content, c);if (Z) b.__proto__ = a.prototype;else if (b.cloneNode = function (b) {
            return a.b(this, b);
          }, Ka) try {
            m(b), y(b);
          } catch (hh) {
            Ka = !1;
          }a.a(b.content);
        }
      };var X = { option: ["select"], thead: ["table"], col: ["colgroup", "table"], tr: ["tbody", "table"], th: ["tr", "tbody", "table"], td: ["tr", "tbody", "table"] },
          m = function (b) {
        Object.defineProperty(b, "innerHTML", { get: function () {
            return aa(this);
          }, set: function (b) {
            var c = X[(/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(b) || ["", ""])[1].toLowerCase()];if (c) for (var d = 0; d < c.length; d++) b = "<" + c[d] + ">" + b + "</" + c[d] + ">";T.body.innerHTML = b;for (a.a(T); this.content.firstChild;) k.call(this.content, this.content.firstChild);b = T.body;if (c) for (d = 0; d < c.length; d++) b = b.lastChild;for (; b.firstChild;) l.call(this.content, b.firstChild);
          }, configurable: !0 });
      },
          y = function (a) {
        Object.defineProperty(a, "outerHTML", { get: function () {
            return "<template>" + this.innerHTML + "</template>";
          }, set: function (a) {
            if (this.parentNode) {
              T.body.innerHTML = a;for (a = this.ownerDocument.createDocumentFragment(); T.body.firstChild;) l.call(a, T.body.firstChild);n.call(this.parentNode, a, this);
            } else throw Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
          }, configurable: !0 });
      };m(a.prototype);y(a.prototype);a.a = function (c) {
        c = b(c, "template");for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) a.R(f);
      };document.addEventListener("DOMContentLoaded", function () {
        a.a(document);
      });Document.prototype.createElement = function () {
        var b = g.apply(this, arguments);"template" === b.localName && a.R(b);return b;
      };DOMParser.prototype.parseFromString = function () {
        var b = p.apply(this, arguments);a.a(b);return b;
      };Object.defineProperty(HTMLElement.prototype, "innerHTML", { get: function () {
          return aa(this);
        }, set: function (b) {
          G.set.call(this, b);a.a(this);
        }, configurable: !0, enumerable: !0 });var Y = /[&\u00A0"]/g,
          Bb = /[&\u00A0<>]/g,
          La = function (a) {
        switch (a) {case "&":
            return "&amp;";case "<":
            return "&lt;";case ">":
            return "&gt;";case '"':
            return "&quot;";case "\u00a0":
            return "&nbsp;";}
      };q = function (a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;return b;
      };var za = q("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
          Ma = q("style script xmp iframe noembed noframes plaintext noscript".split(" ")),
          aa = function (a, b) {
        "template" === a.localName && (a = a.content);for (var c = "", d = b ? b(a) : u.get.call(a), e = 0, f = d.length, g; e < f && (g = d[e]); e++) {
          a: {
            var h = g;var k = a;var l = b;switch (h.nodeType) {case Node.ELEMENT_NODE:
                for (var n = h.localName, m = "<" + n, p = h.attributes, x = 0; k = p[x]; x++) m += " " + k.name + '="' + k.value.replace(Y, La) + '"';m += ">";h = za[n] ? m : m + aa(h, l) + "</" + n + ">";break a;case Node.TEXT_NODE:
                h = h.data;h = k && Ma[k.localName] ? h : h.replace(Bb, La);break a;
              case Node.COMMENT_NODE:
                h = "\x3c!--" + h.data + "--\x3e";break a;default:
                throw window.console.error(h), Error("not implemented");}
          }c += h;
        }return c;
      };
    }if (c || Ab) {
      a.b = function (a, b) {
        var c = f.call(a, !1);this.R && this.R(c);b && (l.call(c.content, f.call(a.content, !0)), Na(c.content, a.content));return c;
      };var Na = function (c, d) {
        if (d.querySelectorAll && (d = b(d, "template"), 0 !== d.length)) {
          c = b(c, "template");for (var e = 0, f = c.length, g, h; e < f; e++) h = d[e], g = c[e], a && a.R && a.R(h), n.call(g.parentNode, jf.call(h, !0), g);
        }
      },
          jf = Node.prototype.cloneNode = function (b) {
        if (!e && d && this instanceof DocumentFragment) {
          if (b) var c = kf.call(this.ownerDocument, this, !0);else return this.ownerDocument.createDocumentFragment();
        } else this.nodeType === Node.ELEMENT_NODE && "template" === this.localName && this.namespaceURI == document.documentElement.namespaceURI ? c = a.b(this, b) : c = f.call(this, b);b && Na(c, this);return c;
      },
          kf = Document.prototype.importNode = function (c, d) {
        d = d || !1;if ("template" === c.localName) return a.b(c, d);var e = h.call(this, c, d);if (d) {
          Na(e, c);c = b(e, 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');
          for (var f, k = 0; k < c.length; k++) {
            f = c[k];d = g.call(document, "script");d.textContent = f.textContent;for (var l = f.attributes, m = 0, p; m < l.length; m++) p = l[m], d.setAttribute(p.name, p.value);n.call(f.parentNode, d, f);
          }
        }return e;
      };
    }c && (window.HTMLTemplateElement = a);
  })();var Ba = setTimeout;function Ca() {}function Da(a, b) {
    return function () {
      a.apply(b, arguments);
    };
  }function v(a) {
    if (!(this instanceof v)) throw new TypeError("Promises must be constructed via new");if ("function" !== typeof a) throw new TypeError("not a function");this.I = 0;this.sa = !1;this.w = void 0;this.U = [];Ea(a, this);
  }
  function Fa(a, b) {
    for (; 3 === a.I;) a = a.w;0 === a.I ? a.U.push(b) : (a.sa = !0, Ga(function () {
      var c = 1 === a.I ? b.Ra : b.Sa;if (null === c) (1 === a.I ? Ha : Ia)(b.oa, a.w);else {
        try {
          var d = c(a.w);
        } catch (e) {
          Ia(b.oa, e);return;
        }Ha(b.oa, d);
      }
    }));
  }function Ha(a, b) {
    try {
      if (b === a) throw new TypeError("A promise cannot be resolved with itself.");if (b && ("object" === typeof b || "function" === typeof b)) {
        var c = b.then;if (b instanceof v) {
          a.I = 3;a.w = b;Ja(a);return;
        }if ("function" === typeof c) {
          Ea(Da(c, b), a);return;
        }
      }a.I = 1;a.w = b;Ja(a);
    } catch (d) {
      Ia(a, d);
    }
  }
  function Ia(a, b) {
    a.I = 2;a.w = b;Ja(a);
  }function Ja(a) {
    2 === a.I && 0 === a.U.length && Ga(function () {
      a.sa || "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", a.w);
    });for (var b = 0, c = a.U.length; b < c; b++) Fa(a, a.U[b]);a.U = null;
  }function Oa(a, b, c) {
    this.Ra = "function" === typeof a ? a : null;this.Sa = "function" === typeof b ? b : null;this.oa = c;
  }function Ea(a, b) {
    var c = !1;try {
      a(function (a) {
        c || (c = !0, Ha(b, a));
      }, function (a) {
        c || (c = !0, Ia(b, a));
      });
    } catch (d) {
      c || (c = !0, Ia(b, d));
    }
  }
  v.prototype["catch"] = function (a) {
    return this.then(null, a);
  };v.prototype.then = function (a, b) {
    var c = new this.constructor(Ca);Fa(this, new Oa(a, b, c));return c;
  };v.prototype["finally"] = function (a) {
    var b = this.constructor;return this.then(function (c) {
      return b.resolve(a()).then(function () {
        return c;
      });
    }, function (c) {
      return b.resolve(a()).then(function () {
        return b.reject(c);
      });
    });
  };
  function Pa(a) {
    return new v(function (b, c) {
      function d(a, g) {
        try {
          if (g && ("object" === typeof g || "function" === typeof g)) {
            var h = g.then;if ("function" === typeof h) {
              h.call(g, function (b) {
                d(a, b);
              }, c);return;
            }
          }e[a] = g;0 === --f && b(e);
        } catch (n) {
          c(n);
        }
      }if (!a || "undefined" === typeof a.length) throw new TypeError("Promise.all accepts an array");var e = Array.prototype.slice.call(a);if (0 === e.length) return b([]);for (var f = e.length, g = 0; g < e.length; g++) d(g, e[g]);
    });
  }
  function Qa(a) {
    return a && "object" === typeof a && a.constructor === v ? a : new v(function (b) {
      b(a);
    });
  }function Ra(a) {
    return new v(function (b, c) {
      c(a);
    });
  }function Sa(a) {
    return new v(function (b, c) {
      for (var d = 0, e = a.length; d < e; d++) a[d].then(b, c);
    });
  }var Ga = "function" === typeof setImmediate && function (a) {
    setImmediate(a);
  } || function (a) {
    Ba(a, 0);
  }; /*
     Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
  if (!window.Promise) {
    window.Promise = v;v.prototype.then = v.prototype.then;v.all = Pa;v.race = Sa;v.resolve = Qa;v.reject = Ra;var Ta = document.createTextNode(""),
        Ua = [];new MutationObserver(function () {
      for (var a = Ua.length, b = 0; b < a; b++) Ua[b]();Ua.splice(0, a);
    }).observe(Ta, { characterData: !0 });Ga = function (a) {
      Ua.push(a);Ta.textContent = 0 < Ta.textContent.length ? "" : "a";
    };
  }; /*
     Copyright (C) 2015 by WebReflection
     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:
     The above copyright notice and this permission notice shall be included in
     all copies or substantial portions of the Software.
     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     THE SOFTWARE.
     */
  (function (a, b) {
    if (!(b in a)) {
      var c = typeof global === typeof c ? window : global,
          d = 0,
          e = "" + Math.random(),
          f = "__\u0001symbol@@" + e,
          g = a.getOwnPropertyNames,
          h = a.getOwnPropertyDescriptor,
          k = a.create,
          l = a.keys,
          n = a.freeze || a,
          p = a.defineProperty,
          G = a.defineProperties,
          u = h(a, "getOwnPropertyNames"),
          x = a.prototype,
          Q = x.hasOwnProperty,
          zb = x.propertyIsEnumerable,
          Ab = x.toString,
          T = function (a, b, c) {
        Q.call(a, f) || p(a, f, { enumerable: !1, configurable: !1, writable: !1, value: {} });a[f]["@@" + b] = c;
      },
          Ka = function (a, b) {
        var c = k(a);g(b).forEach(function (a) {
          X.call(b, a) && za(c, a, b[a]);
        });return c;
      },
          q = function () {},
          ya = function (a) {
        return a != f && !Q.call(Y, a);
      },
          Z = function (a) {
        return a != f && Q.call(Y, a);
      },
          X = function (a) {
        var b = "" + a;return Z(b) ? Q.call(this, b) && this[f]["@@" + b] : zb.call(this, a);
      },
          m = function (b) {
        p(x, b, { enumerable: !1, configurable: !0, get: q, set: function (a) {
            aa(this, b, { enumerable: !1, configurable: !0, writable: !0, value: a });T(this, b, !0);
          } });return n(Y[b] = p(a(b), "constructor", Bb));
      },
          y = function (a) {
        if (this && this !== c) throw new TypeError("Symbol is not a constructor");return m("__\u0001symbol:".concat(a || "", e, ++d));
      },
          Y = k(null),
          Bb = { value: y },
          La = function (a) {
        return Y[a];
      },
          za = function (a, b, c) {
        var d = "" + b;if (Z(d)) {
          b = aa;if (c.enumerable) {
            var e = k(c);e.enumerable = !1;
          } else e = c;b(a, d, e);T(a, d, !!c.enumerable);
        } else p(a, b, c);return a;
      },
          Ma = function (a) {
        return g(a).filter(Z).map(La);
      };u.value = za;p(a, "defineProperty", u);u.value = Ma;p(a, b, u);u.value = function (a) {
        return g(a).filter(ya);
      };p(a, "getOwnPropertyNames", u);u.value = function (a, b) {
        var c = Ma(b);c.length ? l(b).concat(c).forEach(function (c) {
          X.call(b, c) && za(a, c, b[c]);
        }) : G(a, b);
        return a;
      };p(a, "defineProperties", u);u.value = X;p(x, "propertyIsEnumerable", u);u.value = y;p(c, "Symbol", u);u.value = function (a) {
        a = "__\u0001symbol:".concat("__\u0001symbol:", a, e);return a in x ? Y[a] : m(a);
      };p(y, "for", u);u.value = function (a) {
        if (ya(a)) throw new TypeError(a + " is not a symbol");return Q.call(Y, a) ? a.slice(20, -e.length) : void 0;
      };p(y, "keyFor", u);u.value = function (a, b) {
        var c = h(a, b);c && Z(b) && (c.enumerable = X.call(a, b));return c;
      };p(a, "getOwnPropertyDescriptor", u);u.value = function (a, b) {
        return 1 === arguments.length ? k(a) : Ka(a, b);
      };p(a, "create", u);u.value = function () {
        var a = Ab.call(this);return "[object String]" === a && Z(this) ? "[object Symbol]" : a;
      };p(x, "toString", u);try {
        var aa = k(p({}, "__\u0001symbol:", { get: function () {
            return p(this, "__\u0001symbol:", { value: !1 })["__\u0001symbol:"];
          } }))["__\u0001symbol:"] || p;
      } catch (Na) {
        aa = function (a, b, c) {
          var d = h(x, b);delete x[b];p(a, b, c);p(x, b, d);
        };
      }
    }
  })(Object, "getOwnPropertySymbols");
  (function (a) {
    var b = a.defineProperty,
        c = a.prototype,
        d = c.toString,
        e;"iterator match replace search split hasInstance isConcatSpreadable unscopables species toPrimitive toStringTag".split(" ").forEach(function (f) {
      if (!(f in Symbol)) switch (b(Symbol, f, { value: Symbol(f) }), f) {case "toStringTag":
          e = a.getOwnPropertyDescriptor(c, "toString"), e.value = function () {
            var a = d.call(this),
                b = this[Symbol.toStringTag];return "undefined" === typeof b ? a : "[object " + b + "]";
          }, b(c, "toString", e);}
    });
  })(Object, Symbol);
  (function (a, b, c) {
    function d() {
      return this;
    }b[a] || (b[a] = function () {
      var b = 0,
          c = this,
          g = { next: function () {
          var a = c.length <= b;return a ? { done: a } : { done: a, value: c[b++] };
        } };g[a] = d;return g;
    });c[a] || (c[a] = function () {
      var b = String.fromCodePoint,
          c = this,
          g = 0,
          h = c.length,
          k = { next: function () {
          var a = h <= g,
              d = a ? "" : b(c.codePointAt(g));g += d.length;return a ? { done: a } : { done: a, value: d };
        } };k[a] = d;return k;
    });
  })(Symbol.iterator, Array.prototype, String.prototype); /*
                                                          Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
                                                          This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
                                                          The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
                                                          The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
                                                          Code distributed by Google as part of the polymer project is also
                                                          subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
                                                          */
  var Va = Object.prototype.toString;Object.prototype.toString = function () {
    return void 0 === this ? "[object Undefined]" : null === this ? "[object Null]" : Va.call(this);
  };Object.keys = function (a) {
    return Object.getOwnPropertyNames(a).filter(function (b) {
      return (b = Object.getOwnPropertyDescriptor(a, b)) && b.enumerable;
    });
  };var Wa = window.Symbol.iterator;
  String.prototype[Wa] && String.prototype.codePointAt || (String.prototype[Wa] = function Xa() {
    var b,
        c = this;return Aa(Xa, function (d) {
      1 == d.a && (b = 0);if (3 != d.a) return b < c.length ? d = sa(d, c[b]) : (d.a = 0, d = void 0), d;b++;d.a = 2;
    });
  });Set.prototype[Wa] || (Set.prototype[Wa] = function Ya() {
    var b,
        c = this,
        d;return Aa(Ya, function (e) {
      1 == e.a && (b = [], c.forEach(function (c) {
        b.push(c);
      }), d = 0);if (3 != e.a) return d < b.length ? e = sa(e, b[d]) : (e.a = 0, e = void 0), e;d++;e.a = 2;
    });
  });
  Map.prototype[Wa] || (Map.prototype[Wa] = function Za() {
    var b,
        c = this,
        d;return Aa(Za, function (e) {
      1 == e.a && (b = [], c.forEach(function (c, d) {
        b.push([d, c]);
      }), d = 0);if (3 != e.a) return d < b.length ? e = sa(e, b[d]) : (e.a = 0, e = void 0), e;d++;e.a = 2;
    });
  }); /*
      Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
      This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
      The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
      The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
      Code distributed by Google as part of the polymer project is also
      subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
      */
  window.WebComponents = window.WebComponents || { flags: {} };var $a = document.querySelector('script[src*="webcomponents-bundle"]'),
      ab = /wc-(.+)/,
      w = {};if (!w.noOpts) {
    location.search.slice(1).split("&").forEach(function (a) {
      a = a.split("=");var b;a[0] && (b = a[0].match(ab)) && (w[b[1]] = a[1] || !0);
    });if ($a) for (var bb = 0, cb = void 0; cb = $a.attributes[bb]; bb++) "src" !== cb.name && (w[cb.name] = cb.value || !0);if (w.log && w.log.split) {
      var db = w.log.split(",");w.log = {};db.forEach(function (a) {
        w.log[a] = !0;
      });
    } else w.log = {};
  }
  window.WebComponents.flags = w;var eb = w.shadydom;eb && (window.ShadyDOM = window.ShadyDOM || {}, window.ShadyDOM.force = eb);var fb = w.register || w.ce;fb && window.customElements && (window.customElements.forcePolyfill = fb); /*
                                                                                                                                                                                                                                        Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
                                                                                                                                                                                                                                        This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
                                                                                                                                                                                                                                        The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
                                                                                                                                                                                                                                        The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
                                                                                                                                                                                                                                        Code distributed by Google as part of the polymer project is also
                                                                                                                                                                                                                                        subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
                                                                                                                                                                                                                                        */
  function gb() {
    this.wa = this.root = null;this.ca = !1;this.N = this.$ = this.ka = this.assignedSlot = this.assignedNodes = this.T = null;this.childNodes = this.nextSibling = this.previousSibling = this.lastChild = this.firstChild = this.parentNode = this.V = void 0;this.qa = this.ra = !1;this.Z = {};
  }gb.prototype.toJSON = function () {
    return {};
  };function z(a) {
    a.__shady || (a.__shady = new gb());return a.__shady;
  }function A(a) {
    return a && a.__shady;
  };var B = window.ShadyDOM || {};B.Na = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);var hb = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");B.D = !!(hb && hb.configurable && hb.get);B.ma = B.force || !B.Na;B.S = B.noPatch || !1;B.va = B.preferPerformance;function ib(a) {
    return (a = A(a)) && void 0 !== a.firstChild;
  }function C(a) {
    return "ShadyRoot" === a.Fa;
  }function jb(a) {
    return (a = (a = A(a)) && a.root) && kb(a);
  }
  var lb = Element.prototype,
      mb = lb.matches || lb.matchesSelector || lb.mozMatchesSelector || lb.msMatchesSelector || lb.oMatchesSelector || lb.webkitMatchesSelector,
      nb = document.createTextNode(""),
      ob = 0,
      pb = [];new MutationObserver(function () {
    for (; pb.length;) try {
      pb.shift()();
    } catch (a) {
      throw nb.textContent = ob++, a;
    }
  }).observe(nb, { characterData: !0 });function qb(a) {
    pb.push(a);nb.textContent = ob++;
  }var rb = !!document.contains;function sb(a, b) {
    for (; b;) {
      if (b == a) return !0;b = b.__shady_parentNode;
    }return !1;
  }
  function tb(a) {
    for (var b = a.length - 1; 0 <= b; b--) {
      var c = a[b],
          d = c.getAttribute("id") || c.getAttribute("name");d && "length" !== d && isNaN(d) && (a[d] = c);
    }a.item = function (b) {
      return a[b];
    };a.namedItem = function (b) {
      if ("length" !== b && isNaN(b) && a[b]) return a[b];for (var c = ia(a), d = c.next(); !d.done; d = c.next()) if (d = d.value, (d.getAttribute("id") || d.getAttribute("name")) == b) return d;return null;
    };return a;
  }
  function D(a, b, c, d) {
    c = void 0 === c ? "" : c;for (var e in b) {
      var f = b[e];if (!(d && 0 <= d.indexOf(e))) {
        f.configurable = !0;var g = c + e;if (f.value) a[g] = f.value;else try {
          Object.defineProperty(a, g, f);
        } catch (h) {}
      }
    }
  }function E(a) {
    var b = {};Object.getOwnPropertyNames(a).forEach(function (c) {
      b[c] = Object.getOwnPropertyDescriptor(a, c);
    });return b;
  };var ub = [],
      vb;function wb(a) {
    vb || (vb = !0, qb(xb));ub.push(a);
  }function xb() {
    vb = !1;for (var a = !!ub.length; ub.length;) ub.shift()();return a;
  }xb.list = ub;function yb() {
    this.a = !1;this.addedNodes = [];this.removedNodes = [];this.ba = new Set();
  }function Cb(a) {
    a.a || (a.a = !0, qb(function () {
      a.flush();
    }));
  }yb.prototype.flush = function () {
    if (this.a) {
      this.a = !1;var a = this.takeRecords();a.length && this.ba.forEach(function (b) {
        b(a);
      });
    }
  };yb.prototype.takeRecords = function () {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }];this.addedNodes = [];this.removedNodes = [];return a;
    }return [];
  };
  function Db(a, b) {
    var c = z(a);c.T || (c.T = new yb());c.T.ba.add(b);var d = c.T;return { Ea: b, P: d, Ga: a, takeRecords: function () {
        return d.takeRecords();
      } };
  }function Eb(a) {
    var b = a && a.P;b && (b.ba.delete(a.Ea), b.ba.size || (z(a.Ga).T = null));
  }
  function Fb(a, b) {
    var c = b.getRootNode();return a.map(function (a) {
      var b = c === a.target.getRootNode();if (b && a.addedNodes) {
        if (b = Array.from(a.addedNodes).filter(function (a) {
          return c === a.getRootNode();
        }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", { value: b, configurable: !0 }), a;
      } else if (b) return a;
    }).filter(function (a) {
      return a;
    });
  };var Gb = /[&\u00A0"]/g,
      Hb = /[&\u00A0<>]/g;function Ib(a) {
    switch (a) {case "&":
        return "&amp;";case "<":
        return "&lt;";case ">":
        return "&gt;";case '"':
        return "&quot;";case "\u00a0":
        return "&nbsp;";}
  }function Jb(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;return b;
  }var Kb = Jb("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
      Lb = Jb("style script xmp iframe noembed noframes plaintext noscript".split(" "));
  function Mb(a, b) {
    "template" === a.localName && (a = a.content);for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g = void 0; e < f && (g = d[e]); e++) {
      a: {
        var h = g;var k = a,
            l = b;switch (h.nodeType) {case Node.ELEMENT_NODE:
            k = h.localName;for (var n = "<" + k, p = h.attributes, G = 0, u; u = p[G]; G++) n += " " + u.name + '="' + u.value.replace(Gb, Ib) + '"';n += ">";h = Kb[k] ? n : n + Mb(h, l) + "</" + k + ">";break a;case Node.TEXT_NODE:
            h = h.data;h = k && Lb[k.localName] ? h : h.replace(Hb, Ib);break a;case Node.COMMENT_NODE:
            h = "\x3c!--" + h.data + "--\x3e";break a;default:
            throw window.console.error(h), Error("not implemented");}
      }c += h;
    }return c;
  };var Nb = B.D,
      Ob = { querySelector: function (a) {
      return this.__shady_native_querySelector(a);
    }, querySelectorAll: function (a) {
      return this.__shady_native_querySelectorAll(a);
    } },
      Pb = {};function Qb(a) {
    Pb[a] = function (b) {
      return b["__shady_native_" + a];
    };
  }function Rb(a, b) {
    D(a, b, "__shady_native_");for (var c in b) Qb(c);
  }function F(a, b) {
    b = void 0 === b ? [] : b;for (var c = 0; c < b.length; c++) {
      var d = b[c],
          e = Object.getOwnPropertyDescriptor(a, d);e && (Object.defineProperty(a, "__shady_native_" + d, e), e.value ? Ob[d] || (Ob[d] = e.value) : Qb(d));
    }
  }
  var H = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
      I = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1),
      Sb = document.implementation.createHTMLDocument("inert");function Tb(a) {
    for (var b; b = a.__shady_native_firstChild;) a.__shady_native_removeChild(b);
  }var Ub = ["firstElementChild", "lastElementChild", "children", "childElementCount"],
      Vb = ["querySelector", "querySelectorAll"];
  function Wb() {
    var a = ["dispatchEvent", "addEventListener", "removeEventListener"];window.EventTarget ? F(window.EventTarget.prototype, a) : (F(Node.prototype, a), F(Window.prototype, a));Nb ? F(Node.prototype, "parentNode firstChild lastChild previousSibling nextSibling childNodes parentElement textContent".split(" ")) : Rb(Node.prototype, { parentNode: { get: function () {
          H.currentNode = this;return H.parentNode();
        } }, firstChild: { get: function () {
          H.currentNode = this;return H.firstChild();
        } }, lastChild: { get: function () {
          H.currentNode = this;return H.lastChild();
        } }, previousSibling: { get: function () {
          H.currentNode = this;return H.previousSibling();
        } }, nextSibling: { get: function () {
          H.currentNode = this;return H.nextSibling();
        } }, childNodes: { get: function () {
          var a = [];H.currentNode = this;for (var c = H.firstChild(); c;) a.push(c), c = H.nextSibling();return a;
        } }, parentElement: { get: function () {
          I.currentNode = this;return I.parentNode();
        } }, textContent: { get: function () {
          switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              for (var a = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1), c = "", d; d = a.nextNode();) c += d.nodeValue;return c;default:
              return this.nodeValue;}
        }, set: function (a) {
          if ("undefined" === typeof a || null === a) a = "";switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              Tb(this);(0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_native_insertBefore(document.createTextNode(a), void 0);break;default:
              this.nodeValue = a;}
        } } });F(Node.prototype, "appendChild insertBefore removeChild replaceChild cloneNode contains".split(" "));
    a = { firstElementChild: { get: function () {
          I.currentNode = this;return I.firstChild();
        } }, lastElementChild: { get: function () {
          I.currentNode = this;return I.lastChild();
        } }, children: { get: function () {
          var a = [];I.currentNode = this;for (var c = I.firstChild(); c;) a.push(c), c = I.nextSibling();return tb(a);
        } }, childElementCount: { get: function () {
          return this.children ? this.children.length : 0;
        } } };Nb ? (F(Element.prototype, Ub), F(Element.prototype, ["previousElementSibling", "nextElementSibling", "innerHTML"]), Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && F(HTMLElement.prototype, ["children"]), Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && F(HTMLElement.prototype, ["innerHTML"])) : (Rb(Element.prototype, a), Rb(Element.prototype, { previousElementSibling: { get: function () {
          I.currentNode = this;return I.previousSibling();
        } }, nextElementSibling: { get: function () {
          I.currentNode = this;return I.nextSibling();
        } }, innerHTML: { get: function () {
          return Mb(this, function (a) {
            return a.__shady_native_childNodes;
          });
        }, set: function (a) {
          var b = "template" === this.localName ? this.content : this;Tb(b);var d = this.localName || "div";d = this.namespaceURI && this.namespaceURI !== Sb.namespaceURI ? Sb.createElementNS(this.namespaceURI, d) : Sb.createElement(d);d.innerHTML = a;for (a = "template" === this.localName ? d.content : d; d = a.__shady_native_firstChild;) b.__shady_native_insertBefore(d, void 0);
        } } }));F(Element.prototype, "setAttribute getAttribute hasAttribute removeAttribute focus blur".split(" "));F(Element.prototype, Vb);F(HTMLElement.prototype, ["focus", "blur", "contains"]);Nb && F(HTMLElement.prototype, ["parentElement", "children", "innerHTML"]);window.HTMLTemplateElement && F(window.HTMLTemplateElement.prototype, ["innerHTML"]);Nb ? F(DocumentFragment.prototype, Ub) : Rb(DocumentFragment.prototype, a);F(DocumentFragment.prototype, Vb);Nb ? (F(Document.prototype, Ub), F(Document.prototype, ["activeElement"])) : Rb(Document.prototype, a);F(Document.prototype, ["importNode", "getElementById"]);F(Document.prototype, Vb);
  };var Xb = E({ get childNodes() {
      return this.__shady_childNodes;
    }, get firstChild() {
      return this.__shady_firstChild;
    }, get lastChild() {
      return this.__shady_lastChild;
    }, get textContent() {
      return this.__shady_textContent;
    }, set textContent(a) {
      this.__shady_textContent = a;
    }, get childElementCount() {
      return this.__shady_childElementCount;
    }, get children() {
      return this.__shady_children;
    }, get firstElementChild() {
      return this.__shady_firstElementChild;
    }, get lastElementChild() {
      return this.__shady_lastElementChild;
    }, get innerHTML() {
      return this.__shady_innerHTML;
    },
    set innerHTML(a) {
      return this.__shady_innerHTML = a;
    }, get shadowRoot() {
      return this.__shady_shadowRoot;
    } }),
      Yb = E({ get parentElement() {
      return this.__shady_parentElement;
    }, get parentNode() {
      return this.__shady_parentNode;
    }, get nextSibling() {
      return this.__shady_nextSibling;
    }, get previousSibling() {
      return this.__shady_previousSibling;
    }, get nextElementSibling() {
      return this.__shady_nextElementSibling;
    }, get previousElementSibling() {
      return this.__shady_previousElementSibling;
    }, get className() {
      return this.__shady_className;
    },
    set className(a) {
      return this.__shady_className = a;
    } }),
      Zb;for (Zb in Xb) Xb[Zb].enumerable = !1;for (var $b in Yb) Yb[$b].enumerable = !1;var ac = B.D || B.S,
      bc = ac ? function () {} : function (a) {
    var b = z(a);b.ra || (b.ra = !0, D(a, Yb));
  },
      cc = ac ? function () {} : function (a) {
    var b = z(a);b.qa || (b.qa = !0, D(a, Xb));
  };var dc = "__eventWrappers" + Date.now(),
      ec = function () {
    var a = Object.getOwnPropertyDescriptor(Event.prototype, "composed");return a ? function (b) {
      return a.get.call(b);
    } : null;
  }(),
      fc = function () {
    function a() {}var b = !1,
        c = { get capture() {
        b = !0;
      } };window.addEventListener("test", a, c);window.removeEventListener("test", a, c);return b;
  }();function gc(a) {
    if (a && "object" === typeof a) {
      var b = !!a.capture;var c = !!a.once;var d = !!a.passive;var e = a.O;
    } else b = !!a, d = c = !1;return { xa: e, capture: b, once: c, passive: d, ua: fc ? a : b };
  }
  var hc = { blur: !0, focus: !0, focusin: !0, focusout: !0, click: !0, dblclick: !0, mousedown: !0, mouseenter: !0, mouseleave: !0, mousemove: !0, mouseout: !0, mouseover: !0, mouseup: !0, wheel: !0, beforeinput: !0, input: !0, keydown: !0, keyup: !0, compositionstart: !0, compositionupdate: !0, compositionend: !0, touchstart: !0, touchend: !0, touchmove: !0, touchcancel: !0, pointerover: !0, pointerenter: !0, pointerdown: !0, pointermove: !0, pointerup: !0, pointercancel: !0, pointerout: !0, pointerleave: !0, gotpointercapture: !0, lostpointercapture: !0, dragstart: !0,
    drag: !0, dragenter: !0, dragleave: !0, dragover: !0, drop: !0, dragend: !0, DOMActivate: !0, DOMFocusIn: !0, DOMFocusOut: !0, keypress: !0 },
      ic = { DOMAttrModified: !0, DOMAttributeNameChanged: !0, DOMCharacterDataModified: !0, DOMElementNameChanged: !0, DOMNodeInserted: !0, DOMNodeInsertedIntoDocument: !0, DOMNodeRemoved: !0, DOMNodeRemovedFromDocument: !0, DOMSubtreeModified: !0 };function jc(a) {
    return a instanceof Node ? a.__shady_getRootNode() : a;
  }
  function kc(a, b) {
    var c = [],
        d = a;for (a = jc(a); d;) c.push(d), d.__shady_assignedSlot ? d = d.__shady_assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d = d.host : d = d.__shady_parentNode;c[c.length - 1] === document && c.push(window);return c;
  }function lc(a) {
    a.__composedPath || (a.__composedPath = kc(a.target, !0));return a.__composedPath;
  }function mc(a, b) {
    if (!C) return a;a = kc(a, !0);for (var c = 0, d, e = void 0, f, g = void 0; c < b.length; c++) if (d = b[c], f = jc(d), f !== e && (g = a.indexOf(f), e = f), !C(f) || -1 < g) return d;
  }
  function nc(a) {
    function b(b, d) {
      b = new a(b, d);b.__composed = d && !!d.composed;return b;
    }b.__proto__ = a;b.prototype = a.prototype;return b;
  }var oc = { focus: !0, blur: !0 };function pc(a) {
    return a.__target !== a.target || a.__relatedTarget !== a.relatedTarget;
  }function qc(a, b, c) {
    if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!pc(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.__immediatePropagationStopped); d++);
  }
  function rc(a) {
    var b = a.composedPath();Object.defineProperty(a, "currentTarget", { get: function () {
        return d;
      }, configurable: !0 });for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c];qc(a, d, "capture");if (a.ia) return;
    }Object.defineProperty(a, "eventPhase", { get: function () {
        return Event.AT_TARGET;
      } });var e;for (c = 0; c < b.length; c++) {
      d = b[c];var f = A(d);f = f && f.root;if (0 === c || f && f === e) if (qc(a, d, "bubble"), d !== window && (e = d.__shady_getRootNode()), a.ia) break;
    }
  }
  function sc(a, b, c, d, e, f) {
    for (var g = 0; g < a.length; g++) {
      var h = a[g],
          k = h.type,
          l = h.capture,
          n = h.once,
          p = h.passive;if (b === h.node && c === k && d === l && e === n && f === p) return g;
    }return -1;
  }
  function tc(a, b, c) {
    var d = gc(c);c = d.capture;var e = d.once,
        f = d.passive,
        g = d.xa,
        h = d.ua;if (b) {
      var k = typeof b;if ("function" === k || "object" === k) if ("object" !== k || b.handleEvent && "function" === typeof b.handleEvent) {
        if (ic[a]) return this.__shady_native_addEventListener(a, b, h);var l = g || this;if (d = b[dc]) {
          if (-1 < sc(d, l, a, c, e, f)) return;
        } else b[dc] = [];d = function (c) {
          e && this.__shady_removeEventListener(a, b, h);c.__target || uc(c);if (l !== this) {
            var d = Object.getOwnPropertyDescriptor(c, "currentTarget");Object.defineProperty(c, "currentTarget", { get: function () {
                return l;
              }, configurable: !0 });
          }c.__previousCurrentTarget = c.currentTarget;if (!C(l) && "slot" !== l.localName || -1 != c.composedPath().indexOf(l)) if (c.composed || -1 < c.composedPath().indexOf(l)) if (pc(c) && c.target === c.relatedTarget) c.eventPhase === Event.BUBBLING_PHASE && c.stopImmediatePropagation();else if (c.eventPhase === Event.CAPTURING_PHASE || c.bubbles || c.target === l || l instanceof Window) {
            var f = "function" === k ? b.call(l, c) : b.handleEvent && b.handleEvent(c);l !== this && (d ? (Object.defineProperty(c, "currentTarget", d), d = null) : delete c.currentTarget);return f;
          }
        };b[dc].push({ node: l, type: a, capture: c, once: e, passive: f, bb: d });oc[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || { capture: [], bubble: [] }, this.__handlers[a][c ? "capture" : "bubble"].push(d)) : this.__shady_native_addEventListener(a, d, h);
      }
    }
  }
  function vc(a, b, c) {
    if (b) {
      var d = gc(c);c = d.capture;var e = d.once,
          f = d.passive,
          g = d.xa;d = d.ua;if (ic[a]) return this.__shady_native_removeEventListener(a, b, d);var h = g || this;g = void 0;var k = null;try {
        k = b[dc];
      } catch (l) {}k && (e = sc(k, h, a, c, e, f), -1 < e && (g = k.splice(e, 1)[0].bb, k.length || (b[dc] = void 0)));this.__shady_native_removeEventListener(a, g || b, d);g && oc[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][c ? "capture" : "bubble"], b = a.indexOf(g), -1 < b && a.splice(b, 1));
    }
  }
  function wc() {
    for (var a in oc) window.__shady_native_addEventListener(a, function (a) {
      a.__target || (uc(a), rc(a));
    }, !0);
  }
  var xc = E({ get composed() {
      void 0 === this.__composed && (ec ? this.__composed = "focusin" === this.type || "focusout" === this.type || ec(this) : !1 !== this.isTrusted && (this.__composed = hc[this.type]));return this.__composed || !1;
    }, composedPath: function () {
      this.__composedPath || (this.__composedPath = kc(this.__target, this.composed));return this.__composedPath;
    }, get target() {
      return mc(this.currentTarget || this.__previousCurrentTarget, this.composedPath());
    }, get relatedTarget() {
      if (!this.__relatedTarget) return null;this.__relatedTargetComposedPath || (this.__relatedTargetComposedPath = kc(this.__relatedTarget, !0));return mc(this.currentTarget || this.__previousCurrentTarget, this.__relatedTargetComposedPath);
    }, stopPropagation: function () {
      Event.prototype.stopPropagation.call(this);this.ia = !0;
    }, stopImmediatePropagation: function () {
      Event.prototype.stopImmediatePropagation.call(this);this.ia = this.__immediatePropagationStopped = !0;
    } });
  function uc(a) {
    a.__target = a.target;a.__relatedTarget = a.relatedTarget;if (B.D) {
      var b = Object.getPrototypeOf(a);if (!Object.hasOwnProperty(b, "__shady_patchedProto")) {
        var c = Object.create(b);c.__shady_sourceProto = b;D(c, xc);b.__shady_patchedProto = c;
      }a.__proto__ = b.__shady_patchedProto;
    } else D(a, xc);
  }var yc = nc(Event),
      zc = nc(CustomEvent),
      Ac = nc(MouseEvent);
  function Bc() {
    if (!ec && Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")) {
      var a = function () {
        var a = new MouseEvent("click", { bubbles: !0, cancelable: !0, composed: !0 });this.__shady_dispatchEvent(a);
      };Element.prototype.click ? Element.prototype.click = a : HTMLElement.prototype.click && (HTMLElement.prototype.click = a);
    }
  }var Cc = Object.getOwnPropertyNames(Document.prototype).filter(function (a) {
    return "on" === a.substring(0, 2);
  });function Dc(a, b) {
    return { index: a, W: [], aa: b };
  }
  function Ec(a, b, c, d) {
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        k = Math.min(b - e, d - f);if (0 == e && 0 == f) a: {
      for (g = 0; g < k; g++) if (a[g] !== c[g]) break a;g = k;
    }if (b == a.length && d == c.length) {
      h = a.length;for (var l = c.length, n = 0; n < k - g && Fc(a[--h], c[--l]);) n++;h = n;
    }e += g;f += g;b -= h;d -= h;if (0 == b - e && 0 == d - f) return [];if (e == b) {
      for (b = Dc(e, 0); f < d;) b.W.push(c[f++]);return [b];
    }if (f == d) return [Dc(e, b - e)];k = e;g = f;d = d - g + 1;h = b - k + 1;b = Array(d);for (l = 0; l < d; l++) b[l] = Array(h), b[l][0] = l;for (l = 0; l < h; l++) b[0][l] = l;for (l = 1; l < d; l++) for (n = 1; n < h; n++) if (a[k + n - 1] === c[g + l - 1]) b[l][n] = b[l - 1][n - 1];else {
      var p = b[l - 1][n] + 1,
          G = b[l][n - 1] + 1;b[l][n] = p < G ? p : G;
    }k = b.length - 1;g = b[0].length - 1;d = b[k][g];for (a = []; 0 < k || 0 < g;) 0 == k ? (a.push(2), g--) : 0 == g ? (a.push(3), k--) : (h = b[k - 1][g - 1], l = b[k - 1][g], n = b[k][g - 1], p = l < n ? l < h ? l : h : n < h ? n : h, p == h ? (h == d ? a.push(0) : (a.push(1), d = h), k--, g--) : p == l ? (a.push(3), k--, d = l) : (a.push(2), g--, d = n));a.reverse();b = void 0;k = [];for (g = 0; g < a.length; g++) switch (a[g]) {case 0:
        b && (k.push(b), b = void 0);e++;f++;break;case 1:
        b || (b = Dc(e, 0));b.aa++;e++;b.W.push(c[f]);f++;break;case 2:
        b || (b = Dc(e, 0));b.aa++;e++;break;case 3:
        b || (b = Dc(e, 0)), b.W.push(c[f]), f++;}b && k.push(b);return k;
  }function Fc(a, b) {
    return a === b;
  };function Gc(a, b, c) {
    bc(a);c = c || null;var d = z(a),
        e = z(b),
        f = c ? z(c) : null;d.previousSibling = c ? f.previousSibling : b.__shady_lastChild;if (f = A(d.previousSibling)) f.nextSibling = a;if (f = A(d.nextSibling = c)) f.previousSibling = a;d.parentNode = b;c ? c === e.firstChild && (e.firstChild = a) : (e.lastChild = a, e.firstChild || (e.firstChild = a));e.childNodes = null;
  }
  function Hc(a, b, c) {
    cc(b);var d = z(b);void 0 !== d.firstChild && (d.childNodes = null);if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      d = a.__shady_childNodes;for (var e = 0; e < d.length; e++) Gc(d[e], b, c);a = z(a);b = void 0 !== a.firstChild ? null : void 0;a.firstChild = a.lastChild = b;a.childNodes = b;
    } else Gc(a, b, c);
  }
  function Ic(a, b) {
    var c = z(a);b = z(b);a === b.firstChild && (b.firstChild = c.nextSibling);a === b.lastChild && (b.lastChild = c.previousSibling);a = c.previousSibling;var d = c.nextSibling;a && (z(a).nextSibling = d);d && (z(d).previousSibling = a);c.parentNode = c.previousSibling = c.nextSibling = void 0;void 0 !== b.childNodes && (b.childNodes = null);
  }
  function Jc(a) {
    var b = z(a);if (void 0 === b.firstChild) {
      b.childNodes = null;var c = b.firstChild = a.__shady_native_firstChild || null;b.lastChild = a.__shady_native_lastChild || null;cc(a);b = c;for (c = void 0; b; b = b.__shady_native_nextSibling) {
        var d = z(b);d.parentNode = a;d.nextSibling = b.__shady_native_nextSibling || null;d.previousSibling = c || null;c = b;bc(b);
      }
    }
  };var Kc = null;function Lc() {
    Kc || (Kc = window.ShadyCSS && window.ShadyCSS.ScopingShim);return Kc || null;
  }function Mc(a, b) {
    var c = Lc();c && c.unscopeNode(a, b);
  }function Nc(a, b) {
    var c = Lc();if (!c) return !0;if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      c = !0;a = a.__shady_childNodes;for (var d = 0; c && d < a.length; d++) c = c && Nc(a[d], b);return c;
    }return a.nodeType !== Node.ELEMENT_NODE ? !0 : c.currentScopeForNode(a) === b;
  }function Oc(a) {
    if (a.nodeType !== Node.ELEMENT_NODE) return "";var b = Lc();return b ? b.currentScopeForNode(a) : "";
  }
  function Pc(a, b) {
    if (a) {
      a.nodeType === Node.ELEMENT_NODE && b(a);a = a.__shady_childNodes;for (var c = 0, d; c < a.length; c++) d = a[c], d.nodeType === Node.ELEMENT_NODE && Pc(d, b);
    }
  };var Qc = window.document,
      Rc = B.va,
      Sc = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"),
      Tc = Sc && Sc.get;function Uc(a) {
    for (var b; b = a.__shady_firstChild;) a.__shady_removeChild(b);
  }function Vc(a) {
    var b = A(a);if (b && void 0 !== b.V) {
      b = a.__shady_childNodes;for (var c = 0, d = b.length, e = void 0; c < d && (e = b[c]); c++) Vc(e);
    }if (a = A(a)) a.V = void 0;
  }function Wc(a) {
    var b = a;a && "slot" === a.localName && (b = (b = (b = A(a)) && b.N) && b.length ? b[0] : Wc(a.__shady_nextSibling));return b;
  }
  function Xc(a, b, c) {
    if (a = (a = A(a)) && a.T) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Cb(a);
  }
  var ad = E({ get parentNode() {
      var a = A(this);a = a && a.parentNode;return void 0 !== a ? a : this.__shady_native_parentNode;
    }, get firstChild() {
      var a = A(this);a = a && a.firstChild;return void 0 !== a ? a : this.__shady_native_firstChild;
    }, get lastChild() {
      var a = A(this);a = a && a.lastChild;return void 0 !== a ? a : this.__shady_native_lastChild;
    }, get nextSibling() {
      var a = A(this);a = a && a.nextSibling;return void 0 !== a ? a : this.__shady_native_nextSibling;
    }, get previousSibling() {
      var a = A(this);a = a && a.previousSibling;return void 0 !== a ? a : this.__shady_native_previousSibling;
    },
    get childNodes() {
      if (ib(this)) {
        var a = A(this);if (!a.childNodes) {
          a.childNodes = [];for (var b = this.__shady_firstChild; b; b = b.__shady_nextSibling) a.childNodes.push(b);
        }var c = a.childNodes;
      } else c = this.__shady_native_childNodes;c.item = function (a) {
        return c[a];
      };return c;
    }, get parentElement() {
      var a = A(this);(a = a && a.parentNode) && a.nodeType !== Node.ELEMENT_NODE && (a = null);return void 0 !== a ? a : this.__shady_native_parentElement;
    }, get isConnected() {
      if (Tc && Tc.call(this)) return !0;if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1;
      var a = this.ownerDocument;if (rb) {
        if (a.__shady_native_contains(this)) return !0;
      } else if (a.documentElement && a.documentElement.__shady_native_contains(this)) return !0;for (a = this; a && !(a instanceof Document);) a = a.__shady_parentNode || (C(a) ? a.host : void 0);return !!(a && a instanceof Document);
    }, get textContent() {
      if (ib(this)) {
        for (var a = [], b = 0, c = this.__shady_childNodes, d; d = c[b]; b++) d.nodeType !== Node.COMMENT_NODE && a.push(d.__shady_textContent);return a.join("");
      }return this.__shady_native_textContent;
    }, set textContent(a) {
      if ("undefined" === typeof a || null === a) a = "";switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
          if (!ib(this) && B.D) {
            var b = this.__shady_firstChild;(b != this.__shady_lastChild || b && b.nodeType != Node.TEXT_NODE) && Uc(this);this.__shady_native_textContent = a;
          } else Uc(this), (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_insertBefore(document.createTextNode(a));break;default:
          this.nodeValue = a;}
    }, insertBefore: function (a, b) {
      if (this.ownerDocument !== Qc && a.ownerDocument !== Qc) return this.__shady_native_insertBefore(a, b), a;if (a === this) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if (b) {
        var c = A(b);c = c && c.parentNode;if (void 0 !== c && c !== this || void 0 === c && b.__shady_native_parentNode !== this) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
      }if (b === a) return a;var d = [],
          e = (c = Yc(this)) ? c.host.localName : Oc(this),
          f = a.__shady_parentNode;if (f) {
        var g = Oc(a);var h = !!c || !Yc(a) || Rc && void 0 !== this.__noInsertionPoint;f.__shady_removeChild(a, h);
      }f = !0;var k = (!Rc || void 0 === a.__noInsertionPoint && void 0 === this.__noInsertionPoint) && !Nc(a, e),
          l = c && !a.__noInsertionPoint && (!Rc || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE);if (l || k) k && (g = g || Oc(a)), Pc(a, function (a) {
        l && "slot" === a.localName && d.push(a);if (k) {
          var b = g;Lc() && (b && Mc(a, b), (b = Lc()) && b.scopeNode(a, e));
        }
      });if ("slot" === this.localName || d.length) d.length && (c.c = c.c || [], c.a = c.a || [], c.b = c.b || {}, c.c.push.apply(c.c, d instanceof Array ? d : ja(ia(d)))), c && Zc(c);
      ib(this) && (Hc(a, this, b), c = A(this), jb(this) ? (Zc(c.root), f = !1) : c.root && (f = !1));f ? (c = C(this) ? this.host : this, b ? (b = Wc(b), c.__shady_native_insertBefore(a, b)) : c.__shady_native_appendChild(a)) : a.ownerDocument !== this.ownerDocument && this.ownerDocument.adoptNode(a);Xc(this, a);return a;
    }, appendChild: function (a) {
      return this.__shady_insertBefore(a);
    }, removeChild: function (a, b) {
      b = void 0 === b ? !1 : b;if (this.ownerDocument !== Qc) return this.__shady_native_removeChild(a);if (a.__shady_parentNode !== this) throw Error("The node to be removed is not a child of this node: " + a);var c = Yc(a),
          d = c && $c(c, a),
          e = A(this);if (ib(this) && (Ic(a, this), jb(this))) {
        Zc(e.root);var f = !0;
      }if (Lc() && !b && c) {
        var g = Oc(a);Pc(a, function (a) {
          Mc(a, g);
        });
      }Vc(a);c && ((b = this && "slot" === this.localName) && (f = !0), (d || b) && Zc(c));f || (f = C(this) ? this.host : this, (!e.root && "slot" !== a.localName || f === a.__shady_native_parentNode) && f.__shady_native_removeChild(a));Xc(this, null, a);return a;
    }, replaceChild: function (a, b) {
      this.__shady_insertBefore(a, b);this.__shady_removeChild(b);return a;
    }, cloneNode: function (a) {
      if ("template" == this.localName) return this.__shady_native_cloneNode(a);var b = this.__shady_native_cloneNode(!1);if (a && b.nodeType !== Node.ATTRIBUTE_NODE) {
        a = this.__shady_childNodes;for (var c = 0, d; c < a.length; c++) d = a[c].__shady_cloneNode(!0), b.__shady_appendChild(d);
      }return b;
    }, getRootNode: function (a) {
      if (this && this.nodeType) {
        var b = z(this),
            c = b.V;void 0 === c && (C(this) ? (c = this, b.V = c) : (c = (c = this.__shady_parentNode) ? c.__shady_getRootNode(a) : this, document.documentElement.__shady_native_contains(this) && (b.V = c)));return c;
      }
    }, contains: function (a) {
      return sb(this, a);
    } });function bd(a, b, c) {
    var d = [];cd(a.__shady_childNodes, b, c, d);return d;
  }function cd(a, b, c, d) {
    for (var e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) {
      var h;if (h = g.nodeType === Node.ELEMENT_NODE) {
        h = g;var k = b,
            l = c,
            n = d,
            p = k(h);p && n.push(h);l && l(p) ? h = p : (cd(h.__shady_childNodes, k, l, n), h = void 0);
      }if (h) break;
    }
  }
  var dd = E({ get firstElementChild() {
      var a = A(this);if (a && void 0 !== a.firstChild) {
        for (a = this.__shady_firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;return a;
      }return this.__shady_native_firstElementChild;
    }, get lastElementChild() {
      var a = A(this);if (a && void 0 !== a.lastChild) {
        for (a = this.__shady_lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;return a;
      }return this.__shady_native_lastElementChild;
    }, get children() {
      return ib(this) ? tb(Array.prototype.filter.call(this.__shady_childNodes, function (a) {
        return a.nodeType === Node.ELEMENT_NODE;
      })) : this.__shady_native_children;
    }, get childElementCount() {
      var a = this.__shady_children;return a ? a.length : 0;
    } }),
      ed = E({ querySelector: function (a) {
      return bd(this, function (b) {
        return mb.call(b, a);
      }, function (a) {
        return !!a;
      })[0] || null;
    }, querySelectorAll: function (a, b) {
      if (b) {
        b = Array.prototype.slice.call(this.__shady_native_querySelectorAll(a));var c = this.__shady_getRootNode();return b.filter(function (a) {
          return a.__shady_getRootNode() == c;
        });
      }return bd(this, function (b) {
        return mb.call(b, a);
      });
    } }),
      fd = B.va && !B.S ? Object.assign({}, dd) : dd;Object.assign(dd, ed);var gd = E({ getElementById: function (a) {
      return "" === a ? null : bd(this, function (b) {
        return b.id == a;
      }, function (a) {
        return !!a;
      })[0] || null;
    } });var hd = E({ get activeElement() {
      var a = B.D ? document.__shady_native_activeElement : document.activeElement;if (!a || !a.nodeType) return null;var b = !!C(this);if (!(this === document || b && this.host !== a && this.host.__shady_native_contains(a))) return null;for (b = Yc(a); b && b !== this;) a = b.host, b = Yc(a);return this === document ? b ? null : a : b === this ? a : null;
    } });var id = document.implementation.createHTMLDocument("inert"),
      jd = E({ get innerHTML() {
      return ib(this) ? Mb("template" === this.localName ? this.content : this, function (a) {
        return a.__shady_childNodes;
      }) : this.__shady_native_innerHTML;
    }, set innerHTML(a) {
      if ("template" === this.localName) this.__shady_native_innerHTML = a;else {
        Uc(this);var b = this.localName || "div";b = this.namespaceURI && this.namespaceURI !== id.namespaceURI ? id.createElementNS(this.namespaceURI, b) : id.createElement(b);for (B.D ? b.__shady_native_innerHTML = a : b.innerHTML = a; a = b.__shady_firstChild;) this.__shady_insertBefore(a);
      }
    } });var kd = E({ addEventListener: function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.O = c.O || this;this.host.__shady_addEventListener(a, b, c);
    }, removeEventListener: function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.O = c.O || this;this.host.__shady_removeEventListener(a, b, c);
    } });function ld(a, b) {
    D(a, kd, b);D(a, hd, b);D(a, jd, b);D(a, dd, b);B.S && !b ? (D(a, ad, b), D(a, gd, b)) : B.D || (D(a, Yb), D(a, Xb));
  };var md = {},
      nd = B.deferConnectionCallbacks && "loading" === document.readyState,
      od;function pd(a) {
    var b = [];do b.unshift(a); while (a = a.__shady_parentNode);return b;
  }
  function qd(a, b, c) {
    if (a !== md) throw new TypeError("Illegal constructor");this.Fa = "ShadyRoot";this.host = b;this.mode = c && c.mode;Jc(b);a = z(b);a.root = this;a.wa = "closed" !== this.mode ? this : null;a = z(this);a.firstChild = a.lastChild = a.parentNode = a.nextSibling = a.previousSibling = null;a.childNodes = [];this.ja = this.M = !1;this.c = this.b = this.a = null;if (B.preferPerformance) for (; a = b.__shady_native_firstChild;) b.__shady_native_removeChild(a);else Zc(this);
  }function Zc(a) {
    a.M || (a.M = !0, wb(function () {
      return rd(a);
    }));
  }
  function rd(a) {
    var b;if (b = a.M) {
      for (var c; a;) a: {
        a.M && (c = a), b = a;a = b.host.__shady_getRootNode();if (C(a) && (b = A(b.host)) && 0 < b.Y) break a;a = void 0;
      }b = c;
    }(c = b) && c._renderSelf();
  }
  qd.prototype._renderSelf = function () {
    var a = nd;nd = !0;this.M = !1;if (this.a) {
      sd(this);for (var b = 0, c; b < this.a.length; b++) {
        c = this.a[b];var d = A(c),
            e = d.assignedNodes;d.assignedNodes = [];d.N = [];if (d.ka = e) for (d = 0; d < e.length; d++) {
          var f = A(e[d]);f.$ = f.assignedSlot;f.assignedSlot === c && (f.assignedSlot = null);
        }
      }for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) td(this, b);for (b = 0; b < this.a.length; b++) {
        c = this.a[b];e = A(c);if (!e.assignedNodes.length) for (d = c.__shady_firstChild; d; d = d.__shady_nextSibling) td(this, d, c);(d = (d = A(c.__shady_parentNode)) && d.root) && (kb(d) || d.M) && d._renderSelf();ud(this, e.N, e.assignedNodes);if (d = e.ka) {
          for (f = 0; f < d.length; f++) A(d[f]).$ = null;e.ka = null;d.length > e.assignedNodes.length && (e.ca = !0);
        }e.ca && (e.ca = !1, vd(this, c));
      }c = this.a;b = [];for (e = 0; e < c.length; e++) d = c[e].__shady_parentNode, (f = A(d)) && f.root || !(0 > b.indexOf(d)) || b.push(d);for (c = 0; c < b.length; c++) {
        f = b[c];e = f === this ? this.host : f;d = [];f = f.__shady_childNodes;for (var g = 0; g < f.length; g++) {
          var h = f[g];if ("slot" == h.localName) {
            h = A(h).N;for (var k = 0; k < h.length; k++) d.push(h[k]);
          } else d.push(h);
        }f = Array.prototype.slice.call(e.__shady_native_childNodes);g = Ec(d, d.length, f, f.length);k = h = 0;for (var l = void 0; h < g.length && (l = g[h]); h++) {
          for (var n = 0, p = void 0; n < l.W.length && (p = l.W[n]); n++) p.__shady_native_parentNode === e && e.__shady_native_removeChild(p), f.splice(l.index + k, 1);k -= l.aa;
        }k = 0;for (l = void 0; k < g.length && (l = g[k]); k++) for (h = f[l.index], n = l.index; n < l.index + l.aa; n++) p = d[n], e.__shady_native_insertBefore(p, h), f.splice(n, 0, p);
      }
    }if (!B.preferPerformance && !this.ja) for (b = this.host.__shady_childNodes, c = 0, e = b.length; c < e; c++) d = b[c], f = A(d), d.__shady_native_parentNode !== this.host || "slot" !== d.localName && f.assignedSlot || this.host.__shady_native_removeChild(d);this.ja = !0;nd = a;od && od();
  };function td(a, b, c) {
    var d = z(b),
        e = d.$;d.$ = null;c || (c = (a = a.b[b.__shady_slot || "__catchall"]) && a[0]);c ? (z(c).assignedNodes.push(b), d.assignedSlot = c) : d.assignedSlot = void 0;e !== d.assignedSlot && d.assignedSlot && (z(d.assignedSlot).ca = !0);
  }
  function ud(a, b, c) {
    for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
      var f = A(e).assignedNodes;f && f.length && ud(a, b, f);
    } else b.push(c[d]);
  }function vd(a, b) {
    b.__shady_native_dispatchEvent(new Event("slotchange"));b = A(b);b.assignedSlot && vd(a, b.assignedSlot);
  }
  function sd(a) {
    if (a.c && a.c.length) {
      for (var b = a.c, c, d = 0; d < b.length; d++) {
        var e = b[d];Jc(e);var f = e.__shady_parentNode;Jc(f);f = A(f);f.Y = (f.Y || 0) + 1;f = wd(e);a.b[f] ? (c = c || {}, c[f] = !0, a.b[f].push(e)) : a.b[f] = [e];a.a.push(e);
      }if (c) for (var g in c) a.b[g] = xd(a.b[g]);a.c = [];
    }
  }function wd(a) {
    var b = a.name || a.getAttribute("name") || "__catchall";return a.Da = b;
  }
  function xd(a) {
    return a.sort(function (a, c) {
      a = pd(a);for (var b = pd(c), e = 0; e < a.length; e++) {
        c = a[e];var f = b[e];if (c !== f) return a = Array.from(c.__shady_parentNode.__shady_childNodes), a.indexOf(c) - a.indexOf(f);
      }
    });
  }
  function $c(a, b) {
    if (a.a) {
      sd(a);var c = a.b,
          d;for (d in c) for (var e = c[d], f = 0; f < e.length; f++) {
        var g = e[f];if (sb(b, g)) {
          e.splice(f, 1);var h = a.a.indexOf(g);0 <= h && (a.a.splice(h, 1), (h = A(g.__shady_parentNode)) && h.Y && h.Y--);f--;g = A(g);if (h = g.N) for (var k = 0; k < h.length; k++) {
            var l = h[k],
                n = l.__shady_native_parentNode;n && n.__shady_native_removeChild(l);
          }g.N = [];g.assignedNodes = [];h = !0;
        }
      }return h;
    }
  }function kb(a) {
    sd(a);return !(!a.a || !a.a.length);
  }
  (function (a) {
    a.__proto__ = DocumentFragment.prototype;ld(a, "__shady_");ld(a);Object.defineProperties(a, { nodeType: { value: Node.DOCUMENT_FRAGMENT_NODE, configurable: !0 }, nodeName: { value: "#document-fragment", configurable: !0 }, nodeValue: { value: null, configurable: !0 } });["localName", "namespaceURI", "prefix"].forEach(function (b) {
      Object.defineProperty(a, b, { value: void 0, configurable: !0 });
    });["ownerDocument", "baseURI", "isConnected"].forEach(function (b) {
      Object.defineProperty(a, b, { get: function () {
          return this.host[b];
        },
        configurable: !0 });
    });
  })(qd.prototype);
  if (window.customElements && B.ma && !B.preferPerformance) {
    var yd = new Map();od = function () {
      var a = [];yd.forEach(function (b, c) {
        a.push([c, b]);
      });yd.clear();for (var b = 0; b < a.length; b++) {
        var c = a[b][0];a[b][1] ? c.Ba() : c.Ca();
      }
    };nd && document.addEventListener("readystatechange", function () {
      nd = !1;od();
    }, { once: !0 });var zd = function (a, b, c) {
      var d = 0,
          e = "__isConnected" + d++;if (b || c) a.prototype.connectedCallback = a.prototype.Ba = function () {
        nd ? yd.set(this, !0) : this[e] || (this[e] = !0, b && b.call(this));
      }, a.prototype.disconnectedCallback = a.prototype.Ca = function () {
        nd ? this.isConnected || yd.set(this, !1) : this[e] && (this[e] = !1, c && c.call(this));
      };return a;
    },
        define = window.customElements.define;Object.defineProperty(window.CustomElementRegistry.prototype, "define", { value: function (a, b) {
        var c = b.prototype.connectedCallback,
            d = b.prototype.disconnectedCallback;define.call(window.customElements, a, zd(b, c, d));b.prototype.connectedCallback = c;b.prototype.disconnectedCallback = d;
      } });
  }function Yc(a) {
    a = a.__shady_getRootNode();if (C(a)) return a;
  };function Ad(a) {
    this.node = a;
  }r = Ad.prototype;r.addEventListener = function (a, b, c) {
    return this.node.__shady_addEventListener(a, b, c);
  };r.removeEventListener = function (a, b, c) {
    return this.node.__shady_removeEventListener(a, b, c);
  };r.appendChild = function (a) {
    return this.node.__shady_appendChild(a);
  };r.insertBefore = function (a, b) {
    return this.node.__shady_insertBefore(a, b);
  };r.removeChild = function (a) {
    return this.node.__shady_removeChild(a);
  };r.replaceChild = function (a, b) {
    return this.node.__shady_replaceChild(a, b);
  };
  r.cloneNode = function (a) {
    return this.node.__shady_cloneNode(a);
  };r.getRootNode = function (a) {
    return this.node.__shady_getRootNode(a);
  };r.contains = function (a) {
    return this.node.__shady_contains(a);
  };r.dispatchEvent = function (a) {
    return this.node.__shady_dispatchEvent(a);
  };r.setAttribute = function (a, b) {
    this.node.__shady_setAttribute(a, b);
  };r.getAttribute = function (a) {
    return this.node.__shady_native_getAttribute(a);
  };r.hasAttribute = function (a) {
    return this.node.__shady_native_hasAttribute(a);
  };r.removeAttribute = function (a) {
    this.node.__shady_removeAttribute(a);
  };
  r.attachShadow = function (a) {
    return this.node.__shady_attachShadow(a);
  };r.focus = function () {
    this.node.__shady_native_focus();
  };r.blur = function () {
    this.node.__shady_blur();
  };r.importNode = function (a, b) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_importNode(a, b);
  };r.getElementById = function (a) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_getElementById(a);
  };r.querySelector = function (a) {
    return this.node.__shady_querySelector(a);
  };
  r.querySelectorAll = function (a, b) {
    return this.node.__shady_querySelectorAll(a, b);
  };r.assignedNodes = function (a) {
    if ("slot" === this.node.localName) return this.node.__shady_assignedNodes(a);
  };
  t.Object.defineProperties(Ad.prototype, { activeElement: { configurable: !0, enumerable: !0, get: function () {
        if (C(this.node) || this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_activeElement;
      } }, _activeElement: { configurable: !0, enumerable: !0, get: function () {
        return this.activeElement;
      } }, host: { configurable: !0, enumerable: !0, get: function () {
        if (C(this.node)) return this.node.host;
      } }, parentNode: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_parentNode;
      } }, firstChild: { configurable: !0,
      enumerable: !0, get: function () {
        return this.node.__shady_firstChild;
      } }, lastChild: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_lastChild;
      } }, nextSibling: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_nextSibling;
      } }, previousSibling: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_previousSibling;
      } }, childNodes: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_childNodes;
      } }, parentElement: { configurable: !0, enumerable: !0,
      get: function () {
        return this.node.__shady_parentElement;
      } }, firstElementChild: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_firstElementChild;
      } }, lastElementChild: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_lastElementChild;
      } }, nextElementSibling: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_nextElementSibling;
      } }, previousElementSibling: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_previousElementSibling;
      } },
    children: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_children;
      } }, childElementCount: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_childElementCount;
      } }, shadowRoot: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_shadowRoot;
      } }, assignedSlot: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_assignedSlot;
      } }, isConnected: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_isConnected;
      } }, innerHTML: { configurable: !0,
      enumerable: !0, get: function () {
        return this.node.__shady_innerHTML;
      }, set: function (a) {
        this.node.__shady_innerHTML = a;
      } }, textContent: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_textContent;
      }, set: function (a) {
        this.node.__shady_textContent = a;
      } }, slot: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_slot;
      }, set: function (a) {
        this.node.__shady_slot = a;
      } }, className: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_className;
      }, set: function (a) {
        return this.node.__shady_className = a;
      } } });Cc.forEach(function (a) {
    Object.defineProperty(Ad.prototype, a, { get: function () {
        return this.node["__shady_" + a];
      }, set: function (b) {
        this.node["__shady_" + a] = b;
      }, configurable: !0 });
  });var Bd = new WeakMap();function Cd(a) {
    if (C(a) || a instanceof Ad) return a;var b = Bd.get(a);b || (b = new Ad(a), Bd.set(a, b));return b;
  };var Dd = E({ dispatchEvent: function (a) {
      xb();return this.__shady_native_dispatchEvent(a);
    }, addEventListener: tc, removeEventListener: vc });var Ed = E({ get assignedSlot() {
      var a = this.__shady_parentNode;(a = a && a.__shady_shadowRoot) && rd(a);return (a = A(this)) && a.assignedSlot || null;
    } });var Fd = window.document;function Gd(a, b) {
    if ("slot" === b) a = a.__shady_parentNode, jb(a) && Zc(A(a).root);else if ("slot" === a.localName && "name" === b && (b = Yc(a))) {
      if (b.a) {
        sd(b);var c = a.Da,
            d = wd(a);if (d !== c) {
          c = b.b[c];var e = c.indexOf(a);0 <= e && c.splice(e, 1);c = b.b[d] || (b.b[d] = []);c.push(a);1 < c.length && (b.b[d] = xd(c));
        }
      }Zc(b);
    }
  }
  var Hd = E({ get previousElementSibling() {
      var a = A(this);if (a && void 0 !== a.previousSibling) {
        for (a = this.__shady_previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;return a;
      }return this.__shady_native_previousElementSibling;
    }, get nextElementSibling() {
      var a = A(this);if (a && void 0 !== a.nextSibling) {
        for (a = this.__shady_nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;return a;
      }return this.__shady_native_nextElementSibling;
    }, get slot() {
      return this.getAttribute("slot");
    },
    set slot(a) {
      this.__shady_setAttribute("slot", a);
    }, get shadowRoot() {
      var a = A(this);return a && a.wa || null;
    }, get className() {
      return this.getAttribute("class") || "";
    }, set className(a) {
      this.__shady_setAttribute("class", a);
    }, setAttribute: function (a, b) {
      if (this.ownerDocument !== Fd) this.__shady_native_setAttribute(a, b);else {
        var c;(c = Lc()) && "class" === a ? (c.setElementClass(this, b), c = !0) : c = !1;c || (this.__shady_native_setAttribute(a, b), Gd(this, a));
      }
    }, removeAttribute: function (a) {
      this.__shady_native_removeAttribute(a);Gd(this, a);
    }, attachShadow: function (a) {
      if (!this) throw Error("Must provide a host.");if (!a) throw Error("Not enough arguments.");return new qd(md, this, a);
    } });var Id = E({ blur: function () {
      var a = A(this);(a = (a = a && a.root) && a.activeElement) ? a.__shady_blur() : this.__shady_native_blur();
    } });Cc.forEach(function (a) {
    Id[a] = { set: function (b) {
        var c = z(this),
            d = a.substring(2);c.Z[a] && this.removeEventListener(d, c.Z[a]);this.__shady_addEventListener(d, b);c.Z[a] = b;
      }, get: function () {
        var b = A(this);return b && b.Z[a];
      }, configurable: !0 };
  });var Jd = E({ assignedNodes: function (a) {
      if ("slot" === this.localName) {
        var b = this.__shady_getRootNode();b && C(b) && rd(b);return (b = A(this)) ? (a && a.flatten ? b.N : b.assignedNodes) || [] : [];
      }
    }, addEventListener: function (a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) tc.call(this, a, b, c);else {
        "object" !== typeof c && (c = { capture: !!c });var d = this.__shady_parentNode;if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");c.O = this;d.__shady_addEventListener(a, b, c);
      }
    }, removeEventListener: function (a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) vc.call(this, a, b, c);else {
        "object" !== typeof c && (c = { capture: !!c });var d = this.__shady_parentNode;if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");c.O = this;d.__shady_removeEventListener(a, b, c);
      }
    } });var Kd = window.document,
      Ld = E({ importNode: function (a, b) {
      if (a.ownerDocument !== Kd || "template" === a.localName) return this.__shady_native_importNode(a, b);var c = this.__shady_native_importNode(a, !1);if (b) {
        a = a.__shady_childNodes;b = 0;for (var d; b < a.length; b++) d = this.__shady_importNode(a[b], !0), c.__shady_appendChild(d);
      }return c;
    } });var Md = E({ addEventListener: tc.bind(window), removeEventListener: vc.bind(window) });var Nd = {};Object.getOwnPropertyDescriptor(HTMLElement.prototype, "parentElement") && (Nd.parentElement = ad.parentElement);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "contains") && (Nd.contains = ad.contains);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && (Nd.children = dd.children);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && (Nd.innerHTML = jd.innerHTML);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className") && (Nd.className = Hd.className);
  var Od = { EventTarget: [Dd], Node: [ad, window.EventTarget ? null : Dd], Text: [Ed], Element: [Hd, dd, Ed, !B.D || "innerHTML" in Element.prototype ? jd : null, window.HTMLSlotElement ? null : Jd], HTMLElement: [Id, Nd], HTMLSlotElement: [Jd], DocumentFragment: [fd, gd], Document: [Ld, fd, gd, hd], Window: [Md] },
      Pd = B.D ? null : ["innerHTML", "textContent"];function Qd(a) {
    var b = a ? null : Pd,
        c = {},
        d;for (d in Od) c.ga = window[d] && window[d].prototype, Od[d].forEach(function (c) {
      return function (d) {
        return c.ga && d && D(c.ga, d, a, b);
      };
    }(c)), c = { ga: c.ga };
  };if (B.ma) {
    var ShadyDOM = { inUse: B.ma, patch: function (a) {
        cc(a);bc(a);return a;
      }, isShadyRoot: C, enqueue: wb, flush: xb, flushInitial: function (a) {
        !a.ja && a.M && rd(a);
      }, settings: B, filterMutations: Fb, observeChildren: Db, unobserveChildren: Eb, deferConnectionCallbacks: B.deferConnectionCallbacks, preferPerformance: B.preferPerformance, handlesDynamicScoping: !0, wrap: B.S ? Cd : function (a) {
        return a;
      }, Wrapper: Ad, composedPath: lc, noPatch: B.S, nativeMethods: Ob, nativeTree: Pb };window.ShadyDOM = ShadyDOM;Wb();Qd("__shady_");Object.defineProperty(document, "_activeElement", hd.activeElement);D(Window.prototype, Md, "__shady_");B.S || (Qd(), Bc());wc();window.Event = yc;window.CustomEvent = zc;window.MouseEvent = Ac;window.ShadowRoot = qd;
  };var Rd = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function Sd(a) {
    var b = Rd.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
  }function J(a) {
    var b = a.isConnected;if (void 0 !== b) return b;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }
  function Td(a, b) {
    for (; b && b !== a && !b.nextSibling;) b = b.parentNode;return b && b !== a ? b.nextSibling : null;
  }
  function Ud(a, b, c) {
    c = void 0 === c ? new Set() : c;for (var d = a; d;) {
      if (d.nodeType === Node.ELEMENT_NODE) {
        var e = d;b(e);var f = e.localName;if ("link" === f && "import" === e.getAttribute("rel")) {
          d = e.import;if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) Ud(d, b, c);d = Td(a, e);continue;
        } else if ("template" === f) {
          d = Td(a, e);continue;
        }if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) Ud(e, b, c);
      }d = d.firstChild ? d.firstChild : Td(a, d);
    }
  }function K(a, b, c) {
    a[b] = c;
  };function Vd() {
    this.a = new Map();this.u = new Map();this.f = [];this.c = !1;
  }function Wd(a, b, c) {
    a.a.set(b, c);a.u.set(c.constructorFunction, c);
  }function Xd(a, b) {
    a.c = !0;a.f.push(b);
  }function Yd(a, b) {
    a.c && Ud(b, function (b) {
      return a.b(b);
    });
  }Vd.prototype.b = function (a) {
    if (this.c && !a.__CE_patched) {
      a.__CE_patched = !0;for (var b = 0; b < this.f.length; b++) this.f[b](a);
    }
  };function L(a, b) {
    var c = [];Ud(b, function (a) {
      return c.push(a);
    });for (b = 0; b < c.length; b++) {
      var d = c[b];1 === d.__CE_state ? a.connectedCallback(d) : Zd(a, d);
    }
  }
  function M(a, b) {
    var c = [];Ud(b, function (a) {
      return c.push(a);
    });for (b = 0; b < c.length; b++) {
      var d = c[b];1 === d.__CE_state && a.disconnectedCallback(d);
    }
  }
  function N(a, b, c) {
    c = void 0 === c ? {} : c;var d = c.ab || new Set(),
        e = c.ha || function (b) {
      return Zd(a, b);
    },
        f = [];Ud(b, function (b) {
      if ("link" === b.localName && "import" === b.getAttribute("rel")) {
        var c = b.import;c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
          var c = b.import;if (!c.__CE_documentLoadHandled) {
            c.__CE_documentLoadHandled = !0;var f = new Set(d);f.delete(c);N(a, c, { ab: f, ha: e });
          }
        });
      } else f.push(b);
    }, d);
    if (a.c) for (b = 0; b < f.length; b++) a.b(f[b]);for (b = 0; b < f.length; b++) e(f[b]);
  }
  function Zd(a, b) {
    if (void 0 === b.__CE_state) {
      var c = b.ownerDocument;if (c.defaultView || c.__CE_isImportDocument && c.__CE_hasRegistry) if (c = a.a.get(b.localName)) {
        c.constructionStack.push(b);var d = c.constructorFunction;try {
          try {
            if (new d() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
          } finally {
            c.constructionStack.pop();
          }
        } catch (g) {
          throw b.__CE_state = 2, g;
        }b.__CE_state = 1;b.__CE_definition = c;if (c.attributeChangedCallback) for (c = c.observedAttributes, d = 0; d < c.length; d++) {
          var e = c[d],
              f = b.getAttribute(e);null !== f && a.attributeChangedCallback(b, e, null, f, null);
        }J(b) && a.connectedCallback(b);
      }
    }
  }Vd.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;b.connectedCallback && b.connectedCallback.call(a);
  };Vd.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;b.disconnectedCallback && b.disconnectedCallback.call(a);
  };
  Vd.prototype.attributeChangedCallback = function (a, b, c, d, e) {
    var f = a.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e);
  };function $d(a) {
    var b = document;this.b = a;this.a = b;this.P = void 0;N(this.b, this.a);"loading" === this.a.readyState && (this.P = new MutationObserver(this.c.bind(this)), this.P.observe(this.a, { childList: !0, subtree: !0 }));
  }function ae(a) {
    a.P && a.P.disconnect();
  }$d.prototype.c = function (a) {
    var b = this.a.readyState;"interactive" !== b && "complete" !== b || ae(this);for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) N(this.b, c[d]);
  };function be() {
    var a = this;this.a = this.w = void 0;this.b = new Promise(function (b) {
      a.a = b;a.w && b(a.w);
    });
  }be.prototype.resolve = function (a) {
    if (this.w) throw Error("Already resolved.");this.w = a;this.a && this.a(a);
  };function O(a) {
    this.c = !1;this.a = a;this.F = new Map();this.f = function (a) {
      return a();
    };this.b = !1;this.u = [];this.da = new $d(a);
  }r = O.prototype;
  r.za = function (a, b) {
    var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");if (!Sd(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");if (this.a.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");if (this.c) throw Error("A custom element is already being defined.");this.c = !0;try {
      var d = function (a) {
        var b = e[a];if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
        return b;
      },
          e = b.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var f = d("connectedCallback");var g = d("disconnectedCallback");var h = d("adoptedCallback");var k = d("attributeChangedCallback");var l = b.observedAttributes || [];
    } catch (n) {
      return;
    } finally {
      this.c = !1;
    }b = { localName: a, constructorFunction: b, connectedCallback: f, disconnectedCallback: g, adoptedCallback: h, attributeChangedCallback: k, observedAttributes: l, constructionStack: [] };Wd(this.a, a, b);this.u.push(b);this.b || (this.b = !0, this.f(function () {
      return ce(c);
    }));
  };r.ha = function (a) {
    N(this.a, a);
  };
  function ce(a) {
    if (!1 !== a.b) {
      a.b = !1;for (var b = a.u, c = [], d = new Map(), e = 0; e < b.length; e++) d.set(b[e].localName, []);N(a.a, document, { ha: function (b) {
          if (void 0 === b.__CE_state) {
            var e = b.localName,
                f = d.get(e);f ? f.push(b) : a.a.a.get(e) && c.push(b);
          }
        } });for (e = 0; e < c.length; e++) Zd(a.a, c[e]);for (; 0 < b.length;) {
        var f = b.shift();e = f.localName;f = d.get(f.localName);for (var g = 0; g < f.length; g++) Zd(a.a, f[g]);(e = a.F.get(e)) && e.resolve(void 0);
      }
    }
  }r.get = function (a) {
    if (a = this.a.a.get(a)) return a.constructorFunction;
  };
  r.Aa = function (a) {
    if (!Sd(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.F.get(a);if (b) return b.b;b = new be();this.F.set(a, b);this.a.a.get(a) && !this.u.some(function (b) {
      return b.localName === a;
    }) && b.resolve(void 0);return b.b;
  };r.Ta = function (a) {
    ae(this.da);var b = this.f;this.f = function (c) {
      return a(function () {
        return b(c);
      });
    };
  };window.CustomElementRegistry = O;O.prototype.define = O.prototype.za;O.prototype.upgrade = O.prototype.ha;O.prototype.get = O.prototype.get;
  O.prototype.whenDefined = O.prototype.Aa;O.prototype.polyfillWrapFlushCallback = O.prototype.Ta;var de = window.Document.prototype.createElement,
      ee = window.Document.prototype.createElementNS,
      fe = window.Document.prototype.importNode,
      ge = window.Document.prototype.prepend,
      he = window.Document.prototype.append,
      ie = window.DocumentFragment.prototype.prepend,
      je = window.DocumentFragment.prototype.append,
      ke = window.Node.prototype.cloneNode,
      le = window.Node.prototype.appendChild,
      me = window.Node.prototype.insertBefore,
      ne = window.Node.prototype.removeChild,
      oe = window.Node.prototype.replaceChild,
      pe = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
      qe = window.Element.prototype.attachShadow,
      re = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
      se = window.Element.prototype.getAttribute,
      te = window.Element.prototype.setAttribute,
      ue = window.Element.prototype.removeAttribute,
      ve = window.Element.prototype.getAttributeNS,
      we = window.Element.prototype.setAttributeNS,
      xe = window.Element.prototype.removeAttributeNS,
      ye = window.Element.prototype.insertAdjacentElement,
      ze = window.Element.prototype.insertAdjacentHTML,
      Ae = window.Element.prototype.prepend,
      Be = window.Element.prototype.append,
      Ce = window.Element.prototype.before,
      De = window.Element.prototype.after,
      Ee = window.Element.prototype.replaceWith,
      Fe = window.Element.prototype.remove,
      Ge = window.HTMLElement,
      He = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
      Ie = window.HTMLElement.prototype.insertAdjacentElement,
      Je = window.HTMLElement.prototype.insertAdjacentHTML;var Ke = new function () {}();function Le() {
    var a = Me;window.HTMLElement = function () {
      function b() {
        var b = this.constructor,
            d = a.u.get(b);if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");var e = d.constructionStack;if (0 === e.length) return e = de.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.b(e), e;d = e.length - 1;var f = e[d];if (f === Ke) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
        e[d] = Ke;Object.setPrototypeOf(f, b.prototype);a.b(f);return f;
      }b.prototype = Ge.prototype;Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });return b;
    }();
  };function Ne(a, b, c) {
    function d(b) {
      return function (c) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];e = [];for (var f = [], l = 0; l < d.length; l++) {
          var n = d[l];n instanceof Element && J(n) && f.push(n);if (n instanceof DocumentFragment) for (n = n.firstChild; n; n = n.nextSibling) e.push(n);else e.push(n);
        }b.apply(this, d);for (d = 0; d < f.length; d++) M(a, f[d]);if (J(this)) for (d = 0; d < e.length; d++) f = e[d], f instanceof Element && L(a, f);
      };
    }void 0 !== c.fa && (b.prepend = d(c.fa));void 0 !== c.append && (b.append = d(c.append));
  };function Oe() {
    var a = Me;K(Document.prototype, "createElement", function (b) {
      if (this.__CE_hasRegistry) {
        var c = a.a.get(b);if (c) return new c.constructorFunction();
      }b = de.call(this, b);a.b(b);return b;
    });K(Document.prototype, "importNode", function (b, c) {
      b = fe.call(this, b, !!c);this.__CE_hasRegistry ? N(a, b) : Yd(a, b);return b;
    });K(Document.prototype, "createElementNS", function (b, c) {
      if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
        var d = a.a.get(c);if (d) return new d.constructorFunction();
      }b = ee.call(this, b, c);a.b(b);return b;
    });Ne(a, Document.prototype, { fa: ge, append: he });
  };function Pe() {
    function a(a, d) {
      Object.defineProperty(a, "textContent", { enumerable: d.enumerable, configurable: !0, get: d.get, set: function (a) {
          if (this.nodeType === Node.TEXT_NODE) d.set.call(this, a);else {
            var c = void 0;if (this.firstChild) {
              var e = this.childNodes,
                  h = e.length;if (0 < h && J(this)) {
                c = Array(h);for (var k = 0; k < h; k++) c[k] = e[k];
              }
            }d.set.call(this, a);if (c) for (a = 0; a < c.length; a++) M(b, c[a]);
          }
        } });
    }var b = Me;K(Node.prototype, "insertBefore", function (a, d) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);
        a = me.call(this, a, d);if (J(this)) for (d = 0; d < c.length; d++) L(b, c[d]);return a;
      }c = J(a);d = me.call(this, a, d);c && M(b, a);J(this) && L(b, a);return d;
    });K(Node.prototype, "appendChild", function (a) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);a = le.call(this, a);if (J(this)) for (var e = 0; e < c.length; e++) L(b, c[e]);return a;
      }c = J(a);e = le.call(this, a);c && M(b, a);J(this) && L(b, a);return e;
    });K(Node.prototype, "cloneNode", function (a) {
      a = ke.call(this, !!a);this.ownerDocument.__CE_hasRegistry ? N(b, a) : Yd(b, a);return a;
    });K(Node.prototype, "removeChild", function (a) {
      var c = J(a),
          e = ne.call(this, a);c && M(b, a);return e;
    });K(Node.prototype, "replaceChild", function (a, d) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);a = oe.call(this, a, d);if (J(this)) for (M(b, d), d = 0; d < c.length; d++) L(b, c[d]);return a;
      }c = J(a);var f = oe.call(this, a, d),
          g = J(this);g && M(b, d);c && M(b, a);g && L(b, a);return f;
    });pe && pe.get ? a(Node.prototype, pe) : Xd(b, function (b) {
      a(b, { enumerable: !0, configurable: !0, get: function () {
          for (var a = [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);return a.join("");
        }, set: function (a) {
          for (; this.firstChild;) ne.call(this, this.firstChild);le.call(this, document.createTextNode(a));
        } });
    });
  };function Qe(a) {
    function b(b) {
      return function (c) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];e = [];for (var h = [], k = 0; k < d.length; k++) {
          var l = d[k];l instanceof Element && J(l) && h.push(l);if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) e.push(l);else e.push(l);
        }b.apply(this, d);for (d = 0; d < h.length; d++) M(a, h[d]);if (J(this)) for (d = 0; d < e.length; d++) h = e[d], h instanceof Element && L(a, h);
      };
    }var c = Element.prototype;void 0 !== Ce && (c.before = b(Ce));void 0 !== Ce && (c.after = b(De));void 0 !== Ee && K(c, "replaceWith", function (b) {
      for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];d = [];for (var g = [], h = 0; h < c.length; h++) {
        var k = c[h];k instanceof Element && J(k) && g.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) d.push(k);else d.push(k);
      }h = J(this);Ee.apply(this, c);for (c = 0; c < g.length; c++) M(a, g[c]);if (h) for (M(a, this), c = 0; c < d.length; c++) g = d[c], g instanceof Element && L(a, g);
    });void 0 !== Fe && K(c, "remove", function () {
      var b = J(this);Fe.call(this);b && M(a, this);
    });
  };function Re() {
    function a(a, b) {
      Object.defineProperty(a, "innerHTML", { enumerable: b.enumerable, configurable: !0, get: b.get, set: function (a) {
          var c = this,
              e = void 0;J(this) && (e = [], Ud(this, function (a) {
            a !== c && e.push(a);
          }));b.set.call(this, a);if (e) for (var f = 0; f < e.length; f++) {
            var g = e[f];1 === g.__CE_state && d.disconnectedCallback(g);
          }this.ownerDocument.__CE_hasRegistry ? N(d, this) : Yd(d, this);return a;
        } });
    }function b(a, b) {
      K(a, "insertAdjacentElement", function (a, c) {
        var e = J(c);a = b.call(this, a, c);e && M(d, c);J(a) && L(d, c);return a;
      });
    }
    function c(a, b) {
      function c(a, b) {
        for (var c = []; a !== b; a = a.nextSibling) c.push(a);for (b = 0; b < c.length; b++) N(d, c[b]);
      }K(a, "insertAdjacentHTML", function (a, d) {
        a = a.toLowerCase();if ("beforebegin" === a) {
          var e = this.previousSibling;b.call(this, a, d);c(e || this.parentNode.firstChild, this);
        } else if ("afterbegin" === a) e = this.firstChild, b.call(this, a, d), c(this.firstChild, e);else if ("beforeend" === a) e = this.lastChild, b.call(this, a, d), c(e || this.firstChild, null);else if ("afterend" === a) e = this.nextSibling, b.call(this, a, d), c(this.nextSibling, e);else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      });
    }var d = Me;qe && K(Element.prototype, "attachShadow", function (a) {
      return this.__CE_shadowRoot = a = qe.call(this, a);
    });re && re.get ? a(Element.prototype, re) : He && He.get ? a(HTMLElement.prototype, He) : Xd(d, function (b) {
      a(b, { enumerable: !0, configurable: !0, get: function () {
          return ke.call(this, !0).innerHTML;
        }, set: function (a) {
          var b = "template" === this.localName,
              c = b ? this.content : this,
              d = ee.call(document, this.namespaceURI, this.localName);for (d.innerHTML = a; 0 < c.childNodes.length;) ne.call(c, c.childNodes[0]);for (a = b ? d.content : d; 0 < a.childNodes.length;) le.call(c, a.childNodes[0]);
        } });
    });K(Element.prototype, "setAttribute", function (a, b) {
      if (1 !== this.__CE_state) return te.call(this, a, b);var c = se.call(this, a);te.call(this, a, b);b = se.call(this, a);d.attributeChangedCallback(this, a, c, b, null);
    });K(Element.prototype, "setAttributeNS", function (a, b, c) {
      if (1 !== this.__CE_state) return we.call(this, a, b, c);var e = ve.call(this, a, b);we.call(this, a, b, c);c = ve.call(this, a, b);d.attributeChangedCallback(this, b, e, c, a);
    });K(Element.prototype, "removeAttribute", function (a) {
      if (1 !== this.__CE_state) return ue.call(this, a);var b = se.call(this, a);ue.call(this, a);null !== b && d.attributeChangedCallback(this, a, b, null, null);
    });K(Element.prototype, "removeAttributeNS", function (a, b) {
      if (1 !== this.__CE_state) return xe.call(this, a, b);var c = ve.call(this, a, b);xe.call(this, a, b);var e = ve.call(this, a, b);c !== e && d.attributeChangedCallback(this, b, c, e, a);
    });Ie ? b(HTMLElement.prototype, Ie) : ye ? b(Element.prototype, ye) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Je ? c(HTMLElement.prototype, Je) : ze ? c(Element.prototype, ze) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Ne(d, Element.prototype, { fa: Ae, append: Be });Qe(d);
  };var Se = window.customElements;if (!Se || Se.forcePolyfill || "function" != typeof Se.define || "function" != typeof Se.get) {
    var Me = new Vd();Le();Oe();Ne(Me, DocumentFragment.prototype, { fa: ie, append: je });Pe();Re();document.__CE_hasRegistry = !0;var customElements = new O(Me);Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
  };function Te() {
    this.end = this.start = 0;this.rules = this.parent = this.previous = null;this.cssText = this.parsedCssText = "";this.atRule = !1;this.type = 0;this.parsedSelector = this.selector = this.keyframesName = "";
  }
  function Ue(a) {
    a = a.replace(Ve, "").replace(We, "");var b = Xe,
        c = a,
        d = new Te();d.start = 0;d.end = c.length;for (var e = d, f = 0, g = c.length; f < g; f++) if ("{" === c[f]) {
      e.rules || (e.rules = []);var h = e,
          k = h.rules[h.rules.length - 1] || null;e = new Te();e.start = f + 1;e.parent = h;e.previous = k;h.rules.push(e);
    } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);return b(d, a);
  }
  function Xe(a, b) {
    var c = b.substring(a.start, a.end - 1);a.parsedCssText = a.cssText = c.trim();a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = Ye(c), c = c.replace(Ze, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = $e : c.match(af) && (a.type = bf, a.keyframesName = a.selector.split(Ze).pop()) : a.type = 0 === c.indexOf("--") ? cf : df);if (c = a.rules) for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++) Xe(f, b);return a;
  }function Ye(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
      a = c;for (c = 6 - a.length; c--;) a = "0" + a;return "\\" + a;
    });
  }
  function ef(a, b, c) {
    c = void 0 === c ? "" : c;var d = "";if (a.cssText || a.rules) {
      var e = a.rules,
          f;if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));if (f) {
        f = 0;for (var g = e.length, h = void 0; f < g && (h = e[f]); f++) d = ef(h, b, d);
      } else b ? b = a.cssText : (b = a.cssText, b = b.replace(ff, "").replace(gf, ""), b = b.replace(hf, "").replace(lf, "")), (d = b.trim()) && (d = "  " + d + "\n");
    }d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));return c;
  }
  var df = 1,
      bf = 7,
      $e = 4,
      cf = 1E3,
      Ve = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
      We = /@import[^;]*;/gim,
      ff = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      gf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      hf = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      lf = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      af = /^@[^\s]*keyframes/,
      Ze = /\s+/g;var P = !(window.ShadyDOM && window.ShadyDOM.inUse),
      mf;function nf(a) {
    mf = a && a.shimcssproperties ? !1 : P || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"));
  }var of;window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (of = window.ShadyCSS.cssBuild);var pf = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? mf = window.ShadyCSS.nativeCss : window.ShadyCSS ? (nf(window.ShadyCSS), window.ShadyCSS = void 0) : nf(window.WebComponents && window.WebComponents.flags);var R = mf,
      qf = of;var rf = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
      sf = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
      tf = /(--[\w-]+)\s*([:,;)]|$)/gi,
      uf = /(animation\s*:)|(animation-name\s*:)/,
      vf = /@media\s(.*)/,
      wf = /\{[^}]*\}/g;var xf = new Set();function yf(a, b) {
    if (!a) return "";"string" === typeof a && (a = Ue(a));b && zf(a, b);return ef(a, R);
  }function Af(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = Ue(a.textContent));return a.__cssRules || null;
  }function Bf(a) {
    return !!a.parent && a.parent.type === bf;
  }function zf(a, b, c, d) {
    if (a) {
      var e = !1,
          f = a.type;if (d && f === $e) {
        var g = a.selector.match(vf);g && (window.matchMedia(g[1]).matches || (e = !0));
      }f === df ? b(a) : c && f === bf ? c(a) : f === cf && (e = !0);if ((a = a.rules) && !e) for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) zf(g, b, c, d);
    }
  }
  function Cf(a, b, c, d) {
    var e = document.createElement("style");b && e.setAttribute("scope", b);e.textContent = a;Df(e, c, d);return e;
  }var Ef = null;function Ff(a) {
    a = document.createComment(" Shady DOM styles for " + a + " ");var b = document.head;b.insertBefore(a, (Ef ? Ef.nextSibling : null) || b.firstChild);return Ef = a;
  }function Df(a, b, c) {
    b = b || document.head;b.insertBefore(a, c && c.nextSibling || b.firstChild);Ef ? a.compareDocumentPosition(Ef) === Node.DOCUMENT_POSITION_PRECEDING && (Ef = a) : Ef = a;
  }
  function Gf(a, b) {
    for (var c = 0, d = a.length; b < d; b++) if ("(" === a[b]) c++;else if (")" === a[b] && 0 === --c) return b;return -1;
  }function Hf(a, b) {
    var c = a.indexOf("var(");if (-1 === c) return b(a, "", "", "");var d = Gf(a, c + 3),
        e = a.substring(c + 4, d);c = a.substring(0, c);a = Hf(a.substring(d + 1), b);d = e.indexOf(",");return -1 === d ? b(c, e.trim(), "", a) : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a);
  }function If(a, b) {
    P ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
  }
  var Jf = window.ShadyDOM && window.ShadyDOM.wrap || function (a) {
    return a;
  };function Kf(a) {
    var b = a.localName,
        c = "";b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);return { is: b, X: c };
  }function Lf(a) {
    for (var b = [], c = "", d = 0; 0 <= d && d < a.length; d++) if ("(" === a[d]) {
      var e = Gf(a, d);c += a.slice(d, e + 1);d = e;
    } else "," === a[d] ? (b.push(c), c = "") : c += a[d];c && b.push(c);return b;
  }
  function Mf(a) {
    if (void 0 !== qf) return qf;if (void 0 === a.__cssBuild) {
      var b = a.getAttribute("css-build");if (b) a.__cssBuild = b;else {
        a: {
          b = "template" === a.localName ? a.content.firstChild : a.firstChild;if (b instanceof Comment && (b = b.textContent.trim().split(":"), "css-build" === b[0])) {
            b = b[1];break a;
          }b = "";
        }if ("" !== b) {
          var c = "template" === a.localName ? a.content.firstChild : a.firstChild;c.parentNode.removeChild(c);
        }a.__cssBuild = b;
      }
    }return a.__cssBuild || "";
  }
  function Nf(a) {
    a = void 0 === a ? "" : a;return "" !== a && R ? P ? "shadow" === a : "shady" === a : !1;
  };function Of() {}function Pf(a, b) {
    Qf(S, a, function (a) {
      Rf(a, b || "");
    });
  }function Qf(a, b, c) {
    b.nodeType === Node.ELEMENT_NODE && c(b);var d;"template" === b.localName ? d = (b.content || b._content || b).childNodes : d = b.children || b.childNodes;if (d) for (b = 0; b < d.length; b++) Qf(a, d[b], c);
  }
  function Rf(a, b, c) {
    if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b));else if (a.getAttribute) {
      var d = a.getAttribute("class");c ? d && (b = d.replace("style-scope", "").replace(b, ""), If(a, b)) : If(a, (d ? d + " " : "") + "style-scope " + b);
    }
  }function Sf(a, b, c) {
    Qf(S, a, function (a) {
      Rf(a, b, !0);Rf(a, c);
    });
  }function Tf(a, b) {
    Qf(S, a, function (a) {
      Rf(a, b || "", !0);
    });
  }
  function Uf(a, b, c, d, e) {
    var f = S;e = void 0 === e ? "" : e;"" === e && (P || "shady" === (void 0 === d ? "" : d) ? e = yf(b, c) : (a = Kf(a), e = Vf(f, b, a.is, a.X, c) + "\n\n"));return e.trim();
  }function Vf(a, b, c, d, e) {
    var f = Wf(c, d);c = c ? "." + c : "";return yf(b, function (b) {
      b.c || (b.selector = b.C = Xf(a, b, a.b, c, f), b.c = !0);e && e(b, c, f);
    });
  }function Wf(a, b) {
    return b ? "[is=" + a + "]" : a;
  }
  function Xf(a, b, c, d, e) {
    var f = Lf(b.selector);if (!Bf(b)) {
      b = 0;for (var g = f.length, h = void 0; b < g && (h = f[b]); b++) f[b] = c.call(a, h, d, e);
    }return f.filter(function (a) {
      return !!a;
    }).join(",");
  }function Yf(a) {
    return a.replace(Zf, function (a, c, d) {
      -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));return ":" + c + "(" + d + ")";
    });
  }
  function $f(a) {
    for (var b = [], c; c = a.match(ag);) {
      var d = c.index,
          e = Gf(a, d);if (-1 === e) throw Error(c.input + " selector missing ')'");c = a.slice(d, e + 1);a = a.replace(c, "\ue000");b.push(c);
    }return { pa: a, matches: b };
  }function bg(a, b) {
    var c = a.split("\ue000");return b.reduce(function (a, b, f) {
      return a + b + c[f + 1];
    }, c[0]);
  }
  Of.prototype.b = function (a, b, c) {
    var d = !1;a = a.trim();var e = Zf.test(a);e && (a = a.replace(Zf, function (a, b, c) {
      return ":" + b + "(" + c.replace(/\s/g, "") + ")";
    }), a = Yf(a));var f = ag.test(a);if (f) {
      var g = $f(a);a = g.pa;g = g.matches;
    }a = a.replace(cg, ":host $1");a = a.replace(dg, function (a, e, f) {
      d || (a = eg(f, e, b, c), d = d || a.stop, e = a.Ja, f = a.value);return e + f;
    });f && (a = bg(a, g));e && (a = Yf(a));return a = a.replace(fg, function (a, b, c, d) {
      return '[dir="' + c + '"] ' + b + d + ", " + b + '[dir="' + c + '"]' + d;
    });
  };
  function eg(a, b, c, d) {
    var e = a.indexOf("::slotted");0 <= a.indexOf(":host") ? a = gg(a, d) : 0 !== e && (a = c ? hg(a, c) : a);c = !1;0 <= e && (b = "", c = !0);if (c) {
      var f = !0;c && (a = a.replace(ig, function (a, b) {
        return " > " + b;
      }));
    }return { value: a, Ja: b, stop: f };
  }function hg(a, b) {
    a = a.split(/(\[.+?\])/);for (var c = [], d = 0; d < a.length; d++) if (1 === d % 2) c.push(a[d]);else {
      var e = a[d];if ("" !== e || d !== a.length - 1) e = e.split(":"), e[0] += b, c.push(e.join(":"));
    }return c.join("");
  }
  function gg(a, b) {
    var c = a.match(jg);return (c = c && c[2].trim() || "") ? c[0].match(kg) ? a.replace(jg, function (a, c, f) {
      return b + f;
    }) : c.split(kg)[0] === b ? c : "should_not_match" : a.replace(":host", b);
  }function lg(a) {
    ":root" === a.selector && (a.selector = "html");
  }Of.prototype.c = function (a) {
    return a.match(":host") ? "" : a.match("::slotted") ? this.b(a, ":not(.style-scope)") : hg(a.trim(), ":not(.style-scope)");
  };t.Object.defineProperties(Of.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "style-scope";
      } } });
  var Zf = /:(nth[-\w]+)\(([^)]+)\)/,
      dg = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
      kg = /[[.:#*]/,
      cg = /^(::slotted)/,
      jg = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      ig = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      fg = /(.*):dir\((?:(ltr|rtl))\)(.*)/,
      ag = /:(?:matches|any|-(?:webkit|moz)-any)/,
      S = new Of();function mg(a, b, c, d, e) {
    this.L = a || null;this.b = b || null;this.na = c || [];this.G = null;this.cssBuild = e || "";this.X = d || "";this.a = this.H = this.K = null;
  }function U(a) {
    return a ? a.__styleInfo : null;
  }function ng(a, b) {
    return a.__styleInfo = b;
  }mg.prototype.c = function () {
    return this.L;
  };mg.prototype._getStyleRules = mg.prototype.c;function og(a) {
    var b = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;return b && b.call(this, a);
  }var pg = navigator.userAgent.match("Trident");function qg() {}function rg(a) {
    var b = {},
        c = [],
        d = 0;zf(a, function (a) {
      sg(a);a.index = d++;a = a.A.cssText;for (var c; c = tf.exec(a);) {
        var e = c[1];":" !== c[2] && (b[e] = !0);
      }
    }, function (a) {
      c.push(a);
    });a.b = c;a = [];for (var e in b) a.push(e);return a;
  }
  function sg(a) {
    if (!a.A) {
      var b = {},
          c = {};tg(a, c) && (b.J = c, a.rules = null);b.cssText = a.parsedCssText.replace(wf, "").replace(rf, "");a.A = b;
    }
  }function tg(a, b) {
    var c = a.A;if (c) {
      if (c.J) return Object.assign(b, c.J), !0;
    } else {
      c = a.parsedCssText;for (var d; a = rf.exec(c);) {
        d = (a[2] || a[3]).trim();if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;d = !0;
      }return d;
    }
  }
  function ug(a, b, c) {
    b && (b = 0 <= b.indexOf(";") ? vg(a, b, c) : Hf(b, function (b, e, f, g) {
      if (!e) return b + g;(e = ug(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = ug(a, c[f] || f, c) || f;return b + (e || "") + g;
    }));return b && b.trim() || "";
  }
  function vg(a, b, c) {
    b = b.split(";");for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
      sf.lastIndex = 0;if (f = sf.exec(e)) e = ug(a, c[f[1]], c);else if (f = e.indexOf(":"), -1 !== f) {
        var g = e.substring(f);g = g.trim();g = ug(a, g, c) || g;e = e.substring(0, f) + g;
      }b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || "";
    }return b.join(";");
  }
  function wg(a, b) {
    var c = {},
        d = [];zf(a, function (a) {
      a.A || sg(a);var e = a.C || a.parsedSelector;b && a.A.J && e && og.call(b, e) && (tg(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32);
    }, null, !0);return { J: c, key: d };
  }
  function xg(a, b, c, d) {
    b.A || sg(b);if (b.A.J) {
      var e = Kf(a);a = e.is;e = e.X;e = a ? Wf(a, e) : "html";var f = b.parsedSelector,
          g = ":host > *" === f || "html" === f,
          h = 0 === f.indexOf(":host") && !g;"shady" === c && (g = f === e + " > *." + e || -1 !== f.indexOf("html"), h = !g && 0 === f.indexOf(e));if (g || h) c = e, h && (b.C || (b.C = Xf(S, b, S.b, a ? "." + a : "", e)), c = b.C || e), d({ pa: c, Qa: h, cb: g });
    }
  }function yg(a, b, c) {
    var d = {},
        e = {};zf(b, function (b) {
      xg(a, b, c, function (c) {
        og.call(a._element || a, c.pa) && (c.Qa ? tg(b, d) : tg(b, e));
      });
    }, null, !0);return { Va: e, Oa: d };
  }
  function zg(a, b, c, d) {
    var e = Kf(b),
        f = Wf(e.is, e.X),
        g = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])"),
        h = U(b);e = h.L;h = h.cssBuild;var k = Ag(e, d);return Uf(b, e, function (b) {
      var e = "";b.A || sg(b);b.A.cssText && (e = vg(a, b.A.cssText, c));b.cssText = e;if (!P && !Bf(b) && b.cssText) {
        var h = e = b.cssText;null == b.ta && (b.ta = uf.test(e));if (b.ta) if (null == b.ea) {
          b.ea = [];for (var l in k) h = k[l], h = h(e), e !== h && (e = h, b.ea.push(l));
        } else {
          for (l = 0; l < b.ea.length; ++l) h = k[b.ea[l]], e = h(e);h = e;
        }b.cssText = h;b.C = b.C || b.selector;e = "." + d;l = Lf(b.C);h = 0;for (var u = l.length, x = void 0; h < u && (x = l[h]); h++) l[h] = x.match(g) ? x.replace(f, e) : e + " " + x;b.selector = l.join(",");
      }
    }, h);
  }function Ag(a, b) {
    a = a.b;var c = {};if (!P && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
      var f = e,
          g = b;f.f = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");f.a = f.keyframesName + "-" + g;f.C = f.C || f.selector;f.selector = f.C.replace(f.keyframesName, f.a);c[e.keyframesName] = Bg(e);
    }return c;
  }function Bg(a) {
    return function (b) {
      return b.replace(a.f, a.a);
    };
  }
  function Cg(a, b) {
    var c = Dg,
        d = Af(a);a.textContent = yf(d, function (a) {
      var d = a.cssText = a.parsedCssText;a.A && a.A.cssText && (d = d.replace(ff, "").replace(gf, ""), a.cssText = vg(c, d, b));
    });
  }t.Object.defineProperties(qg.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "x-scope";
      } } });var Dg = new qg();var Eg = {},
      Fg = window.customElements;if (Fg && !P && !pf) {
    var Gg = Fg.define;Fg.define = function (a, b, c) {
      Eg[a] || (Eg[a] = Ff(a));Gg.call(Fg, a, b, c);
    };
  };function Hg() {
    this.cache = {};
  }Hg.prototype.store = function (a, b, c, d) {
    var e = this.cache[a] || [];e.push({ J: b, styleElement: c, H: d });100 < e.length && e.shift();this.cache[a] = e;
  };function Ig() {}var Jg = new RegExp(S.a + "\\s*([^\\s]*)");function Kg(a) {
    return (a = (a.classList && a.classList.value ? a.classList.value : a.getAttribute("class") || "").match(Jg)) ? a[1] : "";
  }function Lg(a) {
    var b = Jf(a).getRootNode();return b === a || b === a.ownerDocument ? "" : (a = b.host) ? Kf(a).is : "";
  }
  function Mg(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b];if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
        var e = c.addedNodes[d];if (e.nodeType === Node.ELEMENT_NODE) {
          var f = e.getRootNode(),
              g = Kg(e);if (g && f === e.ownerDocument && ("style" !== e.localName && "template" !== e.localName || "" === Mf(e))) Tf(e, g);else if (f instanceof ShadowRoot) for (f = Lg(e), f !== g && Sf(e, g, f), e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + S.a + ")"), g = 0; g < e.length; g++) {
            f = e[g];
            var h = Lg(f);h && Rf(f, h);
          }
        }
      }
    }
  }
  if (!(P || window.ShadyDOM && window.ShadyDOM.handlesDynamicScoping)) {
    var Ng = new MutationObserver(Mg),
        Og = function (a) {
      Ng.observe(a, { childList: !0, subtree: !0 });
    };if (window.customElements && !window.customElements.polyfillWrapFlushCallback) Og(document);else {
      var Pg = function () {
        Og(document.body);
      };window.HTMLImports ? window.HTMLImports.whenReady(Pg) : requestAnimationFrame(function () {
        if ("loading" === document.readyState) {
          var a = function () {
            Pg();document.removeEventListener("readystatechange", a);
          };document.addEventListener("readystatechange", a);
        } else Pg();
      });
    }Ig = function () {
      Mg(Ng.takeRecords());
    };
  }var Qg = Ig;var Rg = {};var Sg = Promise.resolve();function Tg(a) {
    if (a = Rg[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
  }function Ug(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion;
  }function Vg(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion;a._validating || (a._validating = !0, Sg.then(function () {
      a._applyShimCurrentVersion = a._applyShimNextVersion;a._validating = !1;
    }));
  };var Wg = {},
      Xg = new Hg();function V() {
    this.F = {};this.c = document.documentElement;var a = new Te();a.rules = [];this.f = ng(this.c, new mg(a));this.u = !1;this.b = this.a = null;
  }r = V.prototype;r.flush = function () {
    Qg();
  };r.Ma = function (a) {
    return Af(a);
  };r.Za = function (a) {
    return yf(a);
  };r.prepareTemplate = function (a, b, c) {
    this.prepareTemplateDom(a, b);this.prepareTemplateStyles(a, b, c);
  };
  r.prepareTemplateStyles = function (a, b, c) {
    if (!a._prepared && !pf) {
      P || Eg[b] || (Eg[b] = Ff(b));a._prepared = !0;a.name = b;a.extends = c;Rg[b] = a;var d = Mf(a),
          e = Nf(d);c = { is: b, extends: c };for (var f = [], g = a.content.querySelectorAll("style"), h = 0; h < g.length; h++) {
        var k = g[h];if (k.hasAttribute("shady-unscoped")) {
          if (!P) {
            var l = k.textContent;xf.has(l) || (xf.add(l), l = k.cloneNode(!0), document.head.appendChild(l));k.parentNode.removeChild(k);
          }
        } else f.push(k.textContent), k.parentNode.removeChild(k);
      }f = f.join("").trim() + (Wg[b] || "");
      Yg(this);if (!e) {
        if (g = !d) g = sf.test(f) || rf.test(f), sf.lastIndex = 0, rf.lastIndex = 0;h = Ue(f);g && R && this.a && this.a.transformRules(h, b);a._styleAst = h;
      }g = [];R || (g = rg(a._styleAst));if (!g.length || R) h = P ? a.content : null, b = Eg[b] || null, d = Uf(c, a._styleAst, null, d, e ? f : ""), d = d.length ? Cf(d, c.is, h, b) : null, a._style = d;a.a = g;
    }
  };r.Ua = function (a, b) {
    Wg[b] = a.join(" ");
  };r.prepareTemplateDom = function (a, b) {
    if (!pf) {
      var c = Mf(a);P || "shady" === c || a._domPrepared || (a._domPrepared = !0, Pf(a.content, b));
    }
  };
  function Zg(a) {
    var b = Kf(a),
        c = b.is;b = b.X;var d = Eg[c] || null,
        e = Rg[c];if (e) {
      c = e._styleAst;var f = e.a;e = Mf(e);b = new mg(c, d, f, b, e);ng(a, b);return b;
    }
  }function $g(a) {
    !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
      a.ya(b);
    }, a.b.validateCallback = function () {
      requestAnimationFrame(function () {
        (a.b.enqueued || a.u) && a.flushCustomStyles();
      });
    });
  }
  function Yg(a) {
    !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = Tg);$g(a);
  }
  r.flushCustomStyles = function () {
    if (!pf && (Yg(this), this.b)) {
      var a = this.b.processStyles();if (this.b.enqueued && !Nf(this.f.cssBuild)) {
        if (R) {
          if (!this.f.cssBuild) for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b]);if (c && R && this.a) {
              var d = Af(c);Yg(this);this.a.transformRules(d);c.textContent = yf(d);
            }
          }
        } else {
          ah(this, this.c, this.f);for (b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && Cg(c, this.f.K);this.u && this.styleDocument();
        }this.b.enqueued = !1;
      }
    }
  };
  r.styleElement = function (a, b) {
    if (pf) {
      if (b) {
        U(a) || ng(a, new mg(null));var c = U(a);c.G = c.G || {};Object.assign(c.G, b);bh(this, a, c);
      }
    } else if (c = U(a) || Zg(a)) if (a !== this.c && (this.u = !0), b && (c.G = c.G || {}, Object.assign(c.G, b)), R) bh(this, a, c);else if (this.flush(), ah(this, a, c), c.na && c.na.length) {
      b = Kf(a).is;var d;a: {
        if (d = Xg.cache[b]) for (var e = d.length - 1; 0 <= e; e--) {
          var f = d[e];b: {
            var g = c.na;for (var h = 0; h < g.length; h++) {
              var k = g[h];if (f.J[k] !== c.K[k]) {
                g = !1;break b;
              }
            }g = !0;
          }if (g) {
            d = f;break a;
          }
        }d = void 0;
      }g = d ? d.styleElement : null;
      e = c.H;(f = d && d.H) || (f = this.F[b] = (this.F[b] || 0) + 1, f = b + "-" + f);c.H = f;f = c.H;h = Dg;h = g ? g.textContent || "" : zg(h, a, c.K, f);k = U(a);var l = k.a;l && !P && l !== g && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));P ? k.a ? (k.a.textContent = h, g = k.a) : h && (g = Cf(h, f, a.shadowRoot, k.b)) : g ? g.parentNode || (pg && -1 < h.indexOf("@media") && (g.textContent = h), Df(g, null, k.b)) : h && (g = Cf(h, f, null, k.b));g && (g._useCount = g._useCount || 0, k.a != g && g._useCount++, k.a = g);f = g;P || (g = c.H, k = h = a.getAttribute("class") || "", e && (k = h.replace(new RegExp("\\s*x-scope\\s*" + e + "\\s*", "g"), " ")), k += (k ? " " : "") + "x-scope " + g, h !== k && If(a, k));d || Xg.store(b, c.K, f, c.H);
    }
  };
  function bh(a, b, c) {
    var d = Kf(b).is;if (c.G) {
      var e = c.G,
          f;for (f in e) null === f ? b.style.removeProperty(f) : b.style.setProperty(f, e[f]);
    }e = Rg[d];if (!(!e && b !== a.c || e && "" !== Mf(e)) && e && e._style && !Ug(e)) {
      if (Ug(e) || e._applyShimValidatingVersion !== e._applyShimNextVersion) Yg(a), a.a && a.a.transformRules(e._styleAst, d), e._style.textContent = Uf(b, c.L), Vg(e);P && (a = b.shadowRoot) && (a = a.querySelector("style")) && (a.textContent = Uf(b, c.L));c.L = e._styleAst;
    }
  }
  function ch(a, b) {
    return (b = Jf(b).getRootNode().host) ? U(b) || Zg(b) ? b : ch(a, b) : a.c;
  }function ah(a, b, c) {
    var d = ch(a, b),
        e = U(d),
        f = e.K;d === a.c || f || (ah(a, d, e), f = e.K);a = Object.create(f || null);d = yg(b, c.L, c.cssBuild);b = wg(e.L, b).J;Object.assign(a, d.Oa, b, d.Va);b = c.G;for (var g in b) if ((e = b[g]) || 0 === e) a[g] = e;g = Dg;b = Object.getOwnPropertyNames(a);for (e = 0; e < b.length; e++) d = b[e], a[d] = ug(g, a[d], a);c.K = a;
  }r.styleDocument = function (a) {
    this.styleSubtree(this.c, a);
  };
  r.styleSubtree = function (a, b) {
    var c = Jf(a),
        d = c.shadowRoot;(d || a === this.c) && this.styleElement(a, b);if (a = d && (d.children || d.childNodes)) for (c = 0; c < a.length; c++) this.styleSubtree(a[c]);else if (c = c.children || c.childNodes) for (a = 0; a < c.length; a++) this.styleSubtree(c[a]);
  };
  r.ya = function (a) {
    var b = this,
        c = Mf(a);c !== this.f.cssBuild && (this.f.cssBuild = c);if (!Nf(c)) {
      var d = Af(a);zf(d, function (a) {
        if (P) lg(a);else {
          var d = S;a.selector = a.parsedSelector;lg(a);a.selector = a.C = Xf(d, a, d.c, void 0, void 0);
        }R && "" === c && (Yg(b), b.a && b.a.transformRule(a));
      });R ? a.textContent = yf(d) : this.f.L.rules.push(d);
    }
  };r.getComputedStyleValue = function (a, b) {
    var c;R || (c = (U(a) || U(ch(this, a))).K[b]);return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : "";
  };
  r.Ya = function (a, b) {
    var c = Jf(a).getRootNode();b = b ? b.split(/\s/) : [];c = c.host && c.host.localName;if (!c) {
      var d = a.getAttribute("class");if (d) {
        d = d.split(/\s/);for (var e = 0; e < d.length; e++) if (d[e] === S.a) {
          c = d[e + 1];break;
        }
      }
    }c && b.push(S.a, c);R || (c = U(a)) && c.H && b.push(Dg.a, c.H);If(a, b.join(" "));
  };r.Ha = function (a) {
    return U(a);
  };r.Xa = function (a, b) {
    Rf(a, b);
  };r.$a = function (a, b) {
    Rf(a, b, !0);
  };r.Wa = function (a) {
    return Lg(a);
  };r.Ka = function (a) {
    return Kg(a);
  };V.prototype.flush = V.prototype.flush;V.prototype.prepareTemplate = V.prototype.prepareTemplate;
  V.prototype.styleElement = V.prototype.styleElement;V.prototype.styleDocument = V.prototype.styleDocument;V.prototype.styleSubtree = V.prototype.styleSubtree;V.prototype.getComputedStyleValue = V.prototype.getComputedStyleValue;V.prototype.setElementClass = V.prototype.Ya;V.prototype._styleInfoForNode = V.prototype.Ha;V.prototype.transformCustomStyleForDocument = V.prototype.ya;V.prototype.getStyleAst = V.prototype.Ma;V.prototype.styleAstToString = V.prototype.Za;V.prototype.flushCustomStyles = V.prototype.flushCustomStyles;
  V.prototype.scopeNode = V.prototype.Xa;V.prototype.unscopeNode = V.prototype.$a;V.prototype.scopeForNode = V.prototype.Wa;V.prototype.currentScopeForNode = V.prototype.Ka;V.prototype.prepareAdoptedCssText = V.prototype.Ua;Object.defineProperties(V.prototype, { nativeShadow: { get: function () {
        return P;
      } }, nativeCss: { get: function () {
        return R;
      } } });var W = new V(),
      dh,
      eh;window.ShadyCSS && (dh = window.ShadyCSS.ApplyShim, eh = window.ShadyCSS.CustomStyleInterface);
  window.ShadyCSS = { ScopingShim: W, prepareTemplate: function (a, b, c) {
      W.flushCustomStyles();W.prepareTemplate(a, b, c);
    }, prepareTemplateDom: function (a, b) {
      W.prepareTemplateDom(a, b);
    }, prepareTemplateStyles: function (a, b, c) {
      W.flushCustomStyles();W.prepareTemplateStyles(a, b, c);
    }, styleSubtree: function (a, b) {
      W.flushCustomStyles();W.styleSubtree(a, b);
    }, styleElement: function (a) {
      W.flushCustomStyles();W.styleElement(a);
    }, styleDocument: function (a) {
      W.flushCustomStyles();W.styleDocument(a);
    }, flushCustomStyles: function () {
      W.flushCustomStyles();
    },
    getComputedStyleValue: function (a, b) {
      return W.getComputedStyleValue(a, b);
    }, nativeCss: R, nativeShadow: P, cssBuild: qf, disableRuntime: pf };dh && (window.ShadyCSS.ApplyShim = dh);eh && (window.ShadyCSS.CustomStyleInterface = eh);(function (a) {
    function b(a) {
      "" == a && (f.call(this), this.i = !0);return a.toLowerCase();
    }function c(a) {
      var b = a.charCodeAt(0);return 32 < b && 127 > b && -1 == [34, 35, 60, 62, 63, 96].indexOf(b) ? a : encodeURIComponent(a);
    }function d(a) {
      var b = a.charCodeAt(0);return 32 < b && 127 > b && -1 == [34, 35, 60, 62, 96].indexOf(b) ? a : encodeURIComponent(a);
    }function e(a, e, g) {
      function h(a) {
        X.push(a);
      }var k = e || "scheme start",
          x = 0,
          q = "",
          u = !1,
          Q = !1,
          X = [];a: for (; (void 0 != a[x - 1] || 0 == x) && !this.i;) {
        var m = a[x];switch (k) {case "scheme start":
            if (m && p.test(m)) q += m.toLowerCase(), k = "scheme";else if (e) {
              h("Invalid scheme.");break a;
            } else {
              q = "";k = "no scheme";continue;
            }break;case "scheme":
            if (m && G.test(m)) q += m.toLowerCase();else if (":" == m) {
              this.h = q;q = "";if (e) break a;void 0 !== l[this.h] && (this.B = !0);k = "file" == this.h ? "relative" : this.B && g && g.h == this.h ? "relative or authority" : this.B ? "authority first slash" : "scheme data";
            } else if (e) {
              void 0 != m && h("Code point not allowed in scheme: " + m);break a;
            } else {
              q = "";x = 0;k = "no scheme";continue;
            }break;case "scheme data":
            "?" == m ? (this.o = "?", k = "query") : "#" == m ? (this.v = "#", k = "fragment") : void 0 != m && "\t" != m && "\n" != m && "\r" != m && (this.la += c(m));break;case "no scheme":
            if (g && void 0 !== l[g.h]) {
              k = "relative";continue;
            } else h("Missing scheme."), f.call(this), this.i = !0;break;case "relative or authority":
            if ("/" == m && "/" == a[x + 1]) k = "authority ignore slashes";else {
              h("Expected /, got: " + m);k = "relative";continue;
            }break;case "relative":
            this.B = !0;"file" != this.h && (this.h = g.h);if (void 0 == m) {
              this.j = g.j;this.m = g.m;this.l = g.l.slice();this.o = g.o;this.s = g.s;this.g = g.g;break a;
            } else if ("/" == m || "\\" == m) "\\" == m && h("\\ is an invalid code point."), k = "relative slash";else if ("?" == m) this.j = g.j, this.m = g.m, this.l = g.l.slice(), this.o = "?", this.s = g.s, this.g = g.g, k = "query";else if ("#" == m) this.j = g.j, this.m = g.m, this.l = g.l.slice(), this.o = g.o, this.v = "#", this.s = g.s, this.g = g.g, k = "fragment";else {
              k = a[x + 1];var y = a[x + 2];if ("file" != this.h || !p.test(m) || ":" != k && "|" != k || void 0 != y && "/" != y && "\\" != y && "?" != y && "#" != y) this.j = g.j, this.m = g.m, this.s = g.s, this.g = g.g, this.l = g.l.slice(), this.l.pop();k = "relative path";continue;
            }break;
          case "relative slash":
            if ("/" == m || "\\" == m) "\\" == m && h("\\ is an invalid code point."), k = "file" == this.h ? "file host" : "authority ignore slashes";else {
              "file" != this.h && (this.j = g.j, this.m = g.m, this.s = g.s, this.g = g.g);k = "relative path";continue;
            }break;case "authority first slash":
            if ("/" == m) k = "authority second slash";else {
              h("Expected '/', got: " + m);k = "authority ignore slashes";continue;
            }break;case "authority second slash":
            k = "authority ignore slashes";if ("/" != m) {
              h("Expected '/', got: " + m);continue;
            }break;case "authority ignore slashes":
            if ("/" != m && "\\" != m) {
              k = "authority";continue;
            } else h("Expected authority, got: " + m);break;case "authority":
            if ("@" == m) {
              u && (h("@ already seen."), q += "%40");u = !0;for (m = 0; m < q.length; m++) y = q[m], "\t" == y || "\n" == y || "\r" == y ? h("Invalid whitespace in authority.") : ":" == y && null === this.g ? this.g = "" : (y = c(y), null !== this.g ? this.g += y : this.s += y);q = "";
            } else if (void 0 == m || "/" == m || "\\" == m || "?" == m || "#" == m) {
              x -= q.length;q = "";k = "host";continue;
            } else q += m;break;case "file host":
            if (void 0 == m || "/" == m || "\\" == m || "?" == m || "#" == m) {
              2 != q.length || !p.test(q[0]) || ":" != q[1] && "|" != q[1] ? (0 != q.length && (this.j = b.call(this, q), q = ""), k = "relative path start") : k = "relative path";continue;
            } else "\t" == m || "\n" == m || "\r" == m ? h("Invalid whitespace in file host.") : q += m;break;case "host":case "hostname":
            if (":" != m || Q) {
              if (void 0 == m || "/" == m || "\\" == m || "?" == m || "#" == m) {
                this.j = b.call(this, q);q = "";k = "relative path start";if (e) break a;continue;
              } else "\t" != m && "\n" != m && "\r" != m ? ("[" == m ? Q = !0 : "]" == m && (Q = !1), q += m) : h("Invalid code point in host/hostname: " + m);
            } else if (this.j = b.call(this, q), q = "", k = "port", "hostname" == e) break a;break;case "port":
            if (/[0-9]/.test(m)) q += m;else if (void 0 == m || "/" == m || "\\" == m || "?" == m || "#" == m || e) {
              "" != q && (q = parseInt(q, 10), q != l[this.h] && (this.m = q + ""), q = "");if (e) break a;k = "relative path start";continue;
            } else "\t" == m || "\n" == m || "\r" == m ? h("Invalid code point in port: " + m) : (f.call(this), this.i = !0);break;case "relative path start":
            "\\" == m && h("'\\' not allowed in path.");k = "relative path";if ("/" != m && "\\" != m) continue;break;case "relative path":
            if (void 0 != m && "/" != m && "\\" != m && (e || "?" != m && "#" != m)) "\t" != m && "\n" != m && "\r" != m && (q += c(m));else {
              "\\" == m && h("\\ not allowed in relative path.");if (y = n[q.toLowerCase()]) q = y;".." == q ? (this.l.pop(), "/" != m && "\\" != m && this.l.push("")) : "." == q && "/" != m && "\\" != m ? this.l.push("") : "." != q && ("file" == this.h && 0 == this.l.length && 2 == q.length && p.test(q[0]) && "|" == q[1] && (q = q[0] + ":"), this.l.push(q));q = "";"?" == m ? (this.o = "?", k = "query") : "#" == m && (this.v = "#", k = "fragment");
            }break;case "query":
            e || "#" != m ? void 0 != m && "\t" != m && "\n" != m && "\r" != m && (this.o += d(m)) : (this.v = "#", k = "fragment");break;case "fragment":
            void 0 != m && "\t" != m && "\n" != m && "\r" != m && (this.v += m);}x++;
      }
    }function f() {
      this.s = this.la = this.h = "";this.g = null;this.m = this.j = "";this.l = [];this.v = this.o = "";this.B = this.i = !1;
    }function g(a, b) {
      void 0 === b || b instanceof g || (b = new g(String(b)));this.a = a;f.call(this);a = this.a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");e.call(this, a, null, b);
    }var h = !1;try {
      var k = new URL("b", "http://a");k.pathname = "c%20d";h = "http://a/c%20d" === k.href;
    } catch (x) {}if (!h) {
      var l = Object.create(null);l.ftp = 21;l.file = 0;l.gopher = 70;l.http = 80;l.https = 443;l.ws = 80;l.wss = 443;var n = Object.create(null);n["%2e"] = ".";n[".%2e"] = "..";n["%2e."] = "..";n["%2e%2e"] = "..";var p = /[a-zA-Z]/,
          G = /[a-zA-Z0-9\+\-\.]/;g.prototype = { toString: function () {
          return this.href;
        }, get href() {
          if (this.i) return this.a;var a = "";if ("" != this.s || null != this.g) a = this.s + (null != this.g ? ":" + this.g : "") + "@";return this.protocol + (this.B ? "//" + a + this.host : "") + this.pathname + this.o + this.v;
        }, set href(a) {
          f.call(this);e.call(this, a);
        }, get protocol() {
          return this.h + ":";
        }, set protocol(a) {
          this.i || e.call(this, a + ":", "scheme start");
        }, get host() {
          return this.i ? "" : this.m ? this.j + ":" + this.m : this.j;
        }, set host(a) {
          !this.i && this.B && e.call(this, a, "host");
        }, get hostname() {
          return this.j;
        }, set hostname(a) {
          !this.i && this.B && e.call(this, a, "hostname");
        }, get port() {
          return this.m;
        }, set port(a) {
          !this.i && this.B && e.call(this, a, "port");
        }, get pathname() {
          return this.i ? "" : this.B ? "/" + this.l.join("/") : this.la;
        }, set pathname(a) {
          !this.i && this.B && (this.l = [], e.call(this, a, "relative path start"));
        }, get search() {
          return this.i || !this.o || "?" == this.o ? "" : this.o;
        }, set search(a) {
          !this.i && this.B && (this.o = "?", "?" == a[0] && (a = a.slice(1)), e.call(this, a, "query"));
        }, get hash() {
          return this.i || !this.v || "#" == this.v ? "" : this.v;
        }, set hash(a) {
          this.i || (a ? (this.v = "#", "#" == a[0] && (a = a.slice(1)), e.call(this, a, "fragment")) : this.v = "");
        }, get origin() {
          var a;if (this.i || !this.h) return "";switch (this.h) {case "data":case "file":case "javascript":case "mailto":
              return "null";}return (a = this.host) ? this.h + "://" + a : "";
        } };var u = a.URL;u && (g.createObjectURL = function (a) {
        return u.createObjectURL.apply(u, arguments);
      }, g.revokeObjectURL = function (a) {
        u.revokeObjectURL(a);
      });a.URL = g;
    }
  })(window);Object.getOwnPropertyDescriptor(Node.prototype, "baseURI") || Object.defineProperty(Node.prototype, "baseURI", { get: function () {
      var a = (this.ownerDocument || this).querySelector("base[href]");return a && a.href || window.location.href;
    }, configurable: !0, enumerable: !0 });var fh = document.createElement("style");fh.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var gh = document.querySelector("head");gh.insertBefore(fh, gh.firstChild);
}).call(this);

//# sourceMappingURL=webcomponents-sd-ce-pf.js.map