/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 *
 * All content of this folder will be copied as is to the output folder. So only import:
 *  1. node_modules (and yarn/npm install dependencies -- NOT to devDependecies though)
 *  2. create files in this folder and import only those with the relative path
 *
 * Note: This file is used for both PRODUCTION & DEVELOPMENT.
 * Note: Changes to this file (but not any file it imports!) are picked up by the
 * development server, but such updates are costly since the dev-server needs a reboot.
 */
var proxy = require('http-proxy-middleware')

module.exports.extendApp = async function ({ app }) {
  app.use('/db', proxy({
    target: 'http://40.123.36.92:5984/',
    changeOrigin: true,
    pathRewrite: { '^/db': '' }
  }))
}
