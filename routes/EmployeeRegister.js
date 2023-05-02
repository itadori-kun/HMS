const express = require('express')
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')
const app = express.Router()

app.route('/employee/create').post(async (req, res) => {
  const { password, email } = req.body
  if (
    // !first_name ||
    // !last_name ||
    !password ||
    !email
    // ||
    // !phone ||
    // !address ||
    // !staff_type ||
    // !role ||
    // !branch ||
    // !department
  )
    return res.status(400).json({ msg: 'All info are required' })
  // check for duplicates in database
  const check_duplicates = await Employee.findOne(req.body).exec()
  if (check_duplicates) return res.status(409).json({ msg: 'Already exists' })

  try {
    // encrypt password
    const hashed_password = await bcrypt.hash(password, 10)

    // Created & store new admin
    const new_employee = await Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      avatar: req.body.avatar,
      gender: req.body.gender,
      email: email,
      password: hashed_password,
      phone: req.body.phone,
      address: req.body.address,
      status: req.body.status,
      branch: req.body.branch,
      department: req.body.department,
      role: req.body.role,
      staff_type: req.body.staff_type
    })
    res
      .status(201)
      .json({ msg: 'New employee info created', data: new_employee })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Failed to create new employee' })
  }
})

module.exports = app
