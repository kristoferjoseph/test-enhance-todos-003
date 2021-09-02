const arc = require('@architect/functions')
const data = require('@begin/data')
const auth = require('@architect/shared/auth')
const isXHR = require('@architect/shared/is-xhr')

exports.handler = arc.http.async(auth, deleteTodo)

async function deleteTodo (req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const table = `todos-${accountId}`
  const key = arc.http.helpers.bodyParser(req).key
  await data.destroy({
    table,
    key
  })

  if (isXHR(req)) {
    return {
      statusCode: 200,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        'content-type': 'text/html; charset=utf8'
      },
      body: JSON.stringify({ key })
    }
  }
  else {
    return {
      statusCode: 302,
      headers: {
        location: '/todos',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      }
    }
  }
}
