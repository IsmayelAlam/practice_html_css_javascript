const canvas = document.querySelector(".canvas");
const mouse = { x: undefined, y: undefined };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("mouseout", (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
});
function getDistance(x1, x2, y1, y2) {
  const xDist = x1 - x2;
  const yDist = y1 - y2;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
function mapRange(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

class Particles {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = "white";
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  drawLine() {
    particlesArr.forEach((particle) => {
      if (
        particle === this ||
        getDistance(particle.x, this.x, particle.y, this.y) > 100
      )
        return;
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = this.color;
      ctx.lineWidth = mapRange(
        getDistance(particle.x, this.x, particle.y, this.y) * 0.05,
        0,
        5,
        5,
        0
      );
      ctx.stroke();
    });
  }

  update() {
    this.draw();
    this.drawLine();

    if (this.x - this.radius <= 0 || this.x + this.radius > innerWidth)
      this.dx = -this.dx;
    if (this.y - this.radius <= 0 || this.y + this.radius > innerHeight)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
  }
}
let particlesArr = [];

function init() {
  for (let i = 0; i < 200; i++) {
    const radius = Math.random() * 5 + 2.5;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = Math.random() - 0.5;
    let dy = Math.random() - 0.5;

    particlesArr.push(new Particles(x, y, dx, dy, radius));
  }
}
init();

function animateBalls() {
  requestAnimationFrame(animateBalls);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  particlesArr.forEach((particle) => particle.update());
}

animateBalls();
