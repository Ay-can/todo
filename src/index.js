import style from "./style.css";

import { createTodoItem } from "./todo.js";
import "./ui.js";
import { displayAllTodoItems, displayWorkspaces } from "./ui.js";
import { addTodoToWorkspace, addWorkspace } from "./workspace.js";
import { createTodo } from "./todo";

// temp just to get the flow going
// put in modules

// Create some default values
let inbox = addWorkspace("Inbox", false);
let work = addWorkspace("Work", true);
let school = addWorkspace("School", true);

addTodoToWorkspace(
  work,
  createTodo("Fix bug at homepage", "I will get fired otherwise")
);
addTodoToWorkspace(
  work,
  createTodo("Make yourself invisible", "be careful of envy")
);

addTodoToWorkspace(
  school,
  createTodo("Make yourself invisible", "be careful of envy")
);

displayWorkspaces();
displayAllTodoItems();
