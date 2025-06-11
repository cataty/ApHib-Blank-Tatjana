import { useState } from 'react'
import Header from '../components/Header'
import TodoList from '../components/TodoList'
import TodoItem from '../components/TodoItem'

function Tasks() {
    const [tasks, setTasks] = useState(() => loadTasks());
    const [task, setTask] = useState({
        titulo: "",
        descripcion: "",
    });

    function saveTasks(taskList) {
        localStorage.setItem('tasks', JSON.stringify(taskList));
        console.log('Tareas guardadas en localStorage');
    }

    function addTask(event) {
        event.preventDefault();
        const newTask = {
            id: tasks.length + 1,
            titulo: task.titulo,
            descripcion: task.descripcion,
            estado: "pendiente"
        }
        setTasks([...tasks, newTask]);
        console.log('Tarea añadida:', newTask);
        saveTasks(tasks);
        // fetch del tipo Post a la Api para guardar en la DB y/o Get para obtener la lista de tareas
        setTask({ ...task, titulo: "", descripcion: "" }); // Resetear el formulario
    }

    function loadTasks() {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks([...updatedTasks]);
        saveTasks(updatedTasks);
    }

    return (
        <>
            <h2>Tasks</h2>
            <hr></hr>
      <Header title="To Do"></Header>

      <TodoList>
        {
          tasks.map(task => (
            <TodoItem
              key={task.id}
              id={task.id}
              name={task.titulo}
              description={task.descripcion}
              state={task.estado}
            onDelete={deleteTask}
            />)
          )
        }
      </TodoList>
      
        <form className="todo-form" onSubmit={addTask}>
            <input 
            type="text" 
            placeholder="Título de la tarea" 
            value={task.titulo} 
            onChange={ (event) => setTask({...task, titulo: event.target.value})}
            />
            <textarea 
            placeholder="Descripción de la tarea" 
            value={task.descripcion}
            onChange = { (event) => setTask({...task, descripcion: event.target.value})}
            />
            <button type="submit" >Añadir tarea</button>
        </form>
        </>
    )
}

export default Tasks;