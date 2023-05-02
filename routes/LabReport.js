const express=require('express')
const app =express.Router()
const LabReport=require('../Models/Lab_Reports')
const multer=require('multer')
const path = require('path')
const cloudinary=require('../utils/cloudinary')


const storage=multer.diskStorage({
   destination: (req,file,cb)=>{
    cb(null,'uploads')
   },
   filename:(req,file,cb)=>{
cb(null,"attachment",Date.now()+path.extname(file.originalname))
   }
})

const upload=multer({
    storage:storage
})

app.route('/').get(async(req,res)=>{

    try{
const all_reports= await LabReport.find().populate("patient_id").sort()
if(!all_reports||all_reports.length==0) return res.json({
    msg:"no lab report exist"
})
res.json({
    msg:"successful",
    data:all_reports,
    code:200
})


    }
    catch(err){
        res.status(500).send(err)
        res.json({
            msg:"failed to retrieve lab reports"
        })
        console.log(err);
    }

})

app.route('/create').post(async(req,res)=>{
    if(!req.body)return res.json({msg:"body is missing"})
try{
    const attachment=req.body.attachment

if(attachment){
   const result= await cloudinary.uploader.upload(attachment,{
    folder:uploads
   })
   let new_report= new LabReport({...req.body,attachment:{
   public_id:result.public_id,
   url:result.secure_url//secure url that comes from cloudinary after uploading my attchment
   }})
}

await new_report.save()
}
catch(err){
    console.log(err);
    res.status(500).send(err);
    
//     res.json({
// msg:"failed to create lab report"
//     })
}


})

app.route('/:id')
.get(async(req,res)=>{
if(!req.params.id)return res.json({
    msg:"request body is missing or incomplete"
})
try{
const report= await LabReport.findById(req.params.id)

if(!report) return res.json({
    msg:"report does not exist",
  code:404

})

res.json({
    msg:"successful",
    data:report
})
}
catch(err){
    console.log(err)
    res.status(500).send(err);
}

})

.delete(async(req,res)=>{

    if(!req.params.id)return res.json({
        msg:"request body is missing or incomplete"
    })
    try{
        const report= await LabReport.findById(req.params.id)

        if(!report) return res.json({
            msg:"report does not exist",
          code:404
        
        })
        await LabReport.findByIdAndDelete(req.params.id)
        res.json({
            msg:"report deleted",
            code:200
        })

    }
catch(err){
    console.log(err);
    res.status(500).send(err)
    res.json({
        msg:"failed to delete"
    })
}
})


app.route('/:id',upload.single('attachment')).put(async(req,res)=>{

    if(!req.params.id) return res.json({
        code:400,
        msg:"request body is missing or incomplete"
    })
try{
const report= await LabReport.findById(req.params.id)

if(!report) return res.json({msg:"report does not exist"})

if(req.file){
    report.attachment=req.file.path
    let updated_report={...report,...req.body}
    report.overwrite(updated_report)
console.log(report);
report.save()
res.json({
    msg:"report updated",
    data:report,
    code:200
})

}
else{
  
    let updated_report={...report,...req.body}
    report.overwrite(updated_report)
    report.save()
console.log(report);

res.json({
    msg:"report updated",
    data:report,
    code:200
})

}

}
catch(err){
    console.log(err);
    res.status(500).send(err)
}


})


module.exports=app