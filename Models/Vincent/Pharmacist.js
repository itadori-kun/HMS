const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PharmacistSchema=mongoose.Schema({
  
	emp_id:{
        type:Schema.Types.ObjectId,ref:"employee",required:true
    },
	branch_id:{
        type:Schema.Types.ObjectId,ref:"branch",required:true
    }

})

const Pharmacist=mongoose.model('Pharmacist',PharmacistSchema)
module.exports=Pharmacist