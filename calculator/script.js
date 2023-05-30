"use strict";

const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const input1 = document.querySelector(".input1");
const input2 = document.querySelector(".input2");
const operator = document.querySelector(".input2 span");
const result = document.querySelector(".result");

calculator.addEventListener("click", (event) => {
  if (event.target.closest(".display")) return;
  const button = event.target.innerHTML;
  console.log(button);
});
