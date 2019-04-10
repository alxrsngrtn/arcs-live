/// BareSpecifier=@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce
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
  var n,
      p = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
      aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  };function ba() {
    ba = function () {};p.Symbol || (p.Symbol = ca);
  }var ca = function () {
    var a = 0;return function (b) {
      return "jscomp_symbol_" + (b || "") + a++;
    };
  }();
  function da() {
    ba();var a = p.Symbol.iterator;a || (a = p.Symbol.iterator = p.Symbol("iterator"));"function" != typeof Array.prototype[a] && aa(Array.prototype, a, { configurable: !0, writable: !0, value: function () {
        return ea(this);
      } });da = function () {};
  }function ea(a) {
    var b = 0;return fa(function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }function fa(a) {
    da();a = { next: a };a[p.Symbol.iterator] = function () {
      return this;
    };return a;
  }function ha(a) {
    da();ba();da();var b = a[Symbol.iterator];return b ? b.call(a) : ea(a);
  }
  function ia(a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);return c;
  }function la() {
    this.ea = this.root = null;this.O = !1;this.w = this.L = this.W = this.assignedSlot = this.assignedNodes = this.F = null;this.childNodes = this.nextSibling = this.previousSibling = this.lastChild = this.firstChild = this.parentNode = this.G = void 0;this.$ = this.aa = !1;this.K = {};
  }la.prototype.toJSON = function () {
    return {};
  };function q(a) {
    a.__shady || (a.__shady = new la());return a.__shady;
  }function r(a) {
    return a && a.__shady;
  };var t = window.ShadyDOM || {};t.ta = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);var ma = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");t.j = !!(ma && ma.configurable && ma.get);t.X = t.force || !t.ta;t.D = t.noPatch || !1;t.da = t.preferPerformance;function u(a) {
    return (a = r(a)) && void 0 !== a.firstChild;
  }function w(a) {
    return "ShadyRoot" === a.na;
  }function na(a) {
    return (a = (a = r(a)) && a.root) && oa(a);
  }
  var x = Element.prototype,
      pa = x.matches || x.matchesSelector || x.mozMatchesSelector || x.msMatchesSelector || x.oMatchesSelector || x.webkitMatchesSelector,
      qa = document.createTextNode(""),
      ra = 0,
      sa = [];new MutationObserver(function () {
    for (; sa.length;) try {
      sa.shift()();
    } catch (a) {
      throw qa.textContent = ra++, a;
    }
  }).observe(qa, { characterData: !0 });function ta(a) {
    sa.push(a);qa.textContent = ra++;
  }var ua = !!document.contains;function va(a, b) {
    for (; b;) {
      if (b == a) return !0;b = b.__shady_parentNode;
    }return !1;
  }
  function wa(a) {
    for (var b = a.length - 1; 0 <= b; b--) {
      var c = a[b],
          d = c.getAttribute("id") || c.getAttribute("name");d && "length" !== d && isNaN(d) && (a[d] = c);
    }a.item = function (b) {
      return a[b];
    };a.namedItem = function (b) {
      if ("length" !== b && isNaN(b) && a[b]) return a[b];for (var c = ha(a), d = c.next(); !d.done; d = c.next()) if (d = d.value, (d.getAttribute("id") || d.getAttribute("name")) == b) return d;return null;
    };return a;
  }
  function y(a, b, c, d) {
    c = void 0 === c ? "" : c;for (var e in b) {
      var f = b[e];if (!(d && 0 <= d.indexOf(e))) {
        f.configurable = !0;var g = c + e;if (f.value) a[g] = f.value;else try {
          Object.defineProperty(a, g, f);
        } catch (h) {}
      }
    }
  }function z(a) {
    var b = {};Object.getOwnPropertyNames(a).forEach(function (c) {
      b[c] = Object.getOwnPropertyDescriptor(a, c);
    });return b;
  };var xa = [],
      ya;function za(a) {
    ya || (ya = !0, ta(Aa));xa.push(a);
  }function Aa() {
    ya = !1;for (var a = !!xa.length; xa.length;) xa.shift()();return a;
  }Aa.list = xa;function Ba() {
    this.a = !1;this.addedNodes = [];this.removedNodes = [];this.N = new Set();
  }function Ca(a) {
    a.a || (a.a = !0, ta(function () {
      a.flush();
    }));
  }Ba.prototype.flush = function () {
    if (this.a) {
      this.a = !1;var a = this.takeRecords();a.length && this.N.forEach(function (b) {
        b(a);
      });
    }
  };Ba.prototype.takeRecords = function () {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }];this.addedNodes = [];this.removedNodes = [];return a;
    }return [];
  };
  function Da(a, b) {
    var c = q(a);c.F || (c.F = new Ba());c.F.N.add(b);var d = c.F;return { ma: b, B: d, oa: a, takeRecords: function () {
        return d.takeRecords();
      } };
  }function Ea(a) {
    var b = a && a.B;b && (b.N.delete(a.ma), b.N.size || (q(a.oa).F = null));
  }
  function Fa(a, b) {
    var c = b.getRootNode();return a.map(function (a) {
      var b = c === a.target.getRootNode();if (b && a.addedNodes) {
        if (b = Array.from(a.addedNodes).filter(function (a) {
          return c === a.getRootNode();
        }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", { value: b, configurable: !0 }), a;
      } else if (b) return a;
    }).filter(function (a) {
      return a;
    });
  };var Ga = /[&\u00A0"]/g,
      Ha = /[&\u00A0<>]/g;function Ia(a) {
    switch (a) {case "&":
        return "&amp;";case "<":
        return "&lt;";case ">":
        return "&gt;";case '"':
        return "&quot;";case "\u00a0":
        return "&nbsp;";}
  }function Ja(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;return b;
  }var Ka = Ja("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
      La = Ja("style script xmp iframe noembed noframes plaintext noscript".split(" "));
  function Ma(a, b) {
    "template" === a.localName && (a = a.content);for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g = void 0; e < f && (g = d[e]); e++) {
      a: {
        var h = g;var k = a,
            l = b;switch (h.nodeType) {case Node.ELEMENT_NODE:
            k = h.localName;for (var m = "<" + k, v = h.attributes, ja = 0, ka; ka = v[ja]; ja++) m += " " + ka.name + '="' + ka.value.replace(Ga, Ia) + '"';m += ">";h = Ka[k] ? m : m + Ma(h, l) + "</" + k + ">";break a;case Node.TEXT_NODE:
            h = h.data;h = k && La[k.localName] ? h : h.replace(Ha, Ia);break a;case Node.COMMENT_NODE:
            h = "\x3c!--" + h.data + "--\x3e";break a;default:
            throw window.console.error(h), Error("not implemented");}
      }c += h;
    }return c;
  };var Na = t.j,
      Oa = { querySelector: function (a) {
      return this.__shady_native_querySelector(a);
    }, querySelectorAll: function (a) {
      return this.__shady_native_querySelectorAll(a);
    } },
      Pa = {};function Qa(a) {
    Pa[a] = function (b) {
      return b["__shady_native_" + a];
    };
  }function Ra(a, b) {
    y(a, b, "__shady_native_");for (var c in b) Qa(c);
  }function A(a, b) {
    b = void 0 === b ? [] : b;for (var c = 0; c < b.length; c++) {
      var d = b[c],
          e = Object.getOwnPropertyDescriptor(a, d);e && (Object.defineProperty(a, "__shady_native_" + d, e), e.value ? Oa[d] || (Oa[d] = e.value) : Qa(d));
    }
  }
  var B = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
      C = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1),
      Ta = document.implementation.createHTMLDocument("inert");function Ua(a) {
    for (var b; b = a.__shady_native_firstChild;) a.__shady_native_removeChild(b);
  }var Va = ["firstElementChild", "lastElementChild", "children", "childElementCount"],
      Wa = ["querySelector", "querySelectorAll"];
  function Xa() {
    var a = ["dispatchEvent", "addEventListener", "removeEventListener"];window.EventTarget ? A(window.EventTarget.prototype, a) : (A(Node.prototype, a), A(Window.prototype, a));Na ? A(Node.prototype, "parentNode firstChild lastChild previousSibling nextSibling childNodes parentElement textContent".split(" ")) : Ra(Node.prototype, { parentNode: { get: function () {
          B.currentNode = this;return B.parentNode();
        } }, firstChild: { get: function () {
          B.currentNode = this;return B.firstChild();
        } }, lastChild: { get: function () {
          B.currentNode = this;return B.lastChild();
        } }, previousSibling: { get: function () {
          B.currentNode = this;return B.previousSibling();
        } }, nextSibling: { get: function () {
          B.currentNode = this;return B.nextSibling();
        } }, childNodes: { get: function () {
          var a = [];B.currentNode = this;for (var c = B.firstChild(); c;) a.push(c), c = B.nextSibling();return a;
        } }, parentElement: { get: function () {
          C.currentNode = this;return C.parentNode();
        } }, textContent: { get: function () {
          switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              for (var a = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1), c = "", d; d = a.nextNode();) c += d.nodeValue;return c;default:
              return this.nodeValue;}
        }, set: function (a) {
          if ("undefined" === typeof a || null === a) a = "";switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              Ua(this);(0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_native_insertBefore(document.createTextNode(a), void 0);break;default:
              this.nodeValue = a;}
        } } });A(Node.prototype, "appendChild insertBefore removeChild replaceChild cloneNode contains".split(" "));
    a = { firstElementChild: { get: function () {
          C.currentNode = this;return C.firstChild();
        } }, lastElementChild: { get: function () {
          C.currentNode = this;return C.lastChild();
        } }, children: { get: function () {
          var a = [];C.currentNode = this;for (var c = C.firstChild(); c;) a.push(c), c = C.nextSibling();return wa(a);
        } }, childElementCount: { get: function () {
          return this.children ? this.children.length : 0;
        } } };Na ? (A(Element.prototype, Va), A(Element.prototype, ["previousElementSibling", "nextElementSibling", "innerHTML"]), Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && A(HTMLElement.prototype, ["children"]), Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && A(HTMLElement.prototype, ["innerHTML"])) : (Ra(Element.prototype, a), Ra(Element.prototype, { previousElementSibling: { get: function () {
          C.currentNode = this;return C.previousSibling();
        } }, nextElementSibling: { get: function () {
          C.currentNode = this;return C.nextSibling();
        } }, innerHTML: { get: function () {
          return Ma(this, function (a) {
            return a.__shady_native_childNodes;
          });
        }, set: function (a) {
          var b = "template" === this.localName ? this.content : this;Ua(b);var d = this.localName || "div";d = this.namespaceURI && this.namespaceURI !== Ta.namespaceURI ? Ta.createElementNS(this.namespaceURI, d) : Ta.createElement(d);d.innerHTML = a;for (a = "template" === this.localName ? d.content : d; d = a.__shady_native_firstChild;) b.__shady_native_insertBefore(d, void 0);
        } } }));A(Element.prototype, "setAttribute getAttribute hasAttribute removeAttribute focus blur".split(" "));A(Element.prototype, Wa);A(HTMLElement.prototype, ["focus", "blur", "contains"]);Na && A(HTMLElement.prototype, ["parentElement", "children", "innerHTML"]);window.HTMLTemplateElement && A(window.HTMLTemplateElement.prototype, ["innerHTML"]);Na ? A(DocumentFragment.prototype, Va) : Ra(DocumentFragment.prototype, a);A(DocumentFragment.prototype, Wa);Na ? (A(Document.prototype, Va), A(Document.prototype, ["activeElement"])) : Ra(Document.prototype, a);A(Document.prototype, ["importNode", "getElementById"]);A(Document.prototype, Wa);
  };var Ya = z({ get childNodes() {
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
      Za = z({ get parentElement() {
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
      $a;for ($a in Ya) Ya[$a].enumerable = !1;for (var ab in Za) Za[ab].enumerable = !1;var bb = t.j || t.D,
      cb = bb ? function () {} : function (a) {
    var b = q(a);b.aa || (b.aa = !0, y(a, Za));
  },
      db = bb ? function () {} : function (a) {
    var b = q(a);b.$ || (b.$ = !0, y(a, Ya));
  };var eb = "__eventWrappers" + Date.now(),
      fb = function () {
    var a = Object.getOwnPropertyDescriptor(Event.prototype, "composed");return a ? function (b) {
      return a.get.call(b);
    } : null;
  }(),
      gb = function () {
    function a() {}var b = !1,
        c = { get capture() {
        b = !0;
      } };window.addEventListener("test", a, c);window.removeEventListener("test", a, c);return b;
  }();function hb(a) {
    if (a && "object" === typeof a) {
      var b = !!a.capture;var c = !!a.once;var d = !!a.passive;var e = a.A;
    } else b = !!a, d = c = !1;return { fa: e, capture: b, once: c, passive: d, ca: gb ? a : b };
  }
  var ib = { blur: !0, focus: !0, focusin: !0, focusout: !0, click: !0, dblclick: !0, mousedown: !0, mouseenter: !0, mouseleave: !0, mousemove: !0, mouseout: !0, mouseover: !0, mouseup: !0, wheel: !0, beforeinput: !0, input: !0, keydown: !0, keyup: !0, compositionstart: !0, compositionupdate: !0, compositionend: !0, touchstart: !0, touchend: !0, touchmove: !0, touchcancel: !0, pointerover: !0, pointerenter: !0, pointerdown: !0, pointermove: !0, pointerup: !0, pointercancel: !0, pointerout: !0, pointerleave: !0, gotpointercapture: !0, lostpointercapture: !0, dragstart: !0,
    drag: !0, dragenter: !0, dragleave: !0, dragover: !0, drop: !0, dragend: !0, DOMActivate: !0, DOMFocusIn: !0, DOMFocusOut: !0, keypress: !0 },
      jb = { DOMAttrModified: !0, DOMAttributeNameChanged: !0, DOMCharacterDataModified: !0, DOMElementNameChanged: !0, DOMNodeInserted: !0, DOMNodeInsertedIntoDocument: !0, DOMNodeRemoved: !0, DOMNodeRemovedFromDocument: !0, DOMSubtreeModified: !0 };function kb(a) {
    return a instanceof Node ? a.__shady_getRootNode() : a;
  }
  function lb(a, b) {
    var c = [],
        d = a;for (a = kb(a); d;) c.push(d), d.__shady_assignedSlot ? d = d.__shady_assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d = d.host : d = d.__shady_parentNode;c[c.length - 1] === document && c.push(window);return c;
  }function mb(a) {
    a.__composedPath || (a.__composedPath = lb(a.target, !0));return a.__composedPath;
  }function nb(a, b) {
    if (!w) return a;a = lb(a, !0);for (var c = 0, d, e = void 0, f, g = void 0; c < b.length; c++) if (d = b[c], f = kb(d), f !== e && (g = a.indexOf(f), e = f), !w(f) || -1 < g) return d;
  }
  function ob(a) {
    function b(b, d) {
      b = new a(b, d);b.__composed = d && !!d.composed;return b;
    }b.__proto__ = a;b.prototype = a.prototype;return b;
  }var pb = { focus: !0, blur: !0 };function qb(a) {
    return a.__target !== a.target || a.__relatedTarget !== a.relatedTarget;
  }function rb(a, b, c) {
    if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!qb(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.__immediatePropagationStopped); d++);
  }
  function sb(a) {
    var b = a.composedPath();Object.defineProperty(a, "currentTarget", { get: function () {
        return d;
      }, configurable: !0 });for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c];rb(a, d, "capture");if (a.U) return;
    }Object.defineProperty(a, "eventPhase", { get: function () {
        return Event.AT_TARGET;
      } });var e;for (c = 0; c < b.length; c++) {
      d = b[c];var f = r(d);f = f && f.root;if (0 === c || f && f === e) if (rb(a, d, "bubble"), d !== window && (e = d.__shady_getRootNode()), a.U) break;
    }
  }
  function tb(a, b, c, d, e, f) {
    for (var g = 0; g < a.length; g++) {
      var h = a[g],
          k = h.type,
          l = h.capture,
          m = h.once,
          v = h.passive;if (b === h.node && c === k && d === l && e === m && f === v) return g;
    }return -1;
  }
  function ub(a, b, c) {
    var d = hb(c);c = d.capture;var e = d.once,
        f = d.passive,
        g = d.fa,
        h = d.ca;if (b) {
      var k = typeof b;if ("function" === k || "object" === k) if ("object" !== k || b.handleEvent && "function" === typeof b.handleEvent) {
        if (jb[a]) return this.__shady_native_addEventListener(a, b, h);var l = g || this;if (d = b[eb]) {
          if (-1 < tb(d, l, a, c, e, f)) return;
        } else b[eb] = [];d = function (c) {
          e && this.__shady_removeEventListener(a, b, h);c.__target || vb(c);if (l !== this) {
            var d = Object.getOwnPropertyDescriptor(c, "currentTarget");Object.defineProperty(c, "currentTarget", { get: function () {
                return l;
              }, configurable: !0 });
          }c.__previousCurrentTarget = c.currentTarget;if (!w(l) && "slot" !== l.localName || -1 != c.composedPath().indexOf(l)) if (c.composed || -1 < c.composedPath().indexOf(l)) if (qb(c) && c.target === c.relatedTarget) c.eventPhase === Event.BUBBLING_PHASE && c.stopImmediatePropagation();else if (c.eventPhase === Event.CAPTURING_PHASE || c.bubbles || c.target === l || l instanceof Window) {
            var f = "function" === k ? b.call(l, c) : b.handleEvent && b.handleEvent(c);l !== this && (d ? (Object.defineProperty(c, "currentTarget", d), d = null) : delete c.currentTarget);return f;
          }
        };b[eb].push({ node: l, type: a, capture: c, once: e, passive: f, Ga: d });pb[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || { capture: [], bubble: [] }, this.__handlers[a][c ? "capture" : "bubble"].push(d)) : this.__shady_native_addEventListener(a, d, h);
      }
    }
  }
  function wb(a, b, c) {
    if (b) {
      var d = hb(c);c = d.capture;var e = d.once,
          f = d.passive,
          g = d.fa;d = d.ca;if (jb[a]) return this.__shady_native_removeEventListener(a, b, d);var h = g || this;g = void 0;var k = null;try {
        k = b[eb];
      } catch (l) {}k && (e = tb(k, h, a, c, e, f), -1 < e && (g = k.splice(e, 1)[0].Ga, k.length || (b[eb] = void 0)));this.__shady_native_removeEventListener(a, g || b, d);g && pb[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][c ? "capture" : "bubble"], b = a.indexOf(g), -1 < b && a.splice(b, 1));
    }
  }
  function xb() {
    for (var a in pb) window.__shady_native_addEventListener(a, function (a) {
      a.__target || (vb(a), sb(a));
    }, !0);
  }
  var yb = z({ get composed() {
      void 0 === this.__composed && (fb ? this.__composed = "focusin" === this.type || "focusout" === this.type || fb(this) : !1 !== this.isTrusted && (this.__composed = ib[this.type]));return this.__composed || !1;
    }, composedPath: function () {
      this.__composedPath || (this.__composedPath = lb(this.__target, this.composed));return this.__composedPath;
    }, get target() {
      return nb(this.currentTarget || this.__previousCurrentTarget, this.composedPath());
    }, get relatedTarget() {
      if (!this.__relatedTarget) return null;this.__relatedTargetComposedPath || (this.__relatedTargetComposedPath = lb(this.__relatedTarget, !0));return nb(this.currentTarget || this.__previousCurrentTarget, this.__relatedTargetComposedPath);
    }, stopPropagation: function () {
      Event.prototype.stopPropagation.call(this);this.U = !0;
    }, stopImmediatePropagation: function () {
      Event.prototype.stopImmediatePropagation.call(this);this.U = this.__immediatePropagationStopped = !0;
    } });
  function vb(a) {
    a.__target = a.target;a.__relatedTarget = a.relatedTarget;if (t.j) {
      var b = Object.getPrototypeOf(a);if (!Object.hasOwnProperty(b, "__shady_patchedProto")) {
        var c = Object.create(b);c.__shady_sourceProto = b;y(c, yb);b.__shady_patchedProto = c;
      }a.__proto__ = b.__shady_patchedProto;
    } else y(a, yb);
  }var zb = ob(Event),
      Ab = ob(CustomEvent),
      Bb = ob(MouseEvent);
  function Cb() {
    if (!fb && Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")) {
      var a = function () {
        var a = new MouseEvent("click", { bubbles: !0, cancelable: !0, composed: !0 });this.__shady_dispatchEvent(a);
      };Element.prototype.click ? Element.prototype.click = a : HTMLElement.prototype.click && (HTMLElement.prototype.click = a);
    }
  }var Db = Object.getOwnPropertyNames(Document.prototype).filter(function (a) {
    return "on" === a.substring(0, 2);
  });function Eb(a, b) {
    return { index: a, H: [], M: b };
  }
  function Fb(a, b, c, d) {
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        k = Math.min(b - e, d - f);if (0 == e && 0 == f) a: {
      for (g = 0; g < k; g++) if (a[g] !== c[g]) break a;g = k;
    }if (b == a.length && d == c.length) {
      h = a.length;for (var l = c.length, m = 0; m < k - g && Gb(a[--h], c[--l]);) m++;h = m;
    }e += g;f += g;b -= h;d -= h;if (0 == b - e && 0 == d - f) return [];if (e == b) {
      for (b = Eb(e, 0); f < d;) b.H.push(c[f++]);return [b];
    }if (f == d) return [Eb(e, b - e)];k = e;g = f;d = d - g + 1;h = b - k + 1;b = Array(d);for (l = 0; l < d; l++) b[l] = Array(h), b[l][0] = l;for (l = 0; l < h; l++) b[0][l] = l;for (l = 1; l < d; l++) for (m = 1; m < h; m++) if (a[k + m - 1] === c[g + l - 1]) b[l][m] = b[l - 1][m - 1];else {
      var v = b[l - 1][m] + 1,
          ja = b[l][m - 1] + 1;b[l][m] = v < ja ? v : ja;
    }k = b.length - 1;g = b[0].length - 1;d = b[k][g];for (a = []; 0 < k || 0 < g;) 0 == k ? (a.push(2), g--) : 0 == g ? (a.push(3), k--) : (h = b[k - 1][g - 1], l = b[k - 1][g], m = b[k][g - 1], v = l < m ? l < h ? l : h : m < h ? m : h, v == h ? (h == d ? a.push(0) : (a.push(1), d = h), k--, g--) : v == l ? (a.push(3), k--, d = l) : (a.push(2), g--, d = m));a.reverse();b = void 0;k = [];for (g = 0; g < a.length; g++) switch (a[g]) {case 0:
        b && (k.push(b), b = void 0);e++;f++;break;case 1:
        b || (b = Eb(e, 0));b.M++;e++;b.H.push(c[f]);f++;break;case 2:
        b || (b = Eb(e, 0));b.M++;e++;break;case 3:
        b || (b = Eb(e, 0)), b.H.push(c[f]), f++;}b && k.push(b);return k;
  }function Gb(a, b) {
    return a === b;
  };function Hb(a, b, c) {
    cb(a);c = c || null;var d = q(a),
        e = q(b),
        f = c ? q(c) : null;d.previousSibling = c ? f.previousSibling : b.__shady_lastChild;if (f = r(d.previousSibling)) f.nextSibling = a;if (f = r(d.nextSibling = c)) f.previousSibling = a;d.parentNode = b;c ? c === e.firstChild && (e.firstChild = a) : (e.lastChild = a, e.firstChild || (e.firstChild = a));e.childNodes = null;
  }
  function Ib(a, b, c) {
    db(b);var d = q(b);void 0 !== d.firstChild && (d.childNodes = null);if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      d = a.__shady_childNodes;for (var e = 0; e < d.length; e++) Hb(d[e], b, c);a = q(a);b = void 0 !== a.firstChild ? null : void 0;a.firstChild = a.lastChild = b;a.childNodes = b;
    } else Hb(a, b, c);
  }
  function Jb(a, b) {
    var c = q(a);b = q(b);a === b.firstChild && (b.firstChild = c.nextSibling);a === b.lastChild && (b.lastChild = c.previousSibling);a = c.previousSibling;var d = c.nextSibling;a && (q(a).nextSibling = d);d && (q(d).previousSibling = a);c.parentNode = c.previousSibling = c.nextSibling = void 0;void 0 !== b.childNodes && (b.childNodes = null);
  }
  function Kb(a) {
    var b = q(a);if (void 0 === b.firstChild) {
      b.childNodes = null;var c = b.firstChild = a.__shady_native_firstChild || null;b.lastChild = a.__shady_native_lastChild || null;db(a);b = c;for (c = void 0; b; b = b.__shady_native_nextSibling) {
        var d = q(b);d.parentNode = a;d.nextSibling = b.__shady_native_nextSibling || null;d.previousSibling = c || null;c = b;cb(b);
      }
    }
  };var Lb = null;function D() {
    Lb || (Lb = window.ShadyCSS && window.ShadyCSS.ScopingShim);return Lb || null;
  }function Mb(a, b) {
    var c = D();c && c.unscopeNode(a, b);
  }function Nb(a, b) {
    var c = D();if (!c) return !0;if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      c = !0;a = a.__shady_childNodes;for (var d = 0; c && d < a.length; d++) c = c && Nb(a[d], b);return c;
    }return a.nodeType !== Node.ELEMENT_NODE ? !0 : c.currentScopeForNode(a) === b;
  }function Ob(a) {
    if (a.nodeType !== Node.ELEMENT_NODE) return "";var b = D();return b ? b.currentScopeForNode(a) : "";
  }
  function Pb(a, b) {
    if (a) {
      a.nodeType === Node.ELEMENT_NODE && b(a);a = a.__shady_childNodes;for (var c = 0, d; c < a.length; c++) d = a[c], d.nodeType === Node.ELEMENT_NODE && Pb(d, b);
    }
  };var Qb = window.document,
      Rb = t.da,
      Sb = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"),
      Tb = Sb && Sb.get;function Ub(a) {
    for (var b; b = a.__shady_firstChild;) a.__shady_removeChild(b);
  }function Vb(a) {
    var b = r(a);if (b && void 0 !== b.G) {
      b = a.__shady_childNodes;for (var c = 0, d = b.length, e = void 0; c < d && (e = b[c]); c++) Vb(e);
    }if (a = r(a)) a.G = void 0;
  }function Wb(a) {
    var b = a;a && "slot" === a.localName && (b = (b = (b = r(a)) && b.w) && b.length ? b[0] : Wb(a.__shady_nextSibling));return b;
  }
  function Xb(a, b, c) {
    if (a = (a = r(a)) && a.F) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Ca(a);
  }
  var Zb = z({ get parentNode() {
      var a = r(this);a = a && a.parentNode;return void 0 !== a ? a : this.__shady_native_parentNode;
    }, get firstChild() {
      var a = r(this);a = a && a.firstChild;return void 0 !== a ? a : this.__shady_native_firstChild;
    }, get lastChild() {
      var a = r(this);a = a && a.lastChild;return void 0 !== a ? a : this.__shady_native_lastChild;
    }, get nextSibling() {
      var a = r(this);a = a && a.nextSibling;return void 0 !== a ? a : this.__shady_native_nextSibling;
    }, get previousSibling() {
      var a = r(this);a = a && a.previousSibling;return void 0 !== a ? a : this.__shady_native_previousSibling;
    },
    get childNodes() {
      if (u(this)) {
        var a = r(this);if (!a.childNodes) {
          a.childNodes = [];for (var b = this.__shady_firstChild; b; b = b.__shady_nextSibling) a.childNodes.push(b);
        }var c = a.childNodes;
      } else c = this.__shady_native_childNodes;c.item = function (a) {
        return c[a];
      };return c;
    }, get parentElement() {
      var a = r(this);(a = a && a.parentNode) && a.nodeType !== Node.ELEMENT_NODE && (a = null);return void 0 !== a ? a : this.__shady_native_parentElement;
    }, get isConnected() {
      if (Tb && Tb.call(this)) return !0;if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1;
      var a = this.ownerDocument;if (ua) {
        if (a.__shady_native_contains(this)) return !0;
      } else if (a.documentElement && a.documentElement.__shady_native_contains(this)) return !0;for (a = this; a && !(a instanceof Document);) a = a.__shady_parentNode || (w(a) ? a.host : void 0);return !!(a && a instanceof Document);
    }, get textContent() {
      if (u(this)) {
        for (var a = [], b = 0, c = this.__shady_childNodes, d; d = c[b]; b++) d.nodeType !== Node.COMMENT_NODE && a.push(d.__shady_textContent);return a.join("");
      }return this.__shady_native_textContent;
    }, set textContent(a) {
      if ("undefined" === typeof a || null === a) a = "";switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
          if (!u(this) && t.j) {
            var b = this.__shady_firstChild;(b != this.__shady_lastChild || b && b.nodeType != Node.TEXT_NODE) && Ub(this);this.__shady_native_textContent = a;
          } else Ub(this), (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_insertBefore(document.createTextNode(a));break;default:
          this.nodeValue = a;}
    }, insertBefore: function (a, b) {
      if (this.ownerDocument !== Qb && a.ownerDocument !== Qb) return this.__shady_native_insertBefore(a, b), a;if (a === this) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if (b) {
        var c = r(b);c = c && c.parentNode;if (void 0 !== c && c !== this || void 0 === c && b.__shady_native_parentNode !== this) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
      }if (b === a) return a;var d = [],
          e = (c = E(this)) ? c.host.localName : Ob(this),
          f = a.__shady_parentNode;if (f) {
        var g = Ob(a);var h = !!c || !E(a) || Rb && void 0 !== this.__noInsertionPoint;f.__shady_removeChild(a, h);
      }f = !0;var k = (!Rb || void 0 === a.__noInsertionPoint && void 0 === this.__noInsertionPoint) && !Nb(a, e),
          l = c && !a.__noInsertionPoint && (!Rb || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE);if (l || k) k && (g = g || Ob(a)), Pb(a, function (a) {
        l && "slot" === a.localName && d.push(a);if (k) {
          var b = g;D() && (b && Mb(a, b), (b = D()) && b.scopeNode(a, e));
        }
      });if ("slot" === this.localName || d.length) d.length && (c.c = c.c || [], c.a = c.a || [], c.b = c.b || {}, c.c.push.apply(c.c, d instanceof Array ? d : ia(ha(d)))), c && F(c);u(this) && (Ib(a, this, b), c = r(this), na(this) ? (F(c.root), f = !1) : c.root && (f = !1));f ? (c = w(this) ? this.host : this, b ? (b = Wb(b), c.__shady_native_insertBefore(a, b)) : c.__shady_native_appendChild(a)) : a.ownerDocument !== this.ownerDocument && this.ownerDocument.adoptNode(a);Xb(this, a);return a;
    }, appendChild: function (a) {
      return this.__shady_insertBefore(a);
    }, removeChild: function (a, b) {
      b = void 0 === b ? !1 : b;if (this.ownerDocument !== Qb) return this.__shady_native_removeChild(a);if (a.__shady_parentNode !== this) throw Error("The node to be removed is not a child of this node: " + a);var c = E(a),
          d = c && Yb(c, a),
          e = r(this);if (u(this) && (Jb(a, this), na(this))) {
        F(e.root);var f = !0;
      }if (D() && !b && c) {
        var g = Ob(a);Pb(a, function (a) {
          Mb(a, g);
        });
      }Vb(a);c && ((b = this && "slot" === this.localName) && (f = !0), (d || b) && F(c));f || (f = w(this) ? this.host : this, (!e.root && "slot" !== a.localName || f === a.__shady_native_parentNode) && f.__shady_native_removeChild(a));Xb(this, null, a);return a;
    }, replaceChild: function (a, b) {
      this.__shady_insertBefore(a, b);this.__shady_removeChild(b);return a;
    }, cloneNode: function (a) {
      if ("template" == this.localName) return this.__shady_native_cloneNode(a);
      var b = this.__shady_native_cloneNode(!1);if (a && b.nodeType !== Node.ATTRIBUTE_NODE) {
        a = this.__shady_childNodes;for (var c = 0, d; c < a.length; c++) d = a[c].__shady_cloneNode(!0), b.__shady_appendChild(d);
      }return b;
    }, getRootNode: function (a) {
      if (this && this.nodeType) {
        var b = q(this),
            c = b.G;void 0 === c && (w(this) ? (c = this, b.G = c) : (c = (c = this.__shady_parentNode) ? c.__shady_getRootNode(a) : this, document.documentElement.__shady_native_contains(this) && (b.G = c)));return c;
      }
    }, contains: function (a) {
      return va(this, a);
    } });function $b(a, b, c) {
    var d = [];ac(a.__shady_childNodes, b, c, d);return d;
  }function ac(a, b, c, d) {
    for (var e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) {
      var h;if (h = g.nodeType === Node.ELEMENT_NODE) {
        h = g;var k = b,
            l = c,
            m = d,
            v = k(h);v && m.push(h);l && l(v) ? h = v : (ac(h.__shady_childNodes, k, l, m), h = void 0);
      }if (h) break;
    }
  }
  var G = z({ get firstElementChild() {
      var a = r(this);if (a && void 0 !== a.firstChild) {
        for (a = this.__shady_firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;return a;
      }return this.__shady_native_firstElementChild;
    }, get lastElementChild() {
      var a = r(this);if (a && void 0 !== a.lastChild) {
        for (a = this.__shady_lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;return a;
      }return this.__shady_native_lastElementChild;
    }, get children() {
      return u(this) ? wa(Array.prototype.filter.call(this.__shady_childNodes, function (a) {
        return a.nodeType === Node.ELEMENT_NODE;
      })) : this.__shady_native_children;
    }, get childElementCount() {
      var a = this.__shady_children;return a ? a.length : 0;
    } }),
      bc = z({ querySelector: function (a) {
      return $b(this, function (b) {
        return pa.call(b, a);
      }, function (a) {
        return !!a;
      })[0] || null;
    }, querySelectorAll: function (a, b) {
      if (b) {
        b = Array.prototype.slice.call(this.__shady_native_querySelectorAll(a));var c = this.__shady_getRootNode();return b.filter(function (a) {
          return a.__shady_getRootNode() == c;
        });
      }return $b(this, function (b) {
        return pa.call(b, a);
      });
    } }),
      cc = t.da && !t.D ? Object.assign({}, G) : G;Object.assign(G, bc);var dc = z({ getElementById: function (a) {
      return "" === a ? null : $b(this, function (b) {
        return b.id == a;
      }, function (a) {
        return !!a;
      })[0] || null;
    } });var ec = z({ get activeElement() {
      var a = t.j ? document.__shady_native_activeElement : document.activeElement;if (!a || !a.nodeType) return null;var b = !!w(this);if (!(this === document || b && this.host !== a && this.host.__shady_native_contains(a))) return null;for (b = E(a); b && b !== this;) a = b.host, b = E(a);return this === document ? b ? null : a : b === this ? a : null;
    } });var fc = document.implementation.createHTMLDocument("inert"),
      gc = z({ get innerHTML() {
      return u(this) ? Ma("template" === this.localName ? this.content : this, function (a) {
        return a.__shady_childNodes;
      }) : this.__shady_native_innerHTML;
    }, set innerHTML(a) {
      if ("template" === this.localName) this.__shady_native_innerHTML = a;else {
        Ub(this);var b = this.localName || "div";b = this.namespaceURI && this.namespaceURI !== fc.namespaceURI ? fc.createElementNS(this.namespaceURI, b) : fc.createElement(b);for (t.j ? b.__shady_native_innerHTML = a : b.innerHTML = a; a = b.__shady_firstChild;) this.__shady_insertBefore(a);
      }
    } });var hc = z({ addEventListener: function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.A = c.A || this;this.host.__shady_addEventListener(a, b, c);
    }, removeEventListener: function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.A = c.A || this;this.host.__shady_removeEventListener(a, b, c);
    } });function ic(a, b) {
    y(a, hc, b);y(a, ec, b);y(a, gc, b);y(a, G, b);t.D && !b ? (y(a, Zb, b), y(a, dc, b)) : t.j || (y(a, Za), y(a, Ya));
  };var jc = {},
      H = t.deferConnectionCallbacks && "loading" === document.readyState,
      kc;function lc(a) {
    var b = [];do b.unshift(a); while (a = a.__shady_parentNode);return b;
  }
  function mc(a, b, c) {
    if (a !== jc) throw new TypeError("Illegal constructor");this.na = "ShadyRoot";this.host = b;this.mode = c && c.mode;Kb(b);a = q(b);a.root = this;a.ea = "closed" !== this.mode ? this : null;a = q(this);a.firstChild = a.lastChild = a.parentNode = a.nextSibling = a.previousSibling = null;a.childNodes = [];this.V = this.v = !1;this.c = this.b = this.a = null;if (t.preferPerformance) for (; a = b.__shady_native_firstChild;) b.__shady_native_removeChild(a);else F(this);
  }function F(a) {
    a.v || (a.v = !0, za(function () {
      return nc(a);
    }));
  }
  function nc(a) {
    var b;if (b = a.v) {
      for (var c; a;) a: {
        a.v && (c = a), b = a;a = b.host.__shady_getRootNode();if (w(a) && (b = r(b.host)) && 0 < b.J) break a;a = void 0;
      }b = c;
    }(c = b) && c._renderSelf();
  }
  mc.prototype._renderSelf = function () {
    var a = H;H = !0;this.v = !1;if (this.a) {
      oc(this);for (var b = 0, c; b < this.a.length; b++) {
        c = this.a[b];var d = r(c),
            e = d.assignedNodes;d.assignedNodes = [];d.w = [];if (d.W = e) for (d = 0; d < e.length; d++) {
          var f = r(e[d]);f.L = f.assignedSlot;f.assignedSlot === c && (f.assignedSlot = null);
        }
      }for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) pc(this, b);for (b = 0; b < this.a.length; b++) {
        c = this.a[b];e = r(c);if (!e.assignedNodes.length) for (d = c.__shady_firstChild; d; d = d.__shady_nextSibling) pc(this, d, c);
        (d = (d = r(c.__shady_parentNode)) && d.root) && (oa(d) || d.v) && d._renderSelf();qc(this, e.w, e.assignedNodes);if (d = e.W) {
          for (f = 0; f < d.length; f++) r(d[f]).L = null;e.W = null;d.length > e.assignedNodes.length && (e.O = !0);
        }e.O && (e.O = !1, rc(this, c));
      }c = this.a;b = [];for (e = 0; e < c.length; e++) d = c[e].__shady_parentNode, (f = r(d)) && f.root || !(0 > b.indexOf(d)) || b.push(d);for (c = 0; c < b.length; c++) {
        f = b[c];e = f === this ? this.host : f;d = [];f = f.__shady_childNodes;for (var g = 0; g < f.length; g++) {
          var h = f[g];if ("slot" == h.localName) {
            h = r(h).w;for (var k = 0; k < h.length; k++) d.push(h[k]);
          } else d.push(h);
        }f = Array.prototype.slice.call(e.__shady_native_childNodes);g = Fb(d, d.length, f, f.length);k = h = 0;for (var l = void 0; h < g.length && (l = g[h]); h++) {
          for (var m = 0, v = void 0; m < l.H.length && (v = l.H[m]); m++) v.__shady_native_parentNode === e && e.__shady_native_removeChild(v), f.splice(l.index + k, 1);k -= l.M;
        }k = 0;for (l = void 0; k < g.length && (l = g[k]); k++) for (h = f[l.index], m = l.index; m < l.index + l.M; m++) v = d[m], e.__shady_native_insertBefore(v, h), f.splice(m, 0, v);
      }
    }if (!t.preferPerformance && !this.V) for (b = this.host.__shady_childNodes, c = 0, e = b.length; c < e; c++) d = b[c], f = r(d), d.__shady_native_parentNode !== this.host || "slot" !== d.localName && f.assignedSlot || this.host.__shady_native_removeChild(d);this.V = !0;H = a;kc && kc();
  };function pc(a, b, c) {
    var d = q(b),
        e = d.L;d.L = null;c || (c = (a = a.b[b.__shady_slot || "__catchall"]) && a[0]);c ? (q(c).assignedNodes.push(b), d.assignedSlot = c) : d.assignedSlot = void 0;e !== d.assignedSlot && d.assignedSlot && (q(d.assignedSlot).O = !0);
  }
  function qc(a, b, c) {
    for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
      var f = r(e).assignedNodes;f && f.length && qc(a, b, f);
    } else b.push(c[d]);
  }function rc(a, b) {
    b.__shady_native_dispatchEvent(new Event("slotchange"));b = r(b);b.assignedSlot && rc(a, b.assignedSlot);
  }
  function oc(a) {
    if (a.c && a.c.length) {
      for (var b = a.c, c, d = 0; d < b.length; d++) {
        var e = b[d];Kb(e);var f = e.__shady_parentNode;Kb(f);f = r(f);f.J = (f.J || 0) + 1;f = sc(e);a.b[f] ? (c = c || {}, c[f] = !0, a.b[f].push(e)) : a.b[f] = [e];a.a.push(e);
      }if (c) for (var g in c) a.b[g] = tc(a.b[g]);a.c = [];
    }
  }function sc(a) {
    var b = a.name || a.getAttribute("name") || "__catchall";return a.la = b;
  }
  function tc(a) {
    return a.sort(function (a, c) {
      a = lc(a);for (var b = lc(c), e = 0; e < a.length; e++) {
        c = a[e];var f = b[e];if (c !== f) return a = Array.from(c.__shady_parentNode.__shady_childNodes), a.indexOf(c) - a.indexOf(f);
      }
    });
  }
  function Yb(a, b) {
    if (a.a) {
      oc(a);var c = a.b,
          d;for (d in c) for (var e = c[d], f = 0; f < e.length; f++) {
        var g = e[f];if (va(b, g)) {
          e.splice(f, 1);var h = a.a.indexOf(g);0 <= h && (a.a.splice(h, 1), (h = r(g.__shady_parentNode)) && h.J && h.J--);f--;g = r(g);if (h = g.w) for (var k = 0; k < h.length; k++) {
            var l = h[k],
                m = l.__shady_native_parentNode;m && m.__shady_native_removeChild(l);
          }g.w = [];g.assignedNodes = [];h = !0;
        }
      }return h;
    }
  }function oa(a) {
    oc(a);return !(!a.a || !a.a.length);
  }
  (function (a) {
    a.__proto__ = DocumentFragment.prototype;ic(a, "__shady_");ic(a);Object.defineProperties(a, { nodeType: { value: Node.DOCUMENT_FRAGMENT_NODE, configurable: !0 }, nodeName: { value: "#document-fragment", configurable: !0 }, nodeValue: { value: null, configurable: !0 } });["localName", "namespaceURI", "prefix"].forEach(function (b) {
      Object.defineProperty(a, b, { value: void 0, configurable: !0 });
    });["ownerDocument", "baseURI", "isConnected"].forEach(function (b) {
      Object.defineProperty(a, b, { get: function () {
          return this.host[b];
        },
        configurable: !0 });
    });
  })(mc.prototype);
  if (window.customElements && t.X && !t.preferPerformance) {
    var uc = new Map();kc = function () {
      var a = [];uc.forEach(function (b, c) {
        a.push([c, b]);
      });uc.clear();for (var b = 0; b < a.length; b++) {
        var c = a[b][0];a[b][1] ? c.ja() : c.ka();
      }
    };H && document.addEventListener("readystatechange", function () {
      H = !1;kc();
    }, { once: !0 });var vc = function (a, b, c) {
      var d = 0,
          e = "__isConnected" + d++;if (b || c) a.prototype.connectedCallback = a.prototype.ja = function () {
        H ? uc.set(this, !0) : this[e] || (this[e] = !0, b && b.call(this));
      }, a.prototype.disconnectedCallback = a.prototype.ka = function () {
        H ? this.isConnected || uc.set(this, !1) : this[e] && (this[e] = !1, c && c.call(this));
      };return a;
    },
        define = window.customElements.define;Object.defineProperty(window.CustomElementRegistry.prototype, "define", { value: function (a, b) {
        var c = b.prototype.connectedCallback,
            d = b.prototype.disconnectedCallback;define.call(window.customElements, a, vc(b, c, d));b.prototype.connectedCallback = c;b.prototype.disconnectedCallback = d;
      } });
  }function E(a) {
    a = a.__shady_getRootNode();if (w(a)) return a;
  };function I(a) {
    this.node = a;
  }n = I.prototype;n.addEventListener = function (a, b, c) {
    return this.node.__shady_addEventListener(a, b, c);
  };n.removeEventListener = function (a, b, c) {
    return this.node.__shady_removeEventListener(a, b, c);
  };n.appendChild = function (a) {
    return this.node.__shady_appendChild(a);
  };n.insertBefore = function (a, b) {
    return this.node.__shady_insertBefore(a, b);
  };n.removeChild = function (a) {
    return this.node.__shady_removeChild(a);
  };n.replaceChild = function (a, b) {
    return this.node.__shady_replaceChild(a, b);
  };
  n.cloneNode = function (a) {
    return this.node.__shady_cloneNode(a);
  };n.getRootNode = function (a) {
    return this.node.__shady_getRootNode(a);
  };n.contains = function (a) {
    return this.node.__shady_contains(a);
  };n.dispatchEvent = function (a) {
    return this.node.__shady_dispatchEvent(a);
  };n.setAttribute = function (a, b) {
    this.node.__shady_setAttribute(a, b);
  };n.getAttribute = function (a) {
    return this.node.__shady_native_getAttribute(a);
  };n.removeAttribute = function (a) {
    this.node.__shady_removeAttribute(a);
  };n.attachShadow = function (a) {
    return this.node.__shady_attachShadow(a);
  };
  n.focus = function () {
    this.node.__shady_native_focus();
  };n.blur = function () {
    this.node.__shady_blur();
  };n.importNode = function (a, b) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_importNode(a, b);
  };n.getElementById = function (a) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_getElementById(a);
  };n.querySelector = function (a) {
    return this.node.__shady_querySelector(a);
  };n.querySelectorAll = function (a, b) {
    return this.node.__shady_querySelectorAll(a, b);
  };
  n.assignedNodes = function (a) {
    if ("slot" === this.node.localName) return this.node.__shady_assignedNodes(a);
  };
  p.Object.defineProperties(I.prototype, { activeElement: { configurable: !0, enumerable: !0, get: function () {
        if (w(this.node) || this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_activeElement;
      } }, _activeElement: { configurable: !0, enumerable: !0, get: function () {
        return this.activeElement;
      } }, host: { configurable: !0, enumerable: !0, get: function () {
        if (w(this.node)) return this.node.host;
      } }, parentNode: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_parentNode;
      } }, firstChild: { configurable: !0, enumerable: !0,
      get: function () {
        return this.node.__shady_firstChild;
      } }, lastChild: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_lastChild;
      } }, nextSibling: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_nextSibling;
      } }, previousSibling: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_previousSibling;
      } }, childNodes: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_childNodes;
      } }, parentElement: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_parentElement;
      } },
    firstElementChild: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_firstElementChild;
      } }, lastElementChild: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_lastElementChild;
      } }, nextElementSibling: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_nextElementSibling;
      } }, previousElementSibling: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_previousElementSibling;
      } }, children: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_children;
      } },
    childElementCount: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_childElementCount;
      } }, shadowRoot: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_shadowRoot;
      } }, assignedSlot: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_assignedSlot;
      } }, isConnected: { configurable: !0, enumerable: !0, get: function () {
        return this.node.__shady_isConnected;
      } }, innerHTML: { configurable: !0, enumerable: !0, get: function () {
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
      } } });
  Db.forEach(function (a) {
    Object.defineProperty(I.prototype, a, { get: function () {
        return this.node["__shady_" + a];
      }, set: function (b) {
        this.node["__shady_" + a] = b;
      }, configurable: !0 });
  });var wc = new WeakMap();function xc(a) {
    if (w(a) || a instanceof I) return a;var b = wc.get(a);b || (b = new I(a), wc.set(a, b));return b;
  };var yc = z({ dispatchEvent: function (a) {
      Aa();return this.__shady_native_dispatchEvent(a);
    }, addEventListener: ub, removeEventListener: wb });var zc = z({ get assignedSlot() {
      var a = this.__shady_parentNode;(a = a && a.__shady_shadowRoot) && nc(a);return (a = r(this)) && a.assignedSlot || null;
    } });var Ac = window.document;function Bc(a, b) {
    if ("slot" === b) a = a.__shady_parentNode, na(a) && F(r(a).root);else if ("slot" === a.localName && "name" === b && (b = E(a))) {
      if (b.a) {
        oc(b);var c = a.la,
            d = sc(a);if (d !== c) {
          c = b.b[c];var e = c.indexOf(a);0 <= e && c.splice(e, 1);c = b.b[d] || (b.b[d] = []);c.push(a);1 < c.length && (b.b[d] = tc(c));
        }
      }F(b);
    }
  }
  var Cc = z({ get previousElementSibling() {
      var a = r(this);if (a && void 0 !== a.previousSibling) {
        for (a = this.__shady_previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;return a;
      }return this.__shady_native_previousElementSibling;
    }, get nextElementSibling() {
      var a = r(this);if (a && void 0 !== a.nextSibling) {
        for (a = this.__shady_nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;return a;
      }return this.__shady_native_nextElementSibling;
    }, get slot() {
      return this.getAttribute("slot");
    },
    set slot(a) {
      this.__shady_setAttribute("slot", a);
    }, get shadowRoot() {
      var a = r(this);return a && a.ea || null;
    }, get className() {
      return this.getAttribute("class") || "";
    }, set className(a) {
      this.__shady_setAttribute("class", a);
    }, setAttribute: function (a, b) {
      if (this.ownerDocument !== Ac) this.__shady_native_setAttribute(a, b);else {
        var c;(c = D()) && "class" === a ? (c.setElementClass(this, b), c = !0) : c = !1;c || (this.__shady_native_setAttribute(a, b), Bc(this, a));
      }
    }, removeAttribute: function (a) {
      this.__shady_native_removeAttribute(a);Bc(this, a);
    }, attachShadow: function (a) {
      if (!this) throw Error("Must provide a host.");if (!a) throw Error("Not enough arguments.");return new mc(jc, this, a);
    } });var Dc = z({ blur: function () {
      var a = r(this);(a = (a = a && a.root) && a.activeElement) ? a.__shady_blur() : this.__shady_native_blur();
    } });Db.forEach(function (a) {
    Dc[a] = { set: function (b) {
        var c = q(this),
            d = a.substring(2);c.K[a] && this.removeEventListener(d, c.K[a]);this.__shady_addEventListener(d, b);c.K[a] = b;
      }, get: function () {
        var b = r(this);return b && b.K[a];
      }, configurable: !0 };
  });var Ec = z({ assignedNodes: function (a) {
      if ("slot" === this.localName) {
        var b = this.__shady_getRootNode();b && w(b) && nc(b);return (b = r(this)) ? (a && a.flatten ? b.w : b.assignedNodes) || [] : [];
      }
    }, addEventListener: function (a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) ub.call(this, a, b, c);else {
        "object" !== typeof c && (c = { capture: !!c });var d = this.__shady_parentNode;if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");c.A = this;d.__shady_addEventListener(a, b, c);
      }
    }, removeEventListener: function (a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) wb.call(this, a, b, c);else {
        "object" !== typeof c && (c = { capture: !!c });var d = this.__shady_parentNode;if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");c.A = this;d.__shady_removeEventListener(a, b, c);
      }
    } });var Fc = window.document,
      Gc = z({ importNode: function (a, b) {
      if (a.ownerDocument !== Fc || "template" === a.localName) return this.__shady_native_importNode(a, b);var c = this.__shady_native_importNode(a, !1);if (b) {
        a = a.__shady_childNodes;b = 0;for (var d; b < a.length; b++) d = this.__shady_importNode(a[b], !0), c.__shady_appendChild(d);
      }return c;
    } });var Hc = z({ addEventListener: ub.bind(window), removeEventListener: wb.bind(window) });var J = {};Object.getOwnPropertyDescriptor(HTMLElement.prototype, "parentElement") && (J.parentElement = Zb.parentElement);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "contains") && (J.contains = Zb.contains);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && (J.children = G.children);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && (J.innerHTML = gc.innerHTML);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className") && (J.className = Cc.className);
  var Ic = { EventTarget: [yc], Node: [Zb, window.EventTarget ? null : yc], Text: [zc], Element: [Cc, G, zc, !t.j || "innerHTML" in Element.prototype ? gc : null, window.HTMLSlotElement ? null : Ec], HTMLElement: [Dc, J], HTMLSlotElement: [Ec], DocumentFragment: [cc, dc], Document: [Gc, cc, dc, ec], Window: [Hc] },
      Jc = t.j ? null : ["innerHTML", "textContent"];function Kc(a) {
    var b = a ? null : Jc,
        c = {},
        d;for (d in Ic) c.S = window[d] && window[d].prototype, Ic[d].forEach(function (c) {
      return function (d) {
        return c.S && d && y(c.S, d, a, b);
      };
    }(c)), c = { S: c.S };
  };if (t.X) {
    var ShadyDOM = { inUse: t.X, patch: function (a) {
        db(a);cb(a);return a;
      }, isShadyRoot: w, enqueue: za, flush: Aa, flushInitial: function (a) {
        !a.V && a.v && nc(a);
      }, settings: t, filterMutations: Fa, observeChildren: Da, unobserveChildren: Ea, deferConnectionCallbacks: t.deferConnectionCallbacks, preferPerformance: t.preferPerformance, handlesDynamicScoping: !0, wrap: t.D ? xc : function (a) {
        return a;
      }, Wrapper: I, composedPath: mb, noPatch: t.D, nativeMethods: Oa, nativeTree: Pa };window.ShadyDOM = ShadyDOM;Xa();Kc("__shady_");Object.defineProperty(document, "_activeElement", ec.activeElement);y(Window.prototype, Hc, "__shady_");t.D || (Kc(), Cb());xb();window.Event = zb;window.CustomEvent = Ab;window.MouseEvent = Bb;window.ShadowRoot = mc;
  }; /*
     Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
  var Lc = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function Mc(a) {
    var b = Lc.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
  }function K(a) {
    var b = a.isConnected;if (void 0 !== b) return b;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
  }
  function Nc(a, b) {
    for (; b && b !== a && !b.nextSibling;) b = b.parentNode;return b && b !== a ? b.nextSibling : null;
  }
  function L(a, b, c) {
    c = void 0 === c ? new Set() : c;for (var d = a; d;) {
      if (d.nodeType === Node.ELEMENT_NODE) {
        var e = d;b(e);var f = e.localName;if ("link" === f && "import" === e.getAttribute("rel")) {
          d = e.import;if (d instanceof Node && !c.has(d)) for (c.add(d), d = d.firstChild; d; d = d.nextSibling) L(d, b, c);d = Nc(a, e);continue;
        } else if ("template" === f) {
          d = Nc(a, e);continue;
        }if (e = e.__CE_shadowRoot) for (e = e.firstChild; e; e = e.nextSibling) L(e, b, c);
      }d = d.firstChild ? d.firstChild : Nc(a, d);
    }
  }function M(a, b, c) {
    a[b] = c;
  };function Oc() {
    this.a = new Map();this.i = new Map();this.f = [];this.c = !1;
  }function Pc(a, b, c) {
    a.a.set(b, c);a.i.set(c.constructorFunction, c);
  }function Qc(a, b) {
    a.c = !0;a.f.push(b);
  }function Rc(a, b) {
    a.c && L(b, function (b) {
      return a.b(b);
    });
  }Oc.prototype.b = function (a) {
    if (this.c && !a.__CE_patched) {
      a.__CE_patched = !0;for (var b = 0; b < this.f.length; b++) this.f[b](a);
    }
  };function N(a, b) {
    var c = [];L(b, function (a) {
      return c.push(a);
    });for (b = 0; b < c.length; b++) {
      var d = c[b];1 === d.__CE_state ? a.connectedCallback(d) : Sc(a, d);
    }
  }
  function O(a, b) {
    var c = [];L(b, function (a) {
      return c.push(a);
    });for (b = 0; b < c.length; b++) {
      var d = c[b];1 === d.__CE_state && a.disconnectedCallback(d);
    }
  }
  function P(a, b, c) {
    c = void 0 === c ? {} : c;var d = c.Fa || new Set(),
        e = c.T || function (b) {
      return Sc(a, b);
    },
        f = [];L(b, function (b) {
      if ("link" === b.localName && "import" === b.getAttribute("rel")) {
        var c = b.import;c instanceof Node && (c.__CE_isImportDocument = !0, c.__CE_hasRegistry = !0);c && "complete" === c.readyState ? c.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () {
          var c = b.import;if (!c.__CE_documentLoadHandled) {
            c.__CE_documentLoadHandled = !0;var f = new Set(d);f.delete(c);P(a, c, { Fa: f, T: e });
          }
        });
      } else f.push(b);
    }, d);if (a.c) for (b = 0; b < f.length; b++) a.b(f[b]);for (b = 0; b < f.length; b++) e(f[b]);
  }
  function Sc(a, b) {
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
  }Oc.prototype.connectedCallback = function (a) {
    var b = a.__CE_definition;b.connectedCallback && b.connectedCallback.call(a);
  };Oc.prototype.disconnectedCallback = function (a) {
    var b = a.__CE_definition;b.disconnectedCallback && b.disconnectedCallback.call(a);
  };
  Oc.prototype.attributeChangedCallback = function (a, b, c, d, e) {
    var f = a.__CE_definition;f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, c, d, e);
  };function Tc(a) {
    var b = document;this.b = a;this.a = b;this.B = void 0;P(this.b, this.a);"loading" === this.a.readyState && (this.B = new MutationObserver(this.c.bind(this)), this.B.observe(this.a, { childList: !0, subtree: !0 }));
  }function Uc(a) {
    a.B && a.B.disconnect();
  }Tc.prototype.c = function (a) {
    var b = this.a.readyState;"interactive" !== b && "complete" !== b || Uc(this);for (b = 0; b < a.length; b++) for (var c = a[b].addedNodes, d = 0; d < c.length; d++) P(this.b, c[d]);
  };function Vc() {
    var a = this;this.b = this.a = void 0;this.c = new Promise(function (b) {
      a.b = b;a.a && b(a.a);
    });
  }function Wc(a) {
    if (a.a) throw Error("Already resolved.");a.a = void 0;a.b && a.b(void 0);
  };function Q(a) {
    this.c = !1;this.a = a;this.C = new Map();this.f = function (a) {
      return a();
    };this.b = !1;this.i = [];this.va = new Tc(a);
  }n = Q.prototype;
  n.ha = function (a, b) {
    var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");if (!Mc(a)) throw new SyntaxError("The element name '" + a + "' is not valid.");if (this.a.a.get(a)) throw Error("A custom element with name '" + a + "' has already been defined.");if (this.c) throw Error("A custom element is already being defined.");this.c = !0;try {
      var d = function (a) {
        var b = e[a];if (void 0 !== b && !(b instanceof Function)) throw Error("The '" + a + "' callback must be a function.");
        return b;
      },
          e = b.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var f = d("connectedCallback");var g = d("disconnectedCallback");var h = d("adoptedCallback");var k = d("attributeChangedCallback");var l = b.observedAttributes || [];
    } catch (m) {
      return;
    } finally {
      this.c = !1;
    }b = { localName: a, constructorFunction: b, connectedCallback: f, disconnectedCallback: g, adoptedCallback: h, attributeChangedCallback: k, observedAttributes: l, constructionStack: [] };Pc(this.a, a, b);this.i.push(b);this.b || (this.b = !0, this.f(function () {
      return Xc(c);
    }));
  };n.T = function (a) {
    P(this.a, a);
  };
  function Xc(a) {
    if (!1 !== a.b) {
      a.b = !1;for (var b = a.i, c = [], d = new Map(), e = 0; e < b.length; e++) d.set(b[e].localName, []);P(a.a, document, { T: function (b) {
          if (void 0 === b.__CE_state) {
            var e = b.localName,
                f = d.get(e);f ? f.push(b) : a.a.a.get(e) && c.push(b);
          }
        } });for (e = 0; e < c.length; e++) Sc(a.a, c[e]);for (; 0 < b.length;) {
        var f = b.shift();e = f.localName;f = d.get(f.localName);for (var g = 0; g < f.length; g++) Sc(a.a, f[g]);(e = a.C.get(e)) && Wc(e);
      }
    }
  }n.get = function (a) {
    if (a = this.a.a.get(a)) return a.constructorFunction;
  };
  n.ia = function (a) {
    if (!Mc(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.C.get(a);if (b) return b.c;b = new Vc();this.C.set(a, b);this.a.a.get(a) && !this.i.some(function (b) {
      return b.localName === a;
    }) && Wc(b);return b.c;
  };n.xa = function (a) {
    Uc(this.va);var b = this.f;this.f = function (c) {
      return a(function () {
        return b(c);
      });
    };
  };window.CustomElementRegistry = Q;Q.prototype.define = Q.prototype.ha;Q.prototype.upgrade = Q.prototype.T;Q.prototype.get = Q.prototype.get;
  Q.prototype.whenDefined = Q.prototype.ia;Q.prototype.polyfillWrapFlushCallback = Q.prototype.xa;var Yc = window.Document.prototype.createElement,
      Zc = window.Document.prototype.createElementNS,
      $c = window.Document.prototype.importNode,
      ad = window.Document.prototype.prepend,
      bd = window.Document.prototype.append,
      cd = window.DocumentFragment.prototype.prepend,
      dd = window.DocumentFragment.prototype.append,
      ed = window.Node.prototype.cloneNode,
      fd = window.Node.prototype.appendChild,
      gd = window.Node.prototype.insertBefore,
      hd = window.Node.prototype.removeChild,
      id = window.Node.prototype.replaceChild,
      jd = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
      kd = window.Element.prototype.attachShadow,
      ld = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
      md = window.Element.prototype.getAttribute,
      nd = window.Element.prototype.setAttribute,
      od = window.Element.prototype.removeAttribute,
      pd = window.Element.prototype.getAttributeNS,
      qd = window.Element.prototype.setAttributeNS,
      rd = window.Element.prototype.removeAttributeNS,
      sd = window.Element.prototype.insertAdjacentElement,
      td = window.Element.prototype.insertAdjacentHTML,
      ud = window.Element.prototype.prepend,
      vd = window.Element.prototype.append,
      wd = window.Element.prototype.before,
      xd = window.Element.prototype.after,
      yd = window.Element.prototype.replaceWith,
      zd = window.Element.prototype.remove,
      Ad = window.HTMLElement,
      Bd = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
      Cd = window.HTMLElement.prototype.insertAdjacentElement,
      Dd = window.HTMLElement.prototype.insertAdjacentHTML;var Ed = new function () {}();function Fd() {
    var a = Gd;window.HTMLElement = function () {
      function b() {
        var b = this.constructor,
            d = a.i.get(b);if (!d) throw Error("The custom element being constructed was not registered with `customElements`.");var e = d.constructionStack;if (0 === e.length) return e = Yc.call(document, d.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = d, a.b(e), e;d = e.length - 1;var f = e[d];if (f === Ed) throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
        e[d] = Ed;Object.setPrototypeOf(f, b.prototype);a.b(f);return f;
      }b.prototype = Ad.prototype;Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });return b;
    }();
  };function Hd(a, b, c) {
    function d(b) {
      return function (c) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];e = [];for (var f = [], l = 0; l < d.length; l++) {
          var m = d[l];m instanceof Element && K(m) && f.push(m);if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) e.push(m);else e.push(m);
        }b.apply(this, d);for (d = 0; d < f.length; d++) O(a, f[d]);if (K(this)) for (d = 0; d < e.length; d++) f = e[d], f instanceof Element && N(a, f);
      };
    }void 0 !== c.R && (b.prepend = d(c.R));void 0 !== c.append && (b.append = d(c.append));
  };function Id() {
    var a = Gd;M(Document.prototype, "createElement", function (b) {
      if (this.__CE_hasRegistry) {
        var c = a.a.get(b);if (c) return new c.constructorFunction();
      }b = Yc.call(this, b);a.b(b);return b;
    });M(Document.prototype, "importNode", function (b, c) {
      b = $c.call(this, b, !!c);this.__CE_hasRegistry ? P(a, b) : Rc(a, b);return b;
    });M(Document.prototype, "createElementNS", function (b, c) {
      if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
        var d = a.a.get(c);if (d) return new d.constructorFunction();
      }b = Zc.call(this, b, c);a.b(b);return b;
    });Hd(a, Document.prototype, { R: ad, append: bd });
  };function Jd() {
    function a(a, d) {
      Object.defineProperty(a, "textContent", { enumerable: d.enumerable, configurable: !0, get: d.get, set: function (a) {
          if (this.nodeType === Node.TEXT_NODE) d.set.call(this, a);else {
            var c = void 0;if (this.firstChild) {
              var e = this.childNodes,
                  h = e.length;if (0 < h && K(this)) {
                c = Array(h);for (var k = 0; k < h; k++) c[k] = e[k];
              }
            }d.set.call(this, a);if (c) for (a = 0; a < c.length; a++) O(b, c[a]);
          }
        } });
    }var b = Gd;M(Node.prototype, "insertBefore", function (a, d) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);
        a = gd.call(this, a, d);if (K(this)) for (d = 0; d < c.length; d++) N(b, c[d]);return a;
      }c = K(a);d = gd.call(this, a, d);c && O(b, a);K(this) && N(b, a);return d;
    });M(Node.prototype, "appendChild", function (a) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);a = fd.call(this, a);if (K(this)) for (var e = 0; e < c.length; e++) N(b, c[e]);return a;
      }c = K(a);e = fd.call(this, a);c && O(b, a);K(this) && N(b, a);return e;
    });M(Node.prototype, "cloneNode", function (a) {
      a = ed.call(this, !!a);this.ownerDocument.__CE_hasRegistry ? P(b, a) : Rc(b, a);return a;
    });M(Node.prototype, "removeChild", function (a) {
      var c = K(a),
          e = hd.call(this, a);c && O(b, a);return e;
    });M(Node.prototype, "replaceChild", function (a, d) {
      if (a instanceof DocumentFragment) {
        var c = Array.prototype.slice.apply(a.childNodes);a = id.call(this, a, d);if (K(this)) for (O(b, d), d = 0; d < c.length; d++) N(b, c[d]);return a;
      }c = K(a);var f = id.call(this, a, d),
          g = K(this);g && O(b, d);c && O(b, a);g && N(b, a);return f;
    });jd && jd.get ? a(Node.prototype, jd) : Qc(b, function (b) {
      a(b, { enumerable: !0, configurable: !0, get: function () {
          for (var a = [], b = 0; b < this.childNodes.length; b++) a.push(this.childNodes[b].textContent);return a.join("");
        }, set: function (a) {
          for (; this.firstChild;) hd.call(this, this.firstChild);fd.call(this, document.createTextNode(a));
        } });
    });
  };function Kd(a) {
    function b(b) {
      return function (c) {
        for (var d = [], e = 0; e < arguments.length; ++e) d[e] = arguments[e];e = [];for (var h = [], k = 0; k < d.length; k++) {
          var l = d[k];l instanceof Element && K(l) && h.push(l);if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) e.push(l);else e.push(l);
        }b.apply(this, d);for (d = 0; d < h.length; d++) O(a, h[d]);if (K(this)) for (d = 0; d < e.length; d++) h = e[d], h instanceof Element && N(a, h);
      };
    }var c = Element.prototype;void 0 !== wd && (c.before = b(wd));void 0 !== wd && (c.after = b(xd));void 0 !== yd && M(c, "replaceWith", function (b) {
      for (var c = [], d = 0; d < arguments.length; ++d) c[d] = arguments[d];d = [];for (var g = [], h = 0; h < c.length; h++) {
        var k = c[h];k instanceof Element && K(k) && g.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) d.push(k);else d.push(k);
      }h = K(this);yd.apply(this, c);for (c = 0; c < g.length; c++) O(a, g[c]);if (h) for (O(a, this), c = 0; c < d.length; c++) g = d[c], g instanceof Element && N(a, g);
    });void 0 !== zd && M(c, "remove", function () {
      var b = K(this);zd.call(this);b && O(a, this);
    });
  };function Ld() {
    function a(a, b) {
      Object.defineProperty(a, "innerHTML", { enumerable: b.enumerable, configurable: !0, get: b.get, set: function (a) {
          var c = this,
              e = void 0;K(this) && (e = [], L(this, function (a) {
            a !== c && e.push(a);
          }));b.set.call(this, a);if (e) for (var f = 0; f < e.length; f++) {
            var g = e[f];1 === g.__CE_state && d.disconnectedCallback(g);
          }this.ownerDocument.__CE_hasRegistry ? P(d, this) : Rc(d, this);return a;
        } });
    }function b(a, b) {
      M(a, "insertAdjacentElement", function (a, c) {
        var e = K(c);a = b.call(this, a, c);e && O(d, c);K(a) && N(d, c);return a;
      });
    }
    function c(a, b) {
      function c(a, b) {
        for (var c = []; a !== b; a = a.nextSibling) c.push(a);for (b = 0; b < c.length; b++) P(d, c[b]);
      }M(a, "insertAdjacentHTML", function (a, d) {
        a = a.toLowerCase();if ("beforebegin" === a) {
          var e = this.previousSibling;b.call(this, a, d);c(e || this.parentNode.firstChild, this);
        } else if ("afterbegin" === a) e = this.firstChild, b.call(this, a, d), c(this.firstChild, e);else if ("beforeend" === a) e = this.lastChild, b.call(this, a, d), c(e || this.firstChild, null);else if ("afterend" === a) e = this.nextSibling, b.call(this, a, d), c(this.nextSibling, e);else throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
      });
    }var d = Gd;kd && M(Element.prototype, "attachShadow", function (a) {
      return this.__CE_shadowRoot = a = kd.call(this, a);
    });ld && ld.get ? a(Element.prototype, ld) : Bd && Bd.get ? a(HTMLElement.prototype, Bd) : Qc(d, function (b) {
      a(b, { enumerable: !0, configurable: !0, get: function () {
          return ed.call(this, !0).innerHTML;
        }, set: function (a) {
          var b = "template" === this.localName,
              c = b ? this.content : this,
              d = Zc.call(document, this.namespaceURI, this.localName);for (d.innerHTML = a; 0 < c.childNodes.length;) hd.call(c, c.childNodes[0]);for (a = b ? d.content : d; 0 < a.childNodes.length;) fd.call(c, a.childNodes[0]);
        } });
    });M(Element.prototype, "setAttribute", function (a, b) {
      if (1 !== this.__CE_state) return nd.call(this, a, b);var c = md.call(this, a);nd.call(this, a, b);b = md.call(this, a);d.attributeChangedCallback(this, a, c, b, null);
    });M(Element.prototype, "setAttributeNS", function (a, b, c) {
      if (1 !== this.__CE_state) return qd.call(this, a, b, c);var e = pd.call(this, a, b);qd.call(this, a, b, c);c = pd.call(this, a, b);d.attributeChangedCallback(this, b, e, c, a);
    });M(Element.prototype, "removeAttribute", function (a) {
      if (1 !== this.__CE_state) return od.call(this, a);var b = md.call(this, a);od.call(this, a);null !== b && d.attributeChangedCallback(this, a, b, null, null);
    });M(Element.prototype, "removeAttributeNS", function (a, b) {
      if (1 !== this.__CE_state) return rd.call(this, a, b);var c = pd.call(this, a, b);rd.call(this, a, b);var e = pd.call(this, a, b);c !== e && d.attributeChangedCallback(this, b, c, e, a);
    });Cd ? b(HTMLElement.prototype, Cd) : sd ? b(Element.prototype, sd) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");Dd ? c(HTMLElement.prototype, Dd) : td ? c(Element.prototype, td) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Hd(d, Element.prototype, { R: ud, append: vd });Kd(d);
  };var Md = window.customElements;if (!Md || Md.forcePolyfill || "function" != typeof Md.define || "function" != typeof Md.get) {
    var Gd = new Oc();Fd();Id();Hd(Gd, DocumentFragment.prototype, { R: cd, append: dd });Jd();Ld();document.__CE_hasRegistry = !0;var customElements = new Q(Gd);Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
  }; /*
     Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
  function Nd() {
    this.end = this.start = 0;this.rules = this.parent = this.previous = null;this.cssText = this.parsedCssText = "";this.atRule = !1;this.type = 0;this.parsedSelector = this.selector = this.keyframesName = "";
  }
  function Od(a) {
    a = a.replace(Pd, "").replace(Qd, "");var b = Rd,
        c = a,
        d = new Nd();d.start = 0;d.end = c.length;for (var e = d, f = 0, g = c.length; f < g; f++) if ("{" === c[f]) {
      e.rules || (e.rules = []);var h = e,
          k = h.rules[h.rules.length - 1] || null;e = new Nd();e.start = f + 1;e.parent = h;e.previous = k;h.rules.push(e);
    } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);return b(d, a);
  }
  function Rd(a, b) {
    var c = b.substring(a.start, a.end - 1);a.parsedCssText = a.cssText = c.trim();a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = Sd(c), c = c.replace(Td, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = Ud : c.match(Vd) && (a.type = Wd, a.keyframesName = a.selector.split(Td).pop()) : a.type = 0 === c.indexOf("--") ? Xd : Yd);if (c = a.rules) for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++) Rd(f, b);return a;
  }function Sd(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
      a = c;for (c = 6 - a.length; c--;) a = "0" + a;return "\\" + a;
    });
  }
  function Zd(a, b, c) {
    c = void 0 === c ? "" : c;var d = "";if (a.cssText || a.rules) {
      var e = a.rules,
          f;if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));if (f) {
        f = 0;for (var g = e.length, h = void 0; f < g && (h = e[f]); f++) d = Zd(h, b, d);
      } else b ? b = a.cssText : (b = a.cssText, b = b.replace($d, "").replace(ae, ""), b = b.replace(be, "").replace(ce, "")), (d = b.trim()) && (d = "  " + d + "\n");
    }d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));return c;
  }
  var Yd = 1,
      Wd = 7,
      Ud = 4,
      Xd = 1E3,
      Pd = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
      Qd = /@import[^;]*;/gim,
      $d = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      ae = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      be = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      ce = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      Vd = /^@[^\s]*keyframes/,
      Td = /\s+/g;var R = !(window.ShadyDOM && window.ShadyDOM.inUse),
      de;function ee(a) {
    de = a && a.shimcssproperties ? !1 : R || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"));
  }var fe;window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (fe = window.ShadyCSS.cssBuild);var ge = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? de = window.ShadyCSS.nativeCss : window.ShadyCSS ? (ee(window.ShadyCSS), window.ShadyCSS = void 0) : ee(window.WebComponents && window.WebComponents.flags);var S = de,
      he = fe;var ie = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
      je = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
      ke = /(--[\w-]+)\s*([:,;)]|$)/gi,
      le = /(animation\s*:)|(animation-name\s*:)/,
      me = /@media\s(.*)/,
      ne = /\{[^}]*\}/g;var oe = new Set();function pe(a, b) {
    if (!a) return "";"string" === typeof a && (a = Od(a));b && qe(a, b);return Zd(a, S);
  }function re(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = Od(a.textContent));return a.__cssRules || null;
  }function se(a) {
    return !!a.parent && a.parent.type === Wd;
  }function qe(a, b, c, d) {
    if (a) {
      var e = !1,
          f = a.type;if (d && f === Ud) {
        var g = a.selector.match(me);g && (window.matchMedia(g[1]).matches || (e = !0));
      }f === Yd ? b(a) : c && f === Wd ? c(a) : f === Xd && (e = !0);if ((a = a.rules) && !e) for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) qe(g, b, c, d);
    }
  }
  function te(a, b, c, d) {
    var e = document.createElement("style");b && e.setAttribute("scope", b);e.textContent = a;ue(e, c, d);return e;
  }var T = null;function ve(a) {
    a = document.createComment(" Shady DOM styles for " + a + " ");var b = document.head;b.insertBefore(a, (T ? T.nextSibling : null) || b.firstChild);return T = a;
  }function ue(a, b, c) {
    b = b || document.head;b.insertBefore(a, c && c.nextSibling || b.firstChild);T ? a.compareDocumentPosition(T) === Node.DOCUMENT_POSITION_PRECEDING && (T = a) : T = a;
  }
  function we(a, b) {
    for (var c = 0, d = a.length; b < d; b++) if ("(" === a[b]) c++;else if (")" === a[b] && 0 === --c) return b;return -1;
  }function xe(a, b) {
    var c = a.indexOf("var(");if (-1 === c) return b(a, "", "", "");var d = we(a, c + 3),
        e = a.substring(c + 4, d);c = a.substring(0, c);a = xe(a.substring(d + 1), b);d = e.indexOf(",");return -1 === d ? b(c, e.trim(), "", a) : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a);
  }function ye(a, b) {
    R ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
  }
  var ze = window.ShadyDOM && window.ShadyDOM.wrap || function (a) {
    return a;
  };function U(a) {
    var b = a.localName,
        c = "";b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);return { is: b, I: c };
  }function Ae(a) {
    for (var b = [], c = "", d = 0; 0 <= d && d < a.length; d++) if ("(" === a[d]) {
      var e = we(a, d);c += a.slice(d, e + 1);d = e;
    } else "," === a[d] ? (b.push(c), c = "") : c += a[d];c && b.push(c);return b;
  }
  function Be(a) {
    if (void 0 !== he) return he;if (void 0 === a.__cssBuild) {
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
  function Ce(a) {
    a = void 0 === a ? "" : a;return "" !== a && S ? R ? "shadow" === a : "shady" === a : !1;
  };function De() {}function Ee(a, b) {
    Fe(V, a, function (a) {
      W(a, b || "");
    });
  }function Fe(a, b, c) {
    b.nodeType === Node.ELEMENT_NODE && c(b);var d;"template" === b.localName ? d = (b.content || b._content || b).childNodes : d = b.children || b.childNodes;if (d) for (b = 0; b < d.length; b++) Fe(a, d[b], c);
  }
  function W(a, b, c) {
    if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b));else if (a.getAttribute) {
      var d = a.getAttribute("class");c ? d && (b = d.replace("style-scope", "").replace(b, ""), ye(a, b)) : ye(a, (d ? d + " " : "") + "style-scope " + b);
    }
  }function Ge(a, b, c) {
    Fe(V, a, function (a) {
      W(a, b, !0);W(a, c);
    });
  }function He(a, b) {
    Fe(V, a, function (a) {
      W(a, b || "", !0);
    });
  }
  function Ie(a, b, c, d, e) {
    var f = V;e = void 0 === e ? "" : e;"" === e && (R || "shady" === (void 0 === d ? "" : d) ? e = pe(b, c) : (a = U(a), e = Je(f, b, a.is, a.I, c) + "\n\n"));return e.trim();
  }function Je(a, b, c, d, e) {
    var f = Ke(c, d);c = c ? "." + c : "";return pe(b, function (b) {
      b.c || (b.selector = b.h = Le(a, b, a.b, c, f), b.c = !0);e && e(b, c, f);
    });
  }function Ke(a, b) {
    return b ? "[is=" + a + "]" : a;
  }
  function Le(a, b, c, d, e) {
    var f = Ae(b.selector);if (!se(b)) {
      b = 0;for (var g = f.length, h = void 0; b < g && (h = f[b]); b++) f[b] = c.call(a, h, d, e);
    }return f.filter(function (a) {
      return !!a;
    }).join(",");
  }function Me(a) {
    return a.replace(Ne, function (a, c, d) {
      -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));return ":" + c + "(" + d + ")";
    });
  }
  function Oe(a) {
    for (var b = [], c; c = a.match(Pe);) {
      var d = c.index,
          e = we(a, d);if (-1 === e) throw Error(c.input + " selector missing ')'");c = a.slice(d, e + 1);a = a.replace(c, "\ue000");b.push(c);
    }return { Z: a, matches: b };
  }function Qe(a, b) {
    var c = a.split("\ue000");return b.reduce(function (a, b, f) {
      return a + b + c[f + 1];
    }, c[0]);
  }
  De.prototype.b = function (a, b, c) {
    var d = !1;a = a.trim();var e = Ne.test(a);e && (a = a.replace(Ne, function (a, b, c) {
      return ":" + b + "(" + c.replace(/\s/g, "") + ")";
    }), a = Me(a));var f = Pe.test(a);if (f) {
      var g = Oe(a);a = g.Z;g = g.matches;
    }a = a.replace(Re, ":host $1");a = a.replace(Se, function (a, e, f) {
      d || (a = Te(f, e, b, c), d = d || a.stop, e = a.qa, f = a.value);return e + f;
    });f && (a = Qe(a, g));e && (a = Me(a));return a = a.replace(Ue, function (a, b, c, d) {
      return '[dir="' + c + '"] ' + b + d + ", " + b + '[dir="' + c + '"]' + d;
    });
  };
  function Te(a, b, c, d) {
    var e = a.indexOf("::slotted");0 <= a.indexOf(":host") ? a = Ve(a, d) : 0 !== e && (a = c ? We(a, c) : a);c = !1;0 <= e && (b = "", c = !0);if (c) {
      var f = !0;c && (a = a.replace(Xe, function (a, b) {
        return " > " + b;
      }));
    }return { value: a, qa: b, stop: f };
  }function We(a, b) {
    a = a.split(/(\[.+?\])/);for (var c = [], d = 0; d < a.length; d++) if (1 === d % 2) c.push(a[d]);else {
      var e = a[d];if ("" !== e || d !== a.length - 1) e = e.split(":"), e[0] += b, c.push(e.join(":"));
    }return c.join("");
  }
  function Ve(a, b) {
    var c = a.match(Ye);return (c = c && c[2].trim() || "") ? c[0].match(Ze) ? a.replace(Ye, function (a, c, f) {
      return b + f;
    }) : c.split(Ze)[0] === b ? c : "should_not_match" : a.replace(":host", b);
  }function $e(a) {
    ":root" === a.selector && (a.selector = "html");
  }De.prototype.c = function (a) {
    return a.match(":host") ? "" : a.match("::slotted") ? this.b(a, ":not(.style-scope)") : We(a.trim(), ":not(.style-scope)");
  };p.Object.defineProperties(De.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "style-scope";
      } } });
  var Ne = /:(nth[-\w]+)\(([^)]+)\)/,
      Se = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
      Ze = /[[.:#*]/,
      Re = /^(::slotted)/,
      Ye = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      Xe = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      Ue = /(.*):dir\((?:(ltr|rtl))\)(.*)/,
      Pe = /:(?:matches|any|-(?:webkit|moz)-any)/,
      V = new De();function af(a, b, c, d, e) {
    this.u = a || null;this.b = b || null;this.Y = c || [];this.l = null;this.cssBuild = e || "";this.I = d || "";this.a = this.m = this.s = null;
  }function X(a) {
    return a ? a.__styleInfo : null;
  }function bf(a, b) {
    return a.__styleInfo = b;
  }af.prototype.c = function () {
    return this.u;
  };af.prototype._getStyleRules = af.prototype.c;function cf(a) {
    var b = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;return b && b.call(this, a);
  }var df = navigator.userAgent.match("Trident");function ef() {}function ff(a) {
    var b = {},
        c = [],
        d = 0;qe(a, function (a) {
      gf(a);a.index = d++;a = a.g.cssText;for (var c; c = ke.exec(a);) {
        var e = c[1];":" !== c[2] && (b[e] = !0);
      }
    }, function (a) {
      c.push(a);
    });a.b = c;a = [];for (var e in b) a.push(e);return a;
  }
  function gf(a) {
    if (!a.g) {
      var b = {},
          c = {};hf(a, c) && (b.o = c, a.rules = null);b.cssText = a.parsedCssText.replace(ne, "").replace(ie, "");a.g = b;
    }
  }function hf(a, b) {
    var c = a.g;if (c) {
      if (c.o) return Object.assign(b, c.o), !0;
    } else {
      c = a.parsedCssText;for (var d; a = ie.exec(c);) {
        d = (a[2] || a[3]).trim();if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;d = !0;
      }return d;
    }
  }
  function jf(a, b, c) {
    b && (b = 0 <= b.indexOf(";") ? kf(a, b, c) : xe(b, function (b, e, f, g) {
      if (!e) return b + g;(e = jf(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = jf(a, c[f] || f, c) || f;return b + (e || "") + g;
    }));return b && b.trim() || "";
  }
  function kf(a, b, c) {
    b = b.split(";");for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
      je.lastIndex = 0;if (f = je.exec(e)) e = jf(a, c[f[1]], c);else if (f = e.indexOf(":"), -1 !== f) {
        var g = e.substring(f);g = g.trim();g = jf(a, g, c) || g;e = e.substring(0, f) + g;
      }b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || "";
    }return b.join(";");
  }
  function lf(a, b) {
    var c = {},
        d = [];qe(a, function (a) {
      a.g || gf(a);var e = a.h || a.parsedSelector;b && a.g.o && e && cf.call(b, e) && (hf(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32);
    }, null, !0);return { o: c, key: d };
  }
  function mf(a, b, c, d) {
    b.g || gf(b);if (b.g.o) {
      var e = U(a);a = e.is;e = e.I;e = a ? Ke(a, e) : "html";var f = b.parsedSelector,
          g = ":host > *" === f || "html" === f,
          h = 0 === f.indexOf(":host") && !g;"shady" === c && (g = f === e + " > *." + e || -1 !== f.indexOf("html"), h = !g && 0 === f.indexOf(e));if (g || h) c = e, h && (b.h || (b.h = Le(V, b, V.b, a ? "." + a : "", e)), c = b.h || e), d({ Z: c, wa: h, Ha: g });
    }
  }function nf(a, b, c) {
    var d = {},
        e = {};qe(b, function (b) {
      mf(a, b, c, function (c) {
        cf.call(a._element || a, c.Z) && (c.wa ? hf(b, d) : hf(b, e));
      });
    }, null, !0);return { za: e, ua: d };
  }
  function of(a, b, c, d) {
    var e = U(b),
        f = Ke(e.is, e.I),
        g = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])"),
        h = X(b);e = h.u;h = h.cssBuild;var k = pf(e, d);return Ie(b, e, function (b) {
      var e = "";b.g || gf(b);b.g.cssText && (e = kf(a, b.g.cssText, c));b.cssText = e;if (!R && !se(b) && b.cssText) {
        var h = e = b.cssText;null == b.ba && (b.ba = le.test(e));if (b.ba) if (null == b.P) {
          b.P = [];for (var l in k) h = k[l], h = h(e), e !== h && (e = h, b.P.push(l));
        } else {
          for (l = 0; l < b.P.length; ++l) h = k[b.P[l]], e = h(e);h = e;
        }b.cssText = h;b.h = b.h || b.selector;
        e = "." + d;l = Ae(b.h);h = 0;for (var ka = l.length, Sa = void 0; h < ka && (Sa = l[h]); h++) l[h] = Sa.match(g) ? Sa.replace(f, e) : e + " " + Sa;b.selector = l.join(",");
      }
    }, h);
  }function pf(a, b) {
    a = a.b;var c = {};if (!R && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
      var f = e,
          g = b;f.f = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");f.a = f.keyframesName + "-" + g;f.h = f.h || f.selector;f.selector = f.h.replace(f.keyframesName, f.a);c[e.keyframesName] = qf(e);
    }return c;
  }function qf(a) {
    return function (b) {
      return b.replace(a.f, a.a);
    };
  }
  function rf(a, b) {
    var c = sf,
        d = re(a);a.textContent = pe(d, function (a) {
      var d = a.cssText = a.parsedCssText;a.g && a.g.cssText && (d = d.replace($d, "").replace(ae, ""), a.cssText = kf(c, d, b));
    });
  }p.Object.defineProperties(ef.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "x-scope";
      } } });var sf = new ef();var tf = {},
      uf = window.customElements;if (uf && !R && !ge) {
    var vf = uf.define;uf.define = function (a, b, c) {
      tf[a] || (tf[a] = ve(a));vf.call(uf, a, b, c);
    };
  };function wf() {
    this.cache = {};
  }wf.prototype.store = function (a, b, c, d) {
    var e = this.cache[a] || [];e.push({ o: b, styleElement: c, m: d });100 < e.length && e.shift();this.cache[a] = e;
  };function xf() {}var yf = new RegExp(V.a + "\\s*([^\\s]*)");function zf(a) {
    return (a = (a.classList && a.classList.value ? a.classList.value : a.getAttribute("class") || "").match(yf)) ? a[1] : "";
  }function Af(a) {
    var b = ze(a).getRootNode();return b === a || b === a.ownerDocument ? "" : (a = b.host) ? U(a).is : "";
  }
  function Bf(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b];if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
        var e = c.addedNodes[d];if (e.nodeType === Node.ELEMENT_NODE) {
          var f = e.getRootNode(),
              g = zf(e);if (g && f === e.ownerDocument && ("style" !== e.localName && "template" !== e.localName || "" === Be(e))) He(e, g);else if (f instanceof ShadowRoot) for (f = Af(e), f !== g && Ge(e, g, f), e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + V.a + ")"), g = 0; g < e.length; g++) {
            f = e[g];
            var h = Af(f);h && W(f, h);
          }
        }
      }
    }
  }
  if (!(R || window.ShadyDOM && window.ShadyDOM.handlesDynamicScoping)) {
    var Cf = new MutationObserver(Bf),
        Df = function (a) {
      Cf.observe(a, { childList: !0, subtree: !0 });
    };if (window.customElements && !window.customElements.polyfillWrapFlushCallback) Df(document);else {
      var Ef = function () {
        Df(document.body);
      };window.HTMLImports ? window.HTMLImports.whenReady(Ef) : requestAnimationFrame(function () {
        if ("loading" === document.readyState) {
          var a = function () {
            Ef();document.removeEventListener("readystatechange", a);
          };document.addEventListener("readystatechange", a);
        } else Ef();
      });
    }xf = function () {
      Bf(Cf.takeRecords());
    };
  }var Ff = xf;var Gf = {};var Hf = Promise.resolve();function If(a) {
    if (a = Gf[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
  }function Jf(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion;
  }function Kf(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion;a._validating || (a._validating = !0, Hf.then(function () {
      a._applyShimCurrentVersion = a._applyShimNextVersion;a._validating = !1;
    }));
  };var Lf = {},
      Mf = new wf();function Y() {
    this.C = {};this.c = document.documentElement;var a = new Nd();a.rules = [];this.f = bf(this.c, new af(a));this.i = !1;this.b = this.a = null;
  }n = Y.prototype;n.flush = function () {
    Ff();
  };n.sa = function (a) {
    return re(a);
  };n.Da = function (a) {
    return pe(a);
  };n.prepareTemplate = function (a, b, c) {
    this.prepareTemplateDom(a, b);this.prepareTemplateStyles(a, b, c);
  };
  n.prepareTemplateStyles = function (a, b, c) {
    if (!a._prepared && !ge) {
      R || tf[b] || (tf[b] = ve(b));a._prepared = !0;a.name = b;a.extends = c;Gf[b] = a;var d = Be(a),
          e = Ce(d);c = { is: b, extends: c };for (var f = [], g = a.content.querySelectorAll("style"), h = 0; h < g.length; h++) {
        var k = g[h];if (k.hasAttribute("shady-unscoped")) {
          if (!R) {
            var l = k.textContent;oe.has(l) || (oe.add(l), l = k.cloneNode(!0), document.head.appendChild(l));k.parentNode.removeChild(k);
          }
        } else f.push(k.textContent), k.parentNode.removeChild(k);
      }f = f.join("").trim() + (Lf[b] || "");
      Nf(this);if (!e) {
        if (g = !d) g = je.test(f) || ie.test(f), je.lastIndex = 0, ie.lastIndex = 0;h = Od(f);g && S && this.a && this.a.transformRules(h, b);a._styleAst = h;
      }g = [];S || (g = ff(a._styleAst));if (!g.length || S) h = R ? a.content : null, b = tf[b] || null, d = Ie(c, a._styleAst, null, d, e ? f : ""), d = d.length ? te(d, c.is, h, b) : null, a._style = d;a.a = g;
    }
  };n.ya = function (a, b) {
    Lf[b] = a.join(" ");
  };n.prepareTemplateDom = function (a, b) {
    if (!ge) {
      var c = Be(a);R || "shady" === c || a._domPrepared || (a._domPrepared = !0, Ee(a.content, b));
    }
  };
  function Of(a) {
    var b = U(a),
        c = b.is;b = b.I;var d = tf[c] || null,
        e = Gf[c];if (e) {
      c = e._styleAst;var f = e.a;e = Be(e);b = new af(c, d, f, b, e);bf(a, b);return b;
    }
  }function Pf(a) {
    !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
      a.ga(b);
    }, a.b.validateCallback = function () {
      requestAnimationFrame(function () {
        (a.b.enqueued || a.i) && a.flushCustomStyles();
      });
    });
  }
  function Nf(a) {
    !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = If);Pf(a);
  }
  n.flushCustomStyles = function () {
    if (!ge && (Nf(this), this.b)) {
      var a = this.b.processStyles();if (this.b.enqueued && !Ce(this.f.cssBuild)) {
        if (S) {
          if (!this.f.cssBuild) for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b]);if (c && S && this.a) {
              var d = re(c);Nf(this);this.a.transformRules(d);c.textContent = pe(d);
            }
          }
        } else {
          Qf(this, this.c, this.f);for (b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && rf(c, this.f.s);this.i && this.styleDocument();
        }this.b.enqueued = !1;
      }
    }
  };
  n.styleElement = function (a, b) {
    if (ge) {
      if (b) {
        X(a) || bf(a, new af(null));var c = X(a);c.l = c.l || {};Object.assign(c.l, b);Rf(this, a, c);
      }
    } else if (c = X(a) || Of(a)) if (a !== this.c && (this.i = !0), b && (c.l = c.l || {}, Object.assign(c.l, b)), S) Rf(this, a, c);else if (this.flush(), Qf(this, a, c), c.Y && c.Y.length) {
      b = U(a).is;var d;a: {
        if (d = Mf.cache[b]) for (var e = d.length - 1; 0 <= e; e--) {
          var f = d[e];b: {
            var g = c.Y;for (var h = 0; h < g.length; h++) {
              var k = g[h];if (f.o[k] !== c.s[k]) {
                g = !1;break b;
              }
            }g = !0;
          }if (g) {
            d = f;break a;
          }
        }d = void 0;
      }g = d ? d.styleElement : null;e = c.m;(f = d && d.m) || (f = this.C[b] = (this.C[b] || 0) + 1, f = b + "-" + f);c.m = f;f = c.m;h = sf;h = g ? g.textContent || "" : of(h, a, c.s, f);k = X(a);var l = k.a;l && !R && l !== g && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));R ? k.a ? (k.a.textContent = h, g = k.a) : h && (g = te(h, f, a.shadowRoot, k.b)) : g ? g.parentNode || (df && -1 < h.indexOf("@media") && (g.textContent = h), ue(g, null, k.b)) : h && (g = te(h, f, null, k.b));g && (g._useCount = g._useCount || 0, k.a != g && g._useCount++, k.a = g);f = g;R || (g = c.m, k = h = a.getAttribute("class") || "", e && (k = h.replace(new RegExp("\\s*x-scope\\s*" + e + "\\s*", "g"), " ")), k += (k ? " " : "") + "x-scope " + g, h !== k && ye(a, k));d || Mf.store(b, c.s, f, c.m);
    }
  };
  function Rf(a, b, c) {
    var d = U(b).is;if (c.l) {
      var e = c.l,
          f;for (f in e) null === f ? b.style.removeProperty(f) : b.style.setProperty(f, e[f]);
    }e = Gf[d];if (!(!e && b !== a.c || e && "" !== Be(e)) && e && e._style && !Jf(e)) {
      if (Jf(e) || e._applyShimValidatingVersion !== e._applyShimNextVersion) Nf(a), a.a && a.a.transformRules(e._styleAst, d), e._style.textContent = Ie(b, c.u), Kf(e);R && (a = b.shadowRoot) && (a = a.querySelector("style")) && (a.textContent = Ie(b, c.u));c.u = e._styleAst;
    }
  }
  function Sf(a, b) {
    return (b = ze(b).getRootNode().host) ? X(b) || Of(b) ? b : Sf(a, b) : a.c;
  }function Qf(a, b, c) {
    var d = Sf(a, b),
        e = X(d),
        f = e.s;d === a.c || f || (Qf(a, d, e), f = e.s);a = Object.create(f || null);d = nf(b, c.u, c.cssBuild);b = lf(e.u, b).o;Object.assign(a, d.ua, b, d.za);b = c.l;for (var g in b) if ((e = b[g]) || 0 === e) a[g] = e;g = sf;b = Object.getOwnPropertyNames(a);for (e = 0; e < b.length; e++) d = b[e], a[d] = jf(g, a[d], a);c.s = a;
  }n.styleDocument = function (a) {
    this.styleSubtree(this.c, a);
  };
  n.styleSubtree = function (a, b) {
    var c = ze(a),
        d = c.shadowRoot;(d || a === this.c) && this.styleElement(a, b);if (a = d && (d.children || d.childNodes)) for (c = 0; c < a.length; c++) this.styleSubtree(a[c]);else if (c = c.children || c.childNodes) for (a = 0; a < c.length; a++) this.styleSubtree(c[a]);
  };
  n.ga = function (a) {
    var b = this,
        c = Be(a);c !== this.f.cssBuild && (this.f.cssBuild = c);if (!Ce(c)) {
      var d = re(a);qe(d, function (a) {
        if (R) $e(a);else {
          var d = V;a.selector = a.parsedSelector;$e(a);a.selector = a.h = Le(d, a, d.c, void 0, void 0);
        }S && "" === c && (Nf(b), b.a && b.a.transformRule(a));
      });S ? a.textContent = pe(d) : this.f.u.rules.push(d);
    }
  };n.getComputedStyleValue = function (a, b) {
    var c;S || (c = (X(a) || X(Sf(this, a))).s[b]);return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : "";
  };
  n.Ca = function (a, b) {
    var c = ze(a).getRootNode();b = b ? b.split(/\s/) : [];c = c.host && c.host.localName;if (!c) {
      var d = a.getAttribute("class");if (d) {
        d = d.split(/\s/);for (var e = 0; e < d.length; e++) if (d[e] === V.a) {
          c = d[e + 1];break;
        }
      }
    }c && b.push(V.a, c);S || (c = X(a)) && c.m && b.push(sf.a, c.m);ye(a, b.join(" "));
  };n.pa = function (a) {
    return X(a);
  };n.Ba = function (a, b) {
    W(a, b);
  };n.Ea = function (a, b) {
    W(a, b, !0);
  };n.Aa = function (a) {
    return Af(a);
  };n.ra = function (a) {
    return zf(a);
  };Y.prototype.flush = Y.prototype.flush;Y.prototype.prepareTemplate = Y.prototype.prepareTemplate;
  Y.prototype.styleElement = Y.prototype.styleElement;Y.prototype.styleDocument = Y.prototype.styleDocument;Y.prototype.styleSubtree = Y.prototype.styleSubtree;Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue;Y.prototype.setElementClass = Y.prototype.Ca;Y.prototype._styleInfoForNode = Y.prototype.pa;Y.prototype.transformCustomStyleForDocument = Y.prototype.ga;Y.prototype.getStyleAst = Y.prototype.sa;Y.prototype.styleAstToString = Y.prototype.Da;Y.prototype.flushCustomStyles = Y.prototype.flushCustomStyles;
  Y.prototype.scopeNode = Y.prototype.Ba;Y.prototype.unscopeNode = Y.prototype.Ea;Y.prototype.scopeForNode = Y.prototype.Aa;Y.prototype.currentScopeForNode = Y.prototype.ra;Y.prototype.prepareAdoptedCssText = Y.prototype.ya;Object.defineProperties(Y.prototype, { nativeShadow: { get: function () {
        return R;
      } }, nativeCss: { get: function () {
        return S;
      } } });var Z = new Y(),
      Tf,
      Uf;window.ShadyCSS && (Tf = window.ShadyCSS.ApplyShim, Uf = window.ShadyCSS.CustomStyleInterface);
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
    }, nativeCss: S, nativeShadow: R, cssBuild: he, disableRuntime: ge };Tf && (window.ShadyCSS.ApplyShim = Tf);Uf && (window.ShadyCSS.CustomStyleInterface = Uf);
}).call(this);

//# sourceMappingURL=webcomponents-sd-ce.js.map