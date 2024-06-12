// each todolist of items belong to a workspace, the default one is called main

// A workspace should contain a title
// A workspace should contain a list of todo items
// You can delete a workspace

let workspaces = [];

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
  localStorage.setItem("workspaces", JSON.stringify(workspaces));
};

export const addTodoToWorkspace = (workspace, todo) => {
  workspace.todoItems.push(todo);
  localStorage.setItem("workspaces", JSON.stringify(workspaces));
};

export const removeTodoFromWorkspace = (workspace, todoTitle) => {
  const todoItemIndex = workspace.todoItems.findIndex(
    (elem) => elem.title === todoTitle
  );
  console.log(todoItemIndex);
  workspace.todoItems.splice(todoItemIndex, 1);
};

export const addWorkspace = (title, isRemovable) => {
  let workspace = createWorkspace(title, isRemovable);
  workspaces.push(workspace);
  localStorage.setItem("workspaces", JSON.stringify(workspaces));
  return workspace;
};
