var AWS = require('aws-sdk');

exports.Mailer =async(receiver,message) =>{

console.log("AWS REGION : " + process.env.AWS_REGION);
console.log("AWS EMAIL : " + process.env.SENDER_EMAIL);

console.log("loading region");
//AWS.config.update({region: ''}); //create environmet variable for REGION

if (!AWS.config.region) {
  AWS.config.update({
    region: 'us-east-1'
  });
}

//process.env.AWS_SDK_LOAD_CONFIG="true";

let mailOptions = {
    from: process.env.SENDER_EMAIL, //create environment variable
    to: receiver.email, 
    subject: message.subject, 
    text: message.text, 
    html: message.html
};

var params = {
  Destination: { 
    CcAddresses: [
      mailOptions.to,
    ],
    ToAddresses: [
      mailOptions.to,
    ]
  },
  Message: { 
    Body: { 
      Html: {
       Charset: "UTF-8",
       Data: mailOptions.html
      },
      Text: {
       Charset: "UTF-8",
       Data: mailOptions.text
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: mailOptions.subject
     }
    },
  Source: mailOptions.from, 
  ReplyToAddresses: []
};

console.log("sending email to : "+mailOptions.to);

var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();


sendPromise.then(
  function(data) {
    console.log("Email has been send");
    return data; 
  }).catch(
    function(err) {
        console.log(err);
        return(err);
  });


}





/*const nodemailer = require('nodemailer');

exports.Mailer=async(receiver,message)=>{

    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", 
        secureConnection: false, 
        port: 587, 
        tls: {
        ciphers:'SSLv3'
        },
        auth: {
            user: 'grocery.shop50@hotmail.com',
            pass: 'Shyam123@@'
        }
    });


   


    let data = await transporter.sendMail(mailOptions);
    return data;
}*/
