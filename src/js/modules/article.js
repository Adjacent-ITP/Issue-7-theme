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
  const $articleContent = document.getElementById("articleContent");
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
    return new Promise((resolve) => {
      const contentAreaHeight = $contentArea.getBoundingClientRect().height;
      const fmtValue = Math.ceil(contentAreaHeight / 1.7685);
      $articleGallery.style.minWidth = `${fmtValue}px`;
      resolve();
    });
  }
  function setHeaderWidth() {
    return new Promise((resolve) => {
      const width = $articleSection.getBoundingClientRect().width;
      $articleHeader.style.maxWidth = `${width}px`;
      $articleHeader.style.width = `${width}px`;
      resolve();
    });
  }
  function setContentPadding() {
    return new Promise((resolve) => {
      const headerHeight = $articleHeader.getBoundingClientRect().height;
      $articleContent.style.paddingTop = `${headerHeight}px`;
      resolve();
    });
  }
  function setContentView() {
    $articlePost.classList.remove("-is-loading");
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
  async function loadArticle() {
    await setGalleryWidth();
    await setHeaderWidth();
    await setContentPadding();
    setContentView();
  }
  loadArticle();

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
      $articleHeader.getBoundingClientRect().height * 0.05
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

  /*
   *
   * resize
   *
   */
  window.addEventListener("resize", () => {
    loadArticle();
  });
};
