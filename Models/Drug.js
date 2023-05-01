const mongoose=require('mongoose')
const Schema=mongoose.Schema

const DrugSchema=mongoose.Schema({
    
    name:{type:String} ,

    category:{type:String},      
    status  :{type:String, enum:['available', 'unavailable']},                
    brand   :{type:String},                   
   quantity :{type:Number},              
   price :{type:String},                        
   pharmacy_id :{type:String,ref:"pharmacies"},   
   branch_id:{type:String,ref:"branches"}            

})

const Drug =mongoose.model('drugs',DrugSchema)
module.exports=Drug