const { rejects } = require('assert');
const nodemailer=require('nodemailer')
let smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
      user: "awstest725@gmail.com",
      pass: "softdev123"
    }
  });
  var mailOptions = {
    from: 'awstest725@gmail.com',
    to: "",
    subject: 'to create  new password',
    text: 'Testing Nodemailer so chill...',
    }
function sendingMail(toMail,text,subject)
 {
     return new Promise((resolve,reject)=>{
     if(!toMail){
         return false;
     }
     mailOptions.to=toMail;
    //  mailOptions.text=text;
     mailOptions.subject=subject;
     mailOptions.html=`<b>${text}</b> is teh OTP for forgot password`;
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log('Sending mail error--', error);

            reject(error)
        }else{
            console.log('Sending mail response--', response);

            resolve(response)
        }
    });
})
}
 module.exports=sendingMail;