import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Toast from '../components/Toast';

function Beverage() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [beverage, setBeverage] = useState({});
    const [message, setMessage] = useState({ text: '', type: 'alert' }); // Default type is 'alert'
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    async function getBeverage() {
        try {
            const response = await fetch(`${API_URL}beverages/${id}`);
            if (response.ok) {
                const { data } = await response.json();
                setBeverage(data);
            } else {
                const error = await response.json();
                setMessage({ ...message, text: error })
                return;
            }
        } catch (error) {
            console.error(error);
            setMessage({ ...message, text: error })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBeverage();
    }, [id]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {message &&
                <Toast
                    type={message.type}
                    text={message.text}
                />}
            <Header title={beverage.name} />
            <div className="drink-details">
                <div className="drink-image">
                    <img
                        src={
                            beverage.image
                                ? `${API_URL.replace(/\/api\/?$/, '/')}${beverage.image}`
                                : '/img/cocktail_placeholder_2.png'
                        }
                        alt="beverage placeholder"
                    /></div>
                <div>
                    <p><strong>Category:</strong> {beverage.category}</p>
                    <p><strong>Alcoholic:</strong> {beverage.alcoholic ? "Yes" : "No"}</p>
                    {beverage.alcoholic && (
                        <p><strong>Alcohol Content:</strong> {beverage.alcoholContent}%</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Beverage;