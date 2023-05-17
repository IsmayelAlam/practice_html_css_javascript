"use strict";

// inputs
const inputSecond = document.querySelector("#seconds");
const inputMinute = document.querySelector("#minutes");
const waves = document.querySelectorAll(".wave");

// buttons
const btnReset = document.querySelector(".btn_reset");
const btnStart = document.querySelector(".btn_start");
const btnStop = document.querySelector(".btn_stop");

let display;

// reset function
function reset() {
  inputMinute.value = "";
  inputSecond.value = "";
  clearInterval(display);
}

btnReset.addEventListener("click", reset);

btnStop.addEventListener("click", () => clearInterval(display));

btnStart.addEventListener("click", (e) => {
  // check defaults
  const minute = +inputMinute.value;
  if (minute >= 60 || minute < 0) return;
  const second = +inputSecond.value;
  if (second >= 60 || second < 0) return;

  //   total time calculate
  let totalTime = minute * 60 + second;

  display = setInterval(() => {
    if (totalTime <= 0) clearInterval(display);

    //     set wave position
    let position =
      200 + ((totalTime - 0) * (115 - 200)) / (minute * 60 + second - 0);

    waves.forEach((wave) => (wave.style.top = `-${position.toFixed(1)}%`));

    //     set time left for the countdown
    const sec = `${totalTime % 60}`;
    const min = `${Math.floor(totalTime / 60)}`;

    inputSecond.value = sec.padStart(2, "0");
    inputMinute.value = min.padStart(2, "0");

    totalTime--;
  }, 1000);
});
