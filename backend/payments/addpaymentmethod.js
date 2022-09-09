let Users=require('../database/schemas/regstrationSchema')
let stripetk='sk_test_51JR57rBuBMeuylpxvr07UaSS8EfkIztqkqzd9fWDTfKCqgC92I0vVDYCuMx29V5AJYLXiqnuGHdJWoYw7sSWG6yj00RoAASRop'
const stripe = require('stripe')(stripetk)



  
  let createcard=async(data,req)=>{
    let commonvalues={
      user:req.user.data.data.userka,
      respond:''
  
    }
    console.log('creating card',data)
    let params={}
    params.card={
      number: data.cardnumber,
      exp_month: data.expm,
      exp_year: data.expy,
      cvc: data.cvc,
      name:commonvalues.user.name,
      metadata:{
      default:false
      }
  
    }
    try {
      let card= await stripe.tokens.create(params)
      commonvalues.respond=card
  
    } catch (error) {
      console.log(error.message)
      commonvalues.respond=error.message
    }
    return commonvalues.respond  

  }
  
  
 
  



module.exports=createcard