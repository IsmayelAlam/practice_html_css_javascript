const canvas = document.querySelector(".canvas");
const colors = ["#619b8a", "#a1c181", "#fcca46", "#fe7f2d", "#233d4d"];
const mouse = { x: undefined, y: undefined };

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

class Particles {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.mass = 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update() {
    this.draw();

    if (this.x - this.radius <= 0 || this.x + this.radius > innerWidth)
      this.dx = -this.dx;
    if (this.y - this.radius <= 0 || this.y + this.radius > innerHeight)
      this.dy = -this.dy;

    for (let i = 0; i < particlesArr.length; i++) {
      if (this === particlesArr[i]) continue;
      if (isColliding(this, particlesArr[i]))
        resolveCollision(this, particlesArr[i]);
    }

    if (getDistance(this.x, mouse.x, this.y, mouse.y) + this.radius < 100) {
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

function getDistance(x1, x2, y1, y2) {
  const xDist = x1 - x2;
  const yDist = y1 - y2;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
function isColliding(particle1, particle2) {
  return (
    getDistance(particle1.x, particle2.x, particle1.y, particle2.y) -
      particle1.radius -
      particle2.radius <
    0
  );
}

function init() {
  const radius = Math.random() * 15 + 10;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 5;
  let dy = (Math.random() - 0.5) * 5;

  return new Particles(x, y, dx, dy, radius);
}

let particlesArr = [];

for (let i = 0; i < 500; i++) {
  let particle = init();
  if (i !== 0) {
    for (let j = 0; j < particlesArr.length; j++) {
      if (isColliding(particle, particlesArr[j])) {
        particle = init();
        j = -1;
      }
    }
  }

  particlesArr.push(particle);
}

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.dx - otherParticle.dx;
  const yVelocityDiff = particle.dy - otherParticle.dy;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate({ x: particle.dx, y: particle.dy }, angle);
    const u2 = rotate({ x: otherParticle.dx, y: otherParticle.dy }, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.dx = vFinal1.x;
    particle.dy = vFinal1.y;

    otherParticle.dx = vFinal2.x;
    otherParticle.dy = vFinal2.y;
  }
}

function animateBalls() {
  requestAnimationFrame(animateBalls);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  particlesArr.forEach((particle) => particle.update());
}

init();
animateBalls();
