const InitVelocity = 0.01;
const IncreaseVelocity = 0.00001;

export default class Ball {
  constructor(ballEl) {
    this.ballEl = ballEl;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballEl).getPropertyValue("--x"));
  }
  set x(value) {
    this.ballEl.style.setProperty("--x", value);
  }
  get y() {
    return parseFloat(getComputedStyle(this.ballEl).getPropertyValue("--y"));
  }
  set y(value) {
    this.ballEl.style.setProperty("--y", value);
  }

  rect() {
    return this.ballEl.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0, y: 0 };

    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9 ||
      Math.abs(this.direction.y) <= 0.2 ||
      Math.abs(this.direction.y) >= 0.9
    ) {
      const heading = randomNun(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = InitVelocity;
  }

  update(delta, paddleEl) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += IncreaseVelocity * delta;
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }

    if (paddleEl.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNun(min, max) {
  return Math.random() * (max - min) + min;
}
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
