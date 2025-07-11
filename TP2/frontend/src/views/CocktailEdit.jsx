import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header'

function CocktailEdit() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [cocktail, setCocktail] = useState({ _id: '', name: '', category: '', glass: '', ingredients: [], garnish: '', preparation: '', image: '' });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    function handleChange(event) {
        setCocktail({ ...cocktail, [event.target.name]: event.target.value })
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    function handleIngredientsChange(event) {
        setCocktail({
            ...cocktail,
            ingredients: event.target.value
        });
    }

    function handleFocus(event) {
        setMessage({ ...message, text: "" });
    }

    async function getCocktail(id) {
        try {
            const response = await fetch(`${API_URL}cocktails/${id}`);
            if (response.ok) {
                const { data } = await response.json();
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

    useEffect(() => {
        getCocktail(id);
    }, [id]);


    async function putCocktail(event) {
        event.preventDefault();
        console.log(cocktail)
        let ingredientsArray;

        if (!Array.isArray(cocktail.ingredients)) {
            ingredientsArray = cocktail.ingredients
                .split(',')
                .map(item => {
                    const parts = item.trim().split(' ');
                    const amount = parts[0] || '';
                    const unit = parts[1] || '';
                    const ingredient = parts.slice(2).join(' ') || '';
                    return { amount, unit, ingredient };
                })
                .filter(obj => obj.amount || obj.unit || obj.ingredient); // Remove empty objects if 
        } else {
            ingredientsArray = cocktail.ingredients;
        }

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

                console.log(formData);

        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        };

        try {
            const response = await fetch(`${API_URL}cocktails/${id}`, options);

            if (response.ok) {
                const { data } = await response.json();
                setCocktail({ _id: '', name: '', category: '', glass: '', ingredients: [], garnish: '', preparation: '' }); // Reset form
                navigate('/cocktails', { state: { message: { text: "Cocktail edited successfully!", type: "success" } } });
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
        <>            {message.text && ( // Display message if it exists
            <div className={`message ${message.type}`}>
                {message.text}
            </div>
        )}
            <Header title={`Edit Cocktail Data: ${cocktail.name}`} />

            <form action="" onSubmit={putCocktail}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    value={cocktail.name}
                    name="name"
                    id="name"
                    onFocus={handleFocus}
                    onChange={handleChange}
                />

                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    value={cocktail.category}
                    name="category"
                    id="category"
                    onFocus={handleFocus}
                    onChange={handleChange}
                />

                <label htmlFor="glass">Glass</label>
                <input
                    type="text"
                    value={cocktail.glass}
                    name="glass"
                    id="glass"
                    onFocus={handleFocus}
                    onChange={handleChange}
                />

                <label htmlFor="ingredients">Ingredients</label>
                <input
                    type="text"
                    value={Array.isArray(cocktail.ingredients)
                        ? cocktail.ingredients.map(ing =>
                            [ing.amount, ing.unit, ing.ingredient].filter(Boolean).join(' ')
                        ).join(', ')
                        : cocktail.ingredients || ''
                    }
                    name="ingredients"
                    id="ingredients"
                    onFocus={handleFocus}
                    onChange={handleIngredientsChange}
                />

                <label htmlFor="garnish">Garnish</label>
                <input
                    type="text"
                    value={cocktail.garnish}
                    name="garnish"
                    id="garnish"
                    onFocus={handleFocus}
                    onChange={handleChange}
                />

                <label htmlFor="preparation">Preparation</label>
                <input
                    type="text"
                    value={cocktail.preparation}
                    name="preparation"
                    id="preparation"
                    onFocus={handleFocus}
                    onChange={handleChange}
                />
                <label htmlFor="file">Cocktail image</label>

                <img src={preview ? preview : `${API_URL.replace(/\/api\/?$/, '/')}${cocktail.image}`} alt="Cocktail image" />

                <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <button type="submit">Save Cocktail</button>
            </form>
        </>
    )
}

export default CocktailEdit