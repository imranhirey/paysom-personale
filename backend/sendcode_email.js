const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

// initialize nodemailer
var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'imrantests321@gmail.com',
            pass: 'ydlnusnwtqpwqoaf'
        }
    }
);

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};
console.log(process.env.access_key)
// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


let sendcodethroughemail=(name,email,code)=>{
    var mailOptions = {
        from: '"final project" <notifications@ourpayment.com', 
        to: email, 
        subject: 'your verification code ',
        template: 'email', 
        context:{
            name: name, 
            code:code
        }
    };
    
    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
           console.log(error.message);
        }
        console.log('Message sent: to ' +email+ " and code is "+code +""+ info.response );
    })
}
module.exports= sendcodethroughemail