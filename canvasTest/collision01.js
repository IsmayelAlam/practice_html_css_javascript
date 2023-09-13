const canvas = document.querySelector(".canvas");
const colors = ["#619b8a", "#a1c181", "#fcca46", "#fe7f2d", "#233d4d"];
const mouse = { x: undefined, y: undefined };
const randomColor = colors[Math.floor(Math.random() * colors.length)];

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("mouseout", (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

class Balls {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
  }
}

function init() {
  const radius = Math.random() * 50 + 25;
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let dx = (Math.random() - 0.5) * 2.5;
  let dy = (Math.random() - 0.5) * 2.5;

  return new Balls(x, y, dx, dy, radius);
}

let ball1 = init();
let ball2 = init();

function getDistance(x1, x2, y1, y2) {
  const xDist = x1 - x2;
  const yDist = y1 - y2;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function animateBalls() {
  requestAnimationFrame(animateBalls);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  ball1.update();
  ball2.update();

  ball2.y = mouse.y;
  ball2.x = mouse.x;

  const collision = getDistance(ball1.x, ball2.x, ball1.y, ball2.y);
  if (collision - ball2.radius - ball1.radius < 0) {
    ball1.color = "#ff0000";
  } else {
    ball1.color = randomColor;
  }
}

init();
animateBalls();
