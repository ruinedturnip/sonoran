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
