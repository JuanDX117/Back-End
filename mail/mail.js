import nodemailer from 'nodemailer'; // Importar la librería nodemailer que permite enviar correos electrónicos

// Crear un transportador de nodemailer que utiliza SMTP para enviar correos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Servidor SMTP de Gmail
    port: 587, // Puerto para la conexión SMTP
    auth: {
        user: 'anderadarve@gmail.com', // Usuario de Gmail
        pass: 'ziwikichbgrhmfln' // Contraseña de la cuenta de Gmail (especificada aquí, se recomienda usar variables de entorno)
    }
});

// Función para enviar un correo electrónico con el contenido especificado
export const sendMail = prod => {
    transporter.sendMail({
        from: "ecommerce <ecommerce@gmail.com>", // Dirección de correo del remitente
        to: "a.adarve@utp.edu.co", // Dirección de correo del destinatario
        subject: "Stock at its minimum", // Asunto del correo
        text: `The following product's stock with ID ${prod.id} is almost empty` // Contenido del correo
    }).then(console.info) // Manejar el resultado exitoso de enviar el correo
    .catch(console.catch) // Manejar errores si falla el envío del correo
}