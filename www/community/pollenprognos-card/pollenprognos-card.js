var td = Object.defineProperty;
var rd = (t, e, r) => e in t ? td(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var N = (t, e, r) => rd(t, typeof e != "symbol" ? e + "" : e, r);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ri = window, qo = ri.ShadowRoot && (ri.ShadyCSS === void 0 || ri.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Xo = Symbol(), fs = /* @__PURE__ */ new WeakMap();
let _a = class {
  constructor(e, r, i) {
    if (this._$cssResult$ = !0, i !== Xo) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (qo && e === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (e = fs.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && fs.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const id = (t) => new _a(typeof t == "string" ? t : t + "", void 0, Xo), ga = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce(((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[s + 1]), t[0]);
  return new _a(r, t, Xo);
}, od = (t, e) => {
  qo ? t.adoptedStyleSheets = e.map(((r) => r instanceof CSSStyleSheet ? r : r.styleSheet)) : e.forEach(((r) => {
    const i = document.createElement("style"), o = ri.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = r.cssText, t.appendChild(i);
  }));
}, ms = qo ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const i of e.cssRules) r += i.cssText;
  return id(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ji;
const pi = window, ys = pi.trustedTypes, sd = ys ? ys.emptyScript : "", vs = pi.reactiveElementPolyfillSupport, po = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? sd : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, pa = (t, e) => e !== t && (e == e || t == t), Fi = { attribute: !0, type: String, converter: po, reflect: !1, hasChanged: pa }, fo = "finalized";
let Ot = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(e) {
    var r;
    this.finalize(), ((r = this.h) !== null && r !== void 0 ? r : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach(((r, i) => {
      const o = this._$Ep(i, r);
      o !== void 0 && (this._$Ev.set(o, i), e.push(o));
    })), e;
  }
  static createProperty(e, r = Fi) {
    if (r.state && (r.attribute = !1), this.finalize(), this.elementProperties.set(e, r), !r.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const i = typeof e == "symbol" ? Symbol() : "__" + e, o = this.getPropertyDescriptor(e, i, r);
      o !== void 0 && Object.defineProperty(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, r, i) {
    return { get() {
      return this[r];
    }, set(o) {
      const s = this[e];
      this[r] = o, this.requestUpdate(e, s, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || Fi;
  }
  static finalize() {
    if (this.hasOwnProperty(fo)) return !1;
    this[fo] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const r = this.properties, i = [...Object.getOwnPropertyNames(r), ...Object.getOwnPropertySymbols(r)];
      for (const o of i) this.createProperty(o, r[o]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) r.unshift(ms(o));
    } else e !== void 0 && r.push(ms(e));
    return r;
  }
  static _$Ep(e, r) {
    const i = r.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  _$Eu() {
    var e;
    this._$E_ = new Promise(((r) => this.enableUpdating = r)), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach(((r) => r(this)));
  }
  addController(e) {
    var r, i;
    ((r = this._$ES) !== null && r !== void 0 ? r : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) === null || i === void 0 || i.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$ES) === null || r === void 0 || r.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach(((e, r) => {
      this.hasOwnProperty(r) && (this._$Ei.set(r, this[r]), delete this[r]);
    }));
  }
  createRenderRoot() {
    var e;
    const r = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return od(r, this.constructor.elementStyles), r;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach(((r) => {
      var i;
      return (i = r.hostConnected) === null || i === void 0 ? void 0 : i.call(r);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach(((r) => {
      var i;
      return (i = r.hostDisconnected) === null || i === void 0 ? void 0 : i.call(r);
    }));
  }
  attributeChangedCallback(e, r, i) {
    this._$AK(e, i);
  }
  _$EO(e, r, i = Fi) {
    var o;
    const s = this.constructor._$Ep(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) === null || o === void 0 ? void 0 : o.toAttribute) !== void 0 ? i.converter : po).toAttribute(r, i.type);
      this._$El = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$El = null;
    }
  }
  _$AK(e, r) {
    var i;
    const o = this.constructor, s = o._$Ev.get(e);
    if (s !== void 0 && this._$El !== s) {
      const a = o.getPropertyOptions(s), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? a.converter : po;
      this._$El = s, this[s] = n.fromAttribute(r, a.type), this._$El = null;
    }
  }
  requestUpdate(e, r, i) {
    let o = !0;
    e !== void 0 && (((i = i || this.constructor.getPropertyOptions(e)).hasChanged || pa)(this[e], r) ? (this._$AL.has(e) || this._$AL.set(e, r), i.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, i))) : o = !1), !this.isUpdatePending && o && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach(((o, s) => this[s] = o)), this._$Ei = void 0);
    let r = !1;
    const i = this._$AL;
    try {
      r = this.shouldUpdate(i), r ? (this.willUpdate(i), (e = this._$ES) === null || e === void 0 || e.forEach(((o) => {
        var s;
        return (s = o.hostUpdate) === null || s === void 0 ? void 0 : s.call(o);
      })), this.update(i)) : this._$Ek();
    } catch (o) {
      throw r = !1, this._$Ek(), o;
    }
    r && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$ES) === null || r === void 0 || r.forEach(((i) => {
      var o;
      return (o = i.hostUpdated) === null || o === void 0 ? void 0 : o.call(i);
    })), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach(((r, i) => this._$EO(i, this[i], r))), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ot[fo] = !0, Ot.elementProperties = /* @__PURE__ */ new Map(), Ot.elementStyles = [], Ot.shadowRootOptions = { mode: "open" }, vs == null || vs({ ReactiveElement: Ot }), ((ji = pi.reactiveElementVersions) !== null && ji !== void 0 ? ji : pi.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Vi;
const fi = window, jt = fi.trustedTypes, bs = jt ? jt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, mo = "$lit$", Ge = `lit$${(Math.random() + "").slice(9)}$`, fa = "?" + Ge, nd = `<${fa}>`, kt = document, wr = () => kt.createComment(""), kr = (t) => t === null || typeof t != "object" && typeof t != "function", ma = Array.isArray, ad = (t) => ma(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Gi = `[ 	
\f\r]`, Jt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xs = /-->/g, ws = />/g, dt = RegExp(`>|${Gi}(?:([^\\s"'>=/]+)(${Gi}*=${Gi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ks = /'/g, Ss = /"/g, ya = /^(?:script|style|textarea|title)$/i, ld = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), j = ld(1), St = Symbol.for("lit-noChange"), ce = Symbol.for("lit-nothing"), As = /* @__PURE__ */ new WeakMap(), ft = kt.createTreeWalker(kt, 129, null, !1);
function va(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bs !== void 0 ? bs.createHTML(e) : e;
}
const dd = (t, e) => {
  const r = t.length - 1, i = [];
  let o, s = e === 2 ? "<svg>" : "", a = Jt;
  for (let n = 0; n < r; n++) {
    const l = t[n];
    let d, c, h = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, c = a.exec(l), c !== null); ) u = a.lastIndex, a === Jt ? c[1] === "!--" ? a = xs : c[1] !== void 0 ? a = ws : c[2] !== void 0 ? (ya.test(c[2]) && (o = RegExp("</" + c[2], "g")), a = dt) : c[3] !== void 0 && (a = dt) : a === dt ? c[0] === ">" ? (a = o ?? Jt, h = -1) : c[1] === void 0 ? h = -2 : (h = a.lastIndex - c[2].length, d = c[1], a = c[3] === void 0 ? dt : c[3] === '"' ? Ss : ks) : a === Ss || a === ks ? a = dt : a === xs || a === ws ? a = Jt : (a = dt, o = void 0);
    const _ = a === dt && t[n + 1].startsWith("/>") ? " " : "";
    s += a === Jt ? l + nd : h >= 0 ? (i.push(d), l.slice(0, h) + mo + l.slice(h) + Ge + _) : l + Ge + (h === -2 ? (i.push(void 0), n) : _);
  }
  return [va(t, s + (t[r] || "<?>") + (e === 2 ? "</svg>" : "")), i];
};
class Sr {
  constructor({ strings: e, _$litType$: r }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const n = e.length - 1, l = this.parts, [d, c] = dd(e, r);
    if (this.el = Sr.createElement(d, i), ft.currentNode = this.el.content, r === 2) {
      const h = this.el.content, u = h.firstChild;
      u.remove(), h.append(...u.childNodes);
    }
    for (; (o = ft.nextNode()) !== null && l.length < n; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) {
          const h = [];
          for (const u of o.getAttributeNames()) if (u.endsWith(mo) || u.startsWith(Ge)) {
            const _ = c[a++];
            if (h.push(u), _ !== void 0) {
              const p = o.getAttribute(_.toLowerCase() + mo).split(Ge), f = /([.?@])?(.*)/.exec(_);
              l.push({ type: 1, index: s, name: f[2], strings: p, ctor: f[1] === "." ? hd : f[1] === "?" ? _d : f[1] === "@" ? gd : Ci });
            } else l.push({ type: 6, index: s });
          }
          for (const u of h) o.removeAttribute(u);
        }
        if (ya.test(o.tagName)) {
          const h = o.textContent.split(Ge), u = h.length - 1;
          if (u > 0) {
            o.textContent = jt ? jt.emptyScript : "";
            for (let _ = 0; _ < u; _++) o.append(h[_], wr()), ft.nextNode(), l.push({ type: 2, index: ++s });
            o.append(h[u], wr());
          }
        }
      } else if (o.nodeType === 8) if (o.data === fa) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(Ge, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += Ge.length - 1;
      }
      s++;
    }
  }
  static createElement(e, r) {
    const i = kt.createElement("template");
    return i.innerHTML = e, i;
  }
}
function Ft(t, e, r = t, i) {
  var o, s, a, n;
  if (e === St) return e;
  let l = i !== void 0 ? (o = r._$Co) === null || o === void 0 ? void 0 : o[i] : r._$Cl;
  const d = kr(e) ? void 0 : e._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== d && ((s = l == null ? void 0 : l._$AO) === null || s === void 0 || s.call(l, !1), d === void 0 ? l = void 0 : (l = new d(t), l._$AT(t, r, i)), i !== void 0 ? ((a = (n = r)._$Co) !== null && a !== void 0 ? a : n._$Co = [])[i] = l : r._$Cl = l), l !== void 0 && (e = Ft(t, l._$AS(t, e.values), l, i)), e;
}
class cd {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var r;
    const { el: { content: i }, parts: o } = this._$AD, s = ((r = e == null ? void 0 : e.creationScope) !== null && r !== void 0 ? r : kt).importNode(i, !0);
    ft.currentNode = s;
    let a = ft.nextNode(), n = 0, l = 0, d = o[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let c;
        d.type === 2 ? c = new Ir(a, a.nextSibling, this, e) : d.type === 1 ? c = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (c = new pd(a, this, e)), this._$AV.push(c), d = o[++l];
      }
      n !== (d == null ? void 0 : d.index) && (a = ft.nextNode(), n++);
    }
    return ft.currentNode = kt, s;
  }
  v(e) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, r), r += i.strings.length - 2) : i._$AI(e[r])), r++;
  }
}
class Ir {
  constructor(e, r, i, o) {
    var s;
    this.type = 2, this._$AH = ce, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = i, this.options = o, this._$Cp = (s = o == null ? void 0 : o.isConnected) === null || s === void 0 || s;
  }
  get _$AU() {
    var e, r;
    return (r = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && r !== void 0 ? r : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = Ft(this, e, r), kr(e) ? e === ce || e == null || e === "" ? (this._$AH !== ce && this._$AR(), this._$AH = ce) : e !== this._$AH && e !== St && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : ad(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== ce && kr(this._$AH) ? this._$AA.nextSibling.data = e : this.$(kt.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var r;
    const { values: i, _$litType$: o } = e, s = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = Sr.createElement(va(o.h, o.h[0]), this.options)), o);
    if (((r = this._$AH) === null || r === void 0 ? void 0 : r._$AD) === s) this._$AH.v(i);
    else {
      const a = new cd(s, this), n = a.u(this.options);
      a.v(i), this.$(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let r = As.get(e.strings);
    return r === void 0 && As.set(e.strings, r = new Sr(e)), r;
  }
  T(e) {
    ma(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, o = 0;
    for (const s of e) o === r.length ? r.push(i = new Ir(this.k(wr()), this.k(wr()), this, this.options)) : i = r[o], i._$AI(s), o++;
    o < r.length && (this._$AR(i && i._$AB.nextSibling, o), r.length = o);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, r); e && e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cp = e, (r = this._$AP) === null || r === void 0 || r.call(this, e));
  }
}
class Ci {
  constructor(e, r, i, o, s) {
    this.type = 1, this._$AH = ce, this._$AN = void 0, this.element = e, this.name = r, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = ce;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, r = this, i, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = Ft(this, e, r, 0), a = !kr(e) || e !== this._$AH && e !== St, a && (this._$AH = e);
    else {
      const n = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = Ft(this, n[i + l], r, l), d === St && (d = this._$AH[l]), a || (a = !kr(d) || d !== this._$AH[l]), d === ce ? e = ce : e !== ce && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(e);
  }
  j(e) {
    e === ce ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class hd extends Ci {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === ce ? void 0 : e;
  }
}
const ud = jt ? jt.emptyScript : "";
class _d extends Ci {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== ce ? this.element.setAttribute(this.name, ud) : this.element.removeAttribute(this.name);
  }
}
class gd extends Ci {
  constructor(e, r, i, o, s) {
    super(e, r, i, o, s), this.type = 5;
  }
  _$AI(e, r = this) {
    var i;
    if ((e = (i = Ft(this, e, r, 0)) !== null && i !== void 0 ? i : ce) === St) return;
    const o = this._$AH, s = e === ce && o !== ce || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, a = e !== ce && (o === ce || s);
    s && this.element.removeEventListener(this.name, this, o), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (r = this.options) === null || r === void 0 ? void 0 : r.host) !== null && i !== void 0 ? i : this.element, e) : this._$AH.handleEvent(e);
  }
}
class pd {
  constructor(e, r, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ft(this, e);
  }
}
const Ps = fi.litHtmlPolyfillSupport;
Ps == null || Ps(Sr, Ir), ((Vi = fi.litHtmlVersions) !== null && Vi !== void 0 ? Vi : fi.litHtmlVersions = []).push("2.8.0");
const fd = (t, e, r) => {
  var i, o;
  const s = (i = r == null ? void 0 : r.renderBefore) !== null && i !== void 0 ? i : e;
  let a = s._$litPart$;
  if (a === void 0) {
    const n = (o = r == null ? void 0 : r.renderBefore) !== null && o !== void 0 ? o : null;
    s._$litPart$ = a = new Ir(e.insertBefore(wr(), n), n, void 0, r ?? {});
  }
  return a._$AI(t), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Wi, Ui;
class Rt extends Ot {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, r;
    const i = super.createRenderRoot();
    return (e = (r = this.renderOptions).renderBefore) !== null && e !== void 0 || (r.renderBefore = i.firstChild), i;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = fd(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return St;
  }
}
Rt.finalized = !0, Rt._$litElement$ = !0, (Wi = globalThis.litElementHydrateSupport) === null || Wi === void 0 || Wi.call(globalThis, { LitElement: Rt });
const Cs = globalThis.litElementPolyfillSupport;
Cs == null || Cs({ LitElement: Rt });
((Ui = globalThis.litElementVersions) !== null && Ui !== void 0 ? Ui : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const md = { CHILD: 2 }, yd = (t) => (...e) => ({ _$litDirective$: t, values: e });
class vd {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, r, i) {
    this._$Ct = e, this._$AM = r, this._$Ci = i;
  }
  _$AS(e, r) {
    return this.update(e, r);
  }
  update(e, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class yo extends vd {
  constructor(e) {
    if (super(e), this.et = ce, e.type !== md.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === ce || e == null) return this.ft = void 0, this.et = e;
    if (e === St) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.et) return this.ft;
    this.et = e;
    const r = [e];
    return r.raw = r, this.ft = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
yo.directiveName = "unsafeHTML", yo.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let vo = class extends yo {
};
vo.directiveName = "unsafeSVG", vo.resultType = 2;
const bd = yd(vo), ke = (t, e = "_") => {
  const r = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", i = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${e}`, o = new RegExp(r.split("").join("|"), "g"), s = {
    ж: "zh",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ю: "iu",
    я: "ia"
  };
  let a;
  return t === "" ? a = "" : (a = t.toString().toLowerCase().replace(o, (n) => i.charAt(r.indexOf(n))).replace(/[а-я]/g, (n) => s[n] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, e).replace(new RegExp(`(${e})\\1+`, "g"), "$1").replace(new RegExp(`^${e}+`), "").replace(new RegExp(`${e}+$`), ""), a === "" && (a = "unknown")), a;
}, xd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M929 1888 c-40 -62 -115 -178 -167 -258 -343 -525 -352 -544 -352
-724 0 -172 59 -315 180 -436 82 -82 248 -159 343 -160 l27 0 0 -139 c0 -77 3
-146 6 -155 4 -9 18 -16 34 -16 24 0 28 5 34 38 3 20 6 89 6 153 l0 116 79 17
c119 25 213 76 296 160 186 188 227 453 107 693 -56 113 -495 823 -508 823 -7
0 -45 -51 -85 -112z m29 -554 l-3 -156 -46 58 c-26 33 -76 93 -112 135 l-66
76 94 154 c144 236 130 231 133 47 1 -87 1 -228 0 -314z m166 348 c37 -57 82
-132 101 -167 l36 -63 -48 -59 c-26 -32 -75 -92 -108 -133 l-60 -73 -5 294
c-3 162 -3 300 -1 307 5 18 11 11 85 -106z m240 -395 c30 -51 58 -100 61 -108
5 -13 -21 -44 -288 -347 -85 -96 -92 -101 -100 -80 -5 13 -7 87 -5 166 2 116
6 146 19 155 21 16 239 297 239 309 0 20 21 -6 74 -95z m-561 -46 c59 -70 119
-139 132 -151 25 -23 25 -25 24 -199 l0 -176 -22 29 c-17 23 -220 257 -350
403 -18 20 -19 26 -8 50 19 42 102 173 110 173 3 0 55 -58 114 -129z m-112
-331 c83 -96 179 -206 212 -244 l60 -68 5 -104 c6 -126 5 -127 -111 -90 -215
67 -346 224 -371 447 -8 69 24 244 44 237 4 -2 77 -82 161 -178z m805 129 c36
-117 23 -251 -36 -376 -37 -79 -133 -179 -210 -218 -68 -34 -156 -65 -187 -65
-23 0 -23 2 -23 105 l0 104 39 43 c78 85 373 433 378 446 9 23 26 7 39 -39z"/>
</g>
</svg>
`, wd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M862 1810 c-254 -46 -477 -217 -592 -455 -60 -124 -80 -212 -80 -352
0 -317 168 -591 445 -729 129 -64 224 -86 365 -86 138 0 235 22 355 82 170 84
293 205 370 365 59 122 76 188 82 335 4 106 2 139 -16 215 -69 292 -293 525
-581 605 -87 24 -267 34 -348 20z m314 -106 c200 -51 382 -200 475 -389 54
-111 72 -189 72 -315 0 -286 -161 -537 -424 -660 -198 -92 -435 -86 -630 16
-329 173 -481 569 -346 902 41 103 88 172 172 257 154 154 326 221 536 209 48
-2 113 -11 145 -20z"/>
<path d="M720 1333 c-101 -38 -81 -193 25 -193 84 0 124 110 62 168 -24 23
-64 34 -87 25z"/>
<path d="M1225 1326 c-60 -26 -73 -109 -26 -157 38 -38 88 -40 124 -4 51 51
37 134 -27 160 -41 18 -34 17 -71 1z"/>
<path d="M582 878 c-25 -25 -13 -59 41 -111 127 -125 332 -180 507 -138 77 19
183 76 246 133 62 57 73 82 48 109 -27 29 -49 23 -108 -30 -111 -101 -208
-137 -347 -129 -110 7 -191 42 -278 122 -61 56 -87 66 -109 44z"/>
</g>
</svg>
`, kd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M875 1820 c-306 -49 -569 -280 -665 -585 -28 -90 -38 -268 -20 -368
58 -329 295 -586 615 -668 110 -28 280 -28 390 0 100 26 240 96 322 162 377
300 407 875 63 1220 -152 153 -335 234 -549 244 -53 2 -123 0 -156 -5z m305
-124 c30 -9 91 -33 135 -55 183 -91 313 -247 376 -451 30 -95 32 -260 6 -360
-68 -254 -249 -441 -507 -521 -95 -30 -260 -32 -360 -6 -257 67 -458 269 -527
527 -21 80 -23 253 -4 330 30 121 120 279 208 362 95 90 242 165 365 188 70
12 239 4 308 -14z M677 1314 c-67 -67 -23 -184 69 -184 60 0 114 73 98 134
-18 74 -115 103 -167 50z M1204 1325 c-54 -37 -55 -125 -3 -169 35 -30 67 -33
109 -11 37 19 50 43 50 95 0 57 -42 100 -97 100 -21 0 -48 -7 -59 -15z M1209
801 c-15 -5 -160 -12 -323 -16 -276 -7 -297 -9 -307 -26 -13 -26 4 -57 37 -65
26 -7 559 11 651 22 45 5 53 3 63 -15 16 -31 68 -29 76 3 6 27 -4 52 -34 79
-23 21 -121 32 -163 18z"/>
</g>
</svg>
`, Sd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M830 1785 c-288 -59 -521 -274 -612 -565 -20 -65 -23 -95 -23 -230 1
-149 2 -159 33 -250 46 -133 101 -221 201 -321 101 -101 193 -158 323 -202 87
-29 102 -31 243 -32 130 0 160 3 225 23 295 93 502 311 572 601 27 115 22 310
-12 416 -72 228 -259 432 -472 518 -138 55 -331 72 -478 42z m279 -110 c71 -8
195 -54 266 -100 304 -194 408 -564 250 -890 -173 -360 -636 -498 -983 -293
-86 50 -211 180 -254 263 -64 124 -83 203 -82 345 0 107 4 137 27 205 43 131
109 228 215 317 101 85 238 144 367 158 69 7 88 6 194 -5z M665 1227 c-83 -29
-156 -56 -163 -60 -18 -12 -14 -62 6 -80 27 -25 43 -22 207 33 147 49 175 65
175 102 0 23 -35 58 -57 57 -10 0 -86 -24 -168 -52z M1124 1255 c-12 -18 -14
-32 -7 -52 8 -26 23 -33 163 -80 171 -57 191 -60 214 -37 19 19 21 68 4 81
-17 13 -318 113 -340 113 -10 0 -25 -11 -34 -25z M903 880 c-122 -22 -252 -97
-313 -181 -35 -49 -36 -59 -12 -89 31 -38 66 -29 124 30 32 32 78 65 117 84
62 29 73 31 181 31 109 0 119 -2 183 -32 42 -20 87 -52 118 -84 54 -56 85 -65
119 -34 30 27 24 57 -22 110 -55 62 -145 120 -223 144 -75 23 -202 33 -272 21z"/>
</g>
</svg>
`, Ad = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M857 1785 c-402 -76 -683 -458 -637 -865 22 -193 89 -336 224 -479
256 -270 680 -317 983 -110 227 155 353 396 353 674 0 306 -156 567 -422 705
-145 76 -341 105 -501 75z m353 -134 c345 -118 536 -487 434 -837 -36 -125
-83 -205 -178 -300 -130 -130 -282 -194 -462 -194 -378 0 -676 301 -676 685 0
314 208 584 508 660 90 22 289 15 374 -14z M681 1240 c-155 -65 -180 -80 -181
-106 0 -18 40 -64 56 -64 27 0 326 130 340 147 28 37 6 94 -34 92 -9 0 -91
-31 -181 -69z M1107 1292 c-20 -22 -21 -51 -3 -75 14 -18 308 -147 337 -147 8
0 26 11 39 25 20 21 22 30 14 51 -8 23 -34 37 -174 95 -91 37 -172 68 -181 68
-9 1 -23 -7 -32 -17z M925 880 c-114 -15 -213 -68 -292 -153 -47 -51 -60 -87
-47 -126 7 -19 17 -27 40 -29 26 -3 37 5 82 57 37 43 71 69 118 92 161 79 372
35 469 -99 44 -61 108 -70 121 -16 10 39 -3 69 -56 127 -101 111 -272 168
-435 147z"/>
</g>
</svg>
`, Pd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M832 1784 c-318 -69 -564 -348 -600 -680 -48 -439 237 -819 663 -884
367 -56 741 192 845 562 27 97 36 255 20 355 -41 259 -197 473 -424 583 -60
29 -132 55 -178 64 -93 19 -240 19 -326 0z m367 -130 c98 -31 164 -70 241
-140 96 -90 162 -198 196 -324 23 -88 24 -263 1 -350 -50 -191 -184 -359 -349
-439 -188 -91 -383 -94 -563 -7 -238 113 -371 316 -382 581 -6 142 12 230 72
353 142 286 475 425 784 326z M795 1328 c-27 -17 -96 -53 -152 -80 -55 -27
-106 -55 -113 -63 -18 -21 -8 -56 22 -78 l27 -20 86 38 c109 48 213 113 239
148 19 26 19 30 5 55 -21 38 -55 38 -114 0z M1088 1335 c-17 -37 5 -75 63
-114 55 -36 247 -131 265 -131 22 0 64 42 64 65 0 30 -11 38 -148 106 -64 31
-130 67 -147 78 -42 29 -82 28 -97 -4z M581 1049 c-56 -77 -64 -146 -21 -189
48 -48 140 -7 140 63 0 37 -40 125 -70 152 -18 16 -20 15 -49 -26z M872 874
c-66 -17 -96 -33 -159 -82 -118 -94 -152 -222 -58 -222 30 0 38 6 70 54 77
116 215 167 356 132 80 -20 131 -56 187 -129 47 -62 83 -74 115 -39 22 24 21
44 -2 90 -45 87 -167 177 -272 201 -62 15 -174 12 -237 -5z"/>
</g>
</svg>
`, Cd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M832 1784 c-318 -69 -564 -348 -600 -680 -48 -439 237 -819 663 -884
367 -56 741 192 845 562 27 97 36 255 20 355 -41 259 -197 473 -424 583 -60
29 -132 55 -178 64 -93 19 -240 19 -326 0z m367 -130 c98 -31 164 -70 241
-140 96 -90 162 -198 196 -324 23 -88 24 -263 1 -350 -50 -191 -184 -359 -349
-439 -188 -91 -383 -94 -563 -7 -238 113 -371 316 -382 581 -6 142 12 230 72
353 142 286 475 425 784 326z M795 1328 c-27 -17 -96 -53 -152 -80 -55 -27
-106 -55 -113 -63 -18 -21 -8 -56 22 -78 l27 -20 86 38 c109 48 213 113 239
148 19 26 19 30 5 55 -21 38 -55 38 -114 0z M1088 1335 c-17 -37 5 -75 63
-114 55 -36 247 -131 265 -131 22 0 64 42 64 65 0 30 -11 38 -148 106 -64 31
-130 67 -147 78 -42 29 -82 28 -97 -4z M581 1049 c-56 -77 -64 -146 -21 -189
48 -48 140 -7 140 63 0 37 -40 125 -70 152 -18 16 -20 15 -49 -26z M1354 1057
c-59 -88 -69 -145 -33 -191 16 -20 29 -26 58 -26 66 0 104 56 82 123 -13 37
-69 127 -79 127 -4 0 -17 -15 -28 -33z M872 874 c-66 -17 -96 -33 -159 -82
-118 -94 -152 -222 -58 -222 30 0 38 6 70 54 77 116 215 167 356 132 80 -20
131 -56 187 -129 47 -62 83 -74 115 -39 22 24 21 44 -2 90 -45 87 -167 177
-272 201 -62 15 -174 12 -237 -5z"/>
</g>
</svg>
`, Md = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M847 1794 c-305 -55 -557 -305 -621 -617 -31 -150 -15 -334 41 -475
83 -208 290 -395 503 -456 419 -120 857 129 972 553 31 113 31 317 0 424 -89
311 -340 534 -648 577 -96 13 -150 12 -247 -6z m286 -119 c86 -18 195 -71 269
-130 300 -237 335 -713 73 -994 -262 -282 -686 -291 -956 -22 -129 130 -192
287 -192 481 0 127 18 203 75 320 81 166 259 306 438 344 86 19 209 19 293 1z
M685 1414 c-150 -53 -203 -218 -101 -313 l25 -24 -24 -31 c-32 -43 -55 -98
-55 -136 0 -73 95 -108 145 -54 33 35 32 71 -5 143 l-29 59 36 -10 c148 -41
312 109 274 250 -13 48 -63 97 -120 117 -53 18 -93 18 -146 -1z m179 -235
c-28 -31 -85 -57 -141 -65 -80 -10 -73 11 14 44 110 42 106 40 127 41 19 1 19
1 0 -20z M1168 1420 c-91 -27 -133 -87 -126 -181 9 -127 136 -220 267 -193
l49 10 -22 -35 c-55 -90 -59 -130 -17 -172 57 -56 141 -21 141 59 0 38 -36
121 -65 151 -11 11 -9 17 15 37 38 33 63 97 55 145 -21 125 -173 216 -297 179z
m33 -240 c35 -11 80 -29 99 -39 30 -17 32 -20 17 -27 -42 -16 -197 44 -197 76
0 14 9 13 81 -10z M862 875 c-73 -21 -107 -40 -165 -94 -95 -88 -124 -165 -77
-203 40 -32 55 -24 124 72 38 54 129 104 204 115 114 15 240 -40 303 -134 43
-65 62 -77 95 -62 63 28 48 97 -41 190 -82 86 -168 123 -294 128 -64 2 -114
-2 -149 -12z"/>
</g>
</svg>
`, zd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M961 1925 c-36 -42 -81 -127 -106 -204 -14 -42 -16 -75 -13 -145 6
-112 32 -169 128 -283 7 -8 7 -26 0 -55 -5 -24 -10 -90 -10 -148 0 -59 -4
-100 -9 -95 -4 6 -18 42 -30 81 -49 166 -189 284 -358 301 -52 6 -53 5 -53
-20 0 -86 91 -272 163 -333 47 -40 148 -84 221 -97 63 -11 65 -12 71 -46 4
-20 3 -121 -1 -226 -8 -183 -8 -188 -20 -130 -23 118 -52 175 -128 251 -96 96
-156 126 -265 132 l-84 5 6 -39 c4 -22 25 -77 48 -124 75 -150 187 -237 356
-276 43 -10 80 -19 82 -21 2 -2 6 -90 9 -195 4 -184 11 -223 34 -200 4 4 9 95
10 201 l3 194 90 24 c132 35 189 64 256 133 62 64 131 190 144 264 l6 39 -80
-5 c-63 -4 -93 -11 -143 -36 -113 -56 -207 -159 -253 -277 l-20 -50 -3 179
c-1 99 1 183 5 186 5 4 43 14 86 23 204 44 327 177 365 395 l9 52 -28 0 c-15
0 -52 -5 -81 -11 -157 -33 -257 -131 -346 -339 -8 -19 -10 12 -7 123 4 148 5
149 35 187 86 108 112 253 71 387 -19 63 -99 214 -120 227 -5 3 -23 -10 -40
-29z"/>
</g>
</svg>
`, Ed = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M935 1903 c-50 -46 -135 -125 -190 -175 -152 -138 -263 -248 -307
-303 -168 -209 -197 -528 -72 -776 88 -175 210 -286 385 -350 44 -16 104 -32
135 -35 l56 -7 -7 -128 -7 -129 35 0 34 0 5 120 c3 66 7 122 9 125 3 2 36 9
74 15 292 45 496 216 597 500 31 87 36 273 10 376 -43 170 -102 258 -352 524
-80 85 -176 190 -215 234 -38 43 -77 82 -85 86 -12 6 -39 -13 -105 -77z m120
-85 c72 -69 421 -460 452 -507 48 -72 93 -205 100 -295 7 -96 -17 -209 -67
-315 -74 -154 -221 -272 -395 -316 -32 -8 -74 -15 -92 -15 l-33 0 0 65 c0 50
4 69 18 83 75 72 321 303 349 326 57 49 66 88 21 99 -16 5 -58 -30 -194 -156
-96 -89 -179 -164 -186 -166 -8 -3 -9 26 -4 108 8 130 9 132 40 151 13 8 81
70 152 137 126 121 128 122 109 143 -10 11 -22 20 -27 20 -5 0 -61 -48 -124
-107 -63 -60 -120 -109 -127 -111 -9 -2 -11 24 -9 100 3 119 8 148 24 148 13
0 168 149 168 162 0 9 -30 38 -40 38 -5 0 -35 -22 -67 -50 -32 -27 -62 -50
-67 -50 -5 0 -7 61 -4 139 3 78 1 144 -4 149 -5 5 -20 7 -34 4 -24 -4 -24 -4
-25 -136 0 -72 -4 -140 -8 -150 -7 -17 -9 -17 -30 10 -12 16 -38 46 -57 67
-30 32 -38 36 -55 26 -39 -20 -32 -37 49 -126 58 -64 81 -96 83 -118 5 -70 -2
-205 -11 -205 -5 0 -22 15 -37 33 -16 17 -64 70 -109 116 -76 78 -82 83 -102
70 -12 -8 -22 -20 -22 -28 0 -13 120 -150 223 -254 l47 -48 0 -120 c0 -67 -4
-119 -8 -117 -5 2 -81 80 -171 173 -165 173 -194 193 -223 158 -9 -11 -5 -21
19 -46 16 -18 107 -114 202 -215 l172 -182 -2 -66 -2 -66 -36 6 c-309 49 -537
326 -517 626 9 137 52 251 130 351 43 55 484 478 499 479 4 0 19 -10 32 -22z"/>
</g>
</svg>
`, Ld = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M972 1983 c-6 -10 -19 -48 -30 -85 -28 -88 -69 -168 -87 -168 -8 0
-15 -4 -15 -10 0 -5 -7 -7 -15 -4 -8 4 -12 10 -9 16 4 5 -12 8 -38 6 -43 -3
-43 -3 -46 -45 -2 -23 1 -58 7 -78 12 -45 1 -51 -51 -24 -28 14 -43 18 -46 10
-2 -6 -7 -9 -12 -6 -12 7 -18 -18 -25 -117 -5 -65 -10 -88 -21 -88 -7 0 -18 9
-24 20 -6 11 -19 24 -30 30 -16 8 -24 6 -42 -12 -20 -20 -22 -32 -22 -120 -1
-94 -2 -99 -21 -93 -11 4 -39 9 -62 12 l-43 6 0 -65 c0 -36 9 -100 20 -143 11
-43 19 -79 17 -81 -1 -1 -24 2 -50 8 -26 5 -54 7 -62 4 -36 -13 -6 -116 70
-242 25 -41 45 -77 45 -82 0 -4 -15 -12 -32 -17 -18 -6 -34 -18 -36 -27 -4
-23 96 -129 168 -178 91 -62 135 -73 315 -79 l160 -6 6 -160 c3 -88 7 -161 7
-162 7 -11 61 0 66 13 3 9 6 83 6 165 l0 149 118 0 c217 0 300 25 419 128 84
73 121 125 103 147 -7 8 -18 15 -24 15 -6 0 -17 4 -25 9 -11 7 -3 27 37 97 57
99 85 171 80 206 -3 21 -8 23 -57 22 -33 0 -56 -5 -59 -12 -2 -7 -7 -10 -12
-7 -5 3 0 36 11 73 25 86 37 212 20 212 -7 0 -9 5 -5 12 12 20 -67 1 -91 -22
-26 -24 -40 -9 -23 24 19 35 -11 203 -38 213 -9 3 -28 -9 -49 -30 -20 -21 -37
-31 -41 -25 -4 5 -9 47 -13 93 -4 49 -12 90 -21 101 -12 14 -12 16 -1 9 10 -5
12 -4 7 3 -11 18 -35 14 -84 -14 l-45 -26 6 33 c19 104 19 118 3 134 -9 9 -16
13 -16 8 0 -4 -4 -2 -9 6 -13 20 -72 5 -64 -16 5 -12 -2 -10 -25 7 -18 13 -38
42 -47 64 -8 23 -27 77 -43 121 -22 62 -33 81 -50 83 -12 2 -25 -4 -30 -15z
m48 -220 c0 -10 9 -33 20 -50 15 -26 32 -36 80 -50 l60 -18 1 -70 c0 -38 6
-86 12 -105 11 -30 17 -35 42 -33 17 1 37 11 47 23 24 29 28 25 28 -24 0 -55
25 -135 54 -170 19 -24 23 -25 46 -13 14 8 24 19 22 26 -1 7 5 11 15 9 10 -2
16 -11 14 -19 -2 -8 -6 -56 -8 -106 -5 -90 -4 -93 16 -93 12 0 38 7 58 15 19
8 37 15 39 15 9 0 2 -42 -17 -101 -11 -35 -23 -86 -26 -112 l-6 -48 39 6 c21
3 49 8 62 11 12 2 22 2 22 -2 0 -8 -69 -134 -91 -165 -10 -14 -19 -31 -21 -39
-2 -7 -11 -22 -20 -32 -22 -22 -24 -58 -4 -58 54 0 -2 -68 -92 -112 -64 -32
-71 -33 -210 -37 -114 -3 -146 0 -153 10 -11 17 -12 220 -1 235 5 8 67 31 67
25 0 -3 259 90 282 101 33 16 44 62 17 72 -9 4 -84 -15 -168 -43 -83 -26 -164
-51 -179 -55 l-28 -7 3 113 3 112 65 24 c129 47 190 74 190 86 0 7 -6 20 -13
31 -16 20 -20 20 -147 -19 -47 -14 -88 -26 -92 -26 -4 0 -9 82 -10 183 l-3
182 -37 3 -38 3 0 -184 c0 -101 -2 -186 -5 -189 -3 -2 -49 10 -102 29 -54 18
-106 33 -116 33 -23 0 -39 -40 -24 -57 10 -10 144 -66 230 -96 15 -6 17 -21
17 -115 0 -60 -3 -111 -6 -115 -4 -3 -18 0 -33 7 -14 7 -95 35 -179 61 -163
52 -171 52 -172 -1 0 -17 12 -26 58 -42 31 -11 111 -39 177 -63 65 -23 125
-42 132 -42 20 0 24 -31 21 -147 l-3 -105 -110 -3 c-168 -5 -274 23 -348 92
-27 25 -28 28 -13 49 9 12 19 27 21 32 3 6 -29 68 -71 138 -42 70 -74 130 -71
134 3 3 20 0 38 -6 18 -6 43 -11 55 -11 32 0 32 30 -1 157 -14 54 -25 101 -25
106 0 12 22 8 40 -8 9 -8 31 -18 50 -21 l33 -7 -6 111 c-4 71 -3 112 3 112 6
0 10 -4 10 -9 0 -5 14 -14 32 -20 35 -12 35 -13 69 52 11 21 23 67 26 102 3
36 8 65 11 65 3 0 10 -7 16 -15 6 -9 27 -18 47 -21 44 -7 48 2 58 126 l6 85
48 12 c57 14 71 25 103 75 26 41 44 49 44 21z"/>
</g>
</svg>
`, Ms = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M918 1847 c-99 -105 -154 -178 -186 -247 -22 -45 -26 -70 -26 -141 0
-73 4 -93 27 -140 36 -72 74 -112 166 -174 l76 -51 3 -257 c1 -141 -1 -257 -6
-257 -4 0 -31 30 -59 68 -29 37 -66 80 -82 96 -30 28 -31 33 -31 111 0 98 -19
158 -66 213 -61 72 -152 111 -259 112 -39 0 -302 -29 -312 -35 -7 -4 73 -249
95 -289 100 -184 260 -245 441 -168 68 29 77 30 97 17 32 -21 93 -95 137 -167
33 -55 37 -69 37 -130 l0 -69 -44 36 c-24 20 -47 47 -50 60 -8 32 -52 82 -88
101 -46 24 -118 20 -187 -11 -82 -37 -86 -43 -54 -91 88 -133 178 -163 291
-97 l44 25 35 -33 c54 -52 63 -78 63 -174 0 -78 2 -85 20 -85 19 0 20 7 20
194 0 221 6 246 93 361 69 92 79 95 171 50 95 -45 161 -54 241 -30 49 14 70
28 125 83 61 62 70 77 123 206 31 76 57 142 57 146 0 9 -129 45 -235 65 -128
25 -245 -2 -318 -73 -61 -59 -87 -120 -94 -220 l-6 -86 -71 -87 c-39 -48 -74
-88 -78 -88 -5 -1 -8 111 -8 247 0 278 -5 260 76 300 64 33 137 105 167 166
67 137 46 273 -67 421 -51 67 -180 205 -191 205 -5 0 -45 -38 -87 -83z"/>
</g>
</svg>
`, Td = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M968 1750 c-2 -140 -7 -231 -13 -233 -5 -1 -21 18 -34 42 -14 25 -47
68 -75 95 -47 48 -50 49 -54 28 -4 -25 47 -119 126 -232 l46 -65 4 -122 c6
-156 4 -156 -81 -38 -102 140 -178 201 -177 143 1 -28 24 -61 35 -50 5 4 6 2
2 -4 -3 -5 17 -39 45 -75 27 -35 78 -100 111 -144 l62 -80 2 -140 3 -140 -37
44 c-220 258 -280 317 -300 297 -13 -13 31 -78 141 -210 59 -72 127 -153 150
-181 l41 -50 4 -113 c3 -96 1 -113 -11 -106 -7 5 -85 85 -173 177 -87 93 -171
175 -187 183 -27 14 -28 14 -28 -8 0 -13 20 -48 43 -78 48 -60 309 -347 335
-368 13 -10 17 -41 22 -165 5 -138 7 -152 24 -155 10 -2 22 2 27 10 5 7 9 75
9 151 l0 137 43 47 c23 26 105 115 181 197 76 83 147 164 157 181 22 34 25 65
7 65 -7 0 -95 -84 -197 -187 l-184 -188 -7 60 c-3 33 -3 86 1 117 6 52 13 65
66 125 58 67 139 166 219 266 36 46 61 97 47 97 -28 0 -60 -32 -230 -226 l-98
-112 -3 136 c-2 123 -1 137 17 156 11 12 41 51 68 87 26 37 76 103 110 148 61
80 81 117 69 129 -16 16 -77 -46 -233 -235 l-31 -38 2 130 2 130 59 85 c70
101 115 184 115 213 0 18 -10 12 -55 -33 -31 -30 -70 -77 -88 -105 l-32 -50
-5 240 c-3 132 -7 241 -8 243 -1 1 -13 2 -27 2 l-25 0 -2 -230z"/>
</g>
</svg>
`, Dd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M925 1959 c-236 -190 -349 -321 -443 -512 -78 -159 -103 -255 -109
-426 -6 -150 3 -210 48 -309 95 -212 271 -346 490 -377 44 -6 47 -8 53 -43 3
-20 6 -94 6 -164 l0 -128 30 0 c29 0 30 1 30 48 1 26 2 99 3 162 l2 115 80 16
c228 46 413 209 483 426 68 207 15 526 -127 767 -55 94 -177 242 -258 312 -90
79 -198 154 -219 154 -10 -1 -41 -19 -69 -41z m35 -250 c0 -93 -2 -169 -6
-169 -3 0 -47 43 -98 96 l-93 96 47 44 c65 61 134 113 143 107 4 -2 7 -80 7
-174z m157 127 c32 -24 71 -58 88 -75 l29 -31 -74 -76 c-41 -41 -87 -84 -102
-95 l-26 -19 -2 170 c0 142 2 170 14 170 8 0 40 -20 73 -44z m-274 -282 l117
-117 2 -123 c1 -68 -1 -126 -3 -128 -3 -3 -82 72 -176 166 -155 154 -171 173
-161 192 16 33 88 126 96 126 4 0 60 -52 125 -116z m492 55 c25 -34 45 -69 45
-79 0 -10 -78 -93 -175 -188 l-175 -170 0 130 0 130 123 119 c67 65 125 119
130 119 4 0 27 -27 52 -61z m-571 -348 l196 -195 0 -128 c0 -117 -9 -158 -24
-110 -3 10 -105 113 -226 231 -155 150 -220 219 -220 235 0 22 67 172 75 165
2 -2 92 -91 199 -198z m709 118 c20 -43 37 -85 37 -92 0 -7 -108 -118 -240
-245 l-239 -233 2 133 2 133 150 145 c82 80 170 166 195 192 25 25 47 47 50
47 3 0 22 -36 43 -80z m-705 -473 l192 -190 0 -129 c0 -71 -3 -127 -7 -125 -5
2 -119 116 -256 254 -161 162 -250 260 -256 280 -4 17 -3 59 5 103 7 41 12 77
12 80 -3 34 24 10 310 -273z m788 176 l7 -103 -256 -257 c-141 -141 -260 -253
-264 -249 -4 5 -8 61 -8 125 l0 117 230 227 c243 240 266 261 277 250 4 -4 10
-53 14 -110z m-44 -344 c-45 -96 -98 -163 -173 -220 -63 -48 -158 -94 -214
-103 -39 -6 -32 2 190 218 251 245 268 254 197 105z m-792 -144 c96 -97 170
-179 163 -181 -22 -8 -158 57 -228 109 -45 35 -85 77 -117 123 -43 64 -88 163
-88 194 0 20 82 -54 270 -245z"/>
</g>
</svg>
`, $d = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M1176 1893 c-4 -13 -12 -23 -17 -23 -6 0 -7 -5 -4 -11 9 -13 38 27
32 44 -2 6 -7 2 -11 -10z"/>
<path d="M1147 1833 c5 -12 3 -14 -7 -8 -9 5 -11 4 -6 -3 4 -7 2 -12 -4 -12
-6 0 -8 -4 -5 -10 3 -5 2 -10 -4 -10 -6 0 -15 -19 -22 -42 -6 -24 -17 -57 -25
-73 -7 -17 -17 -49 -22 -70 -6 -22 -22 -84 -36 -137 -15 -54 -33 -131 -40
-170 -98 -531 -108 -616 -89 -803 6 -66 12 -204 13 -307 l1 -188 24 0 c32 0
32 -1 45 285 29 646 35 715 90 1067 34 213 54 319 78 398 9 30 16 57 17 60 0
3 4 10 8 16 4 7 0 14 -8 17 -10 4 -12 1 -8 -10z"/>
<path d="M600 1495 c7 -8 10 -15 7 -15 -3 0 6 -30 20 -67 30 -85 49 -139 58
-178 5 -16 9 -34 11 -40 2 -5 8 -40 15 -78 10 -57 9 -83 -5 -170 -10 -56 -22
-115 -27 -132 -27 -89 -68 -498 -69 -677 l0 -138 34 0 c20 0 36 6 39 14 3 7 6
105 7 217 1 243 28 589 48 625 10 19 39 -179 48 -321 5 -100 -8 -404 -22 -498
l-6 -38 39 3 38 3 7 225 c14 493 13 514 -42 773 -21 97 -22 115 -11 170 12 60
39 181 45 202 2 6 3 13 2 16 0 3 5 13 13 23 8 9 12 19 9 21 -10 10 -98 -183
-98 -215 0 -11 -4 -20 -10 -20 -5 0 -10 8 -10 18 0 10 -5 23 -12 30 -7 7 -9
12 -5 12 4 0 -3 24 -14 53 -34 86 -71 157 -82 157 -6 0 -7 3 -4 7 8 8 -11 33
-25 33 -6 0 -5 -7 2 -15z"/>
<path d="M1640 1382 c0 -12 -4 -22 -8 -22 -5 0 -21 -39 -37 -87 -15 -49 -36
-113 -46 -143 -26 -77 -87 -420 -110 -624 -11 -94 -23 -246 -26 -339 l-6 -167
42 0 41 0 0 223 c0 358 43 685 140 1080 12 49 19 91 16 94 -3 4 -6 -3 -6 -15z"/>
<path d="M1395 1002 c-38 -20 -96 -62 -128 -94 -32 -32 -60 -58 -62 -58 -1 0
-5 10 -9 23 -3 13 -15 34 -27 48 l-22 24 7 -25 c5 -14 10 -37 13 -53 3 -15 8
-29 12 -32 4 -2 -14 -48 -41 -102 -113 -230 -156 -434 -149 -711 1 -22 4 -23
64 -20 l62 3 6 145 c4 80 12 184 18 232 14 110 50 280 60 291 8 8 24 -72 53
-253 6 -41 12 -153 12 -247 l1 -173 31 0 c24 0 33 5 38 23 22 82 -16 409 -76
657 l-20 85 38 65 c36 63 110 144 169 187 43 31 30 28 -50 -15z"/>
<path d="M394 960 c4 -14 8 -32 11 -40 2 -8 13 -51 25 -95 61 -226 89 -435 90
-662 0 -72 3 -138 6 -147 4 -10 18 -16 35 -16 28 0 29 2 29 48 0 104 -22 331
-41 421 -11 53 -22 105 -25 117 -16 83 -59 232 -86 299 -31 80 -57 124 -44 75z"/>
<path d="M1135 960 c3 -5 8 -10 11 -10 2 0 4 5 4 10 0 6 -5 10 -11 10 -5 0 -7
-4 -4 -10z"/>
</g>
</svg>
`, Od = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M921 1979 c-102 -45 -211 -140 -281 -245 -65 -96 -134 -228 -150
-289 -8 -27 -17 -52 -20 -55 -4 -3 -18 -45 -31 -95 -21 -79 -24 -112 -24 -270
0 -214 10 -255 87 -370 77 -116 171 -178 333 -219 l50 -13 6 -129 c7 -128 37
-264 59 -264 6 0 10 -7 10 -15 0 -8 9 -15 20 -15 11 0 20 1 20 3 0 1 -11 51
-24 110 -28 122 -40 344 -17 308 7 -11 28 -13 108 -7 234 16 364 80 461 226
22 32 48 85 57 117 9 32 21 72 27 88 5 17 12 95 15 175 4 131 2 157 -21 265
-15 66 -31 122 -36 123 -6 2 -8 8 -5 12 12 19 -93 259 -131 299 -14 14 -34 42
-44 62 -27 52 -134 145 -209 182 -55 27 -78 32 -142 33 -55 1 -88 -3 -118 -17z
m129 -71 c6 -24 15 -56 20 -73 16 -54 30 -172 30 -250 0 -65 -2 -75 -14 -63
-8 7 -91 63 -184 123 -94 61 -173 116 -176 122 -3 7 -2 12 2 11 4 -1 25 15 47
36 79 75 185 134 242 136 18 0 24 -8 33 -42z m115 -3 c30 -19 55 -33 55 -31 0
9 118 -120 128 -140 10 -19 0 -32 -89 -121 -54 -54 -99 -97 -100 -94 -1 3 0
22 1 42 3 83 -28 292 -55 362 -10 24 -1 22 60 -18z m-445 -204 c0 -12 57 -41
65 -33 5 4 6 2 2 -3 -3 -6 3 -17 15 -24 16 -10 19 -10 12 1 -4 7 7 -2 25 -19
30 -31 43 -38 64 -34 5 1 6 -3 3 -8 -6 -8 8 -18 28 -19 5 0 12 -5 15 -11 4 -6
38 -32 77 -59 67 -47 69 -49 66 -87 -4 -60 -33 -193 -46 -211 -11 -14 -29 -5
-148 69 -74 46 -179 110 -232 141 -54 32 -100 64 -103 71 -3 8 14 50 38 92 64
118 89 152 105 146 8 -3 14 -8 14 -12z m710 -108 c17 -38 40 -86 51 -108 10
-21 15 -42 11 -46 -4 -4 -90 -62 -191 -129 l-184 -122 6 38 c4 22 12 77 18
124 l11 85 116 112 c65 62 120 113 123 113 4 0 21 -30 39 -67z m-797 -240 c29
-17 55 -29 59 -26 5 2 8 0 8 -5 0 -10 302 -202 319 -202 18 0 17 -23 -1 -99
-21 -90 -37 -131 -50 -131 -6 0 -22 8 -36 18 -15 10 -97 58 -182 107 -176 99
-280 164 -280 174 0 4 11 45 25 92 13 46 25 99 25 117 l0 33 31 -23 c17 -13
54 -37 82 -55z m888 30 c0 -5 2 -15 4 -23 1 -8 9 -50 16 -93 15 -92 34 -71
-181 -196 -80 -46 -179 -104 -220 -127 -79 -47 -92 -51 -86 -31 2 6 10 48 17
92 12 82 23 108 48 113 13 3 111 70 236 163 28 20 69 48 92 62 23 15 44 31 48
37 7 12 25 14 26 3z m43 -312 c7 -50 -11 -240 -23 -254 -6 -6 -431 -125 -508
-141 -44 -10 -49 5 -23 74 25 68 23 66 265 205 91 52 189 110 218 129 29 19
55 35 58 35 4 1 9 -21 13 -48z m-991 -25 c26 -15 47 -24 47 -21 0 3 10 -3 22
-15 20 -19 33 -24 51 -21 4 0 7 -3 7 -8 0 -10 225 -141 241 -141 24 0 27 -39
8 -100 -11 -35 -21 -66 -23 -68 -6 -6 -387 166 -422 190 -38 26 -44 49 -44
165 l0 85 33 -20 c17 -10 53 -31 80 -46z m217 -382 c47 -21 91 -44 98 -51 7
-7 19 -13 26 -13 10 0 9 -12 -4 -50 -9 -28 -19 -53 -22 -56 -9 -9 -100 17
-164 47 -99 46 -202 153 -228 236 -8 24 1 21 294 -113z m730 68 c0 -4 -22 -35
-49 -68 -77 -95 -184 -156 -320 -180 -95 -17 -163 -18 -179 -2 -24 24 -9 119
19 123 24 4 319 83 389 104 104 31 140 37 140 23z"/>
</g>
</svg>
`, Id = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M919 1897 c-60 -68 -191 -243 -215 -287 -10 -19 -21 -37 -24 -40 -13
-12 -50 -82 -50 -96 0 -8 -4 -14 -10 -14 -5 0 -10 -9 -10 -20 0 -11 -4 -20
-10 -20 -5 0 -10 -11 -10 -25 0 -14 -4 -25 -9 -25 -5 0 -7 -8 -4 -19 2 -10 -2
-25 -11 -33 -11 -12 -12 -18 -3 -28 9 -10 9 -11 -2 -5 -9 5 -12 4 -7 -3 3 -6
0 -17 -8 -25 -8 -8 -12 -17 -9 -21 3 -3 1 -12 -5 -19 -7 -8 -9 -17 -5 -20 3
-4 0 -13 -7 -22 -17 -21 -25 -176 -12 -258 11 -67 96 -267 114 -267 5 0 7 -4
4 -9 -3 -5 14 -30 38 -56 24 -26 45 -50 47 -53 1 -4 47 -58 102 -119 90 -103
117 -127 117 -105 0 23 -110 153 -123 145 -6 -3 -7 -1 -4 4 4 6 -10 26 -31 45
-20 18 -44 43 -52 54 -29 41 -111 149 -125 166 -7 9 -11 19 -8 22 4 3 1 6 -5
6 -7 0 -12 6 -12 13 0 7 -10 33 -22 58 -19 37 -22 61 -23 159 0 99 13 195 33
250 3 8 6 17 7 20 1 3 7 18 14 34 6 16 9 31 6 34 -3 3 2 14 12 24 9 10 12 18
7 18 -5 0 -4 4 3 8 6 4 13 16 15 27 1 11 6 22 10 25 3 3 8 12 10 20 2 8 9 21
16 28 7 8 10 18 7 23 -4 5 -2 9 3 9 5 0 17 17 28 38 10 20 22 39 25 42 13 12
69 99 69 108 0 6 3 12 8 14 13 5 72 85 72 97 0 6 4 11 8 11 4 0 28 25 54 55
l45 54 57 -59 c31 -32 56 -62 56 -66 0 -9 81 -118 92 -122 4 -2 8 -8 8 -13 0
-6 17 -36 38 -69 21 -32 49 -80 63 -107 13 -26 26 -50 29 -53 10 -10 30 -50
30 -60 0 -6 8 -29 19 -53 42 -95 54 -153 59 -274 3 -107 1 -130 -18 -190 -13
-37 -26 -72 -30 -78 -16 -23 -19 -44 -4 -38 7 3 14 13 14 23 0 11 5 22 10 25
6 3 10 17 10 31 0 13 5 24 11 24 6 0 9 6 6 13 -2 6 2 26 10 44 16 39 17 189 2
247 -6 22 -15 59 -21 81 -12 45 -17 60 -48 129 -12 28 -24 58 -26 69 -4 24
-72 149 -87 162 -7 6 -13 16 -15 24 -5 23 -62 101 -74 101 -6 0 -9 3 -5 6 8 8
-50 94 -63 94 -6 0 -10 6 -10 13 0 12 -112 128 -122 126 -2 0 -24 -23 -49 -52z"/>
<path d="M967 1706 c-15 -39 -3 -1421 12 -1412 4 3 3 -30 -1 -72 -9 -109 -9
-180 1 -162 5 8 11 60 14 115 l5 100 130 130 c125 126 237 268 226 286 -9 14
-24 0 -17 -16 3 -8 0 -15 -6 -15 -6 0 -11 -7 -11 -15 0 -8 -4 -14 -9 -12 -4 1
-25 -18 -45 -42 -21 -25 -88 -98 -150 -162 l-113 -118 -7 61 c-3 33 -6 139 -6
233 l0 173 33 20 c34 20 316 284 330 309 20 34 -42 -14 -158 -121 -66 -62
-144 -131 -173 -155 l-53 -44 6 35 c9 46 12 898 4 898 -4 0 -9 -6 -12 -14z
m169 -1284 c-17 -16 -18 -16 -5 5 7 12 15 20 18 17 3 -2 -3 -12 -13 -22z m-26
-22 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z"/>
<path d="M721 1377 c18 -35 61 -77 72 -70 6 3 7 1 4 -4 -8 -13 17 -36 27 -25
4 4 6 3 4 -3 -1 -5 0 -11 4 -13 4 -1 25 -21 46 -44 22 -23 45 -39 53 -36 9 3
-10 29 -60 81 -41 42 -78 74 -83 71 -5 -3 -7 0 -6 8 2 7 -3 12 -10 10 -8 -1
-11 2 -8 7 4 5 -7 16 -24 24 -29 15 -30 15 -19 -6z"/>
<path d="M1139 1314 c-46 -42 -99 -85 -116 -96 -33 -20 -39 -29 -26 -41 3 -4
12 1 20 11 8 9 12 11 8 5 -3 -7 -4 -13 -1 -13 9 0 164 145 187 174 41 52 11
35 -72 -40z"/>
<path d="M627 1097 c-3 -7 23 -39 58 -73 34 -32 98 -93 141 -134 77 -74 114
-100 114 -79 0 10 -111 119 -121 119 -9 0 -77 68 -73 73 4 4 -103 107 -110
107 -2 0 -6 -6 -9 -13z m83 -62 c13 -14 21 -25 18 -25 -2 0 -15 11 -28 25 -13
14 -21 25 -18 25 2 0 15 -11 28 -25z"/>
</g>
</svg>
`, Rd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M946 1873 c-3 -42 -6 -116 -6 -164 l0 -88 -37 -6 c-85 -15 -193 -60
-273 -116 -12 -9 -37 11 -128 101 -83 83 -118 111 -134 108 -28 -4 -62 -50
-54 -74 3 -11 51 -64 106 -119 55 -55 100 -103 100 -107 0 -4 -15 -31 -33 -60
-43 -69 -71 -138 -87 -214 l-12 -61 -154 -5 c-172 -5 -184 -10 -184 -68 0 -34
3 -38 31 -44 17 -3 92 -6 165 -6 152 0 144 5 158 -93 9 -61 33 -117 80 -186
20 -29 36 -55 36 -58 0 -3 -48 -54 -107 -115 -68 -68 -108 -117 -108 -130 0
-11 12 -30 27 -41 39 -29 67 -14 182 102 l98 98 49 -33 c58 -39 142 -72 222
-87 l57 -11 0 -147 c0 -185 5 -199 64 -199 l44 0 6 83 c4 45 5 122 4 172 l-3
90 40 9 c101 21 175 48 239 87 l70 42 103 -107 c56 -58 108 -107 115 -107 41
-4 78 22 78 53 0 11 -47 68 -110 132 l-110 113 31 39 c44 54 86 150 101 228
l13 66 146 0 c81 0 154 3 163 6 12 4 16 20 16 53 l0 48 -52 2 c-29 2 -102 6
-162 9 l-108 7 -19 74 c-19 76 -74 188 -112 229 l-21 23 117 117 c64 64 117
122 117 128 0 14 -64 64 -81 64 -7 0 -62 -49 -123 -110 l-112 -110 -34 23
c-55 36 -155 77 -217 89 -32 6 -63 12 -69 13 -12 3 -24 138 -24 262 l0 73 -49
0 -48 0 -7 -77z"/>
</g>
</svg>
`, Ki = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M928 1973 c-36 -39 -48 -66 -58 -126 -7 -46 -5 -59 22 -117 25 -56
29 -74 26 -132 -2 -37 -6 -70 -10 -73 -13 -13 -88 53 -127 112 -62 93 -83 106
-154 99 -73 -7 -113 -34 -128 -87 -16 -50 0 -105 41 -149 30 -32 32 -33 93
-27 34 4 80 13 102 21 58 22 66 20 129 -25 61 -44 84 -81 130 -208 l26 -73
-62 -121 c-35 -66 -68 -122 -74 -124 -20 -7 -27 30 -31 167 -2 74 -9 147 -15
162 -10 28 -55 64 -65 54 -4 -3 -12 -1 -19 5 -20 16 -89 -7 -109 -37 -26 -40
-29 -86 -10 -125 27 -52 43 -66 92 -81 65 -19 83 -68 30 -82 -36 -10 -167 -7
-187 4 -10 6 -33 37 -51 70 -17 33 -35 57 -39 55 -5 -3 -10 0 -12 7 -7 19 -85
-8 -114 -39 -45 -49 -23 -165 34 -180 13 -3 50 0 81 8 62 15 279 13 320 -3 23
-8 24 -11 18 -86 -5 -66 -13 -91 -53 -170 -26 -51 -52 -91 -58 -89 -10 3 -28
45 -71 162 -10 28 -34 66 -54 85 -35 35 -43 37 -116 31 -22 -2 -75 -80 -75
-111 0 -51 68 -92 138 -83 38 5 41 4 65 -38 14 -24 33 -70 41 -102 13 -50 13
-64 1 -112 -8 -30 -30 -85 -49 -122 -61 -124 -105 -283 -77 -283 5 0 25 31 45
70 43 81 78 125 115 145 15 7 81 21 146 30 164 22 205 33 238 64 56 51 70 106
42 160 -16 32 -33 42 -89 48 -49 5 -69 -12 -108 -95 -26 -54 -37 -66 -72 -81
-48 -21 -136 -36 -136 -24 0 5 22 58 48 119 93 212 121 251 192 273 43 13 67
5 160 -49 21 -12 53 -20 80 -20 40 0 51 5 82 38 71 72 77 135 19 193 -65 66
-124 51 -192 -48 l-31 -45 -59 4 c-32 2 -61 7 -65 11 -11 11 4 49 48 127 l43
75 82 3 c96 3 114 -4 207 -83 35 -29 67 -51 71 -47 4 4 5 2 3 -4 -5 -19 109
-112 151 -124 94 -25 148 57 84 126 -26 28 -30 29 -108 26 -75 -2 -85 0 -126
27 -51 34 -105 88 -97 97 3 3 41 8 84 11 68 5 82 10 106 34 41 40 39 98 -3
133 -54 46 -107 30 -154 -45 -14 -21 -35 -45 -47 -53 -28 -18 -202 -33 -212
-18 -8 13 88 198 134 260 20 26 59 60 89 77 69 38 94 72 94 125 0 77 -44 120
-120 120 -107 0 -160 -101 -116 -223 l17 -48 -33 -62 c-19 -34 -38 -66 -42
-71 -18 -20 -70 139 -88 267 -12 87 -2 120 59 197 56 69 67 107 50 169 -25 94
-108 131 -162 74z m80 -100 c3 -34 -2 -47 -26 -74 -38 -42 -56 -32 -49 27 10
92 69 129 75 47z m-320 -246 c4 -32 -11 -62 -43 -83 -30 -19 -60 -6 -69 32
-10 38 2 64 37 79 40 17 71 5 75 -28z m614 -44 c37 -33 16 -69 -55 -94 -36
-13 -40 -12 -53 6 -19 26 -18 48 7 79 24 31 72 35 101 9z m-544 -336 c15 -18
18 -85 5 -98 -30 -30 -90 63 -63 96 15 18 44 19 58 2z m462 -422 c30 -36 -48
-123 -88 -99 -25 17 -24 28 8 72 32 44 59 53 80 27z"/>
</g>
</svg>
`, zs = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M893 1968 c-48 -93 -93 -188 -93 -197 0 -14 -17 -14 -25 -1 -13 21
-37 9 -51 -25 -8 -19 -21 -65 -28 -101 -8 -36 -17 -68 -20 -72 -4 -3 -20 2
-35 11 -16 9 -32 17 -36 17 -10 0 -3 -142 10 -187 7 -23 10 -44 7 -47 -3 -4
-20 -6 -39 -6 -45 0 -44 -22 7 -118 62 -120 135 -210 215 -265 l70 -48 3 -253
c3 -184 1 -256 -8 -261 -26 -16 -52 57 -91 258 -21 111 -48 174 -92 213 -26
24 -31 25 -39 10 -16 -29 -35 -17 -77 47 -23 35 -51 73 -64 84 -24 22 -57 27
-57 8 0 -7 -7 -18 -16 -25 -13 -11 -19 -8 -43 21 -29 35 -116 87 -138 84 -7
-2 -17 -3 -23 -4 -5 0 -10 -12 -10 -26 0 -25 0 -25 -36 -10 -49 20 -174 30
-174 14 0 -7 15 -45 34 -85 48 -99 48 -108 9 -112 -19 -2 -33 -9 -33 -16 0
-15 79 -116 91 -116 4 0 14 -11 23 -25 16 -24 16 -26 -9 -35 -34 -13 -24 -31
55 -103 35 -32 57 -58 51 -62 -16 -9 -13 -45 3 -45 8 0 16 -3 18 -7 9 -21 123
-96 164 -109 70 -21 174 -18 242 7 99 37 103 36 151 -16 55 -60 71 -100 71
-179 0 -86 5 -96 48 -96 19 0 32 3 29 6 -3 4 -2 14 3 24 5 9 12 46 16 81 7 74
29 130 68 177 32 37 52 39 121 13 28 -10 85 -24 128 -31 94 -14 159 1 228 53
24 18 59 42 77 53 30 17 32 22 27 56 -6 36 -6 37 43 62 49 25 92 70 92 97 0 7
-9 23 -21 35 l-21 22 28 24 c62 50 114 106 114 122 0 9 -3 15 -7 15 -5 -1 -20
-1 -35 0 -38 1 -36 19 12 106 22 40 40 78 40 84 0 20 -101 12 -162 -13 l-57
-23 -3 31 c-2 26 -8 32 -31 34 -31 4 -99 -32 -135 -71 -26 -28 -58 -26 -67 4
-4 10 -9 19 -13 19 -20 0 -111 -82 -140 -125 -19 -28 -35 -50 -36 -50 -2 0
-10 6 -19 13 -13 11 -19 9 -37 -10 -40 -43 -82 -140 -106 -252 -29 -130 -52
-206 -64 -206 -29 0 -30 23 -20 476 0 7 24 27 52 45 64 41 118 96 169 171 38
56 109 186 109 200 0 4 -15 11 -32 16 -32 8 -33 10 -30 53 9 146 4 199 -19
199 -9 0 -22 -7 -29 -15 -20 -24 -25 -18 -38 53 -15 80 -33 132 -45 132 -4 0
-5 5 -2 10 10 16 -16 12 -35 -5 -15 -14 -21 -6 -65 92 -26 60 -52 114 -58 121
-17 22 -46 13 -64 -20z"/>
</g>
</svg>
`, Nd = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" aria-hidden="true">
  <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <!-- Övre swirl (uppåt) -->
    <path d="
      M 24 64
      H 110
      C 132 64, 150 54, 150 40
      C 150 28, 139 20, 126 20
      C 112 20, 104 30, 108 42
    " />

    <!-- Mitten swirl (nedåt, längre till höger) -->
    <path d="
      M 24 100
      H 168
      C 194 100, 208 116, 208 134
      C 208 152, 192 164, 174 164
      C 154 164, 142 148, 148 130
    " />

    <!-- Nedre swirl (nedåt) -->
    <path d="
      M 24 136
      H 92
      C 112 136, 124 146, 124 158
      C 124 168, 116 176, 106 176
      C 96 176, 90 168, 92 158
    " />
  </g>
</svg>
`, Bd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M923 1964 c-29 -24 -48 -52 -62 -90 -25 -65 -25 -64 -6 -64 10 0 15
10 15 27 0 32 64 99 105 109 61 15 122 -41 146 -138 7 -26 17 -48 21 -48 5 0
6 -4 3 -10 -4 -6 14 -10 48 -10 68 0 82 -15 91 -95 10 -89 27 -102 151 -112
l100 -8 -3 -55 c-3 -71 -14 -98 -79 -197 -29 -44 -53 -84 -53 -87 0 -10 81
-47 90 -41 6 3 10 1 10 -4 0 -6 4 -11 9 -11 6 0 30 -12 55 -27 90 -55 57 -115
-173 -312 -70 -60 -101 -103 -94 -131 3 -10 22 -34 44 -53 21 -20 39 -42 39
-49 0 -17 -46 -61 -124 -119 -68 -50 -115 -109 -152 -188 -30 -63 -53 -93 -65
-85 -5 3 -9 66 -9 139 l0 135 38 15 c20 9 76 30 124 47 96 33 128 63 55 52
-46 -7 -147 -41 -161 -55 -6 -5 -20 -9 -33 -9 -23 0 -23 1 -23 120 0 105 2
120 18 129 10 5 58 44 108 85 108 92 199 139 321 169 101 24 131 47 60 47 -45
0 -160 -28 -217 -52 -49 -21 -133 -76 -215 -142 -67 -53 -70 -55 -78 -33 -5
12 -7 84 -5 160 l3 137 85 81 c123 116 172 151 298 213 61 31 112 59 112 62 0
12 -94 -8 -146 -31 -74 -33 -155 -90 -254 -180 -72 -66 -85 -74 -91 -58 -11
27 -10 293 1 333 11 41 76 90 153 116 50 17 64 44 23 44 -31 0 -112 -35 -153
-66 -40 -30 -49 -30 -101 5 -55 38 -182 75 -182 54 0 -9 29 -33 40 -33 19 0
127 -60 147 -82 16 -18 18 -44 21 -212 l3 -191 -63 61 c-139 134 -278 221
-385 239 -50 8 -59 -9 -15 -27 88 -36 157 -71 199 -100 27 -18 49 -32 50 -31
1 1 41 -36 90 -82 48 -47 93 -84 99 -85 21 0 24 -28 24 -196 l0 -164 -36 32
c-106 96 -254 183 -354 206 -85 20 -163 26 -158 11 6 -18 24 -25 108 -45 88
-19 162 -50 225 -94 25 -17 45 -29 45 -26 0 3 30 -24 68 -59 37 -36 72 -65 78
-65 21 0 35 -242 15 -254 -5 -3 -31 4 -57 16 -56 24 -139 48 -171 48 -31 0
-19 -26 15 -35 31 -8 205 -75 212 -82 3 -2 8 -77 12 -166 8 -186 18 -259 36
-265 9 -3 12 14 12 62 0 65 1 66 33 79 24 11 41 31 71 88 54 103 78 131 160
193 92 70 115 92 127 123 11 29 -6 67 -45 100 -14 13 -26 30 -26 38 0 8 35 43
77 77 147 121 176 148 210 194 37 53 44 113 18 151 -17 24 -87 65 -140 83
l-36 12 24 31 c44 60 77 125 92 183 20 79 19 106 -7 136 -21 23 -33 26 -117
31 -52 3 -98 10 -104 16 -6 6 -14 39 -19 73 -8 61 -33 112 -57 114 -6 1 -31 2
-55 3 l-44 1 -6 44 c-7 46 -58 136 -76 136 -7 0 -18 7 -26 15 -10 10 -34 15
-67 15 -45 0 -58 -5 -94 -36z"/>
<path d="M781 1790 c-29 -5 -59 -14 -67 -22 -7 -7 -17 -46 -23 -87 -5 -40 -13
-77 -18 -81 -4 -4 -53 -12 -108 -18 -89 -9 -101 -12 -122 -37 -29 -33 -21 -50
16 -31 15 8 60 18 101 22 41 4 85 10 97 15 28 10 53 68 53 123 0 57 9 66 71
73 57 6 79 17 79 39 0 15 0 15 -79 4z"/>
<path d="M420 1488 c0 -2 9 -31 20 -65 22 -71 48 -123 84 -172 14 -19 23 -38
20 -43 -3 -5 -29 -19 -57 -32 -184 -82 -161 -194 80 -386 63 -50 117 -98 120
-107 4 -11 -7 -28 -34 -52 -37 -33 -60 -76 -44 -83 3 -2 13 -15 21 -29 8 -15
58 -63 111 -107 89 -75 116 -108 196 -240 8 -12 19 -20 24 -16 7 4 1 17 -14
33 -14 14 -33 42 -42 61 -10 19 -22 38 -27 41 -5 3 -19 22 -31 41 -12 20 -68
77 -125 128 l-104 93 46 46 c71 72 65 88 -66 191 -177 139 -241 228 -205 284
9 14 55 44 102 67 47 23 85 48 85 54 0 7 -15 32 -33 56 -45 61 -84 137 -92
182 -4 20 -11 37 -17 37 -5 0 -6 5 -3 10 3 6 1 10 -4 10 -6 0 -11 -1 -11 -2z"/>
</g>
</svg>
`, Hd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M1163 1925 c-46 -50 -134 -240 -163 -356 -27 -104 -38 -288 -21 -354
7 -26 10 -49 8 -51 -2 -2 -24 26 -49 63 -148 222 -329 342 -515 343 -50 0 -53
-1 -53 -25 0 -72 97 -234 190 -318 102 -92 189 -125 342 -129 65 -2 88 -6 88
-16 0 -18 -64 -156 -89 -191 -21 -30 -29 -77 -11 -66 6 3 10 1 10 -4 0 -6 8
-11 18 -11 16 0 82 94 82 117 0 5 6 18 14 29 14 19 15 19 23 -1 15 -36 67
-115 80 -119 6 -3 22 4 34 15 23 20 23 21 5 52 -50 86 -60 107 -84 167 -24 61
-26 76 -26 235 0 154 3 179 28 269 15 55 51 149 81 209 30 60 55 117 55 127 0
21 -31 32 -47 15z"/>
<path d="M1230 864 c-102 -44 -140 -111 -148 -255 -4 -80 -1 -109 17 -167 76
-252 306 -360 452 -213 73 72 95 179 69 336 -34 209 -238 365 -390 299z"/>
<path d="M658 814 c-159 -49 -292 -313 -260 -517 13 -87 55 -170 105 -211 36
-28 45 -31 110 -30 57 1 84 7 129 28 140 68 238 241 238 418 0 142 -42 243
-125 300 -47 32 -118 36 -197 12z"/>
</g>
</svg>
`, jd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M944 1846 c-9 -25 12 -249 41 -421 24 -141 33 -230 24 -239 -2 -3
-44 94 -93 214 -48 121 -95 227 -103 237 -49 60 48 -210 144 -401 62 -124 62
-109 16 -304 -15 -62 -30 -109 -34 -105 -4 5 -23 69 -44 143 -40 147 -141 439
-158 455 -25 25 10 -109 98 -374 l94 -286 -31 -87 c-18 -48 -35 -84 -39 -80
-4 4 -53 144 -108 312 -101 304 -115 339 -126 329 -12 -13 58 -247 138 -463
l86 -230 -30 -58 c-45 -89 -106 -186 -160 -254 -52 -66 -61 -94 -29 -94 24 0
79 66 146 173 l51 82 154 90 c184 108 412 261 453 304 66 69 -15 24 -294 -164
-160 -108 -290 -194 -290 -191 0 2 14 33 31 69 27 59 40 73 125 137 126 94
279 227 387 334 90 89 107 120 41 73 -31 -22 -271 -229 -452 -390 -30 -27 -56
-47 -58 -45 -2 3 10 39 26 82 30 78 31 78 284 329 232 230 292 297 268 297
-22 0 -171 -142 -331 -314 -95 -103 -175 -186 -176 -184 -9 8 47 204 63 222
190 216 255 296 340 420 138 199 -3 62 -198 -193 -66 -86 -127 -165 -135 -176
-15 -19 -16 -18 -10 20 3 22 72 171 152 330 80 160 144 297 141 305 -8 24 -88
-108 -184 -304 -48 -96 -89 -174 -92 -172 -4 5 26 147 79 369 22 93 38 174 36
180 -7 20 -45 -67 -72 -160 -14 -48 -36 -146 -49 -218 -13 -71 -26 -123 -29
-115 -7 19 -32 196 -53 370 -17 142 -27 180 -40 146z"/>
</g>
</svg>
`, Fd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M973 1948 c-16 -20 -65 -121 -113 -233 -75 -177 -99 -225 -110 -225
-6 0 -29 9 -51 20 -22 12 -51 25 -66 31 l-26 10 6 -98 c3 -63 18 -149 41 -241
20 -79 36 -150 36 -158 0 -32 -65 -15 -157 41 -89 54 -119 64 -139 46 -5 -5
-63 5 -139 25 -72 18 -141 33 -154 34 -22 0 -23 -2 -16 -47 10 -74 59 -211
110 -312 52 -104 51 -117 -16 -127 -22 -4 -39 -10 -39 -14 0 -19 105 -101 177
-138 150 -79 168 -90 171 -106 2 -10 -29 -48 -78 -96 -48 -46 -80 -85 -77 -93
13 -34 208 -58 311 -38 37 7 87 27 130 53 108 64 147 81 158 70 7 -7 9 -64 6
-151 -4 -137 -4 -141 16 -142 12 -1 28 -2 36 -3 8 0 18 3 22 8 3 6 4 74 1 153
l-6 143 22 0 c13 0 57 -23 99 -50 84 -55 142 -76 236 -86 101 -10 256 21 256
52 0 7 -23 32 -52 55 -69 58 -112 118 -97 135 6 8 61 40 121 71 110 58 208
132 208 158 0 8 -15 17 -35 21 -57 10 -58 21 -14 119 68 152 99 235 113 302
l14 64 -47 -6 c-25 -4 -97 -20 -160 -36 -80 -21 -117 -27 -124 -20 -20 20 -50
11 -102 -28 -87 -65 -168 -90 -182 -55 -3 9 11 72 32 141 45 149 60 243 51
305 l-7 47 -62 -30 c-34 -16 -70 -29 -80 -29 -21 0 -40 39 -108 225 -66 181
-101 251 -116 233z"/>
</g>
</svg>
`, Vd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M811 1900 c-1 -22 26 -54 34 -41 3 6 2 11 -3 11 -5 0 -14 10 -20 23
-6 13 -11 16 -11 7z"/>
<path d="M842 1843 c-6 -2 -9 -10 -5 -16 4 -7 8 -14 8 -17 1 -3 8 -30 17 -60
24 -79 44 -185 78 -398 55 -351 59 -407 91 -1069 l12 -253 28 0 28 0 1 173 c1
94 7 226 13 292 19 187 9 273 -89 803 -7 39 -25 116 -40 170 -14 53 -30 115
-36 137 -5 21 -15 53 -22 70 -8 16 -19 49 -25 73 -7 23 -16 42 -22 42 -6 0 -7
5 -4 10 3 6 1 10 -5 10 -6 0 -8 5 -4 12 5 7 3 8 -6 3 -10 -6 -12 -4 -7 8 3 10
5 17 4 16 -1 0 -8 -3 -15 -6z"/>
<path d="M1381 1497 c-6 -8 -8 -17 -4 -20 3 -4 2 -7 -4 -7 -11 0 -48 -71 -82
-157 -11 -29 -18 -53 -14 -53 4 0 2 -5 -5 -12 -7 -7 -12 -20 -12 -30 0 -10 -4
-18 -10 -18 -5 0 -10 9 -10 20 0 32 -88 225 -98 215 -3 -2 0 -10 6 -17 6 -7
10 -15 11 -18 0 -3 2 -12 5 -20 7 -22 33 -135 47 -207 11 -55 10 -73 -11 -170
-56 -262 -55 -256 -44 -691 l7 -292 36 0 36 0 -13 178 c-7 97 -10 238 -7 312
6 153 35 368 47 346 20 -37 47 -383 48 -628 l1 -208 40 0 39 0 0 128 c-1 171
-43 581 -69 667 -5 17 -17 76 -27 132 -14 87 -15 113 -5 170 7 38 13 73 15 78
2 6 6 24 11 40 9 39 28 93 58 178 14 37 23 67 20 67 -3 0 0 7 7 15 7 8 8 15 2
15 -5 0 -15 -6 -21 -13z"/>
<path d="M351 1394 c0 -6 10 -56 23 -110 93 -373 136 -711 136 -1054 l0 -210
23 -1 c12 0 31 -2 41 -4 18 -4 19 3 13 158 -11 297 -84 796 -143 982 -42 129
-67 200 -75 205 -4 3 -9 14 -12 25 -2 11 -5 15 -6 9z"/>
<path d="M555 1018 c62 -47 133 -126 169 -188 l38 -65 -20 -85 c-46 -190 -82
-443 -82 -577 l0 -73 38 0 37 0 1 158 c1 86 6 191 13 232 26 173 44 261 52
253 25 -26 79 -394 79 -545 l0 -88 65 0 65 0 0 109 c0 182 -53 390 -148 584
-27 54 -45 100 -41 102 4 3 9 17 12 32 3 16 8 39 13 53 l7 25 -22 -24 c-12
-14 -24 -35 -27 -48 -4 -13 -8 -23 -9 -23 -2 0 -30 26 -62 58 -36 36 -86 72
-133 95 -49 25 -64 30 -45 15z"/>
<path d="M1591 958 c-5 -13 -20 -52 -35 -87 -21 -52 -61 -195 -80 -286 -3 -11
-14 -64 -25 -119 -12 -54 -26 -175 -33 -268 -12 -182 -10 -192 37 -186 19 3
20 13 26 198 4 107 10 214 14 238 4 23 8 52 10 65 3 27 22 127 34 187 5 25 19
81 31 125 12 44 23 87 25 95 3 8 7 25 11 38 3 12 3 22 0 22 -4 0 -10 -10 -15
-22z"/>
<path d="M850 959 c0 -5 5 -7 10 -4 6 3 10 8 10 11 0 2 -4 4 -10 4 -5 0 -10
-5 -10 -11z"/>
</g>
</svg>
`, Gd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M981 1798 c-29 -45 -82 -100 -191 -196 -168 -149 -218 -206 -266
-306 -90 -187 -79 -367 29 -491 55 -62 106 -88 238 -121 139 -34 143 -39 158
-169 15 -129 32 -188 83 -287 28 -54 46 -78 59 -78 30 0 31 16 1 67 -49 84
-84 173 -100 254 -28 143 -2 181 138 204 121 19 138 24 203 58 155 81 233 269
182 442 -40 138 -98 227 -240 365 -117 114 -169 178 -209 257 -14 28 -30 54
-35 58 -6 3 -28 -23 -50 -57z m29 -275 c-6 -85 -10 -157 -7 -159 2 -3 34 31
71 76 106 128 100 98 -10 -46 l-65 -85 -5 -82 c-2 -45 -6 -103 -9 -129 -2 -30
0 -48 7 -48 6 0 77 68 159 151 82 82 149 147 149 143 0 -15 -59 -84 -165 -194
-160 -165 -155 -157 -155 -258 l0 -84 38 28 c90 68 279 222 335 273 33 31 55
47 49 36 -19 -36 -162 -166 -293 -267 -70 -53 -129 -104 -133 -113 -8 -23 -8
-77 2 -73 4 2 36 18 72 37 95 50 293 132 281 117 -12 -14 -67 -40 -205 -96
-43 -18 -98 -48 -122 -66 l-44 -34 -32 35 c-21 24 -73 56 -163 100 -73 36
-138 71 -145 80 -16 19 232 -99 288 -137 l43 -30 -3 48 c-3 48 -4 49 -108 136
-111 92 -221 201 -241 240 -6 13 31 -17 83 -67 94 -90 262 -235 273 -235 3 0
5 47 5 105 l0 105 -95 107 c-87 97 -173 218 -163 228 2 3 28 -28 56 -68 66
-90 190 -223 200 -213 4 4 9 56 10 116 l4 109 -61 104 c-34 57 -61 108 -61
113 0 5 28 -33 61 -84 34 -51 63 -92 65 -89 2 2 8 62 14 133 13 160 21 223 28
205 2 -7 -1 -83 -8 -168z"/>
</g>
</svg>
`, Wd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M1043 1876 c-18 -21 -24 -68 -32 -242 -4 -87 -11 -168 -16 -179 -4
-11 -5 -17 0 -13 4 4 13 1 21 -6 10 -10 13 -65 14 -237 1 -123 1 -232 1 -242
-1 -12 -17 4 -43 42 -24 32 -67 88 -96 123 -29 35 -78 94 -110 132 -70 85 -87
101 -113 102 -15 1 -18 -3 -13 -20 8 -26 36 -65 47 -66 12 0 8 -28 -5 -32 -11
-4 -21 -38 -10 -38 3 0 14 7 24 17 12 11 18 12 18 4 0 -7 24 -40 54 -73 30
-33 67 -78 83 -101 15 -23 47 -62 70 -87 23 -25 53 -58 67 -74 l26 -29 0 -256
c0 -212 -2 -253 -13 -241 -7 8 -38 44 -69 80 l-56 65 -7 88 c-9 120 -31 115
-37 -8 l-3 -50 -72 84 c-59 70 -73 92 -76 125 l-3 41 -13 -34 -14 -33 -26 33
c-37 47 -79 89 -90 89 -5 0 -11 6 -14 14 -4 9 -14 12 -25 9 -39 -10 -20 -38
124 -188 59 -60 140 -145 181 -187 41 -43 79 -75 84 -72 5 3 8 2 7 -3 -2 -4
25 -37 60 -73 l62 -65 1 -110 c1 -137 7 -159 41 -163 22 -3 26 1 31 35 4 21 7
51 7 67 0 41 64 150 125 213 44 45 56 53 89 53 41 0 76 15 76 32 0 7 -19 9
-61 4 l-61 -6 24 33 c13 17 35 48 49 67 45 66 71 90 85 79 7 -6 14 -6 18 -1 3
6 -3 12 -14 15 -19 5 -18 10 25 79 53 86 63 118 36 118 -21 0 -62 -49 -88
-106 -10 -22 -22 -42 -28 -46 -12 -9 -31 -10 -22 -2 3 4 -1 21 -10 38 -18 35
-29 21 -17 -22 9 -34 11 -55 4 -62 -3 -3 -28 -40 -55 -82 -28 -42 -53 -77 -57
-78 -7 0 -17 25 -24 67 -6 33 -12 43 -25 43 -6 0 -8 -17 -5 -42 8 -74 12 -83
32 -79 18 3 18 2 1 -16 -9 -11 -14 -23 -10 -26 3 -4 2 -7 -4 -7 -6 0 -16 -15
-24 -33 -12 -30 -41 -67 -54 -67 -3 0 -5 104 -5 231 l0 231 49 49 c47 47 57
52 134 64 44 7 40 22 -8 31 -19 3 -35 10 -35 14 0 7 87 95 139 139 27 23 37
26 46 11 10 -16 35 -12 35 5 0 9 -12 18 -28 21 -16 3 -29 12 -29 20 0 8 2 12
5 10 4 -5 47 43 80 91 23 32 29 63 13 63 -17 0 -71 -51 -102 -96 -16 -24 -35
-44 -41 -44 -6 0 -9 3 -5 6 3 4 -1 21 -11 38 l-17 31 -3 -34 c-2 -20 2 -37 10
-42 10 -7 10 -9 1 -9 -7 0 -13 -5 -13 -12 0 -15 -109 -158 -121 -158 -4 0 -14
12 -21 27 -25 51 -38 40 -31 -27 5 -51 2 -64 -13 -81 -19 -21 -19 -21 -26 17
-4 22 -7 155 -7 297 -1 251 0 259 19 264 20 5 28 37 12 47 -5 3 -10 66 -11
141 -2 155 -14 239 -35 260 -18 18 -37 19 -53 1z"/>
<path d="M798 1294 c-9 -8 3 -44 13 -38 11 7 12 44 1 44 -5 0 -11 -3 -14 -6z"/>
<path d="M956 1119 c-18 -17 -18 -19 -2 -19 9 0 19 7 23 15 8 23 0 25 -21 4z"/>
<path d="M940 1084 c0 -1 6 -7 14 -13 10 -9 15 -8 19 3 4 10 0 14 -14 13 -10
-1 -19 -2 -19 -3z"/>
<path d="M820 1020 c-13 -9 -13 -11 0 -20 25 -16 52 -12 48 7 -4 21 -27 27
-48 13z"/>
<path d="M585 669 c-4 -6 -4 -13 -1 -16 8 -8 36 5 36 17 0 13 -27 13 -35 -1z"/>
<path d="M703 493 c-7 -2 -13 -9 -13 -14 0 -6 4 -8 9 -4 5 3 12 1 15 -3 7 -11
96 -15 96 -4 0 21 -74 39 -107 25z"/>
</g>
</svg>
`, Ud = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M925 1860 c-85 -111 -145 -268 -145 -380 0 -115 51 -250 125 -329 61
-65 77 -68 122 -24 92 92 133 202 133 355 0 142 -40 256 -134 385 -17 23 -37
44 -43 47 -7 3 -33 -21 -58 -54z"/>
<path d="M444 1218 c11 -164 43 -263 114 -356 76 -101 185 -163 311 -178 l61
-7 0 74 c-1 197 -84 379 -216 470 -61 42 -185 89 -235 89 l-42 0 7 -92z"/>
<path d="M1420 1300 c-94 -23 -223 -100 -282 -169 -77 -90 -127 -229 -130
-364 -2 -91 12 -100 132 -77 79 15 138 48 205 115 106 105 155 237 155 412 0
104 2 102 -80 83z"/>
<path d="M449 723 c-3 -70 4 -168 16 -221 38 -166 163 -315 310 -371 62 -24
151 -38 141 -23 -3 6 0 12 6 14 21 7 16 172 -6 238 -63 186 -200 317 -382 365
-74 19 -84 19 -85 -2z"/>
<path d="M1400 721 c-236 -76 -391 -291 -390 -540 0 -79 6 -85 76 -78 78 8
172 56 249 128 107 100 175 273 175 444 0 64 0 65 -27 64 -16 0 -53 -8 -83
-18z"/>
</g>
</svg>
`, Kd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M922 1847 c-110 -185 -143 -260 -188 -431 -30 -112 -36 -153 -41
-286 -14 -355 50 -556 272 -859 23 -32 25 -42 25 -151 0 -104 2 -117 18 -117
28 0 32 16 32 136 0 107 1 114 23 132 13 10 49 55 79 101 93 140 133 229 175
392 23 90 26 121 27 281 1 203 -12 286 -69 461 -56 169 -220 494 -250 494 -6
0 -53 -69 -103 -153z m68 -157 c0 -129 -3 -158 -13 -154 -8 3 -14 10 -15 17
-1 7 -12 43 -26 81 -22 64 -23 72 -10 109 14 39 52 107 60 107 2 0 4 -72 4
-160z m102 99 c18 -35 27 -64 24 -84 -6 -45 -44 -148 -61 -165 -13 -13 -15 5
-15 149 0 182 5 192 52 100z m-208 -194 c8 -19 32 -60 52 -90 20 -31 40 -72
45 -93 12 -51 11 -272 -1 -272 -29 0 -120 136 -149 222 -25 73 -26 111 -6 167
8 23 15 45 16 49 4 19 19 52 24 52 2 0 11 -16 19 -35z m327 -78 c13 -42 19
-80 15 -98 -13 -66 -83 -196 -132 -245 l-49 -49 -3 148 -3 148 35 41 c19 22
47 69 63 104 26 61 28 63 40 41 7 -12 22 -53 34 -90z m74 -283 c8 -94 -7 -162
-56 -254 -35 -65 -58 -92 -120 -142 -69 -57 -73 -54 -77 57 -5 120 4 172 28
180 27 9 133 137 170 207 39 72 46 66 55 -48z m-500 76 c13 -42 104 -167 151
-209 l49 -43 3 -129 c4 -144 2 -147 -57 -102 -62 47 -100 95 -144 182 -38 76
-42 92 -42 155 1 126 22 203 40 146z m67 -482 c32 -31 73 -62 92 -69 42 -15
46 -28 46 -141 0 -67 -3 -88 -13 -88 -8 0 -41 25 -74 54 -72 65 -123 158 -147
263 -23 102 -21 116 11 73 15 -19 53 -61 85 -92z m433 60 c-13 -108 -57 -211
-119 -276 -32 -35 -115 -97 -121 -90 -4 4 -8 104 -7 164 2 48 4 52 30 57 35 8
111 71 169 142 25 30 48 55 50 55 3 0 2 -24 -2 -52z m-313 -408 c12 0 17 -15
20 -67 3 -38 4 -70 2 -72 -4 -5 -54 54 -86 103 -15 22 -31 46 -36 51 -5 6 -7
16 -4 23 2 8 17 4 46 -13 24 -14 50 -25 58 -25z m188 25 c0 -2 -19 -35 -41
-72 -63 -103 -81 -109 -77 -26 3 58 3 58 48 80 44 21 70 28 70 18z"/>
</g>
</svg>
`, Yd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<!-- PM2.5 variant A: Dense cloud of fine particles -->
<!-- Many small circles scattered across canvas -->
<path d="
M 345 1650 a 55 55 0 1 0 110 0 a 55 55 0 1 0 -110 0 z
M 655 1720 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 z
M 1050 1680 a 60 60 0 1 0 120 0 a 60 60 0 1 0 -120 0 z
M 1450 1600 a 45 45 0 1 0 90 0 a 45 45 0 1 0 -90 0 z
M 1700 1700 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 z
M 240 1300 a 55 55 0 1 0 110 0 a 55 55 0 1 0 -110 0 z
M 560 1350 a 45 45 0 1 0 90 0 a 45 45 0 1 0 -90 0 z
M 880 1280 a 65 65 0 1 0 130 0 a 65 65 0 1 0 -130 0 z
M 1250 1380 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 z
M 1580 1300 a 55 55 0 1 0 110 0 a 55 55 0 1 0 -110 0 z
M 180 950 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 z
M 490 980 a 60 60 0 1 0 120 0 a 60 60 0 1 0 -120 0 z
M 800 900 a 45 45 0 1 0 90 0 a 45 45 0 1 0 -90 0 z
M 1100 970 a 55 55 0 1 0 110 0 a 55 55 0 1 0 -110 0 z
M 1400 920 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 z
M 1700 960 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 z
M 320 600 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 z
M 650 560 a 55 55 0 1 0 110 0 a 55 55 0 1 0 -110 0 z
M 980 620 a 45 45 0 1 0 90 0 a 45 45 0 1 0 -90 0 z
M 1320 580 a 60 60 0 1 0 120 0 a 60 60 0 1 0 -120 0 z
M 1620 640 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 z
M 450 300 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 z
M 820 280 a 55 55 0 1 0 110 0 a 55 55 0 1 0 -110 0 z
M 1180 320 a 45 45 0 1 0 90 0 a 45 45 0 1 0 -90 0 z
M 1520 290 a 50 50 0 1 0 100 0 a 50 50 0 1 0 -100 0 z
"/>
</g>
</svg>
`, qd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<!-- PM10 variant A: Fewer, larger particles scattered -->
<path d="
M 250 1600 a 130 130 0 1 0 260 0 a 130 130 0 1 0 -260 0 z
M 750 1700 a 110 110 0 1 0 220 0 a 110 110 0 1 0 -220 0 z
M 1300 1600 a 140 140 0 1 0 280 0 a 140 140 0 1 0 -280 0 z
M 1650 1750 a 100 100 0 1 0 200 0 a 100 100 0 1 0 -200 0 z
M 400 1150 a 120 120 0 1 0 240 0 a 120 120 0 1 0 -240 0 z
M 900 1100 a 150 150 0 1 0 300 0 a 150 150 0 1 0 -300 0 z
M 1450 1200 a 110 110 0 1 0 220 0 a 110 110 0 1 0 -220 0 z
M 250 700 a 140 140 0 1 0 280 0 a 140 140 0 1 0 -280 0 z
M 750 650 a 120 120 0 1 0 240 0 a 120 120 0 1 0 -240 0 z
M 1250 750 a 130 130 0 1 0 260 0 a 130 130 0 1 0 -260 0 z
M 1650 680 a 110 110 0 1 0 220 0 a 110 110 0 1 0 -220 0 z
M 500 300 a 100 100 0 1 0 200 0 a 100 100 0 1 0 -200 0 z
M 1000 350 a 130 130 0 1 0 260 0 a 130 130 0 1 0 -260 0 z
M 1500 280 a 110 110 0 1 0 220 0 a 110 110 0 1 0 -220 0 z
"/>
</g>
</svg>
`, Xd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<!-- Ozone variant C: City skyline silhouette with smog layer above -->
<!-- Smog/haze layer over city -->
<path d="M 100 1200 Q 300 1250 600 1240 Q 900 1230 1200 1240 Q 1500 1250 1800 1230 L 1900 1220
         L 1900 1050 Q 1600 1070 1300 1060 Q 1000 1050 700 1060 Q 400 1070 100 1050 Z"/>
<!-- Thinner haze wisps above -->
<path d="M 200 1400 Q 500 1420 900 1410 Q 1300 1400 1600 1410 L 1700 1400
         L 1700 1350 Q 1400 1360 1000 1350 Q 600 1340 300 1350 L 200 1340 Z"/>
<path d="M 350 1550 Q 600 1570 900 1560 Q 1200 1550 1500 1560 L 1600 1550
         L 1600 1520 Q 1300 1530 1000 1520 Q 700 1510 400 1520 L 350 1510 Z"/>
<!-- City skyline silhouette -->
<path d="M 150 200 L 150 700 L 300 700 L 300 200 Z"/>
<path d="M 320 200 L 320 900 L 480 900 L 480 200 Z"/>
<path d="M 500 200 L 500 750 L 630 750 L 630 200 Z"/>
<path d="M 650 200 L 650 1000 L 800 1000 L 800 200 Z"/>
<path d="M 820 200 L 820 650 L 930 650 L 930 200 Z"/>
<path d="M 950 200 L 950 850 L 1020 850 L 1020 950 L 1040 950 L 1040 850 L 1100 850 L 1100 200 Z"/>
<path d="M 1120 200 L 1120 780 L 1260 780 L 1260 200 Z"/>
<path d="M 1280 200 L 1280 920 L 1420 920 L 1420 200 Z"/>
<path d="M 1440 200 L 1440 600 L 1560 600 L 1560 200 Z"/>
<path d="M 1580 200 L 1580 750 L 1720 750 L 1720 200 Z"/>
<path d="M 1740 200 L 1740 680 L 1850 680 L 1850 200 Z"/>
</g>
</svg>
`, Zd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<!-- NO2 v2: Car silhouette with exhaust - unified body+cabin -->
<!-- Single unified car silhouette (body + cabin as one path) -->
<path d="M 300 300 Q 200 300 200 400 L 200 530
         L 380 530 L 430 750 L 920 750 L 970 530 L 1200 530
         L 1200 400 Q 1200 300 1100 300 Z"/>
<!-- Front wheel arch cutout -->
<path d="M 280 380 a 90 90 0 1 1 180 0 L 280 380 Z"/>
<!-- Rear wheel arch cutout -->
<path d="M 930 380 a 90 90 0 1 1 180 0 L 930 380 Z"/>
<!-- Wheels (solid) -->
<path d="M 290 300 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0 z"/>
<path d="M 940 300 a 80 80 0 1 0 160 0 a 80 80 0 1 0 -160 0 z"/>
<!-- Wheel hubs (cutout) -->
<path d="M 330 300 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0 z"/>
<path d="M 980 300 a 40 40 0 1 1 80 0 a 40 40 0 1 1 -80 0 z"/>
<!-- Window (cutout on cabin) -->
<path d="M 470 580 L 500 700 L 660 700 L 660 580 Z"/>
<path d="M 690 580 L 690 700 L 880 700 L 910 580 Z"/>
<!-- Exhaust fumes (organic cloud shapes rising behind car) -->
<path d="M 1250 480 Q 1300 580 1370 540 Q 1440 500 1480 600 Q 1520 700 1430 740 Q 1340 780 1300 680 Q 1260 580 1250 480 Z"/>
<path d="M 1380 650 Q 1450 790 1540 740 Q 1630 690 1680 810 Q 1730 930 1620 980 Q 1510 1030 1440 890 Q 1370 750 1380 650 Z"/>
<path d="M 1340 880 Q 1420 1030 1520 980 Q 1620 930 1680 1070 Q 1740 1210 1610 1280 Q 1480 1350 1400 1180 Q 1320 1010 1340 880 Z"/>
<path d="M 1480 1100 Q 1560 1260 1660 1210 Q 1760 1160 1800 1310 Q 1840 1460 1710 1520 Q 1580 1580 1520 1400 Q 1460 1220 1480 1100 Z"/>
<path d="M 1400 1330 Q 1480 1490 1580 1440 Q 1680 1390 1720 1540 Q 1760 1690 1620 1750 Q 1480 1810 1420 1630 Q 1360 1450 1400 1330 Z"/>
</g>
</svg>
`, Qd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<!-- SO2 v2: Factory with chimneys integrated into roof -->
<!-- Factory body + sawtooth roof + chimneys as unified shape -->
<path d="M 300 200 L 300 700
         L 400 800 L 480 720 L 480 720
         L 480 1350 L 630 1350 L 630 800
         L 700 720 L 800 800 L 900 720
         L 1000 800 L 1100 720 L 1200 800
         L 1330 700 L 1330 1450 L 1500 1450 L 1500 800
         L 1600 720 L 1700 800 L 1700 200 Z"/>
<!-- Left chimney top rim -->
<path d="M 450 1350 L 450 1400 L 660 1400 L 660 1350 Z"/>
<!-- Right chimney top rim -->
<path d="M 1300 1450 L 1300 1500 L 1530 1500 L 1530 1450 Z"/>
<!-- Smoke from left chimney -->
<path d="M 500 1430 Q 540 1530 610 1500 Q 680 1470 710 1570 Q 740 1670 660 1720 Q 580 1770 540 1660 Q 500 1550 500 1430 Z"/>
<path d="M 530 1700 Q 580 1830 670 1790 Q 760 1750 800 1870 Q 840 1990 740 2030 Q 640 2070 590 1930 Q 540 1790 530 1700 Z"/>
<!-- Smoke from right chimney (bigger) -->
<path d="M 1370 1530 Q 1420 1660 1510 1620 Q 1600 1580 1650 1710 Q 1700 1840 1590 1900 Q 1480 1960 1420 1810 Q 1360 1660 1370 1530 Z"/>
<path d="M 1420 1820 Q 1480 1960 1580 1920 Q 1680 1880 1730 2020 Q 1780 2160 1660 2210 Q 1540 2260 1470 2100 Q 1400 1940 1420 1820 Z"/>
<!-- Windows (cutouts in body) -->
<path d="M 400 600 L 400 500 L 500 500 L 500 600 Z"/>
<path d="M 650 600 L 650 500 L 750 500 L 750 600 Z"/>
<path d="M 1200 600 L 1200 500 L 1300 500 L 1300 600 Z"/>
<path d="M 1500 600 L 1500 500 L 1600 500 L 1600 600 Z"/>
<!-- Door -->
<path d="M 920 200 L 920 480 L 1060 480 L 1060 200 Z"/>
</g>
</svg>
`, Jd = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
 "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<!-- Asymmetric anatomical lungs silhouette for Air Quality Index -->

<!-- Trachea -->
<path d="M 970 1860 L 970 1580 L 1030 1580 L 1030 1860 Z"/>

<!-- Left bronchus (even-width tube, steeper angle) -->
<path d="
M 970 1580
Q 925 1518 878 1448
L 905 1460
Q 948 1528 993 1580
Z"/>

<!-- Left lung: narrower, taller, with cardiac notch on inner-lower edge -->
<path d="
M 880 1450
C 810 1490 720 1500 650 1470
C 520 1400 400 1260 340 1060
C 280 860 270 670 290 520
C 310 370 400 290 530 260
C 660 230 770 280 840 370
C 880 420 900 480 910 560
C 920 640 925 730 930 850
Z"/>

<!-- Right bronchus (even-width tube, gentler angle) -->
<path d="
M 1030 1580
Q 1075 1518 1122 1448
L 1095 1460
Q 1052 1528 1007 1580
Z"/>

<!-- Right lung: wider, slightly shorter (liver pushes base up) -->
<path d="
M 1120 1450
C 1190 1490 1300 1510 1380 1480
C 1520 1410 1660 1270 1730 1060
C 1800 850 1800 660 1770 520
C 1740 380 1650 310 1510 290
C 1370 260 1240 290 1160 380
C 1100 440 1080 540 1075 680
Z"/>
</g>
</svg>
`, ec = {
  alder: xd,
  allergy_risk: wd,
  allergy_risk_1: kd,
  allergy_risk_2: Sd,
  allergy_risk_3: Ad,
  allergy_risk_4: Pd,
  allergy_risk_5: Cd,
  allergy_risk_6: Md,
  ash: zd,
  beech: Ed,
  birch: Ld,
  chenopod: Ms,
  goosefoot: Ms,
  // Alias until dedicated icon is available
  cypress: Td,
  elm: Dd,
  grass: $d,
  plantain: Ki,
  // Temporary alias (weed category)
  hazel: Od,
  lime: Id,
  mold_spores: Rd,
  mugwort: Ki,
  sorrel: Ki,
  // Temporary alias (weed category)
  nettle_and_pellitory: zs,
  nettle: zs,
  // Alias for compatibility
  no_allergens: Nd,
  oak: Bd,
  olive: Hd,
  pine: jd,
  plane: Fd,
  poaceae: Vd,
  poplar: Gd,
  ragweed: Wd,
  rye: Ud,
  willow: Kd,
  // Pollution
  pm25: Yd,
  pm10: qd,
  ozone: Xd,
  no2: Zd,
  so2: Qd,
  qualite_globale: Jd
};
function Yi(t) {
  return !t || typeof t != "string" ? null : ec[t] || null;
}
const tc = {
  "card.allergen.alder": "Olše",
  "card.allergen.allergy_risk": "Riziko alergie",
  "card.allergen.ash": "Jasan",
  "card.allergen.beech": "Buk",
  "card.allergen.birch": "Bříza",
  "card.allergen.chenopod": "Laskavec",
  "card.allergen.cypress": "Cypřiš",
  "card.allergen.elm": "Jilm",
  "card.allergen.goosefoot": "Mrlík",
  "card.allergen.grass": "Tráva",
  "card.allergen.grass_cat": "Traviny",
  "card.allergen.hazel": "Líska",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Lípa",
  "card.allergen.maple": "Javor",
  "card.allergen.mold_spores": "Plísňové spory",
  "card.allergen.mugwort": "Pelyněk",
  "card.allergen.nettle": "Kopřiva",
  "card.allergen.nettle_and_pellitory": "Kopřiva a parietárie",
  "card.allergen.no2": "Oxid dusičitý",
  "card.allergen.oak": "Dub",
  "card.allergen.olive": "Olivovník",
  "card.allergen.ozone": "Ozón",
  "card.allergen.pine": "Borovice",
  "card.allergen.plane": "Platan",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.plantain": "Jitrocel",
  "card.allergen.poaceae": "Traviny",
  "card.allergen.poplar": "Topol",
  "card.allergen.qualite_globale": "Kvalita ovzduší",
  "card.allergen.ragweed": "Ambrozie",
  "card.allergen.rye": "Žito",
  "card.allergen.so2": "Oxid siřičitý",
  "card.allergen.sorrel": "Šťovík",
  "card.allergen.trees": "Stromy",
  "card.allergen.trees_cat": "Stromy",
  "card.allergen.weeds": "Plevely",
  "card.allergen.weeds_cat": "Plevely",
  "card.allergen.willow": "Vrba",
  "card.days.0": "Dnes",
  "card.days.1": "Zítra",
  "card.days.2": "Pozítří",
  "card.error": "Nenalezeny žádné pylové senzory. Je správná integrace nainstalována a vybrán region v nastavení karty?",
  "card.error_filtered_sensors": "Žádné senzory neodpovídají filtrům. Zkontrolujte vybrané alergeny a práh.",
  "card.error_location_not_found": "Umístění nebylo nalezeno. Zkontrolujte název umístění v konfiguraci karty.",
  "card.error_entity_unavailable": "Meteorologická entita není dostupná. Integrace může být offline nebo se restartuje.",
  "card.error_no_sensors": "Nenalezeny žádné pylové senzory. Je správná integrace nainstalována a vybrán region v nastavení karty?",
  "card.header_prefix": "Pylová předpověď pro",
  "card.header_no_location": "Pylová předpověď",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Nenalezena žádná pylová integrace",
  "card.levels.0": "Žádný pyl",
  "card.levels.1": "Nízké úrovně",
  "card.levels.2": "Nízké–střední úrovně",
  "card.levels.3": "Střední úrovně",
  "card.levels.4": "Střední–vysoké úrovně",
  "card.levels.5": "Vysoké úrovně",
  "card.levels.6": "Velmi vysoké úrovně",
  "card.index.very_low": "Velmi nízké úrovně",
  "card.loading_forecast": "Načítání předpovědi...",
  "card.location.plu": "Lucembursko",
  "card.no_allergens": "Žádné alergeny",
  "card.no_information": "(Žádné informace)",
  "card.atmo.unavailable": "Nedostupné",
  "card.atmo.event": "Událost",
  "card.stale_allergen": "Žádná data",
  "card.stale_data": "Pylová data jsou dočasně nedostupná",
  "card.stale_data_subtitle": "Poskytovatel momentálně nevrací data pro tuto oblast",
  "editor.allergen_color_custom": "Vlastní barvy",
  "editor.allergen_color_default_colors": "Výchozí barvy",
  "editor.allergen_color_mode": "Režim barev alergenů",
  "editor.allergen_colors": "Barvy alergenů (podle úrovně)",
  "editor.allergen_colors_header": "Vzhled alergenů",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Obnovit výchozí",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synchronizovat mezeru s tloušťkou čáry alergenu",
  "editor.allergen_outline_color": "Barva obrysu",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Obnovit obrys",
  "editor.allergen_stroke_color_synced": "Synchronizovat barvu čáry s úrovní",
  "editor.allergen_stroke_width": "Tloušťka čáry",
  "editor.allergen_stroke_width_reset": "Obnovit tloušťku čáry",
  "editor.allergens": "Alergeny",
  "editor.allergens_abbreviated": "Zkrátit alergeny",
  "editor.allergens_header_category": "Kategorie alergenů (obecné)",
  "editor.allergens_header_pollen": "Pyl",
  "editor.allergens_header_pollution": "Kvalita ovzduší",
  "editor.allergens_header_specific": "Jednotlivé alergeny (specifické)",
  "editor.allergens_header_summary": "Souhrn",
  "editor.allergy_risk_top": "Riziko alergie navrchu seznamu",
  "editor.background_color": "Barva pozadí",
  "editor.background_color_picker": "Vybrat barvu",
  "editor.background_color_placeholder": "např. #ffeecc nebo var(--my-color)",
  "editor.card_version": "Verze karty s pylovou předpovědí",
  "editor.city": "Město",
  "editor.days_abbreviated": "Zkrátit dny v týdnu",
  "editor.days_boldfaced": "Zvýraznit dny v týdnu",
  "editor.days_relative": "Relativní dny (dnes/zítra)",
  "editor.days_uppercase": "Velká písmena dny v týdnu",
  "editor.debug": "Ladění",
  "editor.entity_prefix": "Prefix entity",
  "editor.entity_prefix_placeholder": "např. pollen_",
  "editor.entity_suffix": "Suffix entity",
  "editor.entity_suffix_placeholder": "např. _home",
  "editor.icon_color_custom": "Vlastní barva",
  "editor.icon_color_inherit": "Dědit z grafu",
  "editor.icon_color_mode": "Režim barvy ikony",
  "editor.icon_color_picker": "Vybrat barvu ikony",
  "editor.icon_size": "Velikost ikony (px)",
  "editor.index_top": "Index navrchu seznamu",
  "editor.integration": "Integrace",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Barvy segmentů",
  "editor.levels_colors_placeholder": "např. #ffeecc nebo var(--my-color)",
  "editor.levels_custom": "Použít vlastní barvy úrovní",
  "editor.levels_empty_color": "Barva prázdného segmentu",
  "editor.levels_gap": "Mezera (px)",
  "editor.levels_gap_color": "Barva mezery",
  "editor.levels_gap_inherited": "Mezera (zděděná z alergenu)",
  "editor.levels_header": "Vzhled kruhů úrovní",
  "editor.levels_icon_ratio": "Poměr ikon úrovní",
  "editor.levels_inherit_allergen": "Dědit z barev alergenů",
  "editor.levels_inherit_header": "Dědění kruhů úrovní",
  "editor.levels_inherit_mode": "Režim barev kruhů úrovní",
  "editor.levels_reset": "Obnovit výchozí",
  "editor.levels_text_color": "Barva textu (vnitřní kruh)",
  "editor.levels_text_size": "Velikost textu (vnitřní kruh, % z normálu)",
  "editor.levels_text_weight": "Tloušťka textu (vnitřní kruh)",
  "editor.levels_thickness": "Tloušťka (%)",
  "editor.link_to_sensors": "Propojit alergeny se senzory",
  "editor.locale": "Jazyk",
  "editor.location": "Poloha",
  "editor.location_autodetect": "Automatická detekce",
  "editor.location_manual": "Manuálně",
  "editor.minimal": "Minimální režim",
  "editor.minimal_gap": "Mezera mezi alergeny (px)",
  "editor.mode": "Režim",
  "editor.mode_daily": "Denně",
  "editor.mode_hourly": "Hodinově",
  "editor.mode_hourly_eighth": "Hodinově (každé 8 h)",
  "editor.mode_hourly_fourth": "Hodinově (každé 4 h)",
  "editor.mode_hourly_second": "Hodinově (každé 2 h)",
  "editor.mode_hourly_sixth": "Hodinově (každé 6 h)",
  "editor.mode_hourly_third": "Hodinově (každé 3 h)",
  "editor.mode_twice_daily": "Dvakrát denně",
  "editor.no_allergens_color": "Bez alergenů",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Obnovit barvu bez alergenů",
  "editor.no_information": "Žádné informace",
  "editor.numeric_state_raw_risk": "Zobrazit surovou hodnotu (riziko alergie)",
  "editor.peu_nondaily_expl": "Pouze 'allergen_risk' je dostupný v nedenních režimech.",
  "editor.phrases": "Fráze",
  "editor.phrases_apply": "Použít",
  "editor.phrases_days": "Relativní dny",
  "editor.phrases_days.0": "Dnes",
  "editor.phrases_days.1": "Zítra",
  "editor.phrases_days.2": "Pozítří",
  "editor.phrases_full": "Alergeny",
  "editor.phrases_full.alder": "Olše",
  "editor.phrases_full.allergy_risk": "Riziko alergie",
  "editor.phrases_full.ash": "Jasan",
  "editor.phrases_full.beech": "Buk",
  "editor.phrases_full.birch": "Bříza",
  "editor.phrases_full.chenopod": "Laskavec",
  "editor.phrases_full.cypress": "Cypřiš",
  "editor.phrases_full.elm": "Jilm",
  "editor.phrases_full.goosefoot": "Mrlík",
  "editor.phrases_full.grass": "Tráva",
  "editor.phrases_full.grass_cat": "Traviny",
  "editor.phrases_full.hazel": "Líska",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Lípa",
  "editor.phrases_full.maple": "Javor",
  "editor.phrases_full.mold_spores": "Plísňové spory",
  "editor.phrases_full.mugwort": "Pelyněk",
  "editor.phrases_full.nettle": "Kopřiva",
  "editor.phrases_full.nettle_and_pellitory": "Kopřiva a parietárie",
  "editor.phrases_full.no2": "Oxid dusičitý",
  "editor.phrases_full.oak": "Dub",
  "editor.phrases_full.olive": "Olivovník",
  "editor.phrases_full.ozone": "Ozón",
  "editor.phrases_full.pine": "Borovice",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.plantain": "Jitrocel",
  "editor.phrases_full.poaceae": "Traviny",
  "editor.phrases_full.poplar": "Topol",
  "editor.phrases_full.qualite_globale": "Kvalita ovzduší",
  "editor.phrases_full.ragweed": "Ambrozie",
  "editor.phrases_full.rye": "Žito",
  "editor.phrases_full.so2": "Oxid siřičitý",
  "editor.phrases_full.sorrel": "Šťovík",
  "editor.phrases_full.trees": "Stromy",
  "editor.phrases_full.trees_cat": "Stromy",
  "editor.phrases_full.weeds": "Plevely",
  "editor.phrases_full.weeds_cat": "Plevely",
  "editor.phrases_full.willow": "Vrba",
  "editor.phrases_levels": "Úrovně alergenů",
  "editor.phrases_levels.0": "Žádný pyl",
  "editor.phrases_levels.1": "Nízké úrovně",
  "editor.phrases_levels.2": "Nízké–střední úrovně",
  "editor.phrases_levels.3": "Střední úrovně",
  "editor.phrases_levels.4": "Střední–vysoké úrovně",
  "editor.phrases_levels.5": "Vysoké úrovně",
  "editor.phrases_levels.6": "Velmi vysoké úrovně",
  "editor.phrases_short": "Alergeny, krátce",
  "editor.phrases_short.alder": "Olše",
  "editor.phrases_short.allergy_risk": "Riziko",
  "editor.phrases_short.ash": "Jas.",
  "editor.phrases_short.beech": "Buk",
  "editor.phrases_short.birch": "Bříza",
  "editor.phrases_short.chenopod": "Laskav",
  "editor.phrases_short.cypress": "Cypř.",
  "editor.phrases_short.elm": "Jilm",
  "editor.phrases_short.goosefoot": "Mrlík",
  "editor.phrases_short.grass": "Tráva",
  "editor.phrases_short.grass_cat": "Tráva",
  "editor.phrases_short.grasses": "Trávy",
  "editor.phrases_short.hazel": "Líska",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Lípa",
  "editor.phrases_short.maple": "Javor",
  "editor.phrases_short.mold_spores": "Plísně",
  "editor.phrases_short.mugwort": "Pelyněk",
  "editor.phrases_short.nettle": "Kopřiv",
  "editor.phrases_short.nettle_and_pellitory": "Kopřiva",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Dub",
  "editor.phrases_short.olive": "Oliv.",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Borovi",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.plantain": "Jitrc",
  "editor.phrases_short.poaceae": "Travin",
  "editor.phrases_short.poplar": "Topol",
  "editor.phrases_short.qualite_globale": "IKO",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Žito",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Šťov",
  "editor.phrases_short.trees": "Stromy",
  "editor.phrases_short.trees_cat": "Stromy",
  "editor.phrases_short.weeds": "Plevely",
  "editor.phrases_short.weeds_cat": "Plevely",
  "editor.phrases_short.willow": "Vrba",
  "editor.phrases_translate_all": "Přeložit vše",
  "editor.pollen_threshold": "Práh:",
  "editor.pollution_block_bottom": "Dole (pod pylem)",
  "editor.pollution_block_position": "Pozice znečištění",
  "editor.pollution_block_top": "Nahoře (nad pylem)",
  "editor.preset_reset_all": "Obnovit všechna nastavení",
  "editor.region_id": "ID regionu",
  "editor.select_all_allergens": "Vybrat všechny alergeny",
  "editor.select_all_pollen": "Vybrat pyl",
  "editor.select_all_pollution": "Vybrat kvalitu ovzduší",
  "editor.show_empty_days": "Zobrazit prázdné dny",
  "editor.show_text_allergen": "Zobrazit text, alergen",
  "editor.show_value_numeric": "Zobrazit číselnou hodnotu",
  "editor.show_value_numeric_in_circle": "Zobrazit číslo v kruhu",
  "editor.show_value_text": "Zobrazit hodnotu jako text",
  "editor.show_version": "Zapisovat verzi do konzole",
  "editor.sort": "Řazení",
  "editor.sort_category_allergens_first": "Seřadit kategorie alergenů nahoře",
  "editor.sort_name_ascending": "název, vzestupně",
  "editor.sort_name_descending": "název, sestupně",
  "editor.sort_none": "žádné (pořadí konfigurace)",
  "editor.sort_pollution_block": "Seskupit znečištění odděleně",
  "editor.show_block_separator": "Zobrazit oddělovač mezi bloky",
  "editor.sort_value_ascending": "hodnota, vzestupně",
  "editor.sort_value_descending": "hodnota, sestupně",
  "editor.summary_advanced": "Pokročilé",
  "editor.summary_allergens": "Alergeny",
  "editor.summary_appearance_and_layout": "Vzhled a rozvržení",
  "editor.summary_card_interactivity": "Interaktivita karty",
  "editor.summary_card_layout_and_colors": "Rozvržení a barvy karty",
  "editor.summary_data_view_settings": "Nastavení zobrazení dat",
  "editor.summary_day_view_settings": "Nastavení zobrazení dnů",
  "editor.summary_entity_prefix_suffix": "Vlastní prefix a suffix",
  "editor.summary_functional_settings": "Funkční nastavení",
  "editor.summary_integration_and_place": "Integrace a místo",
  "editor.summary_minimal": "Minimální",
  "editor.summary_title_and_header": "Název a hlavička",
  "editor.summary_translation_and_strings": "Překlad a řetězce",
  "editor.tap_action": "Akce na klepnutí",
  "editor.tap_action_enable": "Povolit akci na klepnutí",
  "editor.text_size_ratio": "Poměr velikosti textu (%)",
  "editor.title": "Název karty",
  "editor.title_automatic": "Automatický název",
  "editor.title_hide": "Skrýt název",
  "editor.title_placeholder": "(automaticky)",
  "editor.to_show_columns": "Počet sloupců k zobrazení",
  "editor.to_show_days": "Počet dní k zobrazení",
  "editor.to_show_hours": "Počet hodin k zobrazení"
}, rc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tc
}, Symbol.toStringTag, { value: "Module" })), ic = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisiko",
  "card.allergen.ash": "Ask",
  "card.allergen.beech": "Bøg",
  "card.allergen.birch": "Birk",
  "card.allergen.chenopod": "Gåsefod",
  "card.allergen.cypress": "Cypres",
  "card.allergen.elm": "El",
  "card.allergen.goosefoot": "Mælde",
  "card.allergen.grass": "Græs",
  "card.allergen.grass_cat": "Græsser",
  "card.allergen.hazel": "Hassel",
  "card.allergen.index": "Indeks",
  "card.allergen.lime": "Lind",
  "card.allergen.maple": "Løn",
  "card.allergen.mold_spores": "Skimmelsvampe",
  "card.allergen.mugwort": "Malurt",
  "card.allergen.nettle": "Nælde",
  "card.allergen.nettle_and_pellitory": "Brændenælde og parietaria",
  "card.allergen.no2": "Kvælstofdioxid",
  "card.allergen.oak": "Eg",
  "card.allergen.olive": "Oliven",
  "card.allergen.ozone": "Ozon",
  "card.allergen.pine": "Fyr",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Vejbred",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Græsser",
  "card.allergen.poplar": "Poppel",
  "card.allergen.qualite_globale": "Luftkvalitet",
  "card.allergen.ragweed": "Ambrosie",
  "card.allergen.rye": "Rug",
  "card.allergen.so2": "Svovldioxid",
  "card.allergen.sorrel": "Syre",
  "card.allergen.trees": "Træer",
  "card.allergen.trees_cat": "Træer",
  "card.allergen.weeds": "Ukrudt",
  "card.allergen.weeds_cat": "Ukrudt",
  "card.allergen.willow": "Pil",
  "card.days.0": "I dag",
  "card.days.1": "I morgen",
  "card.days.2": "Overmorgen",
  "card.error": "Ingen pollensensor fundet. Har du installeret den korrekte integration og valgt region i kortets opsætning?",
  "card.error_filtered_sensors": "Ingen sensorer matcher dine filtre. Tjek udvalgte allergener og tærskel.",
  "card.error_location_not_found": "Placering ikke fundet. Kontroller placeringsnavnet i kortkonfigurationen.",
  "card.error_entity_unavailable": "Vejrentiteten er ikke tilgængelig. Integrationen er muligvis offline eller genstarter.",
  "card.error_no_sensors": "Ingen pollensensor fundet. Har du installeret den korrekte integration og valgt region i kortets opsætning?",
  "card.header_prefix": "Pollenprognose for",
  "card.header_no_location": "Pollenprognose",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Ingen pollen-integration fundet",
  "card.levels.0": "Ingen pollen",
  "card.levels.1": "Lave niveauer",
  "card.levels.2": "Lav–moderat niveau",
  "card.levels.3": "Moderat niveau",
  "card.levels.4": "Moderat–højt niveau",
  "card.levels.5": "Høje niveauer",
  "card.levels.6": "Meget høje niveauer",
  "card.index.very_low": "Meget lave niveauer",
  "card.loading_forecast": "Indlæser prognose...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Ingen allergener",
  "card.no_information": "(Ingen information)",
  "card.atmo.unavailable": "Ikke tilgængelig",
  "card.atmo.event": "Hændelse",
  "card.stale_allergen": "Ingen data",
  "card.stale_data": "Pollendata er midlertidigt utilgængelige",
  "card.stale_data_subtitle": "Udbyderen leverer i øjeblikket ingen data for denne region",
  "editor.allergen_color_custom": "Brugerdefinerede farver",
  "editor.allergen_color_default_colors": "Standardfarver",
  "editor.allergen_color_mode": "Allergen farvetilstand",
  "editor.allergen_colors": "Allergenfarver (efter niveau)",
  "editor.allergen_colors_header": "Allergen udseende",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Nulstil til standard",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synkroniser mellemrum med allergenets stregbredde",
  "editor.allergen_outline_color": "Konturfarve",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Nulstil kontur",
  "editor.allergen_stroke_color_synced": "Synkroniser stregfarve med niveau",
  "editor.allergen_stroke_width": "Stregbredde",
  "editor.allergen_stroke_width_reset": "Nulstil stregbredde",
  "editor.allergens": "Allergener",
  "editor.allergens_abbreviated": "Forkort allergener",
  "editor.allergens_header_category": "Kategori-allergener (generelt)",
  "editor.allergens_header_pollen": "Pollen",
  "editor.allergens_header_pollution": "Luftkvalitet",
  "editor.allergens_header_specific": "Individuelle allergener (specifikke)",
  "editor.allergens_header_summary": "Oversigt",
  "editor.allergy_risk_top": "Allergirisiko øverst på listen",
  "editor.background_color": "Baggrundsfarve",
  "editor.background_color_picker": "Vælg farve",
  "editor.background_color_placeholder": "f.eks. #ffeecc eller var(--my-color)",
  "editor.card_version": "Pollenprognosekortets version",
  "editor.city": "By",
  "editor.days_abbreviated": "Forkort ugedage",
  "editor.days_boldfaced": "Fremhæv ugedage",
  "editor.days_relative": "Relative dage (i dag/i morgen)",
  "editor.days_uppercase": "Store bogstaver på ugedage",
  "editor.debug": "Fejlfinding",
  "editor.entity_prefix": "Entity-præfiks",
  "editor.entity_prefix_placeholder": "fx. pollen_",
  "editor.entity_suffix": "Entity-suffiks",
  "editor.entity_suffix_placeholder": "fx. _home",
  "editor.icon_color_custom": "Brugerdefineret farve",
  "editor.icon_color_inherit": "Arv fra diagram",
  "editor.icon_color_mode": "Ikonfarvetilstand",
  "editor.icon_color_picker": "Vælg ikonfarve",
  "editor.icon_size": "Ikonstørrelse (px)",
  "editor.index_top": "Indeks øverst på listen",
  "editor.integration": "Integration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Segmentfarver",
  "editor.levels_colors_placeholder": "fx #ffeecc eller var(--my-color)",
  "editor.levels_custom": "Brug brugerdefinerede niveaufarver",
  "editor.levels_empty_color": "Farve for tomt segment",
  "editor.levels_gap": "Mellemrum (px)",
  "editor.levels_gap_color": "Mellemrumfarve",
  "editor.levels_gap_inherited": "Mellemrum (arvet fra allergen)",
  "editor.levels_header": "Niveaucirklers udseende",
  "editor.levels_icon_ratio": "Niveauikonforhold",
  "editor.levels_inherit_allergen": "Arv fra allergenfarver",
  "editor.levels_inherit_header": "Niveaucirkel-arv",
  "editor.levels_inherit_mode": "Niveaucirklers farvetilstand",
  "editor.levels_reset": "Nulstil til standard",
  "editor.levels_text_color": "Tekstfarve (indre cirkel)",
  "editor.levels_text_size": "Tekststørrelse (indre cirkel, % af normal)",
  "editor.levels_text_weight": "Teksttykkelse (indre cirkel)",
  "editor.levels_thickness": "Tykkelse (%)",
  "editor.link_to_sensors": "Knyt allergener til sensorer",
  "editor.locale": "Sprog",
  "editor.location": "Placering",
  "editor.location_autodetect": "Auto-detekter",
  "editor.location_manual": "Manuel",
  "editor.minimal": "Minimal tilstand",
  "editor.minimal_gap": "Afstand mellem allergener (px)",
  "editor.mode": "Tilstand",
  "editor.mode_daily": "Dagligt",
  "editor.mode_hourly": "Hver time",
  "editor.mode_hourly_eighth": "Timevis (hver 8. time)",
  "editor.mode_hourly_fourth": "Timevis (hver 4. time)",
  "editor.mode_hourly_second": "Timevis (hver 2. time)",
  "editor.mode_hourly_sixth": "Timevis (hver 6. time)",
  "editor.mode_hourly_third": "Timevis (hver 3. time)",
  "editor.mode_twice_daily": "To gange dagligt",
  "editor.no_allergens_color": "Ingen allergener",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Nulstil farve uden allergener",
  "editor.no_information": "Ingen information",
  "editor.numeric_state_raw_risk": "Vis rå værdi (allergirisiko)",
  "editor.peu_nondaily_expl": "Kun 'allergen_risk' er tilgængelig i ikke-daglige tilstande.",
  "editor.phrases": "Fraser",
  "editor.phrases_apply": "Anvend",
  "editor.phrases_days": "Relative dage",
  "editor.phrases_days.0": "I dag",
  "editor.phrases_days.1": "I morgen",
  "editor.phrases_days.2": "Overmorgen",
  "editor.phrases_full": "Allergener",
  "editor.phrases_full.alder": "Al",
  "editor.phrases_full.allergy_risk": "Allergirisiko",
  "editor.phrases_full.ash": "Ask",
  "editor.phrases_full.beech": "Bøg",
  "editor.phrases_full.birch": "Birk",
  "editor.phrases_full.chenopod": "Gåsefod",
  "editor.phrases_full.cypress": "Cypres",
  "editor.phrases_full.elm": "El",
  "editor.phrases_full.goosefoot": "Mælde",
  "editor.phrases_full.grass": "Græs",
  "editor.phrases_full.grass_cat": "Græsser",
  "editor.phrases_full.hazel": "Hassel",
  "editor.phrases_full.index": "Indeks",
  "editor.phrases_full.lime": "Lind",
  "editor.phrases_full.maple": "Løn",
  "editor.phrases_full.mold_spores": "Skimmelsvampe",
  "editor.phrases_full.mugwort": "Malurt",
  "editor.phrases_full.nettle": "Nælde",
  "editor.phrases_full.nettle_and_pellitory": "Brændenælde og parietaria",
  "editor.phrases_full.no2": "Kvælstofdioxid",
  "editor.phrases_full.oak": "Eg",
  "editor.phrases_full.olive": "Oliven",
  "editor.phrases_full.ozone": "Ozon",
  "editor.phrases_full.pine": "Fyr",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Vejbred",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Græsser",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.qualite_globale": "Luftkvalitet",
  "editor.phrases_full.ragweed": "Ambrosie",
  "editor.phrases_full.rye": "Rug",
  "editor.phrases_full.so2": "Svovldioxid",
  "editor.phrases_full.sorrel": "Syre",
  "editor.phrases_full.trees": "Træer",
  "editor.phrases_full.trees_cat": "Træer",
  "editor.phrases_full.weeds": "Ukrudt",
  "editor.phrases_full.weeds_cat": "Ukrudt",
  "editor.phrases_full.willow": "Pil",
  "editor.phrases_levels": "Allergenniveauer",
  "editor.phrases_levels.0": "Ingen pollen",
  "editor.phrases_levels.1": "Lave niveauer",
  "editor.phrases_levels.2": "Lav–moderat niveau",
  "editor.phrases_levels.3": "Moderat niveau",
  "editor.phrases_levels.4": "Moderat–højt niveau",
  "editor.phrases_levels.5": "Høje niveauer",
  "editor.phrases_levels.6": "Meget høje niveauer",
  "editor.phrases_short": "Allergener, kort",
  "editor.phrases_short.alder": "Al",
  "editor.phrases_short.allergy_risk": "Risiko",
  "editor.phrases_short.ash": "Ask",
  "editor.phrases_short.beech": "Bøg",
  "editor.phrases_short.birch": "Birk",
  "editor.phrases_short.chenopod": "Gåsefd",
  "editor.phrases_short.cypress": "Cypr.",
  "editor.phrases_short.elm": "El",
  "editor.phrases_short.goosefoot": "Mæld",
  "editor.phrases_short.grass": "Græs",
  "editor.phrases_short.grass_cat": "Græs",
  "editor.phrases_short.grasses": "Græs",
  "editor.phrases_short.hazel": "Hassel",
  "editor.phrases_short.index": "Indeks",
  "editor.phrases_short.lime": "Lind",
  "editor.phrases_short.maple": "Løn",
  "editor.phrases_short.mold_spores": "Skimmel",
  "editor.phrases_short.mugwort": "Malurt",
  "editor.phrases_short.nettle": "Nælde",
  "editor.phrases_short.nettle_and_pellitory": "Nælde",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Eg",
  "editor.phrases_short.olive": "Oliven",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Fyr",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Vejbr",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Græs",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.qualite_globale": "LKI",
  "editor.phrases_short.ragweed": "Ambrosie",
  "editor.phrases_short.rye": "Rug",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Syre",
  "editor.phrases_short.trees": "Træer",
  "editor.phrases_short.trees_cat": "Træer",
  "editor.phrases_short.weeds": "Ukrudt",
  "editor.phrases_short.weeds_cat": "Ukrudt",
  "editor.phrases_short.willow": "Pil",
  "editor.phrases_translate_all": "Oversæt alle",
  "editor.pollen_threshold": "Tærskel:",
  "editor.pollution_block_bottom": "Nederst (under pollen)",
  "editor.pollution_block_position": "Position for luftkvalitet",
  "editor.pollution_block_top": "Øverst (over pollen)",
  "editor.preset_reset_all": "Nulstil alle indstillinger",
  "editor.region_id": "Regions-ID",
  "editor.select_all_allergens": "Vælg alle allergener",
  "editor.select_all_pollen": "Vælg pollen",
  "editor.select_all_pollution": "Vælg luftkvalitet",
  "editor.show_empty_days": "Vis tomme dage",
  "editor.show_text_allergen": "Vis tekst, allergen",
  "editor.show_value_numeric": "Vis talværdi",
  "editor.show_value_numeric_in_circle": "Vis talværdi i cirkler",
  "editor.show_value_text": "Vis værdi som tekst",
  "editor.show_version": "Log version til konsollen",
  "editor.sort": "Sortering",
  "editor.sort_category_allergens_first": "Sorter kategori-allergener øverst",
  "editor.sort_name_ascending": "navn, stigende",
  "editor.sort_name_descending": "navn, faldende",
  "editor.sort_none": "ingen (konfigurationsrækkefølge)",
  "editor.sort_pollution_block": "Gruppér luftkvalitet separat",
  "editor.show_block_separator": "Vis separator mellem blokke",
  "editor.sort_value_ascending": "værdi, stigende",
  "editor.sort_value_descending": "værdi, faldende",
  "editor.summary_advanced": "Avanceret",
  "editor.summary_allergens": "Allergener",
  "editor.summary_appearance_and_layout": "Udseende og layout",
  "editor.summary_card_interactivity": "Kortinteraktivitet",
  "editor.summary_card_layout_and_colors": "Kortlayout og farver",
  "editor.summary_data_view_settings": "Datavisningsindstillinger",
  "editor.summary_day_view_settings": "Dagvisningsindstillinger",
  "editor.summary_entity_prefix_suffix": "Brugerdefineret præfiks og suffiks",
  "editor.summary_functional_settings": "Funktionelle indstillinger",
  "editor.summary_integration_and_place": "Integration og sted",
  "editor.summary_minimal": "Minimal",
  "editor.summary_title_and_header": "Titel og overskrift",
  "editor.summary_translation_and_strings": "Oversættelse og tekststrenge",
  "editor.tap_action": "Tryk-handling",
  "editor.tap_action_enable": "Aktivér tryk-handling",
  "editor.text_size_ratio": "Tekststørrelsesforhold (%)",
  "editor.title": "Korttitel",
  "editor.title_automatic": "Automatisk titel",
  "editor.title_hide": "Skjul titel",
  "editor.title_placeholder": "(automatisk)",
  "editor.to_show_columns": "Antal kolonner der vises",
  "editor.to_show_days": "Antal dage der vises",
  "editor.to_show_hours": "Antal timer der vises"
}, oc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ic
}, Symbol.toStringTag, { value: "Module" })), sc = {
  "card.allergen.alder": "Erle",
  "card.allergen.allergy_risk": "Allergierisiko",
  "card.allergen.ash": "Esche",
  "card.allergen.beech": "Buche",
  "card.allergen.birch": "Birke",
  "card.allergen.chenopod": "Gänsefuß",
  "card.allergen.cypress": "Zypresse",
  "card.allergen.elm": "Ulme",
  "card.allergen.goosefoot": "Gänsefuß",
  "card.allergen.grass": "Gräser",
  "card.allergen.grass_cat": "Gräser",
  "card.allergen.hazel": "Hasel",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Linde",
  "card.allergen.maple": "Ahorn",
  "card.allergen.mold_spores": "Schimmelsporen",
  "card.allergen.mugwort": "Beifuß",
  "card.allergen.nettle": "Brennnessel",
  "card.allergen.nettle_and_pellitory": "Nessel & Parietarie",
  "card.allergen.no2": "Stickstoffdioxid",
  "card.allergen.oak": "Eiche",
  "card.allergen.olive": "Olive",
  "card.allergen.ozone": "Ozon",
  "card.allergen.pine": "Kiefer",
  "card.allergen.plane": "Platane",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.plantain": "Wegerich",
  "card.allergen.poaceae": "Gräser",
  "card.allergen.poplar": "Pappel",
  "card.allergen.qualite_globale": "Luftqualität",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Roggen",
  "card.allergen.so2": "Schwefeldioxid",
  "card.allergen.sorrel": "Ampfer",
  "card.allergen.trees": "Bäume",
  "card.allergen.trees_cat": "Bäume",
  "card.allergen.weeds": "Unkräuter",
  "card.allergen.weeds_cat": "Unkräuter",
  "card.allergen.willow": "Weide",
  "card.days.0": "Heute",
  "card.days.1": "Morgen",
  "card.days.2": "Übermorgen",
  "card.error": "Keine Pollensensoren gefunden. Haben Sie die richtige Integration installiert und eine Region in der Kartenkonfiguration ausgewählt?",
  "card.error_filtered_sensors": "Keine Sensoren entsprechen Ihren Filtern. Überprüfen Sie die ausgewählten Allergene und den Schwellenwert.",
  "card.error_location_not_found": "Standort nicht gefunden. Überprüfen Sie den Standortnamen in der Kartenkonfiguration.",
  "card.error_entity_unavailable": "Wetterentität ist nicht verfügbar. Die Integration ist möglicherweise offline oder wird neu gestartet.",
  "card.error_no_sensors": "Keine Pollen-Sensoren gefunden. Haben Sie die richtige Integration installiert und eine Region in der Kartenkonfiguration ausgewählt?",
  "card.header_prefix": "Pollenprognose für",
  "card.header_no_location": "Pollenprognose",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Keine Pollen-Sensor-Integration gefunden",
  "card.levels.0": "keine Belastung",
  "card.levels.1": "keine bis geringe Belastung",
  "card.levels.2": "geringe Belastung",
  "card.levels.3": "geringe bis mittlere Belastung",
  "card.levels.4": "mittlere Belastung",
  "card.levels.5": "mittlere bis hohe Belastung",
  "card.levels.6": "hohe Belastung",
  "card.index.very_low": "sehr geringe Belastung",
  "card.loading_forecast": "Vorhersage wird geladen...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Keine Allergene",
  "card.no_information": "(Keine Information)",
  "card.atmo.unavailable": "Nicht verfügbar",
  "card.atmo.event": "Ereignis",
  "card.stale_allergen": "Keine Daten",
  "card.stale_data": "Pollendaten vorübergehend nicht verfügbar",
  "card.stale_data_subtitle": "Der Anbieter liefert derzeit keine Daten für diese Region",
  "editor.allergen_color_custom": "Benutzerdefinierte Farben",
  "editor.allergen_color_default_colors": "Standardfarben",
  "editor.allergen_color_mode": "Allergen-Farbmodus",
  "editor.allergen_colors": "Allergenfarben (nach Stufe)",
  "editor.allergen_colors_header": "Aussehen der Allergene",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Auf Standard zurücksetzen",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Abstand mit Strichstärke des Allergens synchronisieren",
  "editor.allergen_outline_color": "Konturfarbe",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Kontur zurücksetzen",
  "editor.allergen_stroke_color_synced": "Strichfarbe mit Stufe synchronisieren",
  "editor.allergen_stroke_width": "Linienstärke",
  "editor.allergen_stroke_width_reset": "Linienstärke zurücksetzen",
  "editor.allergens": "Allergene",
  "editor.allergens_abbreviated": "Allergene abkürzen",
  "editor.allergens_header_category": "Kategorieallergene (allgemein)",
  "editor.allergens_header_pollen": "Pollen",
  "editor.allergens_header_pollution": "Luftqualität",
  "editor.allergens_header_specific": "Einzelne Allergene (spezifisch)",
  "editor.allergens_header_summary": "Zusammenfassung",
  "editor.allergy_risk_top": "Allergierisiko oben in der Liste",
  "editor.background_color": "Hintergrundfarbe",
  "editor.background_color_picker": "Farbe auswählen",
  "editor.background_color_placeholder": "z.B. #ffeecc oder var(--my-color)",
  "editor.card_version": "Version der Pollenprognose-Karte",
  "editor.city": "Stadt",
  "editor.days_abbreviated": "Wochentage abkürzen",
  "editor.days_boldfaced": "Wochentage fett",
  "editor.days_relative": "Relative Tage (heute/morgen)",
  "editor.days_uppercase": "Wochentage groß",
  "editor.debug": "Debug",
  "editor.entity_prefix": "Entity-Präfix",
  "editor.entity_prefix_placeholder": "z.B. pollen_",
  "editor.entity_suffix": "Entity-Suffix",
  "editor.entity_suffix_placeholder": "z.B. _home",
  "editor.icon_color_custom": "Benutzerdefinierte Farbe",
  "editor.icon_color_inherit": "Vom Diagramm erben",
  "editor.icon_color_mode": "Symbolfarbmodus",
  "editor.icon_color_picker": "Symbolfarbe auswählen",
  "editor.icon_size": "Symbolgröße (px)",
  "editor.index_top": "Index oben in der Liste",
  "editor.integration": "Integration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Segmentfarben",
  "editor.levels_colors_placeholder": "z. B. #ffeecc oder var(--my-color)",
  "editor.levels_custom": "Eigene Stufenfarben verwenden",
  "editor.levels_empty_color": "Farbe für leeres Segment",
  "editor.levels_gap": "Lücke (px)",
  "editor.levels_gap_color": "Lückenfarbe",
  "editor.levels_gap_inherited": "Abstand (geerbt vom Allergen)",
  "editor.levels_header": "Aussehen der Stufenringe",
  "editor.levels_icon_ratio": "Symbolverhältnis der Stufen",
  "editor.levels_inherit_allergen": "Von Allergenfarben erben",
  "editor.levels_inherit_header": "Vererbung der Stufenringe",
  "editor.levels_inherit_mode": "Farbmodus für Stufenringe",
  "editor.levels_reset": "Auf Standard zurücksetzen",
  "editor.levels_text_color": "Textfarbe (innerer Kreis)",
  "editor.levels_text_size": "Textgröße (innerer Kreis, % von normal)",
  "editor.levels_text_weight": "Textgewicht (innerer Kreis)",
  "editor.levels_thickness": "Dicke (%)",
  "editor.link_to_sensors": "Allergene mit Sensoren verknüpfen",
  "editor.locale": "Locale",
  "editor.location": "Ort",
  "editor.location_autodetect": "Automatisch erkennen",
  "editor.location_manual": "Manuell",
  "editor.minimal": "Minimalmodus",
  "editor.minimal_gap": "Abstand zwischen Allergenen (px)",
  "editor.mode": "Modus",
  "editor.mode_daily": "Täglich",
  "editor.mode_hourly": "Stündlich",
  "editor.mode_hourly_eighth": "Stündlich (alle 8 Std.)",
  "editor.mode_hourly_fourth": "Stündlich (alle 4 Std.)",
  "editor.mode_hourly_second": "Stündlich (alle 2 Std.)",
  "editor.mode_hourly_sixth": "Stündlich (alle 6 Std.)",
  "editor.mode_hourly_third": "Stündlich (alle 3 Std.)",
  "editor.mode_twice_daily": "Zweimal täglich",
  "editor.no_allergens_color": "Keine Allergene",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Farbe ohne Allergene zurücksetzen",
  "editor.no_information": "Keine Information",
  "editor.numeric_state_raw_risk": "Rohwert anzeigen (Allergierisiko)",
  "editor.peu_nondaily_expl": "Nur 'allergen_risk' ist in nicht-täglichen Modi verfügbar.",
  "editor.phrases": "Phrasen",
  "editor.phrases_apply": "Übernehmen",
  "editor.phrases_days": "Relative Tage",
  "editor.phrases_days.0": "Heute",
  "editor.phrases_days.1": "Morgen",
  "editor.phrases_days.2": "Übermorgen",
  "editor.phrases_full": "Allergene",
  "editor.phrases_full.alder": "Erle",
  "editor.phrases_full.allergy_risk": "Allergierisiko",
  "editor.phrases_full.ash": "Esche",
  "editor.phrases_full.beech": "Buche",
  "editor.phrases_full.birch": "Birke",
  "editor.phrases_full.chenopod": "Gänsefuß",
  "editor.phrases_full.cypress": "Zypresse",
  "editor.phrases_full.elm": "Ulme",
  "editor.phrases_full.goosefoot": "Gänsefuß",
  "editor.phrases_full.grass": "Gräser",
  "editor.phrases_full.grass_cat": "Gräser",
  "editor.phrases_full.hazel": "Hasel",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Linde",
  "editor.phrases_full.maple": "Ahorn",
  "editor.phrases_full.mold_spores": "Schimmelsporen",
  "editor.phrases_full.mugwort": "Beifuß",
  "editor.phrases_full.nettle": "Brennnessel",
  "editor.phrases_full.nettle_and_pellitory": "Nessel & Parietarie",
  "editor.phrases_full.no2": "Stickstoffdioxid",
  "editor.phrases_full.oak": "Eiche",
  "editor.phrases_full.olive": "Olive",
  "editor.phrases_full.ozone": "Ozon",
  "editor.phrases_full.pine": "Kiefer",
  "editor.phrases_full.plane": "Platane",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.plantain": "Wegerich",
  "editor.phrases_full.poaceae": "Gräser",
  "editor.phrases_full.poplar": "Pappel",
  "editor.phrases_full.qualite_globale": "Luftqualität",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Roggen",
  "editor.phrases_full.so2": "Schwefeldioxid",
  "editor.phrases_full.sorrel": "Ampfer",
  "editor.phrases_full.trees": "Bäume",
  "editor.phrases_full.trees_cat": "Bäume",
  "editor.phrases_full.weeds": "Unkräuter",
  "editor.phrases_full.weeds_cat": "Unkräuter",
  "editor.phrases_full.willow": "Weide",
  "editor.phrases_levels": "Allergenstufen",
  "editor.phrases_levels.0": "keine Belastung",
  "editor.phrases_levels.1": "keine bis geringe Belastung",
  "editor.phrases_levels.2": "geringe Belastung",
  "editor.phrases_levels.3": "geringe bis mittlere Belastung",
  "editor.phrases_levels.4": "mittlere Belastung",
  "editor.phrases_levels.5": "mittlere bis hohe Belastung",
  "editor.phrases_levels.6": "hohe Belastung",
  "editor.phrases_short": "Allergene, kurz",
  "editor.phrases_short.alder": "Erle",
  "editor.phrases_short.allergy_risk": "Risiko",
  "editor.phrases_short.ash": "Esche",
  "editor.phrases_short.beech": "Buche",
  "editor.phrases_short.birch": "Birke",
  "editor.phrases_short.chenopod": "Gänsef",
  "editor.phrases_short.cypress": "Zyp.",
  "editor.phrases_short.elm": "Ulme",
  "editor.phrases_short.goosefoot": "Gfuß",
  "editor.phrases_short.grass": "Gräs",
  "editor.phrases_short.grass_cat": "Gräs",
  "editor.phrases_short.grasses": "Gräser",
  "editor.phrases_short.hazel": "Hasel",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Linde",
  "editor.phrases_short.maple": "Ahorn",
  "editor.phrases_short.mold_spores": "Schimmel",
  "editor.phrases_short.mugwort": "Beifu",
  "editor.phrases_short.nettle": "Brenns",
  "editor.phrases_short.nettle_and_pellitory": "Nessel",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Eiche",
  "editor.phrases_short.olive": "Olive",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Kiefer",
  "editor.phrases_short.plane": "Plat.",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.plantain": "Weg",
  "editor.phrases_short.poaceae": "Gräser",
  "editor.phrases_short.poplar": "Pappel",
  "editor.phrases_short.qualite_globale": "LQI",
  "editor.phrases_short.ragweed": "Ambro",
  "editor.phrases_short.rye": "Roggn",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Ampf",
  "editor.phrases_short.trees": "Bäume",
  "editor.phrases_short.trees_cat": "Bäume",
  "editor.phrases_short.weeds": "Unkräuter",
  "editor.phrases_short.weeds_cat": "Unkräuter",
  "editor.phrases_short.willow": "Weide",
  "editor.phrases_translate_all": "Alle übersetzen",
  "editor.pollen_threshold": "Schwelle:",
  "editor.pollution_block_bottom": "Unten (unter Pollen)",
  "editor.pollution_block_position": "Position der Luftqualität",
  "editor.pollution_block_top": "Oben (über Pollen)",
  "editor.preset_reset_all": "Alles zurücksetzen",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Alle Allergene auswählen",
  "editor.select_all_pollen": "Pollen auswählen",
  "editor.select_all_pollution": "Luftqualität auswählen",
  "editor.show_empty_days": "Leere Tage anzeigen",
  "editor.show_text_allergen": "Allergentext anzeigen",
  "editor.show_value_numeric": "Wert als Zahl anzeigen",
  "editor.show_value_numeric_in_circle": "Numerischen Wert im Kreis anzeigen",
  "editor.show_value_text": "Wert als Text anzeigen",
  "editor.show_version": "Version in der Konsole protokollieren",
  "editor.sort": "Sortierung",
  "editor.sort_category_allergens_first": "Kategorienallergene oben sortieren",
  "editor.sort_name_ascending": "Name, aufsteigend",
  "editor.sort_name_descending": "Name, absteigend",
  "editor.sort_none": "keine (Konfigurationsreihenfolge)",
  "editor.sort_pollution_block": "Luftqualität separat gruppieren",
  "editor.show_block_separator": "Trennlinie zwischen Blöcken anzeigen",
  "editor.sort_value_ascending": "Wert, aufsteigend",
  "editor.sort_value_descending": "Wert, absteigend",
  "editor.summary_advanced": "Erweitert",
  "editor.summary_allergens": "Allergene",
  "editor.summary_appearance_and_layout": "Aussehen und Layout",
  "editor.summary_card_interactivity": "Karteninteraktivität",
  "editor.summary_card_layout_and_colors": "Kartenlayout und Farben",
  "editor.summary_data_view_settings": "Datenanzeige-Einstellungen",
  "editor.summary_day_view_settings": "Tagesansicht-Einstellungen",
  "editor.summary_entity_prefix_suffix": "Benutzerdefiniertes Präfix und Suffix",
  "editor.summary_functional_settings": "Funktionseinstellungen",
  "editor.summary_integration_and_place": "Integration und Ort",
  "editor.summary_minimal": "Minimal",
  "editor.summary_title_and_header": "Titel und Kopfzeile",
  "editor.summary_translation_and_strings": "Übersetzung und Zeichenketten",
  "editor.tap_action": "Tippen-Aktion",
  "editor.tap_action_enable": "Tippen-Aktion aktivieren",
  "editor.text_size_ratio": "Textgrößenverhältnis (%)",
  "editor.title": "Kartentitel",
  "editor.title_automatic": "Automatischer Titel",
  "editor.title_hide": "Titel ausblenden",
  "editor.title_placeholder": "(automatisch)",
  "editor.to_show_columns": "Anzuzeigende Spalten",
  "editor.to_show_days": "Anzuzeigende Tage",
  "editor.to_show_hours": "Anzuzeigende Stunden"
}, nc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sc
}, Symbol.toStringTag, { value: "Module" })), ac = {
  "card.allergen.alder": "Σκλήθρα",
  "card.allergen.allergy_risk": "Κίνδυνος αλλεργίας",
  "card.allergen.ash": "Μελία",
  "card.allergen.beech": "Οξιά",
  "card.allergen.birch": "Σημύδα",
  "card.allergen.chenopod": "Χηνοπόδιο",
  "card.allergen.goosefoot": "Χηνόποδα",
  "card.allergen.cypress": "Κυπαρίσσι",
  "card.allergen.elm": "Φτελιά",
  "card.allergen.grass": "Γρασίδι",
  "card.allergen.grass_cat": "Αγρωστώδη",
  "card.allergen.plantain": "Πεντάνευρο",
  "card.allergen.hazel": "Φουντουκιά",
  "card.allergen.index": "Δείκτης",
  "card.allergen.lime": "Φλαμουριά",
  "card.allergen.maple": "Σφενδάμι",
  "card.allergen.mold_spores": "Σπόρια μούχλας",
  "card.allergen.mugwort": "Αρτεμισία",
  "card.allergen.nettle": "Τσουκνίδα",
  "card.allergen.nettle_and_pellitory": "Τσουκνίδα και παριετάρια",
  "card.allergen.no2": "Διοξείδιο του αζώτου",
  "card.allergen.oak": "Βελανιδιά",
  "card.allergen.olive": "Ελιά",
  "card.allergen.ozone": "Όζον",
  "card.allergen.pine": "Πεύκο",
  "card.allergen.plane": "Πλάτανος",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2.5",
  "card.allergen.poaceae": "Πόα",
  "card.allergen.poplar": "Λεύκα",
  "card.allergen.qualite_globale": "Ποιότητα αέρα",
  "card.allergen.ragweed": "Αμβροσία",
  "card.allergen.sorrel": "Λάπαθο",
  "card.allergen.rye": "Σίκαλη",
  "card.allergen.so2": "Διοξείδιο του θείου",
  "card.allergen.trees": "Δέντρα",
  "card.allergen.trees_cat": "Δέντρα",
  "card.allergen.weeds": "Ζιζάνια",
  "card.allergen.weeds_cat": "Ζιζάνια",
  "card.allergen.willow": "Ιτιά",
  "card.days.0": "Σήμερα",
  "card.days.1": "Αύριο",
  "card.days.2": "Μεθαύριο",
  "card.error": "Δεν βρέθηκαν αισθητήρες γύρης. Έχετε εγκαταστήσει τη σωστή ενσωμάτωση και έχετε επιλέξει περιοχή στη διαμόρφωση της κάρτας;",
  "card.error_filtered_sensors": "Κανένας αισθητήρας δεν ταιριάζει με τα φίλτρα σας. Ελέγξτε τα επιλεγμένα αλλεργιογόνα και το όριο.",
  "card.error_location_not_found": "Η τοποθεσία δεν βρέθηκε. Ελέγξτε το όνομα τοποθεσίας στη διαμόρφωση της κάρτας.",
  "card.error_entity_unavailable": "Η οντότητα καιρού δεν είναι διαθέσιμη. Η ενσωμάτωση μπορεί να είναι εκτός σύνδεσης ή να επανεκκινεί.",
  "card.error_no_sensors": "Δεν βρέθηκαν αισθητήρες γύρης. Έχετε εγκαταστήσει τη σωστή ενσωμάτωση και έχετε επιλέξει περιοχή στη διαμόρφωση της κάρτας;",
  "card.stale_data": "Τα δεδομένα γύρης δεν είναι διαθέσιμα προσωρινά",
  "card.stale_data_subtitle": "Ο πάροχος δεν επιστρέφει αυτή τη στιγμή δεδομένα για αυτή την περιοχή",
  "card.stale_allergen": "Χωρίς δεδομένα",
  "card.header_prefix": "Πρόγνωση γύρης για",
  "card.header_no_location": "Πρόγνωση γύρης",
  "card.location.plu": "Λουξεμβούργο",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.plu": "Pollen.lu",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Δεν βρέθηκε ενσωμάτωση αισθητήρων γύρης",
  "card.levels.0": "Χωρίς γύρη",
  "card.levels.1": "Χαμηλά επίπεδα",
  "card.levels.2": "Χαμηλά έως μέτρια επίπεδα",
  "card.levels.3": "Μέτρια επίπεδα",
  "card.levels.4": "Μέτρια έως υψηλά επίπεδα",
  "card.levels.5": "Υψηλά επίπεδα",
  "card.levels.6": "Πολύ υψηλά επίπεδα",
  "card.index.very_low": "Πολύ χαμηλά επίπεδα",
  "card.loading_forecast": "Φόρτωση πρόγνωσης...",
  "card.no_allergens": "Χωρίς αλλεργιογόνα",
  "card.no_information": "(Χωρίς πληροφορίες)",
  "card.atmo.unavailable": "Μη διαθέσιμο",
  "card.atmo.event": "Συμβάν",
  "editor.allergen_color_custom": "Προσαρμοσμένα χρώματα",
  "editor.allergen_color_default_colors": "Προεπιλεγμένα χρώματα",
  "editor.allergen_color_mode": "Λειτουργία χρωμάτων αλλεργιογόνων",
  "editor.allergen_colors": "Χρώματα αλλεργιογόνων (ανά επίπεδο)",
  "editor.allergen_colors_header": "Εμφάνιση αλλεργιογόνων",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Επαναφορά στα προεπιλεγμένα",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_outline_color": "Χρώμα περιγράμματος",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Επαναφορά περιγράμματος",
  "editor.allergen_stroke_width": "Πλάτος γραμμής",
  "editor.allergen_stroke_width_reset": "Επαναφορά πλάτους γραμμής",
  "editor.allergen_stroke_color_synced": "Συγχρονισμός χρώματος γραμμής με το επίπεδο",
  "editor.allergen_levels_gap_synced": "Συγχρονισμός κενού με το πλάτος γραμμής αλλεργιογόνου",
  "editor.allergens": "Αλλεργιογόνα",
  "editor.allergens_abbreviated": "Συντόμευση αλλεργιογόνων",
  "editor.allergens_header_category": "Κατηγορίες αλλεργιογόνων (γενικά)",
  "editor.allergens_header_pollen": "Γύρη",
  "editor.allergens_header_pollution": "Ποιότητα αέρα",
  "editor.allergens_header_specific": "Μεμονωμένα αλλεργιογόνα (συγκεκριμένα)",
  "editor.allergens_header_summary": "Σύνοψη",
  "editor.allergy_risk_top": "Ο κίνδυνος αλλεργίας στην κορυφή της λίστας",
  "editor.background_color": "Χρώμα φόντου",
  "editor.background_color_picker": "Επιλέξτε χρώμα",
  "editor.background_color_placeholder": "π.χ. #ffeecc ή var(--my-color)",
  "editor.card_version": "Έκδοση κάρτας Pollenprognos",
  "editor.city": "Πόλη",
  "editor.days_abbreviated": "Συντόμευση ημερών εβδομάδας",
  "editor.days_boldfaced": "Έντονη γραφή στις ημέρες εβδομάδας",
  "editor.days_relative": "Σχετικές ημέρες (σήμερα/αύριο)",
  "editor.days_uppercase": "Κεφαλαία στις ημέρες εβδομάδας",
  "editor.debug": "Debug",
  "editor.entity_prefix": "Πρόθεμα οντότητας",
  "editor.entity_prefix_placeholder": "π.χ. pollen_",
  "editor.entity_suffix": "Κατάληξη οντότητας",
  "editor.entity_suffix_placeholder": "π.χ. _home",
  "editor.icon_color_custom": "Προσαρμοσμένο χρώμα",
  "editor.icon_color_inherit": "Κληρονόμηση από το γράφημα",
  "editor.icon_color_mode": "Λειτουργία χρώματος εικονιδίου",
  "editor.icon_color_picker": "Επιλέξτε χρώμα εικονιδίου",
  "editor.icon_size": "Μέγεθος εικονιδίου (px)",
  "editor.index_top": "Ο δείκτης στην κορυφή της λίστας",
  "editor.integration": "Ενσωμάτωση",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Χρώματα τμημάτων",
  "editor.levels_colors_placeholder": "π.χ. #ffeecc ή var(--my-color)",
  "editor.levels_custom": "Χρήση προσαρμοσμένων χρωμάτων επιπέδων",
  "editor.levels_empty_color": "Χρώμα κενού τμήματος",
  "editor.levels_gap": "Κενό (px)",
  "editor.levels_gap_color": "Χρώμα κενού",
  "editor.levels_gap_inherited": "Κενό (κληρονομείται από το αλλεργιογόνο)",
  "editor.levels_header": "Εμφάνιση κύκλου επιπέδου",
  "editor.levels_icon_ratio": "Αναλογία εικονιδίου επιπέδων",
  "editor.levels_inherit_allergen": "Κληρονόμηση από τα χρώματα αλλεργιογόνων",
  "editor.levels_inherit_header": "Κληρονόμηση κύκλου επιπέδου",
  "editor.levels_inherit_mode": "Λειτουργία χρώματος κύκλου επιπέδου",
  "editor.levels_reset": "Επαναφορά στα προεπιλεγμένα",
  "editor.levels_text_color": "Χρώμα κειμένου (εσωτερικός κύκλος)",
  "editor.levels_text_size": "Μέγεθος κειμένου (εσωτερικός κύκλος, % του κανονικού)",
  "editor.levels_text_weight": "Πάχος γραμματοσειράς (εσωτερικός κύκλος)",
  "editor.levels_thickness": "Πάχος (%)",
  "editor.link_to_sensors": "Σύνδεση αλλεργιογόνων με αισθητήρες",
  "editor.locale": "Τοπική ρύθμιση",
  "editor.location": "Τοποθεσία",
  "editor.location_autodetect": "Αυτόματη ανίχνευση",
  "editor.location_manual": "Χειροκίνητα",
  "editor.minimal": "Ελάχιστη λειτουργία",
  "editor.minimal_gap": "Κενό μεταξύ αλλεργιογόνων (px)",
  "editor.mode": "Λειτουργία",
  "editor.mode_daily": "Ημερήσια",
  "editor.mode_hourly": "Ωριαία",
  "editor.mode_hourly_eighth": "Ωριαία (κάθε 8 ώρες)",
  "editor.mode_hourly_fourth": "Ωριαία (κάθε 4 ώρες)",
  "editor.mode_hourly_second": "Ωριαία (κάθε 2 ώρες)",
  "editor.mode_hourly_sixth": "Ωριαία (κάθε 6 ώρες)",
  "editor.mode_hourly_third": "Ωριαία (κάθε 3 ώρες)",
  "editor.mode_twice_daily": "Δύο φορές την ημέρα",
  "editor.no_allergens_color": "Χωρίς αλλεργιογόνα",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Επαναφορά χρώματος για «χωρίς αλλεργιογόνα»",
  "editor.no_information": "Χωρίς πληροφορίες",
  "editor.numeric_state_raw_risk": "Εμφάνιση ακατέργαστης τιμής (κίνδυνος αλλεργίας)",
  "editor.peu_nondaily_expl": "Μόνο το 'allergen_risk' είναι διαθέσιμο σε μη ημερήσιες λειτουργίες.",
  "editor.phrases": "Φράσεις",
  "editor.phrases_apply": "Εφαρμογή",
  "editor.phrases_days": "Σχετικές ημέρες",
  "editor.phrases_days.0": "Σήμερα",
  "editor.phrases_days.1": "Αύριο",
  "editor.phrases_days.2": "Μεθαύριο",
  "editor.phrases_full": "Αλλεργιογόνα",
  "editor.phrases_full.alder": "Σκλήθρα",
  "editor.phrases_full.allergy_risk": "Κίνδυνος αλλεργίας",
  "editor.phrases_full.ash": "Μελία",
  "editor.phrases_full.beech": "Οξιά",
  "editor.phrases_full.birch": "Σημύδα",
  "editor.phrases_full.chenopod": "Χηνοπόδιο",
  "editor.phrases_full.cypress": "Κυπαρίσσι",
  "editor.phrases_full.elm": "Φτελιά",
  "editor.phrases_full.grass": "Γρασίδι",
  "editor.phrases_full.grass_cat": "Αγρωστώδη",
  "editor.phrases_full.goosefoot": "Χηνόποδα",
  "editor.phrases_full.hazel": "Φουντουκιά",
  "editor.phrases_full.index": "Δείκτης",
  "editor.phrases_full.lime": "Φλαμουριά",
  "editor.phrases_full.maple": "Σφενδάμι",
  "editor.phrases_full.mold_spores": "Σπόρια μούχλας",
  "editor.phrases_full.mugwort": "Αρτεμισία",
  "editor.phrases_full.nettle": "Τσουκνίδα",
  "editor.phrases_full.nettle_and_pellitory": "Τσουκνίδα και παριετάρια",
  "editor.phrases_full.no2": "Διοξείδιο του αζώτου",
  "editor.phrases_full.oak": "Βελανιδιά",
  "editor.phrases_full.olive": "Ελιά",
  "editor.phrases_full.ozone": "Όζον",
  "editor.phrases_full.pine": "Πεύκο",
  "editor.phrases_full.plane": "Πλάτανος",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2.5",
  "editor.phrases_full.poaceae": "Πόα",
  "editor.phrases_full.poplar": "Λεύκα",
  "editor.phrases_full.qualite_globale": "Ποιότητα αέρα",
  "editor.phrases_full.ragweed": "Αμβροσία",
  "editor.phrases_full.plantain": "Πεντάνευρο",
  "editor.phrases_full.sorrel": "Λάπαθο",
  "editor.phrases_full.rye": "Σίκαλη",
  "editor.phrases_full.so2": "Διοξείδιο του θείου",
  "editor.phrases_full.trees": "Δέντρα",
  "editor.phrases_full.trees_cat": "Δέντρα",
  "editor.phrases_full.weeds": "Ζιζάνια",
  "editor.phrases_full.weeds_cat": "Ζιζάνια",
  "editor.phrases_full.willow": "Ιτιά",
  "editor.phrases_levels": "Επίπεδα αλλεργιογόνων",
  "editor.phrases_levels.0": "Χωρίς γύρη",
  "editor.phrases_levels.1": "Χαμηλά επίπεδα",
  "editor.phrases_levels.2": "Χαμηλά έως μέτρια επίπεδα",
  "editor.phrases_levels.3": "Μέτρια επίπεδα",
  "editor.phrases_levels.4": "Μέτρια έως υψηλά επίπεδα",
  "editor.phrases_levels.5": "Υψηλά επίπεδα",
  "editor.phrases_levels.6": "Πολύ υψηλά επίπεδα",
  "editor.phrases_short": "Αλλεργιογόνα, σύντομα",
  "editor.phrases_short.alder": "Σκλήθρα",
  "editor.phrases_short.allergy_risk": "Κίνδυνος",
  "editor.phrases_short.ash": "Μελία",
  "editor.phrases_short.beech": "Οξιά",
  "editor.phrases_short.birch": "Σημύδα",
  "editor.phrases_short.chenopod": "Χηνοπ.",
  "editor.phrases_short.cypress": "Κυπαρ.",
  "editor.phrases_short.elm": "Φτελιά",
  "editor.phrases_short.grass": "Γρασ.",
  "editor.phrases_short.grass_cat": "Αγρωστ.",
  "editor.phrases_short.grasses": "Γρασ.",
  "editor.phrases_short.goosefoot": "Χηνόπ.",
  "editor.phrases_short.hazel": "Φουντ.",
  "editor.phrases_short.index": "Δείκτης",
  "editor.phrases_short.lime": "Φλαμ.",
  "editor.phrases_short.maple": "Σφενδ.",
  "editor.phrases_short.mold_spores": "Μούχλα",
  "editor.phrases_short.mugwort": "Αρτεμ.",
  "editor.phrases_short.nettle": "Τσουκν.",
  "editor.phrases_short.nettle_and_pellitory": "Τσουκν.",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Βελαν.",
  "editor.phrases_short.olive": "Ελιά",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Πεύκο",
  "editor.phrases_short.plane": "Πλάταν.",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2.5",
  "editor.phrases_short.poaceae": "Πόα",
  "editor.phrases_short.plantain": "Πεντάν.",
  "editor.phrases_short.poplar": "Λεύκα",
  "editor.phrases_short.qualite_globale": "AQI",
  "editor.phrases_short.ragweed": "Αμβρ.",
  "editor.phrases_short.sorrel": "Λάπαθο",
  "editor.phrases_short.rye": "Σίκαλη",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.trees": "Δέντρα",
  "editor.phrases_short.trees_cat": "Δέντρα",
  "editor.phrases_short.weeds": "Ζιζάνια",
  "editor.phrases_short.weeds_cat": "Ζιζάνια",
  "editor.phrases_short.willow": "Ιτιά",
  "editor.phrases_translate_all": "Μετάφραση όλων",
  "editor.pollen_threshold": "Όριο:",
  "editor.pollution_block_bottom": "Κάτω (κάτω από τη γύρη)",
  "editor.pollution_block_position": "Θέση ρύπανσης",
  "editor.pollution_block_top": "Πάνω (πάνω από τη γύρη)",
  "editor.preset_reset_all": "Επαναφορά όλων των ρυθμίσεων",
  "editor.region_id": "ID περιοχής",
  "editor.select_all_allergens": "Επιλογή όλων των αλλεργιογόνων",
  "editor.select_all_pollen": "Επιλογή γύρης",
  "editor.select_all_pollution": "Επιλογή ποιότητας αέρα",
  "editor.show_empty_days": "Εμφάνιση κενών ημερών",
  "editor.show_text_allergen": "Εμφάνιση κειμένου, αλλεργιογόνο",
  "editor.show_value_numeric": "Εμφάνιση τιμής, αριθμητικά",
  "editor.show_value_numeric_in_circle": "Εμφάνιση αριθμητικής τιμής στους κύκλους",
  "editor.show_value_text": "Εμφάνιση τιμής, κείμενο",
  "editor.show_version": "Καταγραφή έκδοσης στην κονσόλα",
  "editor.sort": "Σειρά ταξινόμησης",
  "editor.sort_category_allergens_first": "Κατηγορίες αλλεργιογόνων στην κορυφή",
  "editor.sort_name_ascending": "όνομα, αύξουσα",
  "editor.sort_name_descending": "όνομα, φθίνουσα",
  "editor.sort_none": "καμία (σειρά ρυθμίσεων)",
  "editor.sort_pollution_block": "Ομαδοποίηση ρύπανσης ξεχωριστά",
  "editor.show_block_separator": "Εμφάνιση διαχωριστικού μεταξύ μπλοκ",
  "editor.sort_value_ascending": "τιμή, αύξουσα",
  "editor.sort_value_descending": "τιμή, φθίνουσα",
  "editor.summary_advanced": "Προχωρημένα",
  "editor.summary_allergens": "Αλλεργιογόνα",
  "editor.summary_appearance_and_layout": "Εμφάνιση και διάταξη",
  "editor.summary_card_interactivity": "Αλληλεπίδραση κάρτας",
  "editor.summary_card_layout_and_colors": "Διάταξη και χρώματα κάρτας",
  "editor.summary_data_view_settings": "Ρυθμίσεις προβολής δεδομένων",
  "editor.summary_day_view_settings": "Ρυθμίσεις προβολής ημερών",
  "editor.summary_entity_prefix_suffix": "Προσαρμοσμένο πρόθεμα και κατάληξη",
  "editor.summary_functional_settings": "Λειτουργικές ρυθμίσεις",
  "editor.summary_integration_and_place": "Ενσωμάτωση και τοποθεσία",
  "editor.summary_minimal": "Ελάχιστο",
  "editor.summary_title_and_header": "Τίτλος και κεφαλίδα",
  "editor.summary_translation_and_strings": "Μετάφραση και κείμενα",
  "editor.tap_action": "Ενέργεια πατήματος",
  "editor.tap_action_enable": "Ενεργοποίηση ενέργειας πατήματος",
  "editor.text_size_ratio": "Αναλογία μεγέθους κειμένου (%)",
  "editor.title": "Τίτλος κάρτας",
  "editor.title_automatic": "Αυτόματος τίτλος",
  "editor.title_hide": "Απόκρυψη τίτλου",
  "editor.title_placeholder": "(αυτόματο)",
  "editor.to_show_columns": "Στήλες προς εμφάνιση",
  "editor.to_show_days": "Ημέρες προς εμφάνιση",
  "editor.to_show_hours": "Ώρες προς εμφάνιση"
}, lc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ac
}, Symbol.toStringTag, { value: "Module" })), dc = {
  "card.allergen.alder": "Alder",
  "card.allergen.allergy_risk": "Allergy risk",
  "card.allergen.ash": "Ash",
  "card.allergen.beech": "Beech",
  "card.allergen.birch": "Birch",
  "card.allergen.chenopod": "Chenopod",
  "card.allergen.goosefoot": "Goosefoot",
  "card.allergen.cypress": "Cypress",
  "card.allergen.elm": "Elm",
  "card.allergen.grass": "Grass",
  "card.allergen.grass_cat": "Grasses",
  "card.allergen.plantain": "Plantain",
  "card.allergen.hazel": "Hazel",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Lime",
  "card.allergen.maple": "Maple",
  "card.allergen.mold_spores": "Mold spores",
  "card.allergen.mugwort": "Mugwort",
  "card.allergen.nettle": "Nettle",
  "card.allergen.nettle_and_pellitory": "Nettle and pellitory",
  "card.allergen.no2": "Nitrogen dioxide",
  "card.allergen.oak": "Oak",
  "card.allergen.olive": "Olive",
  "card.allergen.ozone": "Ozone",
  "card.allergen.pine": "Pine",
  "card.allergen.plane": "Plane",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2.5",
  "card.allergen.poaceae": "Poaceae",
  "card.allergen.poplar": "Poplar",
  "card.allergen.qualite_globale": "Air quality",
  "card.allergen.ragweed": "Ragweed",
  "card.allergen.sorrel": "Sorrel",
  "card.allergen.rye": "Rye",
  "card.allergen.so2": "Sulfur dioxide",
  "card.allergen.trees": "Trees",
  "card.allergen.trees_cat": "Trees",
  "card.allergen.weeds": "Weeds",
  "card.allergen.weeds_cat": "Weeds",
  "card.allergen.willow": "Willow",
  "card.days.0": "Today",
  "card.days.1": "Tomorrow",
  "card.days.2": "Day after tomorrow",
  "card.error": "No pollen sensors found. Have you installed the correct integration and selected a region in the card configuration?",
  "card.error_filtered_sensors": "No sensors match your filters. Check selected allergens and threshold.",
  "card.error_location_not_found": "Location not found. Check the location name in the card configuration.",
  "card.error_entity_unavailable": "Weather entity is unavailable. The integration may be offline or restarting.",
  "card.error_no_sensors": "No pollen sensors found. Have you installed the correct integration and selected a region in the card configuration?",
  "card.stale_data": "Pollen data temporarily unavailable",
  "card.stale_data_subtitle": "The provider is not currently returning data for this region",
  "card.stale_allergen": "No data",
  "card.header_prefix": "Pollen forecast for",
  "card.header_no_location": "Pollen forecast",
  "card.location.plu": "Luxembourg",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.plu": "Pollen.lu",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "No pollen sensor integration found",
  "card.levels.0": "No pollen",
  "card.levels.1": "Low levels",
  "card.levels.2": "Low–moderate levels",
  "card.levels.3": "Moderate levels",
  "card.levels.4": "Moderate–high levels",
  "card.levels.5": "High levels",
  "card.levels.6": "Very high levels",
  "card.index.very_low": "Very low levels",
  "card.loading_forecast": "Loading forecast...",
  "card.no_allergens": "No allergens",
  "card.no_information": "(No information)",
  "card.atmo.unavailable": "Unavailable",
  "card.atmo.event": "Event",
  "editor.allergen_color_custom": "Custom colors",
  "editor.allergen_color_default_colors": "Default colors",
  "editor.allergen_color_mode": "Allergen color mode",
  "editor.allergen_colors": "Allergen colors (by level)",
  "editor.allergen_colors_header": "Allergen appearance",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Reset to default",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_outline_color": "Outline color",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Reset outline",
  "editor.allergen_stroke_width": "Stroke width",
  "editor.allergen_stroke_width_reset": "Reset stroke width",
  "editor.allergen_stroke_color_synced": "Sync stroke color with level",
  "editor.allergen_levels_gap_synced": "Sync gap with allergen stroke width",
  "editor.allergens": "Allergens",
  "editor.allergens_abbreviated": "Abbreviate allergens",
  "editor.allergens_header_category": "Category allergens (general)",
  "editor.allergens_header_pollen": "Pollen",
  "editor.allergens_header_pollution": "Air quality",
  "editor.allergens_header_specific": "Individual allergens (specific)",
  "editor.allergens_header_summary": "Summary",
  "editor.allergy_risk_top": "Allergy risk top of list",
  "editor.background_color": "Background color",
  "editor.background_color_picker": "Choose color",
  "editor.background_color_placeholder": "e.g. #ffeecc or var(--my-color)",
  "editor.card_version": "Pollenprognos Card version",
  "editor.city": "City",
  "editor.days_abbreviated": "Abbreviate weekdays",
  "editor.days_boldfaced": "Bold weekdays",
  "editor.days_relative": "Relative days (today/tomorrow)",
  "editor.days_uppercase": "Uppercase weekdays",
  "editor.debug": "Debug",
  "editor.entity_prefix": "Entity prefix",
  "editor.entity_prefix_placeholder": "e.g. pollen_",
  "editor.entity_suffix": "Entity suffix",
  "editor.entity_suffix_placeholder": "e.g. _home",
  "editor.icon_color_custom": "Custom color",
  "editor.icon_color_inherit": "Inherit from chart",
  "editor.icon_color_mode": "Icon color mode",
  "editor.icon_color_picker": "Pick icon color",
  "editor.icon_size": "Icon size (px)",
  "editor.index_top": "Index top of list",
  "editor.integration": "Integration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Segment colors",
  "editor.levels_colors_placeholder": "e.g. #ffeecc or var(--my-color)",
  "editor.levels_custom": "Use custom level colors",
  "editor.levels_empty_color": "Empty segment color",
  "editor.levels_gap": "Gap (px)",
  "editor.levels_gap_color": "Gap color",
  "editor.levels_gap_inherited": "Gap (inherited from allergen)",
  "editor.levels_header": "Level circle appearance",
  "editor.levels_icon_ratio": "Levels icon ratio",
  "editor.levels_inherit_allergen": "Inherit from allergen colors",
  "editor.levels_inherit_header": "Level Circle Inheritance",
  "editor.levels_inherit_mode": "Level circle color mode",
  "editor.levels_reset": "Reset to default",
  "editor.levels_text_color": "Text color (inner circle)",
  "editor.levels_text_size": "Text size (inner circle, % of normal)",
  "editor.levels_text_weight": "Text weight (inner circle)",
  "editor.levels_thickness": "Thickness (%)",
  "editor.link_to_sensors": "Link allergens to sensors",
  "editor.locale": "Locale",
  "editor.location": "Location",
  "editor.location_autodetect": "Auto-detect",
  "editor.location_manual": "Manual",
  "editor.minimal": "Minimal mode",
  "editor.minimal_gap": "Gap between allergens (px)",
  "editor.mode": "Mode",
  "editor.mode_daily": "Daily",
  "editor.mode_hourly": "Hourly",
  "editor.mode_hourly_eighth": "Hourly (every 8h)",
  "editor.mode_hourly_fourth": "Hourly (every 4h)",
  "editor.mode_hourly_second": "Hourly (every 2h)",
  "editor.mode_hourly_sixth": "Hourly (every 6h)",
  "editor.mode_hourly_third": "Hourly (every 3h)",
  "editor.mode_twice_daily": "Twice daily",
  "editor.no_allergens_color": "No Allergens",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Reset no allergens color",
  "editor.no_information": "No information",
  "editor.numeric_state_raw_risk": "Show raw value (allergy risk)",
  "editor.peu_nondaily_expl": "Only 'allergen_risk' is available in non-daily modes.",
  "editor.phrases": "Phrases",
  "editor.phrases_apply": "Apply",
  "editor.phrases_days": "Relative days",
  "editor.phrases_days.0": "Today",
  "editor.phrases_days.1": "Tomorrow",
  "editor.phrases_days.2": "Day after tomorrow",
  "editor.phrases_full": "Allergens",
  "editor.phrases_full.alder": "Alder",
  "editor.phrases_full.allergy_risk": "Allergy risk",
  "editor.phrases_full.ash": "Ash",
  "editor.phrases_full.beech": "Beech",
  "editor.phrases_full.birch": "Birch",
  "editor.phrases_full.chenopod": "Chenopod",
  "editor.phrases_full.cypress": "Cypress",
  "editor.phrases_full.elm": "Elm",
  "editor.phrases_full.grass": "Grass",
  "editor.phrases_full.grass_cat": "Grasses",
  "editor.phrases_full.goosefoot": "Goosefoot",
  "editor.phrases_full.hazel": "Hazel",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Lime",
  "editor.phrases_full.maple": "Maple",
  "editor.phrases_full.mold_spores": "Mold spores",
  "editor.phrases_full.mugwort": "Mugwort",
  "editor.phrases_full.nettle": "Nettle",
  "editor.phrases_full.nettle_and_pellitory": "Nettle and pellitory",
  "editor.phrases_full.no2": "Nitrogen dioxide",
  "editor.phrases_full.oak": "Oak",
  "editor.phrases_full.olive": "Olive",
  "editor.phrases_full.ozone": "Ozone",
  "editor.phrases_full.pine": "Pine",
  "editor.phrases_full.plane": "Plane",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2.5",
  "editor.phrases_full.poaceae": "Poaceae",
  "editor.phrases_full.poplar": "Poplar",
  "editor.phrases_full.qualite_globale": "Air quality",
  "editor.phrases_full.ragweed": "Ragweed",
  "editor.phrases_full.plantain": "Plantain",
  "editor.phrases_full.sorrel": "Sorrel",
  "editor.phrases_full.rye": "Rye",
  "editor.phrases_full.so2": "Sulfur dioxide",
  "editor.phrases_full.trees": "Trees",
  "editor.phrases_full.trees_cat": "Trees",
  "editor.phrases_full.weeds": "Weeds",
  "editor.phrases_full.weeds_cat": "Weeds",
  "editor.phrases_full.willow": "Willow",
  "editor.phrases_levels": "Allergen levels",
  "editor.phrases_levels.0": "No pollen",
  "editor.phrases_levels.1": "Low levels",
  "editor.phrases_levels.2": "Low–moderate levels",
  "editor.phrases_levels.3": "Moderate levels",
  "editor.phrases_levels.4": "Moderate–high levels",
  "editor.phrases_levels.5": "High levels",
  "editor.phrases_levels.6": "Very high levels",
  "editor.phrases_short": "Allergens, short",
  "editor.phrases_short.alder": "Aldr",
  "editor.phrases_short.allergy_risk": "Risk",
  "editor.phrases_short.ash": "Ash",
  "editor.phrases_short.beech": "Beech",
  "editor.phrases_short.birch": "Birch",
  "editor.phrases_short.chenopod": "Chnopd",
  "editor.phrases_short.cypress": "Cypress",
  "editor.phrases_short.elm": "Elm",
  "editor.phrases_short.grass": "Grass",
  "editor.phrases_short.grass_cat": "Grass",
  "editor.phrases_short.grasses": "Grass",
  "editor.phrases_short.goosefoot": "Gfoot",
  "editor.phrases_short.hazel": "Hazel",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Lime",
  "editor.phrases_short.maple": "Maple",
  "editor.phrases_short.mold_spores": "Mold",
  "editor.phrases_short.mugwort": "Mgwrt",
  "editor.phrases_short.nettle": "Nettle",
  "editor.phrases_short.nettle_and_pellitory": "Nettle",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Oak",
  "editor.phrases_short.olive": "Olive",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Pine",
  "editor.phrases_short.plane": "Plane",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2.5",
  "editor.phrases_short.poaceae": "Poaceae",
  "editor.phrases_short.plantain": "Plntn",
  "editor.phrases_short.poplar": "Poplar",
  "editor.phrases_short.qualite_globale": "AQI",
  "editor.phrases_short.ragweed": "Rgwd",
  "editor.phrases_short.sorrel": "Sorrl",
  "editor.phrases_short.rye": "Rye",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.trees": "Trees",
  "editor.phrases_short.trees_cat": "Trees",
  "editor.phrases_short.weeds": "Weeds",
  "editor.phrases_short.weeds_cat": "Weeds",
  "editor.phrases_short.willow": "Wllw",
  "editor.phrases_translate_all": "Translate all",
  "editor.pollen_threshold": "Threshold:",
  "editor.pollution_block_bottom": "Bottom (below pollen)",
  "editor.pollution_block_position": "Pollution position",
  "editor.pollution_block_top": "Top (above pollen)",
  "editor.preset_reset_all": "Reset all settings",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Select all allergens",
  "editor.select_all_pollen": "Select pollen",
  "editor.select_all_pollution": "Select air quality",
  "editor.show_empty_days": "Show empty days",
  "editor.show_text_allergen": "Show text, allergen",
  "editor.show_value_numeric": "Show value, numeric",
  "editor.show_value_numeric_in_circle": "Show numeric value in the circles",
  "editor.show_value_text": "Show value, text",
  "editor.show_version": "Log version to console",
  "editor.sort": "Sort order",
  "editor.sort_category_allergens_first": "Sort category allergens at the top",
  "editor.sort_name_ascending": "name, ascending",
  "editor.sort_name_descending": "name, descending",
  "editor.sort_none": "none (config order)",
  "editor.sort_pollution_block": "Group pollution separately",
  "editor.show_block_separator": "Show separator between blocks",
  "editor.sort_value_ascending": "value, ascending",
  "editor.sort_value_descending": "value, descending",
  "editor.summary_advanced": "Advanced",
  "editor.summary_allergens": "Allergens",
  "editor.summary_appearance_and_layout": "Appearance and layout",
  "editor.summary_card_interactivity": "Card interactivity",
  "editor.summary_card_layout_and_colors": "Card layout and colors",
  "editor.summary_data_view_settings": "Data view settings",
  "editor.summary_day_view_settings": "Day view settings",
  "editor.summary_entity_prefix_suffix": "Custom prefix and suffix",
  "editor.summary_functional_settings": "Functional settings",
  "editor.summary_integration_and_place": "Integration and place",
  "editor.summary_minimal": "Minimal",
  "editor.summary_title_and_header": "Title and header",
  "editor.summary_translation_and_strings": "Translation and strings",
  "editor.tap_action": "Tap action",
  "editor.tap_action_enable": "Enable tap action",
  "editor.text_size_ratio": "Text size ratio (%)",
  "editor.title": "Card title",
  "editor.title_automatic": "Automatic title",
  "editor.title_hide": "Hide title",
  "editor.title_placeholder": "(automatic)",
  "editor.to_show_columns": "Columns to show",
  "editor.to_show_days": "Days to show",
  "editor.to_show_hours": "Hours to show"
}, cc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dc
}, Symbol.toStringTag, { value: "Module" })), hc = {
  "card.allergen.alder": "Aliso",
  "card.allergen.allergy_risk": "Riesgo de alergia",
  "card.allergen.ash": "Fresno",
  "card.allergen.beech": "Haya",
  "card.allergen.birch": "Abedul",
  "card.allergen.chenopod": "Cenizo",
  "card.allergen.goosefoot": "Cenizo",
  "card.allergen.cypress": "Ciprés",
  "card.allergen.elm": "Olmo",
  "card.allergen.grass": "Gramíneas",
  "card.allergen.grass_cat": "Gramíneas",
  "card.allergen.plantain": "Llantén",
  "card.allergen.hazel": "Avellano",
  "card.allergen.index": "Índice",
  "card.allergen.lime": "Tilo",
  "card.allergen.maple": "Arce",
  "card.allergen.mold_spores": "Esporas de moho",
  "card.allergen.mugwort": "Artemisa",
  "card.allergen.nettle": "Ortiga",
  "card.allergen.nettle_and_pellitory": "Ortiga y parietaria",
  "card.allergen.no2": "Dióxido de nitrógeno",
  "card.allergen.oak": "Roble",
  "card.allergen.olive": "Olivo",
  "card.allergen.ozone": "Ozono",
  "card.allergen.pine": "Pino",
  "card.allergen.plane": "Plátano de sombra",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Gramíneas",
  "card.allergen.poplar": "Álamo",
  "card.allergen.qualite_globale": "Calidad del aire",
  "card.allergen.ragweed": "Ambrosía",
  "card.allergen.sorrel": "Acedera",
  "card.allergen.rye": "Centeno",
  "card.allergen.so2": "Dióxido de azufre",
  "card.allergen.trees": "Árboles",
  "card.allergen.trees_cat": "Árboles",
  "card.allergen.weeds": "Malezas",
  "card.allergen.weeds_cat": "Malezas",
  "card.allergen.willow": "Sauce",
  "card.days.0": "Hoy",
  "card.days.1": "Mañana",
  "card.days.2": "Pasado mañana",
  "card.error": "No se encontraron sensores de polen. ¿Has instalado la integración correcta y seleccionado una región en la configuración de la tarjeta?",
  "card.error_filtered_sensors": "Ningún sensor coincide con tus filtros. Revisa los alérgenos seleccionados y el umbral.",
  "card.error_location_not_found": "Ubicación no encontrada. Revisa el nombre de la ubicación en la configuración de la tarjeta.",
  "card.error_no_sensors": "No se encontraron sensores de polen. ¿Has instalado la integración correcta y seleccionado una región en la configuración de la tarjeta?",
  "card.error_entity_unavailable": "La entidad meteorológica no está disponible. Es posible que la integración esté desconectada o reiniciándose.",
  "card.stale_data": "Datos de polen temporalmente no disponibles",
  "card.stale_data_subtitle": "El proveedor no está devolviendo datos actualmente para esta región",
  "card.stale_allergen": "Sin datos",
  "card.header_prefix": "Pronóstico de polen para",
  "card.header_no_location": "Pronóstico de polen",
  "card.location.plu": "Luxemburgo",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.plu": "Pollen.lu",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "No se encontró integración de sensores de polen",
  "card.levels.0": "Sin polen",
  "card.levels.1": "Niveles bajos",
  "card.levels.2": "Niveles bajos a moderados",
  "card.levels.3": "Niveles moderados",
  "card.levels.4": "Niveles moderados a altos",
  "card.levels.5": "Niveles altos",
  "card.levels.6": "Niveles muy altos",
  "card.index.very_low": "Niveles muy bajos",
  "card.loading_forecast": "Cargando pronóstico...",
  "card.no_allergens": "Sin alérgenos",
  "card.no_information": "(Sin información)",
  "card.atmo.unavailable": "No disponible",
  "card.atmo.event": "Evento",
  "editor.allergen_color_custom": "Colores personalizados",
  "editor.allergen_color_default_colors": "Colores predeterminados",
  "editor.allergen_color_mode": "Modo de color de alérgenos",
  "editor.allergen_colors": "Colores de alérgenos (por nivel)",
  "editor.allergen_colors_header": "Apariencia de alérgenos",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Restablecer a predeterminado",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_outline_color": "Color del contorno",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Restablecer contorno",
  "editor.allergen_stroke_width": "Grosor del trazo",
  "editor.allergen_stroke_width_reset": "Restablecer grosor del trazo",
  "editor.allergen_stroke_color_synced": "Sincronizar color del trazo con el nivel",
  "editor.allergen_levels_gap_synced": "Sincronizar espacio con el grosor del trazo del alérgeno",
  "editor.allergens": "Alérgenos",
  "editor.allergens_abbreviated": "Abreviar alérgenos",
  "editor.allergens_header_category": "Categoría de alérgenos (general)",
  "editor.allergens_header_pollen": "Polen",
  "editor.allergens_header_pollution": "Calidad del aire",
  "editor.allergens_header_specific": "Alérgenos individuales (específicos)",
  "editor.allergens_header_summary": "Resumen",
  "editor.allergy_risk_top": "Riesgo de alergia al inicio de la lista",
  "editor.background_color": "Color de fondo",
  "editor.background_color_picker": "Elegir color",
  "editor.background_color_placeholder": "ej. #ffeecc o var(--my-color)",
  "editor.card_version": "Versión de la tarjeta Pollenprognos",
  "editor.city": "Ciudad",
  "editor.days_abbreviated": "Abreviar días de la semana",
  "editor.days_boldfaced": "Días de la semana en negrita",
  "editor.days_relative": "Días relativos (hoy/mañana)",
  "editor.days_uppercase": "Días de la semana en mayúsculas",
  "editor.debug": "Depuración",
  "editor.entity_prefix": "Prefijo de entidad",
  "editor.entity_prefix_placeholder": "ej. pollen_",
  "editor.entity_suffix": "Sufijo de entidad",
  "editor.entity_suffix_placeholder": "ej. _home",
  "editor.icon_color_custom": "Color personalizado",
  "editor.icon_color_inherit": "Heredar del gráfico",
  "editor.icon_color_mode": "Modo de color del icono",
  "editor.icon_color_picker": "Elegir color del icono",
  "editor.icon_size": "Tamaño del icono (px)",
  "editor.index_top": "Índice al inicio de la lista",
  "editor.integration": "Integración",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Colores de segmentos",
  "editor.levels_colors_placeholder": "ej. #ffeecc o var(--my-color)",
  "editor.levels_custom": "Usar colores de nivel personalizados",
  "editor.levels_empty_color": "Color del segmento vacío",
  "editor.levels_gap": "Espacio (px)",
  "editor.levels_gap_color": "Color del espacio",
  "editor.levels_gap_inherited": "Espacio (heredado del alérgeno)",
  "editor.levels_header": "Apariencia de los círculos de nivel",
  "editor.levels_icon_ratio": "Proporción del icono de niveles",
  "editor.levels_inherit_allergen": "Heredar de los colores de alérgenos",
  "editor.levels_inherit_header": "Herencia de los círculos de nivel",
  "editor.levels_inherit_mode": "Modo de color de los círculos de nivel",
  "editor.levels_reset": "Restablecer a predeterminado",
  "editor.levels_text_color": "Color del texto (círculo interior)",
  "editor.levels_text_size": "Tamaño del texto (círculo interior, % del normal)",
  "editor.levels_text_weight": "Peso del texto (círculo interior)",
  "editor.levels_thickness": "Grosor (%)",
  "editor.link_to_sensors": "Vincular alérgenos a sensores",
  "editor.locale": "Idioma",
  "editor.location": "Ubicación",
  "editor.location_autodetect": "Detección automática",
  "editor.location_manual": "Manual",
  "editor.minimal": "Modo mínimo",
  "editor.minimal_gap": "Espacio entre alérgenos (px)",
  "editor.mode": "Modo",
  "editor.mode_daily": "Diario",
  "editor.mode_hourly": "Cada hora",
  "editor.mode_hourly_eighth": "Cada 8 horas",
  "editor.mode_hourly_fourth": "Cada 4 horas",
  "editor.mode_hourly_second": "Cada 2 horas",
  "editor.mode_hourly_sixth": "Cada 6 horas",
  "editor.mode_hourly_third": "Cada 3 horas",
  "editor.mode_twice_daily": "Dos veces al día",
  "editor.no_allergens_color": "Sin alérgenos",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Restablecer color sin alérgenos",
  "editor.no_information": "Sin información",
  "editor.numeric_state_raw_risk": "Mostrar valor bruto (riesgo de alergia)",
  "editor.peu_nondaily_expl": "Solo 'allergen_risk' está disponible en modos no diarios.",
  "editor.phrases": "Frases",
  "editor.phrases_apply": "Aplicar",
  "editor.phrases_days": "Días relativos",
  "editor.phrases_days.0": "Hoy",
  "editor.phrases_days.1": "Mañana",
  "editor.phrases_days.2": "Pasado mañana",
  "editor.phrases_full": "Alérgenos",
  "editor.phrases_full.alder": "Aliso",
  "editor.phrases_full.allergy_risk": "Riesgo de alergia",
  "editor.phrases_full.ash": "Fresno",
  "editor.phrases_full.beech": "Haya",
  "editor.phrases_full.birch": "Abedul",
  "editor.phrases_full.chenopod": "Cenizo",
  "editor.phrases_full.cypress": "Ciprés",
  "editor.phrases_full.elm": "Olmo",
  "editor.phrases_full.grass": "Gramíneas",
  "editor.phrases_full.grass_cat": "Gramíneas",
  "editor.phrases_full.goosefoot": "Cenizo",
  "editor.phrases_full.hazel": "Avellano",
  "editor.phrases_full.index": "Índice",
  "editor.phrases_full.lime": "Tilo",
  "editor.phrases_full.maple": "Arce",
  "editor.phrases_full.mold_spores": "Esporas de moho",
  "editor.phrases_full.mugwort": "Artemisa",
  "editor.phrases_full.nettle": "Ortiga",
  "editor.phrases_full.nettle_and_pellitory": "Ortiga y parietaria",
  "editor.phrases_full.no2": "Dióxido de nitrógeno",
  "editor.phrases_full.oak": "Roble",
  "editor.phrases_full.olive": "Olivo",
  "editor.phrases_full.ozone": "Ozono",
  "editor.phrases_full.pine": "Pino",
  "editor.phrases_full.plane": "Plátano de sombra",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Gramíneas",
  "editor.phrases_full.poplar": "Álamo",
  "editor.phrases_full.qualite_globale": "Calidad del aire",
  "editor.phrases_full.ragweed": "Ambrosía",
  "editor.phrases_full.plantain": "Llantén",
  "editor.phrases_full.sorrel": "Acedera",
  "editor.phrases_full.rye": "Centeno",
  "editor.phrases_full.so2": "Dióxido de azufre",
  "editor.phrases_full.trees": "Árboles",
  "editor.phrases_full.trees_cat": "Árboles",
  "editor.phrases_full.weeds": "Malezas",
  "editor.phrases_full.weeds_cat": "Malezas",
  "editor.phrases_full.willow": "Sauce",
  "editor.phrases_levels": "Niveles de alérgenos",
  "editor.phrases_levels.0": "Sin polen",
  "editor.phrases_levels.1": "Niveles bajos",
  "editor.phrases_levels.2": "Niveles bajos a moderados",
  "editor.phrases_levels.3": "Niveles moderados",
  "editor.phrases_levels.4": "Niveles moderados a altos",
  "editor.phrases_levels.5": "Niveles altos",
  "editor.phrases_levels.6": "Niveles muy altos",
  "editor.phrases_short": "Alérgenos, corto",
  "editor.phrases_short.alder": "Aliso",
  "editor.phrases_short.allergy_risk": "Riesgo",
  "editor.phrases_short.ash": "Fres.",
  "editor.phrases_short.beech": "Haya",
  "editor.phrases_short.birch": "Abed.",
  "editor.phrases_short.chenopod": "Cen.",
  "editor.phrases_short.cypress": "Cipr.",
  "editor.phrases_short.elm": "Olmo",
  "editor.phrases_short.grass": "Gram.",
  "editor.phrases_short.grass_cat": "Gram.",
  "editor.phrases_short.grasses": "Gram.",
  "editor.phrases_short.goosefoot": "Cen.",
  "editor.phrases_short.hazel": "Avell.",
  "editor.phrases_short.index": "Índice",
  "editor.phrases_short.lime": "Tilo",
  "editor.phrases_short.maple": "Arce",
  "editor.phrases_short.mold_spores": "Moho",
  "editor.phrases_short.mugwort": "Artem.",
  "editor.phrases_short.nettle": "Ort.",
  "editor.phrases_short.nettle_and_pellitory": "Ort.",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Roble",
  "editor.phrases_short.olive": "Olivo",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Pino",
  "editor.phrases_short.plane": "Plát.",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Gram.",
  "editor.phrases_short.plantain": "Llant.",
  "editor.phrases_short.poplar": "Álamo",
  "editor.phrases_short.qualite_globale": "ICA",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.sorrel": "Aced.",
  "editor.phrases_short.rye": "Cent.",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.trees": "Árbol.",
  "editor.phrases_short.trees_cat": "Árbol.",
  "editor.phrases_short.weeds": "Malez.",
  "editor.phrases_short.weeds_cat": "Malez.",
  "editor.phrases_short.willow": "Sauce",
  "editor.phrases_translate_all": "Traducir todo",
  "editor.pollen_threshold": "Umbral:",
  "editor.pollution_block_bottom": "Abajo (debajo del polen)",
  "editor.pollution_block_position": "Posición de la contaminación",
  "editor.pollution_block_top": "Arriba (encima del polen)",
  "editor.preset_reset_all": "Restablecer toda la configuración",
  "editor.region_id": "ID de región",
  "editor.select_all_allergens": "Seleccionar todos los alérgenos",
  "editor.select_all_pollen": "Seleccionar polen",
  "editor.select_all_pollution": "Seleccionar calidad del aire",
  "editor.show_empty_days": "Mostrar días vacíos",
  "editor.show_text_allergen": "Mostrar texto, alérgeno",
  "editor.show_value_numeric": "Mostrar valor numérico",
  "editor.show_value_numeric_in_circle": "Mostrar valor numérico en los círculos",
  "editor.show_value_text": "Mostrar valor como texto",
  "editor.show_version": "Registrar versión en la consola",
  "editor.sort": "Orden",
  "editor.sort_category_allergens_first": "Ordenar alérgenos de categoría al inicio",
  "editor.sort_name_ascending": "nombre, ascendente",
  "editor.sort_name_descending": "nombre, descendente",
  "editor.sort_none": "ninguno (orden de configuración)",
  "editor.sort_pollution_block": "Agrupar contaminación por separado",
  "editor.show_block_separator": "Mostrar separador entre bloques",
  "editor.sort_value_ascending": "valor, ascendente",
  "editor.sort_value_descending": "valor, descendente",
  "editor.summary_advanced": "Avanzado",
  "editor.summary_allergens": "Alérgenos",
  "editor.summary_appearance_and_layout": "Apariencia y diseño",
  "editor.summary_card_interactivity": "Interactividad de la tarjeta",
  "editor.summary_card_layout_and_colors": "Diseño y colores de la tarjeta",
  "editor.summary_data_view_settings": "Configuración de vista de datos",
  "editor.summary_day_view_settings": "Configuración de vista diaria",
  "editor.summary_entity_prefix_suffix": "Prefijo y sufijo personalizados",
  "editor.summary_functional_settings": "Configuración funcional",
  "editor.summary_integration_and_place": "Integración y ubicación",
  "editor.summary_minimal": "Mínimo",
  "editor.summary_title_and_header": "Título y encabezado",
  "editor.summary_translation_and_strings": "Traducción y textos",
  "editor.tap_action": "Acción al tocar",
  "editor.tap_action_enable": "Activar acción al tocar",
  "editor.text_size_ratio": "Proporción de tamaño del texto (%)",
  "editor.title": "Título de la tarjeta",
  "editor.title_automatic": "Título automático",
  "editor.title_hide": "Ocultar título",
  "editor.title_placeholder": "(automático)",
  "editor.to_show_columns": "Columnas a mostrar",
  "editor.to_show_days": "Días a mostrar",
  "editor.to_show_hours": "Horas a mostrar"
}, uc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hc
}, Symbol.toStringTag, { value: "Module" })), _c = {
  "card.allergen.alder": "Leppä",
  "card.allergen.allergy_risk": "Allergiariski",
  "card.allergen.ash": "Saarni",
  "card.allergen.beech": "Pyökki",
  "card.allergen.birch": "Koivu",
  "card.allergen.chenopod": "Savikka",
  "card.allergen.cypress": "Sypressi",
  "card.allergen.elm": "Jalava",
  "card.allergen.goosefoot": "Savikka",
  "card.allergen.grass": "Heinä",
  "card.allergen.grass_cat": "Heinät",
  "card.allergen.hazel": "Pähkinäpensas",
  "card.allergen.index": "Indeksi",
  "card.allergen.lime": "Lehmus",
  "card.allergen.maple": "Vaahtera",
  "card.allergen.mold_spores": "Homeitiöt",
  "card.allergen.mugwort": "Pujo",
  "card.allergen.nettle": "Nokkonen",
  "card.allergen.nettle_and_pellitory": "Nokkonen ja piilehtipensas",
  "card.allergen.no2": "Typpidioksidi",
  "card.allergen.oak": "Tammi",
  "card.allergen.olive": "Oliivipuu",
  "card.allergen.ozone": "Otsoni",
  "card.allergen.pine": "Mänty",
  "card.allergen.plane": "Plataanipuu",
  "card.allergen.plantain": "Ratamo",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Heinät",
  "card.allergen.poplar": "Haapa",
  "card.allergen.qualite_globale": "Ilmanlaatu",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Ruis",
  "card.allergen.so2": "Rikkidioksidi",
  "card.allergen.sorrel": "Suolaheinä",
  "card.allergen.trees": "Puut",
  "card.allergen.trees_cat": "Puut",
  "card.allergen.weeds": "Rikkaruohot",
  "card.allergen.weeds_cat": "Rikkaruohot",
  "card.allergen.willow": "Paju",
  "card.days.0": "Tänään",
  "card.days.1": "Huomenna",
  "card.days.2": "Ylihuomenna",
  "card.error": "Pölytysantureita ei löytynyt. Oletko asentanut oikean integraation ja valinnut alueen kortin asetuksista?",
  "card.error_filtered_sensors": "Yksikään anturi ei vastaa valintojasi. Tarkista allergeenit ja kynnysarvo.",
  "card.error_location_not_found": "Sijaintia ei löytynyt. Tarkista sijainnin nimi kortin asetuksista.",
  "card.error_entity_unavailable": "Sääentiteetti ei ole käytettävissä. Integraatio voi olla offline tai käynnistymässä uudelleen.",
  "card.error_no_sensors": "Pölytysantureita ei löytynyt. Oletko asentanut oikean integraation ja valinnut alueen kortin asetuksista?",
  "card.header_prefix": "Siitepölyennuste kohteessa",
  "card.header_no_location": "Siitepölyennuste",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Siitepölyanturia ei löydy",
  "card.levels.0": "Ei siitepölyä",
  "card.levels.1": "Matalat tasot",
  "card.levels.2": "Melko matalat tasot",
  "card.levels.3": "Keskitasot",
  "card.levels.4": "Melko korkeat tasot",
  "card.levels.5": "Korkeat tasot",
  "card.levels.6": "Erittäin korkeat tasot",
  "card.index.very_low": "Erittäin matalat tasot",
  "card.loading_forecast": "Ennustetta ladataan...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Ei allergeeneja",
  "card.no_information": "(Ei tietoa)",
  "card.atmo.unavailable": "Ei saatavilla",
  "card.atmo.event": "Tapahtuma",
  "card.stale_allergen": "Ei tietoja",
  "card.stale_data": "Siitepölytiedot ovat tilapäisesti poissa käytöstä",
  "card.stale_data_subtitle": "Tietolähde ei tällä hetkellä palauta tietoja tälle alueelle",
  "editor.allergen_color_custom": "Mukautetut värit",
  "editor.allergen_color_default_colors": "Oletusvärit",
  "editor.allergen_color_mode": "Allergeenin väritila",
  "editor.allergen_colors": "Allergeenin värit (tasoittain)",
  "editor.allergen_colors_header": "Allergeenin ulkoasu",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Palauta oletus",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synkronoi väli allergeenin viivan paksuuden kanssa",
  "editor.allergen_outline_color": "Ääriviivan väri",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Palauta ääriviiva",
  "editor.allergen_stroke_color_synced": "Synkronoi viivan väri tason kanssa",
  "editor.allergen_stroke_width": "Viivan paksuus",
  "editor.allergen_stroke_width_reset": "Palauta viivan paksuus",
  "editor.allergens": "Allergeenit",
  "editor.allergens_abbreviated": "Lyhennä allergeenit",
  "editor.allergens_header_category": "Allergiakategoriat (yleiset)",
  "editor.allergens_header_pollen": "Siitepöly",
  "editor.allergens_header_pollution": "Ilmanlaatu",
  "editor.allergens_header_specific": "Yksittäiset allergeenit (tarkat)",
  "editor.allergens_header_summary": "Yhteenveto",
  "editor.allergy_risk_top": "Allergiariski listan kärkeen",
  "editor.background_color": "Taustaväri",
  "editor.background_color_picker": "Valitse väri",
  "editor.background_color_placeholder": "esim. #ffeecc tai var(--my-color)",
  "editor.card_version": "Siitepölyennustekortin versio",
  "editor.city": "Kaupunki",
  "editor.days_abbreviated": "Lyhennä viikonpäivät",
  "editor.days_boldfaced": "Korosta viikonpäivät",
  "editor.days_relative": "Suhteelliset päivät (tänään/huomenna)",
  "editor.days_uppercase": "Isot kirjaimet viikonpäivissä",
  "editor.debug": "Debuggaus",
  "editor.entity_prefix": "Entiteetin etuliite",
  "editor.entity_prefix_placeholder": "esim. pollen_",
  "editor.entity_suffix": "Entiteetin jälkiliite",
  "editor.entity_suffix_placeholder": "esim. _home",
  "editor.icon_color_custom": "Mukautettu väri",
  "editor.icon_color_inherit": "Peri kaaviosta",
  "editor.icon_color_mode": "Kuvakkeen väritila",
  "editor.icon_color_picker": "Valitse kuvakkeen väri",
  "editor.icon_size": "Kuvakkeen koko (px)",
  "editor.index_top": "Indeksi listan kärkeen",
  "editor.integration": "Integraatio",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Segmenttien värit",
  "editor.levels_colors_placeholder": "esim. #ffeecc tai var(--my-color)",
  "editor.levels_custom": "Käytä mukautettuja tasovärejä",
  "editor.levels_empty_color": "Tyhjän segmentin väri",
  "editor.levels_gap": "Väli (px)",
  "editor.levels_gap_color": "Välin väri",
  "editor.levels_gap_inherited": "Väli (peritty allergeenista)",
  "editor.levels_header": "Tason ympyrän ulkoasu",
  "editor.levels_icon_ratio": "Taso-ikoni suhde",
  "editor.levels_inherit_allergen": "Peri allergeenin värit",
  "editor.levels_inherit_header": "Tason ympyröiden periytyminen",
  "editor.levels_inherit_mode": "Tason ympyrän väritila",
  "editor.levels_reset": "Palauta oletusarvoon",
  "editor.levels_text_color": "Tekstin väri (sisäympyrä)",
  "editor.levels_text_size": "Tekstin koko (sisäympyrä, % normaalista)",
  "editor.levels_text_weight": "Tekstin paksuus (sisäympyrä)",
  "editor.levels_thickness": "Paksuus (%)",
  "editor.link_to_sensors": "Yhdistä allergeenit sensoreihin",
  "editor.locale": "Kieliasetus",
  "editor.location": "Sijainti",
  "editor.location_autodetect": "Automaattinen tunnistus",
  "editor.location_manual": "Manuaalinen",
  "editor.minimal": "Minimitila",
  "editor.minimal_gap": "Väli allergeenien välillä (px)",
  "editor.mode": "Tila",
  "editor.mode_daily": "Päivittäin",
  "editor.mode_hourly": "Tunneittain",
  "editor.mode_hourly_eighth": "Tunneittain (joka 8. tunti)",
  "editor.mode_hourly_fourth": "Tunneittain (joka 4. tunti)",
  "editor.mode_hourly_second": "Tunneittain (joka 2. tunti)",
  "editor.mode_hourly_sixth": "Tunneittain (joka 6. tunti)",
  "editor.mode_hourly_third": "Tunneittain (joka 3. tunti)",
  "editor.mode_twice_daily": "Kahdesti päivässä",
  "editor.no_allergens_color": "Ei allergeeneja",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Palauta väri ilman allergeeneja",
  "editor.no_information": "Ei tietoa",
  "editor.numeric_state_raw_risk": "Näytä raaka-arvo (allergiariski)",
  "editor.peu_nondaily_expl": "Vain 'allergen_risk' on käytettävissä ei-päivittäisissä tiloissa.",
  "editor.phrases": "Ilmaisut",
  "editor.phrases_apply": "Käytä",
  "editor.phrases_days": "Suhteelliset päivät",
  "editor.phrases_days.0": "Tänään",
  "editor.phrases_days.1": "Huomenna",
  "editor.phrases_days.2": "Ylihuomenna",
  "editor.phrases_full": "Allergeenit",
  "editor.phrases_full.alder": "Leppä",
  "editor.phrases_full.allergy_risk": "Allergiariski",
  "editor.phrases_full.ash": "Saarni",
  "editor.phrases_full.beech": "Pyökki",
  "editor.phrases_full.birch": "Koivu",
  "editor.phrases_full.chenopod": "Savikka",
  "editor.phrases_full.cypress": "Sypressi",
  "editor.phrases_full.elm": "Jalava",
  "editor.phrases_full.goosefoot": "Savikka",
  "editor.phrases_full.grass": "Heinä",
  "editor.phrases_full.grass_cat": "Heinät",
  "editor.phrases_full.hazel": "Pähkinäpensas",
  "editor.phrases_full.index": "Indeksi",
  "editor.phrases_full.lime": "Lehmus",
  "editor.phrases_full.maple": "Vaahtera",
  "editor.phrases_full.mold_spores": "Homeitiöt",
  "editor.phrases_full.mugwort": "Pujo",
  "editor.phrases_full.nettle": "Nokkonen",
  "editor.phrases_full.nettle_and_pellitory": "Nokkonen ja piilehtipensas",
  "editor.phrases_full.no2": "Typpidioksidi",
  "editor.phrases_full.oak": "Tammi",
  "editor.phrases_full.olive": "Oliivipuu",
  "editor.phrases_full.ozone": "Otsoni",
  "editor.phrases_full.pine": "Mänty",
  "editor.phrases_full.plane": "Plataanipuu",
  "editor.phrases_full.plantain": "Ratamo",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Heinät",
  "editor.phrases_full.poplar": "Popppeli",
  "editor.phrases_full.qualite_globale": "Ilmanlaatu",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Ruis",
  "editor.phrases_full.so2": "Rikkidioksidi",
  "editor.phrases_full.sorrel": "Suolaheinä",
  "editor.phrases_full.trees": "Puut",
  "editor.phrases_full.trees_cat": "Puut",
  "editor.phrases_full.weeds": "Rikkaruohot",
  "editor.phrases_full.weeds_cat": "Rikkaruohot",
  "editor.phrases_full.willow": "Paju",
  "editor.phrases_levels": "Allergeenitasot",
  "editor.phrases_levels.0": "Ei siitepölyä",
  "editor.phrases_levels.1": "Matalat tasot",
  "editor.phrases_levels.2": "Melko matalat tasot",
  "editor.phrases_levels.3": "Keskitasot",
  "editor.phrases_levels.4": "Melko korkeat tasot",
  "editor.phrases_levels.5": "Korkeat tasot",
  "editor.phrases_levels.6": "Erittäin korkeat tasot",
  "editor.phrases_short": "Allergeenit, lyhyt",
  "editor.phrases_short.alder": "Leppä",
  "editor.phrases_short.allergy_risk": "Riski",
  "editor.phrases_short.ash": "Saarni",
  "editor.phrases_short.beech": "Pyökki",
  "editor.phrases_short.birch": "Koivu",
  "editor.phrases_short.chenopod": "Savik",
  "editor.phrases_short.cypress": "Syp.",
  "editor.phrases_short.elm": "Jalava",
  "editor.phrases_short.goosefoot": "Savik",
  "editor.phrases_short.grass": "Heinä",
  "editor.phrases_short.grass_cat": "Heinä",
  "editor.phrases_short.grasses": "Heinät",
  "editor.phrases_short.hazel": "Pähkinä",
  "editor.phrases_short.index": "Indeksi",
  "editor.phrases_short.lime": "Lehmus",
  "editor.phrases_short.maple": "Vaaht.",
  "editor.phrases_short.mold_spores": "Home",
  "editor.phrases_short.mugwort": "Pujo",
  "editor.phrases_short.nettle": "Nokkon",
  "editor.phrases_short.nettle_and_pellitory": "Nokkonen",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Tammi",
  "editor.phrases_short.olive": "Oliivi",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Mänty",
  "editor.phrases_short.plane": "Plataani",
  "editor.phrases_short.plantain": "Ratam",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Heinät",
  "editor.phrases_short.poplar": "Haapa",
  "editor.phrases_short.qualite_globale": "ILI",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Ruis",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Suol",
  "editor.phrases_short.trees": "Puut",
  "editor.phrases_short.trees_cat": "Puut",
  "editor.phrases_short.weeds": "Rikkaruohot",
  "editor.phrases_short.weeds_cat": "Rikkaruohot",
  "editor.phrases_short.willow": "Paju",
  "editor.phrases_translate_all": "Käännä kaikki",
  "editor.pollen_threshold": "Kynnysarvo:",
  "editor.pollution_block_bottom": "Alhaalla (siitepölyn alapuolella)",
  "editor.pollution_block_position": "Ilmanlaadun sijainti",
  "editor.pollution_block_top": "Ylhäällä (siitepölyn yläpuolella)",
  "editor.preset_reset_all": "Palauta kaikki asetukset",
  "editor.region_id": "Alueen tunnus",
  "editor.select_all_allergens": "Valitse kaikki allergeenit",
  "editor.select_all_pollen": "Valitse siitepöly",
  "editor.select_all_pollution": "Valitse ilmanlaatu",
  "editor.show_empty_days": "Näytä tyhjät päivät",
  "editor.show_text_allergen": "Näytä allergeenin nimi",
  "editor.show_value_numeric": "Näytä numeerinen arvo",
  "editor.show_value_numeric_in_circle": "Näytä numeerinen arvo ympyröissä",
  "editor.show_value_text": "Näytä arvo tekstinä",
  "editor.show_version": "Tulosta versio konsoliin",
  "editor.sort": "Järjestys",
  "editor.sort_category_allergens_first": "Lajittele allergeeni-kategoriat ylimmäksi",
  "editor.sort_name_ascending": "nimi, nouseva",
  "editor.sort_name_descending": "nimi, laskeva",
  "editor.sort_none": "ei mitään (määritysjärjestys)",
  "editor.sort_pollution_block": "Ryhmitä ilmanlaatu erikseen",
  "editor.show_block_separator": "Näytä erotin lohkojen välillä",
  "editor.sort_value_ascending": "arvo, nouseva",
  "editor.sort_value_descending": "arvo, laskeva",
  "editor.summary_advanced": "Lisäasetukset",
  "editor.summary_allergens": "Allergeenit",
  "editor.summary_appearance_and_layout": "Ulkoasu ja asettelu",
  "editor.summary_card_interactivity": "Kortin vuorovaikutus",
  "editor.summary_card_layout_and_colors": "Kortin asettelu ja värit",
  "editor.summary_data_view_settings": "Tietonäytön asetukset",
  "editor.summary_day_view_settings": "Päivänäkymän asetukset",
  "editor.summary_entity_prefix_suffix": "Mukautettu etu- ja jälkiliite",
  "editor.summary_functional_settings": "Toiminnalliset asetukset",
  "editor.summary_integration_and_place": "Integraatio ja sijainti",
  "editor.summary_minimal": "Minimaalinen",
  "editor.summary_title_and_header": "Otsikko ja yläotsikko",
  "editor.summary_translation_and_strings": "Käännös ja merkkijonot",
  "editor.tap_action": "Napautustoiminto",
  "editor.tap_action_enable": "Ota napautustoiminto käyttöön",
  "editor.text_size_ratio": "Tekstin kokojen suhde (%)",
  "editor.title": "Kortin otsikko",
  "editor.title_automatic": "Automaattinen otsikko",
  "editor.title_hide": "Piilota otsikko",
  "editor.title_placeholder": "(automaattinen)",
  "editor.to_show_columns": "Näytettävät sarakkeet",
  "editor.to_show_days": "Näytettävät päivät",
  "editor.to_show_hours": "Näytettävät tunnit"
}, gc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _c
}, Symbol.toStringTag, { value: "Module" })), pc = {
  "card.allergen.alder": "Aulne",
  "card.allergen.allergy_risk": "Risque d'allergie",
  "card.allergen.ash": "Frêne",
  "card.allergen.beech": "Hêtre",
  "card.allergen.birch": "Bouleau",
  "card.allergen.chenopod": "Chénopode",
  "card.allergen.cypress": "Cyprès",
  "card.allergen.elm": "Orme",
  "card.allergen.goosefoot": "Chénopode",
  "card.allergen.grass": "Graminées",
  "card.allergen.grass_cat": "Graminées",
  "card.allergen.hazel": "Noisetier",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Tilleul",
  "card.allergen.maple": "Érable",
  "card.allergen.mold_spores": "Spores de moisissure",
  "card.allergen.mugwort": "Armoise",
  "card.allergen.nettle": "Ortie",
  "card.allergen.nettle_and_pellitory": "Ortie et pariétaire",
  "card.allergen.no2": "Dioxyde d'azote",
  "card.allergen.oak": "Chêne",
  "card.allergen.olive": "Olivier",
  "card.allergen.ozone": "Ozone",
  "card.allergen.pine": "Pin",
  "card.allergen.plane": "Platane",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.plantain": "Plantain",
  "card.allergen.poaceae": "Graminées",
  "card.allergen.poplar": "Peuplier",
  "card.allergen.qualite_globale": "Qualité de l'air",
  "card.allergen.ragweed": "Ambroisie",
  "card.allergen.rye": "Seigle",
  "card.allergen.so2": "Dioxyde de soufre",
  "card.allergen.sorrel": "Oseille",
  "card.allergen.trees": "Arbres",
  "card.allergen.trees_cat": "Arbres",
  "card.allergen.weeds": "Herbacées",
  "card.allergen.weeds_cat": "Herbacées",
  "card.allergen.willow": "Saule",
  "card.days.0": "Aujourd'hui",
  "card.days.1": "Demain",
  "card.days.2": "Après-demain",
  "card.error": "Aucun capteur de pollen trouvé. Avez-vous installé la bonne intégration et sélectionné une région dans la configuration de la carte ?",
  "card.error_filtered_sensors": "Aucun capteur ne correspond à vos filtres. Vérifiez les allergènes sélectionnés et leurs seuils.",
  "card.error_location_not_found": "Emplacement introuvable. Vérifiez le nom de l’emplacement dans la configuration de la carte.",
  "card.error_entity_unavailable": "L’entité météo est indisponible. L’intégration est peut-être hors ligne ou en cours de redémarrage.",
  "card.error_no_sensors": "Aucun capteur de pollen trouvé. Avez-vous installé la bonne intégration et sélectionné une région dans la configuration de la carte ?",
  "card.header_prefix": "Prévisions des pollens pour",
  "card.header_no_location": "Prévisions des pollens",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Aucune intégration de capteur de pollen trouvée",
  "card.levels.0": "Pas de pollen",
  "card.levels.1": "Faibles niveaux",
  "card.levels.2": "Niveaux faibles à modérés",
  "card.levels.3": "Niveaux modérés",
  "card.levels.4": "Niveaux modérés à élevés",
  "card.levels.5": "Niveaux élevés",
  "card.levels.6": "Niveaux très élevés",
  "card.index.very_low": "Niveaux très faibles",
  "card.loading_forecast": "Chargement des prévisions...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Aucun allergène",
  "card.no_information": "(Aucune information)",
  "card.atmo.unavailable": "Indisponible",
  "card.atmo.event": "Événement",
  "card.stale_allergen": "Aucune donnée",
  "card.stale_data": "Données polliniques temporairement indisponibles",
  "card.stale_data_subtitle": "Le fournisseur ne renvoie actuellement aucune donnée pour cette région",
  "editor.allergen_color_custom": "Couleurs personnalisées",
  "editor.allergen_color_default_colors": "Couleurs par défaut",
  "editor.allergen_color_mode": "Mode couleur des allergènes",
  "editor.allergen_colors": "Couleurs des allergènes (par niveau)",
  "editor.allergen_colors_header": "Apparence des allergènes",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Réinitialiser par défaut",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synchroniser l'écart avec l'épaisseur du trait de l'allergène",
  "editor.allergen_outline_color": "Couleur du contour",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Réinitialiser le contour",
  "editor.allergen_stroke_color_synced": "Synchroniser la couleur du trait avec le niveau",
  "editor.allergen_stroke_width": "Épaisseur du trait",
  "editor.allergen_stroke_width_reset": "Réinitialiser l'épaisseur du trait",
  "editor.allergens": "Allergènes",
  "editor.allergens_abbreviated": "Abréger les allergènes",
  "editor.allergens_header_category": "Catégorie d'allergènes (général)",
  "editor.allergens_header_pollen": "Pollen",
  "editor.allergens_header_pollution": "Qualité de l'air",
  "editor.allergens_header_specific": "Allergènes individuels (spécifiques)",
  "editor.allergens_header_summary": "Résumé",
  "editor.allergy_risk_top": "Risque d'allergie en haut de la liste",
  "editor.background_color": "Couleur d'arrière-plan",
  "editor.background_color_picker": "Choisir la couleur",
  "editor.background_color_placeholder": "par exemple #ffeecc ou var(--my-color)",
  "editor.card_version": "Version de la carte Pollenprognos",
  "editor.city": "Ville",
  "editor.days_abbreviated": "Abréger les jours de la semaine",
  "editor.days_boldfaced": "Jours de la semaine en gras",
  "editor.days_relative": "Jours relatifs (aujourd'hui/demain)",
  "editor.days_uppercase": "Jours de la semaine en majuscules",
  "editor.debug": "Débogage",
  "editor.entity_prefix": "Préfixe d'entité",
  "editor.entity_prefix_placeholder": "par exemple pollen_",
  "editor.entity_suffix": "Suffixe d'entité",
  "editor.entity_suffix_placeholder": "par exemple _home",
  "editor.icon_color_custom": "Couleur personnalisée",
  "editor.icon_color_inherit": "Hériter du graphique",
  "editor.icon_color_mode": "Mode couleur des icônes",
  "editor.icon_color_picker": "Choisir la couleur de l'icône",
  "editor.icon_size": "Taille de l'icône (px)",
  "editor.index_top": "Index en haut de la liste",
  "editor.integration": "Intégration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Couleurs des segments",
  "editor.levels_colors_placeholder": "par exemple #ffeecc ou var(--my-color)",
  "editor.levels_custom": "Utiliser des couleurs de niveau personnalisées",
  "editor.levels_empty_color": "Couleur des segments vides",
  "editor.levels_gap": "Espacement (px)",
  "editor.levels_gap_color": "Couleur d'espacement",
  "editor.levels_gap_inherited": "Écart (hérité de l'allergène)",
  "editor.levels_header": "Apparence des cercles de niveau",
  "editor.levels_icon_ratio": "Ratio de l'icône des niveaux",
  "editor.levels_inherit_allergen": "Hériter des couleurs des allergènes",
  "editor.levels_inherit_header": "Héritage des cercles de niveau",
  "editor.levels_inherit_mode": "Mode couleur des cercles de niveau",
  "editor.levels_reset": "Réinitialiser aux paramètres par défaut",
  "editor.levels_text_color": "Couleur du texte (cercle intérieur)",
  "editor.levels_text_size": "Taille du texte (cercle intérieur, % de la taille normale)",
  "editor.levels_text_weight": "Épaisseur du texte (cercle intérieur)",
  "editor.levels_thickness": "Épaisseur (%)",
  "editor.link_to_sensors": "Lier les allergènes aux capteurs",
  "editor.locale": "Paramètres régionaux",
  "editor.location": "Emplacement",
  "editor.location_autodetect": "Détection automatique",
  "editor.location_manual": "Manuel",
  "editor.minimal": "Mode minimal",
  "editor.minimal_gap": "Espacement entre les allergènes (px)",
  "editor.mode": "Mode",
  "editor.mode_daily": "Quotidien",
  "editor.mode_hourly": "Toutes les heures",
  "editor.mode_hourly_eighth": "Toutes les 8 heures",
  "editor.mode_hourly_fourth": "Toutes les 4 heures",
  "editor.mode_hourly_second": "Toutes les 2 heures",
  "editor.mode_hourly_sixth": "Toutes les 6 heures",
  "editor.mode_hourly_third": "Toutes les 3 heures",
  "editor.mode_twice_daily": "Deux fois par jour",
  "editor.no_allergens_color": "Aucun allergène",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Réinitialiser la couleur sans allergènes",
  "editor.no_information": "Aucune information",
  "editor.numeric_state_raw_risk": "Afficher la valeur brute (risque d'allergie)",
  "editor.peu_nondaily_expl": "Seul 'allergen_risk' est disponible en modes non quotidiens.",
  "editor.phrases": "Phrases",
  "editor.phrases_apply": "Appliquer",
  "editor.phrases_days": "Jours relatifs",
  "editor.phrases_days.0": "Aujourd'hui",
  "editor.phrases_days.1": "Demain",
  "editor.phrases_days.2": "Après-demain",
  "editor.phrases_full": "Allergènes",
  "editor.phrases_full.alder": "Aulne",
  "editor.phrases_full.allergy_risk": "Risque d'allergie",
  "editor.phrases_full.ash": "Frêne",
  "editor.phrases_full.beech": "Hêtre",
  "editor.phrases_full.birch": "Bouleau",
  "editor.phrases_full.chenopod": "Chénopode",
  "editor.phrases_full.cypress": "Cyprès",
  "editor.phrases_full.elm": "Orme",
  "editor.phrases_full.goosefoot": "Chénopode",
  "editor.phrases_full.grass": "Graminées",
  "editor.phrases_full.grass_cat": "Graminées",
  "editor.phrases_full.hazel": "Noisetier",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Tilleul",
  "editor.phrases_full.maple": "Érable",
  "editor.phrases_full.mold_spores": "Spores de moisissure",
  "editor.phrases_full.mugwort": "Armoise",
  "editor.phrases_full.nettle": "Ortie",
  "editor.phrases_full.nettle_and_pellitory": "Ortie et pariétaire",
  "editor.phrases_full.no2": "Dioxyde d'azote",
  "editor.phrases_full.oak": "Chêne",
  "editor.phrases_full.olive": "Olivier",
  "editor.phrases_full.ozone": "Ozone",
  "editor.phrases_full.pine": "Pin",
  "editor.phrases_full.plane": "Platane",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.plantain": "Plantain",
  "editor.phrases_full.poaceae": "Graminées",
  "editor.phrases_full.poplar": "Peuplier",
  "editor.phrases_full.qualite_globale": "Qualité de l'air",
  "editor.phrases_full.ragweed": "Ambroisie",
  "editor.phrases_full.rye": "Seigle",
  "editor.phrases_full.so2": "Dioxyde de soufre",
  "editor.phrases_full.sorrel": "Oseille",
  "editor.phrases_full.trees": "Arbres",
  "editor.phrases_full.trees_cat": "Arbres",
  "editor.phrases_full.weeds": "Herbacées",
  "editor.phrases_full.weeds_cat": "Herbacées",
  "editor.phrases_full.willow": "Saule",
  "editor.phrases_levels": "Niveaux d'allergènes",
  "editor.phrases_levels.0": "Pas de pollen",
  "editor.phrases_levels.1": "Niveaux faibles",
  "editor.phrases_levels.2": "Niveaux faibles à modérés",
  "editor.phrases_levels.3": "Niveaux modérés",
  "editor.phrases_levels.4": "Niveaux modérés à élevés",
  "editor.phrases_levels.5": "Niveaux élevés",
  "editor.phrases_levels.6": "Niveaux très élevés",
  "editor.phrases_short": "Allergènes, court",
  "editor.phrases_short.alder": "Aulne",
  "editor.phrases_short.allergy_risk": "Risque",
  "editor.phrases_short.ash": "Frêne",
  "editor.phrases_short.beech": "Hêtre",
  "editor.phrases_short.birch": "Bouleau",
  "editor.phrases_short.chenopod": "Chéno",
  "editor.phrases_short.cypress": "Cyprès",
  "editor.phrases_short.elm": "Orme",
  "editor.phrases_short.goosefoot": "Chéno",
  "editor.phrases_short.grass": "Graminées",
  "editor.phrases_short.grass_cat": "Graminées",
  "editor.phrases_short.grasses": "Graminées",
  "editor.phrases_short.hazel": "Noisetier",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Tilleul",
  "editor.phrases_short.maple": "Érab.",
  "editor.phrases_short.mold_spores": "Moisissure",
  "editor.phrases_short.mugwort": "Armoise",
  "editor.phrases_short.nettle": "Ortie",
  "editor.phrases_short.nettle_and_pellitory": "Ortie",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Chêne",
  "editor.phrases_short.olive": "Olivier",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Pin",
  "editor.phrases_short.plane": "Platane",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.plantain": "Plant",
  "editor.phrases_short.poaceae": "Gramin",
  "editor.phrases_short.poplar": "Peupl",
  "editor.phrases_short.qualite_globale": "IQA",
  "editor.phrases_short.ragweed": "Ambroisie",
  "editor.phrases_short.rye": "Seigle",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Osel",
  "editor.phrases_short.trees": "Arbres",
  "editor.phrases_short.trees_cat": "Arbres",
  "editor.phrases_short.weeds": "Herbacées",
  "editor.phrases_short.weeds_cat": "Herbacées",
  "editor.phrases_short.willow": "Saule",
  "editor.phrases_translate_all": "Tout traduire",
  "editor.pollen_threshold": "Seuil :",
  "editor.pollution_block_bottom": "En bas (sous le pollen)",
  "editor.pollution_block_position": "Position de la pollution",
  "editor.pollution_block_top": "En haut (au-dessus du pollen)",
  "editor.preset_reset_all": "Réinitialiser tous les paramètres",
  "editor.region_id": "ID de région",
  "editor.select_all_allergens": "Sélectionner tous les allergènes",
  "editor.select_all_pollen": "Sélectionner le pollen",
  "editor.select_all_pollution": "Sélectionner qualité de l'air",
  "editor.show_empty_days": "Afficher les jours vides",
  "editor.show_text_allergen": "Afficher le texte, allergène",
  "editor.show_value_numeric": "Afficher la valeur, numérique",
  "editor.show_value_numeric_in_circle": "Afficher la valeur numérique dans les cercles",
  "editor.show_value_text": "Afficher la valeur, texte",
  "editor.show_version": "Affiche la version dans la console",
  "editor.sort": "Ordre de tri",
  "editor.sort_category_allergens_first": "Trier les allergènes de catégorie en haut",
  "editor.sort_name_ascending": "nom, ascendant",
  "editor.sort_name_descending": "nom, descendant",
  "editor.sort_none": "aucun (ordre de configuration)",
  "editor.sort_pollution_block": "Grouper la pollution séparément",
  "editor.show_block_separator": "Afficher un séparateur entre les blocs",
  "editor.sort_value_ascending": "valeur, ascendante",
  "editor.sort_value_descending": "valeur, descendante",
  "editor.summary_advanced": "Avancé",
  "editor.summary_allergens": "Allergènes",
  "editor.summary_appearance_and_layout": "Apparence et mise en page",
  "editor.summary_card_interactivity": "Interactivité de la carte",
  "editor.summary_card_layout_and_colors": "Mise en page et couleurs de la carte",
  "editor.summary_data_view_settings": "Paramètres d'affichage des données",
  "editor.summary_day_view_settings": "Paramètres d'affichage journalier",
  "editor.summary_entity_prefix_suffix": "Préfixe et suffixe personnalisés",
  "editor.summary_functional_settings": "Paramètres fonctionnels",
  "editor.summary_integration_and_place": "Intégration et emplacement",
  "editor.summary_minimal": "Minimal",
  "editor.summary_title_and_header": "Titre et en-tête",
  "editor.summary_translation_and_strings": "Traduction et chaînes",
  "editor.tap_action": "Action tactile",
  "editor.tap_action_enable": "Activer l'action tactile",
  "editor.text_size_ratio": "Ratio de taille du texte (%)",
  "editor.title": "Titre de la carte",
  "editor.title_automatic": "Titre automatique",
  "editor.title_hide": "Masquer le titre",
  "editor.title_placeholder": "(automatique)",
  "editor.to_show_columns": "Colonnes à afficher",
  "editor.to_show_days": "Jours à afficher",
  "editor.to_show_hours": "Heures à afficher"
}, fc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pc
}, Symbol.toStringTag, { value: "Module" })), mc = {
  "card.allergen.alder": "Ontano",
  "card.allergen.allergy_risk": "Rischio allergia",
  "card.allergen.ash": "Frassino",
  "card.allergen.beech": "Faggio",
  "card.allergen.birch": "Betulla",
  "card.allergen.chenopod": "Chenopodio",
  "card.allergen.cypress": "Cipresso",
  "card.allergen.elm": "Olmo",
  "card.allergen.goosefoot": "Chenopodio",
  "card.allergen.grass": "Graminacee",
  "card.allergen.grass_cat": "Graminacee",
  "card.allergen.hazel": "Nocciolo",
  "card.allergen.index": "Indice",
  "card.allergen.lime": "Tiglio",
  "card.allergen.maple": "Acero",
  "card.allergen.mold_spores": "Spore di muffa",
  "card.allergen.mugwort": "Artemisia",
  "card.allergen.nettle": "Ortica",
  "card.allergen.nettle_and_pellitory": "Ortica e parietaria",
  "card.allergen.no2": "Biossido di azoto",
  "card.allergen.oak": "Quercia",
  "card.allergen.olive": "Olivo",
  "card.allergen.ozone": "Ozono",
  "card.allergen.pine": "Pino",
  "card.allergen.plane": "Platano",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.plantain": "Piantaggine",
  "card.allergen.poaceae": "Graminacee",
  "card.allergen.poplar": "Pioppo",
  "card.allergen.qualite_globale": "Qualità dell'aria",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Segale",
  "card.allergen.so2": "Biossido di zolfo",
  "card.allergen.sorrel": "Romice",
  "card.allergen.trees": "Alberi",
  "card.allergen.trees_cat": "Alberi",
  "card.allergen.weeds": "Erbacce",
  "card.allergen.weeds_cat": "Erbacce",
  "card.allergen.willow": "Salice",
  "card.days.0": "Oggi",
  "card.days.1": "Domani",
  "card.days.2": "Dopodomani",
  "card.error": "Nessun sensore di polline trovato. Hai installato l'integrazione corretta e selezionato una regione nella configurazione della scheda?",
  "card.error_filtered_sensors": "Nessun sensore corrisponde ai tuoi filtri. Controlla allergeni selezionati e soglia.",
  "card.error_location_not_found": "Posizione non trovata. Controlla il nome della posizione nella configurazione della scheda.",
  "card.error_entity_unavailable": "L'entità meteo non è disponibile. L'integrazione potrebbe essere offline o in fase di riavvio.",
  "card.error_no_sensors": "Nessun sensore di polline trovato. Hai installato l'integrazione corretta e selezionato una regione nella configurazione della scheda?",
  "card.header_prefix": "Previsione pollini per",
  "card.header_no_location": "Previsione pollini",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Nessuna integrazione pollini trovata",
  "card.levels.0": "Nessun polline",
  "card.levels.1": "Livelli bassi",
  "card.levels.2": "Livelli basso–moderati",
  "card.levels.3": "Livelli moderati",
  "card.levels.4": "Livelli moderato–alti",
  "card.levels.5": "Livelli alti",
  "card.levels.6": "Livelli molto alti",
  "card.index.very_low": "Livelli molto bassi",
  "card.loading_forecast": "Caricamento previsione...",
  "card.location.plu": "Lussemburgo",
  "card.no_allergens": "Nessun allergene",
  "card.no_information": "(Nessuna informazione)",
  "card.atmo.unavailable": "Non disponibile",
  "card.atmo.event": "Evento",
  "card.stale_allergen": "Nessun dato",
  "card.stale_data": "Dati sui pollini temporaneamente non disponibili",
  "card.stale_data_subtitle": "Il fornitore non restituisce attualmente dati per questa regione",
  "editor.allergen_color_custom": "Colori personalizzati",
  "editor.allergen_color_default_colors": "Colori predefiniti",
  "editor.allergen_color_mode": "Modalità colore allergeni",
  "editor.allergen_colors": "Colori degli allergeni (per livello)",
  "editor.allergen_colors_header": "Aspetto degli allergeni",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Ripristina predefiniti",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Sincronizza lo spazio con lo spessore della linea dell'allergene",
  "editor.allergen_outline_color": "Colore contorno",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Ripristina contorno",
  "editor.allergen_stroke_color_synced": "Sincronizza il colore del tratto con il livello",
  "editor.allergen_stroke_width": "Spessore linea",
  "editor.allergen_stroke_width_reset": "Ripristina spessore linea",
  "editor.allergens": "Allergeni",
  "editor.allergens_abbreviated": "Abbrevia allergeni",
  "editor.allergens_header_category": "Categoria allergeni (generale)",
  "editor.allergens_header_pollen": "Polline",
  "editor.allergens_header_pollution": "Qualità dell'aria",
  "editor.allergens_header_specific": "Allergeni individuali (specifici)",
  "editor.allergens_header_summary": "Riepilogo",
  "editor.allergy_risk_top": "Rischio allergia in cima all'elenco",
  "editor.background_color": "Colore di sfondo",
  "editor.background_color_picker": "Scegli colore",
  "editor.background_color_placeholder": "es. #ffeecc o var(--my-color)",
  "editor.card_version": "Versione della scheda previsione pollini",
  "editor.city": "Città",
  "editor.days_abbreviated": "Abbrevia giorni della settimana",
  "editor.days_boldfaced": "Grassetto giorni della settimana",
  "editor.days_relative": "Giorni relativi (oggi/domani)",
  "editor.days_uppercase": "Maiuscolo giorni della settimana",
  "editor.debug": "Debug",
  "editor.entity_prefix": "Prefisso entità",
  "editor.entity_prefix_placeholder": "es. pollen_",
  "editor.entity_suffix": "Suffisso entità",
  "editor.entity_suffix_placeholder": "es. _home",
  "editor.icon_color_custom": "Colore personalizzato",
  "editor.icon_color_inherit": "Eredita dal grafico",
  "editor.icon_color_mode": "Modalità colore icona",
  "editor.icon_color_picker": "Scegli colore icona",
  "editor.icon_size": "Dimensione icona (px)",
  "editor.index_top": "Indice in cima all'elenco",
  "editor.integration": "Integrazione",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Colori dei segmenti",
  "editor.levels_colors_placeholder": "es. #ffeecc o var(--my-color)",
  "editor.levels_custom": "Usa colori di livello personalizzati",
  "editor.levels_empty_color": "Colore del segmento vuoto",
  "editor.levels_gap": "Separazione (px)",
  "editor.levels_gap_color": "Colore della separazione",
  "editor.levels_gap_inherited": "Spazio (ereditato dall'allergene)",
  "editor.levels_header": "Aspetto dei cerchi di livello",
  "editor.levels_icon_ratio": "Rapporto icone livelli",
  "editor.levels_inherit_allergen": "Eredita dai colori allergeni",
  "editor.levels_inherit_header": "Ereditarietà dei cerchi di livello",
  "editor.levels_inherit_mode": "Modalità colore cerchi di livello",
  "editor.levels_reset": "Ripristina predefiniti",
  "editor.levels_text_color": "Colore testo (cerchio interno)",
  "editor.levels_text_size": "Dimensione testo (cerchio interno, % del normale)",
  "editor.levels_text_weight": "Peso testo (cerchio interno)",
  "editor.levels_thickness": "Spessore (%)",
  "editor.link_to_sensors": "Collega allergeni ai sensori",
  "editor.locale": "Lingua",
  "editor.location": "Località",
  "editor.location_autodetect": "Rilevamento automatico",
  "editor.location_manual": "Manuale",
  "editor.minimal": "Modalità minimale",
  "editor.minimal_gap": "Distanza tra gli allergeni (px)",
  "editor.mode": "Modalità",
  "editor.mode_daily": "Giornaliero",
  "editor.mode_hourly": "Ogni ora",
  "editor.mode_hourly_eighth": "Ogni 8 ore",
  "editor.mode_hourly_fourth": "Ogni 4 ore",
  "editor.mode_hourly_second": "Ogni 2 ore",
  "editor.mode_hourly_sixth": "Ogni 6 ore",
  "editor.mode_hourly_third": "Ogni 3 ore",
  "editor.mode_twice_daily": "Due volte al giorno",
  "editor.no_allergens_color": "Nessun allergene",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Ripristina colore senza allergeni",
  "editor.no_information": "Nessuna informazione",
  "editor.numeric_state_raw_risk": "Mostra valore grezzo (rischio allergia)",
  "editor.peu_nondaily_expl": "Solo 'allergen_risk' è disponibile nelle modalità non giornaliere.",
  "editor.phrases": "Frasi",
  "editor.phrases_apply": "Applica",
  "editor.phrases_days": "Giorni relativi",
  "editor.phrases_days.0": "Oggi",
  "editor.phrases_days.1": "Domani",
  "editor.phrases_days.2": "Dopodomani",
  "editor.phrases_full": "Allergeni",
  "editor.phrases_full.alder": "Ontano",
  "editor.phrases_full.allergy_risk": "Rischio allergia",
  "editor.phrases_full.ash": "Frassino",
  "editor.phrases_full.beech": "Faggio",
  "editor.phrases_full.birch": "Betulla",
  "editor.phrases_full.chenopod": "Chenopodio",
  "editor.phrases_full.cypress": "Cipresso",
  "editor.phrases_full.elm": "Olmo",
  "editor.phrases_full.goosefoot": "Chenopodio",
  "editor.phrases_full.grass": "Graminacee",
  "editor.phrases_full.grass_cat": "Graminacee",
  "editor.phrases_full.hazel": "Nocciolo",
  "editor.phrases_full.index": "Indice",
  "editor.phrases_full.lime": "Tiglio",
  "editor.phrases_full.maple": "Acero",
  "editor.phrases_full.mold_spores": "Spore di muffa",
  "editor.phrases_full.mugwort": "Artemisia",
  "editor.phrases_full.nettle": "Ortica",
  "editor.phrases_full.nettle_and_pellitory": "Ortica e parietaria",
  "editor.phrases_full.no2": "Biossido di azoto",
  "editor.phrases_full.oak": "Quercia",
  "editor.phrases_full.olive": "Olivo",
  "editor.phrases_full.ozone": "Ozono",
  "editor.phrases_full.pine": "Pino",
  "editor.phrases_full.plane": "Platano",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.plantain": "Piantaggine",
  "editor.phrases_full.poaceae": "Graminacee",
  "editor.phrases_full.poplar": "Pioppo",
  "editor.phrases_full.qualite_globale": "Qualità dell'aria",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Segale",
  "editor.phrases_full.so2": "Biossido di zolfo",
  "editor.phrases_full.sorrel": "Romice",
  "editor.phrases_full.trees": "Alberi",
  "editor.phrases_full.trees_cat": "Alberi",
  "editor.phrases_full.weeds": "Erbacce",
  "editor.phrases_full.weeds_cat": "Erbacce",
  "editor.phrases_full.willow": "Salice",
  "editor.phrases_levels": "Livelli allergenici",
  "editor.phrases_levels.0": "Nessun polline",
  "editor.phrases_levels.1": "Livelli bassi",
  "editor.phrases_levels.2": "Livelli basso–moderati",
  "editor.phrases_levels.3": "Livelli moderati",
  "editor.phrases_levels.4": "Livelli moderato–alti",
  "editor.phrases_levels.5": "Livelli alti",
  "editor.phrases_levels.6": "Livelli molto alti",
  "editor.phrases_short": "Allergeni, corto",
  "editor.phrases_short.alder": "Ont.",
  "editor.phrases_short.allergy_risk": "Rischio",
  "editor.phrases_short.ash": "Fras.",
  "editor.phrases_short.beech": "Fagg.",
  "editor.phrases_short.birch": "Betul.",
  "editor.phrases_short.chenopod": "Chenop",
  "editor.phrases_short.cypress": "Cipr.",
  "editor.phrases_short.elm": "Olmo",
  "editor.phrases_short.goosefoot": "Chen",
  "editor.phrases_short.grass": "Gram.",
  "editor.phrases_short.grass_cat": "Gram.",
  "editor.phrases_short.grasses": "Graminacee",
  "editor.phrases_short.hazel": "Nocc.",
  "editor.phrases_short.index": "Indice",
  "editor.phrases_short.lime": "Tigl.",
  "editor.phrases_short.maple": "Acero",
  "editor.phrases_short.mold_spores": "Muffa",
  "editor.phrases_short.mugwort": "Art.",
  "editor.phrases_short.nettle": "Ortic",
  "editor.phrases_short.nettle_and_pellitory": "Ortica",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Quer.",
  "editor.phrases_short.olive": "Olivo",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Pino",
  "editor.phrases_short.plane": "Plat.",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.plantain": "Piant",
  "editor.phrases_short.poaceae": "Gramin",
  "editor.phrases_short.poplar": "Pioppo",
  "editor.phrases_short.qualite_globale": "IQA",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Segale",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Rom",
  "editor.phrases_short.trees": "Alberi",
  "editor.phrases_short.trees_cat": "Alberi",
  "editor.phrases_short.weeds": "Erbacce",
  "editor.phrases_short.weeds_cat": "Erbacce",
  "editor.phrases_short.willow": "Salice",
  "editor.phrases_translate_all": "Traduci tutto",
  "editor.pollen_threshold": "Soglia:",
  "editor.pollution_block_bottom": "In basso (sotto il polline)",
  "editor.pollution_block_position": "Posizione inquinamento",
  "editor.pollution_block_top": "In alto (sopra il polline)",
  "editor.preset_reset_all": "Ripristina tutte le impostazioni",
  "editor.region_id": "ID Regione",
  "editor.select_all_allergens": "Seleziona tutti gli allergeni",
  "editor.select_all_pollen": "Seleziona polline",
  "editor.select_all_pollution": "Seleziona qualità dell'aria",
  "editor.show_empty_days": "Mostra giorni vuoti",
  "editor.show_text_allergen": "Mostra testo, allergene",
  "editor.show_value_numeric": "Mostra valore numerico",
  "editor.show_value_numeric_in_circle": "Mostra valore numerico nei cerchi",
  "editor.show_value_text": "Mostra valore come testo",
  "editor.show_version": "Registra la versione nella console",
  "editor.sort": "Ordine",
  "editor.sort_category_allergens_first": "Ordina gli allergeni di categoria in alto",
  "editor.sort_name_ascending": "nome, crescente",
  "editor.sort_name_descending": "nome, decrescente",
  "editor.sort_none": "nessuno (ordine configurazione)",
  "editor.sort_pollution_block": "Raggruppa inquinamento separatamente",
  "editor.show_block_separator": "Mostra separatore tra i blocchi",
  "editor.sort_value_ascending": "valore, crescente",
  "editor.sort_value_descending": "valore, decrescente",
  "editor.summary_advanced": "Avanzate",
  "editor.summary_allergens": "Allergeni",
  "editor.summary_appearance_and_layout": "Aspetto e layout",
  "editor.summary_card_interactivity": "Interattività della scheda",
  "editor.summary_card_layout_and_colors": "Layout e colori della scheda",
  "editor.summary_data_view_settings": "Impostazioni visualizzazione dati",
  "editor.summary_day_view_settings": "Impostazioni visualizzazione giorno",
  "editor.summary_entity_prefix_suffix": "Prefisso e suffisso personalizzati",
  "editor.summary_functional_settings": "Impostazioni funzionali",
  "editor.summary_integration_and_place": "Integrazione e luogo",
  "editor.summary_minimal": "Minimale",
  "editor.summary_title_and_header": "Titolo e intestazione",
  "editor.summary_translation_and_strings": "Traduzione e stringhe",
  "editor.tap_action": "Azione al tocco",
  "editor.tap_action_enable": "Abilita azione al tocco",
  "editor.text_size_ratio": "Proporzione dimensione testo (%)",
  "editor.title": "Titolo della scheda",
  "editor.title_automatic": "Titolo automatico",
  "editor.title_hide": "Nascondi titolo",
  "editor.title_placeholder": "(automatico)",
  "editor.to_show_columns": "Colonne da mostrare",
  "editor.to_show_days": "Giorni da mostrare",
  "editor.to_show_hours": "Ore da mostrare"
}, yc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mc
}, Symbol.toStringTag, { value: "Module" })), vc = {
  "card.allergen.alder": "Els",
  "card.allergen.allergy_risk": "Allergierisico",
  "card.allergen.ash": "Es",
  "card.allergen.beech": "Beuk",
  "card.allergen.birch": "Berk",
  "card.allergen.chenopod": "Melde",
  "card.allergen.cypress": "Cipres",
  "card.allergen.elm": "Iep",
  "card.allergen.goosefoot": "Melganzenvoet",
  "card.allergen.grass": "Gras",
  "card.allergen.grass_cat": "Grassen",
  "card.allergen.hazel": "Hazelaar",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Linde",
  "card.allergen.maple": "Esdoorn",
  "card.allergen.mold_spores": "Schimmelsporen",
  "card.allergen.mugwort": "Bijvoet",
  "card.allergen.nettle": "Brandnetel",
  "card.allergen.nettle_and_pellitory": "Brandnetel en muur",
  "card.allergen.no2": "Stikstofdioxide",
  "card.allergen.oak": "Eik",
  "card.allergen.olive": "Olijf",
  "card.allergen.ozone": "Ozon",
  "card.allergen.pine": "Dennen",
  "card.allergen.plane": "Plataan",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.plantain": "Weegbree",
  "card.allergen.poaceae": "Grassen",
  "card.allergen.poplar": "Populier",
  "card.allergen.qualite_globale": "Luchtkwaliteit",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Rogge",
  "card.allergen.so2": "Zwaveldioxide",
  "card.allergen.sorrel": "Zuring",
  "card.allergen.trees": "Bomen",
  "card.allergen.trees_cat": "Bomen",
  "card.allergen.weeds": "Onkruid",
  "card.allergen.weeds_cat": "Onkruiden",
  "card.allergen.willow": "Wilg",
  "card.days.0": "Vandaag",
  "card.days.1": "Morgen",
  "card.days.2": "Overmorgen",
  "card.error": "Geen pollensensoren gevonden. Heb je de juiste integratie geïnstalleerd en een regio gekozen in de kaartinstellingen?",
  "card.error_filtered_sensors": "Geen sensoren voldoen aan je filters. Controleer de geselecteerde allergenen en drempelwaarde.",
  "card.error_location_not_found": "Locatie niet gevonden. Controleer de locatienaam in de kaartconfiguratie.",
  "card.error_entity_unavailable": "Weerentiteit is niet beschikbaar. De integratie is mogelijk offline of wordt opnieuw gestart.",
  "card.error_no_sensors": "Geen pollensensoren gevonden. Heb je de juiste integratie geïnstalleerd en een regio gekozen in de kaartinstellingen?",
  "card.header_prefix": "Pollenverwachting voor",
  "card.header_no_location": "Pollenverwachting",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Geen pollen-integratie gevonden",
  "card.levels.0": "Geen pollen",
  "card.levels.1": "Lage niveaus",
  "card.levels.2": "Laag–matig niveau",
  "card.levels.3": "Matig niveau",
  "card.levels.4": "Matig–hoog niveau",
  "card.levels.5": "Hoge niveaus",
  "card.levels.6": "Zeer hoge niveaus",
  "card.index.very_low": "Zeer lage niveaus",
  "card.loading_forecast": "Voorspelling wordt geladen...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Geen allergenen",
  "card.no_information": "(Geen informatie)",
  "card.atmo.unavailable": "Niet beschikbaar",
  "card.atmo.event": "Gebeurtenis",
  "card.stale_allergen": "Geen gegevens",
  "card.stale_data": "Pollen­gegevens tijdelijk niet beschikbaar",
  "card.stale_data_subtitle": "De aanbieder levert momenteel geen gegevens voor deze regio",
  "editor.allergen_color_custom": "Aangepaste kleuren",
  "editor.allergen_color_default_colors": "Standaardkleuren",
  "editor.allergen_color_mode": "Kleurmodus allergenen",
  "editor.allergen_colors": "Allergeenkleuren (per niveau)",
  "editor.allergen_colors_header": "Uiterlijk van allergenen",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Reset naar standaard",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synchroniseer afstand met lijndikte van allergeen",
  "editor.allergen_outline_color": "Contourkleur",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Contour resetten",
  "editor.allergen_stroke_color_synced": "Synchroniseer lijndikte kleur met niveau",
  "editor.allergen_stroke_width": "Lijndikte",
  "editor.allergen_stroke_width_reset": "Lijndikte resetten",
  "editor.allergens": "Allergenen",
  "editor.allergens_abbreviated": "Allergenen afkorten",
  "editor.allergens_header_category": "Categorie allergenen (algemeen)",
  "editor.allergens_header_pollen": "Pollen",
  "editor.allergens_header_pollution": "Luchtkwaliteit",
  "editor.allergens_header_specific": "Individuele allergenen (specifiek)",
  "editor.allergens_header_summary": "Samenvatting",
  "editor.allergy_risk_top": "Allergierisico bovenaan de lijst",
  "editor.background_color": "Achtergrondkleur",
  "editor.background_color_picker": "Kies kleur",
  "editor.background_color_placeholder": "bijv. #ffeecc of var(--my-color)",
  "editor.card_version": "Versie van de pollenvoorspellingskaart",
  "editor.city": "Stad",
  "editor.days_abbreviated": "Weekdagen afkorten",
  "editor.days_boldfaced": "Weekdagen vetgedrukt",
  "editor.days_relative": "Relatieve dagen (vandaag/morgen)",
  "editor.days_uppercase": "Hoofdletters voor weekdagen",
  "editor.debug": "Debug",
  "editor.entity_prefix": "Entiteit voorvoegsel",
  "editor.entity_prefix_placeholder": "bijv. pollen_",
  "editor.entity_suffix": "Entiteit achtervoegsel",
  "editor.entity_suffix_placeholder": "bijv. _home",
  "editor.icon_color_custom": "Aangepaste kleur",
  "editor.icon_color_inherit": "Overnemen van diagram",
  "editor.icon_color_mode": "Pictogramkleurmodus",
  "editor.icon_color_picker": "Kies pictogramkleur",
  "editor.icon_size": "Pictogramgrootte (px)",
  "editor.index_top": "Index bovenaan de lijst",
  "editor.integration": "Integratie",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Segmentkleuren",
  "editor.levels_colors_placeholder": "bijv. #ffeecc of var(--my-color)",
  "editor.levels_custom": "Gebruik aangepaste niveaukleur",
  "editor.levels_empty_color": "Kleur leeg segment",
  "editor.levels_gap": "Tussenruimte (px)",
  "editor.levels_gap_color": "Kleur tussenruimte",
  "editor.levels_gap_inherited": "Afstand (geërfd van allergeen)",
  "editor.levels_header": "Uiterlijk van niveauringen",
  "editor.levels_icon_ratio": "Niveaus pictogramverhouding",
  "editor.levels_inherit_allergen": "Overnemen van allergenenkleuren",
  "editor.levels_inherit_header": "Overerving van niveauringen",
  "editor.levels_inherit_mode": "Kleurmodus niveauringen",
  "editor.levels_reset": "Herstel standaardinstellingen",
  "editor.levels_text_color": "Tekstkleur (binnenste cirkel)",
  "editor.levels_text_size": "Tekstgrootte (binnenste cirkel, % van normaal)",
  "editor.levels_text_weight": "Tekstdikte (binnenste cirkel)",
  "editor.levels_thickness": "Dikte (%)",
  "editor.link_to_sensors": "Koppel allergenen aan sensoren",
  "editor.locale": "Taal",
  "editor.location": "Locatie",
  "editor.location_autodetect": "Automatisch detecteren",
  "editor.location_manual": "Handmatig",
  "editor.minimal": "Minimale modus",
  "editor.minimal_gap": "Afstand tussen allergenen (px)",
  "editor.mode": "Modus",
  "editor.mode_daily": "Dagelijks",
  "editor.mode_hourly": "Elk uur",
  "editor.mode_hourly_eighth": "Elk 8 uur",
  "editor.mode_hourly_fourth": "Elk 4 uur",
  "editor.mode_hourly_second": "Elk 2 uur",
  "editor.mode_hourly_sixth": "Elk 6 uur",
  "editor.mode_hourly_third": "Elk 3 uur",
  "editor.mode_twice_daily": "Twee keer per dag",
  "editor.no_allergens_color": "Geen allergenen",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Reset kleur zonder allergenen",
  "editor.no_information": "Geen informatie",
  "editor.numeric_state_raw_risk": "Toon ruwe waarde (allergierisico)",
  "editor.peu_nondaily_expl": "Alleen 'allergen_risk' is beschikbaar in niet-dagelijkse modi.",
  "editor.phrases": "Zinnen",
  "editor.phrases_apply": "Toepassen",
  "editor.phrases_days": "Relatieve dagen",
  "editor.phrases_days.0": "Vandaag",
  "editor.phrases_days.1": "Morgen",
  "editor.phrases_days.2": "Overmorgen",
  "editor.phrases_full": "Allergenen",
  "editor.phrases_full.alder": "Els",
  "editor.phrases_full.allergy_risk": "Allergierisico",
  "editor.phrases_full.ash": "Es",
  "editor.phrases_full.beech": "Beuk",
  "editor.phrases_full.birch": "Berk",
  "editor.phrases_full.chenopod": "Melde",
  "editor.phrases_full.cypress": "Cipres",
  "editor.phrases_full.elm": "Iep",
  "editor.phrases_full.goosefoot": "Melganzenvoet",
  "editor.phrases_full.grass": "Gras",
  "editor.phrases_full.grass_cat": "Grassen",
  "editor.phrases_full.hazel": "Hazelaar",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Linde",
  "editor.phrases_full.maple": "Esdoorn",
  "editor.phrases_full.mold_spores": "Schimmelsporen",
  "editor.phrases_full.mugwort": "Bijvoet",
  "editor.phrases_full.nettle": "Brandnetel",
  "editor.phrases_full.nettle_and_pellitory": "Brandnetel en muur",
  "editor.phrases_full.no2": "Stikstofdioxide",
  "editor.phrases_full.oak": "Eik",
  "editor.phrases_full.olive": "Olijf",
  "editor.phrases_full.ozone": "Ozon",
  "editor.phrases_full.pine": "Den",
  "editor.phrases_full.plane": "Plataan",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.plantain": "Weegbree",
  "editor.phrases_full.poaceae": "Grassen",
  "editor.phrases_full.poplar": "Populier",
  "editor.phrases_full.qualite_globale": "Luchtkwaliteit",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Rogge",
  "editor.phrases_full.so2": "Zwaveldioxide",
  "editor.phrases_full.sorrel": "Zuring",
  "editor.phrases_full.trees": "Bomen",
  "editor.phrases_full.trees_cat": "Bomen",
  "editor.phrases_full.weeds": "Onkruid",
  "editor.phrases_full.weeds_cat": "Onkruiden",
  "editor.phrases_full.willow": "Wilg",
  "editor.phrases_levels": "Allergeenniveaus",
  "editor.phrases_levels.0": "Geen pollen",
  "editor.phrases_levels.1": "Lage niveaus",
  "editor.phrases_levels.2": "Laag–matig niveau",
  "editor.phrases_levels.3": "Matig niveau",
  "editor.phrases_levels.4": "Matig–hoog niveau",
  "editor.phrases_levels.5": "Hoge niveaus",
  "editor.phrases_levels.6": "Zeer hoge niveaus",
  "editor.phrases_short": "Allergenen, kort",
  "editor.phrases_short.alder": "Els",
  "editor.phrases_short.allergy_risk": "Risico",
  "editor.phrases_short.ash": "Es",
  "editor.phrases_short.beech": "Beuk",
  "editor.phrases_short.birch": "Berk",
  "editor.phrases_short.chenopod": "Melde",
  "editor.phrases_short.cypress": "Cipr.",
  "editor.phrases_short.elm": "Iep",
  "editor.phrases_short.goosefoot": "Melg",
  "editor.phrases_short.grass": "Gras",
  "editor.phrases_short.grass_cat": "Gras",
  "editor.phrases_short.grasses": "Grassen",
  "editor.phrases_short.hazel": "Hazel",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Linde",
  "editor.phrases_short.maple": "Esd.",
  "editor.phrases_short.mold_spores": "Schimmel",
  "editor.phrases_short.mugwort": "Bijvoet",
  "editor.phrases_short.nettle": "Brandn",
  "editor.phrases_short.nettle_and_pellitory": "Netel",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Eik",
  "editor.phrases_short.olive": "Olijf",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Dennen",
  "editor.phrases_short.plane": "Plataan",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.plantain": "Weeg",
  "editor.phrases_short.poaceae": "Gras",
  "editor.phrases_short.poplar": "Popul",
  "editor.phrases_short.qualite_globale": "LKI",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Rogge",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Zur",
  "editor.phrases_short.trees": "Bomen",
  "editor.phrases_short.trees_cat": "Bomen",
  "editor.phrases_short.weeds": "Onkruid",
  "editor.phrases_short.weeds_cat": "Onkruid",
  "editor.phrases_short.willow": "Wilg",
  "editor.phrases_translate_all": "Alles vertalen",
  "editor.pollen_threshold": "Drempel:",
  "editor.pollution_block_bottom": "Onderaan (onder pollen)",
  "editor.pollution_block_position": "Positie luchtkwaliteit",
  "editor.pollution_block_top": "Bovenaan (boven pollen)",
  "editor.preset_reset_all": "Alle instellingen resetten",
  "editor.region_id": "Regio-ID",
  "editor.select_all_allergens": "Selecteer alle allergenen",
  "editor.select_all_pollen": "Pollen selecteren",
  "editor.select_all_pollution": "Luchtkwaliteit selecteren",
  "editor.show_empty_days": "Toon lege dagen",
  "editor.show_text_allergen": "Toon tekst, allergeen",
  "editor.show_value_numeric": "Toon numerieke waarde",
  "editor.show_value_numeric_in_circle": "Toon numerieke waarde in de cirkels",
  "editor.show_value_text": "Toon waarde als tekst",
  "editor.show_version": "Log versie naar de console",
  "editor.sort": "Sorteervolgorde",
  "editor.sort_category_allergens_first": "Categorie-allergenen bovenaan sorteren",
  "editor.sort_name_ascending": "naam, oplopend",
  "editor.sort_name_descending": "naam, aflopend",
  "editor.sort_none": "geen (configuratievolgorde)",
  "editor.sort_pollution_block": "Luchtkwaliteit apart groeperen",
  "editor.show_block_separator": "Scheidingslijn tussen blokken tonen",
  "editor.sort_value_ascending": "waarde, oplopend",
  "editor.sort_value_descending": "waarde, aflopend",
  "editor.summary_advanced": "Geavanceerd",
  "editor.summary_allergens": "Allergenen",
  "editor.summary_appearance_and_layout": "Uiterlijk en indeling",
  "editor.summary_card_interactivity": "Kaartinteractiviteit",
  "editor.summary_card_layout_and_colors": "Kaartindeling en kleuren",
  "editor.summary_data_view_settings": "Gegevensweergave-instellingen",
  "editor.summary_day_view_settings": "Dagweergave-instellingen",
  "editor.summary_entity_prefix_suffix": "Aangepast voor- en achtervoegsel",
  "editor.summary_functional_settings": "Functionele instellingen",
  "editor.summary_integration_and_place": "Integratie en locatie",
  "editor.summary_minimal": "Minimaal",
  "editor.summary_title_and_header": "Titel en koptekst",
  "editor.summary_translation_and_strings": "Vertaling en tekstreeksen",
  "editor.tap_action": "Tikactie",
  "editor.tap_action_enable": "Tikactie inschakelen",
  "editor.text_size_ratio": "Tekstgrootteverhouding (%)",
  "editor.title": "Kaarttitel",
  "editor.title_automatic": "Automatische titel",
  "editor.title_hide": "Verberg titel",
  "editor.title_placeholder": "(automatisch)",
  "editor.to_show_columns": "Aantal kolommen om te tonen",
  "editor.to_show_days": "Aantal dagen om te tonen",
  "editor.to_show_hours": "Aantal uren om te tonen"
}, bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vc
}, Symbol.toStringTag, { value: "Module" })), xc = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisiko",
  "card.allergen.ash": "Ask",
  "card.allergen.beech": "Bøk",
  "card.allergen.birch": "Bjørk",
  "card.allergen.chenopod": "Melde",
  "card.allergen.cypress": "Sypress",
  "card.allergen.elm": "Alm",
  "card.allergen.goosefoot": "Melde",
  "card.allergen.grass": "Gress",
  "card.allergen.grass_cat": "Gressarter",
  "card.allergen.hazel": "Hassel",
  "card.allergen.index": "Indeks",
  "card.allergen.lime": "Lind",
  "card.allergen.maple": "Lønn",
  "card.allergen.mold_spores": "Muggsporer",
  "card.allergen.mugwort": "Malurt",
  "card.allergen.nettle": "Brennesle",
  "card.allergen.nettle_and_pellitory": "Brennesle og murgrønn",
  "card.allergen.no2": "Nitrogendioksid",
  "card.allergen.oak": "Eik",
  "card.allergen.olive": "Oliven",
  "card.allergen.ozone": "Ozon",
  "card.allergen.pine": "Furu",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Groblad",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Gress",
  "card.allergen.poplar": "Poppel",
  "card.allergen.qualite_globale": "Luftkvalitet",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Rug",
  "card.allergen.so2": "Svoveldioksid",
  "card.allergen.sorrel": "Syre",
  "card.allergen.trees": "Trær",
  "card.allergen.trees_cat": "Trær",
  "card.allergen.weeds": "Ugress",
  "card.allergen.weeds_cat": "Ugress",
  "card.allergen.willow": "Selje",
  "card.days.0": "I dag",
  "card.days.1": "I morgen",
  "card.days.2": "Overimorgen",
  "card.error": "Ingen pollensensor funnet. Har du installert riktig integrasjon og valgt region i kortoppsettet?",
  "card.error_filtered_sensors": "Ingen sensorer samsvarer med filteret. Sjekk utvalg av allergener og terskelverdi.",
  "card.error_location_not_found": "Plassering ikke funnet. Sjekk plasseringen i kortkonfigurasjonen.",
  "card.error_entity_unavailable": "Værentiteten er utilgjengelig. Integrasjonen kan være frakoblet eller starter på nytt.",
  "card.error_no_sensors": "Ingen pollensensor funnet. Har du installert riktig integrasjon og valgt region i kortoppsettet?",
  "card.header_prefix": "Pollenvarsel for",
  "card.header_no_location": "Pollenvarsel",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Ingen pollensensor-integrasjon funnet",
  "card.levels.0": "Ingen pollen",
  "card.levels.1": "Lave nivåer",
  "card.levels.2": "Lav–moderat",
  "card.levels.3": "Moderat nivå",
  "card.levels.4": "Moderat–høyt",
  "card.levels.5": "Høye nivåer",
  "card.levels.6": "Svært høye nivåer",
  "card.index.very_low": "Svært lave nivåer",
  "card.loading_forecast": "Laster prognose...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Ingen allergener",
  "card.no_information": "(Ingen informasjon)",
  "card.atmo.unavailable": "Ikke tilgjengelig",
  "card.atmo.event": "Hendelse",
  "card.stale_allergen": "Ingen data",
  "card.stale_data": "Pollendata er midlertidig utilgjengelige",
  "card.stale_data_subtitle": "Leverandøren returnerer for øyeblikket ingen data for denne regionen",
  "editor.allergen_color_custom": "Egendefinerte farger",
  "editor.allergen_color_default_colors": "Standardfarger",
  "editor.allergen_color_mode": "Allergen fargemodus",
  "editor.allergen_colors": "Allergenfarger (per nivå)",
  "editor.allergen_colors_header": "Allergen utseende",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Tilbakestill til standard",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synkroniser mellomrom med allergenets strekbredde",
  "editor.allergen_outline_color": "Omrissfarge",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Tilbakestill omriss",
  "editor.allergen_stroke_color_synced": "Synkroniser strekfarge med nivå",
  "editor.allergen_stroke_width": "Strekbredde",
  "editor.allergen_stroke_width_reset": "Tilbakestill strekbredde",
  "editor.allergens": "Allergener",
  "editor.allergens_abbreviated": "Forkort allergener",
  "editor.allergens_header_category": "Kategori-allergener (generelt)",
  "editor.allergens_header_pollen": "Pollen",
  "editor.allergens_header_pollution": "Luftkvalitet",
  "editor.allergens_header_specific": "Individuelle allergener (spesifikke)",
  "editor.allergens_header_summary": "Oversikt",
  "editor.allergy_risk_top": "Allergirisiko øverst i listen",
  "editor.background_color": "Bakgrunnsfarge",
  "editor.background_color_picker": "Velg farge",
  "editor.background_color_placeholder": "f.eks. #ffeecc eller var(--my-color)",
  "editor.card_version": "Versjon av pollenprognosekortet",
  "editor.city": "By",
  "editor.days_abbreviated": "Forkort ukedager",
  "editor.days_boldfaced": "Uthev ukedager",
  "editor.days_relative": "Relative dager (i dag/i morgen)",
  "editor.days_uppercase": "Store bokstaver på ukedager",
  "editor.debug": "Debug",
  "editor.entity_prefix": "Entity-prefiks",
  "editor.entity_prefix_placeholder": "f.eks. pollen_",
  "editor.entity_suffix": "Entity-suffiks",
  "editor.entity_suffix_placeholder": "f.eks. _home",
  "editor.icon_color_custom": "Egendefinert farge",
  "editor.icon_color_inherit": "Arv fra diagram",
  "editor.icon_color_mode": "Ikonfargemodus",
  "editor.icon_color_picker": "Velg ikonfarge",
  "editor.icon_size": "Ikonstørrelse (px)",
  "editor.index_top": "Indeks øverst i listen",
  "editor.integration": "Integrasjon",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Segmentfarger",
  "editor.levels_colors_placeholder": "f.eks. #ffeecc eller var(--my-color)",
  "editor.levels_custom": "Bruk egendefinerte nivåfarger",
  "editor.levels_empty_color": "Farge for tomt segment",
  "editor.levels_gap": "Mellomrom (px)",
  "editor.levels_gap_color": "Mellomromsfarge",
  "editor.levels_gap_inherited": "Mellomrom (arvet fra allergen)",
  "editor.levels_header": "Nivå-sirklenes utseende",
  "editor.levels_icon_ratio": "Nivå ikonforhold",
  "editor.levels_inherit_allergen": "Arv fra allergenfarger",
  "editor.levels_inherit_header": "Arv av nivå-sirkler",
  "editor.levels_inherit_mode": "Nivåsirklers fargemodus",
  "editor.levels_reset": "Tilbakestill til standard",
  "editor.levels_text_color": "Tekstfarge (indre sirkel)",
  "editor.levels_text_size": "Tekststørrelse (indre sirkel, % av normal)",
  "editor.levels_text_weight": "Teksttykkelse (indre sirkel)",
  "editor.levels_thickness": "Tykkelse (%)",
  "editor.link_to_sensors": "Koble allergener til sensorer",
  "editor.locale": "Språk",
  "editor.location": "Sted",
  "editor.location_autodetect": "Automatisk oppdag",
  "editor.location_manual": "Manuell",
  "editor.minimal": "Minimal modus",
  "editor.minimal_gap": "Avstand mellom allergener (px)",
  "editor.mode": "Modus",
  "editor.mode_daily": "Daglig",
  "editor.mode_hourly": "Hver time",
  "editor.mode_hourly_eighth": "Hver 8. time",
  "editor.mode_hourly_fourth": "Hver 4. time",
  "editor.mode_hourly_second": "Hver 2. time",
  "editor.mode_hourly_sixth": "Hver 6. time",
  "editor.mode_hourly_third": "Hver 3. time",
  "editor.mode_twice_daily": "To ganger daglig",
  "editor.no_allergens_color": "Ingen allergener",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Tilbakestill farge uten allergener",
  "editor.no_information": "Ingen informasjon",
  "editor.numeric_state_raw_risk": "Vis rå verdi (allergirisiko)",
  "editor.peu_nondaily_expl": "Kun 'allergen_risk' er tilgjengelig i ikke-daglige moduser.",
  "editor.phrases": "Fraser",
  "editor.phrases_apply": "Bruk",
  "editor.phrases_days": "Relative dager",
  "editor.phrases_days.0": "I dag",
  "editor.phrases_days.1": "I morgen",
  "editor.phrases_days.2": "Overimorgen",
  "editor.phrases_full": "Allergener",
  "editor.phrases_full.alder": "Al",
  "editor.phrases_full.allergy_risk": "Allergirisiko",
  "editor.phrases_full.ash": "Ask",
  "editor.phrases_full.beech": "Bøk",
  "editor.phrases_full.birch": "Bjørk",
  "editor.phrases_full.chenopod": "Melde",
  "editor.phrases_full.cypress": "Sypress",
  "editor.phrases_full.elm": "Alm",
  "editor.phrases_full.goosefoot": "Melde",
  "editor.phrases_full.grass": "Gress",
  "editor.phrases_full.grass_cat": "Gressarter",
  "editor.phrases_full.hazel": "Hassel",
  "editor.phrases_full.index": "Indeks",
  "editor.phrases_full.lime": "Lind",
  "editor.phrases_full.maple": "Lønn",
  "editor.phrases_full.mold_spores": "Muggsporer",
  "editor.phrases_full.mugwort": "Malurt",
  "editor.phrases_full.nettle": "Brennesle",
  "editor.phrases_full.nettle_and_pellitory": "Brennesle og murgrønn",
  "editor.phrases_full.no2": "Nitrogendioksid",
  "editor.phrases_full.oak": "Eik",
  "editor.phrases_full.olive": "Oliven",
  "editor.phrases_full.ozone": "Ozon",
  "editor.phrases_full.pine": "Furu",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Groblad",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Gress",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.qualite_globale": "Luftkvalitet",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Rug",
  "editor.phrases_full.so2": "Svoveldioksid",
  "editor.phrases_full.sorrel": "Syre",
  "editor.phrases_full.trees": "Trær",
  "editor.phrases_full.trees_cat": "Trær",
  "editor.phrases_full.weeds": "Ugress",
  "editor.phrases_full.weeds_cat": "Ugress",
  "editor.phrases_full.willow": "Selje",
  "editor.phrases_levels": "Allergennivåer",
  "editor.phrases_levels.0": "Ingen pollen",
  "editor.phrases_levels.1": "Lave nivåer",
  "editor.phrases_levels.2": "Lav–moderat",
  "editor.phrases_levels.3": "Moderat nivå",
  "editor.phrases_levels.4": "Moderat–høyt",
  "editor.phrases_levels.5": "Høye nivåer",
  "editor.phrases_levels.6": "Svært høye nivåer",
  "editor.phrases_short": "Allergener, kort",
  "editor.phrases_short.alder": "Al",
  "editor.phrases_short.allergy_risk": "Risiko",
  "editor.phrases_short.ash": "Ask",
  "editor.phrases_short.beech": "Bøk",
  "editor.phrases_short.birch": "Bjørk",
  "editor.phrases_short.chenopod": "Melde",
  "editor.phrases_short.cypress": "Syp.",
  "editor.phrases_short.elm": "Alm",
  "editor.phrases_short.goosefoot": "Meld",
  "editor.phrases_short.grass": "Gress",
  "editor.phrases_short.grass_cat": "Gress",
  "editor.phrases_short.grasses": "Gress",
  "editor.phrases_short.hazel": "Hassel",
  "editor.phrases_short.index": "Indeks",
  "editor.phrases_short.lime": "Lind",
  "editor.phrases_short.maple": "Lønn",
  "editor.phrases_short.mold_spores": "Mugg",
  "editor.phrases_short.mugwort": "Malurt",
  "editor.phrases_short.nettle": "Brenns",
  "editor.phrases_short.nettle_and_pellitory": "Brennesle",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Eik",
  "editor.phrases_short.olive": "Oliven",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Furu",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Grob",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Gress",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.qualite_globale": "LKI",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Rug",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Syr",
  "editor.phrases_short.trees": "Trær",
  "editor.phrases_short.trees_cat": "Trær",
  "editor.phrases_short.weeds": "Ugress",
  "editor.phrases_short.weeds_cat": "Ugress",
  "editor.phrases_short.willow": "Selje",
  "editor.phrases_translate_all": "Oversett alt",
  "editor.pollen_threshold": "Terskelverdi:",
  "editor.pollution_block_bottom": "Nederst (under pollen)",
  "editor.pollution_block_position": "Posisjon for luftkvalitet",
  "editor.pollution_block_top": "Øverst (over pollen)",
  "editor.preset_reset_all": "Tilbakestill alle innstillinger",
  "editor.region_id": "Region-ID",
  "editor.select_all_allergens": "Velg alle allergener",
  "editor.select_all_pollen": "Velg pollen",
  "editor.select_all_pollution": "Velg luftkvalitet",
  "editor.show_empty_days": "Vis tomme dager",
  "editor.show_text_allergen": "Vis tekst, allergen",
  "editor.show_value_numeric": "Vis tallverdi",
  "editor.show_value_numeric_in_circle": "Vis tallverdi i sirkel",
  "editor.show_value_text": "Vis verdi som tekst",
  "editor.show_version": "Logg versjon til konsollen",
  "editor.sort": "Sortering",
  "editor.sort_category_allergens_first": "Sorter kategori-allergener øverst",
  "editor.sort_name_ascending": "navn, stigende",
  "editor.sort_name_descending": "navn, synkende",
  "editor.sort_none": "ingen (konfigurasjonsrekkefølge)",
  "editor.sort_pollution_block": "Gruppér luftkvalitet separat",
  "editor.show_block_separator": "Vis separator mellom blokker",
  "editor.sort_value_ascending": "verdi, stigende",
  "editor.sort_value_descending": "verdi, synkende",
  "editor.summary_advanced": "Avansert",
  "editor.summary_allergens": "Allergener",
  "editor.summary_appearance_and_layout": "Utseende og oppsett",
  "editor.summary_card_interactivity": "Kortinteraktivitet",
  "editor.summary_card_layout_and_colors": "Kortoppsett og farger",
  "editor.summary_data_view_settings": "Datavisningsinnstillinger",
  "editor.summary_day_view_settings": "Dagsvisningsinnstillinger",
  "editor.summary_entity_prefix_suffix": "Egendefinert prefiks og suffiks",
  "editor.summary_functional_settings": "Funksjonsinnstillinger",
  "editor.summary_integration_and_place": "Integrasjon og sted",
  "editor.summary_minimal": "Minimal",
  "editor.summary_title_and_header": "Tittel og overskrift",
  "editor.summary_translation_and_strings": "Oversettelse og strenger",
  "editor.tap_action": "Trykkhandling",
  "editor.tap_action_enable": "Aktiver trykkhandling",
  "editor.text_size_ratio": "Tekststørrelsesforhold (%)",
  "editor.title": "Korttittel",
  "editor.title_automatic": "Automatisk tittel",
  "editor.title_hide": "Skjul tittel",
  "editor.title_placeholder": "(automatisk)",
  "editor.to_show_columns": "Antall kolonner som vises",
  "editor.to_show_days": "Antall dager som vises",
  "editor.to_show_hours": "Antall timer som vises"
}, wc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xc
}, Symbol.toStringTag, { value: "Module" })), kc = {
  "card.allergen.alder": "Olcha",
  "card.allergen.allergy_risk": "Ryzyko alergii",
  "card.allergen.ash": "Jesion",
  "card.allergen.beech": "Buk",
  "card.allergen.birch": "Brzoza",
  "card.allergen.chenopod": "Chenopod",
  "card.allergen.cypress": "Cyprys",
  "card.allergen.elm": "Wiąz",
  "card.allergen.goosefoot": "Komosa",
  "card.allergen.grass": "Trawa",
  "card.allergen.grass_cat": "Trawy",
  "card.allergen.hazel": "Leszczyna",
  "card.allergen.index": "Indeks",
  "card.allergen.lime": "Lipa",
  "card.allergen.maple": "Klon",
  "card.allergen.mold_spores": "Zarodniki pleśni",
  "card.allergen.mugwort": "Bylica",
  "card.allergen.nettle": "Pokrzywa",
  "card.allergen.nettle_and_pellitory": "Pokrzywa i parietaria",
  "card.allergen.no2": "Dwutlenek azotu",
  "card.allergen.oak": "Dąb",
  "card.allergen.olive": "Oliwka",
  "card.allergen.ozone": "Ozon",
  "card.allergen.pine": "Sosna",
  "card.allergen.plane": "Platan",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.plantain": "Babka",
  "card.allergen.poaceae": "Poaceae",
  "card.allergen.poplar": "Topola",
  "card.allergen.qualite_globale": "Jakość powietrza",
  "card.allergen.ragweed": "Ambrozja",
  "card.allergen.rye": "Żyto",
  "card.allergen.so2": "Dwutlenek siarki",
  "card.allergen.sorrel": "Szczaw",
  "card.allergen.trees": "Drzewa",
  "card.allergen.trees_cat": "Drzewa i krzewy",
  "card.allergen.weeds": "Chwasty",
  "card.allergen.weeds_cat": "Chwasty",
  "card.allergen.willow": "Wierzba",
  "card.days.0": "Dziś",
  "card.days.1": "Jutro",
  "card.days.2": "Pojutrze",
  "card.error": "Brak sensorów pyłków. Czy masz zainstalowaną właściwą integrację i wybrałeś region w konfiguracji karty?",
  "card.error_filtered_sensors": "Żaden sensor nie pasuje do filtrów. Sprawdź wybrane alergeny i ich wartości progowe.",
  "card.error_location_not_found": "Brak lokalizacji. Sprawdź jej nazwę w konfiguracji karty.",
  "card.error_entity_unavailable": "Encja pogodowa jest niedostępna. Integracja może być offline lub uruchamiana ponownie.",
  "card.error_no_sensors": "Brak sensorów pyłków. Czy masz zainstalowaną właściwą integrację i wybrałeś region w konfiguracji karty?",
  "card.header_prefix": "Prognoza pylenia dla",
  "card.header_no_location": "Prognoza pylenia",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Brak właściwej integracji",
  "card.levels.0": "Brak pylenia",
  "card.levels.1": "Niski poziom",
  "card.levels.2": "Średnio-niski poziom",
  "card.levels.3": "Średni poziom",
  "card.levels.4": "Średnio-wysoki poziom",
  "card.levels.5": "Wysoki poziom",
  "card.levels.6": "Bardzo wysoki poziom",
  "card.index.very_low": "Bardzo niski poziom",
  "card.loading_forecast": "Odczyt prognozy...",
  "card.location.plu": "Luksemburg",
  "card.no_allergens": "Brak alergenów",
  "card.no_information": "(Brak informacji)",
  "card.atmo.unavailable": "Niedostępne",
  "card.atmo.event": "Zdarzenie",
  "card.stale_allergen": "Brak danych",
  "card.stale_data": "Dane o pyłkach są tymczasowo niedostępne",
  "card.stale_data_subtitle": "Dostawca nie zwraca obecnie danych dla tego regionu",
  "editor.allergen_color_custom": "Kolory własne",
  "editor.allergen_color_default_colors": "Kolory domyślne",
  "editor.allergen_color_mode": "Tryb koloru alergenów",
  "editor.allergen_colors": "Kolory alergenów (wg poziomu)",
  "editor.allergen_colors_header": "Wygląd alergenu",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Przywróć domyślne",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synchronizuj odstęp z szerokością konturu",
  "editor.allergen_outline_color": "Kolor konturu",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Przywróć kontur",
  "editor.allergen_stroke_color_synced": "Synchronizuj kolor konturu z jego poziomem",
  "editor.allergen_stroke_width": "Szerokość konturu",
  "editor.allergen_stroke_width_reset": "Przywróć szerokość konturu",
  "editor.allergens": "Alergeny",
  "editor.allergens_abbreviated": "Skróty nazwy alergenów",
  "editor.allergens_header_category": "Kategoria alergenów (ogólna)",
  "editor.allergens_header_pollen": "Pyłek",
  "editor.allergens_header_pollution": "Jakość powietrza",
  "editor.allergens_header_specific": "Poszczególne alergeny (konkretne)",
  "editor.allergens_header_summary": "Podsumowanie",
  "editor.allergy_risk_top": "Ryzyko alergii na początku listy",
  "editor.background_color": "Kolor tła",
  "editor.background_color_picker": "Wybierz kolor",
  "editor.background_color_placeholder": "np. #ffeecc lub var(--my-color)",
  "editor.card_version": "Wersja karty Pollenprognos",
  "editor.city": "Miejscowość",
  "editor.days_abbreviated": "Skrót dni tygodnia",
  "editor.days_boldfaced": "Pogrubienie dni tygodnia",
  "editor.days_relative": "Względne dni tygodnia (dziś/jutro)",
  "editor.days_uppercase": "Dni tygodnia wielką literą",
  "editor.debug": "Debugowanie",
  "editor.entity_prefix": "Prefiks encji",
  "editor.entity_prefix_placeholder": "np. pollen_",
  "editor.entity_suffix": "Sufiks encji",
  "editor.entity_suffix_placeholder": "np. _home",
  "editor.icon_color_custom": "Kolor własny",
  "editor.icon_color_inherit": "Dziedzicz z wykresu",
  "editor.icon_color_mode": "Tryb koloru ikon",
  "editor.icon_color_picker": "Wybierz kolor ikony",
  "editor.icon_size": "Rozmiar ikony (px)",
  "editor.index_top": "Indeks na górze listy",
  "editor.integration": "Integracja",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Kolory segmentów",
  "editor.levels_colors_placeholder": "np. #ffeecc lub var(--my-color)",
  "editor.levels_custom": "Użyj własnych kolorów poziomów",
  "editor.levels_empty_color": "Kolor pustego segmentu",
  "editor.levels_gap": "Odstęp (px)",
  "editor.levels_gap_color": "Kolor odstępu",
  "editor.levels_gap_inherited": "Odstęp (dziedziczony od alergenu)",
  "editor.levels_header": "Wygląd okręgu poziomu",
  "editor.levels_icon_ratio": "Proporcje ikon poziomów",
  "editor.levels_inherit_allergen": "Dziedzicz od kolorów alergenu",
  "editor.levels_inherit_header": "Dziedziczenie okręgu poziomów",
  "editor.levels_inherit_mode": "Tryb koloru okręgu poziomów",
  "editor.levels_reset": "Przywróć domyślne",
  "editor.levels_text_color": "Kolor tekstu (wewnętrzny okrąg)",
  "editor.levels_text_size": "Rozmiar tekstu (wewnętrzny okrąg, % normalnego rozmiaru)",
  "editor.levels_text_weight": "Grubość tekstu (wewnętrzny okrąg)",
  "editor.levels_thickness": "Grubość (%)",
  "editor.link_to_sensors": "Połącz alergeny z ich sensorami",
  "editor.locale": "Ustawienia regionalne",
  "editor.location": "Lokalizacja",
  "editor.location_autodetect": "Auto-wykrywanie",
  "editor.location_manual": "Ręcznie",
  "editor.minimal": "Tryb minimalny",
  "editor.minimal_gap": "Odstęp między alergenami (px)",
  "editor.mode": "Tryb",
  "editor.mode_daily": "Dzienny",
  "editor.mode_hourly": "Godzinowy",
  "editor.mode_hourly_eighth": "Godzinowy (co 8 godz.)",
  "editor.mode_hourly_fourth": "Godzinowy (co 4 godz.)",
  "editor.mode_hourly_second": "Godzinowy (co 2 godz.)",
  "editor.mode_hourly_sixth": "Godzinowy (co 6 godz.)",
  "editor.mode_hourly_third": "Godzinowy (co 3 godz.)",
  "editor.mode_twice_daily": "Dwa razy dziennie",
  "editor.no_allergens_color": "Brak alergenów",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Przywróć kolor braku alergenów",
  "editor.no_information": "Brak informacji",
  "editor.numeric_state_raw_risk": "Pokaż surową wartość (ryzyko alergii)",
  "editor.peu_nondaily_expl": "Tylko 'Ryzyko alergii' jest dostępne w trybie innym, niż dzienny.",
  "editor.phrases": "Frazy",
  "editor.phrases_apply": "Zastosuj",
  "editor.phrases_days": "Względne dni",
  "editor.phrases_days.0": "Dziś",
  "editor.phrases_days.1": "Jutro",
  "editor.phrases_days.2": "Pojutrze",
  "editor.phrases_full": "Alergeny",
  "editor.phrases_full.alder": "Olcha",
  "editor.phrases_full.allergy_risk": "Ryzyko alergii",
  "editor.phrases_full.ash": "Jesion",
  "editor.phrases_full.beech": "Buk",
  "editor.phrases_full.birch": "Brzoza",
  "editor.phrases_full.chenopod": "Chenopod",
  "editor.phrases_full.cypress": "Cyprys",
  "editor.phrases_full.elm": "Wiąz",
  "editor.phrases_full.goosefoot": "Komosa",
  "editor.phrases_full.grass": "Trawa",
  "editor.phrases_full.grass_cat": "Trawy",
  "editor.phrases_full.hazel": "Leszczyna",
  "editor.phrases_full.index": "Indeks",
  "editor.phrases_full.lime": "Lipa",
  "editor.phrases_full.maple": "Klon",
  "editor.phrases_full.mold_spores": "Zarodniki pleśni",
  "editor.phrases_full.mugwort": "Bylica",
  "editor.phrases_full.nettle": "Pokrzywa",
  "editor.phrases_full.nettle_and_pellitory": "Pokrzywa i parietaria",
  "editor.phrases_full.no2": "Dwutlenek azotu",
  "editor.phrases_full.oak": "Dąb",
  "editor.phrases_full.olive": "Oliwka",
  "editor.phrases_full.ozone": "Ozon",
  "editor.phrases_full.pine": "Sosna",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.plantain": "Babka",
  "editor.phrases_full.poaceae": "Poaceae",
  "editor.phrases_full.poplar": "Topola",
  "editor.phrases_full.qualite_globale": "Jakość powietrza",
  "editor.phrases_full.ragweed": "Ambrozja",
  "editor.phrases_full.rye": "Żyto",
  "editor.phrases_full.so2": "Dwutlenek siarki",
  "editor.phrases_full.sorrel": "Szczaw",
  "editor.phrases_full.trees": "Drzewa",
  "editor.phrases_full.trees_cat": "Drzewa i krzewy",
  "editor.phrases_full.weeds": "Chwasty",
  "editor.phrases_full.weeds_cat": "Chwasty",
  "editor.phrases_full.willow": "Wierzba",
  "editor.phrases_levels": "Poziomy alergenów",
  "editor.phrases_levels.0": "Brak pyłków",
  "editor.phrases_levels.1": "Niskie poziomy",
  "editor.phrases_levels.2": "Średnio-niskie poziomy",
  "editor.phrases_levels.3": "Średnie poziomy",
  "editor.phrases_levels.4": "Średnio-wysokie poziomy",
  "editor.phrases_levels.5": "Wysokie poziomy",
  "editor.phrases_levels.6": "Bardzo wysokie poziomy",
  "editor.phrases_short": "Alergeny, skrót",
  "editor.phrases_short.alder": "Olcha",
  "editor.phrases_short.allergy_risk": "Ryzyko",
  "editor.phrases_short.ash": "Jesion",
  "editor.phrases_short.beech": "Buk",
  "editor.phrases_short.birch": "Brzoza",
  "editor.phrases_short.chenopod": "Chnopd",
  "editor.phrases_short.cypress": "Cyprys",
  "editor.phrases_short.elm": "Wiąz",
  "editor.phrases_short.goosefoot": "Komosa",
  "editor.phrases_short.grass": "Trawa",
  "editor.phrases_short.grass_cat": "Trawy",
  "editor.phrases_short.grasses": "Trawy",
  "editor.phrases_short.hazel": "Leszcz.",
  "editor.phrases_short.index": "Indeks",
  "editor.phrases_short.lime": "Lipa",
  "editor.phrases_short.maple": "Klon",
  "editor.phrases_short.mold_spores": "Pleśń",
  "editor.phrases_short.mugwort": "Bylica",
  "editor.phrases_short.nettle": "Pokrz.",
  "editor.phrases_short.nettle_and_pellitory": "Pokrz.",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Dąb",
  "editor.phrases_short.olive": "Oliwka",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Sosna",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.plantain": "Babka",
  "editor.phrases_short.poaceae": "Poaceae",
  "editor.phrases_short.poplar": "Topola",
  "editor.phrases_short.qualite_globale": "IJP",
  "editor.phrases_short.ragweed": "Ambrozja",
  "editor.phrases_short.rye": "Żyto",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Szczaw",
  "editor.phrases_short.trees": "Drzewa",
  "editor.phrases_short.trees_cat": "Drz. krz.",
  "editor.phrases_short.weeds": "Chwasty",
  "editor.phrases_short.weeds_cat": "Chwasty",
  "editor.phrases_short.willow": "Wierzba",
  "editor.phrases_translate_all": "Tłumacz wszystko",
  "editor.pollen_threshold": "Próg:",
  "editor.pollution_block_bottom": "Na dole (pod pyłkiem)",
  "editor.pollution_block_position": "Pozycja zanieczyszczeń",
  "editor.pollution_block_top": "Na górze (nad pyłkiem)",
  "editor.preset_reset_all": "Przywróć ustawienia",
  "editor.region_id": "ID regionu",
  "editor.select_all_allergens": "Wybierz wszystkie alergeny",
  "editor.select_all_pollen": "Wybierz pyłek",
  "editor.select_all_pollution": "Wybierz jakość powietrza",
  "editor.show_empty_days": "Pokaż puste dni",
  "editor.show_text_allergen": "Pokaż tekst i alergen",
  "editor.show_value_numeric": "Pokaż wartość numeryczną",
  "editor.show_value_numeric_in_circle": "Pokaż wartość numeryczną w okręgu",
  "editor.show_value_text": "Pokaż wartość tekstową",
  "editor.show_version": "Wyślij wersję na konsolę",
  "editor.sort": "Sortowanie",
  "editor.sort_category_allergens_first": "Kategorie alergenów na górę listy",
  "editor.sort_name_ascending": "Nazwa, rosnąco",
  "editor.sort_name_descending": "Nazwa, malejąco",
  "editor.sort_none": "brak (kolejność konfiguracyjna)",
  "editor.sort_pollution_block": "Grupuj zanieczyszczenia oddzielnie",
  "editor.show_block_separator": "Pokaż separator między blokami",
  "editor.sort_value_ascending": "Wartość, rosnąco",
  "editor.sort_value_descending": "Wartość, malejąco",
  "editor.summary_advanced": "Zaawansowane",
  "editor.summary_allergens": "Alergeny",
  "editor.summary_appearance_and_layout": "Widok i układ",
  "editor.summary_card_interactivity": "Interaktywność karty",
  "editor.summary_card_layout_and_colors": "Układ i kolory karty",
  "editor.summary_data_view_settings": "Ustawienia widoku daty",
  "editor.summary_day_view_settings": "Ustawienia widoku dnia",
  "editor.summary_entity_prefix_suffix": "Własny prefiks i sufiks",
  "editor.summary_functional_settings": "Ustawienia funkcjonalne",
  "editor.summary_integration_and_place": "Integracja i miejsce",
  "editor.summary_minimal": "Minimalny",
  "editor.summary_title_and_header": "Tytuł i nagłówek",
  "editor.summary_translation_and_strings": "Tłumaczenie i teksty",
  "editor.tap_action": "Akcja kliknięcia",
  "editor.tap_action_enable": "Aktywuj akcję kliknięcia",
  "editor.text_size_ratio": "Współczynnik wielkości tekstu (%)",
  "editor.title": "Tytuł karty",
  "editor.title_automatic": "Tytuł automatycznie",
  "editor.title_hide": "Ukryj tytuł",
  "editor.title_placeholder": "(automatycznie)",
  "editor.to_show_columns": "Pokż kolumny",
  "editor.to_show_days": "Pokaż dni",
  "editor.to_show_hours": "Pokaż godziny"
}, Sc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kc
}, Symbol.toStringTag, { value: "Module" })), Ac = {
  "card.allergen.alder": "Ольха",
  "card.allergen.allergy_risk": "Риск аллергии",
  "card.allergen.ash": "Ясень",
  "card.allergen.beech": "Бук",
  "card.allergen.birch": "Берёза",
  "card.allergen.chenopod": "Марь",
  "card.allergen.cypress": "Кипарис",
  "card.allergen.elm": "Вяз",
  "card.allergen.goosefoot": "Марь белая",
  "card.allergen.grass": "Трава",
  "card.allergen.grass_cat": "Злаки",
  "card.allergen.hazel": "Лещина",
  "card.allergen.index": "Индекс",
  "card.allergen.lime": "Липа",
  "card.allergen.maple": "Клён",
  "card.allergen.mold_spores": "Споры плесени",
  "card.allergen.mugwort": "Полынь",
  "card.allergen.nettle": "Крапива",
  "card.allergen.nettle_and_pellitory": "Крапива и парьетария",
  "card.allergen.no2": "Диоксид азота",
  "card.allergen.oak": "Дуб",
  "card.allergen.olive": "Олива",
  "card.allergen.ozone": "Озон",
  "card.allergen.pine": "Сосна",
  "card.allergen.plane": "Платан",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.plantain": "Подорожник",
  "card.allergen.poaceae": "Злаки",
  "card.allergen.poplar": "Тополь",
  "card.allergen.qualite_globale": "Качество воздуха",
  "card.allergen.ragweed": "Амброзия",
  "card.allergen.rye": "Рожь",
  "card.allergen.so2": "Диоксид серы",
  "card.allergen.sorrel": "Щавель",
  "card.allergen.trees": "Деревья",
  "card.allergen.trees_cat": "Деревья",
  "card.allergen.weeds": "Сорняки",
  "card.allergen.weeds_cat": "Сорняки",
  "card.allergen.willow": "Ива",
  "card.days.0": "Сегодня",
  "card.days.1": "Завтра",
  "card.days.2": "Послезавтра",
  "card.error": "Датчики пыльцы не найдены. Установлена ли нужная интеграция и выбран ли регион в настройках карточки?",
  "card.error_filtered_sensors": "Нет датчиков, соответствующих фильтрам. Проверьте выбранные аллергены и порог.",
  "card.error_location_not_found": "Местоположение не найдено. Проверьте название местоположения в конфигурации карты.",
  "card.error_entity_unavailable": "Погодная сущность недоступна. Интеграция может быть отключена или перезапускается.",
  "card.error_no_sensors": "Датчики пыльцы не найдены. Установлена ли нужная интеграция и выбран ли регион в настройках карточки?",
  "card.header_prefix": "Прогноз пыльцы для",
  "card.header_no_location": "Прогноз пыльцы",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Интеграция с датчиком пыльцы не найдена",
  "card.levels.0": "Нет пыльцы",
  "card.levels.1": "Низкий уровень",
  "card.levels.2": "Низко–умеренный уровень",
  "card.levels.3": "Умеренный уровень",
  "card.levels.4": "Умеренно–высокий уровень",
  "card.levels.5": "Высокий уровень",
  "card.levels.6": "Очень высокий уровень",
  "card.index.very_low": "Очень низкий уровень",
  "card.loading_forecast": "Загрузка прогноза...",
  "card.location.plu": "Люксембург",
  "card.no_allergens": "Нет аллергенов",
  "card.no_information": "(Нет информации)",
  "card.atmo.unavailable": "Недоступно",
  "card.atmo.event": "Событие",
  "card.stale_allergen": "Нет данных",
  "card.stale_data": "Данные о пыльце временно недоступны",
  "card.stale_data_subtitle": "Поставщик в настоящее время не возвращает данные для этого региона",
  "editor.allergen_color_custom": "Пользовательские цвета",
  "editor.allergen_color_default_colors": "Цвета по умолчанию",
  "editor.allergen_color_mode": "Режим цвета аллергенов",
  "editor.allergen_colors": "Цвета аллергенов (по уровням)",
  "editor.allergen_colors_header": "Внешний вид аллергенов",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Сбросить на умолчания",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Синхронизировать промежуток с толщиной линии аллергена",
  "editor.allergen_outline_color": "Цвет контура",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Сбросить контур",
  "editor.allergen_stroke_color_synced": "Синхронизировать цвет обводки с уровнем",
  "editor.allergen_stroke_width": "Толщина линии",
  "editor.allergen_stroke_width_reset": "Сбросить толщину линии",
  "editor.allergens": "Аллергены",
  "editor.allergens_abbreviated": "Сокращать аллергены",
  "editor.allergens_header_category": "Категории аллергенов (общие)",
  "editor.allergens_header_pollen": "Пыльца",
  "editor.allergens_header_pollution": "Качество воздуха",
  "editor.allergens_header_specific": "Отдельные аллергены (специфические)",
  "editor.allergens_header_summary": "Сводка",
  "editor.allergy_risk_top": "Риск аллергии вверху списка",
  "editor.background_color": "Цвет фона",
  "editor.background_color_picker": "Выбрать цвет",
  "editor.background_color_placeholder": "например, #ffeecc или var(--my-color)",
  "editor.card_version": "Версия карточки прогноза пыльцы",
  "editor.city": "Город",
  "editor.days_abbreviated": "Сокращать дни недели",
  "editor.days_boldfaced": "Выделять дни недели",
  "editor.days_relative": "Относительные дни (сегодня/завтра)",
  "editor.days_uppercase": "ЗАГЛАВНЫМИ буквами дни недели",
  "editor.debug": "Отладка",
  "editor.entity_prefix": "Префикс сущности",
  "editor.entity_prefix_placeholder": "напр. pollen_",
  "editor.entity_suffix": "Суффикс сущности",
  "editor.entity_suffix_placeholder": "напр. _home",
  "editor.icon_color_custom": "Пользовательский цвет",
  "editor.icon_color_inherit": "Наследовать из диаграммы",
  "editor.icon_color_mode": "Режим цвета иконки",
  "editor.icon_color_picker": "Выбрать цвет иконки",
  "editor.icon_size": "Размер значка (пикс.)",
  "editor.index_top": "Индекс вверху списка",
  "editor.integration": "Интеграция",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Цвета сегментов",
  "editor.levels_colors_placeholder": "например, #ffeecc или var(--my-color)",
  "editor.levels_custom": "Использовать пользовательские цвета уровней",
  "editor.levels_empty_color": "Цвет пустого сегмента",
  "editor.levels_gap": "Промежуток (px)",
  "editor.levels_gap_color": "Цвет промежутка",
  "editor.levels_gap_inherited": "Разрыв (унаследован от аллергена)",
  "editor.levels_header": "Внешний вид кругов уровней",
  "editor.levels_icon_ratio": "Соотношение иконок уровней",
  "editor.levels_inherit_allergen": "Наследовать из цветов аллергенов",
  "editor.levels_inherit_header": "Наследование кругов уровней",
  "editor.levels_inherit_mode": "Режим цвета кругов уровней",
  "editor.levels_reset": "Сбросить по умолчанию",
  "editor.levels_text_color": "Цвет текста (внутренний круг)",
  "editor.levels_text_size": "Размер текста (внутренний круг, % от нормы)",
  "editor.levels_text_weight": "Начертание текста (внутренний круг)",
  "editor.levels_thickness": "Толщина (%)",
  "editor.link_to_sensors": "Связать аллергены с датчиками",
  "editor.locale": "Язык",
  "editor.location": "Местоположение",
  "editor.location_autodetect": "Автоопределение",
  "editor.location_manual": "Вручную",
  "editor.minimal": "Минимальный режим",
  "editor.minimal_gap": "Расстояние между аллергенами (пикс.)",
  "editor.mode": "Режим",
  "editor.mode_daily": "Ежедневный",
  "editor.mode_hourly": "Почасовой",
  "editor.mode_hourly_eighth": "Ежечасно (каждые 8 ч)",
  "editor.mode_hourly_fourth": "Ежечасно (каждые 4 ч)",
  "editor.mode_hourly_second": "Ежечасно (каждые 2 ч)",
  "editor.mode_hourly_sixth": "Ежечасно (каждые 6 ч)",
  "editor.mode_hourly_third": "Ежечасно (каждые 3 ч)",
  "editor.mode_twice_daily": "Два раза в день",
  "editor.no_allergens_color": "Нет аллергенов",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Сбросить цвет без аллергенов",
  "editor.no_information": "Нет информации",
  "editor.numeric_state_raw_risk": "Показать исходное значение (риск аллергии)",
  "editor.peu_nondaily_expl": "Только 'allergen_risk' доступен в нерегулярных режимах.",
  "editor.phrases": "Фразы",
  "editor.phrases_apply": "Применить",
  "editor.phrases_days": "Относительные дни",
  "editor.phrases_days.0": "Сегодня",
  "editor.phrases_days.1": "Завтра",
  "editor.phrases_days.2": "Послезавтра",
  "editor.phrases_full": "Аллергены",
  "editor.phrases_full.alder": "Ольха",
  "editor.phrases_full.allergy_risk": "Риск аллергии",
  "editor.phrases_full.ash": "Ясень",
  "editor.phrases_full.beech": "Бук",
  "editor.phrases_full.birch": "Берёза",
  "editor.phrases_full.chenopod": "Марь",
  "editor.phrases_full.cypress": "Кипарис",
  "editor.phrases_full.elm": "Вяз",
  "editor.phrases_full.goosefoot": "Марь белая",
  "editor.phrases_full.grass": "Трава",
  "editor.phrases_full.grass_cat": "Злаки",
  "editor.phrases_full.hazel": "Лещина",
  "editor.phrases_full.index": "Индекс",
  "editor.phrases_full.lime": "Липа",
  "editor.phrases_full.maple": "Клён",
  "editor.phrases_full.mold_spores": "Споры плесени",
  "editor.phrases_full.mugwort": "Полынь",
  "editor.phrases_full.nettle": "Крапива",
  "editor.phrases_full.nettle_and_pellitory": "Крапива и парьетария",
  "editor.phrases_full.no2": "Диоксид азота",
  "editor.phrases_full.oak": "Дуб",
  "editor.phrases_full.olive": "Олива",
  "editor.phrases_full.ozone": "Озон",
  "editor.phrases_full.pine": "Сосна",
  "editor.phrases_full.plane": "Платан",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.plantain": "Подорожник",
  "editor.phrases_full.poaceae": "Злаки",
  "editor.phrases_full.poplar": "Тополь",
  "editor.phrases_full.qualite_globale": "Качество воздуха",
  "editor.phrases_full.ragweed": "Амброзия",
  "editor.phrases_full.rye": "Рожь",
  "editor.phrases_full.so2": "Диоксид серы",
  "editor.phrases_full.sorrel": "Щавель",
  "editor.phrases_full.trees": "Деревья",
  "editor.phrases_full.trees_cat": "Деревья",
  "editor.phrases_full.weeds": "Сорняки",
  "editor.phrases_full.weeds_cat": "Сорняки",
  "editor.phrases_full.willow": "Ива",
  "editor.phrases_levels": "Уровни аллергенов",
  "editor.phrases_levels.0": "Нет пыльцы",
  "editor.phrases_levels.1": "Низкий уровень",
  "editor.phrases_levels.2": "Низко–умеренный уровень",
  "editor.phrases_levels.3": "Умеренный уровень",
  "editor.phrases_levels.4": "Умеренно–высокий уровень",
  "editor.phrases_levels.5": "Высокий уровень",
  "editor.phrases_levels.6": "Очень высокий уровень",
  "editor.phrases_short": "Аллергены, коротко",
  "editor.phrases_short.alder": "Ольха",
  "editor.phrases_short.allergy_risk": "Риск",
  "editor.phrases_short.ash": "Ясень",
  "editor.phrases_short.beech": "Бук",
  "editor.phrases_short.birch": "Берёза",
  "editor.phrases_short.chenopod": "Марь",
  "editor.phrases_short.cypress": "Кип.",
  "editor.phrases_short.elm": "Вяз",
  "editor.phrases_short.goosefoot": "Марь",
  "editor.phrases_short.grass": "Трава",
  "editor.phrases_short.grass_cat": "Трава",
  "editor.phrases_short.grasses": "Злаки",
  "editor.phrases_short.hazel": "Лещ.",
  "editor.phrases_short.index": "Индекс",
  "editor.phrases_short.lime": "Липа",
  "editor.phrases_short.maple": "Клён",
  "editor.phrases_short.mold_spores": "Плесень",
  "editor.phrases_short.mugwort": "Полынь",
  "editor.phrases_short.nettle": "Крапив",
  "editor.phrases_short.nettle_and_pellitory": "Крапива",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Дуб",
  "editor.phrases_short.olive": "Олива",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Сосна",
  "editor.phrases_short.plane": "Платан",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.plantain": "Подор",
  "editor.phrases_short.poaceae": "Злаки",
  "editor.phrases_short.poplar": "Топол",
  "editor.phrases_short.qualite_globale": "ИКВ",
  "editor.phrases_short.ragweed": "Амбр.",
  "editor.phrases_short.rye": "Рожь",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Щав",
  "editor.phrases_short.trees": "Деревья",
  "editor.phrases_short.trees_cat": "Деревья",
  "editor.phrases_short.weeds": "Сорняки",
  "editor.phrases_short.weeds_cat": "Сорняки",
  "editor.phrases_short.willow": "Ива",
  "editor.phrases_translate_all": "Перевести всё",
  "editor.pollen_threshold": "Пороговое значение:",
  "editor.pollution_block_bottom": "Снизу (под пыльцой)",
  "editor.pollution_block_position": "Позиция загрязнения",
  "editor.pollution_block_top": "Сверху (над пыльцой)",
  "editor.preset_reset_all": "Сбросить все настройки",
  "editor.region_id": "ID региона",
  "editor.select_all_allergens": "Выбрать все аллергены",
  "editor.select_all_pollen": "Выбрать пыльцу",
  "editor.select_all_pollution": "Выбрать качество воздуха",
  "editor.show_empty_days": "Показывать пустые дни",
  "editor.show_text_allergen": "Показывать название аллергена",
  "editor.show_value_numeric": "Показывать числовое значение",
  "editor.show_value_numeric_in_circle": "Показывать число в круге",
  "editor.show_value_text": "Показывать значение как текст",
  "editor.show_version": "Логировать версию в консоль",
  "editor.sort": "Сортировка",
  "editor.sort_category_allergens_first": "Сортировать аллергены категорий сверху",
  "editor.sort_name_ascending": "имя, по возрастанию",
  "editor.sort_name_descending": "имя, по убыванию",
  "editor.sort_none": "нет (порядок конфигурации)",
  "editor.sort_pollution_block": "Группировать загрязнение отдельно",
  "editor.show_block_separator": "Показать разделитель между блоками",
  "editor.sort_value_ascending": "значение, по возрастанию",
  "editor.sort_value_descending": "значение, по убыванию",
  "editor.summary_advanced": "Дополнительно",
  "editor.summary_allergens": "Аллергены",
  "editor.summary_appearance_and_layout": "Внешний вид и макет",
  "editor.summary_card_interactivity": "Интерактивность карточки",
  "editor.summary_card_layout_and_colors": "Макет и цвета карточки",
  "editor.summary_data_view_settings": "Настройки отображения данных",
  "editor.summary_day_view_settings": "Настройки дневного вида",
  "editor.summary_entity_prefix_suffix": "Пользовательский префикс и суффикс",
  "editor.summary_functional_settings": "Функциональные настройки",
  "editor.summary_integration_and_place": "Интеграция и место",
  "editor.summary_minimal": "Минимальный",
  "editor.summary_title_and_header": "Заголовок и шапка",
  "editor.summary_translation_and_strings": "Перевод и строки",
  "editor.tap_action": "Действие при нажатии",
  "editor.tap_action_enable": "Включить действие при нажатии",
  "editor.text_size_ratio": "Соотношение размера текста (%)",
  "editor.title": "Заголовок карточки",
  "editor.title_automatic": "Автоматический заголовок",
  "editor.title_hide": "Скрыть заголовок",
  "editor.title_placeholder": "(автоматически)",
  "editor.to_show_columns": "Столбцов для показа",
  "editor.to_show_days": "Дней для показа",
  "editor.to_show_hours": "Часов для показа"
}, Pc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ac
}, Symbol.toStringTag, { value: "Module" })), Cc = {
  "card.allergen.alder": "Jelša",
  "card.allergen.allergy_risk": "Riziko alergie",
  "card.allergen.ash": "Jaseň",
  "card.allergen.beech": "Buk",
  "card.allergen.birch": "Breza",
  "card.allergen.chenopod": "Laskavec",
  "card.allergen.cypress": "Cyprus",
  "card.allergen.elm": "Brest",
  "card.allergen.goosefoot": "Láskavec biely",
  "card.allergen.grass": "Tráva",
  "card.allergen.grass_cat": "Trávy",
  "card.allergen.hazel": "Lieska",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Lipa",
  "card.allergen.maple": "Javor",
  "card.allergen.mold_spores": "Spóry plesní",
  "card.allergen.mugwort": "Palina",
  "card.allergen.nettle": "Žihľava",
  "card.allergen.nettle_and_pellitory": "Žihľava a parietária",
  "card.allergen.no2": "Oxid dusičitý",
  "card.allergen.oak": "Dub",
  "card.allergen.olive": "Olivovník",
  "card.allergen.ozone": "Ozón",
  "card.allergen.pine": "Borovica",
  "card.allergen.plane": "Platan",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.plantain": "Skorocel",
  "card.allergen.poaceae": "Trávy",
  "card.allergen.poplar": "Topoľ",
  "card.allergen.qualite_globale": "Kvalita ovzdušia",
  "card.allergen.ragweed": "Ambrozia",
  "card.allergen.rye": "Raž",
  "card.allergen.so2": "Oxid siričitý",
  "card.allergen.sorrel": "Šťavel",
  "card.allergen.trees": "Stromy",
  "card.allergen.trees_cat": "Stromy",
  "card.allergen.weeds": "Buriny",
  "card.allergen.weeds_cat": "Buriny",
  "card.allergen.willow": "Vŕba",
  "card.days.0": "Dnes",
  "card.days.1": "Zajtra",
  "card.days.2": "Pozajtra",
  "card.error": "Žiadne peľové senzory nenájdené. Je nainštalovaná správna integrácia a zvolený región v nastavení karty?",
  "card.error_filtered_sensors": "Žiadne senzory nezodpovedajú filtrom. Skontrolujte zvolené alergény a prah.",
  "card.error_location_not_found": "Umiestnenie sa nenašlo. Skontrolujte názov umiestnenia v konfigurácii karty.",
  "card.error_entity_unavailable": "Meteorologická entita nie je dostupná. Integrácia môže byť offline alebo sa reštartuje.",
  "card.error_no_sensors": "Žiadne peľové senzory nenájdené. Je nainštalovaná správna integrácia a zvolený región v nastavení karty?",
  "card.header_prefix": "Peľová predpoveď pre",
  "card.header_no_location": "Peľová predpoveď",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Nenájdená peľová integrácia",
  "card.levels.0": "Žiadny peľ",
  "card.levels.1": "Nízke úrovne",
  "card.levels.2": "Nízko–stredné úrovne",
  "card.levels.3": "Stredné úrovne",
  "card.levels.4": "Stredne–vysoké úrovne",
  "card.levels.5": "Vysoké úrovne",
  "card.levels.6": "Veľmi vysoké úrovne",
  "card.index.very_low": "Veľmi nízke úrovne",
  "card.loading_forecast": "Načítava sa predpoveď...",
  "card.location.plu": "Luxembursko",
  "card.no_allergens": "Žiadne alergény",
  "card.no_information": "(Žiadne informácie)",
  "card.atmo.unavailable": "Nedostupné",
  "card.atmo.event": "Udalosť",
  "card.stale_allergen": "Žiadne údaje",
  "card.stale_data": "Peľové údaje sú dočasne nedostupné",
  "card.stale_data_subtitle": "Poskytovateľ momentálne neposkytuje údaje pre tento región",
  "editor.allergen_color_custom": "Vlastné farby",
  "editor.allergen_color_default_colors": "Predvolené farby",
  "editor.allergen_color_mode": "Režim farieb alergénov",
  "editor.allergen_colors": "Farby alergénov (podľa úrovne)",
  "editor.allergen_colors_header": "Vzhľad alergénov",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Obnoviť predvolené",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synchronizovať medzeru s hrúbkou čiary alergénu",
  "editor.allergen_outline_color": "Farba obrysu",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Obnoviť obrys",
  "editor.allergen_stroke_color_synced": "Synchronizovať farbu čiary s úrovňou",
  "editor.allergen_stroke_width": "Hrúbka čiary",
  "editor.allergen_stroke_width_reset": "Obnoviť hrúbku čiary",
  "editor.allergens": "Alergény",
  "editor.allergens_abbreviated": "Skrátiť alergény",
  "editor.allergens_header_category": "Kategórie alergénov (všeobecné)",
  "editor.allergens_header_pollen": "Peľ",
  "editor.allergens_header_pollution": "Kvalita ovzdušia",
  "editor.allergens_header_specific": "Jednotlivé alergény (špecifické)",
  "editor.allergens_header_summary": "Súhrn",
  "editor.allergy_risk_top": "Riziko alergie navrchu zoznamu",
  "editor.background_color": "Farba pozadia",
  "editor.background_color_picker": "Vybrať farbu",
  "editor.background_color_placeholder": "napr. #ffeecc alebo var(--my-color)",
  "editor.card_version": "Verzia karty peľovej predpovede",
  "editor.city": "Mesto",
  "editor.days_abbreviated": "Skrátiť dni v týždni",
  "editor.days_boldfaced": "Zvýrazniť dni v týždni",
  "editor.days_relative": "Relatívne dni (dnes/zajtra)",
  "editor.days_uppercase": "Veľké písmená v dňoch týždňa",
  "editor.debug": "Ladenie",
  "editor.entity_prefix": "Prefix entity",
  "editor.entity_prefix_placeholder": "napr. pollen_",
  "editor.entity_suffix": "Suffix entity",
  "editor.entity_suffix_placeholder": "napr. _home",
  "editor.icon_color_custom": "Vlastná farba",
  "editor.icon_color_inherit": "Dediť z grafu",
  "editor.icon_color_mode": "Režim farby ikony",
  "editor.icon_color_picker": "Vybrať farbu ikony",
  "editor.icon_size": "Veľkosť ikony (px)",
  "editor.index_top": "Index navrchu zoznamu",
  "editor.integration": "Integrácia",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Farby segmentov",
  "editor.levels_colors_placeholder": "napr. #ffeecc alebo var(--my-color)",
  "editor.levels_custom": "Použiť vlastné farby úrovní",
  "editor.levels_empty_color": "Farba prázdneho segmentu",
  "editor.levels_gap": "Medzera (px)",
  "editor.levels_gap_color": "Farba medzery",
  "editor.levels_gap_inherited": "Medzera (zdedená z alergénu)",
  "editor.levels_header": "Vzhľad kruhov úrovní",
  "editor.levels_icon_ratio": "Pomer ikon úrovní",
  "editor.levels_inherit_allergen": "Dediť z farieb alergénov",
  "editor.levels_inherit_header": "Dedenie kruhov úrovní",
  "editor.levels_inherit_mode": "Režim farieb kruhov úrovní",
  "editor.levels_reset": "Obnoviť predvolené",
  "editor.levels_text_color": "Farba textu (vnútorný kruh)",
  "editor.levels_text_size": "Veľkosť textu (vnútorný kruh, % normálu)",
  "editor.levels_text_weight": "Hrúbka textu (vnútorný kruh)",
  "editor.levels_thickness": "Hrúbka (%)",
  "editor.link_to_sensors": "Prepojiť alergény so senzormi",
  "editor.locale": "Jazyk",
  "editor.location": "Poloha",
  "editor.location_autodetect": "Automatické rozpoznanie",
  "editor.location_manual": "Manuálne",
  "editor.minimal": "Minimálny režim",
  "editor.minimal_gap": "Medzera medzi alergénmi (px)",
  "editor.mode": "Režim",
  "editor.mode_daily": "Denne",
  "editor.mode_hourly": "Hodinovo",
  "editor.mode_hourly_eighth": "Každých 8 hodín",
  "editor.mode_hourly_fourth": "Každé 4 hodiny",
  "editor.mode_hourly_second": "Každé 2 hodiny",
  "editor.mode_hourly_sixth": "Každých 6 hodín",
  "editor.mode_hourly_third": "Každé 3 hodiny",
  "editor.mode_twice_daily": "Dvakrát denne",
  "editor.no_allergens_color": "Bez alergénov",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Obnoviť farbu bez alergénov",
  "editor.no_information": "Žiadne informácie",
  "editor.numeric_state_raw_risk": "Zobraziť surovú hodnotu (riziko alergie)",
  "editor.peu_nondaily_expl": "Len 'allergen_risk' je dostupný v nedenných režimoch.",
  "editor.phrases": "Frázy",
  "editor.phrases_apply": "Použiť",
  "editor.phrases_days": "Relatívne dni",
  "editor.phrases_days.0": "Dnes",
  "editor.phrases_days.1": "Zajtra",
  "editor.phrases_days.2": "Pozajtra",
  "editor.phrases_full": "Alergény",
  "editor.phrases_full.alder": "Jelša",
  "editor.phrases_full.allergy_risk": "Riziko alergie",
  "editor.phrases_full.ash": "Jaseň",
  "editor.phrases_full.beech": "Buk",
  "editor.phrases_full.birch": "Breza",
  "editor.phrases_full.chenopod": "Laskavec",
  "editor.phrases_full.cypress": "Cyprus",
  "editor.phrases_full.elm": "Brest",
  "editor.phrases_full.goosefoot": "Láskavec biely",
  "editor.phrases_full.grass": "Tráva",
  "editor.phrases_full.grass_cat": "Trávy",
  "editor.phrases_full.hazel": "Lieska",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Lipa",
  "editor.phrases_full.maple": "Javor",
  "editor.phrases_full.mold_spores": "Spóry plesní",
  "editor.phrases_full.mugwort": "Palina",
  "editor.phrases_full.nettle": "Žihľava",
  "editor.phrases_full.nettle_and_pellitory": "Žihľava a parietária",
  "editor.phrases_full.no2": "Oxid dusičitý",
  "editor.phrases_full.oak": "Dub",
  "editor.phrases_full.olive": "Olivovník",
  "editor.phrases_full.ozone": "Ozón",
  "editor.phrases_full.pine": "Borovica",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.plantain": "Skorocel",
  "editor.phrases_full.poaceae": "Trávy",
  "editor.phrases_full.poplar": "Topoľ",
  "editor.phrases_full.qualite_globale": "Kvalita ovzdušia",
  "editor.phrases_full.ragweed": "Ambrozia",
  "editor.phrases_full.rye": "Raž",
  "editor.phrases_full.so2": "Oxid siričitý",
  "editor.phrases_full.sorrel": "Šťavel",
  "editor.phrases_full.trees": "Stromy",
  "editor.phrases_full.trees_cat": "Stromy",
  "editor.phrases_full.weeds": "Buriny",
  "editor.phrases_full.weeds_cat": "Buriny",
  "editor.phrases_full.willow": "Vŕba",
  "editor.phrases_levels": "Úrovne alergénov",
  "editor.phrases_levels.0": "Žiadny peľ",
  "editor.phrases_levels.1": "Nízke úrovne",
  "editor.phrases_levels.2": "Nízko–stredné úrovne",
  "editor.phrases_levels.3": "Stredné úrovne",
  "editor.phrases_levels.4": "Stredne–vysoké úrovne",
  "editor.phrases_levels.5": "Vysoké úrovne",
  "editor.phrases_levels.6": "Veľmi vysoké úrovne",
  "editor.phrases_short": "Alergény, krátko",
  "editor.phrases_short.alder": "Jelša",
  "editor.phrases_short.allergy_risk": "Riziko",
  "editor.phrases_short.ash": "Jas.",
  "editor.phrases_short.beech": "Buk",
  "editor.phrases_short.birch": "Breza",
  "editor.phrases_short.chenopod": "Laskav",
  "editor.phrases_short.cypress": "Cypr.",
  "editor.phrases_short.elm": "Brest",
  "editor.phrases_short.goosefoot": "Lásk",
  "editor.phrases_short.grass": "Tráva",
  "editor.phrases_short.grass_cat": "Tráva",
  "editor.phrases_short.grasses": "Trávy",
  "editor.phrases_short.hazel": "Lieska",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Lipa",
  "editor.phrases_short.maple": "Javor",
  "editor.phrases_short.mold_spores": "Plesne",
  "editor.phrases_short.mugwort": "Palina",
  "editor.phrases_short.nettle": "Žihľav",
  "editor.phrases_short.nettle_and_pellitory": "Žihľava",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Dub",
  "editor.phrases_short.olive": "Oliv.",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Borovi",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.plantain": "Skor",
  "editor.phrases_short.poaceae": "Trávy",
  "editor.phrases_short.poplar": "Topoľ",
  "editor.phrases_short.qualite_globale": "IKO",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Raž",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Šťav",
  "editor.phrases_short.trees": "Stromy",
  "editor.phrases_short.trees_cat": "Stromy",
  "editor.phrases_short.weeds": "Buriny",
  "editor.phrases_short.weeds_cat": "Buriny",
  "editor.phrases_short.willow": "Vŕba",
  "editor.phrases_translate_all": "Preložiť všetko",
  "editor.pollen_threshold": "Prah:",
  "editor.pollution_block_bottom": "Dole (pod peľom)",
  "editor.pollution_block_position": "Pozícia znečistenia",
  "editor.pollution_block_top": "Hore (nad peľom)",
  "editor.preset_reset_all": "Obnoviť všetky nastavenia",
  "editor.region_id": "ID regiónu",
  "editor.select_all_allergens": "Vybrať všetky alergény",
  "editor.select_all_pollen": "Vybrať peľ",
  "editor.select_all_pollution": "Vybrať kvalitu ovzdušia",
  "editor.show_empty_days": "Zobraziť prázdne dni",
  "editor.show_text_allergen": "Zobraziť text, alergén",
  "editor.show_value_numeric": "Zobraziť číselnú hodnotu",
  "editor.show_value_numeric_in_circle": "Zobraziť číslo v kruhu",
  "editor.show_value_text": "Zobraziť hodnotu ako text",
  "editor.show_version": "Zapisovať verziu do konzoly",
  "editor.sort": "Triedenie",
  "editor.sort_category_allergens_first": "Zoradiť kategórie alergénov navrch",
  "editor.sort_name_ascending": "názov, vzostupne",
  "editor.sort_name_descending": "názov, zostupne",
  "editor.sort_none": "žiadne (poradie konfigurácie)",
  "editor.sort_pollution_block": "Zoskupiť znečistenie oddelene",
  "editor.show_block_separator": "Zobraziť oddeľovač medzi blokmi",
  "editor.sort_value_ascending": "hodnota, vzostupne",
  "editor.sort_value_descending": "hodnota, zostupne",
  "editor.summary_advanced": "Pokročilé",
  "editor.summary_allergens": "Alergény",
  "editor.summary_appearance_and_layout": "Vzhľad a rozloženie",
  "editor.summary_card_interactivity": "Interaktivita karty",
  "editor.summary_card_layout_and_colors": "Rozloženie a farby karty",
  "editor.summary_data_view_settings": "Nastavenia zobrazenia dát",
  "editor.summary_day_view_settings": "Nastavenia zobrazenia dní",
  "editor.summary_entity_prefix_suffix": "Vlastný prefix a suffix",
  "editor.summary_functional_settings": "Funkčné nastavenia",
  "editor.summary_integration_and_place": "Integrácia a miesto",
  "editor.summary_minimal": "Minimálny",
  "editor.summary_title_and_header": "Nadpis a hlavička",
  "editor.summary_translation_and_strings": "Preklad a reťazce",
  "editor.tap_action": "Akcia na klepnutie",
  "editor.tap_action_enable": "Povoliť akciu na klepnutie",
  "editor.text_size_ratio": "Pomer veľkosti textu (%)",
  "editor.title": "Názov karty",
  "editor.title_automatic": "Automatický názov",
  "editor.title_hide": "Skryť názov",
  "editor.title_placeholder": "(automaticky)",
  "editor.to_show_columns": "Počet stĺpcov na zobrazenie",
  "editor.to_show_days": "Počet dní na zobrazenie",
  "editor.to_show_hours": "Počet hodín na zobrazenie"
}, Mc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cc
}, Symbol.toStringTag, { value: "Module" })), zc = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisk",
  "card.allergen.ash": "Asp",
  "card.allergen.beech": "Bok",
  "card.allergen.birch": "Björk",
  "card.allergen.chenopod": "Svinmålla",
  "card.allergen.cypress": "Cypress",
  "card.allergen.elm": "Alm",
  "card.allergen.goosefoot": "Målla",
  "card.allergen.grass": "Gräs",
  "card.allergen.grass_cat": "Gräsarter",
  "card.allergen.hazel": "Hassel",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Lind",
  "card.allergen.maple": "Lönn",
  "card.allergen.mold_spores": "Mögelsporer",
  "card.allergen.mugwort": "Gråbo",
  "card.allergen.nettle": "Brännässla",
  "card.allergen.nettle_and_pellitory": "Nässla & parietaria",
  "card.allergen.no2": "Kvävedioxid",
  "card.allergen.oak": "Ek",
  "card.allergen.olive": "Oliv",
  "card.allergen.ozone": "Ozon",
  "card.allergen.pine": "Tall",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Groblad",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Gräs",
  "card.allergen.poplar": "Poppel",
  "card.allergen.qualite_globale": "Luftkvalitet",
  "card.allergen.ragweed": "Malörtsambrosia",
  "card.allergen.rye": "Råg",
  "card.allergen.so2": "Svaveldioxid",
  "card.allergen.sorrel": "Skräppa",
  "card.allergen.trees": "Träd",
  "card.allergen.trees_cat": "Träd",
  "card.allergen.weeds": "Ogräs",
  "card.allergen.weeds_cat": "Ogräs",
  "card.allergen.willow": "Sälg och viden",
  "card.days.0": "Idag",
  "card.days.1": "Imorgon",
  "card.days.2": "I övermorgon",
  "card.error": "Inga pollen-sensorer hittades. Har du installerat rätt integration och valt region i kortets konfiguration?",
  "card.error_filtered_sensors": "Inga sensorer matchar din filtrering. Kontrollera valda allergener och tröskel.",
  "card.error_location_not_found": "Platsen hittades inte. Kontrollera platsnamnet i kortkonfigurationen.",
  "card.error_entity_unavailable": "Väderentiteten är inte tillgänglig. Integrationen kan vara offline eller omstartar.",
  "card.error_no_sensors": "Inga pollen-sensorer hittades. Har du installerat rätt integration och valt region i kortets konfiguration?",
  "card.header_prefix": "Pollenprognos för",
  "card.header_no_location": "Pollenprognos",
  "card.integration.atmo": "Atmo France",
  "card.integration.gpl": "Google Pollen",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
  "card.integration.pp": "PollenPrognos",
  "card.integration.silam": "SILAM Pollen",
  "card.integration.undefined": "Ingen pollen-sensor-integration hittades",
  "card.levels.0": "Ingen pollen",
  "card.levels.1": "Låga halter",
  "card.levels.2": "Låga–måttliga halter",
  "card.levels.3": "Måttliga halter",
  "card.levels.4": "Måttliga–höga halter",
  "card.levels.5": "Höga halter",
  "card.levels.6": "Mycket höga halter",
  "card.index.very_low": "Mycket låga halter",
  "card.loading_forecast": "Laddar prognos...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Inga allergener",
  "card.no_information": "(Ingen information)",
  "card.atmo.unavailable": "Otillgänglig",
  "card.atmo.event": "Händelse",
  "card.stale_allergen": "Inga data",
  "card.stale_data": "Pollendata är tillfälligt otillgänglig",
  "card.stale_data_subtitle": "Leverantören returnerar för närvarande inga data för denna region",
  "editor.allergen_color_custom": "Anpassade färger",
  "editor.allergen_color_default_colors": "Standardfärger",
  "editor.allergen_color_mode": "Allergen färgläge",
  "editor.allergen_colors": "Allergenfärger (per nivå)",
  "editor.allergen_colors_header": "Allergenutseende",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Återställ till standard",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Synkronisera mellanrum med allergenets linjetjocklek",
  "editor.allergen_outline_color": "Konturfärg",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Återställ kontur",
  "editor.allergen_stroke_color_synced": "Synkronisera linjefärg med nivå",
  "editor.allergen_stroke_width": "Linjetjocklek",
  "editor.allergen_stroke_width_reset": "Återställ linjetjocklek",
  "editor.allergens": "Allergener",
  "editor.allergens_abbreviated": "Förkorta allergener",
  "editor.allergens_header_category": "Kategori-allergener (generellt)",
  "editor.allergens_header_pollen": "Pollen",
  "editor.allergens_header_pollution": "Luftkvalitet",
  "editor.allergens_header_specific": "Individuella allergener (specifika)",
  "editor.allergens_header_summary": "Sammanfattning",
  "editor.allergy_risk_top": "Allergirisk överst i listan",
  "editor.background_color": "Bakgrundsfärg",
  "editor.background_color_picker": "Välj färg",
  "editor.background_color_placeholder": "t.ex. #ffeecc eller var(--my-color)",
  "editor.card_version": "Version av pollenprognoskortet",
  "editor.city": "Stad",
  "editor.days_abbreviated": "Förkorta veckodagar",
  "editor.days_boldfaced": "Fetstil veckodagar",
  "editor.days_relative": "Relativa dagar (idag/imorgon)",
  "editor.days_uppercase": "Versaler veckodagar",
  "editor.debug": "Debug",
  "editor.entity_prefix": "Entitetprefix",
  "editor.entity_prefix_placeholder": "t.ex. pollen_",
  "editor.entity_suffix": "Entitetsuffix",
  "editor.entity_suffix_placeholder": "t.ex. _home",
  "editor.icon_color_custom": "Anpassad färg",
  "editor.icon_color_inherit": "Ärv från diagram",
  "editor.icon_color_mode": "Ikonfärgläge",
  "editor.icon_color_picker": "Välj ikonfärg",
  "editor.icon_size": "Ikonstorlek (px)",
  "editor.index_top": "Index överst i listan",
  "editor.integration": "Integration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.gpl": "Google Pollen",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
  "editor.integration.pp": "PollenPrognos",
  "editor.integration.silam": "SILAM Pollen",
  "editor.levels_colors": "Segmentfärger",
  "editor.levels_colors_placeholder": "t.ex. #ffeecc eller var(--my-color)",
  "editor.levels_custom": "Använd anpassade nivåfärger",
  "editor.levels_empty_color": "Färg för tomt segment",
  "editor.levels_gap": "Gap (px)",
  "editor.levels_gap_color": "Gapfärg",
  "editor.levels_gap_inherited": "Mellanrum (ärvt från allergen)",
  "editor.levels_header": "Nivåcirklars utseende",
  "editor.levels_icon_ratio": "Ikonförhållande för nivåer",
  "editor.levels_inherit_allergen": "Ärv från allergenfärger",
  "editor.levels_inherit_header": "Nivåcirklar arv",
  "editor.levels_inherit_mode": "Nivåcirkelfärgläge",
  "editor.levels_reset": "Återställ till standard",
  "editor.levels_text_color": "Textfärg (inre cirkel)",
  "editor.levels_text_size": "Textstorlek (inre cirkel, % av normal)",
  "editor.levels_text_weight": "Texttjocklek (inre cirkel)",
  "editor.levels_thickness": "Tjocklek (%)",
  "editor.link_to_sensors": "Koppla allergener till sensorer",
  "editor.locale": "Locale",
  "editor.location": "Plats",
  "editor.location_autodetect": "Autoidentifiera",
  "editor.location_manual": "Manuell",
  "editor.minimal": "Minimalt läge",
  "editor.minimal_gap": "Avstånd mellan allergener (px)",
  "editor.mode": "Läge",
  "editor.mode_daily": "Dagligen",
  "editor.mode_hourly": "Varje timme",
  "editor.mode_hourly_eighth": "Var åttonde timme",
  "editor.mode_hourly_fourth": "Var fjärde timme",
  "editor.mode_hourly_second": "Varannan timme",
  "editor.mode_hourly_sixth": "Var sjätte timme",
  "editor.mode_hourly_third": "Var tredje timme",
  "editor.mode_twice_daily": "Två gånger dagligen",
  "editor.no_allergens_color": "Inga allergener",
  "editor.no_allergens_color_placeholder": "#a9cfe0",
  "editor.no_allergens_color_reset": "Återställ färg utan allergener",
  "editor.no_information": "Ingen information",
  "editor.numeric_state_raw_risk": "Visa råvärde (allergirisk)",
  "editor.peu_nondaily_expl": "Endast 'allergen_risk' är tillgänglig i icke-dagliga lägen.",
  "editor.phrases": "Fraser",
  "editor.phrases_apply": "Utför",
  "editor.phrases_days": "Relativa dagar",
  "editor.phrases_days.0": "Idag",
  "editor.phrases_days.1": "Imorgon",
  "editor.phrases_days.2": "I övermorgon",
  "editor.phrases_full": "Allergener",
  "editor.phrases_full.alder": "Al",
  "editor.phrases_full.allergy_risk": "Allergirisk",
  "editor.phrases_full.ash": "Asp",
  "editor.phrases_full.beech": "Bok",
  "editor.phrases_full.birch": "Björk",
  "editor.phrases_full.chenopod": "Svinmålla",
  "editor.phrases_full.cypress": "Cypress",
  "editor.phrases_full.elm": "Alm",
  "editor.phrases_full.goosefoot": "Målla",
  "editor.phrases_full.grass": "Gräs",
  "editor.phrases_full.grass_cat": "Gräsarter",
  "editor.phrases_full.hazel": "Hassel",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Lind",
  "editor.phrases_full.maple": "Lönn",
  "editor.phrases_full.mold_spores": "Mögelsporer",
  "editor.phrases_full.mugwort": "Gråbo",
  "editor.phrases_full.nettle": "Brännässla",
  "editor.phrases_full.nettle_and_pellitory": "Nässla & parietaria",
  "editor.phrases_full.no2": "Kvävedioxid",
  "editor.phrases_full.oak": "Ek",
  "editor.phrases_full.olive": "Oliv",
  "editor.phrases_full.ozone": "Ozon",
  "editor.phrases_full.pine": "Tall",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Groblad",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Gräs",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.qualite_globale": "Luftkvalitet",
  "editor.phrases_full.ragweed": "Malörtsambrosia",
  "editor.phrases_full.rye": "Råg",
  "editor.phrases_full.so2": "Svaveldioxid",
  "editor.phrases_full.sorrel": "Skräppa",
  "editor.phrases_full.trees": "Träd",
  "editor.phrases_full.trees_cat": "Träd",
  "editor.phrases_full.weeds": "Ogräs",
  "editor.phrases_full.weeds_cat": "Ogräs",
  "editor.phrases_full.willow": "Sälg och viden",
  "editor.phrases_levels": "Allergennivåer",
  "editor.phrases_levels.0": "Ingen pollen",
  "editor.phrases_levels.1": "Låga halter",
  "editor.phrases_levels.2": "Låga–måttliga halter",
  "editor.phrases_levels.3": "Måttliga halter",
  "editor.phrases_levels.4": "Måttliga–höga halter",
  "editor.phrases_levels.5": "Höga halter",
  "editor.phrases_levels.6": "Mycket höga halter",
  "editor.phrases_short": "Allergener, kort",
  "editor.phrases_short.alder": "Al",
  "editor.phrases_short.allergy_risk": "Risk",
  "editor.phrases_short.ash": "Ask",
  "editor.phrases_short.beech": "Bok",
  "editor.phrases_short.birch": "Björk",
  "editor.phrases_short.chenopod": "Svinm",
  "editor.phrases_short.cypress": "Cyp.",
  "editor.phrases_short.elm": "Alm",
  "editor.phrases_short.goosefoot": "Måll",
  "editor.phrases_short.grass": "Gräs",
  "editor.phrases_short.grass_cat": "Gräs",
  "editor.phrases_short.grasses": "Gräs",
  "editor.phrases_short.hazel": "Hass",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Lind",
  "editor.phrases_short.maple": "Lönn",
  "editor.phrases_short.mold_spores": "Mögel",
  "editor.phrases_short.mugwort": "Gråbo",
  "editor.phrases_short.nettle": "Bränns",
  "editor.phrases_short.nettle_and_pellitory": "Nässla",
  "editor.phrases_short.no2": "NO₂",
  "editor.phrases_short.oak": "Ek",
  "editor.phrases_short.olive": "Oliv",
  "editor.phrases_short.ozone": "O₃",
  "editor.phrases_short.pine": "Tall",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Grob",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Gräs",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.qualite_globale": "LKI",
  "editor.phrases_short.ragweed": "Ambro",
  "editor.phrases_short.rye": "Råg",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Skrä",
  "editor.phrases_short.trees": "Träd",
  "editor.phrases_short.trees_cat": "Träd",
  "editor.phrases_short.weeds": "Ogräs",
  "editor.phrases_short.weeds_cat": "Ogräs",
  "editor.phrases_short.willow": "Vide",
  "editor.phrases_translate_all": "Översätt allt",
  "editor.pollen_threshold": "Tröskelvärde:",
  "editor.pollution_block_bottom": "Underst (under pollen)",
  "editor.pollution_block_position": "Position för luftkvalitet",
  "editor.pollution_block_top": "Överst (ovanför pollen)",
  "editor.preset_reset_all": "Återställ allt",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Välj alla allergener",
  "editor.select_all_pollen": "Välj pollen",
  "editor.select_all_pollution": "Välj luftkvalitet",
  "editor.show_empty_days": "Visa tomma dagar",
  "editor.show_text_allergen": "Visa text, allergen",
  "editor.show_value_numeric": "Visa värde, numeriskt",
  "editor.show_value_numeric_in_circle": "Visa numeriskt värde inuti cirklarna",
  "editor.show_value_text": "Visa värde, text",
  "editor.show_version": "Logga version i konsolen",
  "editor.sort": "Sortering",
  "editor.sort_category_allergens_first": "Sortera kategoriallergener överst",
  "editor.sort_name_ascending": "namn, stigande",
  "editor.sort_name_descending": "namn, fallande",
  "editor.sort_none": "ingen (konfigurationsordning)",
  "editor.sort_pollution_block": "Gruppera luftkvalitet separat",
  "editor.show_block_separator": "Visa separator mellan block",
  "editor.sort_value_ascending": "värde, stigande",
  "editor.sort_value_descending": "värde, fallande",
  "editor.summary_advanced": "Avancerat",
  "editor.summary_allergens": "Allergener",
  "editor.summary_appearance_and_layout": "Utseende och layout",
  "editor.summary_card_interactivity": "Kortinteraktivitet",
  "editor.summary_card_layout_and_colors": "Kortlayout och färger",
  "editor.summary_data_view_settings": "Datavisningsinställningar",
  "editor.summary_day_view_settings": "Dagvisningsinställningar",
  "editor.summary_entity_prefix_suffix": "Eget prefix och suffix",
  "editor.summary_functional_settings": "Funktionella inställningar",
  "editor.summary_integration_and_place": "Integration och plats",
  "editor.summary_minimal": "Minimal",
  "editor.summary_title_and_header": "Titel och rubrik",
  "editor.summary_translation_and_strings": "Översättning och texter",
  "editor.tap_action": "Tryckåtgärd",
  "editor.tap_action_enable": "Aktivera tryckåtgärd",
  "editor.text_size_ratio": "Textstorlek (%)",
  "editor.title": "Rubrik på kortet",
  "editor.title_automatic": "Automatisk rubrik",
  "editor.title_hide": "Göm rubrik",
  "editor.title_placeholder": "(automatisk)",
  "editor.to_show_columns": "Antal kolumner som visas",
  "editor.to_show_days": "Antal dagar som visas",
  "editor.to_show_hours": "Antal timmar som visas"
}, Ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zc
}, Symbol.toStringTag, { value: "Module" }));
var bo = function(t, e) {
  return bo = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
    r.__proto__ = i;
  } || function(r, i) {
    for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (r[o] = i[o]);
  }, bo(t, e);
};
function Mi(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  bo(t, e);
  function r() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (r.prototype = e.prototype, new r());
}
var Z = function() {
  return Z = Object.assign || function(e) {
    for (var r, i = 1, o = arguments.length; i < o; i++) {
      r = arguments[i];
      for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    }
    return e;
  }, Z.apply(this, arguments);
};
function Lc(t, e) {
  var r = {};
  for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (r[i] = t[i]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, i = Object.getOwnPropertySymbols(t); o < i.length; o++)
      e.indexOf(i[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[o]) && (r[i[o]] = t[i[o]]);
  return r;
}
function qi(t, e, r) {
  if (r || arguments.length === 2) for (var i = 0, o = e.length, s; i < o; i++)
    (s || !(i in e)) && (s || (s = Array.prototype.slice.call(e, 0, i)), s[i] = e[i]);
  return t.concat(s || Array.prototype.slice.call(e));
}
function Xi(t, e) {
  var r = e && e.cache ? e.cache : Nc, i = e && e.serializer ? e.serializer : Ic, o = e && e.strategy ? e.strategy : $c;
  return o(t, {
    cache: r,
    serializer: i
  });
}
function Tc(t) {
  return t == null || typeof t == "number" || typeof t == "boolean";
}
function Dc(t, e, r, i) {
  var o = Tc(i) ? i : r(i), s = e.get(o);
  return typeof s > "u" && (s = t.call(this, i), e.set(o, s)), s;
}
function ba(t, e, r) {
  var i = Array.prototype.slice.call(arguments, 3), o = r(i), s = e.get(o);
  return typeof s > "u" && (s = t.apply(this, i), e.set(o, s)), s;
}
function xa(t, e, r, i, o) {
  return r.bind(e, t, i, o);
}
function $c(t, e) {
  var r = t.length === 1 ? Dc : ba;
  return xa(t, this, r, e.cache.create(), e.serializer);
}
function Oc(t, e) {
  return xa(t, this, ba, e.cache.create(), e.serializer);
}
var Ic = function() {
  return JSON.stringify(arguments);
}, Rc = (
  /** @class */
  (function() {
    function t() {
      this.cache = /* @__PURE__ */ Object.create(null);
    }
    return t.prototype.get = function(e) {
      return this.cache[e];
    }, t.prototype.set = function(e, r) {
      this.cache[e] = r;
    }, t;
  })()
), Nc = {
  create: function() {
    return new Rc();
  }
}, Zi = {
  variadic: Oc
}, q;
(function(t) {
  t[t.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", t[t.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", t[t.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", t[t.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", t[t.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", t[t.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", t[t.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", t[t.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", t[t.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", t[t.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", t[t.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", t[t.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", t[t.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", t[t.INVALID_TAG = 23] = "INVALID_TAG", t[t.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", t[t.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", t[t.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(q || (q = {}));
var ie;
(function(t) {
  t[t.literal = 0] = "literal", t[t.argument = 1] = "argument", t[t.number = 2] = "number", t[t.date = 3] = "date", t[t.time = 4] = "time", t[t.select = 5] = "select", t[t.plural = 6] = "plural", t[t.pound = 7] = "pound", t[t.tag = 8] = "tag";
})(ie || (ie = {}));
var Vt;
(function(t) {
  t[t.number = 0] = "number", t[t.dateTime = 1] = "dateTime";
})(Vt || (Vt = {}));
function Es(t) {
  return t.type === ie.literal;
}
function Bc(t) {
  return t.type === ie.argument;
}
function wa(t) {
  return t.type === ie.number;
}
function ka(t) {
  return t.type === ie.date;
}
function Sa(t) {
  return t.type === ie.time;
}
function Aa(t) {
  return t.type === ie.select;
}
function Pa(t) {
  return t.type === ie.plural;
}
function Hc(t) {
  return t.type === ie.pound;
}
function Ca(t) {
  return t.type === ie.tag;
}
function Ma(t) {
  return !!(t && typeof t == "object" && t.type === Vt.number);
}
function xo(t) {
  return !!(t && typeof t == "object" && t.type === Vt.dateTime);
}
var za = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, jc = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function Fc(t) {
  var e = {};
  return t.replace(jc, function(r) {
    var i = r.length;
    switch (r[0]) {
      // Era
      case "G":
        e.era = i === 4 ? "long" : i === 5 ? "narrow" : "short";
        break;
      // Year
      case "y":
        e.year = i === 2 ? "2-digit" : "numeric";
        break;
      case "Y":
      case "u":
      case "U":
      case "r":
        throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
      // Quarter
      case "q":
      case "Q":
        throw new RangeError("`q/Q` (quarter) patterns are not supported");
      // Month
      case "M":
      case "L":
        e.month = ["numeric", "2-digit", "short", "long", "narrow"][i - 1];
        break;
      // Week
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        e.day = ["numeric", "2-digit"][i - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      // Weekday
      case "E":
        e.weekday = i === 4 ? "long" : i === 5 ? "narrow" : "short";
        break;
      case "e":
        if (i < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][i - 4];
        break;
      case "c":
        if (i < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][i - 4];
        break;
      // Period
      case "a":
        e.hour12 = !0;
        break;
      case "b":
      // am, pm, noon, midnight
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      // Hour
      case "h":
        e.hourCycle = "h12", e.hour = ["numeric", "2-digit"][i - 1];
        break;
      case "H":
        e.hourCycle = "h23", e.hour = ["numeric", "2-digit"][i - 1];
        break;
      case "K":
        e.hourCycle = "h11", e.hour = ["numeric", "2-digit"][i - 1];
        break;
      case "k":
        e.hourCycle = "h24", e.hour = ["numeric", "2-digit"][i - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      // Minute
      case "m":
        e.minute = ["numeric", "2-digit"][i - 1];
        break;
      // Second
      case "s":
        e.second = ["numeric", "2-digit"][i - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      // Zone
      case "z":
        e.timeZoneName = i < 4 ? "short" : "long";
        break;
      case "Z":
      // 1..3, 4, 5: The ISO8601 varios formats
      case "O":
      // 1, 4: milliseconds in day short, long
      case "v":
      // 1, 4: generic non-location format
      case "V":
      // 1, 2, 3, 4: time zone ID or city
      case "X":
      // 1, 2, 3, 4: The ISO8601 varios formats
      case "x":
        throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
    }
    return "";
  }), e;
}
var Vc = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function Gc(t) {
  if (t.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var e = t.split(Vc).filter(function(u) {
    return u.length > 0;
  }), r = [], i = 0, o = e; i < o.length; i++) {
    var s = o[i], a = s.split("/");
    if (a.length === 0)
      throw new Error("Invalid number skeleton");
    for (var n = a[0], l = a.slice(1), d = 0, c = l; d < c.length; d++) {
      var h = c[d];
      if (h.length === 0)
        throw new Error("Invalid number skeleton");
    }
    r.push({ stem: n, options: l });
  }
  return r;
}
function Wc(t) {
  return t.replace(/^(.*?)-/, "");
}
var Ls = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, Ea = /^(@+)?(\+|#+)?[rs]?$/g, Uc = /(\*)(0+)|(#+)(0+)|(0+)/g, La = /^(0+)$/;
function Ts(t) {
  var e = {};
  return t[t.length - 1] === "r" ? e.roundingPriority = "morePrecision" : t[t.length - 1] === "s" && (e.roundingPriority = "lessPrecision"), t.replace(Ea, function(r, i, o) {
    return typeof o != "string" ? (e.minimumSignificantDigits = i.length, e.maximumSignificantDigits = i.length) : o === "+" ? e.minimumSignificantDigits = i.length : i[0] === "#" ? e.maximumSignificantDigits = i.length : (e.minimumSignificantDigits = i.length, e.maximumSignificantDigits = i.length + (typeof o == "string" ? o.length : 0)), "";
  }), e;
}
function Ta(t) {
  switch (t) {
    case "sign-auto":
      return {
        signDisplay: "auto"
      };
    case "sign-accounting":
    case "()":
      return {
        currencySign: "accounting"
      };
    case "sign-always":
    case "+!":
      return {
        signDisplay: "always"
      };
    case "sign-accounting-always":
    case "()!":
      return {
        signDisplay: "always",
        currencySign: "accounting"
      };
    case "sign-except-zero":
    case "+?":
      return {
        signDisplay: "exceptZero"
      };
    case "sign-accounting-except-zero":
    case "()?":
      return {
        signDisplay: "exceptZero",
        currencySign: "accounting"
      };
    case "sign-never":
    case "+_":
      return {
        signDisplay: "never"
      };
  }
}
function Kc(t) {
  var e;
  if (t[0] === "E" && t[1] === "E" ? (e = {
    notation: "engineering"
  }, t = t.slice(2)) : t[0] === "E" && (e = {
    notation: "scientific"
  }, t = t.slice(1)), e) {
    var r = t.slice(0, 2);
    if (r === "+!" ? (e.signDisplay = "always", t = t.slice(2)) : r === "+?" && (e.signDisplay = "exceptZero", t = t.slice(2)), !La.test(t))
      throw new Error("Malformed concise eng/scientific notation");
    e.minimumIntegerDigits = t.length;
  }
  return e;
}
function Ds(t) {
  var e = {}, r = Ta(t);
  return r || e;
}
function Yc(t) {
  for (var e = {}, r = 0, i = t; r < i.length; r++) {
    var o = i[r];
    switch (o.stem) {
      case "percent":
      case "%":
        e.style = "percent";
        continue;
      case "%x100":
        e.style = "percent", e.scale = 100;
        continue;
      case "currency":
        e.style = "currency", e.currency = o.options[0];
        continue;
      case "group-off":
      case ",_":
        e.useGrouping = !1;
        continue;
      case "precision-integer":
      case ".":
        e.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        e.style = "unit", e.unit = Wc(o.options[0]);
        continue;
      case "compact-short":
      case "K":
        e.notation = "compact", e.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        e.notation = "compact", e.compactDisplay = "long";
        continue;
      case "scientific":
        e = Z(Z(Z({}, e), { notation: "scientific" }), o.options.reduce(function(l, d) {
          return Z(Z({}, l), Ds(d));
        }, {}));
        continue;
      case "engineering":
        e = Z(Z(Z({}, e), { notation: "engineering" }), o.options.reduce(function(l, d) {
          return Z(Z({}, l), Ds(d));
        }, {}));
        continue;
      case "notation-simple":
        e.notation = "standard";
        continue;
      // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
      case "unit-width-narrow":
        e.currencyDisplay = "narrowSymbol", e.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        e.currencyDisplay = "code", e.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        e.currencyDisplay = "name", e.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        e.currencyDisplay = "symbol";
        continue;
      case "scale":
        e.scale = parseFloat(o.options[0]);
        continue;
      case "rounding-mode-floor":
        e.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        e.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        e.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        e.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        e.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        e.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        e.roundingMode = "halfExpand";
        continue;
      // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
      case "integer-width":
        if (o.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        o.options[0].replace(Uc, function(l, d, c, h, u, _) {
          if (d)
            e.minimumIntegerDigits = c.length;
          else {
            if (h && u)
              throw new Error("We currently do not support maximum integer digits");
            if (_)
              throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (La.test(o.stem)) {
      e.minimumIntegerDigits = o.stem.length;
      continue;
    }
    if (Ls.test(o.stem)) {
      if (o.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      o.stem.replace(Ls, function(l, d, c, h, u, _) {
        return c === "*" ? e.minimumFractionDigits = d.length : h && h[0] === "#" ? e.maximumFractionDigits = h.length : u && _ ? (e.minimumFractionDigits = u.length, e.maximumFractionDigits = u.length + _.length) : (e.minimumFractionDigits = d.length, e.maximumFractionDigits = d.length), "";
      });
      var s = o.options[0];
      s === "w" ? e = Z(Z({}, e), { trailingZeroDisplay: "stripIfInteger" }) : s && (e = Z(Z({}, e), Ts(s)));
      continue;
    }
    if (Ea.test(o.stem)) {
      e = Z(Z({}, e), Ts(o.stem));
      continue;
    }
    var a = Ta(o.stem);
    a && (e = Z(Z({}, e), a));
    var n = Kc(o.stem);
    n && (e = Z(Z({}, e), n));
  }
  return e;
}
var jr = {
  "001": [
    "H",
    "h"
  ],
  419: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  AC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AD: [
    "H",
    "hB"
  ],
  AE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  AF: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  AG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  AL: [
    "h",
    "H",
    "hB"
  ],
  AM: [
    "H",
    "hB"
  ],
  AO: [
    "H",
    "hB"
  ],
  AR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  AS: [
    "h",
    "H"
  ],
  AT: [
    "H",
    "hB"
  ],
  AU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  AW: [
    "H",
    "hB"
  ],
  AX: [
    "H"
  ],
  AZ: [
    "H",
    "hB",
    "h"
  ],
  BA: [
    "H",
    "hB",
    "h"
  ],
  BB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BD: [
    "h",
    "hB",
    "H"
  ],
  BE: [
    "H",
    "hB"
  ],
  BF: [
    "H",
    "hB"
  ],
  BG: [
    "H",
    "hB",
    "h"
  ],
  BH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  BI: [
    "H",
    "h"
  ],
  BJ: [
    "H",
    "hB"
  ],
  BL: [
    "H",
    "hB"
  ],
  BM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BN: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  BO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  BQ: [
    "H"
  ],
  BR: [
    "H",
    "hB"
  ],
  BS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  BT: [
    "h",
    "H"
  ],
  BW: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  BY: [
    "H",
    "h"
  ],
  BZ: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CA: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  CC: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CD: [
    "hB",
    "H"
  ],
  CF: [
    "H",
    "h",
    "hB"
  ],
  CG: [
    "H",
    "hB"
  ],
  CH: [
    "H",
    "hB",
    "h"
  ],
  CI: [
    "H",
    "hB"
  ],
  CK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CL: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CM: [
    "H",
    "h",
    "hB"
  ],
  CN: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  CO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CP: [
    "H"
  ],
  CR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CU: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  CV: [
    "H",
    "hB"
  ],
  CW: [
    "H",
    "hB"
  ],
  CX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  CY: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  CZ: [
    "H"
  ],
  DE: [
    "H",
    "hB"
  ],
  DG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  DJ: [
    "h",
    "H"
  ],
  DK: [
    "H"
  ],
  DM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  DO: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  DZ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  EC: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  EE: [
    "H",
    "hB"
  ],
  EG: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  EH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  ER: [
    "h",
    "H"
  ],
  ES: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  ET: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  FI: [
    "H"
  ],
  FJ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  FM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  FO: [
    "H",
    "h"
  ],
  FR: [
    "H",
    "hB"
  ],
  GA: [
    "H",
    "hB"
  ],
  GB: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GD: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GE: [
    "H",
    "hB",
    "h"
  ],
  GF: [
    "H",
    "hB"
  ],
  GG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GH: [
    "h",
    "H"
  ],
  GI: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  GL: [
    "H",
    "h"
  ],
  GM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GN: [
    "H",
    "hB"
  ],
  GP: [
    "H",
    "hB"
  ],
  GQ: [
    "H",
    "hB",
    "h",
    "hb"
  ],
  GR: [
    "h",
    "H",
    "hb",
    "hB"
  ],
  GT: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  GU: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  GW: [
    "H",
    "hB"
  ],
  GY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  HK: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  HN: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  HR: [
    "H",
    "hB"
  ],
  HU: [
    "H",
    "h"
  ],
  IC: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  ID: [
    "H"
  ],
  IE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IL: [
    "H",
    "hB"
  ],
  IM: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IN: [
    "h",
    "H"
  ],
  IO: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  IQ: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  IR: [
    "hB",
    "H"
  ],
  IS: [
    "H"
  ],
  IT: [
    "H",
    "hB"
  ],
  JE: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  JM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  JO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  JP: [
    "H",
    "K",
    "h"
  ],
  KE: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  KG: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KH: [
    "hB",
    "h",
    "H",
    "hb"
  ],
  KI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KM: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  KN: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KP: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  KW: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  KY: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  KZ: [
    "H",
    "hB"
  ],
  LA: [
    "H",
    "hb",
    "hB",
    "h"
  ],
  LB: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  LC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LI: [
    "H",
    "hB",
    "h"
  ],
  LK: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  LR: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  LS: [
    "h",
    "H"
  ],
  LT: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  LU: [
    "H",
    "h",
    "hB"
  ],
  LV: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  LY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MA: [
    "H",
    "h",
    "hB",
    "hb"
  ],
  MC: [
    "H",
    "hB"
  ],
  MD: [
    "H",
    "hB"
  ],
  ME: [
    "H",
    "hB",
    "h"
  ],
  MF: [
    "H",
    "hB"
  ],
  MG: [
    "H",
    "h"
  ],
  MH: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MK: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ML: [
    "H"
  ],
  MM: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  MN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MO: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MP: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MQ: [
    "H",
    "hB"
  ],
  MR: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  MS: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  MT: [
    "H",
    "h"
  ],
  MU: [
    "H",
    "h"
  ],
  MV: [
    "H",
    "h"
  ],
  MW: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  MX: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  MY: [
    "hb",
    "hB",
    "h",
    "H"
  ],
  MZ: [
    "H",
    "hB"
  ],
  NA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NC: [
    "H",
    "hB"
  ],
  NE: [
    "H"
  ],
  NF: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NG: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NI: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  NL: [
    "H",
    "hB"
  ],
  NO: [
    "H",
    "h"
  ],
  NP: [
    "H",
    "h",
    "hB"
  ],
  NR: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NU: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  NZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  OM: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PA: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PF: [
    "H",
    "h",
    "hB"
  ],
  PG: [
    "h",
    "H"
  ],
  PH: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PK: [
    "h",
    "hB",
    "H"
  ],
  PL: [
    "H",
    "h"
  ],
  PM: [
    "H",
    "hB"
  ],
  PN: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  PR: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  PS: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  PT: [
    "H",
    "hB"
  ],
  PW: [
    "h",
    "H"
  ],
  PY: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  QA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  RE: [
    "H",
    "hB"
  ],
  RO: [
    "H",
    "hB"
  ],
  RS: [
    "H",
    "hB",
    "h"
  ],
  RU: [
    "H"
  ],
  RW: [
    "H",
    "h"
  ],
  SA: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SB: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SC: [
    "H",
    "h",
    "hB"
  ],
  SD: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SE: [
    "H"
  ],
  SG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SH: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SI: [
    "H",
    "hB"
  ],
  SJ: [
    "H"
  ],
  SK: [
    "H"
  ],
  SL: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  SM: [
    "H",
    "h",
    "hB"
  ],
  SN: [
    "H",
    "h",
    "hB"
  ],
  SO: [
    "h",
    "H"
  ],
  SR: [
    "H",
    "hB"
  ],
  SS: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ST: [
    "H",
    "hB"
  ],
  SV: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  SX: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  SY: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  SZ: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  TC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TD: [
    "h",
    "H",
    "hB"
  ],
  TF: [
    "H",
    "h",
    "hB"
  ],
  TG: [
    "H",
    "hB"
  ],
  TH: [
    "H",
    "h"
  ],
  TJ: [
    "H",
    "h"
  ],
  TL: [
    "H",
    "hB",
    "hb",
    "h"
  ],
  TM: [
    "H",
    "h"
  ],
  TN: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  TO: [
    "h",
    "H"
  ],
  TR: [
    "H",
    "hB"
  ],
  TT: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  TW: [
    "hB",
    "hb",
    "h",
    "H"
  ],
  TZ: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UA: [
    "H",
    "hB",
    "h"
  ],
  UG: [
    "hB",
    "hb",
    "H",
    "h"
  ],
  UM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  US: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  UY: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  UZ: [
    "H",
    "hB",
    "h"
  ],
  VA: [
    "H",
    "h",
    "hB"
  ],
  VC: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VE: [
    "h",
    "H",
    "hB",
    "hb"
  ],
  VG: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VI: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  VN: [
    "H",
    "h"
  ],
  VU: [
    "h",
    "H"
  ],
  WF: [
    "H",
    "hB"
  ],
  WS: [
    "h",
    "H"
  ],
  XK: [
    "H",
    "hB",
    "h"
  ],
  YE: [
    "h",
    "hB",
    "hb",
    "H"
  ],
  YT: [
    "H",
    "hB"
  ],
  ZA: [
    "H",
    "h",
    "hb",
    "hB"
  ],
  ZM: [
    "h",
    "hb",
    "H",
    "hB"
  ],
  ZW: [
    "H",
    "h"
  ],
  "af-ZA": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "ar-001": [
    "h",
    "hB",
    "hb",
    "H"
  ],
  "ca-ES": [
    "H",
    "h",
    "hB"
  ],
  "en-001": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-HK": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "en-IL": [
    "H",
    "h",
    "hb",
    "hB"
  ],
  "en-MY": [
    "h",
    "hb",
    "H",
    "hB"
  ],
  "es-BR": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-ES": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "es-GQ": [
    "H",
    "h",
    "hB",
    "hb"
  ],
  "fr-CA": [
    "H",
    "h",
    "hB"
  ],
  "gl-ES": [
    "H",
    "h",
    "hB"
  ],
  "gu-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "hi-IN": [
    "hB",
    "h",
    "H"
  ],
  "it-CH": [
    "H",
    "h",
    "hB"
  ],
  "it-IT": [
    "H",
    "h",
    "hB"
  ],
  "kn-IN": [
    "hB",
    "h",
    "H"
  ],
  "ml-IN": [
    "hB",
    "h",
    "H"
  ],
  "mr-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "pa-IN": [
    "hB",
    "hb",
    "h",
    "H"
  ],
  "ta-IN": [
    "hB",
    "h",
    "hb",
    "H"
  ],
  "te-IN": [
    "hB",
    "h",
    "H"
  ],
  "zu-ZA": [
    "H",
    "hB",
    "hb",
    "h"
  ]
};
function qc(t, e) {
  for (var r = "", i = 0; i < t.length; i++) {
    var o = t.charAt(i);
    if (o === "j") {
      for (var s = 0; i + 1 < t.length && t.charAt(i + 1) === o; )
        s++, i++;
      var a = 1 + (s & 1), n = s < 2 ? 1 : 3 + (s >> 1), l = "a", d = Xc(e);
      for ((d == "H" || d == "k") && (n = 0); n-- > 0; )
        r += l;
      for (; a-- > 0; )
        r = d + r;
    } else o === "J" ? r += "H" : r += o;
  }
  return r;
}
function Xc(t) {
  var e = t.hourCycle;
  if (e === void 0 && // @ts-ignore hourCycle(s) is not identified yet
  t.hourCycles && // @ts-ignore
  t.hourCycles.length && (e = t.hourCycles[0]), e)
    switch (e) {
      case "h24":
        return "k";
      case "h23":
        return "H";
      case "h12":
        return "h";
      case "h11":
        return "K";
      default:
        throw new Error("Invalid hourCycle");
    }
  var r = t.language, i;
  r !== "root" && (i = t.maximize().region);
  var o = jr[i || ""] || jr[r || ""] || jr["".concat(r, "-001")] || jr["001"];
  return o[0];
}
var Qi, Zc = new RegExp("^".concat(za.source, "*")), Qc = new RegExp("".concat(za.source, "*$"));
function X(t, e) {
  return { start: t, end: e };
}
var Jc = !!String.prototype.startsWith && "_a".startsWith("a", 1), eh = !!String.fromCodePoint, th = !!Object.fromEntries, rh = !!String.prototype.codePointAt, ih = !!String.prototype.trimStart, oh = !!String.prototype.trimEnd, sh = !!Number.isSafeInteger, nh = sh ? Number.isSafeInteger : function(t) {
  return typeof t == "number" && isFinite(t) && Math.floor(t) === t && Math.abs(t) <= 9007199254740991;
}, wo = !0;
try {
  var ah = $a("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  wo = ((Qi = ah.exec("a")) === null || Qi === void 0 ? void 0 : Qi[0]) === "a";
} catch {
  wo = !1;
}
var $s = Jc ? (
  // Native
  function(e, r, i) {
    return e.startsWith(r, i);
  }
) : (
  // For IE11
  function(e, r, i) {
    return e.slice(i, i + r.length) === r;
  }
), ko = eh ? String.fromCodePoint : (
  // IE11
  function() {
    for (var e = [], r = 0; r < arguments.length; r++)
      e[r] = arguments[r];
    for (var i = "", o = e.length, s = 0, a; o > s; ) {
      if (a = e[s++], a > 1114111)
        throw RangeError(a + " is not a valid code point");
      i += a < 65536 ? String.fromCharCode(a) : String.fromCharCode(((a -= 65536) >> 10) + 55296, a % 1024 + 56320);
    }
    return i;
  }
), Os = (
  // native
  th ? Object.fromEntries : (
    // Ponyfill
    function(e) {
      for (var r = {}, i = 0, o = e; i < o.length; i++) {
        var s = o[i], a = s[0], n = s[1];
        r[a] = n;
      }
      return r;
    }
  )
), Da = rh ? (
  // Native
  function(e, r) {
    return e.codePointAt(r);
  }
) : (
  // IE 11
  function(e, r) {
    var i = e.length;
    if (!(r < 0 || r >= i)) {
      var o = e.charCodeAt(r), s;
      return o < 55296 || o > 56319 || r + 1 === i || (s = e.charCodeAt(r + 1)) < 56320 || s > 57343 ? o : (o - 55296 << 10) + (s - 56320) + 65536;
    }
  }
), lh = ih ? (
  // Native
  function(e) {
    return e.trimStart();
  }
) : (
  // Ponyfill
  function(e) {
    return e.replace(Zc, "");
  }
), dh = oh ? (
  // Native
  function(e) {
    return e.trimEnd();
  }
) : (
  // Ponyfill
  function(e) {
    return e.replace(Qc, "");
  }
);
function $a(t, e) {
  return new RegExp(t, e);
}
var So;
if (wo) {
  var Is = $a("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  So = function(e, r) {
    var i;
    Is.lastIndex = r;
    var o = Is.exec(e);
    return (i = o[1]) !== null && i !== void 0 ? i : "";
  };
} else
  So = function(e, r) {
    for (var i = []; ; ) {
      var o = Da(e, r);
      if (o === void 0 || Oa(o) || _h(o))
        break;
      i.push(o), r += o >= 65536 ? 2 : 1;
    }
    return ko.apply(void 0, i);
  };
var ch = (
  /** @class */
  (function() {
    function t(e, r) {
      r === void 0 && (r = {}), this.message = e, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!r.ignoreTag, this.locale = r.locale, this.requiresOtherClause = !!r.requiresOtherClause, this.shouldParseSkeletons = !!r.shouldParseSkeletons;
    }
    return t.prototype.parse = function() {
      if (this.offset() !== 0)
        throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, t.prototype.parseMessage = function(e, r, i) {
      for (var o = []; !this.isEOF(); ) {
        var s = this.char();
        if (s === 123) {
          var a = this.parseArgument(e, i);
          if (a.err)
            return a;
          o.push(a.val);
        } else {
          if (s === 125 && e > 0)
            break;
          if (s === 35 && (r === "plural" || r === "selectordinal")) {
            var n = this.clonePosition();
            this.bump(), o.push({
              type: ie.pound,
              location: X(n, this.clonePosition())
            });
          } else if (s === 60 && !this.ignoreTag && this.peek() === 47) {
            if (i)
              break;
            return this.error(q.UNMATCHED_CLOSING_TAG, X(this.clonePosition(), this.clonePosition()));
          } else if (s === 60 && !this.ignoreTag && Ao(this.peek() || 0)) {
            var a = this.parseTag(e, r);
            if (a.err)
              return a;
            o.push(a.val);
          } else {
            var a = this.parseLiteral(e, r);
            if (a.err)
              return a;
            o.push(a.val);
          }
        }
      }
      return { val: o, err: null };
    }, t.prototype.parseTag = function(e, r) {
      var i = this.clonePosition();
      this.bump();
      var o = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>"))
        return {
          val: {
            type: ie.literal,
            value: "<".concat(o, "/>"),
            location: X(i, this.clonePosition())
          },
          err: null
        };
      if (this.bumpIf(">")) {
        var s = this.parseMessage(e + 1, r, !0);
        if (s.err)
          return s;
        var a = s.val, n = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !Ao(this.char()))
            return this.error(q.INVALID_TAG, X(n, this.clonePosition()));
          var l = this.clonePosition(), d = this.parseTagName();
          return o !== d ? this.error(q.UNMATCHED_CLOSING_TAG, X(l, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: ie.tag,
              value: o,
              children: a,
              location: X(i, this.clonePosition())
            },
            err: null
          } : this.error(q.INVALID_TAG, X(n, this.clonePosition())));
        } else
          return this.error(q.UNCLOSED_TAG, X(i, this.clonePosition()));
      } else
        return this.error(q.INVALID_TAG, X(i, this.clonePosition()));
    }, t.prototype.parseTagName = function() {
      var e = this.offset();
      for (this.bump(); !this.isEOF() && uh(this.char()); )
        this.bump();
      return this.message.slice(e, this.offset());
    }, t.prototype.parseLiteral = function(e, r) {
      for (var i = this.clonePosition(), o = ""; ; ) {
        var s = this.tryParseQuote(r);
        if (s) {
          o += s;
          continue;
        }
        var a = this.tryParseUnquoted(e, r);
        if (a) {
          o += a;
          continue;
        }
        var n = this.tryParseLeftAngleBracket();
        if (n) {
          o += n;
          continue;
        }
        break;
      }
      var l = X(i, this.clonePosition());
      return {
        val: { type: ie.literal, value: o, location: l },
        err: null
      };
    }, t.prototype.tryParseLeftAngleBracket = function() {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !hh(this.peek() || 0)) ? (this.bump(), "<") : null;
    }, t.prototype.tryParseQuote = function(e) {
      if (this.isEOF() || this.char() !== 39)
        return null;
      switch (this.peek()) {
        case 39:
          return this.bump(), this.bump(), "'";
        // '{', '<', '>', '}'
        case 123:
        case 60:
        case 62:
        case 125:
          break;
        case 35:
          if (e === "plural" || e === "selectordinal")
            break;
          return null;
        default:
          return null;
      }
      this.bump();
      var r = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var i = this.char();
        if (i === 39)
          if (this.peek() === 39)
            r.push(39), this.bump();
          else {
            this.bump();
            break;
          }
        else
          r.push(i);
        this.bump();
      }
      return ko.apply(void 0, r);
    }, t.prototype.tryParseUnquoted = function(e, r) {
      if (this.isEOF())
        return null;
      var i = this.char();
      return i === 60 || i === 123 || i === 35 && (r === "plural" || r === "selectordinal") || i === 125 && e > 0 ? null : (this.bump(), ko(i));
    }, t.prototype.parseArgument = function(e, r) {
      var i = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF())
        return this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, X(i, this.clonePosition()));
      if (this.char() === 125)
        return this.bump(), this.error(q.EMPTY_ARGUMENT, X(i, this.clonePosition()));
      var o = this.parseIdentifierIfPossible().value;
      if (!o)
        return this.error(q.MALFORMED_ARGUMENT, X(i, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF())
        return this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, X(i, this.clonePosition()));
      switch (this.char()) {
        // Simple argument: `{name}`
        case 125:
          return this.bump(), {
            val: {
              type: ie.argument,
              // value does not include the opening and closing braces.
              value: o,
              location: X(i, this.clonePosition())
            },
            err: null
          };
        // Argument with options: `{name, format, ...}`
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, X(i, this.clonePosition())) : this.parseArgumentOptions(e, r, o, i);
        default:
          return this.error(q.MALFORMED_ARGUMENT, X(i, this.clonePosition()));
      }
    }, t.prototype.parseIdentifierIfPossible = function() {
      var e = this.clonePosition(), r = this.offset(), i = So(this.message, r), o = r + i.length;
      this.bumpTo(o);
      var s = this.clonePosition(), a = X(e, s);
      return { value: i, location: a };
    }, t.prototype.parseArgumentOptions = function(e, r, i, o) {
      var s, a = this.clonePosition(), n = this.parseIdentifierIfPossible().value, l = this.clonePosition();
      switch (n) {
        case "":
          return this.error(q.EXPECT_ARGUMENT_TYPE, X(a, l));
        case "number":
        case "date":
        case "time": {
          this.bumpSpace();
          var d = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var c = this.clonePosition(), h = this.parseSimpleArgStyleIfPossible();
            if (h.err)
              return h;
            var u = dh(h.val);
            if (u.length === 0)
              return this.error(q.EXPECT_ARGUMENT_STYLE, X(this.clonePosition(), this.clonePosition()));
            var _ = X(c, this.clonePosition());
            d = { style: u, styleLocation: _ };
          }
          var p = this.tryParseArgumentClose(o);
          if (p.err)
            return p;
          var f = X(o, this.clonePosition());
          if (d && $s(d == null ? void 0 : d.style, "::", 0)) {
            var m = lh(d.style.slice(2));
            if (n === "number") {
              var h = this.parseNumberSkeletonFromString(m, d.styleLocation);
              return h.err ? h : {
                val: { type: ie.number, value: i, location: f, style: h.val },
                err: null
              };
            } else {
              if (m.length === 0)
                return this.error(q.EXPECT_DATE_TIME_SKELETON, f);
              var y = m;
              this.locale && (y = qc(m, this.locale));
              var u = {
                type: Vt.dateTime,
                pattern: y,
                location: d.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? Fc(y) : {}
              }, g = n === "date" ? ie.date : ie.time;
              return {
                val: { type: g, value: i, location: f, style: u },
                err: null
              };
            }
          }
          return {
            val: {
              type: n === "number" ? ie.number : n === "date" ? ie.date : ie.time,
              value: i,
              location: f,
              style: (s = d == null ? void 0 : d.style) !== null && s !== void 0 ? s : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var v = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(","))
            return this.error(q.EXPECT_SELECT_ARGUMENT_OPTIONS, X(v, Z({}, v)));
          this.bumpSpace();
          var k = this.parseIdentifierIfPossible(), w = 0;
          if (n !== "select" && k.value === "offset") {
            if (!this.bumpIf(":"))
              return this.error(q.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, X(this.clonePosition(), this.clonePosition()));
            this.bumpSpace();
            var h = this.tryParseDecimalInteger(q.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, q.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (h.err)
              return h;
            this.bumpSpace(), k = this.parseIdentifierIfPossible(), w = h.val;
          }
          var S = this.tryParsePluralOrSelectOptions(e, n, r, k);
          if (S.err)
            return S;
          var p = this.tryParseArgumentClose(o);
          if (p.err)
            return p;
          var P = X(o, this.clonePosition());
          return n === "select" ? {
            val: {
              type: ie.select,
              value: i,
              options: Os(S.val),
              location: P
            },
            err: null
          } : {
            val: {
              type: ie.plural,
              value: i,
              options: Os(S.val),
              offset: w,
              pluralType: n === "plural" ? "cardinal" : "ordinal",
              location: P
            },
            err: null
          };
        }
        default:
          return this.error(q.INVALID_ARGUMENT_TYPE, X(a, l));
      }
    }, t.prototype.tryParseArgumentClose = function(e) {
      return this.isEOF() || this.char() !== 125 ? this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, X(e, this.clonePosition())) : (this.bump(), { val: !0, err: null });
    }, t.prototype.parseSimpleArgStyleIfPossible = function() {
      for (var e = 0, r = this.clonePosition(); !this.isEOF(); ) {
        var i = this.char();
        switch (i) {
          case 39: {
            this.bump();
            var o = this.clonePosition();
            if (!this.bumpUntil("'"))
              return this.error(q.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, X(o, this.clonePosition()));
            this.bump();
            break;
          }
          case 123: {
            e += 1, this.bump();
            break;
          }
          case 125: {
            if (e > 0)
              e -= 1;
            else
              return {
                val: this.message.slice(r.offset, this.offset()),
                err: null
              };
            break;
          }
          default:
            this.bump();
            break;
        }
      }
      return {
        val: this.message.slice(r.offset, this.offset()),
        err: null
      };
    }, t.prototype.parseNumberSkeletonFromString = function(e, r) {
      var i = [];
      try {
        i = Gc(e);
      } catch {
        return this.error(q.INVALID_NUMBER_SKELETON, r);
      }
      return {
        val: {
          type: Vt.number,
          tokens: i,
          location: r,
          parsedOptions: this.shouldParseSkeletons ? Yc(i) : {}
        },
        err: null
      };
    }, t.prototype.tryParsePluralOrSelectOptions = function(e, r, i, o) {
      for (var s, a = !1, n = [], l = /* @__PURE__ */ new Set(), d = o.value, c = o.location; ; ) {
        if (d.length === 0) {
          var h = this.clonePosition();
          if (r !== "select" && this.bumpIf("=")) {
            var u = this.tryParseDecimalInteger(q.EXPECT_PLURAL_ARGUMENT_SELECTOR, q.INVALID_PLURAL_ARGUMENT_SELECTOR);
            if (u.err)
              return u;
            c = X(h, this.clonePosition()), d = this.message.slice(h.offset, this.offset());
          } else
            break;
        }
        if (l.has(d))
          return this.error(r === "select" ? q.DUPLICATE_SELECT_ARGUMENT_SELECTOR : q.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, c);
        d === "other" && (a = !0), this.bumpSpace();
        var _ = this.clonePosition();
        if (!this.bumpIf("{"))
          return this.error(r === "select" ? q.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : q.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, X(this.clonePosition(), this.clonePosition()));
        var p = this.parseMessage(e + 1, r, i);
        if (p.err)
          return p;
        var f = this.tryParseArgumentClose(_);
        if (f.err)
          return f;
        n.push([
          d,
          {
            value: p.val,
            location: X(_, this.clonePosition())
          }
        ]), l.add(d), this.bumpSpace(), s = this.parseIdentifierIfPossible(), d = s.value, c = s.location;
      }
      return n.length === 0 ? this.error(r === "select" ? q.EXPECT_SELECT_ARGUMENT_SELECTOR : q.EXPECT_PLURAL_ARGUMENT_SELECTOR, X(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !a ? this.error(q.MISSING_OTHER_CLAUSE, X(this.clonePosition(), this.clonePosition())) : { val: n, err: null };
    }, t.prototype.tryParseDecimalInteger = function(e, r) {
      var i = 1, o = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (i = -1);
      for (var s = !1, a = 0; !this.isEOF(); ) {
        var n = this.char();
        if (n >= 48 && n <= 57)
          s = !0, a = a * 10 + (n - 48), this.bump();
        else
          break;
      }
      var l = X(o, this.clonePosition());
      return s ? (a *= i, nh(a) ? { val: a, err: null } : this.error(r, l)) : this.error(e, l);
    }, t.prototype.offset = function() {
      return this.position.offset;
    }, t.prototype.isEOF = function() {
      return this.offset() === this.message.length;
    }, t.prototype.clonePosition = function() {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    }, t.prototype.char = function() {
      var e = this.position.offset;
      if (e >= this.message.length)
        throw Error("out of bound");
      var r = Da(this.message, e);
      if (r === void 0)
        throw Error("Offset ".concat(e, " is at invalid UTF-16 code unit boundary"));
      return r;
    }, t.prototype.error = function(e, r) {
      return {
        val: null,
        err: {
          kind: e,
          message: this.message,
          location: r
        }
      };
    }, t.prototype.bump = function() {
      if (!this.isEOF()) {
        var e = this.char();
        e === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e < 65536 ? 1 : 2);
      }
    }, t.prototype.bumpIf = function(e) {
      if ($s(this.message, e, this.offset())) {
        for (var r = 0; r < e.length; r++)
          this.bump();
        return !0;
      }
      return !1;
    }, t.prototype.bumpUntil = function(e) {
      var r = this.offset(), i = this.message.indexOf(e, r);
      return i >= 0 ? (this.bumpTo(i), !0) : (this.bumpTo(this.message.length), !1);
    }, t.prototype.bumpTo = function(e) {
      if (this.offset() > e)
        throw Error("targetOffset ".concat(e, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (e = Math.min(e, this.message.length); ; ) {
        var r = this.offset();
        if (r === e)
          break;
        if (r > e)
          throw Error("targetOffset ".concat(e, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF())
          break;
      }
    }, t.prototype.bumpSpace = function() {
      for (; !this.isEOF() && Oa(this.char()); )
        this.bump();
    }, t.prototype.peek = function() {
      if (this.isEOF())
        return null;
      var e = this.char(), r = this.offset(), i = this.message.charCodeAt(r + (e >= 65536 ? 2 : 1));
      return i ?? null;
    }, t;
  })()
);
function Ao(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function hh(t) {
  return Ao(t) || t === 47;
}
function uh(t) {
  return t === 45 || t === 46 || t >= 48 && t <= 57 || t === 95 || t >= 97 && t <= 122 || t >= 65 && t <= 90 || t == 183 || t >= 192 && t <= 214 || t >= 216 && t <= 246 || t >= 248 && t <= 893 || t >= 895 && t <= 8191 || t >= 8204 && t <= 8205 || t >= 8255 && t <= 8256 || t >= 8304 && t <= 8591 || t >= 11264 && t <= 12271 || t >= 12289 && t <= 55295 || t >= 63744 && t <= 64975 || t >= 65008 && t <= 65533 || t >= 65536 && t <= 983039;
}
function Oa(t) {
  return t >= 9 && t <= 13 || t === 32 || t === 133 || t >= 8206 && t <= 8207 || t === 8232 || t === 8233;
}
function _h(t) {
  return t >= 33 && t <= 35 || t === 36 || t >= 37 && t <= 39 || t === 40 || t === 41 || t === 42 || t === 43 || t === 44 || t === 45 || t >= 46 && t <= 47 || t >= 58 && t <= 59 || t >= 60 && t <= 62 || t >= 63 && t <= 64 || t === 91 || t === 92 || t === 93 || t === 94 || t === 96 || t === 123 || t === 124 || t === 125 || t === 126 || t === 161 || t >= 162 && t <= 165 || t === 166 || t === 167 || t === 169 || t === 171 || t === 172 || t === 174 || t === 176 || t === 177 || t === 182 || t === 187 || t === 191 || t === 215 || t === 247 || t >= 8208 && t <= 8213 || t >= 8214 && t <= 8215 || t === 8216 || t === 8217 || t === 8218 || t >= 8219 && t <= 8220 || t === 8221 || t === 8222 || t === 8223 || t >= 8224 && t <= 8231 || t >= 8240 && t <= 8248 || t === 8249 || t === 8250 || t >= 8251 && t <= 8254 || t >= 8257 && t <= 8259 || t === 8260 || t === 8261 || t === 8262 || t >= 8263 && t <= 8273 || t === 8274 || t === 8275 || t >= 8277 && t <= 8286 || t >= 8592 && t <= 8596 || t >= 8597 && t <= 8601 || t >= 8602 && t <= 8603 || t >= 8604 && t <= 8607 || t === 8608 || t >= 8609 && t <= 8610 || t === 8611 || t >= 8612 && t <= 8613 || t === 8614 || t >= 8615 && t <= 8621 || t === 8622 || t >= 8623 && t <= 8653 || t >= 8654 && t <= 8655 || t >= 8656 && t <= 8657 || t === 8658 || t === 8659 || t === 8660 || t >= 8661 && t <= 8691 || t >= 8692 && t <= 8959 || t >= 8960 && t <= 8967 || t === 8968 || t === 8969 || t === 8970 || t === 8971 || t >= 8972 && t <= 8991 || t >= 8992 && t <= 8993 || t >= 8994 && t <= 9e3 || t === 9001 || t === 9002 || t >= 9003 && t <= 9083 || t === 9084 || t >= 9085 && t <= 9114 || t >= 9115 && t <= 9139 || t >= 9140 && t <= 9179 || t >= 9180 && t <= 9185 || t >= 9186 && t <= 9254 || t >= 9255 && t <= 9279 || t >= 9280 && t <= 9290 || t >= 9291 && t <= 9311 || t >= 9472 && t <= 9654 || t === 9655 || t >= 9656 && t <= 9664 || t === 9665 || t >= 9666 && t <= 9719 || t >= 9720 && t <= 9727 || t >= 9728 && t <= 9838 || t === 9839 || t >= 9840 && t <= 10087 || t === 10088 || t === 10089 || t === 10090 || t === 10091 || t === 10092 || t === 10093 || t === 10094 || t === 10095 || t === 10096 || t === 10097 || t === 10098 || t === 10099 || t === 10100 || t === 10101 || t >= 10132 && t <= 10175 || t >= 10176 && t <= 10180 || t === 10181 || t === 10182 || t >= 10183 && t <= 10213 || t === 10214 || t === 10215 || t === 10216 || t === 10217 || t === 10218 || t === 10219 || t === 10220 || t === 10221 || t === 10222 || t === 10223 || t >= 10224 && t <= 10239 || t >= 10240 && t <= 10495 || t >= 10496 && t <= 10626 || t === 10627 || t === 10628 || t === 10629 || t === 10630 || t === 10631 || t === 10632 || t === 10633 || t === 10634 || t === 10635 || t === 10636 || t === 10637 || t === 10638 || t === 10639 || t === 10640 || t === 10641 || t === 10642 || t === 10643 || t === 10644 || t === 10645 || t === 10646 || t === 10647 || t === 10648 || t >= 10649 && t <= 10711 || t === 10712 || t === 10713 || t === 10714 || t === 10715 || t >= 10716 && t <= 10747 || t === 10748 || t === 10749 || t >= 10750 && t <= 11007 || t >= 11008 && t <= 11055 || t >= 11056 && t <= 11076 || t >= 11077 && t <= 11078 || t >= 11079 && t <= 11084 || t >= 11085 && t <= 11123 || t >= 11124 && t <= 11125 || t >= 11126 && t <= 11157 || t === 11158 || t >= 11159 && t <= 11263 || t >= 11776 && t <= 11777 || t === 11778 || t === 11779 || t === 11780 || t === 11781 || t >= 11782 && t <= 11784 || t === 11785 || t === 11786 || t === 11787 || t === 11788 || t === 11789 || t >= 11790 && t <= 11798 || t === 11799 || t >= 11800 && t <= 11801 || t === 11802 || t === 11803 || t === 11804 || t === 11805 || t >= 11806 && t <= 11807 || t === 11808 || t === 11809 || t === 11810 || t === 11811 || t === 11812 || t === 11813 || t === 11814 || t === 11815 || t === 11816 || t === 11817 || t >= 11818 && t <= 11822 || t === 11823 || t >= 11824 && t <= 11833 || t >= 11834 && t <= 11835 || t >= 11836 && t <= 11839 || t === 11840 || t === 11841 || t === 11842 || t >= 11843 && t <= 11855 || t >= 11856 && t <= 11857 || t === 11858 || t >= 11859 && t <= 11903 || t >= 12289 && t <= 12291 || t === 12296 || t === 12297 || t === 12298 || t === 12299 || t === 12300 || t === 12301 || t === 12302 || t === 12303 || t === 12304 || t === 12305 || t >= 12306 && t <= 12307 || t === 12308 || t === 12309 || t === 12310 || t === 12311 || t === 12312 || t === 12313 || t === 12314 || t === 12315 || t === 12316 || t === 12317 || t >= 12318 && t <= 12319 || t === 12320 || t === 12336 || t === 64830 || t === 64831 || t >= 65093 && t <= 65094;
}
function Po(t) {
  t.forEach(function(e) {
    if (delete e.location, Aa(e) || Pa(e))
      for (var r in e.options)
        delete e.options[r].location, Po(e.options[r].value);
    else wa(e) && Ma(e.style) || (ka(e) || Sa(e)) && xo(e.style) ? delete e.style.location : Ca(e) && Po(e.children);
  });
}
function gh(t, e) {
  e === void 0 && (e = {}), e = Z({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, e);
  var r = new ch(t, e).parse();
  if (r.err) {
    var i = SyntaxError(q[r.err.kind]);
    throw i.location = r.err.location, i.originalMessage = r.err.message, i;
  }
  return e != null && e.captureLocation || Po(r.val), r.val;
}
var Gt;
(function(t) {
  t.MISSING_VALUE = "MISSING_VALUE", t.INVALID_VALUE = "INVALID_VALUE", t.MISSING_INTL_API = "MISSING_INTL_API";
})(Gt || (Gt = {}));
var zi = (
  /** @class */
  (function(t) {
    Mi(e, t);
    function e(r, i, o) {
      var s = t.call(this, r) || this;
      return s.code = i, s.originalMessage = o, s;
    }
    return e.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, e;
  })(Error)
), Rs = (
  /** @class */
  (function(t) {
    Mi(e, t);
    function e(r, i, o, s) {
      return t.call(this, 'Invalid values for "'.concat(r, '": "').concat(i, '". Options are "').concat(Object.keys(o).join('", "'), '"'), Gt.INVALID_VALUE, s) || this;
    }
    return e;
  })(zi)
), ph = (
  /** @class */
  (function(t) {
    Mi(e, t);
    function e(r, i, o) {
      return t.call(this, 'Value for "'.concat(r, '" must be of type ').concat(i), Gt.INVALID_VALUE, o) || this;
    }
    return e;
  })(zi)
), fh = (
  /** @class */
  (function(t) {
    Mi(e, t);
    function e(r, i) {
      return t.call(this, 'The intl string context variable "'.concat(r, '" was not provided to the string "').concat(i, '"'), Gt.MISSING_VALUE, i) || this;
    }
    return e;
  })(zi)
), be;
(function(t) {
  t[t.literal = 0] = "literal", t[t.object = 1] = "object";
})(be || (be = {}));
function mh(t) {
  return t.length < 2 ? t : t.reduce(function(e, r) {
    var i = e[e.length - 1];
    return !i || i.type !== be.literal || r.type !== be.literal ? e.push(r) : i.value += r.value, e;
  }, []);
}
function yh(t) {
  return typeof t == "function";
}
function ii(t, e, r, i, o, s, a) {
  if (t.length === 1 && Es(t[0]))
    return [
      {
        type: be.literal,
        value: t[0].value
      }
    ];
  for (var n = [], l = 0, d = t; l < d.length; l++) {
    var c = d[l];
    if (Es(c)) {
      n.push({
        type: be.literal,
        value: c.value
      });
      continue;
    }
    if (Hc(c)) {
      typeof s == "number" && n.push({
        type: be.literal,
        value: r.getNumberFormat(e).format(s)
      });
      continue;
    }
    var h = c.value;
    if (!(o && h in o))
      throw new fh(h, a);
    var u = o[h];
    if (Bc(c)) {
      (!u || typeof u == "string" || typeof u == "number") && (u = typeof u == "string" || typeof u == "number" ? String(u) : ""), n.push({
        type: typeof u == "string" ? be.literal : be.object,
        value: u
      });
      continue;
    }
    if (ka(c)) {
      var _ = typeof c.style == "string" ? i.date[c.style] : xo(c.style) ? c.style.parsedOptions : void 0;
      n.push({
        type: be.literal,
        value: r.getDateTimeFormat(e, _).format(u)
      });
      continue;
    }
    if (Sa(c)) {
      var _ = typeof c.style == "string" ? i.time[c.style] : xo(c.style) ? c.style.parsedOptions : i.time.medium;
      n.push({
        type: be.literal,
        value: r.getDateTimeFormat(e, _).format(u)
      });
      continue;
    }
    if (wa(c)) {
      var _ = typeof c.style == "string" ? i.number[c.style] : Ma(c.style) ? c.style.parsedOptions : void 0;
      _ && _.scale && (u = u * (_.scale || 1)), n.push({
        type: be.literal,
        value: r.getNumberFormat(e, _).format(u)
      });
      continue;
    }
    if (Ca(c)) {
      var p = c.children, f = c.value, m = o[f];
      if (!yh(m))
        throw new ph(f, "function", a);
      var y = ii(p, e, r, i, o, s), g = m(y.map(function(w) {
        return w.value;
      }));
      Array.isArray(g) || (g = [g]), n.push.apply(n, g.map(function(w) {
        return {
          type: typeof w == "string" ? be.literal : be.object,
          value: w
        };
      }));
    }
    if (Aa(c)) {
      var v = c.options[u] || c.options.other;
      if (!v)
        throw new Rs(c.value, u, Object.keys(c.options), a);
      n.push.apply(n, ii(v.value, e, r, i, o));
      continue;
    }
    if (Pa(c)) {
      var v = c.options["=".concat(u)];
      if (!v) {
        if (!Intl.PluralRules)
          throw new zi(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, Gt.MISSING_INTL_API, a);
        var k = r.getPluralRules(e, { type: c.pluralType }).select(u - (c.offset || 0));
        v = c.options[k] || c.options.other;
      }
      if (!v)
        throw new Rs(c.value, u, Object.keys(c.options), a);
      n.push.apply(n, ii(v.value, e, r, i, o, u - (c.offset || 0)));
      continue;
    }
  }
  return mh(n);
}
function vh(t, e) {
  return e ? Z(Z(Z({}, t || {}), e || {}), Object.keys(t).reduce(function(r, i) {
    return r[i] = Z(Z({}, t[i]), e[i] || {}), r;
  }, {})) : t;
}
function bh(t, e) {
  return e ? Object.keys(t).reduce(function(r, i) {
    return r[i] = vh(t[i], e[i]), r;
  }, Z({}, t)) : t;
}
function Ji(t) {
  return {
    create: function() {
      return {
        get: function(e) {
          return t[e];
        },
        set: function(e, r) {
          t[e] = r;
        }
      };
    }
  };
}
function xh(t) {
  return t === void 0 && (t = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: Xi(function() {
      for (var e, r = [], i = 0; i < arguments.length; i++)
        r[i] = arguments[i];
      return new ((e = Intl.NumberFormat).bind.apply(e, qi([void 0], r, !1)))();
    }, {
      cache: Ji(t.number),
      strategy: Zi.variadic
    }),
    getDateTimeFormat: Xi(function() {
      for (var e, r = [], i = 0; i < arguments.length; i++)
        r[i] = arguments[i];
      return new ((e = Intl.DateTimeFormat).bind.apply(e, qi([void 0], r, !1)))();
    }, {
      cache: Ji(t.dateTime),
      strategy: Zi.variadic
    }),
    getPluralRules: Xi(function() {
      for (var e, r = [], i = 0; i < arguments.length; i++)
        r[i] = arguments[i];
      return new ((e = Intl.PluralRules).bind.apply(e, qi([void 0], r, !1)))();
    }, {
      cache: Ji(t.pluralRules),
      strategy: Zi.variadic
    })
  };
}
var wh = (
  /** @class */
  (function() {
    function t(e, r, i, o) {
      r === void 0 && (r = t.defaultLocale);
      var s = this;
      if (this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function(l) {
        var d = s.formatToParts(l);
        if (d.length === 1)
          return d[0].value;
        var c = d.reduce(function(h, u) {
          return !h.length || u.type !== be.literal || typeof h[h.length - 1] != "string" ? h.push(u.value) : h[h.length - 1] += u.value, h;
        }, []);
        return c.length <= 1 ? c[0] || "" : c;
      }, this.formatToParts = function(l) {
        return ii(s.ast, s.locales, s.formatters, s.formats, l, void 0, s.message);
      }, this.resolvedOptions = function() {
        var l;
        return {
          locale: ((l = s.resolvedLocale) === null || l === void 0 ? void 0 : l.toString()) || Intl.NumberFormat.supportedLocalesOf(s.locales)[0]
        };
      }, this.getAst = function() {
        return s.ast;
      }, this.locales = r, this.resolvedLocale = t.resolveLocale(r), typeof e == "string") {
        if (this.message = e, !t.__parse)
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        var a = o || {};
        a.formatters;
        var n = Lc(a, ["formatters"]);
        this.ast = t.__parse(e, Z(Z({}, n), { locale: this.resolvedLocale }));
      } else
        this.ast = e;
      if (!Array.isArray(this.ast))
        throw new TypeError("A message must be provided as a String or AST.");
      this.formats = bh(t.formats, i), this.formatters = o && o.formatters || xh(this.formatterCache);
    }
    return Object.defineProperty(t, "defaultLocale", {
      get: function() {
        return t.memoizedDefaultLocale || (t.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), t.memoizedDefaultLocale;
      },
      enumerable: !1,
      configurable: !0
    }), t.memoizedDefaultLocale = null, t.resolveLocale = function(e) {
      if (!(typeof Intl.Locale > "u")) {
        var r = Intl.NumberFormat.supportedLocalesOf(e);
        return r.length > 0 ? new Intl.Locale(r[0]) : new Intl.Locale(typeof e == "string" ? e : e[0]);
      }
    }, t.__parse = gh, t.formats = {
      number: {
        integer: {
          maximumFractionDigits: 0
        },
        currency: {
          style: "currency"
        },
        percent: {
          style: "percent"
        }
      },
      date: {
        short: {
          month: "numeric",
          day: "numeric",
          year: "2-digit"
        },
        medium: {
          month: "short",
          day: "numeric",
          year: "numeric"
        },
        long: {
          month: "long",
          day: "numeric",
          year: "numeric"
        },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        }
      },
      time: {
        short: {
          hour: "numeric",
          minute: "numeric"
        },
        medium: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short"
        }
      }
    }, t;
  })()
);
const Ns = /* @__PURE__ */ Object.assign({ "./locales/cs.json": rc, "./locales/da.json": oc, "./locales/de.json": nc, "./locales/el.json": lc, "./locales/en.json": cc, "./locales/es.json": uc, "./locales/fi.json": gc, "./locales/fr.json": fc, "./locales/it.json": yc, "./locales/nl.json": bc, "./locales/no.json": wc, "./locales/pl.json": Sc, "./locales/ru.json": Pc, "./locales/sk.json": Mc, "./locales/sv.json": Ec }), mt = {};
for (const t in Ns) {
  const e = t.match(/\.\/locales\/([\w-]+)\.json$/);
  e && (mt[e[1]] = Ns[t].default);
}
const mi = "en";
function Bs(t, e) {
  return t[e];
}
function Be(t, e) {
  var o;
  let r = e || ((o = t == null ? void 0 : t.locale) == null ? void 0 : o.language) || (t == null ? void 0 : t.language) || mi;
  if (mt[r]) return r;
  const i = r.slice(0, 2).toLowerCase();
  return mt[i] ? i : mi;
}
const kh = Object.keys(mt);
function oe(t, e, r = {}) {
  const i = mt[e] || mt[mi] || {};
  let o = Bs(i, t);
  if (o === void 0) {
    const s = Bs(mt[mi] || {}, t);
    o = s === void 0 ? t : s;
  }
  try {
    return new wh(o, e).format(r);
  } catch (s) {
    return console.warn(`Translation failed for key: ${t}`, s), o;
  }
}
function Je(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function yi(t) {
  return t.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
const V = {
  levels_colors: [
    "#FFE55A",
    "#FFC84E",
    "#FFA53F",
    "#FF6E33",
    "#FF6140",
    "#FF001C"
  ],
  levels_empty_color: "rgba(200, 200, 200, 0.15)",
  levels_gap_color: "rgba(200, 200, 200, 1)",
  levels_thickness: 60,
  levels_gap: 1,
  levels_text_weight: "normal",
  levels_text_size: 0.2,
  levels_icon_ratio: 1,
  levels_text_color: "var(--primary-text-color)",
  // Default allergen colors: [empty_color, ...levels_colors]
  // This ensures both allergen icons and level circles use the same color mapping
  allergen_colors: [
    "rgba(200, 200, 200, 0.15)",
    // Level 0 (empty)
    "#FFE55A",
    // Level 1
    "#FFC84E",
    // Level 2
    "#FFA53F",
    // Level 3
    "#FF6E33",
    // Level 4
    "#FF6140",
    // Level 5
    "#FF001C"
    // Level 6
  ],
  // Default allergen stroke width - changed from old default to 15
  allergen_stroke_width: 15,
  // Sync allergen stroke color with allergen level color
  allergen_stroke_color_synced: !0,
  // Sync allergen stroke width with level circle gap
  allergen_levels_gap_synced: !0,
  // Default color for no allergens icon
  no_allergens_color: "#a9cfe0"
}, Sh = 30;
function er(t) {
  return Math.round(t / Sh);
}
function rt(t, e) {
  const r = Array.from({ length: 7 }, (i, o) => oe(`card.levels.${o}`, e));
  return Array.isArray(t) ? r.map((i, o) => {
    const s = t[o];
    return s == null || s === "" ? i : s;
  }) : r;
}
const Ia = {
  11: "Schleswig-Holstein und Hamburg",
  12: "Schleswig-Holstein und Hamburg",
  20: "Mecklenburg-Vorpommern",
  31: "Niedersachsen und Bremen",
  32: "Niedersachsen und Bremen",
  41: "Nordrhein-Westfalen",
  42: "Nordrhein-Westfalen",
  43: "Nordrhein-Westfalen",
  50: "Brandenburg und Berlin",
  61: "Sachsen-Anhalt",
  62: "Sachsen-Anhalt",
  71: "Thüringen",
  72: "Thüringen",
  81: "Sachsen",
  82: "Sachsen",
  91: "Hessen",
  92: "Hessen",
  101: "Rheinland-Pfalz und Saarland",
  102: "Rheinland-Pfalz und Saarland",
  103: "Rheinland-Pfalz und Saarland",
  111: "Baden-Württemberg",
  112: "Baden-Württemberg",
  113: "Baden-Württemberg",
  121: "Bayern",
  122: "Bayern",
  123: "Bayern",
  124: "Bayern"
}, Ah = {
  al: "alder",
  alm: "elm",
  bok: "beech",
  bjork: "birch",
  ek: "oak",
  grabo: "mugwort",
  gras: "grass",
  hassel: "hazel",
  malortsambrosia: "ragweed",
  salg_och_viden: "willow"
}, Ph = {
  erle: "alder",
  ambrosia: "ragweed",
  esche: "ash",
  birke: "birch",
  buche: "beech",
  hasel: "hazel",
  graser: "grass",
  graeser: "grass",
  beifuss: "mugwort",
  roggen: "rye"
}, Ch = {
  olive: "olive",
  plane: "plane",
  cypress: "cypress",
  lime: "lime",
  mold_spores: "mold_spores",
  nettle_and_pellitory: "nettle_and_pellitory",
  fungal_spores: "mold_spores",
  grasses: "grass",
  cypress_family: "cypress",
  nettle_family: "nettle_and_pellitory",
  plane_tree: "plane",
  rye: "rye",
  ragweed: "ragweed",
  birch: "birch",
  alder: "alder",
  hazel: "hazel",
  mugwort: "mugwort",
  allergy_risk: "allergy_risk",
  index: "allergy_risk"
}, Mh = {
  pine: "pine",
  poplar: "poplar",
  poaceae: "poaceae",
  chenopod: "chenopod",
  nettle: "nettle",
  grass_cat: "grass_cat",
  trees_cat: "trees_cat",
  weeds_cat: "weeds_cat"
}, zh = {
  sorrel: "sorrel",
  rumex: "sorrel",
  ampfer: "sorrel",
  oseille: "sorrel",
  artemisia: "mugwort",
  betula: "birch",
  bouleau: "birch",
  fagus: "beech",
  hetre: "beech",
  hetra: "beech",
  quercus: "oak",
  eiche: "oak",
  chene: "oak",
  alnus: "alder",
  aulne: "alder",
  fraxinus: "ash",
  frene: "ash",
  chenopodium: "goosefoot",
  goosefoot: "goosefoot",
  gaensefuss: "goosefoot",
  gansefuss: "goosefoot",
  chenopode: "goosefoot",
  poacea: "poaceae",
  graminees: "poaceae",
  corylus: "hazel",
  haselnussstrauch: "hazel",
  noisetier: "hazel",
  plantago: "plantain",
  plantain: "plantain",
  wegerich: "plantain",
  armoise: "mugwort"
}, Eh = {
  ambroisie: "ragweed",
  gramine: "grass",
  olivier: "olive",
  pm25: "pm25",
  pm10: "pm10",
  ozone: "ozone",
  no2: "no2",
  so2: "so2",
  dioxyde_d_azote: "no2",
  dioxyde_de_soufre: "so2",
  qualite_globale: "qualite_globale"
}, Lh = {
  cottonwood: "poplar",
  juniper: "cypress",
  japanese_cedar: "cypress",
  japanese_cypress: "cypress",
  graminales: "grass",
  cypress_pine: "cypress"
}, Th = {
  ...Ah,
  ...Ph,
  ...Ch,
  ...Mh,
  ...zh,
  ...Eh,
  ...Lh
};
function At(t) {
  return Th[t] || t;
}
const Hs = {
  trees_cat: "birch",
  // Use birch icon for trees category
  grass_cat: "grass",
  // Use grass icon for grass category
  weeds_cat: "mugwort",
  // Use mugwort icon for weeds category
  trees: "birch",
  // Keep original for compatibility
  weeds: "mugwort",
  // Keep original for compatibility
  // grass has its own icon, no fallback needed
  // Google Pollen Levels fallbacks
  cottonwood: "poplar",
  juniper: "cypress",
  japanese_cedar: "cypress",
  japanese_cypress: "cypress",
  graminales: "grass",
  cypress_pine: "cypress",
  maple: "oak"
}, Co = {
  // English
  tree: "trees",
  // matches trees
  grass: "grass",
  weed: "weeds",
  // matches weeds
  // Dutch
  bomen: "trees",
  gras: "grass",
  onkruid: "weeds",
  // matches both onkruid and onkruiden
  kruid: "weeds",
  // matches kruid and kruiden
  // French
  arbre: "trees",
  // matches arbres
  graminee: "grass",
  // matches graminees, graminées
  herbacee: "weeds",
  // matches herbacees, herbacées
  // Italian
  alber: "trees",
  // matches alberi
  graminace: "grass",
  // matches graminacee
  erbace: "weeds"
  // matches erbacee
}, Mo = [
  "Borlänge",
  "Bräkne-Hoby",
  "Eskilstuna",
  "Forshaga",
  "Gävle",
  "Göteborg",
  "Hässleholm",
  "Jönköping",
  "Kristianstad",
  "Ljusdal",
  "Malmö",
  "Norrköping",
  "Nässjö",
  "Piteå",
  "Skövde",
  "Stockholm",
  "Storuman",
  "Sundsvall",
  "Umeå",
  "Visby",
  "Västervik",
  "Östersund"
], Ra = [
  "icon_size",
  "icon_color_mode",
  "icon_color",
  "allergen_color_mode",
  "allergen_colors",
  "allergen_outline_color",
  "allergen_stroke_width",
  "allergen_stroke_color_synced",
  "allergen_levels_gap_synced",
  "levels_inherit_mode",
  "background_color",
  "levels_colors",
  "levels_empty_color",
  "levels_gap_color",
  "levels_thickness",
  "levels_gap",
  "levels_text_color",
  "levels_text_size",
  "levels_icon_ratio",
  "levels_text_weight",
  "minimal",
  "show_text_allergen",
  "show_value_text",
  "show_value_numeric",
  "show_value_numeric_in_circle",
  "allergens_abbreviated",
  "days_boldfaced",
  "text_size_ratio",
  "minimal_gap",
  "show_block_separator",
  "title",
  "card_mod"
], Dh = { nl: { els: "alder", berk: "birch", gras: "grass", hazelaar: "hazel", bijvoet: "mugwort", olijf: "olive", ambrosia: "ragweed", index: "allergy_risk" }, de: { erle: "alder", birke: "birch", gras: "grass", hasel: "hazel", beifu: "mugwort", ambrosia: "ragweed", index: "allergy_risk" }, ru: { "": "ragweed" }, fi: { leppa: "alder", koivu: "birch", heina: "grass", pahkinaleppa: "hazel", siankarsamo: "mugwort", oliivi: "olive", ambrosia: "ragweed", index: "allergy_risk" }, sk: { jelsa: "alder", breza: "birch", trava: "grass", lieska: "hazel", palina: "mugwort", olivovnik: "olive", ambrozia: "ragweed", index: "allergy_risk" }, en: { alder: "alder", birch: "birch", grass: "grass", hazel: "hazel", mugwort: "mugwort", olive: "olive", ragweed: "ragweed", index: "allergy_risk" }, it: { ontano: "alder", betulla: "birch", erba: "grass", nocciolo: "hazel", artemisia: "mugwort", oliva: "olive", ambrosia: "ragweed", index: "allergy_risk" }, cs: { olse: "alder", briza: "birch", trava: "grass", liska: "hazel", pelynek: "mugwort", olivovnik: "olive", ambrozie: "ragweed", index: "allergy_risk" }, no: { al: "alder", bjrk: "birch", gress: "grass", hassel: "hazel", malurt: "mugwort", oliven: "olive", ambrosia: "ragweed", index: "allergy_risk" }, da: { al: "alder", birk: "birch", grs: "grass", hassel: "hazel", malurt: "mugwort", oliven: "olive", ambrosia: "ragweed", index: "allergy_risk" }, sv: { al: "alder", bjork: "birch", gras: "grass", hassel: "hazel", malort: "mugwort", oliv: "olive", ambrosia: "ragweed", index: "allergy_risk" } }, $h = { alder: { nl: "Els", de: "Erle", ru: "Ольха", fi: "Leppä", sk: "Jelša", en: "Alder", it: "Ontano", cs: "Olše", no: "Al", da: "Al", sv: "Al" }, birch: { nl: "Berk", de: "Birke", ru: "Берёза", fi: "Koivu", sk: "Breza", en: "Birch", it: "Betulla", cs: "Bříza", no: "Bjørk", da: "Birk", sv: "Björk" }, grass: { nl: "Gras", de: "Gras", ru: "Трава", fi: "Heinä", sk: "Tráva", en: "Grass", it: "Erba", cs: "Tráva", no: "Gress", da: "Græs", sv: "Gräs" }, hazel: { nl: "Hazelaar", de: "Hasel", ru: "Лещина", fi: "Pähkinäleppä", sk: "Lieska", en: "Hazel", it: "Nocciolo", cs: "Líska", no: "Hassel", da: "Hassel", sv: "Hassel" }, mugwort: { nl: "Bijvoet", de: "Beifuß", ru: "Полынь", fi: "Siankärsämö", sk: "Palina", en: "Mugwort", it: "Artemisia", cs: "Pelyněk", no: "Malurt", da: "Malurt", sv: "Malört" }, olive: { nl: "Olijf", de: "Olive", ru: "Олива", fi: "Oliivi", sk: "Olivovník", en: "Olive", it: "Oliva", cs: "Olivovník", no: "Oliven", da: "Oliven", sv: "Oliv" }, ragweed: { nl: "Ambrosia", de: "Ambrosia", ru: "Амброзия", fi: "Ambrosia", sk: "Ambrózia", en: "Ragweed", it: "Ambrosia", cs: "Ambrózie", no: "Ambrosia", da: "Ambrosia", sv: "Ambrosia" }, allergy_risk: { nl: "Index", de: "Index", ru: "Index", fi: "Index", sk: "Index", en: "Index", it: "Index", cs: "Index", no: "Index", da: "Index", sv: "Index" } }, Oh = { nl: ["forecast", "forecast_beta"], de: ["forecast", "pollen_vorhersage_beta"], ru: ["forecast", "beta"], fi: ["forecast", "siitepolyennuste_beta"], sk: ["forecast", "predpoved_beta"], en: ["forecast", "pollen_forecast_beta"], it: ["forecast", "previsione_del_polline_beta"], cs: ["forecast", "predpoved_beta"], no: ["forecast", "pollenprognose_beta"], da: ["forecast", "pollenprognose_beta"], sv: ["forecast", "pollenprognos_beta"] }, ue = {
  mapping: Dh,
  names: $h,
  weather_suffixes: Oh
};
function Zo(t) {
  return typeof t == "string" && /^[0-9A-Z]{26}$/i.test(t);
}
function yt(t, e = !1) {
  var o, s, a, n;
  const r = { locations: /* @__PURE__ */ new Map() };
  if (!(t != null && t.entities)) return r;
  const i = Object.entries(t.entities).filter(
    ([, l]) => l.platform === "silam_pollen" && !l.entity_category
  );
  if (!i.length) return r;
  e && console.debug(
    "[SILAM] Discovery: using hass.entities, found",
    i.length,
    "candidates"
  );
  for (const [l, d] of i) {
    let c = "default";
    const h = d.device_id;
    if (h && ((a = (s = (o = t.devices) == null ? void 0 : o[h]) == null ? void 0 : s.config_entries) != null && a.length) && (c = t.devices[h].config_entries[0]), !r.locations.has(c)) {
      let p = "Auto";
      if (h && ((n = t.devices) != null && n[h])) {
        const f = t.devices[h];
        p = f.name_by_user || f.name || p;
      }
      r.locations.set(c, {
        label: p,
        weatherEntity: null,
        sensors: /* @__PURE__ */ new Map()
      });
    }
    const u = r.locations.get(c), _ = d.translation_key;
    if (l.startsWith("weather.") || _ === "forecast")
      u.weatherEntity = l;
    else if (_) {
      let p = _;
      for (const f of Object.values(ue.mapping))
        if (f[_]) {
          p = f[_];
          break;
        }
      u.sensors.set(p, l);
    }
  }
  if (e) {
    console.debug(
      "[SILAM] Discovery result:",
      r.locations.size,
      "locations"
    );
    for (const [l, d] of r.locations)
      console.debug(
        `  [${l}] "${d.label}": weather=${d.weatherEntity}, sensors:`,
        [...d.sensors.keys()]
      );
  }
  return r;
}
function Rr(t, e, r = !1) {
  var i;
  if (!((i = t == null ? void 0 : t.locations) != null && i.size)) return null;
  if (Zo(e) && t.locations.has(e))
    return t.locations.get(e);
  if (e) {
    const o = e.toLowerCase();
    for (const [, s] of t.locations)
      if (s.label.toLowerCase().includes(o))
        return s;
    return r && console.debug(
      "[SILAM] Discovery: explicit location not matched:",
      e
    ), null;
  }
  return t.locations.values().next().value ?? null;
}
function Na(t, e, r, i = !1, o = null) {
  var u, _, p;
  if (!t) return null;
  const s = o || yt(t, i), a = Rr(s, e, i);
  if (a != null && a.weatherEntity) return a.weatherEntity;
  if (!e || Zo(e)) return null;
  const n = e.toLowerCase();
  let l = /* @__PURE__ */ new Set();
  const d = ((u = ue.weather_suffixes) == null ? void 0 : u[r]) || ((_ = ue.weather_suffixes) == null ? void 0 : _[r == null ? void 0 : r.split("-")[0]]) || [];
  for (const f of d) {
    l.add(f);
    const m = `weather.silam_pollen_${n}_${f}`;
    if (m in t.states) return m;
  }
  for (const f of ((p = ue.weather_suffixes) == null ? void 0 : p.en) || []) {
    if (l.has(f)) continue;
    l.add(f);
    const m = `weather.silam_pollen_${n}_${f}`;
    if (m in t.states) return m;
  }
  const c = Array.from(
    new Set(Object.values(ue.weather_suffixes).flat())
  );
  for (const f of c) {
    if (l.has(f)) continue;
    const m = `weather.silam_pollen_${n}_${f}`;
    if (m in t.states) return m;
  }
  const h = `weather.silam_pollen_${n}_`;
  return Object.keys(t.states).find((f) => f.startsWith(h)) || null;
}
function Zt(t, e = 6, r = -1) {
  if (t == null) return r;
  const i = Number(t);
  return isNaN(i) || i < 0 ? r : e != null ? Math.min(i, e) : i;
}
function $e(t, e) {
  if (e === "none") return;
  const r = {
    value_ascending: (i, o) => {
      var s, a;
      return (((s = i.day0) == null ? void 0 : s.state) ?? 0) - (((a = o.day0) == null ? void 0 : a.state) ?? 0);
    },
    value_descending: (i, o) => {
      var s, a;
      return (((s = o.day0) == null ? void 0 : s.state) ?? 0) - (((a = i.day0) == null ? void 0 : a.state) ?? 0);
    },
    name_ascending: (i, o) => i.allergenCapitalized.localeCompare(o.allergenCapitalized),
    name_descending: (i, o) => o.allergenCapitalized.localeCompare(i.allergenCapitalized)
  }[e] || ((i, o) => {
    var s, a;
    return (((s = o.day0) == null ? void 0 : s.state) ?? 0) - (((a = i.day0) == null ? void 0 : a.state) ?? 0);
  });
  t.sort(r);
}
function it(t, e) {
  return e === 0 || t.some((r) => r.state >= e);
}
function zt(t, { fullPhrases: e, shortPhrases: r, abbreviated: i, lang: o, capitalize: s, configKey: a }) {
  const n = s || ((u) => u.charAt(0).toUpperCase() + u.slice(1)), l = a ?? t, d = At(t);
  let c;
  if (e[l])
    c = e[l];
  else {
    const u = `card.allergen.${d}`, _ = oe(u, o);
    c = _ !== u ? _ : n(l);
  }
  let h;
  if (i) {
    const u = `editor.phrases_short.${d}`, _ = oe(u, o);
    h = r[l] || (_ !== u ? _ : null) || c;
  } else
    h = c;
  return { allergenCapitalized: c, allergenShort: h };
}
function ot(t, e) {
  const r = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...t.phrases || {}
  };
  return {
    fullPhrases: r.full,
    shortPhrases: r.short,
    userLevels: r.levels,
    userDays: r.days,
    noInfoLabel: r.no_information || oe("card.no_information", e)
  };
}
function st(t, e, r = null) {
  var l;
  const i = Be(t, e.date_locale), o = r != null ? e.date_locale || r : e.date_locale || ((l = t.locale) == null ? void 0 : l.language) || t.language || `${i}-${i.toUpperCase()}`, s = e.days_relative !== !1, a = !!e.days_abbreviated, n = !!e.days_uppercase;
  return { lang: i, locale: o, daysRelative: s, dayAbbrev: a, daysUppercase: n };
}
function Et(t) {
  let e = t || "";
  return e.startsWith("sensor.") && (e = e.substring(7)), e && !e.endsWith("_") && (e = e + "_"), e;
}
function Wt(t, e, r, i) {
  const o = `sensor.${e}${r}${i}`;
  if (t.states[o]) return o;
  if (i === "") {
    const s = `sensor.${e}${r}`, a = Object.keys(t.states).filter(
      (n) => n.startsWith(s)
    );
    if (a.length === 1) return a[0];
  }
  return null;
}
function nt(t, e, { daysRelative: r, dayAbbrev: i, daysUppercase: o, userDays: s, lang: a, locale: n }) {
  let l;
  return r ? s[e] != null ? l = s[e] : e >= 0 && e <= 2 ? l = oe(`card.days.${e}`, a) : l = t.toLocaleDateString(n, {
    day: "numeric",
    month: "short"
  }) : (l = t.toLocaleDateString(n, {
    weekday: i ? "short" : "long"
  }), l = l.charAt(0).toUpperCase() + l.slice(1)), o && (l = l.toUpperCase()), l;
}
function js(t, e, r, i, o) {
  let s = null, a = null;
  if (e.integration === "silam" && (!e.mode || e.mode === "daily")) {
    const d = (e.location || "").toLowerCase();
    if (!Zo(d)) {
      a = d, s = {};
      for (const c of i) {
        const h = c.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
        if (!h || h[1] !== a) continue;
        const u = h[2];
        for (const [, _] of Object.entries(o))
          if (_[u]) {
            s[_[u]] = u;
            break;
          }
      }
    }
  }
  const n = new Set(r);
  let l = t.filter((d) => {
    if (e.integration === "silam" && (!e.mode || e.mode === "daily")) {
      if (d.allergenReplaced === "allergy_risk") return !0;
      if (d.entity_id)
        return n.has(d.entity_id);
      if (s !== null) {
        const c = s[d.allergenReplaced] || d.allergenReplaced, h = `sensor.silam_pollen_${a}_${c}`;
        return n.has(h);
      }
      return !1;
    }
    return !0;
  });
  if (Array.isArray(e.allergens) && e.allergens.length > 0 && e.integration !== "silam") {
    let d, c;
    e.integration === "dwd" ? (d = new Set(e.allergens.map((h) => yi(h))), c = (h) => yi(h.allergenReplaced || "")) : (d = new Set(e.allergens.map((h) => Je(h))), c = (h) => Je(h.allergenReplaced || "")), l = l.filter((h) => d.has(c(h)));
  }
  return l;
}
const Ue = {
  integration: "pp",
  city: "",
  // Optional entity naming used when city is "manual"
  entity_prefix: "",
  entity_suffix: "",
  allergens: [
    "Al",
    "Alm",
    "Bok",
    "Björk",
    "Ek",
    "Malörtsambrosia",
    "Gråbo",
    "Gräs",
    "Hassel",
    "Sälg och viden"
  ],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...V,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  show_empty_days: !1,
  debug: !1,
  show_version: !0,
  days_to_show: 4,
  days_relative: !0,
  days_abbreviated: !1,
  days_uppercase: !1,
  days_boldfaced: !1,
  pollen_threshold: 1,
  sort: "value_descending",
  allergy_risk_top: !0,
  allergens_abbreviated: !1,
  link_to_sensors: !0,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
};
function Ih(t, e) {
  if (t.city === "manual") return "";
  let r = Je(t.city || "");
  if (!r) {
    const i = Object.keys(e.states).filter(
      (o) => o.startsWith("sensor.pollen_") && /^sensor\.pollen_(.+)_[^_]+$/.test(o)
    );
    if (i.length) {
      const o = i[0].match(/^sensor\.pollen_(.+)_[^_]+$/);
      r = o ? o[1] : "";
    }
  }
  return r;
}
function Ba(t, e, r = !1) {
  const i = /* @__PURE__ */ new Map(), o = Ih(t, e);
  for (const s of t.allergens || []) {
    const a = Je(s);
    let n;
    if (t.city === "manual") {
      const l = Et(t.entity_prefix);
      if (n = Wt(e, l, a, t.entity_suffix || ""), !n) continue;
    } else if (n = o ? `sensor.pollen_${o}_${a}` : null, !n || !e.states[n]) {
      const l = o ? `sensor.pollen_${o}_` : "sensor.pollen_", d = Object.keys(e.states).filter(
        (c) => c.startsWith(l) && c.endsWith(`_${a}`)
      );
      if (d.length === 1) n = d[0];
      else continue;
    }
    r && console.debug(
      `[PP:resolveEntityIds] allergen: '${s}', rawKey: '${a}', sensorId: '${n}'`
    ), i.set(a, n);
  }
  return i;
}
async function Rh(t, e) {
  var w;
  const r = [], i = !!e.debug, o = (S) => {
    const [P] = S.split("T"), [x, E, L] = P.split("-").map(Number);
    return new Date(x, E - 1, L);
  }, s = /* @__PURE__ */ new Date();
  s.setHours(0, 0, 0, 0);
  const { lang: a, locale: n, daysRelative: l, dayAbbrev: d, daysUppercase: c } = st(t, e), { fullPhrases: h, shortPhrases: u, userLevels: _, userDays: p, noInfoLabel: f } = ot(e, a), m = rt(_, a);
  i && console.debug("PP.fetchForecast — start", { city: e.city, lang: a });
  const y = (S) => Zt(S, 6, null), g = e.days_to_show ?? Ue.days_to_show, v = e.pollen_threshold ?? Ue.pollen_threshold, k = Ba(e, t, i);
  for (const S of e.allergens)
    try {
      const P = {};
      P.days = [];
      const x = Je(S);
      P.allergenReplaced = x;
      const { allergenCapitalized: E, allergenShort: L } = zt(x, {
        fullPhrases: h,
        shortPhrases: u,
        abbreviated: e.allergens_abbreviated,
        lang: a,
        configKey: S
      });
      P.allergenCapitalized = E, P.allergenShort = L;
      const z = k.get(x);
      if (!z) continue;
      const C = t.states[z];
      if (!((w = C == null ? void 0 : C.attributes) != null && w.forecast)) throw "Missing forecast";
      P.entity_id = z;
      const $ = C.attributes.forecast, M = Array.isArray($) ? $.reduce((D, T) => {
        const B = T.time || T.datetime;
        return D[B] = T, D;
      }, {}) : $, b = Object.keys(M).sort(
        (D, T) => o(D) - o(T)
      ).filter((D) => o(D) >= s);
      let A = [];
      if (b.length >= g)
        A = b.slice(0, g);
      else {
        A = b.slice();
        let D = b.length > 0 ? o(b[b.length - 1]) : s;
        for (; A.length < g; ) {
          D = new Date(D.getTime() + 864e5);
          const T = D.getFullYear(), B = String(D.getMonth() + 1).padStart(2, "0"), I = String(D.getDate()).padStart(2, "0");
          A.push(`${T}-${B}-${I}T00:00:00`);
        }
      }
      A.forEach((D, T) => {
        const B = M[D] || {}, I = y(B.level), G = o(D), O = Math.round((G - s) / 864e5), H = nt(G, O, { daysRelative: l, dayAbbrev: d, daysUppercase: c, userDays: p, lang: a, locale: n });
        if (I !== null) {
          const F = {
            name: P.allergenCapitalized,
            day: H,
            state: I,
            state_text: m[I]
          };
          P[`day${T}`] = F, P.days.push(F);
        } else if (v === 0) {
          const F = {
            name: P.allergenCapitalized,
            day: H,
            state: 0,
            state_text: f
          };
          P[`day${T}`] = F, P.days.push(F);
        }
      }), it(P.days, v) && r.push(P);
    } catch (P) {
      console.warn(`[PP] Fel vid allergen ${S}:`, P);
    }
  return $e(r, e.sort), i && console.debug("PP.fetchForecast — done", r), r;
}
const Nh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetchForecast: Rh,
  resolveEntityIds: Ba,
  stubConfigPP: Ue
}, Symbol.toStringTag, { value: "Module" })), Bh = "state_tomorrow", Hh = "state_in_2_days", jh = "state_today_desc", Fh = "state_tomorrow_desc", Vh = "state_in_2_days_desc", vt = {
  integration: "dwd",
  region_id: "",
  // Optional entity naming used when region_id is "manual"
  entity_prefix: "",
  entity_suffix: "",
  allergens: [
    "erle",
    "ambrosia",
    "esche",
    "birke",
    "hasel",
    "gräser",
    "beifuss",
    "roggen"
  ],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...V,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  show_empty_days: !1,
  debug: !1,
  show_version: !0,
  days_to_show: 2,
  days_relative: !0,
  days_abbreviated: !1,
  days_uppercase: !1,
  days_boldfaced: !1,
  pollen_threshold: 0.5,
  sort: "value_descending",
  allergy_risk_top: !0,
  allergens_abbreviated: !1,
  link_to_sensors: !0,
  date_locale: void 0,
  title: void 0,
  phrases: {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: ""
  }
};
function Ha(t, e, r = !1) {
  const i = /* @__PURE__ */ new Map();
  for (const o of t.allergens || []) {
    const s = yi(o);
    let a;
    if (t.region_id === "manual") {
      const n = Et(t.entity_prefix);
      if (a = Wt(e, n, s, t.entity_suffix || ""), !a) continue;
    } else if (a = t.region_id ? `sensor.pollenflug_${s}_${t.region_id}` : null, !a || !e.states[a]) {
      const n = Object.keys(e.states).filter(
        (l) => l.startsWith(`sensor.pollenflug_${s}_`)
      );
      if (n.length === 1) a = n[0];
      else continue;
    }
    r && console.debug(
      `[DWD:resolveEntityIds] allergen: '${o}', rawKey: '${s}', sensorId: '${a}'`
    ), i.set(s, a);
  }
  return i;
}
async function Gh(t, e) {
  const r = !!e.debug, { lang: i, locale: o, daysRelative: s, dayAbbrev: a, daysUppercase: n } = st(t, e, vt.date_locale), { fullPhrases: l, shortPhrases: d, userLevels: c, userDays: h, noInfoLabel: u } = ot(e, i), _ = rt(c, i), p = e.days_to_show ?? vt.days_to_show, f = e.pollen_threshold ?? vt.pollen_threshold;
  r && console.debug("DWD adapter: start fetchForecast", { config: e, lang: i });
  const m = (k) => Zt(k, null, -1), y = /* @__PURE__ */ new Date();
  y.setHours(0, 0, 0, 0);
  const g = [], v = Ha(e, t, r);
  for (const k of e.allergens)
    try {
      const w = {}, S = yi(k);
      w.allergenReplaced = S;
      const { allergenCapitalized: P, allergenShort: x } = zt(S, {
        fullPhrases: l,
        shortPhrases: d,
        abbreviated: e.allergens_abbreviated,
        lang: i,
        configKey: k
      });
      w.allergenCapitalized = P, w.allergenShort = x;
      const E = v.get(S);
      if (!E) continue;
      const L = t.states[E];
      w.entity_id = E;
      const z = m(L.state), C = m(L.attributes[Bh]), $ = m(L.attributes[Hh]), M = [
        { date: y, level: z },
        { date: new Date(y.getTime() + 864e5), level: C },
        { date: new Date(y.getTime() + 2 * 864e5), level: $ }
      ];
      for (; M.length < p; ) {
        const R = M.length;
        M.push({
          date: new Date(y.getTime() + R * 864e5),
          level: -1
        });
      }
      w.days = [], M.forEach((R, b) => {
        if (R.level !== null && R.level >= 0) {
          const A = Math.round((R.date - y) / 864e5), D = nt(R.date, A, { daysRelative: s, dayAbbrev: a, daysUppercase: n, userDays: h, lang: i, locale: o }), T = L.attributes[b === 0 ? jh : b === 1 ? Fh : Vh] || "", B = R.level * 2, I = Math.min(Math.max(Math.round(B), 0), 6), G = I < 0 ? u : _[I] || T;
          w[`day${b}`] = {
            name: w.allergenCapitalized,
            day: D,
            state: R.level,
            display_state: B,
            state_text: G
          }, w.days.push(w[`day${b}`]);
        }
      }), it(w.days, f) && g.push(w);
    } catch (w) {
      console.warn(`DWD adapter error for allergen ${k}:`, w);
    }
  return $e(g, e.sort), r && console.debug("DWD adapter complete sensors:", g), g;
}
const Wh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetchForecast: Gh,
  resolveEntityIds: Ha,
  stubConfigDWD: vt
}, Symbol.toStringTag, { value: "Module" })), Nt = {
  integration: "silam",
  location: "",
  // Optional entity naming used when location is "manual"
  entity_prefix: "",
  entity_suffix: "",
  allergens: [
    "alder",
    "birch",
    "grass",
    "hazel",
    "mugwort",
    "olive",
    "ragweed"
  ],
  minimal: !1,
  minimal_gap: 35,
  mode: "daily",
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...V,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  show_empty_days: !1,
  debug: !1,
  show_version: !0,
  days_to_show: 5,
  days_relative: !0,
  days_abbreviated: !1,
  days_uppercase: !1,
  days_boldfaced: !1,
  pollen_threshold: 1,
  sort: "value_descending",
  index_top: !0,
  allergens_abbreviated: !1,
  link_to_sensors: !0,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
}, zo = [...Nt.allergens, "index"], ja = {
  // birch: [5, 25, 50, 100, 500, 1000, 5000],
  // grass: [5, 25, 50, 100, 500, 1000, 5000],
  // hazel: [5, 25, 50, 100, 500, 1000, 5000],
  // The above are the correct level thresholds
  // The below has lower thresholds specifically for the first, lowest level.
  // Just seemed odd to have documented pollen levels, but tell the user that
  // there is *none.*
  birch: [1, 25, 50, 100, 500, 1e3, 5e3],
  grass: [1, 25, 50, 100, 500, 1e3, 5e3],
  hazel: [1, 25, 50, 100, 500, 1e3, 5e3],
  alder: [1, 10, 25, 50, 100, 500, 1e3],
  ragweed: [1, 10, 25, 50, 100, 500, 1e3],
  mugwort: [1, 10, 25, 50, 100, 500, 1e3],
  olive: [1, 10, 25, 50, 100, 500, 1e3]
};
function oi(t, e) {
  const r = ja[t];
  return !r || isNaN(e) ? -1 : e < r[0] ? 0 : e < r[1] ? 1 : e < r[2] ? 2 : e < r[3] ? 3 : e < r[4] ? 4 : e < r[5] ? 5 : 6;
}
function pr(t) {
  if (t == null) return -1;
  const e = [0, 1, 3, 5, 6], r = {
    very_low: 0,
    low: 1,
    moderate: 2,
    high: 3,
    very_high: 4
  };
  if (typeof t == "string") {
    const o = r[t.toLowerCase()];
    return o == null ? -1 : e[Math.max(0, Math.min(o, 4))];
  }
  const i = Number(t);
  if (!isNaN(i)) {
    const o = Math.max(0, Math.min(Math.round(i), 4));
    return e[o];
  }
  return -1;
}
function Fa(t, e, r, i) {
  let o;
  e[t] ? o = e[t] : ue.names && ue.names[t] && ue.names[t][i] ? o = ue.names[t][i] : o = t.charAt(0).toUpperCase() + t.slice(1);
  const s = r[t] || o;
  return { allergenCapitalized: o, allergenShort: s };
}
function Va(t, e, r = !1) {
  var l;
  const i = /* @__PURE__ */ new Map(), o = t.location === "manual" ? "" : t.location || "", s = o.toLowerCase(), a = yt(e, r), n = Rr(a, o, r);
  for (const d of t.allergens || []) {
    const c = Je(d), h = At(c);
    let u = null;
    if (t.location === "manual") {
      const _ = Et(t.entity_prefix), p = t.entity_suffix || "";
      if (u = Wt(e, _, h, p), !u)
        for (const f of Object.values(ue.mapping)) {
          const m = Object.entries(f).reduce(
            (y, [g, v]) => (y[v] = g, y),
            {}
          );
          if (m[h] && m[h] !== h && (u = Wt(e, _, m[h], p), u))
            break;
        }
    } else (l = n == null ? void 0 : n.sensors) != null && l.size && (u = n.sensors.get(h) || null, u && !e.states[u] && (u = null));
    if (!u && t.location !== "manual") {
      for (const _ of Object.values(ue.mapping)) {
        const p = Object.entries(_).reduce(
          (f, [m, y]) => (f[y] = m, f),
          {}
        );
        if (p[h]) {
          const f = `sensor.silam_pollen_${s}_${p[h]}`;
          if (e.states[f]) {
            u = f;
            break;
          }
        }
      }
      if (!u) {
        const _ = `sensor.silam_pollen_${s}_${h}`;
        e.states[_] && (u = _);
      }
    }
    r && console.debug(
      `[SILAM:resolveEntityIds] allergen: '${h}', sensorId: '${u}'`
    ), u && i.set(h, u);
  }
  return i;
}
async function Uh(t, e, r = null) {
  var M, R;
  const i = !!e.debug, { lang: o, locale: s, daysRelative: a, dayAbbrev: n, daysUppercase: l } = st(t, e), { fullPhrases: d, shortPhrases: c, userLevels: h, userDays: u, noInfoLabel: _ } = ot(e, o), p = rt(h, o), f = /* @__PURE__ */ new Date();
  f.setHours(0, 0, 0, 0);
  const m = e.days_to_show ?? Nt.days_to_show, y = e.pollen_threshold ?? Nt.pollen_threshold;
  let g;
  e.location === "manual" && e.entity_prefix ? g = Et(e.entity_prefix).replace(/_$/, "") : e.location === "manual" ? g = "" : g = e.location || "";
  const v = yt(t, i), k = Rr(v, g, i), w = (k == null ? void 0 : k.weatherEntity) || Na(t, g, s, i, v);
  if (!w || !t.states[w])
    return i && console.warn("[SILAM] Ingen weather-entity hittad:", w), [];
  const S = t.states[w], x = (e.allergens || Nt.allergens).map((b) => {
    const A = Je(b);
    return At(A);
  });
  let E = [];
  r && r.forecast && Array.isArray(r.forecast) ? E = r.forecast : Array.isArray(S.attributes.forecast) && (E = S.attributes.forecast);
  let L;
  e.mode === "hourly" || e.mode === "twice_daily" ? L = Math.min(E.length, m) : L = Math.min(E.length + 1, m);
  const z = Va(e, t, i);
  let C = !1;
  e.location !== "manual" && k && k.sensors.size === 0 && !x.includes("allergy_risk") && (x.push("allergy_risk"), C = !0, i && console.debug("[SILAM] Discovery found 0 allergen sensors; auto-adding allergy_risk"));
  const $ = [];
  for (const b of x)
    try {
      const A = {};
      A.days = [], A.allergenReplaced = b;
      const { allergenCapitalized: D, allergenShort: T } = Fa(
        b,
        d,
        c,
        o
      );
      if (A.allergenCapitalized = D, A.allergenShort = e.allergens_abbreviated ? T : D, b === "allergy_risk") {
        const O = ((R = (M = ue.names) == null ? void 0 : M.allergy_risk) == null ? void 0 : R[o]) || "Index";
        A.allergenCapitalized = O, A.allergenShort = O;
      }
      const B = z.get(b) || null;
      A.entity_id = B;
      let I = [];
      if (b === "allergy_risk")
        if (e.mode === "hourly" || e.mode === "twice_daily")
          for (let O = 0; O < L; ++O) {
            const H = E[O], F = H ? H.index ?? H.pollen_index : null;
            I.push(pr(F));
          }
        else {
          const O = S.attributes.index ?? S.attributes.pollen_index ?? S.state;
          I.push(pr(O));
          for (let H = 1; H < L; ++H) {
            const F = E[H - 1], U = F ? F.index ?? F.pollen_index : null;
            I.push(pr(U));
          }
        }
      else if (e.mode === "hourly" || e.mode === "twice_daily")
        for (let O = 0; O < L; ++O) {
          const H = E[O], F = H ? Number(H[`pollen_${b}`]) : NaN;
          I.push(oi(b, F));
        }
      else {
        const O = Number(S.attributes[`pollen_${b}`]);
        I.push(oi(b, O));
        for (let H = 1; H < L; ++H) {
          const F = E[H - 1], U = F ? Number(F[`pollen_${b}`]) : NaN;
          I.push(oi(b, U));
        }
      }
      for (let O = 0; O < L; ++O) {
        const H = I[O];
        let F, U, J;
        if (e.mode === "hourly" || e.mode === "twice_daily")
          if (E[O] && (E[O].datetime || E[O].time) ? J = new Date(E[O].datetime || E[O].time) : J = new Date(f.getTime() + O * 36e5), e.mode === "twice_daily") {
            const pe = J.toLocaleDateString(s, { weekday: "short" });
            F = pe.charAt(0).toUpperCase() + pe.slice(1), U = O % 2 === 0 ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down", l && (F = F.toUpperCase());
          } else
            F = J.toLocaleTimeString(s, {
              hour: "2-digit",
              minute: "2-digit"
            }) || "", U = null;
        else
          J = new Date(f.getTime() + O * 864e5), F = nt(J, O, { daysRelative: a, dayAbbrev: n, daysUppercase: l, userDays: u, lang: o, locale: s }), U = null;
        const ge = H < 0 ? 0 : Math.min(Math.round(H), 6), xe = C && b === "allergy_risk" && H === 0 ? oe("card.index.very_low", o) || p[0] : H < 0 ? _ : p[ge] || String(H);
        A[`day${O}`] = {
          name: A.allergenCapitalized,
          day: F,
          icon: U,
          state: H,
          state_text: xe
        }, A.days.push(A[`day${O}`]);
      }
      (C && b === "allergy_risk" || it(A.days, y)) && $.push(A);
    } catch (A) {
      i && console.warn(`[SILAM] Fel vid allergen ${b}:`, A);
    }
  if ($e($, e.sort), e.index_top || e.allergy_risk_top) {
    const b = $.findIndex(
      (A) => A.allergenReplaced === "allergy_risk" || A.allergenReplaced === "index"
    );
    if (b > 0) {
      const [A] = $.splice(b, 1);
      $.unshift(A);
    }
  }
  return i && console.debug("[SILAM] fetchForecast klar:", $), $;
}
const Kh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SILAM_ALLERGENS: zo,
  SILAM_THRESHOLDS: ja,
  fetchForecast: Uh,
  getAllergenNames: Fa,
  grainsToLevel: oi,
  indexToLevel: pr,
  resolveEntityIds: Va,
  stubConfigSILAM: Nt
}, Symbol.toStringTag, { value: "Module" })), bt = {
  integration: "peu",
  location: "",
  // Optional entity naming used when location is "manual"
  entity_prefix: "",
  entity_suffix: "",
  allergens: [
    "alder",
    "ash",
    "beech",
    "birch",
    "cypress_family",
    "elm",
    "grasses",
    "hazel",
    "lime",
    "fungal_spores",
    "mugwort",
    "nettle_family",
    "oak",
    "olive",
    "plane_tree",
    "ragweed",
    "rye",
    "willow"
  ],
  minimal: !1,
  minimal_gap: 35,
  mode: "daily",
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...V,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  numeric_state_raw_risk: !1,
  show_empty_days: !1,
  debug: !1,
  show_version: !0,
  days_to_show: 4,
  days_relative: !0,
  days_abbreviated: !1,
  days_uppercase: !1,
  days_boldfaced: !1,
  pollen_threshold: 1,
  sort: "value_descending",
  allergy_risk_top: !0,
  allergens_abbreviated: !1,
  link_to_sensors: !0,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
}, nr = ["allergy_risk", ...bt.allergens];
function Yh(t, e) {
  if (t.location === "manual") return "";
  let r = ke(t.location || "");
  if (!r) {
    const i = Object.keys(e.states).filter(
      (o) => o.startsWith("sensor.polleninformation_")
    );
    if (i.length) {
      const o = i[0].match(/^sensor\.polleninformation_(.+)_[^_]+$/);
      r = o ? o[1] : "";
    }
  }
  return r;
}
function Ga(t, e, r = !1) {
  const i = /* @__PURE__ */ new Map(), o = Yh(t, e), s = t.mode || bt.mode, a = Object.keys(e.states).filter(
    (n) => n.startsWith("sensor.polleninformation_")
  );
  for (const n of t.allergens || []) {
    const l = n;
    let d;
    if (t.location === "manual") {
      const c = Et(t.entity_prefix);
      if (d = Wt(e, c, s !== "daily" && l === "allergy_risk" ? "allergy_risk_hourly" : l, t.entity_suffix || ""), !d) continue;
    } else if (s !== "daily" && l === "allergy_risk" ? d = o ? `sensor.polleninformation_${o}_allergy_risk_hourly` : null : d = o ? `sensor.polleninformation_${o}_${l}` : null, !d || !e.states[d]) {
      const c = a.filter((h) => {
        const u = h.match(/^sensor\.polleninformation_(.+)_(.+)$/);
        if (!u) return !1;
        const _ = u[1], p = u[2];
        return s !== "daily" && l === "allergy_risk" ? (!o || _ === o) && p === "allergy_risk_hourly" : (!o || _ === o) && p === l;
      });
      if (c.length === 1) d = c[0];
      else continue;
    }
    r && console.debug(
      `[PEU:resolveEntityIds] allergen: '${n}', locationSlug: '${o}', sensorId: '${d}'`
    ), i.set(l, d);
  }
  return i;
}
async function qh(t, e) {
  var x, E, L, z, C;
  const r = !!e.debug, { lang: i, locale: o, daysRelative: s, dayAbbrev: a, daysUppercase: n } = st(t, e), { fullPhrases: l, shortPhrases: d, userLevels: c, userDays: h, noInfoLabel: u } = ot(e, i), _ = 5;
  let f = Array.from(
    { length: 7 },
    ($, M) => oe(`card.levels.${M}`, i)
  ).slice();
  Array.isArray(c) && (c.length === 7 ? f = rt(c, i) : c.length === _ && [0, 1, 3, 5, 6].forEach((M, R) => {
    const b = c[R];
    b != null && b !== "" && (f[M] = b);
  }));
  const m = ($) => Zt($, 4, -1), y = /* @__PURE__ */ new Date();
  y.setHours(0, 0, 0, 0);
  const g = e.days_to_show ?? bt.days_to_show, v = e.pollen_threshold ?? bt.pollen_threshold, k = e.mode || bt.mode, w = {
    hourly: 1,
    hourly_second: 2,
    hourly_third: 3,
    hourly_fourth: 4,
    hourly_sixth: 6,
    hourly_eighth: 8,
    twice_daily: 12
  }, S = Ga(e, t, r), P = [];
  for (const $ of e.allergens)
    try {
      const M = {};
      M.days = [];
      const R = $;
      M.allergenReplaced = R;
      const { allergenCapitalized: b, allergenShort: A } = zt(R, {
        fullPhrases: l,
        shortPhrases: d,
        abbreviated: e.allergens_abbreviated,
        lang: i
      });
      M.allergenCapitalized = b, M.allergenShort = A;
      const D = S.get(R);
      if (!D) continue;
      const T = t.states[D];
      M.entity_id = D;
      const B = ((x = T == null ? void 0 : T.attributes) == null ? void 0 : x.data_stale) === !0, I = Array.isArray((E = T == null ? void 0 : T.attributes) == null ? void 0 : E.forecast) && ((z = (L = T == null ? void 0 : T.attributes) == null ? void 0 : L.forecast) == null ? void 0 : z.length) > 0;
      if (B || !I) {
        M.stale = !0, M.staleSince = ((C = T == null ? void 0 : T.attributes) == null ? void 0 : C.stale_since) || null, M.days = [], P.push(M);
        continue;
      }
      const G = T.attributes.forecast;
      if (k !== "daily" && R === "allergy_risk") {
        const O = w[k] || 1, H = Math.min(
          Math.floor(G.length / O),
          g
        );
        for (let F = 0; F < H; ++F) {
          const U = G[F * O] || {}, J = U.time ? new Date(U.time) : U.datetime ? new Date(U.datetime) : new Date(y.getTime() + F * O * 36e5);
          let ge, xe = null;
          k === "twice_daily" ? (ge = J.toLocaleDateString(o, { weekday: "short" }).replace(/^./, (Hi) => Hi.toUpperCase()), n && (ge = ge.toUpperCase()), xe = F % 2 === 0 ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down") : ge = J.toLocaleTimeString(o, {
            hour: "2-digit",
            minute: "2-digit"
          }) || "";
          let pe = Number(U.numeric_state ?? U.level ?? -1), lt = pe;
          R === "allergy_risk" && e.numeric_state_raw_risk && (lt = Number(
            U.numeric_state_raw ?? U.level_raw ?? lt
          ));
          const Tt = pr(pe), Hr = {
            name: M.allergenCapitalized,
            day: ge,
            icon: xe,
            state: pe,
            // Separate property used purely for numeric display.
            display_state: lt,
            state_text: Tt < 0 ? u : f[Tt] || oe(`card.levels.${Tt}`, i)
          };
          M[`day${F}`] = Hr, M.days.push(Hr);
        }
      } else {
        const O = G.reduce((J, ge) => {
          const xe = ge.time || ge.datetime;
          return J[xe] = ge, J;
        }, {}), F = Object.keys(O).sort(
          (J, ge) => new Date(J) - new Date(ge)
        ).filter((J) => new Date(J) >= y);
        let U = [];
        if (F.length >= g)
          U = F.slice(0, g);
        else {
          U = F.slice();
          let J = F.length > 0 ? new Date(F[F.length - 1]) : y;
          for (; U.length < g; ) {
            J = new Date(J.getTime() + 864e5);
            const ge = J.getFullYear(), xe = String(J.getMonth() + 1).padStart(2, "0"), pe = String(J.getDate()).padStart(2, "0");
            U.push(`${ge}-${xe}-${pe}T00:00:00`);
          }
        }
        U.forEach((J, ge) => {
          const xe = O[J] || {};
          let pe = m(xe.level), lt = pe;
          if (R === "allergy_risk" && e.numeric_state_raw_risk && (xe.numeric_state_raw != null ? lt = Number(xe.numeric_state_raw) : xe.level_raw != null && (lt = Number(xe.level_raw))), pe !== null && pe >= 0) {
            const Tt = new Date(J), Hr = Math.round((Tt - y) / 864e5), Hi = nt(Tt, Hr, { daysRelative: s, dayAbbrev: a, daysUppercase: n, userDays: h, lang: i, locale: o });
            let Qt;
            pe < 2 ? Qt = Math.floor(pe * 6 / 4) : Qt = Math.ceil(pe * 6 / 4);
            const ps = {
              name: M.allergenCapitalized,
              day: Hi,
              state: pe,
              // Raw value used only for display when available.
              display_state: lt,
              state_text: Qt < 0 ? u : f[Qt] || oe(`card.levels.${Qt}`, i)
            };
            M[`day${ge}`] = ps, M.days.push(ps);
          }
        });
      }
      it(M.days, v) && P.push(M);
    } catch (M) {
      r && console.warn(`Fel vid allergen ${$}:`, M);
    }
  if ($e(P, e.sort), e.allergy_risk_top) {
    const $ = P.findIndex(
      (M) => M.allergenReplaced === "allergy_risk" || M.allergenReplaced === "index"
    );
    if ($ > 0) {
      const [M] = P.splice($, 1);
      P.unshift(M);
    }
  }
  return r && console.debug("PEU.fetchForecast — done", P), P;
}
const Xh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PEU_ALLERGENS: nr,
  fetchForecast: qh,
  resolveEntityIds: Ga,
  stubConfigPEU: bt
}, Symbol.toStringTag, { value: "Module" })), Eo = "kleenex_pollen_radar", Lo = {
  // Trees - English (EN/US)
  hazel: "hazel",
  elm: "elm",
  pine: "pine",
  alder: "alder",
  poplar: "poplar",
  oak: "oak",
  plane: "plane",
  birch: "birch",
  cypress: "cypress",
  // Trees - French (FR)
  noisetier: "hazel",
  orme: "elm",
  pin: "pine",
  aulne: "alder",
  peuplier: "poplar",
  chêne: "oak",
  platane: "plane",
  bouleau: "birch",
  cyprès: "cypress",
  // Trees - Italian (IT)
  nocciolo: "hazel",
  olmo: "elm",
  pino: "pine",
  ontano: "alder",
  pioppo: "poplar",
  quercia: "oak",
  platano: "plane",
  betulla: "birch",
  cipresso: "cypress",
  // Trees - Dutch (NL)
  hazelaar: "hazel",
  iep: "elm",
  pijnboom: "pine",
  els: "alder",
  populier: "poplar",
  eik: "oak",
  plataan: "plane",
  berk: "birch",
  cipres: "cypress",
  // Grass - Multiple languages
  grass: "grass",
  poaceae: "poaceae",
  // EN/US/FR/NL
  graminacee: "poaceae",
  // IT
  // Weeds - English (EN/US)
  weeds: "weeds",
  ragweed: "ragweed",
  mugwort: "mugwort",
  chenopod: "chenopod",
  nettle: "nettle",
  // Weeds - French (FR)
  ambroisie: "ragweed",
  armoise: "mugwort",
  chénopodes: "chenopod",
  ortie: "nettle",
  // Weeds - Italian (IT)
  ambrosia: "ragweed",
  artemisia: "mugwort",
  chenopodio: "chenopod",
  ortica: "nettle",
  // Weeds - Dutch (NL)
  // ambrosia: "ragweed", // Same as Italian, already defined
  bijvoet: "mugwort",
  ganzevoet: "chenopod",
  brandnetel: "nettle"
}, Ut = {
  integration: "kleenex",
  location: "",
  // Optional entity naming used when location is "manual"
  entity_prefix: "",
  entity_suffix: "",
  allergens: [
    // Individual allergens (detailed sensors) - enabled by default, alphabetically ordered
    "alder",
    "birch",
    "chenopod",
    "cypress",
    "elm",
    "hazel",
    "mugwort",
    "nettle",
    "oak",
    "pine",
    "plane",
    "poaceae",
    "poplar",
    "ragweed"
    // General categories (broad sensors) - disabled by default
    // "trees_cat",
    // "grass_cat",
    // "weeds_cat",
  ],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...V,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  show_empty_days: !1,
  debug: !1,
  show_version: !0,
  days_to_show: 5,
  days_relative: !0,
  days_abbreviated: !1,
  days_uppercase: !1,
  days_boldfaced: !1,
  pollen_threshold: 1,
  sort: "value_descending",
  sort_category_allergens_first: !0,
  allergy_risk_top: !0,
  allergens_abbreviated: !1,
  link_to_sensors: !0,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
}, Wa = {
  // Trees category
  trees_cat: "trees",
  trees: "trees",
  // Keep compatibility for sensor mapping
  hazel: "trees",
  elm: "trees",
  pine: "trees",
  alder: "trees",
  poplar: "trees",
  oak: "trees",
  plane: "trees",
  birch: "trees",
  cypress: "trees",
  // Grass category
  grass_cat: "grass",
  grass: "grass",
  // Keep compatibility for sensor mapping
  poaceae: "grass",
  // Weeds category
  weeds_cat: "weeds",
  weeds: "weeds",
  // Keep compatibility for sensor mapping
  ragweed: "weeds",
  mugwort: "weeds",
  chenopod: "weeds",
  nettle: "weeds"
}, Ua = {
  alder: "trees",
  birch: "trees",
  cypress: "trees",
  elm: "trees",
  hazel: "trees",
  oak: "trees",
  pine: "trees",
  plane: "trees",
  poplar: "trees",
  poaceae: "grass",
  mugwort: "weeds",
  ragweed: "weeds",
  chenopod: "weeds",
  nettle: "weeds"
};
function Zh(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function ar(t, e) {
  const r = Number(t);
  if (isNaN(r) || r < 0) return -1;
  if (r === 0) return 0;
  const i = Wa[e] || "trees";
  let o;
  switch (i) {
    case "trees":
      o = [95, 207, 703];
      break;
    case "weeds":
      o = [20, 77, 266];
      break;
    case "grass":
      o = [29, 60, 341];
      break;
    default:
      o = [95, 207, 703];
  }
  return r <= o[0] ? 1 : r <= o[1] ? 2 : r <= o[2] ? 3 : 4;
}
function Qh(t, e, r = !1) {
  const i = /* @__PURE__ */ new Map(), o = ke(t.location || ""), s = ["trees", "grass", "weeds"], a = /* @__PURE__ */ new Set();
  for (const n of t.allergens || [])
    if (s.includes(n))
      a.add(n);
    else if (n.endsWith("_cat")) {
      const l = n.replace("_cat", "");
      s.includes(l) && a.add(l);
    } else {
      const l = Ua[n];
      l && a.add(l);
    }
  for (const n of a) {
    let l;
    if (t.location === "manual") {
      const d = Et(t.entity_prefix), c = t.entity_suffix || "";
      if (l = `sensor.${d}${n}${c}`, !e.states[l]) {
        const h = Object.entries(Co).filter(([p, f]) => f === n).map(([p]) => p), u = `sensor.${d}`, _ = Object.keys(e.states).filter((p) => {
          if (!p.startsWith(u)) return !1;
          const f = p.substring(u.length);
          if (c && !f.endsWith(c)) return !1;
          const m = c ? f.substring(0, f.length - c.length) : f;
          return h.some((y) => m.startsWith(y));
        });
        _.length >= 1 && (l = _[0]);
      }
    } else if (l = o ? `sensor.kleenex_pollen_radar_${o}_${n}` : null, !l || !e.states[l]) {
      const d = Object.entries(Co).filter(([h, u]) => u === n).map(([h]) => h), c = Object.keys(e.states).filter((h) => {
        if (!h.startsWith("sensor.kleenex_pollen_radar_") || o && !h.substring(28).startsWith(o + "_"))
          return !1;
        const u = h.split("_"), _ = u[u.length - 1];
        return d.some((p) => _.startsWith(p));
      });
      c.length >= 1 && (l = c[0]);
    }
    r && console.debug(
      `[Kleenex:resolveEntityIds] category: '${n}', sensorId: '${l}', exists: ${!!e.states[l]}`
    ), e.states[l] && i.set(n, l);
  }
  return i;
}
async function Jh(t, e) {
  var w, S, P;
  const { lang: r, locale: i, daysRelative: o, dayAbbrev: s, daysUppercase: a } = st(t, e), n = e.debug, l = e.days_to_show || Ut.days_to_show, { fullPhrases: d, shortPhrases: c, userLevels: h, userDays: u, noInfoLabel: _ } = ot(e, r), p = e.pollen_threshold ?? Ut.pollen_threshold, f = (x) => Zt(x, 4, -1);
  n && console.debug("[Kleenex] Adapter: start fetchForecast", { config: e, lang: r });
  const m = /* @__PURE__ */ new Date();
  m.setHours(0, 0, 0, 0);
  let y = Object.values(t.states).filter((x) => x.entity_id && x.entity_id.startsWith(`sensor.${Eo}_`));
  if (e.location && e.location !== "manual") {
    const x = ke(e.location);
    n && console.debug(
      `[Kleenex] Filtering sensors for location: ${e.location} (normalized: ${x})`
    ), y = y.filter((E) => {
      const z = E.entity_id.replace(`sensor.${Eo}_`, "").replace(/_[^_]+$/, ""), C = z === x;
      return n && C && console.debug(
        `[Kleenex] Location match: ${E.entity_id} -> locPart: ${z}`
      ), C;
    }), n && console.debug(
      `[Kleenex] After location filtering: ${y.length} sensors for location '${x}'`
    );
  } else if (e.location === "manual") {
    let x = e.entity_prefix || "";
    if (x.startsWith("sensor.") && (x = x.substring(7)), x && !x.endsWith("_") && (x = x + "_"), n && console.debug(
      `[Kleenex] Manual mode filtering with prefix: '${x}'`
    ), x) {
      const E = `sensor.${x}`;
      y = y.filter((L) => {
        const z = L.entity_id.startsWith(E);
        return n && z && console.debug(
          `[Kleenex] Manual mode match: ${L.entity_id}`
        ), z;
      }), n && console.debug(
        `[Kleenex] After manual mode filtering: ${y.length} sensors with prefix '${E}'`
      );
    }
  }
  n && console.debug(
    "[Kleenex] Sensors found:",
    y.map((x) => x.entity_id)
  );
  let g = [];
  const v = /* @__PURE__ */ new Map();
  n && console.debug(
    `[Kleenex] Processing ${y.length} sensors for allergens:`,
    e.allergens
  );
  for (const x of y) {
    n && console.debug(`[Kleenex] === PROCESSING SENSOR: ${x.entity_id} ===`);
    const E = x.attributes || {}, L = E.details || [], z = E.forecast || [];
    let C = null;
    const $ = x.entity_id.split("_").pop();
    for (const [M, R] of Object.entries(Co))
      if ($.startsWith(M)) {
        C = R;
        break;
      }
    if (n && console.debug(
      `[Kleenex] Processing sensor ${x.entity_id}, category: ${C}, details count: ${L.length}, forecast days: ${z.length}`
    ), C) {
      let M = C;
      if (C === "trees" && e.allergens.includes("trees_cat") ? M = "trees_cat" : C === "grass" && e.allergens.includes("grass_cat") ? M = "grass_cat" : C === "weeds" && e.allergens.includes("weeds_cat") && (M = "weeds_cat"), n && console.debug(
        `[Kleenex] Category sensor mapping: ${C} -> ${M}, included in config: ${e.allergens.includes(M)}`
      ), e.allergens.includes(M)) {
        n && console.debug(
          `[Kleenex] Processing CATEGORY sensor for: ${C} -> ${M}`
        ), v.has(M) || (v.set(M, {
          levels: [],
          entity_id: x.entity_id,
          source: "category_sensor"
          // Track data source
        }), n && console.debug(`[Kleenex] CREATED allergenData entry for category: ${M}`));
        const R = v.get(M), b = Number(x.state) || 0, A = ar(b, M), D = f(A);
        n && console.debug(
          `[Kleenex] CATEGORY ${M} TODAY: sensor_state=${x.state}, parsed_value=${b}, raw_level=${A}, clamped_level=${D}, text_level=${(w = x.attributes) == null ? void 0 : w.level}`
        ), R.levels[0] = {
          date: new Date(m),
          level: D,
          // Store raw level (0-4)
          value: b
        }, n && console.debug(`[Kleenex] CATEGORY ${M} TODAY DATA SET: level=${D}, value=${b}`), z.forEach((T, B) => {
          const I = Number(T.value) || 0, G = ar(I, M), O = f(G);
          n && console.debug(
            `[Kleenex] CATEGORY ${M} FORECAST day ${B + 1}: value=${I}, raw_level=${G}, clamped_level=${O}, text_level=${T.level}`
          ), R.levels[B + 1] = {
            date: new Date(m.getTime() + (B + 1) * 864e5),
            level: O,
            // Store raw level (0-4)
            value: I
          }, n && console.debug(`[Kleenex] CATEGORY ${M} FORECAST DAY ${B + 1} DATA SET: level=${O}, value=${I}`);
        });
      } else
        n && console.debug(
          `[Kleenex] SKIPPING category sensor ${C} -> ${M}: not in config.allergens [${e.allergens.join(", ")}]`
        );
    }
    n && console.debug(`[Kleenex] Processing ${L.length} individual allergen details for sensor: ${x.entity_id}`);
    try {
      for (const M of L) {
        const R = (S = M.name) == null ? void 0 : S.toLowerCase();
        if (!R) continue;
        const b = Lo[R] || R;
        if (!e.allergens.includes(b)) {
          n && M.value !== void 0 && console.debug(
            `[Kleenex] SKIPPING individual allergen ${b} (${R}): not in config allergens`
          );
          continue;
        }
        n && console.debug(
          `[Kleenex] Processing INDIVIDUAL allergen: ${b} (original: ${R})`
        ), v.has(b) || v.set(b, {
          levels: [],
          entity_id: x.entity_id,
          source: "individual_details"
          // Track data source
        });
        const A = v.get(b), D = Number(M.value) || 0, T = ar(D, b), B = f(T);
        n && console.debug(
          `[Kleenex] INDIVIDUAL ${b} TODAY: detail_value=${M.value}, parsed_value=${D}, raw_level=${T}, clamped_level=${B}, text_level=${M.level}, source=${x.entity_id}`
        ), (!A.levels[0] || A.source === "individual_details") && (A.levels[0] = {
          date: new Date(m),
          level: B,
          // Store raw level (0-4)
          value: D
        });
      }
    } catch (M) {
      n && console.warn(`[Kleenex] Error processing individual allergens for sensor ${x.entity_id}:`, M);
    }
    try {
      z.forEach((M, R) => {
        var D;
        const b = new Date(
          m.getTime() + (R + 1) * 864e5
        ), A = M.details || [];
        n && A.length > 0 && console.debug(
          `[Kleenex] Processing forecast day ${R + 1} with ${A.length} allergen details`
        );
        for (const T of A) {
          const B = (D = T.name) == null ? void 0 : D.toLowerCase();
          if (!B) continue;
          const I = Lo[B] || B;
          if (!e.allergens.includes(I)) continue;
          v.has(I) || v.set(I, {
            levels: [],
            entity_id: x.entity_id,
            source: "individual_forecast"
            // Track data source
          });
          const G = v.get(I), O = Number(T.value) || 0, H = ar(O, I), F = f(H);
          n && console.debug(
            `[Kleenex] INDIVIDUAL ${I} FORECAST day ${R + 1}: detail_value=${T.value}, parsed_value=${O}, raw_level=${H}, clamped_level=${F}, text_level=${T.level}`
          );
          const U = R + 1;
          (!G.levels[U] || G.source === "individual_forecast" || G.source === "individual_details") && (G.levels[U] = {
            date: b,
            level: F,
            // Store raw level (0-4)
            value: O
          });
        }
      });
    } catch (M) {
      n && console.warn(`[Kleenex] Error processing forecast data for sensor ${x.entity_id}:`, M);
    }
  }
  n && (console.debug(
    "[Kleenex] === ALLERGEN DATA COLLECTION COMPLETE ==="
  ), console.debug(
    `[Kleenex] Collected data for ${v.size} allergens:`,
    Array.from(v.keys())
  ), v.size === 0 ? (console.debug("[Kleenex] WARNING: No allergen data collected! This will result in empty sensors array."), console.debug("[Kleenex] Checking config:", {
    allergens: e.allergens,
    location: e.location,
    filteredSensorCount: y.length
  }), console.debug("[Kleenex] Sensor entity IDs processed:", y.map((x) => x.entity_id)), console.debug("[Kleenex] Was any category sensor found that matches config allergens?")) : (console.debug("[Kleenex] DETAILED ALLERGEN DATA ANALYSIS:"), v.forEach((x, E) => {
    var $;
    const L = ["trees_cat", "grass_cat", "weeds_cat"].includes(E);
    console.debug(`[Kleenex] === ${E.toUpperCase()} (${L ? "CATEGORY" : "INDIVIDUAL"}) ===`), console.debug(`[Kleenex] Source: ${x.source}`), console.debug(`[Kleenex] Entity: ${x.entity_id}`), console.debug(`[Kleenex] Levels array length: ${x.levels.length}`), console.debug(`[Kleenex] Valid levels count (>= 0): ${x.levels.filter((M) => M.level >= 0).length}`), x.levels.forEach((M, R) => {
      var A;
      const b = R === 0 ? "TODAY" : `DAY+${R}`;
      console.debug(`[Kleenex] ${E} ${b}: date=${(A = M.date) == null ? void 0 : A.toISOString().split("T")[0]}, level=${M.level}, value=${M.value}`);
    });
    const z = ($ = x.levels[0]) == null ? void 0 : $.level, C = z !== void 0 && z >= 0;
    console.debug(`[Kleenex] ${E} TODAY DATA CHECK: hasValidToday=${C}, todayLevel=${z}`);
  }))), n && (console.debug(`[Kleenex] === BUILDING SENSORS FROM ${v.size} COLLECTED ALLERGENS ===`), console.debug(`[Kleenex] pollen_threshold = ${p}`), v.forEach((x, E) => {
    console.debug(`[Kleenex] Building sensor for: ${E}, source: ${x.source}, levels_count: ${x.levels.length}`), x.levels[0] ? console.debug(`[Kleenex] ${E} today data: level=${x.levels[0].level}, value=${x.levels[0].value}`) : console.debug(`[Kleenex] ${E} WARNING: No today data found!`);
  }));
  const k = e.sort === "none" ? e.allergens.filter((x) => v.has(x)) : Array.from(v.keys());
  n && console.debug(
    `[Kleenex] Building sensors array ${e.sort === "none" ? "in config order" : "in discovery order"}:`,
    k
  );
  for (const x of k) {
    const E = v.get(x);
    if (E)
      try {
        const L = {};
        L.allergenReplaced = x, L.entity_id = E.entity_id, L.days = [];
        const { allergenCapitalized: z, allergenShort: C } = zt(x, {
          fullPhrases: d,
          shortPhrases: c,
          abbreviated: e.allergens_abbreviated,
          lang: r
        });
        L.allergenCapitalized = z, L.allergenShort = C;
        const $ = E.levels;
        for (; $.length < l; ) {
          const D = $.length;
          $.push({
            date: new Date(m.getTime() + D * 864e5),
            level: -1,
            value: -1
          });
        }
        for (let D = 0; D < l; D++)
          $[D] || ($[D] = {
            date: new Date(m.getTime() + D * 864e5),
            level: -1,
            value: -1
          });
        const M = 5;
        let b = Array.from(
          { length: 7 },
          (D, T) => oe(`card.levels.${T}`, r)
        ).slice();
        Array.isArray(h) && (h.length === 7 ? b = rt(h, r) : h.length === M && [0, 1, 3, 5, 6].forEach((T, B) => {
          const I = h[B];
          I != null && I !== "" && (b[T] = I);
        })), L.levelNames = b;
        for (let D = 0; D < l; D++) {
          const T = $[D], B = T.date, I = Math.round((B - m) / 864e5), G = nt(B, I, { daysRelative: o, dayAbbrev: s, daysUppercase: a, userDays: u, lang: r, locale: i }), O = T.level;
          let H;
          O < 0 ? H = O : O < 2 ? H = Math.floor(O * 6 / 4) : H = Math.ceil(O * 6 / 4);
          const F = {
            name: L.allergenCapitalized,
            day: G,
            state: O,
            // Raw level for sorting and threshold checking
            state_text: H < 0 ? _ : b[H] || oe(`card.levels.${H}`, r),
            value: T.value,
            description: H < 0 ? _ : b[H] || oe(`card.levels.${H}`, r)
          };
          L[`day${D}`] = F, L.days.push(F);
        }
        const A = it(L.days, p);
        if (n) {
          const D = ["trees_cat", "grass_cat", "weeds_cat"].includes(x);
          console.debug(
            `[Kleenex] === THRESHOLD CHECK for ${x} (${D ? "CATEGORY" : "INDIVIDUAL"}) ===`
          ), console.debug(`[Kleenex] pollen_threshold = ${p}`), console.debug(`[Kleenex] days.length = ${L.days.length}`), L.days.forEach((T, B) => {
            console.debug(`[Kleenex] ${x} day${B}: state=${T.state}, value=${T.value}, day=${T.day}, meets_threshold=${T.state >= p}`);
          }), console.debug(`[Kleenex] shouldAdd = ${A} (any day >= ${p}, or threshold===0)`), D && !A ? (console.debug(`[Kleenex] ❌ CATEGORY ALLERGEN ${x} FILTERED OUT BY THRESHOLD!`), console.debug(`[Kleenex] Highest level found: ${Math.max(...L.days.map((T) => T.state))}`)) : D && A && console.debug(`[Kleenex] ✅ CATEGORY ALLERGEN ${x} PASSES THRESHOLD CHECK`);
        }
        A ? (g.push(L), n && console.debug(
          `[Kleenex] SENSOR ADDED for ${x}: today_state=${(P = L.day0) == null ? void 0 : P.state}, entity_id=${L.entity_id}`
        )) : n && console.debug(
          `[Kleenex] SENSOR FILTERED OUT for ${x}: threshold not met (highest level: ${Math.max(...L.days.map((D) => D.state))})`
        );
      } catch (L) {
        console.warn(`[Kleenex] Adapter error for allergen ${x}:`, L);
      }
  }
  if (e.sort !== "none")
    if (e.sort_category_allergens_first) {
      const x = g.filter(
        (L) => ["trees_cat", "grass_cat", "weeds_cat"].includes(L.allergenReplaced)
      ), E = g.filter(
        (L) => !["trees_cat", "grass_cat", "weeds_cat"].includes(L.allergenReplaced)
      );
      $e(x, e.sort), $e(E, e.sort), g = [...x, ...E], n && console.debug(
        `[Kleenex] Two-tiered sorting: ${x.length} category + ${E.length} individual allergens`
      );
    } else
      $e(g, e.sort), n && console.debug(
        `[Kleenex] Standard sorting: ${g.length} allergens sorted together`
      );
  else n && console.debug(
    `[Kleenex] No sorting applied: ${g.length} allergens kept in config order`
  );
  if (n) {
    if (console.debug("[Kleenex] === FINAL ADAPTER RESULTS ==="), console.debug(`[Kleenex] Total sensors returning: ${g.length}`), g.length === 0) {
      console.debug("[Kleenex] ❌ NO SENSORS RETURNED! Checking why:"), console.debug(`[Kleenex] - allergenData.size: ${v.size}`), console.debug(`[Kleenex] - pollen_threshold: ${p}`), console.debug(`[Kleenex] - config.allergens: [${e.allergens.join(", ")}]`);
      let x = 0;
      v.forEach((E, L) => {
        E.levels.some((C) => C.level >= p) || (x++, console.debug(`[Kleenex] - ${L} filtered by threshold (max level: ${Math.max(...E.levels.map((C) => C.level))})`));
      }), console.debug(`[Kleenex] - allergens filtered by threshold: ${x}`);
    } else
      console.debug("[Kleenex] ✅ SENSORS FOUND:"), g.forEach((x, E) => {
        var z;
        const L = ["trees_cat", "grass_cat", "weeds_cat"].includes(x.allergenReplaced);
        console.debug(`[Kleenex] ${E + 1}. ${x.allergenReplaced} (${L ? "CATEGORY" : "INDIVIDUAL"}): day0_state=${(z = x.day0) == null ? void 0 : z.state}, entity_id=${x.entity_id}`);
      });
    console.debug("[Kleenex] Adapter fetchForecast complete.");
  }
  return g;
}
const eu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DOMAIN: Eo,
  INDIVIDUAL_TO_CATEGORY: Ua,
  KLEENEX_ALLERGEN_CATEGORIES: Wa,
  KLEENEX_ALLERGEN_MAP: Lo,
  capitalize: Zh,
  fetchForecast: Jh,
  ppmToLevel: ar,
  resolveEntityIds: Qh,
  stubConfigKleenex: Ut
}, Symbol.toStringTag, { value: "Module" })), tu = "sensor.pollen_", Ka = {
  sorrel: ["Rumex", "Sorrel", "Ampfer", "Oseille"],
  mugwort: ["Artemisia", "Mugwort", "Beifuß", "Beifuss", "Armoise"],
  birch: ["Betula", "Birch", "Birke", "Bouleau"],
  beech: ["Fagus", "Beech", "Buche", "Hêtre", "Hetre", "Hetra"],
  oak: ["Quercus", "Oak", "Eiche", "Chêne", "Chene"],
  alder: ["Alnus", "Alder", "Erle", "Aulne"],
  ash: ["Fraxinus", "Ash", "Esche", "Frêne", "Frene"],
  goosefoot: ["Chenopodium", "Goosefoot", "Gänsefuß", "Gaensefuss", "Gansefuss", "Chénopode", "Chenopode"],
  poaceae: ["Poacea", "Poaceae", "Grasses", "Gräser", "Graeser", "Graminées", "Graminees"],
  hazel: ["Corylus", "Hazel", "Hasel", "Haselnussstrauch", "Noisetier"],
  plantain: ["Plantago", "Plantain", "Wegerich"]
}, Ei = Object.keys(Ka).sort(), Li = Object.entries(Ka).reduce(
  (t, [e, r]) => {
    const i = Array.from(
      new Set(r.map((o) => ke(o)))
    );
    return i.includes(e) || i.push(e), t[e] = i, t;
  },
  {}
), ru = {
  alder: { moderate: 11, high: 51 },
  mugwort: { moderate: 3, high: 7 },
  birch: { moderate: 11, high: 51 },
  beech: { moderate: 11, high: 51 },
  oak: { moderate: 11, high: 51 },
  ash: { moderate: 11, high: 51 },
  goosefoot: { moderate: 4, high: 16 },
  poaceae: { moderate: 6, high: 31 },
  hazel: { moderate: 11, high: 51 },
  plantain: { moderate: 4, high: 16 },
  sorrel: { moderate: 4, high: 16 }
}, Ar = {
  integration: "plu",
  allergens: [...Ei],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...V,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  show_empty_days: !1,
  debug: !1,
  show_version: !0,
  days_to_show: 1,
  days_relative: !0,
  days_abbreviated: !1,
  days_uppercase: !1,
  days_boldfaced: !1,
  pollen_threshold: 1,
  sort: "value_descending",
  allergy_risk_top: !0,
  allergens_abbreviated: !1,
  link_to_sensors: !0,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
};
function iu(t, e, r) {
  const i = Li[e] || [e];
  for (const o of i) {
    const s = `${tu}${o}`;
    if (t.states[s])
      return r && console.debug(`[PLU] Using sensor '${s}' for allergen '${e}'`), s;
  }
  return null;
}
function Ya(t, e, r = !1) {
  const i = /* @__PURE__ */ new Map();
  for (const o of t.allergens || []) {
    if (!Ei.includes(o)) continue;
    const s = iu(e, o, r);
    s && i.set(o, s);
  }
  return i;
}
function Fs(t, e) {
  const r = Number(t);
  return Number.isFinite(r) ? r : e;
}
function ou(t, e) {
  const r = Number(t);
  if (!Number.isFinite(r) || r < 0) return -1;
  if (r === 0) return 0;
  const { moderate: i, high: o } = e;
  return r < i ? 1 : r < o ? 2 : 3;
}
async function su(t, e) {
  var w, S, P, x, E, L;
  const r = !!e.debug, { lang: i, locale: o, daysRelative: s, dayAbbrev: a, daysUppercase: n } = st(t, e), { fullPhrases: l, shortPhrases: d, userLevels: c, userDays: h, noInfoLabel: u } = ot(e, i), _ = rt(c, i), f = [0, 1, 3, 5].map((z, C) => {
    const $ = Array.isArray(c) ? c[C] : void 0;
    return $ != null && $ !== "" ? $ : _[z] || oe(`card.levels.${z}`, i);
  }), m = e.pollen_threshold ?? Ar.pollen_threshold, y = Math.max(
    1,
    e.days_to_show ?? Ar.days_to_show
  ), g = /* @__PURE__ */ new Date();
  g.setHours(0, 0, 0, 0);
  const v = [], k = Ya(e, t, r);
  for (const z of e.allergens || []) {
    if (!Ei.includes(z)) continue;
    const C = { days: [] };
    C.allergenReplaced = z;
    const { allergenCapitalized: $, allergenShort: M } = zt(z, {
      fullPhrases: l,
      shortPhrases: d,
      abbreviated: e.allergens_abbreviated,
      lang: i
    });
    C.allergenCapitalized = $, C.allergenShort = M;
    const R = k.get(z);
    if (!R) {
      r && console.debug(`[PLU] No sensor found for allergen '${z}'`);
      continue;
    }
    const b = t.states[R];
    if (!b) continue;
    C.entity_id = R, C.attributes = b.attributes || {};
    const A = Number(b.state), D = ru[z] || {
      moderate: 1,
      high: 2
    }, T = Fs(
      (w = C.attributes) == null ? void 0 : w.moderate_threshold,
      D.moderate
    ), B = Fs(
      (S = C.attributes) == null ? void 0 : S.high_threshold,
      D.high
    ), I = ou(A, { moderate: T, high: B }), G = (P = C.attributes) != null && P.last_update ? new Date(C.attributes.last_update) : g, O = nt(G, 0, { daysRelative: s, dayAbbrev: a, daysUppercase: n, userDays: h, lang: i, locale: o }), H = I < 0 ? u : f[I] || u, F = {
      name: C.allergenCapitalized,
      day: O,
      state: I,
      display_state: Number.isFinite(A) ? A : I,
      state_text: H,
      thresholds: { moderate: T, high: B },
      level_string: ((x = C.attributes) == null ? void 0 : x.level) || null,
      last_update: ((E = C.attributes) == null ? void 0 : E.last_update) || null,
      next_poll: ((L = C.attributes) == null ? void 0 : L.next_poll) || null
    };
    for (C.day0 = F, C.days.push(F); C.days.length < y; )
      C.days.push({
        name: C.allergenCapitalized,
        day: "",
        state: -1,
        display_state: -1,
        state_text: u
      });
    it(C.days.slice(0, 1), m) && v.push(C);
  }
  return e.sort !== "none" && v.sort(
    {
      value_ascending: (z, C) => {
        var $, M;
        return ((($ = z.day0) == null ? void 0 : $.state) ?? 0) - (((M = C.day0) == null ? void 0 : M.state) ?? 0);
      },
      value_descending: (z, C) => {
        var $, M;
        return ((($ = C.day0) == null ? void 0 : $.state) ?? 0) - (((M = z.day0) == null ? void 0 : M.state) ?? 0);
      },
      name_ascending: (z, C) => (z.allergenCapitalized || "").localeCompare(
        C.allergenCapitalized || "",
        i
      ),
      name_descending: (z, C) => (C.allergenCapitalized || "").localeCompare(
        z.allergenCapitalized || "",
        i
      ),
      none: () => 0
    }[e.sort] || ((z, C) => {
      var $, M;
      return ((($ = z.day0) == null ? void 0 : $.state) ?? 0) - (((M = C.day0) == null ? void 0 : M.state) ?? 0);
    })
  ), v;
}
const nu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PLU_ALIAS_MAP: Li,
  PLU_SUPPORTED_ALLERGENS: Ei,
  fetchForecast: su,
  resolveEntityIds: Ya,
  stubConfigPLU: Ar
}, Symbol.toStringTag, { value: "Module" })), Ti = {
  // Pollen
  ragweed: "ambroisie",
  mugwort: "armoise",
  alder: "aulne",
  birch: "bouleau",
  grass: "gramine",
  olive: "olivier",
  allergy_risk: "qualite_globale_pollen",
  // Pollution
  pm25: "pm25",
  pm10: "pm10",
  ozone: "ozone",
  no2: "dioxyde_d_azote",
  so2: "dioxyde_de_soufre",
  qualite_globale: "qualite_globale"
};
Object.fromEntries(
  Object.entries(Ti).map(([t, e]) => [e, t])
);
const Pr = /* @__PURE__ */ new Set(["pm25", "pm10", "ozone", "no2", "so2"]), Bt = {
  integration: "atmo",
  location: "",
  entity_prefix: "",
  entity_suffix: "",
  allergens: [
    "allergy_risk",
    "qualite_globale",
    "ragweed",
    "mugwort",
    "alder",
    "birch",
    "grass",
    "olive",
    "pm25",
    "pm10",
    "ozone",
    "no2",
    "so2"
  ],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...V,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  show_empty_days: !1,
  debug: !1,
  show_version: !0,
  days_to_show: 2,
  days_relative: !0,
  days_abbreviated: !1,
  days_uppercase: !1,
  days_boldfaced: !1,
  pollen_threshold: 1,
  sort: "value_descending",
  allergy_risk_top: !0,
  sort_pollution_block: !0,
  pollution_block_position: "bottom",
  show_block_separator: !1,
  allergens_abbreviated: !1,
  link_to_sensors: !0,
  date_locale: void 0,
  title: void 0,
  phrases: {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: ""
  }
}, To = [...Bt.allergens];
function qa(t, e) {
  for (const r of Object.keys(t.states)) {
    const i = r.match(
      /^sensor\.niveau_(ambroisie|armoise|aulne|bouleau|gramine|olivier)_(.+?)(?:_j_\d+)?$/
    );
    if (i)
      return e && console.debug("[ATMO] auto-detected location:", i[2]), i[2];
  }
  for (const r of Object.keys(t.states)) {
    const i = r.match(
      /^sensor\.(pm25|pm10|ozone|dioxyde_d_azote|dioxyde_de_soufre)_(.+?)(?:_j_\d+)?$/
    );
    if (i)
      return e && console.debug("[ATMO] auto-detected location from pollution entity:", i[2]), i[2];
  }
  for (const r of Object.keys(t.states)) {
    const i = r.match(
      /^sensor\.qualite_globale_pollen_(.+?)(?:_j_\d+)?$/
    );
    if (i)
      return e && console.debug("[ATMO] auto-detected location from pollen summary entity:", i[1]), i[1];
    const o = r.match(
      /^sensor\.qualite_globale_(?!pollen)(.+?)(?:_j_\d+)?$/
    );
    if (o)
      return e && console.debug("[ATMO] auto-detected location from global summary entity:", o[1]), o[1];
  }
  return null;
}
function Xa(t, e, r) {
  const i = Ti[t];
  if (!i) return null;
  let o;
  return t === "allergy_risk" ? o = `sensor.qualite_globale_pollen_${e}` : t === "qualite_globale" ? o = `sensor.qualite_globale_${e}` : Pr.has(t) ? o = `sensor.${i}_${e}` : o = `sensor.niveau_${i}_${e}`, r ? `${o}_j_1` : o;
}
function Za(t, e, r = !1) {
  const i = /* @__PURE__ */ new Map();
  let o = t.location || "";
  o === "manual" || o || (o = qa(e, r) || "");
  for (const s of t.allergens || []) {
    const a = Ti[s];
    if (!a) continue;
    let n;
    if (t.location === "manual") {
      const l = Et(t.entity_prefix), d = t.entity_suffix || "";
      let c;
      if (s === "allergy_risk" ? c = "qualite_globale_pollen" : s === "qualite_globale" ? c = "qualite_globale" : Pr.has(s) ? c = a : c = `niveau_${a}`, n = Wt(e, l, c, d), !n) continue;
    } else {
      if (!o) continue;
      if (n = Xa(s, o, !1), !n || !e.states[n]) {
        let l;
        s === "allergy_risk" ? l = "sensor.qualite_globale_pollen_" : s === "qualite_globale" ? l = "sensor.qualite_globale_" : Pr.has(s) ? l = `sensor.${a}_` : l = `sensor.niveau_${a}_`;
        const d = Object.keys(e.states).filter((c) => !(!c.startsWith(l) || c.includes("_j_") || s === "qualite_globale" && c.includes("qualite_globale_pollen")));
        if (d.length === 1) n = d[0];
        else continue;
      }
    }
    r && console.debug(
      `[ATMO:resolveEntityIds] allergen: '${s}', sensorId: '${n}'`
    ), i.set(s, n);
  }
  return i;
}
async function au(t, e) {
  var x, E, L;
  const r = !!e.debug, { lang: i, locale: o, daysRelative: s, dayAbbrev: a, daysUppercase: n } = st(t, e, Bt.date_locale), { fullPhrases: l, shortPhrases: d, userLevels: c, userDays: h, noInfoLabel: u } = ot(e, i), _ = rt(c, i), p = e.days_to_show ?? Bt.days_to_show, f = e.pollen_threshold ?? Bt.pollen_threshold;
  r && console.debug("ATMO adapter: start fetchForecast", { config: e, lang: i });
  const m = (z) => Zt(z, null, -1), y = oe("card.atmo.unavailable", i) || u, g = oe("card.atmo.event", i) || u, v = (z, C) => z < 0 ? { state: -1, display_state: -1, state_text: u } : z === 0 ? { state: 0, display_state: -1, state_text: C || y } : z >= 1 && z <= 6 ? { state: z, display_state: z, state_text: _[z] || C || u } : z === 7 ? { state: 7, display_state: 6, state_text: C || g } : { state: z, display_state: Math.min(z, 6), state_text: C || u };
  let k = e.location || "";
  k === "manual" || k || (k = qa(t, r) || "");
  const w = Za(e, t, r), S = /* @__PURE__ */ new Date();
  S.setHours(0, 0, 0, 0);
  let P = [];
  for (const z of e.allergens)
    try {
      const C = { days: [] }, $ = At(z);
      C.allergenReplaced = z, C.group = z === "qualite_globale" || Pr.has(z) ? "pollution" : "pollen";
      const { allergenCapitalized: M, allergenShort: R } = zt(z, {
        fullPhrases: l,
        shortPhrases: d,
        abbreviated: e.allergens_abbreviated,
        lang: i
      });
      C.allergenCapitalized = M, C.allergenShort = R;
      const b = w.get(z);
      if (!b) continue;
      const A = t.states[b];
      C.entity_id = b;
      const D = m(A.state), T = ((x = A.attributes) == null ? void 0 : x.Libellé) || "";
      let B = -1, I = "";
      if (k !== "manual") {
        const O = Xa(z, k, !0);
        O && t.states[O] && (B = m(t.states[O].state), I = ((E = t.states[O].attributes) == null ? void 0 : E.Libellé) || "");
      } else {
        const O = `${b}_j_1`;
        t.states[O] && (B = m(t.states[O].state), I = ((L = t.states[O].attributes) == null ? void 0 : L.Libellé) || "");
      }
      const G = [
        { date: S, level: D, libelle: T },
        { date: new Date(S.getTime() + 864e5), level: B, libelle: I }
      ];
      for (; G.length < p; ) {
        const O = G.length;
        G.push({
          date: new Date(S.getTime() + O * 864e5),
          level: -1,
          libelle: ""
        });
      }
      G.forEach((O, H) => {
        const F = Math.round((O.date - S) / 864e5), U = nt(O.date, F, { daysRelative: s, dayAbbrev: a, daysUppercase: n, userDays: h, lang: i, locale: o }), J = v(O.level, O.libelle);
        C[`day${H}`] = {
          name: C.allergenCapitalized,
          day: U,
          state: J.state,
          display_state: J.display_state,
          state_text: J.state_text
        }, C.days.push(C[`day${H}`]);
      }), it(C.days, f) && P.push(C);
    } catch (C) {
      console.warn(`ATMO adapter error for allergen ${z}:`, C);
    }
  if (e.sort !== "none") {
    const z = {
      value_ascending: (C, $) => {
        var M, R, b, A;
        return (((M = C.day0) == null ? void 0 : M.display_state) ?? 0) - (((R = $.day0) == null ? void 0 : R.display_state) ?? 0) || (((b = C.day0) == null ? void 0 : b.state) ?? 0) - (((A = $.day0) == null ? void 0 : A.state) ?? 0);
      },
      value_descending: (C, $) => {
        var M, R, b, A;
        return (((M = $.day0) == null ? void 0 : M.display_state) ?? 0) - (((R = C.day0) == null ? void 0 : R.display_state) ?? 0) || (((b = $.day0) == null ? void 0 : b.state) ?? 0) - (((A = C.day0) == null ? void 0 : A.state) ?? 0);
      },
      name_ascending: (C, $) => C.allergenCapitalized.localeCompare($.allergenCapitalized),
      name_descending: (C, $) => $.allergenCapitalized.localeCompare(C.allergenCapitalized)
    }[e.sort] || ((C, $) => {
      var M, R, b, A;
      return (((M = $.day0) == null ? void 0 : M.display_state) ?? 0) - (((R = C.day0) == null ? void 0 : R.display_state) ?? 0) || (((b = $.day0) == null ? void 0 : b.state) ?? 0) - (((A = C.day0) == null ? void 0 : A.state) ?? 0);
    });
    if (e.sort_pollution_block) {
      const C = [], $ = [];
      for (const M of P)
        M.group === "pollution" ? $.push(M) : C.push(M);
      if (C.sort(z), $.sort(z), e.allergy_risk_top) {
        const M = C.findIndex((b) => b.allergenReplaced === "allergy_risk");
        M > 0 && C.unshift(...C.splice(M, 1));
        const R = $.findIndex((b) => b.allergenReplaced === "qualite_globale");
        R > 0 && $.unshift(...$.splice(R, 1));
      }
      P = e.pollution_block_position === "top" ? [...$, ...C] : [...C, ...$];
    } else if (P.sort(z), e.allergy_risk_top) {
      const C = P.findIndex((M) => M.allergenReplaced === "qualite_globale");
      C > 0 && P.unshift(...P.splice(C, 1));
      const $ = P.findIndex((M) => M.allergenReplaced === "allergy_risk");
      $ > 0 && P.unshift(...P.splice($, 1));
    }
  }
  return r && console.debug("ATMO adapter complete sensors:", P), P;
}
const lu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ATMO_ALLERGENS: To,
  ATMO_ALLERGEN_MAP: Ti,
  ATMO_POLLUTION_ALLERGENS: Pr,
  fetchForecast: au,
  resolveEntityIds: Za,
  stubConfigATMO: Bt
}, Symbol.toStringTag, { value: "Module" })), Kt = "Data provided by Google Maps Pollen API", Qa = {
  "mdi:grass": "grass_cat",
  "mdi:tree": "trees_cat",
  "mdi:flower-tulip": "weeds_cat"
}, We = ["grass_cat", "trees_cat", "weeds_cat"], fr = {
  integration: "gpl",
  location: "",
  entity_prefix: "",
  entity_suffix: "",
  allergens: ["grass_cat", "trees_cat", "weeds_cat"],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...V,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  show_empty_days: !1,
  debug: !1,
  show_version: !0,
  days_to_show: 5,
  days_relative: !0,
  days_abbreviated: !1,
  days_uppercase: !1,
  days_boldfaced: !1,
  pollen_threshold: 1,
  sort: "value_descending",
  sort_category_allergens_first: !0,
  allergens_abbreviated: !1,
  link_to_sensors: !0,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
};
function Ja(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function Qo(t) {
  const e = (t == null ? void 0 : t.attributes) || {};
  if (e.code)
    return e.code.toLowerCase();
  const r = Qa[e.icon];
  return r || null;
}
function Cr(t) {
  const r = ((t == null ? void 0 : t.attributes) || {}).device_class;
  return r !== "date" && r !== "timestamp";
}
function Pt(t, e = !1) {
  var s, a, n, l, d, c;
  const r = { locations: /* @__PURE__ */ new Map() };
  if (!t) return r;
  let i = [], o = !1;
  if (t.entities) {
    const h = Object.entries(t.entities).filter(
      ([, u]) => u.platform === "pollenlevels" && !u.entity_category
    ).map(([u]) => u);
    h.length > 0 && (i = h, o = !0, e && console.debug("[GPL] Discovery: using hass.entities, found", h.length, "candidates"));
  }
  if (!i.length && t.states && (i = Object.keys(t.states).filter((h) => {
    var _;
    const u = t.states[h];
    return ((_ = u == null ? void 0 : u.attributes) == null ? void 0 : _.attribution) === Kt && Cr(u);
  }), e && console.debug("[GPL] Discovery: using attribution fallback, found", i.length, "candidates")), !i.length) return r;
  for (const h of i) {
    const u = t.states[h];
    if (!u || !Cr(u)) continue;
    const _ = Qo(u);
    if (!_) {
      e && console.debug("[GPL] Could not classify sensor:", h);
      continue;
    }
    let p = "default";
    if (o && ((a = (s = t.entities) == null ? void 0 : s[h]) != null && a.device_id) && t.devices) {
      const f = t.entities[h].device_id, m = t.devices[f];
      (n = m == null ? void 0 : m.config_entries) != null && n.length && (p = m.config_entries[0]);
    }
    if (!r.locations.has(p)) {
      let f = "Auto";
      if (o && ((d = (l = t.entities) == null ? void 0 : l[h]) != null && d.device_id) && t.devices) {
        const m = t.entities[h].device_id, y = t.devices[m];
        y != null && y.name && (f = y.name);
      } else {
        const m = ((c = u.attributes) == null ? void 0 : c.friendly_name) || "";
        m && (f = m);
      }
      r.locations.set(p, { label: f, entities: /* @__PURE__ */ new Map() });
    }
    r.locations.get(p).entities.set(_, h);
  }
  if (e) {
    console.debug("[GPL] Discovery result:", r.locations.size, "locations");
    for (const [h, u] of r.locations)
      console.debug(`  [${h}] "${u.label}":`, [...u.entities.keys()]);
  }
  return r;
}
function si(t, e, r = !1) {
  const i = Pt(t, r);
  if (!i.locations.size) return [];
  let o;
  if (e && i.locations.has(e) ? o = i.locations.get(e) : o = i.locations.values().next().value, !o) return [];
  const s = [...o.entities.keys()], a = s.filter((l) => We.includes(l)).sort(), n = s.filter((l) => !We.includes(l)).sort();
  return [...a, ...n];
}
function du(t, e, r, i, o) {
  if (r.location === "manual") {
    let s = r.entity_prefix || "";
    s.startsWith("sensor.") && (s = s.substring(7));
    const a = r.entity_suffix || "";
    let n = [];
    e.entities && (n = Object.entries(e.entities).filter(([, l]) => l.platform === "pollenlevels" && !l.entity_category).map(([l]) => l)), n.length || (n = Object.keys(e.states || {}).filter((l) => {
      var c;
      const d = e.states[l];
      return ((c = d == null ? void 0 : d.attributes) == null ? void 0 : c.attribution) === Kt && Cr(d);
    }));
    for (const l of n) {
      const d = e.states[l];
      if (!d || !Cr(d)) continue;
      const c = l.replace(/^sensor\./, "");
      if (s && !c.startsWith(s) || a && !c.endsWith(a)) continue;
      if (Qo(d) === t) return l;
    }
    return o && console.debug(`[GPL] Manual mode: no sensor found for allergen "${t}"`), null;
  }
  return i && i.has(t) ? i.get(t) : (o && console.debug(`[GPL] Sensor not found for allergen "${t}"`), null);
}
function el(t, e, r = !1) {
  const i = /* @__PURE__ */ new Map(), o = Pt(e, r), s = t.location || "";
  let a = null;
  if (s !== "manual") {
    let n;
    s && o.locations.has(s) ? n = o.locations.get(s) : o.locations.size && (n = o.locations.values().next().value), n && (a = n.entities);
  }
  for (const n of t.allergens || []) {
    const l = du(n, e, t, a, r);
    l && e.states[l] && i.set(n, l);
  }
  return i;
}
async function cu(t, e) {
  var k, w, S;
  const r = !!e.debug, { lang: i, locale: o, daysRelative: s, dayAbbrev: a, daysUppercase: n } = st(t, e, fr.date_locale), { fullPhrases: l, shortPhrases: d, userLevels: c, userDays: h, noInfoLabel: u } = ot(e, i), _ = rt(c, i), p = e.days_to_show ?? fr.days_to_show, f = e.pollen_threshold ?? fr.pollen_threshold, m = (P) => Zt(P, 5, -1);
  r && console.debug("[GPL] Adapter: start fetchForecast", { config: e, lang: i });
  const y = el(e, t, r), g = /* @__PURE__ */ new Date();
  g.setHours(0, 0, 0, 0);
  let v = [];
  for (const P of e.allergens)
    try {
      const x = { days: [] };
      x.allergenReplaced = P;
      const { allergenCapitalized: E, allergenShort: L } = zt(P, {
        fullPhrases: l,
        shortPhrases: d,
        abbreviated: e.allergens_abbreviated,
        lang: i,
        capitalize: (b) => Ja(b.replace(/_/g, " "))
      });
      x.allergenCapitalized = E, x.allergenShort = L;
      const z = y.get(P);
      if (!z) continue;
      const C = t.states[z];
      x.entity_id = z, r && console.debug(`[GPL] Processing sensor ${z}:`, {
        state: C.state,
        forecast: (w = (k = C.attributes) == null ? void 0 : k.forecast) == null ? void 0 : w.length
      });
      const $ = m(C.state), M = [{ date: g, level: $ }], R = (S = C.attributes) == null ? void 0 : S.forecast;
      for (const b of Array.isArray(R) ? R : []) {
        if (M.length >= p) break;
        if (b.has_index === !1) {
          const B = b.offset ?? M.length;
          M.push({
            date: new Date(g.getTime() + B * 864e5),
            level: -1
          });
          continue;
        }
        const A = b.offset ?? M.length, D = b.date ? new Date(b.date) : new Date(g.getTime() + A * 864e5), T = b.value ?? b.state ?? b.level ?? b;
        M.push({
          date: D,
          level: m(T)
        });
      }
      for (; M.length < p; ) {
        const b = M.length;
        M.push({
          date: new Date(g.getTime() + b * 864e5),
          level: -1
        });
      }
      for (let b = 0; b < p; b++) {
        const A = M[b];
        if (!A) continue;
        const D = Math.round((A.date - g) / 864e5), T = nt(A.date, D, { daysRelative: s, dayAbbrev: a, daysUppercase: n, userDays: h, lang: i, locale: o }), B = A.level;
        let I;
        B < 0 ? I = B : B < 2 ? I = Math.floor(B * 6 / 5) : I = Math.ceil(B * 6 / 5);
        const G = I < 0 ? u : _[I] || u, O = {
          name: x.allergenCapitalized,
          day: T,
          state: A.level,
          display_state: A.level < 0 ? -1 : A.level,
          state_text: G
        };
        x[`day${b}`] = O, x.days.push(O);
      }
      it(x.days, f) && v.push(x);
    } catch (x) {
      console.warn(`[GPL] Adapter error for allergen ${P}:`, x);
    }
  if (e.sort !== "none")
    if (e.sort_category_allergens_first) {
      const P = v.filter(
        (E) => ["trees_cat", "grass_cat", "weeds_cat"].includes(E.allergenReplaced)
      ), x = v.filter(
        (E) => !["trees_cat", "grass_cat", "weeds_cat"].includes(
          E.allergenReplaced
        )
      );
      $e(P, e.sort), $e(x, e.sort), v = [...P, ...x];
    } else
      $e(v, e.sort);
  return r && console.debug("[GPL] Adapter complete sensors:", v), v;
}
const hu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GPL_ATTRIBUTION: Kt,
  GPL_BASE_ALLERGENS: We,
  GPL_TYPE_ICON_MAP: Qa,
  capitalize: Ja,
  classifySensor: Qo,
  discoverGplAllergens: si,
  discoverGplSensors: Pt,
  fetchForecast: cu,
  isGplDataSensor: Cr,
  resolveEntityIds: el,
  stubConfigGPL: fr
}, Symbol.toStringTag, { value: "Module" })), tl = {
  pp: { module: Nh, stub: Ue },
  dwd: { module: Wh, stub: vt },
  peu: { module: Xh, stub: bt },
  silam: { module: Kh, stub: Nt },
  kleenex: { module: eu, stub: Ut },
  plu: { module: nu, stub: Ar },
  atmo: { module: lu, stub: Bt },
  gpl: { module: hu, stub: fr }
};
function lr(t) {
  var e;
  return (e = tl[t]) == null ? void 0 : e.module;
}
function de(t) {
  var e;
  return (e = tl[t]) == null ? void 0 : e.stub;
}
function Vs(t, e, r = !1) {
  const i = lr(t.integration);
  if (!(i != null && i.resolveEntityIds)) return [];
  const s = [...i.resolveEntityIds(t, e, r).values()].filter((a) => {
    var l;
    if (!a) return !1;
    const n = (l = e == null ? void 0 : e.states) == null ? void 0 : l[a];
    return n ? n.state !== "unavailable" && n.state !== "unknown" : !1;
  });
  return r && console.debug(
    "[findAvailableSensors] Found sensors (",
    s.length,
    "): ",
    s
  ), s;
}
function Se(t, e) {
  if (t === e) return !0;
  if (typeof t != "object" || typeof e != "object" || !t || !e) return !1;
  const r = Object.keys(t), i = Object.keys(e);
  if (r.length !== i.length) return !1;
  for (let o of r) {
    if (!(o in e)) return !1;
    if (Array.isArray(t[o]) && Array.isArray(e[o])) {
      if (!uu(t[o], e[o])) return !1;
    } else if (typeof t[o] == "object" && typeof e[o] == "object") {
      if (!Se(t[o], e[o])) return !1;
    } else if (t[o] !== e[o])
      return !1;
  }
  return !0;
}
function uu(t, e) {
  if (t.length !== e.length) return !1;
  if (t.every((i) => typeof i != "object" || i === null)) {
    const i = (o) => [...o].sort().join("\0");
    return i(t) === i(e);
  }
  const r = new Array(e.length).fill(!1);
  for (const i of t) {
    const o = e.findIndex(
      (s, a) => !r[a] && (i === s || Se(i, s))
    );
    if (o === -1) return !1;
    r[o] = !0;
  }
  return !0;
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function Nr(t) {
  return t + 0.5 | 0;
}
const Ke = (t, e, r) => Math.max(Math.min(t, r), e);
function dr(t) {
  return Ke(Nr(t * 2.55), 0, 255);
}
function Qe(t) {
  return Ke(Nr(t * 255), 0, 255);
}
function He(t) {
  return Ke(Nr(t / 2.55) / 100, 0, 1);
}
function Gs(t) {
  return Ke(Nr(t * 100), 0, 100);
}
const Ce = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Do = [..."0123456789ABCDEF"], _u = (t) => Do[t & 15], gu = (t) => Do[(t & 240) >> 4] + Do[t & 15], Fr = (t) => (t & 240) >> 4 === (t & 15), pu = (t) => Fr(t.r) && Fr(t.g) && Fr(t.b) && Fr(t.a);
function fu(t) {
  var e = t.length, r;
  return t[0] === "#" && (e === 4 || e === 5 ? r = {
    r: 255 & Ce[t[1]] * 17,
    g: 255 & Ce[t[2]] * 17,
    b: 255 & Ce[t[3]] * 17,
    a: e === 5 ? Ce[t[4]] * 17 : 255
  } : (e === 7 || e === 9) && (r = {
    r: Ce[t[1]] << 4 | Ce[t[2]],
    g: Ce[t[3]] << 4 | Ce[t[4]],
    b: Ce[t[5]] << 4 | Ce[t[6]],
    a: e === 9 ? Ce[t[7]] << 4 | Ce[t[8]] : 255
  })), r;
}
const mu = (t, e) => t < 255 ? e(t) : "";
function yu(t) {
  var e = pu(t) ? _u : gu;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + mu(t.a, e) : void 0;
}
const vu = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function rl(t, e, r) {
  const i = e * Math.min(r, 1 - r), o = (s, a = (s + t / 30) % 12) => r - i * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [o(0), o(8), o(4)];
}
function bu(t, e, r) {
  const i = (o, s = (o + t / 60) % 6) => r - r * e * Math.max(Math.min(s, 4 - s, 1), 0);
  return [i(5), i(3), i(1)];
}
function xu(t, e, r) {
  const i = rl(t, 1, 0.5);
  let o;
  for (e + r > 1 && (o = 1 / (e + r), e *= o, r *= o), o = 0; o < 3; o++)
    i[o] *= 1 - e - r, i[o] += e;
  return i;
}
function wu(t, e, r, i, o) {
  return t === o ? (e - r) / i + (e < r ? 6 : 0) : e === o ? (r - t) / i + 2 : (t - e) / i + 4;
}
function Jo(t) {
  const r = t.r / 255, i = t.g / 255, o = t.b / 255, s = Math.max(r, i, o), a = Math.min(r, i, o), n = (s + a) / 2;
  let l, d, c;
  return s !== a && (c = s - a, d = n > 0.5 ? c / (2 - s - a) : c / (s + a), l = wu(r, i, o, c, s), l = l * 60 + 0.5), [l | 0, d || 0, n];
}
function es(t, e, r, i) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, r, i)).map(Qe);
}
function ts(t, e, r) {
  return es(rl, t, e, r);
}
function ku(t, e, r) {
  return es(xu, t, e, r);
}
function Su(t, e, r) {
  return es(bu, t, e, r);
}
function il(t) {
  return (t % 360 + 360) % 360;
}
function Au(t) {
  const e = vu.exec(t);
  let r = 255, i;
  if (!e)
    return;
  e[5] !== i && (r = e[6] ? dr(+e[5]) : Qe(+e[5]));
  const o = il(+e[2]), s = +e[3] / 100, a = +e[4] / 100;
  return e[1] === "hwb" ? i = ku(o, s, a) : e[1] === "hsv" ? i = Su(o, s, a) : i = ts(o, s, a), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: r
  };
}
function Pu(t, e) {
  var r = Jo(t);
  r[0] = il(r[0] + e), r = ts(r), t.r = r[0], t.g = r[1], t.b = r[2];
}
function Cu(t) {
  if (!t)
    return;
  const e = Jo(t), r = e[0], i = Gs(e[1]), o = Gs(e[2]);
  return t.a < 255 ? `hsla(${r}, ${i}%, ${o}%, ${He(t.a)})` : `hsl(${r}, ${i}%, ${o}%)`;
}
const Ws = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, Us = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function Mu() {
  const t = {}, e = Object.keys(Us), r = Object.keys(Ws);
  let i, o, s, a, n;
  for (i = 0; i < e.length; i++) {
    for (a = n = e[i], o = 0; o < r.length; o++)
      s = r[o], n = n.replace(s, Ws[s]);
    s = parseInt(Us[a], 16), t[n] = [s >> 16 & 255, s >> 8 & 255, s & 255];
  }
  return t;
}
let Vr;
function zu(t) {
  Vr || (Vr = Mu(), Vr.transparent = [0, 0, 0, 0]);
  const e = Vr[t.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const Eu = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Lu(t) {
  const e = Eu.exec(t);
  let r = 255, i, o, s;
  if (e) {
    if (e[7] !== i) {
      const a = +e[7];
      r = e[8] ? dr(a) : Ke(a * 255, 0, 255);
    }
    return i = +e[1], o = +e[3], s = +e[5], i = 255 & (e[2] ? dr(i) : Ke(i, 0, 255)), o = 255 & (e[4] ? dr(o) : Ke(o, 0, 255)), s = 255 & (e[6] ? dr(s) : Ke(s, 0, 255)), {
      r: i,
      g: o,
      b: s,
      a: r
    };
  }
}
function Tu(t) {
  return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${He(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
}
const eo = (t) => t <= 31308e-7 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055, Dt = (t) => t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
function Du(t, e, r) {
  const i = Dt(He(t.r)), o = Dt(He(t.g)), s = Dt(He(t.b));
  return {
    r: Qe(eo(i + r * (Dt(He(e.r)) - i))),
    g: Qe(eo(o + r * (Dt(He(e.g)) - o))),
    b: Qe(eo(s + r * (Dt(He(e.b)) - s))),
    a: t.a + r * (e.a - t.a)
  };
}
function Gr(t, e, r) {
  if (t) {
    let i = Jo(t);
    i[e] = Math.max(0, Math.min(i[e] + i[e] * r, e === 0 ? 360 : 1)), i = ts(i), t.r = i[0], t.g = i[1], t.b = i[2];
  }
}
function ol(t, e) {
  return t && Object.assign(e || {}, t);
}
function Ks(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = Qe(t[3]))) : (e = ol(t, { r: 0, g: 0, b: 0, a: 1 }), e.a = Qe(e.a)), e;
}
function $u(t) {
  return t.charAt(0) === "r" ? Lu(t) : Au(t);
}
class Mr {
  constructor(e) {
    if (e instanceof Mr)
      return e;
    const r = typeof e;
    let i;
    r === "object" ? i = Ks(e) : r === "string" && (i = fu(e) || zu(e) || $u(e)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = ol(this._rgb);
    return e && (e.a = He(e.a)), e;
  }
  set rgb(e) {
    this._rgb = Ks(e);
  }
  rgbString() {
    return this._valid ? Tu(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? yu(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Cu(this._rgb) : void 0;
  }
  mix(e, r) {
    if (e) {
      const i = this.rgb, o = e.rgb;
      let s;
      const a = r === s ? 0.5 : r, n = 2 * a - 1, l = i.a - o.a, d = ((n * l === -1 ? n : (n + l) / (1 + n * l)) + 1) / 2;
      s = 1 - d, i.r = 255 & d * i.r + s * o.r + 0.5, i.g = 255 & d * i.g + s * o.g + 0.5, i.b = 255 & d * i.b + s * o.b + 0.5, i.a = a * i.a + (1 - a) * o.a, this.rgb = i;
    }
    return this;
  }
  interpolate(e, r) {
    return e && (this._rgb = Du(this._rgb, e._rgb, r)), this;
  }
  clone() {
    return new Mr(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = Qe(e), this;
  }
  clearer(e) {
    const r = this._rgb;
    return r.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, r = Nr(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
    return e.r = e.g = e.b = r, this;
  }
  opaquer(e) {
    const r = this._rgb;
    return r.a *= 1 + e, this;
  }
  negate() {
    const e = this._rgb;
    return e.r = 255 - e.r, e.g = 255 - e.g, e.b = 255 - e.b, this;
  }
  lighten(e) {
    return Gr(this._rgb, 2, e), this;
  }
  darken(e) {
    return Gr(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return Gr(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return Gr(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return Pu(this._rgb, e), this;
  }
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function Ie() {
}
const Ou = /* @__PURE__ */ (() => {
  let t = 0;
  return () => t++;
})();
function K(t) {
  return t == null;
}
function se(t) {
  if (Array.isArray && Array.isArray(t))
    return !0;
  const e = Object.prototype.toString.call(t);
  return e.slice(0, 7) === "[object" && e.slice(-6) === "Array]";
}
function Y(t) {
  return t !== null && Object.prototype.toString.call(t) === "[object Object]";
}
function ae(t) {
  return (typeof t == "number" || t instanceof Number) && isFinite(+t);
}
function Pe(t, e) {
  return ae(t) ? t : e;
}
function W(t, e) {
  return typeof t > "u" ? e : t;
}
const Iu = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e, sl = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
function te(t, e, r) {
  if (t && typeof t.call == "function")
    return t.apply(r, e);
}
function ee(t, e, r, i) {
  let o, s, a;
  if (se(t))
    for (s = t.length, o = 0; o < s; o++)
      e.call(r, t[o], o);
  else if (Y(t))
    for (a = Object.keys(t), s = a.length, o = 0; o < s; o++)
      e.call(r, t[a[o]], a[o]);
}
function vi(t, e) {
  let r, i, o, s;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (r = 0, i = t.length; r < i; ++r)
    if (o = t[r], s = e[r], o.datasetIndex !== s.datasetIndex || o.index !== s.index)
      return !1;
  return !0;
}
function bi(t) {
  if (se(t))
    return t.map(bi);
  if (Y(t)) {
    const e = /* @__PURE__ */ Object.create(null), r = Object.keys(t), i = r.length;
    let o = 0;
    for (; o < i; ++o)
      e[r[o]] = bi(t[r[o]]);
    return e;
  }
  return t;
}
function nl(t) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(t) === -1;
}
function Ru(t, e, r, i) {
  if (!nl(t))
    return;
  const o = e[t], s = r[t];
  Y(o) && Y(s) ? zr(o, s, i) : e[t] = bi(s);
}
function zr(t, e, r) {
  const i = se(e) ? e : [
    e
  ], o = i.length;
  if (!Y(t))
    return t;
  r = r || {};
  const s = r.merger || Ru;
  let a;
  for (let n = 0; n < o; ++n) {
    if (a = i[n], !Y(a))
      continue;
    const l = Object.keys(a);
    for (let d = 0, c = l.length; d < c; ++d)
      s(l[d], t, a, r);
  }
  return t;
}
function mr(t, e) {
  return zr(t, e, {
    merger: Nu
  });
}
function Nu(t, e, r) {
  if (!nl(t))
    return;
  const i = e[t], o = r[t];
  Y(i) && Y(o) ? mr(i, o) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = bi(o));
}
const Ys = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (t) => t,
  // default resolvers
  x: (t) => t.x,
  y: (t) => t.y
};
function Bu(t) {
  const e = t.split("."), r = [];
  let i = "";
  for (const o of e)
    i += o, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (r.push(i), i = "");
  return r;
}
function Hu(t) {
  const e = Bu(t);
  return (r) => {
    for (const i of e) {
      if (i === "")
        break;
      r = r && r[i];
    }
    return r;
  };
}
function et(t, e) {
  return (Ys[e] || (Ys[e] = Hu(e)))(t);
}
function rs(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const Er = (t) => typeof t < "u", tt = (t) => typeof t == "function", qs = (t, e) => {
  if (t.size !== e.size)
    return !1;
  for (const r of t)
    if (!e.has(r))
      return !1;
  return !0;
};
function ju(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const Q = Math.PI, re = 2 * Q, Fu = re + Q, xi = Number.POSITIVE_INFINITY, Vu = Q / 180, le = Q / 2, ct = Q / 4, Xs = Q * 2 / 3, Ye = Math.log10, Oe = Math.sign;
function yr(t, e, r) {
  return Math.abs(t - e) < r;
}
function Zs(t) {
  const e = Math.round(t);
  t = yr(t, e, t / 1e3) ? e : t;
  const r = Math.pow(10, Math.floor(Ye(t))), i = t / r;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * r;
}
function Gu(t) {
  const e = [], r = Math.sqrt(t);
  let i;
  for (i = 1; i < r; i++)
    t % i === 0 && (e.push(i), e.push(t / i));
  return r === (r | 0) && e.push(r), e.sort((o, s) => o - s).pop(), e;
}
function Wu(t) {
  return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
}
function Yt(t) {
  return !Wu(t) && !isNaN(parseFloat(t)) && isFinite(t);
}
function Uu(t, e) {
  const r = Math.round(t);
  return r - e <= t && r + e >= t;
}
function al(t, e, r) {
  let i, o, s;
  for (i = 0, o = t.length; i < o; i++)
    s = t[i][r], isNaN(s) || (e.min = Math.min(e.min, s), e.max = Math.max(e.max, s));
}
function Me(t) {
  return t * (Q / 180);
}
function is(t) {
  return t * (180 / Q);
}
function Qs(t) {
  if (!ae(t))
    return;
  let e = 1, r = 0;
  for (; Math.round(t * e) / e !== t; )
    e *= 10, r++;
  return r;
}
function ll(t, e) {
  const r = e.x - t.x, i = e.y - t.y, o = Math.sqrt(r * r + i * i);
  let s = Math.atan2(i, r);
  return s < -0.5 * Q && (s += re), {
    angle: s,
    distance: o
  };
}
function $o(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function Ku(t, e) {
  return (t - e + Fu) % re - Q;
}
function me(t) {
  return (t % re + re) % re;
}
function Lr(t, e, r, i) {
  const o = me(t), s = me(e), a = me(r), n = me(s - o), l = me(a - o), d = me(o - s), c = me(o - a);
  return o === s || o === a || i && s === a || n > l && d < c;
}
function _e(t, e, r) {
  return Math.max(e, Math.min(r, t));
}
function Yu(t) {
  return _e(t, -32768, 32767);
}
function je(t, e, r, i = 1e-6) {
  return t >= Math.min(e, r) - i && t <= Math.max(e, r) + i;
}
function os(t, e, r) {
  r = r || ((a) => t[a] < e);
  let i = t.length - 1, o = 0, s;
  for (; i - o > 1; )
    s = o + i >> 1, r(s) ? o = s : i = s;
  return {
    lo: o,
    hi: i
  };
}
const Fe = (t, e, r, i) => os(t, r, i ? (o) => {
  const s = t[o][e];
  return s < r || s === r && t[o + 1][e] === r;
} : (o) => t[o][e] < r), qu = (t, e, r) => os(t, r, (i) => t[i][e] >= r);
function Xu(t, e, r) {
  let i = 0, o = t.length;
  for (; i < o && t[i] < e; )
    i++;
  for (; o > i && t[o - 1] > r; )
    o--;
  return i > 0 || o < t.length ? t.slice(i, o) : t;
}
const dl = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Zu(t, e) {
  if (t._chartjs) {
    t._chartjs.listeners.push(e);
    return;
  }
  Object.defineProperty(t, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        e
      ]
    }
  }), dl.forEach((r) => {
    const i = "_onData" + rs(r), o = t[r];
    Object.defineProperty(t, r, {
      configurable: !0,
      enumerable: !1,
      value(...s) {
        const a = o.apply(this, s);
        return t._chartjs.listeners.forEach((n) => {
          typeof n[i] == "function" && n[i](...s);
        }), a;
      }
    });
  });
}
function Js(t, e) {
  const r = t._chartjs;
  if (!r)
    return;
  const i = r.listeners, o = i.indexOf(e);
  o !== -1 && i.splice(o, 1), !(i.length > 0) && (dl.forEach((s) => {
    delete t[s];
  }), delete t._chartjs);
}
function cl(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const hl = (function() {
  return typeof window > "u" ? function(t) {
    return t();
  } : window.requestAnimationFrame;
})();
function ul(t, e) {
  let r = [], i = !1;
  return function(...o) {
    r = o, i || (i = !0, hl.call(window, () => {
      i = !1, t.apply(e, r);
    }));
  };
}
function Qu(t, e) {
  let r;
  return function(...i) {
    return e ? (clearTimeout(r), r = setTimeout(t, e, i)) : t.apply(this, i), e;
  };
}
const ss = (t) => t === "start" ? "left" : t === "end" ? "right" : "center", fe = (t, e, r) => t === "start" ? e : t === "end" ? r : (e + r) / 2, Ju = (t, e, r, i) => t === (i ? "left" : "right") ? r : t === "center" ? (e + r) / 2 : e;
function _l(t, e, r) {
  const i = e.length;
  let o = 0, s = i;
  if (t._sorted) {
    const { iScale: a, vScale: n, _parsed: l } = t, d = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, c = a.axis, { min: h, max: u, minDefined: _, maxDefined: p } = a.getUserBounds();
    if (_) {
      if (o = Math.min(
        // @ts-expect-error Need to type _parsed
        Fe(l, c, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        r ? i : Fe(e, c, a.getPixelForValue(h)).lo
      ), d) {
        const f = l.slice(0, o + 1).reverse().findIndex((m) => !K(m[n.axis]));
        o -= Math.max(0, f);
      }
      o = _e(o, 0, i - 1);
    }
    if (p) {
      let f = Math.max(
        // @ts-expect-error Need to type _parsed
        Fe(l, a.axis, u, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        r ? 0 : Fe(e, c, a.getPixelForValue(u), !0).hi + 1
      );
      if (d) {
        const m = l.slice(f - 1).findIndex((y) => !K(y[n.axis]));
        f += Math.max(0, m);
      }
      s = _e(f, o, i) - o;
    } else
      s = i - o;
  }
  return {
    start: o,
    count: s
  };
}
function gl(t) {
  const { xScale: e, yScale: r, _scaleRanges: i } = t, o = {
    xmin: e.min,
    xmax: e.max,
    ymin: r.min,
    ymax: r.max
  };
  if (!i)
    return t._scaleRanges = o, !0;
  const s = i.xmin !== e.min || i.xmax !== e.max || i.ymin !== r.min || i.ymax !== r.max;
  return Object.assign(i, o), s;
}
const Wr = (t) => t === 0 || t === 1, en = (t, e, r) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * re / r)), tn = (t, e, r) => Math.pow(2, -10 * t) * Math.sin((t - e) * re / r) + 1, vr = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => -t * (t - 2),
  easeInOutQuad: (t) => (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (t -= 1) * t * t + 1,
  easeInOutCubic: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2),
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => -((t -= 1) * t * t * t - 1),
  easeInOutQuart: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2),
  easeInQuint: (t) => t * t * t * t * t,
  easeOutQuint: (t) => (t -= 1) * t * t * t * t + 1,
  easeInOutQuint: (t) => (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
  easeInSine: (t) => -Math.cos(t * le) + 1,
  easeOutSine: (t) => Math.sin(t * le),
  easeInOutSine: (t) => -0.5 * (Math.cos(Q * t) - 1),
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
  easeInOutExpo: (t) => Wr(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => Wr(t) ? t : en(t, 0.075, 0.3),
  easeOutElastic: (t) => Wr(t) ? t : tn(t, 0.075, 0.3),
  easeInOutElastic(t) {
    return Wr(t) ? t : t < 0.5 ? 0.5 * en(t * 2, 0.1125, 0.45) : 0.5 + 0.5 * tn(t * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(t) {
    return t * t * ((1.70158 + 1) * t - 1.70158);
  },
  easeOutBack(t) {
    return (t -= 1) * t * ((1.70158 + 1) * t + 1.70158) + 1;
  },
  easeInOutBack(t) {
    let e = 1.70158;
    return (t /= 0.5) < 1 ? 0.5 * (t * t * (((e *= 1.525) + 1) * t - e)) : 0.5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
  },
  easeInBounce: (t) => 1 - vr.easeOutBounce(1 - t),
  easeOutBounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInOutBounce: (t) => t < 0.5 ? vr.easeInBounce(t * 2) * 0.5 : vr.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};
function ns(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function rn(t) {
  return ns(t) ? t : new Mr(t);
}
function to(t) {
  return ns(t) ? t : new Mr(t).saturate(0.5).darken(0.1).hexString();
}
const e_ = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], t_ = [
  "color",
  "borderColor",
  "backgroundColor"
];
function r_(t) {
  t.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), t.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (e) => e !== "onProgress" && e !== "onComplete" && e !== "fn"
  }), t.set("animations", {
    colors: {
      type: "color",
      properties: t_
    },
    numbers: {
      type: "number",
      properties: e_
    }
  }), t.describe("animations", {
    _fallback: "animation"
  }), t.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (e) => e | 0
        }
      }
    }
  });
}
function i_(t) {
  t.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const on = /* @__PURE__ */ new Map();
function o_(t, e) {
  e = e || {};
  const r = t + JSON.stringify(e);
  let i = on.get(r);
  return i || (i = new Intl.NumberFormat(t, e), on.set(r, i)), i;
}
function Br(t, e, r) {
  return o_(e, r).format(t);
}
const pl = {
  values(t) {
    return se(t) ? t : "" + t;
  },
  numeric(t, e, r) {
    if (t === 0)
      return "0";
    const i = this.chart.options.locale;
    let o, s = t;
    if (r.length > 1) {
      const d = Math.max(Math.abs(r[0].value), Math.abs(r[r.length - 1].value));
      (d < 1e-4 || d > 1e15) && (o = "scientific"), s = s_(t, r);
    }
    const a = Ye(Math.abs(s)), n = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), l = {
      notation: o,
      minimumFractionDigits: n,
      maximumFractionDigits: n
    };
    return Object.assign(l, this.options.ticks.format), Br(t, i, l);
  },
  logarithmic(t, e, r) {
    if (t === 0)
      return "0";
    const i = r[e].significand || t / Math.pow(10, Math.floor(Ye(t)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(i) || e > 0.8 * r.length ? pl.numeric.call(this, t, e, r) : "";
  }
};
function s_(t, e) {
  let r = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(r) >= 1 && t !== Math.floor(t) && (r = t - Math.floor(t)), r;
}
var Di = {
  formatters: pl
};
function n_(t) {
  t.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (e, r) => r.lineWidth,
      tickColor: (e, r) => r.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Di.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), t.route("scale.ticks", "color", "", "color"), t.route("scale.grid", "color", "", "borderColor"), t.route("scale.border", "color", "", "borderColor"), t.route("scale.title", "color", "", "color"), t.describe("scale", {
    _fallback: !1,
    _scriptable: (e) => !e.startsWith("before") && !e.startsWith("after") && e !== "callback" && e !== "parser",
    _indexable: (e) => e !== "borderDash" && e !== "tickBorderDash" && e !== "dash"
  }), t.describe("scales", {
    _fallback: "scale"
  }), t.describe("scale.ticks", {
    _scriptable: (e) => e !== "backdropPadding" && e !== "callback",
    _indexable: (e) => e !== "backdropPadding"
  });
}
const Ct = /* @__PURE__ */ Object.create(null), Oo = /* @__PURE__ */ Object.create(null);
function br(t, e) {
  if (!e)
    return t;
  const r = e.split(".");
  for (let i = 0, o = r.length; i < o; ++i) {
    const s = r[i];
    t = t[s] || (t[s] = /* @__PURE__ */ Object.create(null));
  }
  return t;
}
function ro(t, e, r) {
  return typeof e == "string" ? zr(br(t, e), r) : zr(br(t, ""), e);
}
class a_ {
  constructor(e, r) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (i, o) => to(o.backgroundColor), this.hoverBorderColor = (i, o) => to(o.borderColor), this.hoverColor = (i, o) => to(o.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(r);
  }
  set(e, r) {
    return ro(this, e, r);
  }
  get(e) {
    return br(this, e);
  }
  describe(e, r) {
    return ro(Oo, e, r);
  }
  override(e, r) {
    return ro(Ct, e, r);
  }
  route(e, r, i, o) {
    const s = br(this, e), a = br(this, i), n = "_" + r;
    Object.defineProperties(s, {
      [n]: {
        value: s[r],
        writable: !0
      },
      [r]: {
        enumerable: !0,
        get() {
          const l = this[n], d = a[o];
          return Y(l) ? Object.assign({}, d, l) : W(l, d);
        },
        set(l) {
          this[n] = l;
        }
      }
    });
  }
  apply(e) {
    e.forEach((r) => r(this));
  }
}
var ne = /* @__PURE__ */ new a_({
  _scriptable: (t) => !t.startsWith("on"),
  _indexable: (t) => t !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  r_,
  i_,
  n_
]);
function l_(t) {
  return !t || K(t.size) || K(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
}
function wi(t, e, r, i, o) {
  let s = e[o];
  return s || (s = e[o] = t.measureText(o).width, r.push(o)), s > i && (i = s), i;
}
function d_(t, e, r, i) {
  i = i || {};
  let o = i.data = i.data || {}, s = i.garbageCollect = i.garbageCollect || [];
  i.font !== e && (o = i.data = {}, s = i.garbageCollect = [], i.font = e), t.save(), t.font = e;
  let a = 0;
  const n = r.length;
  let l, d, c, h, u;
  for (l = 0; l < n; l++)
    if (h = r[l], h != null && !se(h))
      a = wi(t, o, s, a, h);
    else if (se(h))
      for (d = 0, c = h.length; d < c; d++)
        u = h[d], u != null && !se(u) && (a = wi(t, o, s, a, u));
  t.restore();
  const _ = s.length / 2;
  if (_ > r.length) {
    for (l = 0; l < _; l++)
      delete o[s[l]];
    s.splice(0, _);
  }
  return a;
}
function ht(t, e, r) {
  const i = t.currentDevicePixelRatio, o = r !== 0 ? Math.max(r / 2, 0.5) : 0;
  return Math.round((e - o) * i) / i + o;
}
function sn(t, e) {
  !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
}
function Io(t, e, r, i) {
  fl(t, e, r, i, null);
}
function fl(t, e, r, i, o) {
  let s, a, n, l, d, c, h, u;
  const _ = e.pointStyle, p = e.rotation, f = e.radius;
  let m = (p || 0) * Vu;
  if (_ && typeof _ == "object" && (s = _.toString(), s === "[object HTMLImageElement]" || s === "[object HTMLCanvasElement]")) {
    t.save(), t.translate(r, i), t.rotate(m), t.drawImage(_, -_.width / 2, -_.height / 2, _.width, _.height), t.restore();
    return;
  }
  if (!(isNaN(f) || f <= 0)) {
    switch (t.beginPath(), _) {
      // Default includes circle
      default:
        o ? t.ellipse(r, i, o / 2, f, 0, 0, re) : t.arc(r, i, f, 0, re), t.closePath();
        break;
      case "triangle":
        c = o ? o / 2 : f, t.moveTo(r + Math.sin(m) * c, i - Math.cos(m) * f), m += Xs, t.lineTo(r + Math.sin(m) * c, i - Math.cos(m) * f), m += Xs, t.lineTo(r + Math.sin(m) * c, i - Math.cos(m) * f), t.closePath();
        break;
      case "rectRounded":
        d = f * 0.516, l = f - d, a = Math.cos(m + ct) * l, h = Math.cos(m + ct) * (o ? o / 2 - d : l), n = Math.sin(m + ct) * l, u = Math.sin(m + ct) * (o ? o / 2 - d : l), t.arc(r - h, i - n, d, m - Q, m - le), t.arc(r + u, i - a, d, m - le, m), t.arc(r + h, i + n, d, m, m + le), t.arc(r - u, i + a, d, m + le, m + Q), t.closePath();
        break;
      case "rect":
        if (!p) {
          l = Math.SQRT1_2 * f, c = o ? o / 2 : l, t.rect(r - c, i - l, 2 * c, 2 * l);
          break;
        }
        m += ct;
      /* falls through */
      case "rectRot":
        h = Math.cos(m) * (o ? o / 2 : f), a = Math.cos(m) * f, n = Math.sin(m) * f, u = Math.sin(m) * (o ? o / 2 : f), t.moveTo(r - h, i - n), t.lineTo(r + u, i - a), t.lineTo(r + h, i + n), t.lineTo(r - u, i + a), t.closePath();
        break;
      case "crossRot":
        m += ct;
      /* falls through */
      case "cross":
        h = Math.cos(m) * (o ? o / 2 : f), a = Math.cos(m) * f, n = Math.sin(m) * f, u = Math.sin(m) * (o ? o / 2 : f), t.moveTo(r - h, i - n), t.lineTo(r + h, i + n), t.moveTo(r + u, i - a), t.lineTo(r - u, i + a);
        break;
      case "star":
        h = Math.cos(m) * (o ? o / 2 : f), a = Math.cos(m) * f, n = Math.sin(m) * f, u = Math.sin(m) * (o ? o / 2 : f), t.moveTo(r - h, i - n), t.lineTo(r + h, i + n), t.moveTo(r + u, i - a), t.lineTo(r - u, i + a), m += ct, h = Math.cos(m) * (o ? o / 2 : f), a = Math.cos(m) * f, n = Math.sin(m) * f, u = Math.sin(m) * (o ? o / 2 : f), t.moveTo(r - h, i - n), t.lineTo(r + h, i + n), t.moveTo(r + u, i - a), t.lineTo(r - u, i + a);
        break;
      case "line":
        a = o ? o / 2 : Math.cos(m) * f, n = Math.sin(m) * f, t.moveTo(r - a, i - n), t.lineTo(r + a, i + n);
        break;
      case "dash":
        t.moveTo(r, i), t.lineTo(r + Math.cos(m) * (o ? o / 2 : f), i + Math.sin(m) * f);
        break;
      case !1:
        t.closePath();
        break;
    }
    t.fill(), e.borderWidth > 0 && t.stroke();
  }
}
function Ve(t, e, r) {
  return r = r || 0.5, !e || t && t.x > e.left - r && t.x < e.right + r && t.y > e.top - r && t.y < e.bottom + r;
}
function $i(t, e) {
  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
}
function Oi(t) {
  t.restore();
}
function c_(t, e, r, i, o) {
  if (!e)
    return t.lineTo(r.x, r.y);
  if (o === "middle") {
    const s = (e.x + r.x) / 2;
    t.lineTo(s, e.y), t.lineTo(s, r.y);
  } else o === "after" != !!i ? t.lineTo(e.x, r.y) : t.lineTo(r.x, e.y);
  t.lineTo(r.x, r.y);
}
function h_(t, e, r, i) {
  if (!e)
    return t.lineTo(r.x, r.y);
  t.bezierCurveTo(i ? e.cp1x : e.cp2x, i ? e.cp1y : e.cp2y, i ? r.cp2x : r.cp1x, i ? r.cp2y : r.cp1y, r.x, r.y);
}
function u_(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]), K(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
}
function __(t, e, r, i, o) {
  if (o.strikethrough || o.underline) {
    const s = t.measureText(i), a = e - s.actualBoundingBoxLeft, n = e + s.actualBoundingBoxRight, l = r - s.actualBoundingBoxAscent, d = r + s.actualBoundingBoxDescent, c = o.strikethrough ? (l + d) / 2 : d;
    t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = o.decorationWidth || 2, t.moveTo(a, c), t.lineTo(n, c), t.stroke();
  }
}
function g_(t, e) {
  const r = t.fillStyle;
  t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = r;
}
function Mt(t, e, r, i, o, s = {}) {
  const a = se(e) ? e : [
    e
  ], n = s.strokeWidth > 0 && s.strokeColor !== "";
  let l, d;
  for (t.save(), t.font = o.string, u_(t, s), l = 0; l < a.length; ++l)
    d = a[l], s.backdrop && g_(t, s.backdrop), n && (s.strokeColor && (t.strokeStyle = s.strokeColor), K(s.strokeWidth) || (t.lineWidth = s.strokeWidth), t.strokeText(d, r, i, s.maxWidth)), t.fillText(d, r, i, s.maxWidth), __(t, r, i, d, s), i += Number(o.lineHeight);
  t.restore();
}
function Tr(t, e) {
  const { x: r, y: i, w: o, h: s, radius: a } = e;
  t.arc(r + a.topLeft, i + a.topLeft, a.topLeft, 1.5 * Q, Q, !0), t.lineTo(r, i + s - a.bottomLeft), t.arc(r + a.bottomLeft, i + s - a.bottomLeft, a.bottomLeft, Q, le, !0), t.lineTo(r + o - a.bottomRight, i + s), t.arc(r + o - a.bottomRight, i + s - a.bottomRight, a.bottomRight, le, 0, !0), t.lineTo(r + o, i + a.topRight), t.arc(r + o - a.topRight, i + a.topRight, a.topRight, 0, -le, !0), t.lineTo(r + a.topLeft, i);
}
const p_ = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, f_ = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function m_(t, e) {
  const r = ("" + t).match(p_);
  if (!r || r[1] === "normal")
    return e * 1.2;
  switch (t = +r[2], r[3]) {
    case "px":
      return t;
    case "%":
      t /= 100;
      break;
  }
  return e * t;
}
const y_ = (t) => +t || 0;
function as(t, e) {
  const r = {}, i = Y(e), o = i ? Object.keys(e) : e, s = Y(t) ? i ? (a) => W(t[a], t[e[a]]) : (a) => t[a] : () => t;
  for (const a of o)
    r[a] = y_(s(a));
  return r;
}
function ml(t) {
  return as(t, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function xt(t) {
  return as(t, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ve(t) {
  const e = ml(t);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function he(t, e) {
  t = t || {}, e = e || ne.font;
  let r = W(t.size, e.size);
  typeof r == "string" && (r = parseInt(r, 10));
  let i = W(t.style, e.style);
  i && !("" + i).match(f_) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const o = {
    family: W(t.family, e.family),
    lineHeight: m_(W(t.lineHeight, e.lineHeight), r),
    size: r,
    style: i,
    weight: W(t.weight, e.weight),
    string: ""
  };
  return o.string = l_(o), o;
}
function cr(t, e, r, i) {
  let o, s, a;
  for (o = 0, s = t.length; o < s; ++o)
    if (a = t[o], a !== void 0 && a !== void 0)
      return a;
}
function v_(t, e, r) {
  const { min: i, max: o } = t, s = sl(e, (o - i) / 2), a = (n, l) => r && n === 0 ? 0 : n + l;
  return {
    min: a(i, -Math.abs(s)),
    max: a(o, s)
  };
}
function at(t, e) {
  return Object.assign(Object.create(t), e);
}
function ls(t, e = [
  ""
], r, i, o = () => t[0]) {
  const s = r || t;
  typeof i > "u" && (i = xl("_fallback", t));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: s,
    _fallback: i,
    _getTarget: o,
    override: (n) => ls([
      n,
      ...t
    ], e, s, i)
  };
  return new Proxy(a, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(n, l) {
      return delete n[l], delete n._keys, delete t[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(n, l) {
      return vl(n, l, () => C_(l, e, t, n));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(n, l) {
      return Reflect.getOwnPropertyDescriptor(n._scopes[0], l);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(t[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(n, l) {
      return an(n).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(n) {
      return an(n);
    },
    /**
    * A trap for setting property values.
    */
    set(n, l, d) {
      const c = n._storage || (n._storage = o());
      return n[l] = c[l] = d, delete n._keys, !0;
    }
  });
}
function qt(t, e, r, i) {
  const o = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: r,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: yl(t, i),
    setContext: (s) => qt(t, s, r, i),
    override: (s) => qt(t.override(s), e, r, i)
  };
  return new Proxy(o, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(s, a) {
      return delete s[a], delete t[a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(s, a, n) {
      return vl(s, a, () => x_(s, a, n));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(s, a) {
      return s._descriptors.allKeys ? Reflect.has(t, a) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(t, a);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(t);
    },
    /**
    * A trap for the in operator.
    */
    has(s, a) {
      return Reflect.has(t, a);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(t);
    },
    /**
    * A trap for setting property values.
    */
    set(s, a, n) {
      return t[a] = n, delete s[a], !0;
    }
  });
}
function yl(t, e = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: r = e.scriptable, _indexable: i = e.indexable, _allKeys: o = e.allKeys } = t;
  return {
    allKeys: o,
    scriptable: r,
    indexable: i,
    isScriptable: tt(r) ? r : () => r,
    isIndexable: tt(i) ? i : () => i
  };
}
const b_ = (t, e) => t ? t + rs(e) : e, ds = (t, e) => Y(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function vl(t, e, r) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const i = r();
  return t[e] = i, i;
}
function x_(t, e, r) {
  const { _proxy: i, _context: o, _subProxy: s, _descriptors: a } = t;
  let n = i[e];
  return tt(n) && a.isScriptable(e) && (n = w_(e, n, t, r)), se(n) && n.length && (n = k_(e, n, t, a.isIndexable)), ds(e, n) && (n = qt(n, o, s && s[e], a)), n;
}
function w_(t, e, r, i) {
  const { _proxy: o, _context: s, _subProxy: a, _stack: n } = r;
  if (n.has(t))
    throw new Error("Recursion detected: " + Array.from(n).join("->") + "->" + t);
  n.add(t);
  let l = e(s, a || i);
  return n.delete(t), ds(t, l) && (l = cs(o._scopes, o, t, l)), l;
}
function k_(t, e, r, i) {
  const { _proxy: o, _context: s, _subProxy: a, _descriptors: n } = r;
  if (typeof s.index < "u" && i(t))
    return e[s.index % e.length];
  if (Y(e[0])) {
    const l = e, d = o._scopes.filter((c) => c !== l);
    e = [];
    for (const c of l) {
      const h = cs(d, o, t, c);
      e.push(qt(h, s, a && a[t], n));
    }
  }
  return e;
}
function bl(t, e, r) {
  return tt(t) ? t(e, r) : t;
}
const S_ = (t, e) => t === !0 ? e : typeof t == "string" ? et(e, t) : void 0;
function A_(t, e, r, i, o) {
  for (const s of e) {
    const a = S_(r, s);
    if (a) {
      t.add(a);
      const n = bl(a._fallback, r, o);
      if (typeof n < "u" && n !== r && n !== i)
        return n;
    } else if (a === !1 && typeof i < "u" && r !== i)
      return null;
  }
  return !1;
}
function cs(t, e, r, i) {
  const o = e._rootScopes, s = bl(e._fallback, r, i), a = [
    ...t,
    ...o
  ], n = /* @__PURE__ */ new Set();
  n.add(i);
  let l = nn(n, a, r, s || r, i);
  return l === null || typeof s < "u" && s !== r && (l = nn(n, a, s, l, i), l === null) ? !1 : ls(Array.from(n), [
    ""
  ], o, s, () => P_(e, r, i));
}
function nn(t, e, r, i, o) {
  for (; r; )
    r = A_(t, e, r, i, o);
  return r;
}
function P_(t, e, r) {
  const i = t._getTarget();
  e in i || (i[e] = {});
  const o = i[e];
  return se(o) && Y(r) ? r : o || {};
}
function C_(t, e, r, i) {
  let o;
  for (const s of e)
    if (o = xl(b_(s, t), r), typeof o < "u")
      return ds(t, o) ? cs(r, i, t, o) : o;
}
function xl(t, e) {
  for (const r of e) {
    if (!r)
      continue;
    const i = r[t];
    if (typeof i < "u")
      return i;
  }
}
function an(t) {
  let e = t._keys;
  return e || (e = t._keys = M_(t._scopes)), e;
}
function M_(t) {
  const e = /* @__PURE__ */ new Set();
  for (const r of t)
    for (const i of Object.keys(r).filter((o) => !o.startsWith("_")))
      e.add(i);
  return Array.from(e);
}
function wl(t, e, r, i) {
  const { iScale: o } = t, { key: s = "r" } = this._parsing, a = new Array(i);
  let n, l, d, c;
  for (n = 0, l = i; n < l; ++n)
    d = n + r, c = e[d], a[n] = {
      r: o.parse(et(c, s), d)
    };
  return a;
}
const z_ = Number.EPSILON || 1e-14, Xt = (t, e) => e < t.length && !t[e].skip && t[e], kl = (t) => t === "x" ? "y" : "x";
function E_(t, e, r, i) {
  const o = t.skip ? e : t, s = e, a = r.skip ? e : r, n = $o(s, o), l = $o(a, s);
  let d = n / (n + l), c = l / (n + l);
  d = isNaN(d) ? 0 : d, c = isNaN(c) ? 0 : c;
  const h = i * d, u = i * c;
  return {
    previous: {
      x: s.x - h * (a.x - o.x),
      y: s.y - h * (a.y - o.y)
    },
    next: {
      x: s.x + u * (a.x - o.x),
      y: s.y + u * (a.y - o.y)
    }
  };
}
function L_(t, e, r) {
  const i = t.length;
  let o, s, a, n, l, d = Xt(t, 0);
  for (let c = 0; c < i - 1; ++c)
    if (l = d, d = Xt(t, c + 1), !(!l || !d)) {
      if (yr(e[c], 0, z_)) {
        r[c] = r[c + 1] = 0;
        continue;
      }
      o = r[c] / e[c], s = r[c + 1] / e[c], n = Math.pow(o, 2) + Math.pow(s, 2), !(n <= 9) && (a = 3 / Math.sqrt(n), r[c] = o * a * e[c], r[c + 1] = s * a * e[c]);
    }
}
function T_(t, e, r = "x") {
  const i = kl(r), o = t.length;
  let s, a, n, l = Xt(t, 0);
  for (let d = 0; d < o; ++d) {
    if (a = n, n = l, l = Xt(t, d + 1), !n)
      continue;
    const c = n[r], h = n[i];
    a && (s = (c - a[r]) / 3, n[`cp1${r}`] = c - s, n[`cp1${i}`] = h - s * e[d]), l && (s = (l[r] - c) / 3, n[`cp2${r}`] = c + s, n[`cp2${i}`] = h + s * e[d]);
  }
}
function D_(t, e = "x") {
  const r = kl(e), i = t.length, o = Array(i).fill(0), s = Array(i);
  let a, n, l, d = Xt(t, 0);
  for (a = 0; a < i; ++a)
    if (n = l, l = d, d = Xt(t, a + 1), !!l) {
      if (d) {
        const c = d[e] - l[e];
        o[a] = c !== 0 ? (d[r] - l[r]) / c : 0;
      }
      s[a] = n ? d ? Oe(o[a - 1]) !== Oe(o[a]) ? 0 : (o[a - 1] + o[a]) / 2 : o[a - 1] : o[a];
    }
  L_(t, o, s), T_(t, s, e);
}
function Ur(t, e, r) {
  return Math.max(Math.min(t, r), e);
}
function $_(t, e) {
  let r, i, o, s, a, n = Ve(t[0], e);
  for (r = 0, i = t.length; r < i; ++r)
    a = s, s = n, n = r < i - 1 && Ve(t[r + 1], e), s && (o = t[r], a && (o.cp1x = Ur(o.cp1x, e.left, e.right), o.cp1y = Ur(o.cp1y, e.top, e.bottom)), n && (o.cp2x = Ur(o.cp2x, e.left, e.right), o.cp2y = Ur(o.cp2y, e.top, e.bottom)));
}
function O_(t, e, r, i, o) {
  let s, a, n, l;
  if (e.spanGaps && (t = t.filter((d) => !d.skip)), e.cubicInterpolationMode === "monotone")
    D_(t, o);
  else {
    let d = i ? t[t.length - 1] : t[0];
    for (s = 0, a = t.length; s < a; ++s)
      n = t[s], l = E_(d, n, t[Math.min(s + 1, a - (i ? 0 : 1)) % a], e.tension), n.cp1x = l.previous.x, n.cp1y = l.previous.y, n.cp2x = l.next.x, n.cp2y = l.next.y, d = n;
  }
  e.capBezierPoints && $_(t, r);
}
function hs() {
  return typeof window < "u" && typeof document < "u";
}
function us(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function ki(t, e, r) {
  let i;
  return typeof t == "string" ? (i = parseInt(t, 10), t.indexOf("%") !== -1 && (i = i / 100 * e.parentNode[r])) : i = t, i;
}
const Ii = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function I_(t, e) {
  return Ii(t).getPropertyValue(e);
}
const R_ = [
  "top",
  "right",
  "bottom",
  "left"
];
function wt(t, e, r) {
  const i = {};
  r = r ? "-" + r : "";
  for (let o = 0; o < 4; o++) {
    const s = R_[o];
    i[s] = parseFloat(t[e + "-" + s + r]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const N_ = (t, e, r) => (t > 0 || e > 0) && (!r || !r.shadowRoot);
function B_(t, e) {
  const r = t.touches, i = r && r.length ? r[0] : t, { offsetX: o, offsetY: s } = i;
  let a = !1, n, l;
  if (N_(o, s, t.target))
    n = o, l = s;
  else {
    const d = e.getBoundingClientRect();
    n = i.clientX - d.left, l = i.clientY - d.top, a = !0;
  }
  return {
    x: n,
    y: l,
    box: a
  };
}
function gt(t, e) {
  if ("native" in t)
    return t;
  const { canvas: r, currentDevicePixelRatio: i } = e, o = Ii(r), s = o.boxSizing === "border-box", a = wt(o, "padding"), n = wt(o, "border", "width"), { x: l, y: d, box: c } = B_(t, r), h = a.left + (c && n.left), u = a.top + (c && n.top);
  let { width: _, height: p } = e;
  return s && (_ -= a.width + n.width, p -= a.height + n.height), {
    x: Math.round((l - h) / _ * r.width / i),
    y: Math.round((d - u) / p * r.height / i)
  };
}
function H_(t, e, r) {
  let i, o;
  if (e === void 0 || r === void 0) {
    const s = t && us(t);
    if (!s)
      e = t.clientWidth, r = t.clientHeight;
    else {
      const a = s.getBoundingClientRect(), n = Ii(s), l = wt(n, "border", "width"), d = wt(n, "padding");
      e = a.width - d.width - l.width, r = a.height - d.height - l.height, i = ki(n.maxWidth, s, "clientWidth"), o = ki(n.maxHeight, s, "clientHeight");
    }
  }
  return {
    width: e,
    height: r,
    maxWidth: i || xi,
    maxHeight: o || xi
  };
}
const Kr = (t) => Math.round(t * 10) / 10;
function j_(t, e, r, i) {
  const o = Ii(t), s = wt(o, "margin"), a = ki(o.maxWidth, t, "clientWidth") || xi, n = ki(o.maxHeight, t, "clientHeight") || xi, l = H_(t, e, r);
  let { width: d, height: c } = l;
  if (o.boxSizing === "content-box") {
    const u = wt(o, "border", "width"), _ = wt(o, "padding");
    d -= _.width + u.width, c -= _.height + u.height;
  }
  return d = Math.max(0, d - s.width), c = Math.max(0, i ? d / i : c - s.height), d = Kr(Math.min(d, a, l.maxWidth)), c = Kr(Math.min(c, n, l.maxHeight)), d && !c && (c = Kr(d / 2)), (e !== void 0 || r !== void 0) && i && l.height && c > l.height && (c = l.height, d = Kr(Math.floor(c * i))), {
    width: d,
    height: c
  };
}
function ln(t, e, r) {
  const i = e || 1, o = Math.floor(t.height * i), s = Math.floor(t.width * i);
  t.height = Math.floor(t.height), t.width = Math.floor(t.width);
  const a = t.canvas;
  return a.style && (r || !a.style.height && !a.style.width) && (a.style.height = `${t.height}px`, a.style.width = `${t.width}px`), t.currentDevicePixelRatio !== i || a.height !== o || a.width !== s ? (t.currentDevicePixelRatio = i, a.height = o, a.width = s, t.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const F_ = (function() {
  let t = !1;
  try {
    const e = {
      get passive() {
        return t = !0, !1;
      }
    };
    hs() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return t;
})();
function dn(t, e) {
  const r = I_(t, e), i = r && r.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function pt(t, e, r, i) {
  return {
    x: t.x + r * (e.x - t.x),
    y: t.y + r * (e.y - t.y)
  };
}
function V_(t, e, r, i) {
  return {
    x: t.x + r * (e.x - t.x),
    y: i === "middle" ? r < 0.5 ? t.y : e.y : i === "after" ? r < 1 ? t.y : e.y : r > 0 ? e.y : t.y
  };
}
function G_(t, e, r, i) {
  const o = {
    x: t.cp2x,
    y: t.cp2y
  }, s = {
    x: e.cp1x,
    y: e.cp1y
  }, a = pt(t, o, r), n = pt(o, s, r), l = pt(s, e, r), d = pt(a, n, r), c = pt(n, l, r);
  return pt(d, c, r);
}
const W_ = function(t, e) {
  return {
    x(r) {
      return t + t + e - r;
    },
    setWidth(r) {
      e = r;
    },
    textAlign(r) {
      return r === "center" ? r : r === "right" ? "left" : "right";
    },
    xPlus(r, i) {
      return r - i;
    },
    leftForLtr(r, i) {
      return r - i;
    }
  };
}, U_ = function() {
  return {
    x(t) {
      return t;
    },
    setWidth(t) {
    },
    textAlign(t) {
      return t;
    },
    xPlus(t, e) {
      return t + e;
    },
    leftForLtr(t, e) {
      return t;
    }
  };
};
function Ht(t, e, r) {
  return t ? W_(e, r) : U_();
}
function Sl(t, e) {
  let r, i;
  (e === "ltr" || e === "rtl") && (r = t.canvas.style, i = [
    r.getPropertyValue("direction"),
    r.getPropertyPriority("direction")
  ], r.setProperty("direction", e, "important"), t.prevTextDirection = i);
}
function Al(t, e) {
  e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
}
function Pl(t) {
  return t === "angle" ? {
    between: Lr,
    compare: Ku,
    normalize: me
  } : {
    between: je,
    compare: (e, r) => e - r,
    normalize: (e) => e
  };
}
function cn({ start: t, end: e, count: r, loop: i, style: o }) {
  return {
    start: t % r,
    end: e % r,
    loop: i && (e - t + 1) % r === 0,
    style: o
  };
}
function K_(t, e, r) {
  const { property: i, start: o, end: s } = r, { between: a, normalize: n } = Pl(i), l = e.length;
  let { start: d, end: c, loop: h } = t, u, _;
  if (h) {
    for (d += l, c += l, u = 0, _ = l; u < _ && a(n(e[d % l][i]), o, s); ++u)
      d--, c--;
    d %= l, c %= l;
  }
  return c < d && (c += l), {
    start: d,
    end: c,
    loop: h,
    style: t.style
  };
}
function Cl(t, e, r) {
  if (!r)
    return [
      t
    ];
  const { property: i, start: o, end: s } = r, a = e.length, { compare: n, between: l, normalize: d } = Pl(i), { start: c, end: h, loop: u, style: _ } = K_(t, e, r), p = [];
  let f = !1, m = null, y, g, v;
  const k = () => l(o, v, y) && n(o, v) !== 0, w = () => n(s, y) === 0 || l(s, v, y), S = () => f || k(), P = () => !f || w();
  for (let x = c, E = c; x <= h; ++x)
    g = e[x % a], !g.skip && (y = d(g[i]), y !== v && (f = l(y, o, s), m === null && S() && (m = n(y, o) === 0 ? x : E), m !== null && P() && (p.push(cn({
      start: m,
      end: x,
      loop: u,
      count: a,
      style: _
    })), m = null), E = x, v = y));
  return m !== null && p.push(cn({
    start: m,
    end: h,
    loop: u,
    count: a,
    style: _
  })), p;
}
function Ml(t, e) {
  const r = [], i = t.segments;
  for (let o = 0; o < i.length; o++) {
    const s = Cl(i[o], t.points, e);
    s.length && r.push(...s);
  }
  return r;
}
function Y_(t, e, r, i) {
  let o = 0, s = e - 1;
  if (r && !i)
    for (; o < e && !t[o].skip; )
      o++;
  for (; o < e && t[o].skip; )
    o++;
  for (o %= e, r && (s += o); s > o && t[s % e].skip; )
    s--;
  return s %= e, {
    start: o,
    end: s
  };
}
function q_(t, e, r, i) {
  const o = t.length, s = [];
  let a = e, n = t[e], l;
  for (l = e + 1; l <= r; ++l) {
    const d = t[l % o];
    d.skip || d.stop ? n.skip || (i = !1, s.push({
      start: e % o,
      end: (l - 1) % o,
      loop: i
    }), e = a = d.stop ? l : null) : (a = l, n.skip && (e = l)), n = d;
  }
  return a !== null && s.push({
    start: e % o,
    end: a % o,
    loop: i
  }), s;
}
function X_(t, e) {
  const r = t.points, i = t.options.spanGaps, o = r.length;
  if (!o)
    return [];
  const s = !!t._loop, { start: a, end: n } = Y_(r, o, s, i);
  if (i === !0)
    return hn(t, [
      {
        start: a,
        end: n,
        loop: s
      }
    ], r, e);
  const l = n < a ? n + o : n, d = !!t._fullLoop && a === 0 && n === o - 1;
  return hn(t, q_(r, a, l, d), r, e);
}
function hn(t, e, r, i) {
  return !i || !i.setContext || !r ? e : Z_(t, e, r, i);
}
function Z_(t, e, r, i) {
  const o = t._chart.getContext(), s = un(t.options), { _datasetIndex: a, options: { spanGaps: n } } = t, l = r.length, d = [];
  let c = s, h = e[0].start, u = h;
  function _(p, f, m, y) {
    const g = n ? -1 : 1;
    if (p !== f) {
      for (p += l; r[p % l].skip; )
        p -= g;
      for (; r[f % l].skip; )
        f += g;
      p % l !== f % l && (d.push({
        start: p % l,
        end: f % l,
        loop: m,
        style: y
      }), c = y, h = f % l);
    }
  }
  for (const p of e) {
    h = n ? h : p.start;
    let f = r[h % l], m;
    for (u = h + 1; u <= p.end; u++) {
      const y = r[u % l];
      m = un(i.setContext(at(o, {
        type: "segment",
        p0: f,
        p1: y,
        p0DataIndex: (u - 1) % l,
        p1DataIndex: u % l,
        datasetIndex: a
      }))), Q_(m, c) && _(h, u - 1, p.loop, c), f = y, c = m;
    }
    h < u - 1 && _(h, u - 1, p.loop, c);
  }
  return d;
}
function un(t) {
  return {
    backgroundColor: t.backgroundColor,
    borderCapStyle: t.borderCapStyle,
    borderDash: t.borderDash,
    borderDashOffset: t.borderDashOffset,
    borderJoinStyle: t.borderJoinStyle,
    borderWidth: t.borderWidth,
    borderColor: t.borderColor
  };
}
function Q_(t, e) {
  if (!e)
    return !1;
  const r = [], i = function(o, s) {
    return ns(s) ? (r.includes(s) || r.push(s), r.indexOf(s)) : s;
  };
  return JSON.stringify(t, i) !== JSON.stringify(e, i);
}
function Yr(t, e, r) {
  return t.options.clip ? t[r] : e[r];
}
function J_(t, e) {
  const { xScale: r, yScale: i } = t;
  return r && i ? {
    left: Yr(r, e, "left"),
    right: Yr(r, e, "right"),
    top: Yr(i, e, "top"),
    bottom: Yr(i, e, "bottom")
  } : e;
}
function zl(t, e) {
  const r = e._clip;
  if (r.disabled)
    return !1;
  const i = J_(e, t.chartArea);
  return {
    left: r.left === !1 ? 0 : i.left - (r.left === !0 ? 0 : r.left),
    right: r.right === !1 ? t.width : i.right + (r.right === !0 ? 0 : r.right),
    top: r.top === !1 ? 0 : i.top - (r.top === !0 ? 0 : r.top),
    bottom: r.bottom === !1 ? t.height : i.bottom + (r.bottom === !0 ? 0 : r.bottom)
  };
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class eg {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(e, r, i, o) {
    const s = r.listeners[o], a = r.duration;
    s.forEach((n) => n({
      chart: e,
      initial: r.initial,
      numSteps: a,
      currentStep: Math.min(i - r.start, a)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = hl.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(e = Date.now()) {
    let r = 0;
    this._charts.forEach((i, o) => {
      if (!i.running || !i.items.length)
        return;
      const s = i.items;
      let a = s.length - 1, n = !1, l;
      for (; a >= 0; --a)
        l = s[a], l._active ? (l._total > i.duration && (i.duration = l._total), l.tick(e), n = !0) : (s[a] = s[s.length - 1], s.pop());
      n && (o.draw(), this._notify(o, i, e, "progress")), s.length || (i.running = !1, this._notify(o, i, e, "complete"), i.initial = !1), r += s.length;
    }), this._lastDate = e, r === 0 && (this._running = !1);
  }
  _getAnims(e) {
    const r = this._charts;
    let i = r.get(e);
    return i || (i = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, r.set(e, i)), i;
  }
  listen(e, r, i) {
    this._getAnims(e).listeners[r].push(i);
  }
  add(e, r) {
    !r || !r.length || this._getAnims(e).items.push(...r);
  }
  has(e) {
    return this._getAnims(e).items.length > 0;
  }
  start(e) {
    const r = this._charts.get(e);
    r && (r.running = !0, r.start = Date.now(), r.duration = r.items.reduce((i, o) => Math.max(i, o._duration), 0), this._refresh());
  }
  running(e) {
    if (!this._running)
      return !1;
    const r = this._charts.get(e);
    return !(!r || !r.running || !r.items.length);
  }
  stop(e) {
    const r = this._charts.get(e);
    if (!r || !r.items.length)
      return;
    const i = r.items;
    let o = i.length - 1;
    for (; o >= 0; --o)
      i[o].cancel();
    r.items = [], this._notify(e, r, Date.now(), "complete");
  }
  remove(e) {
    return this._charts.delete(e);
  }
}
var Re = /* @__PURE__ */ new eg();
const _n = "transparent", tg = {
  boolean(t, e, r) {
    return r > 0.5 ? e : t;
  },
  color(t, e, r) {
    const i = rn(t || _n), o = i.valid && rn(e || _n);
    return o && o.valid ? o.mix(i, r).hexString() : e;
  },
  number(t, e, r) {
    return t + (e - t) * r;
  }
};
class rg {
  constructor(e, r, i, o) {
    const s = r[i];
    o = cr([
      e.to,
      o,
      s,
      e.from
    ]);
    const a = cr([
      e.from,
      s,
      o
    ]);
    this._active = !0, this._fn = e.fn || tg[e.type || typeof a], this._easing = vr[e.easing] || vr.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = r, this._prop = i, this._from = a, this._to = o, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, r, i) {
    if (this._active) {
      this._notify(!1);
      const o = this._target[this._prop], s = i - this._start, a = this._duration - s;
      this._start = i, this._duration = Math.floor(Math.max(a, e.duration)), this._total += s, this._loop = !!e.loop, this._to = cr([
        e.to,
        r,
        o,
        e.from
      ]), this._from = cr([
        e.from,
        o,
        r
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(e) {
    const r = e - this._start, i = this._duration, o = this._prop, s = this._from, a = this._loop, n = this._to;
    let l;
    if (this._active = s !== n && (a || r < i), !this._active) {
      this._target[o] = n, this._notify(!0);
      return;
    }
    if (r < 0) {
      this._target[o] = s;
      return;
    }
    l = r / i % 2, l = a && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[o] = this._fn(s, n, l);
  }
  wait() {
    const e = this._promises || (this._promises = []);
    return new Promise((r, i) => {
      e.push({
        res: r,
        rej: i
      });
    });
  }
  _notify(e) {
    const r = e ? "res" : "rej", i = this._promises || [];
    for (let o = 0; o < i.length; o++)
      i[o][r]();
  }
}
class El {
  constructor(e, r) {
    this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(r);
  }
  configure(e) {
    if (!Y(e))
      return;
    const r = Object.keys(ne.animation), i = this._properties;
    Object.getOwnPropertyNames(e).forEach((o) => {
      const s = e[o];
      if (!Y(s))
        return;
      const a = {};
      for (const n of r)
        a[n] = s[n];
      (se(s.properties) && s.properties || [
        o
      ]).forEach((n) => {
        (n === o || !i.has(n)) && i.set(n, a);
      });
    });
  }
  _animateOptions(e, r) {
    const i = r.options, o = og(e, i);
    if (!o)
      return [];
    const s = this._createAnimations(o, i);
    return i.$shared && ig(e.options.$animations, i).then(() => {
      e.options = i;
    }, () => {
    }), s;
  }
  _createAnimations(e, r) {
    const i = this._properties, o = [], s = e.$animations || (e.$animations = {}), a = Object.keys(r), n = Date.now();
    let l;
    for (l = a.length - 1; l >= 0; --l) {
      const d = a[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        o.push(...this._animateOptions(e, r));
        continue;
      }
      const c = r[d];
      let h = s[d];
      const u = i.get(d);
      if (h)
        if (u && h.active()) {
          h.update(u, c, n);
          continue;
        } else
          h.cancel();
      if (!u || !u.duration) {
        e[d] = c;
        continue;
      }
      s[d] = h = new rg(u, e, d, c), o.push(h);
    }
    return o;
  }
  update(e, r) {
    if (this._properties.size === 0) {
      Object.assign(e, r);
      return;
    }
    const i = this._createAnimations(e, r);
    if (i.length)
      return Re.add(this._chart, i), !0;
  }
}
function ig(t, e) {
  const r = [], i = Object.keys(e);
  for (let o = 0; o < i.length; o++) {
    const s = t[i[o]];
    s && s.active() && r.push(s.wait());
  }
  return Promise.all(r);
}
function og(t, e) {
  if (!e)
    return;
  let r = t.options;
  if (!r) {
    t.options = e;
    return;
  }
  return r.$shared && (t.options = r = Object.assign({}, r, {
    $shared: !1,
    $animations: {}
  })), r;
}
function gn(t, e) {
  const r = t && t.options || {}, i = r.reverse, o = r.min === void 0 ? e : 0, s = r.max === void 0 ? e : 0;
  return {
    start: i ? s : o,
    end: i ? o : s
  };
}
function sg(t, e, r) {
  if (r === !1)
    return !1;
  const i = gn(t, r), o = gn(e, r);
  return {
    top: o.end,
    right: i.end,
    bottom: o.start,
    left: i.start
  };
}
function ng(t) {
  let e, r, i, o;
  return Y(t) ? (e = t.top, r = t.right, i = t.bottom, o = t.left) : e = r = i = o = t, {
    top: e,
    right: r,
    bottom: i,
    left: o,
    disabled: t === !1
  };
}
function Ll(t, e) {
  const r = [], i = t._getSortedDatasetMetas(e);
  let o, s;
  for (o = 0, s = i.length; o < s; ++o)
    r.push(i[o].index);
  return r;
}
function pn(t, e, r, i = {}) {
  const o = t.keys, s = i.mode === "single";
  let a, n, l, d;
  if (e === null)
    return;
  let c = !1;
  for (a = 0, n = o.length; a < n; ++a) {
    if (l = +o[a], l === r) {
      if (c = !0, i.all)
        continue;
      break;
    }
    d = t.values[l], ae(d) && (s || e === 0 || Oe(e) === Oe(d)) && (e += d);
  }
  return !c && !i.all ? 0 : e;
}
function ag(t, e) {
  const { iScale: r, vScale: i } = e, o = r.axis === "x" ? "x" : "y", s = i.axis === "x" ? "x" : "y", a = Object.keys(t), n = new Array(a.length);
  let l, d, c;
  for (l = 0, d = a.length; l < d; ++l)
    c = a[l], n[l] = {
      [o]: c,
      [s]: t[c]
    };
  return n;
}
function io(t, e) {
  const r = t && t.options.stacked;
  return r || r === void 0 && e.stack !== void 0;
}
function lg(t, e, r) {
  return `${t.id}.${e.id}.${r.stack || r.type}`;
}
function dg(t) {
  const { min: e, max: r, minDefined: i, maxDefined: o } = t.getUserBounds();
  return {
    min: i ? e : Number.NEGATIVE_INFINITY,
    max: o ? r : Number.POSITIVE_INFINITY
  };
}
function cg(t, e, r) {
  const i = t[e] || (t[e] = {});
  return i[r] || (i[r] = {});
}
function fn(t, e, r, i) {
  for (const o of e.getMatchingVisibleMetas(i).reverse()) {
    const s = t[o.index];
    if (r && s > 0 || !r && s < 0)
      return o.index;
  }
  return null;
}
function mn(t, e) {
  const { chart: r, _cachedMeta: i } = t, o = r._stacks || (r._stacks = {}), { iScale: s, vScale: a, index: n } = i, l = s.axis, d = a.axis, c = lg(s, a, i), h = e.length;
  let u;
  for (let _ = 0; _ < h; ++_) {
    const p = e[_], { [l]: f, [d]: m } = p, y = p._stacks || (p._stacks = {});
    u = y[d] = cg(o, c, f), u[n] = m, u._top = fn(u, a, !0, i.type), u._bottom = fn(u, a, !1, i.type);
    const g = u._visualValues || (u._visualValues = {});
    g[n] = m;
  }
}
function oo(t, e) {
  const r = t.scales;
  return Object.keys(r).filter((i) => r[i].axis === e).shift();
}
function hg(t, e) {
  return at(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function ug(t, e, r) {
  return at(t, {
    active: !1,
    dataIndex: e,
    parsed: void 0,
    raw: void 0,
    element: r,
    index: e,
    mode: "default",
    type: "data"
  });
}
function tr(t, e) {
  const r = t.controller.index, i = t.vScale && t.vScale.axis;
  if (i) {
    e = e || t._parsed;
    for (const o of e) {
      const s = o._stacks;
      if (!s || s[i] === void 0 || s[i][r] === void 0)
        return;
      delete s[i][r], s[i]._visualValues !== void 0 && s[i]._visualValues[r] !== void 0 && delete s[i]._visualValues[r];
    }
  }
}
const so = (t) => t === "reset" || t === "none", yn = (t, e) => e ? t : Object.assign({}, t), _g = (t, e, r) => t && !e.hidden && e._stacked && {
  keys: Ll(r, !0),
  values: null
};
class ze {
  constructor(e, r) {
    this.chart = e, this._ctx = e.ctx, this.index = r, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = io(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && tr(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, r = this._cachedMeta, i = this.getDataset(), o = (h, u, _, p) => h === "x" ? u : h === "r" ? p : _, s = r.xAxisID = W(i.xAxisID, oo(e, "x")), a = r.yAxisID = W(i.yAxisID, oo(e, "y")), n = r.rAxisID = W(i.rAxisID, oo(e, "r")), l = r.indexAxis, d = r.iAxisID = o(l, s, a, n), c = r.vAxisID = o(l, a, s, n);
    r.xScale = this.getScaleForId(s), r.yScale = this.getScaleForId(a), r.rScale = this.getScaleForId(n), r.iScale = this.getScaleForId(d), r.vScale = this.getScaleForId(c);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(e) {
    return this.chart.scales[e];
  }
  _getOtherScale(e) {
    const r = this._cachedMeta;
    return e === r.iScale ? r.vScale : r.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const e = this._cachedMeta;
    this._data && Js(this._data, this), e._stacked && tr(e);
  }
  _dataCheck() {
    const e = this.getDataset(), r = e.data || (e.data = []), i = this._data;
    if (Y(r)) {
      const o = this._cachedMeta;
      this._data = ag(r, o);
    } else if (i !== r) {
      if (i) {
        Js(i, this);
        const o = this._cachedMeta;
        tr(o), o._parsed = [];
      }
      r && Object.isExtensible(r) && Zu(r, this), this._syncList = [], this._data = r;
    }
  }
  addElements() {
    const e = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(e) {
    const r = this._cachedMeta, i = this.getDataset();
    let o = !1;
    this._dataCheck();
    const s = r._stacked;
    r._stacked = io(r.vScale, r), r.stack !== i.stack && (o = !0, tr(r), r.stack = i.stack), this._resyncElements(e), (o || s !== r._stacked) && (mn(this, r._parsed), r._stacked = io(r.vScale, r));
  }
  configure() {
    const e = this.chart.config, r = e.datasetScopeKeys(this._type), i = e.getOptionScopes(this.getDataset(), r, !0);
    this.options = e.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, r) {
    const { _cachedMeta: i, _data: o } = this, { iScale: s, _stacked: a } = i, n = s.axis;
    let l = e === 0 && r === o.length ? !0 : i._sorted, d = e > 0 && i._parsed[e - 1], c, h, u;
    if (this._parsing === !1)
      i._parsed = o, i._sorted = !0, u = o;
    else {
      se(o[e]) ? u = this.parseArrayData(i, o, e, r) : Y(o[e]) ? u = this.parseObjectData(i, o, e, r) : u = this.parsePrimitiveData(i, o, e, r);
      const _ = () => h[n] === null || d && h[n] < d[n];
      for (c = 0; c < r; ++c)
        i._parsed[c + e] = h = u[c], l && (_() && (l = !1), d = h);
      i._sorted = l;
    }
    a && mn(this, u);
  }
  parsePrimitiveData(e, r, i, o) {
    const { iScale: s, vScale: a } = e, n = s.axis, l = a.axis, d = s.getLabels(), c = s === a, h = new Array(o);
    let u, _, p;
    for (u = 0, _ = o; u < _; ++u)
      p = u + i, h[u] = {
        [n]: c || s.parse(d[p], p),
        [l]: a.parse(r[p], p)
      };
    return h;
  }
  parseArrayData(e, r, i, o) {
    const { xScale: s, yScale: a } = e, n = new Array(o);
    let l, d, c, h;
    for (l = 0, d = o; l < d; ++l)
      c = l + i, h = r[c], n[l] = {
        x: s.parse(h[0], c),
        y: a.parse(h[1], c)
      };
    return n;
  }
  parseObjectData(e, r, i, o) {
    const { xScale: s, yScale: a } = e, { xAxisKey: n = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(o);
    let c, h, u, _;
    for (c = 0, h = o; c < h; ++c)
      u = c + i, _ = r[u], d[c] = {
        x: s.parse(et(_, n), u),
        y: a.parse(et(_, l), u)
      };
    return d;
  }
  getParsed(e) {
    return this._cachedMeta._parsed[e];
  }
  getDataElement(e) {
    return this._cachedMeta.data[e];
  }
  applyStack(e, r, i) {
    const o = this.chart, s = this._cachedMeta, a = r[e.axis], n = {
      keys: Ll(o, !0),
      values: r._stacks[e.axis]._visualValues
    };
    return pn(n, a, s.index, {
      mode: i
    });
  }
  updateRangeFromParsed(e, r, i, o) {
    const s = i[r.axis];
    let a = s === null ? NaN : s;
    const n = o && i._stacks[r.axis];
    o && n && (o.values = n, a = pn(o, s, this._cachedMeta.index)), e.min = Math.min(e.min, a), e.max = Math.max(e.max, a);
  }
  getMinMax(e, r) {
    const i = this._cachedMeta, o = i._parsed, s = i._sorted && e === i.iScale, a = o.length, n = this._getOtherScale(e), l = _g(r, i, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: c, max: h } = dg(n);
    let u, _;
    function p() {
      _ = o[u];
      const f = _[n.axis];
      return !ae(_[e.axis]) || c > f || h < f;
    }
    for (u = 0; u < a && !(!p() && (this.updateRangeFromParsed(d, e, _, l), s)); ++u)
      ;
    if (s) {
      for (u = a - 1; u >= 0; --u)
        if (!p()) {
          this.updateRangeFromParsed(d, e, _, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(e) {
    const r = this._cachedMeta._parsed, i = [];
    let o, s, a;
    for (o = 0, s = r.length; o < s; ++o)
      a = r[o][e.axis], ae(a) && i.push(a);
    return i;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(e) {
    const r = this._cachedMeta, i = r.iScale, o = r.vScale, s = this.getParsed(e);
    return {
      label: i ? "" + i.getLabelForValue(s[i.axis]) : "",
      value: o ? "" + o.getLabelForValue(s[o.axis]) : ""
    };
  }
  _update(e) {
    const r = this._cachedMeta;
    this.update(e || "default"), r._clip = ng(W(this.options.clip, sg(r.xScale, r.yScale, this.getMaxOverflow())));
  }
  update(e) {
  }
  draw() {
    const e = this._ctx, r = this.chart, i = this._cachedMeta, o = i.data || [], s = r.chartArea, a = [], n = this._drawStart || 0, l = this._drawCount || o.length - n, d = this.options.drawActiveElementsOnTop;
    let c;
    for (i.dataset && i.dataset.draw(e, s, n, l), c = n; c < n + l; ++c) {
      const h = o[c];
      h.hidden || (h.active && d ? a.push(h) : h.draw(e, s));
    }
    for (c = 0; c < a.length; ++c)
      a[c].draw(e, s);
  }
  getStyle(e, r) {
    const i = r ? "active" : "default";
    return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(e || 0, i);
  }
  getContext(e, r, i) {
    const o = this.getDataset();
    let s;
    if (e >= 0 && e < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[e];
      s = a.$context || (a.$context = ug(this.getContext(), e, a)), s.parsed = this.getParsed(e), s.raw = o.data[e], s.index = s.dataIndex = e;
    } else
      s = this.$context || (this.$context = hg(this.chart.getContext(), this.index)), s.dataset = o, s.index = s.datasetIndex = this.index;
    return s.active = !!r, s.mode = i, s;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, r) {
    return this._resolveElementOptions(this.dataElementType.id, r, e);
  }
  _resolveElementOptions(e, r = "default", i) {
    const o = r === "active", s = this._cachedDataOpts, a = e + "-" + r, n = s[a], l = this.enableOptionSharing && Er(i);
    if (n)
      return yn(n, l);
    const d = this.chart.config, c = d.datasetElementScopeKeys(this._type, e), h = o ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], u = d.getOptionScopes(this.getDataset(), c), _ = Object.keys(ne.elements[e]), p = () => this.getContext(i, o, r), f = d.resolveNamedOptions(u, _, p, h);
    return f.$shared && (f.$shared = l, s[a] = Object.freeze(yn(f, l))), f;
  }
  _resolveAnimations(e, r, i) {
    const o = this.chart, s = this._cachedDataOpts, a = `animation-${r}`, n = s[a];
    if (n)
      return n;
    let l;
    if (o.options.animation !== !1) {
      const c = this.chart.config, h = c.datasetAnimationScopeKeys(this._type, r), u = c.getOptionScopes(this.getDataset(), h);
      l = c.createResolver(u, this.getContext(e, i, r));
    }
    const d = new El(o, l && l.animations);
    return l && l._cacheable && (s[a] = Object.freeze(d)), d;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, r) {
    return !r || so(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, r) {
    const i = this.resolveDataElementOptions(e, r), o = this._sharedOptions, s = this.getSharedOptions(i), a = this.includeOptions(r, s) || s !== o;
    return this.updateSharedOptions(s, r, i), {
      sharedOptions: s,
      includeOptions: a
    };
  }
  updateElement(e, r, i, o) {
    so(o) ? Object.assign(e, i) : this._resolveAnimations(r, o).update(e, i);
  }
  updateSharedOptions(e, r, i) {
    e && !so(r) && this._resolveAnimations(void 0, r).update(e, i);
  }
  _setStyle(e, r, i, o) {
    e.active = o;
    const s = this.getStyle(r, o);
    this._resolveAnimations(r, i, o).update(e, {
      options: !o && this.getSharedOptions(s) || s
    });
  }
  removeHoverStyle(e, r, i) {
    this._setStyle(e, i, "active", !1);
  }
  setHoverStyle(e, r, i) {
    this._setStyle(e, i, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !0);
  }
  _resyncElements(e) {
    const r = this._data, i = this._cachedMeta.data;
    for (const [n, l, d] of this._syncList)
      this[n](l, d);
    this._syncList = [];
    const o = i.length, s = r.length, a = Math.min(s, o);
    a && this.parse(0, a), s > o ? this._insertElements(o, s - o, e) : s < o && this._removeElements(s, o - s);
  }
  _insertElements(e, r, i = !0) {
    const o = this._cachedMeta, s = o.data, a = e + r;
    let n;
    const l = (d) => {
      for (d.length += r, n = d.length - 1; n >= a; n--)
        d[n] = d[n - r];
    };
    for (l(s), n = e; n < a; ++n)
      s[n] = new this.dataElementType();
    this._parsing && l(o._parsed), this.parse(e, r), i && this.updateElements(s, e, r, "reset");
  }
  updateElements(e, r, i, o) {
  }
  _removeElements(e, r) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const o = i._parsed.splice(e, r);
      i._stacked && tr(i, o);
    }
    i.data.splice(e, r);
  }
  _sync(e) {
    if (this._parsing)
      this._syncList.push(e);
    else {
      const [r, i, o] = e;
      this[r](i, o);
    }
    this.chart._dataChanges.push([
      this.index,
      ...e
    ]);
  }
  _onDataPush() {
    const e = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - e,
      e
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(e, r) {
    r && this._sync([
      "_removeElements",
      e,
      r
    ]);
    const i = arguments.length - 2;
    i && this._sync([
      "_insertElements",
      e,
      i
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
N(ze, "defaults", {}), N(ze, "datasetElementType", null), N(ze, "dataElementType", null);
function gg(t, e) {
  if (!t._cache.$bar) {
    const r = t.getMatchingVisibleMetas(e);
    let i = [];
    for (let o = 0, s = r.length; o < s; o++)
      i = i.concat(r[o].controller.getAllParsedValues(t));
    t._cache.$bar = cl(i.sort((o, s) => o - s));
  }
  return t._cache.$bar;
}
function pg(t) {
  const e = t.iScale, r = gg(e, t.type);
  let i = e._length, o, s, a, n;
  const l = () => {
    a === 32767 || a === -32768 || (Er(n) && (i = Math.min(i, Math.abs(a - n) || i)), n = a);
  };
  for (o = 0, s = r.length; o < s; ++o)
    a = e.getPixelForValue(r[o]), l();
  for (n = void 0, o = 0, s = e.ticks.length; o < s; ++o)
    a = e.getPixelForTick(o), l();
  return i;
}
function fg(t, e, r, i) {
  const o = r.barThickness;
  let s, a;
  return K(o) ? (s = e.min * r.categoryPercentage, a = r.barPercentage) : (s = o * i, a = 1), {
    chunk: s / i,
    ratio: a,
    start: e.pixels[t] - s / 2
  };
}
function mg(t, e, r, i) {
  const o = e.pixels, s = o[t];
  let a = t > 0 ? o[t - 1] : null, n = t < o.length - 1 ? o[t + 1] : null;
  const l = r.categoryPercentage;
  a === null && (a = s - (n === null ? e.end - e.start : n - s)), n === null && (n = s + s - a);
  const d = s - (s - Math.min(a, n)) / 2 * l;
  return {
    chunk: Math.abs(n - a) / 2 * l / i,
    ratio: r.barPercentage,
    start: d
  };
}
function yg(t, e, r, i) {
  const o = r.parse(t[0], i), s = r.parse(t[1], i), a = Math.min(o, s), n = Math.max(o, s);
  let l = a, d = n;
  Math.abs(a) > Math.abs(n) && (l = n, d = a), e[r.axis] = d, e._custom = {
    barStart: l,
    barEnd: d,
    start: o,
    end: s,
    min: a,
    max: n
  };
}
function Tl(t, e, r, i) {
  return se(t) ? yg(t, e, r, i) : e[r.axis] = r.parse(t, i), e;
}
function vn(t, e, r, i) {
  const o = t.iScale, s = t.vScale, a = o.getLabels(), n = o === s, l = [];
  let d, c, h, u;
  for (d = r, c = r + i; d < c; ++d)
    u = e[d], h = {}, h[o.axis] = n || o.parse(a[d], d), l.push(Tl(u, h, s, d));
  return l;
}
function no(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function vg(t, e, r) {
  return t !== 0 ? Oe(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= r ? 1 : -1);
}
function bg(t) {
  let e, r, i, o, s;
  return t.horizontal ? (e = t.base > t.x, r = "left", i = "right") : (e = t.base < t.y, r = "bottom", i = "top"), e ? (o = "end", s = "start") : (o = "start", s = "end"), {
    start: r,
    end: i,
    reverse: e,
    top: o,
    bottom: s
  };
}
function xg(t, e, r, i) {
  let o = e.borderSkipped;
  const s = {};
  if (!o) {
    t.borderSkipped = s;
    return;
  }
  if (o === !0) {
    t.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: a, end: n, reverse: l, top: d, bottom: c } = bg(t);
  o === "middle" && r && (t.enableBorderRadius = !0, (r._top || 0) === i ? o = d : (r._bottom || 0) === i ? o = c : (s[bn(c, a, n, l)] = !0, o = d)), s[bn(o, a, n, l)] = !0, t.borderSkipped = s;
}
function bn(t, e, r, i) {
  return i ? (t = wg(t, e, r), t = xn(t, r, e)) : t = xn(t, e, r), t;
}
function wg(t, e, r) {
  return t === e ? r : t === r ? e : t;
}
function xn(t, e, r) {
  return t === "start" ? e : t === "end" ? r : t;
}
function kg(t, { inflateAmount: e }, r) {
  t.inflateAmount = e === "auto" ? r === 1 ? 0.33 : 0 : e;
}
class ni extends ze {
  parsePrimitiveData(e, r, i, o) {
    return vn(e, r, i, o);
  }
  parseArrayData(e, r, i, o) {
    return vn(e, r, i, o);
  }
  parseObjectData(e, r, i, o) {
    const { iScale: s, vScale: a } = e, { xAxisKey: n = "x", yAxisKey: l = "y" } = this._parsing, d = s.axis === "x" ? n : l, c = a.axis === "x" ? n : l, h = [];
    let u, _, p, f;
    for (u = i, _ = i + o; u < _; ++u)
      f = r[u], p = {}, p[s.axis] = s.parse(et(f, d), u), h.push(Tl(et(f, c), p, a, u));
    return h;
  }
  updateRangeFromParsed(e, r, i, o) {
    super.updateRangeFromParsed(e, r, i, o);
    const s = i._custom;
    s && r === this._cachedMeta.vScale && (e.min = Math.min(e.min, s.min), e.max = Math.max(e.max, s.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const r = this._cachedMeta, { iScale: i, vScale: o } = r, s = this.getParsed(e), a = s._custom, n = no(a) ? "[" + a.start + ", " + a.end + "]" : "" + o.getLabelForValue(s[o.axis]);
    return {
      label: "" + i.getLabelForValue(s[i.axis]),
      value: n
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const e = this._cachedMeta;
    e.stack = this.getDataset().stack;
  }
  update(e) {
    const r = this._cachedMeta;
    this.updateElements(r.data, 0, r.data.length, e);
  }
  updateElements(e, r, i, o) {
    const s = o === "reset", { index: a, _cachedMeta: { vScale: n } } = this, l = n.getBasePixel(), d = n.isHorizontal(), c = this._getRuler(), { sharedOptions: h, includeOptions: u } = this._getSharedOptions(r, o);
    for (let _ = r; _ < r + i; _++) {
      const p = this.getParsed(_), f = s || K(p[n.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(_), m = this._calculateBarIndexPixels(_, c), y = (p._stacks || {})[n.axis], g = {
        horizontal: d,
        base: f.base,
        enableBorderRadius: !y || no(p._custom) || a === y._top || a === y._bottom,
        x: d ? f.head : m.center,
        y: d ? m.center : f.head,
        height: d ? m.size : Math.abs(f.size),
        width: d ? Math.abs(f.size) : m.size
      };
      u && (g.options = h || this.resolveDataElementOptions(_, e[_].active ? "active" : o));
      const v = g.options || e[_].options;
      xg(g, v, y, a), kg(g, v, c.ratio), this.updateElement(e[_], _, g, o);
    }
  }
  _getStacks(e, r) {
    const { iScale: i } = this._cachedMeta, o = i.getMatchingVisibleMetas(this._type).filter((c) => c.controller.options.grouped), s = i.options.stacked, a = [], n = this._cachedMeta.controller.getParsed(r), l = n && n[i.axis], d = (c) => {
      const h = c._parsed.find((_) => _[i.axis] === l), u = h && h[c.vScale.axis];
      if (K(u) || isNaN(u))
        return !0;
    };
    for (const c of o)
      if (!(r !== void 0 && d(c)) && ((s === !1 || a.indexOf(c.stack) === -1 || s === void 0 && c.stack === void 0) && a.push(c.stack), c.index === e))
        break;
    return a.length || a.push(void 0), a;
  }
  _getStackCount(e) {
    return this._getStacks(void 0, e).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const e = this.chart.scales, r = this.chart.options.indexAxis;
    return Object.keys(e).filter((i) => e[i].axis === r).shift();
  }
  _getAxis() {
    const e = {}, r = this.getFirstScaleIdForIndexAxis();
    for (const i of this.chart.data.datasets)
      e[W(this.chart.options.indexAxis === "x" ? i.xAxisID : i.yAxisID, r)] = !0;
    return Object.keys(e);
  }
  _getStackIndex(e, r, i) {
    const o = this._getStacks(e, i), s = r !== void 0 ? o.indexOf(r) : -1;
    return s === -1 ? o.length - 1 : s;
  }
  _getRuler() {
    const e = this.options, r = this._cachedMeta, i = r.iScale, o = [];
    let s, a;
    for (s = 0, a = r.data.length; s < a; ++s)
      o.push(i.getPixelForValue(this.getParsed(s)[i.axis], s));
    const n = e.barThickness;
    return {
      min: n || pg(r),
      pixels: o,
      start: i._startPixel,
      end: i._endPixel,
      stackCount: this._getStackCount(),
      scale: i,
      grouped: e.grouped,
      ratio: n ? 1 : e.categoryPercentage * e.barPercentage
    };
  }
  _calculateBarValuePixels(e) {
    const { _cachedMeta: { vScale: r, _stacked: i, index: o }, options: { base: s, minBarLength: a } } = this, n = s || 0, l = this.getParsed(e), d = l._custom, c = no(d);
    let h = l[r.axis], u = 0, _ = i ? this.applyStack(r, l, i) : h, p, f;
    _ !== h && (u = _ - h, _ = h), c && (h = d.barStart, _ = d.barEnd - d.barStart, h !== 0 && Oe(h) !== Oe(d.barEnd) && (u = 0), u += h);
    const m = !K(s) && !c ? s : u;
    let y = r.getPixelForValue(m);
    if (this.chart.getDataVisibility(e) ? p = r.getPixelForValue(u + _) : p = y, f = p - y, Math.abs(f) < a) {
      f = vg(f, r, n) * a, h === n && (y -= f / 2);
      const g = r.getPixelForDecimal(0), v = r.getPixelForDecimal(1), k = Math.min(g, v), w = Math.max(g, v);
      y = Math.max(Math.min(y, w), k), p = y + f, i && !c && (l._stacks[r.axis]._visualValues[o] = r.getValueForPixel(p) - r.getValueForPixel(y));
    }
    if (y === r.getPixelForValue(n)) {
      const g = Oe(f) * r.getLineWidthForValue(n) / 2;
      y += g, f -= g;
    }
    return {
      size: f,
      base: y,
      head: p,
      center: p + f / 2
    };
  }
  _calculateBarIndexPixels(e, r) {
    const i = r.scale, o = this.options, s = o.skipNull, a = W(o.maxBarThickness, 1 / 0);
    let n, l;
    const d = this._getAxisCount();
    if (r.grouped) {
      const c = s ? this._getStackCount(e) : r.stackCount, h = o.barThickness === "flex" ? mg(e, r, o, c * d) : fg(e, r, o, c * d), u = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, _ = this._getAxis().indexOf(W(u, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, s ? e : void 0) + _;
      n = h.start + h.chunk * p + h.chunk / 2, l = Math.min(a, h.chunk * h.ratio);
    } else
      n = i.getPixelForValue(this.getParsed(e)[i.axis], e), l = Math.min(a, r.min * r.ratio);
    return {
      base: n - l / 2,
      head: n + l / 2,
      center: n,
      size: l
    };
  }
  draw() {
    const e = this._cachedMeta, r = e.vScale, i = e.data, o = i.length;
    let s = 0;
    for (; s < o; ++s)
      this.getParsed(s)[r.axis] !== null && !i[s].hidden && i[s].draw(this._ctx);
  }
}
N(ni, "id", "bar"), N(ni, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), N(ni, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
class ai extends ze {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(e, r, i, o) {
    const s = super.parsePrimitiveData(e, r, i, o);
    for (let a = 0; a < s.length; a++)
      s[a]._custom = this.resolveDataElementOptions(a + i).radius;
    return s;
  }
  parseArrayData(e, r, i, o) {
    const s = super.parseArrayData(e, r, i, o);
    for (let a = 0; a < s.length; a++) {
      const n = r[i + a];
      s[a]._custom = W(n[2], this.resolveDataElementOptions(a + i).radius);
    }
    return s;
  }
  parseObjectData(e, r, i, o) {
    const s = super.parseObjectData(e, r, i, o);
    for (let a = 0; a < s.length; a++) {
      const n = r[i + a];
      s[a]._custom = W(n && n.r && +n.r, this.resolveDataElementOptions(a + i).radius);
    }
    return s;
  }
  getMaxOverflow() {
    const e = this._cachedMeta.data;
    let r = 0;
    for (let i = e.length - 1; i >= 0; --i)
      r = Math.max(r, e[i].size(this.resolveDataElementOptions(i)) / 2);
    return r > 0 && r;
  }
  getLabelAndValue(e) {
    const r = this._cachedMeta, i = this.chart.data.labels || [], { xScale: o, yScale: s } = r, a = this.getParsed(e), n = o.getLabelForValue(a.x), l = s.getLabelForValue(a.y), d = a._custom;
    return {
      label: i[e] || "",
      value: "(" + n + ", " + l + (d ? ", " + d : "") + ")"
    };
  }
  update(e) {
    const r = this._cachedMeta.data;
    this.updateElements(r, 0, r.length, e);
  }
  updateElements(e, r, i, o) {
    const s = o === "reset", { iScale: a, vScale: n } = this._cachedMeta, { sharedOptions: l, includeOptions: d } = this._getSharedOptions(r, o), c = a.axis, h = n.axis;
    for (let u = r; u < r + i; u++) {
      const _ = e[u], p = !s && this.getParsed(u), f = {}, m = f[c] = s ? a.getPixelForDecimal(0.5) : a.getPixelForValue(p[c]), y = f[h] = s ? n.getBasePixel() : n.getPixelForValue(p[h]);
      f.skip = isNaN(m) || isNaN(y), d && (f.options = l || this.resolveDataElementOptions(u, _.active ? "active" : o), s && (f.options.radius = 0)), this.updateElement(_, u, f, o);
    }
  }
  resolveDataElementOptions(e, r) {
    const i = this.getParsed(e);
    let o = super.resolveDataElementOptions(e, r);
    o.$shared && (o = Object.assign({}, o, {
      $shared: !1
    }));
    const s = o.radius;
    return r !== "active" && (o.radius = 0), o.radius += W(i && i._custom, s), o;
  }
}
N(ai, "id", "bubble"), N(ai, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "borderWidth",
        "radius"
      ]
    }
  }
}), N(ai, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function Sg(t, e, r) {
  let i = 1, o = 1, s = 0, a = 0;
  if (e < re) {
    const n = t, l = n + e, d = Math.cos(n), c = Math.sin(n), h = Math.cos(l), u = Math.sin(l), _ = (v, k, w) => Lr(v, n, l, !0) ? 1 : Math.max(k, k * r, w, w * r), p = (v, k, w) => Lr(v, n, l, !0) ? -1 : Math.min(k, k * r, w, w * r), f = _(0, d, h), m = _(le, c, u), y = p(Q, d, h), g = p(Q + le, c, u);
    i = (f - y) / 2, o = (m - g) / 2, s = -(f + y) / 2, a = -(m + g) / 2;
  }
  return {
    ratioX: i,
    ratioY: o,
    offsetX: s,
    offsetY: a
  };
}
class qe extends ze {
  constructor(e, r) {
    super(e, r), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(e, r) {
    const i = this.getDataset().data, o = this._cachedMeta;
    if (this._parsing === !1)
      o._parsed = i;
    else {
      let s = (l) => +i[l];
      if (Y(i[e])) {
        const { key: l = "value" } = this._parsing;
        s = (d) => +et(i[d], l);
      }
      let a, n;
      for (a = e, n = e + r; a < n; ++a)
        o._parsed[a] = s(a);
    }
  }
  _getRotation() {
    return Me(this.options.rotation - 90);
  }
  _getCircumference() {
    return Me(this.options.circumference);
  }
  _getRotationExtents() {
    let e = re, r = -re;
    for (let i = 0; i < this.chart.data.datasets.length; ++i)
      if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
        const o = this.chart.getDatasetMeta(i).controller, s = o._getRotation(), a = o._getCircumference();
        e = Math.min(e, s), r = Math.max(r, s + a);
      }
    return {
      rotation: e,
      circumference: r - e
    };
  }
  update(e) {
    const r = this.chart, { chartArea: i } = r, o = this._cachedMeta, s = o.data, a = this.getMaxBorderWidth() + this.getMaxOffset(s) + this.options.spacing, n = Math.max((Math.min(i.width, i.height) - a) / 2, 0), l = Math.min(Iu(this.options.cutout, n), 1), d = this._getRingWeight(this.index), { circumference: c, rotation: h } = this._getRotationExtents(), { ratioX: u, ratioY: _, offsetX: p, offsetY: f } = Sg(h, c, l), m = (i.width - a) / u, y = (i.height - a) / _, g = Math.max(Math.min(m, y) / 2, 0), v = sl(this.options.radius, g), k = Math.max(v * l, 0), w = (v - k) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * v, this.offsetY = f * v, o.total = this.calculateTotal(), this.outerRadius = v - w * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - w * d, 0), this.updateElements(s, 0, s.length, e);
  }
  _circumference(e, r) {
    const i = this.options, o = this._cachedMeta, s = this._getCircumference();
    return r && i.animation.animateRotate || !this.chart.getDataVisibility(e) || o._parsed[e] === null || o.data[e].hidden ? 0 : this.calculateCircumference(o._parsed[e] * s / re);
  }
  updateElements(e, r, i, o) {
    const s = o === "reset", a = this.chart, n = a.chartArea, d = a.options.animation, c = (n.left + n.right) / 2, h = (n.top + n.bottom) / 2, u = s && d.animateScale, _ = u ? 0 : this.innerRadius, p = u ? 0 : this.outerRadius, { sharedOptions: f, includeOptions: m } = this._getSharedOptions(r, o);
    let y = this._getRotation(), g;
    for (g = 0; g < r; ++g)
      y += this._circumference(g, s);
    for (g = r; g < r + i; ++g) {
      const v = this._circumference(g, s), k = e[g], w = {
        x: c + this.offsetX,
        y: h + this.offsetY,
        startAngle: y,
        endAngle: y + v,
        circumference: v,
        outerRadius: p,
        innerRadius: _
      };
      m && (w.options = f || this.resolveDataElementOptions(g, k.active ? "active" : o)), y += v, this.updateElement(k, g, w, o);
    }
  }
  calculateTotal() {
    const e = this._cachedMeta, r = e.data;
    let i = 0, o;
    for (o = 0; o < r.length; o++) {
      const s = e._parsed[o];
      s !== null && !isNaN(s) && this.chart.getDataVisibility(o) && !r[o].hidden && (i += Math.abs(s));
    }
    return i;
  }
  calculateCircumference(e) {
    const r = this._cachedMeta.total;
    return r > 0 && !isNaN(e) ? re * (Math.abs(e) / r) : 0;
  }
  getLabelAndValue(e) {
    const r = this._cachedMeta, i = this.chart, o = i.data.labels || [], s = Br(r._parsed[e], i.options.locale);
    return {
      label: o[e] || "",
      value: s
    };
  }
  getMaxBorderWidth(e) {
    let r = 0;
    const i = this.chart;
    let o, s, a, n, l;
    if (!e) {
      for (o = 0, s = i.data.datasets.length; o < s; ++o)
        if (i.isDatasetVisible(o)) {
          a = i.getDatasetMeta(o), e = a.data, n = a.controller;
          break;
        }
    }
    if (!e)
      return 0;
    for (o = 0, s = e.length; o < s; ++o)
      l = n.resolveDataElementOptions(o), l.borderAlign !== "inner" && (r = Math.max(r, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return r;
  }
  getMaxOffset(e) {
    let r = 0;
    for (let i = 0, o = e.length; i < o; ++i) {
      const s = this.resolveDataElementOptions(i);
      r = Math.max(r, s.offset || 0, s.hoverOffset || 0);
    }
    return r;
  }
  _getRingWeightOffset(e) {
    let r = 0;
    for (let i = 0; i < e; ++i)
      this.chart.isDatasetVisible(i) && (r += this._getRingWeight(i));
    return r;
  }
  _getRingWeight(e) {
    return Math.max(W(this.chart.data.datasets[e].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
N(qe, "id", "doughnut"), N(qe, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), N(qe, "descriptors", {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
}), N(qe, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const r = e.data;
          if (r.labels.length && r.datasets.length) {
            const { labels: { pointStyle: i, color: o } } = e.legend.options;
            return r.labels.map((s, a) => {
              const l = e.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: s,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: o,
                lineWidth: l.borderWidth,
                pointStyle: i,
                hidden: !e.getDataVisibility(a),
                index: a
              };
            });
          }
          return [];
        }
      },
      onClick(e, r, i) {
        i.chart.toggleDataVisibility(r.index), i.chart.update();
      }
    }
  }
});
class li extends ze {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(e) {
    const r = this._cachedMeta, { dataset: i, data: o = [], _dataset: s } = r, a = this.chart._animationsDisabled;
    let { start: n, count: l } = _l(r, o, a);
    this._drawStart = n, this._drawCount = l, gl(r) && (n = 0, l = o.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!s._decimated, i.points = o;
    const d = this.resolveDatasetElementOptions(e);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !a,
      options: d
    }, e), this.updateElements(o, n, l, e);
  }
  updateElements(e, r, i, o) {
    const s = o === "reset", { iScale: a, vScale: n, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: c, includeOptions: h } = this._getSharedOptions(r, o), u = a.axis, _ = n.axis, { spanGaps: p, segment: f } = this.options, m = Yt(p) ? p : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || s || o === "none", g = r + i, v = e.length;
    let k = r > 0 && this.getParsed(r - 1);
    for (let w = 0; w < v; ++w) {
      const S = e[w], P = y ? S : {};
      if (w < r || w >= g) {
        P.skip = !0;
        continue;
      }
      const x = this.getParsed(w), E = K(x[_]), L = P[u] = a.getPixelForValue(x[u], w), z = P[_] = s || E ? n.getBasePixel() : n.getPixelForValue(l ? this.applyStack(n, x, l) : x[_], w);
      P.skip = isNaN(L) || isNaN(z) || E, P.stop = w > 0 && Math.abs(x[u] - k[u]) > m, f && (P.parsed = x, P.raw = d.data[w]), h && (P.options = c || this.resolveDataElementOptions(w, S.active ? "active" : o)), y || this.updateElement(S, w, P, o), k = x;
    }
  }
  getMaxOverflow() {
    const e = this._cachedMeta, r = e.dataset, i = r.options && r.options.borderWidth || 0, o = e.data || [];
    if (!o.length)
      return i;
    const s = o[0].size(this.resolveDataElementOptions(0)), a = o[o.length - 1].size(this.resolveDataElementOptions(o.length - 1));
    return Math.max(i, s, a) / 2;
  }
  draw() {
    const e = this._cachedMeta;
    e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
  }
}
N(li, "id", "line"), N(li, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), N(li, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class xr extends ze {
  constructor(e, r) {
    super(e, r), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(e) {
    const r = this._cachedMeta, i = this.chart, o = i.data.labels || [], s = Br(r._parsed[e].r, i.options.locale);
    return {
      label: o[e] || "",
      value: s
    };
  }
  parseObjectData(e, r, i, o) {
    return wl.bind(this)(e, r, i, o);
  }
  update(e) {
    const r = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(r, 0, r.length, e);
  }
  getMinMax() {
    const e = this._cachedMeta, r = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return e.data.forEach((i, o) => {
      const s = this.getParsed(o).r;
      !isNaN(s) && this.chart.getDataVisibility(o) && (s < r.min && (r.min = s), s > r.max && (r.max = s));
    }), r;
  }
  _updateRadius() {
    const e = this.chart, r = e.chartArea, i = e.options, o = Math.min(r.right - r.left, r.bottom - r.top), s = Math.max(o / 2, 0), a = Math.max(i.cutoutPercentage ? s / 100 * i.cutoutPercentage : 1, 0), n = (s - a) / e.getVisibleDatasetCount();
    this.outerRadius = s - n * this.index, this.innerRadius = this.outerRadius - n;
  }
  updateElements(e, r, i, o) {
    const s = o === "reset", a = this.chart, l = a.options.animation, d = this._cachedMeta.rScale, c = d.xCenter, h = d.yCenter, u = d.getIndexAngle(0) - 0.5 * Q;
    let _ = u, p;
    const f = 360 / this.countVisibleElements();
    for (p = 0; p < r; ++p)
      _ += this._computeAngle(p, o, f);
    for (p = r; p < r + i; p++) {
      const m = e[p];
      let y = _, g = _ + this._computeAngle(p, o, f), v = a.getDataVisibility(p) ? d.getDistanceFromCenterForValue(this.getParsed(p).r) : 0;
      _ = g, s && (l.animateScale && (v = 0), l.animateRotate && (y = g = u));
      const k = {
        x: c,
        y: h,
        innerRadius: 0,
        outerRadius: v,
        startAngle: y,
        endAngle: g,
        options: this.resolveDataElementOptions(p, m.active ? "active" : o)
      };
      this.updateElement(m, p, k, o);
    }
  }
  countVisibleElements() {
    const e = this._cachedMeta;
    let r = 0;
    return e.data.forEach((i, o) => {
      !isNaN(this.getParsed(o).r) && this.chart.getDataVisibility(o) && r++;
    }), r;
  }
  _computeAngle(e, r, i) {
    return this.chart.getDataVisibility(e) ? Me(this.resolveDataElementOptions(e, r).angle || i) : 0;
  }
}
N(xr, "id", "polarArea"), N(xr, "defaults", {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
      ]
    }
  },
  indexAxis: "r",
  startAngle: 0
}), N(xr, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const r = e.data;
          if (r.labels.length && r.datasets.length) {
            const { labels: { pointStyle: i, color: o } } = e.legend.options;
            return r.labels.map((s, a) => {
              const l = e.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: s,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: o,
                lineWidth: l.borderWidth,
                pointStyle: i,
                hidden: !e.getDataVisibility(a),
                index: a
              };
            });
          }
          return [];
        }
      },
      onClick(e, r, i) {
        i.chart.toggleDataVisibility(r.index), i.chart.update();
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
});
class Ro extends qe {
}
N(Ro, "id", "pie"), N(Ro, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class di extends ze {
  getLabelAndValue(e) {
    const r = this._cachedMeta.vScale, i = this.getParsed(e);
    return {
      label: r.getLabels()[e],
      value: "" + r.getLabelForValue(i[r.axis])
    };
  }
  parseObjectData(e, r, i, o) {
    return wl.bind(this)(e, r, i, o);
  }
  update(e) {
    const r = this._cachedMeta, i = r.dataset, o = r.data || [], s = r.iScale.getLabels();
    if (i.points = o, e !== "resize") {
      const a = this.resolveDatasetElementOptions(e);
      this.options.showLine || (a.borderWidth = 0);
      const n = {
        _loop: !0,
        _fullLoop: s.length === o.length,
        options: a
      };
      this.updateElement(i, void 0, n, e);
    }
    this.updateElements(o, 0, o.length, e);
  }
  updateElements(e, r, i, o) {
    const s = this._cachedMeta.rScale, a = o === "reset";
    for (let n = r; n < r + i; n++) {
      const l = e[n], d = this.resolveDataElementOptions(n, l.active ? "active" : o), c = s.getPointPositionForValue(n, this.getParsed(n).r), h = a ? s.xCenter : c.x, u = a ? s.yCenter : c.y, _ = {
        x: h,
        y: u,
        angle: c.angle,
        skip: isNaN(h) || isNaN(u),
        options: d
      };
      this.updateElement(l, n, _, o);
    }
  }
}
N(di, "id", "radar"), N(di, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), N(di, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class ci extends ze {
  getLabelAndValue(e) {
    const r = this._cachedMeta, i = this.chart.data.labels || [], { xScale: o, yScale: s } = r, a = this.getParsed(e), n = o.getLabelForValue(a.x), l = s.getLabelForValue(a.y);
    return {
      label: i[e] || "",
      value: "(" + n + ", " + l + ")"
    };
  }
  update(e) {
    const r = this._cachedMeta, { data: i = [] } = r, o = this.chart._animationsDisabled;
    let { start: s, count: a } = _l(r, i, o);
    if (this._drawStart = s, this._drawCount = a, gl(r) && (s = 0, a = i.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: n, _dataset: l } = r;
      n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!l._decimated, n.points = i;
      const d = this.resolveDatasetElementOptions(e);
      d.segment = this.options.segment, this.updateElement(n, void 0, {
        animated: !o,
        options: d
      }, e);
    } else this.datasetElementType && (delete r.dataset, this.datasetElementType = !1);
    this.updateElements(i, s, a, e);
  }
  addElements() {
    const { showLine: e } = this.options;
    !this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(e, r, i, o) {
    const s = o === "reset", { iScale: a, vScale: n, _stacked: l, _dataset: d } = this._cachedMeta, c = this.resolveDataElementOptions(r, o), h = this.getSharedOptions(c), u = this.includeOptions(o, h), _ = a.axis, p = n.axis, { spanGaps: f, segment: m } = this.options, y = Yt(f) ? f : Number.POSITIVE_INFINITY, g = this.chart._animationsDisabled || s || o === "none";
    let v = r > 0 && this.getParsed(r - 1);
    for (let k = r; k < r + i; ++k) {
      const w = e[k], S = this.getParsed(k), P = g ? w : {}, x = K(S[p]), E = P[_] = a.getPixelForValue(S[_], k), L = P[p] = s || x ? n.getBasePixel() : n.getPixelForValue(l ? this.applyStack(n, S, l) : S[p], k);
      P.skip = isNaN(E) || isNaN(L) || x, P.stop = k > 0 && Math.abs(S[_] - v[_]) > y, m && (P.parsed = S, P.raw = d.data[k]), u && (P.options = h || this.resolveDataElementOptions(k, w.active ? "active" : o)), g || this.updateElement(w, k, P, o), v = S;
    }
    this.updateSharedOptions(h, o, c);
  }
  getMaxOverflow() {
    const e = this._cachedMeta, r = e.data || [];
    if (!this.options.showLine) {
      let n = 0;
      for (let l = r.length - 1; l >= 0; --l)
        n = Math.max(n, r[l].size(this.resolveDataElementOptions(l)) / 2);
      return n > 0 && n;
    }
    const i = e.dataset, o = i.options && i.options.borderWidth || 0;
    if (!r.length)
      return o;
    const s = r[0].size(this.resolveDataElementOptions(0)), a = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
    return Math.max(o, s, a) / 2;
  }
}
N(ci, "id", "scatter"), N(ci, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), N(ci, "overrides", {
  interaction: {
    mode: "point"
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
var Ag = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: ni,
  BubbleController: ai,
  DoughnutController: qe,
  LineController: li,
  PieController: Ro,
  PolarAreaController: xr,
  RadarController: di,
  ScatterController: ci
});
function ut() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class _s {
  constructor(e) {
    N(this, "options");
    this.options = e || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(e) {
    Object.assign(_s.prototype, e);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ut();
  }
  parse() {
    return ut();
  }
  format() {
    return ut();
  }
  add() {
    return ut();
  }
  diff() {
    return ut();
  }
  startOf() {
    return ut();
  }
  endOf() {
    return ut();
  }
}
var Pg = {
  _date: _s
};
function Cg(t, e, r, i) {
  const { controller: o, data: s, _sorted: a } = t, n = o._cachedMeta.iScale, l = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
  if (n && e === n.axis && e !== "r" && a && s.length) {
    const d = n._reversePixels ? qu : Fe;
    if (i) {
      if (o._sharedOptions) {
        const c = s[0], h = typeof c.getRange == "function" && c.getRange(e);
        if (h) {
          const u = d(s, e, r - h), _ = d(s, e, r + h);
          return {
            lo: u.lo,
            hi: _.hi
          };
        }
      }
    } else {
      const c = d(s, e, r);
      if (l) {
        const { vScale: h } = o._cachedMeta, { _parsed: u } = t, _ = u.slice(0, c.lo + 1).reverse().findIndex((f) => !K(f[h.axis]));
        c.lo -= Math.max(0, _);
        const p = u.slice(c.hi).findIndex((f) => !K(f[h.axis]));
        c.hi += Math.max(0, p);
      }
      return c;
    }
  }
  return {
    lo: 0,
    hi: s.length - 1
  };
}
function Ri(t, e, r, i, o) {
  const s = t.getSortedVisibleDatasetMetas(), a = r[e];
  for (let n = 0, l = s.length; n < l; ++n) {
    const { index: d, data: c } = s[n], { lo: h, hi: u } = Cg(s[n], e, a, o);
    for (let _ = h; _ <= u; ++_) {
      const p = c[_];
      p.skip || i(p, d, _);
    }
  }
}
function Mg(t) {
  const e = t.indexOf("x") !== -1, r = t.indexOf("y") !== -1;
  return function(i, o) {
    const s = e ? Math.abs(i.x - o.x) : 0, a = r ? Math.abs(i.y - o.y) : 0;
    return Math.sqrt(Math.pow(s, 2) + Math.pow(a, 2));
  };
}
function ao(t, e, r, i, o) {
  const s = [];
  return !o && !t.isPointInArea(e) || Ri(t, r, e, function(n, l, d) {
    !o && !Ve(n, t.chartArea, 0) || n.inRange(e.x, e.y, i) && s.push({
      element: n,
      datasetIndex: l,
      index: d
    });
  }, !0), s;
}
function zg(t, e, r, i) {
  let o = [];
  function s(a, n, l) {
    const { startAngle: d, endAngle: c } = a.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: h } = ll(a, {
      x: e.x,
      y: e.y
    });
    Lr(h, d, c) && o.push({
      element: a,
      datasetIndex: n,
      index: l
    });
  }
  return Ri(t, r, e, s), o;
}
function Eg(t, e, r, i, o, s) {
  let a = [];
  const n = Mg(r);
  let l = Number.POSITIVE_INFINITY;
  function d(c, h, u) {
    const _ = c.inRange(e.x, e.y, o);
    if (i && !_)
      return;
    const p = c.getCenterPoint(o);
    if (!(!!s || t.isPointInArea(p)) && !_)
      return;
    const m = n(e, p);
    m < l ? (a = [
      {
        element: c,
        datasetIndex: h,
        index: u
      }
    ], l = m) : m === l && a.push({
      element: c,
      datasetIndex: h,
      index: u
    });
  }
  return Ri(t, r, e, d), a;
}
function lo(t, e, r, i, o, s) {
  return !s && !t.isPointInArea(e) ? [] : r === "r" && !i ? zg(t, e, r, o) : Eg(t, e, r, i, o, s);
}
function wn(t, e, r, i, o) {
  const s = [], a = r === "x" ? "inXRange" : "inYRange";
  let n = !1;
  return Ri(t, r, e, (l, d, c) => {
    l[a] && l[a](e[r], o) && (s.push({
      element: l,
      datasetIndex: d,
      index: c
    }), n = n || l.inRange(e.x, e.y, o));
  }), i && !n ? [] : s;
}
var Lg = {
  modes: {
    index(t, e, r, i) {
      const o = gt(e, t), s = r.axis || "x", a = r.includeInvisible || !1, n = r.intersect ? ao(t, o, s, i, a) : lo(t, o, s, !1, i, a), l = [];
      return n.length ? (t.getSortedVisibleDatasetMetas().forEach((d) => {
        const c = n[0].index, h = d.data[c];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: d.index,
          index: c
        });
      }), l) : [];
    },
    dataset(t, e, r, i) {
      const o = gt(e, t), s = r.axis || "xy", a = r.includeInvisible || !1;
      let n = r.intersect ? ao(t, o, s, i, a) : lo(t, o, s, !1, i, a);
      if (n.length > 0) {
        const l = n[0].datasetIndex, d = t.getDatasetMeta(l).data;
        n = [];
        for (let c = 0; c < d.length; ++c)
          n.push({
            element: d[c],
            datasetIndex: l,
            index: c
          });
      }
      return n;
    },
    point(t, e, r, i) {
      const o = gt(e, t), s = r.axis || "xy", a = r.includeInvisible || !1;
      return ao(t, o, s, i, a);
    },
    nearest(t, e, r, i) {
      const o = gt(e, t), s = r.axis || "xy", a = r.includeInvisible || !1;
      return lo(t, o, s, r.intersect, i, a);
    },
    x(t, e, r, i) {
      const o = gt(e, t);
      return wn(t, o, "x", r.intersect, i);
    },
    y(t, e, r, i) {
      const o = gt(e, t);
      return wn(t, o, "y", r.intersect, i);
    }
  }
};
const Dl = [
  "left",
  "top",
  "right",
  "bottom"
];
function rr(t, e) {
  return t.filter((r) => r.pos === e);
}
function kn(t, e) {
  return t.filter((r) => Dl.indexOf(r.pos) === -1 && r.box.axis === e);
}
function ir(t, e) {
  return t.sort((r, i) => {
    const o = e ? i : r, s = e ? r : i;
    return o.weight === s.weight ? o.index - s.index : o.weight - s.weight;
  });
}
function Tg(t) {
  const e = [];
  let r, i, o, s, a, n;
  for (r = 0, i = (t || []).length; r < i; ++r)
    o = t[r], { position: s, options: { stack: a, stackWeight: n = 1 } } = o, e.push({
      index: r,
      box: o,
      pos: s,
      horizontal: o.isHorizontal(),
      weight: o.weight,
      stack: a && s + a,
      stackWeight: n
    });
  return e;
}
function Dg(t) {
  const e = {};
  for (const r of t) {
    const { stack: i, pos: o, stackWeight: s } = r;
    if (!i || !Dl.includes(o))
      continue;
    const a = e[i] || (e[i] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    a.count++, a.weight += s;
  }
  return e;
}
function $g(t, e) {
  const r = Dg(t), { vBoxMaxWidth: i, hBoxMaxHeight: o } = e;
  let s, a, n;
  for (s = 0, a = t.length; s < a; ++s) {
    n = t[s];
    const { fullSize: l } = n.box, d = r[n.stack], c = d && n.stackWeight / d.weight;
    n.horizontal ? (n.width = c ? c * i : l && e.availableWidth, n.height = o) : (n.width = i, n.height = c ? c * o : l && e.availableHeight);
  }
  return r;
}
function Og(t) {
  const e = Tg(t), r = ir(e.filter((d) => d.box.fullSize), !0), i = ir(rr(e, "left"), !0), o = ir(rr(e, "right")), s = ir(rr(e, "top"), !0), a = ir(rr(e, "bottom")), n = kn(e, "x"), l = kn(e, "y");
  return {
    fullSize: r,
    leftAndTop: i.concat(s),
    rightAndBottom: o.concat(l).concat(a).concat(n),
    chartArea: rr(e, "chartArea"),
    vertical: i.concat(o).concat(l),
    horizontal: s.concat(a).concat(n)
  };
}
function Sn(t, e, r, i) {
  return Math.max(t[r], e[r]) + Math.max(t[i], e[i]);
}
function $l(t, e) {
  t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
}
function Ig(t, e, r, i) {
  const { pos: o, box: s } = r, a = t.maxPadding;
  if (!Y(o)) {
    r.size && (t[o] -= r.size);
    const h = i[r.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, r.horizontal ? s.height : s.width), r.size = h.size / h.count, t[o] += r.size;
  }
  s.getPadding && $l(a, s.getPadding());
  const n = Math.max(0, e.outerWidth - Sn(a, t, "left", "right")), l = Math.max(0, e.outerHeight - Sn(a, t, "top", "bottom")), d = n !== t.w, c = l !== t.h;
  return t.w = n, t.h = l, r.horizontal ? {
    same: d,
    other: c
  } : {
    same: c,
    other: d
  };
}
function Rg(t) {
  const e = t.maxPadding;
  function r(i) {
    const o = Math.max(e[i] - t[i], 0);
    return t[i] += o, o;
  }
  t.y += r("top"), t.x += r("left"), r("right"), r("bottom");
}
function Ng(t, e) {
  const r = e.maxPadding;
  function i(o) {
    const s = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return o.forEach((a) => {
      s[a] = Math.max(e[a], r[a]);
    }), s;
  }
  return i(t ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function hr(t, e, r, i) {
  const o = [];
  let s, a, n, l, d, c;
  for (s = 0, a = t.length, d = 0; s < a; ++s) {
    n = t[s], l = n.box, l.update(n.width || e.w, n.height || e.h, Ng(n.horizontal, e));
    const { same: h, other: u } = Ig(e, r, n, i);
    d |= h && o.length, c = c || u, l.fullSize || o.push(n);
  }
  return d && hr(o, e, r, i) || c;
}
function qr(t, e, r, i, o) {
  t.top = r, t.left = e, t.right = e + i, t.bottom = r + o, t.width = i, t.height = o;
}
function An(t, e, r, i) {
  const o = r.padding;
  let { x: s, y: a } = e;
  for (const n of t) {
    const l = n.box, d = i[n.stack] || {
      placed: 0,
      weight: 1
    }, c = n.stackWeight / d.weight || 1;
    if (n.horizontal) {
      const h = e.w * c, u = d.size || l.height;
      Er(d.start) && (a = d.start), l.fullSize ? qr(l, o.left, a, r.outerWidth - o.right - o.left, u) : qr(l, e.left + d.placed, a, h, u), d.start = a, d.placed += h, a = l.bottom;
    } else {
      const h = e.h * c, u = d.size || l.width;
      Er(d.start) && (s = d.start), l.fullSize ? qr(l, s, o.top, u, r.outerHeight - o.bottom - o.top) : qr(l, s, e.top + d.placed, u, h), d.start = s, d.placed += h, s = l.right;
    }
  }
  e.x = s, e.y = a;
}
var ye = {
  addBox(t, e) {
    t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function() {
      return [
        {
          z: 0,
          draw(r) {
            e.draw(r);
          }
        }
      ];
    }, t.boxes.push(e);
  },
  removeBox(t, e) {
    const r = t.boxes ? t.boxes.indexOf(e) : -1;
    r !== -1 && t.boxes.splice(r, 1);
  },
  configure(t, e, r) {
    e.fullSize = r.fullSize, e.position = r.position, e.weight = r.weight;
  },
  update(t, e, r, i) {
    if (!t)
      return;
    const o = ve(t.options.layout.padding), s = Math.max(e - o.width, 0), a = Math.max(r - o.height, 0), n = Og(t.boxes), l = n.vertical, d = n.horizontal;
    ee(t.boxes, (f) => {
      typeof f.beforeLayout == "function" && f.beforeLayout();
    });
    const c = l.reduce((f, m) => m.box.options && m.box.options.display === !1 ? f : f + 1, 0) || 1, h = Object.freeze({
      outerWidth: e,
      outerHeight: r,
      padding: o,
      availableWidth: s,
      availableHeight: a,
      vBoxMaxWidth: s / 2 / c,
      hBoxMaxHeight: a / 2
    }), u = Object.assign({}, o);
    $l(u, ve(i));
    const _ = Object.assign({
      maxPadding: u,
      w: s,
      h: a,
      x: o.left,
      y: o.top
    }, o), p = $g(l.concat(d), h);
    hr(n.fullSize, _, h, p), hr(l, _, h, p), hr(d, _, h, p) && hr(l, _, h, p), Rg(_), An(n.leftAndTop, _, h, p), _.x += _.w, _.y += _.h, An(n.rightAndBottom, _, h, p), t.chartArea = {
      left: _.left,
      top: _.top,
      right: _.left + _.w,
      bottom: _.top + _.h,
      height: _.h,
      width: _.w
    }, ee(n.chartArea, (f) => {
      const m = f.box;
      Object.assign(m, t.chartArea), m.update(_.w, _.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Ol {
  acquireContext(e, r) {
  }
  releaseContext(e) {
    return !1;
  }
  addEventListener(e, r, i) {
  }
  removeEventListener(e, r, i) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(e, r, i, o) {
    return r = Math.max(0, r || e.width), i = i || e.height, {
      width: r,
      height: Math.max(0, o ? Math.floor(r / o) : i)
    };
  }
  isAttached(e) {
    return !0;
  }
  updateConfig(e) {
  }
}
class Bg extends Ol {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const hi = "$chartjs", Hg = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Pn = (t) => t === null || t === "";
function jg(t, e) {
  const r = t.style, i = t.getAttribute("height"), o = t.getAttribute("width");
  if (t[hi] = {
    initial: {
      height: i,
      width: o,
      style: {
        display: r.display,
        height: r.height,
        width: r.width
      }
    }
  }, r.display = r.display || "block", r.boxSizing = r.boxSizing || "border-box", Pn(o)) {
    const s = dn(t, "width");
    s !== void 0 && (t.width = s);
  }
  if (Pn(i))
    if (t.style.height === "")
      t.height = t.width / (e || 2);
    else {
      const s = dn(t, "height");
      s !== void 0 && (t.height = s);
    }
  return t;
}
const Il = F_ ? {
  passive: !0
} : !1;
function Fg(t, e, r) {
  t && t.addEventListener(e, r, Il);
}
function Vg(t, e, r) {
  t && t.canvas && t.canvas.removeEventListener(e, r, Il);
}
function Gg(t, e) {
  const r = Hg[t.type] || t.type, { x: i, y: o } = gt(t, e);
  return {
    type: r,
    chart: e,
    native: t,
    x: i !== void 0 ? i : null,
    y: o !== void 0 ? o : null
  };
}
function Si(t, e) {
  for (const r of t)
    if (r === e || r.contains(e))
      return !0;
}
function Wg(t, e, r) {
  const i = t.canvas, o = new MutationObserver((s) => {
    let a = !1;
    for (const n of s)
      a = a || Si(n.addedNodes, i), a = a && !Si(n.removedNodes, i);
    a && r();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
function Ug(t, e, r) {
  const i = t.canvas, o = new MutationObserver((s) => {
    let a = !1;
    for (const n of s)
      a = a || Si(n.removedNodes, i), a = a && !Si(n.addedNodes, i);
    a && r();
  });
  return o.observe(document, {
    childList: !0,
    subtree: !0
  }), o;
}
const Dr = /* @__PURE__ */ new Map();
let Cn = 0;
function Rl() {
  const t = window.devicePixelRatio;
  t !== Cn && (Cn = t, Dr.forEach((e, r) => {
    r.currentDevicePixelRatio !== t && e();
  }));
}
function Kg(t, e) {
  Dr.size || window.addEventListener("resize", Rl), Dr.set(t, e);
}
function Yg(t) {
  Dr.delete(t), Dr.size || window.removeEventListener("resize", Rl);
}
function qg(t, e, r) {
  const i = t.canvas, o = i && us(i);
  if (!o)
    return;
  const s = ul((n, l) => {
    const d = o.clientWidth;
    r(n, l), d < o.clientWidth && r();
  }, window), a = new ResizeObserver((n) => {
    const l = n[0], d = l.contentRect.width, c = l.contentRect.height;
    d === 0 && c === 0 || s(d, c);
  });
  return a.observe(o), Kg(t, s), a;
}
function co(t, e, r) {
  r && r.disconnect(), e === "resize" && Yg(t);
}
function Xg(t, e, r) {
  const i = t.canvas, o = ul((s) => {
    t.ctx !== null && r(Gg(s, t));
  }, t);
  return Fg(i, e, o), o;
}
class Zg extends Ol {
  acquireContext(e, r) {
    const i = e && e.getContext && e.getContext("2d");
    return i && i.canvas === e ? (jg(e, r), i) : null;
  }
  releaseContext(e) {
    const r = e.canvas;
    if (!r[hi])
      return !1;
    const i = r[hi].initial;
    [
      "height",
      "width"
    ].forEach((s) => {
      const a = i[s];
      K(a) ? r.removeAttribute(s) : r.setAttribute(s, a);
    });
    const o = i.style || {};
    return Object.keys(o).forEach((s) => {
      r.style[s] = o[s];
    }), r.width = r.width, delete r[hi], !0;
  }
  addEventListener(e, r, i) {
    this.removeEventListener(e, r);
    const o = e.$proxies || (e.$proxies = {}), a = {
      attach: Wg,
      detach: Ug,
      resize: qg
    }[r] || Xg;
    o[r] = a(e, r, i);
  }
  removeEventListener(e, r) {
    const i = e.$proxies || (e.$proxies = {}), o = i[r];
    if (!o)
      return;
    ({
      attach: co,
      detach: co,
      resize: co
    }[r] || Vg)(e, r, o), i[r] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, r, i, o) {
    return j_(e, r, i, o);
  }
  isAttached(e) {
    const r = e && us(e);
    return !!(r && r.isConnected);
  }
}
function Qg(t) {
  return !hs() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? Bg : Zg;
}
class Ee {
  constructor() {
    N(this, "x");
    N(this, "y");
    N(this, "active", !1);
    N(this, "options");
    N(this, "$animations");
  }
  tooltipPosition(e) {
    const { x: r, y: i } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: r,
      y: i
    };
  }
  hasValue() {
    return Yt(this.x) && Yt(this.y);
  }
  getProps(e, r) {
    const i = this.$animations;
    if (!r || !i)
      return this;
    const o = {};
    return e.forEach((s) => {
      o[s] = i[s] && i[s].active() ? i[s]._to : this[s];
    }), o;
  }
}
N(Ee, "defaults", {}), N(Ee, "defaultRoutes");
function Jg(t, e) {
  const r = t.options.ticks, i = ep(t), o = Math.min(r.maxTicksLimit || i, i), s = r.major.enabled ? rp(e) : [], a = s.length, n = s[0], l = s[a - 1], d = [];
  if (a > o)
    return ip(e, d, s, a / o), d;
  const c = tp(s, e, o);
  if (a > 0) {
    let h, u;
    const _ = a > 1 ? Math.round((l - n) / (a - 1)) : null;
    for (Xr(e, d, c, K(_) ? 0 : n - _, n), h = 0, u = a - 1; h < u; h++)
      Xr(e, d, c, s[h], s[h + 1]);
    return Xr(e, d, c, l, K(_) ? e.length : l + _), d;
  }
  return Xr(e, d, c), d;
}
function ep(t) {
  const e = t.options.offset, r = t._tickSize(), i = t._length / r + (e ? 0 : 1), o = t._maxLength / r;
  return Math.floor(Math.min(i, o));
}
function tp(t, e, r) {
  const i = op(t), o = e.length / r;
  if (!i)
    return Math.max(o, 1);
  const s = Gu(i);
  for (let a = 0, n = s.length - 1; a < n; a++) {
    const l = s[a];
    if (l > o)
      return l;
  }
  return Math.max(o, 1);
}
function rp(t) {
  const e = [];
  let r, i;
  for (r = 0, i = t.length; r < i; r++)
    t[r].major && e.push(r);
  return e;
}
function ip(t, e, r, i) {
  let o = 0, s = r[0], a;
  for (i = Math.ceil(i), a = 0; a < t.length; a++)
    a === s && (e.push(t[a]), o++, s = r[o * i]);
}
function Xr(t, e, r, i, o) {
  const s = W(i, 0), a = Math.min(W(o, t.length), t.length);
  let n = 0, l, d, c;
  for (r = Math.ceil(r), o && (l = o - i, r = l / Math.floor(l / r)), c = s; c < 0; )
    n++, c = Math.round(s + n * r);
  for (d = Math.max(s, 0); d < a; d++)
    d === c && (e.push(t[d]), n++, c = Math.round(s + n * r));
}
function op(t) {
  const e = t.length;
  let r, i;
  if (e < 2)
    return !1;
  for (i = t[0], r = 1; r < e; ++r)
    if (t[r] - t[r - 1] !== i)
      return !1;
  return i;
}
const sp = (t) => t === "left" ? "right" : t === "right" ? "left" : t, Mn = (t, e, r) => e === "top" || e === "left" ? t[e] + r : t[e] - r, zn = (t, e) => Math.min(e || t, t);
function En(t, e) {
  const r = [], i = t.length / e, o = t.length;
  let s = 0;
  for (; s < o; s += i)
    r.push(t[Math.floor(s)]);
  return r;
}
function np(t, e, r) {
  const i = t.ticks.length, o = Math.min(e, i - 1), s = t._startPixel, a = t._endPixel, n = 1e-6;
  let l = t.getPixelForTick(o), d;
  if (!(r && (i === 1 ? d = Math.max(l - s, a - l) : e === 0 ? d = (t.getPixelForTick(1) - l) / 2 : d = (l - t.getPixelForTick(o - 1)) / 2, l += o < e ? d : -d, l < s - n || l > a + n)))
    return l;
}
function ap(t, e) {
  ee(t, (r) => {
    const i = r.gc, o = i.length / 2;
    let s;
    if (o > e) {
      for (s = 0; s < o; ++s)
        delete r.data[i[s]];
      i.splice(0, o);
    }
  });
}
function or(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function Ln(t, e) {
  if (!t.display)
    return 0;
  const r = he(t.font, e), i = ve(t.padding);
  return (se(t.text) ? t.text.length : 1) * r.lineHeight + i.height;
}
function lp(t, e) {
  return at(t, {
    scale: e,
    type: "scale"
  });
}
function dp(t, e, r) {
  return at(t, {
    tick: r,
    index: e,
    type: "tick"
  });
}
function cp(t, e, r) {
  let i = ss(t);
  return (r && e !== "right" || !r && e === "right") && (i = sp(i)), i;
}
function hp(t, e, r, i) {
  const { top: o, left: s, bottom: a, right: n, chart: l } = t, { chartArea: d, scales: c } = l;
  let h = 0, u, _, p;
  const f = a - o, m = n - s;
  if (t.isHorizontal()) {
    if (_ = fe(i, s, n), Y(r)) {
      const y = Object.keys(r)[0], g = r[y];
      p = c[y].getPixelForValue(g) + f - e;
    } else r === "center" ? p = (d.bottom + d.top) / 2 + f - e : p = Mn(t, r, e);
    u = n - s;
  } else {
    if (Y(r)) {
      const y = Object.keys(r)[0], g = r[y];
      _ = c[y].getPixelForValue(g) - m + e;
    } else r === "center" ? _ = (d.left + d.right) / 2 - m + e : _ = Mn(t, r, e);
    p = fe(i, a, o), h = r === "left" ? -le : le;
  }
  return {
    titleX: _,
    titleY: p,
    maxWidth: u,
    rotation: h
  };
}
class Lt extends Ee {
  constructor(e) {
    super(), this.id = e.id, this.type = e.type, this.options = void 0, this.ctx = e.ctx, this.chart = e.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(e) {
    this.options = e.setContext(this.getContext()), this.axis = e.axis, this._userMin = this.parse(e.min), this._userMax = this.parse(e.max), this._suggestedMin = this.parse(e.suggestedMin), this._suggestedMax = this.parse(e.suggestedMax);
  }
  parse(e, r) {
    return e;
  }
  getUserBounds() {
    let { _userMin: e, _userMax: r, _suggestedMin: i, _suggestedMax: o } = this;
    return e = Pe(e, Number.POSITIVE_INFINITY), r = Pe(r, Number.NEGATIVE_INFINITY), i = Pe(i, Number.POSITIVE_INFINITY), o = Pe(o, Number.NEGATIVE_INFINITY), {
      min: Pe(e, i),
      max: Pe(r, o),
      minDefined: ae(e),
      maxDefined: ae(r)
    };
  }
  getMinMax(e) {
    let { min: r, max: i, minDefined: o, maxDefined: s } = this.getUserBounds(), a;
    if (o && s)
      return {
        min: r,
        max: i
      };
    const n = this.getMatchingVisibleMetas();
    for (let l = 0, d = n.length; l < d; ++l)
      a = n[l].controller.getMinMax(this, e), o || (r = Math.min(r, a.min)), s || (i = Math.max(i, a.max));
    return r = s && r > i ? i : r, i = o && r > i ? r : i, {
      min: Pe(r, Pe(i, r)),
      max: Pe(i, Pe(r, i))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const e = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || [];
  }
  getLabelItems(e = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(e));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    te(this.options.beforeUpdate, [
      this
    ]);
  }
  update(e, r, i) {
    const { beginAtZero: o, grace: s, ticks: a } = this.options, n = a.sampleSize;
    this.beforeUpdate(), this.maxWidth = e, this.maxHeight = r, this._margins = i = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = v_(this, s, o), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = n < this.ticks.length;
    this._convertTicksToLabels(l ? En(this.ticks, n) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = Jg(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let e = this.options.reverse, r, i;
    this.isHorizontal() ? (r = this.left, i = this.right) : (r = this.top, i = this.bottom, e = !e), this._startPixel = r, this._endPixel = i, this._reversePixels = e, this._length = i - r, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    te(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    te(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    te(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(e) {
    this.chart.notifyPlugins(e, this.getContext()), te(this.options[e], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    te(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(e) {
    const r = this.options.ticks;
    let i, o, s;
    for (i = 0, o = e.length; i < o; i++)
      s = e[i], s.label = te(r.callback, [
        s.value,
        i,
        e
      ], this);
  }
  afterTickToLabelConversion() {
    te(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    te(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const e = this.options, r = e.ticks, i = zn(this.ticks.length, e.ticks.maxTicksLimit), o = r.minRotation || 0, s = r.maxRotation;
    let a = o, n, l, d;
    if (!this._isVisible() || !r.display || o >= s || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = o;
      return;
    }
    const c = this._getLabelSizes(), h = c.widest.width, u = c.highest.height, _ = _e(this.chart.width - h, 0, this.maxWidth);
    n = e.offset ? this.maxWidth / i : _ / (i - 1), h + 6 > n && (n = _ / (i - (e.offset ? 0.5 : 1)), l = this.maxHeight - or(e.grid) - r.padding - Ln(e.title, this.chart.options.font), d = Math.sqrt(h * h + u * u), a = is(Math.min(Math.asin(_e((c.highest.height + 6) / n, -1, 1)), Math.asin(_e(l / d, -1, 1)) - Math.asin(_e(u / d, -1, 1)))), a = Math.max(o, Math.min(s, a))), this.labelRotation = a;
  }
  afterCalculateLabelRotation() {
    te(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    te(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const e = {
      width: 0,
      height: 0
    }, { chart: r, options: { ticks: i, title: o, grid: s } } = this, a = this._isVisible(), n = this.isHorizontal();
    if (a) {
      const l = Ln(o, r.options.font);
      if (n ? (e.width = this.maxWidth, e.height = or(s) + l) : (e.height = this.maxHeight, e.width = or(s) + l), i.display && this.ticks.length) {
        const { first: d, last: c, widest: h, highest: u } = this._getLabelSizes(), _ = i.padding * 2, p = Me(this.labelRotation), f = Math.cos(p), m = Math.sin(p);
        if (n) {
          const y = i.mirror ? 0 : m * h.width + f * u.height;
          e.height = Math.min(this.maxHeight, e.height + y + _);
        } else {
          const y = i.mirror ? 0 : f * h.width + m * u.height;
          e.width = Math.min(this.maxWidth, e.width + y + _);
        }
        this._calculatePadding(d, c, m, f);
      }
    }
    this._handleMargins(), n ? (this.width = this._length = r.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = r.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(e, r, i, o) {
    const { ticks: { align: s, padding: a }, position: n } = this.options, l = this.labelRotation !== 0, d = n !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const c = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, _ = 0;
      l ? d ? (u = o * e.width, _ = i * r.height) : (u = i * e.height, _ = o * r.width) : s === "start" ? _ = r.width : s === "end" ? u = e.width : s !== "inner" && (u = e.width / 2, _ = r.width / 2), this.paddingLeft = Math.max((u - c + a) * this.width / (this.width - c), 0), this.paddingRight = Math.max((_ - h + a) * this.width / (this.width - h), 0);
    } else {
      let c = r.height / 2, h = e.height / 2;
      s === "start" ? (c = 0, h = e.height) : s === "end" && (c = r.height, h = 0), this.paddingTop = c + a, this.paddingBottom = h + a;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    te(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: e, position: r } = this.options;
    return r === "top" || r === "bottom" || e === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(e) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(e);
    let r, i;
    for (r = 0, i = e.length; r < i; r++)
      K(e[r].label) && (e.splice(r, 1), i--, r--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let e = this._labelSizes;
    if (!e) {
      const r = this.options.ticks.sampleSize;
      let i = this.ticks;
      r < i.length && (i = En(i, r)), this._labelSizes = e = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, r, i) {
    const { ctx: o, _longestTextCache: s } = this, a = [], n = [], l = Math.floor(r / zn(r, i));
    let d = 0, c = 0, h, u, _, p, f, m, y, g, v, k, w;
    for (h = 0; h < r; h += l) {
      if (p = e[h].label, f = this._resolveTickFontOptions(h), o.font = m = f.string, y = s[m] = s[m] || {
        data: {},
        gc: []
      }, g = f.lineHeight, v = k = 0, !K(p) && !se(p))
        v = wi(o, y.data, y.gc, v, p), k = g;
      else if (se(p))
        for (u = 0, _ = p.length; u < _; ++u)
          w = p[u], !K(w) && !se(w) && (v = wi(o, y.data, y.gc, v, w), k += g);
      a.push(v), n.push(k), d = Math.max(v, d), c = Math.max(k, c);
    }
    ap(s, r);
    const S = a.indexOf(d), P = n.indexOf(c), x = (E) => ({
      width: a[E] || 0,
      height: n[E] || 0
    });
    return {
      first: x(0),
      last: x(r - 1),
      widest: x(S),
      highest: x(P),
      widths: a,
      heights: n
    };
  }
  getLabelForValue(e) {
    return e;
  }
  getPixelForValue(e, r) {
    return NaN;
  }
  getValueForPixel(e) {
  }
  getPixelForTick(e) {
    const r = this.ticks;
    return e < 0 || e > r.length - 1 ? null : this.getPixelForValue(r[e].value);
  }
  getPixelForDecimal(e) {
    this._reversePixels && (e = 1 - e);
    const r = this._startPixel + e * this._length;
    return Yu(this._alignToPixels ? ht(this.chart, r, 0) : r);
  }
  getDecimalForPixel(e) {
    const r = (e - this._startPixel) / this._length;
    return this._reversePixels ? 1 - r : r;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: e, max: r } = this;
    return e < 0 && r < 0 ? r : e > 0 && r > 0 ? e : 0;
  }
  getContext(e) {
    const r = this.ticks || [];
    if (e >= 0 && e < r.length) {
      const i = r[e];
      return i.$context || (i.$context = dp(this.getContext(), e, i));
    }
    return this.$context || (this.$context = lp(this.chart.getContext(), this));
  }
  _tickSize() {
    const e = this.options.ticks, r = Me(this.labelRotation), i = Math.abs(Math.cos(r)), o = Math.abs(Math.sin(r)), s = this._getLabelSizes(), a = e.autoSkipPadding || 0, n = s ? s.widest.width + a : 0, l = s ? s.highest.height + a : 0;
    return this.isHorizontal() ? l * i > n * o ? n / i : l / o : l * o < n * i ? l / i : n / o;
  }
  _isVisible() {
    const e = this.options.display;
    return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(e) {
    const r = this.axis, i = this.chart, o = this.options, { grid: s, position: a, border: n } = o, l = s.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), u = or(s), _ = [], p = n.setContext(this.getContext()), f = p.display ? p.width : 0, m = f / 2, y = function(b) {
      return ht(i, b, f);
    };
    let g, v, k, w, S, P, x, E, L, z, C, $;
    if (a === "top")
      g = y(this.bottom), P = this.bottom - u, E = g - m, z = y(e.top) + m, $ = e.bottom;
    else if (a === "bottom")
      g = y(this.top), z = e.top, $ = y(e.bottom) - m, P = g + m, E = this.top + u;
    else if (a === "left")
      g = y(this.right), S = this.right - u, x = g - m, L = y(e.left) + m, C = e.right;
    else if (a === "right")
      g = y(this.left), L = e.left, C = y(e.right) - m, S = g + m, x = this.left + u;
    else if (r === "x") {
      if (a === "center")
        g = y((e.top + e.bottom) / 2 + 0.5);
      else if (Y(a)) {
        const b = Object.keys(a)[0], A = a[b];
        g = y(this.chart.scales[b].getPixelForValue(A));
      }
      z = e.top, $ = e.bottom, P = g + m, E = P + u;
    } else if (r === "y") {
      if (a === "center")
        g = y((e.left + e.right) / 2);
      else if (Y(a)) {
        const b = Object.keys(a)[0], A = a[b];
        g = y(this.chart.scales[b].getPixelForValue(A));
      }
      S = g - m, x = S - u, L = e.left, C = e.right;
    }
    const M = W(o.ticks.maxTicksLimit, h), R = Math.max(1, Math.ceil(h / M));
    for (v = 0; v < h; v += R) {
      const b = this.getContext(v), A = s.setContext(b), D = n.setContext(b), T = A.lineWidth, B = A.color, I = D.dash || [], G = D.dashOffset, O = A.tickWidth, H = A.tickColor, F = A.tickBorderDash || [], U = A.tickBorderDashOffset;
      k = np(this, v, l), k !== void 0 && (w = ht(i, k, T), d ? S = x = L = C = w : P = E = z = $ = w, _.push({
        tx1: S,
        ty1: P,
        tx2: x,
        ty2: E,
        x1: L,
        y1: z,
        x2: C,
        y2: $,
        width: T,
        color: B,
        borderDash: I,
        borderDashOffset: G,
        tickWidth: O,
        tickColor: H,
        tickBorderDash: F,
        tickBorderDashOffset: U
      }));
    }
    return this._ticksLength = h, this._borderValue = g, _;
  }
  _computeLabelItems(e) {
    const r = this.axis, i = this.options, { position: o, ticks: s } = i, a = this.isHorizontal(), n = this.ticks, { align: l, crossAlign: d, padding: c, mirror: h } = s, u = or(i.grid), _ = u + c, p = h ? -c : _, f = -Me(this.labelRotation), m = [];
    let y, g, v, k, w, S, P, x, E, L, z, C, $ = "middle";
    if (o === "top")
      S = this.bottom - p, P = this._getXAxisLabelAlignment();
    else if (o === "bottom")
      S = this.top + p, P = this._getXAxisLabelAlignment();
    else if (o === "left") {
      const R = this._getYAxisLabelAlignment(u);
      P = R.textAlign, w = R.x;
    } else if (o === "right") {
      const R = this._getYAxisLabelAlignment(u);
      P = R.textAlign, w = R.x;
    } else if (r === "x") {
      if (o === "center")
        S = (e.top + e.bottom) / 2 + _;
      else if (Y(o)) {
        const R = Object.keys(o)[0], b = o[R];
        S = this.chart.scales[R].getPixelForValue(b) + _;
      }
      P = this._getXAxisLabelAlignment();
    } else if (r === "y") {
      if (o === "center")
        w = (e.left + e.right) / 2 - _;
      else if (Y(o)) {
        const R = Object.keys(o)[0], b = o[R];
        w = this.chart.scales[R].getPixelForValue(b);
      }
      P = this._getYAxisLabelAlignment(u).textAlign;
    }
    r === "y" && (l === "start" ? $ = "top" : l === "end" && ($ = "bottom"));
    const M = this._getLabelSizes();
    for (y = 0, g = n.length; y < g; ++y) {
      v = n[y], k = v.label;
      const R = s.setContext(this.getContext(y));
      x = this.getPixelForTick(y) + s.labelOffset, E = this._resolveTickFontOptions(y), L = E.lineHeight, z = se(k) ? k.length : 1;
      const b = z / 2, A = R.color, D = R.textStrokeColor, T = R.textStrokeWidth;
      let B = P;
      a ? (w = x, P === "inner" && (y === g - 1 ? B = this.options.reverse ? "left" : "right" : y === 0 ? B = this.options.reverse ? "right" : "left" : B = "center"), o === "top" ? d === "near" || f !== 0 ? C = -z * L + L / 2 : d === "center" ? C = -M.highest.height / 2 - b * L + L : C = -M.highest.height + L / 2 : d === "near" || f !== 0 ? C = L / 2 : d === "center" ? C = M.highest.height / 2 - b * L : C = M.highest.height - z * L, h && (C *= -1), f !== 0 && !R.showLabelBackdrop && (w += L / 2 * Math.sin(f))) : (S = x, C = (1 - z) * L / 2);
      let I;
      if (R.showLabelBackdrop) {
        const G = ve(R.backdropPadding), O = M.heights[y], H = M.widths[y];
        let F = C - G.top, U = 0 - G.left;
        switch ($) {
          case "middle":
            F -= O / 2;
            break;
          case "bottom":
            F -= O;
            break;
        }
        switch (P) {
          case "center":
            U -= H / 2;
            break;
          case "right":
            U -= H;
            break;
          case "inner":
            y === g - 1 ? U -= H : y > 0 && (U -= H / 2);
            break;
        }
        I = {
          left: U,
          top: F,
          width: H + G.width,
          height: O + G.height,
          color: R.backdropColor
        };
      }
      m.push({
        label: k,
        font: E,
        textOffset: C,
        options: {
          rotation: f,
          color: A,
          strokeColor: D,
          strokeWidth: T,
          textAlign: B,
          textBaseline: $,
          translation: [
            w,
            S
          ],
          backdrop: I
        }
      });
    }
    return m;
  }
  _getXAxisLabelAlignment() {
    const { position: e, ticks: r } = this.options;
    if (-Me(this.labelRotation))
      return e === "top" ? "left" : "right";
    let o = "center";
    return r.align === "start" ? o = "left" : r.align === "end" ? o = "right" : r.align === "inner" && (o = "inner"), o;
  }
  _getYAxisLabelAlignment(e) {
    const { position: r, ticks: { crossAlign: i, mirror: o, padding: s } } = this.options, a = this._getLabelSizes(), n = e + s, l = a.widest.width;
    let d, c;
    return r === "left" ? o ? (c = this.right + s, i === "near" ? d = "left" : i === "center" ? (d = "center", c += l / 2) : (d = "right", c += l)) : (c = this.right - n, i === "near" ? d = "right" : i === "center" ? (d = "center", c -= l / 2) : (d = "left", c = this.left)) : r === "right" ? o ? (c = this.left + s, i === "near" ? d = "right" : i === "center" ? (d = "center", c -= l / 2) : (d = "left", c -= l)) : (c = this.left + n, i === "near" ? d = "left" : i === "center" ? (d = "center", c += l / 2) : (d = "right", c = this.right)) : d = "right", {
      textAlign: d,
      x: c
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const e = this.chart, r = this.options.position;
    if (r === "left" || r === "right")
      return {
        top: 0,
        left: this.left,
        bottom: e.height,
        right: this.right
      };
    if (r === "top" || r === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: e.width
      };
  }
  drawBackground() {
    const { ctx: e, options: { backgroundColor: r }, left: i, top: o, width: s, height: a } = this;
    r && (e.save(), e.fillStyle = r, e.fillRect(i, o, s, a), e.restore());
  }
  getLineWidthForValue(e) {
    const r = this.options.grid;
    if (!this._isVisible() || !r.display)
      return 0;
    const o = this.ticks.findIndex((s) => s.value === e);
    return o >= 0 ? r.setContext(this.getContext(o)).lineWidth : 0;
  }
  drawGrid(e) {
    const r = this.options.grid, i = this.ctx, o = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(e));
    let s, a;
    const n = (l, d, c) => {
      !c.width || !c.color || (i.save(), i.lineWidth = c.width, i.strokeStyle = c.color, i.setLineDash(c.borderDash || []), i.lineDashOffset = c.borderDashOffset, i.beginPath(), i.moveTo(l.x, l.y), i.lineTo(d.x, d.y), i.stroke(), i.restore());
    };
    if (r.display)
      for (s = 0, a = o.length; s < a; ++s) {
        const l = o[s];
        r.drawOnChartArea && n({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), r.drawTicks && n({
          x: l.tx1,
          y: l.ty1
        }, {
          x: l.tx2,
          y: l.ty2
        }, {
          color: l.tickColor,
          width: l.tickWidth,
          borderDash: l.tickBorderDash,
          borderDashOffset: l.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: e, ctx: r, options: { border: i, grid: o } } = this, s = i.setContext(this.getContext()), a = i.display ? s.width : 0;
    if (!a)
      return;
    const n = o.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, c, h, u;
    this.isHorizontal() ? (d = ht(e, this.left, a) - a / 2, c = ht(e, this.right, n) + n / 2, h = u = l) : (h = ht(e, this.top, a) - a / 2, u = ht(e, this.bottom, n) + n / 2, d = c = l), r.save(), r.lineWidth = s.width, r.strokeStyle = s.color, r.beginPath(), r.moveTo(d, h), r.lineTo(c, u), r.stroke(), r.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, o = this._computeLabelArea();
    o && $i(i, o);
    const s = this.getLabelItems(e);
    for (const a of s) {
      const n = a.options, l = a.font, d = a.label, c = a.textOffset;
      Mt(i, d, 0, c, l, n);
    }
    o && Oi(i);
  }
  drawTitle() {
    const { ctx: e, options: { position: r, title: i, reverse: o } } = this;
    if (!i.display)
      return;
    const s = he(i.font), a = ve(i.padding), n = i.align;
    let l = s.lineHeight / 2;
    r === "bottom" || r === "center" || Y(r) ? (l += a.bottom, se(i.text) && (l += s.lineHeight * (i.text.length - 1))) : l += a.top;
    const { titleX: d, titleY: c, maxWidth: h, rotation: u } = hp(this, l, r, n);
    Mt(e, i.text, 0, 0, s, {
      color: i.color,
      maxWidth: h,
      rotation: u,
      textAlign: cp(n, r, o),
      textBaseline: "middle",
      translation: [
        d,
        c
      ]
    });
  }
  draw(e) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(e), this.drawBorder(), this.drawTitle(), this.drawLabels(e));
  }
  _layers() {
    const e = this.options, r = e.ticks && e.ticks.z || 0, i = W(e.grid && e.grid.z, -1), o = W(e.border && e.border.z, 0);
    return !this._isVisible() || this.draw !== Lt.prototype.draw ? [
      {
        z: r,
        draw: (s) => {
          this.draw(s);
        }
      }
    ] : [
      {
        z: i,
        draw: (s) => {
          this.drawBackground(), this.drawGrid(s), this.drawTitle();
        }
      },
      {
        z: o,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: r,
        draw: (s) => {
          this.drawLabels(s);
        }
      }
    ];
  }
  getMatchingVisibleMetas(e) {
    const r = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", o = [];
    let s, a;
    for (s = 0, a = r.length; s < a; ++s) {
      const n = r[s];
      n[i] === this.id && (!e || n.type === e) && o.push(n);
    }
    return o;
  }
  _resolveTickFontOptions(e) {
    const r = this.options.ticks.setContext(this.getContext(e));
    return he(r.font);
  }
  _maxDigits() {
    const e = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / e;
  }
}
class Zr {
  constructor(e, r, i) {
    this.type = e, this.scope = r, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const r = Object.getPrototypeOf(e);
    let i;
    gp(r) && (i = this.register(r));
    const o = this.items, s = e.id, a = this.scope + "." + s;
    if (!s)
      throw new Error("class does not have id: " + e);
    return s in o || (o[s] = e, up(e, a, i), this.override && ne.override(e.id, e.overrides)), a;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const r = this.items, i = e.id, o = this.scope;
    i in r && delete r[i], o && i in ne[o] && (delete ne[o][i], this.override && delete Ct[i]);
  }
}
function up(t, e, r) {
  const i = zr(/* @__PURE__ */ Object.create(null), [
    r ? ne.get(r) : {},
    ne.get(e),
    t.defaults
  ]);
  ne.set(e, i), t.defaultRoutes && _p(e, t.defaultRoutes), t.descriptors && ne.describe(e, t.descriptors);
}
function _p(t, e) {
  Object.keys(e).forEach((r) => {
    const i = r.split("."), o = i.pop(), s = [
      t
    ].concat(i).join("."), a = e[r].split("."), n = a.pop(), l = a.join(".");
    ne.route(s, o, l, n);
  });
}
function gp(t) {
  return "id" in t && "defaults" in t;
}
class pp {
  constructor() {
    this.controllers = new Zr(ze, "datasets", !0), this.elements = new Zr(Ee, "elements"), this.plugins = new Zr(Object, "plugins"), this.scales = new Zr(Lt, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...e) {
    this._each("register", e);
  }
  remove(...e) {
    this._each("unregister", e);
  }
  addControllers(...e) {
    this._each("register", e, this.controllers);
  }
  addElements(...e) {
    this._each("register", e, this.elements);
  }
  addPlugins(...e) {
    this._each("register", e, this.plugins);
  }
  addScales(...e) {
    this._each("register", e, this.scales);
  }
  getController(e) {
    return this._get(e, this.controllers, "controller");
  }
  getElement(e) {
    return this._get(e, this.elements, "element");
  }
  getPlugin(e) {
    return this._get(e, this.plugins, "plugin");
  }
  getScale(e) {
    return this._get(e, this.scales, "scale");
  }
  removeControllers(...e) {
    this._each("unregister", e, this.controllers);
  }
  removeElements(...e) {
    this._each("unregister", e, this.elements);
  }
  removePlugins(...e) {
    this._each("unregister", e, this.plugins);
  }
  removeScales(...e) {
    this._each("unregister", e, this.scales);
  }
  _each(e, r, i) {
    [
      ...r
    ].forEach((o) => {
      const s = i || this._getRegistryForType(o);
      i || s.isForType(o) || s === this.plugins && o.id ? this._exec(e, s, o) : ee(o, (a) => {
        const n = i || this._getRegistryForType(a);
        this._exec(e, n, a);
      });
    });
  }
  _exec(e, r, i) {
    const o = rs(e);
    te(i["before" + o], [], i), r[e](i), te(i["after" + o], [], i);
  }
  _getRegistryForType(e) {
    for (let r = 0; r < this._typedRegistries.length; r++) {
      const i = this._typedRegistries[r];
      if (i.isForType(e))
        return i;
    }
    return this.plugins;
  }
  _get(e, r, i) {
    const o = r.get(e);
    if (o === void 0)
      throw new Error('"' + e + '" is not a registered ' + i + ".");
    return o;
  }
}
var Te = /* @__PURE__ */ new pp();
class fp {
  constructor() {
    this._init = [];
  }
  notify(e, r, i, o) {
    r === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install"));
    const s = o ? this._descriptors(e).filter(o) : this._descriptors(e), a = this._notify(s, e, r, i);
    return r === "afterDestroy" && (this._notify(s, e, "stop"), this._notify(this._init, e, "uninstall")), a;
  }
  _notify(e, r, i, o) {
    o = o || {};
    for (const s of e) {
      const a = s.plugin, n = a[i], l = [
        r,
        o,
        s.options
      ];
      if (te(n, l, a) === !1 && o.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    K(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(e) {
    if (this._cache)
      return this._cache;
    const r = this._cache = this._createDescriptors(e);
    return this._notifyStateChanges(e), r;
  }
  _createDescriptors(e, r) {
    const i = e && e.config, o = W(i.options && i.options.plugins, {}), s = mp(i);
    return o === !1 && !r ? [] : vp(e, s, o, r);
  }
  _notifyStateChanges(e) {
    const r = this._oldCache || [], i = this._cache, o = (s, a) => s.filter((n) => !a.some((l) => n.plugin.id === l.plugin.id));
    this._notify(o(r, i), e, "stop"), this._notify(o(i, r), e, "start");
  }
}
function mp(t) {
  const e = {}, r = [], i = Object.keys(Te.plugins.items);
  for (let s = 0; s < i.length; s++)
    r.push(Te.getPlugin(i[s]));
  const o = t.plugins || [];
  for (let s = 0; s < o.length; s++) {
    const a = o[s];
    r.indexOf(a) === -1 && (r.push(a), e[a.id] = !0);
  }
  return {
    plugins: r,
    localIds: e
  };
}
function yp(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function vp(t, { plugins: e, localIds: r }, i, o) {
  const s = [], a = t.getContext();
  for (const n of e) {
    const l = n.id, d = yp(i[l], o);
    d !== null && s.push({
      plugin: n,
      options: bp(t.config, {
        plugin: n,
        local: r[l]
      }, d, a)
    });
  }
  return s;
}
function bp(t, { plugin: e, local: r }, i, o) {
  const s = t.pluginScopeKeys(e), a = t.getOptionScopes(i, s);
  return r && e.defaults && a.push(e.defaults), t.createResolver(a, o, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function No(t, e) {
  const r = ne.datasets[t] || {};
  return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || r.indexAxis || "x";
}
function xp(t, e) {
  let r = t;
  return t === "_index_" ? r = e : t === "_value_" && (r = e === "x" ? "y" : "x"), r;
}
function wp(t, e) {
  return t === e ? "_index_" : "_value_";
}
function Tn(t) {
  if (t === "x" || t === "y" || t === "r")
    return t;
}
function kp(t) {
  if (t === "top" || t === "bottom")
    return "x";
  if (t === "left" || t === "right")
    return "y";
}
function Bo(t, ...e) {
  if (Tn(t))
    return t;
  for (const r of e) {
    const i = r.axis || kp(r.position) || t.length > 1 && Tn(t[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
}
function Dn(t, e, r) {
  if (r[e + "AxisID"] === t)
    return {
      axis: e
    };
}
function Sp(t, e) {
  if (e.data && e.data.datasets) {
    const r = e.data.datasets.filter((i) => i.xAxisID === t || i.yAxisID === t);
    if (r.length)
      return Dn(t, "x", r[0]) || Dn(t, "y", r[0]);
  }
  return {};
}
function Ap(t, e) {
  const r = Ct[t.type] || {
    scales: {}
  }, i = e.scales || {}, o = No(t.type, e), s = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((a) => {
    const n = i[a];
    if (!Y(n))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (n._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const l = Bo(a, n, Sp(a, t), ne.scales[n.type]), d = wp(l, o), c = r.scales || {};
    s[a] = mr(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      n,
      c[l],
      c[d]
    ]);
  }), t.data.datasets.forEach((a) => {
    const n = a.type || t.type, l = a.indexAxis || No(n, e), c = (Ct[n] || {}).scales || {};
    Object.keys(c).forEach((h) => {
      const u = xp(h, l), _ = a[u + "AxisID"] || u;
      s[_] = s[_] || /* @__PURE__ */ Object.create(null), mr(s[_], [
        {
          axis: u
        },
        i[_],
        c[h]
      ]);
    });
  }), Object.keys(s).forEach((a) => {
    const n = s[a];
    mr(n, [
      ne.scales[n.type],
      ne.scale
    ]);
  }), s;
}
function Nl(t) {
  const e = t.options || (t.options = {});
  e.plugins = W(e.plugins, {}), e.scales = Ap(t, e);
}
function Bl(t) {
  return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
}
function Pp(t) {
  return t = t || {}, t.data = Bl(t.data), Nl(t), t;
}
const $n = /* @__PURE__ */ new Map(), Hl = /* @__PURE__ */ new Set();
function Qr(t, e) {
  let r = $n.get(t);
  return r || (r = e(), $n.set(t, r), Hl.add(r)), r;
}
const sr = (t, e, r) => {
  const i = et(e, r);
  i !== void 0 && t.add(i);
};
class Cp {
  constructor(e) {
    this._config = Pp(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(e) {
    this._config.type = e;
  }
  get data() {
    return this._config.data;
  }
  set data(e) {
    this._config.data = Bl(e);
  }
  get options() {
    return this._config.options;
  }
  set options(e) {
    this._config.options = e;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const e = this._config;
    this.clearCache(), Nl(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return Qr(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, r) {
    return Qr(`${e}.transition.${r}`, () => [
      [
        `datasets.${e}.transitions.${r}`,
        `transitions.${r}`
      ],
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(e, r) {
    return Qr(`${e}-${r}`, () => [
      [
        `datasets.${e}.elements.${r}`,
        `datasets.${e}`,
        `elements.${r}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(e) {
    const r = e.id, i = this.type;
    return Qr(`${i}-plugin-${r}`, () => [
      [
        `plugins.${r}`,
        ...e.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(e, r) {
    const i = this._scopeCache;
    let o = i.get(e);
    return (!o || r) && (o = /* @__PURE__ */ new Map(), i.set(e, o)), o;
  }
  getOptionScopes(e, r, i) {
    const { options: o, type: s } = this, a = this._cachedScopes(e, i), n = a.get(r);
    if (n)
      return n;
    const l = /* @__PURE__ */ new Set();
    r.forEach((c) => {
      e && (l.add(e), c.forEach((h) => sr(l, e, h))), c.forEach((h) => sr(l, o, h)), c.forEach((h) => sr(l, Ct[s] || {}, h)), c.forEach((h) => sr(l, ne, h)), c.forEach((h) => sr(l, Oo, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), Hl.has(r) && a.set(r, d), d;
  }
  chartOptionScopes() {
    const { options: e, type: r } = this;
    return [
      e,
      Ct[r] || {},
      ne.datasets[r] || {},
      {
        type: r
      },
      ne,
      Oo
    ];
  }
  resolveNamedOptions(e, r, i, o = [
    ""
  ]) {
    const s = {
      $shared: !0
    }, { resolver: a, subPrefixes: n } = On(this._resolverCache, e, o);
    let l = a;
    if (zp(a, r)) {
      s.$shared = !1, i = tt(i) ? i() : i;
      const d = this.createResolver(e, i, n);
      l = qt(a, i, d);
    }
    for (const d of r)
      s[d] = l[d];
    return s;
  }
  createResolver(e, r, i = [
    ""
  ], o) {
    const { resolver: s } = On(this._resolverCache, e, i);
    return Y(r) ? qt(s, r, void 0, o) : s;
  }
}
function On(t, e, r) {
  let i = t.get(e);
  i || (i = /* @__PURE__ */ new Map(), t.set(e, i));
  const o = r.join();
  let s = i.get(o);
  return s || (s = {
    resolver: ls(e, r),
    subPrefixes: r.filter((n) => !n.toLowerCase().includes("hover"))
  }, i.set(o, s)), s;
}
const Mp = (t) => Y(t) && Object.getOwnPropertyNames(t).some((e) => tt(t[e]));
function zp(t, e) {
  const { isScriptable: r, isIndexable: i } = yl(t);
  for (const o of e) {
    const s = r(o), a = i(o), n = (a || s) && t[o];
    if (s && (tt(n) || Mp(n)) || a && se(n))
      return !0;
  }
  return !1;
}
var Ep = "4.5.0";
const Lp = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function In(t, e) {
  return t === "top" || t === "bottom" || Lp.indexOf(t) === -1 && e === "x";
}
function Rn(t, e) {
  return function(r, i) {
    return r[t] === i[t] ? r[e] - i[e] : r[t] - i[t];
  };
}
function Nn(t) {
  const e = t.chart, r = e.options.animation;
  e.notifyPlugins("afterRender"), te(r && r.onComplete, [
    t
  ], e);
}
function Tp(t) {
  const e = t.chart, r = e.options.animation;
  te(r && r.onProgress, [
    t
  ], e);
}
function jl(t) {
  return hs() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
}
const ui = {}, Bn = (t) => {
  const e = jl(t);
  return Object.values(ui).filter((r) => r.canvas === e).pop();
};
function Dp(t, e, r) {
  const i = Object.keys(t);
  for (const o of i) {
    const s = +o;
    if (s >= e) {
      const a = t[o];
      delete t[o], (r > 0 || s > e) && (t[s + r] = a);
    }
  }
}
function $p(t, e, r, i) {
  return !r || t.type === "mouseout" ? null : i ? e : t;
}
class De {
  static register(...e) {
    Te.add(...e), Hn();
  }
  static unregister(...e) {
    Te.remove(...e), Hn();
  }
  constructor(e, r) {
    const i = this.config = new Cp(r), o = jl(e), s = Bn(o);
    if (s)
      throw new Error("Canvas is already in use. Chart with ID '" + s.id + "' must be destroyed before the canvas with ID '" + s.canvas.id + "' can be reused.");
    const a = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || Qg(o))(), this.platform.updateConfig(i);
    const n = this.platform.acquireContext(o, a.aspectRatio), l = n && n.canvas, d = l && l.height, c = l && l.width;
    if (this.id = Ou(), this.ctx = n, this.canvas = l, this.width = c, this.height = d, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new fp(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Qu((h) => this.update(h), a.resizeDelay || 0), this._dataChanges = [], ui[this.id] = this, !n || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Re.listen(this, "complete", Nn), Re.listen(this, "progress", Tp), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: e, maintainAspectRatio: r }, width: i, height: o, _aspectRatio: s } = this;
    return K(e) ? r && s ? s : o ? i / o : null : e;
  }
  get data() {
    return this.config.data;
  }
  set data(e) {
    this.config.data = e;
  }
  get options() {
    return this._options;
  }
  set options(e) {
    this.config.options = e;
  }
  get registry() {
    return Te;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ln(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return sn(this.canvas, this.ctx), this;
  }
  stop() {
    return Re.stop(this), this;
  }
  resize(e, r) {
    Re.running(this) ? this._resizeBeforeDraw = {
      width: e,
      height: r
    } : this._resize(e, r);
  }
  _resize(e, r) {
    const i = this.options, o = this.canvas, s = i.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(o, e, r, s), n = i.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, ln(this, n, !0) && (this.notifyPlugins("resize", {
      size: a
    }), te(i.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const r = this.options.scales || {};
    ee(r, (i, o) => {
      i.id = o;
    });
  }
  buildOrUpdateScales() {
    const e = this.options, r = e.scales, i = this.scales, o = Object.keys(i).reduce((a, n) => (a[n] = !1, a), {});
    let s = [];
    r && (s = s.concat(Object.keys(r).map((a) => {
      const n = r[a], l = Bo(a, n), d = l === "r", c = l === "x";
      return {
        options: n,
        dposition: d ? "chartArea" : c ? "bottom" : "left",
        dtype: d ? "radialLinear" : c ? "category" : "linear"
      };
    }))), ee(s, (a) => {
      const n = a.options, l = n.id, d = Bo(l, n), c = W(n.type, a.dtype);
      (n.position === void 0 || In(n.position, d) !== In(a.dposition)) && (n.position = a.dposition), o[l] = !0;
      let h = null;
      if (l in i && i[l].type === c)
        h = i[l];
      else {
        const u = Te.getScale(c);
        h = new u({
          id: l,
          type: c,
          ctx: this.ctx,
          chart: this
        }), i[h.id] = h;
      }
      h.init(n, e);
    }), ee(o, (a, n) => {
      a || delete i[n];
    }), ee(i, (a) => {
      ye.configure(this, a, a.options), ye.addBox(this, a);
    });
  }
  _updateMetasets() {
    const e = this._metasets, r = this.data.datasets.length, i = e.length;
    if (e.sort((o, s) => o.index - s.index), i > r) {
      for (let o = r; o < i; ++o)
        this._destroyDatasetMeta(o);
      e.splice(r, i - r);
    }
    this._sortedMetasets = e.slice(0).sort(Rn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: e, data: { datasets: r } } = this;
    e.length > r.length && delete this._stacks, e.forEach((i, o) => {
      r.filter((s) => s === i._dataset).length === 0 && this._destroyDatasetMeta(o);
    });
  }
  buildOrUpdateControllers() {
    const e = [], r = this.data.datasets;
    let i, o;
    for (this._removeUnreferencedMetasets(), i = 0, o = r.length; i < o; i++) {
      const s = r[i];
      let a = this.getDatasetMeta(i);
      const n = s.type || this.config.type;
      if (a.type && a.type !== n && (this._destroyDatasetMeta(i), a = this.getDatasetMeta(i)), a.type = n, a.indexAxis = s.indexAxis || No(n, this.options), a.order = s.order || 0, a.index = i, a.label = "" + s.label, a.visible = this.isDatasetVisible(i), a.controller)
        a.controller.updateIndex(i), a.controller.linkScales();
      else {
        const l = Te.getController(n), { datasetElementType: d, dataElementType: c } = ne.datasets[n];
        Object.assign(l, {
          dataElementType: Te.getElement(c),
          datasetElementType: d && Te.getElement(d)
        }), a.controller = new l(this, i), e.push(a.controller);
      }
    }
    return this._updateMetasets(), e;
  }
  _resetElements() {
    ee(this.data.datasets, (e, r) => {
      this.getDatasetMeta(r).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(e) {
    const r = this.config;
    r.update();
    const i = this._options = r.createResolver(r.chartOptionScopes(), this.getContext()), o = this._animationsDisabled = !i.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: e,
      cancelable: !0
    }) === !1)
      return;
    const s = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let a = 0;
    for (let d = 0, c = this.data.datasets.length; d < c; d++) {
      const { controller: h } = this.getDatasetMeta(d), u = !o && s.indexOf(h) === -1;
      h.buildOrUpdateElements(u), a = Math.max(+h.getMaxOverflow(), a);
    }
    a = this._minPadding = i.layout.autoPadding ? a : 0, this._updateLayout(a), o || ee(s, (d) => {
      d.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(Rn("z", "_idx"));
    const { _active: n, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : n.length && this._updateHoverStyles(n, n, !0), this.render();
  }
  _updateScales() {
    ee(this.scales, (e) => {
      ye.removeBox(this, e);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const e = this.options, r = new Set(Object.keys(this._listeners)), i = new Set(e.events);
    (!qs(r, i) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, r = this._getUniformDataChanges() || [];
    for (const { method: i, start: o, count: s } of r) {
      const a = i === "_removeElements" ? -s : s;
      Dp(e, o, a);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const r = this.data.datasets.length, i = (s) => new Set(e.filter((a) => a[0] === s).map((a, n) => n + "," + a.splice(1).join(","))), o = i(0);
    for (let s = 1; s < r; s++)
      if (!qs(o, i(s)))
        return;
    return Array.from(o).map((s) => s.split(",")).map((s) => ({
      method: s[1],
      start: +s[2],
      count: +s[3]
    }));
  }
  _updateLayout(e) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    ye.update(this, this.width, this.height, e);
    const r = this.chartArea, i = r.width <= 0 || r.height <= 0;
    this._layers = [], ee(this.boxes, (o) => {
      i && o.position === "chartArea" || (o.configure && o.configure(), this._layers.push(...o._layers()));
    }, this), this._layers.forEach((o, s) => {
      o._idx = s;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(e) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: e,
      cancelable: !0
    }) !== !1) {
      for (let r = 0, i = this.data.datasets.length; r < i; ++r)
        this.getDatasetMeta(r).controller.configure();
      for (let r = 0, i = this.data.datasets.length; r < i; ++r)
        this._updateDataset(r, tt(e) ? e({
          datasetIndex: r
        }) : e);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: e
      });
    }
  }
  _updateDataset(e, r) {
    const i = this.getDatasetMeta(e), o = {
      meta: i,
      index: e,
      mode: r,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", o) !== !1 && (i.controller._update(r), o.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", o));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Re.has(this) ? this.attached && !Re.running(this) && Re.start(this) : (this.draw(), Nn({
      chart: this
    })));
  }
  draw() {
    let e;
    if (this._resizeBeforeDraw) {
      const { width: i, height: o } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(i, o);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const r = this._layers;
    for (e = 0; e < r.length && r[e].z <= 0; ++e)
      r[e].draw(this.chartArea);
    for (this._drawDatasets(); e < r.length; ++e)
      r[e].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(e) {
    const r = this._sortedMetasets, i = [];
    let o, s;
    for (o = 0, s = r.length; o < s; ++o) {
      const a = r[o];
      (!e || a.visible) && i.push(a);
    }
    return i;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this.getSortedVisibleDatasetMetas();
    for (let r = e.length - 1; r >= 0; --r)
      this._drawDataset(e[r]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(e) {
    const r = this.ctx, i = {
      meta: e,
      index: e.index,
      cancelable: !0
    }, o = zl(this, e);
    this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (o && $i(r, o), e.controller.draw(), o && Oi(r), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
  }
  isPointInArea(e) {
    return Ve(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, r, i, o) {
    const s = Lg.modes[r];
    return typeof s == "function" ? s(this, e, i, o) : [];
  }
  getDatasetMeta(e) {
    const r = this.data.datasets[e], i = this._metasets;
    let o = i.filter((s) => s && s._dataset === r).pop();
    return o || (o = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: r && r.order || 0,
      index: e,
      _dataset: r,
      _parsed: [],
      _sorted: !1
    }, i.push(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = at(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(e) {
    const r = this.data.datasets[e];
    if (!r)
      return !1;
    const i = this.getDatasetMeta(e);
    return typeof i.hidden == "boolean" ? !i.hidden : !r.hidden;
  }
  setDatasetVisibility(e, r) {
    const i = this.getDatasetMeta(e);
    i.hidden = !r;
  }
  toggleDataVisibility(e) {
    this._hiddenIndices[e] = !this._hiddenIndices[e];
  }
  getDataVisibility(e) {
    return !this._hiddenIndices[e];
  }
  _updateVisibility(e, r, i) {
    const o = i ? "show" : "hide", s = this.getDatasetMeta(e), a = s.controller._resolveAnimations(void 0, o);
    Er(r) ? (s.data[r].hidden = !i, this.update()) : (this.setDatasetVisibility(e, i), a.update(s, {
      visible: i
    }), this.update((n) => n.datasetIndex === e ? o : void 0));
  }
  hide(e, r) {
    this._updateVisibility(e, r, !1);
  }
  show(e, r) {
    this._updateVisibility(e, r, !0);
  }
  _destroyDatasetMeta(e) {
    const r = this._metasets[e];
    r && r.controller && r.controller._destroy(), delete this._metasets[e];
  }
  _stop() {
    let e, r;
    for (this.stop(), Re.remove(this), e = 0, r = this.data.datasets.length; e < r; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: e, ctx: r } = this;
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), sn(e, r), this.platform.releaseContext(r), this.canvas = null, this.ctx = null), delete ui[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...e) {
    return this.canvas.toDataURL(...e);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const e = this._listeners, r = this.platform, i = (s, a) => {
      r.addEventListener(this, s, a), e[s] = a;
    }, o = (s, a, n) => {
      s.offsetX = a, s.offsetY = n, this._eventHandler(s);
    };
    ee(this.options.events, (s) => i(s, o));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const e = this._responsiveListeners, r = this.platform, i = (l, d) => {
      r.addEventListener(this, l, d), e[l] = d;
    }, o = (l, d) => {
      e[l] && (r.removeEventListener(this, l, d), delete e[l]);
    }, s = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let a;
    const n = () => {
      o("attach", n), this.attached = !0, this.resize(), i("resize", s), i("detach", a);
    };
    a = () => {
      this.attached = !1, o("resize", s), this._stop(), this._resize(0, 0), i("attach", n);
    }, r.isAttached(this.canvas) ? n() : a();
  }
  unbindEvents() {
    ee(this._listeners, (e, r) => {
      this.platform.removeEventListener(this, r, e);
    }), this._listeners = {}, ee(this._responsiveListeners, (e, r) => {
      this.platform.removeEventListener(this, r, e);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(e, r, i) {
    const o = i ? "set" : "remove";
    let s, a, n, l;
    for (r === "dataset" && (s = this.getDatasetMeta(e[0].datasetIndex), s.controller["_" + o + "DatasetHoverStyle"]()), n = 0, l = e.length; n < l; ++n) {
      a = e[n];
      const d = a && this.getDatasetMeta(a.datasetIndex).controller;
      d && d[o + "HoverStyle"](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e) {
    const r = this._active || [], i = e.map(({ datasetIndex: s, index: a }) => {
      const n = this.getDatasetMeta(s);
      if (!n)
        throw new Error("No dataset found at index " + s);
      return {
        datasetIndex: s,
        element: n.data[a],
        index: a
      };
    });
    !vi(i, r) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, r));
  }
  notifyPlugins(e, r, i) {
    return this._plugins.notify(this, e, r, i);
  }
  isPluginEnabled(e) {
    return this._plugins._cache.filter((r) => r.plugin.id === e).length === 1;
  }
  _updateHoverStyles(e, r, i) {
    const o = this.options.hover, s = (l, d) => l.filter((c) => !d.some((h) => c.datasetIndex === h.datasetIndex && c.index === h.index)), a = s(r, e), n = i ? e : s(e, r);
    a.length && this.updateHoverStyle(a, o.mode, !1), n.length && o.mode && this.updateHoverStyle(n, o.mode, !0);
  }
  _eventHandler(e, r) {
    const i = {
      event: e,
      replay: r,
      cancelable: !0,
      inChartArea: this.isPointInArea(e)
    }, o = (a) => (a.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", i, o) === !1)
      return;
    const s = this._handleEvent(e, r, i.inChartArea);
    return i.cancelable = !1, this.notifyPlugins("afterEvent", i, o), (s || i.changed) && this.render(), this;
  }
  _handleEvent(e, r, i) {
    const { _active: o = [], options: s } = this, a = r, n = this._getActiveElements(e, o, i, a), l = ju(e), d = $p(e, this._lastEvent, i, l);
    i && (this._lastEvent = null, te(s.onHover, [
      e,
      n,
      this
    ], this), l && te(s.onClick, [
      e,
      n,
      this
    ], this));
    const c = !vi(n, o);
    return (c || r) && (this._active = n, this._updateHoverStyles(n, o, r)), this._lastEvent = d, c;
  }
  _getActiveElements(e, r, i, o) {
    if (e.type === "mouseout")
      return [];
    if (!i)
      return r;
    const s = this.options.hover;
    return this.getElementsAtEventForMode(e, s.mode, s, o);
  }
}
N(De, "defaults", ne), N(De, "instances", ui), N(De, "overrides", Ct), N(De, "registry", Te), N(De, "version", Ep), N(De, "getChart", Bn);
function Hn() {
  return ee(De.instances, (t) => t._plugins.invalidate());
}
function Op(t, e, r) {
  const { startAngle: i, x: o, y: s, outerRadius: a, innerRadius: n, options: l } = e, { borderWidth: d, borderJoinStyle: c } = l, h = Math.min(d / a, me(i - r));
  if (t.beginPath(), t.arc(o, s, a - d / 2, i + h / 2, r - h / 2), n > 0) {
    const u = Math.min(d / n, me(i - r));
    t.arc(o, s, n + d / 2, r - u / 2, i + u / 2, !0);
  } else {
    const u = Math.min(d / 2, a * me(i - r));
    if (c === "round")
      t.arc(o, s, u, r - Q / 2, i + Q / 2, !0);
    else if (c === "bevel") {
      const _ = 2 * u * u, p = -_ * Math.cos(r + Q / 2) + o, f = -_ * Math.sin(r + Q / 2) + s, m = _ * Math.cos(i + Q / 2) + o, y = _ * Math.sin(i + Q / 2) + s;
      t.lineTo(p, f), t.lineTo(m, y);
    }
  }
  t.closePath(), t.moveTo(0, 0), t.rect(0, 0, t.canvas.width, t.canvas.height), t.clip("evenodd");
}
function Ip(t, e, r) {
  const { startAngle: i, pixelMargin: o, x: s, y: a, outerRadius: n, innerRadius: l } = e;
  let d = o / n;
  t.beginPath(), t.arc(s, a, n, i - d, r + d), l > o ? (d = o / l, t.arc(s, a, l, r + d, i - d, !0)) : t.arc(s, a, o, r + le, i - le), t.closePath(), t.clip();
}
function Rp(t) {
  return as(t, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function Np(t, e, r, i) {
  const o = Rp(t.options.borderRadius), s = (r - e) / 2, a = Math.min(s, i * e / 2), n = (l) => {
    const d = (r - Math.min(s, l)) * i / 2;
    return _e(l, 0, Math.min(s, d));
  };
  return {
    outerStart: n(o.outerStart),
    outerEnd: n(o.outerEnd),
    innerStart: _e(o.innerStart, 0, a),
    innerEnd: _e(o.innerEnd, 0, a)
  };
}
function $t(t, e, r, i) {
  return {
    x: r + t * Math.cos(e),
    y: i + t * Math.sin(e)
  };
}
function Ai(t, e, r, i, o, s) {
  const { x: a, y: n, startAngle: l, pixelMargin: d, innerRadius: c } = e, h = Math.max(e.outerRadius + i + r - d, 0), u = c > 0 ? c + i + r + d : 0;
  let _ = 0;
  const p = o - l;
  if (i) {
    const R = c > 0 ? c - i : 0, b = h > 0 ? h - i : 0, A = (R + b) / 2, D = A !== 0 ? p * A / (A + i) : p;
    _ = (p - D) / 2;
  }
  const f = Math.max(1e-3, p * h - r / Q) / h, m = (p - f) / 2, y = l + m + _, g = o - m - _, { outerStart: v, outerEnd: k, innerStart: w, innerEnd: S } = Np(e, u, h, g - y), P = h - v, x = h - k, E = y + v / P, L = g - k / x, z = u + w, C = u + S, $ = y + w / z, M = g - S / C;
  if (t.beginPath(), s) {
    const R = (E + L) / 2;
    if (t.arc(a, n, h, E, R), t.arc(a, n, h, R, L), k > 0) {
      const T = $t(x, L, a, n);
      t.arc(T.x, T.y, k, L, g + le);
    }
    const b = $t(C, g, a, n);
    if (t.lineTo(b.x, b.y), S > 0) {
      const T = $t(C, M, a, n);
      t.arc(T.x, T.y, S, g + le, M + Math.PI);
    }
    const A = (g - S / u + (y + w / u)) / 2;
    if (t.arc(a, n, u, g - S / u, A, !0), t.arc(a, n, u, A, y + w / u, !0), w > 0) {
      const T = $t(z, $, a, n);
      t.arc(T.x, T.y, w, $ + Math.PI, y - le);
    }
    const D = $t(P, y, a, n);
    if (t.lineTo(D.x, D.y), v > 0) {
      const T = $t(P, E, a, n);
      t.arc(T.x, T.y, v, y - le, E);
    }
  } else {
    t.moveTo(a, n);
    const R = Math.cos(E) * h + a, b = Math.sin(E) * h + n;
    t.lineTo(R, b);
    const A = Math.cos(L) * h + a, D = Math.sin(L) * h + n;
    t.lineTo(A, D);
  }
  t.closePath();
}
function Bp(t, e, r, i, o) {
  const { fullCircles: s, startAngle: a, circumference: n } = e;
  let l = e.endAngle;
  if (s) {
    Ai(t, e, r, i, l, o);
    for (let d = 0; d < s; ++d)
      t.fill();
    isNaN(n) || (l = a + (n % re || re));
  }
  return Ai(t, e, r, i, l, o), t.fill(), l;
}
function Hp(t, e, r, i, o) {
  const { fullCircles: s, startAngle: a, circumference: n, options: l } = e, { borderWidth: d, borderJoinStyle: c, borderDash: h, borderDashOffset: u, borderRadius: _ } = l, p = l.borderAlign === "inner";
  if (!d)
    return;
  t.setLineDash(h || []), t.lineDashOffset = u, p ? (t.lineWidth = d * 2, t.lineJoin = c || "round") : (t.lineWidth = d, t.lineJoin = c || "bevel");
  let f = e.endAngle;
  if (s) {
    Ai(t, e, r, i, f, o);
    for (let m = 0; m < s; ++m)
      t.stroke();
    isNaN(n) || (f = a + (n % re || re));
  }
  p && Ip(t, e, f), l.selfJoin && f - a >= Q && _ === 0 && c !== "miter" && Op(t, e, f), s || (Ai(t, e, r, i, f, o), t.stroke());
}
class It extends Ee {
  constructor(r) {
    super();
    N(this, "circumference");
    N(this, "endAngle");
    N(this, "fullCircles");
    N(this, "innerRadius");
    N(this, "outerRadius");
    N(this, "pixelMargin");
    N(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, r && Object.assign(this, r);
  }
  inRange(r, i, o) {
    const s = this.getProps([
      "x",
      "y"
    ], o), { angle: a, distance: n } = ll(s, {
      x: r,
      y: i
    }), { startAngle: l, endAngle: d, innerRadius: c, outerRadius: h, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], o), _ = (this.options.spacing + this.options.borderWidth) / 2, p = W(u, d - l), f = Lr(a, l, d) && l !== d, m = p >= re || f, y = je(n, c + _, h + _);
    return m && y;
  }
  getCenterPoint(r) {
    const { x: i, y: o, startAngle: s, endAngle: a, innerRadius: n, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], r), { offset: d, spacing: c } = this.options, h = (s + a) / 2, u = (n + l + c + d) / 2;
    return {
      x: i + Math.cos(h) * u,
      y: o + Math.sin(h) * u
    };
  }
  tooltipPosition(r) {
    return this.getCenterPoint(r);
  }
  draw(r) {
    const { options: i, circumference: o } = this, s = (i.offset || 0) / 4, a = (i.spacing || 0) / 2, n = i.circular;
    if (this.pixelMargin = i.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = o > re ? Math.floor(o / re) : 0, o === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    r.save();
    const l = (this.startAngle + this.endAngle) / 2;
    r.translate(Math.cos(l) * s, Math.sin(l) * s);
    const d = 1 - Math.sin(Math.min(Q, o || 0)), c = s * d;
    r.fillStyle = i.backgroundColor, r.strokeStyle = i.borderColor, Bp(r, this, c, a, n), Hp(r, this, c, a, n), r.restore();
  }
}
N(It, "id", "arc"), N(It, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0,
  selfJoin: !1
}), N(It, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), N(It, "descriptors", {
  _scriptable: !0,
  _indexable: (r) => r !== "borderDash"
});
function Fl(t, e, r = e) {
  t.lineCap = W(r.borderCapStyle, e.borderCapStyle), t.setLineDash(W(r.borderDash, e.borderDash)), t.lineDashOffset = W(r.borderDashOffset, e.borderDashOffset), t.lineJoin = W(r.borderJoinStyle, e.borderJoinStyle), t.lineWidth = W(r.borderWidth, e.borderWidth), t.strokeStyle = W(r.borderColor, e.borderColor);
}
function jp(t, e, r) {
  t.lineTo(r.x, r.y);
}
function Fp(t) {
  return t.stepped ? c_ : t.tension || t.cubicInterpolationMode === "monotone" ? h_ : jp;
}
function Vl(t, e, r = {}) {
  const i = t.length, { start: o = 0, end: s = i - 1 } = r, { start: a, end: n } = e, l = Math.max(o, a), d = Math.min(s, n), c = o < a && s < a || o > n && s > n;
  return {
    count: i,
    start: l,
    loop: e.loop,
    ilen: d < l && !c ? i + d - l : d - l
  };
}
function Vp(t, e, r, i) {
  const { points: o, options: s } = e, { count: a, start: n, loop: l, ilen: d } = Vl(o, r, i), c = Fp(s);
  let { move: h = !0, reverse: u } = i || {}, _, p, f;
  for (_ = 0; _ <= d; ++_)
    p = o[(n + (u ? d - _ : _)) % a], !p.skip && (h ? (t.moveTo(p.x, p.y), h = !1) : c(t, f, p, u, s.stepped), f = p);
  return l && (p = o[(n + (u ? d : 0)) % a], c(t, f, p, u, s.stepped)), !!l;
}
function Gp(t, e, r, i) {
  const o = e.points, { count: s, start: a, ilen: n } = Vl(o, r, i), { move: l = !0, reverse: d } = i || {};
  let c = 0, h = 0, u, _, p, f, m, y;
  const g = (k) => (a + (d ? n - k : k)) % s, v = () => {
    f !== m && (t.lineTo(c, m), t.lineTo(c, f), t.lineTo(c, y));
  };
  for (l && (_ = o[g(0)], t.moveTo(_.x, _.y)), u = 0; u <= n; ++u) {
    if (_ = o[g(u)], _.skip)
      continue;
    const k = _.x, w = _.y, S = k | 0;
    S === p ? (w < f ? f = w : w > m && (m = w), c = (h * c + k) / ++h) : (v(), t.lineTo(k, w), p = S, h = 0, f = m = w), y = w;
  }
  v();
}
function Ho(t) {
  const e = t.options, r = e.borderDash && e.borderDash.length;
  return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !r ? Gp : Vp;
}
function Wp(t) {
  return t.stepped ? V_ : t.tension || t.cubicInterpolationMode === "monotone" ? G_ : pt;
}
function Up(t, e, r, i) {
  let o = e._path;
  o || (o = e._path = new Path2D(), e.path(o, r, i) && o.closePath()), Fl(t, e.options), t.stroke(o);
}
function Kp(t, e, r, i) {
  const { segments: o, options: s } = e, a = Ho(e);
  for (const n of o)
    Fl(t, s, n.style), t.beginPath(), a(t, e, n, {
      start: r,
      end: r + i - 1
    }) && t.closePath(), t.stroke();
}
const Yp = typeof Path2D == "function";
function qp(t, e, r, i) {
  Yp && !e.options.segment ? Up(t, e, r, i) : Kp(t, e, r, i);
}
class Xe extends Ee {
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, r) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const o = i.spanGaps ? this._loop : this._fullLoop;
      O_(this._points, i, e, o, r), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = X_(this, this.options.segment));
  }
  first() {
    const e = this.segments, r = this.points;
    return e.length && r[e[0].start];
  }
  last() {
    const e = this.segments, r = this.points, i = e.length;
    return i && r[e[i - 1].end];
  }
  interpolate(e, r) {
    const i = this.options, o = e[r], s = this.points, a = Ml(this, {
      property: r,
      start: o,
      end: o
    });
    if (!a.length)
      return;
    const n = [], l = Wp(i);
    let d, c;
    for (d = 0, c = a.length; d < c; ++d) {
      const { start: h, end: u } = a[d], _ = s[h], p = s[u];
      if (_ === p) {
        n.push(_);
        continue;
      }
      const f = Math.abs((o - _[r]) / (p[r] - _[r])), m = l(_, p, f, i.stepped);
      m[r] = e[r], n.push(m);
    }
    return n.length === 1 ? n[0] : n;
  }
  pathSegment(e, r, i) {
    return Ho(this)(e, this, r, i);
  }
  path(e, r, i) {
    const o = this.segments, s = Ho(this);
    let a = this._loop;
    r = r || 0, i = i || this.points.length - r;
    for (const n of o)
      a &= s(e, this, n, {
        start: r,
        end: r + i - 1
      });
    return !!a;
  }
  draw(e, r, i, o) {
    const s = this.options || {};
    (this.points || []).length && s.borderWidth && (e.save(), qp(e, this, i, o), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
N(Xe, "id", "line"), N(Xe, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), N(Xe, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), N(Xe, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
});
function jn(t, e, r, i) {
  const o = t.options, { [r]: s } = t.getProps([
    r
  ], i);
  return Math.abs(e - s) < o.radius + o.hitRadius;
}
class _i extends Ee {
  constructor(r) {
    super();
    N(this, "parsed");
    N(this, "skip");
    N(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, r && Object.assign(this, r);
  }
  inRange(r, i, o) {
    const s = this.options, { x: a, y: n } = this.getProps([
      "x",
      "y"
    ], o);
    return Math.pow(r - a, 2) + Math.pow(i - n, 2) < Math.pow(s.hitRadius + s.radius, 2);
  }
  inXRange(r, i) {
    return jn(this, r, "x", i);
  }
  inYRange(r, i) {
    return jn(this, r, "y", i);
  }
  getCenterPoint(r) {
    const { x: i, y: o } = this.getProps([
      "x",
      "y"
    ], r);
    return {
      x: i,
      y: o
    };
  }
  size(r) {
    r = r || this.options || {};
    let i = r.radius || 0;
    i = Math.max(i, i && r.hoverRadius || 0);
    const o = i && r.borderWidth || 0;
    return (i + o) * 2;
  }
  draw(r, i) {
    const o = this.options;
    this.skip || o.radius < 0.1 || !Ve(this, i, this.size(o) / 2) || (r.strokeStyle = o.borderColor, r.lineWidth = o.borderWidth, r.fillStyle = o.backgroundColor, Io(r, o, this.x, this.y));
  }
  getRange() {
    const r = this.options || {};
    return r.radius + r.hitRadius;
  }
}
N(_i, "id", "point"), /**
* @type {any}
*/
N(_i, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
N(_i, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function Gl(t, e) {
  const { x: r, y: i, base: o, width: s, height: a } = t.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], e);
  let n, l, d, c, h;
  return t.horizontal ? (h = a / 2, n = Math.min(r, o), l = Math.max(r, o), d = i - h, c = i + h) : (h = s / 2, n = r - h, l = r + h, d = Math.min(i, o), c = Math.max(i, o)), {
    left: n,
    top: d,
    right: l,
    bottom: c
  };
}
function Ze(t, e, r, i) {
  return t ? 0 : _e(e, r, i);
}
function Xp(t, e, r) {
  const i = t.options.borderWidth, o = t.borderSkipped, s = ml(i);
  return {
    t: Ze(o.top, s.top, 0, r),
    r: Ze(o.right, s.right, 0, e),
    b: Ze(o.bottom, s.bottom, 0, r),
    l: Ze(o.left, s.left, 0, e)
  };
}
function Zp(t, e, r) {
  const { enableBorderRadius: i } = t.getProps([
    "enableBorderRadius"
  ]), o = t.options.borderRadius, s = xt(o), a = Math.min(e, r), n = t.borderSkipped, l = i || Y(o);
  return {
    topLeft: Ze(!l || n.top || n.left, s.topLeft, 0, a),
    topRight: Ze(!l || n.top || n.right, s.topRight, 0, a),
    bottomLeft: Ze(!l || n.bottom || n.left, s.bottomLeft, 0, a),
    bottomRight: Ze(!l || n.bottom || n.right, s.bottomRight, 0, a)
  };
}
function Qp(t) {
  const e = Gl(t), r = e.right - e.left, i = e.bottom - e.top, o = Xp(t, r / 2, i / 2), s = Zp(t, r / 2, i / 2);
  return {
    outer: {
      x: e.left,
      y: e.top,
      w: r,
      h: i,
      radius: s
    },
    inner: {
      x: e.left + o.l,
      y: e.top + o.t,
      w: r - o.l - o.r,
      h: i - o.t - o.b,
      radius: {
        topLeft: Math.max(0, s.topLeft - Math.max(o.t, o.l)),
        topRight: Math.max(0, s.topRight - Math.max(o.t, o.r)),
        bottomLeft: Math.max(0, s.bottomLeft - Math.max(o.b, o.l)),
        bottomRight: Math.max(0, s.bottomRight - Math.max(o.b, o.r))
      }
    }
  };
}
function ho(t, e, r, i) {
  const o = e === null, s = r === null, n = t && !(o && s) && Gl(t, i);
  return n && (o || je(e, n.left, n.right)) && (s || je(r, n.top, n.bottom));
}
function Jp(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function e0(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function uo(t, e, r = {}) {
  const i = t.x !== r.x ? -e : 0, o = t.y !== r.y ? -e : 0, s = (t.x + t.w !== r.x + r.w ? e : 0) - i, a = (t.y + t.h !== r.y + r.h ? e : 0) - o;
  return {
    x: t.x + i,
    y: t.y + o,
    w: t.w + s,
    h: t.h + a,
    radius: t.radius
  };
}
class gi extends Ee {
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: r, options: { borderColor: i, backgroundColor: o } } = this, { inner: s, outer: a } = Qp(this), n = Jp(a.radius) ? Tr : e0;
    e.save(), (a.w !== s.w || a.h !== s.h) && (e.beginPath(), n(e, uo(a, r, s)), e.clip(), n(e, uo(s, -r, a)), e.fillStyle = i, e.fill("evenodd")), e.beginPath(), n(e, uo(s, r)), e.fillStyle = o, e.fill(), e.restore();
  }
  inRange(e, r, i) {
    return ho(this, e, r, i);
  }
  inXRange(e, r) {
    return ho(this, e, null, r);
  }
  inYRange(e, r) {
    return ho(this, null, e, r);
  }
  getCenterPoint(e) {
    const { x: r, y: i, base: o, horizontal: s } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], e);
    return {
      x: s ? (r + o) / 2 : r,
      y: s ? i : (i + o) / 2
    };
  }
  getRange(e) {
    return e === "x" ? this.width / 2 : this.height / 2;
  }
}
N(gi, "id", "bar"), N(gi, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), N(gi, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var t0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: It,
  BarElement: gi,
  LineElement: Xe,
  PointElement: _i
});
const jo = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Fn = /* @__PURE__ */ jo.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function Wl(t) {
  return jo[t % jo.length];
}
function Ul(t) {
  return Fn[t % Fn.length];
}
function r0(t, e) {
  return t.borderColor = Wl(e), t.backgroundColor = Ul(e), ++e;
}
function i0(t, e) {
  return t.backgroundColor = t.data.map(() => Wl(e++)), e;
}
function o0(t, e) {
  return t.backgroundColor = t.data.map(() => Ul(e++)), e;
}
function s0(t) {
  let e = 0;
  return (r, i) => {
    const o = t.getDatasetMeta(i).controller;
    o instanceof qe ? e = i0(r, e) : o instanceof xr ? e = o0(r, e) : o && (e = r0(r, e));
  };
}
function Vn(t) {
  let e;
  for (e in t)
    if (t[e].borderColor || t[e].backgroundColor)
      return !0;
  return !1;
}
function n0(t) {
  return t && (t.borderColor || t.backgroundColor);
}
function a0() {
  return ne.borderColor !== "rgba(0,0,0,0.1)" || ne.backgroundColor !== "rgba(0,0,0,0.1)";
}
var l0 = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(t, e, r) {
    if (!r.enabled)
      return;
    const { data: { datasets: i }, options: o } = t.config, { elements: s } = o, a = Vn(i) || n0(o) || s && Vn(s) || a0();
    if (!r.forceOverride && a)
      return;
    const n = s0(t);
    i.forEach(n);
  }
};
function d0(t, e, r, i, o) {
  const s = o.samples || i;
  if (s >= r)
    return t.slice(e, e + r);
  const a = [], n = (r - 2) / (s - 2);
  let l = 0;
  const d = e + r - 1;
  let c = e, h, u, _, p, f;
  for (a[l++] = t[c], h = 0; h < s - 2; h++) {
    let m = 0, y = 0, g;
    const v = Math.floor((h + 1) * n) + 1 + e, k = Math.min(Math.floor((h + 2) * n) + 1, r) + e, w = k - v;
    for (g = v; g < k; g++)
      m += t[g].x, y += t[g].y;
    m /= w, y /= w;
    const S = Math.floor(h * n) + 1 + e, P = Math.min(Math.floor((h + 1) * n) + 1, r) + e, { x, y: E } = t[c];
    for (_ = p = -1, g = S; g < P; g++)
      p = 0.5 * Math.abs((x - m) * (t[g].y - E) - (x - t[g].x) * (y - E)), p > _ && (_ = p, u = t[g], f = g);
    a[l++] = u, c = f;
  }
  return a[l++] = t[d], a;
}
function c0(t, e, r, i) {
  let o = 0, s = 0, a, n, l, d, c, h, u, _, p, f;
  const m = [], y = e + r - 1, g = t[e].x, k = t[y].x - g;
  for (a = e; a < e + r; ++a) {
    n = t[a], l = (n.x - g) / k * i, d = n.y;
    const w = l | 0;
    if (w === c)
      d < p ? (p = d, h = a) : d > f && (f = d, u = a), o = (s * o + n.x) / ++s;
    else {
      const S = a - 1;
      if (!K(h) && !K(u)) {
        const P = Math.min(h, u), x = Math.max(h, u);
        P !== _ && P !== S && m.push({
          ...t[P],
          x: o
        }), x !== _ && x !== S && m.push({
          ...t[x],
          x: o
        });
      }
      a > 0 && S !== _ && m.push(t[S]), m.push(n), c = w, s = 0, p = f = d, h = u = _ = a;
    }
  }
  return m;
}
function Kl(t) {
  if (t._decimated) {
    const e = t._data;
    delete t._decimated, delete t._data, Object.defineProperty(t, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: e
    });
  }
}
function Gn(t) {
  t.data.datasets.forEach((e) => {
    Kl(e);
  });
}
function h0(t, e) {
  const r = e.length;
  let i = 0, o;
  const { iScale: s } = t, { min: a, max: n, minDefined: l, maxDefined: d } = s.getUserBounds();
  return l && (i = _e(Fe(e, s.axis, a).lo, 0, r - 1)), d ? o = _e(Fe(e, s.axis, n).hi + 1, i, r) - i : o = r - i, {
    start: i,
    count: o
  };
}
var u0 = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (t, e, r) => {
    if (!r.enabled) {
      Gn(t);
      return;
    }
    const i = t.width;
    t.data.datasets.forEach((o, s) => {
      const { _data: a, indexAxis: n } = o, l = t.getDatasetMeta(s), d = a || o.data;
      if (cr([
        n,
        t.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const c = t.scales[l.xAxisID];
      if (c.type !== "linear" && c.type !== "time" || t.options.parsing)
        return;
      let { start: h, count: u } = h0(l, d);
      const _ = r.threshold || 4 * i;
      if (u <= _) {
        Kl(o);
        return;
      }
      K(a) && (o._data = d, delete o.data, Object.defineProperty(o, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(f) {
          this._data = f;
        }
      }));
      let p;
      switch (r.algorithm) {
        case "lttb":
          p = d0(d, h, u, i, r);
          break;
        case "min-max":
          p = c0(d, h, u, i);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${r.algorithm}'`);
      }
      o._decimated = p;
    });
  },
  destroy(t) {
    Gn(t);
  }
};
function _0(t, e, r) {
  const i = t.segments, o = t.points, s = e.points, a = [];
  for (const n of i) {
    let { start: l, end: d } = n;
    d = Ni(l, d, o);
    const c = Fo(r, o[l], o[d], n.loop);
    if (!e.segments) {
      a.push({
        source: n,
        target: c,
        start: o[l],
        end: o[d]
      });
      continue;
    }
    const h = Ml(e, c);
    for (const u of h) {
      const _ = Fo(r, s[u.start], s[u.end], u.loop), p = Cl(n, o, _);
      for (const f of p)
        a.push({
          source: f,
          target: u,
          start: {
            [r]: Wn(c, _, "start", Math.max)
          },
          end: {
            [r]: Wn(c, _, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function Fo(t, e, r, i) {
  if (i)
    return;
  let o = e[t], s = r[t];
  return t === "angle" && (o = me(o), s = me(s)), {
    property: t,
    start: o,
    end: s
  };
}
function g0(t, e) {
  const { x: r = null, y: i = null } = t || {}, o = e.points, s = [];
  return e.segments.forEach(({ start: a, end: n }) => {
    n = Ni(a, n, o);
    const l = o[a], d = o[n];
    i !== null ? (s.push({
      x: l.x,
      y: i
    }), s.push({
      x: d.x,
      y: i
    })) : r !== null && (s.push({
      x: r,
      y: l.y
    }), s.push({
      x: r,
      y: d.y
    }));
  }), s;
}
function Ni(t, e, r) {
  for (; e > t; e--) {
    const i = r[e];
    if (!isNaN(i.x) && !isNaN(i.y))
      break;
  }
  return e;
}
function Wn(t, e, r, i) {
  return t && e ? i(t[r], e[r]) : t ? t[r] : e ? e[r] : 0;
}
function Yl(t, e) {
  let r = [], i = !1;
  return se(t) ? (i = !0, r = t) : r = g0(t, e), r.length ? new Xe({
    points: r,
    options: {
      tension: 0
    },
    _loop: i,
    _fullLoop: i
  }) : null;
}
function Un(t) {
  return t && t.fill !== !1;
}
function p0(t, e, r) {
  let o = t[e].fill;
  const s = [
    e
  ];
  let a;
  if (!r)
    return o;
  for (; o !== !1 && s.indexOf(o) === -1; ) {
    if (!ae(o))
      return o;
    if (a = t[o], !a)
      return !1;
    if (a.visible)
      return o;
    s.push(o), o = a.fill;
  }
  return !1;
}
function f0(t, e, r) {
  const i = b0(t);
  if (Y(i))
    return isNaN(i.value) ? !1 : i;
  let o = parseFloat(i);
  return ae(o) && Math.floor(o) === o ? m0(i[0], e, o, r) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(i) >= 0 && i;
}
function m0(t, e, r, i) {
  return (t === "-" || t === "+") && (r = e + r), r === e || r < 0 || r >= i ? !1 : r;
}
function y0(t, e) {
  let r = null;
  return t === "start" ? r = e.bottom : t === "end" ? r = e.top : Y(t) ? r = e.getPixelForValue(t.value) : e.getBasePixel && (r = e.getBasePixel()), r;
}
function v0(t, e, r) {
  let i;
  return t === "start" ? i = r : t === "end" ? i = e.options.reverse ? e.min : e.max : Y(t) ? i = t.value : i = e.getBaseValue(), i;
}
function b0(t) {
  const e = t.options, r = e.fill;
  let i = W(r && r.target, r);
  return i === void 0 && (i = !!e.backgroundColor), i === !1 || i === null ? !1 : i === !0 ? "origin" : i;
}
function x0(t) {
  const { scale: e, index: r, line: i } = t, o = [], s = i.segments, a = i.points, n = w0(e, r);
  n.push(Yl({
    x: null,
    y: e.bottom
  }, i));
  for (let l = 0; l < s.length; l++) {
    const d = s[l];
    for (let c = d.start; c <= d.end; c++)
      k0(o, a[c], n);
  }
  return new Xe({
    points: o,
    options: {}
  });
}
function w0(t, e) {
  const r = [], i = t.getMatchingVisibleMetas("line");
  for (let o = 0; o < i.length; o++) {
    const s = i[o];
    if (s.index === e)
      break;
    s.hidden || r.unshift(s.dataset);
  }
  return r;
}
function k0(t, e, r) {
  const i = [];
  for (let o = 0; o < r.length; o++) {
    const s = r[o], { first: a, last: n, point: l } = S0(s, e, "x");
    if (!(!l || a && n)) {
      if (a)
        i.unshift(l);
      else if (t.push(l), !n)
        break;
    }
  }
  t.push(...i);
}
function S0(t, e, r) {
  const i = t.interpolate(e, r);
  if (!i)
    return {};
  const o = i[r], s = t.segments, a = t.points;
  let n = !1, l = !1;
  for (let d = 0; d < s.length; d++) {
    const c = s[d], h = a[c.start][r], u = a[c.end][r];
    if (je(o, h, u)) {
      n = o === h, l = o === u;
      break;
    }
  }
  return {
    first: n,
    last: l,
    point: i
  };
}
class ql {
  constructor(e) {
    this.x = e.x, this.y = e.y, this.radius = e.radius;
  }
  pathSegment(e, r, i) {
    const { x: o, y: s, radius: a } = this;
    return r = r || {
      start: 0,
      end: re
    }, e.arc(o, s, a, r.end, r.start, !0), !i.bounds;
  }
  interpolate(e) {
    const { x: r, y: i, radius: o } = this, s = e.angle;
    return {
      x: r + Math.cos(s) * o,
      y: i + Math.sin(s) * o,
      angle: s
    };
  }
}
function A0(t) {
  const { chart: e, fill: r, line: i } = t;
  if (ae(r))
    return P0(e, r);
  if (r === "stack")
    return x0(t);
  if (r === "shape")
    return !0;
  const o = C0(t);
  return o instanceof ql ? o : Yl(o, i);
}
function P0(t, e) {
  const r = t.getDatasetMeta(e);
  return r && t.isDatasetVisible(e) ? r.dataset : null;
}
function C0(t) {
  return (t.scale || {}).getPointPositionForValue ? z0(t) : M0(t);
}
function M0(t) {
  const { scale: e = {}, fill: r } = t, i = y0(r, e);
  if (ae(i)) {
    const o = e.isHorizontal();
    return {
      x: o ? i : null,
      y: o ? null : i
    };
  }
  return null;
}
function z0(t) {
  const { scale: e, fill: r } = t, i = e.options, o = e.getLabels().length, s = i.reverse ? e.max : e.min, a = v0(r, e, s), n = [];
  if (i.grid.circular) {
    const l = e.getPointPositionForValue(0, s);
    return new ql({
      x: l.x,
      y: l.y,
      radius: e.getDistanceFromCenterForValue(a)
    });
  }
  for (let l = 0; l < o; ++l)
    n.push(e.getPointPositionForValue(l, a));
  return n;
}
function _o(t, e, r) {
  const i = A0(e), { chart: o, index: s, line: a, scale: n, axis: l } = e, d = a.options, c = d.fill, h = d.backgroundColor, { above: u = h, below: _ = h } = c || {}, p = o.getDatasetMeta(s), f = zl(o, p);
  i && a.points.length && ($i(t, r), E0(t, {
    line: a,
    target: i,
    above: u,
    below: _,
    area: r,
    scale: n,
    axis: l,
    clip: f
  }), Oi(t));
}
function E0(t, e) {
  const { line: r, target: i, above: o, below: s, area: a, scale: n, clip: l } = e, d = r._loop ? "angle" : e.axis;
  t.save();
  let c = s;
  s !== o && (d === "x" ? (Kn(t, i, a.top), go(t, {
    line: r,
    target: i,
    color: o,
    scale: n,
    property: d,
    clip: l
  }), t.restore(), t.save(), Kn(t, i, a.bottom)) : d === "y" && (Yn(t, i, a.left), go(t, {
    line: r,
    target: i,
    color: s,
    scale: n,
    property: d,
    clip: l
  }), t.restore(), t.save(), Yn(t, i, a.right), c = o)), go(t, {
    line: r,
    target: i,
    color: c,
    scale: n,
    property: d,
    clip: l
  }), t.restore();
}
function Kn(t, e, r) {
  const { segments: i, points: o } = e;
  let s = !0, a = !1;
  t.beginPath();
  for (const n of i) {
    const { start: l, end: d } = n, c = o[l], h = o[Ni(l, d, o)];
    s ? (t.moveTo(c.x, c.y), s = !1) : (t.lineTo(c.x, r), t.lineTo(c.x, c.y)), a = !!e.pathSegment(t, n, {
      move: a
    }), a ? t.closePath() : t.lineTo(h.x, r);
  }
  t.lineTo(e.first().x, r), t.closePath(), t.clip();
}
function Yn(t, e, r) {
  const { segments: i, points: o } = e;
  let s = !0, a = !1;
  t.beginPath();
  for (const n of i) {
    const { start: l, end: d } = n, c = o[l], h = o[Ni(l, d, o)];
    s ? (t.moveTo(c.x, c.y), s = !1) : (t.lineTo(r, c.y), t.lineTo(c.x, c.y)), a = !!e.pathSegment(t, n, {
      move: a
    }), a ? t.closePath() : t.lineTo(r, h.y);
  }
  t.lineTo(r, e.first().y), t.closePath(), t.clip();
}
function go(t, e) {
  const { line: r, target: i, property: o, color: s, scale: a, clip: n } = e, l = _0(r, i, o);
  for (const { source: d, target: c, start: h, end: u } of l) {
    const { style: { backgroundColor: _ = s } = {} } = d, p = i !== !0;
    t.save(), t.fillStyle = _, L0(t, a, n, p && Fo(o, h, u)), t.beginPath();
    const f = !!r.pathSegment(t, d);
    let m;
    if (p) {
      f ? t.closePath() : qn(t, i, u, o);
      const y = !!i.pathSegment(t, c, {
        move: f,
        reverse: !0
      });
      m = f && y, m || qn(t, i, h, o);
    }
    t.closePath(), t.fill(m ? "evenodd" : "nonzero"), t.restore();
  }
}
function L0(t, e, r, i) {
  const o = e.chart.chartArea, { property: s, start: a, end: n } = i || {};
  if (s === "x" || s === "y") {
    let l, d, c, h;
    s === "x" ? (l = a, d = o.top, c = n, h = o.bottom) : (l = o.left, d = a, c = o.right, h = n), t.beginPath(), r && (l = Math.max(l, r.left), c = Math.min(c, r.right), d = Math.max(d, r.top), h = Math.min(h, r.bottom)), t.rect(l, d, c - l, h - d), t.clip();
  }
}
function qn(t, e, r, i) {
  const o = e.interpolate(r, i);
  o && t.lineTo(o.x, o.y);
}
var T0 = {
  id: "filler",
  afterDatasetsUpdate(t, e, r) {
    const i = (t.data.datasets || []).length, o = [];
    let s, a, n, l;
    for (a = 0; a < i; ++a)
      s = t.getDatasetMeta(a), n = s.dataset, l = null, n && n.options && n instanceof Xe && (l = {
        visible: t.isDatasetVisible(a),
        index: a,
        fill: f0(n, a, i),
        chart: t,
        axis: s.controller.options.indexAxis,
        scale: s.vScale,
        line: n
      }), s.$filler = l, o.push(l);
    for (a = 0; a < i; ++a)
      l = o[a], !(!l || l.fill === !1) && (l.fill = p0(o, a, r.propagate));
  },
  beforeDraw(t, e, r) {
    const i = r.drawTime === "beforeDraw", o = t.getSortedVisibleDatasetMetas(), s = t.chartArea;
    for (let a = o.length - 1; a >= 0; --a) {
      const n = o[a].$filler;
      n && (n.line.updateControlPoints(s, n.axis), i && n.fill && _o(t.ctx, n, s));
    }
  },
  beforeDatasetsDraw(t, e, r) {
    if (r.drawTime !== "beforeDatasetsDraw")
      return;
    const i = t.getSortedVisibleDatasetMetas();
    for (let o = i.length - 1; o >= 0; --o) {
      const s = i[o].$filler;
      Un(s) && _o(t.ctx, s, t.chartArea);
    }
  },
  beforeDatasetDraw(t, e, r) {
    const i = e.meta.$filler;
    !Un(i) || r.drawTime !== "beforeDatasetDraw" || _o(t.ctx, i, t.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Xn = (t, e) => {
  let { boxHeight: r = e, boxWidth: i = e } = t;
  return t.usePointStyle && (r = Math.min(r, e), i = t.pointStyleWidth || Math.min(i, e)), {
    boxWidth: i,
    boxHeight: r,
    itemHeight: Math.max(e, r)
  };
}, D0 = (t, e) => t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
class Zn extends Ee {
  constructor(e) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, r, i) {
    this.maxWidth = e, this.maxHeight = r, this._margins = i, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const e = this.options.labels || {};
    let r = te(e.generateLabels, [
      this.chart
    ], this) || [];
    e.filter && (r = r.filter((i) => e.filter(i, this.chart.data))), e.sort && (r = r.sort((i, o) => e.sort(i, o, this.chart.data))), this.options.reverse && r.reverse(), this.legendItems = r;
  }
  fit() {
    const { options: e, ctx: r } = this;
    if (!e.display) {
      this.width = this.height = 0;
      return;
    }
    const i = e.labels, o = he(i.font), s = o.size, a = this._computeTitleHeight(), { boxWidth: n, itemHeight: l } = Xn(i, s);
    let d, c;
    r.font = o.string, this.isHorizontal() ? (d = this.maxWidth, c = this._fitRows(a, s, n, l) + 10) : (c = this.maxHeight, d = this._fitCols(a, o, n, l) + 10), this.width = Math.min(d, e.maxWidth || this.maxWidth), this.height = Math.min(c, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, r, i, o) {
    const { ctx: s, maxWidth: a, options: { labels: { padding: n } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], c = o + n;
    let h = e;
    s.textAlign = "left", s.textBaseline = "middle";
    let u = -1, _ = -c;
    return this.legendItems.forEach((p, f) => {
      const m = i + r / 2 + s.measureText(p.text).width;
      (f === 0 || d[d.length - 1] + m + 2 * n > a) && (h += c, d[d.length - (f > 0 ? 0 : 1)] = 0, _ += c, u++), l[f] = {
        left: 0,
        top: _,
        row: u,
        width: m,
        height: o
      }, d[d.length - 1] += m + n;
    }), h;
  }
  _fitCols(e, r, i, o) {
    const { ctx: s, maxHeight: a, options: { labels: { padding: n } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], c = a - e;
    let h = n, u = 0, _ = 0, p = 0, f = 0;
    return this.legendItems.forEach((m, y) => {
      const { itemWidth: g, itemHeight: v } = $0(i, r, s, m, o);
      y > 0 && _ + v + 2 * n > c && (h += u + n, d.push({
        width: u,
        height: _
      }), p += u + n, f++, u = _ = 0), l[y] = {
        left: p,
        top: _,
        col: f,
        width: g,
        height: v
      }, u = Math.max(u, g), _ += v + n;
    }), h += u, d.push({
      width: u,
      height: _
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: r, options: { align: i, labels: { padding: o }, rtl: s } } = this, a = Ht(s, this.left, this.width);
    if (this.isHorizontal()) {
      let n = 0, l = fe(i, this.left + o, this.right - this.lineWidths[n]);
      for (const d of r)
        n !== d.row && (n = d.row, l = fe(i, this.left + o, this.right - this.lineWidths[n])), d.top += this.top + e + o, d.left = a.leftForLtr(a.x(l), d.width), l += d.width + o;
    } else {
      let n = 0, l = fe(i, this.top + e + o, this.bottom - this.columnSizes[n].height);
      for (const d of r)
        d.col !== n && (n = d.col, l = fe(i, this.top + e + o, this.bottom - this.columnSizes[n].height)), d.top = l, d.left += this.left + o, d.left = a.leftForLtr(a.x(d.left), d.width), l += d.height + o;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const e = this.ctx;
      $i(e, this), this._draw(), Oi(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: r, lineWidths: i, ctx: o } = this, { align: s, labels: a } = e, n = ne.color, l = Ht(e.rtl, this.left, this.width), d = he(a.font), { padding: c } = a, h = d.size, u = h / 2;
    let _;
    this.drawTitle(), o.textAlign = l.textAlign("left"), o.textBaseline = "middle", o.lineWidth = 0.5, o.font = d.string;
    const { boxWidth: p, boxHeight: f, itemHeight: m } = Xn(a, h), y = function(S, P, x) {
      if (isNaN(p) || p <= 0 || isNaN(f) || f < 0)
        return;
      o.save();
      const E = W(x.lineWidth, 1);
      if (o.fillStyle = W(x.fillStyle, n), o.lineCap = W(x.lineCap, "butt"), o.lineDashOffset = W(x.lineDashOffset, 0), o.lineJoin = W(x.lineJoin, "miter"), o.lineWidth = E, o.strokeStyle = W(x.strokeStyle, n), o.setLineDash(W(x.lineDash, [])), a.usePointStyle) {
        const L = {
          radius: f * Math.SQRT2 / 2,
          pointStyle: x.pointStyle,
          rotation: x.rotation,
          borderWidth: E
        }, z = l.xPlus(S, p / 2), C = P + u;
        fl(o, L, z, C, a.pointStyleWidth && p);
      } else {
        const L = P + Math.max((h - f) / 2, 0), z = l.leftForLtr(S, p), C = xt(x.borderRadius);
        o.beginPath(), Object.values(C).some(($) => $ !== 0) ? Tr(o, {
          x: z,
          y: L,
          w: p,
          h: f,
          radius: C
        }) : o.rect(z, L, p, f), o.fill(), E !== 0 && o.stroke();
      }
      o.restore();
    }, g = function(S, P, x) {
      Mt(o, x.text, S, P + m / 2, d, {
        strikethrough: x.hidden,
        textAlign: l.textAlign(x.textAlign)
      });
    }, v = this.isHorizontal(), k = this._computeTitleHeight();
    v ? _ = {
      x: fe(s, this.left + c, this.right - i[0]),
      y: this.top + c + k,
      line: 0
    } : _ = {
      x: this.left + c,
      y: fe(s, this.top + k + c, this.bottom - r[0].height),
      line: 0
    }, Sl(this.ctx, e.textDirection);
    const w = m + c;
    this.legendItems.forEach((S, P) => {
      o.strokeStyle = S.fontColor, o.fillStyle = S.fontColor;
      const x = o.measureText(S.text).width, E = l.textAlign(S.textAlign || (S.textAlign = a.textAlign)), L = p + u + x;
      let z = _.x, C = _.y;
      l.setWidth(this.width), v ? P > 0 && z + L + c > this.right && (C = _.y += w, _.line++, z = _.x = fe(s, this.left + c, this.right - i[_.line])) : P > 0 && C + w > this.bottom && (z = _.x = z + r[_.line].width + c, _.line++, C = _.y = fe(s, this.top + k + c, this.bottom - r[_.line].height));
      const $ = l.x(z);
      if (y($, C, S), z = Ju(E, z + p + u, v ? z + L : this.right, e.rtl), g(l.x(z), C, S), v)
        _.x += L + c;
      else if (typeof S.text != "string") {
        const M = d.lineHeight;
        _.y += Xl(S, M) + c;
      } else
        _.y += w;
    }), Al(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, r = e.title, i = he(r.font), o = ve(r.padding);
    if (!r.display)
      return;
    const s = Ht(e.rtl, this.left, this.width), a = this.ctx, n = r.position, l = i.size / 2, d = o.top + l;
    let c, h = this.left, u = this.width;
    if (this.isHorizontal())
      u = Math.max(...this.lineWidths), c = this.top + d, h = fe(e.align, h, this.right - u);
    else {
      const p = this.columnSizes.reduce((f, m) => Math.max(f, m.height), 0);
      c = d + fe(e.align, this.top, this.bottom - p - e.labels.padding - this._computeTitleHeight());
    }
    const _ = fe(n, h, h + u);
    a.textAlign = s.textAlign(ss(n)), a.textBaseline = "middle", a.strokeStyle = r.color, a.fillStyle = r.color, a.font = i.string, Mt(a, r.text, _, c, i);
  }
  _computeTitleHeight() {
    const e = this.options.title, r = he(e.font), i = ve(e.padding);
    return e.display ? r.lineHeight + i.height : 0;
  }
  _getLegendItemAt(e, r) {
    let i, o, s;
    if (je(e, this.left, this.right) && je(r, this.top, this.bottom)) {
      for (s = this.legendHitBoxes, i = 0; i < s.length; ++i)
        if (o = s[i], je(e, o.left, o.left + o.width) && je(r, o.top, o.top + o.height))
          return this.legendItems[i];
    }
    return null;
  }
  handleEvent(e) {
    const r = this.options;
    if (!R0(e.type, r))
      return;
    const i = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const o = this._hoveredItem, s = D0(o, i);
      o && !s && te(r.onLeave, [
        e,
        o,
        this
      ], this), this._hoveredItem = i, i && !s && te(r.onHover, [
        e,
        i,
        this
      ], this);
    } else i && te(r.onClick, [
      e,
      i,
      this
    ], this);
  }
}
function $0(t, e, r, i, o) {
  const s = O0(i, t, e, r), a = I0(o, i, e.lineHeight);
  return {
    itemWidth: s,
    itemHeight: a
  };
}
function O0(t, e, r, i) {
  let o = t.text;
  return o && typeof o != "string" && (o = o.reduce((s, a) => s.length > a.length ? s : a)), e + r.size / 2 + i.measureText(o).width;
}
function I0(t, e, r) {
  let i = t;
  return typeof e.text != "string" && (i = Xl(e, r)), i;
}
function Xl(t, e) {
  const r = t.text ? t.text.length : 0;
  return e * r;
}
function R0(t, e) {
  return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
}
var Zl = {
  id: "legend",
  _element: Zn,
  start(t, e, r) {
    const i = t.legend = new Zn({
      ctx: t.ctx,
      options: r,
      chart: t
    });
    ye.configure(t, i, r), ye.addBox(t, i);
  },
  stop(t) {
    ye.removeBox(t, t.legend), delete t.legend;
  },
  beforeUpdate(t, e, r) {
    const i = t.legend;
    ye.configure(t, i, r), i.options = r;
  },
  afterUpdate(t) {
    const e = t.legend;
    e.buildLabels(), e.adjustHitBoxes();
  },
  afterEvent(t, e) {
    e.replay || t.legend.handleEvent(e.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(t, e, r) {
      const i = e.datasetIndex, o = r.chart;
      o.isDatasetVisible(i) ? (o.hide(i), e.hidden = !0) : (o.show(i), e.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (t) => t.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(t) {
        const e = t.data.datasets, { labels: { usePointStyle: r, pointStyle: i, textAlign: o, color: s, useBorderRadius: a, borderRadius: n } } = t.legend.options;
        return t._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(r ? 0 : void 0), c = ve(d.borderWidth);
          return {
            text: e[l.index].label,
            fillStyle: d.backgroundColor,
            fontColor: s,
            hidden: !l.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (c.width + c.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: i || d.pointStyle,
            rotation: d.rotation,
            textAlign: o || d.textAlign,
            borderRadius: a && (n || d.borderRadius),
            datasetIndex: l.index
          };
        }, this);
      }
    },
    title: {
      color: (t) => t.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (t) => !t.startsWith("on"),
    labels: {
      _scriptable: (t) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(t)
    }
  }
};
class gs extends Ee {
  constructor(e) {
    super(), this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, r) {
    const i = this.options;
    if (this.left = 0, this.top = 0, !i.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = e, this.height = this.bottom = r;
    const o = se(i.text) ? i.text.length : 1;
    this._padding = ve(i.padding);
    const s = o * he(i.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = s : this.width = s;
  }
  isHorizontal() {
    const e = this.options.position;
    return e === "top" || e === "bottom";
  }
  _drawArgs(e) {
    const { top: r, left: i, bottom: o, right: s, options: a } = this, n = a.align;
    let l = 0, d, c, h;
    return this.isHorizontal() ? (c = fe(n, i, s), h = r + e, d = s - i) : (a.position === "left" ? (c = i + e, h = fe(n, o, r), l = Q * -0.5) : (c = s - e, h = fe(n, r, o), l = Q * 0.5), d = o - r), {
      titleX: c,
      titleY: h,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const e = this.ctx, r = this.options;
    if (!r.display)
      return;
    const i = he(r.font), s = i.lineHeight / 2 + this._padding.top, { titleX: a, titleY: n, maxWidth: l, rotation: d } = this._drawArgs(s);
    Mt(e, r.text, 0, 0, i, {
      color: r.color,
      maxWidth: l,
      rotation: d,
      textAlign: ss(r.align),
      textBaseline: "middle",
      translation: [
        a,
        n
      ]
    });
  }
}
function N0(t, e) {
  const r = new gs({
    ctx: t.ctx,
    options: e,
    chart: t
  });
  ye.configure(t, r, e), ye.addBox(t, r), t.titleBlock = r;
}
var B0 = {
  id: "title",
  _element: gs,
  start(t, e, r) {
    N0(t, r);
  },
  stop(t) {
    const e = t.titleBlock;
    ye.removeBox(t, e), delete t.titleBlock;
  },
  beforeUpdate(t, e, r) {
    const i = t.titleBlock;
    ye.configure(t, i, r), i.options = r;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const Jr = /* @__PURE__ */ new WeakMap();
var H0 = {
  id: "subtitle",
  start(t, e, r) {
    const i = new gs({
      ctx: t.ctx,
      options: r,
      chart: t
    });
    ye.configure(t, i, r), ye.addBox(t, i), Jr.set(t, i);
  },
  stop(t) {
    ye.removeBox(t, Jr.get(t)), Jr.delete(t);
  },
  beforeUpdate(t, e, r) {
    const i = Jr.get(t);
    ye.configure(t, i, r), i.options = r;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const ur = {
  average(t) {
    if (!t.length)
      return !1;
    let e, r, i = /* @__PURE__ */ new Set(), o = 0, s = 0;
    for (e = 0, r = t.length; e < r; ++e) {
      const n = t[e].element;
      if (n && n.hasValue()) {
        const l = n.tooltipPosition();
        i.add(l.x), o += l.y, ++s;
      }
    }
    return s === 0 || i.size === 0 ? !1 : {
      x: [
        ...i
      ].reduce((n, l) => n + l) / i.size,
      y: o / s
    };
  },
  nearest(t, e) {
    if (!t.length)
      return !1;
    let r = e.x, i = e.y, o = Number.POSITIVE_INFINITY, s, a, n;
    for (s = 0, a = t.length; s < a; ++s) {
      const l = t[s].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), c = $o(e, d);
        c < o && (o = c, n = l);
      }
    }
    if (n) {
      const l = n.tooltipPosition();
      r = l.x, i = l.y;
    }
    return {
      x: r,
      y: i
    };
  }
};
function Le(t, e) {
  return e && (se(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
}
function Ne(t) {
  return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
}
function j0(t, e) {
  const { element: r, datasetIndex: i, index: o } = e, s = t.getDatasetMeta(i).controller, { label: a, value: n } = s.getLabelAndValue(o);
  return {
    chart: t,
    label: a,
    parsed: s.getParsed(o),
    raw: t.data.datasets[i].data[o],
    formattedValue: n,
    dataset: s.getDataset(),
    dataIndex: o,
    datasetIndex: i,
    element: r
  };
}
function Qn(t, e) {
  const r = t.chart.ctx, { body: i, footer: o, title: s } = t, { boxWidth: a, boxHeight: n } = e, l = he(e.bodyFont), d = he(e.titleFont), c = he(e.footerFont), h = s.length, u = o.length, _ = i.length, p = ve(e.padding);
  let f = p.height, m = 0, y = i.reduce((k, w) => k + w.before.length + w.lines.length + w.after.length, 0);
  if (y += t.beforeBody.length + t.afterBody.length, h && (f += h * d.lineHeight + (h - 1) * e.titleSpacing + e.titleMarginBottom), y) {
    const k = e.displayColors ? Math.max(n, l.lineHeight) : l.lineHeight;
    f += _ * k + (y - _) * l.lineHeight + (y - 1) * e.bodySpacing;
  }
  u && (f += e.footerMarginTop + u * c.lineHeight + (u - 1) * e.footerSpacing);
  let g = 0;
  const v = function(k) {
    m = Math.max(m, r.measureText(k).width + g);
  };
  return r.save(), r.font = d.string, ee(t.title, v), r.font = l.string, ee(t.beforeBody.concat(t.afterBody), v), g = e.displayColors ? a + 2 + e.boxPadding : 0, ee(i, (k) => {
    ee(k.before, v), ee(k.lines, v), ee(k.after, v);
  }), g = 0, r.font = c.string, ee(t.footer, v), r.restore(), m += p.width, {
    width: m,
    height: f
  };
}
function F0(t, e) {
  const { y: r, height: i } = e;
  return r < i / 2 ? "top" : r > t.height - i / 2 ? "bottom" : "center";
}
function V0(t, e, r, i) {
  const { x: o, width: s } = i, a = r.caretSize + r.caretPadding;
  if (t === "left" && o + s + a > e.width || t === "right" && o - s - a < 0)
    return !0;
}
function G0(t, e, r, i) {
  const { x: o, width: s } = r, { width: a, chartArea: { left: n, right: l } } = t;
  let d = "center";
  return i === "center" ? d = o <= (n + l) / 2 ? "left" : "right" : o <= s / 2 ? d = "left" : o >= a - s / 2 && (d = "right"), V0(d, t, e, r) && (d = "center"), d;
}
function Jn(t, e, r) {
  const i = r.yAlign || e.yAlign || F0(t, r);
  return {
    xAlign: r.xAlign || e.xAlign || G0(t, e, r, i),
    yAlign: i
  };
}
function W0(t, e) {
  let { x: r, width: i } = t;
  return e === "right" ? r -= i : e === "center" && (r -= i / 2), r;
}
function U0(t, e, r) {
  let { y: i, height: o } = t;
  return e === "top" ? i += r : e === "bottom" ? i -= o + r : i -= o / 2, i;
}
function ea(t, e, r, i) {
  const { caretSize: o, caretPadding: s, cornerRadius: a } = t, { xAlign: n, yAlign: l } = r, d = o + s, { topLeft: c, topRight: h, bottomLeft: u, bottomRight: _ } = xt(a);
  let p = W0(e, n);
  const f = U0(e, l, d);
  return l === "center" ? n === "left" ? p += d : n === "right" && (p -= d) : n === "left" ? p -= Math.max(c, u) + o : n === "right" && (p += Math.max(h, _) + o), {
    x: _e(p, 0, i.width - e.width),
    y: _e(f, 0, i.height - e.height)
  };
}
function ei(t, e, r) {
  const i = ve(r.padding);
  return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - i.right : t.x + i.left;
}
function ta(t) {
  return Le([], Ne(t));
}
function K0(t, e, r) {
  return at(t, {
    tooltip: e,
    tooltipItems: r,
    type: "tooltip"
  });
}
function ra(t, e) {
  const r = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return r ? t.override(r) : t;
}
const Ql = {
  beforeTitle: Ie,
  title(t) {
    if (t.length > 0) {
      const e = t[0], r = e.chart.data.labels, i = r ? r.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return e.dataset.label || "";
      if (e.label)
        return e.label;
      if (i > 0 && e.dataIndex < i)
        return r[e.dataIndex];
    }
    return "";
  },
  afterTitle: Ie,
  beforeBody: Ie,
  beforeLabel: Ie,
  label(t) {
    if (this && this.options && this.options.mode === "dataset")
      return t.label + ": " + t.formattedValue || t.formattedValue;
    let e = t.dataset.label || "";
    e && (e += ": ");
    const r = t.formattedValue;
    return K(r) || (e += r), e;
  },
  labelColor(t) {
    const r = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
    return {
      borderColor: r.borderColor,
      backgroundColor: r.backgroundColor,
      borderWidth: r.borderWidth,
      borderDash: r.borderDash,
      borderDashOffset: r.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(t) {
    const r = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
    return {
      pointStyle: r.pointStyle,
      rotation: r.rotation
    };
  },
  afterLabel: Ie,
  afterBody: Ie,
  beforeFooter: Ie,
  footer: Ie,
  afterFooter: Ie
};
function we(t, e, r, i) {
  const o = t[e].call(r, i);
  return typeof o > "u" ? Ql[e].call(r, i) : o;
}
class Vo extends Ee {
  constructor(e) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = e.chart, this.options = e.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(e) {
    this.options = e, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const e = this._cachedAnimations;
    if (e)
      return e;
    const r = this.chart, i = this.options.setContext(this.getContext()), o = i.enabled && r.options.animation && i.animations, s = new El(this.chart, o);
    return o._cacheable && (this._cachedAnimations = Object.freeze(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = K0(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, r) {
    const { callbacks: i } = r, o = we(i, "beforeTitle", this, e), s = we(i, "title", this, e), a = we(i, "afterTitle", this, e);
    let n = [];
    return n = Le(n, Ne(o)), n = Le(n, Ne(s)), n = Le(n, Ne(a)), n;
  }
  getBeforeBody(e, r) {
    return ta(we(r.callbacks, "beforeBody", this, e));
  }
  getBody(e, r) {
    const { callbacks: i } = r, o = [];
    return ee(e, (s) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, n = ra(i, s);
      Le(a.before, Ne(we(n, "beforeLabel", this, s))), Le(a.lines, we(n, "label", this, s)), Le(a.after, Ne(we(n, "afterLabel", this, s))), o.push(a);
    }), o;
  }
  getAfterBody(e, r) {
    return ta(we(r.callbacks, "afterBody", this, e));
  }
  getFooter(e, r) {
    const { callbacks: i } = r, o = we(i, "beforeFooter", this, e), s = we(i, "footer", this, e), a = we(i, "afterFooter", this, e);
    let n = [];
    return n = Le(n, Ne(o)), n = Le(n, Ne(s)), n = Le(n, Ne(a)), n;
  }
  _createItems(e) {
    const r = this._active, i = this.chart.data, o = [], s = [], a = [];
    let n = [], l, d;
    for (l = 0, d = r.length; l < d; ++l)
      n.push(j0(this.chart, r[l]));
    return e.filter && (n = n.filter((c, h, u) => e.filter(c, h, u, i))), e.itemSort && (n = n.sort((c, h) => e.itemSort(c, h, i))), ee(n, (c) => {
      const h = ra(e.callbacks, c);
      o.push(we(h, "labelColor", this, c)), s.push(we(h, "labelPointStyle", this, c)), a.push(we(h, "labelTextColor", this, c));
    }), this.labelColors = o, this.labelPointStyles = s, this.labelTextColors = a, this.dataPoints = n, n;
  }
  update(e, r) {
    const i = this.options.setContext(this.getContext()), o = this._active;
    let s, a = [];
    if (!o.length)
      this.opacity !== 0 && (s = {
        opacity: 0
      });
    else {
      const n = ur[i.position].call(this, o, this._eventPosition);
      a = this._createItems(i), this.title = this.getTitle(a, i), this.beforeBody = this.getBeforeBody(a, i), this.body = this.getBody(a, i), this.afterBody = this.getAfterBody(a, i), this.footer = this.getFooter(a, i);
      const l = this._size = Qn(this, i), d = Object.assign({}, n, l), c = Jn(this.chart, i, d), h = ea(i, d, c, this.chart);
      this.xAlign = c.xAlign, this.yAlign = c.yAlign, s = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: l.width,
        height: l.height,
        caretX: n.x,
        caretY: n.y
      };
    }
    this._tooltipItems = a, this.$context = void 0, s && this._resolveAnimations().update(this, s), e && i.external && i.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: r
    });
  }
  drawCaret(e, r, i, o) {
    const s = this.getCaretPosition(e, i, o);
    r.lineTo(s.x1, s.y1), r.lineTo(s.x2, s.y2), r.lineTo(s.x3, s.y3);
  }
  getCaretPosition(e, r, i) {
    const { xAlign: o, yAlign: s } = this, { caretSize: a, cornerRadius: n } = i, { topLeft: l, topRight: d, bottomLeft: c, bottomRight: h } = xt(n), { x: u, y: _ } = e, { width: p, height: f } = r;
    let m, y, g, v, k, w;
    return s === "center" ? (k = _ + f / 2, o === "left" ? (m = u, y = m - a, v = k + a, w = k - a) : (m = u + p, y = m + a, v = k - a, w = k + a), g = m) : (o === "left" ? y = u + Math.max(l, c) + a : o === "right" ? y = u + p - Math.max(d, h) - a : y = this.caretX, s === "top" ? (v = _, k = v - a, m = y - a, g = y + a) : (v = _ + f, k = v + a, m = y + a, g = y - a), w = v), {
      x1: m,
      x2: y,
      x3: g,
      y1: v,
      y2: k,
      y3: w
    };
  }
  drawTitle(e, r, i) {
    const o = this.title, s = o.length;
    let a, n, l;
    if (s) {
      const d = Ht(i.rtl, this.x, this.width);
      for (e.x = ei(this, i.titleAlign, i), r.textAlign = d.textAlign(i.titleAlign), r.textBaseline = "middle", a = he(i.titleFont), n = i.titleSpacing, r.fillStyle = i.titleColor, r.font = a.string, l = 0; l < s; ++l)
        r.fillText(o[l], d.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + n, l + 1 === s && (e.y += i.titleMarginBottom - n);
    }
  }
  _drawColorBox(e, r, i, o, s) {
    const a = this.labelColors[i], n = this.labelPointStyles[i], { boxHeight: l, boxWidth: d } = s, c = he(s.bodyFont), h = ei(this, "left", s), u = o.x(h), _ = l < c.lineHeight ? (c.lineHeight - l) / 2 : 0, p = r.y + _;
    if (s.usePointStyle) {
      const f = {
        radius: Math.min(d, l) / 2,
        pointStyle: n.pointStyle,
        rotation: n.rotation,
        borderWidth: 1
      }, m = o.leftForLtr(u, d) + d / 2, y = p + l / 2;
      e.strokeStyle = s.multiKeyBackground, e.fillStyle = s.multiKeyBackground, Io(e, f, m, y), e.strokeStyle = a.borderColor, e.fillStyle = a.backgroundColor, Io(e, f, m, y);
    } else {
      e.lineWidth = Y(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, e.strokeStyle = a.borderColor, e.setLineDash(a.borderDash || []), e.lineDashOffset = a.borderDashOffset || 0;
      const f = o.leftForLtr(u, d), m = o.leftForLtr(o.xPlus(u, 1), d - 2), y = xt(a.borderRadius);
      Object.values(y).some((g) => g !== 0) ? (e.beginPath(), e.fillStyle = s.multiKeyBackground, Tr(e, {
        x: f,
        y: p,
        w: d,
        h: l,
        radius: y
      }), e.fill(), e.stroke(), e.fillStyle = a.backgroundColor, e.beginPath(), Tr(e, {
        x: m,
        y: p + 1,
        w: d - 2,
        h: l - 2,
        radius: y
      }), e.fill()) : (e.fillStyle = s.multiKeyBackground, e.fillRect(f, p, d, l), e.strokeRect(f, p, d, l), e.fillStyle = a.backgroundColor, e.fillRect(m, p + 1, d - 2, l - 2));
    }
    e.fillStyle = this.labelTextColors[i];
  }
  drawBody(e, r, i) {
    const { body: o } = this, { bodySpacing: s, bodyAlign: a, displayColors: n, boxHeight: l, boxWidth: d, boxPadding: c } = i, h = he(i.bodyFont);
    let u = h.lineHeight, _ = 0;
    const p = Ht(i.rtl, this.x, this.width), f = function(x) {
      r.fillText(x, p.x(e.x + _), e.y + u / 2), e.y += u + s;
    }, m = p.textAlign(a);
    let y, g, v, k, w, S, P;
    for (r.textAlign = a, r.textBaseline = "middle", r.font = h.string, e.x = ei(this, m, i), r.fillStyle = i.bodyColor, ee(this.beforeBody, f), _ = n && m !== "right" ? a === "center" ? d / 2 + c : d + 2 + c : 0, k = 0, S = o.length; k < S; ++k) {
      for (y = o[k], g = this.labelTextColors[k], r.fillStyle = g, ee(y.before, f), v = y.lines, n && v.length && (this._drawColorBox(r, e, k, p, i), u = Math.max(h.lineHeight, l)), w = 0, P = v.length; w < P; ++w)
        f(v[w]), u = h.lineHeight;
      ee(y.after, f);
    }
    _ = 0, u = h.lineHeight, ee(this.afterBody, f), e.y -= s;
  }
  drawFooter(e, r, i) {
    const o = this.footer, s = o.length;
    let a, n;
    if (s) {
      const l = Ht(i.rtl, this.x, this.width);
      for (e.x = ei(this, i.footerAlign, i), e.y += i.footerMarginTop, r.textAlign = l.textAlign(i.footerAlign), r.textBaseline = "middle", a = he(i.footerFont), r.fillStyle = i.footerColor, r.font = a.string, n = 0; n < s; ++n)
        r.fillText(o[n], l.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + i.footerSpacing;
    }
  }
  drawBackground(e, r, i, o) {
    const { xAlign: s, yAlign: a } = this, { x: n, y: l } = e, { width: d, height: c } = i, { topLeft: h, topRight: u, bottomLeft: _, bottomRight: p } = xt(o.cornerRadius);
    r.fillStyle = o.backgroundColor, r.strokeStyle = o.borderColor, r.lineWidth = o.borderWidth, r.beginPath(), r.moveTo(n + h, l), a === "top" && this.drawCaret(e, r, i, o), r.lineTo(n + d - u, l), r.quadraticCurveTo(n + d, l, n + d, l + u), a === "center" && s === "right" && this.drawCaret(e, r, i, o), r.lineTo(n + d, l + c - p), r.quadraticCurveTo(n + d, l + c, n + d - p, l + c), a === "bottom" && this.drawCaret(e, r, i, o), r.lineTo(n + _, l + c), r.quadraticCurveTo(n, l + c, n, l + c - _), a === "center" && s === "left" && this.drawCaret(e, r, i, o), r.lineTo(n, l + h), r.quadraticCurveTo(n, l, n + h, l), r.closePath(), r.fill(), o.borderWidth > 0 && r.stroke();
  }
  _updateAnimationTarget(e) {
    const r = this.chart, i = this.$animations, o = i && i.x, s = i && i.y;
    if (o || s) {
      const a = ur[e.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const n = this._size = Qn(this, e), l = Object.assign({}, a, this._size), d = Jn(r, e, l), c = ea(e, l, d, r);
      (o._to !== c.x || s._to !== c.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = n.width, this.height = n.height, this.caretX = a.x, this.caretY = a.y, this._resolveAnimations().update(this, c));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(e) {
    const r = this.options.setContext(this.getContext());
    let i = this.opacity;
    if (!i)
      return;
    this._updateAnimationTarget(r);
    const o = {
      width: this.width,
      height: this.height
    }, s = {
      x: this.x,
      y: this.y
    };
    i = Math.abs(i) < 1e-3 ? 0 : i;
    const a = ve(r.padding), n = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    r.enabled && n && (e.save(), e.globalAlpha = i, this.drawBackground(s, e, o, r), Sl(e, r.textDirection), s.y += a.top, this.drawTitle(s, e, r), this.drawBody(s, e, r), this.drawFooter(s, e, r), Al(e, r.textDirection), e.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e, r) {
    const i = this._active, o = e.map(({ datasetIndex: n, index: l }) => {
      const d = this.chart.getDatasetMeta(n);
      if (!d)
        throw new Error("Cannot find a dataset at index " + n);
      return {
        datasetIndex: n,
        element: d.data[l],
        index: l
      };
    }), s = !vi(i, o), a = this._positionChanged(o, r);
    (s || a) && (this._active = o, this._eventPosition = r, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, r, i = !0) {
    if (r && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const o = this.options, s = this._active || [], a = this._getActiveElements(e, s, r, i), n = this._positionChanged(a, e), l = r || !vi(a, s) || n;
    return l && (this._active = a, (o.enabled || o.external) && (this._eventPosition = {
      x: e.x,
      y: e.y
    }, this.update(!0, r))), l;
  }
  _getActiveElements(e, r, i, o) {
    const s = this.options;
    if (e.type === "mouseout")
      return [];
    if (!o)
      return r.filter((n) => this.chart.data.datasets[n.datasetIndex] && this.chart.getDatasetMeta(n.datasetIndex).controller.getParsed(n.index) !== void 0);
    const a = this.chart.getElementsAtEventForMode(e, s.mode, s, i);
    return s.reverse && a.reverse(), a;
  }
  _positionChanged(e, r) {
    const { caretX: i, caretY: o, options: s } = this, a = ur[s.position].call(this, e, r);
    return a !== !1 && (i !== a.x || o !== a.y);
  }
}
N(Vo, "positioners", ur);
var Jl = {
  id: "tooltip",
  _element: Vo,
  positioners: ur,
  afterInit(t, e, r) {
    r && (t.tooltip = new Vo({
      chart: t,
      options: r
    }));
  },
  beforeUpdate(t, e, r) {
    t.tooltip && t.tooltip.initialize(r);
  },
  reset(t, e, r) {
    t.tooltip && t.tooltip.initialize(r);
  },
  afterDraw(t) {
    const e = t.tooltip;
    if (e && e._willRender()) {
      const r = {
        tooltip: e
      };
      if (t.notifyPlugins("beforeTooltipDraw", {
        ...r,
        cancelable: !0
      }) === !1)
        return;
      e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", r);
    }
  },
  afterEvent(t, e) {
    if (t.tooltip) {
      const r = e.replay;
      t.tooltip.handleEvent(e.event, r, e.inChartArea) && (e.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (t, e) => e.bodyFont.size,
    boxWidth: (t, e) => e.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Ql
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (t) => t !== "filter" && t !== "itemSort" && t !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, Y0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: l0,
  Decimation: u0,
  Filler: T0,
  Legend: Zl,
  SubTitle: H0,
  Title: B0,
  Tooltip: Jl
});
const q0 = (t, e, r, i) => (typeof e == "string" ? (r = t.push(e) - 1, i.unshift({
  index: r,
  label: e
})) : isNaN(e) && (r = null), r);
function X0(t, e, r, i) {
  const o = t.indexOf(e);
  if (o === -1)
    return q0(t, e, r, i);
  const s = t.lastIndexOf(e);
  return o !== s ? r : o;
}
const Z0 = (t, e) => t === null ? null : _e(Math.round(t), 0, e);
function ia(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class Go extends Lt {
  constructor(e) {
    super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(e) {
    const r = this._addedLabels;
    if (r.length) {
      const i = this.getLabels();
      for (const { index: o, label: s } of r)
        i[o] === s && i.splice(o, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, r) {
    if (K(e))
      return null;
    const i = this.getLabels();
    return r = isFinite(r) && i[r] === e ? r : X0(i, e, W(r, e), this._addedLabels), Z0(r, i.length - 1);
  }
  determineDataLimits() {
    const { minDefined: e, maxDefined: r } = this.getUserBounds();
    let { min: i, max: o } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (e || (i = 0), r || (o = this.getLabels().length - 1)), this.min = i, this.max = o;
  }
  buildTicks() {
    const e = this.min, r = this.max, i = this.options.offset, o = [];
    let s = this.getLabels();
    s = e === 0 && r === s.length - 1 ? s : s.slice(e, r + 1), this._valueRange = Math.max(s.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? 0.5 : 0);
    for (let a = e; a <= r; a++)
      o.push({
        value: a
      });
    return o;
  }
  getLabelForValue(e) {
    return ia.call(this, e);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(e) {
    return typeof e != "number" && (e = this.parse(e)), e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getPixelForTick(e) {
    const r = this.ticks;
    return e < 0 || e > r.length - 1 ? null : this.getPixelForValue(r[e].value);
  }
  getValueForPixel(e) {
    return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
N(Go, "id", "category"), N(Go, "defaults", {
  ticks: {
    callback: ia
  }
});
function Q0(t, e) {
  const r = [], { bounds: o, step: s, min: a, max: n, precision: l, count: d, maxTicks: c, maxDigits: h, includeBounds: u } = t, _ = s || 1, p = c - 1, { min: f, max: m } = e, y = !K(a), g = !K(n), v = !K(d), k = (m - f) / (h + 1);
  let w = Zs((m - f) / p / _) * _, S, P, x, E;
  if (w < 1e-14 && !y && !g)
    return [
      {
        value: f
      },
      {
        value: m
      }
    ];
  E = Math.ceil(m / w) - Math.floor(f / w), E > p && (w = Zs(E * w / p / _) * _), K(l) || (S = Math.pow(10, l), w = Math.ceil(w * S) / S), o === "ticks" ? (P = Math.floor(f / w) * w, x = Math.ceil(m / w) * w) : (P = f, x = m), y && g && s && Uu((n - a) / s, w / 1e3) ? (E = Math.round(Math.min((n - a) / w, c)), w = (n - a) / E, P = a, x = n) : v ? (P = y ? a : P, x = g ? n : x, E = d - 1, w = (x - P) / E) : (E = (x - P) / w, yr(E, Math.round(E), w / 1e3) ? E = Math.round(E) : E = Math.ceil(E));
  const L = Math.max(Qs(w), Qs(P));
  S = Math.pow(10, K(l) ? L : l), P = Math.round(P * S) / S, x = Math.round(x * S) / S;
  let z = 0;
  for (y && (u && P !== a ? (r.push({
    value: a
  }), P < a && z++, yr(Math.round((P + z * w) * S) / S, a, oa(a, k, t)) && z++) : P < a && z++); z < E; ++z) {
    const C = Math.round((P + z * w) * S) / S;
    if (g && C > n)
      break;
    r.push({
      value: C
    });
  }
  return g && u && x !== n ? r.length && yr(r[r.length - 1].value, n, oa(n, k, t)) ? r[r.length - 1].value = n : r.push({
    value: n
  }) : (!g || x === n) && r.push({
    value: x
  }), r;
}
function oa(t, e, { horizontal: r, minRotation: i }) {
  const o = Me(i), s = (r ? Math.sin(o) : Math.cos(o)) || 1e-3, a = 0.75 * e * ("" + t).length;
  return Math.min(e / s, a);
}
class Pi extends Lt {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(e, r) {
    return K(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
  }
  handleTickRangeOptions() {
    const { beginAtZero: e } = this.options, { minDefined: r, maxDefined: i } = this.getUserBounds();
    let { min: o, max: s } = this;
    const a = (l) => o = r ? o : l, n = (l) => s = i ? s : l;
    if (e) {
      const l = Oe(o), d = Oe(s);
      l < 0 && d < 0 ? n(0) : l > 0 && d > 0 && a(0);
    }
    if (o === s) {
      let l = s === 0 ? 1 : Math.abs(s * 0.05);
      n(s + l), e || a(o - l);
    }
    this.min = o, this.max = s;
  }
  getTickLimit() {
    const e = this.options.ticks;
    let { maxTicksLimit: r, stepSize: i } = e, o;
    return i ? (o = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1, o > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${o} ticks. Limiting to 1000.`), o = 1e3)) : (o = this.computeTickLimit(), r = r || 11), r && (o = Math.min(r, o)), o;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const e = this.options, r = e.ticks;
    let i = this.getTickLimit();
    i = Math.max(2, i);
    const o = {
      maxTicks: i,
      bounds: e.bounds,
      min: e.min,
      max: e.max,
      precision: r.precision,
      step: r.stepSize,
      count: r.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: r.minRotation || 0,
      includeBounds: r.includeBounds !== !1
    }, s = this._range || this, a = Q0(o, s);
    return e.bounds === "ticks" && al(a, this, "value"), e.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
  }
  configure() {
    const e = this.ticks;
    let r = this.min, i = this.max;
    if (super.configure(), this.options.offset && e.length) {
      const o = (i - r) / Math.max(e.length - 1, 1) / 2;
      r -= o, i += o;
    }
    this._startValue = r, this._endValue = i, this._valueRange = i - r;
  }
  getLabelForValue(e) {
    return Br(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class Wo extends Pi {
  determineDataLimits() {
    const { min: e, max: r } = this.getMinMax(!0);
    this.min = ae(e) ? e : 0, this.max = ae(r) ? r : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const e = this.isHorizontal(), r = e ? this.width : this.height, i = Me(this.options.ticks.minRotation), o = (e ? Math.sin(i) : Math.cos(i)) || 1e-3, s = this._resolveTickFontOptions(0);
    return Math.ceil(r / Math.min(40, s.lineHeight / o));
  }
  getPixelForValue(e) {
    return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
  }
}
N(Wo, "id", "linear"), N(Wo, "defaults", {
  ticks: {
    callback: Di.formatters.numeric
  }
});
const $r = (t) => Math.floor(Ye(t)), _t = (t, e) => Math.pow(10, $r(t) + e);
function sa(t) {
  return t / Math.pow(10, $r(t)) === 1;
}
function na(t, e, r) {
  const i = Math.pow(10, r), o = Math.floor(t / i);
  return Math.ceil(e / i) - o;
}
function J0(t, e) {
  const r = e - t;
  let i = $r(r);
  for (; na(t, e, i) > 10; )
    i++;
  for (; na(t, e, i) < 10; )
    i--;
  return Math.min(i, $r(t));
}
function ef(t, { min: e, max: r }) {
  e = Pe(t.min, e);
  const i = [], o = $r(e);
  let s = J0(e, r), a = s < 0 ? Math.pow(10, Math.abs(s)) : 1;
  const n = Math.pow(10, s), l = o > s ? Math.pow(10, o) : 0, d = Math.round((e - l) * a) / a, c = Math.floor((e - l) / n / 10) * n * 10;
  let h = Math.floor((d - c) / Math.pow(10, s)), u = Pe(t.min, Math.round((l + c + h * Math.pow(10, s)) * a) / a);
  for (; u < r; )
    i.push({
      value: u,
      major: sa(u),
      significand: h
    }), h >= 10 ? h = h < 15 ? 15 : 20 : h++, h >= 20 && (s++, h = 2, a = s >= 0 ? 1 : a), u = Math.round((l + c + h * Math.pow(10, s)) * a) / a;
  const _ = Pe(t.max, u);
  return i.push({
    value: _,
    major: sa(_),
    significand: h
  }), i;
}
class Uo extends Lt {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(e, r) {
    const i = Pi.prototype.parse.apply(this, [
      e,
      r
    ]);
    if (i === 0) {
      this._zero = !0;
      return;
    }
    return ae(i) && i > 0 ? i : null;
  }
  determineDataLimits() {
    const { min: e, max: r } = this.getMinMax(!0);
    this.min = ae(e) ? Math.max(0, e) : null, this.max = ae(r) ? Math.max(0, r) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !ae(this._userMin) && (this.min = e === _t(this.min, 0) ? _t(this.min, -1) : _t(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: e, maxDefined: r } = this.getUserBounds();
    let i = this.min, o = this.max;
    const s = (n) => i = e ? i : n, a = (n) => o = r ? o : n;
    i === o && (i <= 0 ? (s(1), a(10)) : (s(_t(i, -1)), a(_t(o, 1)))), i <= 0 && s(_t(o, -1)), o <= 0 && a(_t(i, 1)), this.min = i, this.max = o;
  }
  buildTicks() {
    const e = this.options, r = {
      min: this._userMin,
      max: this._userMax
    }, i = ef(r, this);
    return e.bounds === "ticks" && al(i, this, "value"), e.reverse ? (i.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), i;
  }
  getLabelForValue(e) {
    return e === void 0 ? "0" : Br(e, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const e = this.min;
    super.configure(), this._startValue = Ye(e), this._valueRange = Ye(this.max) - Ye(e);
  }
  getPixelForValue(e) {
    return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (Ye(e) - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    const r = this.getDecimalForPixel(e);
    return Math.pow(10, this._startValue + r * this._valueRange);
  }
}
N(Uo, "id", "logarithmic"), N(Uo, "defaults", {
  ticks: {
    callback: Di.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function Ko(t) {
  const e = t.ticks;
  if (e.display && t.display) {
    const r = ve(e.backdropPadding);
    return W(e.font && e.font.size, ne.font.size) + r.height;
  }
  return 0;
}
function tf(t, e, r) {
  return r = se(r) ? r : [
    r
  ], {
    w: d_(t, e.string, r),
    h: r.length * e.lineHeight
  };
}
function aa(t, e, r, i, o) {
  return t === i || t === o ? {
    start: e - r / 2,
    end: e + r / 2
  } : t < i || t > o ? {
    start: e - r,
    end: e
  } : {
    start: e,
    end: e + r
  };
}
function rf(t) {
  const e = {
    l: t.left + t._padding.left,
    r: t.right - t._padding.right,
    t: t.top + t._padding.top,
    b: t.bottom - t._padding.bottom
  }, r = Object.assign({}, e), i = [], o = [], s = t._pointLabels.length, a = t.options.pointLabels, n = a.centerPointLabels ? Q / s : 0;
  for (let l = 0; l < s; l++) {
    const d = a.setContext(t.getPointLabelContext(l));
    o[l] = d.padding;
    const c = t.getPointPosition(l, t.drawingArea + o[l], n), h = he(d.font), u = tf(t.ctx, h, t._pointLabels[l]);
    i[l] = u;
    const _ = me(t.getIndexAngle(l) + n), p = Math.round(is(_)), f = aa(p, c.x, u.w, 0, 180), m = aa(p, c.y, u.h, 90, 270);
    of(r, e, _, f, m);
  }
  t.setCenterPoint(e.l - r.l, r.r - e.r, e.t - r.t, r.b - e.b), t._pointLabelItems = af(t, i, o);
}
function of(t, e, r, i, o) {
  const s = Math.abs(Math.sin(r)), a = Math.abs(Math.cos(r));
  let n = 0, l = 0;
  i.start < e.l ? (n = (e.l - i.start) / s, t.l = Math.min(t.l, e.l - n)) : i.end > e.r && (n = (i.end - e.r) / s, t.r = Math.max(t.r, e.r + n)), o.start < e.t ? (l = (e.t - o.start) / a, t.t = Math.min(t.t, e.t - l)) : o.end > e.b && (l = (o.end - e.b) / a, t.b = Math.max(t.b, e.b + l));
}
function sf(t, e, r) {
  const i = t.drawingArea, { extra: o, additionalAngle: s, padding: a, size: n } = r, l = t.getPointPosition(e, i + o + a, s), d = Math.round(is(me(l.angle + le))), c = cf(l.y, n.h, d), h = lf(d), u = df(l.x, n.w, h);
  return {
    visible: !0,
    x: l.x,
    y: c,
    textAlign: h,
    left: u,
    top: c,
    right: u + n.w,
    bottom: c + n.h
  };
}
function nf(t, e) {
  if (!e)
    return !0;
  const { left: r, top: i, right: o, bottom: s } = t;
  return !(Ve({
    x: r,
    y: i
  }, e) || Ve({
    x: r,
    y: s
  }, e) || Ve({
    x: o,
    y: i
  }, e) || Ve({
    x: o,
    y: s
  }, e));
}
function af(t, e, r) {
  const i = [], o = t._pointLabels.length, s = t.options, { centerPointLabels: a, display: n } = s.pointLabels, l = {
    extra: Ko(s) / 2,
    additionalAngle: a ? Q / o : 0
  };
  let d;
  for (let c = 0; c < o; c++) {
    l.padding = r[c], l.size = e[c];
    const h = sf(t, c, l);
    i.push(h), n === "auto" && (h.visible = nf(h, d), h.visible && (d = h));
  }
  return i;
}
function lf(t) {
  return t === 0 || t === 180 ? "center" : t < 180 ? "left" : "right";
}
function df(t, e, r) {
  return r === "right" ? t -= e : r === "center" && (t -= e / 2), t;
}
function cf(t, e, r) {
  return r === 90 || r === 270 ? t -= e / 2 : (r > 270 || r < 90) && (t -= e), t;
}
function hf(t, e, r) {
  const { left: i, top: o, right: s, bottom: a } = r, { backdropColor: n } = e;
  if (!K(n)) {
    const l = xt(e.borderRadius), d = ve(e.backdropPadding);
    t.fillStyle = n;
    const c = i - d.left, h = o - d.top, u = s - i + d.width, _ = a - o + d.height;
    Object.values(l).some((p) => p !== 0) ? (t.beginPath(), Tr(t, {
      x: c,
      y: h,
      w: u,
      h: _,
      radius: l
    }), t.fill()) : t.fillRect(c, h, u, _);
  }
}
function uf(t, e) {
  const { ctx: r, options: { pointLabels: i } } = t;
  for (let o = e - 1; o >= 0; o--) {
    const s = t._pointLabelItems[o];
    if (!s.visible)
      continue;
    const a = i.setContext(t.getPointLabelContext(o));
    hf(r, a, s);
    const n = he(a.font), { x: l, y: d, textAlign: c } = s;
    Mt(r, t._pointLabels[o], l, d + n.lineHeight / 2, n, {
      color: a.color,
      textAlign: c,
      textBaseline: "middle"
    });
  }
}
function ed(t, e, r, i) {
  const { ctx: o } = t;
  if (r)
    o.arc(t.xCenter, t.yCenter, e, 0, re);
  else {
    let s = t.getPointPosition(0, e);
    o.moveTo(s.x, s.y);
    for (let a = 1; a < i; a++)
      s = t.getPointPosition(a, e), o.lineTo(s.x, s.y);
  }
}
function _f(t, e, r, i, o) {
  const s = t.ctx, a = e.circular, { color: n, lineWidth: l } = e;
  !a && !i || !n || !l || r < 0 || (s.save(), s.strokeStyle = n, s.lineWidth = l, s.setLineDash(o.dash || []), s.lineDashOffset = o.dashOffset, s.beginPath(), ed(t, r, a, i), s.closePath(), s.stroke(), s.restore());
}
function gf(t, e, r) {
  return at(t, {
    label: r,
    index: e,
    type: "pointLabel"
  });
}
class _r extends Pi {
  constructor(e) {
    super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const e = this._padding = ve(Ko(this.options) / 2), r = this.width = this.maxWidth - e.width, i = this.height = this.maxHeight - e.height;
    this.xCenter = Math.floor(this.left + r / 2 + e.left), this.yCenter = Math.floor(this.top + i / 2 + e.top), this.drawingArea = Math.floor(Math.min(r, i) / 2);
  }
  determineDataLimits() {
    const { min: e, max: r } = this.getMinMax(!1);
    this.min = ae(e) && !isNaN(e) ? e : 0, this.max = ae(r) && !isNaN(r) ? r : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / Ko(this.options));
  }
  generateTickLabels(e) {
    Pi.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((r, i) => {
      const o = te(this.options.pointLabels.callback, [
        r,
        i
      ], this);
      return o || o === 0 ? o : "";
    }).filter((r, i) => this.chart.getDataVisibility(i));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? rf(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(e, r, i, o) {
    this.xCenter += Math.floor((e - r) / 2), this.yCenter += Math.floor((i - o) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, r, i, o));
  }
  getIndexAngle(e) {
    const r = re / (this._pointLabels.length || 1), i = this.options.startAngle || 0;
    return me(e * r + Me(i));
  }
  getDistanceFromCenterForValue(e) {
    if (K(e))
      return NaN;
    const r = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - e) * r : (e - this.min) * r;
  }
  getValueForDistanceFromCenter(e) {
    if (K(e))
      return NaN;
    const r = e / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - r : this.min + r;
  }
  getPointLabelContext(e) {
    const r = this._pointLabels || [];
    if (e >= 0 && e < r.length) {
      const i = r[e];
      return gf(this.getContext(), e, i);
    }
  }
  getPointPosition(e, r, i = 0) {
    const o = this.getIndexAngle(e) - le + i;
    return {
      x: Math.cos(o) * r + this.xCenter,
      y: Math.sin(o) * r + this.yCenter,
      angle: o
    };
  }
  getPointPositionForValue(e, r) {
    return this.getPointPosition(e, this.getDistanceFromCenterForValue(r));
  }
  getBasePosition(e) {
    return this.getPointPositionForValue(e || 0, this.getBaseValue());
  }
  getPointLabelPosition(e) {
    const { left: r, top: i, right: o, bottom: s } = this._pointLabelItems[e];
    return {
      left: r,
      top: i,
      right: o,
      bottom: s
    };
  }
  drawBackground() {
    const { backgroundColor: e, grid: { circular: r } } = this.options;
    if (e) {
      const i = this.ctx;
      i.save(), i.beginPath(), ed(this, this.getDistanceFromCenterForValue(this._endValue), r, this._pointLabels.length), i.closePath(), i.fillStyle = e, i.fill(), i.restore();
    }
  }
  drawGrid() {
    const e = this.ctx, r = this.options, { angleLines: i, grid: o, border: s } = r, a = this._pointLabels.length;
    let n, l, d;
    if (r.pointLabels.display && uf(this, a), o.display && this.ticks.forEach((c, h) => {
      if (h !== 0 || h === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(c.value);
        const u = this.getContext(h), _ = o.setContext(u), p = s.setContext(u);
        _f(this, _, l, a, p);
      }
    }), i.display) {
      for (e.save(), n = a - 1; n >= 0; n--) {
        const c = i.setContext(this.getPointLabelContext(n)), { color: h, lineWidth: u } = c;
        !u || !h || (e.lineWidth = u, e.strokeStyle = h, e.setLineDash(c.borderDash), e.lineDashOffset = c.borderDashOffset, l = this.getDistanceFromCenterForValue(r.reverse ? this.min : this.max), d = this.getPointPosition(n, l), e.beginPath(), e.moveTo(this.xCenter, this.yCenter), e.lineTo(d.x, d.y), e.stroke());
      }
      e.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const e = this.ctx, r = this.options, i = r.ticks;
    if (!i.display)
      return;
    const o = this.getIndexAngle(0);
    let s, a;
    e.save(), e.translate(this.xCenter, this.yCenter), e.rotate(o), e.textAlign = "center", e.textBaseline = "middle", this.ticks.forEach((n, l) => {
      if (l === 0 && this.min >= 0 && !r.reverse)
        return;
      const d = i.setContext(this.getContext(l)), c = he(d.font);
      if (s = this.getDistanceFromCenterForValue(this.ticks[l].value), d.showLabelBackdrop) {
        e.font = c.string, a = e.measureText(n.label).width, e.fillStyle = d.backdropColor;
        const h = ve(d.backdropPadding);
        e.fillRect(-a / 2 - h.left, -s - c.size / 2 - h.top, a + h.width, c.size + h.height);
      }
      Mt(e, n.label, 0, -s, c, {
        color: d.color,
        strokeColor: d.textStrokeColor,
        strokeWidth: d.textStrokeWidth
      });
    }), e.restore();
  }
  drawTitle() {
  }
}
N(_r, "id", "radialLinear"), N(_r, "defaults", {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: Di.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(e) {
      return e;
    },
    padding: 5,
    centerPointLabels: !1
  }
}), N(_r, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), N(_r, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const Bi = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, Ae = /* @__PURE__ */ Object.keys(Bi);
function la(t, e) {
  return t - e;
}
function da(t, e) {
  if (K(e))
    return null;
  const r = t._adapter, { parser: i, round: o, isoWeekday: s } = t._parseOpts;
  let a = e;
  return typeof i == "function" && (a = i(a)), ae(a) || (a = typeof i == "string" ? r.parse(a, i) : r.parse(a)), a === null ? null : (o && (a = o === "week" && (Yt(s) || s === !0) ? r.startOf(a, "isoWeek", s) : r.startOf(a, o)), +a);
}
function ca(t, e, r, i) {
  const o = Ae.length;
  for (let s = Ae.indexOf(t); s < o - 1; ++s) {
    const a = Bi[Ae[s]], n = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((r - e) / (n * a.size)) <= i)
      return Ae[s];
  }
  return Ae[o - 1];
}
function pf(t, e, r, i, o) {
  for (let s = Ae.length - 1; s >= Ae.indexOf(r); s--) {
    const a = Ae[s];
    if (Bi[a].common && t._adapter.diff(o, i, a) >= e - 1)
      return a;
  }
  return Ae[r ? Ae.indexOf(r) : 0];
}
function ff(t) {
  for (let e = Ae.indexOf(t) + 1, r = Ae.length; e < r; ++e)
    if (Bi[Ae[e]].common)
      return Ae[e];
}
function ha(t, e, r) {
  if (!r)
    t[e] = !0;
  else if (r.length) {
    const { lo: i, hi: o } = os(r, e), s = r[i] >= e ? r[i] : r[o];
    t[s] = !0;
  }
}
function mf(t, e, r, i) {
  const o = t._adapter, s = +o.startOf(e[0].value, i), a = e[e.length - 1].value;
  let n, l;
  for (n = s; n <= a; n = +o.add(n, 1, i))
    l = r[n], l >= 0 && (e[l].major = !0);
  return e;
}
function ua(t, e, r) {
  const i = [], o = {}, s = e.length;
  let a, n;
  for (a = 0; a < s; ++a)
    n = e[a], o[n] = a, i.push({
      value: n,
      major: !1
    });
  return s === 0 || !r ? i : mf(t, i, o, r);
}
class Or extends Lt {
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, r = {}) {
    const i = e.time || (e.time = {}), o = this._adapter = new Pg._date(e.adapters.date);
    o.init(r), mr(i.displayFormats, o.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(e), this._normalized = r.normalized;
  }
  parse(e, r) {
    return e === void 0 ? null : da(this, e);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const e = this.options, r = this._adapter, i = e.time.unit || "day";
    let { min: o, max: s, minDefined: a, maxDefined: n } = this.getUserBounds();
    function l(d) {
      !a && !isNaN(d.min) && (o = Math.min(o, d.min)), !n && !isNaN(d.max) && (s = Math.max(s, d.max));
    }
    (!a || !n) && (l(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && l(this.getMinMax(!1))), o = ae(o) && !isNaN(o) ? o : +r.startOf(Date.now(), i), s = ae(s) && !isNaN(s) ? s : +r.endOf(Date.now(), i) + 1, this.min = Math.min(o, s - 1), this.max = Math.max(o + 1, s);
  }
  _getLabelBounds() {
    const e = this.getLabelTimestamps();
    let r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    return e.length && (r = e[0], i = e[e.length - 1]), {
      min: r,
      max: i
    };
  }
  buildTicks() {
    const e = this.options, r = e.time, i = e.ticks, o = i.source === "labels" ? this.getLabelTimestamps() : this._generate();
    e.bounds === "ticks" && o.length && (this.min = this._userMin || o[0], this.max = this._userMax || o[o.length - 1]);
    const s = this.min, a = this.max, n = Xu(o, s, a);
    return this._unit = r.unit || (i.autoSkip ? ca(r.minUnit, this.min, this.max, this._getLabelCapacity(s)) : pf(this, n.length, r.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : ff(this._unit), this.initOffsets(o), e.reverse && n.reverse(), ua(this, n, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let r = 0, i = 0, o, s;
    this.options.offset && e.length && (o = this.getDecimalForValue(e[0]), e.length === 1 ? r = 1 - o : r = (this.getDecimalForValue(e[1]) - o) / 2, s = this.getDecimalForValue(e[e.length - 1]), e.length === 1 ? i = s : i = (s - this.getDecimalForValue(e[e.length - 2])) / 2);
    const a = e.length < 3 ? 0.5 : 0.25;
    r = _e(r, 0, a), i = _e(i, 0, a), this._offsets = {
      start: r,
      end: i,
      factor: 1 / (r + 1 + i)
    };
  }
  _generate() {
    const e = this._adapter, r = this.min, i = this.max, o = this.options, s = o.time, a = s.unit || ca(s.minUnit, r, i, this._getLabelCapacity(r)), n = W(o.ticks.stepSize, 1), l = a === "week" ? s.isoWeekday : !1, d = Yt(l) || l === !0, c = {};
    let h = r, u, _;
    if (d && (h = +e.startOf(h, "isoWeek", l)), h = +e.startOf(h, d ? "day" : a), e.diff(i, r, a) > 1e5 * n)
      throw new Error(r + " and " + i + " are too far apart with stepSize of " + n + " " + a);
    const p = o.ticks.source === "data" && this.getDataTimestamps();
    for (u = h, _ = 0; u < i; u = +e.add(u, n, a), _++)
      ha(c, u, p);
    return (u === i || o.bounds === "ticks" || _ === 1) && ha(c, u, p), Object.keys(c).sort(la).map((f) => +f);
  }
  getLabelForValue(e) {
    const r = this._adapter, i = this.options.time;
    return i.tooltipFormat ? r.format(e, i.tooltipFormat) : r.format(e, i.displayFormats.datetime);
  }
  format(e, r) {
    const o = this.options.time.displayFormats, s = this._unit, a = r || o[s];
    return this._adapter.format(e, a);
  }
  _tickFormatFunction(e, r, i, o) {
    const s = this.options, a = s.ticks.callback;
    if (a)
      return te(a, [
        e,
        r,
        i
      ], this);
    const n = s.time.displayFormats, l = this._unit, d = this._majorUnit, c = l && n[l], h = d && n[d], u = i[r], _ = d && h && u && u.major;
    return this._adapter.format(e, o || (_ ? h : c));
  }
  generateTickLabels(e) {
    let r, i, o;
    for (r = 0, i = e.length; r < i; ++r)
      o = e[r], o.label = this._tickFormatFunction(o.value, r, e);
  }
  getDecimalForValue(e) {
    return e === null ? NaN : (e - this.min) / (this.max - this.min);
  }
  getPixelForValue(e) {
    const r = this._offsets, i = this.getDecimalForValue(e);
    return this.getPixelForDecimal((r.start + i) * r.factor);
  }
  getValueForPixel(e) {
    const r = this._offsets, i = this.getDecimalForPixel(e) / r.factor - r.end;
    return this.min + i * (this.max - this.min);
  }
  _getLabelSize(e) {
    const r = this.options.ticks, i = this.ctx.measureText(e).width, o = Me(this.isHorizontal() ? r.maxRotation : r.minRotation), s = Math.cos(o), a = Math.sin(o), n = this._resolveTickFontOptions(0).size;
    return {
      w: i * s + n * a,
      h: i * a + n * s
    };
  }
  _getLabelCapacity(e) {
    const r = this.options.time, i = r.displayFormats, o = i[r.unit] || i.millisecond, s = this._tickFormatFunction(e, 0, ua(this, [
      e
    ], this._majorUnit), o), a = this._getLabelSize(s), n = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
    return n > 0 ? n : 1;
  }
  getDataTimestamps() {
    let e = this._cache.data || [], r, i;
    if (e.length)
      return e;
    const o = this.getMatchingVisibleMetas();
    if (this._normalized && o.length)
      return this._cache.data = o[0].controller.getAllParsedValues(this);
    for (r = 0, i = o.length; r < i; ++r)
      e = e.concat(o[r].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(e);
  }
  getLabelTimestamps() {
    const e = this._cache.labels || [];
    let r, i;
    if (e.length)
      return e;
    const o = this.getLabels();
    for (r = 0, i = o.length; r < i; ++r)
      e.push(da(this, o[r]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return cl(e.sort(la));
  }
}
N(Or, "id", "time"), N(Or, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function ti(t, e, r) {
  let i = 0, o = t.length - 1, s, a, n, l;
  r ? (e >= t[i].pos && e <= t[o].pos && ({ lo: i, hi: o } = Fe(t, "pos", e)), { pos: s, time: n } = t[i], { pos: a, time: l } = t[o]) : (e >= t[i].time && e <= t[o].time && ({ lo: i, hi: o } = Fe(t, "time", e)), { time: s, pos: n } = t[i], { time: a, pos: l } = t[o]);
  const d = a - s;
  return d ? n + (l - n) * (e - s) / d : n;
}
class Yo extends Or {
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), r = this._table = this.buildLookupTable(e);
    this._minPos = ti(r, this.min), this._tableRange = ti(r, this.max) - this._minPos, super.initOffsets(e);
  }
  buildLookupTable(e) {
    const { min: r, max: i } = this, o = [], s = [];
    let a, n, l, d, c;
    for (a = 0, n = e.length; a < n; ++a)
      d = e[a], d >= r && d <= i && o.push(d);
    if (o.length < 2)
      return [
        {
          time: r,
          pos: 0
        },
        {
          time: i,
          pos: 1
        }
      ];
    for (a = 0, n = o.length; a < n; ++a)
      c = o[a + 1], l = o[a - 1], d = o[a], Math.round((c + l) / 2) !== d && s.push({
        time: d,
        pos: a / (n - 1)
      });
    return s;
  }
  _generate() {
    const e = this.min, r = this.max;
    let i = super.getDataTimestamps();
    return (!i.includes(e) || !i.length) && i.splice(0, 0, e), (!i.includes(r) || i.length === 1) && i.push(r), i.sort((o, s) => o - s);
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length)
      return e;
    const r = this.getDataTimestamps(), i = this.getLabelTimestamps();
    return r.length && i.length ? e = this.normalize(r.concat(i)) : e = r.length ? r : i, e = this._cache.all = e, e;
  }
  getDecimalForValue(e) {
    return (ti(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const r = this._offsets, i = this.getDecimalForPixel(e) / r.factor - r.end;
    return ti(this._table, i * this._tableRange + this._minPos, !0);
  }
}
N(Yo, "id", "timeseries"), N(Yo, "defaults", Or.defaults);
var yf = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: Go,
  LinearScale: Wo,
  LogarithmicScale: Uo,
  RadialLinearScale: _r,
  TimeScale: Or,
  TimeSeriesScale: Yo
});
const vf = [
  Ag,
  t0,
  Y0,
  yf
];
De.register(...vf);
De.register(It, qe, Jl, Zl);
class bf extends Rt {
  constructor() {
    super();
    N(this, "_forecastUnsub", null);
    // Unsubscribe-funktion
    N(this, "_forecastEvent", null);
    // Forecast-event (ex. hourly forecast från subscribe)
    N(this, "_chartCache", /* @__PURE__ */ new Map());
    N(this, "_versionLogged", !1);
    N(this, "_error", null);
    // Holds error translation key when something goes wrong
    N(this, "_skipIntegrations", /* @__PURE__ */ new Set());
    this.days_to_show = 4, this.displayCols = [], this.header = "", this._initDone = !1, this._userConfig = {}, this.sensors = [], this.tapAction = null, this._forecastSubEntity = null, this._forecastSubType = null;
  }
  // Integrations that failed during autodetect
  _renderLevelCircle(r, {
    colors: i = V.levels_colors,
    emptyColor: o = V.levels_empty_color,
    gapColor: s = V.levels_gap_color,
    thickness: a = V.levels_thickness,
    gap: n = V.levels_gap,
    size: l = 100
  }, d = "default", c = 0, h = r, u = null, _ = !0) {
    var f, m, y;
    const p = `chart-${d}-${c}-${r}`;
    return j`
      <div
        id="${p}"
        class="level-circle"
        style="display: inline-block; width: ${l}px; height: ${l}px; position: relative;${_ && u ? " cursor: pointer;" : ""}"
        data-level="${r}"
        data-display-level="${h}"
        data-colors="${JSON.stringify(i)}"
        data-empty-color="${o}"
        data-gap-color="${s}"
        data-thickness="${a}"
        data-gap="${n}"
        data-size="${l}"
        data-show-value="${this.config && this.config.show_value_numeric_in_circle}"
        data-font-weight="${((f = this.config) == null ? void 0 : f.levels_text_weight) || "normal"}"
        data-font-size-ratio="${((m = this.config) == null ? void 0 : m.levels_text_size) || 0.2}"
        data-text-color="${((y = this.config) == null ? void 0 : y.levels_text_color) || "var(--primary-text-color)"}"
        @click=${(g) => {
      _ && u && (g.stopPropagation(), this._openEntity(u));
    }}
      ></div>
    `;
  }
  _openEntity(r) {
    const i = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: r }
    });
    this.dispatchEvent(i);
  }
  /**
   * Build or refresh all level-circle charts in the current DOM.
   * Chart options are stored as data attributes so charts can be
   * reconstructed after the DOM is cloned or replaced.
   */
  _rebuildCharts() {
    var o;
    const r = ((o = this.renderRoot) == null ? void 0 : o.querySelectorAll(".level-circle")) || [], i = /* @__PURE__ */ new Set();
    r.forEach((s) => {
      i.add(s.id);
      const a = Number(s.dataset.level || 0), n = Number(s.dataset.displayLevel ?? a), l = JSON.parse(s.dataset.colors || "[]"), d = l.length, c = Math.min(a, d), h = s.dataset.emptyColor, u = s.dataset.gapColor, _ = Number(s.dataset.thickness), p = Number(s.dataset.gap), f = Number(s.dataset.size), m = s.dataset.showValue === "true", y = s.dataset.fontWeight || "normal", g = parseFloat(s.dataset.fontSizeRatio) || 0.2, v = s.dataset.textColor || "var(--primary-text-color)";
      let k = this._chartCache.get(s.id);
      if (!k || !s.contains(k.canvas)) {
        k && k.destroy(), s.innerHTML = "";
        const S = document.createElement("canvas");
        S.width = f, S.height = f, s.appendChild(S);
        const P = Array(d).fill(1), x = Array(d).fill(h).map((L, z) => z < c ? l[z] : h), E = Array(d).fill(u);
        k = new De(S.getContext("2d"), {
          type: "doughnut",
          data: {
            labels: Array(d).fill(""),
            datasets: [
              {
                data: P,
                backgroundColor: x,
                borderColor: E,
                borderWidth: p
              }
            ]
          },
          options: {
            rotation: -Math.PI / 2,
            cutout: `${100 - _}%`,
            responsive: !1,
            maintainAspectRatio: !1,
            animation: {
              duration: 0,
              animateRotate: !1,
              animateScale: !1,
              easing: "linear"
            },
            transitions: {
              active: {
                animation: {
                  duration: 0,
                  animateRotate: !1,
                  animateScale: !1,
                  easing: "linear"
                }
              },
              show: {
                animations: {
                  numbers: { duration: 0, easing: "linear" },
                  colors: { duration: 0, easing: "linear" }
                }
              },
              hide: {
                animations: {
                  numbers: { duration: 0, easing: "linear" },
                  colors: { duration: 0, easing: "linear" }
                }
              }
            },
            plugins: {
              legend: { display: !1 },
              tooltip: { enabled: !1 }
            }
          }
        }), this._chartCache.set(s.id, k);
      } else {
        const S = k.data.datasets;
        if (S && S[0]) {
          const P = Array(S[0].backgroundColor.length).fill(h).map((L, z) => z < c ? l[z] : h), x = S[0].backgroundColor;
          (P.length !== x.length || P.some((L, z) => L !== x[z])) && (S[0].backgroundColor = P, k.update("none"));
        }
      }
      const w = s.querySelector(".level-value-text");
      if (m && n >= 0) {
        if (!(w && w.textContent === String(n))) {
          w && w.remove();
          const S = document.createElement("div");
          S.className = "level-value-text", S.textContent = n, S.style.position = "absolute", S.style.top = "50%", S.style.left = "50%", S.style.transform = "translate(-50%, -50%)", S.style.fontSize = `${f * g}px`, S.style.fontWeight = y, S.style.color = v, f < 42 && (S.style.lineHeight = "1", S.style.height = "1em"), s.appendChild(S);
        }
      } else w && w.remove();
    }), this._chartCache.forEach((s, a) => {
      i.has(a) || (s.destroy(), this._chartCache.delete(a));
    });
  }
  updated(r) {
    var i;
    (r.has("config") || ((i = this.config) == null ? void 0 : i.integration) === "silam" && !this._forecastUnsub && (!this._error || this._error === "card.error_entity_unavailable") && this._hass) && this._subscribeForecastIfNeeded(), this.updateComplete.then(() => this._rebuildCharts()), super.updated && super.updated(r);
  }
  // Recreate charts when element is connected, useful after DOM cloning
  connectedCallback() {
    super.connectedCallback(), Promise.resolve().then(() => this._rebuildCharts());
  }
  // Clean up charts when component is disconnected
  disconnectedCallback() {
    super.disconnectedCallback(), this._forecastUnsub && (Promise.resolve(this._forecastUnsub).then((r) => {
      typeof r == "function" && r();
    }), this._forecastUnsub = null, this._forecastSubEntity = null, this._forecastSubType = null), this._chartCache.forEach((r) => {
      r.destroy();
    }), this._chartCache.clear();
  }
  _updateSensorsAndColumns(r, i, o) {
    this.debug && (this.d_sensors = r, this.d_availableSensors = i, console.debug(
      "[Card] _updateSensorsAndColumns called with",
      i.length,
      "available sensors"
    ));
    let s = 0;
    if (o.show_empty_days)
      s = o.days_to_show;
    else
      for (const l of r) {
        if (!l.days || !l.days.length) continue;
        const d = l.days.filter((h) => h.state >= 0).length, c = Math.min(d, o.days_to_show);
        c > s && (s = c);
      }
    const a = Array.from({ length: s }, (l, d) => d);
    (!this._isLoaded || !Se(this.sensors, r) || this._availableSensorCount !== i.length || this.days_to_show !== s || !Se(this.displayCols, a)) && (this.sensors = r, this._availableSensorCount = i.length, this.days_to_show = s, this.displayCols = a, this._isLoaded = !0, this._error = null, this.debug && (console.debug("Days to show:", this.days_to_show), console.debug("Display columns:", this.displayCols), console.debug(
      `[Card] Final sensors for display (${r.length}):`,
      r.map((l) => {
        var d, c;
        return {
          name: l.allergenCapitalized,
          allergen: l.allergenReplaced,
          has_days: !!l.days,
          days_length: (d = l.days) == null ? void 0 : d.length,
          entity_id: l.entity_id,
          day0_state: (c = l.day0) == null ? void 0 : c.state
        };
      })
    )), this.requestUpdate());
  }
  _getStaleStatus() {
    var n, l, d, c, h;
    if (((n = this.config) == null ? void 0 : n.integration) !== "peu")
      return { hasStale: !1, allStale: !1, staleSince: null };
    if (this.sensors && this.sensors.length > 0) {
      const u = this.sensors.filter((m) => m.stale === !0), _ = u.length === this.sensors.length, p = u.length > 0, f = ((l = u[0]) == null ? void 0 : l.staleSince) || null;
      return { hasStale: p, allStale: _, staleSince: f };
    }
    if (!this._hass)
      return { hasStale: !1, allStale: !1, staleSince: null };
    const r = Object.keys(this._hass.states).filter(
      (u) => u.startsWith("sensor.polleninformation_")
    );
    if (!r.length)
      return { hasStale: !1, allStale: !1, staleSince: null };
    let i = this.config.location === "manual" ? "" : this.config.location;
    if (!i && this.config.location !== "manual") {
      const u = r[0].match(/^sensor\.polleninformation_(.+)_[^_]+$/);
      i = u ? u[1] : "";
    }
    if (!i)
      return { hasStale: !1, allStale: !1, staleSince: null };
    let o = 0, s = 0, a = null;
    for (const u of r) {
      const _ = this._hass.states[u];
      ((d = _ == null ? void 0 : _.attributes) == null ? void 0 : d.location_slug) === i && (s++, ((c = _ == null ? void 0 : _.attributes) == null ? void 0 : c.data_stale) === !0 && (o++, a || (a = ((h = _ == null ? void 0 : _.attributes) == null ? void 0 : h.stale_since) || null)));
    }
    return {
      hasStale: o > 0,
      allStale: s > 0 && o === s,
      staleSince: a
    };
  }
  _subscribeForecastIfNeeded() {
    var r, i;
    if (!(!this.config || !this._hass)) {
      if (this.config.integration !== "silam" && this._forecastUnsub) {
        Promise.resolve(this._forecastUnsub).then((o) => {
          typeof o == "function" && o();
        }).catch(() => {
        }), this._forecastUnsub = null, this._forecastSubEntity = null, this._forecastSubType = null, this._forecastEvent = null;
        return;
      }
      if (this.config.integration === "silam") {
        const o = this.config.location === "manual" ? "" : this.config.location || "", s = ((i = (r = this.config) == null ? void 0 : r.date_locale) == null ? void 0 : i.split("-")[0]) || "en";
        this.debug && console.debug("[Card][Debug] SILAM location:", o);
        const a = Na(this._hass, o, s, this.debug);
        let n = "daily";
        if (this.config && this.config.mode === "twice_daily" ? n = "twice_daily" : this.config && this.config.mode === "hourly" && (n = "hourly"), a && this._forecastUnsub && this._forecastSubEntity === a && this._forecastSubType === n)
          return;
        if (this._forecastUnsub && (Promise.resolve(this._forecastUnsub).then((l) => {
          typeof l == "function" && l();
        }).catch(() => {
        }), this._forecastUnsub = null, this._forecastSubEntity = null, this._forecastSubType = null), a) {
          const l = this._hass.states[a];
          if (!l || l.state === "unavailable" || l.state === "unknown") {
            this.debug && console.debug(
              "[Card][subscribeForecast] Entity unavailable/unknown, skipping:",
              a
            ), this._forecastEvent = null;
            const c = this._error === "card.error_entity_unavailable";
            this.sensors = [], this._availableSensorCount = 0, this._isLoaded = !0, this._error = "card.error_entity_unavailable", c || this.requestUpdate();
            return;
          }
          this._error = null, this._forecastSubEntity = a, this._forecastSubType = n;
          const d = this._hass.connection.subscribeMessage(
            (c) => {
              this.debug && console.debug(
                "[Card][subscribeForecast] forecastEvent RECEIVED:",
                c
              ), this._forecastEvent = c, this._updateSensorsAfterForecastEvent();
            },
            {
              type: "weather/subscribe_forecast",
              entity_id: a,
              forecast_type: n
            }
          );
          d.catch((c) => {
            if (console.warn(
              "[Card][subscribeForecast] Subscription failed for",
              a,
              c
            ), this._forecastUnsub = null, this._forecastSubEntity = null, this._forecastSubType = null, this._forecastEvent = null, this._integrationExplicit)
              this.sensors = [], this._availableSensorCount = 0, this._isLoaded = !0, this._error = "card.error_location_not_found", this.requestUpdate();
            else {
              this._skipIntegrations.add(this.config.integration), this.debug && console.debug(
                "[Card] Autodetect: skipping",
                this.config.integration,
                "- will try next integration"
              );
              const h = this._hass;
              this._hass = null, this.hass = h;
            }
          }), this._forecastUnsub = d, this.debug && console.debug(
            "[Card][subscribeForecast] Subscribed for",
            a,
            "forecast_type:",
            n
          );
        } else
          this.debug && console.debug(
            "[Card] Hittar ingen weather-entity för location",
            o
          ), this.sensors = [], this._availableSensorCount = 0, this._forecastEvent = null, this._isLoaded = !0, this._error = "card.error_location_not_found", this.requestUpdate();
      }
    }
  }
  _updateSensorsAfterForecastEvent() {
    this.config && this.config.integration === "silam" && this._forecastEvent && (lr(this.config.integration) || lr("pp")).fetchForecast(this._hass, this.config, this._forecastEvent).then((i) => {
      const o = Vs(
        this.config,
        this._hass,
        this.debug
      ), s = js(
        i,
        this.config,
        o,
        Object.keys(this._hass.states),
        ue.mapping
      );
      this._updateSensorsAndColumns(s, o, this.config);
    }).catch((i) => {
      console.error("[Card] Error fetching SILAM forecast:", i), this.debug && console.debug("[Card] SILAM fetch error:", i), this._isLoaded = !0, this.requestUpdate();
    });
  }
  get debug() {
    return !!(this.config && this.config.debug);
  }
  get _lang() {
    var r;
    return Be(this._hass, (r = this.config) == null ? void 0 : r.date_locale);
  }
  _t(r) {
    return oe(r, this._lang);
  }
  _hasTapAction() {
    const r = this.tapAction;
    return r && r.type && r.type !== "none";
  }
  static get properties() {
    return {
      hass: { state: !0 },
      config: {},
      sensors: { state: !0 },
      days_to_show: { state: !0 },
      displayCols: { state: !0 },
      header: { state: !0 },
      tapAction: {},
      _isLoaded: { type: Boolean, state: !0 },
      _error: { type: String, state: !0 }
    };
  }
  /**
   * Gets the SVG key for an allergen
   * @param {string} allergenReplaced - The allergen identifier
   * @returns {string|null} The key to use for SVG loading, or null if invalid
   */
  _getSvgKey(r) {
    if (!r || typeof r != "string")
      return this.debug && console.warn("[SVG] Invalid allergenReplaced:", r), null;
    const i = At(r);
    if (Yi(i))
      return i;
    if (Hs[r]) {
      const o = Hs[r];
      if (Yi(o))
        return o;
    }
    return i;
  }
  /**
   * Gets color for a specific level for allergen icons
   * @param {number} level - The pollen level (0-6 or 0-4 depending on integration)
   * @param {string} allergenKey - Optional allergen key for special handling
   * @returns {string} Color hex string
   */
  _colorForLevel(r, i = null) {
    var a, n, l;
    if (i === "no_allergens")
      return ((a = this.config) == null ? void 0 : a.no_allergens_color) || V.no_allergens_color;
    if (((n = this.config) == null ? void 0 : n.allergen_color_mode) === "custom" && ((l = this.config) != null && l.allergen_colors)) {
      const d = this.config.allergen_colors, c = Math.max(0, Math.min(r, d.length - 1));
      return d[c] || d[0];
    }
    const o = V.allergen_colors, s = Math.max(0, Math.min(r, o.length - 1));
    return o[s] || o[0];
  }
  /**
   * Gets color for level circles (charts) - may inherit from allergen colors
   * Note: Level circles don't use specific allergen keys, so we pass null
   * @param {number} level - The pollen level (0-6 or 0-4 depending on integration)
   * @returns {string} Color hex string
   */
  _levelColorForLevel(r) {
    var a, n, l;
    if (((a = this.config) == null ? void 0 : a.levels_inherit_mode) !== "custom")
      return this._colorForLevel(r, null);
    if (r === 0)
      return ((n = this.config) == null ? void 0 : n.levels_empty_color) || V.levels_empty_color;
    const i = ((l = this.config) == null ? void 0 : l.levels_colors) || V.levels_colors, o = r - 1, s = Math.max(0, Math.min(o, i.length - 1));
    return i[s] || i[0];
  }
  /**
   * Determines the appropriate gap color based on inheritance mode
   * @returns {string} The gap color to use
   */
  _getGapColor() {
    var r;
    return ((r = this.config) == null ? void 0 : r.levels_inherit_mode) !== "custom" ? this.config.allergen_outline_color ?? V.levels_gap_color : this.config.levels_gap_color ?? "var(--card-background-color)";
  }
  /**
   * Renders an allergen SVG icon with proper color styling
   * @param {string} allergenKey - The allergen key 
   * @param {number} level - The pollen level for color
   * @param {Object} options - Optional configuration
   * @param {Function} options.onClick - Click handler
   * @param {boolean} options.clickable - Whether icon should be clickable
   * @returns {TemplateResult} HTML template with SVG or placeholder
   */
  _renderAllergenSvg(r, i, o = {}) {
    var m, y, g;
    if (!r || typeof r != "string")
      return this.debug && console.warn("[SVG] Cannot render SVG with invalid key:", r), j`
        <div class="pp-icon pp-icon-error" aria-hidden="true">
          <div style="background: #ff0000; color: white; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px;">?</div>
        </div>
      `;
    const { onClick: s, clickable: a = !1, stale: n = !1 } = o, l = n ? "#e6a800" : this._colorForLevel(i, r), d = ((m = this.config) == null ? void 0 : m.allergen_outline_color) || V.levels_gap_color, c = ((y = this.config) == null ? void 0 : y.allergen_stroke_width) ?? V.allergen_stroke_width;
    let h = r;
    r === "allergy_risk" && i > 0 && (h = `allergy_risk_${Math.min(i, 6)}`);
    const u = Yi(h);
    let _;
    r === "no_allergens" || (g = this.config) != null && g.allergen_stroke_color_synced ? _ = l : _ = d;
    const p = a && s ? s : null, f = `--pp-icon-color: ${l}; --pp-icon-stroke: ${_}; --pp-icon-stroke-width: ${c}; ${a ? "cursor: pointer;" : ""}`;
    return u ? j`
        <div 
          class="pp-icon" 
          style="${f}"
          aria-hidden="true"
          @click=${p}
        >
          ${bd(u)}
        </div>
      ` : (this.debug && console.warn(`[SVG] No SVG found for key: ${r}`), j`
        <div 
          class="pp-icon pp-icon-error" 
          style="${f}"
          aria-hidden="true"
          @click=${p}
        >
          <div style="background: #ccc; color: #666; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px;">?</div>
        </div>
      `);
  }
  static async getConfigElement() {
    return await customElements.whenDefined("pollenprognos-card-editor"), document.createElement("pollenprognos-card-editor");
  }
  setConfig(r) {
    if (Se(this._userConfig, r)) return;
    this._integrationExplicit = r.hasOwnProperty("integration"), this._skipIntegrations.clear(), this.tapAction = r.tap_action || null;
    let i = r.integration;
    i && typeof i == "string" && (i = i.trim().toLowerCase());
    const o = de(i) || de("pp");
    i || (i = o.integration);
    const s = Object.keys(o).concat([
      "type",
      "card_mod",
      "allergens",
      "icon_size",
      "icon_color_mode",
      "icon_color",
      "city",
      "location",
      "region_id",
      "tap_action",
      "debug",
      "show_version",
      "title",
      "days_to_show",
      "date_locale"
    ]);
    let a = {};
    for (const h of s)
      h in r && (a[h] = r[h]);
    const n = { ...o, ...a, integration: i }, l = this.config || {}, d = Object.keys(a).filter(
      (h) => !Se(a[h], l[h])
    );
    if (d.length > 0 && d.every((h) => Ra.includes(h))) {
      this._userConfig = { ...r }, this.config = n, this._isLoaded = !0, this.requestUpdate();
      return;
    }
    this._userConfig = { ...r }, this.config = n, !this._versionLogged && this.config.show_version !== !1 && (console.info(
      "%c🤧 Pollenprognos Card: version v3.0.0",
      "background:#f0e68c;color:#000;padding:2px 4px;border-radius:2px;"
    ), this._versionLogged = !0), this._initDone = !1, this._hass && (this.hass = this._hass);
  }
  set hass(r) {
    var P, x, E, L, z, C, $, M, R;
    if (this._hass === r) return;
    this._hass = r;
    const i = !!this._integrationExplicit;
    this.debug && console.debug("[Card] set hass called; explicit:", i);
    const o = new Set(
      Object.values(Li).flat()
    ), s = Object.keys(r.states).filter(
      (b) => {
        if (typeof b != "string" || !b.startsWith("sensor.pollen_") || b.startsWith("sensor.pollenflug_")) return !1;
        const A = /^sensor\.pollen_([^_]+)(_.*)?$/.exec(b);
        if (!A) return !1;
        const D = A[1];
        return !(!A[2] && o.has(D));
      }
    ), a = Object.keys(r.states).filter(
      (b) => typeof b == "string" && b.startsWith("sensor.pollenflug_")
    ), n = Object.keys(r.states).filter(
      (b) => typeof b == "string" && b.startsWith("sensor.polleninformation_")
    ), l = yt(r, this.debug);
    let d = [];
    if (l.locations.size > 0)
      for (const [, b] of l.locations)
        for (const A of b.sensors.values())
          d.push(A);
    d.length || (d = Object.keys(r.states).filter(
      (b) => typeof b == "string" && b.startsWith("sensor.silam_pollen_")
    ));
    const c = Object.keys(r.states).filter(
      (b) => typeof b == "string" && b.startsWith("sensor.kleenex_pollen_radar_")
    ), h = Object.keys(r.states).filter(
      (b) => {
        if (typeof b != "string") return !1;
        const A = /^sensor\.pollen_([^_]+)$/.exec(b);
        if (!A) return !1;
        const D = A[1];
        return o.has(D);
      }
    ), u = Object.keys(r.states).filter(
      (b) => typeof b == "string" && /^sensor\.(?:niveau_(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)|(?:pm25|pm10|ozone|dioxyde_d_azote|dioxyde_de_soufre)|qualite_globale(?:_pollen)?)_/.test(b) && !/_j_\d+$/.test(b)
    );
    let _ = [];
    r.entities && (_ = Object.entries(r.entities).filter(([, b]) => b.platform === "pollenlevels" && !b.entity_category).map(([b]) => b)), _.length || (_ = Object.keys(r.states).filter((b) => {
      var D;
      const A = r.states[b];
      return ((D = A == null ? void 0 : A.attributes) == null ? void 0 : D.attribution) === Kt && A.attributes.device_class !== "date" && A.attributes.device_class !== "timestamp";
    })), this.debug && (console.debug("Sensor states detected:"), console.debug("PP:", s), console.debug("DWD:", a), console.debug("PEU:", n), console.debug("SILAM:", d), console.debug("KLEENEX:", c), console.debug("PLU:", h), console.debug("ATMO:", u), console.debug("GPL:", _));
    let p = this._userConfig.integration;
    if (p && typeof p == "string" && (p = p.trim().toLowerCase()), !i) {
      const b = this._skipIntegrations;
      s.length && !b.has("pp") ? p = "pp" : h.length && !b.has("plu") ? p = "plu" : n.length && !b.has("peu") ? p = "peu" : a.length && !b.has("dwd") ? p = "dwd" : d.length && !b.has("silam") ? p = "silam" : c.length && !b.has("kleenex") ? p = "kleenex" : u.length && !b.has("atmo") ? p = "atmo" : _.length && !b.has("gpl") && (p = "gpl");
    }
    let f = de(p);
    f || (console.error(
      "Unknown integration:",
      p,
      "- falling back to PP"
    ), p = "pp", f = de("pp"));
    const { allergens: m, ...y } = this._userConfig, g = {
      ...f,
      ...y,
      integration: p
      // Use the normalized integration value
    };
    if (p === "plu" && (delete g.city, delete g.region_id, delete g.location), this._integrationExplicit && Array.isArray(m) && m.length > 0 ? (this.debug && console.debug(
      "[Card] Explicit integration (",
      p,
      "); using user-defined allergens:",
      m
    ), g.allergens = m) : (this.debug && console.debug(
      "[Card] Using stub allergens for integration:",
      p
    ), g.allergens = (de(p) || de("pp")).allergens), !g.hasOwnProperty("date_locale")) {
      const b = Be(r, null), A = ((x = (P = this._hass) == null ? void 0 : P.locale) == null ? void 0 : x.language) || ((E = this._hass) == null ? void 0 : E.language) || `${b}-${b.toUpperCase()}`;
      g.date_locale = A, this.debug && console.debug("[Card] auto-filling date_locale:", g.date_locale);
    }
    if (p === "dwd" && g.region_id !== "manual" && !g.region_id && a.length)
      g.region_id = Array.from(
        new Set(a.map((b) => b.split("_").pop()))
      ).sort((b, A) => Number(b) - Number(A))[0], this.debug && console.debug("[Card] Auto-set region_id:", g.region_id);
    else if (p === "pp" && g.city !== "manual" && !g.city && s.length)
      g.city = s[0].slice(14).replace(/_[^_]+$/, ""), this.debug && console.debug("[Card] Auto-set city:", g.city);
    else if (p === "peu" && g.location !== "manual" && !g.location && n.length) {
      const b = Array.from(
        new Set(
          n.map((A) => {
            var T;
            return (((T = r.states[A]) == null ? void 0 : T.attributes) || {}).location_slug || null;
          }).filter(Boolean)
        )
      );
      g.location = b[0] || null, this.debug && console.debug(
        "[Card][PEU] Auto-set location (location_slug):",
        g.location,
        b
      );
    } else if (p === "silam" && g.location !== "manual" && !g.location && d.length)
      if (l.locations.size > 0) {
        const b = l.locations.keys().next().value;
        g.location = b || null, this.debug && console.debug(
          "[Card][SILAM] Auto-set location (discovery):",
          g.location,
          [...l.locations.keys()]
        );
      } else {
        const b = Array.from(
          new Set(
            d.map((A) => {
              const D = A.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
              return D ? D[1] : null;
            }).filter(Boolean)
          )
        );
        g.location = b[0] || null, this.debug && console.debug(
          "[Card][SILAM] Auto-set location (regex):",
          g.location,
          b
        );
      }
    else if (p === "kleenex" && g.location !== "manual" && !g.location && c.length) {
      const b = Object.keys(r.states).filter(
        (D) => typeof D == "string" && D.match(/^sensor\.kleenex_pollen_radar_.+_date$/)
      ), A = Array.from(
        new Set(
          b.map((D) => {
            const T = D.match(/^sensor\.kleenex_pollen_radar_(.+)_date$/);
            return T ? T[1] : null;
          }).filter(Boolean)
        )
      );
      g.location = A[0] || null, this.debug && console.debug(
        "[Card][KLEENEX] Auto-set location:",
        g.location,
        A
      );
    } else if (p === "atmo" && g.location !== "manual" && !g.location && u.length) {
      const b = Array.from(
        new Set(
          u.map((A) => {
            const D = A.match(
              /^sensor\.niveau_(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)_(.+?)(?:_j_\d+)?$/
            );
            return D ? D[1] : null;
          }).filter(Boolean)
        )
      );
      g.location = b[0] || null, this.debug && console.debug(
        "[Card][ATMO] Auto-set location:",
        g.location,
        b
      );
    } else if (p === "gpl" && g.location !== "manual" && !g.location && _.length) {
      const b = Pt(r, this.debug), A = b.locations.keys().next().value;
      g.location = A || null, this.debug && console.debug(
        "[Card][GPL] Auto-set location:",
        g.location,
        [...b.locations.keys()]
      );
    }
    Se(this.config, g) || (this.config = g);
    const v = g.tap_action || this.tapAction || null;
    this.tapAction !== v && (this.tapAction = v), this.debug && (console.debug("[Card][Debug] Aktiv integration:", p), console.debug("[Card][Debug] Allergens i config:", g.allergens));
    let k;
    if (g.title === "false" || g.title === !1 || typeof g.title == "string" && g.title.trim() === "")
      k = "";
    else if (typeof g.title == "string" && g.title.trim() !== "" && g.title !== "true")
      k = g.title;
    else {
      let b = "";
      if (p === "dwd")
        b = g.region_id && g.region_id !== "manual" ? Ia[g.region_id] || g.region_id : "";
      else if (p === "peu") {
        const A = Object.values(r.states).filter(
          (I) => I && typeof I == "object" && typeof I.entity_id == "string" && I.entity_id.startsWith("sensor.polleninformation_")
        ), D = g.location && g.location !== "manual" ? ke(g.location) : "";
        let T = "", B = null;
        if (D)
          B = A.find((I) => {
            const O = (I.attributes || {}).location_slug || I.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
            return ke(O) === D;
          });
        else {
          const I = Array.from(
            new Set(
              A.map((G) => {
                const H = (G.attributes || {}).location_slug || G.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
                return ke(H);
              })
            )
          );
          I.length === 1 && (B = A.find((G) => {
            const H = (G.attributes || {}).location_slug || G.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
            return ke(H) === I[0];
          }));
        }
        if (B) {
          const I = B.attributes || {};
          T = I.location_title || ((z = (L = I.friendly_name) == null ? void 0 : L.match(/\((.*?)\)/)) == null ? void 0 : z[1]) || "";
        }
        b = D ? T || g.location || "" : T;
      } else if (p === "silam") {
        let A = "";
        const D = g.location === "manual" ? "" : g.location || "";
        if (g.location !== "manual") {
          const T = Rr(
            l,
            D,
            this.debug
          );
          T && (A = T.label.replace(/^SILAM Pollen\s*-?\s*/i, "").trim());
        }
        if (!A && g.location && g.location !== "manual") {
          const T = [
            "alder",
            "birch",
            "grass",
            "hazel",
            "mugwort",
            "olive",
            "ragweed"
          ], B = new Set(
            Object.values(ue.mapping).flatMap(
              (H) => Object.entries(H).filter(
                ([, F]) => T.includes(F)
              ).map(([F]) => F)
            )
          ), I = Object.values(r.states).filter((H) => {
            if (!H || typeof H != "object" || typeof H.entity_id != "string" || !H.entity_id.startsWith("sensor.silam_pollen_"))
              return !1;
            const F = H.entity_id.match(
              /^sensor\.silam_pollen_(.*)_([^_]+)$/
            );
            return F ? B.has(F[2]) : !1;
          }), G = ke(g.location), O = G ? I.find((H) => {
            const U = H.entity_id.replace("sensor.silam_pollen_", "").replace(/_[^_]+$/, "").replace(/^[-\s]+/, "");
            return ke(U) === G;
          }) : null;
          if (O) {
            const H = O.attributes;
            A = H.location_title || ((C = H.friendly_name) == null ? void 0 : C.replace(/^SILAM Pollen\s*-?\s*/i, "").replace(new RegExp("\\s+\\p{L}+$", "u"), "").trim()) || g.location, A = A.replace(/^[-\s]+/, "");
          }
        }
        b = g.location && g.location !== "manual" ? A || g.location || "" : A;
      } else if (p === "kleenex") {
        const A = Object.values(r.states).filter((I) => !I || typeof I != "object" || typeof I.entity_id != "string" || !I.entity_id.startsWith("sensor.kleenex_pollen_radar_") ? !1 : I.entity_id.match(/^sensor\.kleenex_pollen_radar_.+_.+$/)), D = g.location && g.location !== "manual" ? ke(g.location) : "";
        let T = null;
        if (g.location === "manual") {
          let I = g.entity_prefix || "";
          I.startsWith("sensor.") && (I = I.substring(7)), I && !I.endsWith("_") && (I = I + "_"), I && (T = A.find(
            (G) => G.entity_id.startsWith(`sensor.${I}`)
          ));
        } else D ? T = A.find((I) => I.entity_id.replace(
          "sensor.kleenex_pollen_radar_",
          ""
        ).replace(/_[^_]+$/, "") === D) : T = A[0];
        let B = "";
        if (T) {
          const I = T.attributes;
          B = I.location_name || ((M = ($ = I.friendly_name) == null ? void 0 : $.match(/\(([^)]+)\)/)) == null ? void 0 : M[1]) || ((R = I.friendly_name) == null ? void 0 : R.replace(/^Kleenex Pollen Radar\s*[\(\-]?\s*/i, "").replace(/[\)\s]+(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee).*$/i, "").replace(/^(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee)(?:\s.*)?$/i, "").trim()) || (g.location ? g.location.charAt(0).toUpperCase() + g.location.slice(1) : "");
        }
        b = B || g.location || "";
      } else if (p === "atmo") {
        const A = /^sensor\.(?:niveau_(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)|(?:pm25|pm10|ozone|dioxyde_d_azote|dioxyde_de_soufre)|qualite_globale(?:_pollen)?)_(.+?)(?:_j_\d+)?$/, D = Object.values(r.states).filter(
          (G) => G && typeof G == "object" && typeof G.entity_id == "string" && A.test(G.entity_id)
        ), T = g.location && g.location !== "manual" ? g.location.toLowerCase() : "";
        let B = null;
        T ? B = D.find((G) => {
          const O = G.entity_id.match(A);
          return O && O[1] === T;
        }) : D.length && (B = D[0]);
        let I = "";
        B && (I = (B.attributes || {})["Nom de la zone"] || g.location || "", I && (I = I.charAt(0).toUpperCase() + I.slice(1))), b = I || g.location || "";
      } else if (p === "gpl") {
        const A = Pt(r, !1), D = g.location && g.location !== "manual" ? g.location : "";
        let T = "";
        D && A.locations.has(D) ? T = A.locations.get(D).label : A.locations.size && (T = A.locations.values().next().value.label), T && (T = T.replace(/\s*(grass|tree|weed)\s*$/i, "").replace(/\s*type\s*$/i, "").trim(), T && (T = T.charAt(0).toUpperCase() + T.slice(1))), b = T || g.location || "";
      } else if (p === "plu") {
        const A = this._t("card.location.plu");
        b = A === "card.location.plu" ? "Luxembourg" : A;
      } else {
        const A = (D) => Mo.find((T) => ke(T) === D) || D;
        if (g.city && g.city !== "manual")
          b = A(g.city);
        else {
          const D = Object.keys(r.states).filter(
            (B) => /^sensor\.pollen_(.+)_[^_]+$/.test(B)
          ), T = Array.from(
            new Set(
              D.map(
                (B) => B.replace("sensor.pollen_", "").replace(/_[^_]+$/, "")
              )
            )
          );
          T.length === 1 ? b = A(T[0]) : b = "";
        }
      }
      k = b ? `${this._t("card.header_prefix")} ${b}` : this._t("card.header_no_location"), this.debug && console.debug("[Card] header set to:", k);
    }
    this.header !== k && (this.header = k);
    const w = lr(g.integration) || lr("pp");
    let S = null;
    if (g.integration === "silam" ? S = w.fetchForecast(r, g, this._forecastEvent) : S = w.fetchForecast(r, g), S)
      return S.then((b) => {
        this.debug && (console.debug("[Card][Debug] Sensors före filtrering:", b), console.debug(
          `[Card][Debug] Adapter returned ${b.length} sensors:`,
          b.map((O) => {
            var H, F, U;
            return {
              allergen: O.allergenReplaced,
              entity_id: O.entity_id,
              has_days: !!O.days,
              days_length: (H = O.days) == null ? void 0 : H.length,
              day0_state: (F = O.day0) == null ? void 0 : F.state,
              day0_value: (U = O.day0) == null ? void 0 : U.value
            };
          })
        ), console.debug(
          "[Card][Debug] Förväntade allergener från config:",
          g.allergens
        )), this.debug && (console.debug("[Card] Användaren har valt city:", g.city), console.debug(
          "[Card] Användaren har valt allergener:",
          g.allergens
        ), console.debug("[Card] Användaren har valt plats:", g.location));
        const A = Vs(g, r, this.debug), D = A.length, T = g.integration === "silam" && (!g.mode || g.mode === "daily"), B = js(
          b,
          g,
          A,
          T ? Object.keys(r.states) : [],
          T ? ue.mapping : {}
        );
        if (this.debug && console.debug(
          `[Card][Debug] After filtering: ${B.length} sensors remain:`,
          B.map((O) => {
            var H, F;
            return {
              allergen: O.allergenReplaced,
              entity_id: O.entity_id,
              has_days: !!O.days,
              days_length: (H = O.days) == null ? void 0 : H.length,
              day0_state: (F = O.day0) == null ? void 0 : F.state
            };
          })
        ), this._integrationExplicit && !!g.location && D === 0) {
          this._explicitLocationNoSensors = !0, this._updateSensorsAndColumns([], [], g), this.debug && console.warn(
            `[Card] Ingen sensor hittad för explicit vald plats: '${g.location}'`
          );
          return;
        } else
          this._explicitLocationNoSensors = !1, this._updateSensorsAndColumns(B, A, g);
      }).catch((b) => {
        console.error("[Card] Error fetching pollen forecast:", b), this.debug && console.debug("[Card] fetchForecast error:", b), this._isLoaded = !0, this.requestUpdate();
      });
  }
  _renderNoAllergensHtml() {
    return Number(this.config.icon_size) > 0 && Number(this.config.icon_size), j`
      ${this.header ? j`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="no-allergens-container">
          ${this._renderAllergenSvg("no_allergens", 0)}
          <span class="no-allergens-text">${this._t("card.no_allergens")}</span>
        </div>
      </div>
    `;
  }
  _renderStaleDataHtml() {
    return j`
      ${this.header ? j`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="stale-data-container">
          ${this._renderAllergenSvg("no_allergens", 0, { stale: !0 })}
          <span class="stale-data-text">${this._t("card.stale_data")}</span>
          <span class="stale-data-subtitle"
            >${this._t("card.stale_data_subtitle")}</span
          >
        </div>
      </div>
    `;
  }
  _renderMinimalHtml() {
    var i, o;
    const r = ((i = this.config) == null ? void 0 : i.text_size_ratio) ?? 1;
    return j`
      ${this.header ? j`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div
          class="flex-container"
          style="gap: ${((o = this.config) == null ? void 0 : o.minimal_gap) ?? 35}px;"
        >
          ${(this.sensors || []).map((s) => {
      var h, u, _, p, f, m, y, g, v, k, w, S, P, x;
      if (s.stale) {
        const E = (h = this.config) != null && h.show_text_allergen ? ((u = this.config) != null && u.allergens_abbreviated ? s.allergenShort ?? "" : s.allergenCapitalized ?? "") + ": " + this._t("card.stale_allergen") : this._t("card.stale_allergen");
        return j`
                <div class="sensor minimal stale">
                  ${this._renderAllergenSvg(
          this._getSvgKey(s.allergenReplaced),
          0,
          { stale: !0 }
        )}
                  <span class="short-text stale-allergen-text" style="font-size: ${1 * r}em;">
                    ${E}
                  </span>
                </div>
              `;
      }
      const a = ((_ = s.day0) == null ? void 0 : _.state_text) ?? "", n = ((p = s.day0) == null ? void 0 : p.display_state) ?? ((f = s.day0) == null ? void 0 : f.state), l = n != null && n >= 0 ? n : "";
      let d = "";
      (m = this.config) != null && m.show_text_allergen && (d += (y = this.config) != null && y.allergens_abbreviated ? s.allergenShort ?? "" : s.allergenCapitalized ?? ""), (g = this.config) != null && g.show_value_text && ((v = this.config) != null && v.show_value_numeric) ? (d && (d += ": "), d += l !== "" ? `${a} (${l})` : a) : (k = this.config) != null && k.show_value_text ? (d && (d += ": "), d += a) : (w = this.config) != null && w.show_value_numeric && l !== "" && (d && (d += " "), d += `(${l})`);
      const c = this.config.integration === "plu" ? ((S = s.day0) == null ? void 0 : S.state) ?? 0 : ((P = s.day0) == null ? void 0 : P.display_state) ?? ((x = s.day0) == null ? void 0 : x.state) ?? 0;
      return j`
              <div class="sensor minimal">
                ${this._renderAllergenSvg(
        this._getSvgKey(s.allergenReplaced),
        c,
        {
          clickable: this.config.link_to_sensors !== !1 && s.entity_id,
          onClick: (E) => {
            this.config.link_to_sensors !== !1 && s.entity_id && (E.stopPropagation(), this._openEntity(s.entity_id));
          }
        }
      )}
                ${d ? j`<span
                      class="short-text"
                      style="font-size: ${1 * r}em;"
                      >${d}</span
                    >` : ""}
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
  _renderNormalHtml() {
    var y, g;
    if (!this.sensors || this.sensors.length === 0)
      return this.debug && (console.debug(
        "[Card] _renderNormalHtml: no sensors available, returning empty"
      ), console.debug(
        `[Card] _renderNormalHtml: sensors=${!!this.sensors}, length=${(y = this.sensors) == null ? void 0 : y.length}`
      )), j``;
    const r = this.sensors.filter(
      (v) => v.days && v.days.length > 0
    ), i = this.sensors.filter((v) => v.stale === !0);
    if (r.length === 0 && i.length === 0)
      return this.debug && (console.debug(
        "[Card] _renderNormalHtml: no sensors have days arrays, returning empty"
      ), console.debug(
        `[Card] _renderNormalHtml: sensors with days=${r.length}, total sensors=${this.sensors.length}`
      ), this.sensors.forEach((v, k) => {
        var w, S;
        console.debug(
          `[Card] _renderNormalHtml: sensor[${k}] ${v.allergenReplaced}: has_days=${!!v.days}, days_length=${(w = v.days) == null ? void 0 : w.length}, day0_state=${(S = v.day0) == null ? void 0 : S.state}`
        );
      })), j``;
    this.debug && console.debug(
      `[Card] _renderNormalHtml: rendering ${this.sensors.length} sensors, ${r.length} with days`
    );
    const o = ((g = this.config) == null ? void 0 : g.text_size_ratio) ?? 1, s = !!this.config.days_boldfaced, a = this.displayCols;
    let n = 6;
    this.config.integration === "peu" || this.config.integration === "kleenex" ? n = 4 : this.config.integration === "gpl" ? n = 5 : this.config.integration === "plu" && (n = 3);
    const l = [];
    for (let v = 0; v < n; v++)
      l.push(this._levelColorForLevel(v + 1));
    const d = l, c = this.config.levels_empty_color ?? "var(--divider-color)", h = this._getGapColor(), u = this.config.levels_thickness ?? 60, _ = this.config.levels_gap ?? 5, p = Number(this.config.icon_size) || 48, f = Number(this.config.levels_icon_ratio) || 1, m = Math.min(100, Math.max(1, p * f));
    return this.debug && console.debug("Display columns:", a), j`
      ${this.header ? j`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="forecast-content">
          <table class="forecast"">
            <colgroup>
              ${[0, ...a].map(
      () => j`<col style="width: ${100 / (a.length + 1)}%;" />`
    )}
            </colgroup>
            <thead>
              <tr>
                <th></th>
                ${a.map(
      (v) => {
        var k, w, S, P, x, E, L, z;
        return j`
                    <th
                      style="font-weight: ${s ? "bold" : "normal"}; text-align: center;"
                    >
                      <div
                        style="display: flex; flex-direction: column; align-items: center;"
                      >
                        <span
                          class="day-header"
                          style="font-size: ${1 * o}em;"
                        >
                          ${((P = (S = (w = (k = this.sensors) == null ? void 0 : k[0]) == null ? void 0 : w.days) == null ? void 0 : S[v]) == null ? void 0 : P.day) || ""}
                        </span>
                        ${this.config.mode === "twice_daily" && ((z = (L = (E = (x = this.sensors) == null ? void 0 : x[0]) == null ? void 0 : E.days) == null ? void 0 : L[v]) != null && z.icon) ? j`<ha-icon
                              icon="${this.sensors[0].days[v].icon}"
                              style="margin-top: 2px;"
                            ></ha-icon>` : ""}
                      </div>
                    </th>
                  `;
      }
    )}
              </tr>
            </thead>
            ${this.sensors.flatMap(
      (v, k) => {
        var P, x, E;
        const w = this.config.show_block_separator && k > 0 && v.group && this.sensors[k - 1].group && v.group !== this.sensors[k - 1].group ? j`<tr class="block-separator-row"><td colspan="${a.length + 1}"><hr class="block-separator" /></td></tr>` : "", S = v.stale ? j`
                  <tr class="allergen-icon-row allergen-stale-row" valign="top">
                    <td>
                      ${this._renderAllergenSvg(
          this._getSvgKey(v.allergenReplaced),
          0,
          { stale: !0 }
        )}
                    </td>
                    <td colspan="${a.length}" class="stale-cell">
                      <span class="stale-allergen-text">${this._t("card.stale_allergen")}</span>
                    </td>
                  </tr>
                  ${this.config.show_text_allergen ? j`
                        <tr class="allergen-text-row allergen-stale-row">
                          <td>
                            <span class="stale-allergen-name" style="font-size: ${1 * o}em;">
                              ${this.config.allergens_abbreviated ? v.allergenShort : v.allergenCapitalized}
                            </span>
                          </td>
                          <td colspan="${a.length}"></td>
                        </tr>
                      ` : ""}
                ` : j`
                <tr class="allergen-icon-row" valign="top">
                  <td>
                    ${this._renderAllergenSvg(
          this._getSvgKey(v.allergenReplaced),
          this.config.integration === "plu" ? ((P = v.days[0]) == null ? void 0 : P.state) ?? 0 : ((x = v.days[0]) == null ? void 0 : x.display_state) ?? ((E = v.days[0]) == null ? void 0 : E.state) ?? 0,
          {
            clickable: this.config.link_to_sensors !== !1 && v.entity_id,
            onClick: (L) => {
              this.config.link_to_sensors !== !1 && v.entity_id && (L.stopPropagation(), this._openEntity(v.entity_id));
            }
          }
        )}
                  </td>
                  ${a.map(
          (L) => j`
                      <td>
                        ${(() => {
            var M, R;
            const z = Number((M = v.days[L]) == null ? void 0 : M.state) || 0, C = Number(
              ((R = v.days[L]) == null ? void 0 : R.display_state) ?? z
            );
            let $ = z;
            return this.config.integration === "dwd" ? $ = z * 2 : (this.config.integration === "peu" || this.config.integration === "kleenex" || this.config.integration === "plu") && ($ = z), this._renderLevelCircle(
              $,
              {
                colors: d,
                emptyColor: c,
                gapColor: h,
                thickness: u,
                gap: _,
                size: m
              },
              v.allergenReplaced,
              L,
              C,
              v.entity_id,
              this.config.link_to_sensors !== !1
            );
          })()}
                      </td>
                    `
        )}
                </tr>
                ${this.config.show_text_allergen || this.config.show_value_text || this.config.show_value_numeric ? j`
                      <tr class="allergen-text-row">
                        <td>
                          <span style="font-size: ${1 * o}em;">
                            ${this.config.show_text_allergen ? this.config.allergens_abbreviated ? v.allergenShort : v.allergenCapitalized : ""}
                          </span>
                        </td>
                        ${a.map((L) => {
          var R, b, A;
          const z = ((R = v.days[L]) == null ? void 0 : R.state_text) || "", C = ((b = v.days[L]) == null ? void 0 : b.display_state) ?? ((A = v.days[L]) == null ? void 0 : A.state), $ = C != null && C >= 0 ? C : "";
          let M = "";
          return this.config.show_value_text && this.config.show_value_numeric ? M = $ !== "" ? `${z} (${$})` : z : this.config.show_value_text ? M = z : this.config.show_value_numeric && (M = $ !== "" ? String($) : ""), j`<td>
                            <span style="font-size: ${1 * o}em;"
                              >${M}</span
                            >
                          </td>`;
        })}
                      </tr>
                    ` : ""}
              `;
        return [w, S];
      }
    )}
          </table>
        </div>
      </div>
    `;
  }
  render() {
    var d, c;
    if (!this.config) return j``;
    if (!this._isLoaded && (!this.sensors || !this.sensors.length))
      return j`
        <ha-card>
          <div style="padding: 1em; text-align: center;">
            ${this._t("card.loading_forecast") || "Loading forecast..."}
          </div>
        </ha-card>
      `;
    if (this._isLoaded && (!this.sensors || !this.sensors.length)) {
      const h = `card.integration.${this.config.integration}`, u = this._t(h);
      let _ = "";
      if (this._error)
        return _ = this._t(this._error), j`
          <ha-card>
            <div class="card-error">${_} (${u})</div>
          </ha-card>
        `;
      if (this._availableSensorCount === 0)
        return this._getStaleStatus().hasStale ? j`
            <ha-card>
              ${this._renderStaleDataHtml()}
            </ha-card>
          ` : (_ = this._t("card.error_no_sensors"), j`
          <ha-card>
            <div class="card-error">${_} (${u})</div>
          </ha-card>
        `);
      {
        const p = this._t("card.error_filtered_sensors");
        return this.debug && console.debug(`[PollenPrognosCard] ${p} (${u})`), j`
          <ha-card>
            ${this._renderNoAllergensHtml()}
          </ha-card>
        `;
      }
    }
    if (this._getStaleStatus().allStale)
      return j`
        <ha-card>
          ${this._renderStaleDataHtml()}
        </ha-card>
      `;
    const i = this.config.minimal ? this._renderMinimalHtml() : this._renderNormalHtml(), o = this.config.tap_action || null, s = (c = (d = this.config.background_color) == null ? void 0 : d.trim) != null && c.call(d) ? `background-color: ${this.config.background_color.trim()};` : "", a = o && o.type && o.type !== "none" ? "pointer" : "auto", n = Number(this.config.icon_size) > 0 ? Number(this.config.icon_size) : 48, l = `
    ${s}
    cursor: ${a};
    --pollen-icon-size: ${n}px;
  `;
    return j`
      <ha-card
        style="${l}"
        @click="${o && o.type && o.type !== "none" ? this._handleTapAction : null}"
      >
        ${i}
      </ha-card>
    `;
  }
  getCardSize() {
    return this.sensors.length + 1;
  }
  _handleTapAction(r) {
    var s, a;
    if (!this.tapAction || !this._hass) return;
    (s = r.preventDefault) == null || s.call(r), (a = r.stopPropagation) == null || a.call(r);
    const i = this.tapAction.type || "more-info";
    let o = this.tapAction.entity || "sun.sun";
    switch (i) {
      case "more-info":
        this._fire("hass-more-info", { entityId: o });
        break;
      case "navigate":
        this.tapAction.navigation_path && window.history.pushState(null, "", this.tapAction.navigation_path);
        break;
      case "call-service":
        if (this.tapAction.service && typeof this.tapAction.service == "string") {
          const [n, l] = this.tapAction.service.split(".");
          this._hass.callService(
            n,
            l,
            this.tapAction.service_data || {}
          );
        }
        break;
    }
  }
  _fire(r, i, o) {
    const s = new Event(r, {
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      ...o
    });
    return s.detail = i, this.dispatchEvent(s), s;
  }
  static get styles() {
    return ga`
      /* normalhtml */
      .forecast {
        width: 100%; /* Fyll hela kortet! */
        table-layout: fixed;
        border-collapse: separate;
        border-spacing: 0 2px;
        margin: 0 auto;
      }
      .forecast th,
      .forecast td {
        vertical-align: middle;
        min-width: 36px;
        /* Sätt ingen max-width – då tillåts kolumnerna expandera */
        padding: 2px 2px;
        text-align: center;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;
        line-height: 1.2;
      }

      /* Gör bilder/ikoner alltid så stora som cellen tillåter */
      .icon-wrapper {
        width: 100%;
        display: block;
        margin: 0 auto;
        text-align: center;
        position: relative;
      }

      .day-header {
        display: block;
        width: 100%;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        margin: 0 auto;
      }

      .icon-wrapper img {
        display: block;
        margin: 0 auto;
        width: 70%;
        height: auto;
        max-width: 60px;
        min-width: 18px;
      }

      img.allergen {
        width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
        max-width: 60px;
      }

      .pollen-img {
        display: block;
        width: var(--pollen-icon-size, 48px);
        max-width: var(--pollen-icon-size, 48px);
        min-width: 0;
        height: auto;
        margin: 0 auto 6px auto;
      }

      /* SVG icon styles */
      .pp-icon {
        display: block;
        width: var(--pollen-icon-size, 48px);
        height: var(--pollen-icon-size, 48px);
        max-width: var(--pollen-icon-size, 48px);
        max-height: var(--pollen-icon-size, 48px);
        min-width: 0;
        min-height: 0;
        margin: 0 auto 6px auto;
        color: var(--pp-icon-color, var(--primary-text-color));
      }

      .pp-icon svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .pp-icon svg g {
        stroke: var(--pp-icon-stroke, none);
        stroke-width: var(--pp-icon-stroke-width, 1);
      }

      .pp-icon-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
      }

      .pp-icon-loading {
        width: 24px;
        height: 24px;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-top-color: transparent;
        animation: pp-spin 1s linear infinite;
      }

      .pp-icon-error {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--pollen-icon-size, 48px);
        height: var(--pollen-icon-size, 48px);
        max-width: var(--pollen-icon-size, 48px);
        max-height: var(--pollen-icon-size, 48px);
        min-width: 0;
        min-height: 0;
        margin: 0 auto 6px auto;
      }

      @keyframes pp-spin {
        to { transform: rotate(360deg); }
      }

      .level-circle {
        width: var(--pollen-icon-size, 48px);
        max-width: var(--pollen-icon-size, 48px);
        min-width: 0;
        height: auto;
        margin: 0 auto 6px auto;
      }

      .forecast-content {
        width: 100%;
        overflow-x: auto;
        display: flex;
        justify-content: center;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .forecast-content::-webkit-scrollbar {
        display: none;
      }

      .allergen-icon-row td {
        padding-top: 4px;
        padding-bottom: 1px;
      }

      .allergen-text-row td {
        vertical-align: top !important; /* Tvinga innehållet uppåt */
        text-align: center;
        padding-top: 6px;
        padding-bottom: 2px; /* eller vad som känns lagom */
      }

      .block-separator-row td {
        padding: 0;
      }
      .block-separator {
        border: none;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        margin: 6px 0;
      }

      .icon-wrapper .circle-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 0.7rem;
        font-weight: bold;
        color: var(--primary-text-color);
        pointer-events: none;
        text-shadow:
          0 1px 3px #fff,
          0 0 2px #fff;
      }

      .forecast td {
        white-space: normal;
        overflow-wrap: anywhere;
        word-break: break-word;
        line-height: 1.2;
      }

      .sensor {
        display: flex;
        flex-direction: column; /* Stapla bild och text VERTIKALT */
        align-items: center; /* Centrera horisontellt */
        justify-content: flex-start;
        flex: 1 1 120px; /* Flexibel bredd, min 120px – justera fritt */
        min-width: 80px;
        max-width: 180px;
        margin: 0 4px;
      }

      /* minimalhtml */

      .flex-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        /* No font-size set here */
      }
      .sensor.minimal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        flex: 0 1 auto; /* Allow blocks to shrink tightly */
        min-width: 0; /* Allow as narrow as possible */
        max-width: none; /* No max width */
        margin: 0; /* No extra spacing, only gap from flex-container */
      }

      .short-text {
        display: block;
        text-align: center;
        margin-top: 2px;
        word-break: break-word;
        white-space: normal;
      }
      .pollen-img,
      .level-circle {
        width: var(--pollen-icon-size, 48px);
        height: var(--pollen-icon-size, 48px);
        max-width: var(--pollen-icon-size, 48px);
        max-height: var(--pollen-icon-size, 48px);
        min-width: 0;
        min-height: 0;
        object-fit: contain;
        margin: 0 auto 6px auto;
        display: block;
        vertical-align: middle;
      }
      .level-value-text {
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        text-align: center;
        white-space: nowrap;
      }

      /* No allergens display */
      .no-allergens-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        padding: 2em 1em;
        box-sizing: border-box;
      }

      .no-allergens-text {
        color: var(--primary-text-color);
      }

      /* Stale data display */
      .stale-data-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        padding: 2em 1em;
        box-sizing: border-box;
      }

      .stale-data-text {
        color: #b38600;
        font-weight: 500;
        margin-top: 0.5em;
      }

      .stale-data-subtitle {
        color: var(--secondary-text-color);
        font-size: 0.85em;
        margin-top: 0.25em;
      }

      /* Per-allergen stale indicator */
      .allergen-stale-row {
        opacity: 0.7;
      }

      .stale-cell {
        text-align: center;
        vertical-align: middle;
      }

      .stale-allergen-text {
        color: #b38600;
        font-style: italic;
      }

      .stale-allergen-name {
        color: var(--secondary-text-color);
      }

      .sensor.minimal.stale {
        opacity: 0.7;
      }
    `;
  }
}
customElements.define("pollenprognos-card", bf);
const gr = (t, e) => {
  const r = { ...t };
  for (const i of Object.keys(e)) {
    const o = e[i];
    o !== null && typeof o == "object" && !Array.isArray(o) && typeof t[i] == "object" && t[i] !== null ? r[i] = gr(t[i], o) : r[i] = o;
  }
  return r;
};
class xf extends Rt {
  get debug() {
    var e;
    return !!((e = this._config) != null && e.debug);
  }
  _hasSilamWeatherEntity(e) {
    var n, l;
    if (!this._hass || !this._hass.states || typeof this._hass.states != "object")
      return !1;
    const r = yt(this._hass, this.debug);
    if (r.locations.size > 0) {
      const d = Rr(r, e || "", this.debug);
      if (d) return !!d.weatherEntity;
    }
    if (!e) {
      const d = Object.keys(this._hass.states).filter(
        (c) => typeof c == "string" && c.startsWith("weather.silam_pollen_")
      ).map(
        (c) => c.replace(/^weather\.silam_pollen_/, "").replace(/_.+$/, "")
      ).filter((c, h, u) => u.indexOf(c) === h).sort();
      return this.debug && console.debug(
        "[Editor] _hasSilamWeatherEntity: found locations:",
        d
      ), d.length > 0;
    }
    const i = Be(this._hass), o = ((n = ue.weather_suffixes) == null ? void 0 : n[i]) || ((l = ue.weather_suffixes) == null ? void 0 : l.en) || [], s = e.toLowerCase();
    for (const d of o)
      if (`weather.silam_pollen_${s}_${d}` in this._hass.states) return !0;
    const a = `weather.silam_pollen_${s}_`;
    return Object.keys(this._hass.states).some(
      (d) => typeof d == "string" && d.startsWith(a)
    );
  }
  _resetAll() {
    var r;
    this.debug && console.debug("[Editor] resetAll"), this._userConfig = {};
    const e = ((r = this._config) == null ? void 0 : r.integration) ?? "pp";
    this.setConfig({ integration: e, type: "custom:pollenprognos-card" });
  }
  _resetPhrases(e) {
    this.debug && console.debug("[Editor] resetPhrases – lang:", e), this._updateConfig("date_locale", e);
    let r = [];
    this._config.integration === "gpl" && this._hass && (r = si(this._hass, this._config.location, !1), r = r.filter((c) => !We.includes(c)));
    const i = this._config.integration === "dwd" ? vt.allergens : this._config.integration === "peu" ? nr : this._config.integration === "silam" ? zo : this._config.integration === "kleenex" ? Ut.allergens : this._config.integration === "atmo" ? To : this._config.integration === "gpl" ? [...We, ...r] : Ue.allergens, o = {}, s = {};
    i.forEach((c) => {
      const h = Je(c), u = At(h), _ = h === "index" ? "index" : u;
      o[c] = oe(`editor.phrases_full.${_}`, e), s[c] = oe(`editor.phrases_short.${_}`, e);
    });
    const a = this._config.integration === "dwd" ? 4 : this._config.integration === "peu" ? 5 : this._config.integration === "gpl" ? 6 : (this._config.integration === "silam" || this._config.integration === "atmo", 7), n = Array.from(
      { length: a },
      (c, h) => oe(`editor.phrases_levels.${h}`, e)
    ), l = {
      0: oe("editor.phrases_days.0", e),
      1: oe("editor.phrases_days.1", e),
      2: oe("editor.phrases_days.2", e)
    }, d = oe("editor.no_information", e);
    this._updateConfig("phrases", {
      full: o,
      short: s,
      levels: n,
      days: l,
      no_information: d
    });
  }
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
      installedCities: { type: Array },
      installedRegionIds: { type: Array },
      _initDone: { type: Boolean },
      _selectedPhraseLang: { state: !0 },
      _tapType: { type: String },
      _tapEntity: { type: String },
      _tapNavigation: { type: String },
      _tapService: { type: String },
      _tapServiceData: { type: String }
    };
  }
  // Editor translations always follow the Home Assistant language.
  get _lang() {
    return Be(this._hass);
  }
  _t(e) {
    return oe(`editor.${e}`, this._lang);
  }
  _getAllergenDisplayName(e) {
    if (e == null) return "";
    const r = typeof e == "string" ? e : String(e), i = ke(r), o = At(i), s = `phrases_full.${o}`, a = this._t(s);
    return a && a !== s ? a : r ? r.charAt(0).toUpperCase() + r.slice(1) : o ? o.charAt(0).toUpperCase() + o.slice(1) : "";
  }
  constructor() {
    super(), this._userConfig = {}, this._integrationExplicit = !1, this._thresholdExplicit = !1, this._config = {}, this.installedCities = [], this.installedPeuLocations = [], this.installedSilamLocations = [], this.installedKleenexLocations = [], this.installedAtmoLocations = [], this._prevIntegration = void 0, this.installedRegionIds = [], this._initDone = !1, this._selectedPhraseLang = Be(), this._allergensExplicit = !1, this._origAllergensSet = !1, this._userAllergens = null, this._tapType = "none", this._tapEntity = "", this._tapNavigation = "", this._tapService = "", this._tapServiceData = "";
  }
  setConfig(e) {
    var r, i, o;
    try {
      this.debug && console.debug("[Editor] ▶️ setConfig INCOMING:", e), e.phrases && (this._userConfig.phrases = e.phrases), this._selectedPhraseLang = Be(this._hass, e.date_locale);
      const s = { ...e };
      typeof s.integration == "string" && (s.integration = s.integration.toLowerCase());
      const n = (de(s.integration || "pp") || de("pp")).allergens;
      Object.entries(V).forEach(([y, g]) => {
        y in s || (s[y] = g);
      }), Array.isArray(e.allergens) && (!Se(e.allergens, n) || this._allergensExplicit) && (this._userConfig.allergens = [...e.allergens], this._allergensExplicit = !0, this.debug && console.debug(
        "[Editor] saved user-chosen allergens:",
        this._userConfig.allergens
      ));
      const l = (de(s.integration) || de("pp")).pollen_threshold;
      s.hasOwnProperty("pollen_threshold") && !this._thresholdExplicit && s.pollen_threshold === l && (this.debug && console.debug(
        "[Editor] dropping incoming stub-threshold (matches stub):",
        l
      ), delete s.pollen_threshold);
      const d = e.integration;
      this._prevIntegration !== void 0 && d !== this._prevIntegration && (delete this._userConfig.allergens, this._allergensExplicit = !1, this.debug && console.debug("[Editor] integration changed → wipe allergens")), !this._integrationExplicit && s.integration === Ue.integration && (this.debug && console.debug("[Editor] dropped stub integration"), delete s.integration), !this._daysExplicit && s.days_to_show === Ue.days_to_show && (this.debug && console.debug("[Editor] dropped stub days_to_show"), delete s.days_to_show);
      const c = (de(s.integration) || de("pp")).date_locale;
      if (!this._localeExplicit && s.date_locale === c && (this.debug && console.debug("[Editor] dropped stub date_locale"), delete s.date_locale), this._userConfig.allergens && s.allergens && Se(s.allergens, this._userConfig.allergens))
        this.debug && console.debug(
          "[Editor] dropping incoming allergens (same as saved)"
        ), delete s.allergens;
      else if (this._allergensExplicit && s.allergens) {
        const y = (de(
          s.integration || this._config.integration || "pp"
        ) || de("pp")).allergens;
        Se(s.allergens, y) && (this.debug && console.debug(
          "[Editor] dropping incoming allergens (matches stub, keeping explicit)"
        ), delete s.allergens);
      }
      this._userConfig = gr(this._userConfig, s), this._thresholdExplicit = this._userConfig.hasOwnProperty("pollen_threshold"), this._allergensExplicit = this._userConfig.hasOwnProperty("allergens"), this._integrationExplicit = this._userConfig.hasOwnProperty("integration"), this._daysExplicit = this._userConfig.hasOwnProperty("days_to_show"), this._localeExplicit = this._userConfig.hasOwnProperty("date_locale");
      let h = this._userConfig.integration !== void 0 ? this._userConfig.integration : this._config.integration;
      if (!this._integrationExplicit && this._hass) {
        const y = Object.keys(this._hass.states);
        y.some(
          (g) => typeof g == "string" && g.startsWith("sensor.pollen_")
        ) ? h = "pp" : y.some(
          (g) => typeof g == "string" && g.startsWith("sensor.polleninformation_")
        ) ? h = "peu" : y.some(
          (g) => typeof g == "string" && g.startsWith("sensor.pollenflug_")
        ) ? h = "dwd" : /* Primary: hass.entities platform check */ (r = this._hass) != null && r.entities && Object.values(this._hass.entities).some(
          (g) => g.platform === "silam_pollen" && !g.entity_category
        ) || // Fallback: regex
        y.some(
          (g) => typeof g == "string" && g.startsWith("sensor.silam_pollen_")
        ) ? h = "silam" : y.some(
          (g) => typeof g == "string" && g.startsWith("sensor.kleenex_pollen_radar_")
        ) ? h = "kleenex" : y.some(
          (g) => typeof g == "string" && /^sensor\.niveau_(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)_/.test(g)
        ) ? h = "atmo" : this._hass && // Primary: check hass.entities for pollenlevels platform
        (this._hass.entities && Object.values(this._hass.entities).some(
          (g) => g.platform === "pollenlevels" && !g.entity_category
        ) || // Fallback: check attribution
        y.some((g) => {
          var k, w, S;
          const v = this._hass.states[g];
          return ((k = v == null ? void 0 : v.attributes) == null ? void 0 : k.attribution) === Kt && ((w = v.attributes) == null ? void 0 : w.device_class) !== "date" && ((S = v.attributes) == null ? void 0 : S.device_class) !== "timestamp";
        })) && (h = "gpl"), this._userConfig.integration = h, this.debug && console.debug("[Editor] auto-detected integration:", h);
      }
      (h === "silam" || h === "peu") && !this._userConfig.mode && (this._userConfig.mode = "daily");
      const u = de(h) || de("pp");
      let _ = gr(u, this._userConfig);
      if (Object.entries(V).forEach(([y, g]) => {
        y in _ || (_[y] = g);
      }), Object.entries(V).forEach(([y, g]) => {
        _[y] === g && delete _[y];
      }), this._userConfig.hasOwnProperty("pollen_threshold") || (_.pollen_threshold = u.pollen_threshold, this.debug && console.debug(
        "[Editor] reset pollen_threshold to stub:",
        u.pollen_threshold
      )), _.allergens = Array.isArray(this._userConfig.allergens) ? this._userConfig.allergens : u.allergens, _.integration = h, _.type = "custom:pollenprognos-card", this._config = _, this._prevIntegration = h, this.debug && console.debug(
        "[Editor][F] slutgiltigt this._config.allergens:",
        this._config.allergens
      ), this._daysExplicit || (this._config.days_to_show = u.days_to_show, this.debug && console.debug(
        "[Editor] reset days_to_show to stub:",
        u.days_to_show
      )), !this._localeExplicit) {
        const y = Be(this._hass, null), g = ((o = (i = this._hass) == null ? void 0 : i.locale) == null ? void 0 : o.language) || `${y}-${y.toUpperCase()}`;
        this._config.date_locale = g, this.debug && console.debug(
          "[Editor] autofilled date_locale:",
          g,
          "(HA language was:",
          y,
          ")"
        );
      }
      if (this._initDone = !1, this._hass) {
        const y = Object.keys(this._hass.states);
        this.installedRegionIds = Array.from(
          new Set(
            y.filter(
              (v) => typeof v == "string" && v.startsWith("sensor.pollenflug_")
            ).map((v) => v.split("_").pop())
          )
        ).sort((v, k) => Number(v) - Number(k));
        const g = new Set(
          y.filter(
            (v) => typeof v == "string" && v.startsWith("sensor.pollen_") && !v.startsWith("sensor.pollenflug_")
          ).map(
            (v) => v.slice(14).replace(/_[^_]+$/, "")
          )
        );
        this.installedCities = Mo.filter(
          (v) => g.has(
            v.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[-\s]/g, "_")
          )
        ).sort();
      }
      this._integrationExplicit || (h === "dwd" && !this._userConfig.region_id && this.installedRegionIds.length && (this._config.region_id = this.installedRegionIds[0]), h === "pp" && !this._userConfig.city && this.installedCities.length && (this._config.city = this.installedCities[0]), h === "silam" && !this._userConfig.location && this.installedLocations.length && (this._config.location = this.installedLocations[0])), this.debug && console.debug("[Editor] färdig _config innan dispatch:", this._config), this._config.tap_action ? (this._tapType = this._config.tap_action.type || "more-info", this._tapEntity = this._config.tap_action.entity || "", this._tapNavigation = this._config.tap_action.navigation_path || "", this._tapService = this._config.tap_action.service || "", this._tapServiceData = JSON.stringify(
        this._config.tap_action.service_data || {},
        null,
        2
      )) : (this._tapType = "none", this._tapEntity = "", this._tapNavigation = "", this._tapService = "", this._tapServiceData = "");
      const p = this._config || {}, f = Object.keys(_).filter(
        (y) => !Se(_[y], p[y])
      );
      if (!(f.length > 0 && f.every((y) => Ra.includes(y))) && !Se(p, _) ? (this._config = _, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._config },
          bubbles: !0,
          composed: !0
        })
      )) : this._config = _, this.requestUpdate(), this._prevIntegration = d, this._initDone = !0, this._config.integration === "gpl" && this._hass) {
        const y = Pt(this._hass, !1);
        this.installedGplLocations = Array.from(y.locations.entries()).map(([k, w]) => [k, w.label]);
        const g = this._config.location || (this.installedGplLocations.length ? this.installedGplLocations[0][0] : null), v = si(this._hass, g, !1);
        this.installedGplPlants = v.filter((k) => !We.includes(k));
      }
      if (this._config.integration === "silam" && this._hass) {
        const y = yt(this._hass, !1);
        y.locations.size > 0 && (this.installedSilamLocations = Array.from(y.locations.entries()).map(([g, v]) => [g, v.label]));
      }
    } catch (s) {
      throw console.error("pollenprognos-card-editor: Fel i setConfig:", s, e), s;
    }
  }
  set hass(e) {
    if (this._hass === e) return;
    this._hass = e;
    const r = this._integrationExplicit;
    this._initDone || (this._selectedPhraseLang = Be(e, this._config.date_locale));
    const i = new Set(
      Object.values(Li).flat()
    ), o = Object.keys(e.states).filter(
      (m) => {
        if (typeof m != "string" || !m.startsWith("sensor.pollen_") || m.startsWith("sensor.pollenflug_")) return !1;
        const y = /^sensor\.pollen_([^_]+)(_.*)?$/.exec(m);
        if (!y) return !1;
        const g = y[1];
        return !(!y[2] && i.has(g));
      }
    ), s = Object.keys(e.states).filter(
      (m) => typeof m == "string" && m.startsWith("sensor.pollenflug_")
    ), a = Object.keys(e.states).filter(
      (m) => typeof m == "string" && m.startsWith("sensor.polleninformation_")
    ), n = yt(e, !1);
    let l = [];
    if (n.locations.size > 0)
      for (const [, m] of n.locations)
        for (const y of m.sensors.values())
          l.push(y);
    l.length || (l = Object.keys(e.states).filter(
      (m) => typeof m == "string" && m.startsWith("sensor.silam_pollen_")
    ));
    const d = Object.keys(e.states).filter(
      (m) => {
        if (typeof m != "string") return !1;
        const y = /^sensor\.pollen_([^_]+)$/.exec(m);
        if (!y) return !1;
        const g = y[1];
        return i.has(g);
      }
    ), c = Object.keys(e.states).filter(
      (m) => typeof m == "string" && /^sensor\.(?:niveau_(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)|(?:pm25|pm10|ozone|dioxyde_d_azote|dioxyde_de_soufre)|qualite_globale(?:_pollen)?)_/.test(m) && !/_j_\d+$/.test(m)
    );
    let h = [];
    e.entities && (h = Object.entries(e.entities).filter(([, m]) => m.platform === "pollenlevels" && !m.entity_category).map(([m]) => m)), h.length || (h = Object.keys(e.states).filter((m) => {
      var g;
      const y = e.states[m];
      return ((g = y == null ? void 0 : y.attributes) == null ? void 0 : g.attribution) === Kt && y.attributes.device_class !== "date" && y.attributes.device_class !== "timestamp";
    }));
    let u = this._userConfig.integration;
    r || (o.length ? u = "pp" : d.length ? u = "plu" : a.length ? u = "peu" : s.length ? u = "dwd" : l.length ? u = "silam" : c.length ? u = "atmo" : h.length && (u = "gpl"), this._userConfig.integration = u, this.debug && console.debug("[Editor] autodetect:", { pp: o.length, plu: d.length, peu: a.length, dwd: s.length, silam: l.length, atmo: c.length, gpl: h.length, chosen: u }));
    const _ = Pt(e, !1);
    if (this.installedGplLocations = Array.from(_.locations.entries()).map(([m, y]) => [m, y.label]), u === "gpl") {
      const m = this._config.location || (this.installedGplLocations.length ? this.installedGplLocations[0][0] : null), y = si(e, m, !1);
      this.installedGplPlants = y.filter((g) => !We.includes(g));
    } else
      this.installedGplPlants = [];
    (u === "silam" || u === "peu") && !this._userConfig.mode && (this._userConfig.mode = "daily");
    const p = de(u) || de("pp");
    let f = gr(p, this._userConfig);
    if (this._userConfig.hasOwnProperty("pollen_threshold") || (f.pollen_threshold = p.pollen_threshold, this.debug && console.debug(
      "[Editor][hass] reset pollen_threshold to stub:",
      p.pollen_threshold
    )), f.sort = f.sort || "value_ascending", Object.entries(V).forEach(([m, y]) => {
      f[m] === y && delete f[m];
    }), !Se(this._config, f)) {
      this._config = f, this.installedRegionIds = Array.from(
        new Set(s.map((g) => g.split("_").pop()))
      ).sort((g, v) => Number(g) - Number(v));
      const m = Array.from(
        new Set(
          o.map(
            (g) => g.slice(14).replace(/_[^_]+$/, "")
          )
        )
      );
      if (this.installedCities = Mo.filter(
        (g) => m.includes(
          g.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[-\s]/g, "_")
        )
      ).sort((g, v) => g.localeCompare(v)), this.installedPeuLocations = Array.from(
        new Map(
          Object.values(e.states).filter(
            (g) => g && typeof g == "object" && typeof g.entity_id == "string" && g.entity_id.startsWith("sensor.polleninformation_")
          ).map((g) => {
            var w, S, P, x;
            const v = ((w = g.attributes) == null ? void 0 : w.location_slug) || g.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, ""), k = ((S = g.attributes) == null ? void 0 : S.location_title) || (typeof ((P = g.attributes) == null ? void 0 : P.friendly_name) == "string" ? (x = g.attributes.friendly_name.match(/\((.*?)\)/)) == null ? void 0 : x[1] : void 0) || v;
            return [v, k];
          })
        )
      ), n.locations.size > 0)
        this.installedSilamLocations = Array.from(
          n.locations.entries()
        ).map(([g, v]) => [g, v.label]), this.debug && console.debug(
          "[Editor][SILAM] Discovery-based locations:",
          this.installedSilamLocations
        );
      else {
        const g = [
          "allergy_risk",
          "alder",
          "birch",
          "grass",
          "hazel",
          "mugwort",
          "olive",
          "ragweed"
        ], v = new Set(
          Object.values(ue.mapping).flatMap(
            (k) => Object.entries(k).filter(
              ([, w]) => g.includes(w)
            ).map(([w]) => w)
          )
        );
        this.installedSilamLocations = Array.from(
          new Map(
            Object.values(e.states).filter((k) => {
              if (!k || typeof k != "object" || typeof k.entity_id != "string" || !k.entity_id.startsWith("sensor.silam_pollen_"))
                return !1;
              const w = k.entity_id.match(
                /^sensor\.silam_pollen_(.*)_([^_]+)$/
              );
              if (!w) return !1;
              const S = w[2];
              return v.has(S);
            }).map((k) => {
              var E, L;
              const w = k.entity_id.match(
                /^sensor\.silam_pollen_(.*)_([^_]+)$/
              ), S = w ? w[1].replace(/^[-\s]+/, "") : "", P = ke(S);
              let x = ((E = k.attributes) == null ? void 0 : E.location_title) || (typeof ((L = k.attributes) == null ? void 0 : L.friendly_name) == "string" ? k.attributes.friendly_name.replace(/^SILAM Pollen\s*-?\s*/i, "").replace(new RegExp("\\s+\\p{L}+$", "u"), "").trim() : "") || S;
              return x = x.replace(/^[-\s]+/, ""), x = x.charAt(0).toUpperCase() + x.slice(1), [P, x];
            })
          )
        );
      }
      this.installedKleenexLocations = Array.from(
        new Map(
          Object.values(e.states).filter(
            (g) => g && typeof g == "object" && typeof g.entity_id == "string" && g.entity_id.startsWith("sensor.kleenex_pollen_radar_")
          ).map((g) => {
            var S;
            const v = g.entity_id.match(
              /^sensor\.kleenex_pollen_radar_(.*)_(?:tree|bomen|arbre|alber|grass|gras|graminee|graminace|weed|kruid|onkruid|herbacee|erbace)/
            );
            if (!v) return null;
            const k = v[1];
            let w = ((S = g.attributes) == null ? void 0 : S.friendly_name) || k;
            return w = w.replace(/^Kleenex Pollen Radar\s*[\(\-]?\s*/i, "").replace(/[\)\s]+(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee).*$/i, "").replace(/^(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee)(?:\s.*)?$/i, "").trim(), w || (w = k.charAt(0).toUpperCase() + k.slice(1)), [k, w];
          }).filter((g) => g !== null)
        )
      );
      const y = /^sensor\.(?:niveau_(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)|(?:pm25|pm10|ozone|dioxyde_d_azote|dioxyde_de_soufre)|qualite_globale(?:_pollen)?)_(.+?)(?:_j_\d+)?$/;
      this.installedAtmoLocations = Array.from(
        new Map(
          c.map((g) => {
            var P;
            const v = g.match(y);
            if (!v) return null;
            const k = v[1], w = e.states[g], S = ((P = w == null ? void 0 : w.attributes) == null ? void 0 : P["Nom de la zone"]) || k.charAt(0).toUpperCase() + k.slice(1).replace(/_/g, " ");
            return [k, S];
          }).filter((g) => g !== null)
        )
      ), this._initDone || (u === "dwd" && !this._userConfig.region_id && this.installedRegionIds.length && (this._config.region_id = this.installedRegionIds[0]), u === "pp" && !this._userConfig.city && this.installedCities.length && (this._config.city = this.installedCities[0]), u === "silam" && !this._userConfig.location && this.installedSilamLocations.length && (this._config.location = this.installedSilamLocations[0][0]), u === "kleenex" && !this._userConfig.location && this.installedKleenexLocations.length && (this._config.location = this.installedKleenexLocations[0][0]), u === "atmo" && !this._userConfig.location && this.installedAtmoLocations.length && (this._config.location = this.installedAtmoLocations[0][0]), u === "gpl" && !this._userConfig.location && this.installedGplLocations.length && (this._config.location = this.installedGplLocations[0][0])), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._config },
          bubbles: !0,
          composed: !0
        })
      );
    }
    this.requestUpdate(), this._initDone = !0;
  }
  _onAllergenToggle(e, r) {
    this._config.integration === "peu" && this._config.mode !== "daily" && e !== "allergy_risk" && r && this._updateConfig("mode", "daily");
    const i = new Set(this._config.allergens);
    r ? i.add(e) : i.delete(e), this._updateConfig("allergens", [...i]);
  }
  _toggleSelectAllAllergens(e) {
    const r = new Set(this._config.allergens), i = e.every((s) => r.has(s));
    this._config.integration === "peu" && this._config.mode !== "daily" && !i && this._updateConfig("mode", "daily");
    const o = i ? [] : e;
    this._updateConfig("allergens", [...o]);
  }
  /**
   * Toggle a subset of allergens without affecting other selections.
   * If all subset items are selected → remove only those.
   * Otherwise → add all subset items (keeping existing selections).
   */
  _toggleAllergenSubset(e) {
    const r = new Set(this._config.allergens);
    e.every((o) => r.has(o)) ? e.forEach((o) => r.delete(o)) : e.forEach((o) => r.add(o)), this._updateConfig("allergens", [...r]);
  }
  _updateConfig(e, r) {
    if (this.debug && console.debug("[Editor] _updateConfig – prop:", e, "value:", r), e === "sort" && r === "none") {
      const s = { ...this._config, sort: r };
      (this._config.integration === "kleenex" || this._config.integration === "gpl") && this._config.sort_category_allergens_first && (s.sort_category_allergens_first = !1, delete this._userConfig.sort_category_allergens_first), (this._config.integration === "peu" || this._config.integration === "atmo") && this._config.allergy_risk_top && (s.allergy_risk_top = !1, delete this._userConfig.allergy_risk_top), this._config.integration === "atmo" && this._config.sort_pollution_block && (s.sort_pollution_block = !1, delete this._userConfig.sort_pollution_block), this._config.integration === "silam" && this._config.index_top && (s.index_top = !1, delete this._userConfig.index_top), this._config = s, this._userConfig.sort = r, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: s },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "levels_inherit_mode") {
      if (r === "custom" && this._config.levels_inherit_mode !== "custom") {
        const s = {
          ...this._config,
          levels_inherit_mode: r,
          levels_gap: V.levels_gap,
          levels_colors: V.levels_colors,
          levels_empty_color: V.levels_empty_color,
          levels_gap_color: V.levels_gap_color
        };
        this._config = s, this._userConfig.levels_inherit_mode = r, delete this._userConfig.levels_gap, delete this._userConfig.levels_colors, delete this._userConfig.levels_empty_color, delete this._userConfig.levels_gap_color, this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: s },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      } else if (r === "inherit_allergen" && this._config.levels_inherit_mode === "custom") {
        const s = this._config.allergen_stroke_width || V.allergen_stroke_width, a = er(s), l = (this._config.allergen_colors || V.allergen_colors)[0] || V.levels_empty_color, d = {
          ...this._config,
          levels_inherit_mode: r,
          levels_gap: a,
          levels_empty_color: l,
          allergen_levels_gap_synced: !0
          // Enable sync when switching to inherit mode
        };
        this._config = d, this._userConfig.levels_inherit_mode = r, this._userConfig.levels_gap = a, this._userConfig.levels_empty_color = l, this._userConfig.allergen_levels_gap_synced = !0, this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: d },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      }
    }
    if (e === "allergen_colors" && Array.isArray(r)) {
      const s = { ...this._config, allergen_colors: r };
      this._userConfig.allergen_colors = r, (this._config.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && r[0] && (s.levels_empty_color = r[0], this._userConfig.levels_empty_color = r[0]), this._config = s, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: s },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "allergen_stroke_width" && r === V.allergen_stroke_width) {
      const s = { ...this._config, allergen_stroke_width: r };
      if (this._userConfig.allergen_stroke_width = r, (this._config.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (this._config.allergen_levels_gap_synced ?? !0)) {
        const a = er(r);
        s.levels_gap = a, this._userConfig.levels_gap = a;
      }
      this._config = s, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: s },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if ((e === "levels_thickness" || e === "levels_gap" || e === "levels_colors" || e === "levels_empty_color" || e === "levels_gap_color") && r === V[e]) {
      const s = { ...this._config, [e]: r };
      this._config = s, this._userConfig[e] = r, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: s },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "allergen_color_mode" && r === "default_colors" && this._config.allergen_color_mode === "custom") {
      const s = {
        ...this._config,
        allergen_color_mode: r,
        allergen_colors: V.allergen_colors,
        allergen_outline_color: V.levels_gap_color,
        no_allergens_color: V.no_allergens_color
      };
      this._config = s, this._userConfig.allergen_color_mode = r, delete this._userConfig.allergen_colors, delete this._userConfig.allergen_outline_color, delete this._userConfig.no_allergens_color, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: s },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "date_locale") {
      const s = this._config.sort, a = this._config.mode;
      this._config = {
        ...this._config,
        date_locale: r,
        sort: "",
        mode: ""
      }, this.requestUpdate(), setTimeout(() => {
        this._config = {
          ...this._config,
          sort: s,
          mode: a
        }, this.requestUpdate(), this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: !0,
            composed: !0
          })
        );
      }, 0);
      return;
    }
    const i = { ...this._userConfig };
    let o;
    if (e === "integration") {
      const s = r, a = this._config.integration;
      s !== a && (delete i.city, delete i.region_id, delete i.location, delete i.entity_prefix, delete i.entity_suffix, delete i.mode, delete i.allergens, delete i.days_to_show, delete i.pollen_threshold, delete i.allergy_risk_top, delete i.index_top, this._allergensExplicit = !1);
      const n = de(s) || de("pp");
      o = gr(n, i), o.integration = s, this._userConfig.integration = s, this._integrationExplicit = !0;
    } else {
      if (o = { ...this._config, [e]: r }, e === "allergens" && (this._userConfig.allergens = r, this._allergensExplicit = !0, this.debug && console.debug(
        "[Editor] allergens explicitly changed:",
        this._userConfig.allergens
      )), ["city", "region_id", "location"].includes(e) && r !== "manual" && (o.entity_prefix = "", o.entity_suffix = ""), (this._config.integration === "silam" || this._config.integration === "peu") && e === "mode") {
        if (r !== "daily")
          o.days_to_show = 8, o.show_empty_days = !1, this._config.integration === "peu" && (o.allergens = ["allergy_risk"], this._userConfig.allergens = ["allergy_risk"], this._allergensExplicit = !0);
        else if (o.days_to_show = this._config.integration === "silam" ? 5 : 4, this._config.integration === "peu") {
          const s = this._config.allergens || [], a = s.length === 1 && s[0] === "allergy_risk";
          (!this._allergensExplicit || a) && (o.allergens = [...nr], this._userConfig.allergens = [...nr], this._allergensExplicit = !0);
        }
      }
      this._config.integration === "silam" && e === "location" && (this._hasSilamWeatherEntity(r) || (o.mode = "daily", o.days_to_show = 2));
    }
    o.type = this._config.type, Se(this._config, o) ? this._config = o : (this._config = o, this.debug && console.debug("[Editor] updated _config:", this._config), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  render() {
    const e = {
      phrases: {
        full: {},
        short: {},
        levels: [],
        days: {},
        no_information: ""
      },
      ...V,
      ...this._config
    }, r = e.integration === "dwd" ? vt.allergens : e.integration === "peu" ? nr : e.integration === "silam" ? zo : e.integration === "kleenex" ? Ut.allergens : e.integration === "plu" ? Ar.allergens : e.integration === "gpl" ? [...We, ...this.installedGplPlants || []] : e.integration === "atmo" ? To : Ue.allergens, i = e.integration === "dwd" ? 4 : e.integration === "peu" ? 5 : e.integration === "gpl" ? 6 : e.integration === "plu" ? 4 : 7, o = e.integration === "dwd" ? { min: 0, max: 3, step: 0.5 } : e.integration === "peu" ? { min: 0, max: 4, step: 1 } : e.integration === "gpl" ? { min: 0, max: 5, step: 1 } : e.integration === "plu" ? { min: 0, max: 3, step: 1 } : { min: 0, max: 6, step: 1 }, a = [
      "value_ascending",
      "value_descending",
      "name_ascending",
      "name_descending",
      "none"
    ].map((n) => ({
      value: n,
      label: this._t(`sort_${n}`)
    }));
    return this.debug && (console.debug("Aktuellt språk (lang):", this._lang), console.debug("Sort label test:", this._t("sort_value_ascending"))), j`
      <div class="card-config">
        <!-- Återställ-knapp -->
        <ha-button outlined @click=${() => this._resetAll()}>
          ${this._t("preset_reset_all")}
        </ha-button>

        <!-- Integration & Location -->
        <details open>
          <summary>${this._t("summary_integration_and_place")}</summary>
          <ha-formfield label="${this._t("integration")}">
            <ha-selector
              .hass=${this._hass}
              .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "pp", label: this._t("integration.pp") },
          { value: "peu", label: this._t("integration.peu") },
          { value: "dwd", label: this._t("integration.dwd") },
          { value: "silam", label: this._t("integration.silam") },
          { value: "plu", label: this._t("integration.plu") },
          {
            value: "kleenex",
            label: this._t("integration.kleenex")
          },
          { value: "atmo", label: this._t("integration.atmo") },
          { value: "gpl", label: this._t("integration.gpl") }
        ]
      }
    }}
              .value=${e.integration}
              @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("integration", l);
    }}
            ></ha-selector>
          </ha-formfield>
          ${e.integration === "pp" ? j`
                <ha-formfield label="${this._t("city")}">
                  <ha-selector
                    .hass=${this._hass}
                    .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "",
            label: this._t("location_autodetect")
          },
          ...this.installedCities.map((n) => ({
            value: n,
            label: n
          })),
          {
            value: "manual",
            label: this._t("location_manual")
          }
        ]
      }
    }}
                    .value=${e.city || ""}
                    @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("city", l);
    }}
                  ></ha-selector>
                </ha-formfield>
              ` : e.integration === "peu" ? j`
                  <ha-formfield label="${this._t("location")}">
                    <ha-selector
                      .hass=${this._hass}
                      .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "",
            label: this._t("location_autodetect")
          },
          ...this.installedPeuLocations.map(([n, l]) => ({
            value: n,
            label: l
          })),
          {
            value: "manual",
            label: this._t("location_manual")
          }
        ]
      }
    }}
                      .value=${e.location || ""}
                      @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("location", l);
    }}
                    ></ha-selector>
                  </ha-formfield>
                ` : e.integration === "silam" ? j`
                    <ha-formfield label="${this._t("location")}">
                      <ha-selector
                        .hass=${this._hass}
                        .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "",
            label: this._t("location_autodetect")
          },
          ...this.installedSilamLocations.map(([n, l]) => ({
            value: n,
            label: l
          })),
          {
            value: "manual",
            label: this._t("location_manual")
          }
        ]
      }
    }}
                        .value=${e.location || ""}
                        @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("location", l);
    }}
                      ></ha-selector>
                    </ha-formfield>
                  ` : e.integration === "kleenex" ? j`
                      <ha-formfield label="${this._t("location")}">
                        <ha-selector
                          .hass=${this._hass}
                          .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "",
            label: this._t("location_autodetect")
          },
          ...this.installedKleenexLocations.map(([n, l]) => ({
            value: n,
            label: l
          })),
          {
            value: "manual",
            label: this._t("location_manual")
          }
        ]
      }
    }}
                          .value=${e.location || ""}
                          @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("location", l);
    }}
                        ></ha-selector>
                      </ha-formfield>
                    ` : e.integration === "atmo" ? j`
                        <ha-formfield label="${this._t("location")}">
                          <ha-selector
                            .hass=${this._hass}
                            .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "",
            label: this._t("location_autodetect")
          },
          ...this.installedAtmoLocations.map(([n, l]) => ({
            value: n,
            label: l
          })),
          {
            value: "manual",
            label: this._t("location_manual")
          }
        ]
      }
    }}
                            .value=${e.location || ""}
                            @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("location", l);
    }}
                          ></ha-selector>
                        </ha-formfield>
                      ` : e.integration === "gpl" ? j`
                        <ha-formfield label="${this._t("location")}">
                          <ha-selector
                            .hass=${this._hass}
                            .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "",
            label: this._t("location_autodetect")
          },
          ...(this.installedGplLocations || []).map(([n, l]) => ({
            value: n,
            label: l
          })),
          {
            value: "manual",
            label: this._t("location_manual")
          }
        ]
      }
    }}
                            .value=${e.location || ""}
                            @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("location", l);
    }}
                          ></ha-selector>
                        </ha-formfield>
                      ` : e.integration === "plu" ? "" : j`
                      <ha-formfield label="${this._t("region_id")}">
                        <ha-selector
                          .hass=${this._hass}
                          .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "",
            label: this._t("location_autodetect")
          },
          ...this.installedRegionIds.map((n) => ({
            value: n,
            label: `${n} — ${Ia[n] || n}`
          })),
          {
            value: "manual",
            label: this._t("location_manual")
          }
        ]
      }
    }}
                          .value=${e.region_id || ""}
                          @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("region_id", l);
    }}
                        ></ha-selector>
                      </ha-formfield>
                    `}
          ${e.integration === "silam" && this._hasSilamWeatherEntity(e.location) ? j`
                <ha-formfield label="${this._t("mode")}">
                  <ha-selector
                    .hass=${this._hass}
                    .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "daily", label: this._t("mode_daily") },
          { value: "twice_daily", label: this._t("mode_twice_daily") },
          { value: "hourly", label: this._t("mode_hourly") }
        ]
      }
    }}
                    .value=${e.mode || "daily"}
                    @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("mode", l);
    }}
                  ></ha-selector>
                </ha-formfield>
              ` : e.integration === "peu" ? j`
                  <ha-formfield label="${this._t("mode")}">
                    <ha-selector
                      .hass=${this._hass}
                      .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "daily", label: this._t("mode_daily") },
          { value: "twice_daily", label: this._t("mode_twice_daily") },
          { value: "hourly", label: this._t("mode_hourly") },
          { value: "hourly_second", label: this._t("mode_hourly_second") },
          { value: "hourly_third", label: this._t("mode_hourly_third") },
          { value: "hourly_fourth", label: this._t("mode_hourly_fourth") },
          { value: "hourly_sixth", label: this._t("mode_hourly_sixth") },
          { value: "hourly_eighth", label: this._t("mode_hourly_eighth") }
        ]
      }
    }}
                      .value=${e.mode || "daily"}
                      @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("mode", l);
    }}
                    ></ha-selector>
                  </ha-formfield>
                  <p>${this._t("peu_nondaily_expl")}</p>
                ` : ""}
          ${e.integration === "pp" && e.city === "manual" || e.integration === "dwd" && e.region_id === "manual" || (e.integration === "peu" || e.integration === "silam" || e.integration === "kleenex" || e.integration === "atmo" || e.integration === "gpl") && e.location === "manual" ? j`
                <details>
                  <summary>${this._t("summary_entity_prefix_suffix")}</summary>
                  <ha-formfield label="${this._t("entity_prefix")}">
                    <ha-textfield
                      .value=${e.entity_prefix || ""}
                      placeholder="${this._t("entity_prefix_placeholder")}"
                      @input=${(n) => this._updateConfig("entity_prefix", n.target.value)}
                    ></ha-textfield>
                  </ha-formfield>
                  <ha-formfield label="${this._t("entity_suffix")}">
                    <ha-textfield
                      .value=${e.entity_suffix || ""}
                      placeholder="${this._t("entity_suffix_placeholder")}"
                      @input=${(n) => this._updateConfig("entity_suffix", n.target.value)}
                    ></ha-textfield>
                  </ha-formfield>
                </details>
              ` : ""}
        </details>

        <details open>
          <summary>${this._t("summary_appearance_and_layout")}</summary>
          <!-- Title -->
          <details open>
            <summary>${this._t("summary_title_and_header")}</summary>
            <div style="display:flex; gap:8px; align-items:center;">
              <ha-formfield label="${this._t("title_hide")}">
                <ha-checkbox
                  .checked=${e.title === !1}
                  @change=${(n) => {
      n.target.checked ? this._updateConfig("title", !1) : this._updateConfig("title", !0);
    }}
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="${this._t("title_automatic")}">
                <ha-checkbox
                  .checked=${e.title === !0 || e.title === void 0}
                  @change=${(n) => {
      n.target.checked ? this._updateConfig("title", !0) : this._updateConfig("title", "");
    }}
                ></ha-checkbox>
              </ha-formfield>
            </div>
            <ha-formfield label="${this._t("title")}">
              <ha-textfield
                .value=${typeof e.title == "string" ? e.title : e.title === !1 ? "(false)" : ""}
                placeholder="${this._t("title_placeholder")}"
                .disabled=${e.title === !1}
                @input=${(n) => {
      const l = n.target.value;
      l.trim() === "" ? this._updateConfig("title", !0) : this._updateConfig("title", l);
    }}
              ></ha-textfield>
            </ha-formfield>
          </details>
          <details open>
            <summary>${this._t("summary_card_layout_and_colors")}</summary>
            <ha-formfield label="${this._t("background_color")}">
              <div style="display:flex; gap:8px; align-items:center;">
                <ha-textfield
                  .value=${e.background_color || ""}
                  placeholder="${this._t("background_color_placeholder") || "#ffffff"}"
                  @input=${(n) => this._updateConfig("background_color", n.target.value)}
                  style="width: 120px;"
                ></ha-textfield>
                <input
                  type="color"
                  .value=${e.background_color && /^#[0-9a-fA-F]{6}$/.test(e.background_color) ? e.background_color : "#ffffff"}
                  @input=${(n) => this._updateConfig("background_color", n.target.value)}
                  style="width: 36px; height: 32px; border: none; background: none; cursor: pointer;"
                  title="${this._t("background_color_picker") || "Pick color"}"
                />
              </div>
            </ha-formfield>
            <ha-formfield label="${this._t("icon_size")}">
              <ha-slider
                min="16"
                max="128"
                step="1"
                .value=${e.icon_size ?? 48}
                @input=${(n) => this._updateConfig("icon_size", Number(n.target.value))}
                style="width: 120px;"
              ></ha-slider>
              <ha-textfield
                .value=${e.icon_size ?? 48}
                type="number"
                min="16"
                max="128"
                step="1"
                @input=${(n) => this._updateConfig("icon_size", Number(n.target.value))}
                style="width: 80px;"
              ></ha-textfield>
            </ha-formfield>
            <ha-formfield label="${this._t("text_size_ratio")}">
              <ha-slider
                min="0.5"
                max="2"
                step="0.05"
                .value=${e.text_size_ratio ?? 1}
                @input=${(n) => this._updateConfig("text_size_ratio", Number(n.target.value))}
                style="width: 120px;"
              ></ha-slider>
              <ha-textfield
                type="number"
                .value=${e.text_size_ratio ?? 1}
                min="0.5"
                max="2"
                step="0.05"
                @input=${(n) => this._updateConfig("text_size_ratio", Number(n.target.value))}
                style="width: 80px;"
              ></ha-textfield>
            </ha-formfield>

            <!-- Allergen Colors Configuration -->
            <details>
              <summary>
                ${this._t("allergen_colors_header") || "Allergen Colors"}
              </summary>
              <ha-formfield
                label="${this._t("allergen_color_mode") || "Allergen Color Mode"}"
              >
                <div style="display: flex; align-items: center; gap: 8px;">
                  <ha-selector
                    .hass=${this._hass}
                    .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "default_colors",
            label: this._t("allergen_color_default_colors") || "Default Colors"
          },
          {
            value: "custom",
            label: this._t("allergen_color_custom") || "Custom Colors"
          }
        ]
      }
    }}
                    .value=${e.allergen_color_mode || "default_colors"}
                    @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("allergen_color_mode", l);
    }}
                  ></ha-selector>
                </div>
              </ha-formfield>

              ${e.allergen_color_mode === "custom" ? j`
                    <ha-formfield
                      label="${this._t("allergen_colors") || "Allergen Colors (by Level)"}"
                    >
                      <div
                        style="display: flex; flex-direction: column; gap: 8px;"
                      >
                        ${(() => {
      const n = V.allergen_colors, l = e.allergen_colors || n;
      return l.map(
        (d, c) => j`
                              <div
                                style="display: flex; align-items: center; gap: 8px;"
                              >
                                <span style="min-width: 60px;"
                                  >Level ${c}:</span
                                >
                                <input
                                  type="color"
                                  .value=${c === 0 && d.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(
          d
        ) ? d : "#000000"}
                                  @input=${(h) => {
          const u = [...l];
          u[c] = h.target.value, this._updateConfig(
            "allergen_colors",
            u
          );
        }}
                                  style="width: 28px; height: 28px; border: none; background: none;"
                                />
                                <ha-textfield
                                  .value=${d}
                                  placeholder="${c === 0 ? this._t("allergen_empty_placeholder") || "rgba(200,200,200,0.15)" : this._t("allergen_colors_placeholder") || "#ffcc00"}"
                                  @input=${(h) => {
          const u = [...l];
          u[c] = h.target.value, this._updateConfig(
            "allergen_colors",
            u
          );
        }}
                                  style="width: 120px;"
                                ></ha-textfield>
                                <ha-button
                                  outlined
                                  title="${this._t("allergen_colors_reset") || "Reset"}"
                                  @click=${() => {
          const h = [...l];
          h[c] = V.allergen_colors[c], this._updateConfig(
            "allergen_colors",
            h
          );
        }}
                                  style="margin-left: 8px;"
                                  >↺</ha-button
                                >
                              </div>
                            `
      );
    })()}
                      </div>
                    </ha-formfield>

                    <ha-formfield
                      label="${this._t("allergen_outline_color") || "Outline Color"}"
                    >
                      <div
                        style="display: flex; align-items: center; gap: 8px;"
                      >
                        <input
                          type="color"
                          .value=${(() => {
      const n = e.allergen_outline_color || V.levels_gap_color;
      return n.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(n) ? n : "#c8c8c8";
    })()}
                          @input=${(n) => this._updateConfig(
      "allergen_outline_color",
      n.target.value
    )}
                          style="width: 28px; height: 28px; border: none; background: none;"
                        />
                        <ha-textfield
                          .value=${e.allergen_outline_color || V.levels_gap_color}
                          placeholder="${this._t(
      "allergen_outline_placeholder"
    ) || "rgba(200,200,200,1)"}"
                          @input=${(n) => this._updateConfig(
      "allergen_outline_color",
      n.target.value
    )}
                          style="width: 100px;"
                        ></ha-textfield>
                        <ha-button
                          outlined
                          title="${this._t("allergen_outline_reset") || "Reset"}"
                          @click=${() => this._updateConfig(
      "allergen_outline_color",
      V.levels_gap_color
    )}
                          style="margin-left: 8px;"
                          >↺</ha-button
                        >
                      </div>
                    </ha-formfield>

                    <ha-formfield
                      label="${this._t("no_allergens_color") || "No Allergens Color"}"
                    >
                      <div
                        style="display: flex; align-items: center; gap: 8px;"
                      >
                        <input
                          type="color"
                          .value=${/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(
      e.no_allergens_color || V.no_allergens_color
    ) ? e.no_allergens_color || V.no_allergens_color : "#a9cfe0"}
                          @input=${(n) => this._updateConfig(
      "no_allergens_color",
      n.target.value
    )}
                          style="width: 28px; height: 28px; border: none; background: none;"
                        />
                        <ha-textfield
                          .value=${e.no_allergens_color || V.no_allergens_color}
                          placeholder="${this._t(
      "no_allergens_color_placeholder"
    ) || "#a9cfe0"}"
                          @input=${(n) => this._updateConfig(
      "no_allergens_color",
      n.target.value
    )}
                          style="width: 100px;"
                        ></ha-textfield>
                        <ha-button
                          outlined
                          title="${this._t("no_allergens_color_reset") || "Reset"}"
                          @click=${() => this._updateConfig(
      "no_allergens_color",
      V.no_allergens_color
    )}
                          style="margin-left: 8px;"
                          >↺</ha-button
                        >
                      </div>
                    </ha-formfield>
                  ` : ""}
            </details>
            <!-- Stroke Width -->
            <ha-formfield
              label="${this._t("allergen_stroke_width") || "Stroke Width"}"
            >
              <ha-slider
                min="0"
                max="150"
                step="5"
                .value=${e.allergen_stroke_width ?? V.allergen_stroke_width}
                @input=${(n) => {
      const l = Number(n.target.value);
      if (this._updateConfig("allergen_stroke_width", l), (e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (e.allergen_levels_gap_synced ?? !0)) {
        const d = er(l);
        this._updateConfig("levels_gap", d);
      }
    }}
                style="width: 120px;"
              ></ha-slider>
              <ha-textfield
                type="number"
                min="0"
                max="150"
                step="5"
                .value=${e.allergen_stroke_width ?? V.allergen_stroke_width}
                @input=${(n) => {
      const l = n.target.value === "" ? V.allergen_stroke_width : Number(n.target.value);
      if (this._updateConfig("allergen_stroke_width", l), (e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (e.allergen_levels_gap_synced ?? !0)) {
        const d = er(l);
        this._updateConfig("levels_gap", d);
      }
    }}
                style="width: 80px;"
              ></ha-textfield>
              <ha-button
                outlined
                title="${this._t("allergen_stroke_width_reset") || "Reset"}"
                @click=${() => this._updateConfig(
      "allergen_stroke_width",
      V.allergen_stroke_width
    )}
                style="margin-left: 8px;"
                >↺</ha-button
              >
            </ha-formfield>

            <!-- Sync Stroke Color with Level -->
            <ha-formfield
              label="${this._t("allergen_stroke_color_synced") || "Sync stroke color with level"}"
            >
              <ha-checkbox
                .checked=${e.allergen_stroke_color_synced ?? !0}
                @change=${(n) => this._updateConfig(
      "allergen_stroke_color_synced",
      n.target.checked
    )}
              ></ha-checkbox>
            </ha-formfield>

            <!-- Levels Configuration (moved above minimal) -->
            <details>
              <summary>${this._t("levels_header")}</summary>
              <ha-formfield
                label="${this._t("levels_inherit_mode") || "Level Circle Color Mode"}"
              >
                <div style="display: flex; align-items: center; gap: 8px;">
                  <ha-selector
                    .hass=${this._hass}
                    .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "inherit_allergen",
            label: this._t("levels_inherit_allergen") || "Inherit from Allergen Colors"
          },
          {
            value: "custom",
            label: this._t("levels_custom") || "Use Custom Level Colors"
          }
        ]
      }
    }}
                    .value=${e.levels_inherit_mode || "inherit_allergen"}
                    @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("levels_inherit_mode", l);
    }}
                  ></ha-selector>
                </div>
              </ha-formfield>

              <!-- Sync Gap with Allergen Stroke Width - only shown when inheriting -->
              ${(e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" ? j`
                    <ha-formfield
                      label="${this._t("allergen_levels_gap_synced") || "Sync gap with allergen stroke width"}"
                    >
                      <ha-checkbox
                        .checked=${e.allergen_levels_gap_synced ?? !0}
                        @change=${(n) => this._updateConfig(
      "allergen_levels_gap_synced",
      n.target.checked
    )}
                      ></ha-checkbox>
                    </ha-formfield>
                  ` : ""}

              <!-- Colors Section - hidden when inheriting -->
              <div
                style="${e.levels_inherit_mode === "custom" ? "" : "display: none;"}"
              >
                <ha-formfield label="${this._t("levels_colors")}">
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${e.levels_colors.map(
      (n, l) => j`
                        <div
                          style="display: flex; align-items: center; gap: 8px;"
                        >
                          <input
                            type="color"
                            .value=${/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(n) ? n : "#000000"}
                            @input=${(d) => {
        const c = [...e.levels_colors];
        c[l] = d.target.value, this._updateConfig("levels_colors", c);
      }}
                            style="width: 28px; height: 28px; border: none; background: none;"
                          />
                          <ha-textfield
                            .value=${n}
                            placeholder="${this._t(
        "levels_colors_placeholder"
      )}"
                            @input=${(d) => {
        const c = [...e.levels_colors];
        c[l] = d.target.value, this._updateConfig("levels_colors", c);
      }}
                            style="width: 100px;"
                          ></ha-textfield>
                          <ha-button
                            outlined
                            title="${this._t("levels_reset")}"
                            @click=${() => {
        const d = [...e.levels_colors];
        d[l] = V.levels_colors[l], this._updateConfig("levels_colors", d);
      }}
                            style="margin-left: 8px;"
                            >↺</ha-button
                          >
                        </div>
                      `
    )}
                  </div>
                </ha-formfield>

                <ha-formfield label="${this._t("levels_empty_color")}">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <input
                      type="color"
                      .value=${(() => {
      const n = e.levels_empty_color || V.levels_empty_color;
      return n.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(n) ? n : "#c8c8c8";
    })()}
                      @input=${(n) => this._updateConfig(
      "levels_empty_color",
      n.target.value
    )}
                      style="width: 28px; height: 28px; border: none; background: none;"
                    />
                    <ha-textfield
                      .value=${e.levels_empty_color}
                      placeholder="${this._t("levels_colors_placeholder")}"
                      @input=${(n) => this._updateConfig(
      "levels_empty_color",
      n.target.value
    )}
                      style="width: 100px;"
                    ></ha-textfield>
                    <ha-button
                      outlined
                      title="${this._t("levels_reset")}"
                      @click=${() => this._updateConfig(
      "levels_empty_color",
      V.levels_empty_color
    )}
                      style="margin-left: 8px;"
                      >↺</ha-button
                    >
                  </div>
                </ha-formfield>

                <ha-formfield label="${this._t("levels_gap_color")}">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <input
                      type="color"
                      .value=${(() => {
      const n = e.levels_gap_color || V.levels_gap_color;
      return n.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(n) ? n : "#c8c8c8";
    })()}
                      @input=${(n) => this._updateConfig("levels_gap_color", n.target.value)}
                      style="width: 28px; height: 28px; border: none; background: none;"
                    />
                    <ha-textfield
                      .value=${e.levels_gap_color}
                      placeholder="${this._t("levels_colors_placeholder")}"
                      @input=${(n) => this._updateConfig("levels_gap_color", n.target.value)}
                      style="width: 100px;"
                    ></ha-textfield>
                    <ha-button
                      outlined
                      title="${this._t("levels_reset")}"
                      @click=${() => this._updateConfig(
      "levels_gap_color",
      V.levels_gap_color
    )}
                      style="margin-left: 8px;"
                      >↺</ha-button
                    >
                  </div>
                </ha-formfield>

                <ha-formfield label="${this._t("levels_thickness")}">
                  <ha-slider
                    min="10"
                    max="90"
                    step="1"
                    .value=${e.levels_thickness}
                    @input=${(n) => this._updateConfig(
      "levels_thickness",
      Number(n.target.value)
    )}
                    style="width: 120px;"
                  ></ha-slider>
                  <ha-textfield
                    type="number"
                    .value=${e.levels_thickness}
                    @input=${(n) => this._updateConfig(
      "levels_thickness",
      Number(n.target.value)
    )}
                    style="width: 80px;"
                  ></ha-textfield>
                  <ha-button
                    outlined
                    title="${this._t("levels_reset")}"
                    @click=${() => this._updateConfig(
      "levels_thickness",
      V.levels_thickness
    )}
                    style="margin-left: 8px;"
                    >↺</ha-button
                  >
                </ha-formfield>
              </div>

              <!-- Gap control - conditional on inheritance mode and sync setting -->
              ${(e.levels_inherit_mode || "inherit_allergen") === "custom" || !(e.allergen_levels_gap_synced ?? !0) ? j`
                    <ha-formfield label="${this._t("levels_gap")}">
                      <ha-slider
                        min="0"
                        max="20"
                        step="1"
                        .value=${e.levels_gap}
                        @input=${(n) => this._updateConfig(
      "levels_gap",
      Number(n.target.value)
    )}
                        style="width: 120px;"
                      ></ha-slider>
                      <ha-textfield
                        type="number"
                        .value=${e.levels_gap}
                        @input=${(n) => this._updateConfig(
      "levels_gap",
      Number(n.target.value)
    )}
                        style="width: 80px;"
                      ></ha-textfield>
                      <ha-button
                        outlined
                        title="${this._t("levels_reset")}"
                        @click=${() => this._updateConfig(
      "levels_gap",
      V.levels_gap
    )}
                        style="margin-left: 8px;"
                        >↺</ha-button
                      >
                    </ha-formfield>
                  ` : j`
                    <ha-formfield label="${this._t("levels_gap_inherited")}">
                      <div
                        style="display: flex; align-items: center; gap: 8px; width: 120px; height: 30px;"
                      >
                        <span
                          style="color: var(--secondary-text-color); font-size: 14px; min-width: 30px"
                        >
                          ${er(
      e.allergen_stroke_width || V.allergen_stroke_width
    )}px
                        </span>
                      </div>
                    </ha-formfield>
                  `}

              <ha-formfield label="${this._t("levels_text_weight")}">
                <ha-selector
                  .hass=${this._hass}
                  .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "normal", label: "Normal" },
          { value: "500", label: "Medium" },
          { value: "bold", label: "Bold" }
        ]
      }
    }}
                  .value=${e.levels_text_weight || "normal"}
                  @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("levels_text_weight", l);
    }}
                ></ha-selector>
              </ha-formfield>

              <ha-formfield label="${this._t("levels_text_size")}">
                <ha-slider
                  min="0.1"
                  max="0.5"
                  step="0.05"
                  .value=${e.levels_text_size || 0.3}
                  @input=${(n) => this._updateConfig(
      "levels_text_size",
      Number(n.target.value)
    )}
                  style="width: 120px;"
                ></ha-slider>
                <ha-textfield
                  type="number"
                  .value=${e.levels_text_size || 0.3}
                  @input=${(n) => this._updateConfig(
      "levels_text_size",
      Number(n.target.value)
    )}
                  style="width: 80px;"
                ></ha-textfield>
              </ha-formfield>

              <ha-formfield label="${this._t("levels_icon_ratio")}">
                <ha-slider
                  min="0.1"
                  max="2"
                  step="0.05"
                  .value=${e.levels_icon_ratio || 1}
                  @input=${(n) => this._updateConfig(
      "levels_icon_ratio",
      Number(n.target.value)
    )}
                  style="width: 120px;"
                ></ha-slider>
                <ha-textfield
                  type="number"
                  .value=${e.levels_icon_ratio || 1}
                  @input=${(n) => this._updateConfig(
      "levels_icon_ratio",
      Number(n.target.value)
    )}
                  style="width: 80px;"
                ></ha-textfield>
              </ha-formfield>

              <ha-formfield label="${this._t("levels_text_color")}">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input
                    type="color"
                    .value=${/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(
      e.levels_text_color || ""
    ) ? e.levels_text_color : "#000000"}
                    @input=${(n) => this._updateConfig("levels_text_color", n.target.value)}
                    style="width: 28px; height: 28px; border: none; background: none;"
                  />
                  <ha-textfield
                    .value=${e.levels_text_color || ""}
                    placeholder="var(--primary-text-color)"
                    @input=${(n) => this._updateConfig("levels_text_color", n.target.value)}
                    style="width: 100px;"
                  ></ha-textfield>
                </div>
              </ha-formfield>
            </details>

            <details open>
              <summary>${this._t("summary_minimal")}</summary>
              <ha-formfield label="${this._t("minimal")}">
                <ha-switch
                  .checked=${e.minimal}
                  @change=${(n) => this._updateConfig("minimal", n.target.checked)}
                ></ha-switch>
              </ha-formfield>
              <ha-formfield label="${this._t("minimal_gap")}">
                <ha-slider
                  min="0"
                  max="100"
                  step="1"
                  .value=${e.minimal_gap ?? 35}
                  @input=${(n) => this._updateConfig("minimal_gap", Number(n.target.value))}
                  style="width: 120px;"
                ></ha-slider>
                <ha-textfield
                  type="number"
                  .value=${e.minimal_gap ?? 35}
                  min="0"
                  max="100"
                  step="1"
                  @input=${(n) => this._updateConfig("minimal_gap", Number(n.target.value))}
                  style="width: 80px;"
                ></ha-textfield>
              </ha-formfield>
            </details>
          </details>

          <!-- Display Switches -->
          <details open>
            <summary>${this._t("summary_data_view_settings")}</summary>
            <ha-formfield label="${this._t("allergens_abbreviated")}">
              <ha-switch
                .checked=${e.allergens_abbreviated}
                @change=${(n) => this._updateConfig("allergens_abbreviated", n.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("show_text_allergen")}">
              <ha-switch
                .checked=${e.show_text_allergen}
                @change=${(n) => this._updateConfig("show_text_allergen", n.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("show_value_text")}">
              <ha-switch
                .checked=${e.show_value_text}
                @change=${(n) => this._updateConfig("show_value_text", n.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("show_value_numeric")}">
              <ha-switch
                .checked=${e.show_value_numeric}
                @change=${(n) => this._updateConfig("show_value_numeric", n.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("show_value_numeric_in_circle")}">
              <ha-switch
                .checked=${e.show_value_numeric_in_circle}
                @change=${(n) => this._updateConfig(
      "show_value_numeric_in_circle",
      n.target.checked
    )}
              ></ha-switch>
            </ha-formfield>
            ${e.integration === "peu" ? j`
                  <ha-formfield label="${this._t("numeric_state_raw_risk")}">
                    <ha-switch
                      .checked=${e.numeric_state_raw_risk}
                      @change=${(n) => this._updateConfig(
      "numeric_state_raw_risk",
      n.target.checked
    )}
                    ></ha-switch>
                  </ha-formfield>
                ` : ""}
            <ha-formfield label="${this._t("show_empty_days")}">
              <ha-switch
                .checked=${e.show_empty_days}
                @change=${(n) => this._updateConfig("show_empty_days", n.target.checked)}
              ></ha-switch>
            </ha-formfield>
          </details>

          <!-- Day Settings -->
          <details open>
            <summary>${this._t("summary_day_view_settings")}</summary>
            <ha-formfield label="${this._t("days_relative")}">
              <ha-switch
                .checked=${e.days_relative}
                @change=${(n) => this._updateConfig("days_relative", n.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("days_abbreviated")}">
              <ha-switch
                .checked=${e.days_abbreviated}
                @change=${(n) => this._updateConfig("days_abbreviated", n.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("days_uppercase")}">
              <ha-switch
                .checked=${e.days_uppercase}
                @change=${(n) => this._updateConfig("days_uppercase", n.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("days_boldfaced")}">
              <ha-switch
                .checked=${e.days_boldfaced}
                @change=${(n) => this._updateConfig("days_boldfaced", n.target.checked)}
              ></ha-switch>
            </ha-formfield>

            <!-- Columns/Days/Threshold/Sort -->
            <div class="slider-row">
              <div class="slider-text">
                ${(e.integration === "silam" || e.integration === "peu") && e.mode === "twice_daily" ? this._t("to_show_columns") : (e.integration === "silam" || e.integration === "peu") && e.mode !== "daily" ? this._t("to_show_hours") : this._t("to_show_days")}
              </div>
              <div class="slider-value">${e.days_to_show}</div>
              <ha-slider
                min="0"
                max="${(e.integration === "silam" || e.integration === "peu") && e.mode !== "daily" ? 8 : 6}"
                step="1"
                .value=${e.days_to_show}
                @input=${(n) => this._updateConfig("days_to_show", Number(n.target.value))}
              ></ha-slider>
            </div>
          </details>
        </details>

        <!-- Allergens -->
        <details>
          <summary>${this._t("summary_allergens")}</summary>
          ${e.integration === "kleenex" || e.integration === "gpl" ? j`
                <!-- Category allergens (controlled by checkbox) -->
                <div class="allergen-section">
                  <h4
                    style="margin: 8px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                  >
                    ${this._t("allergens_header_category")}
                  </h4>
                  <div class="allergens-group">
                    ${["trees_cat", "grass_cat", "weeds_cat"].map((n) => {
      const l = this._getAllergenDisplayName(n);
      return j`
                        <ha-formfield .label=${l}>
                          <ha-checkbox
                            .checked=${e.allergens.includes(n)}
                            @change=${(d) => this._onAllergenToggle(n, d.target.checked)}
                          ></ha-checkbox>
                        </ha-formfield>
                      `;
    })}
                  </div>
                </div>

                <!-- Individual allergens -->
                <div class="allergen-section">
                  <h4
                    style="margin: 16px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                  >
                    ${this._t("allergens_header_specific")}
                  </h4>
                  <div class="allergens-group">
                    ${r.filter(
      (n) => !["trees_cat", "grass_cat", "weeds_cat"].includes(
        n
      )
    ).sort((n, l) => {
      const d = this._getAllergenDisplayName(n), c = this._getAllergenDisplayName(l);
      return d.localeCompare(c);
    }).map((n) => {
      const l = this._getAllergenDisplayName(n);
      return j`
                          <ha-formfield .label=${l}>
                            <ha-checkbox
                              .checked=${e.allergens.includes(n)}
                              @change=${(d) => this._onAllergenToggle(n, d.target.checked)}
                            ></ha-checkbox>
                          </ha-formfield>
                        `;
    })}
                  </div>
                </div>
              ` : e.integration === "atmo" ? j`
                  <!-- Atmo France: Summary / Pollen / Pollution blocks -->
                  <div class="allergen-section">
                    <h4
                      style="margin: 8px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                    >
                      ${this._t("allergens_header_summary")}
                    </h4>
                    <div class="allergens-group">
                      ${["allergy_risk", "qualite_globale"].filter((n) => r.includes(n)).map((n) => {
      const l = this._getAllergenDisplayName(n);
      return j`
                            <ha-formfield .label=${l}>
                              <ha-checkbox
                                .checked=${e.allergens.includes(n)}
                                @change=${(d) => this._onAllergenToggle(
        n,
        d.target.checked
      )}
                              ></ha-checkbox>
                            </ha-formfield>
                          `;
    })}
                    </div>
                  </div>
                  <div class="allergen-section">
                    <h4
                      style="margin: 16px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                    >
                      ${this._t("allergens_header_pollen")}
                    </h4>
                    <div class="allergens-group">
                      ${r.filter(
      (n) => !["allergy_risk", "qualite_globale", "pm25", "pm10", "ozone", "no2", "so2"].includes(n)
    ).sort((n, l) => {
      const d = this._getAllergenDisplayName(n), c = this._getAllergenDisplayName(l);
      return d.localeCompare(c);
    }).map((n) => {
      const l = this._getAllergenDisplayName(n);
      return j`
                            <ha-formfield .label=${l}>
                              <ha-checkbox
                                .checked=${e.allergens.includes(n)}
                                @change=${(d) => this._onAllergenToggle(
        n,
        d.target.checked
      )}
                              ></ha-checkbox>
                            </ha-formfield>
                          `;
    })}
                    </div>
                  </div>
                  <div class="allergen-section">
                    <h4
                      style="margin: 16px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                    >
                      ${this._t("allergens_header_pollution")}
                    </h4>
                    <div class="allergens-group">
                      ${["pm25", "pm10", "ozone", "no2", "so2"].filter((n) => r.includes(n)).map((n) => {
      const l = this._getAllergenDisplayName(n);
      return j`
                            <ha-formfield .label=${l}>
                              <ha-checkbox
                                .checked=${e.allergens.includes(n)}
                                @change=${(d) => this._onAllergenToggle(
        n,
        d.target.checked
      )}
                              ></ha-checkbox>
                            </ha-formfield>
                          `;
    })}
                    </div>
                  </div>
                ` : j`
                  <!-- Standard allergen display -->
                  <div class="allergens-group">
                    ${r.map((n) => {
      const l = this._getAllergenDisplayName(n);
      return j`
                        <ha-formfield .label=${l}>
                          <ha-checkbox
                            .checked=${e.allergens.includes(n)}
                            @change=${(d) => this._onAllergenToggle(n, d.target.checked)}
                          ></ha-checkbox>
                        </ha-formfield>
                      `;
    })}
                  </div>
                `}
          <div class="preset-buttons">
            <ha-button
              @click=${() => {
      const n = e.integration === "kleenex" ? [...r, "trees_cat", "grass_cat", "weeds_cat"] : r;
      this._toggleSelectAllAllergens(n);
    }}
            >
              ${this._t("select_all_allergens")}
            </ha-button>
            ${e.integration === "atmo" ? j`
                  <ha-button
                    @click=${() => {
      const n = r.filter(
        (l) => !["allergy_risk", "qualite_globale", "pm25", "pm10", "ozone", "no2", "so2"].includes(l)
      );
      this._toggleAllergenSubset(n);
    }}
                  >
                    ${this._t("select_all_pollen")}
                  </ha-button>
                  <ha-button
                    @click=${() => {
      const n = ["pm25", "pm10", "ozone", "no2", "so2"].filter(
        (l) => r.includes(l)
      );
      this._toggleAllergenSubset(n);
    }}
                  >
                    ${this._t("select_all_pollution")}
                  </ha-button>
                ` : ""}
          </div>
          <div class="slider-row">
            <div class="slider-text">${this._t("pollen_threshold")}</div>
            <div class="slider-value">${e.pollen_threshold}</div>
            <ha-slider
              min="${o.min}"
              max="${o.max}"
              step="${o.step}"
              .value=${e.pollen_threshold}
              @input=${(n) => this._updateConfig("pollen_threshold", Number(n.target.value))}
            ></ha-slider>
          </div>
          <ha-formfield label="${this._t("sort")}">
            <ha-selector
              .hass=${this._hass}
              .selector=${{
      select: {
        mode: "dropdown",
        options: a
      }
    }}
              .value=${e.sort}
              @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("sort", l);
    }}
            ></ha-selector>
          </ha-formfield>
          ${e.integration === "kleenex" || e.integration === "gpl" ? j`
                <ha-formfield
                  label="${this._t("sort_category_allergens_first")}"
                >
                  <ha-checkbox
                    .checked=${e.sort_category_allergens_first}
                    @change=${(n) => this._updateConfig(
      "sort_category_allergens_first",
      n.target.checked
    )}
                  ></ha-checkbox>
                </ha-formfield>
              ` : ""}
          ${e.integration === "peu" || e.integration === "silam" || e.integration === "atmo" ? j`
                <ha-formfield
                  label="${e.integration === "silam" ? this._t("index_top") : this._t("allergy_risk_top")}"
                >
                  <ha-checkbox
                    .checked=${e.integration === "silam" ? e.index_top : e.allergy_risk_top}
                    @change=${(n) => this._updateConfig(
      e.integration === "silam" ? "index_top" : "allergy_risk_top",
      n.target.checked
    )}
                  ></ha-checkbox>
                </ha-formfield>
              ` : ""}
          ${e.integration === "atmo" ? j`
                <ha-formfield
                  label="${this._t("sort_pollution_block")}"
                >
                  <ha-checkbox
                    .checked=${e.sort_pollution_block}
                    @change=${(n) => this._updateConfig(
      "sort_pollution_block",
      n.target.checked
    )}
                  ></ha-checkbox>
                </ha-formfield>
                ${e.sort_pollution_block ? j`
                      <ha-formfield
                        label="${this._t("pollution_block_position")}"
                      >
                        <ha-selector
                          .hass=${this._hass}
                          .selector=${{
      select: {
        mode: "dropdown",
        options: [
          {
            value: "bottom",
            label: this._t("pollution_block_bottom")
          },
          {
            value: "top",
            label: this._t("pollution_block_top")
          }
        ]
      }
    }}
                          .value=${e.pollution_block_position || "bottom"}
                          @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && this._updateConfig("pollution_block_position", l);
    }}
                        ></ha-selector>
                      </ha-formfield>
                      <ha-formfield
                        label="${this._t("show_block_separator")}"
                      >
                        <ha-checkbox
                          .checked=${e.show_block_separator}
                          @change=${(n) => this._updateConfig(
      "show_block_separator",
      n.target.checked
    )}
                        ></ha-checkbox>
                      </ha-formfield>
                    ` : ""}
              ` : ""}
        </details>

        <!-- Översättningar och textsträngar -->
        <details>
          <summary>${this._t("summary_translation_and_strings")}</summary>
          <ha-formfield label="${this._t("locale")}">
            <ha-textfield
              .value=${e.date_locale}
              @input=${(n) => this._updateConfig("date_locale", n.target.value)}
            ></ha-textfield>
          </ha-formfield>
          <h3>${this._t("phrases")}</h3>
          <div class="preset-buttons">
            <ha-formfield label="${this._t("phrases_translate_all")}">
              <ha-selector
                .hass=${this._hass}
                .selector=${{
      select: {
        mode: "dropdown",
        options: kh.map((n) => ({
          value: n,
          label: new Intl.DisplayNames([this._lang], {
            type: "language"
          }).of(n) || n
        }))
      }
    }}
                .value=${this._selectedPhraseLang}
                @value-changed=${(n) => {
      var d;
      const l = (d = n.detail) == null ? void 0 : d.value;
      l !== void 0 && (this._selectedPhraseLang = l);
    }}
              ></ha-selector>
            </ha-formfield>
            <!-- Use Home Assistant's button with outlined style for clarity -->
            <ha-button
              outlined
              @click=${() => this._resetPhrases(this._selectedPhraseLang)}
            >
              ${this._t("phrases_apply")}
            </ha-button>
          </div>
          <details>
            <summary>${this._t("phrases_full")}</summary>
            ${r.map(
      (n) => j`
                <ha-formfield .label=${n}>
                  <ha-textfield
                    .value=${e.phrases.full[n] || ""}
                    @input=${(l) => {
        const d = {
          ...e.phrases,
          full: { ...e.phrases.full, [n]: l.target.value }
        };
        this._updateConfig("phrases", d);
      }}
                  ></ha-textfield>
                </ha-formfield>
              `
    )}
          </details>
          <details>
            <summary>${this._t("phrases_short")}</summary>
            ${r.map(
      (n) => j`
                <ha-formfield .label=${n}>
                  <ha-textfield
                    .value=${e.phrases.short[n] || ""}
                    @input=${(l) => {
        const d = {
          ...e.phrases,
          short: { ...e.phrases.short, [n]: l.target.value }
        };
        this._updateConfig("phrases", d);
      }}
                  ></ha-textfield>
                </ha-formfield>
              `
    )}
          </details>
          <details>
            <summary>${this._t("phrases_levels")}</summary>
            ${Array.from({ length: i }, (n, l) => l).map(
      (n) => j`
                <ha-formfield .label=${n}>
                  <ha-textfield
                    .value=${e.phrases.levels[n] || ""}
                    @input=${(l) => {
        const d = [...e.phrases.levels];
        d[n] = l.target.value;
        const c = { ...e.phrases, levels: d };
        this._updateConfig("phrases", c);
      }}
                  ></ha-textfield>
                </ha-formfield>
              `
    )}
          </details>
          <details>
            <summary>${this._t("phrases_days")}</summary>
            ${[0, 1, 2].map(
      (n) => j`
                <ha-formfield .label=${n}>
                  <ha-textfield
                    .value=${e.phrases.days[n] || ""}
                    @input=${(l) => {
        const d = { ...e.phrases.days, [n]: l.target.value };
        this._updateConfig("phrases", { ...e.phrases, days: d });
      }}
                  ></ha-textfield>
                </ha-formfield>
              `
    )}
          </details>
          <ha-formfield label="${this._t("no_information")}">
            <ha-textfield
              .value=${e.phrases.no_information || ""}
              @input=${(n) => this._updateConfig("phrases", {
      ...e.phrases,
      no_information: n.target.value
    })}
            ></ha-textfield>
          </ha-formfield>
        </details>

        <!-- Tap Action -->
        <details>
          <summary>${this._t("summary_card_interactivity")}</summary>
          <h3>${this._t("tap_action")}</h3>
          <ha-formfield label="${this._t("link_to_sensors")}">
            <ha-switch
              .checked=${e.link_to_sensors !== !1}
              @change=${(n) => this._updateConfig("link_to_sensors", n.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("tap_action_enable")}">
            <ha-switch
              .checked=${this._tapType !== "none"}
              @change=${(n) => {
      n.target.checked ? (this._tapType = "more-info", this._updateConfig("tap_action", {
        ...this._config.tap_action,
        type: "more-info"
      })) : (this._tapType = "none", this._updateConfig("tap_action", {
        ...this._config.tap_action,
        type: "none"
      })), this.requestUpdate();
    }}
            ></ha-switch>
          </ha-formfield>
          ${this._tapType !== "none" ? j`
                <div style="margin-top: 10px;">
                  <label>Action type</label>
                  <ha-selector
                    .hass=${this._hass}
                    .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "more-info", label: "More Info" },
          { value: "navigate", label: "Navigate" },
          { value: "call-service", label: "Call Service" }
        ]
      }
    }}
                    .value=${this._tapType}
                    @value-changed=${(n) => {
      var c;
      const l = (c = n.detail) == null ? void 0 : c.value;
      if (l === void 0) return;
      this._tapType = l;
      let d = { type: this._tapType };
      if (this._tapType === "more-info" && (d.entity = this._tapEntity), this._tapType === "navigate" && (d.navigation_path = this._tapNavigation), this._tapType === "call-service") {
        d.service = this._tapService;
        try {
          d.service_data = JSON.parse(
            this._tapServiceData || "{}"
          );
        } catch {
          d.service_data = {};
        }
      }
      this._updateConfig("tap_action", d), this.requestUpdate();
    }}
                  ></ha-selector>
                </div>
                ${this._tapType === "more-info" ? j`
                      <ha-formfield label="Entity">
                        <ha-textfield
                          .value=${this._tapEntity}
                          @input=${(n) => {
      this._tapEntity = n.target.value, this._updateConfig("tap_action", {
        type: "more-info",
        entity: this._tapEntity
      });
    }}
                        ></ha-textfield>
                      </ha-formfield>
                    ` : ""}
                ${this._tapType === "navigate" ? j`
                      <ha-formfield label="Navigation path">
                        <ha-textfield
                          .value=${this._tapNavigation}
                          @input=${(n) => {
      this._tapNavigation = n.target.value, this._updateConfig("tap_action", {
        type: "navigate",
        navigation_path: this._tapNavigation
      });
    }}
                        ></ha-textfield>
                      </ha-formfield>
                    ` : ""}
                ${this._tapType === "call-service" ? j`
                      <ha-formfield label="Service (e.g. light.turn_on)">
                        <ha-textfield
                          .value=${this._tapService}
                          @input=${(n) => {
      this._tapService = n.target.value;
      let l = {};
      try {
        l = JSON.parse(this._tapServiceData || "{}");
      } catch {
      }
      this._updateConfig("tap_action", {
        type: "call-service",
        service: this._tapService,
        service_data: l
      });
    }}
                        ></ha-textfield>
                      </ha-formfield>
                      <ha-formfield label="Service data (JSON)">
                        <ha-textfield
                          .value=${this._tapServiceData}
                          @input=${(n) => {
      this._tapServiceData = n.target.value;
      let l = {};
      try {
        l = JSON.parse(this._tapServiceData || "{}");
      } catch {
      }
      this._updateConfig("tap_action", {
        type: "call-service",
        service: this._tapService,
        service_data: l
      });
    }}
                        ></ha-textfield>
                      </ha-formfield>
                    ` : ""}
              ` : ""}
        </details>

        <!-- Debug -->
        <details>
          <summary>${this._t("summary_advanced")}</summary>
          <ha-formfield label="${this._t("debug")}">
            <ha-switch
              .checked=${e.debug}
              @change=${(n) => this._updateConfig("debug", n.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("show_version")}">
            <ha-switch
              .checked=${e.show_version !== !1}
              @change=${(n) => this._updateConfig("show_version", n.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <div class="version-info">
            ${this._t("card_version")}: ${"v3.0.0"}
          </div>
        </details>
      </div>
    `;
  }
  static get styles() {
    return ga`
      /* pollenprognos-card-editor styles */

      /* Main container for card config */
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }

      /* Formfield and details spacing */
      ha-formfield,
      details {
        margin-bottom: 8px;
      }

      /* Allergens group styling */
      .allergens-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      /* Allergen section styling for Kleenex grouped display */
      .allergen-section {
        margin-bottom: 12px;
      }

      .allergen-section h4 {
        margin: 8px 0 4px 0;
        font-size: 0.9em;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      /* Details summary styling */
      details summary {
        cursor: pointer;
        font-weight: bold;
        margin: 8px 0;
      }

      /* Slider styling */
      ha-slider {
        width: 100%;
      }

      /* Select styling */
      ha-selector {
        width: 100%;
        --mdc-theme-primary: var(--primary-color);
      }

      /* Preset buttons styling */
      .preset-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      /* Slider row layout */
      .slider-row {
        display: grid;
        grid-template-columns: auto 3ch 1fr;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      /* Slider text label */
      .slider-text {
        /* label, natural width */
      }

      /* Slider value styling */
      .slider-value {
        /* always 3ch wide for value (e.g. "0,5" / "1  ") */
        font-family: monospace;
        text-align: right;
        width: 3ch;
      }

      /* Slider within slider-row */
      .slider-row ha-slider {
        width: 100%;
      }

      /* Details section spacing and background */
      details {
        margin-bottom: 16px; /* Increased for more space */
        border-radius: 6px; /* Slightly larger radius */
        padding: 8px 0 0 0; /* Add top padding for air */
      }

      /* Indent all direct children of details except summary and nested details */
      details > *:not(summary):not(details) {
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Details summary style */
      details summary {
        font-weight: bold;
        cursor: pointer;
        background: var(--card-background-color, #f6f6f6);
        border-radius: 6px;
        padding: 10px 16px; /* More padding for air */
        border: 1px solid var(--divider-color, #ddd);
        color: var(--primary-text-color, #222);
        margin-bottom: 4px; /* Space below summary */
      }

      /* Nested details styling */
      details details {
        margin-left: 24px; /* More indent */
        margin-right: 24px; /* More indent */
        background: var(--secondary-background-color, #f9f9f9);
        border-left: 2px solid var(--primary-color, #bcd);
        padding: 8px 0 8px 8px; /* More padding inside nested details */
      }

      /* Nested details summary styling */
      details details summary {
        background: var(--card-background-color, #f0f7fc);
        border: 1px solid var(--ha-card-border-color, #cde);
        color: var(--primary-text-color, #222);
        margin-bottom: 4px;
        padding: 8px 12px;
        border-radius: 5px;
      }

      /* --- Toggle (ha-switch) and boolean control styles --- */

      /*
  This section ensures that the clickable area (hitbox) for boolean toggles (ha-switch)
  matches the visible toggle size and does not expand unnecessarily. 
  The goal is DRY/KISS: no excessive click area, and only the toggle and label are clickable.
*/

      /* Remove any default margin/padding around the switch inside ha-formfield */
      ha-formfield > ha-switch,
      ha-formfield > .mdc-form-field > ha-switch {
        margin: 0;
        padding: 0;
        width: auto;
        min-width: 0;
        box-sizing: content-box;
      }

      /* Remove extra padding/margin on ha-formfield itself */
      ha-formfield {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      /* Minimize ripple/overlay area if present (Material Web ripple) */
      .mdc-form-field__ripple {
        width: auto !important;
        min-width: 0 !important;
        height: auto !important;
        min-height: 0 !important;
        border-radius: 16px !important;
        /* Only as large as the toggle itself */
      }

      /* Reduce spacing between toggles in settings group */
      details .ha-formfield {
        margin-bottom: 2px;
      }

      /* Display the current card version */
      .version-info {
        font-size: 0.9em;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      /* Remove extra background/overlay on focus/active */
      ha-switch:focus,
      ha-switch:active {
        box-shadow: none;
        outline: none;
      }

      /* Ensure toggles have standard size and spacing */
      ha-switch {
        vertical-align: middle;
        /* If needed, override width/height for consistent appearance */
        width: 36px;
        height: 20px;
        /* Remove any extra border or background */
        background: none;
        border: none;
        box-sizing: border-box;
      }

      /* Label alignment with switch */
      ha-formfield label,
      ha-formfield .mdc-label {
        vertical-align: middle;
        margin-left: 8px;
        margin-right: 0;
        padding: 0;
      }

      /* End of boolean control styles */
      /* --- Numeric input box width and padding fix for ha-textfield --- */

      /*
        Ensures that all ha-textfield elements used for numeric input
        (such as minimal_gap, icon size, text size, etc) display at least
        three digits clearly, without white space truncating the value.
        This patch sets width and internal padding. Applies to all number-type
        ha-textfield elements in the editor.
*/
      ha-textfield[type="number"] {
        /* Set a specific width to fit at least three digits and controls */
        width: 80px;
        min-width: 80px;
        max-width: 100px;
        /* Remove extra margin and padding */
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        /* Set font size for clarity */
        font-size: 1.1em;
      }

      /* Ensure the input itself inherits width and font size */
      ha-textfield[type="number"] input[type="number"] {
        width: 100%;
        min-width: 0;
        max-width: 100%;
        font-size: 1.1em;
        box-sizing: border-box;
        padding: 2px 8px;
        /* Remove border/background if needed */
        background: none;
        border: none;
      }

      /*
  Slider row input: force numeric box to be visible and aligned
  (applies to all numeric ha-textfield within .slider-row)
*/
      .slider-row ha-textfield[type="number"] {
        width: 80px;
        min-width: 80px;
        max-width: 100px;
        font-size: 1.1em;
        margin: 0;
        padding: 0;
      }
    `;
  }
}
customElements.define("pollenprognos-card-editor", xf);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "pollenprognos-card",
  name: "Pollenprognos Card",
  preview: !0,
  description: "Visar en grafisk prognos för pollenhalter",
  documentationURL: "https://github.com/krissen/pollenprognos-card"
});
