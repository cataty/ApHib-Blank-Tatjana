import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

function BeverageCreate() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [beverage, setBeverage] = useState({ _id: '', name: '', category: '', alcoholic: '', alcoholContent: '' });
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();

    function handleChange(event) {
        setBeverage({ ...beverage, [event.target.name]: event.target.value })
        setMessage({ ...message, text: "" });
    }

    function handleFocus(event) {
        setMessage({ ...message, text: "" });
    }

    async function postBeverage(event) {
        event.preventDefault();
        console.log(beverage)

        // Validations
        if (beverage.name.trim().length < 3) {
            setMessage({ ...message, text: 'Beverage name cannot be less than 3 caracters. Please check your input.' });
            return;
        }
        if (beverage.category.trim() == '') {
            setMessage({ ...message, text: 'Please complete the category field.' });
            return;
        }
        if (beverage.alcoholic && beverage.alcoholContent.trim() === '') {
            setMessage({ ...message, text: 'Please complete the alcohol content field.' });
            return;
        }

        // If all validations pass, proceed to post the beverage
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(beverage),
            // TODO: validate input, change error message language
        }
        try {
            const response = await fetch(`${API_URL}beverages`, options); // TODO: validate input, change error message language

            if (response.ok) {
                const { data } = await response.json();
                navigate('/beverages', { state: { message: { text: "Beverage created successfully!", type: "success" } } });
            } else {
                const { error } = await response.json();
                setMessage({...message, text: error})
                return;
            }

        } catch (error) {
            console.error(error);
            setMessage({...message, text: error})
        }
    }

    return (
        <>
            <Header title="Create Beverage" />
            <p>Fill in the form below to create a new beverage.</p>

            {message.text && ( // Display message if it exists
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={postBeverage}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={beverage.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={beverage.category}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                />
                <label>
                    <input
                        type="radio"
                        name="alcoholic"
                        value="yes"
                        checked={beverage.alcoholic === "true"}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    Alcoholic
                </label>
                <label>
                    <input
                        type="radio"
                        name="alcoholic"
                        value="no"
                        checked={beverage.alcoholic === "false"}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                    Non-Alcoholic
                </label>
                <input
                    type="number"
                    id="alcoholContent"
                    name="alcoholContent"
                    value={beverage.alcoholContent}
                    onChange={handleChange}
                    onFocus={handleFocus}
                />
                <button type="submit">Add Beverage</button>
            </form>
        </>
    )
}

export default BeverageCreate