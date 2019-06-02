const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

let schemaUtente = new mongoose.Schema({
  username: String,
  password: String,
  admin: Boolean
})

schemaUtente.plugin(passportLocalMongoose)

module.exports = mongoose.model('Utente', schemaUtente)
