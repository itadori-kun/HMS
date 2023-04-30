const express = require('express')
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')
const app = express.Router()

// Employee route
app.route('/employee').post(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ msg: 'Email and password required' })
  }
  // check if email exist
  const found_user = await Employee.findOne({ email: email }).exec()
  if (!found_user) return res.status(401).json({ msg: 'Invalid credentials' })

  // decode password
  const match = await bcrypt.compare(password, found_user.password)
  if (match) {
    // const role = Object.values(found_user.role).filter(Boolean)
    const data = {
      id: found_user._id,
      email: found_user.email
      // first_name: found_user.first_name,
      // last_name: found_user.last_name,
      // role: role
    }
    res.status(200).json({ msg: 'Login successful', data: data })
  } else {
    res.status(401).json({ msg: 'Invalid credentials' })
  }
})

module.exports = app