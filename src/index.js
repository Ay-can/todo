import style from "./style.css";

import { format } from "date-fns";
import { createTodoItem } from "./todo.js";
import "./ui.js";
import {
  displayAllTodoItems,
  displayWorkspaces,
  highlightInbox,
} from "./ui.js";
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
    "Make yourself invisible",
    "be careful of envy",
    format("2040-04-20", "PPP"),
    "high"
  )
);

addTodoToWorkspace(
  school,
  createTodo(
    "Make yourself invisible",
    "be careful of envy",
    format("2050-05-23", "PPP"),
    "medium"
  )
);

displayWorkspaces();
displayAllTodoItems();
highlightInbox();
