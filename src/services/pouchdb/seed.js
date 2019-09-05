// import something here
const uuid = require('@toby.mosque/quasar-app-extension-utils/src/uuid')
const faker = require('faker')

module.exports = async function (db) {
  var { people: dbpeople } = await db.rel.find('person', { limit: 1 })
  if (dbpeople && dbpeople.length > 0) {
    return
  }

  faker.locale = 'pt_BR'
  let companies = []
  for (let i = 0; i < 5; i++) {
    let company = {}
    company.id = uuid.comb()
    company.name = faker.company.companyName()
    company.people = []
    companies.push(company)
  }

  let jobs = []
  for (let i = 0; i < 10; i++) {
    let job = {}
    job.id = uuid.comb()
    job.name = faker.name.jobTitle()
    job.people = []
    jobs.push(job)
  }

  let people = []
  for (let i = 0; i < 100; i++) {
    let companyIndex = Math.floor(Math.random() * Math.floor(5))
    let jobIndex = Math.floor(Math.random() * Math.floor(10))
    let company = companies[companyIndex]
    let job = jobs[jobIndex]
    let person = {}
    person.id = uuid.comb()
    person.firstName = faker.name.firstName()
    person.lastName = faker.name.lastName()
    person.email = faker.internet.email()
    person.company = company.id
    person.job = job.id
    people.push(person)

    company.people.push(person.id)
    job.people.push(person.id)
  }

  for (let company of companies) {
    await db.rel.save('company', company)
  }

  for (let job of jobs) {
    await db.rel.save('job', job)
  }

  for (let person of people) {
    await db.rel.save('person', person)
  }
}
