const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('../server/config/Oauth2.js');
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

exports.sendConfirmationEmail = async function ({ toUser, hash }) {
    const accessToken = await new Promise((resolve, reject) => {
        OAuth2_client.getAccessToken((err, token) => {
          if (err) {
            reject();
          }
          resolve(token);
        });
      });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: '0Auth2',
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD,
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                refreshToken: config.refreshToken,
                accessToken: accessToken
            }
        })
        const message = {
            from: 'anthony.bar.89@gmail.com',
            to: toUser.email,
            subject: 'Who Nose That? - Activate Account',
            html: `
                <h3>Hello ${toUser.username}</h3>
                <p>Thank you for registering! Just one more step...</p>
                <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/register-user/${hash}">Activate Link</a> </p>
                <p>Thank you,</p>
                <p>-Who Nose That? Team</p>
            `
        }
        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log(info)
            }
        })
}






exports.resetPassword = async function ( user ) {
    const accessToken = await new Promise((resolve, reject) => {
        OAuth2_client.getAccessToken((err, token) => {
          if (err) {
            reject();
          }
          resolve(token);
        });
      });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: '0Auth2',
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD,
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                refreshToken: config.refreshToken,
                accessToken: accessToken
            }
        })

        const message = {
            from: 'anthony.bar.89@gmail.com',
            to: user.email,
            subject: 'Who Nose That? - Reset Password',
            html: `
                <h3>Hello ${user.username}</h3>
                <p>Seems like you forgot something...</p>
                <p>Click the link to reset your password: <a target="_" href="${process.env.DOMAIN}/password-reset/${user._id}">Reset Password</a> </p>
                <p>Thank you,</p>
                <p>-Who Knows That? Team</p>
            `
        }
        transporter.sendMail(message, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log(info)
            }
        })
}