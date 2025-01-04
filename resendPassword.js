const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();


const resendPassword = async (email, link) => {
    try{
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: process.env.USER,
              pass: process.env.PASSWORD,
            }
        });
        // Sened Mail
    const info = await transporter.sendMail({
                    from: process.env.USER, // sender address
                    to: email, // list of receivers
                    subject: "Reset New Password ✔", // Subject line
                    text: "Welcome!", // plain text body
                    html: `<a href=${link}> Add Your New Password Here</a>`
                });
        console.log('Mail Send Successfully!');
                   
    }
    catch(err){
        console.log(err);        
    }
}


module.exports = resendPassword;