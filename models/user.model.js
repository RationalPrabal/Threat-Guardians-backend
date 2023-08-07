const mongoose= require('mongoose')
const completedQuizzSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    quizTitle:String,
    score:Number,
})
const completedQuizz=mongoose.model("completedQuizz",completedQuizzSchema)
const userSchema= new mongoose.Schema({
    name:String,
email : {type:String,required:true},
password :{type:String,required:true},
role: {type:String, default:"student"},
enrolledAt: { type: Date, default: Date.now },
blocked:{type:Boolean,default:false},
watched:[mongoose.Schema.Types.ObjectId],
completedQuizzes:[completedQuizz.schema]
})

const userModel= mongoose.model("user",userSchema)

module.exports={
    userModel
}