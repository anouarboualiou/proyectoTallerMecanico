require('dotenv').config()

const mysql = require('mysql2')

let pool

if (!global.mysqlPool) {

    global.mysqlPool = mysql.createPool({

        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,

        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0,

        connectTimeout: 10000,

        enableKeepAlive: true,
        keepAliveInitialDelay: 0,

        dateStrings: true,

        ssl: {
            rejectUnauthorized: false
        }
    })
}

pool = global.mysqlPool

module.exports = pool