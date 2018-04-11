import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: { type: 'String', required: true },
    username: { type: 'String', required: true },
    password: { type: 'String', required: true },
    role: { type: 'String', default: "admin" },
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

const User = mongoose.model('User', userSchema);

export default User;
