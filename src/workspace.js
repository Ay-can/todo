/*
  Worspace API used to modify the workspaces
*/

import { createTodo } from "./todo";
import { format } from "date-fns";

let workspaces = [];

// check if localstorage exists otherwise populate with defaults
export const workspacesInit = () => {
  if (localStorage.getItem("workspaces") === null) {
    let inbox = addWorkspace("Inbox", false);
    let school = addWorkspace("School", true);
    let work = addWorkspace("Work", true);

    addTodoToWorkspace(
      work,
      createTodo(
        "Fix bug at homepage",
        "I will get fired otherwise",
        format("2030-04-12", "PPP"),
        "low"
      )
    );
    addTodoToWorkspace(
      work,
      createTodo(
        "Finish Odin Project",
        "Just want a job",
        format("2040-04-20", "PPP"),
        "high"
      )
    );

    addTodoToWorkspace(
      school,
      createTodo(
        "Get an internship",
        "Do leetcode and stuff",
        format("2050-05-23", "PPP"),
        "medium"
      )
    );
  } else {
    // load saved workspaces
    workspaces = JSON.parse(localStorage.getItem("workspaces"));
  }
};

const createWorkspace = (title, isRemovable) => {
  return {
    title,
    todoItems: [],
    isRemovable,
  };
};

export const getWorkspaces = () => workspaces;

export const getWorkspace = (index) => workspaces[index];

export const setWorkspaces = (newWorkspaces) => (workspaces = newWorkspaces);

export const removeWorkspace = (index) => {
  workspaces.splice(index, 1);
  updateLocalStorage();
};

export const addTodoToWorkspace = (workspace, todo) => {
  workspace.todoItems.push(todo);
  updateLocalStorage();
};

export const removeTodoFromWorkspace = (workspace, index) => {
  workspace.todoItems.splice(index, 1);
  updateLocalStorage();
};

export const addWorkspace = (title, isRemovable) => {
  let workspace = createWorkspace(title, isRemovable);
  workspaces.push(workspace);
  updateLocalStorage();
  return workspace;
};

// update our localstorage with our in memory workspace
// this is not an efficient/smart way of doing this, but for now it's okay
export const updateLocalStorage = () => {
  localStorage.setItem("workspaces", JSON.stringify(workspaces));
};
