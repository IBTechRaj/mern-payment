const orderModel = require("../../models/orderProductModel")

const orderController = async (request, response) => {
    try {
        const currentUserId = request.currentUserId
        const orderList = await orderModel.find({ useerId: currentUserId }).sort({ createdAt: -1 })

        response.json({
            data: orderList,
            message: "Order List",
            success: true
        })
    }
    catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = orderController