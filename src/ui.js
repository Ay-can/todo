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

const workspaceDialog = document.querySelector("#workspace-dialog");
const openWorkspaceDialogBtn = document.querySelector(
  ".sidebar-workspaces > button"
);
const closeWorkspaceDialogBtn = document.querySelector("#close-btn");
const addWorkspaceBtn = document.querySelector("#add-btn");
const workspaceForm = document.querySelector("#workspace-form");
const workspacesContainerDom = document.querySelector(".workspace-container");

const todoContainer = document.querySelector(".todo-items");
const todoDialog = document.querySelector("#todo-dialog");
const addTodoDialogBtn = document.querySelector("#add-todo-dialog");
const addTodoBtn = document.querySelector("#add-todo");
const closeTodoBtn = document.querySelector("#close-todo");
const todoForm = document.querySelector("#todo-form");

openWorkspaceDialogBtn.addEventListener("click", () => {
  workspaceDialog.showModal();
});

closeWorkspaceDialogBtn.addEventListener("click", () => {
  workspaceDialog.close();
});

addWorkspaceBtn.addEventListener("click", () => {
  addWorkspaceDom();
});

addTodoDialogBtn.addEventListener("click", () => {
  todoDialog.showModal();
});

function getHighlightedWorkspace() {
  const workspaceItems = document.querySelectorAll(".workspace-item");
  const workspacesArray = Array.from(workspaceItems);

  const highlightedWorkspace = workspacesArray.find((elem) =>
    elem.classList.contains("highlighted-workspace")
  );

  return highlightedWorkspace;
}

function addTodoToDom() {
  const title = document.querySelector("#todo-title");
  const selectedWorkspace = getWorkspace(
    getHighlightedWorkspace().dataset.index
  );
  addTodoToWorkspace(selectedWorkspace, createTodo(title.value));
  title.value = "";
  displayWorkspaceTodo(selectedWorkspace);
}

addTodoBtn.addEventListener("click", () => {
  addTodoToDom();
  todoDialog.close();
});

closeTodoBtn.addEventListener("click", () => {
  todoDialog.close();
});

workspaceForm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addWorkspaceDom();
  }
});

todoForm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTodoToDom();
    todoDialog.close();
  }
});

const removeWorkspacesDom = () => workspacesContainerDom.replaceChildren();

function addWorkspaceDom() {
  const input = document.querySelector("input");
  if (input.value.trim() !== "") {
    addWorkspace(input.value);
    input.value = "";
    displayWorkspaces();
    workspaceDialog.close();
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

  //highlight first item
  workspaceItems[0].classList.add("highlighted-workspace");
}

export function displayWorkspaceTodo(workspace) {
  // remove previous
  removeWorkspaceTodo();

  workspace.todoItems.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");

    todoDiv.classList.add("todo-item");
    todoDiv.innerText = todo.title;

    deleteBtn.classList.add("delete-button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", () => {
      workspace.todoItems.splice(index, 1);
      displayWorkspaceTodo(workspace);
    });

    todoDiv.appendChild(deleteBtn);
    todoContainer.appendChild(todoDiv);
  });
}

function removeWorkspaceTodo() {
  todoContainer.replaceChildren();
}
