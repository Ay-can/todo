import style from "./style.css";

import { createTodoItem } from "./todo.js";
import "./ui.js";

// temp just to get the flow going
// put in modules

function enableHighlightWorkspace() {
  const workspaceItems = document.querySelectorAll(".workspace-item");
  workspaceItems.forEach((workspace) => {
    workspace.addEventListener("click", () => {
      let temp = Array.from(workspaceItems);
      if (
        temp.some((elem) => elem.classList.contains("highlighted-workspace"))
      ) {
        const previous = temp.find((elem) =>
          elem.classList.contains("highlighted-workspace")
        );
        previous.classList.toggle("highlighted-workspace");
      }
      workspace.classList.toggle("highlighted-workspace");

      displayWorkspaceTodo(workspaces[workspace.id]);
    });
  });
}

const todoContainer = document.querySelector(".todo-items");
function displayWorkspaceTodo(workspace) {
  // remove previous
  removeWorkspaceTodo();

  workspace.todoItems.forEach((todo) => {
    const todoDiv = document.createElement("div");

    todoDiv.classList.add("todo-item");
    todoDiv.innerText = todo.title;

    todoContainer.appendChild(todoDiv);
  });
}

function removeWorkspaceTodo() {
  todoContainer.replaceChildren();
}
