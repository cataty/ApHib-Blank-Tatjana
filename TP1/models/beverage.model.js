import mongoose from "mongoose";
const Schema = mongoose.Schema;

const beverageSchema = new Schema({
    name: String,
        required: true,
        minlength: 3,
    category: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    alcoholic: Boolean,
            required: true,
    alcoholContent: Number,
 });

const Beverage = mongoose.model("beverage", beverageSchema);

export default Beverage;
