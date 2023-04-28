const mongoose=require('mongoose')
const Schema=mongoose.Schema

const WardSchema=mongoose.Schema({

   
	name:{type:String},
	type  :{
        type:String
    },
	branch_id:{
        type:Schema.Types.ObjectId,ref:"branch"
    },
	total_bed:{
        type:Number
    }

})

const Ward=mongoose.model('Ward',WardSchema)
module.exports=Ward
