function Card ({ name, description, price, addFn} ){
    //console.log( price, typeof(price) );
    
    function handlerAdd(){
        console.log('click ', name);
        addFn(name);
    }


    return (
        <div className="card">
            <h4> {name}</h4>
            <h3>${ price }</h3>
            <p> { description }</p>
            <button onClick={handlerAdd } type="button"> Add </button>
        </div>
    )
}

export default Card