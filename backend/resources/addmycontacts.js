let users= require('../database/schemas/regstrationSchema')

let addtomycontacts=async(user,mynewcontact)=>{
   
    let status=''
    let info={
        user,
        mynewcontact
       }
       console.log('xogta saaxiibka waa',info)
    let userka=await users.findOne({cus_id:info.user.cus_id})
    let newcontact=await users.findOne({cus_id:info.mynewcontact.cus_id})
    let prevcontacts=userka.contacts
    let exist1=0
    prevcontacts.map(x=>{
        if(x.cus_id==newcontact.cus_id){
            exist1=exist1+1
        }
        else
        {
            exist1=exist1
        }
    })
   if(exist1>0){
       console.log('not saving again ....')
       status='notsaved'
   }
   else{
    prevcontacts.push({
        cus_id:newcontact.cus_id,
        acc:newcontact.finanaces.acc,
        name:newcontact.name


    })
    console.log('asxaabtii hore', prevcontacts)
    status='saved'
    var newvalues = { $set: {'contacts':prevcontacts} };
    users.findOneAndUpdate({cus_id:userka.cus_id},newvalues,(err,res)=>{
      if (err){
        console.log(err)
      }
      console.log(res)
    })
   }
    
   
    return status


}
module.exports=addtomycontacts