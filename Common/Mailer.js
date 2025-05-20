const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
var ejs = require('ejs');
const configFile = require('../Config');
// const puppeteer = require('puppeteer');

let transporter = nodemailer.createTransport({
    host: configFile.email_smtp_config.host,   //SMTP Host Address
    port: configFile.email_smtp_config.port,                 //SMTP PORT
    auth: {
      user: configFile.email_smtp_config.auth.user,   //Username
      pass: configFile.email_smtp_config.auth.pass    //Password
    }
  });

 

  module.exports.notifyMail = function (fromEmail,toEmail,ccEmail,subjectEmail,htmlEmailTemplatePath,dataEmailTemplateBody){

    return new Promise((resolve, reject) => {
        const templateString = fs.readFileSync(htmlEmailTemplatePath,'utf-8');
        const HTMLTemplete = ejs.render(templateString,dataEmailTemplateBody);

        let messageData = {
          from: 'Notification.Centre@Lightstorm.in',
          to: toEmail,
          cc:ccEmail,
          subject: subjectEmail,
          html: HTMLTemplete
        }
        
        transporter.sendMail(messageData,(err, info) => {
          if (err) {
            let sentData = { messageData:messageData , err:err }
            reject(sentData);
          } 
          else {
            let sentData = { messageData:messageData , info:info }
            resolve(sentData);
          }
        });
    });
  }
