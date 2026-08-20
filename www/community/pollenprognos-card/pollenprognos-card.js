/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fr = globalThis, jo = fr.ShadowRoot && (fr.ShadyCSS === void 0 || fr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ro = Symbol(), ta = /* @__PURE__ */ new WeakMap();
let Ua = class {
  constructor(t, r, o) {
    if (this._$cssResult$ = !0, o !== Ro) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (jo && t === void 0) {
      const o = r !== void 0 && r.length === 1;
      o && (t = ta.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && ta.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const mn = (e) => new Ua(typeof e == "string" ? e : e + "", void 0, Ro), Xe = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((o, a, i) => o + ((l) => {
    if (l._$cssResult$ === !0) return l.cssText;
    if (typeof l == "number") return l;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + l + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[i + 1], e[0]);
  return new Ua(r, e, Ro);
}, fn = (e, t) => {
  if (jo) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const o = document.createElement("style"), a = fr.litNonce;
    a !== void 0 && o.setAttribute("nonce", a), o.textContent = r.cssText, e.appendChild(o);
  }
}, ra = jo ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const o of t.cssRules) r += o.cssText;
  return mn(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: vn, defineProperty: yn, getOwnPropertyDescriptor: bn, getOwnPropertyNames: wn, getOwnPropertySymbols: kn, getPrototypeOf: xn } = Object, Qe = globalThis, oa = Qe.trustedTypes, Sn = oa ? oa.emptyScript : "", eo = Qe.reactiveElementPolyfillSupport, jt = (e, t) => e, uo = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Sn : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, Va = (e, t) => !vn(e, t), aa = { attribute: !0, type: String, converter: uo, reflect: !1, useDefault: !1, hasChanged: Va };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Qe.litPropertyMetadata ?? (Qe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ft = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = aa) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const o = Symbol(), a = this.getPropertyDescriptor(t, o, r);
      a !== void 0 && yn(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, r, o) {
    const { get: a, set: i } = bn(this.prototype, t) ?? { get() {
      return this[r];
    }, set(l) {
      this[r] = l;
    } };
    return { get: a, set(l) {
      const n = a == null ? void 0 : a.call(this);
      i == null || i.call(this, l), this.requestUpdate(t, n, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? aa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(jt("elementProperties"))) return;
    const t = xn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(jt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(jt("properties"))) {
      const r = this.properties, o = [...wn(r), ...kn(r)];
      for (const a of o) this.createProperty(a, r[a]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [o, a] of r) this.elementProperties.set(o, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, o] of this.elementProperties) {
      const a = this._$Eu(r, o);
      a !== void 0 && this._$Eh.set(a, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const a of o) r.unshift(ra(a));
    } else t !== void 0 && r.push(ra(t));
    return r;
  }
  static _$Eu(t, r) {
    const o = r.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((r) => r(this));
  }
  addController(t) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) == null || r.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$EO) == null || r.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const o of r.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return fn(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((r) => {
      var o;
      return (o = r.hostConnected) == null ? void 0 : o.call(r);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var o;
      return (o = r.hostDisconnected) == null ? void 0 : o.call(r);
    });
  }
  attributeChangedCallback(t, r, o) {
    this._$AK(t, o);
  }
  _$ET(t, r) {
    var i;
    const o = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, o);
    if (a !== void 0 && o.reflect === !0) {
      const l = (((i = o.converter) == null ? void 0 : i.toAttribute) !== void 0 ? o.converter : uo).toAttribute(r, o.type);
      this._$Em = t, l == null ? this.removeAttribute(a) : this.setAttribute(a, l), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var i, l;
    const o = this.constructor, a = o._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const n = o.getPropertyOptions(a), s = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((i = n.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? n.converter : uo;
      this._$Em = a;
      const d = s.fromAttribute(r, n.type);
      this[a] = d ?? ((l = this._$Ej) == null ? void 0 : l.get(a)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(t, r, o, a = !1, i) {
    var l;
    if (t !== void 0) {
      const n = this.constructor;
      if (a === !1 && (i = this[t]), o ?? (o = n.getPropertyOptions(t)), !((o.hasChanged ?? Va)(i, r) || o.useDefault && o.reflect && i === ((l = this._$Ej) == null ? void 0 : l.get(t)) && !this.hasAttribute(n._$Eu(t, o)))) return;
      this.C(t, r, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: o, reflect: a, wrapped: i }, l) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, l ?? r ?? this[t]), i !== !0 || l !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (r = void 0), this._$AL.set(t, r)), a === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var o;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [i, l] of this._$Ep) this[i] = l;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [i, l] of a) {
        const { wrapped: n } = l, s = this[i];
        n !== !0 || this._$AL.has(i) || s === void 0 || this.C(i, void 0, l, s);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (o = this._$EO) == null || o.forEach((a) => {
        var i;
        return (i = a.hostUpdate) == null ? void 0 : i.call(a);
      }), this.update(r)) : this._$EM();
    } catch (a) {
      throw t = !1, this._$EM(), a;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((o) => {
      var a;
      return (a = o.hostUpdated) == null ? void 0 : a.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ft.elementStyles = [], ft.shadowRootOptions = { mode: "open" }, ft[jt("elementProperties")] = /* @__PURE__ */ new Map(), ft[jt("finalized")] = /* @__PURE__ */ new Map(), eo == null || eo({ ReactiveElement: ft }), (Qe.reactiveElementVersions ?? (Qe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = globalThis, ia = (e) => e, xr = Rt.trustedTypes, na = xr ? xr.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Wa = "$lit$", qe = `lit$${Math.random().toFixed(9).slice(2)}$`, qa = "?" + qe, zn = `<${qa}>`, dt = document, Ut = () => dt.createComment(""), Vt = (e) => e === null || typeof e != "object" && typeof e != "function", Do = Array.isArray, An = (e) => Do(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", to = `[ 	
\f\r]`, Lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, la = /-->/g, sa = />/g, et = RegExp(`>|${to}(?:([^\\s"'>=/]+)(${to}*=${to}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), da = /'/g, ca = /"/g, Za = /^(?:script|style|textarea|title)$/i, $n = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), A = $n(1), ct = Symbol.for("lit-noChange"), fe = Symbol.for("lit-nothing"), _a = /* @__PURE__ */ new WeakMap(), ot = dt.createTreeWalker(dt, 129);
function Qa(e, t) {
  if (!Do(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return na !== void 0 ? na.createHTML(t) : t;
}
const Pn = (e, t) => {
  const r = e.length - 1, o = [];
  let a, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", l = Lt;
  for (let n = 0; n < r; n++) {
    const s = e[n];
    let d, _, c = -1, u = 0;
    for (; u < s.length && (l.lastIndex = u, _ = l.exec(s), _ !== null); ) u = l.lastIndex, l === Lt ? _[1] === "!--" ? l = la : _[1] !== void 0 ? l = sa : _[2] !== void 0 ? (Za.test(_[2]) && (a = RegExp("</" + _[2], "g")), l = et) : _[3] !== void 0 && (l = et) : l === et ? _[0] === ">" ? (l = a ?? Lt, c = -1) : _[1] === void 0 ? c = -2 : (c = l.lastIndex - _[2].length, d = _[1], l = _[3] === void 0 ? et : _[3] === '"' ? ca : da) : l === ca || l === da ? l = et : l === la || l === sa ? l = Lt : (l = et, a = void 0);
    const h = l === et && e[n + 1].startsWith("/>") ? " " : "";
    i += l === Lt ? s + zn : c >= 0 ? (o.push(d), s.slice(0, c) + Wa + s.slice(c) + qe + h) : s + qe + (c === -2 ? n : h);
  }
  return [Qa(e, i + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), o];
};
class Wt {
  constructor({ strings: t, _$litType$: r }, o) {
    let a;
    this.parts = [];
    let i = 0, l = 0;
    const n = t.length - 1, s = this.parts, [d, _] = Pn(t, r);
    if (this.el = Wt.createElement(d, o), ot.currentNode = this.el.content, r === 2 || r === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (a = ot.nextNode()) !== null && s.length < n; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const c of a.getAttributeNames()) if (c.endsWith(Wa)) {
          const u = _[l++], h = a.getAttribute(c).split(qe), p = /([.?@])?(.*)/.exec(u);
          s.push({ type: 1, index: i, name: p[2], strings: h, ctor: p[1] === "." ? Cn : p[1] === "?" ? En : p[1] === "@" ? Ln : Nr }), a.removeAttribute(c);
        } else c.startsWith(qe) && (s.push({ type: 6, index: i }), a.removeAttribute(c));
        if (Za.test(a.tagName)) {
          const c = a.textContent.split(qe), u = c.length - 1;
          if (u > 0) {
            a.textContent = xr ? xr.emptyScript : "";
            for (let h = 0; h < u; h++) a.append(c[h], Ut()), ot.nextNode(), s.push({ type: 2, index: ++i });
            a.append(c[u], Ut());
          }
        }
      } else if (a.nodeType === 8) if (a.data === qa) s.push({ type: 2, index: i });
      else {
        let c = -1;
        for (; (c = a.data.indexOf(qe, c + 1)) !== -1; ) s.push({ type: 7, index: i }), c += qe.length - 1;
      }
      i++;
    }
  }
  static createElement(t, r) {
    const o = dt.createElement("template");
    return o.innerHTML = t, o;
  }
}
function kt(e, t, r = e, o) {
  var l, n;
  if (t === ct) return t;
  let a = o !== void 0 ? (l = r._$Co) == null ? void 0 : l[o] : r._$Cl;
  const i = Vt(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== i && ((n = a == null ? void 0 : a._$AO) == null || n.call(a, !1), i === void 0 ? a = void 0 : (a = new i(e), a._$AT(e, r, o)), o !== void 0 ? (r._$Co ?? (r._$Co = []))[o] = a : r._$Cl = a), a !== void 0 && (t = kt(e, a._$AS(e, t.values), a, o)), t;
}
class Mn {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: o } = this._$AD, a = ((t == null ? void 0 : t.creationScope) ?? dt).importNode(r, !0);
    ot.currentNode = a;
    let i = ot.nextNode(), l = 0, n = 0, s = o[0];
    for (; s !== void 0; ) {
      if (l === s.index) {
        let d;
        s.type === 2 ? d = new ar(i, i.nextSibling, this, t) : s.type === 1 ? d = new s.ctor(i, s.name, s.strings, this, t) : s.type === 6 && (d = new In(i, this, t)), this._$AV.push(d), s = o[++n];
      }
      l !== (s == null ? void 0 : s.index) && (i = ot.nextNode(), l++);
    }
    return ot.currentNode = dt, a;
  }
  p(t) {
    let r = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(t, o, r), r += o.strings.length - 2) : o._$AI(t[r])), r++;
  }
}
class ar {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, o, a) {
    this.type = 2, this._$AH = fe, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = o, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = kt(this, t, r), Vt(t) ? t === fe || t == null || t === "" ? (this._$AH !== fe && this._$AR(), this._$AH = fe) : t !== this._$AH && t !== ct && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : An(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== fe && Vt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(dt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var i;
    const { values: r, _$litType$: o } = t, a = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = Wt.createElement(Qa(o.h, o.h[0]), this.options)), o);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === a) this._$AH.p(r);
    else {
      const l = new Mn(a, this), n = l.u(this.options);
      l.p(r), this.T(n), this._$AH = l;
    }
  }
  _$AC(t) {
    let r = _a.get(t.strings);
    return r === void 0 && _a.set(t.strings, r = new Wt(t)), r;
  }
  k(t) {
    Do(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let o, a = 0;
    for (const i of t) a === r.length ? r.push(o = new ar(this.O(Ut()), this.O(Ut()), this, this.options)) : o = r[a], o._$AI(i), a++;
    a < r.length && (this._$AR(o && o._$AB.nextSibling, a), r.length = a);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var o;
    for ((o = this._$AP) == null ? void 0 : o.call(this, !1, !0, r); t !== this._$AB; ) {
      const a = ia(t).nextSibling;
      ia(t).remove(), t = a;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Nr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, o, a, i) {
    this.type = 1, this._$AH = fe, this._$AN = void 0, this.element = t, this.name = r, this._$AM = a, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = fe;
  }
  _$AI(t, r = this, o, a) {
    const i = this.strings;
    let l = !1;
    if (i === void 0) t = kt(this, t, r, 0), l = !Vt(t) || t !== this._$AH && t !== ct, l && (this._$AH = t);
    else {
      const n = t;
      let s, d;
      for (t = i[0], s = 0; s < i.length - 1; s++) d = kt(this, n[o + s], r, s), d === ct && (d = this._$AH[s]), l || (l = !Vt(d) || d !== this._$AH[s]), d === fe ? t = fe : t !== fe && (t += (d ?? "") + i[s + 1]), this._$AH[s] = d;
    }
    l && !a && this.j(t);
  }
  j(t) {
    t === fe ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Cn extends Nr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === fe ? void 0 : t;
  }
}
class En extends Nr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== fe);
  }
}
class Ln extends Nr {
  constructor(t, r, o, a, i) {
    super(t, r, o, a, i), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = kt(this, t, r, 0) ?? fe) === ct) return;
    const o = this._$AH, a = t === fe && o !== fe || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, i = t !== fe && (o === fe || a);
    a && this.element.removeEventListener(this.name, this, o), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class In {
  constructor(t, r, o) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    kt(this, t);
  }
}
const ro = Rt.litHtmlPolyfillSupport;
ro == null || ro(Wt, ar), (Rt.litHtmlVersions ?? (Rt.litHtmlVersions = [])).push("3.3.3");
const Tn = (e, t, r) => {
  const o = (r == null ? void 0 : r.renderBefore) ?? t;
  let a = o._$litPart$;
  if (a === void 0) {
    const i = (r == null ? void 0 : r.renderBefore) ?? null;
    o._$litPart$ = a = new ar(t.insertBefore(Ut(), i), i, void 0, r ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis;
let lt = class extends ft {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const t = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = t.firstChild), t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Tn(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return ct;
  }
};
var Fa;
lt._$litElement$ = !0, lt.finalized = !0, (Fa = nt.litElementHydrateSupport) == null || Fa.call(nt, { LitElement: lt });
const oo = nt.litElementPolyfillSupport;
oo == null || oo({ LitElement: lt });
(nt.litElementVersions ?? (nt.litElementVersions = [])).push("4.2.2");
const _e = (e, t = "_") => {
  const r = "àáâäæãåāăąабçćčđďдèéêëēėęěеёэфğǵгḧхîïíīįìıİийкłлḿмñńǹňнôöòóœøōõőоṕпŕřрßśšşșсťțтûüùúūǘůűųувẃẍÿýыžźżз·", o = `aaaaaaaaaaabcccdddeeeeeeeeeeefggghhiiiiiiiiijkllmmnnnnnoooooooooopprrrsssssstttuuuuuuuuuuvwxyyyzzzz${t}`, a = new RegExp(r.split("").join("|"), "g"), i = {
    ж: "zh",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ю: "iu",
    я: "ia"
  };
  let l;
  return e === "" ? l = "" : (l = e.toString().toLowerCase().replace(a, (n) => o.charAt(r.indexOf(n))).replace(/[а-я]/g, (n) => i[n] || "").replace(/(\d),(?=\d)/g, "$1").replace(/[^a-z0-9]+/g, t).replace(new RegExp(`(${t})\\1+`, "g"), "$1").replace(new RegExp(`^${t}+`), "").replace(new RegExp(`${t}+$`), ""), l === "" && (l = "unknown")), l;
}, Nn = {
  "card.allergen.alder": "Olše",
  "card.allergen.allergy_risk": "Riziko alergie",
  "card.allergen.ash": "Jasan",
  "card.allergen.beech": "Buk",
  "card.allergen.birch": "Bříza",
  "card.allergen.chenopod": "Laskavec",
  "card.allergen.cypress": "Cypřiš",
  "card.allergen.elm": "Jilm",
  "card.allergen.goosefoot": "Mrlík",
  "card.allergen.graminales": "Trávy",
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
  "card.allergen.plantain": "Jitrocel",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Traviny",
  "card.allergen.poplar": "Topol",
  "card.allergen.qualite_globale": "Kvalita ovzduší",
  "card.allergen.ragweed": "Ambrozie",
  "card.allergen.rye": "Žito",
  "card.allergen.so2": "Oxid siřičitý",
  "card.allergen.sorrel": "Šťovík",
  "card.allergen.sweet_chestnut": "Kaštanovník",
  "card.allergen.tree_of_heaven": "Pajasan",
  "card.allergen.trees": "Stromy",
  "card.allergen.trees_cat": "Stromy",
  "card.allergen.weeds": "Plevely",
  "card.allergen.weeds_cat": "Plevely",
  "card.allergen.willow": "Vrba",
  "card.atmo.event": "Událost",
  "card.atmo.unavailable": "Nedostupné",
  "card.days.0": "Dnes",
  "card.days.1": "Zítra",
  "card.days.2": "Pozítří",
  "card.error": "Nenalezeny žádné pylové senzory. Je správná integrace nainstalována a vybrán region v nastavení karty?",
  "card.error_entity_unavailable": "Meteorologická entita není dostupná. Integrace může být offline nebo se restartuje.",
  "card.error_filtered_sensors": "Žádné senzory neodpovídají filtrům. Zkontrolujte vybrané alergeny a práh.",
  "card.error_location_not_found": "Umístění nebylo nalezeno. Zkontrolujte název umístění v konfiguraci karty.",
  "card.error_no_sensors": "Nenalezeny žádné pylové senzory. Je správná integrace nainstalována a vybrán region v nastavení karty?",
  "card.header_no_location": "Pylová předpověď",
  "card.header_prefix": "Pylová předpověď pro",
  "card.index.very_low": "Velmi nízké úrovně",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Žádný pyl",
  "card.levels5.1": "Nízké úrovně",
  "card.levels5.2": "Střední úrovně",
  "card.levels5.3": "Vysoké úrovně",
  "card.levels5.4": "Velmi vysoké úrovně",
  "card.loading_forecast": "Načítání předpovědi...",
  "card.location.plu": "Lucembursko",
  "card.no_allergens": "Žádné alergeny",
  "card.no_information": "(Žádné informace)",
  "card.stale_allergen": "Žádná data",
  "card.stale_data": "Pylová data jsou dočasně nedostupná",
  "card.stale_data_subtitle": "Poskytovatel momentálně nevrací data pro tuto oblast",
  "card.summary.in_season_label": "V sezóně",
  "card.summary.top_label": "Nejvíce",
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
  "editor.badge_content_aggregate": "Celkové riziko",
  "editor.badge_content_row": "Několik (řádek)",
  "editor.badge_content_single": "Jeden alergen",
  "editor.badge_content_worst": "Nejvyšší úroveň pylu",
  "editor.badge_label_content": "Popisek zobrazuje",
  "editor.badge_label_content_allergen": "Název alergenu",
  "editor.badge_label_content_allergen_level": "Název alergenu a úroveň",
  "editor.badge_label_content_level": "Úroveň pylu",
  "editor.badge_label_position": "Umístění popisku",
  "editor.badge_label_position_below": "Pod",
  "editor.badge_label_position_right": "Vpravo",
  "editor.badge_scale": "Velikost odznaku (měřítko)",
  "editor.badge_icon_scale": "Měřítko ikony",
  "editor.badge_show_label": "Zobrazit popisek",
  "editor.badge_single_allergen": "Alergen",
  "editor.badge_version": "Verze odznaku s pylovou předpovědí",
  "editor.badge_visual_icon_in_ring": "Ikona v kruhu",
  "editor.badge_visual_icon_only": "Pouze ikona",
  "editor.badge_visual_ring_empty": "Prázdný kruh",
  "editor.badge_visual_ring_value": "Kruh s hodnotou",
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
  "editor.entity_weather": "Entita počasí (pouze SILAM)",
  "editor.entity_weather_placeholder": "např. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Ladění a informace o verzi. Většina uživatelů to nepotřebuje.",
  "editor.helper_allergen_icons": "Vzhled ikon alergenů (levý sloupec nebo uvnitř kruhu).",
  "editor.helper_allergen_levels_gap_synced": "Když je zapnuto, šířka mezery odpovídá tloušťce čáry alergenu (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Tloušťka čáry ikony alergenu. Když je aktivní režim dědění, řídí také mezeru v kruhu úrovní (viz Kruhy úrovní).",
  "editor.helper_allergens": "Které alergeny zobrazit, práh a řazení.",
  "editor.helper_badge_appearance": "Velikost odznaku, pozadí a popisek.",
  "editor.helper_badge_content": "Co odznak zobrazuje.",
  "editor.helper_badge_interactivity": "Co se stane, když uživatel klepne na odznak nebo alergen.",
  "editor.helper_card_appearance": "Pozadí a celková velikost karty.",
  "editor.helper_card_interactivity": "Co se stane, když uživatel klepne na kartu nebo alergen.",
  "editor.helper_card_layout": "Kompaktní (minimální) režim a které sloupce jsou viditelné.",
  "editor.helper_day_display": "Co se zobrazuje v každém sloupci dne: hodnoty a popisky.",
  "editor.helper_icon_in_ring": "Vykreslí ikonu alergenu uprostřed kruhu úrovní.",
  "editor.helper_integration_and_place": "Zdrojová integrace, poloha a název karty.",
  "editor.helper_level_circles": "Kruhový graf kolem každého alergenu zobrazující dnešní úroveň pylu.",
  "editor.helper_levels_gap_synced": "Řízeno tloušťkou čáry alergenu, dokud je synchronizace zapnutá. Pro úpravu synchronizaci vypněte.",
  "editor.helper_levels_gap_unsynced": "Mezera mezi segmenty kruhu úrovní.",
  "editor.helper_minimal": "Kompaktní rozvržení: pouze ikony, bez názvů alergenů a hodnot.",
  "editor.helper_minimal_gap": "Rozestup mezi ikonami alergenů v minimálním režimu.",
  "editor.helper_show_allergen_column": "Zobrazit levý sloupec s názvy alergenů.",
  "editor.helper_show_value_numeric_in_circle": "Vykreslí úroveň dne jako malé číslo uprostřed kruhu.",
  "editor.helper_numeric_value_raw": "Zobrazuje surové měření (koncentrace / index) místo vypočtené úrovně jako číselnou hodnotu. Platí pouze pro integrace, které hlásí surovou hodnotu (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Přepsat vestavěné lokalizované fráze.",
  "editor.icon_color_custom": "Vlastní barva",
  "editor.icon_color_inherit": "Dědit z grafu",
  "editor.icon_color_mode": "Režim barvy ikony",
  "editor.icon_color_picker": "Vybrat barvu ikony",
  "editor.icon_in_ring": "Zobrazit ikonu alergenu uvnitř kruhu",
  "editor.icon_in_ring_color_follow": "Podle barvy úrovně",
  "editor.icon_in_ring_color_mode": "Režim barvy středové ikony",
  "editor.icon_in_ring_color_static": "Statická barva",
  "editor.icon_in_ring_header": "Ikona v kruhu",
  "editor.icon_in_ring_size_ratio": "Velikost ikony (podíl otvoru kruhu)",
  "editor.icon_in_ring_static_color": "Statická barva",
  "editor.icon_size": "Velikost ikony (px)",
  "editor.index_top": "Index navrchu seznamu",
  "editor.integration": "Integrace",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Zobrazit surovou hodnotu (koncentrace)",
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
  "editor.phrases_full.graminales": "Trávy",
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
  "editor.phrases_full.plantain": "Jitrocel",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Traviny",
  "editor.phrases_full.poplar": "Topol",
  "editor.phrases_full.qualite_globale": "Kvalita ovzduší",
  "editor.phrases_full.ragweed": "Ambrozie",
  "editor.phrases_full.rye": "Žito",
  "editor.phrases_full.so2": "Oxid siřičitý",
  "editor.phrases_full.sorrel": "Šťovík",
  "editor.phrases_full.sweet_chestnut": "Kaštanovník",
  "editor.phrases_full.tree_of_heaven": "Pajasan",
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
  "editor.phrases_levels5.0": "Žádný pyl",
  "editor.phrases_levels5.1": "Nízké úrovně",
  "editor.phrases_levels5.2": "Střední úrovně",
  "editor.phrases_levels5.3": "Vysoké úrovně",
  "editor.phrases_levels5.4": "Velmi vysoké úrovně",
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
  "editor.phrases_short.graminales": "Trávy",
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
  "editor.phrases_short.plantain": "Jitrc",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Travin",
  "editor.phrases_short.poplar": "Topol",
  "editor.phrases_short.qualite_globale": "IKO",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Žito",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Šťov",
  "editor.phrases_short.sweet_chestnut": "Kašt",
  "editor.phrases_short.tree_of_heaven": "Pajas",
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
  "editor.preset_reset_section": "Obnovit sekci",
  "editor.region_id": "ID regionu",
  "editor.select_all_allergens": "Vybrat všechny alergeny",
  "editor.select_all_pollen": "Vybrat pyl",
  "editor.select_all_pollution": "Vybrat kvalitu ovzduší",
  "editor.show_allergen_column": "Zobrazit sloupec alergenů",
  "editor.show_block_separator": "Zobrazit oddělovač mezi bloky",
  "editor.show_empty_days": "Zobrazit prázdné dny",
  "editor.show_google_attribution": "Zobrazit uvedení zdroje Google",
  "editor.show_no_data_distinct": 'Zobrazit "žádná data" s výrazným (rozmazaným) stylem',
  "editor.show_summary_block": "Zobrazit souhrnný blok",
  "editor.show_summary_plants_in_season": "Zobrazit rostliny v sezóně",
  "editor.show_summary_row": "Zobrazit také podrobné řádky alergenů (vyžaduje zapnutý souhrn)",
  "editor.show_summary_separator": "Zobrazit oddělovač mezi souhrnem a podrobnými řádky",
  "editor.show_summary_top_types": "Zobrazit nejčastější typy pylu",
  "editor.show_text_allergen": "Zobrazit text, alergen",
  "editor.show_value_numeric": "Zobrazit číselnou hodnotu",
  "editor.show_value_numeric_in_circle": "Zobrazit číselnou hodnotu uvnitř kruhu",
  "editor.show_value_text": "Zobrazit hodnotu jako text",
  "editor.show_version": "Zapisovat verzi do konzole",
  "editor.sort": "Řazení",
  "editor.sort_category_allergens_first": "Seřadit kategorie alergenů nahoře",
  "editor.sort_name_ascending": "název, vzestupně",
  "editor.sort_name_descending": "název, sestupně",
  "editor.sort_none": "žádné (pořadí konfigurace)",
  "editor.sort_pollution_block": "Seskupit znečištění odděleně",
  "editor.sort_value_ascending": "hodnota, vzestupně",
  "editor.sort_value_descending": "hodnota, sestupně",
  "editor.subgroup_day_labels": "Popisky dnů",
  "editor.subgroup_source": "Zdroj",
  "editor.subgroup_title": "Název",
  "editor.subgroup_values": "Hodnoty zobrazené za den",
  "editor.summary_advanced": "Pokročilé",
  "editor.summary_allergen_icons": "Ikony alergenů",
  "editor.summary_allergens": "Alergeny",
  "editor.summary_badge_appearance": "Vzhled odznaku",
  "editor.summary_badge_content": "Obsah odznaku",
  "editor.summary_badge_interactivity": "Interakce",
  "editor.summary_card_appearance": "Vzhled",
  "editor.summary_card_interactivity": "Interakce",
  "editor.summary_card_layout": "Rozvržení",
  "editor.summary_day_display": "Zobrazení dnů",
  "editor.summary_entity_prefix_suffix": "Vlastní prefix a suffix",
  "editor.summary_icon_in_ring": "Ikona v kruhu",
  "editor.summary_integration_and_place": "Integrace a místo",
  "editor.summary_level_circles": "Kruhy úrovní",
  "editor.summary_minimal": "Minimální",
  "editor.summary_translation_and_strings": "Překlad a řetězce",
  "editor.tap_action": "Akce na klepnutí",
  "editor.tap_action_enable": "Povolit akci na klepnutí",
  "editor.tap_action_entity": "Entita",
  "editor.tap_action_more_info_needs_entity": "Tato akce vyžaduje entitu; bez ní neudělá nic.",
  "editor.tap_action_navigate_needs_path": "Tato akce vyžaduje navigační cestu; bez ní neudělá nic.",
  "editor.tap_action_call_service_needs_service": "Tato akce vyžaduje platné id ve tvaru domain.service; bez něj neudělá nic.",
  "editor.tap_action_navigation_path": "Navigační cesta",
  "editor.tap_action_service": "Akce (např. light.turn_on)",
  "editor.tap_action_service_data": "Data akce (JSON)",
  "editor.tap_action_type": "Typ akce",
  "editor.tap_action_type_call_service": "Provést akci",
  "editor.tap_action_type_more_info": "Více informací",
  "editor.tap_action_type_navigate": "Navigovat",
  "editor.text_size_ratio": "Poměr velikosti textu (%)",
  "editor.title": "Název karty",
  "editor.title_automatic": "Automatický název",
  "editor.title_hide": "Skrýt název",
  "editor.title_placeholder": "(automaticky)",
  "editor.to_show_columns": "Počet sloupců k zobrazení",
  "editor.to_show_days": "Počet dní k zobrazení",
  "editor.to_show_hours": "Počet hodin k zobrazení"
}, jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Nn
}, Symbol.toStringTag, { value: "Module" })), Rn = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisiko",
  "card.allergen.ash": "Ask",
  "card.allergen.beech": "Bøg",
  "card.allergen.birch": "Birk",
  "card.allergen.chenopod": "Gåsefod",
  "card.allergen.cypress": "Cypres",
  "card.allergen.elm": "El",
  "card.allergen.goosefoot": "Mælde",
  "card.allergen.graminales": "Græs",
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
  "card.allergen.sweet_chestnut": "Ægte kastanje",
  "card.allergen.tree_of_heaven": "Skyrækker",
  "card.allergen.trees": "Træer",
  "card.allergen.trees_cat": "Træer",
  "card.allergen.weeds": "Ukrudt",
  "card.allergen.weeds_cat": "Ukrudt",
  "card.allergen.willow": "Pil",
  "card.atmo.event": "Hændelse",
  "card.atmo.unavailable": "Ikke tilgængelig",
  "card.days.0": "I dag",
  "card.days.1": "I morgen",
  "card.days.2": "Overmorgen",
  "card.error": "Ingen pollensensor fundet. Har du installeret den korrekte integration og valgt region i kortets opsætning?",
  "card.error_entity_unavailable": "Vejrentiteten er ikke tilgængelig. Integrationen er muligvis offline eller genstarter.",
  "card.error_filtered_sensors": "Ingen sensorer matcher dine filtre. Tjek udvalgte allergener og tærskel.",
  "card.error_location_not_found": "Placering ikke fundet. Kontroller placeringsnavnet i kortkonfigurationen.",
  "card.error_no_sensors": "Ingen pollensensor fundet. Har du installeret den korrekte integration og valgt region i kortets opsætning?",
  "card.header_no_location": "Pollenprognose",
  "card.header_prefix": "Pollenprognose for",
  "card.index.very_low": "Meget lave niveauer",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Ingen pollen",
  "card.levels5.1": "Lave niveauer",
  "card.levels5.2": "Moderat niveau",
  "card.levels5.3": "Høje niveauer",
  "card.levels5.4": "Meget høje niveauer",
  "card.loading_forecast": "Indlæser prognose...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Ingen allergener",
  "card.no_information": "(Ingen information)",
  "card.stale_allergen": "Ingen data",
  "card.stale_data": "Pollendata er midlertidigt utilgængelige",
  "card.stale_data_subtitle": "Udbyderen leverer i øjeblikket ingen data for denne region",
  "card.summary.in_season_label": "I sæson",
  "card.summary.top_label": "Top",
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
  "editor.badge_content_aggregate": "Samlet risiko",
  "editor.badge_content_row": "Flere (række)",
  "editor.badge_content_single": "Enkelt allergen",
  "editor.badge_content_worst": "Højeste pollenniveau",
  "editor.badge_label_content": "Etiketten viser",
  "editor.badge_label_content_allergen": "Allergennavn",
  "editor.badge_label_content_allergen_level": "Allergennavn og niveau",
  "editor.badge_label_content_level": "Pollenniveau",
  "editor.badge_label_position": "Etikettens placering",
  "editor.badge_label_position_below": "Under",
  "editor.badge_label_position_right": "Højre",
  "editor.badge_scale": "Badgestørrelse (skala)",
  "editor.badge_icon_scale": "Ikonskala",
  "editor.badge_show_label": "Vis etiket",
  "editor.badge_single_allergen": "Allergen",
  "editor.badge_version": "Pollenprognose-badgens version",
  "editor.badge_visual_icon_in_ring": "Ikon i ring",
  "editor.badge_visual_icon_only": "Kun ikon",
  "editor.badge_visual_ring_empty": "Tom ring",
  "editor.badge_visual_ring_value": "Ring med værdi",
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
  "editor.entity_weather": "Vejrentitet (kun SILAM)",
  "editor.entity_weather_placeholder": "fx. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Fejlfinding og versionsinformation. De fleste brugere har ikke brug for dette.",
  "editor.helper_allergen_icons": "Udseende af allergenikonerne (venstre kolonne eller i ringen).",
  "editor.helper_allergen_levels_gap_synced": "Når slået til følger mellemrummets bredde allergenets stregtykkelse (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Stregtykkelse for allergenikonet. Styrer også mellemrummet i niveaucirklen, når nedarvningstilstanden er aktiv (se Niveaucirkler).",
  "editor.helper_allergens": "Hvilke allergener der vises, tærskel og sorteringsrækkefølge.",
  "editor.helper_badge_appearance": "Badgestørrelse, baggrund og etiket.",
  "editor.helper_badge_content": "Hvad badgen viser.",
  "editor.helper_badge_interactivity": "Hvad der sker, når brugeren trykker på badgen eller et allergen.",
  "editor.helper_card_appearance": "Baggrund og kortets samlede størrelse.",
  "editor.helper_card_interactivity": "Hvad der sker, når brugeren trykker på kortet eller et allergen.",
  "editor.helper_card_layout": "Kompakt (minimal) tilstand og hvilke kolonner der er synlige.",
  "editor.helper_day_display": "Hvad der vises i hver dagkolonne: værdier og etiketter.",
  "editor.helper_icon_in_ring": "Vis allergenikonet centreret inde i niveaucirklen.",
  "editor.helper_integration_and_place": "Kildeintegration, placering og kortets titel.",
  "editor.helper_level_circles": "Ringdiagram omkring hvert allergen, der viser dagens pollenniveau.",
  "editor.helper_levels_gap_synced": "Styres af allergenets stregtykkelse, mens synkronisering er slået til. Slå synkronisering fra for at redigere.",
  "editor.helper_levels_gap_unsynced": "Mellemrum mellem niveauringens segmenter.",
  "editor.helper_minimal": "Kompakt layout: kun ikoner, ingen allergennavne eller værdier.",
  "editor.helper_minimal_gap": "Afstand mellem allergenikoner i minimal tilstand.",
  "editor.helper_show_allergen_column": "Vis venstre kolonne med allergennavne.",
  "editor.helper_show_value_numeric_in_circle": "Viser dagens niveau som et lille tal centreret inde i ringen.",
  "editor.helper_numeric_value_raw": "Viser den rå måling (koncentration / indeks) i stedet for det beregnede niveau som talværdi. Gælder kun for integrationer, der rapporterer en rå værdi (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Tilsidesæt indbyggede oversatte tekster.",
  "editor.icon_color_custom": "Brugerdefineret farve",
  "editor.icon_color_inherit": "Arv fra diagram",
  "editor.icon_color_mode": "Ikonfarvetilstand",
  "editor.icon_color_picker": "Vælg ikonfarve",
  "editor.icon_in_ring": "Vis allergenikon inde i ringen",
  "editor.icon_in_ring_color_follow": "Følg niveaufarve",
  "editor.icon_in_ring_color_mode": "Farvetilstand for midterikon",
  "editor.icon_in_ring_color_static": "Statisk farve",
  "editor.icon_in_ring_header": "Ikon i ring",
  "editor.icon_in_ring_size_ratio": "Ikonstørrelse (andel af ringens hul)",
  "editor.icon_in_ring_static_color": "Statisk farve",
  "editor.icon_size": "Ikonstørrelse (px)",
  "editor.index_top": "Indeks øverst på listen",
  "editor.integration": "Integration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Vis rå værdi (koncentration)",
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
  "editor.phrases_full.graminales": "Græs",
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
  "editor.phrases_full.sweet_chestnut": "Ægte kastanje",
  "editor.phrases_full.tree_of_heaven": "Skyrækker",
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
  "editor.phrases_levels5.0": "Ingen pollen",
  "editor.phrases_levels5.1": "Lave niveauer",
  "editor.phrases_levels5.2": "Moderat niveau",
  "editor.phrases_levels5.3": "Høje niveauer",
  "editor.phrases_levels5.4": "Meget høje niveauer",
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
  "editor.phrases_short.graminales": "Græs",
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
  "editor.phrases_short.sweet_chestnut": "Kast",
  "editor.phrases_short.tree_of_heaven": "Skyr",
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
  "editor.preset_reset_section": "Nulstil afsnit",
  "editor.region_id": "Regions-ID",
  "editor.select_all_allergens": "Vælg alle allergener",
  "editor.select_all_pollen": "Vælg pollen",
  "editor.select_all_pollution": "Vælg luftkvalitet",
  "editor.show_allergen_column": "Vis allergenkolonne",
  "editor.show_block_separator": "Vis separator mellem blokke",
  "editor.show_empty_days": "Vis tomme dage",
  "editor.show_google_attribution": "Vis Google-attribution",
  "editor.show_no_data_distinct": 'Vis "ingen data" med tydelig (uklar) stil',
  "editor.show_summary_block": "Vis oversigtsblok",
  "editor.show_summary_plants_in_season": "Vis planter i sæson",
  "editor.show_summary_row": "Vis også de detaljerede allergenrækker (kræver aktiveret oversigt)",
  "editor.show_summary_separator": "Vis en adskiller mellem oversigten og de detaljerede rækker",
  "editor.show_summary_top_types": "Vis de mest fremtrædende pollentyper",
  "editor.show_text_allergen": "Vis tekst, allergen",
  "editor.show_value_numeric": "Vis talværdi",
  "editor.show_value_numeric_in_circle": "Vis talværdi inde i ringen",
  "editor.show_value_text": "Vis værdi som tekst",
  "editor.show_version": "Log version til konsollen",
  "editor.sort": "Sortering",
  "editor.sort_category_allergens_first": "Sorter kategori-allergener øverst",
  "editor.sort_name_ascending": "navn, stigende",
  "editor.sort_name_descending": "navn, faldende",
  "editor.sort_none": "ingen (konfigurationsrækkefølge)",
  "editor.sort_pollution_block": "Gruppér luftkvalitet separat",
  "editor.sort_value_ascending": "værdi, stigende",
  "editor.sort_value_descending": "værdi, faldende",
  "editor.subgroup_day_labels": "Dagetiketter",
  "editor.subgroup_source": "Kilde",
  "editor.subgroup_title": "Titel",
  "editor.subgroup_values": "Værdier vist pr. dag",
  "editor.summary_advanced": "Avanceret",
  "editor.summary_allergen_icons": "Allergenikoner",
  "editor.summary_allergens": "Allergener",
  "editor.summary_badge_appearance": "Badge-udseende",
  "editor.summary_badge_content": "Badgeindhold",
  "editor.summary_badge_interactivity": "Interaktioner",
  "editor.summary_card_appearance": "Udseende",
  "editor.summary_card_interactivity": "Interaktioner",
  "editor.summary_card_layout": "Layout",
  "editor.summary_day_display": "Dagvisning",
  "editor.summary_entity_prefix_suffix": "Brugerdefineret præfiks og suffiks",
  "editor.summary_icon_in_ring": "Ikon i ring",
  "editor.summary_integration_and_place": "Integration og sted",
  "editor.summary_level_circles": "Niveaucirkler",
  "editor.summary_minimal": "Minimal",
  "editor.summary_translation_and_strings": "Oversættelse og tekststrenge",
  "editor.tap_action": "Tryk-handling",
  "editor.tap_action_enable": "Aktivér tryk-handling",
  "editor.tap_action_entity": "Entitet",
  "editor.tap_action_more_info_needs_entity": "Denne handling kræver en entitet; uden en gør den ingenting.",
  "editor.tap_action_navigate_needs_path": "Denne handling kræver en navigationssti; uden en gør den ingenting.",
  "editor.tap_action_call_service_needs_service": "Denne handling kræver et gyldigt id på formen domain.service; uden et gør den ingenting.",
  "editor.tap_action_navigation_path": "Navigationssti",
  "editor.tap_action_service": "Service (f.eks. light.turn_on)",
  "editor.tap_action_service_data": "Servicedata (JSON)",
  "editor.tap_action_type": "Handlingstype",
  "editor.tap_action_type_call_service": "Kald service",
  "editor.tap_action_type_more_info": "Mere info",
  "editor.tap_action_type_navigate": "Naviger",
  "editor.text_size_ratio": "Tekststørrelsesforhold (%)",
  "editor.title": "Korttitel",
  "editor.title_automatic": "Automatisk titel",
  "editor.title_hide": "Skjul titel",
  "editor.title_placeholder": "(automatisk)",
  "editor.to_show_columns": "Antal kolonner der vises",
  "editor.to_show_days": "Antal dage der vises",
  "editor.to_show_hours": "Antal timer der vises"
}, Dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rn
}, Symbol.toStringTag, { value: "Module" })), On = {
  "card.allergen.alder": "Erle",
  "card.allergen.allergy_risk": "Allergierisiko",
  "card.allergen.ash": "Esche",
  "card.allergen.beech": "Buche",
  "card.allergen.birch": "Birke",
  "card.allergen.chenopod": "Gänsefuß",
  "card.allergen.cypress": "Zypresse",
  "card.allergen.elm": "Ulme",
  "card.allergen.goosefoot": "Gänsefuß",
  "card.allergen.graminales": "Gräser",
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
  "card.allergen.plantain": "Wegerich",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Gräser",
  "card.allergen.poplar": "Pappel",
  "card.allergen.qualite_globale": "Luftqualität",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Roggen",
  "card.allergen.so2": "Schwefeldioxid",
  "card.allergen.sorrel": "Ampfer",
  "card.allergen.sweet_chestnut": "Edelkastanie",
  "card.allergen.tree_of_heaven": "Götterbaum",
  "card.allergen.trees": "Bäume",
  "card.allergen.trees_cat": "Bäume",
  "card.allergen.weeds": "Unkräuter",
  "card.allergen.weeds_cat": "Unkräuter",
  "card.allergen.willow": "Weide",
  "card.atmo.event": "Ereignis",
  "card.atmo.unavailable": "Nicht verfügbar",
  "card.days.0": "Heute",
  "card.days.1": "Morgen",
  "card.days.2": "Übermorgen",
  "card.error": "Keine Pollensensoren gefunden. Haben Sie die richtige Integration installiert und eine Region in der Kartenkonfiguration ausgewählt?",
  "card.error_entity_unavailable": "Wetterentität ist nicht verfügbar. Die Integration ist möglicherweise offline oder wird neu gestartet.",
  "card.error_filtered_sensors": "Keine Sensoren entsprechen Ihren Filtern. Überprüfen Sie die ausgewählten Allergene und den Schwellenwert.",
  "card.error_location_not_found": "Standort nicht gefunden. Überprüfen Sie den Standortnamen in der Kartenkonfiguration.",
  "card.error_no_sensors": "Keine Pollen-Sensoren gefunden. Haben Sie die richtige Integration installiert und eine Region in der Kartenkonfiguration ausgewählt?",
  "card.header_no_location": "Pollenprognose",
  "card.header_prefix": "Pollenprognose für",
  "card.index.very_low": "sehr geringe Belastung",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "keine Belastung",
  "card.levels5.1": "geringe Belastung",
  "card.levels5.2": "mittlere Belastung",
  "card.levels5.3": "hohe Belastung",
  "card.levels5.4": "sehr hohe Belastung",
  "card.loading_forecast": "Vorhersage wird geladen...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Keine Allergene",
  "card.no_information": "(Keine Information)",
  "card.stale_allergen": "Keine Daten",
  "card.stale_data": "Pollendaten vorübergehend nicht verfügbar",
  "card.stale_data_subtitle": "Der Anbieter liefert derzeit keine Daten für diese Region",
  "card.summary.in_season_label": "In Saison",
  "card.summary.top_label": "Stärkste",
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
  "editor.badge_content_aggregate": "Gesamtrisiko",
  "editor.badge_content_row": "Mehrere (Reihe)",
  "editor.badge_content_single": "Einzelnes Allergen",
  "editor.badge_content_worst": "Höchste Pollenbelastung",
  "editor.badge_label_content": "Beschriftung zeigt",
  "editor.badge_label_content_allergen": "Allergenname",
  "editor.badge_label_content_allergen_level": "Allergenname und Belastung",
  "editor.badge_label_content_level": "Pollenbelastung",
  "editor.badge_label_position": "Position der Beschriftung",
  "editor.badge_label_position_below": "Unten",
  "editor.badge_label_position_right": "Rechts",
  "editor.badge_scale": "Badge-Größe (Skalierung)",
  "editor.badge_icon_scale": "Symbolskalierung",
  "editor.badge_show_label": "Beschriftung anzeigen",
  "editor.badge_single_allergen": "Allergen",
  "editor.badge_version": "Version des Pollenprognose-Badges",
  "editor.badge_visual_icon_in_ring": "Symbol im Ring",
  "editor.badge_visual_icon_only": "Nur Symbol",
  "editor.badge_visual_ring_empty": "Leerer Ring",
  "editor.badge_visual_ring_value": "Ring mit Wert",
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
  "editor.entity_weather": "Wetterentität (nur SILAM)",
  "editor.entity_weather_placeholder": "z.B. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Debugging und Versionsinformationen. Die meisten Nutzer brauchen dies nicht.",
  "editor.helper_allergen_icons": "Gestaltung der Allergensymbole (linke Spalte oder im Ring).",
  "editor.helper_allergen_levels_gap_synced": "Bei Aktivierung folgt die Lückenbreite der Strichstärke des Allergens (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Strichstärke des Allergensymbols. Steuert auch die Lücke des Niveaurings, wenn der Vererbungsmodus aktiv ist (siehe Stufenringe).",
  "editor.helper_allergens": "Welche Allergene angezeigt werden, Schwellenwert und Sortierung.",
  "editor.helper_badge_appearance": "Badge-Größe, Hintergrund und Beschriftung.",
  "editor.helper_badge_content": "Was das Badge zeigt.",
  "editor.helper_badge_interactivity": "Was passiert, wenn der Nutzer auf das Badge oder ein Allergen tippt.",
  "editor.helper_card_appearance": "Hintergrund und allgemeine Kartengröße.",
  "editor.helper_card_interactivity": "Was passiert, wenn der Nutzer auf die Karte oder ein Allergen tippt.",
  "editor.helper_card_layout": "Kompakter (minimaler) Modus und sichtbare Spalten.",
  "editor.helper_day_display": "Was in jeder Tagesspalte erscheint: Werte und Beschriftungen.",
  "editor.helper_icon_in_ring": "Allergensymbol zentriert im Niveauring darstellen.",
  "editor.helper_integration_and_place": "Quellintegration, Standort und Kartentitel.",
  "editor.helper_level_circles": "Ringdiagramm um jedes Allergen, das das heutige Pollenniveau anzeigt.",
  "editor.helper_levels_gap_synced": "Wird von der Strichstärke des Allergens gesteuert, solange Synchronisation aktiv ist. Synchronisation deaktivieren zum Bearbeiten.",
  "editor.helper_levels_gap_unsynced": "Lücke zwischen den Segmenten des Niveaurings.",
  "editor.helper_minimal": "Kompaktes Layout: nur Symbole, keine Allergennamen oder Werte.",
  "editor.helper_minimal_gap": "Abstand zwischen Allergensymbolen im Minimalmodus.",
  "editor.helper_show_allergen_column": "Linke Spalte mit Allergennamen anzeigen.",
  "editor.helper_show_value_numeric_in_circle": "Zeigt das Tagesniveau als kleine Zahl mittig im Ring an.",
  "editor.helper_numeric_value_raw": "Zeigt den Rohwert (Konzentration / Index) anstelle des berechneten Niveaus als numerischen Wert an. Gilt nur für Integrationen, die einen Rohwert liefern (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Integrierte lokalisierte Phrasen überschreiben.",
  "editor.icon_color_custom": "Benutzerdefinierte Farbe",
  "editor.icon_color_inherit": "Vom Diagramm erben",
  "editor.icon_color_mode": "Symbolfarbmodus",
  "editor.icon_color_picker": "Symbolfarbe auswählen",
  "editor.icon_in_ring": "Allergensymbol im Ring anzeigen",
  "editor.icon_in_ring_color_follow": "Der Niveaufarbe folgen",
  "editor.icon_in_ring_color_mode": "Farbmodus des mittigen Symbols",
  "editor.icon_in_ring_color_static": "Statische Farbe",
  "editor.icon_in_ring_header": "Symbol im Ring",
  "editor.icon_in_ring_size_ratio": "Symbolgröße (Anteil der Ringöffnung)",
  "editor.icon_in_ring_static_color": "Statische Farbe",
  "editor.icon_size": "Symbolgröße (px)",
  "editor.index_top": "Index oben in der Liste",
  "editor.integration": "Integration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Rohwert anzeigen (Konzentration)",
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
  "editor.phrases_full.graminales": "Gräser",
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
  "editor.phrases_full.plantain": "Wegerich",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Gräser",
  "editor.phrases_full.poplar": "Pappel",
  "editor.phrases_full.qualite_globale": "Luftqualität",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Roggen",
  "editor.phrases_full.so2": "Schwefeldioxid",
  "editor.phrases_full.sorrel": "Ampfer",
  "editor.phrases_full.sweet_chestnut": "Edelkastanie",
  "editor.phrases_full.tree_of_heaven": "Götterbaum",
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
  "editor.phrases_levels5.0": "keine Belastung",
  "editor.phrases_levels5.1": "keine bis geringe Belastung",
  "editor.phrases_levels5.2": "geringe bis mittlere Belastung",
  "editor.phrases_levels5.3": "mittlere bis hohe Belastung",
  "editor.phrases_levels5.4": "hohe Belastung",
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
  "editor.phrases_short.graminales": "Gräser",
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
  "editor.phrases_short.plantain": "Weg",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Gräser",
  "editor.phrases_short.poplar": "Pappel",
  "editor.phrases_short.qualite_globale": "LQI",
  "editor.phrases_short.ragweed": "Ambro",
  "editor.phrases_short.rye": "Roggn",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Ampf",
  "editor.phrases_short.sweet_chestnut": "Kast",
  "editor.phrases_short.tree_of_heaven": "Götter",
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
  "editor.preset_reset_section": "Abschnitt zurücksetzen",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Alle Allergene auswählen",
  "editor.select_all_pollen": "Pollen auswählen",
  "editor.select_all_pollution": "Luftqualität auswählen",
  "editor.show_allergen_column": "Allergenspalte anzeigen",
  "editor.show_block_separator": "Trennlinie zwischen Blöcken anzeigen",
  "editor.show_empty_days": "Leere Tage anzeigen",
  "editor.show_google_attribution": "Google-Quellenangabe anzeigen",
  "editor.show_no_data_distinct": '"Keine Daten" mit markiertem (verrauschtem) Stil anzeigen',
  "editor.show_summary_block": "Zusammenfassungsblock anzeigen",
  "editor.show_summary_plants_in_season": "Pflanzen in der Saison anzeigen",
  "editor.show_summary_row": "Auch die detaillierten Allergenzeilen anzeigen (erfordert aktivierte Zusammenfassung)",
  "editor.show_summary_separator": "Trennlinie zwischen Zusammenfassung und Detailzeilen anzeigen",
  "editor.show_summary_top_types": "Häufigste Pollenarten anzeigen",
  "editor.show_text_allergen": "Allergentext anzeigen",
  "editor.show_value_numeric": "Wert als Zahl anzeigen",
  "editor.show_value_numeric_in_circle": "Numerischen Wert im Ring anzeigen",
  "editor.show_value_text": "Wert als Text anzeigen",
  "editor.show_version": "Version in der Konsole protokollieren",
  "editor.sort": "Sortierung",
  "editor.sort_category_allergens_first": "Kategorienallergene oben sortieren",
  "editor.sort_name_ascending": "Name, aufsteigend",
  "editor.sort_name_descending": "Name, absteigend",
  "editor.sort_none": "keine (Konfigurationsreihenfolge)",
  "editor.sort_pollution_block": "Luftqualität separat gruppieren",
  "editor.sort_value_ascending": "Wert, aufsteigend",
  "editor.sort_value_descending": "Wert, absteigend",
  "editor.subgroup_day_labels": "Tagesbeschriftungen",
  "editor.subgroup_source": "Quelle",
  "editor.subgroup_title": "Titel",
  "editor.subgroup_values": "Angezeigte Werte pro Tag",
  "editor.summary_advanced": "Erweitert",
  "editor.summary_allergen_icons": "Allergensymbole",
  "editor.summary_allergens": "Allergene",
  "editor.summary_badge_appearance": "Badge-Aussehen",
  "editor.summary_badge_content": "Badge-Inhalt",
  "editor.summary_badge_interactivity": "Interaktionen",
  "editor.summary_card_appearance": "Aussehen",
  "editor.summary_card_interactivity": "Interaktionen",
  "editor.summary_card_layout": "Layout",
  "editor.summary_day_display": "Tagesanzeige",
  "editor.summary_entity_prefix_suffix": "Benutzerdefiniertes Präfix und Suffix",
  "editor.summary_icon_in_ring": "Symbol im Ring",
  "editor.summary_integration_and_place": "Integration und Ort",
  "editor.summary_level_circles": "Stufenringe",
  "editor.summary_minimal": "Minimal",
  "editor.summary_translation_and_strings": "Übersetzung und Zeichenketten",
  "editor.tap_action": "Tippen-Aktion",
  "editor.tap_action_enable": "Tippen-Aktion aktivieren",
  "editor.tap_action_entity": "Entität",
  "editor.tap_action_more_info_needs_entity": "Diese Aktion benötigt eine Entität; ohne sie bewirkt sie nichts.",
  "editor.tap_action_navigate_needs_path": "Diese Aktion benötigt einen Navigationspfad; ohne ihn bewirkt sie nichts.",
  "editor.tap_action_call_service_needs_service": "Diese Aktion benötigt eine gültige ID der Form domain.service; ohne sie bewirkt sie nichts.",
  "editor.tap_action_navigation_path": "Navigationspfad",
  "editor.tap_action_service": "Aktion (z.B. light.turn_on)",
  "editor.tap_action_service_data": "Aktionsdaten (JSON)",
  "editor.tap_action_type": "Aktionstyp",
  "editor.tap_action_type_call_service": "Aktion ausführen",
  "editor.tap_action_type_more_info": "Mehr Informationen",
  "editor.tap_action_type_navigate": "Navigieren",
  "editor.text_size_ratio": "Textgrößenverhältnis (%)",
  "editor.title": "Kartentitel",
  "editor.title_automatic": "Automatischer Titel",
  "editor.title_hide": "Titel ausblenden",
  "editor.title_placeholder": "(automatisch)",
  "editor.to_show_columns": "Anzuzeigende Spalten",
  "editor.to_show_days": "Anzuzeigende Tage",
  "editor.to_show_hours": "Anzuzeigende Stunden"
}, Bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: On
}, Symbol.toStringTag, { value: "Module" })), Gn = {
  "card.allergen.alder": "Σκλήθρα",
  "card.allergen.allergy_risk": "Κίνδυνος αλλεργίας",
  "card.allergen.ash": "Μελία",
  "card.allergen.beech": "Οξιά",
  "card.allergen.birch": "Σημύδα",
  "card.allergen.chenopod": "Χηνοπόδιο",
  "card.allergen.cypress": "Κυπαρίσσι",
  "card.allergen.elm": "Φτελιά",
  "card.allergen.goosefoot": "Χηνόποδα",
  "card.allergen.graminales": "Γρασίδι",
  "card.allergen.grass": "Γρασίδι",
  "card.allergen.grass_cat": "Αγρωστώδη",
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
  "card.allergen.plantain": "Πεντάνευρο",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2.5",
  "card.allergen.poaceae": "Πόα",
  "card.allergen.poplar": "Λεύκα",
  "card.allergen.qualite_globale": "Ποιότητα αέρα",
  "card.allergen.ragweed": "Αμβροσία",
  "card.allergen.rye": "Σίκαλη",
  "card.allergen.so2": "Διοξείδιο του θείου",
  "card.allergen.sorrel": "Λάπαθο",
  "card.allergen.sweet_chestnut": "Καστανιά",
  "card.allergen.tree_of_heaven": "Αΐλανθος",
  "card.allergen.trees": "Δέντρα",
  "card.allergen.trees_cat": "Δέντρα",
  "card.allergen.weeds": "Ζιζάνια",
  "card.allergen.weeds_cat": "Ζιζάνια",
  "card.allergen.willow": "Ιτιά",
  "card.atmo.event": "Συμβάν",
  "card.atmo.unavailable": "Μη διαθέσιμο",
  "card.days.0": "Σήμερα",
  "card.days.1": "Αύριο",
  "card.days.2": "Μεθαύριο",
  "card.error": "Δεν βρέθηκαν αισθητήρες γύρης. Έχετε εγκαταστήσει τη σωστή ενσωμάτωση και έχετε επιλέξει περιοχή στη διαμόρφωση της κάρτας;",
  "card.error_entity_unavailable": "Η οντότητα καιρού δεν είναι διαθέσιμη. Η ενσωμάτωση μπορεί να είναι εκτός σύνδεσης ή να επανεκκινεί.",
  "card.error_filtered_sensors": "Κανένας αισθητήρας δεν ταιριάζει με τα φίλτρα σας. Ελέγξτε τα επιλεγμένα αλλεργιογόνα και το όριο.",
  "card.error_location_not_found": "Η τοποθεσία δεν βρέθηκε. Ελέγξτε το όνομα τοποθεσίας στη διαμόρφωση της κάρτας.",
  "card.error_no_sensors": "Δεν βρέθηκαν αισθητήρες γύρης. Έχετε εγκαταστήσει τη σωστή ενσωμάτωση και έχετε επιλέξει περιοχή στη διαμόρφωση της κάρτας;",
  "card.header_no_location": "Πρόγνωση γύρης",
  "card.header_prefix": "Πρόγνωση γύρης για",
  "card.index.very_low": "Πολύ χαμηλά επίπεδα",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
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
  "card.levels5.0": "Χωρίς γύρη",
  "card.levels5.1": "Χαμηλά επίπεδα",
  "card.levels5.2": "Μέτρια επίπεδα",
  "card.levels5.3": "Υψηλά επίπεδα",
  "card.levels5.4": "Πολύ υψηλά επίπεδα",
  "card.loading_forecast": "Φόρτωση πρόγνωσης...",
  "card.location.plu": "Λουξεμβούργο",
  "card.no_allergens": "Χωρίς αλλεργιογόνα",
  "card.no_information": "(Χωρίς πληροφορίες)",
  "card.stale_allergen": "Χωρίς δεδομένα",
  "card.stale_data": "Τα δεδομένα γύρης δεν είναι διαθέσιμα προσωρινά",
  "card.stale_data_subtitle": "Ο πάροχος δεν επιστρέφει αυτή τη στιγμή δεδομένα για αυτή την περιοχή",
  "card.summary.in_season_label": "Σε εποχή",
  "card.summary.top_label": "Κύρια",
  "editor.allergen_color_custom": "Προσαρμοσμένα χρώματα",
  "editor.allergen_color_default_colors": "Προεπιλεγμένα χρώματα",
  "editor.allergen_color_mode": "Λειτουργία χρωμάτων αλλεργιογόνων",
  "editor.allergen_colors": "Χρώματα αλλεργιογόνων (ανά επίπεδο)",
  "editor.allergen_colors_header": "Εμφάνιση αλλεργιογόνων",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Επαναφορά στα προεπιλεγμένα",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Συγχρονισμός κενού με το πλάτος γραμμής αλλεργιογόνου",
  "editor.allergen_outline_color": "Χρώμα περιγράμματος",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Επαναφορά περιγράμματος",
  "editor.allergen_stroke_color_synced": "Συγχρονισμός χρώματος γραμμής με το επίπεδο",
  "editor.allergen_stroke_width": "Πλάτος γραμμής",
  "editor.allergen_stroke_width_reset": "Επαναφορά πλάτους γραμμής",
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
  "editor.badge_content_aggregate": "Συνολικός κίνδυνος",
  "editor.badge_content_row": "Πολλά (σειρά)",
  "editor.badge_content_single": "Ένα αλλεργιογόνο",
  "editor.badge_content_worst": "Υψηλότερο επίπεδο γύρης",
  "editor.badge_label_content": "Η ετικέτα εμφανίζει",
  "editor.badge_label_content_allergen": "Όνομα αλλεργιογόνου",
  "editor.badge_label_content_allergen_level": "Όνομα αλλεργιογόνου και επίπεδο",
  "editor.badge_label_content_level": "Επίπεδο γύρης",
  "editor.badge_label_position": "Θέση ετικέτας",
  "editor.badge_label_position_below": "Κάτω",
  "editor.badge_label_position_right": "Δεξιά",
  "editor.badge_scale": "Μέγεθος εμβλήματος (κλίμακα)",
  "editor.badge_icon_scale": "Κλίμακα εικονιδίου",
  "editor.badge_show_label": "Εμφάνιση ετικέτας",
  "editor.badge_single_allergen": "Αλλεργιογόνο",
  "editor.badge_version": "Έκδοση εμβλήματος Pollenprognos",
  "editor.badge_visual_icon_in_ring": "Εικονίδιο στον κύκλο",
  "editor.badge_visual_icon_only": "Μόνο εικονίδιο",
  "editor.badge_visual_ring_empty": "Κενός κύκλος",
  "editor.badge_visual_ring_value": "Κύκλος με τιμή",
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
  "editor.entity_weather": "Οντότητα καιρού (μόνο SILAM)",
  "editor.entity_weather_placeholder": "π.χ. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Αποσφαλμάτωση και πληροφορίες έκδοσης. Οι περισσότεροι χρήστες δεν το χρειάζονται.",
  "editor.helper_allergen_icons": "Εμφάνιση των εικονιδίων αλλεργιογόνων (αριστερή στήλη ή μέσα στον κύκλο).",
  "editor.helper_allergen_levels_gap_synced": "Όταν είναι ενεργό, το πλάτος του κενού ακολουθεί το πάχος γραμμής του αλλεργιογόνου (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Πάχος γραμμής του εικονιδίου αλλεργιογόνου. Ελέγχει επίσης το κενό του κύκλου επιπέδου όταν είναι ενεργή η λειτουργία κληρονομικότητας (δείτε Κύκλοι επιπέδου).",
  "editor.helper_allergens": "Ποια αλλεργιογόνα εμφανίζονται, όριο και σειρά ταξινόμησης.",
  "editor.helper_badge_appearance": "Μέγεθος εμβλήματος, φόντο και ετικέτα.",
  "editor.helper_badge_content": "Τι εμφανίζει το έμβλημα.",
  "editor.helper_badge_interactivity": "Τι συμβαίνει όταν ο χρήστης πατά το έμβλημα ή ένα αλλεργιογόνο.",
  "editor.helper_card_appearance": "Φόντο και συνολικό μέγεθος της κάρτας.",
  "editor.helper_card_interactivity": "Τι συμβαίνει όταν ο χρήστης πατά την κάρτα ή ένα αλλεργιογόνο.",
  "editor.helper_card_layout": "Συμπαγής (ελάχιστη) λειτουργία και ποιες στήλες εμφανίζονται.",
  "editor.helper_day_display": "Τι εμφανίζεται σε κάθε στήλη ημέρας: τιμές και ετικέτες.",
  "editor.helper_icon_in_ring": "Εμφανίζει το εικονίδιο του αλλεργιογόνου στο κέντρο του κύκλου επιπέδου.",
  "editor.helper_integration_and_place": "Ενσωμάτωση προέλευσης, τοποθεσία και τίτλος της κάρτας.",
  "editor.helper_level_circles": "Δακτυλιοειδές διάγραμμα γύρω από κάθε αλλεργιογόνο που δείχνει το σημερινό επίπεδο γύρης.",
  "editor.helper_levels_gap_synced": "Καθορίζεται από το πάχος γραμμής του αλλεργιογόνου όσο ο συγχρονισμός είναι ενεργός. Απενεργοποιήστε τον συγχρονισμό για επεξεργασία.",
  "editor.helper_levels_gap_unsynced": "Κενό μεταξύ των τμημάτων του κύκλου επιπέδου.",
  "editor.helper_minimal": "Συμπαγής διάταξη: μόνο εικονίδια, χωρίς ονόματα αλλεργιογόνων ή τιμές.",
  "editor.helper_minimal_gap": "Απόσταση μεταξύ των εικονιδίων αλλεργιογόνων στην ελάχιστη λειτουργία.",
  "editor.helper_show_allergen_column": "Εμφάνιση της αριστερής στήλης με τα ονόματα των αλλεργιογόνων.",
  "editor.helper_show_value_numeric_in_circle": "Εμφανίζει το επίπεδο της ημέρας ως μικρό αριθμό στο κέντρο του κύκλου.",
  "editor.helper_numeric_value_raw": "Εμφανίζει την ακατέργαστη μέτρηση (συγκέντρωση / δείκτης) αντί του υπολογισμένου επιπέδου ως αριθμητική τιμή. Ισχύει μόνο για ενσωματώσεις που αναφέρουν ακατέργαστη τιμή (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Αντικατάσταση των ενσωματωμένων μεταφρασμένων φράσεων.",
  "editor.icon_color_custom": "Προσαρμοσμένο χρώμα",
  "editor.icon_color_inherit": "Κληρονόμηση από το γράφημα",
  "editor.icon_color_mode": "Λειτουργία χρώματος εικονιδίου",
  "editor.icon_color_picker": "Επιλέξτε χρώμα εικονιδίου",
  "editor.icon_in_ring": "Εμφάνιση εικονιδίου αλλεργιογόνου μέσα στον κύκλο",
  "editor.icon_in_ring_color_follow": "Ακολούθηση χρώματος επιπέδου",
  "editor.icon_in_ring_color_mode": "Λειτουργία χρώματος κεντρικού εικονιδίου",
  "editor.icon_in_ring_color_static": "Στατικό χρώμα",
  "editor.icon_in_ring_header": "Εικονίδιο στον κύκλο",
  "editor.icon_in_ring_size_ratio": "Μέγεθος εικονιδίου (ποσοστό του ανοίγματος του κύκλου)",
  "editor.icon_in_ring_static_color": "Στατικό χρώμα",
  "editor.icon_size": "Μέγεθος εικονιδίου (px)",
  "editor.index_top": "Ο δείκτης στην κορυφή της λίστας",
  "editor.integration": "Ενσωμάτωση",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
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
  "editor.numeric_value_raw": "Εμφάνιση ακατέργαστης τιμής (συγκέντρωση)",
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
  "editor.phrases_full.goosefoot": "Χηνόποδα",
  "editor.phrases_full.graminales": "Γρασίδι",
  "editor.phrases_full.grass": "Γρασίδι",
  "editor.phrases_full.grass_cat": "Αγρωστώδη",
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
  "editor.phrases_full.plantain": "Πεντάνευρο",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2.5",
  "editor.phrases_full.poaceae": "Πόα",
  "editor.phrases_full.poplar": "Λεύκα",
  "editor.phrases_full.qualite_globale": "Ποιότητα αέρα",
  "editor.phrases_full.ragweed": "Αμβροσία",
  "editor.phrases_full.rye": "Σίκαλη",
  "editor.phrases_full.so2": "Διοξείδιο του θείου",
  "editor.phrases_full.sorrel": "Λάπαθο",
  "editor.phrases_full.sweet_chestnut": "Καστανιά",
  "editor.phrases_full.tree_of_heaven": "Αΐλανθος",
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
  "editor.phrases_levels5.0": "Χωρίς γύρη",
  "editor.phrases_levels5.1": "Χαμηλά επίπεδα",
  "editor.phrases_levels5.2": "Μέτρια επίπεδα",
  "editor.phrases_levels5.3": "Υψηλά επίπεδα",
  "editor.phrases_levels5.4": "Πολύ υψηλά επίπεδα",
  "editor.phrases_short": "Αλλεργιογόνα, σύντομα",
  "editor.phrases_short.alder": "Σκλήθρα",
  "editor.phrases_short.allergy_risk": "Κίνδυνος",
  "editor.phrases_short.ash": "Μελία",
  "editor.phrases_short.beech": "Οξιά",
  "editor.phrases_short.birch": "Σημύδα",
  "editor.phrases_short.chenopod": "Χηνοπ.",
  "editor.phrases_short.cypress": "Κυπαρ.",
  "editor.phrases_short.elm": "Φτελιά",
  "editor.phrases_short.goosefoot": "Χηνόπ.",
  "editor.phrases_short.graminales": "Γρασίδι",
  "editor.phrases_short.grass": "Γρασ.",
  "editor.phrases_short.grass_cat": "Αγρωστ.",
  "editor.phrases_short.grasses": "Γρασ.",
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
  "editor.phrases_short.plantain": "Πεντάν.",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2.5",
  "editor.phrases_short.poaceae": "Πόα",
  "editor.phrases_short.poplar": "Λεύκα",
  "editor.phrases_short.qualite_globale": "AQI",
  "editor.phrases_short.ragweed": "Αμβρ.",
  "editor.phrases_short.rye": "Σίκαλη",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Λάπαθο",
  "editor.phrases_short.sweet_chestnut": "Καστ.",
  "editor.phrases_short.tree_of_heaven": "Αΐλαν.",
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
  "editor.preset_reset_section": "Επαναφορά ενότητας",
  "editor.region_id": "ID περιοχής",
  "editor.select_all_allergens": "Επιλογή όλων των αλλεργιογόνων",
  "editor.select_all_pollen": "Επιλογή γύρης",
  "editor.select_all_pollution": "Επιλογή ποιότητας αέρα",
  "editor.show_allergen_column": "Εμφάνιση στήλης αλλεργιογόνων",
  "editor.show_block_separator": "Εμφάνιση διαχωριστικού μεταξύ μπλοκ",
  "editor.show_empty_days": "Εμφάνιση κενών ημερών",
  "editor.show_google_attribution": "Εμφάνιση αναφοράς πηγής Google",
  "editor.show_no_data_distinct": 'Εμφάνιση "χωρίς δεδομένα" με ξεχωριστό (θολό) στυλ',
  "editor.show_summary_block": "Εμφάνιση μπλοκ σύνοψης",
  "editor.show_summary_plants_in_season": "Εμφάνιση φυτών σε εποχή",
  "editor.show_summary_row": "Εμφάνιση και των αναλυτικών γραμμών αλλεργιογόνων (απαιτεί ενεργοποιημένη σύνοψη)",
  "editor.show_summary_separator": "Εμφάνιση διαχωριστικού μεταξύ σύνοψης και αναλυτικών γραμμών",
  "editor.show_summary_top_types": "Εμφάνιση κύριων τύπων γύρης",
  "editor.show_text_allergen": "Εμφάνιση κειμένου, αλλεργιογόνο",
  "editor.show_value_numeric": "Εμφάνιση τιμής, αριθμητικά",
  "editor.show_value_numeric_in_circle": "Εμφάνιση αριθμητικής τιμής μέσα στον κύκλο",
  "editor.show_value_text": "Εμφάνιση τιμής, κείμενο",
  "editor.show_version": "Καταγραφή έκδοσης στην κονσόλα",
  "editor.sort": "Σειρά ταξινόμησης",
  "editor.sort_category_allergens_first": "Κατηγορίες αλλεργιογόνων στην κορυφή",
  "editor.sort_name_ascending": "όνομα, αύξουσα",
  "editor.sort_name_descending": "όνομα, φθίνουσα",
  "editor.sort_none": "καμία (σειρά ρυθμίσεων)",
  "editor.sort_pollution_block": "Ομαδοποίηση ρύπανσης ξεχωριστά",
  "editor.sort_value_ascending": "τιμή, αύξουσα",
  "editor.sort_value_descending": "τιμή, φθίνουσα",
  "editor.subgroup_day_labels": "Ετικέτες ημερών",
  "editor.subgroup_source": "Πηγή",
  "editor.subgroup_title": "Τίτλος",
  "editor.subgroup_values": "Τιμές που εμφανίζονται ανά ημέρα",
  "editor.summary_advanced": "Προχωρημένα",
  "editor.summary_allergen_icons": "Εικονίδια αλλεργιογόνων",
  "editor.summary_allergens": "Αλλεργιογόνα",
  "editor.summary_badge_appearance": "Εμφάνιση εμβλήματος",
  "editor.summary_badge_content": "Περιεχόμενο εμβλήματος",
  "editor.summary_badge_interactivity": "Αλληλεπιδράσεις",
  "editor.summary_card_appearance": "Εμφάνιση",
  "editor.summary_card_interactivity": "Αλληλεπιδράσεις",
  "editor.summary_card_layout": "Διάταξη",
  "editor.summary_day_display": "Ημερήσια εμφάνιση",
  "editor.summary_entity_prefix_suffix": "Προσαρμοσμένο πρόθεμα και κατάληξη",
  "editor.summary_icon_in_ring": "Εικονίδιο στον κύκλο",
  "editor.summary_integration_and_place": "Ενσωμάτωση και τοποθεσία",
  "editor.summary_level_circles": "Κύκλοι επιπέδου",
  "editor.summary_minimal": "Ελάχιστο",
  "editor.summary_translation_and_strings": "Μετάφραση και κείμενα",
  "editor.tap_action": "Ενέργεια πατήματος",
  "editor.tap_action_enable": "Ενεργοποίηση ενέργειας πατήματος",
  "editor.tap_action_entity": "Οντότητα",
  "editor.tap_action_more_info_needs_entity": "Αυτή η ενέργεια χρειάζεται μια οντότητα· χωρίς αυτήν δεν κάνει τίποτα.",
  "editor.tap_action_navigate_needs_path": "Αυτή η ενέργεια χρειάζεται διαδρομή πλοήγησης· χωρίς αυτήν δεν κάνει τίποτα.",
  "editor.tap_action_call_service_needs_service": "Αυτή η ενέργεια χρειάζεται έγκυρο αναγνωριστικό της μορφής domain.service· χωρίς αυτό δεν κάνει τίποτα.",
  "editor.tap_action_navigation_path": "Διαδρομή πλοήγησης",
  "editor.tap_action_service": "Υπηρεσία (π.χ. light.turn_on)",
  "editor.tap_action_service_data": "Δεδομένα υπηρεσίας (JSON)",
  "editor.tap_action_type": "Τύπος ενέργειας",
  "editor.tap_action_type_call_service": "Κλήση υπηρεσίας",
  "editor.tap_action_type_more_info": "Περισσότερες πληροφορίες",
  "editor.tap_action_type_navigate": "Πλοήγηση",
  "editor.text_size_ratio": "Αναλογία μεγέθους κειμένου (%)",
  "editor.title": "Τίτλος κάρτας",
  "editor.title_automatic": "Αυτόματος τίτλος",
  "editor.title_hide": "Απόκρυψη τίτλου",
  "editor.title_placeholder": "(αυτόματο)",
  "editor.to_show_columns": "Στήλες προς εμφάνιση",
  "editor.to_show_days": "Ημέρες προς εμφάνιση",
  "editor.to_show_hours": "Ώρες προς εμφάνιση"
}, Hn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gn
}, Symbol.toStringTag, { value: "Module" })), Kn = {
  "card.allergen.alder": "Alder",
  "card.allergen.allergy_risk": "Allergy risk",
  "card.allergen.ash": "Ash",
  "card.allergen.beech": "Beech",
  "card.allergen.birch": "Birch",
  "card.allergen.chenopod": "Chenopod",
  "card.allergen.cypress": "Cypress",
  "card.allergen.elm": "Elm",
  "card.allergen.goosefoot": "Goosefoot",
  "card.allergen.graminales": "Grasses",
  "card.allergen.grass": "Grass",
  "card.allergen.grass_cat": "Grasses",
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
  "card.allergen.plantain": "Plantain",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2.5",
  "card.allergen.poaceae": "Poaceae",
  "card.allergen.poplar": "Poplar",
  "card.allergen.qualite_globale": "Air quality",
  "card.allergen.ragweed": "Ragweed",
  "card.allergen.rye": "Rye",
  "card.allergen.so2": "Sulfur dioxide",
  "card.allergen.sorrel": "Sorrel",
  "card.allergen.sweet_chestnut": "Sweet chestnut",
  "card.allergen.tree_of_heaven": "Tree of heaven",
  "card.allergen.trees": "Trees",
  "card.allergen.trees_cat": "Trees",
  "card.allergen.weeds": "Weeds",
  "card.allergen.weeds_cat": "Weeds",
  "card.allergen.willow": "Willow",
  "card.atmo.event": "Event",
  "card.atmo.unavailable": "Unavailable",
  "card.days.0": "Today",
  "card.days.1": "Tomorrow",
  "card.days.2": "Day after tomorrow",
  "card.error": "No pollen sensors found. Have you installed the correct integration and selected a region in the card configuration?",
  "card.error_entity_unavailable": "Weather entity is unavailable. The integration may be offline or restarting.",
  "card.error_filtered_sensors": "No sensors match your filters. Check selected allergens and threshold.",
  "card.error_location_not_found": "Location not found. Check the location name in the card configuration.",
  "card.error_no_sensors": "No pollen sensors found. Have you installed the correct integration and selected a region in the card configuration?",
  "card.header_no_location": "Pollen forecast",
  "card.header_prefix": "Pollen forecast for",
  "card.index.very_low": "Very low levels",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
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
  "card.levels5.0": "No pollen",
  "card.levels5.1": "Low levels",
  "card.levels5.2": "Moderate levels",
  "card.levels5.3": "High levels",
  "card.levels5.4": "Very high levels",
  "card.loading_forecast": "Loading forecast...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "No allergens",
  "card.no_information": "(No information)",
  "card.stale_allergen": "No data",
  "card.stale_data": "Pollen data temporarily unavailable",
  "card.stale_data_subtitle": "The provider is not currently returning data for this region",
  "card.summary.in_season_label": "In season",
  "card.summary.top_label": "Top types",
  "editor.allergen_color_custom": "Custom colors",
  "editor.allergen_color_default_colors": "Default colors",
  "editor.allergen_color_mode": "Allergen color mode",
  "editor.allergen_colors": "Allergen colors (by level)",
  "editor.allergen_colors_header": "Allergen appearance",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Reset to default",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Sync gap with allergen stroke width",
  "editor.allergen_outline_color": "Outline color",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Reset outline",
  "editor.allergen_stroke_color_synced": "Sync stroke color with level",
  "editor.allergen_stroke_width": "Stroke width",
  "editor.allergen_stroke_width_reset": "Reset stroke width",
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
  "editor.badge_content_aggregate": "Overall risk",
  "editor.badge_content_row": "Several (row)",
  "editor.badge_content_single": "Single allergen",
  "editor.badge_content_worst": "Highest pollen level",
  "editor.badge_label_content": "Label shows",
  "editor.badge_label_content_allergen": "Allergen name",
  "editor.badge_label_content_allergen_level": "Allergen name and level",
  "editor.badge_label_content_level": "Pollen level",
  "editor.badge_label_position": "Label position",
  "editor.badge_label_position_below": "Below",
  "editor.badge_label_position_right": "Right",
  "editor.badge_scale": "Badge size (scale)",
  "editor.badge_icon_scale": "Icon scale",
  "editor.badge_show_label": "Show label",
  "editor.badge_single_allergen": "Allergen",
  "editor.badge_version": "Pollenprognos Badge version",
  "editor.badge_visual_icon_in_ring": "Icon in ring",
  "editor.badge_visual_icon_only": "Icon only",
  "editor.badge_visual_ring_empty": "Empty ring",
  "editor.badge_visual_ring_value": "Ring with value",
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
  "editor.entity_weather": "Weather entity (SILAM only)",
  "editor.entity_weather_placeholder": "e.g. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Debugging and version info. Most users don't need this.",
  "editor.helper_allergen_icons": "Styling of the allergen icons (left column or in-ring).",
  "editor.helper_allergen_levels_gap_synced": "When on, gap width follows allergen stroke width (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Stroke width of the allergen icon. Also controls level-circle gap when inherit mode is active (see Level circles).",
  "editor.helper_allergens": "Which allergens to display, threshold, and sort order.",
  "editor.helper_badge_appearance": "Badge size, background, and label.",
  "editor.helper_badge_content": "What the badge shows.",
  "editor.helper_badge_interactivity": "What happens when the user taps the badge or an allergen.",
  "editor.helper_card_appearance": "Background and overall card size.",
  "editor.helper_card_interactivity": "What happens when the user taps the card or an allergen.",
  "editor.helper_card_layout": "Compact (minimal) mode and which columns are visible.",
  "editor.helper_day_display": "What appears in each day column: values and labels.",
  "editor.helper_icon_in_ring": "Render the allergen icon centered inside the level circle.",
  "editor.helper_integration_and_place": "Source integration, location, and card title.",
  "editor.helper_level_circles": "Ring chart around each allergen showing today's pollen level.",
  "editor.helper_levels_gap_synced": "Driven by allergen stroke width while sync is on. Turn off sync to edit.",
  "editor.helper_levels_gap_unsynced": "Gap between level ring segments.",
  "editor.helper_minimal": "Compact layout: icons only, no allergen names or values.",
  "editor.helper_minimal_gap": "Spacing between allergen icons in minimal mode.",
  "editor.helper_show_allergen_column": "Show the left-hand column with allergen names.",
  "editor.helper_numeric_value_raw": "Show the raw measurement (concentration / index) instead of the calculated level for the numeric value. Only applies to integrations that report a raw value (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_show_value_numeric_in_circle": "Renders the day's level as a small number centered inside the ring.",
  "editor.helper_translation_and_strings": "Override built-in localized phrases.",
  "editor.icon_color_custom": "Custom color",
  "editor.icon_color_inherit": "Inherit from chart",
  "editor.icon_color_mode": "Icon color mode",
  "editor.icon_color_picker": "Pick icon color",
  "editor.icon_in_ring": "Show allergen icon inside the ring",
  "editor.icon_in_ring_color_follow": "Follow level color",
  "editor.icon_in_ring_color_mode": "Center icon color mode",
  "editor.icon_in_ring_color_static": "Static color",
  "editor.icon_in_ring_header": "Icon in ring",
  "editor.icon_in_ring_size_ratio": "Icon size (fraction of ring hole)",
  "editor.icon_in_ring_static_color": "Static color",
  "editor.icon_size": "Icon size (px)",
  "editor.index_top": "Index top of list",
  "editor.integration": "Integration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
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
  "editor.numeric_value_raw": "Show raw value (concentration)",
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
  "editor.phrases_full.goosefoot": "Goosefoot",
  "editor.phrases_full.graminales": "Grasses",
  "editor.phrases_full.grass": "Grass",
  "editor.phrases_full.grass_cat": "Grasses",
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
  "editor.phrases_full.plantain": "Plantain",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2.5",
  "editor.phrases_full.poaceae": "Poaceae",
  "editor.phrases_full.poplar": "Poplar",
  "editor.phrases_full.qualite_globale": "Air quality",
  "editor.phrases_full.ragweed": "Ragweed",
  "editor.phrases_full.rye": "Rye",
  "editor.phrases_full.so2": "Sulfur dioxide",
  "editor.phrases_full.sorrel": "Sorrel",
  "editor.phrases_full.sweet_chestnut": "Sweet chestnut",
  "editor.phrases_full.tree_of_heaven": "Tree of heaven",
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
  "editor.phrases_levels5.0": "No pollen",
  "editor.phrases_levels5.1": "Low levels",
  "editor.phrases_levels5.2": "Moderate levels",
  "editor.phrases_levels5.3": "High levels",
  "editor.phrases_levels5.4": "Very high levels",
  "editor.phrases_short": "Allergens, short",
  "editor.phrases_short.alder": "Aldr",
  "editor.phrases_short.allergy_risk": "Risk",
  "editor.phrases_short.ash": "Ash",
  "editor.phrases_short.beech": "Beech",
  "editor.phrases_short.birch": "Birch",
  "editor.phrases_short.chenopod": "Chnopd",
  "editor.phrases_short.cypress": "Cypress",
  "editor.phrases_short.elm": "Elm",
  "editor.phrases_short.goosefoot": "Gfoot",
  "editor.phrases_short.graminales": "Grasses",
  "editor.phrases_short.grass": "Grass",
  "editor.phrases_short.grass_cat": "Grass",
  "editor.phrases_short.grasses": "Grass",
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
  "editor.phrases_short.plantain": "Plntn",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2.5",
  "editor.phrases_short.poaceae": "Poaceae",
  "editor.phrases_short.poplar": "Poplar",
  "editor.phrases_short.qualite_globale": "AQI",
  "editor.phrases_short.ragweed": "Rgwd",
  "editor.phrases_short.rye": "Rye",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Sorrl",
  "editor.phrases_short.sweet_chestnut": "Chstnt",
  "editor.phrases_short.tree_of_heaven": "Ailanth",
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
  "editor.preset_reset_section": "Reset section",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Select all allergens",
  "editor.select_all_pollen": "Select pollen",
  "editor.select_all_pollution": "Select air quality",
  "editor.show_allergen_column": "Show allergen column",
  "editor.show_block_separator": "Show separator between blocks",
  "editor.show_empty_days": "Show empty days",
  "editor.show_google_attribution": "Show Google attribution",
  "editor.show_no_data_distinct": 'Show "no data" with distinct (fuzzy) styling',
  "editor.show_summary_block": "Show summary block",
  "editor.show_summary_plants_in_season": "Show plants in season",
  "editor.show_summary_row": "Also show the detailed allergen rows (requires summary enabled)",
  "editor.show_summary_separator": "Show a divider between the summary and the detailed rows",
  "editor.show_summary_top_types": "Show top pollen types",
  "editor.show_text_allergen": "Show text, allergen",
  "editor.show_value_numeric": "Show value, numeric",
  "editor.show_value_numeric_in_circle": "Show numeric value inside ring",
  "editor.show_value_text": "Show value, text",
  "editor.show_version": "Log version to console",
  "editor.sort": "Sort order",
  "editor.sort_category_allergens_first": "Sort category allergens at the top",
  "editor.sort_name_ascending": "name, ascending",
  "editor.sort_name_descending": "name, descending",
  "editor.sort_none": "none (config order)",
  "editor.sort_pollution_block": "Group pollution separately",
  "editor.sort_value_ascending": "value, ascending",
  "editor.sort_value_descending": "value, descending",
  "editor.subgroup_day_labels": "Day labels",
  "editor.subgroup_source": "Source",
  "editor.subgroup_title": "Title",
  "editor.subgroup_values": "Values shown per day",
  "editor.summary_advanced": "Advanced",
  "editor.summary_allergen_icons": "Allergen icons",
  "editor.summary_allergens": "Allergens",
  "editor.summary_badge_appearance": "Badge appearance",
  "editor.summary_badge_content": "Badge content",
  "editor.summary_badge_interactivity": "Interactions",
  "editor.summary_card_appearance": "Appearance",
  "editor.summary_card_interactivity": "Interactions",
  "editor.summary_card_layout": "Layout",
  "editor.summary_day_display": "Day display",
  "editor.summary_entity_prefix_suffix": "Custom prefix and suffix",
  "editor.summary_icon_in_ring": "Icon in ring",
  "editor.summary_integration_and_place": "Integration and place",
  "editor.summary_level_circles": "Level circles",
  "editor.summary_minimal": "Minimal",
  "editor.summary_translation_and_strings": "Translation and strings",
  "editor.tap_action": "Tap action",
  "editor.tap_action_enable": "Enable tap action",
  "editor.tap_action_entity": "Entity",
  "editor.tap_action_more_info_needs_entity": "This action needs an entity; without one it does nothing.",
  "editor.tap_action_navigate_needs_path": "This action needs a navigation path; without one it does nothing.",
  "editor.tap_action_call_service_needs_service": "This action needs a valid domain.service id; without one it does nothing.",
  "editor.tap_action_navigation_path": "Navigation path",
  "editor.tap_action_service": "Service (e.g. light.turn_on)",
  "editor.tap_action_service_data": "Service data (JSON)",
  "editor.tap_action_type": "Action type",
  "editor.tap_action_type_call_service": "Call Service",
  "editor.tap_action_type_more_info": "More Info",
  "editor.tap_action_type_navigate": "Navigate",
  "editor.text_size_ratio": "Text size ratio (%)",
  "editor.title": "Card title",
  "editor.title_automatic": "Automatic title",
  "editor.title_hide": "Hide title",
  "editor.title_placeholder": "(automatic)",
  "editor.to_show_columns": "Columns to show",
  "editor.to_show_days": "Days to show",
  "editor.to_show_hours": "Hours to show"
}, Fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Kn
}, Symbol.toStringTag, { value: "Module" })), Un = {
  "card.allergen.alder": "Aliso",
  "card.allergen.allergy_risk": "Riesgo de alergia",
  "card.allergen.ash": "Fresno",
  "card.allergen.beech": "Haya",
  "card.allergen.birch": "Abedul",
  "card.allergen.chenopod": "Cenizo",
  "card.allergen.cypress": "Ciprés",
  "card.allergen.elm": "Olmo",
  "card.allergen.goosefoot": "Cenizo",
  "card.allergen.graminales": "Gramíneas",
  "card.allergen.grass": "Gramíneas",
  "card.allergen.grass_cat": "Gramíneas",
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
  "card.allergen.plantain": "Llantén",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Gramíneas",
  "card.allergen.poplar": "Álamo",
  "card.allergen.qualite_globale": "Calidad del aire",
  "card.allergen.ragweed": "Ambrosía",
  "card.allergen.rye": "Centeno",
  "card.allergen.so2": "Dióxido de azufre",
  "card.allergen.sorrel": "Acedera",
  "card.allergen.sweet_chestnut": "Castaño",
  "card.allergen.tree_of_heaven": "Ailanto",
  "card.allergen.trees": "Árboles",
  "card.allergen.trees_cat": "Árboles",
  "card.allergen.weeds": "Malezas",
  "card.allergen.weeds_cat": "Malezas",
  "card.allergen.willow": "Sauce",
  "card.atmo.event": "Evento",
  "card.atmo.unavailable": "No disponible",
  "card.days.0": "Hoy",
  "card.days.1": "Mañana",
  "card.days.2": "Pasado mañana",
  "card.error": "No se encontraron sensores de polen. ¿Has instalado la integración correcta y seleccionado una región en la configuración de la tarjeta?",
  "card.error_entity_unavailable": "La entidad meteorológica no está disponible. Es posible que la integración esté desconectada o reiniciándose.",
  "card.error_filtered_sensors": "Ningún sensor coincide con tus filtros. Revisa los alérgenos seleccionados y el umbral.",
  "card.error_location_not_found": "Ubicación no encontrada. Revisa el nombre de la ubicación en la configuración de la tarjeta.",
  "card.error_no_sensors": "No se encontraron sensores de polen. ¿Has instalado la integración correcta y seleccionado una región en la configuración de la tarjeta?",
  "card.header_no_location": "Pronóstico de polen",
  "card.header_prefix": "Pronóstico de polen para",
  "card.index.very_low": "Niveles muy bajos",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
  "card.integration.peu": "Polleninformation EU",
  "card.integration.plu": "Pollen.lu",
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
  "card.levels5.0": "Sin polen",
  "card.levels5.1": "Niveles bajos",
  "card.levels5.2": "Niveles moderados",
  "card.levels5.3": "Niveles altos",
  "card.levels5.4": "Niveles muy altos",
  "card.loading_forecast": "Cargando pronóstico...",
  "card.location.plu": "Luxemburgo",
  "card.no_allergens": "Sin alérgenos",
  "card.no_information": "(Sin información)",
  "card.stale_allergen": "Sin datos",
  "card.stale_data": "Datos de polen temporalmente no disponibles",
  "card.stale_data_subtitle": "El proveedor no está devolviendo datos actualmente para esta región",
  "card.summary.in_season_label": "En temporada",
  "card.summary.top_label": "Principales",
  "editor.allergen_color_custom": "Colores personalizados",
  "editor.allergen_color_default_colors": "Colores predeterminados",
  "editor.allergen_color_mode": "Modo de color de alérgenos",
  "editor.allergen_colors": "Colores de alérgenos (por nivel)",
  "editor.allergen_colors_header": "Apariencia de alérgenos",
  "editor.allergen_colors_placeholder": "#ffcc00",
  "editor.allergen_colors_reset": "Restablecer a predeterminado",
  "editor.allergen_empty_placeholder": "rgba(200,200,200,0.15)",
  "editor.allergen_levels_gap_synced": "Sincronizar espacio con el grosor del trazo del alérgeno",
  "editor.allergen_outline_color": "Color del contorno",
  "editor.allergen_outline_placeholder": "#000000",
  "editor.allergen_outline_reset": "Restablecer contorno",
  "editor.allergen_stroke_color_synced": "Sincronizar color del trazo con el nivel",
  "editor.allergen_stroke_width": "Grosor del trazo",
  "editor.allergen_stroke_width_reset": "Restablecer grosor del trazo",
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
  "editor.badge_content_aggregate": "Riesgo general",
  "editor.badge_content_row": "Varios (fila)",
  "editor.badge_content_single": "Un solo alérgeno",
  "editor.badge_content_worst": "Nivel de polen más alto",
  "editor.badge_label_content": "La etiqueta muestra",
  "editor.badge_label_content_allergen": "Nombre del alérgeno",
  "editor.badge_label_content_allergen_level": "Nombre del alérgeno y nivel",
  "editor.badge_label_content_level": "Nivel de polen",
  "editor.badge_label_position": "Posición de la etiqueta",
  "editor.badge_label_position_below": "Abajo",
  "editor.badge_label_position_right": "Derecha",
  "editor.badge_scale": "Tamaño de la insignia (escala)",
  "editor.badge_icon_scale": "Escala del icono",
  "editor.badge_show_label": "Mostrar etiqueta",
  "editor.badge_single_allergen": "Alérgeno",
  "editor.badge_version": "Versión de la insignia Pollenprognos",
  "editor.badge_visual_icon_in_ring": "Icono en el círculo",
  "editor.badge_visual_icon_only": "Solo icono",
  "editor.badge_visual_ring_empty": "Círculo vacío",
  "editor.badge_visual_ring_value": "Círculo con valor",
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
  "editor.entity_weather": "Entidad meteorológica (solo SILAM)",
  "editor.entity_weather_placeholder": "ej. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Depuración e información de versión. La mayoría de los usuarios no lo necesita.",
  "editor.helper_allergen_icons": "Estilo de los iconos de alérgenos (columna izquierda o dentro del círculo).",
  "editor.helper_allergen_levels_gap_synced": "Cuando está activo, el ancho del espacio sigue el grosor del trazo del alérgeno (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Grosor del trazo del icono de alérgeno. También controla el espacio del círculo de nivel cuando el modo de herencia está activo (ver Círculos de nivel).",
  "editor.helper_allergens": "Qué alérgenos se muestran, umbral y orden de clasificación.",
  "editor.helper_badge_appearance": "Tamaño de la insignia, fondo y etiqueta.",
  "editor.helper_badge_content": "Qué muestra la insignia.",
  "editor.helper_badge_interactivity": "Qué ocurre cuando el usuario pulsa la insignia o un alérgeno.",
  "editor.helper_card_appearance": "Fondo y tamaño general de la tarjeta.",
  "editor.helper_card_interactivity": "Qué ocurre cuando el usuario pulsa la tarjeta o un alérgeno.",
  "editor.helper_card_layout": "Modo compacto (mínimo) y qué columnas se muestran.",
  "editor.helper_day_display": "Qué aparece en cada columna de día: valores y etiquetas.",
  "editor.helper_icon_in_ring": "Muestra el icono del alérgeno centrado dentro del círculo de nivel.",
  "editor.helper_integration_and_place": "Integración de origen, ubicación y título de la tarjeta.",
  "editor.helper_level_circles": "Gráfico de anillo alrededor de cada alérgeno que muestra el nivel de polen de hoy.",
  "editor.helper_levels_gap_synced": "Controlado por el grosor del trazo del alérgeno mientras la sincronización está activa. Desactiva la sincronización para editarlo.",
  "editor.helper_levels_gap_unsynced": "Espacio entre los segmentos del círculo de nivel.",
  "editor.helper_minimal": "Diseño compacto: solo iconos, sin nombres de alérgenos ni valores.",
  "editor.helper_minimal_gap": "Espaciado entre los iconos de alérgenos en modo mínimo.",
  "editor.helper_show_allergen_column": "Mostrar la columna izquierda con los nombres de los alérgenos.",
  "editor.helper_show_value_numeric_in_circle": "Muestra el nivel del día como un número pequeño centrado dentro del círculo.",
  "editor.helper_numeric_value_raw": "Muestra la medición bruta (concentración / índice) en lugar del nivel calculado como valor numérico. Solo se aplica a integraciones que reportan un valor bruto (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Sobrescribir las frases localizadas integradas.",
  "editor.icon_color_custom": "Color personalizado",
  "editor.icon_color_inherit": "Heredar del gráfico",
  "editor.icon_color_mode": "Modo de color del icono",
  "editor.icon_color_picker": "Elegir color del icono",
  "editor.icon_in_ring": "Mostrar el icono del alérgeno dentro del círculo",
  "editor.icon_in_ring_color_follow": "Seguir el color del nivel",
  "editor.icon_in_ring_color_mode": "Modo de color del icono central",
  "editor.icon_in_ring_color_static": "Color estático",
  "editor.icon_in_ring_header": "Icono en el círculo",
  "editor.icon_in_ring_size_ratio": "Tamaño del icono (fracción del hueco del círculo)",
  "editor.icon_in_ring_static_color": "Color estático",
  "editor.icon_size": "Tamaño del icono (px)",
  "editor.index_top": "Índice al inicio de la lista",
  "editor.integration": "Integración",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
  "editor.integration.peu": "Polleninformation EU",
  "editor.integration.plu": "Pollen.lu",
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
  "editor.numeric_value_raw": "Mostrar valor bruto (concentración)",
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
  "editor.phrases_full.goosefoot": "Cenizo",
  "editor.phrases_full.graminales": "Gramíneas",
  "editor.phrases_full.grass": "Gramíneas",
  "editor.phrases_full.grass_cat": "Gramíneas",
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
  "editor.phrases_full.plantain": "Llantén",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Gramíneas",
  "editor.phrases_full.poplar": "Álamo",
  "editor.phrases_full.qualite_globale": "Calidad del aire",
  "editor.phrases_full.ragweed": "Ambrosía",
  "editor.phrases_full.rye": "Centeno",
  "editor.phrases_full.so2": "Dióxido de azufre",
  "editor.phrases_full.sorrel": "Acedera",
  "editor.phrases_full.sweet_chestnut": "Castaño",
  "editor.phrases_full.tree_of_heaven": "Ailanto",
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
  "editor.phrases_levels5.0": "Sin polen",
  "editor.phrases_levels5.1": "Niveles bajos",
  "editor.phrases_levels5.2": "Niveles moderados",
  "editor.phrases_levels5.3": "Niveles altos",
  "editor.phrases_levels5.4": "Niveles muy altos",
  "editor.phrases_short": "Alérgenos, corto",
  "editor.phrases_short.alder": "Aliso",
  "editor.phrases_short.allergy_risk": "Riesgo",
  "editor.phrases_short.ash": "Fres.",
  "editor.phrases_short.beech": "Haya",
  "editor.phrases_short.birch": "Abed.",
  "editor.phrases_short.chenopod": "Cen.",
  "editor.phrases_short.cypress": "Cipr.",
  "editor.phrases_short.elm": "Olmo",
  "editor.phrases_short.goosefoot": "Cen.",
  "editor.phrases_short.graminales": "Gramíneas",
  "editor.phrases_short.grass": "Gram.",
  "editor.phrases_short.grass_cat": "Gram.",
  "editor.phrases_short.grasses": "Gram.",
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
  "editor.phrases_short.plantain": "Llant.",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Gram.",
  "editor.phrases_short.poplar": "Álamo",
  "editor.phrases_short.qualite_globale": "ICA",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Cent.",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Aced.",
  "editor.phrases_short.sweet_chestnut": "Cast.",
  "editor.phrases_short.tree_of_heaven": "Ailan.",
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
  "editor.preset_reset_section": "Restablecer sección",
  "editor.region_id": "ID de región",
  "editor.select_all_allergens": "Seleccionar todos los alérgenos",
  "editor.select_all_pollen": "Seleccionar polen",
  "editor.select_all_pollution": "Seleccionar calidad del aire",
  "editor.show_allergen_column": "Mostrar columna de alérgenos",
  "editor.show_block_separator": "Mostrar separador entre bloques",
  "editor.show_empty_days": "Mostrar días vacíos",
  "editor.show_google_attribution": "Mostrar la atribución de Google",
  "editor.show_no_data_distinct": 'Mostrar "sin datos" con estilo distintivo (difuso)',
  "editor.show_summary_block": "Mostrar bloque de resumen",
  "editor.show_summary_plants_in_season": "Mostrar plantas en temporada",
  "editor.show_summary_row": "Mostrar también las filas detalladas de alérgenos (requiere resumen activado)",
  "editor.show_summary_separator": "Mostrar un divisor entre el resumen y las filas detalladas",
  "editor.show_summary_top_types": "Mostrar tipos de polen predominantes",
  "editor.show_text_allergen": "Mostrar texto, alérgeno",
  "editor.show_value_numeric": "Mostrar valor numérico",
  "editor.show_value_numeric_in_circle": "Mostrar valor numérico dentro del círculo",
  "editor.show_value_text": "Mostrar valor como texto",
  "editor.show_version": "Registrar versión en la consola",
  "editor.sort": "Orden",
  "editor.sort_category_allergens_first": "Ordenar alérgenos de categoría al inicio",
  "editor.sort_name_ascending": "nombre, ascendente",
  "editor.sort_name_descending": "nombre, descendente",
  "editor.sort_none": "ninguno (orden de configuración)",
  "editor.sort_pollution_block": "Agrupar contaminación por separado",
  "editor.sort_value_ascending": "valor, ascendente",
  "editor.sort_value_descending": "valor, descendente",
  "editor.subgroup_day_labels": "Etiquetas de día",
  "editor.subgroup_source": "Origen",
  "editor.subgroup_title": "Título",
  "editor.subgroup_values": "Valores mostrados por día",
  "editor.summary_advanced": "Avanzado",
  "editor.summary_allergen_icons": "Iconos de alérgenos",
  "editor.summary_allergens": "Alérgenos",
  "editor.summary_badge_appearance": "Apariencia de la insignia",
  "editor.summary_badge_content": "Contenido de la insignia",
  "editor.summary_badge_interactivity": "Interacciones",
  "editor.summary_card_appearance": "Apariencia",
  "editor.summary_card_interactivity": "Interacciones",
  "editor.summary_card_layout": "Diseño",
  "editor.summary_day_display": "Visualización diaria",
  "editor.summary_entity_prefix_suffix": "Prefijo y sufijo personalizados",
  "editor.summary_icon_in_ring": "Icono en el círculo",
  "editor.summary_integration_and_place": "Integración y ubicación",
  "editor.summary_level_circles": "Círculos de nivel",
  "editor.summary_minimal": "Mínimo",
  "editor.summary_translation_and_strings": "Traducción y textos",
  "editor.tap_action": "Acción al tocar",
  "editor.tap_action_enable": "Activar acción al tocar",
  "editor.tap_action_entity": "Entidad",
  "editor.tap_action_more_info_needs_entity": "Esta acción necesita una entidad; sin ella no hace nada.",
  "editor.tap_action_navigate_needs_path": "Esta acción necesita una ruta de navegación; sin ella no hace nada.",
  "editor.tap_action_call_service_needs_service": "Esta acción necesita un id válido con el formato domain.service; sin él no hace nada.",
  "editor.tap_action_navigation_path": "Ruta de navegación",
  "editor.tap_action_service": "Servicio (ej. light.turn_on)",
  "editor.tap_action_service_data": "Datos del servicio (JSON)",
  "editor.tap_action_type": "Tipo de acción",
  "editor.tap_action_type_call_service": "Llamar servicio",
  "editor.tap_action_type_more_info": "Más información",
  "editor.tap_action_type_navigate": "Navegar",
  "editor.text_size_ratio": "Proporción de tamaño del texto (%)",
  "editor.title": "Título de la tarjeta",
  "editor.title_automatic": "Título automático",
  "editor.title_hide": "Ocultar título",
  "editor.title_placeholder": "(automático)",
  "editor.to_show_columns": "Columnas a mostrar",
  "editor.to_show_days": "Días a mostrar",
  "editor.to_show_hours": "Horas a mostrar"
}, Vn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Un
}, Symbol.toStringTag, { value: "Module" })), Wn = {
  "card.allergen.alder": "Leppä",
  "card.allergen.allergy_risk": "Allergiariski",
  "card.allergen.ash": "Saarni",
  "card.allergen.beech": "Pyökki",
  "card.allergen.birch": "Koivu",
  "card.allergen.chenopod": "Savikka",
  "card.allergen.cypress": "Sypressi",
  "card.allergen.elm": "Jalava",
  "card.allergen.goosefoot": "Savikka",
  "card.allergen.graminales": "Ruohot",
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
  "card.allergen.sweet_chestnut": "Jalokastanja",
  "card.allergen.tree_of_heaven": "Jumaltenpuu",
  "card.allergen.trees": "Puut",
  "card.allergen.trees_cat": "Puut",
  "card.allergen.weeds": "Rikkaruohot",
  "card.allergen.weeds_cat": "Rikkaruohot",
  "card.allergen.willow": "Paju",
  "card.atmo.event": "Tapahtuma",
  "card.atmo.unavailable": "Ei saatavilla",
  "card.days.0": "Tänään",
  "card.days.1": "Huomenna",
  "card.days.2": "Ylihuomenna",
  "card.error": "Pölytysantureita ei löytynyt. Oletko asentanut oikean integraation ja valinnut alueen kortin asetuksista?",
  "card.error_entity_unavailable": "Sääentiteetti ei ole käytettävissä. Integraatio voi olla offline tai käynnistymässä uudelleen.",
  "card.error_filtered_sensors": "Yksikään anturi ei vastaa valintojasi. Tarkista allergeenit ja kynnysarvo.",
  "card.error_location_not_found": "Sijaintia ei löytynyt. Tarkista sijainnin nimi kortin asetuksista.",
  "card.error_no_sensors": "Pölytysantureita ei löytynyt. Oletko asentanut oikean integraation ja valinnut alueen kortin asetuksista?",
  "card.header_no_location": "Siitepölyennuste",
  "card.header_prefix": "Siitepölyennuste kohteessa",
  "card.index.very_low": "Erittäin matalat tasot",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Ei siitepölyä",
  "card.levels5.1": "Matalat tasot",
  "card.levels5.2": "Keskitasot",
  "card.levels5.3": "Korkeat tasot",
  "card.levels5.4": "Erittäin korkeat tasot",
  "card.loading_forecast": "Ennustetta ladataan...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Ei allergeeneja",
  "card.no_information": "(Ei tietoa)",
  "card.stale_allergen": "Ei tietoja",
  "card.stale_data": "Siitepölytiedot ovat tilapäisesti poissa käytöstä",
  "card.stale_data_subtitle": "Tietolähde ei tällä hetkellä palauta tietoja tälle alueelle",
  "card.summary.in_season_label": "Sesonkina",
  "card.summary.top_label": "Eniten",
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
  "editor.badge_content_aggregate": "Kokonaisriski",
  "editor.badge_content_row": "Useita (rivi)",
  "editor.badge_content_single": "Yksi allergeeni",
  "editor.badge_content_worst": "Korkein siitepölytaso",
  "editor.badge_label_content": "Otsikon sisältö",
  "editor.badge_label_content_allergen": "Allergeenin nimi",
  "editor.badge_label_content_allergen_level": "Allergeenin nimi ja taso",
  "editor.badge_label_content_level": "Siitepölytaso",
  "editor.badge_label_position": "Otsikon sijainti",
  "editor.badge_label_position_below": "Alla",
  "editor.badge_label_position_right": "Oikealla",
  "editor.badge_scale": "Merkin koko (mittakaava)",
  "editor.badge_icon_scale": "Kuvakkeen koko",
  "editor.badge_show_label": "Näytä otsikko",
  "editor.badge_single_allergen": "Allergeeni",
  "editor.badge_version": "Siitepölyennustemerkin versio",
  "editor.badge_visual_icon_in_ring": "Kuvake ympyrässä",
  "editor.badge_visual_icon_only": "Vain kuvake",
  "editor.badge_visual_ring_empty": "Tyhjä ympyrä",
  "editor.badge_visual_ring_value": "Ympyrä ja arvo",
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
  "editor.entity_weather": "Säätila-entiteetti (vain SILAM)",
  "editor.entity_weather_placeholder": "esim. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Virheenkorjaus ja versiotiedot. Useimmat käyttäjät eivät tarvitse tätä.",
  "editor.helper_allergen_icons": "Allergeenikuvakkeiden ulkoasu (vasen sarake tai ympyrän sisällä).",
  "editor.helper_allergen_levels_gap_synced": "Kun käytössä, välin leveys seuraa allergeenin viivan paksuutta (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Allergeenikuvakkeen viivan paksuus. Ohjaa myös tasoympyrän väliä, kun perintätila on käytössä (katso Tasoympyrät).",
  "editor.helper_allergens": "Mitkä allergeenit näytetään, kynnysarvo ja lajittelujärjestys.",
  "editor.helper_badge_appearance": "Merkin koko, tausta ja otsikko.",
  "editor.helper_badge_content": "Mitä merkki näyttää.",
  "editor.helper_badge_interactivity": "Mitä tapahtuu, kun käyttäjä napauttaa merkkiä tai allergeenia.",
  "editor.helper_card_appearance": "Tausta ja kortin kokonaiskoko.",
  "editor.helper_card_interactivity": "Mitä tapahtuu, kun käyttäjä napauttaa korttia tai allergeenia.",
  "editor.helper_card_layout": "Tiivis (minimaalinen) tila ja näkyvät sarakkeet.",
  "editor.helper_day_display": "Mitä kussakin päiväsarakkeessa näkyy: arvot ja otsikot.",
  "editor.helper_icon_in_ring": "Näyttää allergeenikuvakkeen keskitettynä tasoympyrän sisällä.",
  "editor.helper_integration_and_place": "Lähdeintegraatio, sijainti ja kortin otsikko.",
  "editor.helper_level_circles": "Rengaskaavio jokaisen allergeenin ympärillä, joka näyttää tämän päivän siitepölytason.",
  "editor.helper_levels_gap_synced": "Määräytyy allergeenin viivan paksuuden mukaan, kun synkronointi on käytössä. Poista synkronointi käytöstä muokataksesi.",
  "editor.helper_levels_gap_unsynced": "Tasoympyrän segmenttien välinen väli.",
  "editor.helper_minimal": "Tiivis asettelu: vain kuvakkeet, ei allergeenien nimiä tai arvoja.",
  "editor.helper_minimal_gap": "Allergeenikuvakkeiden välinen etäisyys minimaalisessa tilassa.",
  "editor.helper_show_allergen_column": "Näytä vasen sarake, jossa on allergeenien nimet.",
  "editor.helper_show_value_numeric_in_circle": "Näyttää päivän tason pienenä numerona ympyrän keskellä.",
  "editor.helper_numeric_value_raw": "Näyttää raakamittauksen (pitoisuus / indeksi) lasketun tason sijaan numeerisena arvona. Koskee vain integraatioita, jotka raportoivat raaka-arvon (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Korvaa sisäänrakennetut käännetyt tekstit.",
  "editor.icon_color_custom": "Mukautettu väri",
  "editor.icon_color_inherit": "Peri kaaviosta",
  "editor.icon_color_mode": "Kuvakkeen väritila",
  "editor.icon_color_picker": "Valitse kuvakkeen väri",
  "editor.icon_in_ring": "Näytä allergeenikuvake ympyrän sisällä",
  "editor.icon_in_ring_color_follow": "Seuraa tason väriä",
  "editor.icon_in_ring_color_mode": "Keskikuvakkeen väritila",
  "editor.icon_in_ring_color_static": "Staattinen väri",
  "editor.icon_in_ring_header": "Kuvake ympyrässä",
  "editor.icon_in_ring_size_ratio": "Kuvakkeen koko (osuus ympyrän aukosta)",
  "editor.icon_in_ring_static_color": "Staattinen väri",
  "editor.icon_size": "Kuvakkeen koko (px)",
  "editor.index_top": "Indeksi listan kärkeen",
  "editor.integration": "Integraatio",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Näytä raaka-arvo (pitoisuus)",
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
  "editor.phrases_full.graminales": "Ruohot",
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
  "editor.phrases_full.sweet_chestnut": "Jalokastanja",
  "editor.phrases_full.tree_of_heaven": "Jumaltenpuu",
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
  "editor.phrases_levels5.0": "Ei siitepölyä",
  "editor.phrases_levels5.1": "Matalat tasot",
  "editor.phrases_levels5.2": "Keskitasot",
  "editor.phrases_levels5.3": "Korkeat tasot",
  "editor.phrases_levels5.4": "Erittäin korkeat tasot",
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
  "editor.phrases_short.graminales": "Ruohot",
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
  "editor.phrases_short.sweet_chestnut": "Jalok",
  "editor.phrases_short.tree_of_heaven": "Jumal",
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
  "editor.preset_reset_section": "Palauta osio",
  "editor.region_id": "Alueen tunnus",
  "editor.select_all_allergens": "Valitse kaikki allergeenit",
  "editor.select_all_pollen": "Valitse siitepöly",
  "editor.select_all_pollution": "Valitse ilmanlaatu",
  "editor.show_allergen_column": "Näytä allergeenisarake",
  "editor.show_block_separator": "Näytä erotin lohkojen välillä",
  "editor.show_empty_days": "Näytä tyhjät päivät",
  "editor.show_google_attribution": "Näytä Googlen lähdemerkintä",
  "editor.show_no_data_distinct": 'Näytä "ei dataa" erottuvalla (sumea) tyylillä',
  "editor.show_summary_block": "Näytä yhteenvetolohko",
  "editor.show_summary_plants_in_season": "Näytä sesongin kasvit",
  "editor.show_summary_row": "Näytä myös yksityiskohtaiset allergeenirivit (vaatii yhteenvedon käyttöön)",
  "editor.show_summary_separator": "Näytä erotin yhteenvedon ja yksityiskohtaisten rivien välillä",
  "editor.show_summary_top_types": "Näytä yleisimmät siitepölytyypit",
  "editor.show_text_allergen": "Näytä allergeenin nimi",
  "editor.show_value_numeric": "Näytä numeerinen arvo",
  "editor.show_value_numeric_in_circle": "Näytä numeroarvo ympyrän sisällä",
  "editor.show_value_text": "Näytä arvo tekstinä",
  "editor.show_version": "Tulosta versio konsoliin",
  "editor.sort": "Järjestys",
  "editor.sort_category_allergens_first": "Lajittele allergeeni-kategoriat ylimmäksi",
  "editor.sort_name_ascending": "nimi, nouseva",
  "editor.sort_name_descending": "nimi, laskeva",
  "editor.sort_none": "ei mitään (määritysjärjestys)",
  "editor.sort_pollution_block": "Ryhmitä ilmanlaatu erikseen",
  "editor.sort_value_ascending": "arvo, nouseva",
  "editor.sort_value_descending": "arvo, laskeva",
  "editor.subgroup_day_labels": "Päivien otsikot",
  "editor.subgroup_source": "Lähde",
  "editor.subgroup_title": "Otsikko",
  "editor.subgroup_values": "Päivittäin näytettävät arvot",
  "editor.summary_advanced": "Lisäasetukset",
  "editor.summary_allergen_icons": "Allergeenikuvakkeet",
  "editor.summary_allergens": "Allergeenit",
  "editor.summary_badge_appearance": "Merkin ulkonäkö",
  "editor.summary_badge_content": "Merkin sisältö",
  "editor.summary_badge_interactivity": "Vuorovaikutukset",
  "editor.summary_card_appearance": "Ulkoasu",
  "editor.summary_card_interactivity": "Vuorovaikutukset",
  "editor.summary_card_layout": "Asettelu",
  "editor.summary_day_display": "Päivänäkymä",
  "editor.summary_entity_prefix_suffix": "Mukautettu etu- ja jälkiliite",
  "editor.summary_icon_in_ring": "Kuvake ympyrässä",
  "editor.summary_integration_and_place": "Integraatio ja sijainti",
  "editor.summary_level_circles": "Tasoympyrät",
  "editor.summary_minimal": "Minimaalinen",
  "editor.summary_translation_and_strings": "Käännös ja merkkijonot",
  "editor.tap_action": "Napautustoiminto",
  "editor.tap_action_enable": "Ota napautustoiminto käyttöön",
  "editor.tap_action_entity": "Entiteetti",
  "editor.tap_action_more_info_needs_entity": "Tämä toiminto tarvitsee entiteetin; ilman sitä se ei tee mitään.",
  "editor.tap_action_navigate_needs_path": "Tämä toiminto tarvitsee navigointipolun; ilman sitä se ei tee mitään.",
  "editor.tap_action_call_service_needs_service": "Tämä toiminto tarvitsee kelvollisen domain.service-tunnuksen; ilman sitä se ei tee mitään.",
  "editor.tap_action_navigation_path": "Navigointipolku",
  "editor.tap_action_service": "Palvelu (esim. light.turn_on)",
  "editor.tap_action_service_data": "Palveludata (JSON)",
  "editor.tap_action_type": "Toimintotyyppi",
  "editor.tap_action_type_call_service": "Kutsu palvelua",
  "editor.tap_action_type_more_info": "Lisätietoja",
  "editor.tap_action_type_navigate": "Navigoi",
  "editor.text_size_ratio": "Tekstin kokojen suhde (%)",
  "editor.title": "Kortin otsikko",
  "editor.title_automatic": "Automaattinen otsikko",
  "editor.title_hide": "Piilota otsikko",
  "editor.title_placeholder": "(automaattinen)",
  "editor.to_show_columns": "Näytettävät sarakkeet",
  "editor.to_show_days": "Näytettävät päivät",
  "editor.to_show_hours": "Näytettävät tunnit"
}, qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wn
}, Symbol.toStringTag, { value: "Module" })), Zn = {
  "card.allergen.alder": "Aulne",
  "card.allergen.allergy_risk": "Risque d'allergie",
  "card.allergen.ash": "Frêne",
  "card.allergen.beech": "Hêtre",
  "card.allergen.birch": "Bouleau",
  "card.allergen.chenopod": "Chénopode",
  "card.allergen.cypress": "Cyprès",
  "card.allergen.elm": "Orme",
  "card.allergen.goosefoot": "Chénopode",
  "card.allergen.graminales": "Graminées",
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
  "card.allergen.plantain": "Plantain",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Graminées",
  "card.allergen.poplar": "Peuplier",
  "card.allergen.qualite_globale": "Qualité de l'air",
  "card.allergen.ragweed": "Ambroisie",
  "card.allergen.rye": "Seigle",
  "card.allergen.so2": "Dioxyde de soufre",
  "card.allergen.sorrel": "Oseille",
  "card.allergen.sweet_chestnut": "Châtaignier",
  "card.allergen.tree_of_heaven": "Ailante",
  "card.allergen.trees": "Arbres",
  "card.allergen.trees_cat": "Arbres",
  "card.allergen.weeds": "Herbacées",
  "card.allergen.weeds_cat": "Herbacées",
  "card.allergen.willow": "Saule",
  "card.atmo.event": "Événement",
  "card.atmo.unavailable": "Indisponible",
  "card.days.0": "Aujourd'hui",
  "card.days.1": "Demain",
  "card.days.2": "Après-demain",
  "card.error": "Aucun capteur de pollen trouvé. Avez-vous installé la bonne intégration et sélectionné une région dans la configuration de la carte ?",
  "card.error_entity_unavailable": "L’entité météo est indisponible. L’intégration est peut-être hors ligne ou en cours de redémarrage.",
  "card.error_filtered_sensors": "Aucun capteur ne correspond à vos filtres. Vérifiez les allergènes sélectionnés et leurs seuils.",
  "card.error_location_not_found": "Emplacement introuvable. Vérifiez le nom de l’emplacement dans la configuration de la carte.",
  "card.error_no_sensors": "Aucun capteur de pollen trouvé. Avez-vous installé la bonne intégration et sélectionné une région dans la configuration de la carte ?",
  "card.header_no_location": "Prévisions des pollens",
  "card.header_prefix": "Prévisions des pollens pour",
  "card.index.very_low": "Niveaux très faibles",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Pas de pollen",
  "card.levels5.1": "Faibles niveaux",
  "card.levels5.2": "Niveaux modérés",
  "card.levels5.3": "Niveaux élevés",
  "card.levels5.4": "Niveaux très élevés",
  "card.loading_forecast": "Chargement des prévisions...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Aucun allergène",
  "card.no_information": "(Aucune information)",
  "card.stale_allergen": "Aucune donnée",
  "card.stale_data": "Données polliniques temporairement indisponibles",
  "card.stale_data_subtitle": "Le fournisseur ne renvoie actuellement aucune donnée pour cette région",
  "card.summary.in_season_label": "En saison",
  "card.summary.top_label": "Principaux",
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
  "editor.badge_content_aggregate": "Risque global",
  "editor.badge_content_row": "Plusieurs (ligne)",
  "editor.badge_content_single": "Un seul allergène",
  "editor.badge_content_worst": "Niveau de pollen le plus élevé",
  "editor.badge_label_content": "L'étiquette affiche",
  "editor.badge_label_content_allergen": "Nom de l'allergène",
  "editor.badge_label_content_allergen_level": "Nom de l'allergène et niveau",
  "editor.badge_label_content_level": "Niveau de pollen",
  "editor.badge_label_position": "Position de l'étiquette",
  "editor.badge_label_position_below": "En dessous",
  "editor.badge_label_position_right": "À droite",
  "editor.badge_scale": "Taille du badge (échelle)",
  "editor.badge_icon_scale": "Échelle de l'icône",
  "editor.badge_show_label": "Afficher l'étiquette",
  "editor.badge_single_allergen": "Allergène",
  "editor.badge_version": "Version du badge Pollenprognos",
  "editor.badge_visual_icon_in_ring": "Icône dans le cercle",
  "editor.badge_visual_icon_only": "Icône seule",
  "editor.badge_visual_ring_empty": "Cercle vide",
  "editor.badge_visual_ring_value": "Cercle avec valeur",
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
  "editor.entity_weather": "Entité météo (SILAM uniquement)",
  "editor.entity_weather_placeholder": "par exemple weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Débogage et informations de version. La plupart des utilisateurs n'en ont pas besoin.",
  "editor.helper_allergen_icons": "Style des icônes d'allergènes (colonne de gauche ou dans l'anneau).",
  "editor.helper_allergen_levels_gap_synced": "Lorsque activé, la largeur de l'écart suit l'épaisseur du trait de l'allergène (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Épaisseur du trait de l'icône d'allergène. Contrôle aussi l'écart du cercle de niveau quand le mode héritage est actif (voir Cercles de niveau).",
  "editor.helper_allergens": "Quels allergènes afficher, le seuil et l'ordre de tri.",
  "editor.helper_badge_appearance": "Taille du badge, arrière-plan et étiquette.",
  "editor.helper_badge_content": "Ce que le badge affiche.",
  "editor.helper_badge_interactivity": "Ce qui se passe quand l'utilisateur appuie sur le badge ou un allergène.",
  "editor.helper_card_appearance": "Arrière-plan et taille générale de la carte.",
  "editor.helper_card_interactivity": "Ce qui se passe quand l'utilisateur appuie sur la carte ou un allergène.",
  "editor.helper_card_layout": "Mode compact (minimal) et colonnes visibles.",
  "editor.helper_day_display": "Ce qui apparait dans chaque colonne journalière: valeurs et étiquettes.",
  "editor.helper_icon_in_ring": "Afficher l'icône d'allergène centré à l'intérieur du cercle de niveau.",
  "editor.helper_integration_and_place": "Intégration source, emplacement et titre de la carte.",
  "editor.helper_level_circles": "Diagramme annulaire autour de chaque allergène indiquant le niveau de pollen du jour.",
  "editor.helper_levels_gap_synced": "Piloté par l'épaisseur du trait de l'allergène tant que la synchronisation est active. Désactiver la synchronisation pour modifier.",
  "editor.helper_levels_gap_unsynced": "Écart entre les segments de l'anneau de niveau.",
  "editor.helper_minimal": "Mise en page compacte: icônes uniquement, sans noms d'allergènes ni valeurs.",
  "editor.helper_minimal_gap": "Espacement entre les icônes d'allergènes en mode minimal.",
  "editor.helper_show_allergen_column": "Afficher la colonne de gauche avec les noms d'allergènes.",
  "editor.helper_show_value_numeric_in_circle": "Affiche le niveau du jour comme un petit nombre centré dans l'anneau.",
  "editor.helper_numeric_value_raw": "Affiche la mesure brute (concentration / index) au lieu du niveau calculé pour la valeur numérique. S'applique uniquement aux intégrations qui fournissent une valeur brute (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Remplacer les phrases localisées intégrées.",
  "editor.icon_color_custom": "Couleur personnalisée",
  "editor.icon_color_inherit": "Hériter du graphique",
  "editor.icon_color_mode": "Mode couleur des icônes",
  "editor.icon_color_picker": "Choisir la couleur de l'icône",
  "editor.icon_in_ring": "Afficher l'icône d'allergène dans l'anneau",
  "editor.icon_in_ring_color_follow": "Suivre la couleur du niveau",
  "editor.icon_in_ring_color_mode": "Mode de couleur de l'icône centrale",
  "editor.icon_in_ring_color_static": "Couleur statique",
  "editor.icon_in_ring_header": "Icône dans l'anneau",
  "editor.icon_in_ring_size_ratio": "Taille de l'icône (fraction du trou de l'anneau)",
  "editor.icon_in_ring_static_color": "Couleur statique",
  "editor.icon_size": "Taille de l'icône (px)",
  "editor.index_top": "Index en haut de la liste",
  "editor.integration": "Intégration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Afficher la valeur brute (concentration)",
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
  "editor.phrases_full.graminales": "Graminées",
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
  "editor.phrases_full.plantain": "Plantain",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Graminées",
  "editor.phrases_full.poplar": "Peuplier",
  "editor.phrases_full.qualite_globale": "Qualité de l'air",
  "editor.phrases_full.ragweed": "Ambroisie",
  "editor.phrases_full.rye": "Seigle",
  "editor.phrases_full.so2": "Dioxyde de soufre",
  "editor.phrases_full.sorrel": "Oseille",
  "editor.phrases_full.sweet_chestnut": "Châtaignier",
  "editor.phrases_full.tree_of_heaven": "Ailante",
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
  "editor.phrases_levels5.0": "Pas de pollen",
  "editor.phrases_levels5.1": "Niveaux faibles",
  "editor.phrases_levels5.2": "Niveaux modérés",
  "editor.phrases_levels5.3": "Niveaux élevés",
  "editor.phrases_levels5.4": "Niveaux très élevés",
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
  "editor.phrases_short.graminales": "Graminées",
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
  "editor.phrases_short.plantain": "Plant",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Gramin",
  "editor.phrases_short.poplar": "Peupl",
  "editor.phrases_short.qualite_globale": "IQA",
  "editor.phrases_short.ragweed": "Ambroisie",
  "editor.phrases_short.rye": "Seigle",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Osel",
  "editor.phrases_short.sweet_chestnut": "Chât",
  "editor.phrases_short.tree_of_heaven": "Ailan",
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
  "editor.preset_reset_section": "Réinitialiser la section",
  "editor.region_id": "ID de région",
  "editor.select_all_allergens": "Sélectionner tous les allergènes",
  "editor.select_all_pollen": "Sélectionner le pollen",
  "editor.select_all_pollution": "Sélectionner qualité de l'air",
  "editor.show_allergen_column": "Afficher la colonne des allergènes",
  "editor.show_block_separator": "Afficher un séparateur entre les blocs",
  "editor.show_empty_days": "Afficher les jours vides",
  "editor.show_google_attribution": "Afficher l'attribution Google",
  "editor.show_no_data_distinct": 'Afficher "aucune donnée" avec un style distinct (flou)',
  "editor.show_summary_block": "Afficher le bloc récapitulatif",
  "editor.show_summary_plants_in_season": "Afficher les plantes en saison",
  "editor.show_summary_row": "Afficher aussi les lignes détaillées des allergènes (nécessite le résumé activé)",
  "editor.show_summary_separator": "Afficher un séparateur entre le résumé et les lignes détaillées",
  "editor.show_summary_top_types": "Afficher les types de pollen dominants",
  "editor.show_text_allergen": "Afficher le texte, allergène",
  "editor.show_value_numeric": "Afficher la valeur, numérique",
  "editor.show_value_numeric_in_circle": "Afficher la valeur numérique dans l'anneau",
  "editor.show_value_text": "Afficher la valeur, texte",
  "editor.show_version": "Affiche la version dans la console",
  "editor.sort": "Ordre de tri",
  "editor.sort_category_allergens_first": "Trier les allergènes de catégorie en haut",
  "editor.sort_name_ascending": "nom, ascendant",
  "editor.sort_name_descending": "nom, descendant",
  "editor.sort_none": "aucun (ordre de configuration)",
  "editor.sort_pollution_block": "Grouper la pollution séparément",
  "editor.sort_value_ascending": "valeur, ascendante",
  "editor.sort_value_descending": "valeur, descendante",
  "editor.subgroup_day_labels": "Étiquettes de jours",
  "editor.subgroup_source": "Source",
  "editor.subgroup_title": "Titre",
  "editor.subgroup_values": "Valeurs affichées par jour",
  "editor.summary_advanced": "Avancé",
  "editor.summary_allergen_icons": "Icônes d'allergènes",
  "editor.summary_allergens": "Allergènes",
  "editor.summary_badge_appearance": "Apparence du badge",
  "editor.summary_badge_content": "Contenu du badge",
  "editor.summary_badge_interactivity": "Interactions",
  "editor.summary_card_appearance": "Apparence",
  "editor.summary_card_interactivity": "Interactions",
  "editor.summary_card_layout": "Mise en page",
  "editor.summary_day_display": "Affichage journalier",
  "editor.summary_entity_prefix_suffix": "Préfixe et suffixe personnalisés",
  "editor.summary_icon_in_ring": "Icône dans l'anneau",
  "editor.summary_integration_and_place": "Intégration et emplacement",
  "editor.summary_level_circles": "Cercles de niveau",
  "editor.summary_minimal": "Minimal",
  "editor.summary_translation_and_strings": "Traduction et chaînes",
  "editor.tap_action": "Action tactile",
  "editor.tap_action_enable": "Activer l'action tactile",
  "editor.tap_action_entity": "Entité",
  "editor.tap_action_more_info_needs_entity": "Cette action nécessite une entité ; sans elle, elle ne fait rien.",
  "editor.tap_action_navigate_needs_path": "Cette action nécessite un chemin de navigation ; sans lui, elle ne fait rien.",
  "editor.tap_action_call_service_needs_service": "Cette action nécessite un identifiant valide au format domain.service ; sans lui, elle ne fait rien.",
  "editor.tap_action_navigation_path": "Chemin de navigation",
  "editor.tap_action_service": "Service (ex. light.turn_on)",
  "editor.tap_action_service_data": "Données du service (JSON)",
  "editor.tap_action_type": "Type d'action",
  "editor.tap_action_type_call_service": "Appeler un service",
  "editor.tap_action_type_more_info": "Plus d'infos",
  "editor.tap_action_type_navigate": "Naviguer",
  "editor.text_size_ratio": "Ratio de taille du texte (%)",
  "editor.title": "Titre de la carte",
  "editor.title_automatic": "Titre automatique",
  "editor.title_hide": "Masquer le titre",
  "editor.title_placeholder": "(automatique)",
  "editor.to_show_columns": "Colonnes à afficher",
  "editor.to_show_days": "Jours à afficher",
  "editor.to_show_hours": "Heures à afficher"
}, Qn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Zn
}, Symbol.toStringTag, { value: "Module" })), Yn = {
  "card.allergen.alder": "Ontano",
  "card.allergen.allergy_risk": "Rischio allergia",
  "card.allergen.ash": "Frassino",
  "card.allergen.beech": "Faggio",
  "card.allergen.birch": "Betulla",
  "card.allergen.chenopod": "Chenopodio",
  "card.allergen.cypress": "Cipresso",
  "card.allergen.elm": "Olmo",
  "card.allergen.goosefoot": "Chenopodio",
  "card.allergen.graminales": "Piante erbacee",
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
  "card.allergen.plantain": "Piantaggine",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Graminacee",
  "card.allergen.poplar": "Pioppo",
  "card.allergen.qualite_globale": "Qualità dell'aria",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Segale",
  "card.allergen.so2": "Biossido di zolfo",
  "card.allergen.sorrel": "Romice",
  "card.allergen.sweet_chestnut": "Castagno",
  "card.allergen.tree_of_heaven": "Ailanto",
  "card.allergen.trees": "Alberi",
  "card.allergen.trees_cat": "Alberi",
  "card.allergen.weeds": "Erbacce",
  "card.allergen.weeds_cat": "Erbacce",
  "card.allergen.willow": "Salice",
  "card.atmo.event": "Evento",
  "card.atmo.unavailable": "Non disponibile",
  "card.days.0": "Oggi",
  "card.days.1": "Domani",
  "card.days.2": "Dopodomani",
  "card.error": "Nessun sensore di polline trovato. Hai installato l'integrazione corretta e selezionato una regione nella configurazione della scheda?",
  "card.error_entity_unavailable": "L'entità meteo non è disponibile. L'integrazione potrebbe essere offline o in fase di riavvio.",
  "card.error_filtered_sensors": "Nessun sensore corrisponde ai tuoi filtri. Controlla allergeni selezionati e soglia.",
  "card.error_location_not_found": "Posizione non trovata. Controlla il nome della posizione nella configurazione della scheda.",
  "card.error_no_sensors": "Nessun sensore di polline trovato. Hai installato l'integrazione corretta e selezionato una regione nella configurazione della scheda?",
  "card.header_no_location": "Previsione pollini",
  "card.header_prefix": "Previsione pollini per",
  "card.index.very_low": "Livelli molto bassi",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Nessun polline",
  "card.levels5.1": "Livelli bassi",
  "card.levels5.2": "Livelli moderati",
  "card.levels5.3": "Livelli alti",
  "card.levels5.4": "Livelli molto alti",
  "card.loading_forecast": "Caricamento previsione...",
  "card.location.plu": "Lussemburgo",
  "card.no_allergens": "Nessun allergene",
  "card.no_information": "(Nessuna informazione)",
  "card.stale_allergen": "Nessun dato",
  "card.stale_data": "Dati sui pollini temporaneamente non disponibili",
  "card.stale_data_subtitle": "Il fornitore non restituisce attualmente dati per questa regione",
  "card.summary.in_season_label": "In stagione",
  "card.summary.top_label": "Principali",
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
  "editor.badge_content_aggregate": "Rischio complessivo",
  "editor.badge_content_row": "Diversi (riga)",
  "editor.badge_content_single": "Un solo allergene",
  "editor.badge_content_worst": "Livello di polline più alto",
  "editor.badge_label_content": "L'etichetta mostra",
  "editor.badge_label_content_allergen": "Nome dell'allergene",
  "editor.badge_label_content_allergen_level": "Nome dell'allergene e livello",
  "editor.badge_label_content_level": "Livello di polline",
  "editor.badge_label_position": "Posizione dell'etichetta",
  "editor.badge_label_position_below": "Sotto",
  "editor.badge_label_position_right": "A destra",
  "editor.badge_scale": "Dimensione del distintivo (scala)",
  "editor.badge_icon_scale": "Scala icona",
  "editor.badge_show_label": "Mostra etichetta",
  "editor.badge_single_allergen": "Allergene",
  "editor.badge_version": "Versione del distintivo previsione pollini",
  "editor.badge_visual_icon_in_ring": "Icona nel cerchio",
  "editor.badge_visual_icon_only": "Solo icona",
  "editor.badge_visual_ring_empty": "Cerchio vuoto",
  "editor.badge_visual_ring_value": "Cerchio con valore",
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
  "editor.entity_weather": "Entità meteo (solo SILAM)",
  "editor.entity_weather_placeholder": "es. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Debug e informazioni sulla versione. La maggior parte degli utenti non ne ha bisogno.",
  "editor.helper_allergen_icons": "Stile delle icone degli allergeni (colonna sinistra o dentro il cerchio).",
  "editor.helper_allergen_levels_gap_synced": "Quando è attivo, la larghezza dello spazio segue lo spessore del tratto dell'allergene (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Spessore del tratto dell'icona dell'allergene. Controlla anche lo spazio del cerchio di livello quando la modalità di ereditarietà è attiva (vedi Cerchi di livello).",
  "editor.helper_allergens": "Quali allergeni mostrare, soglia e ordinamento.",
  "editor.helper_badge_appearance": "Dimensione del distintivo, sfondo ed etichetta.",
  "editor.helper_badge_content": "Cosa mostra il distintivo.",
  "editor.helper_badge_interactivity": "Cosa succede quando l'utente tocca il distintivo o un allergene.",
  "editor.helper_card_appearance": "Sfondo e dimensione complessiva della scheda.",
  "editor.helper_card_interactivity": "Cosa succede quando l'utente tocca la scheda o un allergene.",
  "editor.helper_card_layout": "Modalità compatta (minima) e quali colonne sono visibili.",
  "editor.helper_day_display": "Cosa appare in ogni colonna del giorno: valori ed etichette.",
  "editor.helper_icon_in_ring": "Mostra l'icona dell'allergene centrata dentro il cerchio di livello.",
  "editor.helper_integration_and_place": "Integrazione di origine, posizione e titolo della scheda.",
  "editor.helper_level_circles": "Grafico ad anello attorno a ogni allergene che mostra il livello di polline di oggi.",
  "editor.helper_levels_gap_synced": "Determinato dallo spessore del tratto dell'allergene finché la sincronizzazione è attiva. Disattiva la sincronizzazione per modificarlo.",
  "editor.helper_levels_gap_unsynced": "Spazio tra i segmenti del cerchio di livello.",
  "editor.helper_minimal": "Layout compatto: solo icone, senza nomi degli allergeni né valori.",
  "editor.helper_minimal_gap": "Spaziatura tra le icone degli allergeni in modalità minima.",
  "editor.helper_show_allergen_column": "Mostra la colonna sinistra con i nomi degli allergeni.",
  "editor.helper_show_value_numeric_in_circle": "Mostra il livello del giorno come un numero piccolo centrato dentro il cerchio.",
  "editor.helper_numeric_value_raw": "Mostra la misurazione grezza (concentrazione / indice) invece del livello calcolato come valore numerico. Si applica solo alle integrazioni che riportano un valore grezzo (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Sovrascrivi le frasi localizzate integrate.",
  "editor.icon_color_custom": "Colore personalizzato",
  "editor.icon_color_inherit": "Eredita dal grafico",
  "editor.icon_color_mode": "Modalità colore icona",
  "editor.icon_color_picker": "Scegli colore icona",
  "editor.icon_in_ring": "Mostra l'icona dell'allergene dentro il cerchio",
  "editor.icon_in_ring_color_follow": "Segui il colore del livello",
  "editor.icon_in_ring_color_mode": "Modalità colore dell'icona centrale",
  "editor.icon_in_ring_color_static": "Colore statico",
  "editor.icon_in_ring_header": "Icona nel cerchio",
  "editor.icon_in_ring_size_ratio": "Dimensione dell'icona (frazione del foro del cerchio)",
  "editor.icon_in_ring_static_color": "Colore statico",
  "editor.icon_size": "Dimensione icona (px)",
  "editor.index_top": "Indice in cima all'elenco",
  "editor.integration": "Integrazione",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Mostra valore grezzo (concentrazione)",
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
  "editor.phrases_full.graminales": "Piante erbacee",
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
  "editor.phrases_full.plantain": "Piantaggine",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Graminacee",
  "editor.phrases_full.poplar": "Pioppo",
  "editor.phrases_full.qualite_globale": "Qualità dell'aria",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Segale",
  "editor.phrases_full.so2": "Biossido di zolfo",
  "editor.phrases_full.sorrel": "Romice",
  "editor.phrases_full.sweet_chestnut": "Castagno",
  "editor.phrases_full.tree_of_heaven": "Ailanto",
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
  "editor.phrases_levels5.0": "Nessun polline",
  "editor.phrases_levels5.1": "Livelli bassi",
  "editor.phrases_levels5.2": "Livelli moderati",
  "editor.phrases_levels5.3": "Livelli alti",
  "editor.phrases_levels5.4": "Livelli molto alti",
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
  "editor.phrases_short.graminales": "Piante erbacee",
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
  "editor.phrases_short.plantain": "Piant",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Gramin",
  "editor.phrases_short.poplar": "Pioppo",
  "editor.phrases_short.qualite_globale": "IQA",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Segale",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Rom",
  "editor.phrases_short.sweet_chestnut": "Cast",
  "editor.phrases_short.tree_of_heaven": "Ailan",
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
  "editor.preset_reset_section": "Ripristina sezione",
  "editor.region_id": "ID Regione",
  "editor.select_all_allergens": "Seleziona tutti gli allergeni",
  "editor.select_all_pollen": "Seleziona polline",
  "editor.select_all_pollution": "Seleziona qualità dell'aria",
  "editor.show_allergen_column": "Mostra colonna degli allergeni",
  "editor.show_block_separator": "Mostra separatore tra i blocchi",
  "editor.show_empty_days": "Mostra giorni vuoti",
  "editor.show_google_attribution": "Mostra attribuzione Google",
  "editor.show_no_data_distinct": 'Mostra "nessun dato" con stile distinto (sfocato)',
  "editor.show_summary_block": "Mostra blocco riepilogo",
  "editor.show_summary_plants_in_season": "Mostra piante in stagione",
  "editor.show_summary_row": "Mostra anche le righe dettagliate degli allergeni (richiede il riepilogo abilitato)",
  "editor.show_summary_separator": "Mostra un divisore tra il riepilogo e le righe dettagliate",
  "editor.show_summary_top_types": "Mostra i tipi di polline predominanti",
  "editor.show_text_allergen": "Mostra testo, allergene",
  "editor.show_value_numeric": "Mostra valore numerico",
  "editor.show_value_numeric_in_circle": "Mostra valore numerico dentro il cerchio",
  "editor.show_value_text": "Mostra valore come testo",
  "editor.show_version": "Registra la versione nella console",
  "editor.sort": "Ordine",
  "editor.sort_category_allergens_first": "Ordina gli allergeni di categoria in alto",
  "editor.sort_name_ascending": "nome, crescente",
  "editor.sort_name_descending": "nome, decrescente",
  "editor.sort_none": "nessuno (ordine configurazione)",
  "editor.sort_pollution_block": "Raggruppa inquinamento separatamente",
  "editor.sort_value_ascending": "valore, crescente",
  "editor.sort_value_descending": "valore, decrescente",
  "editor.subgroup_day_labels": "Etichette dei giorni",
  "editor.subgroup_source": "Origine",
  "editor.subgroup_title": "Titolo",
  "editor.subgroup_values": "Valori mostrati per giorno",
  "editor.summary_advanced": "Avanzate",
  "editor.summary_allergen_icons": "Icone degli allergeni",
  "editor.summary_allergens": "Allergeni",
  "editor.summary_badge_appearance": "Aspetto del distintivo",
  "editor.summary_badge_content": "Contenuto del distintivo",
  "editor.summary_badge_interactivity": "Interazioni",
  "editor.summary_card_appearance": "Aspetto",
  "editor.summary_card_interactivity": "Interazioni",
  "editor.summary_card_layout": "Layout",
  "editor.summary_day_display": "Visualizzazione giornaliera",
  "editor.summary_entity_prefix_suffix": "Prefisso e suffisso personalizzati",
  "editor.summary_icon_in_ring": "Icona nel cerchio",
  "editor.summary_integration_and_place": "Integrazione e luogo",
  "editor.summary_level_circles": "Cerchi di livello",
  "editor.summary_minimal": "Minimale",
  "editor.summary_translation_and_strings": "Traduzione e stringhe",
  "editor.tap_action": "Azione al tocco",
  "editor.tap_action_enable": "Abilita azione al tocco",
  "editor.tap_action_entity": "Entità",
  "editor.tap_action_more_info_needs_entity": "Questa azione richiede un'entità; senza non fa nulla.",
  "editor.tap_action_navigate_needs_path": "Questa azione richiede un percorso di navigazione; senza non fa nulla.",
  "editor.tap_action_call_service_needs_service": "Questa azione richiede un id valido nella forma domain.service; senza non fa nulla.",
  "editor.tap_action_navigation_path": "Percorso di navigazione",
  "editor.tap_action_service": "Servizio (es. light.turn_on)",
  "editor.tap_action_service_data": "Dati del servizio (JSON)",
  "editor.tap_action_type": "Tipo di azione",
  "editor.tap_action_type_call_service": "Chiama servizio",
  "editor.tap_action_type_more_info": "Altre informazioni",
  "editor.tap_action_type_navigate": "Naviga",
  "editor.text_size_ratio": "Proporzione dimensione testo (%)",
  "editor.title": "Titolo della scheda",
  "editor.title_automatic": "Titolo automatico",
  "editor.title_hide": "Nascondi titolo",
  "editor.title_placeholder": "(automatico)",
  "editor.to_show_columns": "Colonne da mostrare",
  "editor.to_show_days": "Giorni da mostrare",
  "editor.to_show_hours": "Ore da mostrare"
}, Jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yn
}, Symbol.toStringTag, { value: "Module" })), Xn = {
  "card.allergen.alder": "Els",
  "card.allergen.allergy_risk": "Allergierisico",
  "card.allergen.ash": "Es",
  "card.allergen.beech": "Beuk",
  "card.allergen.birch": "Berk",
  "card.allergen.chenopod": "Melde",
  "card.allergen.cypress": "Cipres",
  "card.allergen.elm": "Iep",
  "card.allergen.goosefoot": "Melganzenvoet",
  "card.allergen.graminales": "Grassen",
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
  "card.allergen.plantain": "Weegbree",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Grassen",
  "card.allergen.poplar": "Populier",
  "card.allergen.qualite_globale": "Luchtkwaliteit",
  "card.allergen.ragweed": "Ambrosia",
  "card.allergen.rye": "Rogge",
  "card.allergen.so2": "Zwaveldioxide",
  "card.allergen.sorrel": "Zuring",
  "card.allergen.sweet_chestnut": "Tamme kastanje",
  "card.allergen.tree_of_heaven": "Hemelboom",
  "card.allergen.trees": "Bomen",
  "card.allergen.trees_cat": "Bomen",
  "card.allergen.weeds": "Onkruid",
  "card.allergen.weeds_cat": "Onkruiden",
  "card.allergen.willow": "Wilg",
  "card.atmo.event": "Gebeurtenis",
  "card.atmo.unavailable": "Niet beschikbaar",
  "card.days.0": "Vandaag",
  "card.days.1": "Morgen",
  "card.days.2": "Overmorgen",
  "card.error": "Geen pollensensoren gevonden. Heb je de juiste integratie geïnstalleerd en een regio gekozen in de kaartinstellingen?",
  "card.error_entity_unavailable": "Weerentiteit is niet beschikbaar. De integratie is mogelijk offline of wordt opnieuw gestart.",
  "card.error_filtered_sensors": "Geen sensoren voldoen aan je filters. Controleer de geselecteerde allergenen en drempelwaarde.",
  "card.error_location_not_found": "Locatie niet gevonden. Controleer de locatienaam in de kaartconfiguratie.",
  "card.error_no_sensors": "Geen pollensensoren gevonden. Heb je de juiste integratie geïnstalleerd en een regio gekozen in de kaartinstellingen?",
  "card.header_no_location": "Pollenverwachting",
  "card.header_prefix": "Pollenverwachting voor",
  "card.index.very_low": "Zeer lage niveaus",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Geen pollen",
  "card.levels5.1": "Lage niveaus",
  "card.levels5.2": "Matig niveau",
  "card.levels5.3": "Hoge niveaus",
  "card.levels5.4": "Zeer hoge niveaus",
  "card.loading_forecast": "Voorspelling wordt geladen...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Geen allergenen",
  "card.no_information": "(Geen informatie)",
  "card.stale_allergen": "Geen gegevens",
  "card.stale_data": "Pollen­gegevens tijdelijk niet beschikbaar",
  "card.stale_data_subtitle": "De aanbieder levert momenteel geen gegevens voor deze regio",
  "card.summary.in_season_label": "In seizoen",
  "card.summary.top_label": "Meest",
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
  "editor.badge_content_aggregate": "Totaalrisico",
  "editor.badge_content_row": "Meerdere (rij)",
  "editor.badge_content_single": "Eén allergeen",
  "editor.badge_content_worst": "Hoogste pollenniveau",
  "editor.badge_label_content": "Label toont",
  "editor.badge_label_content_allergen": "Allergeennaam",
  "editor.badge_label_content_allergen_level": "Allergeennaam en niveau",
  "editor.badge_label_content_level": "Pollenniveau",
  "editor.badge_label_position": "Labelpositie",
  "editor.badge_label_position_below": "Onder",
  "editor.badge_label_position_right": "Rechts",
  "editor.badge_scale": "Badge-grootte (schaal)",
  "editor.badge_icon_scale": "Pictogramschaal",
  "editor.badge_show_label": "Label tonen",
  "editor.badge_single_allergen": "Allergeen",
  "editor.badge_version": "Versie van de pollenvoorspellingsbadge",
  "editor.badge_visual_icon_in_ring": "Pictogram in ring",
  "editor.badge_visual_icon_only": "Alleen pictogram",
  "editor.badge_visual_ring_empty": "Lege ring",
  "editor.badge_visual_ring_value": "Ring met waarde",
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
  "editor.entity_weather": "Weerentiteit (alleen SILAM)",
  "editor.entity_weather_placeholder": "bijv. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Debuggen en versie-informatie. De meeste gebruikers hebben dit niet nodig.",
  "editor.helper_allergen_icons": "Stijl van de allergeeniconen (linkerkolom of in de ring).",
  "editor.helper_allergen_levels_gap_synced": "Wanneer ingeschakeld, volgt de tussenruimte de lijndikte van het allergeen (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Lijndikte van het allergeenicoon. Bepaalt ook de tussenruimte van de niveauring wanneer de overervingsmodus actief is (zie Niveauringen).",
  "editor.helper_allergens": "Welke allergenen worden weergegeven, drempelwaarde en sorteervolgorde.",
  "editor.helper_badge_appearance": "Badge-grootte, achtergrond en label.",
  "editor.helper_badge_content": "Wat de badge toont.",
  "editor.helper_badge_interactivity": "Wat er gebeurt wanneer de gebruiker op de badge of een allergeen tikt.",
  "editor.helper_card_appearance": "Achtergrond en algemene kaartgrootte.",
  "editor.helper_card_interactivity": "Wat er gebeurt wanneer de gebruiker op de kaart of een allergeen tikt.",
  "editor.helper_card_layout": "Compacte (minimale) modus en zichtbare kolommen.",
  "editor.helper_day_display": "Wat er in elke dagkolom verschijnt: waarden en labels.",
  "editor.helper_icon_in_ring": "Allergeenicoon gecentreerd in de niveauring weergeven.",
  "editor.helper_integration_and_place": "Bronintegratie, locatie en kaarttitel.",
  "editor.helper_level_circles": "Ringdiagram rondom elk allergeen met het pollenniveau van vandaag.",
  "editor.helper_levels_gap_synced": "Wordt aangestuurd door de lijndikte van het allergeen zolang synchronisatie actief is. Schakel synchronisatie uit om te bewerken.",
  "editor.helper_levels_gap_unsynced": "Tussenruimte tussen segmenten van de niveauring.",
  "editor.helper_minimal": "Compacte weergave: alleen iconen, geen allergennamen of waarden.",
  "editor.helper_minimal_gap": "Afstand tussen allergeeniconen in minimale modus.",
  "editor.helper_show_allergen_column": "De linkerkolom met allergennamen tonen.",
  "editor.helper_show_value_numeric_in_circle": "Geeft het dagelijkse niveau weer als een klein getal gecentreerd in de ring.",
  "editor.helper_numeric_value_raw": "Toont de ruwe meting (concentratie / index) in plaats van het berekende niveau als numerieke waarde. Geldt alleen voor integraties die een ruwe waarde rapporteren (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Ingebouwde gelokaliseerde zinnen overschrijven.",
  "editor.icon_color_custom": "Aangepaste kleur",
  "editor.icon_color_inherit": "Overnemen van diagram",
  "editor.icon_color_mode": "Pictogramkleurmodus",
  "editor.icon_color_picker": "Kies pictogramkleur",
  "editor.icon_in_ring": "Allergeenicoon in de ring tonen",
  "editor.icon_in_ring_color_follow": "Niveaukleur volgen",
  "editor.icon_in_ring_color_mode": "Kleurmodus van het middenicoon",
  "editor.icon_in_ring_color_static": "Statische kleur",
  "editor.icon_in_ring_header": "Icoon in ring",
  "editor.icon_in_ring_size_ratio": "Icoongrootte (deel van de ringopening)",
  "editor.icon_in_ring_static_color": "Statische kleur",
  "editor.icon_size": "Pictogramgrootte (px)",
  "editor.index_top": "Index bovenaan de lijst",
  "editor.integration": "Integratie",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Toon ruwe waarde (concentratie)",
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
  "editor.phrases_full.graminales": "Grassen",
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
  "editor.phrases_full.plantain": "Weegbree",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Grassen",
  "editor.phrases_full.poplar": "Populier",
  "editor.phrases_full.qualite_globale": "Luchtkwaliteit",
  "editor.phrases_full.ragweed": "Ambrosia",
  "editor.phrases_full.rye": "Rogge",
  "editor.phrases_full.so2": "Zwaveldioxide",
  "editor.phrases_full.sorrel": "Zuring",
  "editor.phrases_full.sweet_chestnut": "Tamme kastanje",
  "editor.phrases_full.tree_of_heaven": "Hemelboom",
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
  "editor.phrases_levels5.0": "Geen pollen",
  "editor.phrases_levels5.1": "Lage niveaus",
  "editor.phrases_levels5.2": "Matig niveau",
  "editor.phrases_levels5.3": "Hoge niveaus",
  "editor.phrases_levels5.4": "Zeer hoge niveaus",
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
  "editor.phrases_short.graminales": "Grassen",
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
  "editor.phrases_short.plantain": "Weeg",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Gras",
  "editor.phrases_short.poplar": "Popul",
  "editor.phrases_short.qualite_globale": "LKI",
  "editor.phrases_short.ragweed": "Ambrosia",
  "editor.phrases_short.rye": "Rogge",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Zur",
  "editor.phrases_short.sweet_chestnut": "Kast",
  "editor.phrases_short.tree_of_heaven": "Hemel",
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
  "editor.preset_reset_section": "Sectie resetten",
  "editor.region_id": "Regio-ID",
  "editor.select_all_allergens": "Selecteer alle allergenen",
  "editor.select_all_pollen": "Pollen selecteren",
  "editor.select_all_pollution": "Luchtkwaliteit selecteren",
  "editor.show_allergen_column": "Allergeenkolom tonen",
  "editor.show_block_separator": "Scheidingslijn tussen blokken tonen",
  "editor.show_empty_days": "Toon lege dagen",
  "editor.show_google_attribution": "Google-bronvermelding tonen",
  "editor.show_no_data_distinct": 'Toon "geen data" met opvallende (wazige) stijl',
  "editor.show_summary_block": "Samenvattingsblok tonen",
  "editor.show_summary_plants_in_season": "Planten in seizoen tonen",
  "editor.show_summary_row": "Ook de gedetailleerde allergeenrijen tonen (vereist ingeschakelde samenvatting)",
  "editor.show_summary_separator": "Een scheidingslijn tonen tussen de samenvatting en de gedetailleerde rijen",
  "editor.show_summary_top_types": "Meest voorkomende pollensoorten tonen",
  "editor.show_text_allergen": "Toon tekst, allergeen",
  "editor.show_value_numeric": "Toon numerieke waarde",
  "editor.show_value_numeric_in_circle": "Toon numerieke waarde in de ring",
  "editor.show_value_text": "Toon waarde als tekst",
  "editor.show_version": "Log versie naar de console",
  "editor.sort": "Sorteervolgorde",
  "editor.sort_category_allergens_first": "Categorie-allergenen bovenaan sorteren",
  "editor.sort_name_ascending": "naam, oplopend",
  "editor.sort_name_descending": "naam, aflopend",
  "editor.sort_none": "geen (configuratievolgorde)",
  "editor.sort_pollution_block": "Luchtkwaliteit apart groeperen",
  "editor.sort_value_ascending": "waarde, oplopend",
  "editor.sort_value_descending": "waarde, aflopend",
  "editor.subgroup_day_labels": "Daglabels",
  "editor.subgroup_source": "Bron",
  "editor.subgroup_title": "Titel",
  "editor.subgroup_values": "Waarden per dag",
  "editor.summary_advanced": "Geavanceerd",
  "editor.summary_allergen_icons": "Allergeeniconen",
  "editor.summary_allergens": "Allergenen",
  "editor.summary_badge_appearance": "Badge-uiterlijk",
  "editor.summary_badge_content": "Badge-inhoud",
  "editor.summary_badge_interactivity": "Interacties",
  "editor.summary_card_appearance": "Weergave",
  "editor.summary_card_interactivity": "Interacties",
  "editor.summary_card_layout": "Indeling",
  "editor.summary_day_display": "Dagweergave",
  "editor.summary_entity_prefix_suffix": "Aangepast voor- en achtervoegsel",
  "editor.summary_icon_in_ring": "Icoon in ring",
  "editor.summary_integration_and_place": "Integratie en locatie",
  "editor.summary_level_circles": "Niveauringen",
  "editor.summary_minimal": "Minimaal",
  "editor.summary_translation_and_strings": "Vertaling en tekstreeksen",
  "editor.tap_action": "Tikactie",
  "editor.tap_action_enable": "Tikactie inschakelen",
  "editor.tap_action_entity": "Entiteit",
  "editor.tap_action_more_info_needs_entity": "Deze actie heeft een entiteit nodig; zonder entiteit doet ze niets.",
  "editor.tap_action_navigate_needs_path": "Deze actie heeft een navigatiepad nodig; zonder pad doet ze niets.",
  "editor.tap_action_call_service_needs_service": "Deze actie heeft een geldig id in de vorm domain.service nodig; zonder id doet ze niets.",
  "editor.tap_action_navigation_path": "Navigatiepad",
  "editor.tap_action_service": "Service (bijv. light.turn_on)",
  "editor.tap_action_service_data": "Servicegegevens (JSON)",
  "editor.tap_action_type": "Actietype",
  "editor.tap_action_type_call_service": "Service aanroepen",
  "editor.tap_action_type_more_info": "Meer info",
  "editor.tap_action_type_navigate": "Navigeren",
  "editor.text_size_ratio": "Tekstgrootteverhouding (%)",
  "editor.title": "Kaarttitel",
  "editor.title_automatic": "Automatische titel",
  "editor.title_hide": "Verberg titel",
  "editor.title_placeholder": "(automatisch)",
  "editor.to_show_columns": "Aantal kolommen om te tonen",
  "editor.to_show_days": "Aantal dagen om te tonen",
  "editor.to_show_hours": "Aantal uren om te tonen"
}, el = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Xn
}, Symbol.toStringTag, { value: "Module" })), tl = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisiko",
  "card.allergen.ash": "Ask",
  "card.allergen.beech": "Bøk",
  "card.allergen.birch": "Bjørk",
  "card.allergen.chenopod": "Melde",
  "card.allergen.cypress": "Sypress",
  "card.allergen.elm": "Alm",
  "card.allergen.goosefoot": "Melde",
  "card.allergen.graminales": "Gress",
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
  "card.allergen.sweet_chestnut": "Edelkastanje",
  "card.allergen.tree_of_heaven": "Gudetre",
  "card.allergen.trees": "Trær",
  "card.allergen.trees_cat": "Trær",
  "card.allergen.weeds": "Ugress",
  "card.allergen.weeds_cat": "Ugress",
  "card.allergen.willow": "Selje",
  "card.atmo.event": "Hendelse",
  "card.atmo.unavailable": "Ikke tilgjengelig",
  "card.days.0": "I dag",
  "card.days.1": "I morgen",
  "card.days.2": "Overimorgen",
  "card.error": "Ingen pollensensor funnet. Har du installert riktig integrasjon og valgt region i kortoppsettet?",
  "card.error_entity_unavailable": "Værentiteten er utilgjengelig. Integrasjonen kan være frakoblet eller starter på nytt.",
  "card.error_filtered_sensors": "Ingen sensorer samsvarer med filteret. Sjekk utvalg av allergener og terskelverdi.",
  "card.error_location_not_found": "Plassering ikke funnet. Sjekk plasseringen i kortkonfigurasjonen.",
  "card.error_no_sensors": "Ingen pollensensor funnet. Har du installert riktig integrasjon og valgt region i kortoppsettet?",
  "card.header_no_location": "Pollenvarsel",
  "card.header_prefix": "Pollenvarsel for",
  "card.index.very_low": "Svært lave nivåer",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Ingen pollen",
  "card.levels5.1": "Lave nivåer",
  "card.levels5.2": "Moderat nivå",
  "card.levels5.3": "Høye nivåer",
  "card.levels5.4": "Svært høye nivåer",
  "card.loading_forecast": "Laster prognose...",
  "card.location.plu": "Luxembourg",
  "card.no_allergens": "Ingen allergener",
  "card.no_information": "(Ingen informasjon)",
  "card.stale_allergen": "Ingen data",
  "card.stale_data": "Pollendata er midlertidig utilgjengelige",
  "card.stale_data_subtitle": "Leverandøren returnerer for øyeblikket ingen data for denne regionen",
  "card.summary.in_season_label": "I sesong",
  "card.summary.top_label": "Mest",
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
  "editor.badge_content_aggregate": "Samlet risiko",
  "editor.badge_content_row": "Flere (rad)",
  "editor.badge_content_single": "Ett allergen",
  "editor.badge_content_worst": "Høyeste pollennivå",
  "editor.badge_label_content": "Etiketten viser",
  "editor.badge_label_content_allergen": "Allergennavn",
  "editor.badge_label_content_allergen_level": "Allergennavn og nivå",
  "editor.badge_label_content_level": "Pollennivå",
  "editor.badge_label_position": "Etikettens plassering",
  "editor.badge_label_position_below": "Under",
  "editor.badge_label_position_right": "Høyre",
  "editor.badge_scale": "Merkestørrelse (skala)",
  "editor.badge_icon_scale": "Ikonskala",
  "editor.badge_show_label": "Vis etikett",
  "editor.badge_single_allergen": "Allergen",
  "editor.badge_version": "Versjon av pollenprognosemerket",
  "editor.badge_visual_icon_in_ring": "Ikon i ring",
  "editor.badge_visual_icon_only": "Bare ikon",
  "editor.badge_visual_ring_empty": "Tom ring",
  "editor.badge_visual_ring_value": "Ring med verdi",
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
  "editor.entity_weather": "Værentitet (kun SILAM)",
  "editor.entity_weather_placeholder": "f.eks. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Feilsøking og versjonsinformasjon. De fleste trenger ikke dette.",
  "editor.helper_allergen_icons": "Utseende på allergenikonene (venstre kolonne eller inni ringen).",
  "editor.helper_allergen_levels_gap_synced": "Når det er på, følger mellomrommet allergenets strektykkelse (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Strektykkelse på allergenikonet. Styrer også mellomrommet i nivå-sirkelen når arvemodus er aktiv (se Nivå-sirkler).",
  "editor.helper_allergens": "Hvilke allergener som vises, terskel og sorteringsrekkefølge.",
  "editor.helper_badge_appearance": "Merkestørrelse, bakgrunn og etikett.",
  "editor.helper_badge_content": "Hva merket viser.",
  "editor.helper_badge_interactivity": "Hva som skjer når brukeren trykker på merket eller et allergen.",
  "editor.helper_card_appearance": "Bakgrunn og kortets samlede størrelse.",
  "editor.helper_card_interactivity": "Hva som skjer når brukeren trykker på kortet eller et allergen.",
  "editor.helper_card_layout": "Kompakt (minimal) modus og hvilke kolonner som vises.",
  "editor.helper_day_display": "Hva som vises i hver dagkolonne: verdier og etiketter.",
  "editor.helper_icon_in_ring": "Vis allergenikonet sentrert inni nivå-sirkelen.",
  "editor.helper_integration_and_place": "Kildeintegrasjon, sted og korttittel.",
  "editor.helper_level_circles": "Ringdiagram rundt hvert allergen som viser dagens pollennivå.",
  "editor.helper_levels_gap_synced": "Styres av allergenets strektykkelse mens synkronisering er på. Slå av synkronisering for å redigere.",
  "editor.helper_levels_gap_unsynced": "Mellomrom mellom segmentene i nivåringen.",
  "editor.helper_minimal": "Kompakt oppsett: bare ikoner, ingen allergennavn eller verdier.",
  "editor.helper_minimal_gap": "Avstand mellom allergenikoner i minimal modus.",
  "editor.helper_show_allergen_column": "Vis venstre kolonne med allergennavn.",
  "editor.helper_show_value_numeric_in_circle": "Viser dagens nivå som et lite tall sentrert inni ringen.",
  "editor.helper_numeric_value_raw": "Viser den rå målingen (konsentrasjon / indeks) i stedet for det beregnede nivået som numerisk verdi. Gjelder bare for integrasjoner som rapporterer en rå verdi (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Overstyr innebygde oversatte tekster.",
  "editor.icon_color_custom": "Egendefinert farge",
  "editor.icon_color_inherit": "Arv fra diagram",
  "editor.icon_color_mode": "Ikonfargemodus",
  "editor.icon_color_picker": "Velg ikonfarge",
  "editor.icon_in_ring": "Vis allergenikon inni ringen",
  "editor.icon_in_ring_color_follow": "Følg nivåfarge",
  "editor.icon_in_ring_color_mode": "Fargemodus for midtikon",
  "editor.icon_in_ring_color_static": "Statisk farge",
  "editor.icon_in_ring_header": "Ikon i ring",
  "editor.icon_in_ring_size_ratio": "Ikonstørrelse (andel av ringhullet)",
  "editor.icon_in_ring_static_color": "Statisk farge",
  "editor.icon_size": "Ikonstørrelse (px)",
  "editor.index_top": "Indeks øverst i listen",
  "editor.integration": "Integrasjon",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Vis rå verdi (konsentrasjon)",
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
  "editor.phrases_full.graminales": "Gress",
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
  "editor.phrases_full.sweet_chestnut": "Edelkastanje",
  "editor.phrases_full.tree_of_heaven": "Gudetre",
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
  "editor.phrases_levels5.0": "Ingen pollen",
  "editor.phrases_levels5.1": "Lave nivåer",
  "editor.phrases_levels5.2": "Moderat nivå",
  "editor.phrases_levels5.3": "Høye nivåer",
  "editor.phrases_levels5.4": "Svært høye nivåer",
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
  "editor.phrases_short.graminales": "Gress",
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
  "editor.phrases_short.sweet_chestnut": "Kast",
  "editor.phrases_short.tree_of_heaven": "Gude",
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
  "editor.preset_reset_section": "Tilbakestill seksjon",
  "editor.region_id": "Region-ID",
  "editor.select_all_allergens": "Velg alle allergener",
  "editor.select_all_pollen": "Velg pollen",
  "editor.select_all_pollution": "Velg luftkvalitet",
  "editor.show_allergen_column": "Vis allergenkolonne",
  "editor.show_block_separator": "Vis separator mellom blokker",
  "editor.show_empty_days": "Vis tomme dager",
  "editor.show_google_attribution": "Vis Google-attribusjon",
  "editor.show_no_data_distinct": 'Vis "ingen data" med tydelig (uklar) stil',
  "editor.show_summary_block": "Vis sammendragsblokk",
  "editor.show_summary_plants_in_season": "Vis planter i sesong",
  "editor.show_summary_row": "Vis også de detaljerte allergenradene (krever aktivert sammendrag)",
  "editor.show_summary_separator": "Vis en skillelinje mellom sammendraget og de detaljerte radene",
  "editor.show_summary_top_types": "Vis de dominerende pollentypene",
  "editor.show_text_allergen": "Vis tekst, allergen",
  "editor.show_value_numeric": "Vis tallverdi",
  "editor.show_value_numeric_in_circle": "Vis tallverdi inni ringen",
  "editor.show_value_text": "Vis verdi som tekst",
  "editor.show_version": "Logg versjon til konsollen",
  "editor.sort": "Sortering",
  "editor.sort_category_allergens_first": "Sorter kategori-allergener øverst",
  "editor.sort_name_ascending": "navn, stigende",
  "editor.sort_name_descending": "navn, synkende",
  "editor.sort_none": "ingen (konfigurasjonsrekkefølge)",
  "editor.sort_pollution_block": "Gruppér luftkvalitet separat",
  "editor.sort_value_ascending": "verdi, stigende",
  "editor.sort_value_descending": "verdi, synkende",
  "editor.subgroup_day_labels": "Dagetiketter",
  "editor.subgroup_source": "Kilde",
  "editor.subgroup_title": "Tittel",
  "editor.subgroup_values": "Verdier vist per dag",
  "editor.summary_advanced": "Avansert",
  "editor.summary_allergen_icons": "Allergenikoner",
  "editor.summary_allergens": "Allergener",
  "editor.summary_badge_appearance": "Merke-utseende",
  "editor.summary_badge_content": "Merkeinnhold",
  "editor.summary_badge_interactivity": "Interaksjoner",
  "editor.summary_card_appearance": "Utseende",
  "editor.summary_card_interactivity": "Interaksjoner",
  "editor.summary_card_layout": "Oppsett",
  "editor.summary_day_display": "Dagvisning",
  "editor.summary_entity_prefix_suffix": "Egendefinert prefiks og suffiks",
  "editor.summary_icon_in_ring": "Ikon i ring",
  "editor.summary_integration_and_place": "Integrasjon og sted",
  "editor.summary_level_circles": "Nivå-sirkler",
  "editor.summary_minimal": "Minimal",
  "editor.summary_translation_and_strings": "Oversettelse og strenger",
  "editor.tap_action": "Trykkhandling",
  "editor.tap_action_enable": "Aktiver trykkhandling",
  "editor.tap_action_entity": "Entitet",
  "editor.tap_action_more_info_needs_entity": "Denne handlingen krever en entitet; uten en gjør den ingenting.",
  "editor.tap_action_navigate_needs_path": "Denne handlingen krever en navigasjonssti; uten en gjør den ingenting.",
  "editor.tap_action_call_service_needs_service": "Denne handlingen krever en gyldig id på formen domain.service; uten en gjør den ingenting.",
  "editor.tap_action_navigation_path": "Navigasjonssti",
  "editor.tap_action_service": "Tjeneste (f.eks. light.turn_on)",
  "editor.tap_action_service_data": "Tjenestedata (JSON)",
  "editor.tap_action_type": "Handlingstype",
  "editor.tap_action_type_call_service": "Utfør handling",
  "editor.tap_action_type_more_info": "Mer info",
  "editor.tap_action_type_navigate": "Naviger",
  "editor.text_size_ratio": "Tekststørrelsesforhold (%)",
  "editor.title": "Korttittel",
  "editor.title_automatic": "Automatisk tittel",
  "editor.title_hide": "Skjul tittel",
  "editor.title_placeholder": "(automatisk)",
  "editor.to_show_columns": "Antall kolonner som vises",
  "editor.to_show_days": "Antall dager som vises",
  "editor.to_show_hours": "Antall timer som vises"
}, rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tl
}, Symbol.toStringTag, { value: "Module" })), ol = {
  "card.allergen.alder": "Olcha",
  "card.allergen.allergy_risk": "Ryzyko alergii",
  "card.allergen.ash": "Jesion",
  "card.allergen.beech": "Buk",
  "card.allergen.birch": "Brzoza",
  "card.allergen.chenopod": "Chenopod",
  "card.allergen.cypress": "Cyprys",
  "card.allergen.elm": "Wiąz",
  "card.allergen.goosefoot": "Komosa",
  "card.allergen.graminales": "Trawy",
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
  "card.allergen.plantain": "Babka",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Poaceae",
  "card.allergen.poplar": "Topola",
  "card.allergen.qualite_globale": "Jakość powietrza",
  "card.allergen.ragweed": "Ambrozja",
  "card.allergen.rye": "Żyto",
  "card.allergen.so2": "Dwutlenek siarki",
  "card.allergen.sorrel": "Szczaw",
  "card.allergen.sweet_chestnut": "Kasztan jadalny",
  "card.allergen.tree_of_heaven": "Bożodrzew",
  "card.allergen.trees": "Drzewa",
  "card.allergen.trees_cat": "Drzewa i krzewy",
  "card.allergen.weeds": "Chwasty",
  "card.allergen.weeds_cat": "Chwasty",
  "card.allergen.willow": "Wierzba",
  "card.atmo.event": "Zdarzenie",
  "card.atmo.unavailable": "Niedostępne",
  "card.days.0": "Dziś",
  "card.days.1": "Jutro",
  "card.days.2": "Pojutrze",
  "card.error": "Brak sensorów pyłków. Czy masz zainstalowaną właściwą integrację i wybrałeś region w konfiguracji karty?",
  "card.error_entity_unavailable": "Encja pogodowa jest niedostępna. Integracja może być offline lub uruchamiana ponownie.",
  "card.error_filtered_sensors": "Żaden sensor nie pasuje do filtrów. Sprawdź wybrane alergeny i ich wartości progowe.",
  "card.error_location_not_found": "Brak lokalizacji. Sprawdź jej nazwę w konfiguracji karty.",
  "card.error_no_sensors": "Brak sensorów pyłków. Czy masz zainstalowaną właściwą integrację i wybrałeś region w konfiguracji karty?",
  "card.header_no_location": "Prognoza pylenia",
  "card.header_prefix": "Prognoza pylenia dla",
  "card.index.very_low": "Bardzo niski poziom",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Brak pylenia",
  "card.levels5.1": "Niski poziom",
  "card.levels5.2": "Średni poziom",
  "card.levels5.3": "Wysoki poziom",
  "card.levels5.4": "Bardzo wysoki poziom",
  "card.loading_forecast": "Odczyt prognozy...",
  "card.location.plu": "Luksemburg",
  "card.no_allergens": "Brak alergenów",
  "card.no_information": "(Brak informacji)",
  "card.stale_allergen": "Brak danych",
  "card.stale_data": "Dane o pyłkach są tymczasowo niedostępne",
  "card.stale_data_subtitle": "Dostawca nie zwraca obecnie danych dla tego regionu",
  "card.summary.in_season_label": "W sezonie",
  "card.summary.top_label": "Wiodące",
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
  "editor.badge_content_aggregate": "Ogólne ryzyko",
  "editor.badge_content_row": "Kilka (wiersz)",
  "editor.badge_content_single": "Jeden alergen",
  "editor.badge_content_worst": "Najwyższy poziom pyłków",
  "editor.badge_label_content": "Etykieta pokazuje",
  "editor.badge_label_content_allergen": "Nazwa alergenu",
  "editor.badge_label_content_allergen_level": "Nazwa alergenu i poziom",
  "editor.badge_label_content_level": "Poziom pyłków",
  "editor.badge_label_position": "Pozycja etykiety",
  "editor.badge_label_position_below": "Poniżej",
  "editor.badge_label_position_right": "Po prawej",
  "editor.badge_scale": "Rozmiar odznaki (skala)",
  "editor.badge_icon_scale": "Skala ikony",
  "editor.badge_show_label": "Pokaż etykietę",
  "editor.badge_single_allergen": "Alergen",
  "editor.badge_version": "Wersja odznaki Pollenprognos",
  "editor.badge_visual_icon_in_ring": "Ikona w okręgu",
  "editor.badge_visual_icon_only": "Tylko ikona",
  "editor.badge_visual_ring_empty": "Pusty okrąg",
  "editor.badge_visual_ring_value": "Okrąg z wartością",
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
  "editor.entity_weather": "Encja pogody (tylko SILAM)",
  "editor.entity_weather_placeholder": "np. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Debugowanie i informacje o wersji. Większość użytkowników tego nie potrzebuje.",
  "editor.helper_allergen_icons": "Wygląd ikon alergenów (lewa kolumna lub wewnątrz okręgu).",
  "editor.helper_allergen_levels_gap_synced": "Gdy włączone, szerokość odstępu podąża za grubością linii alergenu (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Grubość linii ikony alergenu. Steruje także odstępem w okręgu poziomu, gdy tryb dziedziczenia jest aktywny (zobacz Okręgi poziomu).",
  "editor.helper_allergens": "Które alergeny są wyświetlane, próg i kolejność sortowania.",
  "editor.helper_badge_appearance": "Rozmiar odznaki, tło i etykieta.",
  "editor.helper_badge_content": "Co pokazuje odznaka.",
  "editor.helper_badge_interactivity": "Co się dzieje, gdy użytkownik dotyka odznaki lub alergenu.",
  "editor.helper_card_appearance": "Tło i ogólny rozmiar karty.",
  "editor.helper_card_interactivity": "Co się dzieje, gdy użytkownik dotyka karty lub alergenu.",
  "editor.helper_card_layout": "Tryb kompaktowy (minimalny) i widoczne kolumny.",
  "editor.helper_day_display": "Co pojawia się w każdej kolumnie dnia: wartości i etykiety.",
  "editor.helper_icon_in_ring": "Wyświetla ikonę alergenu na środku okręgu poziomu.",
  "editor.helper_integration_and_place": "Integracja źródłowa, lokalizacja i tytuł karty.",
  "editor.helper_level_circles": "Wykres pierścieniowy wokół każdego alergenu pokazujący dzisiejszy poziom pyłków.",
  "editor.helper_levels_gap_synced": "Sterowane grubością linii alergenu, gdy synchronizacja jest włączona. Wyłącz synchronizację, aby edytować.",
  "editor.helper_levels_gap_unsynced": "Odstęp między segmentami okręgu poziomu.",
  "editor.helper_minimal": "Układ kompaktowy: tylko ikony, bez nazw alergenów i wartości.",
  "editor.helper_minimal_gap": "Odstęp między ikonami alergenów w trybie minimalnym.",
  "editor.helper_show_allergen_column": "Pokaż lewą kolumnę z nazwami alergenów.",
  "editor.helper_show_value_numeric_in_circle": "Wyświetla poziom dnia jako małą liczbę na środku okręgu.",
  "editor.helper_numeric_value_raw": "Wyświetla surowy pomiar (stężenie / indeks) zamiast obliczonego poziomu jako wartość numeryczną. Dotyczy tylko integracji raportujących surową wartość (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Zastąp wbudowane przetłumaczone teksty.",
  "editor.icon_color_custom": "Kolor własny",
  "editor.icon_color_inherit": "Dziedzicz z wykresu",
  "editor.icon_color_mode": "Tryb koloru ikon",
  "editor.icon_color_picker": "Wybierz kolor ikony",
  "editor.icon_in_ring": "Pokaż ikonę alergenu wewnątrz okręgu",
  "editor.icon_in_ring_color_follow": "Zgodnie z kolorem poziomu",
  "editor.icon_in_ring_color_mode": "Tryb koloru ikony środkowej",
  "editor.icon_in_ring_color_static": "Kolor statyczny",
  "editor.icon_in_ring_header": "Ikona w okręgu",
  "editor.icon_in_ring_size_ratio": "Rozmiar ikony (część otworu okręgu)",
  "editor.icon_in_ring_static_color": "Kolor statyczny",
  "editor.icon_size": "Rozmiar ikony (px)",
  "editor.index_top": "Indeks na górze listy",
  "editor.integration": "Integracja",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Pokaż surową wartość (stężenie)",
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
  "editor.phrases_full.graminales": "Trawy",
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
  "editor.phrases_full.plantain": "Babka",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Poaceae",
  "editor.phrases_full.poplar": "Topola",
  "editor.phrases_full.qualite_globale": "Jakość powietrza",
  "editor.phrases_full.ragweed": "Ambrozja",
  "editor.phrases_full.rye": "Żyto",
  "editor.phrases_full.so2": "Dwutlenek siarki",
  "editor.phrases_full.sorrel": "Szczaw",
  "editor.phrases_full.sweet_chestnut": "Kasztan jadalny",
  "editor.phrases_full.tree_of_heaven": "Bożodrzew",
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
  "editor.phrases_levels5.0": "Brak pyłków",
  "editor.phrases_levels5.1": "Niskie poziomy",
  "editor.phrases_levels5.2": "Średnie poziomy",
  "editor.phrases_levels5.3": "Wysokie poziomy",
  "editor.phrases_levels5.4": "Bardzo wysokie poziomy",
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
  "editor.phrases_short.graminales": "Trawy",
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
  "editor.phrases_short.plantain": "Babka",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Poaceae",
  "editor.phrases_short.poplar": "Topola",
  "editor.phrases_short.qualite_globale": "IJP",
  "editor.phrases_short.ragweed": "Ambrozja",
  "editor.phrases_short.rye": "Żyto",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Szczaw",
  "editor.phrases_short.sweet_chestnut": "Kasztan",
  "editor.phrases_short.tree_of_heaven": "Bożodrz",
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
  "editor.preset_reset_section": "Przywróć sekcję",
  "editor.region_id": "ID regionu",
  "editor.select_all_allergens": "Wybierz wszystkie alergeny",
  "editor.select_all_pollen": "Wybierz pyłek",
  "editor.select_all_pollution": "Wybierz jakość powietrza",
  "editor.show_allergen_column": "Pokaż kolumnę alergenów",
  "editor.show_block_separator": "Pokaż separator między blokami",
  "editor.show_empty_days": "Pokaż puste dni",
  "editor.show_google_attribution": "Pokaż atrybucję Google",
  "editor.show_no_data_distinct": 'Pokaż "brak danych" z wyraźnym (rozmytym) stylem',
  "editor.show_summary_block": "Pokaż blok podsumowania",
  "editor.show_summary_plants_in_season": "Pokaż rośliny w sezonie",
  "editor.show_summary_row": "Pokaż też szczegółowe wiersze alergenów (wymaga włączonego podsumowania)",
  "editor.show_summary_separator": "Pokaż separator między podsumowaniem a szczegółowymi wierszami",
  "editor.show_summary_top_types": "Pokaż dominujące typy pyłków",
  "editor.show_text_allergen": "Pokaż tekst i alergen",
  "editor.show_value_numeric": "Pokaż wartość numeryczną",
  "editor.show_value_numeric_in_circle": "Pokaż wartość liczbową wewnątrz okręgu",
  "editor.show_value_text": "Pokaż wartość tekstową",
  "editor.show_version": "Wyślij wersję na konsolę",
  "editor.sort": "Sortowanie",
  "editor.sort_category_allergens_first": "Kategorie alergenów na górę listy",
  "editor.sort_name_ascending": "Nazwa, rosnąco",
  "editor.sort_name_descending": "Nazwa, malejąco",
  "editor.sort_none": "brak (kolejność konfiguracyjna)",
  "editor.sort_pollution_block": "Grupuj zanieczyszczenia oddzielnie",
  "editor.sort_value_ascending": "Wartość, rosnąco",
  "editor.sort_value_descending": "Wartość, malejąco",
  "editor.subgroup_day_labels": "Etykiety dni",
  "editor.subgroup_source": "Źródło",
  "editor.subgroup_title": "Tytuł",
  "editor.subgroup_values": "Wartości pokazywane dziennie",
  "editor.summary_advanced": "Zaawansowane",
  "editor.summary_allergen_icons": "Ikony alergenów",
  "editor.summary_allergens": "Alergeny",
  "editor.summary_badge_appearance": "Wygląd odznaki",
  "editor.summary_badge_content": "Zawartość odznaki",
  "editor.summary_badge_interactivity": "Interakcje",
  "editor.summary_card_appearance": "Wygląd",
  "editor.summary_card_interactivity": "Interakcje",
  "editor.summary_card_layout": "Układ",
  "editor.summary_day_display": "Widok dnia",
  "editor.summary_entity_prefix_suffix": "Własny prefiks i sufiks",
  "editor.summary_icon_in_ring": "Ikona w okręgu",
  "editor.summary_integration_and_place": "Integracja i miejsce",
  "editor.summary_level_circles": "Okręgi poziomu",
  "editor.summary_minimal": "Minimalny",
  "editor.summary_translation_and_strings": "Tłumaczenie i teksty",
  "editor.tap_action": "Akcja kliknięcia",
  "editor.tap_action_enable": "Aktywuj akcję kliknięcia",
  "editor.tap_action_entity": "Encja",
  "editor.tap_action_more_info_needs_entity": "Ta akcja wymaga encji; bez niej nic nie robi.",
  "editor.tap_action_navigate_needs_path": "Ta akcja wymaga ścieżki nawigacji; bez niej nic nie robi.",
  "editor.tap_action_call_service_needs_service": "Ta akcja wymaga poprawnego identyfikatora w formacie domain.service; bez niego nic nie robi.",
  "editor.tap_action_navigation_path": "Ścieżka nawigacji",
  "editor.tap_action_service": "Usługa (np. light.turn_on)",
  "editor.tap_action_service_data": "Dane usługi (JSON)",
  "editor.tap_action_type": "Typ akcji",
  "editor.tap_action_type_call_service": "Wywołaj usługę",
  "editor.tap_action_type_more_info": "Więcej informacji",
  "editor.tap_action_type_navigate": "Nawiguj",
  "editor.text_size_ratio": "Współczynnik wielkości tekstu (%)",
  "editor.title": "Tytuł karty",
  "editor.title_automatic": "Tytuł automatycznie",
  "editor.title_hide": "Ukryj tytuł",
  "editor.title_placeholder": "(automatycznie)",
  "editor.to_show_columns": "Pokż kolumny",
  "editor.to_show_days": "Pokaż dni",
  "editor.to_show_hours": "Pokaż godziny"
}, al = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ol
}, Symbol.toStringTag, { value: "Module" })), il = {
  "card.allergen.alder": "Ольха",
  "card.allergen.allergy_risk": "Риск аллергии",
  "card.allergen.ash": "Ясень",
  "card.allergen.beech": "Бук",
  "card.allergen.birch": "Берёза",
  "card.allergen.chenopod": "Марь",
  "card.allergen.cypress": "Кипарис",
  "card.allergen.elm": "Вяз",
  "card.allergen.goosefoot": "Марь белая",
  "card.allergen.graminales": "Травы",
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
  "card.allergen.plantain": "Подорожник",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Злаки",
  "card.allergen.poplar": "Тополь",
  "card.allergen.qualite_globale": "Качество воздуха",
  "card.allergen.ragweed": "Амброзия",
  "card.allergen.rye": "Рожь",
  "card.allergen.so2": "Диоксид серы",
  "card.allergen.sorrel": "Щавель",
  "card.allergen.sweet_chestnut": "Каштан",
  "card.allergen.tree_of_heaven": "Айлант",
  "card.allergen.trees": "Деревья",
  "card.allergen.trees_cat": "Деревья",
  "card.allergen.weeds": "Сорняки",
  "card.allergen.weeds_cat": "Сорняки",
  "card.allergen.willow": "Ива",
  "card.atmo.event": "Событие",
  "card.atmo.unavailable": "Недоступно",
  "card.days.0": "Сегодня",
  "card.days.1": "Завтра",
  "card.days.2": "Послезавтра",
  "card.error": "Датчики пыльцы не найдены. Установлена ли нужная интеграция и выбран ли регион в настройках карточки?",
  "card.error_entity_unavailable": "Погодная сущность недоступна. Интеграция может быть отключена или перезапускается.",
  "card.error_filtered_sensors": "Нет датчиков, соответствующих фильтрам. Проверьте выбранные аллергены и порог.",
  "card.error_location_not_found": "Местоположение не найдено. Проверьте название местоположения в конфигурации карты.",
  "card.error_no_sensors": "Датчики пыльцы не найдены. Установлена ли нужная интеграция и выбран ли регион в настройках карточки?",
  "card.header_no_location": "Прогноз пыльцы",
  "card.header_prefix": "Прогноз пыльцы для",
  "card.index.very_low": "Очень низкий уровень",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Нет пыльцы",
  "card.levels5.1": "Низкий уровень",
  "card.levels5.2": "Умеренный уровень",
  "card.levels5.3": "Высокий уровень",
  "card.levels5.4": "Очень высокий уровень",
  "card.loading_forecast": "Загрузка прогноза...",
  "card.location.plu": "Люксембург",
  "card.no_allergens": "Нет аллергенов",
  "card.no_information": "(Нет информации)",
  "card.stale_allergen": "Нет данных",
  "card.stale_data": "Данные о пыльце временно недоступны",
  "card.stale_data_subtitle": "Поставщик в настоящее время не возвращает данные для этого региона",
  "card.summary.in_season_label": "В сезоне",
  "card.summary.top_label": "Ведущие",
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
  "editor.badge_content_aggregate": "Общий риск",
  "editor.badge_content_row": "Несколько (ряд)",
  "editor.badge_content_single": "Один аллерген",
  "editor.badge_content_worst": "Самый высокий уровень пыльцы",
  "editor.badge_label_content": "Подпись показывает",
  "editor.badge_label_content_allergen": "Название аллергена",
  "editor.badge_label_content_allergen_level": "Название аллергена и уровень",
  "editor.badge_label_content_level": "Уровень пыльцы",
  "editor.badge_label_position": "Положение подписи",
  "editor.badge_label_position_below": "Снизу",
  "editor.badge_label_position_right": "Справа",
  "editor.badge_scale": "Размер значка (масштаб)",
  "editor.badge_icon_scale": "Масштаб значка",
  "editor.badge_show_label": "Показывать подпись",
  "editor.badge_single_allergen": "Аллерген",
  "editor.badge_version": "Версия значка прогноза пыльцы",
  "editor.badge_visual_icon_in_ring": "Иконка в круге",
  "editor.badge_visual_icon_only": "Только иконка",
  "editor.badge_visual_ring_empty": "Пустой круг",
  "editor.badge_visual_ring_value": "Круг со значением",
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
  "editor.entity_weather": "Объект погоды (только SILAM)",
  "editor.entity_weather_placeholder": "напр. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Отладка и информация о версии. Большинству пользователей это не нужно.",
  "editor.helper_allergen_icons": "Оформление иконок аллергенов (левый столбец или внутри круга).",
  "editor.helper_allergen_levels_gap_synced": "Когда включено, ширина зазора следует толщине линии аллергена (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Толщина линии иконки аллергена. Также управляет зазором круга уровня, когда активен режим наследования (см. Круги уровней).",
  "editor.helper_allergens": "Какие аллергены отображать, порог и порядок сортировки.",
  "editor.helper_badge_appearance": "Размер значка, фон и подпись.",
  "editor.helper_badge_content": "Что отображает значок.",
  "editor.helper_badge_interactivity": "Что происходит, когда пользователь нажимает на значок или аллерген.",
  "editor.helper_card_appearance": "Фон и общий размер карточки.",
  "editor.helper_card_interactivity": "Что происходит, когда пользователь нажимает на карточку или аллерген.",
  "editor.helper_card_layout": "Компактный (минимальный) режим и видимые столбцы.",
  "editor.helper_day_display": "Что отображается в каждом столбце дня: значения и подписи.",
  "editor.helper_icon_in_ring": "Показывать иконку аллергена по центру круга уровня.",
  "editor.helper_integration_and_place": "Исходная интеграция, местоположение и заголовок карточки.",
  "editor.helper_level_circles": "Кольцевая диаграмма вокруг каждого аллергена, показывающая сегодняшний уровень пыльцы.",
  "editor.helper_levels_gap_synced": "Определяется толщиной линии аллергена, пока включена синхронизация. Отключите синхронизацию для редактирования.",
  "editor.helper_levels_gap_unsynced": "Зазор между сегментами круга уровня.",
  "editor.helper_minimal": "Компактный макет: только иконки, без названий аллергенов и значений.",
  "editor.helper_minimal_gap": "Расстояние между иконками аллергенов в минимальном режиме.",
  "editor.helper_show_allergen_column": "Показывать левый столбец с названиями аллергенов.",
  "editor.helper_show_value_numeric_in_circle": "Отображает уровень дня в виде небольшого числа по центру круга.",
  "editor.helper_numeric_value_raw": "Отображает исходное измерение (концентрация / индекс) вместо вычисленного уровня как числовое значение. Применяется только к интеграциям, которые сообщают исходное значение (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Переопределить встроенные локализованные фразы.",
  "editor.icon_color_custom": "Пользовательский цвет",
  "editor.icon_color_inherit": "Наследовать из диаграммы",
  "editor.icon_color_mode": "Режим цвета иконки",
  "editor.icon_color_picker": "Выбрать цвет иконки",
  "editor.icon_in_ring": "Показывать иконку аллергена внутри круга",
  "editor.icon_in_ring_color_follow": "Следовать цвету уровня",
  "editor.icon_in_ring_color_mode": "Режим цвета центральной иконки",
  "editor.icon_in_ring_color_static": "Статичный цвет",
  "editor.icon_in_ring_header": "Иконка в круге",
  "editor.icon_in_ring_size_ratio": "Размер иконки (доля отверстия круга)",
  "editor.icon_in_ring_static_color": "Статичный цвет",
  "editor.icon_size": "Размер значка (пикс.)",
  "editor.index_top": "Индекс вверху списка",
  "editor.integration": "Интеграция",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Показать исходное значение (концентрация)",
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
  "editor.phrases_full.graminales": "Травы",
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
  "editor.phrases_full.plantain": "Подорожник",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Злаки",
  "editor.phrases_full.poplar": "Тополь",
  "editor.phrases_full.qualite_globale": "Качество воздуха",
  "editor.phrases_full.ragweed": "Амброзия",
  "editor.phrases_full.rye": "Рожь",
  "editor.phrases_full.so2": "Диоксид серы",
  "editor.phrases_full.sorrel": "Щавель",
  "editor.phrases_full.sweet_chestnut": "Каштан",
  "editor.phrases_full.tree_of_heaven": "Айлант",
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
  "editor.phrases_levels5.0": "Нет пыльцы",
  "editor.phrases_levels5.1": "Низкий уровень",
  "editor.phrases_levels5.2": "Умеренный уровень",
  "editor.phrases_levels5.3": "Высокий уровень",
  "editor.phrases_levels5.4": "Очень высокий уровень",
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
  "editor.phrases_short.graminales": "Травы",
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
  "editor.phrases_short.plantain": "Подор",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Злаки",
  "editor.phrases_short.poplar": "Топол",
  "editor.phrases_short.qualite_globale": "ИКВ",
  "editor.phrases_short.ragweed": "Амбр.",
  "editor.phrases_short.rye": "Рожь",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Щав",
  "editor.phrases_short.sweet_chestnut": "Кашт",
  "editor.phrases_short.tree_of_heaven": "Айлан",
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
  "editor.preset_reset_section": "Сбросить раздел",
  "editor.region_id": "ID региона",
  "editor.select_all_allergens": "Выбрать все аллергены",
  "editor.select_all_pollen": "Выбрать пыльцу",
  "editor.select_all_pollution": "Выбрать качество воздуха",
  "editor.show_allergen_column": "Показывать столбец аллергенов",
  "editor.show_block_separator": "Показать разделитель между блоками",
  "editor.show_empty_days": "Показывать пустые дни",
  "editor.show_google_attribution": "Показывать указание источника Google",
  "editor.show_no_data_distinct": 'Показывать "нет данных" с выраженным (размытым) стилем',
  "editor.show_summary_block": "Показать блок сводки",
  "editor.show_summary_plants_in_season": "Показать растения в сезоне",
  "editor.show_summary_row": "Показывать также подробные строки аллергенов (требует включённой сводки)",
  "editor.show_summary_separator": "Показать разделитель между сводкой и подробными строками",
  "editor.show_summary_top_types": "Показать ведущие типы пыльцы",
  "editor.show_text_allergen": "Показывать название аллергена",
  "editor.show_value_numeric": "Показывать числовое значение",
  "editor.show_value_numeric_in_circle": "Показывать числовое значение внутри круга",
  "editor.show_value_text": "Показывать значение как текст",
  "editor.show_version": "Логировать версию в консоль",
  "editor.sort": "Сортировка",
  "editor.sort_category_allergens_first": "Сортировать аллергены категорий сверху",
  "editor.sort_name_ascending": "имя, по возрастанию",
  "editor.sort_name_descending": "имя, по убыванию",
  "editor.sort_none": "нет (порядок конфигурации)",
  "editor.sort_pollution_block": "Группировать загрязнение отдельно",
  "editor.sort_value_ascending": "значение, по возрастанию",
  "editor.sort_value_descending": "значение, по убыванию",
  "editor.subgroup_day_labels": "Подписи дней",
  "editor.subgroup_source": "Источник",
  "editor.subgroup_title": "Заголовок",
  "editor.subgroup_values": "Значения, отображаемые за день",
  "editor.summary_advanced": "Дополнительно",
  "editor.summary_allergen_icons": "Иконки аллергенов",
  "editor.summary_allergens": "Аллергены",
  "editor.summary_badge_appearance": "Внешний вид значка",
  "editor.summary_badge_content": "Содержимое значка",
  "editor.summary_badge_interactivity": "Взаимодействия",
  "editor.summary_card_appearance": "Внешний вид",
  "editor.summary_card_interactivity": "Взаимодействия",
  "editor.summary_card_layout": "Макет",
  "editor.summary_day_display": "Отображение дней",
  "editor.summary_entity_prefix_suffix": "Пользовательский префикс и суффикс",
  "editor.summary_icon_in_ring": "Иконка в круге",
  "editor.summary_integration_and_place": "Интеграция и место",
  "editor.summary_level_circles": "Круги уровней",
  "editor.summary_minimal": "Минимальный",
  "editor.summary_translation_and_strings": "Перевод и строки",
  "editor.tap_action": "Действие при нажатии",
  "editor.tap_action_enable": "Включить действие при нажатии",
  "editor.tap_action_entity": "Объект",
  "editor.tap_action_more_info_needs_entity": "Для этого действия нужен объект; без него оно ничего не делает.",
  "editor.tap_action_navigate_needs_path": "Для этого действия нужен путь навигации; без него оно ничего не делает.",
  "editor.tap_action_call_service_needs_service": "Для этого действия нужен корректный идентификатор вида domain.service; без него оно ничего не делает.",
  "editor.tap_action_navigation_path": "Путь навигации",
  "editor.tap_action_service": "Действие (напр. light.turn_on)",
  "editor.tap_action_service_data": "Данные действия (JSON)",
  "editor.tap_action_type": "Тип действия",
  "editor.tap_action_type_call_service": "Выполнить действие",
  "editor.tap_action_type_more_info": "Подробнее",
  "editor.tap_action_type_navigate": "Перейти",
  "editor.text_size_ratio": "Соотношение размера текста (%)",
  "editor.title": "Заголовок карточки",
  "editor.title_automatic": "Автоматический заголовок",
  "editor.title_hide": "Скрыть заголовок",
  "editor.title_placeholder": "(автоматически)",
  "editor.to_show_columns": "Столбцов для показа",
  "editor.to_show_days": "Дней для показа",
  "editor.to_show_hours": "Часов для показа"
}, nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: il
}, Symbol.toStringTag, { value: "Module" })), ll = {
  "card.allergen.alder": "Jelša",
  "card.allergen.allergy_risk": "Riziko alergie",
  "card.allergen.ash": "Jaseň",
  "card.allergen.beech": "Buk",
  "card.allergen.birch": "Breza",
  "card.allergen.chenopod": "Laskavec",
  "card.allergen.cypress": "Cyprus",
  "card.allergen.elm": "Brest",
  "card.allergen.goosefoot": "Láskavec biely",
  "card.allergen.graminales": "Trávy",
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
  "card.allergen.plantain": "Skorocel",
  "card.allergen.pm10": "PM10",
  "card.allergen.pm25": "PM2,5",
  "card.allergen.poaceae": "Trávy",
  "card.allergen.poplar": "Topoľ",
  "card.allergen.qualite_globale": "Kvalita ovzdušia",
  "card.allergen.ragweed": "Ambrozia",
  "card.allergen.rye": "Raž",
  "card.allergen.so2": "Oxid siričitý",
  "card.allergen.sorrel": "Šťavel",
  "card.allergen.sweet_chestnut": "Gaštan jedlý",
  "card.allergen.tree_of_heaven": "Pajaseň",
  "card.allergen.trees": "Stromy",
  "card.allergen.trees_cat": "Stromy",
  "card.allergen.weeds": "Buriny",
  "card.allergen.weeds_cat": "Buriny",
  "card.allergen.willow": "Vŕba",
  "card.atmo.event": "Udalosť",
  "card.atmo.unavailable": "Nedostupné",
  "card.days.0": "Dnes",
  "card.days.1": "Zajtra",
  "card.days.2": "Pozajtra",
  "card.error": "Žiadne peľové senzory nenájdené. Je nainštalovaná správna integrácia a zvolený región v nastavení karty?",
  "card.error_entity_unavailable": "Meteorologická entita nie je dostupná. Integrácia môže byť offline alebo sa reštartuje.",
  "card.error_filtered_sensors": "Žiadne senzory nezodpovedajú filtrom. Skontrolujte zvolené alergény a prah.",
  "card.error_location_not_found": "Umiestnenie sa nenašlo. Skontrolujte názov umiestnenia v konfigurácii karty.",
  "card.error_no_sensors": "Žiadne peľové senzory nenájdené. Je nainštalovaná správna integrácia a zvolený región v nastavení karty?",
  "card.header_no_location": "Peľová predpoveď",
  "card.header_prefix": "Peľová predpoveď pre",
  "card.index.very_low": "Veľmi nízke úrovne",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Žiadny peľ",
  "card.levels5.1": "Nízke úrovne",
  "card.levels5.2": "Stredné úrovne",
  "card.levels5.3": "Vysoké úrovne",
  "card.levels5.4": "Veľmi vysoké úrovne",
  "card.loading_forecast": "Načítava sa predpoveď...",
  "card.location.plu": "Luxembursko",
  "card.no_allergens": "Žiadne alergény",
  "card.no_information": "(Žiadne informácie)",
  "card.stale_allergen": "Žiadne údaje",
  "card.stale_data": "Peľové údaje sú dočasne nedostupné",
  "card.stale_data_subtitle": "Poskytovateľ momentálne neposkytuje údaje pre tento región",
  "card.summary.in_season_label": "V sezóne",
  "card.summary.top_label": "Najviac",
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
  "editor.badge_content_aggregate": "Celkové riziko",
  "editor.badge_content_row": "Niekoľko (riadok)",
  "editor.badge_content_single": "Jeden alergén",
  "editor.badge_content_worst": "Najvyššia úroveň peľu",
  "editor.badge_label_content": "Popis zobrazuje",
  "editor.badge_label_content_allergen": "Názov alergénu",
  "editor.badge_label_content_allergen_level": "Názov alergénu a úroveň",
  "editor.badge_label_content_level": "Úroveň peľu",
  "editor.badge_label_position": "Umiestnenie popisu",
  "editor.badge_label_position_below": "Pod",
  "editor.badge_label_position_right": "Vpravo",
  "editor.badge_scale": "Veľkosť odznaku (mierka)",
  "editor.badge_icon_scale": "Mierka ikony",
  "editor.badge_show_label": "Zobraziť popis",
  "editor.badge_single_allergen": "Alergén",
  "editor.badge_version": "Verzia odznaku peľovej predpovede",
  "editor.badge_visual_icon_in_ring": "Ikona v kruhu",
  "editor.badge_visual_icon_only": "Iba ikona",
  "editor.badge_visual_ring_empty": "Prázdny kruh",
  "editor.badge_visual_ring_value": "Kruh s hodnotou",
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
  "editor.entity_weather": "Entita počasia (iba SILAM)",
  "editor.entity_weather_placeholder": "napr. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Ladenie a informácie o verzii. Väčšina používateľov to nepotrebuje.",
  "editor.helper_allergen_icons": "Vzhľad ikon alergénov (ľavý stĺpec alebo vnútri kruhu).",
  "editor.helper_allergen_levels_gap_synced": "Keď je zapnuté, šírka medzery sleduje hrúbku čiary alergénu (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Hrúbka čiary ikony alergénu. Keď je aktívny režim dedenia, riadi aj medzeru v kruhu úrovní (pozri Kruhy úrovní).",
  "editor.helper_allergens": "Ktoré alergény sa zobrazia, prah a poradie zoradenia.",
  "editor.helper_badge_appearance": "Veľkosť odznaku, pozadie a popis.",
  "editor.helper_badge_content": "Čo odznak zobrazuje.",
  "editor.helper_badge_interactivity": "Čo sa stane, keď používateľ klepne na odznak alebo alergén.",
  "editor.helper_card_appearance": "Pozadie a celková veľkosť karty.",
  "editor.helper_card_interactivity": "Čo sa stane, keď používateľ klepne na kartu alebo alergén.",
  "editor.helper_card_layout": "Kompaktný (minimálny) režim a ktoré stĺpce sú viditeľné.",
  "editor.helper_day_display": "Čo sa zobrazuje v každom stĺpci dňa: hodnoty a popisy.",
  "editor.helper_icon_in_ring": "Zobrazí ikonu alergénu v strede kruhu úrovní.",
  "editor.helper_integration_and_place": "Zdrojová integrácia, poloha a názov karty.",
  "editor.helper_level_circles": "Kruhový graf okolo každého alergénu zobrazujúci dnešnú úroveň peľu.",
  "editor.helper_levels_gap_synced": "Riadené hrúbkou čiary alergénu, kým je synchronizácia zapnutá. Na úpravu synchronizáciu vypnite.",
  "editor.helper_levels_gap_unsynced": "Medzera medzi segmentmi kruhu úrovní.",
  "editor.helper_minimal": "Kompaktné rozloženie: iba ikony, bez názvov alergénov a hodnôt.",
  "editor.helper_minimal_gap": "Rozostup medzi ikonami alergénov v minimálnom režime.",
  "editor.helper_show_allergen_column": "Zobraziť ľavý stĺpec s názvami alergénov.",
  "editor.helper_show_value_numeric_in_circle": "Zobrazí úroveň dňa ako malé číslo v strede kruhu.",
  "editor.helper_numeric_value_raw": "Zobrazuje surové meranie (koncentrácia / index) namiesto vypočítanej úrovne ako číselnú hodnotu. Platí len pre integrácie, ktoré hlásia surovú hodnotu (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Prepísať vstavané lokalizované frázy.",
  "editor.icon_color_custom": "Vlastná farba",
  "editor.icon_color_inherit": "Dediť z grafu",
  "editor.icon_color_mode": "Režim farby ikony",
  "editor.icon_color_picker": "Vybrať farbu ikony",
  "editor.icon_in_ring": "Zobraziť ikonu alergénu vnútri kruhu",
  "editor.icon_in_ring_color_follow": "Podľa farby úrovne",
  "editor.icon_in_ring_color_mode": "Režim farby stredovej ikony",
  "editor.icon_in_ring_color_static": "Statická farba",
  "editor.icon_in_ring_header": "Ikona v kruhu",
  "editor.icon_in_ring_size_ratio": "Veľkosť ikony (podiel otvoru kruhu)",
  "editor.icon_in_ring_static_color": "Statická farba",
  "editor.icon_size": "Veľkosť ikony (px)",
  "editor.index_top": "Index navrchu zoznamu",
  "editor.integration": "Integrácia",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Zobraziť surovú hodnotu (koncentrácia)",
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
  "editor.phrases_full.graminales": "Trávy",
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
  "editor.phrases_full.plantain": "Skorocel",
  "editor.phrases_full.pm10": "PM10",
  "editor.phrases_full.pm25": "PM2,5",
  "editor.phrases_full.poaceae": "Trávy",
  "editor.phrases_full.poplar": "Topoľ",
  "editor.phrases_full.qualite_globale": "Kvalita ovzdušia",
  "editor.phrases_full.ragweed": "Ambrozia",
  "editor.phrases_full.rye": "Raž",
  "editor.phrases_full.so2": "Oxid siričitý",
  "editor.phrases_full.sorrel": "Šťavel",
  "editor.phrases_full.sweet_chestnut": "Gaštan jedlý",
  "editor.phrases_full.tree_of_heaven": "Pajaseň",
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
  "editor.phrases_levels5.0": "Žiadny peľ",
  "editor.phrases_levels5.1": "Nízke úrovne",
  "editor.phrases_levels5.2": "Stredné úrovne",
  "editor.phrases_levels5.3": "Vysoké úrovne",
  "editor.phrases_levels5.4": "Veľmi vysoké úrovne",
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
  "editor.phrases_short.graminales": "Trávy",
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
  "editor.phrases_short.plantain": "Skor",
  "editor.phrases_short.pm10": "PM10",
  "editor.phrases_short.pm25": "PM2,5",
  "editor.phrases_short.poaceae": "Trávy",
  "editor.phrases_short.poplar": "Topoľ",
  "editor.phrases_short.qualite_globale": "IKO",
  "editor.phrases_short.ragweed": "Ambr.",
  "editor.phrases_short.rye": "Raž",
  "editor.phrases_short.so2": "SO₂",
  "editor.phrases_short.sorrel": "Šťav",
  "editor.phrases_short.sweet_chestnut": "Gašt",
  "editor.phrases_short.tree_of_heaven": "Pajas",
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
  "editor.preset_reset_section": "Obnoviť sekciu",
  "editor.region_id": "ID regiónu",
  "editor.select_all_allergens": "Vybrať všetky alergény",
  "editor.select_all_pollen": "Vybrať peľ",
  "editor.select_all_pollution": "Vybrať kvalitu ovzdušia",
  "editor.show_allergen_column": "Zobraziť stĺpec alergénov",
  "editor.show_block_separator": "Zobraziť oddeľovač medzi blokmi",
  "editor.show_empty_days": "Zobraziť prázdne dni",
  "editor.show_google_attribution": "Zobraziť uvedenie zdroja Google",
  "editor.show_no_data_distinct": 'Zobraziť "žiadne údaje" s výrazným (rozmazaným) štýlom',
  "editor.show_summary_block": "Zobraziť súhrnný blok",
  "editor.show_summary_plants_in_season": "Zobraziť rastliny v sezóne",
  "editor.show_summary_row": "Zobraziť aj podrobné riadky alergénov (vyžaduje zapnutý súhrn)",
  "editor.show_summary_separator": "Zobraziť oddeľovač medzi súhrnom a podrobnými riadkami",
  "editor.show_summary_top_types": "Zobraziť najčastejšie typy peľu",
  "editor.show_text_allergen": "Zobraziť text, alergén",
  "editor.show_value_numeric": "Zobraziť číselnú hodnotu",
  "editor.show_value_numeric_in_circle": "Zobraziť číselnú hodnotu vnútri kruhu",
  "editor.show_value_text": "Zobraziť hodnotu ako text",
  "editor.show_version": "Zapisovať verziu do konzoly",
  "editor.sort": "Triedenie",
  "editor.sort_category_allergens_first": "Zoradiť kategórie alergénov navrch",
  "editor.sort_name_ascending": "názov, vzostupne",
  "editor.sort_name_descending": "názov, zostupne",
  "editor.sort_none": "žiadne (poradie konfigurácie)",
  "editor.sort_pollution_block": "Zoskupiť znečistenie oddelene",
  "editor.sort_value_ascending": "hodnota, vzostupne",
  "editor.sort_value_descending": "hodnota, zostupne",
  "editor.subgroup_day_labels": "Popisy dní",
  "editor.subgroup_source": "Zdroj",
  "editor.subgroup_title": "Názov",
  "editor.subgroup_values": "Hodnoty zobrazené za deň",
  "editor.summary_advanced": "Pokročilé",
  "editor.summary_allergen_icons": "Ikony alergénov",
  "editor.summary_allergens": "Alergény",
  "editor.summary_badge_appearance": "Vzhľad odznaku",
  "editor.summary_badge_content": "Obsah odznaku",
  "editor.summary_badge_interactivity": "Interakcie",
  "editor.summary_card_appearance": "Vzhľad",
  "editor.summary_card_interactivity": "Interakcie",
  "editor.summary_card_layout": "Rozloženie",
  "editor.summary_day_display": "Zobrazenie dní",
  "editor.summary_entity_prefix_suffix": "Vlastný prefix a suffix",
  "editor.summary_icon_in_ring": "Ikona v kruhu",
  "editor.summary_integration_and_place": "Integrácia a miesto",
  "editor.summary_level_circles": "Kruhy úrovní",
  "editor.summary_minimal": "Minimálny",
  "editor.summary_translation_and_strings": "Preklad a reťazce",
  "editor.tap_action": "Akcia na klepnutie",
  "editor.tap_action_enable": "Povoliť akciu na klepnutie",
  "editor.tap_action_entity": "Entita",
  "editor.tap_action_more_info_needs_entity": "Táto akcia vyžaduje entitu; bez nej nič neurobí.",
  "editor.tap_action_navigate_needs_path": "Táto akcia vyžaduje navigačnú cestu; bez nej nič neurobí.",
  "editor.tap_action_call_service_needs_service": "Táto akcia vyžaduje platné id v tvare domain.service; bez neho nič neurobí.",
  "editor.tap_action_navigation_path": "Navigačná cesta",
  "editor.tap_action_service": "Akcia (napr. light.turn_on)",
  "editor.tap_action_service_data": "Dáta akcie (JSON)",
  "editor.tap_action_type": "Typ akcie",
  "editor.tap_action_type_call_service": "Vykonať akciu",
  "editor.tap_action_type_more_info": "Viac informácií",
  "editor.tap_action_type_navigate": "Navigovať",
  "editor.text_size_ratio": "Pomer veľkosti textu (%)",
  "editor.title": "Názov karty",
  "editor.title_automatic": "Automatický názov",
  "editor.title_hide": "Skryť názov",
  "editor.title_placeholder": "(automaticky)",
  "editor.to_show_columns": "Počet stĺpcov na zobrazenie",
  "editor.to_show_days": "Počet dní na zobrazenie",
  "editor.to_show_hours": "Počet hodín na zobrazenie"
}, sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ll
}, Symbol.toStringTag, { value: "Module" })), dl = {
  "card.allergen.alder": "Al",
  "card.allergen.allergy_risk": "Allergirisk",
  "card.allergen.ash": "Ask",
  "card.allergen.beech": "Bok",
  "card.allergen.birch": "Björk",
  "card.allergen.chenopod": "Svinmålla",
  "card.allergen.cypress": "Cypress",
  "card.allergen.elm": "Alm",
  "card.allergen.goosefoot": "Målla",
  "card.allergen.graminales": "Gräs",
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
  "card.allergen.sweet_chestnut": "Äkta kastanj",
  "card.allergen.tree_of_heaven": "Gudaträd",
  "card.allergen.trees": "Träd",
  "card.allergen.trees_cat": "Träd",
  "card.allergen.weeds": "Ogräs",
  "card.allergen.weeds_cat": "Ogräs",
  "card.allergen.willow": "Sälg och viden",
  "card.atmo.event": "Händelse",
  "card.atmo.unavailable": "Otillgänglig",
  "card.days.0": "Idag",
  "card.days.1": "Imorgon",
  "card.days.2": "I övermorgon",
  "card.error": "Inga pollen-sensorer hittades. Har du installerat rätt integration och valt region i kortets konfiguration?",
  "card.error_entity_unavailable": "Väderentiteten är inte tillgänglig. Integrationen kan vara offline eller omstartar.",
  "card.error_filtered_sensors": "Inga sensorer matchar din filtrering. Kontrollera valda allergener och tröskel.",
  "card.error_location_not_found": "Platsen hittades inte. Kontrollera platsnamnet i kortkonfigurationen.",
  "card.error_no_sensors": "Inga pollen-sensorer hittades. Har du installerat rätt integration och valt region i kortets konfiguration?",
  "card.header_no_location": "Pollenprognos",
  "card.header_prefix": "Pollenprognos för",
  "card.index.very_low": "Mycket låga halter",
  "card.integration.atmo": "Atmo France",
  "card.integration.dwd": "DWD Pollenflug",
  "card.integration.gp": "Google Pollen",
  "card.integration.gpl": "Google Pollen Levels",
  "card.integration.kleenex": "Kleenex Pollen Radar",
  "card.integration.msw": "MeteoSwiss Pollen",
  "card.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "card.levels5.0": "Ingen pollen",
  "card.levels5.1": "Låga halter",
  "card.levels5.2": "Måttliga halter",
  "card.levels5.3": "Höga halter",
  "card.levels5.4": "Mycket höga halter",
  "card.loading_forecast": "Laddar prognos...",
  "card.location.plu": "Luxemburg",
  "card.no_allergens": "Inga allergener",
  "card.no_information": "(Ingen information)",
  "card.stale_allergen": "Inga data",
  "card.stale_data": "Pollendata är tillfälligt otillgänglig",
  "card.stale_data_subtitle": "Leverantören returnerar för närvarande inga data för denna region",
  "card.summary.in_season_label": "I säsong",
  "card.summary.top_label": "Mest",
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
  "editor.badge_content_aggregate": "Samlad risk",
  "editor.badge_content_row": "Flera (rad)",
  "editor.badge_content_single": "En allergen",
  "editor.badge_content_worst": "Högst pollenhalt",
  "editor.badge_label_content": "Etiketten visar",
  "editor.badge_label_content_allergen": "Allergennamn",
  "editor.badge_label_content_allergen_level": "Allergennamn och nivå",
  "editor.badge_label_content_level": "Pollennivå",
  "editor.badge_label_position": "Etikettens placering",
  "editor.badge_label_position_below": "Under",
  "editor.badge_label_position_right": "Höger",
  "editor.badge_scale": "Märkesstorlek (skala)",
  "editor.badge_icon_scale": "Ikonskala",
  "editor.badge_show_label": "Visa etikett",
  "editor.badge_single_allergen": "Allergen",
  "editor.badge_version": "Version av pollenprognosmärket",
  "editor.badge_visual_icon_in_ring": "Ikon i ring",
  "editor.badge_visual_icon_only": "Bara ikon",
  "editor.badge_visual_ring_empty": "Tom ring",
  "editor.badge_visual_ring_value": "Ring med värde",
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
  "editor.entity_weather": "Vädersensor (endast SILAM)",
  "editor.entity_weather_placeholder": "t.ex. weather.silam_pollen_stockholm_forecast",
  "editor.helper_advanced": "Felsökning och versionsinformation. De flesta behöver inte detta.",
  "editor.helper_allergen_icons": "Utseende på allergenikoner (vänsterkolumn eller inuti ringen).",
  "editor.helper_allergen_levels_gap_synced": "När aktivt följer mellanrummet allergenets linjetjocklek (round(sw / 30)).",
  "editor.helper_allergen_stroke_width": "Linjetjocklek på allergenikonen. Styr också mellanrummet i nivåcirkeln när arvsläget är aktivt (se Nivåcirklar).",
  "editor.helper_allergens": "Vilka allergener som visas, tröskel och sorteringsordning.",
  "editor.helper_badge_appearance": "Märkestorlek, bakgrund och etikett.",
  "editor.helper_badge_content": "Vad märket visar.",
  "editor.helper_badge_interactivity": "Vad som händer när användaren trycker på märket eller ett allergen.",
  "editor.helper_card_appearance": "Bakgrund och kortets övergripande storlek.",
  "editor.helper_card_interactivity": "Vad som händer när användaren trycker på kortet eller ett allergen.",
  "editor.helper_card_layout": "Kompakt (minimalt) läge och vilka kolumner som visas.",
  "editor.helper_day_display": "Vad som visas i varje dagkolumn: värden och etiketter.",
  "editor.helper_icon_in_ring": "Rendera allergenikonen centrerad inuti nivåcirkeln.",
  "editor.helper_integration_and_place": "Källintegration, plats och kortets rubrik.",
  "editor.helper_level_circles": "Ringdiagram runt varje allergen som visar dagens pollennivå.",
  "editor.helper_levels_gap_synced": "Styrs av allergenets linjetjocklek medan synkronisering är på. Stäng av synk för att redigera.",
  "editor.helper_levels_gap_unsynced": "Mellanrum mellan nivåringsegmenten.",
  "editor.helper_minimal": "Kompakt layout: endast ikoner, inga allergennamn eller värden.",
  "editor.helper_minimal_gap": "Avstånd mellan allergenikoner i minimalt läge.",
  "editor.helper_show_allergen_column": "Visa vänsterkolumnen med allergennamn.",
  "editor.helper_show_value_numeric_in_circle": "Visar dagens nivå som ett litet tal centrerat inuti ringen.",
  "editor.helper_numeric_value_raw": "Visar råmätvärdet (koncentration / index) istället för den beräknade nivån som numeriskt värde. Gäller enbart integrationer som rapporterar ett råvärde (Pollen.lu, Polleninformation, SILAM, Kleenex).",
  "editor.helper_translation_and_strings": "Åsidosätt inbyggda lokaliserade fraser.",
  "editor.icon_color_custom": "Anpassad färg",
  "editor.icon_color_inherit": "Ärv från diagram",
  "editor.icon_color_mode": "Ikonfärgläge",
  "editor.icon_color_picker": "Välj ikonfärg",
  "editor.icon_in_ring": "Visa allergenikon i ringen",
  "editor.icon_in_ring_color_follow": "Följ nivåfärg",
  "editor.icon_in_ring_color_mode": "Färgläge för centrumikon",
  "editor.icon_in_ring_color_static": "Statisk färg",
  "editor.icon_in_ring_header": "Ikon i ring",
  "editor.icon_in_ring_size_ratio": "Ikonstorlek (andel av ringhål)",
  "editor.icon_in_ring_static_color": "Statisk färg",
  "editor.icon_size": "Ikonstorlek (px)",
  "editor.index_top": "Index överst i listan",
  "editor.integration": "Integration",
  "editor.integration.atmo": "Atmo France",
  "editor.integration.dwd": "DWD Pollenflug",
  "editor.integration.gp": "Google Pollen",
  "editor.integration.gpl": "Google Pollen Levels",
  "editor.integration.kleenex": "Kleenex Pollen Radar",
  "editor.integration.msw": "MeteoSwiss Pollen",
  "editor.integration.irmkmi": "IRM KMI (meteo.be)",
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
  "editor.numeric_value_raw": "Visa råvärde (koncentration)",
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
  "editor.phrases_full.ash": "Ask",
  "editor.phrases_full.beech": "Bok",
  "editor.phrases_full.birch": "Björk",
  "editor.phrases_full.chenopod": "Svinmålla",
  "editor.phrases_full.cypress": "Cypress",
  "editor.phrases_full.elm": "Alm",
  "editor.phrases_full.goosefoot": "Målla",
  "editor.phrases_full.graminales": "Gräs",
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
  "editor.phrases_full.sweet_chestnut": "Äkta kastanj",
  "editor.phrases_full.tree_of_heaven": "Gudaträd",
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
  "editor.phrases_levels5.0": "Ingen pollen",
  "editor.phrases_levels5.1": "Låga halter",
  "editor.phrases_levels5.2": "Måttliga halter",
  "editor.phrases_levels5.3": "Höga halter",
  "editor.phrases_levels5.4": "Mycket höga halter",
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
  "editor.phrases_short.graminales": "Gräs",
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
  "editor.phrases_short.sweet_chestnut": "Kast",
  "editor.phrases_short.tree_of_heaven": "Gudatr",
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
  "editor.preset_reset_section": "Återställ avsnitt",
  "editor.region_id": "Region ID",
  "editor.select_all_allergens": "Välj alla allergener",
  "editor.select_all_pollen": "Välj pollen",
  "editor.select_all_pollution": "Välj luftkvalitet",
  "editor.show_allergen_column": "Visa allergenkolumn",
  "editor.show_block_separator": "Visa separator mellan block",
  "editor.show_empty_days": "Visa tomma dagar",
  "editor.show_google_attribution": "Visa Google-attribution",
  "editor.show_no_data_distinct": 'Visa "inga data" med distinkt (luddig) stil',
  "editor.show_summary_block": "Visa sammanfattningsblock",
  "editor.show_summary_plants_in_season": "Visa växter i säsong",
  "editor.show_summary_row": "Visa även de detaljerade allergenraderna (kräver att sammanfattningen är aktiverad)",
  "editor.show_summary_separator": "Visa en avskiljare mellan sammanfattningen och de detaljerade raderna",
  "editor.show_summary_top_types": "Visa dominerande pollentyper",
  "editor.show_text_allergen": "Visa text, allergen",
  "editor.show_value_numeric": "Visa värde, numeriskt",
  "editor.show_value_numeric_in_circle": "Visa numeriskt värde inuti ringen",
  "editor.show_value_text": "Visa värde, text",
  "editor.show_version": "Logga version i konsolen",
  "editor.sort": "Sortering",
  "editor.sort_category_allergens_first": "Sortera kategoriallergener överst",
  "editor.sort_name_ascending": "namn, stigande",
  "editor.sort_name_descending": "namn, fallande",
  "editor.sort_none": "ingen (konfigurationsordning)",
  "editor.sort_pollution_block": "Gruppera luftkvalitet separat",
  "editor.sort_value_ascending": "värde, stigande",
  "editor.sort_value_descending": "värde, fallande",
  "editor.subgroup_day_labels": "Dagsetiketter",
  "editor.subgroup_source": "Källa",
  "editor.subgroup_title": "Rubrik",
  "editor.subgroup_values": "Värden som visas per dag",
  "editor.summary_advanced": "Avancerat",
  "editor.summary_allergen_icons": "Allergenikoner",
  "editor.summary_allergens": "Allergener",
  "editor.summary_badge_appearance": "Märkets utseende",
  "editor.summary_badge_content": "Märkesinnehåll",
  "editor.summary_badge_interactivity": "Interaktioner",
  "editor.summary_card_appearance": "Utseende",
  "editor.summary_card_interactivity": "Interaktioner",
  "editor.summary_card_layout": "Layout",
  "editor.summary_day_display": "Dagvisning",
  "editor.summary_entity_prefix_suffix": "Eget prefix och suffix",
  "editor.summary_icon_in_ring": "Ikon i ring",
  "editor.summary_integration_and_place": "Integration och plats",
  "editor.summary_level_circles": "Nivåcirklar",
  "editor.summary_minimal": "Minimal",
  "editor.summary_translation_and_strings": "Översättning och texter",
  "editor.tap_action": "Tryckåtgärd",
  "editor.tap_action_enable": "Aktivera tryckåtgärd",
  "editor.tap_action_entity": "Entitet",
  "editor.tap_action_more_info_needs_entity": "Den här åtgärden kräver en entitet; utan en gör den ingenting.",
  "editor.tap_action_navigate_needs_path": "Den här åtgärden kräver en navigeringssökväg; utan en gör den ingenting.",
  "editor.tap_action_call_service_needs_service": "Den här åtgärden kräver ett giltigt id på formen domain.service; utan ett gör den ingenting.",
  "editor.tap_action_navigation_path": "Navigeringssökväg",
  "editor.tap_action_service": "Tjänst (t.ex. light.turn_on)",
  "editor.tap_action_service_data": "Tjänstedata (JSON)",
  "editor.tap_action_type": "Åtgärdstyp",
  "editor.tap_action_type_call_service": "Anropa tjänst",
  "editor.tap_action_type_more_info": "Mer information",
  "editor.tap_action_type_navigate": "Navigera",
  "editor.text_size_ratio": "Textstorlek (%)",
  "editor.title": "Rubrik på kortet",
  "editor.title_automatic": "Automatisk rubrik",
  "editor.title_hide": "Göm rubrik",
  "editor.title_placeholder": "(automatisk)",
  "editor.to_show_columns": "Antal kolumner som visas",
  "editor.to_show_days": "Antal dagar som visas",
  "editor.to_show_hours": "Antal timmar som visas"
}, cl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dl
}, Symbol.toStringTag, { value: "Module" }));
var ho = function(e, t) {
  return ho = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, o) {
    r.__proto__ = o;
  } || function(r, o) {
    for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (r[a] = o[a]);
  }, ho(e, t);
};
function jr(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  ho(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var le = function() {
  return le = Object.assign || function(t) {
    for (var r, o = 1, a = arguments.length; o < a; o++) {
      r = arguments[o];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, le.apply(this, arguments);
};
function _l(e, t) {
  var r = {};
  for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, o = Object.getOwnPropertySymbols(e); a < o.length; a++)
      t.indexOf(o[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[a]) && (r[o[a]] = e[o[a]]);
  return r;
}
function ao(e, t, r) {
  if (r || arguments.length === 2) for (var o = 0, a = t.length, i; o < a; o++)
    (i || !(o in t)) && (i || (i = Array.prototype.slice.call(t, 0, o)), i[o] = t[o]);
  return e.concat(i || Array.prototype.slice.call(t));
}
function io(e, t) {
  var r = t && t.cache ? t.cache : vl, o = t && t.serializer ? t.serializer : ml, a = t && t.strategy ? t.strategy : gl;
  return a(e, {
    cache: r,
    serializer: o
  });
}
function ul(e) {
  return e == null || typeof e == "number" || typeof e == "boolean";
}
function hl(e, t, r, o) {
  var a = ul(o) ? o : r(o), i = t.get(a);
  return typeof i > "u" && (i = e.call(this, o), t.set(a, i)), i;
}
function Ya(e, t, r) {
  var o = Array.prototype.slice.call(arguments, 3), a = r(o), i = t.get(a);
  return typeof i > "u" && (i = e.apply(this, o), t.set(a, i)), i;
}
function Ja(e, t, r, o, a) {
  return r.bind(t, e, o, a);
}
function gl(e, t) {
  var r = e.length === 1 ? hl : Ya;
  return Ja(e, this, r, t.cache.create(), t.serializer);
}
function pl(e, t) {
  return Ja(e, this, Ya, t.cache.create(), t.serializer);
}
var ml = function() {
  return JSON.stringify(arguments);
}, fl = (
  /** @class */
  (function() {
    function e() {
      this.cache = /* @__PURE__ */ Object.create(null);
    }
    return e.prototype.get = function(t) {
      return this.cache[t];
    }, e.prototype.set = function(t, r) {
      this.cache[t] = r;
    }, e;
  })()
), vl = {
  create: function() {
    return new fl();
  }
}, no = {
  variadic: pl
}, oe;
(function(e) {
  e[e.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e[e.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e[e.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e[e.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e[e.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e[e.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e[e.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e[e.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e[e.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e[e.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e[e.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e[e.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e[e.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e[e.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e[e.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e[e.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e[e.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e[e.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e[e.INVALID_TAG = 23] = "INVALID_TAG", e[e.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e[e.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e[e.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
})(oe || (oe = {}));
var he;
(function(e) {
  e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag";
})(he || (he = {}));
var xt;
(function(e) {
  e[e.number = 0] = "number", e[e.dateTime = 1] = "dateTime";
})(xt || (xt = {}));
function ua(e) {
  return e.type === he.literal;
}
function yl(e) {
  return e.type === he.argument;
}
function Xa(e) {
  return e.type === he.number;
}
function ei(e) {
  return e.type === he.date;
}
function ti(e) {
  return e.type === he.time;
}
function ri(e) {
  return e.type === he.select;
}
function oi(e) {
  return e.type === he.plural;
}
function bl(e) {
  return e.type === he.pound;
}
function ai(e) {
  return e.type === he.tag;
}
function ii(e) {
  return !!(e && typeof e == "object" && e.type === xt.number);
}
function go(e) {
  return !!(e && typeof e == "object" && e.type === xt.dateTime);
}
var ni = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, wl = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
function kl(e) {
  var t = {};
  return e.replace(wl, function(r) {
    var o = r.length;
    switch (r[0]) {
      // Era
      case "G":
        t.era = o === 4 ? "long" : o === 5 ? "narrow" : "short";
        break;
      // Year
      case "y":
        t.year = o === 2 ? "2-digit" : "numeric";
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
        t.month = ["numeric", "2-digit", "short", "long", "narrow"][o - 1];
        break;
      // Week
      case "w":
      case "W":
        throw new RangeError("`w/W` (week) patterns are not supported");
      case "d":
        t.day = ["numeric", "2-digit"][o - 1];
        break;
      case "D":
      case "F":
      case "g":
        throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
      // Weekday
      case "E":
        t.weekday = o === 4 ? "long" : o === 5 ? "narrow" : "short";
        break;
      case "e":
        if (o < 4)
          throw new RangeError("`e..eee` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][o - 4];
        break;
      case "c":
        if (o < 4)
          throw new RangeError("`c..ccc` (weekday) patterns are not supported");
        t.weekday = ["short", "long", "narrow", "short"][o - 4];
        break;
      // Period
      case "a":
        t.hour12 = !0;
        break;
      case "b":
      // am, pm, noon, midnight
      case "B":
        throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
      // Hour
      case "h":
        t.hourCycle = "h12", t.hour = ["numeric", "2-digit"][o - 1];
        break;
      case "H":
        t.hourCycle = "h23", t.hour = ["numeric", "2-digit"][o - 1];
        break;
      case "K":
        t.hourCycle = "h11", t.hour = ["numeric", "2-digit"][o - 1];
        break;
      case "k":
        t.hourCycle = "h24", t.hour = ["numeric", "2-digit"][o - 1];
        break;
      case "j":
      case "J":
      case "C":
        throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
      // Minute
      case "m":
        t.minute = ["numeric", "2-digit"][o - 1];
        break;
      // Second
      case "s":
        t.second = ["numeric", "2-digit"][o - 1];
        break;
      case "S":
      case "A":
        throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
      // Zone
      case "z":
        t.timeZoneName = o < 4 ? "short" : "long";
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
  }), t;
}
var xl = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
function Sl(e) {
  if (e.length === 0)
    throw new Error("Number skeleton cannot be empty");
  for (var t = e.split(xl).filter(function(u) {
    return u.length > 0;
  }), r = [], o = 0, a = t; o < a.length; o++) {
    var i = a[o], l = i.split("/");
    if (l.length === 0)
      throw new Error("Invalid number skeleton");
    for (var n = l[0], s = l.slice(1), d = 0, _ = s; d < _.length; d++) {
      var c = _[d];
      if (c.length === 0)
        throw new Error("Invalid number skeleton");
    }
    r.push({ stem: n, options: s });
  }
  return r;
}
function zl(e) {
  return e.replace(/^(.*?)-/, "");
}
var ha = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, li = /^(@+)?(\+|#+)?[rs]?$/g, Al = /(\*)(0+)|(#+)(0+)|(0+)/g, si = /^(0+)$/;
function ga(e) {
  var t = {};
  return e[e.length - 1] === "r" ? t.roundingPriority = "morePrecision" : e[e.length - 1] === "s" && (t.roundingPriority = "lessPrecision"), e.replace(li, function(r, o, a) {
    return typeof a != "string" ? (t.minimumSignificantDigits = o.length, t.maximumSignificantDigits = o.length) : a === "+" ? t.minimumSignificantDigits = o.length : o[0] === "#" ? t.maximumSignificantDigits = o.length : (t.minimumSignificantDigits = o.length, t.maximumSignificantDigits = o.length + (typeof a == "string" ? a.length : 0)), "";
  }), t;
}
function di(e) {
  switch (e) {
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
function $l(e) {
  var t;
  if (e[0] === "E" && e[1] === "E" ? (t = {
    notation: "engineering"
  }, e = e.slice(2)) : e[0] === "E" && (t = {
    notation: "scientific"
  }, e = e.slice(1)), t) {
    var r = e.slice(0, 2);
    if (r === "+!" ? (t.signDisplay = "always", e = e.slice(2)) : r === "+?" && (t.signDisplay = "exceptZero", e = e.slice(2)), !si.test(e))
      throw new Error("Malformed concise eng/scientific notation");
    t.minimumIntegerDigits = e.length;
  }
  return t;
}
function pa(e) {
  var t = {}, r = di(e);
  return r || t;
}
function Pl(e) {
  for (var t = {}, r = 0, o = e; r < o.length; r++) {
    var a = o[r];
    switch (a.stem) {
      case "percent":
      case "%":
        t.style = "percent";
        continue;
      case "%x100":
        t.style = "percent", t.scale = 100;
        continue;
      case "currency":
        t.style = "currency", t.currency = a.options[0];
        continue;
      case "group-off":
      case ",_":
        t.useGrouping = !1;
        continue;
      case "precision-integer":
      case ".":
        t.maximumFractionDigits = 0;
        continue;
      case "measure-unit":
      case "unit":
        t.style = "unit", t.unit = zl(a.options[0]);
        continue;
      case "compact-short":
      case "K":
        t.notation = "compact", t.compactDisplay = "short";
        continue;
      case "compact-long":
      case "KK":
        t.notation = "compact", t.compactDisplay = "long";
        continue;
      case "scientific":
        t = le(le(le({}, t), { notation: "scientific" }), a.options.reduce(function(s, d) {
          return le(le({}, s), pa(d));
        }, {}));
        continue;
      case "engineering":
        t = le(le(le({}, t), { notation: "engineering" }), a.options.reduce(function(s, d) {
          return le(le({}, s), pa(d));
        }, {}));
        continue;
      case "notation-simple":
        t.notation = "standard";
        continue;
      // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
      case "unit-width-narrow":
        t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
        continue;
      case "unit-width-short":
        t.currencyDisplay = "code", t.unitDisplay = "short";
        continue;
      case "unit-width-full-name":
        t.currencyDisplay = "name", t.unitDisplay = "long";
        continue;
      case "unit-width-iso-code":
        t.currencyDisplay = "symbol";
        continue;
      case "scale":
        t.scale = parseFloat(a.options[0]);
        continue;
      case "rounding-mode-floor":
        t.roundingMode = "floor";
        continue;
      case "rounding-mode-ceiling":
        t.roundingMode = "ceil";
        continue;
      case "rounding-mode-down":
        t.roundingMode = "trunc";
        continue;
      case "rounding-mode-up":
        t.roundingMode = "expand";
        continue;
      case "rounding-mode-half-even":
        t.roundingMode = "halfEven";
        continue;
      case "rounding-mode-half-down":
        t.roundingMode = "halfTrunc";
        continue;
      case "rounding-mode-half-up":
        t.roundingMode = "halfExpand";
        continue;
      // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
      case "integer-width":
        if (a.options.length > 1)
          throw new RangeError("integer-width stems only accept a single optional option");
        a.options[0].replace(Al, function(s, d, _, c, u, h) {
          if (d)
            t.minimumIntegerDigits = _.length;
          else {
            if (c && u)
              throw new Error("We currently do not support maximum integer digits");
            if (h)
              throw new Error("We currently do not support exact integer digits");
          }
          return "";
        });
        continue;
    }
    if (si.test(a.stem)) {
      t.minimumIntegerDigits = a.stem.length;
      continue;
    }
    if (ha.test(a.stem)) {
      if (a.options.length > 1)
        throw new RangeError("Fraction-precision stems only accept a single optional option");
      a.stem.replace(ha, function(s, d, _, c, u, h) {
        return _ === "*" ? t.minimumFractionDigits = d.length : c && c[0] === "#" ? t.maximumFractionDigits = c.length : u && h ? (t.minimumFractionDigits = u.length, t.maximumFractionDigits = u.length + h.length) : (t.minimumFractionDigits = d.length, t.maximumFractionDigits = d.length), "";
      });
      var i = a.options[0];
      i === "w" ? t = le(le({}, t), { trailingZeroDisplay: "stripIfInteger" }) : i && (t = le(le({}, t), ga(i)));
      continue;
    }
    if (li.test(a.stem)) {
      t = le(le({}, t), ga(a.stem));
      continue;
    }
    var l = di(a.stem);
    l && (t = le(le({}, t), l));
    var n = $l(a.stem);
    n && (t = le(le({}, t), n));
  }
  return t;
}
var gr = {
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
function Ml(e, t) {
  for (var r = "", o = 0; o < e.length; o++) {
    var a = e.charAt(o);
    if (a === "j") {
      for (var i = 0; o + 1 < e.length && e.charAt(o + 1) === a; )
        i++, o++;
      var l = 1 + (i & 1), n = i < 2 ? 1 : 3 + (i >> 1), s = "a", d = Cl(t);
      for ((d == "H" || d == "k") && (n = 0); n-- > 0; )
        r += s;
      for (; l-- > 0; )
        r = d + r;
    } else a === "J" ? r += "H" : r += a;
  }
  return r;
}
function Cl(e) {
  var t = e.hourCycle;
  if (t === void 0 && // @ts-ignore hourCycle(s) is not identified yet
  e.hourCycles && // @ts-ignore
  e.hourCycles.length && (t = e.hourCycles[0]), t)
    switch (t) {
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
  var r = e.language, o;
  r !== "root" && (o = e.maximize().region);
  var a = gr[o || ""] || gr[r || ""] || gr["".concat(r, "-001")] || gr["001"];
  return a[0];
}
var lo, El = new RegExp("^".concat(ni.source, "*")), Ll = new RegExp("".concat(ni.source, "*$"));
function ie(e, t) {
  return { start: e, end: t };
}
var Il = !!String.prototype.startsWith && "_a".startsWith("a", 1), Tl = !!String.fromCodePoint, Nl = !!Object.fromEntries, jl = !!String.prototype.codePointAt, Rl = !!String.prototype.trimStart, Dl = !!String.prototype.trimEnd, Ol = !!Number.isSafeInteger, Bl = Ol ? Number.isSafeInteger : function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e && Math.abs(e) <= 9007199254740991;
}, po = !0;
try {
  var Gl = _i("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  po = ((lo = Gl.exec("a")) === null || lo === void 0 ? void 0 : lo[0]) === "a";
} catch {
  po = !1;
}
var ma = Il ? (
  // Native
  function(t, r, o) {
    return t.startsWith(r, o);
  }
) : (
  // For IE11
  function(t, r, o) {
    return t.slice(o, o + r.length) === r;
  }
), mo = Tl ? String.fromCodePoint : (
  // IE11
  function() {
    for (var t = [], r = 0; r < arguments.length; r++)
      t[r] = arguments[r];
    for (var o = "", a = t.length, i = 0, l; a > i; ) {
      if (l = t[i++], l > 1114111)
        throw RangeError(l + " is not a valid code point");
      o += l < 65536 ? String.fromCharCode(l) : String.fromCharCode(((l -= 65536) >> 10) + 55296, l % 1024 + 56320);
    }
    return o;
  }
), fa = (
  // native
  Nl ? Object.fromEntries : (
    // Ponyfill
    function(t) {
      for (var r = {}, o = 0, a = t; o < a.length; o++) {
        var i = a[o], l = i[0], n = i[1];
        r[l] = n;
      }
      return r;
    }
  )
), ci = jl ? (
  // Native
  function(t, r) {
    return t.codePointAt(r);
  }
) : (
  // IE 11
  function(t, r) {
    var o = t.length;
    if (!(r < 0 || r >= o)) {
      var a = t.charCodeAt(r), i;
      return a < 55296 || a > 56319 || r + 1 === o || (i = t.charCodeAt(r + 1)) < 56320 || i > 57343 ? a : (a - 55296 << 10) + (i - 56320) + 65536;
    }
  }
), Hl = Rl ? (
  // Native
  function(t) {
    return t.trimStart();
  }
) : (
  // Ponyfill
  function(t) {
    return t.replace(El, "");
  }
), Kl = Dl ? (
  // Native
  function(t) {
    return t.trimEnd();
  }
) : (
  // Ponyfill
  function(t) {
    return t.replace(Ll, "");
  }
);
function _i(e, t) {
  return new RegExp(e, t);
}
var fo;
if (po) {
  var va = _i("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
  fo = function(t, r) {
    var o;
    va.lastIndex = r;
    var a = va.exec(t);
    return (o = a[1]) !== null && o !== void 0 ? o : "";
  };
} else
  fo = function(t, r) {
    for (var o = []; ; ) {
      var a = ci(t, r);
      if (a === void 0 || ui(a) || Wl(a))
        break;
      o.push(a), r += a >= 65536 ? 2 : 1;
    }
    return mo.apply(void 0, o);
  };
var Fl = (
  /** @class */
  (function() {
    function e(t, r) {
      r === void 0 && (r = {}), this.message = t, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!r.ignoreTag, this.locale = r.locale, this.requiresOtherClause = !!r.requiresOtherClause, this.shouldParseSkeletons = !!r.shouldParseSkeletons;
    }
    return e.prototype.parse = function() {
      if (this.offset() !== 0)
        throw Error("parser can only be used once");
      return this.parseMessage(0, "", !1);
    }, e.prototype.parseMessage = function(t, r, o) {
      for (var a = []; !this.isEOF(); ) {
        var i = this.char();
        if (i === 123) {
          var l = this.parseArgument(t, o);
          if (l.err)
            return l;
          a.push(l.val);
        } else {
          if (i === 125 && t > 0)
            break;
          if (i === 35 && (r === "plural" || r === "selectordinal")) {
            var n = this.clonePosition();
            this.bump(), a.push({
              type: he.pound,
              location: ie(n, this.clonePosition())
            });
          } else if (i === 60 && !this.ignoreTag && this.peek() === 47) {
            if (o)
              break;
            return this.error(oe.UNMATCHED_CLOSING_TAG, ie(this.clonePosition(), this.clonePosition()));
          } else if (i === 60 && !this.ignoreTag && vo(this.peek() || 0)) {
            var l = this.parseTag(t, r);
            if (l.err)
              return l;
            a.push(l.val);
          } else {
            var l = this.parseLiteral(t, r);
            if (l.err)
              return l;
            a.push(l.val);
          }
        }
      }
      return { val: a, err: null };
    }, e.prototype.parseTag = function(t, r) {
      var o = this.clonePosition();
      this.bump();
      var a = this.parseTagName();
      if (this.bumpSpace(), this.bumpIf("/>"))
        return {
          val: {
            type: he.literal,
            value: "<".concat(a, "/>"),
            location: ie(o, this.clonePosition())
          },
          err: null
        };
      if (this.bumpIf(">")) {
        var i = this.parseMessage(t + 1, r, !0);
        if (i.err)
          return i;
        var l = i.val, n = this.clonePosition();
        if (this.bumpIf("</")) {
          if (this.isEOF() || !vo(this.char()))
            return this.error(oe.INVALID_TAG, ie(n, this.clonePosition()));
          var s = this.clonePosition(), d = this.parseTagName();
          return a !== d ? this.error(oe.UNMATCHED_CLOSING_TAG, ie(s, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">") ? {
            val: {
              type: he.tag,
              value: a,
              children: l,
              location: ie(o, this.clonePosition())
            },
            err: null
          } : this.error(oe.INVALID_TAG, ie(n, this.clonePosition())));
        } else
          return this.error(oe.UNCLOSED_TAG, ie(o, this.clonePosition()));
      } else
        return this.error(oe.INVALID_TAG, ie(o, this.clonePosition()));
    }, e.prototype.parseTagName = function() {
      var t = this.offset();
      for (this.bump(); !this.isEOF() && Vl(this.char()); )
        this.bump();
      return this.message.slice(t, this.offset());
    }, e.prototype.parseLiteral = function(t, r) {
      for (var o = this.clonePosition(), a = ""; ; ) {
        var i = this.tryParseQuote(r);
        if (i) {
          a += i;
          continue;
        }
        var l = this.tryParseUnquoted(t, r);
        if (l) {
          a += l;
          continue;
        }
        var n = this.tryParseLeftAngleBracket();
        if (n) {
          a += n;
          continue;
        }
        break;
      }
      var s = ie(o, this.clonePosition());
      return {
        val: { type: he.literal, value: a, location: s },
        err: null
      };
    }, e.prototype.tryParseLeftAngleBracket = function() {
      return !this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
      !Ul(this.peek() || 0)) ? (this.bump(), "<") : null;
    }, e.prototype.tryParseQuote = function(t) {
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
          if (t === "plural" || t === "selectordinal")
            break;
          return null;
        default:
          return null;
      }
      this.bump();
      var r = [this.char()];
      for (this.bump(); !this.isEOF(); ) {
        var o = this.char();
        if (o === 39)
          if (this.peek() === 39)
            r.push(39), this.bump();
          else {
            this.bump();
            break;
          }
        else
          r.push(o);
        this.bump();
      }
      return mo.apply(void 0, r);
    }, e.prototype.tryParseUnquoted = function(t, r) {
      if (this.isEOF())
        return null;
      var o = this.char();
      return o === 60 || o === 123 || o === 35 && (r === "plural" || r === "selectordinal") || o === 125 && t > 0 ? null : (this.bump(), mo(o));
    }, e.prototype.parseArgument = function(t, r) {
      var o = this.clonePosition();
      if (this.bump(), this.bumpSpace(), this.isEOF())
        return this.error(oe.EXPECT_ARGUMENT_CLOSING_BRACE, ie(o, this.clonePosition()));
      if (this.char() === 125)
        return this.bump(), this.error(oe.EMPTY_ARGUMENT, ie(o, this.clonePosition()));
      var a = this.parseIdentifierIfPossible().value;
      if (!a)
        return this.error(oe.MALFORMED_ARGUMENT, ie(o, this.clonePosition()));
      if (this.bumpSpace(), this.isEOF())
        return this.error(oe.EXPECT_ARGUMENT_CLOSING_BRACE, ie(o, this.clonePosition()));
      switch (this.char()) {
        // Simple argument: `{name}`
        case 125:
          return this.bump(), {
            val: {
              type: he.argument,
              // value does not include the opening and closing braces.
              value: a,
              location: ie(o, this.clonePosition())
            },
            err: null
          };
        // Argument with options: `{name, format, ...}`
        case 44:
          return this.bump(), this.bumpSpace(), this.isEOF() ? this.error(oe.EXPECT_ARGUMENT_CLOSING_BRACE, ie(o, this.clonePosition())) : this.parseArgumentOptions(t, r, a, o);
        default:
          return this.error(oe.MALFORMED_ARGUMENT, ie(o, this.clonePosition()));
      }
    }, e.prototype.parseIdentifierIfPossible = function() {
      var t = this.clonePosition(), r = this.offset(), o = fo(this.message, r), a = r + o.length;
      this.bumpTo(a);
      var i = this.clonePosition(), l = ie(t, i);
      return { value: o, location: l };
    }, e.prototype.parseArgumentOptions = function(t, r, o, a) {
      var i, l = this.clonePosition(), n = this.parseIdentifierIfPossible().value, s = this.clonePosition();
      switch (n) {
        case "":
          return this.error(oe.EXPECT_ARGUMENT_TYPE, ie(l, s));
        case "number":
        case "date":
        case "time": {
          this.bumpSpace();
          var d = null;
          if (this.bumpIf(",")) {
            this.bumpSpace();
            var _ = this.clonePosition(), c = this.parseSimpleArgStyleIfPossible();
            if (c.err)
              return c;
            var u = Kl(c.val);
            if (u.length === 0)
              return this.error(oe.EXPECT_ARGUMENT_STYLE, ie(this.clonePosition(), this.clonePosition()));
            var h = ie(_, this.clonePosition());
            d = { style: u, styleLocation: h };
          }
          var p = this.tryParseArgumentClose(a);
          if (p.err)
            return p;
          var w = ie(a, this.clonePosition());
          if (d && ma(d == null ? void 0 : d.style, "::", 0)) {
            var y = Hl(d.style.slice(2));
            if (n === "number") {
              var c = this.parseNumberSkeletonFromString(y, d.styleLocation);
              return c.err ? c : {
                val: { type: he.number, value: o, location: w, style: c.val },
                err: null
              };
            } else {
              if (y.length === 0)
                return this.error(oe.EXPECT_DATE_TIME_SKELETON, w);
              var x = y;
              this.locale && (x = Ml(y, this.locale));
              var u = {
                type: xt.dateTime,
                pattern: x,
                location: d.styleLocation,
                parsedOptions: this.shouldParseSkeletons ? kl(x) : {}
              }, k = n === "date" ? he.date : he.time;
              return {
                val: { type: k, value: o, location: w, style: u },
                err: null
              };
            }
          }
          return {
            val: {
              type: n === "number" ? he.number : n === "date" ? he.date : he.time,
              value: o,
              location: w,
              style: (i = d == null ? void 0 : d.style) !== null && i !== void 0 ? i : null
            },
            err: null
          };
        }
        case "plural":
        case "selectordinal":
        case "select": {
          var v = this.clonePosition();
          if (this.bumpSpace(), !this.bumpIf(","))
            return this.error(oe.EXPECT_SELECT_ARGUMENT_OPTIONS, ie(v, le({}, v)));
          this.bumpSpace();
          var g = this.parseIdentifierIfPossible(), $ = 0;
          if (n !== "select" && g.value === "offset") {
            if (!this.bumpIf(":"))
              return this.error(oe.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ie(this.clonePosition(), this.clonePosition()));
            this.bumpSpace();
            var c = this.tryParseDecimalInteger(oe.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, oe.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
            if (c.err)
              return c;
            this.bumpSpace(), g = this.parseIdentifierIfPossible(), $ = c.val;
          }
          var j = this.tryParsePluralOrSelectOptions(t, n, r, g);
          if (j.err)
            return j;
          var p = this.tryParseArgumentClose(a);
          if (p.err)
            return p;
          var P = ie(a, this.clonePosition());
          return n === "select" ? {
            val: {
              type: he.select,
              value: o,
              options: fa(j.val),
              location: P
            },
            err: null
          } : {
            val: {
              type: he.plural,
              value: o,
              options: fa(j.val),
              offset: $,
              pluralType: n === "plural" ? "cardinal" : "ordinal",
              location: P
            },
            err: null
          };
        }
        default:
          return this.error(oe.INVALID_ARGUMENT_TYPE, ie(l, s));
      }
    }, e.prototype.tryParseArgumentClose = function(t) {
      return this.isEOF() || this.char() !== 125 ? this.error(oe.EXPECT_ARGUMENT_CLOSING_BRACE, ie(t, this.clonePosition())) : (this.bump(), { val: !0, err: null });
    }, e.prototype.parseSimpleArgStyleIfPossible = function() {
      for (var t = 0, r = this.clonePosition(); !this.isEOF(); ) {
        var o = this.char();
        switch (o) {
          case 39: {
            this.bump();
            var a = this.clonePosition();
            if (!this.bumpUntil("'"))
              return this.error(oe.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, ie(a, this.clonePosition()));
            this.bump();
            break;
          }
          case 123: {
            t += 1, this.bump();
            break;
          }
          case 125: {
            if (t > 0)
              t -= 1;
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
    }, e.prototype.parseNumberSkeletonFromString = function(t, r) {
      var o = [];
      try {
        o = Sl(t);
      } catch {
        return this.error(oe.INVALID_NUMBER_SKELETON, r);
      }
      return {
        val: {
          type: xt.number,
          tokens: o,
          location: r,
          parsedOptions: this.shouldParseSkeletons ? Pl(o) : {}
        },
        err: null
      };
    }, e.prototype.tryParsePluralOrSelectOptions = function(t, r, o, a) {
      for (var i, l = !1, n = [], s = /* @__PURE__ */ new Set(), d = a.value, _ = a.location; ; ) {
        if (d.length === 0) {
          var c = this.clonePosition();
          if (r !== "select" && this.bumpIf("=")) {
            var u = this.tryParseDecimalInteger(oe.EXPECT_PLURAL_ARGUMENT_SELECTOR, oe.INVALID_PLURAL_ARGUMENT_SELECTOR);
            if (u.err)
              return u;
            _ = ie(c, this.clonePosition()), d = this.message.slice(c.offset, this.offset());
          } else
            break;
        }
        if (s.has(d))
          return this.error(r === "select" ? oe.DUPLICATE_SELECT_ARGUMENT_SELECTOR : oe.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, _);
        d === "other" && (l = !0), this.bumpSpace();
        var h = this.clonePosition();
        if (!this.bumpIf("{"))
          return this.error(r === "select" ? oe.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : oe.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, ie(this.clonePosition(), this.clonePosition()));
        var p = this.parseMessage(t + 1, r, o);
        if (p.err)
          return p;
        var w = this.tryParseArgumentClose(h);
        if (w.err)
          return w;
        n.push([
          d,
          {
            value: p.val,
            location: ie(h, this.clonePosition())
          }
        ]), s.add(d), this.bumpSpace(), i = this.parseIdentifierIfPossible(), d = i.value, _ = i.location;
      }
      return n.length === 0 ? this.error(r === "select" ? oe.EXPECT_SELECT_ARGUMENT_SELECTOR : oe.EXPECT_PLURAL_ARGUMENT_SELECTOR, ie(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !l ? this.error(oe.MISSING_OTHER_CLAUSE, ie(this.clonePosition(), this.clonePosition())) : { val: n, err: null };
    }, e.prototype.tryParseDecimalInteger = function(t, r) {
      var o = 1, a = this.clonePosition();
      this.bumpIf("+") || this.bumpIf("-") && (o = -1);
      for (var i = !1, l = 0; !this.isEOF(); ) {
        var n = this.char();
        if (n >= 48 && n <= 57)
          i = !0, l = l * 10 + (n - 48), this.bump();
        else
          break;
      }
      var s = ie(a, this.clonePosition());
      return i ? (l *= o, Bl(l) ? { val: l, err: null } : this.error(r, s)) : this.error(t, s);
    }, e.prototype.offset = function() {
      return this.position.offset;
    }, e.prototype.isEOF = function() {
      return this.offset() === this.message.length;
    }, e.prototype.clonePosition = function() {
      return {
        offset: this.position.offset,
        line: this.position.line,
        column: this.position.column
      };
    }, e.prototype.char = function() {
      var t = this.position.offset;
      if (t >= this.message.length)
        throw Error("out of bound");
      var r = ci(this.message, t);
      if (r === void 0)
        throw Error("Offset ".concat(t, " is at invalid UTF-16 code unit boundary"));
      return r;
    }, e.prototype.error = function(t, r) {
      return {
        val: null,
        err: {
          kind: t,
          message: this.message,
          location: r
        }
      };
    }, e.prototype.bump = function() {
      if (!this.isEOF()) {
        var t = this.char();
        t === 10 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += t < 65536 ? 1 : 2);
      }
    }, e.prototype.bumpIf = function(t) {
      if (ma(this.message, t, this.offset())) {
        for (var r = 0; r < t.length; r++)
          this.bump();
        return !0;
      }
      return !1;
    }, e.prototype.bumpUntil = function(t) {
      var r = this.offset(), o = this.message.indexOf(t, r);
      return o >= 0 ? (this.bumpTo(o), !0) : (this.bumpTo(this.message.length), !1);
    }, e.prototype.bumpTo = function(t) {
      if (this.offset() > t)
        throw Error("targetOffset ".concat(t, " must be greater than or equal to the current offset ").concat(this.offset()));
      for (t = Math.min(t, this.message.length); ; ) {
        var r = this.offset();
        if (r === t)
          break;
        if (r > t)
          throw Error("targetOffset ".concat(t, " is at invalid UTF-16 code unit boundary"));
        if (this.bump(), this.isEOF())
          break;
      }
    }, e.prototype.bumpSpace = function() {
      for (; !this.isEOF() && ui(this.char()); )
        this.bump();
    }, e.prototype.peek = function() {
      if (this.isEOF())
        return null;
      var t = this.char(), r = this.offset(), o = this.message.charCodeAt(r + (t >= 65536 ? 2 : 1));
      return o ?? null;
    }, e;
  })()
);
function vo(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function Ul(e) {
  return vo(e) || e === 47;
}
function Vl(e) {
  return e === 45 || e === 46 || e >= 48 && e <= 57 || e === 95 || e >= 97 && e <= 122 || e >= 65 && e <= 90 || e == 183 || e >= 192 && e <= 214 || e >= 216 && e <= 246 || e >= 248 && e <= 893 || e >= 895 && e <= 8191 || e >= 8204 && e <= 8205 || e >= 8255 && e <= 8256 || e >= 8304 && e <= 8591 || e >= 11264 && e <= 12271 || e >= 12289 && e <= 55295 || e >= 63744 && e <= 64975 || e >= 65008 && e <= 65533 || e >= 65536 && e <= 983039;
}
function ui(e) {
  return e >= 9 && e <= 13 || e === 32 || e === 133 || e >= 8206 && e <= 8207 || e === 8232 || e === 8233;
}
function Wl(e) {
  return e >= 33 && e <= 35 || e === 36 || e >= 37 && e <= 39 || e === 40 || e === 41 || e === 42 || e === 43 || e === 44 || e === 45 || e >= 46 && e <= 47 || e >= 58 && e <= 59 || e >= 60 && e <= 62 || e >= 63 && e <= 64 || e === 91 || e === 92 || e === 93 || e === 94 || e === 96 || e === 123 || e === 124 || e === 125 || e === 126 || e === 161 || e >= 162 && e <= 165 || e === 166 || e === 167 || e === 169 || e === 171 || e === 172 || e === 174 || e === 176 || e === 177 || e === 182 || e === 187 || e === 191 || e === 215 || e === 247 || e >= 8208 && e <= 8213 || e >= 8214 && e <= 8215 || e === 8216 || e === 8217 || e === 8218 || e >= 8219 && e <= 8220 || e === 8221 || e === 8222 || e === 8223 || e >= 8224 && e <= 8231 || e >= 8240 && e <= 8248 || e === 8249 || e === 8250 || e >= 8251 && e <= 8254 || e >= 8257 && e <= 8259 || e === 8260 || e === 8261 || e === 8262 || e >= 8263 && e <= 8273 || e === 8274 || e === 8275 || e >= 8277 && e <= 8286 || e >= 8592 && e <= 8596 || e >= 8597 && e <= 8601 || e >= 8602 && e <= 8603 || e >= 8604 && e <= 8607 || e === 8608 || e >= 8609 && e <= 8610 || e === 8611 || e >= 8612 && e <= 8613 || e === 8614 || e >= 8615 && e <= 8621 || e === 8622 || e >= 8623 && e <= 8653 || e >= 8654 && e <= 8655 || e >= 8656 && e <= 8657 || e === 8658 || e === 8659 || e === 8660 || e >= 8661 && e <= 8691 || e >= 8692 && e <= 8959 || e >= 8960 && e <= 8967 || e === 8968 || e === 8969 || e === 8970 || e === 8971 || e >= 8972 && e <= 8991 || e >= 8992 && e <= 8993 || e >= 8994 && e <= 9e3 || e === 9001 || e === 9002 || e >= 9003 && e <= 9083 || e === 9084 || e >= 9085 && e <= 9114 || e >= 9115 && e <= 9139 || e >= 9140 && e <= 9179 || e >= 9180 && e <= 9185 || e >= 9186 && e <= 9254 || e >= 9255 && e <= 9279 || e >= 9280 && e <= 9290 || e >= 9291 && e <= 9311 || e >= 9472 && e <= 9654 || e === 9655 || e >= 9656 && e <= 9664 || e === 9665 || e >= 9666 && e <= 9719 || e >= 9720 && e <= 9727 || e >= 9728 && e <= 9838 || e === 9839 || e >= 9840 && e <= 10087 || e === 10088 || e === 10089 || e === 10090 || e === 10091 || e === 10092 || e === 10093 || e === 10094 || e === 10095 || e === 10096 || e === 10097 || e === 10098 || e === 10099 || e === 10100 || e === 10101 || e >= 10132 && e <= 10175 || e >= 10176 && e <= 10180 || e === 10181 || e === 10182 || e >= 10183 && e <= 10213 || e === 10214 || e === 10215 || e === 10216 || e === 10217 || e === 10218 || e === 10219 || e === 10220 || e === 10221 || e === 10222 || e === 10223 || e >= 10224 && e <= 10239 || e >= 10240 && e <= 10495 || e >= 10496 && e <= 10626 || e === 10627 || e === 10628 || e === 10629 || e === 10630 || e === 10631 || e === 10632 || e === 10633 || e === 10634 || e === 10635 || e === 10636 || e === 10637 || e === 10638 || e === 10639 || e === 10640 || e === 10641 || e === 10642 || e === 10643 || e === 10644 || e === 10645 || e === 10646 || e === 10647 || e === 10648 || e >= 10649 && e <= 10711 || e === 10712 || e === 10713 || e === 10714 || e === 10715 || e >= 10716 && e <= 10747 || e === 10748 || e === 10749 || e >= 10750 && e <= 11007 || e >= 11008 && e <= 11055 || e >= 11056 && e <= 11076 || e >= 11077 && e <= 11078 || e >= 11079 && e <= 11084 || e >= 11085 && e <= 11123 || e >= 11124 && e <= 11125 || e >= 11126 && e <= 11157 || e === 11158 || e >= 11159 && e <= 11263 || e >= 11776 && e <= 11777 || e === 11778 || e === 11779 || e === 11780 || e === 11781 || e >= 11782 && e <= 11784 || e === 11785 || e === 11786 || e === 11787 || e === 11788 || e === 11789 || e >= 11790 && e <= 11798 || e === 11799 || e >= 11800 && e <= 11801 || e === 11802 || e === 11803 || e === 11804 || e === 11805 || e >= 11806 && e <= 11807 || e === 11808 || e === 11809 || e === 11810 || e === 11811 || e === 11812 || e === 11813 || e === 11814 || e === 11815 || e === 11816 || e === 11817 || e >= 11818 && e <= 11822 || e === 11823 || e >= 11824 && e <= 11833 || e >= 11834 && e <= 11835 || e >= 11836 && e <= 11839 || e === 11840 || e === 11841 || e === 11842 || e >= 11843 && e <= 11855 || e >= 11856 && e <= 11857 || e === 11858 || e >= 11859 && e <= 11903 || e >= 12289 && e <= 12291 || e === 12296 || e === 12297 || e === 12298 || e === 12299 || e === 12300 || e === 12301 || e === 12302 || e === 12303 || e === 12304 || e === 12305 || e >= 12306 && e <= 12307 || e === 12308 || e === 12309 || e === 12310 || e === 12311 || e === 12312 || e === 12313 || e === 12314 || e === 12315 || e === 12316 || e === 12317 || e >= 12318 && e <= 12319 || e === 12320 || e === 12336 || e === 64830 || e === 64831 || e >= 65093 && e <= 65094;
}
function yo(e) {
  e.forEach(function(t) {
    if (delete t.location, ri(t) || oi(t))
      for (var r in t.options)
        delete t.options[r].location, yo(t.options[r].value);
    else Xa(t) && ii(t.style) || (ei(t) || ti(t)) && go(t.style) ? delete t.style.location : ai(t) && yo(t.children);
  });
}
function ql(e, t) {
  t === void 0 && (t = {}), t = le({ shouldParseSkeletons: !0, requiresOtherClause: !0 }, t);
  var r = new Fl(e, t).parse();
  if (r.err) {
    var o = SyntaxError(oe[r.err.kind]);
    throw o.location = r.err.location, o.originalMessage = r.err.message, o;
  }
  return t != null && t.captureLocation || yo(r.val), r.val;
}
var St;
(function(e) {
  e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API";
})(St || (St = {}));
var Rr = (
  /** @class */
  (function(e) {
    jr(t, e);
    function t(r, o, a) {
      var i = e.call(this, r) || this;
      return i.code = o, i.originalMessage = a, i;
    }
    return t.prototype.toString = function() {
      return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
    }, t;
  })(Error)
), ya = (
  /** @class */
  (function(e) {
    jr(t, e);
    function t(r, o, a, i) {
      return e.call(this, 'Invalid values for "'.concat(r, '": "').concat(o, '". Options are "').concat(Object.keys(a).join('", "'), '"'), St.INVALID_VALUE, i) || this;
    }
    return t;
  })(Rr)
), Zl = (
  /** @class */
  (function(e) {
    jr(t, e);
    function t(r, o, a) {
      return e.call(this, 'Value for "'.concat(r, '" must be of type ').concat(o), St.INVALID_VALUE, a) || this;
    }
    return t;
  })(Rr)
), Ql = (
  /** @class */
  (function(e) {
    jr(t, e);
    function t(r, o) {
      return e.call(this, 'The intl string context variable "'.concat(r, '" was not provided to the string "').concat(o, '"'), St.MISSING_VALUE, o) || this;
    }
    return t;
  })(Rr)
), ze;
(function(e) {
  e[e.literal = 0] = "literal", e[e.object = 1] = "object";
})(ze || (ze = {}));
function Yl(e) {
  return e.length < 2 ? e : e.reduce(function(t, r) {
    var o = t[t.length - 1];
    return !o || o.type !== ze.literal || r.type !== ze.literal ? t.push(r) : o.value += r.value, t;
  }, []);
}
function Jl(e) {
  return typeof e == "function";
}
function vr(e, t, r, o, a, i, l) {
  if (e.length === 1 && ua(e[0]))
    return [
      {
        type: ze.literal,
        value: e[0].value
      }
    ];
  for (var n = [], s = 0, d = e; s < d.length; s++) {
    var _ = d[s];
    if (ua(_)) {
      n.push({
        type: ze.literal,
        value: _.value
      });
      continue;
    }
    if (bl(_)) {
      typeof i == "number" && n.push({
        type: ze.literal,
        value: r.getNumberFormat(t).format(i)
      });
      continue;
    }
    var c = _.value;
    if (!(a && c in a))
      throw new Ql(c, l);
    var u = a[c];
    if (yl(_)) {
      (!u || typeof u == "string" || typeof u == "number") && (u = typeof u == "string" || typeof u == "number" ? String(u) : ""), n.push({
        type: typeof u == "string" ? ze.literal : ze.object,
        value: u
      });
      continue;
    }
    if (ei(_)) {
      var h = typeof _.style == "string" ? o.date[_.style] : go(_.style) ? _.style.parsedOptions : void 0;
      n.push({
        type: ze.literal,
        value: r.getDateTimeFormat(t, h).format(u)
      });
      continue;
    }
    if (ti(_)) {
      var h = typeof _.style == "string" ? o.time[_.style] : go(_.style) ? _.style.parsedOptions : o.time.medium;
      n.push({
        type: ze.literal,
        value: r.getDateTimeFormat(t, h).format(u)
      });
      continue;
    }
    if (Xa(_)) {
      var h = typeof _.style == "string" ? o.number[_.style] : ii(_.style) ? _.style.parsedOptions : void 0;
      h && h.scale && (u = u * (h.scale || 1)), n.push({
        type: ze.literal,
        value: r.getNumberFormat(t, h).format(u)
      });
      continue;
    }
    if (ai(_)) {
      var p = _.children, w = _.value, y = a[w];
      if (!Jl(y))
        throw new Zl(w, "function", l);
      var x = vr(p, t, r, o, a, i), k = y(x.map(function($) {
        return $.value;
      }));
      Array.isArray(k) || (k = [k]), n.push.apply(n, k.map(function($) {
        return {
          type: typeof $ == "string" ? ze.literal : ze.object,
          value: $
        };
      }));
    }
    if (ri(_)) {
      var v = _.options[u] || _.options.other;
      if (!v)
        throw new ya(_.value, u, Object.keys(_.options), l);
      n.push.apply(n, vr(v.value, t, r, o, a));
      continue;
    }
    if (oi(_)) {
      var v = _.options["=".concat(u)];
      if (!v) {
        if (!Intl.PluralRules)
          throw new Rr(`Intl.PluralRules is not available in this environment.
Try polyfilling it using "@formatjs/intl-pluralrules"
`, St.MISSING_INTL_API, l);
        var g = r.getPluralRules(t, { type: _.pluralType }).select(u - (_.offset || 0));
        v = _.options[g] || _.options.other;
      }
      if (!v)
        throw new ya(_.value, u, Object.keys(_.options), l);
      n.push.apply(n, vr(v.value, t, r, o, a, u - (_.offset || 0)));
      continue;
    }
  }
  return Yl(n);
}
function Xl(e, t) {
  return t ? le(le(le({}, e || {}), t || {}), Object.keys(e).reduce(function(r, o) {
    return r[o] = le(le({}, e[o]), t[o] || {}), r;
  }, {})) : e;
}
function es(e, t) {
  return t ? Object.keys(e).reduce(function(r, o) {
    return r[o] = Xl(e[o], t[o]), r;
  }, le({}, e)) : e;
}
function so(e) {
  return {
    create: function() {
      return {
        get: function(t) {
          return e[t];
        },
        set: function(t, r) {
          e[t] = r;
        }
      };
    }
  };
}
function ts(e) {
  return e === void 0 && (e = {
    number: {},
    dateTime: {},
    pluralRules: {}
  }), {
    getNumberFormat: io(function() {
      for (var t, r = [], o = 0; o < arguments.length; o++)
        r[o] = arguments[o];
      return new ((t = Intl.NumberFormat).bind.apply(t, ao([void 0], r, !1)))();
    }, {
      cache: so(e.number),
      strategy: no.variadic
    }),
    getDateTimeFormat: io(function() {
      for (var t, r = [], o = 0; o < arguments.length; o++)
        r[o] = arguments[o];
      return new ((t = Intl.DateTimeFormat).bind.apply(t, ao([void 0], r, !1)))();
    }, {
      cache: so(e.dateTime),
      strategy: no.variadic
    }),
    getPluralRules: io(function() {
      for (var t, r = [], o = 0; o < arguments.length; o++)
        r[o] = arguments[o];
      return new ((t = Intl.PluralRules).bind.apply(t, ao([void 0], r, !1)))();
    }, {
      cache: so(e.pluralRules),
      strategy: no.variadic
    })
  };
}
var rs = (
  /** @class */
  (function() {
    function e(t, r, o, a) {
      r === void 0 && (r = e.defaultLocale);
      var i = this;
      if (this.formatterCache = {
        number: {},
        dateTime: {},
        pluralRules: {}
      }, this.format = function(s) {
        var d = i.formatToParts(s);
        if (d.length === 1)
          return d[0].value;
        var _ = d.reduce(function(c, u) {
          return !c.length || u.type !== ze.literal || typeof c[c.length - 1] != "string" ? c.push(u.value) : c[c.length - 1] += u.value, c;
        }, []);
        return _.length <= 1 ? _[0] || "" : _;
      }, this.formatToParts = function(s) {
        return vr(i.ast, i.locales, i.formatters, i.formats, s, void 0, i.message);
      }, this.resolvedOptions = function() {
        var s;
        return {
          locale: ((s = i.resolvedLocale) === null || s === void 0 ? void 0 : s.toString()) || Intl.NumberFormat.supportedLocalesOf(i.locales)[0]
        };
      }, this.getAst = function() {
        return i.ast;
      }, this.locales = r, this.resolvedLocale = e.resolveLocale(r), typeof t == "string") {
        if (this.message = t, !e.__parse)
          throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
        var l = a || {};
        l.formatters;
        var n = _l(l, ["formatters"]);
        this.ast = e.__parse(t, le(le({}, n), { locale: this.resolvedLocale }));
      } else
        this.ast = t;
      if (!Array.isArray(this.ast))
        throw new TypeError("A message must be provided as a String or AST.");
      this.formats = es(e.formats, o), this.formatters = a && a.formatters || ts(this.formatterCache);
    }
    return Object.defineProperty(e, "defaultLocale", {
      get: function() {
        return e.memoizedDefaultLocale || (e.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), e.memoizedDefaultLocale;
      },
      enumerable: !1,
      configurable: !0
    }), e.memoizedDefaultLocale = null, e.resolveLocale = function(t) {
      if (!(typeof Intl.Locale > "u")) {
        var r = Intl.NumberFormat.supportedLocalesOf(t);
        return r.length > 0 ? new Intl.Locale(r[0]) : new Intl.Locale(typeof t == "string" ? t : t[0]);
      }
    }, e.__parse = ql, e.formats = {
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
    }, e;
  })()
);
const ba = /* @__PURE__ */ Object.assign({
  "./locales/cs.json": jn,
  "./locales/da.json": Dn,
  "./locales/de.json": Bn,
  "./locales/el.json": Hn,
  "./locales/en.json": Fn,
  "./locales/es.json": Vn,
  "./locales/fi.json": qn,
  "./locales/fr.json": Qn,
  "./locales/it.json": Jn,
  "./locales/nl.json": el,
  "./locales/no.json": rl,
  "./locales/pl.json": al,
  "./locales/ru.json": nl,
  "./locales/sk.json": sl,
  "./locales/sv.json": cl
}), st = {};
for (const e in ba) {
  const t = e.match(/\.\/locales\/([\w-]+)\.json$/), r = t == null ? void 0 : t[1];
  r && (st[r] = ba[e].default);
}
const Sr = "en";
function wa(e, t) {
  return e[t];
}
function Oe(e, t) {
  var a;
  const r = t || ((a = e == null ? void 0 : e.locale) == null ? void 0 : a.language) || (e == null ? void 0 : e.language) || Sr;
  if (st[r]) return r;
  const o = r.slice(0, 2).toLowerCase();
  return st[o] ? o : Sr;
}
const os = Object.keys(st);
function pe(e, t, r = {}) {
  const o = (t !== void 0 ? st[t] : void 0) || st[Sr] || {};
  let a = wa(o, e);
  if (a === void 0) {
    const i = wa(st[Sr] || {}, e);
    a = i === void 0 ? e : i;
  }
  try {
    return new rs(a, t).format(r);
  } catch (i) {
    return console.warn(`Translation failed for key: ${e}`, i), a;
  }
}
function ke(e) {
  return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Te(e) {
  return e.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
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
  no_allergens_color: "#a9cfe0",
  // Render the "no data" state (adapter-emitted level=-1) with a distinct
  // fuzzy texture so it doesn't visually collapse into a real level=0.
  // Spread into every adapter's stub config so the editor / YAML can opt
  // out per card.
  show_no_data_distinct: !0,
  // Icon-in-ring (#227): place the allergen icon inside the level-ring
  // donut hole instead of (or in addition to) the side icon column.
  // Two independent toggles plus the centered-icon color/size knobs.
  icon_in_ring: !1,
  show_allergen_column: !0,
  icon_in_ring_color_mode: "static",
  icon_in_ring_static_color: "var(--primary-text-color)",
  icon_in_ring_size_ratio: 0.75,
  // Numeric value display: false shows the calculated level (default), true
  // shows the raw measurement (concentration / index) for the integrations that
  // expose one (PLU, PEU, SILAM, Kleenex). Honoured by resolveNumericValue;
  // a no-op for integrations without a raw value. PEU's legacy
  // numeric_state_raw_risk flag is still honoured as an alias.
  numeric_value_raw: !1
}, bo = U.levels_thickness, zr = 35, as = 30;
function Ar(e) {
  return Math.round(e / as);
}
const $r = {
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
}, hi = {
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
}, gi = Object.keys(hi).sort(
  (e, t) => t.length - e.length
), is = {
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
}, ns = {
  olive: "olive",
  plane: "plane",
  cypress: "cypress",
  lime: "lime",
  // The API calls Tilia "linden"; our canonical key (locale strings, icon)
  // stays "lime". "lime" above keeps hand-written configs canonicalizing.
  linden: "lime",
  // The API name for Rumex is "dock/sorrel", slugified to "dock_sorrel".
  dock_sorrel: "sorrel",
  plantain: "plantain",
  sweet_chestnut: "sweet_chestnut",
  tree_of_heaven: "tree_of_heaven",
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
}, ls = {
  pine: "pine",
  poplar: "poplar",
  poaceae: "poaceae",
  chenopod: "chenopod",
  nettle: "nettle",
  grass_cat: "grass_cat",
  trees_cat: "trees_cat",
  weeds_cat: "weeds_cat"
}, ss = {
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
}, ds = {
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
}, cs = {
  cottonwood: "poplar",
  juniper: "cypress",
  japanese_cedar: "cypress",
  japanese_cypress: "cypress",
  // NOTE: graminales is NOT aliased to grass here. GP's category-vs-plant
  // collision handling depends on graminales staying distinct from grass
  // (the category). Icon presentation is still handled via
  // ALLERGEN_ICON_FALLBACK.graminales = "grass".
  cypress_pine: "cypress",
  // Identity alias for the v2.1.0 summary sensor key. Discovery in
  // src/adapters/gpl/discovery.js maps overall_pollen_risk_today ->
  // allergy_risk; this line lets the canonical key resolve through
  // the shared allergen normalization without losing its identity.
  allergy_risk: "allergy_risk"
}, _s = {
  abedul: "birch",
  aeoch: "ash",
  aerkwid: "ragweed",
  aes: "ash",
  aihao: "mugwort",
  ais: "ash",
  al: "alder",
  aldar: "alder",
  aldr: "alder",
  alibh: "olive",
  aliso: "alder",
  aliv: "olive",
  aliv_mokk: "olive",
  alnos: "alder",
  altr: "alder",
  alun: "hazel",
  ambroisie: "ragweed",
  ambrosia: "ragweed",
  ambrozia: "ragweed",
  ambrozie: "ragweed",
  ambroziya: "ragweed",
  ambrozja: "ragweed",
  amerikai_nyar: "cottonwood",
  amieiro: "alder",
  amvrosia_artemisifyllos: "ragweed",
  arin: "alder",
  armoise: "mugwort",
  artemisia: "mugwort",
  artemisia_comune: "mugwort",
  as: "ash",
  ask: "ash",
  aulne: "alder",
  aveleira: "hazel",
  avellano: "hazel",
  ayas: "ash",
  bailashu: "ash",
  barc: "birch",
  beifuss: "mugwort",
  beiskambrosia: "ragweed",
  bereza: "birch",
  berk: "birch",
  betula: "birch",
  betulla: "birch",
  bijvoet: "mugwort",
  birk: "birch",
  birke: "birch",
  bjork: "birch",
  borovica: "pine",
  borovice: "pine",
  bouleau: "birch",
  brc: "birch",
  breza: "birch",
  briza: "birch",
  brzoza: "birch",
  butakusa: "ragweed",
  bylica: "mugwort",
  bynkeambrosie: "ragweed",
  cam: "pine",
  caolei: "graminales",
  carvalho: "oak",
  cay_bach_duong: "birch",
  cay_duong_tia: "alder",
  cay_go_duong: "cottonwood",
  cay_lieu_sam_nhat: "japanese_cedar",
  cay_oliu: "olive",
  cay_phi: "hazel",
  cay_soi: "oak",
  cay_tan_bi: "ash",
  cay_thong: "pine",
  cedar_jepang: "japanese_cedar",
  cedre_du_japon: "japanese_cedar",
  cedro_giapponese: "japanese_cedar",
  cedro_japones: "japanese_cedar",
  cedru_japonez: "japanese_cedar",
  chamnamu: "oak",
  chene: "oak",
  chingchuchay: "mugwort",
  chopo: "cottonwood",
  choupos: "cottonwood",
  cim: "graminales",
  cndnm: "birch",
  co_phan_huong: "ragweed",
  dab: "oak",
  devdar: "pine",
  disbudak: "ash",
  dub: "oak",
  dwaejipul: "ragweed",
  ebirch: "birch",
  eg: "oak",
  eger: "alder",
  ehesl: "hazel",
  eiche: "oak",
  eik: "oak",
  ek: "oak",
  elia: "olive",
  els: "alder",
  eoledor: "alder",
  erle: "alder",
  es: "ash",
  esche: "ash",
  fekete_urom: "mugwort",
  fenyo: "pine",
  findik_agaci: "hazel",
  foyntoykia: "hazel",
  frasin: "ash",
  frassino: "ash",
  frene: "ash",
  fresno: "ash",
  furu: "pine",
  fyr: "pine",
  ganlanshu: "olive",
  gddi: "graminales",
  grabo: "mugwort",
  grabynke: "mugwort",
  grassen: "graminales",
  hakoyanagi: "cottonwood",
  hannoki: "alder",
  haselnuss: "hazel",
  hashibami: "hazel",
  hassel: "hazel",
  hazelaar: "hazel",
  hecl: "hazel",
  heijeulnamu: "hazel",
  hej_l: "hazel",
  hejel_mokk: "hazel",
  hejhel: "hazel",
  hejhl: "hazel",
  hesl: "hazel",
  htti_mr: "cottonwood",
  huashu: "birch",
  hulluglu: "graminales",
  hus_agaci: "birch",
  hyajel: "hazel",
  ilbon_samnamu: "japanese_cedar",
  inekenozhiwu: "graminales",
  j_aitun: "olive",
  jaipnij_sidr: "japanese_cedar",
  jajagnamu: "birch",
  japan_cedrus: "japanese_cedar",
  japani_sidar: "japanese_cedar",
  japanijh_devdar: "japanese_cedar",
  japaninsetri: "japanese_cedar",
  japanse_ceder: "japanese_cedar",
  japanseder: "japanese_cedar",
  japansk_ceder: "japanese_cedar",
  japansk_cedertrae: "japanese_cedar",
  japon_sedir_agaci: "japanese_cedar",
  japonsky_ceder: "japanese_cedar",
  jappnis_cetar: "japanese_cedar",
  jappnis_sidr: "japanese_cedar",
  jasan: "ash",
  jasen: "ash",
  jelsa: "alder",
  jesion: "ash",
  jpani_sidr: "japanese_cedar",
  jpanis_sidr: "japanese_cedar",
  jpnis_sidr: "japanese_cedar",
  jr_lm: "alder",
  kabanoki: "birch",
  kanarya_otu: "ragweed",
  kapas: "cottonwood",
  katnvud: "cottonwood",
  kattnvut: "cottonwood",
  kavak: "cottonwood",
  kedros_iaponias: "japanese_cedar",
  khottonwud: "cottonwood",
  kiefer: "pine",
  kizilagac: "alder",
  koivu: "birch",
  koris: "ash",
  kotnvud: "cottonwood",
  kpas: "cottonwood",
  kriptomeriya: "japanese_cedar",
  kryptomeria_japonska: "japanese_cedar",
  kryptomerie_japonska: "japanese_cedar",
  ktnud: "cottonwood",
  lblwt: "oak",
  lbndq: "hazel",
  lbtwl: "birch",
  leppa: "alder",
  leszczyna: "hazel",
  levithochorto: "mugwort",
  leyka: "cottonwood",
  lhwr: "cottonwood",
  lieska: "hazel",
  lishchina: "hazel",
  liska: "hazel",
  lmrn: "ash",
  lrghyd: "ragweed",
  lshyh_ldrj: "mugwort",
  lsnwbr: "pine",
  lzytwn: "olive",
  magort: "mugwort",
  makok: "olive",
  malortsambrosia: "ragweed",
  malurt: "mugwort",
  manty: "pine",
  maslin: "olive",
  matsu: "pine",
  melia: "ash",
  mese: "oak",
  mesteacan: "birch",
  mgvart: "mugwort",
  mgvhrt: "mugwort",
  mgvort: "mugwort",
  mgvortt: "mugwort",
  mgvrt: "mugwort",
  mianbaiyang: "cottonwood",
  milunamu: "cottonwood",
  misk_otu: "mugwort",
  mkvort: "mugwort",
  mogyoro: "hazel",
  mulpulenamu: "ash",
  ngai_cuu: "mugwort",
  nocciolo: "hazel",
  noisetier: "hazel",
  nyirfa: "birch",
  ok: "oak",
  ok_mokk: "oak",
  okk: "oak",
  oku: "oak",
  ol_kha: "alder",
  olcha: "alder",
  oldr: "alder",
  oliivi: "olive",
  olijfboom: "olive",
  olinamu: "alder",
  oliv: "olive",
  oliva: "olive",
  oliveira: "olive",
  oliven: "olive",
  olivenbaum: "olive",
  olivh: "olive",
  olivier: "olive",
  olivkove_derevo: "olive",
  olivkovoe_derevo: "olive",
  olivo: "olive",
  olivovnik: "olive",
  oliwka: "olive",
  ollibeunamu: "olive",
  olse: "alder",
  ontano: "alder",
  ook: "oak",
  or: "alder",
  orekh: "hazel",
  oribu: "olive",
  pahkinapensas: "hazel",
  pain: "pine",
  pain_mokk: "pine",
  palina: "mugwort",
  pappel: "cottonwood",
  parlagfu: "ragweed",
  pelin: "mugwort",
  pelynek: "mugwort",
  peuplier: "cottonwood",
  peyko: "pine",
  piante_erbacee: "graminales",
  pijnboom: "pine",
  pin: "pine",
  pinheiro: "pine",
  pino: "pine",
  pinus: "pine",
  pioppo: "cottonwood",
  pirc: "birch",
  plante_erbacee: "graminales",
  plop: "cottonwood",
  polin: "mugwort",
  polyn: "mugwort",
  poppel: "cottonwood",
  poppeli: "cottonwood",
  pruttimrm: "cottonwood",
  pujo: "mugwort",
  pul: "graminales",
  pullukl: "graminales",
  purkl: "graminales",
  qimu: "alder",
  quercia: "oak",
  raguid: "ragweed",
  ragvid: "ragweed",
  ragvid_mokk: "ragweed",
  raigvid: "ragweed",
  rakvit: "ragweed",
  regvid: "ragweed",
  rgvid: "ragweed",
  ribenxuesong: "japanese_cedar",
  roble: "oak",
  rodel: "alder",
  ruohot: "graminales",
  rz_ybny: "japanese_cedar",
  saarni: "ash",
  seiyoutoneriko: "ash",
  sicheltanne: "japanese_cedar",
  simyda: "birch",
  sn: "pine",
  sonamu: "pine",
  songshu: "pine",
  sosna: "pine",
  ssug: "mugwort",
  stejar: "oak",
  sugi: "japanese_cedar",
  tall: "pine",
  tammi: "oak",
  tasneira: "ragweed",
  tnsidaryipun: "japanese_cedar",
  tolgy: "oak",
  topol: "cottonwood",
  topol_trekhgrannyy: "cottonwood",
  topola: "cottonwood",
  topolya: "cottonwood",
  trn_vnspti: "graminales",
  tuncao: "ragweed",
  tuoksukki: "ragweed",
  udimr: "ash",
  ulivo: "olive",
  velanidia: "oak",
  vil_kha: "alder",
  xiangshu: "oak",
  yapons_kiy_kedr: "japanese_cedar",
  yas: "ash",
  yasen: "ash",
  yomogi: "mugwort",
  zaitun: "olive",
  zeytin: "olive",
  zhenshu: "hazel",
  // GRAMINALES plant aliases: slugified display_names that refer to the
  // graminales plant (not the grass category). Only includes slugs that
  // do NOT collide with other adapter alias maps (graser/grasses/graminees
  // are intentionally excluded to avoid overriding DWD/PEU/PLU mappings).
  cao: "graminales",
  cimen: "graminales",
  co: "graminales",
  erba: "graminales",
  fu: "graminales",
  graes: "graminales",
  grama: "graminales",
  gramineas: "graminales",
  grasidi: "graminales",
  gress: "graminales",
  gvt: "graminales",
  herbacee: "graminales",
  hullu: "graminales",
  hya: "graminales",
  iarba: "graminales",
  jandi: "graminales",
  pccik: "graminales",
  pull: "graminales",
  rumput: "graminales",
  ruoho: "graminales",
  shb: "graminales",
  trava: "graminales",
  travy: "graminales",
  trawy: "graminales"
}, us = {
  grasses: "grass"
}, hs = {
  grasses: "grass"
}, pi = {
  ...hi,
  ...is,
  ...ns,
  ...ls,
  ...ss,
  ...ds,
  ...cs,
  ..._s,
  ...us,
  ...hs
};
function we(e) {
  return pi[e] || e;
}
const ka = {
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
}, Pr = {
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
}, qt = [
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
], Oo = "Google Maps", Bo = "Source: Includes pollen data from Google", mi = [
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
  // Summary-block render toggles (#222). show_summary_block itself is NOT
  // cosmetic: it changes adapter output (threshold bypass), so it must trigger
  // a data reload. These three only affect card rendering.
  "show_summary_row",
  "show_summary_separator",
  "show_summary_top_types",
  "show_summary_plants_in_season",
  "show_no_data_distinct",
  // Pure render toggle for the Google attribution footer (#338): it only
  // shows/hides already-rendered-independent markup, no data reload needed.
  "show_google_attribution",
  "icon_in_ring",
  "show_allergen_column",
  "icon_in_ring_color_mode",
  "icon_in_ring_static_color",
  "icon_in_ring_size_ratio",
  // Display-only: chooses level vs raw_value for the numeric value; the
  // raw_value is already on the fetched sensor dict, so no reload needed.
  // numeric_state_raw_risk is the legacy PEU alias, now also display-only
  // (resolveNumericValue reads it; adapters no longer change output for it).
  "numeric_value_raw",
  "numeric_state_raw_risk",
  "title",
  "card_mod"
];
function Et(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ke(e) {
  return typeof e == "string" && /^[0-9ABCDEFGHJKMNPQRSTVWXYZ]{26}$/i.test(e);
}
function ir(e) {
  if (e == null) return "default";
  const t = e.config_entries, r = e.primary_config_entry || (Array.isArray(t) && t.length > 0 ? t[0] : null);
  if (!r) return "default";
  const o = e.config_entries_subentries, a = o != null ? o[r] : void 0;
  if (Array.isArray(a)) {
    const i = a.find((l) => l != null);
    if (i) return i;
  }
  return r;
}
function Ge(e) {
  return e === !0 || e === "true";
}
function xa(e, t) {
  if (!Array.isArray(e)) return [];
  const r = e.find((o) => o && o.isSummary) || null;
  return !Ge(t == null ? void 0 : t.show_summary_block) || !r ? e : Ge(t == null ? void 0 : t.show_summary_row) ? [r, ...e.filter((o) => o !== r)] : [r];
}
function gs(e, t) {
  if (!Array.isArray(e) || typeof t != "string" || !t)
    return null;
  const r = e.find(
    (a) => a && typeof a.allergenReplaced == "string" && a.allergenReplaced === t
  );
  if (r) return r;
  const o = /* @__PURE__ */ new Set([
    we(ke(t)),
    we(Te(t))
  ]);
  return e.find(
    (a) => a && typeof a.allergenReplaced == "string" && o.has(we(ke(a.allergenReplaced)))
  ) || null;
}
function ps(e, t) {
  if (!Array.isArray(e) || e.length === 0) return [];
  const r = typeof (t == null ? void 0 : t.badge_content) == "string" ? t.badge_content : "worst", o = e.filter((l) => l && !l.isSummary), a = e.find((l) => l && l.isSummary) || null, i = () => {
    const n = (o.length ? o : e).reduce((s, d) => {
      var p, w, y, x;
      if (!s) return d;
      const _ = Number((w = (p = d == null ? void 0 : d.days) == null ? void 0 : p[0]) == null ? void 0 : w.state), c = Number((x = (y = s == null ? void 0 : s.days) == null ? void 0 : y[0]) == null ? void 0 : x.state), u = Number.isNaN(_) ? -1 / 0 : _, h = Number.isNaN(c) ? -1 / 0 : c;
      return u > h ? d : s;
    }, null);
    return n ? [n] : [];
  };
  switch (r) {
    case "aggregate":
      return a ? [a] : i();
    case "single": {
      const l = t == null ? void 0 : t.badge_single_allergen, n = gs(e, l);
      return n ? [n] : typeof l == "string" && l ? [] : i();
    }
    case "row":
      return e;
    case "worst":
    default:
      return i();
  }
}
function ms(e, t = []) {
  if ((e == null ? void 0 : e.badge_content) !== "single") return e;
  const r = e.badge_single_allergen;
  if (typeof r != "string" || !r) return e;
  const o = Array.isArray(t) ? t : [], a = /* @__PURE__ */ new Set([
    we(ke(r)),
    we(Te(r))
  ]), i = o.filter((n) => {
    const s = String(n);
    return a.has(we(ke(s))) || a.has(we(Te(s)));
  }), l = i.length ? i : [r];
  return { ...e, allergens: l, pollen_threshold: 0 };
}
function fi(e) {
  if (e == null || e.display_state != null && Number(e.display_state) < 0 || e.state == null) return -1;
  const t = Number(e.state);
  return Number.isFinite(t) ? t : -1;
}
async function wo(e, t, r, o = null) {
  try {
    const a = await e.fetchForecast(
      t,
      { ...r, pollen_threshold: 0 },
      o
    );
    return Array.isArray(a) && a.some((i) => {
      var l;
      return fi((l = i == null ? void 0 : i.days) == null ? void 0 : l[0]) >= 0;
    });
  } catch {
    return !1;
  }
}
function Sa(e, t) {
  const r = t.integration === "msw" || t.integration === "irmkmi" ? 1 : t.days_to_show;
  if (t.show_empty_days) return r;
  let o = 0;
  for (const a of e) {
    if (!a.days || !a.days.length) continue;
    const i = a.days.filter((n) => n.state >= 0).length, l = Math.min(i, r);
    l > o && (o = l);
  }
  return o;
}
function gt(e, t = 6, r = -1) {
  if (e == null) return r;
  const o = Number(e);
  return isNaN(o) || o < 0 ? r : t != null ? Math.min(o, t) : o;
}
function ko(e) {
  if (typeof e != "string") return null;
  const t = e.split("T")[0] ?? "", r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
  if (!r) return null;
  const o = new Date(Number(r[1]), Number(r[2]) - 1, Number(r[3]));
  return isNaN(o.getTime()) ? null : o;
}
function xo(e, t) {
  const r = Number(t) || 0;
  return e === "dwd" ? r * 2 : r;
}
function yr(e, t) {
  if (!e) return null;
  const r = e.display_state ?? e.state;
  if (((t == null ? void 0 : t.numeric_value_raw) === !0 || // numeric_state_raw_risk is a PEU-specific legacy key; honour it only for
  // PEU so a stale value left after switching integrations cannot force raw
  // on another integration.
  (t == null ? void 0 : t.integration) === "peu" && (t == null ? void 0 : t.numeric_state_raw_risk) === !0) && e.raw_value != null) {
    const a = Number(e.raw_value);
    if (Number.isFinite(a) && a >= 0) return a;
  }
  return r;
}
function Pe(e, t) {
  if (t === "none") return;
  const o = {
    value_ascending: (a, i) => {
      var l, n, s, d;
      return (((n = (l = a.days) == null ? void 0 : l[0]) == null ? void 0 : n.state) ?? 0) - (((d = (s = i.days) == null ? void 0 : s[0]) == null ? void 0 : d.state) ?? 0);
    },
    value_descending: (a, i) => {
      var l, n, s, d;
      return (((n = (l = i.days) == null ? void 0 : l[0]) == null ? void 0 : n.state) ?? 0) - (((d = (s = a.days) == null ? void 0 : s[0]) == null ? void 0 : d.state) ?? 0);
    },
    name_ascending: (a, i) => a.allergenCapitalized.localeCompare(i.allergenCapitalized),
    name_descending: (a, i) => i.allergenCapitalized.localeCompare(a.allergenCapitalized)
  }[t] || ((a, i) => {
    var l, n, s, d;
    return (((n = (l = i.days) == null ? void 0 : l[0]) == null ? void 0 : n.state) ?? 0) - (((d = (s = a.days) == null ? void 0 : s[0]) == null ? void 0 : d.state) ?? 0);
  });
  e.sort(o);
}
function Fe(e, t) {
  return t === 0 || e.some((r) => r.state >= t);
}
function De(e, {
  fullPhrases: t,
  shortPhrases: r,
  abbreviated: o,
  lang: a,
  capitalize: i,
  configKey: l
}) {
  const n = i || ((h) => h.charAt(0).toUpperCase() + h.slice(1)), s = l ?? e, d = we(e);
  let _;
  const c = Mr(t, s, d);
  if (c)
    _ = c;
  else {
    const h = `card.allergen.${d}`, p = pe(h, a);
    _ = p !== h ? p : n(s);
  }
  let u;
  if (o) {
    const h = `editor.phrases_short.${d}`, p = pe(h, a);
    u = Mr(r, s, d) || (p !== h ? p : null) || _;
  } else
    u = _;
  return { allergenCapitalized: _, allergenShort: u };
}
function Mr(e, t, r) {
  return e != null && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : fs(e)[r];
}
const za = /* @__PURE__ */ new WeakMap();
function vi(e, t = !1) {
  if (typeof window > "u") return;
  const r = window.__ppDiscoveryScans;
  if (!(!!r && typeof r == "object" && !Array.isArray(r))) {
    if (!t) return;
    window.__ppDiscoveryScans = {};
  }
  const a = window.__ppDiscoveryScans, i = a[e];
  a[e] = (typeof i == "number" ? i : 0) + 1;
}
function Ee(e, t) {
  const r = /* @__PURE__ */ new WeakMap();
  return (o, a) => {
    if (!o || typeof o != "object") return e(o, a);
    if (r.has(o)) return r.get(o);
    const i = e(o, a);
    return t && vi(t, a), r.set(o, i), i;
  };
}
function fs(e) {
  if (!e || typeof e != "object" || Array.isArray(e))
    return {};
  let t = za.get(e);
  if (t) return t;
  t = {};
  const r = (o) => Object.prototype.hasOwnProperty.call(pi, o);
  for (const o of Object.keys(e)) {
    const a = e[o], i = (n) => {
      typeof n == "string" && n && !(n in t) && (t[n] = a);
    }, l = ke(o);
    if (i(we(l)), !r(l)) {
      const n = Te(o);
      r(n) && i(we(n));
    }
  }
  return za.set(e, t), t;
}
function Ue(e, t) {
  const r = {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: "",
    ...e.phrases || {}
  };
  return {
    fullPhrases: r.full,
    shortPhrases: r.short,
    userLevels: r.levels,
    userDays: r.days,
    noInfoLabel: r.no_information || pe("card.no_information", t)
  };
}
function Ve(e, t, r = null) {
  var d;
  const o = t.date_locale, a = Oe(e, o), i = r != null ? o || r : o || ((d = e.locale) == null ? void 0 : d.language) || e.language || `${a}-${a.toUpperCase()}`, l = t.days_relative !== !1, n = !!t.days_abbreviated, s = !!t.days_uppercase;
  return { lang: a, locale: i, daysRelative: l, dayAbbrev: n, daysUppercase: s };
}
function Ce(e) {
  let t = typeof e == "string" ? e : "";
  return t.startsWith("sensor.") && (t = t.substring(7)), t && !t.endsWith("_") && (t = t + "_"), t;
}
function Zt(e, t, r, o) {
  const a = `sensor.${t}${r}${o}`;
  if (e.states[a]) return a;
  if (o === "") {
    const i = `sensor.${t}${r}`, l = Object.keys(e.states).filter(
      (n) => n.startsWith(i)
    );
    if (l.length === 1) return l[0];
  }
  return null;
}
function Ne(e, t, {
  daysRelative: r,
  dayAbbrev: o,
  daysUppercase: a,
  userDays: i,
  lang: l,
  locale: n
}) {
  let s;
  return r ? i[t] != null ? s = i[t] : t >= 0 && t <= 2 ? s = pe(`card.days.${t}`, l) : s = e.toLocaleDateString(n, {
    day: "numeric",
    month: "short"
  }) : (s = e.toLocaleDateString(n, {
    weekday: o ? "short" : "long"
  }), s = s.charAt(0).toUpperCase() + s.slice(1)), a && (s = s.toUpperCase()), s;
}
function So(e, t, r, o, a) {
  let i = null, l = null;
  if (t.integration === "silam" && (!t.mode || t.mode === "daily")) {
    const d = (t.location || "").toLowerCase();
    if (!Ke(d)) {
      l = d, i = {};
      for (const _ of o) {
        const c = _.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/);
        if (!c || c[1] !== l) continue;
        const u = c[2];
        if (u)
          for (const [, h] of Object.entries(a)) {
            const p = h[u];
            if (p) {
              i[p] = u;
              break;
            }
          }
      }
    }
  }
  const n = new Set(r);
  let s = e.filter((d) => {
    if (t.integration === "silam" && (!t.mode || t.mode === "daily")) {
      if (d.allergenReplaced === "allergy_risk") return !0;
      if (d.entity_id)
        return n.has(d.entity_id);
      if (i !== null) {
        const _ = i[d.allergenReplaced] || d.allergenReplaced, c = `sensor.silam_pollen_${l}_${_}`;
        return n.has(c);
      }
      return !1;
    }
    return !0;
  });
  if (Array.isArray(t.allergens) && t.allergens.length > 0 && t.integration !== "silam") {
    let d, _;
    if (t.integration === "dwd" ? (d = new Set(t.allergens.map((c) => Te(c))), _ = (c) => Te(c.allergenReplaced || "")) : (d = new Set(t.allergens.map((c) => ke(c))), _ = (c) => ke(c.allergenReplaced || "")), t.integration === "kleenex")
      for (const c of ["trees_cat", "grass_cat", "weeds_cat"])
        d.add(ke(c));
    s = s.filter((c) => d.has(_(c)));
  }
  return s;
}
function je(e, t = {}) {
  const {
    platform: r,
    classify: o,
    classifyRelaxed: a,
    isRelevant: i,
    excludeEntry: l,
    resolveLabel: n,
    resolveLocationKey: s,
    onCollision: d,
    fallbackRegex: _,
    fallbackSelector: c,
    debug: u = !1
  } = t, h = Array.isArray(r) ? r : r ? [r] : [], p = t.logTag || (h.length > 0 ? h[0] : "discovery");
  vi(p || "discovery", u);
  const w = o || (() => null), y = a || w, k = l || ((E) => !!(E != null && E.entity_category)), g = i || (() => !0), j = n || ((E) => {
    const { device: C, state: N } = E;
    return C != null && C.name_by_user ? C.name_by_user : C != null && C.name ? C.name : N != null && N.attributes !== null && N.attributes !== void 0 && N.attributes.friendly_name ? N.attributes.friendly_name : "Auto";
  }), L = s || ((E) => ir(E.device)), I = /* @__PURE__ */ new Map(), D = (E, C, N) => {
    if (C == null) return;
    const H = L({ ...N, locationKey: void 0 }), K = { ...N, locationKey: H };
    if (!I.has(H)) {
      const b = j(K);
      I.set(H, { label: b, entities: /* @__PURE__ */ new Map() });
    }
    const V = I.get(H);
    if ((V.deviceId === null || V.deviceId === void 0) && N.deviceId !== null && N.deviceId !== void 0) {
      V.deviceId = N.deviceId;
      const b = j(K);
      b != null && b !== V.label && (V.label = b);
    }
    const M = V.entities;
    if (M.has(C)) {
      if (d) {
        const b = d(K, {
          existingKey: C,
          existingEntityId: M.get(C),
          locEntities: M
        });
        b != null && !M.has(b) && M.set(b, E);
      }
    } else
      M.set(C, E);
  }, z = /* @__PURE__ */ new Set();
  if (e != null && e.devices !== null && e.devices !== void 0)
    for (const [E, C] of Object.entries(e.devices)) {
      if (C == null) continue;
      const N = C.identifiers;
      if (Array.isArray(N)) {
        for (const H of N)
          if (Array.isArray(H) && h.includes(H[0])) {
            z.add(E);
            break;
          }
      }
    }
  u && z.size > 0 && console.debug(
    `[${p}] Discovery tier 1 (device-based): found`,
    z.size,
    "devices"
  );
  let S = !1, T = !1;
  if (e != null && e.entities !== null && e.entities !== void 0) {
    for (const [E, C] of Object.entries(e.entities)) {
      if (C == null) continue;
      const N = z.has(C.device_id), H = h.includes(C.platform);
      if (!N && !H || k(C)) continue;
      const K = e.states !== null && e.states !== void 0 ? e.states[E] : void 0;
      if (K == null) continue;
      const V = C.device_id, M = V != null && e.devices !== null && e.devices !== void 0 ? e.devices[V] : void 0, f = {
        state: K,
        entry: C,
        device: M,
        deviceId: V,
        entityId: E,
        tier: N ? 1 : 2
      };
      if (!g(E, f)) continue;
      const O = N ? y(E, f) : w(E, f);
      O != null && (D(E, O, f), N ? S = !0 : T = !0);
    }
    if (I.size > 0) {
      const E = S ? 1 : 2;
      if (u) {
        S && T ? console.debug(
          `[${p}] Discovery tier 1+2 result:`,
          I.size,
          "locations (tier 1 + tier 2 top-up)"
        ) : console.debug(
          S ? `[${p}] Discovery tier 1 result:` : `[${p}] Discovery tier 2 result:`,
          I.size,
          "locations"
        );
        for (const [C, N] of I)
          console.debug(`  [${C}] "${N.label}":`, [
            ...N.entities.keys()
          ]);
      }
      return { locations: I, tierUsed: E };
    }
  }
  if (e != null && e.states !== null && e.states !== void 0) {
    let E = null;
    if (typeof c == "function") {
      const C = c(e);
      E = Array.isArray(C) ? C : null;
    } else _ instanceof RegExp && (E = Object.keys(e.states).filter(
      (C) => _.test(C)
    ));
    if (E !== null && E.length > 0) {
      u && console.debug(
        `[${p}] Discovery tier 3 (fallback): found`,
        E.length,
        "candidates"
      );
      for (const C of E) {
        const N = e.states[C];
        if (N == null) continue;
        const H = {
          state: N,
          entry: void 0,
          device: void 0,
          deviceId: void 0,
          entityId: C,
          tier: 3
        };
        if (!g(C, H)) continue;
        const K = w(C, H);
        D(C, K, H);
      }
    }
  }
  if (u) {
    console.debug(
      `[${p}] Discovery final result:`,
      I.size,
      "locations"
    );
    for (const [E, C] of I)
      console.debug(`  [${E}] "${C.label}":`, [...C.entities.keys()]);
  }
  return { locations: I, tierUsed: I.size > 0 ? 3 : 0 };
}
function Dt(e, t, r = {}) {
  if (t == null || !t || e == null || !e.locations)
    return null;
  const { slugExtractor: o, suffixExtras: a = ["", "_j_1"] } = r, i = String(t).toLowerCase(), l = a.map((n) => `_${i}${n}`);
  for (const [n, s] of e.locations)
    for (const d of s.entities.values()) {
      const _ = String(d).toLowerCase();
      if (typeof o == "function") {
        const c = o(d);
        if (c != null && String(c).toLowerCase() === i)
          return [n, s];
      }
      for (const c of l)
        if (_.endsWith(c)) return [n, s];
    }
  return null;
}
function ye(e, t, r = {}) {
  if (e == null || !e.locations)
    return null;
  const o = e.locations;
  if (!t) {
    if (o.size === 0) return null;
    const l = Array.from(o.keys()), d = (l.every((_) => /^\d+$/.test(String(_))) ? l.sort((_, c) => Number(_) - Number(c)) : l.sort())[0];
    return [d, o.get(d)];
  }
  if (o.has(t))
    return [t, o.get(t)];
  const a = String(t).toLowerCase();
  for (const [l, n] of o)
    if (n.label && String(n.label).toLowerCase() === a)
      return [l, n];
  const i = Dt(e, t, r);
  if (i !== null) return i;
  for (const [l, n] of o)
    if (n.label && String(n.label).toLowerCase().includes(a))
      return [l, n];
  return null;
}
function pt(e, t) {
  return Dr(7, e, t);
}
function Dr(e, t, r) {
  const o = e === 7 ? "card.levels" : `card.levels${e}`, a = Array.from(
    { length: e },
    (i, l) => pe(`${o}.${l}`, r)
  );
  return Array.isArray(t) ? a.map((i, l) => {
    const n = t[l];
    return n == null || n === "" ? i : n;
  }) : a;
}
function Go(e) {
  const {
    locationKey: t,
    normalize: r,
    discover: o,
    slugExtractor: a,
    logTag: i,
    manualSlug: l,
    discoveryLookupKey: n,
    recoverStaleConfig: s,
    templateFallback: d
  } = e;
  return function(c, u, h = !1, p = null) {
    const w = /* @__PURE__ */ new Map(), y = c[t], x = c.allergens || [];
    if (y === "manual") {
      const v = Ce(c.entity_prefix);
      for (const g of x) {
        const $ = r(g), j = l ? l($, c) : $, P = Zt(
          u,
          v,
          j,
          c.entity_suffix || ""
        );
        P && (h && console.debug(
          `[${i}:resolveEntityIds] manual allergen: '${g}', slug: '${j}', sensorId: '${P}'`
        ), w.set($, P));
      }
      return w;
    }
    const k = p ?? o(u, h);
    if (k.locations.size > 0) {
      let v = ye(k, y, {
        slugExtractor: a
      });
      if (!v && s && Ke(y) && (v = ye(k, "")), v) {
        const [, g] = v;
        for (const $ of x) {
          const j = r($), P = n ? n(j, c) : j, L = g.entities.get(P);
          L && (h && console.debug(
            `[${i}:resolveEntityIds] discovery allergen: '${$}', lookupKey: '${P}', sensorId: '${L}'`
          ), w.set(j, L));
        }
        if (w.size > 0) return w;
      }
    }
    return d({ cfg: c, hass: u, debug: h, normalize: r });
  };
}
function Ho(e, t, r) {
  const {
    stub: o,
    normalize: a,
    resolveEntityIds: i,
    buildDict: l,
    warnPrefix: n,
    levelNamesBuilder: s,
    useStubDateLocale: d,
    shouldInclude: _,
    onStart: c,
    onDone: u,
    warnOnlyWhenDebug: h
  } = r, p = !!t.debug, { lang: w, locale: y, daysRelative: x, dayAbbrev: k, daysUppercase: v } = Ve(
    e,
    t,
    d ? o.date_locale : void 0
  ), { fullPhrases: g, shortPhrases: $, userLevels: j, userDays: P, noInfoLabel: L } = Ue(t, w), I = s ? s(j, w) : pt(j, w), D = /* @__PURE__ */ new Date();
  D.setHours(0, 0, 0, 0);
  const z = t.days_to_show ?? o.days_to_show, S = t.pollen_threshold ?? o.pollen_threshold, T = {
    lang: w,
    locale: y,
    daysRelative: x,
    dayAbbrev: k,
    daysUppercase: v,
    fullPhrases: g,
    shortPhrases: $,
    userLevels: j,
    userDays: P,
    noInfoLabel: L,
    levelNames: I,
    today: D,
    days_to_show: z,
    pollen_threshold: S,
    debug: p
  };
  c == null || c(t, T);
  const E = i(t, e, p), C = [], N = _ ?? ((K, V) => Fe(K.days, V)), H = t.allergens || [];
  for (const K of H)
    try {
      const V = a(K), M = E.get(V);
      if (!M) continue;
      const b = e.states[M], f = l({
        allergen: K,
        rawKey: V,
        sensorId: M,
        sensor: b,
        entityMap: E,
        hass: e,
        config: t,
        ctx: T
      });
      f && N(f, S) && C.push(f);
    } catch (V) {
      (!h || p) && console.warn(n(K), V);
    }
  return Pe(C, t.sort), u == null || u(C, T), C;
}
function vs(e, t, r) {
  for (; e.length < t; )
    e.push(r(e.length));
  return e;
}
function yi(e, t, r, o) {
  if (e.length >= t)
    return e.slice(0, t);
  const a = e.slice();
  let i = e.length > 0 ? o(e[e.length - 1]) : r;
  for (; a.length < t; ) {
    i = new Date(i.getTime() + 864e5);
    const l = i.getFullYear(), n = String(i.getMonth() + 1).padStart(2, "0"), s = String(i.getDate()).padStart(2, "0");
    a.push(`${l}-${n}-${s}T00:00:00`);
  }
  return a;
}
const ys = [0, 1, 3, 5, 6], bs = [0, 1, 3, 5, 6], ws = [0, 1, 3, 5];
function bi(e) {
  return e < 0 ? e : e < 2 ? Math.floor(e * 6 / 5) : Math.ceil(e * 6 / 5);
}
const ks = 2, zt = {
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
  icon_size: 48,
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
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
};
function xs(e) {
  const t = Me(e);
  if (!t) return null;
  const r = qt.find((o) => _e(o) === t);
  return r || t.charAt(0).toUpperCase() + t.slice(1);
}
function Me(e) {
  const t = "sensor.pollen_";
  if (!e.startsWith(t)) return null;
  const r = e.slice(t.length);
  for (const o of gi) {
    const a = `_${o}`;
    if (r.endsWith(a))
      return r.slice(0, -a.length) || null;
  }
  return null;
}
function Aa(e) {
  const t = "sensor.pollen_";
  if (!e.startsWith(t)) return null;
  const r = e.slice(t.length);
  for (const o of gi) {
    const a = `_${o}`;
    if (r.endsWith(a))
      return ke(o);
  }
  return null;
}
function Ss(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map(), tierUsed: 0 };
  const { locations: r, tierUsed: o } = je(e, {
    platform: ["pollenprognos"],
    /**
     * Strict classifier: derive the canonical allergen key from the entity ID.
     * PP entity IDs follow the pattern sensor.pollen_{city}_{allergen}, but
     * the allergen slug can contain underscores (e.g. "salg_och_viden"), so
     * use a longest-suffix whitelist match rather than splitting on `_`.
     */
    classify: (a) => Aa(a),
    /**
     * isRelevant: quick pre-filter before classify runs.
     */
    isRelevant: (a) => a.startsWith("sensor.pollen_"),
    /**
     * resolveLabel priority:
     *   1. device.name_by_user -- explicit user override.
     *   2. device.name with a leading "Pollenprognos" prefix stripped
     *      ("Pollenprognos Visby" → "Visby"), since the HA integration
     *      packages the city inside a generic device name.
     *   3. device.name as-is (defensive).
     *   4. Prettified city slug from entity ID.
     *   5. "Auto" fallback.
     */
    resolveLabel: (a) => {
      var l, n;
      if ((l = a.device) != null && l.name_by_user) return a.device.name_by_user;
      const i = (n = a.device) == null ? void 0 : n.name;
      if (typeof i == "string" && i.trim()) {
        const s = i.replace(/^\s*pollenprognos\b[\s:\-–—]*/i, "").trim();
        return s || i.trim();
      }
      return xs(a.entityId) || "Auto";
    },
    /**
     * resolveLocationKey:
     *   - Tier 3 (regex fallback): use city slug from entity ID as location key
     *     to preserve backwards compatibility with slug-based city configs.
     *   - Tier 1/2 (device/registry): use config_entry_id as stable location key.
     */
    resolveLocationKey: (a) => {
      var i, l;
      return a.tier === 3 ? Me(a.entityId) || "default" : ((l = (i = a.device) == null ? void 0 : i.config_entries) == null ? void 0 : l[0]) || "default";
    },
    /**
     * fallbackSelector: tier 3 uses the same allergen-suffix whitelist as
     * the classifier so multi-word allergen slugs are matched correctly.
     */
    fallbackSelector: (a) => Object.keys(a.states).filter(
      (i) => Aa(i) !== null
    ),
    debug: t,
    logTag: "PP"
  });
  return { locations: r, tierUsed: o };
}
const Or = Ee(Ss);
function zs(e, t) {
  if (e.city === "manual") return "";
  const r = Ke(e.city) ? "" : e.city;
  let o = ke(r || "");
  if (!o) {
    const a = Object.keys(t.states).filter(
      (i) => Me(i) !== null
    );
    a.length && (o = Me(a[0]) || "");
  }
  return o;
}
function As({
  cfg: e,
  hass: t,
  debug: r
}) {
  const o = /* @__PURE__ */ new Map(), a = zs(e, t);
  for (const i of e.allergens || []) {
    const l = ke(i);
    let n = a ? `sensor.pollen_${a}_${l}` : null;
    if (!n || !t.states[n]) {
      const s = a ? `sensor.pollen_${a}_` : "sensor.pollen_", d = Object.keys(t.states).filter(
        (_) => _.startsWith(s) && _.endsWith(`_${l}`)
      );
      if (d.length === 1) n = d[0];
      else continue;
    }
    r && console.debug(
      `[PP:resolveEntityIds] template fallback allergen: '${i}', rawKey: '${l}', sensorId: '${n}'`
    ), o.set(l, n);
  }
  return o;
}
const wi = Go({
  locationKey: "city",
  normalize: ke,
  discover: Or,
  slugExtractor: Me,
  logTag: "PP",
  templateFallback: As
}), $s = (e) => gt(e, 6, null), It = (e) => ko(e) ?? /* @__PURE__ */ new Date(NaN);
function Ps({
  allergen: e,
  rawKey: t,
  sensorId: r,
  sensor: o,
  config: a,
  ctx: i
}) {
  var p;
  const l = { days: [] };
  l.allergenReplaced = t;
  const { allergenCapitalized: n, allergenShort: s } = De(t, {
    fullPhrases: i.fullPhrases,
    shortPhrases: i.shortPhrases,
    abbreviated: a.allergens_abbreviated,
    lang: i.lang,
    configKey: e
  });
  if (l.allergenCapitalized = n, l.allergenShort = s, !((p = o == null ? void 0 : o.attributes) != null && p.forecast)) throw "Missing forecast";
  l.entity_id = r;
  const d = o.attributes.forecast, _ = Array.isArray(
    d
  ) ? d.reduce(
    (w, y) => {
      const x = y.time || y.datetime;
      return w[x] = y, w;
    },
    {}
  ) : d, u = Object.keys(_).sort(
    (w, y) => It(w).getTime() - It(y).getTime()
  ).filter(
    (w) => It(w).getTime() >= i.today.getTime()
  );
  return yi(
    u,
    i.days_to_show,
    i.today,
    It
  ).forEach((w) => {
    const y = _[w] || {}, x = $s(y.level), k = It(w), v = Math.round((k.getTime() - i.today.getTime()) / 864e5), g = Ne(k, v, {
      daysRelative: i.daysRelative,
      dayAbbrev: i.dayAbbrev,
      daysUppercase: i.daysUppercase,
      userDays: i.userDays,
      lang: i.lang,
      locale: i.locale
    });
    if (x !== null) {
      const $ = {
        name: l.allergenCapitalized,
        day: g,
        state: x,
        // display_state mirrors state: PP has no separate display value, so the
        // contract's always-present display_state carries the same level.
        display_state: x,
        state_text: i.levelNames[x]
      };
      l.days.push($);
    } else if (i.pollen_threshold === 0) {
      const $ = {
        name: l.allergenCapitalized,
        day: g,
        state: -1,
        display_state: -1,
        state_text: i.noInfoLabel
      };
      l.days.push($);
    }
  }), l;
}
async function Ms(e, t) {
  return Ho(e, t, {
    stub: zt,
    normalize: ke,
    resolveEntityIds: wi,
    buildDict: Ps,
    warnPrefix: (r) => `[PP] Error for allergen ${r}:`,
    onStart: (r, o) => {
      o.debug && console.debug("PP.fetchForecast — start", {
        city: r.city,
        lang: o.lang
      });
    },
    onDone: (r, o) => {
      o.debug && console.debug("PP.fetchForecast — done", r);
    }
  });
}
const Cs = {
  priority: 0,
  detectStates(e, t) {
    return { ids: t.stateIds.filter((o) => {
      if (typeof o != "string" || !o.startsWith("sensor.pollen_") || o.startsWith("sensor.pollenflug_") || o.includes("_level_at_")) return !1;
      const a = /^sensor\.pollen_([^_]+)(_.*)?$/.exec(o);
      if (!a) return !1;
      const i = a[1] ?? "";
      return !(!a[2] && t.pluAllergenSlugs.has(i));
    }) };
  },
  discover: Or,
  extractLocationSlug: Me
}, Es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  autodetect: Cs,
  discoverPpSensors: Or,
  extractCitySlugFromEntityId: Me,
  fetchForecast: Ms,
  resolveEntityIds: wi,
  stubConfigPP: zt
}, Symbol.toStringTag, { value: "Module" })), Ls = "state_tomorrow", Is = "state_in_2_days", Ts = "state_today_desc", Ns = "state_tomorrow_desc", js = "state_in_2_days_desc", Br = {
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
  icon_size: 48,
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
  date_locale: void 0,
  title: void 0,
  phrases: {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: ""
  }
}, He = /^sensor\.(?:\w+_)*pollenflug_([a-z]+)_(\d+)$/;
function Cr(e) {
  var t;
  return ((t = e.match(He)) == null ? void 0 : t[2]) || null;
}
function $a(e) {
  var t;
  return ((t = e.match(He)) == null ? void 0 : t[1]) || null;
}
function Rs(e) {
  const t = Cr(e);
  return t === null ? null : $r[Number(t)] || `Region ${t}`;
}
function Ds(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map(), tierUsed: 0 };
  const { locations: r, tierUsed: o } = je(e, {
    platform: ["dwd_pollenflug", "pollenflug"],
    /**
     * Strict classifier: derive the normalized allergen key from the entity ID.
     * Accepts both the bare shape (sensor.pollenflug_<allergen>_<region>)
     * and the device-prefixed shape HA produces when a device-name slug
     * is prepended (e.g. sensor.pollenflug_gefahrenindex_pollenflug_<allergen>_<region>).
     * DWD allergens are single lowercase tokens, so the inner anchor in
     * DWD_ENTITY_ID_RE prevents misclassification when the device-name
     * happens to repeat "pollenflug". (#217)
     */
    classify: (i) => {
      const l = $a(i);
      return l ? Te(l) : null;
    },
    classifyRelaxed: (i) => {
      const l = $a(i);
      return l ? Te(l) : null;
    },
    /**
     * isRelevant: quick pre-filter before classify runs. The integration's
     * own naming segment ("pollenflug_<allergen>_<region>") may sit anywhere
     * in the entity ID after an optional device-name prefix, so check the
     * full pattern rather than just the entity-ID start.
     */
    isRelevant: (i) => He.test(i),
    /**
     * resolveLabel priority:
     *   1. device.name_by_user -- explicit user override always wins.
     *   2. Region name derived from the numeric suffix in the entity ID.
     *      The DWD integration sets a generic device.name ("Pollenflug
     *      Gefahrenindex") that is identical for every region, so region
     *      derivation must outrank device.name to produce usable titles.
     *   3. device.name -- last-resort generic label.
     *   4. "Auto" fallback.
     */
    resolveLabel: (i) => {
      var n, s;
      if ((n = i.device) != null && n.name_by_user) return i.device.name_by_user;
      const l = Rs(i.entityId);
      return l || ((s = i.device) != null && s.name ? i.device.name : "Auto");
    },
    /**
     * resolveLocationKey:
     *   - Tier 3 (regex fallback): use the numeric region ID as the location key
     *     so that cfg.region_id = "50" resolves directly via exact key match.
     *   - Tier 1/2 (device/registry): use config_entry_id as stable location key.
     */
    resolveLocationKey: (i) => {
      var l, n;
      return i.tier === 3 ? Cr(i.entityId) || "default" : ((n = (l = i.device) == null ? void 0 : l.config_entries) == null ? void 0 : n[0]) || "default";
    },
    /**
     * fallbackRegex: matches the integration's own pollenflug_<allergen>_<id>
     * segment whether or not HA has prepended a device-name slug.
     */
    fallbackRegex: He,
    debug: t,
    logTag: "DWD"
  }), a = /* @__PURE__ */ new Map();
  for (const i of r.values())
    a.set(i.label, (a.get(i.label) || 0) + 1);
  for (const i of r.values()) {
    if ((a.get(i.label) || 0) <= 1) continue;
    const l = i.entities.values().next().value, n = l ? Cr(l) : null;
    n && (i.label = `${i.label} (${n})`);
  }
  return { locations: r, tierUsed: o };
}
const Gr = Ee(Ds);
function Os({
  cfg: e,
  hass: t,
  debug: r
}) {
  const o = /* @__PURE__ */ new Map(), a = e.region_id;
  for (const i of e.allergens || []) {
    const l = Te(i);
    let n = null;
    if (a) {
      const s = `sensor.pollenflug_${l}_${a}`;
      t.states[s] && (n = s);
    }
    if (!n) {
      const s = Object.keys(t.states).filter((d) => {
        const _ = d.match(He);
        return !_ || _[1] !== l ? !1 : a ? _[2] === String(a) : !0;
      });
      s.length === 1 ? n = s[0] : s.length > 1 && r && console.debug(
        `[DWD:resolveEntityIds] template fallback ambiguous for '${i}' (${s.length} candidates); skipping`
      );
    }
    n && (r && console.debug(
      `[DWD:resolveEntityIds] template fallback allergen: '${i}', rawKey: '${l}', sensorId: '${n}'`
    ), o.set(l, n));
  }
  return o;
}
const ki = Go({
  locationKey: "region_id",
  normalize: Te,
  discover: Gr,
  slugExtractor: Cr,
  logTag: "DWD",
  // Stale-config recovery: a saved ULID region_id from a removed/renamed
  // integration won't be in the discovered locations. Retry with autodetect
  // semantics so the card still finds sensors instead of silently going empty
  // and then template-falling back to "sensor.pollenflug_*_{ULID}".
  recoverStaleConfig: !0,
  templateFallback: Os
}), co = (e) => gt(e, null, -1);
function Bs({
  allergen: e,
  rawKey: t,
  sensorId: r,
  sensor: o,
  config: a,
  ctx: i
}) {
  const l = {};
  l.allergenReplaced = t;
  const { allergenCapitalized: n, allergenShort: s } = De(t, {
    fullPhrases: i.fullPhrases,
    shortPhrases: i.shortPhrases,
    abbreviated: a.allergens_abbreviated,
    lang: i.lang,
    configKey: e
  });
  l.allergenCapitalized = n, l.allergenShort = s, l.entity_id = r;
  const d = o.attributes, _ = co(o.state), c = co(d[Ls]), u = co(d[Is]), h = i.today, p = [
    { date: h, level: _ },
    { date: new Date(h.getTime() + 864e5), level: c },
    { date: new Date(h.getTime() + 2 * 864e5), level: u }
  ];
  return vs(p, i.days_to_show, (w) => ({
    date: new Date(h.getTime() + w * 864e5),
    level: -1
  })), l.days = [], p.forEach((w, y) => {
    if (w.level !== null && w.level >= 0) {
      const x = Math.round((w.date.getTime() - h.getTime()) / 864e5), k = Ne(w.date, x, {
        daysRelative: i.daysRelative,
        dayAbbrev: i.dayAbbrev,
        daysUppercase: i.daysUppercase,
        userDays: i.userDays,
        lang: i.lang,
        locale: i.locale
      }), v = d[y === 0 ? Ts : y === 1 ? Ns : js] || "", g = w.level * ks, $ = Math.min(Math.max(Math.round(g), 0), 6), j = $ < 0 ? i.noInfoLabel : i.levelNames[$] || v, P = {
        name: l.allergenCapitalized,
        day: k,
        state: w.level,
        display_state: g,
        state_text: j
      };
      l.days.push(P);
    }
  }), l;
}
async function Gs(e, t) {
  return Ho(e, t, {
    stub: Br,
    normalize: Te,
    resolveEntityIds: ki,
    buildDict: Bs,
    useStubDateLocale: !0,
    warnPrefix: (r) => `DWD adapter error for allergen ${r}:`,
    onStart: (r, o) => {
      o.debug && console.debug("DWD adapter: start fetchForecast", {
        config: r,
        lang: o.lang
      });
    },
    onDone: (r, o) => {
      o.debug && console.debug("DWD adapter complete sensors:", r);
    }
  });
}
const Hs = {
  priority: 3,
  detectStates(e, t) {
    return { ids: t.stateIds.filter(
      (o) => typeof o == "string" && He.test(o)
    ) };
  },
  discover: Gr,
  extractLocationSlug: (e) => {
    var t;
    return ((t = e.match(He)) == null ? void 0 : t[2]) || null;
  }
}, Ks = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DWD_ENTITY_ID_RE: He,
  autodetect: Hs,
  discoverDwdSensors: Gr,
  fetchForecast: Gs,
  resolveEntityIds: ki,
  stubConfigDWD: Br
}, Symbol.toStringTag, { value: "Module" })), nr = {
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
    "dock_sorrel",
    "elm",
    "grasses",
    "hazel",
    "linden",
    "fungal_spores",
    "mugwort",
    "nettle_family",
    "oak",
    "olive",
    "plane_tree",
    "plantain",
    "ragweed",
    "rye",
    "sweet_chestnut",
    "tree_of_heaven",
    "willow"
  ],
  minimal: !1,
  minimal_gap: 35,
  mode: "daily",
  background_color: "",
  icon_size: 48,
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
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
}, Qt = [
  "allergy_risk",
  ...nr.allergens
], Ye = "sensor.polleninformation_", Fs = {
  hourly: 1,
  hourly_second: 2,
  hourly_third: 3,
  hourly_fourth: 4,
  hourly_sixth: 6,
  hourly_eighth: 8,
  twice_daily: 12
}, xi = (e) => e;
function Ko(e) {
  return e.mode || nr.mode;
}
const Us = [
  ...Qt,
  "allergy_risk_hourly"
].sort((e, t) => t.length - e.length);
function Er(e) {
  if (!e.startsWith(Ye)) return null;
  const t = e.substring(Ye.length);
  for (const r of Us) {
    const o = `_${r}`;
    if (t.endsWith(o) && t.length > o.length)
      return r;
  }
  return null;
}
function Hr(e, t) {
  if (!e.startsWith(Ye)) return null;
  const r = e.substring(Ye.length), o = `_${t}`;
  return !r.endsWith(o) || r.length <= o.length ? null : r.slice(0, r.length - o.length);
}
function We(e) {
  const t = Er(e);
  return t ? Hr(e, t) : null;
}
function Vs(e) {
  const t = We(e);
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : null;
}
function Ws(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map(), tierUsed: 0 };
  const { locations: r, tierUsed: o } = je(e, {
    platform: ["polleninformation"],
    /**
     * Strict classifier: use the whitelist to extract the allergen key.
     * Returns null for entity IDs that do not match any known allergen.
     */
    classify: (a) => Er(a),
    classifyRelaxed: (a) => Er(a),
    /**
     * isRelevant: quick pre-filter before classify runs.
     */
    isRelevant: (a) => a.startsWith(Ye),
    /**
     * resolveLabel priority:
     *   1. device.name_by_user -- explicit user override.
     *   2. state.attributes.location_title -- integration's clean location
     *      name when exposed.
     *   3. device.name with the "Polleninformation " prefix stripped and
     *      parenthesised wrappers unwrapped ("Polleninformation (Hamburg)"
     *      → "Hamburg"), since the HA integration often packages the
     *      location inside a generic device name.
     *   4. device.name as-is (uncommon but defensive).
     *   5. Prettified location slug from entity ID.
     *   6. "Auto" fallback.
     */
    resolveLabel: (a) => {
      var n, s, d, _;
      if ((n = a.device) != null && n.name_by_user) return a.device.name_by_user;
      const i = (d = (s = a.state) == null ? void 0 : s.attributes) == null ? void 0 : d.location_title;
      if (typeof i == "string" && i.trim())
        return i.trim();
      const l = (_ = a.device) == null ? void 0 : _.name;
      if (typeof l == "string" && l.trim()) {
        const c = l.replace(/^\s*polleninformation\b[\s:\-–—]*/i, "").trim(), u = c.match(/^\(([^)]+)\)$/);
        return u != null && u[1] ? u[1].trim() : c || l.trim();
      }
      return Vs(a.entityId) || "Auto";
    },
    /**
     * resolveLocationKey:
     *   - Tier 3 (state fallback): use location slug from entity ID as key
     *     so that cfg.location = "wien" matches directly via exact key match.
     *   - Tier 1/2 (device/registry): use config_entry_id as stable location key.
     */
    resolveLocationKey: (a) => {
      var i, l;
      return a.tier === 3 ? We(a.entityId) || "default" : ((l = (i = a.device) == null ? void 0 : i.config_entries) == null ? void 0 : l[0]) || "default";
    },
    /**
     * fallbackRegex: matches all PEU entity IDs; classifier filters further.
     */
    fallbackRegex: /^sensor\.polleninformation_.+$/,
    debug: t,
    logTag: "PEU"
  });
  return { locations: r, tierUsed: o };
}
const Kr = Ee(Ws);
function Si(e, t) {
  if (e.location === "manual") return "";
  const r = Ke(e.location) ? "" : e.location;
  let o = _e(r || "");
  if (!o) {
    const a = Object.keys(t.states).filter(
      (i) => i.startsWith("sensor.polleninformation_")
    );
    if (a.length) {
      const i = (e.allergens || []).slice().sort((n, s) => s.length - n.length), l = a.map(
        (n) => We(n) ?? i.map((s) => Hr(n, s)).find((s) => !!s)
      ).find((n) => !!n);
      if (l)
        o = l;
      else {
        const n = a[0].match(
          /^sensor\.polleninformation_(.+)_[^_]+$/
        );
        o = (n == null ? void 0 : n[1]) ?? "";
      }
    }
  }
  return o;
}
function qs({
  cfg: e,
  hass: t,
  debug: r
}) {
  const o = /* @__PURE__ */ new Map(), a = Ko(e), i = Si(e, t), l = Object.keys(t.states).filter(
    (n) => n.startsWith(Ye)
  );
  for (const n of e.allergens || []) {
    const s = n;
    let d;
    if (a !== "daily" && s === "allergy_risk" ? d = i ? `${Ye}${i}_allergy_risk_hourly` : null : d = i ? `${Ye}${i}_${s}` : null, !d || !t.states[d]) {
      const _ = a !== "daily" && s === "allergy_risk" ? "allergy_risk_hourly" : s, c = l.filter((u) => {
        const h = Hr(u, _);
        return h === null ? !1 : !i || h === i;
      });
      if (c.length === 1) d = c[0];
      else continue;
    }
    r && console.debug(
      `[PEU:resolveEntityIds] template fallback allergen: '${n}', locationSlug: '${i}', sensorId: '${d}'`
    ), o.set(s, d);
  }
  return o;
}
const zo = (e, t) => Ko(t) !== "daily" && e === "allergy_risk" ? "allergy_risk_hourly" : e, Zs = Go({
  locationKey: "location",
  normalize: xi,
  discover: Kr,
  slugExtractor: We,
  logTag: "PEU",
  manualSlug: zo,
  discoveryLookupKey: zo,
  templateFallback: qs
});
function Qs(e, t, r) {
  const o = /* @__PURE__ */ new Map();
  if (e.location === "manual") {
    const l = Ce(e.entity_prefix), n = e.entity_suffix || "", s = `sensor.${l}`;
    for (const d of Object.keys(t.states)) {
      if (!d.startsWith(s) || !d.endsWith(n)) continue;
      const _ = d.slice(s.length, d.length - n.length);
      _ && o.set(_, d);
    }
    return o;
  }
  const a = r ? ye(r, e.location, {
    slugExtractor: We
  }) : null;
  if (a) return a[1].entities;
  const i = Si(e, t);
  for (const l of Object.keys(t.states)) {
    const n = Er(l);
    n && (i && Hr(l, n) !== i || o.set(n, l));
  }
  return o;
}
function zi(e, t, r = !1, o = null) {
  const a = !t || e.location === "manual" ? null : o ?? Kr(t, r), i = Zs(e, t, r, a), n = (e.allergens || []).filter((_) => !i.has(_));
  if (n.length === 0 || !t) return i;
  const s = Qs(e, t, a), d = new Set(i.values());
  for (const _ of n) {
    const c = we(zo(_, e));
    for (const [u, h] of s)
      if (!d.has(h) && we(u) === c) {
        r && console.debug(
          `[PEU:resolveEntityIds] canonical fallback allergen: '${_}', canonical: '${c}', sensorId: '${h}'`
        ), i.set(_, h), d.add(h);
        break;
      }
  }
  return i;
}
const Ys = (e) => gt(e, 4, -1), Pa = (e) => Number.isFinite(e) ? Math.max(0, Math.min(Math.round(e), 4)) : -1;
function Ma(e, t) {
  if (e !== "allergy_risk" || t == null || t === "") return null;
  const r = Number(t);
  return Number.isFinite(r) ? r : null;
}
function Js({
  rawKey: e,
  sensorId: t,
  sensor: r,
  config: o,
  ctx: a
}) {
  const i = e, l = { days: [] };
  l.allergenReplaced = i;
  const { allergenCapitalized: n, allergenShort: s } = De(
    i,
    {
      fullPhrases: a.fullPhrases,
      shortPhrases: a.shortPhrases,
      abbreviated: o.allergens_abbreviated,
      lang: a.lang
    }
  );
  l.allergenCapitalized = n, l.allergenShort = s, l.entity_id = t;
  const d = r == null ? void 0 : r.attributes, _ = (d == null ? void 0 : d.data_stale) === !0, c = Array.isArray(d == null ? void 0 : d.forecast) && d.forecast.length > 0;
  if (_ || !c)
    return l.stale = !0, l.staleSince = (d == null ? void 0 : d.stale_since) || null, l.days = [], l;
  const u = d.forecast, h = Ko(o);
  if (h !== "daily" && i === "allergy_risk") {
    const v = Fs[h] || 1, g = Math.min(
      Math.floor(u.length / v),
      a.days_to_show
    );
    for (let $ = 0; $ < g; ++$) {
      const j = u[$ * v] || {};
      let P, L = null;
      const I = j.time ? new Date(j.time) : j.datetime ? new Date(j.datetime) : new Date(a.today.getTime() + $ * v * 36e5);
      h === "twice_daily" ? (P = I.toLocaleDateString(a.locale, { weekday: "short" }).replace(/^./, (E) => E.toUpperCase()), a.daysUppercase && (P = P.toUpperCase()), L = $ % 2 === 0 ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down") : P = I.toLocaleTimeString(a.locale, {
        hour: "2-digit",
        minute: "2-digit"
      }) || "";
      const D = Number(j.numeric_state ?? j.level ?? -1), z = Ma(
        i,
        j.numeric_state_raw ?? j.level_raw
      ), S = Pa(D), T = {
        name: l.allergenCapitalized,
        day: P,
        icon: L,
        state: D,
        display_state: D,
        raw_value: z,
        state_text: S < 0 ? a.noInfoLabel : a.levelNames[S] || a.noInfoLabel
      };
      l.days.push(T);
    }
    return l;
  }
  const p = u.reduce(
    (v, g) => {
      const $ = g.time || g.datetime;
      return v[$] = g, v;
    },
    {}
  ), w = (v) => new Date(v), x = Object.keys(p).sort(
    (v, g) => w(v).getTime() - w(g).getTime()
  ).filter(
    (v) => w(v).getTime() >= a.today.getTime()
  );
  return yi(
    x,
    a.days_to_show,
    a.today,
    w
  ).forEach((v) => {
    const g = p[v] || {}, $ = Ys(g.level), j = Ma(
      i,
      g.numeric_state_raw ?? g.level_raw
    );
    if ($ !== null && $ >= 0) {
      const P = w(v), L = Math.round((P.getTime() - a.today.getTime()) / 864e5), I = Ne(P, L, {
        daysRelative: a.daysRelative,
        dayAbbrev: a.dayAbbrev,
        daysUppercase: a.daysUppercase,
        userDays: a.userDays,
        lang: a.lang,
        locale: a.locale
      }), D = Pa($), z = {
        name: l.allergenCapitalized,
        day: I,
        state: $,
        display_state: $,
        raw_value: j,
        state_text: D < 0 ? a.noInfoLabel : a.levelNames[D] || a.noInfoLabel
      };
      l.days.push(z);
    }
  }), l;
}
async function Xs(e, t) {
  return Ho(e, t, {
    stub: nr,
    normalize: xi,
    resolveEntityIds: zi,
    buildDict: Js,
    warnPrefix: (r) => `[PEU] Error for allergen ${r}:`,
    warnOnlyWhenDebug: !0,
    // PEU is natively five-level (0-4: None/Low/Medium/High/Very High). Earlier
    // versions stretched native states onto the seven-bucket card.levels palette
    // via a [0,1,3,5,6] runtime spread. Now that card.levels5.0..4 exists in
    // every locale (added in 3.2.0 for MSW), names are looked up at native
    // indices instead.
    // Backwards compat: legacy configs that supplied seven custom phrases
    // (phrases.levels length 7) had their entries placed at indices 0,1,3,5,6
    // of the seven-bucket array under the spread. Extracting those positions
    // (PEU_LEGACY_PHRASE_INDICES) preserves the user-visible labels exactly.
    // TODO(#259-normalize): retire the length-7 remap once no legacy configs
    // carry seven-entry phrases.levels.
    levelNamesBuilder: (r, o) => {
      let a = r;
      return Array.isArray(r) && r.length === 7 && (a = bs.map(
        (i) => r[i]
      )), Dr(5, a, o);
    },
    // Stale PEU sensors carry no days but must always be shown; otherwise apply
    // the standard threshold filter.
    shouldInclude: (r, o) => r.stale === !0 || o === 0 || r.days.some((a) => a.state >= o),
    onDone: (r, o) => {
      if (t.allergy_risk_top) {
        const a = r.findIndex(
          (i) => i.allergenReplaced === "allergy_risk" || i.allergenReplaced === "index"
        );
        if (a > 0) {
          const [i] = r.splice(a, 1);
          r.unshift(i);
        }
      }
      o.debug && console.debug("PEU.fetchForecast — done", r);
    }
  });
}
const ed = {
  priority: 2,
  detectStates(e, t) {
    return { ids: t.stateIds.filter(
      (o) => typeof o == "string" && o.startsWith("sensor.polleninformation_")
    ) };
  },
  discover: Kr,
  extractLocationSlug: We
}, td = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PEU_ALLERGENS: Qt,
  autodetect: ed,
  discoverPeuSensors: Kr,
  extractPeuLocationSlugFromEntityId: We,
  fetchForecast: Xs,
  resolveEntityIds: zi,
  stubConfigPEU: nr
}, Symbol.toStringTag, { value: "Module" })), rd = { nl: { els: "alder", berk: "birch", gras: "grass", hazelaar: "hazel", bijvoet: "mugwort", olijf: "olive", ambrosia: "ragweed", index: "allergy_risk" }, de: { erle: "alder", birke: "birch", gras: "grass", hasel: "hazel", beifu: "mugwort", ambrosia: "ragweed", index: "allergy_risk" }, ru: {}, fi: { leppa: "alder", koivu: "birch", heina: "grass", pahkinaleppa: "hazel", siankarsamo: "mugwort", oliivi: "olive", ambrosia: "ragweed", index: "allergy_risk" }, sk: { jelsa: "alder", breza: "birch", trava: "grass", lieska: "hazel", palina: "mugwort", olivovnik: "olive", ambrozia: "ragweed", index: "allergy_risk" }, en: { alder: "alder", birch: "birch", grass: "grass", hazel: "hazel", mugwort: "mugwort", olive: "olive", ragweed: "ragweed", index: "allergy_risk" }, it: { ontano: "alder", betulla: "birch", erba: "grass", nocciolo: "hazel", artemisia: "mugwort", oliva: "olive", ambrosia: "ragweed", index: "allergy_risk" }, cs: { olse: "alder", briza: "birch", trava: "grass", liska: "hazel", pelynek: "mugwort", olivovnik: "olive", ambrozie: "ragweed", index: "allergy_risk" }, no: { al: "alder", bjrk: "birch", gress: "grass", hassel: "hazel", malurt: "mugwort", oliven: "olive", ambrosia: "ragweed", index: "allergy_risk" }, da: { al: "alder", birk: "birch", grs: "grass", hassel: "hazel", malurt: "mugwort", oliven: "olive", ambrosia: "ragweed", index: "allergy_risk" }, sv: { al: "alder", bjork: "birch", gras: "grass", hassel: "hazel", malort: "mugwort", oliv: "olive", ambrosia: "ragweed", index: "allergy_risk" } }, od = { alder: { nl: "Els", de: "Erle", ru: "Ольха", fi: "Leppä", sk: "Jelša", en: "Alder", it: "Ontano", cs: "Olše", no: "Al", da: "Al", sv: "Al" }, birch: { nl: "Berk", de: "Birke", ru: "Берёза", fi: "Koivu", sk: "Breza", en: "Birch", it: "Betulla", cs: "Bříza", no: "Bjørk", da: "Birk", sv: "Björk" }, grass: { nl: "Gras", de: "Gras", ru: "Трава", fi: "Heinä", sk: "Tráva", en: "Grass", it: "Erba", cs: "Tráva", no: "Gress", da: "Græs", sv: "Gräs" }, hazel: { nl: "Hazelaar", de: "Hasel", ru: "Лещина", fi: "Pähkinäleppä", sk: "Lieska", en: "Hazel", it: "Nocciolo", cs: "Líska", no: "Hassel", da: "Hassel", sv: "Hassel" }, mugwort: { nl: "Bijvoet", de: "Beifuß", ru: "Полынь", fi: "Siankärsämö", sk: "Palina", en: "Mugwort", it: "Artemisia", cs: "Pelyněk", no: "Malurt", da: "Malurt", sv: "Malört" }, olive: { nl: "Olijf", de: "Olive", ru: "Олива", fi: "Oliivi", sk: "Olivovník", en: "Olive", it: "Oliva", cs: "Olivovník", no: "Oliven", da: "Oliven", sv: "Oliv" }, ragweed: { nl: "Ambrosia", de: "Ambrosia", ru: "Амброзия", fi: "Ambrosia", sk: "Ambrózia", en: "Ragweed", it: "Ambrosia", cs: "Ambrózie", no: "Ambrosia", da: "Ambrosia", sv: "Ambrosia" }, allergy_risk: { nl: "Index", de: "Index", ru: "Index", fi: "Index", sk: "Index", en: "Index", it: "Index", cs: "Index", no: "Index", da: "Index", sv: "Index" } }, ad = { nl: ["forecast", "forecast_beta"], de: ["forecast", "pollen_vorhersage_beta"], ru: ["forecast", "beta"], fi: ["forecast", "siitepolyennuste_beta"], sk: ["forecast", "predpoved_beta"], en: ["forecast", "pollen_forecast_beta"], it: ["forecast", "previsione_del_polline_beta"], cs: ["forecast", "predpoved_beta"], no: ["forecast", "pollenprognose_beta"], da: ["forecast", "pollenprognose_beta"], sv: ["forecast", "pollenprognos_beta"] }, Je = {
  mapping: rd,
  names: od,
  weather_suffixes: ad
}, Nt = Je;
function Ca(e, { entry: t }) {
  if (!t || e.startsWith("weather.") || t.translation_key === "forecast")
    return null;
  const r = t.translation_key;
  if (!r) return null;
  for (const o of Object.values(Nt.mapping))
    if (o[r]) return o[r];
  return null;
}
function _o(e) {
  return typeof e != "string" ? e : e.replace(/^\s*silam\s*pollen\b[\s:\-–—]*/i, "").trim() || e;
}
function id(e, t = !1) {
  var l;
  const r = { locations: /* @__PURE__ */ new Map() };
  if (!(e != null && e.entities)) return r;
  const { locations: o } = je(e, {
    platform: "silam_pollen",
    classify: Ca,
    classifyRelaxed: Ca,
    resolveLabel: (n) => {
      var s, d, _, c;
      return (s = n.device) != null && s.name_by_user ? n.device.name_by_user : (d = n.device) != null && d.name ? _o(n.device.name) : (c = (_ = n.state) == null ? void 0 : _.attributes) != null && c.friendly_name ? _o(n.state.attributes.friendly_name) : "Auto";
    },
    fallbackRegex: null,
    debug: t,
    logTag: "SILAM"
  }), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const [n, s] of Object.entries(e.entities))
    if (s.platform === "silam_pollen" && (n.startsWith("weather.") || s.translation_key === "forecast")) {
      const d = s.device_id;
      if (d && (a.set(d, n), !i.has(d))) {
        const _ = (l = e.devices) == null ? void 0 : l[d], c = ir(_), u = (_ == null ? void 0 : _.name_by_user) || (_ != null && _.name ? _o(_.name) : null) || "Auto";
        i.set(d, { configEntryId: c, label: u });
      }
    }
  if (o.size === 0 && a.size === 0) return r;
  for (const [n, s] of o) {
    const d = s.deviceId && a.get(s.deviceId) || null;
    r.locations.set(n, {
      label: s.label,
      weatherEntity: d,
      sensors: s.entities
    });
  }
  for (const [n, s] of a) {
    const d = i.get(n);
    if (!d) continue;
    const { configEntryId: _, label: c } = d;
    r.locations.has(_) || r.locations.set(_, {
      label: c,
      weatherEntity: s,
      sensors: /* @__PURE__ */ new Map()
    });
  }
  if (t) {
    console.debug(
      "[SILAM] Discovery result:",
      r.locations.size,
      "locations"
    );
    for (const [n, s] of r.locations)
      console.debug(
        `  [${n}] "${s.label}": weather=${s.weatherEntity}, sensors:`,
        [...s.sensors.keys()]
      );
  }
  return r;
}
const _t = Ee(id);
function lr(e, t, r = !1) {
  var o;
  if (!((o = e == null ? void 0 : e.locations) != null && o.size)) return null;
  if (Ke(t)) {
    const a = t;
    return e.locations.has(a) ? e.locations.get(a) ?? null : (r && console.debug(
      "[SILAM] Stale config_entry_id, falling back to first location:",
      t
    ), e.locations.values().next().value ?? null);
  }
  if (t) {
    const a = t.toLowerCase();
    for (const [, i] of e.locations)
      if (i.label.toLowerCase().includes(a))
        return i;
    return r && console.debug(
      "[SILAM] Discovery: explicit location not matched:",
      t
    ), null;
  }
  return e.locations.values().next().value ?? null;
}
function Ai(e, t, r, o = !1, a = null) {
  var u, h, p;
  if (!e) return null;
  const i = a || _t(e, o), l = lr(i, t, o);
  if (l != null && l.weatherEntity) return l.weatherEntity;
  if (!t || Ke(t)) return null;
  const n = t.toLowerCase(), s = /* @__PURE__ */ new Set(), d = ((u = Nt.weather_suffixes) == null ? void 0 : u[r]) || ((h = Nt.weather_suffixes) == null ? void 0 : h[(r == null ? void 0 : r.split("-")[0]) ?? ""]) || [];
  for (const w of d) {
    s.add(w);
    const y = `weather.silam_pollen_${n}_${w}`;
    if (y in e.states) return y;
  }
  for (const w of ((p = Nt.weather_suffixes) == null ? void 0 : p.en) || []) {
    if (s.has(w)) continue;
    s.add(w);
    const y = `weather.silam_pollen_${n}_${w}`;
    if (y in e.states) return y;
  }
  const _ = Array.from(
    new Set(Object.values(Nt.weather_suffixes).flat())
  );
  for (const w of _) {
    if (s.has(w)) continue;
    const y = `weather.silam_pollen_${n}_${w}`;
    if (y in e.states) return y;
  }
  const c = `weather.silam_pollen_${n}_`;
  return Object.keys(e.states).find((w) => w.startsWith(c)) || null;
}
const vt = Je, yt = {
  integration: "silam",
  location: "",
  // Optional entity naming used when location is "manual".
  // entity_weather is an optional override that points at the weather.*
  // entity emitting forecast events (SILAM derives per-allergen levels
  // from its forecast attribute). When omitted, manual mode falls back
  // to weather-entity discovery using entity_prefix as a hint; set
  // entity_weather explicitly only when that discovery picks the wrong
  // entity. Ignored outside manual mode.
  entity_prefix: "",
  entity_suffix: "",
  entity_weather: "",
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
  icon_size: 48,
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
  // Summary block (issue #222): opt-in, additive, never duplicates by default.
  show_summary_block: !1,
  show_summary_row: !1,
  show_summary_separator: !0,
  allergens_abbreviated: !1,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
}, $i = [
  ...yt.allergens,
  "index"
], Pi = {
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
function br(e, t) {
  const r = Pi[e];
  return !r || isNaN(t) ? -1 : t < r[0] ? 0 : t < r[1] ? 1 : t < r[2] ? 2 : t < r[3] ? 3 : t < r[4] ? 4 : t < r[5] ? 5 : 6;
}
function wr(e) {
  if (e == null) return -1;
  const t = ys, r = {
    very_low: 0,
    low: 1,
    moderate: 2,
    high: 3,
    very_high: 4
  };
  if (typeof e == "string") {
    const a = r[e.toLowerCase()];
    return a == null ? -1 : t[Math.max(0, Math.min(a, 4))];
  }
  const o = Number(e);
  if (!isNaN(o)) {
    const a = Math.max(0, Math.min(Math.round(o), 4));
    return t[a];
  }
  return -1;
}
function Mi(e, t, r, o) {
  const a = we(e);
  let i;
  const l = Mr(t, e, a);
  l ? i = l : vt.names && vt.names[e] && vt.names[e][o] ? i = vt.names[e][o] : i = e.charAt(0).toUpperCase() + e.slice(1);
  const n = Mr(r, e, a) || i;
  return { allergenCapitalized: i, allergenShort: n };
}
function Ci(e, t, r = !1, o = null) {
  var _;
  const a = /* @__PURE__ */ new Map(), i = e.location === "manual" ? "" : e.location || "", l = i.toLowerCase(), n = o || _t(t, r), s = lr(
    n,
    i,
    r
  ), d = Object.values(
    vt.mapping
  ).map(
    (c) => Object.entries(c).reduce(
      (u, [h, p]) => (u[p] = h, u),
      {}
    )
  );
  for (const c of e.allergens || []) {
    const u = ke(c), h = we(u);
    let p = null;
    if (e.location === "manual") {
      const w = Ce(e.entity_prefix), y = e.entity_suffix || "";
      if (p = Zt(t, w, h, y), !p) {
        for (const x of d)
          if (x[h] && x[h] !== h && (p = Zt(
            t,
            w,
            x[h],
            y
          ), p))
            break;
      }
    } else (_ = s == null ? void 0 : s.sensors) != null && _.size && (p = s.sensors.get(h) || null, p && !t.states[p] && (p = null));
    if (!p && e.location !== "manual") {
      for (const w of d)
        if (w[h]) {
          const y = `sensor.silam_pollen_${l}_${w[h]}`;
          if (t.states[y]) {
            p = y;
            break;
          }
        }
      if (!p) {
        const w = `sensor.silam_pollen_${l}_${h}`;
        t.states[w] && (p = w);
      }
    }
    r && console.debug(
      `[SILAM:resolveEntityIds] allergen: '${h}', sensorId: '${p}'`
    ), p && a.set(h, p);
  }
  return a;
}
async function nd(e, t, r = null) {
  var V, M;
  const o = !!t.debug, a = o ? performance.now() : 0, { lang: i, locale: l, daysRelative: n, dayAbbrev: s, daysUppercase: d } = Ve(e, t), { fullPhrases: _, shortPhrases: c, userLevels: u, userDays: h, noInfoLabel: p } = Ue(t, i), w = pt(
    u,
    i
  ), y = /* @__PURE__ */ new Date();
  y.setHours(0, 0, 0, 0);
  const x = t.days_to_show ?? yt.days_to_show, k = t.pollen_threshold ?? yt.pollen_threshold;
  let v;
  t.location === "manual" && t.entity_prefix ? v = Ce(t.entity_prefix).replace(/_$/, "").replace(/^silam_pollen_/, "") : t.location === "manual" ? v = "" : v = t.location || "";
  const g = t.entity_weather, $ = typeof g == "string" && g.length > 0 ? g : null, j = t.location === "manual" && $ !== null;
  let P, L = null;
  if (j)
    P = { locations: /* @__PURE__ */ new Map() };
  else {
    const b = o ? performance.now() : 0;
    P = _t(e, o), L = lr(P, v, o), o && console.debug(
      `[SILAM] Discovery took ${(performance.now() - b).toFixed(1)}ms, locations: ${P.locations.size}`
    );
  }
  let I;
  if (t.location === "manual" && $ !== null) {
    if (!$.startsWith("weather."))
      return console.warn(
        `[SILAM] Manual mode: entity_weather '${$}' is not a weather.* entity. The forecast subscription only works against the weather domain. Set entity_weather to the weather.* entity that emits SILAM forecast events.`
      ), [];
    if (!e.states[$])
      return console.warn(
        `[SILAM] Manual mode: entity_weather '${$}' not found in hass.states. Verify the entity ID is correct.`
      ), [];
    I = $;
  } else if (I = (L == null ? void 0 : L.weatherEntity) || Ai(e, v, l, o, P), !I || !e.states[I])
    return t.location === "manual" ? console.warn(
      "[SILAM] Manual mode: could not auto-discover a weather entity matching entity_prefix. Set config.entity_weather to the weather.* entity ID explicitly (see issue #231)."
    ) : o && console.warn("[SILAM] No weather entity found:", I), [];
  const D = e.states[I], S = (t.allergens || yt.allergens).map((b) => {
    const f = ke(b);
    return we(f);
  });
  let T = [];
  r && r.forecast && Array.isArray(r.forecast) ? T = r.forecast : Array.isArray(D.attributes.forecast) && (T = D.attributes.forecast);
  let E;
  t.mode === "hourly" || t.mode === "twice_daily" ? E = Math.min(T.length, x) : E = Math.min(T.length + 1, x);
  const C = o ? performance.now() : 0, N = Ci(t, e, o, P);
  o && console.debug(
    `[SILAM] resolveEntityIds took ${(performance.now() - C).toFixed(1)}ms, resolved: ${N.size}/${S.length}`
  );
  let H = !1;
  t.location !== "manual" && L && L.sensors.size === 0 && !S.includes("allergy_risk") && (S.push("allergy_risk"), H = !0, o && console.debug(
    "[SILAM] Discovery found 0 allergen sensors; auto-adding allergy_risk"
  ));
  const K = [];
  for (const b of S)
    try {
      const f = { days: [] };
      f.allergenReplaced = b;
      const { allergenCapitalized: O, allergenShort: F } = Mi(
        b,
        _,
        c,
        i
      );
      if (f.allergenCapitalized = O, f.allergenShort = t.allergens_abbreviated ? F : O, b === "allergy_risk") {
        const B = ((M = (V = vt.names) == null ? void 0 : V.allergy_risk) == null ? void 0 : M[i]) || "Index";
        f.allergenCapitalized = B, f.allergenShort = B, f.isSummary = !0;
      }
      const Y = N.get(b) || null;
      f.entity_id = Y;
      const Q = [], J = [], ae = (B) => {
        if (B == null || B === "") return null;
        const q = Number(B);
        return Number.isFinite(q) ? q : null;
      };
      if (b === "allergy_risk")
        if (t.mode === "hourly" || t.mode === "twice_daily")
          for (let B = 0; B < E; ++B) {
            const q = T[B], m = q ? q.index ?? q.pollen_index : null;
            Q.push(wr(m)), J.push(ae(m));
          }
        else {
          const B = D.attributes.index ?? D.attributes.pollen_index ?? D.state;
          Q.push(wr(B)), J.push(ae(B));
          for (let q = 1; q < E; ++q) {
            const m = T[q - 1], R = m ? m.index ?? m.pollen_index : null;
            Q.push(wr(R)), J.push(ae(R));
          }
        }
      else if (t.mode === "hourly" || t.mode === "twice_daily")
        for (let B = 0; B < E; ++B) {
          const q = T[B], m = q ? Number(q[`pollen_${b}`]) : NaN;
          Q.push(br(b, m)), J.push(ae(m));
        }
      else {
        const B = Number(D.attributes[`pollen_${b}`]);
        Q.push(br(b, B)), J.push(ae(B));
        for (let q = 1; q < E; ++q) {
          const m = T[q - 1], R = m ? Number(m[`pollen_${b}`]) : NaN;
          Q.push(br(b, R)), J.push(ae(R));
        }
      }
      for (let B = 0; B < E; ++B) {
        const q = Q[B];
        let m, R, G;
        if (t.mode === "hourly" || t.mode === "twice_daily") {
          const ee = T[B];
          if (ee && (ee.datetime || ee.time) ? G = new Date(ee.datetime || ee.time) : G = new Date(y.getTime() + B * 36e5), t.mode === "twice_daily") {
            const de = G.toLocaleDateString(l, { weekday: "short" });
            m = de.charAt(0).toUpperCase() + de.slice(1), R = B % 2 === 0 ? "mdi:weather-sunset-up" : "mdi:weather-sunset-down", d && (m = m.toUpperCase());
          } else
            m = G.toLocaleTimeString(l, {
              hour: "2-digit",
              minute: "2-digit"
            }) || "", R = null;
        } else
          G = new Date(y.getTime() + B * 864e5), m = Ne(G, B, {
            daysRelative: n,
            dayAbbrev: s,
            daysUppercase: d,
            userDays: h,
            lang: i,
            locale: l
          }), R = null;
        const X = q < 0 ? 0 : Math.min(Math.round(q), 6), Z = H && b === "allergy_risk" && q === 0 ? pe("card.index.very_low", i) || w[0] : q < 0 ? p : w[X] || String(q), re = {
          name: f.allergenCapitalized,
          day: m,
          icon: R,
          state: q,
          display_state: q,
          raw_value: J[B] ?? null,
          state_text: Z
        };
        f.days.push(re);
      }
      (H && b === "allergy_risk" || b === "allergy_risk" && Ge(t.show_summary_block) || Fe(f.days, k)) && K.push(f);
    } catch (f) {
      o && console.warn(`[SILAM] Error for allergen ${b}:`, f);
    }
  if (Pe(K, t.sort), t.index_top || t.allergy_risk_top) {
    const b = K.findIndex(
      (f) => f.allergenReplaced === "allergy_risk" || f.allergenReplaced === "index"
    );
    if (b > 0) {
      const [f] = K.splice(b, 1);
      K.unshift(f);
    }
  }
  return o && console.debug(
    `[SILAM] fetchForecast done in ${(performance.now() - a).toFixed(1)}ms, sensors: ${K.length}`
  ), K;
}
const ld = {
  priority: 4,
  detectStates(e, t, r = !1) {
    const o = _t(e, r), a = [];
    if (o.locations.size > 0)
      for (const [, i] of o.locations) {
        if (i.sensors)
          for (const l of i.sensors.values()) a.push(l);
        i.weatherEntity && a.push(i.weatherEntity);
      }
    if (!a.length)
      for (const i of t.stateIds)
        typeof i == "string" && i.startsWith("sensor.silam_pollen_") && a.push(i);
    return { ids: a, discovery: o };
  },
  discover: (e, t) => _t(e, t),
  extractLocationSlug: (e) => {
    var t;
    return ((t = e.match(/^sensor\.silam_pollen_(.*)_([^_]+)$/)) == null ? void 0 : t[1]) || null;
  }
}, sd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SILAM_ALLERGENS: $i,
  SILAM_THRESHOLDS: Pi,
  autodetect: ld,
  fetchForecast: nd,
  getAllergenNames: Mi,
  grainsToLevel: br,
  indexToLevel: wr,
  resolveEntityIds: Ci,
  stubConfigSILAM: yt
}, Symbol.toStringTag, { value: "Module" })), Ot = "kleenex_pollen_radar", Fr = "kleenex_pollenradar", ut = {
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
  // The IT endpoint reports English allergen names, so the Italian aliases
  // below are never exercised in practice -- but it misspells chenopod as
  // "Chenepod" (Roma, Milano), which is the alias IT installs actually need.
  chenepod: "chenopod",
  ambrosia: "ragweed",
  artemisia: "mugwort",
  chenopodio: "chenopod",
  ortica: "nettle",
  // Weeds - Dutch (NL)
  // ambrosia: "ragweed", // Same as Italian, already defined
  bijvoet: "mugwort",
  ganzevoet: "chenopod",
  brandnetel: "nettle"
}, Yt = {
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
    // The three category totals are selectable in the editor
    // (KLEENEX_EDITOR_ALLERGENS) but off by default: an EU install gets the
    // per-allergen rows, and a US install gets the categories through the
    // fallback in forecast.ts without having to configure anything.
  ],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: 48,
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
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
}, Ei = {
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
}, Li = {
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
}, Ii = [
  ...Yt.allergens,
  "trees_cat",
  "grass_cat",
  "weeds_cat"
];
function rt(e, t) {
  const r = Number(e);
  if (isNaN(r) || r < 0) return -1;
  if (r === 0) return 0;
  const o = Ei[t] || "trees";
  let a;
  switch (o) {
    case "trees":
      a = [95, 207, 703];
      break;
    case "weeds":
      a = [20, 77, 266];
      break;
    case "grass":
      a = [29, 60, 341];
      break;
    default:
      a = [95, 207, 703];
  }
  return r <= a[0] ? 1 : r <= a[1] ? 2 : r <= a[2] ? 3 : 4;
}
const Ie = /* @__PURE__ */ new Set(["trees", "grass", "weeds"]), dd = /* @__PURE__ */ new Set([
  "trees_level",
  "grass_level",
  "weeds_level",
  "detail_level",
  "date",
  "last_updated",
  "latitude",
  "longitude",
  "city",
  "region",
  "error"
]), Ea = (() => {
  const e = /* @__PURE__ */ new Map();
  for (const [t, r] of Object.entries(ut)) {
    const o = _e(t);
    e.has(o) || e.set(o, r);
  }
  return e;
})();
function Ur(e) {
  const t = Ea.get(e);
  if (t) return t;
  if (!e.includes("_")) return;
  const r = e.split("_");
  for (let o = 1; o < r.length; o++) {
    const a = Ea.get(r.slice(o).join("_"));
    if (a) return a;
  }
}
function Jt(e) {
  return typeof e != "string" ? "" : e.trim().replace(/\s+/g, " ").toLowerCase();
}
const cd = (() => {
  const e = /* @__PURE__ */ new Map();
  for (const [t, r] of Object.entries(ut)) {
    let o = e.get(r);
    o || (o = /* @__PURE__ */ new Set(), e.set(r, o)), o.add(_e(t));
  }
  return e;
})(), Ti = /* @__PURE__ */ new Set([
  "level",
  "date",
  "last_updated",
  "latitude",
  "longitude",
  "city",
  "region",
  "error"
]);
function sr(e) {
  const t = `sensor.${Ot}_`;
  return e.startsWith(t) ? e.slice(t.length) : e.startsWith("sensor.") ? e.slice(7) : e;
}
function _d(e) {
  if (e.endsWith("_level")) return !0;
  for (const t of Ti)
    if (e === t || e.endsWith(`_${t}`)) return !0;
  return !1;
}
function Fo(e) {
  const t = sr(e), r = t.split("_").pop();
  for (const [a, i] of Object.entries(
    Pr
  ))
    if (r.startsWith(a)) return i;
  if (_d(t)) return null;
  const o = Ur(t);
  return o && !Ie.has(o) ? o : null;
}
function ud(e) {
  if (typeof e != "string" || !e) return null;
  const t = e.split("-");
  if (t.length < 2) return null;
  const r = Jt(t[t.length - 2]);
  if (!r) return null;
  const o = ut[r];
  return o && !Ie.has(o) ? o : null;
}
function hd(e, t) {
  var i, l, n;
  const r = ud((i = t.entry) == null ? void 0 : i.unique_id);
  if (r) return r;
  const o = Ur(sr(e));
  if (o && !Ie.has(o)) return o;
  const a = (n = (l = t.state) == null ? void 0 : l.attributes) == null ? void 0 : n.friendly_name;
  if (typeof a == "string") {
    const s = a.trim().split(/\s+/).pop();
    if (s) {
      const d = ut[Jt(s)];
      if (d && !Ie.has(d)) return d;
    }
  }
  return null;
}
function gd(e, t) {
  var o;
  const r = (o = t.entry) == null ? void 0 : o.translation_key;
  if (typeof r == "string" && r) {
    if (Ie.has(r)) return r;
    if (dd.has(r)) return null;
    if (r === "detail_value") return hd(e, t);
  }
  return Fo(e);
}
function Ao(e) {
  var t;
  if (e != null && e.name_by_user) return e.name_by_user;
  if (e != null && e.name) {
    const r = /^Kleenex Pollen Radar\s*\((.+)\)\s*$/.exec(e.name);
    return ((t = r == null ? void 0 : r[1]) == null ? void 0 : t.trim()) || e.name;
  }
  return null;
}
function pd(e) {
  var a, i;
  const t = Ao(e.device);
  if (t) return t;
  const r = (i = (a = e.state) == null ? void 0 : a.attributes) == null ? void 0 : i.friendly_name;
  if (typeof r == "string") {
    const l = r.replace(/^Kleenex Pollen Radar\s*[(-]?\s*/i, "").replace(
      /[)\s]+(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee).*$/i,
      ""
    ).replace(
      /^(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee)(?:\s.*)?$/i,
      ""
    ).trim();
    if (l) return l;
  }
  const o = sr(e.entityId).replace(/_[^_]+$/, "");
  return o ? o.charAt(0).toUpperCase() + o.slice(1) : "Auto";
}
function Vr(e) {
  const t = e == null ? void 0 : e.identifiers;
  if (!Array.isArray(t)) return null;
  for (const r of t) {
    if (!Array.isArray(r) || r[0] !== Fr || !r[1]) continue;
    const o = _e(String(r[1]));
    if (o) return o;
  }
  return null;
}
function md(e) {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const [o, a] of Object.entries(e.devices || {})) {
    const i = Vr(a);
    i && (t.set(o, i), r.set(i, (r.get(i) || 0) + 1));
  }
  for (const [o, a] of [...t])
    (r.get(a) || 0) > 1 && t.delete(o);
  return t;
}
function fd(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map(), tierUsed: 0 };
  const r = md(e);
  return je(e, {
    platform: Fr,
    classify: gd,
    resolveLabel: pd,
    resolveLocationKey: (o) => o.tier === 3 ? sr(o.entityId).replace(/_[^_]+$/, "") || "default" : (o.deviceId ? r.get(o.deviceId) : void 0) || ir(o.device),
    fallbackRegex: /^sensor\.kleenex_pollen_radar_/,
    debug: t,
    logTag: "Kleenex"
  });
}
const Xt = Ee(fd);
function dr(e) {
  return sr(e).replace(/_[^_]+$/, "") || null;
}
function Ni(e, t, r) {
  var i;
  if (!r) return null;
  const o = _e(String(r));
  if (!o) return null;
  let a = null;
  for (const [l, n] of t.locations) {
    const s = n.deviceId ? (i = e.devices) == null ? void 0 : i[n.deviceId] : void 0;
    if (Vr(s) === o) {
      if (a) return "ambiguous";
      a = [l, n];
    }
  }
  return a;
}
function vd(e, t) {
  const r = String(t).toLowerCase(), o = _e(String(t)), a = [], i = [], l = [], n = [];
  for (const [s, d] of e.locations) {
    const _ = d.label ? String(d.label).toLowerCase() : "";
    _ && _ === r && a.push([s, d]), _ && o && _e(String(d.label)) === o && l.push([s, d]), _ && _.includes(r) && n.push([s, d]);
    for (const c of d.entities.values()) {
      const u = String(c).toLowerCase(), h = dr(c);
      if (h && h.toLowerCase() === r || u.endsWith(`_${r}`) || u.endsWith(`_${r}_j_1`)) {
        i.push([s, d]);
        break;
      }
    }
  }
  return [a, i, l, n];
}
function Uo(e, t, r) {
  if (r && t.locations.has(r))
    return [r, t.locations.get(r)];
  const o = Ni(
    e,
    t,
    r
  );
  if (o === "ambiguous") return "ambiguous";
  if (o) return o;
  if (r) {
    for (const a of vd(t, r))
      if (a.length !== 0)
        return a.length > 1 ? "ambiguous" : a[0];
    return null;
  }
  return ye(t, r, {
    slugExtractor: dr
  });
}
const $o = /* @__PURE__ */ new Set();
function yd() {
  $o.clear();
}
function La(e, t, r, o) {
  const a = `${e}|${t}`;
  $o.has(a) || ($o.add(a), console.warn(
    `[Kleenex] The configured entity_prefix '${e}' matches entities from several locations. Showing '${r}' and ignoring: ${o.join(", ")}. Use a prefix that only matches the location you want, or switch from manual to a location-based config.`
  ));
}
function bd(e, t, r) {
  var l;
  const o = /* @__PURE__ */ new Set(), a = (n) => {
    if (typeof n != "string" || !n) return;
    const s = _e(n);
    s && o.add(s);
  };
  a(t), a(r == null ? void 0 : r.label);
  const i = r != null && r.deviceId ? (l = e.devices) == null ? void 0 : l[r.deviceId] : void 0;
  return a(i == null ? void 0 : i.name_by_user), a(i == null ? void 0 : i.name), o;
}
function wd(e) {
  const t = /* @__PURE__ */ new Set(), r = (o) => {
    if (typeof o != "string" || !o) return;
    const a = _e(o);
    a && t.add(a);
  };
  return r(Vr(e)), r(e == null ? void 0 : e.name_by_user), r(e == null ? void 0 : e.name), t;
}
function kd(e) {
  const t = /* @__PURE__ */ new Set();
  for (const [r, o] of Object.entries((e == null ? void 0 : e.devices) || {}))
    Vr(o) && t.add(r);
  for (const r of Object.values((e == null ? void 0 : e.entities) || {})) {
    const o = r == null ? void 0 : r.device_id;
    o && (r == null ? void 0 : r.platform) === Fr && t.add(o);
  }
  return t;
}
const ji = Ee(
  kd,
  "Kleenex:deviceIds"
);
function xd(e, t, r = !1) {
  var a;
  if (!t) return null;
  let o = null;
  for (const i of ji(e, r)) {
    const l = (a = e == null ? void 0 : e.devices) == null ? void 0 : a[i];
    if (l && wd(l).has(t)) {
      if (o) return null;
      o = i;
    }
  }
  return o;
}
function Vo(e, t, r) {
  var g, $, j, P;
  const { prefix: o, suffix: a = "", debug: i = !1 } = r;
  if (t.length === 0 || !o) return { entityIds: t, label: null };
  const l = _e(o.replace(/_+$/, "")), n = xd(e, l, i);
  if (n) {
    const L = ji(e, i), I = t.filter((T) => {
      var C, N;
      const E = (N = (C = e == null ? void 0 : e.entities) == null ? void 0 : C[T]) == null ? void 0 : N.device_id;
      return !E || E === n ? !0 : !L.has(E);
    });
    if (I.length === t.length) return { entityIds: t, label: null };
    const D = /* @__PURE__ */ new Set();
    for (const T of t) {
      if (I.includes(T)) continue;
      const E = ($ = (g = e == null ? void 0 : e.entities) == null ? void 0 : g[T]) == null ? void 0 : $.device_id;
      E && D.add(E);
    }
    const z = (j = e == null ? void 0 : e.devices) == null ? void 0 : j[n], S = Ao(z);
    return La(
      o,
      a,
      S || n,
      [...D].map(
        (T) => {
          var E;
          return Ao((E = e == null ? void 0 : e.devices) == null ? void 0 : E[T]) || T;
        }
      )
    ), i && console.debug(
      `[Kleenex] Manual prefix owned by device '${n}'`,
      I
    ), { entityIds: I, label: S };
  }
  if (t.length < 2) return { entityIds: t, label: null };
  const s = r.discovery ?? Xt(e, i);
  if (!s || s.locations.size < 2)
    return { entityIds: t, label: null };
  const d = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map();
  for (const [L, I] of s.locations) {
    for (const D of I.entities.values()) d.set(D, L);
    I.deviceId && _.set(I.deviceId, L);
  }
  const c = (L) => {
    var T, E;
    const I = (E = (T = e == null ? void 0 : e.entities) == null ? void 0 : T[L]) == null ? void 0 : E.device_id, D = I ? _.get(I) : void 0;
    if (D) return D;
    const z = d.get(L);
    if (z) return z;
    const S = dr(L);
    return S && s.locations.has(S) ? S : void 0;
  }, u = `sensor.${o}`, h = /* @__PURE__ */ new Map();
  for (const L of t) {
    const I = c(L);
    if (!I) continue;
    let D = L.startsWith(u) ? L.slice(u.length) : L;
    a && D.endsWith(a) && (D = D.slice(0, -a.length));
    const z = h.get(I);
    z ? (z.min = Math.min(z.min, D.length), z.total += D.length) : h.set(I, { min: D.length, total: D.length });
  }
  if (h.size < 2) return { entityIds: t, label: null };
  const p = [...h.keys()].filter(
    (L) => bd(e, L, s.locations.get(L)).has(l)
  ), w = p.length > 0 ? new Set(p) : new Set(h.keys());
  let y = null, x = null;
  for (const [L, I] of [...h].filter(([D]) => w.has(D)).sort(([D], [z]) => D < z ? -1 : D > z ? 1 : 0))
    (!x || I.min < x.min || I.min === x.min && I.total < x.total) && (y = L, x = I);
  const k = t.filter((L) => {
    const I = c(L);
    return !I || I === y;
  }), v = y ? ((P = s.locations.get(y)) == null ? void 0 : P.label) ?? null : null;
  return La(
    o,
    a,
    v || y || "",
    [...h.keys()].filter((L) => L !== y).map((L) => {
      var I;
      return ((I = s.locations.get(L)) == null ? void 0 : I.label) || L;
    })
  ), i && console.debug(`[Kleenex] Manual prefix narrowed to '${y}'`, k), { entityIds: k, label: v };
}
function Ri(e, t, r = !1) {
  var c;
  const o = Xt(e, r);
  if (o.locations.size === 0) return null;
  const a = t.location, i = Uo(e, o, a);
  if (i === "ambiguous")
    return r && console.debug(
      `[Kleenex] Location '${a}' matches more than one device; not resolving`
    ), "ambiguous";
  if (!i) return null;
  const l = i, [n, s] = l, d = /* @__PURE__ */ new Map(), _ = [];
  for (const [u, h] of s.entities) {
    const p = (c = e.states) == null ? void 0 : c[h];
    p && (d.set(h, u), _.push(p));
  }
  return _.length === 0 ? null : (r && console.debug(
    `[Kleenex] Registry discovery matched location '${n}' (${s.label}) with entities:`,
    [...s.entities.keys()]
  ), {
    locationKey: n,
    label: s.label,
    entities: s.entities,
    keyByEntityId: d,
    states: _
  });
}
function Sd(e) {
  const t = /* @__PURE__ */ new Set();
  for (const r of e.allergens || [])
    if (Ie.has(r))
      t.add(r);
    else if (r.endsWith("_cat")) {
      const o = r.replace("_cat", "");
      Ie.has(o) && t.add(o);
    } else {
      const o = Li[r];
      o && t.add(o);
    }
  return t;
}
function Ia(e) {
  return (e.allergens || []).filter(
    (t) => ![
      "trees_cat",
      "grass_cat",
      "weeds_cat",
      "trees",
      "grass",
      "weeds"
    ].includes(t)
  );
}
function zd(e, t, r = !1) {
  const o = /* @__PURE__ */ new Map(), a = _e(e.location || ""), i = Sd(e);
  if (e.location !== "manual") {
    const n = Ri(t, e, r);
    if (n === "ambiguous") return o;
    if (n) {
      const s = new Set(Ia(e));
      for (const [d, _] of n.entities)
        t.states[_] && (Ie.has(d) ? i.has(d) && o.set(d, _) : s.has(d) && o.set(d, _));
      if (o.size > 0) return o;
    }
  }
  for (const n of i) {
    let s;
    if (e.location === "manual") {
      const d = Ce(e.entity_prefix), _ = e.entity_suffix || "";
      if (s = `sensor.${d}${n}${_}`, !t.states[s]) {
        const c = Object.entries(
          Pr
        ).filter(([, p]) => p === n).map(([p]) => p), u = `sensor.${d}`, h = Object.keys(t.states).filter((p) => {
          if (!p.startsWith(u)) return !1;
          const w = p.substring(u.length);
          if (_ && !w.endsWith(_)) return !1;
          const y = _ ? w.substring(0, w.length - _.length) : w;
          return c.some((x) => y.startsWith(x));
        });
        h.length >= 1 && (s = h[0]);
      }
    } else if (s = a ? `sensor.kleenex_pollen_radar_${a}_${n}` : void 0, !s || !t.states[s]) {
      const d = Object.entries(
        Pr
      ).filter(([, c]) => c === n).map(([c]) => c), _ = Object.keys(t.states).filter((c) => {
        if (!c.startsWith("sensor.kleenex_pollen_radar_") || a && !c.substring(
          28
        ).startsWith(a + "_"))
          return !1;
        const u = c.split("_"), h = u[u.length - 1] ?? "";
        return d.some((p) => h.startsWith(p));
      });
      _.length >= 1 && (s = _[0]);
    }
    r && console.debug(
      `[Kleenex:resolveEntityIds] category: '${n}', sensorId: '${s}', exists: ${!!(s && t.states[s])}`
    ), s && t.states[s] && o.set(n, s);
  }
  const l = Ia(e);
  for (const n of l) {
    if (o.has(n)) continue;
    let s;
    const d = new Set(
      cd.get(n) || []
    );
    if (d.add(_e(n)), e.location === "manual") {
      const _ = Ce(e.entity_prefix), c = e.entity_suffix || "";
      for (const u of d) {
        const h = `sensor.${_}${u}${c}`;
        if (t.states[h]) {
          s = h;
          break;
        }
      }
    } else if (a)
      for (const _ of d) {
        const c = `sensor.kleenex_pollen_radar_${a}_${_}`;
        if (t.states[c]) {
          s = c;
          break;
        }
      }
    s && (r && console.debug(
      `[Kleenex:resolveEntityIds] DetailSensor for '${n}': '${s}'`
    ), o.set(n, s));
  }
  return o;
}
function Tt(e) {
  if (e === null || e === "") return -1;
  const t = Number(e);
  return Number.isFinite(t) ? t : -1;
}
const Ta = /* @__PURE__ */ new Set();
async function Ad(e, t) {
  var W, B, q;
  const { lang: r, locale: o, daysRelative: a, dayAbbrev: i, daysUppercase: l } = Ve(e, t), n = t.debug, s = t.days_to_show || Yt.days_to_show, { fullPhrases: d, shortPhrases: _, userLevels: c, userDays: u, noInfoLabel: h } = Ue(t, r), p = t.pollen_threshold ?? Yt.pollen_threshold, w = t.allergens, y = (m) => gt(m, 4, -1);
  n && console.debug("[Kleenex] Adapter: start fetchForecast", { config: t, lang: r });
  const x = /* @__PURE__ */ new Date();
  x.setHours(0, 0, 0, 0);
  const k = t.location === "manual" ? Ce(t.entity_prefix) : "";
  let v, g = /* @__PURE__ */ new Map();
  const $ = t.location === "manual" ? null : Ri(e, t, !!n);
  if ($ === "ambiguous")
    return n && console.debug(
      `[Kleenex] Location '${t.location}' is ambiguous; returning no sensors`
    ), [];
  if ($)
    v = $.states, g = $.keyByEntityId;
  else if (k) {
    const m = `sensor.${k}`, R = typeof t.entity_suffix == "string" ? t.entity_suffix : "";
    n && console.debug(
      `[Kleenex] Manual mode filtering with prefix: '${k}'${R ? `, suffix: '${R}'` : ""}`
    ), v = Object.values(e.states).filter((X) => {
      const Z = !!X.entity_id && X.entity_id.startsWith(m) && (!R || X.entity_id.endsWith(R));
      return n && Z && console.debug(`[Kleenex] Manual mode match: ${X.entity_id}`), Z;
    });
    const G = Vo(
      e,
      v.map((X) => X.entity_id),
      { prefix: k, suffix: R, debug: !!n }
    );
    if (G.entityIds.length !== v.length) {
      const X = new Set(G.entityIds);
      v = v.filter((Z) => X.has(Z.entity_id));
    }
    n && console.debug(
      `[Kleenex] After manual mode filtering: ${v.length} sensors with prefix '${m}'`
    );
  } else
    v = Object.values(e.states).filter((m) => m.entity_id && m.entity_id.startsWith(`sensor.${Ot}_`));
  if (!$ && t.location && t.location !== "manual") {
    const m = _e(t.location);
    n && console.debug(
      `[Kleenex] Filtering sensors for location: ${t.location} (normalized: ${m})`
    ), v = v.filter((R) => {
      const X = R.entity_id.replace(`sensor.${Ot}_`, "").replace(/_[^_]+$/, ""), Z = X === m;
      return n && Z && console.debug(
        `[Kleenex] Location match: ${R.entity_id} -> locPart: ${X}`
      ), Z;
    }), n && console.debug(
      `[Kleenex] After location filtering: ${v.length} sensors for location '${m}'`
    );
  }
  n && console.debug(
    "[Kleenex] Sensors found:",
    v.map((m) => m.entity_id)
  );
  const j = (m) => {
    let R = m;
    const G = typeof t.entity_suffix == "string" ? t.entity_suffix : "";
    return t.location === "manual" && G && R.endsWith(G) && (R = R.slice(0, -G.length)), R.split("_").pop();
  }, P = (m) => {
    const R = j(m);
    for (const [G, X] of Object.entries(
      Pr
    ))
      if (R.startsWith(G)) return X;
    return null;
  }, L = (m) => {
    const R = g.get(m);
    return R ? Ie.has(R) : P(m) !== null;
  }, I = Array.isArray(w) ? w : [], D = [
    "trees_cat",
    "grass_cat",
    "weeds_cat",
    "trees",
    "grass",
    "weeds"
  ], z = ["trees_cat", "grass_cat", "weeds_cat"], S = I.filter(
    (m) => !D.includes(m)
  ), T = v.filter(
    (m) => L(m.entity_id)
  ), E = (m) => Array.isArray(m) && m.every((R) => !!R && typeof R == "object"), C = (m) => m == null || E(m) && m.length === 0, N = (m) => {
    var G;
    const R = (G = m.attributes) == null ? void 0 : G.forecast;
    return !E(R) || R.length === 0 ? null : R;
  }, H = T.filter(
    (m) => N(m) !== null
  ), K = H.length > 0 && H.every((m) => {
    var G;
    const R = N(m);
    return C((G = m.attributes) == null ? void 0 : G.details) && R.every((X) => C(X.details));
  }) && T.every(
    (m) => {
      var R;
      return N(m) !== null || C((R = m.attributes) == null ? void 0 : R.details);
    }
  ), V = I.some(
    (m) => D.includes(m)
  ), M = (m, R) => R.includes(`${m}_cat`) ? `${m}_cat` : m;
  let b = [];
  const f = /* @__PURE__ */ new Map(), O = (m, R) => {
    var ee, de;
    const G = Array.isArray((ee = m.attributes) == null ? void 0 : ee.forecast) ? m.attributes.forecast : [];
    f.has(R) || f.set(R, {
      levels: [],
      entity_id: m.entity_id,
      source: "category_sensor"
      // Track data source
    });
    const X = f.get(R), Z = Tt(m.state), re = y(rt(Z, R));
    n && console.debug(
      `[Kleenex] CATEGORY ${R} TODAY: sensor_state=${m.state}, parsed_value=${Z}, clamped_level=${re}, text_level=${(de = m.attributes) == null ? void 0 : de.level}`
    ), X.levels[0] = {
      date: new Date(x),
      level: re,
      // Store raw level (0-4)
      value: Z
    }, G.forEach((ne, ue) => {
      const te = ne !== null && typeof ne == "object" ? ne : null, se = te ? Tt(te.value) : -1, ve = y(
        rt(se, R)
      );
      n && console.debug(
        `[Kleenex] CATEGORY ${R} FORECAST day ${ue + 1}: value=${se}, clamped_level=${ve}, text_level=${te == null ? void 0 : te.level}`
      ), X.levels[ue + 1] = {
        date: new Date(x.getTime() + (ue + 1) * 864e5),
        level: ve,
        // Store raw level (0-4)
        value: se
      };
    });
  };
  n && console.debug(
    `[Kleenex] Processing ${v.length} sensors for allergens:`,
    t.allergens
  );
  for (const m of v) {
    n && console.debug(`[Kleenex] === PROCESSING SENSOR: ${m.entity_id} ===`);
    const R = m.attributes || {}, G = R.details || [], X = R.forecast || [], Z = g.get(m.entity_id), re = Z ? Ie.has(Z) ? Z : null : P(m.entity_id);
    if (n && console.debug(
      `[Kleenex] Processing sensor ${m.entity_id}, category: ${re}, details count: ${G.length}, forecast days: ${X.length}`
    ), re) {
      const ee = M(
        re,
        I
      );
      n && console.debug(
        `[Kleenex] Category sensor mapping: ${re} -> ${ee}, included in config: ${I.includes(ee)}`
      ), I.includes(ee) ? O(m, ee) : n && console.debug(
        `[Kleenex] SKIPPING category sensor ${re} -> ${ee}: not in config.allergens [${I.join(", ")}]`
      );
    }
    n && console.debug(
      `[Kleenex] Processing ${G.length} individual allergen details for sensor: ${m.entity_id}`
    );
    try {
      for (const ee of G) {
        const de = Jt(ee.name);
        if (!de) continue;
        const ne = ut[de] || de;
        if (!I.includes(ne)) {
          n && ee.value !== void 0 && console.debug(
            `[Kleenex] SKIPPING individual allergen ${ne} (${de}): not in config allergens`
          );
          continue;
        }
        n && console.debug(
          `[Kleenex] Processing INDIVIDUAL allergen: ${ne} (original: ${de})`
        ), f.has(ne) || f.set(ne, {
          levels: [],
          // The category sensor this reading was lifted out of. It is the
          // fallback, not the answer: the DetailSensor pass below replaces
          // it with the allergen's own entity whenever that exists, which is
          // what #317 was actually missing. Keeping the category here means
          // tapping birch still opens something useful -- the sensor whose
          // `details` attribute holds birch's number -- rather than nothing.
          entity_id: m.entity_id,
          source: "individual_details"
          // Track data source
        });
        const ue = f.get(ne), te = Tt(ee.value), se = rt(te, ne), ve = y(se);
        n && console.debug(
          `[Kleenex] INDIVIDUAL ${ne} TODAY: detail_value=${ee.value}, parsed_value=${te}, raw_level=${se}, clamped_level=${ve}, text_level=${ee.level}, source=${m.entity_id}`
        ), (!ue.levels[0] || ue.source === "individual_details") && (ue.levels[0] = {
          date: new Date(x),
          level: ve,
          // Store raw level (0-4)
          value: te
        });
      }
    } catch (ee) {
      n && console.warn(
        `[Kleenex] Error processing individual allergens for sensor ${m.entity_id}:`,
        ee
      );
    }
    try {
      X.forEach((ee, de) => {
        const ne = new Date(
          x.getTime() + (de + 1) * 864e5
        ), ue = ee.details || [];
        n && ue.length > 0 && console.debug(
          `[Kleenex] Processing forecast day ${de + 1} with ${ue.length} allergen details`
        );
        for (const te of ue) {
          const se = Jt(te.name);
          if (!se) continue;
          const ve = ut[se] || se;
          if (!I.includes(ve)) continue;
          f.has(ve) || f.set(ve, {
            levels: [],
            // Same as the details pass above: the category sensor the
            // reading came from, superseded by the allergen's own entity
            // when there is one.
            entity_id: m.entity_id,
            source: "individual_forecast"
            // Track data source
          });
          const me = f.get(ve), xe = Tt(te.value), $e = rt(xe, ve), Ae = y($e);
          n && console.debug(
            `[Kleenex] INDIVIDUAL ${ve} FORECAST day ${de + 1}: detail_value=${te.value}, parsed_value=${xe}, raw_level=${$e}, clamped_level=${Ae}, text_level=${te.level}`
          );
          const hr = de + 1;
          (!me.levels[hr] || me.source === "individual_forecast" || me.source === "individual_details") && (me.levels[hr] = {
            date: ne,
            level: Ae,
            // Store raw level (0-4)
            value: xe
          });
        }
      });
    } catch (ee) {
      n && console.warn(
        `[Kleenex] Error processing forecast data for sensor ${m.entity_id}:`,
        ee
      );
    }
  }
  for (const m of v) {
    if (L(m.entity_id)) continue;
    const R = g.get(m.entity_id);
    let G;
    if (t.location === "manual" && t.entity_prefix) {
      const me = `sensor.${Ce(t.entity_prefix)}`;
      if (!m.entity_id.startsWith(me)) continue;
      G = m.entity_id.slice(me.length);
      const xe = t.entity_suffix;
      xe && G.endsWith(xe) && (G = G.slice(0, -xe.length));
    } else {
      const me = `sensor.${Ot}_`;
      if (G = m.entity_id.startsWith(me) ? m.entity_id.slice(me.length) : m.entity_id, t.location && t.location !== "manual") {
        const xe = _e(t.location);
        G.startsWith(xe + "_") && (G = G.slice(xe.length + 1));
      }
    }
    let X = R;
    if (!X) {
      if (Ti.has(G) || G.endsWith("_level")) continue;
      X = Ur(G);
    }
    if (!X) continue;
    const Z = X;
    if (!I.includes(Z)) continue;
    const re = String(m.state ?? "").trim(), ee = Number(re), de = re !== "" && Number.isFinite(ee), ne = f.get(Z);
    if (ne) {
      const me = ne.source === "individual_details" || ne.source === "individual_forecast";
      me && de ? (ne.entity_id = m.entity_id, n && console.debug(
        `[Kleenex] DetailSensor ${m.entity_id} adopted as the entity for ${Z}`
      )) : me && n && console.debug(
        `[Kleenex] DetailSensor ${m.entity_id} has state '${m.state}'; ${Z} keeps ${ne.entity_id} as its more-info target`
      );
      continue;
    }
    if (!de) continue;
    n && console.debug(
      `[Kleenex] DetailSensor fallback: ${m.entity_id} -> ${Z}`
    ), f.set(Z, {
      levels: [],
      entity_id: m.entity_id,
      source: "detail_sensor"
    });
    const ue = f.get(Z), te = rt(ee, Z), se = y(te);
    ue.levels[0] = {
      date: new Date(x),
      level: se,
      value: ee
    }, (((W = m.attributes) == null ? void 0 : W.forecast) || []).forEach((me, xe) => {
      const $e = Tt(me.value), Ae = y(rt($e, Z));
      ue.levels[xe + 1] = {
        date: new Date(x.getTime() + (xe + 1) * 864e5),
        level: Ae,
        value: $e
      };
    });
  }
  const F = K && S.length > 0 && S.every((m) => !f.has(m)), Y = F && !V, Q = Y ? [...I, ...z] : I;
  if (Y) {
    for (const m of T) {
      const R = g.get(m.entity_id), G = R && Ie.has(R) ? R : P(m.entity_id);
      G && O(m, `${G}_cat`);
    }
    n && console.debug(
      "[Kleenex] NA zone: no per-allergen data, showing category totals instead",
      Array.from(f.keys())
    );
  }
  if (F) {
    const m = `${t.location || ""}|${t.entity_prefix || ""}|${t.entity_suffix || ""}`;
    Ta.has(m) || (Ta.add(m), console.warn(
      Y ? "[Kleenex] No per-allergen data found. The Kleenex API for North America (US/Canada) zones only provides category totals (trees/grass/weeds), not per-allergen breakdowns, so the card is showing those totals instead of the individual allergens you configured. Set allergens: ['trees_cat', 'grass_cat', 'weeds_cat'] to make that explicit, or enable the per-allergen DetailSensor entities (disabled by default) for EU/UK zones. See https://github.com/krissen/pollenprognos-card/blob/master/docs/troubleshooting.md#kleenex" : "[Kleenex] No per-allergen data found. The Kleenex API for North America (US/Canada) zones only provides category totals (trees/grass/weeds), not per-allergen breakdowns. Configure your card with allergens: ['trees_cat', 'grass_cat', 'weeds_cat'] for these zones, or enable the per-allergen DetailSensor entities (disabled by default) for EU/UK zones. See https://github.com/krissen/pollenprognos-card/blob/master/docs/troubleshooting.md#kleenex"
    ));
  }
  n && (console.debug("[Kleenex] === ALLERGEN DATA COLLECTION COMPLETE ==="), console.debug(
    `[Kleenex] Collected data for ${f.size} allergens:`,
    Array.from(f.keys())
  ), f.size === 0 ? (console.debug(
    "[Kleenex] WARNING: No allergen data collected! This will result in empty sensors array."
  ), console.debug("[Kleenex] Checking config:", {
    allergens: t.allergens,
    location: t.location,
    filteredSensorCount: v.length
  }), console.debug(
    "[Kleenex] Sensor entity IDs processed:",
    v.map((m) => m.entity_id)
  ), console.debug(
    "[Kleenex] Was any category sensor found that matches config allergens?"
  )) : (console.debug("[Kleenex] DETAILED ALLERGEN DATA ANALYSIS:"), f.forEach((m, R) => {
    var re;
    const G = ["trees_cat", "grass_cat", "weeds_cat"].includes(
      R
    );
    console.debug(
      `[Kleenex] === ${R.toUpperCase()} (${G ? "CATEGORY" : "INDIVIDUAL"}) ===`
    ), console.debug(`[Kleenex] Source: ${m.source}`), console.debug(`[Kleenex] Entity: ${m.entity_id}`), console.debug(`[Kleenex] Levels array length: ${m.levels.length}`), console.debug(
      `[Kleenex] Valid levels count (>= 0): ${m.levels.filter((ee) => ee.level >= 0).length}`
    ), m.levels.forEach((ee, de) => {
      var ue;
      const ne = de === 0 ? "TODAY" : `DAY+${de}`;
      console.debug(
        `[Kleenex] ${R} ${ne}: date=${(ue = ee.date) == null ? void 0 : ue.toISOString().split("T")[0]}, level=${ee.level}, value=${ee.value}`
      );
    });
    const X = (re = m.levels[0]) == null ? void 0 : re.level, Z = X !== void 0 && X >= 0;
    console.debug(
      `[Kleenex] ${R} TODAY DATA CHECK: hasValidToday=${Z}, todayLevel=${X}`
    );
  }))), n && (console.debug(
    `[Kleenex] === BUILDING SENSORS FROM ${f.size} COLLECTED ALLERGENS ===`
  ), console.debug(`[Kleenex] pollen_threshold = ${p}`), f.forEach((m, R) => {
    console.debug(
      `[Kleenex] Building sensor for: ${R}, source: ${m.source}, levels_count: ${m.levels.length}`
    ), m.levels[0] ? console.debug(
      `[Kleenex] ${R} today data: level=${m.levels[0].level}, value=${m.levels[0].value}`
    ) : console.debug(`[Kleenex] ${R} WARNING: No today data found!`);
  }));
  const ae = t.sort === "none" ? Q.filter((m) => f.has(m)) : Array.from(f.keys());
  n && console.debug(
    `[Kleenex] Building sensors array ${t.sort === "none" ? "in config order" : "in discovery order"}:`,
    ae
  );
  for (const m of ae) {
    const R = f.get(m);
    if (R)
      try {
        const G = {};
        G.allergenReplaced = m, G.entity_id = R.entity_id, G.days = [];
        const { allergenCapitalized: X, allergenShort: Z } = De(
          m,
          {
            fullPhrases: d,
            shortPhrases: _,
            abbreviated: t.allergens_abbreviated,
            lang: r
          }
        );
        G.allergenCapitalized = X, G.allergenShort = Z;
        const re = R.levels;
        for (; re.length < s; ) {
          const te = re.length;
          re.push({
            date: new Date(x.getTime() + te * 864e5),
            level: -1,
            value: -1
          });
        }
        for (let te = 0; te < s; te++)
          re[te] || (re[te] = {
            date: new Date(x.getTime() + te * 864e5),
            level: -1,
            value: -1
          });
        const ee = 5;
        let ne = Array.from(
          { length: 7 },
          (te, se) => pe(`card.levels.${se}`, r)
        ).slice();
        Array.isArray(c) && (c.length === 7 ? ne = pt(
          c,
          r
        ) : c.length === ee && [0, 1, 3, 5, 6].forEach((se, ve) => {
          const me = c[ve];
          me != null && me !== "" && (ne[se] = me);
        }));
        for (let te = 0; te < s; te++) {
          const se = re[te], ve = se.date, me = Math.round((ve.getTime() - x.getTime()) / 864e5), xe = Ne(ve, me, {
            daysRelative: a,
            dayAbbrev: i,
            daysUppercase: l,
            userDays: u,
            lang: r,
            locale: o
          }), $e = se.level;
          let Ae;
          $e < 0 ? Ae = $e : $e < 2 ? Ae = Math.floor($e * 6 / 4) : Ae = Math.ceil($e * 6 / 4);
          const hr = {
            name: G.allergenCapitalized,
            day: xe,
            state: $e,
            // Raw level for sorting and threshold checking
            // display_state mirrors state: kleenex has no separate display value,
            // so the contract's always-present display_state carries the level.
            display_state: $e,
            state_text: Ae < 0 ? h : ne[Ae] || pe(`card.levels.${Ae}`, r),
            value: se.value,
            // Raw ppm measurement, surfaced only when the user opts into
            // numeric_value_raw (resolveNumericValue). state stays the level.
            raw_value: se.value != null && Number.isFinite(Number(se.value)) ? Number(se.value) : null,
            description: Ae < 0 ? h : ne[Ae] || pe(`card.levels.${Ae}`, r)
          };
          G.days.push(hr);
        }
        const ue = Fe(G.days, p);
        if (n) {
          const te = ["trees_cat", "grass_cat", "weeds_cat"].includes(
            m
          );
          console.debug(
            `[Kleenex] === THRESHOLD CHECK for ${m} (${te ? "CATEGORY" : "INDIVIDUAL"}) ===`
          ), console.debug(`[Kleenex] pollen_threshold = ${p}`), console.debug(`[Kleenex] days.length = ${G.days.length}`), G.days.forEach((se, ve) => {
            console.debug(
              `[Kleenex] ${m} day${ve}: state=${se.state}, value=${se.value}, day=${se.day}, meets_threshold=${se.state >= p}`
            );
          }), console.debug(
            `[Kleenex] shouldAdd = ${ue} (any day >= ${p}, or threshold===0)`
          ), te && !ue ? (console.debug(
            `[Kleenex] ❌ CATEGORY ALLERGEN ${m} FILTERED OUT BY THRESHOLD!`
          ), console.debug(
            `[Kleenex] Highest level found: ${Math.max(...G.days.map((se) => se.state))}`
          )) : te && ue && console.debug(
            `[Kleenex] ✅ CATEGORY ALLERGEN ${m} PASSES THRESHOLD CHECK`
          );
        }
        ue ? (b.push(G), n && console.debug(
          `[Kleenex] SENSOR ADDED for ${m}: today_state=${(q = (B = G.days) == null ? void 0 : B[0]) == null ? void 0 : q.state}, entity_id=${G.entity_id}`
        )) : n && console.debug(
          `[Kleenex] SENSOR FILTERED OUT for ${m}: threshold not met (highest level: ${Math.max(...G.days.map((te) => te.state))})`
        );
      } catch (G) {
        console.warn(`[Kleenex] Adapter error for allergen ${m}:`, G);
      }
  }
  if (t.sort !== "none")
    if (t.sort_category_allergens_first) {
      const m = b.filter(
        (G) => ["trees_cat", "grass_cat", "weeds_cat"].includes(G.allergenReplaced)
      ), R = b.filter(
        (G) => !["trees_cat", "grass_cat", "weeds_cat"].includes(G.allergenReplaced)
      );
      Pe(m, t.sort), Pe(R, t.sort), b = [...m, ...R], n && console.debug(
        `[Kleenex] Two-tiered sorting: ${m.length} category + ${R.length} individual allergens`
      );
    } else
      Pe(b, t.sort), n && console.debug(
        `[Kleenex] Standard sorting: ${b.length} allergens sorted together`
      );
  else n && console.debug(
    `[Kleenex] No sorting applied: ${b.length} allergens kept in config order`
  );
  if (n) {
    if (console.debug("[Kleenex] === FINAL ADAPTER RESULTS ==="), console.debug(`[Kleenex] Total sensors returning: ${b.length}`), b.length === 0) {
      console.debug("[Kleenex] ❌ NO SENSORS RETURNED! Checking why:"), console.debug(`[Kleenex] - allergenData.size: ${f.size}`), console.debug(`[Kleenex] - pollen_threshold: ${p}`), console.debug(`[Kleenex] - config.allergens: [${w.join(", ")}]`);
      let m = 0;
      f.forEach((R, G) => {
        R.levels.some(
          (Z) => Z.level >= p
        ) || (m++, console.debug(
          `[Kleenex] - ${G} filtered by threshold (max level: ${Math.max(...R.levels.map((Z) => Z.level))})`
        ));
      }), console.debug(
        `[Kleenex] - allergens filtered by threshold: ${m}`
      );
    } else
      console.debug("[Kleenex] ✅ SENSORS FOUND:"), b.forEach((m, R) => {
        var X, Z;
        const G = ["trees_cat", "grass_cat", "weeds_cat"].includes(
          m.allergenReplaced
        );
        console.debug(
          `[Kleenex] ${R + 1}. ${m.allergenReplaced} (${G ? "CATEGORY" : "INDIVIDUAL"}): day0_state=${(Z = (X = m.days) == null ? void 0 : X[0]) == null ? void 0 : Z.state}, entity_id=${m.entity_id}`
        );
      });
    console.debug("[Kleenex] Adapter fetchForecast complete.");
  }
  return b;
}
const $d = {
  priority: 5,
  detectStates(e, t, r = !1) {
    var i, l;
    const o = Xt(e, r), a = new Set(
      t.stateIds.filter(
        (n) => typeof n == "string" && n.startsWith("sensor.kleenex_pollen_radar_")
      )
    );
    for (const n of o.locations.values())
      for (const s of ((i = n.entities) == null ? void 0 : i.values()) ?? [])
        (l = e == null ? void 0 : e.states) != null && l[s] && a.add(s);
    return { ids: Array.from(a), discovery: o };
  },
  discover: (e, t) => Xt(e, t),
  extractLocationSlug: dr,
  // The one definition of "which location does this config mean": exact key,
  // then the rename-stable device identifier, then label/entity-ID matching.
  // The card and both editors resolve through this instead of rebuilding the
  // chain locally. The cast narrows the structural discovery type back to the
  // device discovery Kleenex always produces.
  resolveLocation: (e, t, r) => Uo(
    e,
    t,
    r
  ),
  // `sensor.<prefix>_date` / `_last_updated` carry no level and their friendly
  // names would yield a header like "Kleenex pollen Date", so the card asks
  // the adapter which entity IDs are renderable before deriving a title.
  isRenderableEntity: (e) => Fo(e) !== null,
  // Manual mode's entity_prefix can straddle two config entries, so the header
  // narrows its candidate entities through the same rule fetchForecast uses;
  // otherwise the two can name and render different locations.
  // The cast narrows the structural discovery type back to the device
  // discovery Kleenex always produces, as in resolveLocation above.
  scopeManualEntities: (e, t, r) => Vo(e, t, {
    ...r,
    discovery: r.discovery
  })
}, Pd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DOMAIN: Ot,
  INDIVIDUAL_TO_CATEGORY: Li,
  KLEENEX_ALLERGEN_CATEGORIES: Ei,
  KLEENEX_ALLERGEN_MAP: ut,
  KLEENEX_EDITOR_ALLERGENS: Ii,
  PLATFORM: Fr,
  _resetManualScopeWarningsForTest: yd,
  autodetect: $d,
  canonicalAllergenFromSlug: Ur,
  capitalize: Et,
  classifyKleenexEntityId: Fo,
  discoverKleenex: Xt,
  fetchForecast: Ad,
  kleenexSlugExtractor: dr,
  matchKleenexLocationByIdentifier: Ni,
  normalizeDetailName: Jt,
  ppmToLevel: rt,
  resolveEntityIds: zd,
  resolveKleenexLocationEntry: Uo,
  scopeManualEntities: Vo,
  stubConfigKleenex: Yt
}, Symbol.toStringTag, { value: "Module" })), Lr = "sensor.pollen_", Di = {
  sorrel: ["Rumex", "Sorrel", "Ampfer", "Oseille"],
  mugwort: ["Artemisia", "Mugwort", "Beifuß", "Beifuss", "Armoise"],
  birch: ["Betula", "Birch", "Birke", "Bouleau"],
  beech: ["Fagus", "Beech", "Buche", "Hêtre", "Hetre", "Hetra"],
  oak: ["Quercus", "Oak", "Eiche", "Chêne", "Chene"],
  alder: ["Alnus", "Alder", "Erle", "Aulne"],
  ash: ["Fraxinus", "Ash", "Esche", "Frêne", "Frene"],
  goosefoot: [
    "Chenopodium",
    "Goosefoot",
    "Gänsefuß",
    "Gaensefuss",
    "Gansefuss",
    "Chénopode",
    "Chenopode"
  ],
  poaceae: [
    "Poacea",
    "Poaceae",
    "Grasses",
    "Gräser",
    "Graeser",
    "Graminées",
    "Graminees"
  ],
  hazel: ["Corylus", "Hazel", "Hasel", "Haselnussstrauch", "Noisetier"],
  plantain: ["Plantago", "Plantain", "Wegerich"]
}, bt = Object.keys(Di).sort(), cr = Object.entries(
  Di
).reduce(
  (e, [t, r]) => {
    const o = Array.from(new Set(r.map((a) => _e(a))));
    return o.includes(t) || o.push(t), e[t] = o, e;
  },
  {}
), Md = (() => {
  const e = {};
  for (const [t, r] of Object.entries(cr)) {
    for (const o of r) e[o] = t;
    e[t] = t;
  }
  return e;
})();
function Na(e) {
  if (!e.startsWith(Lr)) return null;
  const t = e.substring(Lr.length);
  return Md[t] || null;
}
function Cd(e, t = !1) {
  return e ? je(e, {
    platform: ["pollen_lu", "pollenlu"],
    classify: Na,
    classifyRelaxed: Na,
    isRelevant: (r) => r.startsWith(Lr),
    resolveLabel: (r) => {
      var o, a;
      return ((o = r.device) == null ? void 0 : o.name_by_user) || ((a = r.device) == null ? void 0 : a.name) || "Pollen.lu";
    },
    resolveLocationKey: () => "default",
    fallbackRegex: null,
    debug: t,
    logTag: "PLU"
  }) : { locations: /* @__PURE__ */ new Map(), tierUsed: 0 };
}
const Wo = Ee(Cd), Ed = {
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
}, er = {
  integration: "plu",
  // location: "" -> autodetect; "manual" -> use entity_prefix/_suffix.
  // PLU historically had no location field (single-instance integration),
  // but manual mode needs the toggle to route through resolveEntityIds.
  location: "",
  entity_prefix: "",
  entity_suffix: "",
  allergens: [...bt],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: 48,
  text_size_ratio: 1,
  ...U,
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
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
};
function Ld(e, t, r) {
  const o = cr[t] || [t];
  for (const a of o) {
    const i = `${Lr}${a}`;
    if (e.states[i])
      return r && console.debug(
        `[PLU] Using sensor '${i}' for allergen '${t}'`
      ), i;
  }
  return null;
}
function Id(e, t, r, o, a) {
  const i = cr[t] || [t];
  for (const l of i) {
    const n = Zt(e, r, l, o);
    if (n)
      return a && console.debug(
        `[PLU] Manual mode: using sensor '${n}' for allergen '${t}'`
      ), n;
  }
  return null;
}
function Oi(e, t, r = !1) {
  const o = e.allergens || [];
  if (e.location === "manual") {
    const l = Ce(e.entity_prefix), n = e.entity_suffix || "";
    if (l) {
      const s = /* @__PURE__ */ new Map();
      for (const d of o) {
        if (!bt.includes(d)) continue;
        const _ = Id(
          t,
          d,
          l,
          n,
          r
        );
        _ && s.set(d, _);
      }
      if (s.size > 0) return s;
      r && console.debug(
        `[PLU] Manual probe with prefix '${l}' resolved zero sensors; falling through to auto-discovery.`
      );
    } else r && console.debug(
      "[PLU] location === 'manual' but entity_prefix is empty; falling through to auto-discovery for backwards compatibility."
    );
  }
  const a = Wo(t, r);
  if (a.locations.size > 0) {
    const l = a.locations.entries().next();
    if (!l.done) {
      const [, n] = l.value, s = /* @__PURE__ */ new Map();
      for (const d of o) {
        if (!bt.includes(d)) continue;
        const _ = n.entities.get(d);
        _ && s.set(d, _);
      }
      if (s.size > 0)
        return r && console.debug(
          "[PLU] resolveEntityIds via discovery:",
          s.size,
          "entities"
        ), s;
    }
  }
  const i = /* @__PURE__ */ new Map();
  for (const l of o) {
    if (!bt.includes(l)) continue;
    const n = Ld(t, l, r);
    n && i.set(l, n);
  }
  return i;
}
function ja(e, t) {
  const r = Number(e);
  return Number.isFinite(r) ? r : t;
}
function Td(e, t) {
  const r = Number(e);
  if (!Number.isFinite(r) || r < 0) return -1;
  if (r === 0) return 0;
  const { moderate: o, high: a } = t;
  return r < o ? 1 : r < a ? 2 : 3;
}
async function Nd(e, t) {
  var $, j, P, L, I, D;
  const r = !!t.debug, { lang: o, locale: a, daysRelative: i, dayAbbrev: l, daysUppercase: n } = Ve(e, t), { fullPhrases: s, shortPhrases: d, userLevels: _, userDays: c, noInfoLabel: u } = Ue(t, o), h = pt(
    _,
    o
  ), w = ws.map((z, S) => {
    const T = Array.isArray(_) ? _[S] : void 0;
    return T != null && T !== "" ? T : h[z] || pe(`card.levels.${z}`, o);
  }), y = t.pollen_threshold ?? er.pollen_threshold, x = Math.max(
    1,
    t.days_to_show ?? er.days_to_show
  ), k = /* @__PURE__ */ new Date();
  k.setHours(0, 0, 0, 0);
  const v = [], g = Oi(t, e, r);
  for (const z of t.allergens || []) {
    if (!bt.includes(z)) continue;
    const S = { days: [] };
    S.allergenReplaced = z;
    const { allergenCapitalized: T, allergenShort: E } = De(
      z,
      {
        fullPhrases: s,
        shortPhrases: d,
        abbreviated: t.allergens_abbreviated,
        lang: o
      }
    );
    S.allergenCapitalized = T, S.allergenShort = E;
    const C = g.get(z);
    if (!C) {
      r && console.debug(`[PLU] No sensor found for allergen '${z}'`);
      continue;
    }
    const N = e.states[C];
    if (!N) continue;
    S.entity_id = C, S.attributes = N.attributes || {};
    const H = Number(N.state), K = Ed[z] || {
      moderate: 1,
      high: 2
    }, V = ja(
      ($ = S.attributes) == null ? void 0 : $.moderate_threshold,
      K.moderate
    ), M = ja(
      (j = S.attributes) == null ? void 0 : j.high_threshold,
      K.high
    ), b = Td(H, { moderate: V, high: M }), f = (P = S.attributes) != null && P.last_update ? new Date(S.attributes.last_update) : k, O = Ne(f, 0, {
      daysRelative: i,
      dayAbbrev: l,
      daysUppercase: n,
      userDays: c,
      lang: o,
      locale: a
    }), F = b < 0 ? u : w[b] || u, Y = {
      name: S.allergenCapitalized,
      day: O,
      state: b,
      // display_state is the level shown by default; the raw concentration
      // (p/m3) lives in raw_value and is surfaced only when the user opts into
      // numeric_value_raw (resolveNumericValue picks one or the other).
      display_state: b,
      raw_value: Number.isFinite(H) ? H : null,
      state_text: F,
      // TODO(#259-normalize): thresholds/level_string/last_update/next_poll are
      // PLU-only day fields carried through for display.
      thresholds: { moderate: V, high: M },
      level_string: ((L = S.attributes) == null ? void 0 : L.level) || null,
      last_update: ((I = S.attributes) == null ? void 0 : I.last_update) || null,
      next_poll: ((D = S.attributes) == null ? void 0 : D.next_poll) || null
    };
    for (S.days.push(Y); S.days.length < x; )
      S.days.push({
        name: S.allergenCapitalized,
        day: "",
        state: -1,
        display_state: -1,
        state_text: u
      });
    Fe(S.days.slice(0, 1), y) && v.push(S);
  }
  if (t.sort !== "none") {
    const z = {
      value_ascending: (S, T) => {
        var E, C, N, H;
        return (((C = (E = S.days) == null ? void 0 : E[0]) == null ? void 0 : C.state) ?? 0) - (((H = (N = T.days) == null ? void 0 : N[0]) == null ? void 0 : H.state) ?? 0);
      },
      value_descending: (S, T) => {
        var E, C, N, H;
        return (((C = (E = T.days) == null ? void 0 : E[0]) == null ? void 0 : C.state) ?? 0) - (((H = (N = S.days) == null ? void 0 : N[0]) == null ? void 0 : H.state) ?? 0);
      },
      name_ascending: (S, T) => (S.allergenCapitalized || "").localeCompare(
        T.allergenCapitalized || "",
        o
      ),
      name_descending: (S, T) => (T.allergenCapitalized || "").localeCompare(
        S.allergenCapitalized || "",
        o
      ),
      none: () => 0
    };
    v.sort(
      z[t.sort] || ((S, T) => {
        var E, C, N, H;
        return (((C = (E = S.days) == null ? void 0 : E[0]) == null ? void 0 : C.state) ?? 0) - (((H = (N = T.days) == null ? void 0 : N[0]) == null ? void 0 : H.state) ?? 0);
      })
    );
  }
  return v;
}
const Bi = new Set(
  Object.values(cr).flat()
), jd = {
  priority: 1,
  detectStates(e, t) {
    return { ids: t.stateIds.filter((o) => {
      if (typeof o != "string") return !1;
      const a = /^sensor\.pollen_([^_]+)$/.exec(o);
      return a ? t.pluAllergenSlugs.has(a[1] ?? "") : !1;
    }) };
  },
  discover: Wo,
  allergenSlugs: Bi
}, Rd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PLU_ALIAS_MAP: cr,
  PLU_ALLERGEN_SLUGS: Bi,
  PLU_SUPPORTED_ALLERGENS: bt,
  autodetect: jd,
  discoverPluSensors: Wo,
  fetchForecast: Nd,
  resolveEntityIds: Oi,
  stubConfigPLU: er
}, Symbol.toStringTag, { value: "Module" })), Be = {
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
}, Re = /* @__PURE__ */ new Set([
  "pm25",
  "pm10",
  "ozone",
  "no2",
  "so2"
]), wt = {
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
  icon_size: 48,
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
  pollen_threshold: 1,
  sort: "value_descending",
  allergy_risk_top: !0,
  // Summary block (issue #222): opt-in, additive, never duplicates by default.
  show_summary_block: !1,
  show_summary_row: !1,
  show_summary_separator: !0,
  sort_pollution_block: !0,
  pollution_block_position: "bottom",
  show_block_separator: !1,
  allergens_abbreviated: !1,
  date_locale: void 0,
  title: void 0,
  phrases: {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: ""
  }
}, Gi = [...wt.allergens];
function Dd(e) {
  const t = e.replace(/^sensor\./, "");
  if (t.includes("qualite_globale_pollen")) return "allergy_risk";
  if (t.includes("qualite_globale") && !t.includes("qualite_globale_pollen"))
    return "qualite_globale";
  for (const [r, o] of Object.entries(Be))
    if (!(r === "allergy_risk" || r === "qualite_globale") && !Re.has(r) && (t.includes(`niveau_${o}`) || t.includes(`niveau_alerte_${o}`)))
      return r;
  for (const r of Re) {
    const o = Be[r];
    if (o && t.includes(o) && !t.includes(`niveau_${o}`) && !t.includes(`concentration_${o}`))
      return r;
  }
  return null;
}
function Hi(e) {
  const t = e.replace(/^sensor\./, "");
  if (t.includes("qualite_globale_pollen")) return "allergy_risk";
  if (t.includes("qualite_globale") && !t.includes("qualite_globale_pollen"))
    return "qualite_globale";
  for (const [r, o] of Object.entries(Be))
    if (!(r === "allergy_risk" || r === "qualite_globale") && !Re.has(r) && new RegExp(`(?:^|_)niveau_${o}(?:_|$)`).test(t))
      return r;
  for (const [r, o] of Object.entries(Be)) {
    if (r === "allergy_risk" || r === "qualite_globale" || Re.has(r)) continue;
    if (new RegExp(`(?:^|_)${o}(?:_|$)`).test(t) && !t.includes(`concentration_${o}`))
      return r;
  }
  for (const r of Re) {
    const o = Be[r];
    if (new RegExp(`(?:^|_)${o}(?:_|$)`).test(t) && !t.includes(`niveau_${o}`) && !t.includes(`concentration_${o}`))
      return r;
  }
  return null;
}
function Od(e, t) {
  var o;
  if (t != null && t.name_by_user) return t.name_by_user;
  if (t != null && t.identifiers) {
    for (const a of t.identifiers)
      if (Array.isArray(a) && a[0] === "atmofrance" && a[1]) {
        const i = a[1].indexOf("-");
        if (i >= 0) return a[1].slice(i + 1);
      }
  }
  const r = (o = e == null ? void 0 : e.attributes) == null ? void 0 : o["Nom de la zone"];
  return r || (t != null && t.name && t.name !== "Atmo France" ? t.name : "Auto");
}
function Bd(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map() };
  const r = /^sensor\.(?:\w+_)*(?:niveau_(?:alerte_)?(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)|(?:pm25|pm10|ozone|dioxyde_d_azote|dioxyde_de_soufre)|qualite_globale(?:_pollen)?)_/, { locations: o } = je(e, {
    platform: "atmofrance",
    classify: (a) => Dd(a),
    classifyRelaxed: (a) => Hi(a),
    isRelevant: (a) => !/_j_\d+$/.test(a) && !a.includes("concentration_"),
    resolveLabel: (a) => Od(a.state, a.device),
    fallbackRegex: r,
    debug: t,
    logTag: "ATMO"
  });
  return { locations: o };
}
const Ir = Ee(Bd);
function Wr(e, t) {
  const r = Dt(e, t, {
    suffixExtras: ["", "_j_1"]
  });
  return r ? r[0] : null;
}
function Gd(e, t = !1) {
  for (const r of Object.keys(e.states)) {
    const o = r.match(
      /^sensor\.niveau_(ambroisie|armoise|aulne|bouleau|gramine|olivier)_(.+?)(?:_j_\d+)?$/
    );
    if (o)
      return t && console.debug("[ATMO] auto-detected location:", o[2]), o[2] ?? null;
  }
  for (const r of Object.keys(e.states)) {
    const o = r.match(
      /^sensor\.(pm25|pm10|ozone|dioxyde_d_azote|dioxyde_de_soufre)_(.+?)(?:_j_\d+)?$/
    );
    if (o)
      return t && console.debug(
        "[ATMO] auto-detected location from pollution entity:",
        o[2]
      ), o[2] ?? null;
  }
  for (const r of Object.keys(e.states)) {
    const o = r.match(/^sensor\.qualite_globale_pollen_(.+?)(?:_j_\d+)?$/);
    if (o)
      return t && console.debug(
        "[ATMO] auto-detected location from pollen summary entity:",
        o[1]
      ), o[1] ?? null;
    const a = r.match(/^sensor\.qualite_globale_(?!pollen)(.+?)(?:_j_\d+)?$/);
    if (a)
      return t && console.debug(
        "[ATMO] auto-detected location from global summary entity:",
        a[1]
      ), a[1] ?? null;
  }
  return null;
}
const Hd = Ee(
  Gd,
  "ATMO:detectLocation"
);
function Kd(e, t, r) {
  const o = Be[e];
  if (!o) return null;
  let a;
  return e === "allergy_risk" ? a = `sensor.qualite_globale_pollen_${t}` : e === "qualite_globale" ? a = `sensor.qualite_globale_${t}` : Re.has(e) ? a = `sensor.${o}_${t}` : a = `sensor.niveau_${o}_${t}`, a;
}
function Ki(e, t, r = !1) {
  var d, _;
  const o = /* @__PURE__ */ new Map(), a = e.allergens || [];
  if (e.location === "manual") {
    for (const c of a) {
      const u = Be[c];
      if (!u) continue;
      const h = Ce(e.entity_prefix), p = e.entity_suffix || "";
      let w;
      c === "allergy_risk" ? w = "qualite_globale_pollen" : c === "qualite_globale" ? w = "qualite_globale" : Re.has(c) ? w = u : w = `niveau_${u}`;
      const y = Zt(t, h, w, p);
      y && (r && console.debug(`[ATMO:resolveEntityIds] manual: '${c}' -> '${y}'`), o.set(c, y));
    }
    return o;
  }
  const i = Ir(t, r), l = e.location || "";
  let n = null;
  if (l && i.locations.has(l) ? n = i.locations.get(l).entities : !l && i.locations.size ? n = i.locations.values().next().value.entities : l && Ke(l) && i.locations.size && (r && console.debug(
    `[ATMO:resolveEntityIds] stale config_entry_id '${l}', falling back to first discovered location`
  ), n = i.locations.values().next().value.entities), n) {
    for (const c of a) {
      const u = n.get(c);
      u && ((d = t.states) != null && d[u]) && (r && console.debug(
        `[ATMO:resolveEntityIds] discovery: '${c}' -> '${u}'`
      ), o.set(c, u));
    }
    return o;
  }
  if (l && !i.locations.has(l)) {
    const c = Wr(i, l);
    if (c) {
      n = i.locations.get(c).entities;
      for (const u of a) {
        const h = n.get(u);
        h && ((_ = t.states) != null && _[h]) && (r && console.debug(
          `[ATMO:resolveEntityIds] slug->discovery: '${u}' -> '${h}'`
        ), o.set(u, h));
      }
      return o;
    }
  }
  const s = l || Hd(t, r) || "";
  if (!s) return o;
  for (const c of a) {
    const u = Be[c];
    if (!u) continue;
    let h = Kd(c, s);
    if (!h || !t.states[h]) {
      let p;
      c === "allergy_risk" ? p = "sensor.qualite_globale_pollen_" : c === "qualite_globale" ? p = "sensor.qualite_globale_" : Re.has(c) ? p = `sensor.${u}_` : p = `sensor.niveau_${u}_`;
      const w = Object.keys(t.states).filter((y) => !(!y.startsWith(p) || y.includes("_j_") || c === "qualite_globale" && y.includes("qualite_globale_pollen")));
      if (w.length === 1) h = w[0];
      else continue;
    }
    r && console.debug(`[ATMO:resolveEntityIds] slug fallback: '${c}' -> '${h}'`), o.set(c, h);
  }
  return o;
}
async function Fd(e, t) {
  var L, I;
  const r = !!t.debug, { lang: o, locale: a, daysRelative: i, dayAbbrev: l, daysUppercase: n } = Ve(
    e,
    t,
    wt.date_locale
  ), { fullPhrases: s, shortPhrases: d, userLevels: _, userDays: c, noInfoLabel: u } = Ue(t, o), h = pt(
    _,
    o
  ), p = t.days_to_show ?? wt.days_to_show, w = t.pollen_threshold ?? wt.pollen_threshold;
  r && console.debug("ATMO adapter: start fetchForecast", { config: t, lang: o });
  const y = (D) => gt(D, null, -1), x = (D) => {
    const z = pe(D, o);
    return z !== D ? z : null;
  }, k = x("card.atmo.unavailable"), v = x("card.atmo.event"), g = (D, z) => D < 0 ? { state: -1, display_state: -1, state_text: u } : D === 0 ? {
    state: -1,
    display_state: -1,
    state_text: k || z || u
  } : D >= 1 && D <= 6 ? {
    state: D,
    display_state: D,
    state_text: h[D] || z || u
  } : D === 7 ? {
    state: 6,
    display_state: 6,
    state_text: v || z || u
  } : {
    state: Math.min(D, 6),
    display_state: Math.min(D, 6),
    state_text: z || u
  }, $ = Ki(t, e, r), j = /* @__PURE__ */ new Date();
  j.setHours(0, 0, 0, 0);
  let P = [];
  for (const D of t.allergens || [])
    try {
      const z = { days: [] };
      z.allergenReplaced = D, z.group = D === "qualite_globale" || Re.has(D) ? "pollution" : "pollen";
      const { allergenCapitalized: S, allergenShort: T } = De(
        D,
        {
          fullPhrases: s,
          shortPhrases: d,
          abbreviated: t.allergens_abbreviated,
          lang: o
        }
      );
      z.allergenCapitalized = S, z.allergenShort = T, D === "allergy_risk" && (z.isSummary = !0);
      const E = $.get(D);
      if (!E) continue;
      const C = e.states[E];
      z.entity_id = E;
      const N = y(C.state), H = ((L = C.attributes) == null ? void 0 : L.Libellé) || "";
      let K = -1, V = "";
      const M = `${E}_j_1`;
      e.states[M] && (K = y(e.states[M].state), V = ((I = e.states[M].attributes) == null ? void 0 : I.Libellé) || "");
      const b = [
        { date: j, level: N, libelle: H },
        {
          date: new Date(j.getTime() + 864e5),
          level: K,
          libelle: V
        }
      ];
      for (; b.length < p; ) {
        const O = b.length;
        b.push({
          date: new Date(j.getTime() + O * 864e5),
          level: -1,
          libelle: ""
        });
      }
      b.forEach((O) => {
        const F = Math.round((O.date.getTime() - j.getTime()) / 864e5), Y = Ne(O.date, F, {
          daysRelative: i,
          dayAbbrev: l,
          daysUppercase: n,
          userDays: c,
          lang: o,
          locale: a
        }), Q = g(O.level, O.libelle), J = {
          name: z.allergenCapitalized,
          day: Y,
          state: Q.state,
          display_state: Q.display_state,
          state_text: Q.state_text
        };
        z.days.push(J);
      }), (D === "allergy_risk" && Ge(t.show_summary_block) || Fe(z.days, w)) && P.push(z);
    } catch (z) {
      console.warn(`ATMO adapter error for allergen ${D}:`, z);
    }
  if (t.sort !== "none") {
    const z = {
      value_ascending: (S, T) => {
        var E, C, N, H, K, V, M, b;
        return (((C = (E = S.days) == null ? void 0 : E[0]) == null ? void 0 : C.display_state) ?? 0) - (((H = (N = T.days) == null ? void 0 : N[0]) == null ? void 0 : H.display_state) ?? 0) || (((V = (K = S.days) == null ? void 0 : K[0]) == null ? void 0 : V.state) ?? 0) - (((b = (M = T.days) == null ? void 0 : M[0]) == null ? void 0 : b.state) ?? 0);
      },
      value_descending: (S, T) => {
        var E, C, N, H, K, V, M, b;
        return (((C = (E = T.days) == null ? void 0 : E[0]) == null ? void 0 : C.display_state) ?? 0) - (((H = (N = S.days) == null ? void 0 : N[0]) == null ? void 0 : H.display_state) ?? 0) || (((V = (K = T.days) == null ? void 0 : K[0]) == null ? void 0 : V.state) ?? 0) - (((b = (M = S.days) == null ? void 0 : M[0]) == null ? void 0 : b.state) ?? 0);
      },
      name_ascending: (S, T) => S.allergenCapitalized.localeCompare(T.allergenCapitalized),
      name_descending: (S, T) => T.allergenCapitalized.localeCompare(S.allergenCapitalized)
    }[t.sort] || ((S, T) => {
      var E, C, N, H, K, V, M, b;
      return (((C = (E = T.days) == null ? void 0 : E[0]) == null ? void 0 : C.display_state) ?? 0) - (((H = (N = S.days) == null ? void 0 : N[0]) == null ? void 0 : H.display_state) ?? 0) || (((V = (K = T.days) == null ? void 0 : K[0]) == null ? void 0 : V.state) ?? 0) - (((b = (M = S.days) == null ? void 0 : M[0]) == null ? void 0 : b.state) ?? 0);
    });
    if (t.sort_pollution_block) {
      const S = [], T = [];
      for (const E of P)
        E.group === "pollution" ? T.push(E) : S.push(E);
      if (S.sort(z), T.sort(z), t.allergy_risk_top) {
        const E = S.findIndex(
          (N) => N.allergenReplaced === "allergy_risk"
        );
        E > 0 && S.unshift(...S.splice(E, 1));
        const C = T.findIndex(
          (N) => N.allergenReplaced === "qualite_globale"
        );
        C > 0 && T.unshift(...T.splice(C, 1));
      }
      P = t.pollution_block_position === "top" ? [...T, ...S] : [...S, ...T];
    } else if (P.sort(z), t.allergy_risk_top) {
      const S = P.findIndex(
        (E) => E.allergenReplaced === "qualite_globale"
      );
      S > 0 && P.unshift(...P.splice(S, 1));
      const T = P.findIndex(
        (E) => E.allergenReplaced === "allergy_risk"
      );
      T > 0 && P.unshift(...P.splice(T, 1));
    }
  }
  return r && console.debug("ATMO adapter complete sensors:", P), P;
}
const Ud = {
  priority: 6,
  detectStates(e, t, r = !1) {
    const o = Ir(e, r), a = [];
    if (o.locations.size > 0) {
      for (const [, i] of o.locations)
        if (i.entities)
          for (const l of i.entities.values()) a.push(l);
    }
    if (!a.length)
      for (const i of t.stateIds)
        typeof i == "string" && /^sensor\.(?:niveau_(?:alerte_)?(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)|(?:pm25|pm10|ozone|dioxyde_d_azote|dioxyde_de_soufre)|qualite_globale(?:_pollen)?)_/.test(
          i
        ) && !/_j_\d+$/.test(i) && a.push(i);
    return { ids: a, discovery: o };
  },
  discover: (e, t) => Ir(e, t)
}, Vd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ATMO_ALLERGENS: Gi,
  ATMO_ALLERGEN_MAP: Be,
  ATMO_POLLUTION_ALLERGENS: Re,
  autodetect: Ud,
  classifyAtmoEntityRelaxed: Hi,
  discoverAtmoSensors: Ir,
  fetchForecast: Fd,
  findAtmoLocationBySlug: Wr,
  resolveEntityIds: Ki,
  stubConfigATMO: wt
}, Symbol.toStringTag, { value: "Module" }));
function qr(e) {
  return typeof e == "string" && (e.includes("pollen data from Google") || // pollenlevels <= 3.0.0rc2 published this legacy wording
  e === "Data provided by Google Maps Pollen API");
}
const Fi = {
  "mdi:grass": "grass_cat",
  "mdi:tree": "trees_cat",
  "mdi:flower-tulip": "weeds_cat"
}, At = ["grass_cat", "trees_cat", "weeds_cat"], Bt = {
  integration: "gpl",
  location: "",
  entity_prefix: "",
  entity_suffix: "",
  allergens: ["allergy_risk", "grass_cat", "trees_cat", "weeds_cat"],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: 48,
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
  // Google's attribution policy requires visible attribution for pollen data
  // sourced from Google, so this defaults on; the user may still opt out (#338).
  show_google_attribution: !0,
  // Summary block (issue #222): opt-in, additive, never duplicates by default.
  // The two extras default true but stay invisible until show_summary_block is
  // turned on, so opting into the block gives the full rich GPL block at once.
  show_summary_block: !1,
  show_summary_row: !1,
  show_summary_separator: !0,
  show_summary_top_types: !0,
  show_summary_plants_in_season: !0,
  allergens_abbreviated: !1,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
};
function $t(e) {
  if (typeof e != "string") return e;
  const t = e.trim();
  if (!t) return t;
  const r = /\s*\(\s*[+-]?\d+(?:\.\d+)?\s*,\s*[+-]?\d+(?:\.\d+)?\s*\)\s*$/, o = t.replace(r, "").trim();
  if (o === t) return t;
  const a = o.lastIndexOf(" - "), i = o.lastIndexOf(" – "), l = o.lastIndexOf(" — "), n = Math.max(a, i, l);
  return (n >= 0 ? o.slice(0, n).trim() : o) || t;
}
function Tr(e, t) {
  const r = (e == null ? void 0 : e.attributes) || {};
  if (r.code)
    return r.code.toLowerCase();
  const o = Fi[r.icon];
  if (o) return o;
  const a = t == null ? void 0 : t.unique_id, i = t == null ? void 0 : t.translation_key;
  return typeof a == "string" && a.endsWith("_overall_pollen_risk_today") || i === "overall_pollen_risk_today" ? "allergy_risk" : i === "top_pollen_types_today" || i === "plants_in_season_today" || typeof a == "string" && (a.endsWith("_top_pollen_types_today") || a.endsWith("_plants_in_season_today")) ? null : Array.isArray(r.top_pollen_codes) && r.top_value === void 0 ? "allergy_risk" : null;
}
function at(e) {
  const r = ((e == null ? void 0 : e.attributes) || {}).device_class;
  return r !== "date" && r !== "timestamp";
}
function Wd(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map() };
  const { locations: r } = je(e, {
    platform: "pollenlevels",
    // classify is used in tier 2 and tier 3; reads state.attributes.code
    // or icon, and falls through to the registry entry for v2.1.0 summary
    // sensors which only expose their identity via unique_id /
    // translation_key.
    classify: (o, { state: a, entry: i }) => at(a) ? Tr(a, i) : null,
    // classifyRelaxed used in tier 1 -- same logic, no relaxation needed for GPL.
    classifyRelaxed: (o, { state: a, entry: i }) => at(a) ? Tr(a, i) : null,
    // isRelevant: additional pre-classification filter (device_class check handled in classify)
    isRelevant: (o, { state: a }) => at(a),
    // fallbackSelector: tier 3 uses attribution attribute instead of entity ID regex
    fallbackSelector: (o) => Object.keys(o.states).filter((a) => {
      var l;
      const i = o.states[a];
      return qr((l = i == null ? void 0 : i.attributes) == null ? void 0 : l.attribution) && // GP (svenove/google_pollen) publishes no attribution today;
      // exclude its ids so a future upstream addition can't leak its
      // sensors into GPL discovery.
      !a.startsWith("sensor.google_pollen_") && at(i);
    }),
    /**
     * resolveLabel priority for GPL:
     *   1. device.name_by_user -- explicit user override, kept verbatim.
     *   2. device.name run through cleanDeviceLabel to strip the
     *      "{location} - {category-localized} ({lat},{lng})" suffix that
     *      the pollenlevels integration appends. cleanDeviceLabel uses a
     *      locale-agnostic regex so new HA languages don't regress this.
     *   3. friendly_name from state.attributes.
     *   4. "Auto" fallback.
     */
    resolveLabel: (o) => {
      var i, l, n, s;
      if ((i = o.device) != null && i.name_by_user) return o.device.name_by_user;
      const a = $t((l = o.device) == null ? void 0 : l.name);
      return typeof a == "string" && a.trim() ? a : (s = (n = o.state) == null ? void 0 : n.attributes) != null && s.friendly_name ? $t(o.state.attributes.friendly_name) : "Auto";
    },
    debug: t,
    logTag: "GPL"
  });
  return { locations: r };
}
const _r = Ee(Wd);
function Po(e, t, r = !1) {
  const o = _r(e, r);
  if (!o.locations.size) return [];
  let a;
  if (t && o.locations.has(t) ? a = o.locations.get(t) : a = o.locations.values().next().value, !a) return [];
  const i = [...a.entities.keys()], l = i.filter((s) => At.includes(s)).sort(), n = i.filter((s) => !At.includes(s)).sort();
  return [...l, ...n];
}
function qd(e, t, r, o, a) {
  var i;
  if (r.location === "manual") {
    let l = r.entity_prefix || "";
    l.startsWith("sensor.") && (l = l.substring(7));
    const n = r.entity_suffix || "";
    let s = [];
    t.entities && (s = Object.entries(t.entities).filter(
      ([, d]) => d.platform === "pollenlevels" && !d.entity_category
    ).map(([d]) => d)), s.length || (s = Object.keys(t.states || {}).filter((d) => {
      var c;
      const _ = t.states[d];
      return qr((c = _ == null ? void 0 : _.attributes) == null ? void 0 : c.attribution) && // See fallbackSelector above: keep GP entity ids out of GPL
      // manual-mode candidates even if GP ever gains an attribution.
      !d.startsWith("sensor.google_pollen_") && at(_);
    }));
    for (const d of s) {
      const _ = t.states[d];
      if (!_ || !at(_)) continue;
      const c = d.replace(/^sensor\./, "");
      if (l && !c.startsWith(l) || n && !c.endsWith(n)) continue;
      const u = (i = t.entities) == null ? void 0 : i[d];
      if (Tr(_, u) === e) return d;
    }
    return a && console.debug(
      `[GPL] Manual mode: no sensor found for allergen "${e}"`
    ), null;
  }
  return o && o.has(e) ? o.get(e) : (a && console.debug(`[GPL] Sensor not found for allergen "${e}"`), null);
}
function Ui(e, t, r = !1) {
  const o = /* @__PURE__ */ new Map(), a = _r(t, r), i = e.location || "";
  let l = null;
  if (i !== "manual") {
    let n = ye(a, i);
    !n && i && Ke(i) && (n = ye(a, "")), n && (l = n[1].entities);
  }
  for (const n of e.allergens || []) {
    const s = qd(
      n,
      t,
      e,
      l,
      r
    );
    s && t.states[s] && o.set(n, s);
  }
  return o;
}
const Zd = {
  TREE: "trees_cat",
  GRASS: "grass_cat",
  WEED: "weeds_cat"
};
function Ra(e, t, r) {
  const o = `card.allergen.${e}`, a = pe(o, r);
  return typeof a == "string" && a && a !== o ? a : typeof t == "string" && t.trim() ? t.trim() : Et(String(e).replace(/_/g, " "));
}
function Da(e, t) {
  var i, l;
  const r = (i = e == null ? void 0 : e.entities) == null ? void 0 : i[t], o = r != null && r.device_id ? (l = e == null ? void 0 : e.devices) == null ? void 0 : l[r.device_id] : null;
  if (!o) return null;
  const a = ir(o);
  return a === "default" ? null : a;
}
function Qd(e, t, r, o) {
  const a = e == null ? void 0 : e.entities;
  if (!a) return null;
  const i = Da(e, t);
  for (const [l, n] of Object.entries(a))
    if (((n == null ? void 0 : n.translation_key) === r || typeof (n == null ? void 0 : n.unique_id) == "string" && n.unique_id.endsWith(o)) && !(i !== null && Da(e, l) !== i))
      return l;
  return null;
}
async function Yd(e, t) {
  var g, $, j;
  const r = !!t.debug, { lang: o, locale: a, daysRelative: i, dayAbbrev: l, daysUppercase: n } = Ve(
    e,
    t,
    Bt.date_locale
  ), { fullPhrases: s, shortPhrases: d, userLevels: _, userDays: c, noInfoLabel: u } = Ue(t, o), h = pt(
    _,
    o
  ), p = t.days_to_show ?? Bt.days_to_show, w = t.pollen_threshold ?? Bt.pollen_threshold, y = (P) => gt(P, 5, -1);
  r && console.debug("[GPL] Adapter: start fetchForecast", { config: t, lang: o });
  const x = Ui(t, e, r), k = /* @__PURE__ */ new Date();
  k.setHours(0, 0, 0, 0);
  let v = [];
  for (const P of t.allergens)
    try {
      const L = { days: [] };
      L.allergenReplaced = P;
      const { allergenCapitalized: I, allergenShort: D } = De(
        P,
        {
          fullPhrases: s,
          shortPhrases: d,
          abbreviated: t.allergens_abbreviated,
          lang: o,
          capitalize: (M) => Et(M.replace(/_/g, " "))
        }
      );
      L.allergenCapitalized = I, L.allergenShort = D;
      const z = x.get(P);
      if (!z) continue;
      const S = e.states[z];
      if (L.entity_id = z, P === "allergy_risk") {
        L.isSummary = !0;
        const M = S.attributes ?? {}, b = Array.isArray(M.top_pollen_codes) ? M.top_pollen_codes : [], f = Array.isArray(M.top_pollen_names) ? M.top_pollen_names : [], O = b.map((B, q) => {
          const m = Zd[String(B).toUpperCase()] || String(B).toLowerCase();
          return Ra(m, f[q], o);
        }).filter((B) => typeof B == "string" && B.trim());
        O.length && (L.topPollen = O);
        const F = Qd(
          e,
          z,
          "plants_in_season_today",
          "_plants_in_season_today"
        ), Y = F ? e.states[F] : null, Q = (Y == null ? void 0 : Y.attributes) ?? {}, J = Array.isArray(Q.plant_codes) ? Q.plant_codes : [], ae = Array.isArray(Q.plant_names) ? Q.plant_names : [];
        let W;
        J.length ? W = J.map(
          (B, q) => Ra(String(B).toLowerCase(), ae[q], o)
        ).filter((B) => typeof B == "string" && B.trim()) : W = ae.filter(
          (B) => typeof B == "string" && B.trim()
        ), W.length && (L.plantsInSeasonList = W);
      }
      r && console.debug(`[GPL] Processing sensor ${z}:`, {
        state: S.state,
        forecast: ($ = (g = S.attributes) == null ? void 0 : g.forecast) == null ? void 0 : $.length
      });
      const T = y(S.state), E = Array.isArray((j = S.attributes) == null ? void 0 : j.forecast) ? S.attributes.forecast : [], C = (M, b) => {
        const f = new Date(M);
        return f.setDate(f.getDate() + b), f.setHours(0, 0, 0, 0), f;
      };
      let N = k;
      for (const M of E) {
        const b = ko(M.date), f = Number(M.offset);
        if (b && Number.isFinite(f) && f >= 1) {
          N = C(b, -f);
          break;
        }
      }
      const H = [{ date: N, level: T }];
      for (const M of E) {
        const b = Number.isFinite(Number(M.offset)) ? Number(M.offset) : H.length, f = ko(M.date) ?? C(N, b);
        if (H.some((Y) => Y.date.toDateString() === f.toDateString()))
          continue;
        const O = M.has_index !== !1, F = M.value ?? M.state ?? M.level ?? M;
        H.push({ date: f, level: O ? y(F) : -1 });
      }
      const K = H.filter((M) => M.date.getTime() - k.getTime() >= 0).sort((M, b) => M.date.getTime() - b.date.getTime());
      for ((!K.length || K[0].date.getTime() - k.getTime() > 0) && K.unshift({ date: k, level: -1 }), K.splice(p); K.length < p; ) {
        const M = K[K.length - 1].date, b = new Date(M.getTime() + 36 * 36e5);
        b.setHours(0, 0, 0, 0), K.push({ date: b, level: -1 });
      }
      for (let M = 0; M < p; M++) {
        const b = K[M];
        if (!b) continue;
        const f = Math.round(
          (b.date.getTime() - k.getTime()) / 864e5
        ), O = Ne(b.date, f, {
          daysRelative: i,
          dayAbbrev: l,
          daysUppercase: n,
          userDays: c,
          lang: o,
          locale: a
        }), F = b.level, Y = bi(F), Q = Y < 0 ? u : h[Y] || u, J = {
          name: L.allergenCapitalized,
          day: O,
          state: b.level,
          display_state: b.level < 0 ? -1 : b.level,
          state_text: Q
        };
        L.days.push(J);
      }
      (P === "allergy_risk" && Ge(t.show_summary_block) || Fe(L.days, w)) && v.push(L);
    } catch (L) {
      console.warn(`[GPL] Adapter error for allergen ${P}:`, L);
    }
  if (t.sort !== "none")
    if (t.sort_category_allergens_first) {
      const P = v.filter(
        (I) => ["trees_cat", "grass_cat", "weeds_cat"].includes(I.allergenReplaced)
      ), L = v.filter(
        (I) => !["trees_cat", "grass_cat", "weeds_cat"].includes(I.allergenReplaced)
      );
      Pe(P, t.sort), Pe(L, t.sort), v = [...P, ...L];
    } else
      Pe(v, t.sort);
  if (t.allergy_risk_top) {
    const P = v.findIndex(
      (L) => L.allergenReplaced === "allergy_risk"
    );
    P > 0 && v.unshift(...v.splice(P, 1));
  }
  return r && console.debug("[GPL] Adapter complete sensors:", v), v;
}
const Jd = {
  priority: 8,
  detectStates(e, t) {
    const r = (a) => {
      var l, n, s;
      const i = (s = (n = (l = e == null ? void 0 : e.states) == null ? void 0 : l[a]) == null ? void 0 : n.attributes) == null ? void 0 : s.device_class;
      return i === "date" || i === "timestamp";
    };
    let o = [];
    return e && e.entities && (o = Object.entries(e.entities).filter(
      ([a, i]) => i.platform === "pollenlevels" && !i.entity_category && !r(a)
    ).map(([a]) => a)), o.length || (o = t.stateIds.filter((a) => {
      var l, n, s;
      const i = e.states[a];
      return qr((l = i == null ? void 0 : i.attributes) == null ? void 0 : l.attribution) && // The GP integration (svenove/google_pollen) publishes no
      // attribution today; exclude its entity ids anyway so a future
      // upstream addition can't leak GP sensors into GPL detection.
      !a.startsWith("sensor.google_pollen_") && ((n = i == null ? void 0 : i.attributes) == null ? void 0 : n.device_class) !== "date" && ((s = i == null ? void 0 : i.attributes) == null ? void 0 : s.device_class) !== "timestamp";
    })), { ids: o };
  },
  discover: (e, t) => _r(e, t)
}, Xd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GPL_BASE_ALLERGENS: At,
  GPL_TYPE_ICON_MAP: Fi,
  autodetect: Jd,
  capitalize: Et,
  classifySensor: Tr,
  discoverGplAllergens: Po,
  discoverGplSensors: _r,
  fetchForecast: Yd,
  isGoogleAttribution: qr,
  isGplDataSensor: at,
  resolveEntityIds: Ui,
  stubConfigGPL: Bt
}, Symbol.toStringTag, { value: "Module" })), qo = "google_pollen", Zo = {
  // Manual additions: English display_names for plant types not returned by
  // the API for Berlin/Tokyo (the script's query locations), but present in
  // svenove's PLANT_TYPES list and potentially returned for other regions.
  "cypress pine": "cypress_pine",
  elm: "elm",
  graminales: "graminales",
  juniper: "juniper",
  maple: "maple",
  abedul: "birch",
  ağaç: "trees_cat",
  al: "alder",
  alberi: "trees_cat",
  alder: "alder",
  aliso: "alder",
  alun: "hazel",
  ambroisie: "ragweed",
  ambrosia: "ragweed",
  ambrosía: "ragweed",
  ambrózia: "ragweed",
  ambrozie: "ragweed",
  ambrózie: "ragweed",
  ambrozja: "ragweed",
  "amerikai nyár": "cottonwood",
  amieiro: "alder",
  árbol: "trees_cat",
  arbore: "trees_cat",
  arbre: "trees_cat",
  arin: "alder",
  armoise: "mugwort",
  artemisia: "mugwort",
  artemísia: "mugwort",
  "artemisia comune": "mugwort",
  árvore: "trees_cat",
  ash: "ash",
  ask: "ash",
  aulne: "alder",
  aveleira: "hazel",
  avellano: "hazel",
  beifuß: "mugwort",
  beiskambrosia: "ragweed",
  berk: "birch",
  bétula: "birch",
  betulla: "birch",
  bijvoet: "mugwort",
  birch: "birch",
  birk: "birch",
  birke: "birch",
  björk: "birch",
  bjørk: "birch",
  bomen: "trees_cat",
  borovica: "pine",
  borovice: "pine",
  bouleau: "birch",
  breza: "birch",
  bříza: "birch",
  brzoza: "birch",
  burina: "weeds_cat",
  buruieni: "weeds_cat",
  bylica: "mugwort",
  bynkeambrosie: "ragweed",
  bäume: "trees_cat",
  çam: "pine",
  carvalho: "oak",
  cây: "trees_cat",
  "cây bạch dương": "birch",
  "cây dương tía": "alder",
  "cây gỗ dương": "cottonwood",
  "cây liễu sam nhật": "japanese_cedar",
  "cây phỉ": "hazel",
  "cây sồi": "oak",
  "cây tần bì": "ash",
  "cây thông": "pine",
  "cây ôliu": "olive",
  "cedar jepang": "japanese_cedar",
  "cèdre du japon": "japanese_cedar",
  "cedro giapponese": "japanese_cedar",
  "cedro japonés": "japanese_cedar",
  "cedro japonês": "japanese_cedar",
  "cedru japonez": "japanese_cedar",
  chêne: "oak",
  chopo: "cottonwood",
  choupos: "cottonwood",
  chwasty: "weeds_cat",
  çim: "graminales",
  çimen: "grass_cat",
  cỏ: "grass_cat",
  "cỏ dại": "weeds_cat",
  "cỏ phấn hương": "ragweed",
  cottonwood: "cottonwood",
  dąb: "oak",
  dişbudak: "ash",
  drzewa: "trees_cat",
  dub: "oak",
  eg: "oak",
  éger: "alder",
  eiche: "oak",
  eik: "oak",
  ek: "oak",
  els: "alder",
  erba: "grass_cat",
  erbacce: "weeds_cat",
  erle: "alder",
  ervas: "weeds_cat",
  es: "ash",
  esche: "ash",
  fa: "trees_cat",
  "fekete üröm": "mugwort",
  fenyő: "pine",
  "fındık ağacı": "hazel",
  frasin: "ash",
  frassino: "ash",
  frêne: "ash",
  fresno: "ash",
  furu: "pine",
  fű: "grass_cat",
  fyr: "pine",
  grama: "grass_cat",
  gramíneas: "grass_cat",
  graminées: "graminales",
  gras: "grass_cat",
  grass: "grass_cat",
  grassen: "graminales",
  grasses: "graminales",
  gress: "grass_cat",
  gråbo: "mugwort",
  gråbynke: "mugwort",
  gräs: "grass_cat",
  græs: "grass_cat",
  gräser: "graminales",
  græsser: "weeds_cat",
  gulma: "weeds_cat",
  gyomnövény: "weeds_cat",
  haselnuss: "hazel",
  hassel: "hazel",
  hazel: "hazel",
  hazelaar: "hazel",
  heinäkasvit: "weeds_cat",
  herbacée: "grass_cat",
  herbacées: "weeds_cat",
  "huş ağacı": "birch",
  iarbă: "grass_cat",
  "japán cédrus": "japanese_cedar",
  "japanese cedar": "japanese_cedar",
  japaninsetri: "japanese_cedar",
  "japanse ceder": "japanese_cedar",
  japanseder: "japanese_cedar",
  "japansk ceder": "japanese_cedar",
  "japansk cedertræ": "japanese_cedar",
  "japon sedir ağacı": "japanese_cedar",
  "japonský céder": "japanese_cedar",
  jasan: "ash",
  jaseň: "ash",
  jelša: "alder",
  jesion: "ash",
  "kanarya otu": "ragweed",
  kapas: "cottonwood",
  kavak: "cottonwood",
  kiefer: "pine",
  kızılağaç: "alder",
  koivu: "birch",
  "kryptomeria japońska": "japanese_cedar",
  "kryptomérie japonská": "japanese_cedar",
  kőris: "ash",
  leppä: "alder",
  leszczyna: "hazel",
  lieska: "hazel",
  líska: "hazel",
  maleza: "weeds_cat",
  malurt: "mugwort",
  malörtsambrosia: "ragweed",
  măslin: "olive",
  meşe: "oak",
  mesteacăn: "birch",
  "misk otu": "mugwort",
  mogyoró: "hazel",
  mugwort: "mugwort",
  mänty: "pine",
  "ngải cứu": "mugwort",
  nocciolo: "hazel",
  noisetier: "hazel",
  nyírfa: "birch",
  oak: "oak",
  ogräs: "weeds_cat",
  olcha: "alder",
  oliivi: "olive",
  olijfboom: "olive",
  oliv: "olive",
  oliva: "olive",
  olíva: "olive",
  olive: "olive",
  oliveira: "olive",
  oliven: "olive",
  olivenbaum: "olive",
  olivier: "olive",
  olivo: "olive",
  olivovník: "olive",
  oliwka: "olive",
  olše: "alder",
  onkruid: "weeds_cat",
  ontano: "alder",
  or: "alder",
  palina: "mugwort",
  pappel: "cottonwood",
  parlagfű: "ragweed",
  pelin: "mugwort",
  pelyněk: "mugwort",
  peuplier: "cottonwood",
  "piante erbacee": "graminales",
  pijnboom: "pine",
  pin: "pine",
  pine: "pine",
  pinheiro: "pine",
  pino: "pine",
  pinus: "pine",
  pioppo: "cottonwood",
  "plante erbacee": "graminales",
  "plevelné rostliny": "weeds_cat",
  plop: "cottonwood",
  pohon: "trees_cat",
  poppel: "cottonwood",
  poppeli: "cottonwood",
  pujo: "mugwort",
  puu: "trees_cat",
  pähkinäpensas: "hazel",
  quercia: "oak",
  ragweed: "ragweed",
  roble: "oak",
  rumput: "grass_cat",
  ruoho: "grass_cat",
  ruohot: "graminales",
  rødel: "alder",
  saarni: "ash",
  sicheltanne: "japanese_cedar",
  sosna: "pine",
  stejar: "oak",
  stromy: "trees_cat",
  tall: "pine",
  tammi: "oak",
  tasneira: "ragweed",
  topol: "cottonwood",
  topoľ: "cottonwood",
  topola: "cottonwood",
  trávy: "grass_cat",
  trawy: "grass_cat",
  tre: "trees_cat",
  tree: "trees_cat",
  træ: "trees_cat",
  träd: "trees_cat",
  tuoksukki: "ragweed",
  tölgy: "oak",
  ugress: "weeds_cat",
  ulivo: "olive",
  unkraut: "weeds_cat",
  weed: "weeds_cat",
  "yabancı ot": "weeds_cat",
  zaitun: "olive",
  zeytin: "olive",
  αγριόχορτο: "weeds_cat",
  άλνος: "alder",
  "αμβροσία αρτεμισίφυλλος": "ragweed",
  βελανιδιά: "oak",
  γρασίδι: "grass_cat",
  δέντρο: "trees_cat",
  ελιά: "olive",
  "κέδρος ιαπωνίας": "japanese_cedar",
  λεβιθόχορτο: "mugwort",
  λεύκα: "cottonwood",
  μελιά: "ash",
  πεύκο: "pine",
  σημύδα: "birch",
  φουντουκιά: "hazel",
  амброзия: "ragweed",
  амброзія: "ragweed",
  береза: "birch",
  "бур'ян": "weeds_cat",
  вільха: "alder",
  дерево: "trees_cat",
  дуб: "oak",
  криптомерия: "japanese_cedar",
  ліщина: "hazel",
  "оливкове дерево": "olive",
  "оливковое дерево": "olive",
  ольха: "alder",
  орех: "hazel",
  полин: "mugwort",
  полынь: "mugwort",
  сорняки: "weeds_cat",
  сосна: "pine",
  "тополь трехгранный": "cottonwood",
  тополя: "cottonwood",
  трава: "grass_cat",
  травы: "graminales",
  "японський кедр": "japanese_cedar",
  ясен: "ash",
  ясень: "ash",
  "أرز ياباني": "japanese_cedar",
  "الأعشاب الضارة": "weeds_cat",
  البتولا: "birch",
  البلوط: "oak",
  البندق: "hazel",
  الحور: "cottonwood",
  الرغيد: "ragweed",
  الزيتون: "olive",
  "الشيح الدارج": "mugwort",
  الصنوبر: "pine",
  المران: "ash",
  "جار الماء": "alder",
  شجرة: "trees_cat",
  عشب: "grass_cat",
  अल्डर: "alder",
  अ‍ॅश: "ash",
  ऐश: "ash",
  ऑलिव्ह: "olive",
  ऑल्डर: "alder",
  ओक: "oak",
  कपास: "cottonwood",
  कॉटनवुड: "cottonwood",
  गवत: "grass_cat",
  घास: "weeds_cat",
  "जपानी सिडर": "japanese_cedar",
  ज़ैतून: "olive",
  "जैपनीज़ सीडर": "japanese_cedar",
  झाड: "trees_cat",
  तण: "weeds_cat",
  "तृण वनस्पती": "graminales",
  देवदार: "pine",
  पाइन: "pine",
  पेड़: "trees_cat",
  बर्च: "birch",
  मगवर्ट: "mugwort",
  मगव्हर्ट: "mugwort",
  रगवीड: "ragweed",
  रैगवीड: "ragweed",
  हेज़ल: "hazel",
  हेझल: "hazel",
  অলিভ: "olive",
  অ্যাশ: "ash",
  আগাছা: "weeds_cat",
  আল্ডার: "alder",
  ওক: "oak",
  কটনউড: "cottonwood",
  গাছ: "trees_cat",
  ঘাস: "grass_cat",
  "জাপানি সিডার": "japanese_cedar",
  পাইন: "pine",
  বার্চ: "birch",
  মাগওর্ট: "mugwort",
  রাগউইড: "ragweed",
  হ্যাজেল: "hazel",
  આલ્ડર: "alder",
  ઍશ: "ash",
  ઑક: "oak",
  ઑલિવ: "olive",
  કૉટનવૂડ: "cottonwood",
  ઘાસ: "grass_cat",
  "જાપાનીઝ દેવદાર": "japanese_cedar",
  નીંદણ: "weeds_cat",
  પાઇન: "pine",
  બર્ચ: "birch",
  મગવૉર્ટ: "mugwort",
  રૅગ્વીડ: "ragweed",
  વૃક્ષ: "trees_cat",
  હેઝલ: "hazel",
  ஆலிவ்: "olive",
  ஆல்டர்: "alder",
  ஆஷ்: "ash",
  ஓக்: "oak",
  களை: "weeds_cat",
  காட்டன்வுட்: "cottonwood",
  பிர்ச்: "birch",
  புல்: "grass_cat",
  புற்கள்: "graminales",
  பைன்: "pine",
  மக்வோர்ட்: "mugwort",
  மரம்: "trees_cat",
  ராக்வீட்: "ragweed",
  "ஜாப்பனீஸ் செடார்": "japanese_cedar",
  ஹேசல்: "hazel",
  "ఆలివ్ మొక్క": "olive",
  ఆల్డర్: "alder",
  "ఓక్ మొక్క": "oak",
  కలుపుమొక్కలు: "weeds_cat",
  కాటన్‌వుడ్: "cottonwood",
  గడ్డి: "graminales",
  చెట్టు: "trees_cat",
  "జపనీస్ సీడర్": "japanese_cedar",
  పచ్చిక: "grass_cat",
  "పైన్ మొక్క": "pine",
  బర్చ్: "birch",
  మగ్‌వార్ట్: "mugwort",
  యాష్: "ash",
  "రాగ్‌వీడ్ మొక్క": "ragweed",
  "హేజెల్ మొక్క": "hazel",
  ಆಲಿವ್: "olive",
  ಆಲ್ಡರ್: "alder",
  ಉಡಿಮರ: "ash",
  ಓಕ್: "oak",
  ಕಳೆ: "weeds_cat",
  "ಜಪಾನೀಸ್ ಸೀಡರ್": "japanese_cedar",
  ಪೈನ್: "pine",
  ಬರ್ಚ್: "birch",
  ಮಗ್ವಾರ್ಟ್: "mugwort",
  ಮರ: "trees_cat",
  ರಾಗ್ವೀಡ್: "ragweed",
  "ಹತ್ತಿ ಮರ": "cottonwood",
  ಹುಲ್ಲು: "grass_cat",
  ಹುಲ್ಲುಗಳು: "graminales",
  ಹೇಝೆಲ್: "hazel",
  "ആൽഡർ": "alder",
  ആഷ്: "ash",
  ഒലിവ്: "olive",
  ഓക്ക്: "oak",
  കള: "weeds_cat",
  ചന്ദനം: "birch",
  "ജാപ്പനീസ് സീഡർ": "japanese_cedar",
  പരുത്തിമരം: "cottonwood",
  "പുല്ലുകൾ": "graminales",
  പുല്ല്: "grass_cat",
  "പൈൻ": "pine",
  "മഗ്‌വോർട്ട്": "mugwort",
  മരം: "trees_cat",
  "ഹേസൽ": "hazel",
  റാഗ്‌വീഡ്: "ragweed",
  คอตตอนวู้ด: "cottonwood",
  จิงจูฉ่าย: "mugwort",
  ต้นซีดาร์ญี่ปุ่น: "japanese_cedar",
  ต้นไม้: "trees_cat",
  เบิร์ช: "birch",
  มะกอก: "olive",
  แร็กวีด: "ragweed",
  วัชพืช: "weeds_cat",
  สน: "pine",
  หญ้า: "grass_cat",
  เอลเดอร์: "alder",
  แอช: "ash",
  โอ๊ก: "oak",
  เฮเซล: "hazel",
  나무: "trees_cat",
  돼지풀: "ragweed",
  물푸레나무: "ash",
  미루나무: "cottonwood",
  소나무: "pine",
  쑥: "mugwort",
  오리나무: "alder",
  올리브나무: "olive",
  "일본 삼나무": "japanese_cedar",
  자작나무: "birch",
  잔디: "grass_cat",
  잡초: "weeds_cat",
  참나무: "oak",
  풀: "graminales",
  헤이즐나무: "hazel",
  イネ科の植物: "graminales",
  オーク: "oak",
  オリーブ: "olive",
  カバノキ: "birch",
  スギ: "japanese_cedar",
  セイヨウトネリコ: "ash",
  ハコヤナギ: "cottonwood",
  ハシバミ: "hazel",
  ハンノキ: "alder",
  ブタクサ: "ragweed",
  マツ: "pine",
  ヨモギ: "mugwort",
  日本雪松: "japanese_cedar",
  木: "trees_cat",
  杂草: "weeds_cat",
  松树: "pine",
  树: "trees_cat",
  桤木: "alder",
  桦树: "birch",
  棉白杨: "cottonwood",
  榛树: "hazel",
  橄榄树: "olive",
  橡树: "oak",
  白蜡树: "ash",
  艾蒿: "mugwort",
  草: "grass_cat",
  草类: "graminales",
  豚草: "ragweed",
  雑草: "weeds_cat"
}, Vi = {
  cỏ: "graminales",
  fű: "graminales",
  grama: "graminales",
  gramíneas: "graminales",
  gress: "graminales",
  gräs: "graminales",
  græs: "graminales",
  rumput: "graminales",
  trávy: "graminales",
  trawy: "graminales",
  γρασίδι: "graminales",
  трава: "graminales",
  عشب: "graminales",
  घास: "graminales",
  ঘাস: "graminales",
  ઘાસ: "graminales",
  หญ้า: "graminales"
}, Pt = ["grass_cat", "trees_cat", "weeds_cat"], Gt = {
  integration: "gp",
  location: "",
  entity_prefix: "",
  entity_suffix: "",
  allergens: ["grass_cat", "trees_cat", "weeds_cat"],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: 48,
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
  sort_category_allergens_first: !0,
  // Google's attribution policy requires visible attribution for pollen data
  // sourced from Google, so this defaults on; the user may still opt out (#338).
  show_google_attribution: !0,
  allergens_abbreviated: !1,
  date_locale: void 0,
  title: void 0,
  phrases: { full: {}, short: {}, levels: [], days: {}, no_information: "" }
}, ec = /^google_pollen_(.+?)_-?\d/;
function Wi(e) {
  var r;
  if (!e) return null;
  const t = ec.exec(e);
  return ((r = t == null ? void 0 : t[1]) == null ? void 0 : r.toLowerCase()) ?? null;
}
const tc = {
  grass: "grass_cat",
  tree: "trees_cat",
  weed: "weeds_cat"
};
function rc(e) {
  return e ? tc[e] || e : null;
}
function oc(e, t) {
  var i;
  const r = Wi(t == null ? void 0 : t.unique_id);
  if (r) return r;
  const o = (i = e == null ? void 0 : e.attributes) == null ? void 0 : i.display_name;
  if (!o) return null;
  const a = o.trim().toLowerCase();
  return Vi[a] || Zo[a] || null;
}
function Mo(e, t) {
  var i;
  const r = Wi(t == null ? void 0 : t.unique_id);
  if (r) {
    const l = rc(r);
    if (l) return l;
  }
  const o = (i = e == null ? void 0 : e.attributes) == null ? void 0 : i.display_name;
  if (!o) return null;
  const a = o.trim().toLowerCase();
  return Zo[a] || null;
}
function ac(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map() };
  const { locations: r } = je(e, {
    platform: qo,
    // Strict classifier: unique_id preferred, then display_name lookup.
    classify: (o, { state: a, entry: i }) => Mo(a, i),
    // Relaxed classifier (tier 1): same logic -- classifySensor handles both paths.
    classifyRelaxed: (o, { state: a, entry: i }) => Mo(a, i),
    // Skip diagnostic and config-flow entities.
    excludeEntry: (o) => !!(o && o.entity_category),
    // Collision: when a key is already taken, reclassify the new sensor as a plant.
    // This handles the case where two sensors share a localized display_name
    // (e.g. Swedish "Gräs" = GRASS category + GRAMINALES plant).
    onCollision: (o, { existingKey: a, locEntities: i }) => {
      const l = oc(o.state, o.entry);
      return l && l !== a && !i.has(l) ? (t && console.debug(
        "[GP] Collision on",
        a,
        "-> reclassified as",
        l,
        "for",
        o.entityId
      ), l) : (t && console.debug(
        "[GP] Collision: duplicate key",
        a,
        "for",
        o.entityId,
        "(skipped)"
      ), null);
    },
    // Fallback: prefix scan for tier 3.
    fallbackSelector: (o) => Object.keys(o.states).filter(
      (a) => a.startsWith("sensor.google_pollen_")
    ),
    /**
     * resolveLabel for GP — same shape as GPL: user override wins,
     * otherwise device.name is normalized via the locale-agnostic
     * cleanDeviceLabel util to strip integration-appended " - <category>
     * (<lat>,<lng>)" suffixes.
     */
    resolveLabel: (o) => {
      var i, l, n, s;
      if ((i = o.device) != null && i.name_by_user) return o.device.name_by_user;
      const a = $t((l = o.device) == null ? void 0 : l.name);
      return typeof a == "string" && a.trim() ? a : (s = (n = o.state) == null ? void 0 : n.attributes) != null && s.friendly_name ? $t(o.state.attributes.friendly_name) : "Auto";
    },
    debug: t,
    logTag: "GP"
  });
  return { locations: r };
}
const Mt = Ee(ac);
function Co(e, t, r = !1) {
  const o = Mt(e, r);
  if (!o.locations.size) return [];
  let a;
  if (t && o.locations.has(t) ? a = o.locations.get(t) : a = o.locations.values().next().value, !a) return [];
  const i = [...a.entities.keys()], l = i.filter((s) => Pt.includes(s)).sort(), n = i.filter((s) => !Pt.includes(s)).sort();
  return [...l, ...n];
}
function ic(e, t, r, o, a) {
  var i;
  if (r.location === "manual") {
    const l = Ce(r.entity_prefix || ""), n = r.entity_suffix || "";
    let s = [];
    t.entities && (s = Object.entries(t.entities).filter(
      ([, d]) => d.platform === qo && !d.entity_category
    ).map(([d]) => d)), s.length || (s = Object.keys(t.states || {}).filter(
      (d) => d.startsWith("sensor.google_pollen_")
    ));
    for (const d of s) {
      const _ = t.states[d];
      if (!_) continue;
      const c = d.replace(/^sensor\./, "");
      if (l && !c.startsWith(l) || n && !c.endsWith(n)) continue;
      const u = (i = t.entities) == null ? void 0 : i[d];
      if (Mo(_, u) === e) return d;
    }
    return a && console.debug(
      `[GP] Manual mode: no sensor found for allergen "${e}"`
    ), null;
  }
  return o && o.has(e) ? o.get(e) : (a && console.debug(`[GP] Sensor not found for allergen "${e}"`), null);
}
function qi(e, t, r = !1) {
  const o = /* @__PURE__ */ new Map(), a = Mt(t, r), i = e.location || "";
  let l = null;
  if (i !== "manual") {
    let n = ye(a, i);
    !n && i && Ke(i) && (n = ye(a, "")), n && (l = n[1].entities);
  }
  for (const n of e.allergens || []) {
    const s = ic(
      n,
      t,
      e,
      l,
      r
    );
    s && t.states[s] && o.set(n, s);
  }
  return o;
}
const Oa = ["tomorrow", "day 3", "day 4"];
async function nc(e, t) {
  var g, $, j;
  const r = !!t.debug, { lang: o, locale: a, daysRelative: i, dayAbbrev: l, daysUppercase: n } = Ve(
    e,
    t,
    Gt.date_locale
  ), { fullPhrases: s, shortPhrases: d, userLevels: _, userDays: c, noInfoLabel: u } = Ue(t, o), h = pt(
    _,
    o
  ), p = t.days_to_show ?? Gt.days_to_show, w = t.pollen_threshold ?? Gt.pollen_threshold, y = (P) => gt(P, 5, -1);
  r && console.debug("[GP] Adapter: start fetchForecast", { config: t, lang: o });
  const x = qi(t, e, r), k = /* @__PURE__ */ new Date();
  k.setHours(0, 0, 0, 0);
  let v = [];
  for (const P of t.allergens)
    try {
      const L = { days: [] };
      L.allergenReplaced = P;
      const { allergenCapitalized: I, allergenShort: D } = De(
        P,
        {
          fullPhrases: s,
          shortPhrases: d,
          abbreviated: t.allergens_abbreviated,
          lang: o,
          capitalize: (C) => Et(C.replace(/_/g, " "))
        }
      );
      L.allergenCapitalized = I, L.allergenShort = D;
      const z = x.get(P);
      if (!z) continue;
      const S = e.states[z];
      L.entity_id = z, r && console.debug(`[GP] Processing sensor ${z}:`, {
        state: S.state,
        index_value: (g = S.attributes) == null ? void 0 : g.index_value
      });
      const T = y(($ = S.attributes) == null ? void 0 : $.index_value), E = [{ date: k, level: T }];
      for (let C = 0; C < Oa.length && !(E.length >= p); C++) {
        const N = Oa[C], H = (j = S.attributes) == null ? void 0 : j[N], K = N === "tomorrow" ? 1 : parseInt(N.replace("day ", ""), 10) - 1;
        E.push({
          date: new Date(k.getTime() + K * 864e5),
          level: y(H)
        });
      }
      for (; E.length < p; ) {
        const C = E.length;
        E.push({
          date: new Date(k.getTime() + C * 864e5),
          level: -1
        });
      }
      for (let C = 0; C < p; C++) {
        const N = E[C];
        if (!N) continue;
        const H = Math.round(
          (N.date.getTime() - k.getTime()) / 864e5
        ), K = Ne(N.date, H, {
          daysRelative: i,
          dayAbbrev: l,
          daysUppercase: n,
          userDays: c,
          lang: o,
          locale: a
        }), V = N.level, M = bi(V), b = M < 0 ? u : h[M] || u, f = {
          name: L.allergenCapitalized,
          day: K,
          state: N.level,
          display_state: N.level < 0 ? -1 : N.level,
          state_text: b
        };
        L.days.push(f);
      }
      Fe(L.days, w) && v.push(L);
    } catch (L) {
      console.warn(`[GP] Adapter error for allergen ${P}:`, L);
    }
  if (t.sort !== "none")
    if (t.sort_category_allergens_first) {
      const P = v.filter(
        (I) => ["trees_cat", "grass_cat", "weeds_cat"].includes(I.allergenReplaced)
      ), L = v.filter(
        (I) => !["trees_cat", "grass_cat", "weeds_cat"].includes(I.allergenReplaced)
      );
      Pe(P, t.sort), Pe(L, t.sort), v = [...P, ...L];
    } else
      Pe(v, t.sort);
  return r && console.debug("[GP] Adapter complete sensors:", v), v;
}
function lc(e, t) {
  var o, a, i;
  const r = (i = (a = (o = e == null ? void 0 : e.states) == null ? void 0 : o[t]) == null ? void 0 : a.attributes) == null ? void 0 : i.device_class;
  return r === "date" || r === "timestamp";
}
const sc = {
  priority: 7,
  detectStates(e, t, r = !1) {
    const o = Mt(e, r);
    let a = [];
    if (o.locations.size > 0) {
      for (const [, i] of o.locations)
        if (i.entities)
          for (const l of i.entities.values()) a.push(l);
    }
    return a.length || (e && e.entities && (a = Object.entries(e.entities).filter(
      ([i, l]) => l.platform === "google_pollen" && !l.entity_category && !lc(e, i)
    ).map(([i]) => i)), a.length || (a = t.stateIds.filter(
      (i) => typeof i == "string" && i.startsWith("sensor.google_pollen_")
    ))), { ids: a, discovery: o };
  },
  discover: (e, t) => Mt(e, t)
}, dc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GP_BASE_ALLERGENS: Pt,
  GP_COLLISION_PLANTS: Vi,
  GP_DISPLAY_NAME_MAP: Zo,
  GP_DOMAIN: qo,
  autodetect: sc,
  capitalize: Et,
  discoverGpAllergens: Co,
  discoverGpSensors: Mt,
  fetchForecast: nc,
  resolveEntityIds: qi,
  stubConfigGP: Gt
}, Symbol.toStringTag, { value: "Module" })), cc = {
  birch: "birch",
  grasses: "grass",
  alder: "alder",
  hazel: "hazel",
  beech: "beech",
  ash: "ash",
  oak: "oak"
}, _c = {
  none: 0,
  low: 1,
  medium: 2,
  strong: 3,
  "very strong": 4
}, uc = /(?:^sensor\.|_)pollen_(birch|grasses|alder|hazel|beech|ash|oak)_level_at_/;
function hc(e) {
  if (typeof e != "string") return null;
  const t = uc.exec(e);
  return t && cc[t[1] ?? ""] || null;
}
const tr = {
  integration: "msw",
  location: "",
  allergens: ["birch", "grass", "alder", "hazel", "beech", "ash", "oak"],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: 48,
  text_size_ratio: 1,
  ...U,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  // Day-label display defaults that match the conventions used by every
  // other adapter. They are mostly cosmetic for MSW (only one day is ever
  // rendered upstream), but keeping them in the stub means the editor's
  // form generator surfaces the same toggles users see for other
  // integrations and merged-config comparisons stay consistent.
  days_relative: !0,
  days_abbreviated: !1,
  days_boldfaced: !1,
  days_uppercase: !1,
  show_empty_days: !1,
  days_to_show: 1,
  // Default threshold of 1 matches every other adapter's convention of
  // hiding None-level allergens until a measurement crosses Low or higher.
  // (DWD picks 0.5 instead because of its 0-3 native scale.)
  pollen_threshold: 1,
  sort: "value_descending",
  allergens_abbreviated: !1,
  date_locale: void 0,
  title: void 0,
  debug: !1,
  show_version: !0,
  phrases: {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: ""
  }
};
function gc(e) {
  var r, o;
  const t = e == null ? void 0 : e.device;
  return t != null && t.name_by_user ? t.name_by_user : t != null && t.name ? t.name.replace(/^MeteoSwiss at\s+/i, "") || t.name : (o = (r = e == null ? void 0 : e.state) == null ? void 0 : r.attributes) != null && o.friendly_name ? e.state.attributes.friendly_name : "Auto";
}
function pc(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map() };
  const r = /^sensor\.(?:\w+_)*pollen_(?:birch|grasses|alder|hazel|beech|ash|oak)_level_at_/, { locations: o } = je(e, {
    platform: "swissweather",
    classify: hc,
    resolveLabel: gc,
    fallbackRegex: r,
    debug: t,
    logTag: "MSW"
  });
  return { locations: o };
}
const Zr = Ee(pc);
function Zi(e, t, r = !1) {
  if (!(t != null && t.states)) return /* @__PURE__ */ new Map();
  const o = Zr(t, r);
  if (o.locations.size === 0)
    return r && console.debug("[MSW:resolveEntityIds] No sensors discovered"), /* @__PURE__ */ new Map();
  let a = ye(o, e == null ? void 0 : e.location);
  if (a || (a = ye(o, ""), r && (e != null && e.location) && console.debug(
    `[MSW:resolveEntityIds] Location '${e.location}' not found; falling back to first discovered location`
  )), !a) return /* @__PURE__ */ new Map();
  const [, i] = a, l = /* @__PURE__ */ new Map();
  for (const n of (e == null ? void 0 : e.allergens) || []) {
    const s = i.entities.get(n);
    s ? (l.set(n, s), r && console.debug(`[MSW:resolveEntityIds] ${n} -> ${s}`)) : r && console.debug(
      `[MSW:resolveEntityIds] No entity for '${n}' in resolved location`
    );
  }
  return l;
}
async function mc(e, t) {
  var k;
  if (!(e != null && e.states) || !((k = t.allergens) != null && k.length))
    return [];
  const r = !!t.debug, { lang: o, locale: a, daysRelative: i, dayAbbrev: l, daysUppercase: n } = Ve(
    e,
    t,
    tr.date_locale
  ), { fullPhrases: s, shortPhrases: d, userLevels: _, userDays: c } = Ue(
    t,
    o
  ), u = Dr(
    5,
    _,
    o
  ), h = t.pollen_threshold ?? tr.pollen_threshold;
  r && console.debug("MSW adapter: start fetchForecast", { config: t, lang: o });
  const p = [], w = Zi(t, e, r), y = /* @__PURE__ */ new Date();
  y.setHours(0, 0, 0, 0);
  const x = Ne(y, 0, {
    daysRelative: i,
    dayAbbrev: l,
    daysUppercase: n,
    userDays: c,
    lang: o,
    locale: a
  });
  for (const v of t.allergens)
    try {
      const g = w.get(v);
      if (!g) continue;
      const $ = e.states[g];
      if (!$) continue;
      const j = typeof $.state == "string" ? $.state.toLowerCase() : "", P = _c[j];
      if (P === void 0) continue;
      const { allergenCapitalized: L, allergenShort: I } = De(
        v,
        {
          fullPhrases: s,
          shortPhrases: d,
          abbreviated: t.allergens_abbreviated,
          lang: o,
          configKey: v
        }
      ), D = u[P] ?? j, S = {
        allergenReplaced: v,
        allergenCapitalized: L,
        allergenShort: I,
        entity_id: g,
        days: [{
          name: L,
          day: x,
          state: P,
          display_state: P,
          state_text: D
        }]
      };
      Fe(S.days, h) && p.push(S);
    } catch (g) {
      console.warn(`MSW adapter error for allergen ${v}:`, g);
    }
  return Pe(p, t.sort), r && console.debug("MSW adapter complete sensors:", p), p;
}
const fc = {
  priority: 9,
  detectStates(e, t) {
    const r = /(?:^|_)pollen_(?:birch|grasses|alder|hazel|beech|ash|oak)_level_at_/;
    let o = [];
    return e && e.entities && (o = Object.entries(e.entities).filter(
      ([a, i]) => i.platform === "swissweather" && !i.entity_category && r.test(a)
    ).map(([a]) => a)), o.length || (o = t.stateIds.filter(
      (a) => typeof a == "string" && /^sensor\.(?:\w+_)*pollen_(?:birch|grasses|alder|hazel|beech|ash|oak)_level_at_/.test(
        a
      )
    )), { ids: o };
  },
  discover: (e, t) => Zr(e, t)
}, vc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  autodetect: fc,
  discoverMswSensors: Zr,
  fetchForecast: mc,
  resolveEntityIds: Zi,
  stubConfigMSW: tr
}, Symbol.toStringTag, { value: "Module" })), yc = {
  alder: "alder",
  ash: "ash",
  birch: "birch",
  grasses: "grass",
  hazel: "hazel",
  mugwort: "mugwort",
  oak: "oak"
}, bc = {
  green: 0,
  yellow: 1,
  orange: 2,
  red: 3,
  purple: 4
}, wc = /_(alder|ash|birch|grasses|hazel|mugwort|oak)_level$/;
function kc(e) {
  if (typeof e != "string") return null;
  const t = wc.exec(e);
  return t && yc[t[1] ?? ""] || null;
}
const xc = /^sensor\.(.+)_(?:alder|ash|birch|grasses|hazel|mugwort|oak)_level$/;
function Qr(e) {
  if (typeof e != "string") return null;
  const t = xc.exec(e);
  return (t == null ? void 0 : t[1]) ?? null;
}
const rr = {
  integration: "irmkmi",
  location: "",
  allergens: ["alder", "ash", "birch", "grass", "hazel", "mugwort", "oak"],
  minimal: !1,
  minimal_gap: 35,
  background_color: "",
  icon_size: 48,
  text_size_ratio: 1,
  ...U,
  show_text_allergen: !0,
  show_value_text: !0,
  show_value_numeric: !1,
  show_value_numeric_in_circle: !1,
  // Day-label display defaults matching every other adapter. They are mostly
  // cosmetic for IRM KMI (only one day is ever rendered upstream), but keeping
  // them in the stub means the editor's form generator surfaces the same
  // toggles users see for other integrations and merged-config comparisons
  // stay consistent.
  days_relative: !0,
  days_abbreviated: !1,
  days_boldfaced: !1,
  days_uppercase: !1,
  show_empty_days: !1,
  days_to_show: 1,
  // Default threshold of 1 matches the other adapters' convention of hiding
  // None-level (green) allergens until a measurement crosses Low or higher.
  pollen_threshold: 1,
  sort: "value_descending",
  allergens_abbreviated: !1,
  date_locale: void 0,
  title: void 0,
  debug: !1,
  show_version: !0,
  phrases: {
    full: {},
    short: {},
    levels: [],
    days: {},
    no_information: ""
  }
};
function Sc(e) {
  var r, o;
  const t = e == null ? void 0 : e.device;
  return t != null && t.name_by_user ? t.name_by_user : t != null && t.name ? t.name : (o = (r = e == null ? void 0 : e.state) == null ? void 0 : r.attributes) != null && o.friendly_name ? e.state.attributes.friendly_name : "Auto";
}
function zc(e, t = !1) {
  if (!e) return { locations: /* @__PURE__ */ new Map() };
  const r = /^sensor\.\w+_(alder|ash|birch|grasses|hazel|mugwort|oak)_level$/, { locations: o } = je(e, {
    platform: "irm_kmi",
    classify: kc,
    resolveLabel: Sc,
    // Tiers 1/2 key by the device's config entry. The tier-3 fallback
    // (registryless HA) has no device context and would otherwise bucket every
    // location under "default", collapsing multi-location installs and dropping
    // all but the first location's entities. Key tier-3 locations by their
    // entity-prefix slug instead so they stay separate.
    resolveLocationKey: (a) => a.device ? ir(a.device) : Qr(a.entityId) || "default",
    fallbackRegex: r,
    debug: t,
    logTag: "IRMKMI"
  });
  return { locations: o };
}
const Yr = Ee(zc);
function Qi(e, t, r = !1) {
  if (!(t != null && t.states)) return /* @__PURE__ */ new Map();
  const o = Yr(t, r);
  if (o.locations.size === 0)
    return r && console.debug("[IRMKMI:resolveEntityIds] No sensors discovered"), /* @__PURE__ */ new Map();
  const a = (e == null ? void 0 : e.location) === "manual" ? "" : e == null ? void 0 : e.location;
  let i = ye(o, a, {
    slugExtractor: Qr
  });
  if (i || (i = ye(o, ""), r && (e != null && e.location) && console.debug(
    `[IRMKMI:resolveEntityIds] Location '${e.location}' not found; falling back to first discovered location`
  )), !i) return /* @__PURE__ */ new Map();
  const [, l] = i, n = /* @__PURE__ */ new Map();
  for (const s of (e == null ? void 0 : e.allergens) || []) {
    const d = l.entities.get(s);
    d ? (n.set(s, d), r && console.debug(`[IRMKMI:resolveEntityIds] ${s} -> ${d}`)) : r && console.debug(
      `[IRMKMI:resolveEntityIds] No entity for '${s}' in resolved location`
    );
  }
  return n;
}
async function Ac(e, t) {
  var k;
  if (!(e != null && e.states) || !((k = t.allergens) != null && k.length))
    return [];
  const r = !!t.debug, { lang: o, locale: a, daysRelative: i, dayAbbrev: l, daysUppercase: n } = Ve(
    e,
    t,
    rr.date_locale
  ), { fullPhrases: s, shortPhrases: d, userLevels: _, userDays: c } = Ue(
    t,
    o
  ), u = Dr(
    5,
    _,
    o
  ), h = t.pollen_threshold ?? rr.pollen_threshold;
  r && console.debug("IRMKMI adapter: start fetchForecast", { config: t, lang: o });
  const p = [], w = Qi(t, e, r), y = /* @__PURE__ */ new Date();
  y.setHours(0, 0, 0, 0);
  const x = Ne(y, 0, {
    daysRelative: i,
    dayAbbrev: l,
    daysUppercase: n,
    userDays: c,
    lang: o,
    locale: a
  });
  for (const v of t.allergens)
    try {
      const g = w.get(v);
      if (!g) continue;
      const $ = e.states[g];
      if (!$) continue;
      const j = typeof $.state == "string" ? $.state.toLowerCase() : "", P = bc[j];
      if (P === void 0) continue;
      const { allergenCapitalized: L, allergenShort: I } = De(
        v,
        {
          fullPhrases: s,
          shortPhrases: d,
          abbreviated: t.allergens_abbreviated,
          lang: o,
          configKey: v
        }
      ), D = u[P] ?? j, S = {
        allergenReplaced: v,
        allergenCapitalized: L,
        allergenShort: I,
        entity_id: g,
        days: [{
          name: L,
          day: x,
          state: P,
          display_state: P,
          state_text: D
        }]
      };
      Fe(S.days, h) && p.push(S);
    } catch (g) {
      console.warn(`IRMKMI adapter error for allergen ${v}:`, g);
    }
  return Pe(p, t.sort), r && console.debug("IRMKMI adapter complete sensors:", p), p;
}
const $c = {
  priority: 10,
  detectStates(e, t) {
    const r = /_(?:alder|ash|birch|grasses|hazel|mugwort|oak)_level$/;
    let o = [];
    return e && e.entities && (o = Object.entries(e.entities).filter(
      ([a, i]) => i.platform === "irm_kmi" && !i.entity_category && r.test(a)
    ).map(([a]) => a)), o.length || (o = t.stateIds.filter(
      (a) => typeof a == "string" && /^sensor\.\w+_(?:alder|ash|birch|grasses|hazel|mugwort|oak)_level$/.test(
        a
      )
    )), { ids: o };
  },
  discover: (e, t) => Yr(e, t)
}, Pc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  autodetect: $c,
  discoverIrmkmiSensors: Yr,
  extractIrmkmiLocationSlugFromEntityId: Qr,
  fetchForecast: Ac,
  resolveEntityIds: Qi,
  stubConfigIRMKMI: rr
}, Symbol.toStringTag, { value: "Module" })), ur = {
  pp: { module: Es, stub: zt },
  dwd: { module: Ks, stub: Br },
  peu: { module: td, stub: nr },
  silam: { module: sd, stub: yt },
  kleenex: { module: Pd, stub: Yt },
  plu: { module: Rd, stub: er },
  atmo: { module: Vd, stub: wt },
  gpl: { module: Xd, stub: Bt },
  gp: { module: dc, stub: Gt },
  msw: { module: vc, stub: tr },
  irmkmi: { module: Pc, stub: rr }
};
function it(e) {
  var t;
  return e ? (t = ur[e]) == null ? void 0 : t.module : void 0;
}
function ce(e) {
  var t;
  return e ? (t = ur[e]) == null ? void 0 : t.stub : void 0;
}
function Yi() {
  return Object.keys(ur);
}
function Le(e) {
  var t;
  return e ? (t = ur[e]) == null ? void 0 : t.module.autodetect : void 0;
}
function Ji() {
  const e = [];
  for (const [t, r] of Object.entries(ur))
    r.module.autodetect && e.push([t, r.module.autodetect]);
  return e.sort((t, r) => t[1].priority - r[1].priority), e;
}
function Eo(e, t, r = !1) {
  const o = it(e.integration);
  if (!(o != null && o.resolveEntityIds)) return [];
  const i = [...o.resolveEntityIds(e, t, r).values()].filter((l) => {
    var s;
    if (!l) return !1;
    const n = (s = t == null ? void 0 : t.states) == null ? void 0 : s[l];
    return n ? n.state !== "unavailable" : !1;
  });
  return r && console.debug(
    "[findAvailableSensors] Found sensors (",
    i.length,
    "): ",
    i
  ), i;
}
function be(e, t) {
  if (e === t) return !0;
  if (typeof e != "object" || typeof t != "object" || !e || !t) return !1;
  const r = e, o = t, a = Object.keys(r), i = Object.keys(o);
  if (a.length !== i.length) return !1;
  for (const l of a) {
    if (!(l in o)) return !1;
    if (Array.isArray(r[l]) && Array.isArray(o[l])) {
      if (!Mc(r[l], o[l]))
        return !1;
    } else if (typeof r[l] == "object" && typeof o[l] == "object") {
      if (!be(r[l], o[l])) return !1;
    } else if (r[l] !== o[l])
      return !1;
  }
  return !0;
}
function Mc(e, t) {
  if (e.length !== t.length) return !1;
  if (e.every((o) => typeof o != "object" || o === null)) {
    const o = (a) => [...a].sort().join("\0");
    return o(e) === o(t);
  }
  const r = new Array(t.length).fill(!1);
  for (const o of e) {
    const a = t.findIndex(
      (i, l) => !r[l] && (o === i || be(o, i))
    );
    if (a === -1) return !1;
    r[a] = !0;
  }
  return !0;
}
function Cc() {
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const r of Yi()) {
    const o = ce(r);
    if (o)
      for (const [a, i] of Object.entries(o))
        typeof i == "boolean" ? e.add(a) : typeof i == "number" && t.add(a);
  }
  return { booleanFields: e, numberFields: t };
}
const { booleanFields: Xi, numberFields: Ec } = Cc();
Xi.add("link_to_sensors");
const Lc = [
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
  // No stub declares link_to_sensors any more (absence = default on, explicit
  // true = opt in to per-icon more-info alongside a tap_action; see #279), so
  // it must be listed here or setConfig's allowed-field filter would strip a
  // user-set value.
  "link_to_sensors",
  "debug",
  "show_version",
  "title",
  "days_to_show",
  "date_locale"
];
function en(e) {
  return Object.keys(e).concat(Lc);
}
function tn(e, t, { integration: r, filter: o }) {
  let a;
  if (o) {
    a = {};
    for (const i of en(t))
      i in e && (a[i] = e[i]);
  } else
    a = { ...e };
  return { ...t, ...a, integration: r };
}
const Ic = 48;
function rn(e) {
  return typeof e == "number" ? e : typeof e != "string" || e.trim() === "" ? NaN : Number(e);
}
function Ht(e) {
  const t = rn(e);
  return Number.isFinite(t) && t > 0 ? t : Ic;
}
function Tc(e, t, r) {
  typeof r[t] == "number" ? e[t] = r[t] : delete e[t];
}
function Nc(e, t) {
  const r = { ...e }, o = t;
  for (const [a, i] of Object.entries(r))
    if (Xi.has(a))
      i === "true" ? r[a] = !0 : i === "false" && (r[a] = !1);
    else if (Ec.has(a)) {
      const l = rn(i);
      Number.isFinite(l) ? r[a] = l : Tc(r, a, o);
    }
  if ("allergens" in r && !Array.isArray(r.allergens)) {
    const a = t.allergens;
    Array.isArray(a) && (r.allergens = a);
  }
  return r;
}
function on(e, t) {
  return Object.freeze(Nc(e, t));
}
function jc(e, t, { integration: r, filter: o = !0 }) {
  return on(
    tn(e, t, { integration: r, filter: o }),
    t
  );
}
function Rc(e = {}) {
  const t = Array.isArray(e == null ? void 0 : e.allergens) ? e.allergens.length : 0, r = t > 0 ? t : 1;
  return e && e.minimal ? { rows: "auto", columns: Math.min(12, Math.max(3, r * 2)), min_rows: 1, min_columns: 2 } : { rows: "auto", columns: 12, min_rows: 1, min_columns: 6 };
}
const Jr = Ji().map(
  ([e]) => e
);
function an(e) {
  return e && typeof e == "string" ? e.trim().toLowerCase() : e;
}
function mt(e, t, r) {
  let o = null;
  return () => {
    if (o === null) {
      const a = Le(e);
      o = a != null && a.discover ? a.discover(t, r) : { locations: /* @__PURE__ */ new Map() };
    }
    return o;
  };
}
function ht(e, { debug: t = !1 } = {}) {
  var w;
  const r = e && e.states ? Object.keys(e.states) : [], o = ((w = Le("plu")) == null ? void 0 : w.allergenSlugs) ?? /* @__PURE__ */ new Set(), a = { stateIds: r, pluAllergenSlugs: o }, i = {}, l = {};
  for (const [y, x] of Ji()) {
    const k = x.detectStates(e, a, t);
    i[y] = k.ids, k.discovery && (l[y] = k.discovery);
  }
  const n = { locations: /* @__PURE__ */ new Map() }, s = {
    silam: l.silam ?? n,
    atmo: l.atmo ?? n,
    gp: l.gp ?? n,
    kleenex: l.kleenex ?? n
  }, d = mt("pp", e, t), _ = mt("dwd", e, t), c = mt("peu", e, t), u = mt("gpl", e, t), h = mt("msw", e, t), p = mt("irmkmi", e, t);
  if (t) {
    console.debug("Sensor states detected:");
    for (const y of Jr)
      console.debug(`${y.toUpperCase()}:`, i[y]);
  }
  return {
    stateIds: r,
    states: i,
    discovery: s,
    getPpDiscovery: d,
    getDwdDiscovery: _,
    getPeuDiscovery: c,
    getGplDiscovery: u,
    getMswDiscovery: h,
    getIrmkmiDiscovery: p
  };
}
function nn(e) {
  const t = /* @__PURE__ */ new Set();
  if (!e || !e.states) return t;
  for (const r of Jr)
    e.states[r] && e.states[r].length && t.add(r);
  return t;
}
function Ct(e, {
  explicit: t = !1,
  userIntegration: r,
  skip: o
} = {}) {
  const a = an(r);
  if (t) return a;
  const i = (e == null ? void 0 : e.states) || {}, l = o || /* @__PURE__ */ new Set();
  for (const n of Jr)
    if (i[n] && i[n].length && !l.has(n)) return n;
  return a;
}
function Xr(e, t, r, o) {
  var i, l, n, s, d, _, c, u, h, p, w, y;
  const a = (o == null ? void 0 : o.states) || {};
  if (e === "dwd" && ((i = a.dwd) != null && i.length)) {
    const x = Array.from(
      new Set(a.dwd.map((k) => k.split("_").pop()))
    ).sort((k, v) => Number(k) - Number(v))[0];
    return x != null ? { key: "region_id", value: x } : null;
  }
  if (e === "pp" && ((l = a.pp) != null && l.length)) {
    const x = (n = Le("pp")) == null ? void 0 : n.extractLocationSlug;
    for (const k of a.pp) {
      const v = x == null ? void 0 : x(k);
      if (v) return { key: "city", value: v };
    }
    return null;
  }
  if (e === "peu" && ((s = a.peu) != null && s.length)) {
    const k = Array.from(
      new Set(
        a.peu.map(
          (v) => {
            var g, $;
            return (($ = (g = r.states[v]) == null ? void 0 : g.attributes) == null ? void 0 : $.location_slug) || null;
          }
        ).filter(Boolean)
      )
    )[0];
    return k ? { key: "location", value: k } : null;
  }
  if (e === "silam" && ((d = a.silam) != null && d.length)) {
    const x = o.discovery.silam;
    if (x && x.locations.size > 0) {
      const $ = x.locations.keys().next().value;
      return $ ? { key: "location", value: $ } : null;
    }
    const k = (_ = Le("silam")) == null ? void 0 : _.extractLocationSlug, g = Array.from(
      new Set(
        a.silam.map(($) => (k == null ? void 0 : k($)) || null).filter(Boolean)
      )
    )[0];
    return g ? { key: "location", value: g } : null;
  }
  if (e === "kleenex" && ((c = a.kleenex) != null && c.length)) {
    const x = o.discovery.kleenex;
    if (x && x.locations.size > 0) {
      const $ = x.locations.keys().next().value;
      if ($) return { key: "location", value: $ };
    }
    const k = o.stateIds.filter(
      ($) => typeof $ == "string" && $.match(/^sensor\.kleenex_pollen_radar_.+_date$/)
    ), g = Array.from(
      new Set(
        k.map(($) => {
          const j = $.match(/^sensor\.kleenex_pollen_radar_(.+)_date$/);
          return j ? j[1] : null;
        }).filter(Boolean)
      )
    )[0];
    return g ? { key: "location", value: g } : null;
  }
  if (e === "atmo" && ((u = a.atmo) != null && u.length)) {
    const k = Array.from(
      new Set(
        a.atmo.map((v) => {
          const g = v.match(
            /^sensor\.niveau_(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)_(.+?)(?:_j_\d+)?$/
          );
          return g ? g[1] : null;
        }).filter(Boolean)
      )
    )[0];
    return k ? { key: "location", value: k } : null;
  }
  if (e === "gpl" && ((h = a.gpl) != null && h.length)) {
    const k = o.getGplDiscovery().locations.keys().next().value;
    return k ? { key: "location", value: k } : null;
  }
  if (e === "gp" && ((p = a.gp) != null && p.length)) {
    const x = o.discovery.gp, k = x == null ? void 0 : x.locations.keys().next().value;
    return k ? { key: "location", value: k } : null;
  }
  if (e === "msw" && ((w = a.msw) != null && w.length)) {
    const k = o.getMswDiscovery().locations.keys().next().value;
    return k ? { key: "location", value: k } : null;
  }
  if (e === "irmkmi" && ((y = a.irmkmi) != null && y.length)) {
    const k = o.getIrmkmiDiscovery().locations.keys().next().value;
    return k ? { key: "location", value: k } : null;
  }
  return null;
}
function tt(e, t) {
  if (!e || !e.locations) return null;
  for (const [r, o] of e.locations)
    if (o) {
      if (o.weatherEntity === t) return r;
      for (const a of [o.entities, o.sensors])
        if (a && typeof a.values == "function") {
          for (const i of a.values())
            if (i === t) return r;
        }
    }
  return null;
}
function Dc(e, t, r, o) {
  var a, i, l, n, s, d, _, c, u, h, p, w, y, x, k, v, g, $, j;
  if (typeof e != "string" || typeof t != "string")
    return null;
  switch (e) {
    case "pp": {
      const P = (i = (a = Le("pp")) == null ? void 0 : a.extractLocationSlug) == null ? void 0 : i.call(a, t);
      return P ? { key: "city", value: P } : null;
    }
    case "dwd": {
      const P = (n = (l = Le("dwd")) == null ? void 0 : l.extractLocationSlug) == null ? void 0 : n.call(l, t);
      return P ? { key: "region_id", value: P } : null;
    }
    case "peu": {
      const P = ((_ = (d = (s = r == null ? void 0 : r.states) == null ? void 0 : s[t]) == null ? void 0 : d.attributes) == null ? void 0 : _.location_slug) || ((u = (c = Le("peu")) == null ? void 0 : c.extractLocationSlug) == null ? void 0 : u.call(c, t));
      return P ? { key: "location", value: P } : null;
    }
    case "atmo": {
      const P = t.match(
        /^sensor\.niveau_(?:alerte_)?(?:ambroisie|armoise|aulne|bouleau|gramine|olivier)_(.+?)(?:_j_\d+)?$/
      );
      if (P) return { key: "location", value: P[1] };
      const L = tt(
        (h = o == null ? void 0 : o.discovery) == null ? void 0 : h.atmo,
        t
      );
      return L && L !== "default" ? { key: "location", value: L } : null;
    }
    case "silam": {
      const P = tt(
        (p = o == null ? void 0 : o.discovery) == null ? void 0 : p.silam,
        t
      );
      if (P) return { key: "location", value: P };
      const L = (y = (w = Le("silam")) == null ? void 0 : w.extractLocationSlug) == null ? void 0 : y.call(w, t);
      return L ? { key: "location", value: L } : null;
    }
    case "kleenex": {
      const P = tt(
        (x = o == null ? void 0 : o.discovery) == null ? void 0 : x.kleenex,
        t
      );
      if (P) return { key: "location", value: P };
      const L = ((o == null ? void 0 : o.stateIds) || []).filter(
        (S) => typeof S == "string" && /^sensor\.kleenex_pollen_radar_.+_date$/.test(S)
      ), I = Array.from(
        new Set(
          L.map((S) => {
            const T = S.match(/^sensor\.kleenex_pollen_radar_(.+)_date$/);
            return T ? T[1] : null;
          }).filter(Boolean)
        )
      );
      let D = null;
      for (const S of I) {
        const T = `sensor.kleenex_pollen_radar_${S}_`;
        (t === `sensor.kleenex_pollen_radar_${S}_date` || t.startsWith(T)) && (!D || S.length > D.length) && (D = S);
      }
      if (!D) return null;
      const z = (k = Le("kleenex")) == null ? void 0 : k.isRenderableEntity;
      return z && !z(t) ? null : { key: "location", value: D };
    }
    case "gp": {
      const P = tt(
        (v = o == null ? void 0 : o.discovery) == null ? void 0 : v.gp,
        t
      );
      return P ? { key: "location", value: P } : null;
    }
    case "gpl": {
      const P = tt(
        (g = o == null ? void 0 : o.getGplDiscovery) == null ? void 0 : g.call(o),
        t
      );
      return P ? { key: "location", value: P } : null;
    }
    case "msw": {
      const P = tt(
        ($ = o == null ? void 0 : o.getMswDiscovery) == null ? void 0 : $.call(o),
        t
      );
      return P ? { key: "location", value: P } : null;
    }
    case "irmkmi": {
      const P = tt(
        (j = o == null ? void 0 : o.getIrmkmiDiscovery) == null ? void 0 : j.call(o),
        t
      );
      return P ? { key: "location", value: P } : null;
    }
    default:
      return null;
  }
}
function Oc(e, t) {
  var s;
  if (typeof t != "string" || !(t.startsWith("sensor.") || t.startsWith("weather.")) || !e || !e.states) return null;
  const r = ht(e);
  let o;
  for (const d of Jr)
    if ((s = r.states[d]) != null && s.includes(t)) {
      o = d;
      break;
    }
  if (!o) return null;
  const a = Dc(
    o,
    t,
    e,
    r
  );
  if (!a && (/* @__PURE__ */ new Set(["gpl", "gp", "msw", "irmkmi", "kleenex"])).has(o)) return null;
  const l = a || Xr(o, {}, e, r);
  return { config: {
    type: "custom:pollenprognos-card",
    integration: o,
    ...l ? { [l.key]: l.value } : {}
  } };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bc = { CHILD: 2 }, Gc = (e) => (...t) => ({ _$litDirective$: e, values: t });
class Hc {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, o) {
    this._$Ct = t, this._$AM = r, this._$Ci = o;
  }
  _$AS(t, r) {
    return this.update(t, r);
  }
  update(t, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Lo extends Hc {
  constructor(t) {
    if (super(t), this.it = fe, t.type !== Bc.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === fe || t == null) return this._t = void 0, this.it = t;
    if (t === ct) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const r = [t];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
Lo.directiveName = "unsafeHTML", Lo.resultType = 1;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Io extends Lo {
}
Io.directiveName = "unsafeSVG", Io.resultType = 2;
const kr = Gc(Io), Kc = `<?xml version="1.0" standalone="no"?>
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
`, Fc = `<?xml version="1.0" standalone="no"?>
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
`, Uc = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
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
`, Vc = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
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
`, Wc = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
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
`, qc = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
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
`, Zc = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
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
`, Qc = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">
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
`, Yc = `<?xml version="1.0" standalone="no"?>
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
`, Jc = `<?xml version="1.0" standalone="no"?>
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
`, Xc = `<?xml version="1.0" standalone="no"?>
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
`, Ba = `<?xml version="1.0" standalone="no"?>
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
`, e_ = `<?xml version="1.0" standalone="no"?>
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
`, t_ = `<?xml version="1.0" standalone="no"?>
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
`, r_ = `<?xml version="1.0" standalone="no"?>
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
`, o_ = `<?xml version="1.0" standalone="no"?>
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
`, a_ = `<?xml version="1.0" standalone="no"?>
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
`, i_ = `<?xml version="1.0" standalone="no"?>
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
`, n_ = `<?xml version="1.0" standalone="no"?>
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
`, Ga = `<?xml version="1.0" standalone="no"?>
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
`, l_ = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 200" aria-hidden="true">
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
`, s_ = `<?xml version="1.0" standalone="no"?>
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
`, d_ = `<?xml version="1.0" standalone="no"?>
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
`, c_ = `<?xml version="1.0" standalone="no"?>
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
`, __ = `<?xml version="1.0" standalone="no"?>
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
`, u_ = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M1000 1900l188-516 60-236 20-236-8-140-20-96-52-140-56-96-72-92-60-48-100 96-64 92-44 96-40 140-20 236 28 236 68 232 160 424zM1036 1840l-148-380-72-232-36-224 4-180 24-136 48-132 80-132 64-64 64 64 80 132 36 88 32 136 8 132-4 136-60 272-172 468-20 52 36-76z"/>
<path d="M1012 1756l60-420 24-284-8-328-44-280 20-4 44 284 8 284-28 328-64 424z"/>
<path d="M976 1760l-64-424-28-328 8-284 44-284 20 4-44 280-8 328 24 284 60 420z"/>
<path d="M1028 1756l112-424 44-328-8-232-36-188-52-140 20-8 52 144 28 140 16 144-4 144-44 328-116 424z"/>
<path d="M960 1760l-116-424-44-328-4-144 16-144 28-140 52-144 20 8-52 140-36 188-8 232 44 328 112 424z"/>
<path d="M992 1804l-4-1408 24 0-4 1408z"/>
<path d="M980 340l-8-268 56 0-8 268z"/>
</g>
</svg>
`, h_ = `<?xml version="1.0" standalone="no"?>
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
`, g_ = `<?xml version="1.0" standalone="no"?>
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
`, p_ = `<?xml version="1.0" standalone="no"?>
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
`, m_ = `<?xml version="1.0" standalone="no"?>
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
`, f_ = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M1000 1880l268-576 68-260-112-260 188-408-264 272-132 76-164-76-264-272 188 408-112 260 68 260 164 348zM940 1632l-164-344-64-240 116-264-168-300 164 204 200 88 152-88 164-204-168 300 116 264-64 240-224 480z"/>
<path d="M980 724l-4-652 48 0-4 652z"/>
<path d="M992 1772l-8-1076 32 0-8 1076z"/>
<path d="M992 1596l168-184 8 8-160 192z"/>
<path d="M992 1612l-160-192 8-8 168 184z"/>
<path d="M992 1232l208-184 8 8-200 192z"/>
<path d="M992 1248l-200-192 8-8 208 184z"/>
<path d="M992 868l176-184 4 4-164 196z"/>
<path d="M992 884l-164-196 4-4 176 184z"/>
</g>
</svg>
`, v_ = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M1000 1900l64 16-36-88 16-40 64 20-32-92 16-36 64 16-32-92 12-36 68 16-36-88 12-40 64 12-40-84 12-36 68 8-48-84 12-36 64 8-48-80 4-40 68 4-56-76 4-36 68-4-64-72 0-36 68-8-68-64-4-40 68-16-76-56-8-36 64-24-80-52-12-36 60-32-88-40-16-40 52-44-96-28-28-36 40-60-104-16-60-36-60 36-104 16 40 60-28 36-96 28 52 44-16 40-88 40 60 32-12 36-80 52 64 24-8 36-76 56 68 16-4 40-68 64 68 8 0 36-64 72 68 4 4 36-56 76 68-4 4 40-48 80 64-8 12 36-48 84 68-8 12 36-40 84 64-12 12 40-36 88 68-16 12 36-32 92 64-16 16 36-32 92 64-20 16 40-36 88zM988 1804l-124-340-72-276-28-236 16-240 36-136 44-104 64-100 76-68 48 32 56 68 56 104 36 100 24 104 16 136-16 272-64 276-156 440z"/>
<path d="M976 256l8-156 32 0 8 156z"/>
<path d="M992 1840l-16-1596 48 0-16 1596z"/>
<path d="M1012 1676l36 76-12 8-48-72z"/>
<path d="M1012 1688l-48 72-12-8 36-76z"/>
<path d="M1008 1524l100 80-8 8-108-68z"/>
<path d="M1008 1544l-108 68-8-8 100-80z"/>
<path d="M1004 1376l156 80-4 8-160-68z"/>
<path d="M1004 1396l-160 68-4-8 156-80z"/>
<path d="M1004 1228l200 80-4 12-204-68z"/>
<path d="M1004 1252l-204 68-4-12 200-80z"/>
<path d="M1004 1080l232 80-4 12-236-68z"/>
<path d="M1004 1104l-236 68-4-12 232-80z"/>
<path d="M1004 932l252 80-4 12-256-68z"/>
<path d="M1004 956l-256 68-4-12 252-80z"/>
<path d="M1004 784l252 80-4 12-256-68z"/>
<path d="M1004 808l-256 68-4-12 252-80z"/>
<path d="M1004 636l232 80-4 12-236-68z"/>
<path d="M1004 660l-236 68-4-12 232-80z"/>
<path d="M1004 488l192 80-4 12-196-68z"/>
<path d="M1004 512l-196 68-4-12 192-80z"/>
<path d="M1008 344l112 80-4 8-124-68z"/>
<path d="M1008 364l-124 68-4-8 112-80z"/>
</g>
</svg>
`, y_ = `<?xml version="1.0" standalone="no"?>
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="200.000000pt" height="200.000000pt" viewBox="0 0 200.000000 200.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M988 1700l-12-1600 48 0-12 1600z"/>
<path d="M1468 1636l-160-112-80-32-84-12-72 12 32 40 72 52 120 40 152 12z"/>
<path d="M1044 1468l120 48-4 16-124-40z"/>
<path d="M532 1636l196-16 80-28 72-44 48-56-52-12-84 8-120 44-124 92z"/>
<path d="M964 1492l-124 40-4-16 120-48z"/>
<path d="M1536 1360l-192-120-92-32-96-12-84 16 40 44 84 52 140 44 172 8z"/>
<path d="M1044 1188l136 48-4 16-140-40z"/>
<path d="M464 1360l224-16 96-24 84-48 60-60-56-16-100 8-140 48-144 92z"/>
<path d="M964 1212l-140 40-4-16 136-48z"/>
<path d="M1600 1080l-220-124-104-32-112-12-92 16 44 48 100 56 160 44 196 4z"/>
<path d="M1044 908l152 48-8 16-152-40z"/>
<path d="M400 1080l252-8 108-28 100-52 68-64-64-16-112 4-156 52-172 96z"/>
<path d="M964 932l-152 40-8-16 152-48z"/>
<path d="M1668 796l-136-80-116-48-116-32-128-12-100 24 52 48 112 60 180 40 220 4z"/>
<path d="M1044 628l164 44-4 20-168-40z"/>
<path d="M332 796l160 4 124-8 120-28 112-48 80-68-68-20-128 0-176 52-196 100z"/>
<path d="M964 652l-168 40-4-20 164-44z"/>
<path d="M1736 508l-156-80-128-52-132-32-136-4-112 28 60 52 124 56 200 40 248-4z"/>
<path d="M1044 348l180 40-4 20-184-36z"/>
<path d="M264 508l176 12 136-8 132-24 132-52 88-68-76-24-140-4-196 48-224 104z"/>
<path d="M964 372l-184 36-4-20 180-40z"/>
<path d="M1000 1800l60-208 0-92-20-92-40-68-32 44-28 96 4 136 48 160z"/>
</g>
</svg>
`, b_ = `<?xml version="1.0" standalone="no"?>
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
`, w_ = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 192 192" height="192" viewBox="0 0 192 192" width="192"><rect fill="none" height="192" width="192"/><g><g><g><path d="M113.89,84.4l25.27-19.25l11.22-24.21c-7.47-14.26-20.37-25.24-35.88-30.11L91.18,26.58L77.95,54.29l0,0 c4.3-5.21,10.75-8.49,18-8.49c13.02,0,23.43,10.53,23.43,23.43C119.37,75,117.29,80.32,113.89,84.4z" fill="#4285F4"/><path d="M95.94,8c-18.9,0-35.65,8.49-46.97,21.96l10.78,17.66l18.2,6.68c0.11-0.11,36.56-43.46,36.56-43.46 C108.62,9.02,102.39,8,95.94,8z" fill="#1A73E8"/><path d="M113.89,84.4c-4.3,5.09-10.7,8.38-17.95,8.38c-13.02,0-23.43-10.53-23.43-23.43 c0-5.55,2.26-11.09,5.43-15.05L51.09,73.5L40.71,98.66c6.45,14.03,17.09,25.35,28.07,39.5l28.78-22.9L113.89,84.4z" fill="#FBBC04"/><path d="M157.4,69.35c0-10.3-2.6-19.92-7.02-28.41l-81.61,97.22c3.62,4.64,7.13,9.62,10.64,15.05 C91.87,172.46,88.13,184,96.06,184c8.04,0,4.53-11.54,16.98-30.79C133.52,121.18,157.4,106.58,157.4,69.35z" fill="#34A853"/><path d="M77.95,54.29L48.97,29.96C40.03,40.6,34.6,54.41,34.6,69.35c0,11.54,2.26,20.94,6.11,29.31L77.95,54.29z" fill="#EA4335"/></g></g></g><g/><g/><g/></svg>', k_ = `<?xml version="1.0" standalone="no"?>
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
`, x_ = `<?xml version="1.0" standalone="no"?>
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
`, S_ = `<?xml version="1.0" standalone="no"?>
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
`, z_ = `<?xml version="1.0" standalone="no"?>
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
`, A_ = `<?xml version="1.0" standalone="no"?>
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
`, $_ = `<?xml version="1.0" standalone="no"?>
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
`, P_ = {
  alder: Kc,
  allergy_risk: Fc,
  allergy_risk_1: Uc,
  allergy_risk_2: Vc,
  allergy_risk_3: Wc,
  allergy_risk_4: qc,
  allergy_risk_5: Zc,
  allergy_risk_6: Qc,
  ash: Yc,
  beech: Jc,
  birch: Xc,
  chenopod: Ba,
  goosefoot: Ba,
  // Alias until dedicated icon is available
  cypress: e_,
  elm: t_,
  grass: r_,
  plantain: u_,
  hazel: o_,
  lime: a_,
  mold_spores: i_,
  mugwort: n_,
  sorrel: f_,
  nettle_and_pellitory: Ga,
  nettle: Ga,
  // Alias for compatibility
  no_allergens: l_,
  oak: s_,
  olive: d_,
  pine: c_,
  plane: __,
  poaceae: h_,
  poplar: g_,
  ragweed: p_,
  rye: m_,
  sweet_chestnut: v_,
  tree_of_heaven: y_,
  willow: b_,
  // Pollution
  pm25: k_,
  pm10: x_,
  ozone: S_,
  no2: z_,
  so2: A_,
  qualite_globale: $_
}, M_ = w_;
function pr(e) {
  return !e || typeof e != "string" ? null : P_[e] || null;
}
function ln(e) {
  switch (e) {
    case "peu":
    case "kleenex":
    case "msw":
    case "irmkmi":
      return 4;
    case "gpl":
    case "gp":
      return 5;
    case "plu":
      return 3;
    default:
      return 6;
  }
}
function C_(e) {
  return e === "dwd" ? 4 : ln(e) + 1;
}
const E_ = 0.5, L_ = 12, I_ = 32, T_ = 0.1, N_ = 0.25, j_ = 2, sn = 13;
function or(e) {
  return String(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function dn(e) {
  return function() {
    let t = e += 1831565813;
    return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function R_(e = "#888888", t = {}) {
  const r = t.density ?? E_, o = t.tile ?? L_, a = t.seed ?? sn, i = dn(a), l = 1.4, n = o * o, s = Math.round(n * r / (Math.PI * l * l)), d = or(e);
  let _ = "";
  for (let u = 0; u < s; u++)
    _ += `<circle cx="${(i() * o).toFixed(1)}" cy="${(i() * o).toFixed(1)}" r="${l}" fill="${d}" fill-opacity="${(0.55 + i() * 0.45).toFixed(2)}"/>`;
  const c = `<svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${o}" viewBox="0 0 ${o} ${o}">${_}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(c)}`;
}
function D_(e, t = "#888888", r = {}) {
  const o = r.tile ?? I_, a = r.seed ?? sn, i = r.pixDensity ?? T_, l = r.scratchDensity ?? N_, n = r.maxPx ?? j_, s = dn(a), d = or(t), _ = o * o;
  let c = "";
  const u = Math.round(_ * i);
  for (let p = 0; p < u; p++) {
    const w = Math.floor(s() * o), y = Math.floor(s() * o), x = s();
    let k;
    n === 2 ? k = x < 0.85 ? 1 : 2 : k = x < 0.7 ? 1 : x < 0.96 ? 2 : 3;
    const v = 0.35 + s() * 0.55, g = k === 1 ? v : v * 0.6;
    c += `<rect x="${w}" y="${y}" width="${k}" height="${k}" fill="${d}" fill-opacity="${g.toFixed(2)}"/>`;
  }
  const h = Math.round(_ * 0.06 * l);
  for (let p = 0; p < h; p++) {
    const w = s() * o, y = s() * o, x = s() * Math.PI, k = 1.5 + s() * 2.5, v = 0.25 + s() * 0.35, g = w + Math.cos(x) * k, $ = y + Math.sin(x) * k;
    c += `<line x1="${w.toFixed(1)}" y1="${y.toFixed(1)}" x2="${g.toFixed(1)}" y2="${$.toFixed(1)}" stroke="${d}" stroke-width="0.6" stroke-linecap="round" stroke-opacity="${v.toFixed(2)}"/>`;
  }
  return `<pattern id="${or(e)}" patternUnits="userSpaceOnUse" width="${o}" height="${o}">${c}</pattern>`;
}
function O_(e) {
  let t = 5381;
  typeof e != "string" && (e = String(e));
  for (let r = 0; r < e.length; r++)
    t = Math.imul(t, 33) ^ e.charCodeAt(r);
  return t >>> 0 || 1;
}
function mr(e, t, r, o) {
  const a = o * Math.PI / 180;
  return [e + r * Math.sin(a), t - r * Math.cos(a)];
}
function ge(e) {
  return Number(e.toFixed(3)).toString();
}
function Ha(e, t, r, o, a, i) {
  const [l, n] = mr(e, t, o, a), [s, d] = mr(e, t, o, i), _ = i - a > 180 ? 1 : 0;
  if (r <= 1e-4)
    return `M${ge(e)} ${ge(t)} L${ge(l)} ${ge(n)} A${ge(o)} ${ge(o)} 0 ${_} 1 ${ge(s)} ${ge(d)} Z`;
  const [c, u] = mr(e, t, r, i), [h, p] = mr(e, t, r, a);
  return `M${ge(l)} ${ge(n)} A${ge(o)} ${ge(o)} 0 ${_} 1 ${ge(s)} ${ge(d)} L${ge(c)} ${ge(u)} A${ge(r)} ${ge(r)} 0 ${_} 0 ${ge(h)} ${ge(p)} Z`;
}
function B_(e) {
  const {
    level: t,
    segments: r,
    colors: o,
    emptyColor: a,
    gapColor: i,
    thickness: l,
    gap: n,
    size: s,
    noData: d = !1,
    noiseColor: _ = "#888888",
    noiseSeed: c = 13
  } = e, u = s / 2, h = s / 2, p = s / 2 - n / 2, w = s / 2 * ((100 - l) / 100), y = 360 / r, x = Math.max(0, Math.min(t, r)), k = `ppd-noise-${c}`;
  let v = "";
  for (let j = 0; j < r; j++) {
    const P = d ? `url(#${k})` : j < x ? o[j] ?? a : a, L = Ha(u, h, w, p, j * y, (j + 1) * y);
    v += `<path d="${L}" style="fill:${or(P)}"/>`;
  }
  let g = "";
  if (n > 0)
    for (let j = 0; j < r; j++) {
      const P = Ha(u, h, w, p, j * y, (j + 1) * y);
      g += `<path d="${P}" style="fill:none;stroke:${or(i)};stroke-width:${ge(n)}"/>`;
    }
  const $ = d ? `<defs>${D_(k, _, { seed: c })}</defs>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${ge(s)} ${ge(s)}" style="display:block" aria-hidden="true">${$}${v}${g}</svg>`;
}
const G_ = ["more-info", "navigate", "call-service"];
function H_(e) {
  const t = e.action || e.type || "";
  return t === "perform-action" ? "call-service" : t;
}
function Qo(e) {
  if (typeof e != "string") return null;
  const t = e.trim().split(".");
  if (t.length !== 2) return null;
  const r = t[0].trim(), o = t[1].trim();
  return !r || !o ? null : [r, o];
}
function Yo(e) {
  if (typeof e != "string") return null;
  const t = e.trim();
  return t || null;
}
function Jo(e) {
  if (typeof e != "string") return null;
  const t = e.trim();
  return t || null;
}
function Kt(e) {
  if (!e || typeof e != "object" || Array.isArray(e))
    return null;
  const t = e, r = H_(t) || "more-info";
  return !G_.includes(r) || r === "navigate" && !Jo(t.navigation_path) || r === "call-service" && !Qo(t.service || t.perform_action) || r === "more-info" && !Yo(t.entity) ? null : r;
}
function To(e, t) {
  return t ? e === !0 : e !== !1;
}
const cn = (e) => class extends e {
  // ---------------------------------------------------------------------------
  // Color helpers
  // ---------------------------------------------------------------------------
  /**
   * Gets color for a specific level for allergen icons.
   * @param level - The pollen level (0-6 or 0-4 depending on integration)
   * @param allergenKey - Optional allergen key for special handling
   * @returns Color hex string
   */
  _colorForLevel(t, r = null) {
    var i, l, n;
    if (r === "no_allergens")
      return ((i = this.config) == null ? void 0 : i.no_allergens_color) || U.no_allergens_color;
    if (((l = this.config) == null ? void 0 : l.allergen_color_mode) === "custom" && ((n = this.config) != null && n.allergen_colors)) {
      const s = this.config.allergen_colors, d = Math.max(0, Math.min(t, s.length - 1));
      return s[d] || s[0];
    }
    const o = U.allergen_colors, a = Math.max(0, Math.min(t, o.length - 1));
    return o[a] || o[0];
  }
  /**
   * Gets color for level circles (charts) - may inherit from allergen colors.
   * Note: Level circles don't use specific allergen keys, so we pass null.
   * @param level - The pollen level (0-6 or 0-4 depending on integration)
   * @returns Color hex string
   */
  _levelColorForLevel(t) {
    var i, l, n;
    if (((i = this.config) == null ? void 0 : i.levels_inherit_mode) !== "custom")
      return this._colorForLevel(t, null);
    if (t === 0)
      return ((l = this.config) == null ? void 0 : l.levels_empty_color) || U.levels_empty_color;
    const r = ((n = this.config) == null ? void 0 : n.levels_colors) || U.levels_colors, o = t - 1, a = Math.max(0, Math.min(o, r.length - 1));
    return r[a] || r[0];
  }
  /**
   * Determines the appropriate gap color based on inheritance mode.
   * @returns The gap color to use
   */
  _getGapColor() {
    var t, r, o;
    return ((t = this.config) == null ? void 0 : t.levels_inherit_mode) !== "custom" ? ((r = this.config) == null ? void 0 : r.allergen_outline_color) ?? U.levels_gap_color : ((o = this.config) == null ? void 0 : o.levels_gap_color) ?? "var(--card-background-color)";
  }
  // ---------------------------------------------------------------------------
  // SVG key helpers
  // ---------------------------------------------------------------------------
  /**
   * Gets the SVG key for an allergen.
   * @param allergenReplaced - The allergen identifier
   * @returns The key to use for SVG loading, or null if invalid
   */
  _getSvgKey(t) {
    if (!t || typeof t != "string")
      return this.debug && console.warn("[SVG] Invalid allergenReplaced:", t), null;
    const r = we(t);
    if (pr(r))
      return r;
    if (ka[t]) {
      const o = ka[t];
      if (pr(o))
        return o;
    }
    return r;
  }
  /**
   * Resolve the level-reactive SVG key for an allergen. `allergy_risk`
   * has six level-specific variants (`allergy_risk_1`..`allergy_risk_6`,
   * the smiley); other allergens use the base key as-is. Shared between
   * the side icon (_renderAllergenSvg) and the ring-centered icon
   * (_renderMinimalHtml / _renderNormalHtml) so both render paths
   * respect the variant when icon_in_ring is on.
   */
  _getEffectiveSvgKey(t, r) {
    return t === "allergy_risk" && r > 0 ? `allergy_risk_${Math.min(r, 6)}` : t;
  }
  // ---------------------------------------------------------------------------
  // No-data dot color
  // ---------------------------------------------------------------------------
  /**
   * Dot color for the "no data" noise pattern. Reads the card's resolved
   * `--primary-text-color` so the texture follows the active HA theme, with
   * a neutral grey fallback when the variable is not available (offscreen
   * canvases, headless test runs, etc.).
   */
  _noDataDotColor() {
    if (typeof window < "u" && window.getComputedStyle)
      try {
        const t = window.getComputedStyle(this).getPropertyValue("--primary-text-color").trim();
        if (t) return t;
      } catch {
      }
    return "#888888";
  }
  // ---------------------------------------------------------------------------
  // Ring config / rendering
  // ---------------------------------------------------------------------------
  _renderLevelCircle(t, {
    colors: r = U.levels_colors,
    emptyColor: o = U.levels_empty_color,
    gapColor: a = U.levels_gap_color,
    thickness: i = U.levels_thickness,
    gap: l = U.levels_gap,
    size: n = 100,
    iconKey: s = "",
    iconColor: d = "",
    iconSizeRatio: _ = U.icon_in_ring_size_ratio
  }, c = "default", u = 0, h = t, p = null, w = !0) {
    var E, C, N, H, K;
    const y = `chart-${c}-${u}-${t}-${n}`, k = ((E = this.config) == null ? void 0 : E.show_no_data_distinct) !== !1 && t < 0, v = k ? "no_data" : "ok", g = r.length, $ = B_({
      level: t,
      segments: g,
      colors: r,
      emptyColor: o,
      gapColor: a,
      thickness: i,
      gap: l,
      size: n,
      noData: k,
      noiseColor: k ? this._noDataDotColor() : void 0,
      noiseSeed: O_(y)
    }), j = s ? pr(s) : null, P = !!j;
    let L = "";
    if (P) {
      const V = n * (1 - i / 100), M = Math.max(1, Math.round(V * _));
      L = A`
          <div
            class="ring-icon"
            aria-hidden="true"
            style="width: ${M}px; height: ${M}px; color: ${d};"
          >
            ${kr(j)}
          </div>
        `;
    }
    const I = !!((C = this.config) != null && C.show_value_numeric_in_circle), D = ((N = this.config) == null ? void 0 : N.levels_text_weight) || "normal", z = ((H = this.config) == null ? void 0 : H.levels_text_size) || 0.2, S = ((K = this.config) == null ? void 0 : K.levels_text_color) || "var(--primary-text-color)";
    let T = "";
    return I && h >= 0 && !P && (T = A`
          <div
            class="level-value-text"
            style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; line-height: 1; font-size: ${n * z}px; font-weight: ${D}; color: ${S};"
          >
            ${h}
          </div>
        `), A`
        <div
          id="${y}"
          class="level-circle"
          style="display: inline-block; width: ${n}px; height: ${n}px; position: relative;${w && p ? " cursor: pointer;" : ""}"
          data-level="${t}"
          data-display-level="${h}"
          data-state="${v}"
          @click=${(V) => {
      w && p && (V.stopPropagation(), this._openEntity(p));
    }}
        >
          ${kr($)}${L}${T}
        </div>
      `;
  }
  // ---------------------------------------------------------------------------
  // Allergen icon rendering
  // ---------------------------------------------------------------------------
  /**
   * Renders an allergen SVG icon with proper color styling
   * @param allergenKey - The allergen key
   * @param level - The pollen level for color
   * @param options - Optional configuration
   * @returns HTML template with SVG or placeholder
   */
  _renderAllergenSvg(t, r, o = {}) {
    var y, x, k, v;
    if (!t || typeof t != "string")
      return this.debug && console.warn("[SVG] Cannot render SVG with invalid key:", t), A`
          <div class="pp-icon pp-icon-error" aria-hidden="true">
            <div style="background: #ff0000; color: white; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px;">?</div>
          </div>
        `;
    const { onClick: a, clickable: i = !1, stale: l = !1 } = o, n = l ? "#e6a800" : this._colorForLevel(r, t), s = ((y = this.config) == null ? void 0 : y.allergen_outline_color) || U.levels_gap_color, d = ((x = this.config) == null ? void 0 : x.allergen_stroke_width) ?? U.allergen_stroke_width, _ = this._getEffectiveSvgKey(t, r), c = pr(_), u = ((k = this.config) == null ? void 0 : k.show_no_data_distinct) !== !1;
    if (!l && u && r < 0 && c) {
      const g = i && a ? a : null, $ = `data:image/svg+xml;utf8,${encodeURIComponent(c)}`, j = R_(this._noDataDotColor()), P = `--pp-icon-no-data-mask: url("${$}"); --pp-icon-no-data-noise: url("${j}");` + (i ? " cursor: pointer;" : "");
      return A`
          <div
            class="pp-icon pp-icon-no-data"
            data-state="no_data"
            style="${P}"
            aria-hidden="true"
            @click=${g}
          ></div>
        `;
    }
    let h;
    t === "no_allergens" || (v = this.config) != null && v.allergen_stroke_color_synced ? h = n : h = s;
    const p = i && a ? a : null, w = `--pp-icon-color: ${n}; --pp-icon-stroke: ${h}; --pp-icon-stroke-width: ${d}; ${i ? "cursor: pointer;" : ""}`;
    return c ? A`
          <div
            class="pp-icon"
            data-state="ok"
            style="${w}"
            aria-hidden="true"
            @click=${p}
          >
            ${kr(c)}
          </div>
        ` : (this.debug && console.warn(`[SVG] No SVG found for key: ${t}`), A`
          <div
            class="pp-icon pp-icon-error"
            style="${w}"
            aria-hidden="true"
            @click=${p}
          >
            <div style="background: #ccc; color: #666; border-radius: 50%; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 12px;">?</div>
          </div>
        `);
  }
  /**
   * Ring geometry/colors for the level-circle render path. Returns the opts
   * blob passed to _renderLevelCircle (minus per-cell values like
   * size/iconKey/iconColor which the caller fills in). Shared by the card
   * (normal and minimal modes) and the badge, so the segment count, color
   * array, thickness and gap are derived in one place.
   */
  _buildLevelRingConfig() {
    var o, a, i, l;
    const t = ln(((o = this.config) == null ? void 0 : o.integration) ?? ""), r = [];
    for (let n = 0; n < t; n++)
      r.push(this._levelColorForLevel(n + 1));
    return {
      colors: r,
      emptyColor: ((a = this.config) == null ? void 0 : a.levels_empty_color) ?? "var(--divider-color)",
      gapColor: this._getGapColor(),
      thickness: ((i = this.config) == null ? void 0 : i.levels_thickness) ?? U.levels_thickness,
      gap: ((l = this.config) == null ? void 0 : l.levels_gap) ?? U.levels_gap
    };
  }
  /**
   * Resolve the color for the icon centered inside the level ring (#227).
   * Mode "static": user-configured static color (default
   * `var(--primary-text-color)` so the icon follows the theme).
   * Mode "follow_level": same level-mapped color as the side-icon would have.
   * Stale entities always render orange (#e6a800), mirroring the
   * _renderAllergenSvg convention.
   */
  _iconInRingColor(t, r, { stale: o = !1 } = {}) {
    var i, l;
    return o ? "#e6a800" : (((i = this.config) == null ? void 0 : i.icon_in_ring_color_mode) || U.icon_in_ring_color_mode) === "follow_level" ? this._colorForLevel(t, r) : ((l = this.config) == null ? void 0 : l.icon_in_ring_static_color) || U.icon_in_ring_static_color;
  }
  // ---------------------------------------------------------------------------
  // HA entity navigation
  // ---------------------------------------------------------------------------
  _openEntity(t) {
    const r = new CustomEvent("hass-more-info", {
      bubbles: !0,
      composed: !0,
      detail: { entityId: t }
    });
    this.dispatchEvent(r);
  }
  /**
   * Element-level tap_action handler, shared by the card and the badge.
   *
   * The configured action lives on `this.tapAction` for the card (set in its
   * setConfig) and on `this.config.tap_action` for the badge; resolve from
   * either so one implementation serves both. Dispatches directly via
   * dispatchEvent (like _openEntity) so the mixin does not depend on the
   * card's _fire helper. No-ops unless an action is configured and hass is
   * present, so the caller can bind it unconditionally.
   */
  _handleTapAction(t) {
    var i, l, n, s, d, _;
    const r = this.tapAction || ((i = this.config) == null ? void 0 : i.tap_action), o = Kt(r);
    if (!o) return;
    const a = r;
    if (!(o !== "navigate" && !this._hass))
      switch ((l = t == null ? void 0 : t.preventDefault) == null || l.call(t), (n = t == null ? void 0 : t.stopPropagation) == null || n.call(t), o) {
        case "more-info": {
          const c = Yo(a.entity);
          if (!c) break;
          this.dispatchEvent(
            new CustomEvent("hass-more-info", {
              bubbles: !0,
              composed: !0,
              detail: { entityId: c }
            })
          );
          break;
        }
        case "navigate": {
          const c = Jo(a.navigation_path);
          if (c && typeof window < "u" && ((s = window.history) != null && s.pushState)) {
            window.history.pushState(null, "", c);
            const u = new Event("location-changed", {
              bubbles: !0,
              composed: !0
            });
            u.detail = {
              replace: !1
            }, window.dispatchEvent(u);
          }
          break;
        }
        case "call-service": {
          const c = Qo(a.service || a.perform_action);
          c && ((_ = (d = this._hass) == null ? void 0 : d.callService) == null || _.call(
            d,
            c[0],
            c[1],
            a.service_data || a.data || {},
            a.target
          ));
          break;
        }
      }
  }
  // ---------------------------------------------------------------------------
  // Chart lifecycle (removed)
  // ---------------------------------------------------------------------------
  //
  // The level ring is now inline SVG rendered declaratively in
  // _renderLevelCircle, so the former _rebuildCharts() / _chartCache /
  // destroy-recreate lifecycle and the updated()/connectedCallback()/
  // disconnectedCallback() overrides are gone: lit re-renders the ring, the
  // centered icon and the numeric value together on every update, and there
  // is nothing imperative left to tear down. The card and badge keep their
  // own lifecycle hooks (subscriptions etc.) untouched.
}, _n = Xe`
  /* Icon centered inside the level ring (#227). Sized inline by
     _rebuildCharts based on ring thickness and icon_in_ring_size_ratio.
     color is inherited so SVG fill="currentColor" follows. */
  .ring-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ring-icon svg {
    width: 100%;
    height: 100%;
    display: block;
    fill: currentColor;
  }
  /* No <g fill=...> override here: SVGs that intentionally set
     fill="none" (e.g. no_allergens uses fill="none" with
     stroke="currentColor") must keep that. The svg-level
     fill: currentColor handles every allergen icon whose <g> has
     fill="currentColor" or no fill attr. */

  .level-value-text {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
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

  /* No-data icon: silhouette filled with a faint solid color (anchors
     the shape so it stays readable against a heavily textured ring)
     plus a noise pattern on top (carries the "no data" cue). The icon
     SVG acts as the mask; mask-mode: alpha is set explicitly so SVG
     paths filled with black act as the opaque part of the mask in
     Chrome (its default for SVG-via-url is luminance, which would
     invert the result). */
  .pp-icon-no-data {
    -webkit-mask-image: var(--pp-icon-no-data-mask);
    mask-image: var(--pp-icon-no-data-mask);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-mode: alpha;
    mask-mode: alpha;
    background-image: var(--pp-icon-no-data-noise);
    background-repeat: repeat;
    /* Plain rgba fallback first so the icon still gets a translucent
       anchor on browsers without color-mix() support (older WebKit /
       legacy Chromium builds shipped via plugin-legacy). The
       color-mix() declaration overrides it on modern browsers and
       tracks --primary-text-color through theme switches. */
    background-color: rgba(136, 136, 136, 0.15);
    background-color: color-mix(
      in srgb,
      var(--primary-text-color, #888888) 15%,
      transparent
    );
  }
`, K_ = "#5e5e5e", F_ = "#ffffff";
function un(e) {
  var t;
  return (t = e == null ? void 0 : e.themes) != null && t.darkMode ? F_ : K_;
}
const Xo = Xe`
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.3;
  color: var(--pp-google-attribution-color, #5e5e5e);
`;
class U_ extends cn(lt) {
  /**
   * _renderAllergenSvg is inherited from LevelCircleMixin.
   */
  constructor() {
    super(), this._forecastUnsub = null, this._forecastEvent = null, this._versionLogged = !1, this._error = null, this._skipIntegrations = /* @__PURE__ */ new Set(), this.days_to_show = 4, this.displayCols = [], this.header = "", this._initDone = !1, this._userConfig = {}, this.sensors = [], this.tapAction = null, this._forecastSubEntity = null, this._forecastSubType = null, this._noPollenData = !1;
  }
  updated(t) {
    var r;
    (t.has("config") || ((r = this.config) == null ? void 0 : r.integration) === "silam" && !this._forecastUnsub && (!this._error || this._error === "card.error_entity_unavailable") && this._hass) && this._subscribeForecastIfNeeded(), super.updated(t);
  }
  connectedCallback() {
    super.connectedCallback();
  }
  // Clean up forecast subscription when component is disconnected.
  disconnectedCallback() {
    this._forecastUnsub && (Promise.resolve(this._forecastUnsub).then((t) => {
      typeof t == "function" && t();
    }), this._forecastUnsub = null, this._forecastSubEntity = null, this._forecastSubType = null), super.disconnectedCallback();
  }
  _updateSensorsAndColumns(t, r, o) {
    this.debug && (this.d_sensors = t, this.d_availableSensors = r, console.debug(
      "[Card] _updateSensorsAndColumns called with",
      r.length,
      "available sensors"
    ));
    const a = Sa(t, o), i = Array.from({ length: a }, (n, s) => s);
    (!this._isLoaded || !be(this.sensors, t) || this._availableSensorCount !== r.length || this.days_to_show !== a || !be(this.displayCols, i)) && (this.sensors = t, this._availableSensorCount = r.length, this.days_to_show = a, this.displayCols = i, this._isLoaded = !0, this._error = null, this.debug && (console.debug("Days to show:", this.days_to_show), console.debug("Display columns:", this.displayCols), console.debug(
      `[Card] Final sensors for display (${t.length}):`,
      t.map((n) => {
        var s, d, _;
        return {
          name: n.allergenCapitalized,
          allergen: n.allergenReplaced,
          has_days: !!n.days,
          days_length: (s = n.days) == null ? void 0 : s.length,
          entity_id: n.entity_id,
          day0_state: (_ = (d = n.days) == null ? void 0 : d[0]) == null ? void 0 : _.state
        };
      })
    )), this.requestUpdate());
  }
  _getStaleStatus() {
    var l, n, s, d, _;
    if (((l = this.config) == null ? void 0 : l.integration) !== "peu")
      return { hasStale: !1, allStale: !1, staleSince: null };
    if (this.sensors && this.sensors.length > 0) {
      const c = this.sensors.filter((w) => w.stale === !0), u = c.length === this.sensors.length, h = c.length > 0, p = ((n = c[0]) == null ? void 0 : n.staleSince) || null;
      return { hasStale: h, allStale: u, staleSince: p };
    }
    if (!this._hass)
      return { hasStale: !1, allStale: !1, staleSince: null };
    const t = Object.keys(this._hass.states).filter(
      (c) => c.startsWith("sensor.polleninformation_")
    );
    if (!t.length)
      return { hasStale: !1, allStale: !1, staleSince: null };
    let r = this.config.location === "manual" ? "" : this.config.location;
    if (!r && this.config.location !== "manual") {
      const c = t[0].match(
        /^sensor\.polleninformation_(.+)_[^_]+$/
      );
      r = (c == null ? void 0 : c[1]) ?? "";
    }
    if (!r)
      return { hasStale: !1, allStale: !1, staleSince: null };
    let o = 0, a = 0, i = null;
    for (const c of t) {
      const u = this._hass.states[c];
      ((s = u == null ? void 0 : u.attributes) == null ? void 0 : s.location_slug) === r && (a++, ((d = u == null ? void 0 : u.attributes) == null ? void 0 : d.data_stale) === !0 && (o++, i || (i = ((_ = u == null ? void 0 : u.attributes) == null ? void 0 : _.stale_since) || null)));
    }
    return {
      hasStale: o > 0,
      allStale: a > 0 && o === a,
      staleSince: i
    };
  }
  _subscribeForecastIfNeeded() {
    var t, r, o, a;
    if (!(!this.config || !this._hass)) {
      if (this.config.integration !== "silam" && this._forecastUnsub) {
        Promise.resolve(this._forecastUnsub).then((i) => {
          typeof i == "function" && i();
        }).catch(() => {
        }), this._forecastUnsub = null, this._forecastSubEntity = null, this._forecastSubType = null, this._forecastEvent = null;
        return;
      }
      if (this.config.integration === "silam") {
        const i = this.config.location === "manual";
        let l;
        i && this.config.entity_prefix ? l = Ce(this.config.entity_prefix).replace(/_$/, "").replace(/^silam_pollen_/, "") : i ? l = "" : l = this.config.location || "";
        const n = ((r = (t = this.config) == null ? void 0 : t.date_locale) == null ? void 0 : r.split("-")[0]) || "en";
        this.debug && console.debug("[Card][Debug] SILAM location:", l);
        const s = i ? this.config.entity_weather : null, d = typeof s == "string" && s.length > 0 ? s : null;
        let _;
        d !== null ? d.startsWith("weather.") && this._hass.states[d] ? _ = d : (this.debug && console.warn(
          "[Card][subscribeForecast] entity_weather is set but invalid (must be weather.* domain and present in hass.states):",
          d
        ), _ = null) : _ = Ai(
          this._hass,
          l,
          n,
          this.debug,
          this._silamDiscovery
        );
        let c = "daily";
        if (this.config && this.config.mode === "twice_daily" ? c = "twice_daily" : this.config && this.config.mode === "hourly" && (c = "hourly"), _ && this._forecastUnsub && this._forecastSubEntity === _ && this._forecastSubType === c)
          return;
        if (this._forecastUnsub && (Promise.resolve(this._forecastUnsub).then((u) => {
          typeof u == "function" && u();
        }).catch(() => {
        }), this._forecastUnsub = null, this._forecastSubEntity = null, this._forecastSubType = null), _) {
          const u = this._hass.states[_];
          if (!u || u.state === "unavailable" || u.state === "unknown") {
            this.debug && console.debug(
              "[Card][subscribeForecast] Entity unavailable/unknown, skipping:",
              _
            ), this._forecastEvent = null;
            const p = this._error === "card.error_entity_unavailable";
            ((o = this.sensors) == null ? void 0 : o.length) !== 0 && (this.sensors = []), this._availableSensorCount !== 0 && (this._availableSensorCount = 0), this._isLoaded || (this._isLoaded = !0), p || (this._error = "card.error_entity_unavailable", this.requestUpdate());
            return;
          }
          this._error = null, this._forecastSubEntity = _, this._forecastSubType = c;
          const h = this._hass.connection.subscribeMessage(
            (p) => {
              this.debug && console.debug(
                "[Card][subscribeForecast] forecastEvent RECEIVED:",
                p
              ), this._forecastEvent = p, this._updateSensorsAfterForecastEvent();
            },
            {
              type: "weather/subscribe_forecast",
              entity_id: _,
              forecast_type: c
            }
          );
          h.catch((p) => {
            var w;
            if (console.warn(
              "[Card][subscribeForecast] Subscription failed for",
              _,
              p
            ), this._forecastUnsub = null, this._forecastSubEntity = null, this._forecastSubType = null, this._forecastEvent = null, this._integrationExplicit)
              ((w = this.sensors) == null ? void 0 : w.length) !== 0 && (this.sensors = []), this._availableSensorCount !== 0 && (this._availableSensorCount = 0), this._isLoaded || (this._isLoaded = !0), this._error !== "card.error_location_not_found" && (this._error = "card.error_location_not_found", this.requestUpdate());
            else {
              this._skipIntegrations.add(this.config.integration), this.debug && console.debug(
                "[Card] Autodetect: skipping",
                this.config.integration,
                "- will try next integration"
              );
              const y = this._hass;
              this._hass = null, this.hass = y;
            }
          }), this._forecastUnsub = h, this.debug && console.debug(
            "[Card][subscribeForecast] Subscribed for",
            _,
            "forecast_type:",
            c
          );
        } else
          this.debug && console.debug(
            "[Card] Hittar ingen weather-entity för location",
            l
          ), ((a = this.sensors) == null ? void 0 : a.length) !== 0 && (this.sensors = []), this._availableSensorCount !== 0 && (this._availableSensorCount = 0), this._forecastEvent != null && (this._forecastEvent = null), this._isLoaded || (this._isLoaded = !0), this._error !== "card.error_location_not_found" && (this._error = "card.error_location_not_found", this.requestUpdate());
      }
    }
  }
  _updateSensorsAfterForecastEvent() {
    if (this.config && this.config.integration === "silam" && this._forecastEvent) {
      const t = it(this.config.integration) || it("pp"), r = this._hass, o = this._fetchSeq = (this._fetchSeq || 0) + 1;
      t.fetchForecast(r, this.config, this._forecastEvent).then(async (a) => {
        const i = Eo(
          this.config,
          r,
          this.debug
        ), l = So(
          a,
          this.config,
          i,
          Object.keys(r.states),
          Je.mapping
        ), n = l.length === 0 && i.length > 0 ? await wo(
          t,
          r,
          this.config,
          this._forecastEvent
        ) : !1;
        o === this._fetchSeq && (this._noPollenData = n, this._updateSensorsAndColumns(
          l,
          i,
          this.config
        ));
      }).catch((a) => {
        console.error("[Card] Error fetching SILAM forecast:", a), this.debug && console.debug("[Card] SILAM fetch error:", a), this._isLoaded = !0, this.requestUpdate();
      });
    }
  }
  // The mixin declares `debug` as a (declare) property so it can read it; the
  // concrete card implements it as a computed getter. TS flags the
  // property→accessor shape mismatch (TS2611), inherent to this split and not
  // resolvable without changing the mixin. Suppress the single shape error; the
  // runtime contract (mixin reads this.debug) is unchanged.
  // @ts-expect-error property-in-base vs accessor-in-derived (see above)
  get debug() {
    return !!(this.config && this.config.debug);
  }
  get _lang() {
    var t;
    return Oe(
      this._hass,
      (t = this.config) == null ? void 0 : t.date_locale
    );
  }
  _t(t, r = {}) {
    return pe(t, this._lang, r);
  }
  _hasTapAction() {
    const t = this.tapAction;
    return t && t.type && t.type !== "none";
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
      _error: { type: String, state: !0 },
      _noPollenData: { type: Boolean, state: !0 }
    };
  }
  static async getConfigElement() {
    return await customElements.whenDefined("pollenprognos-card-editor"), document.createElement("pollenprognos-card-editor");
  }
  setConfig(t) {
    if (be(this._userConfig, t)) return;
    this._integrationExplicit = Object.hasOwn(t, "integration"), this._skipIntegrations.clear(), this.tapAction = t.tap_action || null;
    let r = t.integration;
    r && typeof r == "string" && (r = r.trim().toLowerCase());
    const o = ce(r) || ce("pp");
    r || (r = o.integration);
    const a = jc(t, o, {
      integration: r,
      filter: !0
    }), i = this.config || {}, n = en(o).filter((d) => d in t).filter(
      (d) => !be(a[d], i[d])
    );
    if (n.length > 0 && n.every((d) => mi.includes(d))) {
      this._userConfig = { ...t }, this.config = a, this._isLoaded = !0, this.requestUpdate();
      return;
    }
    this._userConfig = { ...t }, this.config = a, !this._versionLogged && this.config.show_version !== !1 && (console.info(
      "%c🤧 Pollenprognos Card: version v4.2.0",
      "background:#f0e68c;color:#000;padding:2px 4px;border-radius:2px;"
    ), this._versionLogged = !0), this._initDone = !1, this._hass && (this.hass = this._hass);
  }
  set hass(t) {
    var D, z, S, T, E, C, N, H, K, V, M;
    if (this._hass === t) return;
    this._hass = t;
    const r = !!this._integrationExplicit;
    this.debug && console.debug("[Card] set hass called; explicit:", r);
    const o = ht(t, {
      debug: this.debug
    }), {
      discovery: {
        silam: a,
        atmo: i,
        gp: l,
        kleenex: n
      },
      getPpDiscovery: s,
      getDwdDiscovery: d,
      getPeuDiscovery: _,
      getGplDiscovery: c,
      getMswDiscovery: u,
      getIrmkmiDiscovery: h
    } = o;
    this._silamDiscovery = a;
    let p = Ct(o, {
      explicit: r,
      userIntegration: this._userConfig.integration,
      skip: this._skipIntegrations
    });
    p || (p = "pp");
    let w = ce(p);
    w || (console.error(
      "Unknown integration:",
      p,
      "- falling back to PP"
    ), p = "pp", w = ce("pp"));
    const { allergens: y, ...x } = this._userConfig;
    let k = tn(x, w, {
      integration: p,
      filter: !1
    });
    if (p === "plu" && (k = Object.fromEntries(
      Object.entries(k).filter(
        ([b]) => b !== "city" && b !== "region_id"
      )
    )), this._integrationExplicit && Array.isArray(y) && y.length > 0 ? (this.debug && console.debug(
      "[Card] Explicit integration (",
      p,
      "); using user-defined allergens:",
      y
    ), k = { ...k, allergens: y }) : (this.debug && console.debug(
      "[Card] Using stub allergens for integration:",
      p
    ), k = {
      ...k,
      allergens: (ce(p) || ce("pp")).allergens
    }), !Object.prototype.hasOwnProperty.call(k, "date_locale")) {
      const b = Oe(t, null), f = ((z = (D = this._hass) == null ? void 0 : D.locale) == null ? void 0 : z.language) || ((S = this._hass) == null ? void 0 : S.language) || `${b}-${b.toUpperCase()}`;
      k = { ...k, date_locale: f }, this.debug && console.debug(
        "[Card] auto-filling date_locale:",
        k.date_locale
      );
    }
    const v = Xr(p, k, t, o);
    v && k[v.key] !== "manual" && !k[v.key] && (k = { ...k, [v.key]: v.value }, this.debug && console.debug(`[Card] Auto-set ${v.key}:`, v.value));
    const g = on(k, w);
    be(this.config, g) || (this.config = g);
    const $ = g.tap_action || this.tapAction || null;
    this.tapAction !== $ && (this.tapAction = $), this.debug && (console.debug("[Card][Debug] Active integration:", p), console.debug("[Card][Debug] Allergens in config:", g.allergens));
    let j;
    if (g.title === "false" || g.title === !1 || typeof g.title == "string" && g.title.trim() === "")
      j = "";
    else if (typeof g.title == "string" && g.title.trim() !== "" && g.title !== "true")
      j = g.title;
    else {
      let b = "";
      if (p === "dwd") {
        const f = d(), O = g.region_id && g.region_id !== "manual" ? g.region_id : "", F = ye(f, O, {
          slugExtractor: (Y) => {
            const Q = Y.match(/_(\d+)$/);
            return Q ? Q[1] : null;
          }
        });
        F ? b = F[1].label : O && (b = $r[O] || O);
      } else if (p === "peu") {
        const f = _(), O = g.location && g.location !== "manual" ? g.location : "", F = ye(f, O, {
          slugExtractor: We
        });
        if (F)
          b = F[1].label;
        else if (g.location !== "manual") {
          const Y = Object.values(t.states).filter(
            (W) => W && typeof W == "object" && typeof W.entity_id == "string" && W.entity_id.startsWith("sensor.polleninformation_")
          ), Q = g.location && g.location !== "manual" ? _e(g.location) : "";
          let J = "", ae = null;
          if (Q)
            ae = Y.find((W) => {
              const q = (W.attributes || {}).location_slug || W.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
              return _e(q) === Q;
            });
          else {
            const W = Array.from(
              new Set(
                Y.map((B) => {
                  const m = (B.attributes || {}).location_slug || B.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
                  return _e(m);
                })
              )
            );
            W.length === 1 && (ae = Y.find((B) => {
              const m = (B.attributes || {}).location_slug || B.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, "");
              return _e(m) === W[0];
            }));
          }
          if (ae) {
            const W = ae.attributes || {};
            J = W.location_title || ((E = (T = W.friendly_name) == null ? void 0 : T.match(/\((.*?)\)/)) == null ? void 0 : E[1]) || "";
          }
          b = Q ? J || g.location || "" : J;
        }
      } else if (p === "silam") {
        let f = "";
        const O = g.location === "manual" ? "" : g.location || "";
        if (g.location !== "manual") {
          const F = lr(
            a,
            O,
            this.debug
          );
          F && (f = F.label.replace(/^SILAM Pollen\s*-?\s*/i, "").trim());
        }
        if (!f && g.location && g.location !== "manual") {
          const F = [
            "alder",
            "birch",
            "grass",
            "hazel",
            "mugwort",
            "olive",
            "ragweed"
          ], Y = new Set(
            Object.values(Je.mapping).flatMap(
              (W) => Object.entries(W).filter(
                ([, B]) => F.includes(B)
              ).map(([B]) => B)
            )
          ), Q = Object.values(t.states).filter((W) => {
            if (!W || typeof W != "object" || typeof W.entity_id != "string" || !W.entity_id.startsWith("sensor.silam_pollen_"))
              return !1;
            const B = W.entity_id.match(
              /^sensor\.silam_pollen_(.*)_([^_]+)$/
            );
            return B ? Y.has(B[2] ?? "") : !1;
          }), J = _e(g.location), ae = J ? Q.find((W) => {
            const q = W.entity_id.replace("sensor.silam_pollen_", "").replace(/_[^_]+$/, "").replace(/^[-\s]+/, "");
            return _e(q) === J;
          }) : null;
          if (ae) {
            const W = ae.attributes;
            f = W.location_title || ((C = W.friendly_name) == null ? void 0 : C.replace(/^SILAM Pollen\s*-?\s*/i, "").replace(new RegExp("\\s+\\p{L}+$", "u"), "").trim()) || g.location, f = f.replace(/^[-\s]+/, "");
          }
        }
        b = g.location && g.location !== "manual" ? f || g.location || "" : f;
      } else if (p === "kleenex") {
        const f = Le("kleenex"), O = g.location && g.location !== "manual" ? g.location : "", F = O ? ((N = f == null ? void 0 : f.resolveLocation) == null ? void 0 : N.call(
          f,
          t,
          n,
          O
        )) ?? null : null, Y = F === "ambiguous", Q = Y ? null : F;
        let J = Q ? Q[1].label : "";
        if (!J && !Y) {
          const ae = (B) => !!B && typeof B == "object" && typeof B.entity_id == "string";
          let W = null;
          if (g.location === "manual") {
            const B = Ce(g.entity_prefix);
            if (B) {
              const q = typeof g.entity_suffix == "string" ? g.entity_suffix : "";
              let m = Object.values(t.states).filter(ae).filter(
                (Z) => Z.entity_id.startsWith(`sensor.${B}`) && (!q || Z.entity_id.endsWith(q))
              );
              const R = (H = f == null ? void 0 : f.scopeManualEntities) == null ? void 0 : H.call(
                f,
                t,
                m.map((Z) => Z.entity_id),
                {
                  prefix: B,
                  suffix: q,
                  discovery: n,
                  debug: this.debug
                }
              );
              if (R && R.entityIds.length !== m.length) {
                const Z = new Set(R.entityIds);
                m = m.filter((re) => Z.has(re.entity_id));
              }
              R != null && R.label && (J = R.label);
              const G = (Z) => q && Z.endsWith(q) ? Z.slice(0, -q.length) : Z, X = f == null ? void 0 : f.isRenderableEntity;
              W = (X ? m.find((Z) => X(G(Z.entity_id))) : void 0) ?? m[0] ?? null;
            }
          } else {
            const B = Object.values(t.states).filter(ae).filter(
              (m) => /^sensor\.kleenex_pollen_radar_.+_.+$/.test(m.entity_id)
            ), q = g.location ? _e(g.location) : "";
            q ? W = B.find((m) => m.entity_id.replace(
              "sensor.kleenex_pollen_radar_",
              ""
            ).replace(/_[^_]+$/, "") === q) ?? null : W = B[0] ?? null;
          }
          if (W && !J) {
            const B = W.attributes;
            J = B.location_name || ((V = (K = B.friendly_name) == null ? void 0 : K.match(/\(([^)]+)\)/)) == null ? void 0 : V[1]) || ((M = B.friendly_name) == null ? void 0 : M.replace(/^Kleenex Pollen Radar\s*[(-]?\s*/i, "").replace(
              /[)\s]+(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee).*$/i,
              ""
            ).replace(
              /^(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee)(?:\s.*)?$/i,
              ""
            ).trim()) || (g.location ? g.location.charAt(0).toUpperCase() + g.location.slice(1) : "");
          }
        }
        b = J || g.location || "";
      } else if (p === "atmo") {
        const f = g.location && g.location !== "manual" ? g.location : "";
        let O = "";
        if (f)
          if (i.locations.has(f))
            O = i.locations.get(f).label;
          else {
            const F = Wr(
              i,
              f
            );
            F && (O = i.locations.get(F).label);
          }
        else i.locations.size && (O = i.locations.values().next().value.label);
        O && (O = O.charAt(0).toUpperCase() + O.slice(1)), b = O || g.location || "";
      } else if (p === "gpl") {
        const f = c();
        let O = null;
        if (g.location === "manual" && g.entity_prefix) {
          const Q = `sensor.${String(g.entity_prefix).replace(/^sensor\./, "")}`, J = g.entity_suffix || "";
          for (const [ae, W] of (f == null ? void 0 : f.locations) || []) {
            const B = W == null ? void 0 : W.entities;
            if (!B) continue;
            let q = !1;
            for (const m of B.values())
              if (typeof m == "string" && m.startsWith(Q) && !(J && !m.endsWith(J))) {
                q = !0;
                break;
              }
            if (q) {
              O = [ae, W];
              break;
            }
          }
        }
        if (!O) {
          const Y = g.location && g.location !== "manual" ? g.location : "";
          O = ye(f, Y);
        }
        let F = O ? $t(O[1].label) : "";
        F && (F = F.charAt(0).toUpperCase() + F.slice(1)), b = F || g.location || "";
      } else if (p === "gp") {
        const f = g.location && g.location !== "manual" ? g.location : "", O = ye(
          l,
          f
        );
        b = (O ? $t(O[1].label) : "") || g.location || "";
      } else if (p === "msw") {
        const f = u(), O = g.location && g.location !== "manual" ? g.location : "", F = ye(f, O);
        b = (F ? F[1].label : "") || g.location || "";
      } else if (p === "irmkmi") {
        const f = h(), O = g.location && g.location !== "manual" ? g.location : "", F = ye(
          f,
          O,
          {
            slugExtractor: Qr
          }
        );
        b = (F ? F[1].label : "") || g.location || "";
      } else if (p === "plu") {
        const f = this._t("card.location.plu");
        b = f === "card.location.plu" ? "Luxembourg" : f;
      } else {
        const f = s(), O = g.city && g.city !== "manual" ? g.city : "", F = ye(f, O, {
          slugExtractor: Me
        });
        if (F)
          b = F[1].label;
        else if (O)
          b = ((Q) => qt.find((J) => _e(J) === Q) || Q)(O);
        else {
          const Y = (J) => qt.find((ae) => _e(ae) === J) || J, Q = Array.from(
            new Set(
              Object.keys(t.states).map((J) => Me(J)).filter(Boolean)
            )
          );
          b = Q.length === 1 ? Y(Q[0]) : "";
        }
      }
      j = b ? `${this._t("card.header_prefix")} ${b}` : this._t("card.header_no_location"), this.debug && console.debug("[Card] header set to:", j);
    }
    this.header !== j && (this.header = j);
    const P = it(g.integration) || it("pp"), L = this._fetchSeq = (this._fetchSeq || 0) + 1;
    let I;
    g.integration === "silam" ? I = P.fetchForecast(t, g, this._forecastEvent) : I = P.fetchForecast(t, g), I && I.then(async (b) => {
      this.debug && (console.debug("[Card][Debug] Sensors before filtering:", b), console.debug(
        `[Card][Debug] Adapter returned ${b.length} sensors:`,
        b.map((W) => {
          var B, q, m, R, G;
          return {
            allergen: W.allergenReplaced,
            entity_id: W.entity_id,
            has_days: !!W.days,
            days_length: (B = W.days) == null ? void 0 : B.length,
            day0_state: (m = (q = W.days) == null ? void 0 : q[0]) == null ? void 0 : m.state,
            day0_value: (G = (R = W.days) == null ? void 0 : R[0]) == null ? void 0 : G.value
          };
        })
      ), console.debug(
        "[Card][Debug] Förväntade allergener från config:",
        g.allergens
      )), this.debug && (console.debug("[Card] User selected city:", g.city), console.debug("[Card] User selected allergens:", g.allergens), console.debug("[Card] User selected location:", g.location));
      const f = Eo(g, t, this.debug), O = f.length, F = g.integration === "silam" && (!g.mode || g.mode === "daily"), Y = So(
        b,
        g,
        f,
        F ? Object.keys(t.states) : [],
        F ? Je.mapping : {}
      );
      this.debug && console.debug(
        `[Card][Debug] After filtering: ${Y.length} sensors remain:`,
        Y.map((W) => {
          var B, q, m;
          return {
            allergen: W.allergenReplaced,
            entity_id: W.entity_id,
            has_days: !!W.days,
            days_length: (B = W.days) == null ? void 0 : B.length,
            day0_state: (m = (q = W.days) == null ? void 0 : q[0]) == null ? void 0 : m.state
          };
        })
      );
      const Q = Y.length === 0 && O > 0 ? await wo(
        P,
        t,
        g,
        this._forecastEvent
      ) : !1;
      if (L !== this._fetchSeq) return;
      if (this._noPollenData = Q, this._integrationExplicit && !!g.location && O === 0) {
        this._explicitLocationNoSensors = !0, this._updateSensorsAndColumns([], [], g), this.debug && console.warn(
          `[Card] No sensor found for explicitly selected location: '${g.location}'`
        );
        return;
      } else
        this._explicitLocationNoSensors = !1, this._updateSensorsAndColumns(Y, f, g);
    }).catch((b) => {
      console.error("[Card] Error fetching pollen forecast:", b), this.debug && console.debug("[Card] fetchForecast error:", b), this._isLoaded = !0, this.requestUpdate();
    });
  }
  _renderNoAllergensHtml() {
    return A`
      ${this.header ? A`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="no-allergens-container">
          ${this._renderAllergenSvg("no_allergens", 0)}
          <span class="no-allergens-text">${this._t("card.no_allergens")}</span>
        </div>
      </div>
    `;
  }
  _renderNoInformationHtml() {
    return A`
      ${this.header ? A`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="no-allergens-container">
          ${this._renderAllergenSvg("no_allergens", -1)}
          <span class="no-allergens-text"
            >${this._t("card.no_information")}</span
          >
        </div>
      </div>
    `;
  }
  _renderStaleDataHtml() {
    return A`
      ${this.header ? A`<div class="card-header">${this.header}</div>` : ""}
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
    var n, s, d, _, c;
    const t = ((n = this.config) == null ? void 0 : n.text_size_ratio) ?? 1, r = ((s = this.config) == null ? void 0 : s.icon_in_ring) === !0, o = r ? this._buildLevelRingConfig() : null, a = Number((d = this.config) == null ? void 0 : d.icon_in_ring_size_ratio) || U.icon_in_ring_size_ratio, i = Ht((_ = this.config) == null ? void 0 : _.icon_size), l = Kt(this.tapAction) !== null;
    return A`
      ${this.header ? A`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div
          class="flex-container"
          style="gap: ${((c = this.config) == null ? void 0 : c.minimal_gap) ?? 35}px;"
        >
          ${xa(this.sensors, this.config).map((u) => {
      var L, I, D, z, S, T, E, C, N, H, K, V, M, b, f, O, F, Y, Q;
      if (u.stale) {
        const J = (L = this.config) != null && L.show_text_allergen ? ((I = this.config) != null && I.allergens_abbreviated ? u.allergenShort ?? "" : u.allergenCapitalized ?? "") + ": " + this._t("card.stale_allergen") : this._t("card.stale_allergen");
        return A`
                <div class="sensor minimal stale">
                  ${this._renderAllergenSvg(
          this._getSvgKey(u.allergenReplaced),
          0,
          { stale: !0 }
        )}
                  <span
                    class="short-text stale-allergen-text"
                    style="font-size: ${1 * t}em;"
                  >
                    ${J}
                  </span>
                </div>
              `;
      }
      const h = ((z = (D = u.days) == null ? void 0 : D[0]) == null ? void 0 : z.state_text) ?? "", p = yr((S = u.days) == null ? void 0 : S[0], this.config), w = p != null && p >= 0 ? p : "";
      let y = "";
      (T = this.config) != null && T.show_text_allergen && (y += (E = this.config) != null && E.allergens_abbreviated ? u.allergenShort ?? "" : u.allergenCapitalized ?? ""), (C = this.config) != null && C.show_value_text && ((N = this.config) != null && N.show_value_numeric) ? (y && (y += ": "), y += w !== "" ? `${h} (${w})` : h) : (H = this.config) != null && H.show_value_text ? (y && (y += ": "), y += h) : (K = this.config) != null && K.show_value_numeric && w !== "" && (y && (y += " "), y += `(${w})`);
      const x = this.config.integration === "plu" ? ((M = (V = u.days) == null ? void 0 : V[0]) == null ? void 0 : M.state) ?? 0 : ((f = (b = u.days) == null ? void 0 : b[0]) == null ? void 0 : f.display_state) ?? ((F = (O = u.days) == null ? void 0 : O[0]) == null ? void 0 : F.state) ?? 0, k = Number((Q = (Y = u.days) == null ? void 0 : Y[0]) == null ? void 0 : Q.state) || 0, v = xo(
        this.config.integration,
        k
      ), g = To(this.config.link_to_sensors, l) && !!u.entity_id, $ = (J) => {
        g && (J.stopPropagation(), this._openEntity(u.entity_id));
      }, j = this._getSvgKey(u.allergenReplaced), P = r ? this._renderLevelCircle(
        v,
        {
          ...o,
          size: i,
          iconKey: this._getEffectiveSvgKey(
            j,
            v
          ),
          iconColor: this._iconInRingColor(
            v,
            u.allergenReplaced
          ),
          iconSizeRatio: a
        },
        u.allergenReplaced,
        0,
        p !== "" ? p : x,
        u.entity_id,
        g
      ) : this._renderAllergenSvg(
        j,
        x,
        {
          clickable: g,
          onClick: $
        }
      );
      return A`
              <div class="sensor minimal">
                ${P}
                ${y ? A`<span
                        class="short-text"
                        style="font-size: ${1 * t}em;"
                        >${y}</span
                      >` : ""}
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
  _renderNormalHtml() {
    var $, j, P, L, I, D;
    if (!this.sensors || this.sensors.length === 0)
      return this.debug && (console.debug(
        "[Card] _renderNormalHtml: no sensors available, returning empty"
      ), console.debug(
        `[Card] _renderNormalHtml: sensors=${!!this.sensors}, length=${($ = this.sensors) == null ? void 0 : $.length}`
      )), A``;
    const t = xa(this.sensors, this.config), r = t.filter(
      (z) => z.days && z.days.length > 0
    ), o = t.filter((z) => z.stale === !0);
    if (r.length === 0 && o.length === 0)
      return this.debug && (console.debug(
        "[Card] _renderNormalHtml: no sensors have days arrays, returning empty"
      ), console.debug(
        `[Card] _renderNormalHtml: sensors with days=${r.length}, total sensors=${this.sensors.length}`
      ), this.sensors.forEach((z, S) => {
        var T, E, C;
        console.debug(
          `[Card] _renderNormalHtml: sensor[${S}] ${z.allergenReplaced}: has_days=${!!z.days}, days_length=${(T = z.days) == null ? void 0 : T.length}, day0_state=${(C = (E = z.days) == null ? void 0 : E[0]) == null ? void 0 : C.state}`
        );
      })), A``;
    this.debug && console.debug(
      `[Card] _renderNormalHtml: rendering ${this.sensors.length} sensors, ${r.length} with days`
    );
    const a = ((j = this.config) == null ? void 0 : j.text_size_ratio) ?? 1, i = !!this.config.days_boldfaced, l = Array.from(
      { length: Sa(t, this.config) },
      (z, S) => S
    ), { colors: n, emptyColor: s, gapColor: d, thickness: _, gap: c } = this._buildLevelRingConfig(), u = Ht(this.config.icon_size), h = Number(this.config.levels_icon_ratio) || 1, p = Math.min(100, Math.max(1, u * h)), w = ((P = this.config) == null ? void 0 : P.icon_in_ring) === !0, y = ((L = this.config) == null ? void 0 : L.show_allergen_column) !== !1, x = Number((I = this.config) == null ? void 0 : I.icon_in_ring_size_ratio) || U.icon_in_ring_size_ratio, k = Kt(this.tapAction) !== null, v = To(
      (D = this.config) == null ? void 0 : D.link_to_sensors,
      k
    );
    if (l.length === 0) {
      const z = t.filter((S) => S.stale === !0);
      return z.length === 0 ? A`` : A`
        ${this.header ? A`<div class="card-header">${this.header}</div>` : ""}
        <div class="card-content">
          <div class="stale-only-list">
            ${z.map(
        (S) => A`
                <div class="sensor minimal stale">
                  ${this._renderAllergenSvg(
          this._getSvgKey(S.allergenReplaced),
          0,
          { stale: !0 }
        )}
                  <span
                    class="short-text stale-allergen-text"
                    style="font-size: ${1 * a}em;"
                  >
                    ${this.config.allergens_abbreviated ? S.allergenShort : S.allergenCapitalized}:
                    ${this._t("card.stale_allergen")}
                  </span>
                </div>
              `
      )}
          </div>
        </div>
      `;
    }
    const g = l.length + (y ? 1 : 0);
    return this.debug && console.debug("Display columns:", l), A`
      ${this.header ? A`<div class="card-header">${this.header}</div>` : ""}
      <div class="card-content">
        <div class="forecast-content">
          <table class="forecast">
            <colgroup>
              ${(y ? [0, ...l] : l).map(
      () => A`<col style="width: ${100 / g}%;" />`
    )}
            </colgroup>
            <thead>
              <tr>
                ${y ? A`<th></th>` : ""}
                ${l.map(
      (z) => {
        var S, T, E, C, N, H;
        return A`
                    <th
                      style="font-weight: ${i ? "bold" : "normal"}; text-align: center;"
                    >
                      <div
                        style="display: flex; flex-direction: column; align-items: center;"
                      >
                        <span
                          class="day-header"
                          style="font-size: ${1 * a}em;"
                        >
                          ${((E = (T = (S = t == null ? void 0 : t[0]) == null ? void 0 : S.days) == null ? void 0 : T[z]) == null ? void 0 : E.day) || ""}
                        </span>
                        ${this.config.mode === "twice_daily" && ((H = (N = (C = t == null ? void 0 : t[0]) == null ? void 0 : C.days) == null ? void 0 : N[z]) != null && H.icon) ? A`<ha-icon
                                icon="${t[0].days[z].icon}"
                                style="margin-top: 2px;"
                              ></ha-icon>` : ""}
                      </div>
                    </th>
                  `;
      }
    )}
              </tr>
            </thead>
            ${t.flatMap((z, S) => {
      var J, ae, W, B, q, m;
      const T = this.config.show_block_separator && S > 0 && z.group && ((J = t[S - 1]) != null && J.group) && z.group !== ((ae = t[S - 1]) == null ? void 0 : ae.group) ? A`<tr class="block-separator-row">
                      <td colspan="${g}">
                        <hr class="block-separator" />
                      </td>
                    </tr>` : "", E = y ? A`<td>
                    ${this._renderAllergenSvg(
        this._getSvgKey(z.allergenReplaced),
        0,
        { stale: !0 }
      )}
                  </td>` : "", C = y ? this._t("card.stale_allergen") : `${this.config.allergens_abbreviated ? z.allergenShort : z.allergenCapitalized}: ${this._t("card.stale_allergen")}`, N = y ? A`<td>
                    <span
                      class="stale-allergen-name"
                      style="font-size: ${1 * a}em;"
                    >
                      ${this.config.allergens_abbreviated ? z.allergenShort : z.allergenCapitalized}
                    </span>
                  </td>` : "", H = this.config.show_text_allergen ? A`<tr class="allergen-text-row allergen-stale-row">
                    ${N}
                    <td colspan="${l.length}"></td>
                  </tr>` : "", K = this.config.integration === "plu" ? ((W = z.days[0]) == null ? void 0 : W.state) ?? 0 : ((B = z.days[0]) == null ? void 0 : B.display_state) ?? ((q = z.days[0]) == null ? void 0 : q.state) ?? 0, V = y ? A`<td>
                    ${this._renderAllergenSvg(
        this._getSvgKey(z.allergenReplaced),
        K,
        {
          clickable: v && !!z.entity_id,
          onClick: (R) => {
            v && z.entity_id && (R.stopPropagation(), this._openEntity(z.entity_id));
          }
        }
      )}
                  </td>` : "", M = l.map((R) => {
        var de, ne;
        if (z.isSummary) {
          const ue = (de = z.days[R]) == null ? void 0 : de.state;
          if (ue == null || Number(ue) < 0) return A`<td></td>`;
        }
        const G = Number((ne = z.days[R]) == null ? void 0 : ne.state) || 0, X = Number(
          yr(z.days[R], this.config) ?? G
        ), Z = xo(
          this.config.integration,
          G
        ), re = { colors: n, emptyColor: s, gapColor: d, thickness: _, gap: c, size: p };
        w && (re.iconKey = this._getEffectiveSvgKey(
          this._getSvgKey(z.allergenReplaced),
          Z
        ), re.iconColor = this._iconInRingColor(
          Z,
          z.allergenReplaced
        ), re.iconSizeRatio = x);
        const ee = this._renderLevelCircle(
          Z,
          re,
          z.allergenReplaced,
          R,
          X,
          z.entity_id,
          v
        );
        return A`<td>${ee}</td>`;
      }), b = y ? A`<td>
                    <span style="font-size: ${1 * a}em;">
                      ${this.config.show_text_allergen ? this.config.allergens_abbreviated ? z.allergenShort : z.allergenCapitalized : ""}
                    </span>
                  </td>` : "", f = l.map((R) => {
        var ee, de;
        if (z.isSummary) {
          const ne = (ee = z.days[R]) == null ? void 0 : ee.state;
          if (ne == null || Number(ne) < 0) return A`<td></td>`;
        }
        const G = ((de = z.days[R]) == null ? void 0 : de.state_text) || "", X = yr(z.days[R], this.config), Z = X != null && X >= 0 ? X : "";
        let re = "";
        return this.config.show_value_text && this.config.show_value_numeric ? re = Z !== "" ? `${G} (${Z})` : G : this.config.show_value_text ? re = G : this.config.show_value_numeric && (re = Z !== "" ? String(Z) : ""), A`<td>
                  <span style="font-size: ${1 * a}em;"
                    >${re}</span
                  >
                </td>`;
      }), O = this.config.show_text_allergen || this.config.show_value_text || this.config.show_value_numeric ? A`<tr class="allergen-text-row">
                      ${b}${f}
                    </tr>` : "", F = z.stale ? A`
                    <tr
                      class="allergen-icon-row allergen-stale-row"
                      valign="top"
                    >
                      ${E}
                      <td colspan="${l.length}" class="stale-cell">
                        <span class="stale-allergen-text"> ${C} </span>
                      </td>
                    </tr>
                    ${H}
                  ` : A`
                    <tr class="allergen-icon-row" valign="top">
                      ${V}${M}
                    </tr>
                    ${O}
                  `, Y = Ge(this.config.show_summary_block) && S > 0 && ((m = t[S - 1]) != null && m.isSummary) && !z.isSummary && this.config.show_summary_separator !== !1 ? A`<tr class="block-separator-row">
                      <td colspan="${g}">
                        <hr class="block-separator" />
                      </td>
                    </tr>` : "", Q = z.isSummary ? this._renderSummaryExtrasRows(
        z,
        g,
        a,
        y
      ) : [];
      return [T, Y, F, ...Q];
    })}
          </table>
        </div>
      </div>
    `;
  }
  /**
   * GPL summary qualifiers (issue #222): two text rows directly beneath the
   * aggregate — the day's top pollen types ("Top") and the plants in season
   * ("In season") — each a localized label in the allergen column and the
   * localized name list as plain text to the right. The aggregate row above
   * carries the colour/level; these rows only qualify it, so no icons, no
   * colours, no count. Each row is behind its own toggle and null-safe, so
   * SILAM/Atmo (which never set these fields) render nothing. Returns an array
   * of <tr> so the caller can spread into flatMap.
   */
  _renderSummaryExtrasRows(t, r, o, a) {
    if (!Ge(this.config.show_summary_block)) return [];
    const i = [], l = a ? r - 1 : r, n = `font-size: ${1 * o}em;`, s = (d, _) => a ? A`
            <tr class="allergen-text-row summary-qualifier-row">
              <td>
                <span class="summary-q-label" style="${n}">${d}</span>
              </td>
              <td colspan="${l}" style="text-align: left;">
                <span class="summary-q-list" style="${n}">${_}</span>
              </td>
            </tr>
          ` : A`
            <tr class="allergen-text-row summary-qualifier-row">
              <td colspan="${r}" style="text-align: left;">
                <span class="summary-q-label" style="${n}">${d}:</span>
                <span class="summary-q-list" style="${n}">${_}</span>
              </td>
            </tr>
          `;
    return this.config.show_summary_top_types !== !1 && Array.isArray(t.topPollen) && t.topPollen.length > 0 && i.push(
      s(this._t("card.summary.top_label"), t.topPollen.join(", "))
    ), this.config.show_summary_plants_in_season !== !1 && Array.isArray(t.plantsInSeasonList) && t.plantsInSeasonList.length > 0 && i.push(
      s(
        this._t("card.summary.in_season_label"),
        t.plantsInSeasonList.join(", ")
      )
    ), i;
  }
  /**
   * Google attribution footer (issue #338). The Google Pollen API attribution
   * policy requires the "Google Maps" wordmark and the source line to be shown
   * verbatim and always visible wherever the data is displayed, so the strings
   * are never localized and never hidden behind a tooltip. Only the
   * Google-backed adapters render it; every other integration gets no extra
   * DOM node at all.
   */
  _renderGoogleAttribution() {
    const t = this.config.integration;
    if (t !== "gpl" && t !== "gp" || this.config.show_google_attribution === !1)
      return fe;
    const r = un(this._hass);
    return A`<div
      class="google-attribution"
      style="--pp-google-attribution-color: ${r};"
    >
      <span class="google-attribution-maps">${Oo}</span
      ><span> — ${Bo}</span>
    </div>`;
  }
  render() {
    var d, _;
    if (!this.config) return A``;
    if (!this._isLoaded && (!this.sensors || !this.sensors.length))
      return A`
        <ha-card>
          <div style="padding: 1em; text-align: center;">
            ${this._t("card.loading_forecast") || "Loading forecast..."}
          </div>
        </ha-card>
      `;
    if (this._isLoaded && (!this.sensors || !this.sensors.length)) {
      const c = `card.integration.${this.config.integration}`, u = this._t(c);
      let h;
      return this._error ? (h = this._t(this._error), A`
          <ha-card>
            <div class="card-error">${h} (${u})</div>
          </ha-card>
        `) : this._availableSensorCount === 0 ? this._getStaleStatus().hasStale ? A`
            <ha-card>
              ${this._renderStaleDataHtml()}${this._renderGoogleAttribution()}
            </ha-card>
          ` : (h = this._t("card.error_no_sensors"), A`
          <ha-card>
            <div class="card-error">${h} (${u})</div>
          </ha-card>
        `) : this._noPollenData ? A`
          <ha-card>
            ${this._renderNoAllergensHtml()}${this._renderGoogleAttribution()}
          </ha-card>
        ` : (this.debug && console.debug(
        `[PollenPrognosCard] no usable forecast data (${u})`
      ), A` <ha-card> ${this._renderNoInformationHtml()} </ha-card> `);
    }
    if (this._getStaleStatus().allStale)
      return A`
        <ha-card>
          ${this._renderStaleDataHtml()}${this._renderGoogleAttribution()}
        </ha-card>
      `;
    if (this.sensors.length && this.days_to_show === 0)
      return A` <ha-card> ${this._renderNoInformationHtml()} </ha-card> `;
    const r = this.config.minimal ? this._renderMinimalHtml() : this._renderNormalHtml(), o = Kt(this.config.tap_action) !== null, a = (_ = (d = this.config.background_color) == null ? void 0 : d.trim) == null ? void 0 : _.call(d), i = a ? `background-color: ${a};` : "", l = o ? "pointer" : "auto", n = Ht(this.config.icon_size), s = `
    ${i}
    cursor: ${l};
    --pollen-icon-size: ${n}px;
  `;
    return A`
      <ha-card
        style="${s}"
        @click="${o ? this._handleTapAction : null}"
      >
        ${r}${this._renderGoogleAttribution()}
      </ha-card>
    `;
  }
  getCardSize() {
    return this.sensors.length + 1;
  }
  getGridOptions() {
    return Rc(this.config);
  }
  // _handleTapAction is inherited from LevelCircleMixin (shared with the badge).
  // It resolves the action from this.tapAction, which setConfig keeps in sync.
  _fire(t, r, o) {
    const a = new Event(t, {
      bubbles: !0,
      cancelable: !1,
      composed: !0,
      ...o
    });
    return a.detail = r, this.dispatchEvent(a), a;
  }
  static get styles() {
    return Xe`
      ${_n}
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

      /* .pp-icon svg, .pp-icon svg g and .pp-icon-no-data live in the shared
         ringIconStyles fragment (identical in card and badge). */

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
        to {
          transform: rotate(360deg);
        }
      }

      .level-circle {
        width: var(--pollen-icon-size, 48px);
        max-width: var(--pollen-icon-size, 48px);
        min-width: 0;
        height: auto;
        margin: 0 auto 6px auto;
      }

      /* Summary qualifiers (issue #222): GPL's top types and plants-in-season,
         two text rows under the aggregate. The aggregate carries the colour;
         these only qualify it — a secondary-colour label in the allergen column
         and the name list as primary-colour text to the right. */
      .summary-qualifier-row td {
        vertical-align: middle;
        padding-top: 0;
      }

      .summary-q-label,
      .summary-q-list {
        color: var(--primary-text-color);
      }

      /* .ring-icon and .ring-icon svg live in the shared ringIconStyles
         fragment (identical in card and badge). */

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
      /* Stale-only fallback layout — used when normal-mode render has
         no day columns to anchor a table (e.g. every sensor stale and
         show_empty_days=false). Lays sensors out vertically like the
         minimal-mode stale rows. */
      .stale-only-list {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
      }
      .stale-only-list .sensor.minimal.stale {
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
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
      /* .level-value-text lives in the shared ringIconStyles fragment. */

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

      /* Google attribution footer (#338); the policy-mandated typography is
         shared with the editor rows via googleAttributionTypography. */
      .google-attribution {
        ${Xo}
        padding: 4px 16px 8px;
        text-align: center;
      }

      .google-attribution-maps {
        white-space: nowrap;
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
customElements.define("pollenprognos-card", U_);
function V_(e, t, { short: r = !1, lang: o } = {}) {
  const a = `editor.phrases_${r ? "short" : "full"}.${e}`, i = pe(a, o);
  if (i && i !== a) return i;
  const l = `card.allergen.${e}`, n = pe(l, o);
  if (n && n !== l) return n;
  const s = String(t || e || "").replace(/_/g, " ");
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}
function W_(e, t = {}) {
  const { installedGplPlants: r = [], installedGpPlants: o = [] } = t;
  switch (e) {
    case "dwd":
      return Br.allergens;
    case "peu":
      return Qt;
    case "silam":
      return $i;
    case "kleenex":
      return Ii;
    case "plu":
      return er.allergens;
    case "gpl":
      return [...At, ...r];
    case "gp":
      return [...Pt, ...o];
    case "atmo":
      return Gi;
    case "msw":
      return tr.allergens;
    case "irmkmi":
      return rr.allergens;
    default:
      return zt.allergens;
  }
}
const q_ = [
  "background_color",
  "icon_size",
  "text_size_ratio",
  "show_google_attribution"
], Z_ = [
  "allergen_color_mode",
  "allergen_colors",
  "allergen_outline_color",
  "allergen_stroke_color_synced",
  "allergen_stroke_width",
  "no_allergens_color"
], Q_ = [
  "levels_inherit_mode",
  "levels_colors",
  "levels_empty_color",
  "levels_thickness",
  "levels_gap",
  "levels_gap_color",
  "levels_icon_ratio",
  "levels_text_size",
  "levels_text_color",
  "levels_text_weight",
  "allergen_levels_gap_synced",
  "numeric_value_raw",
  "numeric_state_raw_risk",
  "show_value_numeric_in_circle"
], Y_ = [
  "icon_in_ring",
  "icon_in_ring_color_mode",
  "icon_in_ring_size_ratio",
  "icon_in_ring_static_color"
], J_ = [
  "city",
  "region_id",
  "location",
  "entity_prefix",
  "entity_suffix",
  "entity_weather",
  "title"
], X_ = [
  "allergens",
  "pollen_threshold",
  "sort",
  "sort_category_allergens_first",
  "sort_pollution_block",
  "pollution_block_position",
  "show_block_separator",
  "show_summary_block",
  "show_summary_row",
  "show_summary_separator",
  "show_summary_top_types",
  "show_summary_plants_in_season",
  "allergy_risk_top",
  "index_top"
], eu = ["phrases", "date_locale"];
function tu(e) {
  const t = e._editorConfig();
  return A`
    <!-- §1 Integration & Location -->
    <details open>
      <summary>
        ${e._t("summary_integration_and_place")}
        ${e._renderSectionReset(e._integrationResetKeys())}
      </summary>
      <div class="section-helper">${e._t("helper_integration_and_place")}</div>

      <div class="subgroup-header">${e._t("subgroup_source")}</div>

      <ha-formfield label="${e._t("integration")}">
        <ha-selector
          .hass=${e._hass}
          .selector=${{
    select: {
      mode: "dropdown",
      options: e._buildIntegrationOptions()
    }
  }}
          .value=${t.integration}
          @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("integration", o);
  }}
        ></ha-selector>
      </ha-formfield>
      ${// Google attribution (#338), shown for the Google-backed integrations
  // right under the picker. Both strings are mandated verbatim by the
  // Google Pollen API attribution policy, so they are never localized.
  // Unlike the card footer this row ignores show_google_attribution: the
  // person configuring the card must see the attribution requirement even
  // when they have turned the footer off.
  t.integration === "gpl" || t.integration === "gp" ? A`<div
            class="google-attribution"
            style="--pp-google-attribution-color: ${un(
    e._hass
  )};"
          >
            ${Oo} — ${Bo}
          </div>` : ""}
      ${t.integration === "pp" ? A`
            <ha-formfield label="${e._t("city")}">
              <ha-selector
                .hass=${e._hass}
                .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "",
          label: e._t("location_autodetect")
        },
        ...(e.installedPpLocations || []).map(([r, o]) => ({
          value: r,
          label: o
        })),
        {
          value: "manual",
          label: e._t("location_manual")
        }
      ]
    }
  }}
                .value=${t.city || ""}
                @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("city", o);
  }}
              ></ha-selector>
            </ha-formfield>
          ` : t.integration === "peu" ? A`
              <ha-formfield label="${e._t("location")}">
                <ha-selector
                  .hass=${e._hass}
                  .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "",
          label: e._t("location_autodetect")
        },
        ...(e.installedPeuLocations || []).map(([r, o]) => ({
          value: r,
          label: o
        })),
        {
          value: "manual",
          label: e._t("location_manual")
        }
      ]
    }
  }}
                  .value=${t.location || ""}
                  @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("location", o);
  }}
                ></ha-selector>
              </ha-formfield>
            ` : t.integration === "silam" ? A`
                <ha-formfield label="${e._t("location")}">
                  <ha-selector
                    .hass=${e._hass}
                    .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "",
          label: e._t("location_autodetect")
        },
        ...(e.installedSilamLocations || []).map(([r, o]) => ({
          value: r,
          label: o
        })),
        {
          value: "manual",
          label: e._t("location_manual")
        }
      ]
    }
  }}
                    .value=${t.location || ""}
                    @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("location", o);
  }}
                  ></ha-selector>
                </ha-formfield>
              ` : t.integration === "kleenex" ? A`
                  <ha-formfield label="${e._t("location")}">
                    <ha-selector
                      .hass=${e._hass}
                      .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "",
          label: e._t("location_autodetect")
        },
        ...(e.installedKleenexLocations || []).map(([r, o]) => ({
          value: r,
          label: o
        })),
        {
          value: "manual",
          label: e._t("location_manual")
        }
      ]
    }
  }}
                      .value=${t.location || ""}
                      @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("location", o);
  }}
                    ></ha-selector>
                  </ha-formfield>
                ` : t.integration === "atmo" ? A`
                    <ha-formfield label="${e._t("location")}">
                      <ha-selector
                        .hass=${e._hass}
                        .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "",
          label: e._t("location_autodetect")
        },
        ...(e.installedAtmoLocations || []).map(([r, o]) => ({
          value: r,
          label: o
        })),
        {
          value: "manual",
          label: e._t("location_manual")
        }
      ]
    }
  }}
                        .value=${t.location || ""}
                        @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("location", o);
  }}
                      ></ha-selector>
                    </ha-formfield>
                  ` : t.integration === "gpl" || t.integration === "gp" || t.integration === "msw" || t.integration === "irmkmi" ? A`
                    <ha-formfield label="${e._t("location")}">
                      <ha-selector
                        .hass=${e._hass}
                        .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "",
          label: e._t("location_autodetect")
        },
        ...(t.integration === "gp" ? e.installedGpLocations || [] : t.integration === "msw" ? e.installedMswLocations || [] : t.integration === "irmkmi" ? e.installedIrmkmiLocations || [] : e.installedGplLocations || []).map(([r, o]) => ({
          value: r,
          label: o
        })),
        {
          value: "manual",
          label: e._t("location_manual")
        }
      ]
    }
  }}
                        .value=${t.location || ""}
                        @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("location", o);
  }}
                      ></ha-selector>
                    </ha-formfield>
                  ` : t.integration === "plu" ? A`
                    <ha-formfield label="${e._t("location")}">
                      <ha-selector
                        .hass=${e._hass}
                        .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "",
          label: e._t("location_autodetect")
        },
        {
          value: "manual",
          label: e._t("location_manual")
        }
      ]
    }
  }}
                        .value=${t.location === "manual" ? "manual" : ""}
                        @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("location", o);
  }}
                      ></ha-selector>
                    </ha-formfield>
                  ` : A`
                  <ha-formfield label="${e._t("region_id")}">
                    <ha-selector
                      .hass=${e._hass}
                      .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "",
          label: e._t("location_autodetect")
        },
        ...(e.installedDwdLocations || []).map(([r, o]) => ({
          value: r,
          label: o
        })),
        {
          value: "manual",
          label: e._t("location_manual")
        }
      ]
    }
  }}
                      .value=${t.region_id || ""}
                      @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("region_id", o);
  }}
                    ></ha-selector>
                  </ha-formfield>
                `}
      ${e._showModeSelector() ? t.integration === "silam" && e._hasSilamWeatherEntity(
    t.location,
    t.entity_weather
  ) ? A`
            <ha-formfield label="${e._t("mode")}">
              <ha-selector
                .hass=${e._hass}
                .selector=${{
    select: {
      mode: "dropdown",
      options: [
        { value: "daily", label: e._t("mode_daily") },
        { value: "twice_daily", label: e._t("mode_twice_daily") },
        { value: "hourly", label: e._t("mode_hourly") }
      ]
    }
  }}
                .value=${t.mode || "daily"}
                @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("mode", o);
  }}
              ></ha-selector>
            </ha-formfield>
          ` : t.integration === "peu" ? A`
              <ha-formfield label="${e._t("mode")}">
                <ha-selector
                  .hass=${e._hass}
                  .selector=${{
    select: {
      mode: "dropdown",
      options: [
        { value: "daily", label: e._t("mode_daily") },
        { value: "twice_daily", label: e._t("mode_twice_daily") },
        { value: "hourly", label: e._t("mode_hourly") },
        { value: "hourly_second", label: e._t("mode_hourly_second") },
        { value: "hourly_third", label: e._t("mode_hourly_third") },
        { value: "hourly_fourth", label: e._t("mode_hourly_fourth") },
        { value: "hourly_sixth", label: e._t("mode_hourly_sixth") },
        { value: "hourly_eighth", label: e._t("mode_hourly_eighth") }
      ]
    }
  }}
                  .value=${t.mode || "daily"}
                  @value-changed=${(r) => {
    var a;
    const o = (a = r.detail) == null ? void 0 : a.value;
    o !== void 0 && e._updateConfig("mode", o);
  }}
                ></ha-selector>
              </ha-formfield>
              <p>${e._t("peu_nondaily_expl")}</p>
            ` : "" : ""}
      ${t.integration === "pp" && t.city === "manual" || t.integration === "dwd" && t.region_id === "manual" || (t.integration === "peu" || t.integration === "silam" || t.integration === "kleenex" || t.integration === "atmo" || t.integration === "gpl" || t.integration === "gp" || t.integration === "plu") && t.location === "manual" ? A`
            <details>
              <summary>${e._t("summary_entity_prefix_suffix")}</summary>
              <ha-formfield label="${e._t("entity_prefix")}">
                ${e._renderTextField({
    value: t.entity_prefix || "",
    placeholder: e._t("entity_prefix_placeholder"),
    onInput: (r) => e._updateConfig("entity_prefix", r)
  })}
              </ha-formfield>
              <ha-formfield label="${e._t("entity_suffix")}">
                ${e._renderTextField({
    value: t.entity_suffix || "",
    placeholder: e._t("entity_suffix_placeholder"),
    onInput: (r) => e._updateConfig("entity_suffix", r)
  })}
              </ha-formfield>
              ${t.integration === "silam" ? A`
                    <ha-formfield label="${e._t("entity_weather")}">
                      ${e._renderTextField({
    value: t.entity_weather || "",
    placeholder: e._t("entity_weather_placeholder"),
    onInput: (r) => e._updateConfig("entity_weather", r)
  })}
                    </ha-formfield>
                  ` : ""}
            </details>
          ` : ""}

      <!-- Title subgroup inside §1 (suppressed for elements with no card chrome) -->
      ${e._showTitleSection() ? A`
            <div class="subgroup-header">${e._t("subgroup_title")}</div>
            <div style="display:flex; gap:8px; align-items:center;">
              <ha-formfield label="${e._t("title_hide")}">
                <ha-checkbox
                  .checked=${t.title === !1}
                  @change=${(r) => {
    r.target.checked ? e._updateConfig("title", !1) : e._updateConfig("title", !0);
  }}
                ></ha-checkbox>
              </ha-formfield>
              <ha-formfield label="${e._t("title_automatic")}">
                <ha-checkbox
                  .checked=${t.title === !0 || t.title === void 0}
                  @change=${(r) => {
    r.target.checked ? e._updateConfig("title", !0) : e._updateConfig("title", "");
  }}
                ></ha-checkbox>
              </ha-formfield>
            </div>
            <ha-formfield label="${e._t("title")}">
              ${e._renderTextField({
    value: typeof t.title == "string" ? t.title : t.title === !1 ? "(false)" : "",
    placeholder: e._t("title_placeholder"),
    disabled: t.title === !1,
    onInput: (r) => {
      r.trim() === "" ? e._updateConfig("title", !0) : e._updateConfig("title", r);
    }
  })}
            </ha-formfield>
          ` : ""}
    </details>
  `;
}
function Ka(e) {
  try {
    const r = new Intl.NumberFormat(e || void 0).formatToParts(1.1).find((o) => o.type === "decimal");
    return r ? r.value : ".";
  } catch {
    return ".";
  }
}
function ru(e) {
  var r, o;
  switch ((r = e == null ? void 0 : e.locale) == null ? void 0 : r.number_format) {
    case "comma_decimal":
    // 1,234.56
    case "quote_decimal":
    // 1'234.56
    case "none":
      return ".";
    case "decimal_comma":
    // 1.234,56
    case "space_comma":
      return ",";
    case "system":
      return Ka(void 0);
    case "language":
    default: {
      const a = (o = e == null ? void 0 : e.locale) == null ? void 0 : o.language;
      return a ? Ka(a) : ".";
    }
  }
}
function Ft(e, t) {
  if (e == null || e === "") return "";
  const r = typeof e == "number" ? e : Number(e);
  return Number.isFinite(r) ? ru(t) === "," ? String(r).replace(".", ",") : String(r) : "";
}
function ou(e, t) {
  typeof e != "string" && (e = String(e ?? ""));
  const r = e.trim();
  if (r === "") return null;
  const o = r.replace(/\s/g, "").replace(/,/g, "."), a = Number(o);
  return Number.isFinite(a) ? a : null;
}
function au(e) {
  const t = e._editorConfig(), r = e._currentAllergens(), o = e._thresholdParams(), a = t.allergens || [], l = [
    "value_ascending",
    "value_descending",
    "name_ascending",
    "name_descending",
    "none"
  ].map((n) => ({
    value: n,
    label: e._t(`sort_${n}`)
  }));
  return A`
    <!-- §2 Allergens (promoted to §2, moved from old §3) -->
    <details>
      <summary>
        ${e._t("summary_allergens")}
        ${e._renderSectionReset(e._allergensResetKeys())}
      </summary>
      <div class="section-helper">${e._t("helper_allergens")}</div>
      ${t.integration === "kleenex" || t.integration === "gpl" || t.integration === "gp" ? A`
              <!-- Category allergens (controlled by checkbox) -->
              <div class="allergen-section">
                <h4
                  style="margin: 8px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                >
                  ${e._t("allergens_header_category")}
                </h4>
                <div class="allergens-group">
                  ${["trees_cat", "grass_cat", "weeds_cat"].map((n) => {
    const s = e._getAllergenDisplayName(n);
    return A`
                    <ha-formfield .label=${s}>
                      <ha-checkbox
                        .checked=${a.includes(n)}
                        @change=${(d) => e._onAllergenToggle(
      n,
      d.target.checked
    )}
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
                  ${e._t("allergens_header_specific")}
                </h4>
                <div class="allergens-group">
                  ${r.filter(
    (n) => !["trees_cat", "grass_cat", "weeds_cat"].includes(n)
  ).sort((n, s) => {
    const d = e._getAllergenDisplayName(n), _ = e._getAllergenDisplayName(s);
    return d.localeCompare(_);
  }).map((n) => {
    const s = e._getAllergenDisplayName(n);
    return A`
                      <ha-formfield .label=${s}>
                        <ha-checkbox
                          .checked=${a.includes(n)}
                          @change=${(d) => e._onAllergenToggle(
      n,
      d.target.checked
    )}
                        ></ha-checkbox>
                      </ha-formfield>
                    `;
  })}
                </div>
              </div>
            ` : t.integration === "atmo" ? A`
                <!-- Atmo France: Summary / Pollen / Pollution blocks -->
                <div class="allergen-section">
                  <h4
                    style="margin: 8px 0 4px 0; font-size: 0.9em; color: var(--secondary-text-color);"
                  >
                    ${e._t("allergens_header_summary")}
                  </h4>
                  <div class="allergens-group">
                    ${["allergy_risk", "qualite_globale"].filter((n) => r.includes(n)).map((n) => {
    const s = e._getAllergenDisplayName(n);
    return A`
                        <ha-formfield .label=${s}>
                          <ha-checkbox
                            .checked=${a.includes(n)}
                            @change=${(d) => e._onAllergenToggle(
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
                    ${e._t("allergens_header_pollen")}
                  </h4>
                  <div class="allergens-group">
                    ${r.filter(
    (n) => ![
      "allergy_risk",
      "qualite_globale",
      "pm25",
      "pm10",
      "ozone",
      "no2",
      "so2"
    ].includes(n)
  ).sort((n, s) => {
    const d = e._getAllergenDisplayName(n), _ = e._getAllergenDisplayName(s);
    return d.localeCompare(_);
  }).map((n) => {
    const s = e._getAllergenDisplayName(n);
    return A`
                        <ha-formfield .label=${s}>
                          <ha-checkbox
                            .checked=${a.includes(n)}
                            @change=${(d) => e._onAllergenToggle(
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
                    ${e._t("allergens_header_pollution")}
                  </h4>
                  <div class="allergens-group">
                    ${["pm25", "pm10", "ozone", "no2", "so2"].filter((n) => r.includes(n)).map((n) => {
    const s = e._getAllergenDisplayName(n);
    return A`
                        <ha-formfield .label=${s}>
                          <ha-checkbox
                            .checked=${a.includes(n)}
                            @change=${(d) => e._onAllergenToggle(
      n,
      d.target.checked
    )}
                          ></ha-checkbox>
                        </ha-formfield>
                      `;
  })}
                  </div>
                </div>
              ` : A`
                <!-- Standard allergen display -->
                <div class="allergens-group">
                  ${r.map((n) => {
    const s = e._getAllergenDisplayName(n);
    return A`
                    <ha-formfield .label=${s}>
                      <ha-checkbox
                        .checked=${a.includes(n)}
                        @change=${(d) => e._onAllergenToggle(
      n,
      d.target.checked
    )}
                      ></ha-checkbox>
                    </ha-formfield>
                  `;
  })}
                </div>
              `}
      <div class="preset-buttons">
        ${e._renderTextButton({
    label: e._t("select_all_allergens"),
    onClick: () => {
      const n = t.integration === "kleenex" ? [...r, "trees_cat", "grass_cat", "weeds_cat"] : r;
      e._toggleSelectAllAllergens(n);
    }
  })}
        ${t.integration === "atmo" ? A`
                ${e._renderTextButton({
    label: e._t("select_all_pollen"),
    onClick: () => {
      const n = r.filter(
        (s) => ![
          "allergy_risk",
          "qualite_globale",
          "pm25",
          "pm10",
          "ozone",
          "no2",
          "so2"
        ].includes(s)
      );
      e._toggleAllergenSubset(n);
    }
  })}
                ${e._renderTextButton({
    label: e._t("select_all_pollution"),
    onClick: () => {
      const n = [
        "pm25",
        "pm10",
        "ozone",
        "no2",
        "so2"
      ].filter((s) => r.includes(s));
      e._toggleAllergenSubset(n);
    }
  })}
              ` : ""}
      </div>
      <div class="slider-row">
        <div class="slider-text">${e._t("pollen_threshold")}</div>
        <div class="slider-value">
          ${Ft(t.pollen_threshold, e._hass)}
        </div>
        <ha-slider
          min="${o.min}"
          max="${o.max}"
          step="${o.step}"
          .value=${t.pollen_threshold}
          @input=${(n) => e._updateConfig(
    "pollen_threshold",
    Number(n.target.value)
  )}
        ></ha-slider>
      </div>
      <ha-formfield label="${e._t("sort")}">
        <ha-selector
          .hass=${e._hass}
          .selector=${{
    select: {
      mode: "dropdown",
      options: l
    }
  }}
          .value=${t.sort}
          @value-changed=${(n) => {
    var d;
    const s = (d = n.detail) == null ? void 0 : d.value;
    s !== void 0 && e._updateConfig("sort", s);
  }}
        ></ha-selector>
      </ha-formfield>
      ${t.integration === "kleenex" || t.integration === "gpl" || t.integration === "gp" ? A`
              <ha-formfield
                label="${e._t("sort_category_allergens_first")}"
              >
                <ha-checkbox
                  .checked=${t.sort_category_allergens_first}
                  @change=${(n) => e._updateConfig(
    "sort_category_allergens_first",
    n.target.checked
  )}
                ></ha-checkbox>
              </ha-formfield>
            ` : ""}
      ${// Pin-to-top toggle. Hidden for the summary-block integrations
  // when the block is on, since pinning a row that has been promoted
  // to the block is a no-op (issue #222). PEU keeps it unconditionally.
  t.integration === "peu" || (t.integration === "silam" || t.integration === "atmo" || t.integration === "gpl") && !t.show_summary_block ? A`
              <ha-formfield
                label="${t.integration === "silam" ? e._t("index_top") : e._t("allergy_risk_top")}"
              >
                <ha-checkbox
                  .checked=${t.integration === "silam" ? t.index_top : t.allergy_risk_top}
                  @change=${(n) => e._updateConfig(
    t.integration === "silam" ? "index_top" : "allergy_risk_top",
    n.target.checked
  )}
                ></ha-checkbox>
              </ha-formfield>
            ` : ""}
      ${// Summary block (issue #222): opt-in overall-risk indicator above
  // the rows. Available for the three aggregate-risk integrations.
  t.integration === "silam" || t.integration === "atmo" || t.integration === "gpl" ? A`
              <ha-formfield label="${e._t("show_summary_block")}">
                <ha-checkbox
                  .checked=${t.show_summary_block === !0}
                  @change=${(n) => e._updateConfig(
    "show_summary_block",
    n.target.checked
  )}
                ></ha-checkbox>
              </ha-formfield>
              ${t.show_summary_block ? A`
                    <ha-formfield label="${e._t("show_summary_row")}">
                      <ha-checkbox
                        .checked=${t.show_summary_row === !0}
                        @change=${(n) => e._updateConfig(
    "show_summary_row",
    n.target.checked
  )}
                      ></ha-checkbox>
                    </ha-formfield>
                    ${t.show_summary_row ? A`
                          <ha-formfield
                            label="${e._t("show_summary_separator")}"
                          >
                            <ha-checkbox
                              .checked=${t.show_summary_separator !== !1}
                              @change=${(n) => e._updateConfig(
    "show_summary_separator",
    n.target.checked
  )}
                            ></ha-checkbox>
                          </ha-formfield>
                        ` : ""}
                    ${t.integration === "gpl" ? A`
                          <ha-formfield
                            label="${e._t("show_summary_top_types")}"
                          >
                            <ha-checkbox
                              .checked=${t.show_summary_top_types !== !1}
                              @change=${(n) => e._updateConfig(
    "show_summary_top_types",
    n.target.checked
  )}
                            ></ha-checkbox>
                          </ha-formfield>
                          <ha-formfield
                            label="${e._t(
    "show_summary_plants_in_season"
  )}"
                          >
                            <ha-checkbox
                              .checked=${t.show_summary_plants_in_season !== !1}
                              @change=${(n) => e._updateConfig(
    "show_summary_plants_in_season",
    n.target.checked
  )}
                            ></ha-checkbox>
                          </ha-formfield>
                        ` : ""}
                  ` : ""}
            ` : ""}
      ${t.integration === "atmo" ? A`
              <ha-formfield label="${e._t("sort_pollution_block")}">
                <ha-checkbox
                  .checked=${t.sort_pollution_block}
                  @change=${(n) => e._updateConfig(
    "sort_pollution_block",
    n.target.checked
  )}
                ></ha-checkbox>
              </ha-formfield>
              ${t.sort_pollution_block ? A`
                    <ha-formfield
                      label="${e._t("pollution_block_position")}"
                    >
                      <ha-selector
                        .hass=${e._hass}
                        .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "bottom",
          label: e._t("pollution_block_bottom")
        },
        {
          value: "top",
          label: e._t("pollution_block_top")
        }
      ]
    }
  }}
                        .value=${t.pollution_block_position || "bottom"}
                        @value-changed=${(n) => {
    var d;
    const s = (d = n.detail) == null ? void 0 : d.value;
    s !== void 0 && e._updateConfig("pollution_block_position", s);
  }}
                      ></ha-selector>
                    </ha-formfield>
                    <ha-formfield label="${e._t("show_block_separator")}">
                      <ha-checkbox
                        .checked=${t.show_block_separator}
                        @change=${(n) => e._updateConfig(
    "show_block_separator",
    n.target.checked
  )}
                      ></ha-checkbox>
                    </ha-formfield>
                  ` : ""}
            ` : ""}
    </details>
  `;
}
function iu(e) {
  const t = e._editorConfig(), r = t.background_color;
  return A`
    <!-- §5 Appearance (badge editor overrides the title to "Badge appearance") -->
    <details>
      <summary>
        ${e._appearanceSectionTitle()}
        ${e._renderSectionReset(e._appearanceResetKeys())}
      </summary>
      <div class="section-helper">${e._appearanceSectionHelper()}</div>
      <ha-formfield label="${e._t("background_color")}">
          <div style="display:flex; gap:8px; align-items:center;">
            ${e._renderTextField({
    value: r || "",
    placeholder: e._t("background_color_placeholder") || "#ffffff",
    width: "120px",
    onInput: (o) => e._updateConfig("background_color", o)
  })}
            <input
              type="color"
              .value=${r && /^#[0-9a-fA-F]{6}$/.test(r) ? r : "#ffffff"}
              @input=${(o) => e._updateConfig(
    "background_color",
    o.target.value
  )}
              style="width: 36px; height: 32px; border: none; background: none; cursor: pointer;"
              title="${e._t("background_color_picker") || "Pick color"}"
            />
          </div>
        </ha-formfield>
        ${e._showCardSizeControls() ? A`
              <ha-formfield label="${e._t("icon_size")}">
                <ha-slider
                  min="16"
                  max="128"
                  step="1"
                  .value=${Ht(t.icon_size)}
                  @input=${(o) => e._updateConfig(
    "icon_size",
    Number(o.target.value)
  )}
                  style="width: 120px;"
                ></ha-slider>
                ${e._renderNumberField({
    value: Ht(t.icon_size),
    min: 16,
    max: 128,
    step: 1,
    onValue: (o) => e._updateConfig("icon_size", o)
  })}
              </ha-formfield>
              <ha-formfield label="${e._t("text_size_ratio")}">
                <ha-slider
                  min="0.5"
                  max="2"
                  step="0.05"
                  .value=${t.text_size_ratio ?? 1}
                  @input=${(o) => e._updateConfig(
    "text_size_ratio",
    Number(o.target.value)
  )}
                  style="width: 120px;"
                ></ha-slider>
                ${e._renderNumberField({
    value: t.text_size_ratio ?? 1,
    min: 0.5,
    max: 2,
    step: 0.05,
    onValue: (o) => e._updateConfig("text_size_ratio", o)
  })}
              </ha-formfield>
            ` : ""}
        ${// Google attribution footer toggle (#338). Google-backed integrations
  // only, default on: the attribution row in §1 stays visible either
  // way, so turning the footer off never hides the requirement from the
  // person configuring the card.
  t.integration === "gpl" || t.integration === "gp" ? A`
              <ha-formfield label="${e._t("show_google_attribution")}">
                <ha-checkbox
                  .checked=${t.show_google_attribution !== !1}
                  @change=${(o) => e._updateConfig(
    "show_google_attribution",
    o.target.checked
  )}
                ></ha-checkbox>
              </ha-formfield>
            ` : ""}
        ${e._renderAppearanceExtras()}
    </details>
  `;
}
function nu(e) {
  const t = e._editorConfig(), r = t.no_allergens_color || U.no_allergens_color, o = t.allergen_outline_color || U.levels_gap_color, a = t.allergen_stroke_width ?? U.allergen_stroke_width;
  return A`
    <!-- §6 Allergen icons -->
    <details>
      <summary>
        ${e._t("summary_allergen_icons")}
        ${e._renderSectionReset(e._allergenIconsResetKeys())}
      </summary>
      <div class="section-helper">${e._t("helper_allergen_icons")}</div>
      <ha-formfield
        label="${e._t("allergen_color_mode") || "Allergen Color Mode"}"
      >
        <ha-selector
          .hass=${e._hass}
          .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "default_colors",
          label: e._t("allergen_color_default_colors") || "Default Colors"
        },
        {
          value: "custom",
          label: e._t("allergen_color_custom") || "Custom Colors"
        }
      ]
    }
  }}
          .value=${t.allergen_color_mode || "default_colors"}
          @value-changed=${(i) => {
    var n;
    const l = (n = i.detail) == null ? void 0 : n.value;
    l !== void 0 && e._updateConfig("allergen_color_mode", l);
  }}
        ></ha-selector>
      </ha-formfield>

          ${t.allergen_color_mode === "custom" ? A`
                <ha-formfield
                  label="${e._t("allergen_colors") || "Allergen Colors (by Level)"}"
                >
                  <div
                    style="display: flex; flex-direction: column; gap: 8px;"
                  >
                    ${(() => {
    const i = U.allergen_colors, l = t.allergen_colors || i;
    return l.map(
      (n, s) => A`
                          <div
                            style="display: flex; align-items: center; gap: 8px;"
                          >
                            <span style="min-width: 60px;"
                              >Level ${s}:</span
                            >
                            <input
                              type="color"
                              .value=${s === 0 && n.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(
        n
      ) ? n : "#000000"}
                              @input=${(d) => {
        const _ = [...l];
        _[s] = d.target.value, e._updateConfig(
          "allergen_colors",
          _
        );
      }}
                              style="width: 28px; height: 28px; border: none; background: none;"
                            />
                            ${e._renderTextField({
        value: n,
        placeholder: s === 0 ? e._t("allergen_empty_placeholder") || "rgba(200,200,200,0.15)" : e._t("allergen_colors_placeholder") || "#ffcc00",
        width: "120px",
        onInput: (d) => {
          const _ = [...l];
          _[s] = d, e._updateConfig(
            "allergen_colors",
            _
          );
        }
      })}
                            ${e._renderResetButton({
        title: e._t("allergen_colors_reset") || "Reset",
        style: "margin-left: 8px;",
        onClick: () => {
          const d = [...l];
          d[s] = U.allergen_colors[s], e._updateConfig(
            "allergen_colors",
            d
          );
        }
      })}
                          </div>
                        `
    );
  })()}
                  </div>
                </ha-formfield>

                <ha-formfield
                  label="${e._t("no_allergens_color") || "No Allergens Color"}"
                >
                  <div
                    style="display: flex; align-items: center; gap: 8px;"
                  >
                    <input
                      type="color"
                      .value=${/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(
    r
  ) ? r : "#a9cfe0"}
                      @input=${(i) => e._updateConfig(
    "no_allergens_color",
    i.target.value
  )}
                      style="width: 28px; height: 28px; border: none; background: none;"
                    />
                    ${e._renderTextField({
    value: r,
    placeholder: e._t("no_allergens_color_placeholder") || "#a9cfe0",
    width: "100px",
    onInput: (i) => e._updateConfig("no_allergens_color", i)
  })}
                    ${e._renderResetButton({
    title: e._t("no_allergens_color_reset") || "Reset",
    style: "margin-left: 8px;",
    onClick: () => e._updateConfig(
      "no_allergens_color",
      U.no_allergens_color
    )
  })}
                  </div>
                </ha-formfield>
              ` : ""}
      <ha-formfield
        label="${e._t("allergen_outline_color")}"
      >
        <div style="display: flex; align-items: center; gap: 8px;">
          <input
            type="color"
            .value=${(() => {
    const i = o;
    return i.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(i) ? i : "#c8c8c8";
  })()}
            @input=${(i) => e._updateConfig(
    "allergen_outline_color",
    i.target.value
  )}
            style="width: 28px; height: 28px; border: none; background: none;"
          />
          ${e._renderTextField({
    value: o,
    placeholder: e._t("allergen_outline_placeholder") || "rgba(200,200,200,1)",
    width: "100px",
    onInput: (i) => e._updateConfig("allergen_outline_color", i)
  })}
          ${e._renderResetButton({
    title: e._t("allergen_outline_reset") || "Reset",
    style: "margin-left: 8px;",
    onClick: () => e._updateConfig(
      "allergen_outline_color",
      U.levels_gap_color
    )
  })}
        </div>
      </ha-formfield>
      <ha-formfield
        label="${e._t("allergen_stroke_color_synced")}"
      >
        <ha-checkbox
          .checked=${t.allergen_stroke_color_synced ?? !0}
          @change=${(i) => e._updateConfig(
    "allergen_stroke_color_synced",
    i.target.checked
  )}
        ></ha-checkbox>
      </ha-formfield>
      <ha-formfield
        label="${e._t("allergen_stroke_width")}"
      >
        <ha-slider
          min="0"
          max="150"
          step="5"
          .value=${a}
          @input=${(i) => {
    const l = Number(i.target.value);
    e._updateConfig("allergen_stroke_width", l);
    const { inheritMode: n, gapSynced: s } = e._inheritState();
    if (n === "inherit_allergen" && s) {
      const d = Ar(l);
      e._updateConfig("levels_gap", d);
    }
  }}
          style="width: 120px;"
        ></ha-slider>
        ${e._renderNumberField({
    value: a,
    min: 0,
    max: 150,
    step: 5,
    onValue: (i) => {
      e._updateConfig("allergen_stroke_width", i);
      const { inheritMode: l, gapSynced: n } = e._inheritState();
      if (l === "inherit_allergen" && n) {
        const s = Ar(i);
        e._updateConfig("levels_gap", s);
      }
    }
  })}
        ${e._renderResetButton({
    title: e._t("allergen_stroke_width_reset") || "Reset",
    style: "margin-left: 8px;",
    onClick: () => e._updateConfig(
      "allergen_stroke_width",
      U.allergen_stroke_width
    )
  })}
      </ha-formfield>
      <div class="field-helper">${e._t("helper_allergen_stroke_width")}</div>
    </details>
  `;
}
function lu(e) {
  const t = e._editorConfig(), { inheritMode: r, gapSynced: o, gapDisabled: a } = e._inheritState(), i = t.levels_colors, l = t.levels_text_color || "";
  return A`
    <!-- §7 Level circles -->
    <details>
      <summary>
        ${e._t("summary_level_circles")}
        ${e._renderSectionReset(e._levelCirclesResetKeys())}
      </summary>
      <div class="section-helper">${e._t("helper_level_circles")}</div>
      <ha-formfield
        label="${e._t("levels_inherit_mode")}"
      >
        <ha-selector
          .hass=${e._hass}
          .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "inherit_allergen",
          label: e._t("levels_inherit_allergen") || "Inherit from Allergen Colors"
        },
        {
          value: "custom",
          label: e._t("levels_custom") || "Use Custom Level Colors"
        }
      ]
    }
  }}
          .value=${t.levels_inherit_mode || "inherit_allergen"}
          @value-changed=${(n) => {
    var d;
    const s = (d = n.detail) == null ? void 0 : d.value;
    s !== void 0 && e._updateConfig("levels_inherit_mode", s);
  }}
        ></ha-selector>
      </ha-formfield>

      ${r === "inherit_allergen" ? A`
            <ha-formfield
              label="${e._t("allergen_levels_gap_synced")}"
            >
              <ha-checkbox
                .checked=${t.allergen_levels_gap_synced ?? !0}
                @change=${(n) => e._updateConfig(
    "allergen_levels_gap_synced",
    n.target.checked
  )}
              ></ha-checkbox>
            </ha-formfield>
            <div class="field-helper">${e._t("helper_allergen_levels_gap_synced")}</div>
          ` : ""}

      ${r === "custom" ? A`
            <ha-formfield label="${e._t("levels_colors")}">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${i.map(
    (n, s) => A`
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <input
                        type="color"
                        .value=${/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(n) ? n : "#000000"}
                        @input=${(d) => {
      const _ = [...i];
      _[s] = d.target.value, e._updateConfig("levels_colors", _);
    }}
                        style="width: 28px; height: 28px; border: none; background: none;"
                      />
                      ${e._renderTextField({
      value: n,
      placeholder: e._t("levels_colors_placeholder"),
      width: "100px",
      onInput: (d) => {
        const _ = [...i];
        _[s] = d, e._updateConfig("levels_colors", _);
      }
    })}
                      ${e._renderResetButton({
      title: e._t("levels_reset"),
      style: "margin-left: 8px;",
      onClick: () => {
        const d = [...i];
        d[s] = U.levels_colors[s], e._updateConfig("levels_colors", d);
      }
    })}
                    </div>
                  `
  )}
              </div>
            </ha-formfield>

            <ha-formfield label="${e._t("levels_empty_color")}">
              <div style="display: flex; align-items: center; gap: 8px;">
                <input
                  type="color"
                  .value=${(() => {
    const n = t.levels_empty_color || U.levels_empty_color;
    return n.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(n) ? n : "#c8c8c8";
  })()}
                  @input=${(n) => e._updateConfig(
    "levels_empty_color",
    n.target.value
  )}
                  style="width: 28px; height: 28px; border: none; background: none;"
                />
                ${e._renderTextField({
    value: t.levels_empty_color,
    placeholder: e._t("levels_colors_placeholder"),
    width: "100px",
    onInput: (n) => e._updateConfig("levels_empty_color", n)
  })}
                ${e._renderResetButton({
    title: e._t("levels_reset"),
    style: "margin-left: 8px;",
    onClick: () => e._updateConfig(
      "levels_empty_color",
      U.levels_empty_color
    )
  })}
              </div>
            </ha-formfield>
          ` : ""}

      <ha-formfield label="${e._t("levels_thickness")}">
        <ha-slider
          min="10"
          max="90"
          step="1"
          .value=${t.levels_thickness}
          @input=${(n) => e._updateConfig(
    "levels_thickness",
    Number(n.target.value)
  )}
          style="width: 120px;"
        ></ha-slider>
        ${e._renderNumberField({
    value: t.levels_thickness,
    min: 10,
    max: 90,
    step: 1,
    onValue: (n) => e._updateConfig("levels_thickness", n)
  })}
        ${e._renderResetButton({
    title: e._t("levels_reset"),
    style: "margin-left: 8px;",
    onClick: () => e._updateConfig("levels_thickness", U.levels_thickness)
  })}
      </ha-formfield>

      <ha-formfield
        label="${e._t("levels_gap")}"
        .disabled=${a}
      >
        <ha-slider
          min="0"
          max="20"
          step="1"
          .value=${t.levels_gap}
          .disabled=${a}
          @input=${(n) => e._updateConfig(
    "levels_gap",
    Number(n.target.value)
  )}
          style="width: 120px;"
        ></ha-slider>
        ${e._renderNumberField({
    value: t.levels_gap,
    min: 0,
    max: 20,
    step: 1,
    disabled: a,
    onValue: (n) => e._updateConfig("levels_gap", n)
  })}
        ${e._renderResetButton({
    title: e._t("levels_reset"),
    style: "margin-left: 8px;",
    disabled: a,
    onClick: () => e._updateConfig("levels_gap", U.levels_gap)
  })}
      </ha-formfield>
      <div class="field-helper">
        ${a ? e._t("helper_levels_gap_synced") : e._t("helper_levels_gap_unsynced")}
      </div>

      ${r === "custom" || !o ? A`
            <ha-formfield label="${e._t("levels_gap_color")}">
              <div style="display: flex; align-items: center; gap: 8px;">
                <input
                  type="color"
                  .value=${(() => {
    const n = t.levels_gap_color || U.levels_gap_color;
    return n.includes("rgba") ? "#c8c8c8" : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(n) ? n : "#c8c8c8";
  })()}
                  @input=${(n) => e._updateConfig(
    "levels_gap_color",
    n.target.value
  )}
                  style="width: 28px; height: 28px; border: none; background: none;"
                />
                ${e._renderTextField({
    value: t.levels_gap_color,
    placeholder: e._t("levels_colors_placeholder"),
    width: "100px",
    onInput: (n) => e._updateConfig("levels_gap_color", n)
  })}
                ${e._renderResetButton({
    title: e._t("levels_reset"),
    style: "margin-left: 8px;",
    onClick: () => e._updateConfig(
      "levels_gap_color",
      U.levels_gap_color
    )
  })}
              </div>
            </ha-formfield>
          ` : ""}

      ${e._showNumericInCircleToggle() ? A`
            <ha-formfield
              label="${e._t("show_value_numeric_in_circle")}"
            >
              <ha-switch
                .checked=${t.show_value_numeric_in_circle}
                @change=${(n) => e._updateConfig(
    "show_value_numeric_in_circle",
    n.target.checked
  )}
              ></ha-switch>
            </ha-formfield>
            <div class="field-helper">
              ${e._t("helper_show_value_numeric_in_circle")}
            </div>
          ` : ""}

      ${e._integrationHasRawValue(t.integration) ? A`
            <ha-formfield label="${e._t("numeric_value_raw")}">
              <ha-switch
                .checked=${t.numeric_value_raw === !0 || t.integration === "peu" && t.numeric_state_raw_risk === !0}
                @change=${(n) => {
    const s = n.target.checked;
    e._updateConfig("numeric_value_raw", s), t.numeric_state_raw_risk === !0 && e._updateConfig("numeric_state_raw_risk", !1);
  }}
              ></ha-switch>
            </ha-formfield>
            <div class="field-helper">
              ${e._t("helper_numeric_value_raw")}
            </div>
          ` : ""}

      <ha-formfield label="${e._t("levels_text_weight")}">
        <ha-selector
          .hass=${e._hass}
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
          .value=${t.levels_text_weight || "normal"}
          @value-changed=${(n) => {
    var d;
    const s = (d = n.detail) == null ? void 0 : d.value;
    s !== void 0 && e._updateConfig("levels_text_weight", s);
  }}
        ></ha-selector>
      </ha-formfield>

      <ha-formfield label="${e._t("levels_text_size")}">
        <ha-slider
          min="0.1"
          max="0.5"
          step="0.05"
          .value=${t.levels_text_size || 0.3}
          @input=${(n) => e._updateConfig(
    "levels_text_size",
    Number(n.target.value)
  )}
          style="width: 120px;"
        ></ha-slider>
        ${e._renderNumberField({
    value: t.levels_text_size || 0.3,
    min: 0.1,
    max: 0.5,
    step: 0.05,
    onValue: (n) => e._updateConfig("levels_text_size", n)
  })}
      </ha-formfield>

      <ha-formfield label="${e._t("levels_icon_ratio")}">
        <ha-slider
          min="0.1"
          max="2"
          step="0.05"
          .value=${t.levels_icon_ratio || 1}
          @input=${(n) => e._updateConfig(
    "levels_icon_ratio",
    Number(n.target.value)
  )}
          style="width: 120px;"
        ></ha-slider>
        ${e._renderNumberField({
    value: t.levels_icon_ratio || 1,
    min: 0.1,
    max: 2,
    step: 0.05,
    onValue: (n) => e._updateConfig("levels_icon_ratio", n)
  })}
      </ha-formfield>

      <ha-formfield label="${e._t("levels_text_color")}">
        <div style="display: flex; align-items: center; gap: 8px;">
          <input
            type="color"
            .value=${/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(l) ? l : "#000000"}
            @input=${(n) => e._updateConfig(
    "levels_text_color",
    n.target.value
  )}
            style="width: 28px; height: 28px; border: none; background: none;"
          />
          ${e._renderTextField({
    value: l,
    placeholder: "var(--primary-text-color)",
    width: "100px",
    onInput: (n) => e._updateConfig("levels_text_color", n)
  })}
        </div>
      </ha-formfield>
    </details>
  `;
}
function su(e) {
  const t = e._editorConfig(), r = t.icon_in_ring_size_ratio ?? U.icon_in_ring_size_ratio, o = t.icon_in_ring_static_color || "";
  return A`
    <!-- §8 Icon in ring -->
    <details>
      <summary>
        ${e._t("summary_icon_in_ring")}
        ${e._renderSectionReset(e._iconInRingResetKeys())}
      </summary>
      <div class="section-helper">${e._t("helper_icon_in_ring")}</div>
      ${e._showIconInRingToggle() ? A`
            <ha-formfield label="${e._t("icon_in_ring")}">
              <ha-checkbox
                .checked=${t.icon_in_ring === !0}
                @change=${(a) => e._updateConfig(
    "icon_in_ring",
    a.target.checked
  )}
              ></ha-checkbox>
            </ha-formfield>
          ` : ""}
      <ha-formfield
        label="${e._t("icon_in_ring_size_ratio")}"
      >
        <div style="display: flex; align-items: center; gap: 8px;">
          <ha-slider
            min="0.2"
            max="0.9"
            step="0.05"
            .value=${r}
            @input=${(a) => e._updateConfig(
    "icon_in_ring_size_ratio",
    Number(a.target.value)
  )}
          ></ha-slider>
          ${e._renderNumberField({
    value: r,
    min: 0.2,
    max: 0.9,
    step: 0.05,
    onValue: (a) => e._updateConfig("icon_in_ring_size_ratio", a)
  })}
        </div>
      </ha-formfield>
      <ha-formfield
        label="${e._t("icon_in_ring_color_mode")}"
      >
        <ha-selector
          .hass=${e._hass}
          .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "static",
          label: e._t("icon_in_ring_color_static") || "Static color"
        },
        {
          value: "follow_level",
          label: e._t("icon_in_ring_color_follow") || "Follow level color"
        }
      ]
    }
  }}
          .value=${t.icon_in_ring_color_mode || "static"}
          @value-changed=${(a) => {
    var l;
    const i = (l = a.detail) == null ? void 0 : l.value;
    i !== void 0 && e._updateConfig("icon_in_ring_color_mode", i);
  }}
        ></ha-selector>
      </ha-formfield>
      ${(t.icon_in_ring_color_mode || "static") === "static" ? A`
            <ha-formfield
              label="${e._t("icon_in_ring_static_color")}"
            >
              <div style="display: flex; align-items: center; gap: 8px;">
                <input
                  type="color"
                  .value=${/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(o) ? o : "#000000"}
                  @input=${(a) => e._updateConfig(
    "icon_in_ring_static_color",
    a.target.value
  )}
                  style="width: 28px; height: 28px; border: none; background: none;"
                />
                ${e._renderTextField({
    value: o,
    placeholder: U.icon_in_ring_static_color,
    width: "100px",
    onInput: (a) => e._updateConfig("icon_in_ring_static_color", a)
  })}
              </div>
            </ha-formfield>
          ` : ""}
    </details>
  `;
}
function du(e) {
  const t = e._editorConfig(), r = e._currentAllergens(), o = e._currentNumLevels(), a = (u) => u != null && typeof u == "object" && !Array.isArray(u), i = a(t.phrases) ? t.phrases : {}, l = a(i.full) ? i.full : {}, n = a(i.short) ? i.short : {}, s = Array.isArray(i.levels) ? i.levels : [], d = a(i.days) ? i.days : {}, _ = typeof t.date_locale == "string" ? t.date_locale : void 0, c = e._selectedPhraseLang || Oe(e._hass, _);
  return A`
    <!-- Translations & strings -->
    <details>
      <summary>
        ${e._t("summary_translation_and_strings")}
        ${e._renderSectionReset(e._phrasesResetKeys())}
      </summary>
      <div class="section-helper">
        ${e._t("helper_translation_and_strings")}
      </div>
      <ha-formfield label="${e._t("locale")}">
        ${e._renderTextField({
    value: _ || "",
    onInput: (u) => e._updateConfig("date_locale", u)
  })}
      </ha-formfield>
      <h3>${e._t("phrases")}</h3>
      <div class="preset-buttons">
        <ha-formfield label="${e._t("phrases_translate_all")}">
          <ha-selector
            .hass=${e._hass}
            .selector=${{
    select: {
      mode: "dropdown",
      options: os.map((u) => ({
        value: u,
        label: new Intl.DisplayNames([e._lang], {
          type: "language"
        }).of(u) || u
      }))
    }
  }}
            .value=${c}
            @value-changed=${(u) => {
    var p;
    const h = (p = u.detail) == null ? void 0 : p.value;
    h !== void 0 && (e._selectedPhraseLang = h);
  }}
          ></ha-selector>
        </ha-formfield>
        ${e._renderTextButton({
    label: e._t("phrases_apply"),
    onClick: () => e._resetPhrases(e._selectedPhraseLang || c)
  })}
      </div>
      <details>
        <summary>${e._t("phrases_full")}</summary>
        ${r.map(
    (u) => A`
            <ha-formfield .label=${u}>
              ${e._renderTextField({
      value: l[u] || "",
      onInput: (h) => {
        const p = {
          ...i,
          full: { ...l, [u]: h }
        };
        e._updateConfig("phrases", p);
      }
    })}
            </ha-formfield>
          `
  )}
      </details>
      ${e._showPhraseShort() ? A`
            <details>
              <summary>${e._t("phrases_short")}</summary>
              ${r.map(
    (u) => A`
                  <ha-formfield .label=${u}>
                    ${e._renderTextField({
      value: n[u] || "",
      onInput: (h) => {
        const p = {
          ...i,
          short: { ...n, [u]: h }
        };
        e._updateConfig("phrases", p);
      }
    })}
                  </ha-formfield>
                `
  )}
            </details>
          ` : ""}
      ${e._showPhraseLevels() ? A`
            <details>
              <summary>${e._t("phrases_levels")}</summary>
              ${Array.from({ length: o }, (u, h) => h).map(
    (u) => A`
                  <ha-formfield .label=${u}>
                    ${e._renderTextField({
      value: s[u] || "",
      onInput: (h) => {
        const p = [...s];
        p[u] = h, e._updateConfig("phrases", {
          ...i,
          levels: p
        });
      }
    })}
                  </ha-formfield>
                `
  )}
            </details>
          ` : ""}
      ${e._showPhraseDays() ? A`
            <details>
              <summary>${e._t("phrases_days")}</summary>
              ${[0, 1, 2].map(
    (u) => A`
                  <ha-formfield .label=${u}>
                    ${e._renderTextField({
      value: d[u] || "",
      onInput: (h) => {
        const p = { ...d, [u]: h };
        e._updateConfig("phrases", {
          ...i,
          days: p
        });
      }
    })}
                  </ha-formfield>
                `
  )}
            </details>
          ` : ""}
      <ha-formfield label="${e._t("no_information")}">
        ${e._renderTextField({
    value: i.no_information || "",
    onInput: (u) => e._updateConfig("phrases", {
      ...i,
      no_information: u
    })
  })}
      </ha-formfield>
    </details>
  `;
}
function cu(e, t) {
  var _;
  e.debug && console.debug("[Editor] resetPhrases - lang:", t), e._updateConfig("date_locale", t);
  const r = (_ = e._config) == null ? void 0 : _.integration, o = e._currentAllergens(), a = {}, i = {};
  o.forEach((c) => {
    const u = ke(c), h = we(u), p = u === "index" ? "index" : h;
    a[c] = e._resolveAllergenPhrase(p, c, { lang: t }), i[c] = e._resolveAllergenPhrase(p, c, {
      short: !0,
      lang: t
    });
  });
  const l = e._currentNumLevels(), n = r === "msw" || r === "irmkmi" || r === "peu" || r === "kleenex" ? "editor.phrases_levels5" : "editor.phrases_levels", s = Array.from(
    { length: l },
    (c, u) => pe(`${n}.${u}`, t)
  ), d = {
    0: pe("editor.phrases_days.0", t),
    1: pe("editor.phrases_days.1", t),
    2: pe("editor.phrases_days.2", t)
  };
  e._updateConfig("phrases", {
    full: a,
    short: i,
    levels: s,
    days: d,
    no_information: pe("editor.no_information", t)
  });
}
function _u(e) {
  const t = e._editorConfig();
  return A`
    <details>
      <summary>
        ${e._t("summary_advanced")}
        ${e._renderSectionReset(["debug", "show_version"])}
      </summary>
      <div class="section-helper">${e._t("helper_advanced")}</div>
      <ha-formfield label="${e._t("debug")}">
        <ha-switch
          .checked=${t.debug}
          @change=${(r) => e._updateConfig("debug", r.target.checked)}
        ></ha-switch>
      </ha-formfield>
      <ha-formfield label="${e._t("show_version")}">
        <ha-switch
          .checked=${t.show_version !== !1}
          @change=${(r) => e._updateConfig(
    "show_version",
    r.target.checked
  )}
        ></ha-switch>
      </ha-formfield>
      <div class="version-info">
        ${e._versionLabel()}: ${"v4.2.0"}
      </div>
    </details>
  `;
}
function uu(e) {
  const t = e._editorConfig();
  return A`
    <!-- §10 Interactions -->
    <details>
      <summary>
        ${e._interactivitySectionTitle()}
        ${e._renderSectionReset(["tap_action", "link_to_sensors"])}
      </summary>
      <div class="section-helper">${e._interactivitySectionHelper()}</div>
      <h3>${e._t("tap_action")}</h3>
      <ha-formfield label="${e._t("link_to_sensors")}">
        <ha-switch
          .checked=${t.link_to_sensors !== !1}
          @change=${(r) => e._updateConfig(
    "link_to_sensors",
    r.target.checked
  )}
        ></ha-switch>
      </ha-formfield>
      <ha-formfield label="${e._t("tap_action_enable")}">
        <ha-switch
          .checked=${e._tapType !== "none"}
          @change=${(r) => {
    var n;
    const o = (n = e._config) == null ? void 0 : n.tap_action, a = o && typeof o == "object" && !Array.isArray(o) ? o : {}, { action: i, ...l } = a;
    r.target.checked ? (e._tapType = "more-info", e._updateConfig("tap_action", {
      ...l,
      type: "more-info"
    })) : (e._tapType = "none", e._updateConfig("tap_action", {
      ...l,
      type: "none"
    })), e.requestUpdate();
  }}
        ></ha-switch>
      </ha-formfield>
      ${e._tapType !== "none" ? A`
            <div style="margin-top: 10px;">
              <label>${e._t("tap_action_type")}</label>
              <ha-selector
                .hass=${e._hass}
                .selector=${{
    select: {
      mode: "dropdown",
      options: [
        {
          value: "more-info",
          label: e._t("tap_action_type_more_info")
        },
        {
          value: "navigate",
          label: e._t("tap_action_type_navigate")
        },
        {
          value: "call-service",
          label: e._t("tap_action_type_call_service")
        }
      ]
    }
  }}
                .value=${e._tapType}
                @value-changed=${(r) => {
    var i;
    const o = (i = r.detail) == null ? void 0 : i.value;
    if (o === void 0) return;
    e._tapType = o;
    const a = {
      type: e._tapType
    };
    if (e._tapType === "more-info" && (a.entity = e._tapEntity), e._tapType === "navigate" && (a.navigation_path = e._tapNavigation), e._tapType === "call-service") {
      a.service = e._tapService;
      try {
        a.service_data = JSON.parse(
          e._tapServiceData || "{}"
        );
      } catch {
        a.service_data = {};
      }
    }
    e._updateConfig("tap_action", a), e.requestUpdate();
  }}
              ></ha-selector>
            </div>
            ${e._tapType === "more-info" ? A`
                  <ha-formfield label="${e._t("tap_action_entity")}">
                    ${e._renderTextField({
    value: e._tapEntity,
    onInput: (r) => {
      e._tapEntity = r, e._updateConfig("tap_action", {
        type: "more-info",
        entity: e._tapEntity
      });
    }
  })}
                  </ha-formfield>
                  ${Yo(e._tapEntity) ? "" : A`<div class="field-warning">
                        ${e._t("tap_action_more_info_needs_entity")}
                      </div>`}
                ` : ""}
            ${e._tapType === "navigate" ? A`
                  <ha-formfield label="${e._t("tap_action_navigation_path")}">
                    ${e._renderTextField({
    value: e._tapNavigation,
    onInput: (r) => {
      e._tapNavigation = r, e._updateConfig("tap_action", {
        type: "navigate",
        navigation_path: e._tapNavigation
      });
    }
  })}
                  </ha-formfield>
                  ${Jo(e._tapNavigation) ? "" : A`<div class="field-warning">
                        ${e._t("tap_action_navigate_needs_path")}
                      </div>`}
                ` : ""}
            ${e._tapType === "call-service" ? A`
                  <ha-formfield label="${e._t("tap_action_service")}">
                    ${e._renderTextField({
    value: e._tapService,
    onInput: (r) => {
      e._tapService = r;
      let o = {};
      try {
        o = JSON.parse(e._tapServiceData || "{}");
      } catch {
      }
      e._updateConfig("tap_action", {
        type: "call-service",
        service: e._tapService,
        service_data: o
      });
    }
  })}
                  </ha-formfield>
                  ${Qo(e._tapService) ? "" : A`<div class="field-warning">
                        ${e._t("tap_action_call_service_needs_service")}
                      </div>`}
                  <ha-formfield label="${e._t("tap_action_service_data")}">
                    ${e._renderTextField({
    value: e._tapServiceData,
    onInput: (r) => {
      e._tapServiceData = r;
      let o = {};
      try {
        o = JSON.parse(e._tapServiceData || "{}");
      } catch {
      }
      e._updateConfig("tap_action", {
        type: "call-service",
        service: e._tapService,
        service_data: o
      });
    }
  })}
                  </ha-formfield>
                ` : ""}
          ` : ""}
    </details>
  `;
}
function hu(e, { value: t, min: r, max: o, step: a, onValue: i, width: l = "80px", disabled: n = !1 }) {
  const s = Number.isInteger(a ?? 1);
  return A`
    <input
      class="pp-input num-field"
      type="text"
      inputmode=${s ? "numeric" : "decimal"}
      .value=${Ft(t, e._hass)}
      ?disabled=${n}
      style="width: ${l};"
      @change=${(d) => {
    const _ = d.target;
    let c = ou(_.value, e._hass);
    if (c === null) {
      _.value = Ft(t, e._hass);
      return;
    }
    typeof r == "number" && (c = Math.max(r, c)), typeof o == "number" && (c = Math.min(o, c)), s && (c = Math.round(c)), _.value = Ft(c, e._hass), i(c);
  }}
    />
  `;
}
function gu({
  value: e,
  onInput: t,
  placeholder: r = "",
  width: o = "",
  type: a = "text",
  disabled: i = !1
}) {
  return A`
    <input
      class="pp-input"
      type=${a}
      .value=${e ?? ""}
      placeholder=${r}
      ?disabled=${i}
      style=${o ? `width: ${o};` : ""}
      @input=${(l) => t(l.target.value)}
    />
  `;
}
function pu({
  title: e = "",
  onClick: t,
  style: r = "",
  disabled: o = !1
}) {
  return A`
    <button
      class="pp-icon-button"
      type="button"
      title=${e}
      style=${r}
      ?disabled=${o}
      @click=${t}
    >
      ↺
    </button>
  `;
}
function mu({
  label: e,
  onClick: t,
  style: r = "",
  disabled: o = !1
}) {
  return A`
    <button
      class="pp-button"
      type="button"
      style=${r}
      ?disabled=${o}
      @click=${t}
    >
      ${e}
    </button>
  `;
}
const Ze = (e, t) => {
  const r = { ...e };
  for (const o of Object.keys(t)) {
    const a = t[o];
    a !== null && typeof a == "object" && !Array.isArray(a) && typeof e[o] == "object" && e[o] !== null ? r[o] = Ze(
      e[o],
      a
    ) : r[o] = a;
  }
  return r;
}, hn = Xe`
  details > summary {
    position: relative;
    padding-right: 48px;
  }
  .section-reset {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 26px;
    height: 26px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--divider-color, #ccc);
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 15px;
    line-height: 1;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .section-reset:hover,
  .section-reset:focus-visible {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .section-reset:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 1px;
  }
`, gn = Xe`
  /* Text/number input — emulates HA's filled textfield look. */
  .pp-input {
    font-family: inherit;
    font-size: 1em;
    color: var(--primary-text-color);
    background: var(
      --mdc-text-field-fill-color,
      var(--secondary-background-color, rgba(0, 0, 0, 0.05))
    );
    border: none;
    border-bottom: 1px solid
      var(--mdc-text-field-idle-line-color, var(--divider-color, #ccc));
    border-radius: 4px 4px 0 0;
    padding: 6px 8px;
    box-sizing: border-box;
    outline: none;
    min-width: 0;
  }
  .pp-input:hover {
    border-bottom-color: var(
      --mdc-text-field-hover-line-color,
      var(--primary-text-color, #212121)
    );
  }
  .pp-input:focus {
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 5px;
  }
  .pp-input:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* Numeric variant keeps the compact width used next to the sliders. */
  .pp-input.num-field {
    width: 80px;
    min-width: 80px;
    max-width: 100px;
    font-size: 1.1em;
  }

  /* Text button — outlined, like HA's buttons. */
  .pp-button {
    font-family: inherit;
    font-size: 0.95em;
    color: var(--primary-color);
    background: transparent;
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    padding: 6px 16px;
    cursor: pointer;
    line-height: 1.2;
  }
  .pp-button:hover {
    background: rgba(var(--rgb-primary-color, 33, 150, 243), 0.08);
  }
  .pp-button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 1px;
  }
  .pp-button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* Round reset (↺) button — same look as the per-section reset. */
  .pp-icon-button {
    width: 26px;
    height: 26px;
    padding: 0;
    border-radius: 50%;
    border: 1px solid var(--divider-color, #ccc);
    background: transparent;
    color: var(--secondary-text-color);
    font-size: 15px;
    line-height: 1;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  }
  .pp-icon-button:hover,
  .pp-icon-button:focus-visible {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .pp-icon-button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 1px;
  }
  .pp-icon-button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
class pn extends lt {
  // ------------------------------------------------------------------
  // Presentation hooks (overridable by subclasses)
  // ------------------------------------------------------------------
  // Whether the Integration/Location section shows the Title sub-group.
  // Cards render a title inside their ha-card; the badge editor overrides
  // this to false (a chrome-less badge has no title).
  _showTitleSection() {
    return !0;
  }
  // Whether the Integration/Location section shows the forecast-mode selector
  // (SILAM/PEU daily / twice_daily / hourly...). The badge renders today's
  // value only, so the badge editor overrides this to false.
  _showModeSelector() {
    return !0;
  }
  // ------------------------------------------------------------------
  // Simple accessors (shared)
  // ------------------------------------------------------------------
  get debug() {
    var t;
    return !!((t = this._config) != null && t.debug);
  }
  // Editor translations always follow the Home Assistant language.
  get _lang() {
    return Oe(this._hass);
  }
  _t(t) {
    return pe(`editor.${t}`, this._lang);
  }
  // ------------------------------------------------------------------
  // Integration detection helper (SILAM weather entity check)
  // ------------------------------------------------------------------
  _hasSilamWeatherEntity(t, r = null) {
    if (!this._hass || !this._hass.states || typeof this._hass.states != "object")
      return !1;
    if (t === "manual" && r && typeof r == "string" && r.startsWith("weather.") && this._hass.states[r])
      return !0;
    const o = _t(this._hass, this.debug);
    if (o.locations.size > 0) {
      const d = lr(
        o,
        t || "",
        this.debug
      );
      if (d) return !!d.weatherEntity;
    }
    if (!t) {
      const d = Object.keys(this._hass.states).filter(
        (_) => typeof _ == "string" && _.startsWith("weather.silam_pollen_")
      ).map(
        (_) => _.replace(/^weather\.silam_pollen_/, "").replace(/_.+$/, "")
      ).filter((_, c, u) => u.indexOf(_) === c).sort();
      return this.debug && console.debug(
        "[Editor] _hasSilamWeatherEntity: found locations:",
        d
      ), d.length > 0;
    }
    const a = Oe(this._hass), i = Je.weather_suffixes, l = (i == null ? void 0 : i[a]) || (i == null ? void 0 : i.en) || [], n = t.toLowerCase();
    for (const d of l)
      if (`weather.silam_pollen_${n}_${d}` in this._hass.states) return !0;
    const s = `weather.silam_pollen_${n}_`;
    return Object.keys(this._hass.states).some(
      (d) => typeof d == "string" && d.startsWith(s)
    );
  }
  // ------------------------------------------------------------------
  // Integration dropdown builder
  // ------------------------------------------------------------------
  /**
   * Build the integration dropdown options as a single visible list with two
   * alphabetically-sorted segments: detected/installed integrations first,
   * non-detected after. With ten supported integrations the legacy fixed
   * order is hard to scan; sorting plus prioritizing the user's actual
   * installs cuts down on bouncing.
   *
   * Detection comes from this._detectedIntegrations, populated by
   * `set hass()`. When hass has not been set yet the set is empty and the
   * dropdown falls back to a single alphabetically-sorted list of all
   * registered adapters.
   */
  _buildIntegrationOptions() {
    const t = this._detectedIntegrations || /* @__PURE__ */ new Set(), r = Yi(), o = (n) => this._t(`integration.${n}`), a = (n, s) => o(n).localeCompare(o(s), this._lang), i = r.filter((n) => t.has(n)).sort(a), l = r.filter((n) => !t.has(n)).sort(a);
    return [...i, ...l].map((n) => ({
      value: n,
      label: o(n)
    }));
  }
  // ------------------------------------------------------------------
  // Allergen display name helper
  // ------------------------------------------------------------------
  /**
   * Resolve a human label for an allergen, never leaking a raw i18n key.
   * Thin wrapper that defaults the locale to the editor language; the chain
   * (editor.phrases -> card.allergen -> humanized fallback) lives in the pure,
   * unit-tested `resolveAllergenPhrase` util. Issue #262 follow-up.
   */
  _resolveAllergenPhrase(t, r, {
    short: o = !1,
    lang: a = this._lang
  } = {}) {
    return V_(t, r, { short: o, lang: a });
  }
  _getAllergenDisplayName(t) {
    if (t == null) return "";
    const r = typeof t == "string" ? t : String(t), o = _e(r), a = we(o);
    return this._resolveAllergenPhrase(a, r);
  }
  // ------------------------------------------------------------------
  // Per-render computed helpers (used by section methods)
  // ------------------------------------------------------------------
  /**
   * Returns the merged "c" config object that section templates read from.
   * Equivalent to the render()-local `c` variable in the card editor.
   */
  _editorConfig() {
    return {
      phrases: {
        full: {},
        short: {},
        levels: [],
        days: {},
        no_information: ""
      },
      ...U,
      ...this._config
    };
  }
  /**
   * Prefill date_locale in the rendered config from the current HA locale when
   * the user hasn't set one, so the editor's locale field shows the active
   * locale instead of being blank (matching the card editor). Display-only: it
   * mutates the render config, not _userConfig, so an untouched value is not
   * baked into the saved YAML. Call from a subclass `set hass`.
   */
  _autofillDateLocale() {
    var t, r;
    !this._hass || !this._config || this._config.date_locale != null || (this._config = {
      ...this._config,
      date_locale: ((r = (t = this._hass) == null ? void 0 : t.locale) == null ? void 0 : r.language) || Oe(this._hass, void 0)
    });
  }
  /**
   * Returns the allergen list for the current integration.
   * Equivalent to the render()-local `allergens` variable in the card editor.
   */
  _currentAllergens() {
    const t = this._editorConfig();
    return W_(t.integration, {
      installedGplPlants: this.installedGplPlants || [],
      installedGpPlants: this.installedGpPlants || []
    });
  }
  /**
   * Returns the number of pollen levels for the current integration.
   * Equivalent to the render()-local `numLevels` variable in the card editor.
   */
  _currentNumLevels() {
    const t = this._editorConfig();
    return C_(t.integration);
  }
  /**
   * Whether the current integration exposes a raw measurement (concentration /
   * index) distinct from the calculated level, so the numeric_value_raw
   * level-vs-raw toggle is meaningful. PP/DWD/Atmo/GPL/GP/MSW have no distinct
   * raw value. Mirrors the resolveNumericValue contract.
   */
  _integrationHasRawValue(t) {
    return ["plu", "peu", "silam", "kleenex"].includes(t ?? "");
  }
  /**
   * Returns the slider parameters for the pollen_threshold control.
   * Equivalent to the render()-local `thresholdParams` variable in the card editor.
   */
  _thresholdParams() {
    const t = this._editorConfig();
    return t.integration === "dwd" ? { min: 0, max: 3, step: 0.5 } : t.integration === "peu" || t.integration === "msw" || t.integration === "irmkmi" ? { min: 0, max: 4, step: 1 } : t.integration === "gpl" || t.integration === "gp" ? { min: 0, max: 5, step: 1 } : t.integration === "plu" ? { min: 0, max: 3, step: 1 } : { min: 0, max: 6, step: 1 };
  }
  _renderNumberField(t) {
    return hu(this, t);
  }
  _renderTextField(t) {
    return gu(t);
  }
  _renderResetButton(t) {
    return pu(t);
  }
  _renderTextButton(t) {
    return mu(t);
  }
  // ------------------------------------------------------------------
  // §1 Integration & Location section
  // ------------------------------------------------------------------
  _renderIntegrationSection() {
    return tu(this);
  }
  // ------------------------------------------------------------------
  // §2 Allergens section
  // ------------------------------------------------------------------
  _renderAllergensSection() {
    return au(this);
  }
  // ------------------------------------------------------------------
  // Inherit-state helper (used by §6 and §7 section methods)
  // ------------------------------------------------------------------
  /**
   * Computes the three locals that §6 and §7 templates depend on.
   * Keeps the computation in one place so both sections stay in sync.
   *
   * @returns {{ inheritMode: string, gapSynced: boolean, gapDisabled: boolean }}
   */
  _inheritState() {
    const t = this._editorConfig(), r = t.levels_inherit_mode || "inherit_allergen", o = t.allergen_levels_gap_synced ?? !0;
    return { inheritMode: r, gapSynced: o, gapDisabled: r === "inherit_allergen" && o };
  }
  // ------------------------------------------------------------------
  // §5 Card appearance section
  // ------------------------------------------------------------------
  _renderAppearanceSection() {
    return iu(this);
  }
  // Whether the Card appearance section shows the card-only size controls
  // (icon_size, text_size_ratio). The badge editor overrides this to false
  // because badge_scale governs the whole badge size instead.
  _showCardSizeControls() {
    return !0;
  }
  // Extra controls appended inside the Card appearance section. Empty on the
  // base; the badge editor overrides it to add badge_scale and the label
  // controls, so badge size lives in "Card appearance" like the card's size.
  _renderAppearanceExtras() {
    return A``;
  }
  // Title and helper for the appearance section (§5). The badge editor
  // overrides these to "Badge appearance" because a badge is not a card.
  _appearanceSectionTitle() {
    return this._t("summary_card_appearance");
  }
  _appearanceSectionHelper() {
    return this._t("helper_card_appearance");
  }
  // ------------------------------------------------------------------
  // §6 Allergen icons section
  // ------------------------------------------------------------------
  _renderAllergenIconsSection() {
    return nu(this);
  }
  // ------------------------------------------------------------------
  // §7 Level circles section
  // ------------------------------------------------------------------
  // Whether the Level circles section shows the numeric-value-in-circle toggle.
  // The card editor uses it; the badge editor hides it because badge_visual
  // (ring_value) is the single source of truth there — the switch would be a
  // false affordance (the element re-derives show_value_numeric_in_circle).
  _showNumericInCircleToggle() {
    return !0;
  }
  _renderLevelCirclesSection() {
    return lu(this);
  }
  // ------------------------------------------------------------------
  // §8 Icon in ring section
  // ------------------------------------------------------------------
  // Whether the icon-in-ring on/off checkbox is shown. The card editor uses it
  // to toggle icon_in_ring; the badge editor hides it because badge_visual is
  // the single source of truth there — a checkbox would be a false affordance
  // (the element re-derives icon_in_ring) and its side effect could silently
  // clobber a user-set levels_thickness.
  _showIconInRingToggle() {
    return !0;
  }
  _renderIconInRingSection() {
    return su(this);
  }
  // Presentation hooks for the phrases section: subclasses that do not display
  // level names or day labels (e.g. the badge) override these to false.
  _showPhraseShort() {
    return !0;
  }
  _showPhraseLevels() {
    return !0;
  }
  _showPhraseDays() {
    return !0;
  }
  _resetPhrases(t) {
    return cu(this, t);
  }
  /**
   * The "Translations & strings" section (locale override + custom phrases),
   * shared by the card and badge editors. Level-name and day-label subsections
   * are gated by _showPhraseLevels() / _showPhraseDays() so the badge (which
   * renders neither) can hide them. Null-safe on config.phrases.
   */
  _renderPhrasesSection() {
    return du(this);
  }
  // ------------------------------------------------------------------
  // Advanced section (debug, show version, version string)
  // ------------------------------------------------------------------
  _renderAdvancedSection() {
    return _u(this);
  }
  // Label for the version string in the Advanced section. The badge editor
  // overrides this to "Pollenprognos Badge version" so it doesn't read "Card".
  _versionLabel() {
    return this._t("card_version");
  }
  // ------------------------------------------------------------------
  // §10 Interactions section (link_to_sensors + tap_action)
  // ------------------------------------------------------------------
  // Title and helper for the interactions section. The badge editor overrides
  // these so the heading and helper speak of a badge instead of a card.
  _interactivitySectionTitle() {
    return this._t("summary_card_interactivity");
  }
  _interactivitySectionHelper() {
    return this._t("helper_card_interactivity");
  }
  /**
   * Seed the editor's tap_action working state from the current _config.
   * Both editors call this from setConfig once _config is assembled, so the
   * tap_action sub-form opens reflecting the saved action (or "none").
   */
  _initInteractionState() {
    var r;
    const t = (r = this._config) == null ? void 0 : r.tap_action;
    if (t && typeof t == "object" && !Array.isArray(t)) {
      const o = t, a = o.action || o.type || "more-info", i = a === "perform-action" ? "call-service" : a;
      this._tapType = ["more-info", "navigate", "call-service"].includes(i) ? i : "none", this._tapEntity = o.entity || "", this._tapNavigation = o.navigation_path || "", this._tapService = o.service || o.perform_action || "", this._tapServiceData = JSON.stringify(
        o.service_data || o.data || {},
        null,
        2
      );
    } else
      this._tapType = "none", this._tapEntity = "", this._tapNavigation = "", this._tapService = "", this._tapServiceData = "";
  }
  /**
   * Shared interactions section, used by both the card and the badge editor.
   *
   * link_to_sensors (default on) gives the effective default behavior: tapping
   * an allergen opens its more-info dialog. tap_action is the opt-in customize
   * control (off until enabled) for an element-level more-info / navigate /
   * call-service action. The runtime handler lives in LevelCircleMixin.
   */
  _renderInteractionSection() {
    return uu(this);
  }
  // ------------------------------------------------------------------
  // Shared visual config side-effects
  // ------------------------------------------------------------------
  /**
   * Applies visual config side-effects shared between the card editor and
   * the badge editor. Operates on a passed-in config object (shallow copy
   * of _config) and returns the (possibly mutated) config plus a `handled`
   * flag.
   *
   * When handled=true, the caller MUST dispatch config-changed immediately
   * and return (skip normal merge). The caller owns _config, _userConfig,
   * and this._thicknessAutoShifted — this method does not touch them.
   *
   * @param {string} prop
   * @param {*} value
   * @param {object} config  Shallow copy of current _config to mutate
   * @returns {{ config: object, handled: boolean, thicknessAutoShifted: boolean|null }}
   *   thicknessAutoShifted is non-null only when the icon_in_ring branch fires;
   *   null means leave this._thicknessAutoShifted unchanged.
   */
  _applyVisualConfigSideEffects(t, r, o) {
    if (t === "icon_in_ring") {
      const a = o.icon_in_ring === !0, i = r === !0;
      if (a !== i) {
        const l = o.levels_thickness ?? U.levels_thickness, n = { ...o, icon_in_ring: i };
        let s = this._thicknessAutoShifted || !1;
        return i && l === bo ? (n.levels_thickness = zr, s = !0) : !i && s && l === zr && (n.levels_thickness = bo, s = !1), { config: n, handled: !0, thicknessAutoShifted: s };
      }
    }
    if (t === "levels_inherit_mode") {
      if (r === "custom" && o.levels_inherit_mode !== "custom")
        return { config: {
          ...o,
          levels_inherit_mode: r,
          levels_gap: U.levels_gap,
          levels_colors: U.levels_colors,
          levels_empty_color: U.levels_empty_color,
          levels_gap_color: U.levels_gap_color
        }, handled: !0, thicknessAutoShifted: null };
      if (r === "inherit_allergen" && o.levels_inherit_mode === "custom") {
        const a = o.allergen_stroke_width || U.allergen_stroke_width, i = Ar(a), n = (o.allergen_colors || U.allergen_colors)[0] || U.levels_empty_color;
        return { config: {
          ...o,
          levels_inherit_mode: r,
          levels_gap: i,
          levels_empty_color: n,
          allergen_levels_gap_synced: !0
        }, handled: !0, thicknessAutoShifted: null };
      }
    }
    if (t === "allergen_colors" && Array.isArray(r)) {
      const a = { ...o, allergen_colors: r };
      return (o.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && r[0] && (a.levels_empty_color = r[0]), { config: a, handled: !0, thicknessAutoShifted: null };
    }
    if (t === "allergen_stroke_width" && r === U.allergen_stroke_width) {
      const a = { ...o, allergen_stroke_width: r };
      if ((o.levels_inherit_mode || "inherit_allergen") === "inherit_allergen" && (o.allergen_levels_gap_synced ?? !0)) {
        const i = Ar(r);
        a.levels_gap = i;
      }
      return { config: a, handled: !0, thicknessAutoShifted: null };
    }
    return (t === "levels_thickness" || t === "levels_gap" || t === "levels_colors" || t === "levels_empty_color" || t === "levels_gap_color") && r === U[t] ? { config: { ...o, [t]: r }, handled: !0, thicknessAutoShifted: null } : t === "allergen_color_mode" && r === "default_colors" && o.allergen_color_mode === "custom" ? { config: {
      ...o,
      allergen_color_mode: r,
      allergen_colors: U.allergen_colors,
      allergen_outline_color: U.levels_gap_color,
      no_allergens_color: U.no_allergens_color
    }, handled: !0, thicknessAutoShifted: null } : t === "levels_thickness" && this._thicknessAutoShifted ? { config: o, handled: !1, thicknessAutoShifted: !1 } : { config: o, handled: !1, thicknessAutoShifted: null };
  }
  // ------------------------------------------------------------------
  // Reset to stub defaults
  // ------------------------------------------------------------------
  /**
   * Resets the card/badge config to stub defaults while preserving location
   * identity keys (city, location, region_id, entity_prefix, entity_suffix,
   * entity_weather, type). Both editors inherit this; the badge editor works
   * correctly because badge_* keys are absent from the stub and will revert
   * to undefined (the badge element re-applies its own defaults on setConfig).
   */
  _resetAll() {
    var i, l;
    const t = [
      "city",
      "location",
      "region_id",
      "entity_prefix",
      "entity_suffix",
      "entity_weather",
      "type"
    ], r = ((i = this._config) == null ? void 0 : i.integration) ?? "pp", o = {};
    for (const n of t)
      ((l = this._config) == null ? void 0 : l[n]) !== void 0 && (o[n] = this._config[n]);
    const a = { ...o, integration: r };
    this.setConfig(a), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: a },
        bubbles: !0,
        composed: !0
      })
    );
  }
  // ------------------------------------------------------------------
  // Per-section reset
  // ------------------------------------------------------------------
  /**
   * Reset one section's options to their defaults: drop the listed keys from
   * the user-origin config so the stub / element defaults take over, then
   * re-seed via setConfig and dispatch. Scoped sibling of _resetAll; works for
   * both editors because _userConfig is the user-origin view both editors
   * maintain and which serves as the reset base (it is not necessarily what
   * gets dispatched in config-changed).
   *
   * @param {string[]} keys
   */
  _resetSection(t) {
    var o;
    if (!Array.isArray(t) || !t.length) return;
    const r = { ...this._userConfig || {} };
    for (const a of t) delete r[a];
    r.type === void 0 && ((o = this._config) == null ? void 0 : o.type) !== void 0 && (r.type = this._config.type), this._userConfig = {}, this.setConfig(r), this._userConfig = { ...r }, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: r },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Small reset button for a section header. Resets the given keys via
   * _resetSection. Rendered inside the <summary>; stops propagation and
   * prevents default so clicking it doesn't toggle the <details>.
   *
   * @param {string[]} keys
   * @returns {import("lit").TemplateResult}
   */
  _renderSectionReset(t) {
    const r = this._t("preset_reset_section") || "Reset section";
    return A`
      <button
        type="button"
        class="section-reset"
        title="${r}"
        aria-label="${r}"
        @click=${(o) => {
      o.preventDefault(), o.stopPropagation(), this._resetSection(t);
    }}
      >
        ↺
      </button>
    `;
  }
  // Keys reset by the Card appearance (§5) section button. The badge editor
  // overrides this to add its badge_* size/label keys.
  _appearanceResetKeys() {
    return [...q_];
  }
  // Keys reset by the Allergen icons (§6) section button. levels_gap is
  // included ONLY when it is actually derived from allergen_stroke_width, i.e.
  // inherit_allergen mode with the gap synced (gapDisabled). When the user has
  // unsynced the gap or picked custom mode, levels_gap is owned by the §7 Level
  // circles section and an icon reset must not clear it.
  _allergenIconsResetKeys() {
    const t = [...Z_], { inheritMode: r, gapDisabled: o } = this._inheritState();
    return o && t.push("levels_gap"), r === "inherit_allergen" && t.push("levels_empty_color"), t;
  }
  // Keys reset by the Level circles (§7) section button.
  _levelCirclesResetKeys() {
    return [...Q_];
  }
  // Keys reset by the Icon in ring (§8) section button. levels_thickness is
  // included only when it was auto-thinned by enabling icon_in_ring (tracked by
  // _thicknessAutoShifted) and never user-customized; otherwise turning the
  // feature off via reset would leave the rings unexpectedly thin. A
  // user-customized thickness is owned by §7 and left untouched.
  _iconInRingResetKeys() {
    const t = [...Y_];
    return this._thicknessAutoShifted && t.push("levels_thickness"), t;
  }
  // Keys reset by the Integration & Location (§1) section button. Resets the
  // place/title WITHIN the chosen integration but keeps `integration` itself —
  // switching integration is the global "Reset all"'s job, not a section reset.
  // After the reset the location re-autodetects. For SILAM/PEU the forecast
  // `mode` selector is rendered in this section; clear it AND its hard-coupled
  // day-display side effects (changing mode auto-writes days_to_show /
  // show_empty_days), so the reset returns the whole mode-related config to
  // defaults. Other integrations have no mode control here, so those keys are
  // left to the Day display (§4) reset.
  _integrationResetKeys() {
    var o;
    const t = [...J_], r = (o = this._config) == null ? void 0 : o.integration;
    return (r === "silam" || r === "peu") && t.push("mode", "days_to_show", "show_empty_days"), t;
  }
  // Keys reset by the Allergens (§2) section button: selection, threshold,
  // sort, pin-to-top, and the summary/pollution-block toggles.
  _allergensResetKeys() {
    return [...X_];
  }
  // Keys reset by the Translations & strings (§9) section button: custom
  // allergen/level/day phrase overrides and the date locale (which re-autofills
  // from the HA locale afterwards).
  _phrasesResetKeys() {
    return [...eu];
  }
}
function Se(e) {
  return Array.from(e.locations.entries()).map(
    ([t, r]) => [t, r.label]
  );
}
class fu extends pn {
  constructor() {
    super(), this.setConfig = (t) => {
      var r, o;
      try {
        this.debug && console.debug("[Editor] ▶️ setConfig INCOMING:", t);
        const a = t.levels_thickness ?? U.levels_thickness;
        this._thicknessAutoShifted = t.icon_in_ring === !0 && a === zr, t.phrases && (this._userConfig.phrases = t.phrases);
        const i = { ...t };
        typeof i.integration == "string" && (i.integration = i.integration.toLowerCase());
        const n = (ce(i.integration || "pp") || ce("pp")).allergens;
        Object.entries(U).forEach(([x, k]) => {
          x in i || (i[x] = k);
        }), Array.isArray(t.allergens) && (!be(t.allergens, n) || this._allergensExplicit) && (this._userConfig.allergens = [...t.allergens], this._allergensExplicit = !0, this.debug && console.debug(
          "[Editor] saved user-chosen allergens:",
          this._userConfig.allergens
        ));
        const s = (ce(i.integration) || ce("pp")).pollen_threshold;
        Object.hasOwn(i, "pollen_threshold") && !this._thresholdExplicit && i.pollen_threshold === s && (this.debug && console.debug(
          "[Editor] dropping incoming stub-threshold (matches stub):",
          s
        ), delete i.pollen_threshold);
        const d = t.integration;
        this._prevIntegration !== void 0 && d !== this._prevIntegration && (delete this._userConfig.allergens, this._allergensExplicit = !1, this.debug && console.debug("[Editor] integration changed → wipe allergens")), !this._integrationExplicit && i.integration === zt.integration && (this.debug && console.debug("[Editor] dropped stub integration"), delete i.integration), !this._daysExplicit && i.days_to_show === zt.days_to_show && (this.debug && console.debug("[Editor] dropped stub days_to_show"), delete i.days_to_show);
        const _ = (ce(i.integration) || ce("pp")).date_locale;
        if (!this._localeExplicit && i.date_locale === _ && (this.debug && console.debug("[Editor] dropped stub date_locale"), delete i.date_locale), this._userConfig.allergens && i.allergens && be(i.allergens, this._userConfig.allergens))
          this.debug && console.debug(
            "[Editor] dropping incoming allergens (same as saved)"
          ), delete i.allergens;
        else if (this._allergensExplicit && i.allergens) {
          const x = (ce(
            i.integration || this._config.integration || "pp"
          ) || ce("pp")).allergens;
          be(i.allergens, x) && (this.debug && console.debug(
            "[Editor] dropping incoming allergens (matches stub, keeping explicit)"
          ), delete i.allergens);
        }
        this._userConfig = Ze(this._userConfig, i), this._thresholdExplicit = Object.hasOwn(this._userConfig, "pollen_threshold"), this._allergensExplicit = Object.hasOwn(this._userConfig, "allergens"), this._integrationExplicit = Object.hasOwn(this._userConfig, "integration"), this._daysExplicit = Object.hasOwn(this._userConfig, "days_to_show"), this._localeExplicit = Object.hasOwn(this._userConfig, "date_locale");
        let c = this._userConfig.integration !== void 0 ? this._userConfig.integration : this._config.integration;
        if (!this._integrationExplicit && this._hass) {
          const x = ht(this._hass, {
            debug: this.debug
          });
          c = Ct(x, { explicit: !1 }) || c || "pp", this._userConfig.integration = c, this.debug && console.debug("[Editor] auto-detected integration:", c);
        }
        (c === "silam" || c === "peu") && !this._userConfig.mode && (this._userConfig.mode = "daily");
        const u = ce(c) || ce("pp"), h = Ze(u, this._userConfig);
        if (Object.entries(U).forEach(([x, k]) => {
          x in h || (h[x] = k);
        }), Object.entries(U).forEach(([x, k]) => {
          h[x] === k && delete h[x];
        }), Object.hasOwn(this._userConfig, "pollen_threshold") || (h.pollen_threshold = u.pollen_threshold, this.debug && console.debug(
          "[Editor] reset pollen_threshold to stub:",
          u.pollen_threshold
        )), h.allergens = Array.isArray(this._userConfig.allergens) ? this._userConfig.allergens : u.allergens, h.integration = c, h.type = "custom:pollenprognos-card", this._config = h, this._prevIntegration = c, this.debug && console.debug(
          "[Editor][F] slutgiltigt this._config.allergens:",
          this._config.allergens
        ), this._daysExplicit || (this._config.days_to_show = u.days_to_show, this.debug && console.debug(
          "[Editor] reset days_to_show to stub:",
          u.days_to_show
        )), !this._localeExplicit) {
          const x = Oe(this._hass, void 0), k = ((o = (r = this._hass) == null ? void 0 : r.locale) == null ? void 0 : o.language) || `${x}-${x.toUpperCase()}`;
          this._config.date_locale = k, this.debug && console.debug(
            "[Editor] autofilled date_locale:",
            k,
            "(HA language was:",
            x,
            ")"
          );
        }
        if (this._initDone = !1, this._hass) {
          const x = Or(this._hass, this.debug);
          if (x.locations.size > 0)
            this.installedPpLocations = Array.from(x.locations.entries()).map(([v, g]) => [v, g.label]).sort(
              ([, v], [, g]) => String(v).localeCompare(String(g), void 0, { sensitivity: "base" })
            ), this.installedCities = this.installedPpLocations.map(([, v]) => v);
          else {
            const v = Object.keys(this._hass.states), g = new Set(
              v.map(
                ($) => typeof $ == "string" ? Me($) : null
              ).filter(Boolean)
            );
            this.installedCities = qt.filter(
              ($) => g.has(
                $.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[-\s]/g, "_")
              )
            ).sort(), this.installedPpLocations = this.installedCities.map(($) => [$, $]);
          }
          const k = Gr(this._hass, this.debug);
          if (k.locations.size > 0) {
            const v = Array.from(k.locations.entries()).map(([$, j]) => [$, j.label]), g = v.every(([$]) => /^\d+$/.test(String($)));
            this.installedDwdLocations = g ? v.sort(([$], [j]) => Number($) - Number(j)) : v.sort(
              ([, $], [, j]) => String($).localeCompare(String(j), void 0, { sensitivity: "base" })
            ), this.installedRegionIds = this.installedDwdLocations.map(([$]) => $);
          } else {
            const v = Object.keys(this._hass.states);
            this.installedRegionIds = Array.from(
              new Set(
                v.map(
                  (g) => {
                    var $;
                    return typeof g == "string" ? ($ = g.match(He)) == null ? void 0 : $[2] : null;
                  }
                ).filter((g) => !!g)
              )
            ).sort((g, $) => Number(g) - Number($)), this.installedDwdLocations = this.installedRegionIds.map(
              (g) => [g, `${g} — ${$r[g] || g}`]
            );
          }
          if (c === "silam") {
            const v = _t(this._hass, this.debug);
            v.locations.size > 0 && (this.installedSilamLocations = Se(v));
          }
        }
        this._integrationExplicit || (c === "dwd" && !this._userConfig.region_id && this.installedDwdLocations.length && (this._config.region_id = this.installedDwdLocations[0][0]), c === "pp" && !this._userConfig.city && this.installedPpLocations.length && (this._config.city = this.installedPpLocations[0][0]), c === "silam" && !this._userConfig.location && this.installedSilamLocations.length && (this._config.location = this.installedSilamLocations[0][0])), this.debug && console.debug("[Editor] Final _config before dispatch:", this._config), this._initInteractionState();
        const p = this._config || {}, w = Object.keys(h).filter(
          (x) => !be(h[x], p[x])
        );
        if (!(w.length > 0 && w.every((x) => mi.includes(x))) && !be(p, h) ? (this._config = h, this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: this._config },
            bubbles: !0,
            composed: !0
          })
        )) : this._config = h, this.requestUpdate(), this._prevIntegration = d, this._initDone = !0, this._config.integration === "gpl" && this._hass) {
          const x = _r(this._hass, this.debug);
          this.installedGplLocations = Se(x);
          const k = this._config.location || (this.installedGplLocations.length ? this.installedGplLocations[0][0] : null), v = Po(this._hass, k, !1);
          this.installedGplPlants = v.filter((g) => !At.includes(g));
        }
        if (this._config.integration === "gp" && this._hass) {
          const x = Mt(this._hass, this.debug);
          this.installedGpLocations = Se(x);
          const k = this._config.location || (this.installedGpLocations.length ? this.installedGpLocations[0][0] : null), v = Co(this._hass, k, !1);
          this.installedGpPlants = v.filter((g) => !Pt.includes(g));
        }
        if (this._config.integration === "msw" && this._hass) {
          const x = Zr(this._hass, this.debug);
          this.installedMswLocations = Se(x);
        }
        if (this._config.integration === "irmkmi" && this._hass) {
          const x = Yr(this._hass, this.debug);
          this.installedIrmkmiLocations = Se(x);
        }
      } catch (a) {
        throw console.error("pollenprognos-card-editor: Fel i setConfig:", a, t), a;
      }
    }, this._onAllergenToggle = (t, r) => {
      var a, i, l;
      ((a = this._config) == null ? void 0 : a.integration) === "peu" && ((i = this._config) == null ? void 0 : i.mode) !== "daily" && t !== "allergy_risk" && r && this._updateConfig("mode", "daily");
      const o = new Set((l = this._config) == null ? void 0 : l.allergens);
      r ? o.add(t) : o.delete(t), this._updateConfig("allergens", [...o]);
    }, this._toggleSelectAllAllergens = (t) => {
      var i, l, n;
      const r = new Set((i = this._config) == null ? void 0 : i.allergens), o = t.every((s) => r.has(s));
      ((l = this._config) == null ? void 0 : l.integration) === "peu" && ((n = this._config) == null ? void 0 : n.mode) !== "daily" && !o && this._updateConfig("mode", "daily");
      const a = o ? [] : t;
      this._updateConfig("allergens", [...a]);
    }, this._toggleAllergenSubset = (t) => {
      var a;
      const r = new Set((a = this._config) == null ? void 0 : a.allergens);
      t.every((i) => r.has(i)) ? t.forEach((i) => r.delete(i)) : t.forEach((i) => r.add(i)), this._updateConfig("allergens", [...r]);
    }, this._updateConfig = (t, r) => {
      if (this.debug && console.debug("[Editor] _updateConfig – prop:", t, "value:", r), t === "sort" && r === "none") {
        const i = { ...this._config, sort: r };
        (this._config.integration === "kleenex" || this._config.integration === "gpl" || this._config.integration === "gp") && this._config.sort_category_allergens_first && (i.sort_category_allergens_first = !1, delete this._userConfig.sort_category_allergens_first), (this._config.integration === "peu" || this._config.integration === "atmo" || this._config.integration === "gpl") && this._config.allergy_risk_top && (i.allergy_risk_top = !1, delete this._userConfig.allergy_risk_top), this._config.integration === "atmo" && this._config.sort_pollution_block && (i.sort_pollution_block = !1, delete this._userConfig.sort_pollution_block), this._config.integration === "silam" && this._config.index_top && (i.index_top = !1, delete this._userConfig.index_top), this._config = i, this._userConfig.sort = r, this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: i },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      }
      {
        const i = this._applyVisualConfigSideEffects(
          t,
          r,
          { ...this._config }
        );
        if (i.thicknessAutoShifted !== null && (this._thicknessAutoShifted = i.thicknessAutoShifted), i.handled) {
          const l = this._config;
          this._config = i.config;
          for (const n of Object.keys(i.config))
            i.config[n] !== l[n] && (this._userConfig[n] = i.config[n]);
          t === "allergen_color_mode" && r === "default_colors" && (delete this._userConfig.allergen_colors, delete this._userConfig.allergen_outline_color, delete this._userConfig.no_allergens_color), t === "levels_inherit_mode" && r === "custom" && (delete this._userConfig.levels_gap, delete this._userConfig.levels_colors, delete this._userConfig.levels_empty_color, delete this._userConfig.levels_gap_color), this.dispatchEvent(
            new CustomEvent("config-changed", {
              detail: { config: i.config },
              bubbles: !0,
              composed: !0
            })
          );
          return;
        }
      }
      if (t === "date_locale") {
        const i = this._config.sort, l = this._config.mode;
        this._config = {
          ...this._config,
          date_locale: r,
          sort: "",
          mode: ""
        }, this.requestUpdate(), setTimeout(() => {
          this._config = {
            ...this._config,
            sort: i,
            mode: l
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
      const o = { ...this._userConfig };
      let a;
      if (t === "integration") {
        const i = r, l = this._config.integration;
        i !== l && (delete o.city, delete o.region_id, delete o.location, delete o.entity_prefix, delete o.entity_suffix, delete o.entity_weather, delete o.mode, delete o.allergens, delete o.days_to_show, delete o.pollen_threshold, delete o.allergy_risk_top, delete o.index_top, delete o.show_summary_block, delete o.show_summary_row, delete o.show_summary_separator, delete o.show_summary_top_types, delete o.show_summary_plants_in_season, delete o.show_google_attribution, this._allergensExplicit = !1);
        const n = ce(i) || ce("pp");
        a = Ze(n, o), a.integration = i, o.integration = i, this._userConfig = o, this._integrationExplicit = !0;
      } else {
        if (a = { ...this._config, [t]: r }, t === "allergens" && (this._userConfig.allergens = r, this._allergensExplicit = !0, this.debug && console.debug(
          "[Editor] allergens explicitly changed:",
          this._userConfig.allergens
        )), ["city", "region_id", "location"].includes(t) && r !== "manual" && (a.entity_prefix = "", a.entity_suffix = ""), (this._config.integration === "silam" || this._config.integration === "peu") && t === "mode") {
          if (r !== "daily")
            a.days_to_show = 8, a.show_empty_days = !1, this._config.integration === "peu" && (a.allergens = ["allergy_risk"], this._userConfig.allergens = ["allergy_risk"], this._allergensExplicit = !0);
          else if (a.days_to_show = this._config.integration === "silam" ? 5 : 4, this._config.integration === "peu") {
            const i = this._config.allergens || [], l = i.length === 1 && i[0] === "allergy_risk";
            (!this._allergensExplicit || l) && (a.allergens = [...Qt], this._userConfig.allergens = [...Qt], this._allergensExplicit = !0);
          }
        }
        this._config.integration === "silam" && t === "location" && this._config.location === "manual" && r !== "manual" && a.entity_weather && (a.entity_weather = ""), this._config.integration === "silam" && t === "location" && (this._hasSilamWeatherEntity(
          r,
          a.entity_weather
        ) || (a.mode = "daily", a.days_to_show = 2));
      }
      if (a.type = this._config.type, t !== "integration")
        for (const i of Object.keys(a))
          be(a[i], this._config[i]) || (this._userConfig[i] = a[i]);
      be(this._config, a) ? this._config = a : (this._config = a, this.debug && console.debug("[Editor] updated _config:", this._config), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._config },
          bubbles: !0,
          composed: !0
        })
      ));
    }, this._userConfig = {}, this._integrationExplicit = !1, this._thresholdExplicit = !1, this._thicknessAutoShifted = !1, this._config = {}, this.installedCities = [], this.installedPeuLocations = [], this.installedSilamLocations = [], this.installedKleenexLocations = [], this.installedAtmoLocations = [], this.installedMswLocations = [], this.installedIrmkmiLocations = [], this._prevIntegration = void 0, this.installedRegionIds = [], this.installedPpLocations = [], this.installedDwdLocations = [], this._initDone = !1, this._allergensExplicit = !1, this._origAllergensSet = !1, this._userAllergens = null, this._tapType = "none", this._tapEntity = "", this._tapNavigation = "", this._tapService = "", this._tapServiceData = "";
  }
  // _resetAll is inherited from PollenEditorBase. The card editor overrides
  // to also clear _userConfig before delegating to the base implementation.
  _resetAll() {
    this.debug && console.debug("[Editor] resetAll"), this._userConfig = {}, super._resetAll();
  }
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
      installedCities: { type: Array },
      installedRegionIds: { type: Array },
      installedPpLocations: { type: Array },
      installedDwdLocations: { type: Array },
      _initDone: { type: Boolean },
      _selectedPhraseLang: { state: !0 },
      _tapType: { type: String },
      _tapEntity: { type: String },
      _tapNavigation: { type: String },
      _tapService: { type: String },
      _tapServiceData: { type: String }
    };
  }
  set hass(t) {
    var j, P, L, I, D, z, S, T, E;
    if (this._hass === t) return;
    this._hass = t;
    const r = this._integrationExplicit, o = ht(t, {
      debug: this.debug
    }), {
      states: { pp: a = [], dwd: i = [] },
      discovery: {
        silam: l,
        atmo: n,
        gp: s,
        kleenex: d
      },
      getPpDiscovery: _,
      getDwdDiscovery: c,
      getPeuDiscovery: u,
      getGplDiscovery: h,
      getMswDiscovery: p,
      getIrmkmiDiscovery: w
    } = o;
    this._detectedIntegrations = nn(o);
    const y = Ct(o, {
      explicit: r,
      userIntegration: this._userConfig.integration
    }) || "pp";
    r || (this._userConfig.integration = y, this.debug && console.debug("[Editor] autodetect chosen:", y));
    const x = h();
    if (this.installedGplLocations = Se(x), y === "gpl") {
      const C = this._config.location || (this.installedGplLocations.length ? this.installedGplLocations[0][0] : null), N = Po(t, C, !1);
      this.installedGplPlants = N.filter((H) => !At.includes(H));
    } else
      this.installedGplPlants = [];
    if (this.installedGpLocations = Se(s), y === "gp") {
      const C = this._config.location || (this.installedGpLocations.length ? this.installedGpLocations[0][0] : null), N = Co(t, C, !1);
      this.installedGpPlants = N.filter((H) => !Pt.includes(H));
    } else
      this.installedGpPlants = [];
    const k = p();
    this.installedMswLocations = Se(k);
    const v = w();
    this.installedIrmkmiLocations = Se(v), (y === "silam" || y === "peu") && !this._userConfig.mode && (this._userConfig.mode = "daily");
    const g = ce(y) || ce("pp"), $ = Ze(g, this._userConfig);
    if (Object.hasOwn(this._userConfig, "pollen_threshold") || ($.pollen_threshold = g.pollen_threshold, this.debug && console.debug(
      "[Editor][hass] reset pollen_threshold to stub:",
      g.pollen_threshold
    )), $.sort = $.sort || "value_ascending", Object.entries(U).forEach(([C, N]) => {
      $[C] === N && delete $[C];
    }), !be(this._config, $)) {
      this._config = $;
      const C = _();
      if (C.locations.size > 0) {
        this.installedPpLocations = Se(C);
        const M = (j = this._config) == null ? void 0 : j.city;
        if (M && M !== "manual" && !C.locations.has(M)) {
          const b = Dt(C, M, {
            slugExtractor: Me
          });
          if (b) {
            const [, f] = b;
            this.installedPpLocations.push([M, f.label]);
          }
        }
        this.installedPpLocations.sort(
          ([, b], [, f]) => String(b).localeCompare(String(f), void 0, { sensitivity: "base" })
        ), this.installedCities = this.installedPpLocations.map(([, b]) => b);
      } else {
        const M = Array.from(
          new Set(
            a.map((b) => Me(b)).filter(Boolean)
          )
        );
        this.installedCities = qt.filter(
          (b) => M.includes(
            b.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[-\s]/g, "_")
          )
        ).sort((b, f) => b.localeCompare(f)), this.installedPpLocations = this.installedCities.map((b) => [b, b]);
      }
      const N = c();
      if (N.locations.size > 0) {
        this.installedDwdLocations = Se(N);
        const M = (P = this._config) == null ? void 0 : P.region_id;
        if (M && M !== "manual" && !N.locations.has(M)) {
          const f = Dt(N, M, {
            slugExtractor: (O) => {
              var F;
              return ((F = O.match(/_(\d+)$/)) == null ? void 0 : F[1]) || null;
            }
          });
          if (f) {
            const [, O] = f;
            this.installedDwdLocations.push([M, O.label]);
          }
        }
        const b = this.installedDwdLocations.every(
          ([f]) => /^\d+$/.test(String(f))
        );
        this.installedDwdLocations.sort(
          b ? ([f], [O]) => Number(f) - Number(O) : ([, f], [, O]) => String(f).localeCompare(String(O), void 0, { sensitivity: "base" })
        ), this.installedRegionIds = this.installedDwdLocations.map(([f]) => f);
      } else
        this.installedRegionIds = Array.from(
          new Set(i.map((M) => M.split("_").pop()))
        ).sort((M, b) => Number(M) - Number(b)), this.installedDwdLocations = this.installedRegionIds.map(
          (M) => [M, `${M} — ${$r[M] || M}`]
        );
      const H = u();
      if (H.locations.size > 0) {
        this.installedPeuLocations = Se(H).sort(
          ([, b], [, f]) => String(b).localeCompare(String(f), void 0, { sensitivity: "base" })
        );
        const M = (L = this._config) == null ? void 0 : L.location;
        if (M && M !== "manual" && !H.locations.has(M) && y === "peu") {
          const b = Dt(H, M, {
            slugExtractor: We
          });
          if (b) {
            const [, f] = b;
            this.installedPeuLocations.push([M, f.label]);
          }
        }
      } else
        this.installedPeuLocations = Array.from(
          new Map(
            Object.values(t.states).filter(
              (M) => M && typeof M == "object" && typeof M.entity_id == "string" && M.entity_id.startsWith("sensor.polleninformation_")
            ).map((M) => {
              var O, F, Y, Q;
              const b = ((O = M.attributes) == null ? void 0 : O.location_slug) || M.entity_id.replace("sensor.polleninformation_", "").replace(/_[^_]+$/, ""), f = ((F = M.attributes) == null ? void 0 : F.location_title) || (typeof ((Y = M.attributes) == null ? void 0 : Y.friendly_name) == "string" ? (Q = M.attributes.friendly_name.match(/\((.*?)\)/)) == null ? void 0 : Q[1] : void 0) || b;
              return [b, f];
            })
          )
        );
      if (l.locations.size > 0)
        this.installedSilamLocations = Se(l), this.debug && console.debug(
          "[Editor][SILAM] Discovery-based locations:",
          this.installedSilamLocations
        );
      else {
        const M = [
          "allergy_risk",
          "alder",
          "birch",
          "grass",
          "hazel",
          "mugwort",
          "olive",
          "ragweed"
        ], b = new Set(
          Object.values(Je.mapping).flatMap(
            (f) => Object.entries(f).filter(
              ([, O]) => M.includes(O)
            ).map(([O]) => O)
          )
        );
        this.installedSilamLocations = Array.from(
          new Map(
            Object.values(t.states).filter((f) => {
              if (!f || typeof f != "object" || typeof f.entity_id != "string" || !f.entity_id.startsWith("sensor.silam_pollen_"))
                return !1;
              const O = f.entity_id.match(
                /^sensor\.silam_pollen_(.*)_([^_]+)$/
              );
              if (!O) return !1;
              const F = O[2] ?? "";
              return b.has(F);
            }).map((f) => {
              var J, ae;
              const O = f.entity_id.match(
                /^sensor\.silam_pollen_(.*)_([^_]+)$/
              ), F = O ? (O[1] ?? "").replace(/^[-\s]+/, "") : "", Y = _e(F);
              let Q = ((J = f.attributes) == null ? void 0 : J.location_title) || (typeof ((ae = f.attributes) == null ? void 0 : ae.friendly_name) == "string" ? f.attributes.friendly_name.replace(/^SILAM Pollen\s*-?\s*/i, "").replace(new RegExp("\\s+\\p{L}+$", "u"), "").trim() : "") || F;
              return Q = Q.replace(/^[-\s]+/, ""), Q = Q.charAt(0).toUpperCase() + Q.slice(1), [Y, Q];
            })
          )
        );
      }
      this.installedKleenexLocations = Se(d), this.installedKleenexLocations.length || (this.installedKleenexLocations = Array.from(
        new Map(
          Object.values(t.states).filter(
            (M) => M && typeof M == "object" && typeof M.entity_id == "string" && M.entity_id.startsWith("sensor.kleenex_pollen_radar_")
          ).map((M) => {
            var F;
            const b = M.entity_id.match(
              /^sensor\.kleenex_pollen_radar_(.*)_(?:tree|bomen|arbre|alber|grass|gras|graminee|graminace|weed|kruid|onkruid|herbacee|erbace)/
            );
            if (!b) return null;
            const f = b[1] ?? "";
            let O = ((F = M.attributes) == null ? void 0 : F.friendly_name) || f;
            return O = O.replace(/^Kleenex Pollen Radar\s*[(-]?\s*/i, "").replace(/[)\s]+(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee).*$/i, "").replace(/^(?:Trees|Grass|Weeds|Bomen|Gras|Kruiden|Onkruid|Arbres|Gramin[eé]+s?|Herbac[eé]+s?|Alberi|Graminacee|Erbacee)(?:\s.*)?$/i, "").trim(), O || (O = f.charAt(0).toUpperCase() + f.slice(1)), [f, O];
          }).filter((M) => M !== null)
        )
      ));
      const K = (I = this._config) == null ? void 0 : I.location;
      if (K && K !== "manual" && !d.locations.has(K)) {
        const M = Le("kleenex"), b = ((D = M == null ? void 0 : M.resolveLocation) == null ? void 0 : D.call(
          M,
          t,
          d,
          K
        )) ?? null, f = b === "ambiguous" ? null : b;
        if (f) {
          const O = [
            K,
            f[1].label
          ], F = this.installedKleenexLocations.findIndex(
            ([Y]) => Y === f[0]
          );
          F >= 0 ? this.installedKleenexLocations[F] = O : this.installedKleenexLocations.push(O);
        }
      }
      this.installedAtmoLocations = Se(n);
      const V = (z = this._config) == null ? void 0 : z.location;
      if (V && V !== "manual" && !n.locations.has(V)) {
        const M = Wr(
          n,
          V
        );
        if (M) {
          const b = n.locations.get(M).label;
          this.installedAtmoLocations.push([V, b]);
        }
      }
      this._initDone || (y === "dwd" && !this._userConfig.region_id && this.installedDwdLocations.length && (this._config.region_id = this.installedDwdLocations[0][0]), y === "pp" && !this._userConfig.city && this.installedPpLocations.length && (this._config.city = this.installedPpLocations[0][0]), y === "silam" && !this._userConfig.location && this.installedSilamLocations.length && (this._config.location = this.installedSilamLocations[0][0]), y === "kleenex" && !this._userConfig.location && this.installedKleenexLocations.length && (this._config.location = this.installedKleenexLocations[0][0]), y === "atmo" && !this._userConfig.location && this.installedAtmoLocations.length && (this._config.location = this.installedAtmoLocations[0][0]), y === "gpl" && !this._userConfig.location && this.installedGplLocations.length && (this._config.location = this.installedGplLocations[0][0]), y === "gp" && !this._userConfig.location && ((S = this.installedGpLocations) != null && S.length) && (this._config.location = this.installedGpLocations[0][0]), y === "msw" && !this._userConfig.location && ((T = this.installedMswLocations) != null && T.length) && (this._config.location = this.installedMswLocations[0][0]), y === "irmkmi" && !this._userConfig.location && ((E = this.installedIrmkmiLocations) != null && E.length) && (this._config.location = this.installedIrmkmiLocations[0][0])), this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._config },
          bubbles: !0,
          composed: !0
        })
      );
    }
    this.requestUpdate(), this._initDone = !0;
  }
  render() {
    const t = this._editorConfig();
    return this.debug && (console.debug("[Editor] Current language (lang):", this._lang), console.debug("Sort label test:", this._t("sort_value_ascending"))), A`
      <div class="card-config">
        <!-- Reset button -->
        ${this._renderTextButton({
      label: this._t("preset_reset_all"),
      onClick: () => this._resetAll()
    })}

        <!-- §1 Integration & Location -->
        ${this._renderIntegrationSection()}

        <!-- §2 Allergens -->
        ${this._renderAllergensSection()}

        <!-- §3 Card layout (open by default) -->
        <details open>
          <summary>
            ${this._t("summary_card_layout")}
            ${this._renderSectionReset([
      "minimal",
      "minimal_gap",
      "allergens_abbreviated",
      "show_allergen_column",
      "show_text_allergen"
    ])}
          </summary>
          <div class="section-helper">${this._t("helper_card_layout")}</div>
          <ha-formfield label="${this._t("minimal")}">
            <ha-switch
              .checked=${t.minimal}
              @change=${(r) => this._updateConfig("minimal", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <div class="field-helper">${this._t("helper_minimal")}</div>
          ${t.minimal === !0 ? A`
                <ha-formfield label="${this._t("minimal_gap")}">
                  <ha-slider
                    min="0"
                    max="100"
                    step="1"
                    .value=${t.minimal_gap ?? 35}
                    @input=${(r) => this._updateConfig("minimal_gap", Number(r.target.value))}
                    style="width: 120px;"
                  ></ha-slider>
                  ${this._renderNumberField({
      value: t.minimal_gap ?? 35,
      min: 0,
      max: 100,
      step: 1,
      onValue: (r) => this._updateConfig("minimal_gap", r)
    })}
                </ha-formfield>
                <div class="field-helper">${this._t("helper_minimal_gap")}</div>
              ` : ""}
          <ha-formfield
            label="${this._t("show_allergen_column")}"
          >
            <ha-checkbox
              .checked=${t.show_allergen_column !== !1}
              @change=${(r) => this._updateConfig(
      "show_allergen_column",
      r.target.checked
    )}
            ></ha-checkbox>
          </ha-formfield>
          <div class="field-helper">${this._t("helper_show_allergen_column")}</div>
          <ha-formfield label="${this._t("show_text_allergen")}">
            <ha-switch
              .checked=${t.show_text_allergen}
              @change=${(r) => this._updateConfig("show_text_allergen", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("allergens_abbreviated")}">
            <ha-switch
              .checked=${t.allergens_abbreviated}
              @change=${(r) => this._updateConfig("allergens_abbreviated", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </details>

        <!-- §4 Day display -->
        <details>
          <summary>
            ${this._t("summary_day_display")}
            ${this._renderSectionReset([
      "days_to_show",
      "days_abbreviated",
      "days_boldfaced",
      "days_relative",
      "days_uppercase",
      "show_empty_days",
      "show_no_data_distinct",
      "show_value_numeric",
      "show_value_text"
    ])}
          </summary>
          <div class="section-helper">${this._t("helper_day_display")}</div>

          <div class="subgroup-header">${this._t("subgroup_values")}</div>
          <ha-formfield label="${this._t("show_value_text")}">
            <ha-switch
              .checked=${t.show_value_text}
              @change=${(r) => this._updateConfig("show_value_text", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("show_value_numeric")}">
            <ha-switch
              .checked=${t.show_value_numeric}
              @change=${(r) => this._updateConfig("show_value_numeric", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("show_empty_days")}">
            <ha-switch
              .checked=${t.show_empty_days}
              @change=${(r) => this._updateConfig("show_empty_days", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("show_no_data_distinct")}">
            <ha-switch
              .checked=${t.show_no_data_distinct !== !1}
              @change=${(r) => this._updateConfig("show_no_data_distinct", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <!-- The level/raw numeric toggle (numeric_value_raw) lives in the
               shared Level circles section now, gated to integrations with a
               raw value (PLU/PEU/SILAM/Kleenex). PEU's legacy
               numeric_state_raw_risk config still works via resolveNumericValue. -->

          <div class="subgroup-header">${this._t("subgroup_day_labels")}</div>
          <ha-formfield label="${this._t("days_relative")}">
            <ha-switch
              .checked=${t.days_relative}
              @change=${(r) => this._updateConfig("days_relative", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("days_abbreviated")}">
            <ha-switch
              .checked=${t.days_abbreviated}
              @change=${(r) => this._updateConfig("days_abbreviated", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("days_uppercase")}">
            <ha-switch
              .checked=${t.days_uppercase}
              @change=${(r) => this._updateConfig("days_uppercase", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <ha-formfield label="${this._t("days_boldfaced")}">
            <ha-switch
              .checked=${t.days_boldfaced}
              @change=${(r) => this._updateConfig("days_boldfaced", r.target.checked)}
            ></ha-switch>
          </ha-formfield>
          <div class="slider-row">
            <div class="slider-text">
              ${(t.integration === "silam" || t.integration === "peu") && t.mode === "twice_daily" ? this._t("to_show_columns") : (t.integration === "silam" || t.integration === "peu") && t.mode !== "daily" ? this._t("to_show_hours") : this._t("to_show_days")}
            </div>
            <div class="slider-value">${Ft(t.days_to_show, this._hass)}</div>
            <ha-slider
              min="0"
              max="${(t.integration === "silam" || t.integration === "peu") && t.mode !== "daily" ? 8 : 6}"
              step="1"
              .value=${t.days_to_show}
              @input=${(r) => this._updateConfig("days_to_show", Number(r.target.value))}
            ></ha-slider>
          </div>
        </details>

        <!-- §5 Card appearance -->
        ${this._renderAppearanceSection()}

        <!-- §6 Allergen icons -->
        ${this._renderAllergenIconsSection()}
        <!-- §7 Level circles -->
        ${this._renderLevelCirclesSection()}
        <!-- §8 Icon in ring -->
        ${this._renderIconInRingSection()}

        ${this._renderPhrasesSection()}

        <!-- §10 Interactions -->
        ${this._renderInteractionSection()}

        <!-- §11 Advanced -->
        ${this._renderAdvancedSection()}
      </div>
    `;
  }
  static get styles() {
    return Xe`
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

      /* Per-section ↺ reset button styles (shared with the badge editor). */
      ${hn}

      /* Own form controls (input/button) replacing HA's removed components. */
      ${gn}

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

      /* Section helper text below summary */
      .section-helper {
        font-size: 12px;
        color: var(--secondary-text-color);
        padding: 0 0 8px;
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Google attribution row under the integration picker (#338); box model
         matches .section-helper, typography comes from the shared fragment. */
      .google-attribution {
        ${Xo}
        padding: 0 0 8px;
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Inline caveat under a field whose current value cannot take effect. */
      .field-warning {
        font-size: 12px;
        color: var(--warning-color, #ff9800);
        padding: 0 0 8px;
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Subgroup header (uppercase divider inside a section) */
      .subgroup-header {
        text-transform: uppercase;
        font-size: 11px;
        font-weight: 600;
        color: var(--secondary-text-color);
        padding-top: 10px;
        border-top: 1px dashed var(--divider-color, #ccc);
        margin-top: 8px;
        margin-bottom: 4px;
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Inline helper text below a specific field */
      .field-helper {
        font-size: 11px;
        color: var(--secondary-text-color);
        padding: 2px 0 6px;
        margin-left: 24px;
        margin-right: 24px;
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
      /* Numeric input box sizing lives in editorControlStyles (.pp-input.num-field). */
    `;
  }
}
customElements.define("pollenprognos-card-editor", fu);
const vu = [
  "allergen",
  "level",
  "allergen_level"
];
function No(e) {
  return typeof e == "string" && vu.includes(e) ? e : "allergen";
}
function yu(e, t = "allergen") {
  var a, i;
  if (!e) return "";
  const r = e.allergenShort ?? e.allergenCapitalized ?? "", o = ((i = (a = e.days) == null ? void 0 : a[0]) == null ? void 0 : i.state_text) ?? "";
  return t === "level" ? o : t === "allergen_level" ? r && o ? `${r}: ${o}` : r || o : r;
}
class bu extends cn(lt) {
  constructor() {
    super(...arguments), this._hass = null, this._userConfig = null, this.sensors = [], this._versionLogged = !1, this._noPollen = !1, this._noData = !1, this._integrationExplicit = !1;
  }
  // ---------------------------------------------------------------------- //
  // Lit reactive properties                                                  //
  // ---------------------------------------------------------------------- //
  static get properties() {
    return {
      hass: { state: !0 },
      config: {},
      sensors: { state: !0 },
      _error: { type: String, state: !0 },
      _isLoaded: { type: Boolean, state: !0 },
      _noPollen: { state: !0 },
      _noData: { state: !0 }
    };
  }
  // ---------------------------------------------------------------------- //
  // Helpers                                                                  //
  // ---------------------------------------------------------------------- //
  // The mixin declares `debug` as a (declare) property so it can read it; the
  // concrete badge implements it as a computed getter. TS flags the
  // property→accessor shape mismatch (TS2611), which is inherent to this split
  // and cannot be resolved without changing the mixin. Suppress the single
  // shape error; the runtime contract (mixin reads this.debug) is unchanged.
  // @ts-expect-error property-in-base vs accessor-in-derived (see above)
  get debug() {
    return !!(this.config && this.config.debug);
  }
  get _lang() {
    var t;
    return Oe(
      this._hass,
      (t = this.config) == null ? void 0 : t.date_locale
    );
  }
  _t(t, r = {}) {
    return pe(t, this._lang, r);
  }
  // _noDataDotColor() is inherited from LevelCircleMixin; no override needed.
  // ---------------------------------------------------------------------- //
  // HA card protocol                                                         //
  // ---------------------------------------------------------------------- //
  static async getConfigElement() {
    return await customElements.whenDefined("pollenprognos-badge-editor"), document.createElement("pollenprognos-badge-editor");
  }
  /**
   * Default stub config surfaced in the HA badge picker.
   * No `type` key — HA badge convention differs from card convention.
   *
   * When HA provides hass and an integration is detected, pin it so a freshly
   * added badge shows real data. When hass is absent (the documented no-arg
   * badge stub call) OR nothing is detected, OMIT `integration`: both the badge
   * element and editor treat a present `integration` as a user pin via
   * hasOwnProperty, so emitting a "pp" fallback here would wrongly suppress
   * autodetect on a DWD/PEU-only install. Without it, autodetect runs once hass
   * is available.
   */
  static getStubConfig(t, r, o) {
    const a = { badge_content: "worst", icon_in_ring: !0 };
    if (t) {
      const i = Ct(ht(t), {
        explicit: !1
      });
      if (i) return { integration: i, ...a };
    }
    return a;
  }
  // ---------------------------------------------------------------------- //
  // setConfig                                                                //
  // ---------------------------------------------------------------------- //
  setConfig(t) {
    this._userConfig = { ...t }, this._integrationExplicit = Object.prototype.hasOwnProperty.call(
      t,
      "integration"
    ), this.config = this._buildConfig(t, this._hass), !this._versionLogged && this.config.show_version !== !1 && (console.info(
      "%c🤧 Pollenprognos Badge: version v4.2.0",
      "background:#f0e68c;color:#000;padding:2px 4px;border-radius:2px;"
    ), this._versionLogged = !0), this._hass && this._fetchSensors(this._hass);
  }
  /**
   * Build the badge's effective config from a raw user config and (optionally)
   * hass. When the integration is not explicit and hass is available, the
   * integration and its first location are autodetected (shared with the card
   * via src/utils/autodetect.js). Stub defaults fill in the rest; badge_visual
   * drives the engine flags. Pure aside from reading hass.
   *
   * @param {object} config  raw user config
   * @param {object|null} hass
   * @returns {object}
   */
  _buildConfig(t, r) {
    const o = Object.prototype.hasOwnProperty.call(
      t,
      "integration"
    );
    let a = an(t.integration), i = null;
    !o && r && (i = ht(r), a = Ct(i, { explicit: !1 }) || a);
    const l = ce(a) || ce("pp");
    a || (a = l.integration);
    const n = typeof t.badge_content == "string" ? t.badge_content : "worst", s = typeof t.badge_single_allergen == "string" ? t.badge_single_allergen : void 0, d = Ge(t.badge_show_label), c = ["icon_in_ring", "ring_value", "ring_empty", "icon_only"].includes(t.badge_visual) ? t.badge_visual : "icon_in_ring", u = 10, h = Number(t.badge_scale), p = Number.isFinite(h) && h > 0 ? Math.min(h, u) : 1, w = Number(t.badge_icon_scale), y = Number.isFinite(w) && w > 0 ? Math.min(w, u) : 1, x = t.badge_label_position === "below" ? "below" : "right", k = No(
      t.badge_label_content
    ), v = t.tap_action && typeof t.tap_action == "object" && !Array.isArray(t.tap_action) ? t.tap_action : void 0, g = t.link_to_sensors === "true" ? !0 : t.link_to_sensors === "false" ? !1 : t.link_to_sensors, $ = Object.prototype.hasOwnProperty.call(
      t,
      "show_google_attribution"
    ), j = !(t.show_google_attribution === !1 || t.show_google_attribution === "false"), P = c === "icon_in_ring", L = c === "ring_value", I = P || L, D = t.levels_thickness != null ? t.levels_thickness : I ? zr : bo, z = t.levels_text_size != null ? t.levels_text_size : L ? 0.3 : U.levels_text_size, S = {
      ...l,
      // badge_content / badge_show_label previously also appeared as literal
      // defaults before `...config`; those were dead (last-wins identical) since
      // the coerced badgeContent / badgeShowLabel below always override them, and
      // duplicate literal keys are a TS error. Dropped the pre-spread copies.
      ...t,
      integration: a,
      // Re-apply coerced fields after spread so they override raw values.
      badge_content: n,
      badge_show_label: d,
      badge_visual: c,
      badge_scale: p,
      badge_icon_scale: y,
      badge_label_position: x,
      badge_label_content: k,
      icon_in_ring: P,
      show_value_numeric_in_circle: L,
      levels_thickness: D,
      levels_text_size: z,
      // Type-guarded above; override the raw spread so a bad scalar becomes
      // undefined and the runtime click guard simply skips it.
      tap_action: v,
      // Coerced above; overrides the raw spread so a "false" string is a real
      // boolean at the iconMoreInfoEnabled call site.
      link_to_sensors: g,
      ...s !== void 0 ? { badge_single_allergen: s } : {},
      // Coerced above; overrides the raw spread so the render gate compares a
      // real boolean. Written only when the user set the key, so the stub
      // default keeps speaking for everyone else.
      ...$ ? { show_google_attribution: j } : {},
      // A badge shows today's value only and has no forecast-event
      // subscription, so non-daily SILAM/PEU modes would fetch an empty
      // forecast and render an empty pill. Force daily regardless of any
      // mode the user may have hand-written in YAML.
      mode: "daily"
    };
    if (!o && r && i) {
      const T = Xr(
        a,
        S,
        r,
        i
      );
      T && S[T.key] !== "manual" && !S[T.key] && (S[T.key] = T.value);
    }
    return ms(
      S,
      l.allergens
    );
  }
  // ---------------------------------------------------------------------- //
  // hass setter                                                              //
  // ---------------------------------------------------------------------- //
  set hass(t) {
    if (this._hass !== t) {
      if (this._hass = t, this._userConfig && !this._integrationExplicit) {
        const r = this._buildConfig(this._userConfig, t);
        be(this.config, r) || (this.config = r);
      }
      this._fetchSensors(t);
    }
  }
  get hass() {
    return this._hass;
  }
  /**
   * Fetch sensors from the adapter and populate this.sensors. Mirrors the
   * non-silam fetch path of PollenPrognosCard. Silam forecast-event
   * subscriptions are not implemented in the badge MVP; fetchForecast is
   * called without a forecastEvent which makes the adapter fall back to
   * entity.attributes.forecast (daily-mode silam still works).
   *
   * @param {object} hass
   */
  _fetchSensors(t) {
    const r = this.config;
    if (!r) return;
    const o = it(r.integration) || it("pp"), a = this._fetchSeq = (this._fetchSeq || 0) + 1;
    o.fetchForecast(t, r).then(async (i) => {
      const l = Eo(r, t, this.debug), n = r.integration === "silam" && (!r.mode || r.mode === "daily"), s = So(
        i,
        r,
        l,
        n ? Object.keys(t.states) : [],
        n ? Je.mapping : {}
      ), d = s.length === 0 && l.length > 0, _ = d ? await wo(o, t, r) : !1;
      a === this._fetchSeq && (this.sensors = s, this._isLoaded = !0, this._noPollen = d && _, this._noData = d && !_, this._error = s.length === 0 && l.length === 0 ? "card.error_no_sensors" : null, this.requestUpdate());
    }).catch((i) => {
      a === this._fetchSeq && (console.error("[Badge] fetch error:", i), this._isLoaded = !0, this.sensors = [], this._noPollen = !1, this._noData = !1, this._error = "card.error_entity_unavailable", this.requestUpdate());
    });
  }
  // ---------------------------------------------------------------------- //
  // Render                                                                   //
  // ---------------------------------------------------------------------- //
  /**
   * Resolve the badge's pill HEIGHT in px, following the native HA badge size
   * convention (--ha-badge-size, 36px) multiplied by badge_scale. The ring and
   * bare icon are derived from this height (see ring math in render), so the
   * whole pill scales as a unit and a default badge matches a stock HA badge.
   * setConfig always normalises badge_scale to a positive number, so this is a
   * single deterministic path.
   *
   * @returns {number}
   */
  _badgeBaseSize() {
    var o;
    const r = Number((o = this.config) == null ? void 0 : o.badge_scale) || 1;
    return Math.round(36 * r);
  }
  /**
   * Google attribution logo for the badge (issue #338). The Google Pollen API
   * attribution policy wants the wordmark AND the source line always visible;
   * a badge pill has room for neither at a legible size, so by owner decision
   * the badge shows the square Google Maps pin and carries the full string as
   * a hover title. Both the pin and the tooltip are deliberate deviations from
   * the policy and apply to the badge format only — the card footer and the
   * editor still render the wordmark and the source line verbatim.
   *
   * Returns an empty string for every non-Google integration so their badge
   * markup is byte-identical to before.
   */
  _renderGoogleAttribution() {
    var o, a;
    const t = (o = this.config) == null ? void 0 : o.integration;
    if (t !== "gpl" && t !== "gp" || ((a = this.config) == null ? void 0 : a.show_google_attribution) === !1)
      return "";
    const r = `${Oo} — ${Bo}`;
    return A`<div class="ppb-attribution" title="${r}">
      ${kr(M_)}
    </div>`;
  }
  render() {
    var x, k, v, g, $, j, P, L;
    const t = this._badgeBaseSize(), r = Math.round(t * 0.78), o = Number((x = this.config) == null ? void 0 : x.badge_icon_scale) || 1, a = Math.min(Math.round(r * o), t), i = (g = (v = (k = this.config) == null ? void 0 : k.background_color) == null ? void 0 : v.trim) == null ? void 0 : g.call(v), l = `--ppb-size: ${t}px; --pollen-icon-size: ${a}px;` + (i ? ` --ppb-bg: ${i};` : ""), n = (($ = this.config) == null ? void 0 : $.badge_label_position) === "below" ? "ppb--below" : "ppb--right", s = this._renderGoogleAttribution(), d = s === "" ? "" : " ppb--attribution";
    if (!this._isLoaded)
      return A`<div class="ppb ${n}" style="${l}">
        <div class="ppb-empty"></div>
      </div>`;
    const _ = ps(this.sensors, this.config);
    if (!_.length)
      return this._noData ? A`<div class="ppb ${n}" style="${l}">
          <div class="ppb-item">
            ${this._renderAllergenSvg("no_allergens", -1, {})}
          </div>
        </div>` : this._noPollen ? A`<div
          class="ppb ${n}${d}"
          style="${l}"
        >
          <div class="ppb-item">
            ${this._renderAllergenSvg("no_allergens", 0, {})}
          </div>
          ${s}
        </div>` : A`<div class="ppb ${n}" style="${l}">
        <div class="ppb-empty"></div>
      </div>`;
    const c = this._buildLevelRingConfig(), u = Number((j = this.config) == null ? void 0 : j.icon_in_ring_size_ratio) || U.icon_in_ring_size_ratio, h = ((P = this.config) == null ? void 0 : P.badge_visual) || "icon_in_ring", p = this.config.badge_show_label === !0, w = this.config.badge_label_content, y = Kt((L = this.config) == null ? void 0 : L.tap_action) !== null;
    return A`
      <div
        class="ppb ${n}${d}"
        style="${l}${y ? " cursor: pointer;" : ""}"
        @click=${y ? this._handleTapAction : null}
      >
        ${_.map((I) => {
      var K, V;
      const D = fi((K = I.days) == null ? void 0 : K[0]), z = xo(
        this.config.integration,
        D
      ), S = this._getSvgKey(I.allergenReplaced), T = yr((V = I.days) == null ? void 0 : V[0], this.config) ?? z, E = T != null && T >= 0 ? T : z, C = To(this.config.link_to_sensors, y) && !!I.entity_id, N = this._renderBadgeVisual(h, I, {
        ringConfig: c,
        base: a,
        ringIconRatio: u,
        ringLevel: z,
        svgKey: S,
        displayLevel: E,
        clickable: C
      }), H = yu(I, w);
      return A`
            <div class="ppb-item">
              ${N}
              ${p && H ? A`<span class="ppb-label"> ${H} </span>` : ""}
            </div>
          `;
    })}
        ${s}
      </div>
    `;
  }
  /**
   * Build the centre visual for one sensor according to badge_visual:
   *   icon_in_ring — level ring with the allergen icon centred (default)
   *   ring_value   — level ring with the numeric value centred
   *   ring_empty   — level ring with nothing centred
   *   icon_only    — bare allergen symbol, no ring
   *
   * All four reuse the shared LevelCircleMixin (no duplicated rendering). The
   * mixin renders the numeric overlay only when show_value_numeric_in_circle is
   * on AND no icon occupies the hole — setConfig already set those engine flags
   * from badge_visual, so here we only choose iconKey and which call to make.
   *
   * @param {string} mode
   * @param {object} sensor
   * @param {object} ctx
   * @returns {import("lit").TemplateResult}
   */
  _renderBadgeVisual(t, r, o) {
    const {
      ringConfig: a,
      base: i,
      ringIconRatio: l,
      ringLevel: n,
      svgKey: s,
      displayLevel: d,
      clickable: _
    } = o;
    if (t === "icon_only") {
      const u = (h) => {
        _ && (h.stopPropagation(), this._openEntity(r.entity_id));
      };
      return this._renderAllergenSvg(
        this._getEffectiveSvgKey(s, n),
        n,
        { clickable: _, onClick: u, stale: r.stale }
      );
    }
    const c = t === "icon_in_ring" ? this._getEffectiveSvgKey(s, n) : "";
    return this._renderLevelCircle(
      n,
      {
        ...a,
        size: i,
        iconKey: c,
        iconColor: c ? this._iconInRingColor(n, r.allergenReplaced, {
          stale: r.stale
        }) : "",
        iconSizeRatio: l
      },
      r.allergenReplaced,
      0,
      d,
      r.entity_id,
      _
    );
  }
  // ---------------------------------------------------------------------- //
  // Styles                                                                   //
  // ---------------------------------------------------------------------- //
  static get styles() {
    return Xe`
      ${_n}
      :host {
        display: inline-flex;
        align-items: center;
      }

      /* The pill follows the native Home Assistant badge box so badges drop in
         alongside stock ones: fixed height + min-width = --ppb-size (the HA
         badge height, 36px at scale 1), horizontal padding 12px and inner gap
         8px at that size, radius = half the height (pill). Everything is
         proportional to --ppb-size so badge_scale grows the whole box, padding
         and gap included, exactly like resizing a native badge. */
      .ppb {
        --ppb-size: var(--ha-badge-size, 36px);
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: var(--ppb-size);
        min-width: var(--ppb-size);
        /* 12/36 ≈ 0.333 horizontal padding, matching native "0 12px". */
        padding: 0 calc(var(--ppb-size) * 0.333);
        /* 8/36 ≈ 0.222 inner gap, matching native --ha-space-2 (8px). */
        gap: calc(var(--ppb-size) * 0.222);
        border-radius: var(--ha-badge-border-radius, calc(var(--ppb-size) / 2));
        /* --ppb-bg is set inline only when the user configures
           background_color; otherwise fall back to the themed badge/card
           background so a default badge matches native ones. */
        background: var(
          --ppb-bg,
          var(--ha-card-background, var(--card-background-color, #fff))
        );
        border: var(--ha-card-border-width, 1px) solid
          var(--ha-card-border-color, var(--divider-color));
        box-shadow: var(--ha-card-box-shadow, none);
      }

      /* "below" stacks the label under the visual, so the pill can't keep the
         native fixed height — let it grow and add a little vertical padding. */
      .ppb--below {
        height: auto;
        padding: calc(var(--ppb-size) * 0.12) calc(var(--ppb-size) * 0.222);
      }

      /* Each item lays its visual and label out per badge_label_position:
         "right" (community convention, default) = icon left, label right;
         "below" = label stacked under the visual. */
      .ppb-item {
        display: flex;
        align-items: center;
        gap: calc(var(--ppb-size) * 0.18);
      }
      .ppb--right .ppb-item {
        flex-direction: row;
      }
      .ppb--below .ppb-item {
        flex-direction: column;
        gap: calc(var(--ppb-size) * 0.06);
      }
      /* Several items (row content mode) sit side by side with a clear gap. */
      .ppb--right .ppb-item + .ppb-item,
      .ppb--below .ppb-item + .ppb-item {
        margin-left: calc(var(--ppb-size) * 0.18);
      }

      .ppb-label {
        font-size: calc(var(--ppb-size) * 0.34);
        line-height: 1.1;
        color: var(--primary-text-color);
        white-space: nowrap;
      }

      /* Google attribution pin (#338), Google-backed integrations only.
         The pill is a rounded capsule, so its bottom-right corner of the border
         box is transparent: anchoring the pin there left half of it outside the
         pill and on top of the label. The inset pulls the pin inside the corner
         radius, and the reserved padding on that side keeps the content (label
         included) out of its footprint in both label positions. This does widen
         the pill, deliberately and only for the two Google integrations; every
         other badge keeps its native geometry down to the pixel. */
      .ppb--attribution {
        position: relative;
        /* Height of the visible pin: the policy's 16dp minimum at badge_scale 1,
           held there for bigger badges so the pin never dominates the pill, and
           shrinking proportionally below. */
        --ppb-attr-glyph: min(16px, calc(var(--ppb-size) * 0.45));
        /* The asset's square 192x192 viewBox carries a symmetric transparent
           margin around a 176-tall glyph, so the box has to be scaled up for the
           glyph itself to reach --ppb-attr-glyph. Scaling the box here keeps the
           asset file byte-identical to Google's. */
        --ppb-attr-box: calc(var(--ppb-attr-glyph) * 192 / 176);
        /* The pin is centred on the pill's axis, where the capsule is at its
           widest, so this inset only has to clear the curve beside the pin's
           own corners -- 2.3px at scale 1 -- plus a visual margin. */
        --ppb-attr-inset: calc(var(--ppb-size) * 0.1);
        padding-right: calc(
          var(--ppb-attr-inset) + var(--ppb-attr-box) + var(--ppb-size) * 0.06
        );
      }

      /* Centred on the pill's vertical axis: the glyph sits symmetrically in the
         viewBox, so centring the box centres what the eye sees. */
      .ppb-attribution {
        position: absolute;
        right: var(--ppb-attr-inset);
        top: 50%;
        transform: translateY(-50%);
        line-height: 0;
      }

      /* The pin is square and full colour: never restyle the fills (it reads on
         light and dark alike) and never set width and height independently. */
      .ppb-attribution svg {
        display: block;
        height: var(--ppb-attr-box);
        width: auto;
      }

      .ppb-empty {
        width: calc(var(--ppb-size) * 0.78);
        height: calc(var(--ppb-size) * 0.78);
        border-radius: 50%;
        background: var(--divider-color, rgba(0, 0, 0, 0.12));
        opacity: 0.4;
      }

      /*
       * .ring-icon, .ring-icon svg, .level-value-text and the no-data icon
       * rules live in the shared ringIconStyles fragment (spliced above), so
       * they stay byte-identical to the card; the ring markup rendered by
       * the mixin's declarative template is covered by the fragment. The rules below are badge-specific and
       * intentionally differ from the card.
       */

      /* Badge ring wrapper: no card-style sizing/margin (the badge sizes the
         ring inline via badge_scale and spaces items with .ppb-item flex gap). */
      .level-circle {
        line-height: 0;
      }

      /*
       * .pp-icon / .pp-icon-error are required by _renderAllergenSvg (inherited
       * from LevelCircleMixin) for the icon_only badge_visual mode. They differ
       * from the card by one intentional deviation: margin is 0 (not
       * "0 auto 6px auto") because the badge controls spacing via its .ppb-item
       * flex gap. The shared .pp-icon svg / svg g / no-data rules come from the
       * ringIconStyles fragment.
       */

      .pp-icon {
        display: block;
        width: var(--pollen-icon-size, 48px);
        height: var(--pollen-icon-size, 48px);
        max-width: var(--pollen-icon-size, 48px);
        max-height: var(--pollen-icon-size, 48px);
        min-width: 0;
        min-height: 0;
        margin: 0;
        color: var(--pp-icon-color, var(--primary-text-color));
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
        margin: 0;
      }
    `;
  }
}
customElements.get("pollenprognos-badge") || customElements.define("pollenprognos-badge", bu);
class ea extends pn {
  constructor() {
    super(...arguments), this.setConfig = (t) => {
      let r = t.integration;
      r && typeof r == "string" && (r = r.trim().toLowerCase());
      const o = ce(typeof r == "string" ? r : void 0) || ce("pp");
      r || (r = o == null ? void 0 : o.integration);
      const a = typeof t.badge_content == "string" ? t.badge_content : "worst", i = typeof t.badge_single_allergen == "string" ? t.badge_single_allergen : void 0, l = Ge(t.badge_show_label), n = typeof t.badge_visual == "string" ? t.badge_visual : void 0, s = typeof t.badge_scale == "number" ? t.badge_scale : void 0, d = typeof t.badge_label_position == "string" ? t.badge_label_position : void 0, _ = typeof t.badge_label_content == "string" ? t.badge_label_content : void 0;
      this._config = {
        ...o,
        icon_in_ring: !0,
        ...t,
        integration: r,
        badge_content: a,
        badge_show_label: l,
        ...i !== void 0 ? { badge_single_allergen: i } : {},
        ...n !== void 0 ? { badge_visual: n } : {},
        ...s !== void 0 ? { badge_scale: s } : {},
        ...d !== void 0 ? { badge_label_position: d } : {},
        ..._ !== void 0 ? { badge_label_content: _ } : {}
      }, this._userConfig = { ...t }, this._initInteractionState(), this._hass && this._runAutodetect(), this._autofillDateLocale();
    }, this._updateConfig = (t, r) => {
      if (!this._config) return;
      if (t === "integration" && r !== this._config.integration) {
        const l = [
          "city",
          "region_id",
          "location",
          "entity_prefix",
          "entity_suffix",
          "entity_weather",
          "mode",
          "allergens",
          "badge_single_allergen",
          // Threshold ranges are integration-specific (DWD 0-3, PP 0-6, ...), so
          // a stale high threshold can suppress every allergen on the new
          // integration and render an empty badge. Pin-to-top flags are likewise
          // integration-specific. Clear them too, matching the card editor.
          "pollen_threshold",
          "allergy_risk_top",
          "index_top",
          // The Google attribution only exists for gpl/gp (#338): keeping the key
          // would write a Google-only option into a pp badge's YAML, and a
          // lingering false would silently suppress the pin on switching back.
          "show_google_attribution"
        ];
        this._userConfig = this._userConfig || {};
        for (const s of l) delete this._userConfig[s];
        this._userConfig.integration = r;
        const n = ce(r) || ce("pp");
        if (this._config = Ze(
          n ?? {},
          this._userConfig
        ), this._config.badge_content === "single") {
          const s = this._currentAllergens()[0];
          s && (this._userConfig.badge_single_allergen = s, this._config = Ze(this._config, {
            badge_single_allergen: s
          }));
        }
        this.dispatchEvent(
          new CustomEvent("config-changed", {
            detail: { config: this._userConfig },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      }
      const o = this._config, a = this._applyVisualConfigSideEffects(t, r, {
        ...o
      });
      a.thicknessAutoShifted !== null && (this._thicknessAutoShifted = a.thicknessAutoShifted);
      const i = a.handled ? a.config : Ze(o, { [t]: r });
      this._userConfig = this._userConfig || {};
      for (const l of Object.keys(i))
        be(i[l], o[l]) || (this._userConfig[l] = i[l]);
      this._userConfig[t] = r, this._config = i, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: this._userConfig },
          bubbles: !0,
          composed: !0
        })
      );
    }, this._onAllergenToggle = (t, r) => {
      var a;
      const o = new Set(((a = this._config) == null ? void 0 : a.allergens) || []);
      r ? o.add(t) : o.delete(t), this._updateConfig("allergens", [...o]);
    }, this._toggleSelectAllAllergens = (t) => {
      var a;
      const r = new Set(((a = this._config) == null ? void 0 : a.allergens) || []), o = t.every((i) => r.has(i));
      this._updateConfig("allergens", o ? [] : [...t]);
    }, this._toggleAllergenSubset = (t) => {
      var a;
      const r = new Set(((a = this._config) == null ? void 0 : a.allergens) || []);
      t.every((i) => r.has(i)) ? t.forEach((i) => r.delete(i)) : t.forEach((i) => r.add(i)), this._updateConfig("allergens", [...r]);
    };
  }
  // ------------------------------------------------------------------ //
  // Reactive properties                                                  //
  // ------------------------------------------------------------------ //
  static get properties() {
    return {
      _config: { type: Object },
      hass: { type: Object },
      _selectedPhraseLang: { state: !0 }
    };
  }
  // ------------------------------------------------------------------ //
  // hass setter                                                          //
  // ------------------------------------------------------------------ //
  /**
   * Store hass and run the same autodetection the card editor does, so the
   * integration dropdown marks installed integrations, the location dropdown
   * is populated, and a freshly added badge prefills the integration + first
   * location of whatever is actually installed (issue #235). Detection is
   * shared with the card via src/utils/autodetect.js.
   *
   * @param {object} hass
   */
  set hass(t) {
    const r = this._hass !== t;
    this._hass = t, this._config && r && this._runAutodetect(), this._autofillDateLocale(), this.requestUpdate();
  }
  get hass() {
    return this._hass;
  }
  /**
   * Run the shared autodetection: mark installed integrations for the dropdown
   * sort, populate the location dropdown lists, and prefill integration + first
   * location. Called from both set hass() and setConfig() because HA can set
   * either first; needs both _hass and _config.
   */
  _runAutodetect() {
    if (!this._hass || !this._config) return;
    const t = ht(this._hass);
    this._detectedIntegrations = nn(t), this._populateInstalledLocations(t, this._hass), this._maybeAutofill(t, this._hass);
  }
  // Integration -> the config key its location is stored under.
  static get _LOCATION_KEYS() {
    return { pp: "city", dwd: "region_id" };
  }
  _locationKeyFor(t) {
    return ea._LOCATION_KEYS[t ?? ""] || "location";
  }
  /**
   * Build the installed-location lists the shared integration section reads
   * (installedPpLocations, installedDwdLocations, ...). Discovery-first, with
   * per-integration entity-ID fallbacks; Kleenex additionally keeps the card
   * editor's legacy-slug compatibility entry, since badges saved before
   * registry discovery store the slug. Lists are [key, label] pairs; the
   * dropdown shows label, stores key.
   *
   * @param {ReturnType<typeof detectIntegrationStates>} detection
   * @param {object} hass
   */
  _populateInstalledLocations(t, r) {
    var d, _;
    const o = (c) => Array.from(c.locations.entries()).map(
      ([u, h]) => [u, h.label]
    ), a = t.getPpDiscovery();
    this.installedPpLocations = a.locations.size ? o(a) : Array.from(
      new Set(
        (t.states.pp ?? []).map((c) => Me(c)).filter(Boolean)
      )
    ).map((c) => [c, c]);
    const i = t.getDwdDiscovery();
    this.installedDwdLocations = i.locations.size ? o(i) : Array.from(
      new Set((t.states.dwd ?? []).map((c) => c.split("_").pop()))
    ).sort((c, u) => Number(c) - Number(u)).map((c) => [c, c]);
    const l = t.getPeuDiscovery();
    this.installedPeuLocations = l.locations.size ? o(l) : Array.from(
      new Set(
        (t.states.peu ?? []).map(
          (c) => {
            var u, h;
            return ((h = (u = r.states[c]) == null ? void 0 : u.attributes) == null ? void 0 : h.location_slug) || null;
          }
        ).filter(Boolean)
      )
    ).map((c) => [c, c]), this.installedSilamLocations = o(t.discovery.silam), this.installedAtmoLocations = o(t.discovery.atmo), this.installedGpLocations = o(t.discovery.gp), this.installedGplLocations = o(t.getGplDiscovery()), this.installedMswLocations = o(t.getMswDiscovery()), this.installedIrmkmiLocations = o(t.getIrmkmiDiscovery());
    const n = t.discovery.kleenex;
    this.installedKleenexLocations = n.locations.size ? o(n) : Array.from(
      new Set(
        t.stateIds.map((c) => {
          const u = typeof c == "string" && c.match(/^sensor\.kleenex_pollen_radar_(.+)_date$/);
          return u ? u[1] : null;
        }).filter(Boolean)
      )
    ).map((c) => [c, c]);
    const s = (d = this._config) == null ? void 0 : d.location;
    if (s && s !== "manual" && !n.locations.has(s)) {
      const c = Le("kleenex"), u = ((_ = c == null ? void 0 : c.resolveLocation) == null ? void 0 : _.call(
        c,
        r,
        n,
        s
      )) ?? null, h = u === "ambiguous" ? null : u;
      if (h) {
        const p = [
          s,
          h[1].label
        ], w = this.installedKleenexLocations.findIndex(
          ([y]) => y === h[0]
        );
        w >= 0 ? this.installedKleenexLocations[w] = p : this.installedKleenexLocations.push(p);
      }
    }
  }
  /**
   * Prefill the integration (when the user hasn't pinned one) and the first
   * available location for the active integration (when none is set and not in
   * manual mode), then dispatch config-changed once if anything changed. The
   * diff-before-dispatch guard prevents an HA update loop on every hass tick.
   *
   * @param {ReturnType<typeof detectIntegrationStates>} detection
   * @param {object} hass
   */
  _maybeAutofill(t, r) {
    const o = Object.prototype.hasOwnProperty.call(
      this._userConfig || {},
      "integration"
    ), a = { ...this._config };
    if (!o) {
      const s = Ct(t, { explicit: !1 });
      s && s !== a.integration && (a.integration = s);
    }
    const i = a.integration, l = this._locationKeyFor(i);
    if (!Object.prototype.hasOwnProperty.call(
      this._userConfig || {},
      l
    ) && a[l] !== "manual" && !a[l]) {
      const s = Xr(i, a, r, t);
      s && (a[s.key] = s.value);
    }
    be(this._config, a) || (this._config = a, this._userConfig = { ...this._userConfig }, o || (this._userConfig.integration = a.integration), a[l] != null && (this._userConfig[l] = a[l]), this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._userConfig },
        bubbles: !0,
        composed: !0
      })
    ));
  }
  // A badge has no ha-card chrome and shows today's value only, so the shared
  // Integration/Location section must not offer the card-only Title controls or
  // the forecast-mode selector (the badge element forces mode to "daily").
  _showTitleSection() {
    return !1;
  }
  _showModeSelector() {
    return !1;
  }
  // The numeric-value-in-circle switch is driven by badge_visual (ring_value)
  // on the badge, so the §7 toggle would be a false affordance — hide it.
  _showNumericInCircleToggle() {
    return !1;
  }
  // badge_visual (in the Badge content section) is the single source of truth
  // for whether the icon sits in the ring, so the §8 on/off checkbox would be
  // a false affordance here — hide it. The ring sub-fields (size ratio, colour)
  // remain available for tuning the icon_in_ring visual mode.
  _showIconInRingToggle() {
    return !1;
  }
  // The badge shows the allergen name only (no level text, no day columns), so
  // hide the level-name and day-label customization. The badge label uses
  // allergenShort, which equals the full name UNLESS allergens_abbreviated is
  // set; the badge editor has no abbreviated toggle, but a YAML config can set
  // it, in which case the short names DO show -- so expose the short-name fields
  // only when allergens_abbreviated is enabled.
  _showPhraseShort() {
    var t;
    return ((t = this._editorConfig()) == null ? void 0 : t.allergens_abbreviated) === !0;
  }
  // Level names are normally irrelevant to a badge, but badge_label_content
  // level/allergen_level put days[0].state_text straight into the label, so the
  // strings the badge shows would otherwise be uneditable. Gate on the label
  // being visible too: with badge_show_label off nothing renders the level
  // text, so the default badge editor surface is unchanged.
  _showPhraseLevels() {
    const t = this._editorConfig();
    if ((t == null ? void 0 : t.badge_show_label) !== !0) return !1;
    const r = No(t.badge_label_content);
    return r === "level" || r === "allergen_level";
  }
  _showPhraseDays() {
    return !1;
  }
  // ------------------------------------------------------------------ //
  // Badge content section (badge-editor only — not shared)              //
  // ------------------------------------------------------------------ //
  _renderBadgeContentSection() {
    const t = this._editorConfig(), r = this._currentAllergens();
    return A`
      <details open>
        <summary>
          ${this._t("summary_badge_content")}
          ${this._renderSectionReset([
      "badge_visual",
      "badge_content",
      "badge_single_allergen"
    ])}
        </summary>
        <div class="section-helper">${this._t("helper_badge_content")}</div>

        <!-- badge_visual: what kind of badge (the section header + helper say
             "Badge content / What the badge shows", so no extra field label). -->
        <ha-formfield>
          <ha-selector
            .hass=${this._hass}
            .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "icon_in_ring", label: this._t("badge_visual_icon_in_ring") },
          { value: "ring_value", label: this._t("badge_visual_ring_value") },
          { value: "ring_empty", label: this._t("badge_visual_ring_empty") },
          { value: "icon_only", label: this._t("badge_visual_icon_only") }
        ]
      }
    }}
            .value=${typeof t.badge_visual == "string" ? t.badge_visual : "icon_in_ring"}
            @value-changed=${(o) => {
      var i;
      const a = (i = o.detail) == null ? void 0 : i.value;
      a !== void 0 && this._updateConfig("badge_visual", a);
    }}
          ></ha-selector>
        </ha-formfield>

        <!-- badge_content: which allergen(s) the badge concerns -->
        <ha-formfield>
          <ha-selector
            .hass=${this._hass}
            .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "worst", label: this._t("badge_content_worst") },
          { value: "aggregate", label: this._t("badge_content_aggregate") },
          { value: "single", label: this._t("badge_content_single") },
          { value: "row", label: this._t("badge_content_row") }
        ]
      }
    }}
            .value=${t.badge_content || "worst"}
            @value-changed=${(o) => {
      var i, l;
      const a = (i = o.detail) == null ? void 0 : i.value;
      a !== void 0 && (a === "single" && !((l = this._userConfig) != null && l.badge_single_allergen) && r.length && this._updateConfig("badge_single_allergen", r[0]), this._updateConfig("badge_content", a));
    }}
          ></ha-selector>
        </ha-formfield>

        ${t.badge_content === "single" ? A`
              <ha-formfield label="${this._t("badge_single_allergen")}">
                <ha-selector
                  .hass=${this._hass}
                  .selector=${{
      select: {
        mode: "dropdown",
        options: r.map((o) => ({
          value: o,
          label: this._getAllergenDisplayName(o)
        }))
      }
    }}
                  .value=${t.badge_single_allergen || r[0] || ""}
                  @value-changed=${(o) => {
      var i;
      const a = (i = o.detail) == null ? void 0 : i.value;
      a !== void 0 && this._updateConfig("badge_single_allergen", a);
    }}
                ></ha-selector>
              </ha-formfield>
            ` : ""}
      </details>
    `;
  }
  // Hide the card-only size controls (icon_size / text_size_ratio) in the
  // shared Card appearance section; the badge uses badge_scale instead.
  _showCardSizeControls() {
    return !1;
  }
  // A badge is not a card: rename the shared appearance section accordingly.
  // The size controls (badge_scale, badge_icon_scale) stay here, so the helper
  // mentions size rather than just background/label.
  _appearanceSectionTitle() {
    return this._t("summary_badge_appearance");
  }
  _appearanceSectionHelper() {
    return this._t("helper_badge_appearance");
  }
  // The Advanced section's version string should read "Badge", not "Card".
  _versionLabel() {
    return this._t("badge_version");
  }
  // A badge is not a card: override the shared interactions section title and
  // helper with badge-specific keys so both speak of tapping the badge.
  _interactivitySectionTitle() {
    return this._t("summary_badge_interactivity");
  }
  _interactivitySectionHelper() {
    return this._t("helper_badge_interactivity");
  }
  // The Badge appearance reset also clears the badge size/label keys, which
  // live in this section via _renderAppearanceExtras. Includes badge_icon_scale
  // (rendered in every visual mode), so resetting the section clears every
  // control it shows.
  _appearanceResetKeys() {
    return [
      ...super._appearanceResetKeys(),
      "badge_scale",
      "badge_icon_scale",
      "badge_show_label",
      "badge_label_position",
      "badge_label_content"
    ];
  }
  // Badge size + label controls, rendered inside the shared Card appearance
  // section so badge size lives where card size lives (recognisable to users
  // of the card editor).
  _renderAppearanceExtras() {
    const t = this._editorConfig();
    return A`
      <!-- badge_scale: overall badge size multiplier -->
      <ha-formfield label="${this._t("badge_scale")}">
        <ha-slider
          min="0.5"
          max="3"
          step="0.1"
          .value=${typeof t.badge_scale == "number" ? t.badge_scale : 1}
          @input=${(r) => this._updateConfig(
      "badge_scale",
      Number(r.target.value)
    )}
          style="width: 120px;"
        ></ha-slider>
        ${this._renderNumberField({
      value: typeof t.badge_scale == "number" ? t.badge_scale : 1,
      min: 0.5,
      max: 3,
      step: 0.1,
      onValue: (r) => this._updateConfig("badge_scale", r)
    })}
      </ha-formfield>

      <!-- badge_icon_scale: scale the allergen visual as a whole — the ring
           (and whatever it centres) in the ring modes, the bare icon in
           icon_only — without touching the label text or the pill box. Shown
           in every visual mode. -->
      <ha-formfield label="${this._t("badge_icon_scale")}">
        <ha-slider
          min="0.3"
          max="3"
          step="0.05"
          .value=${typeof t.badge_icon_scale == "number" ? t.badge_icon_scale : 1}
          @input=${(r) => this._updateConfig(
      "badge_icon_scale",
      Number(r.target.value)
    )}
          style="width: 120px;"
        ></ha-slider>
        ${this._renderNumberField({
      value: typeof t.badge_icon_scale == "number" ? t.badge_icon_scale : 1,
      min: 0.3,
      max: 3,
      step: 0.05,
      onValue: (r) => this._updateConfig("badge_icon_scale", r)
    })}
      </ha-formfield>

      <!-- badge_show_label / badge_label_position -->
      <ha-formfield label="${this._t("badge_show_label")}">
        <ha-switch
          .checked=${t.badge_show_label === !0}
          @change=${(r) => this._updateConfig(
      "badge_show_label",
      r.target.checked
    )}
        ></ha-switch>
      </ha-formfield>

      ${t.badge_show_label ? A`
            <ha-formfield label="${this._t("badge_label_position")}">
              <ha-selector
                .hass=${this._hass}
                .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "right", label: this._t("badge_label_position_right") },
          { value: "below", label: this._t("badge_label_position_below") }
        ]
      }
    }}
                .value=${typeof t.badge_label_position == "string" ? t.badge_label_position : "right"}
                @value-changed=${(r) => {
      var a;
      const o = (a = r.detail) == null ? void 0 : a.value;
      o !== void 0 && this._updateConfig("badge_label_position", o);
    }}
              ></ha-selector>
            </ha-formfield>

            <!-- badge_label_content: allergen name (default), today's
                 translated level text, or both (issue #63). -->
            <ha-formfield label="${this._t("badge_label_content")}">
              <ha-selector
                .hass=${this._hass}
                .selector=${{
      select: {
        mode: "dropdown",
        options: [
          { value: "allergen", label: this._t("badge_label_content_allergen") },
          { value: "level", label: this._t("badge_label_content_level") },
          { value: "allergen_level", label: this._t("badge_label_content_allergen_level") }
        ]
      }
    }}
                .value=${No(t.badge_label_content)}
                @value-changed=${(r) => {
      var a;
      const o = (a = r.detail) == null ? void 0 : a.value;
      o !== void 0 && this._updateConfig("badge_label_content", o);
    }}
              ></ha-selector>
            </ha-formfield>
          ` : ""}
    `;
  }
  // ------------------------------------------------------------------ //
  // Render                                                               //
  // ------------------------------------------------------------------ //
  render() {
    return this._config ? A`
      <div class="card-config">
        <!-- Reset button (inherited from PollenEditorBase) -->
        ${this._renderTextButton({
      label: this._t("preset_reset_all"),
      onClick: () => this._resetAll()
    })}

        ${this._renderIntegrationSection()}
        ${this._renderBadgeContentSection()}
        ${this._renderAllergensSection()}
        ${this._renderAppearanceSection()}
        ${this._renderAllergenIconsSection()}
        ${this._renderLevelCirclesSection()}
        ${this._renderIconInRingSection()}
        ${this._renderPhrasesSection()}
        ${this._renderInteractionSection()}
        ${this._renderAdvancedSection()}
      </div>
    ` : A``;
  }
  // ------------------------------------------------------------------ //
  // Styles                                                               //
  // ------------------------------------------------------------------ //
  static get styles() {
    return Xe`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
      }

      .version-info {
        font-size: 0.9em;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }

      ha-formfield,
      details {
        margin-bottom: 8px;
      }

      .allergens-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .allergen-section {
        margin-bottom: 12px;
      }

      .allergen-section h4 {
        margin: 8px 0 4px 0;
        font-size: 0.9em;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      details summary {
        cursor: pointer;
        font-weight: bold;
        margin: 8px 0;
      }

      ha-slider {
        width: 100%;
      }

      ha-selector {
        width: 100%;
        --mdc-theme-primary: var(--primary-color);
      }

      .preset-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
      }

      .slider-row {
        display: grid;
        grid-template-columns: auto 3ch 1fr;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .slider-value {
        font-family: monospace;
        text-align: right;
        width: 3ch;
      }

      .slider-row ha-slider {
        width: 100%;
      }

      details {
        margin-bottom: 16px;
        border-radius: 6px;
        padding: 8px 0 0 0;
      }

      details > *:not(summary):not(details) {
        margin-left: 24px;
        margin-right: 24px;
      }

      details summary {
        font-weight: bold;
        cursor: pointer;
        background: var(--card-background-color, #f6f6f6);
        border-radius: 6px;
        padding: 10px 16px;
        border: 1px solid var(--divider-color, #ddd);
        color: var(--primary-text-color, #222);
        margin-bottom: 4px;
      }

      /* Per-section ↺ reset button styles (shared with the card editor). */
      ${hn}

      /* Own form controls (input/button) replacing HA's removed components. */
      ${gn}

      details details {
        margin-left: 24px;
        margin-right: 24px;
        background: var(--secondary-background-color, #f9f9f9);
        border-left: 2px solid var(--primary-color, #bcd);
        padding: 8px 0 8px 8px;
      }

      details details summary {
        background: var(--card-background-color, #f0f7fc);
        border: 1px solid var(--ha-card-border-color, #cde);
        color: var(--primary-text-color, #222);
        margin-bottom: 4px;
        padding: 8px 12px;
        border-radius: 5px;
      }

      ha-formfield > ha-switch,
      ha-formfield > .mdc-form-field > ha-switch {
        margin: 0;
        padding: 0;
        width: auto;
        min-width: 0;
        box-sizing: content-box;
      }

      ha-formfield {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      ha-switch {
        vertical-align: middle;
        width: 36px;
        height: 20px;
        background: none;
        border: none;
        box-sizing: border-box;
      }

      ha-formfield label,
      ha-formfield .mdc-label {
        vertical-align: middle;
        margin-left: 8px;
        margin-right: 0;
        padding: 0;
      }

      /* Section helper text below summary */
      .section-helper {
        font-size: 12px;
        color: var(--secondary-text-color);
        padding: 0 0 8px;
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Google attribution row under the integration picker (#338); box model
         matches .section-helper, typography comes from the shared fragment. */
      .google-attribution {
        ${Xo}
        padding: 0 0 8px;
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Inline caveat under a field whose current value cannot take effect. */
      .field-warning {
        font-size: 12px;
        color: var(--warning-color, #ff9800);
        padding: 0 0 8px;
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Subgroup header (uppercase divider inside a section) */
      .subgroup-header {
        text-transform: uppercase;
        font-size: 11px;
        font-weight: 600;
        color: var(--secondary-text-color);
        padding-top: 10px;
        border-top: 1px dashed var(--divider-color, #ccc);
        margin-top: 8px;
        margin-bottom: 4px;
        margin-left: 24px;
        margin-right: 24px;
      }

      /* Numeric input box sizing lives in editorControlStyles (.pp-input.num-field). */
    `;
  }
}
customElements.get("pollenprognos-badge-editor") || customElements.define("pollenprognos-badge-editor", ea);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "pollenprognos-card",
  name: "Pollenprognos Card",
  preview: !0,
  description: "Visar en grafisk prognos för pollenhalter",
  documentationURL: "https://github.com/krissen/pollenprognos-card",
  // HA 2026.6 card-picker suggestions: when a user picks a pollen sensor, offer
  // a correctly-configured card under the picker's Community section. Returns
  // null for entities we don't recognise.
  getEntitySuggestion: (e, t) => Oc(e, t)
});
window.customBadges = window.customBadges || [];
window.customBadges.push({
  type: "pollenprognos-badge",
  name: "Pollenprognos Badge",
  preview: !0,
  description: "Kompakt pollenbadge för dashboards",
  documentationURL: "https://github.com/krissen/pollenprognos-card"
});
