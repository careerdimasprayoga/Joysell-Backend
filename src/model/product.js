const connection = require("../config/mysql");

module.exports = {
    getAllProduct: () => {
        return new Promise((resolve,reject) => {
            connection.query(`SELECT * FROM product`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
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