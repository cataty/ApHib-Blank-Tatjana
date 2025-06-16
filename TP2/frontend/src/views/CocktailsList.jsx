import { useState, useEffect } from "react"
import ListItem from '../components/ListItem'
import Header from '../components/Header'

function CocktailsList() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [cocktails, setCocktails] = useState([]);
    const [cocktail, setCocktail] = useState({ _id: '', name: '', category: '', glass: '', ingredients: [], garnish: '', preparation: '' });

    async function fetchCocktails() {

        try {
            const response = await fetch(`${API_URL}cocktails`);
            if (response.ok) {
                const { data } = await response.json();
                setCocktails(data);
            } else {
                alert('Something went wrong fetching the cocktails list');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching cocktails list');
        }
    }

    useEffect(() => {
        fetchCocktails();
    }, []);

       function handleChange(event){
    setCocktail({ ...cocktail, [event.target.name]: event.target.value })
   }

    async function postCocktail(event) {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cocktail),
        }
        try {
            const response = await fetch(`${API_URL}cocktails`, options);

            if (response.ok) {
                const { data } = await response.json();
                fetchCocktails();
            } else {
                alert('Something went wrong saving the cocktail');
            }
        } catch (error) {
            console.error(error);
            console.log('Error saving the cocktail');
        }
    }

    async function searchCocktail(event) {
        event.preventDefault();
        const cocktailName = event.target[0].value;
    }


    return (
        <>
            <Header>List of Cocktails</Header>
            <form action="" onSubmit={searchCocktail}>
                <h2>Search for a Cocktail</h2>
                <input type="text" placeholder="Search by name" />
                <button type="submit">Search</button>
            </form>
            <ul>
                {cocktails.map(cocktail => (
                    <ListItem
                        key={cocktail._id}
                        id={cocktail._id}
                        name={cocktail.name}
                        image={cocktail.image}
                    />
                ))}
            </ul>

        </>
    )
}

export default CocktailsList;