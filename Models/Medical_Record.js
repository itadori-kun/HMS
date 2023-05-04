const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicalRecordSchema = new Schema(
  {
    card_no: { type: String, ref: 'patients', required: true },
    diagnosis: { type: String, required: true },
    symptoms: { type: String, required: true },
    treatments: { type: String, required: true },
    follow_up_info: { type: String, required: true },
    medications: [{ type: String, ref: 'medications' }],
    lab: { type: String, ref: 'labs' },
    doctor: { type: String, ref: 'doctors', required: true }
  },
  { timestamps: true }
)

const MedicalRecord = mongoose.model('medicalRecords', MedicalRecordSchema)
module.exports = MedicalRecord
