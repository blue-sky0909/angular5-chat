import * as passport from 'passport';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import BaseCtrl from './base.controller';
import User from '../models/user';

export default class UserCtrl extends BaseCtrl {
    model = User;
    signIn = (req, res) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return res.status(404).send(err);
            }

            if(user){
                const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                res.status(200).json({ token: token });
            } else {
                res.status(401).send(info);
            }
        })(req, res);
    }

    signUp = (req, res) => {
        User.findOne({email: req.body.email}, function(error, user) {
            if (user){
                res.status(500).send({                    
                    success: false,
                    message: "This email already exists",
                })
            } else{
                const user = new User();
                user.username = req.body.username;
                user.email = req.body.email;
                user.password = user.setPassword(req.body.password);

                user.save(function(err, result) {
                    if(err) {
                        res.status(500).send({
                            success: false,
                            error: err,
                        })
                    } else {
                        res.status(200).send({
                            success: true,
                            user: result
                        })
                    }                
                })
            }
        });
    }

}
