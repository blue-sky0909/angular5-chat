import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    from_user: { type: Schema.Types.ObjectId, ref: 'user', required: true  },
    to_user: { type: Schema.Types.ObjectId, ref: 'user' },
    content: { type: 'String', required: true },
    path: { type: Schema.Types.ObjectId, ref: 'workspace' },
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Message = mongoose.model('message', messageSchema);

export default Message;
