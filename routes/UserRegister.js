const express = require('express')
const Patient = require('../models/Patient')
const bcrypt = require('bcrypt')
const app = express.Router()

app.route('/user').post(async (req, res) => {
  const {
    // first_name,
    // last_name,
    // avatar,
    password,
    email
    // gender,
    // d_o_b,
    // address,
    // phone,
    // occupation,
    // allergies,
    // insurance,
    // emergency_contact
  } = req.body

  if (
    // !first_name ||
    // !last_name ||
    // !avatar ||
    !email ||
    !password
    // ||
    // !gender ||
    // !d_o_b ||
    // !phone ||
    // !address ||
    // !occupation ||
    // !allergies ||
    // !insurance ||
    // !emergency_contact
  )
    return res.status(400).json({ msg: 'All info are required' })
  // check for duplicates in database
  const check_duplicates = await Patient.findOne(req.body).exec()
  if (check_duplicates) return res.status(409).json({ msg: 'Already exists' })

  try {
    // encrypt password
    const hashed_password = await bcrypt.hash(password, 10)

    // Created & store new admin
    const new_patient = await Patient.create({
      // first_name: first_name,
      // last_name: last_name,
      // avatar: avatar,
      password: hashed_password,
      email: email
      // gender: gender,
      // phone: phone,
      // d_o_b: d_o_b,
      // address: address,
      // occupation: occupation,
      // allergies: allergies,
      // insurance: insurance,
      // emergency_contact: {
      //   first_name: emergency_contact.first_name,
      //   last_name: emergency_contact.last_name,
      //   phone: emergency_contact.phone,
      //   email: emergency_contact.email
      // }
    })
    res.status(201).json({ msg: 'New patient info created', data: new_patient })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Failed to create new patient' })
  }
})


module.exports = app
