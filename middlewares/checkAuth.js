const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.checkAuth = (userRole) => {
  return async function (req, res, next) {
    //verify token
    const Authorization = req.header('authorization')
    if (!Authorization) {
      const err = new Error('Unauthorized!')
      err.statusCode = 401
      return next(err)
    }
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    console.log(userId)
    const { role } = await User.findById(userId)
    if (!userRole.includes(role) === true) {
      const err = new Error('You are not allowed to do it')
      err.statusCode = 403
      return next(err)
    }
    req.user = { userId, role }
    next()
  }
}
