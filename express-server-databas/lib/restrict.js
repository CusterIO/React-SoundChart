module.exports.isRestricted = (req, res, next) => {
  if (req.session.passport.user) {
    next()
  } else {
    let error = new Error('Forbidden!')
    error.status = 403
    const viewModel = {
      validationErrors: [error]
    }
    return res.render('/', viewModel)
  }
}
