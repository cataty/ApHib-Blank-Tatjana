import { useState } from "react"

function CocktailsList (){

    const [cocktails, setCocktails] = useState([]);
    
    return(
        <>
        <h2>List of Cocktails</h2>
        </>
    )
}

export default CocktailsList;