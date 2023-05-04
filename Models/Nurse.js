const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NurseSchema = new Schema({
  emp_id: { type: Schema.Types.ObjectId, ref: 'employees', required: true },
  ward_no: [{ type: Schema.Types.ObjectId, ref: 'wards', required: true }],
  patients_incharge_of: [
    { type: Schema.Types.ObjectId, ref: 'patients', required: true }
  ],
  branch_id: { type: Schema.Types.ObjectId, ref: 'branches', required: true }
})

const Nurse = mongoose.model('nurses', NurseSchema)
module.exports = Nurse
