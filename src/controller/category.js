const { getAllCategory, getCategoryById, postCategory, patchCategory } = require("../model/category")
const helper = require("../helper/index.js")

module.exports = {
    getAllCategory: async (request, response) => {
        try {
            const result = await getAllCategory();
            return helper.response(response, 200, "Get Category Success", result);
        } catch(error) {
            return helper.response(response, 400, "Bad request", error);
        }
    },
    getCategoryById: async (request, response) => {
        try {
            const { id } = request.params
            const result = await getCategoryById(id) // Result = Array
            if (result.length > 0) {
                return helper.response(response, 200, "Get Category by ID Success", result);
            } else {
                return helper.response(response, 404, "Bad request");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad request", error);
        }
    },
    postCategory: async(request, response) => {
        try {
            const setData = {
                name: request.body.category_name
            }
            const result = await postCategory(setData)
            console.log(setData)
            return helper.response(response, 201, "Create Category Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },
    patchCategory: async(request, response) => {
        try {
            const { id } = request.params
            const { category_name } = request.body
            const setData = {
                name: category_name
            }
            const checkId = await getProductById(id)
            if (checkId.length > 0) {
                const result = await patchCategory(setData, id)
                return helper.response(response, 200, "Update Category Success", result);
            } else {
                return helper.response(response, 404, "Bad Request");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }
}