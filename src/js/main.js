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

/*
 ** article gallery
 */
// fetch required elements
const $imgAnchors = Array.from(document.getElementsByClassName("img-anchor"));
const $galleryImg = document.getElementById("galleryImg");

// setter
function setGalleryImg(targetElement) {
  const imgUrl = targetElement.dataset.src;
  $galleryImg.style.backgroundImage = `url('${imgUrl}')`;
}

// fill in first image
setGalleryImg($imgAnchors[0]);

// set up observer
const observer = new IntersectionObserver(
  (element) => {
    const item = element[0];
    if (item.intersectionRatio > 0) {
      $galleryImg.style.opacity = 0.8;

      setGalleryImg(item.target);

      setTimeout(() => {
        $galleryImg.style.opacity = 1;
      }, 500);
    }
  },
  {
    threshold: 0,
  }
);

// observe each anchor element
$imgAnchors.forEach(($anchor) => {
  observer.observe($anchor);
});
