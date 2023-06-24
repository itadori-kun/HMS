const express = require('express')
const pagination = require('../utils/pagination')
const Patient = require('../Models/Patient')
const bcrypt = require('bcrypt')
const app = express.Router()



const cloudinary = require("../utils/cloudinary");
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// update patient avatar
app.route("/pfp/:id").put(async (req, res) => {
  if (!req.params.id)
    return res.json({
      code: 401,
      msg: "something went wrong",
    });
  try {
    // if (!req.body.avatar)
    //   return res.json({
    //     msg: "bad request",
    //     code: 401,
    //   })

    const patient = await Patient.findById(req.params.id);
    if (!patient)
      return res.json({
        code: 404,
        msg: "something went wrong",
      });
    const avatar = req.files.avatar;
    const result = await cloudinary.uploader.upload(avatar.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
      folder: "PatientsAvatars",
    });
   // console.log(result);
    patient.avatar = result.url;

    const updatePfp = { ...patient._doc, ...req.body };
    //console.log(updatePfp);
    patient.overwrite(updatePfp);
    patient.save();
    res.json({
      code:200,
      msg:"successful",
      data:patient
    })
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// get all patient route
// get all patient from the patient collection in the database
app.route('/').get(async (req, res) => {
  let filter = {}
  const { first_name, last_name, gender, phone, email, card_no } = req.query
  if (first_name) filter.first_name = first_name
  if (last_name) filter.last_name = last_name
  if (gender) filter.gender = gender
  if (phone) filter.phone = phone
  if (email) filter.email = email
  if (card_no) filter.card_no = card_no

  try {
    let patients = await pagination(Patient, req, filter)
    res.status(200).json(patients)
  } catch (err) {
    res.status(500).json({ msg: 'Something went wrong' })
  }
})

// Single patient route

// hash new password
app.route('/:id/pwd').put(async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ msg: 'Bad request sent' })
  }
  const password = req.body.password
  const patient = await Patient.findOne({ _id: req?.params?.id }).exec()
  if (!patient) return res.status(400).json({ msg: 'Patient not found' })

  try {
    const salt = await bcrypt.genSalt(10)
    const hashed_password = await bcrypt.hash(password, salt)
    const update_patient = await Patient.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { password: hashed_password } },
      { new: true }
    )
    res.status(200).json({ msg: 'Updated successfully', data: update_patient })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Something went wrong' })
  }
})

app
  .route('/:id')
  // update patient info in the patient collection in the database

  .put(async (req, res) => {
    if (!req?.params?.id) {
      return res.status(400).json({ msg: 'Bad request sent' })
    }
    if (req.body.password) {
      return res.status(401).json({ msg: 'Unauthorized' })
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
