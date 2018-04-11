import * as express from 'express';

import UserCtrl from './controllers/user.controller';
import MessageCtrl from './controllers/message.controller';
import WorkspaceCtrl from './controllers/workspace.controller';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const messageCtrl = new MessageCtrl();
  const workspaceCtrl = new WorkspaceCtrl();

  // Users

  router.route('/auth/login').post(userCtrl.signIn);
  router.route('/auth/signup').post(userCtrl.signUp);

  router.route('/message').post(messageCtrl.getMessages);

  router.route('/workspace/create').post(workspaceCtrl.create);
  router.route('/workspace/get').get(workspaceCtrl.list);
  router.route('/workspace/confirm').post(workspaceCtrl.confirm);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
