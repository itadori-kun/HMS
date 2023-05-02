const express = require('express')
const Employee = require('../Models/Employee')

// const Branch = require('../models/Branch')
const app = express.Router()

app.route('/:id/employees').get(async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ msg: 'Branch not found' })
  }
  const employee = await Employee.find({ branch: req?.params?.id })
  try {
    const branch_employees = employee
    res
      .status(200)
      .json({ msg: 'Found branch employees', data: branch_employees })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'No details found' })
  }
})

app.route('/:id/doctors').get(async (req, res) => {

  if (!req?.params?.id) {
    return res.status(400).json({ msg: 'Branch not found' })
  }
  const employee = await Employee.find({ branch: req?.params?.id })
  try {
    const result = employee.filter(
      obj => obj['role'] === 'Doctor' || obj['role'] === 'doctor'
    )
    res.status(200).json({ msg: 'Found branch employees', data: result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'No details found' })
  }
})

module.exports = app
