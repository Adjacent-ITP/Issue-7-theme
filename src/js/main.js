const tags = {
  active: "-is-active",
  menuActive: "-is-menu-active",
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
