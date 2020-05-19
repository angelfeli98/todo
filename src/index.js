import './styles.css';
import { Todo, TodoList } from './classes/index';
import { crearHtml } from './javascript/components';


export const todoList = new TodoList();
todoList.todos.forEach( crearHtml );






