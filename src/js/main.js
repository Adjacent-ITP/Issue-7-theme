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


if(document.getElementById('articlePost')) {
  console.log("article");
  activateArticlePage();
}
else if(document.querySelector('.blobtest')) {
  console.log("blob");
  activateBlob2();
}
else if(document.querySelector('.posts')) {
  console.log("blob");
  activateBlob();
}
