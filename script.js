"use strict";
const body = document.querySelector("body");
const quote = document.querySelector(".quotes");
const writer = document.querySelector(".writer");

// async function getApiData() {
//   try {
//     const apiUrl = "https://api.api-ninjas.com/v1/quotes";
//     const data = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         "X-Api-Key": "3X8ZBxPgu/921h0SUbzVzw==AE5w43bu5Z9HO68G",
//       },
//     });
//     const response = await data.json();

//     console.log(response[0]);

//     quote.innerHTML = `<h1 class="main_quote">${response[0].quote}<p class="writer">&ndash; ${response[0].author}</p></h1>`;
//   } catch (err) {
//     console.error(err + " please fix this");
//   }
// }
async function getApiData() {
  try {
    const apiUrl =
      "https://api.unsplash.com/photos/random?query=search/?client_id=TMv22_9DELV4Rfzb2ZPOQPjMAh4hqXGuquw-g0hY7Os";
    const data = await fetch(apiUrl);
    const response = await data.json();

    console.log(response);

    // body.style.backgroundImage = `linear-gradient(to right bottom, rgba(128, 0, 128, 0.5), rgba(255, 0, 0, 0.5)), url(${response.urls.full})`;
  } catch (err) {
    console.error(err + " please fix this");
  }
}

getApiData();
