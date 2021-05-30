import "./sass/main.scss";
import { gsap } from "gsap";

const card1 = {
  element: document.querySelector(".card-1"),
};
const card2 = {
  element: document.querySelector(".card-2"),
};
const card3 = {
  element: document.querySelector(".card-3"),
};

card1.height = card1.element.clientHeight;
card1.width = card1.element.clientWidth;

card2.height = card2.element.clientHeight;
card2.width = card2.element.clientWidth;
card2.x = {
  new: getTranslateX(card1.element),
  origin: getTranslateX(card2.element),
};
card2.y = {
  new: -((card1.height - card2.height) / 2),
  origin: 0,
};

card3.height = card3.element.clientHeight;
card3.width = card3.element.clientWidth;
card3.x = {
  new: getTranslateX(card2.element),
  origin: getTranslateX(card3.element),
};
card3.y = {
  new: -((card2.height - card3.height) / 2),
  origin: 0,
};

gsap
  .timeline()
  .to(".card-3", {
    xPercent: "-20",
    opacity: 0,
    duration: 0.3,
    delay: 2,
  })
  .set(".card-1", {
    xPercent: "-20",
    opacity: 0,
  })
  .set(".card-3", {
    xPercent: 0,
    opacity: 1,
  })
  .set(".card-2", {
    x: `${card2.x.new}`,
    y: `${card2.y.new}`,
    height: `${card1.height}px`,
    width: `${card1.width}px`,
  })
  .set(".card-3", {
    x: `${card3.x.new}`,
    y: `${card3.y.new}`,
    height: `${card2.height}px`,
    width: `${card2.width}px`,
  })
  .to(".card-2", {
    x: `${card2.x.origin}`,
    y: `${card2.y.origin}`,
    height: `${card2.height}px`,
    width: `${card2.width}px`,
    duration: 0.3,
  })
  .to(".card-3", {
    x: `${card3.x.origin}`,
    y: `${card3.y.origin}`,
    height: `${card3.height}px`,
    width: `${card3.width}px`,
    duration: 0.3,
    delay: -0.3,
  })
  .to(".card-1", {
    xPercent: 0,
    opacity: 1,
    duration: 0.3,
    delay: -0.2,
  });

function getTranslateX(element) {
  const style = getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.transform);

  return matrix.m41;
}
