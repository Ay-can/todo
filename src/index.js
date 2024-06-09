import style from "./style.css";

import { createTodoItem } from "./todo.js";
import "./ui.js";
import { displayWorkspaces } from "./ui.js";
import { addWorkspace, createWorkspace } from "./workspace.js";

// temp just to get the flow going
// put in modules

// Create some default values
addWorkspace("Inbox");
addWorkspace("Work");
addWorkspace("School");

displayWorkspaces();
