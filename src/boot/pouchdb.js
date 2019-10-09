// import something here
import PouchDB from 'src/services/pouchdb/index'
import create from 'src/services/pouchdb/create'
import seed from 'src/services/pouchdb/seed'

class Database {
  local = void 0
  remote = void 0
  syncHandler = void 0
  async configure ({ isSSR, initialize, onChange }) {
    if (isSSR) {
      this.local = create(PouchDB, 'http://admin:123qwe456RTY@40.123.36.92:5984/master/')
      await seed(this.local)
      await initialize()
    } else {
      this.remote = create(PouchDB, 'http://admin:123qwe456RTY@40.123.36.92:5984/master/')
      if ('serviceWorker' in navigator) {
        if (!navigator.serviceWorker.controller) {
          await new Promise(resolve => {
            navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true })
          })
        }
        this.local = create(PouchDB, 'db', {
          adapter: 'worker',
          worker () {
            return navigator.serviceWorker
          }
        })
      } else {
        // web worker -  this works as expected
        this.local = create(PouchDB, 'db', { adapter: 'worker' })
      }
      // this.local = create(PouchDB, 'db', { adapter: 'worker' })
      await Notification.requestPermission()
      await this.replicate({ source: this.remote, target: this.local })
      await this.replicate({ source: this.local, target: this.remote })
      await initialize()
      this.syncHandler = this.local.sync(this.remote, {
        live: true,
        retry: true
      })
      this.local.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', onChange)
    }
  }
  async replicate ({ source, target }) {
    return new Promise((resolve, reject) => {
      source.replicate.to(target).on('complete', resolve).on('error', reject)
    })
  }
}

const db = new Database()
// "async" is optional
export default async ({ store, router, Vue, ssrContext }) => {
  let events = {
    job: { name: 'job', delete: 'database/deleteJob', save: 'database/saveOrUpdateJob' },
    company: { name: 'company', delete: 'database/deleteCompany', save: 'database/saveOrUpdateCompany' }
  }
  await db.configure({
    isSSR: !!ssrContext,
    async initialize () {
      await store.dispatch('database/initialize')
    },
    onChange (change) {
      let { data, _id, _rev, _deleted } = change.doc
      let parsed = db.local.rel.parseDocID(_id)
      let event = events[parsed.type]
      if (_deleted) {
        router.app.$emit(parsed.type, { id: parsed.id, _deleted })
        router.app.$emit(parsed.id, { _deleted })
        if (event) {
          store.dispatch(event.delete, parsed.id)
        }
      } else {
        data.id = parsed.id
        data.rev = _rev
        router.app.$emit(parsed.type, data)
        router.app.$emit(parsed.id, data)
        if (event) {
          store.dispatch(event.save, data)
        }
      }
    }
  })
  Vue.prototype.$db = db.client
}

export { db }
