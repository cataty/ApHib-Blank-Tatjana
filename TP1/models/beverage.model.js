import mongoose from "mongoose";
const Schema = mongoose.Schema;

const beverageSchema = new Schema({
    name: String,
    category: String,
    alcoholic: Boolean,
    alcoholContent: Number,
 });

const Beverage = mongoose.model("beverage", beverageSchema);

export default Beverage;
