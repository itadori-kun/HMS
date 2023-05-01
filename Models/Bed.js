const mongoose=require('mongoose')
const Schema=mongoose.Schema

const BedSchema=mongoose.Schema({
   
	ward_id:{
        type:Schema.Types.ObjectId,ref:"wards",required:true
    },
branch_id:{
    type:Schema.Types.ObjectId,ref:"branches",required:true
},
	bed_no:{
        type:Number,required:true
    },

	type :{
        type:String
    },

	status :{
        type:String,required:true
    }

})

const Bed=mongoose.model('beds',BedSchema)
module.exports=Bed