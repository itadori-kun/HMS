const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhamarcySchema = {
  name: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  emp_id: [
    {
      type: Schema.Types.ObjectId,
      ref: 'employee'
    }
  ],
  drug_id: [{ type: Schema.Types.ObjectId, ref: 'drugs' }]
}

const Phamarcy = mongoose.model('Pharmacy', PhamarcySchema)
module.exports = Phamarcy
