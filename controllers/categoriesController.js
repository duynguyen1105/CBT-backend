const Workspace = require('../models/Workspace')
const Category = require('../models/Category')

exports.getAllCategories = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const categories = await Category.find({ workspace: _id })

    res.status(200).json({
      status: 'Success',
      results: categories.length,
      data: categories,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.createCategory = async (req, res, next) => {
  try {
    const { workspaceDomain } = req.params
    const { _id } = await Workspace.findOne({ domain: workspaceDomain })

    const isCategoryExisted = Boolean(
      await Category.findOne({
        name: req.body.name,
        workspace: _id,
      })
    )

    if (isCategoryExisted) {
      const err = new Error('Category already existed')
      err.statusCode = 400
      return next(err)
    } else {
      const category = await Category.create({
        name: req.body.name,
        workspace: _id,
      })
      res.status(200).json({
        status: 'Success',
        data: { category },
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndRemove(req.params.categoryId)
    res.status(200).json({
      status: 'Success',
      message: 'Category has been deleted',
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
