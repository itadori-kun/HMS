
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: [{ type: String }],
  address: { type: String },
  status: {
    type: String,
    enum: ['available', 'leave', 'break']
  },
  staff_type: { type: String, enum: ['permanent', 'contract'] },
  role: { type: String },
  branch: { type: String, ref: 'branches' },
  department: {
    type: String,
    ref: 'departments'
  }
})

const Employee = mongoose.model('employees', EmployeeSchema)
module.exports = Employee
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  avatar: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: [{ type: String }],
  address: { type: String },
  status: {
    type: String,
    enum: ['available', 'leave', 'break']
  },
  staff_type: { type: String, enum: ['permanent', 'contract'] },
  role: { type: String },
  branch: { type: String, ref: 'branches' },
  department: {
    type: String,
    ref: 'departments'
  }
})

const Employee = mongoose.model('employees', EmployeeSchema)
module.exports = Employee
>>>>>>> 50c3fb3 (update employee)
