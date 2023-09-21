const canvas = document.querySelector(".canvas");
const colors = ["#619b8a", "#a1c181", "#fcca46", "#fe7f2d", "#233d4d"];
const mouse = { x: undefined, y: undefined };
const center = { x: innerWidth / 2, y: innerHeight / 2 };

let angle = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

addEventListener("mousemove", (e) => {
  center.x += (e.x - center.x) * 0.025;
  center.y += (e.y - center.y) * 0.025;
});
addEventListener("mouseout", (e) => {
  center.x = innerWidth / 2;
  center.y = innerHeight / 2;
});

class Dots {
  constructor(x, y, distance, radius, color) {
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.x = center.x + this.distance * Math.cos(angle);
    this.y = center.y + this.distance * Math.sin(angle);

    angle += 0.025;
  }
}

let ballArr = [];

function init() {
  const size = 5000;
  const radius = 5;

  for (let i = 0; i < size; i++) {
    let distance = i / 5;
    const x = center.x + distance * Math.cos(Math.PI);
    const y = center.y + distance * Math.sin(Math.PI);
    let color = `hsl(${i % size},50%,50%)`;

    const ball = new Dots(x, y, distance, radius, color);

    ballArr.push(ball);
  }
}
init();

function animateBalls() {
  requestAnimationFrame(animateBalls);
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  ballArr.forEach((ball) => ball.update());
}
animateBalls();
