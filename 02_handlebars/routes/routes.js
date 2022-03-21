const express = require('express')
const router = express.Router()

const membersController = require('../controllers/members.controller')

//Get all members
router.get('/',membersController.getAllMembers)

//GET one member
router.get('/:id',membersController.getOneMember)

//Create a member
router.post('/post', membersController.createMember)

//Update a member
router.put('/update/:id',membersController.updateMember )

//Delete a member
router.delete('/delete/:id', membersController.deleteMember)

module.exports = router