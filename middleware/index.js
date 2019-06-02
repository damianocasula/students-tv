const Video = require('../models/video')
const Commento = require('../models/commento')

let middlewareObj = { }

// Controlla se un utente possiede un certo video
middlewareObj.controllaPossessoVideo = (req, res, next) => {
  if (req.isAuthenticated()) {
    Video.findById(req.params.id, (err, videoTrovato) => {
      if (err) {
        console.error(err)
        req.flash('error', 'Video non trovato')
        res.redirect('back')
      } else {
        if (videoTrovato.autore.id.equals(req.user._id)) {
          next()
        } else {
          req.flash('error', 'Non hai i permessi per questa azione')
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash('error', "Devi aver effettuato l'accesso per eseguire questa azione")
    res.redirect('back')
  }
}

// Controlla se un utente è l'autore di un certo commento
middlewareObj.controllaPossessoCommento = (req, res, next) => {
  if (req.isAuthenticated()) {
    Commento.findById(req.params.commento_id, (err, commentoTrovato) => {
      if (err) {
        console.error(err)
        res.redirect('back')
      } else {
        if (commentoTrovato.autore.id.equals(req.user._id)) {
          next()
        } else {
          req.flash('error', 'Non hai i permessi per questa azione')
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash('error', "Devi aver effettuato l'accesso per eseguire questa azione")
    res.redirect('back')
  }
}

// Controlla se l'utente ha effettuato l'accesso
middlewareObj.accessoEffettuato = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', "Devi aver effettuato l'accesso per eseguire questa azione")
  res.redirect('/accesso')
}

// Controlla se l'utente è un amministratore
middlewareObj.amministratore = (req, res, next) => {
  if (req.user.admin) {
    return next()
  }
  req.flash('error', 'Devi essere amministratore per eseguire questa azione')
  res.redirect('/videos')
}

module.exports = middlewareObj
