import { useState, useEffect } from "react"
import ListItem from '../components/ListItem'
import Header from '../components/Header'
import { useLocation } from "react-router-dom";

function BeveragesList() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [beverages, setBeverages] = useState([]);
    const [beverage, setBeverage] = useState({ _id: '', name: '', category: '', alcoholic: '', alcoholContent: '' });
    const [refresh, setRefresh] = useState(false);
    const [searchParams, setSearchParams] = useState({ _id: '', name: '', category: '', alcoholic: '' });
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const message = location.state?.message;
    const [loading, setLoading] = useState(true);

    async function getBeverages() {
        try {
            const response = await fetch(`${API_URL}beverages`);
            if (response.ok) {
                const { data } = await response.json();
                setBeverages(data);
            } else {
                alert('Something went wrong geting the beverages list');
            }
        } catch (error) {
            console.error(error);
            alert('Error geting beverages list');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBeverages();
    }, [refresh]);

    function handleRefresh() {
        setRefresh(prev => !prev); // Toggle to trigger useEffect
    }

    function handleChange(event) {
        setSearchParams({ ...searchParams, name: event.target.value })
    }

    async function searchBeverageByName(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}beverages/search/name?name=${searchParams.name}`);
console.log(response);
            if (response.ok) {
                const { data } = await response.json();
                setBeverages(data);
            } else {
                alert('Something went wrong fetching the beverage by name');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching beverage by name');
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {message && <div className={`message ${message.type}`}>{message.text}</div>}
            <Header>List of Beverages</Header>
            <form action="" onSubmit={searchBeverageByName}>
                <h2>Search for a Beverage</h2>
                <input
                    type="text"
                    name="name"
                    id="searchName"
                    placeholder="Search by name"
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {beverages.map(beverage => (
                    <ListItem
                        onRefresh={handleRefresh}
                        key={beverage._id}
                        id={beverage._id}
                        name={beverage.name}
                        image={beverage.image}
                    />
                ))}
            </ul>

        </>
    )
}

export default BeveragesList;