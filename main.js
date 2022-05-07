function FactorZoomer(config = {}) {
  const img = document.getElementById(config.imageID);
  const lens = document.createElement("div");
  const result = document.getElementById(config.resultID);

  function enviroment({ widthLens = 50, heightLens = 50 }) {
    const imgParent = img.parentElement;
    const container = document.createElement("div");
    container.setAttribute(
      "style",
      `width:${img.offsetWidth}px;height:${img.offsetHeight}px;overflow:hidden;`
    );
    container.setAttribute("class", "position-relative");
    lens.setAttribute("id", "lens");
    lens.setAttribute(
      "style",
      `width:${widthLens}px;height:${heightLens}px; box-shadow:rgb(0 0 0 / 54%) 0px 0px 0px 100vw ;`
    );
    lens.setAttribute("class", " border position-absolute");
    imgParent.removeChild(img);
    container.appendChild(img);
    container.appendChild(lens);
    imgParent.appendChild(container);
  }
  function listen() {
    window.onload = function (e) {
      img.addEventListener("mousemove", function (e) {
        /* ******************* method one ******************** */
        e.preventDefault();
        // const pointerX = e.pageX - this.offsetParent.offsetLeft;
        // const pointerY = e.pageY - this.offsetParent.offsetTop;
        /* ******************************************************* */
        /* *********************** method 2 ********************* */
        const offset = img.getBoundingClientRect();
        const offsetTop = offset.y;
        const offsetLeft = offset.x;
        //  - window.pageXOffset  =>  /*consider any page scrolling:*/
        let pointerX = e.pageX - offsetLeft;
        let pointerY = e.pageY - offsetTop;
        pointerX = pointerX - window.pageXOffset;
        pointerY = pointerY - window.pageYOffset;

        /*calculate the ratio between result DIV and lens:*/
        const cx = result.offsetWidth / lens.offsetWidth;
        const cy = result.offsetHeight / lens.offsetHeight;
        lens.classList.remove("d-none");
        /*prevent the lens from being positioned outside the image:*/
        if (!(this.offsetHeight - pointerY > lens.offsetHeight)) {
          pointerY = this.offsetHeight - lens.offsetHeight;
        }
        if (!(this.offsetWidth - pointerX > lens.offsetWidth)) {
          pointerX = this.offsetWidth - lens.offsetWidth;
        }
        lens.style.top = pointerY;
        lens.style.left = pointerX;

        result.style.backgroundPosition =
          "-" + pointerX * cx + "px -" + pointerY * cy + "px";

        result.style.backgroundImage = "url('" + this.src + "')";

        result.style.backgroundSize =
          this.offsetWidth * cx + "px " + this.offsetHeight * cy + "px";
      });
    };
  }

  function create() {
    enviroment(config);
    listen();
  }

  return {
    create,
  };
}

const imageZoom = FactorZoomer({
  imageID: "view",
  resultID: "zoomed",
  widthLens: 50,
  heightLens: 50,
});
imageZoom.create();
