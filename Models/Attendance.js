const express=require('express')
const app=express.Router()
const mongoose=require('mongoose')
const Schema=mongoose.Schema



const AttendanceSchema=new Schema({
    emp_id:{type:Schema.Types.ObjectId,ref:'employees',required:true},
sign_in:{type:String,required:true},
sign_out:{type:String},
notes:{types:String}


})

const Attendance=mongoose.model('attendance',AttendanceSchema)
module.exports=Attendance