var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "ankush_web_app"
})

con.connect(function (err){
    if (err) throw err;
    console.log("db connected");
})

module.exports = {con}