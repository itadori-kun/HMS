const mongoose = require('mongoose');
const doctorSchema = mongoose.Schema({
  emp_id :{type:String, ref:'employees', required:true},
  speciality:{type:String},
  branch_id:{type:String, ref:"branches", required:true},
})

const Doctor = mongoose.model('doctors', doctorSchema);
module.exports = Doctor;