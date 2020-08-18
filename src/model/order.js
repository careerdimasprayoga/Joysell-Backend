const connection = require("../config/mysql");

module.exports = {
    getAllOrder: () => {
        return new Promise((resolve,reject) => {
            connection.query("SELECT * FROM orders", (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, postOrder: (dataOrder) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO orders SET ?", dataOrder, (error, result) => {
                if(!error) {
                    const newResult = {
                        // product_id: result.insertId,
                        ...dataOrder
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}