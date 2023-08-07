const express=require("express")
const cors= require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { authentication } = require("./middlewares/auth.middleware")
const { lectureRouter } = require("./routes/lecture.routes")
const { quizRouter } = require("./routes/quizz.routes")

const app=express()

app.use(express.json())

app.use(cors({
    origin:"*"
}))

app.use("/users",userRouter)
app.use(authentication)
app.use("/quizzes",quizRouter)
app.use("/lectures",lectureRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(e){
        console.log(e.message)
        console.log("can not connect to db")
    }

    console.log("server is running")
})