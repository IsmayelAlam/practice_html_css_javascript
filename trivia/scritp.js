"use strict";

// dom Element
const score = document.querySelector(".score");
const questions = document.querySelector(".all_questions");

let response = [];
let scores = 0.0;
const letters = ["A", "B", "C", "D", "E", "F"];
const apiUrl =
  "https://quizapi.io/api/v1/questions?apiKey=nEmu3lj3XsOy0uFHACa3CJzUqhPfq0pe7JwDTYHZ&limit=10";

//   load questions from api
async function loadQuestions() {
  const data = await fetch(apiUrl);
  response = await data.json();

  // create the markup it inject in the dom
  const question = response
    .map((res, i) => {
      let ans = [];
      for (let [key, value, i] of Object.entries(res.answers)) {
        if (!value) continue;
        ans.push(
          `<p class="answer ${key}_correct"><span>${
            letters[ans.length]
          }:</span> ${value.replace("<", "&lt;").replace(">", "&gt;")}</p>`
        );
      }
      return `<div class="question ${i}">
            <p class="question">${i + 1}: ${res.question}</p>
            <div class="answers">
            ${ans.join("")}
            </div>
          </div>`;
    })
    .join("");

  // add the questions to the html
  questions.innerHTML = question;
}

// load the questions when the window load is done
window.addEventListener("load", loadQuestions);

// evaluate the answers
questions.addEventListener("click", (e) => {
  // default checks
  const getAnswer = e.target.closest(".answer");
  if (!getAnswer) return;
  const getQuestion = e.target.closest(".question")?.classList[1];
  if (!getQuestion) return;

  // evaluate the answers
  if (
    response[+getQuestion].correct_answers[getAnswer.classList[1]] === "true"
  ) {
    getAnswer.classList.add("right");
    getAnswer.classList.remove("answer");
    scores++;
  } else {
    getAnswer.classList.add("wrong");
    getAnswer.classList.remove("answer");
    scores -= 0.25;
  }

  // update the score for each answer
  score.innerHTML = `Score: ${scores}/10`;
});
