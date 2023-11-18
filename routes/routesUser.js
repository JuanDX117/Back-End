import express from "express"; // Importar Express para la comunicación con el servidor
import { getAllUsers, createUser, updateUser, getUser } from "../controllers/UserController.js"; // Importar los controladores relacionados con usuarios

const router = express.Router(); // Crear un enrutador para definir las rutas

// Generación de rutas para interactuar con la base de datos mediante la API
// Rutas para diferentes funcionalidades, cada una asociada a un controlador específico
router.get('/', getAllUsers); // Obtener todos los usuarios
router.get('/:id', getUser); // Obtener un usuario por su ID
router.post('/', createUser); // Crear un nuevo usuario
router.put('/:id', updateUser); // Actualizar un usuario por su ID

export default router; // Exportar las rutas para su uso en la aplicación
