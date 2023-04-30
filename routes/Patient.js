const express = require('express')
const Patient = require('../models/Patient')
const app = express.Router()

// get all patient route
// get all patient from the patient collection in the database
app.route('/').get(async (req, res) => {
  const get_all_patients = await Patient.find()
  if (!get_all_patients) {
    res.status(204).json({ msg: 'No patient info found' })
  }
  res.status(200).json({ msg: 'Request successful', data: get_all_patients })
})
// create single patient route
// create a new patient to the patient collection in the database
app.route('/create').post(async (req, res) => {
  if (!req?.body) {
    return res.status(400).json({ msg: 'No content for creating patient' })
  }

  try {
    const patient = new Patient({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
      gender: req.body.gender,
      d_o_b: req.body.d_o_b,
      phone: req.body.phone,
      address: req.body.address,
      occupation: req.body.occupation,
      type_of_patient: req.body.type_of_patient,
      allergies: req.body.allergies,
      insurance: req.body.insurance,
      bed_id: req.body.bed_id,
      vitals: req.body.vitals,
      emergency_contact: req.body.emergency_contact
    })
    const new_patient = await patient.save()
    res.status(201).json({
      msg: 'New patient info created successfully',
      data: new_patient
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Failed to create new patient' })
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
      const result = await Patient.deleteOne()
      res
        .status(200)
        .json({ msg: 'Patient deleted successfully', data: result })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Failed to delete patient info' })
    }
  })
module.exports = app
