require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require('cors')
const routerNavigation = require('./src')

const app = express();

app.use(cors()) // Izin API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}))
app.use(morgan("dev"))
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*") // Setting url apa saja yang bisa di akses
    response.header("Access-Control-Allow-Header", "Origin, X-Request-With, Content-Type, Accept, Authorization")
    next()
})
app.use("/", routerNavigation)

// [NOT FOUND]
app.get("*", (request, response) => {
    response.status(404).response.send("Path not found")
})

app.listen(3002, "127.0.0.1", () => {// Port | ip localhost
    console.log("Express connected at host: 127.0.0.1 and port: 3002 !")
});