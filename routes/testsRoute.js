const express = require('express')

const {
  updateTest,
  createTest,
  getAllTestsOfWorkspace,
  deleteTest,
  deleteTests,
  getInfoTest,
  getTestsOfUser,
  doingTest,
  countTestsByMonth,
} = require('../controllers/testsController')
const { checkAuth } = require('../middlewares/checkAuth')
const { checkWorkspace } = require('../middlewares/checkWorkspace')

const Router = express.Router()

Router.route('/:workspaceDomain/createTest').post(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  createTest
)

Router.route('/:workspaceDomain/delete').delete(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  deleteTests
)

Router.route('/:workspaceDomain/myTests/:userId').get(
  checkAuth(['USER', 'ADMIN_WORKSPACE']),
  checkWorkspace,
  getTestsOfUser
)

Router.route('/:workspaceDomain/doingTest/:userId/:testId').put(
  checkAuth(['USER', 'ADMIN_WORKSPACE']),
  checkWorkspace,
  doingTest
)

Router.route('/:workspaceDomain/countTestsByMonth').get(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  countTestsByMonth
)

Router.route('/:workspaceDomain/:testId')
  .get(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, getInfoTest)
  .put(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, updateTest)
  .delete(checkAuth('ADMIN_WORKSPACE'), checkWorkspace, deleteTest)

Router.route('/:workspaceDomain').get(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  getAllTestsOfWorkspace
)

module.exports = Router
