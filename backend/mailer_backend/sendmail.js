const nodemailer = require("nodemailer");

const SendmailHelper = {
  sendMail: (recipient, subject, plaintext, html = "", sender = process.env.MAILER_SENDER_ADDRESS) => {
    let transporter = nodemailer.createTransport({
      host: process.env.REGISTER_SMTP_HOST,
      port: process.env.REGISTER_SMTP_PORT,
      auth: {
        user: process.env.REGISTER_SMTP_USER,
        pass: process.env.REGISTER_SMTP_PASSWORD,
      },
      secure: true,
    });
    let mailOptions = {
      from: sender,
      to: recipient,
      subject: subject,
      text: plaintext,
    };
    if(html && html.length>0){
        mailOptions["html"] = html;
    }
    return transporter.sendMail(mailOptions);
  },
};

module.exports = SendmailHelper;
