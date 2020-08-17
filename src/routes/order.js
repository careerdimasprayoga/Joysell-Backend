const router = require("express").Router()
const  { postOrder} = require('../controller/order')

router.post("/", postOrder);

module.exports = router