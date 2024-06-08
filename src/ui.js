/*
  This module is for dom related functionality
*/

import { addWorkspace, workspaces } from "./workspace";

// draw all workspaces
const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector(".sidebar-workspaces > button");
const closeDialogBtn = document.querySelector("#close-btn");
const addWorkspaceBtn = document.querySelector("#add-btn");
const form = document.querySelector("form");
const workspacesContainerDom = document.querySelector(".workspace-container");

openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

addWorkspaceBtn.addEventListener("click", () => {
  addWorkspaceDom();
});

form.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addWorkspaceDom();
  }
});

const removeWorkspacesDom = () => workspacesContainerDom.replaceChildren();

function addWorkspaceDom() {
  const input = document.querySelector("input");
  if (input.value.trim() !== "") {
    addWorkspace(input.value);
    input.value = "";
    displayWorkspaces();
    dialog.close();
  } else {
    const errorMsg = document.querySelector(".error-message");
    errorMsg.style.color = "red";
    errorMsg.innerText = "Enter atleast 1 letter";
  }
}

function displayWorkspaces() {
  // clear before populating dom again
  removeWorkspacesDom();

  workspaces.forEach((workspace, index) => {
    const workspaceItem = document.createElement("div");
    const deleteBtn = document.createElement("button");

    deleteBtn.addEventListener("click", () => {
      workspaces.splice(index, 1);
      displayWorkspaces();
    });

    workspaceItem.classList.add("workspace-item");
    deleteBtn.classList.add("delete-workspace-item");
    workspaceItem.innerText = workspace.title;
    workspaceItem.id = index;

    workspaceItem.appendChild(deleteBtn);
    workspacesContainerDom.appendChild(workspaceItem);
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
