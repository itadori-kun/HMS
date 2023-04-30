const express = require('express');
const app = express.Router()
const hospitalModel = require('../Models/Hospital');
const Hospital = require('../Models/Hospital');

app.route('/').post(async(req, res)=>{
  const hospital = new hospitalModel(req.body)
  if(!hospital) return res.sendStatus(404).json({msg:"invalid hospital"})
const duplicate = await hospitalModel.findOne({email: hospital.email})
if(duplicate) return res.sendStatus(404).json({msg:"hospital already exists"})

await hospital.save()
res.json({msg:"hospital created successfully", code:201, hospital})
})

app.route('/').get(async(req, res)=>{
  const hospital = await hospitalModel.find()
  if(!hospital) return res.sendStatus(404).json({msg:"hospital not found"})
  res.json({
    code:200,
    msg:"all hospital",
    hospital
  })
})

app.route('/:id')
.put(async(req, res)=>{
if(!req.params?.id){
return res.sendStatus(400).json({message:"bad request"})
}
try {
  const hospital = await hospitalModel.findById({_id: req.params.id}).exec()
if(!hospital) return sendStatus(404).json({msg:"hospital does not exist"})

let data = {...hospital._doc, ...req.body}
hospital.overwrite(data)
await hospital.save()
res.json({
  code:200,
  msg:"hospital updated successfully",
  hospital
})
  
} catch (error) {
  return res.json(error)
}
})
.delete(async(req, res)=>{
  if(!req?.params?.id) return res.sendStatus(400).json({msg:"bad request"})
  try {
    const hospital = await hospitalModel.findOne({_id:req.params.id}).exec()
    if(!hospital) return res.sendStatus(404).json({msg:"hospital not found"})
    const result  = await hospitalModel.findByIdAndDelete({_id:req.params.id})
    return res.json({
      code:200,
      msg: "hospital deleted successfully",
      result
    })
  } catch (error) {
    return res.json(error)
  }
})

.get(async(req, res)=>{
  if(!req?.params?.id) return res.sendStatus(400).json({msg:"bad request"})
  try {
    const hospital = await hospitalModel.findOne({_id:req.params.id}).exec()
    if(!hospital) return res.sendStatus(400).json({msg:"hosptial not found"})
    return res.json({
      code:200,
      msg:"single hospital found",
      hospital
    })
  } catch (error) {
    return res.json(error)
  }
})
module.exports = app