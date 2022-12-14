
import sendEmail from "./sendemail.js"
const sendVerificationEmail = async({name, email, verificationToken, origin})=>{
    
    const verifyEmail = `${origin}user/verify-token?token=${verificationToken}&email=${email}`
    const message = `<p>Please confirm your email by clicking on the following link : 
    <a href="${verifyEmail}">Verify Email</a> </p>`;
    return sendEmail({
        to: email,
        subject: 'Email Confirmation',
        html: `<h4> hello, ${name}</h4>${message}` })
}


export default sendVerificationEmail;