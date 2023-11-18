import express from "express"; // Importar Express para la comunicación con el servidor
import { bookProduct, buyProducts, getAllProducts, getProduct, createProduct, updateProducts, deleteProduct } from "../controllers/ProductControllers.js"; // Importar los controladores relacionados con los productos

const router = express.Router(); // Crear un enrutador para definir las rutas

// Generación de rutas para usar la API y comunicarse con la base de datos
// Diferentes rutas para diferentes funcionalidades, cada una asociada a un controlador específico
router.get('/', getAllProducts); // Obtener todos los productos
router.put('/buy', buyProducts); // Comprar productos
router.get('/book/:id', bookProduct); // Reservar o cancelar reserva de un producto por su ID
router.get('/:id', getProduct); // Obtener un producto por su ID
router.post('/', createProduct); // Crear un nuevo producto
router.put('/:id', updateProducts); // Actualizar un producto por su ID
router.delete('/:id', deleteProduct); // Eliminar un producto por su ID

export default router; // Exportar las rutas para su uso en la aplicación
