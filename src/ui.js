/*
  This module is for dom related functionality
*/

import { createTodo } from "./todo";
import {
  addTodoToWorkspace,
  addWorkspace,
  getWorkspace,
  getWorkspaces,
  removeWorkspace,
} from "./workspace";

const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector(".sidebar-workspaces > button");
const closeDialogBtn = document.querySelector("#close-btn");
const addWorkspaceBtn = document.querySelector("#add-btn");
const workspaceForm = document.querySelector("form");
const workspacesContainerDom = document.querySelector(".workspace-container");
const addTodoBtn = document.querySelector("#add-todo");

openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

addWorkspaceBtn.addEventListener("click", () => {
  addWorkspaceDom();
});

addTodoBtn.addEventListener("click", () => {
  const workspaceItems = document.querySelectorAll(".workspace-item");
  const workspacesArray = Array.from(workspaceItems);

  const getHighlightedWorkspace = workspacesArray.find((elem) =>
    elem.classList.contains("highlighted-workspace")
  );

  // get workspace object from workspace div index
  const currentWorkspace = getWorkspace(getHighlightedWorkspace.dataset.index);

  addTodoToWorkspace(currentWorkspace, createTodo("hello"));
});

workspaceForm.addEventListener("keydown", (e) => {
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

export function displayWorkspaces() {
  // clear before populating dom again
  removeWorkspacesDom();

  getWorkspaces().forEach((workspace, index) => {
    const workspaceItem = document.createElement("div");
    const deleteBtn = document.createElement("button");

    deleteBtn.addEventListener("click", () => {
      removeWorkspace(index);
      displayWorkspaces();
    });

    workspaceItem.classList.add("workspace-item");
    deleteBtn.classList.add("delete-workspace-item");
    workspaceItem.innerText = workspace.title;
    workspaceItem.dataset.index = index;

    workspaceItem.appendChild(deleteBtn);
    workspacesContainerDom.appendChild(workspaceItem);
  });

  enableHighlightWorkspace();
}

function enableHighlightWorkspace() {
  const workspaceItems = document.querySelectorAll(".workspace-item");

  workspaceItems.forEach((workspace) => {
    workspace.addEventListener("click", () => {
      // convert to array to use methods: some, find
      let workspacesArray = Array.from(workspaceItems);
      let isHighlighted = workspacesArray.some((elem) =>
        elem.classList.contains("highlighted-workspace")
      );

      if (isHighlighted) {
        const previous = workspacesArray.find((elem) =>
          elem.classList.contains("highlighted-workspace")
        );

        previous.classList.toggle("highlighted-workspace");
      }

      workspace.classList.toggle("highlighted-workspace");
      displayWorkspaceTodo(getWorkspace(workspace.dataset.index));
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
