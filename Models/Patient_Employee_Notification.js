const mongoose=require('mongoose')
const Schema=mongoose.Schema



const PatientEmployeeNotificationSchema=Schema({
    sender:{
        type:String,ref:"employees"
    },
    info:{
        type:String
    },
    reciever:{
        type:String,ref:"patients",required:true
    },
    seen:{
        type:Boolean,default:false,required:true
    },
    type:{
        type:String,
        enum:["emergency","urgent","normal"],
        default:"normal"
    }

},{timestamps:true})

const PatientEmployeeNotification=mongoose.model("patientNotifications",PatientEmployeeNotificationSchema)
module.exports=PatientEmployeeNotification