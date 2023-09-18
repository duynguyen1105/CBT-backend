const express = require('express')

const {
  getUsersOfWorkspace,
  addUserToWorkspace,
  addAdminForWorkspace,
  updateUser,
  deleteUser,
  getInfoUser,
} = require('../controllers/userController')
const { checkAuth } = require('../middlewares/checkAuth')
const { checkWorkspace } = require('../middlewares/checkWorkspace')

const Router = express.Router()

Router.route('/:workspaceDomain/addUser').post(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  addUserToWorkspace
)

Router.route('/:workspaceDomain/addAdmin').post(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  addAdminForWorkspace
)

Router.route('/:workspaceDomain/:userId')
  .get(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, getInfoUser)
  .put(checkAuth(['ADMIN_WORKSPACE', 'USER']), checkWorkspace, updateUser)
  .delete(checkAuth('ADMIN_WORKSPACE'), checkWorkspace, deleteUser)

Router.route('/:workspaceDomain').get(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  getUsersOfWorkspace
)
module.exports = Router
