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
// /////   Portfolio            /////////////////////////////
// ///////////////////////////////////////////////////////
// const gallery = document.getElementById("gallery");
// const portfolio = document.getElementById("portfolio");
// let moveVal = 0;

// let dragging = false,
//   mouseLocation,
//   galleryLocation;

// const easeOutQuad = (t) => {
//   return t * (2 - t);
// };

// let moveGallery = () => {
//   moveVal = easeOutQuad((window.scrollY * 0.003) / 2);
//   gallery.style.transform = ` translateX(${moveVal}%)`;
//   console.log(moveVal);
//   requestAnimationFrame(moveGallery);
// };

// requestAnimationFrame(moveGallery);

// const handleOnDown = (e) => (portfolio.dataset.mouseDownAt = e.clientX);

// const handleOnUp = () => {
//   portfolio.dataset.mouseDownAt = "0";
//   portfolio.dataset.prevPercentage = portfolio.dataset.percentage;
// };

// const handleOnMove = (e) => {
//   if (portfolio.dataset.mouseDownAt === "0") return;

//   const mouseDelta = parseFloat(portfolio.dataset.mouseDownAt) - e.clientX,
//     maxDelta = window.innerWidth / 2;

//   const percentage = (mouseDelta / maxDelta) * -100,
//     nextPercentageUnconstrained =
//       parseFloat(portfolio.dataset.prevPercentage) + percentage,
//     nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

//   portfolio.dataset.percentage = nextPercentage;

//   portfolio.animate(
//     {
//       transform: `translate(${nextPercentage}%, -50%)`,
//     },
//     { duration: 1200, fill: "forwards" }
//   );

//   for (const image of portfolio.getElementsByClassName("image")) {
//     image.animate(
//       {
//         objectPosition: `${100 + nextPercentage}% center`,
//       },
//       { duration: 1200, fill: "forwards" }
//     );
//   }
// };

// /* -- Had to add extra lines for touch events -- */

// window.onmousedown = (e) => handleOnDown(e);

// window.ontouchstart = (e) => handleOnDown(e.touches[0]);

// window.onmouseup = (e) => handleOnUp(e);

// window.ontouchend = (e) => handleOnUp(e.touches[0]);

// window.onmousemove = (e) => handleOnMove(e);

// window.ontouchmove = (e) => handleOnMove(e.touches[0]);

// const dragStart = (e) => {
//   dragging = true;
//   mouseLocation = e.pageX;
//   galleryLocation = portfolio.scrollLeft;
// };

// const dragStop = (e) => {
//   dragging = false;
//   mouseLocation = e.pageX;
//   galleryLocation = portfolio.scrollLeft;
// };

// const dragActive = (e) => {
//   if (!dragging) return;
//   let offset = e.pageX - mouseLocation;
//   portfolio.scrollLeft = galleryLocation - offset;
// };

// gallery.addEventListener("mousedown", dragStart);
// gallery.addEventListener("mousemove", dragActive);
// gallery.addEventListener("mouseup", dragStop);
// //////////////////////////////////////////////////////////
// /////   Testimonials            /////////////////////////////
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
