const express = require('express')
const pagination = require('../utils/pagination')
const Nurse = require('../Models/Nurse')
const app = express.Router()

app.route('/').get(async (req, res) => {
  let filter = {}
  const { emp_id, ward_no, patients_incharge_of } = req.query
  if (emp_id) filter.emp_id = emp_id
  if (ward_no) filter.ward_no = ward_no
  if (patients_incharge_of) filter.patients_incharge_of = patients_incharge_of
  try {
    const found_nurse = await pagination(Nurse, req, filter)
    if (found_nurse.length == 0) {
      return res.status(200).json({ msg: 'Record not found' })
    }
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
      res.status(500).json({ err: 'Failed to assign' })
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
      res.status(500).json({ msg: 'Failed to carry out operation' })
    }
  })

module.exports = app
