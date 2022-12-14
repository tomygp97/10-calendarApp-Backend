
//* npm i nodemon -g para que la consola se actualice sola cundo hago cambios
//* npm i express
//* npm i express-validator


const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// console.log( process.env );

// Crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

// CORS
app.use(cors())

// Directorio Publico
app.use( express.static("public") );  // use: funcion que se ejectua cuando alguien hace una peticion al servidor


// Lectura y parseo del body
app.use( express.json() )



// Rutas
app.use( "/api/auth", require("./routes/auth") );
//TODO: CRUD: Eventos
app.use( "/api/events", require("./routes/events") );


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});