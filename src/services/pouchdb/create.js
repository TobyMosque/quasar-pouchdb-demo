
module.exports = function (PouchDB, name, options) {
  let db = options !== void 0 ? new PouchDB(name, options) : new PouchDB(name)
  db.setSchema([
    {
      singular: 'person',
      plural: 'people',
      relations: {
        company: { belongsTo: { type: 'company', options: { async: true } } },
        job: { belongsTo: { type: 'job', options: { async: true } } }
      }
    },
    {
      singular: 'company',
      plural: 'companies',
      relations: {
        people: { hasMany: { type: 'person', options: { async: true } } }
      }
    },
    {
      singular: 'job',
      plural: 'jobs',
      relations: {
        people: { hasMany: { type: 'person', options: { async: true } } }
      }
    }
  ])
  return db
}
