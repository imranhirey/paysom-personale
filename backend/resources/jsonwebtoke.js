let jw=require('jsonwebtoken')

class Jwt{
token=''
data={}
secretkey='mysecret'
signdata=(exp)=>{
    
    let token=jw.sign(this.data,this.secretkey)
    return token
}
verifydata=()=>{
    let res=jw.verify(this.token,this.secretkey)
    return res
}
}

module.exports=Jwt