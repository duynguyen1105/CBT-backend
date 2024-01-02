const express = require('express')

const {
  createLesson,
  getAllLessons,
  updateLesson,
  deleteLesson,
  getInfoLesson,
} = require('../controllers/lessonsController')
const { checkAuth } = require('../middlewares/checkAuth')
const { checkWorkspace } = require('../middlewares/checkWorkspace')

const Router = express.Router()

Router.route('/:workspaceDomain/createLesson').post(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  createLesson
)

Router.route('/:workspaceDomain/:lessonId')
  .get(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, getInfoLesson)
  .put(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, updateLesson)
  .delete(checkAuth('ADMIN_WORKSPACE'), checkWorkspace, deleteLesson)

Router.route('/:workspaceDomain').get(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  getAllLessons
)

module.exports = Router
