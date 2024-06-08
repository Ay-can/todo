import style from "./style.css";

import * as workspace from "./workspace.js";
import { createTodoItem } from "./todo.js";
import "./ui.js";

let school = workspace.createWorkspace("school");
workspace.addTodoToWorkspace(
  school,
  createTodoItem("finish odin project", "life depends on it really")
);

workspace.addTodoToWorkspace(
  school,
  createTodoItem("make this code better", "I really suck at coding")
);

workspace.displayWorkspaceItems(school);

// temp just to get the flow going
// put in modules

const workspacesDomList = document.querySelector(".workspace-list");

function removeDisplayedWorkspaces() {
  workspacesDomList.replaceChildren();
}

export function displayWorkspaces() {
  // clear before populating dom again
  removeDisplayedWorkspaces();

  workspace.workspaces.forEach((workspace, index) => {
    const workspaceItem = document.createElement("div");
    const deleteBtn = document.createElement("button");

    deleteBtn.addEventListener("click", () => {
      workspaces.splice(index, 1);
      displayWorkspaces();
    });

    workspaceItem.classList.add("workspace-item");
    deleteBtn.id = index;
    deleteBtn.classList.add("delete-workspace-item");
    workspaceItem.innerText = workspace.title;
    workspaceItem.id = index;

    workspaceItem.appendChild(deleteBtn);
    workspacesDomList.appendChild(workspaceItem);
  });

  enableHighlightWorkspace();
}

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

displayWorkspaces();
