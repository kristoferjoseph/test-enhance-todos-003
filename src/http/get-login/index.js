require = require('esm')(module) // eslint-disable-line
const arc = require('@architect/functions')
const clientID = process.env.GITHUB_CLIENT_ID
const redirectURI = process.env.GITHUB_REDIRECT
const href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`
const Enhance = require('@begin/enhance').default
const html = Enhance({
  templates: '@architect/views/templates',
  modules: '_static/components'
})

exports.handler = arc.http.async(login)

async function login() {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: html`<login-page href="${href}"></login-page>`
  }
}
