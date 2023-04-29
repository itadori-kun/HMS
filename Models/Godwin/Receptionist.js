const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReceptionistSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  branch: { type: Schema.Types.ObjectId, ref: 'Branch', required: true }
})

const Receptionist = mongoose.model('Receptionist', ReceptionistSchema)
module.exports = Receptionist
