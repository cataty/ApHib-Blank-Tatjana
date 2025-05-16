import { colors } from "chalk";
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
        type: Array,
        required: true,
    },
    garnish: String,
    preparation: {
        type: String,
        required: true,
        minlength: 3,
    },
 });

const Cocktail = mongoose.model("cocktail", cocktailSchema);

export default Cocktail;
