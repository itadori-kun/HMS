const express = require('express')
const Employee = require('../models/Employee')
const bcrypt = require('bcrypt')
const app = express.Router()

app.route('/employee').post(async (req, res) => {
  const {
    // first_name,
    // last_name,
    password,
    email
    // address,
    // phone,
    // staff_type,
    // role,
    // branch,
    // department
  } = req.body
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
      // first_name: first_name,
      // last_name: last_name,
      // phone: phone,
      email: email,
      password: hashed_password
      // address: address,
      // staff_type: staff_type,
      // role: role,
      // branch: branch,
      // department: department
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
