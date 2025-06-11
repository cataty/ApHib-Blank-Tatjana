import { useState, useEffect } from "react"
import ListItem from '../components/ListItem'
import Header from '../components/Header'

function CocktailsList() {

    const host = 'http://127.0.0.1:5000/api/'
    const [cocktails, setCocktails] = useState([]);
    const [cocktail, setCocktail] = useState({ _id: '', name: '', category: '', glass: '', ingredients: [], garnish: '', preparation: '' });

    async function fetchCocktails() {

        try { console.log()
            const response = await fetch(`${host}cocktails`);
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
            const response = await fetch(`${host}cocktails`, options);

            if (response.ok) {
                const { data } = await response.json();
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
            <form action="" onSubmit={postCocktail}>
                <h2>Add a new Cocktail</h2>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Category" />
                <input type="text" placeholder="Glass" />
                <input type="text" placeholder="Ingredients" />
                <input type="text" placeholder="Garnish" />
                <input type="text" placeholder="Preparation" />
                <button type="submit" >Add Cocktail</button>
            </form>
        </>
    )
}

export default CocktailsList;