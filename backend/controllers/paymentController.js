const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const dotenv = require("dotenv");
dotenv.config({path: "./config/config.env"})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    console.log("1. PAYMENT BACKEND RECEIVED");
    console.log("2. ITEMS:", req.body.items);

    try {
        console.log("3. BEFORE STRIPE SESSION");

        const session = await stripe.checkout.sessions.create({
            customer_email: "test@gmail.com",

            line_items: req.body.items.map((item) => ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.foodItem.name,
                    },
                    unit_amount: Math.round(item.foodItem.price * 100),
                },
                quantity: item.quantity,
            })),

            mode: "payment",

            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
        });

        console.log("4. STRIPE SESSION CREATED");
        console.log("STRIPE URL:", session.url);

        res.status(200).json({
            url: session.url,
        });

    } catch (error) {
        console.log("STRIPE ERROR:", error);
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
});