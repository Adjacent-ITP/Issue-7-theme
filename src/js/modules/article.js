/*
 *
 * preparations & helpers
 *
 */
// get required elements
const $contentArea = document.getElementById("contentArea");
const $articleSection = document.getElementById("articleSection");
const $articleHeader = document.getElementById("articleHeader");
const $articleContent = document.getElementById("articleContent");
const $imgAnchors = Array.from(document.getElementsByClassName("img-anchor"));
const $galleryImg = document.getElementById("galleryImg");
const headerHeight = $articleHeader.offsetHeight;

// setters
function setGalleryImg(targetElement) {
  const imgUrl = targetElement.dataset.src;
  $galleryImg.style.backgroundImage = `url('${imgUrl}')`;
}

/*
 *
 * presets
 *
 */
// fill in first image
setGalleryImg($imgAnchors[0]);

/*
 *
 * events
 *
 */
// scroll event
$articleSection.addEventListener("scroll", () => {
  // stick smaller header
  if ($articleSection.scrollTop > headerHeight / 2) {
    $articleHeader.classList.add("-is-scrolled");
  } else {
    $articleHeader.classList.remove("-is-scrolled");
  }

  // change gallery image
  const areaOffsetTop = $contentArea.offsetTop;
  const areaOffsetBtm = $contentArea.offsetHeight;
  $imgAnchors.forEach(($anchor) => {
    const fmtAnchorOffsetTop =
      $anchor.offsetTop - areaOffsetTop - $articleSection.scrollTop;
    const isAnchorInView =
      fmtAnchorOffsetTop > 0 && fmtAnchorOffsetTop < areaOffsetBtm;

    if (isAnchorInView) {
      setGalleryImg($anchor);
    }
  });
});
