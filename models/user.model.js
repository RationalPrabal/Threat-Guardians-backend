const mongoose= require('mongoose')
const userSchema= mongoose.Schema({
    name:String,
email : {type:String,required:true},
password :{type:String,required:true},
role: {type:String, default:"student"},
enrolledAt: { type: Date, default: Date.now },
})

const userModel= mongoose.model("user",userSchema)

module.exports={
    userModel
}