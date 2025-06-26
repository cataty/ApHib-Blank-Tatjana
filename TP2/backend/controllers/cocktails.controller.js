import Cocktail from "../models/cocktail.model.js";
import upload from "../middleware/imgUpload.js";

// const cocktailModel = new CocktailsManager;

const getCocktails = async (request, response) => {
    try {
        const cocktails = await Cocktail.find();
        response.status(200).json({ msg: "OK", data: cocktails });
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror' });
    }
}

const setCocktail = async (request, response) => {
    try {
        const cocktail = request.body;

        if (await Cocktail.findOne({ name: cocktail.name })) {
            return response.status(400).json({ error: 'A cocktail with this name already exists' });
        } else {
            if (typeof request.body.ingredients === 'string') {
                try {
                    request.body.ingredients = JSON.parse(request.body.ingredients);
                } catch (error) {
                    return response.status(400).json({ error: 'Invalid ingredients format' });
                }
            }
            const newCocktail = new Cocktail(cocktail);
            await newCocktail.save();

            const id = newCocktail._id;

            response.status(202).json({ msg: `Cocktail saved, id: ${id}` });
        }
    } catch (error) {
        console.error(error); // not { error }
        response.status(500).json({ error: error.message || 'Server error' });
    }
}

const getCocktailById = async (request, response) => {
    try {
        const { id } = request.params;
        const cocktail = await Cocktail.findById(id);
        if (!cocktail) {
            response.status(404).json({ error: 'Cocktails not found', data: cocktail });
        }
        else {
            response.status(200).json({ msg: "OK", data: cocktail });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror' });
    }
}

const deleteCocktailById = async (request, response) => {
    try {
        const { id } = request.params;
        const cocktail = await Cocktail.findByIdAndDelete(id);
        if (cocktail) {
            response.status(200).json({ msg: 'Cocktail eliminado', data: cocktail });
        } else {
            response.status(404).json({ error: 'Cocktail not found', data: cocktail });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror' });
    }
}

const updateCocktailById = async (request, response) => {
    try {
        const { id } = request.params;
        const cocktail = request.body;
        if (typeof request.body.ingredients === 'string') {
            request.body.ingredients = JSON.parse(request.body.ingredients);
        }
        const updatedCocktail = await Cocktail.findByIdAndUpdate(id, cocktail);
        if (updatedCocktail) {
            response.status(200).json({ msg: 'Cocktail updated', data: updatedCocktail });
        } else {
            response.status(404).json({ error: 'Cocktail not found', data: cocktail });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror' });
    }
}

const getCocktailsByCategory = async (request, response) => {
    try {
        const { category } = request.params;
        const cleanedCategory = category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const cocktails = await Cocktail.find({ category: cleanedCategory });
        if (!cocktails || cocktails.length == 0) {
            response.status(404).json({ error: 'Cocktails not found', data: cocktails });
        }
        else {
            response.status(200).json({ msg: "OK", data: cocktails });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror', data: request.params });
    }
}

const getCocktailsByGlass = async (request, response) => {
    try {
        const { glass } = request.params;
        const cocktails = await Cocktail.find({ glass: glass });
        if (!cocktails || cocktails.length == 0) {
            response.status(404).json({ error: 'Cocktails not found', data: cocktails });
        }
        else {
            response.status(200).json({ msg: "OK", data: cocktails });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error', data: request.params });
    }
}

const getCocktailByName = async (request, response) => {
    console.log(request.query);
    try {
        const { name } = request.query;
        console.log(name);
        const cleanedName = name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const cocktails = await Cocktail.find({ name: cleanedName });
        if (!cocktails || cocktails.length == 0) {
            response.status(404).json({ error: 'Cocktails not found', data: cocktails });
        }
        else {
            response.status(200).json({ msg: "OK", data: cocktails });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror', data: request.params });
    }
}

const getCocktailCategories = async (request, response) => {
    try {
        const categories = await Cocktail.distinct('category');
        if (!categories || categories.length == 0) {
            response.status(404).json({ error: 'No categories found', data: categories });
        }
        else {
            response.status(200).json({ msg: "OK", data: categories });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror: no categories found' });
    }
}

const getCocktailGlasses = async (request, response) => {
    try {
        const glasses = await Cocktail.distinct('glass');
        if (!glasses || glasses.length == 0) {
            response.status(404).json({ error: 'No glasses found', data: glasses });
        }
        else {
            response.status(200).json({ msg: "OK", data: glasses });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror: no glasses found' });
    }
}


export { getCocktails, getCocktailsByCategory, getCocktailsByGlass, getCocktailByName, setCocktail, getCocktailById, deleteCocktailById, updateCocktailById, getCocktailCategories, getCocktailGlasses };