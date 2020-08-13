const router = require("express").Router()
const  { getAllCategory, getCategoryById, postCategory, patchCategory } = require('../controller/category')

router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.post("/", postCategory);
router.patch("/:id", patchCategory);

module.exports = router