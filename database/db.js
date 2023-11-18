import { Sequelize } from 'sequelize';

// Se crea una nueva instancia de Sequelize para establecer la conexión con la base de datos MySQL
const db = new Sequelize('tienda', 'root', '', {
    host: 'localhost', // Host donde se encuentra la base de datos (en este caso, localmente)
    dialect: 'mysql'   // Tipo de base de datos que se está utilizando (MySQL en este caso)
});

export default db; // Exportar la instancia de Sequelize para usarla en otras partes de la aplicación
