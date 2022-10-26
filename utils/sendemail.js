import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig.js";
import sendgridapi from "./sendGridconfig.js";
import sgMail from "@sendgrid/mail";
import { response } from "express";
// const sendEmail = async ({ to, subject, html }) => {
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport(nodemailerConfig);

//   return transporter.sendMail({
//     from: '"Hii" <foo@example.com>',
//     to,
//     subject,
//     html,
//   });
// };

const sendEmail = async ({ to, subject, html }) => {
  sgMail.send({
    from: "brandimagetech@gmail.com",
    to,
    subject,
    html,
  });
};
export default sendEmail;
