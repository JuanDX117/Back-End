import Stripe from "stripe"; // Importar la librería Stripe para manejar pagos

const striper = Stripe('sk_test_51MXhMwE3qnA4gieV1zddEIRQEaSU2Ro4yVhovCZZGzuLKMvnkc1pmksgMB0B2hcPnogMWw4zzYAoiUK0trTZ7rCY00jHqdr6ZV');
// Crear una instancia de Stripe utilizando la clave de acceso proporcionada (clave secreta)

// Función para procesar el pago utilizando la API de Stripe
export const pay = async (req, res) => {
    let { amount, id } = req.body; // Obtener el monto y el ID del método de pago del cuerpo de la solicitud
    try {
        const payment = await striper.paymentIntents.create({
            amount, // Monto a cobrar
            currency: 'COP', // Moneda (en este caso, pesos colombianos)
            description: 'shop', // Descripción del pago
            payment_method: id, // ID del método de pago
            confirm: true // Confirmar el pago automáticamente
        });

        console.log('payment', payment);
        res.json({
            message: 'payment successful',
            success: true
        });
    } catch (error) {
        console.log('error', error);
        res.json({
            message: 'payment failed',
            success: false
        });
    }
}
