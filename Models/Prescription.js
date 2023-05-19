const mongoose = require('mongoose');
const prescriptionSchema = mongoose.Schema({
  first_name:{type:String, required:true},
  last_name:{type:String, required:true},
  patient_age:{type:String, required:true},
  date_of_diagnosis:{type:Date},
  drug_id:{type:String, ref:"drugs", required:true},
  strength:{type:String, required:true},
  frequency:{type:String, required:true},
  notes:{type:String, required:true},
  doctor_name: {type:String, ref:'employees', required:true},
  doctor_initials:{type:String, required:true}
})

const Prescription = mongoose.model('prescriptions', prescriptionSchema)

module.exports = Prescription