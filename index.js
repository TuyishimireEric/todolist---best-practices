/* eslint-disable no-use-before-define */
import './style.css';
// import { removeCompletedTodos, changeTodoStatus } from './interactive.js';

const newTodoForm = document.querySelector('#new-todo-form');
const todoList = document.querySelector('.todo-list');
let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function start() {
  newTodoForm.addEventListener('submit', newTodo);
  updateList();
}

function updateList() {
  const description = todos.map((todo) => `
            <li class="card todo-list-item ${todo.complete ? 'completed' : ''}" data-id="${todo.id}">
              <input type="checkbox" ${todo.completed ? 'checked' : ''} class="checkbox"/>
              <input type="text"value="${todo.description}" class="inputtext"/>
              <button type="button">🗑</button>
            </li>
          `).join('');

  todoList.innerHTML = description;

  const deleteButtons = todoList.querySelectorAll('.todo-list-item button');

  deleteButtons.forEach((button) => button.addEventListener('click', (event) => {
    const li = event.target.parentElement;
    removeTodo(li.id);
  }));

  const completedCheckboxes = todoList.querySelectorAll('.checkbox');
  completedCheckboxes.forEach((checkbox) => checkbox.addEventListener('click', changeTodoStatus));
}

function newTodo(e) {
  e.preventDefault();

  const newTodoText = this.querySelector('[name="new-todo-content"]');
  const description = newTodoText.value || '';

  if (description.length === 0) {
    return;
  }

  const newTodo = {
    description: newTodoText.value,
    completed: false,
    id: todos.length,
  };

  newTodoText.value = '';
  todos = [...todos, newTodo];
  localStorage.setItem('todos', JSON.stringify(todos));
  updateList();
}

const removeTodo = (targetIndex) => {
  const filterTodo = todos.filter((todo) => +todo.id !== +targetIndex);
  const newTodos = filterTodo.map((todo, id) => ({
    description: todo.description,
    completed: todo.completed,
    id,
  }));
  localStorage.setItem('todos', JSON.stringify(newTodos));
  todos = newTodos;
  updateList();
};

start();

document.querySelector('.clearComplete').addEventListener('click').removeCompletedTodos();
const changeTodoStatus = ({ index, status }) => {
  todos[index - 1].completed = status;
  localStorage.setItem('todos', JSON.stringify(todos));
  updateList();
};
