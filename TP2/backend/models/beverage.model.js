import mongoose from "mongoose";
const Schema = mongoose.Schema;

const beverageSchema = new Schema({
    name: { type: String,
        required: true,
        minlength: 3,
    },
    category: { type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    alcoholic: { type: Boolean,
        required: true,
    },
    alcoholContent: { type: Number,
    },
 });

const Beverage = mongoose.model("beverage", beverageSchema);

export default Beverage;
