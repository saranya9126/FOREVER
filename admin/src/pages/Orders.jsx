import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'


const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null
    } try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token: token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }
  const statusHandler = async(event,orderId)=>{
    try {
      const response = await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers:{token:token}})
        if(response.data.success){
await fetchAllOrders()
        }
      
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }

  }
  useEffect(() => {
    fetchAllOrders();
  }, [token])


  return (
  <div className="w-full px-3 sm:px-6 py-4 space-y-4">
  {orders.map((order, index) => (
    <div
      key={index}
      className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start bg-white border rounded-lg p-4 shadow-sm"
    >
      {/* Parcel Icon */}
      <div className="flex justify-center lg:justify-start">
        <img
          src={assets.parcel_icon}
          alt=""
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Items */}
      <div className="lg:col-span-2 text-sm">
        {order.items.map((item, index) => (
          <p key={index} className="text-gray-700">
            {item.name} x {item.quantity}
            <span className="ml-1 text-gray-500">({item.size})</span>
          </p>
        ))}
      </div>

      {/* Address */}
      <div className="text-sm text-gray-700">
        <p className="font-medium">
          {order.address.firstName} {order.address.lastName}
        </p>

        <p>{order.address.street},</p>
        <p>
          {order.address.city}, {order.address.state},{" "}
          {order.address.country} - {order.address.zipcode}
        </p>

        <p className="mt-1">{order.address.phone}</p>
      </div>

      {/* Order Info */}
      <div className="text-sm text-gray-700">
        <p>Items : {order.items.length}</p>
        <p>Method : {order.paymentMethod}</p>
        <p>
          Payment :
          <span
            className={`ml-1 font-medium ${
              order.payment ? "text-green-600" : "text-red-600"
            }`}
          >
            {order.payment ? "Done" : "Pending"}
          </span>
        </p>
        <p>Date : {new Date(order.date).toLocaleDateString()}</p>
      </div>

      {/* Amount + Status */}
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">
          {currency}
          {order.amount}
        </p>

        <select value={order.status} onChange={(event)=>statusHandler(event,order._id)}
          className="border rounded-md px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-black"
        >
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    </div>
  ))}
</div>

  )
}

export default Orders