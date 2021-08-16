
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./context-machine.cjs.production.min.js')
} else {
  module.exports = require('./context-machine.cjs.development.js')
}
