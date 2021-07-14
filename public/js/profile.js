var searchFormEl = document.querySelector("#search-form");
var searchInputVal = document.querySelector(".form-input");
const RAPIDAPI_KEY = "b991af6626msh20817527d58c008p114012jsnafbe85f9a112";
const intro = document.querySelector(".intro");
const more = document.querySelector(".more");
const searchInput = document.querySelector(".searchInput");
const clickInfo = document.querySelector(".click-info");
const searchFrom = document.querySelector(".d-flex");
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
const controller = new ScrollMagic.Controller();
const tm = TweenMax;

tl.from(".block", 1, {
  x: "100",
  opacity: 0,
  stagger: 0.15,
  scale: ".8",
  ease: Expo.easeInOut,
});

tl.from(".plate", 6, {
  opacity: 0,
  scale: ".8",
});
tl.from(
  ".avocado",
  2,
  {
    opacity: 0,
    y: "-100",
  },
  "-=3"
);

tl.from(
  ".soup",
  30,
  {
    rotation: "-=360",
    repeat: -1,
    ease: Linear,
  },
  "-=7"
);

tm.to(".blocks", 5.1, {
  y: "-460",
  scale: ".4",
  ease: Expo.easeInOut,
});

tm.to(".box", 5.6, {
  y: "-100%",
  ease: Expo.easeInOut,
});

tm.from(".navbar > div", 6.9, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});

tm.from(".title", 6.9, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});
tm.from(".social", 1.6, {
  opacity: 0,
  y: 60,
  ease: Expo.easeInOut,
  delay: 0.6,
});
