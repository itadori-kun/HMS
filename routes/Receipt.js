const express = require('express')
const Receipt = require('../Models/Receipt')
const app = express.Router()

app.route('/').get(async (req, res) => {
  try {
    const record = await Receipt.find().populate('card_no', ['card_no'])
    res.status(200).json({ msg: 'Records found', data: record })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: 'Failed to get info' })
  }
})

app.route('/create').post(async (req, res) => {
  if (!req?.body) {
    return res.status(400).json({ msg: 'Failed request' })
  }
  try {
    const receipt = new Receipt({
      card_no: req.body.card_no,
      due_date: req.body.due_date,
      payment_analysis: req.body.payment_analysis.toLowerCase(),
      vat: req.body.vat,
      total_amount: req.body.total_amount
    })
    const new_receipt = await receipt.save()
    res
      .status(201)
      .json({ msg: 'Record created successfully', data: new_receipt })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ msg: 'Failed to create record' })
  }
})

app
  .route('/:id')
  .get(async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ msg: 'Invalid request sent' })
    }
    const record = await Receipt.findOne({ _id: req.params.id }).exec()
    if (!record) {
      return res.status(400).json({ msg: 'No record found' })
    }
    res.status(200).json({ msg: 'Record found', data: record })
  })

  .put(async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ msg: 'Invalid request sent' })
    }
    const old_record = await Receipt.findOne({
      _id: req?.params?.id
    }).exec()
    if (!old_record) {
      return res.status(400).json({ msg: 'No record found' })
    }
    try {
      const record = await Receipt.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      res.status(200).json({ msg: 'Record successfully updated', data: record })
    } catch (err) {
      console.error(err)
      res.status(500).json({ err: 'Failed to carry out request' })
    }
  })

  .delete(async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({ msg: 'Invalid request' })
    }
    try {
      const record = await Receipt.findOne({
        _id: req?.params?.id
      }).exec()
      if (!record) {
        return res.status(400).json({ msg: 'No record found' })
      }
      const result = await record.deleteOne()
      res.status(200).json({ msg: 'Successfully deleted', data: result })
    } catch (err) {
      console.error(err)
      return readSync.status(500).json({ msg: 'Failed to delete record' })
    }
  })

module.exports = app
