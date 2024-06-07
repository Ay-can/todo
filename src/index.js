import style from "./style.css";

import * as workspace from "./workspace.js";
import { createTodoItem } from "./todo.js";

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

const workspaces = [];

// temp just to get the flow going
// put in modules

const workspacesDomList = document.querySelector(".workspace-list");
const openModalBtn = document.querySelector(".sidebar-workspaces > button");
const modal = document.querySelector("dialog");
const closeBtn = document.querySelector("#close-btn");
const addBtn = document.querySelector("#add-btn");
const form = document.querySelector("form");

function addItemToWorkspace() {
  const input = document.querySelector("input");
  if (input.value !== "") {
    workspaces.push(workspace.createWorkspace(input.value));
    displayWorkspaces();
    input.value = "";
    modal.close();
  } else {
    const errorMsg = document.querySelector(".error-message");
    errorMsg.style.color = "red";
    errorMsg.innerText = "Enter atleast 1 letter";
  }
}

form.onkeydown = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addItemToWorkspace();
  }
};

openModalBtn.addEventListener("click", () => {
  modal.showModal();
});

addBtn.addEventListener("click", () => {
  addItemToWorkspace();
});

closeBtn.addEventListener("click", () => {
  modal.close();
});

function removeDisplayedWorkspaces() {
  workspacesDomList.replaceChildren();
}

function displayWorkspaces() {
  // clear before populating dom again
  removeDisplayedWorkspaces();
  workspaces.forEach((workspace, index) => {
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

    workspaceItem.appendChild(deleteBtn);
    workspacesDomList.appendChild(workspaceItem);
  });
}
