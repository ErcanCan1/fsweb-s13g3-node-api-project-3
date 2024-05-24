const express = require('express');
const { validateUserId, validateUser } = require("../middleware/middleware.js")
const userModel = require("./users-model.js")
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get('/', (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  userModel.get().then(users => {
    res.json(users);
  }).catch(err => {
    next(err);
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.json(req.user);
});

router.post('/', validateUser, (req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  userModel.insert({name: req.name}).then(insertedUser => {
    res.json(insertedUser);
  }).catch(next)
});

router.put('/:id', (req, res) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
});

router.delete('/:id', (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
});

router.get('/:id/posts', (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
});

router.post('/:id/posts', (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
});

router.use((err, res, req) => {
  res.status(err.status || 500).json({
    customMessage:"Bir Hata Oluştu",
    message:err.message
  });
})

// routerı dışa aktarmayı unutmayın
module.exports =router;