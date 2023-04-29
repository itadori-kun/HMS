const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PharmacistSchema=mongoose.Schema({
  
	emp_id:{
        type:Schema.Types.ObjectId,ref:"employees",required:true
    },
	branch_id:{
        type:Schema.Types.ObjectId,ref:"branches",required:true
    }

})

const Pharmacist=mongoose.model('pharmacist',PharmacistSchema)
module.exports=Pharmacist