require('dotenv').config();
const mysql = require('mysql2');

// const port = process.env.PORT || 5000;

// module.exports = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
//   });


  const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });


con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    
});

module.exports = con;
  

// module.exports = () => {
//   con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");

