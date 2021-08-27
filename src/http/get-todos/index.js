require = require('esm')(module) // eslint-disable-line
const Enhance = require('@begin/enhance').default
const { http } = require('@architect/functions')
const data = require('@begin/data')
const html = Enhance({
  templates: '@architect/views/templates',
  modules: '_static/components'
})
const isXHR = require('@architect/shared/is-xhr')

exports.handler = http.async(listTodos)

async function listTodos (req) {
  const session = req.session || {}
  const account = session.account || {}
  const accountId = account.id

  if (accountId) {
    const table = `todos-${accountId}`
    const pages = await data.get({
      table,
      limit: 25
    })

    let todos = []
    for await (let todo of pages) {
      delete todo.table
      todos.push(todo)
    }
    todos.sort((a, b) => (a.created < b.created)
      ? -1
      : (a.created > b.created)
        ? 1
        : 0
    )

    if (isXHR(req)) {
      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'text/html; charset=utf8'
        },
        body: JSON.stringify(todos)
      }
    }
    else {
      const body = html`
<todos-page todos=${todos}></todos-page>
      `
      return {
        statusCode: 200,
        headers: {
          'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
          'content-type': 'text/html; charset=utf8'
        },
        body
      }
    }
  }
  else {
    return {
      statusCode: 302,
      location: '/'
    }
  }
}
