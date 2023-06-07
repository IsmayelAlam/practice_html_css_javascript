import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.querySelector(".ball"));
const paddlePlayer = new Paddle(document.querySelector(".right"));
const paddleAI = new Paddle(document.querySelector(".left"));
const scorePlayer = document.querySelector(".player_score1");
const scoreAI = document.querySelector(".player_score2");
const startGame = document.querySelector(".start");

let lastTime;

function update(time) {
  if (lastTime) {
    const delta = time - lastTime;
    ball.update(delta, [paddleAI.rect(), paddlePlayer.rect()]);
    paddleAI.update(delta, ball.y);

    if (isLose()) handelLose();
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}
console.log(paddleAI.rect());

function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
function handelLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    scorePlayer.textContent = parseInt(scorePlayer.textContent) + 1;
  } else {
    scoreAI.textContent = parseInt(scoreAI.textContent) + 1;
  }

  ball.reset();
  paddleAI.reset();
}

document.addEventListener("mousemove", (e) => {
  if (!lastTime) return;
  paddlePlayer.position = (e.y / window.innerHeight) * 100;
});

startGame.addEventListener("click", (event) => {
  startGame.classList.add("hidden");
  window.requestAnimationFrame(update);
});
