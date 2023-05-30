"use strict";

const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");
const input1 = document.querySelector(".input1");
const input2 = document.querySelector(".input2");
const operator = document.querySelector(".operator");
const result = document.querySelector(".result");

// helper variable
let decimal = true;
let curInput = input1;
let operatorType;

function calculate(event) {
  if (!event.target.closest(".numbers")) return;
  const button = event.target.innerHTML;
  const regExpNumber = /[0-9]/;

  switch (button) {
    case ".":
      if (decimal) {
        curInput.innerHTML += button;
        decimal = false;
      }
      break;

    case "√":
      operator.innerHTML = button;
      result.innerHTML = Math.sqrt(+input1.innerHTML).toFixed(8);
      break;

    case "C":
      decimal = true;
      curInput = input1;
      operatorType = "";
      input1.innerHTML = "";
      input2.innerHTML = "";
      operator.innerHTML = "";
      result.innerHTML = "";
      break;

    case "=":
      if (!input2.innerHTML) return;
      if (operatorType === "+")
        result.innerHTML = +input1.innerHTML + +input2.innerHTML;
      if (operatorType === "-")
        result.innerHTML = +input1.innerHTML - +input2.innerHTML;
      if (operatorType === "*")
        result.innerHTML = (+input1.innerHTML * +input2.innerHTML).toFixed(5);
      if (operatorType === "/")
        result.innerHTML = (+input1.innerHTML / +input2.innerHTML).toFixed(5);
      if (operatorType === "%")
        result.innerHTML = (
          (+input1.innerHTML / +input2.innerHTML) *
          100
        ).toFixed(4);
      curInput = "";
      return;

    default:
      if (
        button === "+" ||
        button === "-" ||
        button === "*" ||
        button === "/" ||
        button === "%"
      ) {
        if (curInput.innerHTML) {
          curInput = input2;
          operatorType = button;
          operator.innerHTML = button;
        }
        break;
      }
      if (curInput.innerHTML.length < 15 && regExpNumber.test(+button)) {
        curInput.innerHTML += button;
      }
  }
}

calculator.addEventListener("click", calculate);

window.addEventListener("keydown", calculate);
