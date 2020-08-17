const connection = require("../config/mysql");

module.exports = {
    MpostOrder: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO order SET ?", setData, (error, result) => {
                console.log(result)
                if(!error) {
                    const newResult = {
                        product_id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}