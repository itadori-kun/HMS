const mongoose=require('mongoose')
const Schema=mongoose.Schema

const PhamarcySchema=({
    name:{
        type:String,required:true
    },
    phone:{
       type:String
    },
    address:{
        type:String
    },
    emp_id:[{
        type:Schema.Types.ObjectId,ref:"employees"
    }],
    drug_id:[{type:Schema.Types.ObjectId,ref:"drugs"}]


})

            
	
	
            const Phamarcy=mongoose.model("Pharmacies",PhamarcySchema)
             module.exports=Phamarcy
