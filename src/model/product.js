const connection = require("../config/mysql");

module.exports = {
    getProduct: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product LIMIT ? OFFSET ?", [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, searchProduct: (limit, offset, search) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM product WHERE name LIKE "%${search}%" LIMIT ? OFFSET ?`, [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, getProductOrderName: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product ORDER BY name ASC LIMIT ? OFFSET ?", [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, getProductOrderCategory: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product ORDER BY id_category ASC LIMIT ? OFFSET ?", [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, getProductOrderDate: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product ORDER BY created ASC LIMIT ? OFFSET ?", [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, getProductOrderPrice: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product ORDER BY price ASC LIMIT ? OFFSET ?", [limit, offset], (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, getProductCount: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT COUNT(*) as total FROM product", (error, result) => {
                !error ? resolve(result[0].total) : reject(new Error(error)) // Conver array to number
            });
        })
    }, getProductById: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE id = ?", id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }, postProduct: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO product SET ?", setData, (error, result) => {
                console.log(result)
                if(!error) {
                    const newResult = {
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, patchProduct: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE product SET ? WHERE id = ?", [setData, id], (error, result) => {
                if(!error) {
                    const newResult = {
                        product_id: id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }, deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM product WHERE id = ?", id, (error, result) => {
                if(!error) {
                    const newResult = {
                        id:id
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}