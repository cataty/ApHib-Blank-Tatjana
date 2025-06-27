import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header'

function BeverageEdit() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [beverage, setBeverage] = useState({ _id: '', name: '', category: '', alcoholic: '', alcoholContent: '', image: ''});
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    function handleChange(event) {
        setBeverage({ ...beverage, [event.target.name]: event.target.value })
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
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
        const beverageToSend = {
            ...beverage,
            alcoholic: beverage.alcoholic === "true" ? true : false,
            alcoholContent: beverage.alcoholContent ? parseFloat(beverage.alcoholContent) : 0
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
        if (beverageToSend.alcoholic === true && beverageToSend.alcoholContent === null) {
            setMessage({ ...message, text: 'Please complete the alcohol content field.' });
            return;
        }

        // If all validations pass, proceed to post the beverage

        const formData = new FormData();
        formData.append('name', beverageToSend.name);
        formData.append('category', beverageToSend.category);
        formData.append('alcoholic', beverageToSend.alcoholic);
        formData.append('alcoholContent', beverageToSend.alcoholContent);
        if (file) {
            formData.append('file', file);
        }

        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        }

        try {
            const response = await fetch(`${API_URL}beverages/${id}`, options);

            if (response.ok) {
                const { data } = await response.json();
                navigate('/beverages', { state: { message: { text: "Beverage edited successfully!", type: "success" } } });
            } else {
                const { error } = await response.json();
                alert('Something went wrong updating the drink ' + error);
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
                        value="true"
                        checked={beverage.alcoholic === true || beverage.alcoholic === "true"}
                        onChange={handleChange}
                    />
                    Alcoholic
                </label>
                <label>
                    <input
                        type="radio"
                        name="alcoholic"
                        value="false"
                        checked={beverage.alcoholic === false || beverage.alcoholic === "false"}
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

                <label htmlFor="file">Beverage image</label>

                <img src={preview ? preview : `${API_URL.replace(/\/api\/?$/, '/')}${beverage.image}`} alt="Beverage image" />

                <input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <button type="submit">Save Beverage</button>
            </form>
        </>
    )
}

export default BeverageEdit