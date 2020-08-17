const router = require("express").Router()
const  { postHistory} = require('../controller/history')

router.post("/", postHistory);

module.exports = router