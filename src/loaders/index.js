const expressLoader = require('./express');
// const mongooseLoader = require('./mongoose');
// We have to import all the events once so they can be triggered
require('./events');

module.exports = async ({ expressApp }) => {
  // const mongoConnection = await mongooseLoader();
  // console.log('DB loaded and connected!');

  await expressLoader({ app: expressApp });
  console.log('Express loaded');
};