import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([])


  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: {token:token}}
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    loadOrderData()
  }, [token])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />

      </div>
      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='border-b border-t py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-gray-700'>
              <div className='flex items-start gap-6 text-sm'>
                <img src={item.image[0]} className='w-16 sm:w-20' alt="" />
                <div>
                  <p className='text-base font-medium'>{item.name}</p>

                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>
                      {currency}{item.price}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p>
                      Size: {item.size}
                    </p>
                      
                  </div>
              <p>Method : {item.paymentMethod}</p>
                  <p className='mt-2 text-sm text-gray-500'>
                    Date: <span>{new Date(item.date).toDateString()}</span>
                  </p>
                </div>


              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>

                </div>
               

              </div>
            </div>
          )

          )
        }
      </div>


    </div>
  )
}

export default Orders