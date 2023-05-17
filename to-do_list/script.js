"use strict";

// Inputs Elements
const inputTask = document.querySelector(".input_task");
const addTask = document.querySelector(".btn");

// Display Elements
const taskList = document.querySelector(".tasks");
const taskDelete = document.querySelector(".delete");

// add task
addTask.addEventListener("click", (e) => {
  e.preventDefault();
  if (!inputTask.value) return;

  const newTask = inputTask.value;
  inputTask.value = "";

  const markup = `
     <div class="task" draggable="true">
          <div class="task_text_box">
               <input type="checkbox" name="task_text" class="task_check" />
               <p class="task_text">${newTask}</p>
          </div>
     
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="delete">
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
     </div>`;

  taskList.insertAdjacentHTML("afterbegin", markup);
});

// remove task
taskList.addEventListener("click", (e) => {
  if (!e.target.closest(".delete")) return;
  e.target.closest(".task").remove();
});
