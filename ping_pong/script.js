import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.querySelector(".ball"));
const paddlePlayer = new Paddle(document.querySelector(".right"));
const paddleAI = new Paddle(document.querySelector(".left"));

let lastTime;

function update(time) {
  if (lastTime) {
    const delta = time - lastTime;
    ball.update(delta);
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
