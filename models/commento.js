const mongoose = require('mongoose')

let schemaCommento = mongoose.Schema({
  testo: String,
  creato: { type: Date, default: Date.now },
  autore: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }

})

module.exports = mongoose.model('Commento', schemaCommento)
