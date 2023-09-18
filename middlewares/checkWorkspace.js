const User = require('../models/User')
const Workspace = require('../models/Workspace')

exports.checkWorkspace = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { userId } = req.user
    const user = await User.findOne({ _id: userId })
    const workspace = await Workspace.findOne({ domain: workspaceDomain })
    if (!workspace) {
      const err = new Error('Can not found this workspace')
      err.statusCode = 400
      return next(err)
    }

    if (!user.workspace.includes(workspace._id)) {
      const err = new Error('You are not in this workspace')
      err.statusCode = 403
      return next(err)
    }
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}
