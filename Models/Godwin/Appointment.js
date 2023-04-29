const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppointmentSchema = new Schema(
  {
    card_no: {type: Schema.Types.ObjectId, ref: 'cards', required: true},
    doctor: { type: Schema.Types.ObjectId, ref: 'doctors', required: true },
    notes: { type: String, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
)

const Appointment = mongoose.model('appointments', AppointmentSchema)
module.exports = Appointment
