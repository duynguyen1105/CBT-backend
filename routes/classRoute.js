const express = require('express')

const {
  addUserToClass,
  getAllClassesOfWorkspace,
  deleteClass,
  getInfoClass,
  updateClass,
  deleteClasses,
  createClass,
} = require('../controllers/classController')
const { checkAuth } = require('../middlewares/checkAuth')
const { checkWorkspace } = require('../middlewares/checkWorkspace')

const Router = express.Router()

Router.route('/:workspaceDomain/addClass').post(
  checkAuth(['ADMIN_WORKSPACE', 'SUPER_ADMIN']),
  checkWorkspace,
  createClass
)

Router.route('/:workspaceDomain/delete').delete(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  deleteClasses
)

Router.route('/:workspaceDomain/:classId/addUser').post(
  checkAuth(['ADMIN_WORKSPACE', 'SUPER_ADMIN']),
  checkWorkspace,
  addUserToClass
)

Router.route('/:workspaceDomain/:classId')
  .get(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, getInfoClass)
  .put(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, updateClass)
  .delete(checkAuth('ADMIN_WORKSPACE'), checkWorkspace, deleteClass)

Router.route('/:workspaceDomain').get(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  getAllClassesOfWorkspace
)
module.exports = Router
