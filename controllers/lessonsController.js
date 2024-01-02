const Workspace = require('../models/Workspace')
const Lesson = require('../models/Lesson')

exports.getAllLessons = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const lessons = await Lesson.find({ workspace: _id })

    res.status(200).json({
      status: 'Success',
      results: lessons.length,
      data: lessons,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.createLesson = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const lesson = await Lesson.create({
      ...req.body,
      workspace: _id,
    })

    res.status(200).json({
      status: 'Success',
      data: lesson,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.updateLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.lessonId,
      { ...req.body },
      { new: true, runValidator: true }
    )
    res.status(200).json({
      status: 'Success',
      data: lesson,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.deleteLesson = async (req, res, next) => {
  try {
    await Lesson.findByIdAndRemove(req.params.lessonId)
    res.status(200).json({
      status: 'Success',
      message: 'Lesson has been deleted',
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

exports.getInfoLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId)
    res.status(200).json({
      status: 'Success',
      data: lesson,
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}
