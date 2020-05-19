
import { Todo, TodoList } from '../classes/index';
import { todoList } from '../index';

const divTodo = document.querySelector('.todo-list');
const textTodo = document.querySelector('.new-todo');
const botonCompletos = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const contadorIn = document.querySelector('.todo-count').children;



export const crearHtml = (todo)=>{
    const htmlTodo = `
    <li class="${(todo.completado)? 'completed':''}" data-id=${todo.id}>
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    // agrega el primer elemento del div en este caso el li
    divTodo.append(div.firstElementChild);
    contadorIn[0].innerText = todoList.getContador;
    return div.firstElementChild;
}

// Eventos 

textTodo.addEventListener('keyup', ( event ) => {
    if(event.code === 'Enter' && event.target.value != ''){
        const newTodo = new Todo(event.target.value);
        todoList.nuevoTodo(newTodo);
        crearHtml(newTodo);
        textTodo.value = '';
    }
});

divTodo.addEventListener('click', ( event ) => {
    const liInput = event.target.localName;
    let todoEle = event.target.parentElement.parentElement;
    const id = todoEle.getAttribute('data-id');
    if(liInput == 'button'){
        todoList.borrarTodo(id);
        divTodo.removeChild(todoEle); 
        contadorIn[0].innerText = todoList.getContador;
        //Otra forma de hacerlo
        //todoEle.innerHTML = '';
        
    }else if(liInput.includes('input')){
        todoList.marcarCompletado(id);
        todoEle.classList.toggle('completed');
        contadorIn[0].innerText = todoList.getContador;
    }
});

botonCompletos.addEventListener('click', () => {
    todoList.borrarCompletados();
    const completos = divTodo.querySelectorAll('.completed');
    completos.forEach((completo) => {
        divTodo.removeChild(completo);
    });
    contadorIn[0].innerText = todoList.getContador;
});


ulFiltros.addEventListener('click', (event) => {
    if(!!event.target.text){
        // .classList.replace('selected filtro','filtro');
        const filtro = event.target.text;
        ulFiltros.querySelectorAll('.filtro').forEach((item) => {
            item.classList.remove('selected')
        });
        event.target.classList.add('selected');
        for(let children of divTodo.children){
            const logica = children.classList.contains('completed');
            if(filtro == 'Pendientes'){
                (logica) ? children.classList.add('hidden'):children.classList.remove('hidden');
            }else if(filtro == 'Completados'){
                (logica) ? children.classList.remove('hidden') : children.classList.add('hidden') ;
            }else{
                children.classList.remove('hidden');
            }
        };
        
        
    };
});

