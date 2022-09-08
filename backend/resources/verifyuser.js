let jwt=require('jsonwebtoken')
let verifyuser=(req,res,next)=>{
    let auth=req.headers.auth?.split(" ")[1]
    jwt.verify(auth,'mysecret',(err,payload)=>{
      if(auth){
        if(err){
            res.status(403).json('authentication token is not valid')
        }
        else{
            req.user=payload
            next()
            
        }
      }
      else{
        res.status(401).json('you are not authenticated')

      }
    })
    req.body.auth=auth
    next()

}
module.exports=verifyuser