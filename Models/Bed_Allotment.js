const mongoose=require('mongoose')
const Schema=mongoose.Schema

const BedSchema=mongoose.Schema({
   
	reason_for_admission:{
        type:String,required:true
    },
patient_id:{
    type:Schema.Types.ObjectId,ref:"patients",required:true
},
	bed_id:{
        type:Schema.Types.ObjectId,ref:"beds",required:true
    },

	discharge_date :{
        type:String,
     
    }

	

},{timestamps:true})

const BedAllotment=mongoose.model('bedAllotments',BedSchema)
module.exports=BedAllotment