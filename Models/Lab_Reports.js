const mongoose=require('mongoose')
const Schema=mongoose.Schema

const LabReportSchema=mongoose.Schema({	
lab_id:{
    type:Schema.Types.ObjectId,ref:"labs"
},
description:{
    type:String,required:true
},
patient_id:{
    type:Schema.Types.ObjectId,ref:"patients",required:true
},
	emp_id:{
        type:Schema.Types.ObjectId,ref:"employees",required:true
    },

	attachment :{
        type:String,
        
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
        
    }

	

},{timestamps:true})

const LabReport=mongoose.model('labReports',LabReportSchema)
module.exports=LabReport