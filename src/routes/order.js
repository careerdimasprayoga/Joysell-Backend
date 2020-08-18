const router = require("express").Router()
const  { postOrder} = require('../controller/order');
const { getAllOrder } = require("../controller/order");

router.post("/", postOrder);
router.get("/", getAllOrder);

module.exports = router