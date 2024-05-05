const nodeMailer=require("nodemailer");
const sendEmail = async(options)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chiragpupneja844@gmail.com',
            pass: 'esopqyvnydwonwdq'
        },
        tls: { rejectUnauthorized: false }
    });
    var mailOptions = {
        from: "",
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.message
    };
};

module.exports = sendEmail;