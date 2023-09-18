const Workspace = require('../models/Workspace')
const User = require('../models/User')

exports.getUsersOfWorkspace = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const sort = req.query.sort ? req.query.sort.split(',') : ['_id']
    const sortBy = {}
    sortBy[sort[0]] = sort[1] ?? 'asc'

    const { userId } = req.user
    const { workspace } = await User.findById(userId)
    const allUsers = await User.find({
      workspace: workspace,
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    })
      .sort(sortBy)
      .skip(perPage * page - perPage)
      .limit(perPage)

    const total = await User.countDocuments({
      workspace: workspace,
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    })

    res.status(200).json({
      status: 'Success',
      results: allUsers.length,
      data: allUsers,
      total,
      current: page,
      pages: Math.ceil(total / perPage),
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.addUserToWorkspace = async (req, res, next) => {
  try {
    const { email } = req.body
    const { workspaceDomain } = req.params
    const user = await User.findOne({ email: email })
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })
    if (!user) {
      const err = new Error('Email is not found')
      err.statusCode = 300
      return next(err)
    }
    if (!user.workspace.includes(_id)) {
      user.workspace.push(_id)
    } else {
      const err = new Error('User is already in workspace')
      err.statusCode = 300
      return next(err)
    }

    await User.findByIdAndUpdate(
      user._id,
      { ...user },
      { new: true, runValidator: true }
    )

    res.status(200).json({
      status: 'Success',
      data: { user },
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.addAdminForWorkspace = async (req, res, next) => {
  try {
    const { email } = req.body
    const { workspaceDomain } = req.params
    const user = await User.findOne({ email: email })
    const workspace = await Workspace.findOne({ domain: workspaceDomain })
    if (!user) {
      const err = new Error('Email is not correct')
      err.statusCode = 400
      return next(err)
    }
    if (!workspace.adminWorkspace.includes(user._id)) {
      workspace.adminWorkspace.push(user._id)
      user.role = 'ADMIN_WORKSPACE'
    } else {
      res.json('This user has been admin of workspace')
    }
    if (!user.workspace.includes(workspace._id)) {
      user.workspace.push(workspace._id)
    }

    await User.findByIdAndUpdate(
      user._id,
      { ...user },
      { new: true, runValidator: true }
    )

    await Workspace.findByIdAndUpdate(
      workspace._id,
      { ...workspace },
      { new: true, runValidator: true }
    )

    res.status(200).json({
      status: 'Success',
      data: { user },
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const currentUserRole = req.user.role
    const currentUserId = req.user.userId
    if (currentUserId === userId || currentUserRole === 'ADMIN_WORKSPACE') {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { new: true, runValidator: true }
      )
      res.status(200).json({
        status: 'Success',
        data: { user },
      })
    } else {
      const err = new Error('You are not allowed to do it')
      err.statusCode = 403
      return next(err)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.userId)
    res.status(200).json({
      status: 'Success',
      message: 'User has been deleted',
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.getInfoUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const currentUserRole = req.user.role
    const currentUserId = req.user.userId
    if (currentUserId === userId || currentUserRole === 'ADMIN_WORKSPACE') {
      const user = await User.findById(userId)
      res.status(200).json({
        status: 'Success',
        data: { user },
      })
    } else {
      const err = new Error('You are not allowed to do it')
      err.statusCode = 403
      return next(err)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}
