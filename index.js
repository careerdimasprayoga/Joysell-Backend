const express = require('express');
const bodyParser = require("body-parser")
const morgan = require("morgan")
const routerNavigation = require('./src')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}))
app.use(morgan("dev"))
app.use("/", routerNavigation)

// [NOT FOUND]
app.get("*", (request, response) => {
    response.status(404).response.send("Path not found")
})

app.listen(3002, "127.0.0.1", () => {// Port | ip localhost
    console.log("Express sudah berjalan di host: 127.0.0.1 and port: 3002 !")
});