const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const sendEmail = (options) => {
  sgMail.setApiKey(process.env.SENGGRID_API_KEY);

  const message = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text
  }

  sgMail.send(message)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.log(error);
  });
}

module.exports = sendEmail;
