const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = new Schema(
  {
    card_no: { type: number, unique: true, reuired: true },
    first_name: { type: string, required: true },
    last_name: { type: string, required: true },
    avatar: { type: string },
    gender: { type: string, required: true },
    d_o_b: { type: string, required: true },
    phone: [{ type: string, required: true }],
    email: { type: string, unique: true, required: true },
    address: { type: string, required: true },
    occupation: { type: string, required: true },
    type_of_patient: { type: string },
    vitals: {
      blood_group: {
        type: string,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
      },
      blood_pressure: { type: string },
      weight: { type: string },
      height: { type: string }
    },
    allergies: { type: string },
    insurance: { type: string },
    emergency_contact: {
      first_name: { type: string, required: true },
      last_name: { type: string, required: true },
      phone: [{ type: string, required: true }],
      email: { type: string }
    },
    bed_id: { type: mongoose.schema.Types.ObjectId, ref: 'beds' }
  },
  { timestamps: true }
)

// Define a pre-save hook to increment the CARD_NO field
PatientSchema.pre('save', function (next) {
  const doc = this
  if (doc.isNew) {
    mongoose.model('patients', PatientSchema).countDocuments((err, count) => {
      if (err) {
        return next(err)
      }
      doc.card_no = count + 1
      next()
    })
  } else {
    next()
  }
})

const Patient = mongoose.model('patients', PatientSchema)

module.exports = Patient
