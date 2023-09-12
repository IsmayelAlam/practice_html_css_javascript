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

let mouse = {
  x: undefined,
  y: undefined,
};

const colors = ["#8ecae6", "#219ebc", "#023047", "#ffb703", "#fb8500"];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("mouseout", (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
});

class Circles {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    c.beginPath();
    c.strokeStyle = "white";
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }
  animate() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 35 &&
      mouse.x - this.x > -35 &&
      mouse.y - this.y < 35 &&
      mouse.y - this.y > -35
    ) {
      if (this.radius < 25) this.radius += 5;
    } else {
      if (this.radius > this.minRadius) this.radius -= 1;
    }

    this.draw();
  }
}

const circleArr = [];

for (let i = 0; i < 10000; i++) {
  // const radius = Math.random() * 5 + 2;
  const radius = 0;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;

  let dx = (Math.random() - 0.5) * 2.5;
  let dy = (Math.random() - 0.5) * 2.5;

  const circle = new Circles(x, y, dx, dy, radius);

  circleArr.push(circle);
}

function animateBalls() {
  requestAnimationFrame(animateBalls);

  c.clearRect(0, 0, innerWidth, innerHeight);

  circleArr.forEach((circle) => circle.animate());
}

animateBalls();
