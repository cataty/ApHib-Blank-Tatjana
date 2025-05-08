import { colors } from "chalk";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cocktailSchema = new Schema({
    name: String,
    category: String,
    glass: String,
    ingredients: Array,
    garnish: String,
    preparation: String
 });

const Cocktail = mongoose.model("cocktail", cocktailSchema);

export default Cocktail;
