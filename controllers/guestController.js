const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {
  try {
    const user = await User.create({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      avatar: req.body.avatar,
      gender: req.body.gender,
      nationality: req.body.nationality,
    })

    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET)

    res.status(200).json({
      status: 'Success',
      data: { token, userName: user.name, email: user.email },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      const err = new Error('Email or password is not correct')
      err.statusCode = 400
      return next(err)
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, userName: user.name, userRole: user.role },
        process.env.APP_SECRET
      )

      res.status(200).json({
        status: 'Login successfully',
        data: { token, userName: user.name },
      })
    } else {
      const err = new Error('Email or password is not correct')
      err.statusCode = 400
      return next(err)
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}
