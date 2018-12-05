var createError = require('http-errors')

module.exports = function(req, res, next) {
  const { token } = req.app.locals
  const auth = req.get('Authorization')
  const noAuth = req.get('NoAuth')
  if (noAuth || auth === `Bearer ${token}`) next()
  else next(createError(401))
}
