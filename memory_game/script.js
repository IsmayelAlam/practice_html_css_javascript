"use strict";

const imageBox = document.querySelector(".image_box");

imageBox.addEventListener("click", (event) => {
  const img = event.target.closest(".images");
  if (!img) return;
  console.log(img.classList);
  img.classList.add("rotate");
  img.classList.add("wrong_border");
});
