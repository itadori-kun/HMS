require("dotenv").config();
const https = require("https");
const express = require("express");
const app = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const checkoutModel = require("../Models/Checkout");
const Receipt = require("../Models/Receipt");
const cors = require("cors");

app.route("/").post(async (req, res) => {
  try {
    const checkout = new checkoutModel({
      prescription_id: req.body.prescription_id,
      item_cost: req.body.item_cost,
      payment_status: req.body.payment_status,
      payment_type: req.body.payment_type,
    });

    if (!checkout) return res.json({ code: 404, message: "Field is required" });

    const newcheckout = await checkout.save();
    res.json({
      code: 200,
      msg: "checkout saved successfully",
      data: newcheckout,
    });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

app.route("/").get(async (req, res) => {
  const checkOut = await checkoutModel.find().exec();
  if (!checkOut) return res.json({ code: 404, message: "no record found" });
  res.json({
    code: 200,
    msg: "checkout found successfully",
    data: checkOut,
  });
});
app.use(cors());

app.route("/paystack").get(async (req, res) => {
  console.log(req.query);
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
  });
  const checkout = new checkoutModel({
    prescription_id: req.query.prescription_id,
    item_cost: req.query.amount,
    payment_status: req.query.payment_status,
    payment_type: req.query.payment_type,
  });
  if (!checkout) return res.json({ code: 404, message: "Field is required" });

  const newcheckout = await checkout.save();

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const reqpaystack = https
    .request(options, (respaystack) => {
      let data = "";

      respaystack.on("data", (chunk) => {
        data += chunk;
      });

      respaystack.on("end", () => {
        res.send(data).json({
          code:200,
          msg:"success",
          data:newcheckout
        });
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpaystack.write(params);
  reqpaystack.end();
});
module.exports = app;
