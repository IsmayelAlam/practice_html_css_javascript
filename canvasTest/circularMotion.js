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
  constructor(x, y, v, radius, radians, color) {
    this.x = x;
    this.y = y;
    this.v = v;
    this.radius = radius;
    this.radians = radians;
    this.lastPos = { x, y };
    this.distance =
      Math.random() *
        (innerWidth < innerHeight ? innerHeight * 1.1 : innerWidth * 1.1) +
      1;
    this.color = color;
  }

  draw(lastPtn) {
    ctx.beginPath();
    ctx.moveTo(lastPtn.x, lastPtn.y);
    ctx.lineTo(this.x, this.y);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = Math.abs(lastPtn.x - this.x + lastPtn.y - this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.lineCap = "round";
    ctx.stroke();
  }

  update() {
    const lastPtn = { x: this.x, y: this.y };
    this.radians += this.v;

    this.lastPos.x += (mouse.x - this.lastPos.x) * 0.005 || 0;
    this.lastPos.y += (mouse.y - this.lastPos.y) * 0.005 || 0;

    this.x = Math.cos(this.radians) * this.distance + this.lastPos.x;
    this.y = Math.sin(this.radians) * this.distance + this.lastPos.y;

    this.draw(lastPtn);
  }
}

function init() {
  const radius = Math.random() * 2.5 + 1;
  const x = innerWidth / 2;
  const y = innerHeight / 2;
  const v = Math.random() * 0.0005 + 0.0001;
  const radians = Math.random() * Math.PI * 2;
  const color = colors[Math.floor(Math.random() * colors.length)];

  return new Particles(x, y, v, radius, radians, color);
}

const particleArr = [];

for (let i = 0; i < 5000; i++) {
  particleArr.push(init());
}

function animateCircle() {
  requestAnimationFrame(animateCircle);
  ctx.fillStyle = "rgba(0,0,0,0.9)";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  particleArr.forEach((dot) => dot.update());
}

animateCircle();
