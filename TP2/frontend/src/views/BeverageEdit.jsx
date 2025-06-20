import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header'

function BeverageEdit() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [beverage, setBeverage] = useState({ _id: '', name: '', category: '', alcoholic: '', alcoholContent: '' });
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    function handleChange(event) {
        setBeverage({ ...beverage, [event.target.name]: event.target.value })
    }

    async function getBeverage(id) {
        try {
            const response = await fetch(`${API_URL}beverages/${id}`);
            if (response.ok) {
                const { data } = await response.json();
                setBeverage(data);
            } else {
                alert('Something went wrong fetching the beverage data');
            }
        } catch (error) {
            console.error(error);
            console.log('Error fetching beverage data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBeverage(id);
    }, [id]);


    async function putBeverage(event) {
        event.preventDefault();
        console.log(beverage)
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(beverage),
        }
        try {
            const response = await fetch(`${API_URL}beverages/${id}`, options); // TODO: validate input, change error msg language

            if (response.ok) {
                const { data } = await response.json();
                navigate('/beverages', { state: { message: { text: "Beverage edited successfully!", type: "success" } } });
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
            <Header title={`Edit Beverage Data: ${beverage.name}`} />
            {message.text && ( // Display message if it exists
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )} <form onSubmit={putBeverage}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={beverage.name}
                    placeholder={beverage.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    id="category"
                    name="category"
                    value={beverage.category}
                    placeholder={beverage.category}
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
                    placeholder={beverage.alcoholContent}
                    value={beverage.alcoholContent}
                    onChange={handleChange}
                />
                <button type="submit">Save Beverage</button>
            </form>
        </>
    )
}

export default BeverageEdit