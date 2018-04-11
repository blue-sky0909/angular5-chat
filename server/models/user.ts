import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: { type: 'String', required: true },
    username: { type: 'String', required: true },
    password: { type: 'String', required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.methods.setPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    const time: number = expiry.getTime() / 1000;
    const timestamp = time;
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: timestamp,
    }, "MY_SECRET");
};

const User = mongoose.model('User', userSchema);

export default User;
