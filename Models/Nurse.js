const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NurseSchema = new Schema({
  emp_id: { type: String, ref: 'employees', required: true },
  ward_no: [{ type: String, ref: 'wards', required: true }],
  patients_incharge_of: [{ type: String, ref: 'patients', required: true }]
})

const Nurse = mongoose.model('nurses', NurseSchema)
module.exports = Nurse
