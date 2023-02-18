var AWS = require('aws-sdk');

exports.Mailer =async(receiver,message) =>{

const ses = AWS.SES({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_ACCESS_KEY,
  region: process.env.AWS_SES_REGION
});


let mailOptions = {
    from: process.env.AWS_SES_SENDER_EMAIL, 
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

var sendPromise = ses.sendEmail(params).promise();


sendPromise.then(
  function(data) {
    console.log("INFO " + new Date().toDateString(),"/",new Date().getHours(),":",new Date().getMinutes(),":",new Date().getSeconds() +" EMAIL HAS BEEN SEND TO "+ mailOptions.to);
    return data; 
  }).catch(
    function(err) {
        console.log(err);
        return(err);
  });


}

