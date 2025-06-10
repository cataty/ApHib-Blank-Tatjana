// import UsersManager from "../models/users.manager.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file
const secret_key = process.env.SECRET_KEY; // Get the secret key from environment variables

// const userModel = new UsersManager;

/* const getUsers = async (request, response) => {
    try {
        const users = await userModel.getUsers();
        response.status(200).json(users);
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}
 */

const getUsers = async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json({msg: "OK", data: users});
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const setUser = async (request, response) => {
    try {
        const {name, email, password} = request.body;
 
        if (await User.findOne({email: email})) {

            return response.status(400).json({ error: 'Un usuario con este email ya existe' });
        
        } else {
        const passwordHash = await bcrypt.hash(password, 10) //10 es el numero de saltos de la salt, se puede cambiar
        const newUser = new User({name, email, password: passwordHash});
        newUser.save();

        const id = newUser._id;
        response.status(202).json({ msg: `Usuario guardado, id: ${id}` });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const getUserById = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
        if (user) {
            response.status(200).json({msg: "OK", data: user});
        } else {
            response.status(404).json({ error: 'Usuario no encontrado', data:user });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const deleteUserById = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findByIdAndDelete(id);
        if (user) {
            response.status(200).json({ msg: 'Usuario eliminado', data:user });
        } else {
            response.status(404).json({ error: 'Usuario no encontrado', data:user });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const updateUserById = async (request, response) => {
    try {
        const { id } = request.params;
        const user = request.body;
        const updatedUser = await User.findByIdAndUpdate(id, user);
        if (updatedUser) {
            response.status(200).json({ msg: 'Usuario actualizado', data:user });
        } else {
            response.status(404).json({ error: 'Usuario no encontrado', data:user });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor', error });
    }
}

const auth = async (request, response) => {
    try {
        const { email, password } = request.body;  
        const user = await User.findOne({ email: email });
        if (!user) {
            return response.status(400).json({ error: 'Usuario no encontrado' });
        } else {
            const isValid = await bcrypt.compare(password, user.password); //compara el password ingresado con el guardado en la base de datos
            if (isValid) {
                response.status(200).json({ msg: 'Usuario autenticado', data:user });
                const jwt = jsonwebtoken.sign({id: user._id }, secret_key, { expiresIn: '2h' });
            } else {
             //signa el token con el id del usuario y la secret key
                response.status(400).json({ error: 'Contraseña incorrecta' });
            }
        }
    }
    catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}


export {getUsers, setUser, getUserById, deleteUserById, updateUserById, auth};