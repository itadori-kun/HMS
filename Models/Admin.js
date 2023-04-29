const mongoose = require('mongoose')
const AdminSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  roles: {
    supper_admin: { type: String, default: 'admim' },
    admin: { type: String }
  }
})

const ADMIN = mongoose.model('admins', AdminSchema)
module.exports = ADMIN
