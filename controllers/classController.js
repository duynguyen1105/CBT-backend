const Workspace = require('../models/Workspace')
const User = require('../models/User')
const ClassModel = require('../models/Class')

exports.getAllClassesOfWorkspace = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const sort = req.query.sort ? req.query.sort.split(',') : ['_id']
    const sortBy = {}
    sortBy[sort[0]] = sort[1] ?? 'asc'

    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const allClasses = await ClassModel.find({
      workspace: _id,
      name: { $regex: search, $options: 'i' },
    })
      .sort(sortBy)
      .skip(perPage * page - perPage)
      .limit(perPage)

    const total = await ClassModel.countDocuments({
      workspace: _id,
      name: { $regex: search, $options: 'i' },
    })

    res.status(200).json({
      status: 'Success',
      results: allClasses.length,
      data: allClasses,
      total,
      current: page,
      pages: Math.ceil(total / perPage),
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.createClass = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const newClass = await ClassModel.create({
      ...req.body,
      workspace: _id,
    })

    res.status(200).json({
      status: 'Success',
      data: newClass,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.updateClass = async (req, res, next) => {
  try {
    const updatedClass = await ClassModel.findByIdAndUpdate(
      req.params.classId,
      { ...req.body },
      { new: true, runValidator: true }
    )
    res.status(200).json({
      status: 'Success',
      data: { updatedClass },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.deleteClasses = async (req, res, next) => {
  try {
    const ids = req.body.ids
    await ClassModel.deleteMany({
      _id: { $in: ids },
    })
    res.status(200).json({
      status: 'Success',
      message: 'Classes has been deleted',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.deleteClass = async (req, res, next) => {
  try {
    await ClassModel.findByIdAndRemove(req.params.classId)
    res.status(200).json({
      status: 'Success',
      message: 'Class has been deleted',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getInfoClass = async (req, res, next) => {
  try {
    const classInfo = await ClassModel.findById(req.params.classId)
    res.status(200).json({
      status: 'Success',
      data: classInfo,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.addUserToClass = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    const currentClass = await ClassModel.findById(req.params.classId)
    if (!user) {
      const err = new Error('Email is not found')
      err.statusCode = 300
      return next(err)
    }

    const isUserInClass = currentClass.users.find(
      (item) => item._id.toString() === user._id.toString()
    )
    if (Boolean(isUserInClass)) {
      const err = new Error('User is already in workspace')
      err.statusCode = 300
      return next(err)
    } else {
      currentClass.users.push(user)
    }

    const newClass = await ClassModel.findByIdAndUpdate(
      currentClass._id,
      { ...currentClass },
      { new: true, runValidator: true }
    )

    res.status(200).json({
      status: 'Success',
      data: newClass,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

// exports.addAdminForWorkspace = async (req, res, next) => {
//   try {
//     const { email } = req.body
//     const { workspaceDomain } = req.params
//     const user = await User.findOne({ email: email })
//     const workspace = await Workspace.findOne({ domain: workspaceDomain })
//     if (!user) {
//       const err = new Error('Email is not correct')
//       err.statusCode = 400
//       return next(err)
//     }
//     if (!workspace.adminWorkspace.includes(user._id)) {
//       workspace.adminWorkspace.push(user._id)
//       user.role = 'ADMIN_WORKSPACE'
//     } else {
//       res.json('This user has been admin of workspace')
//     }
//     if (!user.workspace.includes(workspace._id)) {
//       user.workspace.push(workspace._id)
//     }

//     await User.findByIdAndUpdate(
//       user._id,
//       { ...user },
//       { new: true, runValidator: true }
//     )

//     await Workspace.findByIdAndUpdate(
//       workspace._id,
//       { ...workspace },
//       { new: true, runValidator: true }
//     )

//     res.status(200).json({
//       status: 'Success',
//       data: { user },
//     })
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// }

// exports.updateUser = async (req, res, next) => {
//   try {
//     const { userId } = req.params
//     const currentUserRole = req.user.role
//     const currentUserId = req.user.userId
//     if (currentUserId === userId || currentUserRole === 'ADMIN_WORKSPACE') {
//       const user = await User.findOneAndUpdate(
//         { _id: userId },
//         { ...req.body },
//         { new: true, runValidator: true }
//       )
//       res.status(200).json({
//         status: 'Success',
//         data: { user },
//       })
//     } else {
//       const err = new Error('You are not allowed to do it')
//       err.statusCode = 403
//       return next(err)
//     }
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// }

// exports.deleteUser = async (req, res, next) => {
//   try {
//     await User.findByIdAndRemove(req.params.userId)
//     res.status(200).json({
//       status: 'Success',
//       message: 'User has been deleted',
//     })
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// }

// exports.deleteUsers = async (req, res, next) => {
//   try {
//     const ids = req.body.ids
//     await User.deleteMany({
//       _id: { $in: ids },
//     })
//     res.status(200).json({
//       status: 'Success',
//       message: 'Users has been deleted',
//     })
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// }

// exports.getInfoUser = async (req, res, next) => {
//   try {
//     const { userId } = req.params
//     const currentUserRole = req.user.role
//     const currentUserId = req.user.userId
//     if (currentUserId === userId || currentUserRole === 'ADMIN_WORKSPACE') {
//       const user = await User.findById(userId)
//       res.status(200).json({
//         status: 'Success',
//         data: { user },
//       })
//     } else {
//       const err = new Error('You are not allowed to do it')
//       err.statusCode = 403
//       return next(err)
//     }
//   } catch (error) {
//     console.error(error)
//     next(error)
//   }
// }
