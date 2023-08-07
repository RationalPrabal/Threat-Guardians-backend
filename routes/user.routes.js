const express= require("express")
const jwt=require("jsonwebtoken")
const bcrypt= require("bcrypt")
const { userModel } = require("../models/user.model")




const userRouter= express.Router()

//! get all users

userRouter.get("/",async(req,res)=>{
    try {
        let users= await userModel.find({role:"student"})
       res.status(200).send(users)
    } catch (error) {
        res.status(400).send("can't find users")
    }
})
//! get user by Id

userRouter.get("/:id",async(req,res)=>{
    try {
        let user= await userModel.findById(req.params.id)
       res.status(200).send(user)
    } catch (error) {
        res.status(400).send("can't find user")
    }
})
//! registration

userRouter.post("/register",async(req,res)=>{
    try{
bcrypt.hash(req.body.password,3,async(err,hash)=>{
    if(err){
        throw err
    }
    else if(hash){
        req.body.password=hash

        let newUser= new userModel(req.body)
        await newUser.save()

        res.send("user has been registered")
    }
})
    }
    catch{
        res.status(400).send("can not register user")
    }
})


//!login 

userRouter.post("/login",async(req,res)=>{
    let email= req.body.email
    try{
let user= await userModel.find({email})
if(user[0].blocked){
    res.status(403).send("Access Denied")
    return
}
if(user.length){
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
            res.status(401).send("invalid password")
        }
        if(result){
            const token= jwt.sign({user:user[0]._id},"masai")
            res.send({"mes":"login success","token":token,"user":user[0]})
        }
        else {
            res.status(401).send("Invalid password");
          }
      
    })
}
else {
    res.status(401).send("invalid email/password")
}
    }
    catch(e){
        res.status(400).send("can not login")
    }
})

//!patch user

userRouter.patch("/update/:id",async(req,res)=>{
    try {
        await userModel.findByIdAndUpdate(req.params.id,req.body)
        res.send("updation successful")
    } catch (error) {
        res.status(400).send("Could not update")
    }
})
module.exports={
userRouter
}