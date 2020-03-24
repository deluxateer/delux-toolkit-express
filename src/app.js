const config = require('./config');
const express = require('express');

async function startServer() {
  const app = express();

  await require('./loaders')({ expressApp: app });
  
  app.listen(config.port, err => {
    if(err) {
      console.log(err);
      return;
    }
    console.log(`Server listening on port ${config.port}`);
  });
}

startServer();