const express = require('express')
const userRoutes = express();
const userController = require('../controller/userController')
const {uploadOptions} =require('../configuration/multer')

userRoutes.post('/signup',userController.userRegistration)
userRoutes.post('/login',userController.userLogin)
userRoutes.post('/image',uploadOptions.single('image'),userController.userImage)

module.exports = userRoutes