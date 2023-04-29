const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicalRecordSchema = new Schema(
  {
    card_no: { types: Schema.Types.ObjectId, ref: 'patients', required: true },
    diagnosis: { type: String, required: true },
    symptoms: { type: String, required: true },
    treatments: { type: String, required: true },
    follow_up_info: { type: String, required: true },
    medications: [{ types: Schema.Types.ObjectId, ref: 'medications' }],
    lab: { types: Schema.Types.ObjectId, ref: 'labs' },
    doctor: { types: Schema.Types.ObjectId, ref: 'doctors' }
  },
  { timestamps: true }
)

const MedicalRecord = mongoose.model('medicalRecords', MedicalRecordSchema)
module.exports = MedicalRecord
