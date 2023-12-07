require('dotenv').config();
const mysql = require ('mysql');
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_ROOT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    PORT: process.env.PORT,
});

module.exports = db