import * as passport from 'passport';
import User from '../models/user';

export default class UserCtrl {
    signIn = (req, res) => {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return res.status(404).send(err);
            }

            if(user){
                return res.status(200).send({
                    token: user.generateJwt(),
                    success: true,
                    user: user
                })
            } else {
                res.status(401).send(info);
            }
        })(req, res);
    }

    signUp = (req, res) => {
        User.findOne({email: req.body.email}, function(error, user) {
            if (user){
                res.send({
                    status: 500,
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
                        res.send({
                            status: 500,
                            success: false,
                            error: err,
                        })
                    } else {
                        res.send({
                            status: 200,
                            success: true,
                            user: result,
                            token: user.generateJwt(),
                        })
                    }                
                })
            }
        });
    }

}
