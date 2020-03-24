const EventEmitter = require('events').EventEmitter;
let globalEvtEmitter = new EventEmitter();
// Here we import all events
const userSubscriber = require('../subscribers/user');

// Add all event listeners
globalEvtEmitter = userSubscriber(globalEvtEmitter);

module.exports = globalEvtEmitter;