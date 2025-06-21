import Beverage from "../models/beverage.model.js";


// const BeverageModel = new BeveragesManager;

const getBeverages = async (request, response) => {
    try {
        const beverages = await Beverage.find();
        response.status(200).json({ msg: "OK", data: beverages });
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}

const setBeverage = async (request, response) => {
    try {
        const beverage = request.body;

        if (await Beverage.findOne({ name: beverage.name })) {
            return response.status(400).json({ error: 'A drink with this name already exists' });
        } else {

            const newBeverage = new Beverage(beverage);
            newBeverage.save();

            const id = newBeverage._id;

            response.status(202).json({ msg: `Drink saved, id: ${id}` });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}

const getBeverageById = async (request, response) => {
    try {
        const { id } = request.params;
        const beverage = await Beverage.findById(id);
        if (beverage) {
            response.status(200).json({ msg: "OK", data: beverage });
        } else {
            response.status(404).json({ error: 'Drink not found', data: beverage });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const getBeverageByName = async (request, response) => {
    try {
        const { name } = request.params;
        const cleanedName = name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const beverage = await Beverage.find({ name: cleanedName });
        if (Beverage.length > 0) {
            response.status(200).json({ msg: "OK", data: beverage });
        } else {
            response.status(404).json({ error: 'Drink not found', data: beverage });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const deleteBeverageById = async (request, response) => {
    try {
        const { id } = request.params;
        const beverage = await Beverage.findByIdAndDelete(id);
        if (beverage) {
            response.status(200).json({ msg: 'Drink deleted', data: beverage });
        } else {
            response.status(404).json({ error: 'Drink not found', data: beverage });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const updateBeverageById = async (request, response) => {
    try {
        const { id } = request.params;
        const beverage = request.body;
        const updatedBeverage = await Beverage.findByIdAndUpdate(id);
        if (beverage) {
            response.status(200).json({ msg: 'Drink updated', data: updatedBeverage });
        } else {
            response.status(404).json({ error: 'Drink not found', data: beverage });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}

const getBeveragesByCategory = async (request, response) => {
    try {
        const { category } = request.params;
        const cleanedCategory = category.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const beverages = await Beverage.find({ category: cleanedCategory });
        if (beverages.length > 0) {
            response.status(200).json({ msg: "OK", data: beverages });
        }
        else {
            response.status(404).json({ error: 'Drinks not found', data: beverages });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}

const getBeveragesByAlcoholic = async (request, response) => {
    try {

        const { alcoholic } = request.query;         // Get the 'alcoholic' query parameter as a string ("true" or "false")
        const isAlcoholic = alcoholic === "true"; // if acoholic = true, set boolean

        const beverages = await Beverage.find({ alcoholic: isAlcoholic });

        if (beverages.length > 0) {
            response.status(200).json({ msg: "OK", data: beverages });
        } else {
            response.status(404).json({ error: 'Drinks not found', data: beverages });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
};

    const getBeverageCategories = async (request, response) => {
        try {
            const categories = await Beverage.distinct('category');
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


export { getBeverages, getBeveragesByCategory, getBeverageByName, setBeverage, getBeverageById, deleteBeverageById, updateBeverageById, getBeveragesByAlcoholic, getBeverageCategories };