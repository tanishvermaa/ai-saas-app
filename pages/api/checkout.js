import Stripe from "stripe";

console.log("Stripe API Key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Not Loaded");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        console.log("Received API request");

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Test Product",
                        },
                        unit_amount: 5000, // Amount in cents ($50.00)
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        console.log("Session Created:", session.url); // ✅ Fix: Log only session URL
        res.json({ url: session.url });

    } catch (error) {
        console.error("Stripe Error:", error.message);
        res.status(500).json({ error: error.message });
    }
}
