const { v4: uuidv4} = require('uuid')
const members = require('../models/members')

exports.getAllMembers = (req,res) => {
    res.json(members)
}

exports.getOneMember = (req,res) => {
    const found = members.some(member => member.id === req.params.id)

    if(found){
        res.json(members.filter(member => member.id === req.params.id))
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
}

exports.createMember = (req,res) => {
    const newMember = {
        id: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    members.push(newMember)
    res.redirect('/api/members')
}

exports.updateMember = (req,res) => {
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
}

exports.deleteMember = (req,res) => {

    const found = members.some(member => member.id === req.params.id)

    if(found){
        members.filter(member=> member.id !== req.params.id)
        res.json({ msg: 'Member deleted succussfully'})
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`})
    }
}