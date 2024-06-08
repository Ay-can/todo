/*
  This module is for dom related functionality
*/

import { addWorkspace } from "./workspace";
import { displayWorkspaces } from ".";

// draw all workspaces
const dialog = document.querySelector("dialog");
const openDialogBtn = document.querySelector(".sidebar-workspaces > button");
const closeDialogBtn = document.querySelector("#close-btn");
const addWorkspaceBtn = document.querySelector("#add-btn");
const form = document.querySelector("form");
const domWorkspacesContainer = document.querySelector(".workspace-list");

openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

addWorkspaceBtn.addEventListener("click", () => {
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
});

form.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    console.log("hello");
    addItemToWorkspace();
  }
});

const removeDomWorkspaces = () => 
