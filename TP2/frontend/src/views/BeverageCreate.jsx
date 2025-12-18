import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Toast from "../components/Toast";

function BeverageCreate() {
    const API_URL = process.env.REACT_APP_API_URL;
    const { token } = useContext(AuthContext);
    const [beverage, setBeverage] = useState({ name: '', category: '', alcoholic: '', alcoholContent: '', image: '' });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const navigate = useNavigate();

    function handleChange(event) {
        setBeverage({ ...beverage, [event.target.name]: event.target.value })
        setMessage({ ...message, text: "" });
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    function handleFocus(event) {
        setMessage({ ...message, text: "" });
    }

    async function postBeverage(event) {
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

        const formData = new FormData();
        formData.append('name', beverageToSend.name);
        formData.append('category', beverageToSend.category);
        formData.append('alcoholic', beverageToSend.alcoholic);
        formData.append('alcoholContent', beverageToSend.alcoholContent);
        if (file) {
            formData.append('file', file);
        }

        // If all validations pass, proceed to post the beverage
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,

        }

        console.log(beverage);
        try {
            const response = await fetch(`${API_URL}beverages`, options);

            if (response.ok) {
                const { data } = await response.json();
                navigate('/beverages', { state: { message: { text: "Beverage created successfully!", type: "success" } } });
            } else {
                let errorMsg = "Unknown error";
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.error?.message || errorData.error || JSON.stringify(errorData);
                } catch (e) {
                    errorMsg = await response.text();
                }
                setMessage({ ...message, text: errorMsg });
                return;
            }

        } catch (error) {
            console.error(error);
            setMessage({ ...message, text: error.message })
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

            <form encType="multipart/form-data" onSubmit={postBeverage}>
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

                <label htmlFor="file">Beverage image</label>
                <div>
                    {preview && (
                        <img class="preview" src={preview ?? null} alt="Beverage image" />
                    )}
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit">Add Beverage</button>
            </form>
        </>
    )
}

export default BeverageCreate