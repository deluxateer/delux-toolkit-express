const config = require('./config');
const express = require('express');

async function startServer() {
  const app = express();
  
  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders')({ expressApp: app });
  
  app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));
}

startServer();