const express = require('express');
const app = express.Router();
const cloudinary = require('../utils/cloudinary');
const fileupload = require('express-fileupload');
const labReportModel = require('../Models/Lab_Reports');
const LabReport = require('../Models/Lab_Reports');

app.use(fileupload({
  useTempFiles: true,
  limits: { fileSize: 50 * 1024 * 1024 }
}))

app.route('/')
  .post(async (req, res) => {
    const file = req.files.image
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
      folder: 'labUploads'
    })
    const labReport = new labReportModel({
      lab_id: req.body.lab_id,
      description: req.body.description,
      patient_id: req.body.patient_id,
      emp_id: req.body.emp_id,
      attarchment: result.url
    })
    // labReport.attarchment = result
    const new_labReport = await labReport.save()
    res.json({
      code: 200,
      msg: "lab report created successfully",
      new_labReport,
      url: result.url
    })
  })

  .get(async (req, res) => {
    let filter = {}
    let { patient_id, emp_id, lab_id } = req.query
    if (patient_id) filter.patient_id = patient_id
    if (emp_id) filter.emp_id = emp_id
    if (lab_id) filter.lab_id = lab_id

    try {
      const lab_report = await labReportModel.find(filter)
      if (!lab_report) res.json({
        msg: "no lab report found",
        code: 401
      })
      res.json({
        msg: "lab report retieved",
        data: lab_report
      })


    }
    catch (err) {

      res.status(500).send(err)
      console.log(err);
    }

  })

  .delete(async (req, res) => {
    let { patient_id, emp_id, lab_id, _id } = req.query
    let filter = {}
    if (_id) filter._id = _id

    if (patient_id) filter.patient_id = patient_id
    if (emp_id) filter.emp_id = emp_id
    if (lab_id) filter.lab_id = lab_id
    try {
      const lab_report = await labReportModel.find(filter)
      if (!lab_report) res.json({
        msg: "lab report not found"
      })
      await labReportModel.findByIdAndDelete(lab_report)
      res.json({
        msg: "lab report deleted",
        data: lab_report
      })
    }
    catch (err) {
      console.log(err);
      res.status(500).send(err)
    }
  })

app.route('/:id')
  .put(async (req, res) => {
    if (!req.body) return res.json({
      msg: "request body is missing",
      code: 404
    })
    let { _id } = req.query
    let filter = {}
    if (_id) filter._id = _id
    try {
      const lab_report = await labReportModel.findById(req.params.id)
      if (!lab_report) return res.json({
        msg: "lab report not found",
        code: 404
      })
      if(!req.files.image){
        let report_update = { ...lab_report._doc, ...req.body }
        // console.log(report_update);
        lab_report.overwrite(report_update)
        await lab_report.save()
  
        res.json({
          msg: "lab report updated ",
          data: lab_report
        })
      }
      else{
      const file = req.files.image
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
        folder: 'labUploads'
      })

      let reports_updates = await labReportModel.findByIdAndUpdate({_id:req.params.id}, {attarchment: result.url,
        lab_id: req.body.lab_id,
        description: req.body.description,
        patient_id: req.body.patient_id,
       emp_id: req.body.emp_id
      }, {new: true})
      res.json({
        code: 200,
        msg:"lab report and attarchment updated successfully",
        data:reports_updates
      })
    }
  }
    catch (err) {
      console.log(err);

      res.status(500).send(err)
    }
  })
module.exports = app