import Cocktail from "../models/cocktail.model.js";


// const cocktailModel = new CocktailsManager;

const getCocktails = async (request, response) => {
    try {
        const cocktails = await Cocktail.find();
        response.status(200).json({ msg: "OK", data: cocktails });
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const setCocktail = async (request, response) => {
    try {
        const cocktail = request.body;

        if (await Cocktail.findOne({ name: cocktail.name })) {
            return response.status(400).json({ error: 'Un cocktail con este nombre ya existe' });
        } else {

            const newCocktail = new Cocktail(cocktail);
            newCocktail.save();

            const id = newCocktail._id;

            response.status(202).json({ msg: `Cocktail guardado, id: ${id}` });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const getCocktailById = async (request, response) => {
    try {
        const { id } = request.params;
        const cocktail = await Cocktail.findById(id);
        if (!cocktail) {
            response.status(404).json({ error: 'Cocktails no encontrado', data: cocktail });
        }
        else {
            response.status(200).json({ msg: "OK", data: cocktail });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const deleteCocktailById = async (request, response) => {
    try {
        const { id } = request.params;
        const cocktail = await Cocktail.findByIdAndDelete(id);
        if (cocktail) {
            response.status(200).json({ msg: 'Cocktail eliminado', data: cocktail });
        } else {
            response.status(404).json({ error: 'Cocktail no encontrado', data: cocktail });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const updateCocktailById = async (request, response) => {
    try {
        const { id } = request.params;
        const cocktail = await Cocktail.findByIdAndUpdate(id);
        if (cocktail) {
            response.status(200).json({ msg: 'Cocktail actualizado', data: cocktail });
        } else {
            response.status(404).json({ error: 'Cocktail no encontrado', data: cocktail });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const getCocktailsByCategory = async (request, response) => {
    try {
        const { category } = request.params;
        const cleanedCategory = category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const cocktails = await Cocktail.find({ category: cleanedCategory });
        if (!cocktails || cocktails.length == 0) {
            response.status(404).json({ error: 'Cocktails no encontrado', data: cocktails });
        }
        else {
            response.status(200).json({ msg: "OK", data: cocktails });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor', data: request.params });
    }
}

const getCocktailsByGlass = async (request, response) => {
    try {
        const { glass } = request.params;
        const cocktails = await Cocktail.find({ glass: glass });
        if (!cocktails || cocktails.length == 0) {
            response.status(404).json({ error: 'Cocktails no encontrado', data: cocktails });
        }
        else {
            response.status(200).json({ msg: "OK", data: cocktails });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const getCocktailByName = async (request, response) => {
    try {
        const { name } = request.body;
        console.log(name);
        const cleanedName = name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const cocktails = await Cocktail.find({ name: cleanedName });
        if (!cocktails || cocktails.length == 0) {
            response.status(404).json({ error: 'Cocktails no encontrado', data: cocktails });
        }
        else {
            response.status(200).json({ msg: "OK", data: cocktails });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor', data: request.params });
    }
}


export { getCocktails, getCocktailsByCategory, getCocktailsByGlass, getCocktailByName, setCocktail, getCocktailById, deleteCocktailById, updateCocktailById };