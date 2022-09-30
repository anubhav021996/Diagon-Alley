const transporter = require("./configs/mail");

const sendMail = async ({from,to,subject,text,html}) => {
    await transporter.sendMail({from,to,subject,text,html});
}

const verifyOtp = async (user) => {
    await sendMail({
        from: `Diagon Alley ${process.env.user}`,
        to:user.email, 
        subject: `Otp Verification`,
        text: `Your 4 digit otp is ${user.otp}.`,
        html: `<h3>Your 4 digit otp is ${user.otp}.</h3>`
    });
} 

const welcomeMail = async (user) => {
    await sendMail({
        from: `Diagon Alley ${process.env.user}`,
        to:user.email, 
        subject: `Welcome to Diagon Alley ${user.firstName}`,
        text: `Hi ${user.firstName},
        You are successfully registered on Diagon Alley.
        
        Happy Shopping!!`,
        html: `<h4>Hi ${user.firstName},</h4>
        <h3>You are successfully registered on Diagon Alley.</h3>
        
        <h3>Happy Shopping!!</h3>`,
    });
}

const resetMail = async (user) => {
    await sendMail({
        from: `Diagon Alley ${process.env.user}`,
        to:user.email, 
        subject: `Password Reset Alert`,
        text: `Hi ${user.firstName},
        Your password was changed successfully.
        
        Happy Shopping!!`,
        html: `<h4>Hi ${user.firstName},</h4>
        <h3>Your password was changed successfully.</h3>
        
        <h3>Happy Shopping!!</h3>`
    });
}

const sellerMail = async (user) => {
    await sendMail({
        from: `Diagon Alley ${process.env.user}`,
        to:user.email, 
        subject: `Seller Account Activated`,
        text: `Hi ${user.firstName},
        
        Congratulations!!!

        Your seller account is activated. We will be happy to start business with you. You can now update your products on your seller dashboard which will be live for our customers.
        
        Happy Shopping!!`,
        html: `<h4>Hi ${user.firstName},</h4>
        <h3>Your password was changed successfully.</h3>
        
        <h1>Congratulations!!!</h1>

        <h3>Your seller account is activated. We will be happy to start business with you. You can now update your products on your seller dashboard which will be live for our customers.</h3>

        <h3>Happy Shopping!!</h3>`
    });
}

const adminSellerMail = async (user) => {
    await sendMail({
        from: `Diagon Alley ${process.env.user}`,
        to: "anubhav.varshney02nov@gmail.com",
        subject: `${user.firstName} is now seller`,
        text: `Please welcome ${user.firstName} to the team.`
    });
}

const orderMail = async (user,products) => {
    for(let key in products){
        await sendMail({
            from: `Diagon Alley ${process.env.user}`,
            to:user.email, 
            subject: `Order Placed Successfully`,
            text: `Hi ${user.firstName},

            Thanks for shopping with us.
            Your order for ${key} is placed successfully.

            Happy Shopping!!`,
            html: `<h4>Hi ${user.firstName},</h4>

            <h3>Thanks for shopping with us.</h3>
            <h3>Your order for ${key} is placed successfully.</h3>

            <h3>Happy Shopping!!</h3>`
        });
    }
}

const adminMail = async (user) => {
    await sendMail({
        from: `Diagon Alley ${process.env.user}`,
        to: "anubhav.varshney02nov@gmail.com",
        subject: `${user.firstName} has registered with us`,
        text: `Please welcome ${user.firstName}.`
    });
}

module.exports = {verifyOtp, welcomeMail, adminMail, resetMail, orderMail,sellerMail,adminSellerMail};