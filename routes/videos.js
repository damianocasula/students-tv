const express = require('express')
const router = express.Router()
const Video = require('../models/video')
const middleware = require('../middleware')

// Pagina dei video
router.get('/', (req, res) => {
  Video.find({ }, (err, allVideos) => {
    if (err) {
      console.error(err)
    } else {
      res.render('videos/index', { videos: allVideos, utenteAttuale: req.user, attiva: 'videos' })
    }
  })
})

// Form di aggiunta di un nuovo video
router.get('/nuovo', middleware.amministratore, middleware.accessoEffettuato, (req, res) => {
  res.render('videos/nuovo', { attiva: 'nuovoVideo' })
})

// Aggiunta di un nuovo video
router.post('/', middleware.amministratore, middleware.accessoEffettuato, (req, res) => {
  let titolo = req.body.titolo
  let video = req.body.video
  let anteprima = req.body.anteprima
  let descrizione = req.body.descrizione
  let autore = {
    id: req.user._id,
    username: req.user.username
  }
  let nuovoVideo = { titolo: titolo, video: video, anteprima: anteprima, descrizione: descrizione, autore: autore }
  Video.create(nuovoVideo, (err, nuovoVideo) => {
    if (err) {
      console.error(err)
    } else {
      res.redirect('/videos')
    }
  })
})

// Mostra un video
router.get('/:id', (req, res) => {
  Video.findById(req.params.id).populate('commenti').exec((err, videoTrovato) => {
    if (err || !videoTrovato) {
      console.error(err)
      res.redirect('/videos')
    } else {
      Video.find({ }, (err, allVideos) => {
        if (err) {
          console.error(err)
        } else {
          res.render('videos/mostra', { videos: allVideos, video: videoTrovato, attiva: 'mostraVideo' })
        }
      })
    }
  })
})

// Form di modifica di un video
router.get('/:id/modifica', middleware.amministratore, middleware.controllaPossessoVideo, (req, res) => {
  Video.findById(req.params.id, (err, videoTrovato) => {
    if (err) {
      console.error(err)
      req.flash('error', 'Video non trovato')
    } else {
      res.render('videos/modifica', { video: videoTrovato, attiva: 'modificaVideo' })
    }
  })
})

// Modifica di un video
router.put('/:id', middleware.amministratore, middleware.controllaPossessoVideo, (req, res) => {
  Video.findByIdAndUpdate(req.params.id, req.body.video, (err, videoAggiornato) => {
    if (err) {
      console.error(err)
      res.redirect('/videos')
    } else {
      res.redirect('/videos/' + req.params.id)
    }
  })
})

// Eliminazione di un video
router.delete('/:id', middleware.amministratore, middleware.controllaPossessoVideo, (req, res) => {
  Video.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.error(err)
      res.redirect('/videos')
      req.flash('error', 'C\'è stato un errore nell\'eliminazione del video')
    } else {
      res.redirect('/videos')
      req.flash('success', 'Video eliminato')
    }
  })
})

module.exports = router
