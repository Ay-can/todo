import style from "./style.css";

import { createTodoItem } from "./todo.js";
import "./ui.js";
import { displayWorkspaces } from "./ui.js";
import {
  addTodoToWorkspace,
  addWorkspace,
  createWorkspace,
} from "./workspace.js";
import { createTodo } from "./todo";

// temp just to get the flow going
// put in modules

// Create some default values
let inbox = addWorkspace("Inbox");
let work = addWorkspace("Work");
let school = addWorkspace("School");

addTodoToWorkspace(inbox, createTodo("Fix Depression", "something cringe"));
addTodoToWorkspace(
  inbox,
  createTodo("Finish Javascript Course", "Something else")
);

addTodoToWorkspace(
  work,
  createTodo("Fix bug at homepage", "I will get fired otherwise")
);
addTodoToWorkspace(
  work,
  createTodo("Make yourself invisible", "be careful of envy")
);

displayWorkspaces();
