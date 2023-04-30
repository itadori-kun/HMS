const express = require('express');
const app = express.Router()
const hospitalModel = require('../Models/Hospital')
app
.route('/')
.post(async(req, res)=>{
  const hospital = new hospitalModel(req.body)
  if(!hospital) return res.sendStatus(404).json({msg:"invalid hospital"})
const duplicate = await hospitalModel.findOne({email: hospital.email})
if(duplicate) return res.sendStatus(404).json({msg:"hospital already exists"})

await hospital.save()
res.json({msg:"hospital created successfully", code:201, hospital})
})

.get(async(req, res)=>{
  const hospital = await hospitalModel.find()
  if(!hospital) return res.sendStatus(404).json({msg:"hospital not found"})
  res.json({
    code:200,
    msg:"all hospital",
    hospital
  })
})

.put(async(req, res)=>{

})

.delete(async(req, res)=>{
  
})
module.exports = app