const express = require('express')
// const Employee = require('../Models/Employee')

const app = express.Router()

// app.route('/:id/employees').get(async (req, res) => {
//   if (!req?.params?.id) {
//     return res.status(400).json({ msg: 'Branch not found' })
//   }
//   const employee = await Employee.find({ branch: req?.params?.id })
//   try {
//     const branch_employees = employee
//     res
//       .status(200)
//       .json({ msg: 'Found branch employees', data: branch_employees })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ msg: 'No details found' })
//   }
// })

// app.route('/:id/doctors').get(async (req, res) => {

//   if (!req?.params?.id) {
//     return res.status(400).json({ msg: 'Branch not found' })
//   }
//   const employee = await Employee.find({ branch: req?.params?.id })
//   try {
//     const result = employee.filter(
//       obj => obj['role'] === 'Doctor' || obj['role'] === 'doctor'
//     )
//     res.status(200).json({ msg: 'Found branch employees', data: result })
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ msg: 'No details found' })
//   }
// })

// app.route('/employee').get(async (req, res) => {
//   // let filter = {}
//   let { role, hospital, department, status, staff_type } = req.query
//   console.log(req.query)
//   // if (_id.match(/^[0-9a-fA-F]{24}$/)) {

//   //   console.log(filter, role)
//   // }
//   if (role) filter.role = role
//   if (hospital) filter.hospital = hospital
//   if (branch) filter.branch = branch
//   if (department) filter.department = department
//   if (status) filter.status = status
//   if (staff_type) filter.staff_type = staff_type

//   try {
//     let employees = await Employee.find(filter)
//     if (employees) {
//       res.status(200).json({ msg: 'Request successful', data: employees })
//     } else {
//       res.status(400).json({ msg: 'Request not found' })
//     }
//   } catch (err) {
//     console.error(err)
//     res.status(500).json({ msg: 'Invalid search' })
//   }
// })


module.exports = app
