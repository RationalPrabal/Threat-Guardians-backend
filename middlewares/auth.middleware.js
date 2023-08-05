
const jwt= require("jsonwebtoken")

const authentication=(req,res,next)=>{
let token= req.headers.authorization
if(token){
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
           
          req.body.author= decoded.user
            next()
        }
        if(err){
          res.status(400).send(error.message)
        }
    })
}
else{
   res.status(400).send(error.message)
}

}

module.exports={
    authentication
}