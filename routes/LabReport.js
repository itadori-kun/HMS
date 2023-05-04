const express = require('express');
const app = express.Router();
const cloudinary = require('../utils/cloudinary');
const fileupload = require('express-fileupload');
const labReportModel = require('../Models/Lab_Reports')

app.use(fileupload({
  useTempFiles:true,
  limits: {fileSize: 50 * 1024 * 1024}
}))

app.route('/').post(async(req,res)=>{
const file = req.files.image
const result = await cloudinary.uploader.upload(file.tempFilePath,{
  public_id: `${Date.now()}`,
  resource_type:"auto",
  folder:'labUploads'
})
const labReport = new labReportModel({
  lab_id:req.body.lab_id,
  description:req.body.description,
  patient_id:req.body.patient_id,
  emp_id:req.body.emp_id,
  attarchment: result.url
})
// labReport.attarchment = result
const new_labReport = await labReport.save()
res.json({
  code:200,
  msg:"lab report created successfully",
  new_labReport,
  url: result.url
})
})

module.exports = app