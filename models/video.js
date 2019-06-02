const mongoose = require('mongoose')

let schemaVideo = new mongoose.Schema({
  titolo: String,
  anteprima: String,
  video: String,
  descrizione: String,
  autore: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  commenti: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commento'
    }
  ]
})

module.exports = mongoose.model('Video', schemaVideo)
