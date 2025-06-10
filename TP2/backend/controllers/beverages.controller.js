import Beverage from "../models/beverage.model.js";


// const BeverageModel = new BeveragesManager;

const getBeverages = async (request, response) => {
    try {
        const beverages = await Beverage.find();
        response.status(200).json({ msg: "OK", data: beverages });
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const setBeverage = async (request, response) => {
    try {
        const beverage = request.body;

        if (await Beverage.findOne({ name: Beverage.name })) {
            return response.status(400).json({ error: 'Una bebida con este nombre ya existe' });
        } else {

            const newBeverage = new Beverage(beverage);
            newBeverage.save();

            const id = newBeverage._id;

            response.status(202).json({ msg: `Bebida guardada, id: ${id}` });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const getBeverageById = async (request, response) => {
    try {
        const { id } = request.params;
        const beverage = await Beverage.findById(id);
        if (beverage) {
            response.status(200).json({ msg: "OK", data: beverage });
        } else {
            response.status(404).json({ error: 'Bebida no encontrada', data: beverage });
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
            response.status(404).json({ error: 'Bebida no encontrada', data: beverage });
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
            response.status(200).json({ msg: 'Bebida eliminada', data: beverage });
        } else {
            response.status(404).json({ error: 'Bebida no encontrada', data: beverage });
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
            response.status(200).json({ msg: 'Bebida actualizada', data: updatedBeverage });
        } else {
            response.status(404).json({ error: 'Bebida no encontrada', data: beverage });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
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
            response.status(404).json({ error: 'Bebidas no encontradas', data: beverages });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const  getBeveragesByAlc = async (request, response) => {
    try {
        const { alcoholic=true } = request.query;
        console.log(alcoholic);
        const beverages = await Beverage.find({ alcoholic: true });
        if (beverages.length > 0) {
            response.status(200).json({ msg: "OK", data: beverages });
        }
        else {
            response.status(404).json({ error: 'Bebidas no encontradas', data: beverages });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}


export { getBeverages, getBeveragesByCategory, getBeverageByName, setBeverage, getBeverageById, deleteBeverageById, updateBeverageById,  getBeveragesByAlc };