const express = require('express')

const { checkAuth } = require('../middlewares/checkAuth')
const { checkWorkspace } = require('../middlewares/checkWorkspace')
const {
  createLabel,
  deleteLabel,
  getAllLabels,
} = require('../controllers/labelsController')

const Router = express.Router()

Router.route('/:workspaceDomain/create').post(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  createLabel
)

Router.route('/:workspaceDomain/:labelId').delete(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  deleteLabel
)

Router.route('/:workspaceDomain').get(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  getAllLabels
)

module.exports = Router
