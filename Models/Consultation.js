const mongoose = require('mongoose');
const consultationSchema = mongoose.Schema({
  patient_id:{type:String, ref:'patients'},
  employees_id:{type:String, ref:'employees'},
  payment_status:{type:String, enum:['paid','notpaid', 'pending']},
  diagnosis:{type:String},
  prescription:{type:String},
  medication_id:{type:String}
})

const Consultation = mongoose.model('consultations', consultationSchema)

module.exports = Consultation