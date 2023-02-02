const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// Creamos el servidor de express
const app = express();

// Aplicamos el CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Lectura y paseo del body
app.use( express.json() )

// Ruta de autenticación
app.use( '/api/auth', require('./routes/auth') );

// Base de Datos
dbConnection()

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log( `Servidor corriendo en el puerto ${ process.env.PORT }` )
} )