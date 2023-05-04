const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LabSchema = new Schema({
  name: { type: String, required: true },
  branch: { type: Schema.Types.ObjectId, ref: 'branches', required: true },
  head_of_dept: { type: Schema.Types.ObjectId, ref: 'employees' }
})

const Lab = mongoose.model('labs', LabSchema)
module.exports = Lab
