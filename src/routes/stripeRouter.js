import express from "express";
import Stripe from "stripe";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const secret = process.env.STRIPE_SECRET;

    const stripe = new Stripe(secret);
    console.log(req.body);
    const { userInfo, orderItem, paymentStatus } = req.body;
    //return secret key
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentStatus.totalPrice * 100,
      currency: "aud",
      payment_method_types: [paymentStatus.paymentOption.slug],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
});
export default router;
