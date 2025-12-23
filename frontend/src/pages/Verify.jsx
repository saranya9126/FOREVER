import { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const success = searchParams.get('success') === 'true'
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        //  CLEAR CART LOCALLY
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (token && orderId) {
      verifyPayment();
    }
  }, [token, orderId]);


  return <div>



  </div>
}

export default Verify
