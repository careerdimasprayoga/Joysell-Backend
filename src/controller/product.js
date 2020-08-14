const { getAllProduct, getProductById, postProduct, patchProduct, deleteProduct } = require("../model/product")
const helper = require("../helper/index.js")

module.exports = {
    getAllProduct: async (request, response) => {
        try {
            const result = await getAllProduct();
            return helper.response(response, 200, "Get Product Success", result);
        } catch(error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, getProductById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getProductById(id)
            if (result.length > 0) {
                return helper.response(response, 200, "Get Product by ID Success", result);
            } else {
                return helper.response(response, 404, "Product not found !");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, postProduct: async(request, response) => {
        try {
            const setData = {
                name: request.body.name,
                price: request.body.price,
                id_category: request.body.id_category,
                created: new Date(),
                status: request.body.status
            }
            const result = await postProduct(setData)
            return helper.response(response, 201, "Product Created", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, patchProduct: async(request, response) => {
        try {
            const { id } = request.params
            const { name, price, id_category, status } = request.body
            const setData = {
                name: request.body.name,
                price: request.body.price,
                id_category: request.body.id_category,
                updated: new Date(),
                status: request.body.status
            }
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result = await patchProduct(setData, id)
                return helper.response(response, 200, "Update Product Success", result);
            } else {
                return helper.response(response, 404, "Product not found");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }, deleteProduct: async(request, response) => {
        try {
            const{ id } = request.params
            const result = await deleteProduct(id)
            response.send("Delete Product Success")
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }
}