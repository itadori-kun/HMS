const mongoose = require('mongoose');
const prescriptionSchema = mongoose.Schema({
  patient_id:{type:String, ref:"patients" , required:true},
  date_of_diagnosis:{type:Date},
  presriptiopn:{type:Array},
  notes:{type:String, required:true},
  doctor_name: {type:String, ref:'employees', required:true},
  doctor_initials:{type:String, required:true}
})

const Prescription = mongoose.model('prescriptions', prescriptionSchema)

module.exports = Prescription