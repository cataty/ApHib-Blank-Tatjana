function Task ({ id, name, description, state, childEvent }){
console.log({ id, name, description, state, childEvent });
    function clickHandler (){
        console.log('click', name);
        childEvent(name);
    }
    
    let stateClass;
    switch(state){
        case "pendiente":
            stateClass = "pending";
            break;
        case "en progreso":
            stateClass = "in-progress";
            break;
        case "completada":
            stateClass = "complete";
            break;
        default:
            stateClass = "";
    }
    return(
        <div className="card task">
            <p>TASK</p>
            <h3>{id}: {name}</h3>
            <p>{description}</p>
            <p className={stateClass}>{state}</p>
            <button onClick={clickHandler} type="button"> Click </button>
        </div>
    )

}

export default Task