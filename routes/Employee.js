const express = require('express')
const Employee = require('../Models/Employee')
const app = express.Router()

// get all employee route
// get all employee from the employee collection in the database and filter through via SIX(6) categories

app.route('/').get(async (req, res) => {
  let filter = {}
  let { role, hospital, branch, department, status, staff_type } = req.query
  if (role) filter.role = role
  if (hospital) filter.hospital = hospital
  if (branch) filter.branch = branch
  if (department) filter.department = department
  if (status) filter.status = status
  if (staff_type) filter.staff_type = staff_type

  try {
    const employees = await Employee.find(filter)
      .populate({
        path: 'branch',
        select: ['name', 'address']
      })
      .populate({ path: 'hospital' })
      .populate({ path: 'department' })
    if (employees.length == 0) {
      return res.status(200).json({ msg: 'Record not found' })
    } else if (!employees.length == 0) {
      return res
        .status(200)
        .json({ msg: 'Request successful', data: employees })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Invalid search' })
  }
})

// Single employee route

app
  .route('/:id')
  // update employee info in the employee collection in the database

  .put(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Bad request sent' })
    }
    // Handle error incase wrong id is passed
    const employee = await Employee.findOne({ _id: req?.params?.id }).exec()
    if (!employee) return res.status(400).json({ msg: 'Employee not found' })

    try {
      const update_employee = await Employee.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      res
        .status(200)
        .json({ msg: 'Updated successfully', data: update_employee })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Failed to update employee info' })
    }
  })

  // get single employee info from the employee collection in the database

  .get(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Failed request' })
    }
    try {
      const employee = await Employee.findOne({ _id: req.params.id })
        .populate({
          path: 'branch',
          select: ['name', 'address']
        })
        .populate({ path: 'hospital' })
        .populate({ path: 'department' })
      if (!employee) {
        return res.status(400).json({ msg: 'Employee not found' })
      }
      res.status(200).json({ msg: 'Employee info found', data: employee })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Failed to get employee info' })
    }
  })

  //   delete a single employee detail from the employee collection in the database

  .delete(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Failed request' })
    }
    try {
      const employee = await Employee.findOne({ _id: req.params.id }).exec()
      if (!employee) {
        return res.status(400).json({ msg: 'Employee not found' })
      }
      const result = await employee.deleteOne()
      res
        .status(200)
        .json({ msg: 'Employee deleted successfully', data: result })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Failed to delete employee info' })
    }
  })
module.exports = app
