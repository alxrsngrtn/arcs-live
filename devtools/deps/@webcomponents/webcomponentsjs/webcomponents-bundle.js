/// BareSpecifier=@webcomponents/webcomponentsjs/webcomponents-bundle
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
      ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  };function da() {
    da = function () {};t.Symbol || (t.Symbol = ea);
  }var ea = function () {
    var a = 0;return function (b) {
      return "jscomp_symbol_" + (b || "") + a++;
    };
  }();
  function fa() {
    da();var a = t.Symbol.iterator;a || (a = t.Symbol.iterator = t.Symbol("iterator"));"function" != typeof Array.prototype[a] && ca(Array.prototype, a, { configurable: !0, writable: !0, value: function () {
        return ha(this);
      } });fa = function () {};
  }function ha(a) {
    var b = 0;return ia(function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }function ia(a) {
    fa();a = { next: a };a[t.Symbol.iterator] = function () {
      return this;
    };return a;
  }function ja(a) {
    fa();var b = a[Symbol.iterator];return b ? b.call(a) : ha(a);
  }
  function ka(a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);return c;
  }var la;if ("function" == typeof Object.setPrototypeOf) la = Object.setPrototypeOf;else {
    var ma;a: {
      var na = { Ga: !0 },
          oa = {};try {
        oa.__proto__ = na;ma = oa.Ga;break a;
      } catch (a) {}ma = !1;
    }la = ma ? function (a, b) {
      a.__proto__ = b;if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");return a;
    } : null;
  }var pa = la;function qa() {
    this.f = !1;this.b = null;this.aa = void 0;this.a = 1;this.F = 0;this.c = null;
  }
  function ra(a) {
    if (a.f) throw new TypeError("Generator is already running");a.f = !0;
  }qa.prototype.u = function (a) {
    this.aa = a;
  };function sa(a, b) {
    a.c = { Ja: b, Na: !0 };a.a = a.F;
  }qa.prototype.return = function (a) {
    this.c = { return: a };this.a = this.F;
  };function ta(a, b) {
    a.a = 3;return { value: b };
  }function ua(a) {
    this.a = new qa();this.b = a;
  }function va(a, b) {
    ra(a.a);var c = a.a.b;if (c) return wa(a, "return" in c ? c["return"] : function (a) {
      return { value: a, done: !0 };
    }, b, a.a.return);a.a.return(b);return xa(a);
  }
  function wa(a, b, c, d) {
    try {
      var e = b.call(a.a.b, c);if (!(e instanceof Object)) throw new TypeError("Iterator result " + e + " is not an object");if (!e.done) return a.a.f = !1, e;var f = e.value;
    } catch (g) {
      return a.a.b = null, sa(a.a, g), xa(a);
    }a.a.b = null;d.call(a.a, f);return xa(a);
  }function xa(a) {
    for (; a.a.a;) try {
      var b = a.b(a.a);if (b) return a.a.f = !1, { value: b.value, done: !1 };
    } catch (c) {
      a.a.aa = void 0, sa(a.a, c);
    }a.a.f = !1;if (a.a.c) {
      b = a.a.c;a.a.c = null;if (b.Na) throw b.Ja;return { value: b.return, done: !0 };
    }return { value: void 0, done: !0 };
  }
  function ya(a) {
    this.next = function (b) {
      ra(a.a);a.a.b ? b = wa(a, a.a.b.next, b, a.a.u) : (a.a.u(b), b = xa(a));return b;
    };this.throw = function (b) {
      ra(a.a);a.a.b ? b = wa(a, a.a.b["throw"], b, a.a.u) : (sa(a.a, b), b = xa(a));return b;
    };this.return = function (b) {
      return va(a, b);
    };fa();this[Symbol.iterator] = function () {
      return this;
    };
  }function Ba(a, b) {
    b = new ya(new ua(b));pa && pa(b, a.prototype);return b;
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
      for (var c = [].slice.call(arguments, 1), d = 0, e; d < c.length; d++) if (e = c[d]) for (var f = a, n = e, q = Object.getOwnPropertyNames(n), I = 0; I < q.length; I++) e = q[I], f[e] = n[e];return a;
    });
  })();(function () {
    function a() {}function b(a, b) {
      if (!a.childNodes.length) return [];switch (a.nodeType) {case Node.DOCUMENT_NODE:
          return Q.call(a, b);case Node.DOCUMENT_FRAGMENT_NODE:
          return Eb.call(a, b);default:
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
        q = DOMParser.prototype.parseFromString,
        I = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML") || { get: function () {
        return this.innerHTML;
      }, set: function (a) {
        this.innerHTML = a;
      } },
        v = Object.getOwnPropertyDescriptor(window.Node.prototype, "childNodes") || { get: function () {
        return this.childNodes;
      } },
        x = Element.prototype.querySelectorAll,
        Q = Document.prototype.querySelectorAll,
        Eb = DocumentFragment.prototype.querySelectorAll,
        Fb = function () {
      if (!c) {
        var a = document.createElement("template"),
            b = document.createElement("template");b.content.appendChild(document.createElement("div"));
        a.content.appendChild(b);a = a.cloneNode(!0);return 0 === a.content.childNodes.length || 0 === a.content.firstChild.content.childNodes.length || d;
      }
    }();if (c) {
      var T = document.implementation.createHTMLDocument("template"),
          Ja = !0,
          p = document.createElement("style");p.textContent = "template{display:none;}";var za = document.head;za.insertBefore(p, za.firstElementChild);a.prototype = Object.create(HTMLElement.prototype);var aa = !document.createElement("div").hasOwnProperty("innerHTML");a.S = function (b) {
        if (!b.content && b.namespaceURI === document.documentElement.namespaceURI) {
          b.content = T.createDocumentFragment();for (var c; c = b.firstChild;) l.call(b.content, c);if (aa) b.__proto__ = a.prototype;else if (b.cloneNode = function (b) {
            return a.b(this, b);
          }, Ja) try {
            m(b), y(b);
          } catch (vh) {
            Ja = !1;
          }a.a(b.content);
        }
      };var X = { option: ["select"], thead: ["table"], col: ["colgroup", "table"], tr: ["tbody", "table"], th: ["tr", "tbody", "table"], td: ["tr", "tbody", "table"] },
          m = function (b) {
        Object.defineProperty(b, "innerHTML", { get: function () {
            return ba(this);
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
        c = b(c, "template");for (var d = 0, e = c.length, f; d < e && (f = c[d]); d++) a.S(f);
      };document.addEventListener("DOMContentLoaded", function () {
        a.a(document);
      });Document.prototype.createElement = function () {
        var b = g.apply(this, arguments);"template" === b.localName && a.S(b);return b;
      };DOMParser.prototype.parseFromString = function () {
        var b = q.apply(this, arguments);a.a(b);return b;
      };Object.defineProperty(HTMLElement.prototype, "innerHTML", { get: function () {
          return ba(this);
        }, set: function (b) {
          I.set.call(this, b);a.a(this);
        }, configurable: !0, enumerable: !0 });var Y = /[&\u00A0"]/g,
          Gb = /[&\u00A0<>]/g,
          Ka = function (a) {
        switch (a) {case "&":
            return "&amp;";case "<":
            return "&lt;";case ">":
            return "&gt;";case '"':
            return "&quot;";case "\u00a0":
            return "&nbsp;";}
      };p = function (a) {
        for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;return b;
      };var Aa = p("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
          La = p("style script xmp iframe noembed noframes plaintext noscript".split(" ")),
          ba = function (a, b) {
        "template" === a.localName && (a = a.content);for (var c = "", d = b ? b(a) : v.get.call(a), e = 0, f = d.length, g; e < f && (g = d[e]); e++) {
          a: {
            var h = g;var k = a;var l = b;switch (h.nodeType) {case Node.ELEMENT_NODE:
                for (var n = h.localName, m = "<" + n, q = h.attributes, x = 0; k = q[x]; x++) m += " " + k.name + '="' + k.value.replace(Y, Ka) + '"';m += ">";h = Aa[n] ? m : m + ba(h, l) + "</" + n + ">";break a;case Node.TEXT_NODE:
                h = h.data;h = k && La[k.localName] ? h : h.replace(Gb, Ka);break a;
              case Node.COMMENT_NODE:
                h = "\x3c!--" + h.data + "--\x3e";break a;default:
                throw window.console.error(h), Error("not implemented");}
          }c += h;
        }return c;
      };
    }if (c || Fb) {
      a.b = function (a, b) {
        var c = f.call(a, !1);this.S && this.S(c);b && (l.call(c.content, f.call(a.content, !0)), Ma(c.content, a.content));return c;
      };var Ma = function (c, d) {
        if (d.querySelectorAll && (d = b(d, "template"), 0 !== d.length)) {
          c = b(c, "template");for (var e = 0, f = c.length, g, h; e < f; e++) h = d[e], g = c[e], a && a.S && a.S(h), n.call(g.parentNode, sf.call(h, !0), g);
        }
      },
          sf = Node.prototype.cloneNode = function (b) {
        if (!e && d && this instanceof DocumentFragment) {
          if (b) var c = tf.call(this.ownerDocument, this, !0);else return this.ownerDocument.createDocumentFragment();
        } else this.nodeType === Node.ELEMENT_NODE && "template" === this.localName && this.namespaceURI == document.documentElement.namespaceURI ? c = a.b(this, b) : c = f.call(this, b);b && Ma(c, this);return c;
      },
          tf = Document.prototype.importNode = function (c, d) {
        d = d || !1;if ("template" === c.localName) return a.b(c, d);var e = h.call(this, c, d);if (d) {
          Ma(e, c);c = b(e, 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]');
          for (var f, k = 0; k < c.length; k++) {
            f = c[k];d = g.call(document, "script");d.textContent = f.textContent;for (var l = f.attributes, m = 0, q; m < l.length; m++) q = l[m], d.setAttribute(q.name, q.value);n.call(f.parentNode, d, f);
          }
        }return e;
      };
    }c && (window.HTMLTemplateElement = a);
  })();var Ca = setTimeout;function Da() {}function Ea(a, b) {
    return function () {
      a.apply(b, arguments);
    };
  }function u(a) {
    if (!(this instanceof u)) throw new TypeError("Promises must be constructed via new");if ("function" !== typeof a) throw new TypeError("not a function");this.I = 0;this.oa = !1;this.w = void 0;this.U = [];Fa(a, this);
  }
  function Ga(a, b) {
    for (; 3 === a.I;) a = a.w;0 === a.I ? a.U.push(b) : (a.oa = !0, Ha(function () {
      var c = 1 === a.I ? b.Pa : b.Qa;if (null === c) (1 === a.I ? Ia : Na)(b.ma, a.w);else {
        try {
          var d = c(a.w);
        } catch (e) {
          Na(b.ma, e);return;
        }Ia(b.ma, d);
      }
    }));
  }function Ia(a, b) {
    try {
      if (b === a) throw new TypeError("A promise cannot be resolved with itself.");if (b && ("object" === typeof b || "function" === typeof b)) {
        var c = b.then;if (b instanceof u) {
          a.I = 3;a.w = b;Oa(a);return;
        }if ("function" === typeof c) {
          Fa(Ea(c, b), a);return;
        }
      }a.I = 1;a.w = b;Oa(a);
    } catch (d) {
      Na(a, d);
    }
  }
  function Na(a, b) {
    a.I = 2;a.w = b;Oa(a);
  }function Oa(a) {
    2 === a.I && 0 === a.U.length && Ha(function () {
      a.oa || "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", a.w);
    });for (var b = 0, c = a.U.length; b < c; b++) Ga(a, a.U[b]);a.U = null;
  }function Pa(a, b, c) {
    this.Pa = "function" === typeof a ? a : null;this.Qa = "function" === typeof b ? b : null;this.ma = c;
  }function Fa(a, b) {
    var c = !1;try {
      a(function (a) {
        c || (c = !0, Ia(b, a));
      }, function (a) {
        c || (c = !0, Na(b, a));
      });
    } catch (d) {
      c || (c = !0, Na(b, d));
    }
  }
  u.prototype["catch"] = function (a) {
    return this.then(null, a);
  };u.prototype.then = function (a, b) {
    var c = new this.constructor(Da);Ga(this, new Pa(a, b, c));return c;
  };u.prototype["finally"] = function (a) {
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
  function Qa(a) {
    return new u(function (b, c) {
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
  function Ra(a) {
    return a && "object" === typeof a && a.constructor === u ? a : new u(function (b) {
      b(a);
    });
  }function Sa(a) {
    return new u(function (b, c) {
      c(a);
    });
  }function Ta(a) {
    return new u(function (b, c) {
      for (var d = 0, e = a.length; d < e; d++) a[d].then(b, c);
    });
  }var Ha = "function" === typeof setImmediate && function (a) {
    setImmediate(a);
  } || function (a) {
    Ca(a, 0);
  }; /*
     Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
  if (!window.Promise) {
    window.Promise = u;u.prototype.then = u.prototype.then;u.all = Qa;u.race = Ta;u.resolve = Ra;u.reject = Sa;var Ua = document.createTextNode(""),
        Va = [];new MutationObserver(function () {
      for (var a = Va.length, b = 0; b < a; b++) Va[b]();Va.splice(0, a);
    }).observe(Ua, { characterData: !0 });Ha = function (a) {
      Va.push(a);Ua.textContent = 0 < Ua.textContent.length ? "" : "a";
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
          q = a.defineProperty,
          I = a.defineProperties,
          v = h(a, "getOwnPropertyNames"),
          x = a.prototype,
          Q = x.hasOwnProperty,
          Eb = x.propertyIsEnumerable,
          Fb = x.toString,
          T = function (a, b, c) {
        Q.call(a, f) || q(a, f, { enumerable: !1, configurable: !1, writable: !1, value: {} });a[f]["@@" + b] = c;
      },
          Ja = function (a, b) {
        var c = k(a);g(b).forEach(function (a) {
          X.call(b, a) && Aa(c, a, b[a]);
        });return c;
      },
          p = function () {},
          za = function (a) {
        return a != f && !Q.call(Y, a);
      },
          aa = function (a) {
        return a != f && Q.call(Y, a);
      },
          X = function (a) {
        var b = "" + a;return aa(b) ? Q.call(this, b) && this[f]["@@" + b] : Eb.call(this, a);
      },
          m = function (b) {
        q(x, b, { enumerable: !1, configurable: !0, get: p, set: function (a) {
            ba(this, b, { enumerable: !1, configurable: !0, writable: !0, value: a });T(this, b, !0);
          } });return n(Y[b] = q(a(b), "constructor", Gb));
      },
          y = function (a) {
        if (this && this !== c) throw new TypeError("Symbol is not a constructor");return m("__\u0001symbol:".concat(a || "", e, ++d));
      },
          Y = k(null),
          Gb = { value: y },
          Ka = function (a) {
        return Y[a];
      },
          Aa = function (a, b, c) {
        var d = "" + b;if (aa(d)) {
          b = ba;if (c.enumerable) {
            var e = k(c);e.enumerable = !1;
          } else e = c;b(a, d, e);T(a, d, !!c.enumerable);
        } else q(a, b, c);return a;
      },
          La = function (a) {
        return g(a).filter(aa).map(Ka);
      };v.value = Aa;q(a, "defineProperty", v);v.value = La;q(a, b, v);v.value = function (a) {
        return g(a).filter(za);
      };q(a, "getOwnPropertyNames", v);v.value = function (a, b) {
        var c = La(b);c.length ? l(b).concat(c).forEach(function (c) {
          X.call(b, c) && Aa(a, c, b[c]);
        }) : I(a, b);return a;
      };q(a, "defineProperties", v);v.value = X;q(x, "propertyIsEnumerable", v);v.value = y;q(c, "Symbol", v);v.value = function (a) {
        a = "__\u0001symbol:".concat("__\u0001symbol:", a, e);return a in x ? Y[a] : m(a);
      };q(y, "for", v);v.value = function (a) {
        if (za(a)) throw new TypeError(a + " is not a symbol");return Q.call(Y, a) ? a.slice(20, -e.length) : void 0;
      };q(y, "keyFor", v);v.value = function (a, b) {
        var c = h(a, b);c && aa(b) && (c.enumerable = X.call(a, b));return c;
      };q(a, "getOwnPropertyDescriptor", v);v.value = function (a, b) {
        return 1 === arguments.length ? k(a) : Ja(a, b);
      };q(a, "create", v);v.value = function () {
        var a = Fb.call(this);return "[object String]" === a && aa(this) ? "[object Symbol]" : a;
      };q(x, "toString", v);try {
        var ba = k(q({}, "__\u0001symbol:", { get: function () {
            return q(this, "__\u0001symbol:", { value: !1 })["__\u0001symbol:"];
          } }))["__\u0001symbol:"] || q;
      } catch (Ma) {
        ba = function (a, b, c) {
          var d = h(x, b);delete x[b];q(a, b, c);q(x, b, d);
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
  var Wa = Object.prototype.toString;Object.prototype.toString = function () {
    return void 0 === this ? "[object Undefined]" : null === this ? "[object Null]" : Wa.call(this);
  };Object.keys = function (a) {
    return Object.getOwnPropertyNames(a).filter(function (b) {
      return (b = Object.getOwnPropertyDescriptor(a, b)) && b.enumerable;
    });
  };var Xa = window.Symbol.iterator;
  String.prototype[Xa] && String.prototype.codePointAt || (String.prototype[Xa] = function Ya() {
    var b,
        c = this;return Ba(Ya, function (d) {
      1 == d.a && (b = 0);if (3 != d.a) return b < c.length ? d = ta(d, c[b]) : (d.a = 0, d = void 0), d;b++;d.a = 2;
    });
  });Set.prototype[Xa] || (Set.prototype[Xa] = function Za() {
    var b,
        c = this,
        d;return Ba(Za, function (e) {
      1 == e.a && (b = [], c.forEach(function (c) {
        b.push(c);
      }), d = 0);if (3 != e.a) return d < b.length ? e = ta(e, b[d]) : (e.a = 0, e = void 0), e;d++;e.a = 2;
    });
  });
  Map.prototype[Xa] || (Map.prototype[Xa] = function $a() {
    var b,
        c = this,
        d;return Ba($a, function (e) {
      1 == e.a && (b = [], c.forEach(function (c, d) {
        b.push([d, c]);
      }), d = 0);if (3 != e.a) return d < b.length ? e = ta(e, b[d]) : (e.a = 0, e = void 0), e;d++;e.a = 2;
    });
  }); /*
      Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
      This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
      The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
      The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
      Code distributed by Google as part of the polymer project is also
      subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
      */
  window.WebComponents = window.WebComponents || { flags: {} };var ab = document.querySelector('script[src*="webcomponents-bundle"]'),
      bb = /wc-(.+)/,
      w = {};if (!w.noOpts) {
    location.search.slice(1).split("&").forEach(function (a) {
      a = a.split("=");var b;a[0] && (b = a[0].match(bb)) && (w[b[1]] = a[1] || !0);
    });if (ab) for (var cb = 0, db = void 0; db = ab.attributes[cb]; cb++) "src" !== db.name && (w[db.name] = db.value || !0);if (w.log && w.log.split) {
      var eb = w.log.split(",");w.log = {};eb.forEach(function (a) {
        w.log[a] = !0;
      });
    } else w.log = {};
  }
  window.WebComponents.flags = w;var fb = w.shadydom;fb && (window.ShadyDOM = window.ShadyDOM || {}, window.ShadyDOM.force = fb);var gb = w.register || w.ce;gb && window.customElements && (window.customElements.forcePolyfill = gb); /*
                                                                                                                                                                                                                                        Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
                                                                                                                                                                                                                                        This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
                                                                                                                                                                                                                                        The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
                                                                                                                                                                                                                                        The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
                                                                                                                                                                                                                                        Code distributed by Google as part of the polymer project is also
                                                                                                                                                                                                                                        subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
                                                                                                                                                                                                                                        */
  function hb() {}hb.prototype.toJSON = function () {
    return {};
  };function z(a) {
    a.__shady || (a.__shady = new hb());return a.__shady;
  }function A(a) {
    return a && a.__shady;
  };var B = window.ShadyDOM || {};B.La = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);var ib = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");B.D = !!(ib && ib.configurable && ib.get);B.ka = B.force || !B.La;B.M = B.noPatch || !1;B.ta = B.preferPerformance;var jb = navigator.userAgent.match("Trident");B.ya = jb;function kb(a) {
    return (a = A(a)) && void 0 !== a.firstChild;
  }function C(a) {
    return "ShadyRoot" === a.Da;
  }function lb(a) {
    return (a = (a = A(a)) && a.root) && mb(a);
  }
  var nb = Element.prototype,
      ob = nb.matches || nb.matchesSelector || nb.mozMatchesSelector || nb.msMatchesSelector || nb.oMatchesSelector || nb.webkitMatchesSelector,
      pb = document.createTextNode(""),
      qb = 0,
      rb = [];new MutationObserver(function () {
    for (; rb.length;) try {
      rb.shift()();
    } catch (a) {
      throw pb.textContent = qb++, a;
    }
  }).observe(pb, { characterData: !0 });function sb(a) {
    rb.push(a);pb.textContent = qb++;
  }var tb = !!document.contains;function ub(a, b) {
    for (; b;) {
      if (b == a) return !0;b = b.__shady_parentNode;
    }return !1;
  }
  function vb(a) {
    for (var b = a.length - 1; 0 <= b; b--) {
      var c = a[b],
          d = c.getAttribute("id") || c.getAttribute("name");d && "length" !== d && isNaN(d) && (a[d] = c);
    }a.item = function (b) {
      return a[b];
    };a.namedItem = function (b) {
      if ("length" !== b && isNaN(b) && a[b]) return a[b];for (var c = ja(a), d = c.next(); !d.done; d = c.next()) if (d = d.value, (d.getAttribute("id") || d.getAttribute("name")) == b) return d;return null;
    };return a;
  }function wb(a) {
    var b = [];for (a = a.__shady_native_firstChild; a; a = a.__shady_native_nextSibling) b.push(a);return b;
  }
  function xb(a) {
    var b = [];for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) b.push(a);return b;
  }function D(a, b, c, d) {
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
  };var yb = [],
      zb;function Ab(a) {
    zb || (zb = !0, sb(Bb));yb.push(a);
  }function Bb() {
    zb = !1;for (var a = !!yb.length; yb.length;) yb.shift()();return a;
  }Bb.list = yb;function Cb() {
    this.a = !1;this.addedNodes = [];this.removedNodes = [];this.$ = new Set();
  }function Db(a) {
    a.a || (a.a = !0, sb(function () {
      a.flush();
    }));
  }Cb.prototype.flush = function () {
    if (this.a) {
      this.a = !1;var a = this.takeRecords();a.length && this.$.forEach(function (b) {
        b(a);
      });
    }
  };Cb.prototype.takeRecords = function () {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }];this.addedNodes = [];this.removedNodes = [];return a;
    }return [];
  };
  function Hb(a, b) {
    var c = z(a);c.V || (c.V = new Cb());c.V.$.add(b);var d = c.V;return { Ca: b, P: d, Ea: a, takeRecords: function () {
        return d.takeRecords();
      } };
  }function Ib(a) {
    var b = a && a.P;b && (b.$.delete(a.Ca), b.$.size || (z(a.Ea).V = null));
  }
  function Jb(a, b) {
    var c = b.getRootNode();return a.map(function (a) {
      var b = c === a.target.getRootNode();if (b && a.addedNodes) {
        if (b = Array.from(a.addedNodes).filter(function (a) {
          return c === a.getRootNode();
        }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", { value: b, configurable: !0 }), a;
      } else if (b) return a;
    }).filter(function (a) {
      return a;
    });
  };var Kb = /[&\u00A0"]/g,
      Lb = /[&\u00A0<>]/g;function Mb(a) {
    switch (a) {case "&":
        return "&amp;";case "<":
        return "&lt;";case ">":
        return "&gt;";case '"':
        return "&quot;";case "\u00a0":
        return "&nbsp;";}
  }function Nb(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;return b;
  }var Ob = Nb("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
      Pb = Nb("style script xmp iframe noembed noframes plaintext noscript".split(" "));
  function Qb(a, b) {
    "template" === a.localName && (a = a.content);for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g = void 0; e < f && (g = d[e]); e++) {
      a: {
        var h = g;var k = a,
            l = b;switch (h.nodeType) {case Node.ELEMENT_NODE:
            k = h.localName;for (var n = "<" + k, q = h.attributes, I = 0, v; v = q[I]; I++) n += " " + v.name + '="' + v.value.replace(Kb, Mb) + '"';n += ">";h = Ob[k] ? n : n + Qb(h, l) + "</" + k + ">";break a;case Node.TEXT_NODE:
            h = h.data;h = k && Pb[k.localName] ? h : h.replace(Lb, Mb);break a;case Node.COMMENT_NODE:
            h = "\x3c!--" + h.data + "--\x3e";break a;default:
            throw window.console.error(h), Error("not implemented");}
      }c += h;
    }return c;
  };var Rb = B.D,
      Sb = { querySelector: function (a) {
      return this.__shady_native_querySelector(a);
    }, querySelectorAll: function (a) {
      return this.__shady_native_querySelectorAll(a);
    } },
      Tb = {};function Ub(a) {
    Tb[a] = function (b) {
      return b["__shady_native_" + a];
    };
  }function Vb(a, b) {
    D(a, b, "__shady_native_");for (var c in b) Ub(c);
  }function F(a, b) {
    b = void 0 === b ? [] : b;for (var c = 0; c < b.length; c++) {
      var d = b[c],
          e = Object.getOwnPropertyDescriptor(a, d);e && (Object.defineProperty(a, "__shady_native_" + d, e), e.value ? Sb[d] || (Sb[d] = e.value) : Ub(d));
    }
  }
  var G = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
      H = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1),
      Wb = document.implementation.createHTMLDocument("inert");function Xb(a) {
    for (var b; b = a.__shady_native_firstChild;) a.__shady_native_removeChild(b);
  }var Yb = ["firstElementChild", "lastElementChild", "children", "childElementCount"],
      Zb = ["querySelector", "querySelectorAll"];
  function $b() {
    var a = ["dispatchEvent", "addEventListener", "removeEventListener"];window.EventTarget ? F(window.EventTarget.prototype, a) : (F(Node.prototype, a), F(Window.prototype, a));Rb ? F(Node.prototype, "parentNode firstChild lastChild previousSibling nextSibling childNodes parentElement textContent".split(" ")) : Vb(Node.prototype, { parentNode: { get: function () {
          G.currentNode = this;return G.parentNode();
        } }, firstChild: { get: function () {
          G.currentNode = this;return G.firstChild();
        } }, lastChild: { get: function () {
          G.currentNode = this;return G.lastChild();
        } }, previousSibling: { get: function () {
          G.currentNode = this;return G.previousSibling();
        } }, nextSibling: { get: function () {
          G.currentNode = this;return G.nextSibling();
        } }, childNodes: { get: function () {
          var a = [];G.currentNode = this;for (var c = G.firstChild(); c;) a.push(c), c = G.nextSibling();return a;
        } }, parentElement: { get: function () {
          H.currentNode = this;return H.parentNode();
        } }, textContent: { get: function () {
          switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              for (var a = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1), c = "", d; d = a.nextNode();) c += d.nodeValue;return c;default:
              return this.nodeValue;}
        }, set: function (a) {
          if ("undefined" === typeof a || null === a) a = "";switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              Xb(this);(0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_native_insertBefore(document.createTextNode(a), void 0);break;default:
              this.nodeValue = a;}
        } } });F(Node.prototype, "appendChild insertBefore removeChild replaceChild cloneNode contains".split(" "));
    F(HTMLElement.prototype, ["parentElement", "contains"]);a = { firstElementChild: { get: function () {
          H.currentNode = this;return H.firstChild();
        } }, lastElementChild: { get: function () {
          H.currentNode = this;return H.lastChild();
        } }, children: { get: function () {
          var a = [];H.currentNode = this;for (var c = H.firstChild(); c;) a.push(c), c = H.nextSibling();return vb(a);
        } }, childElementCount: { get: function () {
          return this.children ? this.children.length : 0;
        } } };Rb ? (F(Element.prototype, Yb), F(Element.prototype, ["previousElementSibling", "nextElementSibling", "innerHTML", "className"]), F(HTMLElement.prototype, ["children", "innerHTML", "className"])) : (Vb(Element.prototype, a), Vb(Element.prototype, { previousElementSibling: { get: function () {
          H.currentNode = this;return H.previousSibling();
        } }, nextElementSibling: { get: function () {
          H.currentNode = this;return H.nextSibling();
        } }, innerHTML: { get: function () {
          return Qb(this, wb);
        }, set: function (a) {
          var b = "template" === this.localName ? this.content : this;Xb(b);var d = this.localName || "div";d = this.namespaceURI && this.namespaceURI !== Wb.namespaceURI ? Wb.createElementNS(this.namespaceURI, d) : Wb.createElement(d);d.innerHTML = a;for (a = "template" === this.localName ? d.content : d; d = a.__shady_native_firstChild;) b.__shady_native_insertBefore(d, void 0);
        } }, className: { get: function () {
          return this.getAttribute("class") || "";
        }, set: function (a) {
          this.setAttribute("class", a);
        } } }));F(Element.prototype, "setAttribute getAttribute hasAttribute removeAttribute focus blur".split(" "));F(Element.prototype, Zb);F(HTMLElement.prototype, ["focus", "blur"]);window.HTMLTemplateElement && F(window.HTMLTemplateElement.prototype, ["innerHTML"]);Rb ? F(DocumentFragment.prototype, Yb) : Vb(DocumentFragment.prototype, a);F(DocumentFragment.prototype, Zb);Rb ? (F(Document.prototype, Yb), F(Document.prototype, ["activeElement"])) : Vb(Document.prototype, a);F(Document.prototype, ["importNode", "getElementById"]);F(Document.prototype, Zb);
  };var ac = E({ get childNodes() {
      return this.__shady_childNodes;
    }, get firstChild() {
      return this.__shady_firstChild;
    }, get lastChild() {
      return this.__shady_lastChild;
    }, get childElementCount() {
      return this.__shady_childElementCount;
    }, get children() {
      return this.__shady_children;
    }, get firstElementChild() {
      return this.__shady_firstElementChild;
    }, get lastElementChild() {
      return this.__shady_lastElementChild;
    }, get shadowRoot() {
      return this.__shady_shadowRoot;
    } }),
      bc = E({ get textContent() {
      return this.__shady_textContent;
    }, set textContent(a) {
      this.__shady_textContent = a;
    }, get innerHTML() {
      return this.__shady_innerHTML;
    }, set innerHTML(a) {
      return this.__shady_innerHTML = a;
    } }),
      cc = E({ get parentElement() {
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
      dc;for (dc in ac) ac[dc].enumerable = !1;for (var ec in bc) bc[ec].enumerable = !1;for (var fc in cc) cc[fc].enumerable = !1;var gc = B.D || B.M,
      hc = gc ? function () {} : function (a) {
    var b = z(a);b.Aa || (b.Aa = !0, D(a, cc));
  },
      ic = gc ? function () {} : function (a) {
    var b = z(a);b.za || (b.za = !0, D(a, ac), window.customElements && !B.M || D(a, bc));
  };var jc = "__eventWrappers" + Date.now(),
      kc = function () {
    var a = Object.getOwnPropertyDescriptor(Event.prototype, "composed");return a ? function (b) {
      return a.get.call(b);
    } : null;
  }(),
      lc = function () {
    function a() {}var b = !1,
        c = { get capture() {
        b = !0;
      } };window.addEventListener("test", a, c);window.removeEventListener("test", a, c);return b;
  }();function mc(a) {
    if (a && "object" === typeof a) {
      var b = !!a.capture;var c = !!a.once;var d = !!a.passive;var e = a.O;
    } else b = !!a, d = c = !1;return { ua: e, capture: b, once: c, passive: d, sa: lc ? a : b };
  }
  var nc = { blur: !0, focus: !0, focusin: !0, focusout: !0, click: !0, dblclick: !0, mousedown: !0, mouseenter: !0, mouseleave: !0, mousemove: !0, mouseout: !0, mouseover: !0, mouseup: !0, wheel: !0, beforeinput: !0, input: !0, keydown: !0, keyup: !0, compositionstart: !0, compositionupdate: !0, compositionend: !0, touchstart: !0, touchend: !0, touchmove: !0, touchcancel: !0, pointerover: !0, pointerenter: !0, pointerdown: !0, pointermove: !0, pointerup: !0, pointercancel: !0, pointerout: !0, pointerleave: !0, gotpointercapture: !0, lostpointercapture: !0, dragstart: !0,
    drag: !0, dragenter: !0, dragleave: !0, dragover: !0, drop: !0, dragend: !0, DOMActivate: !0, DOMFocusIn: !0, DOMFocusOut: !0, keypress: !0 },
      oc = { DOMAttrModified: !0, DOMAttributeNameChanged: !0, DOMCharacterDataModified: !0, DOMElementNameChanged: !0, DOMNodeInserted: !0, DOMNodeInsertedIntoDocument: !0, DOMNodeRemoved: !0, DOMNodeRemovedFromDocument: !0, DOMSubtreeModified: !0 };function pc(a) {
    return a instanceof Node ? a.__shady_getRootNode() : a;
  }
  function qc(a, b) {
    var c = [],
        d = a;for (a = pc(a); d;) c.push(d), d.__shady_assignedSlot ? d = d.__shady_assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d = d.host : d = d.__shady_parentNode;c[c.length - 1] === document && c.push(window);return c;
  }function rc(a) {
    a.__composedPath || (a.__composedPath = qc(a.target, !0));return a.__composedPath;
  }function sc(a, b) {
    if (!C) return a;a = qc(a, !0);for (var c = 0, d, e = void 0, f, g = void 0; c < b.length; c++) if (d = b[c], f = pc(d), f !== e && (g = a.indexOf(f), e = f), !C(f) || -1 < g) return d;
  }
  function tc(a) {
    function b(b, d) {
      b = new a(b, d);b.__composed = d && !!d.composed;return b;
    }b.__proto__ = a;b.prototype = a.prototype;return b;
  }var uc = { focus: !0, blur: !0 };function vc(a) {
    return a.__target !== a.target || a.__relatedTarget !== a.relatedTarget;
  }function wc(a, b, c) {
    if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!vc(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.__immediatePropagationStopped); d++);
  }
  function xc(a) {
    var b = a.composedPath();Object.defineProperty(a, "currentTarget", { get: function () {
        return d;
      }, configurable: !0 });for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c];wc(a, d, "capture");if (a.ga) return;
    }Object.defineProperty(a, "eventPhase", { get: function () {
        return Event.AT_TARGET;
      } });var e;for (c = 0; c < b.length; c++) {
      d = b[c];var f = A(d);f = f && f.root;if (0 === c || f && f === e) if (wc(a, d, "bubble"), d !== window && (e = d.__shady_getRootNode()), a.ga) break;
    }
  }
  function yc(a, b, c, d, e, f) {
    for (var g = 0; g < a.length; g++) {
      var h = a[g],
          k = h.type,
          l = h.capture,
          n = h.once,
          q = h.passive;if (b === h.node && c === k && d === l && e === n && f === q) return g;
    }return -1;
  }
  function zc(a, b, c) {
    var d = mc(c),
        e = d.capture,
        f = d.once,
        g = d.passive,
        h = d.ua;d = d.sa;if (b) {
      var k = typeof b;if ("function" === k || "object" === k) if ("object" !== k || b.handleEvent && "function" === typeof b.handleEvent) {
        if (oc[a]) return this.__shady_native_addEventListener(a, b, d);var l = h || this;if (h = b[jc]) {
          if (-1 < yc(h, l, a, e, f, g)) return;
        } else b[jc] = [];h = function (d) {
          f && this.__shady_removeEventListener(a, b, c);d.__target || Ac(d);if (l !== this) {
            var e = Object.getOwnPropertyDescriptor(d, "currentTarget");Object.defineProperty(d, "currentTarget", { get: function () {
                return l;
              }, configurable: !0 });
          }d.__previousCurrentTarget = d.currentTarget;if (!C(l) && "slot" !== l.localName || -1 != d.composedPath().indexOf(l)) if (d.composed || -1 < d.composedPath().indexOf(l)) if (vc(d) && d.target === d.relatedTarget) d.eventPhase === Event.BUBBLING_PHASE && d.stopImmediatePropagation();else if (d.eventPhase === Event.CAPTURING_PHASE || d.bubbles || d.target === l || l instanceof Window) {
            var g = "function" === k ? b.call(l, d) : b.handleEvent && b.handleEvent(d);l !== this && (e ? (Object.defineProperty(d, "currentTarget", e), e = null) : delete d.currentTarget);return g;
          }
        };b[jc].push({ node: l, type: a, capture: e, once: f, passive: g, ab: h });uc[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || { capture: [], bubble: [] }, this.__handlers[a][e ? "capture" : "bubble"].push(h)) : this.__shady_native_addEventListener(a, h, d);
      }
    }
  }
  function Bc(a, b, c) {
    if (b) {
      var d = mc(c);c = d.capture;var e = d.once,
          f = d.passive,
          g = d.ua;d = d.sa;if (oc[a]) return this.__shady_native_removeEventListener(a, b, d);var h = g || this;g = void 0;var k = null;try {
        k = b[jc];
      } catch (l) {}k && (e = yc(k, h, a, c, e, f), -1 < e && (g = k.splice(e, 1)[0].ab, k.length || (b[jc] = void 0)));this.__shady_native_removeEventListener(a, g || b, d);g && uc[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][c ? "capture" : "bubble"], b = a.indexOf(g), -1 < b && a.splice(b, 1));
    }
  }
  function Cc() {
    for (var a in uc) window.__shady_native_addEventListener(a, function (a) {
      a.__target || (Ac(a), xc(a));
    }, !0);
  }
  var Dc = E({ get composed() {
      void 0 === this.__composed && (kc ? this.__composed = "focusin" === this.type || "focusout" === this.type || kc(this) : !1 !== this.isTrusted && (this.__composed = nc[this.type]));return this.__composed || !1;
    }, composedPath: function () {
      this.__composedPath || (this.__composedPath = qc(this.__target, this.composed));return this.__composedPath;
    }, get target() {
      return sc(this.currentTarget || this.__previousCurrentTarget, this.composedPath());
    }, get relatedTarget() {
      if (!this.__relatedTarget) return null;this.__relatedTargetComposedPath || (this.__relatedTargetComposedPath = qc(this.__relatedTarget, !0));return sc(this.currentTarget || this.__previousCurrentTarget, this.__relatedTargetComposedPath);
    }, stopPropagation: function () {
      Event.prototype.stopPropagation.call(this);this.ga = !0;
    }, stopImmediatePropagation: function () {
      Event.prototype.stopImmediatePropagation.call(this);this.ga = this.__immediatePropagationStopped = !0;
    } });
  function Ac(a) {
    a.__target = a.target;a.__relatedTarget = a.relatedTarget;if (B.D) {
      var b = Object.getPrototypeOf(a);if (!Object.hasOwnProperty(b, "__shady_patchedProto")) {
        var c = Object.create(b);c.__shady_sourceProto = b;D(c, Dc);b.__shady_patchedProto = c;
      }a.__proto__ = b.__shady_patchedProto;
    } else D(a, Dc);
  }var Ec = tc(Event),
      Fc = tc(CustomEvent),
      Gc = tc(MouseEvent);
  function Hc() {
    if (!kc && Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")) {
      var a = function () {
        var a = new MouseEvent("click", { bubbles: !0, cancelable: !0, composed: !0 });this.__shady_dispatchEvent(a);
      };Element.prototype.click ? Element.prototype.click = a : HTMLElement.prototype.click && (HTMLElement.prototype.click = a);
    }
  }var Ic = Object.getOwnPropertyNames(Document.prototype).filter(function (a) {
    return "on" === a.substring(0, 2);
  });function Jc(a, b) {
    return { index: a, W: [], Z: b };
  }
  function Kc(a, b, c, d) {
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        k = Math.min(b - e, d - f);if (0 == e && 0 == f) a: {
      for (g = 0; g < k; g++) if (a[g] !== c[g]) break a;g = k;
    }if (b == a.length && d == c.length) {
      h = a.length;for (var l = c.length, n = 0; n < k - g && Lc(a[--h], c[--l]);) n++;h = n;
    }e += g;f += g;b -= h;d -= h;if (0 == b - e && 0 == d - f) return [];if (e == b) {
      for (b = Jc(e, 0); f < d;) b.W.push(c[f++]);return [b];
    }if (f == d) return [Jc(e, b - e)];k = e;g = f;d = d - g + 1;h = b - k + 1;b = Array(d);for (l = 0; l < d; l++) b[l] = Array(h), b[l][0] = l;for (l = 0; l < h; l++) b[0][l] = l;for (l = 1; l < d; l++) for (n = 1; n < h; n++) if (a[k + n - 1] === c[g + l - 1]) b[l][n] = b[l - 1][n - 1];else {
      var q = b[l - 1][n] + 1,
          I = b[l][n - 1] + 1;b[l][n] = q < I ? q : I;
    }k = b.length - 1;g = b[0].length - 1;d = b[k][g];for (a = []; 0 < k || 0 < g;) 0 == k ? (a.push(2), g--) : 0 == g ? (a.push(3), k--) : (h = b[k - 1][g - 1], l = b[k - 1][g], n = b[k][g - 1], q = l < n ? l < h ? l : h : n < h ? n : h, q == h ? (h == d ? a.push(0) : (a.push(1), d = h), k--, g--) : q == l ? (a.push(3), k--, d = l) : (a.push(2), g--, d = n));a.reverse();b = void 0;k = [];for (g = 0; g < a.length; g++) switch (a[g]) {case 0:
        b && (k.push(b), b = void 0);e++;f++;break;case 1:
        b || (b = Jc(e, 0));b.Z++;e++;b.W.push(c[f]);f++;break;case 2:
        b || (b = Jc(e, 0));
        b.Z++;e++;break;case 3:
        b || (b = Jc(e, 0)), b.W.push(c[f]), f++;}b && k.push(b);return k;
  }function Lc(a, b) {
    return a === b;
  };function Mc(a, b, c, d) {
    hc(a);d = d || null;var e = z(a),
        f = d ? z(d) : null;e.previousSibling = d ? f.previousSibling : b.__shady_lastChild;if (f = A(e.previousSibling)) f.nextSibling = a;if (f = A(e.nextSibling = d)) f.previousSibling = a;e.parentNode = b;d ? d === c.firstChild && (c.firstChild = a) : (c.lastChild = a, c.firstChild || (c.firstChild = a));c.childNodes = null;
  }
  function Nc(a, b, c) {
    ic(b);var d = z(b);void 0 !== d.firstChild && (d.childNodes = null);if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) for (a = a.__shady_native_firstChild; a; a = a.__shady_native_nextSibling) Mc(a, b, d, c);else Mc(a, b, d, c);
  }
  function Oc(a, b) {
    var c = z(a);b = z(b);a === b.firstChild && (b.firstChild = c.nextSibling);a === b.lastChild && (b.lastChild = c.previousSibling);a = c.previousSibling;var d = c.nextSibling;a && (z(a).nextSibling = d);d && (z(d).previousSibling = a);c.parentNode = c.previousSibling = c.nextSibling = void 0;void 0 !== b.childNodes && (b.childNodes = null);
  }
  function Pc(a, b) {
    var c = z(a);if (b || void 0 === c.firstChild) {
      c.childNodes = null;var d = c.firstChild = a.__shady_native_firstChild;c.lastChild = a.__shady_native_lastChild;ic(a);c = d;for (d = void 0; c; c = c.__shady_native_nextSibling) {
        var e = z(c);e.parentNode = b || a;e.nextSibling = c.__shady_native_nextSibling;e.previousSibling = d || null;d = c;hc(c);
      }
    }
  };var Qc = null;function Rc() {
    Qc || (Qc = window.ShadyCSS && window.ShadyCSS.ScopingShim);return Qc || null;
  }function Sc(a, b) {
    var c = Rc();c && c.unscopeNode(a, b);
  }function Tc(a, b) {
    var c = Rc();if (!c) return !0;if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      c = !0;for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) c = c && Tc(a, b);return c;
    }return a.nodeType !== Node.ELEMENT_NODE ? !0 : c.currentScopeForNode(a) === b;
  }function Uc(a) {
    if (a.nodeType !== Node.ELEMENT_NODE) return "";var b = Rc();return b ? b.currentScopeForNode(a) : "";
  }
  function Vc(a, b) {
    if (a) for (a.nodeType === Node.ELEMENT_NODE && b(a), a = a.__shady_firstChild; a; a = a.__shady_nextSibling) a.nodeType === Node.ELEMENT_NODE && Vc(a, b);
  };var Wc = window.document,
      Xc = B.ta,
      Yc = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"),
      Zc = Yc && Yc.get;function $c(a) {
    for (var b; b = a.__shady_firstChild;) a.__shady_removeChild(b);
  }function ad(a) {
    var b = A(a);if (b && void 0 !== b.ca) for (b = a.__shady_firstChild; b; b = b.__shady_nextSibling) ad(b);if (a = A(a)) a.ca = void 0;
  }function bd(a) {
    var b = a;a && "slot" === a.localName && (b = (b = (b = A(a)) && b.T) && b.length ? b[0] : bd(a.__shady_nextSibling));return b;
  }
  function cd(a, b, c) {
    if (a = (a = A(a)) && a.V) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Db(a);
  }
  var gd = E({ get parentNode() {
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
      if (kb(this)) {
        var a = A(this);if (!a.childNodes) {
          a.childNodes = [];for (var b = this.__shady_firstChild; b; b = b.__shady_nextSibling) a.childNodes.push(b);
        }var c = a.childNodes;
      } else c = this.__shady_native_childNodes;c.item = function (a) {
        return c[a];
      };return c;
    }, get parentElement() {
      var a = A(this);(a = a && a.parentNode) && a.nodeType !== Node.ELEMENT_NODE && (a = null);return void 0 !== a ? a : this.__shady_native_parentElement;
    }, get isConnected() {
      if (Zc && Zc.call(this)) return !0;if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1;
      var a = this.ownerDocument;if (tb) {
        if (a.__shady_native_contains(this)) return !0;
      } else if (a.documentElement && a.documentElement.__shady_native_contains(this)) return !0;for (a = this; a && !(a instanceof Document);) a = a.__shady_parentNode || (C(a) ? a.host : void 0);return !!(a && a instanceof Document);
    }, get textContent() {
      if (kb(this)) {
        for (var a = [], b = this.__shady_firstChild; b; b = b.__shady_nextSibling) b.nodeType !== Node.COMMENT_NODE && a.push(b.__shady_textContent);return a.join("");
      }return this.__shady_native_textContent;
    }, set textContent(a) {
      if ("undefined" === typeof a || null === a) a = "";switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
          if (!kb(this) && B.D) {
            var b = this.__shady_firstChild;(b != this.__shady_lastChild || b && b.nodeType != Node.TEXT_NODE) && $c(this);this.__shady_native_textContent = a;
          } else $c(this), (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_insertBefore(document.createTextNode(a));break;default:
          this.nodeValue = a;}
    }, insertBefore: function (a, b) {
      if (this.ownerDocument !== Wc && a.ownerDocument !== Wc) return this.__shady_native_insertBefore(a, b), a;if (a === this) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if (b) {
        var c = A(b);c = c && c.parentNode;if (void 0 !== c && c !== this || void 0 === c && b.__shady_native_parentNode !== this) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
      }if (b === a) return a;var d = [],
          e = (c = dd(this)) ? c.host.localName : Uc(this),
          f = a.__shady_parentNode;if (f) {
        var g = Uc(a);var h = !!c || !dd(a) || Xc && void 0 !== this.__noInsertionPoint;f.__shady_removeChild(a, h);
      }f = !0;var k = (!Xc || void 0 === a.__noInsertionPoint && void 0 === this.__noInsertionPoint) && !Tc(a, e),
          l = c && !a.__noInsertionPoint && (!Xc || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE);if (l || k) k && (g = g || Uc(a)), Vc(a, function (a) {
        l && "slot" === a.localName && d.push(a);if (k) {
          var b = g;Rc() && (b && Sc(a, b), (b = Rc()) && b.scopeNode(a, e));
        }
      });d.length && (ed(c), c.c.push.apply(c.c, d instanceof Array ? d : ka(ja(d))), J(c));kb(this) && (Nc(a, this, b), c = A(this), lb(this) ? (J(c.root), f = !1) : c.root && (f = !1));f ? (c = C(this) ? this.host : this, b ? (b = bd(b), c.__shady_native_insertBefore(a, b)) : c.__shady_native_appendChild(a)) : a.ownerDocument !== this.ownerDocument && this.ownerDocument.adoptNode(a);cd(this, a);return a;
    }, appendChild: function (a) {
      if (this != a || !C(a)) return this.__shady_insertBefore(a);
    }, removeChild: function (a, b) {
      b = void 0 === b ? !1 : b;if (this.ownerDocument !== Wc) return this.__shady_native_removeChild(a);if (a.__shady_parentNode !== this) throw Error("The node to be removed is not a child of this node: " + a);var c = dd(a),
          d = c && fd(c, a),
          e = A(this);if (kb(this) && (Oc(a, this), lb(this))) {
        J(e.root);var f = !0;
      }if (Rc() && !b && c && a.nodeType !== Node.TEXT_NODE) {
        var g = Uc(a);Vc(a, function (a) {
          Sc(a, g);
        });
      }ad(a);c && ((b = this && "slot" === this.localName) && (f = !0), (d || b) && J(c));f || (f = C(this) ? this.host : this, (!e.root && "slot" !== a.localName || f === a.__shady_native_parentNode) && f.__shady_native_removeChild(a));cd(this, null, a);return a;
    }, replaceChild: function (a, b) {
      this.__shady_insertBefore(a, b);this.__shady_removeChild(b);return a;
    }, cloneNode: function (a) {
      if ("template" == this.localName) return this.__shady_native_cloneNode(a);var b = this.__shady_native_cloneNode(!1);if (a && b.nodeType !== Node.ATTRIBUTE_NODE) {
        a = this.__shady_firstChild;for (var c; a; a = a.__shady_nextSibling) c = a.__shady_cloneNode(!0), b.__shady_appendChild(c);
      }return b;
    }, getRootNode: function (a) {
      if (this && this.nodeType) {
        var b = z(this),
            c = b.ca;void 0 === c && (C(this) ? (c = this, b.ca = c) : (c = (c = this.__shady_parentNode) ? c.__shady_getRootNode(a) : this, document.documentElement.__shady_native_contains(this) && (b.ca = c)));return c;
      }
    },
    contains: function (a) {
      return ub(this, a);
    } });function hd(a, b, c) {
    var d = [];id(a, b, c, d);return d;
  }function id(a, b, c, d) {
    for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) {
      var e;if (e = a.nodeType === Node.ELEMENT_NODE) {
        e = a;var f = b,
            g = c,
            h = d,
            k = f(e);k && h.push(e);g && g(k) ? e = k : (id(e, f, g, h), e = void 0);
      }if (e) break;
    }
  }
  var jd = E({ get firstElementChild() {
      var a = A(this);if (a && void 0 !== a.firstChild) {
        for (a = this.__shady_firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;return a;
      }return this.__shady_native_firstElementChild;
    }, get lastElementChild() {
      var a = A(this);if (a && void 0 !== a.lastChild) {
        for (a = this.__shady_lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;return a;
      }return this.__shady_native_lastElementChild;
    }, get children() {
      return kb(this) ? vb(Array.prototype.filter.call(xb(this), function (a) {
        return a.nodeType === Node.ELEMENT_NODE;
      })) : this.__shady_native_children;
    }, get childElementCount() {
      var a = this.__shady_children;return a ? a.length : 0;
    } }),
      kd = E({ querySelector: function (a) {
      return hd(this, function (b) {
        return ob.call(b, a);
      }, function (a) {
        return !!a;
      })[0] || null;
    }, querySelectorAll: function (a, b) {
      if (b) {
        b = Array.prototype.slice.call(this.__shady_native_querySelectorAll(a));var c = this.__shady_getRootNode();return b.filter(function (a) {
          return a.__shady_getRootNode() == c;
        });
      }return hd(this, function (b) {
        return ob.call(b, a);
      });
    } }),
      ld = B.ta && !B.M ? Object.assign({}, jd) : jd;Object.assign(jd, kd);var md = E({ getElementById: function (a) {
      return "" === a ? null : hd(this, function (b) {
        return b.id == a;
      }, function (a) {
        return !!a;
      })[0] || null;
    } });var nd = E({ get activeElement() {
      var a = B.D ? document.__shady_native_activeElement : document.activeElement;if (!a || !a.nodeType) return null;var b = !!C(this);if (!(this === document || b && this.host !== a && this.host.__shady_native_contains(a))) return null;for (b = dd(a); b && b !== this;) a = b.host, b = dd(a);return this === document ? b ? null : a : b === this ? a : null;
    } });var od = document.implementation.createHTMLDocument("inert"),
      pd = E({ get innerHTML() {
      return kb(this) ? Qb("template" === this.localName ? this.content : this, xb) : this.__shady_native_innerHTML;
    }, set innerHTML(a) {
      if ("template" === this.localName) this.__shady_native_innerHTML = a;else {
        $c(this);var b = this.localName || "div";b = this.namespaceURI && this.namespaceURI !== od.namespaceURI ? od.createElementNS(this.namespaceURI, b) : od.createElement(b);for (B.D ? b.__shady_native_innerHTML = a : b.innerHTML = a; a = b.__shady_firstChild;) this.__shady_insertBefore(a);
      }
    } });var qd = E({ addEventListener: function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.O = c.O || this;this.host.__shady_addEventListener(a, b, c);
    }, removeEventListener: function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.O = c.O || this;this.host.__shady_removeEventListener(a, b, c);
    } });function rd(a, b) {
    D(a, qd, b);D(a, nd, b);D(a, pd, b);D(a, jd, b);B.M && !b ? (D(a, gd, b), D(a, md, b)) : B.D || (D(a, cc), D(a, ac), D(a, bc));
  };var sd = {},
      td = B.deferConnectionCallbacks && "loading" === document.readyState,
      ud;function vd(a) {
    var b = [];do b.unshift(a); while (a = a.__shady_parentNode);return b;
  }function wd(a, b, c) {
    if (a !== sd) throw new TypeError("Illegal constructor");this.a = null;xd(this, b, c);
  }
  function xd(a, b, c) {
    a.Da = "ShadyRoot";a.host = b;a.mode = c && c.mode;Pc(a.host);b = z(a.host);b.root = a;b.Ta = "closed" !== a.mode ? a : null;b = z(a);b.firstChild = b.lastChild = b.parentNode = b.nextSibling = b.previousSibling = null;if (B.preferPerformance) for (; b = a.host.__shady_native_firstChild;) a.host.__shady_native_removeChild(b);else J(a);
  }function J(a) {
    a.R || (a.R = !0, Ab(function () {
      return yd(a);
    }));
  }
  function yd(a) {
    var b;if (b = a.R) {
      for (var c; a;) a: {
        a.R && (c = a), b = a;a = b.host.__shady_getRootNode();if (C(a) && (b = A(b.host)) && 0 < b.Y) break a;a = void 0;
      }b = c;
    }(c = b) && c._renderSelf();
  }
  wd.prototype._renderSelf = function () {
    var a = td;td = !0;this.R = !1;if (this.a) {
      zd(this);for (var b = 0, c; b < this.a.length; b++) {
        c = this.a[b];var d = A(c),
            e = d.assignedNodes;d.assignedNodes = [];d.T = [];if (d.qa = e) for (d = 0; d < e.length; d++) {
          var f = A(e[d]);f.ha = f.assignedSlot;f.assignedSlot === c && (f.assignedSlot = null);
        }
      }for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) Ad(this, b);for (b = 0; b < this.a.length; b++) {
        c = this.a[b];e = A(c);if (!e.assignedNodes.length) for (d = c.__shady_firstChild; d; d = d.__shady_nextSibling) Ad(this, d, c);(d = (d = A(c.__shady_parentNode)) && d.root) && (mb(d) || d.R) && d._renderSelf();Bd(this, e.T, e.assignedNodes);if (d = e.qa) {
          for (f = 0; f < d.length; f++) A(d[f]).ha = null;e.qa = null;d.length > e.assignedNodes.length && (e.ja = !0);
        }e.ja && (e.ja = !1, Cd(this, c));
      }c = this.a;b = [];for (e = 0; e < c.length; e++) d = c[e].__shady_parentNode, (f = A(d)) && f.root || !(0 > b.indexOf(d)) || b.push(d);for (c = 0; c < b.length; c++) {
        f = b[c];e = f === this ? this.host : f;d = [];for (f = f.__shady_firstChild; f; f = f.__shady_nextSibling) if ("slot" == f.localName) for (var g = A(f).T, h = 0; h < g.length; h++) d.push(g[h]);else d.push(f);f = wb(e);g = Kc(d, d.length, f, f.length);for (var k = h = 0, l = void 0; h < g.length && (l = g[h]); h++) {
          for (var n = 0, q = void 0; n < l.W.length && (q = l.W[n]); n++) q.__shady_native_parentNode === e && e.__shady_native_removeChild(q), f.splice(l.index + k, 1);k -= l.Z;
        }k = 0;for (l = void 0; k < g.length && (l = g[k]); k++) for (h = f[l.index], n = l.index; n < l.index + l.Z; n++) q = d[n], e.__shady_native_insertBefore(q, h), f.splice(n, 0, q);
      }
    }if (!B.preferPerformance && !this.pa) for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) c = A(b), b.__shady_native_parentNode !== this.host || "slot" !== b.localName && c.assignedSlot || this.host.__shady_native_removeChild(b);this.pa = !0;td = a;ud && ud();
  };function Ad(a, b, c) {
    var d = z(b),
        e = d.ha;d.ha = null;c || (c = (a = a.b[b.__shady_slot || "__catchall"]) && a[0]);c ? (z(c).assignedNodes.push(b), d.assignedSlot = c) : d.assignedSlot = void 0;e !== d.assignedSlot && d.assignedSlot && (z(d.assignedSlot).ja = !0);
  }
  function Bd(a, b, c) {
    for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
      var f = A(e).assignedNodes;f && f.length && Bd(a, b, f);
    } else b.push(c[d]);
  }function Cd(a, b) {
    b.__shady_native_dispatchEvent(new Event("slotchange"));b = A(b);b.assignedSlot && Cd(a, b.assignedSlot);
  }function ed(a) {
    a.c = a.c || [];a.a = a.a || [];a.b = a.b || {};
  }
  function zd(a) {
    if (a.c && a.c.length) {
      for (var b = a.c, c, d = 0; d < b.length; d++) {
        var e = b[d];Pc(e);var f = e.__shady_parentNode;Pc(f);f = A(f);f.Y = (f.Y || 0) + 1;f = Dd(e);a.b[f] ? (c = c || {}, c[f] = !0, a.b[f].push(e)) : a.b[f] = [e];a.a.push(e);
      }if (c) for (var g in c) a.b[g] = Ed(a.b[g]);a.c = [];
    }
  }function Dd(a) {
    var b = a.name || a.getAttribute("name") || "__catchall";return a.Ba = b;
  }
  function Ed(a) {
    return a.sort(function (a, c) {
      a = vd(a);for (var b = vd(c), e = 0; e < a.length; e++) {
        c = a[e];var f = b[e];if (c !== f) return a = xb(c.__shady_parentNode), a.indexOf(c) - a.indexOf(f);
      }
    });
  }
  function fd(a, b) {
    if (a.a) {
      zd(a);var c = a.b,
          d;for (d in c) for (var e = c[d], f = 0; f < e.length; f++) {
        var g = e[f];if (ub(b, g)) {
          e.splice(f, 1);var h = a.a.indexOf(g);0 <= h && (a.a.splice(h, 1), (h = A(g.__shady_parentNode)) && h.Y && h.Y--);f--;g = A(g);if (h = g.T) for (var k = 0; k < h.length; k++) {
            var l = h[k],
                n = l.__shady_native_parentNode;n && n.__shady_native_removeChild(l);
          }g.T = [];g.assignedNodes = [];h = !0;
        }
      }return h;
    }
  }function mb(a) {
    zd(a);return !(!a.a || !a.a.length);
  }
  (function (a) {
    a.__proto__ = DocumentFragment.prototype;rd(a, "__shady_");rd(a);Object.defineProperties(a, { nodeType: { value: Node.DOCUMENT_FRAGMENT_NODE, configurable: !0 }, nodeName: { value: "#document-fragment", configurable: !0 }, nodeValue: { value: null, configurable: !0 } });["localName", "namespaceURI", "prefix"].forEach(function (b) {
      Object.defineProperty(a, b, { value: void 0, configurable: !0 });
    });["ownerDocument", "baseURI", "isConnected"].forEach(function (b) {
      Object.defineProperty(a, b, { get: function () {
          return this.host[b];
        },
        configurable: !0 });
    });
  })(wd.prototype);
  if (window.customElements && B.ka && !B.preferPerformance) {
    var Fd = new Map();ud = function () {
      var a = [];Fd.forEach(function (b, c) {
        a.push([c, b]);
      });Fd.clear();for (var b = 0; b < a.length; b++) {
        var c = a[b][0];a[b][1] ? c.__shadydom_connectedCallback() : c.__shadydom_disconnectedCallback();
      }
    };td && document.addEventListener("readystatechange", function () {
      td = !1;ud();
    }, { once: !0 });var Gd = function (a, b, c) {
      var d = 0,
          e = "__isConnected" + d++;if (b || c) a.prototype.connectedCallback = a.prototype.__shadydom_connectedCallback = function () {
        td ? Fd.set(this, !0) : this[e] || (this[e] = !0, b && b.call(this));
      }, a.prototype.disconnectedCallback = a.prototype.__shadydom_disconnectedCallback = function () {
        td ? this.isConnected || Fd.set(this, !1) : this[e] && (this[e] = !1, c && c.call(this));
      };return a;
    },
        Hd = window.customElements.define,
        define = function (a, b) {
      var c = b.prototype.connectedCallback,
          d = b.prototype.disconnectedCallback;Hd.call(window.customElements, a, Gd(b, c, d));b.prototype.connectedCallback = c;b.prototype.disconnectedCallback = d;
    };window.customElements.define = define;Object.defineProperty(window.CustomElementRegistry.prototype, "define", { value: define, configurable: !0 });
  }function dd(a) {
    a = a.__shady_getRootNode();if (C(a)) return a;
  };function Id(a) {
    this.node = a;
  }r = Id.prototype;r.addEventListener = function (a, b, c) {
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
  t.Object.defineProperties(Id.prototype, { activeElement: { configurable: !0, enumerable: !0, get: function () {
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
      } } });Ic.forEach(function (a) {
    Object.defineProperty(Id.prototype, a, { get: function () {
        return this.node["__shady_" + a];
      }, set: function (b) {
        this.node["__shady_" + a] = b;
      }, configurable: !0 });
  });var Jd = new WeakMap();function Kd(a) {
    if (C(a) || a instanceof Id) return a;var b = Jd.get(a);b || (b = new Id(a), Jd.set(a, b));return b;
  };var Ld = E({ dispatchEvent: function (a) {
      Bb();return this.__shady_native_dispatchEvent(a);
    }, addEventListener: zc, removeEventListener: Bc });var Md = E({ get assignedSlot() {
      var a = this.__shady_parentNode;(a = a && a.__shady_shadowRoot) && yd(a);return (a = A(this)) && a.assignedSlot || null;
    } });var Nd = window.document;function Od(a, b) {
    if ("slot" === b) a = a.__shady_parentNode, lb(a) && J(A(a).root);else if ("slot" === a.localName && "name" === b && (b = dd(a))) {
      if (b.a) {
        zd(b);var c = a.Ba,
            d = Dd(a);if (d !== c) {
          c = b.b[c];var e = c.indexOf(a);0 <= e && c.splice(e, 1);c = b.b[d] || (b.b[d] = []);c.push(a);1 < c.length && (b.b[d] = Ed(c));
        }
      }J(b);
    }
  }
  var Pd = E({ get previousElementSibling() {
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
      var a = A(this);return a && a.Ta || null;
    }, get className() {
      return this.getAttribute("class") || "";
    }, set className(a) {
      this.__shady_setAttribute("class", a);
    }, setAttribute: function (a, b) {
      if (this.ownerDocument !== Nd) this.__shady_native_setAttribute(a, b);else {
        var c;(c = Rc()) && "class" === a ? (c.setElementClass(this, b), c = !0) : c = !1;c || (this.__shady_native_setAttribute(a, b), Od(this, a));
      }
    }, removeAttribute: function (a) {
      this.__shady_native_removeAttribute(a);Od(this, a);
    }, attachShadow: function (a) {
      if (!this) throw Error("Must provide a host.");if (!a) throw Error("Not enough arguments.");if (a.shadyUpgradeFragment && !B.ya) {
        var b = a.shadyUpgradeFragment;b.__proto__ = ShadowRoot.prototype;xd(b, this, a);Pc(b, b);a = b.__noInsertionPoint ? null : b.querySelectorAll("slot");b.__noInsertionPoint = void 0;if (a && a.length) {
          var c = b;ed(c);c.c.push.apply(c.c, a instanceof Array ? a : ka(ja(a)));J(b);
        }b.host.__shady_native_appendChild(b);
      } else b = new wd(sd, this, a);return b;
    } });var Qd = E({ blur: function () {
      var a = A(this);(a = (a = a && a.root) && a.activeElement) ? a.__shady_blur() : this.__shady_native_blur();
    } });Ic.forEach(function (a) {
    Qd[a] = { set: function (b) {
        var c = z(this),
            d = a.substring(2);c.N || (c.N = {});c.N[a] && this.removeEventListener(d, c.N[a]);this.__shady_addEventListener(d, b);c.N[a] = b;
      }, get: function () {
        var b = A(this);return b && b.N && b.N[a];
      }, configurable: !0 };
  });var Rd = E({ assignedNodes: function (a) {
      if ("slot" === this.localName) {
        var b = this.__shady_getRootNode();b && C(b) && yd(b);return (b = A(this)) ? (a && a.flatten ? b.T : b.assignedNodes) || [] : [];
      }
    }, addEventListener: function (a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) zc.call(this, a, b, c);else {
        "object" !== typeof c && (c = { capture: !!c });var d = this.__shady_parentNode;if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");c.O = this;d.__shady_addEventListener(a, b, c);
      }
    }, removeEventListener: function (a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) Bc.call(this, a, b, c);else {
        "object" !== typeof c && (c = { capture: !!c });var d = this.__shady_parentNode;if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");c.O = this;d.__shady_removeEventListener(a, b, c);
      }
    } });var Sd = window.document,
      Td = E({ importNode: function (a, b) {
      if (a.ownerDocument !== Sd || "template" === a.localName) return this.__shady_native_importNode(a, b);var c = this.__shady_native_importNode(a, !1);if (b) for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) b = this.__shady_importNode(a, !0), c.__shady_appendChild(b);return c;
    } });var Ud = E({ addEventListener: zc.bind(window), removeEventListener: Bc.bind(window) });var Vd = {};Object.getOwnPropertyDescriptor(HTMLElement.prototype, "parentElement") && (Vd.parentElement = gd.parentElement);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "contains") && (Vd.contains = gd.contains);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && (Vd.children = jd.children);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && (Vd.innerHTML = pd.innerHTML);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className") && (Vd.className = Pd.className);
  var Wd = { EventTarget: [Ld], Node: [gd, window.EventTarget ? null : Ld], Text: [Md], Element: [Pd, jd, Md, !B.D || "innerHTML" in Element.prototype ? pd : null, window.HTMLSlotElement ? null : Rd], HTMLElement: [Qd, Vd], HTMLSlotElement: [Rd], DocumentFragment: [ld, md], Document: [Td, ld, md, nd], Window: [Ud] },
      Xd = B.D ? null : ["innerHTML", "textContent"];function Yd(a) {
    var b = a ? null : Xd,
        c = {},
        d;for (d in Wd) c.ea = window[d] && window[d].prototype, Wd[d].forEach(function (c) {
      return function (d) {
        return c.ea && d && D(c.ea, d, a, b);
      };
    }(c)), c = { ea: c.ea };
  };if (B.ka) {
    var ShadyDOM = { inUse: B.ka, patch: function (a) {
        ic(a);hc(a);return a;
      }, isShadyRoot: C, enqueue: Ab, flush: Bb, flushInitial: function (a) {
        !a.pa && a.R && yd(a);
      }, settings: B, filterMutations: Jb, observeChildren: Hb, unobserveChildren: Ib, deferConnectionCallbacks: B.deferConnectionCallbacks, preferPerformance: B.preferPerformance, handlesDynamicScoping: !0, wrap: B.M ? Kd : function (a) {
        return a;
      }, Wrapper: Id, composedPath: rc, noPatch: B.M, nativeMethods: Sb, nativeTree: Tb };window.ShadyDOM = ShadyDOM;$b();Yd("__shady_");Object.defineProperty(document, "_activeElement", nd.activeElement);D(Window.prototype, Ud, "__shady_");B.M || (Yd(), Hc());Cc();window.Event = Ec;window.CustomEvent = Fc;window.MouseEvent = Gc;window.ShadowRoot = wd;
  };var Zd = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function $d(a) {
    var b = Zd.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
  }function K(a) {
    var b = a.isConnected;if (void 0 !== b) return b;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }
  function ae(a, b) {
    for (; b && b !== a && !b.nextSibling;) b = b.parentNode;return b && b !== a ? b.nextSibling : null;
  }
  function be(a, b, c) {
    c = void 0 === c ? new Set() : c;for (var d = a; d;) {
      if (d.nodeType === Node.ELEMENT_NODE) {
        var e = d;b(e);var f = e.localName;if ("link" === f && "import" === e.getAttribute("rel")) {
          d = e.import;if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) be(d, b, c);d = ae(a, e);continue;
        } else if ("template" === f) {
          d = ae(a, e);continue;
        }if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) be(e, b, c);
      }d = d.firstChild ? d.firstChild : ae(a, d);
    }
  }function L(a, b, c) {
    a[b] = c;
  };function ce() {
    this.a = new Map();this.u = new Map();this.c = [];this.f = [];this.b = !1;
  }function de(a, b, c) {
    a.a.set(b, c);a.u.set(c.constructorFunction, c);
  }function ee(a, b) {
    a.b = !0;a.c.push(b);
  }function fe(a, b) {
    a.b = !0;a.f.push(b);
  }function ge(a, b) {
    a.b && be(b, function (b) {
      return he(a, b);
    });
  }function he(a, b) {
    if (a.b && !b.__CE_patched) {
      b.__CE_patched = !0;for (var c = 0; c < a.c.length; c++) a.c[c](b);for (c = 0; c < a.f.length; c++) a.f[c](b);
    }
  }
  function M(a, b) {
    var c = [];be(b, function (a) {
      return c.push(a);
    });for (b = 0; b < c.length; b++) {
      var d = c[b];1 === d.__CE_state ? a.connectedCallback(d) : ie(a, d);
    }
  }function N(a, b) {
    var c = [];be(b, function (a) {
      return c.push(a);
    });for (b = 0; b < c.length; b++) {
      var d = c[b];1 === d.__CE_state && a.disconnectedCallback(d);
    }
  }
  function O(a, b, c) {
    c = void 0 === c ? {} : c;var d = c.$a || new Set(),
        e = c.fa || function (b) {
      return ie(a, b);
    },
        f = [];be(b, function (b) {
      if ("link" === b.localName && "import" === b.getAttribute("rel")) {
        var c = b.import;c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
          var c = b.import;if (!c.__CE_documentLoadHandled) {
            c.__CE_documentLoadHandled = !0;var f = new Set(d);f.delete(c);O(a, c, { $a: f, fa: e });
          }
        });
      } else f.push(b);
    }, d);
    if (a.b) for (b = 0; b < f.length; b++) he(a, f[b]);for (b = 0; b < f.length; b++) e(f[b]);
  }
  function ie(a, b) {
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
        }K(b) && a.connectedCallback(b);
      }
    }
  }ce.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;b.connectedCallback && b.connectedCallback.call(a);
  };ce.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;b.disconnectedCallback && b.disconnectedCallback.call(a);
  };
  ce.prototype.attributeChangedCallback = function (a, b, c, d, e) {
    var f = a.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e);
  };function je(a) {
    var b = document;this.b = a;this.a = b;this.P = void 0;O(this.b, this.a);"loading" === this.a.readyState && (this.P = new MutationObserver(this.c.bind(this)), this.P.observe(this.a, { childList: !0, subtree: !0 }));
  }function ke(a) {
    a.P && a.P.disconnect();
  }je.prototype.c = function (a) {
    var b = this.a.readyState;"interactive" !== b && "complete" !== b || ke(this);for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) O(this.b, c[d]);
  };function le() {
    var a = this;this.a = this.w = void 0;this.b = new Promise(function (b) {
      a.a = b;a.w && b(a.w);
    });
  }le.prototype.resolve = function (a) {
    if (this.w) throw Error("Already resolved.");this.w = a;this.a && this.a(a);
  };function P(a) {
    this.c = !1;this.a = a;this.F = new Map();this.f = function (a) {
      return a();
    };this.b = !1;this.u = [];this.aa = new je(a);
  }r = P.prototype;
  r.wa = function (a, b) {
    var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");if (!$d(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");if (this.a.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");if (this.c) throw Error("A custom element is already being defined.");this.c = !0;try {
      var d = function (a) {
        var b = e[a];if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
        return b;
      },
          e = b.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var f = d("connectedCallback");var g = d("disconnectedCallback");var h = d("adoptedCallback");var k = d("attributeChangedCallback");var l = b.observedAttributes || [];
    } catch (n) {
      return;
    } finally {
      this.c = !1;
    }b = { localName: a, constructorFunction: b, connectedCallback: f, disconnectedCallback: g, adoptedCallback: h, attributeChangedCallback: k, observedAttributes: l, constructionStack: [] };de(this.a, a, b);this.u.push(b);this.b || (this.b = !0, this.f(function () {
      return me(c);
    }));
  };r.fa = function (a) {
    O(this.a, a);
  };
  function me(a) {
    if (!1 !== a.b) {
      a.b = !1;for (var b = a.u, c = [], d = new Map(), e = 0; e < b.length; e++) d.set(b[e].localName, []);O(a.a, document, { fa: function (b) {
          if (void 0 === b.__CE_state) {
            var e = b.localName,
                f = d.get(e);f ? f.push(b) : a.a.a.get(e) && c.push(b);
          }
        } });for (e = 0; e < c.length; e++) ie(a.a, c[e]);for (; 0 < b.length;) {
        var f = b.shift();e = f.localName;f = d.get(f.localName);for (var g = 0; g < f.length; g++) ie(a.a, f[g]);(e = a.F.get(e)) && e.resolve(void 0);
      }
    }
  }r.get = function (a) {
    if (a = this.a.a.get(a)) return a.constructorFunction;
  };
  r.xa = function (a) {
    if (!$d(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.F.get(a);if (b) return b.b;b = new le();this.F.set(a, b);this.a.a.get(a) && !this.u.some(function (b) {
      return b.localName === a;
    }) && b.resolve(void 0);return b.b;
  };r.Ra = function (a) {
    ke(this.aa);var b = this.f;this.f = function (c) {
      return a(function () {
        return b(c);
      });
    };
  };window.CustomElementRegistry = P;P.prototype.define = P.prototype.wa;P.prototype.upgrade = P.prototype.fa;P.prototype.get = P.prototype.get;
  P.prototype.whenDefined = P.prototype.xa;P.prototype.polyfillWrapFlushCallback = P.prototype.Ra;var ne = window.Document.prototype.createElement,
      oe = window.Document.prototype.createElementNS,
      pe = window.Document.prototype.importNode,
      qe = window.Document.prototype.prepend,
      re = window.Document.prototype.append,
      se = window.DocumentFragment.prototype.prepend,
      te = window.DocumentFragment.prototype.append,
      ue = window.Node.prototype.cloneNode,
      ve = window.Node.prototype.appendChild,
      we = window.Node.prototype.insertBefore,
      xe = window.Node.prototype.removeChild,
      ye = window.Node.prototype.replaceChild,
      ze = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
      Ae = window.Element.prototype.attachShadow,
      Be = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
      Ce = window.Element.prototype.getAttribute,
      De = window.Element.prototype.setAttribute,
      Ee = window.Element.prototype.removeAttribute,
      Fe = window.Element.prototype.getAttributeNS,
      Ge = window.Element.prototype.setAttributeNS,
      He = window.Element.prototype.removeAttributeNS,
      Ie = window.Element.prototype.insertAdjacentElement,
      Je = window.Element.prototype.insertAdjacentHTML,
      Ke = window.Element.prototype.prepend,
      Le = window.Element.prototype.append,
      Me = window.Element.prototype.before,
      Ne = window.Element.prototype.after,
      Oe = window.Element.prototype.replaceWith,
      Pe = window.Element.prototype.remove,
      Qe = window.HTMLElement,
      Re = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
      Se = window.HTMLElement.prototype.insertAdjacentElement,
      Te = window.HTMLElement.prototype.insertAdjacentHTML;var Ue = new function () {}();function Ve() {
    var a = We;window.HTMLElement = function () {
      function b() {
        var b = this.constructor,
            d = a.u.get(b);if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");var e = d.constructionStack;if (0 === e.length) return e = ne.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, he(a, e), e;d = e.length - 1;var f = e[d];if (f === Ue) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
        e[d] = Ue;Object.setPrototypeOf(f, b.prototype);he(a, f);return f;
      }b.prototype = Qe.prototype;Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });return b;
    }();
  };function Xe(a, b, c) {
    function d(b) {
      return function (c) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];e = [];for (var f = [], l = 0; l < d.length; l++) {
          var n = d[l];n instanceof Element && K(n) && f.push(n);if (n instanceof DocumentFragment) for (n = n.firstChild; n; n = n.nextSibling) e.push(n);else e.push(n);
        }b.apply(this, d);for (d = 0; d < f.length; d++) N(a, f[d]);if (K(this)) for (d = 0; d < e.length; d++) f = e[d], f instanceof Element && M(a, f);
      };
    }void 0 !== c.da && (b.prepend = d(c.da));void 0 !== c.append && (b.append = d(c.append));
  };function Ye() {
    var a = We;L(Document.prototype, "createElement", function (b) {
      if (this.__CE_hasRegistry) {
        var c = a.a.get(b);if (c) return new c.constructorFunction();
      }b = ne.call(this, b);he(a, b);return b;
    });L(Document.prototype, "importNode", function (b, c) {
      b = pe.call(this, b, !!c);this.__CE_hasRegistry ? O(a, b) : ge(a, b);return b;
    });L(Document.prototype, "createElementNS", function (b, c) {
      if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
        var d = a.a.get(c);if (d) return new d.constructorFunction();
      }b = oe.call(this, b, c);he(a, b);return b;
    });Xe(a, Document.prototype, { da: qe, append: re });
  };function Ze() {
    function a(a, d) {
      Object.defineProperty(a, "textContent", { enumerable: d.enumerable, configurable: !0, get: d.get, set: function (a) {
          if (this.nodeType === Node.TEXT_NODE) d.set.call(this, a);else {
            var c = void 0;if (this.firstChild) {
              var e = this.childNodes,
                  h = e.length;if (0 < h && K(this)) {
                c = Array(h);for (var k = 0; k < h; k++) c[k] = e[k];
              }
            }d.set.call(this, a);if (c) for (a = 0; a < c.length; a++) N(b, c[a]);
          }
        } });
    }var b = We;L(Node.prototype, "insertBefore", function (a, d) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);
        a = we.call(this, a, d);if (K(this)) for (d = 0; d < c.length; d++) M(b, c[d]);return a;
      }c = K(a);d = we.call(this, a, d);c && N(b, a);K(this) && M(b, a);return d;
    });L(Node.prototype, "appendChild", function (a) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);a = ve.call(this, a);if (K(this)) for (var e = 0; e < c.length; e++) M(b, c[e]);return a;
      }c = K(a);e = ve.call(this, a);c && N(b, a);K(this) && M(b, a);return e;
    });L(Node.prototype, "cloneNode", function (a) {
      a = ue.call(this, !!a);this.ownerDocument.__CE_hasRegistry ? O(b, a) : ge(b, a);return a;
    });L(Node.prototype, "removeChild", function (a) {
      var c = K(a),
          e = xe.call(this, a);c && N(b, a);return e;
    });L(Node.prototype, "replaceChild", function (a, d) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);a = ye.call(this, a, d);if (K(this)) for (N(b, d), d = 0; d < c.length; d++) M(b, c[d]);return a;
      }c = K(a);var f = ye.call(this, a, d),
          g = K(this);g && N(b, d);c && N(b, a);g && M(b, a);return f;
    });ze && ze.get ? a(Node.prototype, ze) : ee(b, function (b) {
      a(b, { enumerable: !0, configurable: !0, get: function () {
          for (var a = [], b = 0; b < this.childNodes.length; b++) {
            var c = this.childNodes[b];c.nodeType !== Node.COMMENT_NODE && a.push(c.textContent);
          }return a.join("");
        }, set: function (a) {
          for (; this.firstChild;) xe.call(this, this.firstChild);null != a && "" !== a && ve.call(this, document.createTextNode(a));
        } });
    });
  };function $e(a) {
    function b(b) {
      return function (c) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];e = [];for (var h = [], k = 0; k < d.length; k++) {
          var l = d[k];l instanceof Element && K(l) && h.push(l);if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) e.push(l);else e.push(l);
        }b.apply(this, d);for (d = 0; d < h.length; d++) N(a, h[d]);if (K(this)) for (d = 0; d < e.length; d++) h = e[d], h instanceof Element && M(a, h);
      };
    }var c = Element.prototype;void 0 !== Me && (c.before = b(Me));void 0 !== Me && (c.after = b(Ne));void 0 !== Oe && L(c, "replaceWith", function (b) {
      for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];d = [];for (var g = [], h = 0; h < c.length; h++) {
        var k = c[h];k instanceof Element && K(k) && g.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) d.push(k);else d.push(k);
      }h = K(this);Oe.apply(this, c);for (c = 0; c < g.length; c++) N(a, g[c]);if (h) for (N(a, this), c = 0; c < d.length; c++) g = d[c], g instanceof Element && M(a, g);
    });void 0 !== Pe && L(c, "remove", function () {
      var b = K(this);Pe.call(this);b && N(a, this);
    });
  };function af() {
    function a(a, b) {
      Object.defineProperty(a, "innerHTML", { enumerable: b.enumerable, configurable: !0, get: b.get, set: function (a) {
          var c = this,
              e = void 0;K(this) && (e = [], be(this, function (a) {
            a !== c && e.push(a);
          }));b.set.call(this, a);if (e) for (var f = 0; f < e.length; f++) {
            var g = e[f];1 === g.__CE_state && d.disconnectedCallback(g);
          }this.ownerDocument.__CE_hasRegistry ? O(d, this) : ge(d, this);return a;
        } });
    }function b(a, b) {
      L(a, "insertAdjacentElement", function (a, c) {
        var e = K(c);a = b.call(this, a, c);e && N(d, c);K(a) && M(d, c);return a;
      });
    }
    function c(a, b) {
      function c(a, b) {
        for (var c = []; a !== b; a = a.nextSibling) c.push(a);for (b = 0; b < c.length; b++) O(d, c[b]);
      }L(a, "insertAdjacentHTML", function (a, d) {
        a = a.toLowerCase();if ("beforebegin" === a) {
          var e = this.previousSibling;b.call(this, a, d);c(e || this.parentNode.firstChild, this);
        } else if ("afterbegin" === a) e = this.firstChild, b.call(this, a, d), c(this.firstChild, e);else if ("beforeend" === a) e = this.lastChild, b.call(this, a, d), c(e || this.firstChild, null);else if ("afterend" === a) e = this.nextSibling, b.call(this, a, d), c(this.nextSibling, e);else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      });
    }var d = We;Ae && L(Element.prototype, "attachShadow", function (a) {
      a = Ae.call(this, a);var b = d;if (b.b && !a.__CE_patched) {
        a.__CE_patched = !0;for (var c = 0; c < b.c.length; c++) b.c[c](a);
      }return this.__CE_shadowRoot = a;
    });Be && Be.get ? a(Element.prototype, Be) : Re && Re.get ? a(HTMLElement.prototype, Re) : fe(d, function (b) {
      a(b, { enumerable: !0, configurable: !0, get: function () {
          return ue.call(this, !0).innerHTML;
        }, set: function (a) {
          var b = "template" === this.localName,
              c = b ? this.content : this,
              d = oe.call(document, this.namespaceURI, this.localName);for (d.innerHTML = a; 0 < c.childNodes.length;) xe.call(c, c.childNodes[0]);for (a = b ? d.content : d; 0 < a.childNodes.length;) ve.call(c, a.childNodes[0]);
        } });
    });L(Element.prototype, "setAttribute", function (a, b) {
      if (1 !== this.__CE_state) return De.call(this, a, b);var c = Ce.call(this, a);De.call(this, a, b);b = Ce.call(this, a);d.attributeChangedCallback(this, a, c, b, null);
    });L(Element.prototype, "setAttributeNS", function (a, b, c) {
      if (1 !== this.__CE_state) return Ge.call(this, a, b, c);var e = Fe.call(this, a, b);Ge.call(this, a, b, c);c = Fe.call(this, a, b);d.attributeChangedCallback(this, b, e, c, a);
    });L(Element.prototype, "removeAttribute", function (a) {
      if (1 !== this.__CE_state) return Ee.call(this, a);var b = Ce.call(this, a);Ee.call(this, a);null !== b && d.attributeChangedCallback(this, a, b, null, null);
    });L(Element.prototype, "removeAttributeNS", function (a, b) {
      if (1 !== this.__CE_state) return He.call(this, a, b);var c = Fe.call(this, a, b);He.call(this, a, b);var e = Fe.call(this, a, b);c !== e && d.attributeChangedCallback(this, b, c, e, a);
    });Se ? b(HTMLElement.prototype, Se) : Ie ? b(Element.prototype, Ie) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Te ? c(HTMLElement.prototype, Te) : Je ? c(Element.prototype, Je) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Xe(d, Element.prototype, { da: Ke, append: Le });$e(d);
  };var bf = window.customElements;if (!bf || bf.forcePolyfill || "function" != typeof bf.define || "function" != typeof bf.get) {
    var We = new ce();Ve();Ye();Xe(We, DocumentFragment.prototype, { da: se, append: te });Ze();af();document.__CE_hasRegistry = !0;var customElements = new P(We);Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
  };function cf() {
    this.end = this.start = 0;this.rules = this.parent = this.previous = null;this.cssText = this.parsedCssText = "";this.atRule = !1;this.type = 0;this.parsedSelector = this.selector = this.keyframesName = "";
  }
  function df(a) {
    a = a.replace(ef, "").replace(ff, "");var b = gf,
        c = a,
        d = new cf();d.start = 0;d.end = c.length;for (var e = d, f = 0, g = c.length; f < g; f++) if ("{" === c[f]) {
      e.rules || (e.rules = []);var h = e,
          k = h.rules[h.rules.length - 1] || null;e = new cf();e.start = f + 1;e.parent = h;e.previous = k;h.rules.push(e);
    } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);return b(d, a);
  }
  function gf(a, b) {
    var c = b.substring(a.start, a.end - 1);a.parsedCssText = a.cssText = c.trim();a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = hf(c), c = c.replace(jf, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = kf : c.match(lf) && (a.type = mf, a.keyframesName = a.selector.split(jf).pop()) : a.type = 0 === c.indexOf("--") ? nf : of);if (c = a.rules) for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++) gf(f, b);return a;
  }function hf(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
      a = c;for (c = 6 - a.length; c--;) a = "0" + a;return "\\" + a;
    });
  }
  function pf(a, b, c) {
    c = void 0 === c ? "" : c;var d = "";if (a.cssText || a.rules) {
      var e = a.rules,
          f;if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));if (f) {
        f = 0;for (var g = e.length, h = void 0; f < g && (h = e[f]); f++) d = pf(h, b, d);
      } else b ? b = a.cssText : (b = a.cssText, b = b.replace(qf, "").replace(rf, ""), b = b.replace(uf, "").replace(vf, "")), (d = b.trim()) && (d = "  " + d + "\n");
    }d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));return c;
  }
  var of = 1,
      mf = 7,
      kf = 4,
      nf = 1E3,
      ef = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
      ff = /@import[^;]*;/gim,
      qf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      rf = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      uf = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      vf = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      lf = /^@[^\s]*keyframes/,
      jf = /\s+/g;var R = !(window.ShadyDOM && window.ShadyDOM.inUse),
      wf;function xf(a) {
    wf = a && a.shimcssproperties ? !1 : R || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"));
  }var yf;window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (yf = window.ShadyCSS.cssBuild);var zf = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? wf = window.ShadyCSS.nativeCss : window.ShadyCSS ? (xf(window.ShadyCSS), window.ShadyCSS = void 0) : xf(window.WebComponents && window.WebComponents.flags);var S = wf,
      Af = yf;var Bf = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
      Cf = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
      Df = /(--[\w-]+)\s*([:,;)]|$)/gi,
      Ef = /(animation\s*:)|(animation-name\s*:)/,
      Ff = /@media\s(.*)/,
      Gf = /\{[^}]*\}/g;var Hf = new Set();function If(a, b) {
    if (!a) return "";"string" === typeof a && (a = df(a));b && Jf(a, b);return pf(a, S);
  }function Kf(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = df(a.textContent));return a.__cssRules || null;
  }function Lf(a) {
    return !!a.parent && a.parent.type === mf;
  }function Jf(a, b, c, d) {
    if (a) {
      var e = !1,
          f = a.type;if (d && f === kf) {
        var g = a.selector.match(Ff);g && (window.matchMedia(g[1]).matches || (e = !0));
      }f === of ? b(a) : c && f === mf ? c(a) : f === nf && (e = !0);if ((a = a.rules) && !e) for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) Jf(g, b, c, d);
    }
  }
  function Mf(a, b, c, d) {
    var e = document.createElement("style");b && e.setAttribute("scope", b);e.textContent = a;Nf(e, c, d);return e;
  }var Of = null;function Pf(a) {
    a = document.createComment(" Shady DOM styles for " + a + " ");var b = document.head;b.insertBefore(a, (Of ? Of.nextSibling : null) || b.firstChild);return Of = a;
  }function Nf(a, b, c) {
    b = b || document.head;b.insertBefore(a, c && c.nextSibling || b.firstChild);Of ? a.compareDocumentPosition(Of) === Node.DOCUMENT_POSITION_PRECEDING && (Of = a) : Of = a;
  }
  function Qf(a, b) {
    for (var c = 0, d = a.length; b < d; b++) if ("(" === a[b]) c++;else if (")" === a[b] && 0 === --c) return b;return -1;
  }function Rf(a, b) {
    var c = a.indexOf("var(");if (-1 === c) return b(a, "", "", "");var d = Qf(a, c + 3),
        e = a.substring(c + 4, d);c = a.substring(0, c);a = Rf(a.substring(d + 1), b);d = e.indexOf(",");return -1 === d ? b(c, e.trim(), "", a) : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a);
  }function Sf(a, b) {
    R ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
  }
  var Tf = window.ShadyDOM && window.ShadyDOM.wrap || function (a) {
    return a;
  };function Uf(a) {
    var b = a.localName,
        c = "";b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);return { is: b, X: c };
  }function Vf(a) {
    for (var b = [], c = "", d = 0; 0 <= d && d < a.length; d++) if ("(" === a[d]) {
      var e = Qf(a, d);c += a.slice(d, e + 1);d = e;
    } else "," === a[d] ? (b.push(c), c = "") : c += a[d];c && b.push(c);return b;
  }
  function Wf(a) {
    if (void 0 !== Af) return Af;if (void 0 === a.__cssBuild) {
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
  function Xf(a) {
    a = void 0 === a ? "" : a;return "" !== a && S ? R ? "shadow" === a : "shady" === a : !1;
  };function Yf() {}function Zf(a, b) {
    $f(U, a, function (a) {
      ag(a, b || "");
    });
  }function $f(a, b, c) {
    b.nodeType === Node.ELEMENT_NODE && c(b);var d;"template" === b.localName ? d = (b.content || b._content || b).childNodes : d = b.children || b.childNodes;if (d) for (b = 0; b < d.length; b++) $f(a, d[b], c);
  }
  function ag(a, b, c) {
    if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b));else if (a.getAttribute) {
      var d = a.getAttribute("class");c ? d && (b = d.replace("style-scope", "").replace(b, ""), Sf(a, b)) : Sf(a, (d ? d + " " : "") + "style-scope " + b);
    }
  }function bg(a, b, c) {
    $f(U, a, function (a) {
      ag(a, b, !0);ag(a, c);
    });
  }function cg(a, b) {
    $f(U, a, function (a) {
      ag(a, b || "", !0);
    });
  }
  function dg(a, b, c, d, e) {
    var f = U;e = void 0 === e ? "" : e;"" === e && (R || "shady" === (void 0 === d ? "" : d) ? e = If(b, c) : (a = Uf(a), e = eg(f, b, a.is, a.X, c) + "\n\n"));return e.trim();
  }function eg(a, b, c, d, e) {
    var f = fg(c, d);c = c ? "." + c : "";return If(b, function (b) {
      b.c || (b.selector = b.C = gg(a, b, a.b, c, f), b.c = !0);e && e(b, c, f);
    });
  }function fg(a, b) {
    return b ? "[is=" + a + "]" : a;
  }
  function gg(a, b, c, d, e) {
    var f = Vf(b.selector);if (!Lf(b)) {
      b = 0;for (var g = f.length, h = void 0; b < g && (h = f[b]); b++) f[b] = c.call(a, h, d, e);
    }return f.filter(function (a) {
      return !!a;
    }).join(",");
  }function hg(a) {
    return a.replace(ig, function (a, c, d) {
      -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));return ":" + c + "(" + d + ")";
    });
  }
  function jg(a) {
    for (var b = [], c; c = a.match(kg);) {
      var d = c.index,
          e = Qf(a, d);if (-1 === e) throw Error(c.input + " selector missing ')'");c = a.slice(d, e + 1);a = a.replace(c, "\ue000");b.push(c);
    }return { na: a, matches: b };
  }function lg(a, b) {
    var c = a.split("\ue000");return b.reduce(function (a, b, f) {
      return a + b + c[f + 1];
    }, c[0]);
  }
  Yf.prototype.b = function (a, b, c) {
    var d = !1;a = a.trim();var e = ig.test(a);e && (a = a.replace(ig, function (a, b, c) {
      return ":" + b + "(" + c.replace(/\s/g, "") + ")";
    }), a = hg(a));var f = kg.test(a);if (f) {
      var g = jg(a);a = g.na;g = g.matches;
    }a = a.replace(mg, ":host $1");a = a.replace(ng, function (a, e, f) {
      d || (a = og(f, e, b, c), d = d || a.stop, e = a.Ha, f = a.value);return e + f;
    });f && (a = lg(a, g));e && (a = hg(a));return a = a.replace(pg, function (a, b, c, d) {
      return '[dir="' + c + '"] ' + b + d + ", " + b + '[dir="' + c + '"]' + d;
    });
  };
  function og(a, b, c, d) {
    var e = a.indexOf("::slotted");0 <= a.indexOf(":host") ? a = qg(a, d) : 0 !== e && (a = c ? rg(a, c) : a);c = !1;0 <= e && (b = "", c = !0);if (c) {
      var f = !0;c && (a = a.replace(sg, function (a, b) {
        return " > " + b;
      }));
    }return { value: a, Ha: b, stop: f };
  }function rg(a, b) {
    a = a.split(/(\[.+?\])/);for (var c = [], d = 0; d < a.length; d++) if (1 === d % 2) c.push(a[d]);else {
      var e = a[d];if ("" !== e || d !== a.length - 1) e = e.split(":"), e[0] += b, c.push(e.join(":"));
    }return c.join("");
  }
  function qg(a, b) {
    var c = a.match(tg);return (c = c && c[2].trim() || "") ? c[0].match(ug) ? a.replace(tg, function (a, c, f) {
      return b + f;
    }) : c.split(ug)[0] === b ? c : "should_not_match" : a.replace(":host", b);
  }function vg(a) {
    ":root" === a.selector && (a.selector = "html");
  }Yf.prototype.c = function (a) {
    return a.match(":host") ? "" : a.match("::slotted") ? this.b(a, ":not(.style-scope)") : rg(a.trim(), ":not(.style-scope)");
  };t.Object.defineProperties(Yf.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "style-scope";
      } } });
  var ig = /:(nth[-\w]+)\(([^)]+)\)/,
      ng = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
      ug = /[[.:#*]/,
      mg = /^(::slotted)/,
      tg = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      sg = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      pg = /(.*):dir\((?:(ltr|rtl))\)(.*)/,
      kg = /:(?:matches|any|-(?:webkit|moz)-any)/,
      U = new Yf();function wg(a, b, c, d, e) {
    this.L = a || null;this.b = b || null;this.la = c || [];this.G = null;this.cssBuild = e || "";this.X = d || "";this.a = this.H = this.K = null;
  }function V(a) {
    return a ? a.__styleInfo : null;
  }function xg(a, b) {
    return a.__styleInfo = b;
  }wg.prototype.c = function () {
    return this.L;
  };wg.prototype._getStyleRules = wg.prototype.c;function yg(a) {
    var b = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;return b && b.call(this, a);
  }var zg = navigator.userAgent.match("Trident");function Ag() {}function Bg(a) {
    var b = {},
        c = [],
        d = 0;Jf(a, function (a) {
      Cg(a);a.index = d++;a = a.A.cssText;for (var c; c = Df.exec(a);) {
        var e = c[1];":" !== c[2] && (b[e] = !0);
      }
    }, function (a) {
      c.push(a);
    });a.b = c;a = [];for (var e in b) a.push(e);return a;
  }
  function Cg(a) {
    if (!a.A) {
      var b = {},
          c = {};Dg(a, c) && (b.J = c, a.rules = null);b.cssText = a.parsedCssText.replace(Gf, "").replace(Bf, "");a.A = b;
    }
  }function Dg(a, b) {
    var c = a.A;if (c) {
      if (c.J) return Object.assign(b, c.J), !0;
    } else {
      c = a.parsedCssText;for (var d; a = Bf.exec(c);) {
        d = (a[2] || a[3]).trim();if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;d = !0;
      }return d;
    }
  }
  function Eg(a, b, c) {
    b && (b = 0 <= b.indexOf(";") ? Fg(a, b, c) : Rf(b, function (b, e, f, g) {
      if (!e) return b + g;(e = Eg(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = Eg(a, c[f] || f, c) || f;return b + (e || "") + g;
    }));return b && b.trim() || "";
  }
  function Fg(a, b, c) {
    b = b.split(";");for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
      Cf.lastIndex = 0;if (f = Cf.exec(e)) e = Eg(a, c[f[1]], c);else if (f = e.indexOf(":"), -1 !== f) {
        var g = e.substring(f);g = g.trim();g = Eg(a, g, c) || g;e = e.substring(0, f) + g;
      }b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || "";
    }return b.join(";");
  }
  function Gg(a, b) {
    var c = {},
        d = [];Jf(a, function (a) {
      a.A || Cg(a);var e = a.C || a.parsedSelector;b && a.A.J && e && yg.call(b, e) && (Dg(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32);
    }, null, !0);return { J: c, key: d };
  }
  function Hg(a, b, c, d) {
    b.A || Cg(b);if (b.A.J) {
      var e = Uf(a);a = e.is;e = e.X;e = a ? fg(a, e) : "html";var f = b.parsedSelector,
          g = ":host > *" === f || "html" === f,
          h = 0 === f.indexOf(":host") && !g;"shady" === c && (g = f === e + " > *." + e || -1 !== f.indexOf("html"), h = !g && 0 === f.indexOf(e));if (g || h) c = e, h && (b.C || (b.C = gg(U, b, U.b, a ? "." + a : "", e)), c = b.C || e), d({ na: c, Oa: h, bb: g });
    }
  }function Ig(a, b, c) {
    var d = {},
        e = {};Jf(b, function (b) {
      Hg(a, b, c, function (c) {
        yg.call(a._element || a, c.na) && (c.Oa ? Dg(b, d) : Dg(b, e));
      });
    }, null, !0);return { Ua: e, Ma: d };
  }
  function Jg(a, b, c, d) {
    var e = Uf(b),
        f = fg(e.is, e.X),
        g = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])"),
        h = V(b);e = h.L;h = h.cssBuild;var k = Kg(e, d);return dg(b, e, function (b) {
      var e = "";b.A || Cg(b);b.A.cssText && (e = Fg(a, b.A.cssText, c));b.cssText = e;if (!R && !Lf(b) && b.cssText) {
        var h = e = b.cssText;null == b.ra && (b.ra = Ef.test(e));if (b.ra) if (null == b.ba) {
          b.ba = [];for (var l in k) h = k[l], h = h(e), e !== h && (e = h, b.ba.push(l));
        } else {
          for (l = 0; l < b.ba.length; ++l) h = k[b.ba[l]], e = h(e);h = e;
        }b.cssText = h;b.C = b.C || b.selector;e = "." + d;l = Vf(b.C);h = 0;for (var v = l.length, x = void 0; h < v && (x = l[h]); h++) l[h] = x.match(g) ? x.replace(f, e) : e + " " + x;b.selector = l.join(",");
      }
    }, h);
  }function Kg(a, b) {
    a = a.b;var c = {};if (!R && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
      var f = e,
          g = b;f.f = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");f.a = f.keyframesName + "-" + g;f.C = f.C || f.selector;f.selector = f.C.replace(f.keyframesName, f.a);c[e.keyframesName] = Lg(e);
    }return c;
  }function Lg(a) {
    return function (b) {
      return b.replace(a.f, a.a);
    };
  }
  function Mg(a, b) {
    var c = Ng,
        d = Kf(a);a.textContent = If(d, function (a) {
      var d = a.cssText = a.parsedCssText;a.A && a.A.cssText && (d = d.replace(qf, "").replace(rf, ""), a.cssText = Fg(c, d, b));
    });
  }t.Object.defineProperties(Ag.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "x-scope";
      } } });var Ng = new Ag();var Og = {},
      Pg = window.customElements;if (Pg && !R && !zf) {
    var Qg = Pg.define;Pg.define = function (a, b, c) {
      Og[a] || (Og[a] = Pf(a));Qg.call(Pg, a, b, c);
    };
  };function Rg() {
    this.cache = {};
  }Rg.prototype.store = function (a, b, c, d) {
    var e = this.cache[a] || [];e.push({ J: b, styleElement: c, H: d });100 < e.length && e.shift();this.cache[a] = e;
  };function Sg() {}var Tg = new RegExp(U.a + "\\s*([^\\s]*)");function Ug(a) {
    return (a = (a.classList && a.classList.value ? a.classList.value : a.getAttribute("class") || "").match(Tg)) ? a[1] : "";
  }function Vg(a) {
    var b = Tf(a).getRootNode();return b === a || b === a.ownerDocument ? "" : (a = b.host) ? Uf(a).is : "";
  }
  function Wg(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b];if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
        var e = c.addedNodes[d];if (e.nodeType === Node.ELEMENT_NODE) {
          var f = e.getRootNode(),
              g = Ug(e);if (g && f === e.ownerDocument && ("style" !== e.localName && "template" !== e.localName || "" === Wf(e))) cg(e, g);else if (f instanceof ShadowRoot) for (f = Vg(e), f !== g && bg(e, g, f), e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + U.a + ")"), g = 0; g < e.length; g++) {
            f = e[g];
            var h = Vg(f);h && ag(f, h);
          }
        }
      }
    }
  }
  if (!(R || window.ShadyDOM && window.ShadyDOM.handlesDynamicScoping)) {
    var Xg = new MutationObserver(Wg),
        Yg = function (a) {
      Xg.observe(a, { childList: !0, subtree: !0 });
    };if (window.customElements && !window.customElements.polyfillWrapFlushCallback) Yg(document);else {
      var Zg = function () {
        Yg(document.body);
      };window.HTMLImports ? window.HTMLImports.whenReady(Zg) : requestAnimationFrame(function () {
        if ("loading" === document.readyState) {
          var a = function () {
            Zg();document.removeEventListener("readystatechange", a);
          };document.addEventListener("readystatechange", a);
        } else Zg();
      });
    }Sg = function () {
      Wg(Xg.takeRecords());
    };
  }var $g = Sg;var ah = {};var bh = Promise.resolve();function ch(a) {
    if (a = ah[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
  }function dh(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion;
  }function eh(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion;a._validating || (a._validating = !0, bh.then(function () {
      a._applyShimCurrentVersion = a._applyShimNextVersion;a._validating = !1;
    }));
  };var fh = {},
      gh = new Rg();function W() {
    this.F = {};this.c = document.documentElement;var a = new cf();a.rules = [];this.f = xg(this.c, new wg(a));this.u = !1;this.b = this.a = null;
  }r = W.prototype;r.flush = function () {
    $g();
  };r.Ka = function (a) {
    return Kf(a);
  };r.Ya = function (a) {
    return If(a);
  };r.prepareTemplate = function (a, b, c) {
    this.prepareTemplateDom(a, b);this.prepareTemplateStyles(a, b, c);
  };
  r.prepareTemplateStyles = function (a, b, c) {
    if (!a._prepared && !zf) {
      R || Og[b] || (Og[b] = Pf(b));a._prepared = !0;a.name = b;a.extends = c;ah[b] = a;var d = Wf(a),
          e = Xf(d);c = { is: b, extends: c };for (var f = [], g = a.content.querySelectorAll("style"), h = 0; h < g.length; h++) {
        var k = g[h];if (k.hasAttribute("shady-unscoped")) {
          if (!R) {
            var l = k.textContent;Hf.has(l) || (Hf.add(l), l = k.cloneNode(!0), document.head.appendChild(l));k.parentNode.removeChild(k);
          }
        } else f.push(k.textContent), k.parentNode.removeChild(k);
      }f = f.join("").trim() + (fh[b] || "");
      hh(this);if (!e) {
        if (g = !d) g = Cf.test(f) || Bf.test(f), Cf.lastIndex = 0, Bf.lastIndex = 0;h = df(f);g && S && this.a && this.a.transformRules(h, b);a._styleAst = h;
      }g = [];S || (g = Bg(a._styleAst));if (!g.length || S) h = R ? a.content : null, b = Og[b] || null, d = dg(c, a._styleAst, null, d, e ? f : ""), d = d.length ? Mf(d, c.is, h, b) : null, a._style = d;a.a = g;
    }
  };r.Sa = function (a, b) {
    fh[b] = a.join(" ");
  };r.prepareTemplateDom = function (a, b) {
    if (!zf) {
      var c = Wf(a);R || "shady" === c || a._domPrepared || (a._domPrepared = !0, Zf(a.content, b));
    }
  };
  function ih(a) {
    var b = Uf(a),
        c = b.is;b = b.X;var d = Og[c] || null,
        e = ah[c];if (e) {
      c = e._styleAst;var f = e.a;e = Wf(e);b = new wg(c, d, f, b, e);xg(a, b);return b;
    }
  }function jh(a) {
    !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
      a.va(b);
    }, a.b.validateCallback = function () {
      requestAnimationFrame(function () {
        (a.b.enqueued || a.u) && a.flushCustomStyles();
      });
    });
  }
  function hh(a) {
    !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = ch);jh(a);
  }
  r.flushCustomStyles = function () {
    if (!zf && (hh(this), this.b)) {
      var a = this.b.processStyles();if (this.b.enqueued && !Xf(this.f.cssBuild)) {
        if (S) {
          if (!this.f.cssBuild) for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b]);if (c && S && this.a) {
              var d = Kf(c);hh(this);this.a.transformRules(d);c.textContent = If(d);
            }
          }
        } else {
          kh(this, this.c, this.f);for (b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && Mg(c, this.f.K);this.u && this.styleDocument();
        }this.b.enqueued = !1;
      }
    }
  };
  r.styleElement = function (a, b) {
    if (zf) {
      if (b) {
        V(a) || xg(a, new wg(null));var c = V(a);c.G = c.G || {};Object.assign(c.G, b);lh(this, a, c);
      }
    } else if (c = V(a) || ih(a)) if (a !== this.c && (this.u = !0), b && (c.G = c.G || {}, Object.assign(c.G, b)), S) lh(this, a, c);else if (this.flush(), kh(this, a, c), c.la && c.la.length) {
      b = Uf(a).is;var d;a: {
        if (d = gh.cache[b]) for (var e = d.length - 1; 0 <= e; e--) {
          var f = d[e];b: {
            var g = c.la;for (var h = 0; h < g.length; h++) {
              var k = g[h];if (f.J[k] !== c.K[k]) {
                g = !1;break b;
              }
            }g = !0;
          }if (g) {
            d = f;break a;
          }
        }d = void 0;
      }g = d ? d.styleElement : null;
      e = c.H;(f = d && d.H) || (f = this.F[b] = (this.F[b] || 0) + 1, f = b + "-" + f);c.H = f;f = c.H;h = Ng;h = g ? g.textContent || "" : Jg(h, a, c.K, f);k = V(a);var l = k.a;l && !R && l !== g && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));R ? k.a ? (k.a.textContent = h, g = k.a) : h && (g = Mf(h, f, a.shadowRoot, k.b)) : g ? g.parentNode || (zg && -1 < h.indexOf("@media") && (g.textContent = h), Nf(g, null, k.b)) : h && (g = Mf(h, f, null, k.b));g && (g._useCount = g._useCount || 0, k.a != g && g._useCount++, k.a = g);f = g;R || (g = c.H, k = h = a.getAttribute("class") || "", e && (k = h.replace(new RegExp("\\s*x-scope\\s*" + e + "\\s*", "g"), " ")), k += (k ? " " : "") + "x-scope " + g, h !== k && Sf(a, k));d || gh.store(b, c.K, f, c.H);
    }
  };
  function lh(a, b, c) {
    var d = Uf(b).is;if (c.G) {
      var e = c.G,
          f;for (f in e) null === f ? b.style.removeProperty(f) : b.style.setProperty(f, e[f]);
    }e = ah[d];if (!(!e && b !== a.c || e && "" !== Wf(e)) && e && e._style && !dh(e)) {
      if (dh(e) || e._applyShimValidatingVersion !== e._applyShimNextVersion) hh(a), a.a && a.a.transformRules(e._styleAst, d), e._style.textContent = dg(b, c.L), eh(e);R && (a = b.shadowRoot) && (a = a.querySelector("style")) && (a.textContent = dg(b, c.L));c.L = e._styleAst;
    }
  }
  function mh(a, b) {
    return (b = Tf(b).getRootNode().host) ? V(b) || ih(b) ? b : mh(a, b) : a.c;
  }function kh(a, b, c) {
    var d = mh(a, b),
        e = V(d),
        f = e.K;d === a.c || f || (kh(a, d, e), f = e.K);a = Object.create(f || null);d = Ig(b, c.L, c.cssBuild);b = Gg(e.L, b).J;Object.assign(a, d.Ma, b, d.Ua);b = c.G;for (var g in b) if ((e = b[g]) || 0 === e) a[g] = e;g = Ng;b = Object.getOwnPropertyNames(a);for (e = 0; e < b.length; e++) d = b[e], a[d] = Eg(g, a[d], a);c.K = a;
  }r.styleDocument = function (a) {
    this.styleSubtree(this.c, a);
  };
  r.styleSubtree = function (a, b) {
    var c = Tf(a),
        d = c.shadowRoot;(d || a === this.c) && this.styleElement(a, b);if (a = d && (d.children || d.childNodes)) for (c = 0; c < a.length; c++) this.styleSubtree(a[c]);else if (c = c.children || c.childNodes) for (a = 0; a < c.length; a++) this.styleSubtree(c[a]);
  };
  r.va = function (a) {
    var b = this,
        c = Wf(a);c !== this.f.cssBuild && (this.f.cssBuild = c);if (!Xf(c)) {
      var d = Kf(a);Jf(d, function (a) {
        if (R) vg(a);else {
          var d = U;a.selector = a.parsedSelector;vg(a);a.selector = a.C = gg(d, a, d.c, void 0, void 0);
        }S && "" === c && (hh(b), b.a && b.a.transformRule(a));
      });S ? a.textContent = If(d) : this.f.L.rules.push(d);
    }
  };r.getComputedStyleValue = function (a, b) {
    var c;S || (c = (V(a) || V(mh(this, a))).K[b]);return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : "";
  };
  r.Xa = function (a, b) {
    var c = Tf(a).getRootNode();b = b ? b.split(/\s/) : [];c = c.host && c.host.localName;if (!c) {
      var d = a.getAttribute("class");if (d) {
        d = d.split(/\s/);for (var e = 0; e < d.length; e++) if (d[e] === U.a) {
          c = d[e + 1];break;
        }
      }
    }c && b.push(U.a, c);S || (c = V(a)) && c.H && b.push(Ng.a, c.H);Sf(a, b.join(" "));
  };r.Fa = function (a) {
    return V(a);
  };r.Wa = function (a, b) {
    ag(a, b);
  };r.Za = function (a, b) {
    ag(a, b, !0);
  };r.Va = function (a) {
    return Vg(a);
  };r.Ia = function (a) {
    return Ug(a);
  };W.prototype.flush = W.prototype.flush;W.prototype.prepareTemplate = W.prototype.prepareTemplate;
  W.prototype.styleElement = W.prototype.styleElement;W.prototype.styleDocument = W.prototype.styleDocument;W.prototype.styleSubtree = W.prototype.styleSubtree;W.prototype.getComputedStyleValue = W.prototype.getComputedStyleValue;W.prototype.setElementClass = W.prototype.Xa;W.prototype._styleInfoForNode = W.prototype.Fa;W.prototype.transformCustomStyleForDocument = W.prototype.va;W.prototype.getStyleAst = W.prototype.Ka;W.prototype.styleAstToString = W.prototype.Ya;W.prototype.flushCustomStyles = W.prototype.flushCustomStyles;
  W.prototype.scopeNode = W.prototype.Wa;W.prototype.unscopeNode = W.prototype.Za;W.prototype.scopeForNode = W.prototype.Va;W.prototype.currentScopeForNode = W.prototype.Ia;W.prototype.prepareAdoptedCssText = W.prototype.Sa;Object.defineProperties(W.prototype, { nativeShadow: { get: function () {
        return R;
      } }, nativeCss: { get: function () {
        return S;
      } } });var Z = new W(),
      nh,
      oh;window.ShadyCSS && (nh = window.ShadyCSS.ApplyShim, oh = window.ShadyCSS.CustomStyleInterface);
  window.ShadyCSS = { ScopingShim: Z, prepareTemplate: function (a, b, c) {
      Z.flushCustomStyles();Z.prepareTemplate(a, b, c);
    }, prepareTemplateDom: function (a, b) {
      Z.prepareTemplateDom(a, b);
    }, prepareTemplateStyles: function (a, b, c) {
      Z.flushCustomStyles();Z.prepareTemplateStyles(a, b, c);
    }, styleSubtree: function (a, b) {
      Z.flushCustomStyles();Z.styleSubtree(a, b);
    }, styleElement: function (a) {
      Z.flushCustomStyles();Z.styleElement(a);
    }, styleDocument: function (a) {
      Z.flushCustomStyles();Z.styleDocument(a);
    }, flushCustomStyles: function () {
      Z.flushCustomStyles();
    },
    getComputedStyleValue: function (a, b) {
      return Z.getComputedStyleValue(a, b);
    }, nativeCss: S, nativeShadow: R, cssBuild: Af, disableRuntime: zf };nh && (window.ShadyCSS.ApplyShim = nh);oh && (window.ShadyCSS.CustomStyleInterface = oh);(function (a) {
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
          p = "",
          v = !1,
          Q = !1,
          X = [];a: for (; (void 0 != a[x - 1] || 0 == x) && !this.i;) {
        var m = a[x];switch (k) {case "scheme start":
            if (m && q.test(m)) p += m.toLowerCase(), k = "scheme";else if (e) {
              h("Invalid scheme.");break a;
            } else {
              p = "";k = "no scheme";continue;
            }break;case "scheme":
            if (m && I.test(m)) p += m.toLowerCase();else if (":" == m) {
              this.h = p;p = "";if (e) break a;void 0 !== l[this.h] && (this.B = !0);k = "file" == this.h ? "relative" : this.B && g && g.h == this.h ? "relative or authority" : this.B ? "authority first slash" : "scheme data";
            } else if (e) {
              void 0 != m && h("Code point not allowed in scheme: " + m);break a;
            } else {
              p = "";x = 0;k = "no scheme";continue;
            }break;case "scheme data":
            "?" == m ? (this.o = "?", k = "query") : "#" == m ? (this.v = "#", k = "fragment") : void 0 != m && "\t" != m && "\n" != m && "\r" != m && (this.ia += c(m));break;case "no scheme":
            if (g && void 0 !== l[g.h]) {
              k = "relative";continue;
            } else h("Missing scheme."), f.call(this), this.i = !0;break;case "relative or authority":
            if ("/" == m && "/" == a[x + 1]) k = "authority ignore slashes";else {
              h("Expected /, got: " + m);k = "relative";continue;
            }break;case "relative":
            this.B = !0;"file" != this.h && (this.h = g.h);if (void 0 == m) {
              this.j = g.j;this.m = g.m;this.l = g.l.slice();this.o = g.o;this.s = g.s;this.g = g.g;break a;
            } else if ("/" == m || "\\" == m) "\\" == m && h("\\ is an invalid code point."), k = "relative slash";else if ("?" == m) this.j = g.j, this.m = g.m, this.l = g.l.slice(), this.o = "?", this.s = g.s, this.g = g.g, k = "query";else if ("#" == m) this.j = g.j, this.m = g.m, this.l = g.l.slice(), this.o = g.o, this.v = "#", this.s = g.s, this.g = g.g, k = "fragment";else {
              k = a[x + 1];var y = a[x + 2];if ("file" != this.h || !q.test(m) || ":" != k && "|" != k || void 0 != y && "/" != y && "\\" != y && "?" != y && "#" != y) this.j = g.j, this.m = g.m, this.s = g.s, this.g = g.g, this.l = g.l.slice(), this.l.pop();k = "relative path";continue;
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
              v && (h("@ already seen."), p += "%40");v = !0;for (m = 0; m < p.length; m++) y = p[m], "\t" == y || "\n" == y || "\r" == y ? h("Invalid whitespace in authority.") : ":" == y && null === this.g ? this.g = "" : (y = c(y), null !== this.g ? this.g += y : this.s += y);p = "";
            } else if (void 0 == m || "/" == m || "\\" == m || "?" == m || "#" == m) {
              x -= p.length;p = "";k = "host";continue;
            } else p += m;break;case "file host":
            if (void 0 == m || "/" == m || "\\" == m || "?" == m || "#" == m) {
              2 != p.length || !q.test(p[0]) || ":" != p[1] && "|" != p[1] ? (0 != p.length && (this.j = b.call(this, p), p = ""), k = "relative path start") : k = "relative path";continue;
            } else "\t" == m || "\n" == m || "\r" == m ? h("Invalid whitespace in file host.") : p += m;break;case "host":case "hostname":
            if (":" != m || Q) {
              if (void 0 == m || "/" == m || "\\" == m || "?" == m || "#" == m) {
                this.j = b.call(this, p);p = "";k = "relative path start";if (e) break a;continue;
              } else "\t" != m && "\n" != m && "\r" != m ? ("[" == m ? Q = !0 : "]" == m && (Q = !1), p += m) : h("Invalid code point in host/hostname: " + m);
            } else if (this.j = b.call(this, p), p = "", k = "port", "hostname" == e) break a;break;case "port":
            if (/[0-9]/.test(m)) p += m;else if (void 0 == m || "/" == m || "\\" == m || "?" == m || "#" == m || e) {
              "" != p && (p = parseInt(p, 10), p != l[this.h] && (this.m = p + ""), p = "");if (e) break a;k = "relative path start";continue;
            } else "\t" == m || "\n" == m || "\r" == m ? h("Invalid code point in port: " + m) : (f.call(this), this.i = !0);break;case "relative path start":
            "\\" == m && h("'\\' not allowed in path.");k = "relative path";if ("/" != m && "\\" != m) continue;break;case "relative path":
            if (void 0 != m && "/" != m && "\\" != m && (e || "?" != m && "#" != m)) "\t" != m && "\n" != m && "\r" != m && (p += c(m));else {
              "\\" == m && h("\\ not allowed in relative path.");if (y = n[p.toLowerCase()]) p = y;".." == p ? (this.l.pop(), "/" != m && "\\" != m && this.l.push("")) : "." == p && "/" != m && "\\" != m ? this.l.push("") : "." != p && ("file" == this.h && 0 == this.l.length && 2 == p.length && q.test(p[0]) && "|" == p[1] && (p = p[0] + ":"), this.l.push(p));p = "";"?" == m ? (this.o = "?", k = "query") : "#" == m && (this.v = "#", k = "fragment");
            }break;case "query":
            e || "#" != m ? void 0 != m && "\t" != m && "\n" != m && "\r" != m && (this.o += d(m)) : (this.v = "#", k = "fragment");break;case "fragment":
            void 0 != m && "\t" != m && "\n" != m && "\r" != m && (this.v += m);}x++;
      }
    }function f() {
      this.s = this.ia = this.h = "";this.g = null;this.m = this.j = "";this.l = [];this.v = this.o = "";this.B = this.i = !1;
    }function g(a, b) {
      void 0 === b || b instanceof g || (b = new g(String(b)));this.a = a;f.call(this);a = this.a.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");e.call(this, a, null, b);
    }var h = !1;try {
      var k = new URL("b", "http://a");k.pathname = "c%20d";h = "http://a/c%20d" === k.href;
    } catch (x) {}if (!h) {
      var l = Object.create(null);l.ftp = 21;l.file = 0;l.gopher = 70;l.http = 80;l.https = 443;l.ws = 80;l.wss = 443;var n = Object.create(null);n["%2e"] = ".";n[".%2e"] = "..";n["%2e."] = "..";n["%2e%2e"] = "..";var q = /[a-zA-Z]/,
          I = /[a-zA-Z0-9\+\-\.]/;g.prototype = { toString: function () {
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
          return this.i ? "" : this.B ? "/" + this.l.join("/") : this.ia;
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
        } };var v = a.URL;v && (g.createObjectURL = function (a) {
        return v.createObjectURL.apply(v, arguments);
      }, g.revokeObjectURL = function (a) {
        v.revokeObjectURL(a);
      });a.URL = g;
    }
  })(window);Object.getOwnPropertyDescriptor(Node.prototype, "baseURI") || Object.defineProperty(Node.prototype, "baseURI", { get: function () {
      var a = (this.ownerDocument || this).querySelector("base[href]");return a && a.href || window.location.href;
    }, configurable: !0, enumerable: !0 });var ph = document.createElement("style");ph.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";var qh = document.querySelector("head");qh.insertBefore(ph, qh.firstChild);var rh = window.customElements,
      sh = !1,
      th = null;rh.polyfillWrapFlushCallback && rh.polyfillWrapFlushCallback(function (a) {
    th = a;sh && a();
  });function uh() {
    window.HTMLTemplateElement.bootstrap && window.HTMLTemplateElement.bootstrap(window.document);th && th();sh = !0;window.WebComponents.ready = !0;document.dispatchEvent(new CustomEvent("WebComponentsReady", { bubbles: !0 }));
  }
  "complete" !== document.readyState ? (window.addEventListener("load", uh), window.addEventListener("DOMContentLoaded", function () {
    window.removeEventListener("load", uh);uh();
  })) : uh();
}).call(this);

//# sourceMappingURL=webcomponents-bundle.js.map