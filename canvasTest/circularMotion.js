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
  constructor(x, y, v, radius, radians) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.radius = radius;
    this.radians = radians;
    this.lastPos = { x, y };
    this.distance = Math.random() * (innerWidth + innerHeight) + 25;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw(lastPtn) {
    ctx.beginPath();
    ctx.moveTo(lastPtn.x, lastPtn.y);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  update() {
    const lastPtn = { x: this.x, y: this.y };
    this.radians += this.v;

    this.lastPos.x += (mouse.x - this.lastPos.x) * 0.025 || 0;
    this.lastPos.y += (mouse.y - this.lastPos.y) * 0.025 || 0;

    this.x = Math.cos(this.radians) * this.distance + this.lastPos.x;
    this.y = Math.sin(this.radians) * this.distance + this.lastPos.y;

    this.draw(lastPtn);
  }
}

function init() {
  const radius = Math.random() * 5 + 2;
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let v = Math.random() * 0.0025 + 0.001;
  let radians = Math.random() * Math.PI * 2;

  return new Particles(x, y, v, radius, radians);
}

const particleArr = [];

for (let i = 0; i < 5000; i++) {
  particleArr.push(init());
}

function animateCircle() {
  requestAnimationFrame(animateCircle);
  ctx.fillStyle = "rgba(0,0,0,0.1";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2, false);
  ctx.fillStyle = "gold";
  ctx.fill();

  particleArr.forEach((dot) => dot.update());
}

animateCircle();
