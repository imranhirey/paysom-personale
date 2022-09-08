// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid ='ACjkjkdjkd'
const authToken = 'hdhjhd'
const client = require('twilio')(accountSid, authToken);

const sendcode=(number,name,code)=>{
    client.messages
      .create({body: `hi ${name} your verification code is ${code} please don't share it with anyone else thank you `, from: '+19897955112', to: `+${number}`})
      .then(message => console.log(message.sid))
      .catch(er=>console.log(er))
      
}
module.exports=sendcode