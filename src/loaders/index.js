const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
//We have to import at least all the events once so they can be triggered
require('./events');

module.exports = async ({ expressApp }) => {
  // const mongoConnection = await mongooseLoader();
  // console.log('DB loaded and connected!');

  const userModel = {
    name: 'userModel',
    model: require('../models/user'),
  };

  await expressLoader({ app: expressApp });
  console.log('Express loaded');
};