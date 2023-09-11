"use strict";

// select the DOM Elements
const canvas = document.querySelector(".canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "#af45ff";
// c.fillRect(100, 300, 100, 100);

// //line
// c.beginPath();
// c.strokeStyle = "#af45fd";
// // start of the line
// c.moveTo(200, 200);
// // end of the line
// c.lineTo(250, 300);
// c.stroke();

// // arc
// c.beginPath();
// c.strokeStyle = "#ff4f5d";
// c.arc(window.innerWidth / 2, window.innerHeight / 2, 90, 0, Math.PI * 2, false);
// c.stroke();

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let dx = 4;
let dy = 4;
let radius = 50;

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  c.beginPath();
  c.strokeStyle = "#ff4f5d";
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.stroke();

  if (x + radius > innerWidth || x - radius < 0) dx = -dx;
  if (y + radius > innerHeight || y - radius < 0) dy = -dy;

  x += dx;
  y += dy;
}

animate();
