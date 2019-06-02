const express = require('express')
const router = express.Router()
const passport = require('passport')
const Utente = require('../models/utente')

// Pagina principale
router.get('/', (req, res) => {
  res.redirect('/videos')
})

// Form di registrazione
router.get('/registrazione', (req, res) => {
  res.render('registrazione', { attiva: 'registrazione' })
})

// Registrazione di un nuovo utente
router.post('/registrazione', (req, res) => {
  let nuovoUtente = new Utente({ username: req.body.username })
  Utente.register(nuovoUtente, req.body.password, (err, utente) => {
    if (err) {
      console.error(err)
      req.flash('error', 'Errore durante la registrazione')
      return res.render('/registrazione', { attiva: 'registrazione' })
    }

    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Benvenuto su Student's TV ${utente.username}`)
      res.redirect('/videos')
    })
  })
})

// Form di accesso
router.get('/accesso', (req, res) => {
  res.render('accesso', { attiva: 'accesso' })
})

// Accesso di un utente
router.post('/accesso', passport.authenticate('local', {
  successRedirect: '/videos',
  failureRedirect: '/accesso',
  failureFlash: 'Username e/o password non corretti',
  successFlash: 'Bentornato su Student\'s TV'
}))

// Logout dell'utente
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'Logout effettuato')
  res.redirect('/videos')
})

module.exports = router
