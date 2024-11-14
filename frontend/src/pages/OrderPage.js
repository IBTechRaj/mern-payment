import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'

const OrderPage = () => {
    const [data, setData] = useState([])

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.getOrder.url, {
            method: SummaryApi.getOrder.method,
            credentials: 'include'
        })

        const responseData = await response.json()
        setData(responseData.data)
        console.log("order list", responseData)
    }

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    return (
        <div>
            {
                !data[0] && (
                    <p>No order available</p>
                )
            }

            <div>
                {
                    data.map((item, index) => {
                        return (
                            <div key={item.userId + index}>
                                <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                                <div className='grid gap-1'>
                                    {
                                        item?.productDetails.map((product, index) => {
                                            return (
                                                <div key={product.productId + index} className='flex gap-3 bg-slate-200'>
                                                    <img
                                                        src={product.image[0]}
                                                        className='w-28 h-28 bg-white object-scale-down p-2'
                                                    />
                                                    <div>
                                                        <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                                        <div className='flex items-center gap-5 mt-1'>
                                                            <div className='text-lg text-red-500'>{displayINRCurrency(product.price)} </div>
                                                            <p>Quantity:{product.quantity} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <div> Payment Details : </div>
                                    <p>Payment method : {item.paymentDetails.payment_method_type[0]} </p>
                                    <p>Payment Status :{item.paymentDetails.playment_status} </p>
                                </div>

                                <div>
                                    Total Amount : {item.totalAmount}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OrderPage
