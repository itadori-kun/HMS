const express = require('express');
const app = express.Router();
const medicationModel = require('../Models/Medications')

app.route('/').post(async(req,res)=>{
  if(!req?.body) return res.json("bad request");
  try {
    const medication = new medicationModel({
      is_collected:req.body.is_collected,
      card_no:req.body.card_no,
      dosage:req.body.dosage,
      freq:req.body.freq
    })
    const new_medication = await medication.save()  
    res.json({
      code:200,
      msg:"medication saved successfully",
      new_medication
    })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})
module.exports = app