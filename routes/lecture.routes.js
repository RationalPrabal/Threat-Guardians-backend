const express = require('express');
const { lectureModel } = require('../models/lecture.model');
const lectureRouter= express.Router()

//! get Lectures

lectureRouter.get("/",async(req,res)=>{
try {
let lectures=await lectureModel.find()
res.send(lectures)
    
} catch (error) {
    res.status(400).send("can not find lecture")
}
})

//!post lectures

lectureRouter.post("/create",async(req,res)=>{
    try {
        let newLecture=new lectureModel(req.body)
        await newLecture.save()
        res.send("Lecture has been created")
    } catch (error) {
        res.status(400).send("Could not create lecture")
    }
})

//! update lectures

lectureRouter.patch("/update/:id",async(req,res)=>{
try {
    await lectureModel.findByIdAndUpdate(req.params.id,req.body)
    res.send("lecture has been updated")
} catch (error) {
    res.status(400).send("Could not update the lecture")
}
})

lectureRouter.delete("/delete/:id",async(req,res)=>{
    try {
        await lectureModel.findByIdAndDelete(req.params.id)
        res.send("The lecture has been deleted")
    } catch (error) {
        res.status(400).send("Could not delete the lecture")
    }
})

module.exports={
    lectureRouter
}