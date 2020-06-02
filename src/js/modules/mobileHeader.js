const activateMobileHeader = () => {
  let windowWidthSize = window.innerWidth;
  window.addEventListener("resize", () => {
    windowWidthSize = window.innerWidth;
  });

  if (windowWidthSize < 768) {
    const $header = document.getElementById("header");
    const $headerLogo = document.getElementById("headerLogo");
    const $footer = document.getElementById("site-footer");
    const $headerThemeLogo = document.getElementById("headerThemeLogo");
    const $contentArea = document.getElementById("contentArea");
    const $articleArea = document.querySelector(".posts");
    const $btnHam = document.getElementById("btnHam");

    let themeLogoHeight = $headerThemeLogo.getBoundingClientRect().height;

    function setHomeHeader() {
      return new Promise((resolve) => {
        themeLogoHeight = $headerThemeLogo.getBoundingClientRect().height;
        $headerLogo.classList.remove("-is-active");
        $header.style.transform = `translate3d(0, ${themeLogoHeight}px, 0)`;
        $contentArea.style.transform = `translate3d(0, ${themeLogoHeight}px, 0)`;
        $footer.style.transform = `translate3d(0, ${themeLogoHeight}px, 0)`;
        resolve();
      });
    }
    function hideHugeLogo() {
      $header.style.transform = `translate3d(0, 0, 0)`;
      $headerThemeLogo.style.transform = `translate3d(0, -${themeLogoHeight}px, 0)`;
      $contentArea.style.transform = `translate3d(0, 0, 0)`;
      $footer.style.transform = `translate3d(0, 0, 0)`;
      $headerLogo.classList.add("-is-active");
    }
    function showHugeLogo() {
      $header.style.transform = `translate3d(0, ${themeLogoHeight}px, 0)`;
      $headerThemeLogo.style.transform = `translate3d(0, 0, 0)`;
      $contentArea.style.transform = `translate3d(0, ${themeLogoHeight}px, 0)`;
      $footer.style.transform = `translate3d(0, ${themeLogoHeight}px, 0)`;
      $headerLogo.classList.remove("-is-active");
    }

    async function initHomeHeader() {
      document.querySelector(".homepage").style.opacity = 0;
      await setHomeHeader();
      setTimeout(() => {
        document.querySelector(".homepage").style.opacity = 1;
        document.querySelector(".homepage").style.transition = "0.1s";
      }, 500);
    }
    initHomeHeader();

    $articleArea.addEventListener("scroll", () => {
      const scrollValue = $articleArea.scrollTop;
      if (scrollValue > 1) {
        hideHugeLogo();
      } else {
        showHugeLogo();
      }
    });

    if (btnHam) {
      btnHam.addEventListener("click", () => {
        hideHugeLogo();
      });
    }

    /*
     *
     * resize
     *
     */
    window.addEventListener("resize", () => {
      initHomeHeader();
    });
  }
};
