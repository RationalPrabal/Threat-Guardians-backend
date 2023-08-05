const mongoose= require('mongoose')
const User= require("../models/user.model")
//!lectureSchema

const lectureSchema=new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    text:{type:String},
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'courseModel' },
    createdAt: { type: Date, default: Date.now },
})
//! courseSchema

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lectureModel' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

var courseModel = mongoose.model('course', courseSchema);
var lectureModel= mongoose.model("lecture",lectureSchema)

module.exports={
    lectureModel,
    courseModel
}


