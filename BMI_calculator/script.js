"use strict";

// Inputs
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");
const calculate = document.querySelector(".btn");

// Results
const resultDisplay = document.querySelector(".circle__main");
const waves1 = document.querySelector(".wav_1");
const waves2 = document.querySelector(".wav_2");
const waves3 = document.querySelector(".wav_3");
const bmiResult = document.querySelector(".bmi_result");

calculate.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(bmiResult);
  bmiResult.innerHTML = inputHeight.value;
});
