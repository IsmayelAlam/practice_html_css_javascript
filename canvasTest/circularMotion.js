const canvas = document.querySelector(".canvas");
const colors = ["#619b8a", "#a1c181", "#fcca46", "#fe7f2d", "#233d4d"];
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
    this.distance = Math.random() * 150 + 75;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw(lastPtn) {
    ctx.beginPath();
    ctx.moveTo(lastPtn.x, lastPtn.y);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.stroke();
  }

  update() {
    const lastPtn = { x: this.x, y: this.y };
    this.radians += this.v;

    this.lastPos.x += (mouse.x - this.lastPos.x) * 0.05 || 0;
    this.lastPos.y += (mouse.y - this.lastPos.y) * 0.05 || 0;

    console.log(this.lastPos);

    this.x = Math.cos(this.radians) * this.distance + this.lastPos.x;
    this.y = Math.sin(this.radians) * this.distance + this.lastPos.y;

    this.draw(lastPtn);
  }
}

function init() {
  const radius = Math.random() * 5 + 2;
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let v = Math.random() * 0.05 + 0.01;
  let radians = Math.random() * Math.PI * 2;

  return new Particles(x, y, v, radius, radians);
}

const particleArr = [];

for (let i = 0; i < 100; i++) {
  particleArr.push(init());
}

function animateCircle() {
  requestAnimationFrame(animateCircle);
  ctx.fillStyle = "rgba(0,0,0,0.25";
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  particleArr.forEach((dot) => dot.update());
}

animateCircle();
