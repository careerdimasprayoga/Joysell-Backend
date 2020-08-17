const router = require("express").Router()
const  { getAllProduct, searchProduct, getProductOrderName, getProductOrderCategory, getProductOrderDate, getProductOrderPrice, getProductById, postProduct, patchProduct, deleteProduct } = require('../controller/product')

// [GET]
// router.get("/", product.getAllProduct);
router.get("/", getAllProduct);
router.get("/searchproduct", searchProduct);
router.get("/ordername", getProductOrderName);
router.get("/ordercategory", getProductOrderCategory);
router.get("/orderdate", getProductOrderDate);
router.get("/orderprice", getProductOrderPrice);
// [GET BY ID]
router.get("/:id", getProductById);
// [POST]
router.post("/", postProduct);
// [PACTH/PUT]
router.patch("/:id", patchProduct);
// [DELETE]
router.delete("/:id", deleteProduct);

module.exports = router // Export