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

const workspacesDom = document.querySelector(".workspace-list");
const addWorkspaceBtn = document.querySelector(".sidebar-workspaces > button");
const modal = document.querySelector("dialog");
const closeBtn = document.querySelector("form > button");

addWorkspaceBtn.addEventListener("click", () => {
  modal.showModal();
  workspaces.push(workspace.createWorkspace("test"));
  console.log(workspaces);
});

closeBtn.addEventListener("click", () => {
  modal.close();
});
