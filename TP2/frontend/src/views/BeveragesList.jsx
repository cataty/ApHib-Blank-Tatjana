import { useState, useEffect } from "react"
import Header from '../components/Header'

function BeveragesList (){
    const [beverages, setBeverages] = useState([]);

    return(
        <>
        <Header>List of Beverages</Header>
        </>
    )
}

export default BeveragesList;