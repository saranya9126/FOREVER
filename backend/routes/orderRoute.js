import express from 'express'

import { allOrders,placeOrderStripe,placeOrder,updateStatus,userOrders, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router();
//Admin Features

orderRouter.post('/list',adminAuth,allOrders)

orderRouter.post('/status',adminAuth,updateStatus)

//payment Features

orderRouter.post('/place',authUser,placeOrder)

orderRouter.post('/stripe',authUser,placeOrderStripe)

//User Features


orderRouter.post('/userorders',authUser,userOrders)

orderRouter.post("/verifyStripe",authUser, verifyStripe);



export default orderRouter