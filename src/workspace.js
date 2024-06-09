// each todolist of items belong to a workspace, the default one is called main

// A workspace should contain a title
// A workspace should contain a list of todo items
// You can delete a workspace

const workspaces = [];

const createWorkspace = (title) => {
  return {
    title,
    todoItems: [],
  };
};

export const getWorkspaces = () => workspaces;

export const getWorkspace = (index) => workspaces[index];

export const removeWorkspace = (index) => workspaces.splice(index, 1);

export const addTodoToWorkspace = (workspace, todo) => {
  workspace.todoItems.push(todo);
};

export const removeTodoFromWorkspace = (workspace, todoTitle) => {
  const todoItemIndex = workspace.todoItems.findIndex(
    (elem) => elem.title === todoTitle
  );
  console.log(todoItemIndex);
  workspace.todoItems.splice(todoItemIndex, 1);
};

export const addWorkspace = (title) => {
  let workspace = createWorkspace(title);
  workspaces.push(workspace);
  return workspace;
};
