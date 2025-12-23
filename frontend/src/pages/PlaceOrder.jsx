import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext)

  const [method, setMethod] = useState('cod')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to place order");
      return;
    }

    try {
      /* ================= BUILD ORDER ITEMS ================= */
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];

          if (quantity > 0) {
            const product = products.find(p => p._id === productId);

            if (product) {
              orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                size,
                quantity,
              });
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      /* ================= COD ================= */
      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Order placed successfully");
            setCartItems({});
          navigate("/orders");
          return; //  stop execution
        } else {
          toast.error(response.data.message || "Order failed");
          return;
        }
      }
    
      /* ================= STRIPE ================= */
      if (method === "stripe") {
      const response = await axios.post(
        backendUrl + "/api/order/stripe",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        
        localStorage.setItem("stripeOrderId", response.data.orderId);

        window.location.href = response.data.session_url;
        return;
      }
      if (response.data.pending) {
  toast.info("Payment processing, order will update shortly");
  navigate("/orders");
}
 else {
        toast.error(response.data.message || "Stripe order failed");
        return;
      }
    }

    
  }
    catch (error) {
      console.log("PLACE ORDER ERROR:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-6 pt-8 sm:pt-14 min-h-[80vh] border-t'
    >
      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1='DELIVERY' text2='INFORMATION' />
        </div>

        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName} onChange={onChangeHandler}
            className='border px-3 py-2 w-full' placeholder='First name' />
          <input required name='lastName' value={formData.lastName} onChange={onChangeHandler}
            className='border px-3 py-2 w-full' placeholder='Last name' />
        </div>

        <input required name='email' value={formData.email} onChange={onChangeHandler}
          className='border px-3 py-2 w-full' placeholder='Email' />

        <input required name='street' value={formData.street} onChange={onChangeHandler}
          className='border px-3 py-2 w-full' placeholder='Street' />

        <div className='flex gap-3'>
          <input required name='city' value={formData.city} onChange={onChangeHandler}
            className='border px-3 py-2 w-full' placeholder='City' />
          <input required name='state' value={formData.state} onChange={onChangeHandler}
            className='border px-3 py-2 w-full' placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required name='zipcode' value={formData.zipcode} onChange={onChangeHandler}
            className='border px-3 py-2 w-full' placeholder='Zipcode' />
          <input required name='country' value={formData.country} onChange={onChangeHandler}
            className='border px-3 py-2 w-full' placeholder='Country' />
        </div>

        <input required name='phone' value={formData.phone} onChange={onChangeHandler}
          className='border px-3 py-2 w-full' placeholder='Phone' />
      </div>

      {/* RIGHT SIDE */}
      <div className='mt-8 w-full sm:w-auto'>
        <CartTotal />

        <div className='mt-10'>
          <Title text1='PAYMENT' text2='METHOD' />

          <div className='flex flex-col gap-3 mt-4'>
            <div onClick={() => setMethod('stripe')}
              className='flex items-center gap-3 border p-3 cursor-pointer'>
              <span className={`w-3 h-3 rounded-full border ${method === 'stripe' && 'bg-green-500'}`} />
              <img src={assets.stripe_logo} className='h-5' />
            </div>

            <div onClick={() => setMethod('cod')}
              className='flex items-center gap-3 border p-3 cursor-pointer'>
              <span className={`w-3 h-3 rounded-full border ${method === 'cod' && 'bg-green-500'}`} />
              <p className='text-sm font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>

          <button type='submit'
            className='mt-8 w-full bg-black text-white py-3'>
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
