const express = require('express');
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware.js")
const userModel = require("./users-model.js")
const postModel = require("../posts/posts-model.js")
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get('/', (req, res, next) => {
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

router.post('/', validateUser, (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  userModel.insert({name: req.name}).then(insertedUser => {
    res.json(insertedUser);
  }).catch(next)
});

router.put('/:id', validateUserId, validateUser, async (req, res,next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    await userModel.update(req.params.id,{name:req.name});
    let updated = await userModel.getById(req.params.id);
    res.status(201).json(updated);
  } catch (error) {
    next(error)
  }
 
});

router.delete('/:id',validateUserId, async (req, res,next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await userModel.remove(req.params.id);
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    let userPosts = await userModel.getUserPosts(req.params.id);
    res.json(userPosts);
  } catch (error) {
    next(error)
  }
});

router.post('/:id/posts', validateUserId, validatePost, (req, res,next) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  try {
    await insertedPost = postModel.insert({
      user_id: req.params.id,
      text:req.params.text
    });
    res.json(insertedPost);
  } catch (error) {
    next(error);
  }
});

router.use((err, res, req) => {
  res.status(err.status || 500).json({
    customMessage:"Bir Hata Oluştu",
    message:err.message
  });
})

// routerı dışa aktarmayı unutmayın
module.exports =router;