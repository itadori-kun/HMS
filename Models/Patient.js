const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = new Schema(
  {
    card_no: { type: Number, unique: true, default: 0000 },
    first_name: { type: String },
    last_name: { type: String },
    avatar: { type: String },
    gender: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true },
    d_o_b: { type: Date },
    phone: [{ type: String }],
    address: { type: String },
    occupation: { type: String },
    type_of_patient: { type: String },
    allergies: { type: String },
    insurance: { type: String },
    bed_id: { type: String, ref: 'beds' },
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
      email: { type: String }
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
