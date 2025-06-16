import { useState, useEffect } from "react"
import ListItem from '../components/ListItem'
import Header from '../components/Header'

function BeveragesList() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [beverages, setBeverages] = useState([]);
    const [beverage, setBeverage] = useState({ _id: '', name: '', category: '', alcoholic: '', alcoholContent: '' });

    async function getBeverages() {

        try {
            const response = await fetch(`${API_URL}beverages`);
            if (response.ok) {
                const { data } = await response.json();
                setBeverages(data);
            } else {
                alert('Something went wrong geting the beverages list');
            }
        } catch (error) {
            console.error(error);
            alert('Error geting beverages list');
        }
    }

    useEffect(() => {
        getBeverages();
    }, []);

       function handleChange(event){
    setBeverage({ ...beverage, [event.target.name]: event.target.value })
   }

    async function searchBeverage(event) {
        event.preventDefault();
        const beverageName = event.target[0].value;
    }


    return (
        <>
            <Header>List of Beverages</Header>
            <form action="" onSubmit={searchBeverage}>
                <h2>Search for a Beverage</h2>
                <input type="text" placeholder="Search by name" />
                <button type="submit">Search</button>
            </form>
            <ul>
                {beverages.map(beverage => (
                    <ListItem
                        key={beverage._id}
                        id={beverage._id}
                        name={beverage.name}
                        image={beverage.image}
                    />
                ))}
            </ul>

        </>
    )
}

export default BeveragesList;