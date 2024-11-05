!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : ((t = "undefined" != typeof globalThis ? globalThis : t || self).SignaturePad = e());
})(this, function () {
    "use strict";
    class t {
        constructor(t, e, i, n) {
            if (isNaN(t) || isNaN(e)) throw new Error(`Point is invalid: (${t}, ${e})`);
            (this.x = +t), (this.y = +e), (this.pressure = i || 0), (this.time = n || Date.now());
        }
        distanceTo(t) {
            return Math.sqrt(Math.pow(this.x - t.x, 2) + Math.pow(this.y - t.y, 2));
        }
        equals(t) {
            return this.x === t.x && this.y === t.y && this.pressure === t.pressure && this.time === t.time;
        }
        velocityFrom(t) {
            return this.time !== t.time ? this.distanceTo(t) / (this.time - t.time) : 0;
        }
    }
    class e {
        static fromPoints(t, i) {
            const n = this.calculateControlPoints(t[0], t[1], t[2]).c2,
                s = this.calculateControlPoints(t[1], t[2], t[3]).c1;
            return new e(t[1], n, s, t[2], i.start, i.end);
        }
        static calculateControlPoints(e, i, n) {
            const s = e.x - i.x,
                o = e.y - i.y,
                r = i.x - n.x,
                h = i.y - n.y,
                a = (e.x + i.x) / 2,
                c = (e.y + i.y) / 2,
                d = (i.x + n.x) / 2,
                l = (i.y + n.y) / 2,
                u = Math.sqrt(s * s + o * o),
                v = Math.sqrt(r * r + h * h),
                _ = v / (u + v),
                p = d + (a - d) * _,
                m = l + (c - l) * _,
                g = i.x - p,
                w = i.y - m;
            return {
                c1: new t(a + g, c + w),
                c2: new t(d + g, l + w)
            };
        }
        constructor(t, e, i, n, s, o) {
            (this.startPoint = t), (this.control2 = e), (this.control1 = i), (this.endPoint = n), (this.startWidth = s), (this.endWidth = o);
        }
        length() {
            let t,
                e,
                i = 0;
            for (let n = 0; n <= 10; n += 1) {
                const s = n / 10,
                    o = this.point(s, this.startPoint.x, this.control1.x, this.control2.x, this.endPoint.x),
                    r = this.point(s, this.startPoint.y, this.control1.y, this.control2.y, this.endPoint.y);
                if (n > 0) {
                    const n = o - t,
                        s = r - e;
                    i += Math.sqrt(n * n + s * s);
                }
                (t = o), (e = r);
            }
            return i;
        }
        point(t, e, i, n, s) {
            return e * (1 - t) * (1 - t) * (1 - t) + 3 * i * (1 - t) * (1 - t) * t + 3 * n * (1 - t) * t * t + s * t * t * t;
        }
    }
    class i {
        constructor() {
            try {
                this._et = new EventTarget();
            } catch (t) {
                this._et = document;
            }
        }
        addEventListener(t, e, i) {
            this._et.addEventListener(t, e, i);
        }
        dispatchEvent(t) {
            return this._et.dispatchEvent(t);
        }
        removeEventListener(t, e, i) {
            this._et.removeEventListener(t, e, i);
        }
    }
    class n extends i {
        constructor(t, e = {}) {
            var i, s, o;
            super(),
                (this.canvas = t),
                (this._drawingStroke = !1),
                (this._isEmpty = !0),
                (this._lastPoints = []),
                (this._data = []),
                (this._lastVelocity = 0),
                (this._lastWidth = 0),
                (this._handleMouseDown = (t) => {
                    this._isLeftButtonPressed(t, !0) && !this._drawingStroke && this._strokeBegin(this._pointerEventToSignatureEvent(t));
                }),
                (this._handleMouseMove = (t) => {
                    this._isLeftButtonPressed(t, !0) && this._drawingStroke ? this._strokeMoveUpdate(this._pointerEventToSignatureEvent(t)) : this._strokeEnd(this._pointerEventToSignatureEvent(t), !1);
                }),
                (this._handleMouseUp = (t) => {
                    this._isLeftButtonPressed(t) || this._strokeEnd(this._pointerEventToSignatureEvent(t));
                }),
                (this._handleTouchStart = (t) => {
                    1 !== t.targetTouches.length || this._drawingStroke || (t.cancelable && t.preventDefault(), this._strokeBegin(this._touchEventToSignatureEvent(t)));
                }),
                (this._handleTouchMove = (t) => {
                    1 === t.targetTouches.length && (t.cancelable && t.preventDefault(), this._drawingStroke ? this._strokeMoveUpdate(this._touchEventToSignatureEvent(t)) : this._strokeEnd(this._touchEventToSignatureEvent(t), !1));
                }),
                (this._handleTouchEnd = (t) => {
                    0 === t.targetTouches.length && (t.cancelable && t.preventDefault(), this.canvas.removeEventListener("touchmove", this._handleTouchMove), this._strokeEnd(this._touchEventToSignatureEvent(t)));
                }),
                (this._handlePointerDown = (t) => {
                    this._isLeftButtonPressed(t) && !this._drawingStroke && (t.preventDefault(), this._strokeBegin(this._pointerEventToSignatureEvent(t)));
                }),
                (this._handlePointerMove = (t) => {
                    this._isLeftButtonPressed(t, !0) && this._drawingStroke ? (t.preventDefault(), this._strokeMoveUpdate(this._pointerEventToSignatureEvent(t))) : this._strokeEnd(this._pointerEventToSignatureEvent(t), !1);
                }),
                (this._handlePointerUp = (t) => {
                    this._isLeftButtonPressed(t) || (t.preventDefault(), this._strokeEnd(this._pointerEventToSignatureEvent(t)));
                }),
                (this.velocityFilterWeight = e.velocityFilterWeight || 0.7),
                (this.minWidth = e.minWidth || 0.5),
                (this.maxWidth = e.maxWidth || 2.5),
                (this.throttle = null !== (i = e.throttle) && void 0 !== i ? i : 16),
                (this.minDistance = null !== (s = e.minDistance) && void 0 !== s ? s : 5),
                (this.dotSize = e.dotSize || 0),
                (this.penColor = e.penColor || "black"),
                (this.backgroundColor = e.backgroundColor || "rgba(0,0,0,0)"),
                (this.compositeOperation = e.compositeOperation || "source-over"),
                (this.canvasContextOptions = null !== (o = e.canvasContextOptions) && void 0 !== o ? o : {}),
                (this._strokeMoveUpdate = this.throttle ?
                    (function (t, e = 250) {
                        let i,
                            n,
                            s,
                            o = 0,
                            r = null;
                        const h = () => {
                            (o = Date.now()), (r = null), (i = t.apply(n, s)), r || ((n = null), (s = []));
                        };
                        return function (...a) {
                            const c = Date.now(),
                                d = e - (c - o);
                            return (n = this), (s = a), d <= 0 || d > e ? (r && (clearTimeout(r), (r = null)), (o = c), (i = t.apply(n, s)), r || ((n = null), (s = []))) : r || (r = window.setTimeout(h, d)), i;
                        };
                    })(n.prototype._strokeUpdate, this.throttle) :
                    n.prototype._strokeUpdate),
                (this._ctx = t.getContext("2d", this.canvasContextOptions)),
                this.clear(),
                this.on();
        }
        clear() {
            const {
                _ctx: t,
                canvas: e
            } = this;
            (t.fillStyle = this.backgroundColor), t.clearRect(0, 0, e.width, e.height), t.fillRect(0, 0, e.width, e.height), (this._data = []), this._reset(this._getPointGroupOptions()), (this._isEmpty = !0);
        }
        fromDataURL(t, e = {}) {
            return new Promise((i, n) => {
                const s = new Image(),
                    o = e.ratio || window.devicePixelRatio || 1,
                    r = e.width || this.canvas.width / o,
                    h = e.height || this.canvas.height / o,
                    a = e.xOffset || 0,
                    c = e.yOffset || 0;
                this._reset(this._getPointGroupOptions()),
                    (s.onload = () => {
                        this._ctx.drawImage(s, a, c, r, h), i();
                    }),
                    (s.onerror = (t) => {
                        n(t);
                    }),
                    (s.crossOrigin = "anonymous"),
                    (s.src = t),
                    (this._isEmpty = !1);
            });
        }
        toDataURL(t = "image/png", e) {
            return "image/svg+xml" === t ? ("object" != typeof e && (e = void 0), `data:image/svg+xml;base64,${btoa(this.toSVG(e))}`) : ("number" != typeof e && (e = void 0), this.canvas.toDataURL(t, e));
        }
        on() {
            (this.canvas.style.touchAction = "none"), (this.canvas.style.msTouchAction = "none"), (this.canvas.style.userSelect = "none");
            const t = /Macintosh/.test(navigator.userAgent) && "ontouchstart" in document;
            window.PointerEvent && !t ? this._handlePointerEvents() : (this._handleMouseEvents(), "ontouchstart" in window && this._handleTouchEvents());
        }
        off() {
            (this.canvas.style.touchAction = "auto"),
            (this.canvas.style.msTouchAction = "auto"),
            (this.canvas.style.userSelect = "auto"),
            this.canvas.removeEventListener("pointerdown", this._handlePointerDown),
                this.canvas.removeEventListener("mousedown", this._handleMouseDown),
                this.canvas.removeEventListener("touchstart", this._handleTouchStart),
                this._removeMoveUpEventListeners();
        }
        _getListenerFunctions() {
            var t;
            const e = window.document === this.canvas.ownerDocument ? window : null !== (t = this.canvas.ownerDocument.defaultView) && void 0 !== t ? t : this.canvas.ownerDocument;
            return {
                addEventListener: e.addEventListener.bind(e),
                removeEventListener: e.removeEventListener.bind(e)
            };
        }
        _removeMoveUpEventListeners() {
            const {
                removeEventListener: t
            } = this._getListenerFunctions();
            t("pointermove", this._handlePointerMove),
                t("pointerup", this._handlePointerUp),
                t("mousemove", this._handleMouseMove),
                t("mouseup", this._handleMouseUp),
                t("touchmove", this._handleTouchMove),
                t("touchend", this._handleTouchEnd);
        }
        isEmpty() {
            return this._isEmpty;
        }
        fromData(t, {
            clear: e = !0
        } = {}) {
            e && this.clear(), this._fromData(t, this._drawCurve.bind(this), this._drawDot.bind(this)), (this._data = this._data.concat(t));
        }
        toData() {
            return this._data;
        }
        _isLeftButtonPressed(t, e) {
            return e ? 1 === t.buttons : !(1 & ~t.buttons);
        }
        _pointerEventToSignatureEvent(t) {
            return {
                event: t,
                type: t.type,
                x: t.clientX,
                y: t.clientY,
                pressure: "pressure" in t ? t.pressure : 0
            };
        }
        _touchEventToSignatureEvent(t) {
            const e = t.changedTouches[0];
            return {
                event: t,
                type: t.type,
                x: e.clientX,
                y: e.clientY,
                pressure: e.force
            };
        }
        _getPointGroupOptions(t) {
            return {
                penColor: t && "penColor" in t ? t.penColor : this.penColor,
                dotSize: t && "dotSize" in t ? t.dotSize : this.dotSize,
                minWidth: t && "minWidth" in t ? t.minWidth : this.minWidth,
                maxWidth: t && "maxWidth" in t ? t.maxWidth : this.maxWidth,
                velocityFilterWeight: t && "velocityFilterWeight" in t ? t.velocityFilterWeight : this.velocityFilterWeight,
                compositeOperation: t && "compositeOperation" in t ? t.compositeOperation : this.compositeOperation,
            };
        }
        _strokeBegin(t) {
            if (!this.dispatchEvent(new CustomEvent("beginStroke", {
                    detail: t,
                    cancelable: !0
                }))) return;
            const {
                addEventListener: e
            } = this._getListenerFunctions();
            switch (t.event.type) {
                case "mousedown":
                    e("mousemove", this._handleMouseMove), e("mouseup", this._handleMouseUp);
                    break;
                case "touchstart":
                    e("touchmove", this._handleTouchMove), e("touchend", this._handleTouchEnd);
                    break;
                case "pointerdown":
                    e("pointermove", this._handlePointerMove), e("pointerup", this._handlePointerUp);
            }
            this._drawingStroke = !0;
            const i = this._getPointGroupOptions(),
                n = Object.assign(Object.assign({}, i), {
                    points: []
                });
            this._data.push(n), this._reset(i), this._strokeUpdate(t);
        }
        _strokeUpdate(t) {
            if (!this._drawingStroke) return;
            if (0 === this._data.length) return void this._strokeBegin(t);
            this.dispatchEvent(new CustomEvent("beforeUpdateStroke", {
                detail: t
            }));
            const e = this._createPoint(t.x, t.y, t.pressure),
                i = this._data[this._data.length - 1],
                n = i.points,
                s = n.length > 0 && n[n.length - 1],
                o = !!s && e.distanceTo(s) <= this.minDistance,
                r = this._getPointGroupOptions(i);
            if (!s || !s || !o) {
                const t = this._addPoint(e, r);
                s ? t && this._drawCurve(t, r) : this._drawDot(e, r), n.push({
                    time: e.time,
                    x: e.x,
                    y: e.y,
                    pressure: e.pressure
                });
            }
            this.dispatchEvent(new CustomEvent("afterUpdateStroke", {
                detail: t
            }));
        }
        _strokeEnd(t, e = !0) {
            this._removeMoveUpEventListeners(), this._drawingStroke && (e && this._strokeUpdate(t), (this._drawingStroke = !1), this.dispatchEvent(new CustomEvent("endStroke", {
                detail: t
            })));
        }
        _handlePointerEvents() {
            (this._drawingStroke = !1), this.canvas.addEventListener("pointerdown", this._handlePointerDown);
        }
        _handleMouseEvents() {
            (this._drawingStroke = !1), this.canvas.addEventListener("mousedown", this._handleMouseDown);
        }
        _handleTouchEvents() {
            this.canvas.addEventListener("touchstart", this._handleTouchStart);
        }
        _reset(t) {
            (this._lastPoints = []), (this._lastVelocity = 0), (this._lastWidth = (t.minWidth + t.maxWidth) / 2), (this._ctx.fillStyle = t.penColor), (this._ctx.globalCompositeOperation = t.compositeOperation);
        }
        _createPoint(e, i, n) {
            const s = this.canvas.getBoundingClientRect();
            return new t(e - s.left, i - s.top, n, new Date().getTime());
        }
        _addPoint(t, i) {
            const {
                _lastPoints: n
            } = this;
            if ((n.push(t), n.length > 2)) {
                3 === n.length && n.unshift(n[0]);
                const t = this._calculateCurveWidths(n[1], n[2], i),
                    s = e.fromPoints(n, t);
                return n.shift(), s;
            }
            return null;
        }
        _calculateCurveWidths(t, e, i) {
            const n = i.velocityFilterWeight * e.velocityFrom(t) + (1 - i.velocityFilterWeight) * this._lastVelocity,
                s = this._strokeWidth(n, i),
                o = {
                    end: s,
                    start: this._lastWidth
                };
            return (this._lastVelocity = n), (this._lastWidth = s), o;
        }
        _strokeWidth(t, e) {
            return Math.max(e.maxWidth / (t + 1), e.minWidth);
        }
        _drawCurveSegment(t, e, i) {
            const n = this._ctx;
            n.moveTo(t, e), n.arc(t, e, i, 0, 2 * Math.PI, !1), (this._isEmpty = !1);
        }
        _drawCurve(t, e) {
            const i = this._ctx,
                n = t.endWidth - t.startWidth,
                s = 2 * Math.ceil(t.length());
            i.beginPath(), (i.fillStyle = e.penColor);
            for (let i = 0; i < s; i += 1) {
                const o = i / s,
                    r = o * o,
                    h = r * o,
                    a = 1 - o,
                    c = a * a,
                    d = c * a;
                let l = d * t.startPoint.x;
                (l += 3 * c * o * t.control1.x), (l += 3 * a * r * t.control2.x), (l += h * t.endPoint.x);
                let u = d * t.startPoint.y;
                (u += 3 * c * o * t.control1.y), (u += 3 * a * r * t.control2.y), (u += h * t.endPoint.y);
                const v = Math.min(t.startWidth + h * n, e.maxWidth);
                this._drawCurveSegment(l, u, v);
            }
            i.closePath(), i.fill();
        }
        _drawDot(t, e) {
            const i = this._ctx,
                n = e.dotSize > 0 ? e.dotSize : (e.minWidth + e.maxWidth) / 2;
            i.beginPath(), this._drawCurveSegment(t.x, t.y, n), i.closePath(), (i.fillStyle = e.penColor), i.fill();
        }
        _fromData(e, i, n) {
            for (const s of e) {
                const {
                    points: e
                } = s,
                o = this._getPointGroupOptions(s);
                if (e.length > 1)
                    for (let n = 0; n < e.length; n += 1) {
                        const s = e[n],
                            r = new t(s.x, s.y, s.pressure, s.time);
                        0 === n && this._reset(o);
                        const h = this._addPoint(r, o);
                        h && i(h, o);
                    }
                else this._reset(o), n(e[0], o);
            }
        }
        toSVG({
            includeBackgroundColor: t = !1
        } = {}) {
            const e = this._data,
                i = Math.max(window.devicePixelRatio || 1, 1),
                n = this.canvas.width / i,
                s = this.canvas.height / i,
                o = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            if (
                (o.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
                    o.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"),
                    o.setAttribute("viewBox", `0 0 ${n} ${s}`),
                    o.setAttribute("width", n.toString()),
                    o.setAttribute("height", s.toString()),
                    t && this.backgroundColor)
            ) {
                const t = document.createElement("rect");
                t.setAttribute("width", "100%"), t.setAttribute("height", "100%"), t.setAttribute("fill", this.backgroundColor), o.appendChild(t);
            }
            return (
                this._fromData(
                    e,
                    (t, {
                        penColor: e
                    }) => {
                        const i = document.createElement("path");
                        if (!(isNaN(t.control1.x) || isNaN(t.control1.y) || isNaN(t.control2.x) || isNaN(t.control2.y))) {
                            const n = `M ${t.startPoint.x.toFixed(3)},${t.startPoint.y.toFixed(3)} C ${t.control1.x.toFixed(3)},${t.control1.y.toFixed(3)} ${t.control2.x.toFixed(3)},${t.control2.y.toFixed(3)} ${t.endPoint.x.toFixed(
                                3
                            )},${t.endPoint.y.toFixed(3)}`;
                            i.setAttribute("d", n), i.setAttribute("stroke-width", (2.25 * t.endWidth).toFixed(3)), i.setAttribute("stroke", e), i.setAttribute("fill", "none"), i.setAttribute("stroke-linecap", "round"), o.appendChild(i);
                        }
                    },
                    (t, {
                        penColor: e,
                        dotSize: i,
                        minWidth: n,
                        maxWidth: s
                    }) => {
                        const r = document.createElement("circle"),
                            h = i > 0 ? i : (n + s) / 2;
                        r.setAttribute("r", h.toString()), r.setAttribute("cx", t.x.toString()), r.setAttribute("cy", t.y.toString()), r.setAttribute("fill", e), o.appendChild(r);
                    }
                ),
                o.outerHTML
            );
        }
    }
    return n;
});