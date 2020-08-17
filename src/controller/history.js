const { getAllHistory, postHistory, patchHistory } = require("../model/category")
const helper = require("../helper/index.js")

module.exports = {
    getAllHistory: async (request, response) => {
        try {
            const result = await getAllHistory();
            return helper.response(response, 200, "Get History Success", result);
        } catch(error) {
            return helper.response(response, 400, "Bad request", error);
        }
    }, postHistory: async(request, response) => {
        try {
            // const invoiceGenerate = Math.floor((Math.random() * 1000000000) + 1);
            // const setData = {
            //     subtotal: request.body.price
            // }
            // for (i = 0; i < request.body.historys.length; i++) {  //loop through the array
            //     total += historys[i].price;  //Do the math!
            // }
            console.log(request.body)
            // const result = await postCategory(setData)
            return helper.response(response, 201, "Create Category Success", result);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
            console.log(request.body.name)
            
        }
    }
}


// ORDER
// id_order    |   id_product  |   nama_product    |    Gambar  |   id_history  |   price   |   ppn     |
// 1           | 1             | Caffucino         |            |1              | 25.000    | 2500      |
// 2           | 1             | Caffucino         |            |1              | 25.000    | 2500      |
// 3           | 1             | Caffucino         |            |1              | 25.000    | 2500      |
// 4           | 2             | Cafelatte         |            |1              | 15.000    | 1500      |
// 5           | 2             | Caffucino         |            |2              | 15.000    | 1500      |

// HISTORY
// id_history  |   invoice     |   subtotal        |   Date        |
// 1           | 320120        | 75000             | 2020-09-01    | 
// 2
// 3
// 4

// TRANSACTION
// id_transaction   |   id_product  |   nama_product    |   price   |   ppn   |
// 