const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const airtable = require('airtable');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/scourt';

const indexRouteController = require('./routes/indexRoute');
const englishRouteController = require('./routes/englishRoute');
const germanRouteController = require('./routes/germanRoute');
const adminRouteController = require('./routes/adminRoute');

dotenv.config({path: path.join(__dirname, '.env')});

const base = new airtable({apiKey:'keyKcUWJzmFWttJZw'}).base('appnel3k2hx34yMk6');

const {
  SESSION_SECRET
} = process.env;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mongoose.connect(mongoUri, {useNewUrlParser: true});

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
  req.base = base;
  next();
});

app.use(helmet());

app.use('/', indexRouteController);
app.use('/english', englishRouteController);
app.use('/german', germanRouteController);
app.use('/admin', adminRouteController);

app.listen(port, () => {
  console.log(`Port on ${port}`);
})

