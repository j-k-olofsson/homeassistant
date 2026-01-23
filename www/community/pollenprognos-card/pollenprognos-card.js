var Al = Object.defineProperty;
var Cl = (t, e, i) => e in t ? Al(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var I = (t, e, i) => Cl(t, typeof e != "symbol" ? e + "" : e, i);
const Jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get fetchForecast() {
    return nh;
  },
  get stubConfigPP() {
    return me;
  }
}, Symbol.toStringTag, { value: "Module" }));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = window, $s = Ui.ShadowRoot && (Ui.ShadyCSS === void 0 || Ui.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ls = Symbol(), Zs = /* @__PURE__ */ new WeakMap();
let Xn = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== Ls) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if ($s && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = Zs.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Zs.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const El = (t) => new Xn(typeof t == "string" ? t : t + "", void 0, Ls), Zn = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((r, s, o) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[o + 1]), t[0]);
  return new Xn(i, t, Ls);
}, Pl = (t, e) => {
  $s ? t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet)) : e.forEach(((i) => {
    const r = document.createElement("style"), s = Ui.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = i.cssText, t.appendChild(r);
  }));
}, qs = $s ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return El(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var kr;
const ir = window, Js = ir.trustedTypes, Ml = Js ? Js.emptyScript : "", Qs = ir.reactiveElementPolyfillSupport, Qr = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ml : null;
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
} }, qn = (t, e) => e !== t && (e == e || t == t), Sr = { attribute: !0, type: String, converter: Qr, reflect: !1, hasChanged: qn }, es = "finalized";
let Dt = class extends HTMLElement {
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
    return this.elementProperties.forEach(((i, r) => {
      const s = this._$Ep(r, i);
      s !== void 0 && (this._$Ev.set(s, r), e.push(s));
    })), e;
  }
  static createProperty(e, i = Sr) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(e, i), !i.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const r = typeof e == "symbol" ? Symbol() : "__" + e, s = this.getPropertyDescriptor(e, r, i);
      s !== void 0 && Object.defineProperty(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    return { get() {
      return this[i];
    }, set(s) {
      const o = this[e];
      this[i] = s, this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || Sr;
  }
  static finalize() {
    if (this.hasOwnProperty(es)) return !1;
    this[es] = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const i = this.properties, r = [...Object.getOwnPropertyNames(i), ...Object.getOwnPropertySymbols(i)];
      for (const s of r) this.createProperty(s, i[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r) i.unshift(qs(s));
    } else e !== void 0 && i.push(qs(e));
    return i;
  }
  static _$Ep(e, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  _$Eu() {
    var e;
    this._$E_ = new Promise(((i) => this.enableUpdating = i)), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach(((i) => i(this)));
  }
  addController(e) {
    var i, r;
    ((i = this._$ES) !== null && i !== void 0 ? i : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((r = e.hostConnected) === null || r === void 0 || r.call(e));
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
    return Pl(i, this.constructor.elementStyles), i;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach(((i) => {
      var r;
      return (r = i.hostConnected) === null || r === void 0 ? void 0 : r.call(i);
    }));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach(((i) => {
      var r;
      return (r = i.hostDisconnected) === null || r === void 0 ? void 0 : r.call(i);
    }));
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$EO(e, i, r = Sr) {
    var s;
    const o = this.constructor._$Ep(e, r);
    if (o !== void 0 && r.reflect === !0) {
      const a = (((s = r.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? r.converter : Qr).toAttribute(i, r.type);
      this._$El = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$El = null;
    }
  }
  _$AK(e, i) {
    var r;
    const s = this.constructor, o = s._$Ev.get(e);
    if (o !== void 0 && this._$El !== o) {
      const a = s.getPropertyOptions(o), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? a.converter : Qr;
      this._$El = o, this[o] = n.fromAttribute(i, a.type), this._$El = null;
    }
  }
  requestUpdate(e, i, r) {
    let s = !0;
    e !== void 0 && (((r = r || this.constructor.getPropertyOptions(e)).hasChanged || qn)(this[e], i) ? (this._$AL.has(e) || this._$AL.set(e, i), r.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, r))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach(((s, o) => this[o] = s)), this._$Ei = void 0);
    let i = !1;
    const r = this._$AL;
    try {
      i = this.shouldUpdate(r), i ? (this.willUpdate(r), (e = this._$ES) === null || e === void 0 || e.forEach(((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
      })), this.update(r)) : this._$Ek();
    } catch (s) {
      throw i = !1, this._$Ek(), s;
    }
    i && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$ES) === null || i === void 0 || i.forEach(((r) => {
      var s;
      return (s = r.hostUpdated) === null || s === void 0 ? void 0 : s.call(r);
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
    this._$EC !== void 0 && (this._$EC.forEach(((i, r) => this._$EO(r, this[r], i))), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Dt[es] = !0, Dt.elementProperties = /* @__PURE__ */ new Map(), Dt.elementStyles = [], Dt.shadowRootOptions = { mode: "open" }, Qs == null || Qs({ ReactiveElement: Dt }), ((kr = ir.reactiveElementVersions) !== null && kr !== void 0 ? kr : ir.reactiveElementVersions = []).push("1.6.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ar;
const rr = window, Rt = rr.trustedTypes, eo = Rt ? Rt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ts = "$lit$", it = `lit$${(Math.random() + "").slice(9)}$`, Jn = "?" + it, $l = `<${Jn}>`, At = document, hi = () => At.createComment(""), ui = (t) => t === null || typeof t != "object" && typeof t != "function", Qn = Array.isArray, Ll = (t) => Qn(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Cr = `[ 	
\f\r]`, Vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, to = /-->/g, io = />/g, _t = RegExp(`>|${Cr}(?:([^\\s"'>=/]+)(${Cr}*=${Cr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ro = /'/g, so = /"/g, ea = /^(?:script|style|textarea|title)$/i, Dl = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), B = Dl(1), Ct = Symbol.for("lit-noChange"), _e = Symbol.for("lit-nothing"), oo = /* @__PURE__ */ new WeakMap(), xt = At.createTreeWalker(At, 129, null, !1);
function ta(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return eo !== void 0 ? eo.createHTML(e) : e;
}
const Tl = (t, e) => {
  const i = t.length - 1, r = [];
  let s, o = e === 2 ? "<svg>" : "", a = Vt;
  for (let n = 0; n < i; n++) {
    const l = t[n];
    let d, c, h = -1, u = 0;
    for (; u < l.length && (a.lastIndex = u, c = a.exec(l), c !== null); ) u = a.lastIndex, a === Vt ? c[1] === "!--" ? a = to : c[1] !== void 0 ? a = io : c[2] !== void 0 ? (ea.test(c[2]) && (s = RegExp("</" + c[2], "g")), a = _t) : c[3] !== void 0 && (a = _t) : a === _t ? c[0] === ">" ? (a = s ?? Vt, h = -1) : c[1] === void 0 ? h = -2 : (h = a.lastIndex - c[2].length, d = c[1], a = c[3] === void 0 ? _t : c[3] === '"' ? so : ro) : a === so || a === ro ? a = _t : a === to || a === io ? a = Vt : (a = _t, s = void 0);
    const g = a === _t && t[n + 1].startsWith("/>") ? " " : "";
    o += a === Vt ? l + $l : h >= 0 ? (r.push(d), l.slice(0, h) + ts + l.slice(h) + it + g) : l + it + (h === -2 ? (r.push(void 0), n) : g);
  }
  return [ta(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : "")), r];
};
class gi {
  constructor({ strings: e, _$litType$: i }, r) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const n = e.length - 1, l = this.parts, [d, c] = Tl(e, i);
    if (this.el = gi.createElement(d, r), xt.currentNode = this.el.content, i === 2) {
      const h = this.el.content, u = h.firstChild;
      u.remove(), h.append(...u.childNodes);
    }
    for (; (s = xt.nextNode()) !== null && l.length < n; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const h = [];
          for (const u of s.getAttributeNames()) if (u.endsWith(ts) || u.startsWith(it)) {
            const g = c[a++];
            if (h.push(u), g !== void 0) {
              const f = s.getAttribute(g.toLowerCase() + ts).split(it), _ = /([.?@])?(.*)/.exec(g);
              l.push({ type: 1, index: o, name: _[2], strings: f, ctor: _[1] === "." ? Ol : _[1] === "?" ? Il : _[1] === "@" ? Nl : gr });
            } else l.push({ type: 6, index: o });
          }
          for (const u of h) s.removeAttribute(u);
        }
        if (ea.test(s.tagName)) {
          const h = s.textContent.split(it), u = h.length - 1;
          if (u > 0) {
            s.textContent = Rt ? Rt.emptyScript : "";
            for (let g = 0; g < u; g++) s.append(h[g], hi()), xt.nextNode(), l.push({ type: 2, index: ++o });
            s.append(h[u], hi());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Jn) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(it, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += it.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const r = At.createElement("template");
    return r.innerHTML = e, r;
  }
}
function It(t, e, i = t, r) {
  var s, o, a, n;
  if (e === Ct) return e;
  let l = r !== void 0 ? (s = i._$Co) === null || s === void 0 ? void 0 : s[r] : i._$Cl;
  const d = ui(e) ? void 0 : e._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== d && ((o = l == null ? void 0 : l._$AO) === null || o === void 0 || o.call(l, !1), d === void 0 ? l = void 0 : (l = new d(t), l._$AT(t, i, r)), r !== void 0 ? ((a = (n = i)._$Co) !== null && a !== void 0 ? a : n._$Co = [])[r] = l : i._$Cl = l), l !== void 0 && (e = It(t, l._$AS(t, e.values), l, r)), e;
}
class zl {
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
    const { el: { content: r }, parts: s } = this._$AD, o = ((i = e == null ? void 0 : e.creationScope) !== null && i !== void 0 ? i : At).importNode(r, !0);
    xt.currentNode = o;
    let a = xt.nextNode(), n = 0, l = 0, d = s[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let c;
        d.type === 2 ? c = new ki(a, a.nextSibling, this, e) : d.type === 1 ? c = new d.ctor(a, d.name, d.strings, this, e) : d.type === 6 && (c = new Bl(a, this, e)), this._$AV.push(c), d = s[++l];
      }
      n !== (d == null ? void 0 : d.index) && (a = xt.nextNode(), n++);
    }
    return xt.currentNode = At, o;
  }
  v(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class ki {
  constructor(e, i, r, s) {
    var o;
    this.type = 2, this._$AH = _e, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = s, this._$Cp = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
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
    e = It(this, e, i), ui(e) ? e === _e || e == null || e === "" ? (this._$AH !== _e && this._$AR(), this._$AH = _e) : e !== this._$AH && e !== Ct && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Ll(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== _e && ui(this._$AH) ? this._$AA.nextSibling.data = e : this.$(At.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var i;
    const { values: r, _$litType$: s } = e, o = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = gi.createElement(ta(s.h, s.h[0]), this.options)), s);
    if (((i = this._$AH) === null || i === void 0 ? void 0 : i._$AD) === o) this._$AH.v(r);
    else {
      const a = new zl(o, this), n = a.u(this.options);
      a.v(r), this.$(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = oo.get(e.strings);
    return i === void 0 && oo.set(e.strings, i = new gi(e)), i;
  }
  T(e) {
    Qn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, s = 0;
    for (const o of e) s === i.length ? i.push(r = new ki(this.k(hi()), this.k(hi()), this, this.options)) : r = i[s], r._$AI(o), s++;
    s < i.length && (this._$AR(r && r._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, i); e && e !== this._$AB; ) {
      const s = e.nextSibling;
      e.remove(), e = s;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cp = e, (i = this._$AP) === null || i === void 0 || i.call(this, e));
  }
}
class gr {
  constructor(e, i, r, s, o) {
    this.type = 1, this._$AH = _e, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = _e;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, i = this, r, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) e = It(this, e, i, 0), a = !ui(e) || e !== this._$AH && e !== Ct, a && (this._$AH = e);
    else {
      const n = e;
      let l, d;
      for (e = o[0], l = 0; l < o.length - 1; l++) d = It(this, n[r + l], i, l), d === Ct && (d = this._$AH[l]), a || (a = !ui(d) || d !== this._$AH[l]), d === _e ? e = _e : e !== _e && (e += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === _e ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ol extends gr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === _e ? void 0 : e;
  }
}
const Rl = Rt ? Rt.emptyScript : "";
class Il extends gr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== _e ? this.element.setAttribute(this.name, Rl) : this.element.removeAttribute(this.name);
  }
}
class Nl extends gr {
  constructor(e, i, r, s, o) {
    super(e, i, r, s, o), this.type = 5;
  }
  _$AI(e, i = this) {
    var r;
    if ((e = (r = It(this, e, i, 0)) !== null && r !== void 0 ? r : _e) === Ct) return;
    const s = this._$AH, o = e === _e && s !== _e || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== _e && (s === _e || o);
    o && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (i = this.options) === null || i === void 0 ? void 0 : i.host) !== null && r !== void 0 ? r : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Bl {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    It(this, e);
  }
}
const no = rr.litHtmlPolyfillSupport;
no == null || no(gi, ki), ((Ar = rr.litHtmlVersions) !== null && Ar !== void 0 ? Ar : rr.litHtmlVersions = []).push("2.8.0");
const Hl = (t, e, i) => {
  var r, s;
  const o = (r = i == null ? void 0 : i.renderBefore) !== null && r !== void 0 ? r : e;
  let a = o._$litPart$;
  if (a === void 0) {
    const n = (s = i == null ? void 0 : i.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = a = new ki(e.insertBefore(hi(), n), n, void 0, i ?? {});
  }
  return a._$AI(t), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Er, Pr;
class zt extends Dt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, i;
    const r = super.createRenderRoot();
    return (e = (i = this.renderOptions).renderBefore) !== null && e !== void 0 || (i.renderBefore = r.firstChild), r;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Hl(i, this.renderRoot, this.renderOptions);
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
    return Ct;
  }
}
zt.finalized = !0, zt._$litElement$ = !0, (Er = globalThis.litElementHydrateSupport) === null || Er === void 0 || Er.call(globalThis, { LitElement: zt });
const ao = globalThis.litElementPolyfillSupport;
ao == null || ao({ LitElement: zt });
((Pr = globalThis.litElementVersions) !== null && Pr !== void 0 ? Pr : globalThis.litElementVersions = []).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fl = { CHILD: 2 }, jl = (t) => (...e) => ({ _$litDirective$: t, values: e });
class Gl {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, r) {
    this._$Ct = e, this._$AM = i, this._$Ci = r;
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
class is extends Gl {
  constructor(e) {
    if (super(e), this.et = _e, e.type !== Fl.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === _e || e == null) return this.ft = void 0, this.et = e;
    if (e === Ct) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.et) return this.ft;
    this.et = e;
    const i = [e];
    return i.raw = i, this.ft = { _$litType$: this.constructor.resultType, strings: i, values: [] };
  }
}
is.directiveName = "unsafeHTML", is.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let rs = class extends is {
};
rs.directiveName = "unsafeSVG", rs.resultType = 2;
const Ul = jl(rs), Ae = (t, e = "_") => {
  const i = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", r = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${e}`, s = new RegExp(i.split("").join("|"), "g"), o = {
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
  return t === "" ? a = "" : (a = t.toString().toLowerCase().replace(s, (n) => r.charAt(i.indexOf(n))).replace(/[а-я]/g, (n) => o[n] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, e).replace(new RegExp(`(${e})\\1+`, "g"), "$1").replace(new RegExp(`^${e}+`), "").replace(new RegExp(`${e}+$`), ""), a === "" && (a = "unknown")), a;
}, Mr = {}, Vl = `<?xml version="1.0" standalone="no"?>
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
`, Wl = `<?xml version="1.0" standalone="no"?>
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
`, Kl = `<?xml version="1.0" standalone="no"?>
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
`, Yl = `<?xml version="1.0" standalone="no"?>
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
`, Xl = `<?xml version="1.0" standalone="no"?>
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
`, lo = `<?xml version="1.0" standalone="no"?>
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
`, Zl = `<?xml version="1.0" standalone="no"?>
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
`, ql = `<?xml version="1.0" standalone="no"?>
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
`, Jl = `<?xml version="1.0" standalone="no"?>
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
`, Ql = `<?xml version="1.0" standalone="no"?>
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
`, ed = `<?xml version="1.0" standalone="no"?>
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
`, td = `<?xml version="1.0" standalone="no"?>
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
`, $r = `<?xml version="1.0" standalone="no"?>
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
`, co = `<?xml version="1.0" standalone="no"?>
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
`, id = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" aria-hidden="true">
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
`, rd = `<?xml version="1.0" standalone="no"?>
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
`, sd = `<?xml version="1.0" standalone="no"?>
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
`, od = `<?xml version="1.0" standalone="no"?>
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
`, nd = `<?xml version="1.0" standalone="no"?>
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
`, ad = `<?xml version="1.0" standalone="no"?>
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
`, ld = `<?xml version="1.0" standalone="no"?>
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
`, dd = `<?xml version="1.0" standalone="no"?>
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
`, cd = `<?xml version="1.0" standalone="no"?>
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
`, hd = `<?xml version="1.0" standalone="no"?>
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
`, ud = {
  alder: Vl,
  allergy_risk: Wl,
  ash: Kl,
  beech: Yl,
  birch: Xl,
  chenopod: lo,
  goosefoot: lo,
  // Alias until dedicated icon is available
  cypress: Zl,
  elm: ql,
  grass: Jl,
  plantain: $r,
  // Temporary alias (weed category)
  hazel: Ql,
  lime: ed,
  mold_spores: td,
  mugwort: $r,
  sorrel: $r,
  // Temporary alias (weed category)
  nettle_and_pellitory: co,
  nettle: co,
  // Alias for compatibility
  no_allergens: id,
  oak: rd,
  olive: sd,
  pine: od,
  plane: nd,
  poaceae: ad,
  poplar: ld,
  ragweed: dd,
  rye: cd,
  willow: hd
};
function Lr(t) {
  return !t || typeof t != "string" ? null : ud[t] || null;
}
const gd = {
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
  "card.allergen.mold_spores": "Plísňové spory",
  "card.allergen.mugwort": "Pelyněk",
  "card.allergen.nettle": "Kopřiva",
  "card.allergen.nettle_and_pellitory": "Kopřiva a parietárie",
  "card.allergen.oak": "Dub",
  "card.allergen.olive": "Olivovník",
  "card.allergen.pine": "Borovice",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Jitrocel",
  "card.allergen.poaceae": "Traviny",
  "card.allergen.poplar": "Topol",
  "card.allergen.ragweed": "Ambrozie",
  "card.allergen.rye": "Žito",
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
  "card.error_no_sensors": "Nenalezeny žádné pylové senzory. Je správná integrace nainstalována a vybrán region v nastavení karty?",
  "card.header_prefix": "Pylová předpověď pro",
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
  "card.loading_forecast": "Načítání předpovědi...",
  "card.location.plu": "Lucembursko",
  "card.no_allergens": "Žádné alergeny",
  "card.no_information": "(Žádné informace)",
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
  "editor.phrases_full.mold_spores": "Plísňové spory",
  "editor.phrases_full.mugwort": "Pelyněk",
  "editor.phrases_full.nettle": "Kopřiva",
  "editor.phrases_full.nettle_and_pellitory": "Kopřiva a parietárie",
  "editor.phrases_full.oak": "Dub",
  "editor.phrases_full.olive": "Olivovník",
  "editor.phrases_full.pine": "Borovice",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Jitrocel",
  "editor.phrases_full.poaceae": "Traviny",
  "editor.phrases_full.poplar": "Topol",
  "editor.phrases_full.ragweed": "Ambrozie",
  "editor.phrases_full.rye": "Žito",
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
  "editor.phrases_short.mold_spores": "Plísně",
  "editor.phrases_short.mugwort": "Pelyněk",
  "editor.phrases_short.nettle": "Kopřiv",
  "editor.phrases_short.nettle_and_pellitory": "Kopřiva",
  "editor.phrases_short.oak": "Dub",
  "editor.phrases_short.olive": "Oliv.",
  "editor.phrases_short.pine": "Borovi",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Jitrc",
  "editor.phrases_short.poaceae": "Travin",
  "editor.phrases_short.poplar": "Topol",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Žito",
  "editor.phrases_short.sorrel": "Šťov",
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
}, _d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gd
}, Symbol.toStringTag, { value: "Module" })), fd = {
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
  "card.allergen.mold_spores": "Skimmelsvampe",
  "card.allergen.mugwort": "Malurt",
  "card.allergen.nettle": "Nælde",
  "card.allergen.nettle_and_pellitory": "Brændenælde og parietaria",
  "card.allergen.oak": "Eg",
  "card.allergen.olive": "Oliven",
  "card.allergen.pine": "Fyr",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Vejbred",
  "card.allergen.poaceae": "Græsser",
  "card.allergen.poplar": "Poppel",
  "card.allergen.ragweed": "Ambrosie",
  "card.allergen.rye": "Rug",
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
  "card.error_no_sensors": "Ingen pollensensor fundet. Har du installeret den korrekte integration og valgt region i kortets opsætning?",
  "card.header_prefix": "Pollenprognose for",
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
  "card.loading_forecast": "Indlæser prognose...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Ingen allergener",
  "card.no_information": "(Ingen information)",
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
  "editor.phrases_full.mold_spores": "Skimmelsvampe",
  "editor.phrases_full.mugwort": "Malurt",
  "editor.phrases_full.nettle": "Nælde",
  "editor.phrases_full.nettle_and_pellitory": "Brændenælde og parietaria",
  "editor.phrases_full.oak": "Eg",
  "editor.phrases_full.olive": "Oliven",
  "editor.phrases_full.pine": "Fyr",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Vejbred",
  "editor.phrases_full.poaceae": "Græsser",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.ragweed": "Ambrosie",
  "editor.phrases_full.rye": "Rug",
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
  "editor.phrases_short.mold_spores": "Skimmel",
  "editor.phrases_short.mugwort": "Malurt",
  "editor.phrases_short.nettle": "Nælde",
  "editor.phrases_short.nettle_and_pellitory": "Nælde",
  "editor.phrases_short.oak": "Eg",
  "editor.phrases_short.olive": "Oliven",
  "editor.phrases_short.pine": "Fyr",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Vejbr",
  "editor.phrases_short.poaceae": "Græs",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.ragweed": "Ambrosie",
  "editor.phrases_short.rye": "Rug",
  "editor.phrases_short.sorrel": "Syre",
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
}, pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fd
}, Symbol.toStringTag, { value: "Module" })), md = {
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
  "card.allergen.mold_spores": "Schimmelsporen",
  "card.allergen.mugwort": "Beifuß",
  "card.allergen.nettle": "Brennnessel",
  "card.allergen.nettle_and_pellitory": "Nessel & Parietarie",
  "card.allergen.oak": "Eiche",
  "card.allergen.olive": "Olive",
  "card.allergen.pine": "Kiefer",
  "card.allergen.plane": "Platane",
  "card.allergen.plantain": "Wegerich",
  "card.allergen.poaceae": "Gräser",
  "card.allergen.poplar": "Pappel",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Roggen",
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
  "card.error_no_sensors": "Keine Pollen-Sensoren gefunden. Haben Sie die richtige Integration installiert und eine Region in der Kartenkonfiguration ausgewählt?",
  "card.header_prefix": "Pollenprognose für",
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
  "card.loading_forecast": "Vorhersage wird geladen...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Keine Allergene",
  "card.no_information": "(Keine Information)",
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
  "editor.phrases_full.mold_spores": "Schimmelsporen",
  "editor.phrases_full.mugwort": "Beifuß",
  "editor.phrases_full.nettle": "Brennnessel",
  "editor.phrases_full.nettle_and_pellitory": "Nessel & Parietarie",
  "editor.phrases_full.oak": "Eiche",
  "editor.phrases_full.olive": "Olive",
  "editor.phrases_full.pine": "Kiefer",
  "editor.phrases_full.plane": "Platane",
  "editor.phrases_full.plantain": "Wegerich",
  "editor.phrases_full.poaceae": "Gräser",
  "editor.phrases_full.poplar": "Pappel",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Roggen",
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
  "editor.phrases_short.mold_spores": "Schimmel",
  "editor.phrases_short.mugwort": "Beifu",
  "editor.phrases_short.nettle": "Brenns",
  "editor.phrases_short.nettle_and_pellitory": "Nessel",
  "editor.phrases_short.oak": "Eiche",
  "editor.phrases_short.olive": "Olive",
  "editor.phrases_short.pine": "Kiefer",
  "editor.phrases_short.plane": "Plat.",
  "editor.phrases_short.plantain": "Weg",
  "editor.phrases_short.poaceae": "Gräser",
  "editor.phrases_short.poplar": "Pappel",
  "editor.phrases_short.ragweed": "Ambro",
  "editor.phrases_short.rye": "Roggn",
  "editor.phrases_short.sorrel": "Ampf",
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
}, yd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: md
}, Symbol.toStringTag, { value: "Module" })), vd = {
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
  "card.allergen.sorrel": "Sorrel",
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
  "card.stale_data": "Pollen data temporarily unavailable",
  "card.stale_data_subtitle": "The provider is not currently returning data for this region",
  "card.stale_allergen": "No data",
  "card.header_prefix": "Pollen forecast for",
  "card.location.plu": "Luxembourg",
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
  "editor.phrases_full.plantain": "Plantain",
  "editor.phrases_full.sorrel": "Sorrel",
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
  "editor.phrases_short.goosefoot": "Gfoot",
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
  "editor.phrases_short.plantain": "Plntn",
  "editor.phrases_short.poplar": "Poplar",
  "editor.phrases_short.ragweed": "Rgwd",
  "editor.phrases_short.sorrel": "Sorrl",
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
}, bd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vd
}, Symbol.toStringTag, { value: "Module" })), xd = {
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
  "card.allergen.mold_spores": "Homeitiöt",
  "card.allergen.mugwort": "Pujo",
  "card.allergen.nettle": "Nokkonen",
  "card.allergen.nettle_and_pellitory": "Nokkonen ja piilehtipensas",
  "card.allergen.oak": "Tammi",
  "card.allergen.olive": "Oliivipuu",
  "card.allergen.pine": "Mänty",
  "card.allergen.plane": "Plataanipuu",
  "card.allergen.plantain": "Ratamo",
  "card.allergen.poaceae": "Heinät",
  "card.allergen.poplar": "Haapa",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Ruis",
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
  "card.error_no_sensors": "Pölytysantureita ei löytynyt. Oletko asentanut oikean integraation ja valinnut alueen kortin asetuksista?",
  "card.header_prefix": "Siitepölyennuste kohteessa",
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
  "card.loading_forecast": "Ennustetta ladataan...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Ei allergeeneja",
  "card.no_information": "(Ei tietoa)",
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
  "editor.phrases_full.mold_spores": "Homeitiöt",
  "editor.phrases_full.mugwort": "Pujo",
  "editor.phrases_full.nettle": "Nokkonen",
  "editor.phrases_full.nettle_and_pellitory": "Nokkonen ja piilehtipensas",
  "editor.phrases_full.oak": "Tammi",
  "editor.phrases_full.olive": "Oliivipuu",
  "editor.phrases_full.pine": "Mänty",
  "editor.phrases_full.plane": "Plataanipuu",
  "editor.phrases_full.plantain": "Ratamo",
  "editor.phrases_full.poaceae": "Heinät",
  "editor.phrases_full.poplar": "Popppeli",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Ruis",
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
  "editor.phrases_short.mold_spores": "Home",
  "editor.phrases_short.mugwort": "Pujo",
  "editor.phrases_short.nettle": "Nokkon",
  "editor.phrases_short.nettle_and_pellitory": "Nokkonen",
  "editor.phrases_short.oak": "Tammi",
  "editor.phrases_short.olive": "Oliivi",
  "editor.phrases_short.pine": "Mänty",
  "editor.phrases_short.plane": "Plataani",
  "editor.phrases_short.plantain": "Ratam",
  "editor.phrases_short.poaceae": "Heinät",
  "editor.phrases_short.poplar": "Haapa",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Ruis",
  "editor.phrases_short.sorrel": "Suol",
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
}, wd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xd
}, Symbol.toStringTag, { value: "Module" })), kd = {
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
  "card.allergen.mold_spores": "Spores de moisissure",
  "card.allergen.mugwort": "Armoise",
  "card.allergen.nettle": "Ortie",
  "card.allergen.nettle_and_pellitory": "Ortie et pariétaire",
  "card.allergen.oak": "Chêne",
  "card.allergen.olive": "Olivier",
  "card.allergen.pine": "Pin",
  "card.allergen.plane": "Platane",
  "card.allergen.plantain": "Plantain",
  "card.allergen.poaceae": "Graminées",
  "card.allergen.poplar": "Peuplier",
  "card.allergen.ragweed": "Ambroisie",
  "card.allergen.rye": "Seigle",
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
  "card.error_no_sensors": "Aucun capteur de pollen trouvé. Avez-vous installé la bonne intégration et sélectionné une région dans la configuration de la carte ?",
  "card.header_prefix": "Prévisions des pollens pour",
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
  "card.loading_forecast": "Chargement des prévisions...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Aucun allergène",
  "card.no_information": "(Aucune information)",
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
  "editor.phrases_full.mold_spores": "Spores de moisissure",
  "editor.phrases_full.mugwort": "Armoise",
  "editor.phrases_full.nettle": "Ortie",
  "editor.phrases_full.nettle_and_pellitory": "Ortie et pariétaire",
  "editor.phrases_full.oak": "Chêne",
  "editor.phrases_full.olive": "Olivier",
  "editor.phrases_full.pine": "Pin",
  "editor.phrases_full.plane": "Platane",
  "editor.phrases_full.plantain": "Plantain",
  "editor.phrases_full.poaceae": "Graminées",
  "editor.phrases_full.poplar": "Peuplier",
  "editor.phrases_full.ragweed": "Ambroisie",
  "editor.phrases_full.rye": "Seigle",
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
  "editor.phrases_short.mold_spores": "Moisissure",
  "editor.phrases_short.mugwort": "Armoise",
  "editor.phrases_short.nettle": "Ortie",
  "editor.phrases_short.nettle_and_pellitory": "Ortie",
  "editor.phrases_short.oak": "Chêne",
  "editor.phrases_short.olive": "Olivier",
  "editor.phrases_short.pine": "Pin",
  "editor.phrases_short.plane": "Platane",
  "editor.phrases_short.plantain": "Plant",
  "editor.phrases_short.poaceae": "Gramin",
  "editor.phrases_short.poplar": "Peupl",
  "editor.phrases_short.ragweed": "Ambroisie",
  "editor.phrases_short.rye": "Seigle",
  "editor.phrases_short.sorrel": "Osel",
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
}, Sd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kd
}, Symbol.toStringTag, { value: "Module" })), Ad = {
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
  "card.allergen.mold_spores": "Spore di muffa",
  "card.allergen.mugwort": "Artemisia",
  "card.allergen.nettle": "Ortica",
  "card.allergen.nettle_and_pellitory": "Ortica e parietaria",
  "card.allergen.oak": "Quercia",
  "card.allergen.olive": "Olivo",
  "card.allergen.pine": "Pino",
  "card.allergen.plane": "Platano",
  "card.allergen.plantain": "Piantaggine",
  "card.allergen.poaceae": "Graminacee",
  "card.allergen.poplar": "Pioppo",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Segale",
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
  "card.error_no_sensors": "Nessun sensore di polline trovato. Hai installato l'integrazione corretta e selezionato una regione nella configurazione della scheda?",
  "card.header_prefix": "Previsione pollini per",
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
  "card.loading_forecast": "Caricamento previsione...",
  "card.location.plu": "Lussemburgo",
  "card.no_allergens": "Nessun allergene",
  "card.no_information": "(Nessuna informazione)",
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
  "editor.phrases_full.mold_spores": "Spore di muffa",
  "editor.phrases_full.mugwort": "Artemisia",
  "editor.phrases_full.nettle": "Ortica",
  "editor.phrases_full.nettle_and_pellitory": "Ortica e parietaria",
  "editor.phrases_full.oak": "Quercia",
  "editor.phrases_full.olive": "Olivo",
  "editor.phrases_full.pine": "Pino",
  "editor.phrases_full.plane": "Platano",
  "editor.phrases_full.plantain": "Piantaggine",
  "editor.phrases_full.poaceae": "Graminacee",
  "editor.phrases_full.poplar": "Pioppo",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Segale",
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
  "editor.phrases_short.mold_spores": "Muffa",
  "editor.phrases_short.mugwort": "Art.",
  "editor.phrases_short.nettle": "Ortic",
  "editor.phrases_short.nettle_and_pellitory": "Ortica",
  "editor.phrases_short.oak": "Quer.",
  "editor.phrases_short.olive": "Olivo",
  "editor.phrases_short.pine": "Pino",
  "editor.phrases_short.plane": "Plat.",
  "editor.phrases_short.plantain": "Piant",
  "editor.phrases_short.poaceae": "Gramin",
  "editor.phrases_short.poplar": "Pioppo",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Segale",
  "editor.phrases_short.sorrel": "Rom",
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
}, Cd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ad
}, Symbol.toStringTag, { value: "Module" })), Ed = {
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
  "card.allergen.mold_spores": "Schimmelsporen",
  "card.allergen.mugwort": "Bijvoet",
  "card.allergen.nettle": "Brandnetel",
  "card.allergen.nettle_and_pellitory": "Brandnetel en muur",
  "card.allergen.oak": "Eik",
  "card.allergen.olive": "Olijf",
  "card.allergen.pine": "Dennen",
  "card.allergen.plane": "Plataan",
  "card.allergen.plantain": "Weegbree",
  "card.allergen.poaceae": "Grassen",
  "card.allergen.poplar": "Populier",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Rogge",
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
  "card.error_no_sensors": "Geen pollensensoren gevonden. Heb je de juiste integratie geïnstalleerd en een regio gekozen in de kaartinstellingen?",
  "card.header_prefix": "Pollenverwachting voor",
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
  "card.loading_forecast": "Voorspelling wordt geladen...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Geen allergenen",
  "card.no_information": "(Geen informatie)",
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
  "editor.phrases_full.mold_spores": "Schimmelsporen",
  "editor.phrases_full.mugwort": "Bijvoet",
  "editor.phrases_full.nettle": "Brandnetel",
  "editor.phrases_full.nettle_and_pellitory": "Brandnetel en muur",
  "editor.phrases_full.oak": "Eik",
  "editor.phrases_full.olive": "Olijf",
  "editor.phrases_full.pine": "Den",
  "editor.phrases_full.plane": "Plataan",
  "editor.phrases_full.plantain": "Weegbree",
  "editor.phrases_full.poaceae": "Grassen",
  "editor.phrases_full.poplar": "Populier",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Rogge",
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
  "editor.phrases_short.mold_spores": "Schimmel",
  "editor.phrases_short.mugwort": "Bijvoet",
  "editor.phrases_short.nettle": "Brandn",
  "editor.phrases_short.nettle_and_pellitory": "Netel",
  "editor.phrases_short.oak": "Eik",
  "editor.phrases_short.olive": "Olijf",
  "editor.phrases_short.pine": "Dennen",
  "editor.phrases_short.plane": "Plataan",
  "editor.phrases_short.plantain": "Weeg",
  "editor.phrases_short.poaceae": "Gras",
  "editor.phrases_short.poplar": "Popul",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Rogge",
  "editor.phrases_short.sorrel": "Zur",
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
}, Pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ed
}, Symbol.toStringTag, { value: "Module" })), Md = {
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
  "card.allergen.mold_spores": "Muggsporer",
  "card.allergen.mugwort": "Malurt",
  "card.allergen.nettle": "Brennesle",
  "card.allergen.nettle_and_pellitory": "Brennesle og murgrønn",
  "card.allergen.oak": "Eik",
  "card.allergen.olive": "Oliven",
  "card.allergen.pine": "Furu",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Groblad",
  "card.allergen.poaceae": "Gress",
  "card.allergen.poplar": "Poppel",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Rug",
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
  "card.error_no_sensors": "Ingen pollensensor funnet. Har du installert riktig integrasjon og valgt region i kortoppsettet?",
  "card.header_prefix": "Pollenvarsel for",
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
  "card.loading_forecast": "Laster prognose...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Ingen allergener",
  "card.no_information": "(Ingen informasjon)",
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
  "editor.phrases_full.mold_spores": "Muggsporer",
  "editor.phrases_full.mugwort": "Malurt",
  "editor.phrases_full.nettle": "Brennesle",
  "editor.phrases_full.nettle_and_pellitory": "Brennesle og murgrønn",
  "editor.phrases_full.oak": "Eik",
  "editor.phrases_full.olive": "Oliven",
  "editor.phrases_full.pine": "Furu",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Groblad",
  "editor.phrases_full.poaceae": "Gress",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Rug",
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
  "editor.phrases_short.mold_spores": "Mugg",
  "editor.phrases_short.mugwort": "Malurt",
  "editor.phrases_short.nettle": "Brenns",
  "editor.phrases_short.nettle_and_pellitory": "Brennesle",
  "editor.phrases_short.oak": "Eik",
  "editor.phrases_short.olive": "Oliven",
  "editor.phrases_short.pine": "Furu",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Grob",
  "editor.phrases_short.poaceae": "Gress",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Rug",
  "editor.phrases_short.sorrel": "Syr",
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
}, $d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Md
}, Symbol.toStringTag, { value: "Module" })), Ld = {
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
  "card.allergen.mold_spores": "Zarodniki pleśni",
  "card.allergen.mugwort": "Bylica",
  "card.allergen.nettle": "Pokrzywa",
  "card.allergen.nettle_and_pellitory": "Pokrzywa i parietaria",
  "card.allergen.oak": "Dąb",
  "card.allergen.olive": "Oliwka",
  "card.allergen.pine": "Sosna",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Babka",
  "card.allergen.poaceae": "Poaceae",
  "card.allergen.poplar": "Topola",
  "card.allergen.ragweed": "Ambrozja",
  "card.allergen.rye": "Żyto",
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
  "card.error_no_sensors": "Brak sensorów pyłków. Czy masz zainstalowaną właściwą integrację i wybrałeś region w konfiguracji karty?",
  "card.header_prefix": "Prognoza pylenia dla",
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
  "card.loading_forecast": "Odczyt prognozy...",
  "card.location.plu": "Luksemburg",
  "card.no_allergens": "Brak alergenów",
  "card.no_information": "(Brak informacji)",
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
  "editor.allergens_header_specific": "Poszczególne alergeny (konkretne)",
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
  "editor.phrases_full.mold_spores": "Zarodniki pleśni",
  "editor.phrases_full.mugwort": "Bylica",
  "editor.phrases_full.nettle": "Pokrzywa",
  "editor.phrases_full.nettle_and_pellitory": "Pokrzywa i parietaria",
  "editor.phrases_full.oak": "Dąb",
  "editor.phrases_full.olive": "Oliwka",
  "editor.phrases_full.pine": "Sosna",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Babka",
  "editor.phrases_full.poaceae": "Poaceae",
  "editor.phrases_full.poplar": "Topola",
  "editor.phrases_full.ragweed": "Ambrozja",
  "editor.phrases_full.rye": "Żyto",
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
  "editor.phrases_short.mold_spores": "Pleśń",
  "editor.phrases_short.mugwort": "Bylica",
  "editor.phrases_short.nettle": "Pokrz.",
  "editor.phrases_short.nettle_and_pellitory": "Pokrz.",
  "editor.phrases_short.oak": "Dąb",
  "editor.phrases_short.olive": "Oliwka",
  "editor.phrases_short.pine": "Sosna",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Babka",
  "editor.phrases_short.poaceae": "Poaceae",
  "editor.phrases_short.poplar": "Topola",
  "editor.phrases_short.ragweed": "Ambrozja",
  "editor.phrases_short.rye": "Żyto",
  "editor.phrases_short.sorrel": "Szczaw",
  "editor.phrases_short.trees": "Drzewa",
  "editor.phrases_short.trees_cat": "Drz. krz.",
  "editor.phrases_short.weeds": "Chwasty",
  "editor.phrases_short.weeds_cat": "Chwasty",
  "editor.phrases_short.willow": "Wierzba",
  "editor.phrases_translate_all": "Tłumacz wszystko",
  "editor.pollen_threshold": "Próg:",
  "editor.preset_reset_all": "Przywróć ustawienia",
  "editor.region_id": "ID regionu",
  "editor.select_all_allergens": "Wybierz wszystkie alergeny",
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
}, Dd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ld
}, Symbol.toStringTag, { value: "Module" })), Td = {
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
  "card.allergen.mold_spores": "Споры плесени",
  "card.allergen.mugwort": "Полынь",
  "card.allergen.nettle": "Крапива",
  "card.allergen.nettle_and_pellitory": "Крапива и парьетария",
  "card.allergen.oak": "Дуб",
  "card.allergen.olive": "Олива",
  "card.allergen.pine": "Сосна",
  "card.allergen.plane": "Платан",
  "card.allergen.plantain": "Подорожник",
  "card.allergen.poaceae": "Злаки",
  "card.allergen.poplar": "Тополь",
  "card.allergen.ragweed": "Амброзия",
  "card.allergen.rye": "Рожь",
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
  "card.error_no_sensors": "Датчики пыльцы не найдены. Установлена ли нужная интеграция и выбран ли регион в настройках карточки?",
  "card.header_prefix": "Прогноз пыльцы для",
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
  "card.loading_forecast": "Загрузка прогноза...",
  "card.location.plu": "Люксембург",
  "card.no_allergens": "Нет аллергенов",
  "card.no_information": "(Нет информации)",
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
  "editor.phrases_full.mold_spores": "Споры плесени",
  "editor.phrases_full.mugwort": "Полынь",
  "editor.phrases_full.nettle": "Крапива",
  "editor.phrases_full.nettle_and_pellitory": "Крапива и парьетария",
  "editor.phrases_full.oak": "Дуб",
  "editor.phrases_full.olive": "Олива",
  "editor.phrases_full.pine": "Сосна",
  "editor.phrases_full.plane": "Платан",
  "editor.phrases_full.plantain": "Подорожник",
  "editor.phrases_full.poaceae": "Злаки",
  "editor.phrases_full.poplar": "Тополь",
  "editor.phrases_full.ragweed": "Амброзия",
  "editor.phrases_full.rye": "Рожь",
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
  "editor.phrases_short.mold_spores": "Плесень",
  "editor.phrases_short.mugwort": "Полынь",
  "editor.phrases_short.nettle": "Крапив",
  "editor.phrases_short.nettle_and_pellitory": "Крапива",
  "editor.phrases_short.oak": "Дуб",
  "editor.phrases_short.olive": "Олива",
  "editor.phrases_short.pine": "Сосна",
  "editor.phrases_short.plane": "Платан",
  "editor.phrases_short.plantain": "Подор",
  "editor.phrases_short.poaceae": "Злаки",
  "editor.phrases_short.poplar": "Топол",
  "editor.phrases_short.ragweed": "Амбр.",
  "editor.phrases_short.rye": "Рожь",
  "editor.phrases_short.sorrel": "Щав",
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
}, zd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Td
}, Symbol.toStringTag, { value: "Module" })), Od = {
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
  "card.allergen.mold_spores": "Spóry plesní",
  "card.allergen.mugwort": "Palina",
  "card.allergen.nettle": "Žihľava",
  "card.allergen.nettle_and_pellitory": "Žihľava a parietária",
  "card.allergen.oak": "Dub",
  "card.allergen.olive": "Olivovník",
  "card.allergen.pine": "Borovica",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Skorocel",
  "card.allergen.poaceae": "Trávy",
  "card.allergen.poplar": "Topoľ",
  "card.allergen.ragweed": "Ambrozia",
  "card.allergen.rye": "Raž",
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
  "card.error_no_sensors": "Žiadne peľové senzory nenájdené. Je nainštalovaná správna integrácia a zvolený región v nastavení karty?",
  "card.header_prefix": "Peľová predpoveď pre",
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
  "card.loading_forecast": "Načítava sa predpoveď...",
  "card.location.plu": "Luxembursko",
  "card.no_allergens": "Žiadne alergény",
  "card.no_information": "(Žiadne informácie)",
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
  "editor.phrases_full.mold_spores": "Spóry plesní",
  "editor.phrases_full.mugwort": "Palina",
  "editor.phrases_full.nettle": "Žihľava",
  "editor.phrases_full.nettle_and_pellitory": "Žihľava a parietária",
  "editor.phrases_full.oak": "Dub",
  "editor.phrases_full.olive": "Olivovník",
  "editor.phrases_full.pine": "Borovica",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Skorocel",
  "editor.phrases_full.poaceae": "Trávy",
  "editor.phrases_full.poplar": "Topoľ",
  "editor.phrases_full.ragweed": "Ambrozia",
  "editor.phrases_full.rye": "Raž",
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
  "editor.phrases_short.mold_spores": "Plesne",
  "editor.phrases_short.mugwort": "Palina",
  "editor.phrases_short.nettle": "Žihľav",
  "editor.phrases_short.nettle_and_pellitory": "Žihľava",
  "editor.phrases_short.oak": "Dub",
  "editor.phrases_short.olive": "Oliv.",
  "editor.phrases_short.pine": "Borovi",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Skor",
  "editor.phrases_short.poaceae": "Trávy",
  "editor.phrases_short.poplar": "Topoľ",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Raž",
  "editor.phrases_short.sorrel": "Šťav",
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
}, Rd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Od
}, Symbol.toStringTag, { value: "Module" })), Id = {
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
  "card.allergen.mold_spores": "Mögelsporer",
  "card.allergen.mugwort": "Gråbo",
  "card.allergen.nettle": "Brännässla",
  "card.allergen.nettle_and_pellitory": "Nässla & parietaria",
  "card.allergen.oak": "Ek",
  "card.allergen.olive": "Oliv",
  "card.allergen.pine": "Tall",
  "card.allergen.plane": "Platan",
  "card.allergen.plantain": "Groblad",
  "card.allergen.poaceae": "Gräs",
  "card.allergen.poplar": "Poppel",
  "card.allergen.ragweed": "Malörtsambrosia",
  "card.allergen.rye": "Råg",
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
  "card.error_no_sensors": "Inga pollen-sensorer hittades. Har du installerat rätt integration och valt region i kortets konfiguration?",
  "card.header_prefix": "Pollenprognos för",
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
  "card.loading_forecast": "Laddar prognos...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Inga allergener",
  "card.no_information": "(Ingen information)",
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
  "editor.phrases_full.mold_spores": "Mögelsporer",
  "editor.phrases_full.mugwort": "Gråbo",
  "editor.phrases_full.nettle": "Brännässla",
  "editor.phrases_full.nettle_and_pellitory": "Nässla & parietaria",
  "editor.phrases_full.oak": "Ek",
  "editor.phrases_full.olive": "Oliv",
  "editor.phrases_full.pine": "Tall",
  "editor.phrases_full.plane": "Platan",
  "editor.phrases_full.plantain": "Groblad",
  "editor.phrases_full.poaceae": "Gräs",
  "editor.phrases_full.poplar": "Poppel",
  "editor.phrases_full.ragweed": "Malörtsambrosia",
  "editor.phrases_full.rye": "Råg",
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
  "editor.phrases_short.mold_spores": "Mögel",
  "editor.phrases_short.mugwort": "Gråbo",
  "editor.phrases_short.nettle": "Bränns",
  "editor.phrases_short.nettle_and_pellitory": "Nässla",
  "editor.phrases_short.oak": "Ek",
  "editor.phrases_short.olive": "Oliv",
  "editor.phrases_short.pine": "Tall",
  "editor.phrases_short.plane": "Platan",
  "editor.phrases_short.plantain": "Grob",
  "editor.phrases_short.poaceae": "Gräs",
  "editor.phrases_short.poplar": "Poppel",
  "editor.phrases_short.ragweed": "Ambro",
  "editor.phrases_short.rye": "Råg",
  "editor.phrases_short.sorrel": "Skrä",
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
}, Nd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Id
}, Symbol.toStringTag, { value: "Module" }));
var ss = function(t, e) {
  return ss = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
    i.__proto__ = r;
  } || function(i, r) {
    for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (i[s] = r[s]);
  }, ss(t, e);
};
function _r(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  ss(t, e);
  function i() {
    this.constructor = t;
  }
  t.prototype = e === null ? Object.create(e) : (i.prototype = e.prototype, new i());
}
var Q = function() {
  return Q = Object.assign || function(e) {
    for (var i, r = 1, s = arguments.length; r < s; r++) {
      i = arguments[r];
      for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o]);
    }
    return e;
  }, Q.apply(this, arguments);
};
function Bd(t, e) {
  var i = {};
  for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (i[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(t); s < r.length; s++)
      e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[s]) && (i[r[s]] = t[r[s]]);
  return i;
}
function Dr(t, e, i) {
  if (i || arguments.length === 2) for (var r = 0, s = e.length, o; r < s; r++)
    (o || !(r in e)) && (o || (o = Array.prototype.slice.call(e, 0, r)), o[r] = e[r]);
  return t.concat(o || Array.prototype.slice.call(e));
}
function Tr(t, e) {
  var i = e && e.cache ? e.cache : Wd, r = e && e.serializer ? e.serializer : Ud, s = e && e.strategy ? e.strategy : jd;
  return s(t, {
    cache: i,
    serializer: r
  });
}
function Hd(t) {
  return t == null || typeof t == "number" || typeof t == "boolean";
}
function Fd(t, e, i, r) {
  var s = Hd(r) ? r : i(r), o = e.get(s);
  return typeof o > "u" && (o = t.call(this, r), e.set(s, o)), o;
}
function ia(t, e, i) {
  var r = Array.prototype.slice.call(arguments, 3), s = i(r), o = e.get(s);
  return typeof o > "u" && (o = t.apply(this, r), e.set(s, o)), o;
}
function ra(t, e, i, r, s) {
  return i.bind(e, t, r, s);
}
function jd(t, e) {
  var i = t.length === 1 ? Fd : ia;
  return ra(t, this, i, e.cache.create(), e.serializer);
}
function Gd(t, e) {
  return ra(t, this, ia, e.cache.create(), e.serializer);
}
var Ud = function() {
  return JSON.stringify(arguments);
}, Vd = (
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
), Wd = {
  create: function() {
    return new Vd();
  }
}, zr = {
  variadic: Gd
}, q;
(function(t) {
  t[t.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", t[t.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", t[t.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", t[t.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", t[t.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", t[t.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", t[t.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", t[t.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", t[t.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", t[t.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", t[t.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", t[t.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", t[t.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", t[t.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", t[t.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", t[t.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", t[t.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", t[t.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", t[t.INVALID_TAG = 23] = "INVALID_TAG", t[t.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", t[t.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", t[t.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(q || (q = {}));
var ae;
(function(t) {
  t[t.literal = 0] = "literal", t[t.argument = 1] = "argument", t[t.number = 2] = "number", t[t.date = 3] = "date", t[t.time = 4] = "time", t[t.select = 5] = "select", t[t.plural = 6] = "plural", t[t.pound = 7] = "pound", t[t.tag = 8] = "tag";
})(ae || (ae = {}));
var Nt;
(function(t) {
  t[t.number = 0] = "number", t[t.dateTime = 1] = "dateTime";
})(Nt || (Nt = {}));
function ho(t) {
  return t.type === ae.literal;
}
function Kd(t) {
  return t.type === ae.argument;
}
function sa(t) {
  return t.type === ae.number;
}
function oa(t) {
  return t.type === ae.date;
}
function na(t) {
  return t.type === ae.time;
}
function aa(t) {
  return t.type === ae.select;
}
function la(t) {
  return t.type === ae.plural;
}
function Yd(t) {
  return t.type === ae.pound;
}
function da(t) {
  return t.type === ae.tag;
}
function ca(t) {
  return !!(t && typeof t == "object" && t.type === Nt.number);
}
function os(t) {
  return !!(t && typeof t == "object" && t.type === Nt.dateTime);
}
var ha = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, Xd = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function Zd(t) {
  var e = {};
  return t.replace(Xd, function(i) {
    var r = i.length;
    switch (i[0]) {
      // Era
      case "G":
        e.era = r === 4 ? "long" : r === 5 ? "narrow" : "short";
        break;
      // Year
      case "y":
        e.year = r === 2 ? "2-digit" : "numeric";
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
        e.month = ["numeric", "2-digit", "short", "long", "narrow"][r - 1];
        break;
      // Week
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        e.day = ["numeric", "2-digit"][r - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      // Weekday
      case "E":
        e.weekday = r === 4 ? "long" : r === 5 ? "narrow" : "short";
        break;
      case "e":
        if (r < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][r - 4];
        break;
      case "c":
        if (r < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        e.weekday = ["short", "long", "narrow", "short"][r - 4];
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
        e.hourCycle = "h12", e.hour = ["numeric", "2-digit"][r - 1];
        break;
      case "H":
        e.hourCycle = "h23", e.hour = ["numeric", "2-digit"][r - 1];
        break;
      case "K":
        e.hourCycle = "h11", e.hour = ["numeric", "2-digit"][r - 1];
        break;
      case "k":
        e.hourCycle = "h24", e.hour = ["numeric", "2-digit"][r - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      // Minute
      case "m":
        e.minute = ["numeric", "2-digit"][r - 1];
        break;
      // Second
      case "s":
        e.second = ["numeric", "2-digit"][r - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      // Zone
      case "z":
        e.timeZoneName = r < 4 ? "short" : "long";
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
var qd = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function Jd(t) {
  if (t.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var e = t.split(qd).filter(function(u) {
    return u.length > 0;
  }), i = [], r = 0, s = e; r < s.length; r++) {
    var o = s[r], a = o.split("/");
    if (a.length === 0)
      throw new Error("Invalid number skeleton");
    for (var n = a[0], l = a.slice(1), d = 0, c = l; d < c.length; d++) {
      var h = c[d];
      if (h.length === 0)
        throw new Error("Invalid number skeleton");
    }
    i.push({ stem: n, options: l });
  }
  return i;
}
function Qd(t) {
  return t.replace(/^(.*?)-/, "");
}
var uo = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, ua = /^(@+)?(\+|#+)?[rs]?$/g, ec = /(\*)(0+)|(#+)(0+)|(0+)/g, ga = /^(0+)$/;
function go(t) {
  var e = {};
  return t[t.length - 1] === "r" ? e.roundingPriority = "morePrecision" : t[t.length - 1] === "s" && (e.roundingPriority = "lessPrecision"), t.replace(ua, function(i, r, s) {
    return typeof s != "string" ? (e.minimumSignificantDigits = r.length, e.maximumSignificantDigits = r.length) : s === "+" ? e.minimumSignificantDigits = r.length : r[0] === "#" ? e.maximumSignificantDigits = r.length : (e.minimumSignificantDigits = r.length, e.maximumSignificantDigits = r.length + (typeof s == "string" ? s.length : 0)), "";
  }), e;
}
function _a(t) {
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
function tc(t) {
  var e;
  if (t[0] === "E" && t[1] === "E" ? (e = {
    notation: "engineering"
  }, t = t.slice(2)) : t[0] === "E" && (e = {
    notation: "scientific"
  }, t = t.slice(1)), e) {
    var i = t.slice(0, 2);
    if (i === "+!" ? (e.signDisplay = "always", t = t.slice(2)) : i === "+?" && (e.signDisplay = "exceptZero", t = t.slice(2)), !ga.test(t))
      throw new Error("Malformed concise eng/scientific notation");
    e.minimumIntegerDigits = t.length;
  }
  return e;
}
function _o(t) {
  var e = {}, i = _a(t);
  return i || e;
}
function ic(t) {
  for (var e = {}, i = 0, r = t; i < r.length; i++) {
    var s = r[i];
    switch (s.stem) {
      case "percent":
      case "%":
        e.style = "percent";
        continue;
      case "%x100":
        e.style = "percent", e.scale = 100;
        continue;
      case "currency":
        e.style = "currency", e.currency = s.options[0];
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
        e.style = "unit", e.unit = Qd(s.options[0]);
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
        e = Q(Q(Q({}, e), { notation: "scientific" }), s.options.reduce(function(l, d) {
          return Q(Q({}, l), _o(d));
        }, {}));
        continue;
      case "engineering":
        e = Q(Q(Q({}, e), { notation: "engineering" }), s.options.reduce(function(l, d) {
          return Q(Q({}, l), _o(d));
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
        e.scale = parseFloat(s.options[0]);
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
        if (s.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        s.options[0].replace(ec, function(l, d, c, h, u, g) {
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
    if (ga.test(s.stem)) {
      e.minimumIntegerDigits = s.stem.length;
      continue;
    }
    if (uo.test(s.stem)) {
      if (s.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      s.stem.replace(uo, function(l, d, c, h, u, g) {
        return c === "*" ? e.minimumFractionDigits = d.length : h && h[0] === "#" ? e.maximumFractionDigits = h.length : u && g ? (e.minimumFractionDigits = u.length, e.maximumFractionDigits = u.length + g.length) : (e.minimumFractionDigits = d.length, e.maximumFractionDigits = d.length), "";
      });
      var o = s.options[0];
      o === "w" ? e = Q(Q({}, e), { trailingZeroDisplay: "stripIfInteger" }) : o && (e = Q(Q({}, e), go(o)));
      continue;
    }
    if (ua.test(s.stem)) {
      e = Q(Q({}, e), go(s.stem));
      continue;
    }
    var a = _a(s.stem);
    a && (e = Q(Q({}, e), a));
    var n = tc(s.stem);
    n && (e = Q(Q({}, e), n));
  }
  return e;
}
var Ei = {
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
function rc(t, e) {
  for (var i = "", r = 0; r < t.length; r++) {
    var s = t.charAt(r);
    if (s === "j") {
      for (var o = 0; r + 1 < t.length && t.charAt(r + 1) === s; )
        o++, r++;
      var a = 1 + (o & 1), n = o < 2 ? 1 : 3 + (o >> 1), l = "a", d = sc(e);
      for ((d == "H" || d == "k") && (n = 0); n-- > 0; )
        i += l;
      for (; a-- > 0; )
        i = d + i;
    } else s === "J" ? i += "H" : i += s;
  }
  return i;
}
function sc(t) {
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
  var i = t.language, r;
  i !== "root" && (r = t.maximize().region);
  var s = Ei[r || ""] || Ei[i || ""] || Ei["".concat(i, "-001")] || Ei["001"];
  return s[0];
}
var Or, oc = new RegExp("^".concat(ha.source, "*")), nc = new RegExp("".concat(ha.source, "*$"));
function J(t, e) {
  return { start: t, end: e };
}
var ac = !!String.prototype.startsWith && "_a".startsWith("a", 1), lc = !!String.fromCodePoint, dc = !!Object.fromEntries, cc = !!String.prototype.codePointAt, hc = !!String.prototype.trimStart, uc = !!String.prototype.trimEnd, gc = !!Number.isSafeInteger, _c = gc ? Number.isSafeInteger : function(t) {
  return typeof t == "number" && isFinite(t) && Math.floor(t) === t && Math.abs(t) <= 9007199254740991;
}, ns = !0;
try {
  var fc = pa("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  ns = ((Or = fc.exec("a")) === null || Or === void 0 ? void 0 : Or[0]) === "a";
} catch {
  ns = !1;
}
var fo = ac ? (
  // Native
  function(e, i, r) {
    return e.startsWith(i, r);
  }
) : (
  // For IE11
  function(e, i, r) {
    return e.slice(r, r + i.length) === i;
  }
), as = lc ? String.fromCodePoint : (
  // IE11
  function() {
    for (var e = [], i = 0; i < arguments.length; i++)
      e[i] = arguments[i];
    for (var r = "", s = e.length, o = 0, a; s > o; ) {
      if (a = e[o++], a > 1114111)
        throw RangeError(a + " is not a valid code point");
      r += a < 65536 ? String.fromCharCode(a) : String.fromCharCode(((a -= 65536) >> 10) + 55296, a % 1024 + 56320);
    }
    return r;
  }
), po = (
  // native
  dc ? Object.fromEntries : (
    // Ponyfill
    function(e) {
      for (var i = {}, r = 0, s = e; r < s.length; r++) {
        var o = s[r], a = o[0], n = o[1];
        i[a] = n;
      }
      return i;
    }
  )
), fa = cc ? (
  // Native
  function(e, i) {
    return e.codePointAt(i);
  }
) : (
  // IE 11
  function(e, i) {
    var r = e.length;
    if (!(i < 0 || i >= r)) {
      var s = e.charCodeAt(i), o;
      return s < 55296 || s > 56319 || i + 1 === r || (o = e.charCodeAt(i + 1)) < 56320 || o > 57343 ? s : (s - 55296 << 10) + (o - 56320) + 65536;
    }
  }
), pc = hc ? (
  // Native
  function(e) {
    return e.trimStart();
  }
) : (
  // Ponyfill
  function(e) {
    return e.replace(oc, "");
  }
), mc = uc ? (
  // Native
  function(e) {
    return e.trimEnd();
  }
) : (
  // Ponyfill
  function(e) {
    return e.replace(nc, "");
  }
);
function pa(t, e) {
  return new RegExp(t, e);
}
var ls;
if (ns) {
  var mo = pa("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  ls = function(e, i) {
    var r;
    mo.lastIndex = i;
    var s = mo.exec(e);
    return (r = s[1]) !== null && r !== void 0 ? r : "";
  };
} else
  ls = function(e, i) {
    for (var r = []; ; ) {
      var s = fa(e, i);
      if (s === void 0 || ma(s) || xc(s))
        break;
      r.push(s), i += s >= 65536 ? 2 : 1;
    }
    return as.apply(void 0, r);
  };
var yc = (
  /** @class */
  (function() {
    function t(e, i) {
      i === void 0 && (i = {}), this.message = e, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!i.ignoreTag, this.locale = i.locale, this.requiresOtherClause = !!i.requiresOtherClause, this.shouldParseSkeletons = !!i.shouldParseSkeletons;
    }
    return t.prototype.parse = function() {
      if (this.offset() !== 0)
        throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, t.prototype.parseMessage = function(e, i, r) {
      for (var s = []; !this.isEOF(); ) {
        var o = this.char();
        if (o === 123) {
          var a = this.parseArgument(e, r);
          if (a.err)
            return a;
          s.push(a.val);
        } else {
          if (o === 125 && e > 0)
            break;
          if (o === 35 && (i === "plural" || i === "selectordinal")) {
            var n = this.clonePosition();
            this.bump(), s.push({
              type: ae.pound,
              location: J(n, this.clonePosition())
            });
          } else if (o === 60 && !this.ignoreTag && this.peek() === 47) {
            if (r)
              break;
            return this.error(q.UNMATCHED_CLOSING_TAG, J(this.clonePosition(), this.clonePosition()));
          } else if (o === 60 && !this.ignoreTag && ds(this.peek() || 0)) {
            var a = this.parseTag(e, i);
            if (a.err)
              return a;
            s.push(a.val);
          } else {
            var a = this.parseLiteral(e, i);
            if (a.err)
              return a;
            s.push(a.val);
          }
        }
      }
      return { val: s, err: null };
    }, t.prototype.parseTag = function(e, i) {
      var r = this.clonePosition();
      this.bump();
      var s = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>"))
        return {
          val: {
            type: ae.literal,
            value: "<".concat(s, "/>"),
            location: J(r, this.clonePosition())
          },
          err: null
        };
      if (this.bumpIf(">")) {
        var o = this.parseMessage(e + 1, i, !0);
        if (o.err)
          return o;
        var a = o.val, n = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !ds(this.char()))
            return this.error(q.INVALID_TAG, J(n, this.clonePosition()));
          var l = this.clonePosition(), d = this.parseTagName();
          return s !== d ? this.error(q.UNMATCHED_CLOSING_TAG, J(l, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: ae.tag,
              value: s,
              children: a,
              location: J(r, this.clonePosition())
            },
            err: null
          } : this.error(q.INVALID_TAG, J(n, this.clonePosition())));
        } else
          return this.error(q.UNCLOSED_TAG, J(r, this.clonePosition()));
      } else
        return this.error(q.INVALID_TAG, J(r, this.clonePosition()));
    }, t.prototype.parseTagName = function() {
      var e = this.offset();
      for (this.bump(); !this.isEOF() && bc(this.char()); )
        this.bump();
      return this.message.slice(e, this.offset());
    }, t.prototype.parseLiteral = function(e, i) {
      for (var r = this.clonePosition(), s = ""; ; ) {
        var o = this.tryParseQuote(i);
        if (o) {
          s += o;
          continue;
        }
        var a = this.tryParseUnquoted(e, i);
        if (a) {
          s += a;
          continue;
        }
        var n = this.tryParseLeftAngleBracket();
        if (n) {
          s += n;
          continue;
        }
        break;
      }
      var l = J(r, this.clonePosition());
      return {
        val: { type: ae.literal, value: s, location: l },
        err: null
      };
    }, t.prototype.tryParseLeftAngleBracket = function() {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !vc(this.peek() || 0)) ? (this.bump(), "<") : null;
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
        var r = this.char();
        if (r === 39)
          if (this.peek() === 39)
            i.push(39), this.bump();
          else {
            this.bump();
            break;
          }
        else
          i.push(r);
        this.bump();
      }
      return as.apply(void 0, i);
    }, t.prototype.tryParseUnquoted = function(e, i) {
      if (this.isEOF())
        return null;
      var r = this.char();
      return r === 60 || r === 123 || r === 35 && (i === "plural" || i === "selectordinal") || r === 125 && e > 0 ? null : (this.bump(), as(r));
    }, t.prototype.parseArgument = function(e, i) {
      var r = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF())
        return this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, J(r, this.clonePosition()));
      if (this.char() === 125)
        return this.bump(), this.error(q.EMPTY_ARGUMENT, J(r, this.clonePosition()));
      var s = this.parseIdentifierIfPossible().value;
      if (!s)
        return this.error(q.MALFORMED_ARGUMENT, J(r, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF())
        return this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, J(r, this.clonePosition()));
      switch (this.char()) {
        // Simple argument: `{name}`
        case 125:
          return this.bump(), {
            val: {
              type: ae.argument,
              // value does not include the opening and closing braces.
              value: s,
              location: J(r, this.clonePosition())
            },
            err: null
          };
        // Argument with options: `{name, format, ...}`
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(q.EXPECT_ARGUMENT_CLOSING_BRACE, J(r, this.clonePosition())) : this.parseArgumentOptions(e, i, s, r);
        default:
          return this.error(q.MALFORMED_ARGUMENT, J(r, this.clonePosition()));
      }
    }, t.prototype.parseIdentifierIfPossible = function() {
      var e = this.clonePosition(), i = this.offset(), r = ls(this.message, i), s = i + r.length;
      this.bumpTo(s);
      var o = this.clonePosition(), a = J(e, o);
      return { value: r, location: a };
    }, t.prototype.parseArgumentOptions = function(e, i, r, s) {
      var o, a = this.clonePosition(), n = this.parseIdentifierIfPossible().value, l = this.clonePosition();
      switch (n) {
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
            var u = mc(h.val);
            if (u.length === 0)
              return this.error(q.EXPECT_ARGUMENT_STYLE, J(this.clonePosition(), this.clonePosition()));
            var g = J(c, this.clonePosition());
            d = { style: u, styleLocation: g };
          }
          var f = this.tryParseArgumentClose(s);
          if (f.err)
            return f;
          var _ = J(s, this.clonePosition());
          if (d && fo(d == null ? void 0 : d.style, "::", 0)) {
            var p = pc(d.style.slice(2));
            if (n === "number") {
              var h = this.parseNumberSkeletonFromString(p, d.styleLocation);
              return h.err ? h : {
                val: { type: ae.number, value: r, location: _, style: h.val },
                err: null
              };
            } else {
              if (p.length === 0)
                return this.error(q.EXPECT_DATE_TIME_SKELETON, _);
              var y = p;
              this.locale && (y = rc(p, this.locale));
              var u = {
                type: Nt.dateTime,
                pattern: y,
                location: d.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? Zd(y) : {}
              }, v = n === "date" ? ae.date : ae.time;
              return {
                val: { type: v, value: r, location: _, style: u },
                err: null
              };
            }
          }
          return {
            val: {
              type: n === "number" ? ae.number : n === "date" ? ae.date : ae.time,
              value: r,
              location: _,
              style: (o = d == null ? void 0 : d.style) !== null && o !== void 0 ? o : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var x = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(","))
            return this.error(q.EXPECT_SELECT_ARGUMENT_OPTIONS, J(x, Q({}, x)));
          this.bumpSpace();
          var L = this.parseIdentifierIfPossible(), k = 0;
          if (n !== "select" && L.value === "offset") {
            if (!this.bumpIf(":"))
              return this.error(q.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, J(this.clonePosition(), this.clonePosition()));
            this.bumpSpace();
            var h = this.tryParseDecimalInteger(q.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, q.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (h.err)
              return h;
            this.bumpSpace(), L = this.parseIdentifierIfPossible(), k = h.val;
          }
          var A = this.tryParsePluralOrSelectOptions(e, n, i, L);
          if (A.err)
            return A;
          var f = this.tryParseArgumentClose(s);
          if (f.err)
            return f;
          var P = J(s, this.clonePosition());
          return n === "select" ? {
            val: {
              type: ae.select,
              value: r,
              options: po(A.val),
              location: P
            },
            err: null
          } : {
            val: {
              type: ae.plural,
              value: r,
              options: po(A.val),
              offset: k,
              pluralType: n === "plural" ? "cardinal" : "ordinal",
              location: P
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
        var r = this.char();
        switch (r) {
          case 39: {
            this.bump();
            var s = this.clonePosition();
            if (!this.bumpUntil("'"))
              return this.error(q.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, J(s, this.clonePosition()));
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
      var r = [];
      try {
        r = Jd(e);
      } catch {
        return this.error(q.INVALID_NUMBER_SKELETON, i);
      }
      return {
        val: {
          type: Nt.number,
          tokens: r,
          location: i,
          parsedOptions: this.shouldParseSkeletons ? ic(r) : {}
        },
        err: null
      };
    }, t.prototype.tryParsePluralOrSelectOptions = function(e, i, r, s) {
      for (var o, a = !1, n = [], l = /* @__PURE__ */ new Set(), d = s.value, c = s.location; ; ) {
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
        var f = this.parseMessage(e + 1, i, r);
        if (f.err)
          return f;
        var _ = this.tryParseArgumentClose(g);
        if (_.err)
          return _;
        n.push([
          d,
          {
            value: f.val,
            location: J(g, this.clonePosition())
          }
        ]), l.add(d), this.bumpSpace(), o = this.parseIdentifierIfPossible(), d = o.value, c = o.location;
      }
      return n.length === 0 ? this.error(i === "select" ? q.EXPECT_SELECT_ARGUMENT_SELECTOR : q.EXPECT_PLURAL_ARGUMENT_SELECTOR, J(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !a ? this.error(q.MISSING_OTHER_CLAUSE, J(this.clonePosition(), this.clonePosition())) : { val: n, err: null };
    }, t.prototype.tryParseDecimalInteger = function(e, i) {
      var r = 1, s = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (r = -1);
      for (var o = !1, a = 0; !this.isEOF(); ) {
        var n = this.char();
        if (n >= 48 && n <= 57)
          o = !0, a = a * 10 + (n - 48), this.bump();
        else
          break;
      }
      var l = J(s, this.clonePosition());
      return o ? (a *= r, _c(a) ? { val: a, err: null } : this.error(i, l)) : this.error(e, l);
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
      var i = fa(this.message, e);
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
      if (fo(this.message, e, this.offset())) {
        for (var i = 0; i < e.length; i++)
          this.bump();
        return !0;
      }
      return !1;
    }, t.prototype.bumpUntil = function(e) {
      var i = this.offset(), r = this.message.indexOf(e, i);
      return r >= 0 ? (this.bumpTo(r), !0) : (this.bumpTo(this.message.length), !1);
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
      for (; !this.isEOF() && ma(this.char()); )
        this.bump();
    }, t.prototype.peek = function() {
      if (this.isEOF())
        return null;
      var e = this.char(), i = this.offset(), r = this.message.charCodeAt(i + (e >= 65536 ? 2 : 1));
      return r ?? null;
    }, t;
  })()
);
function ds(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90;
}
function vc(t) {
  return ds(t) || t === 47;
}
function bc(t) {
  return t === 45 || t === 46 || t >= 48 && t <= 57 || t === 95 || t >= 97 && t <= 122 || t >= 65 && t <= 90 || t == 183 || t >= 192 && t <= 214 || t >= 216 && t <= 246 || t >= 248 && t <= 893 || t >= 895 && t <= 8191 || t >= 8204 && t <= 8205 || t >= 8255 && t <= 8256 || t >= 8304 && t <= 8591 || t >= 11264 && t <= 12271 || t >= 12289 && t <= 55295 || t >= 63744 && t <= 64975 || t >= 65008 && t <= 65533 || t >= 65536 && t <= 983039;
}
function ma(t) {
  return t >= 9 && t <= 13 || t === 32 || t === 133 || t >= 8206 && t <= 8207 || t === 8232 || t === 8233;
}
function xc(t) {
  return t >= 33 && t <= 35 || t === 36 || t >= 37 && t <= 39 || t === 40 || t === 41 || t === 42 || t === 43 || t === 44 || t === 45 || t >= 46 && t <= 47 || t >= 58 && t <= 59 || t >= 60 && t <= 62 || t >= 63 && t <= 64 || t === 91 || t === 92 || t === 93 || t === 94 || t === 96 || t === 123 || t === 124 || t === 125 || t === 126 || t === 161 || t >= 162 && t <= 165 || t === 166 || t === 167 || t === 169 || t === 171 || t === 172 || t === 174 || t === 176 || t === 177 || t === 182 || t === 187 || t === 191 || t === 215 || t === 247 || t >= 8208 && t <= 8213 || t >= 8214 && t <= 8215 || t === 8216 || t === 8217 || t === 8218 || t >= 8219 && t <= 8220 || t === 8221 || t === 8222 || t === 8223 || t >= 8224 && t <= 8231 || t >= 8240 && t <= 8248 || t === 8249 || t === 8250 || t >= 8251 && t <= 8254 || t >= 8257 && t <= 8259 || t === 8260 || t === 8261 || t === 8262 || t >= 8263 && t <= 8273 || t === 8274 || t === 8275 || t >= 8277 && t <= 8286 || t >= 8592 && t <= 8596 || t >= 8597 && t <= 8601 || t >= 8602 && t <= 8603 || t >= 8604 && t <= 8607 || t === 8608 || t >= 8609 && t <= 8610 || t === 8611 || t >= 8612 && t <= 8613 || t === 8614 || t >= 8615 && t <= 8621 || t === 8622 || t >= 8623 && t <= 8653 || t >= 8654 && t <= 8655 || t >= 8656 && t <= 8657 || t === 8658 || t === 8659 || t === 8660 || t >= 8661 && t <= 8691 || t >= 8692 && t <= 8959 || t >= 8960 && t <= 8967 || t === 8968 || t === 8969 || t === 8970 || t === 8971 || t >= 8972 && t <= 8991 || t >= 8992 && t <= 8993 || t >= 8994 && t <= 9e3 || t === 9001 || t === 9002 || t >= 9003 && t <= 9083 || t === 9084 || t >= 9085 && t <= 9114 || t >= 9115 && t <= 9139 || t >= 9140 && t <= 9179 || t >= 9180 && t <= 9185 || t >= 9186 && t <= 9254 || t >= 9255 && t <= 9279 || t >= 9280 && t <= 9290 || t >= 9291 && t <= 9311 || t >= 9472 && t <= 9654 || t === 9655 || t >= 9656 && t <= 9664 || t === 9665 || t >= 9666 && t <= 9719 || t >= 9720 && t <= 9727 || t >= 9728 && t <= 9838 || t === 9839 || t >= 9840 && t <= 10087 || t === 10088 || t === 10089 || t === 10090 || t === 10091 || t === 10092 || t === 10093 || t === 10094 || t === 10095 || t === 10096 || t === 10097 || t === 10098 || t === 10099 || t === 10100 || t === 10101 || t >= 10132 && t <= 10175 || t >= 10176 && t <= 10180 || t === 10181 || t === 10182 || t >= 10183 && t <= 10213 || t === 10214 || t === 10215 || t === 10216 || t === 10217 || t === 10218 || t === 10219 || t === 10220 || t === 10221 || t === 10222 || t === 10223 || t >= 10224 && t <= 10239 || t >= 10240 && t <= 10495 || t >= 10496 && t <= 10626 || t === 10627 || t === 10628 || t === 10629 || t === 10630 || t === 10631 || t === 10632 || t === 10633 || t === 10634 || t === 10635 || t === 10636 || t === 10637 || t === 10638 || t === 10639 || t === 10640 || t === 10641 || t === 10642 || t === 10643 || t === 10644 || t === 10645 || t === 10646 || t === 10647 || t === 10648 || t >= 10649 && t <= 10711 || t === 10712 || t === 10713 || t === 10714 || t === 10715 || t >= 10716 && t <= 10747 || t === 10748 || t === 10749 || t >= 10750 && t <= 11007 || t >= 11008 && t <= 11055 || t >= 11056 && t <= 11076 || t >= 11077 && t <= 11078 || t >= 11079 && t <= 11084 || t >= 11085 && t <= 11123 || t >= 11124 && t <= 11125 || t >= 11126 && t <= 11157 || t === 11158 || t >= 11159 && t <= 11263 || t >= 11776 && t <= 11777 || t === 11778 || t === 11779 || t === 11780 || t === 11781 || t >= 11782 && t <= 11784 || t === 11785 || t === 11786 || t === 11787 || t === 11788 || t === 11789 || t >= 11790 && t <= 11798 || t === 11799 || t >= 11800 && t <= 11801 || t === 11802 || t === 11803 || t === 11804 || t === 11805 || t >= 11806 && t <= 11807 || t === 11808 || t === 11809 || t === 11810 || t === 11811 || t === 11812 || t === 11813 || t === 11814 || t === 11815 || t === 11816 || t === 11817 || t >= 11818 && t <= 11822 || t === 11823 || t >= 11824 && t <= 11833 || t >= 11834 && t <= 11835 || t >= 11836 && t <= 11839 || t === 11840 || t === 11841 || t === 11842 || t >= 11843 && t <= 11855 || t >= 11856 && t <= 11857 || t === 11858 || t >= 11859 && t <= 11903 || t >= 12289 && t <= 12291 || t === 12296 || t === 12297 || t === 12298 || t === 12299 || t === 12300 || t === 12301 || t === 12302 || t === 12303 || t === 12304 || t === 12305 || t >= 12306 && t <= 12307 || t === 12308 || t === 12309 || t === 12310 || t === 12311 || t === 12312 || t === 12313 || t === 12314 || t === 12315 || t === 12316 || t === 12317 || t >= 12318 && t <= 12319 || t === 12320 || t === 12336 || t === 64830 || t === 64831 || t >= 65093 && t <= 65094;
}
function cs(t) {
  t.forEach(function(e) {
    if (delete e.location, aa(e) || la(e))
      for (var i in e.options)
        delete e.options[i].location, cs(e.options[i].value);
    else sa(e) && ca(e.style) || (oa(e) || na(e)) && os(e.style) ? delete e.style.location : da(e) && cs(e.children);
  });
}
function wc(t, e) {
  e === void 0 && (e = {}), e = Q({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, e);
  var i = new yc(t, e).parse();
  if (i.err) {
    var r = SyntaxError(q[i.err.kind]);
    throw r.location = i.err.location, r.originalMessage = i.err.message, r;
  }
  return e != null && e.captureLocation || cs(i.val), i.val;
}
var Bt;
(function(t) {
  t.MISSING_VALUE = "MISSING_VALUE", t.INVALID_VALUE = "INVALID_VALUE", t.MISSING_INTL_API = "MISSING_INTL_API";
})(Bt || (Bt = {}));
var fr = (
  /** @class */
  (function(t) {
    _r(e, t);
    function e(i, r, s) {
      var o = t.call(this, i) || this;
      return o.code = r, o.originalMessage = s, o;
    }
    return e.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, e;
  })(Error)
), yo = (
  /** @class */
  (function(t) {
    _r(e, t);
    function e(i, r, s, o) {
      return t.call(this, 'Invalid values for "'.concat(i, '": "').concat(r, '". Options are "').concat(Object.keys(s).join('", "'), '"'), Bt.INVALID_VALUE, o) || this;
    }
    return e;
  })(fr)
), kc = (
  /** @class */
  (function(t) {
    _r(e, t);
    function e(i, r, s) {
      return t.call(this, 'Value for "'.concat(i, '" must be of type ').concat(r), Bt.INVALID_VALUE, s) || this;
    }
    return e;
  })(fr)
), Sc = (
  /** @class */
  (function(t) {
    _r(e, t);
    function e(i, r) {
      return t.call(this, 'The intl string context variable "'.concat(i, '" was not provided to the string "').concat(r, '"'), Bt.MISSING_VALUE, r) || this;
    }
    return e;
  })(fr)
), ke;
(function(t) {
  t[t.literal = 0] = "literal", t[t.object = 1] = "object";
})(ke || (ke = {}));
function Ac(t) {
  return t.length < 2 ? t : t.reduce(function(e, i) {
    var r = e[e.length - 1];
    return !r || r.type !== ke.literal || i.type !== ke.literal ? e.push(i) : r.value += i.value, e;
  }, []);
}
function Cc(t) {
  return typeof t == "function";
}
function Vi(t, e, i, r, s, o, a) {
  if (t.length === 1 && ho(t[0]))
    return [
      {
        type: ke.literal,
        value: t[0].value
      }
    ];
  for (var n = [], l = 0, d = t; l < d.length; l++) {
    var c = d[l];
    if (ho(c)) {
      n.push({
        type: ke.literal,
        value: c.value
      });
      continue;
    }
    if (Yd(c)) {
      typeof o == "number" && n.push({
        type: ke.literal,
        value: i.getNumberFormat(e).format(o)
      });
      continue;
    }
    var h = c.value;
    if (!(s && h in s))
      throw new Sc(h, a);
    var u = s[h];
    if (Kd(c)) {
      (!u || typeof u == "string" || typeof u == "number") && (u = typeof u == "string" || typeof u == "number" ? String(u) : ""), n.push({
        type: typeof u == "string" ? ke.literal : ke.object,
        value: u
      });
      continue;
    }
    if (oa(c)) {
      var g = typeof c.style == "string" ? r.date[c.style] : os(c.style) ? c.style.parsedOptions : void 0;
      n.push({
        type: ke.literal,
        value: i.getDateTimeFormat(e, g).format(u)
      });
      continue;
    }
    if (na(c)) {
      var g = typeof c.style == "string" ? r.time[c.style] : os(c.style) ? c.style.parsedOptions : r.time.medium;
      n.push({
        type: ke.literal,
        value: i.getDateTimeFormat(e, g).format(u)
      });
      continue;
    }
    if (sa(c)) {
      var g = typeof c.style == "string" ? r.number[c.style] : ca(c.style) ? c.style.parsedOptions : void 0;
      g && g.scale && (u = u * (g.scale || 1)), n.push({
        type: ke.literal,
        value: i.getNumberFormat(e, g).format(u)
      });
      continue;
    }
    if (da(c)) {
      var f = c.children, _ = c.value, p = s[_];
      if (!Cc(p))
        throw new kc(_, "function", a);
      var y = Vi(f, e, i, r, s, o), v = p(y.map(function(k) {
        return k.value;
      }));
      Array.isArray(v) || (v = [v]), n.push.apply(n, v.map(function(k) {
        return {
          type: typeof k == "string" ? ke.literal : ke.object,
          value: k
        };
      }));
    }
    if (aa(c)) {
      var x = c.options[u] || c.options.other;
      if (!x)
        throw new yo(c.value, u, Object.keys(c.options), a);
      n.push.apply(n, Vi(x.value, e, i, r, s));
      continue;
    }
    if (la(c)) {
      var x = c.options["=".concat(u)];
      if (!x) {
        if (!Intl.PluralRules)
          throw new fr(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, Bt.MISSING_INTL_API, a);
        var L = i.getPluralRules(e, { type: c.pluralType }).select(u - (c.offset || 0));
        x = c.options[L] || c.options.other;
      }
      if (!x)
        throw new yo(c.value, u, Object.keys(c.options), a);
      n.push.apply(n, Vi(x.value, e, i, r, s, u - (c.offset || 0)));
      continue;
    }
  }
  return Ac(n);
}
function Ec(t, e) {
  return e ? Q(Q(Q({}, t || {}), e || {}), Object.keys(t).reduce(function(i, r) {
    return i[r] = Q(Q({}, t[r]), e[r] || {}), i;
  }, {})) : t;
}
function Pc(t, e) {
  return e ? Object.keys(t).reduce(function(i, r) {
    return i[r] = Ec(t[r], e[r]), i;
  }, Q({}, t)) : t;
}
function Rr(t) {
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
function Mc(t) {
  return t === void 0 && (t = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: Tr(function() {
      for (var e, i = [], r = 0; r < arguments.length; r++)
        i[r] = arguments[r];
      return new ((e = Intl.NumberFormat).bind.apply(e, Dr([void 0], i, !1)))();
    }, {
      cache: Rr(t.number),
      strategy: zr.variadic
    }),
    getDateTimeFormat: Tr(function() {
      for (var e, i = [], r = 0; r < arguments.length; r++)
        i[r] = arguments[r];
      return new ((e = Intl.DateTimeFormat).bind.apply(e, Dr([void 0], i, !1)))();
    }, {
      cache: Rr(t.dateTime),
      strategy: zr.variadic
    }),
    getPluralRules: Tr(function() {
      for (var e, i = [], r = 0; r < arguments.length; r++)
        i[r] = arguments[r];
      return new ((e = Intl.PluralRules).bind.apply(e, Dr([void 0], i, !1)))();
    }, {
      cache: Rr(t.pluralRules),
      strategy: zr.variadic
    })
  };
}
var $c = (
  /** @class */
  (function() {
    function t(e, i, r, s) {
      i === void 0 && (i = t.defaultLocale);
      var o = this;
      if (this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function(l) {
        var d = o.formatToParts(l);
        if (d.length === 1)
          return d[0].value;
        var c = d.reduce(function(h, u) {
          return !h.length || u.type !== ke.literal || typeof h[h.length - 1] != "string" ? h.push(u.value) : h[h.length - 1] += u.value, h;
        }, []);
        return c.length <= 1 ? c[0] || "" : c;
      }, this.formatToParts = function(l) {
        return Vi(o.ast, o.locales, o.formatters, o.formats, l, void 0, o.message);
      }, this.resolvedOptions = function() {
        var l;
        return {
          locale: ((l = o.resolvedLocale) === null || l === void 0 ? void 0 : l.toString()) || Intl.NumberFormat.supportedLocalesOf(o.locales)[0]
        };
      }, this.getAst = function() {
        return o.ast;
      }, this.locales = i, this.resolvedLocale = t.resolveLocale(i), typeof e == "string") {
        if (this.message = e, !t.__parse)
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        var a = s || {};
        a.formatters;
        var n = Bd(a, ["formatters"]);
        this.ast = t.__parse(e, Q(Q({}, n), { locale: this.resolvedLocale }));
      } else
        this.ast = e;
      if (!Array.isArray(this.ast))
        throw new TypeError("A message must be provided as a String or AST.");
      this.formats = Pc(t.formats, r), this.formatters = s && s.formatters || Mc(this.formatterCache);
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
    }, t.__parse = wc, t.formats = {
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
const vo = /* @__PURE__ */ Object.assign({ "./locales/cs.json": _d, "./locales/da.json": pd, "./locales/de.json": yd, "./locales/en.json": bd, "./locales/fi.json": wd, "./locales/fr.json": Sd, "./locales/it.json": Cd, "./locales/nl.json": Pd, "./locales/no.json": $d, "./locales/pl.json": Dd, "./locales/ru.json": zd, "./locales/sk.json": Rd, "./locales/sv.json": Nd }), wt = {};
for (const t in vo) {
  const e = t.match(/\.\/locales\/([\w-]+)\.json$/);
  e && (wt[e[1]] = vo[t].default);
}
const sr = "en";
function bo(t, e) {
  return t[e];
}
function Ee(t, e) {
  var s;
  let i = e || ((s = t == null ? void 0 : t.locale) == null ? void 0 : s.language) || (t == null ? void 0 : t.language) || sr;
  if (wt[i]) return i;
  const r = i.slice(0, 2).toLowerCase();
  return wt[r] ? r : sr;
}
const Lc = Object.keys(wt);
function Y(t, e, i = {}) {
  const r = wt[e] || wt[sr] || {};
  let s = bo(r, t);
  if (s === void 0) {
    const o = bo(wt[sr] || {}, t);
    s = o === void 0 ? t : o;
  }
  try {
    return new $c(s, e).format(i);
  } catch (o) {
    return console.warn(`Translation failed for key: ${t}`, o), s;
  }
}
function Be(t) {
  return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function _i(t) {
  return t.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
const j = {
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
}, Dc = 30;
function Wt(t) {
  return Math.round(t / Dc);
}
function Gt(t, e) {
  const i = Array.from({ length: 7 }, (r, s) => Y(`card.levels.${s}`, e));
  return Array.isArray(t) ? i.map((r, s) => {
    const o = t[s];
    return o == null || o === "" ? r : o;
  }) : i;
}
const Tc = "state_tomorrow", zc = "state_in_2_days", Oc = "state_today_desc", Rc = "state_tomorrow_desc", Ic = "state_in_2_days_desc", Pe = {
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
  ...j,
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
async function Nc(t, e) {
  const i = !!e.debug, r = (k) => k.charAt(0).toUpperCase() + k.slice(1), s = Ee(t, e.date_locale), o = e.date_locale || Pe.date_locale, a = e.days_relative !== !1, n = !!e.days_abbreviated, l = !!e.days_uppercase, d = e.phrases || {}, c = d.full || {}, h = d.short || {}, u = d.levels, g = Gt(u, s), f = d.no_information || Y("card.no_information", s), _ = d.days || {}, p = e.days_to_show ?? Pe.days_to_show, y = e.pollen_threshold ?? Pe.pollen_threshold;
  i && console.debug("DWD adapter: start fetchForecast", { config: e, lang: s });
  const v = (k) => {
    const A = Number(k);
    return isNaN(A) ? -1 : A;
  }, x = /* @__PURE__ */ new Date();
  x.setHours(0, 0, 0, 0);
  const L = [];
  for (const k of e.allergens)
    try {
      const A = {}, P = _i(k);
      A.allergenReplaced = P;
      const $ = Oe[P] || P, S = c[k];
      if (S)
        A.allergenCapitalized = S;
      else {
        const b = `card.allergen.${Oe[P] || P}`, T = Y(b, s);
        A.allergenCapitalized = T !== b ? T : r(k);
      }
      if (e.allergens_abbreviated) {
        const O = h[k];
        A.allergenShort = O || Y(`editor.phrases_short.${$}`, s) || A.allergenCapitalized;
      } else
        A.allergenShort = A.allergenCapitalized;
      let w;
      if (e.region_id === "manual") {
        const O = e.entity_prefix || "", b = e.entity_suffix || "";
        if (w = `sensor.${O}${P}${b}`, !t.states[w])
          if (b === "") {
            const T = `sensor.${O}${P}`, D = Object.keys(t.states).filter(
              (N) => N.startsWith(T)
            );
            if (D.length === 1) w = D[0];
            else continue;
          } else continue;
      } else if (w = e.region_id ? `sensor.pollenflug_${P}_${e.region_id}` : null, !w || !t.states[w]) {
        const O = Object.keys(t.states).filter(
          (b) => b.startsWith(`sensor.pollenflug_${P}_`)
        );
        if (O.length === 1) w = O[0];
        else continue;
      }
      const C = t.states[w];
      A.entity_id = w;
      const m = v(C.state), E = v(C.attributes[Tc]), M = v(C.attributes[zc]), R = [
        { date: x, level: m },
        { date: new Date(x.getTime() + 864e5), level: E },
        { date: new Date(x.getTime() + 2 * 864e5), level: M }
      ];
      for (; R.length < p; ) {
        const O = R.length;
        R.push({
          date: new Date(x.getTime() + O * 864e5),
          level: -1
        });
      }
      A.days = [], R.forEach((O, b) => {
        if (O.level !== null && O.level >= 0) {
          const T = Math.round((O.date - x) / 864e5);
          let D;
          a ? _[T] !== void 0 ? D = _[T] : T >= 0 && T <= 2 ? D = Y(`card.days.${T}`, s) : D = O.date.toLocaleDateString(o, {
            day: "numeric",
            month: "short"
          }) : (D = O.date.toLocaleDateString(o, {
            weekday: n ? "short" : "long"
          }), D = D.charAt(0).toUpperCase() + D.slice(1)), l && (D = D.toUpperCase());
          const N = C.attributes[b === 0 ? Oc : b === 1 ? Rc : Ic] || "", H = O.level * 2, V = Math.min(Math.max(Math.round(H), 0), 6), F = V < 0 ? f : g[V] || N;
          A[`day${b}`] = {
            name: A.allergenCapitalized,
            day: D,
            state: O.level,
            display_state: H,
            state_text: F
          }, A.days.push(A[`day${b}`]);
        }
      }), (R.slice(0, p).some((O) => O.level >= y) || y === 0) && L.push(A);
    } catch (A) {
      console.warn(`DWD adapter error for allergen ${k}:`, A);
    }
  return e.sort !== "none" && L.sort(
    {
      value_ascending: (k, A) => {
        var P, $;
        return (((P = k.day0) == null ? void 0 : P.state) ?? 0) - ((($ = A.day0) == null ? void 0 : $.state) ?? 0);
      },
      value_descending: (k, A) => {
        var P, $;
        return (((P = A.day0) == null ? void 0 : P.state) ?? 0) - ((($ = k.day0) == null ? void 0 : $.state) ?? 0);
      },
      name_ascending: (k, A) => k.allergenCapitalized.localeCompare(A.allergenCapitalized),
      name_descending: (k, A) => A.allergenCapitalized.localeCompare(k.allergenCapitalized)
    }[e.sort] || ((k, A) => {
      var P, $;
      return (((P = A.day0) == null ? void 0 : P.state) ?? 0) - ((($ = k.day0) == null ? void 0 : $.state) ?? 0);
    })
  ), i && console.debug("DWD adapter complete sensors:", L), L;
}
const Bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetchForecast: Nc,
  stubConfigDWD: Pe
}, Symbol.toStringTag, { value: "Module" })), Hc = { nl: { els: "alder", berk: "birch", gras: "grass", hazelaar: "hazel", bijvoet: "mugwort", olijf: "olive", ambrosia: "ragweed", index: "allergy_risk" }, de: { erle: "alder", birke: "birch", gras: "grass", hasel: "hazel", beifu: "mugwort", ambrosia: "ragweed", index: "allergy_risk" }, ru: { "": "ragweed" }, fi: { leppa: "alder", koivu: "birch", heina: "grass", pahkinaleppa: "hazel", siankarsamo: "mugwort", oliivi: "olive", ambrosia: "ragweed", index: "allergy_risk" }, sk: { jelsa: "alder", breza: "birch", trava: "grass", lieska: "hazel", palina: "mugwort", olivovnik: "olive", ambrozia: "ragweed", index: "allergy_risk" }, en: { alder: "alder", birch: "birch", grass: "grass", hazel: "hazel", mugwort: "mugwort", olive: "olive", ragweed: "ragweed", index: "allergy_risk" }, it: { ontano: "alder", betulla: "birch", erba: "grass", nocciolo: "hazel", artemisia: "mugwort", oliva: "olive", ambrosia: "ragweed", index: "allergy_risk" }, cs: { olse: "alder", briza: "birch", trava: "grass", liska: "hazel", pelynek: "mugwort", olivovnik: "olive", ambrozie: "ragweed", index: "allergy_risk" }, no: { al: "alder", bjrk: "birch", gress: "grass", hassel: "hazel", malurt: "mugwort", oliven: "olive", ambrosia: "ragweed", index: "allergy_risk" }, da: { al: "alder", birk: "birch", grs: "grass", hassel: "hazel", malurt: "mugwort", oliven: "olive", ambrosia: "ragweed", index: "allergy_risk" }, sv: { al: "alder", bjork: "birch", gras: "grass", hassel: "hazel", malort: "mugwort", oliv: "olive", ambrosia: "ragweed", index: "allergy_risk" } }, Fc = { alder: { nl: "Els", de: "Erle", ru: "Ольха", fi: "Leppä", sk: "Jelša", en: "Alder", it: "Ontano", cs: "Olše", no: "Al", da: "Al", sv: "Al" }, birch: { nl: "Berk", de: "Birke", ru: "Берёза", fi: "Koivu", sk: "Breza", en: "Birch", it: "Betulla", cs: "Bříza", no: "Bjørk", da: "Birk", sv: "Björk" }, grass: { nl: "Gras", de: "Gras", ru: "Трава", fi: "Heinä", sk: "Tráva", en: "Grass", it: "Erba", cs: "Tráva", no: "Gress", da: "Græs", sv: "Gräs" }, hazel: { nl: "Hazelaar", de: "Hasel", ru: "Лещина", fi: "Pähkinäleppä", sk: "Lieska", en: "Hazel", it: "Nocciolo", cs: "Líska", no: "Hassel", da: "Hassel", sv: "Hassel" }, mugwort: { nl: "Bijvoet", de: "Beifuß", ru: "Полынь", fi: "Siankärsämö", sk: "Palina", en: "Mugwort", it: "Artemisia", cs: "Pelyněk", no: "Malurt", da: "Malurt", sv: "Malört" }, olive: { nl: "Olijf", de: "Olive", ru: "Олива", fi: "Oliivi", sk: "Olivovník", en: "Olive", it: "Oliva", cs: "Olivovník", no: "Oliven", da: "Oliven", sv: "Oliv" }, ragweed: { nl: "Ambrosia", de: "Ambrosia", ru: "Амброзия", fi: "Ambrosia", sk: "Ambrózia", en: "Ragweed", it: "Ambrosia", cs: "Ambrózie", no: "Ambrosia", da: "Ambrosia", sv: "Ambrosia" }, allergy_risk: { nl: "Index", de: "Index", ru: "Index", fi: "Index", sk: "Index", en: "Index", it: "Index", cs: "Index", no: "Index", da: "Index", sv: "Index" } }, jc = { nl: ["forecast_beta"], de: ["pollen_vorhersage_beta"], ru: ["beta"], fi: ["siitepolyennuste_beta"], sk: ["predpoved_beta"], en: ["pollen_forecast_beta"], it: ["previsione_del_polline_beta"], cs: ["predpoved_beta"], no: ["pollenprognose_beta"], da: ["pollenprognose_beta"], sv: ["pollenprognos_beta"] }, ce = {
  mapping: Hc,
  names: Fc,
  weather_suffixes: jc
};
function ya(t, e, i) {
  var l, d, c;
  if (!t || !e) return null;
  const r = e.toLowerCase();
  let s = /* @__PURE__ */ new Set();
  const o = ((l = ce.weather_suffixes) == null ? void 0 : l[i]) || ((d = ce.weather_suffixes) == null ? void 0 : d[i == null ? void 0 : i.split("-")[0]]) || [];
  for (const h of o) {
    s.add(h);
    const u = `weather.silam_pollen_${r}_${h}`;
    if (u in t.states) return u;
  }
  for (const h of ((c = ce.weather_suffixes) == null ? void 0 : c.en) || []) {
    if (s.has(h)) continue;
    s.add(h);
    const u = `weather.silam_pollen_${r}_${h}`;
    if (u in t.states) return u;
  }
  const a = Array.from(
    new Set(Object.values(ce.weather_suffixes).flat())
  );
  for (const h of a) {
    if (s.has(h)) continue;
    const u = `weather.silam_pollen_${r}_${h}`;
    if (u in t.states) return u;
  }
  const n = `weather.silam_pollen_${r}_`;
  return Object.keys(t.states).find((h) => h.startsWith(n)) || null;
}
const Te = {
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
  ...j,
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
}, hs = [...Te.allergens, "index"], va = {
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
function Wi(t, e) {
  const i = va[t];
  return !i || isNaN(e) ? -1 : e < i[0] ? 0 : e < i[1] ? 1 : e < i[2] ? 2 : e < i[3] ? 3 : e < i[4] ? 4 : e < i[5] ? 5 : 6;
}
function oi(t) {
  if (t == null) return -1;
  const e = [0, 1, 3, 5, 6], i = {
    very_low: 0,
    low: 1,
    moderate: 2,
    high: 3,
    very_high: 4
  };
  if (typeof t == "string") {
    const s = i[t.toLowerCase()];
    return s == null ? -1 : e[Math.max(0, Math.min(s, 4))];
  }
  const r = Number(t);
  if (!isNaN(r)) {
    const s = Math.max(0, Math.min(Math.round(r), 4));
    return e[s];
  }
  return -1;
}
function ba(t, e) {
  const i = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...t.phrases || {}
  };
  return i.no_information = i.no_information || Y("card.no_information", e), i;
}
function xa(t, e) {
  return Gt(t.levels, e);
}
function wa(t, e, i) {
  let r;
  e.full[t] ? r = e.full[t] : ce.names && ce.names[t] && ce.names[t][i] ? r = ce.names[t][i] : r = t.charAt(0).toUpperCase() + t.slice(1);
  const s = e.short[t] || r;
  return { allergenCapitalized: r, allergenShort: s };
}
async function Gc(t, e, i = null) {
  var $, S, w;
  const r = !!e.debug, s = Ee(t, e.date_locale), o = e.date_locale || (($ = t.locale) == null ? void 0 : $.language) || t.language || `${s}-${s.toUpperCase()}`, a = e.days_relative !== !1, n = !!e.days_abbreviated, l = !!e.days_uppercase, d = ba(e, s), c = xa(d, s), h = d.no_information, u = d.days, g = /* @__PURE__ */ new Date();
  g.setHours(0, 0, 0, 0);
  const f = e.days_to_show ?? Te.days_to_show, _ = e.pollen_threshold ?? Te.pollen_threshold, p = e.location === "manual" ? "" : (e.location || "").toLowerCase(), y = ya(t, p, o);
  if (!y || !t.states[y])
    return r && console.warn("[SILAM] Ingen weather-entity hittad:", y), [];
  const v = t.states[y], L = (e.allergens || Te.allergens).map((C) => {
    const m = Be(C);
    return Oe[m] || m;
  });
  let k = [];
  i && i.forecast && Array.isArray(i.forecast) ? k = i.forecast : Array.isArray(v.attributes.forecast) && (k = v.attributes.forecast);
  let A;
  e.mode === "hourly" || e.mode === "twice_daily" ? A = Math.min(k.length, f) : A = Math.min(k.length + 1, f);
  const P = [];
  for (const C of L)
    try {
      const m = {};
      m.days = [], m.allergenReplaced = C;
      const { allergenCapitalized: E, allergenShort: M } = wa(
        C,
        d,
        s
      );
      if (m.allergenCapitalized = E, m.allergenShort = e.allergens_abbreviated ? M : E, C === "allergy_risk") {
        const b = ((w = (S = ce.names) == null ? void 0 : S.allergy_risk) == null ? void 0 : w[s]) || "Index";
        m.allergenCapitalized = b, m.allergenShort = b;
      }
      let R = null;
      if (e.location === "manual") {
        let b = null;
        for (const H of Object.values(ce.mapping)) {
          const V = Object.entries(H).reduce(
            (F, [G, K]) => (F[K] = G, F),
            {}
          );
          if (V[C]) {
            b = V[C];
            break;
          }
        }
        b = b || C;
        const T = e.entity_prefix || "", D = e.entity_suffix || "", N = `sensor.${T}${b}${D}`;
        t.states[N] && (R = N);
      } else {
        for (const b of Object.values(ce.mapping)) {
          const T = Object.entries(b).reduce(
            (D, [N, H]) => (D[H] = N, D),
            {}
          );
          if (T[C]) {
            const D = `sensor.silam_pollen_${p}_${T[C]}`;
            if (t.states[D]) {
              R = D;
              break;
            }
          }
        }
        if (!R) {
          const b = `sensor.silam_pollen_${p}_${C}`;
          t.states[b] && (R = b);
        }
      }
      m.entity_id = R;
      let z = [];
      if (C === "allergy_risk")
        if (e.mode === "hourly" || e.mode === "twice_daily")
          for (let b = 0; b < A; ++b) {
            const T = k[b], D = T ? T.index ?? T.pollen_index : null;
            z.push(oi(D));
          }
        else {
          const b = v.attributes.index ?? v.attributes.pollen_index ?? v.state;
          z.push(oi(b));
          for (let T = 1; T < A; ++T) {
            const D = k[T - 1], N = D ? D.index ?? D.pollen_index : null;
            z.push(oi(N));
          }
        }
      else if (e.mode === "hourly" || e.mode === "twice_daily")
        for (let b = 0; b < A; ++b) {
          const T = k[b], D = T ? Number(T[`pollen_${C}`]) : NaN;
          z.push(Wi(C, D));
        }
      else {
        const b = Number(v.attributes[`pollen_${C}`]);
        z.push(Wi(C, b));
        for (let T = 1; T < A; ++T) {
          const D = k[T - 1], N = D ? Number(D[`pollen_${C}`]) : NaN;
          z.push(Wi(C, N));
        }
      }
      for (let b = 0; b < A; ++b) {
        const T = z[b];
        let D, N, H;
        if (e.mode === "hourly" || e.mode === "twice_daily")
          if (k[b] && (k[b].datetime || k[b].time) ? H = new Date(k[b].datetime || k[b].time) : H = new Date(g.getTime() + b * 36e5), e.mode === "twice_daily") {
            const G = H.toLocaleDateString(o, { weekday: "short" });
            D = G.charAt(0).toUpperCase() + G.slice(1), N = b % 2 === 0 ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down", l && (D = D.toUpperCase());
          } else
            D = H.toLocaleTimeString(o, {
              hour: "2-digit",
              minute: "2-digit"
            }) || "", N = null;
        else
          H = new Date(g.getTime() + b * 864e5), a ? u[b] != null ? D = u[b] : b >= 0 && b <= 2 ? D = Y(`card.days.${b}`, s) : D = H.toLocaleDateString(o, {
            day: "numeric",
            month: "short"
          }) : (D = H.toLocaleDateString(o, {
            weekday: n ? "short" : "long"
          }), D = D.charAt(0).toUpperCase() + D.slice(1)), l && (D = D.toUpperCase()), N = null;
        const V = T < 0 ? 0 : Math.min(Math.round(T), 6), F = T < 0 ? h : c[V] || String(T);
        m[`day${b}`] = {
          name: m.allergenCapitalized,
          day: D,
          icon: N,
          state: T,
          state_text: F
        }, m.days.push(m[`day${b}`]);
      }
      (m.days.some((b) => b.state >= _) || _ === 0) && P.push(m);
    } catch (m) {
      r && console.warn(`[SILAM] Fel vid allergen ${C}:`, m);
    }
  if (e.sort !== "none" && P.sort(
    {
      value_ascending: (C, m) => {
        var E, M;
        return (((E = C.day0) == null ? void 0 : E.state) ?? 0) - (((M = m.day0) == null ? void 0 : M.state) ?? 0);
      },
      value_descending: (C, m) => {
        var E, M;
        return (((E = m.day0) == null ? void 0 : E.state) ?? 0) - (((M = C.day0) == null ? void 0 : M.state) ?? 0);
      },
      name_ascending: (C, m) => C.allergenCapitalized.localeCompare(m.allergenCapitalized),
      name_descending: (C, m) => m.allergenCapitalized.localeCompare(C.allergenCapitalized)
    }[e.sort] || ((C, m) => {
      var E, M;
      return (((E = m.day0) == null ? void 0 : E.state) ?? 0) - (((M = C.day0) == null ? void 0 : M.state) ?? 0);
    })
  ), e.index_top || e.allergy_risk_top) {
    const C = P.findIndex(
      (m) => m.allergenReplaced === "allergy_risk" || m.allergenReplaced === "index"
    );
    if (C > 0) {
      const [m] = P.splice(C, 1);
      P.unshift(m);
    }
  }
  return r && console.debug("[SILAM] fetchForecast klar:", P), P;
}
const Uc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SILAM_ALLERGENS: hs,
  SILAM_THRESHOLDS: va,
  fetchForecast: Gc,
  getAllergenNames: wa,
  getLevelNames: xa,
  getPhrases: ba,
  grainsToLevel: Wi,
  indexToLevel: oi,
  stubConfigSILAM: Te
}, Symbol.toStringTag, { value: "Module" })), ze = {
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
  ...j,
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
}, Jt = ["allergy_risk", ...ze.allergens];
async function Vc(t, e) {
  var C, m, E, M, R, z;
  const i = !!e.debug, r = Ee(t, e.date_locale), s = e.date_locale || ((C = t.locale) == null ? void 0 : C.language) || t.language || `${r}-${r.toUpperCase()}`, o = e.days_relative !== !1, a = !!e.days_abbreviated, n = !!e.days_uppercase, l = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...e.phrases || {}
  }, d = l.full, c = l.short, h = l.levels, u = 5;
  let f = Array.from(
    { length: 7 },
    (O, b) => Y(`card.levels.${b}`, r)
  ).slice();
  Array.isArray(h) && (h.length === 7 ? f = Gt(h, r) : h.length === u && [0, 1, 3, 5, 6].forEach((b, T) => {
    const D = h[T];
    D != null && D !== "" && (f[b] = D);
  }));
  const _ = l.no_information || Y("card.no_information", r), p = l.days, y = e.integration === "dwd" ? 3 : e.integration === "peu" ? 4 : 6, v = (O) => {
    const b = Number(O);
    return isNaN(b) || b < 0 ? -1 : b > y ? y : b;
  }, x = /* @__PURE__ */ new Date();
  x.setHours(0, 0, 0, 0);
  const L = e.days_to_show ?? ze.days_to_show, k = e.pollen_threshold ?? ze.pollen_threshold, A = e.mode || ze.mode, P = {
    hourly: 1,
    hourly_second: 2,
    hourly_third: 3,
    hourly_fourth: 4,
    hourly_sixth: 6,
    hourly_eighth: 8,
    twice_daily: 12
  }, $ = Object.keys(t.states).filter(
    (O) => O.startsWith("sensor.polleninformation_")
  );
  let S = e.location === "manual" ? "" : e.location;
  if (!S && e.location !== "manual" && $.length) {
    const O = $[0].match(/^sensor\.polleninformation_(.+)_[^_]+$/);
    S = O ? O[1] : "";
  }
  const w = [];
  for (const O of e.allergens)
    try {
      const b = {};
      b.days = [];
      const T = O;
      b.allergenReplaced = T;
      const D = Oe[T] || T;
      if (d[T])
        b.allergenCapitalized = d[T];
      else {
        const U = Y(`card.allergen.${D}`, r);
        b.allergenCapitalized = U !== `card.allergen.${D}` ? U : T.charAt(0).toUpperCase() + T.slice(1);
      }
      if (e.allergens_abbreviated) {
        const U = c[T];
        b.allergenShort = U || Y(`editor.phrases_short.${D}`, r) || b.allergenCapitalized;
      } else
        b.allergenShort = b.allergenCapitalized;
      let N;
      if (e.location === "manual") {
        const U = e.entity_prefix || "", he = A !== "daily" && T === "allergy_risk" ? "allergy_risk_hourly" : T, ie = e.entity_suffix || "";
        if (N = `sensor.${U}${he}${ie}`, !t.states[N]) continue;
      } else if (A !== "daily" && T === "allergy_risk" ? N = S ? `sensor.polleninformation_${S}_allergy_risk_hourly` : null : N = S ? `sensor.polleninformation_${S}_${T}` : null, !N || !t.states[N]) {
        const U = $.filter((he) => {
          const ie = he.match(/^sensor\.polleninformation_(.+)_(.+)$/);
          if (!ie) return !1;
          const te = ie[1], ne = ie[2];
          return A !== "daily" && T === "allergy_risk" ? (!S || te === S) && ne === "allergy_risk_hourly" : (!S || te === S) && ne === T;
        });
        if (U.length === 1) N = U[0];
        else continue;
      }
      const H = t.states[N];
      b.entity_id = N;
      const V = ((m = H == null ? void 0 : H.attributes) == null ? void 0 : m.data_stale) === !0, F = Array.isArray((E = H == null ? void 0 : H.attributes) == null ? void 0 : E.forecast) && ((R = (M = H == null ? void 0 : H.attributes) == null ? void 0 : M.forecast) == null ? void 0 : R.length) > 0;
      if (V || !F) {
        b.stale = !0, b.staleSince = ((z = H == null ? void 0 : H.attributes) == null ? void 0 : z.stale_since) || null, b.days = [], w.push(b);
        continue;
      }
      const G = H.attributes.forecast;
      if (A !== "daily" && T === "allergy_risk") {
        const U = P[A] || 1, he = Math.min(
          Math.floor(G.length / U),
          L
        );
        for (let ie = 0; ie < he; ++ie) {
          const te = G[ie * U] || {}, ne = te.time ? new Date(te.time) : te.datetime ? new Date(te.datetime) : new Date(x.getTime() + ie * U * 36e5);
          let we, Re = null;
          A === "twice_daily" ? (we = ne.toLocaleDateString(s, { weekday: "short" }).replace(/^./, (Ie) => Ie.toUpperCase()), n && (we = we.toUpperCase()), Re = ie % 2 === 0 ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down") : we = ne.toLocaleTimeString(s, {
            hour: "2-digit",
            minute: "2-digit"
          }) || "";
          let Le = Number(te.numeric_state ?? te.level ?? -1), ut = Le;
          T === "allergy_risk" && e.numeric_state_raw_risk && (ut = Number(
            te.numeric_state_raw ?? te.level_raw ?? ut
          ));
          const gt = oi(Le), tt = {
            name: b.allergenCapitalized,
            day: we,
            icon: Re,
            state: Le,
            // Separate property used purely for numeric display.
            display_state: ut,
            state_text: gt < 0 ? _ : f[gt] || Y(`card.levels.${gt}`, r)
          };
          b[`day${ie}`] = tt, b.days.push(tt);
        }
      } else {
        const U = G.reduce((ne, we) => {
          const Re = we.time || we.datetime;
          return ne[Re] = we, ne;
        }, {}), ie = Object.keys(U).sort(
          (ne, we) => new Date(ne) - new Date(we)
        ).filter((ne) => new Date(ne) >= x);
        let te = [];
        if (ie.length >= L)
          te = ie.slice(0, L);
        else {
          te = ie.slice();
          let ne = ie.length > 0 ? new Date(ie[ie.length - 1]) : x;
          for (; te.length < L; ) {
            ne = new Date(ne.getTime() + 864e5);
            const we = ne.getFullYear(), Re = String(ne.getMonth() + 1).padStart(2, "0"), Le = String(ne.getDate()).padStart(2, "0");
            te.push(`${we}-${Re}-${Le}T00:00:00`);
          }
        }
        te.forEach((ne, we) => {
          const Re = U[ne] || {};
          let Le = v(Re.level), ut = Le;
          if (T === "allergy_risk" && e.numeric_state_raw_risk && (Re.numeric_state_raw != null ? ut = Number(Re.numeric_state_raw) : Re.level_raw != null && (ut = Number(Re.level_raw))), Le !== null && Le >= 0) {
            const gt = new Date(ne), tt = Math.round((gt - x) / 864e5);
            let Ie;
            o ? p[tt] != null ? Ie = p[tt] : tt >= 0 && tt <= 2 ? Ie = Y(`card.days.${tt}`, r) : Ie = gt.toLocaleDateString(s, {
              day: "numeric",
              month: "short"
            }) : (Ie = gt.toLocaleDateString(s, {
              weekday: a ? "short" : "long"
            }), Ie = Ie.charAt(0).toUpperCase() + Ie.slice(1)), n && (Ie = Ie.toUpperCase());
            let Ut;
            Le < 2 ? Ut = Math.floor(Le * 6 / 4) : Ut = Math.ceil(Le * 6 / 4);
            const Xs = {
              name: b.allergenCapitalized,
              day: Ie,
              state: Le,
              // Raw value used only for display when available.
              display_state: ut,
              state_text: Ut < 0 ? _ : f[Ut] || Y(`card.levels.${Ut}`, r)
            };
            b[`day${we}`] = Xs, b.days.push(Xs);
          }
        });
      }
      (b.days.some((U) => U.state >= k) || k === 0) && w.push(b);
    } catch (b) {
      i && console.warn(`Fel vid allergen ${O}:`, b);
    }
  if (e.sort !== "none" && w.sort(
    {
      value_ascending: (O, b) => {
        var T, D;
        return (((T = O.day0) == null ? void 0 : T.state) ?? 0) - (((D = b.day0) == null ? void 0 : D.state) ?? 0);
      },
      value_descending: (O, b) => {
        var T, D;
        return (((T = b.day0) == null ? void 0 : T.state) ?? 0) - (((D = O.day0) == null ? void 0 : D.state) ?? 0);
      },
      name_ascending: (O, b) => O.allergenCapitalized.localeCompare(b.allergenCapitalized),
      name_descending: (O, b) => b.allergenCapitalized.localeCompare(O.allergenCapitalized)
    }[e.sort] || ((O, b) => {
      var T, D;
      return (((T = b.day0) == null ? void 0 : T.state) ?? 0) - (((D = O.day0) == null ? void 0 : D.state) ?? 0);
    })
  ), e.allergy_risk_top) {
    const O = w.findIndex(
      (b) => b.allergenReplaced === "allergy_risk" || b.allergenReplaced === "index"
    );
    if (O > 0) {
      const [b] = w.splice(O, 1);
      w.unshift(b);
    }
  }
  return i && console.debug("PEU.fetchForecast — done", w), w;
}
const Wc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PEU_ALLERGENS: Jt,
  fetchForecast: Vc,
  stubConfigPEU: ze
}, Symbol.toStringTag, { value: "Module" })), xo = "kleenex_pollen_radar", wo = {
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
  ...j,
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
function Kc(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const Yc = {
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
function Pi(t, e) {
  const i = Number(t);
  if (isNaN(i) || i < 0) return -1;
  if (i === 0) return 0;
  const r = Yc[e] || "trees";
  let s;
  switch (r) {
    case "trees":
      s = [95, 207, 703];
      break;
    case "weeds":
      s = [20, 77, 266];
      break;
    case "grass":
      s = [29, 60, 341];
      break;
    default:
      s = [95, 207, 703];
  }
  return i <= s[0] ? 1 : i <= s[1] ? 2 : i <= s[2] ? 3 : 4;
}
async function Xc(t, e) {
  var L, k, A, P, $, S, w, C;
  const i = Ee(t, e.date_locale), r = e.debug, s = e.days_to_show || Me.days_to_show, o = ((L = e.phrases) == null ? void 0 : L.short) || {}, a = ((k = e.phrases) == null ? void 0 : k.full) || {}, n = e.pollen_threshold ?? Me.pollen_threshold, l = 4, d = (m) => {
    const E = Number(m);
    return isNaN(E) || E < 0 ? -1 : E > l ? l : E;
  };
  r && console.debug("[Kleenex] Adapter: start fetchForecast", { config: e, lang: i });
  const c = /* @__PURE__ */ new Date();
  c.setHours(0, 0, 0, 0);
  let h = Object.values(t.states).filter((m) => m.entity_id && m.entity_id.startsWith(`sensor.${xo}_`));
  if (e.location && e.location !== "manual") {
    const m = Ae(e.location);
    r && console.debug(
      `[Kleenex] Filtering sensors for location: ${e.location} (normalized: ${m})`
    ), h = h.filter((E) => {
      const R = E.entity_id.replace(`sensor.${xo}_`, "").replace(/_[^_]+$/, ""), z = R === m;
      return r && z && console.debug(
        `[Kleenex] Location match: ${E.entity_id} -> locPart: ${R}`
      ), z;
    }), r && console.debug(
      `[Kleenex] After location filtering: ${h.length} sensors for location '${m}'`
    );
  } else if (e.location === "manual") {
    let m = e.entity_prefix || "";
    if (m.startsWith("sensor.") && (m = m.substring(7)), m && !m.endsWith("_") && (m = m + "_"), r && console.debug(
      `[Kleenex] Manual mode filtering with prefix: '${m}'`
    ), m) {
      const E = `sensor.${m}`;
      h = h.filter((M) => {
        const R = M.entity_id.startsWith(E);
        return r && R && console.debug(
          `[Kleenex] Manual mode match: ${M.entity_id}`
        ), R;
      }), r && console.debug(
        `[Kleenex] After manual mode filtering: ${h.length} sensors with prefix '${E}'`
      );
    }
  }
  r && console.debug(
    "[Kleenex] Sensors found:",
    h.map((m) => m.entity_id)
  );
  let u = [];
  const g = /* @__PURE__ */ new Map();
  r && console.debug(
    `[Kleenex] Processing ${h.length} sensors for allergens:`,
    e.allergens
  );
  for (const m of h) {
    r && console.debug(`[Kleenex] === PROCESSING SENSOR: ${m.entity_id} ===`);
    const E = m.attributes || {}, M = E.details || [], R = E.forecast || [];
    let z = null;
    const O = m.entity_id.split("_").pop();
    for (const [b, T] of Object.entries(us))
      if (O.startsWith(b)) {
        z = T;
        break;
      }
    if (r && console.debug(
      `[Kleenex] Processing sensor ${m.entity_id}, category: ${z}, details count: ${M.length}, forecast days: ${R.length}`
    ), z) {
      let b = z;
      if (z === "trees" && e.allergens.includes("trees_cat") ? b = "trees_cat" : z === "grass" && e.allergens.includes("grass_cat") ? b = "grass_cat" : z === "weeds" && e.allergens.includes("weeds_cat") && (b = "weeds_cat"), r && console.debug(
        `[Kleenex] Category sensor mapping: ${z} -> ${b}, included in config: ${e.allergens.includes(b)}`
      ), e.allergens.includes(b)) {
        r && console.debug(
          `[Kleenex] Processing CATEGORY sensor for: ${z} -> ${b}`
        ), g.has(b) || (g.set(b, {
          levels: [],
          entity_id: m.entity_id,
          source: "category_sensor"
          // Track data source
        }), r && console.debug(`[Kleenex] CREATED allergenData entry for category: ${b}`));
        const T = g.get(b), D = Number(m.state) || 0, N = Pi(D, b), H = d(N);
        r && console.debug(
          `[Kleenex] CATEGORY ${b} TODAY: sensor_state=${m.state}, parsed_value=${D}, raw_level=${N}, clamped_level=${H}, text_level=${(A = m.attributes) == null ? void 0 : A.level}`
        ), T.levels[0] = {
          date: new Date(c),
          level: H,
          // Store raw level (0-4)
          value: D
        }, r && console.debug(`[Kleenex] CATEGORY ${b} TODAY DATA SET: level=${H}, value=${D}`), R.forEach((V, F) => {
          const G = Number(V.value) || 0, K = Pi(G, b), U = d(K);
          r && console.debug(
            `[Kleenex] CATEGORY ${b} FORECAST day ${F + 1}: value=${G}, raw_level=${K}, clamped_level=${U}, text_level=${V.level}`
          ), T.levels[F + 1] = {
            date: new Date(c.getTime() + (F + 1) * 864e5),
            level: U,
            // Store raw level (0-4)
            value: G
          }, r && console.debug(`[Kleenex] CATEGORY ${b} FORECAST DAY ${F + 1} DATA SET: level=${U}, value=${G}`);
        });
      } else
        r && console.debug(
          `[Kleenex] SKIPPING category sensor ${z} -> ${b}: not in config.allergens [${e.allergens.join(", ")}]`
        );
    }
    r && console.debug(`[Kleenex] Processing ${M.length} individual allergen details for sensor: ${m.entity_id}`);
    try {
      for (const b of M) {
        const T = (P = b.name) == null ? void 0 : P.toLowerCase();
        if (!T) continue;
        const D = wo[T] || T;
        if (!e.allergens.includes(D)) {
          r && b.value !== void 0 && console.debug(
            `[Kleenex] SKIPPING individual allergen ${D} (${T}): not in config allergens`
          );
          continue;
        }
        r && console.debug(
          `[Kleenex] Processing INDIVIDUAL allergen: ${D} (original: ${T})`
        ), g.has(D) || g.set(D, {
          levels: [],
          entity_id: m.entity_id,
          source: "individual_details"
          // Track data source
        });
        const N = g.get(D), H = Number(b.value) || 0, V = Pi(H, D), F = d(V);
        r && console.debug(
          `[Kleenex] INDIVIDUAL ${D} TODAY: detail_value=${b.value}, parsed_value=${H}, raw_level=${V}, clamped_level=${F}, text_level=${b.level}, source=${m.entity_id}`
        ), (!N.levels[0] || N.source === "individual_details") && (N.levels[0] = {
          date: new Date(c),
          level: F,
          // Store raw level (0-4)
          value: H
        });
      }
    } catch (b) {
      r && console.warn(`[Kleenex] Error processing individual allergens for sensor ${m.entity_id}:`, b);
    }
    try {
      R.forEach((b, T) => {
        var H;
        const D = new Date(
          c.getTime() + (T + 1) * 864e5
        ), N = b.details || [];
        r && N.length > 0 && console.debug(
          `[Kleenex] Processing forecast day ${T + 1} with ${N.length} allergen details`
        );
        for (const V of N) {
          const F = (H = V.name) == null ? void 0 : H.toLowerCase();
          if (!F) continue;
          const G = wo[F] || F;
          if (!e.allergens.includes(G)) continue;
          g.has(G) || g.set(G, {
            levels: [],
            entity_id: m.entity_id,
            source: "individual_forecast"
            // Track data source
          });
          const K = g.get(G), U = Number(V.value) || 0, he = Pi(U, G), ie = d(he);
          r && console.debug(
            `[Kleenex] INDIVIDUAL ${G} FORECAST day ${T + 1}: detail_value=${V.value}, parsed_value=${U}, raw_level=${he}, clamped_level=${ie}, text_level=${V.level}`
          );
          const te = T + 1;
          (!K.levels[te] || K.source === "individual_forecast" || K.source === "individual_details") && (K.levels[te] = {
            date: D,
            level: ie,
            // Store raw level (0-4)
            value: U
          });
        }
      });
    } catch (b) {
      r && console.warn(`[Kleenex] Error processing forecast data for sensor ${m.entity_id}:`, b);
    }
  }
  r && (console.debug(
    "[Kleenex] === ALLERGEN DATA COLLECTION COMPLETE ==="
  ), console.debug(
    `[Kleenex] Collected data for ${g.size} allergens:`,
    Array.from(g.keys())
  ), g.size === 0 ? (console.debug("[Kleenex] WARNING: No allergen data collected! This will result in empty sensors array."), console.debug("[Kleenex] Checking config:", {
    allergens: e.allergens,
    location: e.location,
    filteredSensorCount: h.length
  }), console.debug("[Kleenex] Sensor entity IDs processed:", h.map((m) => m.entity_id)), console.debug("[Kleenex] Was any category sensor found that matches config allergens?")) : (console.debug("[Kleenex] DETAILED ALLERGEN DATA ANALYSIS:"), g.forEach((m, E) => {
    var O;
    const M = ["trees_cat", "grass_cat", "weeds_cat"].includes(E);
    console.debug(`[Kleenex] === ${E.toUpperCase()} (${M ? "CATEGORY" : "INDIVIDUAL"}) ===`), console.debug(`[Kleenex] Source: ${m.source}`), console.debug(`[Kleenex] Entity: ${m.entity_id}`), console.debug(`[Kleenex] Levels array length: ${m.levels.length}`), console.debug(`[Kleenex] Valid levels count (>= 0): ${m.levels.filter((b) => b.level >= 0).length}`), m.levels.forEach((b, T) => {
      var N;
      const D = T === 0 ? "TODAY" : `DAY+${T}`;
      console.debug(`[Kleenex] ${E} ${D}: date=${(N = b.date) == null ? void 0 : N.toISOString().split("T")[0]}, level=${b.level}, value=${b.value}`);
    });
    const R = (O = m.levels[0]) == null ? void 0 : O.level, z = R !== void 0 && R >= 0;
    console.debug(`[Kleenex] ${E} TODAY DATA CHECK: hasValidToday=${z}, todayLevel=${R}`);
  })));
  const f = e.days_relative ?? Me.days_relative, _ = e.days_abbreviated ?? Me.days_abbreviated, p = e.days_uppercase ?? Me.days_uppercase, y = (($ = e.phrases) == null ? void 0 : $.days) || {}, v = i.replace("_", "-");
  r && (console.debug(`[Kleenex] === BUILDING SENSORS FROM ${g.size} COLLECTED ALLERGENS ===`), console.debug(`[Kleenex] pollen_threshold = ${n}`), g.forEach((m, E) => {
    console.debug(`[Kleenex] Building sensor for: ${E}, source: ${m.source}, levels_count: ${m.levels.length}`), m.levels[0] ? console.debug(`[Kleenex] ${E} today data: level=${m.levels[0].level}, value=${m.levels[0].value}`) : console.debug(`[Kleenex] ${E} WARNING: No today data found!`);
  }));
  const x = e.sort === "none" ? e.allergens.filter((m) => g.has(m)) : Array.from(g.keys());
  r && console.debug(
    `[Kleenex] Building sensors array ${e.sort === "none" ? "in config order" : "in discovery order"}:`,
    x
  );
  for (const m of x) {
    const E = g.get(m);
    if (E)
      try {
        const M = {};
        M.allergenReplaced = m, M.entity_id = E.entity_id, M.days = [];
        const R = Oe[m] || m, z = a[m];
        if (z)
          M.allergenCapitalized = z;
        else {
          const G = `card.allergen.${Oe[m] || m}`, K = Y(G, i);
          M.allergenCapitalized = K !== G ? K : Kc(m);
        }
        if (e.allergens_abbreviated) {
          const F = o[m];
          M.allergenShort = F || Y(`editor.phrases_short.${R}`, i) || M.allergenCapitalized;
        } else
          M.allergenShort = M.allergenCapitalized;
        const O = E.levels;
        for (; O.length < s; ) {
          const F = O.length;
          O.push({
            date: new Date(c.getTime() + F * 864e5),
            level: -1,
            value: -1
          });
        }
        for (let F = 0; F < s; F++)
          O[F] || (O[F] = {
            date: new Date(c.getTime() + F * 864e5),
            level: -1,
            value: -1
          });
        const b = e.phrases.levels, T = 5;
        let N = Array.from(
          { length: 7 },
          (F, G) => Y(`card.levels.${G}`, i)
        ).slice();
        Array.isArray(b) && (b.length === 7 ? N = Gt(b, i) : b.length === T && [0, 1, 3, 5, 6].forEach((G, K) => {
          const U = b[K];
          U != null && U !== "" && (N[G] = U);
        })), M.levelNames = N;
        for (let F = 0; F < s; F++) {
          const G = O[F], K = G.date, U = Math.round((K - c) / 864e5);
          let he;
          f ? y[U] != null ? he = y[U] : U >= 0 && U <= 2 ? he = Y(`card.days.${U}`, i) : he = K.toLocaleDateString(v, {
            day: "numeric",
            month: "short"
          }) : (he = K.toLocaleDateString(v, {
            weekday: _ ? "short" : "long"
          }), he = he.charAt(0).toUpperCase() + he.slice(1)), p && (he = he.toUpperCase());
          const ie = G.level;
          let te;
          ie < 0 ? te = ie : ie < 2 ? te = Math.floor(ie * 6 / 4) : te = Math.ceil(ie * 6 / 4);
          const ne = {
            name: M.allergenCapitalized,
            day: he,
            state: ie,
            // Raw level for sorting and threshold checking
            state_text: te < 0 ? ((S = e.phrases) == null ? void 0 : S.no_information) || Y("card.no_information", i) : N[te] || Y(`card.levels.${te}`, i),
            value: G.value,
            description: te < 0 ? ((w = e.phrases) == null ? void 0 : w.no_information) || Y("card.no_information", i) : N[te] || Y(`card.levels.${te}`, i)
          };
          M[`day${F}`] = ne, M.days.push(ne);
        }
        const H = M.days.some((F) => F.state >= n), V = H || n === 0;
        if (r) {
          const F = ["trees_cat", "grass_cat", "weeds_cat"].includes(m);
          console.debug(
            `[Kleenex] === THRESHOLD CHECK for ${m} (${F ? "CATEGORY" : "INDIVIDUAL"}) ===`
          ), console.debug(`[Kleenex] pollen_threshold = ${n}`), console.debug(`[Kleenex] days.length = ${M.days.length}`), M.days.forEach((G, K) => {
            console.debug(`[Kleenex] ${m} day${K}: state=${G.state}, value=${G.value}, day=${G.day}, meets_threshold=${G.state >= n}`);
          }), console.debug(`[Kleenex] meets = ${H} (any day >= ${n})`), console.debug(`[Kleenex] shouldAdd = ${V} (meets || threshold===0)`), F && !V ? (console.debug(`[Kleenex] ❌ CATEGORY ALLERGEN ${m} FILTERED OUT BY THRESHOLD!`), console.debug(`[Kleenex] Highest level found: ${Math.max(...M.days.map((G) => G.state))}`)) : F && V && console.debug(`[Kleenex] ✅ CATEGORY ALLERGEN ${m} PASSES THRESHOLD CHECK`);
        }
        V ? (u.push(M), r && console.debug(
          `[Kleenex] SENSOR ADDED for ${m}: today_state=${(C = M.day0) == null ? void 0 : C.state}, entity_id=${M.entity_id}`
        )) : r && console.debug(
          `[Kleenex] SENSOR FILTERED OUT for ${m}: threshold not met (highest level: ${Math.max(...M.days.map((F) => F.state))})`
        );
      } catch (M) {
        console.warn(`[Kleenex] Adapter error for allergen ${m}:`, M);
      }
  }
  if (e.sort !== "none") {
    const m = {
      value_ascending: (E, M) => {
        var R, z;
        return (((R = E.day0) == null ? void 0 : R.state) ?? 0) - (((z = M.day0) == null ? void 0 : z.state) ?? 0);
      },
      value_descending: (E, M) => {
        var R, z;
        return (((R = M.day0) == null ? void 0 : R.state) ?? 0) - (((z = E.day0) == null ? void 0 : z.state) ?? 0);
      },
      name_ascending: (E, M) => E.allergenCapitalized.localeCompare(M.allergenCapitalized),
      name_descending: (E, M) => M.allergenCapitalized.localeCompare(E.allergenCapitalized)
    }[e.sort] || ((E, M) => {
      var R, z;
      return (((R = M.day0) == null ? void 0 : R.state) ?? 0) - (((z = E.day0) == null ? void 0 : z.state) ?? 0);
    });
    if (e.sort_category_allergens_first) {
      const E = u.filter(
        (R) => ["trees_cat", "grass_cat", "weeds_cat"].includes(R.allergenReplaced)
      ), M = u.filter(
        (R) => !["trees_cat", "grass_cat", "weeds_cat"].includes(R.allergenReplaced)
      );
      E.sort(m), M.sort(m), u = [...E, ...M], r && console.debug(
        `[Kleenex] Two-tiered sorting: ${E.length} category + ${M.length} individual allergens`
      );
    } else
      u.sort(m), r && console.debug(
        `[Kleenex] Standard sorting: ${u.length} allergens sorted together`
      );
  } else r && console.debug(
    `[Kleenex] No sorting applied: ${u.length} allergens kept in config order`
  );
  if (r) {
    if (console.debug("[Kleenex] === FINAL ADAPTER RESULTS ==="), console.debug(`[Kleenex] Total sensors returning: ${u.length}`), u.length === 0) {
      console.debug("[Kleenex] ❌ NO SENSORS RETURNED! Checking why:"), console.debug(`[Kleenex] - allergenData.size: ${g.size}`), console.debug(`[Kleenex] - pollen_threshold: ${n}`), console.debug(`[Kleenex] - config.allergens: [${e.allergens.join(", ")}]`);
      let m = 0;
      g.forEach((E, M) => {
        E.levels.some((z) => z.level >= n) || (m++, console.debug(`[Kleenex] - ${M} filtered by threshold (max level: ${Math.max(...E.levels.map((z) => z.level))})`));
      }), console.debug(`[Kleenex] - allergens filtered by threshold: ${m}`);
    } else
      console.debug("[Kleenex] ✅ SENSORS FOUND:"), u.forEach((m, E) => {
        var R;
        const M = ["trees_cat", "grass_cat", "weeds_cat"].includes(m.allergenReplaced);
        console.debug(`[Kleenex] ${E + 1}. ${m.allergenReplaced} (${M ? "CATEGORY" : "INDIVIDUAL"}): day0_state=${(R = m.day0) == null ? void 0 : R.state}, entity_id=${m.entity_id}`);
      });
    console.debug("[Kleenex] Adapter fetchForecast complete.");
  }
  return u;
}
function Zc() {
  return [];
}
async function qc() {
  return [];
}
const Jc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fetchForecast: Xc,
  findSensors: Zc,
  getData: qc,
  stubConfigKleenex: Me
}, Symbol.toStringTag, { value: "Module" })), Qc = "sensor.pollen_", ka = {
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
}, Ds = Object.keys(ka).sort(), Si = Object.entries(ka).reduce(
  (t, [e, i]) => {
    const r = Array.from(
      new Set(i.map((s) => Ae(s)))
    );
    return r.includes(e) || r.push(e), t[e] = r, t;
  },
  {}
), eh = {
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
}, We = {
  integration: "plu",
  allergens: [...Ds],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: "48",
  text_size_ratio: 1,
  ...j,
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
function th(t, e, i) {
  const r = Si[e] || [e];
  for (const s of r) {
    const o = `${Qc}${s}`;
    if (t.states[o])
      return i && console.debug(`[PLU] Using sensor '${o}' for allergen '${e}'`), o;
  }
  return null;
}
function ko(t, e) {
  const i = Number(t);
  return Number.isFinite(i) ? i : e;
}
function ih(t, e) {
  const i = Number(t);
  if (!Number.isFinite(i) || i < 0) return -1;
  if (i === 0) return 0;
  const { moderate: r, high: s } = e;
  return i < r ? 1 : i < s ? 2 : 3;
}
async function rh(t, e) {
  var k, A, P, $, S, w, C;
  const i = !!e.debug, r = Ee(t, e.date_locale), s = e.date_locale || ((k = t.locale) == null ? void 0 : k.language) || t.language || `${r}-${r.toUpperCase()}`, o = e.days_relative !== !1, a = !!e.days_abbreviated, n = !!e.days_uppercase, l = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...e.phrases || {}
  }, d = l.full, c = l.short, h = l.levels, u = l.days, g = Gt(h, r), _ = [0, 1, 3, 5].map((m, E) => {
    const M = Array.isArray(h) ? h[E] : void 0;
    return M != null && M !== "" ? M : g[m] || Y(`card.levels.${m}`, r);
  }), p = l.no_information || Y("card.no_information", r), y = e.pollen_threshold ?? We.pollen_threshold, v = Math.max(
    1,
    e.days_to_show ?? We.days_to_show
  ), x = /* @__PURE__ */ new Date();
  x.setHours(0, 0, 0, 0);
  const L = [];
  for (const m of e.allergens || []) {
    if (!Ds.includes(m)) continue;
    const E = { days: [] };
    E.allergenReplaced = m;
    const M = Oe[m] || m;
    if (d[m])
      E.allergenCapitalized = d[m];
    else {
      const U = Y(`card.allergen.${M}`, r);
      E.allergenCapitalized = U !== `card.allergen.${M}` ? U : m.charAt(0).toUpperCase() + m.slice(1);
    }
    if (e.allergens_abbreviated) {
      const U = c[m];
      E.allergenShort = U || Y(`editor.phrases_short.${M}`, r) || E.allergenCapitalized;
    } else
      E.allergenShort = E.allergenCapitalized;
    const R = th(t, m, i);
    if (!R) {
      i && console.debug(`[PLU] No sensor found for allergen '${m}'`);
      continue;
    }
    const z = t.states[R];
    if (!z) continue;
    E.entity_id = R, E.attributes = z.attributes || {};
    const O = Number(z.state), b = eh[m] || {
      moderate: 1,
      high: 2
    }, T = ko(
      (A = E.attributes) == null ? void 0 : A.moderate_threshold,
      b.moderate
    ), D = ko(
      (P = E.attributes) == null ? void 0 : P.high_threshold,
      b.high
    ), N = ih(O, { moderate: T, high: D }), H = ($ = E.attributes) != null && $.last_update ? new Date(E.attributes.last_update) : x;
    let V;
    o ? u[0] != null ? V = u[0] : V = Y("card.days.0", r) : (V = H.toLocaleDateString(s, {
      weekday: a ? "short" : "long"
    }), V = V.charAt(0).toUpperCase() + V.slice(1)), n && (V = V.toUpperCase());
    const F = N < 0 ? p : _[N] || p, G = {
      name: E.allergenCapitalized,
      day: V,
      state: N,
      display_state: Number.isFinite(O) ? O : N,
      state_text: F,
      thresholds: { moderate: T, high: D },
      level_string: ((S = E.attributes) == null ? void 0 : S.level) || null,
      last_update: ((w = E.attributes) == null ? void 0 : w.last_update) || null,
      next_poll: ((C = E.attributes) == null ? void 0 : C.next_poll) || null
    };
    for (E.day0 = G, E.days.push(G); E.days.length < v; )
      E.days.push({
        name: E.allergenCapitalized,
        day: "",
        state: -1,
        display_state: -1,
        state_text: p
      });
    (E.days.some(
      (U, he) => he === 0 && U.state >= y
    ) || y === 0) && L.push(E);
  }
  return e.sort !== "none" && L.sort(
    {
      value_ascending: (m, E) => {
        var M, R;
        return (((M = m.day0) == null ? void 0 : M.state) ?? 0) - (((R = E.day0) == null ? void 0 : R.state) ?? 0);
      },
      value_descending: (m, E) => {
        var M, R;
        return (((M = E.day0) == null ? void 0 : M.state) ?? 0) - (((R = m.day0) == null ? void 0 : R.state) ?? 0);
      },
      name_ascending: (m, E) => (m.allergenCapitalized || "").localeCompare(
        E.allergenCapitalized || "",
        r
      ),
      name_descending: (m, E) => (E.allergenCapitalized || "").localeCompare(
        m.allergenCapitalized || "",
        r
      ),
      none: () => 0
    }[e.sort] || ((m, E) => {
      var M, R;
      return (((M = m.day0) == null ? void 0 : M.state) ?? 0) - (((R = E.day0) == null ? void 0 : R.state) ?? 0);
    })
  ), L;
}
const sh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PLU_ALIAS_MAP: Si,
  PLU_SUPPORTED_ALLERGENS: Ds,
  fetchForecast: rh,
  stubConfigPLU: We
}, Symbol.toStringTag, { value: "Module" })), oh = {
  pp: Jr,
  dwd: Bc,
  peu: Wc,
  silam: Uc,
  kleenex: Jc,
  plu: sh
}, Sa = {
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
}, Oe = {
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
  weeds_cat: "weeds_cat",
  // Note: Category allergens use _cat suffix to distinguish from individuals
  // Icon mapping is handled separately in the image system
  // Pollen.lu specific translations and aliases
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
}, Mi = {
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
}, us = {
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
}, gs = [
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
], Aa = [
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
], me = {
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
  ...j,
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
async function nh(t, e) {
  var A, P;
  const i = [], r = !!e.debug, s = ($) => $.charAt(0).toUpperCase() + $.slice(1), o = ($) => {
    const [S] = $.split("T"), [w, C, m] = S.split("-").map(Number);
    return new Date(w, C - 1, m);
  }, a = /* @__PURE__ */ new Date();
  a.setHours(0, 0, 0, 0);
  const n = Ee(t, e.date_locale), l = e.date_locale || ((A = t.locale) == null ? void 0 : A.language) || t.language || `${n}-${n.toUpperCase()}`, d = e.days_relative !== !1, c = !!e.days_abbreviated, h = !!e.days_uppercase, u = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...e.phrases || {}
  }, g = u.full, f = u.short, _ = u.levels, p = Gt(_, n), y = u.no_information || Y("card.no_information", n), v = u.days;
  r && console.debug("PP.fetchForecast — start", { city: e.city, lang: n });
  const x = ($) => {
    const S = Number($);
    return isNaN(S) || S < 0 ? null : S > 6 ? 6 : S;
  }, L = e.days_to_show ?? me.days_to_show, k = e.pollen_threshold ?? me.pollen_threshold;
  for (const $ of e.allergens)
    try {
      const S = {};
      S.days = [];
      const w = Be($);
      if (S.allergenReplaced = w, this.debug && console.log(
        "[PP] allergen",
        $,
        "fullPhrases keys",
        Object.keys(g)
      ), g[$])
        S.allergenCapitalized = g[$];
      else {
        const D = Oe[w] || w, N = Y(`card.allergen.${D}`, n);
        S.allergenCapitalized = N !== `card.allergen.${D}` ? N : s($);
      }
      if (e.allergens_abbreviated) {
        const D = Oe[w] || w, N = f[$];
        S.allergenShort = N || Y(`editor.phrases_short.${D}`, n) || S.allergenCapitalized;
      } else
        S.allergenShort = S.allergenCapitalized;
      let C = e.city === "manual" ? "" : Be(e.city || "");
      if (!C) {
        const D = Object.keys(t.states).filter(
          (N) => N.startsWith("sensor.pollen_") && /^sensor\.pollen_(.+)_[^_]+$/.test(N)
        );
        if (D.length) {
          const N = D[0].match(/^sensor\.pollen_(.+)_[^_]+$/);
          C = N ? N[1] : "";
        }
      }
      let m;
      if (e.city === "manual") {
        const D = e.entity_prefix || "", N = e.entity_suffix || "";
        if (m = `sensor.${D}${w}${N}`, !t.states[m]) continue;
      } else if (m = C ? `sensor.pollen_${C}_${w}` : null, !m || !t.states[m]) {
        const D = C ? `sensor.pollen_${C}_` : "sensor.pollen_", N = Object.keys(t.states).filter(
          (H) => H.startsWith(D) && H.endsWith(`_${w}`)
        );
        if (N.length === 1) m = N[0];
        else continue;
      }
      const E = t.states[m];
      if (!((P = E == null ? void 0 : E.attributes) != null && P.forecast)) throw "Missing forecast";
      S.entity_id = m;
      const M = E.attributes.forecast, R = Array.isArray(M) ? M.reduce((D, N) => {
        const H = N.time || N.datetime;
        return D[H] = N, D;
      }, {}) : M, O = Object.keys(R).sort(
        (D, N) => o(D) - o(N)
      ).filter((D) => o(D) >= a);
      let b = [];
      if (O.length >= L)
        b = O.slice(0, L);
      else {
        b = O.slice();
        let D = O.length > 0 ? o(O[O.length - 1]) : a;
        for (; b.length < L; ) {
          D = new Date(D.getTime() + 864e5);
          const N = D.getFullYear(), H = String(D.getMonth() + 1).padStart(2, "0"), V = String(D.getDate()).padStart(2, "0");
          b.push(`${N}-${H}-${V}T00:00:00`);
        }
      }
      b.forEach((D, N) => {
        const H = R[D] || {}, V = x(H.level), F = o(D), G = Math.round((F - a) / 864e5);
        let K;
        if (d ? v[G] != null ? K = v[G] : G >= 0 && G <= 2 ? K = Y(`card.days.${G}`, n) : K = F.toLocaleDateString(l, {
          day: "numeric",
          month: "short"
        }) : (K = F.toLocaleDateString(l, {
          weekday: c ? "short" : "long"
        }), K = K.charAt(0).toUpperCase() + K.slice(1)), h && (K = K.toUpperCase()), V !== null) {
          const U = {
            name: S.allergenCapitalized,
            day: K,
            state: V,
            state_text: p[V]
          };
          S[`day${N}`] = U, S.days.push(U);
        } else if (k === 0) {
          const U = {
            name: S.allergenCapitalized,
            day: K,
            state: 0,
            state_text: y
          };
          S[`day${N}`] = U, S.days.push(U);
        }
      }), (S.days.some((D) => D.state >= k) || k === 0) && i.push(S);
    } catch (S) {
      console.warn(`[PP] Fel vid allergen ${$}:`, S);
    }
  return e.sort !== "none" && i.sort(
    {
      value_ascending: ($, S) => {
        var w, C;
        return (((w = $.day0) == null ? void 0 : w.state) ?? 0) - (((C = S.day0) == null ? void 0 : C.state) ?? 0);
      },
      value_descending: ($, S) => {
        var w, C;
        return (((w = S.day0) == null ? void 0 : w.state) ?? 0) - (((C = $.day0) == null ? void 0 : C.state) ?? 0);
      },
      name_ascending: ($, S) => $.allergenCapitalized.localeCompare(S.allergenCapitalized),
      name_descending: ($, S) => S.allergenCapitalized.localeCompare($.allergenCapitalized)
    }[e.sort] || (($, S) => {
      var w, C;
      return (((w = S.day0) == null ? void 0 : w.state) ?? 0) - (((C = $.day0) == null ? void 0 : C.state) ?? 0);
    })
  ), r && console.debug("PP.fetchForecast — done", i), i;
}
function So(t, e, i = !1) {
  const r = t.integration;
  let s = [];
  if (t.city === "manual" || t.region_id === "manual" || t.location === "manual" && r !== "kleenex") {
    let a = t.entity_prefix || "";
    a.startsWith("sensor.") && (a = a.substring(7)), a && !a.endsWith("_") && (a = a + "_");
    const n = t.entity_suffix || "";
    for (const l of t.allergens || []) {
      let d;
      if (r === "dwd")
        d = _i(l);
      else if (r === "silam") {
        d = null;
        for (const u of Object.values(ce.mapping)) {
          const g = Object.entries(u).reduce((f, [_, p]) => (f[p] = _, f), {});
          if (g[l]) {
            d = g[l];
            break;
          }
        }
        d || (d = Be(l));
      } else
        d = Be(l);
      let c = `sensor.${a}${d}${n}`, h = !!e.states[c];
      if (!h && n === "") {
        const u = `sensor.${a}${d}`, g = Object.keys(e.states).filter(
          (f) => f.startsWith(u)
        );
        g.length === 1 && (c = g[0], h = !0);
      }
      i && console.debug(
        `[findAvailableSensors][custom] allergen: '${l}', slug: '${d}', suffix: '${n}', sensorId: '${c}', exists: ${h}`
      ), h && s.push(c);
    }
    return i && console.debug(
      "[findAvailableSensors] Found sensors (",
      s.length,
      ") :",
      s
    ), s;
  }
  if (r === "pp") {
    let a = Be(t.city || "");
    if (!a) {
      const n = Object.keys(e.states).filter(
        (l) => l.startsWith("sensor.pollen_") && /^sensor\.pollen_(.+)_[^_]+$/.test(l)
      );
      if (n.length) {
        const l = n[0].match(/^sensor\.pollen_(.+)_[^_]+$/);
        a = l ? l[1] : "";
      }
    }
    for (const n of t.allergens || []) {
      const l = Be(n);
      let d = a ? `sensor.pollen_${a}_${l}` : null, c = d && e.states[d];
      if (!c) {
        const h = a ? `sensor.pollen_${a}_` : "sensor.pollen_", u = Object.keys(e.states).filter(
          (g) => g.startsWith(h) && g.endsWith(`_${l}`)
        );
        u.length === 1 && (d = u[0], c = !0);
      }
      i && console.debug(
        `[findAvailableSensors][pp] allergen: '${n}', cityKey: '${a}', rawKey: '${l}', sensorId: '${d}', exists: ${!!c}`
      ), c && s.push(d);
    }
  } else if (r === "dwd")
    for (const a of t.allergens || []) {
      const n = _i(a);
      let l = t.region_id ? `sensor.pollenflug_${n}_${t.region_id}` : null, d = l && e.states[l];
      if (!d) {
        const c = Object.keys(e.states).filter(
          (h) => h.startsWith(`sensor.pollenflug_${n}_`)
        );
        c.length === 1 && (l = c[0], d = !0);
      }
      i && console.debug(
        `[findAvailableSensors][dwd] allergen: '${a}', rawKey: '${n}', region_id: '${t.region_id}', sensorId: '${l}', exists: ${!!d}`
      ), d && s.push(l);
    }
  else if (r === "peu") {
    const a = Ae(t.location || "");
    for (const n of t.allergens || []) {
      const l = Be(n);
      let d = a ? `sensor.polleninformation_${a}_${l}` : null, c = d && e.states[d];
      if (!c) {
        const h = Object.keys(e.states).filter((u) => {
          const g = u.match(/^sensor\.polleninformation_(.+)_(.+)$/);
          if (!g) return !1;
          const f = g[1], _ = g[2];
          return (!a || f === a) && _ === l;
        });
        h.length === 1 && (d = h[0], c = !0);
      }
      i && console.debug(
        `[findAvailableSensors][peu] allergen: '${n}', locationSlug: '${a}', allergenSlug: '${l}', sensorId: '${d}', exists: ${!!c}`
      ), c && s.push(d);
    }
  } else if (r === "silam") {
    const a = (t.location || "").toLowerCase();
    for (const n of t.allergens || []) {
      let l = null;
      for (const d of Object.values(ce.mapping)) {
        const c = Object.entries(d).reduce((h, [u, g]) => (h[g] = u, h), {});
        if (c[n]) {
          const h = c[n], u = `sensor.silam_pollen_${a}_${h}`;
          if (e.states[u]) {
            l = h, i && console.debug(
              `[findAvailableSensors][silam] allergen: '${n}', locationSlug: '${a}', hassSlug: '${l}', sensorId: '${u}', exists: true`,
              e.states[u]
            ), s.push(u);
            break;
          }
        }
      }
      !l && i && console.debug(
        `[findAvailableSensors][silam] allergen: '${n}', locationSlug: '${a}', ingen sensor hittades!`
      );
    }
  } else if (r === "kleenex") {
    const a = Ae(t.location || ""), n = ["trees", "grass", "weeds"], l = t.allergens || [], d = /* @__PURE__ */ new Set();
    for (const c of l)
      if (n.includes(c))
        d.add(c);
      else if (c.endsWith("_cat")) {
        const h = c.replace("_cat", "");
        n.includes(h) && d.add(h);
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
          const f = Object.entries(us).filter(([y, v]) => v === c).map(([y, v]) => y), _ = `sensor.${u}`, p = Object.keys(e.states).filter((y) => {
            if (!y.startsWith(_)) return !1;
            const v = y.substring(_.length);
            if (g && !v.endsWith(g)) return !1;
            const x = g ? v.substring(0, v.length - g.length) : v;
            return f.some((L) => x.startsWith(L));
          });
          p.length >= 1 && (h = p[0]);
        }
      } else if (h = a ? `sensor.kleenex_pollen_radar_${a}_${c}` : null, !h || !e.states[h]) {
        const u = Object.entries(us).filter(([f, _]) => _ === c).map(([f, _]) => f), g = Object.keys(e.states).filter((f) => {
          if (!f.startsWith("sensor.kleenex_pollen_radar_")) return !1;
          const _ = f.split("_"), p = _[_.length - 1];
          return u.some((y) => p.startsWith(y));
        });
        g.length >= 1 && (h = g[0]);
      }
      if (i) {
        const g = t.location === "manual" ? `manual mode, prefix: '${t.entity_prefix || ""}', suffix: '${t.entity_suffix || ""}'` : `location: '${a}'`;
        console.debug(
          `[findAvailableSensors][kleenex] category: '${c}', ${g}, sensorId: '${h}', exists: ${!!e.states[h]}`
        );
      }
      e.states[h] && s.push(h);
    }
  } else if (r === "plu")
    for (const a of t.allergens || []) {
      const n = Si[a] || [Ae(a)];
      let l = null;
      for (const d of n) {
        const c = `sensor.pollen_${d}`;
        if (e.states[c]) {
          l = c;
          break;
        }
      }
      if (!l) {
        const d = Object.keys(e.states).filter((c) => {
          if (!c.startsWith("sensor.pollen_")) return !1;
          const h = c.slice(14);
          return h.includes("_") ? !1 : n.includes(h);
        });
        d.length === 1 && (l = d[0]);
      }
      i && console.debug(
        `[findAvailableSensors][plu] allergen: '${a}', aliases: ${n.join(",")}, sensorId: '${l}', exists: ${!!l}`
      ), l && s.push(l);
    }
  if (i) {
    const a = s.length;
    console.debug(
      "[findAvailableSensors] Found sensors (",
      a,
      "): ",
      s
    );
  }
  return s;
}
function Se(t, e) {
  if (t === e) return !0;
  if (typeof t != "object" || typeof e != "object" || !t || !e) return !1;
  const i = Object.keys(t), r = Object.keys(e);
  if (i.length !== r.length) return !1;
  for (let s of i) {
    if (!(s in e)) return !1;
    if (Array.isArray(t[s]) && Array.isArray(e[s])) {
      if (t[s].length !== e[s].length || [...t[s]].sort().join(",") !== [...e[s]].sort().join(","))
        return !1;
    } else if (typeof t[s] == "object" && typeof e[s] == "object") {
      if (!Se(t[s], e[s])) return !1;
    } else if (t[s] !== e[s])
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
function Ai(t) {
  return t + 0.5 | 0;
}
const rt = (t, e, i) => Math.max(Math.min(t, i), e);
function Qt(t) {
  return rt(Ai(t * 2.55), 0, 255);
}
function lt(t) {
  return rt(Ai(t * 255), 0, 255);
}
function qe(t) {
  return rt(Ai(t / 2.55) / 100, 0, 1);
}
function Ao(t) {
  return rt(Ai(t * 100), 0, 100);
}
const Ne = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, _s = [..."0123456789ABCDEF"], ah = (t) => _s[t & 15], lh = (t) => _s[(t & 240) >> 4] + _s[t & 15], $i = (t) => (t & 240) >> 4 === (t & 15), dh = (t) => $i(t.r) && $i(t.g) && $i(t.b) && $i(t.a);
function ch(t) {
  var e = t.length, i;
  return t[0] === "#" && (e === 4 || e === 5 ? i = {
    r: 255 & Ne[t[1]] * 17,
    g: 255 & Ne[t[2]] * 17,
    b: 255 & Ne[t[3]] * 17,
    a: e === 5 ? Ne[t[4]] * 17 : 255
  } : (e === 7 || e === 9) && (i = {
    r: Ne[t[1]] << 4 | Ne[t[2]],
    g: Ne[t[3]] << 4 | Ne[t[4]],
    b: Ne[t[5]] << 4 | Ne[t[6]],
    a: e === 9 ? Ne[t[7]] << 4 | Ne[t[8]] : 255
  })), i;
}
const hh = (t, e) => t < 255 ? e(t) : "";
function uh(t) {
  var e = dh(t) ? ah : lh;
  return t ? "#" + e(t.r) + e(t.g) + e(t.b) + hh(t.a, e) : void 0;
}
const gh = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ca(t, e, i) {
  const r = e * Math.min(i, 1 - i), s = (o, a = (o + t / 30) % 12) => i - r * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [s(0), s(8), s(4)];
}
function _h(t, e, i) {
  const r = (s, o = (s + t / 60) % 6) => i - i * e * Math.max(Math.min(o, 4 - o, 1), 0);
  return [r(5), r(3), r(1)];
}
function fh(t, e, i) {
  const r = Ca(t, 1, 0.5);
  let s;
  for (e + i > 1 && (s = 1 / (e + i), e *= s, i *= s), s = 0; s < 3; s++)
    r[s] *= 1 - e - i, r[s] += e;
  return r;
}
function ph(t, e, i, r, s) {
  return t === s ? (e - i) / r + (e < i ? 6 : 0) : e === s ? (i - t) / r + 2 : (t - e) / r + 4;
}
function Ts(t) {
  const i = t.r / 255, r = t.g / 255, s = t.b / 255, o = Math.max(i, r, s), a = Math.min(i, r, s), n = (o + a) / 2;
  let l, d, c;
  return o !== a && (c = o - a, d = n > 0.5 ? c / (2 - o - a) : c / (o + a), l = ph(i, r, s, c, o), l = l * 60 + 0.5), [l | 0, d || 0, n];
}
function zs(t, e, i, r) {
  return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, i, r)).map(lt);
}
function Os(t, e, i) {
  return zs(Ca, t, e, i);
}
function mh(t, e, i) {
  return zs(fh, t, e, i);
}
function yh(t, e, i) {
  return zs(_h, t, e, i);
}
function Ea(t) {
  return (t % 360 + 360) % 360;
}
function vh(t) {
  const e = gh.exec(t);
  let i = 255, r;
  if (!e)
    return;
  e[5] !== r && (i = e[6] ? Qt(+e[5]) : lt(+e[5]));
  const s = Ea(+e[2]), o = +e[3] / 100, a = +e[4] / 100;
  return e[1] === "hwb" ? r = mh(s, o, a) : e[1] === "hsv" ? r = yh(s, o, a) : r = Os(s, o, a), {
    r: r[0],
    g: r[1],
    b: r[2],
    a: i
  };
}
function bh(t, e) {
  var i = Ts(t);
  i[0] = Ea(i[0] + e), i = Os(i), t.r = i[0], t.g = i[1], t.b = i[2];
}
function xh(t) {
  if (!t)
    return;
  const e = Ts(t), i = e[0], r = Ao(e[1]), s = Ao(e[2]);
  return t.a < 255 ? `hsla(${i}, ${r}%, ${s}%, ${qe(t.a)})` : `hsl(${i}, ${r}%, ${s}%)`;
}
const Co = {
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
}, Eo = {
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
function wh() {
  const t = {}, e = Object.keys(Eo), i = Object.keys(Co);
  let r, s, o, a, n;
  for (r = 0; r < e.length; r++) {
    for (a = n = e[r], s = 0; s < i.length; s++)
      o = i[s], n = n.replace(o, Co[o]);
    o = parseInt(Eo[a], 16), t[n] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return t;
}
let Li;
function kh(t) {
  Li || (Li = wh(), Li.transparent = [0, 0, 0, 0]);
  const e = Li[t.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const Sh = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Ah(t) {
  const e = Sh.exec(t);
  let i = 255, r, s, o;
  if (e) {
    if (e[7] !== r) {
      const a = +e[7];
      i = e[8] ? Qt(a) : rt(a * 255, 0, 255);
    }
    return r = +e[1], s = +e[3], o = +e[5], r = 255 & (e[2] ? Qt(r) : rt(r, 0, 255)), s = 255 & (e[4] ? Qt(s) : rt(s, 0, 255)), o = 255 & (e[6] ? Qt(o) : rt(o, 0, 255)), {
      r,
      g: s,
      b: o,
      a: i
    };
  }
}
function Ch(t) {
  return t && (t.a < 255 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${qe(t.a)})` : `rgb(${t.r}, ${t.g}, ${t.b})`);
}
const Ir = (t) => t <= 31308e-7 ? t * 12.92 : Math.pow(t, 1 / 2.4) * 1.055 - 0.055, $t = (t) => t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
function Eh(t, e, i) {
  const r = $t(qe(t.r)), s = $t(qe(t.g)), o = $t(qe(t.b));
  return {
    r: lt(Ir(r + i * ($t(qe(e.r)) - r))),
    g: lt(Ir(s + i * ($t(qe(e.g)) - s))),
    b: lt(Ir(o + i * ($t(qe(e.b)) - o))),
    a: t.a + i * (e.a - t.a)
  };
}
function Di(t, e, i) {
  if (t) {
    let r = Ts(t);
    r[e] = Math.max(0, Math.min(r[e] + r[e] * i, e === 0 ? 360 : 1)), r = Os(r), t.r = r[0], t.g = r[1], t.b = r[2];
  }
}
function Pa(t, e) {
  return t && Object.assign(e || {}, t);
}
function Po(t) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = lt(t[3]))) : (e = Pa(t, { r: 0, g: 0, b: 0, a: 1 }), e.a = lt(e.a)), e;
}
function Ph(t) {
  return t.charAt(0) === "r" ? Ah(t) : vh(t);
}
class fi {
  constructor(e) {
    if (e instanceof fi)
      return e;
    const i = typeof e;
    let r;
    i === "object" ? r = Po(e) : i === "string" && (r = ch(e) || kh(e) || Ph(e)), this._rgb = r, this._valid = !!r;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = Pa(this._rgb);
    return e && (e.a = qe(e.a)), e;
  }
  set rgb(e) {
    this._rgb = Po(e);
  }
  rgbString() {
    return this._valid ? Ch(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? uh(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? xh(this._rgb) : void 0;
  }
  mix(e, i) {
    if (e) {
      const r = this.rgb, s = e.rgb;
      let o;
      const a = i === o ? 0.5 : i, n = 2 * a - 1, l = r.a - s.a, d = ((n * l === -1 ? n : (n + l) / (1 + n * l)) + 1) / 2;
      o = 1 - d, r.r = 255 & d * r.r + o * s.r + 0.5, r.g = 255 & d * r.g + o * s.g + 0.5, r.b = 255 & d * r.b + o * s.b + 0.5, r.a = a * r.a + (1 - a) * s.a, this.rgb = r;
    }
    return this;
  }
  interpolate(e, i) {
    return e && (this._rgb = Eh(this._rgb, e._rgb, i)), this;
  }
  clone() {
    return new fi(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = lt(e), this;
  }
  clearer(e) {
    const i = this._rgb;
    return i.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, i = Ai(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
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
    return Di(this._rgb, 2, e), this;
  }
  darken(e) {
    return Di(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return Di(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return Di(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return bh(this._rgb, e), this;
  }
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function Ye() {
}
const Mh = /* @__PURE__ */ (() => {
  let t = 0;
  return () => t++;
})();
function X(t) {
  return t == null;
}
function le(t) {
  if (Array.isArray && Array.isArray(t))
    return !0;
  const e = Object.prototype.toString.call(t);
  return e.slice(0, 7) === "[object" && e.slice(-6) === "Array]";
}
function Z(t) {
  return t !== null && Object.prototype.toString.call(t) === "[object Object]";
}
function ue(t) {
  return (typeof t == "number" || t instanceof Number) && isFinite(+t);
}
function De(t, e) {
  return ue(t) ? t : e;
}
function W(t, e) {
  return typeof t > "u" ? e : t;
}
const $h = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 : +t / e, Ma = (t, e) => typeof t == "string" && t.endsWith("%") ? parseFloat(t) / 100 * e : +t;
function se(t, e, i) {
  if (t && typeof t.call == "function")
    return t.apply(i, e);
}
function re(t, e, i, r) {
  let s, o, a;
  if (le(t))
    for (o = t.length, s = 0; s < o; s++)
      e.call(i, t[s], s);
  else if (Z(t))
    for (a = Object.keys(t), o = a.length, s = 0; s < o; s++)
      e.call(i, t[a[s]], a[s]);
}
function or(t, e) {
  let i, r, s, o;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (i = 0, r = t.length; i < r; ++i)
    if (s = t[i], o = e[i], s.datasetIndex !== o.datasetIndex || s.index !== o.index)
      return !1;
  return !0;
}
function nr(t) {
  if (le(t))
    return t.map(nr);
  if (Z(t)) {
    const e = /* @__PURE__ */ Object.create(null), i = Object.keys(t), r = i.length;
    let s = 0;
    for (; s < r; ++s)
      e[i[s]] = nr(t[i[s]]);
    return e;
  }
  return t;
}
function $a(t) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(t) === -1;
}
function Lh(t, e, i, r) {
  if (!$a(t))
    return;
  const s = e[t], o = i[t];
  Z(s) && Z(o) ? pi(s, o, r) : e[t] = nr(o);
}
function pi(t, e, i) {
  const r = le(e) ? e : [
    e
  ], s = r.length;
  if (!Z(t))
    return t;
  i = i || {};
  const o = i.merger || Lh;
  let a;
  for (let n = 0; n < s; ++n) {
    if (a = r[n], !Z(a))
      continue;
    const l = Object.keys(a);
    for (let d = 0, c = l.length; d < c; ++d)
      o(l[d], t, a, i);
  }
  return t;
}
function ni(t, e) {
  return pi(t, e, {
    merger: Dh
  });
}
function Dh(t, e, i) {
  if (!$a(t))
    return;
  const r = e[t], s = i[t];
  Z(r) && Z(s) ? ni(r, s) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = nr(s));
}
const Mo = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (t) => t,
  // default resolvers
  x: (t) => t.x,
  y: (t) => t.y
};
function Th(t) {
  const e = t.split("."), i = [];
  let r = "";
  for (const s of e)
    r += s, r.endsWith("\\") ? r = r.slice(0, -1) + "." : (i.push(r), r = "");
  return i;
}
function zh(t) {
  const e = Th(t);
  return (i) => {
    for (const r of e) {
      if (r === "")
        break;
      i = i && i[r];
    }
    return i;
  };
}
function dt(t, e) {
  return (Mo[e] || (Mo[e] = zh(e)))(t);
}
function Rs(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}
const mi = (t) => typeof t < "u", ct = (t) => typeof t == "function", $o = (t, e) => {
  if (t.size !== e.size)
    return !1;
  for (const i of t)
    if (!e.has(i))
      return !1;
  return !0;
};
function Oh(t) {
  return t.type === "mouseup" || t.type === "click" || t.type === "contextmenu";
}
const ee = Math.PI, oe = 2 * ee, Rh = oe + ee, ar = Number.POSITIVE_INFINITY, Ih = ee / 180, ge = ee / 2, ft = ee / 4, Lo = ee * 2 / 3, st = Math.log10, Ke = Math.sign;
function ai(t, e, i) {
  return Math.abs(t - e) < i;
}
function Do(t) {
  const e = Math.round(t);
  t = ai(t, e, t / 1e3) ? e : t;
  const i = Math.pow(10, Math.floor(st(t))), r = t / i;
  return (r <= 1 ? 1 : r <= 2 ? 2 : r <= 5 ? 5 : 10) * i;
}
function Nh(t) {
  const e = [], i = Math.sqrt(t);
  let r;
  for (r = 1; r < i; r++)
    t % r === 0 && (e.push(r), e.push(t / r));
  return i === (i | 0) && e.push(i), e.sort((s, o) => s - o).pop(), e;
}
function Bh(t) {
  return typeof t == "symbol" || typeof t == "object" && t !== null && !(Symbol.toPrimitive in t || "toString" in t || "valueOf" in t);
}
function Ht(t) {
  return !Bh(t) && !isNaN(parseFloat(t)) && isFinite(t);
}
function Hh(t, e) {
  const i = Math.round(t);
  return i - e <= t && i + e >= t;
}
function La(t, e, i) {
  let r, s, o;
  for (r = 0, s = t.length; r < s; r++)
    o = t[r][i], isNaN(o) || (e.min = Math.min(e.min, o), e.max = Math.max(e.max, o));
}
function He(t) {
  return t * (ee / 180);
}
function Is(t) {
  return t * (180 / ee);
}
function To(t) {
  if (!ue(t))
    return;
  let e = 1, i = 0;
  for (; Math.round(t * e) / e !== t; )
    e *= 10, i++;
  return i;
}
function Da(t, e) {
  const i = e.x - t.x, r = e.y - t.y, s = Math.sqrt(i * i + r * r);
  let o = Math.atan2(r, i);
  return o < -0.5 * ee && (o += oe), {
    angle: o,
    distance: s
  };
}
function fs(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function Fh(t, e) {
  return (t - e + Rh) % oe - ee;
}
function ve(t) {
  return (t % oe + oe) % oe;
}
function yi(t, e, i, r) {
  const s = ve(t), o = ve(e), a = ve(i), n = ve(o - s), l = ve(a - s), d = ve(s - o), c = ve(s - a);
  return s === o || s === a || r && o === a || n > l && d < c;
}
function pe(t, e, i) {
  return Math.max(e, Math.min(i, t));
}
function jh(t) {
  return pe(t, -32768, 32767);
}
function Je(t, e, i, r = 1e-6) {
  return t >= Math.min(e, i) - r && t <= Math.max(e, i) + r;
}
function Ns(t, e, i) {
  i = i || ((a) => t[a] < e);
  let r = t.length - 1, s = 0, o;
  for (; r - s > 1; )
    o = s + r >> 1, i(o) ? s = o : r = o;
  return {
    lo: s,
    hi: r
  };
}
const Qe = (t, e, i, r) => Ns(t, i, r ? (s) => {
  const o = t[s][e];
  return o < i || o === i && t[s + 1][e] === i;
} : (s) => t[s][e] < i), Gh = (t, e, i) => Ns(t, i, (r) => t[r][e] >= i);
function Uh(t, e, i) {
  let r = 0, s = t.length;
  for (; r < s && t[r] < e; )
    r++;
  for (; s > r && t[s - 1] > i; )
    s--;
  return r > 0 || s < t.length ? t.slice(r, s) : t;
}
const Ta = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function Vh(t, e) {
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
  }), Ta.forEach((i) => {
    const r = "_onData" + Rs(i), s = t[i];
    Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const a = s.apply(this, o);
        return t._chartjs.listeners.forEach((n) => {
          typeof n[r] == "function" && n[r](...o);
        }), a;
      }
    });
  });
}
function zo(t, e) {
  const i = t._chartjs;
  if (!i)
    return;
  const r = i.listeners, s = r.indexOf(e);
  s !== -1 && r.splice(s, 1), !(r.length > 0) && (Ta.forEach((o) => {
    delete t[o];
  }), delete t._chartjs);
}
function za(t) {
  const e = new Set(t);
  return e.size === t.length ? t : Array.from(e);
}
const Oa = (function() {
  return typeof window > "u" ? function(t) {
    return t();
  } : window.requestAnimationFrame;
})();
function Ra(t, e) {
  let i = [], r = !1;
  return function(...s) {
    i = s, r || (r = !0, Oa.call(window, () => {
      r = !1, t.apply(e, i);
    }));
  };
}
function Wh(t, e) {
  let i;
  return function(...r) {
    return e ? (clearTimeout(i), i = setTimeout(t, e, r)) : t.apply(this, r), e;
  };
}
const Bs = (t) => t === "start" ? "left" : t === "end" ? "right" : "center", ye = (t, e, i) => t === "start" ? e : t === "end" ? i : (e + i) / 2, Kh = (t, e, i, r) => t === (r ? "left" : "right") ? i : t === "center" ? (e + i) / 2 : e;
function Ia(t, e, i) {
  const r = e.length;
  let s = 0, o = r;
  if (t._sorted) {
    const { iScale: a, vScale: n, _parsed: l } = t, d = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null, c = a.axis, { min: h, max: u, minDefined: g, maxDefined: f } = a.getUserBounds();
    if (g) {
      if (s = Math.min(
        // @ts-expect-error Need to type _parsed
        Qe(l, c, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        i ? r : Qe(e, c, a.getPixelForValue(h)).lo
      ), d) {
        const _ = l.slice(0, s + 1).reverse().findIndex((p) => !X(p[n.axis]));
        s -= Math.max(0, _);
      }
      s = pe(s, 0, r - 1);
    }
    if (f) {
      let _ = Math.max(
        // @ts-expect-error Need to type _parsed
        Qe(l, a.axis, u, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        i ? 0 : Qe(e, c, a.getPixelForValue(u), !0).hi + 1
      );
      if (d) {
        const p = l.slice(_ - 1).findIndex((y) => !X(y[n.axis]));
        _ += Math.max(0, p);
      }
      o = pe(_, s, r) - s;
    } else
      o = r - s;
  }
  return {
    start: s,
    count: o
  };
}
function Na(t) {
  const { xScale: e, yScale: i, _scaleRanges: r } = t, s = {
    xmin: e.min,
    xmax: e.max,
    ymin: i.min,
    ymax: i.max
  };
  if (!r)
    return t._scaleRanges = s, !0;
  const o = r.xmin !== e.min || r.xmax !== e.max || r.ymin !== i.min || r.ymax !== i.max;
  return Object.assign(r, s), o;
}
const Ti = (t) => t === 0 || t === 1, Oo = (t, e, i) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * oe / i)), Ro = (t, e, i) => Math.pow(2, -10 * t) * Math.sin((t - e) * oe / i) + 1, li = {
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
  easeInSine: (t) => -Math.cos(t * ge) + 1,
  easeOutSine: (t) => Math.sin(t * ge),
  easeInOutSine: (t) => -0.5 * (Math.cos(ee * t) - 1),
  easeInExpo: (t) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: (t) => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
  easeInOutExpo: (t) => Ti(t) ? t : t < 0.5 ? 0.5 * Math.pow(2, 10 * (t * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: (t) => t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1),
  easeOutCirc: (t) => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: (t) => (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: (t) => Ti(t) ? t : Oo(t, 0.075, 0.3),
  easeOutElastic: (t) => Ti(t) ? t : Ro(t, 0.075, 0.3),
  easeInOutElastic(t) {
    return Ti(t) ? t : t < 0.5 ? 0.5 * Oo(t * 2, 0.1125, 0.45) : 0.5 + 0.5 * Ro(t * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (t) => 1 - li.easeOutBounce(1 - t),
  easeOutBounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
  },
  easeInOutBounce: (t) => t < 0.5 ? li.easeInBounce(t * 2) * 0.5 : li.easeOutBounce(t * 2 - 1) * 0.5 + 0.5
};
function Hs(t) {
  if (t && typeof t == "object") {
    const e = t.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function Io(t) {
  return Hs(t) ? t : new fi(t);
}
function Nr(t) {
  return Hs(t) ? t : new fi(t).saturate(0.5).darken(0.1).hexString();
}
const Yh = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Xh = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Zh(t) {
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
      properties: Xh
    },
    numbers: {
      type: "number",
      properties: Yh
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
function qh(t) {
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
const No = /* @__PURE__ */ new Map();
function Jh(t, e) {
  e = e || {};
  const i = t + JSON.stringify(e);
  let r = No.get(i);
  return r || (r = new Intl.NumberFormat(t, e), No.set(i, r)), r;
}
function Ci(t, e, i) {
  return Jh(e, i).format(t);
}
const Ba = {
  values(t) {
    return le(t) ? t : "" + t;
  },
  numeric(t, e, i) {
    if (t === 0)
      return "0";
    const r = this.chart.options.locale;
    let s, o = t;
    if (i.length > 1) {
      const d = Math.max(Math.abs(i[0].value), Math.abs(i[i.length - 1].value));
      (d < 1e-4 || d > 1e15) && (s = "scientific"), o = Qh(t, i);
    }
    const a = st(Math.abs(o)), n = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), l = {
      notation: s,
      minimumFractionDigits: n,
      maximumFractionDigits: n
    };
    return Object.assign(l, this.options.ticks.format), Ci(t, r, l);
  },
  logarithmic(t, e, i) {
    if (t === 0)
      return "0";
    const r = i[e].significand || t / Math.pow(10, Math.floor(st(t)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(r) || e > 0.8 * i.length ? Ba.numeric.call(this, t, e, i) : "";
  }
};
function Qh(t, e) {
  let i = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(i) >= 1 && t !== Math.floor(t) && (i = t - Math.floor(t)), i;
}
var pr = {
  formatters: Ba
};
function eu(t) {
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
      callback: pr.formatters.values,
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
const Et = /* @__PURE__ */ Object.create(null), ps = /* @__PURE__ */ Object.create(null);
function di(t, e) {
  if (!e)
    return t;
  const i = e.split(".");
  for (let r = 0, s = i.length; r < s; ++r) {
    const o = i[r];
    t = t[o] || (t[o] = /* @__PURE__ */ Object.create(null));
  }
  return t;
}
function Br(t, e, i) {
  return typeof e == "string" ? pi(di(t, e), i) : pi(di(t, ""), e);
}
class tu {
  constructor(e, i) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (r) => r.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
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
    }, this.hover = {}, this.hoverBackgroundColor = (r, s) => Nr(s.backgroundColor), this.hoverBorderColor = (r, s) => Nr(s.borderColor), this.hoverColor = (r, s) => Nr(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(i);
  }
  set(e, i) {
    return Br(this, e, i);
  }
  get(e) {
    return di(this, e);
  }
  describe(e, i) {
    return Br(ps, e, i);
  }
  override(e, i) {
    return Br(Et, e, i);
  }
  route(e, i, r, s) {
    const o = di(this, e), a = di(this, r), n = "_" + i;
    Object.defineProperties(o, {
      [n]: {
        value: o[i],
        writable: !0
      },
      [i]: {
        enumerable: !0,
        get() {
          const l = this[n], d = a[s];
          return Z(l) ? Object.assign({}, d, l) : W(l, d);
        },
        set(l) {
          this[n] = l;
        }
      }
    });
  }
  apply(e) {
    e.forEach((i) => i(this));
  }
}
var de = /* @__PURE__ */ new tu({
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
  Zh,
  qh,
  eu
]);
function iu(t) {
  return !t || X(t.size) || X(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
}
function lr(t, e, i, r, s) {
  let o = e[s];
  return o || (o = e[s] = t.measureText(s).width, i.push(s)), o > r && (r = o), r;
}
function ru(t, e, i, r) {
  r = r || {};
  let s = r.data = r.data || {}, o = r.garbageCollect = r.garbageCollect || [];
  r.font !== e && (s = r.data = {}, o = r.garbageCollect = [], r.font = e), t.save(), t.font = e;
  let a = 0;
  const n = i.length;
  let l, d, c, h, u;
  for (l = 0; l < n; l++)
    if (h = i[l], h != null && !le(h))
      a = lr(t, s, o, a, h);
    else if (le(h))
      for (d = 0, c = h.length; d < c; d++)
        u = h[d], u != null && !le(u) && (a = lr(t, s, o, a, u));
  t.restore();
  const g = o.length / 2;
  if (g > i.length) {
    for (l = 0; l < g; l++)
      delete s[o[l]];
    o.splice(0, g);
  }
  return a;
}
function pt(t, e, i) {
  const r = t.currentDevicePixelRatio, s = i !== 0 ? Math.max(i / 2, 0.5) : 0;
  return Math.round((e - s) * r) / r + s;
}
function Bo(t, e) {
  !e && !t || (e = e || t.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore());
}
function ms(t, e, i, r) {
  Ha(t, e, i, r, null);
}
function Ha(t, e, i, r, s) {
  let o, a, n, l, d, c, h, u;
  const g = e.pointStyle, f = e.rotation, _ = e.radius;
  let p = (f || 0) * Ih;
  if (g && typeof g == "object" && (o = g.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    t.save(), t.translate(i, r), t.rotate(p), t.drawImage(g, -g.width / 2, -g.height / 2, g.width, g.height), t.restore();
    return;
  }
  if (!(isNaN(_) || _ <= 0)) {
    switch (t.beginPath(), g) {
      // Default includes circle
      default:
        s ? t.ellipse(i, r, s / 2, _, 0, 0, oe) : t.arc(i, r, _, 0, oe), t.closePath();
        break;
      case "triangle":
        c = s ? s / 2 : _, t.moveTo(i + Math.sin(p) * c, r - Math.cos(p) * _), p += Lo, t.lineTo(i + Math.sin(p) * c, r - Math.cos(p) * _), p += Lo, t.lineTo(i + Math.sin(p) * c, r - Math.cos(p) * _), t.closePath();
        break;
      case "rectRounded":
        d = _ * 0.516, l = _ - d, a = Math.cos(p + ft) * l, h = Math.cos(p + ft) * (s ? s / 2 - d : l), n = Math.sin(p + ft) * l, u = Math.sin(p + ft) * (s ? s / 2 - d : l), t.arc(i - h, r - n, d, p - ee, p - ge), t.arc(i + u, r - a, d, p - ge, p), t.arc(i + h, r + n, d, p, p + ge), t.arc(i - u, r + a, d, p + ge, p + ee), t.closePath();
        break;
      case "rect":
        if (!f) {
          l = Math.SQRT1_2 * _, c = s ? s / 2 : l, t.rect(i - c, r - l, 2 * c, 2 * l);
          break;
        }
        p += ft;
      /* falls through */
      case "rectRot":
        h = Math.cos(p) * (s ? s / 2 : _), a = Math.cos(p) * _, n = Math.sin(p) * _, u = Math.sin(p) * (s ? s / 2 : _), t.moveTo(i - h, r - n), t.lineTo(i + u, r - a), t.lineTo(i + h, r + n), t.lineTo(i - u, r + a), t.closePath();
        break;
      case "crossRot":
        p += ft;
      /* falls through */
      case "cross":
        h = Math.cos(p) * (s ? s / 2 : _), a = Math.cos(p) * _, n = Math.sin(p) * _, u = Math.sin(p) * (s ? s / 2 : _), t.moveTo(i - h, r - n), t.lineTo(i + h, r + n), t.moveTo(i + u, r - a), t.lineTo(i - u, r + a);
        break;
      case "star":
        h = Math.cos(p) * (s ? s / 2 : _), a = Math.cos(p) * _, n = Math.sin(p) * _, u = Math.sin(p) * (s ? s / 2 : _), t.moveTo(i - h, r - n), t.lineTo(i + h, r + n), t.moveTo(i + u, r - a), t.lineTo(i - u, r + a), p += ft, h = Math.cos(p) * (s ? s / 2 : _), a = Math.cos(p) * _, n = Math.sin(p) * _, u = Math.sin(p) * (s ? s / 2 : _), t.moveTo(i - h, r - n), t.lineTo(i + h, r + n), t.moveTo(i + u, r - a), t.lineTo(i - u, r + a);
        break;
      case "line":
        a = s ? s / 2 : Math.cos(p) * _, n = Math.sin(p) * _, t.moveTo(i - a, r - n), t.lineTo(i + a, r + n);
        break;
      case "dash":
        t.moveTo(i, r), t.lineTo(i + Math.cos(p) * (s ? s / 2 : _), r + Math.sin(p) * _);
        break;
      case !1:
        t.closePath();
        break;
    }
    t.fill(), e.borderWidth > 0 && t.stroke();
  }
}
function et(t, e, i) {
  return i = i || 0.5, !e || t && t.x > e.left - i && t.x < e.right + i && t.y > e.top - i && t.y < e.bottom + i;
}
function mr(t, e) {
  t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
}
function yr(t) {
  t.restore();
}
function su(t, e, i, r, s) {
  if (!e)
    return t.lineTo(i.x, i.y);
  if (s === "middle") {
    const o = (e.x + i.x) / 2;
    t.lineTo(o, e.y), t.lineTo(o, i.y);
  } else s === "after" != !!r ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y);
  t.lineTo(i.x, i.y);
}
function ou(t, e, i, r) {
  if (!e)
    return t.lineTo(i.x, i.y);
  t.bezierCurveTo(r ? e.cp1x : e.cp2x, r ? e.cp1y : e.cp2y, r ? i.cp2x : i.cp1x, r ? i.cp2y : i.cp1y, i.x, i.y);
}
function nu(t, e) {
  e.translation && t.translate(e.translation[0], e.translation[1]), X(e.rotation) || t.rotate(e.rotation), e.color && (t.fillStyle = e.color), e.textAlign && (t.textAlign = e.textAlign), e.textBaseline && (t.textBaseline = e.textBaseline);
}
function au(t, e, i, r, s) {
  if (s.strikethrough || s.underline) {
    const o = t.measureText(r), a = e - o.actualBoundingBoxLeft, n = e + o.actualBoundingBoxRight, l = i - o.actualBoundingBoxAscent, d = i + o.actualBoundingBoxDescent, c = s.strikethrough ? (l + d) / 2 : d;
    t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = s.decorationWidth || 2, t.moveTo(a, c), t.lineTo(n, c), t.stroke();
  }
}
function lu(t, e) {
  const i = t.fillStyle;
  t.fillStyle = e.color, t.fillRect(e.left, e.top, e.width, e.height), t.fillStyle = i;
}
function Pt(t, e, i, r, s, o = {}) {
  const a = le(e) ? e : [
    e
  ], n = o.strokeWidth > 0 && o.strokeColor !== "";
  let l, d;
  for (t.save(), t.font = s.string, nu(t, o), l = 0; l < a.length; ++l)
    d = a[l], o.backdrop && lu(t, o.backdrop), n && (o.strokeColor && (t.strokeStyle = o.strokeColor), X(o.strokeWidth) || (t.lineWidth = o.strokeWidth), t.strokeText(d, i, r, o.maxWidth)), t.fillText(d, i, r, o.maxWidth), au(t, i, r, d, o), r += Number(s.lineHeight);
  t.restore();
}
function vi(t, e) {
  const { x: i, y: r, w: s, h: o, radius: a } = e;
  t.arc(i + a.topLeft, r + a.topLeft, a.topLeft, 1.5 * ee, ee, !0), t.lineTo(i, r + o - a.bottomLeft), t.arc(i + a.bottomLeft, r + o - a.bottomLeft, a.bottomLeft, ee, ge, !0), t.lineTo(i + s - a.bottomRight, r + o), t.arc(i + s - a.bottomRight, r + o - a.bottomRight, a.bottomRight, ge, 0, !0), t.lineTo(i + s, r + a.topRight), t.arc(i + s - a.topRight, r + a.topRight, a.topRight, 0, -ge, !0), t.lineTo(i + a.topLeft, r);
}
const du = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, cu = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function hu(t, e) {
  const i = ("" + t).match(du);
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
const uu = (t) => +t || 0;
function Fs(t, e) {
  const i = {}, r = Z(e), s = r ? Object.keys(e) : e, o = Z(t) ? r ? (a) => W(t[a], t[e[a]]) : (a) => t[a] : () => t;
  for (const a of s)
    i[a] = uu(o(a));
  return i;
}
function Fa(t) {
  return Fs(t, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function kt(t) {
  return Fs(t, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function xe(t) {
  const e = Fa(t);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function fe(t, e) {
  t = t || {}, e = e || de.font;
  let i = W(t.size, e.size);
  typeof i == "string" && (i = parseInt(i, 10));
  let r = W(t.style, e.style);
  r && !("" + r).match(cu) && (console.warn('Invalid font style specified: "' + r + '"'), r = void 0);
  const s = {
    family: W(t.family, e.family),
    lineHeight: hu(W(t.lineHeight, e.lineHeight), i),
    size: i,
    style: r,
    weight: W(t.weight, e.weight),
    string: ""
  };
  return s.string = iu(s), s;
}
function ei(t, e, i, r) {
  let s, o, a;
  for (s = 0, o = t.length; s < o; ++s)
    if (a = t[s], a !== void 0 && a !== void 0)
      return a;
}
function gu(t, e, i) {
  const { min: r, max: s } = t, o = Ma(e, (s - r) / 2), a = (n, l) => i && n === 0 ? 0 : n + l;
  return {
    min: a(r, -Math.abs(o)),
    max: a(s, o)
  };
}
function ht(t, e) {
  return Object.assign(Object.create(t), e);
}
function js(t, e = [
  ""
], i, r, s = () => t[0]) {
  const o = i || t;
  typeof r > "u" && (r = Va("_fallback", t));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: t,
    _rootScopes: o,
    _fallback: r,
    _getTarget: s,
    override: (n) => js([
      n,
      ...t
    ], e, o, r)
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
      return Ga(n, l, () => xu(l, e, t, n));
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
      return Fo(n).includes(l);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(n) {
      return Fo(n);
    },
    /**
    * A trap for setting property values.
    */
    set(n, l, d) {
      const c = n._storage || (n._storage = s());
      return n[l] = c[l] = d, delete n._keys, !0;
    }
  });
}
function Ft(t, e, i, r) {
  const s = {
    _cacheable: !1,
    _proxy: t,
    _context: e,
    _subProxy: i,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: ja(t, r),
    setContext: (o) => Ft(t, o, i, r),
    override: (o) => Ft(t.override(o), e, i, r)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, a) {
      return delete o[a], delete t[a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, a, n) {
      return Ga(o, a, () => fu(o, a, n));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, a) {
      return o._descriptors.allKeys ? Reflect.has(t, a) ? {
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
    has(o, a) {
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
    set(o, a, n) {
      return t[a] = n, delete o[a], !0;
    }
  });
}
function ja(t, e = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: i = e.scriptable, _indexable: r = e.indexable, _allKeys: s = e.allKeys } = t;
  return {
    allKeys: s,
    scriptable: i,
    indexable: r,
    isScriptable: ct(i) ? i : () => i,
    isIndexable: ct(r) ? r : () => r
  };
}
const _u = (t, e) => t ? t + Rs(e) : e, Gs = (t, e) => Z(e) && t !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function Ga(t, e, i) {
  if (Object.prototype.hasOwnProperty.call(t, e) || e === "constructor")
    return t[e];
  const r = i();
  return t[e] = r, r;
}
function fu(t, e, i) {
  const { _proxy: r, _context: s, _subProxy: o, _descriptors: a } = t;
  let n = r[e];
  return ct(n) && a.isScriptable(e) && (n = pu(e, n, t, i)), le(n) && n.length && (n = mu(e, n, t, a.isIndexable)), Gs(e, n) && (n = Ft(n, s, o && o[e], a)), n;
}
function pu(t, e, i, r) {
  const { _proxy: s, _context: o, _subProxy: a, _stack: n } = i;
  if (n.has(t))
    throw new Error("Recursion detected: " + Array.from(n).join("->") + "->" + t);
  n.add(t);
  let l = e(o, a || r);
  return n.delete(t), Gs(t, l) && (l = Us(s._scopes, s, t, l)), l;
}
function mu(t, e, i, r) {
  const { _proxy: s, _context: o, _subProxy: a, _descriptors: n } = i;
  if (typeof o.index < "u" && r(t))
    return e[o.index % e.length];
  if (Z(e[0])) {
    const l = e, d = s._scopes.filter((c) => c !== l);
    e = [];
    for (const c of l) {
      const h = Us(d, s, t, c);
      e.push(Ft(h, o, a && a[t], n));
    }
  }
  return e;
}
function Ua(t, e, i) {
  return ct(t) ? t(e, i) : t;
}
const yu = (t, e) => t === !0 ? e : typeof t == "string" ? dt(e, t) : void 0;
function vu(t, e, i, r, s) {
  for (const o of e) {
    const a = yu(i, o);
    if (a) {
      t.add(a);
      const n = Ua(a._fallback, i, s);
      if (typeof n < "u" && n !== i && n !== r)
        return n;
    } else if (a === !1 && typeof r < "u" && i !== r)
      return null;
  }
  return !1;
}
function Us(t, e, i, r) {
  const s = e._rootScopes, o = Ua(e._fallback, i, r), a = [
    ...t,
    ...s
  ], n = /* @__PURE__ */ new Set();
  n.add(r);
  let l = Ho(n, a, i, o || i, r);
  return l === null || typeof o < "u" && o !== i && (l = Ho(n, a, o, l, r), l === null) ? !1 : js(Array.from(n), [
    ""
  ], s, o, () => bu(e, i, r));
}
function Ho(t, e, i, r, s) {
  for (; i; )
    i = vu(t, e, i, r, s);
  return i;
}
function bu(t, e, i) {
  const r = t._getTarget();
  e in r || (r[e] = {});
  const s = r[e];
  return le(s) && Z(i) ? i : s || {};
}
function xu(t, e, i, r) {
  let s;
  for (const o of e)
    if (s = Va(_u(o, t), i), typeof s < "u")
      return Gs(t, s) ? Us(i, r, t, s) : s;
}
function Va(t, e) {
  for (const i of e) {
    if (!i)
      continue;
    const r = i[t];
    if (typeof r < "u")
      return r;
  }
}
function Fo(t) {
  let e = t._keys;
  return e || (e = t._keys = wu(t._scopes)), e;
}
function wu(t) {
  const e = /* @__PURE__ */ new Set();
  for (const i of t)
    for (const r of Object.keys(i).filter((s) => !s.startsWith("_")))
      e.add(r);
  return Array.from(e);
}
function Wa(t, e, i, r) {
  const { iScale: s } = t, { key: o = "r" } = this._parsing, a = new Array(r);
  let n, l, d, c;
  for (n = 0, l = r; n < l; ++n)
    d = n + i, c = e[d], a[n] = {
      r: s.parse(dt(c, o), d)
    };
  return a;
}
const ku = Number.EPSILON || 1e-14, jt = (t, e) => e < t.length && !t[e].skip && t[e], Ka = (t) => t === "x" ? "y" : "x";
function Su(t, e, i, r) {
  const s = t.skip ? e : t, o = e, a = i.skip ? e : i, n = fs(o, s), l = fs(a, o);
  let d = n / (n + l), c = l / (n + l);
  d = isNaN(d) ? 0 : d, c = isNaN(c) ? 0 : c;
  const h = r * d, u = r * c;
  return {
    previous: {
      x: o.x - h * (a.x - s.x),
      y: o.y - h * (a.y - s.y)
    },
    next: {
      x: o.x + u * (a.x - s.x),
      y: o.y + u * (a.y - s.y)
    }
  };
}
function Au(t, e, i) {
  const r = t.length;
  let s, o, a, n, l, d = jt(t, 0);
  for (let c = 0; c < r - 1; ++c)
    if (l = d, d = jt(t, c + 1), !(!l || !d)) {
      if (ai(e[c], 0, ku)) {
        i[c] = i[c + 1] = 0;
        continue;
      }
      s = i[c] / e[c], o = i[c + 1] / e[c], n = Math.pow(s, 2) + Math.pow(o, 2), !(n <= 9) && (a = 3 / Math.sqrt(n), i[c] = s * a * e[c], i[c + 1] = o * a * e[c]);
    }
}
function Cu(t, e, i = "x") {
  const r = Ka(i), s = t.length;
  let o, a, n, l = jt(t, 0);
  for (let d = 0; d < s; ++d) {
    if (a = n, n = l, l = jt(t, d + 1), !n)
      continue;
    const c = n[i], h = n[r];
    a && (o = (c - a[i]) / 3, n[`cp1${i}`] = c - o, n[`cp1${r}`] = h - o * e[d]), l && (o = (l[i] - c) / 3, n[`cp2${i}`] = c + o, n[`cp2${r}`] = h + o * e[d]);
  }
}
function Eu(t, e = "x") {
  const i = Ka(e), r = t.length, s = Array(r).fill(0), o = Array(r);
  let a, n, l, d = jt(t, 0);
  for (a = 0; a < r; ++a)
    if (n = l, l = d, d = jt(t, a + 1), !!l) {
      if (d) {
        const c = d[e] - l[e];
        s[a] = c !== 0 ? (d[i] - l[i]) / c : 0;
      }
      o[a] = n ? d ? Ke(s[a - 1]) !== Ke(s[a]) ? 0 : (s[a - 1] + s[a]) / 2 : s[a - 1] : s[a];
    }
  Au(t, s, o), Cu(t, o, e);
}
function zi(t, e, i) {
  return Math.max(Math.min(t, i), e);
}
function Pu(t, e) {
  let i, r, s, o, a, n = et(t[0], e);
  for (i = 0, r = t.length; i < r; ++i)
    a = o, o = n, n = i < r - 1 && et(t[i + 1], e), o && (s = t[i], a && (s.cp1x = zi(s.cp1x, e.left, e.right), s.cp1y = zi(s.cp1y, e.top, e.bottom)), n && (s.cp2x = zi(s.cp2x, e.left, e.right), s.cp2y = zi(s.cp2y, e.top, e.bottom)));
}
function Mu(t, e, i, r, s) {
  let o, a, n, l;
  if (e.spanGaps && (t = t.filter((d) => !d.skip)), e.cubicInterpolationMode === "monotone")
    Eu(t, s);
  else {
    let d = r ? t[t.length - 1] : t[0];
    for (o = 0, a = t.length; o < a; ++o)
      n = t[o], l = Su(d, n, t[Math.min(o + 1, a - (r ? 0 : 1)) % a], e.tension), n.cp1x = l.previous.x, n.cp1y = l.previous.y, n.cp2x = l.next.x, n.cp2y = l.next.y, d = n;
  }
  e.capBezierPoints && Pu(t, i);
}
function Vs() {
  return typeof window < "u" && typeof document < "u";
}
function Ws(t) {
  let e = t.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function dr(t, e, i) {
  let r;
  return typeof t == "string" ? (r = parseInt(t, 10), t.indexOf("%") !== -1 && (r = r / 100 * e.parentNode[i])) : r = t, r;
}
const vr = (t) => t.ownerDocument.defaultView.getComputedStyle(t, null);
function $u(t, e) {
  return vr(t).getPropertyValue(e);
}
const Lu = [
  "top",
  "right",
  "bottom",
  "left"
];
function St(t, e, i) {
  const r = {};
  i = i ? "-" + i : "";
  for (let s = 0; s < 4; s++) {
    const o = Lu[s];
    r[o] = parseFloat(t[e + "-" + o + i]) || 0;
  }
  return r.width = r.left + r.right, r.height = r.top + r.bottom, r;
}
const Du = (t, e, i) => (t > 0 || e > 0) && (!i || !i.shadowRoot);
function Tu(t, e) {
  const i = t.touches, r = i && i.length ? i[0] : t, { offsetX: s, offsetY: o } = r;
  let a = !1, n, l;
  if (Du(s, o, t.target))
    n = s, l = o;
  else {
    const d = e.getBoundingClientRect();
    n = r.clientX - d.left, l = r.clientY - d.top, a = !0;
  }
  return {
    x: n,
    y: l,
    box: a
  };
}
function vt(t, e) {
  if ("native" in t)
    return t;
  const { canvas: i, currentDevicePixelRatio: r } = e, s = vr(i), o = s.boxSizing === "border-box", a = St(s, "padding"), n = St(s, "border", "width"), { x: l, y: d, box: c } = Tu(t, i), h = a.left + (c && n.left), u = a.top + (c && n.top);
  let { width: g, height: f } = e;
  return o && (g -= a.width + n.width, f -= a.height + n.height), {
    x: Math.round((l - h) / g * i.width / r),
    y: Math.round((d - u) / f * i.height / r)
  };
}
function zu(t, e, i) {
  let r, s;
  if (e === void 0 || i === void 0) {
    const o = t && Ws(t);
    if (!o)
      e = t.clientWidth, i = t.clientHeight;
    else {
      const a = o.getBoundingClientRect(), n = vr(o), l = St(n, "border", "width"), d = St(n, "padding");
      e = a.width - d.width - l.width, i = a.height - d.height - l.height, r = dr(n.maxWidth, o, "clientWidth"), s = dr(n.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: e,
    height: i,
    maxWidth: r || ar,
    maxHeight: s || ar
  };
}
const Oi = (t) => Math.round(t * 10) / 10;
function Ou(t, e, i, r) {
  const s = vr(t), o = St(s, "margin"), a = dr(s.maxWidth, t, "clientWidth") || ar, n = dr(s.maxHeight, t, "clientHeight") || ar, l = zu(t, e, i);
  let { width: d, height: c } = l;
  if (s.boxSizing === "content-box") {
    const u = St(s, "border", "width"), g = St(s, "padding");
    d -= g.width + u.width, c -= g.height + u.height;
  }
  return d = Math.max(0, d - o.width), c = Math.max(0, r ? d / r : c - o.height), d = Oi(Math.min(d, a, l.maxWidth)), c = Oi(Math.min(c, n, l.maxHeight)), d && !c && (c = Oi(d / 2)), (e !== void 0 || i !== void 0) && r && l.height && c > l.height && (c = l.height, d = Oi(Math.floor(c * r))), {
    width: d,
    height: c
  };
}
function jo(t, e, i) {
  const r = e || 1, s = Math.floor(t.height * r), o = Math.floor(t.width * r);
  t.height = Math.floor(t.height), t.width = Math.floor(t.width);
  const a = t.canvas;
  return a.style && (i || !a.style.height && !a.style.width) && (a.style.height = `${t.height}px`, a.style.width = `${t.width}px`), t.currentDevicePixelRatio !== r || a.height !== s || a.width !== o ? (t.currentDevicePixelRatio = r, a.height = s, a.width = o, t.ctx.setTransform(r, 0, 0, r, 0, 0), !0) : !1;
}
const Ru = (function() {
  let t = !1;
  try {
    const e = {
      get passive() {
        return t = !0, !1;
      }
    };
    Vs() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return t;
})();
function Go(t, e) {
  const i = $u(t, e), r = i && i.match(/^(\d+)(\.\d+)?px$/);
  return r ? +r[1] : void 0;
}
function bt(t, e, i, r) {
  return {
    x: t.x + i * (e.x - t.x),
    y: t.y + i * (e.y - t.y)
  };
}
function Iu(t, e, i, r) {
  return {
    x: t.x + i * (e.x - t.x),
    y: r === "middle" ? i < 0.5 ? t.y : e.y : r === "after" ? i < 1 ? t.y : e.y : i > 0 ? e.y : t.y
  };
}
function Nu(t, e, i, r) {
  const s = {
    x: t.cp2x,
    y: t.cp2y
  }, o = {
    x: e.cp1x,
    y: e.cp1y
  }, a = bt(t, s, i), n = bt(s, o, i), l = bt(o, e, i), d = bt(a, n, i), c = bt(n, l, i);
  return bt(d, c, i);
}
const Bu = function(t, e) {
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
    xPlus(i, r) {
      return i - r;
    },
    leftForLtr(i, r) {
      return i - r;
    }
  };
}, Hu = function() {
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
function Ot(t, e, i) {
  return t ? Bu(e, i) : Hu();
}
function Ya(t, e) {
  let i, r;
  (e === "ltr" || e === "rtl") && (i = t.canvas.style, r = [
    i.getPropertyValue("direction"),
    i.getPropertyPriority("direction")
  ], i.setProperty("direction", e, "important"), t.prevTextDirection = r);
}
function Xa(t, e) {
  e !== void 0 && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
}
function Za(t) {
  return t === "angle" ? {
    between: yi,
    compare: Fh,
    normalize: ve
  } : {
    between: Je,
    compare: (e, i) => e - i,
    normalize: (e) => e
  };
}
function Uo({ start: t, end: e, count: i, loop: r, style: s }) {
  return {
    start: t % i,
    end: e % i,
    loop: r && (e - t + 1) % i === 0,
    style: s
  };
}
function Fu(t, e, i) {
  const { property: r, start: s, end: o } = i, { between: a, normalize: n } = Za(r), l = e.length;
  let { start: d, end: c, loop: h } = t, u, g;
  if (h) {
    for (d += l, c += l, u = 0, g = l; u < g && a(n(e[d % l][r]), s, o); ++u)
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
function qa(t, e, i) {
  if (!i)
    return [
      t
    ];
  const { property: r, start: s, end: o } = i, a = e.length, { compare: n, between: l, normalize: d } = Za(r), { start: c, end: h, loop: u, style: g } = Fu(t, e, i), f = [];
  let _ = !1, p = null, y, v, x;
  const L = () => l(s, x, y) && n(s, x) !== 0, k = () => n(o, y) === 0 || l(o, x, y), A = () => _ || L(), P = () => !_ || k();
  for (let $ = c, S = c; $ <= h; ++$)
    v = e[$ % a], !v.skip && (y = d(v[r]), y !== x && (_ = l(y, s, o), p === null && A() && (p = n(y, s) === 0 ? $ : S), p !== null && P() && (f.push(Uo({
      start: p,
      end: $,
      loop: u,
      count: a,
      style: g
    })), p = null), S = $, x = y));
  return p !== null && f.push(Uo({
    start: p,
    end: h,
    loop: u,
    count: a,
    style: g
  })), f;
}
function Ja(t, e) {
  const i = [], r = t.segments;
  for (let s = 0; s < r.length; s++) {
    const o = qa(r[s], t.points, e);
    o.length && i.push(...o);
  }
  return i;
}
function ju(t, e, i, r) {
  let s = 0, o = e - 1;
  if (i && !r)
    for (; s < e && !t[s].skip; )
      s++;
  for (; s < e && t[s].skip; )
    s++;
  for (s %= e, i && (o += s); o > s && t[o % e].skip; )
    o--;
  return o %= e, {
    start: s,
    end: o
  };
}
function Gu(t, e, i, r) {
  const s = t.length, o = [];
  let a = e, n = t[e], l;
  for (l = e + 1; l <= i; ++l) {
    const d = t[l % s];
    d.skip || d.stop ? n.skip || (r = !1, o.push({
      start: e % s,
      end: (l - 1) % s,
      loop: r
    }), e = a = d.stop ? l : null) : (a = l, n.skip && (e = l)), n = d;
  }
  return a !== null && o.push({
    start: e % s,
    end: a % s,
    loop: r
  }), o;
}
function Uu(t, e) {
  const i = t.points, r = t.options.spanGaps, s = i.length;
  if (!s)
    return [];
  const o = !!t._loop, { start: a, end: n } = ju(i, s, o, r);
  if (r === !0)
    return Vo(t, [
      {
        start: a,
        end: n,
        loop: o
      }
    ], i, e);
  const l = n < a ? n + s : n, d = !!t._fullLoop && a === 0 && n === s - 1;
  return Vo(t, Gu(i, a, l, d), i, e);
}
function Vo(t, e, i, r) {
  return !r || !r.setContext || !i ? e : Vu(t, e, i, r);
}
function Vu(t, e, i, r) {
  const s = t._chart.getContext(), o = Wo(t.options), { _datasetIndex: a, options: { spanGaps: n } } = t, l = i.length, d = [];
  let c = o, h = e[0].start, u = h;
  function g(f, _, p, y) {
    const v = n ? -1 : 1;
    if (f !== _) {
      for (f += l; i[f % l].skip; )
        f -= v;
      for (; i[_ % l].skip; )
        _ += v;
      f % l !== _ % l && (d.push({
        start: f % l,
        end: _ % l,
        loop: p,
        style: y
      }), c = y, h = _ % l);
    }
  }
  for (const f of e) {
    h = n ? h : f.start;
    let _ = i[h % l], p;
    for (u = h + 1; u <= f.end; u++) {
      const y = i[u % l];
      p = Wo(r.setContext(ht(s, {
        type: "segment",
        p0: _,
        p1: y,
        p0DataIndex: (u - 1) % l,
        p1DataIndex: u % l,
        datasetIndex: a
      }))), Wu(p, c) && g(h, u - 1, f.loop, c), _ = y, c = p;
    }
    h < u - 1 && g(h, u - 1, f.loop, c);
  }
  return d;
}
function Wo(t) {
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
function Wu(t, e) {
  if (!e)
    return !1;
  const i = [], r = function(s, o) {
    return Hs(o) ? (i.includes(o) || i.push(o), i.indexOf(o)) : o;
  };
  return JSON.stringify(t, r) !== JSON.stringify(e, r);
}
function Ri(t, e, i) {
  return t.options.clip ? t[i] : e[i];
}
function Ku(t, e) {
  const { xScale: i, yScale: r } = t;
  return i && r ? {
    left: Ri(i, e, "left"),
    right: Ri(i, e, "right"),
    top: Ri(r, e, "top"),
    bottom: Ri(r, e, "bottom")
  } : e;
}
function Qa(t, e) {
  const i = e._clip;
  if (i.disabled)
    return !1;
  const r = Ku(e, t.chartArea);
  return {
    left: i.left === !1 ? 0 : r.left - (i.left === !0 ? 0 : i.left),
    right: i.right === !1 ? t.width : r.right + (i.right === !0 ? 0 : i.right),
    top: i.top === !1 ? 0 : r.top - (i.top === !0 ? 0 : i.top),
    bottom: i.bottom === !1 ? t.height : r.bottom + (i.bottom === !0 ? 0 : i.bottom)
  };
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class Yu {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(e, i, r, s) {
    const o = i.listeners[s], a = i.duration;
    o.forEach((n) => n({
      chart: e,
      initial: i.initial,
      numSteps: a,
      currentStep: Math.min(r - i.start, a)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Oa.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(e = Date.now()) {
    let i = 0;
    this._charts.forEach((r, s) => {
      if (!r.running || !r.items.length)
        return;
      const o = r.items;
      let a = o.length - 1, n = !1, l;
      for (; a >= 0; --a)
        l = o[a], l._active ? (l._total > r.duration && (r.duration = l._total), l.tick(e), n = !0) : (o[a] = o[o.length - 1], o.pop());
      n && (s.draw(), this._notify(s, r, e, "progress")), o.length || (r.running = !1, this._notify(s, r, e, "complete"), r.initial = !1), i += o.length;
    }), this._lastDate = e, i === 0 && (this._running = !1);
  }
  _getAnims(e) {
    const i = this._charts;
    let r = i.get(e);
    return r || (r = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, i.set(e, r)), r;
  }
  listen(e, i, r) {
    this._getAnims(e).listeners[i].push(r);
  }
  add(e, i) {
    !i || !i.length || this._getAnims(e).items.push(...i);
  }
  has(e) {
    return this._getAnims(e).items.length > 0;
  }
  start(e) {
    const i = this._charts.get(e);
    i && (i.running = !0, i.start = Date.now(), i.duration = i.items.reduce((r, s) => Math.max(r, s._duration), 0), this._refresh());
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
    const r = i.items;
    let s = r.length - 1;
    for (; s >= 0; --s)
      r[s].cancel();
    i.items = [], this._notify(e, i, Date.now(), "complete");
  }
  remove(e) {
    return this._charts.delete(e);
  }
}
var Xe = /* @__PURE__ */ new Yu();
const Ko = "transparent", Xu = {
  boolean(t, e, i) {
    return i > 0.5 ? e : t;
  },
  color(t, e, i) {
    const r = Io(t || Ko), s = r.valid && Io(e || Ko);
    return s && s.valid ? s.mix(r, i).hexString() : e;
  },
  number(t, e, i) {
    return t + (e - t) * i;
  }
};
class Zu {
  constructor(e, i, r, s) {
    const o = i[r];
    s = ei([
      e.to,
      s,
      o,
      e.from
    ]);
    const a = ei([
      e.from,
      o,
      s
    ]);
    this._active = !0, this._fn = e.fn || Xu[e.type || typeof a], this._easing = li[e.easing] || li.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = i, this._prop = r, this._from = a, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, i, r) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], o = r - this._start, a = this._duration - o;
      this._start = r, this._duration = Math.floor(Math.max(a, e.duration)), this._total += o, this._loop = !!e.loop, this._to = ei([
        e.to,
        i,
        s,
        e.from
      ]), this._from = ei([
        e.from,
        s,
        i
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(e) {
    const i = e - this._start, r = this._duration, s = this._prop, o = this._from, a = this._loop, n = this._to;
    let l;
    if (this._active = o !== n && (a || i < r), !this._active) {
      this._target[s] = n, this._notify(!0);
      return;
    }
    if (i < 0) {
      this._target[s] = o;
      return;
    }
    l = i / r % 2, l = a && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[s] = this._fn(o, n, l);
  }
  wait() {
    const e = this._promises || (this._promises = []);
    return new Promise((i, r) => {
      e.push({
        res: i,
        rej: r
      });
    });
  }
  _notify(e) {
    const i = e ? "res" : "rej", r = this._promises || [];
    for (let s = 0; s < r.length; s++)
      r[s][i]();
  }
}
class el {
  constructor(e, i) {
    this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(i);
  }
  configure(e) {
    if (!Z(e))
      return;
    const i = Object.keys(de.animation), r = this._properties;
    Object.getOwnPropertyNames(e).forEach((s) => {
      const o = e[s];
      if (!Z(o))
        return;
      const a = {};
      for (const n of i)
        a[n] = o[n];
      (le(o.properties) && o.properties || [
        s
      ]).forEach((n) => {
        (n === s || !r.has(n)) && r.set(n, a);
      });
    });
  }
  _animateOptions(e, i) {
    const r = i.options, s = Ju(e, r);
    if (!s)
      return [];
    const o = this._createAnimations(s, r);
    return r.$shared && qu(e.options.$animations, r).then(() => {
      e.options = r;
    }, () => {
    }), o;
  }
  _createAnimations(e, i) {
    const r = this._properties, s = [], o = e.$animations || (e.$animations = {}), a = Object.keys(i), n = Date.now();
    let l;
    for (l = a.length - 1; l >= 0; --l) {
      const d = a[l];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        s.push(...this._animateOptions(e, i));
        continue;
      }
      const c = i[d];
      let h = o[d];
      const u = r.get(d);
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
      o[d] = h = new Zu(u, e, d, c), s.push(h);
    }
    return s;
  }
  update(e, i) {
    if (this._properties.size === 0) {
      Object.assign(e, i);
      return;
    }
    const r = this._createAnimations(e, i);
    if (r.length)
      return Xe.add(this._chart, r), !0;
  }
}
function qu(t, e) {
  const i = [], r = Object.keys(e);
  for (let s = 0; s < r.length; s++) {
    const o = t[r[s]];
    o && o.active() && i.push(o.wait());
  }
  return Promise.all(i);
}
function Ju(t, e) {
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
function Yo(t, e) {
  const i = t && t.options || {}, r = i.reverse, s = i.min === void 0 ? e : 0, o = i.max === void 0 ? e : 0;
  return {
    start: r ? o : s,
    end: r ? s : o
  };
}
function Qu(t, e, i) {
  if (i === !1)
    return !1;
  const r = Yo(t, i), s = Yo(e, i);
  return {
    top: s.end,
    right: r.end,
    bottom: s.start,
    left: r.start
  };
}
function eg(t) {
  let e, i, r, s;
  return Z(t) ? (e = t.top, i = t.right, r = t.bottom, s = t.left) : e = i = r = s = t, {
    top: e,
    right: i,
    bottom: r,
    left: s,
    disabled: t === !1
  };
}
function tl(t, e) {
  const i = [], r = t._getSortedDatasetMetas(e);
  let s, o;
  for (s = 0, o = r.length; s < o; ++s)
    i.push(r[s].index);
  return i;
}
function Xo(t, e, i, r = {}) {
  const s = t.keys, o = r.mode === "single";
  let a, n, l, d;
  if (e === null)
    return;
  let c = !1;
  for (a = 0, n = s.length; a < n; ++a) {
    if (l = +s[a], l === i) {
      if (c = !0, r.all)
        continue;
      break;
    }
    d = t.values[l], ue(d) && (o || e === 0 || Ke(e) === Ke(d)) && (e += d);
  }
  return !c && !r.all ? 0 : e;
}
function tg(t, e) {
  const { iScale: i, vScale: r } = e, s = i.axis === "x" ? "x" : "y", o = r.axis === "x" ? "x" : "y", a = Object.keys(t), n = new Array(a.length);
  let l, d, c;
  for (l = 0, d = a.length; l < d; ++l)
    c = a[l], n[l] = {
      [s]: c,
      [o]: t[c]
    };
  return n;
}
function Hr(t, e) {
  const i = t && t.options.stacked;
  return i || i === void 0 && e.stack !== void 0;
}
function ig(t, e, i) {
  return `${t.id}.${e.id}.${i.stack || i.type}`;
}
function rg(t) {
  const { min: e, max: i, minDefined: r, maxDefined: s } = t.getUserBounds();
  return {
    min: r ? e : Number.NEGATIVE_INFINITY,
    max: s ? i : Number.POSITIVE_INFINITY
  };
}
function sg(t, e, i) {
  const r = t[e] || (t[e] = {});
  return r[i] || (r[i] = {});
}
function Zo(t, e, i, r) {
  for (const s of e.getMatchingVisibleMetas(r).reverse()) {
    const o = t[s.index];
    if (i && o > 0 || !i && o < 0)
      return s.index;
  }
  return null;
}
function qo(t, e) {
  const { chart: i, _cachedMeta: r } = t, s = i._stacks || (i._stacks = {}), { iScale: o, vScale: a, index: n } = r, l = o.axis, d = a.axis, c = ig(o, a, r), h = e.length;
  let u;
  for (let g = 0; g < h; ++g) {
    const f = e[g], { [l]: _, [d]: p } = f, y = f._stacks || (f._stacks = {});
    u = y[d] = sg(s, c, _), u[n] = p, u._top = Zo(u, a, !0, r.type), u._bottom = Zo(u, a, !1, r.type);
    const v = u._visualValues || (u._visualValues = {});
    v[n] = p;
  }
}
function Fr(t, e) {
  const i = t.scales;
  return Object.keys(i).filter((r) => i[r].axis === e).shift();
}
function og(t, e) {
  return ht(t, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function ng(t, e, i) {
  return ht(t, {
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
function Kt(t, e) {
  const i = t.controller.index, r = t.vScale && t.vScale.axis;
  if (r) {
    e = e || t._parsed;
    for (const s of e) {
      const o = s._stacks;
      if (!o || o[r] === void 0 || o[r][i] === void 0)
        return;
      delete o[r][i], o[r]._visualValues !== void 0 && o[r]._visualValues[i] !== void 0 && delete o[r]._visualValues[i];
    }
  }
}
const jr = (t) => t === "reset" || t === "none", Jo = (t, e) => e ? t : Object.assign({}, t), ag = (t, e, i) => t && !e.hidden && e._stacked && {
  keys: tl(i, !0),
  values: null
};
class Fe {
  constructor(e, i) {
    this.chart = e, this._ctx = e.ctx, this.index = i, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = Hr(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && Kt(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, i = this._cachedMeta, r = this.getDataset(), s = (h, u, g, f) => h === "x" ? u : h === "r" ? f : g, o = i.xAxisID = W(r.xAxisID, Fr(e, "x")), a = i.yAxisID = W(r.yAxisID, Fr(e, "y")), n = i.rAxisID = W(r.rAxisID, Fr(e, "r")), l = i.indexAxis, d = i.iAxisID = s(l, o, a, n), c = i.vAxisID = s(l, a, o, n);
    i.xScale = this.getScaleForId(o), i.yScale = this.getScaleForId(a), i.rScale = this.getScaleForId(n), i.iScale = this.getScaleForId(d), i.vScale = this.getScaleForId(c);
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
    this._data && zo(this._data, this), e._stacked && Kt(e);
  }
  _dataCheck() {
    const e = this.getDataset(), i = e.data || (e.data = []), r = this._data;
    if (Z(i)) {
      const s = this._cachedMeta;
      this._data = tg(i, s);
    } else if (r !== i) {
      if (r) {
        zo(r, this);
        const s = this._cachedMeta;
        Kt(s), s._parsed = [];
      }
      i && Object.isExtensible(i) && Vh(i, this), this._syncList = [], this._data = i;
    }
  }
  addElements() {
    const e = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(e) {
    const i = this._cachedMeta, r = this.getDataset();
    let s = !1;
    this._dataCheck();
    const o = i._stacked;
    i._stacked = Hr(i.vScale, i), i.stack !== r.stack && (s = !0, Kt(i), i.stack = r.stack), this._resyncElements(e), (s || o !== i._stacked) && (qo(this, i._parsed), i._stacked = Hr(i.vScale, i));
  }
  configure() {
    const e = this.chart.config, i = e.datasetScopeKeys(this._type), r = e.getOptionScopes(this.getDataset(), i, !0);
    this.options = e.createResolver(r, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, i) {
    const { _cachedMeta: r, _data: s } = this, { iScale: o, _stacked: a } = r, n = o.axis;
    let l = e === 0 && i === s.length ? !0 : r._sorted, d = e > 0 && r._parsed[e - 1], c, h, u;
    if (this._parsing === !1)
      r._parsed = s, r._sorted = !0, u = s;
    else {
      le(s[e]) ? u = this.parseArrayData(r, s, e, i) : Z(s[e]) ? u = this.parseObjectData(r, s, e, i) : u = this.parsePrimitiveData(r, s, e, i);
      const g = () => h[n] === null || d && h[n] < d[n];
      for (c = 0; c < i; ++c)
        r._parsed[c + e] = h = u[c], l && (g() && (l = !1), d = h);
      r._sorted = l;
    }
    a && qo(this, u);
  }
  parsePrimitiveData(e, i, r, s) {
    const { iScale: o, vScale: a } = e, n = o.axis, l = a.axis, d = o.getLabels(), c = o === a, h = new Array(s);
    let u, g, f;
    for (u = 0, g = s; u < g; ++u)
      f = u + r, h[u] = {
        [n]: c || o.parse(d[f], f),
        [l]: a.parse(i[f], f)
      };
    return h;
  }
  parseArrayData(e, i, r, s) {
    const { xScale: o, yScale: a } = e, n = new Array(s);
    let l, d, c, h;
    for (l = 0, d = s; l < d; ++l)
      c = l + r, h = i[c], n[l] = {
        x: o.parse(h[0], c),
        y: a.parse(h[1], c)
      };
    return n;
  }
  parseObjectData(e, i, r, s) {
    const { xScale: o, yScale: a } = e, { xAxisKey: n = "x", yAxisKey: l = "y" } = this._parsing, d = new Array(s);
    let c, h, u, g;
    for (c = 0, h = s; c < h; ++c)
      u = c + r, g = i[u], d[c] = {
        x: o.parse(dt(g, n), u),
        y: a.parse(dt(g, l), u)
      };
    return d;
  }
  getParsed(e) {
    return this._cachedMeta._parsed[e];
  }
  getDataElement(e) {
    return this._cachedMeta.data[e];
  }
  applyStack(e, i, r) {
    const s = this.chart, o = this._cachedMeta, a = i[e.axis], n = {
      keys: tl(s, !0),
      values: i._stacks[e.axis]._visualValues
    };
    return Xo(n, a, o.index, {
      mode: r
    });
  }
  updateRangeFromParsed(e, i, r, s) {
    const o = r[i.axis];
    let a = o === null ? NaN : o;
    const n = s && r._stacks[i.axis];
    s && n && (s.values = n, a = Xo(s, o, this._cachedMeta.index)), e.min = Math.min(e.min, a), e.max = Math.max(e.max, a);
  }
  getMinMax(e, i) {
    const r = this._cachedMeta, s = r._parsed, o = r._sorted && e === r.iScale, a = s.length, n = this._getOtherScale(e), l = ag(i, r, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: c, max: h } = rg(n);
    let u, g;
    function f() {
      g = s[u];
      const _ = g[n.axis];
      return !ue(g[e.axis]) || c > _ || h < _;
    }
    for (u = 0; u < a && !(!f() && (this.updateRangeFromParsed(d, e, g, l), o)); ++u)
      ;
    if (o) {
      for (u = a - 1; u >= 0; --u)
        if (!f()) {
          this.updateRangeFromParsed(d, e, g, l);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(e) {
    const i = this._cachedMeta._parsed, r = [];
    let s, o, a;
    for (s = 0, o = i.length; s < o; ++s)
      a = i[s][e.axis], ue(a) && r.push(a);
    return r;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, r = i.iScale, s = i.vScale, o = this.getParsed(e);
    return {
      label: r ? "" + r.getLabelForValue(o[r.axis]) : "",
      value: s ? "" + s.getLabelForValue(o[s.axis]) : ""
    };
  }
  _update(e) {
    const i = this._cachedMeta;
    this.update(e || "default"), i._clip = eg(W(this.options.clip, Qu(i.xScale, i.yScale, this.getMaxOverflow())));
  }
  update(e) {
  }
  draw() {
    const e = this._ctx, i = this.chart, r = this._cachedMeta, s = r.data || [], o = i.chartArea, a = [], n = this._drawStart || 0, l = this._drawCount || s.length - n, d = this.options.drawActiveElementsOnTop;
    let c;
    for (r.dataset && r.dataset.draw(e, o, n, l), c = n; c < n + l; ++c) {
      const h = s[c];
      h.hidden || (h.active && d ? a.push(h) : h.draw(e, o));
    }
    for (c = 0; c < a.length; ++c)
      a[c].draw(e, o);
  }
  getStyle(e, i) {
    const r = i ? "active" : "default";
    return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(r) : this.resolveDataElementOptions(e || 0, r);
  }
  getContext(e, i, r) {
    const s = this.getDataset();
    let o;
    if (e >= 0 && e < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[e];
      o = a.$context || (a.$context = ng(this.getContext(), e, a)), o.parsed = this.getParsed(e), o.raw = s.data[e], o.index = o.dataIndex = e;
    } else
      o = this.$context || (this.$context = og(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
    return o.active = !!i, o.mode = r, o;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, i) {
    return this._resolveElementOptions(this.dataElementType.id, i, e);
  }
  _resolveElementOptions(e, i = "default", r) {
    const s = i === "active", o = this._cachedDataOpts, a = e + "-" + i, n = o[a], l = this.enableOptionSharing && mi(r);
    if (n)
      return Jo(n, l);
    const d = this.chart.config, c = d.datasetElementScopeKeys(this._type, e), h = s ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], u = d.getOptionScopes(this.getDataset(), c), g = Object.keys(de.elements[e]), f = () => this.getContext(r, s, i), _ = d.resolveNamedOptions(u, g, f, h);
    return _.$shared && (_.$shared = l, o[a] = Object.freeze(Jo(_, l))), _;
  }
  _resolveAnimations(e, i, r) {
    const s = this.chart, o = this._cachedDataOpts, a = `animation-${i}`, n = o[a];
    if (n)
      return n;
    let l;
    if (s.options.animation !== !1) {
      const c = this.chart.config, h = c.datasetAnimationScopeKeys(this._type, i), u = c.getOptionScopes(this.getDataset(), h);
      l = c.createResolver(u, this.getContext(e, r, i));
    }
    const d = new el(s, l && l.animations);
    return l && l._cacheable && (o[a] = Object.freeze(d)), d;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, i) {
    return !i || jr(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, i) {
    const r = this.resolveDataElementOptions(e, i), s = this._sharedOptions, o = this.getSharedOptions(r), a = this.includeOptions(i, o) || o !== s;
    return this.updateSharedOptions(o, i, r), {
      sharedOptions: o,
      includeOptions: a
    };
  }
  updateElement(e, i, r, s) {
    jr(s) ? Object.assign(e, r) : this._resolveAnimations(i, s).update(e, r);
  }
  updateSharedOptions(e, i, r) {
    e && !jr(i) && this._resolveAnimations(void 0, i).update(e, r);
  }
  _setStyle(e, i, r, s) {
    e.active = s;
    const o = this.getStyle(i, s);
    this._resolveAnimations(i, r, s).update(e, {
      options: !s && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(e, i, r) {
    this._setStyle(e, r, "active", !1);
  }
  setHoverStyle(e, i, r) {
    this._setStyle(e, r, "active", !0);
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
    const i = this._data, r = this._cachedMeta.data;
    for (const [n, l, d] of this._syncList)
      this[n](l, d);
    this._syncList = [];
    const s = r.length, o = i.length, a = Math.min(o, s);
    a && this.parse(0, a), o > s ? this._insertElements(s, o - s, e) : o < s && this._removeElements(o, s - o);
  }
  _insertElements(e, i, r = !0) {
    const s = this._cachedMeta, o = s.data, a = e + i;
    let n;
    const l = (d) => {
      for (d.length += i, n = d.length - 1; n >= a; n--)
        d[n] = d[n - i];
    };
    for (l(o), n = e; n < a; ++n)
      o[n] = new this.dataElementType();
    this._parsing && l(s._parsed), this.parse(e, i), r && this.updateElements(o, e, i, "reset");
  }
  updateElements(e, i, r, s) {
  }
  _removeElements(e, i) {
    const r = this._cachedMeta;
    if (this._parsing) {
      const s = r._parsed.splice(e, i);
      r._stacked && Kt(r, s);
    }
    r.data.splice(e, i);
  }
  _sync(e) {
    if (this._parsing)
      this._syncList.push(e);
    else {
      const [i, r, s] = e;
      this[i](r, s);
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
    const r = arguments.length - 2;
    r && this._sync([
      "_insertElements",
      e,
      r
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
I(Fe, "defaults", {}), I(Fe, "datasetElementType", null), I(Fe, "dataElementType", null);
function lg(t, e) {
  if (!t._cache.$bar) {
    const i = t.getMatchingVisibleMetas(e);
    let r = [];
    for (let s = 0, o = i.length; s < o; s++)
      r = r.concat(i[s].controller.getAllParsedValues(t));
    t._cache.$bar = za(r.sort((s, o) => s - o));
  }
  return t._cache.$bar;
}
function dg(t) {
  const e = t.iScale, i = lg(e, t.type);
  let r = e._length, s, o, a, n;
  const l = () => {
    a === 32767 || a === -32768 || (mi(n) && (r = Math.min(r, Math.abs(a - n) || r)), n = a);
  };
  for (s = 0, o = i.length; s < o; ++s)
    a = e.getPixelForValue(i[s]), l();
  for (n = void 0, s = 0, o = e.ticks.length; s < o; ++s)
    a = e.getPixelForTick(s), l();
  return r;
}
function cg(t, e, i, r) {
  const s = i.barThickness;
  let o, a;
  return X(s) ? (o = e.min * i.categoryPercentage, a = i.barPercentage) : (o = s * r, a = 1), {
    chunk: o / r,
    ratio: a,
    start: e.pixels[t] - o / 2
  };
}
function hg(t, e, i, r) {
  const s = e.pixels, o = s[t];
  let a = t > 0 ? s[t - 1] : null, n = t < s.length - 1 ? s[t + 1] : null;
  const l = i.categoryPercentage;
  a === null && (a = o - (n === null ? e.end - e.start : n - o)), n === null && (n = o + o - a);
  const d = o - (o - Math.min(a, n)) / 2 * l;
  return {
    chunk: Math.abs(n - a) / 2 * l / r,
    ratio: i.barPercentage,
    start: d
  };
}
function ug(t, e, i, r) {
  const s = i.parse(t[0], r), o = i.parse(t[1], r), a = Math.min(s, o), n = Math.max(s, o);
  let l = a, d = n;
  Math.abs(a) > Math.abs(n) && (l = n, d = a), e[i.axis] = d, e._custom = {
    barStart: l,
    barEnd: d,
    start: s,
    end: o,
    min: a,
    max: n
  };
}
function il(t, e, i, r) {
  return le(t) ? ug(t, e, i, r) : e[i.axis] = i.parse(t, r), e;
}
function Qo(t, e, i, r) {
  const s = t.iScale, o = t.vScale, a = s.getLabels(), n = s === o, l = [];
  let d, c, h, u;
  for (d = i, c = i + r; d < c; ++d)
    u = e[d], h = {}, h[s.axis] = n || s.parse(a[d], d), l.push(il(u, h, o, d));
  return l;
}
function Gr(t) {
  return t && t.barStart !== void 0 && t.barEnd !== void 0;
}
function gg(t, e, i) {
  return t !== 0 ? Ke(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= i ? 1 : -1);
}
function _g(t) {
  let e, i, r, s, o;
  return t.horizontal ? (e = t.base > t.x, i = "left", r = "right") : (e = t.base < t.y, i = "bottom", r = "top"), e ? (s = "end", o = "start") : (s = "start", o = "end"), {
    start: i,
    end: r,
    reverse: e,
    top: s,
    bottom: o
  };
}
function fg(t, e, i, r) {
  let s = e.borderSkipped;
  const o = {};
  if (!s) {
    t.borderSkipped = o;
    return;
  }
  if (s === !0) {
    t.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: a, end: n, reverse: l, top: d, bottom: c } = _g(t);
  s === "middle" && i && (t.enableBorderRadius = !0, (i._top || 0) === r ? s = d : (i._bottom || 0) === r ? s = c : (o[en(c, a, n, l)] = !0, s = d)), o[en(s, a, n, l)] = !0, t.borderSkipped = o;
}
function en(t, e, i, r) {
  return r ? (t = pg(t, e, i), t = tn(t, i, e)) : t = tn(t, e, i), t;
}
function pg(t, e, i) {
  return t === e ? i : t === i ? e : t;
}
function tn(t, e, i) {
  return t === "start" ? e : t === "end" ? i : t;
}
function mg(t, { inflateAmount: e }, i) {
  t.inflateAmount = e === "auto" ? i === 1 ? 0.33 : 0 : e;
}
class Ki extends Fe {
  parsePrimitiveData(e, i, r, s) {
    return Qo(e, i, r, s);
  }
  parseArrayData(e, i, r, s) {
    return Qo(e, i, r, s);
  }
  parseObjectData(e, i, r, s) {
    const { iScale: o, vScale: a } = e, { xAxisKey: n = "x", yAxisKey: l = "y" } = this._parsing, d = o.axis === "x" ? n : l, c = a.axis === "x" ? n : l, h = [];
    let u, g, f, _;
    for (u = r, g = r + s; u < g; ++u)
      _ = i[u], f = {}, f[o.axis] = o.parse(dt(_, d), u), h.push(il(dt(_, c), f, a, u));
    return h;
  }
  updateRangeFromParsed(e, i, r, s) {
    super.updateRangeFromParsed(e, i, r, s);
    const o = r._custom;
    o && i === this._cachedMeta.vScale && (e.min = Math.min(e.min, o.min), e.max = Math.max(e.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, { iScale: r, vScale: s } = i, o = this.getParsed(e), a = o._custom, n = Gr(a) ? "[" + a.start + ", " + a.end + "]" : "" + s.getLabelForValue(o[s.axis]);
    return {
      label: "" + r.getLabelForValue(o[r.axis]),
      value: n
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
  updateElements(e, i, r, s) {
    const o = s === "reset", { index: a, _cachedMeta: { vScale: n } } = this, l = n.getBasePixel(), d = n.isHorizontal(), c = this._getRuler(), { sharedOptions: h, includeOptions: u } = this._getSharedOptions(i, s);
    for (let g = i; g < i + r; g++) {
      const f = this.getParsed(g), _ = o || X(f[n.axis]) ? {
        base: l,
        head: l
      } : this._calculateBarValuePixels(g), p = this._calculateBarIndexPixels(g, c), y = (f._stacks || {})[n.axis], v = {
        horizontal: d,
        base: _.base,
        enableBorderRadius: !y || Gr(f._custom) || a === y._top || a === y._bottom,
        x: d ? _.head : p.center,
        y: d ? p.center : _.head,
        height: d ? p.size : Math.abs(_.size),
        width: d ? Math.abs(_.size) : p.size
      };
      u && (v.options = h || this.resolveDataElementOptions(g, e[g].active ? "active" : s));
      const x = v.options || e[g].options;
      fg(v, x, y, a), mg(v, x, c.ratio), this.updateElement(e[g], g, v, s);
    }
  }
  _getStacks(e, i) {
    const { iScale: r } = this._cachedMeta, s = r.getMatchingVisibleMetas(this._type).filter((c) => c.controller.options.grouped), o = r.options.stacked, a = [], n = this._cachedMeta.controller.getParsed(i), l = n && n[r.axis], d = (c) => {
      const h = c._parsed.find((g) => g[r.axis] === l), u = h && h[c.vScale.axis];
      if (X(u) || isNaN(u))
        return !0;
    };
    for (const c of s)
      if (!(i !== void 0 && d(c)) && ((o === !1 || a.indexOf(c.stack) === -1 || o === void 0 && c.stack === void 0) && a.push(c.stack), c.index === e))
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
    return Object.keys(e).filter((r) => e[r].axis === i).shift();
  }
  _getAxis() {
    const e = {}, i = this.getFirstScaleIdForIndexAxis();
    for (const r of this.chart.data.datasets)
      e[W(this.chart.options.indexAxis === "x" ? r.xAxisID : r.yAxisID, i)] = !0;
    return Object.keys(e);
  }
  _getStackIndex(e, i, r) {
    const s = this._getStacks(e, r), o = i !== void 0 ? s.indexOf(i) : -1;
    return o === -1 ? s.length - 1 : o;
  }
  _getRuler() {
    const e = this.options, i = this._cachedMeta, r = i.iScale, s = [];
    let o, a;
    for (o = 0, a = i.data.length; o < a; ++o)
      s.push(r.getPixelForValue(this.getParsed(o)[r.axis], o));
    const n = e.barThickness;
    return {
      min: n || dg(i),
      pixels: s,
      start: r._startPixel,
      end: r._endPixel,
      stackCount: this._getStackCount(),
      scale: r,
      grouped: e.grouped,
      ratio: n ? 1 : e.categoryPercentage * e.barPercentage
    };
  }
  _calculateBarValuePixels(e) {
    const { _cachedMeta: { vScale: i, _stacked: r, index: s }, options: { base: o, minBarLength: a } } = this, n = o || 0, l = this.getParsed(e), d = l._custom, c = Gr(d);
    let h = l[i.axis], u = 0, g = r ? this.applyStack(i, l, r) : h, f, _;
    g !== h && (u = g - h, g = h), c && (h = d.barStart, g = d.barEnd - d.barStart, h !== 0 && Ke(h) !== Ke(d.barEnd) && (u = 0), u += h);
    const p = !X(o) && !c ? o : u;
    let y = i.getPixelForValue(p);
    if (this.chart.getDataVisibility(e) ? f = i.getPixelForValue(u + g) : f = y, _ = f - y, Math.abs(_) < a) {
      _ = gg(_, i, n) * a, h === n && (y -= _ / 2);
      const v = i.getPixelForDecimal(0), x = i.getPixelForDecimal(1), L = Math.min(v, x), k = Math.max(v, x);
      y = Math.max(Math.min(y, k), L), f = y + _, r && !c && (l._stacks[i.axis]._visualValues[s] = i.getValueForPixel(f) - i.getValueForPixel(y));
    }
    if (y === i.getPixelForValue(n)) {
      const v = Ke(_) * i.getLineWidthForValue(n) / 2;
      y += v, _ -= v;
    }
    return {
      size: _,
      base: y,
      head: f,
      center: f + _ / 2
    };
  }
  _calculateBarIndexPixels(e, i) {
    const r = i.scale, s = this.options, o = s.skipNull, a = W(s.maxBarThickness, 1 / 0);
    let n, l;
    const d = this._getAxisCount();
    if (i.grouped) {
      const c = o ? this._getStackCount(e) : i.stackCount, h = s.barThickness === "flex" ? hg(e, i, s, c * d) : cg(e, i, s, c * d), u = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, g = this._getAxis().indexOf(W(u, this.getFirstScaleIdForIndexAxis())), f = this._getStackIndex(this.index, this._cachedMeta.stack, o ? e : void 0) + g;
      n = h.start + h.chunk * f + h.chunk / 2, l = Math.min(a, h.chunk * h.ratio);
    } else
      n = r.getPixelForValue(this.getParsed(e)[r.axis], e), l = Math.min(a, i.min * i.ratio);
    return {
      base: n - l / 2,
      head: n + l / 2,
      center: n,
      size: l
    };
  }
  draw() {
    const e = this._cachedMeta, i = e.vScale, r = e.data, s = r.length;
    let o = 0;
    for (; o < s; ++o)
      this.getParsed(o)[i.axis] !== null && !r[o].hidden && r[o].draw(this._ctx);
  }
}
I(Ki, "id", "bar"), I(Ki, "defaults", {
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
}), I(Ki, "overrides", {
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
class Yi extends Fe {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(e, i, r, s) {
    const o = super.parsePrimitiveData(e, i, r, s);
    for (let a = 0; a < o.length; a++)
      o[a]._custom = this.resolveDataElementOptions(a + r).radius;
    return o;
  }
  parseArrayData(e, i, r, s) {
    const o = super.parseArrayData(e, i, r, s);
    for (let a = 0; a < o.length; a++) {
      const n = i[r + a];
      o[a]._custom = W(n[2], this.resolveDataElementOptions(a + r).radius);
    }
    return o;
  }
  parseObjectData(e, i, r, s) {
    const o = super.parseObjectData(e, i, r, s);
    for (let a = 0; a < o.length; a++) {
      const n = i[r + a];
      o[a]._custom = W(n && n.r && +n.r, this.resolveDataElementOptions(a + r).radius);
    }
    return o;
  }
  getMaxOverflow() {
    const e = this._cachedMeta.data;
    let i = 0;
    for (let r = e.length - 1; r >= 0; --r)
      i = Math.max(i, e[r].size(this.resolveDataElementOptions(r)) / 2);
    return i > 0 && i;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, r = this.chart.data.labels || [], { xScale: s, yScale: o } = i, a = this.getParsed(e), n = s.getLabelForValue(a.x), l = o.getLabelForValue(a.y), d = a._custom;
    return {
      label: r[e] || "",
      value: "(" + n + ", " + l + (d ? ", " + d : "") + ")"
    };
  }
  update(e) {
    const i = this._cachedMeta.data;
    this.updateElements(i, 0, i.length, e);
  }
  updateElements(e, i, r, s) {
    const o = s === "reset", { iScale: a, vScale: n } = this._cachedMeta, { sharedOptions: l, includeOptions: d } = this._getSharedOptions(i, s), c = a.axis, h = n.axis;
    for (let u = i; u < i + r; u++) {
      const g = e[u], f = !o && this.getParsed(u), _ = {}, p = _[c] = o ? a.getPixelForDecimal(0.5) : a.getPixelForValue(f[c]), y = _[h] = o ? n.getBasePixel() : n.getPixelForValue(f[h]);
      _.skip = isNaN(p) || isNaN(y), d && (_.options = l || this.resolveDataElementOptions(u, g.active ? "active" : s), o && (_.options.radius = 0)), this.updateElement(g, u, _, s);
    }
  }
  resolveDataElementOptions(e, i) {
    const r = this.getParsed(e);
    let s = super.resolveDataElementOptions(e, i);
    s.$shared && (s = Object.assign({}, s, {
      $shared: !1
    }));
    const o = s.radius;
    return i !== "active" && (s.radius = 0), s.radius += W(r && r._custom, o), s;
  }
}
I(Yi, "id", "bubble"), I(Yi, "defaults", {
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
}), I(Yi, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function yg(t, e, i) {
  let r = 1, s = 1, o = 0, a = 0;
  if (e < oe) {
    const n = t, l = n + e, d = Math.cos(n), c = Math.sin(n), h = Math.cos(l), u = Math.sin(l), g = (x, L, k) => yi(x, n, l, !0) ? 1 : Math.max(L, L * i, k, k * i), f = (x, L, k) => yi(x, n, l, !0) ? -1 : Math.min(L, L * i, k, k * i), _ = g(0, d, h), p = g(ge, c, u), y = f(ee, d, h), v = f(ee + ge, c, u);
    r = (_ - y) / 2, s = (p - v) / 2, o = -(_ + y) / 2, a = -(p + v) / 2;
  }
  return {
    ratioX: r,
    ratioY: s,
    offsetX: o,
    offsetY: a
  };
}
class ot extends Fe {
  constructor(e, i) {
    super(e, i), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(e, i) {
    const r = this.getDataset().data, s = this._cachedMeta;
    if (this._parsing === !1)
      s._parsed = r;
    else {
      let o = (l) => +r[l];
      if (Z(r[e])) {
        const { key: l = "value" } = this._parsing;
        o = (d) => +dt(r[d], l);
      }
      let a, n;
      for (a = e, n = e + i; a < n; ++a)
        s._parsed[a] = o(a);
    }
  }
  _getRotation() {
    return He(this.options.rotation - 90);
  }
  _getCircumference() {
    return He(this.options.circumference);
  }
  _getRotationExtents() {
    let e = oe, i = -oe;
    for (let r = 0; r < this.chart.data.datasets.length; ++r)
      if (this.chart.isDatasetVisible(r) && this.chart.getDatasetMeta(r).type === this._type) {
        const s = this.chart.getDatasetMeta(r).controller, o = s._getRotation(), a = s._getCircumference();
        e = Math.min(e, o), i = Math.max(i, o + a);
      }
    return {
      rotation: e,
      circumference: i - e
    };
  }
  update(e) {
    const i = this.chart, { chartArea: r } = i, s = this._cachedMeta, o = s.data, a = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, n = Math.max((Math.min(r.width, r.height) - a) / 2, 0), l = Math.min($h(this.options.cutout, n), 1), d = this._getRingWeight(this.index), { circumference: c, rotation: h } = this._getRotationExtents(), { ratioX: u, ratioY: g, offsetX: f, offsetY: _ } = yg(h, c, l), p = (r.width - a) / u, y = (r.height - a) / g, v = Math.max(Math.min(p, y) / 2, 0), x = Ma(this.options.radius, v), L = Math.max(x * l, 0), k = (x - L) / this._getVisibleDatasetWeightTotal();
    this.offsetX = f * x, this.offsetY = _ * x, s.total = this.calculateTotal(), this.outerRadius = x - k * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - k * d, 0), this.updateElements(o, 0, o.length, e);
  }
  _circumference(e, i) {
    const r = this.options, s = this._cachedMeta, o = this._getCircumference();
    return i && r.animation.animateRotate || !this.chart.getDataVisibility(e) || s._parsed[e] === null || s.data[e].hidden ? 0 : this.calculateCircumference(s._parsed[e] * o / oe);
  }
  updateElements(e, i, r, s) {
    const o = s === "reset", a = this.chart, n = a.chartArea, d = a.options.animation, c = (n.left + n.right) / 2, h = (n.top + n.bottom) / 2, u = o && d.animateScale, g = u ? 0 : this.innerRadius, f = u ? 0 : this.outerRadius, { sharedOptions: _, includeOptions: p } = this._getSharedOptions(i, s);
    let y = this._getRotation(), v;
    for (v = 0; v < i; ++v)
      y += this._circumference(v, o);
    for (v = i; v < i + r; ++v) {
      const x = this._circumference(v, o), L = e[v], k = {
        x: c + this.offsetX,
        y: h + this.offsetY,
        startAngle: y,
        endAngle: y + x,
        circumference: x,
        outerRadius: f,
        innerRadius: g
      };
      p && (k.options = _ || this.resolveDataElementOptions(v, L.active ? "active" : s)), y += x, this.updateElement(L, v, k, s);
    }
  }
  calculateTotal() {
    const e = this._cachedMeta, i = e.data;
    let r = 0, s;
    for (s = 0; s < i.length; s++) {
      const o = e._parsed[s];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(s) && !i[s].hidden && (r += Math.abs(o));
    }
    return r;
  }
  calculateCircumference(e) {
    const i = this._cachedMeta.total;
    return i > 0 && !isNaN(e) ? oe * (Math.abs(e) / i) : 0;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, r = this.chart, s = r.data.labels || [], o = Ci(i._parsed[e], r.options.locale);
    return {
      label: s[e] || "",
      value: o
    };
  }
  getMaxBorderWidth(e) {
    let i = 0;
    const r = this.chart;
    let s, o, a, n, l;
    if (!e) {
      for (s = 0, o = r.data.datasets.length; s < o; ++s)
        if (r.isDatasetVisible(s)) {
          a = r.getDatasetMeta(s), e = a.data, n = a.controller;
          break;
        }
    }
    if (!e)
      return 0;
    for (s = 0, o = e.length; s < o; ++s)
      l = n.resolveDataElementOptions(s), l.borderAlign !== "inner" && (i = Math.max(i, l.borderWidth || 0, l.hoverBorderWidth || 0));
    return i;
  }
  getMaxOffset(e) {
    let i = 0;
    for (let r = 0, s = e.length; r < s; ++r) {
      const o = this.resolveDataElementOptions(r);
      i = Math.max(i, o.offset || 0, o.hoverOffset || 0);
    }
    return i;
  }
  _getRingWeightOffset(e) {
    let i = 0;
    for (let r = 0; r < e; ++r)
      this.chart.isDatasetVisible(r) && (i += this._getRingWeight(r));
    return i;
  }
  _getRingWeight(e) {
    return Math.max(W(this.chart.data.datasets[e].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
I(ot, "id", "doughnut"), I(ot, "defaults", {
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
}), I(ot, "descriptors", {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
}), I(ot, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const i = e.data;
          if (i.labels.length && i.datasets.length) {
            const { labels: { pointStyle: r, color: s } } = e.legend.options;
            return i.labels.map((o, a) => {
              const l = e.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: o,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: s,
                lineWidth: l.borderWidth,
                pointStyle: r,
                hidden: !e.getDataVisibility(a),
                index: a
              };
            });
          }
          return [];
        }
      },
      onClick(e, i, r) {
        r.chart.toggleDataVisibility(i.index), r.chart.update();
      }
    }
  }
});
class Xi extends Fe {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(e) {
    const i = this._cachedMeta, { dataset: r, data: s = [], _dataset: o } = i, a = this.chart._animationsDisabled;
    let { start: n, count: l } = Ia(i, s, a);
    this._drawStart = n, this._drawCount = l, Na(i) && (n = 0, l = s.length), r._chart = this.chart, r._datasetIndex = this.index, r._decimated = !!o._decimated, r.points = s;
    const d = this.resolveDatasetElementOptions(e);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(r, void 0, {
      animated: !a,
      options: d
    }, e), this.updateElements(s, n, l, e);
  }
  updateElements(e, i, r, s) {
    const o = s === "reset", { iScale: a, vScale: n, _stacked: l, _dataset: d } = this._cachedMeta, { sharedOptions: c, includeOptions: h } = this._getSharedOptions(i, s), u = a.axis, g = n.axis, { spanGaps: f, segment: _ } = this.options, p = Ht(f) ? f : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || o || s === "none", v = i + r, x = e.length;
    let L = i > 0 && this.getParsed(i - 1);
    for (let k = 0; k < x; ++k) {
      const A = e[k], P = y ? A : {};
      if (k < i || k >= v) {
        P.skip = !0;
        continue;
      }
      const $ = this.getParsed(k), S = X($[g]), w = P[u] = a.getPixelForValue($[u], k), C = P[g] = o || S ? n.getBasePixel() : n.getPixelForValue(l ? this.applyStack(n, $, l) : $[g], k);
      P.skip = isNaN(w) || isNaN(C) || S, P.stop = k > 0 && Math.abs($[u] - L[u]) > p, _ && (P.parsed = $, P.raw = d.data[k]), h && (P.options = c || this.resolveDataElementOptions(k, A.active ? "active" : s)), y || this.updateElement(A, k, P, s), L = $;
    }
  }
  getMaxOverflow() {
    const e = this._cachedMeta, i = e.dataset, r = i.options && i.options.borderWidth || 0, s = e.data || [];
    if (!s.length)
      return r;
    const o = s[0].size(this.resolveDataElementOptions(0)), a = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
    return Math.max(r, o, a) / 2;
  }
  draw() {
    const e = this._cachedMeta;
    e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
  }
}
I(Xi, "id", "line"), I(Xi, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), I(Xi, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
class ci extends Fe {
  constructor(e, i) {
    super(e, i), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(e) {
    const i = this._cachedMeta, r = this.chart, s = r.data.labels || [], o = Ci(i._parsed[e].r, r.options.locale);
    return {
      label: s[e] || "",
      value: o
    };
  }
  parseObjectData(e, i, r, s) {
    return Wa.bind(this)(e, i, r, s);
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
    return e.data.forEach((r, s) => {
      const o = this.getParsed(s).r;
      !isNaN(o) && this.chart.getDataVisibility(s) && (o < i.min && (i.min = o), o > i.max && (i.max = o));
    }), i;
  }
  _updateRadius() {
    const e = this.chart, i = e.chartArea, r = e.options, s = Math.min(i.right - i.left, i.bottom - i.top), o = Math.max(s / 2, 0), a = Math.max(r.cutoutPercentage ? o / 100 * r.cutoutPercentage : 1, 0), n = (o - a) / e.getVisibleDatasetCount();
    this.outerRadius = o - n * this.index, this.innerRadius = this.outerRadius - n;
  }
  updateElements(e, i, r, s) {
    const o = s === "reset", a = this.chart, l = a.options.animation, d = this._cachedMeta.rScale, c = d.xCenter, h = d.yCenter, u = d.getIndexAngle(0) - 0.5 * ee;
    let g = u, f;
    const _ = 360 / this.countVisibleElements();
    for (f = 0; f < i; ++f)
      g += this._computeAngle(f, s, _);
    for (f = i; f < i + r; f++) {
      const p = e[f];
      let y = g, v = g + this._computeAngle(f, s, _), x = a.getDataVisibility(f) ? d.getDistanceFromCenterForValue(this.getParsed(f).r) : 0;
      g = v, o && (l.animateScale && (x = 0), l.animateRotate && (y = v = u));
      const L = {
        x: c,
        y: h,
        innerRadius: 0,
        outerRadius: x,
        startAngle: y,
        endAngle: v,
        options: this.resolveDataElementOptions(f, p.active ? "active" : s)
      };
      this.updateElement(p, f, L, s);
    }
  }
  countVisibleElements() {
    const e = this._cachedMeta;
    let i = 0;
    return e.data.forEach((r, s) => {
      !isNaN(this.getParsed(s).r) && this.chart.getDataVisibility(s) && i++;
    }), i;
  }
  _computeAngle(e, i, r) {
    return this.chart.getDataVisibility(e) ? He(this.resolveDataElementOptions(e, i).angle || r) : 0;
  }
}
I(ci, "id", "polarArea"), I(ci, "defaults", {
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
}), I(ci, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const i = e.data;
          if (i.labels.length && i.datasets.length) {
            const { labels: { pointStyle: r, color: s } } = e.legend.options;
            return i.labels.map((o, a) => {
              const l = e.getDatasetMeta(0).controller.getStyle(a);
              return {
                text: o,
                fillStyle: l.backgroundColor,
                strokeStyle: l.borderColor,
                fontColor: s,
                lineWidth: l.borderWidth,
                pointStyle: r,
                hidden: !e.getDataVisibility(a),
                index: a
              };
            });
          }
          return [];
        }
      },
      onClick(e, i, r) {
        r.chart.toggleDataVisibility(i.index), r.chart.update();
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
class ys extends ot {
}
I(ys, "id", "pie"), I(ys, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
class Zi extends Fe {
  getLabelAndValue(e) {
    const i = this._cachedMeta.vScale, r = this.getParsed(e);
    return {
      label: i.getLabels()[e],
      value: "" + i.getLabelForValue(r[i.axis])
    };
  }
  parseObjectData(e, i, r, s) {
    return Wa.bind(this)(e, i, r, s);
  }
  update(e) {
    const i = this._cachedMeta, r = i.dataset, s = i.data || [], o = i.iScale.getLabels();
    if (r.points = s, e !== "resize") {
      const a = this.resolveDatasetElementOptions(e);
      this.options.showLine || (a.borderWidth = 0);
      const n = {
        _loop: !0,
        _fullLoop: o.length === s.length,
        options: a
      };
      this.updateElement(r, void 0, n, e);
    }
    this.updateElements(s, 0, s.length, e);
  }
  updateElements(e, i, r, s) {
    const o = this._cachedMeta.rScale, a = s === "reset";
    for (let n = i; n < i + r; n++) {
      const l = e[n], d = this.resolveDataElementOptions(n, l.active ? "active" : s), c = o.getPointPositionForValue(n, this.getParsed(n).r), h = a ? o.xCenter : c.x, u = a ? o.yCenter : c.y, g = {
        x: h,
        y: u,
        angle: c.angle,
        skip: isNaN(h) || isNaN(u),
        options: d
      };
      this.updateElement(l, n, g, s);
    }
  }
}
I(Zi, "id", "radar"), I(Zi, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}), I(Zi, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
class qi extends Fe {
  getLabelAndValue(e) {
    const i = this._cachedMeta, r = this.chart.data.labels || [], { xScale: s, yScale: o } = i, a = this.getParsed(e), n = s.getLabelForValue(a.x), l = o.getLabelForValue(a.y);
    return {
      label: r[e] || "",
      value: "(" + n + ", " + l + ")"
    };
  }
  update(e) {
    const i = this._cachedMeta, { data: r = [] } = i, s = this.chart._animationsDisabled;
    let { start: o, count: a } = Ia(i, r, s);
    if (this._drawStart = o, this._drawCount = a, Na(i) && (o = 0, a = r.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: n, _dataset: l } = i;
      n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!l._decimated, n.points = r;
      const d = this.resolveDatasetElementOptions(e);
      d.segment = this.options.segment, this.updateElement(n, void 0, {
        animated: !s,
        options: d
      }, e);
    } else this.datasetElementType && (delete i.dataset, this.datasetElementType = !1);
    this.updateElements(r, o, a, e);
  }
  addElements() {
    const { showLine: e } = this.options;
    !this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(e, i, r, s) {
    const o = s === "reset", { iScale: a, vScale: n, _stacked: l, _dataset: d } = this._cachedMeta, c = this.resolveDataElementOptions(i, s), h = this.getSharedOptions(c), u = this.includeOptions(s, h), g = a.axis, f = n.axis, { spanGaps: _, segment: p } = this.options, y = Ht(_) ? _ : Number.POSITIVE_INFINITY, v = this.chart._animationsDisabled || o || s === "none";
    let x = i > 0 && this.getParsed(i - 1);
    for (let L = i; L < i + r; ++L) {
      const k = e[L], A = this.getParsed(L), P = v ? k : {}, $ = X(A[f]), S = P[g] = a.getPixelForValue(A[g], L), w = P[f] = o || $ ? n.getBasePixel() : n.getPixelForValue(l ? this.applyStack(n, A, l) : A[f], L);
      P.skip = isNaN(S) || isNaN(w) || $, P.stop = L > 0 && Math.abs(A[g] - x[g]) > y, p && (P.parsed = A, P.raw = d.data[L]), u && (P.options = h || this.resolveDataElementOptions(L, k.active ? "active" : s)), v || this.updateElement(k, L, P, s), x = A;
    }
    this.updateSharedOptions(h, s, c);
  }
  getMaxOverflow() {
    const e = this._cachedMeta, i = e.data || [];
    if (!this.options.showLine) {
      let n = 0;
      for (let l = i.length - 1; l >= 0; --l)
        n = Math.max(n, i[l].size(this.resolveDataElementOptions(l)) / 2);
      return n > 0 && n;
    }
    const r = e.dataset, s = r.options && r.options.borderWidth || 0;
    if (!i.length)
      return s;
    const o = i[0].size(this.resolveDataElementOptions(0)), a = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(s, o, a) / 2;
  }
}
I(qi, "id", "scatter"), I(qi, "defaults", {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}), I(qi, "overrides", {
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
var vg = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: Ki,
  BubbleController: Yi,
  DoughnutController: ot,
  LineController: Xi,
  PieController: ys,
  PolarAreaController: ci,
  RadarController: Zi,
  ScatterController: qi
});
function mt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Ks {
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
    Object.assign(Ks.prototype, e);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return mt();
  }
  parse() {
    return mt();
  }
  format() {
    return mt();
  }
  add() {
    return mt();
  }
  diff() {
    return mt();
  }
  startOf() {
    return mt();
  }
  endOf() {
    return mt();
  }
}
var bg = {
  _date: Ks
};
function xg(t, e, i, r) {
  const { controller: s, data: o, _sorted: a } = t, n = s._cachedMeta.iScale, l = t.dataset && t.dataset.options ? t.dataset.options.spanGaps : null;
  if (n && e === n.axis && e !== "r" && a && o.length) {
    const d = n._reversePixels ? Gh : Qe;
    if (r) {
      if (s._sharedOptions) {
        const c = o[0], h = typeof c.getRange == "function" && c.getRange(e);
        if (h) {
          const u = d(o, e, i - h), g = d(o, e, i + h);
          return {
            lo: u.lo,
            hi: g.hi
          };
        }
      }
    } else {
      const c = d(o, e, i);
      if (l) {
        const { vScale: h } = s._cachedMeta, { _parsed: u } = t, g = u.slice(0, c.lo + 1).reverse().findIndex((_) => !X(_[h.axis]));
        c.lo -= Math.max(0, g);
        const f = u.slice(c.hi).findIndex((_) => !X(_[h.axis]));
        c.hi += Math.max(0, f);
      }
      return c;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function br(t, e, i, r, s) {
  const o = t.getSortedVisibleDatasetMetas(), a = i[e];
  for (let n = 0, l = o.length; n < l; ++n) {
    const { index: d, data: c } = o[n], { lo: h, hi: u } = xg(o[n], e, a, s);
    for (let g = h; g <= u; ++g) {
      const f = c[g];
      f.skip || r(f, d, g);
    }
  }
}
function wg(t) {
  const e = t.indexOf("x") !== -1, i = t.indexOf("y") !== -1;
  return function(r, s) {
    const o = e ? Math.abs(r.x - s.x) : 0, a = i ? Math.abs(r.y - s.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
  };
}
function Ur(t, e, i, r, s) {
  const o = [];
  return !s && !t.isPointInArea(e) || br(t, i, e, function(n, l, d) {
    !s && !et(n, t.chartArea, 0) || n.inRange(e.x, e.y, r) && o.push({
      element: n,
      datasetIndex: l,
      index: d
    });
  }, !0), o;
}
function kg(t, e, i, r) {
  let s = [];
  function o(a, n, l) {
    const { startAngle: d, endAngle: c } = a.getProps([
      "startAngle",
      "endAngle"
    ], r), { angle: h } = Da(a, {
      x: e.x,
      y: e.y
    });
    yi(h, d, c) && s.push({
      element: a,
      datasetIndex: n,
      index: l
    });
  }
  return br(t, i, e, o), s;
}
function Sg(t, e, i, r, s, o) {
  let a = [];
  const n = wg(i);
  let l = Number.POSITIVE_INFINITY;
  function d(c, h, u) {
    const g = c.inRange(e.x, e.y, s);
    if (r && !g)
      return;
    const f = c.getCenterPoint(s);
    if (!(!!o || t.isPointInArea(f)) && !g)
      return;
    const p = n(e, f);
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
  return br(t, i, e, d), a;
}
function Vr(t, e, i, r, s, o) {
  return !o && !t.isPointInArea(e) ? [] : i === "r" && !r ? kg(t, e, i, s) : Sg(t, e, i, r, s, o);
}
function rn(t, e, i, r, s) {
  const o = [], a = i === "x" ? "inXRange" : "inYRange";
  let n = !1;
  return br(t, i, e, (l, d, c) => {
    l[a] && l[a](e[i], s) && (o.push({
      element: l,
      datasetIndex: d,
      index: c
    }), n = n || l.inRange(e.x, e.y, s));
  }), r && !n ? [] : o;
}
var Ag = {
  modes: {
    index(t, e, i, r) {
      const s = vt(e, t), o = i.axis || "x", a = i.includeInvisible || !1, n = i.intersect ? Ur(t, s, o, r, a) : Vr(t, s, o, !1, r, a), l = [];
      return n.length ? (t.getSortedVisibleDatasetMetas().forEach((d) => {
        const c = n[0].index, h = d.data[c];
        h && !h.skip && l.push({
          element: h,
          datasetIndex: d.index,
          index: c
        });
      }), l) : [];
    },
    dataset(t, e, i, r) {
      const s = vt(e, t), o = i.axis || "xy", a = i.includeInvisible || !1;
      let n = i.intersect ? Ur(t, s, o, r, a) : Vr(t, s, o, !1, r, a);
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
    point(t, e, i, r) {
      const s = vt(e, t), o = i.axis || "xy", a = i.includeInvisible || !1;
      return Ur(t, s, o, r, a);
    },
    nearest(t, e, i, r) {
      const s = vt(e, t), o = i.axis || "xy", a = i.includeInvisible || !1;
      return Vr(t, s, o, i.intersect, r, a);
    },
    x(t, e, i, r) {
      const s = vt(e, t);
      return rn(t, s, "x", i.intersect, r);
    },
    y(t, e, i, r) {
      const s = vt(e, t);
      return rn(t, s, "y", i.intersect, r);
    }
  }
};
const rl = [
  "left",
  "top",
  "right",
  "bottom"
];
function Yt(t, e) {
  return t.filter((i) => i.pos === e);
}
function sn(t, e) {
  return t.filter((i) => rl.indexOf(i.pos) === -1 && i.box.axis === e);
}
function Xt(t, e) {
  return t.sort((i, r) => {
    const s = e ? r : i, o = e ? i : r;
    return s.weight === o.weight ? s.index - o.index : s.weight - o.weight;
  });
}
function Cg(t) {
  const e = [];
  let i, r, s, o, a, n;
  for (i = 0, r = (t || []).length; i < r; ++i)
    s = t[i], { position: o, options: { stack: a, stackWeight: n = 1 } } = s, e.push({
      index: i,
      box: s,
      pos: o,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: a && o + a,
      stackWeight: n
    });
  return e;
}
function Eg(t) {
  const e = {};
  for (const i of t) {
    const { stack: r, pos: s, stackWeight: o } = i;
    if (!r || !rl.includes(s))
      continue;
    const a = e[r] || (e[r] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    a.count++, a.weight += o;
  }
  return e;
}
function Pg(t, e) {
  const i = Eg(t), { vBoxMaxWidth: r, hBoxMaxHeight: s } = e;
  let o, a, n;
  for (o = 0, a = t.length; o < a; ++o) {
    n = t[o];
    const { fullSize: l } = n.box, d = i[n.stack], c = d && n.stackWeight / d.weight;
    n.horizontal ? (n.width = c ? c * r : l && e.availableWidth, n.height = s) : (n.width = r, n.height = c ? c * s : l && e.availableHeight);
  }
  return i;
}
function Mg(t) {
  const e = Cg(t), i = Xt(e.filter((d) => d.box.fullSize), !0), r = Xt(Yt(e, "left"), !0), s = Xt(Yt(e, "right")), o = Xt(Yt(e, "top"), !0), a = Xt(Yt(e, "bottom")), n = sn(e, "x"), l = sn(e, "y");
  return {
    fullSize: i,
    leftAndTop: r.concat(o),
    rightAndBottom: s.concat(l).concat(a).concat(n),
    chartArea: Yt(e, "chartArea"),
    vertical: r.concat(s).concat(l),
    horizontal: o.concat(a).concat(n)
  };
}
function on(t, e, i, r) {
  return Math.max(t[i], e[i]) + Math.max(t[r], e[r]);
}
function sl(t, e) {
  t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right);
}
function $g(t, e, i, r) {
  const { pos: s, box: o } = i, a = t.maxPadding;
  if (!Z(s)) {
    i.size && (t[s] -= i.size);
    const h = r[i.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, i.horizontal ? o.height : o.width), i.size = h.size / h.count, t[s] += i.size;
  }
  o.getPadding && sl(a, o.getPadding());
  const n = Math.max(0, e.outerWidth - on(a, t, "left", "right")), l = Math.max(0, e.outerHeight - on(a, t, "top", "bottom")), d = n !== t.w, c = l !== t.h;
  return t.w = n, t.h = l, i.horizontal ? {
    same: d,
    other: c
  } : {
    same: c,
    other: d
  };
}
function Lg(t) {
  const e = t.maxPadding;
  function i(r) {
    const s = Math.max(e[r] - t[r], 0);
    return t[r] += s, s;
  }
  t.y += i("top"), t.x += i("left"), i("right"), i("bottom");
}
function Dg(t, e) {
  const i = e.maxPadding;
  function r(s) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((a) => {
      o[a] = Math.max(e[a], i[a]);
    }), o;
  }
  return r(t ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ti(t, e, i, r) {
  const s = [];
  let o, a, n, l, d, c;
  for (o = 0, a = t.length, d = 0; o < a; ++o) {
    n = t[o], l = n.box, l.update(n.width || e.w, n.height || e.h, Dg(n.horizontal, e));
    const { same: h, other: u } = $g(e, i, n, r);
    d |= h && s.length, c = c || u, l.fullSize || s.push(n);
  }
  return d && ti(s, e, i, r) || c;
}
function Ii(t, e, i, r, s) {
  t.top = i, t.left = e, t.right = e + r, t.bottom = i + s, t.width = r, t.height = s;
}
function nn(t, e, i, r) {
  const s = i.padding;
  let { x: o, y: a } = e;
  for (const n of t) {
    const l = n.box, d = r[n.stack] || {
      placed: 0,
      weight: 1
    }, c = n.stackWeight / d.weight || 1;
    if (n.horizontal) {
      const h = e.w * c, u = d.size || l.height;
      mi(d.start) && (a = d.start), l.fullSize ? Ii(l, s.left, a, i.outerWidth - s.right - s.left, u) : Ii(l, e.left + d.placed, a, h, u), d.start = a, d.placed += h, a = l.bottom;
    } else {
      const h = e.h * c, u = d.size || l.width;
      mi(d.start) && (o = d.start), l.fullSize ? Ii(l, o, s.top, u, i.outerHeight - s.bottom - s.top) : Ii(l, o, e.top + d.placed, u, h), d.start = o, d.placed += h, o = l.right;
    }
  }
  e.x = o, e.y = a;
}
var be = {
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
  update(t, e, i, r) {
    if (!t)
      return;
    const s = xe(t.options.layout.padding), o = Math.max(e - s.width, 0), a = Math.max(i - s.height, 0), n = Mg(t.boxes), l = n.vertical, d = n.horizontal;
    re(t.boxes, (_) => {
      typeof _.beforeLayout == "function" && _.beforeLayout();
    });
    const c = l.reduce((_, p) => p.box.options && p.box.options.display === !1 ? _ : _ + 1, 0) || 1, h = Object.freeze({
      outerWidth: e,
      outerHeight: i,
      padding: s,
      availableWidth: o,
      availableHeight: a,
      vBoxMaxWidth: o / 2 / c,
      hBoxMaxHeight: a / 2
    }), u = Object.assign({}, s);
    sl(u, xe(r));
    const g = Object.assign({
      maxPadding: u,
      w: o,
      h: a,
      x: s.left,
      y: s.top
    }, s), f = Pg(l.concat(d), h);
    ti(n.fullSize, g, h, f), ti(l, g, h, f), ti(d, g, h, f) && ti(l, g, h, f), Lg(g), nn(n.leftAndTop, g, h, f), g.x += g.w, g.y += g.h, nn(n.rightAndBottom, g, h, f), t.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, re(n.chartArea, (_) => {
      const p = _.box;
      Object.assign(p, t.chartArea), p.update(g.w, g.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class ol {
  acquireContext(e, i) {
  }
  releaseContext(e) {
    return !1;
  }
  addEventListener(e, i, r) {
  }
  removeEventListener(e, i, r) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(e, i, r, s) {
    return i = Math.max(0, i || e.width), r = r || e.height, {
      width: i,
      height: Math.max(0, s ? Math.floor(i / s) : r)
    };
  }
  isAttached(e) {
    return !0;
  }
  updateConfig(e) {
  }
}
class Tg extends ol {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const Ji = "$chartjs", zg = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, an = (t) => t === null || t === "";
function Og(t, e) {
  const i = t.style, r = t.getAttribute("height"), s = t.getAttribute("width");
  if (t[Ji] = {
    initial: {
      height: r,
      width: s,
      style: {
        display: i.display,
        height: i.height,
        width: i.width
      }
    }
  }, i.display = i.display || "block", i.boxSizing = i.boxSizing || "border-box", an(s)) {
    const o = Go(t, "width");
    o !== void 0 && (t.width = o);
  }
  if (an(r))
    if (t.style.height === "")
      t.height = t.width / (e || 2);
    else {
      const o = Go(t, "height");
      o !== void 0 && (t.height = o);
    }
  return t;
}
const nl = Ru ? {
  passive: !0
} : !1;
function Rg(t, e, i) {
  t && t.addEventListener(e, i, nl);
}
function Ig(t, e, i) {
  t && t.canvas && t.canvas.removeEventListener(e, i, nl);
}
function Ng(t, e) {
  const i = zg[t.type] || t.type, { x: r, y: s } = vt(t, e);
  return {
    type: i,
    chart: e,
    native: t,
    x: r !== void 0 ? r : null,
    y: s !== void 0 ? s : null
  };
}
function cr(t, e) {
  for (const i of t)
    if (i === e || i.contains(e))
      return !0;
}
function Bg(t, e, i) {
  const r = t.canvas, s = new MutationObserver((o) => {
    let a = !1;
    for (const n of o)
      a = a || cr(n.addedNodes, r), a = a && !cr(n.removedNodes, r);
    a && i();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function Hg(t, e, i) {
  const r = t.canvas, s = new MutationObserver((o) => {
    let a = !1;
    for (const n of o)
      a = a || cr(n.removedNodes, r), a = a && !cr(n.addedNodes, r);
    a && i();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const bi = /* @__PURE__ */ new Map();
let ln = 0;
function al() {
  const t = window.devicePixelRatio;
  t !== ln && (ln = t, bi.forEach((e, i) => {
    i.currentDevicePixelRatio !== t && e();
  }));
}
function Fg(t, e) {
  bi.size || window.addEventListener("resize", al), bi.set(t, e);
}
function jg(t) {
  bi.delete(t), bi.size || window.removeEventListener("resize", al);
}
function Gg(t, e, i) {
  const r = t.canvas, s = r && Ws(r);
  if (!s)
    return;
  const o = Ra((n, l) => {
    const d = s.clientWidth;
    i(n, l), d < s.clientWidth && i();
  }, window), a = new ResizeObserver((n) => {
    const l = n[0], d = l.contentRect.width, c = l.contentRect.height;
    d === 0 && c === 0 || o(d, c);
  });
  return a.observe(s), Fg(t, o), a;
}
function Wr(t, e, i) {
  i && i.disconnect(), e === "resize" && jg(t);
}
function Ug(t, e, i) {
  const r = t.canvas, s = Ra((o) => {
    t.ctx !== null && i(Ng(o, t));
  }, t);
  return Rg(r, e, s), s;
}
class Vg extends ol {
  acquireContext(e, i) {
    const r = e && e.getContext && e.getContext("2d");
    return r && r.canvas === e ? (Og(e, i), r) : null;
  }
  releaseContext(e) {
    const i = e.canvas;
    if (!i[Ji])
      return !1;
    const r = i[Ji].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const a = r[o];
      X(a) ? i.removeAttribute(o) : i.setAttribute(o, a);
    });
    const s = r.style || {};
    return Object.keys(s).forEach((o) => {
      i.style[o] = s[o];
    }), i.width = i.width, delete i[Ji], !0;
  }
  addEventListener(e, i, r) {
    this.removeEventListener(e, i);
    const s = e.$proxies || (e.$proxies = {}), a = {
      attach: Bg,
      detach: Hg,
      resize: Gg
    }[i] || Ug;
    s[i] = a(e, i, r);
  }
  removeEventListener(e, i) {
    const r = e.$proxies || (e.$proxies = {}), s = r[i];
    if (!s)
      return;
    ({
      attach: Wr,
      detach: Wr,
      resize: Wr
    }[i] || Ig)(e, i, s), r[i] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, i, r, s) {
    return Ou(e, i, r, s);
  }
  isAttached(e) {
    const i = e && Ws(e);
    return !!(i && i.isConnected);
  }
}
function Wg(t) {
  return !Vs() || typeof OffscreenCanvas < "u" && t instanceof OffscreenCanvas ? Tg : Vg;
}
class je {
  constructor() {
    I(this, "x");
    I(this, "y");
    I(this, "active", !1);
    I(this, "options");
    I(this, "$animations");
  }
  tooltipPosition(e) {
    const { x: i, y: r } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: i,
      y: r
    };
  }
  hasValue() {
    return Ht(this.x) && Ht(this.y);
  }
  getProps(e, i) {
    const r = this.$animations;
    if (!i || !r)
      return this;
    const s = {};
    return e.forEach((o) => {
      s[o] = r[o] && r[o].active() ? r[o]._to : this[o];
    }), s;
  }
}
I(je, "defaults", {}), I(je, "defaultRoutes");
function Kg(t, e) {
  const i = t.options.ticks, r = Yg(t), s = Math.min(i.maxTicksLimit || r, r), o = i.major.enabled ? Zg(e) : [], a = o.length, n = o[0], l = o[a - 1], d = [];
  if (a > s)
    return qg(e, d, o, a / s), d;
  const c = Xg(o, e, s);
  if (a > 0) {
    let h, u;
    const g = a > 1 ? Math.round((l - n) / (a - 1)) : null;
    for (Ni(e, d, c, X(g) ? 0 : n - g, n), h = 0, u = a - 1; h < u; h++)
      Ni(e, d, c, o[h], o[h + 1]);
    return Ni(e, d, c, l, X(g) ? e.length : l + g), d;
  }
  return Ni(e, d, c), d;
}
function Yg(t) {
  const e = t.options.offset, i = t._tickSize(), r = t._length / i + (e ? 0 : 1), s = t._maxLength / i;
  return Math.floor(Math.min(r, s));
}
function Xg(t, e, i) {
  const r = Jg(t), s = e.length / i;
  if (!r)
    return Math.max(s, 1);
  const o = Nh(r);
  for (let a = 0, n = o.length - 1; a < n; a++) {
    const l = o[a];
    if (l > s)
      return l;
  }
  return Math.max(s, 1);
}
function Zg(t) {
  const e = [];
  let i, r;
  for (i = 0, r = t.length; i < r; i++)
    t[i].major && e.push(i);
  return e;
}
function qg(t, e, i, r) {
  let s = 0, o = i[0], a;
  for (r = Math.ceil(r), a = 0; a < t.length; a++)
    a === o && (e.push(t[a]), s++, o = i[s * r]);
}
function Ni(t, e, i, r, s) {
  const o = W(r, 0), a = Math.min(W(s, t.length), t.length);
  let n = 0, l, d, c;
  for (i = Math.ceil(i), s && (l = s - r, i = l / Math.floor(l / i)), c = o; c < 0; )
    n++, c = Math.round(o + n * i);
  for (d = Math.max(o, 0); d < a; d++)
    d === c && (e.push(t[d]), n++, c = Math.round(o + n * i));
}
function Jg(t) {
  const e = t.length;
  let i, r;
  if (e < 2)
    return !1;
  for (r = t[0], i = 1; i < e; ++i)
    if (t[i] - t[i - 1] !== r)
      return !1;
  return r;
}
const Qg = (t) => t === "left" ? "right" : t === "right" ? "left" : t, dn = (t, e, i) => e === "top" || e === "left" ? t[e] + i : t[e] - i, cn = (t, e) => Math.min(e || t, t);
function hn(t, e) {
  const i = [], r = t.length / e, s = t.length;
  let o = 0;
  for (; o < s; o += r)
    i.push(t[Math.floor(o)]);
  return i;
}
function e_(t, e, i) {
  const r = t.ticks.length, s = Math.min(e, r - 1), o = t._startPixel, a = t._endPixel, n = 1e-6;
  let l = t.getPixelForTick(s), d;
  if (!(i && (r === 1 ? d = Math.max(l - o, a - l) : e === 0 ? d = (t.getPixelForTick(1) - l) / 2 : d = (l - t.getPixelForTick(s - 1)) / 2, l += s < e ? d : -d, l < o - n || l > a + n)))
    return l;
}
function t_(t, e) {
  re(t, (i) => {
    const r = i.gc, s = r.length / 2;
    let o;
    if (s > e) {
      for (o = 0; o < s; ++o)
        delete i.data[r[o]];
      r.splice(0, s);
    }
  });
}
function Zt(t) {
  return t.drawTicks ? t.tickLength : 0;
}
function un(t, e) {
  if (!t.display)
    return 0;
  const i = fe(t.font, e), r = xe(t.padding);
  return (le(t.text) ? t.text.length : 1) * i.lineHeight + r.height;
}
function i_(t, e) {
  return ht(t, {
    scale: e,
    type: "scale"
  });
}
function r_(t, e, i) {
  return ht(t, {
    tick: i,
    index: e,
    type: "tick"
  });
}
function s_(t, e, i) {
  let r = Bs(t);
  return (i && e !== "right" || !i && e === "right") && (r = Qg(r)), r;
}
function o_(t, e, i, r) {
  const { top: s, left: o, bottom: a, right: n, chart: l } = t, { chartArea: d, scales: c } = l;
  let h = 0, u, g, f;
  const _ = a - s, p = n - o;
  if (t.isHorizontal()) {
    if (g = ye(r, o, n), Z(i)) {
      const y = Object.keys(i)[0], v = i[y];
      f = c[y].getPixelForValue(v) + _ - e;
    } else i === "center" ? f = (d.bottom + d.top) / 2 + _ - e : f = dn(t, i, e);
    u = n - o;
  } else {
    if (Z(i)) {
      const y = Object.keys(i)[0], v = i[y];
      g = c[y].getPixelForValue(v) - p + e;
    } else i === "center" ? g = (d.left + d.right) / 2 - p + e : g = dn(t, i, e);
    f = ye(r, a, s), h = i === "left" ? -ge : ge;
  }
  return {
    titleX: g,
    titleY: f,
    maxWidth: u,
    rotation: h
  };
}
class Mt extends je {
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
    let { _userMin: e, _userMax: i, _suggestedMin: r, _suggestedMax: s } = this;
    return e = De(e, Number.POSITIVE_INFINITY), i = De(i, Number.NEGATIVE_INFINITY), r = De(r, Number.POSITIVE_INFINITY), s = De(s, Number.NEGATIVE_INFINITY), {
      min: De(e, r),
      max: De(i, s),
      minDefined: ue(e),
      maxDefined: ue(i)
    };
  }
  getMinMax(e) {
    let { min: i, max: r, minDefined: s, maxDefined: o } = this.getUserBounds(), a;
    if (s && o)
      return {
        min: i,
        max: r
      };
    const n = this.getMatchingVisibleMetas();
    for (let l = 0, d = n.length; l < d; ++l)
      a = n[l].controller.getMinMax(this, e), s || (i = Math.min(i, a.min)), o || (r = Math.max(r, a.max));
    return i = o && i > r ? r : i, r = s && i > r ? i : r, {
      min: De(i, De(r, i)),
      max: De(r, De(i, r))
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
  update(e, i, r) {
    const { beginAtZero: s, grace: o, ticks: a } = this.options, n = a.sampleSize;
    this.beforeUpdate(), this.maxWidth = e, this.maxHeight = i, this._margins = r = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, r), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + r.left + r.right : this.height + r.top + r.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = gu(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const l = n < this.ticks.length;
    this._convertTicksToLabels(l ? hn(this.ticks, n) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = Kg(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let e = this.options.reverse, i, r;
    this.isHorizontal() ? (i = this.left, r = this.right) : (i = this.top, r = this.bottom, e = !e), this._startPixel = i, this._endPixel = r, this._reversePixels = e, this._length = r - i, this._alignToPixels = this.options.alignToPixels;
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
    let r, s, o;
    for (r = 0, s = e.length; r < s; r++)
      o = e[r], o.label = se(i.callback, [
        o.value,
        r,
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
    const e = this.options, i = e.ticks, r = cn(this.ticks.length, e.ticks.maxTicksLimit), s = i.minRotation || 0, o = i.maxRotation;
    let a = s, n, l, d;
    if (!this._isVisible() || !i.display || s >= o || r <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const c = this._getLabelSizes(), h = c.widest.width, u = c.highest.height, g = pe(this.chart.width - h, 0, this.maxWidth);
    n = e.offset ? this.maxWidth / r : g / (r - 1), h + 6 > n && (n = g / (r - (e.offset ? 0.5 : 1)), l = this.maxHeight - Zt(e.grid) - i.padding - un(e.title, this.chart.options.font), d = Math.sqrt(h * h + u * u), a = Is(Math.min(Math.asin(pe((c.highest.height + 6) / n, -1, 1)), Math.asin(pe(l / d, -1, 1)) - Math.asin(pe(u / d, -1, 1)))), a = Math.max(s, Math.min(o, a))), this.labelRotation = a;
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
    }, { chart: i, options: { ticks: r, title: s, grid: o } } = this, a = this._isVisible(), n = this.isHorizontal();
    if (a) {
      const l = un(s, i.options.font);
      if (n ? (e.width = this.maxWidth, e.height = Zt(o) + l) : (e.height = this.maxHeight, e.width = Zt(o) + l), r.display && this.ticks.length) {
        const { first: d, last: c, widest: h, highest: u } = this._getLabelSizes(), g = r.padding * 2, f = He(this.labelRotation), _ = Math.cos(f), p = Math.sin(f);
        if (n) {
          const y = r.mirror ? 0 : p * h.width + _ * u.height;
          e.height = Math.min(this.maxHeight, e.height + y + g);
        } else {
          const y = r.mirror ? 0 : _ * h.width + p * u.height;
          e.width = Math.min(this.maxWidth, e.width + y + g);
        }
        this._calculatePadding(d, c, p, _);
      }
    }
    this._handleMargins(), n ? (this.width = this._length = i.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = i.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(e, i, r, s) {
    const { ticks: { align: o, padding: a }, position: n } = this.options, l = this.labelRotation !== 0, d = n !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const c = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let u = 0, g = 0;
      l ? d ? (u = s * e.width, g = r * i.height) : (u = r * e.height, g = s * i.width) : o === "start" ? g = i.width : o === "end" ? u = e.width : o !== "inner" && (u = e.width / 2, g = i.width / 2), this.paddingLeft = Math.max((u - c + a) * this.width / (this.width - c), 0), this.paddingRight = Math.max((g - h + a) * this.width / (this.width - h), 0);
    } else {
      let c = i.height / 2, h = e.height / 2;
      o === "start" ? (c = 0, h = e.height) : o === "end" && (c = i.height, h = 0), this.paddingTop = c + a, this.paddingBottom = h + a;
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
    let i, r;
    for (i = 0, r = e.length; i < r; i++)
      X(e[i].label) && (e.splice(i, 1), r--, i--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let e = this._labelSizes;
    if (!e) {
      const i = this.options.ticks.sampleSize;
      let r = this.ticks;
      i < r.length && (r = hn(r, i)), this._labelSizes = e = this._computeLabelSizes(r, r.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, i, r) {
    const { ctx: s, _longestTextCache: o } = this, a = [], n = [], l = Math.floor(i / cn(i, r));
    let d = 0, c = 0, h, u, g, f, _, p, y, v, x, L, k;
    for (h = 0; h < i; h += l) {
      if (f = e[h].label, _ = this._resolveTickFontOptions(h), s.font = p = _.string, y = o[p] = o[p] || {
        data: {},
        gc: []
      }, v = _.lineHeight, x = L = 0, !X(f) && !le(f))
        x = lr(s, y.data, y.gc, x, f), L = v;
      else if (le(f))
        for (u = 0, g = f.length; u < g; ++u)
          k = f[u], !X(k) && !le(k) && (x = lr(s, y.data, y.gc, x, k), L += v);
      a.push(x), n.push(L), d = Math.max(x, d), c = Math.max(L, c);
    }
    t_(o, i);
    const A = a.indexOf(d), P = n.indexOf(c), $ = (S) => ({
      width: a[S] || 0,
      height: n[S] || 0
    });
    return {
      first: $(0),
      last: $(i - 1),
      widest: $(A),
      highest: $(P),
      widths: a,
      heights: n
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
    return jh(this._alignToPixels ? pt(this.chart, i, 0) : i);
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
      const r = i[e];
      return r.$context || (r.$context = r_(this.getContext(), e, r));
    }
    return this.$context || (this.$context = i_(this.chart.getContext(), this));
  }
  _tickSize() {
    const e = this.options.ticks, i = He(this.labelRotation), r = Math.abs(Math.cos(i)), s = Math.abs(Math.sin(i)), o = this._getLabelSizes(), a = e.autoSkipPadding || 0, n = o ? o.widest.width + a : 0, l = o ? o.highest.height + a : 0;
    return this.isHorizontal() ? l * r > n * s ? n / r : l / s : l * s < n * r ? l / r : n / s;
  }
  _isVisible() {
    const e = this.options.display;
    return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(e) {
    const i = this.axis, r = this.chart, s = this.options, { grid: o, position: a, border: n } = s, l = o.offset, d = this.isHorizontal(), h = this.ticks.length + (l ? 1 : 0), u = Zt(o), g = [], f = n.setContext(this.getContext()), _ = f.display ? f.width : 0, p = _ / 2, y = function(z) {
      return pt(r, z, _);
    };
    let v, x, L, k, A, P, $, S, w, C, m, E;
    if (a === "top")
      v = y(this.bottom), P = this.bottom - u, S = v - p, C = y(e.top) + p, E = e.bottom;
    else if (a === "bottom")
      v = y(this.top), C = e.top, E = y(e.bottom) - p, P = v + p, S = this.top + u;
    else if (a === "left")
      v = y(this.right), A = this.right - u, $ = v - p, w = y(e.left) + p, m = e.right;
    else if (a === "right")
      v = y(this.left), w = e.left, m = y(e.right) - p, A = v + p, $ = this.left + u;
    else if (i === "x") {
      if (a === "center")
        v = y((e.top + e.bottom) / 2 + 0.5);
      else if (Z(a)) {
        const z = Object.keys(a)[0], O = a[z];
        v = y(this.chart.scales[z].getPixelForValue(O));
      }
      C = e.top, E = e.bottom, P = v + p, S = P + u;
    } else if (i === "y") {
      if (a === "center")
        v = y((e.left + e.right) / 2);
      else if (Z(a)) {
        const z = Object.keys(a)[0], O = a[z];
        v = y(this.chart.scales[z].getPixelForValue(O));
      }
      A = v - p, $ = A - u, w = e.left, m = e.right;
    }
    const M = W(s.ticks.maxTicksLimit, h), R = Math.max(1, Math.ceil(h / M));
    for (x = 0; x < h; x += R) {
      const z = this.getContext(x), O = o.setContext(z), b = n.setContext(z), T = O.lineWidth, D = O.color, N = b.dash || [], H = b.dashOffset, V = O.tickWidth, F = O.tickColor, G = O.tickBorderDash || [], K = O.tickBorderDashOffset;
      L = e_(this, x, l), L !== void 0 && (k = pt(r, L, T), d ? A = $ = w = m = k : P = S = C = E = k, g.push({
        tx1: A,
        ty1: P,
        tx2: $,
        ty2: S,
        x1: w,
        y1: C,
        x2: m,
        y2: E,
        width: T,
        color: D,
        borderDash: N,
        borderDashOffset: H,
        tickWidth: V,
        tickColor: F,
        tickBorderDash: G,
        tickBorderDashOffset: K
      }));
    }
    return this._ticksLength = h, this._borderValue = v, g;
  }
  _computeLabelItems(e) {
    const i = this.axis, r = this.options, { position: s, ticks: o } = r, a = this.isHorizontal(), n = this.ticks, { align: l, crossAlign: d, padding: c, mirror: h } = o, u = Zt(r.grid), g = u + c, f = h ? -c : g, _ = -He(this.labelRotation), p = [];
    let y, v, x, L, k, A, P, $, S, w, C, m, E = "middle";
    if (s === "top")
      A = this.bottom - f, P = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      A = this.top + f, P = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const R = this._getYAxisLabelAlignment(u);
      P = R.textAlign, k = R.x;
    } else if (s === "right") {
      const R = this._getYAxisLabelAlignment(u);
      P = R.textAlign, k = R.x;
    } else if (i === "x") {
      if (s === "center")
        A = (e.top + e.bottom) / 2 + g;
      else if (Z(s)) {
        const R = Object.keys(s)[0], z = s[R];
        A = this.chart.scales[R].getPixelForValue(z) + g;
      }
      P = this._getXAxisLabelAlignment();
    } else if (i === "y") {
      if (s === "center")
        k = (e.left + e.right) / 2 - g;
      else if (Z(s)) {
        const R = Object.keys(s)[0], z = s[R];
        k = this.chart.scales[R].getPixelForValue(z);
      }
      P = this._getYAxisLabelAlignment(u).textAlign;
    }
    i === "y" && (l === "start" ? E = "top" : l === "end" && (E = "bottom"));
    const M = this._getLabelSizes();
    for (y = 0, v = n.length; y < v; ++y) {
      x = n[y], L = x.label;
      const R = o.setContext(this.getContext(y));
      $ = this.getPixelForTick(y) + o.labelOffset, S = this._resolveTickFontOptions(y), w = S.lineHeight, C = le(L) ? L.length : 1;
      const z = C / 2, O = R.color, b = R.textStrokeColor, T = R.textStrokeWidth;
      let D = P;
      a ? (k = $, P === "inner" && (y === v - 1 ? D = this.options.reverse ? "left" : "right" : y === 0 ? D = this.options.reverse ? "right" : "left" : D = "center"), s === "top" ? d === "near" || _ !== 0 ? m = -C * w + w / 2 : d === "center" ? m = -M.highest.height / 2 - z * w + w : m = -M.highest.height + w / 2 : d === "near" || _ !== 0 ? m = w / 2 : d === "center" ? m = M.highest.height / 2 - z * w : m = M.highest.height - C * w, h && (m *= -1), _ !== 0 && !R.showLabelBackdrop && (k += w / 2 * Math.sin(_))) : (A = $, m = (1 - C) * w / 2);
      let N;
      if (R.showLabelBackdrop) {
        const H = xe(R.backdropPadding), V = M.heights[y], F = M.widths[y];
        let G = m - H.top, K = 0 - H.left;
        switch (E) {
          case "middle":
            G -= V / 2;
            break;
          case "bottom":
            G -= V;
            break;
        }
        switch (P) {
          case "center":
            K -= F / 2;
            break;
          case "right":
            K -= F;
            break;
          case "inner":
            y === v - 1 ? K -= F : y > 0 && (K -= F / 2);
            break;
        }
        N = {
          left: K,
          top: G,
          width: F + H.width,
          height: V + H.height,
          color: R.backdropColor
        };
      }
      p.push({
        label: L,
        font: S,
        textOffset: m,
        options: {
          rotation: _,
          color: O,
          strokeColor: b,
          strokeWidth: T,
          textAlign: D,
          textBaseline: E,
          translation: [
            k,
            A
          ],
          backdrop: N
        }
      });
    }
    return p;
  }
  _getXAxisLabelAlignment() {
    const { position: e, ticks: i } = this.options;
    if (-He(this.labelRotation))
      return e === "top" ? "left" : "right";
    let s = "center";
    return i.align === "start" ? s = "left" : i.align === "end" ? s = "right" : i.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(e) {
    const { position: i, ticks: { crossAlign: r, mirror: s, padding: o } } = this.options, a = this._getLabelSizes(), n = e + o, l = a.widest.width;
    let d, c;
    return i === "left" ? s ? (c = this.right + o, r === "near" ? d = "left" : r === "center" ? (d = "center", c += l / 2) : (d = "right", c += l)) : (c = this.right - n, r === "near" ? d = "right" : r === "center" ? (d = "center", c -= l / 2) : (d = "left", c = this.left)) : i === "right" ? s ? (c = this.left + o, r === "near" ? d = "right" : r === "center" ? (d = "center", c -= l / 2) : (d = "left", c -= l)) : (c = this.left + n, r === "near" ? d = "left" : r === "center" ? (d = "center", c += l / 2) : (d = "right", c = this.right)) : d = "right", {
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
    const { ctx: e, options: { backgroundColor: i }, left: r, top: s, width: o, height: a } = this;
    i && (e.save(), e.fillStyle = i, e.fillRect(r, s, o, a), e.restore());
  }
  getLineWidthForValue(e) {
    const i = this.options.grid;
    if (!this._isVisible() || !i.display)
      return 0;
    const s = this.ticks.findIndex((o) => o.value === e);
    return s >= 0 ? i.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(e) {
    const i = this.options.grid, r = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(e));
    let o, a;
    const n = (l, d, c) => {
      !c.width || !c.color || (r.save(), r.lineWidth = c.width, r.strokeStyle = c.color, r.setLineDash(c.borderDash || []), r.lineDashOffset = c.borderDashOffset, r.beginPath(), r.moveTo(l.x, l.y), r.lineTo(d.x, d.y), r.stroke(), r.restore());
    };
    if (i.display)
      for (o = 0, a = s.length; o < a; ++o) {
        const l = s[o];
        i.drawOnChartArea && n({
          x: l.x1,
          y: l.y1
        }, {
          x: l.x2,
          y: l.y2
        }, l), i.drawTicks && n({
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
    const { chart: e, ctx: i, options: { border: r, grid: s } } = this, o = r.setContext(this.getContext()), a = r.display ? o.width : 0;
    if (!a)
      return;
    const n = s.setContext(this.getContext(0)).lineWidth, l = this._borderValue;
    let d, c, h, u;
    this.isHorizontal() ? (d = pt(e, this.left, a) - a / 2, c = pt(e, this.right, n) + n / 2, h = u = l) : (h = pt(e, this.top, a) - a / 2, u = pt(e, this.bottom, n) + n / 2, d = c = l), i.save(), i.lineWidth = o.width, i.strokeStyle = o.color, i.beginPath(), i.moveTo(d, h), i.lineTo(c, u), i.stroke(), i.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const r = this.ctx, s = this._computeLabelArea();
    s && mr(r, s);
    const o = this.getLabelItems(e);
    for (const a of o) {
      const n = a.options, l = a.font, d = a.label, c = a.textOffset;
      Pt(r, d, 0, c, l, n);
    }
    s && yr(r);
  }
  drawTitle() {
    const { ctx: e, options: { position: i, title: r, reverse: s } } = this;
    if (!r.display)
      return;
    const o = fe(r.font), a = xe(r.padding), n = r.align;
    let l = o.lineHeight / 2;
    i === "bottom" || i === "center" || Z(i) ? (l += a.bottom, le(r.text) && (l += o.lineHeight * (r.text.length - 1))) : l += a.top;
    const { titleX: d, titleY: c, maxWidth: h, rotation: u } = o_(this, l, i, n);
    Pt(e, r.text, 0, 0, o, {
      color: r.color,
      maxWidth: h,
      rotation: u,
      textAlign: s_(n, i, s),
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
    const e = this.options, i = e.ticks && e.ticks.z || 0, r = W(e.grid && e.grid.z, -1), s = W(e.border && e.border.z, 0);
    return !this._isVisible() || this.draw !== Mt.prototype.draw ? [
      {
        z: i,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: r,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: i,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(e) {
    const i = this.chart.getSortedVisibleDatasetMetas(), r = this.axis + "AxisID", s = [];
    let o, a;
    for (o = 0, a = i.length; o < a; ++o) {
      const n = i[o];
      n[r] === this.id && (!e || n.type === e) && s.push(n);
    }
    return s;
  }
  _resolveTickFontOptions(e) {
    const i = this.options.ticks.setContext(this.getContext(e));
    return fe(i.font);
  }
  _maxDigits() {
    const e = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / e;
  }
}
class Bi {
  constructor(e, i, r) {
    this.type = e, this.scope = i, this.override = r, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const i = Object.getPrototypeOf(e);
    let r;
    l_(i) && (r = this.register(i));
    const s = this.items, o = e.id, a = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + e);
    return o in s || (s[o] = e, n_(e, a, r), this.override && de.override(e.id, e.overrides)), a;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const i = this.items, r = e.id, s = this.scope;
    r in i && delete i[r], s && r in de[s] && (delete de[s][r], this.override && delete Et[r]);
  }
}
function n_(t, e, i) {
  const r = pi(/* @__PURE__ */ Object.create(null), [
    i ? de.get(i) : {},
    de.get(e),
    t.defaults
  ]);
  de.set(e, r), t.defaultRoutes && a_(e, t.defaultRoutes), t.descriptors && de.describe(e, t.descriptors);
}
function a_(t, e) {
  Object.keys(e).forEach((i) => {
    const r = i.split("."), s = r.pop(), o = [
      t
    ].concat(r).join("."), a = e[i].split("."), n = a.pop(), l = a.join(".");
    de.route(o, s, l, n);
  });
}
function l_(t) {
  return "id" in t && "defaults" in t;
}
class d_ {
  constructor() {
    this.controllers = new Bi(Fe, "datasets", !0), this.elements = new Bi(je, "elements"), this.plugins = new Bi(Object, "plugins"), this.scales = new Bi(Mt, "scales"), this._typedRegistries = [
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
  _each(e, i, r) {
    [
      ...i
    ].forEach((s) => {
      const o = r || this._getRegistryForType(s);
      r || o.isForType(s) || o === this.plugins && s.id ? this._exec(e, o, s) : re(s, (a) => {
        const n = r || this._getRegistryForType(a);
        this._exec(e, n, a);
      });
    });
  }
  _exec(e, i, r) {
    const s = Rs(e);
    se(r["before" + s], [], r), i[e](r), se(r["after" + s], [], r);
  }
  _getRegistryForType(e) {
    for (let i = 0; i < this._typedRegistries.length; i++) {
      const r = this._typedRegistries[i];
      if (r.isForType(e))
        return r;
    }
    return this.plugins;
  }
  _get(e, i, r) {
    const s = i.get(e);
    if (s === void 0)
      throw new Error('"' + e + '" is not a registered ' + r + ".");
    return s;
  }
}
var Ue = /* @__PURE__ */ new d_();
class c_ {
  constructor() {
    this._init = [];
  }
  notify(e, i, r, s) {
    i === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install"));
    const o = s ? this._descriptors(e).filter(s) : this._descriptors(e), a = this._notify(o, e, i, r);
    return i === "afterDestroy" && (this._notify(o, e, "stop"), this._notify(this._init, e, "uninstall")), a;
  }
  _notify(e, i, r, s) {
    s = s || {};
    for (const o of e) {
      const a = o.plugin, n = a[r], l = [
        i,
        s,
        o.options
      ];
      if (se(n, l, a) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    X(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(e) {
    if (this._cache)
      return this._cache;
    const i = this._cache = this._createDescriptors(e);
    return this._notifyStateChanges(e), i;
  }
  _createDescriptors(e, i) {
    const r = e && e.config, s = W(r.options && r.options.plugins, {}), o = h_(r);
    return s === !1 && !i ? [] : g_(e, o, s, i);
  }
  _notifyStateChanges(e) {
    const i = this._oldCache || [], r = this._cache, s = (o, a) => o.filter((n) => !a.some((l) => n.plugin.id === l.plugin.id));
    this._notify(s(i, r), e, "stop"), this._notify(s(r, i), e, "start");
  }
}
function h_(t) {
  const e = {}, i = [], r = Object.keys(Ue.plugins.items);
  for (let o = 0; o < r.length; o++)
    i.push(Ue.getPlugin(r[o]));
  const s = t.plugins || [];
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    i.indexOf(a) === -1 && (i.push(a), e[a.id] = !0);
  }
  return {
    plugins: i,
    localIds: e
  };
}
function u_(t, e) {
  return !e && t === !1 ? null : t === !0 ? {} : t;
}
function g_(t, { plugins: e, localIds: i }, r, s) {
  const o = [], a = t.getContext();
  for (const n of e) {
    const l = n.id, d = u_(r[l], s);
    d !== null && o.push({
      plugin: n,
      options: __(t.config, {
        plugin: n,
        local: i[l]
      }, d, a)
    });
  }
  return o;
}
function __(t, { plugin: e, local: i }, r, s) {
  const o = t.pluginScopeKeys(e), a = t.getOptionScopes(r, o);
  return i && e.defaults && a.push(e.defaults), t.createResolver(a, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function vs(t, e) {
  const i = de.datasets[t] || {};
  return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || i.indexAxis || "x";
}
function f_(t, e) {
  let i = t;
  return t === "_index_" ? i = e : t === "_value_" && (i = e === "x" ? "y" : "x"), i;
}
function p_(t, e) {
  return t === e ? "_index_" : "_value_";
}
function gn(t) {
  if (t === "x" || t === "y" || t === "r")
    return t;
}
function m_(t) {
  if (t === "top" || t === "bottom")
    return "x";
  if (t === "left" || t === "right")
    return "y";
}
function bs(t, ...e) {
  if (gn(t))
    return t;
  for (const i of e) {
    const r = i.axis || m_(i.position) || t.length > 1 && gn(t[0].toLowerCase());
    if (r)
      return r;
  }
  throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`);
}
function _n(t, e, i) {
  if (i[e + "AxisID"] === t)
    return {
      axis: e
    };
}
function y_(t, e) {
  if (e.data && e.data.datasets) {
    const i = e.data.datasets.filter((r) => r.xAxisID === t || r.yAxisID === t);
    if (i.length)
      return _n(t, "x", i[0]) || _n(t, "y", i[0]);
  }
  return {};
}
function v_(t, e) {
  const i = Et[t.type] || {
    scales: {}
  }, r = e.scales || {}, s = vs(t.type, e), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(r).forEach((a) => {
    const n = r[a];
    if (!Z(n))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (n._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const l = bs(a, n, y_(a, t), de.scales[n.type]), d = p_(l, s), c = i.scales || {};
    o[a] = ni(/* @__PURE__ */ Object.create(null), [
      {
        axis: l
      },
      n,
      c[l],
      c[d]
    ]);
  }), t.data.datasets.forEach((a) => {
    const n = a.type || t.type, l = a.indexAxis || vs(n, e), c = (Et[n] || {}).scales || {};
    Object.keys(c).forEach((h) => {
      const u = f_(h, l), g = a[u + "AxisID"] || u;
      o[g] = o[g] || /* @__PURE__ */ Object.create(null), ni(o[g], [
        {
          axis: u
        },
        r[g],
        c[h]
      ]);
    });
  }), Object.keys(o).forEach((a) => {
    const n = o[a];
    ni(n, [
      de.scales[n.type],
      de.scale
    ]);
  }), o;
}
function ll(t) {
  const e = t.options || (t.options = {});
  e.plugins = W(e.plugins, {}), e.scales = v_(t, e);
}
function dl(t) {
  return t = t || {}, t.datasets = t.datasets || [], t.labels = t.labels || [], t;
}
function b_(t) {
  return t = t || {}, t.data = dl(t.data), ll(t), t;
}
const fn = /* @__PURE__ */ new Map(), cl = /* @__PURE__ */ new Set();
function Hi(t, e) {
  let i = fn.get(t);
  return i || (i = e(), fn.set(t, i), cl.add(i)), i;
}
const qt = (t, e, i) => {
  const r = dt(e, i);
  r !== void 0 && t.add(r);
};
class x_ {
  constructor(e) {
    this._config = b_(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = dl(e);
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
    this.clearCache(), ll(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return Hi(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, i) {
    return Hi(`${e}.transition.${i}`, () => [
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
    return Hi(`${e}-${i}`, () => [
      [
        `datasets.${e}.elements.${i}`,
        `datasets.${e}`,
        `elements.${i}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(e) {
    const i = e.id, r = this.type;
    return Hi(`${r}-plugin-${i}`, () => [
      [
        `plugins.${i}`,
        ...e.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(e, i) {
    const r = this._scopeCache;
    let s = r.get(e);
    return (!s || i) && (s = /* @__PURE__ */ new Map(), r.set(e, s)), s;
  }
  getOptionScopes(e, i, r) {
    const { options: s, type: o } = this, a = this._cachedScopes(e, r), n = a.get(i);
    if (n)
      return n;
    const l = /* @__PURE__ */ new Set();
    i.forEach((c) => {
      e && (l.add(e), c.forEach((h) => qt(l, e, h))), c.forEach((h) => qt(l, s, h)), c.forEach((h) => qt(l, Et[o] || {}, h)), c.forEach((h) => qt(l, de, h)), c.forEach((h) => qt(l, ps, h));
    });
    const d = Array.from(l);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), cl.has(i) && a.set(i, d), d;
  }
  chartOptionScopes() {
    const { options: e, type: i } = this;
    return [
      e,
      Et[i] || {},
      de.datasets[i] || {},
      {
        type: i
      },
      de,
      ps
    ];
  }
  resolveNamedOptions(e, i, r, s = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: a, subPrefixes: n } = pn(this._resolverCache, e, s);
    let l = a;
    if (k_(a, i)) {
      o.$shared = !1, r = ct(r) ? r() : r;
      const d = this.createResolver(e, r, n);
      l = Ft(a, r, d);
    }
    for (const d of i)
      o[d] = l[d];
    return o;
  }
  createResolver(e, i, r = [
    ""
  ], s) {
    const { resolver: o } = pn(this._resolverCache, e, r);
    return Z(i) ? Ft(o, i, void 0, s) : o;
  }
}
function pn(t, e, i) {
  let r = t.get(e);
  r || (r = /* @__PURE__ */ new Map(), t.set(e, r));
  const s = i.join();
  let o = r.get(s);
  return o || (o = {
    resolver: js(e, i),
    subPrefixes: i.filter((n) => !n.toLowerCase().includes("hover"))
  }, r.set(s, o)), o;
}
const w_ = (t) => Z(t) && Object.getOwnPropertyNames(t).some((e) => ct(t[e]));
function k_(t, e) {
  const { isScriptable: i, isIndexable: r } = ja(t);
  for (const s of e) {
    const o = i(s), a = r(s), n = (a || o) && t[s];
    if (o && (ct(n) || w_(n)) || a && le(n))
      return !0;
  }
  return !1;
}
var S_ = "4.5.0";
const A_ = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function mn(t, e) {
  return t === "top" || t === "bottom" || A_.indexOf(t) === -1 && e === "x";
}
function yn(t, e) {
  return function(i, r) {
    return i[t] === r[t] ? i[e] - r[e] : i[t] - r[t];
  };
}
function vn(t) {
  const e = t.chart, i = e.options.animation;
  e.notifyPlugins("afterRender"), se(i && i.onComplete, [
    t
  ], e);
}
function C_(t) {
  const e = t.chart, i = e.options.animation;
  se(i && i.onProgress, [
    t
  ], e);
}
function hl(t) {
  return Vs() && typeof t == "string" ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t;
}
const Qi = {}, bn = (t) => {
  const e = hl(t);
  return Object.values(Qi).filter((i) => i.canvas === e).pop();
};
function E_(t, e, i) {
  const r = Object.keys(t);
  for (const s of r) {
    const o = +s;
    if (o >= e) {
      const a = t[s];
      delete t[s], (i > 0 || o > e) && (t[o + i] = a);
    }
  }
}
function P_(t, e, i, r) {
  return !i || t.type === "mouseout" ? null : r ? e : t;
}
class Ve {
  static register(...e) {
    Ue.add(...e), xn();
  }
  static unregister(...e) {
    Ue.remove(...e), xn();
  }
  constructor(e, i) {
    const r = this.config = new x_(i), s = hl(e), o = bn(s);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const a = r.createResolver(r.chartOptionScopes(), this.getContext());
    this.platform = new (r.platform || Wg(s))(), this.platform.updateConfig(r);
    const n = this.platform.acquireContext(s, a.aspectRatio), l = n && n.canvas, d = l && l.height, c = l && l.width;
    if (this.id = Mh(), this.ctx = n, this.canvas = l, this.width = c, this.height = d, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new c_(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Wh((h) => this.update(h), a.resizeDelay || 0), this._dataChanges = [], Qi[this.id] = this, !n || !l) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Xe.listen(this, "complete", vn), Xe.listen(this, "progress", C_), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: e, maintainAspectRatio: i }, width: r, height: s, _aspectRatio: o } = this;
    return X(e) ? i && o ? o : s ? r / s : null : e;
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
    return Ue;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : jo(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Bo(this.canvas, this.ctx), this;
  }
  stop() {
    return Xe.stop(this), this;
  }
  resize(e, i) {
    Xe.running(this) ? this._resizeBeforeDraw = {
      width: e,
      height: i
    } : this._resize(e, i);
  }
  _resize(e, i) {
    const r = this.options, s = this.canvas, o = r.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(s, e, i, o), n = r.devicePixelRatio || this.platform.getDevicePixelRatio(), l = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, jo(this, n, !0) && (this.notifyPlugins("resize", {
      size: a
    }), se(r.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(l) && this.render());
  }
  ensureScalesHaveIDs() {
    const i = this.options.scales || {};
    re(i, (r, s) => {
      r.id = s;
    });
  }
  buildOrUpdateScales() {
    const e = this.options, i = e.scales, r = this.scales, s = Object.keys(r).reduce((a, n) => (a[n] = !1, a), {});
    let o = [];
    i && (o = o.concat(Object.keys(i).map((a) => {
      const n = i[a], l = bs(a, n), d = l === "r", c = l === "x";
      return {
        options: n,
        dposition: d ? "chartArea" : c ? "bottom" : "left",
        dtype: d ? "radialLinear" : c ? "category" : "linear"
      };
    }))), re(o, (a) => {
      const n = a.options, l = n.id, d = bs(l, n), c = W(n.type, a.dtype);
      (n.position === void 0 || mn(n.position, d) !== mn(a.dposition)) && (n.position = a.dposition), s[l] = !0;
      let h = null;
      if (l in r && r[l].type === c)
        h = r[l];
      else {
        const u = Ue.getScale(c);
        h = new u({
          id: l,
          type: c,
          ctx: this.ctx,
          chart: this
        }), r[h.id] = h;
      }
      h.init(n, e);
    }), re(s, (a, n) => {
      a || delete r[n];
    }), re(r, (a) => {
      be.configure(this, a, a.options), be.addBox(this, a);
    });
  }
  _updateMetasets() {
    const e = this._metasets, i = this.data.datasets.length, r = e.length;
    if (e.sort((s, o) => s.index - o.index), r > i) {
      for (let s = i; s < r; ++s)
        this._destroyDatasetMeta(s);
      e.splice(i, r - i);
    }
    this._sortedMetasets = e.slice(0).sort(yn("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: e, data: { datasets: i } } = this;
    e.length > i.length && delete this._stacks, e.forEach((r, s) => {
      i.filter((o) => o === r._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const e = [], i = this.data.datasets;
    let r, s;
    for (this._removeUnreferencedMetasets(), r = 0, s = i.length; r < s; r++) {
      const o = i[r];
      let a = this.getDatasetMeta(r);
      const n = o.type || this.config.type;
      if (a.type && a.type !== n && (this._destroyDatasetMeta(r), a = this.getDatasetMeta(r)), a.type = n, a.indexAxis = o.indexAxis || vs(n, this.options), a.order = o.order || 0, a.index = r, a.label = "" + o.label, a.visible = this.isDatasetVisible(r), a.controller)
        a.controller.updateIndex(r), a.controller.linkScales();
      else {
        const l = Ue.getController(n), { datasetElementType: d, dataElementType: c } = de.datasets[n];
        Object.assign(l, {
          dataElementType: Ue.getElement(c),
          datasetElementType: d && Ue.getElement(d)
        }), a.controller = new l(this, r), e.push(a.controller);
      }
    }
    return this._updateMetasets(), e;
  }
  _resetElements() {
    re(this.data.datasets, (e, i) => {
      this.getDatasetMeta(i).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(e) {
    const i = this.config;
    i.update();
    const r = this._options = i.createResolver(i.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !r.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: e,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let a = 0;
    for (let d = 0, c = this.data.datasets.length; d < c; d++) {
      const { controller: h } = this.getDatasetMeta(d), u = !s && o.indexOf(h) === -1;
      h.buildOrUpdateElements(u), a = Math.max(+h.getMaxOverflow(), a);
    }
    a = this._minPadding = r.layout.autoPadding ? a : 0, this._updateLayout(a), s || re(o, (d) => {
      d.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(yn("z", "_idx"));
    const { _active: n, _lastEvent: l } = this;
    l ? this._eventHandler(l, !0) : n.length && this._updateHoverStyles(n, n, !0), this.render();
  }
  _updateScales() {
    re(this.scales, (e) => {
      be.removeBox(this, e);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const e = this.options, i = new Set(Object.keys(this._listeners)), r = new Set(e.events);
    (!$o(i, r) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, i = this._getUniformDataChanges() || [];
    for (const { method: r, start: s, count: o } of i) {
      const a = r === "_removeElements" ? -o : o;
      E_(e, s, a);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const i = this.data.datasets.length, r = (o) => new Set(e.filter((a) => a[0] === o).map((a, n) => n + "," + a.splice(1).join(","))), s = r(0);
    for (let o = 1; o < i; o++)
      if (!$o(s, r(o)))
        return;
    return Array.from(s).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(e) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    be.update(this, this.width, this.height, e);
    const i = this.chartArea, r = i.width <= 0 || i.height <= 0;
    this._layers = [], re(this.boxes, (s) => {
      r && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, o) => {
      s._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(e) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: e,
      cancelable: !0
    }) !== !1) {
      for (let i = 0, r = this.data.datasets.length; i < r; ++i)
        this.getDatasetMeta(i).controller.configure();
      for (let i = 0, r = this.data.datasets.length; i < r; ++i)
        this._updateDataset(i, ct(e) ? e({
          datasetIndex: i
        }) : e);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: e
      });
    }
  }
  _updateDataset(e, i) {
    const r = this.getDatasetMeta(e), s = {
      meta: r,
      index: e,
      mode: i,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (r.controller._update(i), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Xe.has(this) ? this.attached && !Xe.running(this) && Xe.start(this) : (this.draw(), vn({
      chart: this
    })));
  }
  draw() {
    let e;
    if (this._resizeBeforeDraw) {
      const { width: r, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(r, s);
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
    const i = this._sortedMetasets, r = [];
    let s, o;
    for (s = 0, o = i.length; s < o; ++s) {
      const a = i[s];
      (!e || a.visible) && r.push(a);
    }
    return r;
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
    const i = this.ctx, r = {
      meta: e,
      index: e.index,
      cancelable: !0
    }, s = Qa(this, e);
    this.notifyPlugins("beforeDatasetDraw", r) !== !1 && (s && mr(i, s), e.controller.draw(), s && yr(i), r.cancelable = !1, this.notifyPlugins("afterDatasetDraw", r));
  }
  isPointInArea(e) {
    return et(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, i, r, s) {
    const o = Ag.modes[i];
    return typeof o == "function" ? o(this, e, r, s) : [];
  }
  getDatasetMeta(e) {
    const i = this.data.datasets[e], r = this._metasets;
    let s = r.filter((o) => o && o._dataset === i).pop();
    return s || (s = {
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
    }, r.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = ht(null, {
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
    const r = this.getDatasetMeta(e);
    return typeof r.hidden == "boolean" ? !r.hidden : !i.hidden;
  }
  setDatasetVisibility(e, i) {
    const r = this.getDatasetMeta(e);
    r.hidden = !i;
  }
  toggleDataVisibility(e) {
    this._hiddenIndices[e] = !this._hiddenIndices[e];
  }
  getDataVisibility(e) {
    return !this._hiddenIndices[e];
  }
  _updateVisibility(e, i, r) {
    const s = r ? "show" : "hide", o = this.getDatasetMeta(e), a = o.controller._resolveAnimations(void 0, s);
    mi(i) ? (o.data[i].hidden = !r, this.update()) : (this.setDatasetVisibility(e, r), a.update(o, {
      visible: r
    }), this.update((n) => n.datasetIndex === e ? s : void 0));
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
    for (this.stop(), Xe.remove(this), e = 0, i = this.data.datasets.length; e < i; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: e, ctx: i } = this;
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), Bo(e, i), this.platform.releaseContext(i), this.canvas = null, this.ctx = null), delete Qi[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...e) {
    return this.canvas.toDataURL(...e);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const e = this._listeners, i = this.platform, r = (o, a) => {
      i.addEventListener(this, o, a), e[o] = a;
    }, s = (o, a, n) => {
      o.offsetX = a, o.offsetY = n, this._eventHandler(o);
    };
    re(this.options.events, (o) => r(o, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const e = this._responsiveListeners, i = this.platform, r = (l, d) => {
      i.addEventListener(this, l, d), e[l] = d;
    }, s = (l, d) => {
      e[l] && (i.removeEventListener(this, l, d), delete e[l]);
    }, o = (l, d) => {
      this.canvas && this.resize(l, d);
    };
    let a;
    const n = () => {
      s("attach", n), this.attached = !0, this.resize(), r("resize", o), r("detach", a);
    };
    a = () => {
      this.attached = !1, s("resize", o), this._stop(), this._resize(0, 0), r("attach", n);
    }, i.isAttached(this.canvas) ? n() : a();
  }
  unbindEvents() {
    re(this._listeners, (e, i) => {
      this.platform.removeEventListener(this, i, e);
    }), this._listeners = {}, re(this._responsiveListeners, (e, i) => {
      this.platform.removeEventListener(this, i, e);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(e, i, r) {
    const s = r ? "set" : "remove";
    let o, a, n, l;
    for (i === "dataset" && (o = this.getDatasetMeta(e[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), n = 0, l = e.length; n < l; ++n) {
      a = e[n];
      const d = a && this.getDatasetMeta(a.datasetIndex).controller;
      d && d[s + "HoverStyle"](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e) {
    const i = this._active || [], r = e.map(({ datasetIndex: o, index: a }) => {
      const n = this.getDatasetMeta(o);
      if (!n)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: n.data[a],
        index: a
      };
    });
    !or(r, i) && (this._active = r, this._lastEvent = null, this._updateHoverStyles(r, i));
  }
  notifyPlugins(e, i, r) {
    return this._plugins.notify(this, e, i, r);
  }
  isPluginEnabled(e) {
    return this._plugins._cache.filter((i) => i.plugin.id === e).length === 1;
  }
  _updateHoverStyles(e, i, r) {
    const s = this.options.hover, o = (l, d) => l.filter((c) => !d.some((h) => c.datasetIndex === h.datasetIndex && c.index === h.index)), a = o(i, e), n = r ? e : o(e, i);
    a.length && this.updateHoverStyle(a, s.mode, !1), n.length && s.mode && this.updateHoverStyle(n, s.mode, !0);
  }
  _eventHandler(e, i) {
    const r = {
      event: e,
      replay: i,
      cancelable: !0,
      inChartArea: this.isPointInArea(e)
    }, s = (a) => (a.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", r, s) === !1)
      return;
    const o = this._handleEvent(e, i, r.inChartArea);
    return r.cancelable = !1, this.notifyPlugins("afterEvent", r, s), (o || r.changed) && this.render(), this;
  }
  _handleEvent(e, i, r) {
    const { _active: s = [], options: o } = this, a = i, n = this._getActiveElements(e, s, r, a), l = Oh(e), d = P_(e, this._lastEvent, r, l);
    r && (this._lastEvent = null, se(o.onHover, [
      e,
      n,
      this
    ], this), l && se(o.onClick, [
      e,
      n,
      this
    ], this));
    const c = !or(n, s);
    return (c || i) && (this._active = n, this._updateHoverStyles(n, s, i)), this._lastEvent = d, c;
  }
  _getActiveElements(e, i, r, s) {
    if (e.type === "mouseout")
      return [];
    if (!r)
      return i;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(e, o.mode, o, s);
  }
}
I(Ve, "defaults", de), I(Ve, "instances", Qi), I(Ve, "overrides", Et), I(Ve, "registry", Ue), I(Ve, "version", S_), I(Ve, "getChart", bn);
function xn() {
  return re(Ve.instances, (t) => t._plugins.invalidate());
}
function M_(t, e, i) {
  const { startAngle: r, x: s, y: o, outerRadius: a, innerRadius: n, options: l } = e, { borderWidth: d, borderJoinStyle: c } = l, h = Math.min(d / a, ve(r - i));
  if (t.beginPath(), t.arc(s, o, a - d / 2, r + h / 2, i - h / 2), n > 0) {
    const u = Math.min(d / n, ve(r - i));
    t.arc(s, o, n + d / 2, i - u / 2, r + u / 2, !0);
  } else {
    const u = Math.min(d / 2, a * ve(r - i));
    if (c === "round")
      t.arc(s, o, u, i - ee / 2, r + ee / 2, !0);
    else if (c === "bevel") {
      const g = 2 * u * u, f = -g * Math.cos(i + ee / 2) + s, _ = -g * Math.sin(i + ee / 2) + o, p = g * Math.cos(r + ee / 2) + s, y = g * Math.sin(r + ee / 2) + o;
      t.lineTo(f, _), t.lineTo(p, y);
    }
  }
  t.closePath(), t.moveTo(0, 0), t.rect(0, 0, t.canvas.width, t.canvas.height), t.clip("evenodd");
}
function $_(t, e, i) {
  const { startAngle: r, pixelMargin: s, x: o, y: a, outerRadius: n, innerRadius: l } = e;
  let d = s / n;
  t.beginPath(), t.arc(o, a, n, r - d, i + d), l > s ? (d = s / l, t.arc(o, a, l, i + d, r - d, !0)) : t.arc(o, a, s, i + ge, r - ge), t.closePath(), t.clip();
}
function L_(t) {
  return Fs(t, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function D_(t, e, i, r) {
  const s = L_(t.options.borderRadius), o = (i - e) / 2, a = Math.min(o, r * e / 2), n = (l) => {
    const d = (i - Math.min(o, l)) * r / 2;
    return pe(l, 0, Math.min(o, d));
  };
  return {
    outerStart: n(s.outerStart),
    outerEnd: n(s.outerEnd),
    innerStart: pe(s.innerStart, 0, a),
    innerEnd: pe(s.innerEnd, 0, a)
  };
}
function Lt(t, e, i, r) {
  return {
    x: i + t * Math.cos(e),
    y: r + t * Math.sin(e)
  };
}
function hr(t, e, i, r, s, o) {
  const { x: a, y: n, startAngle: l, pixelMargin: d, innerRadius: c } = e, h = Math.max(e.outerRadius + r + i - d, 0), u = c > 0 ? c + r + i + d : 0;
  let g = 0;
  const f = s - l;
  if (r) {
    const R = c > 0 ? c - r : 0, z = h > 0 ? h - r : 0, O = (R + z) / 2, b = O !== 0 ? f * O / (O + r) : f;
    g = (f - b) / 2;
  }
  const _ = Math.max(1e-3, f * h - i / ee) / h, p = (f - _) / 2, y = l + p + g, v = s - p - g, { outerStart: x, outerEnd: L, innerStart: k, innerEnd: A } = D_(e, u, h, v - y), P = h - x, $ = h - L, S = y + x / P, w = v - L / $, C = u + k, m = u + A, E = y + k / C, M = v - A / m;
  if (t.beginPath(), o) {
    const R = (S + w) / 2;
    if (t.arc(a, n, h, S, R), t.arc(a, n, h, R, w), L > 0) {
      const T = Lt($, w, a, n);
      t.arc(T.x, T.y, L, w, v + ge);
    }
    const z = Lt(m, v, a, n);
    if (t.lineTo(z.x, z.y), A > 0) {
      const T = Lt(m, M, a, n);
      t.arc(T.x, T.y, A, v + ge, M + Math.PI);
    }
    const O = (v - A / u + (y + k / u)) / 2;
    if (t.arc(a, n, u, v - A / u, O, !0), t.arc(a, n, u, O, y + k / u, !0), k > 0) {
      const T = Lt(C, E, a, n);
      t.arc(T.x, T.y, k, E + Math.PI, y - ge);
    }
    const b = Lt(P, y, a, n);
    if (t.lineTo(b.x, b.y), x > 0) {
      const T = Lt(P, S, a, n);
      t.arc(T.x, T.y, x, y - ge, S);
    }
  } else {
    t.moveTo(a, n);
    const R = Math.cos(S) * h + a, z = Math.sin(S) * h + n;
    t.lineTo(R, z);
    const O = Math.cos(w) * h + a, b = Math.sin(w) * h + n;
    t.lineTo(O, b);
  }
  t.closePath();
}
function T_(t, e, i, r, s) {
  const { fullCircles: o, startAngle: a, circumference: n } = e;
  let l = e.endAngle;
  if (o) {
    hr(t, e, i, r, l, s);
    for (let d = 0; d < o; ++d)
      t.fill();
    isNaN(n) || (l = a + (n % oe || oe));
  }
  return hr(t, e, i, r, l, s), t.fill(), l;
}
function z_(t, e, i, r, s) {
  const { fullCircles: o, startAngle: a, circumference: n, options: l } = e, { borderWidth: d, borderJoinStyle: c, borderDash: h, borderDashOffset: u, borderRadius: g } = l, f = l.borderAlign === "inner";
  if (!d)
    return;
  t.setLineDash(h || []), t.lineDashOffset = u, f ? (t.lineWidth = d * 2, t.lineJoin = c || "round") : (t.lineWidth = d, t.lineJoin = c || "bevel");
  let _ = e.endAngle;
  if (o) {
    hr(t, e, i, r, _, s);
    for (let p = 0; p < o; ++p)
      t.stroke();
    isNaN(n) || (_ = a + (n % oe || oe));
  }
  f && $_(t, e, _), l.selfJoin && _ - a >= ee && g === 0 && c !== "miter" && M_(t, e, _), o || (hr(t, e, i, r, _, s), t.stroke());
}
class Tt extends je {
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
  inRange(i, r, s) {
    const o = this.getProps([
      "x",
      "y"
    ], s), { angle: a, distance: n } = Da(o, {
      x: i,
      y: r
    }), { startAngle: l, endAngle: d, innerRadius: c, outerRadius: h, circumference: u } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], s), g = (this.options.spacing + this.options.borderWidth) / 2, f = W(u, d - l), _ = yi(a, l, d) && l !== d, p = f >= oe || _, y = Je(n, c + g, h + g);
    return p && y;
  }
  getCenterPoint(i) {
    const { x: r, y: s, startAngle: o, endAngle: a, innerRadius: n, outerRadius: l } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], i), { offset: d, spacing: c } = this.options, h = (o + a) / 2, u = (n + l + c + d) / 2;
    return {
      x: r + Math.cos(h) * u,
      y: s + Math.sin(h) * u
    };
  }
  tooltipPosition(i) {
    return this.getCenterPoint(i);
  }
  draw(i) {
    const { options: r, circumference: s } = this, o = (r.offset || 0) / 4, a = (r.spacing || 0) / 2, n = r.circular;
    if (this.pixelMargin = r.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = s > oe ? Math.floor(s / oe) : 0, s === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    i.save();
    const l = (this.startAngle + this.endAngle) / 2;
    i.translate(Math.cos(l) * o, Math.sin(l) * o);
    const d = 1 - Math.sin(Math.min(ee, s || 0)), c = o * d;
    i.fillStyle = r.backgroundColor, i.strokeStyle = r.borderColor, T_(i, this, c, a, n), z_(i, this, c, a, n), i.restore();
  }
}
I(Tt, "id", "arc"), I(Tt, "defaults", {
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
}), I(Tt, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), I(Tt, "descriptors", {
  _scriptable: !0,
  _indexable: (i) => i !== "borderDash"
});
function ul(t, e, i = e) {
  t.lineCap = W(i.borderCapStyle, e.borderCapStyle), t.setLineDash(W(i.borderDash, e.borderDash)), t.lineDashOffset = W(i.borderDashOffset, e.borderDashOffset), t.lineJoin = W(i.borderJoinStyle, e.borderJoinStyle), t.lineWidth = W(i.borderWidth, e.borderWidth), t.strokeStyle = W(i.borderColor, e.borderColor);
}
function O_(t, e, i) {
  t.lineTo(i.x, i.y);
}
function R_(t) {
  return t.stepped ? su : t.tension || t.cubicInterpolationMode === "monotone" ? ou : O_;
}
function gl(t, e, i = {}) {
  const r = t.length, { start: s = 0, end: o = r - 1 } = i, { start: a, end: n } = e, l = Math.max(s, a), d = Math.min(o, n), c = s < a && o < a || s > n && o > n;
  return {
    count: r,
    start: l,
    loop: e.loop,
    ilen: d < l && !c ? r + d - l : d - l
  };
}
function I_(t, e, i, r) {
  const { points: s, options: o } = e, { count: a, start: n, loop: l, ilen: d } = gl(s, i, r), c = R_(o);
  let { move: h = !0, reverse: u } = r || {}, g, f, _;
  for (g = 0; g <= d; ++g)
    f = s[(n + (u ? d - g : g)) % a], !f.skip && (h ? (t.moveTo(f.x, f.y), h = !1) : c(t, _, f, u, o.stepped), _ = f);
  return l && (f = s[(n + (u ? d : 0)) % a], c(t, _, f, u, o.stepped)), !!l;
}
function N_(t, e, i, r) {
  const s = e.points, { count: o, start: a, ilen: n } = gl(s, i, r), { move: l = !0, reverse: d } = r || {};
  let c = 0, h = 0, u, g, f, _, p, y;
  const v = (L) => (a + (d ? n - L : L)) % o, x = () => {
    _ !== p && (t.lineTo(c, p), t.lineTo(c, _), t.lineTo(c, y));
  };
  for (l && (g = s[v(0)], t.moveTo(g.x, g.y)), u = 0; u <= n; ++u) {
    if (g = s[v(u)], g.skip)
      continue;
    const L = g.x, k = g.y, A = L | 0;
    A === f ? (k < _ ? _ = k : k > p && (p = k), c = (h * c + L) / ++h) : (x(), t.lineTo(L, k), f = A, h = 0, _ = p = k), y = k;
  }
  x();
}
function xs(t) {
  const e = t.options, i = e.borderDash && e.borderDash.length;
  return !t._decimated && !t._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !i ? N_ : I_;
}
function B_(t) {
  return t.stepped ? Iu : t.tension || t.cubicInterpolationMode === "monotone" ? Nu : bt;
}
function H_(t, e, i, r) {
  let s = e._path;
  s || (s = e._path = new Path2D(), e.path(s, i, r) && s.closePath()), ul(t, e.options), t.stroke(s);
}
function F_(t, e, i, r) {
  const { segments: s, options: o } = e, a = xs(e);
  for (const n of s)
    ul(t, o, n.style), t.beginPath(), a(t, e, n, {
      start: i,
      end: i + r - 1
    }) && t.closePath(), t.stroke();
}
const j_ = typeof Path2D == "function";
function G_(t, e, i, r) {
  j_ && !e.options.segment ? H_(t, e, i, r) : F_(t, e, i, r);
}
class nt extends je {
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, i) {
    const r = this.options;
    if ((r.tension || r.cubicInterpolationMode === "monotone") && !r.stepped && !this._pointsUpdated) {
      const s = r.spanGaps ? this._loop : this._fullLoop;
      Mu(this._points, r, e, s, i), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = Uu(this, this.options.segment));
  }
  first() {
    const e = this.segments, i = this.points;
    return e.length && i[e[0].start];
  }
  last() {
    const e = this.segments, i = this.points, r = e.length;
    return r && i[e[r - 1].end];
  }
  interpolate(e, i) {
    const r = this.options, s = e[i], o = this.points, a = Ja(this, {
      property: i,
      start: s,
      end: s
    });
    if (!a.length)
      return;
    const n = [], l = B_(r);
    let d, c;
    for (d = 0, c = a.length; d < c; ++d) {
      const { start: h, end: u } = a[d], g = o[h], f = o[u];
      if (g === f) {
        n.push(g);
        continue;
      }
      const _ = Math.abs((s - g[i]) / (f[i] - g[i])), p = l(g, f, _, r.stepped);
      p[i] = e[i], n.push(p);
    }
    return n.length === 1 ? n[0] : n;
  }
  pathSegment(e, i, r) {
    return xs(this)(e, this, i, r);
  }
  path(e, i, r) {
    const s = this.segments, o = xs(this);
    let a = this._loop;
    i = i || 0, r = r || this.points.length - i;
    for (const n of s)
      a &= o(e, this, n, {
        start: i,
        end: i + r - 1
      });
    return !!a;
  }
  draw(e, i, r, s) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (e.save(), G_(e, this, r, s), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
I(nt, "id", "line"), I(nt, "defaults", {
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
}), I(nt, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), I(nt, "descriptors", {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
});
function wn(t, e, i, r) {
  const s = t.options, { [i]: o } = t.getProps([
    i
  ], r);
  return Math.abs(e - o) < s.radius + s.hitRadius;
}
class er extends je {
  constructor(i) {
    super();
    I(this, "parsed");
    I(this, "skip");
    I(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, i && Object.assign(this, i);
  }
  inRange(i, r, s) {
    const o = this.options, { x: a, y: n } = this.getProps([
      "x",
      "y"
    ], s);
    return Math.pow(i - a, 2) + Math.pow(r - n, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(i, r) {
    return wn(this, i, "x", r);
  }
  inYRange(i, r) {
    return wn(this, i, "y", r);
  }
  getCenterPoint(i) {
    const { x: r, y: s } = this.getProps([
      "x",
      "y"
    ], i);
    return {
      x: r,
      y: s
    };
  }
  size(i) {
    i = i || this.options || {};
    let r = i.radius || 0;
    r = Math.max(r, r && i.hoverRadius || 0);
    const s = r && i.borderWidth || 0;
    return (r + s) * 2;
  }
  draw(i, r) {
    const s = this.options;
    this.skip || s.radius < 0.1 || !et(this, r, this.size(s) / 2) || (i.strokeStyle = s.borderColor, i.lineWidth = s.borderWidth, i.fillStyle = s.backgroundColor, ms(i, s, this.x, this.y));
  }
  getRange() {
    const i = this.options || {};
    return i.radius + i.hitRadius;
  }
}
I(er, "id", "point"), /**
* @type {any}
*/
I(er, "defaults", {
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
I(er, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function _l(t, e) {
  const { x: i, y: r, base: s, width: o, height: a } = t.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], e);
  let n, l, d, c, h;
  return t.horizontal ? (h = a / 2, n = Math.min(i, s), l = Math.max(i, s), d = r - h, c = r + h) : (h = o / 2, n = i - h, l = i + h, d = Math.min(r, s), c = Math.max(r, s)), {
    left: n,
    top: d,
    right: l,
    bottom: c
  };
}
function at(t, e, i, r) {
  return t ? 0 : pe(e, i, r);
}
function U_(t, e, i) {
  const r = t.options.borderWidth, s = t.borderSkipped, o = Fa(r);
  return {
    t: at(s.top, o.top, 0, i),
    r: at(s.right, o.right, 0, e),
    b: at(s.bottom, o.bottom, 0, i),
    l: at(s.left, o.left, 0, e)
  };
}
function V_(t, e, i) {
  const { enableBorderRadius: r } = t.getProps([
    "enableBorderRadius"
  ]), s = t.options.borderRadius, o = kt(s), a = Math.min(e, i), n = t.borderSkipped, l = r || Z(s);
  return {
    topLeft: at(!l || n.top || n.left, o.topLeft, 0, a),
    topRight: at(!l || n.top || n.right, o.topRight, 0, a),
    bottomLeft: at(!l || n.bottom || n.left, o.bottomLeft, 0, a),
    bottomRight: at(!l || n.bottom || n.right, o.bottomRight, 0, a)
  };
}
function W_(t) {
  const e = _l(t), i = e.right - e.left, r = e.bottom - e.top, s = U_(t, i / 2, r / 2), o = V_(t, i / 2, r / 2);
  return {
    outer: {
      x: e.left,
      y: e.top,
      w: i,
      h: r,
      radius: o
    },
    inner: {
      x: e.left + s.l,
      y: e.top + s.t,
      w: i - s.l - s.r,
      h: r - s.t - s.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r))
      }
    }
  };
}
function Kr(t, e, i, r) {
  const s = e === null, o = i === null, n = t && !(s && o) && _l(t, r);
  return n && (s || Je(e, n.left, n.right)) && (o || Je(i, n.top, n.bottom));
}
function K_(t) {
  return t.topLeft || t.topRight || t.bottomLeft || t.bottomRight;
}
function Y_(t, e) {
  t.rect(e.x, e.y, e.w, e.h);
}
function Yr(t, e, i = {}) {
  const r = t.x !== i.x ? -e : 0, s = t.y !== i.y ? -e : 0, o = (t.x + t.w !== i.x + i.w ? e : 0) - r, a = (t.y + t.h !== i.y + i.h ? e : 0) - s;
  return {
    x: t.x + r,
    y: t.y + s,
    w: t.w + o,
    h: t.h + a,
    radius: t.radius
  };
}
class tr extends je {
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: i, options: { borderColor: r, backgroundColor: s } } = this, { inner: o, outer: a } = W_(this), n = K_(a.radius) ? vi : Y_;
    e.save(), (a.w !== o.w || a.h !== o.h) && (e.beginPath(), n(e, Yr(a, i, o)), e.clip(), n(e, Yr(o, -i, a)), e.fillStyle = r, e.fill("evenodd")), e.beginPath(), n(e, Yr(o, i)), e.fillStyle = s, e.fill(), e.restore();
  }
  inRange(e, i, r) {
    return Kr(this, e, i, r);
  }
  inXRange(e, i) {
    return Kr(this, e, null, i);
  }
  inYRange(e, i) {
    return Kr(this, null, e, i);
  }
  getCenterPoint(e) {
    const { x: i, y: r, base: s, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], e);
    return {
      x: o ? (i + s) / 2 : i,
      y: o ? r : (r + s) / 2
    };
  }
  getRange(e) {
    return e === "x" ? this.width / 2 : this.height / 2;
  }
}
I(tr, "id", "bar"), I(tr, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), I(tr, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var X_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: Tt,
  BarElement: tr,
  LineElement: nt,
  PointElement: er
});
const ws = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], kn = /* @__PURE__ */ ws.map((t) => t.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function fl(t) {
  return ws[t % ws.length];
}
function pl(t) {
  return kn[t % kn.length];
}
function Z_(t, e) {
  return t.borderColor = fl(e), t.backgroundColor = pl(e), ++e;
}
function q_(t, e) {
  return t.backgroundColor = t.data.map(() => fl(e++)), e;
}
function J_(t, e) {
  return t.backgroundColor = t.data.map(() => pl(e++)), e;
}
function Q_(t) {
  let e = 0;
  return (i, r) => {
    const s = t.getDatasetMeta(r).controller;
    s instanceof ot ? e = q_(i, e) : s instanceof ci ? e = J_(i, e) : s && (e = Z_(i, e));
  };
}
function Sn(t) {
  let e;
  for (e in t)
    if (t[e].borderColor || t[e].backgroundColor)
      return !0;
  return !1;
}
function ef(t) {
  return t && (t.borderColor || t.backgroundColor);
}
function tf() {
  return de.borderColor !== "rgba(0,0,0,0.1)" || de.backgroundColor !== "rgba(0,0,0,0.1)";
}
var rf = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(t, e, i) {
    if (!i.enabled)
      return;
    const { data: { datasets: r }, options: s } = t.config, { elements: o } = s, a = Sn(r) || ef(s) || o && Sn(o) || tf();
    if (!i.forceOverride && a)
      return;
    const n = Q_(t);
    r.forEach(n);
  }
};
function sf(t, e, i, r, s) {
  const o = s.samples || r;
  if (o >= i)
    return t.slice(e, e + i);
  const a = [], n = (i - 2) / (o - 2);
  let l = 0;
  const d = e + i - 1;
  let c = e, h, u, g, f, _;
  for (a[l++] = t[c], h = 0; h < o - 2; h++) {
    let p = 0, y = 0, v;
    const x = Math.floor((h + 1) * n) + 1 + e, L = Math.min(Math.floor((h + 2) * n) + 1, i) + e, k = L - x;
    for (v = x; v < L; v++)
      p += t[v].x, y += t[v].y;
    p /= k, y /= k;
    const A = Math.floor(h * n) + 1 + e, P = Math.min(Math.floor((h + 1) * n) + 1, i) + e, { x: $, y: S } = t[c];
    for (g = f = -1, v = A; v < P; v++)
      f = 0.5 * Math.abs(($ - p) * (t[v].y - S) - ($ - t[v].x) * (y - S)), f > g && (g = f, u = t[v], _ = v);
    a[l++] = u, c = _;
  }
  return a[l++] = t[d], a;
}
function of(t, e, i, r) {
  let s = 0, o = 0, a, n, l, d, c, h, u, g, f, _;
  const p = [], y = e + i - 1, v = t[e].x, L = t[y].x - v;
  for (a = e; a < e + i; ++a) {
    n = t[a], l = (n.x - v) / L * r, d = n.y;
    const k = l | 0;
    if (k === c)
      d < f ? (f = d, h = a) : d > _ && (_ = d, u = a), s = (o * s + n.x) / ++o;
    else {
      const A = a - 1;
      if (!X(h) && !X(u)) {
        const P = Math.min(h, u), $ = Math.max(h, u);
        P !== g && P !== A && p.push({
          ...t[P],
          x: s
        }), $ !== g && $ !== A && p.push({
          ...t[$],
          x: s
        });
      }
      a > 0 && A !== g && p.push(t[A]), p.push(n), c = k, o = 0, f = _ = d, h = u = g = a;
    }
  }
  return p;
}
function ml(t) {
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
function An(t) {
  t.data.datasets.forEach((e) => {
    ml(e);
  });
}
function nf(t, e) {
  const i = e.length;
  let r = 0, s;
  const { iScale: o } = t, { min: a, max: n, minDefined: l, maxDefined: d } = o.getUserBounds();
  return l && (r = pe(Qe(e, o.axis, a).lo, 0, i - 1)), d ? s = pe(Qe(e, o.axis, n).hi + 1, r, i) - r : s = i - r, {
    start: r,
    count: s
  };
}
var af = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (t, e, i) => {
    if (!i.enabled) {
      An(t);
      return;
    }
    const r = t.width;
    t.data.datasets.forEach((s, o) => {
      const { _data: a, indexAxis: n } = s, l = t.getDatasetMeta(o), d = a || s.data;
      if (ei([
        n,
        t.options.indexAxis
      ]) === "y" || !l.controller.supportsDecimation)
        return;
      const c = t.scales[l.xAxisID];
      if (c.type !== "linear" && c.type !== "time" || t.options.parsing)
        return;
      let { start: h, count: u } = nf(l, d);
      const g = i.threshold || 4 * r;
      if (u <= g) {
        ml(s);
        return;
      }
      X(a) && (s._data = d, delete s.data, Object.defineProperty(s, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(_) {
          this._data = _;
        }
      }));
      let f;
      switch (i.algorithm) {
        case "lttb":
          f = sf(d, h, u, r, i);
          break;
        case "min-max":
          f = of(d, h, u, r);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`);
      }
      s._decimated = f;
    });
  },
  destroy(t) {
    An(t);
  }
};
function lf(t, e, i) {
  const r = t.segments, s = t.points, o = e.points, a = [];
  for (const n of r) {
    let { start: l, end: d } = n;
    d = xr(l, d, s);
    const c = ks(i, s[l], s[d], n.loop);
    if (!e.segments) {
      a.push({
        source: n,
        target: c,
        start: s[l],
        end: s[d]
      });
      continue;
    }
    const h = Ja(e, c);
    for (const u of h) {
      const g = ks(i, o[u.start], o[u.end], u.loop), f = qa(n, s, g);
      for (const _ of f)
        a.push({
          source: _,
          target: u,
          start: {
            [i]: Cn(c, g, "start", Math.max)
          },
          end: {
            [i]: Cn(c, g, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function ks(t, e, i, r) {
  if (r)
    return;
  let s = e[t], o = i[t];
  return t === "angle" && (s = ve(s), o = ve(o)), {
    property: t,
    start: s,
    end: o
  };
}
function df(t, e) {
  const { x: i = null, y: r = null } = t || {}, s = e.points, o = [];
  return e.segments.forEach(({ start: a, end: n }) => {
    n = xr(a, n, s);
    const l = s[a], d = s[n];
    r !== null ? (o.push({
      x: l.x,
      y: r
    }), o.push({
      x: d.x,
      y: r
    })) : i !== null && (o.push({
      x: i,
      y: l.y
    }), o.push({
      x: i,
      y: d.y
    }));
  }), o;
}
function xr(t, e, i) {
  for (; e > t; e--) {
    const r = i[e];
    if (!isNaN(r.x) && !isNaN(r.y))
      break;
  }
  return e;
}
function Cn(t, e, i, r) {
  return t && e ? r(t[i], e[i]) : t ? t[i] : e ? e[i] : 0;
}
function yl(t, e) {
  let i = [], r = !1;
  return le(t) ? (r = !0, i = t) : i = df(t, e), i.length ? new nt({
    points: i,
    options: {
      tension: 0
    },
    _loop: r,
    _fullLoop: r
  }) : null;
}
function En(t) {
  return t && t.fill !== !1;
}
function cf(t, e, i) {
  let s = t[e].fill;
  const o = [
    e
  ];
  let a;
  if (!i)
    return s;
  for (; s !== !1 && o.indexOf(s) === -1; ) {
    if (!ue(s))
      return s;
    if (a = t[s], !a)
      return !1;
    if (a.visible)
      return s;
    o.push(s), s = a.fill;
  }
  return !1;
}
function hf(t, e, i) {
  const r = ff(t);
  if (Z(r))
    return isNaN(r.value) ? !1 : r;
  let s = parseFloat(r);
  return ue(s) && Math.floor(s) === s ? uf(r[0], e, s, i) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(r) >= 0 && r;
}
function uf(t, e, i, r) {
  return (t === "-" || t === "+") && (i = e + i), i === e || i < 0 || i >= r ? !1 : i;
}
function gf(t, e) {
  let i = null;
  return t === "start" ? i = e.bottom : t === "end" ? i = e.top : Z(t) ? i = e.getPixelForValue(t.value) : e.getBasePixel && (i = e.getBasePixel()), i;
}
function _f(t, e, i) {
  let r;
  return t === "start" ? r = i : t === "end" ? r = e.options.reverse ? e.min : e.max : Z(t) ? r = t.value : r = e.getBaseValue(), r;
}
function ff(t) {
  const e = t.options, i = e.fill;
  let r = W(i && i.target, i);
  return r === void 0 && (r = !!e.backgroundColor), r === !1 || r === null ? !1 : r === !0 ? "origin" : r;
}
function pf(t) {
  const { scale: e, index: i, line: r } = t, s = [], o = r.segments, a = r.points, n = mf(e, i);
  n.push(yl({
    x: null,
    y: e.bottom
  }, r));
  for (let l = 0; l < o.length; l++) {
    const d = o[l];
    for (let c = d.start; c <= d.end; c++)
      yf(s, a[c], n);
  }
  return new nt({
    points: s,
    options: {}
  });
}
function mf(t, e) {
  const i = [], r = t.getMatchingVisibleMetas("line");
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (o.index === e)
      break;
    o.hidden || i.unshift(o.dataset);
  }
  return i;
}
function yf(t, e, i) {
  const r = [];
  for (let s = 0; s < i.length; s++) {
    const o = i[s], { first: a, last: n, point: l } = vf(o, e, "x");
    if (!(!l || a && n)) {
      if (a)
        r.unshift(l);
      else if (t.push(l), !n)
        break;
    }
  }
  t.push(...r);
}
function vf(t, e, i) {
  const r = t.interpolate(e, i);
  if (!r)
    return {};
  const s = r[i], o = t.segments, a = t.points;
  let n = !1, l = !1;
  for (let d = 0; d < o.length; d++) {
    const c = o[d], h = a[c.start][i], u = a[c.end][i];
    if (Je(s, h, u)) {
      n = s === h, l = s === u;
      break;
    }
  }
  return {
    first: n,
    last: l,
    point: r
  };
}
class vl {
  constructor(e) {
    this.x = e.x, this.y = e.y, this.radius = e.radius;
  }
  pathSegment(e, i, r) {
    const { x: s, y: o, radius: a } = this;
    return i = i || {
      start: 0,
      end: oe
    }, e.arc(s, o, a, i.end, i.start, !0), !r.bounds;
  }
  interpolate(e) {
    const { x: i, y: r, radius: s } = this, o = e.angle;
    return {
      x: i + Math.cos(o) * s,
      y: r + Math.sin(o) * s,
      angle: o
    };
  }
}
function bf(t) {
  const { chart: e, fill: i, line: r } = t;
  if (ue(i))
    return xf(e, i);
  if (i === "stack")
    return pf(t);
  if (i === "shape")
    return !0;
  const s = wf(t);
  return s instanceof vl ? s : yl(s, r);
}
function xf(t, e) {
  const i = t.getDatasetMeta(e);
  return i && t.isDatasetVisible(e) ? i.dataset : null;
}
function wf(t) {
  return (t.scale || {}).getPointPositionForValue ? Sf(t) : kf(t);
}
function kf(t) {
  const { scale: e = {}, fill: i } = t, r = gf(i, e);
  if (ue(r)) {
    const s = e.isHorizontal();
    return {
      x: s ? r : null,
      y: s ? null : r
    };
  }
  return null;
}
function Sf(t) {
  const { scale: e, fill: i } = t, r = e.options, s = e.getLabels().length, o = r.reverse ? e.max : e.min, a = _f(i, e, o), n = [];
  if (r.grid.circular) {
    const l = e.getPointPositionForValue(0, o);
    return new vl({
      x: l.x,
      y: l.y,
      radius: e.getDistanceFromCenterForValue(a)
    });
  }
  for (let l = 0; l < s; ++l)
    n.push(e.getPointPositionForValue(l, a));
  return n;
}
function Xr(t, e, i) {
  const r = bf(e), { chart: s, index: o, line: a, scale: n, axis: l } = e, d = a.options, c = d.fill, h = d.backgroundColor, { above: u = h, below: g = h } = c || {}, f = s.getDatasetMeta(o), _ = Qa(s, f);
  r && a.points.length && (mr(t, i), Af(t, {
    line: a,
    target: r,
    above: u,
    below: g,
    area: i,
    scale: n,
    axis: l,
    clip: _
  }), yr(t));
}
function Af(t, e) {
  const { line: i, target: r, above: s, below: o, area: a, scale: n, clip: l } = e, d = i._loop ? "angle" : e.axis;
  t.save();
  let c = o;
  o !== s && (d === "x" ? (Pn(t, r, a.top), Zr(t, {
    line: i,
    target: r,
    color: s,
    scale: n,
    property: d,
    clip: l
  }), t.restore(), t.save(), Pn(t, r, a.bottom)) : d === "y" && (Mn(t, r, a.left), Zr(t, {
    line: i,
    target: r,
    color: o,
    scale: n,
    property: d,
    clip: l
  }), t.restore(), t.save(), Mn(t, r, a.right), c = s)), Zr(t, {
    line: i,
    target: r,
    color: c,
    scale: n,
    property: d,
    clip: l
  }), t.restore();
}
function Pn(t, e, i) {
  const { segments: r, points: s } = e;
  let o = !0, a = !1;
  t.beginPath();
  for (const n of r) {
    const { start: l, end: d } = n, c = s[l], h = s[xr(l, d, s)];
    o ? (t.moveTo(c.x, c.y), o = !1) : (t.lineTo(c.x, i), t.lineTo(c.x, c.y)), a = !!e.pathSegment(t, n, {
      move: a
    }), a ? t.closePath() : t.lineTo(h.x, i);
  }
  t.lineTo(e.first().x, i), t.closePath(), t.clip();
}
function Mn(t, e, i) {
  const { segments: r, points: s } = e;
  let o = !0, a = !1;
  t.beginPath();
  for (const n of r) {
    const { start: l, end: d } = n, c = s[l], h = s[xr(l, d, s)];
    o ? (t.moveTo(c.x, c.y), o = !1) : (t.lineTo(i, c.y), t.lineTo(c.x, c.y)), a = !!e.pathSegment(t, n, {
      move: a
    }), a ? t.closePath() : t.lineTo(i, h.y);
  }
  t.lineTo(i, e.first().y), t.closePath(), t.clip();
}
function Zr(t, e) {
  const { line: i, target: r, property: s, color: o, scale: a, clip: n } = e, l = lf(i, r, s);
  for (const { source: d, target: c, start: h, end: u } of l) {
    const { style: { backgroundColor: g = o } = {} } = d, f = r !== !0;
    t.save(), t.fillStyle = g, Cf(t, a, n, f && ks(s, h, u)), t.beginPath();
    const _ = !!i.pathSegment(t, d);
    let p;
    if (f) {
      _ ? t.closePath() : $n(t, r, u, s);
      const y = !!r.pathSegment(t, c, {
        move: _,
        reverse: !0
      });
      p = _ && y, p || $n(t, r, h, s);
    }
    t.closePath(), t.fill(p ? "evenodd" : "nonzero"), t.restore();
  }
}
function Cf(t, e, i, r) {
  const s = e.chart.chartArea, { property: o, start: a, end: n } = r || {};
  if (o === "x" || o === "y") {
    let l, d, c, h;
    o === "x" ? (l = a, d = s.top, c = n, h = s.bottom) : (l = s.left, d = a, c = s.right, h = n), t.beginPath(), i && (l = Math.max(l, i.left), c = Math.min(c, i.right), d = Math.max(d, i.top), h = Math.min(h, i.bottom)), t.rect(l, d, c - l, h - d), t.clip();
  }
}
function $n(t, e, i, r) {
  const s = e.interpolate(i, r);
  s && t.lineTo(s.x, s.y);
}
var Ef = {
  id: "filler",
  afterDatasetsUpdate(t, e, i) {
    const r = (t.data.datasets || []).length, s = [];
    let o, a, n, l;
    for (a = 0; a < r; ++a)
      o = t.getDatasetMeta(a), n = o.dataset, l = null, n && n.options && n instanceof nt && (l = {
        visible: t.isDatasetVisible(a),
        index: a,
        fill: hf(n, a, r),
        chart: t,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: n
      }), o.$filler = l, s.push(l);
    for (a = 0; a < r; ++a)
      l = s[a], !(!l || l.fill === !1) && (l.fill = cf(s, a, i.propagate));
  },
  beforeDraw(t, e, i) {
    const r = i.drawTime === "beforeDraw", s = t.getSortedVisibleDatasetMetas(), o = t.chartArea;
    for (let a = s.length - 1; a >= 0; --a) {
      const n = s[a].$filler;
      n && (n.line.updateControlPoints(o, n.axis), r && n.fill && Xr(t.ctx, n, o));
    }
  },
  beforeDatasetsDraw(t, e, i) {
    if (i.drawTime !== "beforeDatasetsDraw")
      return;
    const r = t.getSortedVisibleDatasetMetas();
    for (let s = r.length - 1; s >= 0; --s) {
      const o = r[s].$filler;
      En(o) && Xr(t.ctx, o, t.chartArea);
    }
  },
  beforeDatasetDraw(t, e, i) {
    const r = e.meta.$filler;
    !En(r) || i.drawTime !== "beforeDatasetDraw" || Xr(t.ctx, r, t.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Ln = (t, e) => {
  let { boxHeight: i = e, boxWidth: r = e } = t;
  return t.usePointStyle && (i = Math.min(i, e), r = t.pointStyleWidth || Math.min(r, e)), {
    boxWidth: r,
    boxHeight: i,
    itemHeight: Math.max(e, i)
  };
}, Pf = (t, e) => t !== null && e !== null && t.datasetIndex === e.datasetIndex && t.index === e.index;
class Dn extends je {
  constructor(e) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, i, r) {
    this.maxWidth = e, this.maxHeight = i, this._margins = r, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const e = this.options.labels || {};
    let i = se(e.generateLabels, [
      this.chart
    ], this) || [];
    e.filter && (i = i.filter((r) => e.filter(r, this.chart.data))), e.sort && (i = i.sort((r, s) => e.sort(r, s, this.chart.data))), this.options.reverse && i.reverse(), this.legendItems = i;
  }
  fit() {
    const { options: e, ctx: i } = this;
    if (!e.display) {
      this.width = this.height = 0;
      return;
    }
    const r = e.labels, s = fe(r.font), o = s.size, a = this._computeTitleHeight(), { boxWidth: n, itemHeight: l } = Ln(r, o);
    let d, c;
    i.font = s.string, this.isHorizontal() ? (d = this.maxWidth, c = this._fitRows(a, o, n, l) + 10) : (c = this.maxHeight, d = this._fitCols(a, s, n, l) + 10), this.width = Math.min(d, e.maxWidth || this.maxWidth), this.height = Math.min(c, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, i, r, s) {
    const { ctx: o, maxWidth: a, options: { labels: { padding: n } } } = this, l = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], c = s + n;
    let h = e;
    o.textAlign = "left", o.textBaseline = "middle";
    let u = -1, g = -c;
    return this.legendItems.forEach((f, _) => {
      const p = r + i / 2 + o.measureText(f.text).width;
      (_ === 0 || d[d.length - 1] + p + 2 * n > a) && (h += c, d[d.length - (_ > 0 ? 0 : 1)] = 0, g += c, u++), l[_] = {
        left: 0,
        top: g,
        row: u,
        width: p,
        height: s
      }, d[d.length - 1] += p + n;
    }), h;
  }
  _fitCols(e, i, r, s) {
    const { ctx: o, maxHeight: a, options: { labels: { padding: n } } } = this, l = this.legendHitBoxes = [], d = this.columnSizes = [], c = a - e;
    let h = n, u = 0, g = 0, f = 0, _ = 0;
    return this.legendItems.forEach((p, y) => {
      const { itemWidth: v, itemHeight: x } = Mf(r, i, o, p, s);
      y > 0 && g + x + 2 * n > c && (h += u + n, d.push({
        width: u,
        height: g
      }), f += u + n, _++, u = g = 0), l[y] = {
        left: f,
        top: g,
        col: _,
        width: v,
        height: x
      }, u = Math.max(u, v), g += x + n;
    }), h += u, d.push({
      width: u,
      height: g
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: i, options: { align: r, labels: { padding: s }, rtl: o } } = this, a = Ot(o, this.left, this.width);
    if (this.isHorizontal()) {
      let n = 0, l = ye(r, this.left + s, this.right - this.lineWidths[n]);
      for (const d of i)
        n !== d.row && (n = d.row, l = ye(r, this.left + s, this.right - this.lineWidths[n])), d.top += this.top + e + s, d.left = a.leftForLtr(a.x(l), d.width), l += d.width + s;
    } else {
      let n = 0, l = ye(r, this.top + e + s, this.bottom - this.columnSizes[n].height);
      for (const d of i)
        d.col !== n && (n = d.col, l = ye(r, this.top + e + s, this.bottom - this.columnSizes[n].height)), d.top = l, d.left += this.left + s, d.left = a.leftForLtr(a.x(d.left), d.width), l += d.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const e = this.ctx;
      mr(e, this), this._draw(), yr(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: i, lineWidths: r, ctx: s } = this, { align: o, labels: a } = e, n = de.color, l = Ot(e.rtl, this.left, this.width), d = fe(a.font), { padding: c } = a, h = d.size, u = h / 2;
    let g;
    this.drawTitle(), s.textAlign = l.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = d.string;
    const { boxWidth: f, boxHeight: _, itemHeight: p } = Ln(a, h), y = function(A, P, $) {
      if (isNaN(f) || f <= 0 || isNaN(_) || _ < 0)
        return;
      s.save();
      const S = W($.lineWidth, 1);
      if (s.fillStyle = W($.fillStyle, n), s.lineCap = W($.lineCap, "butt"), s.lineDashOffset = W($.lineDashOffset, 0), s.lineJoin = W($.lineJoin, "miter"), s.lineWidth = S, s.strokeStyle = W($.strokeStyle, n), s.setLineDash(W($.lineDash, [])), a.usePointStyle) {
        const w = {
          radius: _ * Math.SQRT2 / 2,
          pointStyle: $.pointStyle,
          rotation: $.rotation,
          borderWidth: S
        }, C = l.xPlus(A, f / 2), m = P + u;
        Ha(s, w, C, m, a.pointStyleWidth && f);
      } else {
        const w = P + Math.max((h - _) / 2, 0), C = l.leftForLtr(A, f), m = kt($.borderRadius);
        s.beginPath(), Object.values(m).some((E) => E !== 0) ? vi(s, {
          x: C,
          y: w,
          w: f,
          h: _,
          radius: m
        }) : s.rect(C, w, f, _), s.fill(), S !== 0 && s.stroke();
      }
      s.restore();
    }, v = function(A, P, $) {
      Pt(s, $.text, A, P + p / 2, d, {
        strikethrough: $.hidden,
        textAlign: l.textAlign($.textAlign)
      });
    }, x = this.isHorizontal(), L = this._computeTitleHeight();
    x ? g = {
      x: ye(o, this.left + c, this.right - r[0]),
      y: this.top + c + L,
      line: 0
    } : g = {
      x: this.left + c,
      y: ye(o, this.top + L + c, this.bottom - i[0].height),
      line: 0
    }, Ya(this.ctx, e.textDirection);
    const k = p + c;
    this.legendItems.forEach((A, P) => {
      s.strokeStyle = A.fontColor, s.fillStyle = A.fontColor;
      const $ = s.measureText(A.text).width, S = l.textAlign(A.textAlign || (A.textAlign = a.textAlign)), w = f + u + $;
      let C = g.x, m = g.y;
      l.setWidth(this.width), x ? P > 0 && C + w + c > this.right && (m = g.y += k, g.line++, C = g.x = ye(o, this.left + c, this.right - r[g.line])) : P > 0 && m + k > this.bottom && (C = g.x = C + i[g.line].width + c, g.line++, m = g.y = ye(o, this.top + L + c, this.bottom - i[g.line].height));
      const E = l.x(C);
      if (y(E, m, A), C = Kh(S, C + f + u, x ? C + w : this.right, e.rtl), v(l.x(C), m, A), x)
        g.x += w + c;
      else if (typeof A.text != "string") {
        const M = d.lineHeight;
        g.y += bl(A, M) + c;
      } else
        g.y += k;
    }), Xa(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, i = e.title, r = fe(i.font), s = xe(i.padding);
    if (!i.display)
      return;
    const o = Ot(e.rtl, this.left, this.width), a = this.ctx, n = i.position, l = r.size / 2, d = s.top + l;
    let c, h = this.left, u = this.width;
    if (this.isHorizontal())
      u = Math.max(...this.lineWidths), c = this.top + d, h = ye(e.align, h, this.right - u);
    else {
      const f = this.columnSizes.reduce((_, p) => Math.max(_, p.height), 0);
      c = d + ye(e.align, this.top, this.bottom - f - e.labels.padding - this._computeTitleHeight());
    }
    const g = ye(n, h, h + u);
    a.textAlign = o.textAlign(Bs(n)), a.textBaseline = "middle", a.strokeStyle = i.color, a.fillStyle = i.color, a.font = r.string, Pt(a, i.text, g, c, r);
  }
  _computeTitleHeight() {
    const e = this.options.title, i = fe(e.font), r = xe(e.padding);
    return e.display ? i.lineHeight + r.height : 0;
  }
  _getLegendItemAt(e, i) {
    let r, s, o;
    if (Je(e, this.left, this.right) && Je(i, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, r = 0; r < o.length; ++r)
        if (s = o[r], Je(e, s.left, s.left + s.width) && Je(i, s.top, s.top + s.height))
          return this.legendItems[r];
    }
    return null;
  }
  handleEvent(e) {
    const i = this.options;
    if (!Df(e.type, i))
      return;
    const r = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const s = this._hoveredItem, o = Pf(s, r);
      s && !o && se(i.onLeave, [
        e,
        s,
        this
      ], this), this._hoveredItem = r, r && !o && se(i.onHover, [
        e,
        r,
        this
      ], this);
    } else r && se(i.onClick, [
      e,
      r,
      this
    ], this);
  }
}
function Mf(t, e, i, r, s) {
  const o = $f(r, t, e, i), a = Lf(s, r, e.lineHeight);
  return {
    itemWidth: o,
    itemHeight: a
  };
}
function $f(t, e, i, r) {
  let s = t.text;
  return s && typeof s != "string" && (s = s.reduce((o, a) => o.length > a.length ? o : a)), e + i.size / 2 + r.measureText(s).width;
}
function Lf(t, e, i) {
  let r = t;
  return typeof e.text != "string" && (r = bl(e, i)), r;
}
function bl(t, e) {
  const i = t.text ? t.text.length : 0;
  return e * i;
}
function Df(t, e) {
  return !!((t === "mousemove" || t === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (t === "click" || t === "mouseup"));
}
var xl = {
  id: "legend",
  _element: Dn,
  start(t, e, i) {
    const r = t.legend = new Dn({
      ctx: t.ctx,
      options: i,
      chart: t
    });
    be.configure(t, r, i), be.addBox(t, r);
  },
  stop(t) {
    be.removeBox(t, t.legend), delete t.legend;
  },
  beforeUpdate(t, e, i) {
    const r = t.legend;
    be.configure(t, r, i), r.options = i;
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
      const r = e.datasetIndex, s = i.chart;
      s.isDatasetVisible(r) ? (s.hide(r), e.hidden = !0) : (s.show(r), e.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (t) => t.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(t) {
        const e = t.data.datasets, { labels: { usePointStyle: i, pointStyle: r, textAlign: s, color: o, useBorderRadius: a, borderRadius: n } } = t.legend.options;
        return t._getSortedDatasetMetas().map((l) => {
          const d = l.controller.getStyle(i ? 0 : void 0), c = xe(d.borderWidth);
          return {
            text: e[l.index].label,
            fillStyle: d.backgroundColor,
            fontColor: o,
            hidden: !l.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (c.width + c.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: r || d.pointStyle,
            rotation: d.rotation,
            textAlign: s || d.textAlign,
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
class Ys extends je {
  constructor(e) {
    super(), this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, i) {
    const r = this.options;
    if (this.left = 0, this.top = 0, !r.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = e, this.height = this.bottom = i;
    const s = le(r.text) ? r.text.length : 1;
    this._padding = xe(r.padding);
    const o = s * fe(r.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = o : this.width = o;
  }
  isHorizontal() {
    const e = this.options.position;
    return e === "top" || e === "bottom";
  }
  _drawArgs(e) {
    const { top: i, left: r, bottom: s, right: o, options: a } = this, n = a.align;
    let l = 0, d, c, h;
    return this.isHorizontal() ? (c = ye(n, r, o), h = i + e, d = o - r) : (a.position === "left" ? (c = r + e, h = ye(n, s, i), l = ee * -0.5) : (c = o - e, h = ye(n, i, s), l = ee * 0.5), d = s - i), {
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
    const r = fe(i.font), o = r.lineHeight / 2 + this._padding.top, { titleX: a, titleY: n, maxWidth: l, rotation: d } = this._drawArgs(o);
    Pt(e, i.text, 0, 0, r, {
      color: i.color,
      maxWidth: l,
      rotation: d,
      textAlign: Bs(i.align),
      textBaseline: "middle",
      translation: [
        a,
        n
      ]
    });
  }
}
function Tf(t, e) {
  const i = new Ys({
    ctx: t.ctx,
    options: e,
    chart: t
  });
  be.configure(t, i, e), be.addBox(t, i), t.titleBlock = i;
}
var zf = {
  id: "title",
  _element: Ys,
  start(t, e, i) {
    Tf(t, i);
  },
  stop(t) {
    const e = t.titleBlock;
    be.removeBox(t, e), delete t.titleBlock;
  },
  beforeUpdate(t, e, i) {
    const r = t.titleBlock;
    be.configure(t, r, i), r.options = i;
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
const Fi = /* @__PURE__ */ new WeakMap();
var Of = {
  id: "subtitle",
  start(t, e, i) {
    const r = new Ys({
      ctx: t.ctx,
      options: i,
      chart: t
    });
    be.configure(t, r, i), be.addBox(t, r), Fi.set(t, r);
  },
  stop(t) {
    be.removeBox(t, Fi.get(t)), Fi.delete(t);
  },
  beforeUpdate(t, e, i) {
    const r = Fi.get(t);
    be.configure(t, r, i), r.options = i;
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
const ii = {
  average(t) {
    if (!t.length)
      return !1;
    let e, i, r = /* @__PURE__ */ new Set(), s = 0, o = 0;
    for (e = 0, i = t.length; e < i; ++e) {
      const n = t[e].element;
      if (n && n.hasValue()) {
        const l = n.tooltipPosition();
        r.add(l.x), s += l.y, ++o;
      }
    }
    return o === 0 || r.size === 0 ? !1 : {
      x: [
        ...r
      ].reduce((n, l) => n + l) / r.size,
      y: s / o
    };
  },
  nearest(t, e) {
    if (!t.length)
      return !1;
    let i = e.x, r = e.y, s = Number.POSITIVE_INFINITY, o, a, n;
    for (o = 0, a = t.length; o < a; ++o) {
      const l = t[o].element;
      if (l && l.hasValue()) {
        const d = l.getCenterPoint(), c = fs(e, d);
        c < s && (s = c, n = l);
      }
    }
    if (n) {
      const l = n.tooltipPosition();
      i = l.x, r = l.y;
    }
    return {
      x: i,
      y: r
    };
  }
};
function Ge(t, e) {
  return e && (le(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
}
function Ze(t) {
  return (typeof t == "string" || t instanceof String) && t.indexOf(`
`) > -1 ? t.split(`
`) : t;
}
function Rf(t, e) {
  const { element: i, datasetIndex: r, index: s } = e, o = t.getDatasetMeta(r).controller, { label: a, value: n } = o.getLabelAndValue(s);
  return {
    chart: t,
    label: a,
    parsed: o.getParsed(s),
    raw: t.data.datasets[r].data[s],
    formattedValue: n,
    dataset: o.getDataset(),
    dataIndex: s,
    datasetIndex: r,
    element: i
  };
}
function Tn(t, e) {
  const i = t.chart.ctx, { body: r, footer: s, title: o } = t, { boxWidth: a, boxHeight: n } = e, l = fe(e.bodyFont), d = fe(e.titleFont), c = fe(e.footerFont), h = o.length, u = s.length, g = r.length, f = xe(e.padding);
  let _ = f.height, p = 0, y = r.reduce((L, k) => L + k.before.length + k.lines.length + k.after.length, 0);
  if (y += t.beforeBody.length + t.afterBody.length, h && (_ += h * d.lineHeight + (h - 1) * e.titleSpacing + e.titleMarginBottom), y) {
    const L = e.displayColors ? Math.max(n, l.lineHeight) : l.lineHeight;
    _ += g * L + (y - g) * l.lineHeight + (y - 1) * e.bodySpacing;
  }
  u && (_ += e.footerMarginTop + u * c.lineHeight + (u - 1) * e.footerSpacing);
  let v = 0;
  const x = function(L) {
    p = Math.max(p, i.measureText(L).width + v);
  };
  return i.save(), i.font = d.string, re(t.title, x), i.font = l.string, re(t.beforeBody.concat(t.afterBody), x), v = e.displayColors ? a + 2 + e.boxPadding : 0, re(r, (L) => {
    re(L.before, x), re(L.lines, x), re(L.after, x);
  }), v = 0, i.font = c.string, re(t.footer, x), i.restore(), p += f.width, {
    width: p,
    height: _
  };
}
function If(t, e) {
  const { y: i, height: r } = e;
  return i < r / 2 ? "top" : i > t.height - r / 2 ? "bottom" : "center";
}
function Nf(t, e, i, r) {
  const { x: s, width: o } = r, a = i.caretSize + i.caretPadding;
  if (t === "left" && s + o + a > e.width || t === "right" && s - o - a < 0)
    return !0;
}
function Bf(t, e, i, r) {
  const { x: s, width: o } = i, { width: a, chartArea: { left: n, right: l } } = t;
  let d = "center";
  return r === "center" ? d = s <= (n + l) / 2 ? "left" : "right" : s <= o / 2 ? d = "left" : s >= a - o / 2 && (d = "right"), Nf(d, t, e, i) && (d = "center"), d;
}
function zn(t, e, i) {
  const r = i.yAlign || e.yAlign || If(t, i);
  return {
    xAlign: i.xAlign || e.xAlign || Bf(t, e, i, r),
    yAlign: r
  };
}
function Hf(t, e) {
  let { x: i, width: r } = t;
  return e === "right" ? i -= r : e === "center" && (i -= r / 2), i;
}
function Ff(t, e, i) {
  let { y: r, height: s } = t;
  return e === "top" ? r += i : e === "bottom" ? r -= s + i : r -= s / 2, r;
}
function On(t, e, i, r) {
  const { caretSize: s, caretPadding: o, cornerRadius: a } = t, { xAlign: n, yAlign: l } = i, d = s + o, { topLeft: c, topRight: h, bottomLeft: u, bottomRight: g } = kt(a);
  let f = Hf(e, n);
  const _ = Ff(e, l, d);
  return l === "center" ? n === "left" ? f += d : n === "right" && (f -= d) : n === "left" ? f -= Math.max(c, u) + s : n === "right" && (f += Math.max(h, g) + s), {
    x: pe(f, 0, r.width - e.width),
    y: pe(_, 0, r.height - e.height)
  };
}
function ji(t, e, i) {
  const r = xe(i.padding);
  return e === "center" ? t.x + t.width / 2 : e === "right" ? t.x + t.width - r.right : t.x + r.left;
}
function Rn(t) {
  return Ge([], Ze(t));
}
function jf(t, e, i) {
  return ht(t, {
    tooltip: e,
    tooltipItems: i,
    type: "tooltip"
  });
}
function In(t, e) {
  const i = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return i ? t.override(i) : t;
}
const wl = {
  beforeTitle: Ye,
  title(t) {
    if (t.length > 0) {
      const e = t[0], i = e.chart.data.labels, r = i ? i.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return e.dataset.label || "";
      if (e.label)
        return e.label;
      if (r > 0 && e.dataIndex < r)
        return i[e.dataIndex];
    }
    return "";
  },
  afterTitle: Ye,
  beforeBody: Ye,
  beforeLabel: Ye,
  label(t) {
    if (this && this.options && this.options.mode === "dataset")
      return t.label + ": " + t.formattedValue || t.formattedValue;
    let e = t.dataset.label || "";
    e && (e += ": ");
    const i = t.formattedValue;
    return X(i) || (e += i), e;
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
  afterLabel: Ye,
  afterBody: Ye,
  beforeFooter: Ye,
  footer: Ye,
  afterFooter: Ye
};
function Ce(t, e, i, r) {
  const s = t[e].call(i, r);
  return typeof s > "u" ? wl[e].call(i, r) : s;
}
class Ss extends je {
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
    const i = this.chart, r = this.options.setContext(this.getContext()), s = r.enabled && i.options.animation && r.animations, o = new el(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = jf(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, i) {
    const { callbacks: r } = i, s = Ce(r, "beforeTitle", this, e), o = Ce(r, "title", this, e), a = Ce(r, "afterTitle", this, e);
    let n = [];
    return n = Ge(n, Ze(s)), n = Ge(n, Ze(o)), n = Ge(n, Ze(a)), n;
  }
  getBeforeBody(e, i) {
    return Rn(Ce(i.callbacks, "beforeBody", this, e));
  }
  getBody(e, i) {
    const { callbacks: r } = i, s = [];
    return re(e, (o) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, n = In(r, o);
      Ge(a.before, Ze(Ce(n, "beforeLabel", this, o))), Ge(a.lines, Ce(n, "label", this, o)), Ge(a.after, Ze(Ce(n, "afterLabel", this, o))), s.push(a);
    }), s;
  }
  getAfterBody(e, i) {
    return Rn(Ce(i.callbacks, "afterBody", this, e));
  }
  getFooter(e, i) {
    const { callbacks: r } = i, s = Ce(r, "beforeFooter", this, e), o = Ce(r, "footer", this, e), a = Ce(r, "afterFooter", this, e);
    let n = [];
    return n = Ge(n, Ze(s)), n = Ge(n, Ze(o)), n = Ge(n, Ze(a)), n;
  }
  _createItems(e) {
    const i = this._active, r = this.chart.data, s = [], o = [], a = [];
    let n = [], l, d;
    for (l = 0, d = i.length; l < d; ++l)
      n.push(Rf(this.chart, i[l]));
    return e.filter && (n = n.filter((c, h, u) => e.filter(c, h, u, r))), e.itemSort && (n = n.sort((c, h) => e.itemSort(c, h, r))), re(n, (c) => {
      const h = In(e.callbacks, c);
      s.push(Ce(h, "labelColor", this, c)), o.push(Ce(h, "labelPointStyle", this, c)), a.push(Ce(h, "labelTextColor", this, c));
    }), this.labelColors = s, this.labelPointStyles = o, this.labelTextColors = a, this.dataPoints = n, n;
  }
  update(e, i) {
    const r = this.options.setContext(this.getContext()), s = this._active;
    let o, a = [];
    if (!s.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const n = ii[r.position].call(this, s, this._eventPosition);
      a = this._createItems(r), this.title = this.getTitle(a, r), this.beforeBody = this.getBeforeBody(a, r), this.body = this.getBody(a, r), this.afterBody = this.getAfterBody(a, r), this.footer = this.getFooter(a, r);
      const l = this._size = Tn(this, r), d = Object.assign({}, n, l), c = zn(this.chart, r, d), h = On(r, d, c, this.chart);
      this.xAlign = c.xAlign, this.yAlign = c.yAlign, o = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: l.width,
        height: l.height,
        caretX: n.x,
        caretY: n.y
      };
    }
    this._tooltipItems = a, this.$context = void 0, o && this._resolveAnimations().update(this, o), e && r.external && r.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: i
    });
  }
  drawCaret(e, i, r, s) {
    const o = this.getCaretPosition(e, r, s);
    i.lineTo(o.x1, o.y1), i.lineTo(o.x2, o.y2), i.lineTo(o.x3, o.y3);
  }
  getCaretPosition(e, i, r) {
    const { xAlign: s, yAlign: o } = this, { caretSize: a, cornerRadius: n } = r, { topLeft: l, topRight: d, bottomLeft: c, bottomRight: h } = kt(n), { x: u, y: g } = e, { width: f, height: _ } = i;
    let p, y, v, x, L, k;
    return o === "center" ? (L = g + _ / 2, s === "left" ? (p = u, y = p - a, x = L + a, k = L - a) : (p = u + f, y = p + a, x = L - a, k = L + a), v = p) : (s === "left" ? y = u + Math.max(l, c) + a : s === "right" ? y = u + f - Math.max(d, h) - a : y = this.caretX, o === "top" ? (x = g, L = x - a, p = y - a, v = y + a) : (x = g + _, L = x + a, p = y + a, v = y - a), k = x), {
      x1: p,
      x2: y,
      x3: v,
      y1: x,
      y2: L,
      y3: k
    };
  }
  drawTitle(e, i, r) {
    const s = this.title, o = s.length;
    let a, n, l;
    if (o) {
      const d = Ot(r.rtl, this.x, this.width);
      for (e.x = ji(this, r.titleAlign, r), i.textAlign = d.textAlign(r.titleAlign), i.textBaseline = "middle", a = fe(r.titleFont), n = r.titleSpacing, i.fillStyle = r.titleColor, i.font = a.string, l = 0; l < o; ++l)
        i.fillText(s[l], d.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + n, l + 1 === o && (e.y += r.titleMarginBottom - n);
    }
  }
  _drawColorBox(e, i, r, s, o) {
    const a = this.labelColors[r], n = this.labelPointStyles[r], { boxHeight: l, boxWidth: d } = o, c = fe(o.bodyFont), h = ji(this, "left", o), u = s.x(h), g = l < c.lineHeight ? (c.lineHeight - l) / 2 : 0, f = i.y + g;
    if (o.usePointStyle) {
      const _ = {
        radius: Math.min(d, l) / 2,
        pointStyle: n.pointStyle,
        rotation: n.rotation,
        borderWidth: 1
      }, p = s.leftForLtr(u, d) + d / 2, y = f + l / 2;
      e.strokeStyle = o.multiKeyBackground, e.fillStyle = o.multiKeyBackground, ms(e, _, p, y), e.strokeStyle = a.borderColor, e.fillStyle = a.backgroundColor, ms(e, _, p, y);
    } else {
      e.lineWidth = Z(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, e.strokeStyle = a.borderColor, e.setLineDash(a.borderDash || []), e.lineDashOffset = a.borderDashOffset || 0;
      const _ = s.leftForLtr(u, d), p = s.leftForLtr(s.xPlus(u, 1), d - 2), y = kt(a.borderRadius);
      Object.values(y).some((v) => v !== 0) ? (e.beginPath(), e.fillStyle = o.multiKeyBackground, vi(e, {
        x: _,
        y: f,
        w: d,
        h: l,
        radius: y
      }), e.fill(), e.stroke(), e.fillStyle = a.backgroundColor, e.beginPath(), vi(e, {
        x: p,
        y: f + 1,
        w: d - 2,
        h: l - 2,
        radius: y
      }), e.fill()) : (e.fillStyle = o.multiKeyBackground, e.fillRect(_, f, d, l), e.strokeRect(_, f, d, l), e.fillStyle = a.backgroundColor, e.fillRect(p, f + 1, d - 2, l - 2));
    }
    e.fillStyle = this.labelTextColors[r];
  }
  drawBody(e, i, r) {
    const { body: s } = this, { bodySpacing: o, bodyAlign: a, displayColors: n, boxHeight: l, boxWidth: d, boxPadding: c } = r, h = fe(r.bodyFont);
    let u = h.lineHeight, g = 0;
    const f = Ot(r.rtl, this.x, this.width), _ = function($) {
      i.fillText($, f.x(e.x + g), e.y + u / 2), e.y += u + o;
    }, p = f.textAlign(a);
    let y, v, x, L, k, A, P;
    for (i.textAlign = a, i.textBaseline = "middle", i.font = h.string, e.x = ji(this, p, r), i.fillStyle = r.bodyColor, re(this.beforeBody, _), g = n && p !== "right" ? a === "center" ? d / 2 + c : d + 2 + c : 0, L = 0, A = s.length; L < A; ++L) {
      for (y = s[L], v = this.labelTextColors[L], i.fillStyle = v, re(y.before, _), x = y.lines, n && x.length && (this._drawColorBox(i, e, L, f, r), u = Math.max(h.lineHeight, l)), k = 0, P = x.length; k < P; ++k)
        _(x[k]), u = h.lineHeight;
      re(y.after, _);
    }
    g = 0, u = h.lineHeight, re(this.afterBody, _), e.y -= o;
  }
  drawFooter(e, i, r) {
    const s = this.footer, o = s.length;
    let a, n;
    if (o) {
      const l = Ot(r.rtl, this.x, this.width);
      for (e.x = ji(this, r.footerAlign, r), e.y += r.footerMarginTop, i.textAlign = l.textAlign(r.footerAlign), i.textBaseline = "middle", a = fe(r.footerFont), i.fillStyle = r.footerColor, i.font = a.string, n = 0; n < o; ++n)
        i.fillText(s[n], l.x(e.x), e.y + a.lineHeight / 2), e.y += a.lineHeight + r.footerSpacing;
    }
  }
  drawBackground(e, i, r, s) {
    const { xAlign: o, yAlign: a } = this, { x: n, y: l } = e, { width: d, height: c } = r, { topLeft: h, topRight: u, bottomLeft: g, bottomRight: f } = kt(s.cornerRadius);
    i.fillStyle = s.backgroundColor, i.strokeStyle = s.borderColor, i.lineWidth = s.borderWidth, i.beginPath(), i.moveTo(n + h, l), a === "top" && this.drawCaret(e, i, r, s), i.lineTo(n + d - u, l), i.quadraticCurveTo(n + d, l, n + d, l + u), a === "center" && o === "right" && this.drawCaret(e, i, r, s), i.lineTo(n + d, l + c - f), i.quadraticCurveTo(n + d, l + c, n + d - f, l + c), a === "bottom" && this.drawCaret(e, i, r, s), i.lineTo(n + g, l + c), i.quadraticCurveTo(n, l + c, n, l + c - g), a === "center" && o === "left" && this.drawCaret(e, i, r, s), i.lineTo(n, l + h), i.quadraticCurveTo(n, l, n + h, l), i.closePath(), i.fill(), s.borderWidth > 0 && i.stroke();
  }
  _updateAnimationTarget(e) {
    const i = this.chart, r = this.$animations, s = r && r.x, o = r && r.y;
    if (s || o) {
      const a = ii[e.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const n = this._size = Tn(this, e), l = Object.assign({}, a, this._size), d = zn(i, e, l), c = On(e, l, d, i);
      (s._to !== c.x || o._to !== c.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = n.width, this.height = n.height, this.caretX = a.x, this.caretY = a.y, this._resolveAnimations().update(this, c));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(e) {
    const i = this.options.setContext(this.getContext());
    let r = this.opacity;
    if (!r)
      return;
    this._updateAnimationTarget(i);
    const s = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    r = Math.abs(r) < 1e-3 ? 0 : r;
    const a = xe(i.padding), n = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    i.enabled && n && (e.save(), e.globalAlpha = r, this.drawBackground(o, e, s, i), Ya(e, i.textDirection), o.y += a.top, this.drawTitle(o, e, i), this.drawBody(o, e, i), this.drawFooter(o, e, i), Xa(e, i.textDirection), e.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e, i) {
    const r = this._active, s = e.map(({ datasetIndex: n, index: l }) => {
      const d = this.chart.getDatasetMeta(n);
      if (!d)
        throw new Error("Cannot find a dataset at index " + n);
      return {
        datasetIndex: n,
        element: d.data[l],
        index: l
      };
    }), o = !or(r, s), a = this._positionChanged(s, i);
    (o || a) && (this._active = s, this._eventPosition = i, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, i, r = !0) {
    if (i && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, o = this._active || [], a = this._getActiveElements(e, o, i, r), n = this._positionChanged(a, e), l = i || !or(a, o) || n;
    return l && (this._active = a, (s.enabled || s.external) && (this._eventPosition = {
      x: e.x,
      y: e.y
    }, this.update(!0, i))), l;
  }
  _getActiveElements(e, i, r, s) {
    const o = this.options;
    if (e.type === "mouseout")
      return [];
    if (!s)
      return i.filter((n) => this.chart.data.datasets[n.datasetIndex] && this.chart.getDatasetMeta(n.datasetIndex).controller.getParsed(n.index) !== void 0);
    const a = this.chart.getElementsAtEventForMode(e, o.mode, o, r);
    return o.reverse && a.reverse(), a;
  }
  _positionChanged(e, i) {
    const { caretX: r, caretY: s, options: o } = this, a = ii[o.position].call(this, e, i);
    return a !== !1 && (r !== a.x || s !== a.y);
  }
}
I(Ss, "positioners", ii);
var kl = {
  id: "tooltip",
  _element: Ss,
  positioners: ii,
  afterInit(t, e, i) {
    i && (t.tooltip = new Ss({
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
    callbacks: wl
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
}, Gf = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: rf,
  Decimation: af,
  Filler: Ef,
  Legend: xl,
  SubTitle: Of,
  Title: zf,
  Tooltip: kl
});
const Uf = (t, e, i, r) => (typeof e == "string" ? (i = t.push(e) - 1, r.unshift({
  index: i,
  label: e
})) : isNaN(e) && (i = null), i);
function Vf(t, e, i, r) {
  const s = t.indexOf(e);
  if (s === -1)
    return Uf(t, e, i, r);
  const o = t.lastIndexOf(e);
  return s !== o ? i : s;
}
const Wf = (t, e) => t === null ? null : pe(Math.round(t), 0, e);
function Nn(t) {
  const e = this.getLabels();
  return t >= 0 && t < e.length ? e[t] : t;
}
class As extends Mt {
  constructor(e) {
    super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(e) {
    const i = this._addedLabels;
    if (i.length) {
      const r = this.getLabels();
      for (const { index: s, label: o } of i)
        r[s] === o && r.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, i) {
    if (X(e))
      return null;
    const r = this.getLabels();
    return i = isFinite(i) && r[i] === e ? i : Vf(r, e, W(i, e), this._addedLabels), Wf(i, r.length - 1);
  }
  determineDataLimits() {
    const { minDefined: e, maxDefined: i } = this.getUserBounds();
    let { min: r, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (e || (r = 0), i || (s = this.getLabels().length - 1)), this.min = r, this.max = s;
  }
  buildTicks() {
    const e = this.min, i = this.max, r = this.options.offset, s = [];
    let o = this.getLabels();
    o = e === 0 && i === o.length - 1 ? o : o.slice(e, i + 1), this._valueRange = Math.max(o.length - (r ? 0 : 1), 1), this._startValue = this.min - (r ? 0.5 : 0);
    for (let a = e; a <= i; a++)
      s.push({
        value: a
      });
    return s;
  }
  getLabelForValue(e) {
    return Nn.call(this, e);
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
I(As, "id", "category"), I(As, "defaults", {
  ticks: {
    callback: Nn
  }
});
function Kf(t, e) {
  const i = [], { bounds: s, step: o, min: a, max: n, precision: l, count: d, maxTicks: c, maxDigits: h, includeBounds: u } = t, g = o || 1, f = c - 1, { min: _, max: p } = e, y = !X(a), v = !X(n), x = !X(d), L = (p - _) / (h + 1);
  let k = Do((p - _) / f / g) * g, A, P, $, S;
  if (k < 1e-14 && !y && !v)
    return [
      {
        value: _
      },
      {
        value: p
      }
    ];
  S = Math.ceil(p / k) - Math.floor(_ / k), S > f && (k = Do(S * k / f / g) * g), X(l) || (A = Math.pow(10, l), k = Math.ceil(k * A) / A), s === "ticks" ? (P = Math.floor(_ / k) * k, $ = Math.ceil(p / k) * k) : (P = _, $ = p), y && v && o && Hh((n - a) / o, k / 1e3) ? (S = Math.round(Math.min((n - a) / k, c)), k = (n - a) / S, P = a, $ = n) : x ? (P = y ? a : P, $ = v ? n : $, S = d - 1, k = ($ - P) / S) : (S = ($ - P) / k, ai(S, Math.round(S), k / 1e3) ? S = Math.round(S) : S = Math.ceil(S));
  const w = Math.max(To(k), To(P));
  A = Math.pow(10, X(l) ? w : l), P = Math.round(P * A) / A, $ = Math.round($ * A) / A;
  let C = 0;
  for (y && (u && P !== a ? (i.push({
    value: a
  }), P < a && C++, ai(Math.round((P + C * k) * A) / A, a, Bn(a, L, t)) && C++) : P < a && C++); C < S; ++C) {
    const m = Math.round((P + C * k) * A) / A;
    if (v && m > n)
      break;
    i.push({
      value: m
    });
  }
  return v && u && $ !== n ? i.length && ai(i[i.length - 1].value, n, Bn(n, L, t)) ? i[i.length - 1].value = n : i.push({
    value: n
  }) : (!v || $ === n) && i.push({
    value: $
  }), i;
}
function Bn(t, e, { horizontal: i, minRotation: r }) {
  const s = He(r), o = (i ? Math.sin(s) : Math.cos(s)) || 1e-3, a = 0.75 * e * ("" + t).length;
  return Math.min(e / o, a);
}
class ur extends Mt {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(e, i) {
    return X(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
  }
  handleTickRangeOptions() {
    const { beginAtZero: e } = this.options, { minDefined: i, maxDefined: r } = this.getUserBounds();
    let { min: s, max: o } = this;
    const a = (l) => s = i ? s : l, n = (l) => o = r ? o : l;
    if (e) {
      const l = Ke(s), d = Ke(o);
      l < 0 && d < 0 ? n(0) : l > 0 && d > 0 && a(0);
    }
    if (s === o) {
      let l = o === 0 ? 1 : Math.abs(o * 0.05);
      n(o + l), e || a(s - l);
    }
    this.min = s, this.max = o;
  }
  getTickLimit() {
    const e = this.options.ticks;
    let { maxTicksLimit: i, stepSize: r } = e, s;
    return r ? (s = Math.ceil(this.max / r) - Math.floor(this.min / r) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${r} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), i = i || 11), i && (s = Math.min(i, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const e = this.options, i = e.ticks;
    let r = this.getTickLimit();
    r = Math.max(2, r);
    const s = {
      maxTicks: r,
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
    }, o = this._range || this, a = Kf(s, o);
    return e.bounds === "ticks" && La(a, this, "value"), e.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
  }
  configure() {
    const e = this.ticks;
    let i = this.min, r = this.max;
    if (super.configure(), this.options.offset && e.length) {
      const s = (r - i) / Math.max(e.length - 1, 1) / 2;
      i -= s, r += s;
    }
    this._startValue = i, this._endValue = r, this._valueRange = r - i;
  }
  getLabelForValue(e) {
    return Ci(e, this.chart.options.locale, this.options.ticks.format);
  }
}
class Cs extends ur {
  determineDataLimits() {
    const { min: e, max: i } = this.getMinMax(!0);
    this.min = ue(e) ? e : 0, this.max = ue(i) ? i : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const e = this.isHorizontal(), i = e ? this.width : this.height, r = He(this.options.ticks.minRotation), s = (e ? Math.sin(r) : Math.cos(r)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(i / Math.min(40, o.lineHeight / s));
  }
  getPixelForValue(e) {
    return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
  }
}
I(Cs, "id", "linear"), I(Cs, "defaults", {
  ticks: {
    callback: pr.formatters.numeric
  }
});
const xi = (t) => Math.floor(st(t)), yt = (t, e) => Math.pow(10, xi(t) + e);
function Hn(t) {
  return t / Math.pow(10, xi(t)) === 1;
}
function Fn(t, e, i) {
  const r = Math.pow(10, i), s = Math.floor(t / r);
  return Math.ceil(e / r) - s;
}
function Yf(t, e) {
  const i = e - t;
  let r = xi(i);
  for (; Fn(t, e, r) > 10; )
    r++;
  for (; Fn(t, e, r) < 10; )
    r--;
  return Math.min(r, xi(t));
}
function Xf(t, { min: e, max: i }) {
  e = De(t.min, e);
  const r = [], s = xi(e);
  let o = Yf(e, i), a = o < 0 ? Math.pow(10, Math.abs(o)) : 1;
  const n = Math.pow(10, o), l = s > o ? Math.pow(10, s) : 0, d = Math.round((e - l) * a) / a, c = Math.floor((e - l) / n / 10) * n * 10;
  let h = Math.floor((d - c) / Math.pow(10, o)), u = De(t.min, Math.round((l + c + h * Math.pow(10, o)) * a) / a);
  for (; u < i; )
    r.push({
      value: u,
      major: Hn(u),
      significand: h
    }), h >= 10 ? h = h < 15 ? 15 : 20 : h++, h >= 20 && (o++, h = 2, a = o >= 0 ? 1 : a), u = Math.round((l + c + h * Math.pow(10, o)) * a) / a;
  const g = De(t.max, u);
  return r.push({
    value: g,
    major: Hn(g),
    significand: h
  }), r;
}
class Es extends Mt {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(e, i) {
    const r = ur.prototype.parse.apply(this, [
      e,
      i
    ]);
    if (r === 0) {
      this._zero = !0;
      return;
    }
    return ue(r) && r > 0 ? r : null;
  }
  determineDataLimits() {
    const { min: e, max: i } = this.getMinMax(!0);
    this.min = ue(e) ? Math.max(0, e) : null, this.max = ue(i) ? Math.max(0, i) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !ue(this._userMin) && (this.min = e === yt(this.min, 0) ? yt(this.min, -1) : yt(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: e, maxDefined: i } = this.getUserBounds();
    let r = this.min, s = this.max;
    const o = (n) => r = e ? r : n, a = (n) => s = i ? s : n;
    r === s && (r <= 0 ? (o(1), a(10)) : (o(yt(r, -1)), a(yt(s, 1)))), r <= 0 && o(yt(s, -1)), s <= 0 && a(yt(r, 1)), this.min = r, this.max = s;
  }
  buildTicks() {
    const e = this.options, i = {
      min: this._userMin,
      max: this._userMax
    }, r = Xf(i, this);
    return e.bounds === "ticks" && La(r, this, "value"), e.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r;
  }
  getLabelForValue(e) {
    return e === void 0 ? "0" : Ci(e, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const e = this.min;
    super.configure(), this._startValue = st(e), this._valueRange = st(this.max) - st(e);
  }
  getPixelForValue(e) {
    return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (st(e) - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    const i = this.getDecimalForPixel(e);
    return Math.pow(10, this._startValue + i * this._valueRange);
  }
}
I(Es, "id", "logarithmic"), I(Es, "defaults", {
  ticks: {
    callback: pr.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
});
function Ps(t) {
  const e = t.ticks;
  if (e.display && t.display) {
    const i = xe(e.backdropPadding);
    return W(e.font && e.font.size, de.font.size) + i.height;
  }
  return 0;
}
function Zf(t, e, i) {
  return i = le(i) ? i : [
    i
  ], {
    w: ru(t, e.string, i),
    h: i.length * e.lineHeight
  };
}
function jn(t, e, i, r, s) {
  return t === r || t === s ? {
    start: e - i / 2,
    end: e + i / 2
  } : t < r || t > s ? {
    start: e - i,
    end: e
  } : {
    start: e,
    end: e + i
  };
}
function qf(t) {
  const e = {
    l: t.left + t._padding.left,
    r: t.right - t._padding.right,
    t: t.top + t._padding.top,
    b: t.bottom - t._padding.bottom
  }, i = Object.assign({}, e), r = [], s = [], o = t._pointLabels.length, a = t.options.pointLabels, n = a.centerPointLabels ? ee / o : 0;
  for (let l = 0; l < o; l++) {
    const d = a.setContext(t.getPointLabelContext(l));
    s[l] = d.padding;
    const c = t.getPointPosition(l, t.drawingArea + s[l], n), h = fe(d.font), u = Zf(t.ctx, h, t._pointLabels[l]);
    r[l] = u;
    const g = ve(t.getIndexAngle(l) + n), f = Math.round(Is(g)), _ = jn(f, c.x, u.w, 0, 180), p = jn(f, c.y, u.h, 90, 270);
    Jf(i, e, g, _, p);
  }
  t.setCenterPoint(e.l - i.l, i.r - e.r, e.t - i.t, i.b - e.b), t._pointLabelItems = tp(t, r, s);
}
function Jf(t, e, i, r, s) {
  const o = Math.abs(Math.sin(i)), a = Math.abs(Math.cos(i));
  let n = 0, l = 0;
  r.start < e.l ? (n = (e.l - r.start) / o, t.l = Math.min(t.l, e.l - n)) : r.end > e.r && (n = (r.end - e.r) / o, t.r = Math.max(t.r, e.r + n)), s.start < e.t ? (l = (e.t - s.start) / a, t.t = Math.min(t.t, e.t - l)) : s.end > e.b && (l = (s.end - e.b) / a, t.b = Math.max(t.b, e.b + l));
}
function Qf(t, e, i) {
  const r = t.drawingArea, { extra: s, additionalAngle: o, padding: a, size: n } = i, l = t.getPointPosition(e, r + s + a, o), d = Math.round(Is(ve(l.angle + ge))), c = sp(l.y, n.h, d), h = ip(d), u = rp(l.x, n.w, h);
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
function ep(t, e) {
  if (!e)
    return !0;
  const { left: i, top: r, right: s, bottom: o } = t;
  return !(et({
    x: i,
    y: r
  }, e) || et({
    x: i,
    y: o
  }, e) || et({
    x: s,
    y: r
  }, e) || et({
    x: s,
    y: o
  }, e));
}
function tp(t, e, i) {
  const r = [], s = t._pointLabels.length, o = t.options, { centerPointLabels: a, display: n } = o.pointLabels, l = {
    extra: Ps(o) / 2,
    additionalAngle: a ? ee / s : 0
  };
  let d;
  for (let c = 0; c < s; c++) {
    l.padding = i[c], l.size = e[c];
    const h = Qf(t, c, l);
    r.push(h), n === "auto" && (h.visible = ep(h, d), h.visible && (d = h));
  }
  return r;
}
function ip(t) {
  return t === 0 || t === 180 ? "center" : t < 180 ? "left" : "right";
}
function rp(t, e, i) {
  return i === "right" ? t -= e : i === "center" && (t -= e / 2), t;
}
function sp(t, e, i) {
  return i === 90 || i === 270 ? t -= e / 2 : (i > 270 || i < 90) && (t -= e), t;
}
function op(t, e, i) {
  const { left: r, top: s, right: o, bottom: a } = i, { backdropColor: n } = e;
  if (!X(n)) {
    const l = kt(e.borderRadius), d = xe(e.backdropPadding);
    t.fillStyle = n;
    const c = r - d.left, h = s - d.top, u = o - r + d.width, g = a - s + d.height;
    Object.values(l).some((f) => f !== 0) ? (t.beginPath(), vi(t, {
      x: c,
      y: h,
      w: u,
      h: g,
      radius: l
    }), t.fill()) : t.fillRect(c, h, u, g);
  }
}
function np(t, e) {
  const { ctx: i, options: { pointLabels: r } } = t;
  for (let s = e - 1; s >= 0; s--) {
    const o = t._pointLabelItems[s];
    if (!o.visible)
      continue;
    const a = r.setContext(t.getPointLabelContext(s));
    op(i, a, o);
    const n = fe(a.font), { x: l, y: d, textAlign: c } = o;
    Pt(i, t._pointLabels[s], l, d + n.lineHeight / 2, n, {
      color: a.color,
      textAlign: c,
      textBaseline: "middle"
    });
  }
}
function Sl(t, e, i, r) {
  const { ctx: s } = t;
  if (i)
    s.arc(t.xCenter, t.yCenter, e, 0, oe);
  else {
    let o = t.getPointPosition(0, e);
    s.moveTo(o.x, o.y);
    for (let a = 1; a < r; a++)
      o = t.getPointPosition(a, e), s.lineTo(o.x, o.y);
  }
}
function ap(t, e, i, r, s) {
  const o = t.ctx, a = e.circular, { color: n, lineWidth: l } = e;
  !a && !r || !n || !l || i < 0 || (o.save(), o.strokeStyle = n, o.lineWidth = l, o.setLineDash(s.dash || []), o.lineDashOffset = s.dashOffset, o.beginPath(), Sl(t, i, a, r), o.closePath(), o.stroke(), o.restore());
}
function lp(t, e, i) {
  return ht(t, {
    label: i,
    index: e,
    type: "pointLabel"
  });
}
class ri extends ur {
  constructor(e) {
    super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const e = this._padding = xe(Ps(this.options) / 2), i = this.width = this.maxWidth - e.width, r = this.height = this.maxHeight - e.height;
    this.xCenter = Math.floor(this.left + i / 2 + e.left), this.yCenter = Math.floor(this.top + r / 2 + e.top), this.drawingArea = Math.floor(Math.min(i, r) / 2);
  }
  determineDataLimits() {
    const { min: e, max: i } = this.getMinMax(!1);
    this.min = ue(e) && !isNaN(e) ? e : 0, this.max = ue(i) && !isNaN(i) ? i : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / Ps(this.options));
  }
  generateTickLabels(e) {
    ur.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((i, r) => {
      const s = se(this.options.pointLabels.callback, [
        i,
        r
      ], this);
      return s || s === 0 ? s : "";
    }).filter((i, r) => this.chart.getDataVisibility(r));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? qf(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(e, i, r, s) {
    this.xCenter += Math.floor((e - i) / 2), this.yCenter += Math.floor((r - s) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, i, r, s));
  }
  getIndexAngle(e) {
    const i = oe / (this._pointLabels.length || 1), r = this.options.startAngle || 0;
    return ve(e * i + He(r));
  }
  getDistanceFromCenterForValue(e) {
    if (X(e))
      return NaN;
    const i = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - e) * i : (e - this.min) * i;
  }
  getValueForDistanceFromCenter(e) {
    if (X(e))
      return NaN;
    const i = e / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - i : this.min + i;
  }
  getPointLabelContext(e) {
    const i = this._pointLabels || [];
    if (e >= 0 && e < i.length) {
      const r = i[e];
      return lp(this.getContext(), e, r);
    }
  }
  getPointPosition(e, i, r = 0) {
    const s = this.getIndexAngle(e) - ge + r;
    return {
      x: Math.cos(s) * i + this.xCenter,
      y: Math.sin(s) * i + this.yCenter,
      angle: s
    };
  }
  getPointPositionForValue(e, i) {
    return this.getPointPosition(e, this.getDistanceFromCenterForValue(i));
  }
  getBasePosition(e) {
    return this.getPointPositionForValue(e || 0, this.getBaseValue());
  }
  getPointLabelPosition(e) {
    const { left: i, top: r, right: s, bottom: o } = this._pointLabelItems[e];
    return {
      left: i,
      top: r,
      right: s,
      bottom: o
    };
  }
  drawBackground() {
    const { backgroundColor: e, grid: { circular: i } } = this.options;
    if (e) {
      const r = this.ctx;
      r.save(), r.beginPath(), Sl(this, this.getDistanceFromCenterForValue(this._endValue), i, this._pointLabels.length), r.closePath(), r.fillStyle = e, r.fill(), r.restore();
    }
  }
  drawGrid() {
    const e = this.ctx, i = this.options, { angleLines: r, grid: s, border: o } = i, a = this._pointLabels.length;
    let n, l, d;
    if (i.pointLabels.display && np(this, a), s.display && this.ticks.forEach((c, h) => {
      if (h !== 0 || h === 0 && this.min < 0) {
        l = this.getDistanceFromCenterForValue(c.value);
        const u = this.getContext(h), g = s.setContext(u), f = o.setContext(u);
        ap(this, g, l, a, f);
      }
    }), r.display) {
      for (e.save(), n = a - 1; n >= 0; n--) {
        const c = r.setContext(this.getPointLabelContext(n)), { color: h, lineWidth: u } = c;
        !u || !h || (e.lineWidth = u, e.strokeStyle = h, e.setLineDash(c.borderDash), e.lineDashOffset = c.borderDashOffset, l = this.getDistanceFromCenterForValue(i.reverse ? this.min : this.max), d = this.getPointPosition(n, l), e.beginPath(), e.moveTo(this.xCenter, this.yCenter), e.lineTo(d.x, d.y), e.stroke());
      }
      e.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const e = this.ctx, i = this.options, r = i.ticks;
    if (!r.display)
      return;
    const s = this.getIndexAngle(0);
    let o, a;
    e.save(), e.translate(this.xCenter, this.yCenter), e.rotate(s), e.textAlign = "center", e.textBaseline = "middle", this.ticks.forEach((n, l) => {
      if (l === 0 && this.min >= 0 && !i.reverse)
        return;
      const d = r.setContext(this.getContext(l)), c = fe(d.font);
      if (o = this.getDistanceFromCenterForValue(this.ticks[l].value), d.showLabelBackdrop) {
        e.font = c.string, a = e.measureText(n.label).width, e.fillStyle = d.backdropColor;
        const h = xe(d.backdropPadding);
        e.fillRect(-a / 2 - h.left, -o - c.size / 2 - h.top, a + h.width, c.size + h.height);
      }
      Pt(e, n.label, 0, -o, c, {
        color: d.color,
        strokeColor: d.textStrokeColor,
        strokeWidth: d.textStrokeWidth
      });
    }), e.restore();
  }
  drawTitle() {
  }
}
I(ri, "id", "radialLinear"), I(ri, "defaults", {
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
    callback: pr.formatters.numeric
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
}), I(ri, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}), I(ri, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
const wr = {
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
}, $e = /* @__PURE__ */ Object.keys(wr);
function Gn(t, e) {
  return t - e;
}
function Un(t, e) {
  if (X(e))
    return null;
  const i = t._adapter, { parser: r, round: s, isoWeekday: o } = t._parseOpts;
  let a = e;
  return typeof r == "function" && (a = r(a)), ue(a) || (a = typeof r == "string" ? i.parse(a, r) : i.parse(a)), a === null ? null : (s && (a = s === "week" && (Ht(o) || o === !0) ? i.startOf(a, "isoWeek", o) : i.startOf(a, s)), +a);
}
function Vn(t, e, i, r) {
  const s = $e.length;
  for (let o = $e.indexOf(t); o < s - 1; ++o) {
    const a = wr[$e[o]], n = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((i - e) / (n * a.size)) <= r)
      return $e[o];
  }
  return $e[s - 1];
}
function dp(t, e, i, r, s) {
  for (let o = $e.length - 1; o >= $e.indexOf(i); o--) {
    const a = $e[o];
    if (wr[a].common && t._adapter.diff(s, r, a) >= e - 1)
      return a;
  }
  return $e[i ? $e.indexOf(i) : 0];
}
function cp(t) {
  for (let e = $e.indexOf(t) + 1, i = $e.length; e < i; ++e)
    if (wr[$e[e]].common)
      return $e[e];
}
function Wn(t, e, i) {
  if (!i)
    t[e] = !0;
  else if (i.length) {
    const { lo: r, hi: s } = Ns(i, e), o = i[r] >= e ? i[r] : i[s];
    t[o] = !0;
  }
}
function hp(t, e, i, r) {
  const s = t._adapter, o = +s.startOf(e[0].value, r), a = e[e.length - 1].value;
  let n, l;
  for (n = o; n <= a; n = +s.add(n, 1, r))
    l = i[n], l >= 0 && (e[l].major = !0);
  return e;
}
function Kn(t, e, i) {
  const r = [], s = {}, o = e.length;
  let a, n;
  for (a = 0; a < o; ++a)
    n = e[a], s[n] = a, r.push({
      value: n,
      major: !1
    });
  return o === 0 || !i ? r : hp(t, r, s, i);
}
class wi extends Mt {
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, i = {}) {
    const r = e.time || (e.time = {}), s = this._adapter = new bg._date(e.adapters.date);
    s.init(i), ni(r.displayFormats, s.formats()), this._parseOpts = {
      parser: r.parser,
      round: r.round,
      isoWeekday: r.isoWeekday
    }, super.init(e), this._normalized = i.normalized;
  }
  parse(e, i) {
    return e === void 0 ? null : Un(this, e);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const e = this.options, i = this._adapter, r = e.time.unit || "day";
    let { min: s, max: o, minDefined: a, maxDefined: n } = this.getUserBounds();
    function l(d) {
      !a && !isNaN(d.min) && (s = Math.min(s, d.min)), !n && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!a || !n) && (l(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && l(this.getMinMax(!1))), s = ue(s) && !isNaN(s) ? s : +i.startOf(Date.now(), r), o = ue(o) && !isNaN(o) ? o : +i.endOf(Date.now(), r) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o);
  }
  _getLabelBounds() {
    const e = this.getLabelTimestamps();
    let i = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY;
    return e.length && (i = e[0], r = e[e.length - 1]), {
      min: i,
      max: r
    };
  }
  buildTicks() {
    const e = this.options, i = e.time, r = e.ticks, s = r.source === "labels" ? this.getLabelTimestamps() : this._generate();
    e.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const o = this.min, a = this.max, n = Uh(s, o, a);
    return this._unit = i.unit || (r.autoSkip ? Vn(i.minUnit, this.min, this.max, this._getLabelCapacity(o)) : dp(this, n.length, i.minUnit, this.min, this.max)), this._majorUnit = !r.major.enabled || this._unit === "year" ? void 0 : cp(this._unit), this.initOffsets(s), e.reverse && n.reverse(), Kn(this, n, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let i = 0, r = 0, s, o;
    this.options.offset && e.length && (s = this.getDecimalForValue(e[0]), e.length === 1 ? i = 1 - s : i = (this.getDecimalForValue(e[1]) - s) / 2, o = this.getDecimalForValue(e[e.length - 1]), e.length === 1 ? r = o : r = (o - this.getDecimalForValue(e[e.length - 2])) / 2);
    const a = e.length < 3 ? 0.5 : 0.25;
    i = pe(i, 0, a), r = pe(r, 0, a), this._offsets = {
      start: i,
      end: r,
      factor: 1 / (i + 1 + r)
    };
  }
  _generate() {
    const e = this._adapter, i = this.min, r = this.max, s = this.options, o = s.time, a = o.unit || Vn(o.minUnit, i, r, this._getLabelCapacity(i)), n = W(s.ticks.stepSize, 1), l = a === "week" ? o.isoWeekday : !1, d = Ht(l) || l === !0, c = {};
    let h = i, u, g;
    if (d && (h = +e.startOf(h, "isoWeek", l)), h = +e.startOf(h, d ? "day" : a), e.diff(r, i, a) > 1e5 * n)
      throw new Error(i + " and " + r + " are too far apart with stepSize of " + n + " " + a);
    const f = s.ticks.source === "data" && this.getDataTimestamps();
    for (u = h, g = 0; u < r; u = +e.add(u, n, a), g++)
      Wn(c, u, f);
    return (u === r || s.bounds === "ticks" || g === 1) && Wn(c, u, f), Object.keys(c).sort(Gn).map((_) => +_);
  }
  getLabelForValue(e) {
    const i = this._adapter, r = this.options.time;
    return r.tooltipFormat ? i.format(e, r.tooltipFormat) : i.format(e, r.displayFormats.datetime);
  }
  format(e, i) {
    const s = this.options.time.displayFormats, o = this._unit, a = i || s[o];
    return this._adapter.format(e, a);
  }
  _tickFormatFunction(e, i, r, s) {
    const o = this.options, a = o.ticks.callback;
    if (a)
      return se(a, [
        e,
        i,
        r
      ], this);
    const n = o.time.displayFormats, l = this._unit, d = this._majorUnit, c = l && n[l], h = d && n[d], u = r[i], g = d && h && u && u.major;
    return this._adapter.format(e, s || (g ? h : c));
  }
  generateTickLabels(e) {
    let i, r, s;
    for (i = 0, r = e.length; i < r; ++i)
      s = e[i], s.label = this._tickFormatFunction(s.value, i, e);
  }
  getDecimalForValue(e) {
    return e === null ? NaN : (e - this.min) / (this.max - this.min);
  }
  getPixelForValue(e) {
    const i = this._offsets, r = this.getDecimalForValue(e);
    return this.getPixelForDecimal((i.start + r) * i.factor);
  }
  getValueForPixel(e) {
    const i = this._offsets, r = this.getDecimalForPixel(e) / i.factor - i.end;
    return this.min + r * (this.max - this.min);
  }
  _getLabelSize(e) {
    const i = this.options.ticks, r = this.ctx.measureText(e).width, s = He(this.isHorizontal() ? i.maxRotation : i.minRotation), o = Math.cos(s), a = Math.sin(s), n = this._resolveTickFontOptions(0).size;
    return {
      w: r * o + n * a,
      h: r * a + n * o
    };
  }
  _getLabelCapacity(e) {
    const i = this.options.time, r = i.displayFormats, s = r[i.unit] || r.millisecond, o = this._tickFormatFunction(e, 0, Kn(this, [
      e
    ], this._majorUnit), s), a = this._getLabelSize(o), n = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
    return n > 0 ? n : 1;
  }
  getDataTimestamps() {
    let e = this._cache.data || [], i, r;
    if (e.length)
      return e;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (i = 0, r = s.length; i < r; ++i)
      e = e.concat(s[i].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(e);
  }
  getLabelTimestamps() {
    const e = this._cache.labels || [];
    let i, r;
    if (e.length)
      return e;
    const s = this.getLabels();
    for (i = 0, r = s.length; i < r; ++i)
      e.push(Un(this, s[i]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return za(e.sort(Gn));
  }
}
I(wi, "id", "time"), I(wi, "defaults", {
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
function Gi(t, e, i) {
  let r = 0, s = t.length - 1, o, a, n, l;
  i ? (e >= t[r].pos && e <= t[s].pos && ({ lo: r, hi: s } = Qe(t, "pos", e)), { pos: o, time: n } = t[r], { pos: a, time: l } = t[s]) : (e >= t[r].time && e <= t[s].time && ({ lo: r, hi: s } = Qe(t, "time", e)), { time: o, pos: n } = t[r], { time: a, pos: l } = t[s]);
  const d = a - o;
  return d ? n + (l - n) * (e - o) / d : n;
}
class Ms extends wi {
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), i = this._table = this.buildLookupTable(e);
    this._minPos = Gi(i, this.min), this._tableRange = Gi(i, this.max) - this._minPos, super.initOffsets(e);
  }
  buildLookupTable(e) {
    const { min: i, max: r } = this, s = [], o = [];
    let a, n, l, d, c;
    for (a = 0, n = e.length; a < n; ++a)
      d = e[a], d >= i && d <= r && s.push(d);
    if (s.length < 2)
      return [
        {
          time: i,
          pos: 0
        },
        {
          time: r,
          pos: 1
        }
      ];
    for (a = 0, n = s.length; a < n; ++a)
      c = s[a + 1], l = s[a - 1], d = s[a], Math.round((c + l) / 2) !== d && o.push({
        time: d,
        pos: a / (n - 1)
      });
    return o;
  }
  _generate() {
    const e = this.min, i = this.max;
    let r = super.getDataTimestamps();
    return (!r.includes(e) || !r.length) && r.splice(0, 0, e), (!r.includes(i) || r.length === 1) && r.push(i), r.sort((s, o) => s - o);
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length)
      return e;
    const i = this.getDataTimestamps(), r = this.getLabelTimestamps();
    return i.length && r.length ? e = this.normalize(i.concat(r)) : e = i.length ? i : r, e = this._cache.all = e, e;
  }
  getDecimalForValue(e) {
    return (Gi(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const i = this._offsets, r = this.getDecimalForPixel(e) / i.factor - i.end;
    return Gi(this._table, r * this._tableRange + this._minPos, !0);
  }
}
I(Ms, "id", "timeseries"), I(Ms, "defaults", wi.defaults);
var up = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: As,
  LinearScale: Cs,
  LogarithmicScale: Es,
  RadialLinearScale: ri,
  TimeScale: wi,
  TimeSeriesScale: Ms
});
const gp = [
  vg,
  X_,
  Gf,
  up
];
Ve.register(...gp);
Ve.register(Tt, ot, kl, xl);
const Yn = oh;
class _p extends zt {
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
    colors: r = j.levels_colors,
    emptyColor: s = j.levels_empty_color,
    gapColor: o = j.levels_gap_color,
    thickness: a = j.levels_thickness,
    gap: n = j.levels_gap,
    size: l = 100
  }, d = "default", c = 0, h = i, u = null, g = !0) {
    var _, p, y;
    const f = `chart-${d}-${c}-${i}`;
    return B`
      <div
        id="${f}"
        class="level-circle"
        style="display: inline-block; width: ${l}px; height: ${l}px; position: relative;${g && u ? " cursor: pointer;" : ""}"
        data-level="${i}"
        data-display-level="${h}"
        data-colors="${JSON.stringify(r)}"
        data-empty-color="${s}"
        data-gap-color="${o}"
        data-thickness="${a}"
        data-gap="${n}"
        data-size="${l}"
        data-show-value="${this.config && this.config.show_value_numeric_in_circle}"
        data-font-weight="${((_ = this.config) == null ? void 0 : _.levels_text_weight) || "normal"}"
        data-font-size-ratio="${((p = this.config) == null ? void 0 : p.levels_text_size) || 0.2}"
        data-text-color="${((y = this.config) == null ? void 0 : y.levels_text_color) || "var(--primary-text-color)"}"
        @click=${(v) => {
      g && u && (v.stopPropagation(), this._openEntity(u));
    }}
      ></div>
    `;
  }
  _openEntity(i) {
    const r = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: i }
    });
    this.dispatchEvent(r);
  }
  /**
   * Build or refresh all level-circle charts in the current DOM.
   * Chart options are stored as data attributes so charts can be
   * reconstructed after the DOM is cloned or replaced.
   */
  _rebuildCharts() {
    var s;
    const i = ((s = this.renderRoot) == null ? void 0 : s.querySelectorAll(".level-circle")) || [], r = /* @__PURE__ */ new Set();
    i.forEach((o) => {
      r.add(o.id);
      const a = Number(o.dataset.level || 0), n = Number(o.dataset.displayLevel ?? a), l = JSON.parse(o.dataset.colors || "[]"), d = l.length, c = Math.min(a, d), h = o.dataset.emptyColor, u = o.dataset.gapColor, g = Number(o.dataset.thickness), f = Number(o.dataset.gap), _ = Number(o.dataset.size), p = o.dataset.showValue === "true", y = o.dataset.fontWeight || "normal", v = parseFloat(o.dataset.fontSizeRatio) || 0.2, x = o.dataset.textColor || "var(--primary-text-color)";
      let L = this._chartCache.get(o.id);
      const k = o.querySelector(".level-value-text");
      if (k && k.remove(), !L || !o.contains(L.canvas)) {
        L && L.destroy(), o.innerHTML = "";
        const A = document.createElement("canvas");
        A.width = _, A.height = _, o.appendChild(A);
        const P = Array(d).fill(1), $ = Array(d).fill(h).map((w, C) => C < c ? l[C] : h), S = Array(d).fill(u);
        L = new Ve(A.getContext("2d"), {
          type: "doughnut",
          data: {
            labels: Array(d).fill(""),
            datasets: [
              {
                data: P,
                backgroundColor: $,
                borderColor: S,
                borderWidth: f
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
        }), this._chartCache.set(o.id, L);
      } else {
        const A = L.data.datasets;
        if (A && A[0]) {
          const P = Array(A[0].backgroundColor.length).fill(h).map(($, S) => S < c ? l[S] : h);
          A[0].backgroundColor = P, L.update("none");
        }
      }
      if (p) {
        const A = document.createElement("div");
        A.className = "level-value-text", A.textContent = n, A.style.position = "absolute", A.style.top = "50%", A.style.left = "50%", A.style.transform = "translate(-50%, -50%)", A.style.fontSize = `${_ * v}px`, A.style.fontWeight = y, A.style.color = x, _ < 42 && (A.style.lineHeight = "1", A.style.height = "1em"), o.appendChild(A);
      }
    }), this._chartCache.forEach((o, a) => {
      r.has(a) || (o.destroy(), this._chartCache.delete(a));
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
  _updateSensorsAndColumns(i, r, s) {
    this.debug && (this.d_sensors = i, this.d_availableSensors = r, console.debug(
      "[Card] _updateSensorsAndColumns called with",
      r.length,
      "available sensors"
    ));
    let o = 0;
    if (s.show_empty_days)
      o = s.days_to_show;
    else {
      const l = i.find((d) => d.days && d.days.length > 0);
      l && (o = Math.min(l.days.length, s.days_to_show));
    }
    const a = Array.from({ length: o }, (l, d) => d);
    (!this._isLoaded || !Se(this.sensors, i) || this._availableSensorCount !== r.length || this.days_to_show !== o || !Se(this.displayCols, a)) && (this.sensors = i, this._availableSensorCount = r.length, this.days_to_show = o, this.displayCols = a, this._isLoaded = !0, this._error = null, this.debug && (console.debug("Days to show:", this.days_to_show), console.debug("Display columns:", this.displayCols), console.debug(
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
  _getStaleStatus() {
    var n, l, d, c, h;
    if (((n = this.config) == null ? void 0 : n.integration) !== "peu")
      return { hasStale: !1, allStale: !1, staleSince: null };
    if (this.sensors && this.sensors.length > 0) {
      const u = this.sensors.filter((p) => p.stale === !0), g = u.length === this.sensors.length, f = u.length > 0, _ = ((l = u[0]) == null ? void 0 : l.staleSince) || null;
      return { hasStale: f, allStale: g, staleSince: _ };
    }
    if (!this._hass)
      return { hasStale: !1, allStale: !1, staleSince: null };
    const i = Object.keys(this._hass.states).filter(
      (u) => u.startsWith("sensor.polleninformation_")
    );
    if (!i.length)
      return { hasStale: !1, allStale: !1, staleSince: null };
    let r = this.config.location === "manual" ? "" : this.config.location;
    if (!r && this.config.location !== "manual") {
      const u = i[0].match(/^sensor\.polleninformation_(.+)_[^_]+$/);
      r = u ? u[1] : "";
    }
    if (!r)
      return { hasStale: !1, allStale: !1, staleSince: null };
    let s = 0, o = 0, a = null;
    for (const u of i) {
      const g = this._hass.states[u];
      ((d = g == null ? void 0 : g.attributes) == null ? void 0 : d.location_slug) === r && (o++, ((c = g == null ? void 0 : g.attributes) == null ? void 0 : c.data_stale) === !0 && (s++, a || (a = ((h = g == null ? void 0 : g.attributes) == null ? void 0 : h.stale_since) || null)));
    }
    return {
      hasStale: s > 0,
      allStale: o > 0 && s === o,
      staleSince: a
    };
  }
  _subscribeForecastIfNeeded() {
    var i, r, s, o;
    if (!(!this.config || !this._hass) && (this._forecastUnsub && (Promise.resolve(this._forecastUnsub).then((a) => {
      typeof a == "function" && a();
    }), this._forecastUnsub = null), this.config.integration === "silam" && this.config.location)) {
      const a = this.config.location.toLowerCase(), n = ((r = (i = this.config) == null ? void 0 : i.date_locale) == null ? void 0 : r.split("-")[0]) || "en", l = ((s = ce.weather_suffixes) == null ? void 0 : s[n]) || ((o = ce.weather_suffixes) == null ? void 0 : o.en) || [];
      if (this.debug) {
        const h = Object.keys(this._hass.states).filter(
          (u) => typeof u == "string" && u.startsWith("weather.silam_pollen_")
        );
        console.debug(
          "[Card][Debug] Alla weather-entities i hass.states:",
          h
        ), console.debug("[Card][Debug] locationSlug:", a), console.debug("[Card][Debug] Suffixes:", l);
      }
      const d = ya(this._hass, a, n);
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
      const i = Yn[this.config.integration] || Jr;
      this._isLoaded = !1, i.fetchForecast(this._hass, this.config, this._forecastEvent).then((r) => {
        const s = So(
          this.config,
          this._hass,
          this.debug
        );
        this._updateSensorsAndColumns(r, s, this.config);
      }).catch((r) => {
        console.error("[Card] Error fetching SILAM forecast:", r), this.debug && console.debug("[Card] SILAM fetch error:", r), this._isLoaded = !0, this.requestUpdate();
      });
    }
  }
  get debug() {
    return !!(this.config && this.config.debug);
  }
  get _lang() {
    var i;
    return Ee(this._hass, (i = this.config) == null ? void 0 : i.date_locale);
  }
  _t(i) {
    return Y(i, this._lang);
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
  _getImageSrc(i, r) {
    const s = Number(r);
    let o = s, a = -1, n = 6;
    this.config.integration === "dwd" ? (o = s * 2, n = 6) : this.config.integration === "peu" || this.config.integration === "kleenex" ? (o = s, n = 4, a = 0) : this.config.integration === "plu" && (o = s, n = 3, a = 0);
    let l = Math.round(o);
    (isNaN(l) || l < a) && (l = a), l > n && (l = n);
    const d = Oe[i] || i;
    let c = Mr[`${d}_${l}_png`];
    if (!c && Mi[i]) {
      const h = Mi[i];
      c = Mr[`${h}_${l}_png`];
    }
    return c || Mr[`${l}_png`];
  }
  /**
   * Gets the SVG key for an allergen, using the same logic as PNG system
   * @param {string} allergenReplaced - The allergen identifier
   * @returns {string|null} The key to use for SVG loading, or null if invalid
   */
  _getSvgKey(i) {
    if (!i || typeof i != "string")
      return this.debug && console.warn("[SVG] Invalid allergenReplaced:", i), null;
    const r = Oe[i] || i;
    if (Lr(r))
      return r;
    if (Mi[i]) {
      const s = Mi[i];
      if (Lr(s))
        return s;
    }
    return r;
  }
  /**
   * Gets color for a specific level for allergen icons
   * @param {number} level - The pollen level (0-6 or 0-4 depending on integration)
   * @param {string} allergenKey - Optional allergen key for special handling
   * @returns {string} Color hex string
   */
  _colorForLevel(i, r = null) {
    var a, n, l;
    if (r === "no_allergens")
      return ((a = this.config) == null ? void 0 : a.no_allergens_color) || j.no_allergens_color;
    if (((n = this.config) == null ? void 0 : n.allergen_color_mode) === "custom" && ((l = this.config) != null && l.allergen_colors)) {
      const d = this.config.allergen_colors, c = Math.max(0, Math.min(i, d.length - 1));
      return d[c] || d[0];
    }
    const s = j.allergen_colors, o = Math.max(0, Math.min(i, s.length - 1));
    return s[o] || s[0];
  }
  /**
   * Gets color for level circles (charts) - may inherit from allergen colors
   * Note: Level circles don't use specific allergen keys, so we pass null
   * @param {number} level - The pollen level (0-6 or 0-4 depending on integration)
   * @returns {string} Color hex string
   */
  _levelColorForLevel(i) {
    var a, n, l;
    if (((a = this.config) == null ? void 0 : a.levels_inherit_mode) !== "custom")
      return this._colorForLevel(i, null);
    if (i === 0)
      return ((n = this.config) == null ? void 0 : n.levels_empty_color) || j.levels_empty_color;
    const r = ((l = this.config) == null ? void 0 : l.levels_colors) || j.levels_colors, s = i - 1, o = Math.max(0, Math.min(s, r.length - 1));
    return r[o] || r[0];
  }
  /**
   * Determines the appropriate gap color based on inheritance mode
   * @returns {string} The gap color to use
   */
  _getGapColor() {
    var i;
    return ((i = this.config) == null ? void 0 : i.levels_inherit_mode) !== "custom" ? this.config.allergen_outline_color ?? j.levels_gap_color : this.config.levels_gap_color ?? "var(--card-background-color)";
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
  _renderAllergenSvg(i, r, s = {}) {
    var _, p, y;
    if (!i || typeof i != "string")
      return this.debug && console.warn("[SVG] Cannot render SVG with invalid key:", i), B`
        <div class="pp-icon pp-icon-error" aria-hidden="true">
          <div style="background: #ff0000; color: white; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px;">?</div>
        </div>
      `;
    const { onClick: o, clickable: a = !1, stale: n = !1 } = s, l = n ? "#e6a800" : this._colorForLevel(r, i), d = ((_ = this.config) == null ? void 0 : _.allergen_outline_color) || j.levels_gap_color, c = ((p = this.config) == null ? void 0 : p.allergen_stroke_width) ?? j.allergen_stroke_width, h = Lr(i);
    let u;
    i === "no_allergens" || (y = this.config) != null && y.allergen_stroke_color_synced ? u = l : u = d;
    const g = a && o ? o : null, f = `--pp-icon-color: ${l}; --pp-icon-stroke: ${u}; --pp-icon-stroke-width: ${c}; ${a ? "cursor: pointer;" : ""}`;
    return h ? B`
        <div 
          class="pp-icon" 
          style="${f}"
          aria-hidden="true"
          @click=${g}
        >
          ${Ul(h)}
        </div>
      ` : (this.debug && console.warn(`[SVG] No SVG found for key: ${i}`), B`
        <div 
          class="pp-icon pp-icon-error" 
          style="${f}"
          aria-hidden="true"
          @click=${g}
        >
          <div style="background: #ccc; color: #666; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px;">?</div>
        </div>
      `);
  }
  static async getConfigElement() {
    return await customElements.whenDefined("pollenprognos-card-editor"), document.createElement("pollenprognos-card-editor");
  }
  setConfig(i) {
    if (Se(this._userConfig, i)) return;
    this._integrationExplicit = i.hasOwnProperty("integration"), this.tapAction = i.tap_action || null;
    let r = i.integration;
    r && typeof r == "string" && (r = r.trim().toLowerCase());
    let s;
    r === "pp" ? s = me : r === "peu" ? s = ze : r === "dwd" ? s = Pe : r === "silam" ? s = Te : r === "kleenex" ? s = Me : r === "plu" ? s = We : s = me;
    const o = Object.keys(s).concat([
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
    for (const h of o)
      h in i && (a[h] = i[h]);
    const n = { ...s, ...a, integration: r }, l = this.config || {}, d = Object.keys(a).filter(
      (h) => !Se(a[h], l[h])
    );
    if (d.length > 0 && d.every((h) => Aa.includes(h))) {
      this._userConfig = { ...i }, this.config = n, this._isLoaded = !0, this.requestUpdate();
      return;
    }
    this._userConfig = { ...i }, this.config = n, !this._versionLogged && this.config.show_version !== !1 && (console.info(
      "%c🤧 Pollenprognos Card: version v2.8.1",
      "background:#f0e68c;color:#000;padding:2px 4px;border-radius:2px;"
    ), this._versionLogged = !0), this._initDone = !1, this._hass && (this.hass = this._hass);
  }
  set hass(i) {
    var v, x, L, k, A, P, $;
    if (this._hass === i) return;
    this._hass = i;
    const r = !!this._integrationExplicit;
    this.debug && console.debug("[Card] set hass called; explicit:", r);
    const s = new Set(
      Object.values(Si).flat()
    ), o = Object.keys(i.states).filter(
      (S) => {
        if (typeof S != "string" || !S.startsWith("sensor.pollen_") || S.startsWith("sensor.pollenflug_")) return !1;
        const w = /^sensor\.pollen_([^_]+)(_.*)?$/.exec(S);
        if (!w) return !1;
        const C = w[1];
        return !(!w[2] && s.has(C));
      }
    ), a = Object.keys(i.states).filter(
      (S) => typeof S == "string" && S.startsWith("sensor.pollenflug_")
    ), n = Object.keys(i.states).filter(
      (S) => typeof S == "string" && S.startsWith("sensor.polleninformation_")
    ), l = Object.keys(i.states).filter(
      (S) => typeof S == "string" && S.startsWith("sensor.silam_pollen_")
    ), d = Object.keys(i.states).filter(
      (S) => typeof S == "string" && S.startsWith("sensor.kleenex_pollen_radar_")
    ), c = Object.keys(i.states).filter(
      (S) => {
        if (typeof S != "string") return !1;
        const w = /^sensor\.pollen_([^_]+)$/.exec(S);
        if (!w) return !1;
        const C = w[1];
        return s.has(C);
      }
    );
    this.debug && (console.debug("Sensor states detected:"), console.debug("PP:", o), console.debug("DWD:", a), console.debug("PEU:", n), console.debug("SILAM:", l), console.debug("KLEENEX:", d), console.debug("PLU:", c));
    let h = this._userConfig.integration;
    h && typeof h == "string" && (h = h.trim().toLowerCase()), r || (o.length ? h = "pp" : c.length ? h = "plu" : n.length ? h = "peu" : a.length ? h = "dwd" : l.length ? h = "silam" : d.length && (h = "kleenex"));
    let u;
    h === "dwd" ? u = Pe : h === "peu" ? u = ze : h === "pp" ? u = me : h === "silam" ? u = Te : h === "kleenex" ? u = Me : h === "plu" ? u = We : (console.error(
      "Unknown integration:",
      h,
      "- falling back to PP"
    ), h = "pp", u = me);
    const { allergens: g, ...f } = this._userConfig, _ = {
      ...u,
      ...f,
      integration: h
      // Use the normalized integration value
    };
    if (h === "plu" && (delete _.city, delete _.region_id, delete _.location), this._integrationExplicit && Array.isArray(g) && g.length > 0 ? (this.debug && console.debug(
      "[Card] Explicit integration (",
      h,
      "); using user-defined allergens:",
      g
    ), _.allergens = g) : (this.debug && console.debug(
      "[Card] Using stub allergens for integration:",
      h
    ), h === "pp" ? _.allergens = me.allergens : h === "peu" ? _.allergens = ze.allergens : h === "dwd" ? _.allergens = Pe.allergens : h === "silam" ? _.allergens = Te.allergens : h === "kleenex" ? _.allergens = Me.allergens : h === "plu" && (_.allergens = We.allergens)), !_.hasOwnProperty("date_locale")) {
      const S = Ee(i, null), w = ((x = (v = this._hass) == null ? void 0 : v.locale) == null ? void 0 : x.language) || ((L = this._hass) == null ? void 0 : L.language) || `${S}-${S.toUpperCase()}`;
      _.date_locale = w, this.debug && console.debug("[Card] auto-filling date_locale:", _.date_locale);
    }
    if (h === "dwd" && _.region_id !== "manual" && !_.region_id && a.length)
      _.region_id = Array.from(
        new Set(a.map((S) => S.split("_").pop()))
      ).sort((S, w) => Number(S) - Number(w))[0], this.debug && console.debug("[Card] Auto-set region_id:", _.region_id);
    else if (h === "pp" && _.city !== "manual" && !_.city && o.length)
      _.city = o[0].slice(14).replace(/_[^_]+$/, ""), this.debug && console.debug("[Card] Auto-set city:", _.city);
    else if (h === "peu" && _.location !== "manual" && !_.location && n.length) {
      const S = Array.from(
        new Set(
          n.map((w) => {
            var m;
            return (((m = i.states[w]) == null ? void 0 : m.attributes) || {}).location_slug || null;
          }).filter(Boolean)
        )
      );
      _.location = S[0] || null, this.debug && console.debug(
        "[Card][PEU] Auto-set location (location_slug):",
        _.location,
        S
      );
    } else if (h === "silam" && _.location !== "manual" && !_.location && l.length) {
      const S = Array.from(
        new Set(
          l.map((w) => {
            const C = w.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
            return C ? C[1] : null;
          }).filter(Boolean)
        )
      );
      _.location = S[0] || null, this.debug && console.debug(
        "[Card][SILAM] Auto-set location (location):",
        _.location,
        S
      );
    } else if (h === "kleenex" && _.location !== "manual" && !_.location && d.length) {
      const S = Object.keys(i.states).filter(
        (C) => typeof C == "string" && C.match(/^sensor\.kleenex_pollen_radar_.+_date$/)
      ), w = Array.from(
        new Set(
          S.map((C) => {
            const m = C.match(/^sensor\.kleenex_pollen_radar_(.+)_date$/);
            return m ? m[1] : null;
          }).filter(Boolean)
        )
      );
      _.location = w[0] || null, this.debug && console.debug(
        "[Card][KLEENEX] Auto-set location:",
        _.location,
        w
      );
    }
    if (this.config = _, this.tapAction = _.tap_action || this.tapAction || null, this.debug && (console.debug("[Card][Debug] Aktiv integration:", h), console.debug("[Card][Debug] Allergens i config:", _.allergens)), _.title === "false" || _.title === !1 || typeof _.title == "string" && _.title.trim() === "")
      this.header = "";
    else if (typeof _.title == "string" && _.title.trim() !== "" && _.title !== "true")
      this.header = _.title;
    else {
      let S = "";
      if (h === "dwd")
        S = _.region_id && _.region_id !== "manual" ? Sa[_.region_id] || _.region_id : "";
      else if (h === "peu") {
        const w = Object.values(i.states).filter(
          (M) => M && typeof M == "object" && typeof M.entity_id == "string" && M.entity_id.startsWith("sensor.polleninformation_")
        ), C = _.location && _.location !== "manual" ? Ae(_.location) : "";
        let m = "", E = null;
        if (C)
          E = w.find((M) => {
            const z = (M.attributes || {}).location_slug || M.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
            return Ae(z) === C;
          });
        else {
          const M = Array.from(
            new Set(
              w.map((R) => {
                const O = (R.attributes || {}).location_slug || R.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
                return Ae(O);
              })
            )
          );
          M.length === 1 && (E = w.find((R) => {
            const O = (R.attributes || {}).location_slug || R.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
            return Ae(O) === M[0];
          }));
        }
        if (E) {
          const M = E.attributes || {};
          m = M.location_title || ((A = (k = M.friendly_name) == null ? void 0 : k.match(/\((.*?)\)/)) == null ? void 0 : A[1]) || "";
        }
        S = C ? m || _.location || "" : m;
      } else if (h === "silam") {
        const w = [
          "alder",
          "birch",
          "grass",
          "hazel",
          "mugwort",
          "olive",
          "ragweed"
        ], C = new Set(
          Object.values(ce.mapping).flatMap(
            (z) => Object.entries(z).filter(
              ([O, b]) => w.includes(b)
            ).map(([O]) => O)
          )
        ), m = Object.values(i.states).filter((z) => {
          if (!z || typeof z != "object" || typeof z.entity_id != "string" || !z.entity_id.startsWith("sensor.silam_pollen_"))
            return !1;
          const O = z.entity_id.match(
            /^sensor\.silam_pollen_(.*)_([^_]+)$/
          );
          if (!O) return !1;
          const b = O[2];
          return C.has(b);
        }), E = _.location && _.location !== "manual" ? Ae(_.location) : "", M = E ? m.find((z) => {
          const b = z.entity_id.replace("sensor.silam_pollen_", "").replace(/_[^_]+$/, "").replace(/^[-\s]+/, "");
          return Ae(b) === E;
        }) : null;
        let R = "";
        if (M) {
          const z = M.attributes;
          R = z.location_title || ((P = z.friendly_name) == null ? void 0 : P.replace(/^SILAM Pollen\s*-?\s*/i, "").replace(new RegExp("\\s+\\p{L}+$", "u"), "").trim()) || _.location, R = R.replace(/^[-\s]+/, "");
        }
        S = E ? R || _.location || "" : R;
      } else if (h === "kleenex") {
        const w = Object.values(i.states).filter((M) => !M || typeof M != "object" || typeof M.entity_id != "string" || !M.entity_id.startsWith("sensor.kleenex_pollen_radar_") ? !1 : M.entity_id.match(/^sensor\.kleenex_pollen_radar_.+_.+$/)), C = _.location && _.location !== "manual" ? Ae(_.location) : "";
        let m = null;
        if (_.location === "manual") {
          let M = _.entity_prefix || "";
          M.startsWith("sensor.") && (M = M.substring(7)), M && !M.endsWith("_") && (M = M + "_"), M && (m = w.find(
            (R) => R.entity_id.startsWith(`sensor.${M}`)
          ));
        } else C ? m = w.find((M) => M.entity_id.replace(
          "sensor.kleenex_pollen_radar_",
          ""
        ).replace(/_[^_]+$/, "") === C) : m = w[0];
        let E = "";
        if (m) {
          const M = m.attributes;
          E = M.location_name || (($ = M.friendly_name) == null ? void 0 : $.replace(/^Kleenex Pollen Radar\s*[\(\-]?\s*/i, "").replace(/[\)\s]+\w+.*$/u, "").trim()) || _.location;
        }
        S = E || _.location || "";
      } else if (h === "plu") {
        const w = this._t("card.location.plu");
        S = w === "card.location.plu" ? "Luxembourg" : w;
      } else {
        const w = (C) => gs.find((m) => Ae(m) === C) || C;
        if (_.city && _.city !== "manual")
          S = w(_.city);
        else {
          const C = Object.keys(i.states).filter(
            (E) => /^sensor\.pollen_(.+)_[^_]+$/.test(E)
          ), m = Array.from(
            new Set(
              C.map(
                (E) => E.replace("sensor.pollen_", "").replace(/_[^_]+$/, "")
              )
            )
          );
          m.length === 1 ? S = w(m[0]) : S = "";
        }
      }
      this.header = S ? `${this._t("card.header_prefix")} ${S}` : this._t("card.header_prefix"), this.debug && console.debug("[Card] header set to:", this.header);
    }
    const p = Yn[_.integration] || Jr;
    let y = null;
    if (_.integration === "silam") {
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
      y = p.fetchForecast(i, _, this._forecastEvent);
    } else
      y = p.fetchForecast(i, _);
    if (y)
      return this._isLoaded = !1, y.then((S) => {
        this.debug && (console.debug("[Card][Debug] Sensors före filtrering:", S), console.debug(
          `[Card][Debug] Adapter returned ${S.length} sensors:`,
          S.map((z) => {
            var O, b, T;
            return {
              allergen: z.allergenReplaced,
              entity_id: z.entity_id,
              has_days: !!z.days,
              days_length: (O = z.days) == null ? void 0 : O.length,
              day0_state: (b = z.day0) == null ? void 0 : b.state,
              day0_value: (T = z.day0) == null ? void 0 : T.value
            };
          })
        ), console.debug(
          "[Card][Debug] Förväntade allergener från config:",
          _.allergens
        )), this.debug && (console.debug("[Card] Användaren har valt city:", _.city), console.debug(
          "[Card] Användaren har valt allergener:",
          _.allergens
        ), console.debug("[Card] Användaren har valt plats:", _.location));
        const w = So(_, i, this.debug), C = w.length;
        let m = {};
        if (_.integration === "silam") {
          const z = Object.keys(i.states).filter((O) => {
            const b = O.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
            return b && b[1] === (_.location || "");
          });
          for (const O of z) {
            const b = O.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
            if (!b) continue;
            const T = b[2];
            let D = !1;
            for (const [N, H] of Object.entries(
              ce.mapping
            ))
              if (H[T]) {
                m[H[T]] = T, D = !0;
                break;
              }
            !D && this.debug && console.debug(
              `[Card][SILAM] Hittade ingen mapping för haSlug: '${T}'`
            );
          }
          this.debug && console.debug(
            "[Card][SILAM] silamReverse byggd baserat på existerande sensors:",
            m
          );
        }
        let E = S.filter((z) => {
          if (_.integration === "silam" && m && (!_.mode || _.mode === "daily")) {
            const O = _.location || "", b = m[z.allergenReplaced] || z.allergenReplaced, T = `sensor.silam_pollen_${O}_${b}`;
            return this.debug && console.debug(
              `[Card][Debug][SILAM filter] allergenReplaced: '${z.allergenReplaced}', key: '${b}', id: '${T}', available: ${w.includes(T)}`
            ), w.includes(T);
          }
          return !0;
        });
        if (Array.isArray(_.allergens) && _.allergens.length > 0 && _.integration !== "silam") {
          let z, O;
          h === "dwd" ? (z = new Set(_.allergens.map((b) => _i(b))), O = (b) => _i(b.allergenReplaced || "")) : (this.debug && console.debug(
            "[Card][Debug] Använder normalisering för allergener:",
            _.allergens
          ), z = new Set(_.allergens.map((b) => Be(b))), O = (b) => Be(b.allergenReplaced || "")), E = E.filter((b) => {
            const T = O(b), D = z.has(T);
            return !D && this.debug && console.debug(
              `[Card][Debug] Sensor '${T}' är EJ tillåten (ej i allowed)`,
              b
            ), D;
          });
        }
        if (this.debug && console.debug(
          `[Card][Debug] After filtering: ${E.length} sensors remain:`,
          E.map((z) => {
            var O, b;
            return {
              allergen: z.allergenReplaced,
              entity_id: z.entity_id,
              has_days: !!z.days,
              days_length: (O = z.days) == null ? void 0 : O.length,
              day0_state: (b = z.day0) == null ? void 0 : b.state
            };
          })
        ), this._integrationExplicit && !!_.location && C === 0) {
          this._explicitLocationNoSensors = !0, this._updateSensorsAndColumns([], [], _), this.debug && console.warn(
            `[Card] Ingen sensor hittad för explicit vald plats: '${_.location}'`
          );
          return;
        } else
          this._explicitLocationNoSensors = !1, this._updateSensorsAndColumns(E, w, _);
      }).catch((S) => {
        console.error("[Card] Error fetching pollen forecast:", S), this.debug && console.debug("[Card] fetchForecast error:", S), this._isLoaded = !0, this.requestUpdate();
      });
  }
  _renderNoAllergensHtml() {
    return Number(this.config.icon_size) > 0 && Number(this.config.icon_size), B`
      ${this.header ? B`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="no-allergens-container">
          ${this._renderAllergenSvg("no_allergens", 0)}
          <span class="no-allergens-text">${this._t("card.no_allergens")}</span>
        </div>
      </div>
    `;
  }
  _renderStaleDataHtml() {
    return B`
      ${this.header ? B`<div class="card-header">${this.header}</div>` : ""}
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
    var r, s;
    const i = ((r = this.config) == null ? void 0 : r.text_size_ratio) ?? 1;
    return B`
      ${this.header ? B`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div
          class="flex-container"
          style="gap: ${((s = this.config) == null ? void 0 : s.minimal_gap) ?? 35}px;"
        >
          ${(this.sensors || []).map((o) => {
      var c, h, u, g, f, _, p, y, v, x, L, k, A, P;
      if (o.stale) {
        const $ = (c = this.config) != null && c.show_text_allergen ? ((h = this.config) != null && h.allergens_abbreviated ? o.allergenShort ?? "" : o.allergenCapitalized ?? "") + ": " + this._t("card.stale_allergen") : this._t("card.stale_allergen");
        return B`
                <div class="sensor minimal stale">
                  ${this._renderAllergenSvg(
          this._getSvgKey(o.allergenReplaced),
          0,
          { stale: !0 }
        )}
                  <span class="short-text stale-allergen-text" style="font-size: ${1 * i}em;">
                    ${$}
                  </span>
                </div>
              `;
      }
      const a = ((u = o.day0) == null ? void 0 : u.state_text) ?? "", n = ((g = o.day0) == null ? void 0 : g.display_state) ?? ((f = o.day0) == null ? void 0 : f.state) ?? "";
      let l = "";
      (_ = this.config) != null && _.show_text_allergen && (l += (p = this.config) != null && p.allergens_abbreviated ? o.allergenShort ?? "" : o.allergenCapitalized ?? ""), (y = this.config) != null && y.show_value_text && ((v = this.config) != null && v.show_value_numeric) ? (l && (l += ": "), l += `${a} (${n})`) : (x = this.config) != null && x.show_value_text ? (l && (l += ": "), l += a) : (L = this.config) != null && L.show_value_numeric && (l && (l += " "), l += `(${n})`);
      const d = this.config.integration === "plu" ? ((k = o.day0) == null ? void 0 : k.state) ?? 0 : ((A = o.day0) == null ? void 0 : A.display_state) ?? ((P = o.day0) == null ? void 0 : P.state) ?? 0;
      return B`
              <div class="sensor minimal">
                ${this._renderAllergenSvg(
        this._getSvgKey(o.allergenReplaced),
        d,
        {
          clickable: this.config.link_to_sensors !== !1 && o.entity_id,
          onClick: ($) => {
            this.config.link_to_sensors !== !1 && o.entity_id && ($.stopPropagation(), this._openEntity(o.entity_id));
          }
        }
      )}
                ${l ? B`<span
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
    var y, v;
    if (!this.sensors || this.sensors.length === 0)
      return this.debug && (console.debug(
        "[Card] _renderNormalHtml: no sensors available, returning empty"
      ), console.debug(
        `[Card] _renderNormalHtml: sensors=${!!this.sensors}, length=${(y = this.sensors) == null ? void 0 : y.length}`
      )), B``;
    const i = this.sensors.filter(
      (x) => x.days && x.days.length > 0
    ), r = this.sensors.filter((x) => x.stale === !0);
    if (i.length === 0 && r.length === 0)
      return this.debug && (console.debug(
        "[Card] _renderNormalHtml: no sensors have days arrays, returning empty"
      ), console.debug(
        `[Card] _renderNormalHtml: sensors with days=${i.length}, total sensors=${this.sensors.length}`
      ), this.sensors.forEach((x, L) => {
        var k, A;
        console.debug(
          `[Card] _renderNormalHtml: sensor[${L}] ${x.allergenReplaced}: has_days=${!!x.days}, days_length=${(k = x.days) == null ? void 0 : k.length}, day0_state=${(A = x.day0) == null ? void 0 : A.state}`
        );
      })), B``;
    this.debug && console.debug(
      `[Card] _renderNormalHtml: rendering ${this.sensors.length} sensors, ${i.length} with days`
    );
    const s = ((v = this.config) == null ? void 0 : v.text_size_ratio) ?? 1, o = !!this.config.days_boldfaced, a = this.displayCols;
    let n = 6;
    this.config.integration === "peu" || this.config.integration === "kleenex" ? n = 4 : this.config.integration === "plu" && (n = 3);
    const l = [];
    for (let x = 0; x < n; x++)
      l.push(this._levelColorForLevel(x + 1));
    const d = l, c = this.config.levels_empty_color ?? "var(--divider-color)", h = this._getGapColor(), u = this.config.levels_thickness ?? 60, g = this.config.levels_gap ?? 5, f = Number(this.config.icon_size) || 48, _ = Number(this.config.levels_icon_ratio) || 1, p = Math.min(100, Math.max(1, f * _));
    return this.debug && console.debug("Display columns:", a), B`
      ${this.header ? B`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="forecast-content">
          <table class="forecast"">
            <colgroup>
              ${[0, ...a].map(
      () => B`<col style="width: ${100 / (a.length + 1)}%;" />`
    )}
            </colgroup>
            <thead>
              <tr>
                <th></th>
                ${a.map(
      (x) => {
        var L, k, A, P, $, S, w, C;
        return B`
                    <th
                      style="font-weight: ${o ? "bold" : "normal"}; text-align: center;"
                    >
                      <div
                        style="display: flex; flex-direction: column; align-items: center;"
                      >
                        <span
                          class="day-header"
                          style="font-size: ${1 * s}em;"
                        >
                          ${((P = (A = (k = (L = this.sensors) == null ? void 0 : L[0]) == null ? void 0 : k.days) == null ? void 0 : A[x]) == null ? void 0 : P.day) || ""}
                        </span>
                        ${this.config.mode === "twice_daily" && ((C = (w = (S = ($ = this.sensors) == null ? void 0 : $[0]) == null ? void 0 : S.days) == null ? void 0 : w[x]) != null && C.icon) ? B`<ha-icon
                              icon="${this.sensors[0].days[x].icon}"
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
      (x) => {
        var L, k, A;
        return x.stale ? B`
                  <tr class="allergen-icon-row allergen-stale-row" valign="top">
                    <td>
                      ${this._renderAllergenSvg(
          this._getSvgKey(x.allergenReplaced),
          0,
          { stale: !0 }
        )}
                    </td>
                    <td colspan="${a.length}" class="stale-cell">
                      <span class="stale-allergen-text">${this._t("card.stale_allergen")}</span>
                    </td>
                  </tr>
                  ${this.config.show_text_allergen ? B`
                        <tr class="allergen-text-row allergen-stale-row">
                          <td>
                            <span class="stale-allergen-name" style="font-size: ${1 * s}em;">
                              ${this.config.allergens_abbreviated ? x.allergenShort : x.allergenCapitalized}
                            </span>
                          </td>
                          <td colspan="${a.length}"></td>
                        </tr>
                      ` : ""}
                ` : B`
                <tr class="allergen-icon-row" valign="top">
                  <td>
                    ${this._renderAllergenSvg(
          this._getSvgKey(x.allergenReplaced),
          this.config.integration === "plu" ? ((L = x.days[0]) == null ? void 0 : L.state) ?? 0 : ((k = x.days[0]) == null ? void 0 : k.display_state) ?? ((A = x.days[0]) == null ? void 0 : A.state) ?? 0,
          {
            clickable: this.config.link_to_sensors !== !1 && x.entity_id,
            onClick: (P) => {
              this.config.link_to_sensors !== !1 && x.entity_id && (P.stopPropagation(), this._openEntity(x.entity_id));
            }
          }
        )}
                  </td>
                  ${a.map(
          (P) => B`
                      <td>
                        ${(() => {
            var C, m;
            const $ = Number((C = x.days[P]) == null ? void 0 : C.state) || 0, S = Number(
              ((m = x.days[P]) == null ? void 0 : m.display_state) ?? $
            );
            let w = $;
            return this.config.integration === "dwd" ? w = $ * 2 : (this.config.integration === "peu" || this.config.integration === "kleenex" || this.config.integration === "plu") && (w = $), this._renderLevelCircle(
              w,
              {
                colors: d,
                emptyColor: c,
                gapColor: h,
                thickness: u,
                gap: g,
                size: p
              },
              x.allergenReplaced,
              P,
              S,
              x.entity_id,
              this.config.link_to_sensors !== !1
            );
          })()}
                      </td>
                    `
        )}
                </tr>
                ${this.config.show_text_allergen || this.config.show_value_text || this.config.show_value_numeric ? B`
                      <tr class="allergen-text-row">
                        <td>
                          <span style="font-size: ${1 * s}em;">
                            ${this.config.show_text_allergen ? this.config.allergens_abbreviated ? x.allergenShort : x.allergenCapitalized : ""}
                          </span>
                        </td>
                        ${a.map((P) => {
          var C, m, E;
          const $ = ((C = x.days[P]) == null ? void 0 : C.state_text) || "", S = ((m = x.days[P]) == null ? void 0 : m.display_state) ?? ((E = x.days[P]) == null ? void 0 : E.state);
          let w = "";
          return this.config.show_value_text && this.config.show_value_numeric ? w = `${$} (${S})` : this.config.show_value_text ? w = $ : this.config.show_value_numeric && (w = String(S)), B`<td>
                            <span style="font-size: ${1 * s}em;"
                              >${w}</span
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
    var d, c;
    if (!this.config) return B``;
    if (!this._isLoaded && (!this.sensors || !this.sensors.length))
      return B`
        <ha-card>
          <div style="padding: 1em; text-align: center;">
            ${this._t("card.loading_forecast") || "Loading forecast..."}
          </div>
        </ha-card>
      `;
    if (this._isLoaded && (!this.sensors || !this.sensors.length)) {
      const h = `card.integration.${this.config.integration}`, u = this._t(h);
      let g = "";
      if (this._error)
        return g = this._t(this._error), B`
          <ha-card>
            <div class="card-error">${g} (${u})</div>
          </ha-card>
        `;
      if (this._availableSensorCount === 0)
        return this._getStaleStatus().hasStale ? B`
            <ha-card>
              ${this._renderStaleDataHtml()}
            </ha-card>
          ` : (g = this._t("card.error_no_sensors"), B`
          <ha-card>
            <div class="card-error">${g} (${u})</div>
          </ha-card>
        `);
      {
        const f = this._t("card.error_filtered_sensors");
        return this.debug && console.debug(`[PollenPrognosCard] ${f} (${u})`), B`
          <ha-card>
            ${this._renderNoAllergensHtml()}
          </ha-card>
        `;
      }
    }
    if (this._getStaleStatus().allStale)
      return B`
        <ha-card>
          ${this._renderStaleDataHtml()}
        </ha-card>
      `;
    const r = this.config.minimal ? this._renderMinimalHtml() : this._renderNormalHtml(), s = this.config.tap_action || null, o = (c = (d = this.config.background_color) == null ? void 0 : d.trim) != null && c.call(d) ? `background-color: ${this.config.background_color.trim()};` : "", a = s && s.type && s.type !== "none" ? "pointer" : "auto", n = Number(this.config.icon_size) > 0 ? Number(this.config.icon_size) : 48, l = `
    ${o}
    cursor: ${a};
    --pollen-icon-size: ${n}px;
  `;
    return B`
      <ha-card
        style="${l}"
        @click="${s && s.type && s.type !== "none" ? this._handleTapAction : null}"
      >
        ${r}
      </ha-card>
    `;
  }
  getCardSize() {
    return this.sensors.length + 1;
  }
  _handleTapAction(i) {
    var o, a;
    if (!this.tapAction || !this._hass) return;
    (o = i.preventDefault) == null || o.call(i), (a = i.stopPropagation) == null || a.call(i);
    const r = this.tapAction.type || "more-info";
    let s = this.tapAction.entity || "sun.sun";
    switch (r) {
      case "more-info":
        this._fire("hass-more-info", { entityId: s });
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
  _fire(i, r, s) {
    const o = new Event(i, {
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      ...s
    });
    return o.detail = r, this.dispatchEvent(o), o;
  }
  static get styles() {
    return Zn`
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
customElements.define("pollenprognos-card", _p);
const si = (t, e) => {
  const i = { ...t };
  for (const r of Object.keys(e)) {
    const s = e[r];
    s !== null && typeof s == "object" && !Array.isArray(s) && typeof t[r] == "object" && t[r] !== null ? i[r] = si(t[r], s) : i[r] = s;
  }
  return i;
}, qr = (t) => t === "dwd" ? Pe : t === "peu" ? ze : t === "silam" ? Te : t === "kleenex" ? Me : t === "plu" ? We : me;
class fp extends zt {
  get debug() {
    var e;
    return !!((e = this._config) != null && e.debug);
  }
  _hasSilamWeatherEntity(e) {
    var a, n;
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
    const i = Ee(this._hass), r = ((a = ce.weather_suffixes) == null ? void 0 : a[i]) || ((n = ce.weather_suffixes) == null ? void 0 : n.en) || [], s = e.toLowerCase();
    for (const l of r)
      if (`weather.silam_pollen_${s}_${l}` in this._hass.states) return !0;
    const o = `weather.silam_pollen_${s}_`;
    return Object.keys(this._hass.states).some(
      (l) => typeof l == "string" && l.startsWith(o)
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
    const i = this._config.integration === "dwd" ? Pe.allergens : this._config.integration === "peu" ? Jt : this._config.integration === "silam" ? hs : this._config.integration === "kleenex" ? Me.allergens : me.allergens, r = {}, s = {};
    i.forEach((d) => {
      const c = Be(d), h = Oe[c] || c, u = c === "index" ? "index" : h;
      r[d] = Y(`editor.phrases_full.${u}`, e), s[d] = Y(`editor.phrases_short.${u}`, e);
    });
    const o = this._config.integration === "dwd" ? 4 : this._config.integration === "peu" ? 5 : (this._config.integration === "silam", 7), a = Array.from(
      { length: o },
      (d, c) => Y(`editor.phrases_levels.${c}`, e)
    ), n = {
      0: Y("editor.phrases_days.0", e),
      1: Y("editor.phrases_days.1", e),
      2: Y("editor.phrases_days.2", e)
    }, l = Y("editor.no_information", e);
    this._updateConfig("phrases", {
      full: r,
      short: s,
      levels: a,
      days: n,
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
    return Ee(this._hass);
  }
  _t(e) {
    return Y(`editor.${e}`, this._lang);
  }
  _getAllergenDisplayName(e) {
    if (e == null) return "";
    const i = typeof e == "string" ? e : String(e), r = Ae(i), s = Oe[r] || r, o = `phrases_full.${s}`, a = this._t(o);
    return a && a !== o ? a : i ? i.charAt(0).toUpperCase() + i.slice(1) : s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  }
  constructor() {
    super(), this.debug && console.log("[ALLERGEN-DEBUG] ========== Constructor called =========="), this._userConfig = {}, this._integrationExplicit = !1, this._thresholdExplicit = !1, this._config = {}, this.installedCities = [], this.installedPeuLocations = [], this.installedSilamLocations = [], this.installedKleenexLocations = [], this._prevIntegration = void 0, this.installedRegionIds = [], this._initDone = !1, this._selectedPhraseLang = Ee(), this._allergensExplicit = !1, this._origAllergensSet = !1, this._userAllergens = null, this._tapType = "none", this._tapEntity = "", this._tapNavigation = "", this._tapService = "", this._tapServiceData = "", this.debug && console.log("[ALLERGEN-DEBUG] Constructor complete - _allergensExplicit:", this._allergensExplicit);
  }
  setConfig(e) {
    var i, r, s;
    try {
      this.debug && console.log("[ALLERGEN-DEBUG] ========== setConfig() called =========="), this.debug && console.log("[ALLERGEN-DEBUG] Incoming config.allergens:", e.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Current _userConfig.allergens:", (i = this._userConfig) == null ? void 0 : i.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Current _allergensExplicit:", this._allergensExplicit), this.debug && console.debug("[Editor] ▶️ setConfig INCOMING:", e), e.phrases && (this._userConfig.phrases = e.phrases), this._selectedPhraseLang = Ee(this._hass, e.date_locale);
      const a = qr(e.integration || "pp").allergens, n = { ...e };
      this.debug && console.log("[ALLERGEN-DEBUG] Stub allergens for integration:", e.integration || "pp", a), Object.entries(j).forEach(([y, v]) => {
        y in n || (n[y] = v);
      }), this.debug && console.log("[ALLERGEN-DEBUG] Checking if allergens differ from stub..."), this.debug && console.log("[ALLERGEN-DEBUG] config.allergens is array:", Array.isArray(e.allergens)), this.debug && console.log("[ALLERGEN-DEBUG] deepEqual result:", Se(e.allergens, a)), this.debug && console.log("[ALLERGEN-DEBUG] _allergensExplicit was:", this._allergensExplicit), Array.isArray(e.allergens) && (!Se(e.allergens, a) || this._allergensExplicit) ? (this._userConfig.allergens = [...e.allergens], this._allergensExplicit = !0, this.debug && console.log("[ALLERGEN-DEBUG] ✓ Saved user-chosen allergens to _userConfig:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] ✓ Set _allergensExplicit = true"), this.debug && console.debug(
        "[Editor] saved user-chosen allergens:",
        this._userConfig.allergens
      )) : this.debug && console.log("[ALLERGEN-DEBUG] ✗ Allergens match stub AND not explicit, NOT saving");
      const l = (n.integration === "dwd" ? Pe : n.integration === "peu" ? ze : n.integration === "silam" ? Te : me).pollen_threshold;
      n.hasOwnProperty("pollen_threshold") && !this._thresholdExplicit && n.pollen_threshold === l && (this.debug && console.debug(
        "[Editor] dropping incoming stub-threshold (matches stub):",
        l
      ), delete n.pollen_threshold);
      const d = e.integration;
      this._prevIntegration !== void 0 && d !== this._prevIntegration && (delete this._userConfig.allergens, this._allergensExplicit = !1, this.debug && console.debug("[Editor] integration changed → wipe allergens")), !this._integrationExplicit && n.integration === me.integration && (this.debug && console.debug("[Editor] dropped stub integration"), delete n.integration), !this._daysExplicit && n.days_to_show === me.days_to_show && (this.debug && console.debug("[Editor] dropped stub days_to_show"), delete n.days_to_show);
      const c = (n.integration === "dwd" ? Pe : n.integration === "peu" ? ze : n.integration === "silam" ? Te : me).date_locale;
      if (!this._localeExplicit && n.date_locale === c && (this.debug && console.debug("[Editor] dropped stub date_locale"), delete n.date_locale), this.debug && console.log("[ALLERGEN-DEBUG] Checking whether to drop incoming allergens..."), this.debug && console.log("[ALLERGEN-DEBUG] _userConfig.allergens exists:", !!this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] incoming.allergens exists:", !!n.allergens), this.debug && console.log("[ALLERGEN-DEBUG] _allergensExplicit:", this._allergensExplicit), this._userConfig.allergens && n.allergens && Se(n.allergens, this._userConfig.allergens))
        this.debug && console.log("[ALLERGEN-DEBUG] → Dropping incoming (same as saved)"), this.debug && console.debug(
          "[Editor] dropping incoming allergens (same as saved)"
        ), delete n.allergens;
      else if (this._allergensExplicit && n.allergens) {
        const y = qr(
          n.integration || this._config.integration || "pp"
        ).allergens;
        this.debug && console.log("[ALLERGEN-DEBUG] Checking if incoming matches stub..."), this.debug && console.log("[ALLERGEN-DEBUG] incoming.allergens:", n.allergens), this.debug && console.log("[ALLERGEN-DEBUG] stubAllergens:", y), this.debug && console.log("[ALLERGEN-DEBUG] deepEqual:", Se(n.allergens, y)), Se(n.allergens, y) ? (this.debug && console.log("[ALLERGEN-DEBUG] → Dropping incoming (matches stub, keeping explicit)"), this.debug && console.debug(
          "[Editor] dropping incoming allergens (matches stub, keeping explicit)"
        ), delete n.allergens) : this.debug && console.log("[ALLERGEN-DEBUG] → Keeping incoming (different from stub)");
      } else
        this.debug && console.log("[ALLERGEN-DEBUG] → No action taken on incoming allergens");
      this.debug && console.log("[ALLERGEN-DEBUG] Before merge - _userConfig.allergens:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Before merge - incoming.allergens:", n.allergens), this._userConfig = si(this._userConfig, n), this.debug && console.log("[ALLERGEN-DEBUG] After merge - _userConfig.allergens:", this._userConfig.allergens), this._thresholdExplicit = this._userConfig.hasOwnProperty("pollen_threshold"), this._allergensExplicit = this._userConfig.hasOwnProperty("allergens"), this._integrationExplicit = this._userConfig.hasOwnProperty("integration"), this.debug && console.log("[ALLERGEN-DEBUG] After setting flags - _allergensExplicit:", this._allergensExplicit), this._daysExplicit = this._userConfig.hasOwnProperty("days_to_show"), this._localeExplicit = this._userConfig.hasOwnProperty("date_locale");
      let h = this._userConfig.integration !== void 0 ? this._userConfig.integration : this._config.integration;
      if (!this._integrationExplicit && this._hass) {
        const y = Object.keys(this._hass.states);
        y.some(
          (v) => typeof v == "string" && v.startsWith("sensor.pollen_")
        ) ? h = "pp" : y.some(
          (v) => typeof v == "string" && v.startsWith("sensor.polleninformation_")
        ) ? h = "peu" : y.some(
          (v) => typeof v == "string" && v.startsWith("sensor.pollenflug_")
        ) ? h = "dwd" : y.some(
          (v) => typeof v == "string" && v.startsWith("sensor.silam_pollen_")
        ) ? h = "silam" : y.some(
          (v) => typeof v == "string" && v.startsWith("sensor.kleenex_pollen_radar_")
        ) && (h = "kleenex"), this._userConfig.integration = h, this.debug && console.debug("[Editor] auto-detected integration:", h);
      }
      (h === "silam" || h === "peu") && !this._userConfig.mode && (this._userConfig.mode = "daily");
      const u = qr(h);
      let g = si(u, this._userConfig);
      if (Object.entries(j).forEach(([y, v]) => {
        y in g || (g[y] = v);
      }), Object.entries(j).forEach(([y, v]) => {
        g[y] === v && delete g[y];
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
        const y = Ee(this._hass, null), v = ((s = (r = this._hass) == null ? void 0 : r.locale) == null ? void 0 : s.language) || `${y}-${y.toUpperCase()}`;
        this._config.date_locale = v, this.debug && console.debug(
          "[Editor] autofilled date_locale:",
          v,
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
              (x) => typeof x == "string" && x.startsWith("sensor.pollenflug_")
            ).map((x) => x.split("_").pop())
          )
        ).sort((x, L) => Number(x) - Number(L));
        const v = new Set(
          y.filter(
            (x) => typeof x == "string" && x.startsWith("sensor.pollen_") && !x.startsWith("sensor.pollenflug_")
          ).map(
            (x) => x.slice(14).replace(/_[^_]+$/, "")
          )
        );
        this.installedCities = gs.filter(
          (x) => v.has(
            x.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[-\s]/g, "_")
          )
        ).sort();
      }
      this._integrationExplicit || (h === "dwd" && !this._userConfig.region_id && this.installedRegionIds.length && (this._config.region_id = this.installedRegionIds[0]), h === "pp" && !this._userConfig.city && this.installedCities.length && (this._config.city = this.installedCities[0]), h === "silam" && !this._userConfig.location && this.installedLocations.length && (this._config.location = this.installedLocations[0])), this.debug && console.debug("[Editor] färdig _config innan dispatch:", this._config), this._config.tap_action ? (this._tapType = this._config.tap_action.type || "more-info", this._tapEntity = this._config.tap_action.entity || "", this._tapNavigation = this._config.tap_action.navigation_path || "", this._tapService = this._config.tap_action.service || "", this._tapServiceData = JSON.stringify(
        this._config.tap_action.service_data || {},
        null,
        2
      )) : (this._tapType = "none", this._tapEntity = "", this._tapNavigation = "", this._tapService = "", this._tapServiceData = "");
      const f = this._config || {}, _ = Object.keys(g).filter(
        (y) => !Se(g[y], f[y])
      );
      !(_.length > 0 && _.every((y) => Aa.includes(y))) && !Se(f, g) ? (this._config = g, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-1-setConfig] Dispatching from setConfig() end"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", this._config.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._config },
          bubbles: !0,
          composed: !0
        })
      )) : this._config = g, this.requestUpdate(), this._prevIntegration = d, this._initDone = !0;
    } catch (o) {
      throw console.error("pollenprognos-card-editor: Fel i setConfig:", o, e), o;
    }
  }
  set hass(e) {
    var u, g, f, _, p, y, v, x, L, k, A;
    if (this.debug && console.log("[ALLERGEN-DEBUG] ========== set hass() called =========="), this.debug && console.log("[ALLERGEN-DEBUG] _initDone:", this._initDone), this.debug && console.log("[ALLERGEN-DEBUG] Current _userConfig.allergens:", (u = this._userConfig) == null ? void 0 : u.allergens), this._hass === e) return;
    this._hass = e;
    const i = this._integrationExplicit;
    this._initDone || (this._selectedPhraseLang = Ee(e, this._config.date_locale));
    const r = new Set(
      Object.values(Si).flat()
    ), s = Object.keys(e.states).filter(
      (P) => {
        if (typeof P != "string" || !P.startsWith("sensor.pollen_") || P.startsWith("sensor.pollenflug_")) return !1;
        const $ = /^sensor\.pollen_([^_]+)(_.*)?$/.exec(P);
        if (!$) return !1;
        const S = $[1];
        return !(!$[2] && r.has(S));
      }
    ), o = Object.keys(e.states).filter(
      (P) => typeof P == "string" && P.startsWith("sensor.pollenflug_")
    ), a = Object.keys(e.states).filter(
      (P) => typeof P == "string" && P.startsWith("sensor.polleninformation_")
    ), n = Object.keys(e.states).filter(
      (P) => typeof P == "string" && P.startsWith("sensor.silam_pollen_")
    ), l = Object.keys(e.states).filter(
      (P) => {
        if (typeof P != "string") return !1;
        const $ = /^sensor\.pollen_([^_]+)$/.exec(P);
        if (!$) return !1;
        const S = $[1];
        return r.has(S);
      }
    );
    let d = this._userConfig.integration;
    i || (s.length ? d = "pp" : l.length ? d = "plu" : a.length ? d = "peu" : o.length ? d = "dwd" : n.length && (d = "silam"), this._userConfig.integration = d), (d === "silam" || d === "peu") && !this._userConfig.mode && (this._userConfig.mode = "daily");
    const c = d === "dwd" ? Pe : d === "peu" ? ze : d === "silam" ? Te : d === "kleenex" ? Me : d === "plu" ? We : me;
    this.debug && console.log("[ALLERGEN-DEBUG] set hass() building merged config"), this.debug && console.log("[ALLERGEN-DEBUG] base (stub) allergens:", (g = c.allergens) == null ? void 0 : g.slice(0, 5), "... (", (f = c.allergens) == null ? void 0 : f.length, "total)"), this.debug && console.log("[ALLERGEN-DEBUG] _userConfig.allergens:", (_ = this._userConfig.allergens) == null ? void 0 : _.slice(0, 5), "... (", (p = this._userConfig.allergens) == null ? void 0 : p.length, "total)");
    let h = si(c, this._userConfig);
    if (this.debug && console.log("[ALLERGEN-DEBUG] After deepMerge - merged.allergens:", (y = h.allergens) == null ? void 0 : y.slice(0, 5), "... (", (v = h.allergens) == null ? void 0 : v.length, "total)"), this._userConfig.hasOwnProperty("pollen_threshold") || (h.pollen_threshold = c.pollen_threshold, this.debug && console.debug(
      "[Editor][hass] reset pollen_threshold to stub:",
      c.pollen_threshold
    )), h.sort = h.sort || "value_ascending", this.debug && console.log("[ALLERGEN-DEBUG] set hass() checking if config changed"), this.debug && console.log("[ALLERGEN-DEBUG] Current _config.allergens:", (x = this._config.allergens) == null ? void 0 : x.slice(0, 5), "... (", (L = this._config.allergens) == null ? void 0 : L.length, "total)"), this.debug && console.log("[ALLERGEN-DEBUG] New merged.allergens:", (k = h.allergens) == null ? void 0 : k.slice(0, 5), "... (", (A = h.allergens) == null ? void 0 : A.length, "total)"), this.debug && console.log("[ALLERGEN-DEBUG] deepEqual result:", Se(this._config, h)), Se(this._config, h))
      this.debug && console.log("[ALLERGEN-DEBUG] Config unchanged in set hass(), NOT dispatching"), this.debug && console.log("[ALLERGEN-DEBUG] ========== set hass() complete (no change) ==========");
    else {
      this._config = h, this.debug && console.log("[ALLERGEN-DEBUG] Config changed! Updated _config.allergens"), this.debug && console.log("[ALLERGEN-DEBUG] ========== set hass() complete (config changed) =========="), this.installedRegionIds = Array.from(
        new Set(o.map((w) => w.split("_").pop()))
      ).sort((w, C) => Number(w) - Number(C));
      const P = Array.from(
        new Set(
          s.map(
            (w) => w.slice(14).replace(/_[^_]+$/, "")
          )
        )
      );
      this.installedCities = gs.filter(
        (w) => P.includes(
          w.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[-\s]/g, "_")
        )
      ).sort((w, C) => w.localeCompare(C)), this.installedPeuLocations = Array.from(
        new Map(
          Object.values(e.states).filter(
            (w) => w && typeof w == "object" && typeof w.entity_id == "string" && w.entity_id.startsWith("sensor.polleninformation_")
          ).map((w) => {
            var E, M, R, z;
            const C = ((E = w.attributes) == null ? void 0 : E.location_slug) || w.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, ""), m = ((M = w.attributes) == null ? void 0 : M.location_title) || (typeof ((R = w.attributes) == null ? void 0 : R.friendly_name) == "string" ? (z = w.attributes.friendly_name.match(/\((.*?)\)/)) == null ? void 0 : z[1] : void 0) || C;
            return [C, m];
          })
        )
      ), this.config && this.config.date_locale && this.config.date_locale.slice(0, 2) || this._hass && this._hass.language;
      const $ = [
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
        console.debug("[SilamAllergenMap.mapping]", ce.mapping), console.debug("[pollenAllergens]", $);
        for (const [C, m] of Object.entries(
          ce.mapping
        ))
          for (const [E, M] of Object.entries(m))
            console.debug(`[Mapping] ${C}: ${E} → ${M}`);
        const w = Object.values(ce.mapping).flatMap(
          (C) => Object.entries(C).filter(
            ([m, E]) => $.includes(E)
          ).map(([m]) => m)
        );
        console.debug("[SilamValidAllergenSlugs]", w);
      }
      const S = new Set(
        Object.values(ce.mapping).flatMap(
          (w) => Object.entries(w).filter(
            ([C, m]) => $.includes(m)
          ).map(([C]) => C)
        )
      );
      this.installedSilamLocations = Array.from(
        new Map(
          Object.values(e.states).filter((w) => {
            if (!w || typeof w != "object" || typeof w.entity_id != "string" || !w.entity_id.startsWith("sensor.silam_pollen_"))
              return !1;
            const C = w.entity_id.match(
              /^sensor\.silam_pollen_(.*)_([^_]+)$/
            );
            if (!C)
              return this.debug && console.debug("[Filter] Skip (no match):", w.entity_id), !1;
            const m = C[1], E = C[2];
            return this.debug && console.debug(
              "[Filter] entity_id:",
              w.entity_id,
              "| rawLocation:",
              m,
              "| allergenSlug:",
              E,
              "| validAllergen:",
              S.has(E)
            ), S.has(E);
          }).map((w) => {
            var R, z;
            const C = typeof w.entity_id == "string" ? w.entity_id.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/) : null, m = C ? C[1].replace(/^[-\s]+/, "") : "", E = Ae(m);
            let M = ((R = w.attributes) == null ? void 0 : R.location_title) || (typeof ((z = w.attributes) == null ? void 0 : z.friendly_name) == "string" ? w.attributes.friendly_name.replace(/^SILAM Pollen\s*-?\s*/i, "").replace(new RegExp("\\s+\\p{L}+$", "u"), "").trim() : "") || m;
            return M = M.replace(/^[-\s]+/, ""), M = M.charAt(0).toUpperCase() + M.slice(1), this.debug && console.debug(
              "[Map] entity_id:",
              w.entity_id,
              "| rawLocation:",
              m,
              "| slugified locationSlug:",
              E,
              "| title:",
              M
            ), [E, M];
          })
        )
      ), this.installedKleenexLocations = Array.from(
        new Map(
          Object.values(e.states).filter(
            (w) => w && typeof w == "object" && typeof w.entity_id == "string" && w.entity_id.startsWith("sensor.kleenex_pollen_radar_")
          ).map((w) => {
            var M;
            const C = w.entity_id.match(
              /^sensor\.kleenex_pollen_radar_(.*)_(?:tree|bomen|arbre|alber|grass|gras|graminee|graminace|weed|kruid|onkruid|herbacee|erbace)/
            );
            if (!C) return null;
            const m = C[1];
            let E = ((M = w.attributes) == null ? void 0 : M.friendly_name) || m;
            return E = E.replace(/^Kleenex Pollen Radar\s*[\(\-]?\s*/i, "").replace(/[\)\s]+(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Graminées|Herbacées|Alberi|Graminacee|Erbacee).*$/i, "").trim(), E || (E = m.charAt(0).toUpperCase() + m.slice(1)), [m, E];
          }).filter((w) => w !== null)
        )
      ), this._initDone || (d === "dwd" && !this._userConfig.region_id && this.installedRegionIds.length && (this._config.region_id = this.installedRegionIds[0]), d === "pp" && !this._userConfig.city && this.installedCities.length && (this._config.city = this.installedCities[0]), d === "silam" && !this._userConfig.location && this.installedSilamLocations.length && (this._config.location = this.installedSilamLocations[0][0]), d === "kleenex" && !this._userConfig.location && this.installedKleenexLocations.length && (this._config.location = this.installedKleenexLocations[0][0])), this.dispatchEvent(
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
    const r = new Set(this._config.allergens);
    i ? r.add(e) : r.delete(e), this.debug && console.log("[ALLERGEN-DEBUG] New allergen set:", [...r]), this._updateConfig("allergens", [...r]);
  }
  _toggleSelectAllAllergens(e) {
    const i = new Set(this._config.allergens), r = e.every((o) => i.has(o));
    this._config.integration === "peu" && this._config.mode !== "daily" && !r && this._updateConfig("mode", "daily");
    const s = r ? [] : e;
    this._updateConfig("allergens", [...s]);
  }
  _updateConfig(e, i) {
    if (this.debug && console.debug("[Editor] _updateConfig – prop:", e, "value:", i), e === "sort" && i === "none") {
      const o = { ...this._config, sort: i };
      this._config.integration === "kleenex" && this._config.sort_category_allergens_first && (o.sort_category_allergens_first = !1, delete this._userConfig.sort_category_allergens_first), this._config.integration === "peu" && this._config.allergy_risk_top && (o.allergy_risk_top = !1, delete this._userConfig.allergy_risk_top), this._config.integration === "silam" && this._config.index_top && (o.index_top = !1, delete this._userConfig.index_top), this._config = o, this._userConfig.sort = i, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-3-sort-none] Dispatching from sort=none handler"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", this._config.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: o },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "levels_inherit_mode") {
      if (i === "custom" && this._config.levels_inherit_mode !== "custom") {
        const o = {
          ...this._config,
          levels_inherit_mode: i,
          levels_gap: j.levels_gap,
          levels_colors: j.levels_colors,
          levels_empty_color: j.levels_empty_color,
          levels_gap_color: j.levels_gap_color
        };
        this._config = o, this._userConfig.levels_inherit_mode = i, delete this._userConfig.levels_gap, delete this._userConfig.levels_colors, delete this._userConfig.levels_empty_color, delete this._userConfig.levels_gap_color, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-4-levels-inherit-custom] Dispatching from levels_inherit_mode=custom"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", o.allergens), this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: o },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      } else if (i === "inherit_allergen" && this._config.levels_inherit_mode === "custom") {
        const o = this._config.allergen_stroke_width || j.allergen_stroke_width, a = Wt(o), l = (this._config.allergen_colors || j.allergen_colors)[0] || j.levels_empty_color, d = {
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
      const o = { ...this._config, allergen_colors: i };
      this._userConfig.allergen_colors = i, (this._config.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && i[0] && (o.levels_empty_color = i[0], this._userConfig.levels_empty_color = i[0]), this._config = o, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: o },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "allergen_stroke_width" && i === j.allergen_stroke_width) {
      const o = { ...this._config, allergen_stroke_width: i };
      if (this._userConfig.allergen_stroke_width = i, (this._config.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (this._config.allergen_levels_gap_synced ?? !0)) {
        const a = Wt(i);
        o.levels_gap = a, this._userConfig.levels_gap = a;
      }
      this._config = o, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-7-levels-stroke] Dispatching from levels_stroke_width change"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", o.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: o },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if ((e === "levels_thickness" || e === "levels_gap" || e === "levels_colors" || e === "levels_empty_color" || e === "levels_gap_color") && i === j[e]) {
      const o = { ...this._config, [e]: i };
      this._config = o, this._userConfig[e] = i, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-8-levels-visual] Dispatching from levels visual prop change"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", o.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: o },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "allergen_color_mode" && i === "default_colors" && this._config.allergen_color_mode === "custom") {
      const o = {
        ...this._config,
        allergen_color_mode: i,
        allergen_colors: j.allergen_colors,
        allergen_outline_color: j.levels_gap_color,
        no_allergens_color: j.no_allergens_color
      };
      this._config = o, this._userConfig.allergen_color_mode = i, delete this._userConfig.allergen_colors, delete this._userConfig.allergen_outline_color, delete this._userConfig.no_allergens_color, this.debug && console.log("[ALLERGEN-DEBUG] [DISPATCH-9-allergen-color-mode] Dispatching from allergen_color_mode change"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens:", o.allergens), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: o },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (e === "date_locale") {
      const o = this._config.sort, a = this._config.mode;
      this._config = {
        ...this._config,
        date_locale: i,
        sort: "",
        mode: ""
      }, this.requestUpdate(), setTimeout(() => {
        this._config = {
          ...this._config,
          sort: o,
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
    const r = { ...this._userConfig };
    let s;
    if (e === "integration") {
      const o = i, a = this._config.integration;
      o !== a && (delete r.city, delete r.region_id, delete r.location, delete r.entity_prefix, delete r.entity_suffix, delete r.mode, delete r.allergens, delete r.days_to_show, delete r.pollen_threshold, delete r.allergy_risk_top, delete r.index_top, this._allergensExplicit = !1), s = si(o === "dwd" ? Pe : o === "peu" ? ze : o === "silam" ? Te : o === "kleenex" ? Me : o === "plu" ? We : me, r), s.integration = o;
    } else {
      if (s = { ...this._config, [e]: i }, e === "allergens" && (this.debug && console.log("[ALLERGEN-DEBUG] _updateConfig called with allergens:", i), this.debug && console.log("[ALLERGEN-DEBUG] Before update - _userConfig.allergens:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] Before update - _allergensExplicit:", this._allergensExplicit), this._userConfig.allergens = i, this._allergensExplicit = !0, this.debug && console.log("[ALLERGEN-DEBUG] After update - _userConfig.allergens:", this._userConfig.allergens), this.debug && console.log("[ALLERGEN-DEBUG] After update - _allergensExplicit:", this._allergensExplicit), this.debug && console.debug(
        "[Editor] allergens explicitly changed:",
        this._userConfig.allergens
      )), ["city", "region_id", "location"].includes(e) && i !== "manual" && (s.entity_prefix = "", s.entity_suffix = ""), (this._config.integration === "silam" || this._config.integration === "peu") && e === "mode") {
        if (i !== "daily")
          s.days_to_show = 8, s.show_empty_days = !1, this._config.integration === "peu" && (s.allergens = ["allergy_risk"], this._userConfig.allergens = ["allergy_risk"], this._allergensExplicit = !0);
        else if (s.days_to_show = this._config.integration === "silam" ? 5 : 4, this._config.integration === "peu") {
          const o = this._config.allergens || [], a = o.length === 1 && o[0] === "allergy_risk";
          (!this._allergensExplicit || a) && (s.allergens = [...Jt], this._userConfig.allergens = [...Jt], this._allergensExplicit = !0);
        }
      }
      this._config.integration === "silam" && e === "location" && (this._hasSilamWeatherEntity(i) || (s.mode = "daily", s.days_to_show = 2));
    }
    s.type = this._config.type, Se(this._config, s) ? (this._config = s, this.debug && console.log("[ALLERGEN-DEBUG] Config unchanged, NOT dispatching")) : (this._config = s, this.debug && console.debug("[Editor] updated _config:", this._config), this.debug && console.log("[ALLERGEN-DEBUG] Dispatching config-changed event"), this.debug && console.log("[ALLERGEN-DEBUG] Config allergens being dispatched:", this._config.allergens), this.dispatchEvent(
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
      ...j,
      ...this._config
    }, i = e.integration === "dwd" ? Pe.allergens : e.integration === "peu" ? Jt : e.integration === "silam" ? hs : e.integration === "kleenex" ? Me.allergens : e.integration === "plu" ? We.allergens : me.allergens, r = e.integration === "dwd" ? 4 : e.integration === "peu" ? 5 : e.integration === "plu" ? 4 : 7, s = e.integration === "dwd" ? { min: 0, max: 3, step: 0.5 } : e.integration === "peu" ? { min: 0, max: 4, step: 1 } : e.integration === "plu" ? { min: 0, max: 3, step: 1 } : { min: 0, max: 6, step: 1 }, a = [
      "value_ascending",
      "value_descending",
      "name_ascending",
      "name_descending",
      "none"
    ].map((n) => ({
      value: n,
      label: this._t(`sort_${n}`)
    }));
    return this.debug && (console.debug("Aktuellt språk (lang):", this._lang), console.debug("Sort label test:", this._t("sort_value_ascending"))), B`
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
              @selected=${(n) => this._updateConfig("integration", n.target.value)}
              @closed=${(n) => n.stopPropagation()}
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
              <mwc-list-item value="plu"
                >${this._t("integration.plu")}</mwc-list-item
              >
              <mwc-list-item value="kleenex"
                >${this._t("integration.kleenex")}</mwc-list-item
              >
            </ha-select>
          </ha-formfield>
          ${e.integration === "pp" ? B`
                <ha-formfield label="${this._t("city")}">
                  <ha-select
                    .value=${e.city || ""}
                    @selected=${(n) => this._updateConfig("city", n.target.value)}
                    @closed=${(n) => n.stopPropagation()}
                  >
                    <mwc-list-item value=""
                      >${this._t("location_autodetect")}</mwc-list-item
                    >
                    ${this.installedCities.map(
      (n) => B`<mwc-list-item .value=${n}
                          >${n}</mwc-list-item
                        >`
    )}
                    <mwc-list-item value="manual"
                      >${this._t("location_manual")}</mwc-list-item
                    >
                  </ha-select>
                </ha-formfield>
              ` : e.integration === "peu" ? B`
                  <ha-formfield label="${this._t("location")}">
                    <ha-select
                      .value=${e.location || ""}
                      @selected=${(n) => this._updateConfig("location", n.target.value)}
                      @closed=${(n) => n.stopPropagation()}
                    >
                      <mwc-list-item value=""
                        >${this._t("location_autodetect")}</mwc-list-item
                      >
                      ${this.installedPeuLocations.map(
      ([n, l]) => B`<mwc-list-item .value=${n}
                            >${l}</mwc-list-item
                          >`
    )}
                      <mwc-list-item value="manual"
                        >${this._t("location_manual")}</mwc-list-item
                      >
                    </ha-select>
                  </ha-formfield>
                ` : e.integration === "silam" ? B`
                    <ha-formfield label="${this._t("location")}">
                      <ha-select
                        .value=${e.location || ""}
                        @selected=${(n) => this._updateConfig("location", n.target.value)}
                        @closed=${(n) => n.stopPropagation()}
                      >
                        <mwc-list-item value=""
                          >${this._t("location_autodetect")}</mwc-list-item
                        >
                        ${this.installedSilamLocations.map(
      ([n, l]) => B`<mwc-list-item .value=${n}
                              >${l}</mwc-list-item
                            >`
    )}
                        <mwc-list-item value="manual"
                          >${this._t("location_manual")}</mwc-list-item
                        >
                      </ha-select>
                    </ha-formfield>
                  ` : e.integration === "kleenex" ? B`
                      <ha-formfield label="${this._t("location")}">
                        <ha-select
                          .value=${e.location || ""}
                          @selected=${(n) => this._updateConfig("location", n.target.value)}
                          @closed=${(n) => n.stopPropagation()}
                        >
                          <mwc-list-item value=""
                            >${this._t("location_autodetect")}</mwc-list-item
                          >
                          ${this.installedKleenexLocations.map(
      ([n, l]) => B`<mwc-list-item .value=${n}
                                >${l}</mwc-list-item
                              >`
    )}
                          <mwc-list-item value="manual"
                            >${this._t("location_manual")}</mwc-list-item
                          >
                        </ha-select>
                      </ha-formfield>
                    ` : e.integration === "plu" ? "" : B`
                      <ha-formfield label="${this._t("region_id")}">
                        <ha-select
                          .value=${e.region_id || ""}
                          @selected=${(n) => this._updateConfig("region_id", n.target.value)}
                          @closed=${(n) => n.stopPropagation()}
                        >
                          <mwc-list-item value=""
                            >${this._t("location_autodetect")}</mwc-list-item
                          >
                          ${this.installedRegionIds.map(
      (n) => B`<mwc-list-item .value=${n}>
                                ${n} — ${Sa[n] || n}
                              </mwc-list-item>`
    )}
                          <mwc-list-item value="manual"
                            >${this._t("location_manual")}</mwc-list-item
                          >
                        </ha-select>
                      </ha-formfield>
                    `}
          ${e.integration === "silam" && this._hasSilamWeatherEntity(e.location) ? B`
                <ha-formfield label="${this._t("mode")}">
                  <ha-select
                    .value=${e.mode || "daily"}
                    @selected=${(n) => this._updateConfig("mode", n.target.value)}
                    @closed=${(n) => n.stopPropagation()}
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
              ` : e.integration === "peu" ? B`
                  <ha-formfield label="${this._t("mode")}">
                    <ha-select
                      .value=${e.mode || "daily"}
                      @selected=${(n) => this._updateConfig("mode", n.target.value)}
                      @closed=${(n) => n.stopPropagation()}
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
          ${e.integration === "pp" && e.city === "manual" || e.integration === "dwd" && e.region_id === "manual" || (e.integration === "peu" || e.integration === "silam" || e.integration === "kleenex") && e.location === "manual" ? B`
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
                  <ha-select
                    .value=${e.allergen_color_mode || "default_colors"}
                    @selected=${(n) => this._updateConfig("allergen_color_mode", n.target.value)}
                    @closed=${(n) => n.stopPropagation()}
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

              ${e.allergen_color_mode === "custom" ? B`
                    <ha-formfield
                      label="${this._t("allergen_colors") || "Allergen Colors (by Level)"}"
                    >
                      <div
                        style="display: flex; flex-direction: column; gap: 8px;"
                      >
                        ${(() => {
      const n = j.allergen_colors, l = e.allergen_colors || n;
      return l.map(
        (d, c) => B`
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
          h[c] = j.allergen_colors[c], this._updateConfig(
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
      const n = e.allergen_outline_color || j.levels_gap_color;
      return n.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(n) ? n : "#c8c8c8";
    })()}
                          @input=${(n) => this._updateConfig(
      "allergen_outline_color",
      n.target.value
    )}
                          style="width: 28px; height: 28px; border: none; background: none;"
                        />
                        <ha-textfield
                          .value=${e.allergen_outline_color || j.levels_gap_color}
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
      j.levels_gap_color
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
      e.no_allergens_color || j.no_allergens_color
    ) ? e.no_allergens_color || j.no_allergens_color : "#a9cfe0"}
                          @input=${(n) => this._updateConfig(
      "no_allergens_color",
      n.target.value
    )}
                          style="width: 28px; height: 28px; border: none; background: none;"
                        />
                        <ha-textfield
                          .value=${e.no_allergens_color || j.no_allergens_color}
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
      j.no_allergens_color
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
                .value=${e.allergen_stroke_width ?? j.allergen_stroke_width}
                @input=${(n) => {
      const l = Number(n.target.value);
      if (this._updateConfig("allergen_stroke_width", l), (e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (e.allergen_levels_gap_synced ?? !0)) {
        const d = Wt(l);
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
                .value=${e.allergen_stroke_width ?? j.allergen_stroke_width}
                @input=${(n) => {
      const l = n.target.value === "" ? j.allergen_stroke_width : Number(n.target.value);
      if (this._updateConfig("allergen_stroke_width", l), (e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (e.allergen_levels_gap_synced ?? !0)) {
        const d = Wt(l);
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
      j.allergen_stroke_width
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
                  <ha-select
                    .value=${e.levels_inherit_mode || "inherit_allergen"}
                    @selected=${(n) => this._updateConfig("levels_inherit_mode", n.target.value)}
                    @closed=${(n) => n.stopPropagation()}
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
              ${(e.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" ? B`
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
      (n, l) => B`
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
        d[l] = j.levels_colors[l], this._updateConfig("levels_colors", d);
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
      const n = e.levels_empty_color || j.levels_empty_color;
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
      j.levels_empty_color
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
      const n = e.levels_gap_color || j.levels_gap_color;
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
      j.levels_gap_color
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
      j.levels_thickness
    )}
                    style="margin-left: 8px;"
                    >↺</ha-button
                  >
                </ha-formfield>
              </div>

              <!-- Gap control - conditional on inheritance mode and sync setting -->
              ${(e.levels_inherit_mode || "inherit_allergen") === "custom" || !(e.allergen_levels_gap_synced ?? !0) ? B`
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
      j.levels_gap
    )}
                        style="margin-left: 8px;"
                        >↺</ha-button
                      >
                    </ha-formfield>
                  ` : B`
                    <ha-formfield label="${this._t("levels_gap_inherited")}">
                      <div
                        style="display: flex; align-items: center; gap: 8px; width: 120px; height: 30px;"
                      >
                        <span
                          style="color: var(--secondary-text-color); font-size: 14px; min-width: 30px"
                        >
                          ${Wt(
      e.allergen_stroke_width || j.allergen_stroke_width
    )}px
                        </span>
                      </div>
                    </ha-formfield>
                  `}

              <ha-formfield label="${this._t("levels_text_weight")}">
                <ha-select
                  .value=${e.levels_text_weight || "normal"}
                  @selected=${(n) => this._updateConfig("levels_text_weight", n.target.value)}
                  @closed=${(n) => n.stopPropagation()}
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
            ${e.integration === "peu" ? B`
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
          ${e.integration === "kleenex" ? B`
                <!-- Kleenex: Category allergens (controlled by checkbox) -->
                <div class="allergen-section">
                  <h4
                    style="margin: 8px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                  >
                    ${this._t("allergens_header_category")}
                  </h4>
                  <div class="allergens-group">
                    ${["trees_cat", "grass_cat", "weeds_cat"].map((n) => {
      const l = this._getAllergenDisplayName(n);
      return B`
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

                <!-- Kleenex: Individual allergens (enabled by default) -->
                <div class="allergen-section">
                  <h4
                    style="margin: 16px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                  >
                    ${this._t("allergens_header_specific")}
                  </h4>
                  <div class="allergens-group">
                    ${i.filter(
      (n) => !["trees_cat", "grass_cat", "weeds_cat"].includes(
        n
      )
    ).sort((n, l) => {
      const d = this._getAllergenDisplayName(n), c = this._getAllergenDisplayName(l);
      return d.localeCompare(c);
    }).map((n) => {
      const l = this._getAllergenDisplayName(n);
      return B`
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
              ` : B`
                <!-- Non-Kleenex: Standard allergen display -->
                <div class="allergens-group">
                  ${i.map((n) => {
      const l = this._getAllergenDisplayName(n);
      return B`
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
      const n = e.integration === "kleenex" ? [...i, "trees_cat", "grass_cat", "weeds_cat"] : i;
      this._toggleSelectAllAllergens(n);
    }}
            >
              ${this._t("select_all_allergens")}
            </ha-button>
          </div>
          <div class="slider-row">
            <div class="slider-text">${this._t("pollen_threshold")}</div>
            <div class="slider-value">${e.pollen_threshold}</div>
            <ha-slider
              min="${s.min}"
              max="${s.max}"
              step="${s.step}"
              .value=${e.pollen_threshold}
              @input=${(n) => this._updateConfig("pollen_threshold", Number(n.target.value))}
            ></ha-slider>
          </div>
          <ha-formfield label="${this._t("sort")}">
            <ha-select
              .value=${e.sort}
              @selected=${(n) => this._updateConfig("sort", n.target.value)}
              @closed=${(n) => n.stopPropagation()}
            >
              ${a.map(
      ({ value: n, label: l }) => B`<mwc-list-item .value=${n}>${l}</mwc-list-item>`
    )}
            </ha-select>
          </ha-formfield>
          ${e.integration === "kleenex" ? B`
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
          ${e.integration === "peu" || e.integration === "silam" ? B`
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
              <ha-select
                .value=${this._selectedPhraseLang}
                @selected=${(n) => this._selectedPhraseLang = n.target.value}
                @closed=${(n) => n.stopPropagation()}
              >
                ${Lc.map(
      (n) => B`
                    <mwc-list-item .value=${n}>
                      ${new Intl.DisplayNames([this._lang], {
        type: "language"
      }).of(n) || n}
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
      (n) => B`
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
            ${i.map(
      (n) => B`
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
            ${Array.from({ length: r }, (n, l) => l).map(
      (n) => B`
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
      (n) => B`
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
          ${this._tapType !== "none" ? B`
                <div style="margin-top: 10px;">
                  <label>Action type</label>
                  <ha-select
                    .value=${this._tapType}
                    @selected=${(n) => {
      this._tapType = n.target.value;
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
                    @closed=${(n) => n.stopPropagation()}
                  >
                    <mwc-list-item value="more-info">More Info</mwc-list-item>
                    <mwc-list-item value="navigate">Navigate</mwc-list-item>
                    <mwc-list-item value="call-service"
                      >Call Service</mwc-list-item
                    >
                  </ha-select>
                </div>
                ${this._tapType === "more-info" ? B`
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
                ${this._tapType === "navigate" ? B`
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
                ${this._tapType === "call-service" ? B`
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
            ${this._t("card_version")}: ${"v2.8.1"}
          </div>
        </details>
      </div>
    `;
  }
  static get styles() {
    return Zn`
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
customElements.define("pollenprognos-card-editor", fp);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "pollenprognos-card",
  name: "Pollenprognos Card",
  preview: !0,
  description: "Visar en grafisk prognos för pollenhalter",
  documentationURL: "https://github.com/krissen/pollenprognos-card"
});
