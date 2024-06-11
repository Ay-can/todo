/*
  This module is for dom related functionality
*/

import { parse, format, endOfDay, endOfToday } from "date-fns";
import { createTodo } from "./todo";
import {
  addTodoToWorkspace,
  addWorkspace,
  getWorkspace,
  getWorkspaces,
  removeWorkspace,
  setTotalInbox,
} from "./workspace";

const workspaceDialog = document.querySelector("#workspace-dialog");
const openWorkspaceDialogBtn = document.querySelector(
  ".sidebar-workspaces > button"
);
const closeWorkspaceDialogBtn = document.querySelector("#close-btn");
const addWorkspaceBtn = document.querySelector("#add-btn");
const workspaceForm = document.querySelector("#workspace-form");
const workspacesContainerDom = document.querySelector(".workspace-container");

const todoContainer = document.querySelector(".todo-items");
const todoDialog = document.querySelector("#todo-dialog");
const addTodoDialogBtn = document.querySelector("#add-todo-dialog");
const addTodoBtn = document.querySelector("#add-todo");
const closeTodoBtn = document.querySelector("#close-todo");
const todoForm = document.querySelector("#todo-form");

openWorkspaceDialogBtn.addEventListener("click", () => {
  workspaceDialog.showModal();
});

closeWorkspaceDialogBtn.addEventListener("click", () => {
  workspaceDialog.close();
});

addWorkspaceBtn.addEventListener("click", () => {
  addWorkspaceDom();
});

addTodoDialogBtn.addEventListener("click", () => {
  todoDialog.showModal();
});

function getHighlightedWorkspace() {
  const workspaceItems = document.querySelectorAll(".workspace-item");
  const workspacesArray = Array.from(workspaceItems);

  const highlightedWorkspace = workspacesArray.find((elem) =>
    elem.classList.contains("highlighted-workspace")
  );

  return highlightedWorkspace;
}

function addTodoToDom() {
  const title = document.querySelector("#todo-title");
  const description = document.querySelector("#todo-description");
  const dueDate = document.querySelector("#todo-due-date");
  const priority = document.querySelector("select");

  const selectedWorkspace = getWorkspace(
    getHighlightedWorkspace().dataset.index
  );

  // temp change
  if (todoForm.reportValidity()) {
    // if no date is given there is no deadline

    let parsedDate;
    if (dueDate.value === "") {
      parsedDate = endOfToday();
    } else {
      parsedDate = parse(dueDate.value, "yyyy-MM-dd", new Date());
    }
    // add to highlighted workspace
    addTodoToWorkspace(
      selectedWorkspace,
      createTodo(
        title.value,
        description.value,
        format(parsedDate, "PPP"),
        priority.options[priority.selectedIndex].value
      )
    );

    title.value = "";
    description.value = "";

    removeWorkspaceTodo();
    if (selectedWorkspace.title === "Inbox") {
      displayAllTodoItems();
    } else {
      displayWorkspaceTodo(selectedWorkspace);
    }
    todoDialog.close();
  }

  // also add a copy to the total inbox
}

addTodoBtn.addEventListener("click", () => {
  addTodoToDom();
});

closeTodoBtn.addEventListener("click", () => {
  todoDialog.close();
});

workspaceForm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addWorkspaceDom();
  }
});

todoForm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTodoToDom();
    todoDialog.close();
  }
});

const removeWorkspacesDom = () => workspacesContainerDom.replaceChildren();

function addWorkspaceDom() {
  const input = document.querySelector("input");
  if (input.value.trim() !== "") {
    addWorkspace(input.value);
    input.value = "";
    displayWorkspaces();
    workspaceDialog.close();
  } else {
    const errorMsg = document.querySelector(".error-message");
    errorMsg.style.color = "red";
    errorMsg.innerText = "Enter atleast 1 letter";
  }
}

export function displayWorkspaces() {
  // clear before populating dom again
  removeWorkspacesDom();

  getWorkspaces().forEach((workspace, index) => {
    const workspaceItem = document.createElement("div");
    const deleteBtn = document.createElement("button");

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeWorkspace(index);
      removeWorkspaceTodo();
      displayWorkspaces();
    });

    workspaceItem.classList.add("workspace-item");
    deleteBtn.classList.add("delete-workspace-item");
    workspaceItem.innerText = workspace.title;
    workspaceItem.dataset.index = index;

    if (workspace.isRemovable) {
      workspaceItem.appendChild(deleteBtn);
    }

    workspacesContainerDom.appendChild(workspaceItem);
  });

  enableHighlightWorkspace();
}

