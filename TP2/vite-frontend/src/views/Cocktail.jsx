import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Toast from "../components/Toast";

function Cocktail() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [cocktail, setCocktail] = useState({ _id: '', name: '', category: '', glass: '', ingredients: [], garnish: '', preparation: '' });
    const { id } = useParams();
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const [loading, setLoading] = useState(true);


    async function getCocktail() {
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
        getCocktail();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {message &&
                <Toast
                    type={message.type}
                    text={message.text}
                />}
            <Header title={cocktail.name} />
            <div className="drink-details">
                <div className="drink-image mb-2">
                    <img
                        src={
                            cocktail.image
                                ? `${API_URL.replace(/\/api\/?$/, '/')}${cocktail.image}`
                                : "/img/cocktail_placeholder_1.png"
                        }
                        alt="cocktail placeholder"
                    /></div>
                <div>
                    <p><strong>Category: </strong> {cocktail.category}</p>
                    <p><strong>Glass: </strong> {cocktail.glass}</p>
                    <p><strong>Garnish: </strong> {cocktail.garnish}</p>
                    <p><strong>Ingredients: </strong></p>
                    <ul className="ingredients">
                        {Array.isArray(cocktail.ingredients) && cocktail.ingredients.length > 0 ? (
                            cocktail.ingredients.map((ing, idx) => (
                                <li key={idx}>
                                    {ing.amount} {ing.unit} {ing.ingredient}
                                </li>
                            ))
                        ) : (
                            <li>No ingredients listed.</li>
                        )}
                    </ul>
                    <p><strong>Preparation: </strong> {cocktail.preparation}</p>
                </div>
            </div>
        </>
    );
}

export default Cocktail;