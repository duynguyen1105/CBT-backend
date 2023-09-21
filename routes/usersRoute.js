const express = require('express')

const {
  getUsersOfWorkspace,
  addUserToWorkspace,
  addAdminForWorkspace,
  updateUser,
  deleteUser,
  getInfoUser,
  deleteUsers,
} = require('../controllers/usersController')
const { checkAuth } = require('../middlewares/checkAuth')
const { checkWorkspace } = require('../middlewares/checkWorkspace')

const Router = express.Router()

Router.route('/:workspaceDomain/addUser').post(
  checkAuth(['ADMIN_WORKSPACE', 'SUPER_ADMIN']),
  checkWorkspace,
  addUserToWorkspace
)

Router.route('/:workspaceDomain/addAdmin').post(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  addAdminForWorkspace
)

Router.route('/:workspaceDomain/delete').delete(
  checkAuth('ADMIN_WORKSPACE'),
  checkWorkspace,
  deleteUsers
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
