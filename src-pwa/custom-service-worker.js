/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
/*eslint-disable*/
// var registerWorkerPouch = require('worker-pouch/worker')
// var PouchDB = require('pouchdb')
importScripts(`pouchdb-service-worker.js`)
workbox.core.setCacheNameDetails({prefix: "pouchdb-test"})

self.skipWaiting()
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
  "directoryIndex": "/"
})
workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst(), 'GET')
workbox.routing.registerRoute(/^http/, new workbox.strategies.NetworkFirst(), 'GET')

registerWorkerPouch(self, PouchDB, (msg, event) => {
  if (msg.type === 'update' && msg.content.doc) {
    const title = 'Push Codelab';
    const options = {
      body: 'Yay it works.',
      icon: 'https://image.flaticon.com/icons/png/512/433/433932.png',
      badge: 'https://image.flaticon.com/icons/png/512/433/433932.png'
    };

    self.registration.showNotification(title, options)
    let type = msg.content.doc._id.split('_')[0]
    if (type === 'person') {
      if (msg.content._deleted) {
        // self.registration.showNotification('someone was be deleted')
      } else {
        // self.registration.showNotification(msg.content.doc.data.name + ' was be updated')
      }
    }
  }
})
self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim())
})
