const { getProduct, getProductCount, getProductById, postProduct, patchProduct, deleteProduct } = require("../model/product")
const qs = require('querystring')
const helper = require("../helper/index.js")

const getPrevLink = (page, currentQuery) => {
    if(page > 1) {
        const generatedPage = {
            page: page - 1
        }
        const resultPrevLink = {...currentQuery, ...generatedPage} // spread operator
        return qs.stringify(resultPrevLink)
        // console.log(resultPrevLink) // Bentuk object
        // console.log(qs.stringify(resultPrevLink)) // Bentuk string
    } else {
        return null
    }
}
const getNextLink = (page, totalPage, currentQuery) => {
    if(page < totalPage) {
        const generatedPage = {
            page: page + 1
        }
        const resultNextLink = {...currentQuery, ...generatedPage} // spread operator
        return qs.stringify(resultNextLink)
    } else {
        return null
    }
}

module.exports = {
    getAllProduct: async (request, response) => {
        let {page, limit} = request.query // Destructuring
        page = parseInt(page)
        limit = parseInt(limit)
        let totalData = await getProductCount()
        let totalPage = Math.ceil(totalData / limit) // Biar gak 0.4 dan dibulatkan
        let offset = page * limit - limit // Offset query
        let prevLink = getPrevLink(page, request.query)
        let nextLink = getNextLink(page, totalPage, request.query)
        const pageInfo = {
            page, // Kalo sama = page = page
            totalPage,
            limit,
            totalData,
            prevLink: prevLink && `http://127.0.0.1:3002/product?${prevLink}`,
            nextLink: nextLink && `http://127.0.0.1:3002/product?${nextLink}`
        } // { page: 1, totalPage: 2, limit: 2, totalData: 3 } = page 1, limit 2
        try {
            const result = await getProduct(limit, offset);
            return helper.response(response, 200, "Get Product Success", result, pageInfo);
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