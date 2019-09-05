// import something here
let PouchDB = require('pouchdb')
let RelationalPouch = require('relational-pouch')
let PouchDbFind = require('pouchdb-find')
let WorkerPouch = require('worker-pouch')

PouchDB = PouchDB.default && !PouchDB.plugin ? PouchDB.default : PouchDB
PouchDbFind = PouchDbFind.default && !PouchDbFind.find ? PouchDbFind.default : PouchDbFind
RelationalPouch = RelationalPouch.default && !RelationalPouch.setSchema ? RelationalPouch.default : RelationalPouch

console.log(WorkerPouch)
PouchDB.adapter('worker', WorkerPouch)
PouchDB.plugin(RelationalPouch)
PouchDB.plugin(PouchDbFind)

module.exports = PouchDB
