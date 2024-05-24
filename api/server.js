const express = require('express');
const { logger } = require("./middleware/middleware.js");//logger olarak çağırmak yeterli.
//const md = require("./middleware/middleware.js") şeklinde de yazılabilir ama bu sefer logger i kullanmak için md.logger olarak çağırmak gerekir
const router = require("./users/users-router.js");
const server = express();


// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın
server.use(express.json());
// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
