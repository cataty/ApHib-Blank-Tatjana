// import UsersManager from "../models/users.manager.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config(); // Load environment variables from .env file
const secret_key = process.env.SECRET_KEY; // Get the secret key from environment variables

// const userModel = new UsersManager;

/* const getUsers = async (request, response) => {
    try {
        const users = await userModel.getUsers();
        response.status(200).json(users);
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}
 */

const getUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json({ msg: "OK", data: users });
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}

const setUser = async (request, response) => {

        if (request.file) {
            request.body.avatar ='uploads/' + request.file.filename;
        }

    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            response.status(400).json({ error: 'Required fields missing' });
        }

        if (await User.findOne({ email: email })) {

            return response.status(400).json({ error: 'A user with this email already exists' });

        } else {
            const passwordHash = await bcrypt.hash(password, 10) //10 es el numero de saltos de la salt, se puede cambiar
            const newUser = new User({ name, email, password: passwordHash });
            newUser.save();

            const id = newUser._id;
            response.status(202).json({ msg: `User saved, id: ${id}` });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}

const getUserById = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
        if (user) {
            response.status(200).json({ msg: "OK", data: user });
        } else {
            response.status(404).json({ error: 'User not found', data: user });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}

const deleteUserById = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findByIdAndDelete(id);
        if (user) {
            if (user.avatar) {
                const imagePath = path.join(process.cwd(), user.avatar);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error("Error deleting image:", err);
                    }
                });
            }
            response.status(200).json({ msg: 'User deleted', data: user });
        } else {
            response.status(404).json({ error: 'User not found', data: user });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error' });
    }
}

const updateUserById = async (request, response) => {
    try {
        const { id } = request.params;
        const user = { ...request.body };
 console.log(user);

        if (user.password && user.password.trim() !== "") {         // Only hash and update password if a new one is provided
            user.password = await bcrypt.hash(user.password, 10);
        } else {
            delete user.password;
        }

        if (request.file) {
            user.avatar ='uploads/' + request.file.filename;
        }

        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        if (updatedUser) {
            response.status(200).json({ msg: 'User updated', data: updatedUser });
            if (request.file) console.log(request.file.path);
        } else {
            response.status(404).json({ error: 'User not found', data: user });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error', error });
    }
}

const auth = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email }); //busca el usuario por email
        if (!user) {
            return response.status(400).json({ error: 'User not found' });
        } else {
            const isValid = await bcrypt.compare(password, user.password); //compara el password ingresado con el guardado en la base de datos
            if (isValid) {
                const jwt = jsonwebtoken.sign({ id: user._id }, secret_key, { expiresIn: '2h' });
                console.log(jwt); //imprime el token en la consola
                response.json({ msg: 'ok', token: jwt, user: { id: user._id, name: user.name, email: user.email, role: (user.role ? user.role : '') } });
                //signa el token con el id del usuario y la secret key
            } else {
                response.status(400).json({ error: 'Password is incorrect' });
            }
        }
    }
    catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server error at user login' });
    }
}

const getUserByName = async (request, response) => {
    console.log(request.query);
    try {
        const { name } = request.query;
        console.log(name);
        const cleanedName = name.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const user = await User.find({ name: cleanedName });
        if (!user || user.length == 0) {
            response.status(404).json({ error: 'Users not found', data: user });
        }
        else {
            response.status(200).json({ msg: "OK", data: user });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Server errror', data: request.params });
    }
}

export { getUsers, setUser, getUserById, deleteUserById, updateUserById, getUserByName, auth };