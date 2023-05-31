const InitVelocity = 0.02;
const IncreaseVelocity = 0.000001;

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
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNun(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = InitVelocity;
  }

  update(delta) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += IncreaseVelocity * delta;
    const rect = this.rect();

    if (rect.bottom > window.innerHeight || rect.top < 0) {
      this.direction.x *= -1;
    }

    if (rect.right >= window.innerWidth || rect.left <= 0) {
      this.direction.y *= -1;
    }
  }
}

function randomNun(min, max) {
  return Math.random() * (max - min) + min;
}
