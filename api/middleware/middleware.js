const model = require("../users/users-model");



function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const method = req.method; //(get,post,put,delete gibi)http methotlarımızı döndürür
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(method+"--"+url+"--"+timestamp);
}

function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  logger
}