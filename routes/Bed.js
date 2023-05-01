const express=require('express')
const app=express.Router()
const Bed= require('../Models/Bed')

app.route('/').get(async(req,res)=>{
    try{
    const get_all_beds= await Bed.find()
    if(!get_all_beds)return res.json({
        msg:"Beds  not exist ",
        code:404,
    })

    res.json({
        msg:"successful",
        data:get_all_beds,
        code:200
       
    })
}
    catch(err){
        
        console.log(err); 

    res.status(500).send(err)
    res.json({msg:"failed to retrieve beds"})
    }
})

app.route('/create').post(async(req,res)=>{
    if(!req.body)return res.json({
        msg:"request body is missing or incomplete",
        code:"400"
    })

    try{
        const found_bed_no= await Bed.findOne({"bed_no":req.body.bed_no})
if(found_bed_no)return res.json({
    msg:"bed already exist, use a new bed number"
})

const bed=   new Bed(req.body)

await bed.save()
res.json({
    msg:"successful",
    data:bed,
    code:200
})
    }
    catch(err){
       
        res.status(500).send(err)
        console.log(err);
        res.json({
            msg:"failed to create bed"
        })
    }
})

app.route('/:id')
.get(async(req,res)=>{
    if(!req.params.id)return res.json({
        msg:"request body mimssing or incomplete",
        code:404
    })

    try{
        let bed= await Bed.findById(req.params.id)
        if(!bed) return res.json({
                code:404,
                msg:"bed does not exist"
            })
       

            res.json({
                msg:"successful",
                data:bed,
code:200
            })
        

    }
    catch(err){
        res.status(500).send(err);
        res.json({
            msg:"failed to retrieve bed"
        })
        console.log(err);
    }
})

.put(async(req,res)=>{
    if(!req.params.id)return res.json({
        msg:"request body missing or incomplete",
        code:400

    })
    try{
        const bed= await Bed.findById(req.params.id)
const updated_bed={...bed._doc,...req.body}
bed.overwrite(updated_bed)
 await bed.save()
res.json({
  msg:"success",
  data:bed,
    code:200
})

    }
    catch(err){
        res.status(500).send(err)
        res.json({
            msg:"failed to update bed"
        })
        console.log(err);
    }
})

.delete(async(req,res)=>{
    if(!req.params.id)return res.json({
        msg:"request body missing or incomplete",
        code:400
    })
    try{
     const bed=   await Bed.findById(req.params.id)
     if(!bed)return res.json({
        msg:"bed does not exist",
        code:404
     })
await Bed.findByIdAndDelete(req.params.id)

     res.json({
        msg:"bed deleted",
        code:200
     })
    }
    catch(err){
        res.status(500).send(err)
        console.log(err);
        res.json({
        msg:"failed to delete bed"    
        })
    }
})





module.exports=app