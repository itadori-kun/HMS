const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppointmentSchema = new Schema(
  {
    card_no: {type: Schema.Types.ObjectId, ref: 'CA]rd', required: true},
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    notes: { type: String, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
)

const Appointment = mongoose.model('Appointment', AppointmentSchema)
module.exports = Appointment
