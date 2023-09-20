const canvas = document.querySelector(".canvas");
const colors = ["#619b8a", "#a1c181", "#fcca46", "#fe7f2d"];
const gravity = 0.01;
const friction = 0.99;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

class Particles {
  constructor(x, y, vel, radius, color) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.alpha = 1;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.vel.x *= friction;
    this.vel.y *= friction;
    this.alpha -= 0.005;
    this.vel.y += gravity;
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
}

let fireworksArr = [];

function init(e) {
  const radius = 2;
  let x = e.x;
  let y = e.y;
  let color = colors[Math.floor(Math.random() * colors.length)];
  const particleCount = 400;
  const angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < particleCount; i++) {
    let vel = {
      x: Math.cos(angleIncrement * i) * Math.random() * 5,
      y: Math.sin(angleIncrement * i) * Math.random() * 5,
    };
    const ball = new Particles(x, y, vel, radius, color);

    fireworksArr.push(ball);
  }
}

function animateBalls() {
  requestAnimationFrame(animateBalls);

  ctx.fillStyle = "rgba(0,0,0,0.05";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  fireworksArr.forEach((ball) => ball.update());
}
animateBalls();

addEventListener("click", init);
