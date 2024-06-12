import style from "./style.css";

import "./ui.js";
import {
  displayAllTodoItems,
  displayWorkspaces,
  highlightInbox,
} from "./ui.js";
import { workspacesInit } from "./workspace.js";

// init workspace, it will check if localstorage already exists
// otherwise defaults are used
workspacesInit();

displayWorkspaces();
displayAllTodoItems();
highlightInbox();
