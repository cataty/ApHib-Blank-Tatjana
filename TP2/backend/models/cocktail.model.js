import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
    },
    glass: String,
    ingredients: {
        type: [
            {
                amount: String,
                unit: String,
                ingredient: String
            }
        ],
        required: true,
    },
    garnish: String,
    preparation: {
        type: String,
        required: true,
        minlength: 3,
    },
    image: { type: String, default: "" },
});

const Cocktail = mongoose.model("cocktail", cocktailSchema);

export default Cocktail;
