import { factory } from '@toby.mosque/utils'
import { db } from 'src/boot/pouchdb'
const { store } = factory

const options = {
  model: class PeopleModel {
    companies = []
    jobs = []
  },
  collections: [
    { single: 'company', plural: 'companies', id: 'id' },
    { single: 'job', plural: 'jobs', id: 'id' }
  ]
}

const clone = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default store({
  options,
  mutations: {
    addPersonToJob (state, { index, person }) {
      let job = state.jobs[index]
      job.people.push(person)
    },
    removePersonFromJob (state, { index, person }) {
      let job = state.jobs[index]
      job.people.splice(job.people.indexOf(person), 1)
    },
    addPersonToCompany (state, { index, person }) {
      let company = state.companies[index]
      company.people.push(person)
    },
    removePersonFromCompany (state, { index, person }) {
      let company = state.companies[index]
      company.people.splice(company.people.indexOf(person), 1)
    }
  },
  actions: {
    async initialize ({ commit }) {
      let { companies } = await db.local.rel.find('company')
      let { jobs } = await db.local.rel.find('job')
      commit('companies', companies)
      commit('jobs', jobs)
    },
    async updateJob ({ commit, getters }, { person, previous, current }) {
      if (previous !== void 0) {
        if (current !== void 0) {
          if (previous !== current) {
            commit('removePersonFromJob', { index: getters.jobsIndex.get(previous), person })
            commit('addPersonToJob', { index: getters.jobsIndex.get(current), person })
            await db.local.rel.save('job', clone(getters.jobById(previous)))
            await db.local.rel.save('job', clone(getters.jobById(current)))
          }
        } else {
          commit('removePersonFromJob', { index: getters.jobsIndex.get(previous), person })
          await db.local.rel.save('job', clone(getters.jobById(previous)))
        }
      } else if (current !== void 0) {
        commit('addPersonToJob', { index: getters.jobsIndex.get(current), person })
        await db.local.rel.save('job', clone(getters.jobById(current)))
      }
    },
    async updateCompany ({ commit, getters }, { person, previous, current }) {
      if (previous !== void 0) {
        if (current !== void 0) {
          if (previous !== current) {
            commit('removePersonFromCompany', { index: getters.companiesIndex.get(previous), person })
            commit('addPersonToCompany', { index: getters.companiesIndex.get(current), person })
            await db.local.rel.save('company', clone(getters.companyById(previous)))
            await db.local.rel.save('company', clone(getters.companyById(current)))
          }
        } else {
          commit('removePersonFromCompany', { index: getters.companiesIndex.get(previous), person })
          await db.local.rel.save('job', clone(getters.jobById(previous)))
        }
      } else if (current !== void 0) {
        commit('addPersonToCompany', { index: getters.companiesIndex.get(current), person })
        await db.local.rel.save('company', clone(getters.companyById(current)))
      }
    }
  }
})
