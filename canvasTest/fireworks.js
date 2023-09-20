const canvas = document.querySelector(".canvas");
const colors = [
  "#FCFFA4",
  "#F7D13D",
  "#FB9B06",
  "#ED6925",
  "#CF4446",
  "#A52C60",
  "#781C6D",
  "#4A0C6B",
  "#1B0C41",
  "#000004",
];
const gravity = 0.1;
const friction = 0.99;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

class Particles {
  constructor(x, y, vel, radius) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.life = 0;
    this.radius = radius;
    this.color = colors[Math.floor(this.life)];
  }

  draw(color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
  }

  update() {
    if (this.life < colors.length) this.life += Math.random() * 0.05;
    this.vel.x *= friction;
    this.vel.y *= friction;
    this.vel.y += gravity;
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.draw(colors[Math.floor(this.life)]);
  }
}

let fireworksArr = [];

function init(e) {
  let x = e.x;
  let y = e.y;

  const power = Math.random() * 10 + 7.5;
  //   const color = colors[Math.floor(life)];
  const particleCount = 1000;
  const angleIncrement = (Math.PI * 2) / particleCount;

  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 2 + 1;
    let vel = {
      x: Math.cos(angleIncrement * i) * Math.random() * power,
      y: Math.sin(angleIncrement * i) * Math.random() * power,
    };
    const ball = new Particles(x, y, vel, radius);

    fireworksArr.push(ball);
  }
}

function animateBalls() {
  requestAnimationFrame(animateBalls);

  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  fireworksArr.forEach((ball, i) => {
    if (ball.x > canvas.width || ball.x < 0 || ball.y > canvas.height) {
      fireworksArr.splice(i, 1);
    } else {
      ball.update();
    }
  });
}
animateBalls();

addEventListener("click", init);
