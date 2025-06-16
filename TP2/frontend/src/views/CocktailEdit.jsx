import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header'

function CocktailEdit() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [cocktail, setCocktail] = useState({ _id: '', name: '', category: '', glass: '', ingredients: [], garnish: '', preparation: '' });
    const [cocktailname, setCocktailname] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    function handleChange(event) {
        setCocktail({ ...cocktail, [event.target.name]: event.target.value })
    }

    async function getCocktail(id) {
        try {
            const response = await fetch(`${API_URL}cocktails/${id}`);
            if (response.ok) {
                const { data } = await response.json();
                setCocktail(data);
                setCocktailname(data.name || 'Cocktail');
            } else {
                alert('Something went wrong fetching the cocktail data');
            }
        } catch (error) {
            console.error(error);
            console.log('Error fetching cocktail data');
        }
    }

    useEffect(() => {
        getCocktail(id);
    }, [id]);


    async function putCocktail(event) {
        event.preventDefault();
        console.log(cocktail)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cocktail),
        }
        try {
            const response = await fetch(`${API_URL}cocktails/${id}`, options); // TODO: validate input, change error msg language

            if (response.ok) {
                const { data } = await response.json();
                setCocktail({ _id: '', name: '', email: '', password: '' }); // Reset form
                alert('Cocktail edited successfully');
                navigate('/cocktails');
            } else {
                const { error } = await response.json();
                alert('Something went wrong during registration: ' + error);
                return;
            }

        } catch (error) {
            console.error(error);
            console.log('Error saving the cocktail');
        }
    }

    return (
        <>
            <Header title={`Edit Cocktail Data: ${cocktailname}`} /> 
                <form action="" onSubmit={putCocktail}>
                    <input
                        type="text"
                        placeholder={cocktail.name}
                        name="name"
                        id="name"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder={cocktail.category}
                        name="category"
                        id="category"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder={cocktail.glass}
                        name="glass"
                        id="glass"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder={cocktail.ingredients}
                        name="ingredients"
                        id="ingredients"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder={cocktail.garnish}
                        name="garnish"
                        id="garnish"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder={cocktail.preparation}
                        name="preparation"
                        id="preparation"
                        onChange={handleChange}
                    />
                    <button type="submit" >Save Cocktail</button>
                </form>
            </>
            )
}

            export default CocktailEdit