const nodemailer = require('nodemailer');

const mailHelper = async (option) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      const message =  { 
        from: process.env.SOURCE_EMAIL, // sender address
        to: option.email, // list of receivers
        subject: option.subject, // Subject line
        text: option.message, // plain text body
    }

      let info = await transporter.sendMail(message)
    
      console.log("Message sent: %s", info);
};

module.exports = mailHelper;