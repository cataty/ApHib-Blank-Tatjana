import UsersManager from "../models/users.manager";

const userModel = new UsersManager;

const getUsers = async (request, response) => {
    try {
        const users = await userModel.getUsers();
        response.status(200).json(users);
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const setUser = async (request, response) => {
    try {
        const user = request.body;
        console.log({ user })
        const id = await userModel.setUser(user);

        response.status(202).json({ msg: `Usuario guardado ${id}` });
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

const getUserById = async (request, response) => {
    try {
        const { id } = request.params;
        const user = request.body;
        const result = await userModel.getUserbyId(id);
        if (result) {
            response.status(200).json(user);
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
        const user = request.body;
        const result = await userModel.deleteUserById(id);
        if (result) {
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
        const result = await userModel.updateUserById(id);
        if (result) {
            response.status(200).json({ msg: 'Usuario actualizado', data:user });
        } else {
            response.status(404).json({ error: 'Usuario no encontrado', data:user });
        }
    } catch (error) {
        console.error({ error });
        response.status(500).json({ error: 'Error del servidor' });
    }
}

export {getUsers, setUser, getUserById, deleteUserById, updateUserById};