const Workspace = require('../models/Workspace')
const Question = require('../models/Question')

exports.getAllQuestionsOfWorkspace = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const sort = req.query.sort ? req.query.sort.split(',') : ['_id']
    const sortBy = {}
    sortBy[sort[0]] = sort[1] ?? 'asc'

    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const allQuestions = await Question.find({
      workspace: _id,
      title: { $regex: search, $options: 'i' },
    })
      .sort(sortBy)
      .skip(perPage * page - perPage)
      .limit(perPage)

    const total = await Question.countDocuments({
      workspace: _id,
      title: { $regex: search, $options: 'i' },
    })

    res.status(200).json({
      status: 'Success',
      results: allQuestions.length,
      data: allQuestions,
      total,
      current: page,
      pages: Math.ceil(total / perPage),
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.createQuestion = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const question = await Question.create({
      ...req.body,
      workspace: _id,
    })

    res.status(200).json({
      status: 'Success',
      data: { question },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.questionId,
      { ...req.body },
      { new: true, runValidator: true }
    )
    res.status(200).json({
      status: 'Success',
      data: { question },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.deleteQuestions = async (req, res, next) => {
  try {
    const ids = req.body.ids
    await Question.deleteMany({
      _id: { $in: ids },
    })
    res.status(200).json({
      status: 'Success',
      message: 'Questions has been deleted',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.deleteQuestion = async (req, res, next) => {
  try {
    await Question.findByIdAndRemove(req.params.questionId)
    res.status(200).json({
      status: 'Success',
      message: 'Question has been deleted',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getInfoQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.questionId)
    res.status(200).json({
      status: 'Success',
      data: { question },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
