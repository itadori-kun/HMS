const express = require('express')
const Doctor = require('../Models/Doctors')
// const Employee = require('../models/Employee')
// const Employee = require('../models/Employee')
const app = express.Router()

app
  .route('/:id')
  .post(async (req, res) => {
    if (!req?.body) {
      return res.status(400).json({ msg: 'Branch not found' })
    }
    try {
      const speciality = new Doctor({
        emp_id: req.params.id,
        speciality: req.body.speciality
      })
      const new_speciality = await speciality.save()
      res.status(201).json({
        msg: 'Specialty assigned ',
        data: new_speciality
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Failed to assign specialty' })
    }
  })
  .get(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Failed request' })
    }
    try {
      const doctor_info = await Doctor.findOne({
        emp_id: req.params.id
      }).populate('emp_id')
      if (!doctor_info) return res.status(400).json({ msg: 'No info found' })
      res.status(200).json({ msg: "Doctor's info found", data: doctor_info })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Failed to fetch' })
    }
  })
  .put(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Failed request' })
    }
    try {
      const update_specialty = await Doctor.findOneAndUpdate(
        { emp_id: req.params.id },
        req.body,
        { new: true }
      )
      res
        .status(200)
        .json({ msg: 'Successfully updated', data: update_specialty })
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Failed to carry out operation' })
    }
  })

module.exports = app
