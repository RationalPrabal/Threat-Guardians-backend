const express = require('express');
const { quizModel } = require('../models/quiz.model');

const quizRouter= express.Router()

//! get quizs

quizRouter.get("/",async(req,res)=>{
try {
let quizs=await quizModel.find()
res.send(quizs)
    
} catch (error) {
    res.status(400).send("can not find quiz")
}
})

//!post quizs

quizRouter.post("/create",async(req,res)=>{
    try {
        console.log(req.body)
        let newquiz=new quizModel(req.body)
        await newquiz.save()
        res.send("quiz has been created")
    } catch (error) {
        res.status(400).send("Could not create quiz")
    }
})

//! update quizs

quizRouter.patch("/update/:id",async(req,res)=>{
try {
    await quizModel.findByIdAndUpdate(req.params.id,req.body)
    res.send("quiz has been updated")
} catch (error) {
    res.status(400).send("Could not update the quiz")
}
})

quizRouter.delete("/delete/:id",async(req,res)=>{
    try {
        await quizModel.findByIdAndDelete(req.params.id)
        res.send("The quiz has been deleted")
    } catch (error) {
        res.status(400).send("Could not delete the quiz")
    }
})

module.exports={
    quizRouter
}