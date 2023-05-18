"use strict";

// inputs
const choices = document.querySelectorAll(".icon");
const playerChoice = document.querySelector(".icon_box");
const reset = document.querySelector(".reset_btn");

// results
const win = document.querySelector(".win");
const loss = document.querySelector(".loss");
const draw = document.querySelector(".draw");

const waitTime = 500;

// reset function
function resetFunction() {
  choices.forEach((icon) => icon.classList.remove("border_2", "border_1"));
  win.classList.add("hidden");
  loss.classList.add("hidden");
  draw.classList.add("hidden");
}
resetFunction();

// draw win and loss functions
function drawFunction() {
  setTimeout(() => {
    draw.classList.remove("hidden");
  }, waitTime);
}
function winFunction() {
  setTimeout(() => {
    win.classList.remove("hidden");
  }, waitTime);
}
function lossFunction() {
  setTimeout(() => {
    loss.classList.remove("hidden");
  }, waitTime);
}

// game start
playerChoice.addEventListener("click", (e) => {
  if (!e.target.closest(".icon")) return;
  resetFunction();

  //   random numder
  const randomNum = Math.floor(Math.random() * 3);

  //   check for player and pc choices
  const pc = Array.from(choices[randomNum].classList);
  const player = Array.from(e.target.closest(".icon").classList);

  e.target.closest(".icon").classList.add("border_1");
  choices[randomNum].classList.add("border_2");

  //   draw if both choose the same
  if (choices[randomNum] === e.target.closest(".icon")) drawFunction();

  //   player win
  if (player.includes("rock") && pc.includes("scissor")) winFunction();
  if (player.includes("paper") && pc.includes("rock")) winFunction();
  if (player.includes("scissor") && pc.includes("paper")) winFunction();
  //   pc win
  if (pc.includes("rock") && player.includes("scissor")) lossFunction();
  if (pc.includes("paper") && player.includes("rock")) lossFunction();
  if (pc.includes("scissor") && player.includes("paper")) lossFunction();
});

// reset
reset.addEventListener("click", resetFunction);
