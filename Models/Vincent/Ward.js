const mongoose=require('mongoose')
const Schema=mongoose.Schema

const WardSchema=mongoose.Schema({

   
	name:{type:String,required:true},
	type  :{
        type:String,required:true
    },
	branch_id:{
        type:Schema.Types.ObjectId,ref:"branches",,required:true
    },
	total_bed:{
        type:Number
    }

})

const Ward=mongoose.model('wards',WardSchema)
module.exports=Ward
