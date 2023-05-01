const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppointmentSchema = new Schema(
  {
    card_no: {type: String, ref: 'cards', required: true},
    physician: { type: String, ref: 'doctors', required: true },
    notes: { type: String, required: true },
    status: { type: String, required: true , enum:['booking','rescheduled', 'confirmed','declined','']}
  },
  { timestamps: true }
)

const Appointment = mongoose.model('appointments', AppointmentSchema)
module.exports = Appointment
