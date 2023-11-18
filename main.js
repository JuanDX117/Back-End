import Express from 'express'; // Importar Express para la conexión con la API
import cors from 'cors'; // Importar cors para el intercambio de recursos de origen cruzado
import db from './database/db.js'; // Importar la conexión a la base de datos
import productRoutes from './routes/routesProducts.js'; // Importar las rutas de los productos
import userRoutes from './routes/routesUser.js'; // Importar las rutas de los usuarios
import ProductModel from './models/ProductModel.js'; // Importar el modelo de los productos
import { pay } from './routes/pay.js'; // Importar la ruta para pagos

const app = Express(); // Crear una instancia de Express

app.use(cors()); // Utilizar CORS para prevenir errores de conexión
app.use(Express.json()); // Utilizar JSON con Express

app.use('/products', productRoutes); // Rutas para los productos
app.use('/users', userRoutes); // Rutas para los usuarios
app.use('/payment', pay); // Ruta para pagos

// Intento de conexión a la base de datos
try {
    db.authenticate();
    console.log('Conexión exitosa a la base de datos');
} catch (error) {
    console.log(`Error de conexión: ${error}`);
}

const PORT = process.env.PORT || 3001; // Puerto para el servidor backend

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Obtener todos los productos del modelo ProductModel y guardarlos en un objeto
const products = await ProductModel.findAll({
    attributes: ['id', 'stock', 'stockMin', 'nombre']
});

let productsStock = {}; // Objeto para almacenar el stock de los productos
let productMinStock = {}; // Objeto para almacenar el stock mínimo de los productos

// Recorrer los productos y asignar sus atributos a los objetos correspondientes
products.forEach(product => {
    productsStock[product.dataValues.id] = product.dataValues.stock;
});

products.forEach(product => {
    productMinStock[product.dataValues.id] = { stockMin: product.dataValues.stockMin, nombre: product.dataValues.nombre };
});

console.log(productMinStock);
export { productsStock, productMinStock }; // Exportar los objetos productsStock y productMinStock
