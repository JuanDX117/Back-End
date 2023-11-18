import db from "../database/db.js"; // Importar la instancia de Sequelize para la conexión a la base de datos
import { DataTypes } from "sequelize"; // Importar los tipos de datos para definir los atributos

// Definición del modelo de los productos en la base de datos
const ProductModel = db.define('productos', {
    nombre: { type: DataTypes.STRING }, // Nombre del producto (tipo de datos: cadena de texto)
    precio: { type: DataTypes.NUMBER }, // Precio del producto (tipo de datos: número)
    descripcion: { type: DataTypes.TEXT }, // Descripción del producto (tipo de datos: texto largo)
    img1: { type: DataTypes.TEXT }, // URL de la imagen 1 (tipo de datos: texto largo)
    img2: { type: DataTypes.TEXT }, // URL de la imagen 2 (tipo de datos: texto largo)
    img3: { type: DataTypes.TEXT }, // URL de la imagen 3 (tipo de datos: texto largo)
    stockMax: { type: DataTypes.INTEGER }, // Stock máximo del producto (tipo de datos: número entero)
    stockMin: { type: DataTypes.INTEGER }, // Stock mínimo del producto (tipo de datos: número entero)
    stock: { type: DataTypes.INTEGER } // Stock actual del producto (tipo de datos: número entero)
});

export default ProductModel; // Exportar el modelo de producto para utilizarlo en otras partes de la aplicación
