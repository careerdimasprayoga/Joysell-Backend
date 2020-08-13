const mysql = require("mysql")
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "arkademy_joysell"
})

connection.connect(error => {
    if(error) {
        throw error
    } else {
        console.log("Connected !");
    }
})

module.exports = connection