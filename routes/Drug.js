const express = require('express');
const app = express.Router()
const drugModel = require('../Models/Drug')


app.route('/').post(async(req,res)=>{
  if(!req?.body) return res.sendStatus(400).json({msg:"bad request"})
  const drug = new drugModel({
    name: req.body.name,
    category: req.body.category,
    status:req.body.status,
    brand: req.body.brand,
    quantity: req.body.quantity,
    price: req.body.price,
    pharmacy_id: req.body.pharmacy_id,
    branch_id: req.body.branch_id
  })
  const new_drug = await drug.save()
  res.json({
    code:201,
    msg:"drug created successfully",
    drug
  })
})

app.route('/').get(async(req,res)=>{
  try {
    // enable pagination
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1;
    const count = await drugModel.find({}).estimatedDocumentCount();

    const drugs =  await drugModel.find()
    .populate('branch_id')
    .populate('pharmacy_id')
    .skip(pageSize * (page - 1))
    .limit(pageSize)

    if(!drugs) return res.sendStatus(400).json({msg:"no drugs found"})
    res.json({
      code:200,
      msg:"drugs found successfully",
      drugs,
      page,
      pages: Math.ceil(count / pageSize),
      count
    })
  } catch (error) {
    console.log(error)
    return res.sendStatus(500).json(error)
  }
})

app.route('/:id')

.put(async(req, res)=>{
if(!req?.params?.id) return res.sendStatus(400).json({msg:"bad request"})
const drug = await drugModel.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
res.json({
  code:200,
  msg:"drug updated successfully",
  drug
})
})

.get(async(req,res)=>{
  if(!req?.params?.id) return res.sendStatus(400).json({msg:"bad request"})
  const drug = await drugModel.findOne({_id:req.params.id}).populate({path:'branch_id', select:['name','address','phone'], populate:{path:"hospital", select:['name', 'email']}}).exec()
  if(!drug) return res.sendStatus(400).json({msg:"drug not found"})
  res.json({
    code:200,
    msg:"drug found successfully",
    drug
  })
})

.delete(async(req,res)=>{
  if(!req?.params?.id) return res.sendStatus(400).json({msg:"bad request"})
  const drug = await drugModel.findOne({id:req.params.id}).exec()
  if(!drug) return res.sendStatus(404).json({msg:"drug not found"})
  const result = await drug.deleteOne()
  res.json({
    code:200,
    msg:"drug deleted successfully",
    result
  })
})
module.exports = app