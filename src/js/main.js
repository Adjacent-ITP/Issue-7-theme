const tags = {
  active: "-is-active",
  menuActive: "-is-menu-active",
};

window.onload = () => {
  // global event
  // reset vh height
  const vh = window.innerHeight / 100;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // nav bar
  const nav = document.getElementById("nav");
  const contentArea = document.getElementById("contentArea");

  const btnHam = document.getElementById("btnHam");

  if (btnHam) {
    btnHam.addEventListener("click", () => {
      nav.classList.toggle(tags.menuActive);
      contentArea.classList.toggle(tags.menuActive);
    });
  }

  if (document.getElementById("articlePost")) {
    activateArticlePage();
    activateMagnifier();
  } else if (document.querySelector(".posts")) {
    activateBlob();
  }
};
