const isXHR = require('./is-xhr')

module.exports = async function auth(req) {
  const accountID = req.session &&
    req.session.account &&
    req.session.account.id

  if (!accountID) {
    if (isXHR(req)) {
      return {
        statusCode: 401
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
}
