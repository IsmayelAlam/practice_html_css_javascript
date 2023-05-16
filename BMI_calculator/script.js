"use strict";

// Inputs
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");
const inputTypeWeight = document.querySelector(".inputs__type_weight");
const inputTypeHeight = document.querySelector(".inputs__type_height");
const calculate = document.querySelector(".btn");

// Results
const resultDisplay = document.querySelector(".circle__main");
const waves = document.querySelectorAll(".wave");
const bmiResult = document.querySelector(".bmi_result");
const bmiResultText = document.querySelector(".results__text");

// automate the input type change function
inputTypeWeight.addEventListener("change", (e) => {
  if (inputTypeWeight.value === "lb") inputTypeHeight.value = "inches";
  if (inputTypeWeight.value === "kg") inputTypeHeight.value = "cm";
});

inputTypeHeight.addEventListener("change", (e) => {
  if (inputTypeHeight.value === "inches") inputTypeWeight.value = "lb";
  if (inputTypeHeight.value === "cm") inputTypeWeight.value = "kg";
});

calculate.addEventListener("click", (e) => {
  // default
  e.preventDefault();
  if (!inputHeight.value || !inputTypeWeight.value) return;

  //   filter inputs
  let height = +inputHeight.value;
  if (inputTypeHeight.value === "inches") height /= 0.3937;
  if (height > 300) return;

  let weight = +inputWeight.value;
  if (inputTypeWeight.value === "lb") weight /= 2.2;
  if (weight > 500) return;

  //   calculate BMI
  const bmi = weight / Math.pow(height / 100, 2);

  //   display bmi
  bmiResult.innerHTML = bmi.toFixed(1);

  //   position  the wave Animation according to the result
  let position = 150 + ((bmi - 1) * (240 - 160)) / (40 - 1);
  if (position < 160) position = 160;
  if (position > 240) position = 240;

  waves.forEach((wave) => (wave.style.top = `-${position.toFixed(1)}%`));

  //   change the backgroundColor according to result
  if (bmi <= 18.4) {
    resultDisplay.style.backgroundColor = "rgb(226, 223, 43)";
    bmiResultText.innerHTML = "Underweight";
  }
  if (bmi > 18.5 && bmi < 24.9) {
    resultDisplay.style.backgroundColor = "rgb(64, 226, 43)";
    bmiResultText.innerHTML = "Normal";
  }
  if (bmi > 25 && bmi < 39.9) {
    resultDisplay.style.backgroundColor = "rgb(228, 124, 28)";
    bmiResultText.innerHTML = "Overweight";
  }
  if (bmi >= 40) {
    resultDisplay.style.backgroundColor = "rgb(226, 43, 43)";
    bmiResultText.innerHTML = "Obese";
  }

  //   clear inputs
  inputHeight.value = "";
  inputWeight.value = "";
});
