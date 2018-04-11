import * as passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import User from '../models/user';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, {
                    message: 'User not found',
                    success: false
                });
            }

            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong',
                    success: false
                });
            }

            return done(null, user);
        });
    }
));
