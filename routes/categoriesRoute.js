const express = require('express')

const { checkAuth } = require('../middlewares/checkAuth')
const { checkWorkspace } = require('../middlewares/checkWorkspace')
const {
  createCategory,
  deleteCategory,
  getAllCategories,
} = require('../controllers/categoriesController')

const Router = express.Router()

Router.route('/:workspaceDomain/create').post(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  createCategory
)

Router.route('/:workspaceDomain/:categoryId').delete(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  deleteCategory
)

Router.route('/:workspaceDomain').get(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  getAllCategories
)

module.exports = Router
