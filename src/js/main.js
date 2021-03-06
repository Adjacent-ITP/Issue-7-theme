const tags = {
  active: "-is-active",
  menuActive: "-is-menu-active",
};

let setBackground = () => {
  let activeMenu = document.querySelector(".menu__cell.-active");
  let header = document.querySelector(".article__header");
  header.style.backgroundSize = `${window.innerWidth}px ${12*window.innerHeight}px`;

  if (activeMenu) {
    let i = parseInt(activeMenu.dataset.key || "0");
    let total = document.querySelectorAll(".menu__cell:not(.-small)").length || 12;
    let offset = Math.min(i / (total-1), 0.999);
    document.body.style.backgroundPositionY = `${offset * 100}%`;
    header.style.backgroundPositionY = `-${offset * 11*window.innerHeight}px`;
  }
};

if (document.querySelector(".homepage")) {
  activateMobileHeader();
}

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
    setBackground();
    activateArticlePage();
    activateMagnifier();
  } else if (document.querySelector(".posts")) {
    activateBlob();
  }
};
