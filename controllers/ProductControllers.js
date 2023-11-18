// Importación de dependencias y modelos
import ProductModel from "../models/ProductModel.js";
import { productsStock, productMinStock } from "../main.js";
import { sendMail } from "../mail/mail.js";

// Controlador: Mostrar todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll(); // Obtener todos los productos de la base de datos
        res.json(products); // Enviar la lista de productos en formato JSON como respuesta
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Controlador: Mostrar un producto específico
export const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findAll({ where: { id: req.params.id } }); // Buscar un producto por su ID
        res.json(product[0]); // Enviar el primer resultado encontrado en formato JSON como respuesta
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Controlador: Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        await ProductModel.create(req.body); // Crear un nuevo producto con los datos proporcionados en el cuerpo de la solicitud
        res.json({ 'message': 'registro creado' }); // Enviar un mensaje JSON indicando que el registro se ha creado correctamente
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Controlador: Actualizar un producto existente
export const updateProducts = async (req, res) => {
    try {
        await ProductModel.update(req.body, { where: { id: req.params.id } }); // Actualizar un producto basado en su ID y los datos proporcionados en el cuerpo de la solicitud
        res.json({ 'message': 'registro actualizado' }); // Enviar un mensaje JSON indicando que el registro se ha actualizado correctamente
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Controlador: Eliminar un producto existente
export const deleteProduct = async (req, res) => {
    try {
        await ProductModel.destroy({ where: { id: req.params.id } }); // Eliminar un producto basado en su ID
        res.json({ 'message': 'registro borrado' }); // Enviar un mensaje JSON indicando que el registro se ha eliminado correctamente
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Controlador: Reservar o cancelar la reserva de un producto
export const bookProduct = async (req, res) => {
    try {
        if (req.query.f === 'unbook') { // Verificar si se quiere cancelar la reserva de un producto
            productsStock[req.params.id]++; // Incrementar el stock del producto
            return res.json('Unbooked'); // Enviar una respuesta indicando que la reserva se ha cancelado
        } else if (req.query.f === 'book') { // Verificar si se quiere reservar un producto
            if (productsStock[req.params.id] == 0) return res.json('Stockout'); // Verificar si hay stock disponible
            productsStock[req.params.id]--; // Decrementar el stock del producto
            return res.json('Booked'); // Enviar una respuesta indicando que se ha reservado el producto
        }
        res.status(400).json('Bad request'); // Enviar un mensaje de error si la solicitud es incorrecta
    } catch (error) {
        res.json({ message: error.message }); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}

// Función auxiliar: Actualizar el contenido en la base de datos después de una reserva o compra
const updateContent = async (product, quantity) => {
    const stock = await ProductModel.findAll({
        attributes: ['id', 'stock'],
        where: { id: product }
    });

    await ProductModel.update(
        { stock: stock[0].dataValues.stock - quantity[product] }, // Actualizar el stock del producto
        { where: { id: product } }
    );

    if (productMinStock[product].stockMin >= (stock[0].dataValues.stock - quantity[product])) {
        sendMail({ id: product }); // Enviar un correo si el stock alcanza un nivel mínimo
    }
}

// Controlador: Comprar productos y actualizar el stock en la base de datos
export const buyProducts = async (req, res) => {
    try {
        Object.keys(req.body).forEach(product => updateContent(product, req.body)); // Para cada producto comprado, actualizar el contenido en la base de datos
        res.json("Successful purchase"); // Enviar un mensaje JSON indicando que la compra se realizó correctamente
    } catch (error) {
        res.json(error.message); // Manejar errores y enviar un mensaje JSON en caso de excepción
    }
}
