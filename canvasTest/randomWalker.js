const canvas = document.querySelector(".canvas");
const colors = ["#caf0f8", "#90e0ef", "#00b4d8", "#0077b6", "#03045e"];
const mouse = { x: undefined, y: undefined };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener("mouseout", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

class Particles {
  constructor(x, y, v) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.radius = 100;
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
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let v = Math.random() * 0.0025 + 0.001;

  return new Particles(x, y, v);
}

const particleArr = [];

for (let i = 0; i < 1; i++) {
  particleArr.push(init());
}

function animateCircle() {
  requestAnimationFrame(animateCircle);
  ctx.fillStyle = "rgba(0,0,0,0.25";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  particleArr.forEach((dot) => dot.update());
}

animateCircle();
