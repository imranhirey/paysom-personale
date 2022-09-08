const express = require("express");
const { isDate } = require("moment");
const router = express.Router();
let connectdatabase = require("../database/dbconnect");
let User = require("../database/schemas/regstrationSchema");
const jwt = require('jsonwebtoken');
const verifyuser = require("../resources/verifyuser");
connectdatabase;


router.post("/", async(req, res) => {
  let { email, number, password } = req.body.data;
  console.log(req.body.data)
  let loginmethod = "";
  if (email && password) {
    loginmethod = "email";
  } else if (number && password) {
    loginmethod = "number";
  } else {
    res.status(401).json("incomplete credentials");
  }

  if (loginmethod) {
    let userka= await User.findOne(loginmethod=='email'?{email:email}:{phone_number:number})
    .then((user)=>{
      if(user && user.password==password){
        
        let data={
          email:user.email
        }
        console.log('datada la xirayo marka loginka lasamenayo nayo waa ',data)
       
        let accesstoken= jwt.sign(data,'mysecret')
        let refreshtoken= jwt.sign(data,'mysecret')
        var myquery = { email: user.email };
        var newvalues = { $set: {security: {accesstoken:accesstoken,refreshtoken:refreshtoken}} };
        User.findOneAndUpdate(myquery,newvalues,(err,res)=>{
          if (err){
            console.log(err)
          }
          console.log(res)
        })
        res.json({
          accesstoken,
          refreshtoken
        })

         
        
    }
    else{
        res.json({
          status:'notfound'
        })
    }

    })
    .catch(e=>{
      console.log(e.message)
    })
   
  }
});

module.exports = router;
