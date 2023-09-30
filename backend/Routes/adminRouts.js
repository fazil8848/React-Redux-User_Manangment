const express = require('express')
const adminRoutes = express()
const adminController = require('../controller/adminController')
 
module.exports = adminRoutes;

adminRoutes.post('/login',adminController.adminLogin)
adminRoutes.post('/AddUser',adminController.adminAddUser)
adminRoutes.get('/loadUsers',adminController.loadUsers)
adminRoutes.post('/deleteUser',adminController.deleteUser)
adminRoutes.post('/editUser',adminController.loadUserData)
adminRoutes.post('/editUserByAdmin',adminController.editUserByAdmin)



