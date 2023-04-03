const nodemailer = require("nodemailer");

const sendMail = async (title,description,dueDate,email) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'joyce.yundt@ethereal.email',
        pass: 'dKCer9Ndd6U7uZ8Av7'
    },
  });

  let info = await transporter.sendMail({
    from: '"Sudhanshu Singh👻" <joyce.yundt@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: title, // Subject line
    text: description,
    dueDate:dueDate 
  });

//   console.log("Message sent: %s", info.messageId);

};

module.exports = sendMail;