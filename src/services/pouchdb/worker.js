var registerWorkerPouch = require('worker-pouch/worker')
var PouchDB = require('pouchdb')

// attach to global `self` object
registerWorkerPouch(self, PouchDB)

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})
