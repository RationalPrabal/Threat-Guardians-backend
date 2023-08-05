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
if(user.length){
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
            res.status(401).send("invalid password")
        }
        if(result){
            const token= jwt.sign({user:user[0]._id},"masai")
            res.send({"mes":"login success","token":token})
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
        res.status(400).send(e.message)
    }
})

module.exports={
userRouter
}