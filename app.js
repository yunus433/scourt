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

const adminRouteController = require('./routes/adminRoute');
const indexRouteController = require('./routes/indexRoute');
const authRouteController = require('./routes/authRoute');
const editRouteController = require('./routes/editRoute');
const playersRouteController = require('./routes/playersRoute');
const messagesRouteController = require('./routes/messagesRoute');
const calendarRouteController = require('./routes/calendarRoute');
const analysisRouteController = require('./routes/analysisRoute');
const trainingsRouteController = require('./routes/trainingsRoute');
const tacticsRouteController = require('./routes/tacticsRoute');

dotenv.config({path: path.join(__dirname, '.env')});

const {
  SESSION_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect(mongoUri, {useNewUrlParser: true, auto_reconnect: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

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

app.use('/', indexRouteController);
app.use('/admin', adminRouteController);
app.use('/auth', authRouteController);
app.use('/edit', editRouteController);
app.use('/players', playersRouteController);
app.use('/messages', messagesRouteController);
app.use('/calendar', calendarRouteController);
app.use('/analysis', analysisRouteController);
app.use('/trainings', trainingsRouteController);
app.use('/tactics', tacticsRouteController);

io.on('connection', (socket) => {
  sockets(socket);
});

server.listen(PORT);

