var ul = Object.defineProperty;
var gl = (t, e, i) => e in t ? ul(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var I = (t, e, i) => gl(t, typeof e != "symbol" ? e + "" : e, i);
const js = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get fetchForecast() {
    return Fc;
  },
  get stubConfigPP() {
    return pe;
  }
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ri = window, xr = Ri.ShadowRoot && (Ri.ShadyCSS === void 0 || Ri.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, wr = Symbol(), Hr = /* @__PURE__ */ new WeakMap();
let Io = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== wr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (xr && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Hr.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Hr.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _l = (t) => new Io(typeof t == "string" ? t : t + "", void 0, wr), No = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((s, r, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[n + 1]), t[0]);
  return new Io(i, t, wr);
}, fl = (t, e) => {
  xr ? t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet)) : e.forEach(((i) => {
    const s = document.createElement("style"), r = Ri.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, t.appendChild(s);
  }));
}, Fr = xr ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return _l(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var fs;
const Yi = window, Gr = Yi.trustedTypes, pl = Gr ? Gr.emptyScript : "", jr = Yi.reactiveElementPolyfillSupport, Us = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? pl : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Bo = (t, e) => e !== t && (e == e || t == t), ps = { attribute: !0, type: String, converter: Us, reflect: !1, hasChanged: Bo }, Vs = "finalized";
let At = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this._$Eu();
  }
  static addInitializer(e) {
    var i;
    this.finalize(), ((i = this.h) !== null && i !== void 0 ? i : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach(((i, s) => {
      const r = this._$Ep(s, i);
      r !== void 0 && (this._$Ev.set(r, s), e.push(r));
    })), e;
  }
  static createProperty(e, i = ps) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(e, i), !i.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const s = typeof e == "symbol" ? Symbol() : "__" + e, r = this.getPropertyDescriptor(e, s, i);
      r !== void 0 && Object.defineProperty(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    return { get() {
      return this[i];
    }, set(r) {
      const n = this[e];
      this[i] = r, this.requestUpdate(e, n, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || ps;
  }
  static finalize() {
    if (this.hasOwnProperty(Vs)) return !1;
    this[Vs] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const i = this.properties, s = [...Object.getOwnPropertyNames(i), ...Object.getOwnPropertySymbols(i)];
      for (const r of s) this.createProperty(r, i[r]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) i.unshift(Fr(r));
    } else e !== void 0 && i.push(Fr(e));
    return i;
  }
  static _$Ep(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  _$Eu() {
    var e;
    this._$E_ = new Promise(((i) => this.enableUpdating = i)), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach(((i) => i(this)));
  }
  addController(e) {
    var i, s;
    ((i = this._$ES) !== null && i !== void 0 ? i : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((s = e.hostConnected) === null || s === void 0 || s.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$ES) === null || i === void 0 || i.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach(((e, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    }));
  }
  createRenderRoot() {
    var e;
    const i = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return fl(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach(((i) => {
      var s;
      return (s = i.hostConnected) === null || s === void 0 ? void 0 : s.call(i);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach(((i) => {
      var s;
      return (s = i.hostDisconnected) === null || s === void 0 ? void 0 : s.call(i);
    }));
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$EO(e, i, s = ps) {
    var r;
    const n = this.constructor._$Ep(e, s);
    if (n !== void 0 && s.reflect === !0) {
      const a = (((r = s.converter) === null || r === void 0 ? void 0 : r.toAttribute) !== void 0 ? s.converter : Us).toAttribute(i, s.type);
      this._$El = e, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$El = null;
    }
  }
  _$AK(e, i) {
    var s;
    const r = this.constructor, n = r._$Ev.get(e);
    if (n !== void 0 && this._$El !== n) {
      const a = r.getPropertyOptions(n), o = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) === null || s === void 0 ? void 0 : s.fromAttribute) !== void 0 ? a.converter : Us;
      this._$El = n, this[n] = o.fromAttribute(i, a.type), this._$El = null;
    }
  }
  requestUpdate(e, i, s) {
    let r = !0;
    e !== void 0 && (((s = s || this.constructor.getPropertyOptions(e)).hasChanged || Bo)(this[e], i) ? (this._$AL.has(e) || this._$AL.set(e, i), s.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, s))) : r = !1), !this.isUpdatePending && r && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (i) {
      Promise.reject(i);
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach(((r, n) => this[n] = r)), this._$Ei = void 0);
    let i = !1;
    const s = this._$AL;
    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), (e = this._$ES) === null || e === void 0 || e.forEach(((r) => {
        var n;
        return (n = r.hostUpdate) === null || n === void 0 ? void 0 : n.call(r);
      })), this.update(s)) : this._$Ek();
    } catch (r) {
      throw i = !1, this._$Ek(), r;
    }
    i && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$ES) === null || i === void 0 || i.forEach(((s) => {
      var r;
      return (r = s.hostUpdated) === null || r === void 0 ? void 0 : r.call(s);
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
    this._$EC !== void 0 && (this._$EC.forEach(((i, s) => this._$EO(s, this[s], i))), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
At[Vs] = !0, At.elementProperties = /* @__PURE__ */ new Map(), At.elementStyles = [], At.shadowRootOptions = { mode: "open" }, jr == null || jr({ ReactiveElement: At }), ((fs = Yi.reactiveElementVersions) !== null && fs !== void 0 ? fs : Yi.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ms;
const Xi = window, Mt = Xi.trustedTypes, Ur = Mt ? Mt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ws = "$lit$", Ze = `lit$${(Math.random() + "").slice(9)}$`, Ho = "?" + Ze, ml = `<${Ho}>`, vt = document, si = () => vt.createComment(""), ri = (t) => t === null || typeof t != "object" && typeof t != "function", Fo = Array.isArray, vl = (t) => Fo(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", vs = `[ 	
\f\r]`, It = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Vr = /-->/g, Wr = />/g, at = RegExp(`>|${vs}(?:([^\\s"'>=/]+)(${vs}*=${vs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kr = /'/g, Yr = /"/g, Go = /^(?:script|style|textarea|title)$/i, yl = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), F = yl(1), yt = Symbol.for("lit-noChange"), ue = Symbol.for("lit-nothing"), Xr = /* @__PURE__ */ new WeakMap(), _t = vt.createTreeWalker(vt, 129, null, !1);
function jo(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ur !== void 0 ? Ur.createHTML(e) : e;
}
const bl = (t, e) => {
  const i = t.length - 1, s = [];
  let r, n = e === 2 ? "<svg>" : "", a = It;
  for (let o = 0; o < i; o++) {
    const l = t[o];
    let d, c, h = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, c = a.exec(l), c !== null); ) u = a.lastIndex, a === It ? c[1] === "!--" ? a = Vr : c[1] !== void 0 ? a = Wr : c[2] !== void 0 ? (Go.test(c[2]) && (r = RegExp("</" + c[2], "g")), a = at) : c[3] !== void 0 && (a = at) : a === at ? c[0] === ">" ? (a = r ?? It, h = -1) : c[1] === void 0 ? h = -2 : (h = a.lastIndex - c[2].length, d = c[1], a = c[3] === void 0 ? at : c[3] === '"' ? Yr : Kr) : a === Yr || a === Kr ? a = at : a === Vr || a === Wr ? a = It : (a = at, r = void 0);
    const g = a === at && t[o + 1].startsWith("/>") ? " " : "";
    n += a === It ? l + ml : h >= 0 ? (s.push(d), l.slice(0, h) + Ws + l.slice(h) + Ze + g) : l + Ze + (h === -2 ? (s.push(void 0), o) : g);
  }
  return [jo(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : "")), s];
};
class ni {
  constructor({ strings: e, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const o = e.length - 1, l = this.parts, [d, c] = bl(e, i);
    if (this.el = ni.createElement(d, s), _t.currentNode = this.el.content, i === 2) {
      const h = this.el.content, u = h.firstChild;
      u.remove(), h.append(...u.childNodes);
    }
    for (; (r = _t.nextNode()) !== null && l.length < o; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) {
          const h = [];
          for (const u of r.getAttributeNames()) if (u.endsWith(Ws) || u.startsWith(Ze)) {
            const g = c[a++];
            if (h.push(u), g !== void 0) {
              const _ = r.getAttribute(g.toLowerCase() + Ws).split(Ze), f = /([.?@])?(.*)/.exec(g);
              l.push({ type: 1, index: n, name: f[2], strings: _, ctor: f[1] === "." ? wl : f[1] === "?" ? Sl : f[1] === "@" ? Al : ns });
            } else l.push({ type: 6, index: n });
          }
          for (const u of h) r.removeAttribute(u);
        }
        if (Go.test(r.tagName)) {
          const h = r.textContent.split(Ze), u = h.length - 1;
          if (u > 0) {
            r.textContent = Mt ? Mt.emptyScript : "";
            for (let g = 0; g < u; g++) r.append(h[g], si()), _t.nextNode(), l.push({ type: 2, index: ++n });
            r.append(h[u], si());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ho) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(Ze, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += Ze.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = vt.createElement("template");
    return s.innerHTML = e, s;
  }
}
function $t(t, e, i = t, s) {
  var r, n, a, o;
  if (e === yt) return e;
  let l = s !== void 0 ? (r = i._$Co) === null || r === void 0 ? void 0 : r[s] : i._$Cl;
  const d = ri(e) ? void 0 : e._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== d && ((n = l == null ? void 0 : l._$AO) === null || n === void 0 || n.call(l, !1), d === void 0 ? l = void 0 : (l = new d(t), l._$AT(t, i, s)), s !== void 0 ? ((a = (o = i)._$Co) !== null && a !== void 0 ? a : o._$Co = [])[s] = l : i._$Cl = l), l !== void 0 && (e = $t(t, l._$AS(t, e.values), l, s)), e;
}
class xl {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var i;
    const { el: { content: s }, parts: r } = this._$AD, n = ((i = e == null ? void 0 : e.creationScope) !== null && i !== void 0 ? i : vt).importNode(s, !0);
    _t.currentNode = n;
    let a = _t.nextNode(), o = 0, l = 0, d = r[0];
    for (; d !== void 0; ) {
      if (o === d.index) {
        let c;
        d.type === 2 ? c = new fi(a, a.nextSibling, this, e) : d.type === 1 ? c = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (c = new El(a, this, e)), this._$AV.push(c), d = r[++l];
      }
      o !== (d == null ? void 0 : d.index) && (a = _t.nextNode(), o++);
    }
    return _t.currentNode = vt, n;
  }
  v(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class fi {
  constructor(e, i, s, r) {
    var n;
    this.type = 2, this._$AH = ue, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = r, this._$Cp = (n = r == null ? void 0 : r.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var e, i;
    return (i = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && i !== void 0 ? i : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = $t(this, e, i), ri(e) ? e === ue || e == null || e === "" ? (this._$AH !== ue && this._$AR(), this._$AH = ue) : e !== this._$AH && e !== yt && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : vl(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== ue && ri(this._$AH) ? this._$AA.nextSibling.data = e : this.$(vt.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var i;
    const { values: s, _$litType$: r } = e, n = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = ni.createElement(jo(r.h, r.h[0]), this.options)), r);
    if (((i = this._$AH) === null || i === void 0 ? void 0 : i._$AD) === n) this._$AH.v(s);
    else {
      const a = new xl(n, this), o = a.u(this.options);
      a.v(s), this.$(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Xr.get(e.strings);
    return i === void 0 && Xr.set(e.strings, i = new ni(e)), i;
  }
  T(e) {
    Fo(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of e) r === i.length ? i.push(s = new fi(this.k(si()), this.k(si()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, i); e && e !== this._$AB; ) {
      const r = e.nextSibling;
      e.remove(), e = r;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cp = e, (i = this._$AP) === null || i === void 0 || i.call(this, e));
  }
}
class ns {
  constructor(e, i, s, r, n) {
    this.type = 1, this._$AH = ue, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = ue;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, i = this, s, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = $t(this, e, i, 0), a = !ri(e) || e !== this._$AH && e !== yt, a && (this._$AH = e);
    else {
      const o = e;
      let l, d;
      for (e = n[0], l = 0; l < n.length - 1; l++) d = $t(this, o[s + l], i, l), d === yt && (d = this._$AH[l]), a || (a = !ri(d) || d !== this._$AH[l]), d === ue ? e = ue : e !== ue && (e += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === ue ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class wl extends ns {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === ue ? void 0 : e;
  }
}
const kl = Mt ? Mt.emptyScript : "";
class Sl extends ns {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== ue ? this.element.setAttribute(this.name, kl) : this.element.removeAttribute(this.name);
  }
}
class Al extends ns {
  constructor(e, i, s, r, n) {
    super(e, i, s, r, n), this.type = 5;
  }
  _$AI(e, i = this) {
    var s;
    if ((e = (s = $t(this, e, i, 0)) !== null && s !== void 0 ? s : ue) === yt) return;
    const r = this._$AH, n = e === ue && r !== ue || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== ue && (r === ue || n);
    n && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (i = this.options) === null || i === void 0 ? void 0 : i.host) !== null && s !== void 0 ? s : this.element, e) : this._$AH.handleEvent(e);
  }
}
class El {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    $t(this, e);
  }
}
const qr = Xi.litHtmlPolyfillSupport;
qr == null || qr(ni, fi), ((ms = Xi.litHtmlVersions) !== null && ms !== void 0 ? ms : Xi.litHtmlVersions = []).push("2.8.0");
const Cl = (t, e, i) => {
  var s, r;
  const n = (s = i == null ? void 0 : i.renderBefore) !== null && s !== void 0 ? s : e;
  let a = n._$litPart$;
  if (a === void 0) {
    const o = (r = i == null ? void 0 : i.renderBefore) !== null && r !== void 0 ? r : null;
    n._$litPart$ = a = new fi(e.insertBefore(si(), o), o, void 0, i ?? {});
  }
  return a._$AI(t), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ys, bs;
class Ct extends At {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, i;
    const s = super.createRenderRoot();
    return (e = (i = this.renderOptions).renderBefore) !== null && e !== void 0 || (i.renderBefore = s.firstChild), s;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Cl(i, this.renderRoot, this.renderOptions);
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
    return yt;
  }
}
Ct.finalized = !0, Ct._$litElement$ = !0, (ys = globalThis.litElementHydrateSupport) === null || ys === void 0 || ys.call(globalThis, { LitElement: Ct });
const Zr = globalThis.litElementPolyfillSupport;
Zr == null || Zr({ LitElement: Ct });
((bs = globalThis.litElementVersions) !== null && bs !== void 0 ? bs : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pl = { CHILD: 2 }, Ml = (t) => (...e) => ({ _$litDirective$: t, values: e });
class $l {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, s) {
    this._$Ct = e, this._$AM = i, this._$Ci = s;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Ks extends $l {
  constructor(e) {
    if (super(e), this.et = ue, e.type !== Pl.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === ue || e == null) return this.ft = void 0, this.et = e;
    if (e === yt) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.et) return this.ft;
    this.et = e;
    const i = [e];
    return i.raw = i, this.ft = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
Ks.directiveName = "unsafeHTML", Ks.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Ys = class extends Ks {
};
Ys.directiveName = "unsafeSVG", Ys.resultType = 2;
const Tl = Ml(Ys), ze = (t, e = "_") => {
  const i = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", s = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${e}`, r = new RegExp(i.split("").join("|"), "g"), n = {
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
  return t === "" ? a = "" : (a = t.toString().toLowerCase().replace(r, (o) => s.charAt(i.indexOf(o))).replace(/[а-я]/g, (o) => n[o] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, e).replace(new RegExp(`(${e})\\1+`, "g"), "$1").replace(new RegExp(`^${e}+`), "").replace(new RegExp(`${e}+$`), ""), a === "" && (a = "unknown")), a;
}, xs = {}, Ll = `<?xml version="1.0" standalone="no"?>
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
`, Dl = `<?xml version="1.0" standalone="no"?>
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
`, zl = `<?xml version="1.0" standalone="no"?>
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
`, Ol = `<?xml version="1.0" standalone="no"?>
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
`, Rl = `<?xml version="1.0" standalone="no"?>
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
`, Il = `<?xml version="1.0" standalone="no"?>
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
`, Nl = `<?xml version="1.0" standalone="no"?>
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
`, Bl = `<?xml version="1.0" standalone="no"?>
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
`, Hl = `<?xml version="1.0" standalone="no"?>
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
`, Fl = `<?xml version="1.0" standalone="no"?>
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
`, Gl = `<?xml version="1.0" standalone="no"?>
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
`, jl = `<?xml version="1.0" standalone="no"?>
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
`, Ul = `<?xml version="1.0" standalone="no"?>
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
`, Jr = `<?xml version="1.0" standalone="no"?>
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
`, Vl = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" aria-hidden="true">
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
`, Wl = `<?xml version="1.0" standalone="no"?>
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
`, Kl = `<?xml version="1.0" standalone="no"?>
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
`, Yl = `<?xml version="1.0" standalone="no"?>
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
`, Xl = `<?xml version="1.0" standalone="no"?>
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
`, ql = `<?xml version="1.0" standalone="no"?>
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
`, Zl = `<?xml version="1.0" standalone="no"?>
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
`, Jl = `<?xml version="1.0" standalone="no"?>
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
`, Ql = `<?xml version="1.0" standalone="no"?>
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
`, ed = `<?xml version="1.0" standalone="no"?>
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
`, td = {
  alder: Ll,
  allergy_risk: Dl,
  ash: zl,
  beech: Ol,
  birch: Rl,
  chenopod: Il,
  cypress: Nl,
  elm: Bl,
  grass: Hl,
  hazel: Fl,
  lime: Gl,
  mold_spores: jl,
  mugwort: Ul,
  nettle_and_pellitory: Jr,
  nettle: Jr,
  // Alias for compatibility
  no_allergens: Vl,
  oak: Wl,
  olive: Kl,
  pine: Yl,
  plane: Xl,
  poaceae: ql,
  poplar: Zl,
  ragweed: Jl,
  rye: Ql,
  willow: ed
};
function ws(t) {
  return !t || typeof t != "string" ? null : td[t] || null;
}
const id = {
  "card.allergen.alder": "Olše",
  "card.allergen.allergy_risk": "Riziko alergie",
  "card.allergen.ash": "Jasan",
  "card.allergen.beech": "Buk",
  "card.allergen.birch": "Bříza",
  "card.allergen.chenopod": "Laskavec",
  "card.allergen.cypress": "Cypřiš",
  "card.allergen.elm": "Jilm",
  "card.allergen.grass": "Tráva",
  "card.allergen.grass_cat": "Traviny",
  "card.allergen.hazel": "Líska",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Lípa",
  "card.allergen.mold_spores": "Plísňové spory",
  "card.allergen.mugwort": "Pelyněk",
  "card.allergen.nettle": "Kopřiva",
  "card.allergen.nettle_and_pellitory": "Kopřiva a parietárie",
  "card.allergen.oak": "Dub",
  "card.allergen.olive": "Olivovník",
  "card.allergen.pine": "Borovice",
  "card.allergen.plane": "Platan",
  "card.allergen.poaceae": "Traviny",
  "card.allergen.poplar": "Topol",
  "card.allergen.ragweed": "Ambrozie",
  "card.allergen.rye": "Žito",
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
  "card.error_no_sensors": "Nenalezeny žádné pylové senzory. Je správná integrace nainstalována a vybrán region v nastavení karty?",
  "card.header_prefix": "Pylová předpověď pro",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Načítání předpovědi...",
  "card.no_allergens": "Žádné alergeny",
  "card.no_information": "(Žádné informace)",
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
  "editor.allergens_header_specific": "Jednotlivé alergeny (specifické)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Tráva",
  "editor.phrases_full.grass_cat": "Traviny",
  "editor.phrases_full.hazel": "Líska",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Lípa",
  "editor.phrases_full.mold_spores": "Plísňové spory",
  "editor.phrases_full.mugwort": "Pelyněk",
  "editor.phrases_full.nettle": "Kopřiva",
  "editor.phrases_full.nettle_and_pellitory": "Kopřiva a parietárie",
  "editor.phrases_full.oak": "Dub",
  "editor.phrases_full.olive": "Olivovník",
  "editor.phrases_full.pine": "Borovice",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.poaceae": "Traviny",
  "editor.phrases_full.poplar": "Topol",
  "editor.phrases_full.ragweed": "Ambrozie",
  "editor.phrases_full.rye": "Žito",
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
  "editor.phrases_short.grass": "Tráva",
  "editor.phrases_short.grass_cat": "Tráva",
  "editor.phrases_short.grasses": "Trávy",
  "editor.phrases_short.hazel": "Líska",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Lípa",
  "editor.phrases_short.mold_spores": "Plísně",
  "editor.phrases_short.mugwort": "Pelyněk",
  "editor.phrases_short.nettle": "Kopřiv",
  "editor.phrases_short.nettle_and_pellitory": "Kopřiva",
  "editor.phrases_short.oak": "Dub",
  "editor.phrases_short.olive": "Oliv.",
  "editor.phrases_short.pine": "Borovi",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.poaceae": "Travin",
  "editor.phrases_short.poplar": "Topol",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Žito",
  "editor.phrases_short.trees": "Stromy",
  "editor.phrases_short.trees_cat": "Stromy",
  "editor.phrases_short.weeds": "Plevely",
  "editor.phrases_short.weeds_cat": "Plevely",
  "editor.phrases_short.willow": "Vrba",
  "editor.phrases_translate_all": "Přeložit vše",
  "editor.pollen_threshold": "Práh:",
  "editor.preset_reset_all": "Obnovit všechna nastavení",
  "editor.region_id": "ID regionu",
  "editor.select_all_allergens": "Vybrat všechny alergeny",
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
}, sd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: id
}, Symbol.toStringTag, { value: "Module" })), rd = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisiko",
  "card.allergen.ash": "Ask",
  "card.allergen.beech": "Bøg",
  "card.allergen.birch": "Birk",
  "card.allergen.chenopod": "Gåsefod",
  "card.allergen.cypress": "Cypres",
  "card.allergen.elm": "El",
  "card.allergen.grass": "Græs",
  "card.allergen.grass_cat": "Græsser",
  "card.allergen.hazel": "Hassel",
  "card.allergen.index": "Indeks",
  "card.allergen.lime": "Lind",
  "card.allergen.mold_spores": "Skimmelsvampe",
  "card.allergen.mugwort": "Malurt",
  "card.allergen.nettle": "Nælde",
  "card.allergen.nettle_and_pellitory": "Brændenælde og parietaria",
  "card.allergen.oak": "Eg",
  "card.allergen.olive": "Oliven",
  "card.allergen.pine": "Fyr",
  "card.allergen.plane": "Platan",
  "card.allergen.poaceae": "Græsser",
  "card.allergen.poplar": "Poppel",
  "card.allergen.ragweed": "Ambrosie",
  "card.allergen.rye": "Rug",
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
  "card.error_no_sensors": "Ingen pollensensor fundet. Har du installeret den korrekte integration og valgt region i kortets opsætning?",
  "card.header_prefix": "Pollenprognose for",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Indlæser prognose...",
  "card.no_allergens": "Ingen allergener",
  "card.no_information": "(Ingen information)",
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
  "editor.allergens_header_specific": "Individuelle allergener (specifikke)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Græs",
  "editor.phrases_full.grass_cat": "Græsser",
  "editor.phrases_full.hazel": "Hassel",
  "editor.phrases_full.index": "Indeks",
  "editor.phrases_full.lime": "Lind",
  "editor.phrases_full.mold_spores": "Skimmelsvampe",
  "editor.phrases_full.mugwort": "Malurt",
  "editor.phrases_full.nettle": "Nælde",
  "editor.phrases_full.nettle_and_pellitory": "Brændenælde og parietaria",
  "editor.phrases_full.oak": "Eg",
  "editor.phrases_full.olive": "Oliven",
  "editor.phrases_full.pine": "Fyr",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.poaceae": "Græsser",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.ragweed": "Ambrosie",
  "editor.phrases_full.rye": "Rug",
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
  "editor.phrases_short.grass": "Græs",
  "editor.phrases_short.grass_cat": "Græs",
  "editor.phrases_short.grasses": "Græs",
  "editor.phrases_short.hazel": "Hassel",
  "editor.phrases_short.index": "Indeks",
  "editor.phrases_short.lime": "Lind",
  "editor.phrases_short.mold_spores": "Skimmel",
  "editor.phrases_short.mugwort": "Malurt",
  "editor.phrases_short.nettle": "Nælde",
  "editor.phrases_short.nettle_and_pellitory": "Nælde",
  "editor.phrases_short.oak": "Eg",
  "editor.phrases_short.olive": "Oliven",
  "editor.phrases_short.pine": "Fyr",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.poaceae": "Græs",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.ragweed": "Ambrosie",
  "editor.phrases_short.rye": "Rug",
  "editor.phrases_short.trees": "Træer",
  "editor.phrases_short.trees_cat": "Træer",
  "editor.phrases_short.weeds": "Ukrudt",
  "editor.phrases_short.weeds_cat": "Ukrudt",
  "editor.phrases_short.willow": "Pil",
  "editor.phrases_translate_all": "Oversæt alle",
  "editor.pollen_threshold": "Tærskel:",
  "editor.preset_reset_all": "Nulstil alle indstillinger",
  "editor.region_id": "Regions-ID",
  "editor.select_all_allergens": "Vælg alle allergener",
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
}, nd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rd
}, Symbol.toStringTag, { value: "Module" })), od = {
  "card.allergen.alder": "Erle",
  "card.allergen.allergy_risk": "Allergierisiko",
  "card.allergen.ash": "Esche",
  "card.allergen.beech": "Buche",
  "card.allergen.birch": "Birke",
  "card.allergen.chenopod": "Gänsefuß",
  "card.allergen.cypress": "Zypresse",
  "card.allergen.elm": "Ulme",
  "card.allergen.grass": "Gräser",
  "card.allergen.grass_cat": "Gräser",
  "card.allergen.hazel": "Hasel",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Linde",
  "card.allergen.mold_spores": "Schimmelsporen",
  "card.allergen.mugwort": "Beifuß",
  "card.allergen.nettle": "Brennnessel",
  "card.allergen.nettle_and_pellitory": "Nessel & Parietarie",
  "card.allergen.oak": "Eiche",
  "card.allergen.olive": "Olive",
  "card.allergen.pine": "Kiefer",
  "card.allergen.plane": "Platane",
  "card.allergen.poaceae": "Gräser",
  "card.allergen.poplar": "Pappel",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Roggen",
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
  "card.error_no_sensors": "Keine Pollen-Sensoren gefunden. Haben Sie die richtige Integration installiert und eine Region in der Kartenkonfiguration ausgewählt?",
  "card.header_prefix": "Pollenprognose für",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Vorhersage wird geladen...",
  "card.no_allergens": "Keine Allergene",
  "card.no_information": "(Keine Information)",
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
  "editor.allergens_header_specific": "Einzelne Allergene (spezifisch)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Gräser",
  "editor.phrases_full.grass_cat": "Gräser",
  "editor.phrases_full.hazel": "Hasel",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Linde",
  "editor.phrases_full.mold_spores": "Schimmelsporen",
  "editor.phrases_full.mugwort": "Beifuß",
  "editor.phrases_full.nettle": "Brennnessel",
  "editor.phrases_full.nettle_and_pellitory": "Nessel & Parietarie",
  "editor.phrases_full.oak": "Eiche",
  "editor.phrases_full.olive": "Olive",
  "editor.phrases_full.pine": "Kiefer",
  "editor.phrases_full.plane": "Platane",
  "editor.phrases_full.poaceae": "Gräser",
  "editor.phrases_full.poplar": "Pappel",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Roggen",
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
  "editor.phrases_short.grass": "Gräs",
  "editor.phrases_short.grass_cat": "Gräs",
  "editor.phrases_short.grasses": "Gräser",
  "editor.phrases_short.hazel": "Hasel",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Linde",
  "editor.phrases_short.mold_spores": "Schimmel",
  "editor.phrases_short.mugwort": "Beifu",
  "editor.phrases_short.nettle": "Brenns",
  "editor.phrases_short.nettle_and_pellitory": "Nessel",
  "editor.phrases_short.oak": "Eiche",
  "editor.phrases_short.olive": "Olive",
  "editor.phrases_short.pine": "Kiefer",
  "editor.phrases_short.plane": "Plat.",
  "editor.phrases_short.poaceae": "Gräser",
  "editor.phrases_short.poplar": "Pappel",
  "editor.phrases_short.ragweed": "Ambro",
  "editor.phrases_short.rye": "Roggn",
  "editor.phrases_short.trees": "Bäume",
  "editor.phrases_short.trees_cat": "Bäume",
  "editor.phrases_short.weeds": "Unkräuter",
  "editor.phrases_short.weeds_cat": "Unkräuter",
  "editor.phrases_short.willow": "Weide",
  "editor.phrases_translate_all": "Alle übersetzen",
  "editor.pollen_threshold": "Schwelle:",
  "editor.preset_reset_all": "Alles zurücksetzen",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Alle Allergene auswählen",
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
}, ad = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: od
}, Symbol.toStringTag, { value: "Module" })), ld = {
  "card.allergen.alder": "Alder",
  "card.allergen.allergy_risk": "Allergy risk",
  "card.allergen.ash": "Ash",
  "card.allergen.beech": "Beech",
  "card.allergen.birch": "Birch",
  "card.allergen.chenopod": "Chenopod",
  "card.allergen.cypress": "Cypress",
  "card.allergen.elm": "Elm",
  "card.allergen.grass": "Grass",
  "card.allergen.grass_cat": "Grasses",
  "card.allergen.hazel": "Hazel",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Lime",
  "card.allergen.mold_spores": "Mold spores",
  "card.allergen.mugwort": "Mugwort",
  "card.allergen.nettle": "Nettle",
  "card.allergen.nettle_and_pellitory": "Nettle and pellitory",
  "card.allergen.oak": "Oak",
  "card.allergen.olive": "Olive",
  "card.allergen.pine": "Pine",
  "card.allergen.plane": "Plane",
  "card.allergen.poaceae": "Poaceae",
  "card.allergen.poplar": "Poplar",
  "card.allergen.ragweed": "Ragweed",
  "card.allergen.rye": "Rye",
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
  "card.error_no_sensors": "No pollen sensors found. Have you installed the correct integration and selected a region in the card configuration?",
  "card.header_prefix": "Pollen forecast for",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
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
  "card.loading_forecast": "Loading forecast...",
  "card.no_allergens": "No allergens",
  "card.no_information": "(No information)",
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
  "editor.allergens_header_specific": "Individual allergens (specific)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
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
  "editor.phrases_full.hazel": "Hazel",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Lime",
  "editor.phrases_full.mold_spores": "Mold spores",
  "editor.phrases_full.mugwort": "Mugwort",
  "editor.phrases_full.nettle": "Nettle",
  "editor.phrases_full.nettle_and_pellitory": "Nettle and pellitory",
  "editor.phrases_full.oak": "Oak",
  "editor.phrases_full.olive": "Olive",
  "editor.phrases_full.pine": "Pine",
  "editor.phrases_full.plane": "Plane",
  "editor.phrases_full.poaceae": "Poaceae",
  "editor.phrases_full.poplar": "Poplar",
  "editor.phrases_full.ragweed": "Ragweed",
  "editor.phrases_full.rye": "Rye",
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
  "editor.phrases_short.hazel": "Hazel",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Lime",
  "editor.phrases_short.mold_spores": "Mold",
  "editor.phrases_short.mugwort": "Mgwrt",
  "editor.phrases_short.nettle": "Nettle",
  "editor.phrases_short.nettle_and_pellitory": "Nettle",
  "editor.phrases_short.oak": "Oak",
  "editor.phrases_short.olive": "Olive",
  "editor.phrases_short.pine": "Pine",
  "editor.phrases_short.plane": "Plane",
  "editor.phrases_short.poaceae": "Poaceae",
  "editor.phrases_short.poplar": "Poplar",
  "editor.phrases_short.ragweed": "Rgwd",
  "editor.phrases_short.rye": "Rye",
  "editor.phrases_short.trees": "Trees",
  "editor.phrases_short.trees_cat": "Trees",
  "editor.phrases_short.weeds": "Weeds",
  "editor.phrases_short.weeds_cat": "Weeds",
  "editor.phrases_short.willow": "Wllw",
  "editor.phrases_translate_all": "Translate all",
  "editor.pollen_threshold": "Threshold:",
  "editor.preset_reset_all": "Reset all settings",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Select all allergens",
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
}, dd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ld
}, Symbol.toStringTag, { value: "Module" })), cd = {
  "card.allergen.alder": "Leppä",
  "card.allergen.allergy_risk": "Allergiariski",
  "card.allergen.ash": "Saarni",
  "card.allergen.beech": "Pyökki",
  "card.allergen.birch": "Koivu",
  "card.allergen.chenopod": "Savikka",
  "card.allergen.cypress": "Sypressi",
  "card.allergen.elm": "Jalava",
  "card.allergen.grass": "Heinä",
  "card.allergen.grass_cat": "Heinät",
  "card.allergen.hazel": "Pähkinäpensas",
  "card.allergen.index": "Indeksi",
  "card.allergen.lime": "Lehmus",
  "card.allergen.mold_spores": "Homeitiöt",
  "card.allergen.mugwort": "Pujo",
  "card.allergen.nettle": "Nokkonen",
  "card.allergen.nettle_and_pellitory": "Nokkonen ja piilehtipensas",
  "card.allergen.oak": "Tammi",
  "card.allergen.olive": "Oliivipuu",
  "card.allergen.pine": "Mänty",
  "card.allergen.plane": "Plataanipuu",
  "card.allergen.poaceae": "Heinät",
  "card.allergen.poplar": "Haapa",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Ruis",
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
  "card.error_no_sensors": "Pölytysantureita ei löytynyt. Oletko asentanut oikean integraation ja valinnut alueen kortin asetuksista?",
  "card.header_prefix": "Siitepölyennuste kohteessa",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Ennustetta ladataan...",
  "card.no_allergens": "Ei allergeeneja",
  "card.no_information": "(Ei tietoa)",
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
  "editor.allergens_header_specific": "Yksittäiset allergeenit (tarkat)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Heinä",
  "editor.phrases_full.grass_cat": "Heinät",
  "editor.phrases_full.hazel": "Pähkinäpensas",
  "editor.phrases_full.index": "Indeksi",
  "editor.phrases_full.lime": "Lehmus",
  "editor.phrases_full.mold_spores": "Homeitiöt",
  "editor.phrases_full.mugwort": "Pujo",
  "editor.phrases_full.nettle": "Nokkonen",
  "editor.phrases_full.nettle_and_pellitory": "Nokkonen ja piilehtipensas",
  "editor.phrases_full.oak": "Tammi",
  "editor.phrases_full.olive": "Oliivipuu",
  "editor.phrases_full.pine": "Mänty",
  "editor.phrases_full.plane": "Plataanipuu",
  "editor.phrases_full.poaceae": "Heinät",
  "editor.phrases_full.poplar": "Popppeli",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Ruis",
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
  "editor.phrases_short.grass": "Heinä",
  "editor.phrases_short.grass_cat": "Heinä",
  "editor.phrases_short.grasses": "Heinät",
  "editor.phrases_short.hazel": "Pähkinä",
  "editor.phrases_short.index": "Indeksi",
  "editor.phrases_short.lime": "Lehmus",
  "editor.phrases_short.mold_spores": "Home",
  "editor.phrases_short.mugwort": "Pujo",
  "editor.phrases_short.nettle": "Nokkon",
  "editor.phrases_short.nettle_and_pellitory": "Nokkonen",
  "editor.phrases_short.oak": "Tammi",
  "editor.phrases_short.olive": "Oliivi",
  "editor.phrases_short.pine": "Mänty",
  "editor.phrases_short.plane": "Plataani",
  "editor.phrases_short.poaceae": "Heinät",
  "editor.phrases_short.poplar": "Haapa",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Ruis",
  "editor.phrases_short.trees": "Puut",
  "editor.phrases_short.trees_cat": "Puut",
  "editor.phrases_short.weeds": "Rikkaruohot",
  "editor.phrases_short.weeds_cat": "Rikkaruohot",
  "editor.phrases_short.willow": "Paju",
  "editor.phrases_translate_all": "Käännä kaikki",
  "editor.pollen_threshold": "Kynnysarvo:",
  "editor.preset_reset_all": "Palauta kaikki asetukset",
  "editor.region_id": "Alueen tunnus",
  "editor.select_all_allergens": "Valitse kaikki allergeenit",
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
}, hd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cd
}, Symbol.toStringTag, { value: "Module" })), ud = {
  "card.allergen.alder": "Aulne",
  "card.allergen.allergy_risk": "Risque d'allergie",
  "card.allergen.ash": "Frêne",
  "card.allergen.beech": "Hêtre",
  "card.allergen.birch": "Bouleau",
  "card.allergen.chenopod": "Chénopode",
  "card.allergen.cypress": "Cyprès",
  "card.allergen.elm": "Orme",
  "card.allergen.grass": "Graminées",
  "card.allergen.grass_cat": "Graminées",
  "card.allergen.hazel": "Noisetier",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Tilleul",
  "card.allergen.mold_spores": "Spores de moisissure",
  "card.allergen.mugwort": "Armoise",
  "card.allergen.nettle": "Ortie",
  "card.allergen.nettle_and_pellitory": "Ortie et pariétaire",
  "card.allergen.oak": "Chêne",
  "card.allergen.olive": "Olivier",
  "card.allergen.pine": "Pin",
  "card.allergen.plane": "Platane",
  "card.allergen.poaceae": "Graminées",
  "card.allergen.poplar": "Peuplier",
  "card.allergen.ragweed": "Ambroisie",
  "card.allergen.rye": "Seigle",
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
  "card.error_no_sensors": "Aucun capteur de pollen trouvé. Avez-vous installé la bonne intégration et sélectionné une région dans la configuration de la carte ?",
  "card.header_prefix": "Prévisions des pollens pour",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Chargement des prévisions...",
  "card.no_allergens": "Aucun allergène",
  "card.no_information": "(Aucune information)",
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
  "editor.allergens_header_specific": "Allergènes individuels (spécifiques)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Graminées",
  "editor.phrases_full.grass_cat": "Graminées",
  "editor.phrases_full.hazel": "Noisetier",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Tilleul",
  "editor.phrases_full.mold_spores": "Spores de moisissure",
  "editor.phrases_full.mugwort": "Armoise",
  "editor.phrases_full.nettle": "Ortie",
  "editor.phrases_full.nettle_and_pellitory": "Ortie et pariétaire",
  "editor.phrases_full.oak": "Chêne",
  "editor.phrases_full.olive": "Olivier",
  "editor.phrases_full.pine": "Pin",
  "editor.phrases_full.plane": "Platane",
  "editor.phrases_full.poaceae": "Graminées",
  "editor.phrases_full.poplar": "Peuplier",
  "editor.phrases_full.ragweed": "Ambroisie",
  "editor.phrases_full.rye": "Seigle",
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
  "editor.phrases_short.grass": "Graminées",
  "editor.phrases_short.grass_cat": "Graminées",
  "editor.phrases_short.grasses": "Graminées",
  "editor.phrases_short.hazel": "Noisetier",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Tilleul",
  "editor.phrases_short.mold_spores": "Moisissure",
  "editor.phrases_short.mugwort": "Armoise",
  "editor.phrases_short.nettle": "Ortie",
  "editor.phrases_short.nettle_and_pellitory": "Ortie",
  "editor.phrases_short.oak": "Chêne",
  "editor.phrases_short.olive": "Olivier",
  "editor.phrases_short.pine": "Pin",
  "editor.phrases_short.plane": "Platane",
  "editor.phrases_short.poaceae": "Gramin",
  "editor.phrases_short.poplar": "Peupl",
  "editor.phrases_short.ragweed": "Ambroisie",
  "editor.phrases_short.rye": "Seigle",
  "editor.phrases_short.trees": "Arbres",
  "editor.phrases_short.trees_cat": "Arbres",
  "editor.phrases_short.weeds": "Herbacées",
  "editor.phrases_short.weeds_cat": "Herbacées",
  "editor.phrases_short.willow": "Saule",
  "editor.phrases_translate_all": "Tout traduire",
  "editor.pollen_threshold": "Seuil :",
  "editor.preset_reset_all": "Réinitialiser tous les paramètres",
  "editor.region_id": "ID de région",
  "editor.select_all_allergens": "Sélectionner tous les allergènes",
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
}, gd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ud
}, Symbol.toStringTag, { value: "Module" })), _d = {
  "card.allergen.alder": "Ontano",
  "card.allergen.allergy_risk": "Rischio allergia",
  "card.allergen.ash": "Frassino",
  "card.allergen.beech": "Faggio",
  "card.allergen.birch": "Betulla",
  "card.allergen.chenopod": "Chenopodio",
  "card.allergen.cypress": "Cipresso",
  "card.allergen.elm": "Olmo",
  "card.allergen.grass": "Graminacee",
  "card.allergen.grass_cat": "Graminacee",
  "card.allergen.hazel": "Nocciolo",
  "card.allergen.index": "Indice",
  "card.allergen.lime": "Tiglio",
  "card.allergen.mold_spores": "Spore di muffa",
  "card.allergen.mugwort": "Artemisia",
  "card.allergen.nettle": "Ortica",
  "card.allergen.nettle_and_pellitory": "Ortica e parietaria",
  "card.allergen.oak": "Quercia",
  "card.allergen.olive": "Olivo",
  "card.allergen.pine": "Pino",
  "card.allergen.plane": "Platano",
  "card.allergen.poaceae": "Graminacee",
  "card.allergen.poplar": "Pioppo",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Segale",
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
  "card.error_no_sensors": "Nessun sensore di polline trovato. Hai installato l'integrazione corretta e selezionato una regione nella configurazione della scheda?",
  "card.header_prefix": "Previsione pollini per",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Caricamento previsione...",
  "card.no_allergens": "Nessun allergene",
  "card.no_information": "(Nessuna informazione)",
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
  "editor.allergens_header_specific": "Allergeni individuali (specifici)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Graminacee",
  "editor.phrases_full.grass_cat": "Graminacee",
  "editor.phrases_full.hazel": "Nocciolo",
  "editor.phrases_full.index": "Indice",
  "editor.phrases_full.lime": "Tiglio",
  "editor.phrases_full.mold_spores": "Spore di muffa",
  "editor.phrases_full.mugwort": "Artemisia",
  "editor.phrases_full.nettle": "Ortica",
  "editor.phrases_full.nettle_and_pellitory": "Ortica e parietaria",
  "editor.phrases_full.oak": "Quercia",
  "editor.phrases_full.olive": "Olivo",
  "editor.phrases_full.pine": "Pino",
  "editor.phrases_full.plane": "Platano",
  "editor.phrases_full.poaceae": "Graminacee",
  "editor.phrases_full.poplar": "Pioppo",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Segale",
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
  "editor.phrases_short.grass": "Gram.",
  "editor.phrases_short.grass_cat": "Gram.",
  "editor.phrases_short.grasses": "Graminacee",
  "editor.phrases_short.hazel": "Nocc.",
  "editor.phrases_short.index": "Indice",
  "editor.phrases_short.lime": "Tigl.",
  "editor.phrases_short.mold_spores": "Muffa",
  "editor.phrases_short.mugwort": "Art.",
  "editor.phrases_short.nettle": "Ortic",
  "editor.phrases_short.nettle_and_pellitory": "Ortica",
  "editor.phrases_short.oak": "Quer.",
  "editor.phrases_short.olive": "Olivo",
  "editor.phrases_short.pine": "Pino",
  "editor.phrases_short.plane": "Plat.",
  "editor.phrases_short.poaceae": "Gramin",
  "editor.phrases_short.poplar": "Pioppo",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Segale",
  "editor.phrases_short.trees": "Alberi",
  "editor.phrases_short.trees_cat": "Alberi",
  "editor.phrases_short.weeds": "Erbacce",
  "editor.phrases_short.weeds_cat": "Erbacce",
  "editor.phrases_short.willow": "Salice",
  "editor.phrases_translate_all": "Traduci tutto",
  "editor.pollen_threshold": "Soglia:",
  "editor.preset_reset_all": "Ripristina tutte le impostazioni",
  "editor.region_id": "ID Regione",
  "editor.select_all_allergens": "Seleziona tutti gli allergeni",
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
}, fd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _d
}, Symbol.toStringTag, { value: "Module" })), pd = {
  "card.allergen.alder": "Els",
  "card.allergen.allergy_risk": "Allergierisico",
  "card.allergen.ash": "Es",
  "card.allergen.beech": "Beuk",
  "card.allergen.birch": "Berk",
  "card.allergen.chenopod": "Melde",
  "card.allergen.cypress": "Cipres",
  "card.allergen.elm": "Iep",
  "card.allergen.grass": "Gras",
  "card.allergen.grass_cat": "Grassen",
  "card.allergen.hazel": "Hazelaar",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Linde",
  "card.allergen.mold_spores": "Schimmelsporen",
  "card.allergen.mugwort": "Bijvoet",
  "card.allergen.nettle": "Brandnetel",
  "card.allergen.nettle_and_pellitory": "Brandnetel en muur",
  "card.allergen.oak": "Eik",
  "card.allergen.olive": "Olijf",
  "card.allergen.pine": "Dennen",
  "card.allergen.plane": "Plataan",
  "card.allergen.poaceae": "Grassen",
  "card.allergen.poplar": "Populier",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Rogge",
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
  "card.error_no_sensors": "Geen pollensensoren gevonden. Heb je de juiste integratie geïnstalleerd en een regio gekozen in de kaartinstellingen?",
  "card.header_prefix": "Pollenverwachting voor",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Voorspelling wordt geladen...",
  "card.no_allergens": "Geen allergenen",
  "card.no_information": "(Geen informatie)",
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
  "editor.allergens_header_specific": "Individuele allergenen (specifiek)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Gras",
  "editor.phrases_full.grass_cat": "Grassen",
  "editor.phrases_full.hazel": "Hazelaar",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Linde",
  "editor.phrases_full.mold_spores": "Schimmelsporen",
  "editor.phrases_full.mugwort": "Bijvoet",
  "editor.phrases_full.nettle": "Brandnetel",
  "editor.phrases_full.nettle_and_pellitory": "Brandnetel en muur",
  "editor.phrases_full.oak": "Eik",
  "editor.phrases_full.olive": "Olijf",
  "editor.phrases_full.pine": "Den",
  "editor.phrases_full.plane": "Plataan",
  "editor.phrases_full.poaceae": "Grassen",
  "editor.phrases_full.poplar": "Populier",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Rogge",
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
  "editor.phrases_short.grass": "Gras",
  "editor.phrases_short.grass_cat": "Gras",
  "editor.phrases_short.grasses": "Grassen",
  "editor.phrases_short.hazel": "Hazel",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Linde",
  "editor.phrases_short.mold_spores": "Schimmel",
  "editor.phrases_short.mugwort": "Bijvoet",
  "editor.phrases_short.nettle": "Brandn",
  "editor.phrases_short.nettle_and_pellitory": "Netel",
  "editor.phrases_short.oak": "Eik",
  "editor.phrases_short.olive": "Olijf",
  "editor.phrases_short.pine": "Dennen",
  "editor.phrases_short.plane": "Plataan",
  "editor.phrases_short.poaceae": "Gras",
  "editor.phrases_short.poplar": "Popul",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Rogge",
  "editor.phrases_short.trees": "Bomen",
  "editor.phrases_short.trees_cat": "Bomen",
  "editor.phrases_short.weeds": "Onkruid",
  "editor.phrases_short.weeds_cat": "Onkruid",
  "editor.phrases_short.willow": "Wilg",
  "editor.phrases_translate_all": "Alles vertalen",
  "editor.pollen_threshold": "Drempel:",
  "editor.preset_reset_all": "Alle instellingen resetten",
  "editor.region_id": "Regio-ID",
  "editor.select_all_allergens": "Selecteer alle allergenen",
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
}, md = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pd
}, Symbol.toStringTag, { value: "Module" })), vd = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisiko",
  "card.allergen.ash": "Ask",
  "card.allergen.beech": "Bøk",
  "card.allergen.birch": "Bjørk",
  "card.allergen.chenopod": "Melde",
  "card.allergen.cypress": "Sypress",
  "card.allergen.elm": "Alm",
  "card.allergen.grass": "Gress",
  "card.allergen.grass_cat": "Gressarter",
  "card.allergen.hazel": "Hassel",
  "card.allergen.index": "Indeks",
  "card.allergen.lime": "Lind",
  "card.allergen.mold_spores": "Muggsporer",
  "card.allergen.mugwort": "Malurt",
  "card.allergen.nettle": "Brennesle",
  "card.allergen.nettle_and_pellitory": "Brennesle og murgrønn",
  "card.allergen.oak": "Eik",
  "card.allergen.olive": "Oliven",
  "card.allergen.pine": "Furu",
  "card.allergen.plane": "Platan",
  "card.allergen.poaceae": "Gress",
  "card.allergen.poplar": "Poppel",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Rug",
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
  "card.error_no_sensors": "Ingen pollensensor funnet. Har du installert riktig integrasjon og valgt region i kortoppsettet?",
  "card.header_prefix": "Pollenvarsel for",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Laster prognose...",
  "card.no_allergens": "Ingen allergener",
  "card.no_information": "(Ingen informasjon)",
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
  "editor.allergens_header_specific": "Individuelle allergener (spesifikke)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Gress",
  "editor.phrases_full.grass_cat": "Gressarter",
  "editor.phrases_full.hazel": "Hassel",
  "editor.phrases_full.index": "Indeks",
  "editor.phrases_full.lime": "Lind",
  "editor.phrases_full.mold_spores": "Muggsporer",
  "editor.phrases_full.mugwort": "Malurt",
  "editor.phrases_full.nettle": "Brennesle",
  "editor.phrases_full.nettle_and_pellitory": "Brennesle og murgrønn",
  "editor.phrases_full.oak": "Eik",
  "editor.phrases_full.olive": "Oliven",
  "editor.phrases_full.pine": "Furu",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.poaceae": "Gress",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Rug",
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
  "editor.phrases_short.grass": "Gress",
  "editor.phrases_short.grass_cat": "Gress",
  "editor.phrases_short.grasses": "Gress",
  "editor.phrases_short.hazel": "Hassel",
  "editor.phrases_short.index": "Indeks",
  "editor.phrases_short.lime": "Lind",
  "editor.phrases_short.mold_spores": "Mugg",
  "editor.phrases_short.mugwort": "Malurt",
  "editor.phrases_short.nettle": "Brenns",
  "editor.phrases_short.nettle_and_pellitory": "Brennesle",
  "editor.phrases_short.oak": "Eik",
  "editor.phrases_short.olive": "Oliven",
  "editor.phrases_short.pine": "Furu",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.poaceae": "Gress",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Rug",
  "editor.phrases_short.trees": "Trær",
  "editor.phrases_short.trees_cat": "Trær",
  "editor.phrases_short.weeds": "Ugress",
  "editor.phrases_short.weeds_cat": "Ugress",
  "editor.phrases_short.willow": "Selje",
  "editor.phrases_translate_all": "Oversett alt",
  "editor.pollen_threshold": "Terskelverdi:",
  "editor.preset_reset_all": "Tilbakestill alle innstillinger",
  "editor.region_id": "Region-ID",
  "editor.select_all_allergens": "Velg alle allergener",
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
}, yd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vd
}, Symbol.toStringTag, { value: "Module" })), bd = {
  "card.allergen.alder": "Ольха",
  "card.allergen.allergy_risk": "Риск аллергии",
  "card.allergen.ash": "Ясень",
  "card.allergen.beech": "Бук",
  "card.allergen.birch": "Берёза",
  "card.allergen.chenopod": "Марь",
  "card.allergen.cypress": "Кипарис",
  "card.allergen.elm": "Вяз",
  "card.allergen.grass": "Трава",
  "card.allergen.grass_cat": "Злаки",
  "card.allergen.hazel": "Лещина",
  "card.allergen.index": "Индекс",
  "card.allergen.lime": "Липа",
  "card.allergen.mold_spores": "Споры плесени",
  "card.allergen.mugwort": "Полынь",
  "card.allergen.nettle": "Крапива",
  "card.allergen.nettle_and_pellitory": "Крапива и парьетария",
  "card.allergen.oak": "Дуб",
  "card.allergen.olive": "Олива",
  "card.allergen.pine": "Сосна",
  "card.allergen.plane": "Платан",
  "card.allergen.poaceae": "Злаки",
  "card.allergen.poplar": "Тополь",
  "card.allergen.ragweed": "Амброзия",
  "card.allergen.rye": "Рожь",
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
  "card.error_no_sensors": "Датчики пыльцы не найдены. Установлена ли нужная интеграция и выбран ли регион в настройках карточки?",
  "card.header_prefix": "Прогноз пыльцы для",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Загрузка прогноза...",
  "card.no_allergens": "Нет аллергенов",
  "card.no_information": "(Нет информации)",
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
  "editor.allergens_header_specific": "Отдельные аллергены (специфические)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Трава",
  "editor.phrases_full.grass_cat": "Злаки",
  "editor.phrases_full.hazel": "Лещина",
  "editor.phrases_full.index": "Индекс",
  "editor.phrases_full.lime": "Липа",
  "editor.phrases_full.mold_spores": "Споры плесени",
  "editor.phrases_full.mugwort": "Полынь",
  "editor.phrases_full.nettle": "Крапива",
  "editor.phrases_full.nettle_and_pellitory": "Крапива и парьетария",
  "editor.phrases_full.oak": "Дуб",
  "editor.phrases_full.olive": "Олива",
  "editor.phrases_full.pine": "Сосна",
  "editor.phrases_full.plane": "Платан",
  "editor.phrases_full.poaceae": "Злаки",
  "editor.phrases_full.poplar": "Тополь",
  "editor.phrases_full.ragweed": "Амброзия",
  "editor.phrases_full.rye": "Рожь",
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
  "editor.phrases_short.grass": "Трава",
  "editor.phrases_short.grass_cat": "Трава",
  "editor.phrases_short.grasses": "Злаки",
  "editor.phrases_short.hazel": "Лещ.",
  "editor.phrases_short.index": "Индекс",
  "editor.phrases_short.lime": "Липа",
  "editor.phrases_short.mold_spores": "Плесень",
  "editor.phrases_short.mugwort": "Полынь",
  "editor.phrases_short.nettle": "Крапив",
  "editor.phrases_short.nettle_and_pellitory": "Крапива",
  "editor.phrases_short.oak": "Дуб",
  "editor.phrases_short.olive": "Олива",
  "editor.phrases_short.pine": "Сосна",
  "editor.phrases_short.plane": "Платан",
  "editor.phrases_short.poaceae": "Злаки",
  "editor.phrases_short.poplar": "Топол",
  "editor.phrases_short.ragweed": "Амбр.",
  "editor.phrases_short.rye": "Рожь",
  "editor.phrases_short.trees": "Деревья",
  "editor.phrases_short.trees_cat": "Деревья",
  "editor.phrases_short.weeds": "Сорняки",
  "editor.phrases_short.weeds_cat": "Сорняки",
  "editor.phrases_short.willow": "Ива",
  "editor.phrases_translate_all": "Перевести всё",
  "editor.pollen_threshold": "Пороговое значение:",
  "editor.preset_reset_all": "Сбросить все настройки",
  "editor.region_id": "ID региона",
  "editor.select_all_allergens": "Выбрать все аллергены",
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
}, xd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bd
}, Symbol.toStringTag, { value: "Module" })), wd = {
  "card.allergen.alder": "Jelša",
  "card.allergen.allergy_risk": "Riziko alergie",
  "card.allergen.ash": "Jaseň",
  "card.allergen.beech": "Buk",
  "card.allergen.birch": "Breza",
  "card.allergen.chenopod": "Laskavec",
  "card.allergen.cypress": "Cyprus",
  "card.allergen.elm": "Brest",
  "card.allergen.grass": "Tráva",
  "card.allergen.grass_cat": "Trávy",
  "card.allergen.hazel": "Lieska",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Lipa",
  "card.allergen.mold_spores": "Spóry plesní",
  "card.allergen.mugwort": "Palina",
  "card.allergen.nettle": "Žihľava",
  "card.allergen.nettle_and_pellitory": "Žihľava a parietária",
  "card.allergen.oak": "Dub",
  "card.allergen.olive": "Olivovník",
  "card.allergen.pine": "Borovica",
  "card.allergen.plane": "Platan",
  "card.allergen.poaceae": "Trávy",
  "card.allergen.poplar": "Topoľ",
  "card.allergen.ragweed": "Ambrozia",
  "card.allergen.rye": "Raž",
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
  "card.error_no_sensors": "Žiadne peľové senzory nenájdené. Je nainštalovaná správna integrácia a zvolený región v nastavení karty?",
  "card.header_prefix": "Peľová predpoveď pre",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Načítava sa predpoveď...",
  "card.no_allergens": "Žiadne alergény",
  "card.no_information": "(Žiadne informácie)",
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
  "editor.allergens_header_specific": "Jednotlivé alergény (špecifické)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Tráva",
  "editor.phrases_full.grass_cat": "Trávy",
  "editor.phrases_full.hazel": "Lieska",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Lipa",
  "editor.phrases_full.mold_spores": "Spóry plesní",
  "editor.phrases_full.mugwort": "Palina",
  "editor.phrases_full.nettle": "Žihľava",
  "editor.phrases_full.nettle_and_pellitory": "Žihľava a parietária",
  "editor.phrases_full.oak": "Dub",
  "editor.phrases_full.olive": "Olivovník",
  "editor.phrases_full.pine": "Borovica",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.poaceae": "Trávy",
  "editor.phrases_full.poplar": "Topoľ",
  "editor.phrases_full.ragweed": "Ambrozia",
  "editor.phrases_full.rye": "Raž",
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
  "editor.phrases_short.grass": "Tráva",
  "editor.phrases_short.grass_cat": "Tráva",
  "editor.phrases_short.grasses": "Trávy",
  "editor.phrases_short.hazel": "Lieska",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Lipa",
  "editor.phrases_short.mold_spores": "Plesne",
  "editor.phrases_short.mugwort": "Palina",
  "editor.phrases_short.nettle": "Žihľav",
  "editor.phrases_short.nettle_and_pellitory": "Žihľava",
  "editor.phrases_short.oak": "Dub",
  "editor.phrases_short.olive": "Oliv.",
  "editor.phrases_short.pine": "Borovi",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.poaceae": "Trávy",
  "editor.phrases_short.poplar": "Topoľ",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Raž",
  "editor.phrases_short.trees": "Stromy",
  "editor.phrases_short.trees_cat": "Stromy",
  "editor.phrases_short.weeds": "Buriny",
  "editor.phrases_short.weeds_cat": "Buriny",
  "editor.phrases_short.willow": "Vŕba",
  "editor.phrases_translate_all": "Preložiť všetko",
  "editor.pollen_threshold": "Prah:",
  "editor.preset_reset_all": "Obnoviť všetky nastavenia",
  "editor.region_id": "ID regiónu",
  "editor.select_all_allergens": "Vybrať všetky alergény",
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
}, kd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wd
}, Symbol.toStringTag, { value: "Module" })), Sd = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisk",
  "card.allergen.ash": "Asp",
  "card.allergen.beech": "Bok",
  "card.allergen.birch": "Björk",
  "card.allergen.chenopod": "Svinmålla",
  "card.allergen.cypress": "Cypress",
  "card.allergen.elm": "Alm",
  "card.allergen.grass": "Gräs",
  "card.allergen.grass_cat": "Gräsarter",
  "card.allergen.hazel": "Hassel",
  "card.allergen.index": "Index",
  "card.allergen.lime": "Lind",
  "card.allergen.mold_spores": "Mögelsporer",
  "card.allergen.mugwort": "Gråbo",
  "card.allergen.nettle": "Brännässla",
  "card.allergen.nettle_and_pellitory": "Nässla & parietaria",
  "card.allergen.oak": "Ek",
  "card.allergen.olive": "Oliv",
  "card.allergen.pine": "Tall",
  "card.allergen.plane": "Platan",
  "card.allergen.poaceae": "Gräs",
  "card.allergen.poplar": "Poppel",
  "card.allergen.ragweed": "Malörtsambrosia",
  "card.allergen.rye": "Råg",
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
  "card.error_no_sensors": "Inga pollen-sensorer hittades. Har du installerat rätt integration och valt region i kortets konfiguration?",
  "card.header_prefix": "Pollenprognos för",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.peu": "Polleninformation EU",
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
  "card.loading_forecast": "Laddar prognos...",
  "card.no_allergens": "Inga allergener",
  "card.no_information": "(Ingen information)",
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
  "editor.allergens_header_specific": "Individuella allergener (specifika)",
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
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.peu": "Polleninformation EU",
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
  "editor.phrases_full.grass": "Gräs",
  "editor.phrases_full.grass_cat": "Gräsarter",
  "editor.phrases_full.hazel": "Hassel",
  "editor.phrases_full.index": "Index",
  "editor.phrases_full.lime": "Lind",
  "editor.phrases_full.mold_spores": "Mögelsporer",
  "editor.phrases_full.mugwort": "Gråbo",
  "editor.phrases_full.nettle": "Brännässla",
  "editor.phrases_full.nettle_and_pellitory": "Nässla & parietaria",
  "editor.phrases_full.oak": "Ek",
  "editor.phrases_full.olive": "Oliv",
  "editor.phrases_full.pine": "Tall",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.poaceae": "Gräs",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.ragweed": "Malörtsambrosia",
  "editor.phrases_full.rye": "Råg",
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
  "editor.phrases_short.grass": "Gräs",
  "editor.phrases_short.grass_cat": "Gräs",
  "editor.phrases_short.grasses": "Gräs",
  "editor.phrases_short.hazel": "Hass",
  "editor.phrases_short.index": "Index",
  "editor.phrases_short.lime": "Lind",
  "editor.phrases_short.mold_spores": "Mögel",
  "editor.phrases_short.mugwort": "Gråbo",
  "editor.phrases_short.nettle": "Bränns",
  "editor.phrases_short.nettle_and_pellitory": "Nässla",
  "editor.phrases_short.oak": "Ek",
  "editor.phrases_short.olive": "Oliv",
  "editor.phrases_short.pine": "Tall",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.poaceae": "Gräs",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.ragweed": "Ambro",
  "editor.phrases_short.rye": "Råg",
  "editor.phrases_short.trees": "Träd",
  "editor.phrases_short.trees_cat": "Träd",
  "editor.phrases_short.weeds": "Ogräs",
  "editor.phrases_short.weeds_cat": "Ogräs",
  "editor.phrases_short.willow": "Vide",
  "editor.phrases_translate_all": "Översätt allt",
  "editor.pollen_threshold": "Tröskelvärde:",
  "editor.preset_reset_all": "Återställ allt",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Välj alla allergener",
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
}, Ad = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Sd
}, Symbol.toStringTag, { value: "Module" }));
var Xs = function(t, e) {
  return Xs = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, s) {
    i.__proto__ = s;
  } || function(i, s) {
    for (var r in s) Object.prototype.hasOwnProperty.call(s, r) && (i[r] = s[r]);
  }, Xs(t, e);
};
function os(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Xs(t, e);
  function i() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (i.prototype = e.prototype, new i());
}
var Q = function() {
  return Q = Object.assign || function(e) {
    for (var i, s = 1, r = arguments.length; s < r; s++) {
      i = arguments[s];
      for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
    }
    return e;
  }, Q.apply(this, arguments);
};
function Ed(t, e) {
  var i = {};
  for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (i[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, s = Object.getOwnPropertySymbols(t); r < s.length; r++)
      e.indexOf(s[r]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[r]) && (i[s[r]] = t[s[r]]);
  return i;
}
function ks(t, e, i) {
  if (i || arguments.length === 2) for (var s = 0, r = e.length, n; s < r; s++)
    (n || !(s in e)) && (n || (n = Array.prototype.slice.call(e, 0, s)), n[s] = e[s]);
  return t.concat(n || Array.prototype.slice.call(e));
}
function Ss(t, e) {
  var i = e && e.cache ? e.cache : Dd, s = e && e.serializer ? e.serializer : Td, r = e && e.strategy ? e.strategy : Md;
  return r(t, {
    cache: i,
    serializer: s
  });
}
function Cd(t) {
  return t == null || typeof t == "number" || typeof t == "boolean";
}
function Pd(t, e, i, s) {
  var r = Cd(s) ? s : i(s), n = e.get(r);
  return typeof n > "u" && (n = t.call(this, s), e.set(r, n)), n;
}
function Uo(t, e, i) {
  var s = Array.prototype.slice.call(arguments, 3), r = i(s), n = e.get(r);
  return typeof n > "u" && (n = t.apply(this, s), e.set(r, n)), n;
}
function Vo(t, e, i, s, r) {
  return i.bind(e, t, s, r);
}
function Md(t, e) {
  var i = t.length === 1 ? Pd : Uo;
  return Vo(t, this, i, e.cache.create(), e.serializer);
}
function $d(t, e) {
  return Vo(t, this, Uo, e.cache.create(), e.serializer);
}
var Td = function() {
  return JSON.stringify(arguments);
}, Ld = (
  /** @class */
  (function() {
    function t() {
      this.cache = /* @__PURE__ */ Object.create(null);
    }
    return t.prototype.get = function(e) {
      return this.cache[e];
    }, t.prototype.set = function(e, i) {
      this.cache[e] = i;
    }, t;
  })()
), Dd = {
  create: function() {
    return new Ld();
  }
}, As = {
  variadic: $d
}, q;
(function(t) {
  t[t.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", t[t.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", t[t.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", t[t.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", t[t.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", t[t.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", t[t.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", t[t.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", t[t.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", t[t.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", t[t.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", t[t.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", t[t.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", t[t.INVALID_TAG = 23] = "INVALID_TAG", t[t.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", t[t.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", t[t.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(q || (q = {}));
var ne;
(function(t) {
  t[t.literal = 0] = "literal", t[t.argument = 1] = "argument", t[t.number = 2] = "number", t[t.date = 3] = "date", t[t.time = 4] = "time", t[t.select = 5] = "select", t[t.plural = 6] = "plural", t[t.pound = 7] = "pound", t[t.tag = 8] = "tag";
})(ne || (ne = {}));
var Tt;
(function(t) {
  t[t.number = 0] = "number", t[t.dateTime = 1] = "dateTime";
})(Tt || (Tt = {}));
function Qr(t) {
  return t.type === ne.literal;
}
function zd(t) {
  return t.type === ne.argument;
}
function Wo(t) {
  return t.type === ne.number;
}
function Ko(t) {
  return t.type === ne.date;
}
function Yo(t) {
  return t.type === ne.time;
}
function Xo(t) {
  return t.type === ne.select;
}
function qo(t) {
  return t.type === ne.plural;
}
function Od(t) {
  return t.type === ne.pound;
}
function Zo(t) {
  return t.type === ne.tag;
}
function Jo(t) {
  return !!(t && typeof t == "object" && t.type === Tt.number);
}
function qs(t) {
  return !!(t && typeof t == "object" && t.type === Tt.dateTime);
}
var Qo = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, Rd = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function Id(t) {
  var e = {};
  return t.replace(Rd, function(i) {
    var s = i.length;
    switch (i[0]) {
      // Era
      case "G":
        e.era = s === 4 ? "long" : s === 5 ? "narrow" : "short";
        break;
      // Year
      case "y":
        e.year = s === 2 ? "2-digit" : "numeric";
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
        e.month = ["numeric", "2-digit", "short", "long", "narrow"][s - 1];
        break;
      // Week
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        e.day = ["numeric", "2-digit"][s - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      // Weekday
      case "E":
        e.weekday = s === 4 ? "long" : s === 5 ? "narrow" : "short";
        break;
      case "e":
        if (s < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][s - 4];
        break;
      case "c":
        if (s < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][s - 4];
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
        e.hourCycle = "h12", e.hour = ["numeric", "2-digit"][s - 1];
        break;
      case "H":
        e.hourCycle = "h23", e.hour = ["numeric", "2-digit"][s - 1];
        break;
      case "K":
        e.hourCycle = "h11", e.hour = ["numeric", "2-digit"][s - 1];
        break;
      case "k":
        e.hourCycle = "h24", e.hour = ["numeric", "2-digit"][s - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      // Minute
      case "m":
        e.minute = ["numeric", "2-digit"][s - 1];
        break;
      // Second
      case "s":
        e.second = ["numeric", "2-digit"][s - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      // Zone
      case "z":
        e.timeZoneName = s < 4 ? "short" : "long";
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
var Nd = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function Bd(t) {
  if (t.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var e = t.split(Nd).filter(function(u) {
    return u.length > 0;
  }), i = [], s = 0, r = e; s < r.length; s++) {
    var n = r[s], a = n.split("/");
    if (a.length === 0)
      throw new Error("Invalid number skeleton");
    for (var o = a[0], l = a.slice(1), d = 0, c = l; d < c.length; d++) {
      var h = c[d];
      if (h.length === 0)
        throw new Error("Invalid number skeleton");
    }
    i.push({ stem: o, options: l });
  }
  return i;
}
function Hd(t) {
  return t.replace(/^(.*?)-/, "");
}
var en = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, ea = /^(@+)?(\+|#+)?[rs]?$/g, Fd = /(\*)(0+)|(#+)(0+)|(0+)/g, ta = /^(0+)$/;
function tn(t) {
  var e = {};
  return t[t.length - 1] === "r" ? e.roundingPriority = "morePrecision" : t[t.length - 1] === "s" && (e.roundingPriority = "lessPrecision"), t.replace(ea, function(i, s, r) {
    return typeof r != "string" ? (e.minimumSignificantDigits = s.length, e.maximumSignificantDigits = s.length) : r === "+" ? e.minimumSignificantDigits = s.length : s[0] === "#" ? e.maximumSignificantDigits = s.length : (e.minimumSignificantDigits = s.length, e.maximumSignificantDigits = s.length + (typeof r == "string" ? r.length : 0)), "";
  }), e;
}
function ia(t) {
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
function Gd(t) {
  var e;
  if (t[0] === "E" && t[1] === "E" ? (e = {
    notation: "engineering"
  }, t = t.slice(2)) : t[0] === "E" && (e = {
    notation: "scientific"
  }, t = t.slice(1)), e) {
    var i = t.slice(0, 2);
    if (i === "+!" ? (e.signDisplay = "always", t = t.slice(2)) : i === "+?" && (e.signDisplay = "exceptZero", t = t.slice(2)), !ta.test(t))
      throw new Error("Malformed concise eng/scientific notation");
    e.minimumIntegerDigits = t.length;
  }
  return e;
}
function sn(t) {
  var e = {}, i = ia(t);
  return i || e;
}
function jd(t) {
  for (var e = {}, i = 0, s = t; i < s.length; i++) {
    var r = s[i];
    switch (r.stem) {
      case "percent":
      case "%":
        e.style = "percent";
        continue;
      case "%x100":
        e.style = "percent", e.scale = 100;
        continue;
      case "currency":
        e.style = "currency", e.currency = r.options[0];
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
        e.style = "unit", e.unit = Hd(r.options[0]);
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
        e = Q(Q(Q({}, e), { notation: "scientific" }), r.options.reduce(function(l, d) {
          return Q(Q({}, l), sn(d));
        }, {}));
        continue;
      case "engineering":
        e = Q(Q(Q({}, e), { notation: "engineering" }), r.options.reduce(function(l, d) {
          return Q(Q({}, l), sn(d));
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
        e.scale = parseFloat(r.options[0]);
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
        if (r.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        r.options[0].replace(Fd, function(l, d, c, h, u, g) {
          if (d)
            e.minimumIntegerDigits = c.length;
          else {
            if (h && u)
              throw new Error("We currently do not support maximum integer digits");
            if (g)
              throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (ta.test(r.stem)) {
      e.minimumIntegerDigits = r.stem.length;
      continue;
    }
    if (en.test(r.stem)) {
      if (r.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      r.stem.replace(en, function(l, d, c, h, u, g) {
        return c === "*" ? e.minimumFractionDigits = d.length : h && h[0] === "#" ? e.maximumFractionDigits = h.length : u && g ? (e.minimumFractionDigits = u.length, e.maximumFractionDigits = u.length + g.length) : (e.minimumFractionDigits = d.length, e.maximumFractionDigits = d.length), "";
      });
      var n = r.options[0];
      n === "w" ? e = Q(Q({}, e), { trailingZeroDisplay: "stripIfInteger" }) : n && (e = Q(Q({}, e), tn(n)));
      continue;
    }
    if (ea.test(r.stem)) {
      e = Q(Q({}, e), tn(r.stem));
      continue;
    }
    var a = ia(r.stem);
    a && (e = Q(Q({}, e), a));
    var o = Gd(r.stem);
    o && (e = Q(Q({}, e), o));
  }
  return e;
}
var yi = {
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
function Ud(t, e) {
  for (var i = "", s = 0; s < t.length; s++) {
    var r = t.charAt(s);
    if (r === "j") {
      for (var n = 0; s + 1 < t.length && t.charAt(s + 1) === r; )
        n++, s++;
      var a = 1 + (n & 1), o = n < 2 ? 1 : 3 + (n >> 1), l = "a", d = Vd(e);
      for ((d == "H" || d == "k") && (o = 0); o-- > 0; )
        i += l;
      for (; a-- > 0; )
        i = d + i;
    } else r === "J" ? i += "H" : i += r;
  }
  return i;
}
function Vd(t) {
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
  var i = t.language, s;
  i !== "root" && (s = t.maximize().region);
  var r = yi[s || ""] || yi[i || ""] || yi["".concat(i, "-001")] || yi["001"];
  return r[0];
}
var Es, Wd = new RegExp("^".concat(Qo.source, "*")), Kd = new RegExp("".concat(Qo.source, "*$"));
function J(t, e) {
  return { start: t, end: e };
}
var Yd = !!String.prototype.startsWith && "_a".startsWith("a", 1), Xd = !!String.fromCodePoint, qd = !!Object.fromEntries, Zd = !!String.prototype.codePointAt, Jd = !!String.prototype.trimStart, Qd = !!String.prototype.trimEnd, ec = !!Number.isSafeInteger, tc = ec ? Number.isSafeInteger : function(t) {
  return typeof t == "number" && isFinite(t) && Math.floor(t) === t && Math.abs(t) <= 9007199254740991;
}, Zs = !0;
try {
  var ic = ra("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  Zs = ((Es = ic.exec("a")) === null || Es === void 0 ? void 0 : Es[0]) === "a";
} catch {
  Zs = !1;
}
var rn = Yd ? (
  // Native
  function(e, i, s) {
    return e.startsWith(i, s);
  }
) : (
  // For IE11
  function(e, i, s) {
    return e.slice(s, s + i.length) === i;
  }
), Js = Xd ? String.fromCodePoint : (
  // IE11
  function() {
    for (var e = [], i = 0; i < arguments.length; i++)
      e[i] = arguments[i];
    for (var s = "", r = e.length, n = 0, a; r > n; ) {
      if (a = e[n++], a > 1114111)
        throw RangeError(a + " is not a valid code point");
      s += a < 65536 ? String.fromCharCode(a) : String.fromCharCode(((a -= 65536) >> 10) + 55296, a % 1024 + 56320);
    }
    return s;
  }
), nn = (
  // native
  qd ? Object.fromEntries : (
    // Ponyfill
    function(e) {
      for (var i = {}, s = 0, r = e; s < r.length; s++) {
        var n = r[s], a = n[0], o = n[1];
        i[a] = o;
      }
      return i;
    }
  )
), sa = Zd ? (
  // Native
  function(e, i) {
    return e.codePointAt(i);
  }
) : (
  // IE 11
  function(e, i) {
    var s = e.length;
    if (!(i < 0 || i >= s)) {
      var r = e.charCodeAt(i), n;
      return r < 55296 || r > 56319 || i + 1 === s || (n = e.charCodeAt(i + 1)) < 56320 || n > 57343 ? r : (r - 55296 << 10) + (n - 56320) + 65536;
    }
  }
), sc = Jd ? (
  // Native
  function(e) {
    return e.trimStart();
  }
) : (
  // Ponyfill
  function(e) {
    return e.replace(Wd, "");
  }
), rc = Qd ? (
  // Native
  function(e) {
    return e.trimEnd();
  }
) : (
  // Ponyfill
  function(e) {
    return e.replace(Kd, "");
  }
);
function ra(t, e) {
  return new RegExp(t, e);
}
var Qs;
if (Zs) {
  var on = ra("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  Qs = function(e, i) {
    var s;
    on.lastIndex = i;
    var r = on.exec(e);
    return (s = r[1]) !== null && s !== void 0 ? s : "";
  };
} else
  Qs = function(e, i) {
    for (var s = []; ; ) {
      var r = sa(e, i);
      if (r === void 0 || na(r) || lc(r))
        break;
      s.push(r), i += r >= 65536 ? 2 : 1;
    }
    return Js.apply(void 0, s);
  };
var nc = (
  /** @class */
  (function() {
    function t(e, i) {
      i === void 0 && (i = {}), this.message = e, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!i.ignoreTag, this.locale = i.locale, this.requiresOtherClause = !!i.requiresOtherClause, this.shouldParseSkeletons = !!i.shouldParseSkeletons;
    }
    return t.prototype.parse = function() {
      if (this.offset() !== 0)
        throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, t.prototype.parseMessage = function(e, i, s) {
      for (var r = []; !this.isEOF(); ) {
        var n = this.char();
        if (n === 123) {
          var a = this.parseArgument(e, s);
          if (a.err)
            return a;
          r.push(a.val);
        } else {
          if (n === 125 && e > 0)
            break;
          if (n === 35 && (i === "plural" || i === "selectordinal")) {
            var o = this.clonePosition();
            this.bump(), r.push({
              type: ne.pound,
              location: J(o, this.clonePosition())
            });
          } else if (n === 60 && !this.ignoreTag && this.peek() === 47) {
            if (s)
              break;
            return this.error(q.UNMATCHED_CLOSING_TAG, J(this.clonePosition(), this.clonePosition()));
          } else if (n === 60 && !this.ignoreTag && er(this.peek() || 0)) {
            var a = this.parseTag(e, i);
            if (a.err)
              return a;
            r.push(a.val);
          } else {
            var a = this.parseLiteral(e, i);
            if (a.err)
              return a;
            r.push(a.val);
          }
        }
      }
      return { val: r, err: null };
    }, t.prototype.parseTag = function(e, i) {
      var s = this.clonePosition();
      this.bump();
      var r = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>"))
        return {
          val: {
            type: ne.literal,
            value: "<".concat(r, "/>"),
            location: J(s, this.clonePosition())
          },
          err: null
        };
      if (this.bumpIf(">")) {
        var n = this.parseMessage(e + 1, i, !0);
        if (n.err)
          return n;
        var a = n.val, o = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !er(this.char()))
            return this.error(q.INVALID_TAG, J(o, this.clonePosition()));
          var l = this.clonePosition(), d = this.parseTagName();
          return r !== d ? this.error(q.UNMATCHED_CLOSING_TAG, J(l, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: ne.tag,
              value: r,
              children: a,
              location: J(s, this.clonePosition())
            },
            err: null
          } : this.error(q.INVALID_TAG, J(o, this.clonePosition())));
        } else
          return this.error(q.UNCLOSED_TAG, J(s, this.clonePosition()));
      } else
        return this.error(q.INVALID_TAG, J(s, this.clonePosition()));
    }, t.prototype.parseTagName = function() {
      var e = this.offset();
      for (this.bump(); !this.isEOF() && ac(this.char()); )
        this.bump();
      return this.message.slice(e, this.offset());
    }, t.prototype.parseLiteral = function(e, i) {
      for (var s = this.clonePosition(), r = ""; ; ) {
        var n = this.tryParseQuote(i);
        if (n) {
          r += n;
          continue;
        }
        var a = this.tryParseUnquoted(e, i);
        if (a) {
          r += a;
          continue;
        }
        var o = this.tryParseLeftAngleBracket();
        if (o) {
          r += o;
          continue;
        }
        break;
      }
      var l = J(s, this.clonePosition());
      return {
        val: { type: ne.literal, value: r, location: l },
        err: null
      };
    }, t.prototype.tryParseLeftAngleBracket = function() {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !oc(this.peek() || 0)) ? (this.bump(), "<") : null;
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
      var i = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var s = this.char();
        if (s === 39)
          if (this.peek() === 39)
            i.push(39), this.bump();
          else {
            this.bump();
            break;
          }
        else
          i.push(s);
        this.bump();
      }
      return Js.apply(void 0, i);
    }, t.prototype.tryParseUnquoted = function(e, i) {
      if (this.isEOF())
        return null;
      var s = this.char();
      return s === 60 || s === 123 || s === 35 && (i === "plural" || i === "selectordinal") || s === 125 && e > 0 ? null : (this.bump(), Js(s));
    }, t.prototype.parseArgument = function(e, i) {
      var s = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF())
        return this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, J(s, this.clonePosition()));
      if (this.char() === 125)
        return this.bump(), this.error(q.EMPTY_ARGUMENT, J(s, this.clonePosition()));
      var r = this.parseIdentifierIfPossible().value;
      if (!r)
        return this.error(q.MALFORMED_ARGUMENT, J(s, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF())
        return this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, J(s, this.clonePosition()));
      switch (this.char()) {
        // Simple argument: `{name}`
        case 125:
          return this.bump(), {
            val: {
              type: ne.argument,
              // value does not include the opening and closing braces.
              value: r,
              location: J(s, this.clonePosition())
            },
            err: null
          };
        // Argument with options: `{name, format, ...}`
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, J(s, this.clonePosition())) : this.parseArgumentOptions(e, i, r, s);
        default:
          return this.error(q.MALFORMED_ARGUMENT, J(s, this.clonePosition()));
      }
    }, t.prototype.parseIdentifierIfPossible = function() {
      var e = this.clonePosition(), i = this.offset(), s = Qs(this.message, i), r = i + s.length;
      this.bumpTo(r);
      var n = this.clonePosition(), a = J(e, n);
      return { value: s, location: a };
    }, t.prototype.parseArgumentOptions = function(e, i, s, r) {
      var n, a = this.clonePosition(), o = this.parseIdentifierIfPossible().value, l = this.clonePosition();
      switch (o) {
        case "":
          return this.error(q.EXPECT_ARGUMENT_TYPE, J(a, l));
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
            var u = rc(h.val);
            if (u.length === 0)
              return this.error(q.EXPECT_ARGUMENT_STYLE, J(this.clonePosition(), this.clonePosition()));
            var g = J(c, this.clonePosition());
            d = { style: u, styleLocation: g };
          }
          var _ = this.tryParseArgumentClose(r);
          if (_.err)
            return _;
          var f = J(r, this.clonePosition());
          if (d && rn(d == null ? void 0 : d.style, "::", 0)) {
            var p = sc(d.style.slice(2));
            if (o === "number") {
              var h = this.parseNumberSkeletonFromString(p, d.styleLocation);
              return h.err ? h : {
                val: { type: ne.number, value: s, location: f, style: h.val },
                err: null
              };
            } else {
              if (p.length === 0)
                return this.error(q.EXPECT_DATE_TIME_SKELETON, f);
              var m = p;
              this.locale && (m = Ud(p, this.locale));
              var u = {
                type: Tt.dateTime,
                pattern: m,
                location: d.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? Id(m) : {}
              }, v = o === "date" ? ne.date : ne.time;
              return {
                val: { type: v, value: s, location: f, style: u },
                err: null
              };
            }
          }
          return {
            val: {
              type: o === "number" ? ne.number : o === "date" ? ne.date : ne.time,
              value: s,
              location: f,
              style: (n = d == null ? void 0 : d.style) !== null && n !== void 0 ? n : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var E = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(","))
            return this.error(q.EXPECT_SELECT_ARGUMENT_OPTIONS, J(E, Q({}, E)));
          this.bumpSpace();
          var C = this.parseIdentifierIfPossible(), x = 0;
          if (o !== "select" && C.value === "offset") {
            if (!this.bumpIf(":"))
              return this.error(q.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, J(this.clonePosition(), this.clonePosition()));
            this.bumpSpace();
            var h = this.tryParseDecimalInteger(q.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, q.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (h.err)
              return h;
            this.bumpSpace(), C = this.parseIdentifierIfPossible(), x = h.val;
          }
          var k = this.tryParsePluralOrSelectOptions(e, o, i, C);
          if (k.err)
            return k;
          var _ = this.tryParseArgumentClose(r);
          if (_.err)
            return _;
          var w = J(r, this.clonePosition());
          return o === "select" ? {
            val: {
              type: ne.select,
              value: s,
              options: nn(k.val),
              location: w
            },
            err: null
          } : {
            val: {
              type: ne.plural,
              value: s,
              options: nn(k.val),
              offset: x,
              pluralType: o === "plural" ? "cardinal" : "ordinal",
              location: w
            },
            err: null
          };
        }
        default:
          return this.error(q.INVALID_ARGUMENT_TYPE, J(a, l));
      }
    }, t.prototype.tryParseArgumentClose = function(e) {
      return this.isEOF() || this.char() !== 125 ? this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, J(e, this.clonePosition())) : (this.bump(), { val: !0, err: null });
    }, t.prototype.parseSimpleArgStyleIfPossible = function() {
      for (var e = 0, i = this.clonePosition(); !this.isEOF(); ) {
        var s = this.char();
        switch (s) {
          case 39: {
            this.bump();
            var r = this.clonePosition();
            if (!this.bumpUntil("'"))
              return this.error(q.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, J(r, this.clonePosition()));
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
                val: this.message.slice(i.offset, this.offset()),
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
        val: this.message.slice(i.offset, this.offset()),
        err: null
      };
    }, t.prototype.parseNumberSkeletonFromString = function(e, i) {
      var s = [];
      try {
        s = Bd(e);
      } catch {
        return this.error(q.INVALID_NUMBER_SKELETON, i);
      }
      return {
        val: {
          type: Tt.number,
          tokens: s,
          location: i,
          parsedOptions: this.shouldParseSkeletons ? jd(s) : {}
        },
        err: null
      };
    }, t.prototype.tryParsePluralOrSelectOptions = function(e, i, s, r) {
      for (var n, a = !1, o = [], l = /* @__PURE__ */ new Set(), d = r.value, c = r.location; ; ) {
        if (d.length === 0) {
          var h = this.clonePosition();
          if (i !== "select" && this.bumpIf("=")) {
            var u = this.tryParseDecimalInteger(q.EXPECT_PLURAL_ARGUMENT_SELECTOR, q.INVALID_PLURAL_ARGUMENT_SELECTOR);
            if (u.err)
              return u;
            c = J(h, this.clonePosition()), d = this.message.slice(h.offset, this.offset());
          } else
            break;
        }
        if (l.has(d))
          return this.error(i === "select" ? q.DUPLICATE_SELECT_ARGUMENT_SELECTOR : q.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, c);
        d === "other" && (a = !0), this.bumpSpace();
        var g = this.clonePosition();
        if (!this.bumpIf("{"))
          return this.error(i === "select" ? q.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : q.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, J(this.clonePosition(), this.clonePosition()));
        var _ = this.parseMessage(e + 1, i, s);
        if (_.err)
          return _;
        var f = this.tryParseArgumentClose(g);
        if (f.err)
          return f;
        o.push([
          d,
          {
            value: _.val,
            location: J(g, this.clonePosition())
          }
        ]), l.add(d), this.bumpSpace(), n = this.parseIdentifierIfPossible(), d = n.value, c = n.location;
      }
      return o.length === 0 ? this.error(i === "select" ? q.EXPECT_SELECT_ARGUMENT_SELECTOR : q.EXPECT_PLURAL_ARGUMENT_SELECTOR, J(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !a ? this.error(q.MISSING_OTHER_CLAUSE, J(this.clonePosition(), this.clonePosition())) : { val: o, err: null };
    }, t.prototype.tryParseDecimalInteger = function(e, i) {
      var s = 1, r = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (s = -1);
      for (var n = !1, a = 0; !this.isEOF(); ) {
        var o = this.char();
        if (o >= 48 && o <= 57)
          n = !0, a = a * 10 + (o - 48), this.bump();
        else
          break;
      }
      var l = J(r, this.clonePosition());
      return n ? (a *= s, tc(a) ? { val: a, err: null } : this.error(i, l)) : this.error(e, l);
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
      var i = sa(this.message, e);
      if (i === void 0)
        throw Error("Offset ".concat(e, " is at invalid UTF-16 code unit boundary"));
      return i;
    }, t.prototype.error = function(e, i) {
      return {
        val: null,
        err: {
          kind: e,
          message: this.message,
          location: i
        }
      };
    }, t.prototype.bump = function() {
      if (!this.isEOF()) {
        var e = this.char();
        e === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e < 65536 ? 1 : 2);
      }
    }, t.prototype.bumpIf = function(e) {
      if (rn(this.message, e, this.offset())) {
        for (var i = 0; i < e.length; i++)
          this.bump();
        return !0;
      }
      return !1;
    }, t.prototype.bumpUntil = function(e) {
      var i = this.offset(), s = this.message.indexOf(e, i);
      return s >= 0 ? (this.bumpTo(s), !0) : (this.bumpTo(this.message.length), !1);
    }, t.prototype.bumpTo = function(e) {
      if (this.offset() > e)
        throw Error("targetOffset ".concat(e, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (e = Math.min(e, this.message.length); ; ) {
        var i = this.offset();
        if (i === e)
          break;
        if (i > e)
          throw Error("targetOffset ".concat(e, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF())
          break;
      }
    }, t.prototype.bumpSpace = function() {
      for (; !this.isEOF() && na(this.char()); )
        this.bump();
    }, t.prototype.peek = function() {
      if (this.isEOF())
        return null;
      var e = this.char(), i = this.offset(), s = this.message.charCodeAt(i + (e >= 65536 ? 2 : 1));
      return s ?? null;
    }, t;
  })()
);
function er(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function oc(t) {
  return er(t) || t === 47;
}
function ac(t) {
  return t === 45 || t === 46 || t >= 48 && t <= 57 || t === 95 || t >= 97 && t <= 122 || t >= 65 && t <= 90 || t == 183 || t >= 192 && t <= 214 || t >= 216 && t <= 246 || t >= 248 && t <= 893 || t >= 895 && t <= 8191 || t >= 8204 && t <= 8205 || t >= 8255 && t <= 8256 || t >= 8304 && t <= 8591 || t >= 11264 && t <= 12271 || t >= 12289 && t <= 55295 || t >= 63744 && t <= 64975 || t >= 65008 && t <= 65533 || t >= 65536 && t <= 983039;
}
function na(t) {
  return t >= 9 && t <= 13 || t === 32 || t === 133 || t >= 8206 && t <= 8207 || t === 8232 || t === 8233;
}
function lc(t) {
  return t >= 33 && t <= 35 || t === 36 || t >= 37 && t <= 39 || t === 40 || t === 41 || t === 42 || t === 43 || t === 44 || t === 45 || t >= 46 && t <= 47 || t >= 58 && t <= 59 || t >= 60 && t <= 62 || t >= 63 && t <= 64 || t === 91 || t === 92 || t === 93 || t === 94 || t === 96 || t === 123 || t === 124 || t === 125 || t === 126 || t === 161 || t >= 162 && t <= 165 || t === 166 || t === 167 || t === 169 || t === 171 || t === 172 || t === 174 || t === 176 || t === 177 || t === 182 || t === 187 || t === 191 || t === 215 || t === 247 || t >= 8208 && t <= 8213 || t >= 8214 && t <= 8215 || t === 8216 || t === 8217 || t === 8218 || t >= 8219 && t <= 8220 || t === 8221 || t === 8222 || t === 8223 || t >= 8224 && t <= 8231 || t >= 8240 && t <= 8248 || t === 8249 || t === 8250 || t >= 8251 && t <= 8254 || t >= 8257 && t <= 8259 || t === 8260 || t === 8261 || t === 8262 || t >= 8263 && t <= 8273 || t === 8274 || t === 8275 || t >= 8277 && t <= 8286 || t >= 8592 && t <= 8596 || t >= 8597 && t <= 8601 || t >= 8602 && t <= 8603 || t >= 8604 && t <= 8607 || t === 8608 || t >= 8609 && t <= 8610 || t === 8611 || t >= 8612 && t <= 8613 || t === 8614 || t >= 8615 && t <= 8621 || t === 8622 || t >= 8623 && t <= 8653 || t >= 8654 && t <= 8655 || t >= 8656 && t <= 8657 || t === 8658 || t === 8659 || t === 8660 || t >= 8661 && t <= 8691 || t >= 8692 && t <= 8959 || t >= 8960 && t <= 8967 || t === 8968 || t === 8969 || t === 8970 || t === 8971 || t >= 8972 && t <= 8991 || t >= 8992 && t <= 8993 || t >= 8994 && t <= 9e3 || t === 9001 || t === 9002 || t >= 9003 && t <= 9083 || t === 9084 || t >= 9085 && t <= 9114 || t >= 9115 && t <= 9139 || t >= 9140 && t <= 9179 || t >= 9180 && t <= 9185 || t >= 9186 && t <= 9254 || t >= 9255 && t <= 9279 || t >= 9280 && t <= 9290 || t >= 9291 && t <= 9311 || t >= 9472 && t <= 9654 || t === 9655 || t >= 9656 && t <= 9664 || t === 9665 || t >= 9666 && t <= 9719 || t >= 9720 && t <= 9727 || t >= 9728 && t <= 9838 || t === 9839 || t >= 9840 && t <= 10087 || t === 10088 || t === 10089 || t === 10090 || t === 10091 || t === 10092 || t === 10093 || t === 10094 || t === 10095 || t === 10096 || t === 10097 || t === 10098 || t === 10099 || t === 10100 || t === 10101 || t >= 10132 && t <= 10175 || t >= 10176 && t <= 10180 || t === 10181 || t === 10182 || t >= 10183 && t <= 10213 || t === 10214 || t === 10215 || t === 10216 || t === 10217 || t === 10218 || t === 10219 || t === 10220 || t === 10221 || t === 10222 || t === 10223 || t >= 10224 && t <= 10239 || t >= 10240 && t <= 10495 || t >= 10496 && t <= 10626 || t === 10627 || t === 10628 || t === 10629 || t === 10630 || t === 10631 || t === 10632 || t === 10633 || t === 10634 || t === 10635 || t === 10636 || t === 10637 || t === 10638 || t === 10639 || t === 10640 || t === 10641 || t === 10642 || t === 10643 || t === 10644 || t === 10645 || t === 10646 || t === 10647 || t === 10648 || t >= 10649 && t <= 10711 || t === 10712 || t === 10713 || t === 10714 || t === 10715 || t >= 10716 && t <= 10747 || t === 10748 || t === 10749 || t >= 10750 && t <= 11007 || t >= 11008 && t <= 11055 || t >= 11056 && t <= 11076 || t >= 11077 && t <= 11078 || t >= 11079 && t <= 11084 || t >= 11085 && t <= 11123 || t >= 11124 && t <= 11125 || t >= 11126 && t <= 11157 || t === 11158 || t >= 11159 && t <= 11263 || t >= 11776 && t <= 11777 || t === 11778 || t === 11779 || t === 11780 || t === 11781 || t >= 11782 && t <= 11784 || t === 11785 || t === 11786 || t === 11787 || t === 11788 || t === 11789 || t >= 11790 && t <= 11798 || t === 11799 || t >= 11800 && t <= 11801 || t === 11802 || t === 11803 || t === 11804 || t === 11805 || t >= 11806 && t <= 11807 || t === 11808 || t === 11809 || t === 11810 || t === 11811 || t === 11812 || t === 11813 || t === 11814 || t === 11815 || t === 11816 || t === 11817 || t >= 11818 && t <= 11822 || t === 11823 || t >= 11824 && t <= 11833 || t >= 11834 && t <= 11835 || t >= 11836 && t <= 11839 || t === 11840 || t === 11841 || t === 11842 || t >= 11843 && t <= 11855 || t >= 11856 && t <= 11857 || t === 11858 || t >= 11859 && t <= 11903 || t >= 12289 && t <= 12291 || t === 12296 || t === 12297 || t === 12298 || t === 12299 || t === 12300 || t === 12301 || t === 12302 || t === 12303 || t === 12304 || t === 12305 || t >= 12306 && t <= 12307 || t === 12308 || t === 12309 || t === 12310 || t === 12311 || t === 12312 || t === 12313 || t === 12314 || t === 12315 || t === 12316 || t === 12317 || t >= 12318 && t <= 12319 || t === 12320 || t === 12336 || t === 64830 || t === 64831 || t >= 65093 && t <= 65094;
}
function tr(t) {
  t.forEach(function(e) {
    if (delete e.location, Xo(e) || qo(e))
      for (var i in e.options)
        delete e.options[i].location, tr(e.options[i].value);
    else Wo(e) && Jo(e.style) || (Ko(e) || Yo(e)) && qs(e.style) ? delete e.style.location : Zo(e) && tr(e.children);
  });
}
function dc(t, e) {
  e === void 0 && (e = {}), e = Q({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, e);
  var i = new nc(t, e).parse();
  if (i.err) {
    var s = SyntaxError(q[i.err.kind]);
    throw s.location = i.err.location, s.originalMessage = i.err.message, s;
  }
  return e != null && e.captureLocation || tr(i.val), i.val;
}
var Lt;
(function(t) {
  t.MISSING_VALUE = "MISSING_VALUE", t.INVALID_VALUE = "INVALID_VALUE", t.MISSING_INTL_API = "MISSING_INTL_API";
})(Lt || (Lt = {}));
var as = (
  /** @class */
  (function(t) {
    os(e, t);
    function e(i, s, r) {
      var n = t.call(this, i) || this;
      return n.code = s, n.originalMessage = r, n;
    }
    return e.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, e;
  })(Error)
), an = (
  /** @class */
  (function(t) {
    os(e, t);
    function e(i, s, r, n) {
      return t.call(this, 'Invalid values for "'.concat(i, '": "').concat(s, '". Options are "').concat(Object.keys(r).join('", "'), '"'), Lt.INVALID_VALUE, n) || this;
    }
    return e;
  })(as)
), cc = (
  /** @class */
  (function(t) {
    os(e, t);
    function e(i, s, r) {
      return t.call(this, 'Value for "'.concat(i, '" must be of type ').concat(s), Lt.INVALID_VALUE, r) || this;
    }
    return e;
  })(as)
), hc = (
  /** @class */
  (function(t) {
    os(e, t);
    function e(i, s) {
      return t.call(this, 'The intl string context variable "'.concat(i, '" was not provided to the string "').concat(s, '"'), Lt.MISSING_VALUE, s) || this;
    }
    return e;
  })(as)
), xe;
(function(t) {
  t[t.literal = 0] = "literal", t[t.object = 1] = "object";
})(xe || (xe = {}));
function uc(t) {
  return t.length < 2 ? t : t.reduce(function(e, i) {
    var s = e[e.length - 1];
    return !s || s.type !== xe.literal || i.type !== xe.literal ? e.push(i) : s.value += i.value, e;
  }, []);
}
function gc(t) {
  return typeof t == "function";
}
function Ii(t, e, i, s, r, n, a) {
  if (t.length === 1 && Qr(t[0]))
    return [
      {
        type: xe.literal,
        value: t[0].value
      }
    ];
  for (var o = [], l = 0, d = t; l < d.length; l++) {
    var c = d[l];
    if (Qr(c)) {
      o.push({
        type: xe.literal,
        value: c.value
      });
      continue;
    }
    if (Od(c)) {
      typeof n == "number" && o.push({
        type: xe.literal,
        value: i.getNumberFormat(e).format(n)
      });
      continue;
    }
    var h = c.value;
    if (!(r && h in r))
      throw new hc(h, a);
    var u = r[h];
    if (zd(c)) {
      (!u || typeof u == "string" || typeof u == "number") && (u = typeof u == "string" || typeof u == "number" ? String(u) : ""), o.push({
        type: typeof u == "string" ? xe.literal : xe.object,
        value: u
      });
      continue;
    }
    if (Ko(c)) {
      var g = typeof c.style == "string" ? s.date[c.style] : qs(c.style) ? c.style.parsedOptions : void 0;
      o.push({
        type: xe.literal,
        value: i.getDateTimeFormat(e, g).format(u)
      });
      continue;
    }
    if (Yo(c)) {
      var g = typeof c.style == "string" ? s.time[c.style] : qs(c.style) ? c.style.parsedOptions : s.time.medium;
      o.push({
        type: xe.literal,
        value: i.getDateTimeFormat(e, g).format(u)
      });
      continue;
    }
    if (Wo(c)) {
      var g = typeof c.style == "string" ? s.number[c.style] : Jo(c.style) ? c.style.parsedOptions : void 0;
      g && g.scale && (u = u * (g.scale || 1)), o.push({
        type: xe.literal,
        value: i.getNumberFormat(e, g).format(u)
      });
      continue;
    }
    if (Zo(c)) {
      var _ = c.children, f = c.value, p = r[f];
      if (!gc(p))
        throw new cc(f, "function", a);
      var m = Ii(_, e, i, s, r, n), v = p(m.map(function(x) {
        return x.value;
      }));
      Array.isArray(v) || (v = [v]), o.push.apply(o, v.map(function(x) {
        return {
          type: typeof x == "string" ? xe.literal : xe.object,
          value: x
        };
      }));
    }
    if (Xo(c)) {
      var E = c.options[u] || c.options.other;
      if (!E)
        throw new an(c.value, u, Object.keys(c.options), a);
      o.push.apply(o, Ii(E.value, e, i, s, r));
      continue;
    }
    if (qo(c)) {
      var E = c.options["=".concat(u)];
      if (!E) {
        if (!Intl.PluralRules)
          throw new as(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, Lt.MISSING_INTL_API, a);
        var C = i.getPluralRules(e, { type: c.pluralType }).select(u - (c.offset || 0));
        E = c.options[C] || c.options.other;
      }
      if (!E)
        throw new an(c.value, u, Object.keys(c.options), a);
      o.push.apply(o, Ii(E.value, e, i, s, r, u - (c.offset || 0)));
      continue;
    }
  }
  return uc(o);
}
function _c(t, e) {
  return e ? Q(Q(Q({}, t || {}), e || {}), Object.keys(t).reduce(function(i, s) {
    return i[s] = Q(Q({}, t[s]), e[s] || {}), i;
  }, {})) : t;
}
function fc(t, e) {
  return e ? Object.keys(t).reduce(function(i, s) {
    return i[s] = _c(t[s], e[s]), i;
  }, Q({}, t)) : t;
}
function Cs(t) {
  return {
    create: function() {
      return {
        get: function(e) {
          return t[e];
        },
        set: function(e, i) {
          t[e] = i;
        }
      };
    }
  };
}
function pc(t) {
  return t === void 0 && (t = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: Ss(function() {
      for (var e, i = [], s = 0; s < arguments.length; s++)
        i[s] = arguments[s];
      return new ((e = Intl.NumberFormat).bind.apply(e, ks([void 0], i, !1)))();
    }, {
      cache: Cs(t.number),
      strategy: As.variadic
    }),
    getDateTimeFormat: Ss(function() {
      for (var e, i = [], s = 0; s < arguments.length; s++)
        i[s] = arguments[s];
      return new ((e = Intl.DateTimeFormat).bind.apply(e, ks([void 0], i, !1)))();
    }, {
      cache: Cs(t.dateTime),
      strategy: As.variadic
    }),
    getPluralRules: Ss(function() {
      for (var e, i = [], s = 0; s < arguments.length; s++)
        i[s] = arguments[s];
      return new ((e = Intl.PluralRules).bind.apply(e, ks([void 0], i, !1)))();
    }, {
      cache: Cs(t.pluralRules),
      strategy: As.variadic
    })
  };
}
var mc = (
  /** @class */
  (function() {
    function t(e, i, s, r) {
      i === void 0 && (i = t.defaultLocale);
      var n = this;
      if (this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function(l) {
        var d = n.formatToParts(l);
        if (d.length === 1)
          return d[0].value;
        var c = d.reduce(function(h, u) {
          return !h.length || u.type !== xe.literal || typeof h[h.length - 1] != "string" ? h.push(u.value) : h[h.length - 1] += u.value, h;
        }, []);
        return c.length <= 1 ? c[0] || "" : c;
      }, this.formatToParts = function(l) {
        return Ii(n.ast, n.locales, n.formatters, n.formats, l, void 0, n.message);
      }, this.resolvedOptions = function() {
        var l;
        return {
          locale: ((l = n.resolvedLocale) === null || l === void 0 ? void 0 : l.toString()) || Intl.NumberFormat.supportedLocalesOf(n.locales)[0]
        };
      }, this.getAst = function() {
        return n.ast;
      }, this.locales = i, this.resolvedLocale = t.resolveLocale(i), typeof e == "string") {
        if (this.message = e, !t.__parse)
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        var a = r || {};
        a.formatters;
        var o = Ed(a, ["formatters"]);
        this.ast = t.__parse(e, Q(Q({}, o), { locale: this.resolvedLocale }));
      } else
        this.ast = e;
      if (!Array.isArray(this.ast))
        throw new TypeError("A message must be provided as a String or AST.");
      this.formats = fc(t.formats, s), this.formatters = r && r.formatters || pc(this.formatterCache);
    }
    return Object.defineProperty(t, "defaultLocale", {
      get: function() {
        return t.memoizedDefaultLocale || (t.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), t.memoizedDefaultLocale;
      },
      enumerable: !1,
      configurable: !0
    }), t.memoizedDefaultLocale = null, t.resolveLocale = function(e) {
      if (!(typeof Intl.Locale > "u")) {
        var i = Intl.NumberFormat.supportedLocalesOf(e);
        return i.length > 0 ? new Intl.Locale(i[0]) : new Intl.Locale(typeof e == "string" ? e : e[0]);
      }
    }, t.__parse = dc, t.formats = {
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
const ln = /* @__PURE__ */ Object.assign({ "./locales/cs.json": sd, "./locales/da.json": nd, "./locales/de.json": ad, "./locales/en.json": dd, "./locales/fi.json": hd, "./locales/fr.json": gd, "./locales/it.json": fd, "./locales/nl.json": md, "./locales/no.json": yd, "./locales/ru.json": xd, "./locales/sk.json": kd, "./locales/sv.json": Ad }), ft = {};
for (const t in ln) {
  const e = t.match(/\.\/locales\/([\w-]+)\.json$/);
  e && (ft[e[1]] = ln[t].default);
}
const qi = "en";
function dn(t, e) {
  return t[e];
}
function Pe(t, e) {
  var r;
  let i = e || ((r = t == null ? void 0 : t.locale) == null ? void 0 : r.language) || (t == null ? void 0 : t.language) || qi;
  if (ft[i]) return i;
  const s = i.slice(0, 2).toLowerCase();
  return ft[s] ? s : qi;
}
const vc = Object.keys(ft);
function Z(t, e, i = {}) {
  const s = ft[e] || ft[qi] || {};
  let r = dn(s, t);
  if (r === void 0) {
    const n = dn(ft[qi] || {}, t);
    r = n === void 0 ? t : n;
  }
  try {
    return new mc(r, e).format(i);
  } catch (n) {
    return console.warn(`Translation failed for key: ${t}`, n), r;
  }
}
function Re(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function oi(t) {
  return t.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
const U = {
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
}, yc = 30;
function Nt(t) {
  return Math.round(t / yc);
}
function pi(t, e) {
  const i = Array.from({ length: 7 }, (s, r) => Z(`card.levels.${r}`, e));
  return Array.isArray(t) ? i.map((s, r) => {
    const n = t[r];
    return n == null || n === "" ? s : n;
  }) : i;
}
const bc = "state_tomorrow", xc = "state_in_2_days", wc = "state_today_desc", kc = "state_tomorrow_desc", Sc = "state_in_2_days_desc", Ae = {
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
  ...U,
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
async function Ac(t, e) {
  const i = !!e.debug, s = (x) => x.charAt(0).toUpperCase() + x.slice(1), r = Pe(t, e.date_locale), n = e.date_locale || Ae.date_locale, a = e.days_relative !== !1, o = !!e.days_abbreviated, l = !!e.days_uppercase, d = e.phrases || {}, c = d.full || {}, h = d.short || {}, u = d.levels, g = pi(u, r), _ = d.no_information || Z("card.no_information", r), f = d.days || {}, p = e.days_to_show ?? Ae.days_to_show, m = e.pollen_threshold ?? Ae.pollen_threshold;
  i && console.debug("DWD adapter: start fetchForecast", { config: e, lang: r });
  const v = (x) => {
    const k = Number(x);
    return isNaN(k) ? -1 : k;
  }, E = /* @__PURE__ */ new Date();
  E.setHours(0, 0, 0, 0);
  const C = [];
  for (const x of e.allergens)
    try {
      const k = {}, w = oi(x);
      k.allergenReplaced = w;
      const b = ke[w] || w, A = c[x];
      if (A)
        k.allergenCapitalized = A;
      else {
        const $ = `card.allergen.${ke[w] || w}`, N = Z($, r);
        k.allergenCapitalized = N !== $ ? N : s(x);
      }
      if (e.allergens_abbreviated) {
        const R = h[x];
        k.allergenShort = R || Z(`editor.phrases_short.${b}`, r) || k.allergenCapitalized;
      } else
        k.allergenShort = k.allergenCapitalized;
      let M;
      if (e.region_id === "manual") {
        const R = e.entity_prefix || "", $ = e.entity_suffix || "";
        if (M = `sensor.${R}${w}${$}`, !t.states[M])
          if ($ === "") {
            const N = `sensor.${R}${w}`, z = Object.keys(t.states).filter(
              (O) => O.startsWith(N)
            );
            if (z.length === 1) M = z[0];
            else continue;
          } else continue;
      } else if (M = e.region_id ? `sensor.pollenflug_${w}_${e.region_id}` : null, !M || !t.states[M]) {
        const R = Object.keys(t.states).filter(
          ($) => $.startsWith(`sensor.pollenflug_${w}_`)
        );
        if (R.length === 1) M = R[0];
        else continue;
      }
      const P = t.states[M];
      k.entity_id = M;
      const y = v(P.state), L = v(P.attributes[bc]), S = v(P.attributes[xc]), T = [
        { date: E, level: y },
        { date: new Date(E.getTime() + 864e5), level: L },
        { date: new Date(E.getTime() + 2 * 864e5), level: S }
      ];
      for (; T.length < p; ) {
        const R = T.length;
        T.push({
          date: new Date(E.getTime() + R * 864e5),
          level: -1
        });
      }
      k.days = [], T.forEach((R, $) => {
        if (R.level !== null && R.level >= 0) {
          const N = Math.round((R.date - E) / 864e5);
          let z;
          a ? f[N] !== void 0 ? z = f[N] : N >= 0 && N <= 2 ? z = Z(`card.days.${N}`, r) : z = R.date.toLocaleDateString(n, {
            day: "numeric",
            month: "short"
          }) : (z = R.date.toLocaleDateString(n, {
            weekday: o ? "short" : "long"
          }), z = z.charAt(0).toUpperCase() + z.slice(1)), l && (z = z.toUpperCase());
          const O = P.attributes[$ === 0 ? wc : $ === 1 ? kc : Sc] || "", V = R.level * 2, j = Math.min(Math.max(Math.round(V), 0), 6), B = j < 0 ? _ : g[j] || O;
          k[`day${$}`] = {
            name: k.allergenCapitalized,
            day: z,
            state: R.level,
            display_state: V,
            state_text: B
          }, k.days.push(k[`day${$}`]);
        }
      }), (T.slice(0, p).some((R) => R.level >= m) || m === 0) && C.push(k);
    } catch (k) {
      console.warn(`DWD adapter error for allergen ${x}:`, k);
    }
  return e.sort !== "none" && C.sort(
    {
      value_ascending: (x, k) => {
        var w, b;
        return (((w = x.day0) == null ? void 0 : w.state) ?? 0) - (((b = k.day0) == null ? void 0 : b.state) ?? 0);
      },
      value_descending: (x, k) => {
        var w, b;
        return (((w = k.day0) == null ? void 0 : w.state) ?? 0) - (((b = x.day0) == null ? void 0 : b.state) ?? 0);
      },
      name_ascending: (x, k) => x.allergenCapitalized.localeCompare(k.allergenCapitalized),
      name_descending: (x, k) => k.allergenCapitalized.localeCompare(x.allergenCapitalized)
    }[e.sort] || ((x, k) => {
      var w, b;
      return (((w = k.day0) == null ? void 0 : w.state) ?? 0) - (((b = x.day0) == null ? void 0 : b.state) ?? 0);
    })
  ), i && console.debug("DWD adapter complete sensors:", C), C;
}
const Ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetchForecast: Ac,
  stubConfigDWD: Ae
}, Symbol.toStringTag, { value: "Module" })), Cc = { nl: { els: "alder", berk: "birch", gras: "grass", hazelaar: "hazel", bijvoet: "mugwort", olijf: "olive", ambrosia: "ragweed", index: "allergy_risk" }, de: { erle: "alder", birke: "birch", gras: "grass", hasel: "hazel", beifu: "mugwort", ambrosia: "ragweed", index: "allergy_risk" }, ru: { "": "ragweed" }, fi: { leppa: "alder", koivu: "birch", heina: "grass", pahkinaleppa: "hazel", siankarsamo: "mugwort", oliivi: "olive", ambrosia: "ragweed", index: "allergy_risk" }, sk: { jelsa: "alder", breza: "birch", trava: "grass", lieska: "hazel", palina: "mugwort", olivovnik: "olive", ambrozia: "ragweed", index: "allergy_risk" }, en: { alder: "alder", birch: "birch", grass: "grass", hazel: "hazel", mugwort: "mugwort", olive: "olive", ragweed: "ragweed", index: "allergy_risk" }, it: { ontano: "alder", betulla: "birch", erba: "grass", nocciolo: "hazel", artemisia: "mugwort", oliva: "olive", ambrosia: "ragweed", index: "allergy_risk" }, cs: { olse: "alder", briza: "birch", trava: "grass", liska: "hazel", pelynek: "mugwort", olivovnik: "olive", ambrozie: "ragweed", index: "allergy_risk" }, no: { al: "alder", bjrk: "birch", gress: "grass", hassel: "hazel", malurt: "mugwort", oliven: "olive", ambrosia: "ragweed", index: "allergy_risk" }, da: { al: "alder", birk: "birch", grs: "grass", hassel: "hazel", malurt: "mugwort", oliven: "olive", ambrosia: "ragweed", index: "allergy_risk" }, sv: { al: "alder", bjork: "birch", gras: "grass", hassel: "hazel", malort: "mugwort", oliv: "olive", ambrosia: "ragweed", index: "allergy_risk" } }, Pc = { alder: { nl: "Els", de: "Erle", ru: "Ольха", fi: "Leppä", sk: "Jelša", en: "Alder", it: "Ontano", cs: "Olše", no: "Al", da: "Al", sv: "Al" }, birch: { nl: "Berk", de: "Birke", ru: "Берёза", fi: "Koivu", sk: "Breza", en: "Birch", it: "Betulla", cs: "Bříza", no: "Bjørk", da: "Birk", sv: "Björk" }, grass: { nl: "Gras", de: "Gras", ru: "Трава", fi: "Heinä", sk: "Tráva", en: "Grass", it: "Erba", cs: "Tráva", no: "Gress", da: "Græs", sv: "Gräs" }, hazel: { nl: "Hazelaar", de: "Hasel", ru: "Лещина", fi: "Pähkinäleppä", sk: "Lieska", en: "Hazel", it: "Nocciolo", cs: "Líska", no: "Hassel", da: "Hassel", sv: "Hassel" }, mugwort: { nl: "Bijvoet", de: "Beifuß", ru: "Полынь", fi: "Siankärsämö", sk: "Palina", en: "Mugwort", it: "Artemisia", cs: "Pelyněk", no: "Malurt", da: "Malurt", sv: "Malört" }, olive: { nl: "Olijf", de: "Olive", ru: "Олива", fi: "Oliivi", sk: "Olivovník", en: "Olive", it: "Oliva", cs: "Olivovník", no: "Oliven", da: "Oliven", sv: "Oliv" }, ragweed: { nl: "Ambrosia", de: "Ambrosia", ru: "Амброзия", fi: "Ambrosia", sk: "Ambrózia", en: "Ragweed", it: "Ambrosia", cs: "Ambrózie", no: "Ambrosia", da: "Ambrosia", sv: "Ambrosia" }, allergy_risk: { nl: "Index", de: "Index", ru: "Index", fi: "Index", sk: "Index", en: "Index", it: "Index", cs: "Index", no: "Index", da: "Index", sv: "Index" } }, Mc = { nl: ["forecast_beta"], de: ["pollen_vorhersage_beta"], ru: ["beta"], fi: ["siitepolyennuste_beta"], sk: ["predpoved_beta"], en: ["pollen_forecast_beta"], it: ["previsione_del_polline_beta"], cs: ["predpoved_beta"], no: ["pollenprognose_beta"], da: ["pollenprognose_beta"], sv: ["pollenprognos_beta"] }, le = {
  mapping: Cc,
  names: Pc,
  weather_suffixes: Mc
};
function oa(t, e, i) {
  var l, d, c;
  if (!t || !e) return null;
  const s = e.toLowerCase();
  let r = /* @__PURE__ */ new Set();
  const n = ((l = le.weather_suffixes) == null ? void 0 : l[i]) || ((d = le.weather_suffixes) == null ? void 0 : d[i == null ? void 0 : i.split("-")[0]]) || [];
  for (const h of n) {
    r.add(h);
    const u = `weather.silam_pollen_${s}_${h}`;
    if (u in t.states) return u;
  }
  for (const h of ((c = le.weather_suffixes) == null ? void 0 : c.en) || []) {
    if (r.has(h)) continue;
    r.add(h);
    const u = `weather.silam_pollen_${s}_${h}`;
    if (u in t.states) return u;
  }
  const a = Array.from(
    new Set(Object.values(le.weather_suffixes).flat())
  );
  for (const h of a) {
    if (r.has(h)) continue;
    const u = `weather.silam_pollen_${s}_${h}`;
    if (u in t.states) return u;
  }
  const o = `weather.silam_pollen_${s}_`;
  return Object.keys(t.states).find((h) => h.startsWith(o)) || null;
}
const $e = {
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
  ...U,
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
}, ir = [...$e.allergens, "index"], aa = {
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
function Ni(t, e) {
  const i = aa[t];
  return !i || isNaN(e) ? -1 : e < i[0] ? 0 : e < i[1] ? 1 : e < i[2] ? 2 : e < i[3] ? 3 : e < i[4] ? 4 : e < i[5] ? 5 : 6;
}
function Zt(t) {
  if (t == null) return -1;
  const e = [0, 1, 3, 5, 6], i = {
    very_low: 0,
    low: 1,
    moderate: 2,
    high: 3,
    very_high: 4
  };
  if (typeof t == "string") {
    const r = i[t.toLowerCase()];
    return r == null ? -1 : e[Math.max(0, Math.min(r, 4))];
  }
  const s = Number(t);
  if (!isNaN(s)) {
    const r = Math.max(0, Math.min(Math.round(s), 4));
    return e[r];
  }
  return -1;
}
function la(t, e) {
  const i = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...t.phrases || {}
  };
  return i.no_information = i.no_information || Z("card.no_information", e), i;
}
function da(t, e) {
  return pi(t.levels, e);
}
function ca(t, e, i) {
  let s;
  e.full[t] ? s = e.full[t] : le.names && le.names[t] && le.names[t][i] ? s = le.names[t][i] : s = t.charAt(0).toUpperCase() + t.slice(1);
  const r = e.short[t] || s;
  return { allergenCapitalized: s, allergenShort: r };
}
async function $c(t, e, i = null) {
  var b, A, M;
  const s = !!e.debug, r = Pe(t, e.date_locale), n = e.date_locale || ((b = t.locale) == null ? void 0 : b.language) || t.language || `${r}-${r.toUpperCase()}`, a = e.days_relative !== !1, o = !!e.days_abbreviated, l = !!e.days_uppercase, d = la(e, r), c = da(d, r), h = d.no_information, u = d.days, g = /* @__PURE__ */ new Date();
  g.setHours(0, 0, 0, 0);
  const _ = e.days_to_show ?? $e.days_to_show, f = e.pollen_threshold ?? $e.pollen_threshold, p = e.location === "manual" ? "" : (e.location || "").toLowerCase(), m = oa(t, p, n);
  if (!m || !t.states[m])
    return s && console.warn("[SILAM] Ingen weather-entity hittad:", m), [];
  const v = t.states[m], C = (e.allergens || $e.allergens).map((P) => {
    const y = Re(P);
    return ke[y] || y;
  });
  let x = [];
  i && i.forecast && Array.isArray(i.forecast) ? x = i.forecast : Array.isArray(v.attributes.forecast) && (x = v.attributes.forecast);
  let k;
  e.mode === "hourly" || e.mode === "twice_daily" ? k = Math.min(x.length, _) : k = Math.min(x.length + 1, _);
  const w = [];
  for (const P of C)
    try {
      const y = {};
      y.days = [], y.allergenReplaced = P;
      const { allergenCapitalized: L, allergenShort: S } = ca(
        P,
        d,
        r
      );
      if (y.allergenCapitalized = L, y.allergenShort = e.allergens_abbreviated ? S : L, P === "allergy_risk") {
        const $ = ((M = (A = le.names) == null ? void 0 : A.allergy_risk) == null ? void 0 : M[r]) || "Index";
        y.allergenCapitalized = $, y.allergenShort = $;
      }
      let T = null;
      if (e.location === "manual") {
        let $ = null;
        for (const V of Object.values(le.mapping)) {
          const j = Object.entries(V).reduce(
            (B, [H, G]) => (B[G] = H, B),
            {}
          );
          if (j[P]) {
            $ = j[P];
            break;
          }
        }
        $ = $ || P;
        const N = e.entity_prefix || "", z = e.entity_suffix || "", O = `sensor.${N}${$}${z}`;
        t.states[O] && (T = O);
      } else {
        for (const $ of Object.values(le.mapping)) {
          const N = Object.entries($).reduce(
            (z, [O, V]) => (z[V] = O, z),
            {}
          );
          if (N[P]) {
            const z = `sensor.silam_pollen_${p}_${N[P]}`;
            if (t.states[z]) {
              T = z;
              break;
            }
          }
        }
        if (!T) {
          const $ = `sensor.silam_pollen_${p}_${P}`;
          t.states[$] && (T = $);
        }
      }
      y.entity_id = T;
      let D = [];
      if (P === "allergy_risk")
        if (e.mode === "hourly" || e.mode === "twice_daily")
          for (let $ = 0; $ < k; ++$) {
            const N = x[$], z = N ? N.index ?? N.pollen_index : null;
            D.push(Zt(z));
          }
        else {
          const $ = v.attributes.index ?? v.attributes.pollen_index ?? v.state;
          D.push(Zt($));
          for (let N = 1; N < k; ++N) {
            const z = x[N - 1], O = z ? z.index ?? z.pollen_index : null;
            D.push(Zt(O));
          }
        }
      else if (e.mode === "hourly" || e.mode === "twice_daily")
        for (let $ = 0; $ < k; ++$) {
          const N = x[$], z = N ? Number(N[`pollen_${P}`]) : NaN;
          D.push(Ni(P, z));
        }
      else {
        const $ = Number(v.attributes[`pollen_${P}`]);
        D.push(Ni(P, $));
        for (let N = 1; N < k; ++N) {
          const z = x[N - 1], O = z ? Number(z[`pollen_${P}`]) : NaN;
          D.push(Ni(P, O));
        }
      }
      for (let $ = 0; $ < k; ++$) {
        const N = D[$];
        let z, O, V;
        if (e.mode === "hourly" || e.mode === "twice_daily")
          if (x[$] && (x[$].datetime || x[$].time) ? V = new Date(x[$].datetime || x[$].time) : V = new Date(g.getTime() + $ * 36e5), e.mode === "twice_daily") {
            const H = V.toLocaleDateString(n, { weekday: "short" });
            z = H.charAt(0).toUpperCase() + H.slice(1), O = $ % 2 === 0 ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down", l && (z = z.toUpperCase());
          } else
            z = V.toLocaleTimeString(n, {
              hour: "2-digit",
              minute: "2-digit"
            }) || "", O = null;
        else
          V = new Date(g.getTime() + $ * 864e5), a ? u[$] != null ? z = u[$] : $ >= 0 && $ <= 2 ? z = Z(`card.days.${$}`, r) : z = V.toLocaleDateString(n, {
            day: "numeric",
            month: "short"
          }) : (z = V.toLocaleDateString(n, {
            weekday: o ? "short" : "long"
          }), z = z.charAt(0).toUpperCase() + z.slice(1)), l && (z = z.toUpperCase()), O = null;
        const j = N < 0 ? 0 : Math.min(Math.round(N), 6), B = N < 0 ? h : c[j] || String(N);
        y[`day${$}`] = {
          name: y.allergenCapitalized,
          day: z,
          icon: O,
          state: N,
          state_text: B
        }, y.days.push(y[`day${$}`]);
      }
      (y.days.some(($) => $.state >= f) || f === 0) && w.push(y);
    } catch (y) {
      s && console.warn(`[SILAM] Fel vid allergen ${P}:`, y);
    }
  if (e.sort !== "none" && w.sort(
    {
      value_ascending: (P, y) => {
        var L, S;
        return (((L = P.day0) == null ? void 0 : L.state) ?? 0) - (((S = y.day0) == null ? void 0 : S.state) ?? 0);
      },
      value_descending: (P, y) => {
        var L, S;
        return (((L = y.day0) == null ? void 0 : L.state) ?? 0) - (((S = P.day0) == null ? void 0 : S.state) ?? 0);
      },
      name_ascending: (P, y) => P.allergenCapitalized.localeCompare(y.allergenCapitalized),
      name_descending: (P, y) => y.allergenCapitalized.localeCompare(P.allergenCapitalized)
    }[e.sort] || ((P, y) => {
      var L, S;
      return (((L = y.day0) == null ? void 0 : L.state) ?? 0) - (((S = P.day0) == null ? void 0 : S.state) ?? 0);
    })
  ), e.index_top || e.allergy_risk_top) {
    const P = w.findIndex(
      (y) => y.allergenReplaced === "allergy_risk" || y.allergenReplaced === "index"
    );
    if (P > 0) {
      const [y] = w.splice(P, 1);
      w.unshift(y);
    }
  }
  return s && console.debug("[SILAM] fetchForecast klar:", w), w;
}
const Tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SILAM_ALLERGENS: ir,
  SILAM_THRESHOLDS: aa,
  fetchForecast: $c,
  getAllergenNames: ca,
  getLevelNames: da,
  getPhrases: la,
  grainsToLevel: Ni,
  indexToLevel: Zt,
  stubConfigSILAM: $e
}, Symbol.toStringTag, { value: "Module" })), Te = {
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
  ...U,
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
}, Ut = ["allergy_risk", ...Te.allergens];
async function Lc(t, e) {
  var P, y;
  const i = !!e.debug, s = Pe(t, e.date_locale), r = e.date_locale || ((P = t.locale) == null ? void 0 : P.language) || t.language || `${s}-${s.toUpperCase()}`, n = e.days_relative !== !1, a = !!e.days_abbreviated, o = !!e.days_uppercase, l = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...e.phrases || {}
  }, d = l.full, c = l.short, h = l.levels, u = 5;
  let _ = Array.from(
    { length: 7 },
    (L, S) => Z(`card.levels.${S}`, s)
  ).slice();
  Array.isArray(h) && (h.length === 7 ? _ = pi(h, s) : h.length === u && [0, 1, 3, 5, 6].forEach((S, T) => {
    const D = h[T];
    D != null && D !== "" && (_[S] = D);
  }));
  const f = l.no_information || Z("card.no_information", s), p = l.days, m = e.integration === "dwd" ? 3 : e.integration === "peu" ? 4 : 6, v = (L) => {
    const S = Number(L);
    return isNaN(S) || S < 0 ? -1 : S > m ? m : S;
  }, E = /* @__PURE__ */ new Date();
  E.setHours(0, 0, 0, 0);
  const C = e.days_to_show ?? Te.days_to_show, x = e.pollen_threshold ?? Te.pollen_threshold, k = e.mode || Te.mode, w = {
    hourly: 1,
    hourly_second: 2,
    hourly_third: 3,
    hourly_fourth: 4,
    hourly_sixth: 6,
    hourly_eighth: 8,
    twice_daily: 12
  }, b = Object.keys(t.states).filter(
    (L) => L.startsWith("sensor.polleninformation_")
  );
  let A = e.location === "manual" ? "" : e.location;
  if (!A && e.location !== "manual" && b.length) {
    const L = b[0].match(/^sensor\.polleninformation_(.+)_[^_]+$/);
    A = L ? L[1] : "";
  }
  const M = [];
  for (const L of e.allergens)
    try {
      const S = {};
      S.days = [];
      const T = L;
      S.allergenReplaced = T;
      const D = ke[T] || T;
      if (d[T])
        S.allergenCapitalized = d[T];
      else {
        const O = Z(`card.allergen.${D}`, s);
        S.allergenCapitalized = O !== `card.allergen.${D}` ? O : T.charAt(0).toUpperCase() + T.slice(1);
      }
      if (e.allergens_abbreviated) {
        const O = c[T];
        S.allergenShort = O || Z(`editor.phrases_short.${D}`, s) || S.allergenCapitalized;
      } else
        S.allergenShort = S.allergenCapitalized;
      let R;
      if (e.location === "manual") {
        const O = e.entity_prefix || "", V = k !== "daily" && T === "allergy_risk" ? "allergy_risk_hourly" : T, j = e.entity_suffix || "";
        if (R = `sensor.${O}${V}${j}`, !t.states[R]) continue;
      } else if (k !== "daily" && T === "allergy_risk" ? R = A ? `sensor.polleninformation_${A}_allergy_risk_hourly` : null : R = A ? `sensor.polleninformation_${A}_${T}` : null, !R || !t.states[R]) {
        const O = b.filter((V) => {
          const j = V.match(/^sensor\.polleninformation_(.+)_(.+)$/);
          if (!j) return !1;
          const B = j[1], H = j[2];
          return k !== "daily" && T === "allergy_risk" ? (!A || B === A) && H === "allergy_risk_hourly" : (!A || B === A) && H === T;
        });
        if (O.length === 1) R = O[0];
        else continue;
      }
      const $ = t.states[R];
      if (!((y = $ == null ? void 0 : $.attributes) != null && y.forecast)) throw "Missing forecast";
      S.entity_id = R;
      const N = Array.isArray($.attributes.forecast) ? $.attributes.forecast : [];
      if (k !== "daily" && T === "allergy_risk") {
        const O = w[k] || 1, V = Math.min(
          Math.floor(N.length / O),
          C
        );
        for (let j = 0; j < V; ++j) {
          const B = N[j * O] || {}, H = B.time ? new Date(B.time) : B.datetime ? new Date(B.datetime) : new Date(E.getTime() + j * O * 36e5);
          let G, Y = null;
          k === "twice_daily" ? (G = H.toLocaleDateString(r, { weekday: "short" }).replace(/^./, (Le) => Le.toUpperCase()), o && (G = G.toUpperCase()), Y = j % 2 === 0 ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down") : G = H.toLocaleTimeString(r, {
            hour: "2-digit",
            minute: "2-digit"
          }) || "";
          let ie = Number(B.numeric_state ?? B.level ?? -1), fe = ie;
          T === "allergy_risk" && e.numeric_state_raw_risk && (fe = Number(
            B.numeric_state_raw ?? B.level_raw ?? fe
          ));
          const he = Zt(ie), Oe = {
            name: S.allergenCapitalized,
            day: G,
            icon: Y,
            state: ie,
            // Separate property used purely for numeric display.
            display_state: fe,
            state_text: he < 0 ? f : _[he] || Z(`card.levels.${he}`, s)
          };
          S[`day${j}`] = Oe, S.days.push(Oe);
        }
      } else {
        const O = N.reduce((H, G) => {
          const Y = G.time || G.datetime;
          return H[Y] = G, H;
        }, {}), j = Object.keys(O).sort(
          (H, G) => new Date(H) - new Date(G)
        ).filter((H) => new Date(H) >= E);
        let B = [];
        if (j.length >= C)
          B = j.slice(0, C);
        else {
          B = j.slice();
          let H = j.length > 0 ? new Date(j[j.length - 1]) : E;
          for (; B.length < C; ) {
            H = new Date(H.getTime() + 864e5);
            const G = H.getFullYear(), Y = String(H.getMonth() + 1).padStart(2, "0"), ie = String(H.getDate()).padStart(2, "0");
            B.push(`${G}-${Y}-${ie}T00:00:00`);
          }
        }
        B.forEach((H, G) => {
          const Y = O[H] || {};
          let ie = v(Y.level), fe = ie;
          if (T === "allergy_risk" && e.numeric_state_raw_risk && (Y.numeric_state_raw != null ? fe = Number(Y.numeric_state_raw) : Y.level_raw != null && (fe = Number(Y.level_raw))), ie !== null && ie >= 0) {
            const he = new Date(H), Oe = Math.round((he - E) / 864e5);
            let Le;
            n ? p[Oe] != null ? Le = p[Oe] : Oe >= 0 && Oe <= 2 ? Le = Z(`card.days.${Oe}`, s) : Le = he.toLocaleDateString(r, {
              day: "numeric",
              month: "short"
            }) : (Le = he.toLocaleDateString(r, {
              weekday: a ? "short" : "long"
            }), Le = Le.charAt(0).toUpperCase() + Le.slice(1)), o && (Le = Le.toUpperCase());
            let Rt;
            ie < 2 ? Rt = Math.floor(ie * 6 / 4) : Rt = Math.ceil(ie * 6 / 4);
            const Br = {
              name: S.allergenCapitalized,
              day: Le,
              state: ie,
              // Raw value used only for display when available.
              display_state: fe,
              state_text: Rt < 0 ? f : _[Rt] || Z(`card.levels.${Rt}`, s)
            };
            S[`day${G}`] = Br, S.days.push(Br);
          }
        });
      }
      (S.days.some((O) => O.state >= x) || x === 0) && M.push(S);
    } catch (S) {
      i && console.warn(`Fel vid allergen ${L}:`, S);
    }
  if (e.sort !== "none" && M.sort(
    {
      value_ascending: (L, S) => {
        var T, D;
        return (((T = L.day0) == null ? void 0 : T.state) ?? 0) - (((D = S.day0) == null ? void 0 : D.state) ?? 0);
      },
      value_descending: (L, S) => {
        var T, D;
        return (((T = S.day0) == null ? void 0 : T.state) ?? 0) - (((D = L.day0) == null ? void 0 : D.state) ?? 0);
      },
      name_ascending: (L, S) => L.allergenCapitalized.localeCompare(S.allergenCapitalized),
      name_descending: (L, S) => S.allergenCapitalized.localeCompare(L.allergenCapitalized)
    }[e.sort] || ((L, S) => {
      var T, D;
      return (((T = S.day0) == null ? void 0 : T.state) ?? 0) - (((D = L.day0) == null ? void 0 : D.state) ?? 0);
    })
  ), e.allergy_risk_top) {
    const L = M.findIndex(
      (S) => S.allergenReplaced === "allergy_risk" || S.allergenReplaced === "index"
    );
    if (L > 0) {
      const [S] = M.splice(L, 1);
      M.unshift(S);
    }
  }
  return i && console.debug("PEU.fetchForecast — done", M), M;
}
const Dc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PEU_ALLERGENS: Ut,
  fetchForecast: Lc,
  stubConfigPEU: Te
}, Symbol.toStringTag, { value: "Module" })), cn = "kleenex_pollen_radar", hn = {
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
  ambrosia: "ragweed",
  // Same as Italian
  bijvoet: "mugwort",
  ganzevoet: "chenopod",
  brandnetel: "nettle"
}, Me = {
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
  ...U,
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
};
function zc(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const Oc = {
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
};
function bi(t, e) {
  const i = Number(t);
  if (isNaN(i) || i < 0) return -1;
  if (i === 0) return 0;
  const s = Oc[e] || "trees";
  let r;
  switch (s) {
    case "trees":
      r = [95, 207, 703];
      break;
    case "weeds":
      r = [20, 77, 266];
      break;
    case "grass":
      r = [29, 60, 341];
      break;
    default:
      r = [95, 207, 703];
  }
  return i <= r[0] ? 1 : i <= r[1] ? 2 : i <= r[2] ? 3 : 4;
}
async function Rc(t, e) {
  var C, x, k, w, b, A, M, P;
  const i = Pe(t, e.date_locale), s = e.debug, r = e.days_to_show || Me.days_to_show, n = ((C = e.phrases) == null ? void 0 : C.short) || {}, a = ((x = e.phrases) == null ? void 0 : x.full) || {}, o = e.pollen_threshold ?? Me.pollen_threshold, l = 4, d = (y) => {
    const L = Number(y);
    return isNaN(L) || L < 0 ? -1 : L > l ? l : L;
  };
  s && console.debug("[Kleenex] Adapter: start fetchForecast", { config: e, lang: i });
  const c = /* @__PURE__ */ new Date();
  c.setHours(0, 0, 0, 0);
  let h = Object.values(t.states).filter((y) => y.entity_id && y.entity_id.startsWith(`sensor.${cn}_`));
  if (e.location && e.location !== "manual") {
    const y = ze(e.location);
    s && console.debug(
      `[Kleenex] Filtering sensors for location: ${e.location} (normalized: ${y})`
    ), h = h.filter((L) => {
      const T = L.entity_id.replace(`sensor.${cn}_`, "").replace(/_[^_]+$/, ""), D = T === y;
      return s && D && console.debug(
        `[Kleenex] Location match: ${L.entity_id} -> locPart: ${T}`
      ), D;
    }), s && console.debug(
      `[Kleenex] After location filtering: ${h.length} sensors for location '${y}'`
    );
  } else if (e.location === "manual") {
    let y = e.entity_prefix || "";
    if (y.startsWith("sensor.") && (y = y.substring(7)), y && !y.endsWith("_") && (y = y + "_"), s && console.debug(
      `[Kleenex] Manual mode filtering with prefix: '${y}'`
    ), y) {
      const L = `sensor.${y}`;
      h = h.filter((S) => {
        const T = S.entity_id.startsWith(L);
        return s && T && console.debug(
          `[Kleenex] Manual mode match: ${S.entity_id}`
        ), T;
      }), s && console.debug(
        `[Kleenex] After manual mode filtering: ${h.length} sensors with prefix '${L}'`
      );
    }
  }
  s && console.debug(
    "[Kleenex] Sensors found:",
    h.map((y) => y.entity_id)
  );
  let u = [];
  const g = /* @__PURE__ */ new Map();
  s && console.debug(
    `[Kleenex] Processing ${h.length} sensors for allergens:`,
    e.allergens
  );
  for (const y of h) {
    s && console.debug(`[Kleenex] === PROCESSING SENSOR: ${y.entity_id} ===`);
    const L = y.attributes || {}, S = L.details || [], T = L.forecast || [];
    let D = null;
    const R = y.entity_id.split("_").pop();
    for (const [$, N] of Object.entries(sr))
      if (R.startsWith($)) {
        D = N;
        break;
      }
    if (s && console.debug(
      `[Kleenex] Processing sensor ${y.entity_id}, category: ${D}, details count: ${S.length}, forecast days: ${T.length}`
    ), D) {
      let $ = D;
      if (D === "trees" && e.allergens.includes("trees_cat") ? $ = "trees_cat" : D === "grass" && e.allergens.includes("grass_cat") ? $ = "grass_cat" : D === "weeds" && e.allergens.includes("weeds_cat") && ($ = "weeds_cat"), s && console.debug(
        `[Kleenex] Category sensor mapping: ${D} -> ${$}, included in config: ${e.allergens.includes($)}`
      ), e.allergens.includes($)) {
        s && console.debug(
          `[Kleenex] Processing CATEGORY sensor for: ${D} -> ${$}`
        ), g.has($) || (g.set($, {
          levels: [],
          entity_id: y.entity_id,
          source: "category_sensor"
          // Track data source
        }), s && console.debug(`[Kleenex] CREATED allergenData entry for category: ${$}`));
        const N = g.get($), z = Number(y.state) || 0, O = bi(z, $), V = d(O);
        s && console.debug(
          `[Kleenex] CATEGORY ${$} TODAY: sensor_state=${y.state}, parsed_value=${z}, raw_level=${O}, clamped_level=${V}, text_level=${(k = y.attributes) == null ? void 0 : k.level}`
        ), N.levels[0] = {
          date: new Date(c),
          level: V,
          // Store raw level (0-4)
          value: z
        }, s && console.debug(`[Kleenex] CATEGORY ${$} TODAY DATA SET: level=${V}, value=${z}`), T.forEach((j, B) => {
          const H = Number(j.value) || 0, G = bi(H, $), Y = d(G);
          s && console.debug(
            `[Kleenex] CATEGORY ${$} FORECAST day ${B + 1}: value=${H}, raw_level=${G}, clamped_level=${Y}, text_level=${j.level}`
          ), N.levels[B + 1] = {
            date: new Date(c.getTime() + (B + 1) * 864e5),
            level: Y,
            // Store raw level (0-4)
            value: H
          }, s && console.debug(`[Kleenex] CATEGORY ${$} FORECAST DAY ${B + 1} DATA SET: level=${Y}, value=${H}`);
        });
      } else
        s && console.debug(
          `[Kleenex] SKIPPING category sensor ${D} -> ${$}: not in config.allergens [${e.allergens.join(", ")}]`
        );
    }
    s && console.debug(`[Kleenex] Processing ${S.length} individual allergen details for sensor: ${y.entity_id}`);
    try {
      for (const $ of S) {
        const N = (w = $.name) == null ? void 0 : w.toLowerCase();
        if (!N) continue;
        const z = hn[N] || N;
        if (!e.allergens.includes(z)) {
          s && $.value !== void 0 && console.debug(
            `[Kleenex] SKIPPING individual allergen ${z} (${N}): not in config allergens`
          );
          continue;
        }
        s && console.debug(
          `[Kleenex] Processing INDIVIDUAL allergen: ${z} (original: ${N})`
        ), g.has(z) || g.set(z, {
          levels: [],
          entity_id: y.entity_id,
          source: "individual_details"
          // Track data source
        });
        const O = g.get(z), V = Number($.value) || 0, j = bi(V, z), B = d(j);
        s && console.debug(
          `[Kleenex] INDIVIDUAL ${z} TODAY: detail_value=${$.value}, parsed_value=${V}, raw_level=${j}, clamped_level=${B}, text_level=${$.level}, source=${y.entity_id}`
        ), (!O.levels[0] || O.source === "individual_details") && (O.levels[0] = {
          date: new Date(c),
          level: B,
          // Store raw level (0-4)
          value: V
        });
      }
    } catch ($) {
      s && console.warn(`[Kleenex] Error processing individual allergens for sensor ${y.entity_id}:`, $);
    }
    try {
      T.forEach(($, N) => {
        var V;
        const z = new Date(
          c.getTime() + (N + 1) * 864e5
        ), O = $.details || [];
        s && O.length > 0 && console.debug(
          `[Kleenex] Processing forecast day ${N + 1} with ${O.length} allergen details`
        );
        for (const j of O) {
          const B = (V = j.name) == null ? void 0 : V.toLowerCase();
          if (!B) continue;
          const H = hn[B] || B;
          if (!e.allergens.includes(H)) continue;
          g.has(H) || g.set(H, {
            levels: [],
            entity_id: y.entity_id,
            source: "individual_forecast"
            // Track data source
          });
          const G = g.get(H), Y = Number(j.value) || 0, ie = bi(Y, H), fe = d(ie);
          s && console.debug(
            `[Kleenex] INDIVIDUAL ${H} FORECAST day ${N + 1}: detail_value=${j.value}, parsed_value=${Y}, raw_level=${ie}, clamped_level=${fe}, text_level=${j.level}`
          );
          const he = N + 1;
          (!G.levels[he] || G.source === "individual_forecast" || G.source === "individual_details") && (G.levels[he] = {
            date: z,
            level: fe,
            // Store raw level (0-4)
            value: Y
          });
        }
      });
    } catch ($) {
      s && console.warn(`[Kleenex] Error processing forecast data for sensor ${y.entity_id}:`, $);
    }
  }
  s && (console.debug(
    "[Kleenex] === ALLERGEN DATA COLLECTION COMPLETE ==="
  ), console.debug(
    `[Kleenex] Collected data for ${g.size} allergens:`,
    Array.from(g.keys())
  ), g.size === 0 ? (console.debug("[Kleenex] WARNING: No allergen data collected! This will result in empty sensors array."), console.debug("[Kleenex] Checking config:", {
    allergens: e.allergens,
    location: e.location,
    filteredSensorCount: h.length
  }), console.debug("[Kleenex] Sensor entity IDs processed:", h.map((y) => y.entity_id)), console.debug("[Kleenex] Was any category sensor found that matches config allergens?")) : (console.debug("[Kleenex] DETAILED ALLERGEN DATA ANALYSIS:"), g.forEach((y, L) => {
    var R;
    const S = ["trees_cat", "grass_cat", "weeds_cat"].includes(L);
    console.debug(`[Kleenex] === ${L.toUpperCase()} (${S ? "CATEGORY" : "INDIVIDUAL"}) ===`), console.debug(`[Kleenex] Source: ${y.source}`), console.debug(`[Kleenex] Entity: ${y.entity_id}`), console.debug(`[Kleenex] Levels array length: ${y.levels.length}`), console.debug(`[Kleenex] Valid levels count (>= 0): ${y.levels.filter(($) => $.level >= 0).length}`), y.levels.forEach(($, N) => {
      var O;
      const z = N === 0 ? "TODAY" : `DAY+${N}`;
      console.debug(`[Kleenex] ${L} ${z}: date=${(O = $.date) == null ? void 0 : O.toISOString().split("T")[0]}, level=${$.level}, value=${$.value}`);
    });
    const T = (R = y.levels[0]) == null ? void 0 : R.level, D = T !== void 0 && T >= 0;
    console.debug(`[Kleenex] ${L} TODAY DATA CHECK: hasValidToday=${D}, todayLevel=${T}`);
  })));
  const _ = e.days_relative ?? Me.days_relative, f = e.days_abbreviated ?? Me.days_abbreviated, p = e.days_uppercase ?? Me.days_uppercase, m = ((b = e.phrases) == null ? void 0 : b.days) || {}, v = i.replace("_", "-");
  s && (console.debug(`[Kleenex] === BUILDING SENSORS FROM ${g.size} COLLECTED ALLERGENS ===`), console.debug(`[Kleenex] pollen_threshold = ${o}`), g.forEach((y, L) => {
    console.debug(`[Kleenex] Building sensor for: ${L}, source: ${y.source}, levels_count: ${y.levels.length}`), y.levels[0] ? console.debug(`[Kleenex] ${L} today data: level=${y.levels[0].level}, value=${y.levels[0].value}`) : console.debug(`[Kleenex] ${L} WARNING: No today data found!`);
  }));
  const E = e.sort === "none" ? e.allergens.filter((y) => g.has(y)) : Array.from(g.keys());
  s && console.debug(
    `[Kleenex] Building sensors array ${e.sort === "none" ? "in config order" : "in discovery order"}:`,
    E
  );
  for (const y of E) {
    const L = g.get(y);
    if (L)
      try {
        const S = {};
        S.allergenReplaced = y, S.entity_id = L.entity_id, S.days = [];
        const T = ke[y] || y, D = a[y];
        if (D)
          S.allergenCapitalized = D;
        else {
          const H = `card.allergen.${ke[y] || y}`, G = Z(H, i);
          S.allergenCapitalized = G !== H ? G : zc(y);
        }
        if (e.allergens_abbreviated) {
          const B = n[y];
          S.allergenShort = B || Z(`editor.phrases_short.${T}`, i) || S.allergenCapitalized;
        } else
          S.allergenShort = S.allergenCapitalized;
        const R = L.levels;
        for (; R.length < r; ) {
          const B = R.length;
          R.push({
            date: new Date(c.getTime() + B * 864e5),
            level: -1,
            value: -1
          });
        }
        for (let B = 0; B < r; B++)
          R[B] || (R[B] = {
            date: new Date(c.getTime() + B * 864e5),
            level: -1,
            value: -1
          });
        const $ = e.phrases.levels, N = 5;
        let O = Array.from(
          { length: 7 },
          (B, H) => Z(`card.levels.${H}`, i)
        ).slice();
        Array.isArray($) && ($.length === 7 ? O = pi($, i) : $.length === N && [0, 1, 3, 5, 6].forEach((H, G) => {
          const Y = $[G];
          Y != null && Y !== "" && (O[H] = Y);
        })), S.levelNames = O;
        for (let B = 0; B < r; B++) {
          const H = R[B], G = H.date, Y = Math.round((G - c) / 864e5);
          let ie;
          _ ? m[Y] != null ? ie = m[Y] : Y >= 0 && Y <= 2 ? ie = Z(`card.days.${Y}`, i) : ie = G.toLocaleDateString(v, {
            day: "numeric",
            month: "short"
          }) : (ie = G.toLocaleDateString(v, {
            weekday: f ? "short" : "long"
          }), ie = ie.charAt(0).toUpperCase() + ie.slice(1)), p && (ie = ie.toUpperCase());
          const fe = H.level;
          let he;
          fe < 0 ? he = fe : fe < 2 ? he = Math.floor(fe * 6 / 4) : he = Math.ceil(fe * 6 / 4);
          const Oe = {
            name: S.allergenCapitalized,
            day: ie,
            state: fe,
            // Raw level for sorting and threshold checking
            state_text: he < 0 ? ((A = e.phrases) == null ? void 0 : A.no_information) || Z("card.no_information", i) : O[he] || Z(`card.levels.${he}`, i),
            value: H.value,
            description: he < 0 ? ((M = e.phrases) == null ? void 0 : M.no_information) || Z("card.no_information", i) : O[he] || Z(`card.levels.${he}`, i)
          };
          S[`day${B}`] = Oe, S.days.push(Oe);
        }
        const V = S.days.some((B) => B.state >= o), j = V || o === 0;
        if (s) {
          const B = ["trees_cat", "grass_cat", "weeds_cat"].includes(y);
          console.debug(
            `[Kleenex] === THRESHOLD CHECK for ${y} (${B ? "CATEGORY" : "INDIVIDUAL"}) ===`
          ), console.debug(`[Kleenex] pollen_threshold = ${o}`), console.debug(`[Kleenex] days.length = ${S.days.length}`), S.days.forEach((H, G) => {
            console.debug(`[Kleenex] ${y} day${G}: state=${H.state}, value=${H.value}, day=${H.day}, meets_threshold=${H.state >= o}`);
          }), console.debug(`[Kleenex] meets = ${V} (any day >= ${o})`), console.debug(`[Kleenex] shouldAdd = ${j} (meets || threshold===0)`), B && !j ? (console.debug(`[Kleenex] ❌ CATEGORY ALLERGEN ${y} FILTERED OUT BY THRESHOLD!`), console.debug(`[Kleenex] Highest level found: ${Math.max(...S.days.map((H) => H.state))}`)) : B && j && console.debug(`[Kleenex] ✅ CATEGORY ALLERGEN ${y} PASSES THRESHOLD CHECK`);
        }
        j ? (u.push(S), s && console.debug(
          `[Kleenex] SENSOR ADDED for ${y}: today_state=${(P = S.day0) == null ? void 0 : P.state}, entity_id=${S.entity_id}`
        )) : s && console.debug(
          `[Kleenex] SENSOR FILTERED OUT for ${y}: threshold not met (highest level: ${Math.max(...S.days.map((B) => B.state))})`
        );
      } catch (S) {
        console.warn(`[Kleenex] Adapter error for allergen ${y}:`, S);
      }
  }
  if (e.sort !== "none") {
    const y = {
      value_ascending: (L, S) => {
        var T, D;
        return (((T = L.day0) == null ? void 0 : T.state) ?? 0) - (((D = S.day0) == null ? void 0 : D.state) ?? 0);
      },
      value_descending: (L, S) => {
        var T, D;
        return (((T = S.day0) == null ? void 0 : T.state) ?? 0) - (((D = L.day0) == null ? void 0 : D.state) ?? 0);
      },
      name_ascending: (L, S) => L.allergenCapitalized.localeCompare(S.allergenCapitalized),
      name_descending: (L, S) => S.allergenCapitalized.localeCompare(L.allergenCapitalized)
    }[e.sort] || ((L, S) => {
      var T, D;
      return (((T = S.day0) == null ? void 0 : T.state) ?? 0) - (((D = L.day0) == null ? void 0 : D.state) ?? 0);
    });
    if (e.sort_category_allergens_first) {
      const L = u.filter(
        (T) => ["trees_cat", "grass_cat", "weeds_cat"].includes(T.allergenReplaced)
      ), S = u.filter(
        (T) => !["trees_cat", "grass_cat", "weeds_cat"].includes(T.allergenReplaced)
      );
      L.sort(y), S.sort(y), u = [...L, ...S], s && console.debug(
        `[Kleenex] Two-tiered sorting: ${L.length} category + ${S.length} individual allergens`
      );
    } else
      u.sort(y), s && console.debug(
        `[Kleenex] Standard sorting: ${u.length} allergens sorted together`
      );
  } else s && console.debug(
    `[Kleenex] No sorting applied: ${u.length} allergens kept in config order`
  );
  if (s) {
    if (console.debug("[Kleenex] === FINAL ADAPTER RESULTS ==="), console.debug(`[Kleenex] Total sensors returning: ${u.length}`), u.length === 0) {
      console.debug("[Kleenex] ❌ NO SENSORS RETURNED! Checking why:"), console.debug(`[Kleenex] - allergenData.size: ${g.size}`), console.debug(`[Kleenex] - pollen_threshold: ${o}`), console.debug(`[Kleenex] - config.allergens: [${e.allergens.join(", ")}]`);
      let y = 0;
      g.forEach((L, S) => {
        L.levels.some((D) => D.level >= o) || (y++, console.debug(`[Kleenex] - ${S} filtered by threshold (max level: ${Math.max(...L.levels.map((D) => D.level))})`));
      }), console.debug(`[Kleenex] - allergens filtered by threshold: ${y}`);
    } else
      console.debug("[Kleenex] ✅ SENSORS FOUND:"), u.forEach((y, L) => {
        var T;
        const S = ["trees_cat", "grass_cat", "weeds_cat"].includes(y.allergenReplaced);
        console.debug(`[Kleenex] ${L + 1}. ${y.allergenReplaced} (${S ? "CATEGORY" : "INDIVIDUAL"}): day0_state=${(T = y.day0) == null ? void 0 : T.state}, entity_id=${y.entity_id}`);
      });
    console.debug("[Kleenex] Adapter fetchForecast complete.");
  }
  return u;
}
function Ic() {
  return [];
}
async function Nc() {
  return [];
}
const Bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetchForecast: Rc,
  findSensors: Ic,
  getData: Nc,
  stubConfigKleenex: Me
}, Symbol.toStringTag, { value: "Module" })), Hc = {
  pp: js,
  dwd: Ec,
  peu: Dc,
  silam: Tc,
  kleenex: Bc
}, ha = {
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
}, ke = {
  // Svenska
  al: "alder",
  alm: "elm",
  bok: "beech",
  bjork: "birch",
  ek: "oak",
  grabo: "mugwort",
  gras: "grass",
  hassel: "hazel",
  malortsambrosia: "ragweed",
  salg_och_viden: "willow",
  // Tyska (DWD), normaliserade via replaceAAO
  erle: "alder",
  ambrosia: "ragweed",
  esche: "ash",
  birke: "birch",
  buche: "beech",
  hasel: "hazel",
  graser: "grass",
  // från 'gräser'
  graeser: "grass",
  // från 'gräser'
  beifuss: "mugwort",
  // från 'beifuss'
  roggen: "rye",
  // Engelska (PEU)
  olive: "olive",
  plane: "plane",
  cypress: "cypress",
  lime: "lime",
  mold_spores: "mold_spores",
  nettle_and_pellitory: "nettle_and_pellitory",
  // Add PEU (new API) English names
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
  olive: "olive",
  allergy_risk: "allergy_risk",
  index: "allergy_risk",
  // Kleenex pollen radar - individual allergens
  pine: "pine",
  poplar: "poplar",
  poaceae: "poaceae",
  chenopod: "chenopod",
  nettle: "nettle",
  // Kleenex pollen radar - category allergens (to distinguish from individual allergens)
  grass_cat: "grass_cat",
  trees_cat: "trees_cat",
  weeds_cat: "weeds_cat"
  // Note: Category allergens use _cat suffix to distinguish from individuals
  // Icon mapping is handled separately in the image system
}, xi = {
  trees_cat: "birch",
  // Use birch icon for trees category
  grass_cat: "grass",
  // Use grass icon for grass category
  weeds_cat: "mugwort",
  // Use mugwort icon for weeds category
  trees: "birch",
  // Keep original for compatibility
  weeds: "mugwort"
  // Keep original for compatibility
  // grass has its own icon, no fallback needed
}, sr = {
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
}, rr = [
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
], ua = [
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
  "title"
], pe = {
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
  ...U,
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
async function Fc(t, e) {
  var k, w;
  const i = [], s = !!e.debug, r = (b) => b.charAt(0).toUpperCase() + b.slice(1), n = (b) => {
    const [A] = b.split("T"), [M, P, y] = A.split("-").map(Number);
    return new Date(M, P - 1, y);
  }, a = /* @__PURE__ */ new Date();
  a.setHours(0, 0, 0, 0);
  const o = Pe(t, e.date_locale), l = e.date_locale || ((k = t.locale) == null ? void 0 : k.language) || t.language || `${o}-${o.toUpperCase()}`, d = e.days_relative !== !1, c = !!e.days_abbreviated, h = !!e.days_uppercase, u = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...e.phrases || {}
  }, g = u.full, _ = u.short, f = u.levels, p = pi(f, o), m = u.no_information || Z("card.no_information", o), v = u.days;
  s && console.debug("PP.fetchForecast — start", { city: e.city, lang: o });
  const E = (b) => {
    const A = Number(b);
    return isNaN(A) || A < 0 ? null : A > 6 ? 6 : A;
  }, C = e.days_to_show ?? pe.days_to_show, x = e.pollen_threshold ?? pe.pollen_threshold;
  for (const b of e.allergens)
    try {
      const A = {};
      A.days = [];
      const M = Re(b);
      if (A.allergenReplaced = M, this.debug && console.log(
        "[PP] allergen",
        b,
        "fullPhrases keys",
        Object.keys(g)
      ), g[b])
        A.allergenCapitalized = g[b];
      else {
        const z = ke[M] || M, O = Z(`card.allergen.${z}`, o);
        A.allergenCapitalized = O !== `card.allergen.${z}` ? O : r(b);
      }
      if (e.allergens_abbreviated) {
        const z = ke[M] || M, O = _[b];
        A.allergenShort = O || Z(`editor.phrases_short.${z}`, o) || A.allergenCapitalized;
      } else
        A.allergenShort = A.allergenCapitalized;
      let P = e.city === "manual" ? "" : Re(e.city || "");
      if (!P) {
        const z = Object.keys(t.states).filter(
          (O) => O.startsWith("sensor.pollen_") && /^sensor\.pollen_(.+)_[^_]+$/.test(O)
        );
        if (z.length) {
          const O = z[0].match(/^sensor\.pollen_(.+)_[^_]+$/);
          P = O ? O[1] : "";
        }
      }
      let y;
      if (e.city === "manual") {
        const z = e.entity_prefix || "", O = e.entity_suffix || "";
        if (y = `sensor.${z}${M}${O}`, !t.states[y]) continue;
      } else if (y = P ? `sensor.pollen_${P}_${M}` : null, !y || !t.states[y]) {
        const z = P ? `sensor.pollen_${P}_` : "sensor.pollen_", O = Object.keys(t.states).filter(
          (V) => V.startsWith(z) && V.endsWith(`_${M}`)
        );
        if (O.length === 1) y = O[0];
        else continue;
      }
      const L = t.states[y];
      if (!((w = L == null ? void 0 : L.attributes) != null && w.forecast)) throw "Missing forecast";
      A.entity_id = y;
      const S = L.attributes.forecast, T = Array.isArray(S) ? S.reduce((z, O) => {
        const V = O.time || O.datetime;
        return z[V] = O, z;
      }, {}) : S, R = Object.keys(T).sort(
        (z, O) => n(z) - n(O)
      ).filter((z) => n(z) >= a);
      let $ = [];
      if (R.length >= C)
        $ = R.slice(0, C);
      else {
        $ = R.slice();
        let z = R.length > 0 ? n(R[R.length - 1]) : a;
        for (; $.length < C; ) {
          z = new Date(z.getTime() + 864e5);
          const O = z.getFullYear(), V = String(z.getMonth() + 1).padStart(2, "0"), j = String(z.getDate()).padStart(2, "0");
          $.push(`${O}-${V}-${j}T00:00:00`);
        }
      }
      $.forEach((z, O) => {
        const V = T[z] || {}, j = E(V.level), B = n(z), H = Math.round((B - a) / 864e5);
        let G;
        if (d ? v[H] != null ? G = v[H] : H >= 0 && H <= 2 ? G = Z(`card.days.${H}`, o) : G = B.toLocaleDateString(l, {
          day: "numeric",
          month: "short"
        }) : (G = B.toLocaleDateString(l, {
          weekday: c ? "short" : "long"
        }), G = G.charAt(0).toUpperCase() + G.slice(1)), h && (G = G.toUpperCase()), j !== null) {
          const Y = {
            name: A.allergenCapitalized,
            day: G,
            state: j,
            state_text: p[j]
          };
          A[`day${O}`] = Y, A.days.push(Y);
        } else if (x === 0) {
          const Y = {
            name: A.allergenCapitalized,
            day: G,
            state: 0,
            state_text: m
          };
          A[`day${O}`] = Y, A.days.push(Y);
        }
      }), (A.days.some((z) => z.state >= x) || x === 0) && i.push(A);
    } catch (A) {
      console.warn(`[PP] Fel vid allergen ${b}:`, A);
    }
  return e.sort !== "none" && i.sort(
    {
      value_ascending: (b, A) => {
        var M, P;
        return (((M = b.day0) == null ? void 0 : M.state) ?? 0) - (((P = A.day0) == null ? void 0 : P.state) ?? 0);
      },
      value_descending: (b, A) => {
        var M, P;
        return (((M = A.day0) == null ? void 0 : M.state) ?? 0) - (((P = b.day0) == null ? void 0 : P.state) ?? 0);
      },
      name_ascending: (b, A) => b.allergenCapitalized.localeCompare(A.allergenCapitalized),
      name_descending: (b, A) => A.allergenCapitalized.localeCompare(b.allergenCapitalized)
    }[e.sort] || ((b, A) => {
      var M, P;
      return (((M = A.day0) == null ? void 0 : M.state) ?? 0) - (((P = b.day0) == null ? void 0 : P.state) ?? 0);
    })
  ), s && console.debug("PP.fetchForecast — done", i), i;
}
function un(t, e, i = !1) {
  const s = t.integration;
  let r = [];
  if (t.city === "manual" || t.region_id === "manual" || t.location === "manual" && s !== "kleenex") {
    let a = t.entity_prefix || "";
    a.startsWith("sensor.") && (a = a.substring(7)), a && !a.endsWith("_") && (a = a + "_");
    const o = t.entity_suffix || "";
    for (const l of t.allergens || []) {
      let d;
      if (s === "dwd")
        d = oi(l);
      else if (s === "silam") {
        d = null;
        for (const u of Object.values(le.mapping)) {
          const g = Object.entries(u).reduce((_, [f, p]) => (_[p] = f, _), {});
          if (g[l]) {
            d = g[l];
            break;
          }
        }
        d || (d = Re(l));
      } else
        d = Re(l);
      let c = `sensor.${a}${d}${o}`, h = !!e.states[c];
      if (!h && o === "") {
        const u = `sensor.${a}${d}`, g = Object.keys(e.states).filter(
          (_) => _.startsWith(u)
        );
        g.length === 1 && (c = g[0], h = !0);
      }
      i && console.debug(
        `[findAvailableSensors][custom] allergen: '${l}', slug: '${d}', suffix: '${o}', sensorId: '${c}', exists: ${h}`
      ), h && r.push(c);
    }
    return i && console.debug(
      "[findAvailableSensors] Found sensors (",
      r.length,
      ") :",
      r
    ), r;
  }
  if (s === "pp") {
    let a = Re(t.city || "");
    if (!a) {
      const o = Object.keys(e.states).filter(
        (l) => l.startsWith("sensor.pollen_") && /^sensor\.pollen_(.+)_[^_]+$/.test(l)
      );
      if (o.length) {
        const l = o[0].match(/^sensor\.pollen_(.+)_[^_]+$/);
        a = l ? l[1] : "";
      }
    }
    for (const o of t.allergens || []) {
      const l = Re(o);
      let d = a ? `sensor.pollen_${a}_${l}` : null, c = d && e.states[d];
      if (!c) {
        const h = a ? `sensor.pollen_${a}_` : "sensor.pollen_", u = Object.keys(e.states).filter(
          (g) => g.startsWith(h) && g.endsWith(`_${l}`)
        );
        u.length === 1 && (d = u[0], c = !0);
      }
      i && console.debug(
        `[findAvailableSensors][pp] allergen: '${o}', cityKey: '${a}', rawKey: '${l}', sensorId: '${d}', exists: ${!!c}`
      ), c && r.push(d);
    }
  } else if (s === "dwd")
    for (const a of t.allergens || []) {
      const o = oi(a);
      let l = t.region_id ? `sensor.pollenflug_${o}_${t.region_id}` : null, d = l && e.states[l];
      if (!d) {
        const c = Object.keys(e.states).filter(
          (h) => h.startsWith(`sensor.pollenflug_${o}_`)
        );
        c.length === 1 && (l = c[0], d = !0);
      }
      i && console.debug(
        `[findAvailableSensors][dwd] allergen: '${a}', rawKey: '${o}', region_id: '${t.region_id}', sensorId: '${l}', exists: ${!!d}`
      ), d && r.push(l);
    }
  else if (s === "peu") {
    const a = ze(t.location || "");
    for (const o of t.allergens || []) {
      const l = Re(o);
      let d = a ? `sensor.polleninformation_${a}_${l}` : null, c = d && e.states[d];
      if (!c) {
        const h = Object.keys(e.states).filter((u) => {
          const g = u.match(/^sensor\.polleninformation_(.+)_(.+)$/);
          if (!g) return !1;
          const _ = g[1], f = g[2];
          return (!a || _ === a) && f === l;
        });
        h.length === 1 && (d = h[0], c = !0);
      }
      i && console.debug(
        `[findAvailableSensors][peu] allergen: '${o}', locationSlug: '${a}', allergenSlug: '${l}', sensorId: '${d}', exists: ${!!c}`
      ), c && r.push(d);
    }
  } else if (s === "silam") {
    const a = (t.location || "").toLowerCase();
    for (const o of t.allergens || []) {
      let l = null;
      for (const d of Object.values(le.mapping)) {
        const c = Object.entries(d).reduce((h, [u, g]) => (h[g] = u, h), {});
        if (c[o]) {
          const h = c[o], u = `sensor.silam_pollen_${a}_${h}`;
          if (e.states[u]) {
            l = h, i && console.debug(
              `[findAvailableSensors][silam] allergen: '${o}', locationSlug: '${a}', hassSlug: '${l}', sensorId: '${u}', exists: true`,
              e.states[u]
            ), r.push(u);
            break;
          }
        }
      }
      !l && i && console.debug(
        `[findAvailableSensors][silam] allergen: '${o}', locationSlug: '${a}', ingen sensor hittades!`
      );
    }
  } else if (s === "kleenex") {
    const a = ze(t.location || ""), o = ["trees", "grass", "weeds"], l = t.allergens || [], d = /* @__PURE__ */ new Set();
    for (const c of l)
      if (o.includes(c))
        d.add(c);
      else if (c.endsWith("_cat")) {
        const h = c.replace("_cat", "");
        o.includes(h) && d.add(h);
      } else {
        const u = {
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
        }[c];
        u && d.add(u);
      }
    for (const c of d) {
      let h;
      if (t.location === "manual") {
        let u = t.entity_prefix || "";
        u.startsWith("sensor.") && (u = u.substring(7)), u && !u.endsWith("_") && (u = u + "_");
        const g = t.entity_suffix || "";
        if (h = `sensor.${u}${c}${g}`, !e.states[h]) {
          const _ = Object.entries(sr).filter(([m, v]) => v === c).map(([m, v]) => m), f = `sensor.${u}`, p = Object.keys(e.states).filter((m) => {
            if (!m.startsWith(f)) return !1;
            const v = m.substring(f.length);
            if (g && !v.endsWith(g)) return !1;
            const E = g ? v.substring(0, v.length - g.length) : v;
            return _.some((C) => E.startsWith(C));
          });
          p.length >= 1 && (h = p[0]);
        }
      } else if (h = a ? `sensor.kleenex_pollen_radar_${a}_${c}` : null, !h || !e.states[h]) {
        const u = Object.entries(sr).filter(([_, f]) => f === c).map(([_, f]) => _), g = Object.keys(e.states).filter((_) => {
          if (!_.startsWith("sensor.kleenex_pollen_radar_")) return !1;
          const f = _.split("_"), p = f[f.length - 1];
          return u.some((m) => p.startsWith(m));
        });
        g.length >= 1 && (h = g[0]);
      }
      if (i) {
        const g = t.location === "manual" ? `manual mode, prefix: '${t.entity_prefix || ""}', suffix: '${t.entity_suffix || ""}'` : `location: '${a}'`;
        console.debug(
          `[findAvailableSensors][kleenex] category: '${c}', ${g}, sensorId: '${h}', exists: ${!!e.states[h]}`
        );
      }
      e.states[h] && r.push(h);
    }
  }
  if (i) {
    const a = r.length;
    console.debug(
      "[findAvailableSensors] Found sensors (",
      a,
      "): ",
      r
    );
  }
  return r;
}
function we(t, e) {
  if (t === e) return !0;
  if (typeof t != "object" || typeof e != "object" || !t || !e) return !1;
  const i = Object.keys(t), s = Object.keys(e);
  if (i.length !== s.length) return !1;
  for (let r of i) {
    if (!(r in e)) return !1;
    if (Array.isArray(t[r]) && Array.isArray(e[r])) {
      if (t[r].length !== e[r].length || [...t[r]].sort().join(",") !== [...e[r]].sort().join(","))
        return !1;
    } else if (typeof t[r] == "object" && typeof e[r] == "object") {
      if (!we(t[r], e[r])) return !1;
    } else if (t[r] !== e[r])
      return !1;
  }
  return !0;
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function mi(t) {
  return t + 0.5 | 0;
}
const Je = (t, e, i) => Math.max(Math.min(t, i), e);
function Vt(t) {
  return Je(mi(t * 2.55), 0, 255);
}
function st(t) {
  return Je(mi(t * 255), 0, 255);
}
function Ke(t) {
  return Je(mi(t / 2.55) / 100, 0, 1);
}
function gn(t) {
  return Je(mi(t * 100), 0, 100);
}
const De = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, nr = [..."0123456789ABCDEF"], Gc = (t) => nr[t & 15], jc = (t) => nr[(t & 240) >> 4] + nr[t & 15], wi = (t) => (t & 240) >> 4 === (t & 15), Uc = (t) => wi(t.r) && wi(t.g) && wi(t.b) && wi(t.a);
function Vc(t) {
  var e = t.length, i;
  return t[0] === "#" && (e === 4 || e === 5 ? i = {
    r: 255 & De[t[1]] * 17,
    g: 255 & De[t[2]] * 17,
    b: 255 & De[t[3]] * 17,
    a: e === 5 ? De[t[4]] * 17 : 255
  } : (e === 7 || e === 9) && (i = {
    r: De[t[1]] << 4 | De[t[2]],
    g: De[t[3]] << 4 | De[t[4]],
    b: De[t[5]] << 4 | De[t[6]],
    a: e === 9 ? De[t[7]] << 4 | De[t[8]] : 255
  })), i;
}
const Wc = (t, e) => t < 255 ? e(t) : "";
function Kc(t) {
  var e = Uc(t) ? Gc : jc;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + Wc(t.a, e) : void 0;
}
const Yc = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function ga(t, e, i) {
  const s = e * Math.min(i, 1 - i), r = (n, a = (n + t / 30) % 12) => i - s * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [r(0), r(8), r(4)];
}
function Xc(t, e, i) {
  const s = (r, n = (r + t / 60) % 6) => i - i * e * Math.max(Math.min(n, 4 - n, 1), 0);
  return [s(5), s(3), s(1)];
}
function qc(t, e, i) {
  const s = ga(t, 1, 0.5);
  let r;
  for (e + i > 1 && (r = 1 / (e + i), e *= r, i *= r), r = 0; r < 3; r++)
    s[r] *= 1 - e - i, s[r] += e;
  return s;
}
function Zc(t, e, i, s, r) {
  return t === r ? (e - i) / s + (e < i ? 6 : 0) : e === r ? (i - t) / s + 2 : (t - e) / s + 4;
}
function kr(t) {
  const i = t.r / 255, s = t.g / 255, r = t.b / 255, n = Math.max(i, s, r), a = Math.min(i, s, r), o = (n + a) / 2;
  let l, d, c;
  return n !== a && (c = n - a, d = o > 0.5 ? c / (2 - n - a) : c / (n + a), l = Zc(i, s, r, c, n), l = l * 60 + 0.5), [l | 0, d || 0, o];
}
function Sr(t, e, i, s) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, i, s)).map(st);
}
function Ar(t, e, i) {
  return Sr(ga, t, e, i);
}
function Jc(t, e, i) {
  return Sr(qc, t, e, i);
}
function Qc(t, e, i) {
  return Sr(Xc, t, e, i);
}
function _a(t) {
  return (t % 360 + 360) % 360;
}
function eh(t) {
  const e = Yc.exec(t);
  let i = 255, s;
  if (!e)
    return;
  e[5] !== s && (i = e[6] ? Vt(+e[5]) : st(+e[5]));
  const r = _a(+e[2]), n = +e[3] / 100, a = +e[4] / 100;
  return e[1] === "hwb" ? s = Jc(r, n, a) : e[1] === "hsv" ? s = Qc(r, n, a) : s = Ar(r, n, a), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: i
  };
}
function th(t, e) {
  var i = kr(t);
  i[0] = _a(i[0] + e), i = Ar(i), t.r = i[0], t.g = i[1], t.b = i[2];
}
function ih(t) {
  if (!t)
    return;
  const e = kr(t), i = e[0], s = gn(e[1]), r = gn(e[2]);
  return t.a < 255 ? `hsla(${i}, ${s}%, ${r}%, ${Ke(t.a)})` : `hsl(${i}, ${s}%, ${r}%)`;
}
const _n = {
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
}, fn = {
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
function sh() {
  const t = {}, e = Object.keys(fn), i = Object.keys(_n);
  let s, r, n, a, o;
  for (s = 0; s < e.length; s++) {
    for (a = o = e[s], r = 0; r < i.length; r++)
      n = i[r], o = o.replace(n, _n[n]);
    n = parseInt(fn[a], 16), t[o] = [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  return t;
}
let ki;
function rh(t) {
  ki || (ki = sh(), ki.transparent = [0, 0, 0, 0]);
  const e = ki[t.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const nh = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function oh(t) {
  const e = nh.exec(t);
  let i = 255, s, r, n;
  if (e) {
    if (e[7] !== s) {
      const a = +e[7];
      i = e[8] ? Vt(a) : Je(a * 255, 0, 255);
    }
    return s = +e[1], r = +e[3], n = +e[5], s = 255 & (e[2] ? Vt(s) : Je(s, 0, 255)), r = 255 & (e[4] ? Vt(r) : Je(r, 0, 255)), n = 255 & (e[6] ? Vt(n) : Je(n, 0, 255)), {
      r: s,
      g: r,
      b: n,
      a: i
    };
  }
}
function ah(t) {
  return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${Ke(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
}
const Ps = (t) => t <= 31308e-7 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055, kt = (t) => t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
function lh(t, e, i) {
  const s = kt(Ke(t.r)), r = kt(Ke(t.g)), n = kt(Ke(t.b));
  return {
    r: st(Ps(s + i * (kt(Ke(e.r)) - s))),
    g: st(Ps(r + i * (kt(Ke(e.g)) - r))),
    b: st(Ps(n + i * (kt(Ke(e.b)) - n))),
    a: t.a + i * (e.a - t.a)
  };
}
function Si(t, e, i) {
  if (t) {
    let s = kr(t);
    s[e] = Math.max(0, Math.min(s[e] + s[e] * i, e === 0 ? 360 : 1)), s = Ar(s), t.r = s[0], t.g = s[1], t.b = s[2];
  }
}
function fa(t, e) {
  return t && Object.assign(e || {}, t);
}
function pn(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = st(t[3]))) : (e = fa(t, { r: 0, g: 0, b: 0, a: 1 }), e.a = st(e.a)), e;
}
function dh(t) {
  return t.charAt(0) === "r" ? oh(t) : eh(t);
}
class ai {
  constructor(e) {
    if (e instanceof ai)
      return e;
    const i = typeof e;
    let s;
    i === "object" ? s = pn(e) : i === "string" && (s = Vc(e) || rh(e) || dh(e)), this._rgb = s, this._valid = !!s;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = fa(this._rgb);
    return e && (e.a = Ke(e.a)), e;
  }
  set rgb(e) {
    this._rgb = pn(e);
  }
  rgbString() {
    return this._valid ? ah(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Kc(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? ih(this._rgb) : void 0;
  }
  mix(e, i) {
    if (e) {
      const s = this.rgb, r = e.rgb;
      let n;
      const a = i === n ? 0.5 : i, o = 2 * a - 1, l = s.a - r.a, d = ((o * l === -1 ? o : (o + l) / (1 + o * l)) + 1) / 2;
      n = 1 - d, s.r = 255 & d * s.r + n * r.r + 0.5, s.g = 255 & d * s.g + n * r.g + 0.5, s.b = 255 & d * s.b + n * r.b + 0.5, s.a = a * s.a + (1 - a) * r.a, this.rgb = s;
    }
    return this;
  }
  interpolate(e, i) {
    return e && (this._rgb = lh(this._rgb, e._rgb, i)), this;
  }
  clone() {
    return new ai(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = st(e), this;
  }
  clearer(e) {
    const i = this._rgb;
    return i.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, i = mi(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
    return e.r = e.g = e.b = i, this;
  }
  opaquer(e) {
    const i = this._rgb;
    return i.a *= 1 + e, this;
  }
  negate() {
    const e = this._rgb;
    return e.r = 255 - e.r, e.g = 255 - e.g, e.b = 255 - e.b, this;
  }
  lighten(e) {
    return Si(this._rgb, 2, e), this;
  }
  darken(e) {
    return Si(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return Si(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return Si(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return th(this._rgb, e), this;
  }
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function Ue() {
}
const ch = /* @__PURE__ */ (() => {
  let t = 0;
  return () => t++;
})();
function K(t) {
  return t == null;
}
function oe(t) {
  if (Array.isArray && Array.isArray(t))
    return !0;
  const e = Object.prototype.toString.call(t);
  return e.slice(0, 7) === "[object" && e.slice(-6) === "Array]";
}
function X(t) {
  return t !== null && Object.prototype.toString.call(t) === "[object Object]";
}
function de(t) {
  return (typeof t == "number" || t instanceof Number) && isFinite(+t);
}
function Ce(t, e) {
  return de(t) ? t : e;
}
function W(t, e) {
  return typeof t > "u" ? e : t;
}
const hh = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e, pa = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
function se(t, e, i) {
  if (t && typeof t.call == "function")
    return t.apply(i, e);
}
function te(t, e, i, s) {
  let r, n, a;
  if (oe(t))
    for (n = t.length, r = 0; r < n; r++)
      e.call(i, t[r], r);
  else if (X(t))
    for (a = Object.keys(t), n = a.length, r = 0; r < n; r++)
      e.call(i, t[a[r]], a[r]);
}
function Zi(t, e) {
  let i, s, r, n;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (i = 0, s = t.length; i < s; ++i)
    if (r = t[i], n = e[i], r.datasetIndex !== n.datasetIndex || r.index !== n.index)
      return !1;
  return !0;
}
function Ji(t) {
  if (oe(t))
    return t.map(Ji);
  if (X(t)) {
    const e = /* @__PURE__ */ Object.create(null), i = Object.keys(t), s = i.length;
    let r = 0;
    for (; r < s; ++r)
      e[i[r]] = Ji(t[i[r]]);
    return e;
  }
  return t;
}
function ma(t) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(t) === -1;
}
function uh(t, e, i, s) {
  if (!ma(t))
    return;
  const r = e[t], n = i[t];
  X(r) && X(n) ? li(r, n, s) : e[t] = Ji(n);
}
function li(t, e, i) {
  const s = oe(e) ? e : [
    e
  ], r = s.length;
  if (!X(t))
    return t;
  i = i || {};
  const n = i.merger || uh;
  let a;
  for (let o = 0; o < r; ++o) {
    if (a = s[o], !X(a))
      continue;
    const l = Object.keys(a);
    for (let d = 0, c = l.length; d < c; ++d)
      n(l[d], t, a, i);
  }
  return t;
}
function Jt(t, e) {
  return li(t, e, {
    merger: gh
  });
}
function gh(t, e, i) {
  if (!ma(t))
    return;
  const s = e[t], r = i[t];
  X(s) && X(r) ? Jt(s, r) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = Ji(r));
}
const mn = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (t) => t,
  // default resolvers
  x: (t) => t.x,
  y: (t) => t.y
};
function _h(t) {
  const e = t.split("."), i = [];
  let s = "";
  for (const r of e)
    s += r, s.endsWith("\\") ? s = s.slice(0, -1) + "." : (i.push(s), s = "");
  return i;
}
function fh(t) {
  const e = _h(t);
  return (i) => {
    for (const s of e) {
      if (s === "")
        break;
      i = i && i[s];
    }
    return i;
  };
}
function rt(t, e) {
  return (mn[e] || (mn[e] = fh(e)))(t);
}
function Er(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const di = (t) => typeof t < "u", nt = (t) => typeof t == "function", vn = (t, e) => {
  if (t.size !== e.size)
    return !1;
  for (const i of t)
    if (!e.has(i))
      return !1;
  return !0;
};
function ph(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const ee = Math.PI, re = 2 * ee, mh = re + ee, Qi = Number.POSITIVE_INFINITY, vh = ee / 180, ce = ee / 2, lt = ee / 4, yn = ee * 2 / 3, Qe = Math.log10, je = Math.sign;
function Qt(t, e, i) {
  return Math.abs(t - e) < i;
}
function bn(t) {
  const e = Math.round(t);
  t = Qt(t, e, t / 1e3) ? e : t;
  const i = Math.pow(10, Math.floor(Qe(t))), s = t / i;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * i;
}
function yh(t) {
  const e = [], i = Math.sqrt(t);
  let s;
  for (s = 1; s < i; s++)
    t % s === 0 && (e.push(s), e.push(t / s));
  return i === (i | 0) && e.push(i), e.sort((r, n) => r - n).pop(), e;
}
function bh(t) {
  return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
}
function Dt(t) {
  return !bh(t) && !isNaN(parseFloat(t)) && isFinite(t);
}
function xh(t, e) {
  const i = Math.round(t);
  return i - e <= t && i + e >= t;
}
function va(t, e, i) {
  let s, r, n;
  for (s = 0, r = t.length; s < r; s++)
    n = t[s][i], isNaN(n) || (e.min = Math.min(e.min, n), e.max = Math.max(e.max, n));
}
function Ie(t) {
  return t * (ee / 180);
}
function Cr(t) {
  return t * (180 / ee);
}
function xn(t) {
  if (!de(t))
    return;
  let e = 1, i = 0;
  for (; Math.round(t * e) / e !== t; )
    e *= 10, i++;
  return i;
}
function ya(t, e) {
  const i = e.x - t.x, s = e.y - t.y, r = Math.sqrt(i * i + s * s);
  let n = Math.atan2(s, i);
  return n < -0.5 * ee && (n += re), {
    angle: n,
    distance: r
  };
}
function or(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function wh(t, e) {
  return (t - e + mh) % re - ee;
}
function ve(t) {
  return (t % re + re) % re;
}
function ci(t, e, i, s) {
  const r = ve(t), n = ve(e), a = ve(i), o = ve(n - r), l = ve(a - r), d = ve(r - n), c = ve(r - a);
  return r === n || r === a || s && n === a || o > l && d < c;
}
function _e(t, e, i) {
  return Math.max(e, Math.min(i, t));
}
function kh(t) {
  return _e(t, -32768, 32767);
}
function Ye(t, e, i, s = 1e-6) {
  return t >= Math.min(e, i) - s && t <= Math.max(e, i) + s;
}
function Pr(t, e, i) {
  i = i || ((a) => t[a] < e);
  let s = t.length - 1, r = 0, n;
  for (; s - r > 1; )
    n = r + s >> 1, i(n) ? r = n : s = n;
  return {
    lo: r,
    hi: s
  };
}
const Xe = (t, e, i, s) => Pr(t, i, s ? (r) => {
  const n = t[r][e];
  return n < i || n === i && t[r + 1][e] === i;
} : (r) => t[r][e] < i), Sh = (t, e, i) => Pr(t, i, (s) => t[s][e] >= i);
function Ah(t, e, i) {
  let s = 0, r = t.length;
  for (; s < r && t[s] < e; )
    s++;
  for (; r > s && t[r - 1] > i; )
    r--;
  return s > 0 || r < t.length ? t.slice(s, r) : t;
}
const ba = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Eh(t, e) {
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
  }), ba.forEach((i) => {
    const s = "_onData" + Er(i), r = t[i];
    Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !1,
      value(...n) {
        const a = r.apply(this, n);
        return t._chartjs.listeners.forEach((o) => {
          typeof o[s] == "function" && o[s](...n);
        }), a;
      }
    });
  });
}
function wn(t, e) {
  const i = t._chartjs;
  if (!i)
    return;
  const s = i.listeners, r = s.indexOf(e);
  r !== -1 && s.splice(r, 1), !(s.length > 0) && (ba.forEach((n) => {
    delete t[n];
  }), delete t._chartjs);
}
function xa(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const wa = (function() {
  return typeof window > "u" ? function(t) {
    return t();
  } : window.requestAnimationFrame;
})();
function ka(t, e) {
  let i = [], s = !1;
  return function(...r) {
    i = r, s || (s = !0, wa.call(window, () => {
      s = !1, t.apply(e, i);
    }));
  };
}
function Ch(t, e) {
  let i;
  return function(...s) {
    return e ? (clearTimeout(i), i = setTimeout(t, e, s)) : t.apply(this, s), e;
  };
}
const Mr = (t) => t === "start" ? "left" : t === "end" ? "right" : "center", me = (t, e, i) => t === "start" ? e : t === "end" ? i : (e + i) / 2, Ph = (t, e, i, s) => t === (s ? "left" : "right") ? i : t === "center" ? (e + i) / 2 : e;
function Sa(t, e, i) {
  const s = e.length;
  let r = 0, n = s;
  if (t._sorted) {
    const { iScale: a, vScale: o, _parsed: l } = t, d = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, c = a.axis, { min: h, max: u, minDefined: g, maxDefined: _ } = a.getUserBounds();
    if (g) {
      if (r = Math.min(
        // @ts-expect-error Need to type _parsed
        Xe(l, c, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        i ? s : Xe(e, c, a.getPixelForValue(h)).lo
      ), d) {
        const f = l.slice(0, r + 1).reverse().findIndex((p) => !K(p[o.axis]));
        r -= Math.max(0, f);
      }
      r = _e(r, 0, s - 1);
    }
    if (_) {
      let f = Math.max(
        // @ts-expect-error Need to type _parsed
        Xe(l, a.axis, u, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        i ? 0 : Xe(e, c, a.getPixelForValue(u), !0).hi + 1
      );
      if (d) {
        const p = l.slice(f - 1).findIndex((m) => !K(m[o.axis]));
        f += Math.max(0, p);
      }
      n = _e(f, r, s) - r;
    } else
      n = s - r;
  }
  return {
    start: r,
    count: n
  };
}
function Aa(t) {
  const { xScale: e, yScale: i, _scaleRanges: s } = t, r = {
    xmin: e.min,
    xmax: e.max,
    ymin: i.min,
    ymax: i.max
  };
  if (!s)
    return t._scaleRanges = r, !0;
  const n = s.xmin !== e.min || s.xmax !== e.max || s.ymin !== i.min || s.ymax !== i.max;
  return Object.assign(s, r), n;
}
const Ai = (t) => t === 0 || t === 1, kn = (t, e, i) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * re / i)), Sn = (t, e, i) => Math.pow(2, -10 * t) * Math.sin((t - e) * re / i) + 1, ei = {
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
  easeInSine: (t) => -Math.cos(t * ce) + 1,
  easeOutSine: (t) => Math.sin(t * ce),
  easeInOutSine: (t) => -0.5 * (Math.cos(ee * t) - 1),
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
  easeInOutExpo: (t) => Ai(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => Ai(t) ? t : kn(t, 0.075, 0.3),
  easeOutElastic: (t) => Ai(t) ? t : Sn(t, 0.075, 0.3),
  easeInOutElastic(t) {
    return Ai(t) ? t : t < 0.5 ? 0.5 * kn(t * 2, 0.1125, 0.45) : 0.5 + 0.5 * Sn(t * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (t) => 1 - ei.easeOutBounce(1 - t),
  easeOutBounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInOutBounce: (t) => t < 0.5 ? ei.easeInBounce(t * 2) * 0.5 : ei.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};
function $r(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function An(t) {
  return $r(t) ? t : new ai(t);
}
function Ms(t) {
  return $r(t) ? t : new ai(t).saturate(0.5).darken(0.1).hexString();
}
const Mh = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], $h = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Th(t) {
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
      properties: $h
    },
    numbers: {
      type: "number",
      properties: Mh
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
function Lh(t) {
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
const En = /* @__PURE__ */ new Map();
function Dh(t, e) {
  e = e || {};
  const i = t + JSON.stringify(e);
  let s = En.get(i);
  return s || (s = new Intl.NumberFormat(t, e), En.set(i, s)), s;
}
function vi(t, e, i) {
  return Dh(e, i).format(t);
}
const Ea = {
  values(t) {
    return oe(t) ? t : "" + t;
  },
  numeric(t, e, i) {
    if (t === 0)
      return "0";
    const s = this.chart.options.locale;
    let r, n = t;
    if (i.length > 1) {
      const d = Math.max(Math.abs(i[0].value), Math.abs(i[i.length - 1].value));
      (d < 1e-4 || d > 1e15) && (r = "scientific"), n = zh(t, i);
    }
    const a = Qe(Math.abs(n)), o = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), l = {
      notation: r,
      minimumFractionDigits: o,
      maximumFractionDigits: o
    };
    return Object.assign(l, this.options.ticks.format), vi(t, s, l);
  },
  logarithmic(t, e, i) {
    if (t === 0)
      return "0";
    const s = i[e].significand || t / Math.pow(10, Math.floor(Qe(t)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(s) || e > 0.8 * i.length ? Ea.numeric.call(this, t, e, i) : "";
  }
};
function zh(t, e) {
  let i = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(i) >= 1 && t !== Math.floor(t) && (i = t - Math.floor(t)), i;
}
var ls = {
  formatters: Ea
};
function Oh(t) {
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
      tickWidth: (e, i) => i.lineWidth,
      tickColor: (e, i) => i.color,
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
      callback: ls.formatters.values,
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
const bt = /* @__PURE__ */ Object.create(null), ar = /* @__PURE__ */ Object.create(null);
function ti(t, e) {
  if (!e)
    return t;
  const i = e.split(".");
  for (let s = 0, r = i.length; s < r; ++s) {
    const n = i[s];
    t = t[n] || (t[n] = /* @__PURE__ */ Object.create(null));
  }
  return t;
}
function $s(t, e, i) {
  return typeof e == "string" ? li(ti(t, e), i) : li(ti(t, ""), e);
}
class Rh {
  constructor(e, i) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (s) => s.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
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
    }, this.hover = {}, this.hoverBackgroundColor = (s, r) => Ms(r.backgroundColor), this.hoverBorderColor = (s, r) => Ms(r.borderColor), this.hoverColor = (s, r) => Ms(r.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(i);
  }
  set(e, i) {
    return $s(this, e, i);
  }
  get(e) {
    return ti(this, e);
  }
  describe(e, i) {
    return $s(ar, e, i);
  }
  override(e, i) {
    return $s(bt, e, i);
  }
  route(e, i, s, r) {
    const n = ti(this, e), a = ti(this, s), o = "_" + i;
    Object.defineProperties(n, {
      [o]: {
        value: n[i],
        writable: !0
      },
      [i]: {
        enumerable: !0,
        get() {
          const l = this[o], d = a[r];
          return X(l) ? Object.assign({}, d, l) : W(l, d);
        },
        set(l) {
          this[o] = l;
        }
      }
    });
  }
  apply(e) {
    e.forEach((i) => i(this));
  }
}
var ae = /* @__PURE__ */ new Rh({
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
  Th,
  Lh,
  Oh
]);
function Ih(t) {
  return !t || K(t.size) || K(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
}
function es(t, e, i, s, r) {
  let n = e[r];
  return n || (n = e[r] = t.measureText(r).width, i.push(r)), n > s && (s = n), s;
}
function Nh(t, e, i, s) {
  s = s || {};
  let r = s.data = s.data || {}, n = s.garbageCollect = s.garbageCollect || [];
  s.font !== e && (r = s.data = {}, n = s.garbageCollect = [], s.font = e), t.save(), t.font = e;
  let a = 0;
  const o = i.length;
  let l, d, c, h, u;
  for (l = 0; l < o; l++)
    if (h = i[l], h != null && !oe(h))
      a = es(t, r, n, a, h);
    else if (oe(h))
      for (d = 0, c = h.length; d < c; d++)
        u = h[d], u != null && !oe(u) && (a = es(t, r, n, a, u));
  t.restore();
  const g = n.length / 2;
  if (g > i.length) {
    for (l = 0; l < g; l++)
      delete r[n[l]];
    n.splice(0, g);
  }
  return a;
}
function dt(t, e, i) {
  const s = t.currentDevicePixelRatio, r = i !== 0 ? Math.max(i / 2, 0.5) : 0;
  return Math.round((e - r) * s) / s + r;
}
function Cn(t, e) {
  !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
}
function lr(t, e, i, s) {
  Ca(t, e, i, s, null);
}
function Ca(t, e, i, s, r) {
  let n, a, o, l, d, c, h, u;
  const g = e.pointStyle, _ = e.rotation, f = e.radius;
  let p = (_ || 0) * vh;
  if (g && typeof g == "object" && (n = g.toString(), n === "[object HTMLImageElement]" || n === "[object HTMLCanvasElement]")) {
    t.save(), t.translate(i, s), t.rotate(p), t.drawImage(g, -g.width / 2, -g.height / 2, g.width, g.height), t.restore();
    return;
  }
  if (!(isNaN(f) || f <= 0)) {
    switch (t.beginPath(), g) {
      // Default includes circle
      default:
        r ? t.ellipse(i, s, r / 2, f, 0, 0, re) : t.arc(i, s, f, 0, re), t.closePath();
        break;
      case "triangle":
        c = r ? r / 2 : f, t.moveTo(i + Math.sin(p) * c, s - Math.cos(p) * f), p += yn, t.lineTo(i + Math.sin(p) * c, s - Math.cos(p) * f), p += yn, t.lineTo(i + Math.sin(p) * c, s - Math.cos(p) * f), t.closePath();
        break;
      case "rectRounded":
        d = f * 0.516, l = f - d, a = Math.cos(p + lt) * l, h = Math.cos(p + lt) * (r ? r / 2 - d : l), o = Math.sin(p + lt) * l, u = Math.sin(p + lt) * (r ? r / 2 - d : l), t.arc(i - h, s - o, d, p - ee, p - ce), t.arc(i + u, s - a, d, p - ce, p), t.arc(i + h, s + o, d, p, p + ce), t.arc(i - u, s + a, d, p + ce, p + ee), t.closePath();
        break;
      case "rect":
        if (!_) {
          l = Math.SQRT1_2 * f, c = r ? r / 2 : l, t.rect(i - c, s - l, 2 * c, 2 * l);
          break;
        }
        p += lt;
      /* falls through */
      case "rectRot":
        h = Math.cos(p) * (r ? r / 2 : f), a = Math.cos(p) * f, o = Math.sin(p) * f, u = Math.sin(p) * (r ? r / 2 : f), t.moveTo(i - h, s - o), t.lineTo(i + u, s - a), t.lineTo(i + h, s + o), t.lineTo(i - u, s + a), t.closePath();
        break;
      case "crossRot":
        p += lt;
      /* falls through */
      case "cross":
        h = Math.cos(p) * (r ? r / 2 : f), a = Math.cos(p) * f, o = Math.sin(p) * f, u = Math.sin(p) * (r ? r / 2 : f), t.moveTo(i - h, s - o), t.lineTo(i + h, s + o), t.moveTo(i + u, s - a), t.lineTo(i - u, s + a);
        break;
      case "star":
        h = Math.cos(p) * (r ? r / 2 : f), a = Math.cos(p) * f, o = Math.sin(p) * f, u = Math.sin(p) * (r ? r / 2 : f), t.moveTo(i - h, s - o), t.lineTo(i + h, s + o), t.moveTo(i + u, s - a), t.lineTo(i - u, s + a), p += lt, h = Math.cos(p) * (r ? r / 2 : f), a = Math.cos(p) * f, o = Math.sin(p) * f, u = Math.sin(p) * (r ? r / 2 : f), t.moveTo(i - h, s - o), t.lineTo(i + h, s + o), t.moveTo(i + u, s - a), t.lineTo(i - u, s + a);
        break;
      case "line":
        a = r ? r / 2 : Math.cos(p) * f, o = Math.sin(p) * f, t.moveTo(i - a, s - o), t.lineTo(i + a, s + o);
        break;
      case "dash":
        t.moveTo(i, s), t.lineTo(i + Math.cos(p) * (r ? r / 2 : f), s + Math.sin(p) * f);
        break;
      case !1:
        t.closePath();
        break;
    }
    t.fill(), e.borderWidth > 0 && t.stroke();
  }
}
function qe(t, e, i) {
  return i = i || 0.5, !e || t && t.x > e.left - i && t.x < e.right + i && t.y > e.top - i && t.y < e.bottom + i;
}
function ds(t, e) {
  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
}
function cs(t) {
  t.restore();
}
function Bh(t, e, i, s, r) {
  if (!e)
    return t.lineTo(i.x, i.y);
  if (r === "middle") {
    const n = (e.x + i.x) / 2;
    t.lineTo(n, e.y), t.lineTo(n, i.y);
  } else r === "after" != !!s ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y);
  t.lineTo(i.x, i.y);
}
function Hh(t, e, i, s) {
  if (!e)
    return t.lineTo(i.x, i.y);
  t.bezierCurveTo(s ? e.cp1x : e.cp2x, s ? e.cp1y : e.cp2y, s ? i.cp2x : i.cp1x, s ? i.cp2y : i.cp1y, i.x, i.y);
}
function Fh(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]), K(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
}
function Gh(t, e, i, s, r) {
  if (r.strikethrough || r.underline) {
    const n = t.measureText(s), a = e - n.actualBoundingBoxLeft, o = e + n.actualBoundingBoxRight, l = i - n.actualBoundingBoxAscent, d = i + n.actualBoundingBoxDescent, c = r.strikethrough ? (l + d) / 2 : d;
    t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = r.decorationWidth || 2, t.moveTo(a, c), t.lineTo(o, c), t.stroke();
  }
}
function jh(t, e) {
  const i = t.fillStyle;
  t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = i;
}
function xt(t, e, i, s, r, n = {}) {
  const a = oe(e) ? e : [
    e
  ], o = n.strokeWidth > 0 && n.strokeColor !== "";
  let l, d;
  for (t.save(), t.font = r.string, Fh(t, n), l = 0; l < a.length; ++l)
    d = a[l], n.backdrop && jh(t, n.backdrop), o && (n.strokeColor && (t.strokeStyle = n.strokeColor), K(n.strokeWidth) || (t.lineWidth = n.strokeWidth), t.strokeText(d, i, s, n.maxWidth)), t.fillText(d, i, s, n.maxWidth), Gh(t, i, s, d, n), s += Number(r.lineHeight);
  t.restore();
}
function hi(t, e) {
  const { x: i, y: s, w: r, h: n, radius: a } = e;
  t.arc(i + a.topLeft, s + a.topLeft, a.topLeft, 1.5 * ee, ee, !0), t.lineTo(i, s + n - a.bottomLeft), t.arc(i + a.bottomLeft, s + n - a.bottomLeft, a.bottomLeft, ee, ce, !0), t.lineTo(i + r - a.bottomRight, s + n), t.arc(i + r - a.bottomRight, s + n - a.bottomRight, a.bottomRight, ce, 0, !0), t.lineTo(i + r, s + a.topRight), t.arc(i + r - a.topRight, s + a.topRight, a.topRight, 0, -ce, !0), t.lineTo(i + a.topLeft, s);
}
const Uh = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Vh = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Wh(t, e) {
  const i = ("" + t).match(Uh);
  if (!i || i[1] === "normal")
    return e * 1.2;
  switch (t = +i[2], i[3]) {
    case "px":
      return t;
    case "%":
      t /= 100;
      break;
  }
  return e * t;
}
const Kh = (t) => +t || 0;
function Tr(t, e) {
  const i = {}, s = X(e), r = s ? Object.keys(e) : e, n = X(t) ? s ? (a) => W(t[a], t[e[a]]) : (a) => t[a] : () => t;
  for (const a of r)
    i[a] = Kh(n(a));
  return i;
}
function Pa(t) {
  return Tr(t, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function pt(t) {
  return Tr(t, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function be(t) {
  const e = Pa(t);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function ge(t, e) {
  t = t || {}, e = e || ae.font;
  let i = W(t.size, e.size);
  typeof i == "string" && (i = parseInt(i, 10));
  let s = W(t.style, e.style);
  s && !("" + s).match(Vh) && (console.warn('Invalid font style specified: "' + s + '"'), s = void 0);
  const r = {
    family: W(t.family, e.family),
    lineHeight: Wh(W(t.lineHeight, e.lineHeight), i),
    size: i,
    style: s,
    weight: W(t.weight, e.weight),
    string: ""
  };
  return r.string = Ih(r), r;
}
function Wt(t, e, i, s) {
  let r, n, a;
  for (r = 0, n = t.length; r < n; ++r)
    if (a = t[r], a !== void 0 && a !== void 0)
      return a;
}
function Yh(t, e, i) {
  const { min: s, max: r } = t, n = pa(e, (r - s) / 2), a = (o, l) => i && o === 0 ? 0 : o + l;
  return {
    min: a(s, -Math.abs(n)),
    max: a(r, n)
  };
}
function ot(t, e) {
  return Object.assign(Object.create(t), e);
}
function Lr(t, e = [
  ""
], i, s, r = () => t[0]) {
  const n = i || t;
  typeof s > "u" && (s = La("_fallback", t));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: n,
    _fallback: s,
    _getTarget: r,
    override: (o) => Lr([
      o,
      ...t
    ], e, n, s)
  };
  return new Proxy(a, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, l) {
      return delete o[l], delete o._keys, delete t[0][l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, l) {
      return $a(o, l, () => iu(l, e, t, o));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, l) {
      return Reflect.getOwnPropertyDescriptor(o._scopes[0], l);
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
    has(o, l) {
      return Mn(o).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(o) {
      return Mn(o);
    },
    /**
    * A trap for setting property values.
    */
    set(o, l, d) {
      const c = o._storage || (o._storage = r());
      return o[l] = c[l] = d, delete o._keys, !0;
    }
  });
}
function zt(t, e, i, s) {
  const r = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: i,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Ma(t, s),
    setContext: (n) => zt(t, n, i, s),
    override: (n) => zt(t.override(n), e, i, s)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(n, a) {
      return delete n[a], delete t[a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(n, a, o) {
      return $a(n, a, () => qh(n, a, o));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(n, a) {
      return n._descriptors.allKeys ? Reflect.has(t, a) ? {
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
    has(n, a) {
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
    set(n, a, o) {
      return t[a] = o, delete n[a], !0;
    }
  });
}
function Ma(t, e = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: i = e.scriptable, _indexable: s = e.indexable, _allKeys: r = e.allKeys } = t;
  return {
    allKeys: r,
    scriptable: i,
    indexable: s,
    isScriptable: nt(i) ? i : () => i,
    isIndexable: nt(s) ? s : () => s
  };
}
const Xh = (t, e) => t ? t + Er(e) : e, Dr = (t, e) => X(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function $a(t, e, i) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const s = i();
  return t[e] = s, s;
}
function qh(t, e, i) {
  const { _proxy: s, _context: r, _subProxy: n, _descriptors: a } = t;
  let o = s[e];
  return nt(o) && a.isScriptable(e) && (o = Zh(e, o, t, i)), oe(o) && o.length && (o = Jh(e, o, t, a.isIndexable)), Dr(e, o) && (o = zt(o, r, n && n[e], a)), o;
}
function Zh(t, e, i, s) {
  const { _proxy: r, _context: n, _subProxy: a, _stack: o } = i;
  if (o.has(t))
    throw new Error("Recursion detected: " + Array.from(o).join("->") + "->" + t);
  o.add(t);
  let l = e(n, a || s);
  return o.delete(t), Dr(t, l) && (l = zr(r._scopes, r, t, l)), l;
}
function Jh(t, e, i, s) {
  const { _proxy: r, _context: n, _subProxy: a, _descriptors: o } = i;
  if (typeof n.index < "u" && s(t))
    return e[n.index % e.length];
  if (X(e[0])) {
    const l = e, d = r._scopes.filter((c) => c !== l);
    e = [];
    for (const c of l) {
      const h = zr(d, r, t, c);
      e.push(zt(h, n, a && a[t], o));
    }
  }
  return e;
}
function Ta(t, e, i) {
  return nt(t) ? t(e, i) : t;
}
const Qh = (t, e) => t === !0 ? e : typeof t == "string" ? rt(e, t) : void 0;
function eu(t, e, i, s, r) {
  for (const n of e) {
    const a = Qh(i, n);
    if (a) {
      t.add(a);
      const o = Ta(a._fallback, i, r);
      if (typeof o < "u" && o !== i && o !== s)
        return o;
    } else if (a === !1 && typeof s < "u" && i !== s)
      return null;
  }
  return !1;
}
function zr(t, e, i, s) {
  const r = e._rootScopes, n = Ta(e._fallback, i, s), a = [
    ...t,
    ...r
  ], o = /* @__PURE__ */ new Set();
  o.add(s);
  let l = Pn(o, a, i, n || i, s);
  return l === null || typeof n < "u" && n !== i && (l = Pn(o, a, n, l, s), l === null) ? !1 : Lr(Array.from(o), [
    ""
  ], r, n, () => tu(e, i, s));
}
function Pn(t, e, i, s, r) {
  for (; i; )
    i = eu(t, e, i, s, r);
  return i;
}
function tu(t, e, i) {
  const s = t._getTarget();
  e in s || (s[e] = {});
  const r = s[e];
  return oe(r) && X(i) ? i : r || {};
}
function iu(t, e, i, s) {
  let r;
  for (const n of e)
    if (r = La(Xh(n, t), i), typeof r < "u")
      return Dr(t, r) ? zr(i, s, t, r) : r;
}
function La(t, e) {
  for (const i of e) {
    if (!i)
      continue;
    const s = i[t];
    if (typeof s < "u")
      return s;
  }
}
function Mn(t) {
  let e = t._keys;
  return e || (e = t._keys = su(t._scopes)), e;
}
function su(t) {
  const e = /* @__PURE__ */ new Set();
  for (const i of t)
    for (const s of Object.keys(i).filter((r) => !r.startsWith("_")))
      e.add(s);
  return Array.from(e);
}
function Da(t, e, i, s) {
  const { iScale: r } = t, { key: n = "r" } = this._parsing, a = new Array(s);
  let o, l, d, c;
  for (o = 0, l = s; o < l; ++o)
    d = o + i, c = e[d], a[o] = {
      r: r.parse(rt(c, n), d)
    };
  return a;
}
const ru = Number.EPSILON || 1e-14, Ot = (t, e) => e < t.length && !t[e].skip && t[e], za = (t) => t === "x" ? "y" : "x";
function nu(t, e, i, s) {
  const r = t.skip ? e : t, n = e, a = i.skip ? e : i, o = or(n, r), l = or(a, n);
  let d = o / (o + l), c = l / (o + l);
  d = isNaN(d) ? 0 : d, c = isNaN(c) ? 0 : c;
  const h = s * d, u = s * c;
  return {
    previous: {
      x: n.x - h * (a.x - r.x),
      y: n.y - h * (a.y - r.y)
    },
    next: {
      x: n.x + u * (a.x - r.x),
      y: n.y + u * (a.y - r.y)
    }
  };
}
function ou(t, e, i) {
  const s = t.length;
  let r, n, a, o, l, d = Ot(t, 0);
  for (let c = 0; c < s - 1; ++c)
    if (l = d, d = Ot(t, c + 1), !(!l || !d)) {
      if (Qt(e[c], 0, ru)) {
        i[c] = i[c + 1] = 0;
        continue;
      }
      r = i[c] / e[c], n = i[c + 1] / e[c], o = Math.pow(r, 2) + Math.pow(n, 2), !(o <= 9) && (a = 3 / Math.sqrt(o), i[c] = r * a * e[c], i[c + 1] = n * a * e[c]);
    }
}
function au(t, e, i = "x") {
  const s = za(i), r = t.length;
  let n, a, o, l = Ot(t, 0);
  for (let d = 0; d < r; ++d) {
    if (a = o, o = l, l = Ot(t, d + 1), !o)
      continue;
    const c = o[i], h = o[s];
    a && (n = (c - a[i]) / 3, o[`cp1${i}`] = c - n, o[`cp1${s}`] = h - n * e[d]), l && (n = (l[i] - c) / 3, o[`cp2${i}`] = c + n, o[`cp2${s}`] = h + n * e[d]);
  }
}
function lu(t, e = "x") {
  const i = za(e), s = t.length, r = Array(s).fill(0), n = Array(s);
  let a, o, l, d = Ot(t, 0);
  for (a = 0; a < s; ++a)
    if (o = l, l = d, d = Ot(t, a + 1), !!l) {
      if (d) {
        const c = d[e] - l[e];
        r[a] = c !== 0 ? (d[i] - l[i]) / c : 0;
      }
      n[a] = o ? d ? je(r[a - 1]) !== je(r[a]) ? 0 : (r[a - 1] + r[a]) / 2 : r[a - 1] : r[a];
    }
  ou(t, r, n), au(t, n, e);
}
function Ei(t, e, i) {
  return Math.max(Math.min(t, i), e);
}
function du(t, e) {
  let i, s, r, n, a, o = qe(t[0], e);
  for (i = 0, s = t.length; i < s; ++i)
    a = n, n = o, o = i < s - 1 && qe(t[i + 1], e), n && (r = t[i], a && (r.cp1x = Ei(r.cp1x, e.left, e.right), r.cp1y = Ei(r.cp1y, e.top, e.bottom)), o && (r.cp2x = Ei(r.cp2x, e.left, e.right), r.cp2y = Ei(r.cp2y, e.top, e.bottom)));
}
function cu(t, e, i, s, r) {
  let n, a, o, l;
  if (e.spanGaps && (t = t.filter((d) => !d.skip)), e.cubicInterpolationMode === "monotone")
    lu(t, r);
  else {
    let d = s ? t[t.length - 1] : t[0];
    for (n = 0, a = t.length; n < a; ++n)
      o = t[n], l = nu(d, o, t[Math.min(n + 1, a - (s ? 0 : 1)) % a], e.tension), o.cp1x = l.previous.x, o.cp1y = l.previous.y, o.cp2x = l.next.x, o.cp2y = l.next.y, d = o;
  }
  e.capBezierPoints && du(t, i);
}
function Or() {
  return typeof window < "u" && typeof document < "u";
}
function Rr(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function ts(t, e, i) {
  let s;
  return typeof t == "string" ? (s = parseInt(t, 10), t.indexOf("%") !== -1 && (s = s / 100 * e.parentNode[i])) : s = t, s;
}
const hs = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function hu(t, e) {
  return hs(t).getPropertyValue(e);
}
const uu = [
  "top",
  "right",
  "bottom",
  "left"
];
function mt(t, e, i) {
  const s = {};
  i = i ? "-" + i : "";
  for (let r = 0; r < 4; r++) {
    const n = uu[r];
    s[n] = parseFloat(t[e + "-" + n + i]) || 0;
  }
  return s.width = s.left + s.right, s.height = s.top + s.bottom, s;
}
const gu = (t, e, i) => (t > 0 || e > 0) && (!i || !i.shadowRoot);
function _u(t, e) {
  const i = t.touches, s = i && i.length ? i[0] : t, { offsetX: r, offsetY: n } = s;
  let a = !1, o, l;
  if (gu(r, n, t.target))
    o = r, l = n;
  else {
    const d = e.getBoundingClientRect();
    o = s.clientX - d.left, l = s.clientY - d.top, a = !0;
  }
  return {
    x: o,
    y: l,
    box: a
  };
}
function ut(t, e) {
  if ("native" in t)
    return t;
  const { canvas: i, currentDevicePixelRatio: s } = e, r = hs(i), n = r.boxSizing === "border-box", a = mt(r, "padding"), o = mt(r, "border", "width"), { x: l, y: d, box: c } = _u(t, i), h = a.left + (c && o.left), u = a.top + (c && o.top);
  let { width: g, height: _ } = e;
  return n && (g -= a.width + o.width, _ -= a.height + o.height), {
    x: Math.round((l - h) / g * i.width / s),
    y: Math.round((d - u) / _ * i.height / s)
  };
}
function fu(t, e, i) {
  let s, r;
  if (e === void 0 || i === void 0) {
    const n = t && Rr(t);
    if (!n)
      e = t.clientWidth, i = t.clientHeight;
    else {
      const a = n.getBoundingClientRect(), o = hs(n), l = mt(o, "border", "width"), d = mt(o, "padding");
      e = a.width - d.width - l.width, i = a.height - d.height - l.height, s = ts(o.maxWidth, n, "clientWidth"), r = ts(o.maxHeight, n, "clientHeight");
    }
  }
  return {
    width: e,
    height: i,
    maxWidth: s || Qi,
    maxHeight: r || Qi
  };
}
const Ci = (t) => Math.round(t * 10) / 10;
function pu(t, e, i, s) {
  const r = hs(t), n = mt(r, "margin"), a = ts(r.maxWidth, t, "clientWidth") || Qi, o = ts(r.maxHeight, t, "clientHeight") || Qi, l = fu(t, e, i);
  let { width: d, height: c } = l;
  if (r.boxSizing === "content-box") {
    const u = mt(r, "border", "width"), g = mt(r, "padding");
    d -= g.width + u.width, c -= g.height + u.height;
  }
  return d = Math.max(0, d - n.width), c = Math.max(0, s ? d / s : c - n.height), d = Ci(Math.min(d, a, l.maxWidth)), c = Ci(Math.min(c, o, l.maxHeight)), d && !c && (c = Ci(d / 2)), (e !== void 0 || i !== void 0) && s && l.height && c > l.height && (c = l.height, d = Ci(Math.floor(c * s))), {
    width: d,
    height: c
  };
}
function $n(t, e, i) {
  const s = e || 1, r = Math.floor(t.height * s), n = Math.floor(t.width * s);
  t.height = Math.floor(t.height), t.width = Math.floor(t.width);
  const a = t.canvas;
  return a.style && (i || !a.style.height && !a.style.width) && (a.style.height = `${t.height}px`, a.style.width = `${t.width}px`), t.currentDevicePixelRatio !== s || a.height !== r || a.width !== n ? (t.currentDevicePixelRatio = s, a.height = r, a.width = n, t.ctx.setTransform(s, 0, 0, s, 0, 0), !0) : !1;
}
const mu = (function() {
  let t = !1;
  try {
    const e = {
      get passive() {
        return t = !0, !1;
      }
    };
    Or() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return t;
})();
function Tn(t, e) {
  const i = hu(t, e), s = i && i.match(/^(\d+)(\.\d+)?px$/);
  return s ? +s[1] : void 0;
}
function gt(t, e, i, s) {
  return {
    x: t.x + i * (e.x - t.x),
    y: t.y + i * (e.y - t.y)
  };
}
function vu(t, e, i, s) {
  return {
    x: t.x + i * (e.x - t.x),
    y: s === "middle" ? i < 0.5 ? t.y : e.y : s === "after" ? i < 1 ? t.y : e.y : i > 0 ? e.y : t.y
  };
}
function yu(t, e, i, s) {
  const r = {
    x: t.cp2x,
    y: t.cp2y
  }, n = {
    x: e.cp1x,
    y: e.cp1y
  }, a = gt(t, r, i), o = gt(r, n, i), l = gt(n, e, i), d = gt(a, o, i), c = gt(o, l, i);
  return gt(d, c, i);
}
const bu = function(t, e) {
  return {
    x(i) {
      return t + t + e - i;
    },
    setWidth(i) {
      e = i;
    },
    textAlign(i) {
      return i === "center" ? i : i === "right" ? "left" : "right";
    },
    xPlus(i, s) {
      return i - s;
    },
    leftForLtr(i, s) {
      return i - s;
    }
  };
}, xu = function() {
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
function Pt(t, e, i) {
  return t ? bu(e, i) : xu();
}
function Oa(t, e) {
  let i, s;
  (e === "ltr" || e === "rtl") && (i = t.canvas.style, s = [
    i.getPropertyValue("direction"),
    i.getPropertyPriority("direction")
  ], i.setProperty("direction", e, "important"), t.prevTextDirection = s);
}
function Ra(t, e) {
  e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
}
function Ia(t) {
  return t === "angle" ? {
    between: ci,
    compare: wh,
    normalize: ve
  } : {
    between: Ye,
    compare: (e, i) => e - i,
    normalize: (e) => e
  };
}
function Ln({ start: t, end: e, count: i, loop: s, style: r }) {
  return {
    start: t % i,
    end: e % i,
    loop: s && (e - t + 1) % i === 0,
    style: r
  };
}
function wu(t, e, i) {
  const { property: s, start: r, end: n } = i, { between: a, normalize: o } = Ia(s), l = e.length;
  let { start: d, end: c, loop: h } = t, u, g;
  if (h) {
    for (d += l, c += l, u = 0, g = l; u < g && a(o(e[d % l][s]), r, n); ++u)
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
function Na(t, e, i) {
  if (!i)
    return [
      t
    ];
  const { property: s, start: r, end: n } = i, a = e.length, { compare: o, between: l, normalize: d } = Ia(s), { start: c, end: h, loop: u, style: g } = wu(t, e, i), _ = [];
  let f = !1, p = null, m, v, E;
  const C = () => l(r, E, m) && o(r, E) !== 0, x = () => o(n, m) === 0 || l(n, E, m), k = () => f || C(), w = () => !f || x();
  for (let b = c, A = c; b <= h; ++b)
    v = e[b % a], !v.skip && (m = d(v[s]), m !== E && (f = l(m, r, n), p === null && k() && (p = o(m, r) === 0 ? b : A), p !== null && w() && (_.push(Ln({
      start: p,
      end: b,
      loop: u,
      count: a,
      style: g
    })), p = null), A = b, E = m));
  return p !== null && _.push(Ln({
    start: p,
    end: h,
    loop: u,
    count: a,
    style: g
  })), _;
}
function Ba(t, e) {
  const i = [], s = t.segments;
  for (let r = 0; r < s.length; r++) {
    const n = Na(s[r], t.points, e);
    n.length && i.push(...n);
  }
  return i;
}
function ku(t, e, i, s) {
  let r = 0, n = e - 1;
  if (i && !s)
    for (; r < e && !t[r].skip; )
      r++;
  for (; r < e && t[r].skip; )
    r++;
  for (r %= e, i && (n += r); n > r && t[n % e].skip; )
    n--;
  return n %= e, {
    start: r,
    end: n
  };
}
function Su(t, e, i, s) {
  const r = t.length, n = [];
  let a = e, o = t[e], l;
  for (l = e + 1; l <= i; ++l) {
    const d = t[l % r];
    d.skip || d.stop ? o.skip || (s = !1, n.push({
      start: e % r,
      end: (l - 1) % r,
      loop: s
    }), e = a = d.stop ? l : null) : (a = l, o.skip && (e = l)), o = d;
  }
  return a !== null && n.push({
    start: e % r,
    end: a % r,
    loop: s
  }), n;
}
function Au(t, e) {
  const i = t.points, s = t.options.spanGaps, r = i.length;
  if (!r)
    return [];
  const n = !!t._loop, { start: a, end: o } = ku(i, r, n, s);
  if (s === !0)
    return Dn(t, [
      {
        start: a,
        end: o,
        loop: n
      }
    ], i, e);
  const l = o < a ? o + r : o, d = !!t._fullLoop && a === 0 && o === r - 1;
  return Dn(t, Su(i, a, l, d), i, e);
}
function Dn(t, e, i, s) {
  return !s || !s.setContext || !i ? e : Eu(t, e, i, s);
}
function Eu(t, e, i, s) {
  const r = t._chart.getContext(), n = zn(t.options), { _datasetIndex: a, options: { spanGaps: o } } = t, l = i.length, d = [];
  let c = n, h = e[0].start, u = h;
  function g(_, f, p, m) {
    const v = o ? -1 : 1;
    if (_ !== f) {
      for (_ += l; i[_ % l].skip; )
        _ -= v;
      for (; i[f % l].skip; )
        f += v;
      _ % l !== f % l && (d.push({
        start: _ % l,
        end: f % l,
        loop: p,
        style: m
      }), c = m, h = f % l);
    }
  }
  for (const _ of e) {
    h = o ? h : _.start;
    let f = i[h % l], p;
    for (u = h + 1; u <= _.end; u++) {
      const m = i[u % l];
      p = zn(s.setContext(ot(r, {
        type: "segment",
        p0: f,
        p1: m,
        p0DataIndex: (u - 1) % l,
        p1DataIndex: u % l,
        datasetIndex: a
      }))), Cu(p, c) && g(h, u - 1, _.loop, c), f = m, c = p;
    }
    h < u - 1 && g(h, u - 1, _.loop, c);
  }
  return d;
}
function zn(t) {
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
function Cu(t, e) {
  if (!e)
    return !1;
  const i = [], s = function(r, n) {
    return $r(n) ? (i.includes(n) || i.push(n), i.indexOf(n)) : n;
  };
  return JSON.stringify(t, s) !== JSON.stringify(e, s);
}
function Pi(t, e, i) {
  return t.options.clip ? t[i] : e[i];
}
function Pu(t, e) {
  const { xScale: i, yScale: s } = t;
  return i && s ? {
    left: Pi(i, e, "left"),
    right: Pi(i, e, "right"),
    top: Pi(s, e, "top"),
    bottom: Pi(s, e, "bottom")
  } : e;
}
function Ha(t, e) {
  const i = e._clip;
  if (i.disabled)
    return !1;
  const s = Pu(e, t.chartArea);
  return {
    left: i.left === !1 ? 0 : s.left - (i.left === !0 ? 0 : i.left),
    right: i.right === !1 ? t.width : s.right + (i.right === !0 ? 0 : i.right),
    top: i.top === !1 ? 0 : s.top - (i.top === !0 ? 0 : i.top),
    bottom: i.bottom === !1 ? t.height : s.bottom + (i.bottom === !0 ? 0 : i.bottom)
  };
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class Mu {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(e, i, s, r) {
    const n = i.listeners[r], a = i.duration;
    n.forEach((o) => o({
      chart: e,
      initial: i.initial,
      numSteps: a,
      currentStep: Math.min(s - i.start, a)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = wa.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(e = Date.now()) {
    let i = 0;
    this._charts.forEach((s, r) => {
      if (!s.running || !s.items.length)
        return;
      const n = s.items;
      let a = n.length - 1, o = !1, l;
      for (; a >= 0; --a)
        l = n[a], l._active ? (l._total > s.duration && (s.duration = l._total), l.tick(e), o = !0) : (n[a] = n[n.length - 1], n.pop());
      o && (r.draw(), this._notify(r, s, e, "progress")), n.length || (s.running = !1, this._notify(r, s, e, "complete"), s.initial = !1), i += n.length;
    }), this._lastDate = e, i === 0 && (this._running = !1);
  }
  _getAnims(e) {
    const i = this._charts;
    let s = i.get(e);
    return s || (s = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, i.set(e, s)), s;
  }
  listen(e, i, s) {
    this._getAnims(e).listeners[i].push(s);
  }
  add(e, i) {
    !i || !i.length || this._getAnims(e).items.push(...i);
  }
  has(e) {
    return this._getAnims(e).items.length > 0;
  }
  start(e) {
    const i = this._charts.get(e);
    i && (i.running = !0, i.start = Date.now(), i.duration = i.items.reduce((s, r) => Math.max(s, r._duration), 0), this._refresh());
  }
  running(e) {
    if (!this._running)
      return !1;
    const i = this._charts.get(e);
    return !(!i || !i.running || !i.items.length);
  }
  stop(e) {
    const i = this._charts.get(e);
    if (!i || !i.items.length)
      return;
    const s = i.items;
    let r = s.length - 1;
    for (; r >= 0; --r)
      s[r].cancel();
    i.items = [], this._notify(e, i, Date.now(), "complete");
  }
  remove(e) {
    return this._charts.delete(e);
  }
}
var Ve = /* @__PURE__ */ new Mu();
const On = "transparent", $u = {
  boolean(t, e, i) {
    return i > 0.5 ? e : t;
  },
  color(t, e, i) {
    const s = An(t || On), r = s.valid && An(e || On);
    return r && r.valid ? r.mix(s, i).hexString() : e;
  },
  number(t, e, i) {
    return t + (e - t) * i;
  }
};
class Tu {
  constructor(e, i, s, r) {
    const n = i[s];
    r = Wt([
      e.to,
      r,
      n,
      e.from
    ]);
    const a = Wt([
      e.from,
      n,
      r
    ]);
    this._active = !0, this._fn = e.fn || $u[e.type || typeof a], this._easing = ei[e.easing] || ei.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = i, this._prop = s, this._from = a, this._to = r, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, i, s) {
    if (this._active) {
      this._notify(!1);
      const r = this._target[this._prop], n = s - this._start, a = this._duration - n;
      this._start = s, this._duration = Math.floor(Math.max(a, e.duration)), this._total += n, this._loop = !!e.loop, this._to = Wt([
        e.to,
        i,
        r,
        e.from
      ]), this._from = Wt([
        e.from,
        r,
        i
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(e) {
    const i = e - this._start, s = this._duration, r = this._prop, n = this._from, a = this._loop, o = this._to;
    let l;
    if (this._active = n !== o && (a || i < s), !this._active) {
      this._target[r] = o, this._notify(!0);
      return;
    }
    if (i < 0) {
      this._target[r] = n;
      return;
    }
    l = i / s % 2, l = a && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[r] = this._fn(n, o, l);
  }
  wait() {
    const e = this._promises || (this._promises = []);
    return new Promise((i, s) => {
      e.push({
        res: i,
        rej: s
      });
    });
  }
  _notify(e) {
    const i = e ? "res" : "rej", s = this._promises || [];
    for (let r = 0; r < s.length; r++)
      s[r][i]();
  }
}
class Fa {
  constructor(e, i) {
    this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(i);
  }
  configure(e) {
    if (!X(e))
      return;
    const i = Object.keys(ae.animation), s = this._properties;
    Object.getOwnPropertyNames(e).forEach((r) => {
      const n = e[r];
      if (!X(n))
        return;
      const a = {};
      for (const o of i)
        a[o] = n[o];
      (oe(n.properties) && n.properties || [
        r
      ]).forEach((o) => {
        (o === r || !s.has(o)) && s.set(o, a);
      });
    });
  }
  _animateOptions(e, i) {
    const s = i.options, r = Du(e, s);
    if (!r)
      return [];
    const n = this._createAnimations(r, s);
    return s.$shared && Lu(e.options.$animations, s).then(() => {
      e.options = s;
    }, () => {
    }), n;
  }
  _createAnimations(e, i) {
    const s = this._properties, r = [], n = e.$animations || (e.$animations = {}), a = Object.keys(i), o = Date.now();
    let l;
    for (l = a.length - 1; l >= 0; --l) {
      const d = a[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        r.push(...this._animateOptions(e, i));
        continue;
      }
      const c = i[d];
      let h = n[d];
      const u = s.get(d);
      if (h)
        if (u && h.active()) {
          h.update(u, c, o);
          continue;
        } else
          h.cancel();
      if (!u || !u.duration) {
        e[d] = c;
        continue;
      }
      n[d] = h = new Tu(u, e, d, c), r.push(h);
    }
    return r;
  }
  update(e, i) {
    if (this._properties.size === 0) {
      Object.assign(e, i);
      return;
    }
    const s = this._createAnimations(e, i);
    if (s.length)
      return Ve.add(this._chart, s), !0;
  }
}
function Lu(t, e) {
  const i = [], s = Object.keys(e);
  for (let r = 0; r < s.length; r++) {
    const n = t[s[r]];
    n && n.active() && i.push(n.wait());
  }
  return Promise.all(i);
}
function Du(t, e) {
  if (!e)
    return;
  let i = t.options;
  if (!i) {
    t.options = e;
    return;
  }
  return i.$shared && (t.options = i = Object.assign({}, i, {
    $shared: !1,
    $animations: {}
  })), i;
}
function Rn(t, e) {
  const i = t && t.options || {}, s = i.reverse, r = i.min === void 0 ? e : 0, n = i.max === void 0 ? e : 0;
  return {
    start: s ? n : r,
    end: s ? r : n
  };
}
function zu(t, e, i) {
  if (i === !1)
    return !1;
  const s = Rn(t, i), r = Rn(e, i);
  return {
    top: r.end,
    right: s.end,
    bottom: r.start,
    left: s.start
  };
}
function Ou(t) {
  let e, i, s, r;
  return X(t) ? (e = t.top, i = t.right, s = t.bottom, r = t.left) : e = i = s = r = t, {
    top: e,
    right: i,
    bottom: s,
    left: r,
    disabled: t === !1
  };
}
function Ga(t, e) {
  const i = [], s = t._getSortedDatasetMetas(e);
  let r, n;
  for (r = 0, n = s.length; r < n; ++r)
    i.push(s[r].index);
  return i;
}
function In(t, e, i, s = {}) {
  const r = t.keys, n = s.mode === "single";
  let a, o, l, d;
  if (e === null)
    return;
  let c = !1;
  for (a = 0, o = r.length; a < o; ++a) {
    if (l = +r[a], l === i) {
      if (c = !0, s.all)
        continue;
      break;
    }
    d = t.values[l], de(d) && (n || e === 0 || je(e) === je(d)) && (e += d);
  }
  return !c && !s.all ? 0 : e;
}
function Ru(t, e) {
  const { iScale: i, vScale: s } = e, r = i.axis === "x" ? "x" : "y", n = s.axis === "x" ? "x" : "y", a = Object.keys(t), o = new Array(a.length);
  let l, d, c;
  for (l = 0, d = a.length; l < d; ++l)
    c = a[l], o[l] = {
      [r]: c,
      [n]: t[c]
    };
  return o;
}
function Ts(t, e) {
  const i = t && t.options.stacked;
  return i || i === void 0 && e.stack !== void 0;
}
function Iu(t, e, i) {
  return `${t.id}.${e.id}.${i.stack || i.type}`;
}
function Nu(t) {
  const { min: e, max: i, minDefined: s, maxDefined: r } = t.getUserBounds();
  return {
    min: s ? e : Number.NEGATIVE_INFINITY,
    max: r ? i : Number.POSITIVE_INFINITY
  };
}
function Bu(t, e, i) {
  const s = t[e] || (t[e] = {});
  return s[i] || (s[i] = {});
}
function Nn(t, e, i, s) {
  for (const r of e.getMatchingVisibleMetas(s).reverse()) {
    const n = t[r.index];
    if (i && n > 0 || !i && n < 0)
      return r.index;
  }
  return null;
}
function Bn(t, e) {
  const { chart: i, _cachedMeta: s } = t, r = i._stacks || (i._stacks = {}), { iScale: n, vScale: a, index: o } = s, l = n.axis, d = a.axis, c = Iu(n, a, s), h = e.length;
  let u;
  for (let g = 0; g < h; ++g) {
    const _ = e[g], { [l]: f, [d]: p } = _, m = _._stacks || (_._stacks = {});
    u = m[d] = Bu(r, c, f), u[o] = p, u._top = Nn(u, a, !0, s.type), u._bottom = Nn(u, a, !1, s.type);
    const v = u._visualValues || (u._visualValues = {});
    v[o] = p;
  }
}
function Ls(t, e) {
  const i = t.scales;
  return Object.keys(i).filter((s) => i[s].axis === e).shift();
}
function Hu(t, e) {
  return ot(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function Fu(t, e, i) {
  return ot(t, {
    active: !1,
    dataIndex: e,
    parsed: void 0,
    raw: void 0,
    element: i,
    index: e,
    mode: "default",
    type: "data"
  });
}
function Bt(t, e) {
  const i = t.controller.index, s = t.vScale && t.vScale.axis;
  if (s) {
    e = e || t._parsed;
    for (const r of e) {
      const n = r._stacks;
      if (!n || n[s] === void 0 || n[s][i] === void 0)
        return;
      delete n[s][i], n[s]._visualValues !== void 0 && n[s]._visualValues[i] !== void 0 && delete n[s]._visualValues[i];
    }
  }
}
const Ds = (t) => t === "reset" || t === "none", Hn = (t, e) => e ? t : Object.assign({}, t), Gu = (t, e, i) => t && !e.hidden && e._stacked && {
  keys: Ga(i, !0),
  values: null
};
class Ne {
  constructor(e, i) {
    this.chart = e, this._ctx = e.ctx, this.index = i, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = Ts(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && Bt(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, i = this._cachedMeta, s = this.getDataset(), r = (h, u, g, _) => h === "x" ? u : h === "r" ? _ : g, n = i.xAxisID = W(s.xAxisID, Ls(e, "x")), a = i.yAxisID = W(s.yAxisID, Ls(e, "y")), o = i.rAxisID = W(s.rAxisID, Ls(e, "r")), l = i.indexAxis, d = i.iAxisID = r(l, n, a, o), c = i.vAxisID = r(l, a, n, o);
    i.xScale = this.getScaleForId(n), i.yScale = this.getScaleForId(a), i.rScale = this.getScaleForId(o), i.iScale = this.getScaleForId(d), i.vScale = this.getScaleForId(c);
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
    const i = this._cachedMeta;
    return e === i.iScale ? i.vScale : i.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const e = this._cachedMeta;
    this._data && wn(this._data, this), e._stacked && Bt(e);
  }
  _dataCheck() {
    const e = this.getDataset(), i = e.data || (e.data = []), s = this._data;
    if (X(i)) {
      const r = this._cachedMeta;
      this._data = Ru(i, r);
    } else if (s !== i) {
      if (s) {
        wn(s, this);
        const r = this._cachedMeta;
        Bt(r), r._parsed = [];
      }
      i && Object.isExtensible(i) && Eh(i, this), this._syncList = [], this._data = i;
    }
  }
  addElements() {
    const e = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(e) {
    const i = this._cachedMeta, s = this.getDataset();
    let r = !1;
    this._dataCheck();
    const n = i._stacked;
    i._stacked = Ts(i.vScale, i), i.stack !== s.stack && (r = !0, Bt(i), i.stack = s.stack), this._resyncElements(e), (r || n !== i._stacked) && (Bn(this, i._parsed), i._stacked = Ts(i.vScale, i));
  }
  configure() {
    const e = this.chart.config, i = e.datasetScopeKeys(this._type), s = e.getOptionScopes(this.getDataset(), i, !0);
    this.options = e.createResolver(s, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, i) {
    const { _cachedMeta: s, _data: r } = this, { iScale: n, _stacked: a } = s, o = n.axis;
    let l = e === 0 && i === r.length ? !0 : s._sorted, d = e > 0 && s._parsed[e - 1], c, h, u;
    if (this._parsing === !1)
      s._parsed = r, s._sorted = !0, u = r;
    else {
      oe(r[e]) ? u = this.parseArrayData(s, r, e, i) : X(r[e]) ? u = this.parseObjectData(s, r, e, i) : u = this.parsePrimitiveData(s, r, e, i);
      const g = () => h[o] === null || d && h[o] < d[o];
      for (c = 0; c < i; ++c)
        s._parsed[c + e] = h = u[c], l && (g() && (l = !1), d = h);
      s._sorted = l;
    }
    a && Bn(this, u);
  }
  parsePrimitiveData(e, i, s, r) {
    const { iScale: n, vScale: a } = e, o = n.axis, l = a.axis, d = n.getLabels(), c = n === a, h = new Array(r);
    let u, g, _;
    for (u = 0, g = r; u < g; ++u)
      _ = u + s, h[u] = {
        [o]: c || n.parse(d[_], _),
        [l]: a.parse(i[_], _)
      };
    return h;
  }
  parseArrayData(e, i, s, r) {
    const { xScale: n, yScale: a } = e, o = new Array(r);
    let l, d, c, h;
    for (l = 0, d = r; l < d; ++l)
      c = l + s, h = i[c], o[l] = {
        x: n.parse(h[0], c),
        y: a.parse(h[1], c)
      };
    return o;
  }
  parseObjectData(e, i, s, r) {
    const { xScale: n, yScale: a } = e, { xAxisKey: o = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(r);
    let c, h, u, g;
    for (c = 0, h = r; c < h; ++c)
      u = c + s, g = i[u], d[c] = {
        x: n.parse(rt(g, o), u),
        y: a.parse(rt(g, l), u)
      };
    return d;
  }
  getParsed(e) {
    return this._cachedMeta._parsed[e];
  }
  getDataElement(e) {
    return this._cachedMeta.data[e];
  }
  applyStack(e, i, s) {
    const r = this.chart, n = this._cachedMeta, a = i[e.axis], o = {
      keys: Ga(r, !0),
      values: i._stacks[e.axis]._visualValues
    };
    return In(o, a, n.index, {
      mode: s
    });
  }
  updateRangeFromParsed(e, i, s, r) {
    const n = s[i.axis];
    let a = n === null ? NaN : n;
    const o = r && s._stacks[i.axis];
    r && o && (r.values = o, a = In(r, n, this._cachedMeta.index)), e.min = Math.min(e.min, a), e.max = Math.max(e.max, a);
  }
  getMinMax(e, i) {
    const s = this._cachedMeta, r = s._parsed, n = s._sorted && e === s.iScale, a = r.length, o = this._getOtherScale(e), l = Gu(i, s, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: c, max: h } = Nu(o);
    let u, g;
    function _() {
      g = r[u];
      const f = g[o.axis];
      return !de(g[e.axis]) || c > f || h < f;
    }
    for (u = 0; u < a && !(!_() && (this.updateRangeFromParsed(d, e, g, l), n)); ++u)
      ;
    if (n) {
      for (u = a - 1; u >= 0; --u)
        if (!_()) {
          this.updateRangeFromParsed(d, e, g, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(e) {
    const i = this._cachedMeta._parsed, s = [];
    let r, n, a;
    for (r = 0, n = i.length; r < n; ++r)
      a = i[r][e.axis], de(a) && s.push(a);
    return s;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, s = i.iScale, r = i.vScale, n = this.getParsed(e);
    return {
      label: s ? "" + s.getLabelForValue(n[s.axis]) : "",
      value: r ? "" + r.getLabelForValue(n[r.axis]) : ""
    };
  }
  _update(e) {
    const i = this._cachedMeta;
    this.update(e || "default"), i._clip = Ou(W(this.options.clip, zu(i.xScale, i.yScale, this.getMaxOverflow())));
  }
  update(e) {
  }
  draw() {
    const e = this._ctx, i = this.chart, s = this._cachedMeta, r = s.data || [], n = i.chartArea, a = [], o = this._drawStart || 0, l = this._drawCount || r.length - o, d = this.options.drawActiveElementsOnTop;
    let c;
    for (s.dataset && s.dataset.draw(e, n, o, l), c = o; c < o + l; ++c) {
      const h = r[c];
      h.hidden || (h.active && d ? a.push(h) : h.draw(e, n));
    }
    for (c = 0; c < a.length; ++c)
      a[c].draw(e, n);
  }
  getStyle(e, i) {
    const s = i ? "active" : "default";
    return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(s) : this.resolveDataElementOptions(e || 0, s);
  }
  getContext(e, i, s) {
    const r = this.getDataset();
    let n;
    if (e >= 0 && e < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[e];
      n = a.$context || (a.$context = Fu(this.getContext(), e, a)), n.parsed = this.getParsed(e), n.raw = r.data[e], n.index = n.dataIndex = e;
    } else
      n = this.$context || (this.$context = Hu(this.chart.getContext(), this.index)), n.dataset = r, n.index = n.datasetIndex = this.index;
    return n.active = !!i, n.mode = s, n;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, i) {
    return this._resolveElementOptions(this.dataElementType.id, i, e);
  }
  _resolveElementOptions(e, i = "default", s) {
    const r = i === "active", n = this._cachedDataOpts, a = e + "-" + i, o = n[a], l = this.enableOptionSharing && di(s);
    if (o)
      return Hn(o, l);
    const d = this.chart.config, c = d.datasetElementScopeKeys(this._type, e), h = r ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], u = d.getOptionScopes(this.getDataset(), c), g = Object.keys(ae.elements[e]), _ = () => this.getContext(s, r, i), f = d.resolveNamedOptions(u, g, _, h);
    return f.$shared && (f.$shared = l, n[a] = Object.freeze(Hn(f, l))), f;
  }
  _resolveAnimations(e, i, s) {
    const r = this.chart, n = this._cachedDataOpts, a = `animation-${i}`, o = n[a];
    if (o)
      return o;
    let l;
    if (r.options.animation !== !1) {
      const c = this.chart.config, h = c.datasetAnimationScopeKeys(this._type, i), u = c.getOptionScopes(this.getDataset(), h);
      l = c.createResolver(u, this.getContext(e, s, i));
    }
    const d = new Fa(r, l && l.animations);
    return l && l._cacheable && (n[a] = Object.freeze(d)), d;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, i) {
    return !i || Ds(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, i) {
    const s = this.resolveDataElementOptions(e, i), r = this._sharedOptions, n = this.getSharedOptions(s), a = this.includeOptions(i, n) || n !== r;
    return this.updateSharedOptions(n, i, s), {
      sharedOptions: n,
      includeOptions: a
    };
  }
  updateElement(e, i, s, r) {
    Ds(r) ? Object.assign(e, s) : this._resolveAnimations(i, r).update(e, s);
  }
  updateSharedOptions(e, i, s) {
    e && !Ds(i) && this._resolveAnimations(void 0, i).update(e, s);
  }
  _setStyle(e, i, s, r) {
    e.active = r;
    const n = this.getStyle(i, r);
    this._resolveAnimations(i, s, r).update(e, {
      options: !r && this.getSharedOptions(n) || n
    });
  }
  removeHoverStyle(e, i, s) {
    this._setStyle(e, s, "active", !1);
  }
  setHoverStyle(e, i, s) {
    this._setStyle(e, s, "active", !0);
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
    const i = this._data, s = this._cachedMeta.data;
    for (const [o, l, d] of this._syncList)
      this[o](l, d);
    this._syncList = [];
    const r = s.length, n = i.length, a = Math.min(n, r);
    a && this.parse(0, a), n > r ? this._insertElements(r, n - r, e) : n < r && this._removeElements(n, r - n);
  }
  _insertElements(e, i, s = !0) {
    const r = this._cachedMeta, n = r.data, a = e + i;
    let o;
    const l = (d) => {
      for (d.length += i, o = d.length - 1; o >= a; o--)
        d[o] = d[o - i];
    };
    for (l(n), o = e; o < a; ++o)
      n[o] = new this.dataElementType();
    this._parsing && l(r._parsed), this.parse(e, i), s && this.updateElements(n, e, i, "reset");
  }
  updateElements(e, i, s, r) {
  }
  _removeElements(e, i) {
    const s = this._cachedMeta;
    if (this._parsing) {
      const r = s._parsed.splice(e, i);
      s._stacked && Bt(s, r);
    }
    s.data.splice(e, i);
  }
  _sync(e) {
    if (this._parsing)
      this._syncList.push(e);
    else {
      const [i, s, r] = e;
      this[i](s, r);
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
  _onDataSplice(e, i) {
    i && this._sync([
      "_removeElements",
      e,
      i
    ]);
    const s = arguments.length - 2;
    s && this._sync([
      "_insertElements",
      e,
      s
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
I(Ne, "defaults", {}), I(Ne, "datasetElementType", null), I(Ne, "dataElementType", null);
function ju(t, e) {
  if (!t._cache.$bar) {
    const i = t.getMatchingVisibleMetas(e);
    let s = [];
    for (let r = 0, n = i.length; r < n; r++)
      s = s.concat(i[r].controller.getAllParsedValues(t));
    t._cache.$bar = xa(s.sort((r, n) => r - n));
  }
  return t._cache.$bar;
}
function Uu(t) {
  const e = t.iScale, i = ju(e, t.type);
  let s = e._length, r, n, a, o;
  const l = () => {
    a === 32767 || a === -32768 || (di(o) && (s = Math.min(s, Math.abs(a - o) || s)), o = a);
  };
  for (r = 0, n = i.length; r < n; ++r)
    a = e.getPixelForValue(i[r]), l();
  for (o = void 0, r = 0, n = e.ticks.length; r < n; ++r)
    a = e.getPixelForTick(r), l();
  return s;
}
function Vu(t, e, i, s) {
  const r = i.barThickness;
  let n, a;
  return K(r) ? (n = e.min * i.categoryPercentage, a = i.barPercentage) : (n = r * s, a = 1), {
    chunk: n / s,
    ratio: a,
    start: e.pixels[t] - n / 2
  };
}
function Wu(t, e, i, s) {
  const r = e.pixels, n = r[t];
  let a = t > 0 ? r[t - 1] : null, o = t < r.length - 1 ? r[t + 1] : null;
  const l = i.categoryPercentage;
  a === null && (a = n - (o === null ? e.end - e.start : o - n)), o === null && (o = n + n - a);
  const d = n - (n - Math.min(a, o)) / 2 * l;
  return {
    chunk: Math.abs(o - a) / 2 * l / s,
    ratio: i.barPercentage,
    start: d
  };
}
function Ku(t, e, i, s) {
  const r = i.parse(t[0], s), n = i.parse(t[1], s), a = Math.min(r, n), o = Math.max(r, n);
  let l = a, d = o;
  Math.abs(a) > Math.abs(o) && (l = o, d = a), e[i.axis] = d, e._custom = {
    barStart: l,
    barEnd: d,
    start: r,
    end: n,
    min: a,
    max: o
  };
}
function ja(t, e, i, s) {
  return oe(t) ? Ku(t, e, i, s) : e[i.axis] = i.parse(t, s), e;
}
function Fn(t, e, i, s) {
  const r = t.iScale, n = t.vScale, a = r.getLabels(), o = r === n, l = [];
  let d, c, h, u;
  for (d = i, c = i + s; d < c; ++d)
    u = e[d], h = {}, h[r.axis] = o || r.parse(a[d], d), l.push(ja(u, h, n, d));
  return l;
}
function zs(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function Yu(t, e, i) {
  return t !== 0 ? je(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= i ? 1 : -1);
}
function Xu(t) {
  let e, i, s, r, n;
  return t.horizontal ? (e = t.base > t.x, i = "left", s = "right") : (e = t.base < t.y, i = "bottom", s = "top"), e ? (r = "end", n = "start") : (r = "start", n = "end"), {
    start: i,
    end: s,
    reverse: e,
    top: r,
    bottom: n
  };
}
function qu(t, e, i, s) {
  let r = e.borderSkipped;
  const n = {};
  if (!r) {
    t.borderSkipped = n;
    return;
  }
  if (r === !0) {
    t.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: a, end: o, reverse: l, top: d, bottom: c } = Xu(t);
  r === "middle" && i && (t.enableBorderRadius = !0, (i._top || 0) === s ? r = d : (i._bottom || 0) === s ? r = c : (n[Gn(c, a, o, l)] = !0, r = d)), n[Gn(r, a, o, l)] = !0, t.borderSkipped = n;
}
function Gn(t, e, i, s) {
  return s ? (t = Zu(t, e, i), t = jn(t, i, e)) : t = jn(t, e, i), t;
}
function Zu(t, e, i) {
  return t === e ? i : t === i ? e : t;
}
function jn(t, e, i) {
  return t === "start" ? e : t === "end" ? i : t;
}
function Ju(t, { inflateAmount: e }, i) {
  t.inflateAmount = e === "auto" ? i === 1 ? 0.33 : 0 : e;
}
class Bi extends Ne {
  parsePrimitiveData(e, i, s, r) {
    return Fn(e, i, s, r);
  }
  parseArrayData(e, i, s, r) {
    return Fn(e, i, s, r);
  }
  parseObjectData(e, i, s, r) {
    const { iScale: n, vScale: a } = e, { xAxisKey: o = "x", yAxisKey: l = "y" } = this._parsing, d = n.axis === "x" ? o : l, c = a.axis === "x" ? o : l, h = [];
    let u, g, _, f;
    for (u = s, g = s + r; u < g; ++u)
      f = i[u], _ = {}, _[n.axis] = n.parse(rt(f, d), u), h.push(ja(rt(f, c), _, a, u));
    return h;
  }
  updateRangeFromParsed(e, i, s, r) {
    super.updateRangeFromParsed(e, i, s, r);
    const n = s._custom;
    n && i === this._cachedMeta.vScale && (e.min = Math.min(e.min, n.min), e.max = Math.max(e.max, n.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, { iScale: s, vScale: r } = i, n = this.getParsed(e), a = n._custom, o = zs(a) ? "[" + a.start + ", " + a.end + "]" : "" + r.getLabelForValue(n[r.axis]);
    return {
      label: "" + s.getLabelForValue(n[s.axis]),
      value: o
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const e = this._cachedMeta;
    e.stack = this.getDataset().stack;
  }
  update(e) {
    const i = this._cachedMeta;
    this.updateElements(i.data, 0, i.data.length, e);
  }
  updateElements(e, i, s, r) {
    const n = r === "reset", { index: a, _cachedMeta: { vScale: o } } = this, l = o.getBasePixel(), d = o.isHorizontal(), c = this._getRuler(), { sharedOptions: h, includeOptions: u } = this._getSharedOptions(i, r);
    for (let g = i; g < i + s; g++) {
      const _ = this.getParsed(g), f = n || K(_[o.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(g), p = this._calculateBarIndexPixels(g, c), m = (_._stacks || {})[o.axis], v = {
        horizontal: d,
        base: f.base,
        enableBorderRadius: !m || zs(_._custom) || a === m._top || a === m._bottom,
        x: d ? f.head : p.center,
        y: d ? p.center : f.head,
        height: d ? p.size : Math.abs(f.size),
        width: d ? Math.abs(f.size) : p.size
      };
      u && (v.options = h || this.resolveDataElementOptions(g, e[g].active ? "active" : r));
      const E = v.options || e[g].options;
      qu(v, E, m, a), Ju(v, E, c.ratio), this.updateElement(e[g], g, v, r);
    }
  }
  _getStacks(e, i) {
    const { iScale: s } = this._cachedMeta, r = s.getMatchingVisibleMetas(this._type).filter((c) => c.controller.options.grouped), n = s.options.stacked, a = [], o = this._cachedMeta.controller.getParsed(i), l = o && o[s.axis], d = (c) => {
      const h = c._parsed.find((g) => g[s.axis] === l), u = h && h[c.vScale.axis];
      if (K(u) || isNaN(u))
        return !0;
    };
    for (const c of r)
      if (!(i !== void 0 && d(c)) && ((n === !1 || a.indexOf(c.stack) === -1 || n === void 0 && c.stack === void 0) && a.push(c.stack), c.index === e))
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
    const e = this.chart.scales, i = this.chart.options.indexAxis;
    return Object.keys(e).filter((s) => e[s].axis === i).shift();
  }
  _getAxis() {
    const e = {}, i = this.getFirstScaleIdForIndexAxis();
    for (const s of this.chart.data.datasets)
      e[W(this.chart.options.indexAxis === "x" ? s.xAxisID : s.yAxisID, i)] = !0;
    return Object.keys(e);
  }
  _getStackIndex(e, i, s) {
    const r = this._getStacks(e, s), n = i !== void 0 ? r.indexOf(i) : -1;
    return n === -1 ? r.length - 1 : n;
  }
  _getRuler() {
    const e = this.options, i = this._cachedMeta, s = i.iScale, r = [];
    let n, a;
    for (n = 0, a = i.data.length; n < a; ++n)
      r.push(s.getPixelForValue(this.getParsed(n)[s.axis], n));
    const o = e.barThickness;
    return {
      min: o || Uu(i),
      pixels: r,
      start: s._startPixel,
      end: s._endPixel,
      stackCount: this._getStackCount(),
      scale: s,
      grouped: e.grouped,
      ratio: o ? 1 : e.categoryPercentage * e.barPercentage
    };
  }
  _calculateBarValuePixels(e) {
    const { _cachedMeta: { vScale: i, _stacked: s, index: r }, options: { base: n, minBarLength: a } } = this, o = n || 0, l = this.getParsed(e), d = l._custom, c = zs(d);
    let h = l[i.axis], u = 0, g = s ? this.applyStack(i, l, s) : h, _, f;
    g !== h && (u = g - h, g = h), c && (h = d.barStart, g = d.barEnd - d.barStart, h !== 0 && je(h) !== je(d.barEnd) && (u = 0), u += h);
    const p = !K(n) && !c ? n : u;
    let m = i.getPixelForValue(p);
    if (this.chart.getDataVisibility(e) ? _ = i.getPixelForValue(u + g) : _ = m, f = _ - m, Math.abs(f) < a) {
      f = Yu(f, i, o) * a, h === o && (m -= f / 2);
      const v = i.getPixelForDecimal(0), E = i.getPixelForDecimal(1), C = Math.min(v, E), x = Math.max(v, E);
      m = Math.max(Math.min(m, x), C), _ = m + f, s && !c && (l._stacks[i.axis]._visualValues[r] = i.getValueForPixel(_) - i.getValueForPixel(m));
    }
    if (m === i.getPixelForValue(o)) {
      const v = je(f) * i.getLineWidthForValue(o) / 2;
      m += v, f -= v;
    }
    return {
      size: f,
      base: m,
      head: _,
      center: _ + f / 2
    };
  }
  _calculateBarIndexPixels(e, i) {
    const s = i.scale, r = this.options, n = r.skipNull, a = W(r.maxBarThickness, 1 / 0);
    let o, l;
    const d = this._getAxisCount();
    if (i.grouped) {
      const c = n ? this._getStackCount(e) : i.stackCount, h = r.barThickness === "flex" ? Wu(e, i, r, c * d) : Vu(e, i, r, c * d), u = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, g = this._getAxis().indexOf(W(u, this.getFirstScaleIdForIndexAxis())), _ = this._getStackIndex(this.index, this._cachedMeta.stack, n ? e : void 0) + g;
      o = h.start + h.chunk * _ + h.chunk / 2, l = Math.min(a, h.chunk * h.ratio);
    } else
      o = s.getPixelForValue(this.getParsed(e)[s.axis], e), l = Math.min(a, i.min * i.ratio);
    return {
      base: o - l / 2,
      head: o + l / 2,
      center: o,
      size: l
    };
  }
  draw() {
    const e = this._cachedMeta, i = e.vScale, s = e.data, r = s.length;
    let n = 0;
    for (; n < r; ++n)
      this.getParsed(n)[i.axis] !== null && !s[n].hidden && s[n].draw(this._ctx);
  }
}
I(Bi, "id", "bar"), I(Bi, "defaults", {
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
}), I(Bi, "overrides", {
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
class Hi extends Ne {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(e, i, s, r) {
    const n = super.parsePrimitiveData(e, i, s, r);
    for (let a = 0; a < n.length; a++)
      n[a]._custom = this.resolveDataElementOptions(a + s).radius;
    return n;
  }
  parseArrayData(e, i, s, r) {
    const n = super.parseArrayData(e, i, s, r);
    for (let a = 0; a < n.length; a++) {
      const o = i[s + a];
      n[a]._custom = W(o[2], this.resolveDataElementOptions(a + s).radius);
    }
    return n;
  }
  parseObjectData(e, i, s, r) {
    const n = super.parseObjectData(e, i, s, r);
    for (let a = 0; a < n.length; a++) {
      const o = i[s + a];
      n[a]._custom = W(o && o.r && +o.r, this.resolveDataElementOptions(a + s).radius);
    }
    return n;
  }
  getMaxOverflow() {
    const e = this._cachedMeta.data;
    let i = 0;
    for (let s = e.length - 1; s >= 0; --s)
      i = Math.max(i, e[s].size(this.resolveDataElementOptions(s)) / 2);
    return i > 0 && i;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, s = this.chart.data.labels || [], { xScale: r, yScale: n } = i, a = this.getParsed(e), o = r.getLabelForValue(a.x), l = n.getLabelForValue(a.y), d = a._custom;
    return {
      label: s[e] || "",
      value: "(" + o + ", " + l + (d ? ", " + d : "") + ")"
    };
  }
  update(e) {
    const i = this._cachedMeta.data;
    this.updateElements(i, 0, i.length, e);
  }
  updateElements(e, i, s, r) {
    const n = r === "reset", { iScale: a, vScale: o } = this._cachedMeta, { sharedOptions: l, includeOptions: d } = this._getSharedOptions(i, r), c = a.axis, h = o.axis;
    for (let u = i; u < i + s; u++) {
      const g = e[u], _ = !n && this.getParsed(u), f = {}, p = f[c] = n ? a.getPixelForDecimal(0.5) : a.getPixelForValue(_[c]), m = f[h] = n ? o.getBasePixel() : o.getPixelForValue(_[h]);
      f.skip = isNaN(p) || isNaN(m), d && (f.options = l || this.resolveDataElementOptions(u, g.active ? "active" : r), n && (f.options.radius = 0)), this.updateElement(g, u, f, r);
    }
  }
  resolveDataElementOptions(e, i) {
    const s = this.getParsed(e);
    let r = super.resolveDataElementOptions(e, i);
    r.$shared && (r = Object.assign({}, r, {
      $shared: !1
    }));
    const n = r.radius;
    return i !== "active" && (r.radius = 0), r.radius += W(s && s._custom, n), r;
  }
}
I(Hi, "id", "bubble"), I(Hi, "defaults", {
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
}), I(Hi, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function Qu(t, e, i) {
  let s = 1, r = 1, n = 0, a = 0;
  if (e < re) {
    const o = t, l = o + e, d = Math.cos(o), c = Math.sin(o), h = Math.cos(l), u = Math.sin(l), g = (E, C, x) => ci(E, o, l, !0) ? 1 : Math.max(C, C * i, x, x * i), _ = (E, C, x) => ci(E, o, l, !0) ? -1 : Math.min(C, C * i, x, x * i), f = g(0, d, h), p = g(ce, c, u), m = _(ee, d, h), v = _(ee + ce, c, u);
    s = (f - m) / 2, r = (p - v) / 2, n = -(f + m) / 2, a = -(p + v) / 2;
  }
  return {
    ratioX: s,
    ratioY: r,
    offsetX: n,
    offsetY: a
  };
}
class et extends Ne {
  constructor(e, i) {
    super(e, i), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(e, i) {
    const s = this.getDataset().data, r = this._cachedMeta;
    if (this._parsing === !1)
      r._parsed = s;
    else {
      let n = (l) => +s[l];
      if (X(s[e])) {
        const { key: l = "value" } = this._parsing;
        n = (d) => +rt(s[d], l);
      }
      let a, o;
      for (a = e, o = e + i; a < o; ++a)
        r._parsed[a] = n(a);
    }
  }
  _getRotation() {
    return Ie(this.options.rotation - 90);
  }
  _getCircumference() {
    return Ie(this.options.circumference);
  }
  _getRotationExtents() {
    let e = re, i = -re;
    for (let s = 0; s < this.chart.data.datasets.length; ++s)
      if (this.chart.isDatasetVisible(s) && this.chart.getDatasetMeta(s).type === this._type) {
        const r = this.chart.getDatasetMeta(s).controller, n = r._getRotation(), a = r._getCircumference();
        e = Math.min(e, n), i = Math.max(i, n + a);
      }
    return {
      rotation: e,
      circumference: i - e
    };
  }
  update(e) {
    const i = this.chart, { chartArea: s } = i, r = this._cachedMeta, n = r.data, a = this.getMaxBorderWidth() + this.getMaxOffset(n) + this.options.spacing, o = Math.max((Math.min(s.width, s.height) - a) / 2, 0), l = Math.min(hh(this.options.cutout, o), 1), d = this._getRingWeight(this.index), { circumference: c, rotation: h } = this._getRotationExtents(), { ratioX: u, ratioY: g, offsetX: _, offsetY: f } = Qu(h, c, l), p = (s.width - a) / u, m = (s.height - a) / g, v = Math.max(Math.min(p, m) / 2, 0), E = pa(this.options.radius, v), C = Math.max(E * l, 0), x = (E - C) / this._getVisibleDatasetWeightTotal();
    this.offsetX = _ * E, this.offsetY = f * E, r.total = this.calculateTotal(), this.outerRadius = E - x * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - x * d, 0), this.updateElements(n, 0, n.length, e);
  }
  _circumference(e, i) {
    const s = this.options, r = this._cachedMeta, n = this._getCircumference();
    return i && s.animation.animateRotate || !this.chart.getDataVisibility(e) || r._parsed[e] === null || r.data[e].hidden ? 0 : this.calculateCircumference(r._parsed[e] * n / re);
  }
  updateElements(e, i, s, r) {
    const n = r === "reset", a = this.chart, o = a.chartArea, d = a.options.animation, c = (o.left + o.right) / 2, h = (o.top + o.bottom) / 2, u = n && d.animateScale, g = u ? 0 : this.innerRadius, _ = u ? 0 : this.outerRadius, { sharedOptions: f, includeOptions: p } = this._getSharedOptions(i, r);
    let m = this._getRotation(), v;
    for (v = 0; v < i; ++v)
      m += this._circumference(v, n);
    for (v = i; v < i + s; ++v) {
      const E = this._circumference(v, n), C = e[v], x = {
        x: c + this.offsetX,
        y: h + this.offsetY,
        startAngle: m,
        endAngle: m + E,
        circumference: E,
        outerRadius: _,
        innerRadius: g
      };
      p && (x.options = f || this.resolveDataElementOptions(v, C.active ? "active" : r)), m += E, this.updateElement(C, v, x, r);
    }
  }
  calculateTotal() {
    const e = this._cachedMeta, i = e.data;
    let s = 0, r;
    for (r = 0; r < i.length; r++) {
      const n = e._parsed[r];
      n !== null && !isNaN(n) && this.chart.getDataVisibility(r) && !i[r].hidden && (s += Math.abs(n));
    }
    return s;
  }
  calculateCircumference(e) {
    const i = this._cachedMeta.total;
    return i > 0 && !isNaN(e) ? re * (Math.abs(e) / i) : 0;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, s = this.chart, r = s.data.labels || [], n = vi(i._parsed[e], s.options.locale);
    return {
      label: r[e] || "",
      value: n
    };
  }
  getMaxBorderWidth(e) {
    let i = 0;
    const s = this.chart;
    let r, n, a, o, l;
    if (!e) {
      for (r = 0, n = s.data.datasets.length; r < n; ++r)
        if (s.isDatasetVisible(r)) {
          a = s.getDatasetMeta(r), e = a.data, o = a.controller;
          break;
        }
    }
    if (!e)
      return 0;
    for (r = 0, n = e.length; r < n; ++r)
      l = o.resolveDataElementOptions(r), l.borderAlign !== "inner" && (i = Math.max(i, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return i;
  }
  getMaxOffset(e) {
    let i = 0;
    for (let s = 0, r = e.length; s < r; ++s) {
      const n = this.resolveDataElementOptions(s);
      i = Math.max(i, n.offset || 0, n.hoverOffset || 0);
    }
    return i;
  }
  _getRingWeightOffset(e) {
    let i = 0;
    for (let s = 0; s < e; ++s)
      this.chart.isDatasetVisible(s) && (i += this._getRingWeight(s));
    return i;
  }
  _getRingWeight(e) {
    return Math.max(W(this.chart.data.datasets[e].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
I(et, "id", "doughnut"), I(et, "defaults", {
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
}), I(et, "descriptors", {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
}), I(et, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const i = e.data;
          if (i.labels.length && i.datasets.length) {
            const { labels: { pointStyle: s, color: r } } = e.legend.options;
            return i.labels.map((n, a) => {
              const l = e.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: n,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: r,
                lineWidth: l.borderWidth,
                pointStyle: s,
                hidden: !e.getDataVisibility(a),
                index: a
              };
            });
          }
          return [];
        }
      },
      onClick(e, i, s) {
        s.chart.toggleDataVisibility(i.index), s.chart.update();
      }
    }
  }
});
class Fi extends Ne {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(e) {
    const i = this._cachedMeta, { dataset: s, data: r = [], _dataset: n } = i, a = this.chart._animationsDisabled;
    let { start: o, count: l } = Sa(i, r, a);
    this._drawStart = o, this._drawCount = l, Aa(i) && (o = 0, l = r.length), s._chart = this.chart, s._datasetIndex = this.index, s._decimated = !!n._decimated, s.points = r;
    const d = this.resolveDatasetElementOptions(e);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(s, void 0, {
      animated: !a,
      options: d
    }, e), this.updateElements(r, o, l, e);
  }
  updateElements(e, i, s, r) {
    const n = r === "reset", { iScale: a, vScale: o, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: c, includeOptions: h } = this._getSharedOptions(i, r), u = a.axis, g = o.axis, { spanGaps: _, segment: f } = this.options, p = Dt(_) ? _ : Number.POSITIVE_INFINITY, m = this.chart._animationsDisabled || n || r === "none", v = i + s, E = e.length;
    let C = i > 0 && this.getParsed(i - 1);
    for (let x = 0; x < E; ++x) {
      const k = e[x], w = m ? k : {};
      if (x < i || x >= v) {
        w.skip = !0;
        continue;
      }
      const b = this.getParsed(x), A = K(b[g]), M = w[u] = a.getPixelForValue(b[u], x), P = w[g] = n || A ? o.getBasePixel() : o.getPixelForValue(l ? this.applyStack(o, b, l) : b[g], x);
      w.skip = isNaN(M) || isNaN(P) || A, w.stop = x > 0 && Math.abs(b[u] - C[u]) > p, f && (w.parsed = b, w.raw = d.data[x]), h && (w.options = c || this.resolveDataElementOptions(x, k.active ? "active" : r)), m || this.updateElement(k, x, w, r), C = b;
    }
  }
  getMaxOverflow() {
    const e = this._cachedMeta, i = e.dataset, s = i.options && i.options.borderWidth || 0, r = e.data || [];
    if (!r.length)
      return s;
    const n = r[0].size(this.resolveDataElementOptions(0)), a = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
    return Math.max(s, n, a) / 2;
  }
  draw() {
    const e = this._cachedMeta;
    e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
  }
}
I(Fi, "id", "line"), I(Fi, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), I(Fi, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class ii extends Ne {
  constructor(e, i) {
    super(e, i), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, s = this.chart, r = s.data.labels || [], n = vi(i._parsed[e].r, s.options.locale);
    return {
      label: r[e] || "",
      value: n
    };
  }
  parseObjectData(e, i, s, r) {
    return Da.bind(this)(e, i, s, r);
  }
  update(e) {
    const i = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(i, 0, i.length, e);
  }
  getMinMax() {
    const e = this._cachedMeta, i = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return e.data.forEach((s, r) => {
      const n = this.getParsed(r).r;
      !isNaN(n) && this.chart.getDataVisibility(r) && (n < i.min && (i.min = n), n > i.max && (i.max = n));
    }), i;
  }
  _updateRadius() {
    const e = this.chart, i = e.chartArea, s = e.options, r = Math.min(i.right - i.left, i.bottom - i.top), n = Math.max(r / 2, 0), a = Math.max(s.cutoutPercentage ? n / 100 * s.cutoutPercentage : 1, 0), o = (n - a) / e.getVisibleDatasetCount();
    this.outerRadius = n - o * this.index, this.innerRadius = this.outerRadius - o;
  }
  updateElements(e, i, s, r) {
    const n = r === "reset", a = this.chart, l = a.options.animation, d = this._cachedMeta.rScale, c = d.xCenter, h = d.yCenter, u = d.getIndexAngle(0) - 0.5 * ee;
    let g = u, _;
    const f = 360 / this.countVisibleElements();
    for (_ = 0; _ < i; ++_)
      g += this._computeAngle(_, r, f);
    for (_ = i; _ < i + s; _++) {
      const p = e[_];
      let m = g, v = g + this._computeAngle(_, r, f), E = a.getDataVisibility(_) ? d.getDistanceFromCenterForValue(this.getParsed(_).r) : 0;
      g = v, n && (l.animateScale && (E = 0), l.animateRotate && (m = v = u));
      const C = {
        x: c,
        y: h,
        innerRadius: 0,
        outerRadius: E,
        startAngle: m,
        endAngle: v,
        options: this.resolveDataElementOptions(_, p.active ? "active" : r)
      };
      this.updateElement(p, _, C, r);
    }
  }
  countVisibleElements() {
    const e = this._cachedMeta;
    let i = 0;
    return e.data.forEach((s, r) => {
      !isNaN(this.getParsed(r).r) && this.chart.getDataVisibility(r) && i++;
    }), i;
  }
  _computeAngle(e, i, s) {
    return this.chart.getDataVisibility(e) ? Ie(this.resolveDataElementOptions(e, i).angle || s) : 0;
  }
}
I(ii, "id", "polarArea"), I(ii, "defaults", {
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
}), I(ii, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const i = e.data;
          if (i.labels.length && i.datasets.length) {
            const { labels: { pointStyle: s, color: r } } = e.legend.options;
            return i.labels.map((n, a) => {
              const l = e.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: n,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: r,
                lineWidth: l.borderWidth,
                pointStyle: s,
                hidden: !e.getDataVisibility(a),
                index: a
              };
            });
          }
          return [];
        }
      },
      onClick(e, i, s) {
        s.chart.toggleDataVisibility(i.index), s.chart.update();
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
class dr extends et {
}
I(dr, "id", "pie"), I(dr, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class Gi extends Ne {
  getLabelAndValue(e) {
    const i = this._cachedMeta.vScale, s = this.getParsed(e);
    return {
      label: i.getLabels()[e],
      value: "" + i.getLabelForValue(s[i.axis])
    };
  }
  parseObjectData(e, i, s, r) {
    return Da.bind(this)(e, i, s, r);
  }
  update(e) {
    const i = this._cachedMeta, s = i.dataset, r = i.data || [], n = i.iScale.getLabels();
    if (s.points = r, e !== "resize") {
      const a = this.resolveDatasetElementOptions(e);
      this.options.showLine || (a.borderWidth = 0);
      const o = {
        _loop: !0,
        _fullLoop: n.length === r.length,
        options: a
      };
      this.updateElement(s, void 0, o, e);
    }
    this.updateElements(r, 0, r.length, e);
  }
  updateElements(e, i, s, r) {
    const n = this._cachedMeta.rScale, a = r === "reset";
    for (let o = i; o < i + s; o++) {
      const l = e[o], d = this.resolveDataElementOptions(o, l.active ? "active" : r), c = n.getPointPositionForValue(o, this.getParsed(o).r), h = a ? n.xCenter : c.x, u = a ? n.yCenter : c.y, g = {
        x: h,
        y: u,
        angle: c.angle,
        skip: isNaN(h) || isNaN(u),
        options: d
      };
      this.updateElement(l, o, g, r);
    }
  }
}
I(Gi, "id", "radar"), I(Gi, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), I(Gi, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class ji extends Ne {
  getLabelAndValue(e) {
    const i = this._cachedMeta, s = this.chart.data.labels || [], { xScale: r, yScale: n } = i, a = this.getParsed(e), o = r.getLabelForValue(a.x), l = n.getLabelForValue(a.y);
    return {
      label: s[e] || "",
      value: "(" + o + ", " + l + ")"
    };
  }
  update(e) {
    const i = this._cachedMeta, { data: s = [] } = i, r = this.chart._animationsDisabled;
    let { start: n, count: a } = Sa(i, s, r);
    if (this._drawStart = n, this._drawCount = a, Aa(i) && (n = 0, a = s.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: o, _dataset: l } = i;
      o._chart = this.chart, o._datasetIndex = this.index, o._decimated = !!l._decimated, o.points = s;
      const d = this.resolveDatasetElementOptions(e);
      d.segment = this.options.segment, this.updateElement(o, void 0, {
        animated: !r,
        options: d
      }, e);
    } else this.datasetElementType && (delete i.dataset, this.datasetElementType = !1);
    this.updateElements(s, n, a, e);
  }
  addElements() {
    const { showLine: e } = this.options;
    !this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(e, i, s, r) {
    const n = r === "reset", { iScale: a, vScale: o, _stacked: l, _dataset: d } = this._cachedMeta, c = this.resolveDataElementOptions(i, r), h = this.getSharedOptions(c), u = this.includeOptions(r, h), g = a.axis, _ = o.axis, { spanGaps: f, segment: p } = this.options, m = Dt(f) ? f : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || n || r === "none";
    let E = i > 0 && this.getParsed(i - 1);
    for (let C = i; C < i + s; ++C) {
      const x = e[C], k = this.getParsed(C), w = v ? x : {}, b = K(k[_]), A = w[g] = a.getPixelForValue(k[g], C), M = w[_] = n || b ? o.getBasePixel() : o.getPixelForValue(l ? this.applyStack(o, k, l) : k[_], C);
      w.skip = isNaN(A) || isNaN(M) || b, w.stop = C > 0 && Math.abs(k[g] - E[g]) > m, p && (w.parsed = k, w.raw = d.data[C]), u && (w.options = h || this.resolveDataElementOptions(C, x.active ? "active" : r)), v || this.updateElement(x, C, w, r), E = k;
    }
    this.updateSharedOptions(h, r, c);
  }
  getMaxOverflow() {
    const e = this._cachedMeta, i = e.data || [];
    if (!this.options.showLine) {
      let o = 0;
      for (let l = i.length - 1; l >= 0; --l)
        o = Math.max(o, i[l].size(this.resolveDataElementOptions(l)) / 2);
      return o > 0 && o;
    }
    const s = e.dataset, r = s.options && s.options.borderWidth || 0;
    if (!i.length)
      return r;
    const n = i[0].size(this.resolveDataElementOptions(0)), a = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(r, n, a) / 2;
  }
}
I(ji, "id", "scatter"), I(ji, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), I(ji, "overrides", {
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
var eg = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: Bi,
  BubbleController: Hi,
  DoughnutController: et,
  LineController: Fi,
  PieController: dr,
  PolarAreaController: ii,
  RadarController: Gi,
  ScatterController: ji
});
function ct() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Ir {
  constructor(e) {
    I(this, "options");
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
    Object.assign(Ir.prototype, e);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return ct();
  }
  parse() {
    return ct();
  }
  format() {
    return ct();
  }
  add() {
    return ct();
  }
  diff() {
    return ct();
  }
  startOf() {
    return ct();
  }
  endOf() {
    return ct();
  }
}
var tg = {
  _date: Ir
};
function ig(t, e, i, s) {
  const { controller: r, data: n, _sorted: a } = t, o = r._cachedMeta.iScale, l = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
  if (o && e === o.axis && e !== "r" && a && n.length) {
    const d = o._reversePixels ? Sh : Xe;
    if (s) {
      if (r._sharedOptions) {
        const c = n[0], h = typeof c.getRange == "function" && c.getRange(e);
        if (h) {
          const u = d(n, e, i - h), g = d(n, e, i + h);
          return {
            lo: u.lo,
            hi: g.hi
          };
        }
      }
    } else {
      const c = d(n, e, i);
      if (l) {
        const { vScale: h } = r._cachedMeta, { _parsed: u } = t, g = u.slice(0, c.lo + 1).reverse().findIndex((f) => !K(f[h.axis]));
        c.lo -= Math.max(0, g);
        const _ = u.slice(c.hi).findIndex((f) => !K(f[h.axis]));
        c.hi += Math.max(0, _);
      }
      return c;
    }
  }
  return {
    lo: 0,
    hi: n.length - 1
  };
}
function us(t, e, i, s, r) {
  const n = t.getSortedVisibleDatasetMetas(), a = i[e];
  for (let o = 0, l = n.length; o < l; ++o) {
    const { index: d, data: c } = n[o], { lo: h, hi: u } = ig(n[o], e, a, r);
    for (let g = h; g <= u; ++g) {
      const _ = c[g];
      _.skip || s(_, d, g);
    }
  }
}
function sg(t) {
  const e = t.indexOf("x") !== -1, i = t.indexOf("y") !== -1;
  return function(s, r) {
    const n = e ? Math.abs(s.x - r.x) : 0, a = i ? Math.abs(s.y - r.y) : 0;
    return Math.sqrt(Math.pow(n, 2) + Math.pow(a, 2));
  };
}
function Os(t, e, i, s, r) {
  const n = [];
  return !r && !t.isPointInArea(e) || us(t, i, e, function(o, l, d) {
    !r && !qe(o, t.chartArea, 0) || o.inRange(e.x, e.y, s) && n.push({
      element: o,
      datasetIndex: l,
      index: d
    });
  }, !0), n;
}
function rg(t, e, i, s) {
  let r = [];
  function n(a, o, l) {
    const { startAngle: d, endAngle: c } = a.getProps([
      "startAngle",
      "endAngle"
    ], s), { angle: h } = ya(a, {
      x: e.x,
      y: e.y
    });
    ci(h, d, c) && r.push({
      element: a,
      datasetIndex: o,
      index: l
    });
  }
  return us(t, i, e, n), r;
}
function ng(t, e, i, s, r, n) {
  let a = [];
  const o = sg(i);
  let l = Number.POSITIVE_INFINITY;
  function d(c, h, u) {
    const g = c.inRange(e.x, e.y, r);
    if (s && !g)
      return;
    const _ = c.getCenterPoint(r);
    if (!(!!n || t.isPointInArea(_)) && !g)
      return;
    const p = o(e, _);
    p < l ? (a = [
      {
        element: c,
        datasetIndex: h,
        index: u
      }
    ], l = p) : p === l && a.push({
      element: c,
      datasetIndex: h,
      index: u
    });
  }
  return us(t, i, e, d), a;
}
function Rs(t, e, i, s, r, n) {
  return !n && !t.isPointInArea(e) ? [] : i === "r" && !s ? rg(t, e, i, r) : ng(t, e, i, s, r, n);
}
function Un(t, e, i, s, r) {
  const n = [], a = i === "x" ? "inXRange" : "inYRange";
  let o = !1;
  return us(t, i, e, (l, d, c) => {
    l[a] && l[a](e[i], r) && (n.push({
      element: l,
      datasetIndex: d,
      index: c
    }), o = o || l.inRange(e.x, e.y, r));
  }), s && !o ? [] : n;
}
var og = {
  modes: {
    index(t, e, i, s) {
      const r = ut(e, t), n = i.axis || "x", a = i.includeInvisible || !1, o = i.intersect ? Os(t, r, n, s, a) : Rs(t, r, n, !1, s, a), l = [];
      return o.length ? (t.getSortedVisibleDatasetMetas().forEach((d) => {
        const c = o[0].index, h = d.data[c];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: d.index,
          index: c
        });
      }), l) : [];
    },
    dataset(t, e, i, s) {
      const r = ut(e, t), n = i.axis || "xy", a = i.includeInvisible || !1;
      let o = i.intersect ? Os(t, r, n, s, a) : Rs(t, r, n, !1, s, a);
      if (o.length > 0) {
        const l = o[0].datasetIndex, d = t.getDatasetMeta(l).data;
        o = [];
        for (let c = 0; c < d.length; ++c)
          o.push({
            element: d[c],
            datasetIndex: l,
            index: c
          });
      }
      return o;
    },
    point(t, e, i, s) {
      const r = ut(e, t), n = i.axis || "xy", a = i.includeInvisible || !1;
      return Os(t, r, n, s, a);
    },
    nearest(t, e, i, s) {
      const r = ut(e, t), n = i.axis || "xy", a = i.includeInvisible || !1;
      return Rs(t, r, n, i.intersect, s, a);
    },
    x(t, e, i, s) {
      const r = ut(e, t);
      return Un(t, r, "x", i.intersect, s);
    },
    y(t, e, i, s) {
      const r = ut(e, t);
      return Un(t, r, "y", i.intersect, s);
    }
  }
};
const Ua = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ht(t, e) {
  return t.filter((i) => i.pos === e);
}
function Vn(t, e) {
  return t.filter((i) => Ua.indexOf(i.pos) === -1 && i.box.axis === e);
}
function Ft(t, e) {
  return t.sort((i, s) => {
    const r = e ? s : i, n = e ? i : s;
    return r.weight === n.weight ? r.index - n.index : r.weight - n.weight;
  });
}
function ag(t) {
  const e = [];
  let i, s, r, n, a, o;
  for (i = 0, s = (t || []).length; i < s; ++i)
    r = t[i], { position: n, options: { stack: a, stackWeight: o = 1 } } = r, e.push({
      index: i,
      box: r,
      pos: n,
      horizontal: r.isHorizontal(),
      weight: r.weight,
      stack: a && n + a,
      stackWeight: o
    });
  return e;
}
function lg(t) {
  const e = {};
  for (const i of t) {
    const { stack: s, pos: r, stackWeight: n } = i;
    if (!s || !Ua.includes(r))
      continue;
    const a = e[s] || (e[s] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    a.count++, a.weight += n;
  }
  return e;
}
function dg(t, e) {
  const i = lg(t), { vBoxMaxWidth: s, hBoxMaxHeight: r } = e;
  let n, a, o;
  for (n = 0, a = t.length; n < a; ++n) {
    o = t[n];
    const { fullSize: l } = o.box, d = i[o.stack], c = d && o.stackWeight / d.weight;
    o.horizontal ? (o.width = c ? c * s : l && e.availableWidth, o.height = r) : (o.width = s, o.height = c ? c * r : l && e.availableHeight);
  }
  return i;
}
function cg(t) {
  const e = ag(t), i = Ft(e.filter((d) => d.box.fullSize), !0), s = Ft(Ht(e, "left"), !0), r = Ft(Ht(e, "right")), n = Ft(Ht(e, "top"), !0), a = Ft(Ht(e, "bottom")), o = Vn(e, "x"), l = Vn(e, "y");
  return {
    fullSize: i,
    leftAndTop: s.concat(n),
    rightAndBottom: r.concat(l).concat(a).concat(o),
    chartArea: Ht(e, "chartArea"),
    vertical: s.concat(r).concat(l),
    horizontal: n.concat(a).concat(o)
  };
}
function Wn(t, e, i, s) {
  return Math.max(t[i], e[i]) + Math.max(t[s], e[s]);
}
function Va(t, e) {
  t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
}
function hg(t, e, i, s) {
  const { pos: r, box: n } = i, a = t.maxPadding;
  if (!X(r)) {
    i.size && (t[r] -= i.size);
    const h = s[i.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, i.horizontal ? n.height : n.width), i.size = h.size / h.count, t[r] += i.size;
  }
  n.getPadding && Va(a, n.getPadding());
  const o = Math.max(0, e.outerWidth - Wn(a, t, "left", "right")), l = Math.max(0, e.outerHeight - Wn(a, t, "top", "bottom")), d = o !== t.w, c = l !== t.h;
  return t.w = o, t.h = l, i.horizontal ? {
    same: d,
    other: c
  } : {
    same: c,
    other: d
  };
}
function ug(t) {
  const e = t.maxPadding;
  function i(s) {
    const r = Math.max(e[s] - t[s], 0);
    return t[s] += r, r;
  }
  t.y += i("top"), t.x += i("left"), i("right"), i("bottom");
}
function gg(t, e) {
  const i = e.maxPadding;
  function s(r) {
    const n = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return r.forEach((a) => {
      n[a] = Math.max(e[a], i[a]);
    }), n;
  }
  return s(t ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Kt(t, e, i, s) {
  const r = [];
  let n, a, o, l, d, c;
  for (n = 0, a = t.length, d = 0; n < a; ++n) {
    o = t[n], l = o.box, l.update(o.width || e.w, o.height || e.h, gg(o.horizontal, e));
    const { same: h, other: u } = hg(e, i, o, s);
    d |= h && r.length, c = c || u, l.fullSize || r.push(o);
  }
  return d && Kt(r, e, i, s) || c;
}
function Mi(t, e, i, s, r) {
  t.top = i, t.left = e, t.right = e + s, t.bottom = i + r, t.width = s, t.height = r;
}
function Kn(t, e, i, s) {
  const r = i.padding;
  let { x: n, y: a } = e;
  for (const o of t) {
    const l = o.box, d = s[o.stack] || {
      placed: 0,
      weight: 1
    }, c = o.stackWeight / d.weight || 1;
    if (o.horizontal) {
      const h = e.w * c, u = d.size || l.height;
      di(d.start) && (a = d.start), l.fullSize ? Mi(l, r.left, a, i.outerWidth - r.right - r.left, u) : Mi(l, e.left + d.placed, a, h, u), d.start = a, d.placed += h, a = l.bottom;
    } else {
      const h = e.h * c, u = d.size || l.width;
      di(d.start) && (n = d.start), l.fullSize ? Mi(l, n, r.top, u, i.outerHeight - r.bottom - r.top) : Mi(l, n, e.top + d.placed, u, h), d.start = n, d.placed += h, n = l.right;
    }
  }
  e.x = n, e.y = a;
}
var ye = {
  addBox(t, e) {
    t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function() {
      return [
        {
          z: 0,
          draw(i) {
            e.draw(i);
          }
        }
      ];
    }, t.boxes.push(e);
  },
  removeBox(t, e) {
    const i = t.boxes ? t.boxes.indexOf(e) : -1;
    i !== -1 && t.boxes.splice(i, 1);
  },
  configure(t, e, i) {
    e.fullSize = i.fullSize, e.position = i.position, e.weight = i.weight;
  },
  update(t, e, i, s) {
    if (!t)
      return;
    const r = be(t.options.layout.padding), n = Math.max(e - r.width, 0), a = Math.max(i - r.height, 0), o = cg(t.boxes), l = o.vertical, d = o.horizontal;
    te(t.boxes, (f) => {
      typeof f.beforeLayout == "function" && f.beforeLayout();
    });
    const c = l.reduce((f, p) => p.box.options && p.box.options.display === !1 ? f : f + 1, 0) || 1, h = Object.freeze({
      outerWidth: e,
      outerHeight: i,
      padding: r,
      availableWidth: n,
      availableHeight: a,
      vBoxMaxWidth: n / 2 / c,
      hBoxMaxHeight: a / 2
    }), u = Object.assign({}, r);
    Va(u, be(s));
    const g = Object.assign({
      maxPadding: u,
      w: n,
      h: a,
      x: r.left,
      y: r.top
    }, r), _ = dg(l.concat(d), h);
    Kt(o.fullSize, g, h, _), Kt(l, g, h, _), Kt(d, g, h, _) && Kt(l, g, h, _), ug(g), Kn(o.leftAndTop, g, h, _), g.x += g.w, g.y += g.h, Kn(o.rightAndBottom, g, h, _), t.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, te(o.chartArea, (f) => {
      const p = f.box;
      Object.assign(p, t.chartArea), p.update(g.w, g.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Wa {
  acquireContext(e, i) {
  }
  releaseContext(e) {
    return !1;
  }
  addEventListener(e, i, s) {
  }
  removeEventListener(e, i, s) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(e, i, s, r) {
    return i = Math.max(0, i || e.width), s = s || e.height, {
      width: i,
      height: Math.max(0, r ? Math.floor(i / r) : s)
    };
  }
  isAttached(e) {
    return !0;
  }
  updateConfig(e) {
  }
}
class _g extends Wa {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const Ui = "$chartjs", fg = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Yn = (t) => t === null || t === "";
function pg(t, e) {
  const i = t.style, s = t.getAttribute("height"), r = t.getAttribute("width");
  if (t[Ui] = {
    initial: {
      height: s,
      width: r,
      style: {
        display: i.display,
        height: i.height,
        width: i.width
      }
    }
  }, i.display = i.display || "block", i.boxSizing = i.boxSizing || "border-box", Yn(r)) {
    const n = Tn(t, "width");
    n !== void 0 && (t.width = n);
  }
  if (Yn(s))
    if (t.style.height === "")
      t.height = t.width / (e || 2);
    else {
      const n = Tn(t, "height");
      n !== void 0 && (t.height = n);
    }
  return t;
}
const Ka = mu ? {
  passive: !0
} : !1;
function mg(t, e, i) {
  t && t.addEventListener(e, i, Ka);
}
function vg(t, e, i) {
  t && t.canvas && t.canvas.removeEventListener(e, i, Ka);
}
function yg(t, e) {
  const i = fg[t.type] || t.type, { x: s, y: r } = ut(t, e);
  return {
    type: i,
    chart: e,
    native: t,
    x: s !== void 0 ? s : null,
    y: r !== void 0 ? r : null
  };
}
function is(t, e) {
  for (const i of t)
    if (i === e || i.contains(e))
      return !0;
}
function bg(t, e, i) {
  const s = t.canvas, r = new MutationObserver((n) => {
    let a = !1;
    for (const o of n)
      a = a || is(o.addedNodes, s), a = a && !is(o.removedNodes, s);
    a && i();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
function xg(t, e, i) {
  const s = t.canvas, r = new MutationObserver((n) => {
    let a = !1;
    for (const o of n)
      a = a || is(o.removedNodes, s), a = a && !is(o.addedNodes, s);
    a && i();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
const ui = /* @__PURE__ */ new Map();
let Xn = 0;
function Ya() {
  const t = window.devicePixelRatio;
  t !== Xn && (Xn = t, ui.forEach((e, i) => {
    i.currentDevicePixelRatio !== t && e();
  }));
}
function wg(t, e) {
  ui.size || window.addEventListener("resize", Ya), ui.set(t, e);
}
function kg(t) {
  ui.delete(t), ui.size || window.removeEventListener("resize", Ya);
}
function Sg(t, e, i) {
  const s = t.canvas, r = s && Rr(s);
  if (!r)
    return;
  const n = ka((o, l) => {
    const d = r.clientWidth;
    i(o, l), d < r.clientWidth && i();
  }, window), a = new ResizeObserver((o) => {
    const l = o[0], d = l.contentRect.width, c = l.contentRect.height;
    d === 0 && c === 0 || n(d, c);
  });
  return a.observe(r), wg(t, n), a;
}
function Is(t, e, i) {
  i && i.disconnect(), e === "resize" && kg(t);
}
function Ag(t, e, i) {
  const s = t.canvas, r = ka((n) => {
    t.ctx !== null && i(yg(n, t));
  }, t);
  return mg(s, e, r), r;
}
class Eg extends Wa {
  acquireContext(e, i) {
    const s = e && e.getContext && e.getContext("2d");
    return s && s.canvas === e ? (pg(e, i), s) : null;
  }
  releaseContext(e) {
    const i = e.canvas;
    if (!i[Ui])
      return !1;
    const s = i[Ui].initial;
    [
      "height",
      "width"
    ].forEach((n) => {
      const a = s[n];
      K(a) ? i.removeAttribute(n) : i.setAttribute(n, a);
    });
    const r = s.style || {};
    return Object.keys(r).forEach((n) => {
      i.style[n] = r[n];
    }), i.width = i.width, delete i[Ui], !0;
  }
  addEventListener(e, i, s) {
    this.removeEventListener(e, i);
    const r = e.$proxies || (e.$proxies = {}), a = {
      attach: bg,
      detach: xg,
      resize: Sg
    }[i] || Ag;
    r[i] = a(e, i, s);
  }
  removeEventListener(e, i) {
    const s = e.$proxies || (e.$proxies = {}), r = s[i];
    if (!r)
      return;
    ({
      attach: Is,
      detach: Is,
      resize: Is
    }[i] || vg)(e, i, r), s[i] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, i, s, r) {
    return pu(e, i, s, r);
  }
  isAttached(e) {
    const i = e && Rr(e);
    return !!(i && i.isConnected);
  }
}
function Cg(t) {
  return !Or() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? _g : Eg;
}
class Be {
  constructor() {
    I(this, "x");
    I(this, "y");
    I(this, "active", !1);
    I(this, "options");
    I(this, "$animations");
  }
  tooltipPosition(e) {
    const { x: i, y: s } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: i,
      y: s
    };
  }
  hasValue() {
    return Dt(this.x) && Dt(this.y);
  }
  getProps(e, i) {
    const s = this.$animations;
    if (!i || !s)
      return this;
    const r = {};
    return e.forEach((n) => {
      r[n] = s[n] && s[n].active() ? s[n]._to : this[n];
    }), r;
  }
}
I(Be, "defaults", {}), I(Be, "defaultRoutes");
function Pg(t, e) {
  const i = t.options.ticks, s = Mg(t), r = Math.min(i.maxTicksLimit || s, s), n = i.major.enabled ? Tg(e) : [], a = n.length, o = n[0], l = n[a - 1], d = [];
  if (a > r)
    return Lg(e, d, n, a / r), d;
  const c = $g(n, e, r);
  if (a > 0) {
    let h, u;
    const g = a > 1 ? Math.round((l - o) / (a - 1)) : null;
    for ($i(e, d, c, K(g) ? 0 : o - g, o), h = 0, u = a - 1; h < u; h++)
      $i(e, d, c, n[h], n[h + 1]);
    return $i(e, d, c, l, K(g) ? e.length : l + g), d;
  }
  return $i(e, d, c), d;
}
function Mg(t) {
  const e = t.options.offset, i = t._tickSize(), s = t._length / i + (e ? 0 : 1), r = t._maxLength / i;
  return Math.floor(Math.min(s, r));
}
function $g(t, e, i) {
  const s = Dg(t), r = e.length / i;
  if (!s)
    return Math.max(r, 1);
  const n = yh(s);
  for (let a = 0, o = n.length - 1; a < o; a++) {
    const l = n[a];
    if (l > r)
      return l;
  }
  return Math.max(r, 1);
}
function Tg(t) {
  const e = [];
  let i, s;
  for (i = 0, s = t.length; i < s; i++)
    t[i].major && e.push(i);
  return e;
}
function Lg(t, e, i, s) {
  let r = 0, n = i[0], a;
  for (s = Math.ceil(s), a = 0; a < t.length; a++)
    a === n && (e.push(t[a]), r++, n = i[r * s]);
}
function $i(t, e, i, s, r) {
  const n = W(s, 0), a = Math.min(W(r, t.length), t.length);
  let o = 0, l, d, c;
  for (i = Math.ceil(i), r && (l = r - s, i = l / Math.floor(l / i)), c = n; c < 0; )
    o++, c = Math.round(n + o * i);
  for (d = Math.max(n, 0); d < a; d++)
    d === c && (e.push(t[d]), o++, c = Math.round(n + o * i));
}
function Dg(t) {
  const e = t.length;
  let i, s;
  if (e < 2)
    return !1;
  for (s = t[0], i = 1; i < e; ++i)
    if (t[i] - t[i - 1] !== s)
      return !1;
  return s;
}
const zg = (t) => t === "left" ? "right" : t === "right" ? "left" : t, qn = (t, e, i) => e === "top" || e === "left" ? t[e] + i : t[e] - i, Zn = (t, e) => Math.min(e || t, t);
function Jn(t, e) {
  const i = [], s = t.length / e, r = t.length;
  let n = 0;
  for (; n < r; n += s)
    i.push(t[Math.floor(n)]);
  return i;
}
function Og(t, e, i) {
  const s = t.ticks.length, r = Math.min(e, s - 1), n = t._startPixel, a = t._endPixel, o = 1e-6;
  let l = t.getPixelForTick(r), d;
  if (!(i && (s === 1 ? d = Math.max(l - n, a - l) : e === 0 ? d = (t.getPixelForTick(1) - l) / 2 : d = (l - t.getPixelForTick(r - 1)) / 2, l += r < e ? d : -d, l < n - o || l > a + o)))
    return l;
}
function Rg(t, e) {
  te(t, (i) => {
    const s = i.gc, r = s.length / 2;
    let n;
    if (r > e) {
      for (n = 0; n < r; ++n)
        delete i.data[s[n]];
      s.splice(0, r);
    }
  });
}
function Gt(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function Qn(t, e) {
  if (!t.display)
    return 0;
  const i = ge(t.font, e), s = be(t.padding);
  return (oe(t.text) ? t.text.length : 1) * i.lineHeight + s.height;
}
function Ig(t, e) {
  return ot(t, {
    scale: e,
    type: "scale"
  });
}
function Ng(t, e, i) {
  return ot(t, {
    tick: i,
    index: e,
    type: "tick"
  });
}
function Bg(t, e, i) {
  let s = Mr(t);
  return (i && e !== "right" || !i && e === "right") && (s = zg(s)), s;
}
function Hg(t, e, i, s) {
  const { top: r, left: n, bottom: a, right: o, chart: l } = t, { chartArea: d, scales: c } = l;
  let h = 0, u, g, _;
  const f = a - r, p = o - n;
  if (t.isHorizontal()) {
    if (g = me(s, n, o), X(i)) {
      const m = Object.keys(i)[0], v = i[m];
      _ = c[m].getPixelForValue(v) + f - e;
    } else i === "center" ? _ = (d.bottom + d.top) / 2 + f - e : _ = qn(t, i, e);
    u = o - n;
  } else {
    if (X(i)) {
      const m = Object.keys(i)[0], v = i[m];
      g = c[m].getPixelForValue(v) - p + e;
    } else i === "center" ? g = (d.left + d.right) / 2 - p + e : g = qn(t, i, e);
    _ = me(s, a, r), h = i === "left" ? -ce : ce;
  }
  return {
    titleX: g,
    titleY: _,
    maxWidth: u,
    rotation: h
  };
}
class wt extends Be {
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
  parse(e, i) {
    return e;
  }
  getUserBounds() {
    let { _userMin: e, _userMax: i, _suggestedMin: s, _suggestedMax: r } = this;
    return e = Ce(e, Number.POSITIVE_INFINITY), i = Ce(i, Number.NEGATIVE_INFINITY), s = Ce(s, Number.POSITIVE_INFINITY), r = Ce(r, Number.NEGATIVE_INFINITY), {
      min: Ce(e, s),
      max: Ce(i, r),
      minDefined: de(e),
      maxDefined: de(i)
    };
  }
  getMinMax(e) {
    let { min: i, max: s, minDefined: r, maxDefined: n } = this.getUserBounds(), a;
    if (r && n)
      return {
        min: i,
        max: s
      };
    const o = this.getMatchingVisibleMetas();
    for (let l = 0, d = o.length; l < d; ++l)
      a = o[l].controller.getMinMax(this, e), r || (i = Math.min(i, a.min)), n || (s = Math.max(s, a.max));
    return i = n && i > s ? s : i, s = r && i > s ? i : s, {
      min: Ce(i, Ce(s, i)),
      max: Ce(s, Ce(i, s))
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
    se(this.options.beforeUpdate, [
      this
    ]);
  }
  update(e, i, s) {
    const { beginAtZero: r, grace: n, ticks: a } = this.options, o = a.sampleSize;
    this.beforeUpdate(), this.maxWidth = e, this.maxHeight = i, this._margins = s = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, s), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + s.left + s.right : this.height + s.top + s.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Yh(this, n, r), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = o < this.ticks.length;
    this._convertTicksToLabels(l ? Jn(this.ticks, o) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = Pg(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let e = this.options.reverse, i, s;
    this.isHorizontal() ? (i = this.left, s = this.right) : (i = this.top, s = this.bottom, e = !e), this._startPixel = i, this._endPixel = s, this._reversePixels = e, this._length = s - i, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    se(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    se(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    se(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(e) {
    this.chart.notifyPlugins(e, this.getContext()), se(this.options[e], [
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
    se(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(e) {
    const i = this.options.ticks;
    let s, r, n;
    for (s = 0, r = e.length; s < r; s++)
      n = e[s], n.label = se(i.callback, [
        n.value,
        s,
        e
      ], this);
  }
  afterTickToLabelConversion() {
    se(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    se(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const e = this.options, i = e.ticks, s = Zn(this.ticks.length, e.ticks.maxTicksLimit), r = i.minRotation || 0, n = i.maxRotation;
    let a = r, o, l, d;
    if (!this._isVisible() || !i.display || r >= n || s <= 1 || !this.isHorizontal()) {
      this.labelRotation = r;
      return;
    }
    const c = this._getLabelSizes(), h = c.widest.width, u = c.highest.height, g = _e(this.chart.width - h, 0, this.maxWidth);
    o = e.offset ? this.maxWidth / s : g / (s - 1), h + 6 > o && (o = g / (s - (e.offset ? 0.5 : 1)), l = this.maxHeight - Gt(e.grid) - i.padding - Qn(e.title, this.chart.options.font), d = Math.sqrt(h * h + u * u), a = Cr(Math.min(Math.asin(_e((c.highest.height + 6) / o, -1, 1)), Math.asin(_e(l / d, -1, 1)) - Math.asin(_e(u / d, -1, 1)))), a = Math.max(r, Math.min(n, a))), this.labelRotation = a;
  }
  afterCalculateLabelRotation() {
    se(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    se(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const e = {
      width: 0,
      height: 0
    }, { chart: i, options: { ticks: s, title: r, grid: n } } = this, a = this._isVisible(), o = this.isHorizontal();
    if (a) {
      const l = Qn(r, i.options.font);
      if (o ? (e.width = this.maxWidth, e.height = Gt(n) + l) : (e.height = this.maxHeight, e.width = Gt(n) + l), s.display && this.ticks.length) {
        const { first: d, last: c, widest: h, highest: u } = this._getLabelSizes(), g = s.padding * 2, _ = Ie(this.labelRotation), f = Math.cos(_), p = Math.sin(_);
        if (o) {
          const m = s.mirror ? 0 : p * h.width + f * u.height;
          e.height = Math.min(this.maxHeight, e.height + m + g);
        } else {
          const m = s.mirror ? 0 : f * h.width + p * u.height;
          e.width = Math.min(this.maxWidth, e.width + m + g);
        }
        this._calculatePadding(d, c, p, f);
      }
    }
    this._handleMargins(), o ? (this.width = this._length = i.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = i.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(e, i, s, r) {
    const { ticks: { align: n, padding: a }, position: o } = this.options, l = this.labelRotation !== 0, d = o !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const c = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, g = 0;
      l ? d ? (u = r * e.width, g = s * i.height) : (u = s * e.height, g = r * i.width) : n === "start" ? g = i.width : n === "end" ? u = e.width : n !== "inner" && (u = e.width / 2, g = i.width / 2), this.paddingLeft = Math.max((u - c + a) * this.width / (this.width - c), 0), this.paddingRight = Math.max((g - h + a) * this.width / (this.width - h), 0);
    } else {
      let c = i.height / 2, h = e.height / 2;
      n === "start" ? (c = 0, h = e.height) : n === "end" && (c = i.height, h = 0), this.paddingTop = c + a, this.paddingBottom = h + a;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    se(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: e, position: i } = this.options;
    return i === "top" || i === "bottom" || e === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(e) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(e);
    let i, s;
    for (i = 0, s = e.length; i < s; i++)
      K(e[i].label) && (e.splice(i, 1), s--, i--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let e = this._labelSizes;
    if (!e) {
      const i = this.options.ticks.sampleSize;
      let s = this.ticks;
      i < s.length && (s = Jn(s, i)), this._labelSizes = e = this._computeLabelSizes(s, s.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, i, s) {
    const { ctx: r, _longestTextCache: n } = this, a = [], o = [], l = Math.floor(i / Zn(i, s));
    let d = 0, c = 0, h, u, g, _, f, p, m, v, E, C, x;
    for (h = 0; h < i; h += l) {
      if (_ = e[h].label, f = this._resolveTickFontOptions(h), r.font = p = f.string, m = n[p] = n[p] || {
        data: {},
        gc: []
      }, v = f.lineHeight, E = C = 0, !K(_) && !oe(_))
        E = es(r, m.data, m.gc, E, _), C = v;
      else if (oe(_))
        for (u = 0, g = _.length; u < g; ++u)
          x = _[u], !K(x) && !oe(x) && (E = es(r, m.data, m.gc, E, x), C += v);
      a.push(E), o.push(C), d = Math.max(E, d), c = Math.max(C, c);
    }
    Rg(n, i);
    const k = a.indexOf(d), w = o.indexOf(c), b = (A) => ({
      width: a[A] || 0,
      height: o[A] || 0
    });
    return {
      first: b(0),
      last: b(i - 1),
      widest: b(k),
      highest: b(w),
      widths: a,
      heights: o
    };
  }
  getLabelForValue(e) {
    return e;
  }
  getPixelForValue(e, i) {
    return NaN;
  }
  getValueForPixel(e) {
  }
  getPixelForTick(e) {
    const i = this.ticks;
    return e < 0 || e > i.length - 1 ? null : this.getPixelForValue(i[e].value);
  }
  getPixelForDecimal(e) {
    this._reversePixels && (e = 1 - e);
    const i = this._startPixel + e * this._length;
    return kh(this._alignToPixels ? dt(this.chart, i, 0) : i);
  }
  getDecimalForPixel(e) {
    const i = (e - this._startPixel) / this._length;
    return this._reversePixels ? 1 - i : i;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: e, max: i } = this;
    return e < 0 && i < 0 ? i : e > 0 && i > 0 ? e : 0;
  }
  getContext(e) {
    const i = this.ticks || [];
    if (e >= 0 && e < i.length) {
      const s = i[e];
      return s.$context || (s.$context = Ng(this.getContext(), e, s));
    }
    return this.$context || (this.$context = Ig(this.chart.getContext(), this));
  }
  _tickSize() {
    const e = this.options.ticks, i = Ie(this.labelRotation), s = Math.abs(Math.cos(i)), r = Math.abs(Math.sin(i)), n = this._getLabelSizes(), a = e.autoSkipPadding || 0, o = n ? n.widest.width + a : 0, l = n ? n.highest.height + a : 0;
    return this.isHorizontal() ? l * s > o * r ? o / s : l / r : l * r < o * s ? l / s : o / r;
  }
  _isVisible() {
    const e = this.options.display;
    return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(e) {
    const i = this.axis, s = this.chart, r = this.options, { grid: n, position: a, border: o } = r, l = n.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), u = Gt(n), g = [], _ = o.setContext(this.getContext()), f = _.display ? _.width : 0, p = f / 2, m = function(D) {
      return dt(s, D, f);
    };
    let v, E, C, x, k, w, b, A, M, P, y, L;
    if (a === "top")
      v = m(this.bottom), w = this.bottom - u, A = v - p, P = m(e.top) + p, L = e.bottom;
    else if (a === "bottom")
      v = m(this.top), P = e.top, L = m(e.bottom) - p, w = v + p, A = this.top + u;
    else if (a === "left")
      v = m(this.right), k = this.right - u, b = v - p, M = m(e.left) + p, y = e.right;
    else if (a === "right")
      v = m(this.left), M = e.left, y = m(e.right) - p, k = v + p, b = this.left + u;
    else if (i === "x") {
      if (a === "center")
        v = m((e.top + e.bottom) / 2 + 0.5);
      else if (X(a)) {
        const D = Object.keys(a)[0], R = a[D];
        v = m(this.chart.scales[D].getPixelForValue(R));
      }
      P = e.top, L = e.bottom, w = v + p, A = w + u;
    } else if (i === "y") {
      if (a === "center")
        v = m((e.left + e.right) / 2);
      else if (X(a)) {
        const D = Object.keys(a)[0], R = a[D];
        v = m(this.chart.scales[D].getPixelForValue(R));
      }
      k = v - p, b = k - u, M = e.left, y = e.right;
    }
    const S = W(r.ticks.maxTicksLimit, h), T = Math.max(1, Math.ceil(h / S));
    for (E = 0; E < h; E += T) {
      const D = this.getContext(E), R = n.setContext(D), $ = o.setContext(D), N = R.lineWidth, z = R.color, O = $.dash || [], V = $.dashOffset, j = R.tickWidth, B = R.tickColor, H = R.tickBorderDash || [], G = R.tickBorderDashOffset;
      C = Og(this, E, l), C !== void 0 && (x = dt(s, C, N), d ? k = b = M = y = x : w = A = P = L = x, g.push({
        tx1: k,
        ty1: w,
        tx2: b,
        ty2: A,
        x1: M,
        y1: P,
        x2: y,
        y2: L,
        width: N,
        color: z,
        borderDash: O,
        borderDashOffset: V,
        tickWidth: j,
        tickColor: B,
        tickBorderDash: H,
        tickBorderDashOffset: G
      }));
    }
    return this._ticksLength = h, this._borderValue = v, g;
  }
  _computeLabelItems(e) {
    const i = this.axis, s = this.options, { position: r, ticks: n } = s, a = this.isHorizontal(), o = this.ticks, { align: l, crossAlign: d, padding: c, mirror: h } = n, u = Gt(s.grid), g = u + c, _ = h ? -c : g, f = -Ie(this.labelRotation), p = [];
    let m, v, E, C, x, k, w, b, A, M, P, y, L = "middle";
    if (r === "top")
      k = this.bottom - _, w = this._getXAxisLabelAlignment();
    else if (r === "bottom")
      k = this.top + _, w = this._getXAxisLabelAlignment();
    else if (r === "left") {
      const T = this._getYAxisLabelAlignment(u);
      w = T.textAlign, x = T.x;
    } else if (r === "right") {
      const T = this._getYAxisLabelAlignment(u);
      w = T.textAlign, x = T.x;
    } else if (i === "x") {
      if (r === "center")
        k = (e.top + e.bottom) / 2 + g;
      else if (X(r)) {
        const T = Object.keys(r)[0], D = r[T];
        k = this.chart.scales[T].getPixelForValue(D) + g;
      }
      w = this._getXAxisLabelAlignment();
    } else if (i === "y") {
      if (r === "center")
        x = (e.left + e.right) / 2 - g;
      else if (X(r)) {
        const T = Object.keys(r)[0], D = r[T];
        x = this.chart.scales[T].getPixelForValue(D);
      }
      w = this._getYAxisLabelAlignment(u).textAlign;
    }
    i === "y" && (l === "start" ? L = "top" : l === "end" && (L = "bottom"));
    const S = this._getLabelSizes();
    for (m = 0, v = o.length; m < v; ++m) {
      E = o[m], C = E.label;
      const T = n.setContext(this.getContext(m));
      b = this.getPixelForTick(m) + n.labelOffset, A = this._resolveTickFontOptions(m), M = A.lineHeight, P = oe(C) ? C.length : 1;
      const D = P / 2, R = T.color, $ = T.textStrokeColor, N = T.textStrokeWidth;
      let z = w;
      a ? (x = b, w === "inner" && (m === v - 1 ? z = this.options.reverse ? "left" : "right" : m === 0 ? z = this.options.reverse ? "right" : "left" : z = "center"), r === "top" ? d === "near" || f !== 0 ? y = -P * M + M / 2 : d === "center" ? y = -S.highest.height / 2 - D * M + M : y = -S.highest.height + M / 2 : d === "near" || f !== 0 ? y = M / 2 : d === "center" ? y = S.highest.height / 2 - D * M : y = S.highest.height - P * M, h && (y *= -1), f !== 0 && !T.showLabelBackdrop && (x += M / 2 * Math.sin(f))) : (k = b, y = (1 - P) * M / 2);
      let O;
      if (T.showLabelBackdrop) {
        const V = be(T.backdropPadding), j = S.heights[m], B = S.widths[m];
        let H = y - V.top, G = 0 - V.left;
        switch (L) {
          case "middle":
            H -= j / 2;
            break;
          case "bottom":
            H -= j;
            break;
        }
        switch (w) {
          case "center":
            G -= B / 2;
            break;
          case "right":
            G -= B;
            break;
          case "inner":
            m === v - 1 ? G -= B : m > 0 && (G -= B / 2);
            break;
        }
        O = {
          left: G,
          top: H,
          width: B + V.width,
          height: j + V.height,
          color: T.backdropColor
        };
      }
      p.push({
        label: C,
        font: A,
        textOffset: y,
        options: {
          rotation: f,
          color: R,
          strokeColor: $,
          strokeWidth: N,
          textAlign: z,
          textBaseline: L,
          translation: [
            x,
            k
          ],
          backdrop: O
        }
      });
    }
    return p;
  }
  _getXAxisLabelAlignment() {
    const { position: e, ticks: i } = this.options;
    if (-Ie(this.labelRotation))
      return e === "top" ? "left" : "right";
    let r = "center";
    return i.align === "start" ? r = "left" : i.align === "end" ? r = "right" : i.align === "inner" && (r = "inner"), r;
  }
  _getYAxisLabelAlignment(e) {
    const { position: i, ticks: { crossAlign: s, mirror: r, padding: n } } = this.options, a = this._getLabelSizes(), o = e + n, l = a.widest.width;
    let d, c;
    return i === "left" ? r ? (c = this.right + n, s === "near" ? d = "left" : s === "center" ? (d = "center", c += l / 2) : (d = "right", c += l)) : (c = this.right - o, s === "near" ? d = "right" : s === "center" ? (d = "center", c -= l / 2) : (d = "left", c = this.left)) : i === "right" ? r ? (c = this.left + n, s === "near" ? d = "right" : s === "center" ? (d = "center", c -= l / 2) : (d = "left", c -= l)) : (c = this.left + o, s === "near" ? d = "left" : s === "center" ? (d = "center", c += l / 2) : (d = "right", c = this.right)) : d = "right", {
      textAlign: d,
      x: c
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const e = this.chart, i = this.options.position;
    if (i === "left" || i === "right")
      return {
        top: 0,
        left: this.left,
        bottom: e.height,
        right: this.right
      };
    if (i === "top" || i === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: e.width
      };
  }
  drawBackground() {
    const { ctx: e, options: { backgroundColor: i }, left: s, top: r, width: n, height: a } = this;
    i && (e.save(), e.fillStyle = i, e.fillRect(s, r, n, a), e.restore());
  }
  getLineWidthForValue(e) {
    const i = this.options.grid;
    if (!this._isVisible() || !i.display)
      return 0;
    const r = this.ticks.findIndex((n) => n.value === e);
    return r >= 0 ? i.setContext(this.getContext(r)).lineWidth : 0;
  }
  drawGrid(e) {
    const i = this.options.grid, s = this.ctx, r = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(e));
    let n, a;
    const o = (l, d, c) => {
      !c.width || !c.color || (s.save(), s.lineWidth = c.width, s.strokeStyle = c.color, s.setLineDash(c.borderDash || []), s.lineDashOffset = c.borderDashOffset, s.beginPath(), s.moveTo(l.x, l.y), s.lineTo(d.x, d.y), s.stroke(), s.restore());
    };
    if (i.display)
      for (n = 0, a = r.length; n < a; ++n) {
        const l = r[n];
        i.drawOnChartArea && o({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), i.drawTicks && o({
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
    const { chart: e, ctx: i, options: { border: s, grid: r } } = this, n = s.setContext(this.getContext()), a = s.display ? n.width : 0;
    if (!a)
      return;
    const o = r.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, c, h, u;
    this.isHorizontal() ? (d = dt(e, this.left, a) - a / 2, c = dt(e, this.right, o) + o / 2, h = u = l) : (h = dt(e, this.top, a) - a / 2, u = dt(e, this.bottom, o) + o / 2, d = c = l), i.save(), i.lineWidth = n.width, i.strokeStyle = n.color, i.beginPath(), i.moveTo(d, h), i.lineTo(c, u), i.stroke(), i.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const s = this.ctx, r = this._computeLabelArea();
    r && ds(s, r);
    const n = this.getLabelItems(e);
    for (const a of n) {
      const o = a.options, l = a.font, d = a.label, c = a.textOffset;
      xt(s, d, 0, c, l, o);
    }
    r && cs(s);
  }
  drawTitle() {
    const { ctx: e, options: { position: i, title: s, reverse: r } } = this;
    if (!s.display)
      return;
    const n = ge(s.font), a = be(s.padding), o = s.align;
    let l = n.lineHeight / 2;
    i === "bottom" || i === "center" || X(i) ? (l += a.bottom, oe(s.text) && (l += n.lineHeight * (s.text.length - 1))) : l += a.top;
    const { titleX: d, titleY: c, maxWidth: h, rotation: u } = Hg(this, l, i, o);
    xt(e, s.text, 0, 0, n, {
      color: s.color,
      maxWidth: h,
      rotation: u,
      textAlign: Bg(o, i, r),
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
    const e = this.options, i = e.ticks && e.ticks.z || 0, s = W(e.grid && e.grid.z, -1), r = W(e.border && e.border.z, 0);
    return !this._isVisible() || this.draw !== wt.prototype.draw ? [
      {
        z: i,
        draw: (n) => {
          this.draw(n);
        }
      }
    ] : [
      {
        z: s,
        draw: (n) => {
          this.drawBackground(), this.drawGrid(n), this.drawTitle();
        }
      },
      {
        z: r,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: i,
        draw: (n) => {
          this.drawLabels(n);
        }
      }
    ];
  }
  getMatchingVisibleMetas(e) {
    const i = this.chart.getSortedVisibleDatasetMetas(), s = this.axis + "AxisID", r = [];
    let n, a;
    for (n = 0, a = i.length; n < a; ++n) {
      const o = i[n];
      o[s] === this.id && (!e || o.type === e) && r.push(o);
    }
    return r;
  }
  _resolveTickFontOptions(e) {
    const i = this.options.ticks.setContext(this.getContext(e));
    return ge(i.font);
  }
  _maxDigits() {
    const e = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / e;
  }
}
class Ti {
  constructor(e, i, s) {
    this.type = e, this.scope = i, this.override = s, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const i = Object.getPrototypeOf(e);
    let s;
    jg(i) && (s = this.register(i));
    const r = this.items, n = e.id, a = this.scope + "." + n;
    if (!n)
      throw new Error("class does not have id: " + e);
    return n in r || (r[n] = e, Fg(e, a, s), this.override && ae.override(e.id, e.overrides)), a;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const i = this.items, s = e.id, r = this.scope;
    s in i && delete i[s], r && s in ae[r] && (delete ae[r][s], this.override && delete bt[s]);
  }
}
function Fg(t, e, i) {
  const s = li(/* @__PURE__ */ Object.create(null), [
    i ? ae.get(i) : {},
    ae.get(e),
    t.defaults
  ]);
  ae.set(e, s), t.defaultRoutes && Gg(e, t.defaultRoutes), t.descriptors && ae.describe(e, t.descriptors);
}
function Gg(t, e) {
  Object.keys(e).forEach((i) => {
    const s = i.split("."), r = s.pop(), n = [
      t
    ].concat(s).join("."), a = e[i].split("."), o = a.pop(), l = a.join(".");
    ae.route(n, r, l, o);
  });
}
function jg(t) {
  return "id" in t && "defaults" in t;
}
class Ug {
  constructor() {
    this.controllers = new Ti(Ne, "datasets", !0), this.elements = new Ti(Be, "elements"), this.plugins = new Ti(Object, "plugins"), this.scales = new Ti(wt, "scales"), this._typedRegistries = [
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
  _each(e, i, s) {
    [
      ...i
    ].forEach((r) => {
      const n = s || this._getRegistryForType(r);
      s || n.isForType(r) || n === this.plugins && r.id ? this._exec(e, n, r) : te(r, (a) => {
        const o = s || this._getRegistryForType(a);
        this._exec(e, o, a);
      });
    });
  }
  _exec(e, i, s) {
    const r = Er(e);
    se(s["before" + r], [], s), i[e](s), se(s["after" + r], [], s);
  }
  _getRegistryForType(e) {
    for (let i = 0; i < this._typedRegistries.length; i++) {
      const s = this._typedRegistries[i];
      if (s.isForType(e))
        return s;
    }
    return this.plugins;
  }
  _get(e, i, s) {
    const r = i.get(e);
    if (r === void 0)
      throw new Error('"' + e + '" is not a registered ' + s + ".");
    return r;
  }
}
var Fe = /* @__PURE__ */ new Ug();
class Vg {
  constructor() {
    this._init = [];
  }
  notify(e, i, s, r) {
    i === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install"));
    const n = r ? this._descriptors(e).filter(r) : this._descriptors(e), a = this._notify(n, e, i, s);
    return i === "afterDestroy" && (this._notify(n, e, "stop"), this._notify(this._init, e, "uninstall")), a;
  }
  _notify(e, i, s, r) {
    r = r || {};
    for (const n of e) {
      const a = n.plugin, o = a[s], l = [
        i,
        r,
        n.options
      ];
      if (se(o, l, a) === !1 && r.cancelable)
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
    const i = this._cache = this._createDescriptors(e);
    return this._notifyStateChanges(e), i;
  }
  _createDescriptors(e, i) {
    const s = e && e.config, r = W(s.options && s.options.plugins, {}), n = Wg(s);
    return r === !1 && !i ? [] : Yg(e, n, r, i);
  }
  _notifyStateChanges(e) {
    const i = this._oldCache || [], s = this._cache, r = (n, a) => n.filter((o) => !a.some((l) => o.plugin.id === l.plugin.id));
    this._notify(r(i, s), e, "stop"), this._notify(r(s, i), e, "start");
  }
}
function Wg(t) {
  const e = {}, i = [], s = Object.keys(Fe.plugins.items);
  for (let n = 0; n < s.length; n++)
    i.push(Fe.getPlugin(s[n]));
  const r = t.plugins || [];
  for (let n = 0; n < r.length; n++) {
    const a = r[n];
    i.indexOf(a) === -1 && (i.push(a), e[a.id] = !0);
  }
  return {
    plugins: i,
    localIds: e
  };
}
function Kg(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function Yg(t, { plugins: e, localIds: i }, s, r) {
  const n = [], a = t.getContext();
  for (const o of e) {
    const l = o.id, d = Kg(s[l], r);
    d !== null && n.push({
      plugin: o,
      options: Xg(t.config, {
        plugin: o,
        local: i[l]
      }, d, a)
    });
  }
  return n;
}
function Xg(t, { plugin: e, local: i }, s, r) {
  const n = t.pluginScopeKeys(e), a = t.getOptionScopes(s, n);
  return i && e.defaults && a.push(e.defaults), t.createResolver(a, r, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function cr(t, e) {
  const i = ae.datasets[t] || {};
  return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || i.indexAxis || "x";
}
function qg(t, e) {
  let i = t;
  return t === "_index_" ? i = e : t === "_value_" && (i = e === "x" ? "y" : "x"), i;
}
function Zg(t, e) {
  return t === e ? "_index_" : "_value_";
}
function eo(t) {
  if (t === "x" || t === "y" || t === "r")
    return t;
}
function Jg(t) {
  if (t === "top" || t === "bottom")
    return "x";
  if (t === "left" || t === "right")
    return "y";
}
function hr(t, ...e) {
  if (eo(t))
    return t;
  for (const i of e) {
    const s = i.axis || Jg(i.position) || t.length > 1 && eo(t[0].toLowerCase());
    if (s)
      return s;
  }
  throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
}
function to(t, e, i) {
  if (i[e + "AxisID"] === t)
    return {
      axis: e
    };
}
function Qg(t, e) {
  if (e.data && e.data.datasets) {
    const i = e.data.datasets.filter((s) => s.xAxisID === t || s.yAxisID === t);
    if (i.length)
      return to(t, "x", i[0]) || to(t, "y", i[0]);
  }
  return {};
}
function e_(t, e) {
  const i = bt[t.type] || {
    scales: {}
  }, s = e.scales || {}, r = cr(t.type, e), n = /* @__PURE__ */ Object.create(null);
  return Object.keys(s).forEach((a) => {
    const o = s[a];
    if (!X(o))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (o._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const l = hr(a, o, Qg(a, t), ae.scales[o.type]), d = Zg(l, r), c = i.scales || {};
    n[a] = Jt(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      o,
      c[l],
      c[d]
    ]);
  }), t.data.datasets.forEach((a) => {
    const o = a.type || t.type, l = a.indexAxis || cr(o, e), c = (bt[o] || {}).scales || {};
    Object.keys(c).forEach((h) => {
      const u = qg(h, l), g = a[u + "AxisID"] || u;
      n[g] = n[g] || /* @__PURE__ */ Object.create(null), Jt(n[g], [
        {
          axis: u
        },
        s[g],
        c[h]
      ]);
    });
  }), Object.keys(n).forEach((a) => {
    const o = n[a];
    Jt(o, [
      ae.scales[o.type],
      ae.scale
    ]);
  }), n;
}
function Xa(t) {
  const e = t.options || (t.options = {});
  e.plugins = W(e.plugins, {}), e.scales = e_(t, e);
}
function qa(t) {
  return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
}
function t_(t) {
  return t = t || {}, t.data = qa(t.data), Xa(t), t;
}
const io = /* @__PURE__ */ new Map(), Za = /* @__PURE__ */ new Set();
function Li(t, e) {
  let i = io.get(t);
  return i || (i = e(), io.set(t, i), Za.add(i)), i;
}
const jt = (t, e, i) => {
  const s = rt(e, i);
  s !== void 0 && t.add(s);
};
class i_ {
  constructor(e) {
    this._config = t_(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = qa(e);
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
    this.clearCache(), Xa(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return Li(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, i) {
    return Li(`${e}.transition.${i}`, () => [
      [
        `datasets.${e}.transitions.${i}`,
        `transitions.${i}`
      ],
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(e, i) {
    return Li(`${e}-${i}`, () => [
      [
        `datasets.${e}.elements.${i}`,
        `datasets.${e}`,
        `elements.${i}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(e) {
    const i = e.id, s = this.type;
    return Li(`${s}-plugin-${i}`, () => [
      [
        `plugins.${i}`,
        ...e.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(e, i) {
    const s = this._scopeCache;
    let r = s.get(e);
    return (!r || i) && (r = /* @__PURE__ */ new Map(), s.set(e, r)), r;
  }
  getOptionScopes(e, i, s) {
    const { options: r, type: n } = this, a = this._cachedScopes(e, s), o = a.get(i);
    if (o)
      return o;
    const l = /* @__PURE__ */ new Set();
    i.forEach((c) => {
      e && (l.add(e), c.forEach((h) => jt(l, e, h))), c.forEach((h) => jt(l, r, h)), c.forEach((h) => jt(l, bt[n] || {}, h)), c.forEach((h) => jt(l, ae, h)), c.forEach((h) => jt(l, ar, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), Za.has(i) && a.set(i, d), d;
  }
  chartOptionScopes() {
    const { options: e, type: i } = this;
    return [
      e,
      bt[i] || {},
      ae.datasets[i] || {},
      {
        type: i
      },
      ae,
      ar
    ];
  }
  resolveNamedOptions(e, i, s, r = [
    ""
  ]) {
    const n = {
      $shared: !0
    }, { resolver: a, subPrefixes: o } = so(this._resolverCache, e, r);
    let l = a;
    if (r_(a, i)) {
      n.$shared = !1, s = nt(s) ? s() : s;
      const d = this.createResolver(e, s, o);
      l = zt(a, s, d);
    }
    for (const d of i)
      n[d] = l[d];
    return n;
  }
  createResolver(e, i, s = [
    ""
  ], r) {
    const { resolver: n } = so(this._resolverCache, e, s);
    return X(i) ? zt(n, i, void 0, r) : n;
  }
}
function so(t, e, i) {
  let s = t.get(e);
  s || (s = /* @__PURE__ */ new Map(), t.set(e, s));
  const r = i.join();
  let n = s.get(r);
  return n || (n = {
    resolver: Lr(e, i),
    subPrefixes: i.filter((o) => !o.toLowerCase().includes("hover"))
  }, s.set(r, n)), n;
}
const s_ = (t) => X(t) && Object.getOwnPropertyNames(t).some((e) => nt(t[e]));
function r_(t, e) {
  const { isScriptable: i, isIndexable: s } = Ma(t);
  for (const r of e) {
    const n = i(r), a = s(r), o = (a || n) && t[r];
    if (n && (nt(o) || s_(o)) || a && oe(o))
      return !0;
  }
  return !1;
}
var n_ = "4.5.0";
const o_ = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ro(t, e) {
  return t === "top" || t === "bottom" || o_.indexOf(t) === -1 && e === "x";
}
function no(t, e) {
  return function(i, s) {
    return i[t] === s[t] ? i[e] - s[e] : i[t] - s[t];
  };
}
function oo(t) {
  const e = t.chart, i = e.options.animation;
  e.notifyPlugins("afterRender"), se(i && i.onComplete, [
    t
  ], e);
}
function a_(t) {
  const e = t.chart, i = e.options.animation;
  se(i && i.onProgress, [
    t
  ], e);
}
function Ja(t) {
  return Or() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
}
const Vi = {}, ao = (t) => {
  const e = Ja(t);
  return Object.values(Vi).filter((i) => i.canvas === e).pop();
};
function l_(t, e, i) {
  const s = Object.keys(t);
  for (const r of s) {
    const n = +r;
    if (n >= e) {
      const a = t[r];
      delete t[r], (i > 0 || n > e) && (t[n + i] = a);
    }
  }
}
function d_(t, e, i, s) {
  return !i || t.type === "mouseout" ? null : s ? e : t;
}
class Ge {
  static register(...e) {
    Fe.add(...e), lo();
  }
  static unregister(...e) {
    Fe.remove(...e), lo();
  }
  constructor(e, i) {
    const s = this.config = new i_(i), r = Ja(e), n = ao(r);
    if (n)
      throw new Error("Canvas is already in use. Chart with ID '" + n.id + "' must be destroyed before the canvas with ID '" + n.canvas.id + "' can be reused.");
    const a = s.createResolver(s.chartOptionScopes(), this.getContext());
    this.platform = new (s.platform || Cg(r))(), this.platform.updateConfig(s);
    const o = this.platform.acquireContext(r, a.aspectRatio), l = o && o.canvas, d = l && l.height, c = l && l.width;
    if (this.id = ch(), this.ctx = o, this.canvas = l, this.width = c, this.height = d, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Vg(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ch((h) => this.update(h), a.resizeDelay || 0), this._dataChanges = [], Vi[this.id] = this, !o || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Ve.listen(this, "complete", oo), Ve.listen(this, "progress", a_), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: e, maintainAspectRatio: i }, width: s, height: r, _aspectRatio: n } = this;
    return K(e) ? i && n ? n : r ? s / r : null : e;
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
    return Fe;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : $n(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Cn(this.canvas, this.ctx), this;
  }
  stop() {
    return Ve.stop(this), this;
  }
  resize(e, i) {
    Ve.running(this) ? this._resizeBeforeDraw = {
      width: e,
      height: i
    } : this._resize(e, i);
  }
  _resize(e, i) {
    const s = this.options, r = this.canvas, n = s.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(r, e, i, n), o = s.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, $n(this, o, !0) && (this.notifyPlugins("resize", {
      size: a
    }), se(s.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const i = this.options.scales || {};
    te(i, (s, r) => {
      s.id = r;
    });
  }
  buildOrUpdateScales() {
    const e = this.options, i = e.scales, s = this.scales, r = Object.keys(s).reduce((a, o) => (a[o] = !1, a), {});
    let n = [];
    i && (n = n.concat(Object.keys(i).map((a) => {
      const o = i[a], l = hr(a, o), d = l === "r", c = l === "x";
      return {
        options: o,
        dposition: d ? "chartArea" : c ? "bottom" : "left",
        dtype: d ? "radialLinear" : c ? "category" : "linear"
      };
    }))), te(n, (a) => {
      const o = a.options, l = o.id, d = hr(l, o), c = W(o.type, a.dtype);
      (o.position === void 0 || ro(o.position, d) !== ro(a.dposition)) && (o.position = a.dposition), r[l] = !0;
      let h = null;
      if (l in s && s[l].type === c)
        h = s[l];
      else {
        const u = Fe.getScale(c);
        h = new u({
          id: l,
          type: c,
          ctx: this.ctx,
          chart: this
        }), s[h.id] = h;
      }
      h.init(o, e);
    }), te(r, (a, o) => {
      a || delete s[o];
    }), te(s, (a) => {
      ye.configure(this, a, a.options), ye.addBox(this, a);
    });
  }
  _updateMetasets() {
    const e = this._metasets, i = this.data.datasets.length, s = e.length;
    if (e.sort((r, n) => r.index - n.index), s > i) {
      for (let r = i; r < s; ++r)
        this._destroyDatasetMeta(r);
      e.splice(i, s - i);
    }
    this._sortedMetasets = e.slice(0).sort(no("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: e, data: { datasets: i } } = this;
    e.length > i.length && delete this._stacks, e.forEach((s, r) => {
      i.filter((n) => n === s._dataset).length === 0 && this._destroyDatasetMeta(r);
    });
  }
  buildOrUpdateControllers() {
    const e = [], i = this.data.datasets;
    let s, r;
    for (this._removeUnreferencedMetasets(), s = 0, r = i.length; s < r; s++) {
      const n = i[s];
      let a = this.getDatasetMeta(s);
      const o = n.type || this.config.type;
      if (a.type && a.type !== o && (this._destroyDatasetMeta(s), a = this.getDatasetMeta(s)), a.type = o, a.indexAxis = n.indexAxis || cr(o, this.options), a.order = n.order || 0, a.index = s, a.label = "" + n.label, a.visible = this.isDatasetVisible(s), a.controller)
        a.controller.updateIndex(s), a.controller.linkScales();
      else {
        const l = Fe.getController(o), { datasetElementType: d, dataElementType: c } = ae.datasets[o];
        Object.assign(l, {
          dataElementType: Fe.getElement(c),
          datasetElementType: d && Fe.getElement(d)
        }), a.controller = new l(this, s), e.push(a.controller);
      }
    }
    return this._updateMetasets(), e;
  }
  _resetElements() {
    te(this.data.datasets, (e, i) => {
      this.getDatasetMeta(i).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(e) {
    const i = this.config;
    i.update();
    const s = this._options = i.createResolver(i.chartOptionScopes(), this.getContext()), r = this._animationsDisabled = !s.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: e,
      cancelable: !0
    }) === !1)
      return;
    const n = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let a = 0;
    for (let d = 0, c = this.data.datasets.length; d < c; d++) {
      const { controller: h } = this.getDatasetMeta(d), u = !r && n.indexOf(h) === -1;
      h.buildOrUpdateElements(u), a = Math.max(+h.getMaxOverflow(), a);
    }
    a = this._minPadding = s.layout.autoPadding ? a : 0, this._updateLayout(a), r || te(n, (d) => {
      d.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(no("z", "_idx"));
    const { _active: o, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : o.length && this._updateHoverStyles(o, o, !0), this.render();
  }
  _updateScales() {
    te(this.scales, (e) => {
      ye.removeBox(this, e);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const e = this.options, i = new Set(Object.keys(this._listeners)), s = new Set(e.events);
    (!vn(i, s) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, i = this._getUniformDataChanges() || [];
    for (const { method: s, start: r, count: n } of i) {
      const a = s === "_removeElements" ? -n : n;
      l_(e, r, a);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const i = this.data.datasets.length, s = (n) => new Set(e.filter((a) => a[0] === n).map((a, o) => o + "," + a.splice(1).join(","))), r = s(0);
    for (let n = 1; n < i; n++)
      if (!vn(r, s(n)))
        return;
    return Array.from(r).map((n) => n.split(",")).map((n) => ({
      method: n[1],
      start: +n[2],
      count: +n[3]
    }));
  }
  _updateLayout(e) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    ye.update(this, this.width, this.height, e);
    const i = this.chartArea, s = i.width <= 0 || i.height <= 0;
    this._layers = [], te(this.boxes, (r) => {
      s && r.position === "chartArea" || (r.configure && r.configure(), this._layers.push(...r._layers()));
    }, this), this._layers.forEach((r, n) => {
      r._idx = n;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(e) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: e,
      cancelable: !0
    }) !== !1) {
      for (let i = 0, s = this.data.datasets.length; i < s; ++i)
        this.getDatasetMeta(i).controller.configure();
      for (let i = 0, s = this.data.datasets.length; i < s; ++i)
        this._updateDataset(i, nt(e) ? e({
          datasetIndex: i
        }) : e);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: e
      });
    }
  }
  _updateDataset(e, i) {
    const s = this.getDatasetMeta(e), r = {
      meta: s,
      index: e,
      mode: i,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", r) !== !1 && (s.controller._update(i), r.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", r));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Ve.has(this) ? this.attached && !Ve.running(this) && Ve.start(this) : (this.draw(), oo({
      chart: this
    })));
  }
  draw() {
    let e;
    if (this._resizeBeforeDraw) {
      const { width: s, height: r } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(s, r);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const i = this._layers;
    for (e = 0; e < i.length && i[e].z <= 0; ++e)
      i[e].draw(this.chartArea);
    for (this._drawDatasets(); e < i.length; ++e)
      i[e].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(e) {
    const i = this._sortedMetasets, s = [];
    let r, n;
    for (r = 0, n = i.length; r < n; ++r) {
      const a = i[r];
      (!e || a.visible) && s.push(a);
    }
    return s;
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
    for (let i = e.length - 1; i >= 0; --i)
      this._drawDataset(e[i]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(e) {
    const i = this.ctx, s = {
      meta: e,
      index: e.index,
      cancelable: !0
    }, r = Ha(this, e);
    this.notifyPlugins("beforeDatasetDraw", s) !== !1 && (r && ds(i, r), e.controller.draw(), r && cs(i), s.cancelable = !1, this.notifyPlugins("afterDatasetDraw", s));
  }
  isPointInArea(e) {
    return qe(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, i, s, r) {
    const n = og.modes[i];
    return typeof n == "function" ? n(this, e, s, r) : [];
  }
  getDatasetMeta(e) {
    const i = this.data.datasets[e], s = this._metasets;
    let r = s.filter((n) => n && n._dataset === i).pop();
    return r || (r = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: i && i.order || 0,
      index: e,
      _dataset: i,
      _parsed: [],
      _sorted: !1
    }, s.push(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = ot(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(e) {
    const i = this.data.datasets[e];
    if (!i)
      return !1;
    const s = this.getDatasetMeta(e);
    return typeof s.hidden == "boolean" ? !s.hidden : !i.hidden;
  }
  setDatasetVisibility(e, i) {
    const s = this.getDatasetMeta(e);
    s.hidden = !i;
  }
  toggleDataVisibility(e) {
    this._hiddenIndices[e] = !this._hiddenIndices[e];
  }
  getDataVisibility(e) {
    return !this._hiddenIndices[e];
  }
  _updateVisibility(e, i, s) {
    const r = s ? "show" : "hide", n = this.getDatasetMeta(e), a = n.controller._resolveAnimations(void 0, r);
    di(i) ? (n.data[i].hidden = !s, this.update()) : (this.setDatasetVisibility(e, s), a.update(n, {
      visible: s
    }), this.update((o) => o.datasetIndex === e ? r : void 0));
  }
  hide(e, i) {
    this._updateVisibility(e, i, !1);
  }
  show(e, i) {
    this._updateVisibility(e, i, !0);
  }
  _destroyDatasetMeta(e) {
    const i = this._metasets[e];
    i && i.controller && i.controller._destroy(), delete this._metasets[e];
  }
  _stop() {
    let e, i;
    for (this.stop(), Ve.remove(this), e = 0, i = this.data.datasets.length; e < i; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: e, ctx: i } = this;
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Cn(e, i), this.platform.releaseContext(i), this.canvas = null, this.ctx = null), delete Vi[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...e) {
    return this.canvas.toDataURL(...e);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const e = this._listeners, i = this.platform, s = (n, a) => {
      i.addEventListener(this, n, a), e[n] = a;
    }, r = (n, a, o) => {
      n.offsetX = a, n.offsetY = o, this._eventHandler(n);
    };
    te(this.options.events, (n) => s(n, r));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const e = this._responsiveListeners, i = this.platform, s = (l, d) => {
      i.addEventListener(this, l, d), e[l] = d;
    }, r = (l, d) => {
      e[l] && (i.removeEventListener(this, l, d), delete e[l]);
    }, n = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let a;
    const o = () => {
      r("attach", o), this.attached = !0, this.resize(), s("resize", n), s("detach", a);
    };
    a = () => {
      this.attached = !1, r("resize", n), this._stop(), this._resize(0, 0), s("attach", o);
    }, i.isAttached(this.canvas) ? o() : a();
  }
  unbindEvents() {
    te(this._listeners, (e, i) => {
      this.platform.removeEventListener(this, i, e);
    }), this._listeners = {}, te(this._responsiveListeners, (e, i) => {
      this.platform.removeEventListener(this, i, e);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(e, i, s) {
    const r = s ? "set" : "remove";
    let n, a, o, l;
    for (i === "dataset" && (n = this.getDatasetMeta(e[0].datasetIndex), n.controller["_" + r + "DatasetHoverStyle"]()), o = 0, l = e.length; o < l; ++o) {
      a = e[o];
      const d = a && this.getDatasetMeta(a.datasetIndex).controller;
      d && d[r + "HoverStyle"](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e) {
    const i = this._active || [], s = e.map(({ datasetIndex: n, index: a }) => {
      const o = this.getDatasetMeta(n);
      if (!o)
        throw new Error("No dataset found at index " + n);
      return {
        datasetIndex: n,
        element: o.data[a],
        index: a
      };
    });
    !Zi(s, i) && (this._active = s, this._lastEvent = null, this._updateHoverStyles(s, i));
  }
  notifyPlugins(e, i, s) {
    return this._plugins.notify(this, e, i, s);
  }
  isPluginEnabled(e) {
    return this._plugins._cache.filter((i) => i.plugin.id === e).length === 1;
  }
  _updateHoverStyles(e, i, s) {
    const r = this.options.hover, n = (l, d) => l.filter((c) => !d.some((h) => c.datasetIndex === h.datasetIndex && c.index === h.index)), a = n(i, e), o = s ? e : n(e, i);
    a.length && this.updateHoverStyle(a, r.mode, !1), o.length && r.mode && this.updateHoverStyle(o, r.mode, !0);
  }
  _eventHandler(e, i) {
    const s = {
      event: e,
      replay: i,
      cancelable: !0,
      inChartArea: this.isPointInArea(e)
    }, r = (a) => (a.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", s, r) === !1)
      return;
    const n = this._handleEvent(e, i, s.inChartArea);
    return s.cancelable = !1, this.notifyPlugins("afterEvent", s, r), (n || s.changed) && this.render(), this;
  }
  _handleEvent(e, i, s) {
    const { _active: r = [], options: n } = this, a = i, o = this._getActiveElements(e, r, s, a), l = ph(e), d = d_(e, this._lastEvent, s, l);
    s && (this._lastEvent = null, se(n.onHover, [
      e,
      o,
      this
    ], this), l && se(n.onClick, [
      e,
      o,
      this
    ], this));
    const c = !Zi(o, r);
    return (c || i) && (this._active = o, this._updateHoverStyles(o, r, i)), this._lastEvent = d, c;
  }
  _getActiveElements(e, i, s, r) {
    if (e.type === "mouseout")
      return [];
    if (!s)
      return i;
    const n = this.options.hover;
    return this.getElementsAtEventForMode(e, n.mode, n, r);
  }
}
I(Ge, "defaults", ae), I(Ge, "instances", Vi), I(Ge, "overrides", bt), I(Ge, "registry", Fe), I(Ge, "version", n_), I(Ge, "getChart", ao);
function lo() {
  return te(Ge.instances, (t) => t._plugins.invalidate());
}
function c_(t, e, i) {
  const { startAngle: s, x: r, y: n, outerRadius: a, innerRadius: o, options: l } = e, { borderWidth: d, borderJoinStyle: c } = l, h = Math.min(d / a, ve(s - i));
  if (t.beginPath(), t.arc(r, n, a - d / 2, s + h / 2, i - h / 2), o > 0) {
    const u = Math.min(d / o, ve(s - i));
    t.arc(r, n, o + d / 2, i - u / 2, s + u / 2, !0);
  } else {
    const u = Math.min(d / 2, a * ve(s - i));
    if (c === "round")
      t.arc(r, n, u, i - ee / 2, s + ee / 2, !0);
    else if (c === "bevel") {
      const g = 2 * u * u, _ = -g * Math.cos(i + ee / 2) + r, f = -g * Math.sin(i + ee / 2) + n, p = g * Math.cos(s + ee / 2) + r, m = g * Math.sin(s + ee / 2) + n;
      t.lineTo(_, f), t.lineTo(p, m);
    }
  }
  t.closePath(), t.moveTo(0, 0), t.rect(0, 0, t.canvas.width, t.canvas.height), t.clip("evenodd");
}
function h_(t, e, i) {
  const { startAngle: s, pixelMargin: r, x: n, y: a, outerRadius: o, innerRadius: l } = e;
  let d = r / o;
  t.beginPath(), t.arc(n, a, o, s - d, i + d), l > r ? (d = r / l, t.arc(n, a, l, i + d, s - d, !0)) : t.arc(n, a, r, i + ce, s - ce), t.closePath(), t.clip();
}
function u_(t) {
  return Tr(t, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function g_(t, e, i, s) {
  const r = u_(t.options.borderRadius), n = (i - e) / 2, a = Math.min(n, s * e / 2), o = (l) => {
    const d = (i - Math.min(n, l)) * s / 2;
    return _e(l, 0, Math.min(n, d));
  };
  return {
    outerStart: o(r.outerStart),
    outerEnd: o(r.outerEnd),
    innerStart: _e(r.innerStart, 0, a),
    innerEnd: _e(r.innerEnd, 0, a)
  };
}
function St(t, e, i, s) {
  return {
    x: i + t * Math.cos(e),
    y: s + t * Math.sin(e)
  };
}
function ss(t, e, i, s, r, n) {
  const { x: a, y: o, startAngle: l, pixelMargin: d, innerRadius: c } = e, h = Math.max(e.outerRadius + s + i - d, 0), u = c > 0 ? c + s + i + d : 0;
  let g = 0;
  const _ = r - l;
  if (s) {
    const T = c > 0 ? c - s : 0, D = h > 0 ? h - s : 0, R = (T + D) / 2, $ = R !== 0 ? _ * R / (R + s) : _;
    g = (_ - $) / 2;
  }
  const f = Math.max(1e-3, _ * h - i / ee) / h, p = (_ - f) / 2, m = l + p + g, v = r - p - g, { outerStart: E, outerEnd: C, innerStart: x, innerEnd: k } = g_(e, u, h, v - m), w = h - E, b = h - C, A = m + E / w, M = v - C / b, P = u + x, y = u + k, L = m + x / P, S = v - k / y;
  if (t.beginPath(), n) {
    const T = (A + M) / 2;
    if (t.arc(a, o, h, A, T), t.arc(a, o, h, T, M), C > 0) {
      const N = St(b, M, a, o);
      t.arc(N.x, N.y, C, M, v + ce);
    }
    const D = St(y, v, a, o);
    if (t.lineTo(D.x, D.y), k > 0) {
      const N = St(y, S, a, o);
      t.arc(N.x, N.y, k, v + ce, S + Math.PI);
    }
    const R = (v - k / u + (m + x / u)) / 2;
    if (t.arc(a, o, u, v - k / u, R, !0), t.arc(a, o, u, R, m + x / u, !0), x > 0) {
      const N = St(P, L, a, o);
      t.arc(N.x, N.y, x, L + Math.PI, m - ce);
    }
    const $ = St(w, m, a, o);
    if (t.lineTo($.x, $.y), E > 0) {
      const N = St(w, A, a, o);
      t.arc(N.x, N.y, E, m - ce, A);
    }
  } else {
    t.moveTo(a, o);
    const T = Math.cos(A) * h + a, D = Math.sin(A) * h + o;
    t.lineTo(T, D);
    const R = Math.cos(M) * h + a, $ = Math.sin(M) * h + o;
    t.lineTo(R, $);
  }
  t.closePath();
}
function __(t, e, i, s, r) {
  const { fullCircles: n, startAngle: a, circumference: o } = e;
  let l = e.endAngle;
  if (n) {
    ss(t, e, i, s, l, r);
    for (let d = 0; d < n; ++d)
      t.fill();
    isNaN(o) || (l = a + (o % re || re));
  }
  return ss(t, e, i, s, l, r), t.fill(), l;
}
function f_(t, e, i, s, r) {
  const { fullCircles: n, startAngle: a, circumference: o, options: l } = e, { borderWidth: d, borderJoinStyle: c, borderDash: h, borderDashOffset: u, borderRadius: g } = l, _ = l.borderAlign === "inner";
  if (!d)
    return;
  t.setLineDash(h || []), t.lineDashOffset = u, _ ? (t.lineWidth = d * 2, t.lineJoin = c || "round") : (t.lineWidth = d, t.lineJoin = c || "bevel");
  let f = e.endAngle;
  if (n) {
    ss(t, e, i, s, f, r);
    for (let p = 0; p < n; ++p)
      t.stroke();
    isNaN(o) || (f = a + (o % re || re));
  }
  _ && h_(t, e, f), l.selfJoin && f - a >= ee && g === 0 && c !== "miter" && c_(t, e, f), n || (ss(t, e, i, s, f, r), t.stroke());
}
class Et extends Be {
  constructor(i) {
    super();
    I(this, "circumference");
    I(this, "endAngle");
    I(this, "fullCircles");
    I(this, "innerRadius");
    I(this, "outerRadius");
    I(this, "pixelMargin");
    I(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, i && Object.assign(this, i);
  }
  inRange(i, s, r) {
    const n = this.getProps([
      "x",
      "y"
    ], r), { angle: a, distance: o } = ya(n, {
      x: i,
      y: s
    }), { startAngle: l, endAngle: d, innerRadius: c, outerRadius: h, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], r), g = (this.options.spacing + this.options.borderWidth) / 2, _ = W(u, d - l), f = ci(a, l, d) && l !== d, p = _ >= re || f, m = Ye(o, c + g, h + g);
    return p && m;
  }
  getCenterPoint(i) {
    const { x: s, y: r, startAngle: n, endAngle: a, innerRadius: o, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], i), { offset: d, spacing: c } = this.options, h = (n + a) / 2, u = (o + l + c + d) / 2;
    return {
      x: s + Math.cos(h) * u,
      y: r + Math.sin(h) * u
    };
  }
  tooltipPosition(i) {
    return this.getCenterPoint(i);
  }
  draw(i) {
    const { options: s, circumference: r } = this, n = (s.offset || 0) / 4, a = (s.spacing || 0) / 2, o = s.circular;
    if (this.pixelMargin = s.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = r > re ? Math.floor(r / re) : 0, r === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    i.save();
    const l = (this.startAngle + this.endAngle) / 2;
    i.translate(Math.cos(l) * n, Math.sin(l) * n);
    const d = 1 - Math.sin(Math.min(ee, r || 0)), c = n * d;
    i.fillStyle = s.backgroundColor, i.strokeStyle = s.borderColor, __(i, this, c, a, o), f_(i, this, c, a, o), i.restore();
  }
}
I(Et, "id", "arc"), I(Et, "defaults", {
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
}), I(Et, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), I(Et, "descriptors", {
  _scriptable: !0,
  _indexable: (i) => i !== "borderDash"
});
function Qa(t, e, i = e) {
  t.lineCap = W(i.borderCapStyle, e.borderCapStyle), t.setLineDash(W(i.borderDash, e.borderDash)), t.lineDashOffset = W(i.borderDashOffset, e.borderDashOffset), t.lineJoin = W(i.borderJoinStyle, e.borderJoinStyle), t.lineWidth = W(i.borderWidth, e.borderWidth), t.strokeStyle = W(i.borderColor, e.borderColor);
}
function p_(t, e, i) {
  t.lineTo(i.x, i.y);
}
function m_(t) {
  return t.stepped ? Bh : t.tension || t.cubicInterpolationMode === "monotone" ? Hh : p_;
}
function el(t, e, i = {}) {
  const s = t.length, { start: r = 0, end: n = s - 1 } = i, { start: a, end: o } = e, l = Math.max(r, a), d = Math.min(n, o), c = r < a && n < a || r > o && n > o;
  return {
    count: s,
    start: l,
    loop: e.loop,
    ilen: d < l && !c ? s + d - l : d - l
  };
}
function v_(t, e, i, s) {
  const { points: r, options: n } = e, { count: a, start: o, loop: l, ilen: d } = el(r, i, s), c = m_(n);
  let { move: h = !0, reverse: u } = s || {}, g, _, f;
  for (g = 0; g <= d; ++g)
    _ = r[(o + (u ? d - g : g)) % a], !_.skip && (h ? (t.moveTo(_.x, _.y), h = !1) : c(t, f, _, u, n.stepped), f = _);
  return l && (_ = r[(o + (u ? d : 0)) % a], c(t, f, _, u, n.stepped)), !!l;
}
function y_(t, e, i, s) {
  const r = e.points, { count: n, start: a, ilen: o } = el(r, i, s), { move: l = !0, reverse: d } = s || {};
  let c = 0, h = 0, u, g, _, f, p, m;
  const v = (C) => (a + (d ? o - C : C)) % n, E = () => {
    f !== p && (t.lineTo(c, p), t.lineTo(c, f), t.lineTo(c, m));
  };
  for (l && (g = r[v(0)], t.moveTo(g.x, g.y)), u = 0; u <= o; ++u) {
    if (g = r[v(u)], g.skip)
      continue;
    const C = g.x, x = g.y, k = C | 0;
    k === _ ? (x < f ? f = x : x > p && (p = x), c = (h * c + C) / ++h) : (E(), t.lineTo(C, x), _ = k, h = 0, f = p = x), m = x;
  }
  E();
}
function ur(t) {
  const e = t.options, i = e.borderDash && e.borderDash.length;
  return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !i ? y_ : v_;
}
function b_(t) {
  return t.stepped ? vu : t.tension || t.cubicInterpolationMode === "monotone" ? yu : gt;
}
function x_(t, e, i, s) {
  let r = e._path;
  r || (r = e._path = new Path2D(), e.path(r, i, s) && r.closePath()), Qa(t, e.options), t.stroke(r);
}
function w_(t, e, i, s) {
  const { segments: r, options: n } = e, a = ur(e);
  for (const o of r)
    Qa(t, n, o.style), t.beginPath(), a(t, e, o, {
      start: i,
      end: i + s - 1
    }) && t.closePath(), t.stroke();
}
const k_ = typeof Path2D == "function";
function S_(t, e, i, s) {
  k_ && !e.options.segment ? x_(t, e, i, s) : w_(t, e, i, s);
}
class tt extends Be {
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, i) {
    const s = this.options;
    if ((s.tension || s.cubicInterpolationMode === "monotone") && !s.stepped && !this._pointsUpdated) {
      const r = s.spanGaps ? this._loop : this._fullLoop;
      cu(this._points, s, e, r, i), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Au(this, this.options.segment));
  }
  first() {
    const e = this.segments, i = this.points;
    return e.length && i[e[0].start];
  }
  last() {
    const e = this.segments, i = this.points, s = e.length;
    return s && i[e[s - 1].end];
  }
  interpolate(e, i) {
    const s = this.options, r = e[i], n = this.points, a = Ba(this, {
      property: i,
      start: r,
      end: r
    });
    if (!a.length)
      return;
    const o = [], l = b_(s);
    let d, c;
    for (d = 0, c = a.length; d < c; ++d) {
      const { start: h, end: u } = a[d], g = n[h], _ = n[u];
      if (g === _) {
        o.push(g);
        continue;
      }
      const f = Math.abs((r - g[i]) / (_[i] - g[i])), p = l(g, _, f, s.stepped);
      p[i] = e[i], o.push(p);
    }
    return o.length === 1 ? o[0] : o;
  }
  pathSegment(e, i, s) {
    return ur(this)(e, this, i, s);
  }
  path(e, i, s) {
    const r = this.segments, n = ur(this);
    let a = this._loop;
    i = i || 0, s = s || this.points.length - i;
    for (const o of r)
      a &= n(e, this, o, {
        start: i,
        end: i + s - 1
      });
    return !!a;
  }
  draw(e, i, s, r) {
    const n = this.options || {};
    (this.points || []).length && n.borderWidth && (e.save(), S_(e, this, s, r), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
I(tt, "id", "line"), I(tt, "defaults", {
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
}), I(tt, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), I(tt, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
});
function co(t, e, i, s) {
  const r = t.options, { [i]: n } = t.getProps([
    i
  ], s);
  return Math.abs(e - n) < r.radius + r.hitRadius;
}
class Wi extends Be {
  constructor(i) {
    super();
    I(this, "parsed");
    I(this, "skip");
    I(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, i && Object.assign(this, i);
  }
  inRange(i, s, r) {
    const n = this.options, { x: a, y: o } = this.getProps([
      "x",
      "y"
    ], r);
    return Math.pow(i - a, 2) + Math.pow(s - o, 2) < Math.pow(n.hitRadius + n.radius, 2);
  }
  inXRange(i, s) {
    return co(this, i, "x", s);
  }
  inYRange(i, s) {
    return co(this, i, "y", s);
  }
  getCenterPoint(i) {
    const { x: s, y: r } = this.getProps([
      "x",
      "y"
    ], i);
    return {
      x: s,
      y: r
    };
  }
  size(i) {
    i = i || this.options || {};
    let s = i.radius || 0;
    s = Math.max(s, s && i.hoverRadius || 0);
    const r = s && i.borderWidth || 0;
    return (s + r) * 2;
  }
  draw(i, s) {
    const r = this.options;
    this.skip || r.radius < 0.1 || !qe(this, s, this.size(r) / 2) || (i.strokeStyle = r.borderColor, i.lineWidth = r.borderWidth, i.fillStyle = r.backgroundColor, lr(i, r, this.x, this.y));
  }
  getRange() {
    const i = this.options || {};
    return i.radius + i.hitRadius;
  }
}
I(Wi, "id", "point"), /**
* @type {any}
*/
I(Wi, "defaults", {
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
I(Wi, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function tl(t, e) {
  const { x: i, y: s, base: r, width: n, height: a } = t.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], e);
  let o, l, d, c, h;
  return t.horizontal ? (h = a / 2, o = Math.min(i, r), l = Math.max(i, r), d = s - h, c = s + h) : (h = n / 2, o = i - h, l = i + h, d = Math.min(s, r), c = Math.max(s, r)), {
    left: o,
    top: d,
    right: l,
    bottom: c
  };
}
function it(t, e, i, s) {
  return t ? 0 : _e(e, i, s);
}
function A_(t, e, i) {
  const s = t.options.borderWidth, r = t.borderSkipped, n = Pa(s);
  return {
    t: it(r.top, n.top, 0, i),
    r: it(r.right, n.right, 0, e),
    b: it(r.bottom, n.bottom, 0, i),
    l: it(r.left, n.left, 0, e)
  };
}
function E_(t, e, i) {
  const { enableBorderRadius: s } = t.getProps([
    "enableBorderRadius"
  ]), r = t.options.borderRadius, n = pt(r), a = Math.min(e, i), o = t.borderSkipped, l = s || X(r);
  return {
    topLeft: it(!l || o.top || o.left, n.topLeft, 0, a),
    topRight: it(!l || o.top || o.right, n.topRight, 0, a),
    bottomLeft: it(!l || o.bottom || o.left, n.bottomLeft, 0, a),
    bottomRight: it(!l || o.bottom || o.right, n.bottomRight, 0, a)
  };
}
function C_(t) {
  const e = tl(t), i = e.right - e.left, s = e.bottom - e.top, r = A_(t, i / 2, s / 2), n = E_(t, i / 2, s / 2);
  return {
    outer: {
      x: e.left,
      y: e.top,
      w: i,
      h: s,
      radius: n
    },
    inner: {
      x: e.left + r.l,
      y: e.top + r.t,
      w: i - r.l - r.r,
      h: s - r.t - r.b,
      radius: {
        topLeft: Math.max(0, n.topLeft - Math.max(r.t, r.l)),
        topRight: Math.max(0, n.topRight - Math.max(r.t, r.r)),
        bottomLeft: Math.max(0, n.bottomLeft - Math.max(r.b, r.l)),
        bottomRight: Math.max(0, n.bottomRight - Math.max(r.b, r.r))
      }
    }
  };
}
function Ns(t, e, i, s) {
  const r = e === null, n = i === null, o = t && !(r && n) && tl(t, s);
  return o && (r || Ye(e, o.left, o.right)) && (n || Ye(i, o.top, o.bottom));
}
function P_(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function M_(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function Bs(t, e, i = {}) {
  const s = t.x !== i.x ? -e : 0, r = t.y !== i.y ? -e : 0, n = (t.x + t.w !== i.x + i.w ? e : 0) - s, a = (t.y + t.h !== i.y + i.h ? e : 0) - r;
  return {
    x: t.x + s,
    y: t.y + r,
    w: t.w + n,
    h: t.h + a,
    radius: t.radius
  };
}
class Ki extends Be {
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: i, options: { borderColor: s, backgroundColor: r } } = this, { inner: n, outer: a } = C_(this), o = P_(a.radius) ? hi : M_;
    e.save(), (a.w !== n.w || a.h !== n.h) && (e.beginPath(), o(e, Bs(a, i, n)), e.clip(), o(e, Bs(n, -i, a)), e.fillStyle = s, e.fill("evenodd")), e.beginPath(), o(e, Bs(n, i)), e.fillStyle = r, e.fill(), e.restore();
  }
  inRange(e, i, s) {
    return Ns(this, e, i, s);
  }
  inXRange(e, i) {
    return Ns(this, e, null, i);
  }
  inYRange(e, i) {
    return Ns(this, null, e, i);
  }
  getCenterPoint(e) {
    const { x: i, y: s, base: r, horizontal: n } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], e);
    return {
      x: n ? (i + r) / 2 : i,
      y: n ? s : (s + r) / 2
    };
  }
  getRange(e) {
    return e === "x" ? this.width / 2 : this.height / 2;
  }
}
I(Ki, "id", "bar"), I(Ki, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), I(Ki, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var $_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: Et,
  BarElement: Ki,
  LineElement: tt,
  PointElement: Wi
});
const gr = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], ho = /* @__PURE__ */ gr.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function il(t) {
  return gr[t % gr.length];
}
function sl(t) {
  return ho[t % ho.length];
}
function T_(t, e) {
  return t.borderColor = il(e), t.backgroundColor = sl(e), ++e;
}
function L_(t, e) {
  return t.backgroundColor = t.data.map(() => il(e++)), e;
}
function D_(t, e) {
  return t.backgroundColor = t.data.map(() => sl(e++)), e;
}
function z_(t) {
  let e = 0;
  return (i, s) => {
    const r = t.getDatasetMeta(s).controller;
    r instanceof et ? e = L_(i, e) : r instanceof ii ? e = D_(i, e) : r && (e = T_(i, e));
  };
}
function uo(t) {
  let e;
  for (e in t)
    if (t[e].borderColor || t[e].backgroundColor)
      return !0;
  return !1;
}
function O_(t) {
  return t && (t.borderColor || t.backgroundColor);
}
function R_() {
  return ae.borderColor !== "rgba(0,0,0,0.1)" || ae.backgroundColor !== "rgba(0,0,0,0.1)";
}
var I_ = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(t, e, i) {
    if (!i.enabled)
      return;
    const { data: { datasets: s }, options: r } = t.config, { elements: n } = r, a = uo(s) || O_(r) || n && uo(n) || R_();
    if (!i.forceOverride && a)
      return;
    const o = z_(t);
    s.forEach(o);
  }
};
function N_(t, e, i, s, r) {
  const n = r.samples || s;
  if (n >= i)
    return t.slice(e, e + i);
  const a = [], o = (i - 2) / (n - 2);
  let l = 0;
  const d = e + i - 1;
  let c = e, h, u, g, _, f;
  for (a[l++] = t[c], h = 0; h < n - 2; h++) {
    let p = 0, m = 0, v;
    const E = Math.floor((h + 1) * o) + 1 + e, C = Math.min(Math.floor((h + 2) * o) + 1, i) + e, x = C - E;
    for (v = E; v < C; v++)
      p += t[v].x, m += t[v].y;
    p /= x, m /= x;
    const k = Math.floor(h * o) + 1 + e, w = Math.min(Math.floor((h + 1) * o) + 1, i) + e, { x: b, y: A } = t[c];
    for (g = _ = -1, v = k; v < w; v++)
      _ = 0.5 * Math.abs((b - p) * (t[v].y - A) - (b - t[v].x) * (m - A)), _ > g && (g = _, u = t[v], f = v);
    a[l++] = u, c = f;
  }
  return a[l++] = t[d], a;
}
function B_(t, e, i, s) {
  let r = 0, n = 0, a, o, l, d, c, h, u, g, _, f;
  const p = [], m = e + i - 1, v = t[e].x, C = t[m].x - v;
  for (a = e; a < e + i; ++a) {
    o = t[a], l = (o.x - v) / C * s, d = o.y;
    const x = l | 0;
    if (x === c)
      d < _ ? (_ = d, h = a) : d > f && (f = d, u = a), r = (n * r + o.x) / ++n;
    else {
      const k = a - 1;
      if (!K(h) && !K(u)) {
        const w = Math.min(h, u), b = Math.max(h, u);
        w !== g && w !== k && p.push({
          ...t[w],
          x: r
        }), b !== g && b !== k && p.push({
          ...t[b],
          x: r
        });
      }
      a > 0 && k !== g && p.push(t[k]), p.push(o), c = x, n = 0, _ = f = d, h = u = g = a;
    }
  }
  return p;
}
function rl(t) {
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
function go(t) {
  t.data.datasets.forEach((e) => {
    rl(e);
  });
}
function H_(t, e) {
  const i = e.length;
  let s = 0, r;
  const { iScale: n } = t, { min: a, max: o, minDefined: l, maxDefined: d } = n.getUserBounds();
  return l && (s = _e(Xe(e, n.axis, a).lo, 0, i - 1)), d ? r = _e(Xe(e, n.axis, o).hi + 1, s, i) - s : r = i - s, {
    start: s,
    count: r
  };
}
var F_ = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (t, e, i) => {
    if (!i.enabled) {
      go(t);
      return;
    }
    const s = t.width;
    t.data.datasets.forEach((r, n) => {
      const { _data: a, indexAxis: o } = r, l = t.getDatasetMeta(n), d = a || r.data;
      if (Wt([
        o,
        t.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const c = t.scales[l.xAxisID];
      if (c.type !== "linear" && c.type !== "time" || t.options.parsing)
        return;
      let { start: h, count: u } = H_(l, d);
      const g = i.threshold || 4 * s;
      if (u <= g) {
        rl(r);
        return;
      }
      K(a) && (r._data = d, delete r.data, Object.defineProperty(r, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(f) {
          this._data = f;
        }
      }));
      let _;
      switch (i.algorithm) {
        case "lttb":
          _ = N_(d, h, u, s, i);
          break;
        case "min-max":
          _ = B_(d, h, u, s);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`);
      }
      r._decimated = _;
    });
  },
  destroy(t) {
    go(t);
  }
};
function G_(t, e, i) {
  const s = t.segments, r = t.points, n = e.points, a = [];
  for (const o of s) {
    let { start: l, end: d } = o;
    d = gs(l, d, r);
    const c = _r(i, r[l], r[d], o.loop);
    if (!e.segments) {
      a.push({
        source: o,
        target: c,
        start: r[l],
        end: r[d]
      });
      continue;
    }
    const h = Ba(e, c);
    for (const u of h) {
      const g = _r(i, n[u.start], n[u.end], u.loop), _ = Na(o, r, g);
      for (const f of _)
        a.push({
          source: f,
          target: u,
          start: {
            [i]: _o(c, g, "start", Math.max)
          },
          end: {
            [i]: _o(c, g, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function _r(t, e, i, s) {
  if (s)
    return;
  let r = e[t], n = i[t];
  return t === "angle" && (r = ve(r), n = ve(n)), {
    property: t,
    start: r,
    end: n
  };
}
function j_(t, e) {
  const { x: i = null, y: s = null } = t || {}, r = e.points, n = [];
  return e.segments.forEach(({ start: a, end: o }) => {
    o = gs(a, o, r);
    const l = r[a], d = r[o];
    s !== null ? (n.push({
      x: l.x,
      y: s
    }), n.push({
      x: d.x,
      y: s
    })) : i !== null && (n.push({
      x: i,
      y: l.y
    }), n.push({
      x: i,
      y: d.y
    }));
  }), n;
}
function gs(t, e, i) {
  for (; e > t; e--) {
    const s = i[e];
    if (!isNaN(s.x) && !isNaN(s.y))
      break;
  }
  return e;
}
function _o(t, e, i, s) {
  return t && e ? s(t[i], e[i]) : t ? t[i] : e ? e[i] : 0;
}
function nl(t, e) {
  let i = [], s = !1;
  return oe(t) ? (s = !0, i = t) : i = j_(t, e), i.length ? new tt({
    points: i,
    options: {
      tension: 0
    },
    _loop: s,
    _fullLoop: s
  }) : null;
}
function fo(t) {
  return t && t.fill !== !1;
}
function U_(t, e, i) {
  let r = t[e].fill;
  const n = [
    e
  ];
  let a;
  if (!i)
    return r;
  for (; r !== !1 && n.indexOf(r) === -1; ) {
    if (!de(r))
      return r;
    if (a = t[r], !a)
      return !1;
    if (a.visible)
      return r;
    n.push(r), r = a.fill;
  }
  return !1;
}
function V_(t, e, i) {
  const s = X_(t);
  if (X(s))
    return isNaN(s.value) ? !1 : s;
  let r = parseFloat(s);
  return de(r) && Math.floor(r) === r ? W_(s[0], e, r, i) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(s) >= 0 && s;
}
function W_(t, e, i, s) {
  return (t === "-" || t === "+") && (i = e + i), i === e || i < 0 || i >= s ? !1 : i;
}
function K_(t, e) {
  let i = null;
  return t === "start" ? i = e.bottom : t === "end" ? i = e.top : X(t) ? i = e.getPixelForValue(t.value) : e.getBasePixel && (i = e.getBasePixel()), i;
}
function Y_(t, e, i) {
  let s;
  return t === "start" ? s = i : t === "end" ? s = e.options.reverse ? e.min : e.max : X(t) ? s = t.value : s = e.getBaseValue(), s;
}
function X_(t) {
  const e = t.options, i = e.fill;
  let s = W(i && i.target, i);
  return s === void 0 && (s = !!e.backgroundColor), s === !1 || s === null ? !1 : s === !0 ? "origin" : s;
}
function q_(t) {
  const { scale: e, index: i, line: s } = t, r = [], n = s.segments, a = s.points, o = Z_(e, i);
  o.push(nl({
    x: null,
    y: e.bottom
  }, s));
  for (let l = 0; l < n.length; l++) {
    const d = n[l];
    for (let c = d.start; c <= d.end; c++)
      J_(r, a[c], o);
  }
  return new tt({
    points: r,
    options: {}
  });
}
function Z_(t, e) {
  const i = [], s = t.getMatchingVisibleMetas("line");
  for (let r = 0; r < s.length; r++) {
    const n = s[r];
    if (n.index === e)
      break;
    n.hidden || i.unshift(n.dataset);
  }
  return i;
}
function J_(t, e, i) {
  const s = [];
  for (let r = 0; r < i.length; r++) {
    const n = i[r], { first: a, last: o, point: l } = Q_(n, e, "x");
    if (!(!l || a && o)) {
      if (a)
        s.unshift(l);
      else if (t.push(l), !o)
        break;
    }
  }
  t.push(...s);
}
function Q_(t, e, i) {
  const s = t.interpolate(e, i);
  if (!s)
    return {};
  const r = s[i], n = t.segments, a = t.points;
  let o = !1, l = !1;
  for (let d = 0; d < n.length; d++) {
    const c = n[d], h = a[c.start][i], u = a[c.end][i];
    if (Ye(r, h, u)) {
      o = r === h, l = r === u;
      break;
    }
  }
  return {
    first: o,
    last: l,
    point: s
  };
}
class ol {
  constructor(e) {
    this.x = e.x, this.y = e.y, this.radius = e.radius;
  }
  pathSegment(e, i, s) {
    const { x: r, y: n, radius: a } = this;
    return i = i || {
      start: 0,
      end: re
    }, e.arc(r, n, a, i.end, i.start, !0), !s.bounds;
  }
  interpolate(e) {
    const { x: i, y: s, radius: r } = this, n = e.angle;
    return {
      x: i + Math.cos(n) * r,
      y: s + Math.sin(n) * r,
      angle: n
    };
  }
}
function ef(t) {
  const { chart: e, fill: i, line: s } = t;
  if (de(i))
    return tf(e, i);
  if (i === "stack")
    return q_(t);
  if (i === "shape")
    return !0;
  const r = sf(t);
  return r instanceof ol ? r : nl(r, s);
}
function tf(t, e) {
  const i = t.getDatasetMeta(e);
  return i && t.isDatasetVisible(e) ? i.dataset : null;
}
function sf(t) {
  return (t.scale || {}).getPointPositionForValue ? nf(t) : rf(t);
}
function rf(t) {
  const { scale: e = {}, fill: i } = t, s = K_(i, e);
  if (de(s)) {
    const r = e.isHorizontal();
    return {
      x: r ? s : null,
      y: r ? null : s
    };
  }
  return null;
}
function nf(t) {
  const { scale: e, fill: i } = t, s = e.options, r = e.getLabels().length, n = s.reverse ? e.max : e.min, a = Y_(i, e, n), o = [];
  if (s.grid.circular) {
    const l = e.getPointPositionForValue(0, n);
    return new ol({
      x: l.x,
      y: l.y,
      radius: e.getDistanceFromCenterForValue(a)
    });
  }
  for (let l = 0; l < r; ++l)
    o.push(e.getPointPositionForValue(l, a));
  return o;
}
function Hs(t, e, i) {
  const s = ef(e), { chart: r, index: n, line: a, scale: o, axis: l } = e, d = a.options, c = d.fill, h = d.backgroundColor, { above: u = h, below: g = h } = c || {}, _ = r.getDatasetMeta(n), f = Ha(r, _);
  s && a.points.length && (ds(t, i), of(t, {
    line: a,
    target: s,
    above: u,
    below: g,
    area: i,
    scale: o,
    axis: l,
    clip: f
  }), cs(t));
}
function of(t, e) {
  const { line: i, target: s, above: r, below: n, area: a, scale: o, clip: l } = e, d = i._loop ? "angle" : e.axis;
  t.save();
  let c = n;
  n !== r && (d === "x" ? (po(t, s, a.top), Fs(t, {
    line: i,
    target: s,
    color: r,
    scale: o,
    property: d,
    clip: l
  }), t.restore(), t.save(), po(t, s, a.bottom)) : d === "y" && (mo(t, s, a.left), Fs(t, {
    line: i,
    target: s,
    color: n,
    scale: o,
    property: d,
    clip: l
  }), t.restore(), t.save(), mo(t, s, a.right), c = r)), Fs(t, {
    line: i,
    target: s,
    color: c,
    scale: o,
    property: d,
    clip: l
  }), t.restore();
}
function po(t, e, i) {
  const { segments: s, points: r } = e;
  let n = !0, a = !1;
  t.beginPath();
  for (const o of s) {
    const { start: l, end: d } = o, c = r[l], h = r[gs(l, d, r)];
    n ? (t.moveTo(c.x, c.y), n = !1) : (t.lineTo(c.x, i), t.lineTo(c.x, c.y)), a = !!e.pathSegment(t, o, {
      move: a
    }), a ? t.closePath() : t.lineTo(h.x, i);
  }
  t.lineTo(e.first().x, i), t.closePath(), t.clip();
}
function mo(t, e, i) {
  const { segments: s, points: r } = e;
  let n = !0, a = !1;
  t.beginPath();
  for (const o of s) {
    const { start: l, end: d } = o, c = r[l], h = r[gs(l, d, r)];
    n ? (t.moveTo(c.x, c.y), n = !1) : (t.lineTo(i, c.y), t.lineTo(c.x, c.y)), a = !!e.pathSegment(t, o, {
      move: a
    }), a ? t.closePath() : t.lineTo(i, h.y);
  }
  t.lineTo(i, e.first().y), t.closePath(), t.clip();
}
function Fs(t, e) {
  const { line: i, target: s, property: r, color: n, scale: a, clip: o } = e, l = G_(i, s, r);
  for (const { source: d, target: c, start: h, end: u } of l) {
    const { style: { backgroundColor: g = n } = {} } = d, _ = s !== !0;
    t.save(), t.fillStyle = g, af(t, a, o, _ && _r(r, h, u)), t.beginPath();
    const f = !!i.pathSegment(t, d);
    let p;
    if (_) {
      f ? t.closePath() : vo(t, s, u, r);
      const m = !!s.pathSegment(t, c, {
        move: f,
        reverse: !0
      });
      p = f && m, p || vo(t, s, h, r);
    }
    t.closePath(), t.fill(p ? "evenodd" : "nonzero"), t.restore();
  }
}
function af(t, e, i, s) {
  const r = e.chart.chartArea, { property: n, start: a, end: o } = s || {};
  if (n === "x" || n === "y") {
    let l, d, c, h;
    n === "x" ? (l = a, d = r.top, c = o, h = r.bottom) : (l = r.left, d = a, c = r.right, h = o), t.beginPath(), i && (l = Math.max(l, i.left), c = Math.min(c, i.right), d = Math.max(d, i.top), h = Math.min(h, i.bottom)), t.rect(l, d, c - l, h - d), t.clip();
  }
}
function vo(t, e, i, s) {
  const r = e.interpolate(i, s);
  r && t.lineTo(r.x, r.y);
}
var lf = {
  id: "filler",
  afterDatasetsUpdate(t, e, i) {
    const s = (t.data.datasets || []).length, r = [];
    let n, a, o, l;
    for (a = 0; a < s; ++a)
      n = t.getDatasetMeta(a), o = n.dataset, l = null, o && o.options && o instanceof tt && (l = {
        visible: t.isDatasetVisible(a),
        index: a,
        fill: V_(o, a, s),
        chart: t,
        axis: n.controller.options.indexAxis,
        scale: n.vScale,
        line: o
      }), n.$filler = l, r.push(l);
    for (a = 0; a < s; ++a)
      l = r[a], !(!l || l.fill === !1) && (l.fill = U_(r, a, i.propagate));
  },
  beforeDraw(t, e, i) {
    const s = i.drawTime === "beforeDraw", r = t.getSortedVisibleDatasetMetas(), n = t.chartArea;
    for (let a = r.length - 1; a >= 0; --a) {
      const o = r[a].$filler;
      o && (o.line.updateControlPoints(n, o.axis), s && o.fill && Hs(t.ctx, o, n));
    }
  },
  beforeDatasetsDraw(t, e, i) {
    if (i.drawTime !== "beforeDatasetsDraw")
      return;
    const s = t.getSortedVisibleDatasetMetas();
    for (let r = s.length - 1; r >= 0; --r) {
      const n = s[r].$filler;
      fo(n) && Hs(t.ctx, n, t.chartArea);
    }
  },
  beforeDatasetDraw(t, e, i) {
    const s = e.meta.$filler;
    !fo(s) || i.drawTime !== "beforeDatasetDraw" || Hs(t.ctx, s, t.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const yo = (t, e) => {
  let { boxHeight: i = e, boxWidth: s = e } = t;
  return t.usePointStyle && (i = Math.min(i, e), s = t.pointStyleWidth || Math.min(s, e)), {
    boxWidth: s,
    boxHeight: i,
    itemHeight: Math.max(e, i)
  };
}, df = (t, e) => t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
class bo extends Be {
  constructor(e) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, i, s) {
    this.maxWidth = e, this.maxHeight = i, this._margins = s, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const e = this.options.labels || {};
    let i = se(e.generateLabels, [
      this.chart
    ], this) || [];
    e.filter && (i = i.filter((s) => e.filter(s, this.chart.data))), e.sort && (i = i.sort((s, r) => e.sort(s, r, this.chart.data))), this.options.reverse && i.reverse(), this.legendItems = i;
  }
  fit() {
    const { options: e, ctx: i } = this;
    if (!e.display) {
      this.width = this.height = 0;
      return;
    }
    const s = e.labels, r = ge(s.font), n = r.size, a = this._computeTitleHeight(), { boxWidth: o, itemHeight: l } = yo(s, n);
    let d, c;
    i.font = r.string, this.isHorizontal() ? (d = this.maxWidth, c = this._fitRows(a, n, o, l) + 10) : (c = this.maxHeight, d = this._fitCols(a, r, o, l) + 10), this.width = Math.min(d, e.maxWidth || this.maxWidth), this.height = Math.min(c, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, i, s, r) {
    const { ctx: n, maxWidth: a, options: { labels: { padding: o } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], c = r + o;
    let h = e;
    n.textAlign = "left", n.textBaseline = "middle";
    let u = -1, g = -c;
    return this.legendItems.forEach((_, f) => {
      const p = s + i / 2 + n.measureText(_.text).width;
      (f === 0 || d[d.length - 1] + p + 2 * o > a) && (h += c, d[d.length - (f > 0 ? 0 : 1)] = 0, g += c, u++), l[f] = {
        left: 0,
        top: g,
        row: u,
        width: p,
        height: r
      }, d[d.length - 1] += p + o;
    }), h;
  }
  _fitCols(e, i, s, r) {
    const { ctx: n, maxHeight: a, options: { labels: { padding: o } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], c = a - e;
    let h = o, u = 0, g = 0, _ = 0, f = 0;
    return this.legendItems.forEach((p, m) => {
      const { itemWidth: v, itemHeight: E } = cf(s, i, n, p, r);
      m > 0 && g + E + 2 * o > c && (h += u + o, d.push({
        width: u,
        height: g
      }), _ += u + o, f++, u = g = 0), l[m] = {
        left: _,
        top: g,
        col: f,
        width: v,
        height: E
      }, u = Math.max(u, v), g += E + o;
    }), h += u, d.push({
      width: u,
      height: g
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: i, options: { align: s, labels: { padding: r }, rtl: n } } = this, a = Pt(n, this.left, this.width);
    if (this.isHorizontal()) {
      let o = 0, l = me(s, this.left + r, this.right - this.lineWidths[o]);
      for (const d of i)
        o !== d.row && (o = d.row, l = me(s, this.left + r, this.right - this.lineWidths[o])), d.top += this.top + e + r, d.left = a.leftForLtr(a.x(l), d.width), l += d.width + r;
    } else {
      let o = 0, l = me(s, this.top + e + r, this.bottom - this.columnSizes[o].height);
      for (const d of i)
        d.col !== o && (o = d.col, l = me(s, this.top + e + r, this.bottom - this.columnSizes[o].height)), d.top = l, d.left += this.left + r, d.left = a.leftForLtr(a.x(d.left), d.width), l += d.height + r;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const e = this.ctx;
      ds(e, this), this._draw(), cs(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: i, lineWidths: s, ctx: r } = this, { align: n, labels: a } = e, o = ae.color, l = Pt(e.rtl, this.left, this.width), d = ge(a.font), { padding: c } = a, h = d.size, u = h / 2;
    let g;
    this.drawTitle(), r.textAlign = l.textAlign("left"), r.textBaseline = "middle", r.lineWidth = 0.5, r.font = d.string;
    const { boxWidth: _, boxHeight: f, itemHeight: p } = yo(a, h), m = function(k, w, b) {
      if (isNaN(_) || _ <= 0 || isNaN(f) || f < 0)
        return;
      r.save();
      const A = W(b.lineWidth, 1);
      if (r.fillStyle = W(b.fillStyle, o), r.lineCap = W(b.lineCap, "butt"), r.lineDashOffset = W(b.lineDashOffset, 0), r.lineJoin = W(b.lineJoin, "miter"), r.lineWidth = A, r.strokeStyle = W(b.strokeStyle, o), r.setLineDash(W(b.lineDash, [])), a.usePointStyle) {
        const M = {
          radius: f * Math.SQRT2 / 2,
          pointStyle: b.pointStyle,
          rotation: b.rotation,
          borderWidth: A
        }, P = l.xPlus(k, _ / 2), y = w + u;
        Ca(r, M, P, y, a.pointStyleWidth && _);
      } else {
        const M = w + Math.max((h - f) / 2, 0), P = l.leftForLtr(k, _), y = pt(b.borderRadius);
        r.beginPath(), Object.values(y).some((L) => L !== 0) ? hi(r, {
          x: P,
          y: M,
          w: _,
          h: f,
          radius: y
        }) : r.rect(P, M, _, f), r.fill(), A !== 0 && r.stroke();
      }
      r.restore();
    }, v = function(k, w, b) {
      xt(r, b.text, k, w + p / 2, d, {
        strikethrough: b.hidden,
        textAlign: l.textAlign(b.textAlign)
      });
    }, E = this.isHorizontal(), C = this._computeTitleHeight();
    E ? g = {
      x: me(n, this.left + c, this.right - s[0]),
      y: this.top + c + C,
      line: 0
    } : g = {
      x: this.left + c,
      y: me(n, this.top + C + c, this.bottom - i[0].height),
      line: 0
    }, Oa(this.ctx, e.textDirection);
    const x = p + c;
    this.legendItems.forEach((k, w) => {
      r.strokeStyle = k.fontColor, r.fillStyle = k.fontColor;
      const b = r.measureText(k.text).width, A = l.textAlign(k.textAlign || (k.textAlign = a.textAlign)), M = _ + u + b;
      let P = g.x, y = g.y;
      l.setWidth(this.width), E ? w > 0 && P + M + c > this.right && (y = g.y += x, g.line++, P = g.x = me(n, this.left + c, this.right - s[g.line])) : w > 0 && y + x > this.bottom && (P = g.x = P + i[g.line].width + c, g.line++, y = g.y = me(n, this.top + C + c, this.bottom - i[g.line].height));
      const L = l.x(P);
      if (m(L, y, k), P = Ph(A, P + _ + u, E ? P + M : this.right, e.rtl), v(l.x(P), y, k), E)
        g.x += M + c;
      else if (typeof k.text != "string") {
        const S = d.lineHeight;
        g.y += al(k, S) + c;
      } else
        g.y += x;
    }), Ra(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, i = e.title, s = ge(i.font), r = be(i.padding);
    if (!i.display)
      return;
    const n = Pt(e.rtl, this.left, this.width), a = this.ctx, o = i.position, l = s.size / 2, d = r.top + l;
    let c, h = this.left, u = this.width;
    if (this.isHorizontal())
      u = Math.max(...this.lineWidths), c = this.top + d, h = me(e.align, h, this.right - u);
    else {
      const _ = this.columnSizes.reduce((f, p) => Math.max(f, p.height), 0);
      c = d + me(e.align, this.top, this.bottom - _ - e.labels.padding - this._computeTitleHeight());
    }
    const g = me(o, h, h + u);
    a.textAlign = n.textAlign(Mr(o)), a.textBaseline = "middle", a.strokeStyle = i.color, a.fillStyle = i.color, a.font = s.string, xt(a, i.text, g, c, s);
  }
  _computeTitleHeight() {
    const e = this.options.title, i = ge(e.font), s = be(e.padding);
    return e.display ? i.lineHeight + s.height : 0;
  }
  _getLegendItemAt(e, i) {
    let s, r, n;
    if (Ye(e, this.left, this.right) && Ye(i, this.top, this.bottom)) {
      for (n = this.legendHitBoxes, s = 0; s < n.length; ++s)
        if (r = n[s], Ye(e, r.left, r.left + r.width) && Ye(i, r.top, r.top + r.height))
          return this.legendItems[s];
    }
    return null;
  }
  handleEvent(e) {
    const i = this.options;
    if (!gf(e.type, i))
      return;
    const s = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const r = this._hoveredItem, n = df(r, s);
      r && !n && se(i.onLeave, [
        e,
        r,
        this
      ], this), this._hoveredItem = s, s && !n && se(i.onHover, [
        e,
        s,
        this
      ], this);
    } else s && se(i.onClick, [
      e,
      s,
      this
    ], this);
  }
}
function cf(t, e, i, s, r) {
  const n = hf(s, t, e, i), a = uf(r, s, e.lineHeight);
  return {
    itemWidth: n,
    itemHeight: a
  };
}
function hf(t, e, i, s) {
  let r = t.text;
  return r && typeof r != "string" && (r = r.reduce((n, a) => n.length > a.length ? n : a)), e + i.size / 2 + s.measureText(r).width;
}
function uf(t, e, i) {
  let s = t;
  return typeof e.text != "string" && (s = al(e, i)), s;
}
function al(t, e) {
  const i = t.text ? t.text.length : 0;
  return e * i;
}
function gf(t, e) {
  return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
}
var ll = {
  id: "legend",
  _element: bo,
  start(t, e, i) {
    const s = t.legend = new bo({
      ctx: t.ctx,
      options: i,
      chart: t
    });
    ye.configure(t, s, i), ye.addBox(t, s);
  },
  stop(t) {
    ye.removeBox(t, t.legend), delete t.legend;
  },
  beforeUpdate(t, e, i) {
    const s = t.legend;
    ye.configure(t, s, i), s.options = i;
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
    onClick(t, e, i) {
      const s = e.datasetIndex, r = i.chart;
      r.isDatasetVisible(s) ? (r.hide(s), e.hidden = !0) : (r.show(s), e.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (t) => t.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(t) {
        const e = t.data.datasets, { labels: { usePointStyle: i, pointStyle: s, textAlign: r, color: n, useBorderRadius: a, borderRadius: o } } = t.legend.options;
        return t._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(i ? 0 : void 0), c = be(d.borderWidth);
          return {
            text: e[l.index].label,
            fillStyle: d.backgroundColor,
            fontColor: n,
            hidden: !l.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (c.width + c.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: s || d.pointStyle,
            rotation: d.rotation,
            textAlign: r || d.textAlign,
            borderRadius: a && (o || d.borderRadius),
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
class Nr extends Be {
  constructor(e) {
    super(), this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, i) {
    const s = this.options;
    if (this.left = 0, this.top = 0, !s.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = e, this.height = this.bottom = i;
    const r = oe(s.text) ? s.text.length : 1;
    this._padding = be(s.padding);
    const n = r * ge(s.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = n : this.width = n;
  }
  isHorizontal() {
    const e = this.options.position;
    return e === "top" || e === "bottom";
  }
  _drawArgs(e) {
    const { top: i, left: s, bottom: r, right: n, options: a } = this, o = a.align;
    let l = 0, d, c, h;
    return this.isHorizontal() ? (c = me(o, s, n), h = i + e, d = n - s) : (a.position === "left" ? (c = s + e, h = me(o, r, i), l = ee * -0.5) : (c = n - e, h = me(o, i, r), l = ee * 0.5), d = r - i), {
      titleX: c,
      titleY: h,
      maxWidth: d,
      rotation: l
    };
  }
  draw() {
    const e = this.ctx, i = this.options;
    if (!i.display)
      return;
    const s = ge(i.font), n = s.lineHeight / 2 + this._padding.top, { titleX: a, titleY: o, maxWidth: l, rotation: d } = this._drawArgs(n);
    xt(e, i.text, 0, 0, s, {
      color: i.color,
      maxWidth: l,
      rotation: d,
      textAlign: Mr(i.align),
      textBaseline: "middle",
      translation: [
        a,
        o
      ]
    });
  }
}
function _f(t, e) {
  const i = new Nr({
    ctx: t.ctx,
    options: e,
    chart: t
  });
  ye.configure(t, i, e), ye.addBox(t, i), t.titleBlock = i;
}
var ff = {
  id: "title",
  _element: Nr,
  start(t, e, i) {
    _f(t, i);
  },
  stop(t) {
    const e = t.titleBlock;
    ye.removeBox(t, e), delete t.titleBlock;
  },
  beforeUpdate(t, e, i) {
    const s = t.titleBlock;
    ye.configure(t, s, i), s.options = i;
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
const Di = /* @__PURE__ */ new WeakMap();
var pf = {
  id: "subtitle",
  start(t, e, i) {
    const s = new Nr({
      ctx: t.ctx,
      options: i,
      chart: t
    });
    ye.configure(t, s, i), ye.addBox(t, s), Di.set(t, s);
  },
  stop(t) {
    ye.removeBox(t, Di.get(t)), Di.delete(t);
  },
  beforeUpdate(t, e, i) {
    const s = Di.get(t);
    ye.configure(t, s, i), s.options = i;
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
const Yt = {
  average(t) {
    if (!t.length)
      return !1;
    let e, i, s = /* @__PURE__ */ new Set(), r = 0, n = 0;
    for (e = 0, i = t.length; e < i; ++e) {
      const o = t[e].element;
      if (o && o.hasValue()) {
        const l = o.tooltipPosition();
        s.add(l.x), r += l.y, ++n;
      }
    }
    return n === 0 || s.size === 0 ? !1 : {
      x: [
        ...s
      ].reduce((o, l) => o + l) / s.size,
      y: r / n
    };
  },
  nearest(t, e) {
    if (!t.length)
      return !1;
    let i = e.x, s = e.y, r = Number.POSITIVE_INFINITY, n, a, o;
    for (n = 0, a = t.length; n < a; ++n) {
      const l = t[n].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), c = or(e, d);
        c < r && (r = c, o = l);
      }
    }
    if (o) {
      const l = o.tooltipPosition();
      i = l.x, s = l.y;
    }
    return {
      x: i,
      y: s
    };
  }
};
function He(t, e) {
  return e && (oe(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
}
function We(t) {
  return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
}
function mf(t, e) {
  const { element: i, datasetIndex: s, index: r } = e, n = t.getDatasetMeta(s).controller, { label: a, value: o } = n.getLabelAndValue(r);
  return {
    chart: t,
    label: a,
    parsed: n.getParsed(r),
    raw: t.data.datasets[s].data[r],
    formattedValue: o,
    dataset: n.getDataset(),
    dataIndex: r,
    datasetIndex: s,
    element: i
  };
}
function xo(t, e) {
  const i = t.chart.ctx, { body: s, footer: r, title: n } = t, { boxWidth: a, boxHeight: o } = e, l = ge(e.bodyFont), d = ge(e.titleFont), c = ge(e.footerFont), h = n.length, u = r.length, g = s.length, _ = be(e.padding);
  let f = _.height, p = 0, m = s.reduce((C, x) => C + x.before.length + x.lines.length + x.after.length, 0);
  if (m += t.beforeBody.length + t.afterBody.length, h && (f += h * d.lineHeight + (h - 1) * e.titleSpacing + e.titleMarginBottom), m) {
    const C = e.displayColors ? Math.max(o, l.lineHeight) : l.lineHeight;
    f += g * C + (m - g) * l.lineHeight + (m - 1) * e.bodySpacing;
  }
  u && (f += e.footerMarginTop + u * c.lineHeight + (u - 1) * e.footerSpacing);
  let v = 0;
  const E = function(C) {
    p = Math.max(p, i.measureText(C).width + v);
  };
  return i.save(), i.font = d.string, te(t.title, E), i.font = l.string, te(t.beforeBody.concat(t.afterBody), E), v = e.displayColors ? a + 2 + e.boxPadding : 0, te(s, (C) => {
    te(C.before, E), te(C.lines, E), te(C.after, E);
  }), v = 0, i.font = c.string, te(t.footer, E), i.restore(), p += _.width, {
    width: p,
    height: f
  };
}
function vf(t, e) {
  const { y: i, height: s } = e;
  return i < s / 2 ? "top" : i > t.height - s / 2 ? "bottom" : "center";
}
function yf(t, e, i, s) {
  const { x: r, width: n } = s, a = i.caretSize + i.caretPadding;
  if (t === "left" && r + n + a > e.width || t === "right" && r - n - a < 0)
    return !0;
}
function bf(t, e, i, s) {
  const { x: r, width: n } = i, { width: a, chartArea: { left: o, right: l } } = t;
  let d = "center";
  return s === "center" ? d = r <= (o + l) / 2 ? "left" : "right" : r <= n / 2 ? d = "left" : r >= a - n / 2 && (d = "right"), yf(d, t, e, i) && (d = "center"), d;
}
function wo(t, e, i) {
  const s = i.yAlign || e.yAlign || vf(t, i);
  return {
    xAlign: i.xAlign || e.xAlign || bf(t, e, i, s),
    yAlign: s
  };
}
function xf(t, e) {
  let { x: i, width: s } = t;
  return e === "right" ? i -= s : e === "center" && (i -= s / 2), i;
}
function wf(t, e, i) {
  let { y: s, height: r } = t;
  return e === "top" ? s += i : e === "bottom" ? s -= r + i : s -= r / 2, s;
}
function ko(t, e, i, s) {
  const { caretSize: r, caretPadding: n, cornerRadius: a } = t, { xAlign: o, yAlign: l } = i, d = r + n, { topLeft: c, topRight: h, bottomLeft: u, bottomRight: g } = pt(a);
  let _ = xf(e, o);
  const f = wf(e, l, d);
  return l === "center" ? o === "left" ? _ += d : o === "right" && (_ -= d) : o === "left" ? _ -= Math.max(c, u) + r : o === "right" && (_ += Math.max(h, g) + r), {
    x: _e(_, 0, s.width - e.width),
    y: _e(f, 0, s.height - e.height)
  };
}
function zi(t, e, i) {
  const s = be(i.padding);
  return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - s.right : t.x + s.left;
}
function So(t) {
  return He([], We(t));
}
function kf(t, e, i) {
  return ot(t, {
    tooltip: e,
    tooltipItems: i,
    type: "tooltip"
  });
}
function Ao(t, e) {
  const i = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return i ? t.override(i) : t;
}
const dl = {
  beforeTitle: Ue,
  title(t) {
    if (t.length > 0) {
      const e = t[0], i = e.chart.data.labels, s = i ? i.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return e.dataset.label || "";
      if (e.label)
        return e.label;
      if (s > 0 && e.dataIndex < s)
        return i[e.dataIndex];
    }
    return "";
  },
  afterTitle: Ue,
  beforeBody: Ue,
  beforeLabel: Ue,
  label(t) {
    if (this && this.options && this.options.mode === "dataset")
      return t.label + ": " + t.formattedValue || t.formattedValue;
    let e = t.dataset.label || "";
    e && (e += ": ");
    const i = t.formattedValue;
    return K(i) || (e += i), e;
  },
  labelColor(t) {
    const i = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
    return {
      borderColor: i.borderColor,
      backgroundColor: i.backgroundColor,
      borderWidth: i.borderWidth,
      borderDash: i.borderDash,
      borderDashOffset: i.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(t) {
    const i = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);
    return {
      pointStyle: i.pointStyle,
      rotation: i.rotation
    };
  },
  afterLabel: Ue,
  afterBody: Ue,
  beforeFooter: Ue,
  footer: Ue,
  afterFooter: Ue
};
function Se(t, e, i, s) {
  const r = t[e].call(i, s);
  return typeof r > "u" ? dl[e].call(i, s) : r;
}
class fr extends Be {
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
    const i = this.chart, s = this.options.setContext(this.getContext()), r = s.enabled && i.options.animation && s.animations, n = new Fa(this.chart, r);
    return r._cacheable && (this._cachedAnimations = Object.freeze(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = kf(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, i) {
    const { callbacks: s } = i, r = Se(s, "beforeTitle", this, e), n = Se(s, "title", this, e), a = Se(s, "afterTitle", this, e);
    let o = [];
    return o = He(o, We(r)), o = He(o, We(n)), o = He(o, We(a)), o;
  }
  getBeforeBody(e, i) {
    return So(Se(i.callbacks, "beforeBody", this, e));
  }
  getBody(e, i) {
    const { callbacks: s } = i, r = [];
    return te(e, (n) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, o = Ao(s, n);
      He(a.before, We(Se(o, "beforeLabel", this, n))), He(a.lines, Se(o, "label", this, n)), He(a.after, We(Se(o, "afterLabel", this, n))), r.push(a);
    }), r;
  }
  getAfterBody(e, i) {
    return So(Se(i.callbacks, "afterBody", this, e));
  }
  getFooter(e, i) {
    const { callbacks: s } = i, r = Se(s, "beforeFooter", this, e), n = Se(s, "footer", this, e), a = Se(s, "afterFooter", this, e);
    let o = [];
    return o = He(o, We(r)), o = He(o, We(n)), o = He(o, We(a)), o;
  }
  _createItems(e) {
    const i = this._active, s = this.chart.data, r = [], n = [], a = [];
    let o = [], l, d;
    for (l = 0, d = i.length; l < d; ++l)
      o.push(mf(this.chart, i[l]));
    return e.filter && (o = o.filter((c, h, u) => e.filter(c, h, u, s))), e.itemSort && (o = o.sort((c, h) => e.itemSort(c, h, s))), te(o, (c) => {
      const h = Ao(e.callbacks, c);
      r.push(Se(h, "labelColor", this, c)), n.push(Se(h, "labelPointStyle", this, c)), a.push(Se(h, "labelTextColor", this, c));
    }), this.labelColors = r, this.labelPointStyles = n, this.labelTextColors = a, this.dataPoints = o, o;
  }
  update(e, i) {
    const s = this.options.setContext(this.getContext()), r = this._active;
    let n, a = [];
    if (!r.length)
      this.opacity !== 0 && (n = {
        opacity: 0
      });
    else {
      const o = Yt[s.position].call(this, r, this._eventPosition);
      a = this._createItems(s), this.title = this.getTitle(a, s), this.beforeBody = this.getBeforeBody(a, s), this.body = this.getBody(a, s), this.afterBody = this.getAfterBody(a, s), this.footer = this.getFooter(a, s);
      const l = this._size = xo(this, s), d = Object.assign({}, o, l), c = wo(this.chart, s, d), h = ko(s, d, c, this.chart);
      this.xAlign = c.xAlign, this.yAlign = c.yAlign, n = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: l.width,
        height: l.height,
        caretX: o.x,
        caretY: o.y
      };
    }
    this._tooltipItems = a, this.$context = void 0, n && this._resolveAnimations().update(this, n), e && s.external && s.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: i
    });
  }
  drawCaret(e, i, s, r) {
    const n = this.getCaretPosition(e, s, r);
    i.lineTo(n.x1, n.y1), i.lineTo(n.x2, n.y2), i.lineTo(n.x3, n.y3);
  }
  getCaretPosition(e, i, s) {
    const { xAlign: r, yAlign: n } = this, { caretSize: a, cornerRadius: o } = s, { topLeft: l, topRight: d, bottomLeft: c, bottomRight: h } = pt(o), { x: u, y: g } = e, { width: _, height: f } = i;
    let p, m, v, E, C, x;
    return n === "center" ? (C = g + f / 2, r === "left" ? (p = u, m = p - a, E = C + a, x = C - a) : (p = u + _, m = p + a, E = C - a, x = C + a), v = p) : (r === "left" ? m = u + Math.max(l, c) + a : r === "right" ? m = u + _ - Math.max(d, h) - a : m = this.caretX, n === "top" ? (E = g, C = E - a, p = m - a, v = m + a) : (E = g + f, C = E + a, p = m + a, v = m - a), x = E), {
      x1: p,
      x2: m,
      x3: v,
      y1: E,
      y2: C,
      y3: x
    };
  }
  drawTitle(e, i, s) {
    const r = this.title, n = r.length;
    let a, o, l;
    if (n) {
      const d = Pt(s.rtl, this.x, this.width);
      for (e.x = zi(this, s.titleAlign, s), i.textAlign = d.textAlign(s.titleAlign), i.textBaseline = "middle", a = ge(s.titleFont), o = s.titleSpacing, i.fillStyle = s.titleColor, i.font = a.string, l = 0; l < n; ++l)
        i.fillText(r[l], d.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + o, l + 1 === n && (e.y += s.titleMarginBottom - o);
    }
  }
  _drawColorBox(e, i, s, r, n) {
    const a = this.labelColors[s], o = this.labelPointStyles[s], { boxHeight: l, boxWidth: d } = n, c = ge(n.bodyFont), h = zi(this, "left", n), u = r.x(h), g = l < c.lineHeight ? (c.lineHeight - l) / 2 : 0, _ = i.y + g;
    if (n.usePointStyle) {
      const f = {
        radius: Math.min(d, l) / 2,
        pointStyle: o.pointStyle,
        rotation: o.rotation,
        borderWidth: 1
      }, p = r.leftForLtr(u, d) + d / 2, m = _ + l / 2;
      e.strokeStyle = n.multiKeyBackground, e.fillStyle = n.multiKeyBackground, lr(e, f, p, m), e.strokeStyle = a.borderColor, e.fillStyle = a.backgroundColor, lr(e, f, p, m);
    } else {
      e.lineWidth = X(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, e.strokeStyle = a.borderColor, e.setLineDash(a.borderDash || []), e.lineDashOffset = a.borderDashOffset || 0;
      const f = r.leftForLtr(u, d), p = r.leftForLtr(r.xPlus(u, 1), d - 2), m = pt(a.borderRadius);
      Object.values(m).some((v) => v !== 0) ? (e.beginPath(), e.fillStyle = n.multiKeyBackground, hi(e, {
        x: f,
        y: _,
        w: d,
        h: l,
        radius: m
      }), e.fill(), e.stroke(), e.fillStyle = a.backgroundColor, e.beginPath(), hi(e, {
        x: p,
        y: _ + 1,
        w: d - 2,
        h: l - 2,
        radius: m
      }), e.fill()) : (e.fillStyle = n.multiKeyBackground, e.fillRect(f, _, d, l), e.strokeRect(f, _, d, l), e.fillStyle = a.backgroundColor, e.fillRect(p, _ + 1, d - 2, l - 2));
    }
    e.fillStyle = this.labelTextColors[s];
  }
  drawBody(e, i, s) {
    const { body: r } = this, { bodySpacing: n, bodyAlign: a, displayColors: o, boxHeight: l, boxWidth: d, boxPadding: c } = s, h = ge(s.bodyFont);
    let u = h.lineHeight, g = 0;
    const _ = Pt(s.rtl, this.x, this.width), f = function(b) {
      i.fillText(b, _.x(e.x + g), e.y + u / 2), e.y += u + n;
    }, p = _.textAlign(a);
    let m, v, E, C, x, k, w;
    for (i.textAlign = a, i.textBaseline = "middle", i.font = h.string, e.x = zi(this, p, s), i.fillStyle = s.bodyColor, te(this.beforeBody, f), g = o && p !== "right" ? a === "center" ? d / 2 + c : d + 2 + c : 0, C = 0, k = r.length; C < k; ++C) {
      for (m = r[C], v = this.labelTextColors[C], i.fillStyle = v, te(m.before, f), E = m.lines, o && E.length && (this._drawColorBox(i, e, C, _, s), u = Math.max(h.lineHeight, l)), x = 0, w = E.length; x < w; ++x)
        f(E[x]), u = h.lineHeight;
      te(m.after, f);
    }
    g = 0, u = h.lineHeight, te(this.afterBody, f), e.y -= n;
  }
  drawFooter(e, i, s) {
    const r = this.footer, n = r.length;
    let a, o;
    if (n) {
      const l = Pt(s.rtl, this.x, this.width);
      for (e.x = zi(this, s.footerAlign, s), e.y += s.footerMarginTop, i.textAlign = l.textAlign(s.footerAlign), i.textBaseline = "middle", a = ge(s.footerFont), i.fillStyle = s.footerColor, i.font = a.string, o = 0; o < n; ++o)
        i.fillText(r[o], l.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + s.footerSpacing;
    }
  }
  drawBackground(e, i, s, r) {
    const { xAlign: n, yAlign: a } = this, { x: o, y: l } = e, { width: d, height: c } = s, { topLeft: h, topRight: u, bottomLeft: g, bottomRight: _ } = pt(r.cornerRadius);
    i.fillStyle = r.backgroundColor, i.strokeStyle = r.borderColor, i.lineWidth = r.borderWidth, i.beginPath(), i.moveTo(o + h, l), a === "top" && this.drawCaret(e, i, s, r), i.lineTo(o + d - u, l), i.quadraticCurveTo(o + d, l, o + d, l + u), a === "center" && n === "right" && this.drawCaret(e, i, s, r), i.lineTo(o + d, l + c - _), i.quadraticCurveTo(o + d, l + c, o + d - _, l + c), a === "bottom" && this.drawCaret(e, i, s, r), i.lineTo(o + g, l + c), i.quadraticCurveTo(o, l + c, o, l + c - g), a === "center" && n === "left" && this.drawCaret(e, i, s, r), i.lineTo(o, l + h), i.quadraticCurveTo(o, l, o + h, l), i.closePath(), i.fill(), r.borderWidth > 0 && i.stroke();
  }
  _updateAnimationTarget(e) {
    const i = this.chart, s = this.$animations, r = s && s.x, n = s && s.y;
    if (r || n) {
      const a = Yt[e.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const o = this._size = xo(this, e), l = Object.assign({}, a, this._size), d = wo(i, e, l), c = ko(e, l, d, i);
      (r._to !== c.x || n._to !== c.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = o.width, this.height = o.height, this.caretX = a.x, this.caretY = a.y, this._resolveAnimations().update(this, c));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(e) {
    const i = this.options.setContext(this.getContext());
    let s = this.opacity;
    if (!s)
      return;
    this._updateAnimationTarget(i);
    const r = {
      width: this.width,
      height: this.height
    }, n = {
      x: this.x,
      y: this.y
    };
    s = Math.abs(s) < 1e-3 ? 0 : s;
    const a = be(i.padding), o = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    i.enabled && o && (e.save(), e.globalAlpha = s, this.drawBackground(n, e, r, i), Oa(e, i.textDirection), n.y += a.top, this.drawTitle(n, e, i), this.drawBody(n, e, i), this.drawFooter(n, e, i), Ra(e, i.textDirection), e.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e, i) {
    const s = this._active, r = e.map(({ datasetIndex: o, index: l }) => {
      const d = this.chart.getDatasetMeta(o);
      if (!d)
        throw new Error("Cannot find a dataset at index " + o);
      return {
        datasetIndex: o,
        element: d.data[l],
        index: l
      };
    }), n = !Zi(s, r), a = this._positionChanged(r, i);
    (n || a) && (this._active = r, this._eventPosition = i, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, i, s = !0) {
    if (i && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const r = this.options, n = this._active || [], a = this._getActiveElements(e, n, i, s), o = this._positionChanged(a, e), l = i || !Zi(a, n) || o;
    return l && (this._active = a, (r.enabled || r.external) && (this._eventPosition = {
      x: e.x,
      y: e.y
    }, this.update(!0, i))), l;
  }
  _getActiveElements(e, i, s, r) {
    const n = this.options;
    if (e.type === "mouseout")
      return [];
    if (!r)
      return i.filter((o) => this.chart.data.datasets[o.datasetIndex] && this.chart.getDatasetMeta(o.datasetIndex).controller.getParsed(o.index) !== void 0);
    const a = this.chart.getElementsAtEventForMode(e, n.mode, n, s);
    return n.reverse && a.reverse(), a;
  }
  _positionChanged(e, i) {
    const { caretX: s, caretY: r, options: n } = this, a = Yt[n.position].call(this, e, i);
    return a !== !1 && (s !== a.x || r !== a.y);
  }
}
I(fr, "positioners", Yt);
var cl = {
  id: "tooltip",
  _element: fr,
  positioners: Yt,
  afterInit(t, e, i) {
    i && (t.tooltip = new fr({
      chart: t,
      options: i
    }));
  },
  beforeUpdate(t, e, i) {
    t.tooltip && t.tooltip.initialize(i);
  },
  reset(t, e, i) {
    t.tooltip && t.tooltip.initialize(i);
  },
  afterDraw(t) {
    const e = t.tooltip;
    if (e && e._willRender()) {
      const i = {
        tooltip: e
      };
      if (t.notifyPlugins("beforeTooltipDraw", {
        ...i,
        cancelable: !0
      }) === !1)
        return;
      e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", i);
    }
  },
  afterEvent(t, e) {
    if (t.tooltip) {
      const i = e.replay;
      t.tooltip.handleEvent(e.event, i, e.inChartArea) && (e.changed = !0);
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
    callbacks: dl
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
}, Sf = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: I_,
  Decimation: F_,
  Filler: lf,
  Legend: ll,
  SubTitle: pf,
  Title: ff,
  Tooltip: cl
});
const Af = (t, e, i, s) => (typeof e == "string" ? (i = t.push(e) - 1, s.unshift({
  index: i,
  label: e
})) : isNaN(e) && (i = null), i);
function Ef(t, e, i, s) {
  const r = t.indexOf(e);
  if (r === -1)
    return Af(t, e, i, s);
  const n = t.lastIndexOf(e);
  return r !== n ? i : r;
}
const Cf = (t, e) => t === null ? null : _e(Math.round(t), 0, e);
function Eo(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class pr extends wt {
  constructor(e) {
    super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(e) {
    const i = this._addedLabels;
    if (i.length) {
      const s = this.getLabels();
      for (const { index: r, label: n } of i)
        s[r] === n && s.splice(r, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, i) {
    if (K(e))
      return null;
    const s = this.getLabels();
    return i = isFinite(i) && s[i] === e ? i : Ef(s, e, W(i, e), this._addedLabels), Cf(i, s.length - 1);
  }
  determineDataLimits() {
    const { minDefined: e, maxDefined: i } = this.getUserBounds();
    let { min: s, max: r } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (e || (s = 0), i || (r = this.getLabels().length - 1)), this.min = s, this.max = r;
  }
  buildTicks() {
    const e = this.min, i = this.max, s = this.options.offset, r = [];
    let n = this.getLabels();
    n = e === 0 && i === n.length - 1 ? n : n.slice(e, i + 1), this._valueRange = Math.max(n.length - (s ? 0 : 1), 1), this._startValue = this.min - (s ? 0.5 : 0);
    for (let a = e; a <= i; a++)
      r.push({
        value: a
      });
    return r;
  }
  getLabelForValue(e) {
    return Eo.call(this, e);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(e) {
    return typeof e != "number" && (e = this.parse(e)), e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getPixelForTick(e) {
    const i = this.ticks;
    return e < 0 || e > i.length - 1 ? null : this.getPixelForValue(i[e].value);
  }
  getValueForPixel(e) {
    return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
I(pr, "id", "category"), I(pr, "defaults", {
  ticks: {
    callback: Eo
  }
});
function Pf(t, e) {
  const i = [], { bounds: r, step: n, min: a, max: o, precision: l, count: d, maxTicks: c, maxDigits: h, includeBounds: u } = t, g = n || 1, _ = c - 1, { min: f, max: p } = e, m = !K(a), v = !K(o), E = !K(d), C = (p - f) / (h + 1);
  let x = bn((p - f) / _ / g) * g, k, w, b, A;
  if (x < 1e-14 && !m && !v)
    return [
      {
        value: f
      },
      {
        value: p
      }
    ];
  A = Math.ceil(p / x) - Math.floor(f / x), A > _ && (x = bn(A * x / _ / g) * g), K(l) || (k = Math.pow(10, l), x = Math.ceil(x * k) / k), r === "ticks" ? (w = Math.floor(f / x) * x, b = Math.ceil(p / x) * x) : (w = f, b = p), m && v && n && xh((o - a) / n, x / 1e3) ? (A = Math.round(Math.min((o - a) / x, c)), x = (o - a) / A, w = a, b = o) : E ? (w = m ? a : w, b = v ? o : b, A = d - 1, x = (b - w) / A) : (A = (b - w) / x, Qt(A, Math.round(A), x / 1e3) ? A = Math.round(A) : A = Math.ceil(A));
  const M = Math.max(xn(x), xn(w));
  k = Math.pow(10, K(l) ? M : l), w = Math.round(w * k) / k, b = Math.round(b * k) / k;
  let P = 0;
  for (m && (u && w !== a ? (i.push({
    value: a
  }), w < a && P++, Qt(Math.round((w + P * x) * k) / k, a, Co(a, C, t)) && P++) : w < a && P++); P < A; ++P) {
    const y = Math.round((w + P * x) * k) / k;
    if (v && y > o)
      break;
    i.push({
      value: y
    });
  }
  return v && u && b !== o ? i.length && Qt(i[i.length - 1].value, o, Co(o, C, t)) ? i[i.length - 1].value = o : i.push({
    value: o
  }) : (!v || b === o) && i.push({
    value: b
  }), i;
}
function Co(t, e, { horizontal: i, minRotation: s }) {
  const r = Ie(s), n = (i ? Math.sin(r) : Math.cos(r)) || 1e-3, a = 0.75 * e * ("" + t).length;
  return Math.min(e / n, a);
}
class rs extends wt {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(e, i) {
    return K(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
  }
  handleTickRangeOptions() {
    const { beginAtZero: e } = this.options, { minDefined: i, maxDefined: s } = this.getUserBounds();
    let { min: r, max: n } = this;
    const a = (l) => r = i ? r : l, o = (l) => n = s ? n : l;
    if (e) {
      const l = je(r), d = je(n);
      l < 0 && d < 0 ? o(0) : l > 0 && d > 0 && a(0);
    }
    if (r === n) {
      let l = n === 0 ? 1 : Math.abs(n * 0.05);
      o(n + l), e || a(r - l);
    }
    this.min = r, this.max = n;
  }
  getTickLimit() {
    const e = this.options.ticks;
    let { maxTicksLimit: i, stepSize: s } = e, r;
    return s ? (r = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, r > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${r} ticks. Limiting to 1000.`), r = 1e3)) : (r = this.computeTickLimit(), i = i || 11), i && (r = Math.min(i, r)), r;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const e = this.options, i = e.ticks;
    let s = this.getTickLimit();
    s = Math.max(2, s);
    const r = {
      maxTicks: s,
      bounds: e.bounds,
      min: e.min,
      max: e.max,
      precision: i.precision,
      step: i.stepSize,
      count: i.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: i.minRotation || 0,
      includeBounds: i.includeBounds !== !1
    }, n = this._range || this, a = Pf(r, n);
    return e.bounds === "ticks" && va(a, this, "value"), e.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
  }
  configure() {
    const e = this.ticks;
    let i = this.min, s = this.max;
    if (super.configure(), this.options.offset && e.length) {
      const r = (s - i) / Math.max(e.length - 1, 1) / 2;
      i -= r, s += r;
    }
    this._startValue = i, this._endValue = s, this._valueRange = s - i;
  }
  getLabelForValue(e) {
    return vi(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class mr extends rs {
  determineDataLimits() {
    const { min: e, max: i } = this.getMinMax(!0);
    this.min = de(e) ? e : 0, this.max = de(i) ? i : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const e = this.isHorizontal(), i = e ? this.width : this.height, s = Ie(this.options.ticks.minRotation), r = (e ? Math.sin(s) : Math.cos(s)) || 1e-3, n = this._resolveTickFontOptions(0);
    return Math.ceil(i / Math.min(40, n.lineHeight / r));
  }
  getPixelForValue(e) {
    return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
  }
}
I(mr, "id", "linear"), I(mr, "defaults", {
  ticks: {
    callback: ls.formatters.numeric
  }
});
const gi = (t) => Math.floor(Qe(t)), ht = (t, e) => Math.pow(10, gi(t) + e);
function Po(t) {
  return t / Math.pow(10, gi(t)) === 1;
}
function Mo(t, e, i) {
  const s = Math.pow(10, i), r = Math.floor(t / s);
  return Math.ceil(e / s) - r;
}
function Mf(t, e) {
  const i = e - t;
  let s = gi(i);
  for (; Mo(t, e, s) > 10; )
    s++;
  for (; Mo(t, e, s) < 10; )
    s--;
  return Math.min(s, gi(t));
}
function $f(t, { min: e, max: i }) {
  e = Ce(t.min, e);
  const s = [], r = gi(e);
  let n = Mf(e, i), a = n < 0 ? Math.pow(10, Math.abs(n)) : 1;
  const o = Math.pow(10, n), l = r > n ? Math.pow(10, r) : 0, d = Math.round((e - l) * a) / a, c = Math.floor((e - l) / o / 10) * o * 10;
  let h = Math.floor((d - c) / Math.pow(10, n)), u = Ce(t.min, Math.round((l + c + h * Math.pow(10, n)) * a) / a);
  for (; u < i; )
    s.push({
      value: u,
      major: Po(u),
      significand: h
    }), h >= 10 ? h = h < 15 ? 15 : 20 : h++, h >= 20 && (n++, h = 2, a = n >= 0 ? 1 : a), u = Math.round((l + c + h * Math.pow(10, n)) * a) / a;
  const g = Ce(t.max, u);
  return s.push({
    value: g,
    major: Po(g),
    significand: h
  }), s;
}
class vr extends wt {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(e, i) {
    const s = rs.prototype.parse.apply(this, [
      e,
      i
    ]);
    if (s === 0) {
      this._zero = !0;
      return;
    }
    return de(s) && s > 0 ? s : null;
  }
  determineDataLimits() {
    const { min: e, max: i } = this.getMinMax(!0);
    this.min = de(e) ? Math.max(0, e) : null, this.max = de(i) ? Math.max(0, i) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !de(this._userMin) && (this.min = e === ht(this.min, 0) ? ht(this.min, -1) : ht(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: e, maxDefined: i } = this.getUserBounds();
    let s = this.min, r = this.max;
    const n = (o) => s = e ? s : o, a = (o) => r = i ? r : o;
    s === r && (s <= 0 ? (n(1), a(10)) : (n(ht(s, -1)), a(ht(r, 1)))), s <= 0 && n(ht(r, -1)), r <= 0 && a(ht(s, 1)), this.min = s, this.max = r;
  }
  buildTicks() {
    const e = this.options, i = {
      min: this._userMin,
      max: this._userMax
    }, s = $f(i, this);
    return e.bounds === "ticks" && va(s, this, "value"), e.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  getLabelForValue(e) {
    return e === void 0 ? "0" : vi(e, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const e = this.min;
    super.configure(), this._startValue = Qe(e), this._valueRange = Qe(this.max) - Qe(e);
  }
  getPixelForValue(e) {
    return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (Qe(e) - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    const i = this.getDecimalForPixel(e);
    return Math.pow(10, this._startValue + i * this._valueRange);
  }
}
I(vr, "id", "logarithmic"), I(vr, "defaults", {
  ticks: {
    callback: ls.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function yr(t) {
  const e = t.ticks;
  if (e.display && t.display) {
    const i = be(e.backdropPadding);
    return W(e.font && e.font.size, ae.font.size) + i.height;
  }
  return 0;
}
function Tf(t, e, i) {
  return i = oe(i) ? i : [
    i
  ], {
    w: Nh(t, e.string, i),
    h: i.length * e.lineHeight
  };
}
function $o(t, e, i, s, r) {
  return t === s || t === r ? {
    start: e - i / 2,
    end: e + i / 2
  } : t < s || t > r ? {
    start: e - i,
    end: e
  } : {
    start: e,
    end: e + i
  };
}
function Lf(t) {
  const e = {
    l: t.left + t._padding.left,
    r: t.right - t._padding.right,
    t: t.top + t._padding.top,
    b: t.bottom - t._padding.bottom
  }, i = Object.assign({}, e), s = [], r = [], n = t._pointLabels.length, a = t.options.pointLabels, o = a.centerPointLabels ? ee / n : 0;
  for (let l = 0; l < n; l++) {
    const d = a.setContext(t.getPointLabelContext(l));
    r[l] = d.padding;
    const c = t.getPointPosition(l, t.drawingArea + r[l], o), h = ge(d.font), u = Tf(t.ctx, h, t._pointLabels[l]);
    s[l] = u;
    const g = ve(t.getIndexAngle(l) + o), _ = Math.round(Cr(g)), f = $o(_, c.x, u.w, 0, 180), p = $o(_, c.y, u.h, 90, 270);
    Df(i, e, g, f, p);
  }
  t.setCenterPoint(e.l - i.l, i.r - e.r, e.t - i.t, i.b - e.b), t._pointLabelItems = Rf(t, s, r);
}
function Df(t, e, i, s, r) {
  const n = Math.abs(Math.sin(i)), a = Math.abs(Math.cos(i));
  let o = 0, l = 0;
  s.start < e.l ? (o = (e.l - s.start) / n, t.l = Math.min(t.l, e.l - o)) : s.end > e.r && (o = (s.end - e.r) / n, t.r = Math.max(t.r, e.r + o)), r.start < e.t ? (l = (e.t - r.start) / a, t.t = Math.min(t.t, e.t - l)) : r.end > e.b && (l = (r.end - e.b) / a, t.b = Math.max(t.b, e.b + l));
}
function zf(t, e, i) {
  const s = t.drawingArea, { extra: r, additionalAngle: n, padding: a, size: o } = i, l = t.getPointPosition(e, s + r + a, n), d = Math.round(Cr(ve(l.angle + ce))), c = Bf(l.y, o.h, d), h = If(d), u = Nf(l.x, o.w, h);
  return {
    visible: !0,
    x: l.x,
    y: c,
    textAlign: h,
    left: u,
    top: c,
    right: u + o.w,
    bottom: c + o.h
  };
}
function Of(t, e) {
  if (!e)
    return !0;
  const { left: i, top: s, right: r, bottom: n } = t;
  return !(qe({
    x: i,
    y: s
  }, e) || qe({
    x: i,
    y: n
  }, e) || qe({
    x: r,
    y: s
  }, e) || qe({
    x: r,
    y: n
  }, e));
}
function Rf(t, e, i) {
  const s = [], r = t._pointLabels.length, n = t.options, { centerPointLabels: a, display: o } = n.pointLabels, l = {
    extra: yr(n) / 2,
    additionalAngle: a ? ee / r : 0
  };
  let d;
  for (let c = 0; c < r; c++) {
    l.padding = i[c], l.size = e[c];
    const h = zf(t, c, l);
    s.push(h), o === "auto" && (h.visible = Of(h, d), h.visible && (d = h));
  }
  return s;
}
function If(t) {
  return t === 0 || t === 180 ? "center" : t < 180 ? "left" : "right";
}
function Nf(t, e, i) {
  return i === "right" ? t -= e : i === "center" && (t -= e / 2), t;
}
function Bf(t, e, i) {
  return i === 90 || i === 270 ? t -= e / 2 : (i > 270 || i < 90) && (t -= e), t;
}
function Hf(t, e, i) {
  const { left: s, top: r, right: n, bottom: a } = i, { backdropColor: o } = e;
  if (!K(o)) {
    const l = pt(e.borderRadius), d = be(e.backdropPadding);
    t.fillStyle = o;
    const c = s - d.left, h = r - d.top, u = n - s + d.width, g = a - r + d.height;
    Object.values(l).some((_) => _ !== 0) ? (t.beginPath(), hi(t, {
      x: c,
      y: h,
      w: u,
      h: g,
      radius: l
    }), t.fill()) : t.fillRect(c, h, u, g);
  }
}
function Ff(t, e) {
  const { ctx: i, options: { pointLabels: s } } = t;
  for (let r = e - 1; r >= 0; r--) {
    const n = t._pointLabelItems[r];
    if (!n.visible)
      continue;
    const a = s.setContext(t.getPointLabelContext(r));
    Hf(i, a, n);
    const o = ge(a.font), { x: l, y: d, textAlign: c } = n;
    xt(i, t._pointLabels[r], l, d + o.lineHeight / 2, o, {
      color: a.color,
      textAlign: c,
      textBaseline: "middle"
    });
  }
}
function hl(t, e, i, s) {
  const { ctx: r } = t;
  if (i)
    r.arc(t.xCenter, t.yCenter, e, 0, re);
  else {
    let n = t.getPointPosition(0, e);
    r.moveTo(n.x, n.y);
    for (let a = 1; a < s; a++)
      n = t.getPointPosition(a, e), r.lineTo(n.x, n.y);
  }
}
function Gf(t, e, i, s, r) {
  const n = t.ctx, a = e.circular, { color: o, lineWidth: l } = e;
  !a && !s || !o || !l || i < 0 || (n.save(), n.strokeStyle = o, n.lineWidth = l, n.setLineDash(r.dash || []), n.lineDashOffset = r.dashOffset, n.beginPath(), hl(t, i, a, s), n.closePath(), n.stroke(), n.restore());
}
function jf(t, e, i) {
  return ot(t, {
    label: i,
    index: e,
    type: "pointLabel"
  });
}
class Xt extends rs {
  constructor(e) {
    super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const e = this._padding = be(yr(this.options) / 2), i = this.width = this.maxWidth - e.width, s = this.height = this.maxHeight - e.height;
    this.xCenter = Math.floor(this.left + i / 2 + e.left), this.yCenter = Math.floor(this.top + s / 2 + e.top), this.drawingArea = Math.floor(Math.min(i, s) / 2);
  }
  determineDataLimits() {
    const { min: e, max: i } = this.getMinMax(!1);
    this.min = de(e) && !isNaN(e) ? e : 0, this.max = de(i) && !isNaN(i) ? i : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / yr(this.options));
  }
  generateTickLabels(e) {
    rs.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((i, s) => {
      const r = se(this.options.pointLabels.callback, [
        i,
        s
      ], this);
      return r || r === 0 ? r : "";
    }).filter((i, s) => this.chart.getDataVisibility(s));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? Lf(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(e, i, s, r) {
    this.xCenter += Math.floor((e - i) / 2), this.yCenter += Math.floor((s - r) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, i, s, r));
  }
  getIndexAngle(e) {
    const i = re / (this._pointLabels.length || 1), s = this.options.startAngle || 0;
    return ve(e * i + Ie(s));
  }
  getDistanceFromCenterForValue(e) {
    if (K(e))
      return NaN;
    const i = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - e) * i : (e - this.min) * i;
  }
  getValueForDistanceFromCenter(e) {
    if (K(e))
      return NaN;
    const i = e / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - i : this.min + i;
  }
  getPointLabelContext(e) {
    const i = this._pointLabels || [];
    if (e >= 0 && e < i.length) {
      const s = i[e];
      return jf(this.getContext(), e, s);
    }
  }
  getPointPosition(e, i, s = 0) {
    const r = this.getIndexAngle(e) - ce + s;
    return {
      x: Math.cos(r) * i + this.xCenter,
      y: Math.sin(r) * i + this.yCenter,
      angle: r
    };
  }
  getPointPositionForValue(e, i) {
    return this.getPointPosition(e, this.getDistanceFromCenterForValue(i));
  }
  getBasePosition(e) {
    return this.getPointPositionForValue(e || 0, this.getBaseValue());
  }
  getPointLabelPosition(e) {
    const { left: i, top: s, right: r, bottom: n } = this._pointLabelItems[e];
    return {
      left: i,
      top: s,
      right: r,
      bottom: n
    };
  }
  drawBackground() {
    const { backgroundColor: e, grid: { circular: i } } = this.options;
    if (e) {
      const s = this.ctx;
      s.save(), s.beginPath(), hl(this, this.getDistanceFromCenterForValue(this._endValue), i, this._pointLabels.length), s.closePath(), s.fillStyle = e, s.fill(), s.restore();
    }
  }
  drawGrid() {
    const e = this.ctx, i = this.options, { angleLines: s, grid: r, border: n } = i, a = this._pointLabels.length;
    let o, l, d;
    if (i.pointLabels.display && Ff(this, a), r.display && this.ticks.forEach((c, h) => {
      if (h !== 0 || h === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(c.value);
        const u = this.getContext(h), g = r.setContext(u), _ = n.setContext(u);
        Gf(this, g, l, a, _);
      }
    }), s.display) {
      for (e.save(), o = a - 1; o >= 0; o--) {
        const c = s.setContext(this.getPointLabelContext(o)), { color: h, lineWidth: u } = c;
        !u || !h || (e.lineWidth = u, e.strokeStyle = h, e.setLineDash(c.borderDash), e.lineDashOffset = c.borderDashOffset, l = this.getDistanceFromCenterForValue(i.reverse ? this.min : this.max), d = this.getPointPosition(o, l), e.beginPath(), e.moveTo(this.xCenter, this.yCenter), e.lineTo(d.x, d.y), e.stroke());
      }
      e.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const e = this.ctx, i = this.options, s = i.ticks;
    if (!s.display)
      return;
    const r = this.getIndexAngle(0);
    let n, a;
    e.save(), e.translate(this.xCenter, this.yCenter), e.rotate(r), e.textAlign = "center", e.textBaseline = "middle", this.ticks.forEach((o, l) => {
      if (l === 0 && this.min >= 0 && !i.reverse)
        return;
      const d = s.setContext(this.getContext(l)), c = ge(d.font);
      if (n = this.getDistanceFromCenterForValue(this.ticks[l].value), d.showLabelBackdrop) {
        e.font = c.string, a = e.measureText(o.label).width, e.fillStyle = d.backdropColor;
        const h = be(d.backdropPadding);
        e.fillRect(-a / 2 - h.left, -n - c.size / 2 - h.top, a + h.width, c.size + h.height);
      }
      xt(e, o.label, 0, -n, c, {
        color: d.color,
        strokeColor: d.textStrokeColor,
        strokeWidth: d.textStrokeWidth
      });
    }), e.restore();
  }
  drawTitle() {
  }
}
I(Xt, "id", "radialLinear"), I(Xt, "defaults", {
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
    callback: ls.formatters.numeric
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
}), I(Xt, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), I(Xt, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const _s = {
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
}, Ee = /* @__PURE__ */ Object.keys(_s);
function To(t, e) {
  return t - e;
}
function Lo(t, e) {
  if (K(e))
    return null;
  const i = t._adapter, { parser: s, round: r, isoWeekday: n } = t._parseOpts;
  let a = e;
  return typeof s == "function" && (a = s(a)), de(a) || (a = typeof s == "string" ? i.parse(a, s) : i.parse(a)), a === null ? null : (r && (a = r === "week" && (Dt(n) || n === !0) ? i.startOf(a, "isoWeek", n) : i.startOf(a, r)), +a);
}
function Do(t, e, i, s) {
  const r = Ee.length;
  for (let n = Ee.indexOf(t); n < r - 1; ++n) {
    const a = _s[Ee[n]], o = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((i - e) / (o * a.size)) <= s)
      return Ee[n];
  }
  return Ee[r - 1];
}
function Uf(t, e, i, s, r) {
  for (let n = Ee.length - 1; n >= Ee.indexOf(i); n--) {
    const a = Ee[n];
    if (_s[a].common && t._adapter.diff(r, s, a) >= e - 1)
      return a;
  }
  return Ee[i ? Ee.indexOf(i) : 0];
}
function Vf(t) {
  for (let e = Ee.indexOf(t) + 1, i = Ee.length; e < i; ++e)
    if (_s[Ee[e]].common)
      return Ee[e];
}
function zo(t, e, i) {
  if (!i)
    t[e] = !0;
  else if (i.length) {
    const { lo: s, hi: r } = Pr(i, e), n = i[s] >= e ? i[s] : i[r];
    t[n] = !0;
  }
}
function Wf(t, e, i, s) {
  const r = t._adapter, n = +r.startOf(e[0].value, s), a = e[e.length - 1].value;
  let o, l;
  for (o = n; o <= a; o = +r.add(o, 1, s))
    l = i[o], l >= 0 && (e[l].major = !0);
  return e;
}
function Oo(t, e, i) {
  const s = [], r = {}, n = e.length;
  let a, o;
  for (a = 0; a < n; ++a)
    o = e[a], r[o] = a, s.push({
      value: o,
      major: !1
    });
  return n === 0 || !i ? s : Wf(t, s, r, i);
}
class _i extends wt {
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, i = {}) {
    const s = e.time || (e.time = {}), r = this._adapter = new tg._date(e.adapters.date);
    r.init(i), Jt(s.displayFormats, r.formats()), this._parseOpts = {
      parser: s.parser,
      round: s.round,
      isoWeekday: s.isoWeekday
    }, super.init(e), this._normalized = i.normalized;
  }
  parse(e, i) {
    return e === void 0 ? null : Lo(this, e);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const e = this.options, i = this._adapter, s = e.time.unit || "day";
    let { min: r, max: n, minDefined: a, maxDefined: o } = this.getUserBounds();
    function l(d) {
      !a && !isNaN(d.min) && (r = Math.min(r, d.min)), !o && !isNaN(d.max) && (n = Math.max(n, d.max));
    }
    (!a || !o) && (l(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && l(this.getMinMax(!1))), r = de(r) && !isNaN(r) ? r : +i.startOf(Date.now(), s), n = de(n) && !isNaN(n) ? n : +i.endOf(Date.now(), s) + 1, this.min = Math.min(r, n - 1), this.max = Math.max(r + 1, n);
  }
  _getLabelBounds() {
    const e = this.getLabelTimestamps();
    let i = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY;
    return e.length && (i = e[0], s = e[e.length - 1]), {
      min: i,
      max: s
    };
  }
  buildTicks() {
    const e = this.options, i = e.time, s = e.ticks, r = s.source === "labels" ? this.getLabelTimestamps() : this._generate();
    e.bounds === "ticks" && r.length && (this.min = this._userMin || r[0], this.max = this._userMax || r[r.length - 1]);
    const n = this.min, a = this.max, o = Ah(r, n, a);
    return this._unit = i.unit || (s.autoSkip ? Do(i.minUnit, this.min, this.max, this._getLabelCapacity(n)) : Uf(this, o.length, i.minUnit, this.min, this.max)), this._majorUnit = !s.major.enabled || this._unit === "year" ? void 0 : Vf(this._unit), this.initOffsets(r), e.reverse && o.reverse(), Oo(this, o, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let i = 0, s = 0, r, n;
    this.options.offset && e.length && (r = this.getDecimalForValue(e[0]), e.length === 1 ? i = 1 - r : i = (this.getDecimalForValue(e[1]) - r) / 2, n = this.getDecimalForValue(e[e.length - 1]), e.length === 1 ? s = n : s = (n - this.getDecimalForValue(e[e.length - 2])) / 2);
    const a = e.length < 3 ? 0.5 : 0.25;
    i = _e(i, 0, a), s = _e(s, 0, a), this._offsets = {
      start: i,
      end: s,
      factor: 1 / (i + 1 + s)
    };
  }
  _generate() {
    const e = this._adapter, i = this.min, s = this.max, r = this.options, n = r.time, a = n.unit || Do(n.minUnit, i, s, this._getLabelCapacity(i)), o = W(r.ticks.stepSize, 1), l = a === "week" ? n.isoWeekday : !1, d = Dt(l) || l === !0, c = {};
    let h = i, u, g;
    if (d && (h = +e.startOf(h, "isoWeek", l)), h = +e.startOf(h, d ? "day" : a), e.diff(s, i, a) > 1e5 * o)
      throw new Error(i + " and " + s + " are too far apart with stepSize of " + o + " " + a);
    const _ = r.ticks.source === "data" && this.getDataTimestamps();
    for (u = h, g = 0; u < s; u = +e.add(u, o, a), g++)
      zo(c, u, _);
    return (u === s || r.bounds === "ticks" || g === 1) && zo(c, u, _), Object.keys(c).sort(To).map((f) => +f);
  }
  getLabelForValue(e) {
    const i = this._adapter, s = this.options.time;
    return s.tooltipFormat ? i.format(e, s.tooltipFormat) : i.format(e, s.displayFormats.datetime);
  }
  format(e, i) {
    const r = this.options.time.displayFormats, n = this._unit, a = i || r[n];
    return this._adapter.format(e, a);
  }
  _tickFormatFunction(e, i, s, r) {
    const n = this.options, a = n.ticks.callback;
    if (a)
      return se(a, [
        e,
        i,
        s
      ], this);
    const o = n.time.displayFormats, l = this._unit, d = this._majorUnit, c = l && o[l], h = d && o[d], u = s[i], g = d && h && u && u.major;
    return this._adapter.format(e, r || (g ? h : c));
  }
  generateTickLabels(e) {
    let i, s, r;
    for (i = 0, s = e.length; i < s; ++i)
      r = e[i], r.label = this._tickFormatFunction(r.value, i, e);
  }
  getDecimalForValue(e) {
    return e === null ? NaN : (e - this.min) / (this.max - this.min);
  }
  getPixelForValue(e) {
    const i = this._offsets, s = this.getDecimalForValue(e);
    return this.getPixelForDecimal((i.start + s) * i.factor);
  }
  getValueForPixel(e) {
    const i = this._offsets, s = this.getDecimalForPixel(e) / i.factor - i.end;
    return this.min + s * (this.max - this.min);
  }
  _getLabelSize(e) {
    const i = this.options.ticks, s = this.ctx.measureText(e).width, r = Ie(this.isHorizontal() ? i.maxRotation : i.minRotation), n = Math.cos(r), a = Math.sin(r), o = this._resolveTickFontOptions(0).size;
    return {
      w: s * n + o * a,
      h: s * a + o * n
    };
  }
  _getLabelCapacity(e) {
    const i = this.options.time, s = i.displayFormats, r = s[i.unit] || s.millisecond, n = this._tickFormatFunction(e, 0, Oo(this, [
      e
    ], this._majorUnit), r), a = this._getLabelSize(n), o = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
    return o > 0 ? o : 1;
  }
  getDataTimestamps() {
    let e = this._cache.data || [], i, s;
    if (e.length)
      return e;
    const r = this.getMatchingVisibleMetas();
    if (this._normalized && r.length)
      return this._cache.data = r[0].controller.getAllParsedValues(this);
    for (i = 0, s = r.length; i < s; ++i)
      e = e.concat(r[i].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(e);
  }
  getLabelTimestamps() {
    const e = this._cache.labels || [];
    let i, s;
    if (e.length)
      return e;
    const r = this.getLabels();
    for (i = 0, s = r.length; i < s; ++i)
      e.push(Lo(this, r[i]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return xa(e.sort(To));
  }
}
I(_i, "id", "time"), I(_i, "defaults", {
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
function Oi(t, e, i) {
  let s = 0, r = t.length - 1, n, a, o, l;
  i ? (e >= t[s].pos && e <= t[r].pos && ({ lo: s, hi: r } = Xe(t, "pos", e)), { pos: n, time: o } = t[s], { pos: a, time: l } = t[r]) : (e >= t[s].time && e <= t[r].time && ({ lo: s, hi: r } = Xe(t, "time", e)), { time: n, pos: o } = t[s], { time: a, pos: l } = t[r]);
  const d = a - n;
  return d ? o + (l - o) * (e - n) / d : o;
}
class br extends _i {
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), i = this._table = this.buildLookupTable(e);
    this._minPos = Oi(i, this.min), this._tableRange = Oi(i, this.max) - this._minPos, super.initOffsets(e);
  }
  buildLookupTable(e) {
    const { min: i, max: s } = this, r = [], n = [];
    let a, o, l, d, c;
    for (a = 0, o = e.length; a < o; ++a)
      d = e[a], d >= i && d <= s && r.push(d);
    if (r.length < 2)
      return [
        {
          time: i,
          pos: 0
        },
        {
          time: s,
          pos: 1
        }
      ];
    for (a = 0, o = r.length; a < o; ++a)
      c = r[a + 1], l = r[a - 1], d = r[a], Math.round((c + l) / 2) !== d && n.push({
        time: d,
        pos: a / (o - 1)
      });
    return n;
  }
  _generate() {
    const e = this.min, i = this.max;
    let s = super.getDataTimestamps();
    return (!s.includes(e) || !s.length) && s.splice(0, 0, e), (!s.includes(i) || s.length === 1) && s.push(i), s.sort((r, n) => r - n);
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length)
      return e;
    const i = this.getDataTimestamps(), s = this.getLabelTimestamps();
    return i.length && s.length ? e = this.normalize(i.concat(s)) : e = i.length ? i : s, e = this._cache.all = e, e;
  }
  getDecimalForValue(e) {
    return (Oi(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const i = this._offsets, s = this.getDecimalForPixel(e) / i.factor - i.end;
    return Oi(this._table, s * this._tableRange + this._minPos, !0);
  }
}
I(br, "id", "timeseries"), I(br, "defaults", _i.defaults);
var Kf = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: pr,
  LinearScale: mr,
  LogarithmicScale: vr,
  RadialLinearScale: Xt,
  TimeScale: _i,
  TimeSeriesScale: br
});
const Yf = [
  eg,
  $_,
  Sf,
  Kf
];
Ge.register(...Yf);
Ge.register(Et, et, cl, ll);
const Ro = Hc;
class Xf extends Ct {
  constructor() {
    super();
    I(this, "_forecastUnsub", null);
    // Unsubscribe-funktion
    I(this, "_forecastEvent", null);
    // Forecast-event (ex. hourly forecast från subscribe)
    I(this, "_chartCache", /* @__PURE__ */ new Map());
    I(this, "_versionLogged", !1);
    I(this, "_error", null);
    this.days_to_show = 4, this.displayCols = [], this.header = "", this._initDone = !1, this._userConfig = {}, this.sensors = [], this.tapAction = null;
  }
  // Holds error translation key when something goes wrong
  _renderLevelCircle(i, {
    colors: s = U.levels_colors,
    emptyColor: r = U.levels_empty_color,
    gapColor: n = U.levels_gap_color,
    thickness: a = U.levels_thickness,
    gap: o = U.levels_gap,
    size: l = 100
  }, d = "default", c = 0, h = i, u = null, g = !0) {
    var f, p, m;
    const _ = `chart-${d}-${c}-${i}`;
    return F`
      <div
        id="${_}"
        class="level-circle"
        style="display: inline-block; width: ${l}px; height: ${l}px; position: relative;${g && u ? " cursor: pointer;" : ""}"
        data-level="${i}"
        data-display-level="${h}"
        data-colors="${JSON.stringify(s)}"
        data-empty-color="${r}"
        data-gap-color="${n}"
        data-thickness="${a}"
        data-gap="${o}"
        data-size="${l}"
        data-show-value="${this.config && this.config.show_value_numeric_in_circle}"
        data-font-weight="${((f = this.config) == null ? void 0 : f.levels_text_weight) || "normal"}"
        data-font-size-ratio="${((p = this.config) == null ? void 0 : p.levels_text_size) || 0.2}"
        data-text-color="${((m = this.config) == null ? void 0 : m.levels_text_color) || "var(--primary-text-color)"}"
        @click=${(v) => {
      g && u && (v.stopPropagation(), this._openEntity(u));
    }}
      ></div>
    `;
  }
  _openEntity(i) {
    const s = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: i }
    });
    this.dispatchEvent(s);
  }
  /**
   * Build or refresh all level-circle charts in the current DOM.
   * Chart options are stored as data attributes so charts can be
   * reconstructed after the DOM is cloned or replaced.
   */
  _rebuildCharts() {
    var r;
    const i = ((r = this.renderRoot) == null ? void 0 : r.querySelectorAll(".level-circle")) || [], s = /* @__PURE__ */ new Set();
    i.forEach((n) => {
      s.add(n.id);
      const a = Number(n.dataset.level || 0), o = Number(n.dataset.displayLevel ?? a), l = JSON.parse(n.dataset.colors || "[]"), d = l.length, c = Math.min(a, d), h = n.dataset.emptyColor, u = n.dataset.gapColor, g = Number(n.dataset.thickness), _ = Number(n.dataset.gap), f = Number(n.dataset.size), p = n.dataset.showValue === "true", m = n.dataset.fontWeight || "normal", v = parseFloat(n.dataset.fontSizeRatio) || 0.2, E = n.dataset.textColor || "var(--primary-text-color)";
      let C = this._chartCache.get(n.id);
      const x = n.querySelector(".level-value-text");
      if (x && x.remove(), !C || !n.contains(C.canvas)) {
        C && C.destroy(), n.innerHTML = "";
        const k = document.createElement("canvas");
        k.width = f, k.height = f, n.appendChild(k);
        const w = Array(d).fill(1), b = Array(d).fill(h).map((M, P) => P < c ? l[P] : h), A = Array(d).fill(u);
        C = new Ge(k.getContext("2d"), {
          type: "doughnut",
          data: {
            labels: Array(d).fill(""),
            datasets: [
              {
                data: w,
                backgroundColor: b,
                borderColor: A,
                borderWidth: _
              }
            ]
          },
          options: {
            rotation: -Math.PI / 2,
            cutout: `${100 - g}%`,
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
        }), this._chartCache.set(n.id, C);
      } else {
        const k = C.data.datasets;
        if (k && k[0]) {
          const w = Array(k[0].backgroundColor.length).fill(h).map((b, A) => A < c ? l[A] : h);
          k[0].backgroundColor = w, C.update("none");
        }
      }
      if (p) {
        const k = document.createElement("div");
        k.className = "level-value-text", k.textContent = o, k.style.position = "absolute", k.style.top = "50%", k.style.left = "50%", k.style.transform = "translate(-50%, -50%)", k.style.fontSize = `${f * v}px`, k.style.fontWeight = m, k.style.color = E, f < 42 && (k.style.lineHeight = "1", k.style.height = "1em"), n.appendChild(k);
      }
    }), this._chartCache.forEach((n, a) => {
      s.has(a) || (n.destroy(), this._chartCache.delete(a));
    });
  }
  updated(i) {
    (i.has("config") || i.has("_hass")) && this._subscribeForecastIfNeeded(), this.updateComplete.then(() => this._rebuildCharts()), super.updated && super.updated(i);
  }
  // Recreate charts when element is connected, useful after DOM cloning
  connectedCallback() {
    super.connectedCallback(), Promise.resolve().then(() => this._rebuildCharts());
  }
  // Clean up charts when component is disconnected
  disconnectedCallback() {
    super.disconnectedCallback(), this._forecastUnsub && (Promise.resolve(this._forecastUnsub).then((i) => {
      typeof i == "function" && i();
    }), this._forecastUnsub = null), this._chartCache.forEach((i) => {
      i.destroy();
    }), this._chartCache.clear();
  }
  _updateSensorsAndColumns(i, s, r) {
    this.debug && (this.d_sensors = i, this.d_availableSensors = s, console.debug(
      "[Card] _updateSensorsAndColumns called with",
      s.length,
      "available sensors"
    ));
    let n = 0;
    r.show_empty_days ? n = r.days_to_show : i.length > 0 && i[0].days && (n = Math.min(i[0].days.length, r.days_to_show));
    const a = Array.from({ length: n }, (l, d) => d);
    (!this._isLoaded || !we(this.sensors, i) || this._availableSensorCount !== s.length || this.days_to_show !== n || !we(this.displayCols, a)) && (this.sensors = i, this._availableSensorCount = s.length, this.days_to_show = n, this.displayCols = a, this._isLoaded = !0, this._error = null, this.debug && (console.debug("Days to show:", this.days_to_show), console.debug("Display columns:", this.displayCols), console.debug(
      `[Card] Final sensors for display (${i.length}):`,
      i.map((l) => {
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
  _subscribeForecastIfNeeded() {
    var i, s, r, n;
    if (!(!this.config || !this._hass) && (this._forecastUnsub && (Promise.resolve(this._forecastUnsub).then((a) => {
      typeof a == "function" && a();
    }), this._forecastUnsub = null), this.config.integration === "silam" && this.config.location)) {
      const a = this.config.location.toLowerCase(), o = ((s = (i = this.config) == null ? void 0 : i.date_locale) == null ? void 0 : s.split("-")[0]) || "en", l = ((r = le.weather_suffixes) == null ? void 0 : r[o]) || ((n = le.weather_suffixes) == null ? void 0 : n.en) || [];
      if (this.debug) {
        const h = Object.keys(this._hass.states).filter(
          (u) => typeof u == "string" && u.startsWith("weather.silam_pollen_")
        );
        console.debug(
          "[Card][Debug] Alla weather-entities i hass.states:",
          h
        ), console.debug("[Card][Debug] locationSlug:", a), console.debug("[Card][Debug] Suffixes:", l);
      }
      const d = oa(this._hass, a, o);
      let c = "daily";
      this.config && this.config.mode === "twice_daily" ? c = "twice_daily" : this.config && this.config.mode === "hourly" && (c = "hourly"), d ? (this._error = null, this._forecastUnsub = this._hass.connection.subscribeMessage(
        (h) => {
          this.debug && console.debug(
            "[Card][subscribeForecast] forecastEvent RECEIVED:",
            h
          ), this._forecastEvent = h, this._updateSensorsAfterForecastEvent();
        },
        {
          type: "weather/subscribe_forecast",
          entity_id: d,
          forecast_type: c
        }
      ), this.debug && console.debug("[Card][subscribeForecast] Subscribed for", d)) : (this.debug && console.debug(
        "[Card] Hittar ingen weather-entity för location",
        a
      ), this.sensors = [], this._availableSensorCount = 0, this._forecastEvent = null, this._isLoaded = !0, this._error = "card.error_location_not_found", this.requestUpdate());
    }
  }
  _updateSensorsAfterForecastEvent() {
    if (this.config && this.config.integration === "silam" && this._forecastEvent) {
      const i = Ro[this.config.integration] || js;
      this._isLoaded = !1, i.fetchForecast(this._hass, this.config, this._forecastEvent).then((s) => {
        const r = un(
          this.config,
          this._hass,
          this.debug
        );
        this._updateSensorsAndColumns(s, r, this.config);
      }).catch((s) => {
        console.error("[Card] Error fetching SILAM forecast:", s), this.debug && console.debug("[Card] SILAM fetch error:", s), this._isLoaded = !0, this.requestUpdate();
      });
    }
  }
  get debug() {
    return !!(this.config && this.config.debug);
  }
  get _lang() {
    var i;
    return Pe(this._hass, (i = this.config) == null ? void 0 : i.date_locale);
  }
  _t(i) {
    return Z(i, this._lang);
  }
  _hasTapAction() {
    const i = this.tapAction;
    return i && i.type && i.type !== "none";
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
  _getImageSrc(i, s) {
    const r = Number(s);
    let n = r, a = -1, o = 6;
    this.config.integration === "dwd" ? (n = r * 2, o = 6) : (this.config.integration === "peu" || this.config.integration === "kleenex") && (n = r, o = 4, a = 0);
    let l = Math.round(n);
    (isNaN(l) || l < a) && (l = a), l > o && (l = o);
    const d = ke[i] || i;
    let c = xs[`${d}_${l}_png`];
    if (!c && xi[i]) {
      const h = xi[i];
      c = xs[`${h}_${l}_png`];
    }
    return c || xs[`${l}_png`];
  }
  /**
   * Gets the SVG key for an allergen, using the same logic as PNG system
   * @param {string} allergenReplaced - The allergen identifier
   * @returns {string|null} The key to use for SVG loading, or null if invalid
   */
  _getSvgKey(i) {
    if (!i || typeof i != "string")
      return this.debug && console.warn("[SVG] Invalid allergenReplaced:", i), null;
    const s = ke[i] || i;
    if (ws(s))
      return s;
    if (xi[i]) {
      const r = xi[i];
      if (ws(r))
        return r;
    }
    return s;
  }
  /**
   * Gets color for a specific level for allergen icons
   * @param {number} level - The pollen level (0-6 or 0-4 depending on integration)
   * @param {string} allergenKey - Optional allergen key for special handling
   * @returns {string} Color hex string
   */
  _colorForLevel(i, s = null) {
    var a, o, l;
    if (s === "no_allergens")
      return ((a = this.config) == null ? void 0 : a.no_allergens_color) || U.no_allergens_color;
    if (((o = this.config) == null ? void 0 : o.allergen_color_mode) === "custom" && ((l = this.config) != null && l.allergen_colors)) {
      const d = this.config.allergen_colors, c = Math.max(0, Math.min(i, d.length - 1));
      return d[c] || d[0];
    }
    const r = U.allergen_colors, n = Math.max(0, Math.min(i, r.length - 1));
    return r[n] || r[0];
  }
  /**
   * Gets color for level circles (charts) - may inherit from allergen colors
   * Note: Level circles don't use specific allergen keys, so we pass null
   * @param {number} level - The pollen level (0-6 or 0-4 depending on integration)
   * @returns {string} Color hex string
   */
  _levelColorForLevel(i) {
    var a, o, l;
    if (((a = this.config) == null ? void 0 : a.levels_inherit_mode) !== "custom")
      return this._colorForLevel(i, null);
    if (i === 0)
      return ((o = this.config) == null ? void 0 : o.levels_empty_color) || U.levels_empty_color;
    const s = ((l = this.config) == null ? void 0 : l.levels_colors) || U.levels_colors, r = i - 1, n = Math.max(0, Math.min(r, s.length - 1));
    return s[n] || s[0];
  }
  /**
   * Determines the appropriate gap color based on inheritance mode
   * @returns {string} The gap color to use
   */
  _getGapColor() {
    var i;
    return ((i = this.config) == null ? void 0 : i.levels_inherit_mode) !== "custom" ? this.config.allergen_outline_color ?? U.levels_gap_color : this.config.levels_gap_color ?? "var(--card-background-color)";
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
  _renderAllergenSvg(i, s, r = {}) {
    var _, f, p;
    if (!i || typeof i != "string")
      return this.debug && console.warn("[SVG] Cannot render SVG with invalid key:", i), F`
        <div class="pp-icon pp-icon-error" aria-hidden="true">
          <div style="background: #ff0000; color: white; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px;">?</div>
        </div>
      `;
    const n = this._colorForLevel(s, i), a = ((_ = this.config) == null ? void 0 : _.allergen_outline_color) || U.levels_gap_color, o = ((f = this.config) == null ? void 0 : f.allergen_stroke_width) ?? U.allergen_stroke_width, l = ws(i), { onClick: d, clickable: c = !1 } = r;
    let h;
    i === "no_allergens" || (p = this.config) != null && p.allergen_stroke_color_synced ? h = n : h = a;
    const u = c && d ? d : null, g = `--pp-icon-color: ${n}; --pp-icon-stroke: ${h}; --pp-icon-stroke-width: ${o}; ${c ? "cursor: pointer;" : ""}`;
    return l ? F`
        <div 
          class="pp-icon" 
          style="${g}"
          aria-hidden="true"
          @click=${u}
        >
          ${Tl(l)}
        </div>
      ` : (this.debug && console.warn(`[SVG] No SVG found for key: ${i}`), F`
        <div 
          class="pp-icon pp-icon-error" 
          style="${g}"
          aria-hidden="true"
          @click=${u}
        >
          <div style="background: #ccc; color: #666; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px;">?</div>
        </div>
      `);
  }
  static async getConfigElement() {
    return await customElements.whenDefined("pollenprognos-card-editor"), document.createElement("pollenprognos-card-editor");
  }
  setConfig(i) {
    if (we(this._userConfig, i)) return;
    this._integrationExplicit = i.hasOwnProperty("integration"), this.tapAction = i.tap_action || null;
    let s = i.integration;
    s && typeof s == "string" && (s = s.trim().toLowerCase());
    let r;
    s === "pp" ? r = pe : s === "peu" ? r = Te : s === "dwd" ? r = Ae : s === "silam" ? r = $e : s === "kleenex" ? r = Me : r = pe;
    const n = Object.keys(r).concat([
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
    for (const h of n)
      h in i && (a[h] = i[h]);
    const o = { ...r, ...a, integration: s }, l = this.config || {}, d = Object.keys(a).filter(
      (h) => !we(a[h], l[h])
    );
    if (d.length > 0 && d.every((h) => ua.includes(h))) {
      this._userConfig = { ...i }, this.config = o, this._isLoaded = !0, this.requestUpdate();
      return;
    }
    this._userConfig = { ...i }, this.config = o, !this._versionLogged && this.config.show_version !== !1 && (console.info(
      "%c🤧 Pollenprognos Card: version v2.7.2",
      "background:#f0e68c;color:#000;padding:2px 4px;border-radius:2px;"
    ), this._versionLogged = !0), this._initDone = !1, this._hass && (this.hass = this._hass);
  }
  set hass(i) {
    var p, m, v, E, C, x, k;
    if (this._hass === i) return;
    this._hass = i;
    const s = !!this._integrationExplicit;
    this.debug && console.debug("[Card] set hass called; explicit:", s);
    const r = Object.keys(i.states).filter(
      (w) => typeof w == "string" && w.startsWith("sensor.pollen_") && !w.startsWith("sensor.pollenflug_")
    ), n = Object.keys(i.states).filter(
      (w) => typeof w == "string" && w.startsWith("sensor.pollenflug_")
    ), a = Object.keys(i.states).filter(
      (w) => typeof w == "string" && w.startsWith("sensor.polleninformation_")
    ), o = Object.keys(i.states).filter(
      (w) => typeof w == "string" && w.startsWith("sensor.silam_pollen_")
    ), l = Object.keys(i.states).filter(
      (w) => typeof w == "string" && w.startsWith("sensor.kleenex_pollen_radar_")
    );
    this.debug && (console.debug("Sensor states detected:"), console.debug("PP:", r), console.debug("DWD:", n), console.debug("PEU:", a), console.debug("SILAM:", o), console.debug("KLEENEX:", l));
    let d = this._userConfig.integration;
    d && typeof d == "string" && (d = d.trim().toLowerCase()), s || (r.length ? d = "pp" : a.length ? d = "peu" : n.length ? d = "dwd" : o.length ? d = "silam" : l.length && (d = "kleenex"));
    let c;
    d === "dwd" ? c = Ae : d === "peu" ? c = Te : d === "pp" ? c = pe : d === "silam" ? c = $e : d === "kleenex" ? c = Me : (console.error(
      "Unknown integration:",
      d,
      "- falling back to PP"
    ), d = "pp", c = pe);
    const { allergens: h, ...u } = this._userConfig, g = {
      ...c,
      ...u,
      integration: d
      // Use the normalized integration value
    };
    if (this._integrationExplicit && Array.isArray(h) && h.length > 0 ? (this.debug && console.debug(
      "[Card] Explicit integration (",
      d,
      "); using user-defined allergens:",
      h
    ), g.allergens = h) : (this.debug && console.debug(
      "[Card] Using stub allergens for integration:",
      d
    ), d === "pp" ? g.allergens = pe.allergens : d === "peu" ? g.allergens = Te.allergens : d === "dwd" ? g.allergens = Ae.allergens : d === "silam" ? g.allergens = $e.allergens : d === "kleenex" && (g.allergens = Me.allergens)), !g.hasOwnProperty("date_locale")) {
      const w = Pe(i, null), b = ((m = (p = this._hass) == null ? void 0 : p.locale) == null ? void 0 : m.language) || ((v = this._hass) == null ? void 0 : v.language) || `${w}-${w.toUpperCase()}`;
      g.date_locale = b, this.debug && console.debug("[Card] auto-filling date_locale:", g.date_locale);
    }
    if (d === "dwd" && g.region_id !== "manual" && !g.region_id && n.length)
      g.region_id = Array.from(
        new Set(n.map((w) => w.split("_").pop()))
      ).sort((w, b) => Number(w) - Number(b))[0], this.debug && console.debug("[Card] Auto-set region_id:", g.region_id);
    else if (d === "pp" && g.city !== "manual" && !g.city && r.length)
      g.city = r[0].slice(14).replace(/_[^_]+$/, ""), this.debug && console.debug("[Card] Auto-set city:", g.city);
    else if (d === "peu" && g.location !== "manual" && !g.location && a.length) {
      const w = Array.from(
        new Set(
          a.map((b) => {
            var M;
            return (((M = i.states[b]) == null ? void 0 : M.attributes) || {}).location_slug || null;
          }).filter(Boolean)
        )
      );
      g.location = w[0] || null, this.debug && console.debug(
        "[Card][PEU] Auto-set location (location_slug):",
        g.location,
        w
      );
    } else if (d === "silam" && g.location !== "manual" && !g.location && o.length) {
      const w = Array.from(
        new Set(
          o.map((b) => {
            const A = b.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
            return A ? A[1] : null;
          }).filter(Boolean)
        )
      );
      g.location = w[0] || null, this.debug && console.debug(
        "[Card][SILAM] Auto-set location (location):",
        g.location,
        w
      );
    } else if (d === "kleenex" && g.location !== "manual" && !g.location && l.length) {
      const w = Object.keys(i.states).filter(
        (A) => typeof A == "string" && A.match(/^sensor\.kleenex_pollen_radar_.+_date$/)
      ), b = Array.from(
        new Set(
          w.map((A) => {
            const M = A.match(/^sensor\.kleenex_pollen_radar_(.+)_date$/);
            return M ? M[1] : null;
          }).filter(Boolean)
        )
      );
      g.location = b[0] || null, this.debug && console.debug(
        "[Card][KLEENEX] Auto-set location:",
        g.location,
        b
      );
    }
    if (this.config = g, this.tapAction = g.tap_action || this.tapAction || null, this.debug && (console.debug("[Card][Debug] Aktiv integration:", d), console.debug("[Card][Debug] Allergens i config:", g.allergens)), g.title === "false" || g.title === !1 || typeof g.title == "string" && g.title.trim() === "")
      this.header = "";
    else if (typeof g.title == "string" && g.title.trim() !== "" && g.title !== "true")
      this.header = g.title;
    else {
      let w = "";
      if (d === "dwd")
        w = g.region_id && g.region_id !== "manual" ? ha[g.region_id] || g.region_id : "";
      else if (d === "peu") {
        const b = Object.values(i.states).filter(
          (y) => y && typeof y == "object" && typeof y.entity_id == "string" && y.entity_id.startsWith("sensor.polleninformation_")
        ), A = g.location && g.location !== "manual" ? ze(g.location) : "";
        let M = "", P = null;
        if (A)
          P = b.find((y) => {
            const S = (y.attributes || {}).location_slug || y.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
            return ze(S) === A;
          });
        else {
          const y = Array.from(
            new Set(
              b.map((L) => {
                const T = (L.attributes || {}).location_slug || L.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
                return ze(T);
              })
            )
          );
          y.length === 1 && (P = b.find((L) => {
            const T = (L.attributes || {}).location_slug || L.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
            return ze(T) === y[0];
          }));
        }
        if (P) {
          const y = P.attributes || {};
          M = y.location_title || ((C = (E = y.friendly_name) == null ? void 0 : E.match(/\((.*?)\)/)) == null ? void 0 : C[1]) || "";
        }
        w = A ? M || g.location || "" : M;
      } else if (d === "silam") {
        const b = [
          "alder",
          "birch",
          "grass",
          "hazel",
          "mugwort",
          "olive",
          "ragweed"
        ], A = new Set(
          Object.values(le.mapping).flatMap(
            (S) => Object.entries(S).filter(
              ([T, D]) => b.includes(D)
            ).map(([T]) => T)
          )
        ), M = Object.values(i.states).filter((S) => {
          if (!S || typeof S != "object" || typeof S.entity_id != "string" || !S.entity_id.startsWith("sensor.silam_pollen_"))
            return !1;
          const T = S.entity_id.match(
            /^sensor\.silam_pollen_(.*)_([^_]+)$/
          );
          if (!T) return !1;
          const D = T[2];
          return A.has(D);
        }), P = g.location && g.location !== "manual" ? ze(g.location) : "", y = P ? M.find((S) => {
          const D = S.entity_id.replace("sensor.silam_pollen_", "").replace(/_[^_]+$/, "").replace(/^[-\s]+/, "");
          return ze(D) === P;
        }) : null;
        let L = "";
        if (y) {
          const S = y.attributes;
          L = S.location_title || ((x = S.friendly_name) == null ? void 0 : x.replace(/^SILAM Pollen\s*-?\s*/i, "").replace(new RegExp("\\s+\\p{L}+$", "u"), "").trim()) || g.location, L = L.replace(/^[-\s]+/, "");
        }
        w = P ? L || g.location || "" : L;
      } else if (d === "kleenex") {
        const b = Object.values(i.states).filter((y) => !y || typeof y != "object" || typeof y.entity_id != "string" || !y.entity_id.startsWith("sensor.kleenex_pollen_radar_") ? !1 : y.entity_id.match(/^sensor\.kleenex_pollen_radar_.+_.+$/)), A = g.location && g.location !== "manual" ? ze(g.location) : "";
        let M = null;
        if (g.location === "manual") {
          let y = g.entity_prefix || "";
          y.startsWith("sensor.") && (y = y.substring(7)), y && !y.endsWith("_") && (y = y + "_"), y && (M = b.find(
            (L) => L.entity_id.startsWith(`sensor.${y}`)
          ));
        } else A ? M = b.find((y) => y.entity_id.replace(
          "sensor.kleenex_pollen_radar_",
          ""
        ).replace(/_[^_]+$/, "") === A) : M = b[0];
        let P = "";
        if (M) {
          const y = M.attributes;
          P = y.location_name || ((k = y.friendly_name) == null ? void 0 : k.replace(/^Kleenex Pollen Radar\s*[\(\-]?\s*/i, "").replace(/[\)\s]+\w+.*$/u, "").trim()) || g.location;
        }
        w = P || g.location || "";
      } else {
        const b = (A) => rr.find((M) => ze(M) === A) || A;
        if (g.city && g.city !== "manual")
          w = b(g.city);
        else {
          const A = Object.keys(i.states).filter(
            (P) => /^sensor\.pollen_(.+)_[^_]+$/.test(P)
          ), M = Array.from(
            new Set(
              A.map(
                (P) => P.replace("sensor.pollen_", "").replace(/_[^_]+$/, "")
              )
            )
          );
          M.length === 1 ? w = b(M[0]) : w = "";
        }
      }
      this.header = w ? `${this._t("card.header_prefix")} ${w}` : this._t("card.header_prefix"), this.debug && console.debug("[Card] header set to:", this.header);
    }
    const _ = Ro[g.integration] || js;
    let f = null;
    if (g.integration === "silam") {
      if (!this._forecastEvent) {
        this.debug && console.debug(
          "[Card] Forecast mode: väntar på forecast-event innan fetch."
        );
        return;
      }
      if (!this._forecastEvent) {
        this.sensors = [], this.days_to_show = 0, this.displayCols = [], this.debug && console.debug(
          "[Card] Forecast mode: forecast-event saknas, nollställer sensordata och visar laddar..."
        ), this.requestUpdate();
        return;
      }
      f = _.fetchForecast(i, g, this._forecastEvent);
    } else
      f = _.fetchForecast(i, g);
    if (f)
      return this._isLoaded = !1, f.then((w) => {
        this.debug && (console.debug("[Card][Debug] Sensors före filtrering:", w), console.debug(
          `[Card][Debug] Adapter returned ${w.length} sensors:`,
          w.map((S) => {
            var T, D, R;
            return {
              allergen: S.allergenReplaced,
              entity_id: S.entity_id,
              has_days: !!S.days,
              days_length: (T = S.days) == null ? void 0 : T.length,
              day0_state: (D = S.day0) == null ? void 0 : D.state,
              day0_value: (R = S.day0) == null ? void 0 : R.value
            };
          })
        ), console.debug(
          "[Card][Debug] Förväntade allergener från config:",
          g.allergens
        )), this.debug && (console.debug("[Card] Användaren har valt city:", g.city), console.debug(
          "[Card] Användaren har valt allergener:",
          g.allergens
        ), console.debug("[Card] Användaren har valt plats:", g.location));
        const b = un(g, i, this.debug), A = b.length;
        let M = {};
        if (g.integration === "silam") {
          const S = Object.keys(i.states).filter((T) => {
            const D = T.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
            return D && D[1] === (g.location || "");
          });
          for (const T of S) {
            const D = T.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
            if (!D) continue;
            const R = D[2];
            let $ = !1;
            for (const [N, z] of Object.entries(
              le.mapping
            ))
              if (z[R]) {
                M[z[R]] = R, $ = !0;
                break;
              }
            !$ && this.debug && console.debug(
              `[Card][SILAM] Hittade ingen mapping för haSlug: '${R}'`
            );
          }
          this.debug && console.debug(
            "[Card][SILAM] silamReverse byggd baserat på existerande sensors:",
            M
          );
        }
        let P = w.filter((S) => {
          if (g.integration === "silam" && M && (!g.mode || g.mode === "daily")) {
            const T = g.location || "", D = M[S.allergenReplaced] || S.allergenReplaced, R = `sensor.silam_pollen_${T}_${D}`;
            return this.debug && console.debug(
              `[Card][Debug][SILAM filter] allergenReplaced: '${S.allergenReplaced}', key: '${D}', id: '${R}', available: ${b.includes(R)}`
            ), b.includes(R);
          }
          return !0;
        });
        if (Array.isArray(g.allergens) && g.allergens.length > 0 && g.integration !== "silam") {
          let S, T;
          d === "dwd" ? (S = new Set(g.allergens.map((D) => oi(D))), T = (D) => oi(D.allergenReplaced || "")) : (this.debug && console.debug(
            "[Card][Debug] Använder normalisering för allergener:",
            g.allergens
          ), S = new Set(g.allergens.map((D) => Re(D))), T = (D) => Re(D.allergenReplaced || "")), P = P.filter((D) => {
            const R = T(D), $ = S.has(R);
            return !$ && this.debug && console.debug(
              `[Card][Debug] Sensor '${R}' är EJ tillåten (ej i allowed)`,
              D
            ), $;
          });
        }
        if (this.debug && console.debug(
          `[Card][Debug] After filtering: ${P.length} sensors remain:`,
          P.map((S) => {
            var T, D;
            return {
              allergen: S.allergenReplaced,
              entity_id: S.entity_id,
              has_days: !!S.days,
              days_length: (T = S.days) == null ? void 0 : T.length,
              day0_state: (D = S.day0) == null ? void 0 : D.state
            };
          })
        ), this._integrationExplicit && !!g.location && A === 0) {
          this._explicitLocationNoSensors = !0, this._updateSensorsAndColumns([], [], g), this.debug && console.warn(
            `[Card] Ingen sensor hittad för explicit vald plats: '${g.location}'`
          );
          return;
        } else
          this._explicitLocationNoSensors = !1, this._updateSensorsAndColumns(P, b, g);
      }).catch((w) => {
        console.error("[Card] Error fetching pollen forecast:", w), this.debug && console.debug("[Card] fetchForecast error:", w), this._isLoaded = !0, this.requestUpdate();
      });
  }
  _renderNoAllergensHtml() {
    return Number(this.config.icon_size) > 0 && Number(this.config.icon_size), F`
      ${this.header ? F`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="no-allergens-container">
          ${this._renderAllergenSvg("no_allergens", 0)}
          <span class="no-allergens-text">${this._t("card.no_allergens")}</span>
        </div>
      </div>
    `;
  }
  _renderMinimalHtml() {
    var s, r;
    const i = ((s = this.config) == null ? void 0 : s.text_size_ratio) ?? 1;
    return F`
      ${this.header ? F`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div
          class="flex-container"
          style="gap: ${((r = this.config) == null ? void 0 : r.minimal_gap) ?? 35}px;"
        >
          ${(this.sensors || []).map((n) => {
      var c, h, u, g, _, f, p, m, v, E, C;
      const a = ((c = n.day0) == null ? void 0 : c.state_text) ?? "", o = ((h = n.day0) == null ? void 0 : h.display_state) ?? ((u = n.day0) == null ? void 0 : u.state) ?? "";
      let l = "";
      (g = this.config) != null && g.show_text_allergen && (l += (_ = this.config) != null && _.allergens_abbreviated ? n.allergenShort ?? "" : n.allergenCapitalized ?? ""), (f = this.config) != null && f.show_value_text && ((p = this.config) != null && p.show_value_numeric) ? (l && (l += ": "), l += `${a} (${o})`) : (m = this.config) != null && m.show_value_text ? (l && (l += ": "), l += a) : (v = this.config) != null && v.show_value_numeric && (l && (l += " "), l += `(${o})`);
      const d = ((E = n.day0) == null ? void 0 : E.display_state) ?? ((C = n.day0) == null ? void 0 : C.state) ?? 0;
      return F`
              <div class="sensor minimal">
                ${this._renderAllergenSvg(
        this._getSvgKey(n.allergenReplaced),
        d,
        {
          clickable: this.config.link_to_sensors !== !1 && n.entity_id,
          onClick: (x) => {
            this.config.link_to_sensors !== !1 && n.entity_id && (x.stopPropagation(), this._openEntity(n.entity_id));
          }
        }
      )}
                ${l ? F`<span
                      class="short-text"
                      style="font-size: ${1 * i}em;"
                      >${l}</span
                    >` : ""}
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
  _renderNormalHtml() {
    var p, m;
    if (!this.sensors || this.sensors.length === 0)
      return this.debug && (console.debug(
        "[Card] _renderNormalHtml: no sensors available, returning empty"
      ), console.debug(
        `[Card] _renderNormalHtml: sensors=${!!this.sensors}, length=${(p = this.sensors) == null ? void 0 : p.length}`
      )), F``;
    const i = this.sensors.filter(
      (v) => v.days && v.days.length > 0
    );
    if (i.length === 0)
      return this.debug && (console.debug(
        "[Card] _renderNormalHtml: no sensors have days arrays, returning empty"
      ), console.debug(
        `[Card] _renderNormalHtml: sensors with days=${i.length}, total sensors=${this.sensors.length}`
      ), this.sensors.forEach((v, E) => {
        var C, x;
        console.debug(
          `[Card] _renderNormalHtml: sensor[${E}] ${v.allergenReplaced}: has_days=${!!v.days}, days_length=${(C = v.days) == null ? void 0 : C.length}, day0_state=${(x = v.day0) == null ? void 0 : x.state}`
        );
      })), F``;
    this.debug && console.debug(
      `[Card] _renderNormalHtml: rendering ${this.sensors.length} sensors, ${i.length} with days`
    );
    const s = ((m = this.config) == null ? void 0 : m.text_size_ratio) ?? 1, r = !!this.config.days_boldfaced, n = this.displayCols, a = this.config.integration === "peu" || this.config.integration === "kleenex" ? 4 : 6, o = [];
    for (let v = 0; v < a; v++)
      o.push(this._levelColorForLevel(v + 1));
    const l = o, d = this.config.levels_empty_color ?? "var(--divider-color)", c = this._getGapColor(), h = this.config.levels_thickness ?? 60, u = this.config.levels_gap ?? 5, g = Number(this.config.icon_size) || 48, _ = Number(this.config.levels_icon_ratio) || 1, f = Math.min(100, Math.max(1, g * _));
    return this.debug && console.debug("Display columns:", n), F`
      ${this.header ? F`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="forecast-content">
          <table class="forecast"">
            <colgroup>
              ${[0, ...n].map(
      () => F`<col style="width: ${100 / (n.length + 1)}%;" />`
    )}
            </colgroup>
            <thead>
              <tr>
                <th></th>
                ${n.map(
      (v) => {
        var E, C, x, k, w, b, A, M;
        return F`
                    <th
                      style="font-weight: ${r ? "bold" : "normal"}; text-align: center;"
                    >
                      <div
                        style="display: flex; flex-direction: column; align-items: center;"
                      >
                        <span
                          class="day-header"
                          style="font-size: ${1 * s}em;"
                        >
                          ${((k = (x = (C = (E = this.sensors) == null ? void 0 : E[0]) == null ? void 0 : C.days) == null ? void 0 : x[v]) == null ? void 0 : k.day) || ""}
                        </span>
                        ${this.config.mode === "twice_daily" && ((M = (A = (b = (w = this.sensors) == null ? void 0 : w[0]) == null ? void 0 : b.days) == null ? void 0 : A[v]) != null && M.icon) ? F`<ha-icon
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
            ${this.sensors.map(
      (v) => {
        var E, C;
        return F`
                <!-- Rad 1: bara ikoner -->
                <tr class="allergen-icon-row" valign="top">
                  <td>
                    ${this._renderAllergenSvg(
          this._getSvgKey(v.allergenReplaced),
          ((E = v.days[0]) == null ? void 0 : E.display_state) ?? ((C = v.days[0]) == null ? void 0 : C.state) ?? 0,
          {
            clickable: this.config.link_to_sensors !== !1 && v.entity_id,
            onClick: (x) => {
              this.config.link_to_sensors !== !1 && v.entity_id && (x.stopPropagation(), this._openEntity(v.entity_id));
            }
          }
        )}
                  </td>
                  ${n.map(
          (x) => F`
                      <td>
                        ${(() => {
            var A, M;
            const k = Number((A = v.days[x]) == null ? void 0 : A.state) || 0, w = Number(
              ((M = v.days[x]) == null ? void 0 : M.display_state) ?? k
            );
            let b = k;
            return this.config.integration === "dwd" ? b = k * 2 : (this.config.integration === "peu" || this.config.integration === "kleenex") && (b = k), this._renderLevelCircle(
              b,
              {
                colors: l,
                emptyColor: d,
                gapColor: c,
                thickness: h,
                gap: u,
                size: f
              },
              v.allergenReplaced,
              x,
              w,
              v.entity_id,
              this.config.link_to_sensors !== !1
            );
          })()}
                      </td>
                    `
        )}
                </tr>
                <!-- Rad 2: allergennamn + text/nummer under dagarna -->
                ${this.config.show_text_allergen || this.config.show_value_text || this.config.show_value_numeric ? F`
                      <tr class="allergen-text-row">
                        <td>
                          <span style="font-size: ${1 * s}em;">
                            ${this.config.show_text_allergen ? this.config.allergens_abbreviated ? v.allergenShort : v.allergenCapitalized : ""}
                          </span>
                        </td>
                        ${n.map((x) => {
          var A, M, P;
          const k = ((A = v.days[x]) == null ? void 0 : A.state_text) || "", w = ((M = v.days[x]) == null ? void 0 : M.display_state) ?? ((P = v.days[x]) == null ? void 0 : P.state);
          let b = "";
          return this.config.show_value_text && this.config.show_value_numeric ? b = `${k} (${w})` : this.config.show_value_text ? b = k : this.config.show_value_numeric && (b = String(w)), F`<td>
                            <span style="font-size: ${1 * s}em;"
                              >${b}</span
                            >
                          </td>`;
        })}
                      </tr>
                    ` : ""}
              `;
      }
    )}
          </table>
        </div>
      </div>
    `;
  }
  render() {
    var l, d;
    if (!this.config) return F``;
    if (!this._isLoaded && (!this.sensors || !this.sensors.length))
      return F`
        <ha-card>
          <div style="padding: 1em; text-align: center;">
            ${this._t("card.loading_forecast") || "Loading forecast..."}
          </div>
        </ha-card>
      `;
    if (this._isLoaded && (!this.sensors || !this.sensors.length)) {
      const c = `card.integration.${this.config.integration}`, h = this._t(c);
      let u = "";
      if (this._error)
        return u = this._t(this._error), F`
          <ha-card>
            <div class="card-error">${u} (${h})</div>
          </ha-card>
        `;
      if (this._availableSensorCount === 0)
        return u = this._t("card.error_no_sensors"), F`
          <ha-card>
            <div class="card-error">${u} (${h})</div>
          </ha-card>
        `;
      {
        const g = this._t("card.error_filtered_sensors");
        return this.debug && console.debug(`[PollenPrognosCard] ${g} (${h})`), F`
          <ha-card>
            ${this._renderNoAllergensHtml()}
          </ha-card>
        `;
      }
    }
    const i = this.config.minimal ? this._renderMinimalHtml() : this._renderNormalHtml(), s = this.config.tap_action || null, r = (d = (l = this.config.background_color) == null ? void 0 : l.trim) != null && d.call(l) ? `background-color: ${this.config.background_color.trim()};` : "", n = s && s.type && s.type !== "none" ? "pointer" : "auto", a = Number(this.config.icon_size) > 0 ? Number(this.config.icon_size) : 48, o = `
    ${r}
    cursor: ${n};
    --pollen-icon-size: ${a}px;
  `;
    return F`
      <ha-card
        style="${o}"
        @click="${s && s.type && s.type !== "none" ? this._handleTapAction : null}"
      >
        ${i}
      </ha-card>
    `;
  }
  getCardSize() {
    return this.sensors.length + 1;
  }
  _handleTapAction(i) {
    var n, a;
    if (!this.tapAction || !this._hass) return;
    (n = i.preventDefault) == null || n.call(i), (a = i.stopPropagation) == null || a.call(i);
    const s = this.tapAction.type || "more-info";
    let r = this.tapAction.entity || "sun.sun";
    switch (s) {
      case "more-info":
        this._fire("hass-more-info", { entityId: r });
        break;
      case "navigate":
        this.tapAction.navigation_path && window.history.pushState(null, "", this.tapAction.navigation_path);
        break;
      case "call-service":
        if (this.tapAction.service && typeof this.tapAction.service == "string") {
          const [o, l] = this.tapAction.service.split(".");
          this._hass.callService(
            o,
            l,
            this.tapAction.service_data || {}
          );
        }
        break;
    }
  }
  _fire(i, s, r) {
    const n = new Event(i, {
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      ...r
    });
    return n.detail = s, this.dispatchEvent(n), n;
  }
  static get styles() {
    return No`
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
    `;
  }
}
customElements.define("pollenprognos-card", Xf);
const qt = (t, e) => {
  const i = { ...t };
  for (const s of Object.keys(e)) {
    const r = e[s];
    r !== null && typeof r == "object" && !Array.isArray(r) && typeof t[s] == "object" && t[s] !== null ? i[s] = qt(t[s], r) : i[s] = r;
  }
  return i;
}, Gs = (t) => t === "dwd" ? Ae : t === "peu" ? Te : t === "silam" ? $e : t === "kleenex" ? Me : pe;
class qf extends Ct {
  get debug() {
    var e;
    return !!((e = this._config) != null && e.debug);
  }
  _hasSilamWeatherEntity(e) {
    var a, o;
    if (!this._hass || !this._hass.states || typeof this._hass.states != "object")
      return !1;
    if (!e) {
      const l = Object.keys(this._hass.states).filter(
        (d) => typeof d == "string" && d.startsWith("weather.silam_pollen_")
      ).map(
        (d) => d.replace(/^weather\.silam_pollen_/, "").replace(/_.+$/, "")
      ).filter((d, c, h) => h.indexOf(d) === c).sort();
      return this.debug && console.debug(
        "[Editor] _hasSilamWeatherEntity: found locations:",
        l
      ), l.length > 0 ? (this.debug && console.debug(
        "[Editor] _hasSilamWeatherEntity: using fallback location",
        l[0]
      ), !0) : (this.debug && console.debug("[Editor] _hasSilamWeatherEntity: no candidates"), !1);
    }
    const i = Pe(this._hass), s = ((a = le.weather_suffixes) == null ? void 0 : a[i]) || ((o = le.weather_suffixes) == null ? void 0 : o.en) || [], r = e.toLowerCase();
    for (const l of s)
      if (`weather.silam_pollen_${r}_${l}` in this._hass.states) return !0;
    const n = `weather.silam_pollen_${r}_`;
    return Object.keys(this._hass.states).some(
      (l) => typeof l == "string" && l.startsWith(n)
    );
  }
  _resetAll() {
    var i;
    this.debug && console.debug("[Editor] resetAll"), this._userConfig = {};
    const e = ((i = this._config) == null ? void 0 : i.integration) ?? "pp";
    this.setConfig({ integration: e, type: "custom:pollenprognos-card" });
  }
  _resetPhrases(e) {
    this.debug && console.debug("[Editor] resetPhrases – lang:", e), this._updateConfig("date_locale", e);
    const i = this._config.integration === "dwd" ? Ae.allergens : this._config.integration === "peu" ? Ut : this._config.integration === "silam" ? ir : this._config.integration === "kleenex" ? Me.allergens : pe.allergens, s = {}, r = {};
    i.forEach((d) => {
      const c = Re(d), h = ke[c] || c, u = c === "index" ? "index" : h;
      s[d] = Z(`editor.phrases_full.${u}`, e), r[d] = Z(`editor.phrases_short.${u}`, e);
    });
    const n = this._config.integration === "dwd" ? 4 : this._config.integration === "peu" ? 5 : (this._config.integration === "silam", 7), a = Array.from(
      { length: n },
      (d, c) => Z(`editor.phrases_levels.${c}`, e)
    ), o = {
      0: Z("editor.phrases_days.0", e),
      1: Z("editor.phrases_days.1", e),
      2: Z("editor.phrases_days.2", e)
    }, l = Z("editor.no_information", e);
    this._updateConfig("phrases", {
      full: s,
      short: r,
      levels: a,
      days: o,
      no_information: l
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
    return Pe(this._hass);
  }
  _t(e) {
    return Z(`editor.${e}`, this._lang);
  }
  constructor() {
    super(), this.debug && console.log("[ALLERGEN-DEBUG] ========== Constructor called =========="), this._userConfig = {}, this._integrationExplicit = !1, this._thresholdExplicit = !1, this._config = {}, this.installedCities = [], this.installedPeuLocations = [], this.installedSilamLocations = [], this.installedKleenexLocations = [], this._prevIntegration = void 0, this.installedRegionIds = [], this._initDone = !1, this._selectedPhraseLang = Pe(), this._allergensExplicit = !1, this._origAllergensSet = !1, this._userAllergens = null, this._tapType = "none", this._tapEntity = "", this._tapNavigation = "", this._tapService = "", this._tapServiceData = "", this.debug && console.log("[ALLERGEN-DEBUG] Constructor complete - _allergensExplicit:", this._allergensExplicit);
  }
  setConfig(e) {
    var i, s, r;
    try {
      this.debug && console.log("[ALLERGEN-DEBUG] ========== setConfig() called =========="), this.debug && console.log("[ALLERGEN-DEBUG] Incoming config.allergens:", e.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Current _userConfig.allergens:", (i = this._userConfig) == null ? void 0 : i.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Current _allergensExplicit:", this._allergensExplicit), this.debug && console.debug("[Editor] ▶️ setConfig INCOMING:", e), e.phrases && (this._userConfig.phrases = e.phrases), this._selectedPhraseLang = Pe(this._hass, e.date_locale);
      const a = Gs(e.integration || "pp").allergens, o = { ...e };
      this.debug && console.log("[ALLERGEN-DEBUG] Stub allergens for integration:", e.integration || "pp", a), Object.entries(U).forEach(([m, v]) => {
        m in o || (o[m] = v);
      }), this.debug && console.log("[ALLERGEN-DEBUG] Checking if allergens differ from stub..."), this.debug && console.log("[ALLERGEN-DEBUG] config.allergens is array:", Array.isArray(e.allergens)), this.debug && console.log("[ALLERGEN-DEBUG] deepEqual result:", we(e.allergens, a)), this.debug && console.log("[ALLERGEN-DEBUG] _allergensExplicit was:", this._allergensExplicit), Array.isArray(e.allergens) && (!we(e.allergens, a) || this._allergensExplicit) ? (this._userConfig.allergens = [...e.allergens], this._allergensExplicit = !0, this.debug && console.log("[ALLERGEN-DEBUG] ✓ Saved user-chosen allergens to _userConfig:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] ✓ Set _allergensExplicit = true"), this.debug && console.debug(
        "[Editor] saved user-chosen allergens:",
        this._userConfig.allergens
      )) : this.debug && console.log("[ALLERGEN-DEBUG] ✗ Allergens match stub AND not explicit, NOT saving");
      const l = (o.integration === "dwd" ? Ae : o.integration === "peu" ? Te : o.integration === "silam" ? $e : pe).pollen_threshold;
      o.hasOwnProperty("pollen_threshold") && !this._thresholdExplicit && o.pollen_threshold === l && (this.debug && console.debug(
        "[Editor] dropping incoming stub-threshold (matches stub):",
        l
      ), delete o.pollen_threshold);
      const d = e.integration;
      this._prevIntegration !== void 0 && d !== this._prevIntegration && (delete this._userConfig.allergens, this._allergensExplicit = !1, this.debug && console.debug("[Editor] integration changed → wipe allergens")), !this._integrationExplicit && o.integration === pe.integration && (this.debug && console.debug("[Editor] dropped stub integration"), delete o.integration), !this._daysExplicit && o.days_to_show === pe.days_to_show && (this.debug && console.debug("[Editor] dropped stub days_to_show"), delete o.days_to_show);
      const c = (o.integration === "dwd" ? Ae : o.integration === "peu" ? Te : o.integration === "silam" ? $e : pe).date_locale;
      if (!this._localeExplicit && o.date_locale === c && (this.debug && console.debug("[Editor] dropped stub date_locale"), delete o.date_locale), this.debug && console.log("[ALLERGEN-DEBUG] Checking whether to drop incoming allergens..."), this.debug && console.log("[ALLERGEN-DEBUG] _userConfig.allergens exists:", !!this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] incoming.allergens exists:", !!o.allergens), this.debug && console.log("[ALLERGEN-DEBUG] _allergensExplicit:", this._allergensExplicit), this._userConfig.allergens && o.allergens && we(o.allergens, this._userConfig.allergens))
        this.debug && console.log("[ALLERGEN-DEBUG] → Dropping incoming (same as saved)"), this.debug && console.debug(
          "[Editor] dropping incoming allergens (same as saved)"
        ), delete o.allergens;
      else if (this._allergensExplicit && o.allergens) {
        const m = Gs(
          o.integration || this._config.integration || "pp"
        ).allergens;
        this.debug && console.log("[ALLERGEN-DEBUG] Checking if incoming matches stub..."), this.debug && console.log("[ALLERGEN-DEBUG] incoming.allergens:", o.allergens), this.debug && console.log("[ALLERGEN-DEBUG] stubAllergens:", m), this.debug && console.log("[ALLERGEN-DEBUG] deepEqual:", we(o.allergens, m)), we(o.allergens, m) ? (this.debug && console.log("[ALLERGEN-DEBUG] → Dropping incoming (matches stub, keeping explicit)"), this.debug && console.debug(
          "[Editor] dropping incoming allergens (matches stub, keeping explicit)"
        ), delete o.allergens) : this.debug && console.log("[ALLERGEN-DEBUG] → Keeping incoming (different from stub)");
      } else
        this.debug && console.log("[ALLERGEN-DEBUG] → No action taken on incoming allergens");
      this.debug && console.log("[ALLERGEN-DEBUG] Before merge - _userConfig.allergens:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Before merge - incoming.allergens:", o.allergens), this._userConfig = qt(this._userConfig, o), this.debug && console.log("[ALLERGEN-DEBUG] After merge - _userConfig.allergens:", this._userConfig.allergens), this._thresholdExplicit = this._userConfig.hasOwnProperty("pollen_threshold"), this._allergensExplicit = this._userConfig.hasOwnProperty("allergens"), this._integrationExplicit = this._userConfig.hasOwnProperty("integration"), this.debug && console.log("[ALLERGEN-DEBUG] After setting flags - _allergensExplicit:", this._allergensExplicit), this._daysExplicit = this._userConfig.hasOwnProperty("days_to_show"), this._localeExplicit = this._userConfig.hasOwnProperty("date_locale");
      let h = this._userConfig.integration !== void 0 ? this._userConfig.integration : this._config.integration;
      if (!this._integrationExplicit && this._hass) {
        const m = Object.keys(this._hass.states);
        m.some(
          (v) => typeof v == "string" && v.startsWith("sensor.pollen_")
        ) ? h = "pp" : m.some(
          (v) => typeof v == "string" && v.startsWith("sensor.polleninformation_")
        ) ? h = "peu" : m.some(
          (v) => typeof v == "string" && v.startsWith("sensor.pollenflug_")
        ) ? h = "dwd" : m.some(
          (v) => typeof v == "string" && v.startsWith("sensor.silam_pollen_")
        ) ? h = "silam" : m.some(
          (v) => typeof v == "string" && v.startsWith("sensor.kleenex_pollen_radar_")
        ) && (h = "kleenex"), this._userConfig.integration = h, this.debug && console.debug("[Editor] auto-detected integration:", h);
      }
      (h === "silam" || h === "peu") && !this._userConfig.mode && (this._userConfig.mode = "daily");
      const u = Gs(h);
      let g = qt(u, this._userConfig);
      if (Object.entries(U).forEach(([m, v]) => {
        m in g || (g[m] = v);
      }), Object.entries(U).forEach(([m, v]) => {
        g[m] === v && delete g[m];
      }), this._userConfig.hasOwnProperty("pollen_threshold") || (g.pollen_threshold = u.pollen_threshold, this.debug && console.debug(
        "[Editor] reset pollen_threshold to stub:",
        u.pollen_threshold
      )), this.debug && console.log("[ALLERGEN-DEBUG] Final allergen assignment:"), this.debug && console.log("[ALLERGEN-DEBUG] _userConfig.allergens:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] baseStub.allergens:", u.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Using:", Array.isArray(this._userConfig.allergens) ? "_userConfig" : "baseStub"), g.allergens = Array.isArray(this._userConfig.allergens) ? this._userConfig.allergens : u.allergens, g.integration = h, g.type = "custom:pollenprognos-card", this._config = g, this._prevIntegration = h, this.debug && console.log("[ALLERGEN-DEBUG] Final _config.allergens:", this._config.allergens), this.debug && console.log("[ALLERGEN-DEBUG] ========== setConfig() complete =========="), this.debug && console.debug(
        "[Editor][F] slutgiltigt this._config.allergens:",
        this._config.allergens
      ), this._daysExplicit || (this._config.days_to_show = u.days_to_show, this.debug && console.debug(
        "[Editor] reset days_to_show to stub:",
        u.days_to_show
      )), !this._localeExplicit) {
        const m = Pe(this._hass, null), v = ((r = (s = this._hass) == null ? void 0 : s.locale) == null ? void 0 : r.language) || `${m}-${m.toUpperCase()}`;
        this._config.date_locale = v, this.debug && console.debug(
          "[Editor] autofilled date_locale:",
          v,
          "(HA language was:",
          m,
          ")"
        );
      }
      if (this._initDone = !1, this._hass) {
        const m = Object.keys(this._hass.states);
        this.installedRegionIds = Array.from(
          new Set(
            m.filter(
              (E) => typeof E == "string" && E.startsWith("sensor.pollenflug_")
            ).map((E) => E.split("_").pop())
          )
        ).sort((E, C) => Number(E) - Number(C));
        const v = new Set(
          m.filter(
            (E) => typeof E == "string" && E.startsWith("sensor.pollen_") && !E.startsWith("sensor.pollenflug_")
          ).map(
            (E) => E.slice(14).replace(/_[^_]+$/, "")
          )
        );
        this.installedCities = rr.filter(
          (E) => v.has(
            E.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[-\s]/g, "_")
          )
        ).sort();
      }
      this._integrationExplicit || (h === "dwd" && !this._userConfig.region_id && this.installedRegionIds.length && (this._config.region_id = this.installedRegionIds[0]), h === "pp" && !this._userConfig.city && this.installedCities.length && (this._config.city = this.installedCities[0]), h === "silam" && !this._userConfig.location && this.installedLocations.length && (this._config.location = this.installedLocations[0])), this.debug && console.debug("[Editor] färdig _config innan dispatch:", this._config), this._config.tap_action ? (this._tapType = this._config.tap_action.type || "more-info", this._tapEntity = this._config.tap_action.entity || "", this._tapNavigation = this._config.tap_action.navigation_path || "", this._tapService = this._config.tap_action.service || "", this._tapServiceData = JSON.stringify(
        this._config.tap_action.service_data || {},
        null,
        2
      )) : (this._tapType = "none", this._tapEntity = "", this._tapNavigation = "", this._tapService = "", this._tapServiceData = "");
      const _ = this._config || {}, f = Object.keys(g).filter(
        (m) => !we(g[m], _[m])
      );
      !(f.length > 0 && f.every((m) => ua.includes(m))) && !we(_, g) ? (this._config = g, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-1-setConfig] Dispatching from setConfig() end"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", this._config.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._config },
          bubbles: !0,
          composed: !0
        })
      )) : this._config = g, this.requestUpdate(), this._prevIntegration = d, this._initDone = !0;
    } catch (n) {
      throw console.error("pollenprognos-card-editor: Fel i setConfig:", n, e), n;
    }
  }
  set hass(e) {
    var c, h, u, g, _, f, p, m, v, E, C;
    if (this.debug && console.log("[ALLERGEN-DEBUG] ========== set hass() called =========="), this.debug && console.log("[ALLERGEN-DEBUG] _initDone:", this._initDone), this.debug && console.log("[ALLERGEN-DEBUG] Current _userConfig.allergens:", (c = this._userConfig) == null ? void 0 : c.allergens), this._hass === e) return;
    this._hass = e;
    const i = this._integrationExplicit;
    this._initDone || (this._selectedPhraseLang = Pe(e, this._config.date_locale));
    const s = Object.keys(e.states).filter(
      (x) => typeof x == "string" && x.startsWith("sensor.pollen_") && !x.startsWith("sensor.pollenflug_")
    ), r = Object.keys(e.states).filter(
      (x) => typeof x == "string" && x.startsWith("sensor.pollenflug_")
    ), n = Object.keys(e.states).filter(
      (x) => typeof x == "string" && x.startsWith("sensor.polleninformation_")
    ), a = Object.keys(e.states).filter(
      (x) => typeof x == "string" && x.startsWith("sensor.silam_pollen_")
    );
    let o = this._userConfig.integration;
    i || (s.length ? o = "pp" : n.length ? o = "peu" : r.length ? o = "dwd" : a.length && (o = "silam"), this._userConfig.integration = o), (o === "silam" || o === "peu") && !this._userConfig.mode && (this._userConfig.mode = "daily");
    const l = o === "dwd" ? Ae : o === "peu" ? Te : o === "silam" ? $e : pe;
    this.debug && console.log("[ALLERGEN-DEBUG] set hass() building merged config"), this.debug && console.log("[ALLERGEN-DEBUG] base (stub) allergens:", (h = l.allergens) == null ? void 0 : h.slice(0, 5), "... (", (u = l.allergens) == null ? void 0 : u.length, "total)"), this.debug && console.log("[ALLERGEN-DEBUG] _userConfig.allergens:", (g = this._userConfig.allergens) == null ? void 0 : g.slice(0, 5), "... (", (_ = this._userConfig.allergens) == null ? void 0 : _.length, "total)");
    let d = qt(l, this._userConfig);
    if (this.debug && console.log("[ALLERGEN-DEBUG] After deepMerge - merged.allergens:", (f = d.allergens) == null ? void 0 : f.slice(0, 5), "... (", (p = d.allergens) == null ? void 0 : p.length, "total)"), this._userConfig.hasOwnProperty("pollen_threshold") || (d.pollen_threshold = l.pollen_threshold, this.debug && console.debug(
      "[Editor][hass] reset pollen_threshold to stub:",
      l.pollen_threshold
    )), d.sort = d.sort || "value_ascending", this.debug && console.log("[ALLERGEN-DEBUG] set hass() checking if config changed"), this.debug && console.log("[ALLERGEN-DEBUG] Current _config.allergens:", (m = this._config.allergens) == null ? void 0 : m.slice(0, 5), "... (", (v = this._config.allergens) == null ? void 0 : v.length, "total)"), this.debug && console.log("[ALLERGEN-DEBUG] New merged.allergens:", (E = d.allergens) == null ? void 0 : E.slice(0, 5), "... (", (C = d.allergens) == null ? void 0 : C.length, "total)"), this.debug && console.log("[ALLERGEN-DEBUG] deepEqual result:", we(this._config, d)), we(this._config, d))
      this.debug && console.log("[ALLERGEN-DEBUG] Config unchanged in set hass(), NOT dispatching"), this.debug && console.log("[ALLERGEN-DEBUG] ========== set hass() complete (no change) ==========");
    else {
      this._config = d, this.debug && console.log("[ALLERGEN-DEBUG] Config changed! Updated _config.allergens"), this.debug && console.log("[ALLERGEN-DEBUG] ========== set hass() complete (config changed) =========="), this.installedRegionIds = Array.from(
        new Set(r.map((b) => b.split("_").pop()))
      ).sort((b, A) => Number(b) - Number(A));
      const x = Array.from(
        new Set(
          s.map(
            (b) => b.slice(14).replace(/_[^_]+$/, "")
          )
        )
      );
      this.installedCities = rr.filter(
        (b) => x.includes(
          b.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[-\s]/g, "_")
        )
      ).sort((b, A) => b.localeCompare(A)), this.installedPeuLocations = Array.from(
        new Map(
          Object.values(e.states).filter(
            (b) => b && typeof b == "object" && typeof b.entity_id == "string" && b.entity_id.startsWith("sensor.polleninformation_")
          ).map((b) => {
            var P, y, L, S;
            const A = ((P = b.attributes) == null ? void 0 : P.location_slug) || b.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, ""), M = ((y = b.attributes) == null ? void 0 : y.location_title) || (typeof ((L = b.attributes) == null ? void 0 : L.friendly_name) == "string" ? (S = b.attributes.friendly_name.match(/\((.*?)\)/)) == null ? void 0 : S[1] : void 0) || A;
            return [A, M];
          })
        )
      ), this.config && this.config.date_locale && this.config.date_locale.slice(0, 2) || this._hass && this._hass.language;
      const k = [
        "allergy_risk",
        "alder",
        "birch",
        "grass",
        "hazel",
        "mugwort",
        "olive",
        "ragweed"
      ];
      if (this.debug) {
        console.debug("[SilamAllergenMap.mapping]", le.mapping), console.debug("[pollenAllergens]", k);
        for (const [A, M] of Object.entries(
          le.mapping
        ))
          for (const [P, y] of Object.entries(M))
            console.debug(`[Mapping] ${A}: ${P} → ${y}`);
        const b = Object.values(le.mapping).flatMap(
          (A) => Object.entries(A).filter(
            ([M, P]) => k.includes(P)
          ).map(([M]) => M)
        );
        console.debug("[SilamValidAllergenSlugs]", b);
      }
      const w = new Set(
        Object.values(le.mapping).flatMap(
          (b) => Object.entries(b).filter(
            ([A, M]) => k.includes(M)
          ).map(([A]) => A)
        )
      );
      this.installedSilamLocations = Array.from(
        new Map(
          Object.values(e.states).filter((b) => {
            if (!b || typeof b != "object" || typeof b.entity_id != "string" || !b.entity_id.startsWith("sensor.silam_pollen_"))
              return !1;
            const A = b.entity_id.match(
              /^sensor\.silam_pollen_(.*)_([^_]+)$/
            );
            if (!A)
              return this.debug && console.debug("[Filter] Skip (no match):", b.entity_id), !1;
            const M = A[1], P = A[2];
            return this.debug && console.debug(
              "[Filter] entity_id:",
              b.entity_id,
              "| rawLocation:",
              M,
              "| allergenSlug:",
              P,
              "| validAllergen:",
              w.has(P)
            ), w.has(P);
          }).map((b) => {
            var L, S;
            const A = typeof b.entity_id == "string" ? b.entity_id.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/) : null, M = A ? A[1].replace(/^[-\s]+/, "") : "", P = ze(M);
            let y = ((L = b.attributes) == null ? void 0 : L.location_title) || (typeof ((S = b.attributes) == null ? void 0 : S.friendly_name) == "string" ? b.attributes.friendly_name.replace(/^SILAM Pollen\s*-?\s*/i, "").replace(new RegExp("\\s+\\p{L}+$", "u"), "").trim() : "") || M;
            return y = y.replace(/^[-\s]+/, ""), y = y.charAt(0).toUpperCase() + y.slice(1), this.debug && console.debug(
              "[Map] entity_id:",
              b.entity_id,
              "| rawLocation:",
              M,
              "| slugified locationSlug:",
              P,
              "| title:",
              y
            ), [P, y];
          })
        )
      ), this.installedKleenexLocations = Array.from(
        new Map(
          Object.values(e.states).filter(
            (b) => b && typeof b == "object" && typeof b.entity_id == "string" && b.entity_id.startsWith("sensor.kleenex_pollen_radar_")
          ).map((b) => {
            var y;
            const A = b.entity_id.match(
              /^sensor\.kleenex_pollen_radar_(.*)_(?:tree|bomen|arbre|alber|grass|gras|graminee|graminace|weed|kruid|onkruid|herbacee|erbace)/
            );
            if (!A) return null;
            const M = A[1];
            let P = ((y = b.attributes) == null ? void 0 : y.friendly_name) || M;
            return P = P.replace(/^Kleenex Pollen Radar\s*[\(\-]?\s*/i, "").replace(/[\)\s]+(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Graminées|Herbacées|Alberi|Graminacee|Erbacee).*$/i, "").trim(), P || (P = M.charAt(0).toUpperCase() + M.slice(1)), [M, P];
          }).filter((b) => b !== null)
        )
      ), this._initDone || (o === "dwd" && !this._userConfig.region_id && this.installedRegionIds.length && (this._config.region_id = this.installedRegionIds[0]), o === "pp" && !this._userConfig.city && this.installedCities.length && (this._config.city = this.installedCities[0]), o === "silam" && !this._userConfig.location && this.installedSilamLocations.length && (this._config.location = this.installedSilamLocations[0][0]), o === "kleenex" && !this._userConfig.location && this.installedKleenexLocations.length && (this._config.location = this.installedKleenexLocations[0][0])), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._config },
          bubbles: !0,
          composed: !0
        })
      );
    }
    this.requestUpdate(), this._initDone = !0, this.debug && console.log("[ALLERGEN-DEBUG] set hass() final - _initDone set to true");
  }
  _onAllergenToggle(e, i) {
    this.debug && console.log("[ALLERGEN-DEBUG] ========== _onAllergenToggle called =========="), this.debug && console.log("[ALLERGEN-DEBUG] Allergen:", e, "Checked:", i), this.debug && console.log("[ALLERGEN-DEBUG] Current _config.allergens:", this._config.allergens), this._config.integration === "peu" && this._config.mode !== "daily" && e !== "allergy_risk" && i && this._updateConfig("mode", "daily");
    const s = new Set(this._config.allergens);
    i ? s.add(e) : s.delete(e), this.debug && console.log("[ALLERGEN-DEBUG] New allergen set:", [...s]), this._updateConfig("allergens", [...s]);
  }
  _toggleSelectAllAllergens(e) {
    const i = new Set(this._config.allergens), s = e.every((n) => i.has(n));
    this._config.integration === "peu" && this._config.mode !== "daily" && !s && this._updateConfig("mode", "daily");
    const r = s ? [] : e;
    this._updateConfig("allergens", [...r]);
  }
  _updateConfig(e, i) {
    if (this.debug && console.debug("[Editor] _updateConfig – prop:", e, "value:", i), e === "sort" && i === "none") {
      const n = { ...this._config, sort: i };
      this._config.integration === "kleenex" && this._config.sort_category_allergens_first && (n.sort_category_allergens_first = !1, delete this._userConfig.sort_category_allergens_first), this._config.integration === "peu" && this._config.allergy_risk_top && (n.allergy_risk_top = !1, delete this._userConfig.allergy_risk_top), this._config.integration === "silam" && this._config.index_top && (n.index_top = !1, delete this._userConfig.index_top), this._config = n, this._userConfig.sort = i, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-3-sort-none] Dispatching from sort=none handler"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", this._config.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "levels_inherit_mode") {
      if (i === "custom" && this._config.levels_inherit_mode !== "custom") {
        const n = {
          ...this._config,
          levels_inherit_mode: i,
          levels_gap: U.levels_gap,
          levels_colors: U.levels_colors,
          levels_empty_color: U.levels_empty_color,
          levels_gap_color: U.levels_gap_color
        };
        this._config = n, this._userConfig.levels_inherit_mode = i, delete this._userConfig.levels_gap, delete this._userConfig.levels_colors, delete this._userConfig.levels_empty_color, delete this._userConfig.levels_gap_color, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-4-levels-inherit-custom] Dispatching from levels_inherit_mode=custom"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", n.allergens), this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: n },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      } else if (i === "inherit_allergen" && this._config.levels_inherit_mode === "custom") {
        const n = this._config.allergen_stroke_width || U.allergen_stroke_width, a = Nt(n), l = (this._config.allergen_colors || U.allergen_colors)[0] || U.levels_empty_color, d = {
          ...this._config,
          levels_inherit_mode: i,
          levels_gap: a,
          levels_empty_color: l,
          allergen_levels_gap_synced: !0
          // Enable sync when switching to inherit mode
        };
        this._config = d, this._userConfig.levels_inherit_mode = i, this._userConfig.levels_gap = a, this._userConfig.levels_empty_color = l, this._userConfig.allergen_levels_gap_synced = !0, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-5-levels-inherit-sync] Dispatching from levels_inherit_mode!=custom"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", d.allergens), this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: d },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      }
    }
    if (e === "allergen_colors" && Array.isArray(i)) {
      const n = { ...this._config, allergen_colors: i };
      this._userConfig.allergen_colors = i, (this._config.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && i[0] && (n.levels_empty_color = i[0], this._userConfig.levels_empty_color = i[0]), this._config = n, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "allergen_stroke_width" && i === U.allergen_stroke_width) {
      const n = { ...this._config, allergen_stroke_width: i };
      if (this._userConfig.allergen_stroke_width = i, (this._config.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (this._config.allergen_levels_gap_synced ?? !0)) {
        const a = Nt(i);
        n.levels_gap = a, this._userConfig.levels_gap = a;
      }
      this._config = n, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-7-levels-stroke] Dispatching from levels_stroke_width change"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", n.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if ((e === "levels_thickness" || e === "levels_gap" || e === "levels_colors" || e === "levels_empty_color" || e === "levels_gap_color") && i === U[e]) {
      const n = { ...this._config, [e]: i };
      this._config = n, this._userConfig[e] = i, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-8-levels-visual] Dispatching from levels visual prop change"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", n.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "allergen_color_mode" && i === "default_colors" && this._config.allergen_color_mode === "custom") {
      const n = {
        ...this._config,
        allergen_color_mode: i,
        allergen_colors: U.allergen_colors,
        allergen_outline_color: U.levels_gap_color,
        no_allergens_color: U.no_allergens_color
      };
      this._config = n, this._userConfig.allergen_color_mode = i, delete this._userConfig.allergen_colors, delete this._userConfig.allergen_outline_color, delete this._userConfig.no_allergens_color, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-9-allergen-color-mode] Dispatching from allergen_color_mode change"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", n.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "date_locale") {
      const n = this._config.sort, a = this._config.mode;
      this._config = {
        ...this._config,
        date_locale: i,
        sort: "",
        mode: ""
      }, this.requestUpdate(), setTimeout(() => {
        this._config = {
          ...this._config,
          sort: n,
          mode: a
        }, this.requestUpdate(), this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-11-locale-reset] Dispatching from date_locale setTimeout restore"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", this._config.allergens), this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: !0,
            composed: !0
          })
        );
      }, 0);
      return;
    }
    const s = { ...this._userConfig };
    let r;
    if (e === "integration") {
      const n = i, a = this._config.integration;
      n !== a && (delete s.city, delete s.region_id, delete s.location, delete s.entity_prefix, delete s.entity_suffix, delete s.mode, delete s.allergens, delete s.days_to_show, delete s.pollen_threshold, delete s.allergy_risk_top, delete s.index_top, this._allergensExplicit = !1), r = qt(n === "dwd" ? Ae : n === "peu" ? Te : n === "silam" ? $e : n === "kleenex" ? Me : pe, s), r.integration = n;
    } else {
      if (r = { ...this._config, [e]: i }, e === "allergens" && (this.debug && console.log("[ALLERGEN-DEBUG] _updateConfig called with allergens:", i), this.debug && console.log("[ALLERGEN-DEBUG] Before update - _userConfig.allergens:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Before update - _allergensExplicit:", this._allergensExplicit), this._userConfig.allergens = i, this._allergensExplicit = !0, this.debug && console.log("[ALLERGEN-DEBUG] After update - _userConfig.allergens:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] After update - _allergensExplicit:", this._allergensExplicit), this.debug && console.debug(
        "[Editor] allergens explicitly changed:",
        this._userConfig.allergens
      )), ["city", "region_id", "location"].includes(e) && i !== "manual" && (r.entity_prefix = "", r.entity_suffix = ""), (this._config.integration === "silam" || this._config.integration === "peu") && e === "mode") {
        if (i !== "daily")
          r.days_to_show = 8, r.show_empty_days = !1, this._config.integration === "peu" && (r.allergens = ["allergy_risk"], this._userConfig.allergens = ["allergy_risk"], this._allergensExplicit = !0);
        else if (r.days_to_show = this._config.integration === "silam" ? 5 : 4, this._config.integration === "peu") {
          const n = this._config.allergens || [], a = n.length === 1 && n[0] === "allergy_risk";
          (!this._allergensExplicit || a) && (r.allergens = [...Ut], this._userConfig.allergens = [...Ut], this._allergensExplicit = !0);
        }
      }
      this._config.integration === "silam" && e === "location" && (this._hasSilamWeatherEntity(i) || (r.mode = "daily", r.days_to_show = 2));
    }
    r.type = this._config.type, we(this._config, r) ? (this._config = r, this.debug && console.log("[ALLERGEN-DEBUG] Config unchanged, NOT dispatching")) : (this._config = r, this.debug && console.debug("[Editor] updated _config:", this._config), this.debug && console.log("[ALLERGEN-DEBUG] Dispatching config-changed event"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens being dispatched:", this._config.allergens), this.dispatchEvent(
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
      ...U,
      ...this._config
    }, i = e.integration === "dwd" ? Ae.allergens : e.integration === "peu" ? Ut : e.integration === "silam" ? ir : e.integration === "kleenex" ? Me.allergens : pe.allergens, s = e.integration === "dwd" ? 4 : e.integration === "peu" ? 5 : 7, r = e.integration === "dwd" ? { min: 0, max: 3, step: 0.5 } : e.integration === "peu" ? { min: 0, max: 4, step: 1 } : { min: 0, max: 6, step: 1 }, a = [
      "value_ascending",
      "value_descending",
      "name_ascending",
      "name_descending",
      "none"
    ].map((o) => ({
      value: o,
      label: this._t(`sort_${o}`)
    }));
    return this.debug && (console.debug("Aktuellt språk (lang):", this._lang), console.debug("Sort label test:", this._t("sort_value_ascending"))), F`
      <div class="card-config">
        <!-- Återställ-knapp -->
        <ha-button outlined @click=${() => this._resetAll()}>
          ${this._t("preset_reset_all")}
        </ha-button>

        <!-- Integration & Location -->
        <details open>
          <summary>${this._t("summary_integration_and_place")}</summary>
          <ha-formfield label="${this._t("integration")}">
            <ha-select
              .value=${e.integration}
              @selected=${(o) => this._updateConfig("integration", o.target.value)}
              @closed=${(o) => o.stopPropagation()}
            >
              <mwc-list-item value="pp"
                >${this._t("integration.pp")}</mwc-list-item
              >
              <mwc-list-item value="peu"
                >${this._t("integration.peu")}</mwc-list-item
              >
              <mwc-list-item value="dwd"
                >${this._t("integration.dwd")}</mwc-list-item
              >
              <mwc-list-item value="silam"
                >${this._t("integration.silam")}</mwc-list-item
              >
              <mwc-list-item value="kleenex"
                >${this._t("integration.kleenex")}</mwc-list-item
              >
            </ha-select>
          </ha-formfield>
          ${e.integration === "pp" ? F`
                <ha-formfield label="${this._t("city")}">
                  <ha-select
                    .value=${e.city || ""}
                    @selected=${(o) => this._updateConfig("city", o.target.value)}
                    @closed=${(o) => o.stopPropagation()}
                  >
                    <mwc-list-item value=""
                      >${this._t("location_autodetect")}</mwc-list-item
                    >
                    ${this.installedCities.map(
      (o) => F`<mwc-list-item .value=${o}
                          >${o}</mwc-list-item
                        >`
    )}
                    <mwc-list-item value="manual"
                      >${this._t("location_manual")}</mwc-list-item
                    >
                  </ha-select>
                </ha-formfield>
              ` : e.integration === "peu" ? F`
                  <ha-formfield label="${this._t("location")}">
                    <ha-select
                      .value=${e.location || ""}
                      @selected=${(o) => this._updateConfig("location", o.target.value)}
                      @closed=${(o) => o.stopPropagation()}
                    >
                      <mwc-list-item value=""
                        >${this._t("location_autodetect")}</mwc-list-item
                      >
                      ${this.installedPeuLocations.map(
      ([o, l]) => F`<mwc-list-item .value=${o}
                            >${l}</mwc-list-item
                          >`
    )}
                      <mwc-list-item value="manual"
                        >${this._t("location_manual")}</mwc-list-item
                      >
                    </ha-select>
                  </ha-formfield>
                ` : e.integration === "silam" ? F`
                    <ha-formfield label="${this._t("location")}">
                      <ha-select
                        .value=${e.location || ""}
                        @selected=${(o) => this._updateConfig("location", o.target.value)}
                        @closed=${(o) => o.stopPropagation()}
                      >
                        <mwc-list-item value=""
                          >${this._t("location_autodetect")}</mwc-list-item
                        >
                        ${this.installedSilamLocations.map(
      ([o, l]) => F`<mwc-list-item .value=${o}
                              >${l}</mwc-list-item
                            >`
    )}
                        <mwc-list-item value="manual"
                          >${this._t("location_manual")}</mwc-list-item
                        >
                      </ha-select>
                    </ha-formfield>
                  ` : e.integration === "kleenex" ? F`
                      <ha-formfield label="${this._t("location")}">
                        <ha-select
                          .value=${e.location || ""}
                          @selected=${(o) => this._updateConfig("location", o.target.value)}
                          @closed=${(o) => o.stopPropagation()}
                        >
                          <mwc-list-item value=""
                            >${this._t("location_autodetect")}</mwc-list-item
                          >
                          ${this.installedKleenexLocations.map(
      ([o, l]) => F`<mwc-list-item .value=${o}
                                >${l}</mwc-list-item
                              >`
    )}
                          <mwc-list-item value="manual"
                            >${this._t("location_manual")}</mwc-list-item
                          >
                        </ha-select>
                      </ha-formfield>
                    ` : F`
                      <ha-formfield label="${this._t("region_id")}">
                        <ha-select
                          .value=${e.region_id || ""}
                          @selected=${(o) => this._updateConfig("region_id", o.target.value)}
                          @closed=${(o) => o.stopPropagation()}
                        >
                          <mwc-list-item value=""
                            >${this._t("location_autodetect")}</mwc-list-item
                          >
                          ${this.installedRegionIds.map(
      (o) => F`<mwc-list-item .value=${o}>
                                ${o} — ${ha[o] || o}
                              </mwc-list-item>`
    )}
                          <mwc-list-item value="manual"
                            >${this._t("location_manual")}</mwc-list-item
                          >
                        </ha-select>
                      </ha-formfield>
                    `}
          ${e.integration === "silam" && this._hasSilamWeatherEntity(e.location) ? F`
                <ha-formfield label="${this._t("mode")}">
                  <ha-select
                    .value=${e.mode || "daily"}
                    @selected=${(o) => this._updateConfig("mode", o.target.value)}
                    @closed=${(o) => o.stopPropagation()}
                  >
                    <mwc-list-item value="daily"
                      >${this._t("mode_daily")}</mwc-list-item
                    >
                    <mwc-list-item value="twice_daily"
                      >${this._t("mode_twice_daily")}</mwc-list-item
                    >
                    <mwc-list-item value="hourly"
                      >${this._t("mode_hourly")}</mwc-list-item
                    >
                  </ha-select>
                </ha-formfield>
              ` : e.integration === "peu" ? F`
                  <ha-formfield label="${this._t("mode")}">
                    <ha-select
                      .value=${e.mode || "daily"}
                      @selected=${(o) => this._updateConfig("mode", o.target.value)}
                      @closed=${(o) => o.stopPropagation()}
                    >
                      <mwc-list-item value="daily"
                        >${this._t("mode_daily")}</mwc-list-item
                      >
                      <mwc-list-item value="twice_daily"
                        >${this._t("mode_twice_daily")}</mwc-list-item
                      >
                      <mwc-list-item value="hourly"
                        >${this._t("mode_hourly")}</mwc-list-item
                      >
                      <mwc-list-item value="hourly_second"
                        >${this._t("mode_hourly_second")}</mwc-list-item
                      >
                      <mwc-list-item value="hourly_third"
                        >${this._t("mode_hourly_third")}</mwc-list-item
                      >
                      <mwc-list-item value="hourly_fourth"
                        >${this._t("mode_hourly_fourth")}</mwc-list-item
                      >
                      <mwc-list-item value="hourly_sixth"
                        >${this._t("mode_hourly_sixth")}</mwc-list-item
                      >
                      <mwc-list-item value="hourly_eighth"
                        >${this._t("mode_hourly_eighth")}</mwc-list-item
                      >
                    </ha-select>
                  </ha-formfield>
                  <p>${this._t("peu_nondaily_expl")}</p>
                ` : ""}
          ${e.integration === "pp" && e.city === "manual" || e.integration === "dwd" && e.region_id === "manual" || (e.integration === "peu" || e.integration === "silam" || e.integration === "kleenex") && e.location === "manual" ? F`
                <details>
                  <summary>${this._t("summary_entity_prefix_suffix")}</summary>
                  <ha-formfield label="${this._t("entity_prefix")}">
                    <ha-textfield
                      .value=${e.entity_prefix || ""}
                      placeholder="${this._t("entity_prefix_placeholder")}"
                      @input=${(o) => this._updateConfig("entity_prefix", o.target.value)}
                    ></ha-textfield>
                  </ha-formfield>
                  <ha-formfield label="${this._t("entity_suffix")}">
                    <ha-textfield
                      .value=${e.entity_suffix || ""}
                      placeholder="${this._t("entity_suffix_placeholder")}"
                      @input=${(o) => this._updateConfig("entity_suffix", o.target.value)}
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
                  @change=${(o) => {
      o.target.checked ? this._updateConfig("title", !1) : this._updateConfig("title", !0);
    }}
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="${this._t("title_automatic")}">
                <ha-checkbox
                  .checked=${e.title === !0 || e.title === void 0}
                  @change=${(o) => {
      o.target.checked ? this._updateConfig("title", !0) : this._updateConfig("title", "");
    }}
                ></ha-checkbox>
              </ha-formfield>
            </div>
            <ha-formfield label="${this._t("title")}">
              <ha-textfield
                .value=${typeof e.title == "string" ? e.title : e.title === !1 ? "(false)" : ""}
                placeholder="${this._t("title_placeholder")}"
                .disabled=${e.title === !1}
                @input=${(o) => {
      const l = o.target.value;
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
                  @input=${(o) => this._updateConfig("background_color", o.target.value)}
                  style="width: 120px;"
                ></ha-textfield>
                <input
                  type="color"
                  .value=${e.background_color && /^#[0-9a-fA-F]{6}$/.test(e.background_color) ? e.background_color : "#ffffff"}
                  @input=${(o) => this._updateConfig("background_color", o.target.value)}
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
                @input=${(o) => this._updateConfig("icon_size", Number(o.target.value))}
                style="width: 120px;"
              ></ha-slider>
              <ha-textfield
                .value=${e.icon_size ?? 48}
                type="number"
                min="16"
                max="128"
                step="1"
                @input=${(o) => this._updateConfig("icon_size", Number(o.target.value))}
                style="width: 80px;"
              ></ha-textfield>
            </ha-formfield>
            <ha-formfield label="${this._t("text_size_ratio")}">
              <ha-slider
                min="0.5"
                max="2"
                step="0.05"
                .value=${e.text_size_ratio ?? 1}
                @input=${(o) => this._updateConfig("text_size_ratio", Number(o.target.value))}
                style="width: 120px;"
              ></ha-slider>
              <ha-textfield
                type="number"
                .value=${e.text_size_ratio ?? 1}
                min="0.5"
                max="2"
                step="0.05"
                @input=${(o) => this._updateConfig("text_size_ratio", Number(o.target.value))}
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
                  <ha-select
                    .value=${e.allergen_color_mode || "default_colors"}
                    @selected=${(o) => this._updateConfig("allergen_color_mode", o.target.value)}
                    @closed=${(o) => o.stopPropagation()}
                    style="min-width: 140px;"
                  >
                    <mwc-list-item value="default_colors"
                      >${this._t("allergen_color_default_colors") || "Default Colors"}</mwc-list-item
                    >
                    <mwc-list-item value="custom"
                      >${this._t("allergen_color_custom") || "Custom Colors"}</mwc-list-item
                    >
                  </ha-select>
                </div>
              </ha-formfield>

              ${e.allergen_color_mode === "custom" ? F`
                    <ha-formfield
                      label="${this._t("allergen_colors") || "Allergen Colors (by Level)"}"
                    >
                      <div
                        style="display: flex; flex-direction: column; gap: 8px;"
                      >
                        ${(() => {
      const o = U.allergen_colors, l = e.allergen_colors || o;
      return l.map(
        (d, c) => F`
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
          h[c] = U.allergen_colors[c], this._updateConfig(
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
      const o = e.allergen_outline_color || U.levels_gap_color;
      return o.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(o) ? o : "#c8c8c8";
    })()}
                          @input=${(o) => this._updateConfig(
      "allergen_outline_color",
      o.target.value
    )}
                          style="width: 28px; height: 28px; border: none; background: none;"
                        />
                        <ha-textfield
                          .value=${e.allergen_outline_color || U.levels_gap_color}
                          placeholder="${this._t(
      "allergen_outline_placeholder"
    ) || "rgba(200,200,200,1)"}"
                          @input=${(o) => this._updateConfig(
      "allergen_outline_color",
      o.target.value
    )}
                          style="width: 100px;"
                        ></ha-textfield>
                        <ha-button
                          outlined
                          title="${this._t("allergen_outline_reset") || "Reset"}"
                          @click=${() => this._updateConfig(
      "allergen_outline_color",
      U.levels_gap_color
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
      e.no_allergens_color || U.no_allergens_color
    ) ? e.no_allergens_color || U.no_allergens_color : "#a9cfe0"}
                          @input=${(o) => this._updateConfig(
      "no_allergens_color",
      o.target.value
    )}
                          style="width: 28px; height: 28px; border: none; background: none;"
                        />
                        <ha-textfield
                          .value=${e.no_allergens_color || U.no_allergens_color}
                          placeholder="${this._t(
      "no_allergens_color_placeholder"
    ) || "#a9cfe0"}"
                          @input=${(o) => this._updateConfig(
      "no_allergens_color",
      o.target.value
    )}
                          style="width: 100px;"
                        ></ha-textfield>
                        <ha-button
                          outlined
                          title="${this._t("no_allergens_color_reset") || "Reset"}"
                          @click=${() => this._updateConfig(
      "no_allergens_color",
      U.no_allergens_color
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
                .value=${e.allergen_stroke_width ?? U.allergen_stroke_width}
                @input=${(o) => {
      const l = Number(o.target.value);
      if (this._updateConfig("allergen_stroke_width", l), (e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (e.allergen_levels_gap_synced ?? !0)) {
        const d = Nt(l);
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
                .value=${e.allergen_stroke_width ?? U.allergen_stroke_width}
                @input=${(o) => {
      const l = o.target.value === "" ? U.allergen_stroke_width : Number(o.target.value);
      if (this._updateConfig("allergen_stroke_width", l), (e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (e.allergen_levels_gap_synced ?? !0)) {
        const d = Nt(l);
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
      U.allergen_stroke_width
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
                @change=${(o) => this._updateConfig(
      "allergen_stroke_color_synced",
      o.target.checked
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
                  <ha-select
                    .value=${e.levels_inherit_mode || "inherit_allergen"}
                    @selected=${(o) => this._updateConfig("levels_inherit_mode", o.target.value)}
                    @closed=${(o) => o.stopPropagation()}
                    style="min-width: 140px;"
                  >
                    <mwc-list-item value="inherit_allergen"
                      >${this._t("levels_inherit_allergen") || "Inherit from Allergen Colors"}</mwc-list-item
                    >
                    <mwc-list-item value="custom"
                      >${this._t("levels_custom") || "Use Custom Level Colors"}</mwc-list-item
                    >
                  </ha-select>
                </div>
              </ha-formfield>

              <!-- Sync Gap with Allergen Stroke Width - only shown when inheriting -->
              ${(e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" ? F`
                    <ha-formfield
                      label="${this._t("allergen_levels_gap_synced") || "Sync gap with allergen stroke width"}"
                    >
                      <ha-checkbox
                        .checked=${e.allergen_levels_gap_synced ?? !0}
                        @change=${(o) => this._updateConfig(
      "allergen_levels_gap_synced",
      o.target.checked
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
      (o, l) => F`
                        <div
                          style="display: flex; align-items: center; gap: 8px;"
                        >
                          <input
                            type="color"
                            .value=${/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(o) ? o : "#000000"}
                            @input=${(d) => {
        const c = [...e.levels_colors];
        c[l] = d.target.value, this._updateConfig("levels_colors", c);
      }}
                            style="width: 28px; height: 28px; border: none; background: none;"
                          />
                          <ha-textfield
                            .value=${o}
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
        d[l] = U.levels_colors[l], this._updateConfig("levels_colors", d);
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
      const o = e.levels_empty_color || U.levels_empty_color;
      return o.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(o) ? o : "#c8c8c8";
    })()}
                      @input=${(o) => this._updateConfig(
      "levels_empty_color",
      o.target.value
    )}
                      style="width: 28px; height: 28px; border: none; background: none;"
                    />
                    <ha-textfield
                      .value=${e.levels_empty_color}
                      placeholder="${this._t("levels_colors_placeholder")}"
                      @input=${(o) => this._updateConfig(
      "levels_empty_color",
      o.target.value
    )}
                      style="width: 100px;"
                    ></ha-textfield>
                    <ha-button
                      outlined
                      title="${this._t("levels_reset")}"
                      @click=${() => this._updateConfig(
      "levels_empty_color",
      U.levels_empty_color
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
      const o = e.levels_gap_color || U.levels_gap_color;
      return o.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(o) ? o : "#c8c8c8";
    })()}
                      @input=${(o) => this._updateConfig("levels_gap_color", o.target.value)}
                      style="width: 28px; height: 28px; border: none; background: none;"
                    />
                    <ha-textfield
                      .value=${e.levels_gap_color}
                      placeholder="${this._t("levels_colors_placeholder")}"
                      @input=${(o) => this._updateConfig("levels_gap_color", o.target.value)}
                      style="width: 100px;"
                    ></ha-textfield>
                    <ha-button
                      outlined
                      title="${this._t("levels_reset")}"
                      @click=${() => this._updateConfig(
      "levels_gap_color",
      U.levels_gap_color
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
                    @input=${(o) => this._updateConfig(
      "levels_thickness",
      Number(o.target.value)
    )}
                    style="width: 120px;"
                  ></ha-slider>
                  <ha-textfield
                    type="number"
                    .value=${e.levels_thickness}
                    @input=${(o) => this._updateConfig(
      "levels_thickness",
      Number(o.target.value)
    )}
                    style="width: 80px;"
                  ></ha-textfield>
                  <ha-button
                    outlined
                    title="${this._t("levels_reset")}"
                    @click=${() => this._updateConfig(
      "levels_thickness",
      U.levels_thickness
    )}
                    style="margin-left: 8px;"
                    >↺</ha-button
                  >
                </ha-formfield>
              </div>

              <!-- Gap control - conditional on inheritance mode and sync setting -->
              ${(e.levels_inherit_mode || "inherit_allergen") === "custom" || !(e.allergen_levels_gap_synced ?? !0) ? F`
                    <ha-formfield label="${this._t("levels_gap")}">
                      <ha-slider
                        min="0"
                        max="20"
                        step="1"
                        .value=${e.levels_gap}
                        @input=${(o) => this._updateConfig(
      "levels_gap",
      Number(o.target.value)
    )}
                        style="width: 120px;"
                      ></ha-slider>
                      <ha-textfield
                        type="number"
                        .value=${e.levels_gap}
                        @input=${(o) => this._updateConfig(
      "levels_gap",
      Number(o.target.value)
    )}
                        style="width: 80px;"
                      ></ha-textfield>
                      <ha-button
                        outlined
                        title="${this._t("levels_reset")}"
                        @click=${() => this._updateConfig(
      "levels_gap",
      U.levels_gap
    )}
                        style="margin-left: 8px;"
                        >↺</ha-button
                      >
                    </ha-formfield>
                  ` : F`
                    <ha-formfield label="${this._t("levels_gap_inherited")}">
                      <div
                        style="display: flex; align-items: center; gap: 8px; width: 120px; height: 30px;"
                      >
                        <span
                          style="color: var(--secondary-text-color); font-size: 14px; min-width: 30px"
                        >
                          ${Nt(
      e.allergen_stroke_width || U.allergen_stroke_width
    )}px
                        </span>
                      </div>
                    </ha-formfield>
                  `}

              <ha-formfield label="${this._t("levels_text_weight")}">
                <ha-select
                  .value=${e.levels_text_weight || "normal"}
                  @selected=${(o) => this._updateConfig("levels_text_weight", o.target.value)}
                  @closed=${(o) => o.stopPropagation()}
                >
                  <mwc-list-item value="normal">Normal</mwc-list-item>
                  <mwc-list-item value="500">Medium</mwc-list-item>
                  <mwc-list-item value="bold">Bold</mwc-list-item>
                </ha-select>
              </ha-formfield>

              <ha-formfield label="${this._t("levels_text_size")}">
                <ha-slider
                  min="0.1"
                  max="0.5"
                  step="0.05"
                  .value=${e.levels_text_size || 0.3}
                  @input=${(o) => this._updateConfig(
      "levels_text_size",
      Number(o.target.value)
    )}
                  style="width: 120px;"
                ></ha-slider>
                <ha-textfield
                  type="number"
                  .value=${e.levels_text_size || 0.3}
                  @input=${(o) => this._updateConfig(
      "levels_text_size",
      Number(o.target.value)
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
                  @input=${(o) => this._updateConfig(
      "levels_icon_ratio",
      Number(o.target.value)
    )}
                  style="width: 120px;"
                ></ha-slider>
                <ha-textfield
                  type="number"
                  .value=${e.levels_icon_ratio || 1}
                  @input=${(o) => this._updateConfig(
      "levels_icon_ratio",
      Number(o.target.value)
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
                    @input=${(o) => this._updateConfig("levels_text_color", o.target.value)}
                    style="width: 28px; height: 28px; border: none; background: none;"
                  />
                  <ha-textfield
                    .value=${e.levels_text_color || ""}
                    placeholder="var(--primary-text-color)"
                    @input=${(o) => this._updateConfig("levels_text_color", o.target.value)}
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
                  @change=${(o) => this._updateConfig("minimal", o.target.checked)}
                ></ha-switch>
              </ha-formfield>
              <ha-formfield label="${this._t("minimal_gap")}">
                <ha-slider
                  min="0"
                  max="100"
                  step="1"
                  .value=${e.minimal_gap ?? 35}
                  @input=${(o) => this._updateConfig("minimal_gap", Number(o.target.value))}
                  style="width: 120px;"
                ></ha-slider>
                <ha-textfield
                  type="number"
                  .value=${e.minimal_gap ?? 35}
                  min="0"
                  max="100"
                  step="1"
                  @input=${(o) => this._updateConfig("minimal_gap", Number(o.target.value))}
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
                @change=${(o) => this._updateConfig("allergens_abbreviated", o.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("show_text_allergen")}">
              <ha-switch
                .checked=${e.show_text_allergen}
                @change=${(o) => this._updateConfig("show_text_allergen", o.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("show_value_text")}">
              <ha-switch
                .checked=${e.show_value_text}
                @change=${(o) => this._updateConfig("show_value_text", o.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("show_value_numeric")}">
              <ha-switch
                .checked=${e.show_value_numeric}
                @change=${(o) => this._updateConfig("show_value_numeric", o.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("show_value_numeric_in_circle")}">
              <ha-switch
                .checked=${e.show_value_numeric_in_circle}
                @change=${(o) => this._updateConfig(
      "show_value_numeric_in_circle",
      o.target.checked
    )}
              ></ha-switch>
            </ha-formfield>
            ${e.integration === "peu" ? F`
                  <ha-formfield label="${this._t("numeric_state_raw_risk")}">
                    <ha-switch
                      .checked=${e.numeric_state_raw_risk}
                      @change=${(o) => this._updateConfig(
      "numeric_state_raw_risk",
      o.target.checked
    )}
                    ></ha-switch>
                  </ha-formfield>
                ` : ""}
            <ha-formfield label="${this._t("show_empty_days")}">
              <ha-switch
                .checked=${e.show_empty_days}
                @change=${(o) => this._updateConfig("show_empty_days", o.target.checked)}
              ></ha-switch>
            </ha-formfield>
          </details>

          <!-- Day Settings -->
          <details open>
            <summary>${this._t("summary_day_view_settings")}</summary>
            <ha-formfield label="${this._t("days_relative")}">
              <ha-switch
                .checked=${e.days_relative}
                @change=${(o) => this._updateConfig("days_relative", o.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("days_abbreviated")}">
              <ha-switch
                .checked=${e.days_abbreviated}
                @change=${(o) => this._updateConfig("days_abbreviated", o.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("days_uppercase")}">
              <ha-switch
                .checked=${e.days_uppercase}
                @change=${(o) => this._updateConfig("days_uppercase", o.target.checked)}
              ></ha-switch>
            </ha-formfield>
            <ha-formfield label="${this._t("days_boldfaced")}">
              <ha-switch
                .checked=${e.days_boldfaced}
                @change=${(o) => this._updateConfig("days_boldfaced", o.target.checked)}
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
                @input=${(o) => this._updateConfig("days_to_show", Number(o.target.value))}
              ></ha-slider>
            </div>
          </details>
        </details>

        <!-- Allergens -->
        <details>
          <summary>${this._t("summary_allergens")}</summary>
          ${e.integration === "kleenex" ? F`
                <!-- Kleenex: Category allergens (controlled by checkbox) -->
                <div class="allergen-section">
                  <h4
                    style="margin: 8px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                  >
                    ${this._t("allergens_header_category")}
                  </h4>
                  <div class="allergens-group">
                    ${["trees_cat", "grass_cat", "weeds_cat"].map((o) => {
      const d = `phrases_full.${ke[o] || o}`, c = this._t(d) !== d ? this._t(d) : o.charAt(0).toUpperCase() + o.slice(1);
      return F`
                        <ha-formfield .label=${c}>
                          <ha-checkbox
                            .checked=${e.allergens.includes(o)}
                            @change=${(h) => this._onAllergenToggle(o, h.target.checked)}
                          ></ha-checkbox>
                        </ha-formfield>
                      `;
    })}
                  </div>
                </div>

                <!-- Kleenex: Individual allergens (enabled by default) -->
                <div class="allergen-section">
                  <h4
                    style="margin: 16px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                  >
                    ${this._t("allergens_header_specific")}
                  </h4>
                  <div class="allergens-group">
                    ${i.filter(
      (o) => !["trees_cat", "grass_cat", "weeds_cat"].includes(
        o
      )
    ).sort((o, l) => {
      const d = ke[o] || o, c = ke[l] || l, h = `phrases_full.${d}`, u = `phrases_full.${c}`, g = this._t(h) !== h ? this._t(h) : o.charAt(0).toUpperCase() + o.slice(1), _ = this._t(u) !== u ? this._t(u) : l.charAt(0).toUpperCase() + l.slice(1);
      return g.localeCompare(_);
    }).map((o) => {
      const d = `phrases_full.${ke[o] || o}`, c = this._t(d) !== d ? this._t(d) : o.charAt(0).toUpperCase() + o.slice(1);
      return F`
                          <ha-formfield .label=${c}>
                            <ha-checkbox
                              .checked=${e.allergens.includes(o)}
                              @change=${(h) => this._onAllergenToggle(o, h.target.checked)}
                            ></ha-checkbox>
                          </ha-formfield>
                        `;
    })}
                  </div>
                </div>
              ` : F`
                <!-- Non-Kleenex: Standard allergen display -->
                <div class="allergens-group">
                  ${i.map(
      (o) => F`
                      <ha-formfield .label=${o}>
                        <ha-checkbox
                          .checked=${e.allergens.includes(o)}
                          @change=${(l) => this._onAllergenToggle(o, l.target.checked)}
                        ></ha-checkbox>
                      </ha-formfield>
                    `
    )}
                </div>
              `}
          <div class="preset-buttons">
            <ha-button
              @click=${() => {
      const o = e.integration === "kleenex" ? [...i, "trees_cat", "grass_cat", "weeds_cat"] : i;
      this._toggleSelectAllAllergens(o);
    }}
            >
              ${this._t("select_all_allergens")}
            </ha-button>
          </div>
          <div class="slider-row">
            <div class="slider-text">${this._t("pollen_threshold")}</div>
            <div class="slider-value">${e.pollen_threshold}</div>
            <ha-slider
              min="${r.min}"
              max="${r.max}"
              step="${r.step}"
              .value=${e.pollen_threshold}
              @input=${(o) => this._updateConfig("pollen_threshold", Number(o.target.value))}
            ></ha-slider>
          </div>
          <ha-formfield label="${this._t("sort")}">
            <ha-select
              .value=${e.sort}
              @selected=${(o) => this._updateConfig("sort", o.target.value)}
              @closed=${(o) => o.stopPropagation()}
            >
              ${a.map(
      ({ value: o, label: l }) => F`<mwc-list-item .value=${o}>${l}</mwc-list-item>`
    )}
            </ha-select>
          </ha-formfield>
          ${e.integration === "kleenex" ? F`
                <ha-formfield
                  label="${this._t("sort_category_allergens_first")}"
                >
                  <ha-checkbox
                    .checked=${e.sort_category_allergens_first}
                    @change=${(o) => this._updateConfig(
      "sort_category_allergens_first",
      o.target.checked
    )}
                  ></ha-checkbox>
                </ha-formfield>
              ` : ""}
          ${e.integration === "peu" || e.integration === "silam" ? F`
                <ha-formfield
                  label="${e.integration === "silam" ? this._t("index_top") : this._t("allergy_risk_top")}"
                >
                  <ha-checkbox
                    .checked=${e.integration === "silam" ? e.index_top : e.allergy_risk_top}
                    @change=${(o) => this._updateConfig(
      e.integration === "silam" ? "index_top" : "allergy_risk_top",
      o.target.checked
    )}
                  ></ha-checkbox>
                </ha-formfield>
              ` : ""}
        </details>

        <!-- Översättningar och textsträngar -->
        <details>
          <summary>${this._t("summary_translation_and_strings")}</summary>
          <ha-formfield label="${this._t("locale")}">
            <ha-textfield
              .value=${e.date_locale}
              @input=${(o) => this._updateConfig("date_locale", o.target.value)}
            ></ha-textfield>
          </ha-formfield>
          <h3>${this._t("phrases")}</h3>
          <div class="preset-buttons">
            <ha-formfield label="${this._t("phrases_translate_all")}">
              <ha-select
                .value=${this._selectedPhraseLang}
                @selected=${(o) => this._selectedPhraseLang = o.target.value}
                @closed=${(o) => o.stopPropagation()}
              >
                ${vc.map(
      (o) => F`
                    <mwc-list-item .value=${o}>
                      ${new Intl.DisplayNames([this._lang], {
        type: "language"
      }).of(o) || o}
                    </mwc-list-item>
                  `
    )}
              </ha-select>
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
            ${i.map(
      (o) => F`
                <ha-formfield .label=${o}>
                  <ha-textfield
                    .value=${e.phrases.full[o] || ""}
                    @input=${(l) => {
        const d = {
          ...e.phrases,
          full: { ...e.phrases.full, [o]: l.target.value }
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
            ${i.map(
      (o) => F`
                <ha-formfield .label=${o}>
                  <ha-textfield
                    .value=${e.phrases.short[o] || ""}
                    @input=${(l) => {
        const d = {
          ...e.phrases,
          short: { ...e.phrases.short, [o]: l.target.value }
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
            ${Array.from({ length: s }, (o, l) => l).map(
      (o) => F`
                <ha-formfield .label=${o}>
                  <ha-textfield
                    .value=${e.phrases.levels[o] || ""}
                    @input=${(l) => {
        const d = [...e.phrases.levels];
        d[o] = l.target.value;
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
      (o) => F`
                <ha-formfield .label=${o}>
                  <ha-textfield
                    .value=${e.phrases.days[o] || ""}
                    @input=${(l) => {
        const d = { ...e.phrases.days, [o]: l.target.value };
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
              @input=${(o) => this._updateConfig("phrases", {
      ...e.phrases,
      no_information: o.target.value
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
              @change=${(o) => this._updateConfig("link_to_sensors", o.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("tap_action_enable")}">
            <ha-switch
              .checked=${this._tapType !== "none"}
              @change=${(o) => {
      o.target.checked ? (this._tapType = "more-info", this._updateConfig("tap_action", {
        ...this._config.tap_action,
        type: "more-info"
      })) : (this._tapType = "none", this._updateConfig("tap_action", {
        ...this._config.tap_action,
        type: "none"
      })), this.requestUpdate();
    }}
            ></ha-switch>
          </ha-formfield>
          ${this._tapType !== "none" ? F`
                <div style="margin-top: 10px;">
                  <label>Action type</label>
                  <ha-select
                    .value=${this._tapType}
                    @selected=${(o) => {
      this._tapType = o.target.value;
      let l = { type: this._tapType };
      if (this._tapType === "more-info" && (l.entity = this._tapEntity), this._tapType === "navigate" && (l.navigation_path = this._tapNavigation), this._tapType === "call-service") {
        l.service = this._tapService;
        try {
          l.service_data = JSON.parse(
            this._tapServiceData || "{}"
          );
        } catch {
          l.service_data = {};
        }
      }
      this._updateConfig("tap_action", l), this.requestUpdate();
    }}
                    @closed=${(o) => o.stopPropagation()}
                  >
                    <mwc-list-item value="more-info">More Info</mwc-list-item>
                    <mwc-list-item value="navigate">Navigate</mwc-list-item>
                    <mwc-list-item value="call-service"
                      >Call Service</mwc-list-item
                    >
                  </ha-select>
                </div>
                ${this._tapType === "more-info" ? F`
                      <ha-formfield label="Entity">
                        <ha-textfield
                          .value=${this._tapEntity}
                          @input=${(o) => {
      this._tapEntity = o.target.value, this._updateConfig("tap_action", {
        type: "more-info",
        entity: this._tapEntity
      });
    }}
                        ></ha-textfield>
                      </ha-formfield>
                    ` : ""}
                ${this._tapType === "navigate" ? F`
                      <ha-formfield label="Navigation path">
                        <ha-textfield
                          .value=${this._tapNavigation}
                          @input=${(o) => {
      this._tapNavigation = o.target.value, this._updateConfig("tap_action", {
        type: "navigate",
        navigation_path: this._tapNavigation
      });
    }}
                        ></ha-textfield>
                      </ha-formfield>
                    ` : ""}
                ${this._tapType === "call-service" ? F`
                      <ha-formfield label="Service (e.g. light.turn_on)">
                        <ha-textfield
                          .value=${this._tapService}
                          @input=${(o) => {
      this._tapService = o.target.value;
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
                          @input=${(o) => {
      this._tapServiceData = o.target.value;
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
              @change=${(o) => this._updateConfig("debug", o.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("show_version")}">
            <ha-switch
              .checked=${e.show_version !== !1}
              @change=${(o) => this._updateConfig("show_version", o.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <div class="version-info">
            ${this._t("card_version")}: ${"v2.7.2"}
          </div>
        </details>
      </div>
    `;
  }
  static get styles() {
    return No`
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
      ha-select {
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
customElements.define("pollenprognos-card-editor", qf);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "pollenprognos-card",
  name: "Pollenprognos Card",
  preview: !0,
  description: "Visar en grafisk prognos för pollenhalter",
  documentationURL: "https://github.com/krissen/pollenprognos-card"
});
