const mongoose=require('mongoose')
const Schema=mongoose.Schema

const BedSchema=mongoose.Schema({
   
	ward_id:{
        type:Schema.Types.ObjectId,ref:"wards"
    },
branch_id:{
    type:Schema.Types.ObjectId,ref:"branch"
},
	bed_no:{
        type:Number
    },

	type :{
        type:String
    },

	status :{
        type:String
    }

})

const Bed=mongoose.model('Bed',BedSchema)
module.exports=Bed