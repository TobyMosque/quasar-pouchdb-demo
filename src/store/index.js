import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import database from './database'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      database
    },
    strict: process.env.DEV
  })

  return Store
}
