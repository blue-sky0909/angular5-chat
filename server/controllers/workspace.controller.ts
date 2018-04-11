const nodemailer = require('nodemailer');

import Workspace from '../models/workspace';

export default class WorkspaceCtrl {
    
    create = (req, res) => {
          console.log(req.body);
        Workspace.findOne({displayname: req.body.displayName}, function(error, workspace) {
            if (workspace){
                return res.send({
                    status: 500,
                    success: false,
                    message: "This displayname already exists",
                })
            } else{
                const workspace = new Workspace();
                workspace.username = req.body.userName;
                workspace.fullname = req.body.fullName;
                workspace.displayname = req.body.displayName;
                workspace.password = workspace.setPassword(req.body.password);

                workspace.save(function(err, result) {
                    if(err) {
                        res.status(500).send({
                            success: false,
                            error: err,
                        })
                    } else {
                        res.status(200).send({
                            success: true,
                            workspace: result
                        })
                    }                
                })
            }
        });
    }

    list = (req, res) => {
        Workspace.find({}, (err, workspaces) => {
            if(err) {
                return res.status(500).send({
                    err: err,
                    success: false
                })
            }
            res.status(200).send({
                success: true,
                workspaces: workspaces
            })
        })
    }

    confirm = (req, res) => {
        console.log("mail", req.body.email)
        Workspace.find({username: req.body.email}, (err, workspaces) => {
            if(err) {
                return res.status(500).send({
                    err: err,
                    success: false
                })
            }
            if(workspaces.length > 0) {           

                console.log("mail success");
                console.log(workspaces)
                nodemailer.createTestAccount((err, account) => {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        secure: false,
                        auth: {
                            user: account.user, // generated ethereal user
                            pass: account.pass // generated ethereal password
                        }
                    });

                    const content = 'localhost:8000/' + workspaces[0].displayname;

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"Fred Foo 👻" <foo@example.com>', // sender address
                        to:  workspaces[0].username, // list of receivers
                        subject: 'Hello ✔', // Subject line
                        text: content, // plain text body
                        html: content // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                        res.status(200).send({
                            success: true,
                            message: 'Please check your email'
                        })
                    });
                });
            } else {            
                return res.status(404).send({
                    success: false,
                    message: 'Not found'
                })
            }
            
        })
    }
    
}
