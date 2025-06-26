import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

function CocktailCreate() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [cocktail, setCocktail] = useState({ _id: '', name: '', category: '', glass: '', ingredients: [], garnish: '', preparation: '', image: '' });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();

    function handleChange(event) {
        setCocktail({ ...cocktail, [event.target.name]: event.target.value })
        setMessage({ ...message, text: "" });
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    function handleFocus(event) {
        setMessage({ ...message, text: "" });
    }

    async function postCocktail(event) {
        event.preventDefault();
        console.log(cocktail);

        const ingredientsArray = cocktail.ingredients
            .split(',')
            .map(item => {
                const parts = item.trim().split(' ');
                const amount = parts[0] || '';
                const unit = parts[1] || '';
                const ingredient = parts.slice(2).join(' ') || '';
                return { amount, unit, ingredient };
            })
            .filter(obj => obj.amount || obj.unit || obj.ingredient); // Remove empty objects if needed

        // Validations
        if (cocktail.name.trim().length < 3) {
            setMessage({ ...message, text: 'Cocktail name cannot be less than 3 characters. Please check your input.' });
            return;
        }
        if (cocktail.name.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Name field.' });
            return;
        }
        if (cocktail.category.trim().length < 3) {
            setMessage({ ...message, text: 'Cocktail category cannot be less than 3 characters. Please check your input.' });
            return;
        }
        if (cocktail.category.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Category field.' });
            return;
        }
        if (cocktail.glass.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Glass field.' });
            return;
        }
        if (cocktail.ingredients.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Ingredients field.' });
            return;
        }
        if (!cocktail.ingredients.trim().includes(',')) {
            setMessage({ ...message, text: 'Invalid ingredient format. The ingredients should be separated by a comma.' });
            return;
        }
        if (cocktail.preparation.trim().length < 10) {
            setMessage({ ...message, text: 'Cocktail preparation cannot be less than 10 characters. Please check your input.' });
            return;
        }
        if (cocktail.preparation.trim() === '') {
            setMessage({ ...message, text: 'Please complete the Preparation instructions field.' });
            return;
        }
        if (!Array.isArray(ingredientsArray)) {
            setMessage({ ...message, text: 'Ingredients must be an array.' });
            return;
        }


        // If all validations pass, proceed to post the cocktail
        const formData = new FormData();
        formData.append('name', cocktail.name);
        formData.append('category', cocktail.category);
        formData.append('glass', cocktail.glass);
        formData.append('ingredients', JSON.stringify(ingredientsArray));
        formData.append('garnish', cocktail.garnish);
        formData.append('preparation', cocktail.preparation);
        if (file) {
            formData.append('file', file);
        };

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,

            },
            body: formData,
            // TODO: validate input, change error message language
        };
        try {
            const response = await fetch(`${API_URL}cocktails`, options); // TODO: validate input, change error message language

            if (response.ok) {
                const { data } = await response.json();
                navigate('/cocktails', { state: { message: { text: "Cocktail created successfully!", type: "success" } } });
            } else {
                const { error } = await response.json();
                setMessage({ ...message, text: error })
                return;
            }

        } catch (error) {
            console.error(error);
            setMessage({ text: 'Network error', type: 'alert' });
        }
    }

    return (
        <>            {message.text && ( //Only render the <h4> element if message.text is not empty, null, or false.
            <div className={`message ${message.type}`}>
                {message.text}
            </div>
        )}

            <Header title="Create Cocktail" />
            <p>Fill in the form below to create a new cocktail.</p>


            <form action="" onSubmit={postCocktail}>
                <h2>Add a new Cocktail</h2>

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />

                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    placeholder="Category"
                    name="category"
                    id="category"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />

                <label htmlFor="glass">Glass</label>
                <input
                    type="text"
                    placeholder="Glass"
                    name="glass"
                    id="glass"
                    onChange={handleChange}
                    onFocus={handleFocus}
                />

                <label htmlFor="ingredients">Ingredients</label>
                <input
                    type="text"
                    placeholder="Ingredients"
                    name="ingredients"
                    id="ingredients"
                    onChange={handleChange}
                    onFocus={handleFocus}
                />

                <label htmlFor="garnish">Garnish</label>
                <input
                    type="text"
                    placeholder="Garnish"
                    name="garnish"
                    id="garnish"
                    onChange={handleChange}
                    onFocus={handleFocus}
                />

                <label htmlFor="preparation">Preparation instructions</label>
                <input
                    type="text"
                    placeholder="Preparation instructions"
                    name="preparation"
                    id="preparation"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />
                <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit">Add Cocktail</button>
            </form>
        </>
    )
}

export default CocktailCreate