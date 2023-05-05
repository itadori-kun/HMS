const express = require('express')
const Patient = require('../Models/Patient')
const app = express.Router()

// get all patient route
// get all patient from the patient collection in the database
app.route('/').get(async (req, res) => {
  const page = parseInt(req.query.page * 1) || 1
  const limit = parseInt(req.query.limit * 1) || 10
  const skip = (page - 1) * limit
  let model_length = ''
  if (page) {
    model_length = await Patient.countDocuments()
    if (skip >= model_length) {
      return res.json({ msg: 'page not found' })
    }
  }
  const get_all_patients = await Patient.find().skip(skip).limit(limit)
  if (!get_all_patients) {
    res.status(204).json({ msg: 'No patient info found' })
  }
  res.status(200).json({
    msg: 'Request successful',
    length: model_length,
    data: get_all_patients
  })
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
      res.status(500).json({ err: 'Failed to update patient info' })
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
      res.status(500).json({ err: 'Failed to get patient info' })
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
      res.status(500).json({ err: 'Failed to delete patient info' })
    }
  })
module.exports = app
