
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//global variables

const currency = 'inr'
const deliveryCharge = 10




// PLACE ORDER (COD)

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.user.id; 

    if (!userId || !items || items.length === 0 || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing order data",
      });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: paymentMethod || "COD",
      payment: false,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    const order = await orderModel.create({
      userId,
      items,
      amount,
      address,
      payment: false,
      status: "Pending",
      paymentMethod: "Stripe",
    });

    //  Clear cart immediately
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map(item => {
      const imageUrl = Array.isArray(item.image)
        ? item.image[0]
        : typeof item.image === "object"
        ? Object.values(item.image)[0]
        : item.image;

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [imageUrl],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`,
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log("STRIPE ORDER ERROR:", error);
    res.status(500).json({ success: false });
  }
};






// GET ALL ORDERS (ADMIN)

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})


    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// USER ORDERS (FRONTEND)
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderModel
      .find({ userId })


    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE ORDER STATUS (ADMIN)

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.status(200).json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// stripe verify


const verifyStripe = async (req, res) => {
  try {
    const { success, orderId } = req.body;

    // User cancelled
    if (success !== "true") {
      return res.json({ success: true });
    }

    const order = await orderModel.findById(orderId);
    if (!order || !order.stripeSessionId) {
      return res.json({ success: false });
    }

    // THIS IS THE KEY LINE
    const session = await stripe.checkout.sessions.retrieve(
      order.stripeSessionId
    );

    if (session.payment_status === "paid") {
      order.payment = true;
      order.status = "Order Placed";
      await order.save();
    }

    res.json({ success: true });

  } catch (error) {
    console.log("VERIFY STRIPE ERROR:", error);
    res.status(500).json({ success: false });
  }
};





export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,verifyStripe
};


