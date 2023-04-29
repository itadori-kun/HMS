const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BranchSchema = new Schema({
  name: { type: String, required: true },
  hospital: { type: Schema.Types.ObjectId, ref: 'hospitals', required: true },
  address: { type: String, required: true },
  phone: [{ type: String, required: true }],
  admin: { type: String, required: true },
  staff_total: { type: String, required: true }
})

const Branch = mongoose.model('branches', BranchSchema)
module.exports = Branch
