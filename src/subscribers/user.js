const user = require('./events').user;

module.exports = function userSubscriber(globalEvtEmitter) {
  globalEvtEmitter.on(user.signIn, ({ _id }) => {
    console.log('do user signin logic');
  });
  
  globalEvtEmitter.on(user.signUp, ({ name, email, _id }) => {
    console.log('do user signup logic');
  });

  return globalEvtEmitter;
}