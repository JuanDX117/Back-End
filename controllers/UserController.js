import UserModel from "../models/UserModel.js";

// Controlador: Obtener todos los usuarios en formato JSON
export const getAllUsers = async (req, res) => {
    try {
        const Users = await UserModel.findAll(); // Buscar y obtener todos los usuarios de la base de datos
        res.json(Users); // Enviar la lista de usuarios en formato JSON como respuesta
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Controlador: Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body); // Crear un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud
        res.json({ 'message': 'registro creado' }); // Enviar un mensaje JSON indicando que el registro se ha creado correctamente
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Controlador: Actualizar un usuario específico
export const updateUser = async (req, res) => {
    try {
        await UserModel.update(req.body, { where: { id: req.params.id } }); // Actualizar un usuario basado en su ID y los datos proporcionados en el cuerpo de la solicitud
        res.json({ 'message': 'registro actualizado' }); // Enviar un mensaje JSON indicando que el registro se ha actualizado correctamente
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Controlador: Obtener un usuario específico por su ID
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findAll({ where: { id: req.params.id } }); // Buscar un usuario por su ID
        res.json(user[0]); // Enviar el primer resultado encontrado en formato JSON como respuesta
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}
