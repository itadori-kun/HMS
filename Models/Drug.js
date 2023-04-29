const mongoose=require('mongoose')
const Schema=mongoose.Schema

const DrugSchema=mongoose.Schema({
    
    name:{type:String} ,

    category:{type:String},      
    status  :{type:String},                
    brand   :{type:String},                   
   quantity :{type:Number},              
   price :{type:Number},                        
   pharmacy_id :{type:Schema.Types.ObjectId,ref:"pharmacy"},   
   branch_id:{type:Schema.Types.ObjectId,ref:"branch"}            

})

const Drug=mongoose.model('Drug',DrugSchema)
module.exports=Drug