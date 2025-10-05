const nodemailer = require("nodemailer");

function createTransport() {
  if (process.env.NODE_ENV === "production") {
    // 🚀  Real emails
    return nodemailer.createTransport({
      host: process.env.REGISTER_SMTP_HOST,
      port: process.env.REGISTER_SMTP_PORT,
      auth: {
        user: process.env.REGISTER_SMTP_USER,
        pass: process.env.REGISTER_SMTP_PASSWORD,
      },
      secure: true,
      connectionTimeout: 10 * 1000, // 10 seconds
      greetingTimeout: 10 * 1000, // 10 seconds
    });
  }

  // 🧪  Captured by Ethereal
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.ETHEREAL_USERNAME,
      pass: process.env.ETHEREAL_PASSWORD,
    },
  });
}

module.exports = createTransport;
const SendmailHelper = {
  sendMail: (recipient, subject, plaintext, html = "", sender = process.env.MAILER_SENDER_ADDRESS) => {
    let transporter = createTransport();
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
