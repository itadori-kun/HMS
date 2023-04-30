const express = require('express');
const app = express.Router();
const branchModel = require('../Models/Branch')


app.route('/').post(async(req, res)=>{
  if(!req?.body) return res.sendStatus(400).json({msg:"bad request"});
  try {
   const branch = new branchModel({
    name: req.body.name,
    hospital: req.body.hospital,
    address: req.body.address,
    phone: req.body.phone,
    admin_id: req.body.admin_id,
    staff_total: req.body.staff_total
   })
   const new_branch = await branch.save();
   res.json({
    code:201,
    msg:"new branch created successfully",
    new_branch
   })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }

})

app.route('/').get(async (req, res) => {
 try {
  const branch = await branchModel.find().populate('hospital').exec()
  res.json(branch)
 } catch (error) {
  console.log(error)
 }

})

app.route('/:id')
.put(async(req, res) => {
  if(!req?.params?.id) return res.sendStatus(400).json({msg:"bad request"})
  try {
    const branch = await branchModel.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
    res.json({
      code:200,
      msg:"branch updated successfully",
      branch
    })
  } catch (error) {
    console.log(error)
  }
})
.get(async(req,res) => {
  if(!req?.params?.id) return res.sendStatus(400).json({msg:"bad request"})
  try {
    const branch = await branchModel.findOne({_id:req.params.id}).populate('hospital').exec()
  res.json(
    {
      code:200,
      msg:"single branch found",
      branch
    }
  )
  } catch (error) {
    console.log(error)
  }
})

.delete(async(req,res) => {
  if(!req?.params?.id) return res.sendStatus(400).json({msg:"bad request"})
  try {
    const branch = await branchModel.findOne({_id:req.params.id}).exec()
    if(!branch) return res.sendStatus(404).json({msg:"branch not found"})
    let result = await branch.deleteOne()
    res.json({
      code:200,
      msg:"branch deleted successfully",
      result
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500).json({msg:"failed to find branch"})
  }
})

module.exports = app