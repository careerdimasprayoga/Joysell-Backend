const router = require("express").Router()
const  { postHistory, getAllHistory } = require('../controller/history')

router.post("/", postHistory);
router.get("/", getAllHistory);

module.exports = router