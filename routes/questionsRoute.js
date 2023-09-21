const express = require('express')

const {
  updateQuestion,
  createQuestion,
  getAllQuestionsOfWorkspace,
  deleteQuestion,
  deleteQuestions,
  getInfoQuestion,
} = require('../controllers/questionsController')
const { checkAuth } = require('../middlewares/checkAuth')
const { checkWorkspace } = require('../middlewares/checkWorkspace')

const Router = express.Router()

Router.route('/:workspaceDomain/createQuestion').post(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  createQuestion
)

Router.route('/:workspaceDomain/delete').delete(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  deleteQuestions
)

Router.route('/:workspaceDomain/:questionId')
  .get(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, getInfoQuestion)
  .put(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, updateQuestion)
  .delete(checkAuth('ADMIN_WORKSPACE'), checkWorkspace, deleteQuestion)

Router.route('/:workspaceDomain').get(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  getAllQuestionsOfWorkspace
)

module.exports = Router
