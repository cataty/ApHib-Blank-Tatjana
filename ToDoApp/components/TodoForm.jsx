function Form ({}) {
function formSubmit(){
    
}

    return (

        <form className="todo-form">
            <input type="text" placeholder="Título de la tarea" />
            <textarea placeholder="Descripción de la tarea"></textarea>
            <button type="submit" onSubmit={formSubmit}>Añadir tarea</button>
        </form>
    );
}
export default Form;