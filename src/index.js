const route = require("express").Router()

// Import router
const product = require("./routes/product")
const category = require("./routes/category")

// Middle
route.use("/product", product)
route.use("/category", category)

module.exports = route