const Workspace = require('../models/Workspace')
const Test = require('../models/Test')

exports.getAllTestsOfWorkspace = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const sort = req.query.sort ? req.query.sort.split(',') : ['_id']
    const sortBy = {}
    sortBy[sort[0]] = sort[1] ?? 'asc'

    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const allTests = await Test.find({
      workspace: _id,
      title: { $regex: search, $options: 'i' },
    })
      .sort(sortBy)
      .skip(perPage * page - perPage)
      .limit(perPage)

    const total = await Test.countDocuments({
      workspace: _id,
      title: { $regex: search, $options: 'i' },
    })

    res.status(200).json({
      status: 'Success',
      results: allTests.length,
      data: allTests,
      total,
      current: page,
      pages: Math.ceil(total / perPage),
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.createTest = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const test = await Test.create({
      ...req.body,
      workspace: _id,
    })

    res.status(200).json({
      status: 'Success',
      data: { test },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.updateTest = async (req, res, next) => {
  try {
    const test = await Test.findByIdAndUpdate(
      req.params.testId,
      { ...req.body },
      { new: true, runValidator: true }
    )
    res.status(200).json({
      status: 'Success',
      data: { test },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.deleteTests = async (req, res, next) => {
  try {
    const ids = req.body.ids
    await Test.deleteMany({
      _id: { $in: ids },
    })
    res.status(200).json({
      status: 'Success',
      message: 'Tests has been deleted',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.deleteTest = async (req, res, next) => {
  try {
    await Test.findByIdAndRemove(req.params.testId)
    res.status(200).json({
      status: 'Success',
      message: 'Test has been deleted',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getInfoTest = async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.testId)
    res.status(200).json({
      status: 'Success',
      data: { test },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
