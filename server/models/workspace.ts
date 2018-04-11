import * as mongoose from 'mongoose';
const bcrypt = require('bcrypt-nodejs');

const workspaceSchema = new mongoose.Schema({
    username: { type: 'String', required: true },
    password: { type: 'String', required: true },
    fullname: { type: 'String', required: true },
	displayname: { type: 'String', required: true }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

workspaceSchema.methods.setPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const Workspace =mongoose.model('workspace', workspaceSchema);
export default Workspace;
