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

class Circles {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    c.beginPath();
    c.strokeStyle = "#ff9f5d";
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.stroke();
    c.fillStyle = "#af45ff20";
    c.fill();
  }
  animate() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const circleArr = [];

for (let i = 0; i < 10; i++) {
  const radius = Math.random() * 75 + 10;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;

  let dx = Math.random() - 0.5 * 10;
  let dy = Math.random() - 0.5 * 10;

  const circle = new Circles(x, y, dx, dy, radius);

  circleArr.push(circle);
}

function animateBalls() {
  requestAnimationFrame(animateBalls);

  c.clearRect(0, 0, innerWidth, innerHeight);

  circleArr.forEach((circle) => circle.animate());
}

animateBalls();
