import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

function CocktailCreate() {
    const API_URL = process.env.REACT_APP_API_URL;
   const [cocktail, setCocktail] = useState({ _id: '', name: '', category: '', glass: '', ingredients: [], garnish: '', preparation: '' });
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();

    function handleChange(event) {
        setCocktail({ ...cocktail, [event.target.name]: event.target.value })
    }

    async function postCocktail(event) {
        event.preventDefault();
        console.log(cocktail)

        // Validations
        if (cocktail.password !== cocktail.passwordRepeat) {
            setMessage({ ...message, text: 'Passwords do not match. Please check your input.' });
            return;
        }
        if (cocktail.name.trim().length < 3) {
            setMessage({ ...message, text: 'Cocktailname cannot be less than 3 caracters. Please check your input.' });
            return;
        }
        if (cocktail.email.trim() == '') {
            setMessage({ ...message, text: 'Please complete the Email field.' });
            return;
        }
        if (!cocktail.email.trim().includes('@')) {
            setMessage({ ...message, text: 'Invalid email format. Please check your input.' });
            return;
        }
        if (cocktail.password.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Password field.' });
            return;
        }
        if (cocktail.password.trim().length <= 6) {
            setMessage({ ...message, text: 'Password must be more than 6 characters long. Please check your input.' });
            return;
        }

        // If all validations pass, proceed to post the cocktail
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cocktail.name, email: cocktail.email, password: cocktail.password }),
            // TODO: validate input, change error message language
        }
        try {
            const response = await fetch(`${API_URL}cocktails`, options); // TODO: validate input, change error message language

            if (response.ok) {
                const { data } = await response.json();
                setCocktail({ name: '', email: '', password: '', passwordRepeat: '' }); // Reset 
                setMessage({ text: 'Cocktail created successfully', type: 'success' });
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
            <Header title="Create Cocktail" />
            <p>Fill in the form below to create a new cocktail.</p>

            {message.text && ( //Only render the <h4> element if message.text is not empty, null, or false.
                <h4 className={message.type}>
                    {message.text}
                </h4>
            )}

            <form action="" onSubmit={postCocktail}>
                <h2>Add a new Cocktail</h2>
                <input 
                type="text" 
                placeholder="Name"
                name="name"
                id="name"
                onChange={handleChange} 
                />
                <input               
                type="text" 
                placeholder="Category"
                name="category"
                id="category"
                onChange={handleChange} 
                />
                <input 
                type="text" 
                placeholder="Glass"
                name="glass"
                id="glass"
                onChange={handleChange} 
                />
                <input 
                type="text" 
                placeholder="Ingredients"
                name="ingredients"
                id="ingredients"
                onChange={handleChange} 
                />
                <input 
                type="text" 
                placeholder="Garnish"
                name="garnish"
                id="garnish"
                onChange={handleChange} 
                />
                <input 
                type="text" 
                placeholder="Preparation instructions"
                name="preparation"
                id="preparation"
                onChange={handleChange} 
                />
                <button type="submit" >Add Cocktail</button>
            </form>
        </>
    )
}

export default CocktailCreate