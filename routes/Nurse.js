const express = require('express')
const pagination = require('../utils/pagination')
const Nurse = require('../Models/Nurse')
const Employee = require('../Models/Employee')
const { clearCache } = require('ejs')
const app = express.Router()

app.route('/').get(async (req, res) => {
  let filter = {}
  const { emp_id, ward_no, patients_incharge_of } = req.query
  if (emp_id) filter.emp_id = emp_id
  if (ward_no) filter.ward_no = ward_no
  if (patients_incharge_of) filter.patients_incharge_of = patients_incharge_of
  try {
    const found_nurse = await pagination(Nurse, req, filter)

    res.status(200).json({ msg: 'Record found', found_nurse })
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
})

app
  .route('/:id')
  .post(async (req, res) => {
    if (!req?.body) {
      return res.status(400).json({ msg: 'Branch not found' })
    }
    let speciality = ''
    const employee = await Employee.findOne({ _id: req.params.id }).exec()
    if (!employee || employee.role !== 'nurse') {
      return res.status(401).json({ msg: 'Unauthorized' })
    }
    const get_nurse_info = await Nurse.findOne({
      emp_id: req?.params?.id
    }).exec()
    try {
      if (!get_nurse_info?.emp_id) {
        speciality = new Nurse({
          emp_id: req.params.id,
          ward_no: req.body.ward_no,
          patients_incharge_of: req.body.patients_incharge_of,
          branch_id: req.body.branch_id
        })
        await speciality.save()
      } else if (
        get_nurse_info &&
        !get_nurse_info?.ward_no?.includes(req.body.ward_no)
      ) {
        get_nurse_info.ward_no.push(req.body.ward_no)
        get_nurse_info.patients_incharge_of.push(req.body.patients_incharge_of)
        speciality = await get_nurse_info.save()
      } else if (get_nurse_info?.ward_no?.includes(req.body.ward_no)) {
        get_nurse_info.patients_incharge_of.push(req.body.patients_incharge_of)
        speciality = await get_nurse_info.save()
      }

      res.status(201).json({
        msg: 'Specialty assigned ',
        data: speciality
      })
    } catch (err) {
      res.status(500).json({ msg: 'Something went wrong' })
    }
  })
  .get(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Failed request' })
    }
    try {
      const nurse_info = await Nurse.findOne({ emp_id: req.params.id })
      if (!nurse_info) return res.status(400).json({ msg: 'No info found' })
      res.status(200).json({ msg: "Nurse's info found", data: nurse_info })
    } catch (err) {
      res.status(500).json({ err: 'Failed to fetch' })
    }
  })
  .put(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Failed request' })
    }
    try {
      const update_specialty = await Nurse.findOneAndUpdate(
        { emp_id: req.params.id },
        req.body,

        { new: true }
      )
      res
        .status(200)
        .json({ msg: 'Successfully updated', data: update_specialty })
    } catch (err) {
      res.status(500).json({ msg: 'Something went wrong' })
    }
  })

app.route('/:id/rmv').post(async (req, res) => {
  const { ward_no, patients_incharge_of } = req.body
  const update = await Nurse.findOne({
    emp_id: req?.params?.id
  } ).exec()
  if ( !update ) {
    res.status(400).json({msg:"Record not found"})
  }

  try {
    if (ward_no) {
      for (let i = 0; i < update.ward_no.length; i++) {
        if (update?.ward_no[i]?._id == ward_no) {
          update.ward_no.pull(ward_no)
          await update.save()
        }
      }
    } else if (patients_incharge_of) {
      for (let i = 0; i < update.patients_incharge_of.length; i++) {
        if (update?.patients_incharge_of[i]?._id == patients_incharge_of) {
          update.patients_incharge_of.pull(patients_incharge_of)
          await update.save()
        }
      }
    }
    res.status(200).json({ msg: 'Deleted successfully', update })
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
})

module.exports = app
