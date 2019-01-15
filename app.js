const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cloudinary = require('cloudinary');
const socketIO = require('socket.io');

const sockets = require('./sockets/sockets');

const app = express();
let server = http.createServer(app);
let io = socketIO(server);

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/scourt';

const indexRouteController = require('./routes/indexRoute');
const authRouteController = require('./routes/authRoute');
const appRouteController = require('./routes/appRoute');
const adminRouteController = require('./routes/adminRoute');

if (app.get('env') == 'development') {
  dotenv.config({path: path.join(__dirname, '.env')});
  const {
    SESSION_SECRET,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
  } = process.env;
} else {
  const SESSION_SECRET = "scourtapp";
  const CLOUDINARY_CLOUD_NAME = "dvnac86j8";
  const CLOUDINARY_API_KEY = "225569931328295";
  const CLOUDINARY_API_SECRET = "G2IlEQrKxNrR_JMoBYKqGkPaNBM";
};



cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect(mongoUri, {useNewUrlParser: true, auto_reconnect: true});

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const session = expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
});
app.use(session);
app.use((req, res, next) => {
  req.io = io;
  req.cloudinary = cloudinary;
  next();
});

app.use(helmet());

app.use('/', indexRouteController)
app.use('/app', appRouteController);
app.use('/auth', authRouteController)
app.use('/admin', adminRouteController);

io.on('connection', (socket) => {
  sockets(socket);
});

server.listen(PORT);

