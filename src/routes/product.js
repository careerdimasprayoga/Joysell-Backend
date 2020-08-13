const router = require("express").Router() // Import
// const product = require('../controller/product')
const  {getAllProduct, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')

// [GET]
// router.get("/", product.getAllProduct);
router.get("/", getAllProduct);
// [GET BY ID]
router.get("/:id", getProductById);
// [POST]
router.post("/", postProduct);
// [PACTH/PUT]
router.patch("/:id", patchProduct);
// [DELETE]
router.delete("/:id", deleteProduct);

module.exports = router // Export