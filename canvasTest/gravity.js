const canvas = document.querySelector(".canvas");
const colors = ["#619b8a", "#a1c181", "#fcca46", "#fe7f2d", "#233d4d"];
const gravity = 1;

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
    this.minRadius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    // ctx.strokeStyle = "white";
    // ctx.stroke();
  }

  update() {
    if (
      this.y + this.radius + this.dy > canvas.height ||
      this.y - this.radius <= 0
    ) {
      this.dy = -this.dy * (0.95 - this.radius * 0.005);
    } else {
      this.dy += this.radius * 0.05 + gravity;
    }
    if (
      this.x + this.radius + this.dx > innerWidth ||
      this.x - this.radius <= 0 ||
      this.dy < 0.025
    ) {
      this.dx = -this.dx * (0.95 - this.radius * 0.005);
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

let ballArr = [];

function init(e) {
  const radius = Math.random() * 25 + 10;
  let x = e.x;
  let y = e.y;
  let dx = (Math.random() - 0.5) * 2.5;
  let dy = (Math.random() - 0.5) * 2.5;

  const ball = new Balls(x, y, dx, dy, radius);

  ballArr.push(ball);
}

function animateBalls() {
  requestAnimationFrame(animateBalls);

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  ballArr.forEach((ball) => ball.update());
}
animateBalls();

window.addEventListener("click", init);
