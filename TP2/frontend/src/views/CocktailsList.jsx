import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import ListItem from '../components/ListItem'
import Header from '../components/Header'

function CocktailsList() {
    const API_URL = process.env.REACT_APP_API_URL;
    const [cocktails, setCocktails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [glasses, setGlasses] = useState([]);
    const [searchParams, setSearchParams] = useState({ _id: '', name: '', category: '', glass: '' });
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
    }, []);

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

    async function searchCocktailsByCategory(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}cocktails/categories/${searchParams.category}`);
            if (response.ok) {
                const { data } = await response.json();
                setCocktails(data);
            } else {
                alert('Something went wrong fetching cocktails by category');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching cocktails by category');
        }
    }

    async function searchCocktailsByCategoryLink(category) {
        try {
            const response = await fetch(`${API_URL}cocktails/categories/${category}`);
            if (response.ok) {
                const { data } = await response.json();
                setCocktails(data);
            } else {
                alert('Something went wrong fetching cocktails by category');
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching cocktails by category');
        }
    }

    async function searchCocktailsByGlass(event) {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}cocktails/categories/${searchParams.glass}`);
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

    async function searchCocktailsByGlassLink(glass) {
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
    return (
        <>
            <Header>List of Cocktails</Header>
            {message && <div className={`message ${message.type}`}>{message.text}</div>}
            <form action="" onSubmit={searchCocktailByName}>
                <h2>Search for a Cocktail</h2>
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

{/*             <form onSubmit={searchCocktailsByCategory}>
                <h2>Filter by Category</h2>
                <select name="category" onChange={handleChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <button type="submit">Filter</button>
            </form>

            <form onSubmit={searchCocktailsByGlass}>
                <h2>Filter by Glass</h2>
                <select name="glass" onChange={handleChange}>
                    <option value="">All Glasses</option>
                    {glasses.map(glass => (
                        <option key={glass} value={glass}>{glass}</option>
                    ))}
                </select>
                <button type="submit">Filter</button>
            </form> */}

            <h2>Filter by Category</h2>
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
                                searchCocktailsByCategoryLink(category);
                            }}
                        >
                            {category}
                        </a>
                    </li>
                ))}
            </ul>
            <h2>Filter by Glass</h2>
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
                                searchCocktailsByGlassLink(glass);
                            }}
                        >
                            {glass}
                        </a>
                    </li>
                ))}
            </ul>
            <h2>Cocktails</h2>
            <ul>
                {cocktails.map(cocktail => (
                    <ListItem
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