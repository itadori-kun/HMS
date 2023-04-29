const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReceiptSchema = new Schema(
  {
    card_no: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    due_date: { type: Date },
    dept: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    payment_analysis: [
      {
        descp: { type: String, required: true },
        amount: { type: Number, required: true }
      }
    ],
    vat: { type: String, required: true },
    payment_mode: { type: String, required: true },
    payment_status: { type: String, required: true },
    total_amount: { type: Number, required: true }
  },
  { timestamps: true }
)

const Receipt = mongoose.model('Receipt', ReceiptSchema)
module.exports = Receipt
