const mongoose = require("mongoose");
const CheckoutModel = mongoose.Schema({
  prescription_id: { type: String, ref: "prescriptions" },
  item_cost: { type: String, required: true },
  payment_status:{type:String, default:"pending"},
  payment_type:{type:String, enum:["cash", "card"], required:true}
});

const Checkout = mongoose.model('checkouts', CheckoutModel)

module.exports = Checkout;
