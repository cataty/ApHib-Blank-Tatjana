import { useEffect, useState } from 'react'
import Header from '../components/Header'

function Cocktail() {
    const host = 'http://127.0.0.1:5000/api/'
    const [cocktail, setCocktail] = useState(null);
    const [loading, setLoading] = useState(true);


    async function getCocktail() {
        try {
            const response = await fetch(`${host}cocktail`);
            if (response.ok){
                const data = await response.json();
                setCocktail(data);
            } else {
                alert('Something went wrong fetching the cocktail');
            }
        } catch (error) {
            console.error('Error fetching cocktail:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Header>{cocktail.name}</Header>
            <div>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <p>{cocktail.strInstructions}</p>
                <button>edit</button>
                <button>delete</button>
            </div>
        </>
    );
}

export default Cocktail;