
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 16
    },
    email: {
        type: String,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
});

const User = mongoose.model("user", userSchema);

export default User;
