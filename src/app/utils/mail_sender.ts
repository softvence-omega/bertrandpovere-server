// import nodemailer from 'nodemailer';
// import { configs } from '../configs';
// type TMailContent = {
//     to: string,
//     subject: string,
//     textBody: string,
//     htmlBody: string,
//     name?: string
// }

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,         // switch to 587
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: configs.email.app_email!,
//         pass: configs.email.app_password!,
//     },
// });

// // ✅ Email Sender Function
// const sendMail = async (payload: TMailContent) => {
//     const info = await transporter.sendMail({
//         from: configs.email.app_email!,
//         to: payload.to,
//         subject: payload.subject,
//         text: payload.textBody,
//         html: `
//         <!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <title>Welcome Email</title>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <style>
//         * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//         }

//         /* Fallback styles for unsupported clients (some email clients ignore <style> tags) */
//         @media only screen and (max-width: 600px) {
//             .container {
//                 padding: 20px !important;
//             }

//             .btn {
//                 padding: 12px 18px !important;
//                 font-size: 16px !important;
//             }
//         }
//     </style>
// </head>

// <body
//     style="margin: 0; padding: 0;  font-family: Arial, sans-serif;">

//     <div style="max-width: 600px; margin: 40px auto; background-color: #f4f4f4; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);"
//         class="container">

//         <div style="font-size: 16px; color: #555555; line-height: 1.6;">
//             <p style="margin-bottom: 30px;">Hi <strong>${payload?.name || ""}</strong>,</p>

//             ${payload?.htmlBody}

//             <div
//                 style=" margin-top: 60px; text-align: center;">

//                     <img style="width: 50px; height: 50px; border-radius: 50%;"
//                         src="https://i.pinimg.com/736x/e3/46/35/e34635d7e861c21b9b9c8513ea0780c1.jpg"
//                         alt="">

//                 <p style="font-size: 12px;">The Support Team</p>
//                 <h3>Bertrand-Povere</h3>
//             </div>
//         </div>
//         <p style="font-size: 14px; color: #999999; margin-top: 20px; margin-bottom: 10px; text-align: center;">
//             This is an automated message — please do not reply to this email.
//             <br>
//             If you need assistance, feel free to contact our support team.
//             <br><br>
//             Thank you for choosing us!
//         </p>

//         <hr>
//         <div style="text-align: center; font-size: 12px; color: #999999; margin-top: 20px;">
//             &copy; {{year}} Your Company. All rights reserved.
//         </div>

//     </div>
// </body>

// </html>

//         `,
//     });
//     return info
// };

// export default sendMail;


import sgMail from '@sendgrid/mail';
import { configs } from '../configs';

sgMail.setApiKey(configs.email.sg_api_key as string);
type TMailContent = {
    to: string,
    subject: string,
    textBody: string,
    htmlBody: string,
    name?: string
}
// ✅ Email Sender Function
const sendMail = async (payload: TMailContent) => {
    try {
        const info = await sgMail.send({
            from: {
                email: configs.email.app_email!,
                name: "Auditor", // optional sender name
            },
            to: payload.to,
            subject: payload.subject,
            text: payload.textBody,
            html: payload.htmlBody,
        });

        return info;
    } catch (error: any) {
        throw error;
    }
};

export default sendMail;