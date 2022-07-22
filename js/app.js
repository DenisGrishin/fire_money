(() => {
  "use strict";
  const e = (e, t) => {
    const n = document.querySelector(e),
      i = document.querySelectorAll(t);
    i.forEach((e) => {
      e.classList.add("animated", "fadeInUp");
    }),
      n.addEventListener("click", (e) => {
        i.forEach((e) => {
          e.classList.remove(
            "column-card__item_hidden-block",
            "column-card__item_hidden-block-table",
            "column-card__item_hidden-block-mobile"
          ),
            e.classList.add(
              "column-card__item_show-block",
              "column-card__item_show-block-table",
              "column-card__item_show-block-mobile"
            ),
            n.remove();
        });
      });
  };
  let t = (e, t = 500, n = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = n ? `${n}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !n),
            !n && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !n && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    n = (e, t = 500, n = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          n && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = n ? `${n}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    i = !0,
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < n.length; e++) {
            n[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (i) {
        let n = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < n.length; e++) {
          n[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (i = !1),
          setTimeout(function () {
            i = !0;
          }, e);
      }
    };
  function l(e, t) {
    const n = Array.from(e).filter(function (e, n, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (n.length) {
      const e = [];
      n.forEach((n) => {
        const i = {},
          r = n.dataset[t].split(",");
        (i.value = r[0]),
          (i.type = r[1] ? r[1].trim() : "max"),
          (i.item = n),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = (function (e) {
        return e.filter(function (e, t, n) {
          return n.indexOf(e) === t;
        });
      })(i);
      const r = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const n = t.split(","),
              i = n[1],
              o = n[2],
              l = window.matchMedia(n[0]),
              a = e.filter(function (e) {
                if (e.value === i && e.type === o) return !0;
              });
            r.push({ itemsArray: a, matchMedia: l });
          }),
          r
        );
    }
  }
  let a = !1;
  setTimeout(() => {
    if (a) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  class s extends HTMLElement {
    constructor() {
      super(),
        (this.value = parseFloat(this.getAttribute("value")) || 0),
        (this.min = parseFloat(this.getAttribute("min")) || 0),
        (this.max = parseFloat(this.getAttribute("max")) || 100),
        (this.step = parseFloat(this.getAttribute("step")) || 1),
        (this.style.minWidth = "12rem"),
        (this.style.minHeight = "1rem"),
        (this.style.position = "relative"),
        (this.root = this.attachShadow({ mode: "open" })),
        (this.dragging = !1),
        this.create(),
        this.update();
    }
    create() {
      let e = document.createElement("input"),
        t = document.createElement("div"),
        n = document.createElement("div"),
        i = document.createElement("div"),
        r = document.createElement("style");
      (r.innerHTML =
        '\n#slider-container {\n    --value : 0 ;\n    --slider-track-color : #B0EFEF45 ;\n    --slider-thumb-color : url("img/arrow-slider.svg") center center no-repeat,#FFA147 ;\n    --slider-fill-color  : linear-gradient(81.55deg, #FFC83E 33.93%, #FF9F47 73.78%);\n    --slider-fill2-color : #00A2BB ;\n\n    width : 100% ;\n    height: 1rem ;\n    display: flex ;\n    align-items: center ;\n    justify-content: center ;\n    padding: 0 ;\n    margin: 0 ;\n\n    animation: color-cycle 1s infinite alternate linear;\n}\n\n\n\n#slider {\n    -webkit-appearance: none;\n    appearance: none;\n    height: 1rem ;\n    width: 100% ;\n    margin : 0 ;\n    padding: 0 ;\n    background-color: #00000000 ;\n    outline: none ;\n    z-index: 99 ;\n}\n\n#slider-track {\n    position: absolute ;\n    top: calc(50% - 0.25rem);\n    left: 0 ;\n    width: 100%;\n    height: 7px ;\n    border-radius: 0.25rem ;\n    background-color: var(--slider-track-color) ;\n    overflow: hidden ;\n}\n\n#slider-track::before {\n\t\n    position: absolute ;\n    content: "" ;\n    left: calc(-107% + 1.5rem) ;\n    top : 0 ;\n    width : calc(104% - 1rem) ;\n    height: 100% ;\n    background: var(--slider-fill-color) ;\n    transition: background 300ms ease-out ;\n    transform-origin: 100% 0%;\n    transform: translateX(calc( var(--value) * 100% ));\n\t \n}\n\n#slider::-webkit-slider-thumb\n {\n\t\n    -webkit-appearance: none;\n    appearance: none;\n    width : 21px ;\n    height: 21px ;\n    border-radius: 50% ;\n    background  : var(--slider-thumb-color) ;\n    cursor: pointer ;\n    z-index: 99 ;\n    border: 2px solid var(--slider-fill-color) ;\n    transition: border-color 300ms ease-out ;\n}\n#slider::-moz-range-thumb {\n\t\n    -webkit-appearance: none;\n    appearance: none;\n    width : 21px ;\n    height: 21px ;\n    border-radius: 50% ;\n    background  : var(--slider-thumb-color) ;\n    cursor: pointer ;\n    z-index: 99 ;\n    border: 2px solid var(--slider-fill-color) ;\n    transition: border-color 300ms ease-out ;\n}\n#value {\n\ttransform: translateX(calc( var(--value) * -65% ));\n\tfont-size: 24px;\n    position: absolute ;\n    bottom: 20px ;\n    left: calc( var(--value) * calc(100% - 1rem) - 0.8rem ) ;\n\t \n    min-width: 8ch ;\n    pointer-events: none ;\n    padding: 0.0rem ;\n    display: flex ;\n    align-items: center ;\n    justify-content: flex-start ;\n    color: #45515F ;\n    background-color: var(--slider-fill-color);\n    opacity: 1 ;\n\t transition: left 300ms ease-out , opacity 300ms 300ms ease-out , background-color 300ms ease-out ;\n}\n\n#value::before {\n    position: absolute ;\n    content: "" ;\n    top: 100% ;\n    left: 50% ;\n    width: 1rem ;\n    height: 1rem ;\n    border-radius: 2px ;\n    background-color: inherit ;\n    transform: translate(-50%,-80%) rotate(45deg);\n    z-index: -1 ;\n}\n\n\n'),
        (e.type = "range"),
        (e.id = "slider"),
        (e.min = this.min),
        (e.max = this.max),
        (e.step = this.step),
        (e.value = this.value),
        (t.id = "slider-container"),
        (n.id = "slider-track"),
        (i.id = "value"),
        e.addEventListener("input", this.update.bind(this)),
        t.appendChild(e),
        t.appendChild(i),
        t.appendChild(n),
        this.root.appendChild(r),
        this.root.appendChild(t);
    }
    update() {
      let e = this.root.getElementById("slider-container"),
        t = this.root.getElementById("slider"),
        n = this.root.getElementById("value"),
        i =
          3 == t.min
            ? t.value / (this.max - this.min) - 0.10101010101010101
            : t.value / (this.max - this.min);
      3 == t.min ? (n.innerText = t.value) : (n.innerText = t.value + " ₽ "),
        e.style.setProperty("--value", i);
    }
  }
  class d extends HTMLElement {
    constructor() {
      super(),
        (this.value = parseFloat(this.getAttribute("value")) || 0),
        (this.min = parseFloat(this.getAttribute("min")) || 0),
        (this.max = parseFloat(this.getAttribute("max")) || 100),
        (this.step = parseFloat(this.getAttribute("step")) || 1),
        (this.style.minWidth = "12rem"),
        (this.style.minHeight = "1rem"),
        (this.style.position = "relative"),
        (this.root = this.attachShadow({ mode: "open" })),
        (this.dragging = !1),
        this.create(),
        this.update();
    }
    create() {
      let e = document.createElement("input"),
        t = document.createElement("div"),
        n = document.createElement("div"),
        i = document.createElement("div"),
        r = document.createElement("style");
      (r.innerHTML =
        '\n#slider-container {\n    --value : 0 ;\n    --slider-track-color : #B0EFEF45 ;\n    --slider-thumb-color : url("img/arrow-slider.svg") center center no-repeat,#FFA147 ;\n    --slider-fill-color  : linear-gradient(81.55deg, #FFC83E 33.93%, #FF9F47 73.78%);\n    --slider-fill2-color : #00A2BB ;\n\n    width : 100% ;\n    height: 1rem ;\n    display: flex ;\n    align-items: center ;\n    justify-content: center ;\n    padding: 0 ;\n    margin: 0 ;\n\n    animation: color-cycle 1s infinite alternate linear;\n}\n\n\n\n#slider {\n    -webkit-appearance: none;\n    appearance: none;\n    height: 1rem ;\n    width: 100% ;\n    margin : 0 ;\n    padding: 0 ;\n    background-color: #00000000 ;\n    outline: none ;\n    z-index: 99 ;\n}\n\n#slider-track {\n    position: absolute ;\n    top: calc(50% - 0.25rem);\n    left: 0 ;\n    width: 100%;\n    height: 7px ;\n    border-radius: 0.25rem ;\n    background-color: var(--slider-track-color) ;\n    overflow: hidden ;\n}\n\n#slider-track::before {\n    position: absolute ;\n    content: "" ;\n    left: calc(-107% + 1.5rem) ;\n    top : 0 ;\n    width : calc(104% - 1rem) ;\n    height: 100% ;\n    background: var(--slider-fill-color) ;\n    transition: background 300ms ease-out ;\n    transform-origin: 100% 0%;\n    transform: translateX(calc( var(--value) * 100% ));\n\t \n}\n\n#slider::-webkit-slider-thumb {\n\t\n    -webkit-appearance: none;\n    appearance: none;\n    width : 21px ;\n    height: 21px ;\n    border-radius: 50% ;\n    background: var(--slider-thumb-color) ;\n    cursor: pointer ;\n    z-index: 99 ;\n    border: 2px solid var(--slider-fill-color) ;\n    transition: border-color 300ms ease-out ;\n}\n#slider::-moz-range-thumb {\n\t\n    -webkit-appearance: none;\n    appearance: none;\n    width : 21px ;\n    height: 21px ;\n    border-radius: 50% ;\n    background  : var(--slider-thumb-color) ;\n    cursor: pointer ;\n    z-index: 99 ;\n    border: 2px solid var(--slider-fill-color) ;\n    transition: border-color 300ms ease-out ;\n}\n#value {\n\t\n\tfont-size: 24px;\n    position: absolute ;\n    bottom: 20px ;\n    left: calc( var(--value) * calc(100% - 1rem) - 0rem ) ;\n\t transform: translateX(calc( var(--value) * -5% ));\n    min-width: 8ch ;\n    pointer-events: none ;\n    padding: 0.0rem ;\n    display: flex ;\n    align-items: center ;\n    justify-content: flex-start ;\n    color: #45515F ;\n    background-color: var(--slider-fill-color);\n    opacity: 1 ;\n\t transition: left 300ms ease-out , opacity 300ms 300ms ease-out , background-color 300ms ease-out ;\n}\n\n#value::before {\n    position: absolute ;\n    content: "" ;\n    top: 100% ;\n    left: 50% ;\n    width: 1rem ;\n    height: 1rem ;\n    border-radius: 2px ;\n    background-color: inherit ;\n    transform: translate(-50%,-80%) rotate(45deg);\n    z-index: -1 ;\n}\n\n\n'),
        (e.type = "range"),
        (e.id = "slider"),
        (e.min = this.min),
        (e.max = this.max),
        (e.step = this.step),
        (e.value = this.value),
        (t.id = "slider-container"),
        (n.id = "slider-track"),
        (i.id = "value"),
        e.addEventListener("input", this.update.bind(this)),
        t.appendChild(e),
        t.appendChild(i),
        t.appendChild(n),
        this.root.appendChild(r),
        this.root.appendChild(t);
    }
    update() {
      let e = this.root.getElementById("slider-container"),
        t = this.root.getElementById("slider"),
        n = this.root.getElementById("value"),
        i =
          3 == t.min
            ? t.value / (this.max - this.min) - 0.10101010101010101
            : t.value / (this.max - this.min);
      3 == t.min ? (n.innerText = t.value) : (n.innerText = t.value + " ₽ "),
        e.style.setProperty("--value", i);
    }
  }
  customElements.define("custom-slider", s),
    customElements.define("custom-slider-days", d),
    (window.FLS = !1),
    e(".choose-us__btn-all-comments", ".column-card__item"),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          i &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? r(e) : o(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const i = Array.from(e).filter(function (e, t, n) {
          return !e.dataset.spollers.split(",")[0];
        });
        i.length && o(i);
        let r = l(e, "spollers");
        function o(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  a(e),
                  e.addEventListener("click", s))
                : (e.classList.remove("_spoller-init"),
                  a(e, !1),
                  e.removeEventListener("click", s));
          });
        }
        function a(e, t = !0) {
          const n = e.querySelectorAll("[data-spoller]");
          n.length > 0 &&
            n.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function s(e) {
          const i = e.target;
          if (i.closest("[data-spoller]")) {
            const r = i.closest("[data-spoller]"),
              o =
                (document.querySelectorAll(".spollers__item"),
                r.closest("[data-spollers]")),
              l = !!o.hasAttribute("data-one-spoller");
            o.querySelectorAll("._slide").length ||
              (l && !r.classList.contains("_spoller-active") && d(o),
              r.classList.toggle("_spoller-active"),
              ((e, i = 500) => {
                e.hidden ? n(e, i) : t(e, i);
              })(r.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function d(e) {
          const n = e.querySelector("[data-spoller]._spoller-active");
          n &&
            (n.classList.remove("_spoller-active"),
            t(n.nextElementSibling, 500));
        }
        r &&
          r.length &&
          r.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              o(e.itemsArray, e.matchMedia);
            }),
              o(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    (function () {
      const e = document.querySelectorAll(".rating");
      e.length > 0 &&
        (function () {
          let t, n;
          for (let t = 0; t < e.length; t++) {
            i(e[t]);
          }
          function i(e) {
            r(e), o(), e.classList.contains("rating_set") && l(e);
          }
          function r(e) {
            (t = e.querySelector(".rating__active")),
              (n = e.querySelector(".rating__value"));
          }
          function o(e = n.innerHTML) {
            const i = e / 0.05;
            t.style.width = `${i}%`;
          }
          function l(e) {
            const t = e.querySelectorAll(".rating__item");
            for (let i = 0; i < t.length; i++) {
              const l = t[i];
              l.addEventListener("mouseenter", function (t) {
                r(e), o(l.value);
              }),
                l.addEventListener("mouseleave", function (e) {
                  o();
                }),
                l.addEventListener("click", function (t) {
                  r(e),
                    e.dataset.ajax
                      ? a(l.value, e)
                      : ((n.innerHTML = i + 1), o());
                });
            }
          }
          async function a(e, t) {
            if (!t.classList.contains("rating_sending")) {
              t.classList.add("rating_sending");
              let e = await fetch("rating.json", { method: "GET" });
              if (e.ok) {
                const i = (await e.json()).newRating;
                (n.innerHTML = i), o(), t.classList.remove("rating_sending");
              } else alert("Ошибка"), t.classList.remove("rating_sending");
            }
          }
        })();
    })();
})();
