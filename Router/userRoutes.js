const express = require('express')
const router = express.Router()
const controller = require('../Controller/UserConroller')
const chatController = require('../Controller/chatController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const upload = require('../Middleware/multerMiddleware')
router.get('/user-Info/:id',controller.getUserInfo)

router.get('/all-Users',controller.getAllUsers)

router.get('/search-User',controller.getSearchUser)

router.put("/update-Profile", upload.single("profileImg"), controller.updateProfile);

router.get('/get-Chat-Users/:id',chatController.getChatUsers)

router.put('/update-Username',controller.updateUsername)

module.exports = router
