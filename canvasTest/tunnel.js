const canvas = document.querySelector(".canvas");
const mouse = { x: undefined, y: undefined };
const center = { x: innerWidth / 2, y: innerHeight / 2 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

addEventListener("mousemove", (e) => {
  center.x = e.x;
  center.y = e.y;
});
addEventListener("mouseout", () => {
  center.x = innerWidth / 2;
  center.y = innerHeight / 2;
});

class Dots {
  constructor(x, y, radius, vel, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vel = vel;
    this.ttl = 1000;
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

    this.x += this.vel.x;
    this.y += this.vel.y;
    this.ttl--;
    this.color = `hsl(${255 % (this.ttl / 4)},50%,50%)`;
  }
}

let ballArr = [];

function init() {
  const size = 30;
  const radius = 5;
  const radians = (Math.PI * 2) / 30;

  for (let i = 0; i < size; i++) {
    const x = center.x;
    const y = center.y;
    const vel = {
      x: Math.cos(i * radians) * 2,
      y: Math.sin(i * radians) * 2,
    };

    const ball = new Dots(x, y, radius, vel);

    ballArr.push(ball);
  }
}
setInterval(() => init(), 250);

function animateBalls() {
  requestAnimationFrame(animateBalls);
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  ballArr.forEach((ball, i) => {
    if (ball.ttl <= 0) {
      ballArr.splice(i, 1);
    } else {
      ball.update();
    }
  });
}
animateBalls();
