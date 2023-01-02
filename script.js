"use strict";
// //////////////////////////////////////////////////////////
// // /////   REVEAL SECTION            /////////////////////
// // ///////////////////////////////////////////////////////

// const allSections = document.querySelectorAll(".section");

// const revealSections = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove("section--hidden");
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSections, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });

//////////////////////////////////////////////////////////
// /////   Mobile NAV            /////////////////////////////
// ///////////////////////////////////////////////////////

const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");

const nav = [nav1, nav2, nav3, nav4, nav5];

const menuBar = document.getElementById("menu-bars");

let screenWidth = screen.width;

/*
1) determine user's screen width.
  - Line 41

2) If width is below 896 pixels, display menu button
  -Line 57

3) If menu button is clicked, display overlay
 -Line 69

4) If close button is clicked, hide overlay

4) 
*/

function toggleNav() {
  menuBar.classList.toggle("change");
  overlay.classList.toggle("hide");
}

function overlayAnimation(dir1, dir2) {
  overlay.forEach((nav, i) => {
    nav.classList.replace(`slide-${dir1}-${i + 1}`, `slide-${dir2}-${i + 1}`);
  });
}

if (screenWidth <= 896) {
  menuBar.classList.toggle("hide");
  menuBar.addEventListener("click", toggleNav);
}
//////////////////////////////////////////////////////////
// /////   SLIDER            /////////////////////////////
// ///////////////////////////////////////////////////////

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}" aria-label="${i} slide"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * [i - slide]}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
