let stripetk='sk_test_51JR57rBuBMeuylpxvr07UaSS8EfkIztqkqzd9fWDTfKCqgC92I0vVDYCuMx29V5AJYLXiqnuGHdJWoYw7sSWG6yj00RoAASRop'
const stripe = require('stripe')(stripetk)
let Users=require('../database/schemas/regstrationSchema')

let assignpaymentmethodtouser=async(data,user)=>{
console.log('halkaan ayey shaqada ku darista ka bilaabanee ',data.id,user.cus_id)
   await stripe.customers.createSource(user.cus_id,{source:data.id})
  .then(async()=>{
    var myquery = { cus_id: user.cus_id };
    let userka= await Users.findOne(myquery)
    let userpaymentmethods=userka.finanaces.payment_methods
    userpaymentmethods.push(data)
    console.log(userpaymentmethods)
    var newvalues = { $set: {'finanaces.payment_methods':userpaymentmethods} };
    Users.findOneAndUpdate(myquery,newvalues,(err,res)=>{
      if (err){
        console.log(err)
      }
      console.log(res)
    })
  })
  .catch(e=>{
      throw new Error(e.message)
  })


}
module.exports=assignpaymentmethodtouser