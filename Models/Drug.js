const mongoose=require('mongoose')
const Schema=mongoose.Schema

const DrugSchema=mongoose.Schema({
    
    name:{type:String,required:true} ,
    category:{type:String,required:true},      
    status  :{type:String,required:true},                
    brand   :{type:String,required:true},
    strength:{type:String, required:true},
    expire_date:{type:Date,required:true},                   
   quantity :{type:Number,required:true},              
   price :{type:Number,required:true},                        
   pharmacy_id :{type:String,ref:"pharmacies",required:true},   
   branch_id:{type:String, ref:"branches",required:true}            
})

const Drug=mongoose.model('drugs',DrugSchema)
module.exports=Drug