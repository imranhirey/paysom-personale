
let stripetk='sk_test_51JR57rBuBMeuylpxvr07UaSS8EfkIztqkqzd9fWDTfKCqgC92I0vVDYCuMx29V5AJYLXiqnuGHdJWoYw7sSWG6yj00RoAASRop'

const stripe = require('stripe')(stripetk)
let createcustomer=async(user)=>{
    const customer = await stripe.customers.create({
       email:user.email,
       name:user.name,
       phone:user.phone,
       balance:0,

      });
      return customer
}
module.exports=createcustomer