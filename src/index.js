import "./sass/main.scss";
import { gsap } from "gsap";

/**
 * @property {Number} new
 * @property {Number} origin
 */
class SliderPosition {
  /**
   *
   * @param {Number} originPos
   * @param {Number} newPos
   */
  constructor(originPos, newPos) {
    this.origin = originPos;
    this.new = newPos;
  }
}

class SliderCard {
  /**
   *
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
  }

  /**
   * Get element height
   *
   * @returns {Number}
   */
  height = () => {
    return this.element.clientHeight;
  };

  /**
   * Get element width
   *
   * @returns {Number}
   */
  width = () => {
    return this.element.clientWidth;
  };

  /**
   * Get element x axis transaltion according to a specifc element
   *
   * @param {SliderCard} accordingTo
   * @returns {SliderPosition}
   */
  x = (accordingTo) => {
    return {
      new: this.getTranslateX(accordingTo.element),
      origin: this.getTranslateX(this.element),
    };
  };

  /**
   * Get element y axis transaltion according to a specifc element
   *
   * @param {SliderCard} accordingTo
   * @returns {SliderPosition}
   */
  y = (accordingTo) => {
    return {
      new: -((accordingTo.height() - this.height()) / 2),
      origin: 0,
    };
  };

  getTranslateX = (element) => {
    const style = getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);

    return matrix.m41;
  };
}

class Slider {
  /**
   *
   * @param {SliderCard} primary
   * @param {SliderCard} secondary
   * @param {SliderCard} tertiary
   */
  constructor(primary, secondary, tertiary) {
    this.primary = primary;
    this.secondary = secondary;
    this.tertiary = tertiary;

    this.progress = false;
  }

  /**
   *
   * @param {Object} config
   * @returns
   */
  prevAnimate = ({ onStartCallback, onCompleteCallback } = {}) => {
    return gsap
      .timeline({
        onStart: () => {
          this.progress = true;

          if (onStartCallback) {
            onStartCallback();
          }
        },
        onComplete: () => {
          this.progress = false;

          if (onCompleteCallback) {
            onCompleteCallback();
          }
        },
      })
      .to(this.tertiary.element, {
        xPercent: "-20",
        opacity: 0,
        duration: 0.3,
      })
      .set(this.primary.element, {
        xPercent: "-20",
        opacity: 0,
      })
      .set(this.tertiary.element, {
        xPercent: 0,
        opacity: 1,
      })
      .set(this.secondary.element, {
        x: `${this.secondary.x(this.primary).new}`,
        y: `${this.secondary.y(this.primary).new}`,
        height: `${this.primary.height()}px`,
        width: `${this.primary.width()}px`,
      })
      .set(this.tertiary.element, {
        x: `${this.tertiary.x(this.secondary).new}`,
        y: `${this.tertiary.y(this.secondary).new}`,
        height: `${this.secondary.height()}px`,
        width: `${this.secondary.width()}px`,
      })
      .to(this.secondary.element, {
        y: `${this.secondary.y(this.primary).origin}`,
        x: `${this.secondary.x(this.primary).origin}`,
        height: `${this.secondary.height()}px`,
        width: `${this.secondary.width()}px`,
        duration: 0.3,
      })
      .to(this.tertiary.element, {
        x: `${this.tertiary.x(this.secondary).origin}`,
        y: `${this.tertiary.y(this.secondary).origin}`,
        height: `${this.tertiary.height()}px`,
        width: `${this.tertiary.width()}px`,
        duration: 0.3,
        delay: -0.3,
      })
      .to(this.primary.element, {
        xPercent: 0,
        opacity: 1,
        duration: 0.3,
        delay: -0.2,
      });
  };

  /**
   *
   * @param {Object} config
   * @returns
   */
  nextAnimate = ({ onStartCallback, onCompleteCallback } = {}) => {
    return gsap
      .timeline({
        onStart: () => {
          this.progress = true;

          if (onStartCallback) {
            onStartCallback();
          }
        },
        onComplete: () => {
          this.progress = false;

          if (onCompleteCallback) {
            onCompleteCallback();
          }
        },
      })
      .to(this.primary.element, {
        xPercent: 20,
        opacity: 0,
        duration: 0.3,
      })
      .set(this.tertiary.element, {
        scale: 0.2,
        xPercent: -50,
        opacity: 0,
      })
      .set(this.primary.element, {
        xPercent: 0,
        opacity: 1,
      })
      .set(this.primary.element, {
        x: `${this.primary.x(this.secondary).new}`,
        y: `${this.primary.y(this.secondary).new}`,
        height: `${this.secondary.height()}px`,
        width: `${this.secondary.width()}px`,
      })
      .set(this.secondary.element, {
        x: `${this.secondary.x(this.tertiary).new}`,
        y: `${this.secondary.y(this.tertiary).new}`,
        height: `${this.tertiary.height()}px`,
        width: `${this.tertiary.width()}px`,
      })
      .to(this.primary.element, {
        y: `${this.primary.y(this.primary).origin}`,
        x: `${this.primary.x(this.primary).origin}`,
        height: `${this.primary.height()}px`,
        width: `${this.primary.width()}px`,
        duration: 0.3,
      })
      .to(this.secondary.element, {
        y: `${this.secondary.y(this.secondary).origin}`,
        x: `${this.secondary.x(this.secondary).origin}`,
        height: `${this.secondary.height()}px`,
        width: `${this.secondary.width()}px`,
        duration: 0.3,
        delay: -0.3,
      })
      .to(this.tertiary.element, {
        scale: 1,
        xPercent: 0,
        opacity: 1,
        duration: 0.3,
        delay: -0.3,
      });
  };
}

const prevBtn = document.querySelector(".ctrl .prev");
const nextBtn = document.querySelector(".ctrl .next");

const slider = new Slider(
  new SliderCard(document.querySelector(".card-1")),
  new SliderCard(document.querySelector(".card-2")),
  new SliderCard(document.querySelector(".card-3"))
);

prevBtn.addEventListener("click", () => {
  if (!slider.progress) {
    slider.prevAnimate({
      onStartCallback: () => {
        console.log("prev");
      },
    });
  }
});

nextBtn.addEventListener("click", () => {
  if (!slider.progress) {
    slider.nextAnimate();
  }
});
