// const { MpostOrder } = require("../model/order")
const { postHistory } = require("../model/history")
const helper = require("../helper/index.js")


module.exports = {
    postOrder: async (request, response) => {
        try {
            let dataPostman = request.body.orders
            // Handle History
            Array.prototype.sum = function (prop) { var total = 0
                for ( var i = 0, _len = this.length; i < _len; i++ ) {
                    total += this[i][prop]
                } return total
            }
            let dataHistory = {
                invoice : Math.floor((Math.random() * 1000000000) + 1),
                subtotal : (dataPostman.sum("price")) + (dataPostman.sum("ppn")),
                date : new Date()
            }
            const resultHistory = await postHistory(dataHistory)
            const history_id = (resultHistory.product_id)

            return helper.response(response, 201, "Create Category Success", resultHistory);
        } catch (error) {
            return helper.response(response, 400, "Bad Request", error);
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