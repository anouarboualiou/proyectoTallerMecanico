//Creamos el archivo de conexion a la base de datos

require('dotenv').config();
const mysql = require('mysql2')


const link = mysql.createConnection({
    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dateStrings: true

});

link.connect((error) => {

    if (error) {
        console.error('Error de conexión MySql: ', error)
    }
    else {
        console.log('MySql conectado con éxito')
    }
})


module.exports = link