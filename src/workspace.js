// each todolist of items belong to a workspace, the default one is called main

// A workspace should contain a title
// A workspace should contain a list of todo items
// You can delete a workspace

export const createWorkspace = (title) => {
  return {
    title,
    todoItems: [],
  };
};

export const addTodoToWorkspace = (workspace, todo) => {
  workspace.todoItems.push(todo);
};

export const removeTodoFromWorkspace = (workspace, todo) => {
  const todoItemIndex = workspace.todoItems.findIndex((elem) => elem === todo);
  workspace.todoItems.splice(todoItemIndex, 1);
};

export const displayWorkspaceItems = (workspace) => {
  workspace.todoItems.forEach((elem) => {
    console.log(elem);
  });
};
