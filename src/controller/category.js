const { getAllCategory, getCategoryById, postCategory, patchCategory, deleteCategory } = require("../model/category")
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
            const setData = {
                name: request.body.category_name
            }
            const checkId = await getCategoryById(id)
            if (checkId.length > 0) {
                const result = await patchCategory(setData, id)
                return helper.response(response, 200, "Update Category Success", result);
            } else {
                return helper.response(response, 404, "Bad Request");
            }
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    },
    deleteCategory: async(request, response) => {
        try {
            const{ id } = request.params
            const result = await deleteCategory(id)
            response.send("Delete Category Success")
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
        }
    }
}


// ORDER
// id_order    |   id_product  |   nama_product    |   id_history  |   price   |   ppn     |
// 1           | 1             | Caffucino         | 1             | 25.000    | 2500      |
// 2           | 1             | Caffucino         | 1             | 25.000    | 2500      |
// 3           | 1             | Caffucino         | 1             | 25.000    | 2500      |
// 4           | 2             | Cafelatte         | 1             | 15.000    | 1500      |
// 5           | 2             | Caffucino         | 2             | 15.000    | 1500      |

// HISTORY
// id_history  |   invoice     |   subtotal        |   Date        |
// 1           | 320120        | 75000             | 2020-09-01    | 
// 2
// 3
// 4

// TRANSACTION
// id_transaction   |   id_product  |   nama_product    |   price   |   ppn   |
// 