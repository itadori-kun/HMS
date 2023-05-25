const mongoose = require("mongoose");
const prescriptionSchema = mongoose.Schema({
  patient_id: { type: String, ref: "patients", required: true },
  date_of_diagnosis: { type: Date },
  prescription: [
    {
      frequency: { type: String, required: true },
      name: { type: String, required: true },
      strength: { type: String, required: true },
    }
  ],
  notes: { type: String, required: true },
  doctor_id: { type: String, ref: "employees", required: true }
});

const Prescription = mongoose.model("prescriptions", prescriptionSchema);

module.exports = Prescription;
