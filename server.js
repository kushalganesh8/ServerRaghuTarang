'use strict'
const express=require('express')
const app=express()
const port=3000
const bodyparser=require("body-parser");
const Razorpay=require('razorpay')
app.use(require("body-parser").json());
var instance = new Razorpay({
    key_id: 'rzp_test_7DYA5gZje70UiW',
    key_secret: 'fMr6t7C1p05WckVZOgVoQOMX',
  });

app.get('/',(req, res)=> {
    res.sendFile("standard.html",{root: __dirname});
})

app.post('/create/orderId',(req, res)=> {
    console.log("create orderId request",req.body);
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcpl"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderId : order.id});
      });
})
