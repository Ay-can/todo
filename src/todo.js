/*
  Todo Api used to modify the todo items of each workspace
*/

export const createTodo = (title, description, dueDate, priority, status) => {
  return { title, description, dueDate, priority, status };
};
