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
