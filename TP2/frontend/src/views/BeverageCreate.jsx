import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

function BeverageCreate() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [beverage, setBeverage] = useState({ name: '', category: '', alcoholic: '', alcoholContent: '' });
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
    const beverageToSend = {
        ...beverage,
        alcoholic: beverage.alcoholic === "true" ? true : false,
        alcoholContent: beverage.alcoholContent ? parseFloat(beverage.alcoholContent) : null
    };
        // Validations
        if (beverageToSend.name.trim().length < 3) {
            setMessage({ ...message, text: 'Beverage name cannot be less than 3 caracters. Please check your input.' });
            return;
        }
        if (beverageToSend.category.trim() == '') {
            setMessage({ ...message, text: 'Please complete the category field.' });
            return;
        }
        if (beverageToSend.alcoholic === true && beverageToSend.alcoholContent.trim() === '') {
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
            body: JSON.stringify(beverageToSend),

        }
        console.log(beverage);
        try {
            const response = await fetch(`${API_URL}beverages`, options);

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
                <div>
                <label htmlFor="alcoholic">
 
                    Alcoholic
                </label>
                                   <input
                        type="radio"
                        name="alcoholic"
                        value="true"
                        checked={beverage.alcoholic === "true"}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                <label htmlFor="alcoholic">
  
                    Non-Alcoholic
                </label>
                <input
                        type="radio"
                        name="alcoholic"
                        value="false"
                        checked={beverage.alcoholic === "false"}
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                </div>
                <label htmlFor="alcoholContent">Alcohol Content</label>
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