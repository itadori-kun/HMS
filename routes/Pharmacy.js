const express=require('express')
const app=express.Router()
const Pharmacy=require('../Models/Pharmacy')


app.route('/').get(async (req, res) => {
    try {
      const get_all_pharmacies = await Pharmacy.find()
      if (!get_all_pharmacies)
        return res.json({
          code: 404,
          msg: 'phrarmacy does not exist'
        })
      res.json({
        msg: 'success',
        data: get_all_pharmacies,
        code: 200
      })
    } catch (err) {
      res.status(500).send(err)
      console.log(err)
      res.json({
        msg: 'failed to retrieve pharmacy'
      })
    }
  })
  
  app.route('/create').post(async (req, res) => {
    if (!req.body)
      return res.json({
        code: 400,
        msg: 'request body is missing or incomplete'
      })
    try {
      const duplicate = await Pharmacy.findOne({ name: req.body.name })
      if (duplicate)
        return res.json({
          msg: 'pharmacy already exist,create pharmacy using a new name',
          code: 400
        })
  
      const pharmacy = new Pharmacy(req.body)
      await ward.save()
      res.json({
        msg: 'successful',
        data: ward,
        code: 200
      })
    } catch (err) {
      res.status(500).send(err)
      console.log(err)
      res.json({
        msg: 'failed to create new ward'
      })
    }
  })
  
  app
    .route('/:id')
    .get(async (req, res) => {
      if (!req.params.id)
        return res.json({
          code: 400,
          msg: 'request body is missing or incomplete'
        })
  
      try {
        let pharmacy = await Pharmacy.findById(req.params.id)
        if (!pharmacy)
          return res.json({
            msg: 'ward does not exist',
            code: 404
          })
  
        res.json({
          msg: 'successful',
          data: pharmacy,
          code: 200
        })
      } catch (err) {
        res.status(500).send(err)
        console.log(err)
        res.json({
          msg: 'failed to retrieve ward'
        })
      }
    })
  
    .put(async (req, res) => {
      if (!req.params.id)
        return res.json({
          code: 400,
          msg: 'request body is missing or incomplete'
        })
      try {
        const pharmacy = await Pharmacy.findById(req.params.id)
        if (!pharmacy) return res.json({
            
            code:401,
           msg: 'pharmacy  does not exist'})
        let update_pharmacy = { ...pharmacy._doc, ...req.body }
        pharmacy.overwrite(update_pharmacy)
  
        await ward.save()
        res.json({
          msg: 'successful',
          data: pharmacy,
          code: '200'
        })
      } catch (err) {
        res.status(500).send(err)
        console.log(err)
        res.json({
          msg: 'failed to update ward '
        })
      }
    })
  
    .delete(async (req, res) => {
      if (!req.params.id)
        return res.json({
          msg: 'request body is missing or incomplete'
        })
  
      try {
        let pharmacy = await Ward.findById(req.params.id)
        if (!pharmacy)
          return res.json({
            msg: 'ward does not exist',
            code: 404
          })
  
        await Pharmacy.findByIdAndDelete(req.params.id)
        res.json({
          msg: 'phaarmacy deleted',
          code: 200
        })
      } catch (err) {
        res.status(500).send(err)
        res.json({
          msg: 'failed to delete ward '
        })
  
        console.log(err)
      }
    })


module.exports=app