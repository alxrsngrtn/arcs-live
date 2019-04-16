/// BareSpecifier=@webcomponents/webcomponentsjs/bundles/webcomponents-sd
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
  var m,
      n = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
      ca = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  };function da() {
    da = function () {};n.Symbol || (n.Symbol = ea);
  }var ea = function () {
    var a = 0;return function (b) {
      return "jscomp_symbol_" + (b || "") + a++;
    };
  }();
  function fa() {
    da();var a = n.Symbol.iterator;a || (a = n.Symbol.iterator = n.Symbol("iterator"));"function" != typeof Array.prototype[a] && ca(Array.prototype, a, { configurable: !0, writable: !0, value: function () {
        return ha(this);
      } });fa = function () {};
  }function ha(a) {
    var b = 0;return ia(function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }function ia(a) {
    fa();a = { next: a };a[n.Symbol.iterator] = function () {
      return this;
    };return a;
  }function ja(a) {
    fa();da();fa();var b = a[Symbol.iterator];return b ? b.call(a) : ha(a);
  }
  function ka(a) {
    for (var b, c = []; !(b = a.next()).done;) c.push(b.value);return c;
  }function la() {}la.prototype.toJSON = function () {
    return {};
  };function p(a) {
    a.__shady || (a.__shady = new la());return a.__shady;
  }function q(a) {
    return a && a.__shady;
  };var t = window.ShadyDOM || {};t.na = !(!Element.prototype.attachShadow || !Node.prototype.getRootNode);var ma = Object.getOwnPropertyDescriptor(Node.prototype, "firstChild");t.i = !!(ma && ma.configurable && ma.get);t.R = t.force || !t.na;t.u = t.noPatch || !1;t.Z = t.preferPerformance;var na = navigator.userAgent.match("Trident");t.ba = na;function u(a) {
    return (a = q(a)) && void 0 !== a.firstChild;
  }function v(a) {
    return "ShadyRoot" === a.ga;
  }function oa(a) {
    return (a = (a = q(a)) && a.root) && pa(a);
  }
  var w = Element.prototype,
      qa = w.matches || w.matchesSelector || w.mozMatchesSelector || w.msMatchesSelector || w.oMatchesSelector || w.webkitMatchesSelector,
      ra = document.createTextNode(""),
      sa = 0,
      ta = [];new MutationObserver(function () {
    for (; ta.length;) try {
      ta.shift()();
    } catch (a) {
      throw ra.textContent = sa++, a;
    }
  }).observe(ra, { characterData: !0 });function ua(a) {
    ta.push(a);ra.textContent = sa++;
  }var va = !!document.contains;function wa(a, b) {
    for (; b;) {
      if (b == a) return !0;b = b.__shady_parentNode;
    }return !1;
  }
  function xa(a) {
    for (var b = a.length - 1; 0 <= b; b--) {
      var c = a[b],
          d = c.getAttribute("id") || c.getAttribute("name");d && "length" !== d && isNaN(d) && (a[d] = c);
    }a.item = function (b) {
      return a[b];
    };a.namedItem = function (b) {
      if ("length" !== b && isNaN(b) && a[b]) return a[b];for (var c = ja(a), d = c.next(); !d.done; d = c.next()) if (d = d.value, (d.getAttribute("id") || d.getAttribute("name")) == b) return d;return null;
    };return a;
  }function ya(a) {
    var b = [];for (a = a.__shady_native_firstChild; a; a = a.__shady_native_nextSibling) b.push(a);return b;
  }
  function za(a) {
    var b = [];for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) b.push(a);return b;
  }function x(a, b, c, d) {
    c = void 0 === c ? "" : c;for (var e in b) {
      var f = b[e];if (!(d && 0 <= d.indexOf(e))) {
        f.configurable = !0;var g = c + e;if (f.value) a[g] = f.value;else try {
          Object.defineProperty(a, g, f);
        } catch (h) {}
      }
    }
  }function y(a) {
    var b = {};Object.getOwnPropertyNames(a).forEach(function (c) {
      b[c] = Object.getOwnPropertyDescriptor(a, c);
    });return b;
  };var A = [],
      Aa;function Ba(a) {
    Aa || (Aa = !0, ua(Ca));A.push(a);
  }function Ca() {
    Aa = !1;for (var a = !!A.length; A.length;) A.shift()();return a;
  }Ca.list = A;function Da() {
    this.a = !1;this.addedNodes = [];this.removedNodes = [];this.I = new Set();
  }function Ea(a) {
    a.a || (a.a = !0, ua(function () {
      a.flush();
    }));
  }Da.prototype.flush = function () {
    if (this.a) {
      this.a = !1;var a = this.takeRecords();a.length && this.I.forEach(function (b) {
        b(a);
      });
    }
  };Da.prototype.takeRecords = function () {
    if (this.addedNodes.length || this.removedNodes.length) {
      var a = [{ addedNodes: this.addedNodes, removedNodes: this.removedNodes }];this.addedNodes = [];this.removedNodes = [];return a;
    }return [];
  };
  function Fa(a, b) {
    var c = p(a);c.C || (c.C = new Da());c.C.I.add(b);var d = c.C;return { fa: b, ia: d, ha: a, takeRecords: function () {
        return d.takeRecords();
      } };
  }function Ga(a) {
    var b = a && a.ia;b && (b.I.delete(a.fa), b.I.size || (p(a.ha).C = null));
  }
  function Ia(a, b) {
    var c = b.getRootNode();return a.map(function (a) {
      var b = c === a.target.getRootNode();if (b && a.addedNodes) {
        if (b = Array.from(a.addedNodes).filter(function (a) {
          return c === a.getRootNode();
        }), b.length) return a = Object.create(a), Object.defineProperty(a, "addedNodes", { value: b, configurable: !0 }), a;
      } else if (b) return a;
    }).filter(function (a) {
      return a;
    });
  };var Ja = /[&\u00A0"]/g,
      Ka = /[&\u00A0<>]/g;function La(a) {
    switch (a) {case "&":
        return "&amp;";case "<":
        return "&lt;";case ">":
        return "&gt;";case '"':
        return "&quot;";case "\u00a0":
        return "&nbsp;";}
  }function Ma(a) {
    for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = !0;return b;
  }var Na = Ma("area base br col command embed hr img input keygen link meta param source track wbr".split(" ")),
      Oa = Ma("style script xmp iframe noembed noframes plaintext noscript".split(" "));
  function Pa(a, b) {
    "template" === a.localName && (a = a.content);for (var c = "", d = b ? b(a) : a.childNodes, e = 0, f = d.length, g = void 0; e < f && (g = d[e]); e++) {
      a: {
        var h = g;var k = a,
            l = b;switch (h.nodeType) {case Node.ELEMENT_NODE:
            k = h.localName;for (var r = "<" + k, z = h.attributes, aa = 0, ba; ba = z[aa]; aa++) r += " " + ba.name + '="' + ba.value.replace(Ja, La) + '"';r += ">";h = Na[k] ? r : r + Pa(h, l) + "</" + k + ">";break a;case Node.TEXT_NODE:
            h = h.data;h = k && Oa[k.localName] ? h : h.replace(Ka, La);break a;case Node.COMMENT_NODE:
            h = "\x3c!--" + h.data + "--\x3e";break a;default:
            throw window.console.error(h), Error("not implemented");}
      }c += h;
    }return c;
  };var Qa = t.i,
      Ra = { querySelector: function (a) {
      return this.__shady_native_querySelector(a);
    }, querySelectorAll: function (a) {
      return this.__shady_native_querySelectorAll(a);
    } },
      Sa = {};function Ta(a) {
    Sa[a] = function (b) {
      return b["__shady_native_" + a];
    };
  }function Ua(a, b) {
    x(a, b, "__shady_native_");for (var c in b) Ta(c);
  }function B(a, b) {
    b = void 0 === b ? [] : b;for (var c = 0; c < b.length; c++) {
      var d = b[c],
          e = Object.getOwnPropertyDescriptor(a, d);e && (Object.defineProperty(a, "__shady_native_" + d, e), e.value ? Ra[d] || (Ra[d] = e.value) : Ta(d));
    }
  }
  var C = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, !1),
      D = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, !1),
      Va = document.implementation.createHTMLDocument("inert");function Wa(a) {
    for (var b; b = a.__shady_native_firstChild;) a.__shady_native_removeChild(b);
  }var Xa = ["firstElementChild", "lastElementChild", "children", "childElementCount"],
      Ya = ["querySelector", "querySelectorAll"];
  function Za() {
    var a = ["dispatchEvent", "addEventListener", "removeEventListener"];window.EventTarget ? B(window.EventTarget.prototype, a) : (B(Node.prototype, a), B(Window.prototype, a));Qa ? B(Node.prototype, "parentNode firstChild lastChild previousSibling nextSibling childNodes parentElement textContent".split(" ")) : Ua(Node.prototype, { parentNode: { get: function () {
          C.currentNode = this;return C.parentNode();
        } }, firstChild: { get: function () {
          C.currentNode = this;return C.firstChild();
        } }, lastChild: { get: function () {
          C.currentNode = this;return C.lastChild();
        } }, previousSibling: { get: function () {
          C.currentNode = this;return C.previousSibling();
        } }, nextSibling: { get: function () {
          C.currentNode = this;return C.nextSibling();
        } }, childNodes: { get: function () {
          var a = [];C.currentNode = this;for (var c = C.firstChild(); c;) a.push(c), c = C.nextSibling();return a;
        } }, parentElement: { get: function () {
          D.currentNode = this;return D.parentNode();
        } }, textContent: { get: function () {
          switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              for (var a = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1), c = "", d; d = a.nextNode();) c += d.nodeValue;return c;default:
              return this.nodeValue;}
        }, set: function (a) {
          if ("undefined" === typeof a || null === a) a = "";switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
              Wa(this);(0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_native_insertBefore(document.createTextNode(a), void 0);break;default:
              this.nodeValue = a;}
        } } });B(Node.prototype, "appendChild insertBefore removeChild replaceChild cloneNode contains".split(" "));
    B(HTMLElement.prototype, ["parentElement", "contains"]);a = { firstElementChild: { get: function () {
          D.currentNode = this;return D.firstChild();
        } }, lastElementChild: { get: function () {
          D.currentNode = this;return D.lastChild();
        } }, children: { get: function () {
          var a = [];D.currentNode = this;for (var c = D.firstChild(); c;) a.push(c), c = D.nextSibling();return xa(a);
        } }, childElementCount: { get: function () {
          return this.children ? this.children.length : 0;
        } } };Qa ? (B(Element.prototype, Xa), B(Element.prototype, ["previousElementSibling", "nextElementSibling", "innerHTML", "className"]), B(HTMLElement.prototype, ["children", "innerHTML", "className"])) : (Ua(Element.prototype, a), Ua(Element.prototype, { previousElementSibling: { get: function () {
          D.currentNode = this;return D.previousSibling();
        } }, nextElementSibling: { get: function () {
          D.currentNode = this;return D.nextSibling();
        } }, innerHTML: { get: function () {
          return Pa(this, ya);
        }, set: function (a) {
          var b = "template" === this.localName ? this.content : this;Wa(b);var d = this.localName || "div";d = this.namespaceURI && this.namespaceURI !== Va.namespaceURI ? Va.createElementNS(this.namespaceURI, d) : Va.createElement(d);d.innerHTML = a;for (a = "template" === this.localName ? d.content : d; d = a.__shady_native_firstChild;) b.__shady_native_insertBefore(d, void 0);
        } }, className: { get: function () {
          return this.getAttribute("class") || "";
        }, set: function (a) {
          this.setAttribute("class", a);
        } } }));B(Element.prototype, "setAttribute getAttribute hasAttribute removeAttribute focus blur".split(" "));B(Element.prototype, Ya);B(HTMLElement.prototype, ["focus", "blur"]);window.HTMLTemplateElement && B(window.HTMLTemplateElement.prototype, ["innerHTML"]);Qa ? B(DocumentFragment.prototype, Xa) : Ua(DocumentFragment.prototype, a);B(DocumentFragment.prototype, Ya);Qa ? (B(Document.prototype, Xa), B(Document.prototype, ["activeElement"])) : Ua(Document.prototype, a);B(Document.prototype, ["importNode", "getElementById"]);B(Document.prototype, Ya);
  };var $a = y({ get childNodes() {
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
      ab = y({ get textContent() {
      return this.__shady_textContent;
    }, set textContent(a) {
      this.__shady_textContent = a;
    }, get innerHTML() {
      return this.__shady_innerHTML;
    }, set innerHTML(a) {
      return this.__shady_innerHTML = a;
    } }),
      bb = y({ get parentElement() {
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
      cb;for (cb in $a) $a[cb].enumerable = !1;for (var db in ab) ab[db].enumerable = !1;for (var eb in bb) bb[eb].enumerable = !1;var fb = t.i || t.u,
      gb = fb ? function () {} : function (a) {
    var b = p(a);b.da || (b.da = !0, x(a, bb));
  },
      hb = fb ? function () {} : function (a) {
    var b = p(a);b.ca || (b.ca = !0, x(a, $a), window.customElements && !t.u || x(a, ab));
  };var ib = "__eventWrappers" + Date.now(),
      jb = function () {
    var a = Object.getOwnPropertyDescriptor(Event.prototype, "composed");return a ? function (b) {
      return a.get.call(b);
    } : null;
  }(),
      kb = function () {
    function a() {}var b = !1,
        c = { get capture() {
        b = !0;
      } };window.addEventListener("test", a, c);window.removeEventListener("test", a, c);return b;
  }();function lb(a) {
    if (a && "object" === typeof a) {
      var b = !!a.capture;var c = !!a.once;var d = !!a.passive;var e = a.w;
    } else b = !!a, d = c = !1;return { $: e, capture: b, once: c, passive: d, Y: kb ? a : b };
  }
  var mb = { blur: !0, focus: !0, focusin: !0, focusout: !0, click: !0, dblclick: !0, mousedown: !0, mouseenter: !0, mouseleave: !0, mousemove: !0, mouseout: !0, mouseover: !0, mouseup: !0, wheel: !0, beforeinput: !0, input: !0, keydown: !0, keyup: !0, compositionstart: !0, compositionupdate: !0, compositionend: !0, touchstart: !0, touchend: !0, touchmove: !0, touchcancel: !0, pointerover: !0, pointerenter: !0, pointerdown: !0, pointermove: !0, pointerup: !0, pointercancel: !0, pointerout: !0, pointerleave: !0, gotpointercapture: !0, lostpointercapture: !0, dragstart: !0,
    drag: !0, dragenter: !0, dragleave: !0, dragover: !0, drop: !0, dragend: !0, DOMActivate: !0, DOMFocusIn: !0, DOMFocusOut: !0, keypress: !0 },
      nb = { DOMAttrModified: !0, DOMAttributeNameChanged: !0, DOMCharacterDataModified: !0, DOMElementNameChanged: !0, DOMNodeInserted: !0, DOMNodeInsertedIntoDocument: !0, DOMNodeRemoved: !0, DOMNodeRemovedFromDocument: !0, DOMSubtreeModified: !0 };function ob(a) {
    return a instanceof Node ? a.__shady_getRootNode() : a;
  }
  function pb(a, b) {
    var c = [],
        d = a;for (a = ob(a); d;) c.push(d), d.__shady_assignedSlot ? d = d.__shady_assignedSlot : d.nodeType === Node.DOCUMENT_FRAGMENT_NODE && d.host && (b || d !== a) ? d = d.host : d = d.__shady_parentNode;c[c.length - 1] === document && c.push(window);return c;
  }function qb(a) {
    a.__composedPath || (a.__composedPath = pb(a.target, !0));return a.__composedPath;
  }function rb(a, b) {
    if (!v) return a;a = pb(a, !0);for (var c = 0, d, e = void 0, f, g = void 0; c < b.length; c++) if (d = b[c], f = ob(d), f !== e && (g = a.indexOf(f), e = f), !v(f) || -1 < g) return d;
  }
  function sb(a) {
    function b(b, d) {
      b = new a(b, d);b.__composed = d && !!d.composed;return b;
    }b.__proto__ = a;b.prototype = a.prototype;return b;
  }var tb = { focus: !0, blur: !0 };function ub(a) {
    return a.__target !== a.target || a.__relatedTarget !== a.relatedTarget;
  }function vb(a, b, c) {
    if (c = b.__handlers && b.__handlers[a.type] && b.__handlers[a.type][c]) for (var d = 0, e; (e = c[d]) && (!ub(a) || a.target !== a.relatedTarget) && (e.call(b, a), !a.__immediatePropagationStopped); d++);
  }
  function wb(a) {
    var b = a.composedPath();Object.defineProperty(a, "currentTarget", { get: function () {
        return d;
      }, configurable: !0 });for (var c = b.length - 1; 0 <= c; c--) {
      var d = b[c];vb(a, d, "capture");if (a.M) return;
    }Object.defineProperty(a, "eventPhase", { get: function () {
        return Event.AT_TARGET;
      } });var e;for (c = 0; c < b.length; c++) {
      d = b[c];var f = q(d);f = f && f.root;if (0 === c || f && f === e) if (vb(a, d, "bubble"), d !== window && (e = d.__shady_getRootNode()), a.M) break;
    }
  }
  function xb(a, b, c, d, e, f) {
    for (var g = 0; g < a.length; g++) {
      var h = a[g],
          k = h.type,
          l = h.capture,
          r = h.once,
          z = h.passive;if (b === h.node && c === k && d === l && e === r && f === z) return g;
    }return -1;
  }
  function yb(a, b, c) {
    var d = lb(c),
        e = d.capture,
        f = d.once,
        g = d.passive,
        h = d.$;d = d.Y;if (b) {
      var k = typeof b;if ("function" === k || "object" === k) if ("object" !== k || b.handleEvent && "function" === typeof b.handleEvent) {
        if (nb[a]) return this.__shady_native_addEventListener(a, b, d);var l = h || this;if (h = b[ib]) {
          if (-1 < xb(h, l, a, e, f, g)) return;
        } else b[ib] = [];h = function (d) {
          f && this.__shady_removeEventListener(a, b, c);d.__target || zb(d);if (l !== this) {
            var e = Object.getOwnPropertyDescriptor(d, "currentTarget");Object.defineProperty(d, "currentTarget", { get: function () {
                return l;
              }, configurable: !0 });
          }d.__previousCurrentTarget = d.currentTarget;if (!v(l) && "slot" !== l.localName || -1 != d.composedPath().indexOf(l)) if (d.composed || -1 < d.composedPath().indexOf(l)) if (ub(d) && d.target === d.relatedTarget) d.eventPhase === Event.BUBBLING_PHASE && d.stopImmediatePropagation();else if (d.eventPhase === Event.CAPTURING_PHASE || d.bubbles || d.target === l || l instanceof Window) {
            var g = "function" === k ? b.call(l, d) : b.handleEvent && b.handleEvent(d);l !== this && (e ? (Object.defineProperty(d, "currentTarget", e), e = null) : delete d.currentTarget);return g;
          }
        };b[ib].push({ node: l, type: a, capture: e, once: f, passive: g, ya: h });tb[a] ? (this.__handlers = this.__handlers || {}, this.__handlers[a] = this.__handlers[a] || { capture: [], bubble: [] }, this.__handlers[a][e ? "capture" : "bubble"].push(h)) : this.__shady_native_addEventListener(a, h, d);
      }
    }
  }
  function Ab(a, b, c) {
    if (b) {
      var d = lb(c);c = d.capture;var e = d.once,
          f = d.passive,
          g = d.$;d = d.Y;if (nb[a]) return this.__shady_native_removeEventListener(a, b, d);var h = g || this;g = void 0;var k = null;try {
        k = b[ib];
      } catch (l) {}k && (e = xb(k, h, a, c, e, f), -1 < e && (g = k.splice(e, 1)[0].ya, k.length || (b[ib] = void 0)));this.__shady_native_removeEventListener(a, g || b, d);g && tb[a] && this.__handlers && this.__handlers[a] && (a = this.__handlers[a][c ? "capture" : "bubble"], b = a.indexOf(g), -1 < b && a.splice(b, 1));
    }
  }
  function Bb() {
    for (var a in tb) window.__shady_native_addEventListener(a, function (a) {
      a.__target || (zb(a), wb(a));
    }, !0);
  }
  var Cb = y({ get composed() {
      void 0 === this.__composed && (jb ? this.__composed = "focusin" === this.type || "focusout" === this.type || jb(this) : !1 !== this.isTrusted && (this.__composed = mb[this.type]));return this.__composed || !1;
    }, composedPath: function () {
      this.__composedPath || (this.__composedPath = pb(this.__target, this.composed));return this.__composedPath;
    }, get target() {
      return rb(this.currentTarget || this.__previousCurrentTarget, this.composedPath());
    }, get relatedTarget() {
      if (!this.__relatedTarget) return null;this.__relatedTargetComposedPath || (this.__relatedTargetComposedPath = pb(this.__relatedTarget, !0));return rb(this.currentTarget || this.__previousCurrentTarget, this.__relatedTargetComposedPath);
    }, stopPropagation: function () {
      Event.prototype.stopPropagation.call(this);this.M = !0;
    }, stopImmediatePropagation: function () {
      Event.prototype.stopImmediatePropagation.call(this);this.M = this.__immediatePropagationStopped = !0;
    } });
  function zb(a) {
    a.__target = a.target;a.__relatedTarget = a.relatedTarget;if (t.i) {
      var b = Object.getPrototypeOf(a);if (!Object.hasOwnProperty(b, "__shady_patchedProto")) {
        var c = Object.create(b);c.__shady_sourceProto = b;x(c, Cb);b.__shady_patchedProto = c;
      }a.__proto__ = b.__shady_patchedProto;
    } else x(a, Cb);
  }var Db = sb(Event),
      Eb = sb(CustomEvent),
      Fb = sb(MouseEvent);
  function Gb() {
    if (!jb && Object.getOwnPropertyDescriptor(Event.prototype, "isTrusted")) {
      var a = function () {
        var a = new MouseEvent("click", { bubbles: !0, cancelable: !0, composed: !0 });this.__shady_dispatchEvent(a);
      };Element.prototype.click ? Element.prototype.click = a : HTMLElement.prototype.click && (HTMLElement.prototype.click = a);
    }
  }var Hb = Object.getOwnPropertyNames(Document.prototype).filter(function (a) {
    return "on" === a.substring(0, 2);
  });function Ib(a, b) {
    return { index: a, D: [], H: b };
  }
  function Jb(a, b, c, d) {
    var e = 0,
        f = 0,
        g = 0,
        h = 0,
        k = Math.min(b - e, d - f);if (0 == e && 0 == f) a: {
      for (g = 0; g < k; g++) if (a[g] !== c[g]) break a;g = k;
    }if (b == a.length && d == c.length) {
      h = a.length;for (var l = c.length, r = 0; r < k - g && Kb(a[--h], c[--l]);) r++;h = r;
    }e += g;f += g;b -= h;d -= h;if (0 == b - e && 0 == d - f) return [];if (e == b) {
      for (b = Ib(e, 0); f < d;) b.D.push(c[f++]);return [b];
    }if (f == d) return [Ib(e, b - e)];k = e;g = f;d = d - g + 1;h = b - k + 1;b = Array(d);for (l = 0; l < d; l++) b[l] = Array(h), b[l][0] = l;for (l = 0; l < h; l++) b[0][l] = l;for (l = 1; l < d; l++) for (r = 1; r < h; r++) if (a[k + r - 1] === c[g + l - 1]) b[l][r] = b[l - 1][r - 1];else {
      var z = b[l - 1][r] + 1,
          aa = b[l][r - 1] + 1;b[l][r] = z < aa ? z : aa;
    }k = b.length - 1;g = b[0].length - 1;d = b[k][g];for (a = []; 0 < k || 0 < g;) 0 == k ? (a.push(2), g--) : 0 == g ? (a.push(3), k--) : (h = b[k - 1][g - 1], l = b[k - 1][g], r = b[k][g - 1], z = l < r ? l < h ? l : h : r < h ? r : h, z == h ? (h == d ? a.push(0) : (a.push(1), d = h), k--, g--) : z == l ? (a.push(3), k--, d = l) : (a.push(2), g--, d = r));a.reverse();b = void 0;k = [];for (g = 0; g < a.length; g++) switch (a[g]) {case 0:
        b && (k.push(b), b = void 0);e++;f++;break;case 1:
        b || (b = Ib(e, 0));b.H++;e++;b.D.push(c[f]);f++;break;case 2:
        b || (b = Ib(e, 0));b.H++;e++;break;case 3:
        b || (b = Ib(e, 0)), b.D.push(c[f]), f++;}b && k.push(b);return k;
  }function Kb(a, b) {
    return a === b;
  };function Lb(a, b, c, d) {
    gb(a);d = d || null;var e = p(a),
        f = d ? p(d) : null;e.previousSibling = d ? f.previousSibling : b.__shady_lastChild;if (f = q(e.previousSibling)) f.nextSibling = a;if (f = q(e.nextSibling = d)) f.previousSibling = a;e.parentNode = b;d ? d === c.firstChild && (c.firstChild = a) : (c.lastChild = a, c.firstChild || (c.firstChild = a));c.childNodes = null;
  }
  function Mb(a, b, c) {
    hb(b);var d = p(b);void 0 !== d.firstChild && (d.childNodes = null);if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) for (a = a.__shady_native_firstChild; a; a = a.__shady_native_nextSibling) Lb(a, b, d, c);else Lb(a, b, d, c);
  }
  function Nb(a, b) {
    var c = p(a);b = p(b);a === b.firstChild && (b.firstChild = c.nextSibling);a === b.lastChild && (b.lastChild = c.previousSibling);a = c.previousSibling;var d = c.nextSibling;a && (p(a).nextSibling = d);d && (p(d).previousSibling = a);c.parentNode = c.previousSibling = c.nextSibling = void 0;void 0 !== b.childNodes && (b.childNodes = null);
  }
  function Ob(a, b) {
    var c = p(a);if (b || void 0 === c.firstChild) {
      c.childNodes = null;var d = c.firstChild = a.__shady_native_firstChild;c.lastChild = a.__shady_native_lastChild;hb(a);c = d;for (d = void 0; c; c = c.__shady_native_nextSibling) {
        var e = p(c);e.parentNode = b || a;e.nextSibling = c.__shady_native_nextSibling;e.previousSibling = d || null;d = c;gb(c);
      }
    }
  };var Pb = null;function E() {
    Pb || (Pb = window.ShadyCSS && window.ShadyCSS.ScopingShim);return Pb || null;
  }function Qb(a, b) {
    var c = E();c && c.unscopeNode(a, b);
  }function Rb(a, b) {
    var c = E();if (!c) return !0;if (a.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      c = !0;for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) c = c && Rb(a, b);return c;
    }return a.nodeType !== Node.ELEMENT_NODE ? !0 : c.currentScopeForNode(a) === b;
  }function Sb(a) {
    if (a.nodeType !== Node.ELEMENT_NODE) return "";var b = E();return b ? b.currentScopeForNode(a) : "";
  }
  function Tb(a, b) {
    if (a) for (a.nodeType === Node.ELEMENT_NODE && b(a), a = a.__shady_firstChild; a; a = a.__shady_nextSibling) a.nodeType === Node.ELEMENT_NODE && Tb(a, b);
  };var Ub = window.document,
      Vb = t.Z,
      Wb = Object.getOwnPropertyDescriptor(Node.prototype, "isConnected"),
      Xb = Wb && Wb.get;function Yb(a) {
    for (var b; b = a.__shady_firstChild;) a.__shady_removeChild(b);
  }function Zb(a) {
    var b = q(a);if (b && void 0 !== b.K) for (b = a.__shady_firstChild; b; b = b.__shady_nextSibling) Zb(b);if (a = q(a)) a.K = void 0;
  }function $b(a) {
    var b = a;a && "slot" === a.localName && (b = (b = (b = q(a)) && b.B) && b.length ? b[0] : $b(a.__shady_nextSibling));return b;
  }
  function ac(a, b, c) {
    if (a = (a = q(a)) && a.C) b && a.addedNodes.push(b), c && a.removedNodes.push(c), Ea(a);
  }
  var dc = y({ get parentNode() {
      var a = q(this);a = a && a.parentNode;return void 0 !== a ? a : this.__shady_native_parentNode;
    }, get firstChild() {
      var a = q(this);a = a && a.firstChild;return void 0 !== a ? a : this.__shady_native_firstChild;
    }, get lastChild() {
      var a = q(this);a = a && a.lastChild;return void 0 !== a ? a : this.__shady_native_lastChild;
    }, get nextSibling() {
      var a = q(this);a = a && a.nextSibling;return void 0 !== a ? a : this.__shady_native_nextSibling;
    }, get previousSibling() {
      var a = q(this);a = a && a.previousSibling;return void 0 !== a ? a : this.__shady_native_previousSibling;
    },
    get childNodes() {
      if (u(this)) {
        var a = q(this);if (!a.childNodes) {
          a.childNodes = [];for (var b = this.__shady_firstChild; b; b = b.__shady_nextSibling) a.childNodes.push(b);
        }var c = a.childNodes;
      } else c = this.__shady_native_childNodes;c.item = function (a) {
        return c[a];
      };return c;
    }, get parentElement() {
      var a = q(this);(a = a && a.parentNode) && a.nodeType !== Node.ELEMENT_NODE && (a = null);return void 0 !== a ? a : this.__shady_native_parentElement;
    }, get isConnected() {
      if (Xb && Xb.call(this)) return !0;if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return !1;
      var a = this.ownerDocument;if (va) {
        if (a.__shady_native_contains(this)) return !0;
      } else if (a.documentElement && a.documentElement.__shady_native_contains(this)) return !0;for (a = this; a && !(a instanceof Document);) a = a.__shady_parentNode || (v(a) ? a.host : void 0);return !!(a && a instanceof Document);
    }, get textContent() {
      if (u(this)) {
        for (var a = [], b = this.__shady_firstChild; b; b = b.__shady_nextSibling) b.nodeType !== Node.COMMENT_NODE && a.push(b.__shady_textContent);return a.join("");
      }return this.__shady_native_textContent;
    }, set textContent(a) {
      if ("undefined" === typeof a || null === a) a = "";switch (this.nodeType) {case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:
          if (!u(this) && t.i) {
            var b = this.__shady_firstChild;(b != this.__shady_lastChild || b && b.nodeType != Node.TEXT_NODE) && Yb(this);this.__shady_native_textContent = a;
          } else Yb(this), (0 < a.length || this.nodeType === Node.ELEMENT_NODE) && this.__shady_insertBefore(document.createTextNode(a));break;default:
          this.nodeValue = a;}
    }, insertBefore: function (a, b) {
      if (this.ownerDocument !== Ub && a.ownerDocument !== Ub) return this.__shady_native_insertBefore(a, b), a;if (a === this) throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");if (b) {
        var c = q(b);c = c && c.parentNode;if (void 0 !== c && c !== this || void 0 === c && b.__shady_native_parentNode !== this) throw Error("Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.");
      }if (b === a) return a;var d = [],
          e = (c = F(this)) ? c.host.localName : Sb(this),
          f = a.__shady_parentNode;if (f) {
        var g = Sb(a);var h = !!c || !F(a) || Vb && void 0 !== this.__noInsertionPoint;f.__shady_removeChild(a, h);
      }f = !0;var k = (!Vb || void 0 === a.__noInsertionPoint && void 0 === this.__noInsertionPoint) && !Rb(a, e),
          l = c && !a.__noInsertionPoint && (!Vb || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE);if (l || k) k && (g = g || Sb(a)), Tb(a, function (a) {
        l && "slot" === a.localName && d.push(a);if (k) {
          var b = g;E() && (b && Qb(a, b), (b = E()) && b.scopeNode(a, e));
        }
      });d.length && (bc(c), c.c.push.apply(c.c, d instanceof Array ? d : ka(ja(d))), G(c));u(this) && (Mb(a, this, b), c = q(this), oa(this) ? (G(c.root), f = !1) : c.root && (f = !1));
      f ? (c = v(this) ? this.host : this, b ? (b = $b(b), c.__shady_native_insertBefore(a, b)) : c.__shady_native_appendChild(a)) : a.ownerDocument !== this.ownerDocument && this.ownerDocument.adoptNode(a);ac(this, a);return a;
    }, appendChild: function (a) {
      if (this != a || !v(a)) return this.__shady_insertBefore(a);
    }, removeChild: function (a, b) {
      b = void 0 === b ? !1 : b;if (this.ownerDocument !== Ub) return this.__shady_native_removeChild(a);if (a.__shady_parentNode !== this) throw Error("The node to be removed is not a child of this node: " + a);var c = F(a),
          d = c && cc(c, a),
          e = q(this);if (u(this) && (Nb(a, this), oa(this))) {
        G(e.root);var f = !0;
      }if (E() && !b && c && a.nodeType !== Node.TEXT_NODE) {
        var g = Sb(a);Tb(a, function (a) {
          Qb(a, g);
        });
      }Zb(a);c && ((b = this && "slot" === this.localName) && (f = !0), (d || b) && G(c));f || (f = v(this) ? this.host : this, (!e.root && "slot" !== a.localName || f === a.__shady_native_parentNode) && f.__shady_native_removeChild(a));ac(this, null, a);return a;
    }, replaceChild: function (a, b) {
      this.__shady_insertBefore(a, b);this.__shady_removeChild(b);return a;
    }, cloneNode: function (a) {
      if ("template" == this.localName) return this.__shady_native_cloneNode(a);var b = this.__shady_native_cloneNode(!1);if (a && b.nodeType !== Node.ATTRIBUTE_NODE) {
        a = this.__shady_firstChild;for (var c; a; a = a.__shady_nextSibling) c = a.__shady_cloneNode(!0), b.__shady_appendChild(c);
      }return b;
    }, getRootNode: function (a) {
      if (this && this.nodeType) {
        var b = p(this),
            c = b.K;void 0 === c && (v(this) ? (c = this, b.K = c) : (c = (c = this.__shady_parentNode) ? c.__shady_getRootNode(a) : this, document.documentElement.__shady_native_contains(this) && (b.K = c)));return c;
      }
    }, contains: function (a) {
      return wa(this, a);
    } });function ec(a, b, c) {
    var d = [];fc(a, b, c, d);return d;
  }function fc(a, b, c, d) {
    for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) {
      var e;if (e = a.nodeType === Node.ELEMENT_NODE) {
        e = a;var f = b,
            g = c,
            h = d,
            k = f(e);k && h.push(e);g && g(k) ? e = k : (fc(e, f, g, h), e = void 0);
      }if (e) break;
    }
  }
  var H = y({ get firstElementChild() {
      var a = q(this);if (a && void 0 !== a.firstChild) {
        for (a = this.__shady_firstChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;return a;
      }return this.__shady_native_firstElementChild;
    }, get lastElementChild() {
      var a = q(this);if (a && void 0 !== a.lastChild) {
        for (a = this.__shady_lastChild; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;return a;
      }return this.__shady_native_lastElementChild;
    }, get children() {
      return u(this) ? xa(Array.prototype.filter.call(za(this), function (a) {
        return a.nodeType === Node.ELEMENT_NODE;
      })) : this.__shady_native_children;
    }, get childElementCount() {
      var a = this.__shady_children;return a ? a.length : 0;
    } }),
      gc = y({ querySelector: function (a) {
      return ec(this, function (b) {
        return qa.call(b, a);
      }, function (a) {
        return !!a;
      })[0] || null;
    }, querySelectorAll: function (a, b) {
      if (b) {
        b = Array.prototype.slice.call(this.__shady_native_querySelectorAll(a));var c = this.__shady_getRootNode();return b.filter(function (a) {
          return a.__shady_getRootNode() == c;
        });
      }return ec(this, function (b) {
        return qa.call(b, a);
      });
    } }),
      hc = t.Z && !t.u ? Object.assign({}, H) : H;Object.assign(H, gc);var ic = y({ getElementById: function (a) {
      return "" === a ? null : ec(this, function (b) {
        return b.id == a;
      }, function (a) {
        return !!a;
      })[0] || null;
    } });var jc = y({ get activeElement() {
      var a = t.i ? document.__shady_native_activeElement : document.activeElement;if (!a || !a.nodeType) return null;var b = !!v(this);if (!(this === document || b && this.host !== a && this.host.__shady_native_contains(a))) return null;for (b = F(a); b && b !== this;) a = b.host, b = F(a);return this === document ? b ? null : a : b === this ? a : null;
    } });var kc = document.implementation.createHTMLDocument("inert"),
      lc = y({ get innerHTML() {
      return u(this) ? Pa("template" === this.localName ? this.content : this, za) : this.__shady_native_innerHTML;
    }, set innerHTML(a) {
      if ("template" === this.localName) this.__shady_native_innerHTML = a;else {
        Yb(this);var b = this.localName || "div";b = this.namespaceURI && this.namespaceURI !== kc.namespaceURI ? kc.createElementNS(this.namespaceURI, b) : kc.createElement(b);for (t.i ? b.__shady_native_innerHTML = a : b.innerHTML = a; a = b.__shady_firstChild;) this.__shady_insertBefore(a);
      }
    } });var mc = y({ addEventListener: function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.w = c.w || this;this.host.__shady_addEventListener(a, b, c);
    }, removeEventListener: function (a, b, c) {
      "object" !== typeof c && (c = { capture: !!c });c.w = c.w || this;this.host.__shady_removeEventListener(a, b, c);
    } });function nc(a, b) {
    x(a, mc, b);x(a, jc, b);x(a, lc, b);x(a, H, b);t.u && !b ? (x(a, dc, b), x(a, ic, b)) : t.i || (x(a, bb), x(a, $a), x(a, ab));
  };var oc = {},
      I = t.deferConnectionCallbacks && "loading" === document.readyState,
      pc;function qc(a) {
    var b = [];do b.unshift(a); while (a = a.__shady_parentNode);return b;
  }function rc(a, b, c) {
    if (a !== oc) throw new TypeError("Illegal constructor");this.a = null;sc(this, b, c);
  }
  function sc(a, b, c) {
    a.ga = "ShadyRoot";a.host = b;a.mode = c && c.mode;Ob(a.host);b = p(a.host);b.root = a;b.ra = "closed" !== a.mode ? a : null;b = p(a);b.firstChild = b.lastChild = b.parentNode = b.nextSibling = b.previousSibling = null;if (t.preferPerformance) for (; b = a.host.__shady_native_firstChild;) a.host.__shady_native_removeChild(b);else G(a);
  }function G(a) {
    a.A || (a.A = !0, Ba(function () {
      return tc(a);
    }));
  }
  function tc(a) {
    var b;if (b = a.A) {
      for (var c; a;) a: {
        a.A && (c = a), b = a;a = b.host.__shady_getRootNode();if (v(a) && (b = q(b.host)) && 0 < b.G) break a;a = void 0;
      }b = c;
    }(c = b) && c._renderSelf();
  }
  rc.prototype._renderSelf = function () {
    var a = I;I = !0;this.A = !1;if (this.a) {
      uc(this);for (var b = 0, c; b < this.a.length; b++) {
        c = this.a[b];var d = q(c),
            e = d.assignedNodes;d.assignedNodes = [];d.B = [];if (d.V = e) for (d = 0; d < e.length; d++) {
          var f = q(e[d]);f.N = f.assignedSlot;f.assignedSlot === c && (f.assignedSlot = null);
        }
      }for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) vc(this, b);for (b = 0; b < this.a.length; b++) {
        c = this.a[b];e = q(c);if (!e.assignedNodes.length) for (d = c.__shady_firstChild; d; d = d.__shady_nextSibling) vc(this, d, c);
        (d = (d = q(c.__shady_parentNode)) && d.root) && (pa(d) || d.A) && d._renderSelf();wc(this, e.B, e.assignedNodes);if (d = e.V) {
          for (f = 0; f < d.length; f++) q(d[f]).N = null;e.V = null;d.length > e.assignedNodes.length && (e.O = !0);
        }e.O && (e.O = !1, xc(this, c));
      }c = this.a;b = [];for (e = 0; e < c.length; e++) d = c[e].__shady_parentNode, (f = q(d)) && f.root || !(0 > b.indexOf(d)) || b.push(d);for (c = 0; c < b.length; c++) {
        f = b[c];e = f === this ? this.host : f;d = [];for (f = f.__shady_firstChild; f; f = f.__shady_nextSibling) if ("slot" == f.localName) for (var g = q(f).B, h = 0; h < g.length; h++) d.push(g[h]);else d.push(f);f = ya(e);g = Jb(d, d.length, f, f.length);for (var k = h = 0, l = void 0; h < g.length && (l = g[h]); h++) {
          for (var r = 0, z = void 0; r < l.D.length && (z = l.D[r]); r++) z.__shady_native_parentNode === e && e.__shady_native_removeChild(z), f.splice(l.index + k, 1);k -= l.H;
        }k = 0;for (l = void 0; k < g.length && (l = g[k]); k++) for (h = f[l.index], r = l.index; r < l.index + l.H; r++) z = d[r], e.__shady_native_insertBefore(z, h), f.splice(r, 0, z);
      }
    }if (!t.preferPerformance && !this.U) for (b = this.host.__shady_firstChild; b; b = b.__shady_nextSibling) c = q(b), b.__shady_native_parentNode !== this.host || "slot" !== b.localName && c.assignedSlot || this.host.__shady_native_removeChild(b);this.U = !0;I = a;pc && pc();
  };function vc(a, b, c) {
    var d = p(b),
        e = d.N;d.N = null;c || (c = (a = a.b[b.__shady_slot || "__catchall"]) && a[0]);c ? (p(c).assignedNodes.push(b), d.assignedSlot = c) : d.assignedSlot = void 0;e !== d.assignedSlot && d.assignedSlot && (p(d.assignedSlot).O = !0);
  }function wc(a, b, c) {
    for (var d = 0, e = void 0; d < c.length && (e = c[d]); d++) if ("slot" == e.localName) {
      var f = q(e).assignedNodes;f && f.length && wc(a, b, f);
    } else b.push(c[d]);
  }
  function xc(a, b) {
    b.__shady_native_dispatchEvent(new Event("slotchange"));b = q(b);b.assignedSlot && xc(a, b.assignedSlot);
  }function bc(a) {
    a.c = a.c || [];a.a = a.a || [];a.b = a.b || {};
  }function uc(a) {
    if (a.c && a.c.length) {
      for (var b = a.c, c, d = 0; d < b.length; d++) {
        var e = b[d];Ob(e);var f = e.__shady_parentNode;Ob(f);f = q(f);f.G = (f.G || 0) + 1;f = yc(e);a.b[f] ? (c = c || {}, c[f] = !0, a.b[f].push(e)) : a.b[f] = [e];a.a.push(e);
      }if (c) for (var g in c) a.b[g] = zc(a.b[g]);a.c = [];
    }
  }
  function yc(a) {
    var b = a.name || a.getAttribute("name") || "__catchall";return a.ea = b;
  }function zc(a) {
    return a.sort(function (a, c) {
      a = qc(a);for (var b = qc(c), e = 0; e < a.length; e++) {
        c = a[e];var f = b[e];if (c !== f) return a = za(c.__shady_parentNode), a.indexOf(c) - a.indexOf(f);
      }
    });
  }
  function cc(a, b) {
    if (a.a) {
      uc(a);var c = a.b,
          d;for (d in c) for (var e = c[d], f = 0; f < e.length; f++) {
        var g = e[f];if (wa(b, g)) {
          e.splice(f, 1);var h = a.a.indexOf(g);0 <= h && (a.a.splice(h, 1), (h = q(g.__shady_parentNode)) && h.G && h.G--);f--;g = q(g);if (h = g.B) for (var k = 0; k < h.length; k++) {
            var l = h[k],
                r = l.__shady_native_parentNode;r && r.__shady_native_removeChild(l);
          }g.B = [];g.assignedNodes = [];h = !0;
        }
      }return h;
    }
  }function pa(a) {
    uc(a);return !(!a.a || !a.a.length);
  }
  (function (a) {
    a.__proto__ = DocumentFragment.prototype;nc(a, "__shady_");nc(a);Object.defineProperties(a, { nodeType: { value: Node.DOCUMENT_FRAGMENT_NODE, configurable: !0 }, nodeName: { value: "#document-fragment", configurable: !0 }, nodeValue: { value: null, configurable: !0 } });["localName", "namespaceURI", "prefix"].forEach(function (b) {
      Object.defineProperty(a, b, { value: void 0, configurable: !0 });
    });["ownerDocument", "baseURI", "isConnected"].forEach(function (b) {
      Object.defineProperty(a, b, { get: function () {
          return this.host[b];
        },
        configurable: !0 });
    });
  })(rc.prototype);
  if (window.customElements && t.R && !t.preferPerformance) {
    var Ac = new Map();pc = function () {
      var a = [];Ac.forEach(function (b, c) {
        a.push([c, b]);
      });Ac.clear();for (var b = 0; b < a.length; b++) {
        var c = a[b][0];a[b][1] ? c.__shadydom_connectedCallback() : c.__shadydom_disconnectedCallback();
      }
    };I && document.addEventListener("readystatechange", function () {
      I = !1;pc();
    }, { once: !0 });var Bc = function (a, b, c) {
      var d = 0,
          e = "__isConnected" + d++;if (b || c) a.prototype.connectedCallback = a.prototype.__shadydom_connectedCallback = function () {
        I ? Ac.set(this, !0) : this[e] || (this[e] = !0, b && b.call(this));
      }, a.prototype.disconnectedCallback = a.prototype.__shadydom_disconnectedCallback = function () {
        I ? this.isConnected || Ac.set(this, !1) : this[e] && (this[e] = !1, c && c.call(this));
      };return a;
    },
        Cc = window.customElements.define,
        define = function (a, b) {
      var c = b.prototype.connectedCallback,
          d = b.prototype.disconnectedCallback;Cc.call(window.customElements, a, Bc(b, c, d));b.prototype.connectedCallback = c;b.prototype.disconnectedCallback = d;
    };window.customElements.define = define;Object.defineProperty(window.CustomElementRegistry.prototype, "define", { value: define, configurable: !0 });
  }function F(a) {
    a = a.__shady_getRootNode();if (v(a)) return a;
  };function J(a) {
    this.node = a;
  }m = J.prototype;m.addEventListener = function (a, b, c) {
    return this.node.__shady_addEventListener(a, b, c);
  };m.removeEventListener = function (a, b, c) {
    return this.node.__shady_removeEventListener(a, b, c);
  };m.appendChild = function (a) {
    return this.node.__shady_appendChild(a);
  };m.insertBefore = function (a, b) {
    return this.node.__shady_insertBefore(a, b);
  };m.removeChild = function (a) {
    return this.node.__shady_removeChild(a);
  };m.replaceChild = function (a, b) {
    return this.node.__shady_replaceChild(a, b);
  };
  m.cloneNode = function (a) {
    return this.node.__shady_cloneNode(a);
  };m.getRootNode = function (a) {
    return this.node.__shady_getRootNode(a);
  };m.contains = function (a) {
    return this.node.__shady_contains(a);
  };m.dispatchEvent = function (a) {
    return this.node.__shady_dispatchEvent(a);
  };m.setAttribute = function (a, b) {
    this.node.__shady_setAttribute(a, b);
  };m.getAttribute = function (a) {
    return this.node.__shady_native_getAttribute(a);
  };m.removeAttribute = function (a) {
    this.node.__shady_removeAttribute(a);
  };m.attachShadow = function (a) {
    return this.node.__shady_attachShadow(a);
  };
  m.focus = function () {
    this.node.__shady_native_focus();
  };m.blur = function () {
    this.node.__shady_blur();
  };m.importNode = function (a, b) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_importNode(a, b);
  };m.getElementById = function (a) {
    if (this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_getElementById(a);
  };m.querySelector = function (a) {
    return this.node.__shady_querySelector(a);
  };m.querySelectorAll = function (a, b) {
    return this.node.__shady_querySelectorAll(a, b);
  };
  m.assignedNodes = function (a) {
    if ("slot" === this.node.localName) return this.node.__shady_assignedNodes(a);
  };
  n.Object.defineProperties(J.prototype, { activeElement: { configurable: !0, enumerable: !0, get: function () {
        if (v(this.node) || this.node.nodeType === Node.DOCUMENT_NODE) return this.node.__shady_activeElement;
      } }, _activeElement: { configurable: !0, enumerable: !0, get: function () {
        return this.activeElement;
      } }, host: { configurable: !0, enumerable: !0, get: function () {
        if (v(this.node)) return this.node.host;
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
  Hb.forEach(function (a) {
    Object.defineProperty(J.prototype, a, { get: function () {
        return this.node["__shady_" + a];
      }, set: function (b) {
        this.node["__shady_" + a] = b;
      }, configurable: !0 });
  });var Dc = new WeakMap();function Ec(a) {
    if (v(a) || a instanceof J) return a;var b = Dc.get(a);b || (b = new J(a), Dc.set(a, b));return b;
  };var Fc = y({ dispatchEvent: function (a) {
      Ca();return this.__shady_native_dispatchEvent(a);
    }, addEventListener: yb, removeEventListener: Ab });var Gc = y({ get assignedSlot() {
      var a = this.__shady_parentNode;(a = a && a.__shady_shadowRoot) && tc(a);return (a = q(this)) && a.assignedSlot || null;
    } });var Hc = window.document;function Ic(a, b) {
    if ("slot" === b) a = a.__shady_parentNode, oa(a) && G(q(a).root);else if ("slot" === a.localName && "name" === b && (b = F(a))) {
      if (b.a) {
        uc(b);var c = a.ea,
            d = yc(a);if (d !== c) {
          c = b.b[c];var e = c.indexOf(a);0 <= e && c.splice(e, 1);c = b.b[d] || (b.b[d] = []);c.push(a);1 < c.length && (b.b[d] = zc(c));
        }
      }G(b);
    }
  }
  var Jc = y({ get previousElementSibling() {
      var a = q(this);if (a && void 0 !== a.previousSibling) {
        for (a = this.__shady_previousSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_previousSibling;return a;
      }return this.__shady_native_previousElementSibling;
    }, get nextElementSibling() {
      var a = q(this);if (a && void 0 !== a.nextSibling) {
        for (a = this.__shady_nextSibling; a && a.nodeType !== Node.ELEMENT_NODE;) a = a.__shady_nextSibling;return a;
      }return this.__shady_native_nextElementSibling;
    }, get slot() {
      return this.getAttribute("slot");
    },
    set slot(a) {
      this.__shady_setAttribute("slot", a);
    }, get shadowRoot() {
      var a = q(this);return a && a.ra || null;
    }, get className() {
      return this.getAttribute("class") || "";
    }, set className(a) {
      this.__shady_setAttribute("class", a);
    }, setAttribute: function (a, b) {
      if (this.ownerDocument !== Hc) this.__shady_native_setAttribute(a, b);else {
        var c;(c = E()) && "class" === a ? (c.setElementClass(this, b), c = !0) : c = !1;c || (this.__shady_native_setAttribute(a, b), Ic(this, a));
      }
    }, removeAttribute: function (a) {
      this.__shady_native_removeAttribute(a);Ic(this, a);
    }, attachShadow: function (a) {
      if (!this) throw Error("Must provide a host.");if (!a) throw Error("Not enough arguments.");if (a.shadyUpgradeFragment && !t.ba) {
        var b = a.shadyUpgradeFragment;b.__proto__ = ShadowRoot.prototype;sc(b, this, a);Ob(b, b);a = b.__noInsertionPoint ? null : b.querySelectorAll("slot");b.__noInsertionPoint = void 0;if (a && a.length) {
          var c = b;bc(c);c.c.push.apply(c.c, a instanceof Array ? a : ka(ja(a)));G(b);
        }b.host.__shady_native_appendChild(b);
      } else b = new rc(oc, this, a);return b;
    } });var Kc = y({ blur: function () {
      var a = q(this);(a = (a = a && a.root) && a.activeElement) ? a.__shady_blur() : this.__shady_native_blur();
    } });Hb.forEach(function (a) {
    Kc[a] = { set: function (b) {
        var c = p(this),
            d = a.substring(2);c.v || (c.v = {});c.v[a] && this.removeEventListener(d, c.v[a]);this.__shady_addEventListener(d, b);c.v[a] = b;
      }, get: function () {
        var b = q(this);return b && b.v && b.v[a];
      }, configurable: !0 };
  });var Lc = y({ assignedNodes: function (a) {
      if ("slot" === this.localName) {
        var b = this.__shady_getRootNode();b && v(b) && tc(b);return (b = q(this)) ? (a && a.flatten ? b.B : b.assignedNodes) || [] : [];
      }
    }, addEventListener: function (a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) yb.call(this, a, b, c);else {
        "object" !== typeof c && (c = { capture: !!c });var d = this.__shady_parentNode;if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");c.w = this;d.__shady_addEventListener(a, b, c);
      }
    }, removeEventListener: function (a, b, c) {
      if ("slot" !== this.localName || "slotchange" === a) Ab.call(this, a, b, c);else {
        "object" !== typeof c && (c = { capture: !!c });var d = this.__shady_parentNode;if (!d) throw Error("ShadyDOM cannot attach event to slot unless it has a `parentNode`");c.w = this;d.__shady_removeEventListener(a, b, c);
      }
    } });var Mc = window.document,
      Nc = y({ importNode: function (a, b) {
      if (a.ownerDocument !== Mc || "template" === a.localName) return this.__shady_native_importNode(a, b);var c = this.__shady_native_importNode(a, !1);if (b) for (a = a.__shady_firstChild; a; a = a.__shady_nextSibling) b = this.__shady_importNode(a, !0), c.__shady_appendChild(b);return c;
    } });var Oc = y({ addEventListener: yb.bind(window), removeEventListener: Ab.bind(window) });var K = {};Object.getOwnPropertyDescriptor(HTMLElement.prototype, "parentElement") && (K.parentElement = dc.parentElement);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "contains") && (K.contains = dc.contains);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "children") && (K.children = H.children);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML") && (K.innerHTML = lc.innerHTML);Object.getOwnPropertyDescriptor(HTMLElement.prototype, "className") && (K.className = Jc.className);
  var Pc = { EventTarget: [Fc], Node: [dc, window.EventTarget ? null : Fc], Text: [Gc], Element: [Jc, H, Gc, !t.i || "innerHTML" in Element.prototype ? lc : null, window.HTMLSlotElement ? null : Lc], HTMLElement: [Kc, K], HTMLSlotElement: [Lc], DocumentFragment: [hc, ic], Document: [Nc, hc, ic, jc], Window: [Oc] },
      Qc = t.i ? null : ["innerHTML", "textContent"];function Rc(a) {
    var b = a ? null : Qc,
        c = {},
        d;for (d in Pc) c.L = window[d] && window[d].prototype, Pc[d].forEach(function (c) {
      return function (d) {
        return c.L && d && x(c.L, d, a, b);
      };
    }(c)), c = { L: c.L };
  };if (t.R) {
    var ShadyDOM = { inUse: t.R, patch: function (a) {
        hb(a);gb(a);return a;
      }, isShadyRoot: v, enqueue: Ba, flush: Ca, flushInitial: function (a) {
        !a.U && a.A && tc(a);
      }, settings: t, filterMutations: Ia, observeChildren: Fa, unobserveChildren: Ga, deferConnectionCallbacks: t.deferConnectionCallbacks, preferPerformance: t.preferPerformance, handlesDynamicScoping: !0, wrap: t.u ? Ec : function (a) {
        return a;
      }, Wrapper: J, composedPath: qb, noPatch: t.u, nativeMethods: Ra, nativeTree: Sa };window.ShadyDOM = ShadyDOM;Za();Rc("__shady_");Object.defineProperty(document, "_activeElement", jc.activeElement);x(Window.prototype, Oc, "__shady_");t.u || (Rc(), Gb());Bb();window.Event = Db;window.CustomEvent = Eb;window.MouseEvent = Fb;window.ShadowRoot = rc;
  }; /*
     Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
     The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
     The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
     Code distributed by Google as part of the polymer project is also
     subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
     */
  function Sc() {
    this.end = this.start = 0;this.rules = this.parent = this.previous = null;this.cssText = this.parsedCssText = "";this.atRule = !1;this.type = 0;this.parsedSelector = this.selector = this.keyframesName = "";
  }
  function Tc(a) {
    a = a.replace(Uc, "").replace(Vc, "");var b = Wc,
        c = a,
        d = new Sc();d.start = 0;d.end = c.length;for (var e = d, f = 0, g = c.length; f < g; f++) if ("{" === c[f]) {
      e.rules || (e.rules = []);var h = e,
          k = h.rules[h.rules.length - 1] || null;e = new Sc();e.start = f + 1;e.parent = h;e.previous = k;h.rules.push(e);
    } else "}" === c[f] && (e.end = f + 1, e = e.parent || d);return b(d, a);
  }
  function Wc(a, b) {
    var c = b.substring(a.start, a.end - 1);a.parsedCssText = a.cssText = c.trim();a.parent && (c = b.substring(a.previous ? a.previous.end : a.parent.start, a.start - 1), c = Xc(c), c = c.replace(Yc, " "), c = c.substring(c.lastIndexOf(";") + 1), c = a.parsedSelector = a.selector = c.trim(), a.atRule = 0 === c.indexOf("@"), a.atRule ? 0 === c.indexOf("@media") ? a.type = Zc : c.match($c) && (a.type = ad, a.keyframesName = a.selector.split(Yc).pop()) : a.type = 0 === c.indexOf("--") ? bd : cd);if (c = a.rules) for (var d = 0, e = c.length, f = void 0; d < e && (f = c[d]); d++) Wc(f, b);return a;
  }function Xc(a) {
    return a.replace(/\\([0-9a-f]{1,6})\s/gi, function (a, c) {
      a = c;for (c = 6 - a.length; c--;) a = "0" + a;return "\\" + a;
    });
  }
  function dd(a, b, c) {
    c = void 0 === c ? "" : c;var d = "";if (a.cssText || a.rules) {
      var e = a.rules,
          f;if (f = e) f = e[0], f = !(f && f.selector && 0 === f.selector.indexOf("--"));if (f) {
        f = 0;for (var g = e.length, h = void 0; f < g && (h = e[f]); f++) d = dd(h, b, d);
      } else b ? b = a.cssText : (b = a.cssText, b = b.replace(ed, "").replace(fd, ""), b = b.replace(gd, "").replace(hd, "")), (d = b.trim()) && (d = "  " + d + "\n");
    }d && (a.selector && (c += a.selector + " {\n"), c += d, a.selector && (c += "}\n\n"));return c;
  }
  var cd = 1,
      ad = 7,
      Zc = 4,
      bd = 1E3,
      Uc = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
      Vc = /@import[^;]*;/gim,
      ed = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      fd = /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      gd = /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      hd = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      $c = /^@[^\s]*keyframes/,
      Yc = /\s+/g;var L = !(window.ShadyDOM && window.ShadyDOM.inUse),
      id;function jd(a) {
    id = a && a.shimcssproperties ? !1 : L || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)"));
  }var kd;window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (kd = window.ShadyCSS.cssBuild);var M = !(!window.ShadyCSS || !window.ShadyCSS.disableRuntime);
  window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? id = window.ShadyCSS.nativeCss : window.ShadyCSS ? (jd(window.ShadyCSS), window.ShadyCSS = void 0) : jd(window.WebComponents && window.WebComponents.flags);var N = id,
      ld = kd;var md = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
      nd = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
      od = /(--[\w-]+)\s*([:,;)]|$)/gi,
      pd = /(animation\s*:)|(animation-name\s*:)/,
      qd = /@media\s(.*)/,
      rd = /\{[^}]*\}/g;var sd = new Set();function O(a, b) {
    if (!a) return "";"string" === typeof a && (a = Tc(a));b && P(a, b);return dd(a, N);
  }function td(a) {
    !a.__cssRules && a.textContent && (a.__cssRules = Tc(a.textContent));return a.__cssRules || null;
  }function ud(a) {
    return !!a.parent && a.parent.type === ad;
  }function P(a, b, c, d) {
    if (a) {
      var e = !1,
          f = a.type;if (d && f === Zc) {
        var g = a.selector.match(qd);g && (window.matchMedia(g[1]).matches || (e = !0));
      }f === cd ? b(a) : c && f === ad ? c(a) : f === bd && (e = !0);if ((a = a.rules) && !e) for (e = 0, f = a.length, g = void 0; e < f && (g = a[e]); e++) P(g, b, c, d);
    }
  }
  function vd(a, b, c, d) {
    var e = document.createElement("style");b && e.setAttribute("scope", b);e.textContent = a;wd(e, c, d);return e;
  }var Q = null;function xd(a) {
    a = document.createComment(" Shady DOM styles for " + a + " ");var b = document.head;b.insertBefore(a, (Q ? Q.nextSibling : null) || b.firstChild);return Q = a;
  }function wd(a, b, c) {
    b = b || document.head;b.insertBefore(a, c && c.nextSibling || b.firstChild);Q ? a.compareDocumentPosition(Q) === Node.DOCUMENT_POSITION_PRECEDING && (Q = a) : Q = a;
  }
  function yd(a, b) {
    for (var c = 0, d = a.length; b < d; b++) if ("(" === a[b]) c++;else if (")" === a[b] && 0 === --c) return b;return -1;
  }function zd(a, b) {
    var c = a.indexOf("var(");if (-1 === c) return b(a, "", "", "");var d = yd(a, c + 3),
        e = a.substring(c + 4, d);c = a.substring(0, c);a = zd(a.substring(d + 1), b);d = e.indexOf(",");return -1 === d ? b(c, e.trim(), "", a) : b(c, e.substring(0, d).trim(), e.substring(d + 1).trim(), a);
  }function Ad(a, b) {
    L ? a.setAttribute("class", b) : window.ShadyDOM.nativeMethods.setAttribute.call(a, "class", b);
  }
  var Bd = window.ShadyDOM && window.ShadyDOM.wrap || function (a) {
    return a;
  };function R(a) {
    var b = a.localName,
        c = "";b ? -1 < b.indexOf("-") || (c = b, b = a.getAttribute && a.getAttribute("is") || "") : (b = a.is, c = a.extends);return { is: b, F: c };
  }function Cd(a) {
    for (var b = [], c = "", d = 0; 0 <= d && d < a.length; d++) if ("(" === a[d]) {
      var e = yd(a, d);c += a.slice(d, e + 1);d = e;
    } else "," === a[d] ? (b.push(c), c = "") : c += a[d];c && b.push(c);return b;
  }
  function S(a) {
    if (void 0 !== ld) return ld;if (void 0 === a.__cssBuild) {
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
  function Dd(a) {
    a = void 0 === a ? "" : a;return "" !== a && N ? L ? "shadow" === a : "shady" === a : !1;
  };function Ed() {}function Fd(a, b) {
    Gd(T, a, function (a) {
      U(a, b || "");
    });
  }function Gd(a, b, c) {
    b.nodeType === Node.ELEMENT_NODE && c(b);var d;"template" === b.localName ? d = (b.content || b._content || b).childNodes : d = b.children || b.childNodes;if (d) for (b = 0; b < d.length; b++) Gd(a, d[b], c);
  }
  function U(a, b, c) {
    if (b) if (a.classList) c ? (a.classList.remove("style-scope"), a.classList.remove(b)) : (a.classList.add("style-scope"), a.classList.add(b));else if (a.getAttribute) {
      var d = a.getAttribute("class");c ? d && (b = d.replace("style-scope", "").replace(b, ""), Ad(a, b)) : Ad(a, (d ? d + " " : "") + "style-scope " + b);
    }
  }function Hd(a, b, c) {
    Gd(T, a, function (a) {
      U(a, b, !0);U(a, c);
    });
  }function Id(a, b) {
    Gd(T, a, function (a) {
      U(a, b || "", !0);
    });
  }
  function Jd(a, b, c, d, e) {
    var f = T;e = void 0 === e ? "" : e;"" === e && (L || "shady" === (void 0 === d ? "" : d) ? e = O(b, c) : (a = R(a), e = Kd(f, b, a.is, a.F, c) + "\n\n"));return e.trim();
  }function Kd(a, b, c, d, e) {
    var f = Ld(c, d);c = c ? "." + c : "";return O(b, function (b) {
      b.c || (b.selector = b.g = Md(a, b, a.b, c, f), b.c = !0);e && e(b, c, f);
    });
  }function Ld(a, b) {
    return b ? "[is=" + a + "]" : a;
  }
  function Md(a, b, c, d, e) {
    var f = Cd(b.selector);if (!ud(b)) {
      b = 0;for (var g = f.length, h = void 0; b < g && (h = f[b]); b++) f[b] = c.call(a, h, d, e);
    }return f.filter(function (a) {
      return !!a;
    }).join(",");
  }function Nd(a) {
    return a.replace(Od, function (a, c, d) {
      -1 < d.indexOf("+") ? d = d.replace(/\+/g, "___") : -1 < d.indexOf("___") && (d = d.replace(/___/g, "+"));return ":" + c + "(" + d + ")";
    });
  }
  function Pd(a) {
    for (var b = [], c; c = a.match(Qd);) {
      var d = c.index,
          e = yd(a, d);if (-1 === e) throw Error(c.input + " selector missing ')'");c = a.slice(d, e + 1);a = a.replace(c, "\ue000");b.push(c);
    }return { T: a, matches: b };
  }function Rd(a, b) {
    var c = a.split("\ue000");return b.reduce(function (a, b, f) {
      return a + b + c[f + 1];
    }, c[0]);
  }
  Ed.prototype.b = function (a, b, c) {
    var d = !1;a = a.trim();var e = Od.test(a);e && (a = a.replace(Od, function (a, b, c) {
      return ":" + b + "(" + c.replace(/\s/g, "") + ")";
    }), a = Nd(a));var f = Qd.test(a);if (f) {
      var g = Pd(a);a = g.T;g = g.matches;
    }a = a.replace(Sd, ":host $1");a = a.replace(Td, function (a, e, f) {
      d || (a = Ud(f, e, b, c), d = d || a.stop, e = a.ka, f = a.value);return e + f;
    });f && (a = Rd(a, g));e && (a = Nd(a));return a = a.replace(Vd, function (a, b, c, d) {
      return '[dir="' + c + '"] ' + b + d + ", " + b + '[dir="' + c + '"]' + d;
    });
  };
  function Ud(a, b, c, d) {
    var e = a.indexOf("::slotted");0 <= a.indexOf(":host") ? a = Wd(a, d) : 0 !== e && (a = c ? Xd(a, c) : a);c = !1;0 <= e && (b = "", c = !0);if (c) {
      var f = !0;c && (a = a.replace(Yd, function (a, b) {
        return " > " + b;
      }));
    }return { value: a, ka: b, stop: f };
  }function Xd(a, b) {
    a = a.split(/(\[.+?\])/);for (var c = [], d = 0; d < a.length; d++) if (1 === d % 2) c.push(a[d]);else {
      var e = a[d];if ("" !== e || d !== a.length - 1) e = e.split(":"), e[0] += b, c.push(e.join(":"));
    }return c.join("");
  }
  function Wd(a, b) {
    var c = a.match(Zd);return (c = c && c[2].trim() || "") ? c[0].match($d) ? a.replace(Zd, function (a, c, f) {
      return b + f;
    }) : c.split($d)[0] === b ? c : "should_not_match" : a.replace(":host", b);
  }function ae(a) {
    ":root" === a.selector && (a.selector = "html");
  }Ed.prototype.c = function (a) {
    return a.match(":host") ? "" : a.match("::slotted") ? this.b(a, ":not(.style-scope)") : Xd(a.trim(), ":not(.style-scope)");
  };n.Object.defineProperties(Ed.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "style-scope";
      } } });
  var Od = /:(nth[-\w]+)\(([^)]+)\)/,
      Td = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g,
      $d = /[[.:#*]/,
      Sd = /^(::slotted)/,
      Zd = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      Yd = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
      Vd = /(.*):dir\((?:(ltr|rtl))\)(.*)/,
      Qd = /:(?:matches|any|-(?:webkit|moz)-any)/,
      T = new Ed();function V(a, b, c, d, e) {
    this.s = a || null;this.b = b || null;this.S = c || [];this.j = null;this.cssBuild = e || "";this.F = d || "";this.a = this.l = this.o = null;
  }function W(a) {
    return a ? a.__styleInfo : null;
  }function be(a, b) {
    return a.__styleInfo = b;
  }V.prototype.c = function () {
    return this.s;
  };V.prototype._getStyleRules = V.prototype.c;function ce(a) {
    var b = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;return b && b.call(this, a);
  }var de = navigator.userAgent.match("Trident");function ee() {}function fe(a) {
    var b = {},
        c = [],
        d = 0;P(a, function (a) {
      ge(a);a.index = d++;a = a.f.cssText;for (var c; c = od.exec(a);) {
        var e = c[1];":" !== c[2] && (b[e] = !0);
      }
    }, function (a) {
      c.push(a);
    });a.b = c;a = [];for (var e in b) a.push(e);return a;
  }
  function ge(a) {
    if (!a.f) {
      var b = {},
          c = {};he(a, c) && (b.m = c, a.rules = null);b.cssText = a.parsedCssText.replace(rd, "").replace(md, "");a.f = b;
    }
  }function he(a, b) {
    var c = a.f;if (c) {
      if (c.m) return Object.assign(b, c.m), !0;
    } else {
      c = a.parsedCssText;for (var d; a = md.exec(c);) {
        d = (a[2] || a[3]).trim();if ("inherit" !== d || "unset" !== d) b[a[1].trim()] = d;d = !0;
      }return d;
    }
  }
  function ie(a, b, c) {
    b && (b = 0 <= b.indexOf(";") ? je(a, b, c) : zd(b, function (b, e, f, g) {
      if (!e) return b + g;(e = ie(a, c[e], c)) && "initial" !== e ? "apply-shim-inherit" === e && (e = "inherit") : e = ie(a, c[f] || f, c) || f;return b + (e || "") + g;
    }));return b && b.trim() || "";
  }
  function je(a, b, c) {
    b = b.split(";");for (var d = 0, e, f; d < b.length; d++) if (e = b[d]) {
      nd.lastIndex = 0;if (f = nd.exec(e)) e = ie(a, c[f[1]], c);else if (f = e.indexOf(":"), -1 !== f) {
        var g = e.substring(f);g = g.trim();g = ie(a, g, c) || g;e = e.substring(0, f) + g;
      }b[d] = e && e.lastIndexOf(";") === e.length - 1 ? e.slice(0, -1) : e || "";
    }return b.join(";");
  }
  function ke(a, b) {
    var c = {},
        d = [];P(a, function (a) {
      a.f || ge(a);var e = a.g || a.parsedSelector;b && a.f.m && e && ce.call(b, e) && (he(a, c), a = a.index, e = parseInt(a / 32, 10), d[e] = (d[e] || 0) | 1 << a % 32);
    }, null, !0);return { m: c, key: d };
  }
  function le(a, b, c, d) {
    b.f || ge(b);if (b.f.m) {
      var e = R(a);a = e.is;e = e.F;e = a ? Ld(a, e) : "html";var f = b.parsedSelector,
          g = ":host > *" === f || "html" === f,
          h = 0 === f.indexOf(":host") && !g;"shady" === c && (g = f === e + " > *." + e || -1 !== f.indexOf("html"), h = !g && 0 === f.indexOf(e));if (g || h) c = e, h && (b.g || (b.g = Md(T, b, T.b, a ? "." + a : "", e)), c = b.g || e), d({ T: c, pa: h, za: g });
    }
  }function me(a, b, c) {
    var d = {},
        e = {};P(b, function (b) {
      le(a, b, c, function (c) {
        ce.call(a._element || a, c.T) && (c.pa ? he(b, d) : he(b, e));
      });
    }, null, !0);return { sa: e, oa: d };
  }
  function ne(a, b, c, d) {
    var e = R(b),
        f = Ld(e.is, e.F),
        g = new RegExp("(?:^|[^.#[:])" + (b.extends ? "\\" + f.slice(0, -1) + "\\]" : f) + "($|[.:[\\s>+~])"),
        h = W(b);e = h.s;h = h.cssBuild;var k = oe(e, d);return Jd(b, e, function (b) {
      var e = "";b.f || ge(b);b.f.cssText && (e = je(a, b.f.cssText, c));b.cssText = e;if (!L && !ud(b) && b.cssText) {
        var h = e = b.cssText;null == b.X && (b.X = pd.test(e));if (b.X) if (null == b.J) {
          b.J = [];for (var l in k) h = k[l], h = h(e), e !== h && (e = h, b.J.push(l));
        } else {
          for (l = 0; l < b.J.length; ++l) h = k[b.J[l]], e = h(e);h = e;
        }b.cssText = h;b.g = b.g || b.selector;
        e = "." + d;l = Cd(b.g);h = 0;for (var ba = l.length, Ha = void 0; h < ba && (Ha = l[h]); h++) l[h] = Ha.match(g) ? Ha.replace(f, e) : e + " " + Ha;b.selector = l.join(",");
      }
    }, h);
  }function oe(a, b) {
    a = a.b;var c = {};if (!L && a) for (var d = 0, e = a[d]; d < a.length; e = a[++d]) {
      var f = e,
          g = b;f.h = new RegExp("\\b" + f.keyframesName + "(?!\\B|-)", "g");f.a = f.keyframesName + "-" + g;f.g = f.g || f.selector;f.selector = f.g.replace(f.keyframesName, f.a);c[e.keyframesName] = pe(e);
    }return c;
  }function pe(a) {
    return function (b) {
      return b.replace(a.h, a.a);
    };
  }
  function qe(a, b) {
    var c = re,
        d = td(a);a.textContent = O(d, function (a) {
      var d = a.cssText = a.parsedCssText;a.f && a.f.cssText && (d = d.replace(ed, "").replace(fd, ""), a.cssText = je(c, d, b));
    });
  }n.Object.defineProperties(ee.prototype, { a: { configurable: !0, enumerable: !0, get: function () {
        return "x-scope";
      } } });var re = new ee();var X = {},
      se = window.customElements;if (se && !L && !M) {
    var te = se.define;se.define = function (a, b, c) {
      X[a] || (X[a] = xd(a));te.call(se, a, b, c);
    };
  };function ue() {
    this.cache = {};
  }ue.prototype.store = function (a, b, c, d) {
    var e = this.cache[a] || [];e.push({ m: b, styleElement: c, l: d });100 < e.length && e.shift();this.cache[a] = e;
  };function ve() {}var we = new RegExp(T.a + "\\s*([^\\s]*)");function xe(a) {
    return (a = (a.classList && a.classList.value ? a.classList.value : a.getAttribute("class") || "").match(we)) ? a[1] : "";
  }function ye(a) {
    var b = Bd(a).getRootNode();return b === a || b === a.ownerDocument ? "" : (a = b.host) ? R(a).is : "";
  }
  function ze(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b];if (c.target !== document.documentElement && c.target !== document.head) for (var d = 0; d < c.addedNodes.length; d++) {
        var e = c.addedNodes[d];if (e.nodeType === Node.ELEMENT_NODE) {
          var f = e.getRootNode(),
              g = xe(e);if (g && f === e.ownerDocument && ("style" !== e.localName && "template" !== e.localName || "" === S(e))) Id(e, g);else if (f instanceof ShadowRoot) for (f = ye(e), f !== g && Hd(e, g, f), e = window.ShadyDOM.nativeMethods.querySelectorAll.call(e, ":not(." + T.a + ")"), g = 0; g < e.length; g++) {
            f = e[g];
            var h = ye(f);h && U(f, h);
          }
        }
      }
    }
  }
  if (!(L || window.ShadyDOM && window.ShadyDOM.handlesDynamicScoping)) {
    var Ae = new MutationObserver(ze),
        Be = function (a) {
      Ae.observe(a, { childList: !0, subtree: !0 });
    };if (window.customElements && !window.customElements.polyfillWrapFlushCallback) Be(document);else {
      var Ce = function () {
        Be(document.body);
      };window.HTMLImports ? window.HTMLImports.whenReady(Ce) : requestAnimationFrame(function () {
        if ("loading" === document.readyState) {
          var a = function () {
            Ce();document.removeEventListener("readystatechange", a);
          };document.addEventListener("readystatechange", a);
        } else Ce();
      });
    }ve = function () {
      ze(Ae.takeRecords());
    };
  }var De = ve;var Ee = {};var Fe = Promise.resolve();function Ge(a) {
    if (a = Ee[a]) a._applyShimCurrentVersion = a._applyShimCurrentVersion || 0, a._applyShimValidatingVersion = a._applyShimValidatingVersion || 0, a._applyShimNextVersion = (a._applyShimNextVersion || 0) + 1;
  }function He(a) {
    return a._applyShimCurrentVersion === a._applyShimNextVersion;
  }function Ie(a) {
    a._applyShimValidatingVersion = a._applyShimNextVersion;a._validating || (a._validating = !0, Fe.then(function () {
      a._applyShimCurrentVersion = a._applyShimNextVersion;a._validating = !1;
    }));
  };var Je = {},
      Ke = new ue();function Y() {
    this.W = {};this.c = document.documentElement;var a = new Sc();a.rules = [];this.h = be(this.c, new V(a));this.P = !1;this.b = this.a = null;
  }m = Y.prototype;m.flush = function () {
    De();
  };m.ma = function (a) {
    return td(a);
  };m.wa = function (a) {
    return O(a);
  };m.prepareTemplate = function (a, b, c) {
    this.prepareTemplateDom(a, b);this.prepareTemplateStyles(a, b, c);
  };
  m.prepareTemplateStyles = function (a, b, c) {
    if (!a._prepared && !M) {
      L || X[b] || (X[b] = xd(b));a._prepared = !0;a.name = b;a.extends = c;Ee[b] = a;var d = S(a),
          e = Dd(d);c = { is: b, extends: c };for (var f = [], g = a.content.querySelectorAll("style"), h = 0; h < g.length; h++) {
        var k = g[h];if (k.hasAttribute("shady-unscoped")) {
          if (!L) {
            var l = k.textContent;sd.has(l) || (sd.add(l), l = k.cloneNode(!0), document.head.appendChild(l));k.parentNode.removeChild(k);
          }
        } else f.push(k.textContent), k.parentNode.removeChild(k);
      }f = f.join("").trim() + (Je[b] || "");Le(this);
      if (!e) {
        if (g = !d) g = nd.test(f) || md.test(f), nd.lastIndex = 0, md.lastIndex = 0;h = Tc(f);g && N && this.a && this.a.transformRules(h, b);a._styleAst = h;
      }g = [];N || (g = fe(a._styleAst));if (!g.length || N) h = L ? a.content : null, b = X[b] || null, d = Jd(c, a._styleAst, null, d, e ? f : ""), d = d.length ? vd(d, c.is, h, b) : null, a._style = d;a.a = g;
    }
  };m.qa = function (a, b) {
    Je[b] = a.join(" ");
  };m.prepareTemplateDom = function (a, b) {
    if (!M) {
      var c = S(a);L || "shady" === c || a._domPrepared || (a._domPrepared = !0, Fd(a.content, b));
    }
  };
  function Me(a) {
    var b = R(a),
        c = b.is;b = b.F;var d = X[c] || null,
        e = Ee[c];if (e) {
      c = e._styleAst;var f = e.a;e = S(e);b = new V(c, d, f, b, e);be(a, b);return b;
    }
  }function Ne(a) {
    !a.b && window.ShadyCSS && window.ShadyCSS.CustomStyleInterface && (a.b = window.ShadyCSS.CustomStyleInterface, a.b.transformCallback = function (b) {
      a.aa(b);
    }, a.b.validateCallback = function () {
      requestAnimationFrame(function () {
        (a.b.enqueued || a.P) && a.flushCustomStyles();
      });
    });
  }
  function Le(a) {
    !a.a && window.ShadyCSS && window.ShadyCSS.ApplyShim && (a.a = window.ShadyCSS.ApplyShim, a.a.invalidCallback = Ge);Ne(a);
  }
  m.flushCustomStyles = function () {
    if (!M && (Le(this), this.b)) {
      var a = this.b.processStyles();if (this.b.enqueued && !Dd(this.h.cssBuild)) {
        if (N) {
          if (!this.h.cssBuild) for (var b = 0; b < a.length; b++) {
            var c = this.b.getStyleForCustomStyle(a[b]);if (c && N && this.a) {
              var d = td(c);Le(this);this.a.transformRules(d);c.textContent = O(d);
            }
          }
        } else {
          Oe(this, this.c, this.h);for (b = 0; b < a.length; b++) (c = this.b.getStyleForCustomStyle(a[b])) && qe(c, this.h.o);this.P && this.styleDocument();
        }this.b.enqueued = !1;
      }
    }
  };
  m.styleElement = function (a, b) {
    if (M) {
      if (b) {
        W(a) || be(a, new V(null));var c = W(a);c.j = c.j || {};Object.assign(c.j, b);Pe(this, a, c);
      }
    } else if (c = W(a) || Me(a)) if (a !== this.c && (this.P = !0), b && (c.j = c.j || {}, Object.assign(c.j, b)), N) Pe(this, a, c);else if (this.flush(), Oe(this, a, c), c.S && c.S.length) {
      b = R(a).is;var d;a: {
        if (d = Ke.cache[b]) for (var e = d.length - 1; 0 <= e; e--) {
          var f = d[e];b: {
            var g = c.S;for (var h = 0; h < g.length; h++) {
              var k = g[h];if (f.m[k] !== c.o[k]) {
                g = !1;break b;
              }
            }g = !0;
          }if (g) {
            d = f;break a;
          }
        }d = void 0;
      }g = d ? d.styleElement : null;e = c.l;
      (f = d && d.l) || (f = this.W[b] = (this.W[b] || 0) + 1, f = b + "-" + f);c.l = f;f = c.l;h = re;h = g ? g.textContent || "" : ne(h, a, c.o, f);k = W(a);var l = k.a;l && !L && l !== g && (l._useCount--, 0 >= l._useCount && l.parentNode && l.parentNode.removeChild(l));L ? k.a ? (k.a.textContent = h, g = k.a) : h && (g = vd(h, f, a.shadowRoot, k.b)) : g ? g.parentNode || (de && -1 < h.indexOf("@media") && (g.textContent = h), wd(g, null, k.b)) : h && (g = vd(h, f, null, k.b));g && (g._useCount = g._useCount || 0, k.a != g && g._useCount++, k.a = g);f = g;L || (g = c.l, k = h = a.getAttribute("class") || "", e && (k = h.replace(new RegExp("\\s*x-scope\\s*" + e + "\\s*", "g"), " ")), k += (k ? " " : "") + "x-scope " + g, h !== k && Ad(a, k));d || Ke.store(b, c.o, f, c.l);
    }
  };
  function Pe(a, b, c) {
    var d = R(b).is;if (c.j) {
      var e = c.j,
          f;for (f in e) null === f ? b.style.removeProperty(f) : b.style.setProperty(f, e[f]);
    }e = Ee[d];if (!(!e && b !== a.c || e && "" !== S(e)) && e && e._style && !He(e)) {
      if (He(e) || e._applyShimValidatingVersion !== e._applyShimNextVersion) Le(a), a.a && a.a.transformRules(e._styleAst, d), e._style.textContent = Jd(b, c.s), Ie(e);L && (a = b.shadowRoot) && (a = a.querySelector("style")) && (a.textContent = Jd(b, c.s));c.s = e._styleAst;
    }
  }
  function Qe(a, b) {
    return (b = Bd(b).getRootNode().host) ? W(b) || Me(b) ? b : Qe(a, b) : a.c;
  }function Oe(a, b, c) {
    var d = Qe(a, b),
        e = W(d),
        f = e.o;d === a.c || f || (Oe(a, d, e), f = e.o);a = Object.create(f || null);d = me(b, c.s, c.cssBuild);b = ke(e.s, b).m;Object.assign(a, d.oa, b, d.sa);b = c.j;for (var g in b) if ((e = b[g]) || 0 === e) a[g] = e;g = re;b = Object.getOwnPropertyNames(a);for (e = 0; e < b.length; e++) d = b[e], a[d] = ie(g, a[d], a);c.o = a;
  }m.styleDocument = function (a) {
    this.styleSubtree(this.c, a);
  };
  m.styleSubtree = function (a, b) {
    var c = Bd(a),
        d = c.shadowRoot;(d || a === this.c) && this.styleElement(a, b);if (a = d && (d.children || d.childNodes)) for (c = 0; c < a.length; c++) this.styleSubtree(a[c]);else if (c = c.children || c.childNodes) for (a = 0; a < c.length; a++) this.styleSubtree(c[a]);
  };
  m.aa = function (a) {
    var b = this,
        c = S(a);c !== this.h.cssBuild && (this.h.cssBuild = c);if (!Dd(c)) {
      var d = td(a);P(d, function (a) {
        if (L) ae(a);else {
          var d = T;a.selector = a.parsedSelector;ae(a);a.selector = a.g = Md(d, a, d.c, void 0, void 0);
        }N && "" === c && (Le(b), b.a && b.a.transformRule(a));
      });N ? a.textContent = O(d) : this.h.s.rules.push(d);
    }
  };m.getComputedStyleValue = function (a, b) {
    var c;N || (c = (W(a) || W(Qe(this, a))).o[b]);return (c = c || window.getComputedStyle(a).getPropertyValue(b)) ? c.trim() : "";
  };
  m.va = function (a, b) {
    var c = Bd(a).getRootNode();b = b ? b.split(/\s/) : [];c = c.host && c.host.localName;if (!c) {
      var d = a.getAttribute("class");if (d) {
        d = d.split(/\s/);for (var e = 0; e < d.length; e++) if (d[e] === T.a) {
          c = d[e + 1];break;
        }
      }
    }c && b.push(T.a, c);N || (c = W(a)) && c.l && b.push(re.a, c.l);Ad(a, b.join(" "));
  };m.ja = function (a) {
    return W(a);
  };m.ua = function (a, b) {
    U(a, b);
  };m.xa = function (a, b) {
    U(a, b, !0);
  };m.ta = function (a) {
    return ye(a);
  };m.la = function (a) {
    return xe(a);
  };Y.prototype.flush = Y.prototype.flush;Y.prototype.prepareTemplate = Y.prototype.prepareTemplate;
  Y.prototype.styleElement = Y.prototype.styleElement;Y.prototype.styleDocument = Y.prototype.styleDocument;Y.prototype.styleSubtree = Y.prototype.styleSubtree;Y.prototype.getComputedStyleValue = Y.prototype.getComputedStyleValue;Y.prototype.setElementClass = Y.prototype.va;Y.prototype._styleInfoForNode = Y.prototype.ja;Y.prototype.transformCustomStyleForDocument = Y.prototype.aa;Y.prototype.getStyleAst = Y.prototype.ma;Y.prototype.styleAstToString = Y.prototype.wa;Y.prototype.flushCustomStyles = Y.prototype.flushCustomStyles;
  Y.prototype.scopeNode = Y.prototype.ua;Y.prototype.unscopeNode = Y.prototype.xa;Y.prototype.scopeForNode = Y.prototype.ta;Y.prototype.currentScopeForNode = Y.prototype.la;Y.prototype.prepareAdoptedCssText = Y.prototype.qa;Object.defineProperties(Y.prototype, { nativeShadow: { get: function () {
        return L;
      } }, nativeCss: { get: function () {
        return N;
      } } });var Z = new Y(),
      Re,
      Se;window.ShadyCSS && (Re = window.ShadyCSS.ApplyShim, Se = window.ShadyCSS.CustomStyleInterface);
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
    }, nativeCss: N, nativeShadow: L, cssBuild: ld, disableRuntime: M };Re && (window.ShadyCSS.ApplyShim = Re);Se && (window.ShadyCSS.CustomStyleInterface = Se);
}).call(this);

//# sourceMappingURL=webcomponents-sd.js.map