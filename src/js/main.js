const tags = {
  active: "-is-active",
  menuActive: "-is-menu-active",
};

// global event
// reset vh height
window.onload = () => {
  // setTimeout(() => {
  const vh = window.innerHeight / 100;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }, 100);
};

// nav bar
const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const contentArea = document.getElementById("contentArea");

const btnHam = document.getElementById("btnHam");

btnHam.addEventListener("click", () => {
  nav.classList.toggle(tags.menuActive);
  contentArea.classList.toggle(tags.menuActive);
});

if (document.getElementById("articlePost")) {
  activateArticlePage();
  activateMagnifier();
} else if (document.querySelector(".posts")) {
  activateBlob();
}

/*
else if(document.querySelector('.blobtest')) {
  console.log("blob");
  activateBlob2();
}
*/
