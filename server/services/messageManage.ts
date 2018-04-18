const mongoose = require('mongoose');
const Message = mongoose.model('message');
const Workspace = mongoose.model('workspace');

export async function saveMessage(data) {
    const { content, from_user, to_user, workspace } = data;
    const workspaceId = await Workspace.findOne({ displayname: workspace}).select('_id').exec();
    console.log("workspaceId=====>", workspaceId)
    const path = workspaceId._id;
    const message = new Message({
        content,
        from_user,
        to_user,
        path
    });
console.log("message=====>", message)
    message.save(function(err, result) {
        if(err) {
            console.log(err)
        } else {
           console.log(result);
        }                
    })
}