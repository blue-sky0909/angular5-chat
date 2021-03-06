import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as compression from 'compression';
import * as passport from 'passport';
import * as http from 'http';
import * as socketIo from 'socket.io';

import setRoutes from './routes';
require('./services/passport');
const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());

let mongodbURI;
if (process.env.NODE_ENV === 'test') {
  mongodbURI = process.env.MONGODB_TEST_URI;
} else {
  mongodbURI = process.env.MONGODB_URI;
  app.use(morgan('dev'));
}

const server = http.createServer(app); // create socket server
const io = socketIo(server);

/* ================= socket section ============= */

io.on("connection", socket => {
  console.log("New client connected");  
  socket.on("save-message", (data) => {
    socket.broadcast.emit('new-message', data);
    socket.emit('new-message', data);
  });

  socket.on("insert-value", (data) => {
    console.log(data)
    socket.broadcast.emit('check-user', data);
  });
 
  socket.on("disconnect", () => console.log("Client disconnected"));
});

/* ================= socket section ============= */

mongoose.Promise = global.Promise;
const mongodb = mongoose.connect(mongodbURI, { useMongoClient: true });

mongodb
  .then((db) => {
    console.log('Connected to MongoDB on', db.host + ':' + db.port);

    setRoutes(app);

    app.get('/*', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    if (!module.parent) {
      // app.listen(app.get('port'), () => {
      //   console.log('Server listening on port ' + app.get('port'));
      // });

      // start app
      server.listen(app.get('port'), (error) => {
        if (!error) {
          console.log('Server listening on port ' + app.get('port')); // eslint-disable-line
        }
      });
    }

  })
  .catch((err) => {
    console.error(err);
});


export { app };
