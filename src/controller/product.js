const { getAllProduct, getProductById, postProduct, patchProduct, deleteProduct } = require("../model/product")
const helper = require("../helper/index.js")

module.exports = {
    getAllProduct: async (request, response) => {
        try {
            const result = await getAllProduct();
            return helper.response(response, 200, "Success get product", result);
        } catch(error) {
            return helper.response(response, 400, "Bad request | Bad Boy", error);
        }
    },
    getProductById: async (request, response) => {
        try {
            // const id = request.params.id // belum sedderhana
            const { id } = request.params // Sederhanakan
            const result = await getProductById(id)
            // console.log(result) // result ini betuknya array
            if (result.length > 0) {
                return helper.response(response, 200, "Success get product by ID !", result);
            } else {
                return helper.response(response, 404, "Product not found !");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad request | Bad Boy", error);
        }
    },
    postProduct: async(request, response) => {
        try {
            const setData = { // sama denganline 45 bro, itu lebih singkats
                // Kiri table, Kanan postman 
                nama: request.body.product_name,
                harga: request.body.product_harga,
                created: new Date(),
                status: request.body.product_status
            }
            const result = await postProduct(setData)
            return helper.response(response, 201, "Product Created", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },
    patchProduct: async(request, response) => {
        try {
            const { id } = request.params
            const { product_name, product_price, product_status } = request.body // Didalam postman
            const setData = {
                nama: product_name,
                harga: product_price,
                updated: new Date(),
                status: product_status
            }
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result = await patchProduct(setData, id)
                return helper.response(response, 200, "Success updated product !", result);
            } else {
                return helper.response(response, 404, "Product not found !");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },
    deleteProduct: async(request, response) => {
        try {
            const{ id } = request.params
            const result = await deleteProduct(id)
            // console.log(result)
            response.send("Delete berhasil !")// Tampil di postman mamang
        } catch (error) {
            
        }
    }
}