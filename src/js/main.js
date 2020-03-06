const tags = {
  active: "-is-active"
};

// nav bar
const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
const contentArea = document.getElementById("contentArea");

const btnHam = document.getElementById("btnHam");

btnHam.addEventListener("click", () => {
  nav.classList.toggle(tags.active);
  contentArea.classList.toggle(tags.active);
  menu.classList.toggle(tags.active);
});
