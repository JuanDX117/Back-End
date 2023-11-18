import db from "../database/db.js"; // Importar la instancia de Sequelize para la conexión a la base de datos
import { DataTypes } from "sequelize"; // Importar los tipos de datos para definir los atributos

// Definición del modelo de los usuarios en la base de datos
const UserModel = db.define('users', {
    user_name: { type: DataTypes.STRING }, // Nombre de usuario (tipo de datos: cadena de texto)
    password: { type: DataTypes.STRING }, // Contraseña (tipo de datos: cadena de texto)
    address: { type: DataTypes.STRING }, // Dirección (tipo de datos: cadena de texto)
    telephone: { type: DataTypes.STRING }, // Número de teléfono (tipo de datos: cadena de texto)
    email: { type: DataTypes.STRING }, // Dirección de correo electrónico (tipo de datos: cadena de texto)
});

export default UserModel; // Exportar el modelo de usuario para utilizarlo en otras partes de la aplicación
