require('dotenv').config();
//const mysql = require('mysql2');
const mysql = require('mysql2/promise');
//const mysql = require('mysql2/promise'); // Or require('mysql')

// const con = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE
// });

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true, // Whether the pool should wait for connections to become available
    connectionLimit: 10,     // Maximum number of connections in the pool
    queueLimit: 0            // Unlimited queueing for connection requests
});

// con.connect(function (err) {
//       if (err) throw err;
//       console.log("Connected!");
    
// });

// module.exports = con;
export default pool;

//get rid of commented out code, change msql code to handle pooling and update routes
