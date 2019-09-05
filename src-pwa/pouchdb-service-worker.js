/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
/*eslint-disable*/
let registerWorkerPouch = require('worker-pouch/worker')
let PouchDB = require('pouchdb')

PouchDB = PouchDB.default && !PouchDB.plugin ? PouchDB.default : PouchDB
registerWorkerPouch = registerWorkerPouch.default && !registerWorkerPouch.call ? registerWorkerPouch.default : registerWorkerPouch

self.registerWorkerPouch = registerWorkerPouch
self.PouchDB = PouchDB

// registerWorkerPouch(self, PouchDB)
// self.addEventListener('activate', function(event) {
//   event.waitUntil(self.clients.claim())
// })