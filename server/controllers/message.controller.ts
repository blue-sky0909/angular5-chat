import Message from '../models/message';
import Workspace from '../models/workspace';

export default class MessageCtrl {
    getMessages = async (req, res) => {
        // const workspaceId = await Workspace.findOne({ displayname: req.body.workspace}).select('_id').exec();
        // const path = workspaceId._id;

        const today = new Date()
        let AweekAgo = new Date();
        AweekAgo.setDate(today.getDate() - 7);
        Message.find({
            created_at: {
                $gte: AweekAgo,
                $lte: today
            },
        //    path: path
        }, (err, messages) => {
            if(err) {
                return res.status(500).send({
                    err: err,
                    success: false
                })
            }
            res.status(200).send({
                success: true,
                messages: messages
            })
        })
    }

    createMessages = (req, res) => {
        const { content, from_user } = req.body;
        //const workspaceId = await Workspace.findOne({ displayname: workspace}).select('_id').exec();
        const message = new Message({
            content,
            from_user
        });

        message.save(function(err, result) {
            if(err) {
                return res.status(500).send({
                    err: err,
                    success: false
                })
            }
            res.status(200).send({
               success: true,
               message: result
           })              
        })
    }
}
