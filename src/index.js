const route = require("express").Router()

// Import router
const product = require("./routes/product")
const category = require("./routes/category")
const history = require("./routes/history")

// Middle
route.use("/product", product)
route.use("/category", category)
route.use("/history", history)

module.exports = route