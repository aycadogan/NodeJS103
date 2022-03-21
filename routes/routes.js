const express = require('express')
const { v4: uuidv4} = require('uuid')
const router = express.Router()

const members = [
    {
        id: uuidv4(),
        name:'Hoge',
        email:'hoge@hoge.com',
        status:'active'
    }
]

//Get all members
router.get('/',(req,res) => {
    res.json(members)
})

//GET one member
router.get('/:id',(req,res) => {
    const found = members.some(member => member.id === req.params.id)

    if(found){
        res.json(members.filter(member => member.id === req.params.id))
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
})

//Create a member
router.post('/post', (req,res) => {
    const newMember = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    members.push(newMember)
    res.redirect('/api/members')
})

//Update a member
router.put('/update/:id', (req,res) => {
    let memberToUpdate = null
    const found = members.some(member => member.id === req.params.id)

    if(found){
        members.map(member=>{
            if(member.id === req.params.id){
                memberToUpdate ={
                    ...member,
                    ...req.body
                    // name: req.body.name,
                    // email: req.body.email
                }
                return memberToUpdate
            }
            return member
        })
        res.json({ msg:'Member updated', memberToUpdate})
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
})

//Delete a member
router.delete('/delete/:id', (req,res) => {

    const found = members.some(member => member.id === req.params.id)

    if(found){
        members.filter(member=> member.id !== req.params.id)
        res.json({ msg: 'Member deleted succussfully'})
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
})

module.exports = router