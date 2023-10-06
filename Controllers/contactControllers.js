const asyncHandler = require("express-async-handler")
const Contact = require("../Models/contactModel")

const getContacts = asyncHandler(async(req,res)=>{
 
    contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})

const createContact = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {name,email,phone}=req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields { name,email,phone } are mandatory")
    }
    const contactAvailable = await Contact.findOne({email})
    if(contactAvailable){
        res.status(400)
        throw new Error("Contact with above mail id already exists")
    }
    const contact = await Contact.create({name,email,phone,user_id:req.user.id})
    res.status(201).json(contact)
})

const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found...")
    }
    res.status(200).json(contact) 
})

const updateContact = asyncHandler(async(req,res)=>{ 
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found...")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new error("User dont have the permission to update other user contcats")
    }
    const updatedcontact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true})
    res.status(200).json(updatedcontact)
})

const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found...")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new error("User dont have the permission to delete other user contcats")
    }
    const deletedcontact = await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedcontact)
})



module.exports = {getContacts,createContact,getContact,updateContact,deleteContact}