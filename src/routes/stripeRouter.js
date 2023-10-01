import express from "express";
import Stripe from "stripe";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const secret = process.env.STRIPE_SECRET;

    const stripe = new Stripe(secret);

    const { userInfo, orderItem, paymentStatus } = req.body;
    //return secret key
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentStatus.totalPrice * 100,
      currency: "aud",

      automatic_payment_methods: { enabled: true },
    });

    const clientSecret = paymentIntent.client_secret;
    res.json(clientSecret);
  } catch (error) {
    next(error);
  }
});
export default router;
