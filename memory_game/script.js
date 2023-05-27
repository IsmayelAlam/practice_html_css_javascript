"use strict";

// DOM elements
const body = document.querySelector("body");
const imageBox = document.querySelector(".image_box");
const imagesPairs = document.querySelector(".images_pairs span");
const winner = document.querySelector(".result");
let imageNumber = +imagesPairs.innerText;

// helper variables
let oldImgArray = [...Array(imageNumber).keys()];
let allImgArray = [];
let check = [];
let preImg = "";
let evaluating = false;

// all buttons elements
const btnRefresh = document.querySelector(".refresh");
const btnRefreshWin = document.querySelector(".winbtn");
const btnShuffle = document.querySelector(".shuffle");
const btnIncrease = document.querySelector(".increase");
const btnDecrease = document.querySelector(".decrease");

// array shuffle function
function arrayShuffle(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}

function createMarkup(array) {
  const markup = array
    .map((img) => {
      return `
    <div class="images img${img.toString().padStart(3, "0")} check">
        <img src="img/card_back.webp" alt="backside card" class="img imgBack" />
        <img src="img/${img
          .toString()
          .padStart(3, "0")}.jpg" alt="backside card" class="img imgFront" />
    </div>
    `;
    })
    .join("");
  return markup;
}

// render Images
function renderImages(shuffle = true) {
  oldImgArray = arrayShuffle([...Array(imageNumber).keys()]);
  if (shuffle) allImgArray = arrayShuffle([...oldImgArray, ...oldImgArray]);
  imageBox.innerHTML = createMarkup(allImgArray);

  evaluating = false;
  check = [];
  preImg = "";
}

// load background image and main images
window.addEventListener("load", () => {
  body.style.backgroundImage = `url("./img/bg/bg${Math.floor(
    Math.random() * 5
  )}.webp")`;
  renderImages();
});

// Increase the images pairs
btnIncrease.addEventListener("click", () => {
  if (imageNumber > 11) return;
  imagesPairs.innerHTML = ++imageNumber;
  renderImages();
});

// Decrease the images pairs
btnDecrease.addEventListener("click", () => {
  if (imageNumber <= 4) return;
  imagesPairs.innerHTML = --imageNumber;
  renderImages();
});

//refresh the images
btnRefresh.addEventListener("click", () => renderImages(false));

//refresh the page after winning
btnRefreshWin.addEventListener("click", (e) => {
  winner.classList.add("hidden");
  imageBox.innerHTML = createMarkup(allImgArray);
});

// shuffle the images
btnShuffle.addEventListener("click", renderImages);

// // for testing
imageBox.addEventListener("click", (event) => {
  // default check
  if (evaluating || check.length >= 2) return;
  const img = event.target.closest(".check");
  if (!img || Array.from(img.classList).includes("rotate")) return;

  // add the current Selection as a previous selected image
  if (check[0]) preImg = document.querySelector(`.${check[0]}.rotate`);

  check.push(img.classList[1]);
  img.classList.add("rotate");

  if (check.length === 1) return;

  // if the images don't match, hide them
  if (check.length === 2 && check[0] !== check[1]) {
    img.classList.add("wrong_border");
    preImg.classList.add("wrong_border");
    evaluating = true;

    // wait 2 second before hiding the images
    setTimeout(() => {
      img.classList.remove("wrong_border");
      img.classList.remove("rotate");

      preImg.classList.remove("rotate");
      preImg.classList.remove("wrong_border");

      evaluating = false;
      check = [];
      preImg = "";
    }, 2000);
  }

  // if the images match, keep them visible
  if (check.length === 2 && check[0] === check[1]) {
    img.classList.add("right_border");
    img.classList.remove("check");

    preImg.classList.add("right_border");
    preImg.classList.remove("check");

    check = [];
    preImg = "";
  }

  // if there is no card left declare winner
  if (!document.querySelector(".check")) {
    setTimeout(() => {
      winner.classList.remove("hidden");
    }, 2000);
  }
});
