const arc = require('@architect/functions')
const data = require('@begin/data')
const sanitize = require('xss')
const isXHR = require('@architect/shared/is-xhr')

exports.handler = arc.http.async(updateTodo)

async function updateTodo (req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const todo = arc.http.helpers.bodyParser(req)
  const key = todo.key
  todo.title = sanitize(todo.title)
  todo.text = sanitize(todo.text)
  todo.updated = new Date().toISOString()

  if (accountId) {
    const table = `todos-${accountId}`
    const newTodo = await data.set({
      table,
      ...todo
    })

    if (isXHR(req)) {
      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
        },
        body: JSON.stringify(newTodo)
      }
    }
  }
  else {
    return {
      statusCode: 302,
      headers: {
        location: '/',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      }
    }
  }
}
