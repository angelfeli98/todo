import { Todo } from './todo.class';

export class TodoList{


    constructor(){
        //this.todos = [];
        this.cargarLocalStorage();
        this.contadorIncompletos = 0;
    }

    get getContador(){
        this.contadorIncompletos = 0;
        this.todos.forEach((todo) =>{
            (todo.completado)? '': this.contadorIncompletos++;
        });
        return this.contadorIncompletos;
    }

    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    // Borra del arreglo la terea terminada 
    borrarTodo(id){
        // El filter tiene que returnar true o false
        this.todos = this.todos.filter(tarea => tarea.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        this.todos.forEach((todo) => {
            if(todo.id == id){
                todo.completado = !todo.completado;
            }
        });
        this.guardarLocalStorage();
    }

    borrarCompletados(){
        this.todos = this.todos.filter(tarea => !tarea.completado);
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        //JSON nos convierte un onjeto en un string
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo'))
            // se puede hacer con un map()
            ? JSON.parse(localStorage.getItem('todo'))          
            : [];

        this.todos = this.todos.map( Todo.fromJson )        
    }
}