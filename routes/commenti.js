const express = require('express')
const router = express.Router({ mergeParams: true })
const Video = require('../models/video')
const Commento = require('../models/commento')
const middleware = require('../middleware')

// Form di creazione di un commento
router.get('/nuovo', middleware.accessoEffettuato, (req, res) => {
  Video.findById(req.params.id, (err, video) => {
    if (!err) {
      res.render('commenti/nuovo', { video: video, attiva: 'nuovoCommento' })
    }
  })
})

// Crea un commento
router.post('/', middleware.accessoEffettuato, (req, res) => {
  Video.findById(req.params.id, (err, video) => {
    if (err) {
      console.error(err)
      res.redirect('/videos')
    } else {
      Commento.create(req.body.commento, (err, commento) => {
        if (err) {
          console.error(err)
          req.flash('error', 'Qualcosa è andato storto')
        } else {
          commento.autore.id = req.user._id
          commento.autore.username = req.user.username

          commento.save()
          video.commenti.push(commento)
          video.save()

          req.flash('success', 'Commento aggiunto')
          res.redirect('/videos/' + video._id)
        }
      })
    }
  })
})

// Form di modifica di un commento
router.get('/:commento_id/modifica', middleware.controllaPossessoCommento, (req, res) => {
  Commento.findById(req.params.commento_id, (err, commentoTrovato) => {
    if (err) {
      console.error(err)
      res.redirect('back')
    } else {
      res.render('commenti/modifica', { video_id: req.params.id, commento: commentoTrovato, attiva: 'modificaCommento' })
    }
  })
})

// Modifica un commento
router.put('/:commento_id', middleware.controllaPossessoCommento, (req, res) => {
  Commento.findByIdAndUpdate(req.params.commento_id, req.body.commento, (err, commentoAggiornato) => {
    if (err) {
      console.error(err)
      res.redirect('back')
    } else {
      res.redirect('/videos/' + req.params.id)
    }
  })
})

// Elimina un commento
router.delete('/:commento_id', middleware.controllaPossessoCommento, (req, res) => {
  Commento.findByIdAndRemove(req.params.commento_id, err => {
    if (err) {
      console.error(err)
      res.redirect('back')
    } else {
      req.flash('success', 'Commento eliminato')
      res.redirect('/videos/' + req.params.id)
    }
  })
})

module.exports = router
