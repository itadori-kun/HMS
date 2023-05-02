const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReceiptSchema = new Schema(
  {
    card_no: { type: String, ref: 'patients', required: true },
    due_date: { type: Date, required: true },
    payment_analysis: [
      {
        dept: {
          type: String,
          ref: 'departments',
          required: true
        },
        descp: { type: String, required: true },
        amount: { type: Number, required: true },
        payment_mode: {
          type: String,
          required: true,
          enum: ['CASH', 'TRANSFER', 'GATEWAY']
        },
        payment_status: {
          type: String,
          required: true,
          enum: ['COMPLETED', 'NOT COMPLETED', 'NETWORK ERROR']
        }
      }
    ],
    vat: { type: String, required: true },
    total_amount: { type: Number, required: true }
  },
  { timestamps: true }
)

const Receipt = mongoose.model('receipts', ReceiptSchema)
module.exports = Receipt
