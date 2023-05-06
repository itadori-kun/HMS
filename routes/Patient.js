const express = require('express')
const pagination = require('../utils/pagination')
const Patient = require('../Models/Patient')
const app = express.Router()

// get all patient route
// get all patient from the patient collection in the database
app.route('/').get(async (req, res) => {
  let filter = {}
  const { first_name, last_name, gender } = req.query
  if (first_name) filter.first_name = first_name
  if (last_name) filter.last_name = last_name
  if (gender) filter.gender = gender

  try {
    let patients = await pagination(Patient, req, filter)
    res.status(200).json({ msg: 'Request successful', patients })
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
})

// Single patient route

app
  .route('/:id')
  // update patient info in the patient collection in the database

  .put(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Bad request sent' })
    }
    // Handle error incase wrong id is passed

    const patient = await Patient.findOne({ _id: req?.params?.id }).exec()
    if (!patient) return res.status(400).json({ msg: 'Patient not found' })
    try {
      const update_patient = await Patient.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      res
        .status(200)
        .json({ msg: 'Updated successfully', data: update_patient })
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Something went wrong' })
    }
  })

  // get single patient info from the patient collection in the database

  .get(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Failed request' })
    }
    try {
      const patient = await Patient.findOne({ _id: req.params.id }).exec()
      if (!patient) {
        return res.status(400).json({ msg: 'Patient not found' })
      }
      res.status(200).json({ msg: 'Patient info found', data: patient })
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Something went wrong' })
    }
  })

  //   delete a single patient detail from the patient collection in the database

  .delete(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Failed request' })
    }
    try {
      const patient = await Patient.findOne({ _id: req.params.id }).exec()
      if (!patient) {
        return res.status(400).json({ msg: 'Patient not found' })
      }
      const result = await patient.deleteOne()
      res
        .status(200)
        .json({ msg: 'Patient deleted successfully', data: result })
    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Something went wrong' })
    }
  })
module.exports = app