function enableHighlightWorkspace() {
  const workspaceItems = document.querySelectorAll(".workspace-item");

  workspaceItems.forEach((workspace) => {
    workspace.addEventListener("click", (e) => {
      e.stopPropagation();
      // convert to array to use methods: some, find
      let workspacesArray = Array.from(workspaceItems);
      let isHighlighted = workspacesArray.some((elem) =>
        elem.classList.contains("highlighted-workspace")
      );

      if (isHighlighted) {
        const previous = workspacesArray.find((elem) =>
          elem.classList.contains("highlighted-workspace")
        );

        previous.classList.toggle("highlighted-workspace");
      }

      workspace.classList.toggle("highlighted-workspace");

      // move this logic somewhere else
      const currentWorkspace = getWorkspace(workspace.dataset.index);
      removeWorkspaceTodo();
      if (currentWorkspace.title === "Inbox") {
        displayAllTodoItems();
      } else {
        displayWorkspaceTodo(getWorkspace(workspace.dataset.index));
      }
    });
  });
}

export function displayWorkspaceTodo(workspace) {
  // remove previous

  workspace.todoItems.forEach((todo, index) => {
    // preview is what the user sees before clicking on it
    const todoLeftDiv = document.createElement("div");
    const todoPreviewDiv = document.createElement("div");
    const todoDiv = document.createElement("div");
    const todoRightDiv = document.createElement("div");

    const titleP = document.createElement("p");
    const statusCheckbox = document.createElement("input");
    const todoDueDateP = document.createElement("p");
    const deleteBtn = document.createElement("button");

    todoLeftDiv.classList.add("todo-left");
    todoLeftDiv.appendChild(statusCheckbox);
    todoLeftDiv.appendChild(titleP);

    statusCheckbox.type = "checkbox";

    statusCheckbox.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    todoPreviewDiv.classList.add("todo-item");
    titleP.innerText = todo.title;

    todoDueDateP.innerText = todo.dueDate;
    setClassBasedOnPriority(todoDiv, todo.priority);

    deleteBtn.classList.add("delete-button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", () => {
      workspace.todoItems.splice(index, 1);
      removeWorkspaceTodo();

      // find a better way to do this
      // this should be done somewhere else
      const workspaceItems = document.querySelectorAll(".workspace-item");
      const workspacesArray = Array.from(workspaceItems);
      let current = workspacesArray.find((elem) =>
        elem.classList.contains("highlighted-workspace")
      );
      if (current.innerText === "Inbox") {
        displayAllTodoItems();
      } else {
        displayWorkspaceTodo();
      }
    });

    todoDiv.addEventListener("click", () => {
      todoDiv.classList.toggle("highlighted-todo");

      if (todoDiv.classList.contains("highlighted-todo")) {
        const todoDetailsDiv = document.createElement("div");
        const todoDescriptionP = document.createElement("p");

        todoPreviewDiv.style.borderBottom = "2px dashed rgb(226, 183, 20)";
        todoDescriptionP.innerText = `Description: ${todo.description}`;

        todoDetailsDiv.appendChild(todoDescriptionP);

        todoDiv.appendChild(todoDetailsDiv);
      } else {
        todoDiv.replaceChildren();
        todoDiv.appendChild(todoPreviewDiv);
        todoPreviewDiv.style.borderBottom = "";
      }
    });

    todoRightDiv.classList.add("todo-info");

    todoRightDiv.append(todoDueDateP);
    todoRightDiv.append(deleteBtn);

    todoPreviewDiv.appendChild(todoLeftDiv);
    todoPreviewDiv.appendChild(todoRightDiv);
    todoDiv.appendChild(todoPreviewDiv);

    todoContainer.appendChild(todoDiv);
  });
}

function setClassBasedOnPriority(todoDiv, priority) {
  // give each priority a css class
  switch (priority) {
    case "low":
      todoDiv.classList.add("low-priority");
      break;
    case "medium":
      todoDiv.classList.add("medium-priority");
      break;
    case "high":
      todoDiv.classList.add("high-priority");
      break;
  }
}

export function displayAllTodoItems() {
  getWorkspaces().forEach((workspace) => displayWorkspaceTodo(workspace));
}

function removeWorkspaceTodo() {
  todoContainer.replaceChildren();
}

export function highlightInbox() {
  const workspaceItems = document.querySelectorAll(".workspace-item");
  workspaceItems[0].classList.add("highlighted-workspace");
}
