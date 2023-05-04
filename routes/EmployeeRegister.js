const express = require('express')
const Employee = require('../Models/Employee')
const bcrypt = require('bcrypt')
const app = express.Router()

app.route('/employee/create').post(async (req, res) => {
  const {
    password,
    email,
    first_name,
    last_name,
    phone,
    address,
    staff_type,
    role,
    branch,
    status,
    department,
    hospital
  } = req.body
  if (
    !first_name ||
    !last_name ||
    !password ||
    !email ||
    !phone ||
    !address ||
    !staff_type ||
    !role ||
    !branch ||
    !department ||
    !hospital
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
      first_name: first_name,
      last_name: last_name,
      avatar: avatar,
      gender: gender,
      email: email,
      password: hashed_password,
      phone: phone,
      address: address,
      status: status,
      branch: branch,
      hospital: hospital,
      department: department,
      role: role,
      staff_type: staff_type
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
