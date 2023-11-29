const Label = require('../models/Label')
const Workspace = require('../models/Workspace')

exports.getAllLabels = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const labels = await Label.find({ workspace: _id })

    res.status(200).json({
      status: 'Success',
      results: labels.length,
      data: labels,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.createLabel = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })
    const isLabelExisted = Boolean(
      await Label.findOne({
        name: req.body.name,
        workspace: _id,
      })
    )

    if (isLabelExisted) {
      const err = new Error('Label already existed')
      err.statusCode = 400
      return next(err)
    } else {
      const label = await Label.create({
        name: req.body.name,
        workspace: _id,
      })
      res.status(200).json({
        status: 'Success',
        data: { label },
      })
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.deleteLabel = async (req, res, next) => {
  try {
    await Label.findByIdAndRemove(req.params.labelId)
    res.status(200).json({
      status: 'Success',
      message: 'Label has been deleted',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
