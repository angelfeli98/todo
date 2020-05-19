
export class Todo{
    static fromJson({tarea, id, completado, crear}){
        const todoAux = new Todo(tarea);
        todoAux.id = id;
        todoAux.completado = completado;
        todoAux.crear = crear;
        return todoAux;
    }

    constructor(tarea){
        this.tarea = tarea;
        
        this.id = new Date().getTime();
        this.completado = false;
        this.crear = new Date();
    }
}