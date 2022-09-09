let Users=require('../database/schemas/regstrationSchema')
let stripetk='sk_test_51JR57rBuBMeuylpxvr07UaSS8EfkIztqkqzd9fWDTfKCqgC92I0vVDYCuMx29V5AJYLXiqnuGHdJWoYw7sSWG6yj00RoAASRop'
const stripe = require('stripe')(stripetk)




let chargeuser=async(data)=>{
let user=data.user.data.data.userka
let depositinfo=data.depositinfo
let ammount=parseInt(depositinfo.ammount)
let userka=await Users.findOne({email:user.email})
let prefiousammount=parseInt(userka.finanaces.blance)
let prefiouspaymentmethods=userka.finanaces.payment_methods
let newblance =prefiousammount+ammount

console.log('macluumada ',data)
console.log(typeof prefiousammount , typeof ammount)


var myquery = { email: user.email };
let user_db = await Users.findOne({cus_id:user.cus_id}) // user from database
let cards=user_db.finanaces.payment_methods
let dpm=null
  cards.map(x=>{
    return x.card.metadata.default=='true'?dpm=x:null
  })
  
 try {
  const charge = await stripe.charges.create({
    amount: ammount*100,
    currency: 'usd',
    description: 'depost my wallet',
    customer:userka.cus_id,
    source:dpm.card.id
  });
  var newvalues = { $set: {'finanaces.blance': newblance} };
  await Users.findOneAndUpdate(myquery,newvalues)
  return charge
   
 } catch (error) {
   throw new Error(error.message) 
   
 }
  
}



module.exports=chargeuser