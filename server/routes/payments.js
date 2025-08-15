import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

import dotenv from 'dotenv';
dotenv.config();
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay credentials are missing in .env file");
}
// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Package pricing
const packages = {
  starter: { price: 199900, name: "Starter" }, // ₹1,999 in paise
  growth: { price: 349900, name: "Growth" }, // ₹3,499 in paise
  "pro-boost": { price: 499900, name: "Pro Boost" }, // ₹4,999 in paise
};

// Create order
router.post("/create-order", auth, async (req, res) => {
  try {
    const { planType } = req.body;

    if (!packages[planType]) {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    const receipt = `order_${req.user._id.toString().slice(-6)}_${Date.now().toString().slice(-5)}`;

    const options = {
      amount: packages[planType].price,
      currency: "INR",
      receipt,
      notes: {
        userId: req.user._id.toString(),
        planType,
        planName: packages[planType].name,
      },
    };


    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planType,
      planName: packages[planType].name,
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});


// Verify payment
router.post("/verify-payment", auth, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planType,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Calculate subscription dates
    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // 1 month subscription

    // Update user subscription
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          "subscription.planType": planType,
          "subscription.startDate": startDate,
          "subscription.expiryDate": expiryDate,
          "subscription.isActive": true,
          "subscription.razorpayOrderId": razorpay_order_id,
          "subscription.razorpayPaymentId": razorpay_payment_id,
          "subscription.razorpaySignature": razorpay_signature,
        },
      },
      { new: true }
    ).select("-password");

    res.json({
      message: "Payment verified and subscription activated",
      subscription: user.subscription,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

// Get subscription status
router.get("/subscription", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("subscription");
    res.json({ subscription: user.subscription });
  } catch (error) {
    console.error("Get subscription error:", error);
    res.status(500).json({ message: "Failed to get subscription" });
  }
});

export default router;
