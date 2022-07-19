(() => {
  "use strict";
  let e = !0,
    n = (n = 500) => {
      let t = document.querySelector("body");
      if (e) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, n),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, n);
      }
    },
    t = (n = 500) => {
      let t = document.querySelector("body");
      if (e) {
        let i = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < i.length; e++) {
          i[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, n);
      }
    };
  let i = !1;
  setTimeout(() => {
    if (i) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (n) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  class r extends HTMLElement {
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
        n = document.createElement("div"),
        t = document.createElement("div"),
        i = document.createElement("div"),
        r = document.createElement("style");
      (r.innerHTML =
        '\n#slider-container {\n    --value : 0 ;\n    --slider-track-color : #B0EFEF45 ;\n    --slider-thumb-color : url("img/arrow-slider.svg") center center no-repeat,#FFA147 ;\n    --slider-fill-color  : linear-gradient(81.55deg, #FFC83E 33.93%, #FF9F47 73.78%);\n    --slider-fill2-color : #00A2BB ;\n\n    width : 100% ;\n    height: 1rem ;\n    display: flex ;\n    align-items: center ;\n    justify-content: center ;\n    padding: 0 ;\n    margin: 0 ;\n\n    animation: color-cycle 1s infinite alternate linear;\n}\n\n\n\n#slider {\n    -webkit-appearance: none;\n    appearance: none;\n    height: 1rem ;\n    width: 100% ;\n    margin : 0 ;\n    padding: 0 ;\n    background-color: #00000000 ;\n    outline: none ;\n    z-index: 99 ;\n}\n\n#slider-track {\n    position: absolute ;\n    top: calc(50% - 0.25rem);\n    left: 0 ;\n    width: 100%;\n    height: 7px ;\n    border-radius: 0.25rem ;\n    background-color: var(--slider-track-color) ;\n    overflow: hidden ;\n}\n\n#slider-track::before {\n\t\n    position: absolute ;\n    content: "" ;\n    left: calc(-107% + 1.5rem) ;\n    top : 0 ;\n    width : calc(104% - 1rem) ;\n    height: 100% ;\n    background: var(--slider-fill-color) ;\n    transition: background 300ms ease-out ;\n    transform-origin: 100% 0%;\n    transform: translateX(calc( var(--value) * 100% ));\n\t \n}\n\n#slider::-webkit-slider-thumb {\n\t\n    -webkit-appearance: none;\n    appearance: none;\n    width : 21px ;\n    height: 21px ;\n    border-radius: 50% ;\n    background  : var(--slider-thumb-color) ;\n    cursor: pointer ;\n    z-index: 99 ;\n    border: 2px solid var(--slider-fill-color) ;\n    transition: border-color 300ms ease-out ;\n}\n\n#value {\n\ttransform: translateX(calc( var(--value) * -65% ));\n\tfont-size: 24px;\n    position: absolute ;\n    bottom: 20px ;\n    left: calc( var(--value) * calc(100% - 1rem) - 0.8rem ) ;\n\t \n    min-width: 8ch ;\n    pointer-events: none ;\n    padding: 0.0rem ;\n    display: flex ;\n    align-items: center ;\n    justify-content: flex-start ;\n    color: #45515F ;\n    background-color: var(--slider-fill-color);\n    opacity: 1 ;\n\t transition: left 300ms ease-out , opacity 300ms 300ms ease-out , background-color 300ms ease-out ;\n}\n\n#value::before {\n    position: absolute ;\n    content: "" ;\n    top: 100% ;\n    left: 50% ;\n    width: 1rem ;\n    height: 1rem ;\n    border-radius: 2px ;\n    background-color: inherit ;\n    transform: translate(-50%,-80%) rotate(45deg);\n    z-index: -1 ;\n}\n\n\n'),
        (e.type = "range"),
        (e.id = "slider"),
        (e.min = this.min),
        (e.max = this.max),
        (e.step = this.step),
        (e.value = this.value),
        (n.id = "slider-container"),
        (t.id = "slider-track"),
        (i.id = "value"),
        e.addEventListener("input", this.update.bind(this)),
        n.appendChild(e),
        n.appendChild(i),
        n.appendChild(t),
        this.root.appendChild(r),
        this.root.appendChild(n);
    }
    update() {
      let e = this.root.getElementById("slider-container"),
        n = this.root.getElementById("slider"),
        t = this.root.getElementById("value"),
        i =
          3 == n.min
            ? n.value / (this.max - this.min) - 0.10101010101010101
            : n.value / (this.max - this.min);
      3 == n.min ? (t.innerText = n.value) : (t.innerText = n.value + " ₽ "),
        e.style.setProperty("--value", i);
    }
  }
  class o extends HTMLElement {
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
        n = document.createElement("div"),
        t = document.createElement("div"),
        i = document.createElement("div"),
        r = document.createElement("style");
      (r.innerHTML =
        '\n#slider-container {\n    --value : 0 ;\n    --slider-track-color : #B0EFEF45 ;\n    --slider-thumb-color : url("img/arrow-slider.svg") center center no-repeat,#FFA147 ;\n    --slider-fill-color  : linear-gradient(81.55deg, #FFC83E 33.93%, #FF9F47 73.78%);\n    --slider-fill2-color : #00A2BB ;\n\n    width : 100% ;\n    height: 1rem ;\n    display: flex ;\n    align-items: center ;\n    justify-content: center ;\n    padding: 0 ;\n    margin: 0 ;\n\n    animation: color-cycle 1s infinite alternate linear;\n}\n\n\n\n#slider {\n    -webkit-appearance: none;\n    appearance: none;\n    height: 1rem ;\n    width: 100% ;\n    margin : 0 ;\n    padding: 0 ;\n    background-color: #00000000 ;\n    outline: none ;\n    z-index: 99 ;\n}\n\n#slider-track {\n    position: absolute ;\n    top: calc(50% - 0.25rem);\n    left: 0 ;\n    width: 100%;\n    height: 7px ;\n    border-radius: 0.25rem ;\n    background-color: var(--slider-track-color) ;\n    overflow: hidden ;\n}\n\n#slider-track::before {\n    position: absolute ;\n    content: "" ;\n    left: calc(-107% + 1.5rem) ;\n    top : 0 ;\n    width : calc(104% - 1rem) ;\n    height: 100% ;\n    background: var(--slider-fill-color) ;\n    transition: background 300ms ease-out ;\n    transform-origin: 100% 0%;\n    transform: translateX(calc( var(--value) * 100% ));\n\t \n}\n\n#slider::-webkit-slider-thumb {\n\t\n    -webkit-appearance: none;\n    appearance: none;\n    width : 21px ;\n    height: 21px ;\n    border-radius: 50% ;\n    background: var(--slider-thumb-color) ;\n    cursor: pointer ;\n    z-index: 99 ;\n    border: 2px solid var(--slider-fill-color) ;\n    transition: border-color 300ms ease-out ;\n}\n\n#value {\n\t\n\tfont-size: 24px;\n    position: absolute ;\n    bottom: 20px ;\n    left: calc( var(--value) * calc(100% - 1rem) - 0rem ) ;\n\t transform: translateX(calc( var(--value) * -5% ));\n    min-width: 8ch ;\n    pointer-events: none ;\n    padding: 0.0rem ;\n    display: flex ;\n    align-items: center ;\n    justify-content: flex-start ;\n    color: #45515F ;\n    background-color: var(--slider-fill-color);\n    opacity: 1 ;\n\t transition: left 300ms ease-out , opacity 300ms 300ms ease-out , background-color 300ms ease-out ;\n}\n\n#value::before {\n    position: absolute ;\n    content: "" ;\n    top: 100% ;\n    left: 50% ;\n    width: 1rem ;\n    height: 1rem ;\n    border-radius: 2px ;\n    background-color: inherit ;\n    transform: translate(-50%,-80%) rotate(45deg);\n    z-index: -1 ;\n}\n\n\n'),
        (e.type = "range"),
        (e.id = "slider"),
        (e.min = this.min),
        (e.max = this.max),
        (e.step = this.step),
        (e.value = this.value),
        (n.id = "slider-container"),
        (t.id = "slider-track"),
        (i.id = "value"),
        e.addEventListener("input", this.update.bind(this)),
        n.appendChild(e),
        n.appendChild(i),
        n.appendChild(t),
        this.root.appendChild(r),
        this.root.appendChild(n);
    }
    update() {
      let e = this.root.getElementById("slider-container"),
        n = this.root.getElementById("slider"),
        t = this.root.getElementById("value"),
        i =
          3 == n.min
            ? n.value / (this.max - this.min) - 0.10101010101010101
            : n.value / (this.max - this.min);
      3 == n.min ? (t.innerText = n.value) : (t.innerText = n.value + " ₽ "),
        e.style.setProperty("--value", i);
    }
  }
  customElements.define("custom-slider", r),
    customElements.define("custom-slider-days", o),
    (window.FLS = !1),
    (function (e) {
      let n = new Image();
      (n.onload = n.onerror =
        function () {
          e(2 == n.height);
        }),
        (n.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let n = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(n);
    }),
    (function () {
      let i = document.querySelector(".icon-menu");
      i &&
        i.addEventListener("click", function (i) {
          e &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? n(e) : t(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })();
})();
