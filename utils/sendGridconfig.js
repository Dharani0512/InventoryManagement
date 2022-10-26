// const sgMail = require("@sendgrid/mail");
import sgMail from "@sendgrid/mail";
const api =
  "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";
const sendgridapi = sgMail.setApiKey(api);
export default sendgridapi;
