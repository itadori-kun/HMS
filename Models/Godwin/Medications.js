const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedicationSchema = new Schema(
  {
    is_collected: { type: String, required: true },
    card_no: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    medications: { type: String, required: true },
    dosage: { type: String, required: true },
    freq: { type: String, required: true }
  },
  { timestamps: true }
)
const Medication = mongoose.model('Medication', MedicationSchema)
module.exports = Medication
