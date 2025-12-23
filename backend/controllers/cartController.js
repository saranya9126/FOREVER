import userModel from "../models/userModel.js"

// add products to user cart



const addToCart = async (req, res) => {
    try {

         const userId = req.user.id;
        const {itemId, size } = req.body
        const userData = await userModel.findById(userId)
        const cartData = userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }

        } else {

            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: 'Added to Cart' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}


// update products to user cart

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId)
        const cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: 'Cart Updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// get products to user cart
const getUserCart = async (req, res) => {
  try {
    //userId comes from authUser middleware
    const userId = req.user.id;

    const userData = await userModel.findById(userId);


    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      cartData: userData.cartData || {},
    });

  } catch (error) {
    console.log("GET CART ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export { addToCart, updateCart, getUserCart }