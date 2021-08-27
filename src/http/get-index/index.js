const arc = require('@architect/functions')
exports.handler = arc.http.async(index)

async function index (req) {
  const { session = {} } = req
  const { account = {} } = session
  const { id: accountId } = account

  if (accountId) {
    return {
      statusCode: 302,
      location: '/todos'
    }
  }
  else {
    return {
      statusCode: 302,
      location: '/login'
    }
  }
}
