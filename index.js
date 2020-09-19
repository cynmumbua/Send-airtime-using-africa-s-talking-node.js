import express from "express";
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();

// Set your app credentials
const credentials = {
    apiKey: process.env.apiKey,
    username: process.env.username
}
// Initialize the SDK
const AfricasTalking = require("africastalking")(credentials)

// Get airtime service
const airtime = AfricasTalking.AIRTIME

// Sending airtime route
router.post("/",(req,res) => {
    const options = {
        recipients: [{
            phoneNumber: req.body.phoneNumber,
            currencyCode: req.body.currencyCode,
            amount: req.body.amount
        }]
    };
    airtime.send(options)
        .then(response => {
            console.log(response);
            res.json(response);
        }).catch(error => {
            console.log(error);
            res.json(error.toString());
        });
    
})

export default router;