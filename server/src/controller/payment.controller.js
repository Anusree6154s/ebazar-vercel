require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE);

exports.createPaymentIntentCallback = async (req, res) => {

    try {
        const customer = await stripe.customers.create({
            email: req.body.selectedAddress.email,
            shipping: {
                address: {
                    city: "Surat",
                    country: "US",
                    line1: "RR Mall",
                    line2: "Piplod",
                    postal_code: "683521",
                    state: "Gujarat"
                },
                name: "Anu"
            },
            metadata: {
                userId: req.body.user,
            }
        })

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(req.body.totalPrice * 100),
            currency: 'inr',
            customer: customer.id,
            description: "payment for amazon clone",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        })

    } catch (error) {
        console.log("checkout session error: ", error)
    }
}