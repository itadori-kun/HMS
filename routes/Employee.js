const express = require('express')
const Employee = require('../models/Employee')
const app = express.Router()

// get all employee route
// get all employee from the employee collection in the database
app.route('/').get(async (req, res) => {
  const get_all_employees = await Employee.find()
  if (!get_all_employees) {
    res.status(204).json({ msg: 'No employee info found' })
  }
  res.status(200).json({ msg: 'Request successful', data: get_all_employees })
})

// create single employee route
// create a new employee to the employee collection in the database
app.route('/create').post(async (req, res) => {
  if (!req?.body) {
    return res.status(400).json({ msg: 'No content for creating employee' })
  }
  try {
    const employee = new Employee({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      avatar: req.body.avatar,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      status: req.body.status,
      branch: req.body.branch,
      department: req.body.department,
      role: req.body.role,
      staff_type: req.body.staff_type
    })
    const new_employee = await employee.save()
    res.status(201).json({
      msg: 'New employee info created successfully',
      data: new_employee
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Failed to create new Employee' })
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
      const employee = await Employee.findOne({ _id: req.params.id }).exec()
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
      const result = await Employee.deleteOne()
      res
        .status(200)
        .json({ msg: 'Employee deleted successfully', data: result })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Failed to delete employee info' })
    }
  })
module.exports = app
