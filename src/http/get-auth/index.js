const arc = require('@architect/functions')
const github = require('./github')

exports.handler = arc.http.async(auth)

async function auth (req) {
  let { query: { code } } = req
  if (code) {
    try {
      let account = await github(req)
      return {
        session: { account },
        location: '/todos'
      }
    }
    catch (err) {
      return {
        statusCode: err.code,
        body: err.message
      }
    }
  }
  else {
    return {
      location: '/'
    }
  }
}
