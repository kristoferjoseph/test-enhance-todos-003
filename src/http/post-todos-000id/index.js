const arc = require('@architect/functions')
const data = require('@begin/data')
const sanitize = require('xss')
const auth = require('@architect/shared/auth')
const isXHR = require('@architect/shared/is-xhr')

exports.handler = arc.http.async(auth, updateTodo)

async function updateTodo (req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id
  const todo = arc.http.helpers.bodyParser(req)
  todo.title = sanitize(todo.title)
  todo.text = sanitize(todo.text)
  todo.updated = new Date().toISOString()

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
  else {
    return {
      statusCode: 302,
      headers: {
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      location: '/'
    }
  }
}
