const connection = require("../config/mysql");

module.exports = {
    getAllCategory: () => {
        return new Promise((resolve,reject) => {
            connection.query(`SELECT * FROM category`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            });
        })
    }, postHistory: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO history SET ?", setData, (error, result) => {
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
    }, patchCategory: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE category SET ? WHERE id = ?", [setData, id], (error, result) => {
                if(!error) {
                    const newResult = {
                        category_id: id
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    }
}