const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = new Schema(
  {
    card_no: { type: number, unique: true, required: true },
    first_name: { type: string, required: true },
    last_name: { type: string, required: true },
    avatar: { type: string },
    gender: { type: string, required: true },
    d_o_b: { type: string, required: true },
    phone: {
      primary_contact: { type: string, required: true },
      secondary_contact: { type: string }
    },
    email: { type: string },
    address: { type: string },
    occupation: { type: string },
    type_of_patient: { type: string },
    vitals: {
      blood_group: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
      },
      blood_pressure: { type: String },
      weight: { type: String },
      height: { type: String }
    },
    emergency_contact: {
      first_name: { type: String },
      last_name: { type: String },
      phone: [{ type: String }],
      email: { type: String}
    }
  },
  { timestamps: true }
)

// Define a pre-save hook to increment the CARD_NO field
PatientSchema.pre('save', async function () {
  const count = await mongoose
    .model('patients', PatientSchema)
    .countDocuments()
    .exec()
  this.card_no = count + 1
})

const Patient = mongoose.model('patients', PatientSchema)

module.exports = Patient
