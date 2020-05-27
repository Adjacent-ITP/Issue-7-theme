/*
 *
 * preparations & helpers
 *
 */
let activateArticlePage = () => {
  // get required elements
  const $contentArea = document.getElementById("contentArea");
  const $articleSection = document.getElementById("articleSection");
  const $articleHeader = document.getElementById("articleHeader");
  const $articleGallery = document.getElementById("articleGallery");
  const $articlePost = document.getElementById("articlePost");
  const $imgAnchors = Array.from(
    document.getElementsByClassName("article__caption")
  );
  const $galleryImg = document.getElementById("galleryImg");

  // setters
  function setGalleryImg(targetElement) {
    const imgUrl = targetElement.dataset.src;
    $galleryImg.style.backgroundImage = `url('${imgUrl}')`;
  }
  function setGalleryWidth() {
    const contentAreaHeight = $contentArea.getBoundingClientRect().height;
    const fmtValue = Math.ceil(contentAreaHeight / 1.7685);
    $articleGallery.style.minWidth = `${fmtValue}px`;
  }

  // getters
  function getLayoutType() {
    if ($articlePost.classList.contains("-is-vertical")) return "vertical";
    if ($articlePost.classList.contains("-is-scroll")) return "scroll";
    if ($articlePost.classList.contains("-is-iframe")) return "iframe";
  }

  /*
   *
   * presets
   *
   */
  // fill in first image
  if (getLayoutType() !== "iframe" && $imgAnchors.length > 0) {
    setGalleryImg($imgAnchors[0]);
  }

  /*
   *
   * onload
   *
   */
  setGalleryWidth();
  window.addEventListener("resize", () => {
    setGalleryWidth();
  });

  /*
   *
   * scroll
   *
   */
  const layoutType = getLayoutType();

  $articleSection.addEventListener("scroll", () => {
    // stick smaller header
    if (
      $articleSection.scrollTop >
      $contentArea.getBoundingClientRect().height * 0.05
    ) {
      $articleHeader.classList.add("-is-scrolled");
    } else {
      $articleHeader.classList.remove("-is-scrolled");
    }

    // change gallery image
    if (layoutType === "vertical") {
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
    }

    // scroll type image
    if (layoutType === "scroll") {
      const areaHeight =
        $articleSection.scrollHeight -
        $articleSection.getBoundingClientRect().height;
      const ratio = $articleSection.scrollTop / areaHeight;
      $galleryImg.style.backgroundPositionY = `${ratio * 100}%`;
    }
  });
};
