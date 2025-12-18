import { useState, useEffect, use } from "react"
import { useLocation } from "react-router-dom";
import ListItem from '../components/ListItem'
import Header from '../components/Header'
import Accordion from "../components/Accordion";

function CocktailsList() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [cocktails, setCocktails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [glasses, setGlasses] = useState([]);
    const [searchParams, setSearchParams] = useState({ _id: '', name: '', category: '', glass: '' });
    const [refresh, setRefresh] = useState(false);
    const location = useLocation();
    const message = location.state?.message;

    const [loading, setLoading] = useState(true);

    async function getCocktails() {

        try {
            const response = await fetch(`${API_URL}cocktails`);
            if (response.ok) {
                const { data } = await response.json();
                setCocktails(data);
            } else {
                alert('Something went wrong fetching the cocktails list');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching cocktails list');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCocktails();
        getCategories();
        getGlasses();
    }, [refresh]);

  function handleRefresh() {
        setRefresh(prev => !prev); // Toggle to trigger useEffect
}

    function handleChange(event) {
        setSearchParams({ ...searchParams, [event.target.name]: event.target.value })
    }

    async function getCategories() {
        try {
            const response = await fetch(`${API_URL}cocktails/categories`);
            if (response.ok) {
                const { data } = await response.json();
                setCategories(data);
            } else {
                alert('Something went wrong fetching the categories list');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching categories list');
        }
    }

    async function getGlasses() {
        try {
            const response = await fetch(`${API_URL}cocktails/glasses`);
            if (response.ok) {
                const { data } = await response.json();
                setGlasses(data);
            } else {
                alert('Something went wrong fetching the glasses list');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching glasses list');
        }
    }

    async function searchCocktailByName(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}cocktails/search/name?name=${searchParams.name}`);
            if (response.ok) {
                const { data } = await response.json();
                setCocktails(data);
            } else {
                alert('Something went wrong fetching the cocktail by name');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching cocktail by name');
        }
    }

    async function searchCocktailsByCategory(category) {
        try {
            const response = await fetch(`${API_URL}cocktails/categories/${category}`);
            if (response.ok) {
                const { data } = await response.json();
                console.log(data);
                setCocktails(data);
            } else {
                alert('Something went wrong fetching cocktails by category');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching cocktails by category');
        }
    }

    async function searchCocktailsByGlass(glass) {
        try {
            const response = await fetch(`${API_URL}cocktails/glasses/${glass}`);
            if (response.ok) {
                const { data } = await response.json();
                setCocktails(data);
            } else {
                alert('Something went wrong fetching cocktails by glass');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching cocktails by glass');
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
                    {message && <div className={`message ${message.type}`}>{message.text}</div>}
            <Header title="List of Cocktails" />

            <form className="search" action="" onSubmit={ searchCocktailByName }>
                <label htmlFor="searchName">Type in a name to search for it</label>
                <input
                    type="text"
                    name="name"
                    id="searchName"
                    placeholder="Search by name"
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>

 <Accordion title="Filter by Category">
                <ul className="filter-list">
                    <li>
                        <a href="#" onClick={e => { e.preventDefault(); getCocktails(); }}>
                            All Categories
                        </a>
                    </li>
                    {categories.map(category => (
                        <li key={category}>
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    searchCocktailsByCategory(category);
                                }}
                            >
                                {category}
                            </a>
                        </li>
                    ))}
                </ul>
            </Accordion>

            <Accordion title="Filter by Glass">
                <ul className="filter-list">
                    <li>
                        <a href="#" onClick={e => { e.preventDefault(); getCocktails(); }}>
                            All Glasses
                        </a>
                    </li>
                    {glasses.map(glass => (
                        <li key={glass}>
                            <a
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    searchCocktailsByGlass(glass);
                                }}
                            >
                                {glass}
                            </a>
                        </li>
                    ))}
                </ul>
            </Accordion>

            <h2>Cocktails</h2>
            <ul>
                {cocktails.map(cocktail => (
                    <ListItem
                        onRefresh={handleRefresh}
                        key={cocktail._id}
                        id={cocktail._id}
                        name={cocktail.name}
                        image={cocktail.image}
                    />
                ))}
            </ul>

        </>
    )
}

export default CocktailsList;