const nodemailer = require("nodemailer");

const SendmailHelper = {
  sendMail: (recipient, subject, plaintext, html = "", sender = "no-reply@suasi.it") => {
    let transporter = nodemailer.createTransport({
      service: "register.it",
      auth: {
        user: process.env.REGISTER_SMTP_USER,
        pass: process.env.REGISTER_SMTP_PASSWORD,
      },
      host: process.env.REGISTER_SMTP_HOST,
      port: process.env.REGISTER_SMTP_PORT,
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
