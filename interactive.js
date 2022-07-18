/* eslint-disable import/no-cycle */
import { todos, updateList } from './index.js';

document.querySelector('.clearComplete').addEventListener('click').removeCompletedTodos();
const changeTodoStatus = ({ index, status }) => {
  todos[index - 1].completed = status;
  localStorage.setItem('todos', JSON.stringify(todos));
  updateList();
};

const removeCompletedTodos = () => {
  const uncompletedTodos = todos.filter((todo) => todo.completed !== true);
  const newTodos = uncompletedTodos.map((todos, id) => {
    todos.id = id + 1;
    return todos;
  });
  localStorage.setItem('todos', JSON.stringify(newTodos));
  updateList(newTodos);
};

export { removeCompletedTodos, changeTodoStatus };
