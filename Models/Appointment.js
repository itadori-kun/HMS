const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AppointmentSchema = new Schema(
  {
    card_no: { type: Schema.Types.ObjectId, ref: 'patients', required: true },
    physician: { type: Schema.Types.ObjectId, ref: 'doctors', required: true },
    notes: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['booking', 'rescheduled', 'confirmed', 'declined', '']
    }
  },
  { timestamps: true }
)

AppointmentSchema.pre('find', function () {
  this.populate({ path: 'card_no', select: ['card_no'] })
  this.populate({
    path: 'physician',
    populate: { path: 'emp_id', select: ['first_name', 'last_name'] }
  })
})
AppointmentSchema.pre('findOne', function () {
  this.populate({ path: 'card_no', select: ['card_no'] })
  this.populate({
    path: 'physician',
    populate: { path: 'emp_id', select: ['first_name', 'last_name'] }
  })
})

const Appointment = mongoose.model('appointments', AppointmentSchema)
module.exports = Appointment
