"use strict";
const body = document.querySelector("body");
const quote = document.querySelector(".quotes");
const writer = document.querySelector(".writer");
const btn = document.querySelector(".btn");

async function getApiData() {
  try {
    // get the quote data from ninjas api
    const quoteUrl = "https://api.api-ninjas.com/v1/quotes";
    const quoteData = await fetch(quoteUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": "3X8ZBxPgu/921h0SUbzVzw==AE5w43bu5Z9HO68G",
      },
    });
    const getQuote = await quoteData.json();

    // get the image data from unsplash api
    const imageUrl = `https://api.unsplash.com/photos/random?query=${getQuote[0].category}&client_id=TMv22_9DELV4Rfzb2ZPOQPjMAh4hqXGuquw-g0hY7Os`;
    const imgData = await fetch(imageUrl);
    const getImg = await imgData.json();

    body.style.backgroundImage = `linear-gradient(to right bottom, rgba(128, 0, 128, 0.5), rgba(255, 0, 0, 0.5)), url(${getImg.urls.full})`;

    quote.innerHTML = `<h1 class="main_quote">${getQuote[0].quote}<p class="writer">&ndash; ${getQuote[0].author}</p></h1>`;
  } catch (err) {
    console.error(err + " please fix this");
  }
}

getApiData();

btn.addEventListener("click", getApiData);
