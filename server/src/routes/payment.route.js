const express = require('express')
const { createPaymentIntentCallback} = require('../controller/payment.controller.js');

const router = express.Router()

router.post("/create-payment-intent", createPaymentIntentCallback)

    module.exports = router