const arc = require('@architect/functions')
const asap = require('@architect/asap')
exports.handler = arc.http.async(asap.handler)
