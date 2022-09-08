let jwt= require('jsonwebtoken')
let user= require('../database/schemas/regstrationSchema')

let refreshtoken=async(token)=>{
try {
    let resp= jwt.verify(token,'verystrongsecretkey')
    let data={
        email:resp.email
      }
      let userka=await user.findOne({email:resp.email})
      if (userka){
          let userpervrefreshtoken=userka.security.refreshtoken
        console.log('toenkii refrshka ahaay',userpervrefreshtoken)
        let access_token=jwt.sign(data,'verystrongsecretkey',{expiresIn:'8000s'})
        let refresh_token=jwt.sign(data,'verystrongsecretkey')
        var myquery = { email: resp.email };
  
        var newvalues = { $set: {security: {accesstoken:access_token,refreshtoken:refresh_token}} };
          user.findOneAndUpdate(myquery,newvalues,(err,res)=>{
            if (err){
              console.log(err)
            }
            console.log(res)
          })
      let tokens={
          access_token,
          refresh_token
      }
      return tokens
      }
    else{
        return 'no user'
    }
    
} catch (error) {
    return error.message
    
}

}
module.exports=refreshtoken