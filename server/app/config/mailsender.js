const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();
// Create a transporter using SMTP

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const verifyconnection = async () => {
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
    return true;
  } catch (err) {
    return false;
    console.error("Verification failed:", err);
  }
};

const sendEmail = async (to, subject, text, html) => {
  try {
    if (await verifyconnection()) {
      const info = await transporter.sendMail({
        from: '"Vanshi Text" <vanshi-tex@gmail.com>', // sender address
        to: `${to}`, // list of recipients
        subject: `${subject}`, // subject line
        text: `${text}`, // plain text body
        html: `${html}`, // HTML body
        attachments: [
          {
            filename: "vanshi-logo.png",
            path: path.join(__dirname, "../../uploads/logo.png"), // Update with your logo path
            cid: "logo",
          },
        ],
      });
      console.log("Message sent: %s", info.messageId);
      // Preview URL is only available when using an Ethereal test account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return true;
    } else {
      console.error("SMTP connection verification failed. Email not sent.");
      return false;
    }
  } catch (err) {
    console.error("Error occurred while sending email:", err);
    return false;
  }
};

module.exports = sendEmail;
