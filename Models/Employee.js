const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: [{ type: String, required: true }],
  address: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['available', 'leave', 'break']
  },
  staff_type: { type: String, required: true, enum: ['permanent', 'contract'] },
  role: { type: String, required: true },
  branch: { type: String, ref: 'branches', required: true },
  department: {
    type: String,
    ref: 'departments',
    required: true
  }
} )

const Employee = mongoose.model('employees', EmployeeSchema)
module.exports = Employee