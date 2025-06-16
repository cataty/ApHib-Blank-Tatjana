import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'

function BeverageCreate() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [beverage, setBeverage] = useState({ _id: '', name: '', category: '', alcoholic: '', alcoholContent: '' });
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();

    function handleChange(event) {
        setBeverage({ ...beverage, [event.target.name]: event.target.value })
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: beverage.name, email: beverage.email, password: beverage.password }),
            // TODO: validate input, change error message language
        }
        try {
            const response = await fetch(`${API_URL}beverages`, options); // TODO: validate input, change error message language

            if (response.ok) {
                const { data } = await response.json();
                setBeverage({ name: '', email: '', password: '', passwordRepeat: '' }); // Reset 
                setMessage({ text: 'Beverage created successfully', type: 'success' });
                navigate('/beverages');
            } else {
                const { error } = await response.json();
                alert('Something went wrong during registration: ' + error);
                return;
            }

        } catch (error) {
            console.error(error);
            console.log('Error saving the beverage');
        }
    }

    return (
        <>
            <Header title="Create Beverage" />
            <p>Fill in the form below to create a new beverage.</p>

            {message.text && ( //Only render the <h4> element if message.text is not empty, null, or false.
                <h4 className={message.type}>
                    {message.text}
                </h4>
            )}

            <form onSubmit={postBeverage}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={beverage.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={beverage.category}
                    onChange={handleChange}
                    required
                />
                <label>
                    <input
                        type="radio"
                        name="alcoholic"
                        value="yes"
                        checked={beverage.alcoholic === "true"}
                        onChange={handleChange}
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
                    />
                    Non-Alcoholic
                </label>
                <input
                    type="number"
                    id="alcoholContent"
                    name="alcoholContent"
                    value={beverage.alcoholContent}
                    onChange={handleChange}
                />
                <button type="submit">Add Beverage</button>
            </form>
        </>
    )
}

export default BeverageCreate